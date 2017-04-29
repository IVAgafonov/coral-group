<?php

namespace Coral\System\Router;

use Coral\System\Data\DataProvider;
use Coral\Entity\User\User;
use Coral\System\Acl\Acl;

class Router {

    protected $controllerNameSpace = "Coral\\Controller\\";
    protected $apiVersion;
    protected $controller;
    protected $action;
    protected $params;
    protected $db;
    protected $user;
    protected $method;

    public function __construct()
    {
        session_start();
        header("Content-Type: application/json");
        $this->action = 'index';
        $this->controller = 'Index';
        $this->db = new DataProvider();
        $this->acl = new Acl($this->db->getArrays("SELECT * FROM cg_roles"));
        $this->method = strtoupper($_SERVER['REQUEST_METHOD']);

        if (!empty($_SESSION['userId'])) {
            $userId = (int)$_SESSION['userId'];
            $this->user = $this->db->getObject("SELECT * FROM `cg_users` WHERE id = ".$userId."", User::class);
        }
        if (!$this->user) {
            $this->user = new User();
            $this->user->setName('guest');
            $this->user->setRole(1);
        }
    }

    public function run()
    {
        $this->dispatch();
        $this->controllerInit();
    }

    protected function dispatch()
    {
        $path = explode("/", $_SERVER['PATH_INFO']);
        array_shift($path);
        if (is_array($path) && count($path) > 1) {
            if (!empty($path)) {
                $this->apiVersion = strtolower(array_shift($path));
            }
            if (!empty($path)) {
                $this->controller = ucfirst(strtolower(array_shift($path)));
            }
            if (!empty($path)) {
                $this->action = strtolower(array_shift($path));
            }
        }

    }

    protected function controllerInit()
    {
        $controllerWithNamespace = $this->controllerNameSpace.$this->apiVersion."\\".$this->controller."Controller";
        if (class_exists($controllerWithNamespace)) {
            $controller = new $controllerWithNamespace();
            if (method_exists($controller, $this->action)) {
                $action = $this->action;
                if ($this->acl->checkPermissions($this->controller, $this->action, $this->method, $this->user->getRole())) {
                    $controller->setMethod($this->method);
                    $controller->setUser($this->user);
                    $this->params = $this->getParams();
                    $controller->setParams($this->params);
                    $controller->$action();
                }
            } else {
                header("HTTP/1.1 404 Not found");
                throw new \Exception('Action not found');
            }
        } else {
            header("HTTP/1.1 404 Not found");
            throw new \Exception('Controller not found');
        }
        return true;
    }
    

    private function getParams()
    {
        $this->params = [];
        switch($this->method) {
            case 'GET':
                $this->params = $_GET;
                break;
            case 'POST':
                if (empty($_POST)) {
                    $_POST = (array)json_decode(trim(file_get_contents('php://input')), true);
                }
                $this->params = $_POST;
                break;
            default:
                $this->params = (array)json_decode(trim(file_get_contents('php://input')), true);
        }
        return $this->params;
    }
}
