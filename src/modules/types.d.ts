import type { Router, ErrorRequestHandler } from 'express';

export type Modules = Array<Router | ErrorRequestHandler>;