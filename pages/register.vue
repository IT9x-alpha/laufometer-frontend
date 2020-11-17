<template>  
  <div class="container page-container">
      <div class="row">
        <div class="col-sm-4 offset-sm-4">
          <h1 class="title-mode-1">
            laufometer-frontend        
          </h1>
          <RegisterationForm />
        </div>                  
      </div>
  </div>  
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
  .title-mode-1 {
    text-align: center;
  }
</style>
