<?php 
require("login.php");

class Register extends Login{
    private $pdo;
    function __construct(){
        parent::__construct();
        $this->pdo=parent::getPdo();
    }

    public function rg(){
        if($_SERVER["REQUEST_METHOD"] === "POST"){
            $b=$this->register();
            echo json_encode($b);
            exit;
        }
    }

    function register(){
        $name=filter_input(INPUT_POST,"name");
        $pw=filter_input(INPUT_POST,"password");
        try{
            $stmt=$this->pdo->prepare("SELECT * FROM login WHERE name=:name");
            $stmt->bindValue("name",$name,\PDO::PARAM_STR);
            $stmt->execute();
            $pw_check=$this->pdo->query("SELECT * FROM login WHERE pw=$pw");
            if(!empty($stmt->fetch()) || !empty($pw_check->fetch())){
                return false;
            }
            $stmt=$this->pdo->prepare("INSERT INTO login(name,pw) VALUES(:name , :pw)");
            $stmt->bindValue("name",$name,\PDO::PARAM_STR);
            $stmt->bindValue("pw",$pw,\PDO::PARAM_INT);
            $stmt->execute();
        }catch(Exception $e){
            return $e->getMessage();
        }
        $b=parent::log_check();
        if(!$b){
            $id=$this->pdo->lastInsertId();
            $stmt=$this->pdo->query("SELECT * FROM login WHERE id=$id");
            $user=$stmt->fetch();
            $id=$user["id"];
            $name=$user["name"];
            parent::token_create($id,$name);
        }
        return true;
    }
}
?>