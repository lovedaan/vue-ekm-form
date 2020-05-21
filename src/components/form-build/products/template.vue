<template>
  <div class="comp-products-table">
    <el-form-item prop="choices" :rules="rules.choices" class="choices">
      <el-checkbox-group v-model="curExtraProperty" @change="handlePropsChange">
        <el-checkbox v-for="item in choices" :key="item.value" :label="item.value" :disabled="disabled">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item prop="products" :rules="rules.products">
      <el-table :data="curProducts">
        <el-table-column label="名称">
          <template slot-scope="{row}">
            <el-input v-model="row.name" :disabled="disabled" @change="handleProductsChange"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="成本价">
          <template slot-scope="{row}">
            <el-input v-model="row.price" :disabled="disabled" @change="handleProductsChange"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="{row}">
            <el-input v-model="row.store" :disabled="disabled" @change="handleProductsChange"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="规格" v-if="hasSize">
          <template slot-scope="{row}">
            <el-input v-model="row.size" :disabled="disabled" @change="handleProductsChange"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="颜色" v-if="hasColor">
          <template slot-scope="{row}">
            <el-input v-model="row.color" :disabled="disabled" @change="handleProductsChange"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button :disabled="disabled" @click="deleteRow(row.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-button :disabled="disabled" class="add-btn" type="primary" @click="addRow">添加</el-button>
  </div>
</template>
<script>
import { isEmpty } from '@/utils'
export default {
  name: 'products-table',
  data() {
    return {
      curExtraProperty: [], // 额外属性
      
      curProducts: [],

      choices: [{
        label: '含"规格"属性',
        value: 'size'
      }, {
        label: '含"颜色"属性',
        value: 'color'
      }],

      rules: {
        choices: {
          required: true,
          validator: (rule, value, callback) => {
            value = this.curExtraProperty
            if (value instanceof Array && value.length) {
              callback()
            } else {
              callback(new Error('至少选一项商品属性'))
            }
          }
        },
        products: {
          required: true,
          validator: (rule, value, callback) => {
            value = this.curProducts
            if (value instanceof Array && value.length) {
              let valid = value.every(val => {
                for (let key in val) return !isEmpty(val[key])
              })
              valid ? callback() : callback(new Error('请填写完整商品属性值'))
            } else {
              callback(new Error('请至少添加1个商品'))
            }
          }
        }
      }
    }
  },
  props: {
    value: {
      type: Array,
      default: () => [[], []]
    },
    rule: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val, oldVal) {
      let [extraProperties, products] = val instanceof Array ? val : []
      if (!extraProperties && !products) return
      if (extraProperties === this.curExtraProperty && products === this.curProducts) return
      this.curExtraProperty = extraProperties
      this.curProducts = products
    }
  },
  computed: {
    hasSize() {
      return this.curExtraProperty && this.curExtraProperty.includes('size')
    },
    hasColor() {
      return this.curExtraProperty && this.curExtraProperty.includes('color')
    }
  },
  methods: {
    deleteRow(index) {
      this.curProducts.splice(index, 1)
      this.handleProductsChange()
    },
    addRow() {
      this.curProducts.push({
        name: '',
        price: '',
        store: '',
        size: '',
        color: ''
      })
      this.handleProductsChange()
    },
    handlePropsChange() {
      console.log('handlePropsChange')
      this.$emit('input', [this.curExtraProperty, this.curProducts])
    },
    handleProductsChange() {
      console.log('handleProductsChange')
      this.$emit('input', [this.curExtraProperty, this.curProducts])
    }
  }
}
</script>
<style>
.comp-products-table .add-btn {
  margin-top: 20px;
}
.comp-products-table .choices {
  margin-bottom: 22px;
}
</style>
