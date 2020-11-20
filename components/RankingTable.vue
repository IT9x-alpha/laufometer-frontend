<template>
  <div class="ranking-table">   
    <v-tabs v-bind=verticalToggle v-model="selectedTab">        
        <v-tab><v-img :src="activityImageURL('swimming')" max-width="100"></v-img></v-tab>  
        <v-tab><v-img :src="activityImageURL('jogging')" max-width="100"></v-img></v-tab>
        <v-tab><v-img :src="activityImageURL('cycling')" max-width="100"></v-img></v-tab>
        <v-tab-item>
            <v-data-table
                :headers="headers"
                :items="entries"
                :items-per-page="tableProps.itemsPerPage" 
                :height= "tableProps.height"
                :footer-props ="footerProps"                
                class="elevation-2"
            ></v-data-table>
        </v-tab-item>
        <v-tab-item>
            <v-data-table
                :headers="headers"
                :items="entries"
                :items-per-page="tableProps.itemsPerPage"
                :height= "tableProps.height"
                :footer-props ="footerProps"
                class="elevation-1"
            ></v-data-table>
        </v-tab-item>
        <v-tab-item>
            <v-data-table
                :headers="headers"
                :items="entries"
                :items-per-page="tableProps.itemsPerPage"
                :height= "tableProps.height"
                :footer-props ="footerProps"
                class="elevation-1"
            ></v-data-table>
        </v-tab-item>        
    </v-tabs>    
  </div>  
</template>

<script>
export default {
    data(){ 
        return {
            selectedTab: 0,
            tableProps: {
                itemsPerPage: 10,
                height: 535,

            },
            footerProps: {
                disableItemsPerPage: true,                    
                itemsPerPageText:'Zeilen pro Seite',
                pageText: '{0}-{1} von {2}'
            },
            headers: [
                {
                    text:'Ranking',
                    value: 'index'
                },
                {
                text: 'Gruppe',
                align: 'center',
                sortable: false,
                value: 'group',
                },
                { text: 'Strecke (km)',  align: 'center', sortable: false, value: 'distance' },                
            ],
            entries: [
                {
                    group: 'it9x',
                    distance: 15
                },
                {
                    group: 'it8y',
                    distance: 15
                },
                {
                    group: 'ck8x',
                    distance: 15
                },
                {
                    group: 'ck7z',
                    distance: 25.98
                },
                {
                    group: 'PC9a',
                    distance: 15.20
                },
                {
                    group: 'UT8a',
                    distance: 18
                },
                {
                    group: 'IT8b',
                    distance: 12
                },
                {
                    group: 'ck2c',
                    distance: 35
                },
                {
                    group: 'UT8a',
                    distance: 18
                },
                {
                    group: 'IT8b',
                    distance: 12
                },
                {
                    group: 'ck2c',
                    distance: 35
                },
            ]

        }
    },    
    computed: {      
        verticalToggle: function() {
            return ['xs','sm'].indexOf(this.$vuetify.breakpoint.name) > -1 ? {vertical:false} : {vertical:true}
        },
        activity: function() {
            switch (this.selectedTab) {
                case 0:
                    return 'swimming'
                    break;
                case 1:
                    return 'jogging'
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
            
        }, 
        testcolor: function(){
            return red
        }     
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
    color: red;
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
}
</style>