<?php

namespace Coral\Controller;

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
            case 'GET':
                var_dump($this->authService->auth('igoradm90@gmail.com', 'gainward'));
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