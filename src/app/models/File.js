const db = require('../../config/db')
const fs = require('fs')

module.exports = {
  async create({filename, path, recipe_id, fieldname}) {
    let query = `
      INSERT INTO files (name, path)
      VALUES ($1, $2)
      RETURNING id
    `

    let values = [filename, path]

    const result = await db.query(query, values)
    const fileId = result.rows[0].id
    if(recipe_id) {
      query = `
        INSERT INTO recipes_files (recipe_id, file_id)
        VALUES ($1, $2)
        RETURNING id`

      values = [recipe_id, fileId]

      return db.query(query, values)
    }

    if(fieldname == 'avatar') {
      return fileId
    }

  },
  findFileForId(id) {
    try {
      return db.query(`SELECT * FROM files WHERE id = $1`, [id])
    } catch (error) {
      console.log(error)
    }
  },
  async update({filename, path, recipe_id}) {
    try {
      let query = `
        UPDATE files SET name=($1), path=($2)
        WHERE id=$3
      `
      let values = [filename, path]
      
      let result = await db.query(query, values)
      const fileId = result.rows[0].id
    
      query = `
        UPDATE recipes_files SET recipe_id=($1), file_id=($2)
        WHERE id=$3
      `
      values = [recipe_id, fileId]
      
      return db.query(query, values)
      
    } catch (error) {
      console.error(error)
    }
  },
  async delete(id) {
    try {
      let result = await db.query(`SELECT * FROM recipes_files WHERE file_id = $1`, [id])
      if(result.rows[0]) {
        const idRecipesFiles = result.rows[0].id
        
        await db.query(`DELETE FROM recipes_files WHERE id = $1`, [idRecipesFiles])
      }

      result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
      const file = result.rows[0]
      
      if (file.path) {
        fs.unlinkSync(file.path)
      }

      return db.query(`DELETE FROM files WHERE id = $1`, [id])
    } catch (error) {

      console.error(error)

    }

  }
}