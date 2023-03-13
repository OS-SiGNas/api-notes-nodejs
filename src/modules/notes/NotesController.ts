import type { Request, Response } from 'express';
import type HttpResponse from '../shared/HttpResponse';
import type NotesService from './NotesService';

export default class NotesController {
  readonly #response: HttpResponse;
  readonly #service: NotesService;
  constructor(httpResponse: HttpResponse, service: NotesService) {
    this.#response = httpResponse;
    this.#service = service;
  }

  getNote = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const note = await this.#service.getNoteById(_id);
      if (note === null) return this.#response.notFound(res);
      return this.#response.ok(res, note);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  getNotes = async (req: Request, res: Response): Promise<Response> => {
    const authorId = req.headers.userId as string;
    const toFind = { authorId, ...req.query };
    try {
      const notes = await this.#service.getNotesByAuthorId(toFind);
      if (notes === null) return this.#response.notFound(res);
      return this.#response.ok(res, notes);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  postNote = async (req: Request, res: Response): Promise<Response> => {
    try {
      const newNote = await this.#service.createNote(req.body);
      return this.#response.created(res, newNote);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  putNote = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const note = await this.#service.updateNoteById(_id, req.body);
      if (note === null) return this.#response.notFound(res);
      return this.#response.ok(res, note);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  deleteNote = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const note = await this.#service.deleteNoteById(_id);
      if (note === null) return this.#response.notFound(res);
      return this.#response.ok(res, 'Deleted');
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  // only for checkSession test
  testReturn200 = (_req: Request, res: Response): void => {
    res.sendStatus(200);
  };
}
