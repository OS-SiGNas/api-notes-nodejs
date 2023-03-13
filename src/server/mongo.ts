import mongoose from 'mongoose';
import { config } from './config';
import type { DatabaseHandler } from './types';

class Mongo implements DatabaseHandler {
  #uri: string;
  constructor(uri: string) {
    this.#uri = uri;
    this.#events();
  }

  connect = async (): Promise<void> => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(this.#uri);
  };

  #events = (): void => {
    mongoose.connection.on('connecting', this.#isConnecting);
    mongoose.connection.on('connected', this.#isConnected);
    mongoose.connection.on('reconnected', this.#isReconnected);
    mongoose.connection.on('close', this.#isClose);
    mongoose.connection.on('error', this.#isError);
  };

  #isConnected = (): void => {
    console.log('==> Mongo cluster connected');
  };

  #isConnecting = (): void => {
    console.log('==> Connecting to mongo cluster...');
  };

  #isReconnected = (): void => {
    console.log('==> Reconnected to mongo cluster...');
  };

  #isError = (): void => {
    console.log('==> Connection error');
  };

  #isClose = (): void => {
    console.log('==> Mongo connection is closed ');
  };
}

export const mongo = new Mongo(config.dbUri);

/*
connecting: Emitted when Mongoose starts making its initial connection to the MongoDB server
connected: Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity. May be emitted multiple times if Mongoose loses connectivity.
open: Emitted after 'connected' and onOpen is executed on all of this connection's models.
disconnecting: Your app called Connection#close() to disconnect from MongoDB
disconnected: Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
close: Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
reconnected: Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
error: Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.
fullsetup: Emitted when you're connecting to a replica set and Mongoose has successfully connected to the primary and at least one secondary.
all: Emitted when you're connecting to a replica set and Mongoose has successfully connected to all servers specified in your connection string.
*/
