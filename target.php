<?php
$foo = $_POST['foo']; //It could be GET
echo json_encode(['bin' => $foo]);
?>
