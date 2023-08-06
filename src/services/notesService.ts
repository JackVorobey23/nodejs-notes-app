import Note from "../models/note";
import { NoteRepository, noteRepository } from "../repository/noteRepository.js";

class NotesService {
  
  constructor (private noteRepository: NoteRepository) {

  }
  getAll = () => this.noteRepository.getAllNotes();

  getById(id: string): (Note | null)  {
    
    const note = this.noteRepository.getNoteById(id);

    if (note) {
      return note;
    }

    else {
      return null;
    }
  }

  create(note: Note) {
    return this.noteRepository.addNote(note);
  }

  update(noteId: string, noteToUpdate: Partial<Note>) {
    return this.noteRepository.updateNote(noteId, noteToUpdate);
  }

  delete(id: string) {
    return this.noteRepository.deleteNote(id);
  }
}

export const notesService = new NotesService(noteRepository);