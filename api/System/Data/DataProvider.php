<?php

namespace Coral\System\Data;

class DataProvider implements DataProviderInterface {

    protected $db;
<<<<<<< HEAD
=======
    protected $statement;
>>>>>>> master

    public function __construct()
    {
        $config = array_merge(include __DIR__.'/../Config/db.local.php', include __DIR__."/../Config/db.global.php");
        if (empty($config['dbHost']) || empty($config['dbName']) || empty($config['dbUser']) || empty($config['dbPass'])) {
            throw new \Exception("Invalid database params");
        }
<<<<<<< HEAD
        $this->db = new \PDO("mysql:dbname=".$config['dbName'].";host=".$config['dbHost'], $config['dbUser'], $config['dbPass']);
=======
        $this->db = new \PDO("mysql:dbname=".$config['dbName'].";host=".$config['dbHost'].";charset=utf8", $config['dbUser'], $config['dbPass']);
>>>>>>> master
        if (!$this->db) {
            throw new \Exception("Can't init data provider");
        }
    }

    public function getArrays($query)
    {
<<<<<<< HEAD
        $statement = $this->db->query($query);
        $result = $statement->execute();
        if ($result) {
            return $statement->fetchAll(\PDO::FETCH_ASSOC);
=======
        $this->statement = $this->db->query($query);
        $result = $this->statement->execute();
        if ($result) {
            return $this->statement->fetchAll(\PDO::FETCH_ASSOC);
>>>>>>> master
        }
        return false;
    }
    
    public function getObject($query, $object)
    {
<<<<<<< HEAD
        $statement = $this->db->query($query);
        $result = $statement->execute();
        if ($result) {
            $statement->setFetchMode(\PDO::FETCH_CLASS, $object);
            return $statement->fetch();
=======
        $this->statement = $this->db->query($query);
        $result = $this->statement->execute();
        if ($result) {
            $this->statement->setFetchMode(\PDO::FETCH_CLASS, $object);
            return $this->statement->fetch();
>>>>>>> master
        }
        return false;
    }
    
    public function getInsertId() {
<<<<<<< HEAD
        
    }
    
    public function getAffectedRows() {
        
=======
        return $this->db->lastInsertId();
    }
    
    public function getAffectedRows() {
        return $this->statement->rowCount();
    }

    public function quote($str) {
        return $this->db->quote($str);
>>>>>>> master
    }

    public function getValue($query)
    {
<<<<<<< HEAD
        return $this->db->query($query);
    }
    public function doQuery($query)
    {
        return $this->db->query($query);
=======
        $this->statement = $this->db->query($query);
        $result = $this->statement->execute();
        if ($result) {
            $value = $this->statement->fetch(\PDO::FETCH_BOTH);
            return $value[0];
        }
        return false;
    }
    public function doQuery($query)
    {
        $this->statement = $this->db->query($query);
        return $this->statement;
>>>>>>> master
    }
}