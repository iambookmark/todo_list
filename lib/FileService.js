const fs = require('fs/promises');

module.exports = {
    NewTodo: async (content) => {
        try {
            await fs.writeFile('./files/data.txt', content);
        } catch (err) {
            console.log(err);
        }
    }
}
