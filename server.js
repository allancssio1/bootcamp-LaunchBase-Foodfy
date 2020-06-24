const express = require("express")
const nunjucks = require("nunjucks")

//configuração do server
const server = express()
const receitas = require("./data")
const { fullRecipes } = require("./data")
const data = require("./data")

//pastas de arquivos
server.use(express.static('public'))
server.use(express.static('assets'))

//configuração do Nunjucks
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCach: true
})

//rotas da página
server.get("/index", function(request, response){
    return response.render("index", { items: receitas })
})
server.get("/about", function(request, response){
    return response.render("about")
})
server.get("/recipes", function(request, response){
    return response.render("recipes", { items: receitas })
})


server.get("/recipe/:id", function(request, response){
    const recipe = request.params.id
    const id = receitas.fullRecipes[recipe]
    
    
    return response.render("recipe", {items: id})
})

server.listen(5000, function(){
    console.log("Server is Running")
})
