<?php

namespace Coral\Service\Auth;

interface AuthInterface {
    public function login($login, $credential);
    public function logout();
}
