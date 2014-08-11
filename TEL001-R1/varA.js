var WF = WF || {};
WF.exp = {
	title: 'FE1.1 SiteWide Header',
	variation: 'D',

	appendCss: function(){
		$('body').append('<style>.wf_breadcrumbs{margin:0 auto;text-align:left;width:940px;}body .tbl-main,body .tbl-company-wide{margin-top:40px;}body #menu{margin:17px auto 0px 400px;}</style>');		
	},

	setCookie: function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toGMTString();
	    document.cookie = cname + "=" + cvalue + "; " + expires+";path=/;domain=telestream.net;";
	},

	getCookie: function(cname){
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	},

	setHashValue: function($elem, hashstr){
		$elem.find('a').each(function(){
			var href = $(this).attr('href');
			//console.log(href.indexOf('mailto')); 
			if(href.indexOf('mailto') == -1 && href.indexOf(hashstr) == -1){
				$(this).attr('href', href + hashstr);
			}
		});
	},

	getBreadCrumb: function($el){

		var href = $el.attr('href'),
			level1 = '';

		if($el.parent().hasClass('sub_text')){
			var $elem = $el.parents('ul:eq(0)');
			if($elem.length){
				$elem = $elem.prev();
				if($elem.length){
					level1 = '<span>&nbsp;&raquo;&nbsp;</span><a href="'+$elem.attr('href')+'">'+$elem.html()+'</a>';
				}
			}
		}
		var menu_str = $el.closest('li').find('a.drop').html();
		var str = '<div class="wf_breadcrumbs"><a href="/">Home</a><span>&nbsp;&raquo;&nbsp;</span><span>'+menu_str+ '</span>'+level1+'<span>&nbsp;&raquo;&nbsp;</span><span>'+$el.html()+'</span></div>';
		$('#menu > li a:contains("'+menu_str+'")').css('color','#009bdf');
		return str;
	},

	setDynamicID_bindClick: function(){
		$('#menu').find('a')
			.bind('click', function(){
				event.preventDefault();
				var $el = $(this),
					href = $el.attr('href'),
					level1 = '';
				var str = WF.exp.getBreadCrumb($el);	
				if($el.parent().hasClass('sub_text')){
					var $elem = $el.parents('ul:eq(0)');
					if($elem.length){
						$elem = $elem.prev();
						if($elem.length){
							level1 = '<span>&nbsp;&raquo;&nbsp;</span><a href="'+$elem.attr('href')+'">'+$elem.html()+'</a>';
						}
					}
				}
				var str = '<div class="wf_breadcrumbs"><a href="/">Home</a><span>&nbsp;&raquo;&nbsp;</span><span>'+$('#menu li:hover .drop').html()+ '</span>'+level1+'<span>&nbsp;&raquo;&nbsp;</span><span cid="'+href+'" id="wf_bread_nav">'+$el.html()+'</span></div>';
				
				WF.exp.setCookie('wf_breadcrumb',encodeURIComponent(str),50);
				//WF.exp.setCookie('wf_breadcrumb',$el.attr('id'),50);
				setTimeout(function(){
					window.location.href = href;
				}, 500);
				//}	
			})
			.each(function(index){
        		$(this).attr('id','wf_menu_'+parseInt(index+1));
			});

			$('.footer-column-solutions a,.footer-column-products a,.footer-column-company a,.footer-column-misc a').bind('click', function(){
				event.preventDefault();
				var $el = $(this),
					href =  $el.attr('href');

				var str = '<div class="wf_breadcrumbs"><a href="/">Home</a><span>&nbsp;&raquo;&nbsp;</span><span>'+$el.parent().prev().html()+'</span><span>&nbsp;&raquo;&nbsp;</span><span cid="'+href+'" id="wf_bread_nav">'+$el.html()+'</span></div>';
					
				WF.exp.setCookie('wf_breadcrumb',encodeURIComponent(str),50);	
				setTimeout(function(){
					window.location.href = href;
				}, 500);	
			});
	},

	addBreadCrumbs: function(){
		var $elem = $('#menu > li > div');
		if($elem.length){
			this.setDynamicID_bindClick();
			var breadcrumb = decodeURIComponent(WF.exp.getCookie('wf_breadcrumb'));
			if(breadcrumb){
				var url_str = window.location.pathname.split('/'),
					cid = $(breadcrumb).find('#wf_bread_nav').attr('cid'),
					u1 = '',
					u2 = '';
				var menu_cid = cid.split('/')[1];
				console.log(menu_cid);	
				if(url_str[2].indexOf('.htm') > -1){
					u1 = url_str[2].split('.htm')[0];	
				} else {
					u1 = url_str[2].split('.asp')[0];	
				}
				u1 = u1.replace('-',' ');
				u2 = url_str[1].replace('-',' ');
				if(url_str[1] != "" && menu_cid != url_str[1]){
					breadcrumb = '<div class="wf_breadcrumbs"><span>Home</span><span>&nbsp;&raquo;&nbsp;</span><span>'+u2+'</span><span>&nbsp;&raquo;&nbsp;</span><span>'+u1+'</span></div>';	
				}
			} else if(!breadcrumb || breadcrumb == ""){
				var pathName = window.location.pathname,
				$trg_elem = $elem.find('a[href="'+pathName+'"]');
				if($trg_elem.length){
					breadcrumb = WF.exp.getBreadCrumb($trg_elem);
				} else {
					breadcrumb = '<div class="wf_breadcrumbs"><span>Home</span></div>';	
				}
			} else {
				breadcrumb = '<div class="wf_breadcrumbs"><span>Home</span></div>';	
			}

			if(!$('.wf_breadcrumbs').length){
				$('.tbl-masthead').after(breadcrumb);	
				var menu_str = $('.wf_breadcrumbs').find('span:eq(1)').html();
				$('#menu > li a:contains("'+menu_str+'")').css('color','#009bdf');
			}


		} else {
			setTimeout(function(){
				WF.exp.addBreadCrumbs();
			}, 500);
		}
	},

	init: function(){
		this.appendCss();
		//this.setHashValue($('#menu > li:eq(1)'),'#buy');
		//this.setHashValue($('#menu > li:eq(4)'),'#contact');
	    $('#menu > li:eq(3)').css('display','none');
	    $('#menu > li:eq(5)').css('display','none');
		this.addBreadCrumbs();
	}
};

var s = document.createElement("script");
s.setAttribute("type", "text/javascript");
s.setAttribute("src", "http://l2.io/ip.js?var=myip");
if (typeof s !== "undefined"){
  document.getElementsByTagName("head")[0].appendChild(s);
}
setTimeout(function(){
  get_myip();
},500);

function get_myip(){
  if(typeof myip !== "undefined"){
    if(myip == '96.49.130.8' || myip == '216.37.72.238' || myip == '117.216.51.156'){
      WF.exp.init();
    }
  } else {
    setTimeout(function(){
      get_myip();
    },500);
  }
}

//WF.exp.init();
$('#menu').css('visibility','visible');
// Begin Crazy Egg //
var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0012/0654.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b);
// End Crazy Egg //