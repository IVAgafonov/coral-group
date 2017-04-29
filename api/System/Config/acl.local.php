<?php

return [
    'Auth' => [
        'login' => [
            'POST' => ['guest']
        ],
        'logout' => [
            'GET' => ['user', 'admin']
        ],
        'check' => [
            'GET' => ['guest', 'user', 'admin']
        ]
    ],
    'Translate' => [
        'get' => [
            'GET' => ['guest']
        ]
    ],
    'Menu' => [
        'get' => [
            'GET' => ['guest']
        ]
    ],
    'Test' => [
        '' => [
            '' => ['guest', 'user', 'admin']
        ]
    ]
];