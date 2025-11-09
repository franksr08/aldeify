// index.js (Atualizado para incluir a conexão com o DB)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Importação da configuração do banco de dados
const db = require('./db.config'); 

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// --- Middlewares Globais (sem alteração) ---
const corsOptions = {
    origin: CORS_ORIGIN, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Rota de Teste Simples (sem alteração)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Bem-vindo ao Backend aldeify!', 
        status: 'Online',
        environment: process.env.NODE_ENV || 'development'
    });
});

// --- Inicialização do Servidor ---
app.listen(PORT, async () => {
    console.log(`🚀 Servidor aldeify rodando em http://localhost:${PORT}`);
    console.log(`CORS habilitado para: ${CORS_ORIGIN}`);
    
    // CHAMADA: Inicia a conexão com o banco de dados MySQL
    await db.connectDB(); 
});
