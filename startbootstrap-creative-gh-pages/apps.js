'use strict';
let fs = require("fs")
let http = require("http")
let path = require('path')
let url = require("url")

http.createServer(function(request, response){

    let parsed = url.parse(request.url)
    let fileName = path.parse(parsed.pathname)
    let file = fileName.name == '' ? 'index' : fileName.name
    let ext = fileName.ext == '' ? '.html' : fileName.ext
    let dir = fileName.dir == '/' ? '' : fileName.dir
    //let page = fileName.name == '' ? 'home.html': fileName.page

    let f = (dir + file + ext).replace("/", "") //removing the ? and replavcing it with blank

    //file types array
    const mimeTypes = {
        '.html':'text/html',
        '.js': 'text/javascript',
        '.css':'text/css',
        '.png':'image/png',
        '.jpg': 'image/jpg',
        '.gif':'image/gif'
    }
    
    if(f){
        fs.readFile(f, function(err, data){
            if(file){
                if(mimeTypes.hasOwnProperty(ext)){
                    response.writeHead(200, {
                        ContentType: mimeTypes[ext],
                    });
                    if(ext == '.html'){
                        response.write("<script>var page = '" + file + "';</script>")
                    }
                    
                    response.end(data, 'utf-8')
                }else{
                    if(err){
                        console.log('error', err.message)
                    }
                }
            }
        })
    }
}).listen("8080", () => {
    console.log("info", "Server is on port " + 8080)
})