<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Join extends CI_Controller{
        function  __construct(){
            parent::__construct();
            $this->load->model('join_model','join');
          }
          // 添加加盟信息
        public function add(){
            $data=[
                'user'=>$this->input->post('name'),
                'tel'=>$this->input->post('tel'),
                'wx'=>null,
                'city'=>$this->input->post('city'),
                'j_date'=>date("Y-m-d H:i",time()),
                 ];
                $insert_id= $this->join->save($data);
                if($insert_id){
                    $arr=array(
                        'code'=>200,
                        'msg'=>'添加成功',
                    );
                }else{
                    $arr=array(
                        'code'=>201,
                        'msg'=>'添加失败',
                    );
                }
                $this->json($arr);
             }
               //查询试听报名信息
        public function showJoin(){
                
                $page=$this->input->get('page');
                $limit=$this->input->get('limit');
                $keyword=$this->input->get('keyword');
            
            $l=($page-1)*$limit;
            if($keyword){
                $admin=$this->join->findAll($where=array(),$limit,$l,'j_date desc',array('user'=>$keyword,'tel'=>$keyword,'city'=>$keyword,'xw'=>$keyword));
            }else{
                $admin=$this->join->findAll($where=array(),$limit,$l,'j_date desc',NULL);
            }
    
    
            $c=$this->join->count();
    
           
            $arr=array(
                'code'=>200,
                'msg'=>'成功',
                'count'=>$c,
                'data'=>$admin,
            );
            $this->json($arr);
        }

             //删除报名用户信息
        public function delJoin(){
            
                $id=$this->input->post('ids');
                $r=$this->join->deleteAll(array('id'=>$id));
                if($r){
                    $arr=array(
                        'code'=>200,
                        'msg'=>'删除成功',
                    );
                }else{
                    $arr=array(
                        'code'=>201,
                        'msg'=>'删除失败',
                    );
                }
                $this->json($arr);
            }
     
        
}

