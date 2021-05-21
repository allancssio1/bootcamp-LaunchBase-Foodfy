const Recipes = require('../models/Recipes')
const File = require('../models/File')
const Chefs = require('../models/Chefs')
const RecipeAndFiles = require('../models/RecipeAndFiles')

module.exports = {
  async index (req, res) {
    await Recipes.all(recipes => {
      return res.render('admin/recipes/index', { recipes })
    }) 
    
  },
  async create (req, res) {
    let result = await Recipes.selectChefs()
    const chefOptions = result.rows
    return res.render('admin/recipes/create', { chefOptions })
  },
  async post (req, res) {
    if (req.body.chef == ""|| req.body.title == "") {
      return res.send('Preencha todos os campos')
    }

    if(req.files.length == 0)
      return res.send("Enviar ao menos uma imagem!")

    let result = await Recipes.create(req.body)
    const recipeId = result.rows[0].id
    
    let filesPromise = req.files.map(file => File.create({ ...file, recipe_id: recipeId }))
    await Promise.all(filesPromise)

    return res.redirect(`/admin/recipes/${recipeId}`)
  },
  async show (req, res) {
    let result = await Recipes.find(req.params.id) 
    const recipe = result.rows[0]
      
    if (!recipe) 
      return res.render('user/nofound')

    
    result = await RecipeAndFiles.findRecipeId(recipe.id)

    const filesPromises = result.rows.map(file => {
      return File.findFileForId(file.file_id)
    } )
    await Promise.all(filesPromises)

    const files = await Promise.all(filesPromises)
    const totalFiles = files.map(file => file.rows)
    
    return res.render('admin/recipes/show', { recipe, totalFiles })
  },
  async edit (req, res) {
    let result = await Recipes.find(req.params.id)
    const recipe = result.rows[0]
    
    result = await Chefs.all()
    const optionsOfChefs = result.rows

    return res.render('admin/recipes/edit', { recipe, chefOptions: optionsOfChefs })
  },
  async put (req, res) {
    if (req.body.chef == "" && req.body.title == "") {
      return res.send('Preencha todos os campos')
    }
    
    if(req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(',')
      const lastIndex = removedFiles.length - 1
      removedFiles.split(lastIndex, 1)

      const removedFilesPromisse = removedFiles.map(id => File.delete(id))
      await Promise.all(removedFilesPromisse)
    }
    
    if(req.files.length == 0) return res.send('Enviar ao menos uma imagem!')

    let result = await Recipes.update(req.body)
    const recipeId = result.rows[0].id

    let filesPromise = req.files.map(file => File.update({
      ...file,
      recipe_id: recipeId
    }))
    await Promise.all(filesPromise)

    return res.redirect(`/admin/recipes/${recipeId}`)
  },
  delete (req, res) {
    Recipes.delete(req.body.id, () => {
      return res.redirect ('/admin/recipes')
    })
  }
}