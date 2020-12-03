<template>
  <div class="mainWrapper">
    <div class="page_title">
      <div class="row">
        <div class="client-row">
          <h1>{{ $t('category.title') }}</h1>
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <category-tree></category-tree>
    </div>
  </div>
</template>

<script>
import CategoryTree from '@/components/categoryTree/Index.vue'
export default {
  name: 'CategoryList',
  components: {
    CategoryTree
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style scoped></style>
