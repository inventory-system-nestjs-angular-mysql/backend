import {
  Controller,
  Post,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import * as crypto from 'crypto';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

const UPLOADS_ROOT = resolve(process.cwd(), 'uploads');

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = resolve(UPLOADS_ROOT, 'images');
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          let shortId = '';
          for (let i = 0; i < 12; i++) {
            shortId += base62[Math.floor(Math.random() * base62.length)];
          }
          const ext = extname(file.originalname).slice(0, 5);
          cb(null, `${shortId}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const relativePath = `images/${file.filename}`;
    return {
      filename: file.filename,
      originalName: file.originalname,
      path: relativePath,
      size: file.size,
    };
  }

  /**
   * Return image as base64 data URL for the given image path (e.g. images/abc.jpg).
   * Frontend uses this to render the image in the UI.
   */
  @Get('base64')
  async getImageBase64(@Query('path') path: string): Promise<{ dataUrl: string }> {
    if (!path?.trim()) {
      throw new BadRequestException('path is required');
    }
    let normalized = path.replace(/\\/g, '/').trim().replace(/^\/?uploads\/?/i, '');
    if (normalized.includes('..') || normalized.startsWith('/')) {
      throw new BadRequestException('Invalid path');
    }
    const absolutePath = resolve(UPLOADS_ROOT, normalized);
    if (!absolutePath.startsWith(UPLOADS_ROOT)) {
      throw new BadRequestException('Invalid path');
    }
    if (!existsSync(absolutePath)) {
      throw new NotFoundException('Image not found');
    }
    const mime = MIME[extname(absolutePath).toLowerCase()] ?? 'image/jpeg';
    const buffer = readFileSync(absolutePath);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${mime};base64,${base64}`;
    return { dataUrl };
  }
}

