const db = require('../../config/db')

module.exports ={
  findRecipeId(id) {
    return db.query(`SELECT * FROM recipes_files WHERE recipe_id = $1`, [id])
  }
}