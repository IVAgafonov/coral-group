<?php

namespace Coral\Controller\v1;

class NewsController extends AbstractController implements ControllerInterface {

    public function __construct() {
        parent::__construct();
    }

    public function get() {
        switch ($this->method) {
            case 'GET':
                $items = $this->db->getArrays("SELECT * FROM `cg_news` WHERE active > 0 ORDER BY priority");
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
                $items = $this->db->getArrays("SELECT * FROM `cg_news` ORDER BY priority");
                echo json_encode($items);
                break;
            case 'POST':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("UPDATE `cg_news` SET active = ".($this->params['active'] ? $this->params['active'] : 0)." WHERE id = ".$this->db->quote($this->params['id']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                if (!empty($this->params['list'])) {
                    $i = 0;
                    foreach ($this->params['list'] as $item) {
                        $i++;
                        $this->db->doQuery("UPDATE `cg_news` SET priority = ".$i." WHERE id = ".$item['id']);
                    }
                }
                echo json_encode(['status' => 'ok']);
                break;
            case 'UPDATE':
                if (!empty($this->params['item']['news_name']) && !empty($this->params['item']['date']) && !empty($this->params['item']['locale']) && !empty($this->params['item']['news_desc'])) {
                    $this->db->doQuery("INSERT INTO `cg_news` (`news_name`, `date`, `locale`, `news_desc`) ".
                        "VALUES (".$this->db->quote($this->params['item']['news_name']).", ".$this->db->quote($this->params['item']['date']).", ".
                        $this->db->quote($this->params['item']['locale']).", ".$this->db->quote($this->params['item']['news_desc']).") ON DUPLICATE KEY UPDATE ".
                        "`date` = ".$this->db->quote($this->params['item']['date']).", ".
                        "`locale` = ".$this->db->quote($this->params['item']['locale']).", ".
                        "`news_desc` = ".$this->db->quote($this->params['item']['news_desc']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (!empty($this->params['id'])) {
                    $photos = $this->db->getArrays("SELECT * FROM cg_news_photos WHERE news_id = ".(int)$this->params['id']);
                    foreach ($photos as $photo) {
                        unlink( __DIR__."/../../../images/news/photo/".$photo['file_name']);
                        $this->db->doQuery("DELETE FROM `cg_news_photos` WHERE id = ".$photo['id']);
                    }
                    $this->db->doQuery("DELETE FROM `cg_news` WHERE id = ".(int)$this->params['id']);
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
                if (!empty($this->params['idNews'])) {
                    $items = $this->db->getArrays("SELECT * FROM `cg_news_photos` WHERE news_id = ".(int)$this->params['idNews']." ORDER BY priority");
                    echo json_encode($items);
                } else {
                    echo json_encode(['error' => 'ErrorInvalidRequest']);
                }
                break;
            case 'POST':
                if (!empty($this->params['id']) && isset($this->params['active'])) {
                    $this->db->doQuery("UPDATE `cg_news_photos` SET active = ".($this->params['active'] ? $this->params['active'] : 0)." WHERE id = ".$this->db->quote($this->params['id']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                if (!empty($this->params['list'])) {
                    $i = 0;
                    foreach ($this->params['list'] as $item) {
                        $i++;
                        $this->db->doQuery("UPDATE `cg_news_photos` SET priority = ".$i." WHERE id = ".$item['id']);
                    }
                    echo json_encode(['status' => 'ok']);
                    return;
                } else {
                    if (file_exists( __DIR__."/../../../images/news/photo/".$this->params['file']['name'])) {
                        echo json_encode(['error' => 'FileAlreadyExists']);
                        return;
                    }
                    if (copy($this->params['file']['tmp_name'], __DIR__."/../../../images/news/photo/".$this->params['file']['name'])) {
                        $this->db->doQuery("INSERT INTO `cg_news_photos` SET file_name = '".$this->params['file']['name']."', news_id = ".(int)$this->params['idNews']);
                        if ($this->db->getAffectedRows()) {
                            echo json_encode(['status' => 'ok']);
                            return;
                        } else {
                            unlink( __DIR__."/../../../images/news/photo/".$this->params['file']['name']);
                            header('HTTP/1.1 500 Internal server error');
                            return;
                        }
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (isset($this->params['id'])) {
                    $fileName = $this->db->getValue("SELECT file_name FROM `cg_news_photos` WHERE id = ".(int)$this->params['id']);
                    unlink( __DIR__."/../../../images/news/photo/".$fileName);
                    $this->db->doQuery("DELETE FROM `cg_news_photos` WHERE id = ".(int)$this->params['id']);
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