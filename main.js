// Phone Class
class Phone {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayPhones() {
      const phones = Store.getPhones();
  
      phones.forEach((phone) => UI.addPhoneToList(phone));
    }
  
    static addPhoneToList(phone) {
      const list = document.querySelector('#phone-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${phone.name}</td>
        <td>${phone.number}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deletePhone(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#phone-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
  
    static clearFields() {
      
      document.querySelector('#name').value = '';
      document.querySelector('#number').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getPhones() {
      let phones;
      if(localStorage.getItem('phones') === null) {
        phones = [];
      } else {
        phones = JSON.parse(localStorage.getItem('phones'));
      }
  
      return phones;
    }
  
    static addPhone(phone) {
      const phones = Store.getPhones();
      phones.push(phone);
      localStorage.setItem('phones', JSON.stringify(phones));
    }
  
    static removePhone(number) {
      const phones = Store.getPhones();
  
      phones.forEach((phone, index) => {
        if(phone.number === number) {
          phones.splice(index, 1);
        }
      });
  
      localStorage.setItem('phones', JSON.stringify(phones));
    }
  }
  
  // Event: Display Phones
  document.addEventListener('DOMContentLoaded', UI.displayPhones);
  
  // Event: Add a Phone
  document.querySelector('#phone-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const name = document.querySelector('#name').value;
    const number = document.querySelector('#number').value;
  
  
    // Validate
    if(name === '' || number === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate phone
      const phone = new Phone(name, number);
  
      // Add Phone to UI
      UI.addPhoneToList(phone);
  
      // Add phone to store
      Store.addPhone(phone);
  
      // Show success message
      UI.showAlert('Subscriber Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Phone
  document.querySelector('#phone-list').addEventListener('click', (e) => {
    // Remove phone from UI
    UI.deletePhone(e.target);
  
    // Remove phone from store
    Store.removePhone(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Subscriber Removed', 'success');
    
    
  });