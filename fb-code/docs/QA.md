## render函数中使用form-build报错提示

  如果你使用了[vue-jsx语法解释器](https://github.com/vuejs/jsx)来渲染form-build，某些版本针对model属性绑定会有bug。
  类似如下：
  ```javascript
  render() {
    return (
      <el-form model={this.model} nativeOnSubmit={this.submit}>
        <el-form-item prop='name' label='姓名'>
          <el-input vModel={this.model.name} />
        </el-form-item>
        <el-form-item>
          <el-button type='primary' nativeType='submit'>
            提交
          </el-button>
        </el-form-item>
      </el-form>
    )
  }
  ```
  提示报错：
  ```
  vue.runtime.esm.js?2b0e:619 [Vue warn]: Invalid handler for event "input": got undefined

found in

---> <ElForm> at packages/form/src/form.vue
       <Home>
         <App>
           <Root>
  ```
  其实是 `model={this.model}`绑定失败。具体方案和解决办法查看[官方相关issue](https://github.com/vuejs/jsx/issues/49)
    