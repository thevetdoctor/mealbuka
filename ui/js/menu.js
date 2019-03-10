// menu.js

class MenuList {
  constructor(element) {
    this.menuHandle = element;
    this.mealList = [
    ];
  }


  static createMenuItem(mealObj) {
    const div = document.createElement('div');

    div.innerHTML = `<div class="section">
                        <img src="./images/meal2.jpg" alt="Food Image">
                        <br> ${mealObj.name} N${mealObj.price} <br>
                        <span class="btn">Click to choose</span>
                        </div>`;
    return div;
  }


  update() {
    // remove existing div elements
    while (this.menuHandle.firstChild) {
      this.menuHandle.removeChild(this.menuHandle.firstChild);
    }

    for (const mealObj of this.mealList) {
      this.menuHandle.appendChild(MenuList.createMenuItem(mealObj));
    }
  }

  add(mealObj) {
    this.mealList.push(mealObj);
    this.update();
  }

  remove(item) {
    this.mealList.splice(item - 1, 1);
    this.update();
  }
}


const myMenuList = document.querySelector('.row-top');
const add = document.getElementById('add-meal');
const mealOption = document.getElementById('mealOption');
// const displayId = document.getElementById('display');
const menuList = new MenuList(myMenuList);

// let sampleMeal = {name:'Fufu', price: '25.00'};
const sampleMeal = mealOption.value;

add.addEventListener('click', (e) => {
  e.preventDefault();
  //  console.log(sampleMeal);
  if (mealOption.value === undefined) return;
  menuList.add(sampleMeal);
});


// mealOption.addEventListener('blur', () => {
// return menuList.remove() });
