import type { Model, QueryOptions, FilterQuery, Document } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

export abstract class Service<T, U> {
  readonly #model: Model<T>;
  constructor(model: Model<T>) {
    this.#model = model;
  }

  // C
  public createDocument = async (entitie: DocumentType<U>): Promise<Document<unknown, any, U>> => {
    const newEntitie = new this.#model(entitie);
    return await newEntitie.save();
  };

  // R
  public getDocumentById = async (_id: string): Promise<DocumentType<U> | null> => {
    return await this.#model.findById({ _id });
  };

  // R
  public getAllDocument = async (): Promise<DocumentType<U>[]> => {
    return await this.#model.find();
  };

  // U
  public updateDocument = async (
    _id: string,
    entitie: QueryOptions<DocumentType<U>>
  ): Promise<DocumentType<U> | null> => {
    return await this.#model.findByIdAndUpdate(_id, entitie, { new: true });
  };

  // D
  public deleteDocument = async (_id: FilterQuery<string>): Promise<DocumentType<U> | null> => {
    return await this.#model.findOneAndDelete(_id);
  };
}
