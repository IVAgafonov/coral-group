<?php

namespace Coral\Controller\v1;

class TranslateController extends AbstractController implements ControllerInterface {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function get() {
        switch ($this->method) {
            case 'GET':
                switch($_GET['locale']) {
                    case 'ru':
                        echo json_encode([
                            'Slide1' => 'Слайд 1',
                            'Slide2' => 'Слайд 2',
                            'Slide3' => 'Слайд 3',
                            'aboutMenu' => 'О КОМПАНИИ',
                            'serviceMenu' => 'УСЛУГИ',
                            'service1Menu' => 'УСЛУГА 1',
                            'service2Menu' => 'УСЛУГА 2',
                            'service3Menu' => 'УСЛУГА 3',
                            'newsMenu' => 'НОВОСТИ',
                        ]);
                        break;
                    case 'en':
                        echo json_encode([
                            'Slide1' => 'Slide 1',
                            'Slide2' => 'Slide 2',
                            'Slide3' => 'Slide 3',
                            'aboutMenu' => 'ABOUT',
                            'serviceMenu' => 'SERVICE',
                            'service1Menu' => 'SERVICE 1',
                            'service2Menu' => 'SERVICE 2',
                            'service3Menu' => 'SERVICE 3',
                            'newsMenu' => 'NEWS',
                        ]);                    
                        break;
                    default:
                        echo json_encode([
                        'Slide1' => 'Слайд 1',
                        'Slide2' => 'Слайд 2',
                        'Slide3' => 'Слайд 3',
                        ]);    
                }
                
                break;
            default :
                header("HTTP/1.1 405 Method Not Allowed");
                throw new \Exception("Method not allowed");
        }
    }
}