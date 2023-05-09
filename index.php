<?php
    // include "main.php";
    $request = $_SERVER["REQUEST_URI"];
    $curPageName = explode('/', $request);
    $curPageName = end($curPageName);;

    // to check url
    // echo "<script>console.log('Debug Objects: " . $request . "' );</script>";
    // echo "<script>console.log('Debug Objects3: " . $curPageName . "' );</script>";

    switch ($curPageName){
        case "":
            include "main.php";
            break;

        case "home":
            include "./pages/home.php";
            break;
        
        case "detail":
            include "./pages/details.php";
            break;

        default:
            http_response_code(404);
            include "./pages/404.php";
            break;
    }

    // function debug_to_console($data) {
    //     $output = $data;
    //     if (is_array($output))
    //         $output = implode(',', $output);
    
    //     echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    // }