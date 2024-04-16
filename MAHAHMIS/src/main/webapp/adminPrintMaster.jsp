<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Print Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
	<!-- include js for development -->
	<script type="text/javascript" src="js/hospitalDetailAdministrator.js"></script>
	
</head>
<body>
<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
		getAllModule();
		getAllPrint();
		
	});
</script>
<style>

ul.moduleTree li {
    list-style-type: none;
    position: relative;
}

ul.moduleTree li ul {
    display: none;
}

ul.moduleTree li.open > ul {
    display: block;
}

ul.moduleTree li a {
    color: black;
    font-size: 15px;
    /* text-decoration: none; */
}

ul.moduleTree li .btn{
	margin-left: 15px; 
	margin-bottom: 5px;
	display: none;
}

/* ul.moduleTree li:hover .btn{
	display: inline;
} */

ul.moduleTree li a:before {
    height: 1em;
    padding:0 .1em;
    font-size: .8em;
    display: block;
    position: absolute;
    left: -1.3em;
    top: .2em;
}

ul.moduleTree li > a:not(:last-child):before {
    content: '+';
}

ul.moduleTree li.open > a:not(:last-child):before {
    content: '-';
}
</style>

<body style="background: white ! important;">
	<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	<c:if test="${sessionScope.userType != null }">
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="left_menu_admin.jsp"%>

		<!-- /SIDEBAR -->
		<div id="main-content">
			
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									<!-- STYLER -->

									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
									<li><i class="fa fa-home"></i> <a href="UserManagement.jsp">Administrator</a>
										</li>	
										<li><i class="fa fa-home"></i> <a href="adminPrintMaster.jsp">Admin Print Master</a>
										</li>
									<li class="pull-right">
									<button class="btn btn-xs btn-info pull-left" type="button" onclick="toggleForm('printForm')">
											<i class="fa fa-plus"></i> Admin Print Master
										</button>
									</li>		
									
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-4">
										
									</div>															
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
										<input id="masterPrintId" class="hidden">
											<div class="row">
												<div class="col-md-12" id="printForm" style="display: none;">
													<div class="container" id="masterPrintId">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Admin Print Master</div>
																<div class="box-body big" id="divEhatContent">
													
																	<div class="row">
																		<div class="col-md-12" style="padding: 10px;">
																		
																			</form>
																			<form class="form-horizontal col-md-4" role="form">
																				<div class="form-group">
																					<label class="col-sm-4 control-label">Print ID</label> 
																					<div class="col-sm-8">
																						<input type="text" id="printId" readonly="true" name="printId" class="form-control tip-focus"  >															
																					</div>
																				</div>
																			</form>
																				<form class="fo	rm-horizontal col-md-4" role="form">
																				<div class='form-group col-md-4-1'>
																		
																		<label class="TextFont">Print Name<b
																			style='color: red;'>*</b></label> 
																			<input id='printName' type='text'
																			placeholder='Print Name'
																			onkeypress='return validatealphabetic(event)'																				
																			required='true'/>
																				</div>
																				</form>
																				<form class="form-horizontal col-md-4" role="form">
																				<div class='form-group Remove-Padding col-md-12'>
																		
																		<label class='TextFont col-md-4-1'>Module<b
																			style='color: red; '>*</b></label> 
																	<select id="moduleList" class="col-md-10-1 center">
																		</select>
																			</div>
																			</form>
																																
																		</div>
																		<form class="form-horizontal col-md-4" role="form">													
																			<div class="form-group" style="margin-left: 132px">
																				<button type="button" class="btn btn-success" onclick="insertPrint()">Save</button>
																				<button type="button" class="btn btn-warning" title="Refresh" onclick="refreshPrintMaster()">Clear</button>
																			</div>
																			
																		</form>
																	</div>
	                                                			</div> 
														</div>
													</div>
												</div>
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 5px">
															<div class="col-md-12">
																<div class="panel panel-primary">
																	<div class="panel-heading">Admin Print Master</div>
																	<div class="panel-body"style="overflow:auto;height:300px;">
																		<ul class="moduleTree" style="margin-top: 15px;">
																	  <!-- <li><a href="#">Part 1</a>
																	    <ul>
																	      <li><a href="#">Item A</a>
																	        <ul>
																	          <li><a href="#">Sub-item 1</a></li>
																	          <li><a href="#">Sub-item 2</a></li>
																	          <li><a href="#">Sub-item 3</a></li>
																	        </ul>
																	      </li>
																	      <li><a href="#">Item B</a>
																	        <ul>
																	          <li><a href="#">Sub-item 1</a></li>
																	          <li><a href="#">Sub-item 2</a></li>
																	          <li><a href="#">Sub-item 3</a></li>
																	        </ul>
																	      </li>
																	      <li><a href="#">Item C</a>
																	        <ul>
																	          <li><a href="#">Sub-item 1</a></li>
																	          <li><a href="#">Sub-item 2</a></li>
																	          <li><a href="#">Sub-item 3</a></li>
																	        </ul>
																	      </li>
																	      <li><a href="#">Item D</a>
																	        <ul>
																	          <li><a href="#">Sub-item 1</a></li>
																	          <li><a href="#">Sub-item 2</a></li>
																	          <li><a href="#">Sub-item 3</a></li>
																	        </ul>
																	      </li>
																	      <li><a href="#">Item E</a>
																	        <ul>
																	          <li><a href="#">Sub-item 1</a></li>
																	          <li><a href="#">Sub-item 2</a></li>
																	          <li><a href="#">Sub-item 3</a></li>
																	        </ul>
																	      </li>
																	    </ul>
																	  </li> -->
																		</ul>
	
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>			
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->

	
		<div id="showSubModulesPopup" class="modal fade in">
					<!--End #showSubModulesPopup Popup -->
					<input id="objUserAccess" type="hidden" value="" />
					<%@include file="Footer.jsp"%>
				</div>
	</c:if>
	
	
</body>
</html>
