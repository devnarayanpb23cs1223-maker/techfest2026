console.log("Hello");

const events = [
    {
        id: 1,
        name: "Coding Competition",
        category: "Technical",
        fee: 100,
        seats: 50
    },
    {
        id: 2,
        name: "Web Design",
        category: "Technical",
        fee: 150,
        seats: 40
    },
    {
        id: 3,
        name: "Gaming Competition",
        category: "Gaming",
        fee: 100,
        seats: 60
    },
    {
        id: 4,
        name: "Dance Competition",
        category: "Cultural",
        fee: 200,
        seats: 30
    }
];
let participants = JSON.parse(localStorage.getItem("participants")) || [];
const eventList = document.getElementById("eventList");

if (eventList) {
    events.forEach(function(event) {
        const card = document.createElement("div");

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>Category: ${event.category}</p>
            <p>Registration Fee: ₹${event.fee}</p>
            <p>Available Seats: ${event.seats}</p>
        `;

        eventList.appendChild(card);
    });
}

const searchBox = document.getElementById("searchBox");

if (searchBox) {
    searchBox.addEventListener("input", function() {
    const searchText = searchBox.value.toLowerCase();

    eventList.innerHTML = "";

    events
        .filter(function(event) {
            return event.name.toLowerCase().includes(searchText);
        })
        .forEach(function(event) {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${event.name}</h3>
                <p>Category: ${event.category}</p>
                <p>Registration Fee: ₹${event.fee}</p>
                <p>Available Seats: ${event.seats}</p>
            `;

            eventList.appendChild(card);
        });
    });
}

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("mobile").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("mobileError");

    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    let isValid = true;


    // Name validation
if (name === "") {
    nameError.textContent = "Please enter your full name.";
    document.getElementById("name").classList.add("invalid");
    isValid = false;
} else {
    document.getElementById("name").classList.add("valid");
}

// Email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    document.getElementById("email").classList.add("invalid");
    isValid = false;
} else {
    document.getElementById("email").classList.add("valid");
}

// Mobile validation
const phonePattern = /^[6-9]\d{9}$/;

if (!phonePattern.test(phone)) {
    phoneError.textContent = "Enter a valid 10-digit mobile number.";
    document.getElementById("mobile").classList.add("invalid");
    isValid = false;
} else {
    document.getElementById("mobile").classList.add("valid");
}

// If all fields are valid
if (isValid) {

    const participant = {
        name: name,
        email: email,
        mobile: phone
    };

    participants.push(participant);

    localStorage.setItem("participants", JSON.stringify(participants));

    console.log("Participant registered:", participant);
    console.log("All participants:", participants);

    displayParticipants();

    alert("Registration successful!");
}


});
}

console.log(events);

const participantList = document.getElementById("participantList");
const participantCount = document.getElementById("participantCount");

function displayParticipants() {

    if (!participantList) {
        return;
    }

    participantList.innerHTML = "";

    participants.forEach(function(participant, index) {

        const participantCard = document.createElement("div");

        participantCard.innerHTML = `
            <p>
                <strong>Name:</strong> ${participant.name}<br>
                <strong>Email:</strong> ${participant.email}<br>
                <strong>Mobile:</strong> ${participant.mobile}
            </p>

            <button onclick="editParticipant(${index})">Edit</button>
            <button onclick="deleteParticipant(${index})">Delete</button>

            <hr>
        `;

        participantList.appendChild(participantCard);
    });

    participantCount.textContent = participants.length;
}
displayParticipants();

function editParticipant(index) {

    const participant = participants[index];

    const newName = prompt("Enter new name:", participant.name);

    if (newName === null) {
        return;
    }

    const newEmail = prompt("Enter new email:", participant.email);

    if (newEmail === null) {
        return;
    }

    const newMobile = prompt("Enter new mobile number:", participant.mobile);

    if (newMobile === null) {
        return;
    }

    participant.name = newName.trim();
    participant.email = newEmail.trim();
    participant.mobile = newMobile.trim();

    displayParticipants();
}


function deleteParticipant(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this participant?"
    );

    if (confirmDelete) {
        participants.splice(index, 1);

        displayParticipants();
    }
}

const clearParticipants = document.getElementById("clearParticipants");

if (clearParticipants) {

    clearParticipants.addEventListener("click", function() {

        const confirmClear = confirm(
            "Are you sure you want to delete all participants?"
        );

        if (confirmClear) {

            participants = [];

            localStorage.removeItem("participants");

            displayParticipants();

            alert("All participants have been deleted.");
        }
    });
}

const participantSearch = document.getElementById("participantSearch");

