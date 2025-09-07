import { db } from '../config/banco';

export interface Amostra {
  id_amostra?: number;
  protocolo: string;
  orcamento: string;
  modelo: string;
  produto: string;
  tensao_alimentacao: string;
  data_recebimento: Date;
  numero_serie: string;
  id_cliente: number;
  id_fabricante: number;
  cliente_nome?: string;
  fabricante_nome?: string;
}

export const createAmostra = async (amostra: Amostra): Promise<Amostra> => {
  const [result] = await db.execute(
    `INSERT INTO amostras (protocolo, orcamento, modelo, produto, tensao_alimentacao, data_recebimento, numero_serie, id_cliente, id_fabricante) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [amostra.protocolo, amostra.orcamento, amostra.modelo, amostra.produto, amostra.tensao_alimentacao, 
     amostra.data_recebimento, amostra.numero_serie, amostra.id_cliente, amostra.id_fabricante]
  );
  
  const [rows] = await db.execute(`
    SELECT a.*, c.nome as cliente_nome, f.nome as fabricante_nome 
    FROM amostras a
    LEFT JOIN clientes c ON a.id_cliente = c.id_cliente
    LEFT JOIN fabricantes f ON a.id_fabricante = f.id_fabricante
    WHERE a.id_amostra = ?
  `, [(result as any).insertId]);
  
  return (rows as Amostra[])[0];
};

export const getAmostras = async (): Promise<Amostra[]> => {
  const [rows] = await db.execute(`
    SELECT a.*, c.nome as cliente_nome, f.nome as fabricante_nome 
    FROM amostras a
    LEFT JOIN clientes c ON a.id_cliente = c.id_cliente
    LEFT JOIN fabricantes f ON a.id_fabricante = f.id_fabricante
    ORDER BY a.data_recebimento DESC
  `);
  return rows as Amostra[];
};

export const getAmostraById = async (id: number): Promise<Amostra | null> => {
  const [rows] = await db.execute(`
    SELECT a.*, c.nome as cliente_nome, f.nome as fabricante_nome 
    FROM amostras a
    LEFT JOIN clientes c ON a.id_cliente = c.id_cliente
    LEFT JOIN fabricantes f ON a.id_fabricante = f.id_fabricante
    WHERE a.id_amostra = ?
  `, [id]);
  
  return (rows as Amostra[])[0] || null;
};

export const updateAmostra = async (id: number, amostra: Amostra): Promise<Amostra> => {
  await db.execute(
    `UPDATE amostras SET protocolo = ?, orcamento = ?, modelo = ?, produto = ?, tensao_alimentacao = ?, 
     data_recebimento = ?, numero_serie = ?, id_cliente = ?, id_fabricante = ? 
     WHERE id_amostra = ?`,
    [amostra.protocolo, amostra.orcamento, amostra.modelo, amostra.produto, amostra.tensao_alimentacao, 
     amostra.data_recebimento, amostra.numero_serie, amostra.id_cliente, amostra.id_fabricante, id]
  );
  
  const [rows] = await db.execute(`
    SELECT a.*, c.nome as cliente_nome, f.nome as fabricante_nome 
    FROM amostras a
    LEFT JOIN clientes c ON a.id_cliente = c.id_cliente
    LEFT JOIN fabricantes f ON a.id_fabricante = f.id_fabricante
    WHERE a.id_amostra = ?
  `, [id]);
  
  return (rows as Amostra[])[0];
};

export const deleteAmostra = async (id: number): Promise<void> => {
  await db.execute('DELETE FROM amostras WHERE id_amostra = ?', [id]);
};