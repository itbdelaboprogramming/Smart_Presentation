<?php
    include '../database/config.php';

    if(isset($_POST['category'])){
        $category = $_POST['category'];

        if($category === "" || $category === "All"){
            $product2 = getAllDistinctModelName();
        }else{
            $product2 = getDistinctModelName($category);
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

    if(isset($_POST['getmodelnumber'])){
        $model_name = $_POST['getmodelnumber'];

        $product2 = getModelNumber($model_name);
        echo json_encode($product2);
    }

    if(isset($_POST['dataamount'])){
        $amount = $_POST['dataamount'];
        $category = $_POST['tablecategory'];
        $sort_by = $_POST['orderby'];
        $order_type = $_POST['ordertype'];
        $offset = $_POST['offset'];
        $search_key = $_POST['searchkey'];

        list($product2, $totalData) = getAllData($amount, $category, $sort_by, $order_type, $offset, $search_key);
        echo json_encode(array($product2, $totalData));

    }
    

?>