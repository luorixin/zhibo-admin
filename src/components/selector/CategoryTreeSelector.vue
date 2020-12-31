<template>
  <el-cascader
    v-model="result"
    @change="handleChange"
    filterable
    :placeholder="placeholder"
    :props="props"
    :options="dataList"
    :disabled="disabled"
    :clearable="clearable"
    v-loading="loading"
  >
  </el-cascader>
</template>

<script>
import * as categoryApi from '@/api/category.js'
import Util from '@/utils'
import mockData from '@/mock'
export default {
  name: 'CategoryTreeSelector',
  props: {
    placeholder: {
      type: String,
      default: '请选择分类'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      dataList: [],
      loading: false,
      result: this.defaultValue,
      totalCount: 0,
      props: { value: 'id', label: 'name', expandTrigger: 'hover' }
    }
  },
  created() {
    this.getDataList()
  },
  watch: {
    defaultValue(newVal, oldVal) {
      if (newVal === oldVal) return
      this.$nextTick(() => {
        if (newVal !== null) {
          this.result = newVal
        }
      })
    }
  },
  methods: {
    getDataList() {
      this.dataList = mockData.categoryTreeTest
      // this.loading = true
      // categoryApi
      //   .list()
      //   .then(data => {
      //     this.dataList = data.concat().filter(item => {
      //       return item.status === 1
      //     })
      //     this.totalCount = this.dataList.length
      //     if (this.dataList.length === 0) {
      //       this.result = this.$t('common.noResult')
      //       this.$emit('getResult', null)
      //     } else {
      //       if (
      //         this.result == -1 ||
      //         this.result == this.$t('common.noResult')
      //       ) {
      //         this.result = this.dataList[0].id //默认选中第一个。
      //         this.$emit('getResult', this.dataList[0])
      //       } else {
      //         this.handleChange(this.result)
      //       }
      //     }
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
    handleChange(val) {
      let result = this.dataList.find(item => item.id == val)
      this.$emit('getResult', result)
    }
  }
}
</script>

<style scoped>
.handle-select {
  width: 120px;
}

.handle-input {
  width: 200px;
  display: inline-block;
}
</style>
