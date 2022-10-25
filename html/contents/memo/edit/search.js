"use strict";
const body=document.querySelector("body");
const form=document.querySelector("form");
const ul=document.querySelector("ul");

form.addEventListener("submit", search_data , this);

async function search_data(form){
    form.preventDefault();
    const input=document.querySelector("input[type='text']");
    if(!input.value){
        input.focus();
        return;
    }
    const data=new FormData();
    data.append("key",input.value);
    const res=await (await fetch("?action=edit",{method:"POST",body:data})).json();

    if(res.length){
        identical(res);
    }else{
        const dialog=document.createElement("dialog");
        dialog.textContent="検索結果がありません。";
        body.appendChild(dialog);
        dialog.show();

        setTimeout(() =>{
            dialog.remove();
        },1000);
    }
    input.value="";
    input.focus();
}

function identical(list){
    const res_list=list;
    const li_list=document.querySelectorAll("li");
    li_list.forEach(li =>{
        list.forEach(res =>{
            if(li.dataset.id === res.id){
                ul.insertBefore(li,ul.firstChild);
                res_list.indexOf(res);
                const index=res_list.indexOf(res);
                res_list.splice(index,1);
            }
        })
    })
    create_li(res_list);
}


function create_li(res){
    let count=li_count();
    res.forEach( v =>{
        const li=document.createElement("li");
        li.dataset.id=v.id;
        li.classList.add("search_color");
        
        const title_div=document.createElement("div");
        title_div.classList.add("focus_div");

        const title_span=document.createElement("span");
        title_span.textContent=v.title;
        title_span.classList.add("title");

        const input=document.createElement("input");
        input.id="check"+count;
        input.type="checkbox";
        input.checked=(()=>{
            if(v.favorite === 1){
                return true;
            }else{
                return false;
            }
        })();
        const label=document.createElement("label");
        label.htmlFor="check"+count;

        const del=document.createElement("span");
        del.classList.add("del");
        del.textContent="x";

        title_div.appendChild(title_span);
        title_div.appendChild(input);
        title_div.appendChild(label);
        title_div.appendChild(del);
        
        const comment_div=document.createElement("div");
        comment_div.classList.add("disNone");

        const comment_span=document.createElement("span");
        comment_span.textContent=v.comment;
        comment_span.classList.add("comment");

        const edit_span=document.createElement("span");
        edit_span.textContent="編集";
        edit_span.classList.add("edit");

        comment_div.appendChild(comment_span);
        comment_div.appendChild(edit_span);

        li.appendChild(title_div);
        li.appendChild(comment_div);
        ul.insertBefore(li,ul.firstChild);
        count++;
    })

}

function li_count(){
    const li=document.querySelectorAll("li");
    return parseInt(li.length+1);
}

