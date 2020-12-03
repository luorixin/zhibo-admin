<template>
  <div class="mainWrapper">
    <div class="page_title">
      <div class="row">
        <div class="client-row">
          <h1>{{ $t('material.title') }}</h1>
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <div class="main-tool">
        <el-input
          :placeholder="$t('common.search')"
          v-model="formInline.name"
          class="input-search"
          @input="handleName"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleName(formInline.name)"
          ></el-button>
        </el-input>
        <div class="main-opt">
          <el-button
            icon="fa fa-upload"
            type="primary"
            @click="handleUpload"
            :disabled="isUpload || loading"
            >{{ $t('material.upload') }}</el-button
          >
        </div>
      </div>
      <div class="main-table">
        <el-table
          :data="currentDatas"
          border
          class="table"
          ref="table"
          v-loading="loading"
          header-row-class-name="main-table"
        >
          <el-table-column prop="name" :label="$t('material.name')">
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('material.createTime')"
            :formatter="dateFormater"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="optTime"
            :label="$t('material.optTime')"
            :formatter="dateFormater"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="categoryFirst"
            :label="$t('material.categoryFirst')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="categorySec"
            :label="$t('material.categorySec')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="categoryThird"
            :label="$t('material.categoryThird')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="preview"
            :label="$t('material.preview')"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            :label="$t('material.opt')"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <div
                class="fa-icon-box"
                @click="handleEdit(scope.$index, scope.row)"
              >
                <i class="fa fa-edit"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="formInline.page"
            :page-sizes="pageSizes"
            :page-size="formInline.pageSize"
            layout="total, sizes, prev, pager, next"
            :disabled="loading"
            :total="totalCount"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!--  edit dialog -->
    <el-dialog
      :title="$t('material.modalEdit')"
      :center="true"
      :visible.sync="editModal"
    >
      <el-form
        :model="editForm"
        label-width="120px"
        label-position="left"
        class="ruleForm"
      >
        <el-form-item :label="$t('material.name')">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editModal = false">{{
          $t('common.cancel')
        }}</el-button>
        <el-button type="primary" @click="handleSave">{{
          $t('common.save')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Util from '@/utils'
import moment from 'moment'
import { convertType, PAGE_SIZES } from '@/utils/constant.js'
export default {
  name: 'MaterialList',
  data() {
    return {
      loading: false,
      isUpload: false,
      allDatas: [],
      currentDatas: [],
      formInline: {
        name: null,
        page: 1,
        pageSize: 10
      },
      editForm: {
        name: '',
        category: ''
      },
      selectId: -1,
      editModal: false,
      uploadModal: false,
      totalCount: 0,
      pageSizes: PAGE_SIZES
    }
  },
  created() {
    this.initData()
    this.makeDebounce()
  },
  methods: {
    initData() {
      this.loading = true
      new Promise(resolve => {
        let result = [
          {
            name: 'test',
            createTime: '2020-10-28 10:57:39',
            optTime: '2020-10-28 10:57:39',
            categoryFirst: '一级',
            categorySec: '耳机',
            categoryThird: '/'
          }
        ]
        resolve(result)
      })
        .then(result => {
          this.allDatas = result.concat()
          if (this.formInline.name) {
            this.doSearch(this.formInline.name)
          } else {
            let start = 0
            let end = this.formInline.pageSize * this.formInline.page
            if (this.allDatas.length > this.formInline.pageSize) {
              start = (this.formInline.page - 1) * this.formInline.pageSize
            }
            this.currentDatas = this.allDatas.slice(start, end)
            this.totalCount = this.allDatas.length
            if (this.subtotel) {
              this.currentDatas = [this.subtotel, ...this.currentDatas]
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    makeDebounce() {
      this.debounceSearch = Util.debounce(this.doSearch, 250)
    },
    doSearch(search) {
      this.loading = true
      if (search) {
        let reg = new RegExp(search, 'gi')
        this.currentDatas = this.allDatas.filter(item => {
          if (reg.test(item.name)) {
            reg.lastIndex = 0
            return true
          }
          return false
        })
      } else {
        this.currentDatas = this.allDatas.concat()
      }
      this.totalCount = this.currentDatas.length
      if (this.currentDatas.length > this.formInline.pageSize) {
        let start = (this.formInline.page - 1) * this.formInline.pageSize
        this.currentDatas = this.currentDatas.splice(
          start,
          this.formInline.pageSize
        )
      }
      if (this.subtotel) {
        this.currentDatas = [this.subtotel, ...this.currentDatas]
      }
      this.loading = false
    },
    // row日期转换
    dateFormater(row, column, cellValue, index) {
      if (!cellValue) return null
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    handleName(val) {
      this.formInline.page = 1
      this.debounceSearch(val)
    },
    // 分页导航
    handleCurrentChange(val) {
      this.formInline.page = val
      // 数组处理
      this.debounceSearch(this.formInline.name)
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val
      this.debounceSearch(this.formInline.name)
    },
    handleEdit(index, row) {
      this.selectId = row.id
      this.editForm = {
        name: '',
        category: ''
      }
      this.editModal = true
    },
    handleUpload() {
      this.isUpload = true
    }
  }
}
</script>

<style lang="scss" scoped>
.main-tool {
  display: flex;
  .input-search {
    margin-right: 20px;
    width: 250px;
  }
  .main-opt {
    flex: 1;
    text-align: right;
    .refresh {
      padding-left: 10px;
      padding-right: 5px;
    }
  }
}
.main-table {
  margin-top: 20px;
}
.main-filter {
  margin-bottom: 20px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 20px;
  .main-filter__con {
    margin-right: 20px;
    float: left;
    p {
      font-size: 12px;
      font-weight: bold;
      line-height: 20px;
    }
  }
}
.table-link {
  font-size: 18px;
  color: #5d9cec;
  word-break: break-word;
}
.ruleForm {
  width: 80%;
}
</style>
