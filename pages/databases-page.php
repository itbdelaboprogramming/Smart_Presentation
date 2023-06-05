<!-- <div class="container"> -->
<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    if (isset($_GET['value'])) {
        $value = urldecode($_GET['value']);
        $global_variable = $value;
    }else{
        header("Location: databases/?value=" . urlencode($global_variable));
    }
    // include_once './database/config.php'
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
            <div class="left-content">
                <div class="left-content-wraper">
                    <div class="page-name-container">
                        <div class="page-name-text">Exhibition List</div>
                    </div>
                    <div class="database-header">
                        <div class="search-container">
                            <input type="text" placeholder="Search.." name="search" class="search-text">
                            <button type="submit" class="search-img"><img src="./assets/Search-Button.png"></button>
                        </div>
                        <div class="filter-container">
                            <div class="filter-wrap">
                                <div class="filter-text">
                                    <img src="./assets/Filter-Icon.svg" class="filter-img">
                                    Filter
                                </div>
                                <div class="filter-sort-box">
                                    <img src="./assets/Filter-Ascending.svg" id="filter-asc" value="asc">
                                    <img src="./assets/Filter-Descending.svg" id="filter-desc" value="asc" style="display: none;">
                                </div>
                            </div>
                            <div class="filter-drop-down" style="display: none;">
                                <div class="filter-drop-down-wrap">
                                    <div class="filter-drop-down-title">
                                        SORT BY:
                                    </div>
                                    <div class="filter-drop-down-item" id="div_sort_model_name">
                                        <label for="sort_model_name"> Model Name </label>
                                        <input type="radio" id="sort_model_name" name="sort" value="model_name" checked>
                                    </div>
                                    <div class="filter-drop-down-item" id="div_sort_model_number">
                                        <label for="sort_model_number"> Model Number </label>
                                        <input type="radio" id="sort_model_number" name="sort" value="model_number">
                                    </div>
                                    <div class="filter-drop-down-item" id="div_sort_date_modified">
                                        <label for="sort_date_modified"> Date Modified </label>
                                        <input type="radio" id="sort_date_modified" name="sort" value="date_modified">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="category">
                            Category
                        </div>
                    </div>
                    <table id="database-data">
                        <div>
                            <th class="left-table">NO.</th>
                            <th>MODEL NAME</th>
                            <th>MODEL NUMBER</th>
                            <th>CATEGORY</th>
                            <th>DATE MODIFIED</th>
                            <th>TYPE</th>
                            <th class="right-table">SIZE</th>
                        </div>
                        <tr>
                            <td>1. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>2. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>3. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>4. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>5. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>6. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>7. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>8. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>9. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                        <tr>
                            <td>10. </td>
                            <td>Battery Jaw Crusher</td>
                            <td>NE100HBJ</td>
                            <td>Dendoman</td>
                            <td>23-01-31 10:04 AM</td>
                            <td>3D Object</td>
                            <td>52,540 KB</td>
                        </tr>
                    </table>

                </div>
            </div>
            <div class="right-content">
                <canvas id="myCanvas">    </canvas>
            </div>

            <div class="container-top-right">
                <button class="menu-container" onClick="location.href='home'">
                    <img src="./assets/Back-Button.png">
                </button>
            </div>

            <p id="myText" style="display: none;"><?php echo $global_variable; ?></p>

            <form action="uploadFile.php" method="POST" enctype="multipart/form-data">
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
        <script type="module" src="./js/databases.js"></script>
    </body>
</html>



