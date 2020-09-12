const data = require('../data.json')
const fs = require('fs')
const {valueInput} = require("../utils")

exports.index = function (req, res) {
  return res.render('admin/recipes/index', { items: data.recipes })
}

exports.create = function (req, res) {
  return res.render('admin/recipes/create')
}

exports.post = function (req, res) {
  const keys = Object.keys(req.body)

  let {
    title,
    author,
    image,
    ingredients,
    preparation,
    information
  } = req.body

  id=1
  for (let i = 0; i <= data.recipes.length; i++){
    data.recipes.map(function (element) {
        if (element.id == id) return id = id+1

        return id
    })
  }
  data.recipes.push({
    id,
    title,
    author,
    image,
    ingredients,
    preparation,
    information
  }) 

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ('Error file')

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.show = function (req, res) {
  const {id} = req.params
  const foundRecipe = data.recipes.find(function (recipe) {
    return id == recipe.id
  })

  if (!foundRecipe) return res.render('exposed/nofound')

  return res.render('admin/recipes/show', { items: foundRecipe })

}

exports.edit = function (req, res) {
  const {id} = req.params
  const foundRecipe = data.recipes.find(function (recipe) {
     return recipe.id == id
  })

  if (!foundRecipe) return res.render('exposed/nofound')

  return res.render('admin/recipes/edit', { items: foundRecipe })
}

exports.put = function (req, res) {
  const {id} = req.body
  let index = 0
  const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
    if (recipe.id == id) {
      index = foundIndex
      return true
    }
  })
 console.log(req.body.preparation)
  if (!foundRecipe) return res.render('exposed/nofound')
  
  const recipe = {
    ...foundRecipe,
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    ingredients: req.body.ingredients,
    preparation: req.body.preparation,
    information: req.body.information
  }
  
  data.recipes[index] = recipe
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('error file')

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.delete = function (req, res) {
  const { id } = req.body
  const filterRecipe = data.recipes.filter(function (recipe) {
    return recipe.id != id
  })

  data.recipes = filterRecipe

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send ('Write error')
    }
    return res.redirect ('/admin/recipes')
  })
}