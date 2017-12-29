<?php

header("Content-Type: application/json; charset=utf-8");
ini_set('html_errors', '0');
require_once ("../init.php");

function exception_handler($exception) {
    header("http/1.0 500 Internal server error");
    header("Content-Type: text/plain; charset=utf-8");
    echo $exception->getMessage();
    die();
}

function error_handler ($errno, $errstr, $errfile, $errline) {
    header("http/1.0 500 Internal server error");
    header("Content-Type: text/plain; charset=utf-8");
    echo "$errno: $errstr at $errline line of $errfile";
    die();
}

function fatal_handler() {
    $error = error_get_last();
    if( $error !== NULL)
    {
        $errno   = $error["type"];
        $errfile = $error["file"];
        $errline = $error["line"];
        $errstr  = $error["message"];

        ob_clean ();
        header("http/1.0 500 Internal server error");
        header("Content-Type: text/plain; charset=utf-8");
        echo "$errno: $errstr at $errline line of $errfile";
        die();
    }
}

set_exception_handler('exception_handler');
set_error_handler('error_handler');
register_shutdown_function('fatal_handler');


if (!$userId) {
    header("http/1.0 403 Forbidden");
    echo "Access denied. Please login.";
    die();
}
