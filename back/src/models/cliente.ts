import { db } from '../config/banco';

export interface Cliente {
  id_cliente?: number;
  nome: string;
  cnpj_cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
}

export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
  const [result] = await db.execute(
    `INSERT INTO clientes (nome, cnpj_cpf, endereco, cidade, estado, cep, telefone, email) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [cliente.nome, cliente.cnpj_cpf, cliente.endereco, cliente.cidade, cliente.estado, cliente.cep, cliente.telefone, cliente.email]
  );
  
  const [rows] = await db.execute('SELECT * FROM clientes WHERE id_cliente = ?', [(result as any).insertId]);
  return (rows as Cliente[])[0];
};

export const getClientes = async (): Promise<Cliente[]> => {
  const [rows] = await db.execute('SELECT * FROM clientes ORDER BY nome');
  return rows as Cliente[];
};

export const getClienteById = async (id: number): Promise<Cliente | null> => {
  const [rows] = await db.execute('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
  return (rows as Cliente[])[0] || null;
};

export const updateCliente = async (id: number, cliente: Cliente): Promise<Cliente> => {
  await db.execute(
    `UPDATE clientes SET nome = ?, cnpj_cpf = ?, endereco = ?, cidade = ?, estado = ?, cep = ?, telefone = ?, email = ? 
     WHERE id_cliente = ?`,
    [cliente.nome, cliente.cnpj_cpf, cliente.endereco, cliente.cidade, cliente.estado, cliente.cep, cliente.telefone, cliente.email, id]
  );
  
  const [rows] = await db.execute('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
  return (rows as Cliente[])[0];
};

export const deleteCliente = async (id: number): Promise<void> => {
  await db.execute('DELETE FROM clientes WHERE id_cliente = ?', [id]);
};