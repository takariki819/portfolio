"use strict";
window.addEventListener("load",function(){
    document.querySelector("input[type='text']").focus();
})
const form=document.querySelector("form");
form.addEventListener("submit", submit_add ,this);

function submit_add(e){
    e.preventDefault();
    const input=document.querySelector("input[type='text']");
    const textarea=document.querySelector("textarea");

    if(input.value === "" || textarea.value === ""){
        alert("入力漏れ");
        input.focus();
        return;
    }

    const data=new FormData();
    data.append("title", input.value);
    data.append("comment",textarea.value);
    fetch("?action=add",{method:"POST",body:data});
    input.value="";
    textarea.value="";
    input.focus();
}