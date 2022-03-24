"use strict"
let express = require("express")
let ejs = require("ejs")
let bodyParser = require("body-parser")
let request = require("request");


//const { response } = require("express");

let router = express.Router();
let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.set("view engine", "ejs")
app.engine("ejs", require("ejs").__express)

//routes
router.get("/index", (req, res) => {
    res.render("index", {
        pagename:"index"
    })
})

router.get("/contact", (req, res) => {
    res.render("contact", {
        pagename:"contact"
    })
})

router.get("/register", (req, res) => {
    res.render("register", {
        pagename:"register"
    })
})



router.get("/services", (req, res) => {
    res.render("services", {
        pagename:"services"
    })
})

router.post("/login", (req, res) => {
    console.log(req.body);
    let errors = [];
    //validate email is not blank
    if(req.body.firstname == ""){
        errors.push("First Name cannot be blank");
    }
    //validates pw is not blank
    if(req.body.lastname == ""){
        errors.push("Last Name cannot be blank");
    }

    if(req.body.address == ""){
        errors.push("Address cannot be blank");
    }

    if(req.body.city == ""){
        errors.push("City cannot be blank");
    }

    if(req.body.state == ""){
        errors.push("State cannot be blank");
    }

    if(req.body.zip == ""){
        errors.push("Zip cannot be blank");
    }

    if(req.body.gender == null){
        errors.push("Must pick gender");
    }

    if(!req.body.consent){
        errors.push("Must Consent");
    }

    if(req.body.bio == ""){
        errors.push("Must write at least a short bio");
    }

    console.log(errors);
    res.render("register",{
        pagename: "register",
        errs: errors,
    })
})

//declare static file locations
app.use(express.static("views"))
app.use(express.static("public"))
app.use("/", router);

//start server
let server = app.listen("8080", () => {
    console.log("Server running on port 8080");
})