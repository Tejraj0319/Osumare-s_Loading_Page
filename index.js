const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = []; 
let idCounter = 1;


app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }
    const task = { id: idCounter++, title, description };
    tasks.push(task);
    res.status(201).json(task);
});


app.put('/tasks/:id', (req, res) => {
    const { title, description } = req.body;
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    if (title) task.title = title;
    if (description) task.description = description;
    res.status(200).json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.listen(port, () => console.log(`Task API running on http://localhost:${port}`));
