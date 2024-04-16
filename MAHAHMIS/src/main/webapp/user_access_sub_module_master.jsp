<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>SubModule Master</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

	
	
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

</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
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
											<li><i class="fa fa-home"></i> <a href="user_access_sub_module_master.jsp">SubModule Master</a></li>
											
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-6">
													<div class="container">
														<div class="panel panel-primary" style="height: 528px">
															<div class="panel-heading" id="divEhatContent">SubModule Master</div>
															<div class="panel-body">
															
																<input id="masterSubModuleId" class="hidden">
																<input id="subModuleListSpan" class="hidden">
															
																<div class="form-row">
																	<div class="form-group col-md-8">
																		<label for="inputEmail4">SubModule Name</label> <input validateAlphabetsByRegEx(this.id)
																			class="form-control tip-focus"	title="Please enter document name" id="subModuleName" type="text" placeholder="Module Name">
																	</div>
																</div>
																
																<div class="form-row">
																	<div class="form-group col-md-8">
																		<label for="inputEmail4">Access</label> 
																		<select id="subModuleType" class="form-control tip-focus">
																			<option value="1">View/Edit/Del</option>
																			<option value="2">On/Off</option>
																		</select>
																	</div>
																</div>
																
																<div class="form-row">
																	<div class="form-group col-md-8">
																		<label for="inputEmail4">Module</label> 
																		<select id="moduleList" onchange="changeModule()" class="col-md-12 tip-focus"></select>
																	</div>
																</div>
																
																<div class="form-row">
																	<div class="form-group col-md-8">
																		<label for="inputEmail4">SubModule</label> 
																		<select id="subModuleList" class="col-md-12 tip-focus"></select>
																	</div>
																</div>
																
																<div class="form-row">
																	<div class="form-group col-md-8">
																		<label for="inputEmail4">Jsp Page</label> <input validateAlphabetsByRegEx(this.id)
																			class="form-control tip-focus"	title="Please enter document name" id="jspPageName" type="text" placeholder="Jsp Page Name">
																	</div>
																</div>
																
																<div class="form-row">
																	<div class="form-group col-md-8">
																		<label for="inputEmail4">SubModule Sequence</label> <input validateAlphabetsByRegEx(this.id)
																			class="form-control tip-focus"	title="Please enter document name" id="subSequence" type="text" placeholder="Sequence Number">
																	</div>
																</div>	
																
																
										         	<div class="form-row">
											           	<label class="form-group col-md-5">SubModule Display Check</label> <input
												          	class="form-group col-md-3" type="checkbox" name="checksub" id="checksub"
												         	checked="checked" class="form-group col-md-3">
										         	</div>
																
																<div class="form-row">
																	<div class="form-group col-md-8">
																		<button type="button" class="btn btn-success editUserAccess" onclick="insertSubModule()" style="margin-top: 15px;">Save</button>
																		<button type="button" class="btn btn-warning deleteUserAccess" onclick="refreshSubModuleMaster()" style="margin-top: 15px;">Clear</button>
																	</div>
																</div>
																
															</div>
														</div>
													</div>
												</div>
												<!-- <div class="divide-20"></div> -->
												<div class="col-md-6">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">SubModule Master Table</div>
															<div class="panel-body" style="overflow: auto;height: 500px">
																<div class='col-sm-12' style='border: 1px solid #ddd; overflow: auto; height: 450px; max-height: auto;'>
												
																	<ul class="moduleTree" style="margin-top: 15px;">
																	  
																	</ul>
																</div>																	
															</div>
														</div>								
														
													</div>
												</div>
												
											</div>

										</div>
									</div>
									
									
									<!--Start #showSubModulesPopup Popup -->
									<div id="showSubModulesPopup" class="modal fade in">
										<!--End #showSubModulesPopup Popup -->
										<input id="objUserAccess" type="hidden" value="" />
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
	<%@include file="inv_footer.jsp"%>
	
	<!-- include js for development -->
	<script type="text/javascript" src="js/UserAccess.js"></script>
	
	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllModule();
			getAllSubModule();	
			$("#moduleList").select2();
			$("#subModuleList").select2();
		});
	</script>
	<input id="masterModuleId" class="hidden">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>