<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Doctor Desk</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" type="text/css" href="ehat-design/css/new.css" />
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
<script
	src="ehat-design/bootstrap-dist/js/bootstrap-datetimepicker.min.js"></script>
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
<!--Template  -->
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
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
	href="ehat-design/js/bootstrap-switch/bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-switch/bootstrap-datetimepicker.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-switch/bootstrap-datetimepicker-standalone.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen" />

<!--Navnath-->
<!--time picker css and js start-->

<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>


<!--time picker css and js start-->

<link rel="stylesheet" type="text/css"
	href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />


<!--user defined added for operations-->

<script src="js/hisab/Chart.js"></script>
<script type="text/javascript" src="js/dd_demo_master.js"></script>
<script type="text/javascript" src="js/dd_organ_master.js"></script>
<script type="text/javascript" src="js/dd_complaint_demo_master.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/ehat_OPDDoctorsDesk.js"></script>
<script type="text/javascript" src="js/dd_main_dashboard.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/dd_complaintmaster.js"></script>
<script type="text/javascript" src="js/dd_demo_doctor.js"></script>
<script type="text/javascript" src="js/dd_allergy.js"></script>


<script type="text/javascript" src="js/dd_std_growth_chart.js"></script>
<!-- chart -->
<script type="text/javascript" src="js/ExtraJs/jqx-widgets/jqxcore.js"></script>
<script type="text/javascript" src="js/ExtraJs/jqx-widgets/jqxdata.js"></script>
<script type="text/javascript" src="js/ExtraJs/jqx-widgets/jqxdraw.js"></script>
<script type="text/javascript"src="js/ExtraJs/jqx-widgets/jqxchart.core.js"></script>
<!-- /chart -->

<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css"
	type="text/css" />
	<script type="text/javascript" src="js/studyChart/highcharts.js"></script>
	<script type="text/javascript" src="js/studyChart/studyChart.js"></script>

<style>
body {
	color: #555555;
}

.a1 {
	margin: 0% 50%;
}

.col-md-1 {
	padding-left: 10px;
}

.nav .nav-divider {
	height: 1px;
	margin: 9px 0;
	overflow: hidden;
	background-color: #e5e5e5;
}

.nav>li>a>img {
	max-width: none;
}

.nav-tabs {
	border-bottom: 1px solid #dddddd;
}

.nav-tabs>li {
	float: left;
	margin-bottom: -1px;
}

.nav-tabs>li>a {
	margin-right: 2px;
	line-height: 1.428571429;
	border: 1px solid transparent;
	border-radius: 4px 4px 0 0;
	cursor: pointer;
}

.nav-tabs>li>a:hover {
	border-color: #eeeeee #eeeeee #dddddd;
}

.nav-tabs>li.active>a,.nav-tabs>li.active>a:hover,.nav-tabs>li.active>a:focus
	{
	color: #555555;
	background-color: #ffffff;
	border: 1px solid #dddddd;
	border-bottom-color: transparent;
	cursor: default;
}

.nav-tabs.nav-justified {
	width: 100%;
	border-bottom: 0;
}

.nav-tabs.nav-justified>li {
	float: none;
}

.nav-tabs.nav-justified>li>a {
	text-align: center;
	margin-bottom: 5px;
}

.nav-tabs.nav-justified>.dropdown .dropdown-menu {
	top: auto;
	left: auto;
}

.price_block {
	text-align: center;
	color: #fff;
	float: left;
	list-style-type: none;
	transition: all 0.25s;
	position: relative;
	box-sizing: border-box;
	border-radius: 4px;
	margin-bottom: 10px;
	border-bottom: 1px solid transparent;
	padding-left: 0px;
	padding-right: 0px;
}

.nav_home .nav-tabs>li.active>a,.nav-tabs>a:hover {
	color: #555555;
	background: none !important;
	border: none !important;
	text-decoration: none;
	cursor: default;
	border-bottom: 2px solid red !important;
	line-height: 20px;
}

.nav_home .nav-tabs>li {
	line-height: 20px;
	font-size: 11px !important;
}

.nav_home .nav-tabs>li>a:hover {
	line-height: 20px;
}

.aa {
	background: #e7e7e7 !important;
}

.aa .breadcrumb {
	background: none !important;
}

.top_labels label {
	/* font-weight: bold !important;
			font-size: 12px; */
	
}

.panel-default>.panel-heading {
	color: #333333;
	background-color: #fafafa !important;
	border-color: #dddddd;
}

.panel-group .panel-heading .accordion-toggle {
	display: block;
	text-decoration: none;
	font-size: 10px;
	color: #868686;
	font-weight: 700;
}

.panel-heading {
	padding: 5px 10px;
	border-bottom: 1px solid transparent;
	border-top-right-radius: 0px !important;
	border-top-left-radius: 0px !important;
}

.panel-group .panel {
	margin-bottom: 0;
	border-radius: 0px;
	overflow: hidden;
}

.panel-heading {
	padding: 9px 10px !important;
	border-bottom: 1px solid transparent;
	border-top-right-radius: 0px !important;
	border-top-left-radius: 0px !important;
}

.tabs-left>.nav-tabs>li>a {
	margin-right: -1px;
	-webkit-border-radius: 4px 0 0 4px;
	-moz-border-radius: 4px 0 0 4px;
	border-radius: 4px 0 0 4px;
	padding: 7px;
}
/*------------------*/
.tabs-left>.nav-tabs a {
	font-size: 10px !important;
}

.right_tab .nav-tabs>li>a {
	padding: 5px !important;
}

