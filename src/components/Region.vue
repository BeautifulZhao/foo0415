<template>
  <div class="region">
    
    <el-cascader-panel :options="options" size="mini" @change="setCurrRegion">
    </el-cascader-panel>

    <el-button type="primary" @click="showAddRegionPanel">添加区域</el-button>

    <el-transfer v-model="value" :data="resourceList" @change="addResource"></el-transfer>
    
    <el-button type="primary" @click="saveRegion">保存</el-button>
    <el-dialog
      title="添加区域"
      :visible.sync="dialogVisible"
      width="30%">
      
      <el-form :model="region" ref="form" label-width="80px">
        <el-form-item label="区域名称"
          prop="regionName"
          :rules="{
            required: true, message: '必填项', trigger: 'blur'
          }">
          <el-input v-model="region.regionName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRegion('form')">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>

  import axios from '../api/axios'

  export default {
    name: 'Region',
    data() {
      return {
        dialogVisible: false,
        region: {
          regionName: ''
        },
        regionName: '',
        options:[],
        regionList: [],
        value: [],
        resourceList: [
          {
            key: 0,
            label: '资源0'
          }
        ],
        currRegion: ''
      }
    },
    methods: {
      showAddRegionPanel() {
        this.dialogVisible = true;
      },
      setCurrRegion(val) {
        this.currRegion = val[0]
        console.log(this.currRegion)
      },
      addResource(val) {
        let category = '';
        let currRegion = this.currRegion;
        if(currRegion) {
          this.resourceList.forEach(item => {
            if(item.key == val) {
              category = item.label;
            }
          })
          // 应该查找，而不是自己拼接
          let resource = {
            category,
            indexCode: '',
            name: ''
          }

          this.regionList.forEach(item => {
            if(item.regionName === currRegion) {
              item.resources.push(resource);
            }
          })
        }
        // console.log(this.regionList)        
      },

      addRegion(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if(valid) {
            // 对话框隐藏
            _this.dialogVisible = false;
            let regionIndex = _this.getId();
            let regionName = _this.region.regionName;
            let regionType = '';
            let resources = [];
            _this.regionList.push({
              regionIndex,
              regionName,
              regionType,
              resources
            })
            _this.options.push({
              label: regionName,
              value: regionName
            })
            // 置空
            _this.region.regionName = '';
          }
        })
        console.log(this.options)
      },
      getId() {
        return Math.random().toString(36).substr(3);
      },
      saveRegion() {
        let _this = this;
        // 整理数据
        let isSave = true;
        this.regionList.forEach(item => {
          if(item.resources.length === 0) {
            isSave = false;
          }
        })
        if(isSave) {
          let json = {regionBases:this.regionList};
          console.log(json)
          // 发送请求
          axios({
            url:'region/resource/add',
            method: 'post',
            data: json
          }).then(res => {
            if(res.data.success) {
              _this.$message({
                message: '区域添加成功',
                type: 'success'
              })
            }
          })
        }
      },
      getRegion() {
        let _this = this;
        axios({
          url: 'region/list/all',
          method: 'post',
          data: {
            pageNo: 1,
            pageSize: 100
          }
        }).then(res => {
          if(res.data.success) {
            console.log(res.data)
            for(let item of res.data.data) {
              _this.options.push({
                label: item.regionName,
                value: item.regionName
              })
            }
          }
        })
      }
    },
    // created() {
      // get region
      // this.getRegion();

      // get resource list.
    //   let resourceType1 = {resourceType:'door'}
    //   let resourceType2 = {resourceType:'camera'}
    //   axios.all([
    //     axios({
    //       url:'resource/list/byType',
    //       method: 'post',
    //       data: resourceType1
    //     }),
    //     axios({
    //       url:'resource/list/byType',
    //       method: 'post',
    //       data: resourceType2,
    //     })
    //   ]).then((res1, res2) => {
    //     // 展示数据在列表1里面
    //     if(res1.data.success && res2.data.success) {
    //       // 待处理
    //     }
    //   }).catch(e => {
    //     console.log(e)
    //   })
    // }
  }
</script>

<style>
.region {
  display: flex;
}

.el-transfer {
  margin: 0 50px;
}

.el-scrollbar__wrap {
  overflow: hidden !important;
}

.el-cascader-panel {
  margin-right: 50px;
}

.el-button {
  align-self: flex-end;
}
</style>