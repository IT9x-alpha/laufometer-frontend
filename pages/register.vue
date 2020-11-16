<template>
  <div class="container page-container">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <h1 class="title">
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
  .title {
    text-align: center;
  }
</style>
