// ===================================================
// API CONNECT - ROTAS DE USUÁRIOS
// Arquivo: src/routes/userRoutes.js
// Autor: Jheyson Siqueira
// ===================================================

const express = require('express');
const router = express.Router();

// Importação dos métodos do controlador
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// 1. ENDPOINTS RESTful
router.get('/', getAllUsers);       // GET /users - Listar todos
router.get('/:id', getUserById);    // GET /users/:id - Buscar por ID
router.post('/', createUser);       // POST /users - Criar usuário
router.put('/:id', updateUser);     // PUT /users/:id - Atualizar usuário
router.delete('/:id', deleteUser);  // DELETE /users/:id - Remover usuário

// 2. EXPORTAÇÃO DO ROTEADOR
module.exports = {
  router
};
