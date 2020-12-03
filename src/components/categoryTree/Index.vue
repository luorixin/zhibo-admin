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
              :id="1"
              v-model="data.name"
              :show-input="isEdit"
              :show-del="isEdit"
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
                :id="1"
                v-model="child.name"
                :show-input="isEdit"
                :show-del="isEdit"
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
                  :id="1"
                  v-model="childRight.name"
                  :show-input="isEdit"
                  :show-del="isEdit"
                  :key="'tree-parent_child_right_' + childRight.id"
                  >{{ childRight.name }}</editor-label
                >
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <label>{{ $t('common.noResult') }}</label>
    </div>
  </div>
</template>

<script>
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
      datas: [],
      test: '测试'
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
          this.datas = result
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
      console.log(this.datas)
    },
    handleSave() {
      this.isEdit = !this.isEdit
    }
  }
}
</script>

<style scoped lang="scss">
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
  }
}
</style>
