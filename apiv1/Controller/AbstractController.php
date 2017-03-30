<?php

namespace Coral\Controller;

/**
 * Class AbstractController
 * @package Coral\Controller
 */
class AbstractController implements ControllerInterface {

    protected $config;
    /**
     * AbstractController constructor.
     */
    public function __construct()
    {
        $local = include "../System/Config/config.local.php";
        var_dump($local);
        $this->config = array_merge_recursive($local, include "../System/Config/config.global.php");
        header("Content-Type: application/json");
        var_dump($this->config);
    }

    /**
     * @return mixed
     */
    public function index()
    {
        header("HTTP/1.1 404 Not found");
        echo json_encode(['error' => 'controller not found']);
    }
}
