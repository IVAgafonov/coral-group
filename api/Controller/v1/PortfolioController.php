<?php

namespace Coral\Controller\v1;

class PortfolioController extends AbstractController implements ControllerInterface {

    public function __construct() {
        parent::__construct();
    }

    public function get() {
        switch ($this->method) {
            case 'GET':
                $items = $this->db->getArrays("SELECT * FROM `cg_about_items` WHERE active = 1 ORDER BY priority LIMIT 12");
                echo json_encode($items);
                break;
            default:
                header('HTTP/1.1 404 Not found');
                exit();
        }
    }

    public function items() {
        switch ($this->method) {
            case 'GET':
                $items = $this->db->getArrays("SELECT * FROM `cg_about_items` ORDER BY priority");
                echo json_encode($items);
                break;
            case 'POST':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("UPDATE `cg_about_items` SET active = ".($this->params['active'] ? $this->params['active'] : 0)." WHERE id = ".$this->db->quote($this->params['id']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                $i = 0;
                if (!empty($this->params['list'])) {
                    foreach ($this->params['list'] as $item) {
                        $i++;
                        $this->db->doQuery("UPDATE `cg_about_items` SET priority = ".$i." WHERE id = ".$item['id']);
                    }
                }
                echo json_encode(['status' => 'ok']);
                break;
            case 'UPDATE':
                if (!empty($this->params['itemTemplate']) && !empty($this->params['descTemplate'])) {
                    $this->db->doQuery("INSERT INTO `cg_about_items` (template_year, template_desc) ".
                        "VALUES (".$this->db->quote($this->params['itemTemplate']).",".$this->db->quote($this->params['descTemplate']).") ".
                        "ON DUPLICATE KEY UPDATE template_desc = ".$this->db->quote($this->params['descTemplate']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("DELETE FROM `cg_about_items` WHERE id = ".(int)$this->params['id']);
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