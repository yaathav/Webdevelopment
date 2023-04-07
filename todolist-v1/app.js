const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food "];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    var today = new Date();
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
 
    var day = today.toLocaleDateString("en-US", option);
    res.render("list", {listtitle: day, newListitems: items});
});

app.post("/", function(req, res){

    var item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {listtitle: "Work List", newListitems: workItems})
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");

});


app.listen(3000, function(){
    console.log("Server started on port 3000")
});