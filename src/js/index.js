//*1 bring in all DOM Elements, create richestPeople array
//*2 create an array that will represent arr as you list and sort it
//*3 create createList function, we want to recreate richest ppl arr so we don't scramble original arr, we need original order of richestPeople arr
//*4 createList takes ordered arr, copied it with spread operator, changed it into an object with a value and a sort and turnedit back into an arr of strings and loop through
//*5 create function addEventListeners()
//*6 create dragStart function that has all other functions which will fire off when someone clicks and drags a li
//*7 this.classList.remove('over') it adds class of over to current element using keyword this
//*8 use closest method data-index tells us which item is in which position when we grab name the data-index outputs a number in the index order it is in
//*9 create swapItems function with swapItems want to swap the data-index when we click drag and drop 
//*10 create checkOrder function

const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

//2 Store listitems
const listItems = [];

let dragStartIndex;

createList();

//3 Insert list items into DOM with spread operator
function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() })) //give arr a random value
    .sort((a, b) => a.sort - b.sort) //sort arr by random number
    .map(a => a.value) //return the arr sorted but by string name object
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

//6
function dragStart() {
  // console.log('Event: ', 'dragstart');
  //8 + makes it a number
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  //7
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  //7
  this.classList.remove('over');
}

//need to pass an event because this function gets in the way of swapping items
function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  //9
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

//9 Swap list items that are drag and drop from where we click and drag and to where we drop it
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  //swapping them in the DOM
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

//10 Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

//5 Eventlisteners to listen for Drag and Start API events
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);