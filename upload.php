<?php
$uploadDir = "upload/";
$uploadFile = $uploadDir . $_FILES['Filedata']['name'];
move_uploaded_file($_FILES['Filedata']['tmp_name'], $uploadFile);
echo $uploadFile;
?>