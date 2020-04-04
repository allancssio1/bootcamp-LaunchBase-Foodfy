const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.use(express.static('public'))

server.set("view engine", "html")

nunjucks.configure("views", {
    express: server
})

server.get("/layout", function(req, res){
    return res.render("layout")
})
server.get("/about", function(req, res){
    return res.render("about")
})
server.get("/recipes", function(req, res){
    return res.render("recipes")
})
server.get("/index", function(req, res){
    return res.render("index")
})

server.listen(5000, function(){
    console.log("Server Running")
})
