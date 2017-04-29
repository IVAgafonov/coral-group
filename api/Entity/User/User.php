<?php

namespace Coral\Entity\User;

class User implements UserInterface {
    protected $id;
    protected $uname;
    protected $role;
    protected $email;
    
    public function getId()
    {
        return $this->id;
    }
    public function setId($id)
    {
        $this->id = $id;
    }
    public function getName()
    {
        return $this->uname;
    }
    public function setName($uname)
    {
        $this->uname = $uname;
    }
    public function getRole()
    {
        return $this->role;
    }
    public function setRole($role)
    {
        $this->role = $role;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function setEmail($email)
    {
        $this->email = $email;
    }
}

