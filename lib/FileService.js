const fs = require('fs/promises');

module.exports = {
    NewTodo: async (content) => {
        try {
            await fs.writeFile('./files/data.json', content);
        } catch (err) {
            console.log(err);
        }
    },
    AddTodo: async (content) => {
        try {
            await fs.appendFile('./files/data.json', content);
        } catch (err) {
            console.log(err);
        }
    },
    ReadTodo: async () => {
        try {
            await fs.readFile("./files/data.json");
        } catch (err) {
            console.log(err);
        }
    }
}