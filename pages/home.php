<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    // if (isset($_GET['value'])) {
    //     $value = urldecode($_GET['value']);
    //     $global_variable = $value;
    // }
    include_once './database/config.php'
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
        <link rel="stylesheet" href="./style/home.css" >
    </head>
    <body>
        <div class="home-page">
            <canvas id="myCanvas">    </canvas>

            <div class="container-top-left">
                <button class="menu-container" onClick="location.href='databases'">
                    <img src="./assets/Menu.png">
                </button>

                <div class="page-name-container">
                    <div class="page-name-text">N-Presentation</div>
                </div>
            </div>

            <p id="myText" style="display: none;"><?php echo $global_variable; ?></p>

        
            <div class="container-bottom-left">
                <div class="menu-container-blue-information">
                    <img src="./assets/Information-Button.png">
                </div>
                <div class="menu-container-blue-sound">
                    <img src="./assets/Sound-Off-Button.png" id="sound-off">
                    <img src="./assets/Sound-On-Button.png" id="sound-on" style="display: none;">
                </div>
                <div class="menu-container-blue-animation">
                    <img src="./assets/Animation-Off-Button.png" id="animation-off">
                    <img src="./assets/Animation-On-Button.png" id="animation-on" style="display: none;">
                </div>
            </div>

            <div class="catalogue-container" id="catalogue-container">
                <p class="catalogue-description-title">All Series</p>
                <div class="catalogue-description">
                    <?php
                        $result2 = getAllModelName();
                        
                        foreach ($result2 as $key => $row2){
                            if ($key === array_key_first($result2)) {
                                echo '<div class="catalogue-product-list active" data-value="' . $row2['id'] . '" id="model_name">';
                                    echo '<div class="catalogue-product-list-text">' . $row2['model_name'] . '</div>';
                                    echo '<img class="catalogue-image-preview" src="./files/' . $row2['image_preview'] .'" />';
                                echo '</div>';
                            }else{
                                echo '<div class="catalogue-product-list" data-value="' . $row2['id'] . '">';
                                    echo '<div class="catalogue-product-list-text">' . $row2['model_name'] . '</div>';
                                    echo '<img class="catalogue-image-preview" src="./files/' . $row2['image_preview'] .'" />';
                                echo '</div>';
                            }
                        }
                    ?>
                </div>
            </div>

            <div class="information-container" id="information-container">
                <div class="information-description">
                    <p class="information-description-title">
                        Dendoman Battery Jaw Crusher
                    </p>
                    <p class="information-description-model-number">NE100HBJ | NE200HBJ</p>
                    <p class="information-description-description">Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system) </p>
                    <p class="information-description-specification">Specifications</p>
                    <p class="information-description-specification-detail" >Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement</p>
                </div>
                <a class="information-link" target="_blank" href="https://www.ncjpn.com/en/products/dendoman/">Dendoman Series | Nakayama Iron Works (ncjpn.com)</a>
            </div>

            <div class="container-bottom-right">
                <div class="menu-container-blue-album">
                    <img src="./assets/Album-Button.png">
                </div>
                <div class="menu-container-blue-lightning">
                    <img src="./assets/Lightning-Button.png">
                </div>
                <div class="toggle"></div>
            </div>

            <div class="item-name-container" id="item-category">
                <p class="text-file-name">Nakayama's Product</p>
                <div class="select-menu">
                    <div class="select-menu-button">
                        <span class="select-menu-text">
                            Select the product
                        </span>
                        <img src="./assets/Dropdown-Off.png"/>
                    </div>
                    <ul class="options">
                        <li class="option">
                            <span class="option-text"> All </span>
                        </li>
                        <?php 
                            $result = getAllCategory();
                            while($row = mysqli_fetch_assoc($result)){
                                ?>
                                <li class="option">
                                    <span class="option-text"><?php echo $row['category']; ?></span>
                                </li>
                                <?php
                            }
                        ?>
                    </ul>
                </div>
            </div>
        </div>

        <script type="module" src="script.js"> </script>
        <script type="module" src="./js/home.js"></script>
    </body>
</html>

