<!-- <div class="container"> -->
<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    if (isset($_GET['value'])) {
        $value = urldecode($_GET['value']);
        $global_variable = $value;
    }
?>
<div class="details-page">
    <canvas id="myCanvas">    </canvas>

    <div class="container">
        <button class="menu-container">
            <img src="./assets/Menu.png">
        </button>

        <div class="item-name-container">
            <p id="myText" class="text-file-name"><?php echo $global_variable; ?></p>
        </div>
    </div>
</div>

<script type="module" src="script.js"> </script>