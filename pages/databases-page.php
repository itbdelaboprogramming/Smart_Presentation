<!-- <div class="container"> -->
<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    if (isset($_GET['value'])) {
        $value = urldecode($_GET['value']);
        $global_variable = $value;
    }

    include_once './database/config.php'
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Smart Presentation</title>
        <link rel="icon" type="image/x-icon" href="assets/logo.png">
        <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="importmap">
            {
                "imports": {
                "three": "https://unpkg.com/three@0.153.0/build/three.module.js"
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
                    <div class="container-middle-right">
                        <canvas id="myCanvas">    </canvas>
                    </div>
                    <div class="database-header">
                        <form class="search-container" action="uploadFile.php" method="get">
                            <input type="text" placeholder="Search.." id="search" name="search" class="search-text" autocomplete="off">
                            <button type="submit" class="search-img"><img src="./assets/Search-Button.png"></button>
                        </form>
                        <div class="filter-container">
                            <div class="filter-wrap">
                                <div class="filter-text">
                                    <img src="./assets/Filter-Icon.svg" class="filter-img">
                                    Filter
                                </div>
                                <div class="filter-sort-box">
                                    <img src="./assets/Filter-Ascending.svg" id="filter-asc" value="ASC">
                                    <img src="./assets/Filter-Descending.svg" id="filter-desc" value="DESC" style="display: none;">
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
                        <div class="category" id="item-category">
                            Category
                            <div class="select-menu">
                                <div class="select-menu-button">
                                    <span class="select-menu-text">
                                        All
                                    </span>
                                    <img src="./assets/Dropdown-Off.png"/>
                                </div>
                                <ul class="options">
                                    <li class="option">
                                        <span class="option-text"> All </span>
                                    </li>
                                    <?php 
                                        $result = getAllCategory();
                                        while ($row = mysqli_fetch_assoc($result)) {
                                            ?>
                                            <li class="option">
                                                <span class="option-text"><?php echo $row['category'];?></span>
                                            </li>
                                            <?php
                                        }
                                    ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <table id="database-data">
                        <tr class="noHover">
                            <th class="left-table">NO.</th>
                            <th>MODEL NAME</th>
                            <th>MODEL NUMBER</th>
                            <th>CATEGORY</th>
                            <th>DATE MODIFIED</th>
                            <th>TYPE</th>
                            <th class="right-table">SIZE</th>
                        </tr>
                        <?php 
                            $number = 1;
                            if (isset($_GET['search'])) {
                                $search_key = $_GET['search'];
                            }else{
                                $search_key = "";
                            }
                            
                            list($result2, $totaldata) = getAllData(10, "All", "model_name", "ASC", 0, $search_key);
                            
                            foreach($result2 as $row){
                                $date_modified_date = explode(" ",$row['date_modified']);
                                $date_modified_time = explode(":",$date_modified_date[1]);

                                if($date_modified_time[0] > 12){
                                    if($date_modified_time[0] - 12 < 10){
                                        $date_modified_time_display = "0" . ($date_modified_time[0] - 12) . ":" . $date_modified_time[1] . " PM";
                                    }else{
                                        $date_modified_time_display = ($date_modified_time[0] - 12) . ":" . $date_modified_time[1] . " PM";
                                    }
                                }else{
                                    $date_modified_time_display = $date_modified_time[0] . ":" . $date_modified_time[1] . " AM";
                                }
                                
                            ?>

                                <tr data-value="<?php echo $row['id'];?>">
                                    <td><?php echo $number;?></td>
                                    <td><?php echo $row['model_name'];?></td>
                                    <td><?php echo $row['model_number'];?></td>
                                    <td><?php echo $row['category'];?></td>
                                    <td><?php echo $date_modified_date[0] . " " . $date_modified_time_display;?></td>
                                    <td><?php echo $row['file_type'];?></td>
                                    <td><?php echo $row['size'];?></td>
                                </tr>

                            <?php  
                            $number++;                     
                            }
                        ?>
                    </table>
                    <div class="table-controller">
                        <div id="pagination-dropdown" class="pagination-dropdown-wrapper">
                            Rows per page
                            <div class="pagination-select-menu">
                                <div class="pagination-select-menu-button">
                                    <span class="pagination-select-menu-text">
                                        10
                                    </span>
                                    <img src="./assets/Dropdown-Off.png"/>
                                </div>
                                <ul class="pagination-options">
                                    <li class="pagination-option">
                                        <span class="pagination-option-text"> 10 </span>
                                    </li>
                                    <li class="pagination-option">
                                        <span class="pagination-option-text"> 15 </span>
                                    </li>
                                    <li class="pagination-option">
                                        <span class="pagination-option-text"> 20 </span>
                                    </li>
                                    <li class="pagination-option">
                                        <span class="pagination-option-text"> 40 </span>
                                    </li>
                                </ul>
                            </div>
                
                            <div style="display:flex; gap:4px;">
                                <div class="total-data-first">
                                    1
                                </div>
                                -
                                <div class="total-data-last">
                                    10
                                </div>
                                of
                                <div class="total-data">
                                    <?php 
                                        echo  $totaldata;
                                    ?>
                                </div>
                            </div>
                        </div>
                        <div class="pagination-arrow">
                            <div class="pagination-arrow-box disabled" id="pagination-first-page-button">
                                <img src="./assets/Arrow-First.svg">
                            </div>
                            <div class="pagination-arrow-box disabled" id="pagination-previous-page-button">
                                <img src="./assets/Arrow-Left.svg">
                            </div>
                            <div class="pagination-arrow-page-number" id="current-page">
                                1
                            </div>
                            of
                            <div id="total-page">
                                
                            </div>
                            <div class="pagination-arrow-box" id="pagination-next-page-button">
                                <img src="./assets/Arrow-Right.svg">
                            </div>
                            <div class="pagination-arrow-box" id="pagination-last-page-button">
                                <img src="./assets/Arrow-Last.svg">
                            </div>
                        </div>
                    </div>
                    <div class="page-filler">
                        
                    </div>
                </div>
            </div>
            <div class="right-content">
                
            </div>



            <div class="container-top-right">
                <button class="menu-container" onClick="location.href='home'">
                    <img src="./assets/Back-Button.png">
                </button>
            </div>

            <p id="myText" style="display: none;"><?php echo $global_variable; ?></p>

            <form action="uploadFile.php" method="POST" enctype="multipart/form-data">
                <div class="container-bottom-mb1x-right">
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
                <div class="toggle"></div>
            </div>
            <div class="loadingScreenContainer" style="display: none">
                    <label for="loadingBar" id='loadingBarLabel'> Loading... </label>
                    <progress id='loadingBar' max='100' value='0'></progress>
            </div>
        </div>

        <script>
            function onFileChange() {
                window.scrollTo({top: 0, behavior: 'smooth'});
                let submit_file_container = document.getElementById("submit-file-container");
                submit_file_container.style.display = "block";
                var name = document.getElementById("fileUpload");
                var nameContainer = document.getElementById("pop-up-text-fileName");
                nameContainer.innerHTML = name.files.item(0).name;
                document.body.style.overflow = "hidden";
            }

            function cancelSubmit() {
                document.getElementById("submit-file-container").style.display = "none";
                document.body.style.overflow = "auto";
            }
        </script>

        <script type="module" src="script.js"> </script>
        <script type="module" src="./js/databases.js"></script>
    </body>
</html>



