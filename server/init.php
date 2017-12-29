<?php

require_once ("classes/DB.php");
$db = new DB();

//require_once ("sessions.php");
//$sessId = session_id();
$userId = $db->getUserByEmail('apogoreliy@gmail.com');
//$userId = $db->getUserBySession ($sessId);