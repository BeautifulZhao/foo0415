<template>
  <div class="system">
    <el-form :model="category" ref="form" label-width="80px" :rules="rules">
      <el-button type="primary" @click="addCategoryItem">add</el-button>
      <el-button type="primary" @click="save('form')">save</el-button>
      <el-form-item
        v-for="(item, index) in category.item" :key="index">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="提供方"
              :prop="'item.' + index+ '.abilityCategory'"
              :rules="{
                required: true, message: '必须项', trigger: 'blur'
              }">
              <el-input :placeholder="index" v-model="item.abilityCategory"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="访问地址" 
              :prop="'item.' + index + '.abilityHost'"
              :rules="{
                required: true, message: '必选项', trigger: 'blur'
              }">
              <el-input placeholder="" v-model="item.abilityHost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" v-show="index !== 0"
              @click="rmCategoryItem(index)"
            >删除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table :data="categories" max-height="450">
      <el-table-column label="提供方" prop="abilityCategory"></el-table-column>
      <el-table-column label="访问地址" prop="abilityHost"></el-table-column>
    </el-table>
    
  </div>
</template>

<script>
  import {system} from '../data/data'
  export default {
    name: 'System',
    data() {
      return {
        category: {item:[
          {
            'abilityCategory': '',
            'abilityHost': ''
          }
        ]},
        categories: []
      }
    },
    methods: {
      addCategoryItem() {
        if(this.category.item.length < 5)
          this.category.item.push({'email':'', 'email': ''})
      },
      rmCategoryItem(i) {
        this.category.item.splice(i, 1)
      },
      save(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if(valid) {
            // 请求
            _this.categories.push(...(_this.category.item.splice(0)))
            _this.category.item = new Array({
              'abilityCategory': '',
              'abilityHost': ''
            })
          } else {
            return false;
          }
        })
       
      }
    },
    created() {
      // 请求
      this.categories = system
    }
  }
</script>

<style scoped>
.el-input {
  width: 270px;
}
.el-col {
  text-align: center;
}
.system {
  height: calc(100vh - 84px - 84px);
}
</style>