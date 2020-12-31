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
        <el-form-item :label="$t('material.category')">
          <category-tree-selector style="width: 100%" @getResult="getCategory">
          </category-tree-selector>
        </el-form-item>
        <p style="margin-top: 50px; color: #999">{{ $t('material.tip') }}</p>
      </el-form>
      <div class="upload-detail">
        <el-upload
          class="file-uploader"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :multiple="true"
          :show-file-list="false"
          :on-success="handleFileSuccess"
          :on-change="handleFileChange"
          :before-upload="beforeFileUpload"
          :file-list="uploadedList"
          :auto-upload="false"
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
      <ul
        class="uploaded-con__detail"
        v-if="showUpload && showUpload.length > 0"
      >
        <li v-for="(item, index) in showUpload" :key="item.name + index">
          <a href="javascript:;" @click="doModify(item.name)">
            <el-image
              class="showImg"
              :src="item.url"
              :alt="item.name"
              fit="cover"
            >
            </el-image>
            <editor-label
              :id="item.url"
              v-model="modifyName"
              :show-input="true"
              :needShake="false"
              class="fileLabel"
              @save="doSaveName"
              >{{ item.name }}</editor-label
            >
          </a>
        </li>
      </ul>
      <p style="margin-top: 20px; color: #999" v-else>
        {{ $t('common.noResultDetail') }}
      </p>
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
import CategoryTreeSelector from '@/components/selector/CategoryTreeSelector'
import EditorLabel from '@/components/categoryTree/EditorLabel'
export default {
  name: 'UploadModal',
  components: {
    CategoryTreeSelector,
    EditorLabel
  },
  data() {
    return {
      uploadForm: {
        name: '',
        category: -1
      },
      uploadedList: [],
      showUpload: [],
      modifyName: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('getResult', false)
    },
    handleSave() {
      this.$emit('getResult', this.uploadedList)
    },
    getCategory(res) {
      this.uploadForm.category = res ? res.id : -1
    },
    doModify(name) {
      console.log(name)
      this.modifyName = name
    },
    doSaveName({ prev, current, id }) {
      console.log(prev, current, this.modifyName)
      if (current === prev) return
      let findItem = this.showUpload.find(item => item.url === id)
      let nameItem = this.showUpload.find(item => item.name === current)
      if (findItem) {
        if (nameItem) {
          this.$message.error('已存在相同的素材名称，请重新命名！')
        } else {
          findItem.name = current
        }
      }
    },
    handleFileSuccess(response, file, fileList) {},
    beforeFileUpload(file) {},
    handleFileChange(file, fileList) {
      let url = ''
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp|.svg)$/
      if (regex.test(file.name.toLowerCase())) {
        url = URL.createObjectURL(file.raw)
      }
      this.showUpload.push({
        originName: file.name,
        name: file.name,
        url: url
      })
    }
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
    margin-top: 20px;
    display: flex;
    li {
      & ~ li {
        margin-left: 10px;
      }
      .showImg {
        width: 120px;
        height: 120px;
      }
    }
  }
}
.fileLabel {
  width: 120px;
  border: none;
  line-height: 20px;
  padding: 3px 0;
  height: auto;
}
</style>
