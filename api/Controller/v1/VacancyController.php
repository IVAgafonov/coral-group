<?php

namespace Coral\Controller\v1;

class VacancyController extends AbstractController implements ControllerInterface {

    public function __construct() {
        parent::__construct();
    }

    public function get() {
        switch ($this->method) {
            case 'GET':
                $langCondition = '';
                if (!empty($this->params['local']) && in_array(strtoupper($this->params['local']), ['RU', 'EN'])) {
                    $langCondition = "AND locale = '".strtoupper($this->params['local'])."'";
                }
                $items = $this->db->getArrays("SELECT * FROM `cg_vacancy` WHERE active = 1 $langCondition ORDER BY priority");
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
                $items = $this->db->getArrays("SELECT * FROM `cg_vacancy` ORDER BY priority");
                echo json_encode($items);
                break;
            case 'POST':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("UPDATE `cg_vacancy` SET active = ".($this->params['active'] ? $this->params['active'] : 0)." WHERE id = ".$this->db->quote($this->params['id']));
                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                $i = 0;
                if (!empty($this->params['list'])) {
                    foreach ($this->params['list'] as $item) {
                        $i++;
                        $this->db->doQuery("UPDATE `cg_vacancy` SET priority = ".$i." WHERE id = ".$item['id']);
                    }
                }
                echo json_encode(['status' => 'ok']);
                break;
            case 'UPDATE':
                if (
                    !empty($this->params['vacancy_name']) &&
                    !empty($this->params['date']) &&
                    !empty($this->params['locale']) &&
                    !empty($this->params['vacancy_desc']) &&
                    !empty($this->params['vacancy_require']) &&
                    !empty($this->params['vacancy_conditions']) &&
                    !empty($this->params['vacancy_addr']) &&
                    !empty($this->params['busy_type'])) {
                    $this->db->doQuery("INSERT INTO `cg_vacancy` (`vacancy_name`, `date`, `locale` ,`vacancy_desc`, `vacancy_require`, `vacancy_conditions`, `vacancy_addr`, `busy_type`) ".
                        "VALUES (".$this->db->quote($this->params['vacancy_name']).",".$this->db->quote($this->params['date']).", ".
                        $this->db->quote($this->params['locale']).",".$this->db->quote($this->params['vacancy_desc']).", ".
                        $this->db->quote($this->params['vacancy_require']).",".$this->db->quote($this->params['vacancy_conditions']).", ".
                        $this->db->quote($this->params['vacancy_addr']).",".$this->db->quote($this->params['busy_type']).") ON DUPLICATE KEY UPDATE ".
                        "`date` = ".$this->db->quote($this->params['date']).", ".
                        "`locale` = ".$this->db->quote($this->params['locale']).", ".
                        "`vacancy_desc` = ".$this->db->quote($this->params['vacancy_desc']).", ".
                        "`vacancy_require` = ".$this->db->quote($this->params['vacancy_require']).", ".
                        "`vacancy_conditions` = ".$this->db->quote($this->params['vacancy_conditions']).", ".
                        "`vacancy_addr` = ".$this->db->quote($this->params['vacancy_addr']).", ".
                        "`busy_type` = ".$this->db->quote($this->params['busy_type']));

                    if ($this->db->getAffectedRows()) {
                        echo json_encode(['status' => 'ok']);
                        exit();
                    }
                }
                echo json_encode(['error' => 'ErrorInvalidRequest']);
                break;
            case 'DELETE':
                if (!empty($this->params['id'])) {
                    $this->db->doQuery("DELETE FROM `cg_vacancy` WHERE id = ".(int)$this->params['id']);
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

    public function resume() {
        switch ($this->method) {
            case 'POST':
                if (!empty($this->params['fio']) && !empty($this->params['email']) && !empty($this->params['phone']) && !empty($this->params['job'])) {
                    $this->config['vacancyEmail'];

                    $file = $this->params['file']['tmp_name'];
                    $content = file_get_contents($file);
                    $content = chunk_split(base64_encode($content));
                    $uid = md5(uniqid(time()));
                    $filename = basename($file);

                    $message = "New resume: \r\n";
                    $message .= "Fio: ".$this->params['fio']."\r\n";
                    $message .= "E-mail: ".$this->params['email']."\r\n";
                    $message .= "Phone: ".$this->params['phone']."\r\n";

                    $header = "From: Coral-Group <info@coral-group.ru>\r\n";
                    $header .= "Reply-To: ".$this->config['vacancyEmail']."\r\n";
                    $header .= "MIME-Version: 1.0\r\n";
                    $header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";

                    $nmessage = "--".$uid."\r\n";
                    $nmessage .= "Content-type:text/plain; charset=iso-8859-1\r\n";
                    $nmessage .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
                    $nmessage .= $message."\r\n\r\n";
                    $nmessage .= "--".$uid."\r\n";
                    $nmessage .= "Content-Type: application/octet-stream; name=\"".$filename."\"\r\n";
                    $nmessage .= "Content-Transfer-Encoding: base64\r\n";
                    $nmessage .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
                    $nmessage .= $content."\r\n\r\n";
                    $nmessage .= "--".$uid."--";

                    if (mail($this->config['vacancyEmail'], "New resume (".$this->params['job'].")", $nmessage, $header)) {
                        echo json_encode(['status' => 'ok']);
                        return;
                    }
                }
                header('HTTP/1.1 400 Bad request');
                echo json_encode(['error' => 'InvalidParamsError']);
                exit();
                break;
            default:
                header('HTTP/1.1 405 Method not allowed');
                exit();
        }
    }
}