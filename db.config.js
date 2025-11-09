// db.config.js (Configuração e Conexão com o Banco de Dados MySQL)

const { Sequelize } = require('sequelize');
const path = require('path'); // Usado para garantir que os caminhos dos modelos sejam resolvidos corretamente

// 1. Instância do Sequelize
// As credenciais são carregadas do arquivo .env
const sequelize = new Sequelize(
    process.env.DB_NAME,      // aldeify_db
    process.env.DB_USER,      // root
    process.env.DB_PASSWORD,  // sua_senha_mysql
    {
        host: process.env.DB_HOST, // localhost
        dialect: 'mysql',
        // Desativar logs de consulta SQL para manter o console limpo (pode ser ativado para debug)
        logging: false, 
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Objeto para exportar a conexão e os modelos
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 2. Importação e Associação dos Modelos (Serão adicionados na M3)
// Por enquanto, apenas o modelo de Usuário (User) como exemplo:
// db.User = require('./User.model')(sequelize, Sequelize); 
// db.City = require('./City.model')(sequelize, Sequelize); 
// ...

// Função para testar a conexão e sincronizar o banco de dados
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso.');
        
        // Sincroniza todos os modelos com o banco de dados
        // { force: true } DROPPA as tabelas se existirem (USE APENAS EM AMBIENTE DE DEV)
        // { alter: true } Faz alterações incrementais nas tabelas (mais seguro)
        await sequelize.sync({ alter: true }); 
        console.log('🔄 Todos os modelos foram sincronizados com sucesso.');

    } catch (error) {
        console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error.message);
        // Pode-se encerrar o processo se a conexão for crítica
        // process.exit(1); 
    }
};

db.connectDB = connectDB;

module.exports = db;
