const form = document.querySelector("form");
const ul = document.querySelector("ul");
// console.log(ul)
// console.log(localStorage.getItem("friends"))
// const person = {name: "ryan", age:28}
const friends = [
    {name: "ryan", age:28},
    {name: "nimrod", age:20}
]
// console.log(friends)
// localStorage.setItem("friends", JSON.stringify(friends))
// console.log(JSON.parse(localStorage.getItem("friends"))[0].name)

// console.log(typeof Date.now().toString())

// CREATE
form.addEventListener("submit", function(event) {
    // console.log("submit")
    event.preventDefault();
    // console.log(event.target[0].value)
    // console.log(event.target[1].value)

    // console.log(event.target[2])
    if (event.target[2].innerText === "Submit" ) {
        const person = {
            name: event.target[0].value,
            id: Date.now().toString()
        };
        // console.log(person)
    
        const li = document.createElement("li");
        li.dataset.name = person.name;
        li.dataset.id = person.id;
        li.innerHTML = `
            ${person.name}
            <div>
                <span class="editBtn">&#10000;</span>
                <span class="delBtn">&#10006;</span>
            </div>
        `;
        ul.appendChild(li);
        event.target[0].value = "";
        event.target[1].value = "";

        let friends;

        if(localStorage.getItem("friends") === null || JSON.parse(localStorage.getItem("friends")).length === 0) {
            friends = [];
            friends.push(person)
            // console.log(friends)
            localStorage.setItem("friends", JSON.stringify(friends))
        } else {
            friends = JSON.parse(localStorage.getItem("friends"));
            friends.push(person);
            // console.log(friends)
            localStorage.setItem("friends", JSON.stringify(friends))
        }

        // console.log(localStorage.getItem("friends"))

    } else {
        // console.log("edit")
        // console.log(ul.children)
        // console.log(Array.from(ul.children))
        const lis = Array.from(ul.children);
        const liIndex = lis.findIndex(function(li) {
            if (li.dataset.id === event.target[1].value) {
                return li
            }
        });
        // console.log(liIndex)
        lis[liIndex].innerHTML = `
            ${event.target[0].value}
            <div>
                <span class="editBtn">&#10000;</span>
                <span class="delBtn">&#10006;</span>
            </div>
        `;
        

        const friends = JSON.parse(localStorage.getItem("friends"));
        // console.log(friends)
        // console.dir(event.target)

        const index = friends.findIndex(function(friend) {
            if (friend.id === event.target[1].value) {
                return friend
            }
            // console.log(friend)
        });
        // console.log(index)
        friends[index] = { name: event.target[0].value, id: event.target[1].value }
        // console.log(friends)
        localStorage.setItem("friends", JSON.stringify(friends))

        form[0].value = "";
        form[1].value = "";

    }
});


ul.addEventListener("click", function(event) {
    // console.log(event.target.parentElement.parentElement.remove())

    // EDIT
    if (event.target.classList.contains("editBtn")) {
        const id = event.target.parentElement.parentElement.dataset.id;
        const name = event.target.parentElement.parentElement.dataset.name;

        form[0].value = name;
        form[1].value = id;
        form[2].innerText = "Edit";
    }

    // DELETE
    if (event.target.classList.contains("delBtn")) {
        event.target.parentElement.parentElement.remove();

        const friends = JSON.parse(localStorage.getItem("friends"))
        // console.log(event.target.parentElement.parentElement.dataset.id)
        const newFriends = friends.filter(function(friend) {
            if (friend.id !== event.target.parentElement.parentElement.dataset.id) {
                return friend
            }
        });

        // console.log(newFriends)
        localStorage.setItem("friends", JSON.stringify(newFriends));
        // console.log(ul.children.length)
        if (ul.children.length === 0) {
            const li = document.createElement("li");
            li.innerText = "No Friends Yet";
            ul.appendChild(li);
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    if(JSON.parse(localStorage.getItem("friends")).length === 0) {
        const li = document.createElement("li");
            li.innerText = "No Friends Yet";
            ul.appendChild(li);
    } else {
        const friends = JSON.parse(localStorage.getItem("friends"));
        // console.log(friends)
    
        for(const friend of friends) {
            const li = document.createElement("li");
            li.dataset.name = friend.name;
            li.dataset.id = friend.id;
            li.innerHTML = `
                ${friend.name}
                <div>
                    <span class="editBtn">&#10000;</span>
                    <span class="delBtn">&#10006;</span>
                </div>
            `;
            ul.appendChild(li);
        }
    }



})