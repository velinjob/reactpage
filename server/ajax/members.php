<?php
require_once "./ajax.php";

if(isset($_GET ['get_members'])) {
    echo json_encode(["res" => $db->db_getMembersList($_GET['token'])]);
    exit();
}