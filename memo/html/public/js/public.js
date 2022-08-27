"use strict;"
const body=document.querySelector("body");
const loadBar=document.createElement("div");
Object.assign(loadBar.style,{
    width:"100%",
    height:"12px",
    background:"red",
    paddingBottom:"12px",
    marginBottom:"10px",
    borderRadius:"12px",
    opacity:"0.5"
});
body.insertBefore(loadBar,body.firstChild);
loadBar.addEventListener("click",function(){
    location.reload();
})

function f(action , f){
    fetch("?action="+action,{
        method:"POST",
        body:f
    })
    .then(response => {
        return response.json();
    })
    .then(b => {
        if(!b){
            alert("正しく動作しませんでした"+b);
        }
    })
}
