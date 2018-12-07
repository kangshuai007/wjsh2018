<?php
class Join_model extends CI_Model{
    protected $tableName="cJoin";
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
    /**
     * 统计满足条件的总数
     * 
     * @param array $where 统计条件
     * @return int 返回记录条数
     */
    public function count()
    {
        return $this->db->count_all_results($this->tableName);
    }
     /**
     * 查询记录
     * 
     * @param array $where 查询条件，可使用模糊查询，如array('name LIKE' => "pp%") array('stat >' => '1')
     * @param int $limit 返回记录条数
     * @param int $offset 偏移量
     * @param string|array $sort 排序, 当为数组的时候 如：array('id DESC', 'report_date ASC')可以通过第二个参数来控制是否escape
     * @param array   模糊查询的 字段|条件值
     * @return array 未找到记录返回空数组
     */
    public function findAll($where = array(), $limit = 0, $offset = 0, $sort = NULL,$like=NULL)
    {   
       
        $this->db->from($this->tableName)->where($where);
        if($like !==NULL){
            $this->db->or_like($like);
        } 
        if($sort !== NULL) {
            if(is_array($sort)){
                foreach($sort as $value){
                    $this->db->order_by($value, '', false);
                }
            } else {
                $this->db->order_by($sort);
            }
        }
        if($limit > 0) {
            // 和数据库中的limit是相反的:"limit $offset,$limit"
            $this->db->limit($limit, $offset);
        }
 
        $query = $this->db->get();
 
        return $query->result_array();
    }
    /**
     * 删除记录
     * 
     * @param array $where 删除条件
     * @param int $limit 删除行数
     * @return boolean true删除成功 false删除失败
     */
    public function deleteAll($where = array(), $limit = NULL)
    {
        return $this->db->delete($this->tableName, $where, $limit);
    }
    /**
     * 
     * @param array $where 删除条件
     * @param string  $attributes 删除依据的字段名
     * @return boolean true 删除成功 false删除失败
     * 
     * 
     */
    public function delAll($where=array(),$attributes){
        return $this->db->where_in($attributes,$where)->delete($this->tableName);
    }

    /**
     * 更新表记录
     * 
     * @param array $attributes
     * @param array $where
     * @return bollean true更新成功 false更新失败
     */
    public function updateAll($attributes, $where = array())
    {
        return $this->db->where($where)->update($this->tableName, $attributes);
    }
    /**
     * 根据属性获取一行记录
     * @param array $where
     * @return array 返回一维数组，未找到记录则返回空数组
     */
    public function find($where = array())
    {
        $query = $this->db->from($this->tableName)->where($where)->limit(1)->get();
        return $query->row_array();
    }
 
}
