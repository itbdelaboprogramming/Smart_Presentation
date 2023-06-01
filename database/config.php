<?php

    function connect(){
        $dbservername = 'localhost';
        $dbusername = 'root';
        $dbpassword = '';
        $dbname = 'smart_presentation';
    
        $conn = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
            
        }else{
            return $conn;
        }
        // echo "Connected successfully";
    }

    function getAllCategory(){
        $conn = connect();
        $sql = "SELECT DISTINCT category FROM model_detail;";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            return $result;
        }
    }


    function getAllModelName(){
        $conn = connect();
        $sql = "SELECT DISTINCT model.id, model.model_name, model.image_preview, model_detail.category, model_detail.description FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name ORDER BY model_name;";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }
            return $product2;
        }
    }

    function getModelName($modelname){
        $conn = connect();
        $sql = "SELECT DISTINCT model.id, model.model_name, model.image_preview, model_detail.category, model_detail.description FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name WHERE category = '$modelname' ORDER BY model_name;";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }
            return $product2;
        }
    }
?>