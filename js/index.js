//难度系数
	var difficulty = 3;
//难度按钮
	 $(function () {
	 	$('.degree ul li').click(function () {
 			$(this).removeClass('nav-unchecked').addClass('nav-checked').siblings().removeClass('nav-checked').addClass('nav-unchecked');
 			difficulty = $(this).attr('data-degree');
 			console.log(difficulty);
	 	})
	})
	 
//隐藏所有square	 
	$('#container').hide();
//开场动画
	$('.start-button').click(function creation () {
		$(this).hide();
		$('.prepare').hide();


//创建方块
	for (i=0;i<difficulty*difficulty;i++) {
		$('#container').append("<div id='square"+i+"' class = ' square square-level"+difficulty+"'><div class='range unchecked'><div class='front wrong'><div class='empty-level"+difficulty+"'></div></div><div class='back normal'><div class='empty-level"+difficulty+"'></div></div></div></div>");
	}

//翻转事件
	$(document).ready(function () {
		$('.range').flip();
	})
//创建随机数
	function getNumb (num,val) {
		var num = new Array();
		for (i=0;i<$(".range").length+1;i++) {
			num[i]=i;
		}
		num.sort(
			function () {
				return 0.5-Math.random();
			}
		);
		return num;
	}
	var num = getNumb();
	
//添加背面颜色
	for (i=0;i<difficulty*2-1;i++) {
		var name = "square"+num[i];
		$('#'+name).find('.range').find('.back').removeClass('normal').addClass('special');
		$('#'+name).find('.range').find('.front').removeClass('wrong').addClass('right');
	}
		
//主页消失		
		$('#container').fadeIn(800);
		setTimeout(function () {
			$('.special').trigger('click');			
		},1000);
		setTimeout(function () {
			$('.special').trigger('click');
		},2000);
		
//点击添加状态
	$(function () {
		$('.range').click(
			function  () {
				var shit = $(this).attr('class').split(" ");
				if (shit[1] == 'unchecked') {
					$(this).removeClass('unchecked').addClass('checked');
				} else{
					$(this).removeClass('checked').addClass('unchecked');
				}
			}
		);
	})
		
//失败事件以及判定
	$(document).ready(function () {
		$('.wrong').click(function () {
			setTimeout(function () {
				$('.right').parent('.unchecked').trigger('click');				
			},1000);
			setTimeout(function () {
				$('#container').fadeOut();
				$('.lose').fadeIn();
				$('.retry-btn').fadeIn();
			},2500);
			
		})
	})
//成功事件以及判定
	$(document).ready(function () {
		$('.right').click(function () {
//			console.log(difficulty*2-3);
//			console.log($('.right').parent('.checked').length);
			if ($('.right').parent('.checked').length > difficulty*2-3 ) {
				setTimeout(function () {
					$('#container').fadeOut();
					$('.win').fadeIn();
					$('.retry-btn').fadeIn();
				},1000);
				
			}
		})
	})		
	
	
});
	

//结束按钮事件
	$('.again-btn').click(function () {
		$('#container').children().remove();
		$('.start-button').trigger('click');
		$('.retry-btn').hide();
		$('.lose').hide();
		$('.win').hide();
	})
	$('.index-btn').click(function () {
		window.location.href="index.html";
	})
		
