"use strict;"
const ul=document.querySelector("ul");
const title=document.getElementById("title");
const comment=document.getElementById("comment");
const save=document.getElementById("save");
const cansel=document.getElementById("cansel");

const editTitle=document.createElement("input");
editTitle.type="text";
const editComment=document.createElement("textarea");

ul.addEventListener("click", e => {
    if(e.target.id === "edit"){
        editTitle.value=title.textContent;
        editComment.value=comment.textContent;
        
        e.target.classList.add("btnNone");
        save.classList.remove("btnNone");
        cansel.classList.remove("btnNone");

        title.replaceWith(editTitle);
        comment.replaceWith(editComment);
    }
    if(e.target.id === "save"){
        if(!confirm("変更しますか?"))return;
        const data=new FormData();
        data.append("title",editTitle.value)
        data.append("comment",editComment.value);
        data.append("id",ul.dataset.id);
        f("update",data);
        reset(true);
    }
    if(e.target.id === "cansel"){
        reset(false);
    }
})
function reset(b){
    document.getElementById("edit").classList.remove("btnNone");
    save.classList.add("btnNone");
    cansel.classList.add("btnNone");
    if(b){
        title.textContent=editTitle.value;
        comment.textContent=editComment.value;
    }
    editTitle.replaceWith(title);
    editComment.replaceWith(comment);
}