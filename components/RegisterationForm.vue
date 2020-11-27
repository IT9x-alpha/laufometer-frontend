<template>
    <v-form @submit.prevent="submitForm" ref="form" v-model="formIsValid">
        <div :class="['register_form '+  activity]">
            
            <div class="form-section">
                <v-radio-group v-model="activity">
                    <div class="d-flex flex-row justify-space-between">
                        <div class="activity-block swimming-block">
                            <label>
                                <v-radio type="radio" id="swimming" name="activity" value="swimming"></v-radio>
                                <img :src="activityImageURL('swimming')" alt="schwimmen"> 
                            </label> 
                        </div>
                        <div class="activity-block walking-block">                
                            <label>
                                <v-radio type="radio" id="walking" name="activity" value="walking"></v-radio>
                                <img :src="activityImageURL('walking')" alt="walking">                        
                            </label>                
                        </div>
                        <div class="activity-block cycling-block">
                            <label>
                                <v-radio type="radio" id="cycling" name="activity" value="cycling"></v-radio>
                                <img :src="activityImageURL('cycling')" alt="rad fahren">                       
                            </label>
                        </div> 
                    </div>
                </v-radio-group>                     
            </div>            
            <div class="form-section d-flex flex-column align-center">
                <div class="entry-block">                    
                    <v-text-field 
                        :label="unit" 
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
                        item-text="name"
                        item-value="id" 
                        label="Klasse:" 
                        :rules="selectRules"                         
                        color="gray"                        
                        :disabled="activity==''" 
                        v-model="group">
                    </v-select>                    
                </div>
    
                <div class="entry-block">                                        
                    <v-btn
                        class="submit-button"
                        outlined
                        :loading="submitInProgress"
                        :disabled="!formIsValid"                        
                        type="submit"
                        >
                        {{buttonText}}
                    </v-btn>                    
                </div> 
            </div>
        </div>            
    </v-form>
</template>

<script scoped>
import axios from "axios" 
export default {  
    name:"RegisterActivity",
    data() {
        return {
            activity: "",
            formIsValid: false,
            submitInProgress: false,
            buttonText: "Senden",
            group: "",
            groupItems: [],
            distance: "",            
            unit: "Wie viel?",
            minRagne: 0,
            maxRange:0,
            distanceRules: [
                value => !!value || 'erforderlich!',                
                value => {        
                    const convertedValue =  value && value.toString().replace(',', '.')
                    const errorMessage =  'muss zwischen ' + this.minRange + ' und '+ this.maxRange + ' sein!'        
                    return (convertedValue >= this.minRange && convertedValue <= this.maxRange ) ||  errorMessage                   
                },                
                value => {                    
                    const pattern = /^\d+(\,\d{0,2})?$/                    
                    return pattern.test(value) || 'ungültige Nummer!'
                },
            ],
            selectRules: [
                (value) => !!value || "erforderlich!"
            ],
            
        }
    },   
    watch: {                
         activity(value){             
             this.updateRange()
             this.distance = this.minRange
             this.unit = (value === "swimming") ? "meter" : "kilometer"             
         }
    },
    async mounted() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        }
      };
      try {
        const response = await axios.get("http://api.laufometer.local/group", config)        
        let groups = response.data.data.map(group => {        
        return {
            id: group.id,
            name: group.name,            
        }
        });
        this.groupItems= groups.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));        
      } catch (err) {
        console.log(err);        
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
            const walkingMinRange = 5
            const walkingMaxRange = 30
            const cyclingMinRange = 10
            const cyclingMaxRange = 100
            switch (this.activity) {
                case "swimming":
                    this.minRange = swimmingMinRange
                    this.maxRange = swimmingMaxRange
                    break;
                case "walking":
                    this.minRange = walkingMinRange
                    this.maxRange = walkingMaxRange
                    break;
                case "cycling":
                    this.minRange = cyclingMinRange
                    this.maxRange = cyclingMaxRange
                    break;
                default:
                    break;
            }

        },
        async submitForm(e){
            this.submitInProgress = true
            let distance = this.distance.toString().replace(',', '.')            
            let kilometers = (this.activity !== "swimming") ? distance : (distance/1000).toFixed(2)
            
            let formPayload = {
                'group_id': this.group,
                'activity_type': this.activity,
                'kilometers': kilometers
            }            
            axios(
                {
                    method: 'post',
                    url: 'http://api.laufometer.local/activity',
                    data: formPayload,
                    headers: {'Content-Type': 'application/json', 'Accept' : 'application/json' }    
                }
            ).then((response)=> {
                this.submitInProgress = false
                this.buttonText = "gesendet!"
                setTimeout( () => {
                    this.buttonText = "senden"
                    this.$refs.form.reset()                    
                }, 3000)
                                
            }).catch( () => {
                //handle error 
                this.submitInProgress = false               
                this.buttonText = "ein Fehler aufgetreten!"
                setTimeout( () => {
                    this.buttonText = "senden"
                    this.$refs.form.reset()                    
                }, 3000)
            })
                      
        }
    }    
}

