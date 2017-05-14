<?php

namespace Coral\Service\Auth;

class Auth implements AuthInterface {
    
    protected $db;
    
    public function __construct($db) {
        $this->db = $db;
    }
    
    public function login($login, $credential) {
        $userData = $this->db->getArrays("SELECT * FROM `cg_users` WHERE email = '".$login."'");
        if (!empty($userData[0])) {
            if (md5($credential) == $userData[0]['credential']) {
                $_SESSION['userId'] = $userData[0]['id'];
                return $userData[0];
            }
        }
        return false;
    }
    
    public function logout() {
        unset($_SESSION['userId']);
    }
    
    public function check() {
        if (!empty($_SESSION['userId'])) {
            return true;
        } else {
            return false;
        }
    }
}
