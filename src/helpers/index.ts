import crypto from 'crypto';
import Note from 'src/models/note';
import Statistics from 'src/models/statistics';
import { Category } from 'src/models/category';
const SECRET = 'ANTONIO-REST-API';

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');

export const getStatistics = (notes: Note[]): Statistics[] => {
  
  const statistics: Statistics[] = [];
  
  (['Idea', 'Random Thought', 'Task'] as Category[]).forEach(category => {
    
    statistics.push({
      Category: category,
      Active: notes.filter(note => note.category === category && !note.isArchived).length,
      Archived: notes.filter(note => note.category === category && note.isArchived).length,
    });
  })
  console.log(statistics, "damn.");
  
  return statistics;
}