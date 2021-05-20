 // ADD VARIABLES TO REQUIRE EXPRESS AND DATA.JSON
const express = require("express");
const app = express();
const path = require("path");
const data = require("./data.json");
const projects = data.projects;

app.set("view engine", "pug");                                  
 // Set view engine to pug
app.set("views", path.join(__dirname, "views"));                // Set views directory
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "/images/")));


// SET 'INDEX' ROUTE
app.get("/", (req, res) => {
    res.render("index", { projects });
});
  

// SETTING 'ABOUT' ROUTE
app.get("/about", (req, res) => {
    res.render("about");
});
  

// SET 'PROJECTS' ROUTE
app.get("/projects/:id", (req, res) => {
    const { id } = req.params;
    const project = projects[id];
    res.render("project", { project });
});

// SET ERROR MSG TO 404 IF ROUTE NOT FOUND
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;   
    next(err);
});
  


app.use((err, req, res, next) => {
    const status = err.status || 500; //the default error handler when 404 no presented
    res.status(status); 
    
    res.send(err.message);
    
})

// START SERVER, LISTENING ON PORT 3000
app.listen(3000, () => {
    console.log("Listening to localhost:3000");
  });
