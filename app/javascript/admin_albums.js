// import { getRelativeTime } from "./utils/datetime";
// import { compactFormatter } from "./utils/number";
// import http from "./utils/request";

const albumItems = document.querySelectorAll("#albums .item");

const albumModal = document.querySelector("#albumModal")
const albumModalInstance = new bootstrap.Modal(albumModal, {keyboard: false});
albumItems.forEach(item => item.addEventListener("click", () => {

    const userName = item.querySelector(".user-name").textContent;
    const userAvatar = item.querySelector(".user-avatar img").src;
    const userPath = item.querySelector(".user-path").textContent;
    const images = item.querySelectorAll(".info > img");
    const title = item.querySelector(".title").textContent;
    const desc = item.querySelector(".desc").textContent;
    const mode = item.querySelector(".mode").textContent;
    const reactCount = item.querySelector(".react-count").textContent;
    const updatedAt = item.querySelector(".updated-at").textContent;

    // insert images to modal carousel
    const carousel = albumModal.querySelector(".carousel-inner");
    const indicators = albumModal.querySelector(".carousel-indicators");
    carousel.innerHTML = "";
    indicators.innerHTML = "";
    images.forEach((img, index) => {
        const active = index == 0 ? "active" : "";
        carousel.innerHTML += `
            <div class="carousel-item ${active}">
                <img src="${img.src}" class="d-block w-100">
            </div>
        `;

        if (index == 0) {
            indicators.innerHTML += `
                <button type="button" data-bs-target="#carouselAlbumIndicators" data-bs-slide-to="${index}" class="${active}" aria-current="true" aria-label="Slide ${index + 1}"></button>
            `;
        } else {
            indicators.innerHTML += `
                <button type="button" data-bs-target="#carouselAlbumIndicators" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>
            `;
        }
    });

    albumModal.querySelector(".modal-title .name").textContent = userName;
    albumModal.querySelector(".modal-title img").src = userAvatar;
    albumModal.querySelector(".modal-title a").href = userPath;
    albumModal.querySelector(".card-title").textContent = title;
    albumModal.querySelector(".card-text").textContent = desc;
    if (mode == "private") {
        albumModal.querySelector(".badge").style.display = "inline";
    } else {
        albumModal.querySelector(".badge").style.display = "none";
    }
    albumModal.querySelector(".react span").textContent = compactFormatter.format(reactCount);
    albumModal.querySelector(".ago").textContent = getRelativeTime(new Date(updatedAt), currentLocale);

    // add edit link
    const editPath = item.querySelector(".edit-path").textContent;
    document.querySelector("#edit-album").href = editPath;

    // add delete event
    const detelePath = item.querySelector(".delete-path").textContent;
    document.querySelector("#delete-album").addEventListener("click", () => {
        http.delete(detelePath, {}, null).then((response) => {
            const url = new URL(window.location.href);
            http.get(url.pathname, { tab: "albums", notice: response.message }, null).then(() => {
                window.location.reload();
            });
        });
    });

    // add reaction info
    const albumId = item.querySelector(".id").textContent;
    const reacted = item.querySelector(".reacted").textContent;
    const reactButton = albumModal.querySelector(".react");
    reactButton.setAttribute("data-post-id", albumId);
    albumModalInstance.show();
}));