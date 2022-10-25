"use strict";
const body=document.querySelector("body");
const menu_ul=document.querySelector(".menu_ul");
const history_ul=document.querySelector(".history_ul");
const main=document.querySelector("main");
const header=document.querySelector("header");
const count_register_btn=document.querySelector("#count_register");
header.addEventListener("click", e =>{
    switch(e.target.id){
        case "new_menu":
            register_form_create();
            break;
        case "history":
            history_page(e.target);
            break;
        case "return":
            menu_page(e.target);
    }
})
//履歴を見る
async function history_page(target){
    target.id="return";
    target.textContent="戻る";
    page_switching();
    const datas=await (await fetch("?action=history",{method:"POST"})).json();
    top_count_create(datas.counts);
    menues_create(datas.menues);
}
//履歴をメニューごとに表示
function menues_create(datas){
    const menues=(()=>{
        const lis=[...document.querySelectorAll(".menu")];
        const list=lis.map(li => li.textContent);
        return list;
    })();
    const history_ul=document.querySelector(".history_ul");
    menues.forEach( menu => {
        const li=document.createElement("li");
        li.classList.add("history_li");
        const span=document.createElement("span");
        span.textContent=menu;
        li.appendChild(span);
        datas.forEach(data => {
            if(data.menu === menu){
                const div=document.createElement("div");
                div.dataset.id=data.menuId;
                div.innerHTML=`
                    <span class='count'>回数:${data.count}</span>
                    <span>日付:${data.dt.substr(5,11)}</span>
                `;
                li.appendChild(div);
            }
        })
        history_ul.appendChild(li);
    })
    const history_li=[...document.querySelectorAll(".history_li")];
    history_li.forEach(li =>{
        if(li.childElementCount === 1){
            const img=document.createElement("img");
            const i=Math.floor(Math.random() * 3);
            img.src=`../../img/d${i}.png`;
            li.appendChild(img);
        }
    })
}
//各メニューのトップスコアを記載
function top_count_create(counts){
    const li=document.createElement("li");
    li.classList.add("top_count_li");
    for(let count of counts){
        const fild=document.createElement("div");
        fild.innerHTML=`
            <span>${count.menu}</span>
            <span>${count.dt===null?"-":count.dt.substr(5,6)}</span>
            <span>${count.count===null?'0':count.count}</span>
        `;
        li.appendChild(fild);
    }
    history_ul.insertBefore(li,history_ul.firstChild);
}
//メニューのページに戻る
function menu_page(target){
    target.id="history";
    target.textContent="履歴";
    page_switching();
    while(history_ul.hasChildNodes()){
        history_ul.children[0].remove();
    }
}
function page_switching(){
    menu_ul.classList.toggle("disnone");
    history_ul.classList.toggle("disnone");
}
//メニューの登録
function register_form_create(){
    if(!history_ul.classList.contains("disnone")){
        alert("前のページに戻ってから追加してください");
        return;
    }
    const form=document.querySelector(".menu_register_form");
    form.classList.toggle("on_form");
    form.addEventListener("submit",register,this);
}

async function register(target){
    target.preventDefault();
    const input=document.querySelector(".menu_register_form input[type='text']");
    if([...document.querySelectorAll("li")].length >= 5){
        alert("menuが多すぎます");
        register_form_create();
        input.value="";
        return;
    }
    const data=new FormData();
    data.append("menu",input.value);
    const res=await (await fetch("?action=new_register",{method:"POST",body:data})).json();
    res?register_form_create():"";
    ul_create_menu(input.value);
    input.value="";
}
function ul_create_menu(val){
    const li=document.createElement("li");
    li.innerHTML=`
        <span class='menu'>${val}</span>
        <input type='number'>
    `;
    menu_ul.insertBefore(li,menu_ul.firstChild);
    dialog_create("登録完了");
}

//回数の登録
count_register_btn.addEventListener("click", count_register);
async function count_register(){
    const counts=[...document.querySelectorAll("input[type='number']")];
    const menues=[...document.querySelectorAll("li")];
    const multiple_data={menu:[],count:[]};

    for(let i=0; i<=counts.length-1; i++){
        multiple_data.menu.push(menues[i].textContent.trim());
        multiple_data.count.push(counts[i].value);
        counts[i].value="";
    }
    const data=new FormData();
    data.append("menu",JSON.stringify(multiple_data.menu));
    data.append("count",JSON.stringify(multiple_data.count));
    const res=await (await fetch("?action=count_register",{method:"POST",body:data})).json();
    dialog_create("登録完了");
}

function dialog_create(text){
    const dialog=document.createElement("dialog");
    dialog.textContent=text;
    dialog.classList.add("dialog");
    dialog.show();
    body.appendChild(dialog);
    setTimeout(function(){
        dialog.remove();
    },1000);
}
//menuの削除
menu_ul.addEventListener("click" , e =>{
    if(e.target.tagName === "SPAN"){
        if(!confirm("メニューを削除しますか?"))return;
        const delete_menu=e.target.textContent;
        fetch("?action=delete",{
            method:"POST",
            body:new URLSearchParams({
                "menu":delete_menu
            })      
        })
        e.target.parentNode.remove();
        dialog_create("削除完了");
    }
})