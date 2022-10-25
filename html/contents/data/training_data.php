<?php 
require("login.php");

class Training extends Login{
    private $pdo;
    private $name;
    private $id;
    function __construct(){
        parent::__construct();
        $this->pdo=parent::getPdo();
        $this->name=$_SESSION["name"]."_t";
        $this->id=$_SESSION["id"];
    }
    public function training(){
        if($_SERVER["REQUEST_METHOD"] === "POST"){
            $action=filter_input(INPUT_GET,"action");
            switch($action){
                case "new_register":
                    $res=$this->new_register();
                    echo json_encode($res);
                    break;
                case "count_register":
                    $res=$this->count_register();
                    echo json_encode($res);
                    break;
                case "delete":
                    $res=$this->delete();
                    echo json_encode($res);
                    break;
                case "history":
                    $list=$this->history();
                    echo json_encode($list);
                    break;
                case "tr_delete":
            }
            exit;
        }
    }
    public function history(){
        $this->pdo->query("DELETE FROM training WHERE count=0");
        $max_count=$this->pdo->query("SELECT menu,MAX(count) AS count, MAX(dt) AS dt FROM training GROUP BY menu")->fetchAll(PDO::FETCH_ASSOC);

        $stmt=$this->pdo->query("SELECT menuId,menu,count,dt FROM training WHERE userId=$this->id")->fetchAll(PDO::FETCH_ASSOC);
        $menues=[];
        foreach($stmt as $val){
            if($val["count"] === null)continue;
            array_push($menues,[
                "menuId"=>$val["menuId"],
                "menu"=>$val["menu"],
                "count"=>$val["count"],
                "dt"=>$val["dt"],
            ]);
        }
        return ["menues"=>$menues , "counts"=>$max_count];
    }
    public function delete(){
        $delete_menu=filter_input(INPUT_POST,"menu");
        $stmt=$this->pdo->prepare("DELETE FROM training WHERE menu=:menu");
        $stmt->execute(array(":menu"=>$delete_menu));
    }
    public function new_register(){
        try{
            $menu=filter_input(INPUT_POST,"menu");
            $stmt=$this->pdo->prepare("INSERT INTO training(userId,menu) VALUES($this->id,:menu)");
            $stmt->bindValue("menu",$menu,\PDO::PARAM_STR);
            $stmt->execute();
        }catch(Exception $e){
            echo $e->getMessage();
            return false;
        }
        return true;
    }
    public function count_register(){
        $dt=date("Y-m-d H:i:s");
        $menues=json_decode(filter_input(INPUT_POST,"menu"));
        $counts=json_decode(filter_input(INPUT_POST,"count"));
        for($i=0; $i<=count($menues)-1; $i++){
            $stmt=$this->pdo->prepare("INSERT INTO training(userId,menu,count,dt) VALUES(:userId,:menu,:count,:dt)");
            $stmt->bindValue("userId",$this->id,\PDO::PARAM_INT);
            $stmt->bindValue("menu",$menues[$i],\PDO::PARAM_STR);
            $stmt->bindValue("count",$counts[$i],\PDO::PARAM_INT);
            $stmt->bindValue("dt","$dt",\PDO::PARAM_STR);
            $stmt->execute();
        }
    }
    public function get_training_menu(){
        $stmt=$this->pdo->query("SELECT menuId,menu FROM training WHERE userId=$this->id")->fetchAll(PDO::FETCH_ASSOC);
        if($stmt){
            $menues=[];
            foreach($stmt as $val){
                array_push($menues,$val["menu"]);
            }
            return array_unique($menues);
        }else{
            return false;
        }
    }
}
?>