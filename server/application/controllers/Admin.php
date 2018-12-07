<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller{
        function  __construct(){
            parent::__construct();
            $this->load->model('admin_model','admin');
            $this->load->library('session');
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
        //查看管理员信息
        public function showAdmin(){
            $admin=$this->admin->findAll();
           
            if(empty($admin)){
                $count=0;

            }else{
                $count=$this->admin->count();
            }
            $arr=array(
                'code'=>200,
                'msg'=>'成功',
                'count'=>$count,
                'data'=>$admin,
            );
             $this->json($arr);
        }
        // 更改管理员状态
        public function updateStatus(){
           
                $id=$this->input->post('id');
                $r=$this->admin->findAll($where = array('id'=>$id), $limit = 0, $offset = 0, $sort = NULL);
    
             
                $status=$r[0]['status'];
              
                $status=$status==1?0:1;
                $data=array(
                     'status'=>$status,
                );
              
                $res=$this->admin->updateAll($data,array('id'=>$id));
                if($res){
                    $arr=array(
                        'code'=>200,
                        'msg'=>'更新状态成功',
                    );
                }else{
                    $arr=array(
                        'code'=>201,
                        'msg'=>'更新状态失败',
                    );
                }
                $this->json($arr);
            }
        //删除指定管理员信息
    public function delAdmin(){
        
            $id=$this->input->post('ids');
            $res=$this->admin->deleteAll($where=array('id'=>$id));
            if($res){
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
    //批量删除
    public function delAll(){
       
            $ids=$this->input->post('ids');
            $where=explode(',',$ids);
            $res=$this->admin->delAll($where,'id');
            if($res){
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
            $this-> json($arr);
        }
        //根据管理员身份查询出旧密码看是否匹配
    public function queryOldPwd(){
       
            $uName=$this->input->post('uName');
            $res=$this->admin->find($where=array('username'=>$uName));
            if($res){
              $arr=array(
                  'code'=>200,
                  'msg'=>'成功',
                  'data'=>$res,
              );
              $this->json($arr);
            }
        }
        // 修改密码
        public function changePwd(){
            
                $name=$this->input->post('aname');
                $pwd=md5($this->input->post('pwd'));
                $newpwd=md5($this->input->post('newpwd'));
                $d=array(
                    'username'=>$name,
                    'password'=>$pwd,
                );
                $w=array(
                    'password'=>$newpwd,
                );
                $r=$this->admin->updateAll($w,$d);
    
                if($r){
                    $arr=array(
                        'code'=>200,
                        'msg'=>'修改密码成功,即将返回登录页面',
                    );
                }else{
                    $arr=array(
                        'code'=>201,
                        'msg'=>'修改密码失败，即将返回登录页面',
                    );
                }
                $this->json($arr);
            }
              public  function login(){
                $username =$this->input->post('username');
                $pwd =$this->input->post('password');
                $user = $this->admin->find(array('username'=>$username));
                if($user){
                    if($user['status']==1){
                        if($user['password'] == md5($pwd)){
                            $_SESSION=array(
                                'username'=>$user['username'],
                                'uid'=>$user['id'],
                            );
                            // session('username',$user['username']);
                            // session('uid',$user['id']);
                            $n_date=date('Y-m-d H:i');
                            $up_date=$this->admin->updateAll(array('last_date'=>$n_date),array('username'=>$username));
                            if($up_date){
                                $arr=array(
                                    'code'=>200,
                                    'msg'=>'登录成功',
                                );
                            }


                        }else{
                            $arr=array(
                                'code'=>201,
                                'msg'=>'密码不正确',
                            );
                        }
                    }else{
                        $arr=array(
                            'code'=>202,
                            'msg'=>'用户已被禁用，请联系管理员',
                        );
                    }

                }else{

                    $arr=array(
                        'code'=>201,
                        'msg'=>'用户不存在',
                    );
                }
                $this->json($arr);
            }
         public function layout(){
            session_destroy();
             $arr=array(
                 'code'=>200,
                 'msg'=>'注销成功',
             );
             $this-> json($arr);
         }
    
    

}

