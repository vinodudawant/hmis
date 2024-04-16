<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Operation Management</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

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

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/Administrator.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<!-- /for Developers  -->
<script type="text/javascript"
	src="ehat-design/js/select2/select2.min.js"></script>

<script type="text/javascript"
	src="ehat-design/js/select2/select2.min.js"></script>
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>


<script type="text/javascript">
	onload = function() {
		$("#opeman").addClass("anchorActive");
		$("#opgrade").val('1');
		//getHallTypeGrpWisProCharge();
		fetchHallTypeProchargeOpration();
		//getoperation();
		//fetchDepartmentForOTSchedule();
		fetchDepartmentForOTSchedule()
		fetchprocedureCatsedradmin();
		getAllChargeslot();
	}
</script>

</head>

<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_admin.jsp"%>
				<!--End Left Menu -->
				<%
					java.util.Calendar currentDate = java.util.Calendar.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li>Operation Management</li>
												<div class="li pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
														data-toggle="tooltip" data-placement="left" title="Save"
														onclick="saveGroupCatWiseProCharges();"
														disabled="disabled">
														<i class="fa fa-save"></i>
													</button>
													<!-- <button class="btn btn-xs btn-warning">Print</button>
												<button class="btn btn-xs btn-danger">Discard</button> -->
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<div class="panel panel-default">
									<div class="panel-body">

										<div id="OperationContent">

											<div class="form-group Remove-Padding col-md-11-1">
												<div class="divide-10"></div>
												<div class="divide-10"></div>
												<div class="TextFont col-md-1-1">Procedure Category:</div>
												<div class="col-md-2-1">
													<div class="form-group">
														<div class="col-md-12">
															<select id='opgrade' name='opgrade' class="col-md-8"
																style="width: 180px; margin-top: 9px; margin-left: -25px">
																<!-- <option value='select'>Select</option> -->
																<!-- <option value='1'>1</option>
													<option value='2'>2</option>
													<option value='3'>3</option>
													<option value='4'>4</option>
													<option value='5'>5</option>
													<option value='6'>6</option>
													<option value='7'>7</option>
													<option value='8'>8</option>
													<option value='9'>9</option>
													<option value='10'>10</option>
													<option value='11'>11</option>
													<option value='12'>12</option>
													<option value='13'>13</option>
													<option value='14'>14</option>
													<option value='15'>15</option>
													<option value='16'>16</option>
													<option value='17'>17</option>
													<option value='18'>18</option>
													<option value='19'>19</option>
													<option value='20'>20</option>
													<option value='21'>21</option>
													<option value='22'>22</option>
													<option value='23'>23</option>
													<option value='24'>24</option>
													<option value='25'>25</option>
													<option value='26'>26</option>
													<option value='27'>27</option>
													<option value='28'>28</option>
													<option value='29'>29</option>
													<option value='30'>30</option>
													<option value='12A'>12A</option>
													<option value='12B'>12B</option>
													<option value='Special'>Special</option> -->
															</select>
														</div>
													</div>
												</div>
												<div class="TextFont col-md-1-1" style="margin-left: 14px">Sponsor:</div>
												<div class="form-group col-md-2" id="chargesSlaveDiv">
													<div class="form-group">
														<div class="col-md-12">
															<select class="col-md-8" name="listmstr"
																id="listmstr_select_chargesinfo"
																style="width: 180px; margin-top: 9px; margin-left: -29px"
																onchange="setDyanamicDivForChargesinfo('dynamicItemsinfo',this.id)">
																<option id="firstElmts2">--- Select Charges
																	Info ---</option>
															</select>

														</div>
													</div>

												</div>
												<div class="TextFont col-md-2-1" style="margin-left: 35px">Procedure
													Group:</div>

												<div class="col-md-3-1" style="margin-left: -9px">
													<select name="" id="department"
														class="form-control input-SmallText TextFont"
														onchange=" featchGrpCatWiseProChargeAdmin()">
														<option value="0">-SELECT-</option>
													</select>
												</div>


												<div class="divide-10"></div>

												<!-- <div id='hallWiseCharge'></div> -->

												<div class="col-md-12 panel-body"
													style="height: 500px; overflow: auto;">
													<table id="fixed_header"
														class="table table-striped table-bordered">
														<thead id="ehatTHead" class="fixedheaderdemo">
															<tr>
																<th class="col-md-1 center">Hall Type</th>
																<th class="col-md-2 center">Surgeon Charges</th>

															</tr>
														</thead>
														<tbody id="hallwisecharges" style="height: 100px;">
														</tbody>
													</table>
												</div>


												<div style='float: right;'>
													<input id='queryType' type='hidden' />
												</div>

											</div>

										</div>
										<!-- End class="panel-body" -->
									</div>
								</div>
								<!-- End id="content" -->
							</div>
							<!-- End class="row" -->
						</div>
						<!-- class="container" -->
					</div>
					<!-- id="main-content" -->
				</div>
				<!-- id="outer" -->

				<div><%@include file="Footer.jsp"%></div>
				<div id="operationDataDiv" style="display: none;"></div>
				<div id="divfetchHallType" style="display: none;"></div>
				<input type="hidden" id="count" value="">
		</c:if>
	</section>
