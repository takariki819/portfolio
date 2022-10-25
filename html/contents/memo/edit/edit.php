<?php 
require("../../data/memo_data.php");
$data=new Data();
$data->memo();
new token_set();
$list=$data->get_favorite_data();
$label_count=1;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="edit.css">
    <title>edit</title>
</head>
<body>
    <header>
        <form>
            <input type="text">
            <input type="submit" value="" style="display:none">
        </form>
    </header>
    <main>
        <ul>
            <?php foreach($list as $data): ?>
                <li data-id=<?= $data["id"]; ?>>
                    <div class="focus_div">
                        <span class="title"><?= $data["title"]; ?></span>
                        <input 
                        type="checkbox" id=<?="check".$label_count;?>  checked>
                        <label for=<?="check".$label_count;?>>
                        </label>
                        <span class="del">x</span>
                    </div>
                    <div class="disNone">
                        <span class="comment"><?= $data["comment"]; ?></span>
                        <span class="edit">編集</span>
                    </div>
                </li>
                <?php $label_count++; ?>
            <?php endforeach; ?>
        </ul>
    </main>
    <script src="search.js"></script>
    <script src="option.js"></script>
</body>
</html>