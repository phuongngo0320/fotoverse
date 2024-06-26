// user ID
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

const followAction = document.querySelector(".action .follow");
const emailAction = document.querySelector(".action .email");
const editProfileAction = document.querySelector(".action .edit");
const editPhotoAction = document.querySelector("#edit-photo");
const editAlbumAction = document.querySelector("#edit-album");
const deletePhotoAction = document.querySelector("#delete-photo");
const deleteAlbumAction = document.querySelector("#delete-album");

const modalActions = document.querySelectorAll(".modal-body .action");

emailAction.setAttribute("href", "mailto:phuongngovan2003@gmail.com"); // TODO
// TODO: delete

if (userId == 1) {
    followAction.style.display = "none";
    emailAction.style.display = "none";
    editProfileAction.style.display = "block";
    modalActions.forEach(action => action.style.display = "block");

    // TODO: edit
    editPhotoAction.setAttribute("href", "../editPhoto");
    editAlbumAction.setAttribute("href", "../editAlbum");
} else {
    followAction.style.display = "block";
    emailAction.style.display = "block";
    editProfileAction.style.display = "none";
    modalActions.forEach(action => action.style.display = "none");
}

// tab
const photos = document.querySelector("#photos");
const albums = document.querySelector("#albums");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

const photoTab = document.querySelector("#tab-photos a");
const albumTab = document.querySelector("#tab-albums a");
const followerTab = document.querySelector("#tab-followers a");
const followingTab = document.querySelector("#tab-following a");

photos.style.display = "grid";
albums.style.display = "none";
followers.style.display = "none";
following.style.display = "none";

let activeTab = photoTab;
let activeContent = photos;

function changeTab(tab, content) {
    activeTab.classList.remove("active");
    activeTab.removeAttribute("aria-current");
    activeContent.style.display = "none";

    tab.classList.add("active");
    tab.setAttribute("aria-current", "page");
    content.style.display = "grid";

    activeTab = tab;
    activeContent = content;
}

photoTab.addEventListener('click', () => changeTab(photoTab, photos));
albumTab.addEventListener('click', () => changeTab(albumTab, albums));
followerTab.addEventListener('click', () => changeTab(followerTab, followers));
followingTab.addEventListener('click', () => changeTab(followingTab, following));

// modal
const photoItems = document.querySelectorAll("#photos .item");
const albumItems = document.querySelectorAll("#albums .item");

const photoModal = new bootstrap.Modal(document.querySelector("#photoModal"), {keyboard: false});
const albumModal = new bootstrap.Modal(document.querySelector("#albumModal"), {keyboard: false});

photoItems.forEach(item => item.addEventListener("click", () => {
    photoModal.show();
}));
albumItems.forEach(item => item.addEventListener("click", () => {
    albumModal.show();
}));

// follow
const followButtons = document.querySelectorAll(".follow");

function toggleFollow(button) {
    if (button.textContent === "Follow") {
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline-primary");
        button.textContent = "Following";
    } else {
        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-primary");
        button.textContent = "Follow";
    }
}

followButtons.forEach(button => button.addEventListener('click', () => toggleFollow(button)));

// react
const reactIcons = document.querySelectorAll(".react");

function toggleReact(icon) {
    if (icon.classList.contains("fa-solid")) { // reacted
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.removeAttribute("style");
    } else {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.setAttribute("style", "color: #ed333b;");
    }
}

reactIcons.forEach(icon => icon.addEventListener('click', () => {
    toggleReact(icon.firstElementChild);
}))
document.querySelector("#photoModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#photoModal .react i")));
document.querySelector("#albumModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#albumModal .react i")));