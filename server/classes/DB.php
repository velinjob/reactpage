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
        $this->db = new mysqli(Config::DB_HOST, Config::DB_USER, Config::DB_PASSWORD, Config::DB_NAME);
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
        $res = $this->query("SELECT * FROM admin WHERE login='$email'");
        return $res->fetch_assoc();
    }
    
    function getUserById($id)
    {
        $id = (int)$id;
        $res = $this->query("SELECT * FROM admin WHERE member_key=$id");
        return $res->fetch_assoc();
    }

    function getUserByToken($token)
    {
        $token = $this->esc($token);
        return JWT::decode($token, Config::USER_TOKEN_SECRET, array('HS256'));
    }

    function getTokenForUser($login, $password) 
    {
        $login = $this->esc($login);
        $password = $this->esc($password);

        $token = array(
            "login" => $login,
            "password" => $password
        );

        return JWT::encode($token, Config::USER_TOKEN_SECRET);
    }

    function checkIfUserExists($login){
        $login = $this->esc($login);
        $res = $this->query("SELECT * FROM admin WHERE login = '$login' ");
        $row = $res->fetch_assoc();

        return $row ? $row : false;
    }

    function auth ($type, $login, $password) {
        $type = $this->esc($type);
        $login = $this->esc($login);
        $password = $this->esc($password);

        if (!$login || !$password) 
            return(['errorData' => true]);

        $user = $this->checkIfUserExists($login);

        if($user && $type === 'signUp'){
            return(['userExist' => true]);
        }
        else if(!$user && $type === 'signUp'){     
            $token = $this->getTokenForUser($login, $password);       
            $member_key = $this->getNewMemberKey();

            $this->query("INSERT INTO admin (member_key, login, password, created) VALUES ('$member_key', '$login', '$password', now())");
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

    function getNewMemberKey (){
        $res=$this->query ("SELECT `key` as id FROM member WHERE `key` ORDER BY `key` DESC LIMIT 1");
        $row = $res->fetch_object();
        $key = "990000000";
        if ($row && strlen($row->id)==9) $key = (string)($row->id + 1);
        return $key;
    }

    function isUserLoggedIn($token){
        $token = $this->esc($token);
        $userInfo = $this->getUserByToken($token);
        $res = $this->query("SELECT * FROM admin WHERE login = '". $userInfo->login. "' AND password = '". $userInfo->password ."' ");
        $row = $res->fetch_assoc();

        return $row ? true : false;
    }

    function getUserIdByLogin($login){
        $login = $this->esc($login);

        $res = $this->query("SELECT member_key as id FROM admin WHERE login = '$login' ");
        $row = $res->fetch_assoc();

        return $row ? $row['id'] : false;
    }
    
    /*** PAGES ***/

    function getPages($token){
        $token = $this->esc($token);

        if($this->isUserLoggedIn($token)){
            $res = $this->query("SELECT `key` as url, name, id FROM page");

            $pages = [];
            while ($row = $res->fetch_assoc()){
                $pages [] = $row;
            }
            return $pages;
        }
        else{
            return false;
        }        
    }

    /** INDEX PAGE **/
    function getEvents($token){
        $token = $this->esc($token);

        if($this->isUserLoggedIn($token)){
            $user = $this->getUserByToken($token);

            $adminId = $this->getUserIdByLogin($user->login);
            $request= $adminId ? "  AND e.is_active=1 " : "";
            
            // first request is by locality
            // second request is by admin access if zones more than access
            // third request is by admin acees if zones less than access 
            // forth request is by zones (available only events are not restricted by zones)
            
            $res=$this->query ("
                SELECT DISTINCT * FROM (
                SELECT e.key as id, e.name as name, e.need_passport, e.need_transport, 
                e.need_prepayment, e.start_date, e.end_date, e.need_flight, e.need_tp, e.regend_date, e.info, e.private, 
                e.locality_key, e.author, l.name as locality_name, e.is_active, e.archived, re.regstate_key
                FROM event e             
                LEFT JOIN reg re ON re.event_key=e.key AND re.member_key='$adminId'
                LEFT JOIN locality l ON l.key=e.locality_key 
                LEFT JOIN event_zones z ON z.event_key=e.key
                LEFT JOIN country c ON c.key = z.country_key
                LEFT JOIN region r ON r.key = z.region_key or c.key=r.country_key
                INNER JOIN locality lo ON lo.key = z.locality_key or lo.region_key = r.key
                INNER JOIN member m ON m.locality_key = lo.key
                WHERE m.key='$adminId' $request
                    
                UNION
                
                SELECT e.key as id, e.name as name, e.need_passport, e.need_transport, 
                e.need_prepayment, e.start_date, e.end_date, e.need_flight, e.need_tp, e.regend_date, e.info, e.private, 
                e.locality_key, e.author, l.name as locality_name, e.is_active, e.archived, re.regstate_key
                FROM event e  
                LEFT JOIN reg re ON re.event_key=e.key AND re.member_key='$adminId'
                LEFT JOIN locality l ON l.key=e.locality_key                    
                LEFT JOIN event_zones z ON z.event_key=e.key
                LEFT JOIN country c ON c.key = z.country_key
                LEFT JOIN region r ON r.key = z.region_key or c.key=r.country_key
                INNER JOIN locality lo ON lo.key = z.locality_key or lo.region_key = r.key
                INNER JOIN access a ON a.country_key=c.key or a.region_key=r.key or a.locality_key = lo.key
                WHERE a.member_key='$adminId' $request
                
                UNION 
                
                SELECT DISTINCT e.key as id, e.name as name, e.need_passport, e.need_transport, 
                e.need_prepayment, e.start_date, e.end_date, e.need_flight, e.need_tp, e.regend_date, e.info, e.private, 
                e.locality_key, e.author, l.name as locality_name, e.is_active, e.archived, re.regstate_key
                FROM event e   
                LEFT JOIN reg re ON re.event_key=e.key AND re.member_key='$adminId'
                LEFT JOIN locality l ON l.key=e.locality_key   
                INNER JOIN access a ON a.member_key='$adminId'
                INNER JOIN country c ON c.key = a.country_key
                INNER JOIN region r ON r.key = a.region_key or c.key=r.country_key
                INNER JOIN locality lo ON lo.key = a.locality_key or lo.region_key = r.key
                INNER JOIN event_zones z ON z.event_key=e.key AND (z.country_key=c.key or z.region_key=r.key or z.locality_key=lo.key)
                WHERE 1 $request
                    
                UNION
                
                SELECT e.key as id, e.name as name, e.need_passport, e.need_transport, 
                e.need_prepayment, e.start_date, e.end_date, e.need_flight, e.need_tp, e.regend_date, e.info, e.private, 
                e.locality_key, e.author, l.name as locality_name, e.is_active, e.archived, re.regstate_key
                FROM event e   
                LEFT JOIN reg re ON re.event_key=e.key AND re.member_key='$adminId'
                LEFT JOIN locality l ON l.key=e.locality_key      
                WHERE ((SELECT COUNT(*) FROM event_zones ez WHERE ez.event_key=e.key) = 0 OR e.author='$adminId') $request 
                ) q "
            );
           
            $events = array ();
            while ($row = $res->fetch_object()) $events[]=$row;       
            return $events;
        }
        else{
            return false;
        }
    }

    /*** ***/
    function db_getMembersList ($token){
        global $db;
        $_token = $this->esc($token);
        $user = $this->getUserByToken($_token);
        $active = 'active DESC';
        $userId = $this->getUserIdByLogin($user->login);

        $res=$this->query ("SELECT DISTINCT * FROM (SELECT m.key as id, m.name as name, IF (COALESCE(l.name,'')='', m.new_locality, l.name) as locality,
                        m.email as email, m.cell_phone as cell_phone, m.changed>0 as changed, m.admin_key as admin_key,
                        (SELECT name FROM member m2 WHERE m2.key=m.admin_key) as admin_name, m.active, m.locality_key,
                        DATEDIFF(CURRENT_DATE, STR_TO_DATE(m.birth_date, '%Y-%m-%d'))/365 as age, m.birth_date,
                        m.school_comment, m.college_comment, m.college_start, m.college_end, m.school_start, m.school_end,
                        m.comment, co.name as college_name, m.category_key,
                        CASE WHEN m.category_key='SC' OR m.category_key='PS' THEN 1 ELSE 0 END as school,
                        CASE WHEN m.school_start>0 THEN YEAR(NOW()) - m.school_start + 1 ELSE 0 END as school_level,
                        CASE WHEN m.college_start>0 THEN YEAR(NOW()) - m.college_start + 1 ELSE 0 END as college_level
                        FROM access as a                    
                        LEFT JOIN country c ON c.key = a.country_key
                        LEFT JOIN region r ON r.key = a.region_key OR c.key=r.country_key
                        INNER JOIN locality l ON l.region_key = r.key OR l.key=a.locality_key
                        INNER JOIN member m ON m.locality_key = l.key
                        LEFT JOIN college co ON co.key = m.college_key
                        WHERE a.member_key='$userId'
                        UNION 
                        SELECT m.key as id, m.name as name, IF (COALESCE(m.locality_key,'')='', m.new_locality, m.name) as locality,
                        m.email as email, m.cell_phone as cell_phone, m.changed>0 as changed, m.admin_key as admin_key,
                        (SELECT name FROM member m2 WHERE m2.key=m.admin_key) as admin_name, m.active, m.locality_key,
                        DATEDIFF(CURRENT_DATE, STR_TO_DATE(m.birth_date, '%Y-%m-%d'))/365 as age, m.birth_date,
                        m.school_comment, m.college_comment, m.college_start, m.college_end, m.school_start, m.school_end,
                        m.comment, co.name as college_name, m.category_key,
                        CASE WHEN m.category_key='SC' OR m.category_key='PS' THEN 1 ELSE 0 END as school,
                        CASE WHEN m.school_start>0 THEN YEAR(NOW()) - m.school_start + 1 ELSE 0 END as school_level,
                        CASE WHEN m.college_start>0 THEN YEAR(NOW()) - m.college_start + 1 ELSE 0 END as college_level
                        FROM member m
                        LEFT JOIN college co ON co.key = m.college_key
                        WHERE m.admin_key='$userId' and m.locality_key is NULL
                        ) q ORDER BY name ASC, $active ");

        $members = array ();
        while ($row = $res->fetch_object()) $members[]=$row;
        return $members;
    }

    /*** TEST PAGE ***/
    function testRequest(){
        $res = $this->query("SELECT * FROM event");
        $events = [];

        while ($row = $res->fetch_assoc()){
            $events[] = $row;
        }

        $f = FirePHP::getInstance(true);
        $f->fb($events);
        
        // there must be returned array with keys 'key' and 'name'
        return $events;
    }

    /*** SCHEDULE PAGE ***/
    function getSchedlueItems($token){
        $_token = $this->esc($token);

        return [];
    }
}