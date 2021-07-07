const {date} = require('../lib/utils')
const db = require('../../config/db')

module.exports = {
  all() {
    return db.query (`SELECT * FROM chefs`)
  },
  find (id) {
    try {
      return db.query(`SELECT * FROM chefs WHERE id = $1`, [id])

    } catch (error) {
      console.error(error)
    }
  },
  findRecipe(chef_id, callback) {
    db.query (`SELECT recipes.* FROM recipes WHERE recipes.chef_id=$1`, [chef_id.id],
      (err, results) => {
        if (err) throw `Database error ${err}`
        callback(results.rows)
      }
    )
  },
  create ({name, file_id}) {
    const query = `INSERT INTO chefs (name, file_id, created_at) VALUES ($1, $2, $3) RETURNING id`

    const values = [name, file_id, date(Date.now()).iso]
    
    return db.query(query, values)
  },
  update ({id, name, file_id}) {
    try {
      const query = `
        UPDATE chefs SET
          name=($1),
          file_id=($2)
        WHERE id=$3
      `
      const values = [name, file_id, id]
      
      return db.query(query, values)
    } catch (error) {
      console.error(error)
    }
  },
  delete (id){
    try {
      
      
    } catch (error) {
      
    }
  }
}