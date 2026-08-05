// ===================================================
// API CONNECT - CAMADA DE PERSISTÊNCIA EM MEMÓRIA
// Arquivo: src/data/usersData.js
// Autor: Jheyson Siqueira
// ===================================================

// 1. BASE DE DADOS INICIAL (MOCK DATA)
const users = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@startup.com",
    cargo: "Desenvolvedora Front-end",
    ativo: true,
    criadoEm: "2026-08-01T10:00:00.000Z",
    atualizadoEm: "2026-08-01T10:00:00.000Z"
  },
  {
    id: 2,
    nome: "Carlos Eduardo",
    email: "carlos.eduardo@startup.com",
    cargo: "Designer UX/UI",
    ativo: true,
    criadoEm: "2026-08-02T14:30:00.000Z",
    atualizadoEm: "2026-08-02T14:30:00.000Z"
  }
];

// 2. GERADOR DE ID ÚNICO INCREMENTAL
let currentIdCounter = users.length + 1;

const generateNextId = () => {
  return currentIdCounter++;
};

// 3. MÉTODOS AUXILIARES DE MANIPULAÇÃO DE DADOS
const findAll = () => {
  return users;
};

const findById = (id) => {
  const numericId = Number(id);
  return users.find((user) => user.id === numericId);
};

const findByEmail = (email) => {
  if (!email) return undefined;
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

const create = ({ nome, email, cargo }) => {
  const newUser = {
    id: generateNextId(),
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    cargo: cargo ? cargo.trim() : "Não informado",
    ativo: true,
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString()
  };

  users.push(newUser);
  return newUser;
};

const update = (id, { nome, email, cargo, ativo }) => {
  const user = findById(id);
  if (!user) return null;

  if (nome !== undefined) user.nome = nome.trim();
  if (email !== undefined) user.email = email.trim().toLowerCase();
  if (cargo !== undefined) user.cargo = cargo.trim();
  if (ativo !== undefined) user.ativo = Boolean(ativo);
  
  user.atualizadoEm = new Date().toISOString();

  return user;
};

const remove = (id) => {
  const numericId = Number(id);
  const index = users.findIndex((user) => user.id === numericId);

  if (index === -1) return false;

  users.splice(index, 1);
  return true;
};

// 4. EXPORTAÇÃO DOS MÓDULOS DA CAMADA DE DADOS
module.exports = {
  users,
  generateNextId,
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove
};