.right_tab .form-control {
	display: block;
	width: 100%;
	height: 34px;
	padding: 1px 12px;
	padding: 1px 3px;
	font-size: 10px;
	font-weight: 600;
	line-height: 1.428571429;
	color: #555555;
	vertical-align: middle;
	background-color: #ffffff;
	background-image: none;
	border: 1px solid #cccccc;
	border-radius: 0px;
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	-webkit-transition: border-color ease-in-out .15s, box-shadow
		ease-in-out .15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.right_tab .btn {
	border-radius: 0px !important;
	font-size: 10px;
	font-weight: 600;
}

.right_tab .btn-default {
	color: #333333;
	background-color: #ffffff;
	border-color: #cccccc;
}
/*-----------*/
/* Switch button */
.btn-default.btn-on.active {
	background-color: #418fd1;
	color: white;
}



.btn-default.btn-off.active {
	background-color: #DA4F49;
	color: white;
}

.p-r {
	float: right;
}

.home_table {
	font-size: 10px !important;
}

.nav_home .nav>li>a {
	position: relative;
	display: block;
	padding: 0px 8px;
}

.tatail_Reccomandations {
	display: block;
	text-decoration: none;
	font-size: 10px;
	color: #868686;
	font-weight: 700;
}
</style>
<!--i am not using below css-->
<style>
.table1 {
	display: table;
	width: 100%;
}

.row1 {
	display: table-row;
}

.cell1 {
	display: table-cell;
	width: 33%;
	border-bottom: 1px solid black;
}

.tabFont {
	font-size: 9px
}

.panel-body {
	padding: 10px;
}

.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12
	{
	padding-left: 8px;
	padding-right: 8px
}

dropdown p {
	display: inline-block;
	font-weight: bold;
}

.div1{
	width: 300px;
 	height: 200px;
  	border: 1px solid dimgrey;
  	overflow:auto;
	scrollbar-width: thin;
}
.div2{
	width: 300px;
    height: 200px;
    border: 1px solid dimgrey;
  	overflow:auto;
	scrollbar-width: thin;
	margin-left:auto;
}
.double_rigt{
margin-top: 73px;
margin-left: 38px;
}
.double_left{
margin-top: 113px;
margin-left: -44px;
}
.dropdown select {
	border: 0 !important; /*Removes border*/
	-webkit-appearance: none; /*Removes default chrome and safari style*/
	-moz-appearance: none; /* Removes Default Firefox style*/
	background: url('http://jonathanphz.tk/dropdown_arrow.png') no-repeat;
	/*Adds background-image*/
	background-position: 80px 8px; /*Position of the background-image*/
	width: 100px;
	/*Width of select dropdown to give space for arrow image*/
	height: 20px; /*fix for mac input height*/
	text-indent: 0.01px; /* Removes default arrow from firefox*/
	text-overflow: ""; /*Removes default arrow from firefox*/
	cursor: pointer;
	/*My custom style for fonts*/
	color: #1455a2;
}

select option {
	text-align: center;
}

#sidebarnew {
	background: none repeat scroll 0 0 #f4f4f4;
	padding: 0 !important;
	width: 204px;
	position: absolute;
	border-bottom: 1px solid #e7e7e7;
}
</style>
</head>
<body>

	<%
		session = request.getSession();
		String uid = (String) session.getAttribute("uid");
		ResourceBundle resourceBundleEha = ResourceBundle
				.getBundle("EhatEnterpriseConfigurationFile");
		//String cancerOnOff = resourceBundleEha.getObject("cancerOnOff").toString();

		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
				"dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());
	%>

	<!-- HEADER -->
	<c:if test="${ sessionScope.userType != null }">
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="dd_menu_DoctorDesk.jsp"%>

			<div id="main-content">
				<div class="container">
					<div id="content" class="row" style="background: #fff;min-height:0px">
						<!-- PAGE HEADER-->
						<div class="">
							<div class="">
								<div class="aa pageheaderfordd"
									style="background: #ccc; height: 10%;">
									<div class="col-sm-9 col-xs-12">
										<ul class="breadcrumb">
											<li>Date: <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="index.html">Home</a>
											</li>
											<li><a href="#">OPD</a></li>
											<li><a href="#">Doctor Desk</a></li>
										</ul>
									</div>


									<div class="col-sm-3 col-xs-12">
										<!-- <div class="p-r" style="padding-top: 5px">
							<img
								src="../Project folder structure file/ehat-design/img/icon5.png">
							<img
								src="../Project folder structure file/ehat-design/img/icon3.png">
							<img
								src="../Project folder structure file/ehat-design/img/icon4.png">
						</div> -->

										<ul class="breadcrumb">

											<li class="pull-right">
												<div class="btn-toolbar" role="toolbar"
													aria-label="Toolbar with button groups">
													<div class="btn-group" role="group"
														aria-label="Third group">
														<button type="button" class="btn btn-primary btn-xs">
															<i class="fa fa-check"></i>
														</button>
													</div>

													<div class="btn-group" role="group"
														aria-label="Third group">
														<button type="button" class="btn btn-xs btn-info">
															<i class="fa fa-stethoscope fa-fw"></i>
														</button>
													</div>

													<div class="btn-group" role="group"
														aria-label="Third group">
														<button type="button" class="btn btn-xs btn-success">
															<i class="fa fa-times"></i>
														</button>
													</div>
												</div>


											</li>
										</ul>

									</div>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
						<!-- /PAGE HEADER -->

						<!-- INLINE TABS -->
						<div class="clearfix"></div>
						<div class="">
							<div class="" style="background: #FFF; padding: 3px;">
								<div class="box-body big col-md-3 left_body">
									<div class="row patientFont">
										<div class="col-md-12">
											<div class="tabbable pad-top10">
												<div class="col-md-3" style="margin-bottom: 15px;">
													<img class="img-responsive1" id='patientImg'
														src="ehat-design/img/vinod.png"></img>
												</div>
												<div class="col-md-9 namedetail">
													<p>
														<label title="Patient Name" class="patHeader col-md-12"
															id="patientname"></label>
													</p>
													<p style="margin-bottom: 0px !important">
														<label title="UHID" class="patHeader col-md-12" id="mrnid"></label>
													</p>
												</div>
												<div class="clearfix"></div>
												<div class="space"></div>
												<div class="nav_home">
													<ul class="nav nav-tabs ">
														<li class="active patHeader"><a href="#tab_1_1"
															data-toggle="tab">Treatment Details</a></li>
														<li><a href="#tab_1_2" onclick="getFolderinfo()"
															data-toggle="tab" class="patHeader">Uploads</a></li>


													</ul>
													<div class="tab-content">
														<div class="tab-pane fade in active" id="tab_1_1">
															<div class="divide-10"></div>
															<div class="col-md-2 box-hight">
																<a title="Dashboard" style="cursor: pointer;"
																	onclick="displayHideDiv('home')"><i
																	class="fa fa-home"></i></a>
															</div>
															<div class="col-md-10 box-hight2">
																<a style="cursor: pointer; color: white;"
																	onclick="displayHideDiv('cepisode')">Current
																	Episode: <%=todays_date%>
																</a>
															</div>

															<!--Treatment Seaction start
		@Author:Arpit 
		   -->

															<div class="col-md-12 sidetablescroll">
																<table class="table home_table ">
																	<thead>
																		<tr>
																			<th class="col-md-1 center">#</th>
																			<th class="col-md-1 center">Date</th>
																			<th class="col-md-1 center">Dept</th>
																			<th colspan="3" class="col-md-1 center">Action</th>
																		</tr>
																	</thead>
																	<tbody id="treatmentList">


																	</tbody>
																</table>
															</div>
														</div>
														<div class="tab-pane fade" id="tab_1_2">
															<div class="divide-10"></div>

															<div class="sidetablescroll">
																<table class="table home_table">
																	<thead>
																		<tr>
																			<th class="text-center">#</th>
																			<th class="text-center">Date</th>
																			<th class="text-center">Document</th>
																			<th class="text-center"><button
																					class="btn btn-danger btn-xs"
																					onclick="deleteDocs()">
																					<i class="fa fa-trash-o"></i>
																				</button></th>
																		</tr>
																	</thead>
																	<tbody id="documentList">
																	</tbody>
																</table>
															</div>
															<div class="col-md-12 form-row">
																<div class="col-md-12 form-group">
																	<hr style="border: 1px solid red">
																	<label>Upload File</label>
																</div>
																<div class="col-md-12 form-group">
																	<form id="ddfileUploadfrm" name="ddfileUploadfrm"
																		enctype="multipart/form-data" method="post">

																		<input type="file" name="ddfile" id="ddfile"
																			multiple="multiple" onchange="uploadFile()" />

																	</form>
																</div>
																<div class="divide-10"></div>
																<div class="col-md-12">
																	<button type="button" class="btn btn-primary btn-xs"
																		onclick="savePatientDocument()">Upload</button>
																</div>
															</div>

														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="box-body col-md-9">
									<div class="top_labels">
										<div class="row">
											<div class="col-md-10 form-row">
												<div class=" col-sm-4">
													<p>
														<label class="patHeader"> Treatment No:</label>&nbsp;<label
															class="patHeader" id="treatmentid"> </label>
													</p>
													<p>
														<label class="patHeader"> DOA:</label>&nbsp;<label
															class="patHeader" id="dob"></label>
													</p>
												</div>
												<div class=" col-sm-2">
													<p>
														<label class="patHeader">Age:</label>&nbsp;<label
															class="patHeader" id="age"> </label>
													</p>
													<p>
														<label class="patHeader"> Gender:</label>&nbsp;<label
															class="patHeader" id="gender"></label>
													</p>
												</div>
												<div class=" col-sm-2">
													<p>
														<label class="patHeader">Category: </label>&nbsp;<label
															class="patHeader" id="bill_category"> </label>
													</p>
													<p>
														<label class="patHeader"> Bill No: </label>&nbsp;<label
															class=" patHeader" id="bill_id"></label>
													</p>
												</div>
												<div class=" col-sm-4">
													<p>
														<label class="patHeader"> Consultant: </label>&nbsp;<label
															class="patHeader" id="doctor_id"> </label>
													</p>
													<p>
														<label class="patHeader"> Ref. by: </label>&nbsp;<label
															class=" patHeader" id="ref_dr_name"></label>
													</p>
												</div>
											</div>
											<div class="col-sm-1" id="seropositiveDiv"
												style="display: none;">
												<div class=" text-center">
													<img src="ehat-design/img/icon8.png" height="26">

												</div>
											</div>
											<div class="col-sm-1" id="emrhighriskdiv"
												style="display: none;">
												<div class=" text-center">
													<i class="fa fa-exclamation-triangle"
														style="font-size:26px; color: #ff00009c;"></i>
												</div>
											</div>
										</div>
										<div class="clearfix"></div>
									</div>
									<div class="row">
										<div class="col-md-9 center_wrapper" id="divhome">
											<div class="col-md-12">
												<div class="box-body">
													<div class="row ">
														<div class="col-sm-12 ">
															<div class="col-md-2 col-xs-12 padd_o">
																<a class="box-count noteBox  input-block-level"
																	href="javascript:void(0);"> <span
																	class="label label-right label-danger" id="totalvisit">0</span>
																	<i class="fa fa-users" aria-hidden="true"
																	style="font-size: 32px;"></i>
																	<div class="count_tital">Total Visits</div>
																</a>
															</div>
															<div class="col-md-2 col-xs-12 padd_o">
																<a class="box-count noteBox  input-block-level"
																	href="javascript:void(0);"> <span
																	class="label label-right label-green" id="countlab"></span>
																	<i class=""> <img
																		src="ehat-design/img/chemical.png" width="32"></i>
																	<div class="count_tital">Lab Orders</div>
																</a>
															</div>
															<div class="col-md-2 col-xs-12 padd_o">
																<a class="box-count noteBox  input-block-level"
																	href="javascript:void(0);"> <span
																	class="label label-right label-orange" id="countRad"></span>
																	<i class="fa fa-gear fa-spin" style="font-size: 32px"></i>
																	<div class="count_tital">Radiology Order</div>
																</a>
															</div>
															<div class="col-md-2 col-xs-12 padd_o">
																<a class="box-count noteBox  input-block-level"
																	href="javascript:void(0);"> <span
																	class="label label-right label-blue" id="countNotes"></span>
																	<i class="fa fa-file-text" aria-hidden="true"
																	style="font-size: 32px"></i>
																	<div class="count_tital">Notes</div>
																</a>
															</div>
															<div class="col-md-2 col-xs-12 pull-right">
																<a class="box-count noteBox  input-block-level"
																	href="javascript:void(0);"> <span
																	class="label label-right label-yello">0</span> <i
																	class="fa fa-thumbs-up" aria-hidden="true"
																	style="font-size: 32px"></i>

																	<div class="count_tital">Recommendation</div>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="col-md-6">
												<div class="panel-group" id="accordion">
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">
																<div class="pull-left">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion" href="#collapseOne">Lab
																		Orders</a>
																</div>
																<div class="pull-right">
																	<img src="ehat-design/img/icon7.png"> <img
																		src="ehat-design/img/icon6.png">
																</div>
															</h3>
															<div class="clearfix"></div>
														</div>
														<div id="collapseOne" class="panel-collapse collapse">
															<div class="panel-body tabel-height ">
																<div class="coversheettables">
																	<table class="table  home_table">
																		<thead>
																			<tr>
																				<th class="col-md-1">#</th>
																				<th>Particulars</th>
																				<th class="col-md-1">Date</th>
																				<th class="col-md-1">Report</th>
																			</tr>
																		</thead>
																		<tbody id="tblForLabOrders">
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">
																<div class="pull-left">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion" href="#collapseTwo">Radiology
																		Orders</a>
																</div>
																<div class="pull-right">
																	<img src="ehat-design/img/icon7.png"> <img
																		src="ehat-design/img/icon6.png">
																</div>
															</h3>
															<div class="clearfix"></div>
														</div>
														<div id="collapseTwo" class="panel-collapse collapse">
															<div class="panel-body tabel-height ">
																<div class="coversheettables">
																	<table class="table home_table">
																		<thead>
																			<tr>
																				<th class="col-md-1">#</th>
																				<th>Particulars</th>
																				<th class="col-md-1">Date</th>
																				<th class="col-md-1">Report</th>
																			</tr>
																		</thead>
																		<tbody id="tblForRadiologyOrders">
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>

													<!--medication Seaction start
						                       @Author:Arpit 
						                  -->

													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">
																<a onclick="getPrescriptionList()"
																	class="accordion-toggle" data-toggle="collapse"
																	data-parent="#accordion" href="#collapseThree">Medication</a>
															</h3>
														</div>
														<div id="collapseThree" class="panel-collapse collapse">
															<div class="panel-body">
																<div class="coversheettables">
																	<table class="table home_table">
																		<thead>
																			<tr>
																				<th>#</th>
																				<th>Drug</th>
																				<th>Date</th>
																				<th>Status</th>
																			</tr>
																		</thead>
																		<tbody id="presTableCoverSheet">
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>

													<!--medication Seaction end
						                       @Author:Arpit 
						                  -->

												</div>
											</div>

											<!--vitals Section start
						                       @Author:Arpit 
						                  -->

											<div class="col-md-6">
												<div class="panel-group" id="accordion2">
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">
																<div class="pull-left">
																	<a class="accordion-toggle"
																		onclick="getVitalsAndValues()" data-toggle="collapse"
																		data-parent="#accordion2" href="#collapseFour">Vitals
																	</a>
																</div>
																<div class="pull-right">
																	<img src="ehat-design/img/icon7.png"> <img
																		src="ehat-design/img/icon6.png">
																</div>
															</h3>
															<div class="clearfix"></div>
														</div>
														<div id="collapseFour" class="panel-collapse collapse">
															<div class="panel-body">
																<div class="coversheettables">
																	<table class="table home_table">
																		<thead>
																			<tr>
																				<th>#</th>
																				<th>Particulars</th>
																				<th>Date</th>
																				<th>Value</th>
																			</tr>
																		</thead>
																		<tbody id="vitalcoversheet">

																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">
																<div class="pull-left">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion2" href="#collapseFive"
																		onclick="showMeasureMents()">Measurements </a>
																</div>
																<div class="pull-right">
																	<img src="ehat-design/img/icon7.png"> <img
																		src="ehat-design/img/icon6.png">
																</div>
															</h3>
															<div class="clearfix"></div>
														</div>
														<div id="collapseFive" class="panel-collapse collapse">
															<div class="panel-body">
																<div class="coversheettables">
																	<table class="table home_table">
																		<thead>
																			<tr>
																				<th>#</th>
																				<th>Weight</th>
																				<th>Height</th>
																				<th>BMI</th>
																				<th>BSA</th>
																				<th>Date</th>
																			</tr>
																		</thead>
																		<tbody id="coversheetmm">
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">
																<a class="accordion-toggle" onclick="getAllergies()"
																	data-toggle="collapse" data-parent="#accordion2"
																	href="#collapseSix">Allergies </a>
															</h3>
														</div>
														<div id="collapseSix" class="panel-collapse collapse">
															<div class="panel-body">
																<div class="coversheettables">
																	<table class="table home_table">
																		<thead>
																			<tr>
																				<th>#</th>
																				<th>Allergy</th>
																				<th>Date</th>
																				<th>Since(Days)</th>

																			</tr>
																		</thead>
																		<tbody id="coversheetallergy">
																		</tbody>
																	</table>
																</div>
															</div>



														</div>
													</div>
												</div>
											</div>

											<div class="modal" id="md1" tabindex="-1" role="dialog">
												<div class="modal-dialog" role="document">
													<div class="modal-content">
														<div class="modal-body">
															<div class="charts">
																<div class="col-md-4 charts-grids widget states-mdl">
																	<h4 class="title">vitals</h4>
																	<canvas id="canvas" width=100 height=100></canvas>
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<!-- <button type="button" class="btn btn-primary btn-xs"
												data-dismiss="modal" onclick="onSaveTemplate()">save</button> -->
															<button type="button" class="btn btn-primary"
																data-dismiss="modal">Close</button>
														</div>
													</div>
												</div>
											</div>

											<!--vitals Section end
		                    @Author:Arpit 
		               -->

											<div class="col-md-12" style="margin-top: 5px">
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3 class="panel-title tatail_Reccomandations">
															<a>Recommendation</a>
														</h3>
													</div>
													<div class="panel-body" style="height:278px;">
														<div class="tabbable tabs-left Reccomandations">
															<ul class="nav nav-tabs">
																<li class="active"><a href="#tab_3_1"
																	data-toggle="tab">Surgery Advice</a></li>
																<li><a href="#tab_3_2" data-toggle="tab"
																	onclick="fetchInstPatientWise()">General Advice</a></li>
																<li><a href="#tab_3_3" data-toggle="tab">Radiotherepy</a></li>
																<li><a href="#tab_3_4" data-toggle="tab">Chemotherepy</a></li>
															</ul>
															<div class="tab-content">
																<div class="tab-pane fade in active" id="tab_3_1">
																	<div class="coversheettables" style="max-height:250px;">
																		<table class="table home_table">
																			<thead>
																				<tr>
																					<th>#</th>
																					<th>Procedure Name</th>
																					<th>Recommended By</th>
																					<th>Date</th>
																				</tr>
																			</thead>
																			<tbody id="retab_sxadvice">

																			</tbody>
																		</table>
																	</div>
																</div>
																<div class="tab-pane fade" id="tab_3_2">
																	<div class="coversheettables">
																		<table class="table home_table">
																			<thead>
																				<tr>
																					<th>#</th>
																					<th>Instruction</th>
																					<th>Recomanded By</th>
																					<th>Date</th>
																				</tr>
																			</thead>
																			<tbody id="retab_instlist">

																			</tbody>
																		</table>
																	</div>
																</div>
																<div class="tab-pane fade" id="tab_3_3">
																	<div class=" table-responsive"
																		style="overflow: auto; height: 200px;">
																		<table class="table home_table">
																			<thead>
																				<tr>
																					<th>#</th>
																					<th>Recomandation</th>
																					<th>Recomanded By</th>
																					<th>Date</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td>1.</td>
																					<td>OPD</td>
																					<td>OPD</td>
																					<td>31/12/2019</td>
																				</tr>
																				<tr>
																					<td>2.</td>
																					<td>OPD</td>
																					<td>OPD</td>
																					<td>31/12/2019</td>
																				</tr>
																				<tr>
																					<td>3.</td>
																					<td>OPD</td>
																					<td>OPD</td>
																					<td>31/12/2019</td>
																				</tr>
																				<tr>
																					<td>4.</td>
																					<td>OPD</td>
																					<td>OPD</td>
																					<td>31/12/2019</td>
																				</tr>
																				<tr>
																					<td>5.</td>
																					<td>OPD</td>
																					<td>OPD</td>
																					<td>31/12/2019</td>
																				</tr>
																				<tr>
																					<td>6.</td>
																					<td>OPD</td>
																					<td>OPD</td>
																					<td>31/12/2019</td>
																				</tr>
																				<tr>
																					<td>7.</td>
																					<td>OPD</td>
																					<td>OPD</td>
																					<td>31/12/2019</td>
																				</tr>
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


										<div class="col-md-9   hiddenDiv" id="divHide"
											style="padding: 19px; display: none;">
											<!-- vitals start @Author : Arpit -->

											<div class="panel panel-default" id="upperheadrbody"
												style="background: white; color: #555555">
												<div class="panel-body">
													<div class="col-md-12">
														<b><div class="col-md-1 mb-1 " id="printDay"style="font-size:14px;margin-left:-16px;text-align:center;"></div></b>
														<label class="col-md-5 patHeader" style="margin-right:-3px;">Appointment with
															<b><label class="patHeader" id="previousapp"></label></b>
														</label> <label class="col-md-4 patHeader" style="margin-left:-67px;">Treatment No:&nbsp;<b><label class="patHeader" id="previousTreamentId"></label></b></label> <b><label
															class="col-md-3 patHeader text-warning" style="margin-left:-25px;">Follow
															Up:&nbsp;<label class="patHeader" id="followupdate"></label></label></b> <i class="fa fa-clock-o"
															style="font-size: 15px;" aria-hidden="true" onClick="followup()"></i>&nbsp;
														<a style="cursor:pointer" id="copyicon" data-toggle="modal" onclick="openclosemodal()"><i class="fa fa-copy" style="font-size: 15px;"
															aria-hidden="true"></i></a>&nbsp; <i
															class="fa fa-print" style="font-size: 15px;"
															aria-hidden="true"></i>&nbsp; <i
															class="fa fa-share" style="font-size: 15px;"
															aria-hidden="true" onClick="emailReportingTestPatient()"></i>&nbsp;&nbsp; 
															<a style="cursor:pointer" id="tempcpicon" data-toggle="modal" onclick="ongetDropdownsData()" data-target="#mdforcptemplate"><i class="fa fa-file" style="font-size: 15px;" aria-hidden="true"></i></a>													</div>													<!-- <div class="divide-10"></div> -->
													<div class="col-md-12">
														<b><div class="col-md-1 pull-left" id="printMonth" style="font-size:12px;margin-left:-16px;"></div></b>
														<label class="col-md-4 patHeader" id="previousAppTime"></label> <label
															class="col-md-4 patHeader" style="margin-left:-13px;">DOA:&nbsp;<b><label class="patHeader" id="previousDOA"></label></b> </label><b>&nbsp;&nbsp;<label
															class="col-md-3 patHeader  text-warning" id="followupDayTime" style="margin-left:-26px;">
															</label></b>													</div>

												</div>
											</div>

											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle cursorpointer"
															data-parent="#accordion2" onclick="showHideViatls()"><b>Vitals
																Signs &amp; Measurements</b><i
															class="fa fa-pencil pull-right" aria-hidden="true"></i></a>



													</h3>
												</div>
												<div id="collapseVitals">
													<div class="panel-body">
														<div class="panel-body">
															<ul class="nav nav-tabs" id="ulwithform">
																<li class="active patHeader"><a data-toggle="tab"
																	href="#vitalSigns1" onclick="setStringTabs('')"><b>Vital
																			Signs</b></a></li>
																<li><a data-toggle="tab" href="#measurements"
																	onclick="setStringTabs('second')" class="patHeader"><b>Measurements</b></a></li>
																<li class="pull-right">
																	<div class="btn-group" role="group"
																		aria-label="Third group">
																		<button class="btn btn-xs btn-danger"
																			onclick="onResetMeasurements()">Cancel</button>
																	</div>
																	<div class="btn-group" role="group"
																		aria-label="Third group">
																		<button type="button" class="btn btn-primary btn-xs"
																			onclick=" onSaveVitals('cepisode')">Submit</button>
																	</div>
																</li>
															</ul>
															<div class="modal" id="addVital" tabindex="-1"
																role="dialog">
																<div class="modal-dialog" role="document">
																	<div class="modal-content">

																		<div class="modal-body">

																			<table
																				class="table table-bordered table-responsive table-striped">
																				<thead>
																					<tr>
																						<th class="text-center">#</th>
																						<th class="text-center">Vitals</th>
																					</tr>
																				</thead>
																				<tbody id="fetchvitallist">

																				</tbody>
																			</table>
																		</div>
																		<div class="modal-footer">
																			<button type="button" class="btn btn-primary btn-xs"
																				data-dismiss="modal" onclick="selectInst()">save</button>
																			<button type="button" class="btn btn-secondary"
																				data-dismiss="modal">Close</button>
																		</div>
																	</div>
																</div>
															</div>
															<div class="tab-content">



																<div id="vitalSigns1" class="tab-pane fade in active">

																	<div class="divide-10" id="divideby10"></div>

																	<div class="form-group pull-right">
																		<button type="button" id="btnwithForm"
																			class="btn btn-primary btn-xs" onclick="fetchVital()"
																			data-toggle="modal" data-target="#addVital">+</button>
																	</div>
																	<form id="formId">


																		<div class="patHeader" id="VitalsList"></div>


																		<div class="patHeader" id="VitalsInfoList"></div>


																	</form>



																</div>
																<div id="measurements" class="tab-pane fade">
																	<br /> <br /> <input type="hidden" id="inputString"
																		value="second">
																	<form id="measurementsid">
																		<div class="form-group row">
																			<label for="inputPassword" class="col-sm-2 patHeader">Date</label>
																			<div class="col-sm-5">
																				<input type="text" value="<%=todays_date%>"
																					class="form-control span6 input-mini search-query"
																					placeholder="Date" name="date" readonly="readonly"
																					onclick="displayCalendar(document.getElementById('date'),'dd/mm/yyyy',this)"
																					id="date">
																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword" class="col-sm-2 patHeader">Weight</label>
																			<div class="col-sm-5">
																				<input type="text" id="wg" onkeyup="calculateBMI()"
																					onkeypress="return validateNumber(event)"
																					class="form-control" id="wg" placeholder="Weight">
																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword" class="col-sm-2 patHeader">Height</label>
																			<div class="col-sm-5">
																				<input type="text" id="height"
																					onkeyup="calculateBMI()" class="form-control"
																					onkeypress="return validateNumber(event)"
																					placeholder="Height">
																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword" class="col-sm-2 patHeader">Head
																				Cim</label>
																			<div class="col-sm-5">
																				<input type="text" class="form-control" id="hcim"
																					onkeypress="return validateNumber(event)"
																					placeholder="HCIM">
																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword" class="col-sm-2 patHeader">BMI</label>
																			<div class="col-sm-5">
																				<input type="text" class="form-control" id="bmi"
																					onkeypress="return validateNumber(event)"
																					placeholder="BMI">
																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword" class="col-sm-2 patHeader">BSA
																				(m2)</label>
																			<div class="col-sm-5">
																				<input type="text" class="form-control" id="bsa"
																					onkeypress="return validateNumber(event)"
																					placeholder="BSA">
																			</div>
																		</div>
																	</form>
																</div>
																<div class="col-md-12">&nbsp;</div>
																<div class="col-md-12" style="overflow: auto;">
																	<div id="vitalBodyS" class="tabledynamicscroll"></div>
																</div>
																<div id="borderredline" class="col-md-12"
																	style="border-top: 1px solid red;"></div>
																<div class="col-md-12">&nbsp;</div>
																<div class="col-md-12 tabledynamicscroll">

																	<table id="meaid"
																		class="table table-responsive table-bordered table-striped">
																		<thead>
																			<tr>
																				<th>#</th>
																				<th>Weight</th>
																				<th>Height</th>
																				<th>Date</th>
																				<th>BMI</th>
																				<th>BSA</th>
																				<th>Edit</th>
																				<th>Delete</th>
																			</tr>
																		</thead>
																		<tbody id="measurmentstreatmentwise">
																		</tbody>
																	</table>

																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- vitals end -->
											<!--@Author:Akshata Start  -->
											<!--Start History  -->
											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle cursorpointer"
															data-parent="#accordion2" onclick="onclickHistory()"><b>History</b><i
															class="fa fa-pencil pull-right" aria-hidden="true"></i></a>
													</h3>
												</div>
												<div id="collapseHistory">
													<div class="panel-body">
														<!-- panel-body start -->
														<!-- <form id="historyFromId"> -->
														<div class="form-row dynamicstructurescroll" id="formHistory"
															style="display: none">
															<div class="col-md-3" id="perosnalDiHide"
																style="display: none">&nbsp;</div>
															<div class="col-md-4 mb-3" id="formPersonalHistory">
																<label class="patHeader"
																	style="font-size: 10px !important;">Personal
																	History</label>
																<table id="tblForAutosuggestForHistory"
																	style="border: solid 1px #C7CBD5;">
																	<tr>
																		<td>
																			<div class="col-sm-12" id="documentByName20">
																				<input type="hidden" id="history20"> <input
																					type="text" id="20" class="form-control typeahead"
																					style="border: none; outline: none; width: 100%;"
																					placeholder="Personal History" size="70"
																					onkeyup="centerHistoryAutoSuggestion(this.id);" />
																			</div>
																		</td>
																	</tr>
																</table>
															</div>
															<div class="col-md-3" id="FamilyDiHide"
																style="display: none">&nbsp;</div>
															<div class="col-md-4 mb-3" id="formFamilyhistory">
																<label class="patHeader"
																	style="font-size: 10px !important;">Family
																	History</label>
																<table id="tblForAutosuggestForFamilyHistory"
																	style="border: solid 1px #C7CBD5;">
																	<tr>
																		<td>
																			<div class="col-sm-12" id="documentByName30">
																				<input type="hidden" id="familyhistoryid30">
																				<input type="text" id="familyhistory30"
																					class="form-control typeahead"
																					style="border: none; outline: none; width: 100%;"
																					placeholder="Family History" size="70"
																					onkeyup="centerFamilyHistoryAutoSuggestion(this.id);" />
																			</div>
																		</td>
																	</tr>
																</table>
															</div>
															<!-- <div class="col-md-12">&nbsp;</div> -->
															<div class="col-md-4 mb-9 pull-right" id="divEntry2">
																<div class="col-md-4 mb-9">&nbsp;</div>
																<div class="col-md-2 mb-3">&nbsp;</div>
																<!-- <button type="reset" class="btn btn-xs btn-danger "
									id="cancel" value="cancel" onclick="clearFamilyHistory();clearHistory()">Cancel</button> -->
																<button class="btn btn-primary btn-xs " name="submit"
																	id="submit" onclick="saveHistory();">Submit</button>

															</div>
														</div>
														<!--	</form> -->
														<hr></hr>
														<!-- panel-body end -->
													</div>
												</div>
											</div>
											<!--End History  -->
											<!--@Author:Akshata Start  -->
											<!--Complaints and Symptoms Start  -->
											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle cursorpointer"
															data-parent="#accordion2" onclick="onClickComplaints()"><b>Complaints
																& Symptoms</b><i class="fa fa-pencil pull-right"
															aria-hidden="true"></i></a>
													</h3>
												</div>
												<div id="collapseComplaints">
													<div class="panel-body">
														<!-- panel-body start -->

														<div class="form-row " id="formComplaints"
															style="display: none">
															
															<div class="col-md-12 dynamicstructurescroll" id="divForEntry"
																>
																<!-- <div class="col-md-4 mb-3" id="divForEntry"> -->
																<label for="inputPassword"
																	class="col-sm-3 col-form-label"> </label>
																<div class="col-sm-5 "
																	style="border: solid 1px #C7CBD5;">
																	<table id="tblForAutosuggest">
																		<tr>
																			<td>
																				<div class="col-sm-12" id="div0">
																					<input type="hidden" id="complaintid0"> <input
																						type="text" id="0" class="form-control typeahead"
																						style="border: none; outline: none; width: 100%;"
																						placeholder="Complaints" size="70"
																						onkeyup="centerComplaintAutoSuggestion(this.id);" />
																				</div>
																			</td>
																		</tr>
																	</table>
																</div>
																<div class="col-md-4 mb-9 pull-right" id="divEntry3">
																	<div class="col-md-4 mb-9">&nbsp;</div>
																	<div class="col-md-2 mb-3">&nbsp;</div>
																	<!-- <button type="reset" class="btn btn-xs btn-danger "
																		id="reset" value="reset" onclick="clearComplaint()">Cancel</button>  -->
																	<button class="btn btn-primary btn-xs " name="submit"
																		id="submit" onclick="saveComplaintMaster();">Submit</button>

																</div>
															</div>
															<hr></hr>
															<!-- panel-body end -->
														</div>
													</div>
												</div>
											</div>
											<!--Complaints and Symptoms End  -->
											<!--@Author:Akshata Desai  -->
											<!--Clinical Evaluation Start  -->
											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle cursorpointer"
															data-parent="#accordion2" onclick="onclickClinical()"><b>Clinical
																Evaluation</b><i class="fa fa-pencil pull-right"
															aria-hidden="true"></i></a>
													</h3>
												</div>
												<div id="collapseCilinic">
													<div class="panel-body">
														<!-- panel-body start -->

														<div class="form-row" id="formClinical"
															style="display: none">
															<div class="col-md-12 dynamicstructurescroll" id="divForEntry1"
																>
																<label for="inputPassword"
																	class="col-sm-3 col-form-label"> </label>
																<div class="col-sm-5 "
																	style="border: solid 1px #C7CBD5;">
																	<table id="tblForAutosuggestForClinical">
																		<tr>
																			<td>
																				<div class="col-sm-12" id="divBy10">
																					<input type="hidden" id="clinical10"> <input
																						type="text" id="10" class="form-control typeahead"
																						style="border: none; outline: none; width: 100%;"
																						placeholder="Clinical Evaluation" size="70"
																						onkeyup="centerClinicalEvolutionAutoSuggestion(this.id);" />
																				</div>
																			</td>
																		</tr>
																	</table>
																</div>
																<div class="col-md-4 mb-9 pull-right" id="divEntry1"
																>
																	<div class="col-md-4 mb-9">&nbsp;</div>
																	<div class="col-md-2 mb-3">&nbsp;</div>
																	<!-- <button type="reset" class="btn btn-xs btn-danger "
																		id="cancel" value="cancel">Cancel</button>  -->
																	<button class="btn btn-primary btn-xs " name="submit"
																		id="submit" onclick="saveClinical();">Submit</button>

																</div>
															</div>
														</div>
														<hr></hr>
														<!-- panel-body end -->
													</div>
												</div>
											</div>

											<!--Clinical Evaluation End  -->
											<!-- @Author :Arpit Gupta -->
											<!-- Diagonosys start -->

											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle cursorpointer"
															data-parent="#accordion2" onclick="resetDiagoForm()"><b>Diagnosis
														</b><i class="fa fa-pencil pull-right" aria-hidden="true"></i></a>
													</h3>
												</div>
												<div id="collapseDiago">

													<div class="panel-body">
														<!-- panel-body start -->

														<div class="form-row" id="diagosForm">
															<div class="col-md-4 mb-3" id="diagByName">
																<label>Diagnosis</label> <input type="text"
																	class="typeahead form-control form-control-sm"
																	onkeypress="getDiagoName(this.id,'diagoname');"
																	id="diagoname" placeholder="Diagnosis">
															</div>

															<div class="col-md-4 mb-3" id="diagBydesc">
																<label>Diagnosis &amp; Description</label> <input
																	type="text"
																	class="typeahead form-control form-control-sm"
																	id="diagodesc"
																	onkeypress="getDiagoName(this.id,'diagodesc');"
																	placeholder="Description">
															</div>

															<div class="col-md-4 mb-3" id="diagoByIcd10">
																<label>ICD10 Code</label> <input type="text"
																	onkeypress="getDiagoName(this.id,'diagoicd10');"
																	class="form-control" id="diagoicd10"
																	placeholder="ICD10 Code">
															</div>

															<div class="col-md-4 mb-3">
																<label>Date</label> <input type="text"
																	value="<%=todays_date%>"
																	class="form-control span6 input-mini search-query"
																	placeholder="Date" name="diagodate" readonly="readonly"
																	onclick="displayCalendar(document.getElementById('diagodate'),'dd/mm/yyyy',this)"
																	id="diagodate">
															</div>

															<div class="col-md-4 mb-3">
																<label>Diagnosis Type</label> <select
																	class="form-control" id="type">
																	<option value="0">--select type--</option>
																	<option>Provisional</option>
																	<option>Confirmed</option>
																</select>
															</div>

															<div class="col-md-4 mb-3">
																<label>Comments</label> <input type="text"
																	class="form-control" id="comments"
																	placeholder="comments">
															</div>

															<div class="col-md-12">&nbsp;</div>
															<div class="col-md-4 mb-3">
																<label>Search By</label> <label class="radio-inline">
																	<input type="radio" name="diago" value="1" checked>ICD10
																</label> <label class="radio-inline"> <input
																	type="radio" value="0" name="diago">ICDO
																</label>
															</div>

															<div class="col-md-4 mb-3">

																<button class="btn btn-success btn-xs"
																	onclick="onSaveDiagonsis()">Save</button>
															</div>
														</div>



														<div class="form-group col-md-12" style="overflow: auto;"
															id="tabledivDigo">
															<div class="col-md-2">
																<button class="btn btn-success btn-xs"
																	onclick="editDiagonosis()">
																	<i class="fa fa-edit"></i>
																</button>
																<button class="btn btn-danger btn-xs"
																	onclick="deleteDiagonosis()">
																	<i class="fa fa-trash-o"></i>
																</button>
															</div>
															<div class="col-md-12 tabledynamicscroll">
																<table
																	class="table table-bordered  table-responsive table-striped">
																	<thead>
																		<tr>
																			<th>#</th>
																			<th>Diagnosis</th>
																			<th>Description</th>
																			<th>Date</th>
																			<th>ICD10_code</th>
																			<th>Diagnosis Type</th>
																			<th>Comment</th>
																			<th>Action</th>
																		</tr>
																	</thead>
																	<tbody id="diagonoList">
																	</tbody>
																</table>
															</div>
														</div>

														<!-- panel-body end -->
													</div>



												</div>
											</div>
											<!-- Diagonosys end -->
											<!-- @Author :Arpit Gupta -->
											<!-- prescription start -->
											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle cursorpointer"
															data-parent="#accordion2" onclick="onResetPres()"><b>Prescription
														</b><i class="fa fa-pencil pull-right" aria-hidden="true"></i></a>
													</h3>
												</div>
												<div id="collapsePres" class="abcd">

													<div class="panel-body">
														<!-- panel-body start -->
														<div class="col-md-12">
															<ul style="list-style-type: none;" id="ulwithpreform">
																<li class="pull-right">

																	<div class="btn-group" role="group"
																		aria-label="Third group">
																		<button onclick="onResetPres()"
																			class="btn btn-xs btn-danger">Cancel</button>
																	</div>
																	<div class="btn-group" role="group"
																		aria-label="Third group">
																		<button type="button" class="btn btn-primary btn-xs"
																			onclick=" onSavePres()">Submit</button>
																	</div>
																</li>
															</ul>
														</div>
														<div id="drugresponse" style="display: none;"></div>
														<div id="formDivDrug">

															<div class="form-row">
																<div class="col-md-4 mb-3" id="drugByName">
																	<label>Drug Search</label> <input type="text"
																		class="typeahead form-control form-control-sm"
																		onkeypress="getDrugsName(this.id,'drugs');" id="drugs"
																		placeholder="Drug">
																</div>
															</div>

															<div class="col-md-4">
																<label>Dosage</label>
																<div class="form-inline">
																	<div class="form-group">
																		<div class="col-md-2">
																			<input type="text" id="mron" onkeyup="calculateQty()"
																				placeholder="M" class="form-control">
																		</div>
																		<div class="col-md-2">
																			<input type="text" onkeyup="calculateQty()" id="eve"
																				placeholder="E" class="form-control">
																		</div>
																		<div class="col-md-2">
																			<input type="text" onkeyup="calculateQty()"
																				id="after" placeholder="A" class="form-control">
																		</div>

																		<div class="col-md-2">
																			<input type="text" onkeyup="calculateQty()"
																				id="night" placeholder="N" class="form-control">
																		</div>

																		<label class="checkbox-inline text-warning">SOS
																			<input type="checkbox" id="sosflag">
																		</label>
																	</div>
																</div>

															</div>

															<div class="form-row">
																<div class="col-md-4 mb-3 form-group">
																	<label>Instruction</label> <select style="width: 100%;"
																		id="instruction"></select>
																</div>



																<div class="col-md-4 mb-3 form-group">
																	<label>Route</label> <select style="width: 100%;"
																		id="route">
																	</select>
																</div>


																<div class="col-md-4 mb-3">
																	<label>Duration (Days)</label> <input type="text"
																		placeholder="Duration" onkeyup="calculateQty()"
																		id="duration" class="form-control form-control-sm">

																</div>
																<div class="col-md-4 mb-3">
																	<label>Quantity (Duration*Days)</label> <input
																		type="text" disabled placeholder="Quantity" id="qty"
																		class="form-control form-control-sm">

																</div>
															</div>
														</div>
														<div class="col-md-12">&nbsp;</div>
														<div class="col-md-12 tabledynamicscroll" id="drugTable">
															<table
																class="table table-responsive table-bordered table-striped">
																<thead>
																	<tr>
																		<th>#</th>
																		<th>DRUG</th>
																		<th>Dosage &amp; Frequency</th>
																		<th>Duration (Days)</th>
																		<th>Instruction</th>
																		<th>Edit</th>
																		<th>Delete</th>
																	</tr>
																</thead>
																<tbody id="presTable">
																</tbody>
															</table>
														</div>

														<!-- panel-body end -->
													</div>



												</div>
											</div>
											<!-- prescription end --
							
						
						
						
						<!-- sx-advice start -->

											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle cursorpointer"
															data-parent="#accordion2" onclick="onResetsxfrom()"><b>Surgery
																Advice </b><i class="fa fa-pencil pull-right"
															aria-hidden="true"></i></a>
													</h3>
												</div>
												<div id="collapseSxAdvice">

													<div class="panel-body">
														<!-- panel-body start -->

														<div class="form-row" id="sxform" style="display: none;">
															<div class="col-md-4 mb-3 form-group" id="sxAdviceByName">
																<label>Procedure Name</label> <input type="hidden"
																	value="0" id="sxpronameid"> <input type="text"
																	class="typeahead form-control form-control-sm"
																	onkeypress="proAutoSuggestion(this.id,'sxadvice');"
																	id="sxproname" placeholder="procedure name">
															</div>

															<div class="col-md-4 mb-3 form-group">
																<label>Procedure Type</label> <select id="ddprotype"
																	style="width: 100%">
																	<option value="0">--select Name--</option>
																</select>
															</div>

															<div class="col-md-4 mb-3 form-group">
																<label>Procedure Group</label> <select id="ddprogrp"
																	style="width: 100%">
																	<option value="0">--select group--</option>
																</select>
															</div>

															<div class="col-md-4 mb-3 form-group">
																<label>Surgical Advice</label><br /> <label
																	class="checkbox-inline"> <input type="checkbox"
																	value="1" id="rdical" onclick="getcheckboxvalue()">Radical
																</label> <label class="checkbox-inline"> <input
																	type="checkbox" id="palletive" value="2"
																	onclick="getcheckboxvalue()">Palliative
																</label>
															</div>


															<div class="col-md-4 mb-3 form-group">
																<label>Advice Date</label> <input type="text"
																	value="<%=todays_date%>"
																	class="form-control span6 input-mini search-query"
																	placeholder="Date" name="sxdate" readonly="readonly"
																	onclick="displayCalendar(document.getElementById('sxadvdate'),'dd/mm/yyyy',this)"
																	id="sxadvdate">
															</div>

															<div class="col-md-4 mb-3 form-group">
																<label>Procedure Date</label> <input type="text"
																	class="form-control span6 input-mini search-query"
																	placeholder="Date" name="ddprocdate"
																	readonly="readonly"
																	onclick="displayCalendar(document.getElementById('ddprocdate'),'dd/mm/yyyy',this)"
																	id="ddprocdate">
															</div>

															<div class="col-md-4 mb-3 form-group">
																<label for="note">Note:</label>
																<textarea class="form-control" rows="3"
																	id="notesxadvice" style="resize: none;"></textarea>
															</div>

															<div class="col-md-4 mb-3 form-group">
																<label for="note">Risk Factor:</label>
																<textarea class="form-control" rows="3"
																	id="sxriskfactor" style="resize: none;"></textarea>
															</div>



															<div class="col-md-4 mb-3">
																<div class="divide-20"></div>
																<div class="divide-20"></div>

																<button class="btn btn-success btn-xs"
																	onclick="onSaveSxAdvice()">Save</button>
															</div>
														</div>



														<div class="form-group col-md-12 tabledynamicscroll"
															id="tabledivsxfrom">

															<table
																class="table table-bordered  table-responsive table-striped">
																<thead>
																	<tr>
																		<th>#</th>
																		<th>Procedure Name</th>
																		<th>Group</th>
																		<th>Type</th>
																		<th>Advice Date</th>
																		<th>Procedure Date</th>
																		<th>Edit</th>
																		<th>Delete</th>
																	</tr>
																</thead>
																<tbody id="sxlist">
																</tbody>
															</table>
														</div>

														<!-- panel-body end -->
													</div>



												</div>
											</div>
											<!-- sx-advice end -->



											<!--@Author:Akshata Desai  -->
											<!--Service Advised Start  -->
											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a style="text-decoration: none; font-size: 11px;"
															class="accordion-toggle " data-parent="#accordion2"
															onclick="onclickServiceAdvice()" href="#collapseService"><b>Service
																Advised </b><i class="fa fa-pencil pull-right"
															aria-hidden="true"></i></a>
													</h3>
												</div>
												<div id="collapseService">

													<div class="panel-body">
														<div class="tab-content">
															<div id="service_advised" class="tab-pane fade in active">
																<br /> <br />
																<form>
																	<div class="col-md-12" id="divForEntry3"
																		style="display: none">
																		<div class="form-group row">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label">Service Name</label>
																			<div class="col-sm-5"
																				style="border: 2px solid #C7CBD5;">
																				<input class="form-control typeahead sss"
																					style="border: none; outline: none;"
																					title="Please enter notes" id="txtautoserviceName"
																					type="text" placeholder="Service Name"
																					onkeyup="setallservautocomplete(this.id)" />

																			</div>

																		</div>
																		<div class="form-group row">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label"> </label>
																			<div
																				class="col-sm-5 select2-container select2-container-multi"
																				style="border: 2px solid #C7CBD5;">
																				<ul id="dynamicItem" class="select2-choices"
																					style="overflow-y: scroll;"></ul>
																				<!-- <input class="form-control typeahead sss"
																		style="border: none; outline: none;"
																		title=" " id="cvs" type="text"
																		placeholder=" " /> -->
																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label">Urgent</label>
																			<div class="col-sm-5">
																				<input id="cpoeUrgent" type="checkbox" />
																			</div>
																			<div class="col-sm-3" id="cpoesndtolabdiv"
																				style="display: none">
																				<label for="inputPassword"
																					class="col-sm-6 col-form-label">Send To Lab</label>
																				<div class="col-sm-5">
																					<input id="cpoesndtolab" type="checkbox"
																						name="cpoesndtolab" />
																				</div>
																			</div>
																			<div class="col-sm-3" id="cpoeSendToRisdiv"
																				style="display: none">
																				<label for="inputPassword"
																					class="col-sm-6 col-form-label">Send To RIS</label>
																				<div class="col-sm-5">
																					<input id="cpoeSendToRis" type="checkbox"
																						name="cpoeSendToRis" />
																				</div>
																			</div>
																			<div class="col-sm-3" id="cpoeSendToRaddiv"
																				style="display: none">
																				<label for="inputPassword"
																					class="col-sm-6 col-form-label">Send To
																					Radiation</label>
																				<div class="col-sm-5">
																					<input id="cpoeSendToRad" type="checkbox"
																						name="cpoeSendToRad" />
																				</div>
																			</div>
																		</div>
																		<div class="form-group row" style="display: none">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label">Doctor</label>
																			<div class="col-sm-5"
																				style="border: 2px solid #C7CBD5;">
																				<select onchange="fetchDoctor();"
																					class="form-control typeahead sss"
																					style="border: nimmunizationChartsone; outline: none;"
																					title="Please enter doctor" id="doctorDetails">
																				</select>
																			</div>
																		</div>
																		<div class="form-group row" style="display: none">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label">Hospital</label>
																			<div class="col-sm-5"
																				style="border: 2px solid #C7CBD5;">
																				<select class="form-control typeahead sss"
																					style="border: none; outline: none;"
																					title="Select Hospital" id="hospitalId">
																					<option value="0">Select</option>
																				</select>
																			</div>
																		</div>
																		<div class="form-group row" style="display: none">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label">Unit</label>
																			<div class="col-sm-5"
																				style="border: 2px solid #C7CBD5;">
																				<select onchange="fetchUnit();"
																					class="form-control typeahead sss"
																					style="border: none; outline: none;"
																					title="select unit" id="uId"></select>

																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="exampleInputEmail1"
																				class="col-sm-3 col-form-label">charges</label>
																			<div class="col-sm-5"
																				style="border: 2px solid #C7CBD5;">
																				<input class="form-control typeahead "
																					readonly="readonly"
																					style="border: none; outline: none;"
																					title="Please enter charges" id="chargesubservice"
																					type="text" placeholder="charges"
																					onchange="setHiddenFieldOpdDokDesk(this.value),calculateEmerChrForDocDesskOpd()" />
																				<input type="hidden" value="" id="cpoeCharges2">
																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label">Instructions</label>
																			<div class="col-sm-5"
																				style="border: 2px solid #C7CBD5;">
																				<input class="form-control typeahead sss"
																					style="border: none; outline: none;"
																					title="Please enter instructions" id="instruction"
																					type="text" placeholder="instructions" />

																			</div>
																		</div>
																		<div class="form-group row">
																			<label for="inputPassword"
																				class="col-sm-3 col-form-label">Clinical
																				Notes</label>
																			<div class="col-sm-5"
																				style="border: 2px solid #C7CBD5;">
																				<input class="form-control typeahead sss"
																					style="border: none; outline: none;"
																					title="Please enter notes" id="clinicalNotes"
																					type="text" placeholder="notes" />

																			</div>
																		</div>
																		<li class="pull-right">
																			<div class="btn-group" role="group"
																				aria-label="Third group">
																				<button type="reset" class="btn btn-xs btn-danger"
																					value="cancel" onclick="refreshService()">Cancel</button>
																			</div>
																			<div class="btn-group" role="group"
																				aria-label="Third group">
																				<button type="button" class="btn btn-primary btn-xs"
																					onclick="saveCpoe('DoctorStation')">Submit</button>
																			</div>
																		</li>

																	</div>
																	<div class="col-md-12">
																		<div class="tabbable header-tabs">
																			<div class="row" style="margin-top: 5px">
																				<div class="col-md-12">
																					<div class="col-sm-12">
																						<div class="pull-right">
																							<div id="datatable1_filter"
																								class="dataTables_filter">
																								<label id="searchlabel"> </label>
																							</div>
																						</div>
																					</div>
																					<div class="panel-body tabledynamicscroll">
																						<table
																							class="table table-bordered  table-responsive table-striped ">
																							<thead>
																								<tr>
																									<th>#</th>
																									<th>Particulars</th>
																									<th>Date</th>
																									<th>Type</th>
																									<th>Status</th>
																									<th>Edit</th>
																									<th>Delete</th>
																									<!-- <th>Action</th> -->
																								</tr>
																							</thead>


																							<tbody id="tcpoeservices">
																							</tbody>
																						</table>
																						<input id="CPOErowCount" type="hidden" value="0">

																						<!-- <div id="flip-scroll" class="col-sm-12-1">
																				
																				<table
																					class="table table-striped table-condensed">
																					<tbody id="tcpoeservices">
		
																					</tbody>
																				</table>
																				<input id="CPOErowCount" type="hidden" value="0">
																			</div> -->
																					</div>

																				</div>
																			</div>
																		</div>
																	</div>
																</form>
															</div>
														</div>
													</div>



												</div>
											</div>
											<!--Service Advised End  -->
											<!-- @Author :Navnath Erande -->
											<!-- Instruction start -->
											<div class="panel panel-default">
												<div class="panel-heading">
													<h3 class="panel-title">
														<a
															style="text-decoration: none; cursor: pointer; font-size: 11px;"
															class="accordion-toggle " data-parent="#accordion2"
															onclick="toggleEntryDivInstruction()"><b>Instruction
														</b><i class="fa fa-pencil pull-right" aria-hidden="true"></i></a>
													</h3>
												</div>

												<div id="ddinstruction">

													<div class="panel-body">
														<!-- panel-body start -->
														<div id="ddInstructionButton" class="col-md-12">
															<!-- <button class="btn btn-xs btn-danger pull-right"
													onclick="saveInstructionDD();">Cancel</button> -->
															<button class="btn btn-primary btn-xs pull-right"
																onclick="saveInstructionDD();">Submit</button>
														</div>
														<div class="col-md-12">
															<div class="col-md-6">
																<div
																	class="custom-control custom-radio custom-control-inline ">
																	<input type="radio" class="custom-control-input"
																		id="instructionradio1"
																		name="inlineDefaultRadiosExample" checked="checked">
																	<label class="custom-control-label"
																		for="defaultInline2">Instruction</label>
																</div>
																<!-- 
													<input type="radio" id="instructionradio1"
														name="gender" value="male" checked> <label
														for="male">Instruction</label> -->
															</div>
															<div class="col-md-6">
																<div
																	class="custom-control custom-radio custom-control-inline">
																	<input type="radio" class="custom-control-input"
																		id="instructionradio2"
																		name="inlineDefaultRadiosExample"> <label
																		class="custom-control-label" for="defaultInline2">Template</label>
																</div>


																<!-- <input type="radio" id="instructionradio2"
														name="gender" value="male"> <label for="male">Template</label>
											 -->
															</div>
														</div>
														<div class="col-md-12">
															<div class="col-sm-12 " id="divinstruction"
																style="height: 100px; overflow: auto;">
																<table id="instructiontable">
																	<tr>
																		<td>
																			<div class="col-sm-12" id="divinstructionname0">
																				<input type="hidden" id="instructionid0"> <input
																					type="text" id="instructionname0"
																					class="form-control typeahead"
																					style="border: none; outline: none; width: 100%;"
																					placeholder="Instruction" size="70"
																					onkeyup="fetchGroupInstructionMasterAutosuggestion(this.id);" />
																			</div>
																		</td>
																	</tr>

																</table>
															</div>
														</div>
													</div>

												</div>
											</div>

											<!-- Instruction end -->

										</div>

										<div class="col-md-3" style="padding-left: 6px">
											<!-- <div class="right-wapper"> -->
											<div class="tabbable right_tab">
												<ul class="nav nav-tabs">
													<li class="active patHeader"><a href="#tab_1_8"
														data-toggle="tab">Navigation</a></li>
													<li><a href="#tab_1_9" data-toggle="tab"
														class="patHeader">Notes</a></li>
												</ul>
												<div class="tab-content">
													<div class="tab-pane fade in active" id="tab_1_8">
														<div class="divide-10"></div>
														<div class="form-group">
															<select class="form-control" id="front_page_specialty">
																<option value="0">SPECIALITY</option>
															
															</select>
														</div>
														<div class="clearfix"></div>
														<button type="button" style="font-size: 10px;"
															class="btn btn-default btn-block" data-target="#access_template" data-toggle="modal" onclick="ongetAccessdropdowndata()">Access
															Template</button>
														<div class="clearfix"></div>
														<div class="space"></div>
														<button type="button" class="btn btn-default  "
															style="margin-right: 5px; margin-bottom: 0px;"
															onclick="getAllergyType('alergypopup')"
															data-toggle="modal" data-target="#md2">Allergy</button>
