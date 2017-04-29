<?php

namespace Coral\Controller\v1;

use Coral\Service\Auth\Auth;

class AuthController extends AbstractController implements ControllerInterface {
    
    protected $authService;
    public function __construct() {
        parent::__construct();
        $this->authService = new Auth($this->db);
    }
    
    public function login() {
        switch ($this->method) {
            case 'POST':
                $login = htmlspecialchars($_POST['login']);
                $credential = htmlspecialchars($_POST['credential']);
                $autorizedUser = $this->authService->login($login, $credential);
                if ($autorizedUser) {
                    echo json_encode(['auth' => true]);
                } else {
                    echo json_encode(['auth' => false, 'error' => ['message' => 'wrong email or password']]);
                }
                break;
            default :
                header("HTTP/1.1 405 Method Not Allowed");
                throw new \Exception("Method not allowed");
        }
    }
    
    public function logout() {
        switch ($this->method) {
            case 'GET':
                $this->authService->logout();
                break;
            default :
                header("HTTP/1.1 405 Method Not Allowed");
                throw new \Exception("Method not allowed");
        }
    }
    
    public function check() {
        switch ($this->method) {
            case 'GET':
                if ($this->authService->check()) {
                    echo json_encode(['auth' => true]);
                } else {
                     echo json_encode(['auth' => false, 'error' => ['message' => 'You are not authorized']]);
                }
                break;
            default :
                header("HTTP/1.1 405 Method Not Allowed");
                throw new \Exception("Method not allowed");
        }
    }
}