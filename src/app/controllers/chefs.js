const Chefs = require('../models/Chefs')
const File = require('../models/File')

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
  show (req, res) {
    Chefs.find(req.params.id, chef => {
      if (!chef) res.send('chef não encontrado')
      Chefs.findRecipe(req.params, recipes => {
        return res.render("admin/chefs/details", {chef, recipes})
      })
    })
  },
  edit (req, res) {
    Chefs.find(req.params.id, chef => {
      if (!chef) {
        return res.send('chef não encontrado')
      }
      return res.render("admin/chefs/edit", {chef})
    })
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