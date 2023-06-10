const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


const Todo = require("./models/Todo");
const jsonParser = bodyParser.json();

mongoose.connect("mongodb://127.0.0.1:27017/project", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(function () {
    const app = express();

    app.get("/todos", async function (req, res) {
        const todos = await Todo.find();
        res.send({ data: todos });
    });

    app.post("/todos", jsonParser, async function (req, res) {
        const todo = new Todo(req.body);
        console.log(req.body);
        await todo.save();
        res.send({ data: todo })

    });

    app.get("/todos/:id", async function (req, res) {
        const todo = await Todo.findById(req.params.id);
        res.send({ data: todo });
    });

    app.patch("/todos/:id", async function (req, res) {
        try {
            const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send({ data: todo });
        } catch (error) {
            res.status(404).send({ "todo cant find": error });
        }
    });

    app.delete("/todos/:id", async function (req, res) {
        try {
            const todo = await Todo.findByIdAndRemove(req.params.id);
            res.send({ data: true });
        } catch (error) {
            res.status(404).send({ error: "todo is not found!" });
        }
    });

    app.listen(2000, function () {
        console.log("Server hostname 2000");
    });

}).catch(function (error) {
    console.log("database connection error", error);
});