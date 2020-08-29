var selectedRow = null; // declaring selectedRow defined in OnEdit Function as global variable

// On Click Button functions
function addRecord() {
  var readData = readTableData();

  var orderIDMsg = document.getElementById("orderID").value;
  var shipMsg = document.getElementById("shipName").value;
  var freightMsg = document.getElementById("freight").value;

  if (orderIDMsg == "") {
    alert("Order ID cannot be Empty");
    return;
  }
  if (shipMsg == "") {
    alert("Ship Name cannot be Empty");
    return;
  }
  if (freightMsg == "") {
    alert("Freight cannot be Empty");
    return false;
  }

  if (selectedRow == null)
    // declaring IF ELSE for Edit Operation
    insertNewRecord(readData);
  else updateRecord(readData);
  resetForm();
}

// Reading the Entered data
function readTableData() {
  var readData = {};
  readData["orderID"] = document.getElementById("orderID").value;
  readData["shipName"] = document.getElementById("shipName").value;
  readData["freight"] = document.getElementById("freight").value;
  readData["orderDate"] = document.getElementById("orderDate").value;
  return readData;
}

// Adding New Records
function insertNewRecord(data) {
  var table = document.getElementById("tableData");
  var newRow = table.insertRow(table.length);

  newRow.className = "item";

  cell0 = newRow.insertCell(0);
  cell0.innerHTML = data.orderID;

  cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.shipName;

  cell2 = newRow.insertCell(2);
  cell2.innerHTML = data.freight;

  cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.orderDate;

  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<input type="button" value="EDIT" onClick = "onEdit(this)" id = "editBtn"> &nbsp &nbsp &nbsp <input type="button" value="DELETE" onClick = "onDelete(this)" id = "deleteBtn">`;


  // table.insertRow(table.length) = innerText(`The Total Number of Orders : ${#tableData > tbody > tr.length}`);

}

// Resetting values
function resetForm() {
  document.getElementById("orderID").value = "";
  document.getElementById("shipName").value = "";
  document.getElementById("freight").value = "";
  document.getElementById("orderDate").valueAsDate = new Date();
  selectedRow = null;
}

// Creating function for Edit Button
function onEdit(td) {
  selectedRow = td.parentElement.parentElement; //will return corresponding Row
  document.getElementById("orderID").value = selectedRow.cells[0].innerHTML; // getting exact Cells
  document.getElementById("shipName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("freight").value = selectedRow.cells[2].innerHTML;
  document.getElementById("orderDate").value = selectedRow.cells[3].innerHTML;
}

// Updating function
function updateRecord(readData) {
  selectedRow.cells[0].innerHTML = readData.orderID;
  selectedRow.cells[1].innerHTML = readData.shipName;
  selectedRow.cells[2].innerHTML = readData.freight;
  selectedRow.cells[3].innerHTML = readData.orderDate;
}

// Creating function for Delete Button
function onDelete(td) {
  row = td.parentElement.parentElement;
  document.getElementById("tableData").deleteRow(row.rowIndex);
  resetForm();
}

//Filter Function
function filter(tableName, filterFieldName, position) {
  var input, filter, table, rows, td, i, txtValue;
  input = document.getElementById(filterFieldName);
  filter = input.value.toUpperCase();
  table = document.getElementById(tableName); // accepted table
  rows = table.getElementsByTagName("tr"); //return array of rows
  for (i = 3; i < rows.length; i++) {
    td = rows[i].getElementsByTagName("td")[position];
    if (td) {
      txtValue = td.textContent || td.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

// Displaying Default Today's Date
document.querySelector("#orderDate").valueAsDate = new Date();
