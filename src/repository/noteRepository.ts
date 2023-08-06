// src/NoteRepository.ts

import { Low } from 'lowdb';
import Note from '../models/note';
import { db } from '../db/notes.js';

export class NoteRepository {

  constructor(private db: Low<{ Notes: Note[] }>) {
    this.db = db;
  }

  getAllNotes(): Note[] {
    return this.db.data.Notes;
  }

  getNoteById(id: string): Note | undefined {
    return this.db.data.Notes.find(note => note.id === id);
  }

  addNote(Note: Note): Note | null {
    
    if(this.db.data.Notes.find(note => note.id === Note.id)) {
      
      return null;
    }
    else {
      this.db.data.Notes.push(Note);
      
      this.db.write();
      
      return Note;
    }
  }

  updateNote(noteId: string, Note: Partial<Note>): Partial<Note> | undefined {
    
    const existingNote = this.db.data.Notes.find(note => note.id === noteId);

    if (existingNote) {
      
      Object.assign(existingNote, Note);
      
      this.db.write();
      
      return Note;
    }
    return undefined;
  }

  deleteNote(id: string) {
    const initialNotesLenght = this.db.data.Notes.length;
    this.db.data.Notes = this.db.data.Notes.filter(note => note.id !== id);

    this.db.write();
    return initialNotesLenght !== this.db.data.Notes.length;
  }
}

export const noteRepository = new NoteRepository(db);