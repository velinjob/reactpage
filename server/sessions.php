<?php
require_once ("classes/DB.php");
// http://shiflett.org/articles/storing-sessions-in-a-database

function ses_open()
{
    return TRUE;
}

function ses_close()
{
    return FALSE;
}

function ses_read($id)
{
    return (new DB())->readSession($id);
}

function ses_write($id, $data)
{
    return (new DB())->writeSession($id, $data);
}

function ses_destroy($id)
{
    return (new DB())->destroySession($id);
}

function ses_clean($max)
{
    return (new DB())->cleanSession($max);
}

session_set_save_handler('ses_open', 'ses_close', 'ses_read', 'ses_write', 'ses_destroy', 'ses_clean');
ini_set('session.cookie_lifetime', 60 * 60 * 24 * 365);
session_start ();