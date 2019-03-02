// ui/sales.js

const orders = document.querySelector('.orders');
const salesUrl = `${apiUrl}api/v1/orders`;

const listOrders = (url) => {
//   e.preventDefault();

  fetch(salesUrl, {
    method: 'GET',
  }).then((response) => {
    orders.innerHTML = `<h2> ${response.rows} </h2>`;
  }).catch((error) => {
    console.log(error);
    orders.innerHTML = '<h2> No orders listed </h2>';
  });
};

listOrders();
