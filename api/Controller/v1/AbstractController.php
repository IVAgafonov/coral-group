<?php

namespace Coral\Controller\v1;

use Coral\System\Acl\Acl;
use Coral\System\Data\DataProvider;

/**
 * Class AbstractController
 * @package Coral\Controller
 */
abstract class AbstractController implements ControllerInterface {

    protected $config;
    protected $method;
    protected $user;
    protected $params = [];
    protected $db;
    /**
     * AbstractController constructor.
     */
    public function __construct()
    {
        $this->config = array_merge(include __DIR__.'/../System/Config/config.local.php', include __DIR__."/../System/Config/config.global.php");
        $this->db = new DataProvider();
    }

    public function setMethod($method)
    {
        $this->method = $method;
    }

    public function getMethod()
    {
        return $this->method;
    }

    public function setParams($params)
    {
        $this->params = $params + $this->params;
    }

    public function getParams()
    {
        return $this->params;
    }
    
    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }
    /**
     * @return mixed
     */
    public function index()
    {
        header("HTTP/1.1 404 Not found");
        throw new \Exception('Controller not found');
    }
}
