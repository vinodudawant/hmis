<%@page import="java.util.HashSet"%>
<%@page import="org.json.JSONObject"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.hms.dto.ModuleMasterDto"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.dto.NewUserAccessDto"%>
<%@page import="java.util.List"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.util.ResourceBundle"%>
<script>
	<c:if test="${sessionScope.userType == null}">
		var origin   = window.location.origin; 

			origin += "/MAHAHMIS/index.jsp";
			window.location.replace(origin);
	</c:if>	

	document.body.addEventListener('click', fn, true); 

	function fn(){

		jQuery.ajax({
			
			async	: false,
			type	: "GET",
			url		: "ehat/checkSessionAndRedirect/checkSession",
			success : function(r) {

				if(r == "null"){

	            	var origin = window.location.origin;	
	    			origin += "/MAHAHMIS/index.jsp";
	    			window.location.replace(origin);
		        }						
			}
		});	
	}
	
	
</script>
<%
	session = request.getSession();
	String user_name = (String) session.getAttribute("userName");
	//String user[] = user_name.split(" ");
	String userName = user_name;//user[0] + " " + user[1];
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String abdmFlow2 = resourceBundleEhat.getObject("abdmFlowOnOff").toString();
	String onlyForHealthBayFlow = resourceBundleEhat.getObject("onlyForHealthBayFlow").toString();
	String patientIdLabel = resourceBundleEhat.getObject("patientIdLabel").toString();
	
	ModuleMasterDto moduleObjDto = null;
	org.json.JSONObject modileJsonObj = null;
	if (session.getAttribute("moduleListObj") != null) {
		moduleObjDto = (ModuleMasterDto) session.getAttribute("moduleListObj");// fetchSubModules.getUserAccess(0);
		//modileJsonObj = new org.json.JSONObject(moduleObjDto.toString());
		
		String jsonInString = new Gson().toJson(moduleObjDto);
		modileJsonObj = new org.json.JSONObject(jsonInString);
	}	

	NewUserAccessDto objDto = null;
	org.json.JSONObject jo = null;
	if (session.getAttribute("currentPageIdListObj") != null) {
		objDto = (NewUserAccessDto) session.getAttribute("currentPageIdListObj");// fetchSubModules.getUserAccess(0);
		String jsonInString = new Gson().toJson(objDto);
		jo = new org.json.JSONObject(jsonInString);
	}
	
	String moduleViewAccessIds = (String) session.getAttribute("moduleViewAccessIds");
	
%>

<!-- HEADER -->
<div class="container">
	
	<div class="navbar-brand">
		<!-- COMPANY LOGO -->
		
		<input type="hidden" id="onlyForHealthBayFlow" value="<%=onlyForHealthBayFlow%>" />
		<input type="hidden" id="patientIdLabel" value="<%=patientIdLabel%>" />	
		
		<a id="ehatMod0" href="dashboard1.jsp"> <img id="logo111" src="images/Hospital/logo.png" width="107" height="37px"
			style="margin-left: -10px; margin: 1px 0px 0px 0px;">
		</a>
		
		<!-- /COMPANY LOGO -->
		
		<!-- TEAM STATUS FOR MOBILE -->
		<div class="visible-xs">
			<a href="#" class="team-status-toggle switcher btn dropdown-toggle">
				<i class="fa fa-th"></i>
			</a>
		</div>
		<!-- /TEAM STATUS FOR MOBILE -->
		
		<!-- SIDEBAR COLLAPSE -->
		<div id="sidebar-collapse" class="sidebar-collapse btn">
			<i class="fa fa-bars" data-icon1="fa fa-bars" data-icon2="fa fa-bars"></i>
		</div>
		<!-- /SIDEBAR COLLAPSE -->
	</div>
	
	<!-- NAVBAR LEFT -->
	<ul class="nav navbar-nav pull-left hidden-xs" id="navbar-left" style="height: 45px">
		<li class="dropdown"><a href="#" style="height: 45px"
			class="team-status-toggle dropdown-toggle tip-bottom"
			data-toggle="tooltip"> <i class="fa fa-th"></i> <span
				class="name">Menu</span> <i class="fa fa-angle-down"></i>
		</a></li>	
		
		<li class="dropdown"><a href="#" class="dropdown-toggle" style="height: 45px"
			data-toggle="dropdown"> <i class="fa fa-cog"></i> <span
				class="name">Skins</span> <i class="fa fa-angle-down"></i>
		</a>
		<ul class="dropdown-menu skins">
			<li class="dropdown-title"><span><i class="fa fa-leaf"></i>
					Theme Skins</span></li>
			<li><a data-skin="default">Subtle (default)</a></li>
			<li><a data-skin="night">Night</a></li>
			<li><a data-skin="earth">Earth</a></li>
			<li><a data-skin="utopia">Utopia</a></li> 
			<li><a data-skin="nature">Nature</a></li>
			<li><a data-skin="graphite">Graphite</a></li>
		</ul></li>
	</ul>
	<!-- /NAVBAR LEFT -->
	
	<!-- BEGIN TOP NAVIGATION MENU -->
	<ul class="nav navbar-nav pull-right">	
		<li class="dropdown user" id="header-user"><a href="#"
			class="dropdown-toggle" data-toggle="dropdown"> <img alt=""
				src="images/user.png" /> <span class="username"><%=userName%></span> <i class="fa fa-angle-down"></i>
		</a>
			<ul class="dropdown-menu">
				<li><a href="UserPassword.jsp"><i class="fa fa-user"></i>
						My Profile</a></li>
				<li><a href="LeaveManagement.jsp"><i class="fa fa-cog"></i>
						Manage Leaves</a></li>
				<li><a onclick="logoutCurrentUser()"><i
						class="fa fa-power-off"></i> Log Out</a></li>
			</ul></li>
		<!-- END USER LOGIN DROPDOWN -->
	</ul>
	<!-- END TOP NAVIGATION MENU -->
	
