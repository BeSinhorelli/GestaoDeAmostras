import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Criar pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'labelo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Converter para promises
export const db = pool.promise();

// Testar conexão
export const connectDB = async (): Promise<void> => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Conectado ao MySQL - Banco: labelo');
        connection.release();
        
        // Criar tabelas se não existirem
        await createTables();
    } catch (error) {
        console.error('❌ Erro ao conectar com MySQL:', error);
        process.exit(1);
    }
};

// Criar tabelas baseadas na sua estrutura
const createTables = async (): Promise<void> => {
    try {
        // Tabela de clientes
        await db.execute(`
            CREATE TABLE IF NOT EXISTS clientes (
                id_cliente INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                cnpj_cpf VARCHAR(50) NOT NULL,
                endereco VARCHAR(255) NOT NULL,
                cidade VARCHAR(100) NOT NULL,
                estado VARCHAR(50) NOT NULL,
                cep VARCHAR(20) NOT NULL,
                telefone VARCHAR(30) NOT NULL,
                email VARCHAR(100) NOT NULL,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabela de fabricantes
        await db.execute(`
            CREATE TABLE IF NOT EXISTS fabricantes (
                id_fabricante INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                localizacao VARCHAR(100) NOT NULL,
                contato VARCHAR(100) NOT NULL,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabela de amostras
        await db.execute(`
            CREATE TABLE IF NOT EXISTS amostras (
                id_amostra INT AUTO_INCREMENT PRIMARY KEY,
                protocolo VARCHAR(50) NOT NULL,
                orcamento VARCHAR(50) NOT NULL,
                modelo VARCHAR(100) NOT NULL,
                produto VARCHAR(100) NOT NULL,
                tensao_alimentacao VARCHAR(50) NOT NULL,
                data_recebimento DATE NOT NULL,
                numero_serie VARCHAR(100) NOT NULL,
                id_cliente INT NOT NULL,
                id_fabricante INT NOT NULL,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
                FOREIGN KEY (id_fabricante) REFERENCES fabricantes(id_fabricante)
            )
        `);

        console.log('✅ Tabelas criadas/verificadas com sucesso');

    } catch (error) {
        console.error('❌ Erro ao criar tabelas:', error);
    }
};

export default { db, connectDB };