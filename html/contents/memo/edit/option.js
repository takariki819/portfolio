"use strict";
ul.addEventListener("click" , e =>{
    e.target.type === "checkbox"?request(e.target,"toggle"):"";

    if(e.target.classList.contains("del")){
        if(document.querySelector(".save")){
            edit("close");
            return;
        }
        if(!confirm("本当に削除しますか?"))return;   
        request(e.target,"delete");
    }

    if(e.target.classList.contains("save")){
        edit("toggle");
        return;
    }
    
    if(e.target.classList.contains("focus_div") || e.target.classList.contains("title")){
        if(document.querySelector(".save"))return;
        target_forcus(e.target);
    }
    
    e.target.classList.contains("edit")?edit_create(e.target):"";
})

function request(target , action){
    const data=new FormData();
    data.append("id", target.parentNode.parentNode.dataset.id);
    fetch("?action="+action,{method:"POST",body:data});

    action === "delete"?target.parentNode.parentNode.remove():"";
}
//focusさせる
function target_forcus(target){
    if(target.classList.contains("title")){
        target.parentNode.parentNode.classList.toggle("focus");
        return;
    }
    target.parentNode.classList.toggle("focus");
}

let title;
let comment;
function edit_create(target){
    target.textContent="保存";
    target.classList.replace("edit","save");
    
    title=target.parentNode.parentNode.children[0].children[0];
    comment=target.parentNode.children[0]; 
    title.replaceWith((() =>{
        const input=document.createElement("input");
        input.type="text";
        input.value=title.textContent;
        return input;
    })());
    comment.replaceWith((() =>{
        const textarea=document.createElement("textarea");
        textarea.value=comment.textContent;
        return textarea;
    })());
}

function edit(action){
    const save=document.querySelector(".save");
    save.textContent="編集";
    save.classList.replace("save","edit");
    const input_title=save.parentNode.parentNode.children[0].children[0];
    const input_comment=save.parentNode.children[0];
    if(action === "close"){
        input_title.replaceWith(title);
        input_comment.replaceWith(comment);
    }
    if(action === "toggle"){
        title.textContent=input_title.value;
        comment.textContent=input_comment.value;
        input_title.replaceWith(title);
        input_comment.replaceWith(comment);
        const id=save.parentNode.parentNode.dataset.id;
        const data=new FormData();
        data.append("title",input_title.value);
        data.append("comment",input_comment.value);
        data.append("id",id);
        fetch("?action=save",{method:"POST",body:data});
    }
}

