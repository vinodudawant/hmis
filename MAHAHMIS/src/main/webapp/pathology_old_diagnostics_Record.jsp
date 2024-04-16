<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Test Patient Dashboard</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<!-- <script src="/Scripts/jquery-1.5.1.min.js"></script> -->
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- JQUERY -->

<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<!--calender Files  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- <link href="bootstrap-3.1.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="typeaheadjs.css" rel="stylesheet"> -->

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<!-- Date -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ehat_admin.js"></script>
<script type="text/javascript" src="js/OutsourceMaster.js"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- <!-- Auto-Suggestion 2/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- <script src="js/script.js"></script>
<script src="auto/bootstrap-typeahead.js"></script> -->
<!-- 	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script> -->

<script>
	jQuery(document).ready(function() {

		App.setPage("labTestPatientDashboard"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>
<script type="text/javascript">
	onload = function() {

		$("#dignoMgmt").addClass("anchorActive");
		//getLabTestPatientDashboard('onload', 'labTestResults');
		$("#chkTotal").prop("checked", true);
		autoSuggestionForLab("byName", "onload", "labTestPatient");

		cleartxt();

		/* added by ajay:16-april-2019 */
		$('#dispatchTime').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 5
		});

		getOutsourceWise();/* added by ajay:16-april-2019 */
		getOutsourceWiselabname();/* added by ajay:4-june-2019 */
	}
</script>

</head>
<body style="background: white ! important;">

	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
		<c:if test="${sessionScope.userType != null }">


			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

			<%@include file="left_menu_pathologyNew.jsp"%>




				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
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
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
												<li><a href="labTestPatientDashboard.jsp">Lab Test
														Result</a></li>

											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">
									<div style="" class="col-md-1-1">
										<label class="TextFont"
											style="margin-left: 20%; margin-top: 3%; font-size: 11px;">Search
											By:</label>
									</div>
									<div class="col-md-2-1" style="margin-left: -36px">
										<label class="TextFont"
											style="margin-left: 30%; margin-top: 3%;"> Patient
											Name:</label>
									</div>

									<div style="margin-left: -6px;" class="col-md-2-1 TextFont"
										id="divbyName">
										<input id="byName"
											class="typeahead form-control input-SmallText" type="text"
											placeholder="-Select-" style="width: 200px;" name="byName"
											onkeypress="SearchPathologyOnEnter(event,'labTestPatientDashboard')" />

									</div>
									<div class="col-md-2-1" style="margin-left: -5px;">
										<label class="TextFont"
											style="margin-left: 50%; margin-top: 3%;"> Barcode: </label>
									</div>

									<div style="margin-left: -6px;" class="col-md-2-1 TextFont"
										id="divbyBarcode">
										<input id="byBarcode" onblur="isNumber('byBarcode')"
											class="typeahead form-control input-SmallText" type="text"
											placeholder="Barcode No" style="width: 200px;"
											name="byBarcode" />

									</div>


									<!--@author:paras @Date:31mar2017 @code:search by date  -->
									<div style="margin-left: 4%; margin-top: -22px; width: 84px"
										class="col-md-3-1">

										<label class="TextFont">From Date :</label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('txtFdate'),'dd/mm/yyyy',this)"
											readonly="readonly" id="txtFdate">
									</div>
									<div class="col-md-3-1"
										style="margin-left: 2%; margin-top: -22px; width: 84px">

										<label class="TextFont">To Date :</label> <input type="text"
											id="txtTdate" readonly="readonly"
											onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)"
											class="form-control input-SmallText">
									</div>



									<!----End-@author:paras @Date:31mar2017 @code:search by date  -->
									<!-- <div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary"
											onclick="getLabTestPatientDashboard('search', 'labTestResults')" />
									</div> -->
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary"
											onclick="getLabTestPatientSearch('search', 'labTestResults')" />
										<!-- onclick="getLabTestPatientDashboard('search', 'labTestResults')" /> -->
									</div>
									<!--@author:paras @Date:6mar2017 @code:values  -->
									<!-- <div class="col-md-1-1" style="text-align: center;">
										<label class="TextFont"
											style="margin-left: -35px; ">CL</label>
										</div>	
									<div class="col-md-1-1" style="text-align: center;margin-top:7px;margin-left:-65px">
										
										<input id="txtLval" type="button" value="0"class="btn btn-success" style="margin-left:-85px" onclick="getLabTestPatientDashboard('cl', 'labTestResults');" />
										</div>	
									
										<div class="col-md-1-1" style="text-align: center;margin-left: -67px;">
										
										
										<label class="TextFont"
											style="margin-left: -35px; ">CH</label>
										</div>	
									<div class="col-md-1-1" style="text-align: center;margin-top:7px;margin-left:-65px">
										
										<input id="txtHval"   class="btn btn-danger" type="button" value="0" style="margin-left:-85px; "  onclick="getLabTestPatientDashboard('ch', 'labTestResults');"/>
										</div>	
											<div class="col-md-1-1" style="text-align: center;margin-left: -67px;">
										
										
										<label class="TextFont"
											style="margin-left: -35px; ">Normal</label>
										</div>	
									<div class="col-md-1-1" style="text-align: center;margin-top:-4px;margin-left:-44px">
										
										<input id="txtnval"   class="btn btn-primary" type="button" value="0" style="margin-left:-85px; "  onclick="getLabTestPatientDashboard('nl', 'labTestResults');"/>
										</div>	
							<!-------@author:paras @Date:6mar2017 @code:values  -->
								</div>
								<div class="divide-20"></div>

								<div class="panel panel-default" style="margin-top: 0px;">
									<div class="panel-body" class="col-md-12-1">





										<!-- ---------------------------__Touheed Code For Previous__(Start)------------------------- -->
										<!-- <form name="mysearchForm"> -->
										<div style="width: 100%; height: 99%;">
											<div id="rightContActual">

												<!-- Start Tab UI -->
												<div class="col-md-12-1"
													style="margin-top: 5px; margin-left: 0px;">
													<!-- Start BOX -->
													<div class="box border col-md-12-1">
														<div class="divide-10"></div>
														<div class="tabbable col-md-12-1">
															<ul class="nav nav-tabs">
															 	<li class="active" onclick=""><a
																	id="ct" data-toggle="tab" href="#CT"
																	style="background-color: #00ff80;"> <span
																		class="hidden-inline-mobile"><b><i
																				class="fa fa-location-arrow"></i> Current Record</b></span></a></li>
                                                               <li   onclick="tabColorChange('privst')" id="tabprivst"><a
																	id="privst" data-toggle="tab" href="#Privst"><span
																		class="hidden-inline-mobile"><b><i
																				class="fa fa-mail-reply"></i> Previous Record</b></span></a></li>

															<!--	<li onclick="tabColorChange('unathot')" id="tabunatho"><a
																	id="unathot" data-toggle="tab" href="#Unathot"><span
																		class="hidden-inline-mobile"><b><i
																				class="fa fa-times-circle"></i> Unauthorized Record</b></span></a></li>


																<li onclick="tabColorChange('recallt')" id="tabrecall"><a
																	id="recallt" data-toggle="tab" href="#Recallt"><span
																		class="hidden-inline-mobile"><b><i
																				class="fa fa-refresh"></i> Recall Record</b></span></a></li>


																<li onclick="tabColorChange('holdt')" id="tabhold"><a
																	id="holdt" data-toggle="tab" href="#Holdt"><span
																		class="hidden-inline-mobile"><b><i
																				class="fa fa-exclamation-triangle"></i> Hold Record</b></span></a></li>

																<li class="" onclick="tabColorChange('autho')"
																	id="tabautho"><a id="autho" data-toggle="tab"
																	href="#Autho"><span class="hidden-inline-mobile"><b><i
																				class="fa fa-check-square-o"></i> <i class="fa fa-mail-reply">
																				Authorized Record</b></span></a></li> -->

															<!-- 	<li class="active"  onclick="tabColorChange('privst')" id="tabprivst"><a
																	id="privst" data-toggle="tab" href="#Privst"><span
																		class="hidden-inline-mobile"><b><i
																				class="fa fa-mail-reply"></i> Previous Record</b></span></a></li>

																<li onclick="tabColorChange('outlab')" id="taboutlab"><a
																	id="outlab" data-toggle="tab" href="#Outlab"><span
																		class="hidden-inline-mobile"><b><i
																				class="fa fa-mail-reply"></i> Out Source Test Record</b></span></a></li> -->


															</ul>
															<div class="divide-10"></div>

															<div class="tab-content">

																<!-- <div class="divide-20"></div> -->

																<div id="CT" class="tab-pane fade in active">
																	<div class="col-md-12"
																		style="margin-top: 3px; margin-left: 0px;">
																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick=""
																				name="typeOfpatCheck" value="total" id="chkTotal">
																				Total
																			</label>
																		</div>
																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				name="typeOfpatCheck" value="ipd" id="chkIpd"
																				onclick="">
																				IPD
																			</label>
																		</div>
																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick=""
																				name="typeOfpatCheck" value="opd" id="chkOpd">
																				OPD
																			</label>
																		</div>
																		<div class="col-md-2-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick=""
																				name="typeOfpatCheck" value="diagnosis"
																				id="chkDiagnosis"> Diagnostics
																			</label>
																		</div>

																		<div class="numeric filterable-cell">
																			<input id="OutSourceTest"
																				class="btn btn-xs btn-warning" type="button"
																				value="OutSourceTest"
																				style="font-size: 10px; margin-left: 578px; margin-top: -5px"
																				onclick="viewOutSourceTestforResult()">
																		</div>
																		<!-- 	<div class="numeric filterable-cell">
																			<input id="OutSourceTest"
																				class="btn btn-xs btn-warning" type="button"
																				value="outSourcePrint"
																				style="font-size: 10px; margin-left: 615px; margin-top: -33px;"
																				onclick="printOutSource()">
																		</div> -->


																	</div>


																	<div id="patientcontainer" class=""
																		style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;"></div>

																</div>



																<div id="Autho" class="tab-pane fade">
																	<div class="col-md-12"
																		style="margin-top: 3px; margin-left: 0px;">
																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick="getLabTestPatientDashboard('autho', 'labTestResults')"
																				name="typeOfpatCheck" value="total"
																				id="authochkTotal"> Total
																			</label>
																		</div>
																		<!-- Bill Package changes by Pooja -->
																		<!--	<div class="col-md-12"
																			style="margin-top: 3px; margin-left: 0px;">
																			<div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('privst', 'labTestResults')"
																					name="typeOfpatCheck" value="total" id="chkTotal">
																					Total
																				</label>
																			</div> -->

																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				name="typeOfpatCheck" value="ipd" id="chkIpd"
																				onclick="getLabTestPatientDashboard('authIpd', 'labTestResults')">
																				IPD
																			</label>
																		</div>
																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick="getLabTestPatientDashboard('authOpd', 'labTestResults')"
																				name="typeOfpatCheck" value="opd" id="chkOpd">
																				OPD
																			</label>
																		</div>
																		<div class="col-md-2-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick="getLabTestPatientDashboard('authDiagnosis', 'labTestResults')"
																				name="typeOfpatCheck" value="diagnosis"
																				id="chkDiagnosis"> Diagnostics
																			</label>
																		</div>
																	</div>
																	<div id="patientcontainerAuth" class=""
																		style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;">
																	</div>

																</div>

																<!-- --------------------------------------------------------------Unathorised---------------------------------------------------------- -->
																<div id="Unathot" class="tab-pane fade">
																	<div class="col-md-12"
																		style="margin-top: 3px; margin-left: 0px;">
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('onload', 'labTestResults')"
																					name="typeOfpatCheck" value="total" id="chkTotal" checked="checked">
																					Total
																				</label>
																			</div> -->
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					name="typeOfpatCheck" value="ipd" id="chkIpd"
																					onclick="getLabTestPatientDashboard('ipd', 'labTestResults')">
																					IPD
																				</label>
																			</div> -->
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('opd', 'labTestResults')"
																					name="typeOfpatCheck" value="opd" id="chkOpd">
																					OPD
																				</label>
																			</div> -->
																		<!-- <div class="col-md-2-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('diagnosis', 'labTestResults')"
																					name="typeOfpatCheck" value="diagnosis"
																					id="chkDiagnosis"> Diagnostics
																				</label>
																			</div> -->
																	</div>

																	<div style="margin-top: -06px; margin-bottom: 5px;"
																		class="li pull">
																		<b style="display: none;">CL:</b> <input type="button"
																			style="margin-top: -5px; display: none;"
																			onclick="getLabTestPatientDashboard('cl', 'labTestResults'),changetab('cl');"
																			class="btn btn-xs btn-primary" value="0" id="txtLval">
																		<b style="display: none;">CH:</b> <input type="button"
																			style="margin-top: -5px; display: none;" value="0"
																			class="btn btn-xs btn-danger"
																			onclick="getLabTestPatientDashboard('ch', 'labTestResults'),changetab('ch');"
																			id="txtHval"> <b style="display: none;">Nor:</b>
																		<input type="button"
																			style="margin-top: -5px; display: none;" value="0"
																			class="btn btn-xs btn-success"
																			onclick="getLabTestPatientDashboard('nl', 'labTestResults'),changetab('nl');"
																			id="txtnval">

																		<div class="li pull-right">
																			<input type="button" style="margin-top: -5px;"
																				value="Authorize" class="btn btn-xs btn-danger"
																				onclick="changeStatusOfLabRprt('authselect','0')"
																				id="txtun"> <input type="button"
																				style="margin-top: -5px; margin-right: 45px"
																				value="Select All" class="btn btn-xs btn-danger"
																				onclick="seleallpatient()" id="txtselall">

																		</div>

																	</div>


																	<div id="patientcontainerU" class=""
																		style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;"></div>

																</div>

																<!-- -----------------------------------------------------------------------Unathorised-------------------------------------------------------------------------- -->

																<!-- --------------------------------------------------------------Recall---------------------------------------------------------- -->
																<div id="Recallt" class="tab-pane fade ">
																	<div class="col-md-12"
																		style="margin-top: 3px; margin-left: 0px;">
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('onload', 'labTestResults')"
																					name="typeOfpatCheck" value="total" id="chkTotal" checked="checked">
																					Total
																				</label>
																			</div> -->
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					name="typeOfpatCheck" value="ipd" id="chkIpd"
																					onclick="getLabTestPatientDashboard('ipd', 'labTestResults')">
																					IPD
																				</label>
																			</div> -->
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('opd', 'labTestResults')"
																					name="typeOfpatCheck" value="opd" id="chkOpd">
																					OPD
																				</label>
																			</div> -->
																		<!-- <div class="col-md-2-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('diagnosis', 'labTestResults')"
																					name="typeOfpatCheck" value="diagnosis"
																					id="chkDiagnosis"> Diagnostics
																				</label>
																			</div> -->
																	</div>


																	<div id="patientcontainerR" class=""
																		style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;"></div>

																</div>

																<!-- -----------------------------------------------------------------------Recall-------------------------------------------------------------------------- -->

																<!-- --------------------------------------------------------------Hold---------------------------------------------------------- -->
																<div id="Holdt" class="tab-pane fade">
																	<div class="col-md-12"
																		style="margin-top: 3px; margin-left: 0px;">
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('onload', 'labTestResults')"
																					name="typeOfpatCheck" value="total" id="chkTotal" checked="checked">
																					Total
																				</label>
																			</div> -->
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					name="typeOfpatCheck" value="ipd" id="chkIpd"
																					onclick="getLabTestPatientDashboard('ipd', 'labTestResults')" >
																					IPD
																				</label>
																			</div> -->
																		<!-- <div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('opd', 'labTestResults')"
																					name="typeOfpatCheck" value="opd" id="chkOpd">
																					OPD
																				</label>
																			</div> -->
																		<!-- <div class="col-md-2-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('diagnosis', 'labTestResults')"
																					name="typeOfpatCheck" value="diagnosis"
																					id="chkDiagnosis"> Diagnostics
																				</label>
																			</div> -->
																	</div>


																	<div id="patientcontainerH" class=""
																		style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;"></div>

																</div>

																<!-- -----------------------------------------------------------------------Hold-------------------------------------------------------------------------- -->

																<!-- -----------------------------------------------------------------------Privious-------------------------------------------------------------------------- -->
																<div id="Privst" class="tab-pane fade">
																	<div class="col-md-12"
																		style="margin-top: 3px; margin-left: 0px;">
																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick="getLabTestPatientDashboard('privst', 'labTestResults')"
																				name="typeOfpatCheck" value="total"
																				id="privchkTotal"> Total
																			</label>
																		</div>
																		<!-- Bill Package changes by Pooja -->
																		<!--	<div class="col-md-12"
																			style="margin-top: 3px; margin-left: 0px;">
																			<div class="col-md-1-1">
																				<label class="checkbox input-SmallText"> <input
																					type="radio" style="margin-top: 0px !important;"
																					onclick="getLabTestPatientDashboard('privst', 'labTestResults')"
																					name="typeOfpatCheck" value="total" id="chkTotal">
																					Total
																				</label>
																			</div> -->

																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				name="typeOfpatCheck" value="ipd" id="chkIpd"
																				onclick="getLabTestPatientDashboard('privIpd', 'labTestResults')">
																				IPD
																			</label>
																		</div>
																		<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick="getLabTestPatientDashboard('privOpd', 'labTestResults')"
																				name="typeOfpatCheck" value="opd" id="chkOpd">
																				OPD
																			</label>
																		</div>
																		<div class="col-md-2-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick="getLabTestPatientDashboard('privDiagnosis', 'labTestResults')"
																				name="typeOfpatCheck" value="diagnosis"
																				id="chkDiagnosis"> Diagnostics
																			</label>
																		</div>
																	</div>
																	<div id="patientcontainerPrivst" class=""
																		style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;">
																	</div>

																</div>
																<!-- -----------------------------------------------------------------------Privious-------------------------------------------------------------------------- -->

																<div id="Outlab" class="tab-pane fade">
																	<div class="col-md-12"
																		style="margin-top: 3px; margin-left: 0px;">
																		
																		<div class='col-md-1-1'  style="margin-top:3px;margin-left:24px">Lab Name:</div>
																		<div class='col-md-3-1'>
																			<select id="outmasterid" class="form-control"
																				style="width: 97%;margin-top:5px">
																			</select>
																			<input class="btn btn-xs btn-primary"  style="margin-top:-48px;margin-left:255px;" type="button" onclick="getOutLabSearch()" value="search">
																		</div>

																		<!-- 	<div class="col-md-1-1">
																			<label class="checkbox input-SmallText"> <input
																				type="radio" style="margin-top: 0px !important;"
																				onclick="loadPopUp1('outlab', 'labTestResults');"
																				name="typeOfpatCheck" value="total" id="priTotal">
																				OutSource
																			</label>
																		</div>  -->



																		<div id="patientcontainerOutSource" class=""
																			style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;">
																		</div>

																	</div>


																</div>

															</div>

														</div>
													</div>
												</div>
											</div>
										</div>
										<!-- </form> -->

										<!-- ---------------------------__Touheed Code For Previous__(End)------------------------- -->











									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<%@include file="Footer.jsp"%>
				<div id="pathologyAllPatInfo" style="display: none;"></div>
				<input type='hidden' id="idPatPrevSelTest" value='0' />
				<div type="hidden" id="CollectedFlag" value="0"></div>
				<input type="hidden" id="user" value="${sessionScope.userName}" />
				<input type="hidden" id="user1" value="${sessionScope.userName}" />
				<input type="hidden" id="treatmentId" value="0" />
			</div>
		</c:if>

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
	</section>

	<div id="outSourcelabpopup" class="modal fade in"
		style="min-height: 819px tabindex=" -1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">

		<div class="row">
			<div id="outSourceOuthouse"
				style="margin-top: 106px; margin-left: 207px; width: 1000px"
				style="height: 600px;" class="col-md-10">
				<div class="panel panel-default">
					<div class="panel-heading">OutSource Test</div>
					<div class="panel-body">
						<div class="col-md-12-1"
							style="height: 350px; border: 1px solid #b8b8b8;">
							<br> <br>
							<!-- <div class="col-md-6"> -->
							<!-- <h4 class="divide-15">Exceptional Test</h4> -->
							<div class="col-md-12" style="margin-top: 52px">


								<input id="outlabId" type="hidden" value="0">



								<div class="col-md-3">
									<div class="divide-20"></div>
									<label for="exampleInputEmail1">OutSource To </label> <select
										id="outsourcemasterid" class="form-control"
										style="width: 97%;">
									</select> <input type="hidden" id="hiddenSubServiceId">
								</div>



							</div>
							<div class="col-md-12" style=""></div>

							<div class="col-md-12">


								<div class='form-group Remove-Padding col-md-12-1 hidden'
									style='padding-right: 8px; margin-top: 9px;'>
									<div class='divide-20'></div>
									<label class='TextFont col-md-4-1'>TestId</label> <input
										id='testId' type='text' placeholder='testId'
										style='background-color: #ddd' ,disabled="disabled"
										;class='form-control input-SmallText col-md-7-1'
										readonly='readonly' style='margin-left:0%;' value='0' /> <input
										id="testId" type="hidden" value="0">
								</div>

								<div class="col-md-3">
									<div class="divide-20"></div>
									<label for="exampleInputEmail1">Dispatch Date </label> <input
										class="form-control" type="text" readonly="readonly"
										onclick="displayCalendar(document.getElementById('dispatchDate'),'dd/mm/yyyy',this)"
										id="dispatchDate" placeholder="Dispatch Date">
								</div>



								<div class="col-md-3">
									<div class="divide-20"></div>
									<label for="exampleInputEmail1">Dispatch Time</label> <input
										type="text" id="dispatchTime" readonly="readonly"
										class="form-control" placeholder="Dispatch Time">
								</div>

								<div class="col-md-3" style="width: 237px">
									<div class="divide-20"></div>
									<label for="exampleInputEmail1">Carrier Name </label> <input
										type="text" id="carrierId"
										class="form-control" placeholder="Carrier Name">
								</div>

								<div class="col-md-3" style="width: 306px">
									<div class="divide-20"></div>
									<label for="exampleInputEmail1">Comment </label> <input
										type="text" id="CommentId" 
										class="form-control" placeholder="Comment">
								</div>





							</div>

							<div class="col-md-12">

								<div class="col-md-3">
									<div class="divide-20"></div>
									<button class="btn btn-xs btn-success "
										class="btn btn-primary editUserAccess"
										onclick="saveTestOutSourceToLab()"
										style="margin-top: 29px; width: 131px; margin-left: 644px"
										type="button">Save and Print(Ctrl+S)</button>

									<button class="btn btn-xs btn-danger deleteUserAccess"
										id="CloseBTN" class="btn btn-default"
										style="margin-top: -43px; width: 87px; margin-left: 781px;"
										onclick="onCloseBtnRefrshPage1()" data-dismiss="modal"
										type="button">Close</button>

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<input type='hidden' id="idtest" value='0' />
	<input type='hidden' id="testname" value='0' />
	<input type='hidden' id="patientId" value='0' />
	<input type='hidden' id="testIdoutsource" value='0' />

        <!-- hidden field set -->
	<input type='hidden' id="testid" value='0' />
	<input type='hidden' id="labrequestid" value='0' />
	<input type='hidden' id="rate" value='0' />


</body>
</html>
