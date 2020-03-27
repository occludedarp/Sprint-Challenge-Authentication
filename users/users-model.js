const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter);
}

function find() {
  return db("users").select('id', 'username');
}

function findById(id) {
  return db("users").where({ id }).select("id", "username", "password").first();
}