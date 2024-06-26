const albumItems = document.querySelectorAll("#albums .item");
const albumModal = new bootstrap.Modal(document.querySelector("#albumModal"), {keyboard: false});
albumItems.forEach(item => item.addEventListener("click", () => {
    albumModal.show();
}));

// pagination
const pagination = document.querySelector("main nav .pagination");

let count = 3;
let active = 1;

function changePage(index) {
    if (index > 0 && index <= count && index !== active) {
        pagination.children[active].classList.remove("active");
        pagination.children[index].classList.add("active");
        active = index;

        if (index === 1) {
            pagination.firstElementChild.classList.add("disabled");
        } else {
            pagination.firstElementChild.classList.remove("disabled");
        }

        if (index === count) {
            pagination.lastElementChild.classList.add("disabled");
        } else {
            pagination.lastElementChild.classList.remove("disabled");
        }

        // TODO: change data to display
    }
}

// TODO: long pagination
const pages = [...Array(count).keys()].map(index => {
    const page = document.createElement("li");
    page.className = index === 0 ? "page-item active" : "page-item";
    page.innerHTML = `<a class="page-link" href="#">${index + 1}</a>`
    
    page.addEventListener('click', () => changePage(index + 1));

    pagination.insertBefore(page, pagination.lastElementChild);
})

pagination.firstElementChild.classList.add("disabled");
pagination.firstElementChild.addEventListener('click', () => changePage(active - 1));
pagination.lastElementChild.addEventListener('click', () => changePage(active + 1));