import { ConflictException } from '@nestjs/common';
import { generateId } from '../../infrastructure/utils/id.util';

/**
 * Base service class providing common functionality for all services
 */
export abstract class BaseService {
  /**
   * Generate a unique ID with retry logic
   * @param existsCheck - Function that checks if an ID already exists
   * @param errorMessage - Error message to throw if ID generation fails
   * @returns A unique ID string
   */
  protected async generateUniqueId(
    existsCheck: (id: string) => Promise<boolean>,
    errorMessage: string,
  ): Promise<string> {
    let id = generateId();
    let attempts = 0;
    const maxAttempts = 5;

    while ((await existsCheck(id)) && attempts < maxAttempts) {
      id = generateId();
      attempts += 1;
    }

    if (attempts === maxAttempts) {
      throw new ConflictException(errorMessage);
    }

    return id;
  }
}

