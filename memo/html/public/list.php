<?php 
require("../add/data.php");
$data=new Data();
$data->edit();
$list=$data->getFavorite();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name=”viewport” content=”width=device-width,initial-scale=1″>
        <title>list</title>
        <link rel="stylesheet" href="css/list.css">
    </head>
    <body>
        <header>
            <form>
                <input type="text">
            </form>
        </header>
        <main>
            <ul>
                <?php foreach($list as $li): ?>
                    <li data-id="<?= $li["id"]; ?>">
                        <div id="title">
                            <span id="titleSpan"><?= $li["title"]; ?></span>
                            <span id="favorite">
                                <?php if($li["favorite"]): ?>
                                    ★
                                <?php else: ?>
                                    ☆
                                <?php endif; ?>
                            </span>
                            <span id="delete">✕</span>
                        </div>
                        <div id="comment"><span id="commentSpan"><?= $li["comment"]; ?></span>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ul>
        </main>
        <script src="js/list.js"></script>
        <script src="js/public.js"></script>
    </body>
</html>