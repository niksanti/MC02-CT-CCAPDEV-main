function expand_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

function editButton(){
    document.getElementById("post1").setAttribute("contenteditable", "true"); 
    document.getElementById("savebutton1").setAttribute("class", "buttonshow btn btn-warning"); 
    //EDIT FUNC DB
}

function saveEdit(){
    
    document.getElementById("post1").setAttribute("contenteditable", "false"); 
    document.getElementById("savebutton1").setAttribute("class", "buttonhide btn btn-warning"); 

    // SAVE FUNC DB
}