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
                    :mobile-breakpoint= "false"
                    :loading="dataLoading"
                    :height=tableHeight                    
                    :footer-props="footerProps"                
                    class="elevation-1"
                >
                </v-data-table>
            </v-tab-item>
            <v-tab-item>
                <v-data-table
                    :headers="headers"
                    :items="entries.walking"
                    :items-per-page=itemsPerPage
                    :mobile-breakpoint= "false"
                    :height=tableHeight
                    :footer-props="footerProps"
                    class="elevation-1"
                ></v-data-table>
            </v-tab-item>
            <v-tab-item>
                <v-data-table
                    :headers="headers"
                    :items="entries.cycling"
                    :items-per-page=itemsPerPage
                    :mobile-breakpoint= "false"
                    :height=tableHeight
                    :footer-props ="footerProps"
                    class="elevation-1"
                ></v-data-table>
            </v-tab-item>        
        </v-tabs>         
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
            footerProps: {
                disableItemsPerPage: true,                    
                itemsPerPageText:'Zeilen pro Seite',
                pageText: '{0}-{1} von {2}'
            },
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
        itemsPerPage: function() {
            return ['xs','sm'].indexOf(this.$vuetify.breakpoint.name) > -1 ? 5 : 10
        },
        tableHeight: function() {
            return ['xs','sm'].indexOf(this.$vuetify.breakpoint.name) > -1 ? 295 : 535
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
    },
}
</script>

<style>

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
    margin-top: 40px;
    margin-left: 20px;
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