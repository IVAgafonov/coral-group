<?php

namespace Coral\Controller\v1;

class MenuController extends AbstractController implements ControllerInterface {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function get() {
        switch ($this->method) {
            case 'GET':
                $menus = $this->db->getArrays("SELECT * FROM `cg_menu` WHERE active > 0 ORDER BY priority");
                foreach ($menus as $key => $menu) {
                    if ($menu['parent'] != 0) {
                        foreach ($menus as $keyIn => $menuIn) {
                            if ($menu['parent'] == $menuIn['id']) {
                                $menus[$keyIn]['child'][] = $menu;
                                unset($menus[$key]);
                                break;
                            }
                        }
                    }
                }
                echo json_encode($menus);
                break;
            default:
                header('HTTP/1.1 404 Not found');
                exit();
        }
    }

    public function getaslist() {
        switch ($this->method) {
            case 'GET':
                $menus = $this->db->getArrays("SELECT * FROM `cg_menu` WHERE active > 0 ORDER BY priority");
                echo json_encode($menus);
                break;
            default:
                header('HTTP/1.1 404 Not found');
                exit();
        }
    }

    public function menu() {
        switch ($this->method) {
            case 'GET':
                $menus = $this->db->getArrays("SELECT * FROM `cg_menu` ORDER BY priority");
                $menuList = array_combine(array_column($menus, 'id'), $menus);

                foreach ($menuList as $key => $menu) {
                    if ($menu['parent'] != 0) {
                        if (!isset($menu['child'])) {
                            $menu['child'] = [];
                        }
                        $menuList[$menu['parent']]['child'][] = $menu;

                        unset($menuList[$key]);
                    } else {
                        if (!isset($menuList[$key]['child'])) {
                            $menuList[$key]['child'] = [];
                        }
                    }
                }
                echo json_encode(array_values($menuList));
                break;
            case 'POST':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("UPDATE `cg_menu` SET active = ".($this->params['active'] ? $this->params['active'] : 0)." WHERE id = ".$this->db->quote($this->params['id']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                $i = 0;
                if (!empty($this->params['list'])) {
                    foreach ($this->params['list'] as $item) {
                        $i++;
                        $this->db->doQuery("UPDATE `cg_menu` SET priority = ".$i.", parent = 0 WHERE id = ".$item['id']);
                        if ($item['child']) {
                            foreach ($item['child'] as $child) {
                                $i++;
                                $this->db->doQuery("UPDATE `cg_menu` SET priority = ".$i.", parent = ".$item['id']." WHERE id = ".$child['id']);
                            }
                        }
                    }
                }
                echo json_encode(['status' => 'ok']);
                break;
            case 'UPDATE':
                if (!empty($this->params['name']) && !empty($this->params['uri'])) {
                    $this->db->doQuery("INSERT INTO `cg_menu` (name, uri, active, priority) ".
                        "VALUES (".$this->db->quote($this->params['name']).",".$this->db->quote($this->params['uri']).", 0, 999) ".
                        "ON DUPLICATE KEY UPDATE uri = ".$this->db->quote($this->params['uri']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("DELETE FROM `cg_menu` WHERE id = ".(int)$this->params['id']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            default:
                header('HTTP/1.1 405 Method not allowed');
                exit();
        }
    }
}