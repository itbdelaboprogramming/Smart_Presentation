<?php

if (isset($_FILES['file'])) {
    $file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    $global_variable = $file_name;
    
    $allowed_ext = array("glb");
    
    if (in_array($file_ext, $allowed_ext)) {
      $upload_path = "files/" . $file_name;
      move_uploaded_file($file_tmp, $upload_path);
      // echo "File uploaded successfully.";
    } else {
       $message = "Error: Invalid file type or file size too large.";
       echo "<script type='text/javascript'>alert('$message');</script>";
    }
    $value = $file_name;
    // header("Location: index.php?value=" . urlencode($file_name));
    header("Location: detail");

    exit();
}
  