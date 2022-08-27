"use strict;"
const ul=document.querySelector("ul");
document.querySelector("form").addEventListener("submit" , e =>{
    const data=new FormData();
    e.preventDefault();
    const word=document.querySelector("input[type='text']").value;
    data.append("word",word);
    fetch("?action=search",{
        method:"POST",
        body:data
    })
    .then(response =>{
        return response.json();
    })
    .then(list =>{
        list.forEach(li =>{
            const liTag=document.createElement("li");
            liTag.dataset.id=li.id;

            const title=document.createElement("div");
            title.id="title";
            const titleSpan=document.createElement("span");
            titleSpan.id="titleSpan";
            titleSpan.textContent=li.title;
            const favorite=document.createElement("span");
            favorite.id="favorite";
            favorite.textContent=fd();
            function fd(){
                if(li.favorite === true){
                    return "★";
                }else{
                    return "☆";
                }
            };
            const del=document.createElement("span");
            del.id="delete";
            del.textContent="✕";
            title.append(titleSpan);
            title.append(favorite);
            title.append(del);

            const comment=document.createElement("div");
            comment.id="comment";
            const commentSpan=document.createElement("span");
            commentSpan.id="commentSpan";
            commentSpan.textContent=li.comment;
            comment.appendChild(commentSpan);

            liTag.appendChild(title);
            liTag.appendChild(comment);
            ul.insertBefore(liTag,ul.firstChild);
        })

    })
})

ul.addEventListener("click", e => {
    const data=new FormData();
    const target=e.target.parentNode.parentNode;
    if(e.target.id === "title"){
        const comment=e.target.parentNode.children[1];
        if(comment.style.display === "none"){
            if(comment.childElementCount === 1)edit(comment);
            comment.style.display="block";
        }else{
            comment.style.display="none";
        }
    }
    if(e.target.id === "delete"){
        if(!confirm("削除しますか？"))return;
        data.append("id",target.dataset.id);
        f("delete",data);
        //戻り値をもらってtrueであれば削除の処理をしたいけどできない
        target.remove();
    }
    if(e.target.id === "favorite"){
        data.append("id",target.dataset.id);
        f("favorite",data);
        if(e.target.textContent.trim() === "★"){
            e.target.textContent="☆";
        }else{
            e.target.textContent="★";
        }
    }
})
function edit(comment){
    const editBtn=document.createElement("span");
    editBtn.textContent="編集";
    editBtn.id="editBtn";
    comment.appendChild(editBtn);
    editBtn.addEventListener("click" , e => {
        window.location.href="edit.php?id="+comment.parentNode.dataset.id;
    })
}
