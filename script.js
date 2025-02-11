'use strict';

// Load the EmailJS SDK
(function() {
  let script = document.createElement("script");
  script.src = "https://cdn.emailjs.com/dist/email.min.js";
  script.onload = () => emailjs.init("F0GVFJSiK_iUMCKwd");  
  document.body.appendChild(script);
})();


// Function to send email using EmailJS
function sendEmail(event) {
  event.preventDefault();

  emailjs.sendForm('service_zd52ln9', 'template_es9h3me', event.target)
    .then(function() {
      window.location.href = 'thank_you.html';
    }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send message.');
    });
}

// Enable the submit button after EmailJS has loaded
document.addEventListener("DOMContentLoaded", function() {
  const formBtn = document.querySelector("[data-form-btn]");
  formBtn.removeAttribute("disabled");
});

// Assign the form submission event
const contactForm = document.querySelector("#contact-form");  
if (contactForm) {
  contactForm.onsubmit = sendEmail;
}



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// x variables
const xItem = document.querySelectorAll("[data-x-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const xModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < xItem.length; i++) {

  xItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-x-avatar]").src;
    modalImg.alt = this.querySelector("[data-x-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-x-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-x-text]").innerHTML;

    xModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", xModalFunc);
overlay.addEventListener("click", xModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
