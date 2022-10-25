<?php 
require("../../data/memo_data.php");
$data=new Data();
$data->memo();
new token_set();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="task.css">
    <title>task</title>
</head>
<body>
    <main>
        <ul>
            <li id="count"></li>
            <li id="title"></li>
            <li id="answere"></li>
        </ul>
    </main>
    <footer>
        <button id="answereBtn">answere</button>
        <div class="favorite"></div>
        <button id="nextBtn">next</button>
    </footer>
    <script src="../../data/rule.js"></script>
    <script src="task.js"></script>
</body>
</html>