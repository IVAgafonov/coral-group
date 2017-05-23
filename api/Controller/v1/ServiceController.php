<?php

namespace Coral\Controller\v1;

class ServiceController extends AbstractController implements ControllerInterface {

    public function __construct() {
        parent::__construct();
    }

    public function get() {
        switch ($this->method) {
            case 'GET':
                $items = $this->db->getArrays("SELECT serv.* FROM `cg_services` serv JOIN cg_menu menu ON serv.menu_id = menu.id WHERE menu.active > 0 ORDER BY serv.priority");
                echo json_encode($items);
                break;
            default:
                header('HTTP/1.1 404 Not found');
                return;
        }
    }

    public function items() {
        switch ($this->method) {
            case 'GET':
                $items = $this->db->getArrays("SELECT * FROM `cg_services` ORDER BY priority");
                echo json_encode($items);
                break;
            case 'POST':
                if (!empty($this->params['list'])) {
                    $i = 0;
                    foreach ($this->params['list'] as $item) {
                        $i++;
                        $this->db->doQuery("UPDATE `cg_services` SET priority = ".$i." WHERE id = ".$item['id']);
                    }
                }
                echo json_encode(['status' => 'ok']);
                break;
            case 'UPDATE':
                if (!empty($this->params['item']['nameTemplate']) && !empty($this->params['item']['descTemplate']) && !empty($this->params['item']['menuItemId'])) {
                    $this->db->doQuery("INSERT INTO `cg_services` (name_template, desc_template, menu_id) ".
                        "VALUES (".$this->db->quote($this->params['item']['nameTemplate']).",".$this->db->quote($this->params['item']['descTemplate']).", ".$this->params['item']['menuItemId'].") ".
                        "ON DUPLICATE KEY UPDATE desc_template = ".$this->db->quote($this->params['item']['descTemplate']).", menu_id = ".$this->params['item']['menuItemId']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("DELETE FROM `cg_services` WHERE id = ".(int)$this->params['id']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            default:
                header('HTTP/1.1 405 Method not allowed');
                return;
        }
    }

    public function icon() {
        switch ($this->method) {
            case 'POST':
                if (file_exists( __DIR__."/../../../images/services/".$this->params['file']['name'])) {
                    echo json_encode(['error' => 'FileAlreadyExists']);
                    return;
                }

                if (copy($this->params['file']['tmp_name'], __DIR__."/../../../images/services/".$this->params['file']['name'])) {
                    $this->db->doQuery("UPDATE `cg_services` SET icon = '".$this->params['file']['name']."' WHERE id = ".(int)$this->params['id']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    } else {
                        unlink( __DIR__."/../../../images/services/".$this->params['file']['name']);
                        header('HTTP/1.1 500 Internal server error');
                        return;
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (isset($this->params['id'])) {
                    $fileName = $this->db->getValue("SELECT icon FROM `cg_services` WHERE id = ".(int)$this->params['id']);
                    unlink( __DIR__."/../../../images/services/".$fileName);
                    $this->db->doQuery("UPDATE `cg_services` SET icon = '' WHERE id = ".(int)$this->params['id']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            default:
                header('HTTP/1.1 405 Method not allowed');
                return;
        }
    }

    public function image() {
        switch ($this->method) {
            case 'GET':
                if (!empty($this->params['idService'])) {
                    $items = $this->db->getArrays("SELECT * FROM `cg_service_photos` WHERE service_id = ".(int)$this->params['idService']." ORDER BY priority");
                    echo json_encode($items);
                } else {
                    echo json_encode(['error' => 'ErrorInvalidRequest']);
                }
                break;
            case 'POST':
                if (!empty($this->params['list'])) {
                    $i = 0;
                    foreach ($this->params['list'] as $item) {
                        $i++;
                        $this->db->doQuery("UPDATE `cg_service_photos` SET priority = ".$i." WHERE id = ".$item['id']);
                    }
                    echo json_encode(['status' => 'ok']);
                    return;
                } else {
                    if (file_exists( __DIR__."/../../../images/services/photo/".$this->params['file']['name'])) {
                        echo json_encode(['error' => 'FileAlreadyExists']);
                        exit();
                    }
                    if (copy($this->params['file']['tmp_name'], __DIR__."/../../../images/services/photo/".$this->params['file']['name'])) {
                        $this->db->doQuery("INSERT INTO `cg_service_photos` SET file_name = '".$this->params['file']['name']."', service_id = ".(int)$this->params['idService']);
                        if ($this->db->getAffectedRows()) {
                            echo json_encode(['status' => 'ok']);
                            return;
                        } else {
                            unlink( __DIR__."/../../../images/services/photo/".$this->params['file']['name']);
                            header('HTTP/1.1 500 Internal server error');
                            return;
                        }
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (isset($this->params['id'])) {
                    $fileName = $this->db->getValue("SELECT file_name FROM `cg_service_photos` WHERE id = ".(int)$this->params['id']);
                    unlink( __DIR__."/../../../images/services/photo/".$fileName);
                    $this->db->doQuery("DELETE FROM `cg_service_photos` WHERE id = ".(int)$this->params['id']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            default:
                header('HTTP/1.1 405 Method not allowed');
                return;
        }
    }
}