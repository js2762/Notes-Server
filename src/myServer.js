const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require("./models/Note");
const bodyParser = require('body-parser');
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const mongoDbPath = process.env.MONGO_DB_PATH;
mongoose.connect(mongoDbPath).then(function()
{
    // App Routes
    app.get("/", function(req,res){
        res.send("this is the homepage........");
    });

    app.get("/notes/list", async function(req,res) {
        var notes = await Note.find();
        res.json(notes);
    });

    app.post("/notes/add", async function(req,res) {
        // res.json(req.body);

        const existingNote = await Note.findOne({ id: req.body.id });
        if (existingNote) {
            existingNote.title = req.body.title;
            existingNote.description = req.body.description;
            existingNote.scheduleDate = req.body.scheduleDate;
            existingNote.priorityValue = req.body.priorityValue;
            await existingNote.save();
        } else {
            const newNote = Note({
                id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                scheduleDate: req.body.scheduleDate,
                priorityValue: req.body.priorityValue,
            });
            await newNote.save();
        }

        const response = { message: "New Note Created! " + `title: ${req.body.title}` }
        res.json(response);
    });

    app.post("/notes/delete", async function(req,res){
        await Note.deleteOne({id: req.body.id});
        const response = { message: "Note Deleted Succesfully! " + `title: ${req.body.id}` }
        res.json(response);
    });

});



// starting the server on given port number

const PORT = process.env.PORT || 5000
app.listen(PORT, function(){
    console.log("server started at port number: " + PORT);
});