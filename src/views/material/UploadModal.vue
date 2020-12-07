<template>
  <div>
    <div class="upload-con">
      <el-form
        :model="uploadForm"
        label-width="120px"
        label-position="left"
        class="ruleForm"
      >
        <el-form-item :label="$t('material.name')">
          <el-input v-model="uploadForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <p>{{ $t('material.tip') }}</p>
      </el-form>
      <div class="upload-detail">
        <el-upload
          class="file-uploader"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleFileSuccess"
          :before-upload="beforeFileUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            {{ $t('common.uploadTip1') }}<em>{{ $t('common.uploadTip2') }}</em>
          </div>
        </el-upload>
      </div>
    </div>
    <hr />
    <div class="uploaded-con">
      <p class="uploaded-con__titie">{{ $t('material.uploaded') }}</p>
      <ul class="uploaded-con__detail">
        <li>22</li>
      </ul>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="handleSave">{{
        $t('common.save')
      }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadModal',
  data() {
    return {
      uploadForm: {},
      uploadedList: []
    }
  },
  methods: {
    closeModal() {
      this.$emit('getResult', false)
    },
    handleSave() {
      this.$emit('getResult', this.uploadedList)
    },
    handleFileSuccess() {},
    beforeFileUpload() {}
  }
}
</script>

<style scoped lang="scss">
.dialog-footer {
  text-align: center;
}
.upload-con {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .ruleForm {
    flex: 1;
  }
  .upload-detail {
    width: 350px;
    text-align: center;
    .file-uploader {
      ::v-deep .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409eff;
        }
        .el-upload-dragger {
          width: 250px;
          height: 250px;
          .el-icon-upload {
            margin-top: 80px;
          }
          .el-upload__text {
            font-size: 12px;
          }
        }
      }
    }
  }
}
.uploaded-con {
  margin-top: 20px;
  .uploaded-con__titie {
    font-size: 16px;
  }
  .uploaded-con__detail {
    list-style: none;
    position: relative;
  }
}
</style>
