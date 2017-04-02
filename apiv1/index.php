<?php

require_once "../vendor/autoload.php";

use Coral\System\Router\Router;

$router = new Router();

try {
   $router->run(); 
} catch (Exception $ex) {
    echo json_encode(["error" => $ex->getMessage()]);
    exit();
}
