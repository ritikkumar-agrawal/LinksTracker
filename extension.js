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
  modal.style.display = "block";
});

modalSaveBtn.addEventListener("click", function () {
  const title = titleInput.value.trim();
  const url = linkInput.value.trim();
  if (title !== "" && url !== "") {
    myLinks.push({ title, url });
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
    listItems += `
      <li>
        <div>
          <strong>${linksArray[i].title}</strong><br>
          <a target="_blank" href="${linksArray[i].url}">${linksArray[i].url}</a>
        </div>
        <button class="delete-link-btn" data-index="${i}">
          <img src="https://img.icons8.com/material-outlined/24/ff0000/delete-sign.png" alt="Delete">
        </button>
      </li>`;
  }
  urlList.innerHTML = listItems;
  addDeleteEventListeners();
}

function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-link-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(button.dataset.index);
      myLinks.splice(index, 1);
      localStorage.setItem("myLinks", JSON.stringify(myLinks));
      render(myLinks);
    });
  });
}
