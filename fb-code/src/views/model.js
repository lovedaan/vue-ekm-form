export default [
  {
    "type": "input",
    "key": "name",
    "title": "姓名",
    "rule": [],
    "props": {
      "placeholder": "请输入城市"
    }
  },
  {
    "type": "select",
    "key": "城市",
    "title": "下拉选择",
    "props": {
      "placeholder": "请选择",
      "multiple": true
    },
    "options": [
      {
        "label": "广州",
        "val": "1"
      },
      {
        "label": "深圳",
        "val": "2"
      }
    ],
    "rule": [],
    "defaultValue": [
      "1",
      "2"
    ]
  }
]
