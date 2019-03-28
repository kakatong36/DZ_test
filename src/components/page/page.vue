<template>
    <div class="page-bar" v-show='grouplist>1'>
		<ul class="pagination">
			
			<li v-for="p in grouplist" :class="{'active': current == p.val}"><a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a></li>

		</ul>
    </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
		total: {			// 数据总条数
			type: Number,
			default: 0
		},
		display: {			// 每页显示条数
			type: Number,
			default:1
		},
		current: {			// 当前页码
			type: Number,
			default: 1
		},
		pagegroup: {		// 分页条数 -- 奇数
			type: Number,
			default: 5,
			coerce:function(v){
				v = v > 0 ? v : 5;
				return v % 2 === 1 ? v : v + 1;
			}
		}
	},
    computed: {
		page:function() { // 总页数
			return Math.ceil(this.total / this.display);
		},
		grouplist:function(){ // 获取分页页码
			var len = this.page , temp = [], list = [], count = Math.floor(this.pagegroup / 2) ,center = this.current;
			if( len <= this.pagegroup ){
				while(len--){ temp.push({text:this.page-len,val:this.page-len});};
				return temp;
			}
			while(len--){ temp.push(this.page - len);};
			var idx = temp.indexOf(center);            	
			(idx < count) && ( center = center + count - idx); 
			(this.current > this.page - count) && ( center = this.page - count);
			temp = temp.splice(center - count -1, this.pagegroup);            	
			do {
				var t = temp.shift();
				list.push({
					text: t,
					val: t
				});
			}while(temp.length);            	
			if( this.page > this.pagegroup ){
				(this.current > count + 1) && list.unshift({ text:'...',val: list[0].val - 1 });
				(this.current < this.page - count) && list.push({ text:'...',val: list[list.length - 1].val + 1 });
			}
			return list;
		}
	},
  methods: {
		setCurrent: function(idx) {
			if( this.current != idx && idx > 0 && idx < this.page + 1) {
				this.$emit('getPage',idx);
			}                
		}
	},

  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
   .page-bar {
	  -webkit-touch-callout: none;
	  -webkit-user-select: none;
	  -khtml-user-select: none;
	  -moz-user-select: none;
	  -ms-user-select: none;
	  user-select: none;
	  margin:0 auto;
	  display:flex;
	  justify-content:center;
	}
	.page-button-disabled {
	  color:#ddd !important;
	  margin:0 auto;
	}
	.pagination{

		display:inline-block;
	}
	.page-bar li {
	  list-style: none;
	  display: inline-block;
	  margin-right:20px;
	}
	.page-bar li:first-child > a {
	  margin-left: 0px;
	}
	.page-bar a {
	  border: 1px solid #ddd;
	  text-decoration: none;
	  position: relative;
	  float: left;
	   height:40px;
	   width:40px;
	  color: #666;
	  text-align:center;
	  line-height:40px;
	  cursor: pointer;
	    border-radius:4px;
	}
	.page-bar a:hover {
	  background-color: #eee;

	}
	.page-bar .active a {
	  color: #fff;
	  cursor: default;
	  background-color: #C19969;
	  border-color: #C19969;
	
	}
	.page-bar i {
	  font-style: normal;
	  color: #d44950;
	  margin: 0px 4px;
	  font-size: 12px;
	}

</style>
