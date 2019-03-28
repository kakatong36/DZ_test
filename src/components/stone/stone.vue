<template>
    <div class="content" id="content">
        
        <!--<div class="data-no" v-if='!stoneList.data_list || stoneList.data_list.length == 0'></div>-->
        <v-nodata v-show='isnodata'></v-nodata>
        <div class="table-stone" ref="table">
            <table  >
                <thead>
                    <tr>
                        <th>货品编号</th>
                        <th>形状</th>
                        <th>重量</th>
                        <th>颜色</th>
                        <th>净度</th>
                        <th>切工</th>
                        <!--<th>抛光</th>
                        <th>对称</th>
                        <th>荧光</th>-->
                        <!-- <th>证书</th> -->
                        <th>克拉单价($)</th>
                        <th>扣点</th>
                        <th>价格</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(stone,index) in stoneList'  @click='set_stone(stone)' :key="stone.Id">
                        <td>{{index+1}}</td>
                        <td>{{stone.Shape}}</td>
                        <td>{{stone.Weight}}</td>
                        <td>{{stone.Color}}</td>
                        <td>{{stone.Cleanliness}}</td>
                        <td>{{stone.Cut}}</td>
                        <!-- <td>{{stone.CertificateType}}</td> -->
                        <td>{{stone.CaratUnitPrice}}</td>
                        <td>{{stone.Points}}</td>
                        <td>{{stone.SalesPrice}}</td>
                        <td class="check"><input type="radio" name="stone" :value='stone.Id' v-model='$store.state.dialog.cur_stone.Id'/><i></i></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--弹窗-->
        <transition name='slide-down'>
	        <modal-dialog :show="show">
	            <div class="dialog-header" slot="header">
	                <h1 class="dialog-title">定制成品</h1>
	            </div>
	
	            <div class="dialog-body" slot="body">
	                <ul class="stone-img">
	                    <li class="table-box">
	                        <div class="cell img-left">
	                            <img :src="http.imgUrl+$route.params.MainImg" v-if="$route.params.MainImg" height="80" width="80">
                                <img src="../../assets/ps_17101611163885870100.jpg" v-else  height="80" width="80"/>
	                        </div>
	                        <div class="cell info-right">
	                            <span class="">空托</span>
	                            <span class="right">{{curStyle.ProductPrice}}</span>
	                            <ul class="list-box">
	                                <li class="list" v-for='(attr,index) in curStyle.SkuAttrList' :key="index">{{attr.StyleAttrName}}:{{attr.StyleAttrValueName}}</li>
	                            </ul>
	                        </div>
	                    </li>
	                    <li class="table-box" v-if='curStone.Id'>
	                        <div class="cell img-left">
	                           <img src="../../common/images/stone/zuan.png" height="80" width="80">
	                        </div>
	                        <div class="cell info-right">
	                            <span class="">配石</span>
	                            <span class="right">{{curStone.SalesPrice}}</span>
	                            <ul class="list-box">
	                                <li class="list">形状：{{curStone.Shape}}</li>
	                                <li class="list">颜色：{{curStone.Color}}</li>
	                                <li class="list">净度：{{curStone.Cleanliness}}</li>
	                                <li class="list">切工：{{curStone.Cut}}</li>
	                            </ul>
	                        </div>
	                    </li>
	                </ul>
	            </div>
	            <div class="dialog-footer table-box" slot="footer">
	                <span class="cell" @click='shop_agin'>继续选购</span>
	                <span class="cell" @click='go_cart'><span>去结算</span></span>
	            </div>
	        </modal-dialog>
        </transition>
        <div class='stone-marsk' v-show='isSearch' @click='isSearch = false'></div>
        <div class='stone-search-btn' @click='isSearch = true'>条件筛选</div>
          <transition name='slide'>
            <div class="search-wrapper" v-show='isSearch' style="width: 45%;">
                    <div class="search-inner">
                        <div class="search-head">
                            <h4>条件筛选</h4>
                            <span class="close" @click='isSearch = false'><img src="../../common/images/stone/icon_close@3x.png"/></span>
                        </div>
                        <div class="search-content">
                            <h6>钻重</h6>
                            <v-dbSlide v-on:dbslide="getNum"></v-dbSlide>
                            
                            <!-- <div class='progress-box'>
                                <div class="progress-warpper">
                                    <progress :value="progress" max="200" ></progress>
                                </div>
                                <input type="range" name="" max="200" v-model='progress' @change='set_search_weight'/>
                                <span :style="{marginLeft:progress/2.25+'%'}">{{(progress/100).toFixed(2)}}&nbsp;<i>ct</i></span>
                            </div> -->
                           <!-- <h6>价格</h6> -->
                           <!-- <div class='progress-box'>
                                <div class="progress-warpper">
                                    <progress :value="progress" max="2000" ></progress>
                                </div>
                                <input type="range" name="" min="100" max="2000" v-model='progress'/>
                                <span :style="{marginLeft:progress/22.5+'%'}">{{(progress)}}&nbsp;<i>ct</i></span>
                            </div> -->
                            <!-- <div class="price-area">
                                <div class="input-group">
                                    <input type="number" name="" v-model='price_low'  />
                                    <span>元</span>
                                </div>       
                                <span>~</span>
                                <div class="input-group">
                                    <input type="number" name="" v-model='price_height' />
                                    <span>元</span>
                                </div> 
                            </div> -->
                            <div class="stone-attr" v-for='group in stoneSelect' :key="group.Id">
                                    <h6>{{group.Name}}</h6>
                                    <ul class="attr-box clearfix" >
                                        <li v-for='value in group.Valueitem'  @click='get_value(group,value)' :key="value.Id">                    
                                            <div class="value" :class='{active:AttrSearchs[group.Id] == value.Id}' >
                                                {{value.ValueText}}
                                            </div>
                                        </li>
                                    </ul>                  
                            </div>        
                        </div>
                         <div class='stone-btn-group'>
                               <button @click='stone_searchs'>确定</button>
                               <button @click='cancel_searchs'>取消</button>
                          </div>
                    </div>
            </div>
         </transition>
         <div class="page-wrapper">
              <v-page  :total="total" :display='display' :current.sync="current" @getPage='set_cur_page'></v-page>
         </div>
        <v-footer :isbtn='true' :isPrice='false' :textBtn='textBtn' :actives='actives' @nextaction='open_dialog'></v-footer>
        <v-layer :open='layer_open' :msg='layer_msg'></v-layer>
        <v-shortcat></v-shortcat>
    </div>
