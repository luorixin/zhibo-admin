<template>
  <div class="categorytree-con">
    <div class="categorytree-opt">
      <el-button v-show="isEdit" @click="handleCancel" :disabled="loading">{{
        $t('common.cancel')
      }}</el-button>
      <el-button
        v-show="isEdit"
        @click="handleSave"
        type="primary"
        :disabled="loading"
        >{{ $t('common.save') }}</el-button
      >

      <el-button
        v-show="!isEdit"
        @click="handleEdit"
        type="primary"
        :disabled="loading"
        >{{ $t('common.edit') }}</el-button
      >
    </div>
    <div class="categorytree-inner" v-if="datas.length > 0">
      <div
        class="categorytree-parent"
        v-for="data in datas"
        :key="'tree-parent_' + data.id"
      >
        <div class="categorytree-first">
          <div class="categorytree-first__con">
            <editor-label
              :id="data.id"
              v-model="data.name"
              :show-input="isEdit"
              :show-del="false"
              @delete="deleteItem"
              >{{ data.name }}</editor-label
            >
          </div>
        </div>
        <div
          class="categorytree-child"
          v-show="data.children && data.children.length > 0"
        >
          <div
            class="categorytree-child__con"
            v-for="child in data.children"
            :key="'tree-parent_child_' + child.id"
          >
            <div class="categorytree-child__con-left">
              <editor-label
                :id="data.id + '$$$' + child.id"
                v-model="child.name"
                :show-input="isEdit"
                :show-del="isEdit"
                @delete="deleteItem"
              >
                {{ child.name }}
              </editor-label>
            </div>
            <div
              class="categorytree-child__con-right"
              v-show="child.children && child.children.length > 0"
            >
              <template v-for="childRight in child.children">
                <editor-label
                  :id="data.id + '$$$' + child.id + '$$$' + childRight.id"
                  v-model="childRight.name"
                  :show-input="isEdit"
                  :show-del="isEdit"
                  @delete="deleteItem"
                  :key="'tree-parent_child_right_' + childRight.id"
                  >{{ childRight.name }}</editor-label
                >
              </template>
              <!-- 三级展示 -->
              <!-- <editor-label
                v-show="isEdit"
                :id="data.id + '$$$' + child.id"
                v-model="categoryAdd"
                :show-input="isEdit"
                :show-del="false"
                class="addLabel"
                @save="addLabelThird"
              >
                {{ $t('category.addTitle') }}
              </editor-label> -->
              <div
                class="categorytree-add"
                v-show="isEdit"
                @click="
                  addLabelThird({
                    current: $t('category.changeName'),
                    id: data.id + '$$$' + child.id
                  })
                "
              >
                {{ $t('category.addTitle') }}
              </div>
            </div>
            <!-- 如果没有，三级展示 -->
            <div
              class="categorytree-child__con-right"
              v-show="
                (!child.children || child.children.length === 0) && isEdit
              "
            >
              <!-- <editor-label
                :id="data.id + '$$$' + child.id"
                v-model="categoryAdd"
                :show-input="isEdit"
                :show-del="false"
                class="addLabel"
                @save="addLabelThird"
              >
                {{ $t('category.addTitle') }}
              </editor-label> -->
              <div
                class="categorytree-add"
                @click="
                  addLabelThird({
                    current: $t('category.changeName'),
                    id: data.id + '$$$' + child.id
                  })
                "
              >
                {{ $t('category.addTitle') }}
              </div>
            </div>
          </div>
          <!-- 二级展示 -->
          <div class="categorytree-child__con" v-show="isEdit">
            <div class="categorytree-child__con-left">
              <!-- <editor-label
                :id="data.id"
                v-model="categoryAdd"
                :show-input="isEdit"
                :show-del="false"
                class="addLabel"
                @save="addLabelSecond"
              >
                {{ $t('category.addTitle') }}
              </editor-label> -->
              <div
                class="categorytree-add"
                @click="
                  addLabelSecond({
                    current: $t('category.changeName'),
                    id: data.id
                  })
                "
              >
                {{ $t('category.addTitle') }}
              </div>
            </div>
          </div>
        </div>
        <!-- 如果没有，二级展示 -->
        <div
          class="categorytree-child"
          v-show="(!data.children || data.children.length === 0) && isEdit"
        >
          <div class="categorytree-child__con">
            <div class="categorytree-child__con-left">
              <!-- <editor-label
                :id="data.id"
                v-model="categoryAdd"
                :show-input="isEdit"
                :show-del="false"
                class="addLabel"
                @save="addLabelSecond"
              >
                {{ $t('category.addTitle') }}
              </editor-label> -->
              <div
                class="categorytree-add"
                @click="
                  addLabelSecond({
                    current: $t('category.changeName'),
                    id: data.id
                  })
                "
              >
                {{ $t('category.addTitle') }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 一级展示 -->
      <div class="categorytree-parent" v-show="isEdit" v-if="false">
        <div class="categorytree-first">
          <div class="categorytree-first__con">
            <!-- <editor-label
              id="-1"
              v-model="categoryAdd"
              :show-input="isEdit"
              :show-del="false"
              class="addLabel"
              @save="addLabelFirst"
            >
              {{ $t('category.addTitle') }}
            </editor-label> -->
            <div
              class="categorytree-add"
              @click="
                addLabelFirst({ current: $t('category.changeName'), id: -1 })
              "
            >
              {{ $t('category.addTitle') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="categorytree-inner">
      <div class="categorytree-noresult">
        <label>{{ $t('category.noTip') }}</label
        ><el-button type="text" @click="handleAdd" class="font-medium">{{
          $t('category.addTitle')
        }}</el-button>
      </div>
    </div>
    <!--  create dialog -->
    <el-dialog
      :title="$t('category.addTitle')"
      :center="true"
      :visible.sync="modal"
    >
      <el-form
        :model="addForm"
        label-width="120px"
        label-position="left"
        class="ruleForm"
      >
        <el-form-item :label="$t('category.name')">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modal = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSaveCategory">{{
          $t('common.save')
        }}</el-button>
      </div>
    </el-dialog>

    <!-- save dialog -->
    <el-dialog
      :title="$t('common.tip')"
      :center="true"
      width="300px"
      :visible.sync="saveModal"
    >
      <p style="font-size: 14px; line-height: 30px">{{ $t('category.tip') }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveModal = false">{{
          $t('common.cancel')
        }}</el-button>
        <el-button type="primary" @click="doSave">{{
          $t('common.save')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Util from '@/utils'
import moment from 'moment'
import EditorLabel from './EditorLabel'
export default {
  name: 'CategoryTree',
  components: {
    EditorLabel
  },
  data() {
    return {
      loading: false,
      isEdit: false,
      origin: [],
      datas: [],
      categoryAdd: '',
      initIndex: -1,
      modal: false,
      saveModal: false,
      addForm: {
        name: ''
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.loading = true
      new Promise(resolve => {
        let res = [
          {
            id: 1,
            name: '测试',
            children: [
              {
                id: 2,
                pid: 1,
                name: '一级测试',
                children: [
                  {
                    id: 3,
                    pid: 2,
                    name: '二级测试'
                  },
                  {
                    id: 4,
                    pid: 2,
                    name: '二级测试2'
                  }
                ]
              },
              {
                id: 5,
                pid: 1,
                name: '一级测试2',
                children: [
                  {
                    id: 6,
                    pid: 2,
                    name: '二级测试3'
                  },
                  {
                    id: 7,
                    pid: 2,
                    name: '二级测试4'
                  }
                ]
              }
            ]
          },
          {
            id: 8,
            name: '测试2'
          }
        ]
        resolve(res)
      })
        .then(result => {
          this.datas = JSON.parse(JSON.stringify(result))
          this.origin = JSON.parse(JSON.stringify(result))
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleEdit() {
      this.isEdit = !this.isEdit
    },
    handleCancel() {
      this.isEdit = !this.isEdit
      this.datas = JSON.parse(JSON.stringify(this.origin))
    },
    handleSave() {
      this.saveModal = true
    },
    doSave() {
      this.isEdit = !this.isEdit
      this.saveModal = false
    },
    handleAdd() {
      this.addForm = { name: '' }
      this.modal = true
    },
    handleSaveCategory() {
      if (!Util.isEmpty(this.addForm.name)) {
        this.datas.push({
          id: this.initIndex - 1,
          name: this.addForm.name
        })
        this.initIndex -= 1
        this.modal = false
        this.isEdit = true
      }
    },
    addLabelFirst(res) {
      if (!Util.isEmpty(res.current)) {
        this.datas.push({
          id: this.initIndex - 1,
          name: res.current
        })
        this.initIndex -= 1
        this.categoryAdd = ''
        this.$forceUpdate()
      }
    },
    addLabelSecond(res) {
      if (!Util.isEmpty(res.current)) {
        let changeData = this.datas.find(item => {
          return item.id == res.id
        })
        if (changeData) {
          if (!changeData.children) {
            // changeData.children = []
            this.$set(changeData, 'children', [])
          }
          changeData.children.push({
            id: this.initIndex - 1,
            name: res.current
          })
          this.initIndex -= 1
          this.categoryAdd = ''
          this.$forceUpdate()
        }
      }
    },
    addLabelThird(res) {
      if (!Util.isEmpty(res.current)) {
        let idArr = res.id.split('$$$')
        let changeDataParent = this.datas.find(item => {
          return item.id == idArr[0]
        })
        if (changeDataParent && changeDataParent.children) {
          let changeData = changeDataParent.children.find(item => {
            return item.id == idArr[1]
          })
          if (!changeData.children) {
            // changeData.children = []
            this.$set(changeData, 'children', [])
          }
          changeData.children.push({
            id: this.initIndex - 1,
            name: res.current
          })
          this.initIndex -= 1
          this.categoryAdd = ''
          this.$forceUpdate()
        }
      }
    },
    deleteItem(res) {
      if (res) {
        let idArr = (res + '').split('$$$')
        let i = 1
        const parent = this.datas.find(item => {
          return item.id == idArr[0]
        })
        if (parent) {
          let children = parent.children
          let changeParent = this.datas
          let changeChild = parent
          let findChild = (par, child, i) => {
            child.forEach(item => {
              if (idArr[i] && item.id == idArr[i]) {
                changeParent = par.children
                changeChild = item
                if (item.children) {
                  findChild(item, item.children, ++i)
                }
              }
            })
          }
          if (children) {
            findChild(parent, children, i)
          }
          const index = changeParent.findIndex(
            item => item.id == changeChild.id
          )
          changeParent.splice(index, 1)
          this.$forceUpdate()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/element-variables.scss';
@mixin categorytree_flex_center {
  display: flex;
  justify-content: center;
  min-width: 100px;
  padding: 20px;
}
.categorytree-con {
  position: relative;
  font-size: 14px;
  .categorytree-opt {
    button {
      float: right;
      margin-left: 10px;
    }
  }
  .categorytree-inner {
    position: relative;
    float: left;
    margin: 20px 0;
    width: 100%;
    height: 100%;
    .categorytree-parent {
      border-bottom: 1px solid #efefef;
      padding: 10px 0;
      display: flex;
      .categorytree-first {
        @include categorytree_flex_center;
        vertical-align: top;
      }
      .categorytree-child {
        min-width: 100px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-left: 1px solid #dfdfdf;
        .categorytree-child__con {
          position: relative;
          display: flex;
          .categorytree-child__con-left {
            @include categorytree_flex_center;
          }
          .categorytree-child__con-right {
            @include categorytree_flex_center;
            border-left: 1px solid #dfdfdf;
          }
        }
      }
      &:last-child {
        border-bottom: 0;
      }
    }
    .categorytree-noresult {
      height: 300px;
      line-height: 300px;
      text-align: center;
      label {
        font-size: 16px;
      }
    }
  }
  .categorytree-add {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px dotted #dfdfdf;
    border-radius: 5px;
    text-align: center;
    position: relative;
    color: $--color-primary;
    cursor: pointer;
    &:hover {
      background: #efefef;
    }
  }
}
.editorLabel ~ .categorytree-add {
  margin-left: 20px;
}
</style>
