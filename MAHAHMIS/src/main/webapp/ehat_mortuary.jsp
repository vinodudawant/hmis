<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Mortuary Dashboard</title>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- STYLESHEETS -->

<script src="jquery/jquery-2.1.1.js"></script>
<!-- <!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<style type="text/css">
.custom-date-style {
	background-color: red !important;
}
</style>
<!--TIMEPEACKER -->

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!-- JQUERY UI-->
<!-- <script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script> -->
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<!-- DATE RANGE PICKER -->
<script src="js/bootstrap-daterangepicker/moment.min.js"></script>

<script src="js/bootstrap-daterangepicker/daterangepicker.min.js"></script>

<!-- ----for search  autosuggation  complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for search  autosuggation  complete-------------- -->
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />

<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />

<!-- JQUERY UI-->
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

<script type="text/javascript"
	src="ehat-design/js/select2/select2.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />

<!-- Auto-Suggestion 2/1/2015-->
<!-- <script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script> -->
<script type="text/javascript" src="js/ehat_register_mortuary.js"></script>


<!-- <script type="text/javascript" src="js/bill.js"></script>

<script type="text/javascript" src="js/registration.js"></script>
 -->
<script type="text/javascript" src="js/validate.js"></script>
<!-- End New JS File -->



<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("Patient_Death"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#hospDetail").addClass("anchorActive");
		fetchMortuaryInternal('all');
		//setDocNameForEhatRegistration();
		//setDoctorList();
		
	}
</script>
</head>
<body>