</script>

<style>
.register_form {   
    padding: 5px 0;
}

.form-section{
    margin-bottom: 20px;    
}

.activity-block{
    width: 120px;
    padding: 15px;
    position: relative;
}
.activity-block .v-radio{
    position: absolute;
    bottom: 0;
    left:50%;
    margin-left: 4px;    
    justify-content: center;
    transform: translateX(-50%);
    width: 22px;
    height: 15px;
}

.activity-block img {
    margin-bottom: 10px;
}

.register-input {
    margin-top: 5px;    
    border: 1px solid var(--itech-lightGray);
    width: 13rem;
    text-align: center;
    padding: 5px 3px;
}

.entry-block {
    margin-bottom: 10px;
    padding: 5px;
    min-height:95px;
}

.entry-block label {
    width: 5rem;
}


.entry-block .submit-button {
    border: 1px solid var(--itech-gray);
    border-radius: 3px 3px 3px 3px;
    margin-top: 15px;
    color: var(--itech-gray)!important;
    font-size: 1.2rem;
    padding: 3px 35px!important;
    background-color: transparent!important;
    transition: 500ms;
    font-family: "Exo", sans-serif;    
}

.entry-block .submit-button:hover::before {
    color: var(--white)!important;
    background-color: var(--itech-lightGray)!important;
    opacity: 1;
}

.swimming .submit-button {
    border-color: var(--itech-blue)!important;
    color:  var(--itech-blue)!important;
}

.walking .submit-button {
    border-color: var(--itech-green)!important;
    color: var(--itech-green)!important;
}

.cycling .submit-button {
    border-color: var(--itech-red)!important;
    color: var(--itech-red)!important;
}

.swimming .v-input__slot::before , .swimming .v-input__slot::before {
	border-color: var(--itech-blue)!important;
} 

.walking .v-input__slot::before, .walking .v-input__slot::after {
	border-color: var(--itech-green)!important;
}

.cycling .v-input__slot::before, .cycling .v-input__slot::after {
	border-color: var(--itech-red)!important;
}

.v-application .swimming-block .primary--text {
    color : var(--itech-blue)!important;
}

.v-application .walking-block .primary--text {
    color: var(--itech-green)!important;
}

.v-application .cycling-block .primary--text {
    color: var(--itech-red)!important;
}

.entry-block .v-input {
    width:250px;
}
.v-label {
    color: var(--itech-gray)!important;
}

.v-messages__message {
    color: var(--red);
}

.v-text-field .v-label--active {	
	transform: translateY(-22px) scale(0.75);
    overflow: visible;
}

@media (min-width: 960px) {
    .activity-block{
        width: 120px;        
    }
}
@media (min-width: 1264px) {
    .activity-block{
        width: 130px;        
    }
}
@media (min-width: 1904px) {
    .activity-block{
        width: 150px;        
    }
}

</style>