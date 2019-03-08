// user.js

const meals = document.querySelector('.row');
const user = document.querySelector('#user');
// eslint-disable-next-line no-undef
const mealUrl = `${apiUrl}api/v1/meals`;
let menu = [];
const username = JSON.parse(localStorage.getItem('user'));
user.innerHTML = username.name;

// eslint-disable-next-line no-shadow
const fetchMeals = (mealUrl) => {
  // let user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  fetch(mealUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      // console.log(response);
      if (response.status === 200) {
        menu = response.data;
        menu.forEach((meal) => {
          meals.innerHTML += `<div class="section">
                                <img src="../images/meal2.jpg" alt="Food Image">
                                 ${meal.name} <br> N${meal.price} <br>
                                <span class="btn">Click to choose</span>
                                </div>`;
        });
      } else {
        meals.innerHTML = `${response.error}`;
      }
    });
};

fetchMeals(mealUrl);

// console.log(menu);


let count = 0;
const pickMeal = () => {
  // eslint-disable-next-line no-restricted-globals
  const e = event.target;
  // console.log(e);
  if (e.innerText !== 'Click to choose') {
    const innerText = e.innerText.split(' ');
    // console.log(innerText);
    let value = innerText[innerText.length - 1];
    //   console.log(parseInt(value , 10));
    value += 1;
    e.innerText = `Added ${value}`;
    //   console.log(e.parentNode);

    // myOrders.push({name: })
  } else {
    count += 1;
    e.innerText = `Added ${count}`;
  }
};

meals.addEventListener('click', pickMeal);
