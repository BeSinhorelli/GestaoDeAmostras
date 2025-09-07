import { Request, Response } from 'express';
import * as ClienteModel from '../models/cliente';

export const getClientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await ClienteModel.getClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error });
  }
};

export const getClienteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const cliente = await ClienteModel.getClienteById(id);
    
    if (!cliente) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }
    
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error });
  }
};

export const createCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const cliente = await ClienteModel.createCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cliente', error });
  }
};

export const updateCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const cliente = await ClienteModel.updateCliente(id, req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cliente', error });
  }
};

export const deleteCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await ClienteModel.deleteCliente(id);
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente', error });
  }
};