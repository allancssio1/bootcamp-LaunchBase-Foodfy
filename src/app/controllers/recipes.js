const Recipes = require('../models/Recipes')
const File = require('../models/File')
const Chefs = require('../models/Chefs')

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
    const recipe = result.rows[0]

    const filePromise = req.files.map(file => File.create(file))
    await Promise.all(filePromise)
    const files = filePromise
    console.log(files)
    
    return res.redirect(`/admin/recipes/${recipe}`)
  },
  async show (req, res) {
    let result = await Recipes.find(req.params.id) 
    const recipe = result.rows[0]
      
    if (!recipe) 
      return res.render('user/nofound')
    
    return res.render('admin/recipes/show', { recipe })
  },
  async edit (req, res) {
    let result = await Recipes.find(req.params.id)
    const recipe = result.rows[0]
    
    result = await Chefs.all()
    const optionsOfChefs = result.rows
    return res.render('admin/recipes/edit', { recipe, chefOptions: optionsOfChefs })
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