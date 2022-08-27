<?php 
class PdoData{
    private $db= "mysql:dbname=test;host=03dab4b09e17";
    private $user="test";
    private $pw="test";
    function __construct(){
        return new PDO($this->db,$this->user,$this->pw);
    }
}

class Data extends PdoData {
    private $pdo;
    function __construct(){
        $this->pdo = parent::__construct();
    }
    public function edit(){
        if($_SERVER['REQUEST_METHOD'] === "POST"){
            $action=filter_input(INPUT_GET,"action");
            switch($action){
                case "add":
                    $b=$this->add();
                    echo json_encode($b);
                    break;
                case "delete":
                    $b=$this->delete();
                    echo json_encode($b);
                    break;
                case "favorite":
                    $b=$this->favorite();
                    echo json_encode($b);
                    break;
                case "update":
                    $b=$this->update();
                    echo json_encode($b);
                    break;
                case "search":
                    $result=$this->search();
                    echo json_encode($result);
                    break;
            }
            exit;
        }
    }
    public function search(){
        $word=filter_input(INPUT_POST,"word");
        try{
            $stmt=$this->pdo->prepare("SELECT * FROM memo WHERE title LIKE :word OR comment LIKE :word");
            $stmt->bindValue("word","%$word%",\PDO::PARAM_STR);
            $stmt->execute();
        }catch(Exception $e){
            return $e->getMessage();
        }
        return $stmt->fetchAll();
    }
    public function update(){
        $title=filter_input(INPUT_POST,"title");
        $comment=filter_input(INPUT_POST,"comment");
        $id=filter_input(INPUT_POST,"id");
        try{
            $stmt=$this->pdo->prepare("UPDATE memo SET title=:title , comment=:comment WHERE id=$id");
            $stmt->bindValue("title",$title,\PDO::PARAM_STR);
            $stmt->bindValue("comment",$comment,\PDO::PARAM_STR);
            $stmt->execute();
        }catch(Exception $e){
            return $e->getMessage();
        }
        return true;
    }
    public function favorite(){
        try{
            $id=filter_input(INPUT_POST,"id");
            $this->pdo->query("UPDATE memo SET favorite=NOT favorite WHERE id=$id");
        }catch(Exception $e){
            return $e->getMessage();
        }
        return true;
    }
    public function delete(){
        try{
            $id=filter_input(INPUT_POST,"id");
            $this->pdo->query("DELETE FROM memo WHERE id=$id");
        }catch(Exception $e){
            return $e->getMessage();
        }
        return "delete";
    }
    public function add(){
        $title=filter_input(INPUT_POST,"title");
        $comment=filter_input(INPUT_POST,"comment");
        try{
            $stmt=$this->pdo->prepare("INSERT INTO memo(title,comment) 
            VALUES(:title,:comment)");
            $stmt->bindValue("title",$title);
            $stmt->bindValue("comment",$comment);
            $stmt->execute();
        }catch(Exception $e){
            return $e->getMessage();
        }
        return true;
    }
    public function getFavorite(){
        $stmt=$this->pdo->query("SELECT * FROM memo where favorite=1");
        return $stmt->fetchAll();
    }
    public function getEditData(){
        $id=filter_input(INPUT_GET,"id");
        $stmt=$this->pdo->query("SELECT * FROM memo WHERE id=$id");
        return $stmt->fetch();
    }
}
?>