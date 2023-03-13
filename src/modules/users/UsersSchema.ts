import { type AnyZodObject, z } from 'zod';

export class UsersSchema {
  readonly loginSchema: AnyZodObject;
  readonly createUserSchema: AnyZodObject;
  readonly updateUserSchema: AnyZodObject;
  readonly getOneUserSchema: AnyZodObject;
  readonly deleteUserSchema: AnyZodObject;
  constructor() {
    // ========================
    this.loginSchema = z.object({
      body: z
        .object({
          username: z.string().min(1, 'username can`t be empty'),
          password: z.string().min(10, 'Password need minimun 10 chars'),
        })
        .strict(),
    });
    // ========================
    this.createUserSchema = z.object({
      body: z
        .object({
          username: z.string(),
          password: z.string().min(10, 'Password need minimun 10 chars'),
          email: z.string().email(),
          name: z.string(),
          telf: z.string(),
          active: z.boolean(),
          roles: z.array(z.enum(['admin', 'dev', 'audit', 'user'])),
        })
        .strict(),
    });
    // ========================
    this.updateUserSchema = z.object({
      body: z
        .object({
          username: z.string().optional(),
          password: z.string().min(10, 'Password need minimun 10 chars').optional(),
          email: z.string().email().optional(),
          name: z.string().optional(),
          telf: z.string().optional(),
          active: z.boolean().optional(),
          roles: z.array(z.enum(['admin', 'dev', 'audit', 'user'])).optional(),
        })
        .strict(),
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });
    // ========================
    this.getOneUserSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });
    // ========================
    this.deleteUserSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });
  }
}

export const usersSchema = new UsersSchema();
