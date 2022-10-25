"use strict";
let list=[];

const main=document.querySelector("main");
const footer=document.querySelector("footer");
function dis_none(){
    main.classList.toggle("disNone");
    footer.classList.toggle("disNone");
}
//3,2,1
(async () =>{
    dis_none();
    list=await (await fetch("?action=get_task",{method:"POST"})).json();
    let count=3;
    const dialog=document.createElement("dialog");
    document.querySelector("body").appendChild(dialog);
    const setTime=function(){
        if(count===0){
            clearInterval(time);
            main.classList.remove("disNone");
            footer.classList.remove("disNone");
            dialog.remove();
            create_task();
            return;
        }
        dialog.textContent=count;
        dialog.show();
        count--;
    }
    const time=setInterval(setTime,500);
})();

const count=document.querySelector("#count");
const title=document.querySelector("#title");
const answere=document.querySelector("#answere");
const answereBtn=document.querySelector("#answereBtn");
const nextBtn=document.querySelector("#nextBtn");
const favorite=document.querySelector(".favorite");
let i=0;
async function create_task(){
    if(i === list.length){
        alert("end");
        window.location.reload();
        return;
    }
    count.textContent=i+1+"/"+list.length;
    title.textContent=list[i].title;
    favorite.textContent=list[i].favorite==="1"?"★":"☆";
    favorite.dataset.id=list[i].id;
}

//answereBtn
answereBtn.addEventListener("click",answere_create);
let answer_b=true;
function answere_create(){
    if(answer_b){
        answere.textContent=list[i].comment;
        main.classList.add("answere_open");
        answer_b=false;
    }
}
//nextBtn
nextBtn.addEventListener("click",next_create);
function next_create(){
    i++;
    main.classList.remove("answere_open");
    answer_b=true;
    create_task();
}

favorite.addEventListener("click",is_done);
function is_done(){
    const data=new FormData();
    data.append("id",favorite.dataset.id);
    fetch("?action=toggle",{method:"POST",body:data});
    if(this.textContent === "☆"){
        this.textContent="★";
    }else{
        this.textContent="☆";
    }
}
