<?php
require_once "./ajax.php";

if(isset($_GET ['get'])) {
    echo json_encode(["res" => $db->getSchedlueItems($_GET['token'])]);
    exit();
}