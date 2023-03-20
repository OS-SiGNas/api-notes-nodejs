import Express, { json } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import Server from './Server';
import Settings from './Settings';
import Mongo from './Mongo';
import modules from '../modules';

import type { RequestHandler } from 'express';

dotenv.config();

export const { apiSaludo, dbUri, environment, jwtSecretKey, port, testUserData } = new Settings(process.env);

const mongo = new Mongo(mongoose, dbUri);

const middlewares: RequestHandler[] = [environment === 'dev' ? morgan('dev') : morgan('common'), json(), cors()];

export const server = new Server({ app: Express(), environment, port, mongo, middlewares, modules });
