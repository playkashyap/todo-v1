  

    const express = require("express");
    const bodyparser = require("body-parser");

    const app = express();
    let items = [];
    let workItems = [];

    app.use(bodyparser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set('view engine', 'ejs');

    app.get("/" , function(req, res){
        //res.send("hello");

        let today = new Date();
        let options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };
        let day = today.toLocaleDateString("en-US",options);
        

        res.render('list', {listTitle: day, newListItems: items});
    });

    app.post("/",function(req, res){

        let item = req.body.newItem; 

        if(req.body.list === "work"){
            workItems.push(item);
            res.redirect("/work")
        }else{
            items.push(item); 
            res.redirect("/");
        }
        
    });

    app.get("/work", function(req, res){
        res.render("list",{listTitle: "Work List", newListItems: workItems});
    });

    app.post("/work",function(req, res){
        let item = req.body.newItem;
    });

    app.listen(3000 , function(){
        console.log("server started on 3000!!!!!!!!!!!!!!");
    })

