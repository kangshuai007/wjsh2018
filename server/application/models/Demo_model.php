<?php
class Demo_model extends My_model{
    protected $tableName="cAdmin";
    public function  __construct(){
        parent::__construct();
        $this->load->database();
    }

}