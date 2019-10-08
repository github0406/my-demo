<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- rules属性传入约定的验证规则  ref属性用来给vue组件注册引用信息 -->
      <el-form :model="loginForm" :rules="loginRules" ref="abc" status-icon >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号！" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input  v-model="loginForm.code" placeholder="请输入验证码！" style="width:236px;margin-right:10px;"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  // 定义Vue中使用的属性(数据)
  data () {
    // 申明校验
    const checkMobile = (rule, value, callback) => {
    // 校验手机号 开头是1   第二个是3-9   之后9个都是数字d{9}
      // 输入错误返回一个错误提示return
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号输入有误'))
      // 输入正确直接调用
      callback()
    }
    return {
      // 表单对象数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单验证数据
      loginRules: {
        // mobile，code是 prop属性设置的需校验的字段名
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 自定义校验手机号
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位数', trigger: 'blur' }
        ]
      }
    }
  },
  // 写一个方法对整个表单验证
  methods: {
    // 登录按钮的绑定的方法
    login () {
      // 整体验证
      // valiate()是form表单的一个验证方法--valid是validate()方法的一个参数
      this.$refs.abc.validate((valid) => {
        if (valid) {
          // 请求登录接口 ---- loginForm: {mobile: '13911111111',code: '246810'},
          // 请求成功调用then    失败调用catch
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
            // res 是响应对象 包含响应主体
            console.log(res.data)
            this.$router.push('/')
          }).catch(() => {
            // 消息提示message组件提供的方法
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }

  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.my-card {
  position: absolute;
  width: 400px;
  height: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
img {
  display: block;
  width: 200px;
  margin: 0 auto;
}
</style>
