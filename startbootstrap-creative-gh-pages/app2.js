"use strict"
let express = require("express")
let ejs = require("ejs")
let bodyParser = require("body-parser")
let request = require("request");
let session = require("express-session");


let router = express.Router();
let app = express();
app.use(session({
    secret: "secret", 
    saveUninitialized:true, 
    resave:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.set("view engine", "ejs")
app.engine("ejs", require("ejs").__express)
let sess;
//routes
router.get("/index", (req, res) => {
    sess = req.session;
    res.render("index", {
        pagename:"index",
        sess: sess,
    })
})

router.get("/contact", (req, res) => {
    sess = req.session;
    res.render("contact", {
        pagename:"contact",
        sess: sess
    })
})

router.get("/register", (req, res) => {
    sess = req.session;
    res.render("register", {
        pagename:"register",
        sess: sess,
    })
})



router.get("/services", (req, res) => {
    sess=req.session;
    res.render("services", {
        pagename:"services",
        sess: sess,
    })
})

router.get("profile", (req, res) => {
    sess = req.session;
    if(typeof(sess) == "undefined" || sess.loggedin != true){
        let errors=["not authenticated user"];
        res.render("index", {
        pagename: "index",
        errs: errors
        })
    } else {
        res.render("profile", {
        pagename:"profile",
        sess: sess,})
    }
})

router.get("/logout", (req, res) => {
    sess=req.session;
    sess.destroy((err) => {
        res.redirect("/index")
    })
})

// create a condition test if the email == "mike@aol.com" and password == "!Hello1234"

router.post("/login", (req, res) => {
    console.log(req.body);
    let errors = [];
    //validate email is not blank
    // if(req.body.firstname == ""){
    //     errors.push("First Name cannot be blank");
    // }
    // //validates pw is not blank
    // if(req.body.lastname == ""){
    //     errors.push("Last Name cannot be blank");
    // }

    // if(req.body.address == ""){
    //     errors.push("Address cannot be blank");
    // }

    // if(req.body.city == ""){
    //     errors.push("City cannot be blank");
    // }

    // if(req.body.state == ""){
    //     errors.push("State cannot be blank");
    // }

    // if(req.body.zip == ""){
    //     errors.push("Zip cannot be blank");
    // }

    // if(req.body.gender == null){
    //     errors.push("Must pick gender");
    // }

    // if(!req.body.consent){
    //     errors.push("Must Consent");
    // }

    // if(req.body.bio == ""){
    //     errors.push("Must write at least a short bio");
    // }
    
    if(req.body.email == "mike@aol.com" && req.body.password == "abc123"){
        sess = req.session;
        sess.loggedin = true;
        res.render("profile", {
            pagename:"profile", 
            sess:sess})
    }
    else{
        errors.push("invalid user");
        res.render("index", {
            pagename: "index",
            errs:errors
        })
    }
})

//declare static file locations
app.use(express.static("views"))
app.use(express.static("public"))
app.use("/", router);

//start server
let server = app.listen("8080", () => {
    console.log("Server running on port 8080");
})