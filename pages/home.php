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
                "three": "https://unpkg.com/three@0.153.0/build/three.module.js"
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

            <div class="container-bottom-left-ml2x">
                <div class="sound-expand" style="display: none;">
                    <div class="sound-expand-component">
                        Music
                        <div class="toggle-container">
                            Off
                            <div class="toggle-music"></div>
                            On
                        </div>
                    </div>
                    <div class="sound-expand-component">
                        Voice Over
                        <div class="toggle-container">
                            Off
                            <div class="toggle-speech"></div>
                            On
                        </div>
                    </div>
                </div>
            </div>

            <div class="catalogue-container-2" id="catalogue-container-2">
                <div>
                    <p class="catalogue-description-title-2">All Series</p>
                </div>
                <div class="catalogue-description-2">
                    <?php
                        $result2 = getAllDistinctModelName();
                        
                        foreach ($result2 as $key => $row2){
                            if ($key === array_key_first($result2)) {
                                echo '<div class="catalogue-product-list-2 active" id="model_name">';
                                    echo '<div class="catalogue-product-list-text-2">' . $row2['model_name'] . '</div>';
                                    echo '<img class="catalogue-image-preview-2" src="./files/' . $row2['image_preview'] .'" />';
                                echo '</div>';
                            }else{
                                echo '<div class="catalogue-product-list-2" >';
                                    echo '<div class="catalogue-product-list-text-2">' . $row2['model_name'] . '</div>';
                                    echo '<img class="catalogue-image-preview-2" src="./files/' . $row2['image_preview'] .'" />';
                                echo '</div>';
                            }
                        }
                    ?>
                </div>
            </div>

            <div class="catalogue-container" id="catalogue-container">
                <div class="catalogue-description-header">
                    <p class="catalogue-description-title"></p>
                    <div class="catalogue-back-button">
                        <img src="./assets/Catalogue-Back-Button.png" class="catalogue-back-button-img">
                    </div>
                </div>
                <div class="catalogue-description">
                    
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

            <div class="container-bottom-right-mr2x" >
                <div class="menu-container-blue-lightning-expand" style="display: none">
                    <div class="menu-container-blue-lightning-expand-wrapper">
                        <div class="lightning-component">
                            <div class="lightning-title">
                                Lightning
                            </div>
                            <div class="lightning-component-container">
                                <div class="slider-group">
                                    Environment Brightness
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-env"></span>
                                        </span>
                                        <input type="range" min="0" max="2" value="0.2" step="0.1" class="slider" id="slider-env"/>
                                    </div>
                                </div>
                                <div class="slider-group">
                                    Direct Lamp Brightness
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-lamp"></span>
                                        </span>
                                        <input type="range" min="0" max="40" value="20" step="0.1" class="slider" id="slider-lamp"/>
                                    </div>
                                </div>
                                <div class="slider-group">
                                    Direct Lamp Position
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-lamp-pos"></span>
                                        </span>
                                        <input type="range" min="0" max="400" value="200" step="1" class="slider" id="slider-lamp-pos"/>
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div class="lightning-component"> 
                            <div class="lightning-title">
                                Enlargement
                            </div>
                            <div class="lightning-component-container">
                                <div class="slider-group">
                                    Zoom
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-zoom"></span>
                                        </span>
                                        <input type="range" min="0.2" max="20" value="1" step="0.1" class="slider" id="slider-zoom"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

