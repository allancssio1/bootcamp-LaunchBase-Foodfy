const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes.js')
const user = require('./app/controllers/user.js')

routes.get('/', function (req, res) {
  res.redirect('index')
})

routes.get("/admin/recipes", recipes.index) 
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

routes.get("/index", user.index)
routes.get("/about", user.about)
routes.get("/recipes", user.recipes)
routes.get("/recipes/:id", user.show)

module.exports = routes