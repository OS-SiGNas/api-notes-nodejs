import { z } from 'zod';

import type { AnyZodObject } from 'zod';

export class NotesSchema {
  getNoteSchema: AnyZodObject;
  getNotesSchema: AnyZodObject;
  createNoteSchema: AnyZodObject;
  putNoteSchema: AnyZodObject;
  deleteNoteSchema: AnyZodObject;
  constructor() {
    // ========================
    this.getNoteSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }).strict(),
    });
    // ========================
    this.getNotesSchema = z.object({
      query: z
        .object({
          title: z.string().optional(),
          createdAt: z.date().optional(),
        })
        .strict(),
    });
    // ========================
    this.createNoteSchema = z.object({
      body: z
        .object({
          authorId: z.string().length(24, 'id must be a 24 hex characters'),
          title: z.string(),
          description: z.string().optional(),
          content: z.string(),
        })
        .strict(),
    });
    // ========================
    this.putNoteSchema = z.object({
      body: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          content: z.string().optional(),
        })
        .strict(),
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }).strict(),
    });
    // ========================
    this.deleteNoteSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }).strict(),
    });
  }
}

export const notesSchema = new NotesSchema();
