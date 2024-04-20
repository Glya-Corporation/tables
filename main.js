const numberTable = document.getElementById('table');
const select = document.getElementById('select');
const plate = document.getElementById('plate');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const ul = document.getElementById('ul');

let allTables = JSON.parse(localStorage.getItem('allTables')) || {};
let historyTables = JSON.parse(localStorage.getItem('historyTables')) || [];

const add = () => {
  const tableId = numberTable.value;

  const menu = {
    plate: select.value === '0' ? plate.value : select.value,
    quantity: quantity.value,
    price: price.value * quantity.value
  };

  if (allTables[tableId]) {
    // Si la mesa ya existe, agregamos el elemento al menú existente
    allTables[tableId].menu.push(menu);
  } else {
    // Si la mesa no existe, creamos una nueva entrada en el objeto
    allTables[tableId] = { id: tableId, menu: [menu] };
  }

  localStorage.setItem('allTables', JSON.stringify(allTables));

  location.reload();
};

const removeTable = tableId => {
  if (allTables[tableId]) {
    historyTables.push(allTables[tableId]);
    delete allTables[tableId];
    localStorage.setItem('allTables', JSON.stringify(allTables));
    localStorage.setItem('historyTables', JSON.stringify(historyTables));
    location.reload();
  }
};

// Representar los datos en la interfaz de usuario
let storageLocale = '';

Object.values(allTables).forEach(table => {
  storageLocale += `
    <li>
      <p>${table.id}</p>
      <button onclick="removeTable('${table.id}')">Eliminar</button>
      <ul>
        ${table.menu.map(item => `<li><b>${item.plate}</b> <b>${item.quantity}</b> <b>${item.price}$</b></li>`).join('')}
      </ul>
    </li>`;
});

ul.innerHTML = storageLocale;

const history = () => (window.location.href = 'history.html');