const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let input;

  function init(_form, _items) {
    items = _items;
    input = _form.querySelector('.form input');

    _form.addEventListener('submit', formHandler);

    items.addEventListener('change', finish);






    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
    const value = input.value;
    add(value);


  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    var checkBox = document.getElementsByClassName('item__checkbox');

    for(let i = 0; i < checkBox.length; i++){
      if(checkBox[i].checked == true){
        checkBox[i].parentNode.classList.add('item--done');
      } else{
        checkBox[i].parentNode.classList.remove('item--done');
      }
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    e.preventDefault();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    e.preventDefault();
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = document.createElement('li');
    item.classList.add('item');

    const inputElement = el('checkbox', 'item__checkbox', finish);
    inputElement.setAttribute('type', 'checkbox');
    const spanElement = el('span', 'item__text', commit);
    var textnode = document.createTextNode(value);
    spanElement.appendChild(textnode);
    const buttonElement = el('button', 'item__button', deleteItem);
    var buttonText = document.createTextNode('Eyða');
    buttonElement.appendChild(buttonText);

    item.appendChild(inputElement);
    item.appendChild(spanElement);
    item.appendChild(buttonElement);

    items.appendChild(item);


  }

  // event handler til að eyða færslu
  function deleteItem(e) {

  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.addEventListener('click', clickHandler);
    return element;
  }

  return {
    init: init
  }
})();
