<template>
    <form @submit.prevent="submitForm">
        <div class="register_form">
            <div class="d-flex flex-row justify-content-between">
                <div class="activity_block">
                    <label>
                        <input type="radio" id="swimming" name="activity" value="swimming" v-model="activity">
                        <img :src="activityImageURL('swimming')" alt="schwimmen">                         
                        
                    </label> 
                </div>
                <div class="activity_block">                
                    <label>
                        <input type="radio" id="jogging" name="activity" value="jogging" v-model="activity">
                        <img :src="activityImageURL('jogging')" alt="jogging">                        
                    </label>                
                </div>
                <div class="activity_block">
                    <label>
                        <input type="radio" id="cycling" name="activity" value="cycling" v-model="activity">
                        <img :src="activityImageURL('cycling')" alt="rad fahren">                       
                    </label>
                </div>                      
            </div>

            <div class="d-flex flex-column align-items-center">
                <div class="entry-block">
                    <label for="distance">Wie viel?</label>                
                    <input class= "register-input" type="text" id="distance" name="distance" maxlength="6" @input="filterDistanceInput" @blur="handleDistanceBlur" v-model="distance"> 
                </div>
    
                <div class="entry-block">
                    <label for="group">Gruppe:</label>                
                    <input class= "register-input" type="text" id="group" name="group" v-model="group"> 
                </div>
    
                <div class="entry-block">
                    <input class="submit-button" type="submit" value="Senden"> 
                </div>
            </div>
            

        </div>            
    </form>
</template>

<script scoped>
export default {  
    name:"RegisterActivity",
    data() {
        return {
            activity: "",
            group: "testGroup",
            distance: 0,                     
            unit: "m",
            minRagne: 0,
            maxRange:0,                                    
            message: "test message"
        }
    },
    watch: {    
            
         activity(value){             
             this.updateRange()
             this.distance=this.minRange           
         }
    },
    computed: {
        activityImageURL: function(){            
            return (currentActivity) =>  {                 
                const suffix = this.activity === currentActivity ? "_active" : "_normal"
                return require(`../assets/images/${currentActivity+suffix}.png`) 
            }          
            
        }
    },
    methods: {        
        filterDistanceInput(e){            
            e.target.value = e.target.value.replace(/[^0-9]+/g, '') 
            this.distance = e.target.value          
        },
        handleDistanceBlur(e){
           if(this.distance > this.maxRange){
               this.distance = this.maxRange
           }
           if(this.distance < this.minRange){
               this.distance = this.minRange
           }
           console.log("we are here")
        }
        ,
        updateRange(){
            const swimmingMinRange = 100
            const swimmingMaxRange = 2000
            const jogginMinRange = 200
            const jogginMaxRange = 800
            const cyclingMinRange = 500
            const cyclingMaxRange = 1800
            switch (this.activity) {
                case "swimming":
                    this.minRange = swimmingMinRange
                    this.maxRange = swimmingMaxRange
                    break;
                case "jogging":
                    this.minRange = jogginMinRange
                    this.maxRange = jogginMaxRange
                    break;
                case "cycling":
                    this.minRange = cyclingMinRange
                    this.maxRange = cyclingMaxRange
                    break;
                default:
                    break;
            }

        },
        submitForm(e){
            
        }
    }    
}

</script>

<style>
.register_form {   
    padding: 55px 0;
}
.activity_block{
    width: 150px;
    padding: 15px;
}

.activity_block label {
    position: relative
}

.activity_block input{
    position: absolute;
    bottom: 0;
    left:50%;
    transform: translateX(-50%);
}

.activity_block img {
    margin-bottom:25px;
}

.register-input {
    margin-top: 5px;    
    border: 1px solid var(--itech-lightGray);
    width: 13rem;
    text-align: center;
    padding: 5px 3px
}

.entry-block {
    margin-bottom: 10px;
    padding: 15px;
}

.entry-block label {
    width: 5rem;
}

.submit-button {
    border: 1px solid var(--itech-gray);
    border-radius: 5px;    
    color: var(--itech-gray);
    font-size: 1.2rem;
}
.submit-button {
    border: 1px solid var(--itech-gray);
    border-radius: 3px 3px 3px 3px;
    margin-top:25px;
    color: var(--itech-gray);
    font-size: 1.2rem;
    padding: 3px 35px;
    background-color: var(--white);
    transition: 500ms;
}
.submit-button:hover {
    color: var(--white);
    background-color: var(--itech-gray);
}    
</style>