import express from 'express';
import { listNotes,createdNote, statsNotes, getNote, updatedNote, deleteNote } from '../controllers';

const router = express.Router();

router.get('/notes', listNotes );

router.get('/notes/stats', statsNotes);

router.get('/notes/:id',getNote);

router.post('/notes',createdNote);

router.patch('/notes/:id',updatedNote );

router.delete('/notes/:id',deleteNote );

export default router;