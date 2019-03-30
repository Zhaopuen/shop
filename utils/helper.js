function order_status(value) {
  var status;
  if(value == -1){
    status = "司机拒绝";
  }else if(value == -2){
    status = "商家取消";
  } else if (value == 0) {
    status = "待接单";
  } else if (value == -2) {
    status = "商家取消";
  } else if (value == -2) {
    status = "商家取消";
  }
}


module.exports = {
  order_status: order_status


}
