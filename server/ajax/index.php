<?php
require_once "./ajax.php";

if(isset($_GET ['get_pages'])) {
    echo json_encode(["pages" => isset($_GET['token']) && $_GET['token'] !== '' ? $db->getPages($_GET['token']) : false ]);
    exit();
}
else if(isset($_GET ['get_events'])) {
    echo json_encode(["res" => isset($_GET['token']) && $_GET['token'] !== '' ? $db->getEvents($_GET['token']) : false]);
    exit();
}
else if(isset($_GET ['auth'])) {
    $response = $db->auth(isset($_GET['type']) ? $_GET['type'] : null, isset($_GET['login']) ?  $_GET['login'] : null , isset($_GET['password']) ? $_GET['password'] : null);

    if(isset($response['errorData'])) {
        $response = ['error' => 'You must provide email and password'];
    }
    else if(isset($response['userUnexist']) || isset($response['errorToken'])){
        $response = ['error' => 'Wrong login or password'];
    }
    else if(isset($response['userExist'])){
        $response = ['error' => 'Email is in use'];
    }
    else if(isset($response['token'])){
        $result = $response;
    }
    
    echo json_encode(["res" => $response]);
    exit();
}
else if(isset($_GET['check'])){
    $res = false;
    
    if(isset($_GET['token'])){
        $res = $db->isUserLoggedIn($_GET['token']);
    }

    echo json_encode(["res" => $res]);
    exit();
}
else if(isset($_GET['test_request'])){
    echo json_encode(["res" => $db->testRequest()]);
    exit();
}