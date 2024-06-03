let myLinks = [];
const saveInputBtn = document.querySelector("#save-input-btn");
const saveTabBtn = document.querySelector("#save-tab-btn");
const deleteAllBtn = document.querySelector("#delete-all-btn");
const urlList = document.querySelector("#url-list");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

// Modal elements
const modal = document.getElementById("input-modal");
const closeModal = document.getElementsByClassName("close")[0];
const modalSaveBtn = document.getElementById("modal-save-btn");
const modalDiscardBtn = document.getElementById("modal-discard-btn");
const titleInput = document.getElementById("title-input");
const linkInput = document.getElementById("link-input");

let isEditing = false;
let editingIndex = -1;

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage;
    render(myLinks);
}

saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const title = tabs[0].title;
        const url = tabs[0].url;
        myLinks.push({ title, url });
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    });
});

deleteAllBtn.addEventListener("click", function () {
    localStorage.clear();
    myLinks = [];
    render(myLinks);
});

saveInputBtn.addEventListener("click", function () {
    isEditing = false;
    modal.style.display = "block";
});

modalSaveBtn.addEventListener("click", function () {
    const title = titleInput.value.trim();
    const url = linkInput.value.trim();
    if (title !== "" && url !== "") {
        if (isEditing) {
            myLinks[editingIndex] = { title, url };
        } else {
            myLinks.push({ title, url });
        }
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
        modal.style.display = "none";
        titleInput.value = "";
        linkInput.value = "";
    } else {
        alert("Please enter both title and URL.");
    }
});

modalDiscardBtn.addEventListener("click", function () {
    modal.style.display = "none";
    titleInput.value = "";
    linkInput.value = "";
});

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function render(linksArray) {
  let listItems = "";
  for (let i = 0; i < linksArray.length; i++) {
      // Limiting the title text to 20 characters
      const titleText = linksArray[i].title.length > 40 ? linksArray[i].title.substring(0, 40) + "..." : linksArray[i].title;

      listItems += `
          <li>
              <div class="left-part">
                  <img src="https://www.google.com/s2/favicons?domain=${linksArray[i].url}" alt="Favicon">
                  ${titleText}
              </div>
              <div class="right-part">
                  <button class="edit-link-btn" data-index="${i}">
                      <img src="https://img.icons8.com/material-outlined/24/ffffff/edit--v1.png" alt="Edit">
                  </button>
                  <button class="delete-link-btn" data-index="${i}">
                      <img src="https://img.icons8.com/material-outlined/24/ffffff/delete-sign.png" alt="Delete">
                  </button>
              </div>
          </li>`;
  }
  urlList.innerHTML = listItems;
  addEventListeners();
}

function addEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete-link-btn");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const index = parseInt(button.dataset.index);
            myLinks.splice(index, 1);
            localStorage.setItem("myLinks", JSON.stringify(myLinks));
            render(myLinks);
        });
    });

    const editButtons = document.querySelectorAll(".edit-link-btn");
    editButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const index = parseInt(button.dataset.index);
            const link = myLinks[index];
            titleInput.value = link.title;
            linkInput.value = link.url;
            isEditing = true;
            editingIndex = index;
            modal.style.display = "block";
        });
    });
}
