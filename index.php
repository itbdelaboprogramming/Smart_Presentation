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
        
        case "databases":
            include "./pages/databases-page.php";
            break;

        default:
            if(strpos($request,'/databases') !== false){
                include "./pages/databases-page.php";
                break;
            }else{
                http_response_code(404);
                include "./pages/404.php";
                break;
            }

    }