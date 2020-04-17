<template>
  <div id="app">
    <el-container>
      <el-header height="">
        <!-- Header content -->
        HELLO WORLD
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- Aside content -->
          <el-menu>
            <el-menu-item index="1">
              <router-link to="system" tag="span">导航一</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="region" tag="span">导航二</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="camera" tag="span">导航三</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main height="">
            <!-- Main content -->
            <!-- main -->
            <router-view></router-view>
          </el-main>
          <el-footer height="">
            <!-- Footer content -->
            HELLOWORLD©2020
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    line-height: 64px;
  }

  .el-aside {
    height: calc(100vh - 64px)
  }
</style>
