<?php

namespace Coral\System\Acl;

class Acl {

    protected $permissions;
    protected $roles;
    
    public function __construct(array $roles)
    {
        if (empty($roles) || !is_array($roles)) {
            throw new \Exception("Can't init ACL");
        }
        $this->permissions = include __DIR__. "/../Config/acl.local.php";

        foreach ($roles as $role) {
            $this->roles[$role['id']] = ['role' => $role['role'], 'parent_id' => $role['parent_id']];
        }
    }
    
    public function checkPermissions($controller, $action, $method, $userRole) {
        if (empty($this->permissions[$controller])) {
            header("HTTP/1.1 400 Bad request");
            throw new \Exception('ACL: Controller not allowed');
        }
        
        $checkedAction = $action;
        if (empty($this->permissions[$controller][$checkedAction])) {
            $checkedAction = "";
            if (empty($this->permissions[$controller][$checkedAction])) {
                header("HTTP/1.1 400 Bad request");
                throw new \Exception('ACL: Action not allowed');
            }
        }
        
        $checkedMethod = $method;
        if (empty($this->permissions[$controller][$checkedAction][$checkedMethod])) {
            $checkedMethod = "";
            if (empty($this->permissions[$controller][$checkedAction][$checkedMethod])) {
                header("HTTP/1.1 400 Bad request");
                throw new \Exception('ACL: Method not allowed');
            }
        }

        $allowedGroups = $this->permissions[$controller][$checkedAction][$checkedMethod];
        
        while ($userRole) {
            $role = $this->roles[$userRole]['role'];
            if (in_array($role, $allowedGroups)) {
                return true;
            }
            $userRole = $this->roles[$userRole]['parent_id'];
        }

        header("HTTP/1.1 401 Unauthorized");
        throw new \Exception('ACL: Unauthorized');
    }
}