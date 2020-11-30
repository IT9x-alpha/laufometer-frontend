<template>
  <div class="ranking-table">   
    <div>       
        <v-tabs v-bind=verticalToggle v-model="selectedTab">        
            <v-tab><v-img :src="activityImageURL('swimming')" max-width="100"></v-img></v-tab>  
            <v-tab><v-img :src="activityImageURL('walking')" max-width="100"></v-img></v-tab>
            <v-tab><v-img :src="activityImageURL('cycling')" max-width="100"></v-img></v-tab>
            <v-tab-item>
                <v-data-table
                    :headers="headers"
                    :items="entries.swimming"                    
                    :items-per-page=itemsPerPage 
                    :mobile-breakpoint= "0"
                    :loading="dataLoading"
                    :height=tableHeight
                    :footer-props="footerProps"
                    :hide-default-footer="hideFooter"                
                    class="elevation-1"
                >
                </v-data-table>
            </v-tab-item>
            <v-tab-item>
                <v-data-table
                    :headers="headers"
                    :items="entries.walking"
                    :items-per-page=itemsPerPage
                    :mobile-breakpoint= "0"
                    :height=tableHeight
                    :footer-props="footerProps"
                    :hide-default-footer="hideFooter"
                    class="elevation-1"
                ></v-data-table>
            </v-tab-item>
            <v-tab-item>
                <v-data-table
                    :headers="headers"
                    :items="entries.cycling"
                    :items-per-page=itemsPerPage
                    :mobile-breakpoint= "0"
                    :height=tableHeight
                    :footer-props ="footerProps"
                    :hide-default-footer="hideFooter"
                    class="elevation-1"
                ></v-data-table>
            </v-tab-item> 
        </v-tabs> 
        <v-icon
            small
            color="gray darken-2"
            @click="displayToggle"
            v-if="showDisplay"
            class="display-toggle"
            >
        {{displayIcon}}
        </v-icon>       
    </div>      
  </div>   
</template>

<script>
import axios from "axios" 
export default {    
    data(){ 
        return {
            dataLoading:true,            
            selectedTab: 0,
            displayMode: false,            
            footerProps: {
                disableItemsPerPage: true,                    
                itemsPerPageText:'Zeilen pro Seite',
                pageText: '{0}-{1} von {2}'
            },
            displayIcon: "mdi-play",
            hideFooter: false,
            headers: [
                {
                    text:'#',
                    align: 'center',
                    value: 'rank',
                    sortable: false,
                },
                {
                    text: 'Gruppe',
                    align: 'center',
                    sortable: false,
                    value: 'name',
                },
                {   text: 'Kilometer',  
                    align: 'center', 
                    sortable: false, 
                    value: 'kilometers' 
                },                
            ],
            entries: {},
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
        const response = await axios.get("http://api.laufometer.local/ranking", config);
        this.entries.walking = this.addRanking(response.data.data.walking)
        this.entries.swimming = this.addRanking(response.data.data.swimming)
        this.entries.cycling = this.addRanking(response.data.data.cycling)
        this.dataLoading = false        
      } catch (err) {
        console.log(err);        
      }
  
    },    
    computed: {      
        verticalToggle: function() {
            return ['xs','sm'].indexOf(this.$vuetify.breakpoint.name) > -1 ? {vertical:false} : {vertical:true}
        },
        showDisplay: function() {
            return ['xs','sm',"md"].indexOf(this.$vuetify.breakpoint.name) > -1 ? false : true
        },
        itemsPerPage: function() {
            return ['xl'].indexOf(this.$vuetify.breakpoint.name) > -1 ? 10 : 6
        },
        tableHeight: function() {
            return ['xl'].indexOf(this.$vuetify.breakpoint.name) > -1 ? 535 : 340
        },
        activity: function() {
            switch (this.selectedTab) {
                case 0:
                    return 'swimming'
                    break;
                case 1:
                    return 'walking'
                    break;
                case 2:
                    return 'cycling'
                    break;
                default:
                     return 'swimming';
            }
        },
        activityImageURL: function(){            
            return (currentActivity) =>  {                 
                const suffix = this.activity === currentActivity ? "_active" : "_normal"
                return require(`../assets/images/${currentActivity+suffix}.png`) 
            }          
            
        }
    },
    methods: {        
        addRanking: function(activity) {
            let index = 1            
            activity.forEach((arrayItem)=> {
                arrayItem.rank = index
                index++ 
            })
            return activity
        },
        displayToggle: function() {
            this.displayMode = !this.displayMode
            this.displayIcon = (this.displayIcon === "mdi-stop") ?  "mdi-play" : "mdi-stop"  
            let currentTab = 0
            let interval = setInterval(() => {                 
                if (this.displayMode) {                     
                    this.hideFooter = true                                                         
                    this.selectedTab = currentTab % 3
                    currentTab++
                }
                else { 
                    clearInterval(interval);                    
                    this.hideFooter = false                                                                             
                }
                }, 2000);          
            
        }
    },
}
</script>

<style>
.ranking-table {
    margin-bottom: 40px;
    position: relative;
}

.ranking-table .v-tabs--vertical > .v-tabs-bar .v-tab,  .ranking-table .v-tabs > .v-tabs-bar .v-tab{
     height:120px;
     margin: 10px;
 }

 .ranking-table .v-image__image {
     transition: background-image 0.2s ease-in-out; 
 }

 .ranking-table .v-tab::before  {     
     opacity: 0!important;
 } 

.ranking-table .v-window-item {
    text-align: center;
}

.ranking-table .v-tabs-slider {
    color: var(--itech-gray)!important;    
}

.ranking-table .v-tabs-items {
    margin-top: 10px;
    margin-left: 20px;
}

.ranking-table .display-toggle {
    position: absolute;
    top: -15px;
    left: 167px;
}

@media (max-width:960px) {
    .ranking-table .v-tabs-bar {
         height: 120px;
    }

    .ranking-table .v-slide-group__content {
        justify-content: center;
    }

    .ranking-table .v-image {
        max-width: 65px!important;
    }    

    .ranking-table .v-tabs--vertical > .v-tabs-bar .v-tab,  .ranking-table .v-tabs > .v-tabs-bar .v-tab{        
        margin: 3px;
    }
    .ranking-table .v-tabs-items {        
        margin-left: 0;
    }
}
</style>