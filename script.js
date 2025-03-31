function runMyLibrary() {
    const myLibrary = [];
    
    function Book(title, author, year, status, description, id) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.description = description;
        this.id = id;
    }

    Book.prototype.changeStatus = function() {
        this.status = this.status === "Not Read" ? "Read" : "Not Read";
    }

    function addBookToLibrary(title, author, year, status, description, id) {
        const book = new Book(title, author, year, status, description, id);
        myLibrary.push(book);
    }

    const addBookButton = document.querySelector(".add-book-button");
    const formDialog = document.querySelector(".dialog");
    const submitButton = document.querySelector('[type="submit"]');
    const cancelButton = document.querySelector('[type="button"]');
    const form = document.querySelector("form");
    const errorBox = document.querySelector(".error-box");
    const main = document.querySelector(".main");

    addBookButton.addEventListener("click", function () {
        formDialog.showModal();
    })

    function checkValidation(title, author, year, description) {
        let errors = [];
        
        if (title==="" || author==="" || year==="") {
            errors.push("Title, Author, Year shouldn't be empty");
        }

        if (description.length > 54) {
            errors.push("Description should be less than 54 characters");
        }

        return errors;
    }

    function displayBook(book) {
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("book-card", 'data-index-number');
                cardDiv.setAttribute('data-index-number', `${book.id}`);

                const titleDiv = document.createElement("div");
                const authorDiv = document.createElement("div");
                const yearDiv = document.createElement("div");
                const statusDiv = document.createElement("div");
                const descriptionDiv = document.createElement("div");
                const cardElements = [titleDiv, authorDiv, yearDiv, statusDiv, descriptionDiv];
                let cardClassList = ["title", "author", "year", "status", "description"];
                let cardElementHeadings = ["Title", "Author", "Year", "Status", "Description"];
                let cardElementValues = [book.title, book.author, book.year, book.status, book.description];

                for (let i=0; i<=4; i++) {
                    const p1 = document.createElement('p');
                    p1.classList.add(`${cardClassList[i]+'-heading-para'}`);
                    const p2 = document.createElement('p');
                    p2.classList.add(`${cardClassList[i]+'-info-para'}`);
                    cardElements[i].classList.add('book-card-elements', cardClassList[i]);
                    
                    p1.textContent = cardElementHeadings[i];
                    p2.textContent = cardElementValues[i];
                    
                    cardElements[i].append(p1, p2);
                    if (i===3) {
                        const changeStatusButton = document.createElement('button');
                        changeStatusButton.textContent = 'Change Status';
                        changeStatusButton.classList.add('change-status-button');
                        cardElements[i].appendChild(changeStatusButton);
                    }
                }

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('book-delete-button');
                deleteButton.textContent = 'Delete Book';

                cardDiv.append(titleDiv, authorDiv, yearDiv, statusDiv, descriptionDiv, deleteButton);
                main.appendChild(cardDiv);
    }

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        
        const formData = new FormData(form);

        const title = formData.get("title").trim();
        const author = formData.get("author").trim();
        const year = formData.get("year").trim();
        const status = formData.get("status").trim();
        const description = formData.get("description").trim();
        const id = crypto.randomUUID();

        let errors = checkValidation(title, author, year, description, id);

        if (errors.length > 0) {
            errorBox.innerHTML = errors.join("<br>");
            errorBox.hidden = false;
        }
        else {
            addBookToLibrary(title, author, year, status, description, id);

            formDialog.close();
            errorBox.hidden = true;
            form.reset();

            displayBook(myLibrary[myLibrary.length-1]);
        }
        
    });

    main.addEventListener('click', (event) => {
        if (event.target.classList.contains('change-status-button')) {
            const card = event.target.closest('.book-card');
            const status = card.querySelector('.status-info-para');
            const bookID = card.getAttribute('data-index-number');
            let currentBook = myLibrary.find(book => book.id === bookID);
            if (currentBook) {
                currentBook.changeStatus();
                status.textContent = currentBook.status;
            }
        } 
        else if (event.target.classList.contains('book-delete-button')) {

        }
    });

    cancelButton.addEventListener("click", () => {
        formDialog.close();
    });

}

runMyLibrary();