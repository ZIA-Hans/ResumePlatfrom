<template>
    <div class="content">
        <p class="name">{{base.username}}</p>
        <p class="job">前端工程师</p>
        <p class="summary">
            {{evaluation}}
        </p>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import store from '../../../store'

export default defineComponent({
  setup() {
    const base = computed(() => store.state.ResumeData.base) 
    const evaluation = computed(() => store.state.ResumeData.evaluation)
    return {
      base,
      evaluation
    }
  },
})
</script>

<style lang="less" scoped>
.content {
  padding-top: 20px;
  p.name {
    margin-bottom: 8px;
    color: #01426f;
    font-size: 28px;
    font-weight: bold;
  }
  p.job {
    margin-bottom: 8px;
    color: #01426f;
    font-size: 18px;
    font-weight: bold;
  }
  p.summary {
    margin-top: 1rem;
    color: rgba(0, 0, 0, 0.8);
    line-height: 22px;
    font-size: 13px;
  }
}


</style>