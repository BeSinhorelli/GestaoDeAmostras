import { db } from '../config/banco';

export interface Fabricante {
  id_fabricante?: number;
  nome: string;
  localizacao: string;
  contato: string;
}

export const createFabricante = async (fabricante: Fabricante): Promise<Fabricante> => {
  const [result] = await db.execute(
    'INSERT INTO fabricantes (nome, localizacao, contato) VALUES (?, ?, ?)',
    [fabricante.nome, fabricante.localizacao, fabricante.contato]
  );
  
  const [rows] = await db.execute('SELECT * FROM fabricantes WHERE id_fabricante = ?', [(result as any).insertId]);
  return (rows as Fabricante[])[0];
};

export const getFabricantes = async (): Promise<Fabricante[]> => {
  const [rows] = await db.execute('SELECT * FROM fabricantes ORDER BY nome');
  return rows as Fabricante[];
};

export const getFabricanteById = async (id: number): Promise<Fabricante | null> => {
  const [rows] = await db.execute('SELECT * FROM fabricantes WHERE id_fabricante = ?', [id]);
  return (rows as Fabricante[])[0] || null;
};

export const updateFabricante = async (id: number, fabricante: Fabricante): Promise<Fabricante> => {
  await db.execute(
    'UPDATE fabricantes SET nome = ?, localizacao = ?, contato = ? WHERE id_fabricante = ?',
    [fabricante.nome, fabricante.localizacao, fabricante.contato, id]
  );
  
  const [rows] = await db.execute('SELECT * FROM fabricantes WHERE id_fabricante = ?', [id]);
  return (rows as Fabricante[])[0];
};

export const deleteFabricante = async (id: number): Promise<void> => {
  await db.execute('DELETE FROM fabricantes WHERE id_fabricante = ?', [id]);
};