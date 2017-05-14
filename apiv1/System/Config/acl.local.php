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
    'Test' => [
        '' => [
            '' => ['guest', 'user', 'admin']
        ]
    ]
];