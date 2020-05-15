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
    autoescape: false
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
server.get('/recipe/:id', function(request, response){
    const id = req.params.id
    
    return response.render(`${id}`, {data})
})

server.listen(5000, function(){
    console.log("Server is Running")
})
