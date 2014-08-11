var WF = WF || {};
WF.exp = {
	title: 'FE1.1 SiteWide Header',
	variation: 'D',

	appendCss: function(){
		$('body').append('<style>.wf_breadcrumbs{margin:0 auto;text-align:left;width:940px;}body .tbl-main,body .tbl-company-wide{margin-top:40px;}body #menu{margin:17px auto 0px 400px;}.wf_breadcrumbs span,.wf_breadcrumbs a{text-transform:capitalize;}</style>');		
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
			level1 = '',
      menu_str = '';

		if($el.parent().hasClass('sub_text')){
			var $elem = $el.parents('ul:eq(0)');
			if($elem.length){
				$elem = $elem.prev();
				if($elem.length){
					level1 = '<span>&nbsp;&raquo;&nbsp;</span><a href="'+$elem.attr('href')+'">'+$elem.html()+'</a>';
				}
			}
		}
	    var $e_drop = $el.closest('li').find('a.drop');
	    if($e_drop.length){
			  menu_str = '<span>&nbsp;&raquo;&nbsp;</span><span>'+$e_drop.html()+'</span>';
	    }  
    
		//$('#menu div[class*="dropdown_"]')
		//console.log('menu_string='+menu_str);
		var str = '<div class="wf_breadcrumbs"><a href="http://www.telestream.net/">Home</a>'+menu_str+level1+'<span>&nbsp;&raquo;&nbsp;</span><span>'+$el.html()+'</span></div>';
		//$('#menu > li a:contains("'+menu_str+'")').css('color','#009bdf');
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
				var str = '<div class="wf_breadcrumbs"><a href="http://www.telestream.net/">Home</a><span>&nbsp;&raquo;&nbsp;</span><span>'+$('#menu li:hover .drop').html()+ '</span>'+level1+'<span>&nbsp;&raquo;&nbsp;</span><span cid="'+href+'" id="wf_bread_nav">'+$el.html()+'</span></div>';
				
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

				var str = '<div class="wf_breadcrumbs"><a href="http://www.telestream.net/">Home</a><span>&nbsp;&raquo;&nbsp;</span><span>'+$el.parent().prev().html()+'</span><span>&nbsp;&raquo;&nbsp;</span><span cid="'+href+'" id="wf_bread_nav">'+$el.html()+'</span></div>';
					
				WF.exp.setCookie('wf_breadcrumb',encodeURIComponent(str),50);	
				setTimeout(function(){
					window.location.href = href;
				}, 500);	
			});

			$('.footer-column-products a').bind('click', function(){
				event.preventDefault();
				var $el = $(this),
					href =  $el.attr('href');

				var str = '<div class="wf_breadcrumbs"><a href="http://www.telestream.net/">Home</a><span>&nbsp;&raquo;&nbsp;</span><span>'+$el.parent().parent().find('h3').html()+'</span><span>&nbsp;&raquo;&nbsp;</span><span cid="'+href+'" id="wf_bread_nav">'+$el.html()+'</span></div>';
					
				WF.exp.setCookie('wf_breadcrumb',encodeURIComponent(str),50);	
				setTimeout(function(){
					window.location.href = href;
				}, 500);	
			});
	},

	selectMainNav: function(){
		var mainNav = {
		'solutions'	: ['http://www.telestream.net/telestream-solutions/encoding-transcoding-solutions-comparison.htm','http://www.telestream.net/vantage/lightspeed-server.htm','http://www.telestream.net/vantage/overview_workflow.htm','http://www.telestream.net/post-producer/overview.htm','http://www.telestream.net/trafficmanager/overview.htm','http://www.telestream.net/pipeline/overview.htm','http://www.telestream.net/wirecast/overview.htm','http://www.telestream.net/screenflow/overview.htm','http://www.telestream.net/episode/overview.htm','http://www.telestream.net/flip4mac/overview.htm','http://www.telestream.net/switch/overview.htm','http://www.telestream.net/telestream-solutions/sports.htm'],
		'Misc': ['http://www.telestream.net/downloads/downloads.asp','http://www.telestream.net/purchase/store.htm','http://www.telestream.net/telestream-support/overview.htm','http://forum.telestream.net/forum/','http://www.telestream.net/downloads/login.asp','http://www.telestream.net/company/contact-telestream.htm','http://www.telestream.net/downloads/login.asp?prodid=&message=login','http://www.telestream.net/company/privacy.htm','http://www.telestream.net/company/literature-downloads.htm'], 
		};

		var href = window.location.href;
		
		if(href.indexOf('/downloads/') > -1 || href.indexOf('http://forum.telestream.net/forum/') > -1 || href.indexOf('/telestream-support/') > -1){
			$('#menu > li:eq(2) a').css('color','#009bdf');
			var $support = $('.wf_breadcrumbs span:contains("Support")');
			if(!$support.length){
				$('.wf_breadcrumbs > *:eq(1)').before('<span>&nbsp;&raquo;&nbsp;</span><span>Support</span>');
			}
		} else if(href.indexOf('/company/') > -1 || href.indexOf('/purchase/') > -1){
			var $contact = $('.wf_breadcrumbs span:contains("Contact"),.wf_breadcrumbs span:contains("Company")');
			if(!$contact.length){
				$('.wf_breadcrumbs > *:eq(1)').before('<span>&nbsp;&raquo;&nbsp;</span><span>Contact</span>');
				$('#menu > li:eq(4) a').css('color','#009bdf');
			}
			var $company = $('.wf_breadcrumbs span:contains("Company")');
			if($company.length){
				$company.html('Contact');
				$('#menu > li:eq(4) a').css('color','#009bdf');
			}	
		} else if(href.indexOf('/telestream-solutions/') > -1 || href.indexOf('/vantage/') > -1 || href.indexOf('/vantage-cloud/') > -1 || href.indexOf('/post-producer/') > -1 || href.indexOf('/trafficmanager/') > -1 || href.indexOf('/pipeline/') > -1 || href.indexOf('/wirecast/') > -1 || href.indexOf('/screenflow/') > -1 || href.indexOf('/flip4mac/') > -1 || href.indexOf('/switch/') > -1){
			$('#menu > li:eq(0) a').css('color','#009bdf');
			var $prods = $('.wf_breadcrumbs span:contains("Products")');
			if(!$prods.length){
				$('.wf_breadcrumbs > *:eq(1)').before('<span>&nbsp;&raquo;&nbsp;</span><span>Products</span>');
			}
		}
		
	},
	
	dynamicBreadCrumb: function(){
		var pname = window.location.pathname,
			pkg_menu = '';
		if(pname !== "undefined" && pname != "/"){
			var url_str = pname.split('/'),
				ml = url_str.length;
			for(var i = 0; i < ml; i++){
				var m_str = url_str[i];
				
				if(m_str.indexOf('.htm') > -1){
					m_str = m_str.split('.htm')[0];	
				} else {
					m_str = m_str.split('.asp')[0];	
				}
				m_str = m_str.replace('-',' ');
				m_str = m_str.replace('_',' ');
				//+pkg_menu
				if(m_str != "" && m_str !== "undefined"){
					if(m_str == 'compare'){
						m_str = 'Pricing'; 
					}
					pkg_menu += '<span>&nbsp;&raquo;&nbsp;</span><span>'+m_str+'</span>';	
				}
			}
		}
		return '<div class="wf_breadcrumbs"><span>Home</span>'+pkg_menu+'</div>';	
	},

	addBreadCrumbs: function(){
		var $elem = $('#menu > li > div');
		if($elem.length){
			this.setDynamicID_bindClick();
			var breadcrumb = decodeURIComponent(WF.exp.getCookie('wf_breadcrumb'));
			//console.log('breadcrumb='+breadcrumb);
			if(breadcrumb && breadcrumb != ""){
				var pname = window.location.pathname;
				if(pname !== "undefined" && pname != "/"){
					var url_str = pname.split('/'),
					cid = $(breadcrumb).find('#wf_bread_nav').attr('cid'),
					menu_cid = cid.split('/')[1],
					ml = url_str.length,
					pkg_menu = '';
					for(var i = 0; i < ml; i++){
						var m_str = url_str[i];
						//console.log('i_='+m_str);
						if(m_str.indexOf('.htm') > -1){
							m_str = m_str.split('.htm')[0];	
						} else {
							m_str = m_str.split('.asp')[0];	
						}
						m_str = m_str.replace('-',' ');
						m_str = m_str.replace('_',' ');
						//+pkg_menu
						if(m_str != "" && m_str !== "undefined"){
							if(m_str == 'compare'){
								m_str = 'Pricing';
							}
							pkg_menu += '<span>&nbsp;&raquo;&nbsp;</span><span>'+m_str+'</span>';	
						}
					}	
					//console.log(menu_cid+'/'+url_str[1]);	
					//u2 = url_str[1].replace('-',' ');
					var scid = cid.split('/'),
						smu = true;
					if(url_str[2] && url_str[2] != "" && scid[2] && scid != ""){
						smu = ((url_str[2] != scid[2])? true: false);
					} 
					//console.log('smu='+smu);
					//console.log(url_str[1] +'/'+ menu_cid +'=='+ url_str[1] +'[ORR]'+ smu);
					if(url_str[1] != "" && (menu_cid != url_str[1] || smu)){
						//<span>&nbsp;&raquo;&nbsp;</span><span>'+u2+'</span>
						breadcrumb = '<div class="wf_breadcrumbs"><a href="http://www.telestream.net/">Home</a>'+pkg_menu+'</div>';	
					}
				} else {
					breadcrumb = WF.exp.dynamicBreadCrumb();
				}
			} else {
				breadcrumb = WF.exp.dynamicBreadCrumb();
				//'<div class="wf_breadcrumbs"><span>Home</span>'+WF.exp.dynamicBreadCrumb()+'</div>';	
			}
			/*else if(!breadcrumb || breadcrumb == ""){
				var pathName = window.location.pathname,
				$trg_elem = $elem.find('a[href="'+pathName+'"]');
				if($trg_elem.length){
					breadcrumb = WF.exp.getBreadCrumb($trg_elem);
					console.log('dynamic_breadcrumb'+breadcrumb);
				} else {
					//var pkg_menu = WF.exp.dynamicBreadCrumb();//'pkg_menu');
					breadcrumb = WF.exp.dynamicBreadCrumb();
					//breadcrumb = '<div class="wf_breadcrumbs"><span>Home</span>'+WF.exp.dynamicBreadCrumb()+'</div>';	
				//}
			} */

			if(!$('.wf_breadcrumbs').length){
				$('.tbl-masthead').after(breadcrumb);	
				//var menu_str = $('.wf_breadcrumbs').find('span:eq(1)').html();
				WF.exp.selectMainNav();
			}
		} else {
			setTimeout(function(){
				WF.exp.addBreadCrumbs();
			}, 500);
		}
	},
	
	capitaliseFirstLetter: function(str){
    	return str.charAt(0).toUpperCase() + str.slice(1);
	},

	hyperLinkMenu: function(){
		var href = window.location.href;
		var prods = {
			0: ['vantage/overview_workflow','http://www.telestream.net/vantage/overview_workflow.htm'],
			1: ['vantage/overview_transcode','http://www.telestream.net/vantage/overview_transcode.htm'],
			2: ['trafficmanager','http://www.telestream.net/trafficmanager/overview.htm'],
			3: ['post-producer','http://www.telestream.net/post-producer/overview.htm'],
			4: ['vantage-cloud','http://www.telestream.net/vantage-cloud/overview.htm'],
			5: ['wirecast','http://www.telestream.net/wirecast/overview.htm'],
			6: ['screenflow','http://www.telestream.net/screenflow/overview.htm'],
			7: ['switch','http://www.telestream.net/switch/overview.htm'],
			8: ['episode','http://www.telestream.net/episode/overview.htm'],
			9: ['flip4mac','http://www.telestream.net/flip4mac/overview.htm']
		};

		var $bread_crumb = $('.wf_breadcrumbs');
		for(var i = 0; i < 10; i++){
			if(href.indexOf(prods[i][0]) > -1){
				var breadcrumb = prods[i][0].split('/')[0];
				breadcrumb = breadcrumb.replace('-',' ');
				//breadcrumb = WF.exp.capitaliseFirstLetter(breadcrumb);
				var $elem = $bread_crumb.find('span:contains("'+breadcrumb+'")');
				if($elem.length){
					$elem
						.before('<a href="'+prods[i][1]+'">'+$elem.html()+'</a>')
						.css('display','none');
				}
			}
		}

		if(href.indexOf('vantage/overview_workflow') > -1 || href.indexOf('vantage/overview_transcode') > -1){
			var $trg_elem = $bread_crumb.find('span:contains("Vantage")');
			if(!$trg_elem.length){
				$trg_elem = $bread_crumb.find('a:contains("Vantage")');
			}
			if($trg_elem.length){
				$trg_elem.html((href.indexOf('vantage/overview_workflow') > -1) ? 'Vantage Workflow' : 'Vantage Transcode');		
				$bread_crumb.find('span:contains("Overview Workflow"),span:contains("Overview Transcode")').html('Overview');	
			}
		}
	},

	init: function(){
		this.appendCss();
		//this.setHashValue($('#menu > li:eq(1)'),'#buy');
		//this.setHashValue($('#menu > li:eq(4)'),'#contact');
	    $('#menu > li:eq(3)').css('display','none');
	    $('#menu > li:eq(5)').css('display','none');
		this.addBreadCrumbs();
		this.hyperLinkMenu();
		var pathname = window.location.pathname; 
		var $productnav = $('#productnav');
		if($productnav.length){
			$productnav.find('a[href="'+pathname.split('/')[2]+'"]').css('color','#000');	
		}
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
    if(myip == '96.49.130.8' || myip == '216.37.72.238' || myip == '117.207.66.220'){
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