</template>

<script>
  import Dialog from 'components/dialog/dialog'
  import footer from 'components/footer/footer'
  import Layer from 'components/layer/layer'
  import shortcat from 'components/home/shortcat'
  import page from 'components/page/page'
  import nodata from 'components/nodata/nodata'
  import dbSlide from 'components/dbSlide/dbSlide'
  var loginer =JSON.parse(localStorage.getItem('user'));
  var stone_progress = [];

  import styleImg from '../../assets/ps_17101611163885870100.jpg'

  export default {
    data () {
      return {
            styleImg: styleImg,
            total: 0,
            display: 15,
            current: 1,
            price_low:'',
            price_height:'',
            isShowH: this.$store.state.header.isShow = true,
            title: this.$store.state.header.title == '宝石款式选择',
            isShowF: this.$store.state.footer.isShow = true,
            progress:0,
            textBtn:'',
            show: false, 
            actives:[],
            stoneList:[],
            curStyle:{},
            curStone:{},
            searchs:{
                PageIndex:1,
                PageSize:30,
                StartWeight:0,
                EndWeight: 2,
                StoneClass:'',
                Shape:'',
                Colour:'',
                Cleanliness:'',
                Cut:'',
                Weight:'',
                price:''
            },
            AttrSearchs:{},
            imgUrl:this.$store.state.header.imgUrl,
            imgModel:this.$store.state.header.imgModel ,
            layer_open:false,
            layer_msg:'',
            isSearch:false,
            stoneSelect:{},
            cateAttr:{},
            isnodata:false,
            fromDetail: false,
            page:1,
            isloading: true,
            isExist: 1,
        }
    },
    beforeRouteLeave (to, from, next) {
       this.$store.state.header.isShow = false;
       if(to.name == 'fashion'){
       	/*进入时尚定制初始页的时候清除所有存储的参数*/
       	  this.$store.dispatch('clear_cache');
       };
       next();
    },
    mounted () {
        let table = this.$refs.table;
        let that = this;
        this.$nextTick(() => {
            table.addEventListener('scroll', function() {
                if(that.stoneList.length == 0){ 
                    return false
                }
                if (that.getScrollTop() + that.getClientHeight() == that.getScrollHeight()) {
                    if(that.isloading){
                        that.isloading = false;
                        that.get_stone (that.page);
                    }
                }else{
                }
            }, false)
        })  
        
    },
    created(){
        if(this.$store.state.dialog.cur_style.Id){
           stone_progress =  ['选款','选石','结算','完成'];
        }else{
           stone_progress =  ['选石','选款','结算','完成'];
        }

        this.$store.state.footer.progress = stone_progress;
    	this.$store.state.footer.isPrice = false
    	this.$store.state.footer.isStep = true;
    	
        if(this.$route.params.id == 'list'){
            this.actives = [0]
        }else{
            this.searchs.StartWeight = this.$route.params.id;
            this.searchs.EndWeight = this.$route.params.id
            this.progress = this.$route.params.id*100
            this.actives = [0,1];
        }
        if(this.$route.params.shape != 0){
            this.searchs.Shape = this.$route.params.shape
            this.fromDetail = true
        }else{
            this.searchs.Shape = '圆形'
            this.$set(this.AttrSearchs, '59280e6b-9dd9-4616-8eb3-c25fb93d7fff', '圆形')
        }
        if(this.$route.params.color != 0){
            this.searchs.Colour = this.$route.params.color
        }
        if(this.$route.params.cleanliness != 0){
            this.searchs.Cleanliness = this.$route.params.cleanliness
        }
        if(this.$store.state.dialog.cur_style.Id){
        	this.textBtn = '提交';
        }else{
        	this.textBtn = '下一步';
        }
        this.$store.state.footer.isbtn = true;
        this.get_stone();
    },
    methods:{
        scrolls () {
            let that = this;
            if (that.getScrollTop() + that.getClientHeight() == (that.getScrollHeight())) {
                console.log(55)
            }else{
            }
        },
        getScrollTop () {//获取滚动条当前的位置 
            var scrollTop = 0; 
            if (document.documentElement && document.documentElement.scrollTop) { 
                scrollTop = this.$refs.table.scrollTop; 
            } 
            else if (document.body) { 
                scrollTop = this.$refs.table.scrollTop; 
            } 
            return scrollTop;
        },
        getClientHeight () {//获取当前可视范围的高度 
            var clientHeight = 0; 
            if (this.$refs.table.clientHeight && this.$refs.table.clientHeight) { 
                clientHeight =  this.$refs.table.clientHeight; 
            } 
            else { 
                clientHeight =  this.$refs.table.clientHeight; 
            } 
            return clientHeight;
        },
        getScrollHeight () {//获取文档完整的高度
            return this.$refs.table.scrollHeight;
        },
        getNum (leftVal,rightVal) {
            // console.log(leftVal)
            // console.log(rightVal)
           
            this.searchs.StartWeight =  leftVal
            this.searchs.EndWeight =  rightVal
        },
       /*获取裸石列表*/
    	get_stone(page){
    		var that = this;
    		
    		that.loading();
    		
    		for(var _key in this.searchs){
    			if(this.searchs[_key] == ''){
    				delete this.searchs[_key]
                }
                if(!this.searchs.StartWeight){
                    this.searchs.StartWeight = 0
                }
                if(!this.searchs.EndWeight){
                    this.searchs.EndWeight = 0
                }
            };
            if(page){
                that.searchs.PageIndex = page;
            }
    		var options = {
    			url:'/system_Api_StoneCost_Search',
    			params:that.searchs
    		};
    		var cbok = function(res){
                let resData = res.data.data.data_list;
               
    			// that.stoneList = res.data.data.data_list;
                that.total = res.data.data.total_count;
                that.current = res.data.data.page;
                that.isnodata = false;
                
                if(resData.length%30 == 0) {//只有后台返回来的数据为30的倍数才选择加一
                    that.page ++ ;
                }
                if(page) {
                    that.isloading = true;
                    if(that.isExist != page) {//这里判断的是否已经全部加载完数据了
                        resData.forEach(item => {
                            that.stoneList.push(item);
                        })
                    }
                }else{//这里是页面刚进来的时候加载
                    resData.forEach(item => {
                        that.stoneList.push(item);
                    })
                }
                that.isExist = page;
                that.closeLoad();

                if(that.isSearch){
                    that.isSearch = false;
                };
                if(that.fromDetail){
                    that.stoneList[0] && that.set_stone(that.stoneList[0])
                    that.fromDetail = false
                }
    		};
    		
            var cbno = res =>{
                this.bombox.tomast({
                    msg:res.data.message,
                    type:'warning'
                });
                that.closeLoad();
            	that.isnodata = true;
                this.stoneList = [];
            };

            var cbnull = res =>{
            	that.closeLoad();
            	that.isnodata = true;
                this.stoneList = [];
                if(that.isSearch){
                    that.isSearch = false;
                };
            };
    		this.http.get(options,cbok,cbno,cbnull);
    	},
    	open_dialog(){
            var that = this;
            this.curStyle = this.$store.state.dialog.cur_style
            this.curStone = this.$store.state.dialog.cur_stone;
            if(this.curStone.Id == undefined){
                this.bombox.tomast({
                    msg:'请选择配石',
                    type:'warning'
                });
                return;
            }
            if(this.curStyle.Id == undefined){
                that.$router.push({
                    path:'/fashion/style'
                })
                return;
            }
            var that = this;
            var params = {List:[]}
            let data = {
                StyleId: this.curStyle.Id,
                ProductName: this.curStyle.ProductName,
                ProductPrice: this.curStyle.ProductPrice,
                Quantity: 1,
                SkuId: this.curStyle.SkuId,
                Weight: this.curStyle.Weight,
                Stones: [
                    {
                        StoneID: this.curStone.Id,
                        Quantity: 1
                    }
                ]

            }
    	    params.List.push(data);
            this.loading();
    	    var options = {
    	    	url:'/Order_Api_CustomizeCart_CreateCustomizeCart',
    	    	params:params
    	    };
    	    var cbok = function(res){
                that.closeLoad();
                that.$store.dispatch('open_dialog');
    	    };
    	    var cbno = function(res){
                that.closeLoad();
    	    	that.bombox.tomast({
    				msg:res.data.message,
    				type:'warning'
    			});
    	    }
            this.http.post(options,cbok,cbno);
    	},
    	set_stone(stone){
    		this.$store.dispatch('set_cur_stone',stone);
            var params = {
                stoneIncut:'',
                stoneWeightRange:stone.Weight+'-'+stone.Weight
            };
            this.$store.dispatch('set_stone_params',params)
    	},
    	go_cart(){
    		this.set_select_product();
    	},
    	shop_agin(){
    		if(this.curStone.Id != undefined){
                this.$store.dispatch('set_cur_style',{});
    	    	this.$store.dispatch('set_cur_stone',{});
    			this.$store.dispatch('set_select_product');
    		};
    		this.$store.dispatch('close_dialog');
            //清楚缓存的用以筛选款式的裸石形状和重量区间
             var params = {
                stoneIncut:'',
                stoneWeightRange:''
            };
            this.$store.dispatch('set_stone_params',params);
    		this.$router.push({
    			path:'/fashion'
    		});   	   
    	},
    	tips(msg){
    		var that = this;
    		that.layer_msg = msg;
    		that.layer_open = true;
    		setTimeout(function(){
    			that.layer_open = false;
    		},1500)
    	},
    	set_select_product(){
            this.$store.dispatch('set_cur_style',{});
            this.$store.dispatch('set_cur_stone',{});
            this.$store.dispatch('set_select_product');
    		this.$store.dispatch('close_dialog');
            //清楚缓存的用以筛选款式的裸石形状和重量区间
            var c_params = {
                stoneIncut:'',
                stoneWeightRange:''
            };
            this.$store.dispatch('set_stone_params',c_params);
            this.$router.push({
                path:'/fashion/fashionStatements'
            }); 
    	},

        /*设置裸石搜索条件克重选择*/
        set_search_weight(){
            if(this.progress == 0){
                delete this.searchs.StartWeight
                delete this.searchs.EndWeight
            }else{
                this.searchs.StartWeight = 0 
                this.searchs.EndWeight =  this.progress/100
            }
            
            // this.get_stone();
        },
        /*裸石选择*/
        get_value(cate,value){
            var that = this;
            if(!this.AttrSearchs[cate.Id]){
                this.$set(this.AttrSearchs,cate.Id,value.Id);
            }else{
                if(this.AttrSearchs[cate.Id] == value.Id){
                    this.AttrSearchs[cate.Id] = '';
                }else{
                    this.AttrSearchs[cate.Id] = value.Id;
                }
            };
            console.log(this.AttrSearchs)
            switch(cate.Name){
                case "颜色":
                    if(!this.AttrSearchs[cate.Id]){
                        delete that.searchs.Colour;
                    }else{
                        that.searchs.Colour = value.Id;
                    }
                    break;
                case "净度":
                    if(!this.AttrSearchs[cate.Id]){
                        delete that.searchs.Cleanliness
                    }else{
                        that.searchs.Cleanliness = value.Id;
                    }
                    break;
                case "切工":
                    if(!this.AttrSearchs[cate.Id]){
                        delete	that.searchs.Cut ;
                    }else{
                        that.searchs.Cut = value.Id;
                    }                    
                    break;
                case "证书":
                    if(!this.AttrSearchs[cate.Id]){
                        delete that.searchs.CertificateType ;
                    }else{
                        that.searchs.CertificateType = value.Id;
                    }                             
                    break;
                case "形状":
                    if(!this.AttrSearchs[cate.Id]){
                        delete that.searchs.Shape;
                    }else{
                        that.searchs.Shape = value.Id;
                    }
                    break;
            };
        },
        /*设置分页当前页*/
        set_cur_page(cur){
            this.current = cur;
            this.searchs.PageIndex = cur;
            this.get_stone();
        },
        //条件筛选
        stone_searchs(){
            /*if(this.price_low != '' || this.price_height !=''){
                if(this.price_low == ''){
                    this.price_low = 0;
                    
                };
                if(this.price_height == '' || this.price_height<this.price_low || this.price_low == this.price_height){
                    this.bombox.tomast({
                        msg:'价格区间最大值不能小于等于最小值',
                        type:'warning'
                    });
                    return;
                };
                

                this.searchs.price = this.price_low+'-'+this.price_height;
            };*/
            this.searchs.PageIndex = 1;
            this.page = 1;
            // this.isloading = false;
            this.stoneList = []
            this.get_stone();
        },
        cancel_searchs(){
            this.searchs.PageIndex = 1;
            for(var _key in this.searchs){
                if(_key != 'PageIndex' && _key != 'PageSize'){
                    this.searchs[_key] = '';
                }
            };
            this.searchs.EndWeight = 2;
            this.AttrSearchs = {};
            this.price_low = '';
            this.price_height = '';
            this.progress = 0;
            this.stoneList = [];
            this.get_stone();

        }
    },
    watch:{
        isSearch:{
            handler(val,oval){
                if(!this.isSearch){
                    return
                }
                if(!val.CategoryId){
                    var options = {
                        url:'/purchase_Api_Select_CategorySelectList',
                        params:{
                            //platId: '4605e023-5c52-4623-82f7-e6fe7dfd68db',
                            categoryId: 'c9f97e28-334e-49b5-b345-f71c73298578'
                        }
                    };
                    /* let data = [
                                {
                                    "DictionaryId": "e9592270-43e0-40c7-bf6e-e47981fa96b2",
                                    "DictionaryName": "石头证书",
                                    "AttrValueList": [
                                        {
                                            "Id": "a6991aed-82f0-426b-87f3-70b5ce9bd7ee",
                                            "AttributeConfigId": "2fe05069-167c-4b77-b906-5f311aa217fe",
                                            "DictionaryValueId": "6bd48e9b-9ca7-48ca-b8ed-26219f672d68",
                                            "DictionaryValueName": "GIA",
                                        }
                                    ]
                                },
                                {
                                    "DictionaryId": "52303676-b854-4f2c-a9b4-165b1978738f",
                                    "DictionaryName": "净度",
                                    "AttrValueList": [
                                        {
                                            "Id": "40e61416-36b4-4402-9c97-60684008e840",
                                            "AttributeConfigId": "6d89de88-de00-4099-aee5-60c8a87230e2",
                                            "DictionaryValueId": "ef66098e-bf12-4216-b8de-44afc4265356",
                                            "DictionaryValueName": "VVS1",
                                        },
                                        {
                                            "Id": "a989fdc3-fd6d-4181-9cec-80adfe65f273",
                                            "AttributeConfigId": "6d89de88-de00-4099-aee5-60c8a87230e2",
                                            "DictionaryValueId": "6fd50db8-eeec-40f0-a883-888a5abd93d1",
                                            "DictionaryValueName": "FL",
                                        },
                                        {
                                            "Id": "e7ada643-113c-453f-befc-bea9fceb7dd1",
                                            "AttributeConfigId": "6d89de88-de00-4099-aee5-60c8a87230e2",
                                            "DictionaryValueId": "ef0d1ac8-286f-4faf-bbc3-be4085abc765",
                                            "DictionaryValueName": "VS2",
                                        },
                                        {
                                            "Id": "b270d9b9-6a6d-4d9b-bf03-42f671cb43c3",
                                            "AttributeConfigId": "6d89de88-de00-4099-aee5-60c8a87230e2",
                                            "DictionaryValueId": "243931ce-54d7-4e27-b3e0-563e60b9d2ca",
                                            "DictionaryValueName": "VS1",
                                        },
                                        {
                                            "Id": "2a7ab061-ab1d-40fb-9141-bef4877892ec",
                                            "AttributeConfigId": "6d89de88-de00-4099-aee5-60c8a87230e2",
                                            "DictionaryValueId": "77525a5f-2217-48aa-8490-e1e1b54a1ad1",
                                            "DictionaryValueName": "VVS2",
                                            "ComputeValue": null
                                        }
                                    ]
                                },
                                {
                                    "DictionaryId": "226f5fe8-71ef-42d6-9dcc-6a31cdf327b4",
                                    "DictionaryName": "裸石颜色",
                                    "AttrValueList": [
                                        {
                                            "Id": "e47f1933-fa1c-4d02-b659-248ec19b3f54",
                                            "AttributeConfigId": "282c8aaa-b273-4565-882d-7753aa303d01",
                                            "DictionaryValueId": "d6cc42cf-c3ff-4a26-aae1-baa8b9f3ed09",
                                            "DictionaryValueName": "D-E",
                                        },
                                        {
                                            "Id": "bc709423-99a4-44cd-aa5b-05b7bee72f87",
                                            "AttributeConfigId": "282c8aaa-b273-4565-882d-7753aa303d01",
                                            "DictionaryValueId": "c8bed140-92cb-4255-b35a-8eaae62561a4",
                                            "DictionaryValueName": "F-G",
                                        },
                                        {
                                            "Id": "93747ba1-3e1c-4379-b9b2-56cb69bac23f",
                                            "AttributeConfigId": "282c8aaa-b273-4565-882d-7753aa303d01",
                                            "DictionaryValueId": "016a669a-7c54-4f50-8702-ae409ee639bb",
                                            "DictionaryValueName": "H",
                                        },
                                        {
                                            "Id": "9322fce2-b2b7-4382-8893-cd0f5f4f6cd9",
                                            "AttributeConfigId": "282c8aaa-b273-4565-882d-7753aa303d01",
                                            "DictionaryValueId": "a2dd5d0d-aecf-4fd2-9e87-4639508ce37f",
                                            "DictionaryValueName": "I-J",
                                        }
                                    ]
                                },
                                {
                                    "DictionaryId": "59280e6b-9dd9-4616-8eb3-c25fb93d7fff",
                                    "DictionaryName": "形状",
                                    "AttrValueList": [
                                        {
                                            "Id": "fd5c388c-6444-40ef-ae2f-8481c2bf41a4",
                                            "AttributeConfigId": "eaffd42c-5797-4289-b872-2f600d4d67fe",
                                            "DictionaryValueId": "306cb768-fe26-42a6-b861-ded2d42756d8",
                                            "DictionaryValueName": "圆形",
                                        },
                                        {
                                            "Id": "d8bc9beb-bf69-4ed7-b759-6b1d438d6c91",
                                            "AttributeConfigId": "eaffd42c-5797-4289-b872-2f600d4d67fe",
                                            "DictionaryValueId": "babe98ec-cb1d-4290-90cb-e15eb2284e01",
                                            "DictionaryValueName": "梨形",
                                        },
                                        {
                                            "Id": "ccd3286c-5f88-4f3f-af16-03c9d857e360",
                                            "AttributeConfigId": "eaffd42c-5797-4289-b872-2f600d4d67fe",
                                            "DictionaryValueId": "129b79a7-648d-4562-aa72-2e092a4d266a",
                                            "DictionaryValueName": "方形",
                                        }
                                    ]
                                },
                                {
                                    "DictionaryId": "51554c72-73df-4b28-b3b8-5f4339bf8e29",
                                    "DictionaryName": "切工",
                                    "AttrValueList": [
                                        {
                                            "Id": "5784ea19-d7fc-4b94-a585-c3617a315ae3",
                                            "AttributeConfigId": "1670b82d-643c-47ff-b153-b3736fafdc18",
                                            "DictionaryValueId": "07bf5a75-e791-4805-9635-ae9688653b9e",
                                            "DictionaryValueName": "EX",
                                        },
                                        {
                                            "Id": "c14efa35-4af6-4df5-91bb-437afb8fd922",
                                            "AttributeConfigId": "1670b82d-643c-47ff-b153-b3736fafdc18",
                                            "DictionaryValueId": "92e0455e-53ea-4e45-b716-91a47cde4c90",
                                            "DictionaryValueName": "F",
                                        },
                                        {
                                            "Id": "bc1d6bf6-c0bd-4a90-9783-39f5c16bdeb6",
                                            "AttributeConfigId": "1670b82d-643c-47ff-b153-b3736fafdc18",
                                            "DictionaryValueId": "e0f6db2a-f407-43d7-85a7-11af2e301633",
                                            "DictionaryValueName": "G",
                                        },
                                        {
                                            "Id": "b21b966c-ffeb-48d5-bd00-3f02a21caa1f",
                                            "AttributeConfigId": "1670b82d-643c-47ff-b153-b3736fafdc18",
                                            "DictionaryValueId": "db586c75-69a8-42a6-9cc8-c337d2e82419",
                                            "DictionaryValueName": "P",
                                        }
                                    ]
                                }
                            ] */
                    var cbok = res =>{
                        let data = [],
                            list = [],
                            result = res.data.data
                        if(result && result.GroupList && result.GroupList[0]){
                            list = result.GroupList[0].AttrList || []
                        }
                        list.forEach((item, index, array) => {
                            item.Name = item.DictionaryName
                            item.Id = item.DictionaryId
                            switch(item.DictionaryId){
                                case '59280e6b-9dd9-4616-8eb3-c25fb93d7fff'://形状
                                    item.currentIndex = 1
                                    break
                                case '38c68791-1293-4249-8be8-7eac151e6b9f'://颜色
                                    item.currentIndex = 2
                                    item.Name = '颜色'
                                    break
                                case '52303676-b854-4f2c-a9b4-165b1978738f'://净度
                                    item.currentIndex = 3
                                    break
                                case '51554c72-73df-4b28-b3b8-5f4339bf8e29'://切工
                                    item.currentIndex = 4
                                    break
                                /* case 'e9592270-43e0-40c7-bf6e-e47981fa96b2'://证书
                                    item.Name = '证书'
                                    item.currentIndex = 5
                                    break */
                            }
                            
                            if(item.currentIndex){
                                item.Valueitem = []
                                /* if(item.currentIndex == 4){
                                    item.Valueitem = [
                                        {ValueText: '3EX',Id: '0'},
                                        {ValueText: '3VG及以上',Id: '1'},
                                        {ValueText: '其他',Id: '2'}
                                    ]
                                }else{
                                    item.AttrValueList && item.AttrValueList.length &&  item.AttrValueList.forEach(attr => {
                                        item.Valueitem.push({
                                            ValueText: attr.DictionaryValueName,
                                            Id: attr.DictionaryValueName
                                        })
                                    })
                                } */
                                item.AttrValueList && item.AttrValueList.length &&  item.AttrValueList.forEach(attr => {
                                    item.Valueitem.push({
                                        ValueText: attr.DictionaryValueName,
                                        Id: attr.DictionaryValueName
                                    })
                                })
                                data.push(item)
                            }
                        })
                        data.sort((a,b) => {
                            return a.currentIndex - b.currentIndex
                        })
                        this.stoneSelect = data;
                    };

                    this.http.get(options,cbok);
                }
            },
            deep:true
        },
    },
    components:{
      'modal-dialog':Dialog,
      'v-footer':footer,
      'v-layer':Layer,
      'v-shortcat':shortcat,
      'v-page':page,
      'v-nodata':nodata,
      'v-dbSlide': dbSlide
    }
  }
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
.data-no{
    @include bg-image('../../common/images/stone/nodata');
    background-position:center;
    background-size:30% auto;
    position:absolute;
    left:0;
    bottom:0;
    right:0;
    top:0;
}
    #content{
        height: 100%;
        width: 100%;
    }
