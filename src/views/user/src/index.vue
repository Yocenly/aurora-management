<template>
  <div class="user-container">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <!-- 用户的表单信息 -->
      <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-DD" v-model="form.birth"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="dialogVisible = true" size="small">+ 新增</el-button>
      <!-- form搜索区域 -->
      <div class="search-bar">
        <el-input placeholder="请输入用户信息" v-model="userForm.name"></el-input>
        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
      </div>
    </div>
    <div class="common-table">
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, updateUser, deleteUser } from '@/api'
export default {
  name: 'UserComp',
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
        ],
      },
      tableData: [],
      modelType: 0, // 0表示编辑,1表示新增
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: '',
      }
    }
  },
  methods: {
    // 提交用户表单
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表信息
              this.getList()
            })
          } else {
            updateUser(this.form).then(() => {
              // 重新获取列表信息
              this.getList()
            })
          }
          console.log(this.form);
          this.dialogVisible = false
          this.$refs.form.resetFields()
        }
      })
    },
    handleEdit (row) {
      this.modelType = 1;
      this.dialogVisible = true;
      this.form = { ...row }
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleAdd () {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    getList () {
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        console.log(data);
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    handlePage (val) {
      console.log(val);
      this.pageData.page = val;
      this.getList()
    },
    // 列表查询
    onSubmit () {
      this.getList()
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang='less' scoped>
@import "../style/index.less";
</style>
