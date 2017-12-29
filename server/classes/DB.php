<?php

require_once ("FirePHP.class.php");
require_once ("../config.php");
require_once ("JWT.php");

//const jwt = require('jwt-simple');

class DB
{
    protected $db;
    
    function __construct()
    {
        // establish mySQLi connection
        $this->db = new mysqli('localhost', 'recovery', 'getmercy144', 'recovery');
        $this->db->set_charset('utf8');
        if ($this->db->connect_errno) throw new Exception ('Could not connect: ' . $this->db->connect_error);
    }

    function __destruct() {
        $this->db->close();
    }

    protected function query($query)
    {
        $res = $this->db->query($query);
        if (!$res) throw new Exception ($this->db->error);
        return $res;
    }

    protected function multiQuery($query)
    {
        if ($this->db->multi_query($query))
        {
            $result = FALSE;
            do
            {
                $res = $this->db->use_result();
                if ($res) $result = $res;
            } while ($this->db->next_result());
            return $result;
        } else
            throw new Exception ($this->db->error);
    }

    protected function esc($text)
    {
        return $this->db->real_escape_string($text);
    }

    /*** USERS ***/

    function getUserByEmail($email)
    {
        $email = $this->esc($email);
        $res = $this->query("SELECT * FROM user WHERE email='$email'");
        return $res->fetch_assoc();
    }
    
    function getUserById($id)
    {
        $id = (int)$id;
        $res = $this->query("SELECT * FROM user WHERE id=$id");
        return $res->fetch_assoc();
    }

    function loginUser($userId, $token)
    {
        $userId = (int)$userId;
        $token = $this->esc($token);
        $this->query("INSERT IGNORE INTO user_session(user, token) VALUES ($userId, '$token')");
        $this->query("UPDATE user SET last_login=NOW() WHERE id=$userId");
    }

    function isAdmin($userId)
    {
        $userId = (int)$userId;
        $res = $this->query("SELECT admin FROM user WHERE id=$userId");
        if ($row = $res->fetch_assoc())
            return (int)$row['admin'];
        else
            return false;
    }

    function logoutUser($userId, $token)
    {
        $userId = (int)$userId;
        $token = $this->esc($token);
        $this->query("DELETE FROM user_session WHERE user=$userId AND token='$token'");
    }    

    function getUserByToken($token)
    {
        return JWT::decode($token, Config::USER_TOKEN_SECRET, array('HS256'));
    }

    function getTokenForUser($login, $password) 
    {
        $token = array(
            "login" => $login,
            "password" => $password
        );

        return JWT::encode($token, Config::USER_TOKEN_SECRET);
    }

    function checkIfUserExists($login){
        $res = $this->query("SELECT * FROM user WHERE email = '$login' ");
        $row = $res->fetch_assoc();

        return $row ? $row : false;
    }

    function auth ($type, $login, $password) {
        if (!$login || !$password) 
            return(['errorData' => true]);

        $user = $this->checkIfUserExists($login);

        if($user && $type === 'signUp'){
            return(['userExist' => true]);
        }
        else if(!$user && $type === 'signUp'){     
            $token = $this->getTokenForUser($login, $password);       

            $this->query("INSERT INTO user (email, password, created, token) VALUES ('$login', '$password', now(), '$token')");
            return(['token' => $token]);
        }
        else if($user && $type === 'signIn'){
            $userInfo = $this->getUserByToken($user['token']);

            return($userInfo -> login !== $login || $userInfo -> password !== $password ? ['errorToken' => true] : ['token' => $user['token']]);
        }
        else if(!$user && $type === 'signIn'){
            return(['userUnexist' => true]);
        }
    }

    function isUserLoggedIn($token){
        $userInfo = $this->getUserByToken($token);
        $res = $this->query("SELECT * FROM user WHERE email = '". $userInfo->login. "' AND password = '". $userInfo->password ."' ");
        $row = $res->fetch_assoc();

        return $row ? true : false;
    }
    
    /*** PAGES ***/

    function getPages(){
        $res = $this->query("SELECT * FROM page");

        $pages = [];
        while ($row = $res->fetch_assoc()){
            $pages [] = $row;
        }
        return $pages;
    }
}