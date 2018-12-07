<?php
defined('BASEPATH') OR exit('No direct script access allowed');
        $url='https://v.qq.com/x/page/h0609s94ov0.html';
        $u=str_replace('.html','',$url);
        $arr=explode('/',$u);
        $urls=array_pop($arr);
        echo $urls;

