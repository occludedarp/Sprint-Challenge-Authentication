const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById
}

function find() {
  return db("users").select('id', 'username');
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}