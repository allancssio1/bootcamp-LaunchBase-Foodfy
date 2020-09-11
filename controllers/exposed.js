const data = require("../data.json")

exports.index = function (req, res) {
  return res.render("exposed/index", { items: data.recipes })
}

exports.about = function (req, res) {
  return res.render("exposed/about")
}

exports.recipes = function (req, res) {
  return res.render("exposed/recipes", { items: data.recipes })
}

exports.show = function (req, res) {
  const { id } = req.params

  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id
  })

  if (!foundRecipe) return res.render('exposed/nofound')
  
  return res.render("exposed/show", { items: foundRecipe })
}