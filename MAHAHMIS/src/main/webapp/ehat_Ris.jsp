<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>RIS</title>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

<!-- bootstrap datepicker new added  csss -->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<script src="jquery/jquery-2.1.1.js"></script>
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>

<script src="js/ExtraJs/inventory_Material_Request_Note.js"></script>
<!-- <script src="js/ExtraJs/inventory_Material_Receipt.js"> -->

<script type="text/javascript" src="js/CommonTemplate.js"></script>

<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/ehat_patient.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/radiation.js"></script>
<script type="text/javascript" src="js/registration.js"></script>


<script src="js/script.js"></script>
<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>

<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script type="text/javascript">
	onload = function() {
		App.setPage("ItemManagement");
		App.init();
		$("#currPage").html(1);
		setTemplateRis3("onload","1","0");
		defaultViewTestRIS();
	//	getRadiologistDoctorListForRIS();
		getAllDoctorListForBilling();
		new JsDatePick({
			useMode : 2,
			target : "date1",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d-%m-%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});
		new JsDatePick({
			useMode : 2,
			target : "date2",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d-%m-%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});

	}
</script>

</head>
<body style="background: white ! important;">
	<c:if test="${ sessionScope.userType != null }">
		<section id="page">
			<!-- HEADER -->
			<div id="outer" class="container-main" style="width: 100%;">

				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>

				<%@include file="left_menu_pathologyNew.jsp"%>



				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"yyyy-MM-dd");
						String todays_date = formatter.format(currentDate.getTime());
						System.out.println("todays_date :" + todays_date);

						
						/* 		Calendar cal = Calendar.getInstance();
								cal.add(Calendar.DATE, -1);
								System.out.println("Yesterday's date = "+ cal.getTime()); */

						Calendar cal = Calendar.getInstance();
						java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat(
								"yyyy-MM-dd");
						cal.add(Calendar.DATE, -1);
						String yestrDay = dateFormat.format(cal.getTime());
						System.out.println("Yesterday's Date:" + yestrDay);
				%>

				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 6px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ehat_Ris.jsp">RIS</a></li>
												
											</ul>

										</div>
									</div>
								</div>

								<form name="mysearchForm">
									<div id="" class="col-md-12-1 panel-body">

										<div id="" class="panel-body"
											style="border: 1px; margin-top: -40px;">

											<div id="container" class="col-md-10-1"
												style="height: 80%; margin-top: 1%; padding-left: 20px; border: 1px solid #b8b8b8;">
												<div id="txts" class="col-md-5-1" style="margin-top: 11px;">
													<div id="datatable1_filter" class="dataTables_filter">
													
														<!-- <input type="text" id="patid" style="margin-left: 15px; display :none"		
															onkeypress="return validateNumbers(event)"											
															placeholder="Patient ID"> -->
															
															<input type="text" id="patid" style="margin-left: 15px;"
															onkeypress="return validateNumbers(event)"
																onkeyup="searchPatientByName('search')"
															placeholder="UHID">
															
															<input type="text"
															id="patname" style="margin-left: 20px;" onkeyup="searchPatientByName('search')"
															placeholder="Patient Name" aria-controls="datatable1">
													</div>
													<div
														style="margin-bottom: 9px; margin-top: 5px; margin-left: 15px;">
														<input type="text" id="date1" placeholder="Date1"
															readonly="readonly"> <input type="text"
															id="date2" style="margin-left: 20px;" placeholder="date2"
															readonly="readonly">
													</div>
												</div>
												<div id="btns" class="col-md-4-1"
													style="margin-top: 9px; margin-bottom: 5px;">
													<div>
														
															<input type="button" value="Search" id="btnsearch" 
															onclick="searchrispat('search')"
															style="position: relative; width: 70px; margin: 1px; padding: 2px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
															
														<input type="button" value="Today" id="btntoday" 
															onclick="FetchDataOfTodayOnly('<%=todays_date%>');"
															style="position: relative; width: 75px; margin-left: 20px; padding: 2px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
															
														<input type="button" value="Yesterday" id="btnyest" 
															onclick="FetchDataOfyesterday('<%=yestrDay%>');"
															style="position: relative; width: 90px; margin-left: 20px; padding: 2px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
															
													</div>
													<div style="margin-top: 5px;">
														<button value="" id="btnreset"
															style="position: relative; width: 70px; margin: 1px; padding: 2px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
															Reset</button>
														<input type="button" value="Patient Name" id="btnltwk1" onclick="searchPatientByName('search')"
															style="position: relative; width: 75px; margin-left: 20px; padding: 2px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
															
													<!-- 	<button value="" id="btnbgn"
															style="position: relative; width: 90px; margin-left: 20px; padding: 2px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
															From Begining</button>
															 -->
															<input type="button" value=FromBegining id="btnbgn" onclick="FetchDataOfFromBegining('fromBegining')"
															style="position: relative; width: 75px; margin-left: 20px; padding: 2px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
															
															
															
													</div style="margin-top: 5px;">
												</div>
												<div id="txts" class="col-md-3-1" style="margin-top: 13px;">
													<select id="radiologyTestType" onchange="setRisTestgroupBy()" style="width:170px;">
												    </select>	
												</div> 
												
												<div id="txts11" class="col-md-3-1" style="margin-top: 13px;">
													<select id="radioDoctorList" onchange="setRisTestDataByRadiologist()" style="width:170px;">
												    </select>	
												</div> 
												
											</div>
											<div>
												<button class="btn btn-primary editUserAccess" type="button" value=""
													id="btnCreTemp" onclick="clickris('createTemp')"
													style="position: relative; margin: 20px; margin-top: 10px; text-align: center; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
													<h3>
														<i class="fa fa-copy fa-fw"></i>
													</h3>
													Create Template
												</button>
											</div>
										</div>

										<div id="studTabH" class="col-md-12-1"
											style="border: 1px solid #b8b8b8; height: 505px; width: 96.5%; margin-left: 15px;">
														
											<ul class="nav nav-tabs">
											<li class="active">
                                          <a id="curTab" href="#" data-toggle="tab" onclick="setTemplateRis3('onload','1','0')" style="background-color: rgb(0, 255, 128);">
                                          <span >Current</span>
                                        <!-- <span onclick="showPatient(1)">Current</span> -->
                                            </a>
                                             </li>
                                           <li>
                                           <a  id="prevTab" href="#" data-toggle="tab" onclick="setTemplateRis3('onload','0','0')">
                                        <span >Previous</span>
                                        <!-- <span onclick="showPatient(0)">Previous</span> -->
                                            </a>
                                             </ul>
                                             <script type="text/javascript">
                                             </script>
											<table 
												style="margin-bottom: 9px; background: #f5f5f5; width: 100%;">
												<thead>
													<tr>
														<th class="col-md-12-1"
															style="font-size: 11px; font: Arial;"><i
															class="fa fa-bookmark"></i> Study Information ( Main Account )
															
															<!-- <span style="margin-left: 500px;">Total Study:</span> 
															<span style="margin-left: 35px;">Report Pending:</span>
															<span style="margin-left: 35px;">Report Created:</span> -->
															
														</th>
													</tr>
												</thead>
											</table>
												<table class='table table-condensed header-fixed cf'
													style='width: 100%; margin-top: 2px; border: 1px solid #b8b8b8;'>
													<thead class='cf'>
														<tr>
															<!-- commented, aniket kanse 20 JAN 22 -->
															<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>
															<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont center'>Patient ID</div></th>
															<th id="thCenterPatientId" class='col-md-1-1' style='height: 21.5px; display:none'><div class='TextFont center'>UHID</div></th>		
															<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'> Patient Name</div></th>
															<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'> Test Name</div></th>
															<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'> Assigned Date</div></th>		
															<th class='numeric col-md-1-1' style='height: 21.5px;'><div class='TextFont' style="margin-left: -10px;">Gender</div></th>
															<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont' style="margin-right: 30px;">Type</div></th>
															<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont' style="margin-right: 30px;">Arrival</div></th>
															<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont' style="margin-right: 30px;">Taken</div></th>
															<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont' style="margin-right: 30px;">Reporting</div></th> -->
															
															<th class='col-md-1-1 center' style='height: 21.5px;'>#</th>
															<th class='col-md-1-1 center' style='height: 21.5px;'>UHID</th>
															<th class='col-md-2-1 center' style='height: 21.5px;'>Patient Name</th>
															<th class='col-md-2-1 center' style='height: 21.5px;'>Sponsor Name</th> 	
															<th class='col-md-1-1 center' style='height: 21.5px;'>Doctor Name</th>
															<th class='col-md-2-1 center' style='height: 21.5px;'>Test Name</th>
															<th class='col-md-1-1 center' style='height: 21.5px;'>Assigned Date</th>	
															<th class='col-md-1-1 center' style='height: 21.5px;'>Gender</th>
															<th class='col-md-1-1 center' style='height: 21.5px;'>Type</th>
															<th class='col-md-1-1 center' style='height: 21.5px;'>Arrival</th>
															<th class='col-md-1-1 center' style='height: 21.5px;'>Taken</th>
															<th class='col-md-1-1 center' style='height: 21.5px;'>Reporting</th>
														</tr>
													</thead>
												</table>
											 <div id="studTabD" class="col-md-12-1" style="margin-top: 0px; width: 99.8%; height: 450px;">
											 </div>
											<div id="studTabD1" class="col-md-12-1" style="margin-top: 0px; width: 99.8%; height: 450px;">
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

		</section>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<div id="risdata" style="display: none;"></div>
	<div id="currPage" style="display: none;"></div>
	<div id="Idradiology" style="display: none;"></div>
	<input type="hidden" id="callFromRadio" value="current">
	<div id="Tid" style="display: none;"></div>
	<div id="Pid" style="display: none;"></div>
	<div id="pageType" style="display: none;"></div>
	
</body>
</html>