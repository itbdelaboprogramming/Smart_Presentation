<?php

if (isset($_FILES['fileUpload'])) {
    $file_name = $_FILES['fileUpload']['name'];
    $file_size = $_FILES['fileUpload']['size'];
    $file_tmp = $_FILES['fileUpload']['tmp_name'];
    $file_type = $_FILES['fileUpload']['type'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    $global_variable = $file_name;
    
    $allowed_ext = array("glb");
    
    if (in_array($file_ext, $allowed_ext)) {
      $upload_path = "files/" . $file_name;
      move_uploaded_file($file_tmp, $upload_path);
      // echo "File uploaded successfully.";
      header("Location: databases?value=" . urlencode($file_name));
    } else {
       $message = "Error: Invalid file type or file size too large.";
       echo "<script type='text/javascript'>alert('$message');</script>";
       header("Location: databases");
    }
    // $value = $file_name;
    
    // header("Location: databases");
    exit();
}
  