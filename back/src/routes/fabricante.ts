import { Router } from 'express';
import {
  getFabricantes,
  getFabricanteById,
  createFabricante,
  updateFabricante,
  deleteFabricante
} from '../controllers/fabricantes';

const router = Router();

router.get('/', getFabricantes);
router.get('/:id', getFabricanteById);
router.post('/', createFabricante);
router.put('/:id', updateFabricante);
router.delete('/:id', deleteFabricante);

export default router;