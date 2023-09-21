<?php

    function connect(){
        // $dbservername = '10.243.158.97';
        // $dbusername = 'admin';
        // $dbpassword = 'admin';
        // $dbname = 'smart_presentation';
        $dbservername = 'localhost';
        $dbusername = 'root';
        $dbpassword = '';
        $dbname = 'smart_presentation';
    
        $conn = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
            // echo "Connected successfully";
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
        $sql = "SELECT model.model_number, model_detail.model_name, model_detail.description, model_detail.specification, model_detail.specification_img, model_detail.link_to_web, model.file, model.voice_over FROM model_detail INNER JOIN model ON model_detail.model_name = model.model_name WHERE model_detail.model_name = '$modelname';";
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
        $sql = "SELECT model.id, model.file, model.voice_over FROM model WHERE id = '$id';";
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

    function getAllData($amount, $category, $order_by, $order_type, $offset, $search_key){
        $conn = connect();
        if($category == "All"){
            $sql = "SELECT model_detail.model_name, model_detail.category, model.id, model.model_number, model.date_modified, model.file_type, model.size, model.file FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name WHERE model.model_name LIKE '%$search_key%' ORDER BY $order_by $order_type LIMIT $offset, $amount;";
            $sqlTotalData = "SELECT model_detail.model_name, model_detail.category, model.id, model.model_number, model.date_modified, model.file_type, model.size, model.file FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name WHERE model.model_name LIKE '%$search_key%' ORDER BY $order_by $order_type;";
        }else{
            $sql = "SELECT model_detail.model_name, model_detail.category, model.id, model.model_number, model.date_modified, model.file_type, model.size, model.file FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name WHERE model_detail.category = '$category' AND model.model_name LIKE '%$search_key%' ORDER BY $order_by $order_type LIMIT $offset, $amount;";
            $sqlTotalData = "SELECT model_detail.model_name, model_detail.category, model.id, model.model_number, model.date_modified, model.file_type, model.size, model.file FROM model INNER JOIN model_detail ON model.model_name = model_detail.model_name WHERE model_detail.category = '$category' AND model.model_name LIKE '%$search_key%' ORDER BY $order_by $order_type;";
        }
        
        $result = mysqli_query($conn, $sql);
        $result1 = mysqli_query($conn, $sqlTotalData);
        $resultCheck = mysqli_num_rows($result);
        $resultCheck1 = mysqli_num_rows($result1);
    
        if($resultCheck > 0){
            while($row = $result->fetch_assoc()){        
                $product2[] = $row;
            }
            return array($product2, $resultCheck1);
        }
    }

    function getTotalPage(){
        $conn = connect();
        $sql = "SELECT COUNT(*) FROM model;";
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