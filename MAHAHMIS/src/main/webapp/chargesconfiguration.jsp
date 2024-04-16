<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Hall Wise Configuration</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- <script src="js/demoConfiguration2.js"></script> -->
<script src="js/chargesconfiguration2.js"></script>

<script type="text/javascript">
	onload = function() {

		
		fetchAllService();
		fetchHeaderList();
	}
</script>
</head>
<body style="background: white ! important;">
	
<section id="page">
	<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
					<%-- <%@include file="Menu_Header_Nobel.jsp"%> --%>
				</header>
				<!--/HEADER -->
	
	
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

								<ul class="breadcrumb col-md-12-1"
									style="padding: 4px 10px; margin-top: 1px;">

									<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
									</li>
									<li><a href="hospital_info.jsp">Administrator</a></li>
									<li><a href="chargesconfiguration.jsp">Hall Wise Configuration</a></li>

									<div class="pull-right">
								
										<input class="btn btn-xs btn-success" type="button" onclick="savehallwithservices()"
										value="SAVE" data-target="#myModal" data-toggle="modal" style="font-size: 12px;">
										
										<!-- <input class="btn btn-xs btn-success" type="button" onclick="fetchhallwiseservices('edit')"
										value="EDIT" data-target="#myModal" data-toggle="modal" style="font-size: 12px;">
 -->
									</div>
								</ul>
							</div>
						</div>
					</div>

					<div class="row">
						<!-- NEW ORDERS -->
						<div class="col-md-12">
							<div class="box border">

								<div class="box-body">
									<div class="tabbable header-tabs">
											<div id="divLine3" class="  col-md-12"
												style="margin-left: 0%; margin-top: -2%;">
												<form class="form-horizontal col-md-12"
													style="margin-top: 1%; margin-bottom: 1%;" id="myform">
													<div class="divide-20"></div>
													<div class="col-md-4" style="margin-left: -1%;">
														<div class="row">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-left: 10px;">Select
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: 7%; height: 67px; width: 3%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstr" id="listmstr_select"
																			style="width: 200px"
																			onchange="setDyanamicDiv('dynamicItem',this.id)">
																			<option id="firstElmt" value="0">--- Select
																				Services ---</option>

																		</select>
																	</div>
																</div>
															</div>
														</div>
														<div
															class="col-md-12 select2-container select2-container-multi "
															style="margin-top: -7%;">
															<ul id="dynamicItem" class="select2-choices"
																style="overflow-y: scroll;">

															</ul>

														</div>
														<div class="divide-20"></div>

													</div>


													

												</form>

											</div>
										



										<!-- <div class="row" style="margin-top: 10px" >
											<div class="col-md-12">
												BOX
												<div class="box border green" id="div1"  style="display: none;">
													<div class="box-title">
														<h4>charges configuration</h4>

													</div>
													<div class="box-body" id="divEhatList"
														style="height: 330px; overflow-y: auto; overflow-x: auto; max-width:100%;">
														<div class="row">
														<div class="col-sm-12">
															<div class="pull-right">
																<div id="datatable1_filter" class="dataTables_filter">
																	<label id="searchlabel"> <input
																		id="setDatabyName" class="form-control input-sm"
																		type="text" aria-controls="datatable1"
																		placeholder="Search"
																		onkeyup="setDatahallwise(this.id)">
																	</label>
																</div>
															</div>

														</div>
														</div> id="servicesDiv"

														<table class="datatable table  table-bordered " border="0" >



															<thead style="background-color: lightgray;"
																id=serviceHeader>

															</thead>

															<tbody id=servicesDiv>

															</tbody>

														</table>
													
													</div>
												</div>

											</div>
										</div> -->
									<!-- 	<div class="col-md-6"> -->
											<input id="searchk" type="text" onkeyup="tk()" placeholder="search by services">
										<!-- </div> -->
										<div class="panel panel-default">
											<div class="panel-body">
												<div class='col-md-12-1'
													style='height: 485px; max-height: auto;  overflow-x: scroll; overflow-y: scroll;'>
													<table id="hallwiseTable"
														class='table table-bordered table-condensed cf table-fixed'
														style='margin-bottom: 9px;  overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
														<thead  style="background-color: lightgray;"
																id="serviceHeader">
															
														</thead>
														<tbody class="table-striped"  id="servicesDiv">
															
														</tbody>
													</table>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>


				</div>
				<!-- /CONTENT-->
			</div>
		</div>
	</div>
	<div id="pleaseWait" style="text-align: center; display:none;">
        <img style="margin-top: 250px;" height="43px" src="images/loading_black.gif"/>
        <div style="margin-top: 10px; color: white">
            <b>Please wait...</b>
        </div>
</div> 
	<!-- </div> -->
		<%-- </c:if> --%>
	</section>
	
	<input type="hidden" id="servicesInfo" value="servicesInform">
	<input type="hidden" id="queryType" value="insert">
	<%@include file="footer_nobel.jsp"%> <!-- </section> -->




	<!-- =-=-=-=-Touheed multiselect plugin=-=-=-=-=- -->
	<!-- =-=-=-=-=-=Multiselect=-=-=-=-=-=-=-=- -->

	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- WIZARD -->
	<script
		src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
	<!-- WIZARD -->
	<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<script type="text/javascript" src="js/validate.js"></script>
	<!-- BOOTBOX -->
	<script type="text/javascript"
		src="ehat-design/js/bootbox/bootbox.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
	<!-- -=-=-=-=-=-=-=-=-=-=-=-=Multi select-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- -->
	<!-- -=-=-=-=-=Touheed Multiselect plugin-=-=-=-=-= -->
</body>
</html>