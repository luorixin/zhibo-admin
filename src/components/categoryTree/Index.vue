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
    <div class="categorytree-inner">
      <div class="categorytree-parent">
        <div class="categorytree-first">
          <div class="categorytree-first__con">
            <editor-label
              :id="1"
              v-model="test"
              :show-input="isEdit"
              :show-del="isEdit"
              >{{ test }}</editor-label
            >
          </div>
        </div>
        <div class="categorytree-child">
          <div class="categorytree-child__con">
            <div class="categorytree-child__con-left">
              <editor-label
                :id="1"
                v-model="test"
                :show-input="isEdit"
                :show-del="isEdit"
                >背景墙</editor-label
              >
            </div>
            <div class="categorytree-child__con-right">
              <editor-label
                :id="1"
                v-model="test"
                :show-input="isEdit"
                :show-del="isEdit"
                >全套</editor-label
              >
              <editor-label
                :id="1"
                v-model="test"
                :show-input="isEdit"
                :show-del="isEdit"
                >顶部</editor-label
              >
            </div>
          </div>
          <div class="categorytree-child__con">
            <div class="categorytree-child__con-left">
              <editor-label
                :id="1"
                v-model="test"
                :show-input="isEdit"
                :show-del="isEdit"
                >信息卡</editor-label
              >
            </div>
            <div class="categorytree-child__con-right">
              <editor-label
                :id="1"
                v-model="test"
                :show-input="isEdit"
                :show-del="isEdit"
                >全套</editor-label
              >
              <editor-label
                :id="1"
                v-model="test"
                :show-input="isEdit"
                :show-del="isEdit"
                >顶部</editor-label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="categorytree-parent">
        <div class="categorytree-first">
          <div class="categorytree-first__con">
            <editor-label
              :id="1"
              v-model="test"
              :show-input="isEdit"
              :show-del="isEdit"
              >一键装修</editor-label
            >
          </div>
        </div>
        <div class="categorytree-child">
          <div class="categorytree-child__con">
            <div class="categorytree-child__con-left">
              <editor-label
                :id="1"
                v-model="test"
                :show-input="isEdit"
                :show-del="isEdit"
                >背景墙</editor-label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="categorytree-parent">
        <div class="categorytree-first">
          <div class="categorytree-first__con">
            <editor-label
              :id="1"
              v-model="test"
              :show-input="isEdit"
              :show-del="isEdit"
              >一键装修</editor-label
            >
          </div>
        </div>
      </div>
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
      test: '测试'
    }
  },
  methods: {
    handleEdit() {
      this.isEdit = !this.isEdit
    },
    handleCancel() {
      this.isEdit = !this.isEdit
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
