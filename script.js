let inventory = [];

const addItemButton = document.getElementById('addItem');
const inventoryTable = document.getElementById('inventoryTable').querySelector('tbody');
const totalValueDisplay = document.getElementById('totalValue');
const sortAscButton = document.getElementById('sortAsc');
const sortDescButton = document.getElementById('sortDesc');
const searchBar = document.getElementById('searchBar');

function renderInventory() {
  inventoryTable.innerHTML = ''; 
  let totalValue = 0;

  inventory.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.category}</td>
      <td>
        <button onclick="deleteItem(${index})">Delete</button>
        <button onclick="updateItem(${index})">Update</button>
      </td>
    `;
    totalValue += item.quantity * item.price;
    inventoryTable.appendChild(row);
  });

  totalValueDisplay.textContent = `Total Inventory Value: $${totalValue.toFixed(2)}`;
}


function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value.trim();


  if (!name) {
    alert('Item Name is required.');
    return;
  }

  if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
    alert('Quantity must be a positive integer.');
    return;
  }

  if (isNaN(price) || price <= 0) {
    alert('Price must be a positive number.');
    return;
  }

  if (!category) {
    alert('Category is required.');
    return;
  }

 
  inventory.push({ name, quantity, price, category });

 
  document.getElementById('itemName').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';
  document.getElementById('category').value = '';

  renderInventory();
}


function deleteItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}

function updateItem(index) {
  const item = inventory[index];

  document.getElementById('itemName').value = item.name;
  document.getElementById('quantity').value = item.quantity;
  document.getElementById('price').value = item.price;
  document.getElementById('category').value = item.category;

  deleteItem(index); 
}


function sortInventory(order) {
  inventory.sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
  renderInventory();
}


function filterInventory() {
  const query = searchBar.value.trim().toLowerCase();
  const filtered = inventory.filter(item =>
    item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
  );

  inventoryTable.innerHTML = '';
  let totalValue = 0;

  filtered.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.category}</td>
      <td></td>
    `;
    totalValue += item.quantity * item.price;
    inventoryTable.appendChild(row);
  });

  totalValueDisplay.textContent = `Total Inventory Value: $${totalValue.toFixed(2)}`;
}


addItemButton.addEventListener('click', addItem);
sortAscButton.addEventListener('click', () => sortInventory('asc'));
sortDescButton.addEventListener('click', () => sortInventory('desc'));
searchBar.addEventListener('input', filterInventory);
