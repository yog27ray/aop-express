import { NextFunction, Request, Response } from 'express';
import { ThreadLocalStorageAdapter } from './thread-local-storage-adapter';

export class AuthenticationAdapter {
  static middleware(req: Request, res: Response, next: NextFunction): void {
    ThreadLocalStorageAdapter.set({}, next);
  }
}
