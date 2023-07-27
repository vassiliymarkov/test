'use strict';

/***** GETTING CITY NAME BY ITS POSTCODE WITH API *****/

function getCityByPostcode() {
    // Collect data from the field postcode
    let code = document.querySelector('#postcode').value;
  
    // Get URL of the API using the correct variable name 'code'
    let postcodes = `https://apicarto.ign.fr/api/codes-postaux/communes/${code}`;
  
    // GET request to the API, transform the response and format it as JSON, then into data
    fetch(postcodes)
      .then(response => response.json())
      .then(data => {
  
        // Utilize the 'data' object retrieved from the API to populate the 'select' field 
        // of the form with corresponding options
        for (let i = 0; i < data.length; i++) {

            // Get the 'select' element using querySelector (assuming there's only one 'select' element
            // on the page)
            let selectElement = document.querySelector('select');
          
            // Create an 'option' element for each entry in the 'data' object
            let option = document.createElement('option');
          
            // Set the text content of the 'option' element to the value of the 'nomCommune' property
            // from the 'data' object. This assumes that each entry in the 'data' object has
            // a 'nomCommune' property containing the city name
            option.textContent = data[i].nomCommune;
          
            // Add the 'option' element to the 'select' element, making it available as a choice
            // in the dropdown list
            selectElement.add(option);
        }
      });
  }

  

/***** COLLECTING USER DATA FOR SUBSCRIPTION *****/

// When the document is loaded, add a submit event listener to the form
document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('#sign-up');
  form.addEventListener('submit', getUserData);
});

// Function to collect user data
function getUserData(event) {
  event.preventDefault(); // Prevent form submission

  // Collect values of user input fields from the form
  let lastName = document.getElementById('lastname').value;
  let firstName = document.getElementById('firstname').value;
  let mail = document.getElementById('mail').value;
  let number = document.getElementById('number').value;
  let street = document.getElementById('street').value;
  let postcode = document.getElementById('postcode').value;
  let city = document.getElementById('city').value;
  let password = document.getElementById('password').value;
  let pass = document.getElementById('pass').value;

  // Remove previous error messages
  removeErrorMessages();

  // Create empty array of error messages
  let errorMessages = [];

  // Check if last name, first name, and street have at least two characters
  if (lastName.length < 2 || firstName.length < 2 || street.length < 2) {
    errorMessages.push('Le nom de famille, le prénom et la rue doivent comporter au moins deux caractères');
  }

  // Check if passwords match
  if (password !== pass) {
    errorMessages.push('Les mots de passe ne correspondent pas');
  }

  // Check if password is not empty
  if (password.trim() === '') {
    errorMessages.push('Le mot de passe ne peut pas être vide');
  }

  // Check if password meets the criteria (at least 10 characters, contains at least one digit and one uppercase letter)
  if (password.length < 10 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
    errorMessages.push('Le mot de passe doit comporter au moins 10 caractères et contenir au moins un chiffre et une lettre majuscule');
  }

  // Check if the street number is in the format of number
  if (isNaN(number)) {
    errorMessages.push('Le champ Numéro de rue doit être rempli uniquement avec des chiffres');
  }

  // If there are any errors, display error messages
  if (errorMessages.length > 0) {
    displayErrorMessages(errorMessages);
    return;
  }

  // Create an object with the collected data
  let userData = {
    lastName: lastName,
    firstName: firstName,
    mail: mail,
    number: number,
    street: street,
    postcode: postcode,
    city: city,
    password: password,
    pass: pass,
  };

    console.log(userData);

  // If form data is valid display success message
  displaySuccessMessage('Formulaire soumis avec succès !');
}

// Function to remove error messages from the page
function removeErrorMessages() {
  let errorMessageContainer = document.getElementById('error-message-container');
  if (errorMessageContainer) {
    errorMessageContainer.remove();
  }
}

// Function to display error messages on the page
function displayErrorMessages(messages) {
  let errorMessageContainer = document.createElement('div');
  errorMessageContainer.setAttribute('id', 'error-message-container');
  
  messages.forEach((message) => {
    let errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessageContainer.appendChild(errorMessage);
  });

  let form = document.querySelector('#sign-up');
  form.insertAdjacentElement('afterend', errorMessageContainer);
}

// Function to display success message on the page
function displaySuccessMessage(message) {
  let successMessage = document.createElement('div');
  successMessage.textContent = message;
  successMessage.style.color = 'green';
  successMessage.setAttribute('id', 'success-message-container');
  let form = document.querySelector('#sign-up');
  form.insertAdjacentElement('afterend', successMessage);
}