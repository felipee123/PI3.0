document.addEventListener('DOMContentLoaded', function () {
    const donationForm = document.getElementById('donation-form');
    const donationTable = document.getElementById('donation-entries');

    // Função para criar uma nova linha na tabela
    function addDonationRow(name, quantity, type,Editar,Apagar  ) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${type}</td>
            <td><button class="edit-btn">${Editar}</td>
            <td><button class="delete-btn">${Apagar}</td>
            
        `;

        donationTable.prepend(newRow);

        // Limpa o formulário após o envio da doação
        donationForm.reset();
    }

    // Evento de envio do formulário de doação
    donationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const donatorName = document.getElementById('donator-name').value;
        const foodQuantity = document.getElementById('food-quantity').value;
        const foodType = document.getElementById('food-type').value;

        addDonationRow(donatorName, foodQuantity, foodType);
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
        } else if (event.target.classList.contains('delete-btn')) {
            event.target.parentNode.parentNode.remove();
        }
        
    });
});
