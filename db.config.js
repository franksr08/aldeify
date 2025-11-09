// db.config.js (Configuração e Conexão com o Banco de Dados MySQL)

const { Sequelize } = require('sequelize');

// 1. Instância do Sequelize
// As credenciais são carregadas do arquivo .env
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Ex: aldeify_db
    process.env.DB_USER,      // Ex: root
    process.env.DB_PASSWORD,  // Ex: sua_senha_mysql
    {
        host: process.env.DB_HOST, // Ex: localhost
        dialect: 'mysql',
        // Desativar logs de consulta SQL para manter o console limpo
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

// 2. Importação e Associação dos Modelos 
// IMPORTANTE: Adicione novos modelos aqui à medida que forem criados.
db.City = require('./City.model')(sequelize, Sequelize); 
db.Neighborhood = require('./Neighborhood.model')(sequelize, Sequelize); 
db.User = require('./User.model')(sequelize, Sequelize);

// Chamar a função associate em todos os modelos que a possuem
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        // A função associate do modelo é chamada, passando o objeto 'db' que contém todos os modelos
        db[modelName].associate(db);
    }
});


// Função para testar a conexão e sincronizar o banco de dados
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso.');
        
        // Sincroniza todos os modelos com o banco de dados
        // 'alter: true' faz alterações incrementais nas tabelas (mais seguro)
        await sequelize.sync({ alter: true }); 
        console.log('🔄 Todos os modelos foram sincronizados com sucesso.');

    } catch (error) {
        console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error.message);
        // Em um ambiente de produção, seria crucial ter um mecanismo de retry ou log mais robusto.
    }
};

db.connectDB = connectDB;

module.exports = db;
