<?php 
date_default_timezone_set('Asia/Tokyo');
session_start();
//なぜかhtmlの外に置いたら読み込まないpassword
require_once("password/pw.php");
class Login{
    private $pdo;
    function __construct(){
        $this->pdo=new PDO($_SESSION["db"],$_SESSION["user"],$_SESSION["pw"]);
    }
    public function log(){
        if($_SERVER["REQUEST_METHOD"] === "POST"){
            $action=filter_input(INPUT_GET,"action");
            switch($action){
                case "login":
                    $user=$this->login();
                    echo json_encode($user);
                    break;
                case "logout":
                    $this->logout();
                    break;
                case "log_check":
                    $user=$this->log_check();
                    echo json_encode($user);
                    break;
            }  
            exit;
        }
    }
    public function log_check(){
        if(isset($_SESSION["token"]) && isset($_SESSION["name"]) && isset($_SESSION["id"])){
            return ["name" => $_SESSION["name"] , "id" => $_SESSION["id"]];
        }else{
            return false;
        }
    }
    public function login(){
        $pw=filter_input(INPUT_POST,"pw");
        $stmt=$this->pdo->query("SELECT * FROM login WHERE pw=$pw");
        $user_info=$stmt->fetch();
            if(!empty($user_info)){
                $this->token_create($user_info["id"],$user_info["name"]);
                return $user_info;
            }else{
                return false;
            }
    }
    public function token_create($id,$name){
        $_SESSION["token"]=rand();
        $_SESSION["id"]=$id;
        $_SESSION["name"]=$name;
    }
    public function logout(){
        unset($_SESSION["token"]);
        unset($_SESSION["id"]);
        unset($_SESSION["name"]);
    }
    public function getPdo(){
        return $this->pdo;
    }
}

class token_set{
    function __construct(){
        if(!isset($_SESSION["token"])){
            echo "<a href=../../index.php>
            <font size='45px'>loginしてください</font>
            </a>";
            exit;
        }
    }
}
?>