<?php

return [
    'Auth' => [
        'login' => [
            'POST' => ['guest']
        ],
        'logout' => [
            'GET' => ['user']
        ],
        'check' => [
            'GET' => ['guest']
        ]
    ],
    'Translate' => [
        'get' => [
            '' => ['guest']
        ],
        'translate' => [
            '' => ['user']
        ]
    ],
    'Menu' => [
        'get' => [
            'GET' => ['guest']
        ],
        'getaslist' => [
            '' => ['user']
        ],
        'menu' => [
            '' => ['user']
        ]
    ],
    'Mpitems' => [
        'get' => [
            'GET' => ['guest']
        ],
        'items' => [
            '' => ['user']
        ],
        'itemsimage' => [
            '' => ['user']
        ]
    ],
    'Test' => [
        '' => [
            '' => ['guest']
        ]
    ]
];