<!-- 														<button type="button" class="btn btn-default" onclick="fetchStandardAndPatientBMIDetails('ALL');">Charts</button> -->
														<button class="btn btn-default" id="GrowthChartButton" onclick="fetchStandardAndPatientBMIDetails('ALL');" data-toggle="modal" data-target="#GrowthChartButtonPopup">Growth Chart</button>
														<div class="clearfix"></div>
														<div class="space"></div>
														<button type="button" onclick=" immunizationCharts();"
															class="btn btn-default btn-block">Immunization
															Schedule</button>
														<div class="clearfix"></div>
														<div class="space"></div>
														<button type="button" class="btn btn-default btn-block"
															onclick="ddformulapopup();">Formulae</button>
														<div class="clearfix"></div>
														<div class="space"></div>
														<div class="btn-group" id="emrstatus"
															data-toggle="buttons">
															<label>Emergency / High Risk</label>
															<div class="clearfix"></div>
															<label class="btn btn-default btn-on" id="onemrhighrisk">
																<input type="radio" value="1" name="risk"
																checked="checked" class="risk"
																onchange="updateEmrHighResk(this)"> ON
															</label> <label class="btn btn-default btn-off active"
																id="offemrhighrisk"> <input type="radio"
																value="0" class="risk" name="risk"
																onchange="updateEmrHighResk(this)"> OFF
															</label>
														</div>
														<div class="clearfix"></div>
														<div class="space"></div>

														<div class="btn-group" data-toggle="buttons">
															<label>Seropositive</label>
															<div class="clearfix"></div>
															<label class="btn btn-default btn-on" id="onseropositive">
																<input type="radio" value="1" name="risk1"
																checked="checked" class="risk"
																onchange="updateSeropositive(this)"> ON
															</label> <label id="offseropostive"
																class="btn btn-default btn-off active"> <input
																type="radio" value="0" class="risk" name="risk1"
																onchange="updateSeropositive(this)"> OFF
															</label>
														</div>
														<div class="space"></div>
														<hr></hr>

														<p style="font-size: 11px;">
															<b>Cancer Treatment</b>
														</p>

														<div class="clearfix"></div>
														<button type="button" class="btn btn-default btn-block">Chemotherapy</button>
														<div class="clearfix"></div>
														<div class="space"></div>
														<button type="button" class="btn btn-default btn-block">Radiation
															Therapy</button>
														<div class="clearfix"></div>
														<div class="space"></div>
														<button type="button" class="btn btn-default btn-block">Plan
															of Treatment</button>
														<!--On off js-->
														<script src="ehat-design/js/jquery-1.11.1.min.js"></script>
													</div>
													<div class="tab-pane fade" id="tab_1_9">
														<div class="divide-10"></div>
														<button type="button" class="btn btn-default"
															style="border: solid 1px #C7CBD5;"
															data-target="#ViewNotesPopDetails" data-toggle="modal"
															id="viewBMI">
															<!-- onclick="viewBMIDetailsFromDoctorDesk('onclick');"  -->
															Add Notes
														</button>
														<div class="divide-10"></div>
														<div class="divide-10">

															<table class="table home_table">
																<thead>
																	<tr>
																		<th>Date</th>
																		<th>Notes</th>
																		<th>View</th>
																	</tr>
																</thead>


																<tbody id="tblForNotes">
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
											<!-- </div> -->
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--Start Notes PopUp  -->
						<div id="ViewNotesPopDetails" class="modal fade in" tabindex="-1"
							role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content col-md-10">
									<div class="modal-body">
										<div class="col-md-3-1 pull-right" style="margin-top: 5px;">
											<input type="text" value=""
												class="form-control span6 input-mini search-query"
												placeholder="Date" name="notesdate" readonly="readonly"
												onclick="displayCalendar(document.getElementById('notesdate'),'dd/mm/yyyy',this)"
												id="notesdate">
										</div>
										<div class="modal-header" style="padding-top: 3%;">
											<div class="col-md-10-1">
												<div class="col-md-2-1">
													<label class="TextFont">Notesate </label>
													<!-- <div class="col-md-12-1" style="margin-top: 10px;">
				<input type="text" id="autonotes" class="form-control input-SmallText col-md-9-1"
					  name="AutoNotes" readonly="readonly" ></textarea>
			</div> -->
												</div>
												<div class="col-md-2-1">
													<!-- <label class="TextFont">Notes
			</label> -->
													<div class="col-md-12-1" style="margin-top: 10px;">
														<textarea id="notesData"
															class="form-control input-SmallText col-md-9-1"
															placeholder="Type here" name="notesData"></textarea>
													</div>
												</div>
											</div>
											<div>
												<div class="clearfix"></div>
												<div class="space"></div>
												<div class="col-md-1-1"
													style="margin-top: 0px; line-height: 1.2">
													<button class="btn btn-xs btn-success editUserAccess"
														onclick="saveNotes();" disabled="disabled">
														<i class="fa fa-save"></i>&nbsp;Save
													</button>
													<button class="btn btn-xs btn-danger coversheetBtn cls"
														type="button" style="margin-top: 0px;"
														data-dismiss="modal">
														<i class="fa fa-arrows"></i> Close
													</button>
													<!-- <button onclick="refreshNotes();" title=""
										data-placement="left" data-toggle="tooltip"
										class="btn btn-xs btn-danger"
										data-original-title="Refresh">
										<i class="fa fa-refresh"></i>Refresh
									</button> -->
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--End NotesPopup  -->
						<!--Notes View Model Start  -->
						<div id="Notes_view" class="modal fade in" tabindex="-1">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<div class="box-title">
											<h4>
												<i class="fa fa-calendar"></i>Notes

												<button data-dismiss="modal" class="btn btn-default"
													type="button">Close</button>


											</h4>

										</div>
									</div>
									<div class="modal-body">
										<div style="overflow: auto;">
											<table class="table home_table">
												<thead>
													<tr>
														<!-- <th>Sr.No</th> -->
														<th class="col-md-1 center">Date</th>
														<th class="col-md-1 center">Notes</th>
														<th class="col-md-1 center">Edit</th>
														<th class="col-md-1 center">Delete</th>
													</tr>
												</thead>
												<tbody id="tblviewNotes">
												</tbody>
											</table>
										</div>
									</div>

									<!-- /BODY-->
									<div class="modal-footer"></div>
								</div>
							</div>
						</div>
						<!--Notes View model End  -->

						<!-- modal start -->
						<div class="modal" id="md2" role="dialog">
							<div class="modal-dialog modal-lg" role="document"
								style="width: 912px;">
								<div class="modal-content">
									<div class="modal-header">
										<!-- <button class="btn btn-xs btn-info pull-right" type="button"
							onclick="showHideAlF()">
							<i class="fa fa-plus"></i>
						</button> -->
										<h4 class="modal-title">
											<b>Allergy</b>
										</h4>
									</div>
									<div class="modal-body">

										<div class="form-row">
											<div class="form-group col-md-3">
												<label for="inputEmail4">Allergy Name</label> <input
													type="email" class="form-control" id="alname"
													placeholder="Allergy Name">
											</div>
											<div class="form-group col-md-3">
												<label>Allergy Type</label> <select class="select2"
													style="width: 100%;" id="altype"></select>
											</div>
											<div class="form-group col-md-3">
												<label for="">Allergy Reaction</label> <select
													class="select2" style="width: 100%;" id="alReaction"></select>
											</div>
											<div class="form-group col-md-3">
												<label for="inputPassword4">First Observed Date</label> <input
													type="text" value=""
													class="form-control span6 input-mini search-query"
													placeholder="Date" name="date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('aldate'),'dd/mm/yyyy',this)"
													id="aldate">
											</div>
											<div class="form-group col-md-3">
												<label>Notes</label> <input type="text" class="form-control"
													id="notespopup" placeholder="Notes">
											</div>
										</div>


										<div class="col-md-12">&nbsp;</div>

										<div class="col-md-12">
											<div class="col-md-2">
												<button class="btn btn-success btn-xs"
													onclick="editAlpopup()">
													<i class="fa fa-edit"></i>
												</button>
												<button class="btn btn-danger btn-xs"
													onclick="deleteAlpopup()">
													<i class="fa fa-trash-o"></i>
												</button>
											</div>
											<div class="col-md-12 tabledynamicscroll">
												<table
													class="table table-responsive table-bordered table-striped">
													<thead>
														<tr>
															<th>#</th>
															<th>Allergy Name</th>
															<th>Allergy Type</th>
															<th>Allergy Reaction</th>
															<th>Date</th>
															<th>Notes</th>

														</tr>
													</thead>
													<tbody id="allPopupList"></tbody>
												</table>
											</div>
										</div>


									</div>
									<div class="col-md-12">&nbsp;</div>
									<div class="modal-footer" style="border: none !important;">
										<button type="button" class="btn btn-primary btn-sm"
											onclick="onSaveAlergyonPopup()">save</button>
										<button type="button" class="btn btn-primary btn-sm"
											data-dismiss="modal" onclick="onRestAlergy()">Close</button>
									</div>
								</div>
							</div>
						</div>

						<!-- modal end -->

						<div class="modal" id="md3" role="dialog">
							<div class="modal-dialog modal-lg" role="document"
								style="width: 912px;">
								<div class="modal-content">
									<div class="modal-header">
										<a class="pull-right" data-dismiss="modal"> <i
											style="font-size: 20px" class="fa">&#xf00d;</i>
										</a>
										<h4 class="modal-title">
											<b>Preview</b>
										</h4>
									</div>
									<div class="modal-body" style="height: 300px;">
										<div class="col-md-3">&nbsp;</div>
										<div class="col-md-8 price_block" style="height: 265px;">
											<iframe id="preview"
												style="width: 100%; height: 100%; border: none;"
												src="file:///C:/DMS/Registration/healing.jpg"> </iframe>

										</div>


										<div class="col-md-12">&nbsp;</div>



									</div>
									<div class="modal-footer">

										<button type="button" class="btn btn-primary btn-sm"
											data-dismiss="modal" onclick="cleariframe()">Close</button>
									</div>
								</div>
							</div>
						</div>

						<!-- treatment modal start -->


						<div class="modal" id="mdfortreatment" role="dialog">
							<div class="modal-dialog modal-lg " role="document"
								style="width: 50%;">
								<div class="modal-content">
									<div class="modal-header">
										<a class="pull-right" data-dismiss="modal"> <i
											style="font-size: 24px" class="fa">&#xf00d;</i>
										</a>
										<h4 class="modal-title patHeader">
											<b>Treatments</b>
										</h4>
									</div>
									<div class="modal-body" style="height: 300px;">
										<div class="col-md-3">&nbsp;</div>
										<div class="col-md-12" style="overflow: auto; height: 500px;">
											<table class="table home_table">
												<thead>
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Date</th>
														<th class="col-md-1 center">Dept</th>
														<th colspan="3" class="col-md-1 center">Action</th>
													</tr>
												</thead>
												<tbody id="treatmentListforpopup">


												</tbody>
											</table>
										</div>

										<div class="col-md-12">&nbsp;</div>



									</div>

								</div>
							</div>
						</div>

						<!-- treatment modal end -->


