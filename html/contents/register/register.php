<?php 
require("../data/register_data.php");
$register=new Register();
$register->rg();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/register.css">
    <title>register</title>
</head>
<body>
    <main>
        <h2>登録フォーム</h2>
        <form method="post">
            <p>name</p>
            <input type="text" required placeholder="usernameの入力">
            <p>pssword</p>
            <input type="password" minlength="3" maxlength="3" required placeholder="3桁の数字を入力">
            <input type="submit" value="登録">
        </form>
    </main>
    <script src="js/register.js"></script>
</body>
</html>