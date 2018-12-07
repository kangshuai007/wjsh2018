<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My_model extends CI_Model{
        protected $tableName="";
        public function  __construct(){
            parent::__construct();
            $this->load->database();
        }
        public function save($data){
            $res = $this->db->insert($this->tableName,$data);
             if($res){
                 return $this->db->insert_id();
            }else{
                 return false;
                }
         }

 }