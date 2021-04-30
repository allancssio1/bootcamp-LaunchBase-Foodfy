const Recipes = require('../models/Recipes')
const File = require('../models/File')

module.exports = {
  async index (req, res) {
    await Recipes.all(recipes => {
      return res.render('admin/recipes/index', { recipes })
    }) 
    
  },
  async create (req, res) {
    await Recipes.selectOption(option => {
      return res.render('admin/recipes/create', {chefOptions: option})
    })
  },
  async post (req, res) {
    if (req.body.chef == ""|| req.body.title == "") {
      return res.send('Preencha todos os campos')
    }

    if(req.files.length == 0)
      return res.send("Please, send at least one image!")
    
    let result = await Recipes.create(req.body)
    const recipe = result.rows[0].id

    await Recipes.create(req.body, recipe => {
      return res.redirect(`/admin/recipes/${recipe}`)
    })
  },
  show (req, res) {
    Recipes.find(req.params.id, recipe => {
      if (!recipe) {
        return res.render('user/nofound')
      }
      return res.render('admin/recipes/show', { recipe })
    })
  },
  edit (req, res) {
    Recipes.find(req.params.id, recipe => {
      Recipes.selectOption(option => {
        return res.render('admin/recipes/edit', { recipe, chefOptions: option })
      })
    })
  },
  put (req, res) {
    if (req.body.chef == "" && req.body.title == "") {
      return res.send('Preencha todos os campos')
    }
    Recipes.update(req.body, function () {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete (req, res) {
    Recipes.delete(req.body.id, () => {
      return res.redirect ('/admin/recipes')
    })
  }
}