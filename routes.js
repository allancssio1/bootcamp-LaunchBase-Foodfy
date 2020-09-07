const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/recipes')
const exposed = require('./controllers/exposed')

routes.get('/', function(req, res) {
  res.redirect('/index')
})

routes.get("/admin/recipes", recipes.index) 
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

routes.get("/index", exposed.index)
routes.get("/about", exposed.about)
routes.get("/recipes", exposed.recipes)
routes.get("/recipe/:id", exposed.show)

module.exports = routes