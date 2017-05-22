<?php

namespace Coral\System\Data;

class DataProvider implements DataProviderInterface {

    protected $db;
<<<<<<< HEAD
<<<<<<< HEAD
=======
    protected $statement;
>>>>>>> master
=======
    protected $statement;
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842

    public function __construct()
    {
        $config = array_merge(include __DIR__.'/../Config/db.local.php', include __DIR__."/../Config/db.global.php");
        if (empty($config['dbHost']) || empty($config['dbName']) || empty($config['dbUser']) || empty($config['dbPass'])) {
            throw new \Exception("Invalid database params");
        }
<<<<<<< HEAD
<<<<<<< HEAD
        $this->db = new \PDO("mysql:dbname=".$config['dbName'].";host=".$config['dbHost'], $config['dbUser'], $config['dbPass']);
=======
        $this->db = new \PDO("mysql:dbname=".$config['dbName'].";host=".$config['dbHost'].";charset=utf8", $config['dbUser'], $config['dbPass']);
>>>>>>> master
=======
        $this->db = new \PDO("mysql:dbname=".$config['dbName'].";host=".$config['dbHost'].";charset=utf8", $config['dbUser'], $config['dbPass']);
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842
        if (!$this->db) {
            throw new \Exception("Can't init data provider");
        }
    }

    public function getArrays($query)
    {
<<<<<<< HEAD
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
=======
        $this->statement = $this->db->query($query);
        $result = $this->statement->execute();
        if ($result) {
            return $this->statement->fetchAll(\PDO::FETCH_ASSOC);
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842
        }
        return false;
    }
    
    public function getObject($query, $object)
    {
<<<<<<< HEAD
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
=======
        $this->statement = $this->db->query($query);
        $result = $this->statement->execute();
        if ($result) {
            $this->statement->setFetchMode(\PDO::FETCH_CLASS, $object);
            return $this->statement->fetch();
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842
        }
        return false;
    }
    
    public function getInsertId() {
<<<<<<< HEAD
<<<<<<< HEAD
        
    }
    
    public function getAffectedRows() {
        
=======
        return $this->db->lastInsertId();
    }
    
    public function getAffectedRows() {
=======
        return $this->db->lastInsertId();
    }
    
    public function getAffectedRows() {
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842
        return $this->statement->rowCount();
    }

    public function quote($str) {
        return $this->db->quote($str);
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842
    }

    public function getValue($query)
    {
<<<<<<< HEAD
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
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842
    }
}