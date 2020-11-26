<template>
  <div class="page-header">
    <div class="logo">
      <NuxtLink class="logo-link" to="/"><img src="~/assets/images/logo-hor.svg" alt="Logo"></NuxtLink>			
      <h1>LaufOMeter</h1>      
      <div class="laufometer-logo">
        <img  src="~/assets/images/laufometerlogo02.svg" alt="Logo laufometer">        
      </div>      
		</div>  
    <NuxtLink class="page-link" to="/register">Dateneintrag</NuxtLink>
  </div>
</template>

<style>
.page-header {
  width:100%;    
  display:flex;
  justify-content: flex-start;    
  flex-direction: column;  
}
.logo { 
    position: relative;        
}

.logo::after {
  content: "";
  display: block;
  border-bottom: 1px solid var(--itech-gray);
}

.logo .logo-link {
  width: 300px;
  display:inline-block;  
  margin: 15px 35px 0;
}

.laufometer-logo {
  display: inline-block;
  position: absolute;
  bottom:-45px;
  left: 141px;
  width: 110px;
}

.logo h1{
  padding: 0 55px;
  font-size: 14px;
  text-align: left; 
  margin: -20px 0 0 230px;
}

.page-link {
  width: 110px;
  height: 65px;
  text-align: center;
  font-family: "Exo", sans-serif;
  background-image: url("~assets/images/halfpolygon01.svg");
  background-size: contain;
  background-repeat: no-repeat;
  padding-top: 5px;
  color: var(--itech-gray)!important;
  
  
}

.page-link:hover {
  text-decoration: none;
  background-image: url("~assets/images/halfpolygon-hover.svg");
  color: var(--itech-lightGray)!important;
}

@media (min-width: 960px) {  

  .logo h1{    
    font-size: 24px;     
    margin: -20px 0 0 275px;
  }

  .page-link {
    align-self: flex-end;
    margin: 0 25px;
  }

}

@media (min-width: 1264px) {  

  .logo .logo-link {
    width: 280px;    
  }

  .laufometer-logo {   
    bottom: -62px;
    left: 130px;
    width: 150px;
  }

  .logo h1{      
    margin: -20px 0 0 283px;
  }
}

@media (min-width: 1904px) {
  
  .logo .logo-link {
    width: 300px;    
  }

  .laufometer-logo {   
    bottom: -82px;
    left: 110px;
    width: 200px;
  }
    
}

</style>
