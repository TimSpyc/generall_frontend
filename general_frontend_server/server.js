// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/layouts/:id", (req, res, next) => {
    var sql = "select * from layouts where name = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": row
        })
      });
});

app.post("/api/layouts/", (req, res, next) => {
    var errors=[]

    console.log(req)
    return

    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.json){
        errors.push("No json specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    
    var data = {
        name: req.body.name,
        json: req.body.json,
    }

    var sql ='INSERT INTO layouts (name, json) VALUES (?,?)'
    var params =[data.name, data.json]

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})
// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
