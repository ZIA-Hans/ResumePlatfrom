<template>
    <div class="content">
      <p class="label">技能证书 Skill</p>
      <ul class="skill">
        
        <li class="item" v-for="(skill, index) in skillList" :key="index">
          {{skill}}
        </li>
      </ul>
    </div>
</template>


<script>
import { computed, defineComponent } from 'vue'
import store from '../../../store'

export default defineComponent({
  setup() {
    const skill = computed(() => store.state.ResumeData.skill.skills) ;
    const skillList = skill.value.split(' | ');
    return {
      skillList
    }
  },
})
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: relative;
  .label {
    padding-bottom: 8px;
    color: #01426f;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    margin-bottom: 0px;
  }
  .skill {
    padding: 12px 0 32px;
    .item {
      list-style: outside;
      margin-left: 24px;
      line-height: 24px;
      font-size: 13px;
      color: #345975;
      font-weight: bold;
    }
  }
}

</style>