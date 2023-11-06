'use strict';

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



'use strict';

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const pageStack = [];

const pageURLs = {
    "about": "https://sajjaregmi.com.np/about",
    "resume": "https://sajjaregmi.com.np/resume",
    "works": "https://sajjaregmi.com.np/works",
    "blog": "https://sajjaregmi.com.np/blog",
    "contact": "https://sajjaregmi.com.np/contact"
};

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.log('Error fetching content: ', error));
}

function activateDefaultPage() {
    const defaultPage = 'about';
    for (let j = 0; j < pages.length; j++) {
        if (pages[j].dataset.page === defaultPage) {
            pages[j].classList.add("active");
            navigationLinks[j].classList.add("active");
        } else {
            pages[j].classList.remove("active");
            navigationLinks[j].classList.remove("active");
        }
    }

    loadContent(pageURLs[defaultPage]);
    history.pushState({ page: defaultPage }, null, `${defaultPage}`);
    pageStack.push(defaultPage);
}

activateDefaultPage(); 

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function (event) {
        event.preventDefault();

        const link = this.getAttribute("data-nav-link");

        for (let j = 0; j < pages.length; j++) {
            if (pages[j].dataset.page === link) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }

        if (!pageStack.includes(link)) {
            pageStack.push(link);
        }

        loadContent(pageURLs[link]);
        history.pushState({ page: link }, null, `${link}`);
    });
}

window.addEventListener('popstate', function (event) {
    if (event.state && event.state.page) {
        const link = event.state.page;

        for (let j = 0; j < pages.length; j++) {
            if (pages[j].dataset.page === link) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }

        loadContent(pageURLs[link]);

        const currentPageIndex = pageStack.indexOf(link);
        if (currentPageIndex !== -1) {
            pageStack.splice(currentPageIndex, 1);
        }
    }
});


