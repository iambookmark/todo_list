const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const port = 3000

const fileService = require('./lib/FileService');
const Todo = require('./models/Todo');

// get list of todo
app.get('/api', (req, res, next) => {
  res.send('Hello World!')
})

// get todo detail
app.get('/api/id/:id', (req, res, next) => {
  res.send('Hello World!')
})

// post new todo
app.post('/api', (req, res, next) => {
  const todo = new Todo(uuidv4(), "suject", "detail", Date(), false);
  fileService.NewTodo(todo).then(() => res.send('Hello World!'))
})

// update todo
app.put('/api/id', (req, res, next) => {

})

// delete todo
app.delete('/api/id/:id', (req, res, next) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})