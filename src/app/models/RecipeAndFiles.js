const db = require('../../config/db')

module.exports ={
  create ({recipe_id, chef_id}) {
    const query =`
      INSERT INTO recipes_files (recipe_id, chef_id)
      VALUES ($1, $2)
      RETURNING id
    `
    
    const values = [recipe_id, chef_id]

    return db.query(query, values)
  }
}