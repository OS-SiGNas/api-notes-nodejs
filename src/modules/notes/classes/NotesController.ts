import type { Request, Response } from 'express';
import type { HttpResponse } from '../../shared/HttpResponse';
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
    const authorId = req.headers.userId as string;
    try {
      const note = await this.#service.getNoteById({ _id, authorId });
      if (note === null) return this.#response.notFound(res);
      return this.#response.ok(res, note);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  getNotes = async (req: Request, res: Response): Promise<Response> => {
    const authorId = req.headers.userId as string;
    console.log('authorId => ', authorId);
    try {
      const { pagination, notes } = await this.#service.findAllNotes({ authorId, ...req.query });
      if (notes === null) return this.#response.notFound(res);
      return this.#response.ok(res, notes, pagination);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  postNote = async (req: Request, res: Response): Promise<Response> => {
    const authorId = req.headers.userId as string;
    try {
      const newNote = await this.#service.createNote({ ...req.body, authorId });
      return this.#response.created(res, newNote);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  putNote = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    const authorId = req.headers.userId as string;
    try {
      const note = await this.#service.updateNoteById({ _id, authorId }, req.body);
      if (note === null) return this.#response.notFound(res);
      return this.#response.ok(res, note);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  deleteNote = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    const authorId = req.headers.userId as string;
    try {
      const note = await this.#service.deleteNoteById({ _id, authorId });
      if (note === null) return this.#response.notFound(res);
      return res.sendStatus(204);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  // only for checkSession test
  testReturn204 = (_req: Request, res: Response): void => {
    res.sendStatus(204);
  };
}
