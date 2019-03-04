// meals.js

const display = document.querySelector('.display');
const mealName = document.querySelector('#meal-name');
const mealPrice = document.querySelector('#meal-price');
const addMealBtn = document.querySelector('#addMeal');
const user = document.querySelector('#user');
// eslint-disable-next-line no-undef
const mealsUrl = `${apiUrl}api/v1/meals`;

const username = JSON.parse(localStorage.getItem('user'));
user.innerHTML = `${username.name}, `;

const update = () => {
  display.innerHTML = '';
  const token = localStorage.getItem('token');
  fetch(mealsUrl, {
    method: 'GET',
    headers: {
      'COntent-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
    //   console.log(response);
      if (response.status === 200) {
        const meals = response.data;
        let count = 0;

        meals.forEach((meal) => {
          count += 1;
          display.innerHTML += `<div class="meal-class">${count} - ${meal.name} - N${meal.price}<button id="${meal.id}" class="edit">Edit</button><button id="${meal.id}" class="delete">Delete</button></div>`;
        //   console.log('id', count);
        });
      } else {
        display.innerHTML = `${response.error}`;
      }
    });
};

update();


const addMeal = () => {
  const newMeal = { name: mealName.value, price: mealPrice.value };
  const token = localStorage.getItem('token');

  //   console.log(newMeal);

  if (newMeal.name === '' && newMeal.price === '') {
    display.innerHTML = 'No meals available';
  } else {
    newMeal.price += '.00';

    return fetch(mealsUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: newMeal.name,
        price: newMeal.price,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      // eslint-disable-next-line no-console
      .then(response => console.log(response))
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }

  update();
};

// const deleteMeal = () => {
//     getId = (e) => {
//         let target = e.target;
//     }
//     let id =
// }


addMealBtn.addEventListener('click', addMeal);
