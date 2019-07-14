
var timer,// 时钟的id
    timerArray = [],// 时钟索引
    timerIndex = -1;// 存放主时钟的回调函数。

$(function() {
    var $editcountwrap = $('.edit-count-wrap');
    // 数据减
    $editcountwrap.on('click', '.btn-reduce', function() {
        var $this = $(this),
            $num = $this.next('.num'),
            numVal = $this.next('.num').val();// 获取当前值
            numVal --;
            if(numVal <= 1) {
                numVal = 1;
            }
            $num.val(numVal);
    })
    // 数据加
    $editcountwrap.on('click', '.btn-add', function() {
        var $this = $(this),
            $num = $this.prev('.num'),
            numVal = $this.prev('.num').val();// 获取当前值
            numVal ++;
            if(numVal >= 666) {
                numVal = 666;
            }
            $num.val(numVal);
    })
    //初始化轮播图代码
    initBannerSwiper();
    //秒杀时钟倒计时
    getHouersMinutesSecondsByMS();
    // console.log(t);

    // 注册时钟的回调函数。
    timerArray.push(updateMSTimer);
    // 初始化页面主时钟并启动
    timer = setInterval(function() {
      timerIndex += 1;
      timerIndex = timerIndex % 100;//0 到 100循环
       // 执行页面中所有需要注册时钟执行的函数。
       for(var i = 0; i < timerArray.length; i++) {
         timerArray[i]();// 调用数组中的每个回调函数执行。
       }
    }, 200)
});

//初始化轮播图代码
function initBannerSwiper() {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        speed:300,
        loop: true, // 循环模式选项
        autoplay: true,
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });        
}

/*
 * 根据时间差毫秒数，返回具体的小时、分钟、秒的时间差
 * @param {Number} ms 相隔的毫秒数
 * @returns {Array} 返回时间间隔的数组: ['2', '2', '1', '1', '3', '3' ]
 */

 function getHouersMinutesSecondsByMS(ms) {
  //  if(typeof ms != 'number' || ms < 0) {//判断毫秒是否为数字
  //   return null;
  //  }
  ms = + ms;//转换数字类型
  if(ms < 0) {
    return null;
  }
  // 处理小时
  var hours = parseInt(ms / (1000 * 60 *60)) % 24;
  var minutues = parseInt(ms / (1000 * 60 )) % 60;
  var seconds = parseInt(ms / 1000) % 60;

  var hourStr = ('0' + hours);
  hourStr = hourStr.slice(-2);
  var minutueStr = ('0' + minutues);
  minutueStr = minutueStr.slice(-2);
  var secondStr = ('0' + seconds);
  secondStr = secondStr.slice(-2);

  //拼接字符串 var str = "221309"
  var str = hourStr + minutueStr + secondStr;

  //返回时间间隔的数组: ['2', '2', '1', '1', '3', '3' ]
  return str.split('');
 };

 // 更新当前时间与秒杀结束事件差的span标签，数字。
 function updateMSTimer() {
   // 每秒中去更新页面中的时间。
   if(timerIndex % 5 != 0) {
     return;
   }
   // 满一秒钟
   // 计算时间差，并更新到页面的span中去
   var endDate = new Date(loadData.ms.endTime);
   var strArr = getHouersMinutesSecondsByMS(endDate - Date.now());
   // 把时钟变换字符串更新到span标签
   $('#msTimerBox .timer-num').each(function(index, item) {
     $(item).text(strArr[index]);
   });
 }

 
// 页面卸载之前清除时钟。
 window.onunload = function() {
   clearInterval(timer);
 }