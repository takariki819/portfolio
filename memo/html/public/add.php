<?php 
require("../add/data.php");
$data=new Data();
$data->edit();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name=”viewport” content=”width=device-width,initial-scale=1″>
        <title>add</title>
        <style>
            main{
                margin:8% auto;
                width:95%;
            }
            form{
                padding:22px;
                background-color:#959292;
                display:flex;
                flex-wrap:wrap;
                border-radius:26px;
            }
            form *{
                margin:auto;
            }
            div{
                width:90%;
                font-size:20px;
                padding-bottom:8px;
            } 
            input , textarea{
                width:90%;
                font-size:18px;
                border-radius:18px;
                resize:none;
            }
            input[type="text"]{
                margin-bottom:16px;
            }
            textarea{
                height:166px;
            }
            input[type="submit"]{
                margin-top:12px;
                background-color:#706e6e;
                height:32px;
                border:none;
            }
        </style>
    </head>
    <body>
        <main>
            <form>
                <div>question</div>
                <input type="text" name="title">
                <div>answere</div>
                <textarea></textarea>
                <input type="submit" value="">
            </form>
        </main>
        <script>
            const send=document.querySelector("input[type='submit']");
            send.addEventListener("click", e => {
                e.preventDefault();
                const title=document.querySelector("input[type='text']");
                const comment=document.querySelector("textarea");
                if(title.value === "" || comment.value === ""){
                    alert("入力漏れ");
                    return;
                }
                const data=new FormData();
                data.append("title",title.value);
                data.append("comment",comment.value);
                f("add",data);
                title.value="";
                comment.value="";
            })
        </script>
        <script src="js/public.js"></script>
    </body>
</html>