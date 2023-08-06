import express from 'express';
import { Router } from "express";

import { notesService } from "../services/notesService.js";
import { createNoteMiddleware as createNoteMiddleware } from "../middlewares/index.js";
import Note from "../models/note";
import { getStatistics } from '../helpers/index.js';
const router = Router();

//GET nodes statistics
router.get('/stats', (req: express.Request, res: express.Response) => {
  console.log(req.baseUrl);
  
  const notes = notesService.getAll();

  const statistics = getStatistics(notes);
  console.log(statistics.length);
  
  if (statistics.length !== 0) {
    
    res.send(statistics);
  } else {
    
    res.sendStatus(404);
  }
}); 

//GET ALL Notes
router.get('/', (req: express.Request, res: express.Response) => {
  console.log('Endpoint: GET /notes');

  const notes = notesService.getAll();

  if (notes.length !== 0) {
    res.send(notes);
  } else {
    res.sendStatus(404);
  }
});

// GET Note BY ID
router.get('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  console.log(id);
  
  if (id) {
    const note = notesService.getById(id);
    
    if (note) {
      res.send(note);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.status(400).send('Id was not provided in request params.');
  }
});

// CREATE Note
router.post('/', createNoteMiddleware, (req: express.Request, res: express.Response) => {
  const newNote: Note = req.body;

  const createdNote = notesService.create(newNote);

  if(createdNote !== null) {

    res.status(201).send(createdNote);
  }
  else {
    
    res.status(400).send('Note with same id already existed');
  }
});

// UPDATE Note
router.patch('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const updatedNoteData: Partial<Note> = req.body;

  const updatedNote = notesService.update(id, updatedNoteData);

  if (updatedNote) {
    res.send(updatedNote);
  } else {
    res.sendStatus(404);
  }
});

// DELETE Note
router.delete('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (notesService.delete(id)) {

    res.sendStatus(200);
  }
  else {
    
    res.sendStatus(404);
  }
});

export default router;