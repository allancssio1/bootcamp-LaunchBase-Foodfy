const Chefs = require('../models/Chefs')
const File = require('../models/File')
const Recipes = require('../models/Recipes')

module.exports = {
  async index (req, res) {
    let result = await Chefs.all()
    const chefs = result.rows
    return res.render("admin/chefs/index", {chefs})
  },
  create (req, res) {
    return res.render("admin/chefs/create")
  },
  async post (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os dados")
      }
    }

    if(req.files == "") {
      return res.send("Enviar ao menos uma imagem!")
    }

    let result = await Promise.all(req.files.map(file => File.create(file)))
    const idFile = result[0]
    
    result = await Chefs.create({...req.body, file_id: idFile })
    const chef = result.rows[0].id

    return res.redirect(`/admin/chefs/${chef}`)
  },
  async show (req, res) {
    let result = await Chefs.find(req.params.id)
    const chef = result.rows[0]

    if(!chef) {
      return res.send("Chefe não encontrado!")
    }

    result = await File.findFileForId(chef.file_id)
    let fileChef = result.rows[0]
    fileChef.src = `${req.protocol}://${req.headers.host}${fileChef.path.replace("public", "")}`

    result = await Recipes.findRecipeForChef(chef.id)
    let recipes = result.rows

    recipesCount = recipes.length
    
    if(recipes != "") {
      result = await File.findFileForId(recipes[0].id)
      let fileRecipe = result.rows[0]
      fileRecipe.src = `${req.protocol}://${req.headers.host}${fileRecipe.path.replace("public", "")}`

      return res.render("admin/chefs/details", { chef, recipes, fileChef, fileRecipe})
    }
    
    

    return res.render("admin/chefs/details", { chef, fileChef, recipes })
  },
  async edit (req, res) {
    let result = await Chefs.find(req.params.id)
    const chef = result.rows[0]
    // console.log(chef)

    // return res.send('chef não encontrado')
    // return res.render("admin/chefs/edit", {chef})
    return res.send('final')
  },
  put (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == ""){
        res.send('Preencha todos os dados')
      }
    }
    Chefs.update(req.body, () => {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete (req, res) {
    Chefs.delete(req.body.id, chef => {
      return res.redirect(`/admin/chefs`)
    })
  }
}