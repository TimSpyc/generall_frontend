var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')

        db.run(`CREATE TABLE layouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name text UNIQUE, 
            json text
        )`,
        (err) => {
            if (err) {
                console.log("Table already exists")
            }
        });  
    }
});


module.exports = db