.slide-enter-active,.slide-leave-active{
    transition:all .5s ease-out;
    -webkit-transition:all .5s ease-out;
    transform:translate3d(0,0,0);
    -webkit-transform:translate3d(0,0,0);
}
.slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0);
    -webkit-transform:translate3d(100%,0,0);
}

.progress-box{
    
    position:relative;
    margin-top:10px;
    .progress-warpper{
        width:96%;
        height:20px;
        border-radius:10px;
        overflow:hidden;
        margin-left:2%;
        border-radius:10px;
        background-color: #f7f7f7;
    }
    span{
        display:block;
        margin-top:15px;
        text-indent:2px;
        color:#3f3f3f;
        font-size:12px;
        i{
            font-size:10px;
            color:#999;
            font-style:normal;
        }
    }
    progress{
        width:100%;
        height: 20px;
        background-color: #f7f7f7;
        &::-webkit-progress-bar{
             background: #f7f7f7;
         }
        &::-webkit-progress-value{
             background: #D6BEA2;     
             border-radius:10px   
         }
    }
    input[type='range']{
        position:absolute;
        top:0px;
        left:0px;
    }
    
    input[type=range] {
    -webkit-appearance: none;
    width: 300px;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    outline:none;
    background-color:transparent;
    width:99%;
    border:none;
   
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
}
input[type=range]::-webkit-slider-runnable-track {
    height: 20px;
    border-radius: 10px; /*将轨道设为圆角的*/
    /*box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112;*/ /*轨道内置阴影效果*/
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height:40px;
    width:40px;
    margin-top: -10px; /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff; 
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
    box-shadow: 0 .125em .125em rgba(0,0,0,0.2); /*添加底部阴影*/
    background:url("../../common/images/stone/slidebtn3x.png") no-repeat center center;
    background-size:100%;
    border:none;
}


}
.stone-search-btn{
    position:fixed;
    top:20px;
    right:20px;
    z-index:101;
    font-size:18px;
}
.stone-marsk{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:rgba(0,0,0,0.5);
    z-index:102;
}
.search-wrapper{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    z-index:103;
    .search-inner{
        position:absolute;
        width:100%;
        right:0;
        bottom:0;
        top:0;
        padding:0px 14px;
       
        background-color:#fff;
        box-sizing:border-box;
        .search-head{
            margin:0;
            h4{
                font-size:18px;
                font-weight:400;
                 color:#333;
                 line-height:60px;
                 text-align:center;
                 margin:0;
            }
            .close{
                position:absolute;
                top:0;
                right:0;
                padding:15px;
                img{
                    width:25px;
                    height:25px;
                }
            }
        }
        .search-content{
            position:absolute;
            top:65px;
            bottom:50px;
            left:16px;
            right:16px;
            overflow-y:auto;
            overflow-x:hidden;
        }
        .stone-btn-group{
            position:absolute;
            bottom:5px;
            height:40px;
            left:0;
            right:0;
            text-align:center;
            display:inline-block;
            button{
                width:30%;
                height:100%;
                margin:0 5%;
                border:none;
                background-color:#C1996A;
                color:#fff;
                border-radius:20px;
                outline:none;
            }
        }
        h6{
            margin:0;
            padding:0;
            font-size:18px;
            color:#333;
            font-weight:400;
            line-height:2em;
        }
       
        .price-area{
            padding:10px 0;
            display:flex;
            span{
                font-size:20px;
                color:#333;
                line-height:36px;
                padding:0 20px;

            }
            .input-group{
                position:relative;
                 flex:1;
                 box-sizing:border-box;
                  padding:5px 30px 5px  10px;
                  border:1px solid #e5e5e5;
                  border-radius:3px;
                span{
                    position:absolute;
                    top:0;
                    bottom:0;
                    line-height:1em;
                    padding:10px 0;
                    font-size:14px;
                    color:#999;
                    right:10px;
                }
            }
            input{
                
                height:18px;
               border:none;
                width:100%;
                color:#333;
                font-size:14px;
                text-align:center;
                line-height:1em;                
            }
        }
        .stone-attr{
            .attr-box{ 
            li{
                font-size:18px;
                color:#666;
                margin-right:16px;
                float:left;
                margin-bottom:10px;
                position:relative;
                div.value{
                    border:1px solid #666;
                    padding:11px;
                    min-width:40px;
                    border-radius:20px;
                    line-height:1em; 
                    text-align:center;
                    display:block;
                    box-sizing:content-box;
                }
                input[type='radio']{
                    position:absolute;
                    top:0;
                    left:0;
                    right:0;
                    bottom:0;
                    opacity:0;
                    width:100%;
                }
               div.value.active{
                    background-color:#C1996A;
                border-color:#C1996A;
                color:#fff;
                }
            }
            li.active{
                background-color:#C1996A;
                border-color:#C1996A;
                color:#fff;
            }
        }
        }
        
    }
}
    .table-stone{
        margin: 20px;
        height: 100%;
        overflow-y: scroll;
        padding-bottom: 30px;
    }
    .table-stone th{
        background: #999;
        color: #fff;
        height: 30px;
    }
    .table-stone td{
        background: #fff;
        height: 36px;
        color: #666;
    }
    .table-stone tbody tr:nth-child(even) td{
        background: #FAFAFA;
    }
    .check{
        position: relative;
        z-index: 1;
        overflow: hidden;
    }
    .check i{
        position: relative;
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        border-radius: 50%;
        text-align: center;
    }
    .check input[type='radio']{
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 36px;
        text-align: center;
        opacity: 0;
    }
    .check input[type='radio']:checked + i:after{
        content: '';
        position: absolute;
        z-index: 1;
        left: 2px;
        top: 2px;
        width: 16px;
        height: 16px;
        background: #C1996A;
        border-radius: 50%;
        vertical-align: middle;
        box-sizing: border-box;
    }
    .stone-img .table-box{
        @include border-1px(#e5e5e5);
    }
    .stone-img .img-left{
        width:120px;
        height:120px;
        padding: 20px;
    }
    .stone-img .img-left img{
        border: 1px solid #e5e5e5;
        padding: 10px;
    }
    .stone-img .info-right{
        padding-right:30px;
        .right{
            color:#c39d6f;
            font-weight: 500;
        }
        .list-box{
            margin-top: 20px;
            li{
                margin-right: 10px;
            }
        }
    }
    
</style>
