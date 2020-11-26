<template>  
  <v-container>
      <v-row>
        <v-col offset-md="2" md="8"  offset-lg="3" lg="6"  offset-xl="4" xl="4" >
          <h3 class="title-mode-1">
            Dateneingabe       
          </h3>
          <RegisterationForm />
        </v-col>                  
      </v-row>
  </v-container>  
</template>

<script>
export default {        
    data(){
        return {
            distance:20
        }
    }
}
</script>

<style>
  
</style>
