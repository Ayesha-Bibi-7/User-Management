var form = document.getElementById("myForm"),
    userName = document.getElementById("showName"),
    email = document.getElementById("showEmail"),
    role = document.getElementById("showRole"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modalTitle = document.querySelector("#userForm .modal-title");
    newUserBtn = document.querySelector(".newUser")
    
let getData = localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile"))
    : [];

let isEdit = false, editId;
showInfo();

function showInfo() {
    userInfo.innerHTML = "";

    getData.forEach((element, index) => {
        let createElement = `
        <tr class="employeeDetails">
            <td>${element.employeeName}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeeRole}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.employeeName}','${element.employeeEmail}','${element.employeeRole}')" data-bs-toggle="modal" data-bs-target="#readData">
                    <i class="bi bi-eye"></i>
                </button>

                <button class="btn btn-primary" onclick="editInfo(${index})" data-bs-toggle="modal" data-bs-target="#userForm">
                    <i class="bi bi-pencil-square"></i>
                </button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
        `;
        userInfo.innerHTML += createElement;
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (userName.value === "" || email.value === "" || role.value === "") {
        alert("All fields are required!");
        return;
    }

    const information = {
        employeeName: userName.value,
        employeeEmail: email.value,
        employeeRole: role.value,
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        getData[editId] = information;
        isEdit = false;
    }

    localStorage.setItem("userProfile", JSON.stringify(getData));

    form.reset();
    modalTitle.innerText = "Fill the Form";
    submitBtn.innerText = "Submit";

    showInfo();
});

function editInfo(index) {
    isEdit = true;
    editId = index;
    userName.value = getData[index].employeeName;
    email.value = getData[index].employeeEmail;
    role.value = getData[index].employeeRole;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update the Form";
}

function readInfo(name, email, role) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("role").value = role;
}

function deleteInfo(index) {
    if (confirm("Are you sure you want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}