if (participantSearch) {
    participantSearch.addEventListener("input", function() {

        const searchText = participantSearch.value.toLowerCase();

        const filteredParticipants = participants.filter(function(participant) {
            return participant.name.toLowerCase().includes(searchText) ||
                   participant.email.toLowerCase().includes(searchText);
        });

        participantList.innerHTML = "";

        filteredParticipants.forEach(function(participant) {

            const participantCard = document.createElement("div");

            participantCard.innerHTML = `
                <p>
                    <strong>Name:</strong> ${participant.name}<br>
                    <strong>Email:</strong> ${participant.email}<br>
                    <strong>Mobile:</strong> ${participant.mobile}
                </p>
                <hr>
            `;

            participantList.appendChild(participantCard);
        });
    });
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

console.log("Add Task button:", addTask);

function displayTasks() {

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const taskItem = document.createElement("div");

        const taskStyle = task.completed
            ? "text-decoration: line-through;"
            : "";

        const buttonText = task.completed
            ? "Undo"
            : "Complete";

        taskItem.innerHTML = `
            <span style="${taskStyle}">
                ${task.name}
            </span>

            <button onclick="completeTask(${index})">
                ${buttonText}
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>

            <hr>
        `;

        taskList.appendChild(taskItem);
    });
}

if (addTask && taskInput) {

    addTask.addEventListener("click", function() {

        const taskName = taskInput.value.trim();

        if (taskName === "") {
            alert("Please enter a task.");
            return;
        }

        const task = {
            name: taskName,
            completed: false
        };

        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        console.log("Task added:", task);

        taskInput.value = "";

        displayTasks();
    });
}

// Complete a task

window.completeTask = function(index) {

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

};


// Delete a task

window.deleteTask = function(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {

        tasks.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();

    }

};

// Display saved tasks when the page loads
displayTasks();

// =============================
// Interactive Image Gallery
// =============================

const galleryImages = document.querySelectorAll(".gallery-image");

if (galleryImages.length > 0) {

    const imageLightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    const closeLightbox = document.getElementById("closeLightbox");
    const prevImage = document.getElementById("prevImage");
    const nextImage = document.getElementById("nextImage");

    let currentImageIndex = 0;


    function openLightbox(index) {

        currentImageIndex = index;

        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightboxImage.alt = galleryImages[currentImageIndex].alt;

        imageLightbox.style.display = "flex";
    }


    function closeGallery() {

        imageLightbox.style.display = "none";
    }


    function showPreviousImage() {

        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }

        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightboxImage.alt = galleryImages[currentImageIndex].alt;
    }


    function showNextImage() {

        currentImageIndex++;

        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightboxImage.alt = galleryImages[currentImageIndex].alt;
    }


    galleryImages.forEach(function(image, index) {

        image.addEventListener("click", function() {

            openLightbox(index);

        });

    });


    closeLightbox.addEventListener("click", function() {

        closeGallery();

    });


    prevImage.addEventListener("click", function() {

        showPreviousImage();

    });


    nextImage.addEventListener("click", function() {

        showNextImage();

    });


        // Keyboard controls

    document.addEventListener("keydown", function(event) {

        // Only work when the gallery is open
        if (imageLightbox.style.display === "flex") {

            if (event.key === "ArrowLeft") {
                showPreviousImage();
            }

            if (event.key === "ArrowRight") {
                showNextImage();
            }

            if (event.key === "Escape") {
                closeGallery();
            }
        }

    });


    // Automatic slideshow

    let slideshow;

    function startSlideshow() {

        slideshow = setInterval(function() {

            if (imageLightbox.style.display === "flex") {
                showNextImage();
            }

        }, 3000);

    }

    startSlideshow();
}

// =============================
// Welcome Message & User Preference
// =============================

const welcomeMessage = document.getElementById("welcomeMessage");
const userPreference = document.getElementById("userPreference");
const setPreference = document.getElementById("setPreference");

if (welcomeMessage && setPreference) {

    // Get saved user name
    let userName = localStorage.getItem("userName");

    // Ask for name if it is not already saved
    if (!userName) {

        userName = prompt("Welcome to TechFest 2026! What is your name?");

        if (userName) {

            userName = userName.trim();

            localStorage.setItem("userName", userName);

        }
    }


    // Display welcome message

    if (userName) {

        welcomeMessage.textContent =
            "Welcome, " + userName + "!";

    }


    // Get saved preference

    const savedPreference =
        localStorage.getItem("userPreference");

    if (savedPreference && userPreference) {

        userPreference.textContent =
            "Your preference: " + savedPreference;

    }


    // Set preference button

    setPreference.addEventListener("click", function() {

        const preference = prompt(
            "What do you prefer? Technical / Cultural / Gaming"
        );

        if (preference) {

            localStorage.setItem(
                "userPreference",
                preference
            );

            userPreference.textContent =
                "Your preference: " + preference;

        }

    });

}

// =============================
// ES6+ JavaScript Features
// =============================

// Arrow function
const showTechFestMessage = () => {
    console.log("Welcome to TechFest 2026!");
};


// Template literal
const eventMessage = (eventName, fee) => {
    return `Event: ${eventName} | Registration Fee: ₹${fee}`;
};


// Destructuring
const sampleEvent = {
    name: "Coding Competition",
    category: "Technical",
    fee: 100
};

const { name, category, fee } = sampleEvent;

console.log("Event Name:", name);
console.log("Category:", category);
console.log("Fee:", fee);


// Spread operator
const additionalEvents = [
    {
        name: "Hackathon",
        category: "Technical",
        fee: 200
    }
];

const allEvents = [...events, ...additionalEvents];

console.log("All Events:", allEvents);


// Run example functions
showTechFestMessage();

console.log(eventMessage("Coding Competition", 100));