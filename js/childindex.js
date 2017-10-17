var banner = {
	//图片容器
	imgContainer: [
		'LXWM_30.png',
		'SY_03.png',
		'gsjj_03.png',
		'LXWM_30.png'
	],

//点的下标
	list: 1,

	//保存定时器的号
	timer: null,

	//图片展示区的宽度600px
	showWidth: $("#show").width(),

	//设置图片ul的宽度
	setUlWidth: function ($ele, length) {
		//$ele: ul元素, length: 图片的个数
		//this： 指向banner
		$ele.width(this.showWidth * length);
	},

	//创建图片ul的li
	createLiOfImg: function () {
		//获取图片ul的元素
		var $banner = $("#banner");

		//获取图片的个数
		var imgLength = this.imgContainer.length;

		//设置图片ul的宽度
		this.setUlWidth($banner, imgLength);

		//创建图片li
		for (var i = 0; i < imgLength; i++) {
			var $li = $('<li><img src="../images/' + this.imgContainer[i] + '"></li>');
			$banner.append($li);
		}

		//设置图片li的宽度
		$banner.find('li').width(this.showWidth);

		//初始化图片ul的left: -600px
		$banner.css({left: -this.showWidth});


		//创建点的下标
		this.createIndex(imgLength - 1);

		return this;
		
	},

	//创建点的下标
	createIndex: function (length) {
		//获取下标的ul元素
		var $index = $("#index");

		//创建下标li
		for (var i = 0; i < length; i++) {
			var $li = $('<li class="' + (i === 0 ? "on" : "") + '"></li>');
			$index.append($li);
		}
	},

	//下标切换图片
	indexToggleImg: function ($this) {
		//$this: 未来代表当前的点

		//获取点的下标
		var index = $this.index();

		this.list = index + 1;

		//获取图片的ul, 并且移动ul
		$("#banner").animate({left: -this.showWidth * this.list}, 300);
	},

	//左箭头(上一张)
	leftArrow: function () {
		var $banner = $("#banner");
		var bannerLeft = parseInt($banner.css('left')); //比如： -600px

		//验证bannerLeft
		if (!this.validBannerLeft(bannerLeft)) {
			return;
		}

		if (bannerLeft >= 0 ) {
			$banner.css({left: -this.showWidth * (this.imgContainer.length -1)});
			this.list = this.imgContainer.length - 2;
		} else {
			this.list--;
		}

		$banner.animate({left: -this.showWidth * this.list}, 300);

		$("#index>li").eq(this.list - 1).addClass('on').siblings().removeClass('on');

	},

	//右边箭头(下一张)
	rightArrow: function () {
		//获取图片的ul元素
		var $banner = $("#banner");

		//获取图片ul的left值
		var bannerLeft = parseInt($banner.css("left"));

		//验证bannerLeft
		if (!this.validBannerLeft(bannerLeft)) {
			return;
		}

		if (bannerLeft <= -this.showWidth * (this.imgContainer.length -1)) {
			$banner.css({left: 0});
			this.list = 1;
		} else {
			this.list++;
		}

		$banner.animate({left: -this.showWidth * this.list}, 300);

		$("#index>li").eq(this.list - 1).addClass('on').siblings().removeClass('on');
	},

	//验证bannerLeft
	validBannerLeft: function (bannerLeft) {
		if (bannerLeft % this.showWidth === 0) {
			return true;
		}
		return false;
	},

	//自动播放
	autoPlay: function () {
		var self = this;
		self.timer = setInterval(function () {
			self.rightArrow();
		}, 2000);
	},

	//绑定事件
	addEvent: function () {
		var self = this; //当前的this(self) 指向banner
		$("#show").on({"click": function () {

			var thisId = $(this).attr('id');
			
			if (thisId === 'prev') {
				//上一张箭头
				self.leftArrow();

			} else if (thisId === 'next') {
				//下一张箭头
				self.rightArrow();

			} else {
				//下标
				self.indexToggleImg($(this));
				$(this).addClass('on').siblings().removeClass('on');

			}

		}}, "#prev,#next,#index>li").hover(function () {
			clearInterval(self.timer);
			self.timer = null; //释放内存
			$("#prev,#next").stop(true, true).fadeIn(300);

		}, function () {
			self.autoPlay();
			$("#prev,#next").stop(true, true).fadeOut(300);

		})

		return self;
	},

	//初始化页面
	initPage: function () {
		//链式调用
		banner.createLiOfImg().addEvent().autoPlay();
	}

};

banner.initPage();
