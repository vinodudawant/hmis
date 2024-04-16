<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Block Patient</title>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="css/ExtraCss/inventory_Sales_Quotation.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<!-- Alertify -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
	<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>


<script src="js/ExtraJs/inventory_Sub_Contracting_Material_Issue.js"></script>
<!-- <script src="js/ExtraJs/inventory_Goods_Issue.js"></script> -->
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
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript"
	src="js/ExtraJs/inventory_Document_SetUp.js"></script>
<script type="text/javascript" src="js/ExtraJs/inventory_Stock_Dashboard.js"></script>	

<script src="js/script.js"></script>

<script type="text/javascript" src="js/markvisit.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("111"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>



<script>

onload = function() {
	
	fetchVisitingPatientForBlockList();
}
	
	
	
	
	
	
	
	
	/*  $(document).ready(function(){
	
	 $("#BtnAddNewRecord").click(function(){
	 //alert("hii");
	 $("#ItemInfoList").remove();
	 });	
	 $("#btnAddNew").click(function(){
	
	 $("#ItemInfoList").show();
	 });
	 });  */
</script>
<style type="text/css">

tbody#Lowinqty tr:nth-child(odd) {
      
    background-color:#f2dede;
}
tbody#inv_pending tr:nth-child(odd) {
      
    background-color:#f2dede;
}
tbody#Lowinqty tr:nth-child(odd) {
      
    background-color:#f2dede;
}
tbody#todayindent tr:nth-child(odd) {
      
    background-color:#f2dede;
}

</style>
</head>
<body style="background: white ! important;">
	<section id="page"> <!-- HEADER --> <header
		class="navbar clearfix" id="header"> <%@include
		file="Menu_Header.jsp"%></header> <%@include
		file="left_menu_home.jsp"%> <!-- /SIDEBAR -->
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
					<div class="row">
						<div class="col-sm-12">
							<div class="page-header">

								<ul class="breadcrumb col-md-12-1"
									style="padding: 6px 10px; margin-top: 1px;">
									<li>Date : <%=todays_date%></li>
									<!-- <li>Date : 11 Aug 2014</li> -->
									<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
									</li>
									<!-- <li><i class="fa fa"></i></li> -->
									<!-- <li class="pull-right">
										<button class="btn btn-xs btn-success" type='button'
											value='Save Now'>Save</button>
										<button class="btn btn-xs btn-warning">Print</button>
										<button class="btn btn-xs btn-danger">Discard</button>
									</li> -->
								</ul>

							</div>
						</div>
					</div>
					<div style="font-weight: bold;" class="col-md-1-1"></div>
				

                    <div class="col-md-12-1">
																	<div style="" class="col-md-3">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 11%; font-size: 11px;">Search
																			By:</label>
																	</div>
																	<!-- <div class="col-md-2">
																		<label class="TextFont"
																			style="margin-left: -68%; margin-top: 3%;">Patient
																			Name:</label>
																	</div> -->

																	<div  class="col-md-4 TextFont" style="margin-left: -13% ;margin-top: 10px;";
																		id="divbyName">
																		<input name="byName" type="text" id="byName"
																			class="typeahead form-control input-SmallText"
																			onkeyup="setAutoCompleteBlockPatsList(this.id,'auto')" placeholder="Name, MobileNo , AadharNo"/>
																		<!-- onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" /> -->
																	</div>
																		<div  id="otherDiv" class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 7px;display:none; ">
																		<input name="byName1" type="text" id="byName1"
																			class="typeahead form-control input-SmallText"
																			placeholder="Name"
																			onkeyup="autosuggesstionForOtherRecords(this.id,'auto')" />
																		<!-- onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" /> -->
																	</div>
																	<!-- <div class="col-md-1" style="margin-left: 0%;">
																		<label class="TextFont"
																			style="margin-left: -75%; margin-top: 0%;">Search By All:</label>
																	</div>

																	<div style="padding-left: 0%;" class="col-md-3">
																		<input name="byId" type="text" id="byId"
																			class="form-control input-SmallText"
																			onkeypress="commonFuntionForSearch(this.id,'auto')" />
																	</div> -->
																	 
																	<!-- <div class="col-md-1">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 3%;">Mobile
																			No:</label>
																	</div>

																	<div style="" class="col-md-2 ">
																		<input name="byMobile" type="text" id="byMobile"
																			class="form-control input-SmallText "
																			onkeypress="return SearchPatientIdOnEnter(event)"
																			maxlength="10" />
																	</div> --> 
																	<div style="text-align: center; margin-top: 10px;" class="col-md-1">
																	<label class="TextFont"
																			style="margin-left: -50%; margin-top: 3%;">Accurate
																			Result:</label>
																	</div>
																	<div class="col-md-1" style="text-align: center; margin-top: 8px;margin-left:-50px;">
																	
																		<input id="byid" type="checkbox"  onclick="accurate()" />
																	</div>

																<div class="col-md-2" style="margin-top: -9px;">

																	<label class="TextFont">From Date<b
																		style="color: red;">*</b></label> <input type="text" value=""
																		placeholder="From Date" name="date"
																		readonly="readonly"
																		onclick="displayCalendar(document.getElementById('inputFromDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"
																		id="inputFromDate">

																</div>


																<div class="col-md-2" style="margin-top: -9px;">

																	<label class="TextFont">To Date<b
																		style="color: red;">*</b>

																	</label> <input type="text" value="" placeholder="To Date"
																		name="date" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('inputToDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText" id="inputToDate">



																</div>

																<div id="patientDiv1" class="col-md-1" style=" margin-top: 40px; " >
																		<input type="button" value="Search"
																			class="btn btn-xs btn-primary" style="margin-top: -55px;"
																			onclick="setAutoCompleteBlockPatsList(this.id,'search')"  />
																	</div>
																	
																	<div id="otherDiv1" class="col-md-2" style="text-align: center; margin-top: 20px; display:none; ">
																		<input type="button" value="search"
																			class="btn btn-xs btn-primary" 
																			onclick="autosuggesstionForOtherRecords(this.id,'search1')"  />
																	</div>
																</div>


																<div class="col-md-12"
																	style="margin-top: 7px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 425px; maxheight: auto; border: 1px solid #b8b8b8;">

																		<table class="table table-condensed cf"
																			style="Width: 100%;">
																			<tbody id="container">
																			
																			</tbody>
																		</table>
																	</div>
																</div>



				</div>
			</div>

		</div>
	</div>
	<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>

	<%@include file="Footer.jsp"%>

	</div>
	</section>
	<input type="hidden" value="<%=session.getAttribute("userType")%>"
		id="userName" />
</body>
</html>