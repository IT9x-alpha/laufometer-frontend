<template>  
  <v-container>
      <v-row>
        <v-col offset-md="2" md="8"  offset-lg="2" lg="8"  offset-xl="3" xl="6" >
          <h1 class="title-mode-1">
            laufometer-ranking        
          </h1>
          <RankingTable/>
        </v-col>                  
      </v-row>
  </v-container>  
</template>

<script>
export default {        
    data(){
        return {
            
        }
    }
}
</script>

<style>
  .title-mode-1 {
    text-align: center;
  }
</style>
