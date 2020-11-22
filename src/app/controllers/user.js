const Recipes = require ('../models/Recipes')
const Chefs = require('../models/Chefs')

module.exports = {
  index (req, res) {
    let {filter} = req.query
    if(filter) {
      Recipes.findBy(filter, recipes => {
        return res.render("user/results", {recipes})
      })
    } else if(!filter) {
      Recipes.all(recipes => {
        return res.render("user/index", {recipes})
      })    
    }

  },
  about (req, res) {
    return res.render("user/about")
  },
  recipes (req, res) {
    let {filter} = req.query
    if (filter) {
      Recipes.findBy(filter, recipes => {
        return res.render("user/results", {results})
      })
    } else if(!filter) {
      Recipes.all(recipes => {
        return res.render("user/recipes", {recipes})
      })
    }
  },
  chefs(req, res) {
    Chefs.all(chefs => {
        return res.render("user/chefs", {chefs})
    })
  },
  search (req, res) {
    let {filter} = req.query
    if (!filter) {
      return res.render("user/nofound")
    } else {
      Recipes.findBy(filter, recipes => {
        return res.render("user/results", {recipes, filter})
      })
    }
  },
  show (req, res) {
    Recipes.find(req.params.id, recipe => {
      return res.render("user/show", {recipe})
    })
  }
}