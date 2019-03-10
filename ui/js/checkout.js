/* eslint-disable no-console */
// ui/checkout.js

const rows = document.querySelector('.rows');
const user = document.querySelector('#user');
const mealValue = document.querySelector('#meal-value');
let totalValue = 0;
// eslint-disable-next-line no-undef
const url = `${apiUrl}api/v1/`;
let orders = [];
let meals = [];


const username = JSON.parse(localStorage.getItem('user'));
user.innerHTML = username.name;


// eslint-disable-next-line no-shadow
const fetchOrders = () => {
  rows.innerHTML = '';
  mealValue.innerHTML = '';
  totalValue = 0;
  const token = localStorage.getItem('token');

  fetch(`${url}orders/${username.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res1 => res1.json())
    .then((response1) => {
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
            if (response2 === undefined) {
              return;
            }
            meals = response2.data;
            const orderArray = orders.map(order => (order.mealId));
            const mealArray = [];
            const countArray = [];

            // eslint-disable-next-line no-restricted-syntax
            for (const order of orderArray) {
              if (mealArray.includes(order)) {
                countArray[mealArray.indexOf(order)].order += 1;
              } else {
                const count = 1;
                mealArray.push(order);
                countArray.push({ order: count });
              }
            }
            mealArray.forEach((mealId) => {
              const unit = countArray[mealArray.indexOf(mealId)].order;
              rows.innerHTML += `<div id="${mealId}" class="section">
                                <img src="../images/meal2.jpg" alt="Food Image">
                                <br> ${meals[mealId - 1].name} : N${meals[mealId - 1].price}<br>${unit} unit(s)<br>
                                <span class="btn">Remove</span>
                                </div>`;
              totalValue += parseInt(meals[mealId - 1].price, 10) * unit;
            });
            mealValue.innerHTML = `N${totalValue}.00`;
          });
      } else {
        rows.innerHTML = `${response1.error}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchOrders();


const getId = (e) => {
  if (!e) {
    // eslint-disable-next-line no-param-reassign
    e = window.event;
  }
};


const removeOrder = (e) => {
  getId(e);
  const token = localStorage.getItem('token');
  const orderId = parseInt(e.target.parentNode.getAttribute('id'), 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(orderId)) {
    return;
  }

  fetch(`${url}orders/${username.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res1 => res1.json())
    .then((response1) => {
      if (response1.status === 200) {
        orders = response1.data;
        const findOrder = order => order.mealId === orderId;
        const foundOrder = orders.find(findOrder);

        if (foundOrder === undefined) {
          return;
        }

        fetch(`${url}orders/${foundOrder.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        fetchOrders();
      }
    });
};

rows.addEventListener('click', removeOrder);
