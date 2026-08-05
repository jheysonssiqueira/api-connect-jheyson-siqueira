// ===================================================
// API CONNECT - SERVIDOR PRINCIPAL
// Arquivo: src/server.js
// Autor: Jheyson Siqueira
// ===================================================

const express = require('express');
const cors = require('cors');
const { router: userRoutes } = require('./routes/userRoutes');

// Inicialização da aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARES GLOBAIS
app.use(cors());
app.use(express.json());

// 2. ROTA DE HEALTH CHECK
app.get('/', (req, res) => {
  return res.status(200).json({
    status: "sucesso",
    codigo: 200,
    mensagem: "API Connect operacional e pronta para uso.",
    timestamp: new Date().toISOString()
  });
});

// 3. MAPEAMENTO DAS ROTAS DE USUÁRIOS
app.use('/users', userRoutes);

// 4. TRATAMENTO PARA ROTAS INEXISTENTES (404)
app.use((req, res) => {
  return res.status(404).json({
    status: "erro",
    codigo: 404,
    mensagem: "Rota não encontrada na API Connect."
  });
});

// 5. INICIALIZAÇÃO DO SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor API Connect rodando na porta ${PORT}`);
  console.log(`📍 Endereço local: http://localhost:${PORT}/users`);
});
