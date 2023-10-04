document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("editableTable");
    const addRowBtn = document.getElementById("addRowBtn");
    let rowCount = 0;

    // Function to add a new row to the table
    function addRow() {
        rowCount++;
        const newRow = tbody.insertRow(); // -1 inserts at the end
        

        const cell1 = newRow.insertCell(0); // Header 1
        cell1.innerHTML = '<img src="./images/Rectangle21.png" alt="whitebutton">'; // No content in Header 1
        cell1.className = "whiteButton";

        const cell2 = newRow.insertCell(1); // Header 2 (contains image)
        cell2.textContent = rowCount; // Replace your_image_url_here with the image URL

        const cell3 = newRow.insertCell(2); // Header 3
        cell3.innerHTML = 'John Doe'; // Content for Header 3

        const cell4 = newRow.insertCell(3); // Header 4
        cell4.innerHTML = 'johndoe@gmail.com'; // Content for Header 4

        const cell5 = newRow.insertCell(4); // Header 5
        cell5.innerHTML = '(000)-000-000'; // Content for Header 5

        const cell6 = newRow.insertCell(5); // Header 6
        cell6.innerHTML = '<img src="./images/pen.png" alt="editbutton">'; // Content for Header 6
        cell6.className = "image-cell";

        const cell7 = newRow.insertCell(6); // Header 7
        cell7.innerHTML = '<img src= "./images/bxs-trash-alt.png" alt= "WhiteCan" class="removeRowBtn">';
        cell7.className = "image-cell";
    }

    // Function to remove a row when the "Remove" button is clicked
    function removeRow(row) {
        row.remove();
    }

    // Event listener for the "Add Row" button
    addRowBtn.addEventListener("click", addRow);

    // Event delegation for handling row removal when the "Remove" button is clicked
    table.addEventListener("click", function (event) {
        if (event.target.classList.contains("removeRowBtn")) {
            const row = event.target.closest("tr");
            if (row) {
                removeRow(row);
            }
        }
    });

    table.addEventListener("click", function (event) {
        if (event.target.classList.contains("whiteButton")) {
            const row = event.target.closest("tr");
            if (row) {
                removeRow(row);
            }
        }
    });
    
});
