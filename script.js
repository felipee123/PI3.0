document.addEventListener('DOMContentLoaded', function () {
    const donationForm = document.getElementById('donation-form');
    const donationTable = document.getElementById('donation-entries');

    donationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const donatorName = document.getElementById('donator-name').value;
        const foodQuantity = document.getElementById('food-quantity').value;
        const foodType = document.getElementById('food-type').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${donatorName}</td>
            <td>${foodQuantity}</td>
            <td>${foodType}</td>
        `;

        donationTable.prepend(newRow);

        // Limpa o formulário após o envio da doação
        donationForm.reset();
    });
});
