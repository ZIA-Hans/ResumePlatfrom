<template>
    <div class="L-container">
        <p class="title">联系方式</p>
        <ul class="content">
            <li>电话：{{contact.phone}}</li>
            <li>邮箱：{{contact.email}}</li>
        </ul>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import store from '../../../store'

export default defineComponent({
  setup() {
    const contact = computed(() => store.state.ResumeData.contact) 
    return {
      contact
    }
  },
})
</script>

<style lang="less" scoped>
p,
ul {
  margin: 0;
}
ul {
  list-style-type: none;
  margin: 0;
  display: block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
.L-container {
  padding-top: 48px;
  p.title {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin: 0;
  }
  .content {
    padding: 0 16px 0 20px;
    padding-top: 2rem;
    font-size: 13px;
    li {
      padding-bottom: 12px;
    }
  }
}
</style>