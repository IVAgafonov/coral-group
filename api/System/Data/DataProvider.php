<?php

namespace Coral\System\Data;

class DataProvider implements DataProviderInterface {

    protected $db;
    protected $statement;

    public function __construct()
    {
        $config = array_merge(include __DIR__.'/../Config/db.local.php', include __DIR__."/../Config/db.global.php");
        if (empty($config['dbHost']) || empty($config['dbName']) || empty($config['dbUser']) || empty($config['dbPass'])) {
            throw new \Exception("Invalid database params");
        }
        $this->db = new \PDO("mysql:dbname=".$config['dbName'].";host=".$config['dbHost'].";charset=utf8", $config['dbUser'], $config['dbPass']);
        if (!$this->db) {
            throw new \Exception("Can't init data provider");
        }
    }

    public function getArrays($query)
    {
        $this->statement = $this->db->query($query);
        $result = $this->statement->execute();
        if ($result) {
            return $this->statement->fetchAll(\PDO::FETCH_ASSOC);
        }
        return false;
    }
    
    public function getObject($query, $object)
    {
        $this->statement = $this->db->query($query);
        $result = $this->statement->execute();
        if ($result) {
            $this->statement->setFetchMode(\PDO::FETCH_CLASS, $object);
            return $this->statement->fetch();
        }
        return false;
    }
    
    public function getInsertId() {
        return $this->db->lastInsertId();
    }
    
    public function getAffectedRows() {
        return $this->statement->rowCount();
    }

    public function quote($str) {
        return $this->db->quote($str);
    }

    public function getValue($query)
    {
        $this->statement = $this->db->query($query);
        return $this->statement;
    }
    public function doQuery($query)
    {
        $this->statement = $this->db->query($query);
        return $this->statement;
    }
}