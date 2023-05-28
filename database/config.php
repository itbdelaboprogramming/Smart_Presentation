<?php
    // $user = 'root';
    // $pass = '';
    // $db = 'smart_presentation';
    $dbservername = 'localhost';
    $dbusername = 'root';
    $dbpassword = '';
    $dbname = 'smart_presentations';

    $conn = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        
    }
    // echo "Connected successfully";
?>


<!-- CREATE TABLE model_detail ( 
    model_name varchar(255) not null PRIMARY KEY, 
    image_preview varchar(255) not null, 
    description varchar(255) not null, 
    specification varchar(255) not null 
);

CREATE TABLE model ( 
    model_name varchar(255) not null, 
    model_number varchar(255) not null PRIMARY KEY, 
    category varchar(255) not null, 
    date_modified timestamp default now() on update now(), 
    file varchar(255) not null, file_type varchar(255), 
    size varchar(255), 
    FOREIGN KEY (model_name) REFERENCES model_detail(model_name) 
);

INSERT INTO model_detail(
    model_name, image_preview, description, specification
) VALUES 
    (
    'Dendoman Battery Jaw Crusher', 'image_preview.png', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'
    ),
    (
    'Dendoman Jaw Crusher', 'image_preview.png', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'
    ),
    (
    'New Jaw Crusher RC', 'image_preview.png', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'
    ),
    (
    'Jaw Crusher AC', 'image_preview.png', 'Driven by the Lithium Ion battery With the power management function <br><br> Also equipped with the N-Link (IoT remote controlled management system)', 'Processing ability is influenced by quality of material, block size thrown into, particle size <br><br> Specs and dimensions of this machine might be changed without any prior notice for the purpose of improvement'
    );
    
INSERT INTO model (model_name, model_number, category, date_modified, file, file_type, size) VALUES 
    ('Dendoman Battery Jaw Crusher', 'NE100HBJ', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Dendoman Battery Jaw Crusher', 'NE200HBJ', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Dendoman Jaw Crusher', 'NE100J', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Dendoman Jaw Crusher', 'NE150J', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('Dendoman Jaw Crusher', 'NE200J', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00_2.glb', '3D Object', '123 kb'),
    ('New Jaw Crusher RC', 'RC3624', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00.glb', '3D Object', '123 kb'),
    ('New Jaw Crusher RC', 'RC4224', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00.glb', '3D Object', '123 kb'),
    ('Jaw Crusher AC', 'AC1410', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00.glb', '3D Object', '123 kb'),
    ('Jaw Crusher AC', 'AC2415', 'Dendoman', null, 'MSD700_bucket_MCLA007A_00.glb', '3D Object', '123 kb')
; -->