</div>

<!-- hidden field -->
<input type="hidden" id="sandboxFlow2" value="<%=abdmFlow2%>">

<!-- TEAM STATUS -->
<div class="container team-status" id="team-status">
	<div id="scrollbar">
		<div class="handle"></div>
	</div>
	<div id="teamslider">
		<ul class="team-list" id="ulModuleList">

		</ul>
	</div>
</div>
<!-- /TEAM STATUS -->

<div style="display: none;" id="divAllSubModules"></div>

<!--/HEADER -->

<script type="text/javascript" src="js/notification.js"></script>
<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>
<link rel="stylesheet" type="text/css" href="css/default.css" />
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<script src="bootstrap-dist/js/bootstrap.min.js"></script>

<script>

	shortcut.add("Shift+m+n,", function() {
	
		 var password = prompt("Please Enter Password!!!");
		if(password == "admin"){
			$("#idMCI").removeClass("hide");
		}else{
			$("#idMCI").addClass("hide");
		}
		
	});
	
	var onlyForHealthBayFlow = $("#onlyForHealthBayFlow").val();
	if(onlyForHealthBayFlow == "on"){
		$("#ehatMod0").attr('href','dashboard1.jsp');
	}
	else{
		$("#ehatMod0").attr('href','dashboard1.jsp');
	}
	
	$(function() {

		var moduleViewAccessIds = '<%=moduleViewAccessIds%>'; 
		
		var moduleObj = JSON.stringify(<%= modileJsonObj %>);
		setModuleList(JSON.parse(moduleObj), moduleViewAccessIds);
		
		var subModObj = JSON.stringify(<%= jo %>);
		$("#divAllSubModules").html(subModObj);

		var abdmFlow = $('#sandboxFlow2').val();
		if(abdmFlow=='off'){
	
			$('#sandboxFlow3').hide();	
			//alert(abdmFlow);
		}
		else {
			$('#sandboxFlow3').show();
		}
	
	}); 
	
	function setModuleList(r, moduleViewAccessIds){
	
		var htm="";
		for(var i=0; i < r.lstModule.length; i++){
			if(moduleViewAccessIds.indexOf(r.lstModule[i].moduleId) != -1){

				htm = htm + '<li id="ehat_module_'+r.lstModule[i].moduleId+'" style="display: none" class="ehatModule" value="'+r.lstModule[i].landPageId+'" ><a href="'+r.lstModule[i].landPageName+'">'+r.lstModule[i].moduleName+'</a></li>';
			}
		}
		$("#ulModuleList").html(htm);
	}
	
	function logoutCurrentUser(){
		jQuery.ajax({
			async : false,
			type : "POST",
			data : "reqType=AJAX",
			url : "ehat/users/logoutCurrentUser",
			timeout : 1000 * 60 * 15,
			cache : true,
			error : function() {
				alert('Network Issue');
			},
			success : function(r) {
					
				window.location.replace(r);			
			}
		});
	}

	/************
	* @author	: Ajinkya Purkar
	* @date		: 09-march-2023
	* @codeFor	: Get User Access To Page
	*************/
	function  getUserAccessToPage(s) {
		
		var callF="";
		var moduleId = s;
		var inputs= [];
		inputs.push("moduleId=" + moduleId);
		var str = inputs.join('&');	
		jQuery.ajax({
			async : false,
			type : "POST",
			data 	: str + "&reqType=AJAX",	
	        url :"ehat/NewUserAccess/getUserAccessToPage",
			timeout : 1000 * 60 * 5,
			cache : false,	
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				setLeftMenuForModule(response);
			}
		});
	}

	function setLeftMenuForModule(r,moduleId){
		
		var htm = "";
		var jspName = '';
		for(var i=0; i<r.listuserDto.length; i++){
			
			var subModuleId = r.listuserDto[i].subModuleId;
			var subModuleName = r.listuserDto[i].subModuleName;
			var mainSubId = r.listuserDto[i].subModuleMasterId;
			
			if(r.listuserDto[i].moduleId == moduleId && r.listuserDto[i].checksub == "Y"){
				
				if(r.listuserDto[i].subCount > 0){		

					htm = htm + ' <li class="TextFont has-sub ehat_subModule_'+subModuleId+'" style="display:none;"><a href="#" > '
					          + ' 	<i class="fa fa-hospital-o fa-fw"></i> <span class="menu-text">'+subModuleName+'</span><span class="arrow"></span></a> '
					          + ' 		<ul class="sub"> ';
					for(var j=0; j< r.listuserDto.length; j++){
					
						var hasSubId = r.listuserDto[j].subModuleMasterId;
						if(subModuleId == hasSubId && r.listuserDto[j].checksub == "Y"){

							htm = htm + ' 			<li class="TextFont ehatSubModule ehat_subModule_'+r.listuserDto[j].subModuleId+'" style="display:none;"> '
			                          +	' 			<a href="'+r.listuserDto[j].jspPageName+'.jsp"> <i class="fa fa-link fa-fw"></i> '
		                              + ' 			<span class="menu-text">'+r.listuserDto[j].subModuleName+'</span></a></li> ';
		                              
						}
					}
					
					htm = htm + ' </ul> </li> ';
					
				}else if(mainSubId == ""){

					if(subModuleName == 'Bill Comparison')
						jspName = (r.listuserDto[i].jspPageName+".jsp?pageFrom=Comparison");
					else if(subModuleName == 'Bill Quotations')
						jspName = (r.listuserDto[i].jspPageName+".jsp?pageFrom=Quotations");
					else
						jspName = r.listuserDto[i].jspPageName+'.jsp';
					
					htm = htm + ' <li class="TextFont ehatSubModule ehat_subModule_'+subModuleId+'" style="display:none;"> '
			                  +	' <a href="'+jspName+'"> <i class="fa fa-link fa-fw"></i> '
		                      + ' <span class="menu-text">'+r.listuserDto[i].subModuleName+'</span></a></li> ';
				}

			}
		}
			
		$("#leftMenuUl").html(htm);	

		//handleSidebar();
		jQuery('.sidebar-menu .has-sub > a').click(function () {
            var last = jQuery('.has-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);
            
			var thisElement = $(this);
			var slideOffeset = -200;
            var slideSpeed = 200;
			
            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
				sub.slideUp(slideSpeed, function () {
					if ($('#sidebar').hasClass('sidebar-fixed') == false) {
						App.scrollTo(thisElement, slideOffeset);
					}
					//handleSidebarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function () {
					if ($('#sidebar').hasClass('sidebar-fixed') == false) {
						App.scrollTo(thisElement, slideOffeset);
					}
					//handleSidebarAndContentHeight();
                });
            }
        });
	}

</script>

<!-- For User Access Management -->
<%@include file="ehat_user_access_control.jsp"%>