<!-- Template Modal Start -->



<div class="modal" id="mdforcptemplate" role="dialog">
							<div class="modal-dialog modal-lg" role="document"
								style="width: 48%;">
								<div class="modal-content">
									<div class="modal-header">
									
										<h4 class="modal-title">
											<b>Template</b>
										</h4>
									</div>
									<div class="modal-body">

									<div class="form-row">
										
										<div class="form-group col-md-4">
												<label>Speciality</label> <select class="select2"
													style="width: 100%;" id="docspeciality"></select>
											</div>
											
											
											<div class="form-group col-md-4">
												<label>Body Part</label> <select class="select2"
													style="width: 100%;" id="cporgans"></select>
											</div>
											
											
										
											<div class="form-group col-md-4">
												<label for="inputEmail4">Template Name</label> <input
													type="email" class="form-control" id="cptempname"
													placeholder="Template Name">
											</div>
											
											
											<div class="form-group col-md-4">
											<br/>
												<label class="checkbox-inline">
				      <input type="checkbox" id="favflag" value="0"><b>Favourite</b>
				    </label>
											</div>
											
											
											<div class="form-group col-md-4">
										<br/>
											<label class="radio-inline">
      <input type="radio" name="ceptype" value="1" id="overall" checked><b>Overall</b>
    </label><label class="radio-inline">
      <input type="radio" name="ceptype" value="2" id="medication"><b>Medication</b>
    </label>
											</div>
											
											
										</div>


										<div class="col-md-12">&nbsp;</div>

										<div class="col-md-12 tabledynamicscroll">
												<table
													class="table table-responsive table-bordered table-striped">
													<thead>
														<tr>
															<th>#</th>
															<th>Template Name</th>
															<th>Speciality</th>
															<th>Body Part</th>
															<th>Edit</th>
															<th>Delete</th>

														</tr>
													</thead>
													<tbody id="popup_template_body"></tbody>
												</table>
											</div>


									</div>
									<div class="col-md-12">&nbsp;</div>
									<div class="modal-footer" style="border: none !important;margin-top:17%;">
										<button type="button" class="btn btn-primary btn-xs"
											onclick="savecepTemplate()">save</button>
										<button type="button" class="btn btn-primary btn-xs"
											data-dismiss="modal" onclick="onresetTemplatemaster()">Close</button>
									</div>
								</div>
							</div>
						</div>
