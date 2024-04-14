document.addEventListener('DOMContentLoaded', function() {

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  

// Exemple d'utilisation de la fonction de connexion
connexion("formateur@gmail.com", "1234");

  let username = document.getElementById('username').value.trim();
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();

  let usernameError = document.getElementById('usernameError');
  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');

  let emailValid = /\S+@\S+\.\S+/.test(email);
  let passwordValid = password.length >= 8;

  usernameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';

  // Validate fields
  if (username === '') {
    usernameError.textContent = 'Please enter your username.';
    return;
  }

  if (!emailValid) {
    emailError.textContent = 'Please enter a valid email address.';
    return;
  }

  if (!passwordValid) {
    passwordError.textContent = 'Password must be at least 8 characters long.';
    return;
  }

  // Save data to localStorage
  let userData = {
    username: username,
    email: email,
    password: password
  };
  localStorage.setItem('userData', JSON.stringify(userData));

  window.location.href = "index.html";
});
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();

  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');

  emailError.textContent = '';
  passwordError.textContent = '';

  if (email === '') {
    emailError.textContent = 'Please enter your email address.';
    return;
  }

  if (password === '') {
    passwordError.textContent = 'Please enter your password.';
    return;
  }

  let storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    storedUserData = JSON.parse(storedUserData);

    if (email === storedUserData.email && password === storedUserData.password) {
      console.log('Authentication successful');
      window.location.href = "dashboard.html"; 
    } else {
      console.log('Authentication failed');
      emailError.textContent = 'Mot de passe ou adresse e-mail invalide.';
    }
  } else {
    console.log('No user data found');
    emailError.textContent = 'No user data found. Please register first.';
  }
 
});
let elementsArray = [];

let button = document.getElementById("add-button");
function openPopup() {
  let popup = document.getElementById("editPopup");
  popup.style.display = "block";
}

function closePopup() {
  let popup = document.getElementById("editPopup");
  popup.style.display = "none";
}

function openDifficultyPopup(difficulty) {
  var popup = document.getElementById("difficultyPopup");
  var difficultyContent = document.getElementById("difficultyContent");

  difficultyContent.textContent = difficulty;

  popup.style.display = "block";
}

function closeDifficultyPopup() {
  var popup = document.getElementById("difficultyPopup");
  popup.style.display = "none";
}

var rowCount = 1;

function addToTable() {
  var name = document.getElementById('editName').value;
  var date = document.getElementById('editDate').value;
  var difficulty = document.getElementById('editDifficulty').value;

  var newRow = document.createElement('tr');

  var nameCell = document.createElement('td');
  nameCell.textContent = name;
  var dateCell = document.createElement('td');
  dateCell.textContent = date;

  // Cellule pour la difficulté avec l'icône de l'œil
  var difficultyCell = document.createElement('td');
  var eyeIcon = document.createElement('i');
  eyeIcon.className = 'fas fa-eye eye-icon'; 
  difficultyCell.appendChild(eyeIcon);

  eyeIcon.addEventListener("click", function() {
    openDifficultyPopup(difficulty);
  });

  var validationCell = document.createElement('td');
  var validationCheckbox = document.createElement('input');
  validationCheckbox.type = 'checkbox';
  validationCell.appendChild(validationCheckbox);

  // Cellule pour l'icône de modification
  var editCell = document.createElement('td');
  var editIcon = document.createElement('i');
  editIcon.className = 'fas fa-edit edit-icon'; 
  editIcon.setAttribute("disabled", "disabled"); 
  editCell.appendChild(editIcon);

  editIcon.addEventListener("click", function() {
    openEditPopup(newRow);
  });

  var deleteCell = document.createElement('td');
  var deleteIcon = document.createElement('i');
  deleteIcon.className = 'fas fa-trash-alt delete-icon'; 
  deleteIcon.setAttribute("disabled", "disabled"); 
  deleteCell.appendChild(deleteIcon);

  deleteIcon.addEventListener("click", function() {
    var confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmation) {
      var row = deleteIcon.parentNode.parentNode; 
      row.parentNode.removeChild(row); 

      updateLocalStorage();
    }
  });
  
  function disableIcons(disable) {
    if (disable) {
      deleteIcon.classList.add('disabled');
      editIcon.classList.add('disabled');
    } else {
      deleteIcon.classList.remove('disabled');
      editIcon.classList.remove('disabled');
    }
  }

  validationCheckbox.addEventListener("change", function() {
    var isChecked = validationCheckbox.checked;
    disableIcons(isChecked);
  });
  newRow.appendChild(nameCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(difficultyCell);
  newRow.appendChild(validationCell);
  newRow.appendChild(editCell); 
  newRow.appendChild(deleteCell); 

  document.getElementById('tableBody').appendChild(newRow);

  var data = {
    name: name,
    date: date,
    difficulty: difficulty
  };

  var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
  tableData.push(data);
  localStorage.setItem('tableData', JSON.stringify(tableData));

  closePopup();
}