</body>
</html>














<%-- 




<body>
	<c:if test="${ sessionScope.userType != null }">
		<div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div>
		<div id="outer">
			<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>

					<div
						style="width: 20%; float: right; padding-left: 20%; padding-top: 2%;">
						<div
							style="width: 92%; float: right; padding-top: 3%; padding-right: 0%">
							<div style="padding-right: 2%; width: 35%;">
								<input
									style='font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;'
									type='button' value='Save Now'
									onclick='saveGrpCatWiseProCharge()' />
							</div>
						</div>
					</div>

				</div>
			</div> -->
			<%@include file="Menu_Header.jsp"%>
			<div id="right" style="background: white; margin-top: 17px;">
				<div id="leftContent" class="sidebar"
					style="height: 100%; margin-top: 1px; margin-bottom: 5px;">
					<%@include file="left_menu_admin.jsp"%>
				</div>
				<div id="rightContent" style="height: 100%;">
					<div style="width: 100%; height: 1%; background-color: #85a7d4;"></div>

					<div style="width: 100%; height: 99%;">
						<div id="rightContActual">

							<div id="OperationContent"
								style='width: 75%; height: 490px; margin-top: 0%; border: 1px solid #436a9d;'>
								<div style='width: 100%; padding-top: 0%; padding-left: 5%'>
									<!-- <div style='width: 95%;'>
										<h2>Group Wise Procedure Charges</h2>
									</div>
									<div style='width: 50%; padding-top: 2%;'>
										<div style='width: 25%; padding-right: 6%;'>Procedure
											Group</div>
										<div style='width: 60%;'>
											<select id='opstate' name='opstate' style='width: 100%;'
												onchange="featchGrpCatWiseProCharge()"><option
													value='select'>Select</option>
												<option value='1'>BARIATRIC</option>
												<option value='2'>CARDIO THORACIC</option>
												<option value='3'>ENT</option>
												<option value='4'>GENERAL</option>
												<option value='5'>MINOR OT</option>
												<option value='6'>NEUROSURGERY</option>
												<option value='7'>OBSTETRICS/GYNAECOLOGY</option>
												<option value='8'>ONCOLOGY</option>
												<option value='9'>OPHTHALMOLOGY</option>
												<option value='10'>ORAL AND MAXILLOFACIAL</option>
												<option value='11'>ORTHOPAEDIC</option>
												<option value='12'>PAEDIATRIC</option>
												<option value='13'>PAEDIATRIC ENDOSCOPIC</option>
												<option value='14'>PAIN MANAGEMENT</option>
												<option value='15'>PLASTIC & RECONSTRUCTIVE</option>
												<option value='16'>SPINE</option>
												<option value='17'>VASCULAR</option>
												<option value='18'>UROLOGY SURGERY</option>
											</select>
										</div>
										<div style='width: 1%; color: red; padding-left: 3%'>
											<b>*</b>
										</div>
									</div> -->
									<div style='width: 25%; padding-top: 2%; padding-left: 0%;'>
										<div style='width: 55%; padding-right: 6%;'>Procedure
											Category</div>
										<div style='width: 35%;'>
											<select id='opgrade' name='opgrade' style='width: 100%;'
												onchange="featchGrpCatWiseProCharge()"><option
													value='select'>Select</option>
												<option value='1'>1</option>
												<option value='2'>2</option>
												<option value='3'>3</option>
												<option value='4'>4</option>
												<option value='5'>5</option>
												<option value='6'>6</option>
												<option value='7'>7</option>
												<option value='8'>8</option>
												<option value='9'>9</option>
												<option value='10'>10</option>
												<option value='11'>11</option>
												<option value='12'>12</option>
												<option value='13'>13</option>
												<option value='14'>14</option>
												<option value='15'>15</option>
												<option value='16'>16</option>
												<option value='17'>17</option>
												<option value='18'>18</option>
												<option value='19'>19</option>
												<option value='20'>20</option>
												<option value='21'>21</option>
												<option value='22'>22</option>
												<option value='23'>23</option>
												<option value='24'>24</option>
												<option value='25'>25</option>
												<option value='26'>26</option>
												<option value='27'>27</option>
												<option value='28'>28</option>
												<option value='29'>29</option>
												<option value='30'>30</option></select>
										</div>
										<div style='width: 1%; color: red; padding-left: 3%'>
											<b>*</b>
										</div>
									</div>
									<div style='width: 95%; padding-top: 3%;' id='hallWiseCharge'></div>
									<div style='float: right;'>
										<input id='queryType' type='hidden' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="operationDataDiv" style="display: none;"></div>
			<div id="divfetchHallType" style="display: none;"></div>
			<%@include file="Footer.jsp"%></div>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html> 




--%>

















