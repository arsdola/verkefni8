const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let input;
  let delbutton;
  let change;




  function init(_form, _items) {
    items = _items;
    input = _form.querySelector('.form input');
    delbutton = document.getElementsByClassName('item__button');
    change = document.getElementsByClassName('item__text');

    _form.addEventListener('submit', formHandler);

    items.addEventListener('change', finish);

    for(let i = 0; i < delbutton.length; i++){
      delbutton[i].addEventListener('click', deleteItem);
    }

    for(let i = 0; i < change.length; i++){
      change[i].addEventListener('click', edit);
    }





    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();

    const value = input.value;
    add(value);
    input.value = '';
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
    const newInput = document.createElement('input');
    newInput.classList.add('item__text');

    var sametext = this.firstChild.textContent;
    newInput.value = sametext;

    this.parentNode.insertBefore(newInput, this.parentNode.children[1]);

    this.parentNode.removeChild(this.parentNode.children[2]);
    newInput.focus();

    newInput.classList.add('item__edit');

    newInput.addEventListener('keydown', commit, false);


  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    var key = e.wich || e.keyCode;
    if (key === ENTER_KEYCODE){
      const newspanElement = el('span', 'item__text', edit);
      var newtextnode = document.createTextNode(this.value);
      newspanElement.appendChild(newtextnode);

      this.parentNode.insertBefore(newspanElement, this.parentNode.children[1]);
      this.parentNode.removeChild(this.parentNode.children[2]);
    } else {
      return;
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    if (value.trim() === '' || value === null ){
      return;
    }
    const item = document.createElement('li');
    item.classList.add('item');

    const inputElement = el('input', 'item__checkbox', finish);
    inputElement.setAttribute('type', 'checkbox');
    const spanElement = el('span', 'item__text', edit);
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
    this.parentNode.parentNode.removeChild(this.parentNode);
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
