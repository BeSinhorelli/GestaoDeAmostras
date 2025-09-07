import { Router } from 'express';
import {
  getAmostras,
  getAmostraById,
  createAmostra,
  updateAmostra,
  deleteAmostra
} from '../controllers/amostras';

const router = Router();

router.get('/', getAmostras);
router.get('/:id', getAmostraById);
router.post('/', createAmostra);
router.put('/:id', updateAmostra);
router.delete('/:id', deleteAmostra);

export default router;