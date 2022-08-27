<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name=”viewport” content=”width=device-width,initial-scale=1″>
        <title>main</title>
        <style>
            main{
                margin:20% auto;
                width:95%;
            }
            ul{
                list-style: none;
                margin:auto;
                padding:0;
            }
            li{
                width:90%;
                text-align: center;
                font-size:24px;
                font-weight: bold;
                border:3px solid rgb(171, 247, 247);
                background-color: rgb(171, 247, 247);
                padding:24px;
                border-radius: 36px;
                margin-top:62px;
                opacity: 0.7;
            }
            li:hover{
                opacity: 1;
            }
        </style>
    </head>
    <body>
        <main>
            <ul>
                <li id="task">task</li>
                <li id="add">add</li>
                <li id="list">edit</li>
            </ul>
        </main>
        <script>
            const main=document.querySelector("main");
            main.addEventListener("click", e => {
                const target=e.target.id;
                switch(target){
                    case "add":
                        window.location.href="public/add.php";
                        break;
                    case "task":
                        window.location.href="public/task.php";
                        break;
                    case "list":
                        window.location.href="public/list.php";
                        break;
                }
            })
        </script>
    </body>
</html>