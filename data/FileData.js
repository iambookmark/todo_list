const fs = require('fs/promises')

const newTodo = async (filename, content) => {
    try {
        await fs.writeFile("./files/" + filename + ".txt", content)
    } catch (err) {
        console.log(err)
    }
}

const addTodo = async (filename, content) => {
    try {
        await fs.appendFile("./files/" + filename + ".txt", content)
    } catch (err) {
        console.log(err)
    }
}

const readTodo = async (filename) => {
    try {
        return await fs.readFile("./files/" + filename + ".txt", { encoding: 'utf8' })
    } catch (err) {
        console.log(err)
    }
}

const getFiles = async () => {
    try {
        return await fs.readdir("./files")
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    NewTodo: newTodo,
    AddTodo: addTodo,
    ReadTodo: readTodo,
    GetFiles: getFiles
}