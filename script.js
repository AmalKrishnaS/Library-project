function runMyLibrary() {
    const myLibrary = [];
    
    function Book(title, author, year, status, description) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.description = description;
    }

    Book.prototype.changeStatus = function() {
        this.status = this.status === "Not Read" ? "Read" : "Not Read";
    }
}