document.addEventListener('DOMContentLoaded', () => {
  const personForm = document.getElementById('personForm');
  const nameInput = document.getElementById('nameInput');
  const ageInput = document.getElementById('ageInput');
  const personList = document.getElementById('personList');

  personForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const age = ageInput.value;

    if (name && age) {
      addPerson(name, age);
      savePerson(name, age);
      nameInput.value = '';
      ageInput.value = '';
    }
  });

  function addPerson(name, age) {
    const li = document.createElement('li');
    li.textContent = `${name} (${age} jaar)`;
    personList.appendChild(li);
  }

  function savePerson(name, age) {
    fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, age })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Saved:', data);
    })
    .catch(error => {
      console.error('Error saving:', error);
    });
  }
});
