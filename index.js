const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'courses3'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses); 
});

app.get('/api/courses/:courseID', (req, res) => {
    const course = courses.find(course => course.id === Number(req.params.id));
    if(!course) return res.status(404).send("The course with the given id was not found");
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:courseID', (req, res) => {
    const course = courses.find(course => course.id === Number(req.params.id));
    if(!course) return res.status(404).send("The course with the given id was not found");
    course.name = req.body.name;
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.delete('/api/courses/:courseID', (req, res) => {
    const course = courses.find(course => course.id === Number(req.params.id));
    if(!course) return res.status(404).send("The course with the given id was not found");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));