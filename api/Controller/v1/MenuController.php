<?php

namespace Coral\Controller\v1;

class MenuController extends AbstractController implements ControllerInterface {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function get() {
        switch ($this->method) {
            case 'GET':
                $menus = $this->db->getArrays("SELECT * FROM `cg_menu` WHERE `locale` = '".$this->params['locale']."'");
                $menuList = array_combine(array_column($menus, 'id'), $menus);
                foreach ($menuList as $key => $menu) {
                    if ($menu['parent'] != 0) {
                        $menuList[$menu['parent']]['child'][] = $menu;
                        unset($menuList[$key]);
                    }
                }
                echo json_encode($menuList);
                break;
            default:
                header('HTTP/1.1 404 Not found');
                exit();
        }

    }
}