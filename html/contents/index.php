<?php 
require("data/login.php");
$login=new Login();
$login->log();
?>
<!DOCTYPE html>
<html lang="js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">
    <title>contents</title>
</head>
<body>
    <header>
        <button id="header_menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul>
            <li id="yesterday_training_data">昨日の記録</li>
            <li id="killing_time">
                <a href="memo/public/quiz.php">暇つぶし</a>
            </li>
            <li id="task">
                <a href="memo/task/task.php">タスク</a>
            </li>
        </ul>
        <span class="userName">USER</span>
        <span id="login">login</span>
    </header>
    <main>
        <section>
            <a href="training/index/training.php"><div>training</div></a>
            <div class="img"></div>
        </section>
        <section>
            <ul>
                <li>MEMO</li>
                <li id="add"><a href="memo/add/add.php">add</a></li>
                <li id="edit"><a href="memo/edit/edit.php">edit</a></li>
            </ul>
            <a href="../index.html"><span>TopPage</span></a>
        </section>
    </main>
    <script src="data/login.js"></script>
</body>
</html>