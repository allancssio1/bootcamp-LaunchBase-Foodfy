const data = require('../data')

exports.index = function (req, res) {
  return res.render('admin/recipes/index', { items: data })
}

exports.create = function (req, res) {
  return res.render('admin/recipes/create')
}

exports.show = function (req, res) {
  return res.send('falta editar')
}

exports.edit = function (req, res) {
  return res.send('falta editar')
}

exports.post = function (req, res) {
  return res.send('falta editar')
}

exports.put = function (req, res) {
  return res.send('falta editar')
}

exports.delete = function (req, res) {
  return res.send('falta editar')
}