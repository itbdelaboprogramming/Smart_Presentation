<?php
    include '../database/config.php';

    if(isset($_POST['category'])){
        $modelname = $_POST['category'];

        if($modelname === "" || $modelname === "All"){
            $product2 = getAllModelName();
        }else{
            $product2 = getModelName($modelname);
        }

        echo json_encode($product2);
    }
    if(isset($_POST['id'])){
        $id = $_POST['id'];

        if($id === "" || $id === "All"){
            $product2 = getAllModelName();
        }else{
            $product2 = getModelName($id);
        }

        echo json_encode($product2);
    }


?>