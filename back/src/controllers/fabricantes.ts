import { Request, Response } from 'express';
import * as FabricanteModel from '../models/fabricante';

export const getFabricantes = async (req: Request, res: Response): Promise<void> => {
  try {
    const fabricantes = await FabricanteModel.getFabricantes();
    res.json(fabricantes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fabricantes', error });
  }
};

export const getFabricanteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const fabricante = await FabricanteModel.getFabricanteById(id);
    
    if (!fabricante) {
      res.status(404).json({ message: 'Fabricante não encontrado' });
      return;
    }
    
    res.json(fabricante);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fabricante', error });
  }
};

export const createFabricante = async (req: Request, res: Response): Promise<void> => {
  try {
    const fabricante = await FabricanteModel.createFabricante(req.body);
    res.status(201).json(fabricante);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar fabricante', error });
  }
};

export const updateFabricante = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const fabricante = await FabricanteModel.updateFabricante(id, req.body);
    res.json(fabricante);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar fabricante', error });
  }
};

export const deleteFabricante = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await FabricanteModel.deleteFabricante(id);
    res.json({ message: 'Fabricante deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar fabricante', error });
  }
};