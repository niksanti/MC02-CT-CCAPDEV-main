function testing(){
    alert("test");
}
var modal = document.getElementById("myModal");

function showmodal(){
    modal.style.display = "block";
}   

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }