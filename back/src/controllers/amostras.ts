import { Request, Response } from 'express';
import * as AmostraModel from '../models/amostra';

export const getAmostras = async (req: Request, res: Response): Promise<void> => {
  try {
    const amostras = await AmostraModel.getAmostras();
    res.json(amostras);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar amostras', error });
  }
};

export const getAmostraById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const amostra = await AmostraModel.getAmostraById(id);
    
    if (!amostra) {
      res.status(404).json({ message: 'Amostra não encontrada' });
      return;
    }
    
    res.json(amostra);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar amostra', error });
  }
};

export const createAmostra = async (req: Request, res: Response): Promise<void> => {
  try {
    const amostra = await AmostraModel.createAmostra(req.body);
    res.status(201).json(amostra);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar amostra', error });
  }
};

export const updateAmostra = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const amostra = await AmostraModel.updateAmostra(id, req.body);
    res.json(amostra);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar amostra', error });
  }
};

export const deleteAmostra = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await AmostraModel.deleteAmostra(id);
    res.json({ message: 'Amostra deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar amostra', error });
  }
};