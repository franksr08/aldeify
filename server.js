// index.js (Arquivo Principal do Servidor)

// Importações e Configurações
require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const cors = require('cors');

// Inicialização do Aplicativo Express
const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// --- Middlewares Globais ---

// CORS: Configurado para aceitar requisições do front-end especificado
const corsOptions = {
    origin: CORS_ORIGIN, // Dominio: http://127.0.0.1:3000/
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

// Body Parser: Para que o Express entenda JSON
app.use(express.json()); 
// Body Parser: Para que o Express entenda dados de formulário (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// --- Estrutura de Rotas Modulares ---
// IMPORTANTE: Aqui, você colocaria todas as suas importações de rotas.
// Exemplo: 
// const authRoutes = require('./auth.routes'); 
// app.use('/api/auth', authRoutes);

// Rota de Teste Simples
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Bem-vindo ao Backend aldeify!', 
        status: 'Online',
        environment: process.env.NODE_ENV || 'development'
    });
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor aldeify rodando em http://localhost:${PORT}`);
    console.log(`CORS habilitado para: ${CORS_ORIGIN}`);
    
    // NOTA: A conexão com o DB será iniciada aqui na Meta M2
    // require('./db.config').connectDB(); 
});
