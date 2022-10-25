"use strict";
//menu-barのクリック判定
const button=document.querySelector("button");
button.addEventListener("click", menuOpen);
function menuOpen(){
    console.log(this.parentNode);
    this.parentNode.classList.toggle("menu-open");
}
//天気APIの取得と表示
let date=new Date();
const day=(()=>{
    let month=(date.getMonth()+1).toString().padStart(2,"0");
    let day=date.getDate().toString().padStart(2,"0");
    date=date.getFullYear()+"-"+month+"-"+day;
    return date;
})();

const url="https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,showers_sum&timezone=Asia%2FTokyo&start_date="+day+"&end_date="+day;

(async() =>{
    const res=await (await fetch(url)).json();
    let today=date.replace(date.substring(4,5),"年").replace(date.substring(7,8),"月")+"日";
    const max_temp=res.daily.temperature_2m_max+"℃";
    const min_temp=res.daily.temperature_2m_min+"℃";
    const data=document.createElement("span");
    data.textContent=today+"  "+"最高気温:"+max_temp+"  "+"最低気温:"+min_temp;
    document.querySelector("#info").appendChild(data);
})();

//オブザーバーで監視
const items=[...document.querySelectorAll(".fild")];
const footer=document.querySelector("footer");
let options={
    rootMargin:"0px",//margin分判定の範囲を広げる
    threshold:0.8, //1だとすべての要素が見えてから関数が呼ばれる
};

let setItem=(entries) =>{
    entries.forEach(entrie =>{
        if(entrie.isIntersecting){
            console.log("kkk")
            if(entrie.target.tagName === "FOOTER"){
                entrie.target.classList.add("footer_open");
            }
            entrie.target.parentNode.classList.add("open_fild");
        }else{
            if(entrie.target.tagName === "FOOTER"){
                entrie.target.classList.remove("footer_open");
            }
            entrie.target.parentNode.classList.remove("open_fild");
        }
    })
}
const ofserver=new IntersectionObserver(setItem,options);

items.map((item , index) =>{
    item.children[0].style.backgroundImage=`url('img/ovalo${index+1}.png')`;
    ofserver.observe(item);
})
ofserver.observe(footer);