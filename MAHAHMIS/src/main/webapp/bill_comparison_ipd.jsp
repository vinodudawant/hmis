<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Bill Comparison Dashboard</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

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


<!---------------------------- Added by vinod ----------------------------------------->

<!-- for table auto complete-->
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.min.css"/>
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css"/>
<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css"/>
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-wizard/wizard.css"/>
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-wizard/wizard.css" />

<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script> 

<!---------------------------- /Added by vinod ----------------------------------------->


<!-- for Developers  -->

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/ehat_ipdbill.js"></script>
<script type="text/javascript" src="js/ehat_comparison.js"></script>
<script type="text/javascript" src="js/bed.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/ipd_bed_mgt.js"></script>



<!-- /for Developers  -->

<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	/* jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	}); */
	
	$(document).ready(function() {
		App.setPage("wizards_validations"); // Set current page
		App.init(); // Initialise plugins and elements
		FormWizard.init();
	});
</script>
<script type="text/javascript">
	onload = function() {

		
		
		$("#libillipd").addClass("anchorActive");
		
		
		//disppatientbillSearch("onload", "IPD");
		//setAutoPatientName("byName", "onload", "IPD_Bill_PatientDatabase");
		
		
	//	getIpdBillPatients("-",0);
	//	getallHallTypeForView('dummyParam');
		//getBedAva('allBed');
		
		getIpdBillPatientsForComparison("onload");
		getWardTypeList();
		
	}
	</script>
</head>

<body style="background: white ! important;">
	<section id="page">
		<c:if test="${sessionScope.userType != null}">


			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_bill.jsp"%>
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
												<%-- <li>Date : <%=todays_date%></li> --%>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><i class="fa fa-home"></i><a href="BillingDashboardForIPD.jsp">IPD Billing</a></li>
												<!-- <li>View Bill</li>
												<li><a href="BillingDashboardForIPD.jsp">IPD Bill</a></li> -->
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">
									<div style="font-weight: bold;" class="col-md-1">Search	By:</div>
															<div class="col-md-2">
																<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
																	<option value="1">UHID</option>
																	<option value="2">Patient Name</option>
																	<option value="3">Patient Mobile</option>
																	<!-- <option value="4">Patient AddharNo</option> -->
																</select>
															</div>

									<div style="" class="col-md-2-1 TextFont" id="divbyName">
										<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
											onkeyup="setAutoPatientNamecomparison(this.id,'prevIpd',event)" autocomplete="off"/>
									</div>
									<!-- <div class="col-md-1-1" style="margin-left: 0%;">
										<label class="TextFont"
											style="margin-left: 30%; margin-top: 3%;">Patient ID:</label>
									</div>

									<div style="padding-left: 0%;" class="col-md-2-1 ">
										<input name="byId" type="text" id="byId"
											class="form-control input-SmallText"
											onkeypress="return SearchPatientIdOnEnter(event,'IPDadvance')" />
									</div>
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
											onclick="disppatientbillSearch('onclick','IPD')" />
									</div> -->
									
									<!-- <div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
											onclick="autosuggesstionIpdBillPatTemp(this.id,'search')" />
									</div> -->
									
								                                 <div class="form-group col-md-3">
																<select	name='listmstr' class="input-group" id="wardTypeHall"
																	style='width: 100%' onchange="getWardTypeList()">
																	<option value="0">----Ward Type----</option>
																</select>
															</div>

									                             <div class="form-group col-md-3">
		
																 <select name='listmstr' class="input-group" id="wardName"
																	style='width: 100%' onchange="getIpdBillPatientsForComparison('onload')">
																	<option value="0">-- Ward Name --</option>
																</select>
		
							      </div>
								</div>

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body" id="ipdBillPatients1">
										<!-- <table class='table table-condensed cf '
											style="width: 1090px;">
											<thead class='cf'>
												<tr>
													<th class='col-md-1-1'><label class='TextFont'>#</label></th>
													<th class='col-md-4-1' style="padding-left: 10px;"><label
														class='TextFont' style="padding-left: 10px;">Patient
															Name</label></th>
													<th class='col-md-1-1'><label class='TextFont'
														style="padding-left: 10px;">Patient ID</label></th>
													<th class='col-md-1-1'><label class='TextFont'
														style="padding-left: 10px;">Admission No</label></th>
													<th class='col-md-1-1' style="padding-left: 28px;"><label
														class='TextFont'>View Bill</label></th>
												</tr>
											</thead>
										</table> -->
										<!-- <div id="BillContainer" class='col-sm-12-1'
											style="overflow-y: scroll; height: 425px; maxheight: auto; margin-top: -22px; border: 1px solid #ddd;">
										</div> -->
									</div>
								</div>
							</div>
						</div>

						<%@include file="footer_nobel.jsp"%>
					</div>
				</div>
				<div id="billDetails" style="display: none;"></div>
			</div>
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
	<input type="hidden" id="pageFrom" value=<%=request.getParameter("pageFrom")%>>
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input id="hallDetailDiv" type="hidden" /> <input id="allBedObj" type="hidden" />
</body>
</html>
