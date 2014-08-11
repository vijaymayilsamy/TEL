var WF = WF || {};
WF.exp = {
	title: 'FE1.1 SiteWide Header',
	variation: 'B',

	appendCss: function(){
		$('body').append('<style>#menu li .dropdown_2columns_b .footer-column-products{border:none;padding-left:20px;}#menu li .dropdown_2columns_b .footer-column-products div{margin:5px 0;}#menu #wf_products:hover .dropdown_2columns_b,#menu #wf_solutions:hover .dropdown_2columns_b{left:8px;}</style>');	
		
	},

	cleanMenu: function(){
		var $trg_elem = $('#menu > li:eq(0)'),
			$elem = $('.footer-column-products').clone();

		$elem.find('br').remove();	
		$trg_elem.find('.dropdown_4columns').remove();
		$trg_elem.append('<div class="dropdown_2columns_b"></div>');
		$trg_elem.attr('id','wf_products');
		$trg_elem.find('.dropdown_2columns_b').append($elem);

		$('#menu > li:eq(3)').css('display','none');

		$trg_elem
			.before('<li id="wf_solutions"><a href="#" class="drop">Solutions</a><div class="dropdown_2columns_b"></div></li>'); 

		$elem = $('.footer-column-solutions').clone();	
		$elem.find('br').remove();
		$('#wf_solutions').find('.dropdown_2columns_b').append($elem);
	},

	init: function(){
		this.appendCss();
		this.cleanMenu();
	}
};

WF.exp.init();

// Begin Crazy Egg //
var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0012/0654.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b);
// End Crazy Egg //