<!-- <div class="container"> -->
<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    if (isset($_GET['value'])) {
        $value = urldecode($_GET['value']);
        $global_variable = $value;
    }else{
        header("Location: detail/?value=" . urlencode($global_variable));
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
        <link rel="stylesheet" href="style.css" >

    </head>
    <body>
        <div class="details-page">
            <canvas id="myCanvas">    </canvas>

            <div class="container-top-right">
                <button class="back-container" onClick="location.href='home'">
                        <img src="./assets/Back-Button.png">
                </button>
            </div>

            <div class="item-name-container">
                <p id="myText" class="text-file-name"><?php echo $global_variable; ?></p>
            </div>

            
                <form action="function.php" method="POST" enctype="multipart/form-data">
                    <div class="container-bottom-right">
                            <label for="fileUpload" class="upload-container">
                                <img src="./assets/Upload-File-Button.png">
                                <input id="fileUpload" type="file" name="fileUpload" onChange="onFileChange()" style="display:none">
                            </label>
                    </div>

                    <div class="pop-up-container" id="submit-file-container">
                        <div class="pop-up-box">
                            <div class="pop-up-title">Upload Model</div>
                            <div class="pop-up-text">Do you want to upload this model?</div>
                            <div class="pop-up-button-container">
                                <input type="submit" value="Upload" class="pop-up-button">
                                <button type="button" class="pop-up-button" onclick="cancelSubmit()"> cancel </button>
                            </div>
                        </div>
                    </div>
                    
                </form>
            
        </div>

        <script type="module" src="script.js"> </script>
        <script> 
            function onFileChange(){
                console.log("kesini");
                document.getElementById("submit-file-container").style.display = "block";
            }

            function cancelSubmit(){
                document.getElementById("submit-file-container").style.display = "none";
            }
        </script>
    </body>
</html>



