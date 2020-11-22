const Chefs = require('../models/Chefs')

module.exports = {
  index (req, res) {
    Chefs.all(chefs => {
      return res.render("admin/chefs/index", {chefs})
    })
  },
  create (req, res) {
    return res.render("admin/chefs/create")
  },
  post (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os dados")
      }
    }
    Chefs.create (req.body, chef => {
      return res.redirect(`/admin/chefs/${chef}`)
    })
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