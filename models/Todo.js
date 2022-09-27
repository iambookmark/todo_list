class Todo {
    constructor(id, subject, detail, datetime, isDone) {
        this.id = id;
        this.subject = subject;
        this.detail = detail;
        this.datetime = datetime;
        this.isDone = isDone;
    }
}

module.exports = {
    Todo: Todo
}