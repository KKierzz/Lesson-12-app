// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here
let tasks = [];
let nextId = 1;

// TASK: Define appropriate routes below
// ---------------------------------------------------

// Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to show Add Task page
app.get('/add', (req, res) => {
    res.render('addTask');
});

// Route to handle Add Task form submission
app.post('/add', (req, res) => {
    const { title, taskModule, deadline, priority } = req.body;

    const newTask = {
        id: nextId++,
        title,
        taskModule,
        deadline,
        priority
    };

    tasks.push(newTask);

    res.render('confirmation', {
        message: 'Task added successfully!'
    });
});

// Route to view all tasks
app.get('/tasks', (req, res) => {
    res.render('tasks', { tasks });
});

// Route to show Edit Task page
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.send('Task not found');
    }

    res.render('editTask', { task });
});

// Route to handle Edit Task form submission
app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.send('Task not found');
    }

    const { title, taskModule, deadline, priority } = req.body;

    task.title = title;
    task.taskModule = taskModule;
    task.deadline = deadline;
    task.priority = priority;

    res.render('confirmation', {
        message: 'Task updated successfully!'
    });
});

// Route to delete a task
app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.render('confirmation', {
        message: 'Task deleted successfully!'
    });
});

// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});