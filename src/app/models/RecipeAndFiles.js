const db = require('../../config/db')

module.exports ={
  findRecipeId(id) {
    try {
      return db.query(`SELECT * FROM recipes_files WHERE recipe_id = $1`, [id])
      
    } catch (err) {
      console.error(err)
    }
  }
}