<!-- Template Modal end -->


						<!-- /INLINE TABS -->

						<!-- /Start Popup page Formula -->
						<!-- /Popup page charts -->

						<div id="formulapopupdiv" style="width: 100%;"
							class="modal fade in"></div>

						<!-- /end Popup page Formula -->

						<!-- /Popup page charts -->
						<div id="ddchart" class="modal fade in">
							<div class="modal-dialog" style="width: 100%; margin-top: 10%;">
								<div class="modal-content">
									<div class="col-md-12">
										<div class="col-md-6">
											<h2>Vaccination Chart</h2>
										</div>
										<div class="col-md-6  pull-right">
											<div class="col-md-10"></div>
											<div class="col-md-1 " style="margin-top: 1%;">
												<button class="btn btn-xs btn-success"
													onclick="saveImmunizationPatient();">
													<i class="fa fa-save"></i> Save
												</button>
											</div>
											<div class="col-md-1" style="margin-top: 1%;">

												<button class="btn btn-xs btn-danger cls coversheetBtn "
													onclick="closeImmunizationCharts();" data-dismiss="modal"
													type="button">
													<i class="fa fa-arrows"></i> Close
												</button>
											</div>
										</div>
									</div>



									<div class="panel-body" style="overflow: auto; height: 300px">
										<table id="fixed_header"
											class="table table-striped table-bordered"
											style="overflow: auto;">
											<thead id="ehatTHead" class="fixedheaderdemo">
												<tr>
													<th class="col-md-1 center">#</th>
													<th class="col-md-1 center">Age</th>
													<th class="col-md-2 center">Vaccine Name</th>
													<th class="col-md-1 center">From Date</th>
													<th class="col-md-1 center">TO Date</th>
													<th class="col-md-2 center">Due Date</th>
													<th class="col-md-2 center">Given Date</th>
													<th class="col-md-2 center">Vaccine status</th>

												</tr>
											</thead>
											<tbody id="setfetchimmunizationconfigcharts">
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<!-- /Popup page charts end-->

						<!--<div class="footer-tools"> <span class="go-top"> <i class="fa fa-chevron-up"></i> Top </span> </div>-->
					</div>
					<!-- /CONTENT-->

				</div>


				<div id="GrowthChartButtonPopup" class="modal fade in" style="width: 100%">
					<div class="modal-dialog col-md-12-1" style="margin-top: 1%; width:100%">
						<div class="modal-content" class="col-md-12-1"
							style="height: 637px;">
							<div class="tabbable col-md-12-1"
								style="margin: 0px; padding: 10px;">
								<ul class="nav nav-tabs" style="background-color: lightblue;">
									<li id="HEIGHT_WEIGHT_HEADCIM_LI_ID" class="active"><a
										data-toggle="tab" href="#HEIGHT_WEIGHT_HEADCIM"><span
											class="hidden-inline-mobile">HEIGHT WEIGHT HEADCIM
												(Less than 5 years) </span></a></li>
									<li id="HEIGHT_WEIGHT_BMI_GreaterThanFiveYears_LI_ID"
										class="active"><a data-toggle="tab"
										href="#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears"
										onclick="fetchStandardAndPatientBMIDetailsUtilGreaterThanFiveYears('ALL');"><span
											class="hidden-inline-mobile">HEIGHT WEIGHT BMI
												(Greater than 5 years upto 18 years) </span></a></li>
								</ul>
								<div class="tab-content">
									<div id="HEIGHT_WEIGHT_HEADCIM" class="tab-pane fade in active">
									<div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-danger cls"
												data-dismiss="modal" type="button">
												<i class="fa fa-arrows"></i> Close
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-primary" disabled="disabled"
												id="BTN_PRINT_HEIGHT_CHART" onclick="printCharts('HEIGHT_GROWTH_CHART_DIV');">
												<i class="fa fa-print"></i> Print Height
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-primary" disabled="disabled"
												id="BTN_PRINT_WEIGHT_CHART" onclick="printCharts('WEIGHT_GROWTH_CHART_DIV');">
												<i class="fa fa-print"></i> Print Weight
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-primary" disabled="disabled"
												id="BTN_PRINT_HEAD_CHART" onclick="printCharts('HEAD_GROWTH_CHART_DIV');">
												<i class="fa fa-print"></i> Print Headcim
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-info" disabled="disabled"
												id="BTN_PRINT_ALL_CHARTS" onclick="printCharts('PRINT_ALL');">
												<i class="fa fa-print"></i> Print All Charts
											</button>
										</div>
										</div>
										<div class="col-md-12"
											style="overflow-y: scroll; height: 540px; maxheight: auto; margin-top: 10px;">
											<div id="HEIGHT_GROWTH_CHART_DIV" class="col-md-12"
												style="height: 580px; margin-top: 0px;"></div>
											<div id="WEIGHT_GROWTH_CHART_DIV" class="col-md-12"
												style="height: 580px; margin-top: 0px;"></div>
											<div id="HEAD_GROWTH_CHART_DIV" class="col-md-12"
												style="height: 580px; margin-top: 0px;"></div>
										</div>
									</div>
									<div id="HEIGHT_WEIGHT_BMI_GreaterThanFiveYears"
										class="tab-pane fade">
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-danger" data-dismiss="modal"
												type="button">
												<i class="fa fa-arrows"></i> Close
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-primary" disabled="disabled"
												id="BTN_PRINT_HEIGHT_CHART_GreaterThanFiveYears"
												onclick="printChartsGreaterThanFiveYears('HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears');">
												<i class="fa fa-print"></i> Print Height
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-primary" disabled="disabled"
												id="BTN_PRINT_WEIGHT_CHART_GreaterThanFiveYears"
												onclick="printChartsGreaterThanFiveYears('WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears');">
												<i class="fa fa-print"></i> Print Weight
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-primary" disabled="disabled"
												id="BTN_PRINT_BMI_CHART_GreaterThanFiveYears"
												onclick="printChartsGreaterThanFiveYears('BMI_GROWTH_CHART_DIV_GreaterThanFiveYears');">
												<i class="fa fa-print"></i> Print BMI
											</button>
										</div>
										<div style="float: right; padding-right: 6px;">
											<button class="btn btn-xs btn-info" disabled="disabled"
												id="BTN_PRINT_ALL_CHARTS_GreaterThanFiveYears"
												onclick="printChartsGreaterThanFiveYears('PRINT_ALL');">
												<i class="fa fa-print"></i> Print All Charts
											</button>
										</div>
										<div class="col-md-12"
											style="overflow-y: scroll; height: 540px; maxheight: auto; margin-top: 10px;">
											<div class="col-md-12-1"
												id="HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears"
												style="height: 580px; margin-top: 0px;"></div>
											<div class="col-md-12-1"
												id="WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears"
												style="height: 580px; margin-top: 0px;"></div>
											<div class="col-md-12"
												id="BMI_GROWTH_CHART_DIV_GreaterThanFiveYears"
												style="height: 580px; margin-top: 0px;"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



			</div>
		</section>
		<!--/PAGE -->

		<!--Email Popup Start  -->
		<div class="modal fade" id="emailreportingPopUp" tabindex="-1">
			<div class="modal-dialog modal-dialog-centered" style="width: 50%;">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="left">
							<b>Send Email </b>
						</h3>
						<!-- <h5 class="left">
									<b>Patient Name:</b>
									<label class="control-label" id="patientName"></label>
								</h5> -->
					</div>




					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
								<div class="container">
									<div class="panel panel-primary">
										<div class="panel-heading" id="divEhatContent"></div>
										<div class="panel-body">
											<!-- <input id="treatmentID" type="hidden" value="0">
													<input id="masterIdd" type="hidden" value="0">
													<input id="patientgander1" type="hidden" value="0"> -->
											<div class="form-group col-md-6">
												<label for="exampleInputEmail1">TO: </label> <input
													type="text" id="emailTo" class="form-control"
													placeholder="">
											</div>
											<div class="form-group col-md-6">
												<label for="exampleInputEmail1">CC: </label> <input
													type="text" id="emailCC" class="form-control"
													placeholder="">
											</div>

											<div class="form-group col-md-4">
												<label for="exampleInputEmail1">Message </label>
												<textarea id="massageId" class="form-control" rows="3"
													style="width: 453px; height: 69px;" placeholder="Message"></textarea>
											</div>

											<div class="pull-right" style="margin-top: 8%">
												<button type="button" class="btn btn-primary"
													onclick="emailSendingPatinetTest()">Send Email</button>
												<button type="button" class="btn btn-warning"
													data-dismiss="modal">Close</button>
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
		<!--Email Popup End  -->
		<!--Follow up Popup Start  -->
		<div class="modal" id="followupPopUp">
			<div class="modal-dialog modal-dialog-centered" style="width: 50%;">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="left">
							<b>Follow Up </b>
						</h3>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
								<div class="container">
									<div class="panel panel-primary">
										<div class="panel-heading" id="divEhatContent"></div>
										<div class="panel-body">

											<div class="form-group col-md-6">
												<label for="exampleInputEmail1">Date: </label> <input
													type="text" value=""
													class="form-control span6 input-mini search-query"
													placeholder="Date" name="followupdate" readonly="readonly"
													onclick="displayCalendar(document.getElementById('ddDateFollwUp'),'yyyy-mm-dd',this)"
													id="ddDateFollwUp">
											</div>
											<div
												class="form-group col-md-6 input-group bootstrap-timepicker timepicker">
												<label for="exampleInputEmail1">Time: </label> <input
													type="text" readonly="readonly" class="form-control "
													id="timeFrom2">
											</div>

											<div class="pull-right" style="margin-top: 8%">
												<button type="button" class="btn btn-primary"
													onClick="saveFollowup()">Save</button>
												<button type="button" class="btn btn-warning"
													data-dismiss="modal">Close</button>
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
		<!--Follow Up popup End  -->
	<!--Access Template start  -->
	<div class="modal" id="access_template">
			<div class="modal-dialog modal-dialog-centered" style="width: 60%;height: 100%;">
				<div class="modal-content">
					<div class="modal-header" style="background-color:#f7f7f7;">
						<h6 class="left">
							<b>Template</b>
						</h6>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
								<div class="container">
									<!-- <div class="panel panel-primary"> -->
										<!-- <div class="panel-heading" id="divEhatContent"></div> -->
										<div class="panel-body">
										<div class="col-md-12">
										<div class="pull-right" >
												<!-- <button type="button" class="btn btn-primary btn-xs" onclick="getoverallAccessTemplateList();copyAccessTemplate();">Submit</button> -->
												 <button type="button" class="btn btn-primary btn-xs" onclick="copyAccessTemplate();">Submit Form</button> 
												<button type="button" class="btn btn-danger btn-xs"
													data-dismiss="modal">Cancel</button>
											</div>
											</div>
											<div class="col-md-12">&nbsp;</div>
											<div class="form-group col-md-6">
												<label for="exampleInputEmail1"><b>Speciality</b> </label> 
															<!-- <select class="select2 form-control" id="docspecialityaccessTemplate">
																
															</select> -->
															<select class="select2"
													style="width: 100%;" id="docspecialityaccessTemplate" onchange="getoverallAccessTemplateList();"></select>
											</div>
											<div
												class="form-group col-md-6">
												<label for="exampleInputEmail1"><b>Body Part</b> </label> 
												<select class="select2 " style="width: 100%;" id="accessTemporgans" onchange="getoverallAccessTemplateList();">
																
															</select>
											</div>
											<div class="col-md-12">&nbsp;</div>
												<div class="col-md-4 mb-3">
													 <label class="radio-inline">
															<input type="radio" name="overall" value="1" checked onchange="getoverallAccessTemplateList();">Overall
																</label> <label class="radio-inline"> <input
																	type="radio" value="2" name="overall" onchange="getoverallAccessTemplateList();">Medication
																</label>
															</div>
															<div class="col-md-12">&nbsp;</div>
															<div class="form-group col-md-5" id="accessByName">
															<label><b>All Templates</b></label>
															
															<input type="text"  class="form-control typeahead" style="width: 100%;" id="all_template" placeholder="Filter enteries" onkeyup="getAccessAllTemplate(this.id);" />
															<!-- <input class="form-control form-control-sm" type="text" placeholder="Filter enteries" onkeyup="getAccessTemplate(this.id);" /> -->  
															</div>
															<div class="form-group col-md-5" id="accessFavByName">
															<label style="margin-left:125px;"><b>Favorite Template</b></label>
															<input type="text"  class="form-control typeahead" style="width: 100%;margin-left:118px;" placeholder="Filter enteries" id="fav_template" onkeyup="getAccessFavTemplate(this.id);" />
															 <!-- <input class="form-control form-control-sm" type="text"  placeholder="Filter enteries" style="margin-left:118px;"/>    -->
															</div>
															<div class="col-md-12">&nbsp;</div>
															<div class="form-group col-md-5">
															<select multiple="multiple" id="all_enteries" style="width:300px;height:200px;  font-size:8pt;text-align: left;">
															
															</select>
																<!-- <div class=div1>
																</div> -->
															</div>
															<div class="form-group col-md-1 text-center">
															<button type="button"  id="right" class="btn btn-default double_rigt" onclick="rightShift();"><i class="fa fa-angle-double-right"  style="font-size:15px"></i> </button>
															</div>
															<div class="form-group col-md-1 text-center">
															<button type="button" id="left" class="btn btn-default double_left" onclick="leftShift();"><i class="fa fa-angle-double-left"  style="font-size:15px"></i> </button>
															</div>
															<div class="form-group col-md-5">
																<!-- <div class=div2> -->
																<select multiple="multiple" id="fav_enteries" style="width:300px;height:200px;font-size:8pt;text-align:left;">
														
															</select>
																<!-- </div> -->
															</div>

											
										</div>
									</div>
								</div>
							</div>
						<!-- </div> -->
					</div>
				</div>
			</div>
		</div>
	<!--Access Template End  -->
		
