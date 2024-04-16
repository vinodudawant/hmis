<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Formula Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- JQUERY -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->
<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/formula.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 7/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- <script src="js/UserAccess.js"></script> -->
<script src="js/doctorTypeMaster.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		//getAllModule();

	});
</script>
<script type="text/javascript">
	onload = function() {
		getAutoCompleteForFormulaMaster("");
		ViewlabtestList("onload");
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

				<%@include file="left_menu_admin.jsp"%>
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
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="hospital_info.jsp">Administrator</a></li>
												<li><a href="formula_master.jsp">Formula Master</a></li>
												<!-- <li>Module Master</li> -->
												<div class="pull-right">
													<button class="btn btn-xs btn-success editChargesMaster"
														id="saveBtn" value="Save Now" data-toggle="tooltip"
														data-placement="left" title="Save Master"
														onclick="saveFormula()">
														<i class="fa fa-save"></i>
													</button>
													<button class="btn btn-xs btn-danger" data-toggle="tooltip"
														data-placement="left" title="Refresh"
														onclick="resetFormulaMaster()">
														<i class="fa fa-refresh"></i>
													</button>
												</div>
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->

									<div class="col-md-12-1">
									<div style="" class="col-md-1-1">
									<label class="TextFont" style="margin-left: 10%;margin-top:3%;font-size: 11px;">Search By:</label></div>
									<div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%;margin-top:3%;">Formula Name:</label></div>

									<div style="margin-top: 0px;" class="col-md-2-1 TextFont" id="divbyName">
									
									
									<input autocomplete="off" class="form-control input-SmallText ui-autocomplete-input col-md-12-1" value="" onkeyup="getAutoCompleteForFormulaMaster(this.id,'search')" id="byName">
									</div>
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search" class="btn btn-xs btn-primary" id="searchDistrict"
											onclick="getAutoCompleteForFormulaMaster(this.id,'search')" />
									</div>
								</div>
									<div class='divide-20'></div>
								<div class="panel panel-default">
									<div class="panel-body" style="height: 565px;">
										<div class="col-md-12-1">
											<div class="col-md-4-1" style="height: 450px; margin-top: 2px;">

												<div style='height: 121%; border: 1px solid #ddd;'>
													<div style='padding-top: 0%; padding-left:2px;'>
														<div class="center">
															<h3 id='title' style="font-size: 30px;">Formula Master</h3>
															
														</div>
														
														<div class='form-group col-md-12'>
															<div class='divide-10'></div>
															<div class="col-md-4">
																<label >Formula Name<b
																style='color: red; '>*</b></label> 
															</div>
															<div class="col-md-8">
																<input 
																id='formulaName' type='text' placeholder='Formula Name'
																class='form-control ' style="width: 99%;height: 25px;font-size: 15px;"
																required='true' />
															</div>
														</div>
														
														<div class='form-group col-md-12'>
															<div class='divide-20'></div>
															<div class="col-md-4">
																<label >Formula Unit<b
																style='color: red; padding-left: 3px;'>*</b></label> 
															</div>
															<div class="col-md-8">
																<input 
																id='txtFormulaUnits' type='text' placeholder='Formula Unit'
																class='form-control ' style="width: 99%;height: 25px;font-size: 15px;"
																required='true' />
															</div>
														</div>
														<div class='divide-10'></div>
														<div class='divide-20'></div>
														<div class='divide-20'></div>
													</div>
													<!-- inner body starts here -->
													<div class='divide-20'></div>
													<div style='height: 36%;width:90%;margin-left:5%; border: 1px solid #ddd;border-radius: 6px;'>
														<div class='form-group Remove-Padding col-md-12-1'>
														<div class='divide-10'></div>
														<label ><font size="+1">Constants : </font></label>
														<div class='divide-20'></div>
															<div class="col-md-3">
																<button style="width: 55px;" class="btn btn-md btn-primary " id="wt" 
																	value="Wt" data-toggle="tooltip" data-placement="top"
																	title="Weight(kgs)" onclick="appendIntoFormula('wt')">WEIGHT</button>
															</div>
															<div class="col-md-3">

															<button style="width: 55px;" class="btn btn-md btn-primary"
																id="ht" value="ht" data-toggle="tooltip"
																data-placement="top" title="Height(CM)"
																onclick="appendIntoFormula('ht')">
																HEIGHT
																
															</button></div>
															<div class="col-md-3">
															<button style="width: 55px;" class="btn btn-md btn-primary "
																id="age" value="age" data-toggle="tooltip"
																data-placement="top" title="Age(Yrs)"
																onclick="appendIntoFormula('age')">
																AGE
																
															</button></div>
															
																	<div class="col-md-12" id="docConsultingDiv" style="margin-top:28px">
																<label ><font size="+1">Test Name </font></label>
																<div class='divide-20'></div>
																<div id="testid" style="display: none;" ></div>
																	<div id="testvalues" style="display: none;"></div>

																									<select  name="labname" id="testname"
																			style="width: 200px"
																			onchange='appendIntoFormula("lab")'>
																								
																									</select>
																							

																						</div>
														
													<!-- 					<div class="col-md-3">
															<button style="width: 55px;" class="btn btn-md btn-primary "
																id="age" value="age" data-toggle="tooltip"
																data-placement="top" title="WBC"
																onclick="appendIntoFormula('WBC')">
                                                         WBC													
															</button></div>
															
															
														</div>
															<div class='form-group Remove-Padding col-md-12-1'>
															<div class='divide-20'></div>
															<div class='divide-10'></div>
																
																	<div class="col-md-4">
															<button  class="btn btn-md btn-primary "
																id="age" value="age" data-toggle="tooltip"
																data-placement="top" title="Total W.B.C. Count"
																onclick="appendIntoFormula('TWBC')">
																Total W.B.C. Count
																
															</button></div>
																		<div class="col-md-4">
															<button  class="btn btn-md btn-primary "
																id="age" value="age" data-toggle="tooltip"
																data-placement="top" title="Platelet Count"
																onclick="appendIntoFormula('PC')">
                                                           Platelet Count																
															</button></div>
																		<div class="col-md-4">
															<button  class="btn btn-md btn-primary "
																id="age" value="age" data-toggle="tooltip"
																data-placement="top" title="R.D.W. (SD)"
																onclick="appendIntoFormula('SD')" style="margin-left:-23px">
                                                          R.D.W. (SD)															
															</button></div> -->
															
															</div>
													
														<div class='form-group Remove-Padding col-md-12-1'>
															<div class='divide-20'></div>
															<div class='divide-10'></div>
															<!-- 	<div class="col-md-3">
															<button onclick="appendIntoFormula('HB')" title="" data-placement="top" data-toggle="tooltip" value="age" id="age" class="btn btn-md btn-primary " style="width: 72px;" data-original-title="Haemoglobin">
																Haemoglobin
																
															</button></div>	 -->												
															
															<div class='divide-20'></div>
															<label ><font size="+1">Operators : </font></label>
															<div class='divide-10'></div>
															<div>
																
																<button type="button" value="+"
																	style="margin: 3px; height: 30px; width: 35px;"
																	title="Plus" onclick="appendIntoFormula('+')">
																	<i class="fa fa-plus"></i>
																</button>

																
																<button type="button" value="-"
																	style="margin: 3px; height: 30px; width: 35px;"
																	title="Minus" onclick="appendIntoFormula('-')">
																	<i class="fa fa-minus"></i>
																</button>


																<button type="button"
																	style="margin: 3px; height: 30px; width: 35px;"
																	value="*" title="Multiply" onclick="appendIntoFormula('*')">
																	<i class="fa fa-times"></i>
																</button>

																<button type="button"
																	style="margin: 5px; height: 30px; width: 35px;"
																	value="/" title="Divide" onclick="appendIntoFormula('/')">
																	<i class=""><b>/</b></i>
																</button>

																<button type="button"
																	style="margin: 3px; height: 30px; width: 35px;"
																	value="(" title="Open Parentheses"
																	onclick="appendIntoFormula('(')">
																	<i class=""><b>(</b></i>
																</button>

																<button type="button"
																	style="margin: 3px; height: 30px; width: 35px;"
																	value=")" title="Close Parentheses"
																	onclick="appendIntoFormula(')')">
																	<i class=""><b>)</b></i>
																</button>


																<button type="button"
																	style="margin: 3px; height: 30px; width: 35px;"
																	value="^" title="Power" onclick="appendIntoFormula('^')">
																	<i class="fa fa-chevron-up"></i>
																</button>
															</div>
															<div>
																
																<button type="button" value="sin()"
																	style="margin: 2px; height: 30px; width: 45px;"
																	title="Sine" onclick="appendIntoFormula('sin()')">
																	<i class="">Sin</i>
																</button>

																
																<button type="button" value="cos()"
																	style="margin: 2px; height: 30px; width: 45px;"
																	title="Cosine" onclick="appendIntoFormula('cos()')">
																	Cos
																</button>


																<button type="button"
																	style="margin: 2px; height: 30px; width: 45px;"
																	value="tan()" title="Tangent" onclick="appendIntoFormula('tan()')">
																	Tan
																</button>
																
																<button type="button"
																	style="margin: 2px; height: 30px; width: 45px;"
																	value="log2()" title="Log2" onclick="appendIntoFormula('log2()')">
																	Log2
																</button>
																
																<button type="button"
																	style="margin: 2px; height: 30px; width: 45px;"
																	value="log10()" title="Log10" onclick="appendIntoFormula('log10()')">
																	Log10
																</button>
																
																<button type="button"
																	style="margin: 2px; height: 30px; width: 45px;"
																	value="sqrt()" title="sqrt" onclick="appendIntoFormula('sqrt()')">
																	Sqrt
																</button>

																<button type="button"
																	style="margin: 5px; height: 30px; width: 60px;"
																	value="Fact" title="Factorial" onclick="appendIntoFormula('!')">
																	<i class=""><b>!</b></i>
																</button>

																<button type="button"
																	style="margin: 5px; height: 30px; width: 45px;"
																	value="(" title="exponential "
																	onclick="appendIntoFormula('2.718')">
																	<i class=""><b>e</b></i>
																</button>

																<button type="button"
																	style="margin: 5px; height: 30px; width: 45px;"
																	value=")" title=""
																	onclick="appendIntoFormula('3.141')">
																	<i class=""><b>π</b></i>
																</button>


																<button type="button"
																	style="margin: 5px; height: 30px; width: 45px;"
																	value="ln" title="Natural logarithm ...eg.ln(x)" onclick="appendIntoFormula('ln')">
																	<i class=""><b>ln</b></i>
																</button>
															</div>

														</div>
													</div>
													<!-- inner body ends here -->
													
													<!-- inner body starts here -->
													
													<div
														style='height: 38%; width: 90%; margin-left: 5%; border: 1px solid #ddd;border-radius: 6px;'>
														<div class='divide-20'></div>
														<label><font size="+2">=</font></label><input type="text"
																id="txtFormula" onkeypress="return validateNumOnly(event);"
															style="height: 50px; width: 90%; margin-left: 1%;font-size: 20px;">
													</div>
													<!-- inner body ends here -->
												</div>

											</div>
											<div class="divide-10"></div>
											<div class="col-md-8-1"
												style="max-height: auto; padding-left: 1px;">

												<div class='col-sm-12-1'>
													<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'
														id="doctorMasterPojo">
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Formula Name</div></th>		
																<th class='col-md-3-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Formula</div></th>
																<th class='col-md-2-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Units</div></th>
															
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Edit</div></th>
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table>
												</div>
												<div
													style="width: 55%; margin-left: 3%; float: left; height: 100%;">

												</div>

												<div class='col-sm-12-1'
													style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 518px; max-height: auto;'>
													<table class='table table-striped table-condensed cf'>
														<tbody id="doctorMasteredit">



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

				<input id="formulaId" type="hidden" value=0 />
				<div id="showSubModulesPopup" class="modal fade in">
					<!--End #showSubModulesPopup Popup -->
					<input id="objUserAccess" type="hidden" value="" />
				</div>
			</div>
		</c:if>
	</section>
	<%@include file="Footer.jsp"%>
	<script src="ehat-design/js/script.js"></script>
		<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	
</body>
</html>