function addEyeIcon(parentElement, difficulty) {
  var eyeIcon = document.createElement('i');
  eyeIcon.className = 'fas fa-eye eye-icon'; 
  parentElement.appendChild(eyeIcon);
}

var currentRow;

function openEditPopup(row) {
  currentRow = row;

  var tableRows = document.querySelectorAll('tr');
  tableRows.forEach(function(tableRow) {
    tableRow.classList.remove('selected');
  });

  row.classList.add('selected');

  var cells = row.getElementsByTagName("td");
  var name = cells[0].textContent;
  var date = cells[1].textContent;
  var difficulty = cells[2].textContent;

  document.getElementById("modName").value = name;
  document.getElementById("modDate").value = date;
  document.getElementById("modDifficulty").value = difficulty;

  var modPopup = document.getElementById("modPopup");
  modPopup.style.display = "block";
}

function closeEditPopup() {
  var modPopup = document.getElementById("modPopup");
  modPopup.style.display = "none";
}

function attachSaveEditEvent() {
  document.getElementById("saveEdit").addEventListener("click", function() {
    console.log("Bouton Enregistrer cliqué");
    saveEditedData();
  });
}

// Attacher l'événement à l'événement "DOMContentLoaded" du document
document.addEventListener("DOMContentLoaded", attachSaveEditEvent);

function saveEditedData() {
  var name = document.getElementById("modName").value;  
  var date = document.getElementById("modDate").value;
  var difficulty = document.getElementById("modDifficulty").value;

  var cells = currentRow.getElementsByTagName("td");

  cells[0].textContent = name;
  cells[1].textContent = date;

  var oldEyeIcon = cells[2].querySelector(".eye-icon");
  if (oldEyeIcon) {
    oldEyeIcon.remove();
  }

  var eyeIcon = document.createElement('i');
  eyeIcon.className = 'fas fa-eye eye-icon'; 
  cells[2].appendChild(eyeIcon);

  eyeIcon.addEventListener("click", function() {
    openDifficultyPopup(difficulty);
  });

  closeEditPopup();

  updateLocalStorage();
}



function updateLocalStorage() {
  var tableRows = document.querySelectorAll('#tableBody tr');
  var tableData = [];

  tableRows.forEach(function(row) {
    var cells = row.getElementsByTagName("td");
    var rowData = {
      name: cells[0].textContent,
      date: cells[1].textContent,
      difficulty: cells[2].textContent
    };
    tableData.push(rowData);
  });

  localStorage.setItem('tableData', JSON.stringify(tableData));
}



console.log('tableData:', tableData);
localStorage.setItem('tableData', JSON.stringify(tableData));

window.addEventListener('load', function() {
  var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
  var tableBody = document.getElementById('tableBody');

  tableData.forEach(function(data) {
    var newRow = document.createElement('tr');
    newRow.innerHTML = '<td>' + data.name + '</td><td>' + data.date + '</td><td>' + data.difficulty + '</td>';
    tableBody.appendChild(newRow);
  });
});

var addButton = document.getElementById('addButton');
addButton.addEventListener('click', function() {
  addToTable();
});
