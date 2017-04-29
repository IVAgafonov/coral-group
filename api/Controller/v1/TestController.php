<?php

namespace Coral\Controller\v1;

use Coral\Service\Auth\Auth;

class TestController extends AbstractController implements ControllerInterface {
    
    protected $authService;
    public function __construct() {
        parent::__construct();
        $this->authService = new Auth($this->db);
    }
    
    public function login() {
        switch ($this->method) {
            case 'POST':
                break;
            default :
                header("HTTP/1.1 405 Method Not Allowed");
                throw new \Exception("Method not allowed");
        }
    }
    
    public function logout() {
        switch ($this->method) {
            case 'GET':
                break;
            default :
                header("HTTP/1.1 405 Method Not Allowed");
                throw new \Exception("Method not allowed");
        }
    }
}