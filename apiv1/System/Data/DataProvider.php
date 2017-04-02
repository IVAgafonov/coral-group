<?php

namespace Coral\System\Data;

class DataProvider implements DataProviderInterface {

    protected $db;

    public function __construct()
    {
        $config = array_merge(include __DIR__.'/../Config/db.local.php', include __DIR__."/../Config/db.global.php");
        if (empty($config['dbHost']) || empty($config['dbName']) || empty($config['dbUser']) || empty($config['dbPass'])) {
            throw new \Exception("Invalid database params");
        }
        $this->db = new \PDO("mysql:dbname=".$config['dbName'].";host=".$config['dbHost'], $config['dbUser'], $config['dbPass']);
        if (!$this->db) {
            throw new \Exception("Can't init data provider");
        }
    }

    public function getArrays($query)
    {
        $statement = $this->db->query($query);
        $result = $statement->execute();
        if ($result) {
            return $statement->fetchAll(\PDO::FETCH_ASSOC);
        }
        return false;
    }
    
    public function getObject($query, $object)
    {
        $statement = $this->db->query($query);
        $result = $statement->execute();
        if ($result) {
            $statement->setFetchMode(\PDO::FETCH_CLASS, $object);
            return $statement->fetch();
        }
        return false;
    }
    
    public function getValue($query)
    {
        return $this->db->query($query);
    }
    public function doQuery($query)
    {
        return $this->db->query($query);
    }
}