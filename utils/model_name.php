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


?>