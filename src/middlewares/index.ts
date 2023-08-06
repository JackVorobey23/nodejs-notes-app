import express from 'express';
import * as yup from 'yup';
import Note from '../models/note';

const noteSchema = yup.object().shape({
  name: yup.string().min(1).required(),
  content: yup.string().min(1).required(),
  dates: yup.array().of(yup.string()),
  created: yup.string(),
  category: yup.string(),
  isArchived: yup.boolean(),
});

// export const updateNoteMiddleware = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const { id, ...updateFields } = req.body as Partial<Note>;

//   try {
//     const updateData = await noteSchema.validate(updateFields, { abortEarly: false });
//     console.log(updateData);
    
//     next();
//   } catch (error) {

//     return res.sendStatus(400);
//   }
// };

export const createNoteMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id, name, content, dates, created, category, isArchived } = req.body as Note;

  const fieldsToUpdate: Object = {};
  fieldsToUpdate.constructor

  Object.keys(noteSchema).forEach(key => {

  })
  try {
    await noteSchema.validate({
      id,
      name,
      content,
      dates,
      created,
      category,
      isArchived,
    });

    next();
  } catch (error) {
    return res.sendStatus(400);
  }
};
