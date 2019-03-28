<template>
    <div class="client-form-box">
		<div class="client-form-title">
			特殊定制
		</div>
        <form class="client-form" onsubmit="return false">

            <div class="client-detail">
              <div>
                <input  maxlength="6" v-model="fontMessage" type="checkbox" value="刻字定制" style="margin-left:-0.3rem;" class="client-radio"/>
                <label for="" style="width:50%;" @click="fontMessage = !fontMessage">
                    <span>刻字定制</span>
                </label>
              </div>  
                <input  maxlength="6" type="value" placeholder="输入刻字信息" v-model="writeMessage" 
                    style="width:11.25rem;height:4.38rem;margin-top:0.1rem;" 
                    :disabled="!fontMessage">
            </div>

        </form>
		
    </div>
</template>

<script>
import upload from "components/upload/upload";

export default {
  name: "myBrideList",

  props: {
    message: Array
  },
  data() {
    return {
      clientName: "",
      fontMessage: false,
      writeMessage: "",
      selectItem: "新宋体",
      selectDate: "",
      additional: {
        ImgUrl: ""
      },
      /*订单基本数据*/
      showAddress: false,
      previewShowFlag: false,
      order: {}
    };
  },
  created() {
    this.selectDate = this.getDate(12);
  },
  methods: {
    getDate(addDay) {
      var dd = new Date();
      if (addDay) {
        dd.setDate(dd.getDate() + addDay);
      }
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      let dateList = y + "-" + m + "-" + d;
      return dateList;
    },
    previewShow() {
      if (this.fontMessage) {
        this.previewShowFlag = !this.previewShowFlag;
      } else {
        this.previewShowFlag = false;
      }
    },
    set_Img(src) {
      this.additional.ImgUrl = src.url;
    },

    create_order() {
      if (!this.form_check()) {
        return;
      }

      // 配置上传数据
      this.order.ProvinceId = "";
      this.order.ProvinceName = "";
      this.order.CityId = "";
      this.order.CityName = "";
      this.order.AreaId = "";
      this.order.AreaName = "";
      this.order.DeliverGoodsId = "";
      this.order.DeliverGoodsName = "";
      this.order.Consignee = "";
      this.order.ConsigneeTel = "";
      this.order.ConsigneePhone = "";
      this.order.Address = "";
      this.order.DeliveryDate = this.selectDate;
      this.order.DetailsList = this.message;
      this.order.DetailsList[0].Lettering = this.writeMessage;
      this.order.DetailsList[0].Name = this.clientName;
      this.order.DetailsList[0].ImgUrl = this.additional.ImgUrl.slice(
        this.additional.ImgUrl.lastIndexOf("_") + 1
      );
      this.order.DetailsList[0].Typeface = this.selectItem;
      this.loading();
      var that = this;
      var options = {
        url: "/order_Api_CustomizeOrder_CreateMyBrideOrder",
        params: this.order
      };

      var cbok = res => {
        this.$router.push({
          name: "myBrideFinish"
        });
        this.closeLoad();
      };

      var cbno = res => {
        this.bombox.tomast({
          msg: res.data.message,
          type: "warning"
        });
        this.closeLoad();
      };

      this.http.post(options, cbok, cbno);
    },
    /*表单验证*/
    form_check() {
      var that = this;
      var requier = document.querySelectorAll(".inpVal");
      var flag = true;
      requier.forEach(function(item) {
        if (item.value == "") {
          if (that.fontMessage == true) {
            that.bombox.tomast({
              msg: item.getAttribute("data-tips"),
              type: "warning",
              time: 1500
            });
            flag = false;
            return;
          }
        }

        if (that.fontMessage == true) {
          if (that.writeMessage == "") {
            that.bombox.tomast({
              msg: "请输入刻字信息",
              type: "warning",
              time: 1500
            });
            flag = false;
            return;
          }
        }
      });
      return flag;
    },
    jump() {
      this.create_order();
    }
  },

  components: {
    "v-upload": upload
  }
};
</script>

<style lang="scss">
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  html,
  body {
    font-size: 8px !important;
  }
}
@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape) {
  html,
  body {
    font-size: 11px;
  }
}

