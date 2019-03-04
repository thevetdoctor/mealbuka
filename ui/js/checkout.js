// ui/checkout.js

const rows = document.querySelector('.rows');
const user = document.querySelector('#user');
const mealValue = document.querySelector('#meal-value');
let totalValue = 0;
// eslint-disable-next-line no-undef
const orderUrl = `${apiUrl}api/v1/orders`;
let orders = [];


const username = JSON.parse(localStorage.getItem('user'));
user.innerHTML = username.name;

// console.log(username);


// eslint-disable-next-line no-shadow
const fetchOrders = (orderUrl) => {
  const token = localStorage.getItem('token');

  fetch(orderUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res1 => res1.json())
    .then((response1) => {
    //   console.log(response);
      if (response1.status === 200) {
        orders = response1.data;

        // eslint-disable-next-line no-undef
        fetch(`${apiUrl}api/v1/meals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res2 => res2.json())
          .then((response2) => {
            orders.forEach((order) => {
              rows.innerHTML += `<div class="section">
                                <img src="../images/meal2.jpg" alt="Food Image">
                                <br> ${response2.data[order.mealId].name} <br>
                                <span class="btn">Remove</span>
                                </div>`;
              totalValue += parseInt(response2.data[order.mealId].price, 10);
            });
            mealValue.innerHTML = `N${totalValue}.00`;
          });
      } else {
        rows.innerHTML = `${response1.error}`;
      }
    });
};

fetchOrders(orderUrl);
