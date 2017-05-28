<?php

namespace Coral\Controller\v1;

class TranslateController extends AbstractController implements ControllerInterface {
    
    public function __construct() {
        parent::__construct();
    }

    public function get () {
        switch ($this->method) {
            case 'GET':
                if (!empty($this->params['locale'])) {
                    $translates = $this->db->getArrays("SELECT * FROM `cg_translate` WHERE `locale` = '".$this->params['locale']."'");
                    echo json_encode(array_combine(array_column($translates, 'template'), array_column($translates, 'translate')));
                } else {
                    echo json_encode(['error' => 'ErrorInvalidRequest']);
                }
                break;
            default:
        }
    }
    
    public function translate() {
        switch ($this->method) {
            case 'GET':
                $condition = '';
                if (!empty($this->params['locale'])) {
                    $condition = " WHERE t.`locale` = '".$this->params['locale']."'";
                }
                if (!empty($this->params['is_important'])) {
                    if ($condition == '') {
                        $condition = " WHERE t.`is_important` != 0";
                    } else {
                        $condition .= " AND t.`is_important` != 0";
                    }
                }

                if (!empty($this->params['filter'])) {
                    if ($condition == '') {
                        $condition = " WHERE (`t.template` LIKE '%" . $this->params['filter'] . "%' OR `t.translate` LIKE '%" . $this->params['filter'] . "%')";
                    } else {
                        $condition .= " AND (`t.template` LIKE '%" . $this->params['filter'] . "%' OR `t.translate` LIKE '%" . $this->params['filter'] . "%')";
                    }
                }
                $translates = $this->db->getArrays("SELECT t.*, em.id as translate_id FROM `cg_translate` t LEFT JOIN `cg_translate` em ON t.template = em.template AND t.locale <> em.locale ".$condition." ORDER BY t.is_important DESC, t.template");
                echo json_encode($translates);
                break;
            case 'POST':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("UPDATE `cg_translate` SET `is_important` = ".(int)$this->params['is_important']." WHERE id = ".$this->params['id']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok', 'is_important' => $this->params['is_important']]);
                        exit();
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'UPDATE':
                if (!empty($this->params['template']) && !empty($this->params['translate']) && !empty($this->params['locale'])) {
                    if (!isset($this->params['is_important'])) {
                        $this->params['is_important'] = false;
                    }

                    $this->db->doQuery("INSERT INTO `cg_translate` (`template`, `translate`, `locale`, `is_important`) ".
                        "VALUES (".$this->db->quote($this->params['template']).", ".$this->db->quote($this->params['translate']).", ".$this->db->quote($this->params['locale']).", ".
                        (int)$this->params['is_important'].") ON DUPLICATE KEY UPDATE translate = ".$this->db->quote($this->params['translate']));
                    echo json_encode(['status' => 'ok']);
                } else {
                    echo json_encode(['error' => 'ErrorInvalidRequest']);
                }
                break;
            case 'DELETE':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("DELETE FROM `cg_translate` WHERE id = ".(int)$this->params['id']);
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            default :
                header("HTTP/1.1 405 Method Not Allowed");
                throw new \Exception("Method not allowed");
        }
    }
}