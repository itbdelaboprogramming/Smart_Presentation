<!-- <div class="container"> -->
<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    if (isset($_GET['value'])) {
        $value = urldecode($_GET['value']);
        $global_variable = $value;
    }else{
        header("Location: databases/?value=" . urlencode($global_variable));
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Smart Presentation</title>
        <link rel="icon" type="image/x-icon" href="assets/logo.png">
        <meta charset="UTF-8">
        <script type="importmap">
            {
                "imports": {
                "three": "https://unpkg.com/three@0.139.2/build/three.module.js"
                }
            }
        </script>
        <link rel="stylesheet" href="./style/style.css" >
        <link rel="stylesheet" href="./style/databases.css" >

    </head>
    <body>
        <div class="databases-page">
            <canvas id="myCanvas">    </canvas>

            <div class="container-top-left">
                <div class="page-name-container">
                    <div class="page-name-text">Exhibition List</div>
                </div>
            </div>

            <div class="container-top-right">
                <button class="menu-container" onClick="location.href='home'">
                    <img src="./assets/Back-Button.png">
                </button>
            </div>

            <p id="myText" style="display: none;"><?php echo $global_variable; ?></p>

            <form action="function.php" method="POST" enctype="multipart/form-data">
                <div class="container-bottom-mb2x-right">
                    <input type="file" id="fileUpload" type="file" name="fileUpload" onChange="onFileChange()">
                    <label for="fileUpload" class="upload-container">
                        <img src="./assets/Upload-File-Button.png">
                    </label>
                </div>
                <div class="pop-up-container" id="submit-file-container">
                    <div class="pop-up-box">
                        <div class="pop-up-title">Upload Model</div>
                        <div class="pop-up-text">Do you want to upload this model?</div>
                        <div class="pop-up-text-file-name" id="pop-up-text-fileName">File name</div>
                        <div class="pop-up-button-container">
                            <input type="submit" value="Upload" class="pop-up-button">
                            <button type="button" class="pop-up-button" onclick="cancelSubmit()"> cancel </button>
                        </div>
                    </div>
                </div>    
            </form>
            
            <div class="container-bottom-right">
                <button class="menu-container">
                    <img src="./assets/Delete-File-Button.png">
                </button>

                <div class="toggle"></div>
            </div>
  
        </div>

        <script>
            function onFileChange() {
                document.getElementById("submit-file-container").style.display = "block";
                var name = document.getElementById("fileUpload");
                var nameContainer = document.getElementById("pop-up-text-fileName");
                nameContainer.innerHTML = name.files.item(0).name;
            }

            function cancelSubmit() {
                document.getElementById("submit-file-container").style.display = "none";
            }
        </script>

        <script type="module" src="script.js"> </script>
        <script type="module" src="./js/toggle.js"></script>
    </body>
</html>



