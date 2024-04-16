<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Prescription Instruction</title>
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

<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>


<!-- Auto-Suggestion 2/Oct/2014  Touheed-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


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
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 16/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("TestManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		$("#tesman").addClass("anchorActive");

		//Touheed 	06-Oct-15 
		//fectchAllPrescriptionInstruction("Both");
		 searchPrescriptionInstruction("onload"); 

	}
</script>

</head>
<body>
<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="menu_DoctorDesk.jsp"%>
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
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="OPDDoctorsDeskDashboard.jsp">DoctorsDesk</a></li>
												<li><a href="dosetypeMaster.jsp">Medication Master</a></li>
												<li><a href="prescription_Instruction.jsp">Prescription
														Instruction</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common Code-->

								<!-- 	<div class="col-md-12-1">


									<div style="" class="col-md-1-1">
										<label class="TextFont"
											style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Prescription_Instruction:</label>
									</div>



								</div> -->

								<div class="panel panel-default">
									<div class="modal-header"
										style="padding-top: 0px; padding-bottom: 0px;">
										<h4 id="testHead">Prescription Instruction</h4>
									</div>

									<div class="panel-body">
										<div id="SpecialDiscountContent"
											style='height: 460px; margin-top: 0%; display: none; padding-left: 2%; text-align: left; border: 1px solid #ddd;'
											class='col-sm-4-1'></div>
										<div style="margin-left: -4%; float: left;"
											class='col-sm-12-1'>
											<!-- data table -->
											<div class="col-md-12-1"
												style="height: 5%; max-height: auto; margin-left: 4%;">

												<div style="margin-top: 15px; padding-left: 0%;">

													<label style="margin-top: -5px; padding: 0px;"
														class="form-group Remove-Padding col-md-3">
														English: <b style="color: red; padding-left: 1px;">*</b> <input
														id="englishInstruction" type="text"
														placeholder="English Instruction">
													</label> <label style="margin-top: -5px; padding: 0px;"
														class="form-group Remove-Padding col-md-2"> Hindi:
														<input id="hindiInstruction" type="text"
														placeholder="Hindi Instruction">
													</label> <label style="margin-top: -5px; padding: 0px;"
														class="form-group Remove-Padding col-md-3">
														Marathi: <input id="marathiInstruction" type="text"
														placeholder="Marathi Instruction">
													</label> <label style="margin-top: -5px; padding: 0px;"
														class="form-group Remove-Padding col-md-3">
														Unicode: <b style="color: red; padding-left: 1px;"></b> <input
														id="unicodeInstruction" type="text"
														placeholder="Unicode Instruction">
													</label>
													<label class="form-group Remove-Padding col-md-2" style="margin-top: -5px; padding: 0px;">
														Ref To: <b style="color: red; padding-left: 1px;"></b> 
  																<select style="width: 60%" name="select" id="selRefTo">
																	<option value="select">-Select-</option>
																	<option value="IPD">IPD</option>
																	<option value="OPD">OPD</option>
																	<option value="Both">Both</option> 
																</select>
																
													</label>
													
													
													<label style="margin-top: -5px; padding: 0px;"
														class="form-group Remove-Padding col-md-0">
														<button class="btn btn-xs btn-success editUserAccess"
															onclick="savePrescriptionInstruction()" type="submit" disabled="disabled">Save</button>
													</label>

												</div>

												<div class="col-md-12-1" style="margin-top: 30px;">
													<div class="col-md-1-1">
														<label class="TextFont"
															style="margin-left: 10%; margin-top: 3%; font-size: 11px;">
															Search By: </label>
													</div>
													<div class="col-md-1-1">
														<label class="TextFont" 
															style="margin-left: 10%; margin-top: 3%;">
															Instruction Id: </label>
													</div>
													<div id="divbyName" class="col-md-2-1 TextFont" style="">
														<input id="byId"
															class="typeahead form-control input-SmallText"
															type="text" name="byName" placeholder="Instruction ID" autocomplete="off">
													</div>

													<div class="col-md-1">
														<b>OR</b>
													</div>

													<div class="col-md-1-1">
														<label class="TextFont"
															style="margin-left: 10%; margin-top: 3%;">
															Instruction Name:</label>
													</div>
													<div id="divbyName" class="col-md-2-1 TextFont" style="">
														<input id="byName"
															class="typeahead form-control input-SmallText"
															type="text" name="byName" placeholder="Instruction Name" autocomplete="off">
													</div>
													<div class="col-md-1-1">
														<input id="searchTest" class="btn btn-xs btn-primary"
															type="button" onclick="searchPrescriptionInstruction()"
															value="search">
													</div>
												</div>

												<div class="col-md-12-1"
													style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
													<label
														style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
														id="enableAddUpdatePrescriptionInstructionLabel">
														<i class="fa fa-plus"></i> New
													</label><label
														style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
														id="editPrescriptionInstructionLabel12" onclick="editPrescriptionInstruction()"> <i
														class="fa fa-edit"></i> Edit
													</label><label
														style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
														id="deletePrescriptionInstructionLabel1" onclick="deletePrescriptionInstruction()"> <i
														class="fa fa-trash-o"></i> Delete
													</label>
												</div>
												<div class="col-md-12-1"
													style="margin-top: 0px; overflow-y: scroll; height: 350px; maxheight: auto; border: 1px solid #b8b8b8;">
													<div id="packageDiv"></div>
												</div>

											</div>

											<!-- data table -->
										</div>
									</div>
									<div id="packageDivAjax" style="display: none;"></div>

								</div>

								<!-- /panel-body -->
							</div>
							<!-- /panel -->



						</div>
						<!-- /content -->
					</div>
					<!-- /row -->
				</div>
				<!-- /container -->
			</div>
			<!-- /main-content -->

			<!-- /outer -->
			<input type="hidden" id=presciptionInstructionId value="0" />


			<!-- for temparory storing data 	Touheed 07-Oct-2015 -->

			<input type="hidden" id=englishInstructionHide value="0" />
			<input type="hidden" id=hindiInstructionHide value="0" />
			<input type="hidden" id=marathiInstructionHide value="0" />

			<div id="medicineDetails" style="display: none;"></div>

		</c:if>
	</section>

</body>
</html>