<!-- 
	<div id="pleaseWait" style="text-align: center;">
		<img style="margin-top: 250px;" height="43px"
			src="images/loading_black.gif" />
		<div style="margin-top: 10px; color: white">
			<b>Please wait...</b>
		</div>
	</div> -->

	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_mortuary.jsp"%>

				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd/MM/yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>

				<div id="main-content">
					<div class="container" >
						<div class="row" >
							<div id="content" class="col-lg-12 ">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ehat_mortuary.jsp">Mortuary</a></li>
												
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
								<input type="hidden" id="todays_date" value="<%=todays_date%>">
								<div class="col-md-12-1" style="margin-top: 0%;">


									<div class="form-group  col-md-12-1" style="margin-top: 0%;">
										<div>
											<input id="iddrra" class="btn btn-xs btn-info li pull-right"
												title="Register new morturay" type="button"
												onclick="RegisterMortuaryOpenpopup();" value="Register"
												style="">
										</div>
										<div class="form-group  Remove-Padding col-md-4-1"
										
											style="margin-top: 0%;">
											<div class="col-md-4-1" style="margin-top: 0%;">
										<label class="TextFont">Search By :</label>
									</div>

									<div style="margin-top: 0%;" class="col-md-6-1 TextFont" id="divbyName">
										<input 
												class="form-control typeahead  input-SmallText" value=""
												placeholder="Deceased Name.." name="search"
												onkeyup='setAutoDeceasedName(this.id);'
												id="searchDashbordmorturay" name="suggestedBy"
											 />
									</div>
											<!-- <label class="TextFont">Search By :</label> <b
												style="color: red;">*</b> <input
												class="form-control input-SmallText" value=""
												placeholder="Deceased Name.." name="search"
												id="searchDashbordmorturay" name="suggestedBy"> -->
										</div>
										<div class="form-group Remove-Padding col-md-4-1"
											style="margin-top: -2%;padding-left: 0%;">
										<div class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 1%;padding-left: 0%;">
											<label class="TextFont">From Date</label> <b
												style="color: red;">*</b> <input id="from_date"
												class="form-control input-SmallText" value=""
												onclick="displayCalendar(document.getElementById('from_date'),'dd/mm/yyyy',this);"
												readonly="readonly" name="suggestedBy">
										</div>

										<div class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 1%;padding-left: 0%">
											<label class="TextFont">To Date :</label> <b
												style="color: red;">*</b> <input id="to_date"
												class="form-control input-SmallText" value=""
												onclick="displayCalendar(document.getElementById('to_date'),'dd/mm/yyyy',this)"
												readonly="readonly" name="suggestedBy">


										</div>
											<div class="form-group Remove-Padding col-md-2-1"
											style="margin-top:6%;padding-left: 10%">
											<input class="btn btn-xs btn-primary" type="button"
												value="search" onclick="MorturayDashBorad()">

										</div>
										</div>
									

									</div>
									<div class="divide-40"></div>

									<div id="divMain" class="col-sm-12-1 tab-pane fade in active"
										style="">
										<div class="col-sm-4-1">

											<!-- <div id="from_date" class="input-append">
												<input data-format="yyyy-MM-dd" type="text"></input> <span
													class="add-on"> <i data-time-icon="icon-time"
													data-date-icon="icon-calendar"> </i>
												</span>
											</div> -->


										</div>


										<div class="col-sm-6-1" style="margin-top: 0%;">

											<div class="col-sm-2-1">

												<input type="radio" name="internal" value="Y" id="ShowAll"
													onclick="fetchMortuaryInternal('All');" checked="checked">
												<label style="">ShowAll</label>
											</div>
											<div class="col-sm-2-1">
												<input type="radio" name="internal" value="I" id="Internal" 
													onclick="fetchMortuaryInternal('I')" /> <label>Internal</label>
											</div>
											<div class="col-sm-2-1">
												<input type="radio" name="internal" value="E" id="External"
													onclick="fetchMortuaryInternal('E')" /> <label>External</label>
											</div>
										</div>
										<!----------------------------------------------- -->

										<!----------------------------------------------- -->

									</div>


									<div class="divide-20"></div>
									<div class="panel panel-default" style="margin-top: 1%;">
										<div class="panel-body" class="col-md-12-1">
											<div id="SpecialStateContent" class="col-md-4-1"
												style="margin-top: 0%"></div>
											<div class="divide-10"></div>
											<div class="col-md-12-1" id=""
												style=" margin-top: 0%; overflow: auto; height: 400px;">
												<table class="table table-condensed cf"
													style="Width: 100%; overflow: auto;">
													<tbody id="container24">

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
				<!-- Register mortuary popup	 -->
				<div id="MortuaryRegister" class="modal fade in">
					<div class="modal-dialog" style="width: 65%;">
						<div class="modal-content">

							<div class="modal-header">
								<button type="button" class="btn btn-default  li pull-right"
									id="closeDispecedpopup" onclick="RegisterMortuarypopup();"
									style="">Close</button>
								<div class="box-title">
									<h4>
										<i class="fa fa-user fa-fw"></i>Register New Mortuary
									</h4>


								</div>

							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										<!-- Internal And External	 -->
										<div class="col-md-12-1">
											<div class="form-group">
												<div style="margin-top: 2%; text-align: center;"
													class="col-md-5-1 TextFont" id="divDeathRecord22">
													<div class="col-md-4-1">
														<input type="radio" onclick="showPatientId();"
															name="DeathOrAlive" value="I" id="live1"> <label>INTERNAL</label>
													</div>
													<div class="col-md-8-1">
														<input type="radio" onclick="showPatientId();" 
															name="DeathOrAlive" value="E" id="live2"> <label>EXTERNAL</label>
													</div>
												</div>
											</div>

											<!--    <div class="divide-10"></div> -->

											<div class="col-md-6-1"
												style="display: none; margin-top: 1%;" id="patientdiv">
												<div class="form-group" style="margin-top: 0%;">

													<div class="col-md-12" style="margin-top: 0%;">
														<div class="form-group">
															<div class="col-md-3-1">
																<label class="control-label " id="lblCenterPatientId">Patient Id :<span
																	class="required text-danger">*</span>
																</label>
															</div>
															<div class="col-md-6-4" style="margin-top: 0%;">
																<div class="col-md-4-1" style="margin-top: -3%;">
																	<input type="text"
																		class="typeahead form-control input-SmallText"
																		onkeyup="" name="patient Id" id="patient_id"
																		placeholder="UHID" /> <span class="error-span"></span>
																</div>
																<div class="col-md-2-1" style="margin-top: -3%;padding-left: 5%;">
																	<input class="btn btn-xs btn-primary"
																		id="internalsearch" type="button"
																		onclick="getInternalPatientdata()" value="search">
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
										</div>


										<!-- End  Internal And External	-->
										<div class="col-md-12-1" style="margin-top: 1%;">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="tabbable"
														style="line-height: 100%; margin-top: 0%;">
														<div class="pull-right">
															<button class="btn btn-xs btn-success"
																onclick="savemortuarydetails();" title="Save"
																data-placement="left" data-toggle="tooltip">
																<i class="fa fa-save"></i>
															</button>
														</div>
														<div class="col-md-6">
															<div class="form-group"style="margin-top: 6%;">

																<div class="form-group">
																	<label class="control-label "
																		style="font-size: medium;"> Deceased Details:</label>

																</div>
																<div class="form-group">
																	<label class="control-label ">Deceased Name<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input type="text"
																			class="typeahead form-control input-SmallText"
																			onkeyup="" style="width: 70%;" name="DeceasedName"
																			id="deceased_name" placeholder="Deceased Name" /> <span
																			class="error-span"></span>

																	</div>

																</div>
																<div>
																	<div class="form-group">
																		<label class="control-label ">Address<span
																			class="required text-danger">*</span></label>
																		<div class="">
																			<input type="text"
																				class="typeahead form-control input-SmallText"
																				style="width: 70%;" name="Address" id="address1"
																				placeholder="Address" /> <span class="error-span"></span>

																		</div>
																	</div>
																</div>
																<div>
																	<div class="form-group">
																		<label class="control-label ">Relative Name<span
																			class="required text-danger">*</span></label>
																		<div class="">
																			<input type="text"
																				class="typeahead form-control input-SmallText"
																				style="width: 70%;" name="RelativeName"
																				id="relative_name" placeholder="Relative Name" /> <span
																				class="error-span"></span>
																		</div>
																	</div>
																</div>
																<div>
																	<div class="form-group">
																		<label class="control-label ">Relation<span
																			class="required text-danger">*</span></label>
																		<div class="">
																			<select id="relation" name="relation"
																				style="width: 50%;">
																				<option value="0">Select</option>
																				<option value="1">S/O</option>
																				<option value="2">W/O</option>
																				<option value="3">D/O</option>
																				<option value="4">F/O</option>
																				<option value="5">Late S/O</option>
																				<option value="6">Late W/O</option>
																				<option value="7">Late D/O</option>
																				<option value="8">Owner</option>
																			</select><span class="error-span"></span>
																		</div>
																	</div>
																</div>

																<div>

																	<div class="form-group">
																		<label class="control-label ">Date In<span
																			class="required text-danger">*</span></label>
																		<div class="">
																			<input id="date_in"
																				class="form-control input-SmallText" type="text"
																				style="width: 50%;" readonly="readonly" name="date"
																				placeholder="Date" value="">
																			<span class="error-span"></span>
																		</div>
																	</div>

																</div>
																<div>

																	<div class="form-group">
																		<label class="control-label ">Time In<span
																			class="required text-danger">*</span></label>
																		<div class="">
																			<input id="time_in" style="width: 50%"
																				class="form-control input-SmallText" value=""
																				readonly="readonly"> <span
																				class="error-span"></span>
																		</div>
																	</div>

																</div>

																<div>
																	<div class="form-group">
																		<label class="control-label ">Sex<span
																			class="required text-danger">*</span></label>
																		<div class="">
																			<select id="gender1" style="width: 50%;"
																				name="gender">
																				<option value="">Select</option>
																				<option value="Male">Male</option>
																				<option value="Female">Female</option>
																			</select> <span class="error-span"></span>
																		</div>
																	</div>
																</div>
																<div>
																	<div class="form-group">
																		<label class="control-label ">Age <span
																			class="required text-danger">*</span></label>
																		<div class="">
																			<input type="number"
																				class="typeahead form-control input-SmallText"
																				style="width: 50%;" name="Age" id="age1"
																				onkeypress='return validateNumOnly(event)' 
																				placeholder="Age" /> <span class="error-span"></span>
																		</div>
																	</div>
																</div>


															</div>
														</div>
														<!-- div B	strat -->
														<div class="col-md-6">
															<div class="from-group">

																<div class="form-group">
																	<label class="control-label "
																		style="font-size: medium;">Internal
																		Information:</label>

																</div>
																<div class="form-group">
																	<label class="control-label ">Admission No:<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input style="width: 70%;" type="text"
																			class="typeahead form-control input-SmallText"
																			
																			name="fName" id="admsn_no" placeholder="Admission No" />
																		<span class="error-span"></span>
																	</div>
																</div>

																<div class="form-group">
																	<label class="control-label ">Ward:<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input style="width: 70%;" type="text"
																			class="typeahead form-control input-SmallText"
																			name="fName" id="death_ward" placeholder="Ward" /> <span
																			class="error-span"></span>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label ">MLC Patient:<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input style="width: 70%;" type="text"
																			class="typeahead form-control input-SmallText"
																			name="fName" id="mlc_pd" placeholder="Yes/No" /> <span
																			class="error-span"></span>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label ">Date Of Death<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input id="date_of_death"
																			class="form-control input-SmallText" type="text"
																			style="width: 50%"
																			onclick="displayCalendar(document.getElementById('date_of_death'),'dd/mm/yyyy',this)"
																			readonly="readonly" name="date" placeholder="Date"
																			value=""> <span class="error-span"></span>

																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label ">Time Of Death:<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input id="death_time" style="width: 50%"
																			class="form-control input-SmallText" value=""
																			readonly="readonly"> <span class="error-span"></span>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label "
																		style="font-size: medium;">Additional
																		Information:</label>

																</div>
																<div class="form-group">
																	<label class="control-label ">Property<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input type="text"
																			class="typeahead form-control input-SmallText"
																			style="width: 70%;" name="fName" id="property"
																			placeholder="Property" /> <span class="error-span"></span>
																	</div>
																</div>

																<div class="form-group">
																	<label class="control-label ">Clothing<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<input type="text"
																			class="typeahead form-control input-SmallText"
																			style="width: 70%;" name="fName" id="clothing"
																			placeholder="Clothing" /> <span class="error-span"></span>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label ">Additional Notes<span
																		class="required text-danger">*</span></label>
																	<div class="">
																		<textarea
																			class="typeahead form-control input-SmallText"
																			style="width: 70%; height: 50%" name="fName"
																			id="additional_nt" placeholder="Additional Notes"></textarea>
																		<span class="error-span"></span>
																	</div>
																</div>
															</div>
														</div>
														<!-- end B -->
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
							<!-- /BODY-->

						</div>
					</div>
				</div>

				<!--**************** 			****************-->
				<input type="hidden" id="deathId" value="0"> <input
					type="hidden" id="searchFrom" value="all"> <input
					type="hidden" id="callfrom1" value="">

				<script>
					$('#time_in').datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 1
					});
				</script>
				<script>
					$('#death_time').datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 1
					});
				</script>

				<%@include file="Footer.jsp"%></div>
			<input type="hidden" id="userId"
				value="<%=session.getAttribute("userId1")%>">
			<input type="hidden" id="unitId"
				value="<%=session.getAttribute("uId")%>">

			<input type="hidden" id="mor_id" name="mor_id" value="">
			<input type="hidden" id="hiddenHosId" />
			<div id="state" style="display: none;"></div>


		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>

	</section>
</body>
</html>