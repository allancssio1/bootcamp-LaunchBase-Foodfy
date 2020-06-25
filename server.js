const express = require("express")
const nunjucks = require("nunjucks")

//configuração do server
const server = express()
const receitas = require("./data")


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


server.get("/recipe/:index", function(request, response){
    const recipeIndex = request.params.index
    const indexId = receitas.find(function(element){
        return element.id == recipeIndex
    })
    const items = receitas[receitas.indexOf(indexId)]
    
    return response.render("recipe", {items})
})

server.listen(5000, function(){
console.log("Server is Running")
})
