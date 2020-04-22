<template>
  <div class="system">
    <el-form :model="category" ref="form" label-width="80px">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="提供方"
              prop="abilityCategory"
              :rules="rule">
              <el-input v-model="category.abilityCategory"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="访问地址" 
              prop="abilityHost"
              :rules="rule">
              <el-input v-model="category.abilityHost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="save('form')">保存</el-button>
          </el-col>
        </el-row>
    </el-form>
    <el-table :data="categories" max-height="450">
      <el-table-column label="提供方" prop="abilityCategory"></el-table-column>
      <el-table-column label="访问地址" prop="abilityHost"></el-table-column>
    </el-table>
    
  </div>
</template>

<script>
  import axios from '../api/axios'
  export default {
    name: 'System',
    data() {
      return {
        category: {
          abilityCategory: '',
          abilityHost: '',
        },
        categories: [],
        rule: {
          required: true,
          message: '必选项',
          trigger: 'blur'
        }
      }
    },
    methods: {
      save(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if(valid) {
            // 请求
            let json = [_this.category]
            axios({
              url: 'config/add',
              method:'post',
              data: json,
            }).then(res => {
              if(res.data.success) {
                _this.getCategories();
                _this.category.abilityCategory = '';
                _this.category.abilityHost = '';
              }
            })
          }
        })
      },
      getCategories() {
        // 请求
        axios({
          url:'config/list/all',
          method: 'post'
        }).then(res => {
          console.log(res)
          // 列表展示
          this.categories = res.data.data;
        })
      }
    },
    created() {
      this.getCategories()
    }
  }
</script>

<style scoped>

.el-col {
  text-align: center;
}
.system {
  height: calc(100vh - 84px - 84px);
}
</style>