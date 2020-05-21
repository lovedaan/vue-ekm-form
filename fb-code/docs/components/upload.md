# upload
> 图片上传组件 

## type值
`upload`

## 默认值
条件  | 默认值
:---- | :----
单图 | ''
多图 | []

### props属性配置
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
action | String | 必填 | 上传的地址
listType | String | picture-card | 文件列表展示的类型(text/picture/picture-card)
mimeType | Array(String) | ['jpeg','png','gif'] | 文件格式，MIME值image/后面那部分(v2.3.10+)
drag | Boolean | false | 是否支持拖拽上传，可拖拽模式下为单图模式，即single为true
single | Boolean | false | 是否单图模式
multiple | Boolean | false | 是否可同时选择多张图片上传（单图模式下该配置无效）
maxSize | Number | 无 | 图片最大尺寸限制，默认无限制
limit | Number | -1 (<= 0的情况下视作无限制) | 多图模式图片数限制
showDelay | Number | 0 | 文件上传成功后多少ms显示图片<font color=red>（接口返回图片路径时，资源可能还没有从缓存目录转移到对应路径）</font>
urlKey | String | 'url' | 返回图片url的字段名称。访问路径为res.data[urlKey]
codeKey | String | 默认为code | 文件上传接口状态码字段
codeSuccessValue | String/Number | 默认为'100' | 文件上传成功状态值

### props函数配置
除以下参数特殊之外，其它参数请参考element-ui 1.4.13版本Upload 组件文档

名称  | 参数 | 返回值 | 说明
:---- | :---- | :---- | :----
getUrlMethod | Function(res.data) | 无 | 比urlKey更灵活的获取图片url的方法
onSuccess | Function | - | 覆盖默认onSuccess回调，因此不建议使用
onRemove | Function | -  | 覆盖默认onRemove回调，不建议使用
onFail | Function(res.data) | -  | 文件上传接口返回内置错误码时的回调（v2.4.1+）
beforeUpload | Function(file, fileList) | - |  若返回 false 或 reject的Promise，停止上传。覆盖默认beforeUpload回调，不建议使用。
beforeRemove | Function(file, fileList) | 无 | 点击图片蒙层上的删除按钮时触发。若返回 false 或 reject的Promise，则停止删除。在beforeUpload中阻止上传的图片不会触发该钩子。

### 文件上传接口要求

所有的文件上传接口返回的数据都要求为以下格式：

```json
{
  data: xxx
  [codeKey]: [codeSuccessValue]
  [resultMsgKey]: XXX
}
```

#### 示例：
```javascript
  key: 'upload_select_multiple_file',
  title: '选择上传（多文件）',
  type: 'upload',
  editable: true,
  slots: {
    tip: (<div class="el-upload__tip" slot="tip">最多选择4张图片</div>)
  },
  props: {
    disabled: true,
    action: '/retail-admin/upload',
    name: 'file',
    codeKey: 'resultCode',
    codeSuccessValue: '100',
    urlKey: 'url',
    showDelay: 300,
    limit: 4,
    multiple: true,
    getUrlMethod(data) {
      return JSON.parse(data).fileData.url
    },
    beforeRemove(file, fileList) {
      return new Promise((resolve, reject) => {
        this.$confirm('确认删除吗', '提示', {
          type: 'warning'
        }).then(() => {
          resolve()
        }).catch(() => {
          reject(new Error('取消删除'))
        })
      })
    }
  },
  rule: [{
    required: true,
    type: 'array',
    message: '请上传图片'
  }]
```

### 插槽

名称  | 说明
:---- | :---- | :----
trigger | 触发文件选择，拖拽模式该插槽无效
tip | 插入图片显示器的提示内容

#### 示例：
```
{
  key: 'upload_drag_file',
  title: '拖拽上传',
  type: 'upload',
  slots: {
    tip: (<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>)
  },
  props: {
    action: '/retail-admin/upload',
    showFileList: false,
    name: 'file',
    drag: true,
    codeKey: 'resultCode',
    codeSuccessValue: '100',
    urlKey: 'url',
    showDelay: 300,
    getUrlMethod(data) {
      return JSON.parse(data).fileData.url
    }
  },
  rule: [{
    type: 'string',
    required: true,
    message: '请上传图片'
  }]
}
```