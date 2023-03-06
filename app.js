// Sample data
let data = [
    {id: 1, name: "ranjith k", email: "ranjith@example.com", phone: "555-555-5555"},
    {id: 2, name: "vasanth", email: "vasanth@example.com", phone: "555-123-4567"},
    {id: 3, name: "abishek", email: "abhishek@example.com", phone: "555-987-6543"}
];

// Function to render table data
function renderData() {
    let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    data.forEach((record) => {
        let tr = document.createElement('tr');

        let nameTd = document.createElement('td');
        nameTd.innerText = record.name;
        tr.appendChild(nameTd);

        let emailTd = document.createElement('td');
        emailTd.innerText = record.email;
        tr.appendChild(emailTd);

        let phoneTd = document.createElement('td');
        phoneTd.innerText = record.phone;
        tr.appendChild(phoneTd);

        let actionTd = document.createElement('td');
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteRecord(record.id);
        });
        actionTd.appendChild(deleteBtn);

        let editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => {
            openEditModal(record);
        });
        actionTd.appendChild(editBtn);

        tr.appendChild(actionTd);

        tableBody.appendChild(tr);
    });
}


renderData();

// Function to add a new record
function addRecord(name, email, phone) {
    let newRecord = {
        id: data.length + 1,
        name: name,
        email: email,
        phone: phone
    };

    data.push(newRecord);

    renderData();
}

// Function to delete a record
function deleteRecord(id) {
    let index = data.findIndex((record) => record.id == id);

    if (index > -1) {
        data.splice(index, 1);
    }

    renderData();
}

// Function to open edit modal and prepopulate form
function openEditModal(record) {
    let modal = document.getElementById('edit-modal');
    let nameInput = document.getElementById('edit-name');
    let emailInput = document.getElementById('edit-email');
    let phoneInput = document.getElementById('edit-phone');
    let idInput = document.getElementById('edit-id');

    nameInput.value = record.name;
    emailInput.value = record.email;
    phoneInput.value = record.phone;
    idInput.value = record.id;

    modal.style.display = 'block';

    let closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
}


// Function to update a record
function updateRecord(name, email, phone) {
    let index = data.findIndex((record) => record.id == id);

    if (index > -1) {
        data[index].name = name;
        data[index].email = email;
        data[index].phone = phone;
    }

    renderData();

    let modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
}

// Add event listener for form submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
let phone = document.getElementById('phone').value;


// Add new record
addRecord(name, email, phone);

// Clear form inputs
document.getElementById('name').value = '';
document.getElementById('email').value = '';
document.getElementById('phone').value = '';

});

// Add event listener for edit form submission
document.getElementById('edit-btn').addEventListener('submit', (e) => {
e.preventDefault();
// Get form values
let name = document.getElementById('edit-name').value;
let email = document.getElementById('edit-email').value;
let phone = document.getElementById('edit-phone').value;
// Update record
updateRecord(name, email, phone);
});

// Add event listener for search box
document.querySelector('#search-box').addEventListener('keyup', (e) => {
let searchTerm = e.target.value.toLowerCase();

let filteredData = data.filter((record) => {
    return record.name.toLowerCase().includes(searchTerm) ||
           record.email.toLowerCase().includes(searchTerm) ||
           record.phone.toLowerCase().includes(searchTerm);
});

renderData(filteredData);
});

// Render initial table data
renderData();