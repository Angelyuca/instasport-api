<template>
  <div class="home">
    <div v-if="error_msg !== ''">
      <p>{{error_msg}}</p>
    </div>
    <div v-if="error_msg === ''">
      <MainFilter/>
      <MainContent/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainFilter from '@/components/MainFilter.vue'
import MainContent from '@/components/MainContent.vue'
import api from '@/api/instasport'

export default {
  name: 'Home',
  components: {
    MainFilter,
    MainContent
  },
  data: () => ({
    error_msg: ''
  }),
  created() {
    api.getClubs().then(response =>{
      console.log(response);
      if(Array.isArray(response) && response.length>0){
        this.$store.dispatch('actionAddClubs', response);
      } else this.error_msg = response
    });

  }
}
</script>
