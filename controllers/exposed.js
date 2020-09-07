const receitas = require("../data.js")

exports.index = function(req, res){
  return res.render("exposed/index", { items: receitas })
}

exports.about = function(req, res){
  return res.render("exposed/about")
}

exports.recipes = function(req, res){
  return res.render("exposed/recipes", { items: receitas })
}

exports.show = function(req, res){
  const recipeId = req.params.id
  const indexId = receitas.find(function(element){
      return element.id == recipeId
  })
  const items = receitas[receitas.indexOf(indexId)]
  
  return res.render("exposed/show", {items})
}