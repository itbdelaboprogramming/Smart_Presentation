<!-- <div class="container"> -->
<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    if (isset($_GET['value'])) {
        $value = urldecode($_GET['value']);
        $global_variable = $value;
    }
?>
    <canvas id="myCanvas">    </canvas>
    <!-- <input id="ph1" name="photo" type="file" onchange="getFileData(this);" label="fileee"/> -->

    <form action="function.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>
    <p id="myText"><?php echo $global_variable; ?></p>


<!-- </div> -->
<script type="module" src="script.js"> </script>
<script>
    <?php

    ?>
</script>