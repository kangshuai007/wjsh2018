<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Video extends CI_Controller{
        function  __construct(){
            parent::__construct();
            $this->load->model('Video_model','video');
          }
                  //   上传缩略图

        public function upLoad(){ 
            // ini_set('open_basedir', './tmp/:/data/release/');
            $config['upload_path']='../../uploads/';
            // echo $config['upload_path'];
            // die;
            $config['allowed_types']='jpeg|gif|jpg|png';
            $config['file_name']=uniqid();
            // $config['max_size']     = 100;
            // $config['max_width']        = 1024;
            // $config['max_height']       = 768;
            $this->load->library('upload', $config);
            if ( ! $this->upload->do_upload('userfile'))
            {
                $error = array('error' => $this->upload->display_errors());
                $arr=array(
                    'code'=>201,
                    'msg'=>'上传失败',
                    'data'=>$error,
                );  
            }else{
                $info =$this->upload->data();
                $data=array(
                    'src'=>$info['full_path'],
                );
                $arr=array(
                    'code'=>200,
                    'msg'=>'上传成功',
                    'data'=>$data,
                );
            }
            $this->json($arr);
         }
         
          // 查询视频课程信息（小程序端输出）
         public  function  showVideo(){
              $type=$this->input->post('type');
              $page=$this->input->post('page');
              if(empty($type) || empty($page)){
                    $type=1;
                    $page=1;
              }
              $limit=5;
              $offset=($page-1)*$limit;
              $r=$this->video->findAll($where=array('type'=>$type), $limit, $offset, $sort = NULL);
              $arr=array(
                   'code'=>200,
                   'msg'=>'成功',
                   'type'=>$type,
                    'content'=>$r,
              );
              $this->json($arr);
         }
     //      后台添加课程信息
          public function addVideo(){
                 $url=$this->input->post('pic_src');
                 $u=str_replace('.html','',$url);
                 $arr=explode('/',$u);
                 $urls=array_pop($arr);
                 
               $data=[
                    'title'=>$this->input->post('title'),
                    'type'=>$this->input->post('type'),
                    'y_price'=>$this->input->post('yprice'),
                    'x_price'=>$this->input->post('xprice'),
                    'src'=>$urls,
                    'istop'=>$this->input->post('newsTop'),
                    'date'=>date("Y-m-d H:i",time()),
                    'hits'=>0,
                    'img_thumb'=>'1.jpg',
                    'aUrl'=>$this->input->post('pic_src'),
                    'classinfo'=>$this->input->post('classinfo'),
                    'classset'=>$this->input->post('classset'),
                    'cteacher'=>$this->input->post('cteacher')
                ];
                $insert_id= $this->video->save($data);
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
     //     更改置顶状态
         public function updateIstop(){
          
              $id=$this->input->post('id');
              $isTop=$this->video->find(array('id'=>$id));
              $c=$isTop['istop'];
              $r=$c==0?1:0;
              $res=$this->video->updateAll(array('istop'=>$r),array('id'=>$id));
              if($res){
                  $arr=array(
                      'code'=>200,
                      'msg'=>'置顶成功',
                  );
              }else{
                  $arr=array(
                      'code'=>201,
                      'msg'=>'置顶失败',
                  );
              }
              $this->json($arr);
          }
           //视频文件输出（后台）
        public function showVi(){
            
                $page=$this->input->get('page');
                $limit=$this->input->get('limit');
                $keyword=$this->input->get('keyword');
            
            $l=($page-1)*$limit;
            if($keyword){
                $video=$this->video->like('title',$keyword)->findAll($where=array(),$limit,$l,'date desc');
                
            }else{
                $video=$this->video->findAll($where=array(),$limit,$l,'date desc');
            }


            $c=$this->video->count();

            $arr=array(
                'code'=>200,
                'msg'=>'成功',
                'count'=>$c,
                'data'=>$video,
            );
            $this->json($arr);
        }
        public function delVideo(){
        
            $id=$this->input->post('videoId');
            $res=$this->video->deleteAll($where=array('id'=>$id));
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
            // 根据ID查询视频的内容输出（小程序端输出）
         public  function  showDetail(){
              $id=$this->input->post('id');
              $r=$this->video->find(array('id'=>$id));
              $arr=array(
                   'code'=>200,
                   'msg'=>'成功',
                   'classinfo'=>$r['classinfo'],
                   'classset'=>$r['classset'],
                   'cteacher'=>$r['cteacher'],
                    
              );
              $this->json($arr);
         }
  
      
       
}

