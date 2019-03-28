<template>
    <div class="distpicker" >
		<select name="ProvinceName" class="sel"  v-model='order.ProvinceName'>
			<option v-for='ProvinceName in ProvinceNameList' :value="ProvinceName.RegionId" >{{ProvinceName.Name}}</option>
		</select>
		<select name="CityName" class="sel" v-model='order.CityName'>
			<option v-for='CityName in CityNameList' :value="CityName.RegionId">{{CityName.Name}}</option>
		</select>
		<select name="AreaName" class="sel" v-model='order.AreaName'>
			<option v-for='AreaName in AreaNameList' :value="AreaName.RegionId">{{AreaName.Name}}</option>
		</select>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
      	ProvinceName:'',
      	CityName:'',
      	AreaName:'',
      	ProvinceNameList:[],
      	CityNameList:[],
      	AreaNameList:[]
      }
    },
   
    created(){
    	this.get_ProvinceName_list();
    },
    watch:{
    	ProvinceName:{
    		handler(val,oval){
    			this.$store.dispatch('set_ProvinceName',val);
    			this.get_CityName_list();
    		},
    		deep:true
    	},
    	CityName:{
    		handler(val,oval){
    			this.$store.dispatch('set_CityName',val);
    			this.get_AreaName_list();
    		},
    		deep:true
    	},
    	AreaName:{
    		handler(val,oval){
    			this.$store.dispatch('set_AreaName',val);
    		},
    		deep:true
    	},
    },
    methods:{
    	get_ProvinceName_list(){
    		var that = this;
    		var options = {
    			url:'/sys_api_Regions_GetProviceList',
    		};
    		var cbok = function(res){
    			that.ProvinceNameList = res.data.data;
    			that.ProvinceName = that.ProvinceNameList[0].RegionId;
    		};
    		this.http.get(options,cbok);
    	},
    	get_CityName_list(){
    		var that = this;
    		var options = {
    			url:'/sys_api_Regions_GetCityList',
    			params:{
    				ProvinceId:that.ProvinceName
    			}
    		};
    		var cbok = function(res){
    			that.CityNameList = res.data.data;
    			that.CityName = that.CityNameList[0].RegionId;
    		};
    		this.http.get(options,cbok); 
    	},
    	get_AreaName_list(){
    		var that = this;
    		var options = {
    			url:'/sys_api_Regions_GetAreaList',
    			params:{
    				CityId:that.city
    			}
    		};
    		var cbok = function(res){
    			that.AreaNameList = res.data.data;
    			that.AreaName = that.AreaNameList[0].RegionId;
    		};
    		this.http.get(options,cbok); 
    	}
    }
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
    .relate{
    	padding: 0;
    	margin: 0;
    	font-size: 1;
    	display: flex;
    	justify-content:space-between;
    }
    select{
    	display: flex;
    	height: 40px;
    	padding: 5px 8px;
    	border-radius: 4px;
        background: #fff;
        box-sizing: border-box;
        text-align: left;
        width: 30%;
    }
   
</style>
