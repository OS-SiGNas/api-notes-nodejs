import { Router } from 'express';

// types
import type UsersController from './UsersController';
import type { RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import type { UsersSchema } from './UsersSchema';
import type { Rol } from './types';

interface Dependences {
  controller: UsersController;
  checkSession: (arg: Rol) => RequestHandler;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  usersSchema: UsersSchema;
}

export default class UsersRouter {
  readonly #router: Router;
  constructor({ controller, checkSession, schemaValidator, usersSchema }: Dependences) {
    const { auth, getUsers, getUser, postUser, putUser, deleteUser } = controller;
    const { loginSchema, getOneUserSchema, createUserSchema, updateUserSchema, deleteUserSchema } = usersSchema;

    this.#router = Router();
    this.#router
      .post('/auth', schemaValidator(loginSchema), auth)

      // => Protected routes with middleware
      .use('/users', checkSession('admin'))

      .get('/users', getUsers)
      .get('/users/:_id', schemaValidator(getOneUserSchema), getUser)
      .post('/users', schemaValidator(createUserSchema), postUser)
      .put('/users/:_id', schemaValidator(updateUserSchema), putUser)
      .delete('/users/:_id', schemaValidator(deleteUserSchema), deleteUser);
  }

  get router(): Router {
    return this.#router;
  }
}
