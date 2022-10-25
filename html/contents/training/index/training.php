<?php 
require("../../data/training_data.php");
$tr=new Training();
$tr->training();
new token_set();
$training_menu=$tr->get_training_menu();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../index.css">
    <title>training</title>
</head>
<body>
    <header>
        <div><img src="../../img/goku2.png"></div>
        <div id="new_menu">
            追加
            <form class="menu_register_form">
                <input type="text" required>
                <input type="submit" value="登録">
            </form>
        </div>
        <div id="history">履歴</div>
    </header>
    <main>
        <ul class="menu_ul">
            <?php if($training_menu): ?>
                <?php foreach($training_menu as $training): ?>
                    <li>
                        <span class="menu"><?=$training;?></span>
                        <input type="number">
                    </li>
                <?php endforeach; ?>
            <?php endif; ?>
            <button id="count_register">register</button>
        </ul>
        <ul class="history_ul disnone"></ul>
    </main>
    <script src="../index.js"></script>
</body>
</html>