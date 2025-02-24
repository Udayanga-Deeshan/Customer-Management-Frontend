
function loadCustomers() {
    fetch("http://localhost:8080/customer/get-all")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let tableRow = `<tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Salary</th>
                </tr>`;

            let tableCustomers = document.getElementById("tblCustomers");

            data.forEach(customer => {
                tableRow += `<tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>`

            });

            tableCustomers.innerHTML = tableRow;
        })
}


loadCustomers();

function addCustomer() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let salary = document.getElementById("salary").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/add", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            loadCustomers();
        })
        .catch((error) => console.error(error));

        clear();
}

function deleteCustomer() {
    let idValue = document.getElementById("deleteId").value;

    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/delete/" + idValue, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            loadCustomers();
            console.log(result)
        })
        .catch((error) => console.error(error));

        clear();

}


function clear() {
    let name = document.getElementById("name").value = "";
    let address = document.getElementById("address").value = "";
    let salary = document.getElementById("salary").value = "";
}