<!--Navnath-->
		<script type="text/javascript"
			src="ehat-design/datepicker/bootstrap-datepicker.js">
		<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<script>
			jQuery(document).ready(function() {
				App.setPage("tabs_accordions"); //Set current page
				App.init(); //Initialise plugins and elements
				
				
				//getTreatments();
				$("#instruction").on("select2:selecting", function(e) {

				});
				$("#route").on("select2:selecting", function(e) {

				});
				$("#ddprotype").select2();

				$("#ddprogrp").select2();
				
				$("#docspeciality").select2();
				
				$("#cporgans").select2();
				
				$("#accessTemporgans").select2();
				
				$("#docspecialityaccessTemplate").select2();

				/* $(document).ready(function() {
					$("#divEntry1").click(function() {
						$("#divEntry1").hide();
					});
				}); */

				$(document).ready(function() {
					$("#altype").select2({
						dropdownParent : $("#md2")
					});
				});
				
				//$(function () { function moveItems(origin, dest) {
				   // $(origin).find(':selected').appendTo(dest);
				//}
				
				//$('#left').click(function () {
				   // moveItems('#fav_enteries', '#all_enteries');
				//});

				//$('#right').on('click', function () {
				 //   moveItems('#all_enteries', '#fav_enteries');
				//});
				//});

				//$("#fav_enteries").select2();
				//$("#all_enteries").select2();
				/* 	$(document).ready(function() {
						$("#divEntry2").click(function() {
							$("#divEntry2").hide();
						});
					}); */
				/* $(document).ready(function() {
					$("#divEntry3").click(function() {
						$("#divEntry3").hide();
					});
				}); */
				$('#timeFrom2').datetimepicker({
					datepicker : false,
					format : 'H:i',
					step : 15
				});

				
				getSxAdviceList();
				
				setStringTabs('');
				$("#tablediv").hide();
				//coverShitInformationPatient();
				coverShitInformationPatientBill()
				fetchVital('onload');
				fetchRouteMaster();
				fetchComplaint();
				//fetchHistory();
				fetchClinical();
				fetchbilldetails();
				fetchUnit();
				getNextNotesID();
				//getAllNotes();
				getTreatments();
				fetchForHistory();
				fetchRadiologyOrder();
				fetchLabOrders();
				getAllNotesCount();
				//getFollowup();
				getListOfSpecialzation();
				getListOfSpecialzationById();
			});
		</script>
		<script type="text/javascript">
			$(function() {
				$('#datetimepicker3').datetimepicker({
					format : 'LT'
				});
			});
		</script>
		<input type="hidden" id="diagoMasterId" value="0">
		<input type="hidden" id="VitaltodayDate" value="<%=todays_date%>">
		<input type="hidden" id="treatInput" value="0">
		<input type="hidden" id="preMasterId" value="0">
		<input type="hidden" id="callform" value="callfrom">
		<input type="hidden" id="diagoId" value="0">
		<input type="hidden" id="historyId" value="0">
		<!-- <input type="hidden" id="idcomplaint" value="0">  -->
		<!-- <input type="hidden" id="historyId" value="0"> -->
		<input type="hidden" id="clinicalId" value="0">
		<input type="hidden" id="notesId" value="" />
		<!-- <input type="hidden" id="Doctor_ID" value="0"> -->
		<input type="hidden" id="charges1" value="0">
		<input type="hidden" id="investigationtestId" value="0">
		<input type="hidden" id="idTestSlave" value="0">
		<input type="hidden" id="subserviceid" value="0">
		<input type="hidden" id="serviceid" value="0">
		<input type="hidden" id="iscombination" value="0">
		<input type="hidden" id="depdocdeskid" value="1">
		<input type="hidden" id="deptId" value="1">
		<input type="hidden" id="cpoeCharges2" value="" />
		<input type="hidden" value="0" id="SponsorsourceTypeId" />
		<input type="hidden" value="0" id="chargesSlaveId" />
		<input type="hidden" value="0" id="chargesfromConf" />
		<input type="hidden" value="insert" id="InvestigationQueryType" />
		<input type="hidden" value="0" id="billSlaveID" />
		<input type="hidden" value="0" id="investigationSlaveID" />
		<input type="hidden" value="0" id="billDetailsId">
		<input type="hidden" value="0" id="billidservice">
		<input type="hidden" id="serviceId" value="0" />
		<input type="hidden" id="complaintcount" value="" />
		<input type="hidden" id="clinicalcount" value="" />
		<input type="hidden" id="historycount" value="" />
		<input type="hidden" id="familyhistorycount" value="" />
		<input type="hidden" id="tr_Id" value="0" />
		<!-- <input type="hidden" id="his_Id" value="0" /> -->
		<input type="hidden" id="pdob" value="">
		<input type="hidden" id="setimmunizationconfigcount" value="">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="loggedinUserName"
			value="<%=session.getAttribute("userName")%>">


		<input type="hidden" value="" id="folderid">
		<input type="hidden" value="" id="foldername">
		<input type="hidden" value="" id="a21">
		<input type="hidden" value="0" id="sxadvicemasterid">
		<input type="hidden" value="0" id="measurementsMasterId">
		<input type="hidden" value="" id="callfromcopyTreatment">
		<input type="hidden" value="" id="callfromforprvTrtmnt">
		<input type="hidden" value="" id="priviousTrtmntId">
		<input type="hidden" id="patientId"
			value="<%=request.getParameter("pid")%>">
		<input type="hidden" id="userType"
			value="<%=session.getAttribute("userType")%>">
		<input type="hidden" id="instructioncount" value="">

		<input type="hidden" id="treatmentId"
			value="<%=request.getParameter("tid")%>">
		<input type="hidden" id="callfrom"
			value="<%=request.getParameter("callfrom")%>">
		<input type="hidden" id="almasterid" value="0">
		<input type="hidden" id="cptemplateId" value="0">
		<input type="hidden" id="historyFlag" value="" />
		<input type="hidden" id="personalhistoryFlag" value="" />
		<input type="hidden" id="followupId" value="0" />
		<div id="billdetailsnew" style="display: none"/>
		<input type="hidden" id="complaintFlagDelete" value=" "/>
		<input type="hidden" id="complaintFlagSave" value=""/>
		<input type="hidden" id="id" value="0" />
		<input type="hidden" id="accesstemplate_type" value=""/>
		<input type="hidden" id="accesstemplate_treamentid" value=""/>
	</c:if>
	<!-- /JAVASCRIPTS -->
</body>
</html>
