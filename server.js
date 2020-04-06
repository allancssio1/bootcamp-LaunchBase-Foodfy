const express = require("express")
const nunjucks = require("nunjucks")

//configuração do server
const server = express()

//pastas de arquivos
server.use(express.static('public'))
server.use(express.static('assets'))

//configuração do Nunjucks
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

//rotas da página
server.get("/index", function(request, response){
    return response.render("index")
})
server.get("/about", function(request, response){
    return response.render("about")
})
server.get("/recipes", function(request, response){
    return response.render("recipes")
})
server.get("/layout", function(request, response){
    return response.render("layout")
})


server.listen(5000, function(){
    console.log("Server is Running")
})
