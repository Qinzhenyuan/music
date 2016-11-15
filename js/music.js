;
(function() {

	document.addEventListener("DOMContentLoaded", function() {
        //获取内容盒子
      
		var $box = $(".mui-scroll");
		
		//获取上一首
		var $shang = $("#shang");
		
		//获取下一首
		var $xia = $("#xia");
		//获取播放
		var $play = $("#play");
		//获取左边列表
		var $nav = $(".gelist");
		
		//获取标题
		var $tle = $(".mui-title");
		
		//获取歌曲图片
		var $tu = $(".tu");
		//获取进度条
		var eProgress = document.querySelector('progress');
		//获取时间
		var eTime = eProgress.nextElementSibling;
		//获取进度条盒子
		var $jinbox = $(".play-status");
		//获取搜索标签
		var $sou = $(".icon-sousuo");
		//获取头部盒子
		var $toubu = $(".mui-bar-nav");
		
		var $toubu2 = $(".nav2");
		
       //创建一个Audio
		var player = new Audio();
		var index = 0;
		var playlist = [];
		var model = 2; //0:单曲播放,1:单曲循环,2:列表播放,3:列表循环,4:随机播放
          
          
          
        //封装获取榜单歌曲  
		function qajax(a) {

			$.ajax({
				url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
				data: {
					method: 'baidu.ting.billboard.billList',
					type: a,
					size: 20,
					offset: 0
				},
				dataType: 'jsonp',
				success: function(res) {
					//					console.log(res);

					var $ul = $('<ul/>');

					playlist = res.song_list;
					$.each(res.song_list, function(idx, song) {
						var $li = $('<li/>').attr({
							'data-id': song.song_id
						});
						$('<span/>').addClass("iconfont  icon-yinledianzan").appendTo($li);
						$('<p/>').addClass('title').html(song.title).appendTo($li);
						$('<p/>').addClass('singer').html(song.author).appendTo($li);				
						$('<span/>').addClass("iconfont  icon-gengduo").appendTo($li);
						$li.appendTo($ul);
					});

					$box.empty();
					$ul.appendTo($box);
				}
			});

		}

//		qajax(1);
		
		
//		参数：	type = 1-新歌榜,2-热歌榜,11-摇滚榜,
//		12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,
//		23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
		
		// 获取滑块
		
		var $hua=$(".mui-inner-wrap");
		
		
		//点击获取index 获取榜单
		$nav.on("singleTap", "h2", function() {
			var $lei = $(this).attr("data");
			var $ming = $(this).html();
            
            
			$tle.html($ming);

			console.log($ming);
			qajax($lei);
			
			
		
			$hua.addClass("huiqu");
			
			
//			transform: translate3d(290px, 0px, 0px);

		})

		// 播放音乐
		bo();

		function bo() {

			$box.on('singleTap', 'li', function() {
				var $self = $(this);
				var song_id = $(this).attr('data-id'); //$(this).data('id');

				$(this).siblings().removeClass("active");

				$(this).addClass("active");
				// 发送jsonp请求，得到歌曲信息
				$.ajax({
					url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
					data: {
						method: 'baidu.ting.song.playAAC',
						songid: song_id
					},
					dataType: 'jsonp',
					success: function(res) {
						console.log(res.songinfo.pic_small);
						$tu.attr({
							src: res.songinfo.pic_small
						});
						console.log(res.bitrate.file_link)
						player.src = res.bitrate.file_link;
						player.play();

					}
				})
			})
		}
		

		
		var $txt = $("#txt");
		var $fan = $(".icon-fanhui");
		var $boxx = $("#box");
		var $boxsou=$("#box1");
       
       var $sounie=$(".mui-scroll2");
       
		
	
		
		
	
	

		//	例：method=baidu.ting.search.catalogSug&query=海阔天空
		//
		//    参数：query = '' //搜索关键字

		$sou.on("doubleTap", function() {

			var gequ = $txt.val();
			console.log(gequ);

			// 发送jsonp请求，得到歌曲信息
			$.ajax({
				url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
				data: {
					method: 'baidu.ting.search.catalogSug',
					query: gequ
				},
				dataType: 'jsonp',
				success: function(res) {

					console.log(res);
					var $box1 = $("<div/>");
					var $ul = $('<ul/>');
					$.each(res.song, function(idx, song) {
						var $li = $('<li/>').attr({
							'data-id': song.songid
						});
						$('<span/>').addClass("iconfont  icon-xiazai").appendTo($li);
						$('<p/>').addClass('title').html(song.songname).appendTo($li);
						$('<p/>').addClass('singer').html(song.artistname).appendTo($li);

						$li.appendTo($ul);
					});

//					
					$ul.appendTo($box1);

					$box1.appendTo($sounie);

					$sounie.on('singleTap', 'li', function() {
						var $self = $(this);
						var song_id = $(this).attr('data-id'); //$(this).data('id');

						$(this).siblings().removeClass("active");

						$(this).addClass("active");
						// 发送jsonp请求，得到歌曲信息
						$.ajax({
							url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
							data: {
								method: 'baidu.ting.song.playAAC',
								songid: song_id
							},
							dataType: 'jsonp',
							success: function(res) {
								console.log(res.songinfo.pic_small);
								$tu.attr({
									src: res.songinfo.pic_small
								});
								
								
								
								console.log(res.bitrate.file_link)
														
								player.play();

							}
						})
					})

				}
			})
		})
		
		
     	$boxsou.hide();
     	//点击搜索
		$toubu.on("singleTap", "span", function() {

			
			
			$boxsou.show();
			 $boxx.hide();

		})

	//点击返回
	
	
		$toubu2.on("singleTap","a", function() {

					
	$boxsou.hide();
    $boxx.show();
		

			console.log(555555);

		})



     
// 播放进度改变时触发
		// 播放过程一直触发
		player.ontimeupdate = function() {
			updateTime();
		}

		function updateTime() {
			// 时间
			// 剩余总时间
			var leftTime = player.duration - player.currentTime;

			// 剩余多少分
			var minLeft = parseInt(leftTime / 60);
			var secLeft = parseInt(leftTime % 60);

			eTime.innerHTML = '-' + minLeft + ':' + (secLeft < 10 ? '0' : '') + secLeft;

			// 进度条
			eProgress.value = player.currentTime / player.duration * 100;
		}


		//单击播放按钮
		$play.singleTap(function() {

			//如果当前处于暂停状态，就播放
			if(player.paused) {
				player.play();

			} else {
				player.pause();

			}
		})

		$shang.singleTap(function() {

			index++;
			play();

		})

		$xia.singleTap(function() {

			index--;
			play();

		})
          
        
		//音乐播放时，图标变为暂停

		player.onplay = function() {

			$play.addClass('icon-yinlezanting');

			var li = document.querySelectorAll("li");

			$tu.addClass('play');
//			eAlbum.style.animationPlayState = 'running';
//          $tu.attr(animation-play-state,"running")

			console.log(li.length);

		

		}

		//音乐暂停时，图标变为播放
		player.onpause = function() {
			$play.removeClass('icon-yinlezanting');

//			eAlbum.style.animationPlayState = 'paused';
			$tu.removeClass("play");
//			$tu.attr(animation-play-state,"paused")
			
//			style="animation-play-state: paused;"
		}

		$box.singleTap(function(e) {
			console.log(e.target);

		})

		// 6）点击进度条改变播放进度

		$("progress").tap(function() {

			console.log(11111111);
			player.currentTime = (e.offsetX / this.offsetWidth) * player.duration;
		})

	})

})();