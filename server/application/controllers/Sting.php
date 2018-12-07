<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sting extends CI_Controller{
        function  __construct(){
            parent::__construct();
            $this->load->model('Sting_model','sting');
          }
         
          // 添加试听信息
         public function add(){
            $data=[
                'name'=>$this->input->post('name'),
                'tel'=>$this->input->post('tel'),
                'type'=>$this->input->post('type'),
                'style'=>$this->input->post('style'),
                'class'=>$this->input->post('class'),
                'ydate'=>date("Y-m-d H:i",time()),
                 ];
                $insert_id= $this->sting->save($data);
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
             public function showUser(){
                
                    $page=$this->input->get('page');
                    $limit=$this->input->get('limit');
                    $keyword=$this->input->get('keyword');
                
                $l=($page-1)*$limit;
                if($keyword){
                    $admin=$this->sting->findAll($where=array(),$limit,$l,'ydate desc',array('name'=>$keyword));
                }else{
                    $admin=$this->sting->findAll($where=array(),$limit,$l,'ydate desc',NULL);
                }
        
        
                $c=$this->sting->count();
        
               
                $arr=array(
                    'code'=>200,
                    'msg'=>'成功',
                    'count'=>$c,
                    'data'=>$admin,
                );
                $this->json($arr);
            }

                 //删除报名用户信息
            public function delUser(){
                
                    $id=$this->input->post('ids');
                    $r=$this->sting->deleteAll(array('id'=>$id));
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

