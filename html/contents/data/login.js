"use strict";
window.addEventListener("load",function(){
    (async()=>{
        const res=await (await fetch("?action=log_check",{method:"POST"})).json();
        res?on_login(res):"";
    })();
})
const body=document.querySelector("body");
const main=document.querySelector("main");
const header=document.querySelector("header");
const login=document.getElementById("login");
login.addEventListener("click",dialog_check);
//headerとmainのタッチアクションを制御
const operation=function(){
    main.classList.toggle("operation_non");
    header.classList.toggle("operation_non");
}

 //dialogがすでにあった場合削除
function dialog_check(){
    //変数loginがlogoutに変わっていた場合、発火
    if(login.classList.contains("logout")){
        logout();
        return;
    }
    operation();
    dialog_create();
}

//dialogの作成
function dialog_create(){   
    const dialog=document.createElement("dialog");
    const register=document.createElement("button");
    register.textContent="register";
    register.className="login_register";
    const input=document.createElement("input");
    input.type="number";
    dialog.appendChild(register);
    dialog.appendChild(input);
    body.appendChild(dialog);
    input_count(input);  
    login_register(register);
    dialog.show();
    input.focus();  
}
//pwの入力数が3になったら送信
function input_count(input){
    let pw="";
    input.addEventListener("keydown" , e =>{
        if(e.code === "Backspace"){
            pw=pw.replace(/.$/, '');
        }
        if(Number.isInteger(parseInt(e.code.substring(5,6)))){
            pw+=e.code.substring(5,6);
            if(pw.length === 3){
                a_login(pw , input);
                pw="";
            }
        }
    })
}

//pwがあってるかのチェック
async function a_login(pw , input){
    const data=new FormData();
    data.append("pw",pw);
    const res=await (await fetch("?action=login",{method:"POST",body:data})).json();
    if(res){
        operation();
        document.querySelector("dialog").remove();
        on_login(res);
    }
    input.value="";
}
//login時にheaderとmainの色を変える
const userName=document.querySelector(".userName");
const login_info=function(user){
    userName.textContent=user.name;
    //userName.id=user.id;
    main.classList.toggle("login_on");
    header.classList.toggle("login_on");
    login.classList.toggle("logout");
}
function on_login(user){
    login_info(user);
    login.textContent="logout";  
}

async function logout(){
    fetch("?action=logout",{method:"POST"});
    const user={
        name:"USER",
        id:""
    }
    login_info(user);
    login.textContent="login";
}

//headerにあるmenuの制御
const button=document.querySelector("#header_menu");
button.addEventListener("click",open_menu);

function open_menu(){
    this.classList.toggle("open_menu");
    const ul=document.querySelector("ul");
    ul.classList.toggle("open_ul");
}

//login_register制御
function login_register(register){
    register.onclick=function(){
        window.location.href="register/register.php";
    }
}