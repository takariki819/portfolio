<?php 
require("../../data/memo_data.php");
$data=new Data();
$data->memo();
new token_set();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="add.css">
    <title>add</title>
</head>
<body>
    <form>
        <p>title</p>
        <input type="text">
        <p>comment</p>
        <textarea></textarea>
        <input type="submit" value="">
    </form>

    <script src="../../data/rule.js"></script>
    <script src="add.js"></script>
</body>
</html>