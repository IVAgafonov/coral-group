<?php

namespace Coral\System\Data;

interface dataProviderInterface {
    public function getArrays($query);
    public function getValue($query);
    public function doQuery($query);
}