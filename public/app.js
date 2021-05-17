// express
const express = require("express");
// data
// const data = require("./data.json");
// calling express
const app = express();
const path = require("path");
const projects = data.projects;
// projects route
// const projects = data.project;
// view engine

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Set static route public
app.use('/static', express.static('public'));


// render index
app.get("/", (req, res) => {
    res.render("index", { data });
});
// render about
app.get("/about", (req, res) => {
    res.render("about");
});
// Dynamic "project" routes 
app.get("/projects/:id", (req, res) => {
    const { id } = req.params;
    const project = projects[id -1];
    res.render("project", { project });
});



   // SET ERROR MSG TO 404 IF ROUTE NOT FOUND
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    console.log("Page Not Found!")
    next(err);
});
  

// RENDER ERROR PAGE WITH ERROR PASSED IN
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(`You have an error ${err.status} error.`);
    res.render("error");
});


//start server
app.listen(3000, ()=>{
  console.log('Server is running on Port 3000....');
});