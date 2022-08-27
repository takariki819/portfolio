<?php 
require("../add/data.php");
$data=new Data();
$data->edit();
$list=$data->getEditData();
?>
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">
        <meta name=”viewport” content=”width=device-width,initial-scale=1″>
        <title>edit</title>
        <link rel="stylesheet" href="css/edit.css">
    </head>
    <body>
        <ul data-id=<?= $list["id"]; ?>>
            <li>
                <span id="title"><?= $list["title"]; ?></span>
                <span id="edit">編集</span>
                <span id="save" class="btnNone">S</span>
                <span id="cansel" class="btnNone">X</span>
            </li>
            <li id="comment"><?= $list["comment"]; ?></li>
        </ul>
        <script src="js/edit.js"></script>
        <script src="js/public.js"></script>
    </body>
</html>