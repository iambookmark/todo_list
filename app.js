const moment = require("moment/moment")
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())
const port = 3000

const TodoService = require("./lib/TodoService")

// get list of todo
app.get('/api/todo', (req, res, next) => {
  TodoService.GetTodoList().then((val) => res.send(val)).catch((e) => res.status(500).send(e))
})

// get todo
app.get('/api/todo/:todo', (req, res, next) => {
  let todo = req.params.todo

  TodoService.GetTodo(todo).then((val) => res.send(val)).catch((e) => res.status(500).send(e))
})

// get todo detail
app.get('/api/todo/:todo/id/:id', (req, res, next) => {
  let todo = req.params.todo
  let id = req.params.id

  TodoService.GetTodoDetail(todo, id).then((val) => res.send(val)).catch((e) => res.status(500).send(e))
})

// post new todo
app.post('/api/todo', (req, res, next) => {

  let body = req.body
  let subject = body.subject
  let detail = body.detail
  let date = body.date

  if(!subject) {
    res.status(400).send("Please provide todo subject")
  }

  if(!detail) {
    res.status(400).send("Please provide todo delete")
  }

  const todo = {
    id: Math.floor(new Date().getTime() / 1000),
    subject: subject,
    detail: detail,
    todoDate: date != null ? moment(date) : new Date(),
    isDone: false
  }

  TodoService.CreateTodo(todo).then(() => res.send(todo)).catch((e) => res.status(500).send(e))
})

app.put('/api/todo/:todo/id/:id/done', (req, res, next) => {
  let todo = req.params.todo
  let id = req.params.id

  TodoService.UpdateIsDone(todo, id).then((val) => TodoService.GetTodoDetail(todo, id)).then((val) => res.send(val)).catch((e) => res.status(500).send(e))
})

// delete todo
app.delete('/api/todo/:todo/id/:id', (req, res, next) => {
  let todo = req.params.todo
  let id = req.params.id

  TodoService.DeleteTodo(todo, id).then((val) => res.send(val)).catch((e) => res.status(500).send(e))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
