let myLinks = [];
const textBox = document.querySelector("#text-box");
const saveInputBtn = document.querySelector("#save-input-btn");
const uoList = document.querySelector("#uo-list");

saveInputBtn.addEventListener("click", function () {
  if (textBox.value != "") {
    myLinks.push(textBox.value);
  }
  // console.log(myLinks);
  textBox.value = "";
  renderlinks();
});

function renderlinks() {
  let listitems = "";
  for (let i = 0; i < myLinks.length; i++) {
    // uoList.innerHTML += "<li>" + myLinks[i] + "</li>";
    listitems += `<li><a target='_blank' href='${myLinks[i]} '>${myLinks[i]}</a></li>`;
  }
  uoList.innerHTML = listitems;
  // document.getElementById("text-box").value = "";
}
