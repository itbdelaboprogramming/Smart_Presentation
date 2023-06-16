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
        $sql = "SELECT DISTINCT model.id, model.model_name, model.image_preview, model_detail.category FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name ORDER BY model_name;";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }
            return $product2;
        }
    }

    function getModelName($category){
        $conn = connect();
        $sql = "SELECT DISTINCT model.id, model.model_name, model.image_preview, model_detail.category FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name WHERE category = '$category' ORDER BY model_name;";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }
            return $product2;
        }
    }

    function getDescription($modelname){
        $conn = connect();
        $sql = "SELECT model.model_number, model_detail.model_name, model_detail.description, model_detail.specification, model_detail.specification_img, model_detail.link_to_web, model.file FROM model_detail INNER JOIN model ON model_detail.model_name = model.model_name WHERE model_detail.model_name = '$modelname';";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }

            return $product2;
        }
    }


    function getFileById($id){
        $conn = connect();
        $sql = "SELECT model.id, model.file FROM model WHERE id = '$id';";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }

            return $product2;
        }
    }

    function getAllDistinctModelName(){
        $conn = connect();
        $sql = "SELECT DISTINCT model.model_name, model.image_preview, model_detail.category FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name ORDER BY model_name;";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }
            return $product2;
        }
    }
    function getDistinctModelName($category){
        $conn = connect();
        $sql = "SELECT DISTINCT model.model_name, model.image_preview, model_detail.category FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name  WHERE model_detail.category = '$category' ORDER BY model_name;";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }
            return $product2;
        }
    }

    function getModelNumber($model_name){
        $conn = connect();
        $sql = "SELECT DISTINCT model.id, model.model_number, model.model_name, model.image_preview FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name  WHERE model_detail.model_name = '$model_name';";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){
                $product2[] = $row;
            }
            return $product2;
        }
    }

    function getAllData($amount, $category, $order_by, $order_type){
        $conn = connect();
        if($category == "All"){
            $sql = "SELECT model_detail.model_name, model_detail.category, model.id, model.model_number, model.date_modified, model.file_type, model.size, model.file FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name ORDER BY $order_by $order_type LIMIT $amount;";
        }else{
            $sql = "SELECT model_detail.model_name, model_detail.category, model.id, model.model_number, model.date_modified, model.file_type, model.size, model.file FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name WHERE model_detail.category = '$category' ORDER BY $order_by $order_type LIMIT $amount;";

        }
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