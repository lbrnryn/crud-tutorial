const form = document.querySelector('form');
const ul = document.querySelector('ul');
let personToEdit;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const { name } = e.target.elements;

    if (personToEdit) {
        const matchedLi = Array.from(ul.children).find(li => li.dataset.id === personToEdit.id);
        matchedLi.dataset.name = name.value;
        matchedLi.innerHTML = `
            ${name.value}
                <div>
                    <span class='editBtn'>&#10000;</span>
                    <span class='deleteBtn'>&#10006;</span>
                </div>
        `;

        const data = JSON.parse(localStorage.getItem('people'));
        const people = data.map(person => person.id === personToEdit.id ? { ...person, name: name.value } : person);
        localStorage.setItem('people', JSON.stringify(people));
        
        personToEdit = undefined;
        name.value = '';
    } else {
       ul.children[0].innerText === 'No data yet' && ul.children[0].remove();

        const person = { name: name.value, id: Date.now().toString() };

        const li = document.createElement('li');
        li.dataset.name = person.name;
        li.dataset.id = person.id;
        li.innerHTML = `
            ${person.name}
            <div>
                <span class='editBtn'>&#10000;</span>
                <span class='deleteBtn'>&#10006;</span>
            </div>
        `;
        ul.appendChild(li);

        if (localStorage.getItem('people') === null || JSON.parse(localStorage.getItem('people')).length === 0) {
            localStorage.setItem('people', JSON.stringify([person]));
        } else {
            const people = JSON.parse(localStorage.getItem('people'))
            localStorage.setItem('people', JSON.stringify([...people, person]));
        }

        name.value = '';
    }
});


ul.addEventListener('click', function(e) {
    if (e.target.classList.contains('editBtn')) {
        personToEdit = e.target.parentElement.parentElement.dataset;
        form.elements.name.value = personToEdit.name;
        return;
    }

    if (e.target.classList.contains('deleteBtn')) {
        const li = e.target.parentElement.parentElement;
        const data = JSON.parse(localStorage.getItem('people'));
        const people = data.filter(person => person.id !== li.dataset.id);
        localStorage.setItem('people', JSON.stringify(people));

        personToEdit = undefined;
        form.elements.name.value = '';
        li.remove();
        if (ul.children.length === 0) {
            const li = document.createElement('li');
            li.innerText = 'No data yet';
            ul.appendChild(li);
            return;
        }
        return;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('people') === null || JSON.parse(localStorage.getItem('people')).length === 0) {
        const li = document.createElement('li');
        li.innerText = 'No data yet';
        ul.appendChild(li);
    } else {
        const people = JSON.parse(localStorage.getItem('people'));
        ul.innerHTML = people.map(person => {
            return `
                <li data-name='${person.name}' data-id='${person.id}'>
                    ${person.name}
                    <div>
                        <span class='editBtn'>&#10000;</span>
                        <span class='deleteBtn'>&#10006;</span>
                    </div>
                </li>
            `
        }).join('');
    }
});