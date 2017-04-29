<?php

namespace Coral\Entity\User;

interface UserInterface {
    public function getId();
    public function setId($id);
    public function getRole();
    public function setRole($role);
    public function getName();
    public function setName($name);
    public function getEmail();
    public function setEmail($email);
}

