<?php
    include '../database/config.php';

    if(isset($_POST['category'])){
        $category = $_POST['category'];

        if($category === "" || $category === "All"){
            $product2 = getAllModelName();
        }else{
            $product2 = getModelName($category);
        }

        echo json_encode($product2);
    }

    if(isset($_POST['modelname'])){
        $model_name = $_POST['modelname'];

        $product2 = getDescription($model_name);
        echo json_encode($product2);
    }

    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $product2 = getFileById($id);
        echo json_encode($product2);
    }


?>