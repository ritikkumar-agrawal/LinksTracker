let myLinks = [];
const textBox = document.querySelector("#text-box");
const saveInputBtn = document.querySelector("#save-input-btn");
const uoList = document.querySelector("#uo-list");
const deletBtn = document.querySelector("#delete-btn");
const saveTabBtn = document.querySelector("#save-tab-btn");
const linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") );

if(linksFromLocalStorage){
  myLinks = linksFromLocalStorage ;
  render(myLinks);
}
saveTabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLinks.push(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
  })
})
deletBtn.addEventListener("dblclick", function(){
  localStorage.clear();
  myLinks = [];
  render(myLinks); 
})
saveInputBtn.addEventListener("click", function () {
  if (textBox.value != "") {
    myLinks.push(textBox.value);
  }
  // console.log(myLinks);
  textBox.value = "";
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  render(myLinks);
});
function render(linksArray) {
  let listitems = "";
  for (let i = 0; i < linksArray.length; i++) {
    // uoList.innerHTML += "<li>" + myLinks[i] + "</li>";
    listitems += `<li><a target='_blank' href='${linksArray[i]} '>${linksArray[i]}</a></li>`;
  }
  uoList.innerHTML = listitems;
  // document.getElementById("text-box").value = "";
}
