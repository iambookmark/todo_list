const express = require('express')
const app = express()
const port = 3000

const fileService = require('./lib/FileService');

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
  fileService.NewTodo("Hello world").then(() => res.send('Hello World!'));
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