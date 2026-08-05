// ===================================================
// API CONNECT - CONTROLADOR DE USUÁRIOS
// Arquivo: src/controllers/userController.js
// Autor: Jheyson Siqueira
// ===================================================

const usersData = require('../data/usersData');

// 1. LISTAR TODOS OS USUÁRIOS (GET /users)
const getAllUsers = (req, res) => {
  try {
    const usersList = usersData.findAll();
    return res.status(200).json({
      status: "sucesso",
      codigo: 200,
      totalRegistros: usersList.length,
      dados: usersList
    });
  } catch (error) {
    return res.status(500).json({
      status: "erro",
      codigo: 500,
      mensagem: "Falha interna ao recuperar a lista de usuários."
    });
  }
};

// 2. BUSCAR USUÁRIO POR ID (GET /users/:id)
const getUserById = (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ status: "erro", codigo: 400, mensagem: "ID inválido." });
    }

    const user = usersData.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "erro",
        codigo: 404,
        mensagem: `Usuário com o ID ${id} não foi encontrado.`
      });
    }

    return res.status(200).json({ status: "sucesso", codigo: 200, dados: user });
  } catch (error) {
    return res.status(500).json({ status: "erro", codigo: 500, mensagem: "Erro interno no servidor." });
  }
};

// 3. CADASTRAR NOVO USUÁRIO (POST /users)
const createUser = (req, res) => {
  try {
    const { nome, email, cargo } = req.body || {};
    const errosValidacao = [];

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
      errosValidacao.push("O campo 'nome' é obrigatório.");
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
      errosValidacao.push("O campo 'email' é obrigatório.");
    }

    if (email && typeof email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errosValidacao.push("O 'email' informado possui formato inválido.");
      }
    }

    if (errosValidacao.length > 0) {
      return res.status(400).json({
        status: "erro",
        codigo: 400,
        mensagem: "Falha na validação dos dados.",
        detalhes: errosValidacao
      });
    }

    const emailSanitizado = email.trim().toLowerCase();
    if (usersData.findByEmail(emailSanitizado)) {
      return res.status(409).json({
        status: "erro",
        codigo: 409,
        mensagem: "O e-mail informado já está cadastrado."
      });
    }

    const novoUsuario = usersData.create({ nome, email: emailSanitizado, cargo });
    return res.status(201).json({
      status: "sucesso",
      codigo: 201,
      mensagem: "Usuário cadastrado com sucesso!",
      dados: novoUsuario
    });
  } catch (error) {
    return res.status(500).json({ status: "erro", codigo: 500, mensagem: "Erro interno no servidor." });
  }
};

// 4. ATUALIZAR USUÁRIO (PUT /users/:id)
const updateUser = (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ status: "erro", codigo: 400, mensagem: "ID inválido." });
    }

    const { nome, email, cargo, ativo } = req.body || {};
    if (!nome && !email && !cargo && ativo === undefined) {
      return res.status(400).json({ status: "erro", codigo: 400, mensagem: "Informe dados para atualização." });
    }

    if (email) {
      const existing = usersData.findByEmail(email);
      if (existing && existing.id !== id) {
        return res.status(409).json({ status: "erro", codigo: 409, mensagem: "E-mail em uso por outro usuário." });
      }
    }

    const updatedUser = usersData.update(id, { nome, email, cargo, ativo });
    if (!updatedUser) {
      return res.status(404).json({ status: "erro", codigo: 404, mensagem: `Usuário com ID ${id} não encontrado.` });
    }

    return res.status(200).json({
      status: "sucesso",
      codigo: 200,
      mensagem: "Usuário atualizado com sucesso!",
      dados: updatedUser
    });
  } catch (error) {
    return res.status(500).json({ status: "erro", codigo: 500, mensagem: "Erro interno no servidor." });
  }
};

// 5. REMOVER USUÁRIO (DELETE /users/:id)
const deleteUser = (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ status: "erro", codigo: 400, mensagem: "ID inválido." });
    }

    const wasRemoved = usersData.remove(id);
    if (!wasRemoved) {
      return res.status(404).json({ status: "erro", codigo: 404, mensagem: `Usuário com ID ${id} não encontrado.` });
    }

    return res.status(200).json({
      status: "sucesso",
      codigo: 200,
      mensagem: `Usuário com ID ${id} removido com sucesso.`
    });
  } catch (error) {
    return res.status(500).json({ status: "erro", codigo: 500, mensagem: "Erro interno no servidor." });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
