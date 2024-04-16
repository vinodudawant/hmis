<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>IVF FM</title>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- TYPEHEAD -->
<script type="text/javascript"
	src="ehat-design/js/typeahead/typeahead.min.js"></script>

<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />

<!-- CUSTOM SCRIPT -->
<script src="ehat-design/js/script.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- JQUERY files import start -->

<!-- css for developer -->
<link rel="stylesheet" type="text/css"	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"	href="ehat-design/alertify/alertify.default.css" />
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

<!-- chart -->
<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css"	type="text/css" />
<script type="text/javascript" src="js/studyChart/highcharts.js"></script>
<script type="text/javascript" src="js/validate.js"></script>



<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/ivf_fm.js"></script>
<script type="text/javascript" src="js/studyChart/studyChart.js"></script>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="left_menu_ivf.jsp"%>

			<!-- /SIDEBAR -->



			<!-- PAGE -->


			<div id="main-content">
							
				<!-- /SAMPLE BOX CONFIGURATION MODAL FORM-->
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="index.html">Home</a>
											</li>

											<li><a href="ivf_fm.jsp">IVF FM</a></li>
										</ul>

										<!-- /BREADCRUMBS -->
										<div class="clearfix"></div>
									</div>
								</div>
							</div>

							

							<div class="row">
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="header-record-search">
												

												<div class="clearfix"></div>
											</div>

											<div class="panel panel-primary">
												<div class="panel-heading">FM  :</div>
												<div class="panel-body">
												<!--  Start FM Data-->
																	<div class="col-md-1-1 li pull-right">
																		<!-- <button type="button" id="saveStudyRecordbtn" onclick="saveStudyRecord()" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-success editUserAccess" data-original-title="Save" style="margin-left: 0px;margin-top: 3px;" disabled="disabled">
																						<i class="fa fa-save"></i>
																					</button> -->
																		<button type="button" id="closeStudyRecordtbn"
																			onclick="closeStudyRecord()" data-placement="down"
																			value="Close"
																			class="btn btn-xs btn-primary editUserAccess"
																			data-toggle="tooltip"
																			data-original-title="Close Study"
																			Style="margin-top: 3px;" disabled="disabled">
																			<i class="fa fa-times"></i>
																		</button>
																		<button id="studyPrintBtn" data-original-title="Print"
																			data-toggle="tooltip" data-placement="left" title=""
																			onclick="printStudyData('PRINT');"
																			class="btn btn-xs btn-warning"
																			style="margin-top: 3px;">
																			<i class="fa fa-print"></i>
																		</button>
																		<button class="btn btn-xs btn-danger"
																			id="closePopUpbtn" onclick="closePopUpbtn()"
																			aria-label="Close" data-dismiss="modal" type="button"
																			style="margin-top: 3px;">
																			<i class="fa fa-times"></i>
																		</button>
																	</div>
																	<div class="clearfix"></div>

																	<div class="row">
																		<div class="col-md-4 col-xs-11">
																			<h3 class="modal-title" id="myModalLabel">Follicular
																				Study Table</h3>
																		</div>
																		<br>
																		<br>
																		<div class="divide-20"></div>
																		<div id="lmpDateDiv" class="col-md-3 col-xs-11">
																			<h5>LMP Date:</h5>
																			<input type="text"
																				class="form-control input-SmallText TextFont"
																				placeholder="LMP Date" name="lmpdt" id="lmpdt" onclick="displayCalendar(document.getElementById('lmpdt'),'dd/mm/yyyy',this)" readonly="readonly">
																		</div>
																	</div>
																</div>


																<div class="modal-body"
																	class="panel panel-info col-md-12-1">
																	<div class="panel panel-default">
																		<div class="panel-body" style="padding-top: 25px">
																			<div class="row">
																				<div class="col-md-6">
																					<div class="row">
																						<input type='hidden'
																							id="masterFollicularStudyIdIvf" value='0' />
																						<div class="form-group col-md-3">
																							<label>Age</label> <input type="text"
																								class="form-control input-SmallText TextFont"
																								placeholder="Age" name="age" id="ageF" value=""
																								style="width: 100%">
																						</div>

																						<div class="form-group col-md-3">
																							<label>Weight</label> <input type="text"
																								class="form-control input-SmallText TextFont"
																								placeholder="Weight" name="pWeight" id="pWeight"
																								value="" style="width: 100%" />
																						</div>

																						<div class="form-group col-md-3">
																							<label>Height</label> <input type="text"
																								class="form-control input-SmallText TextFont"
																								placeholder="Height" name="height" id="pHeight"
																								onkeyup="finalCalculatedBMIForFM()" value=""
																								style="width: 100%" />
																						</div>

																						<div class="form-group col-md-3">
																							<label>BMI</label> <input type="text"
																								class="form-control input-SmallText TextFont"
																								placeholder="BMI" name="bmi" id="bmi" value=""
																								style="background: blue; width: 100%" disabled>
																						</div>

																						<div class="form-group col-md-3">
																							<label>AFC</label> <input type="text"
																								class="form-control input-SmallText TextFont"
																								placeholder="AFC" name="afc" id="afc" value=""
																								style="width: 100%">
																						</div>

																						<div class="form-group col-md-3">
																							<label>RX</label> <input type="text"
																								placeholder="Rx" name="Rx" id="Rx" value=""
																								class="form-control input-SmallText TextFont"
																								style="width: 100%">
																						</div>

																						<div class="form-group col-md-3">
																							<label>HSG</label> <input type="text"
																								placeholder="HSG" name="hsg" id="hsg" value=""
																								class="form-control input-SmallText TextFont"
																								style="width: 100%">
																						</div>

																						<div class="form-group col-md-3">
																							<label>HSA</label> <input type="text"
																								placeholder="HSA" name="hsa" id="hsa" value=""
																								class="form-control input-SmallText TextFont"
																								style="width: 100%">
																						</div>

																						<div class="col-md-9"
																							style="margin-top: 1px; margin-bottom: 20px;">
																							<label>Protocol</label>
																							<textarea class="form-control"
																								placeholder="Protocol" name="prtocolof"
																								id="protocoloF" rows="5" style="width: 100%"></textarea>
																						</div>
																						
																						

																						<div class="col-md-3">
																							<button type="button" id="saveStudyRecordbtn"
																								onclick="saveStudyRecord()"
																								data-placement="left" data-toggle="tooltip"
																								class="btn btn-xs btn-success editUserAccess"
																								data-original-title="Save"
																								style="margin: 30px 0 0" disabled="disabled">
																								<i class="fa fa-save"></i>
																							</button>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="col-sm-12-1 dynamicstructurescroll">
																						<table class="table table-bordered">
																							<thead>
																								<tr>
																									<th>#</th>
																									<th>Date</th>
																									<th>Age</th>
																									<th>Weight</th>
																									<th>Height</th>
																									<th>BMI</th>
																									<th>AFC</th>
																									<th>RX</th>
																									<th>HSG</th>
																									<th>HSA</th>
																								</tr>
																							</thead>
																							<tbody id="tableBody">
																							</tbody>
																						</table>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>


																	<!-- <div  id="basicStudyInfoTable" style="height: 100px;" >
																	<input type='hidden' id="masterFollicularStudyId" value='' />
																			<div class="col-md-12" style="margin-top: 25px;margin-bottom:20px;">
																				<div class="col-md-3">
																					<label>Age</label>
																					<input type="text"  class="form-control input-SmallText TextFont"	placeholder="Age" 		name="age" 		id="ageF" 		value="" style="margin-left:-5px;">		
																				</div>
																				
																				<div class="col-md-3">
																					<label>Weight</label>
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="Weight"	name="pWeight"	id="pWeight" 	value="" />	
																				</div>
																				
																				<div class="col-md-3">
																					<label>Height</label>
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="Height"	name="height" 	id="pHeight"  onkeyup="finalCalculatedBMIForFM()"	value="" />
																				</div>
																				
																				<div class="col-md-3">
																					<label>BMI</label>
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="BMI" 		name="bmi" 		id="bmi" 		value="">		
																				</div>
																				
																				
																			</div>
																			
																	<div class="col-md-12" style="margin-top: 1px;margin-bottom:20px;">
																				
																				<div class="col-md-3">
																					<label>AFC</label>
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="AFC" 		name="afc" 		id="afc" 		value="">		
																				</div>
																				<div class="col-md-3">
																					<label>RX</label> <input type="text" placeholder="Rx"
																						name="Rx" id="Rx" value=""
																						class="form-control input-SmallText TextFont">
																				</div>


																			<div class="col-md-3">
																				<label>HSG</label> <input type="text" placeholder="HSG"
																					name="hsg" id="hsg" value=""
																					class="form-control input-SmallText TextFont">
																			</div>


																			<div class="col-md-3">
																				<label>HSA</label> <input type="text" placeholder="HSA"
																					name="hsa" id="hsa" value="" class="form-control input-SmallText TextFont">
																			</div>
																	</div>
																	</div>
																	<br><br>
																	<div class="col-md-12" style="margin-top: 1px;margin-bottom:20px;">
																		<div class="col-md-3">
																				<label>Protocol</label>
																				<textarea placeholder="Protocol" name="prtocolof"
																					id="protocoloF" style="height: 85px;width: 290px"></textarea>
																			</div>
																	</div>
																		<br><br> -->
																		
																	<!-- <div class="modal-body" class="panel panel-info col-md-12-1"> -->
																	<div style="margin-top: 10px;">
																		<div class="panel-body" id="studyModalTableIVFF"
																			style="margin-bottom: -4%;">
																			<!-- <div class="pull-right"><input type="button" value="Save" onclick="saveFollicualrStudyBasicInfo()"  id="createdivF" class="btn btn-xs btn-success editUserAccess"  style="margin-top: -33px"> </div> -->
																			<div class="pull-right" style="margin: 0 0 20px">
																				<input type="button" value="+"
																					onclick="createRowForFollicular()"
																					id="savebasicinfoF" class="btn btn-xs btn-success" />
																				<input type="button" value="-"
																					onclick="deleteBasicInfoOfFollicular('follicularStudyTabel','chkfm')"
																					id="deletebasicinfoF" class="btn btn-xs btn-danger" />&nbsp;
																				<input type="button" value="Save"
																					onclick="saveFollicualrStudyBasicInfo()"
																					id="createdivF"
																					class="btn btn-xs btn-success editUserAccess" />
																			</div>
																			<div class="clearfix"></div>
																			<div id="moveF">
																				<div class="col-sm-12-1 dynamicstructurescroll">
																					<table class="table table-bordered "
																						id="follicularStudyTabel">
																						<thead>
																							<tr>
																								<th>#</th>
																								<th>Select</th>
																								<th>Date</th>
																								<th>AMH</th>
																								<th>FSH</th>
																								<th>TSH</th>
																								<th>PRL</th>
																								<th>E2</th>
																								<th>P4</th>
																								<th>LH</th>
																								<!-- <th ><input type="button" value="+" onclick="createRowForFollicular()" id="savebasicinfoF" class="editUserAccess" />&nbsp;<input type="button" value="+" onclick="createRowForFollicular()" id="savebasicinfoF" class="editUserAccess" />&nbsp;
																									</th> -->
																							</tr>
																						</thead>
																						<tbody id="tableBodyForFollicularInfo">
																						</tbody>
																					</table>

																				</div>
																			</div>
																		</div>
																		<!-- /panel-body -->
																	</div>
																	<!-- </div> -->

																	<!--  -->
																	<!-- <div class="modal-body" class="panel panel-info col-md-12-1"> -->
																		<br><br><br><br>
																	<div style="margin-top: 0px;">
																		<div class="panel-body" id="studyModalTable"
																			style="margin-bottom: -4%;">
																			<div style="width: 100%; height: 200px;" id="move">
																				<div
																					style="margin-top: 0px; overflow-y: scroll; max-height: 200px"
																					class="col-sm-12-1">
																					<table style="width: 100%; margin-top: 10px;"
																						class="table table-bordered table-condensed header-fixed cf"
																						id="follicularbasicinfotabel">
																						<thead>
																							<tr>
																								<th><div class="TextFont">#</div></th>
																								<th><div class="TextFont">Date</div></th>
																								<th><div class="TextFont">Days</div></th>
																								<th><div class="TextFont">RTOV(mm)</div></th>
																								<th><div class="TextFont">LTOV(mm)</div></th>
																								<th><div class="TextFont">ENDO(mm)</div></th>
																								<th><div class="TextFont">Drugs</div></th>
																								<th><div class="TextFont">Dose</div></th>
																								<th><div class="TextFont">POD/Remark</div></th>
																								<th><div class="TextFont">
																										<input type="button" value="+"
																											onclick="toCreateStudyDiv()"
																											class="editUserAccess" disabled="disabled">
																									</div></th>
																								<!-- <th>
																									<button type="button" id="saveStudyRecordbtn1"
																										onclick="saveFmGraphRecord()"
																										data-placement="left" data-toggle="tooltip"
																										class="btn btn-xs btn-success editUserAccess"
																										data-original-title="Save"
																										style="margin: 30px 0 0" disabled="disabled">
																										<i class="fa fa-save"></i>
																									</button>
																								</th> -->
																							</tr>
																						</thead>
																						<tbody id="testTable" style="overflow-y: scroll;">
																						</tbody>
																					</table>

																				</div>
																			</div>
																		</div>
																		<!-- /panel-body -->
																	</div>
																	<!-- </div> -->

																	<!--  -->

																	<!-- <div class="modal-body" id="studyModalGraph" style="margin-bottom: -5%;margin-top: 2%;"> -->

																	<div class="row">
																		<div class="col-md-12">
																			<!-- BOX -->
																			<div class="box border blue">
																				<div class="box-title">
																					<h4>
																						<i class="fa fa-bars"></i>Follicular Study graph
																					</h4>
																				</div>
																				<div class="box-body">
																					<div id="studyContainer"
																						style="height: 300px; width: 80%"></div>
																				</div>
																			</div>
																			<!-- /BOX -->
																		</div>
																	</div>

																	<!-- </div> -->

																	<div id="iCommentBox" class="modal fade in"
																		tabindex="-1">
																		<div class="modal-dialog">
																			<div class="modal-content col-md-6-1"
																				style="margin-top: 123px; margin-left: 213px;">
																				<div class="modal-header">
																					<button class="btn btn-xs" aria-label="Close"
																						type="button"
																						style="margin-top: -5px;; margin-left: 388px"
																						onclick="HideCommentPopUp()">
																						<i class="fa fa-times"></i>
																					</button>
																					<button class="btn btn-xs btn-save" title="Save"
																						style="margin-top: -37px; margin-left: 360px"
																						" data-original-title="Save" data-toggle="tooltip"
																						data-placement="left" onclick="updateComment();">
																						<i class="fa fa-save"></i>
																					</button>
																					<h4 id="testHead" style="margin-top: -36px;">Comment:</h4>
																				</div>
																				<div class="modal-body">
																					<div class="col-md-12-1">
																						<div class="col-md-6-1"
																							style="background-color: #ccffeb;">
																							<textarea rows="3" cols="50" id="txtComment"
																								type="textarea" name="txtComment"></textarea>
																						</div>

																						<div class="divide-40"></div>
																					</div>
																					<div class="divide-40"></div>
																				</div>
																			</div>
																		</div>
																	</div>

																

													<!--  END FM Data-->

												</div>

												
											</div>
										</div>

									</div>
								</div>

								<div class="footer-tools">
									<span class="go-top"> <i class="fa fa-chevron-up"></i>
										Top
									</span>
								</div>
							</div>
							<!-- /CONTENT-->
						</div>
					</div>
				</div>
			</div>
		</section>
		<!--/PAGE -->
		<!-- JAVASCRIPTS -->
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
		<!-- Auto-Suggestion 8/1/2015-->
		<script type="text/javascript" src="auto/jquery.mockjax.js"></script>
		<script type="text/javascript" src="auto/bootstrap-typeahead.js"></script>
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
		<!-- bootstrap datepicker -->
		<script type="text/javascript"
			src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<!-- bootstrap datepicker new added  js-->
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"></script>
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"></script>
		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script>
			jQuery(document).ready(function() {
				App.setPage("index"); //Set current page
				App.init(); //Initialise plugins and elements

				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});

			});
		</script>
		
		<input type="hidden" id=donorTypeId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="ivfCoupleId" value="<%=request.getParameter("ivfCoupleId")%>" />
	<input type="hidden" id="cycleNo" value="<%=request.getParameter("cycleNo")%>" />
	<input type="hidden" id="masterFollicularStudyId" value="<%=request.getParameter("masterFollicularStudyId")%>" />
	<input type="hidden" id="pt_Id" value="<%=request.getParameter("patientId")%>" />
	<input type="hidden" id="tr_Id" value="<%=request.getParameter("treatmentId")%>" />
	<input type="hidden" id="IVFTreatmentId" value="<%=request.getParameter("ivfTreatId")%>" />
	<input type="hidden" id="inidate" value="<%=request.getParameter("inidate")%>" />
	<input type="hidden" id="studyQueryType" value="<%=request.getParameter("studyQueryType")%>" />
	<input type="hidden" id="stdRowCnt" value="<%=request.getParameter("stdRowCnt")%>" />
	<input type="hidden" id=follicularstudyReportId value="0">
	<input type="hidden" id="fmFollicularDataMasterId" value="0" />
	<input type="hidden" id="saveFrom" value="<%=request.getParameter("saveFrom")%>" />

		<script type="text/javascript">
			onload = function() {

				getBasicStudyDataForFollucularStudy();
				getBasicStudyDataForFollucularStudyF();

				fetchStudyStudyRecord();
				getLisOfFmData();

				getPatientInfoByTreatIdOnFM();

			}
		</script>
		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>