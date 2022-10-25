"use strict";
const body=document.querySelector("body");
const form=document.querySelector("form");

form.addEventListener("submit", register_conf,this);

function register_conf(target){
    target.preventDefault();
    const name=document.querySelector("input[type='text']");
    const password=document.querySelector("input[type='password']");
    if(!confirm(name.value+"で登録します")){
        return;
    }
    register(name,password);
}
async function register(name,password){
    const data=new FormData();
    data.append("name",name.value);
    data.append("password",password.value);

    const res=await (await (fetch("?",{method:"POST",body:data}))).json();
    if(res){
        create_top_return();
    }else{
        name.value="";
        password.value="";
        alert("パスワードまたは名前がすでに登録されています。");
        name.focus();
    }
}

function create_top_return(){
    document.querySelector("main").classList.add("none");
    let count=3;
    const dialog=document.createElement("dialog");
    const count_action=(() =>{
        body.appendChild(dialog);
        dialog.show();
        dialog.innerHTML="<span>"+count+"</span>"+"秒後に移動します。<br>しばらくお待ちください。";
        if(count === 0){
            clearInterval(setTime);
            window.location.href="../index.php";
        }
        count--;
    });
    const setTime=setInterval(count_action,1000);
}