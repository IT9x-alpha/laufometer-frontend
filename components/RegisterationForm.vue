<template>
    <v-form @submit.prevent="submitForm" ref="form" v-model="formIsValid">
        <div :class="['register_form '+  activity]">
            <div class="form-section d-flex flex-row justify-space-between">
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

            <div class="form-section d-flex flex-column align-center">
                <div class="entry-block">                    
                    <v-text-field 
                        label="Wie viel?" 
                        :rules="distanceRules" 
                        color="gray" 
                        @keyup="filterDistanceInput" 
                        :disabled="activity==''" 
                        hide-details="auto" 
                        v-model="distance" 
                        required>
                    </v-text-field>
                </div>
    
                <div class="entry-block">                    
                    <v-select 
                        :items="groupItems" 
                        label="welche Gruppe?" 
                        :rules="selectRules"                         
                        color="gray"                        
                        :disabled="activity==''" 
                        v-model="group">
                    </v-select>                    
                </div>
    
                <div class="entry-block">                    
                    <input class="submit-button" :disabled="!formIsValid" type="submit" value="Senden"> 
                </div>           
                   
            </div>
        </div>            
    </v-form>
</template>

<script scoped>
export default {  
    name:"RegisterActivity",
    data() {
        return {
            activity: "",
            formIsValid: false,
            group: "",
            groupItems: ['CK9a', 'CK9b', 'PC9a', 'UT8a', 'IT8b','IT9d','IT9x'],
            distance: "",            
            unit: "m",
            minRagne: 0,
            maxRange:0,
            distanceRules: [
                value => !!value || 'Required!',                
                value => {        
                    const convertedValue =  (value || '')
                    const errorMessage =  'muss zwischen ' + this.minRange + ' und '+ this.maxRange + ' sein.'        
                    return (convertedValue >= this.minRange && convertedValue <= this.maxRange ) ||  errorMessage                   
                },                
                value => {                    
                    const pattern = /^\d+(\,\d{0,1})?$/                    
                    return pattern.test(value) || 'Invalid number.'
                },
            ],
            selectRules: [
                (value) => !!value || "Required!"
            ],
            
        }
    },    
    watch: {    
            
         activity(value){             
             this.updateRange()
             this.distance = this.minRange
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
            e.target.value = e.target.value.replace(/[^0-9,]+/g, '') 
            this.distance = e.target.value 
        },       
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

.form-section{
    margin-bottom: 45px;    
}

.activity_block{
    width: 150px;
    padding: 15px;
    position: relative;
}
.activity_block input{
    position: absolute;
    bottom: 0;
    left:50%;
    transform: translateX(-50%);
    width: 15px;
    height: 15px;
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
    padding: 5px;
    min-height:95px;
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
    margin-top: 15px;
    color: var(--itech-gray);
    font-size: 1.2rem;
    padding: 3px 35px;
    background-color: var(--white);
    transition: 500ms;
}

.swimming .submit-button {
    border-color: var(--itech-blue);
    color:  var(--itech-blue);
}

.jogging .submit-button {
    border-color: var(--itech-green);
    color: var(--itech-green);
}

.cycling .submit-button {
    border-color: var(--itech-red);
    color: var(--itech-red);
}

.submit-button:hover {
    color: var(--white);
    background-color: var(--itech-gray);
}

.swimming .v-input__slot::before , .swimming .v-input__slot::before {
	border-color: var(--itech-blue)!important;
} 

.jogging .v-input__slot::before, jogging .jogging .v-input__slot::after {
	border-color: var(--itech-green)!important;
}

.cycling .v-input__slot::before, .cycling .v-input__slot::after {
	border-color: var(--itech-red)!important;
}

.v-input {
    width:250px;
}
.v-label {
    color: var(--itech-gray)!important;
}

.v-messages__message {
    color: var(--red);
}

.v-application .primary--text {
    color: var(--itech-gray)!important;    
}

.v-text-field .v-label--active {	
	transform: translateY(-22px) scale(0.75);
    overflow: visible;
}

</style>
