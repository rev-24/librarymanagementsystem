
let books = JSON.parse(localStorage.getItem("books")) || [];

const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");

// Save books in browser storage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Display books
function displayBooks(search = "") {

    bookList.innerHTML = "";

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.id.toLowerCase().includes(search.toLowerCase())
    );

    document.getElementById("emptyMessage").style.display =
        filteredBooks.length === 0 ? "block" : "none";

    filteredBooks.forEach(book => {

        const row = document.createElement("tr");

        const values = [
            book.id,
            book.name,
            book.author
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const status = document.createElement("span");

        status.textContent = book.status;
        status.className = "status " +
            (book.status === "Available" ? "available" : "issued");

        statusCell.appendChild(status);
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");

        const toggleButton = document.createElement("button");
        toggleButton.textContent =
            book.status === "Available" ? "Issue" : "Return";

        toggleButton.className = "action-btn";
        toggleButton.style.background = "#dbeafe";
        toggleButton.style.color = "#1d4ed8";

        toggleButton.onclick = () => {
            book.status = book.status === "Available"
                ? "Issued" : "Available";

            saveBooks();
            displayBooks(searchInput.value);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "action-btn";
        deleteButton.style.marginLeft = "5px";

        deleteButton.onclick = () => {
            books = books.filter(b => b.id !== book.id);
            saveBooks();
            displayBooks(searchInput.value);
        };

        actionCell.appendChild(toggleButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        bookList.appendChild(row);
    });

    // Update dashboard
    document.getElementById("totalBooks").textContent = books.length;

    document.getElementById("availableBooks").textContent =
        books.filter(b => b.status === "Available").length;

    document.getElementById("issuedBooks").textContent =
        books.filter(b => b.status === "Issued").length;
}

// Add a new book
bookForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("bookId").value.trim();
    const name = document.getElementById("bookName").value.trim();
    const author = document.getElementById("authorName").value.trim();
    const status = document.getElementById("status").value;

    // Check duplicate Book ID
    if (books.some(book => book.id.toLowerCase() === id.toLowerCase())) {
        alert("Book ID already exists!");
        return;
    }

    const newBook = {
        id: id,
        name: name,
        author: author,
        status: status
    };

    books.push(newBook);

    saveBooks();

    bookForm.reset();

    displayBooks(searchInput.value);

    alert("Book added successfully!");
});

// Search books
searchInput.addEventListener("input", function() {
    displayBooks(this.value);
});

// Display saved books when page loads
displayBooks();
