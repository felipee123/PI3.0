document.addEventListener('DOMContentLoaded', function () {
    const donationForm = document.getElementById('donation-form');
    const donationTable = document.getElementById('donation-entries');

    // Função para criar uma nova linha na tabela
    function addDonationRow(name, quantity, type) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${type}</td>
            <td><button class="edit-btn">Editar</button></td>
            <td><button class="delete-btn">Apagar</button></td>
        `;
        donationTable.prepend(newRow);
    }

    function saveDonation(name, quantity, type) {
        const donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.push({ name, quantity, type });
        localStorage.setItem('donations', JSON.stringify(donations));
    }

    function loadDonations() {
        const donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.forEach(donation => {
            addDonationRow(donation.name, donation.quantity, donation.type);
        });
    }

    // Evento de envio do formulário de doação
    donationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const donatorName = document.getElementById('donator-name').value;
        const foodQuantity = document.getElementById('food-quantity').value;
        const foodType = document.getElementById('food-type').value;

        // Validação da quantidade de comida
        if (foodQuantity < 1 || foodQuantity > 15) {
            alert("A quantidade de comida deve ser entre 1 kg e 15 kg.");
            return;
        }

        addDonationRow(donatorName, foodQuantity, foodType);
        saveDonation(donatorName, foodQuantity, foodType);
    });

    // Evento de clique nos botões de editar e apagar
    donationTable.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            const row = event.target.parentNode.parentNode;
            const cells = row.querySelectorAll('td');
            const name = cells[0].innerText;
            const quantity = cells[1].innerText;
            const type = cells[2].innerText;

            // Preenche o formulário com os valores da linha selecionada
            document.getElementById('donator-name').value = name;
            document.getElementById('food-quantity').value = quantity;
            document.getElementById('food-type').value = type;

            // Remove a linha da tabela
            row.remove();
            updateLocalStorage();
        } else if (event.target.classList.contains('delete-btn')) {
            event.target.parentNode.parentNode.remove();
            updateLocalStorage();
        }
    });

    function updateLocalStorage() {
        const rows = donationTable.querySelectorAll('tr');
        const donations = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const name = cells[0].innerText;
            const quantity = cells[1].innerText;
            const type = cells[2].innerText;
            donations.push({ name, quantity, type });
        });
        localStorage.setItem('donations', JSON.stringify(donations));
    }

    loadDonations();
});
