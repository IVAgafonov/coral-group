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
    'Abitems' => [
        'get' => [
            'GET' => ['guest']
        ],
        'items' => [
            '' => ['user']
        ]
    ],
    'Service' => [
        'get' => [
            'GET' => ['guest']
        ],
        'items' => [
            '' => ['user']
        ],
        'image' => [
            'GET' => ['guest'],
            '' => ['user']
        ],
        'icon' => [
            '' => ['user']
        ],
        'background' => [
            '' => ['user']
        ]
    ],
    'Portfolio' => [
        'get' => [
            'GET' => ['guest']
        ],
        'items' => [
            '' => ['user']
        ],
        'image' => [
            'GET' => ['guest'],
            '' => ['user']
        ],
    ],
    'News' => [
        'get' => [
            'GET' => ['guest']
        ],
        'items' => [
            '' => ['user']
        ],
        'image' => [
            'GET' => ['guest'],
            '' => ['user']
        ],
        'tagslinks' => [
            '' => ['user']
        ],
        'background' => [
            '' => ['user']
        ],
    ],
    'Newstags' => [
        'get' => [
            'GET' => ['guest']
        ],
        'items' => [
            '' => ['user']
        ]
    ],
    'Vacancy' => [
        'get' => [
            'GET' => ['guest']
        ],
        'items' => [
            '' => ['user']
        ],
        'resume' => [
            'POST' => ['guest']
        ]
    ],
    'Test' => [
        '' => [
            '' => ['guest']
        ]
    ]
];