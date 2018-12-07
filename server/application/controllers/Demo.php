<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo extends CI_Controller{
        function  __construct(){
            parent::__construct();
            $this->load->model('demo_model','admin');
          }
          // 添加数据
        public function add(){
                $data=[
                    'username'=>$this->input->post('userName'),
                    'password'=>md5(123456),
                    //默认为启用状态
                    'status'=>1,
                    'last_date'=>null,
                ];
                $insert_id= $this->admin->save($data);
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
}