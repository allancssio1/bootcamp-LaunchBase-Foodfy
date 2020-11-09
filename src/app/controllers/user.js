const data = require("../../../data.json")

exports.index = function (req, res) {
  return res.render("user/index", { items: data.recipes })
}

exports.about = function (req, res) {
  return res.render("user/about")
}

exports.recipes = function (req, res) {
  return res.render("user/recipes", { items: data.recipes })
}

exports.show = function (req, res) {
  const { id } = req.params

  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id
  })

  if (!foundRecipe) return res.render('user/nofound')
  
  return res.render("user/show", { items: foundRecipe })
}