const db = require('../../config/db')

module.exports = {
  async create({filename, path, recipe_id}) {
    let query = `
      INSERT INTO files (name, path)
      VALUES ($1, $2)
      RETURNING id
    `

    let values = [filename, path]

    const result = await db.query(query, values)
    const fileId = result.rows[0].id

    query = `
      INSERT INTO recipes_files (recipe_id, file_id)
      VALUES ($1, $2)
      RETURNING id
    `

    values = [recipe_id, fileId]

    return db.query(query, values)
  },
  update({filename, path, recipe_id}) {
    let query = `
      UPDATE files SET name=($1), path=($2)
      WHERE id=$3
    `
    let values = [filename, path]
    
    let result = await db.query(query, values)
    const fileId = result.rows[0].id


  },
  delete(id) {
    db.query(`DELETE FROM recipes_files WHERE recipe_id = $1`, [id])

    return db.query(`DELETE FROM files WHERE id = $1`, [id])
  }
}