@keyframes formEnter {
  0% {
    top: 100rem;
  }
  100% {
    top: 53.13rem;
  }
}

@-webkit-keyframes formEnter {
  0% {
    top: 100rem;
  }
  100% {
    top: 53.13rem;
  }
}
html,
body {
  font-size: 12px;
}
.client-form-box {
  position: absolute;
  top: 63.25rem;
  left: 0;
  right: 0;
  width: 109rem;
  overflow: hidden;
  margin: auto;
  box-shadow: 0 0 20px rgba(255, 123, 123, 0.2);
  border: solid 1px #e5e5e5;
  border-radius: 10px;
  .client-form-title {
    width: 100%;
    text-align: center;
    color: #333;
    font-size: 2.25rem;
    margin-top: 2.06rem;
    margin-bottom: 1.63rem;
  }
}
.client-message-title {
  color: #e2aa6f;
  display: flex;
  justify-content: center;
  align-items: center;
  .client-left {
    width: 12.5rem;
    height: 2px;
    background-image: -webkit-linear-gradient(
      left,
      rgba(226, 170, 111, 0) 0%,
      rgba(226, 170, 111, 1) 100%
    );
  }
  .client-title {
    font-size: 2.25rem;
    margin: 0 1.88rem;
  }
  .client-right {
    width: 12.5rem;
    height: 2px;
    background-image: -webkit-linear-gradient(
      right,
      rgba(226, 170, 111, 0) 0%,
      rgba(226, 170, 111, 1) 100%
    );
  }
}
.client-form {
  display: flex;
  justify-content: center;
  padding-left: 28rem;
  background-color: #fff;
  .client-detail {
    width: 49%;
    margin-bottom: 1.88rem;
    display: inline-block;
    label {
      display: inline-block;
      width: 100%;
      color: #333;
      font-size: 1.88rem;
      margin-bottom: 0.63rem;
    }
    input[type="text"],
    input[type="button"],
    input[type="value"],
    input[type="date"],
    input[type="number"],
    select,
    .preview-btn {
      float: left;
      margin-right: 1.88rem;
      background-color: rgba(255, 255, 255, 0.1);
      color: #333;
    //   font-size: 1.5rem;
      border: solid 1px #e5e5e5;
      width: 12.65rem;
      height: 3rem;
      padding-left: 0.63rem;
      border-radius: 4px;
      option {
        color: #000;
        width: 6.25rem;
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 0.25rem;
      }
    }
    .uploadImg {
      width: 8rem;
      height: 8rem;
    }
  }
  .client-address select {
    width: 10rem;
  }
  .client-send {
    display: flex;
    label {
      width: 20%;
    }
  }
  .client-division {
    width: 100%;
    font-size: 1.25rem;
    color: #fff;
    margin-top: 3.13rem;
    margin-bottom: 0.63rem;
  }
}

.custom-input {
  width: 6.25rem !important;
  color: #fff !important;
}
input[type="checkbox"] {
  -webkit-appearance: radio;
  z-index: 10;
  opacity: 0;
}
input[type="checkbox"] + label {
  position: relative;
  margin-left: 1.2rem;
}
input[type="checkbox"] + label::before {
  content: "\a0"; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  top: 0.2rem;
  left: -3rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #999;
  text-indent: 0.15em;
  line-height: 1;
}
input[type="checkbox"]:checked + label::before {
  border: 1px solid #ff7b7b;
  background-color: #ff7b7b;
  background-clip: content-box;
  width: 1.1rem;
  height: 1.1rem;
  padding: 0.2em;
}
.radioLabel {
  width: auto !important;
  margin-right: 2.38rem;
}
.preview-btn {
  position: relative;
  text-align: center;
  line-height: 3rem;
  padding: 0 !important;
}
.preview-view {
  width: 12.5rem;
  height: 12.5rem;
  position: absolute;
  top: -13rem;
  left: -3rem;
  .preview-box {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      position: absolute;
      top: 7.5rem;
      left: 0rem;
      width: 100%;
      text-align: center;
      font-size: 1rem;
      z-index: 10;
      color: #000;
    }
  }
}
</style>
