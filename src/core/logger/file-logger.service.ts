import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'exceptions.log');

// Ensure log directory exists on startup
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function timestamp(): string {
  return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

export function logException(
  method: string,
  url: string,
  statusCode: number,
  message: string,
  stack?: string,
): void {
  const header = `[${timestamp()}] ERROR ${method} ${url} → ${statusCode}`;
  const body = `  Message: ${message}`;
  const trace = stack ? `  Stack:\n${stack.split('\n').map((l) => '    ' + l).join('\n')}` : '';
  const separator = '-'.repeat(80);
  const entry = [header, body, trace, separator, ''].filter(Boolean).join('\n') + '\n';

  try {
    fs.appendFileSync(LOG_FILE, entry, 'utf8');
  } catch {
    // Fallback: if file write fails, at least log to console
    console.error('[FileLogger] Could not write to log file:', entry);
  }
}
