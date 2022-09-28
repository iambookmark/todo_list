const moment = require("moment/moment")
const FileData = require("../data/FileData")

const createTodo = async (todo) => {
    let filename = moment().format('YYYYMMDD')
    let files = await FileData.GetFiles()
    if (files.some(x => x.substring(0, 8) == filename)) {
        console.log("append exist file")
        await FileData.AddTodo(filename, JSON.stringify(todo) + "\r\n")
    }
    else {
        console.log("create new file")
        await FileData.NewTodo(filename, JSON.stringify(todo) + "\r\n")
    }
}

const getTodoList = async () => {
    let files = await FileData.GetFiles()
    return files.filter(x => x != ".gitkeep").map(x => {
        return {
            id: x.substring(0, 8),
            file: x
        }
    })
}

const getTodo = async (todo) => {
    const data = await FileData.ReadTodo(todo)
    const extract = data.split(/\r?\n/).filter(x => x)
    return extract.map(x => JSON.parse(x))
}

const getTodoDetail = async (todo, id) => {
    const todoList = await getTodo(todo)
    const dataFilter = todoList.filter(x => x.id == id)
    return dataFilter.length > 0 ? dataFilter[0] : {}
}

const updateIsDone = async (todo, id) => {
    var todoList = await getTodo(todo)
    var todoIndex = todoList.findIndex(x => x.id == id)
    todoList[todoIndex].isDone = true

    var todoData = todoList.map(x => JSON.stringify(x)).join("\r\n")
    await FileData.NewTodo(todo, todoData)
}

const deleteTodo = async (todo, id) => {
    var todoList = await getTodo(todo)
    var todoIndex = todoList.findIndex(x => x.id == id)
    delete todoList[todoIndex]

    var todoData = todoList.map(x => JSON.stringify(x)).join("\r\n")
    await FileData.NewTodo(todo, todoData)
}

module.exports = {
    CreateTodo: createTodo,
    GetTodoList: getTodoList,
    GetTodo: getTodo,
    GetTodoDetail: getTodoDetail,
    UpdateIsDone: updateIsDone,
    DeleteTodo: deleteTodo
}