<template>
  <div
    class="editorLabel"
    :class="{ shakeAni: showInput && needShake }"
    @dblclick="onFieldClick"
  >
    <i
      class="editorLabel-icon el-icon-error"
      v-show="delMode"
      @click="doDel"
    ></i>
    <div v-if="!editMode" @keyup.enter="onFieldClick">
      <slot></slot>
    </div>
    <component
      :is="editableComponent"
      v-if="editMode"
      ref="input"
      @focus="onFieldClick"
      @keyup.enter.native="onInputExit"
      @keyup.esc.native="onInputCancel"
      v-on="listeners"
      v-bind="$attrs"
      v-model="model"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script>
export default {
  name: 'EditorLabel',
  // inheritAttrs: false,
  props: {
    id: {
      type: [Number, String],
      default: '-1'
    },
    value: {
      type: [Number, String],
      default: ''
    },
    needShake: {
      type: Boolean,
      default: true
    },
    showInput: {
      type: Boolean,
      default: false
    },
    showDel: {
      type: Boolean,
      default: false
    },
    editableComponent: {
      type: String,
      default: 'el-input'
    },
    closeEvent: {
      type: String,
      default: 'blur'
    }
  },
  watch: {
    showDel: {
      handler(newVal, oldVal) {
        this.delMode = newVal
      },
      immediate: true
    },
    showInput: {
      handler(newVal, oldVal) {
        this.inputMode = newVal
      },
      immediate: true
    }
  },
  data() {
    return {
      editMode: false,
      delMode: this.showDel,
      prev: this.value,
      inputMode: this.showInput,
      resultId: this.id,
      current: this.value
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.current = val
        this.$emit('input', val)
      }
    },
    listeners() {
      return {
        [this.closeEvent]: this.onInputCancel,
        ...this.$listeners
      }
    }
  },
  methods: {
    onFieldClick() {
      if (this.inputMode) {
        this.editMode = true
        this.$nextTick(() => {
          let inputRef = this.$refs.input
          if (inputRef) {
            inputRef.focus()
          }
        })
      }
    },
    onInputExit() {
      this.editMode = false
      this.$emit('save', {
        prev: this.value,
        current: this.current,
        id: this.resultId
      })
    },
    onInputCancel() {
      if (this.editMode) {
        this.editMode = false
        this.current = this.prev
        this.$emit('input', this.current)
      }
    },
    onInputChange(val) {
      this.$emit('input', val)
    },
    doDel() {
      this.$emit('delete', this.resultId)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/element-variables.scss';
.editorLabel {
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: default;
  & ~ &,
  & ~ .categorytree-add {
    margin-left: 20px;
  }
  &:hover {
    background: #efefef;
  }
  .editorLabel-icon {
    position: absolute;
    cursor: pointer;
    font-size: 16px;
    top: -8px;
    right: -8px;
    z-index: 201;
    color: $--color-primary;
  }
}
.addLabel {
  border-style: dotted;
  color: $--color-primary;
  cursor: pointer;
}
.shakeAni {
  animation-name: shaky-slow;
  animation-duration: 0.5s;
  animation-delay: 0s;
  animation-play-state: running;
  animation-timing-function: ease-in-out;
}
@keyframes shaky-slow {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  10% {
    transform: translate(1.4px, 0px) rotate(-2deg);
  }
  20% {
    transform: translate(1px, 1px) rotate(-0.5deg);
  }
  30% {
    transform: translate(-1.3px, -1.3px) rotate(-1.5deg);
  }
  40% {
    transform: translate(-1.4px, -1px) rotate(-0.5deg);
  }
  50% {
    transform: translate(1.6px, 1.6px) rotate(1.5deg);
  }
  60% {
    transform: translate(1.3px, 1.6px) rotate(-0.5deg);
  }
  70% {
    transform: translate(-1.6px, 1px) rotate(1.5deg);
  }
  80% {
    transform: translate(1.4px, 1.6px) rotate(2deg);
  }
  90% {
    transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  98% {
    transform: translate(1.3px, 1px) rotate(-0.5deg);
  }
}
</style>
