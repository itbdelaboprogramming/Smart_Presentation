<?php
    // $user = 'root';
    // $pass = '';
    // $db = 'smart_presentation';
    $dbservername = 'localhost';
    $dbusername = 'root';
    $dbpassword = '';
    $dbname = 'smart_presentation';

    $conn = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        
    }
    // echo "Connected successfully";
?>


<!-- create database "smart_presentation" -->

<!-- sql code to create table and insert data -->

<!-- CREATE TABLE model_detail ( 
    model_name varchar(255) not null PRIMARY KEY, 
    category varchar(255) not null, 
    description varchar(255) not null, 
    specification varchar(255) not null 
);

CREATE TABLE model ( 
    model_number varchar(255) not null PRIMARY KEY, 
    model_name varchar(255) not null, 
    image_preview varchar(255) not null, 
    date_modified timestamp default now() on update now(), 
    file_type varchar(255) not null,
    size varchar(255), 
    file varchar(255) not null,
    FOREIGN KEY (model_name) REFERENCES model_detail(model_name) 
);

INSERT INTO model_detail(
    model_name, category, description, specification
) VALUES 
    ('Dendoman Battery Jaw Crusher', 'Dendoman', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Dendoman Jaw Crusher', 'Dendoman', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Dendoman Roll Crusher', 'Dendoman', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Dendoman Cone Crusher', 'Dendoman', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Dendoman Impact Crusher', 'Dendoman', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Dendoman VSI(Gyropactor)', 'Dendoman', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Dendoman Screen', 'Dendoman', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Hydraulic crushing chamber release system', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('New Jaw Crusher RC', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Jaw Crusher AC', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Power Roll Crusher PRC', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Neo Cone Crusher NSC', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Impact Crusher ACD', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('VSI(Gyropactor) SR', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Fritter FR', 'Crusher', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Bucket', 'MSD700', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Blade', 'MSD700', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Backhoe', 'MSD700', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Dump', 'MSD700', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Grizzly Vibrating Feeder GVF-H', 'Screen / Feeder', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Grizzly Vibrating Feeder GVF', 'Screen / Feeder', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Reciprocating Plate Feeder PFS', 'Screen / Feeder', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Vibrating Feeder VF', 'Screen / Feeder', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Inclined Vibrating Screen NSR', 'Screen / Feeder', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'),
    ('Vibrating Grizzly Screen GS', 'Screen / Feeder', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement')
    ;
    
INSERT INTO model (model_name, model_number, image_preview, date_modified, file, file_type, size) VALUES 
    ('Dendoman Battery Jaw Crusher', 'NE100HBJ', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Dendoman Battery Jaw Crusher', 'NE200HBJ', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Dendoman Jaw Crusher', 'NE100J', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Dendoman Jaw Crusher', 'NE150J', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Dendoman Jaw Crusher', 'NE200J', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('New Jaw Crusher RC', 'RC3624', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00.glb', '3D Object', '123 kb'),
    ('New Jaw Crusher RC', 'RC4224', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00.glb', '3D Object', '123 kb'),
    ('Jaw Crusher AC', 'AC1410', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Jaw Crusher AC', 'AC2415', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Bucket', 'Bucket1', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Bucket', 'Bucket2', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Blade', 'Blade1', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Blade', 'Blade2', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Backhoe', 'Backhoe1', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Backhoe', 'Backhoe2', 'image_preview.png', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Dump', 'Dump1', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Dump', 'Dump2', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF616H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF826H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF926H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF930H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF1030H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF1230H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF1236H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF1440H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF-H', 'GVF1045H', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Reciprocating Plate Feeder PFS', 'PFS616', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Vibrating Feeder VF', 'VF402', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Inclined Vibrating Screen NSR', 'NSR362', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Vibrating Grizzly Screen GS', 'GS382', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF', 'GVF718', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF', 'GVF820', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb'),
    ('Grizzly Vibrating Feeder GVF', 'GVF926', 'image_preview.png', null, 'MSD700_ブレードモデル_MCLA15A.glb', '3D Object', '123 kb')
; -->