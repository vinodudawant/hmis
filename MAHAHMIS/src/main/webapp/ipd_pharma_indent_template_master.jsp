<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>


<!-- For Prescription Multilpe language -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>IPD Indent Template</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />

<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css" />

<!-- Auto-Suggestion -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />

<!-- MARKDOWN -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-markdown/css/bootstrap-markdown.min.css" />
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

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/pop_up.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/themes/modern/theme.min.js"></script>
<!-- /for Developers  -->

<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>

<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<!-- Auto-Suggestion 3/12/2014-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

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

<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>

<!-- MARKDOWN -->
<script type="text/javascript"
	src="js/bootstrap-markdown/js/markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/to-markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/bootstrap-markdown.min.js"></script>
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>

<script src="/WEB-INF/resources/js/app_js/pharma_counter_batch_popup.js"
	type="text/javascript"></script>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxmenu.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxloader.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxwindow.js"/>"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
			
		}
		$("#indentTemplateRowCount").val("1");
		getIndentTemplateDetails("template");
		
		var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#date-pick").val(date);
		$("#OFdate-pick").val(date);
		$("#OFdate-pick1").val(date);
		$("#hiddenDate").val(date);
		$("#popup_container2").val(arrDate[0]);
		$("#allergyDate").val(date);
		$("#assesmentDate").val(date);

	};

</script>

<!-- Abhijit Radke -->

<!-- Abhijit Radke -->

</head>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());

	java.text.SimpleDateFormat dateFormat = new SimpleDateFormat(
			"HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time = dateFormat.format(cal.getTime());
%>


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
					<%@include file="pharmacy_indent_template_pop_up.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_IPDMain.jsp"%>
				<!--End Left Menu -->

				<input id="hiddenDate" type="hidden" /> <input type="hidden"
					id="todays_date" value="<%=todays_date%>" />
				 <input type="hidden" style="display: none;" id="userId"	value="<%=session.getAttribute("userId1")%>" />	

				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li>Pharmacy Indent Master</li>

												<li style="float: right"><input type="button"
													value="Save" class="btn btn-xs btn-success editUserAccess"
													onclick="saveIndentTemplate()" style="float: right" disabled="disabled"></li>


											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<!-- Start Tab UI -->
								<div class="col-md-12-1"
									style="margin-top: 5px; margin-left: 0px;">
									<!-- Start BOX -->
									<div class="box border col-md-12-1">
										<div class="divide-10"></div>
										<div class="tabbable col-md-12-1">

											<div class="divide-10"></div>
											<div id="ipdDoctorStationJSPHeadDiv" class="tab-content">
												<div ID="ADNOTE" " class="tab-pane fade in"
													style="width: 96%; margin-left: 2%;">
													<!-- MARKDOWN -->
													<div class="box border red">
														<div class="box-title">
															<h4>
																<i class="fa fa-pencil-square"></i>Bootstrap Markdown
																Editor
															</h4>
															<div class="tools hidden-xs">
																<a href="javascript:updateAdmissionNote();" class=""><i
																	class="fa fa-floppy-o" title="Save Note"></i> </a> <a
																	href="#box-config" data-toggle="modal" class="config">
																	<i class="fa fa-cog"></i>
																</a> <a href="javascript:;" class="reload"> <i
																	class="fa fa-refresh"></i>
																</a> <a href="javascript:;" class="collapse"> <i
																	class="fa fa-chevron-up"></i>
																</a> <a href="javascript:;" class="remove"> <i
																	class="fa fa-times"></i>
																</a>
															</div>
														</div>
														<div class="box-body">
															<form>
																<textarea name="content" id="ipd_adnote"
																	data-provide="markdown" rows="10"></textarea>
																<div class="divide-10"></div>
															</form>
														</div>
													</div>
													<!-- /MARKDOWN -->
												</div>

												<!-- START INDENT GUI -->
												<div ID="INDENT" class="tab-pane fade in active"
													style="margin-left: 2%">

													<div class="col-md-12-1"
														style="margin-top: 2%; margin-left: 2%;">
														<div class="col-md-6-1" style="margin-top:0%;">

															<div class="col-md-12-1">
																<div class="col-md-3-1">
																	<b>Indent Template Name</b>
																</div>
																<div class="col-md-4-1">
																	<input type='text' name='txtIndentMasterName'
																		id='txtIndentMasterName' size=50>
																		
																	<input type='hidden' name='txtIndentMasterId'
																		id='txtIndentMasterId' size=50>
																	
																	<input type='hidden' name='txtIndentUserIp'
																		id='txtIndentUserIp'>	
																		
																	<input type='hidden' name='txtIndentAddUserId'
																		id='txtIndentAddUserId'>
																		
																	<input type='hidden' name='txtIndentAddTime'
																		id='txtIndentAddTime'>
																		
																	<input type='hidden' name='txtIndentAddDate'
																		id='txtIndentAddDate'>			
																			
																</div>
																<div style="margin-left: 27%" class="col-md-2-1">
																	<font color="red">*</font>
																</div>
															</div>

														</div>

														<div class="col-md-6-1" style="margin-top: 0%;">

															<div class="col-md-12-1">
																<div class="col-md-2-1">
																	<b>Indent Template Description</b>
																</div>
																<div class="col-md-9-1">
																	<textarea name='txtIndentMasterNarration'
																		id='txtIndentMasterNarration' rows=2
																		style='width: 89%'></textarea>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-12-1" style="margin-top: 10px;">
													<div class="col-sm-5"></div>
													<div style="margin-top: 0px; margin-left: 2px;"
														class="col-md-12-1">
														<!-- BOX -->

														<div class="box border col-md-12-1">

															<div class="tabbable col-md-12-1">
																<ul class="nav nav-tabs">
																	<li class="" id='divNewIndentTemplate'><a data-toggle="tab"
																		href="#consumptionDiv"><i class="fa fa-user"></i>
																			<span class="hidden-inline-mobile"
																			onclick="">New Indent Template</span></a></li>


																	<li class="active" id='divListIndentTemplate'><a data-toggle="tab"
																		href="#consumptionDetails"><i class="fa fa-user"></i>
																			<span class="hidden-inline-mobile"
																			onclick="getIndentTemplateDetails('template')">Indent
																				Template Master List</span></a></li>


																</ul>
																<div class="divide-10"></div>
																<div class="divide-10"></div>
																<div class="divide-10"></div>
																<div class="tab-content col-md-12-1">

																	<div id="consumptionDiv" class="tab-pane fade "
																		style="overflow-x: auto;">
																		<div id=""
																			style="width: 100%; height: 300Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
																			<div class="col-md-12-1">
																			</div>
																			<div class="col-md-12" style="margin-top: 2%">
																				<!-- code for indent template slave -->
																				<div class="col-sm-12-1 col-md-12-1" style="">
																					<div style="height: 85%;">
																						<div
																							style="">
																							<button type="button"
																								class="btn btn-xs btn-success"
																								onclick="addIndentTemplateRow()">Add
																								New</button>

																							<button type="button" onclick="toRemoveTemplateRow()"
																								style="margin: 7px;"
																								class="btn btn-xs btn-danger" value="_">-</button>

																							<table cellspacing="0" cellpadding="0" border="1"
																								class="table table-bordered table-striped table-condensed">
																								<thead>
																									<tr>
																										<th class="col-md-2-2 center">select</th>
																										<th class="col-md-2-2 center">#</th>
																										<th class="col-md-2-2 center">Product
																											Name</th>
																										<th class="col-md-1 center">Quantity</th>
																										<th class="col-md-2-2 center">Narration</th>
																									</tr>
																								</thead>
																								<tbody
																									style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;"
																									id="indetTemplateTable">

																								</tbody>
																							</table>
																						</div>
																					</div>
																				</div>

																			</div>
																		</div>

																	</div>


																	<div id="consumptionDetails"
																		class="tab-pane fade active in"
																		style="overflow-x: auto;">
																		<div id=""
																			style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
																			<div class="col-md-12-1">
																			</div>
																			<table
																				class="table table-striped table-bordered header-fixed cf "
																				style="margin-top: 10px; width: 100%;">
																				<thead class="cf" style="background: white;">
																					<tr>
																						<th style="height: 21.5px;"
																							class="col-md-1 center"><div>Sr.</div></th>
																						<th style="height: 21.5px;"
																							class="col-md-2 center"><div>Template Name</div></th>

																						<th style="height: 21.5px;"
																							class="col-md-2 center"><div>Date</div></th>

																						<th style="height: 21.5px;"
																							class="col-md-2 center"><div>Template Description</div></th>

																						<th style="height: 21.5px;"
																							class="col-md-1 center"><div>View</div></th>
																						
																						<th style="height: 21.5px;"
																							class="col-md-1 center"><div>Edit</div></th>	
																							
																						<th style="height: 21.5px;"
																							class="col-md-1 center"><div>Delete</div></th>	
																							
																					</tr>
																				</thead>

																				<tbody id="consumptionDetailsById"></tbody>
																			</table>
																		</div>

																	</div>




																</div>

																<!--/nikhil  -->
															</div>

														</div>
														<!-- /BOX -->
													</div>

													<!-- Suraj code for ward consumption pop up -->
													<div id="indentTemplatePopUp" class="modal fade in">
														<div class="modal-dialog" style="width: 1120px;">

															<div class="modal-content" class="col-md-12">
																<div class="modal-header">
																	<div class="">
																		<h4>
																			<i class="fa fa-calendar"></i>Indent Template Information
																		</h4>
																	</div>

																</div>
																<div class="modal-body">

																	<div style="margin-top: 00px;"
																		class="box border primary">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-table"></i>Template Details

																			</h4>
																			<div class="tools">
																				<a class="config" data-toggle="modal"
																					href="#box-config"> <i class="fa fa-cog"></i>
																				</a> <a class="reload" href="javascript:;"> <i
																					class="fa fa-refresh"></i>
																				</a> <a class="collapse" href="javascript:;"> <i
																					class="fa fa-chevron-up"></i>
																				</a> <a class="remove" href="javascript:;"> <i
																					class="fa fa-times"></i>
																				</a>
																			</div>
																		</div>
																		<div class="box-body">
																			<div class="col-md-12-1" style="margin-top: 10px;">
																				<div class='col-md-4-1'>
																					<i class="fa fa-star"></i><b>Indent Template No -<span id='divIndentSaleNo'></span>
																				</div>
																				<div class='col-md-4-1'>
																					<i class="fa fa-calendar"></i>Date -</b> <span
																						id='divIndentReceiveDate'></span>
																				</div>

																			</div>
																			<table class="table table-striped"
																				style="margin-top: 40px;">
																				<thead style="background: white;" class="cf">
																					<tr>
																						<th class="col-md-1 center"
																							style="height: 21.5px;"><div>Sr.</div></th>
																						<th class="col-md-2 center"
																							style="height: 21.5px;"><div>Product
																								Name</div></th>

																						<th class="col-md-2 center"
																							style="height: 21.5px;"><div>Qty</div></th>

																						<th class="col-md-2 center"
																							style="height: 21.5px;"><div>Narration</div></th>

																					</tr>
																				</thead>
																				<tbody id='preIndentTemplateDataById'>

																				</tbody>
																			</table>
																		</div>
																	</div>



																</div>
																<!-- /BODY-->
																<div class="modal-footer">

																	<div class="form-group col-md-7-1"
																		style="margin-top: 15px;">

																		<button type="button" class="btn btn-default"
																			data-dismiss="modal">Cancel</button>
																	</div>
																</div>
															</div>

														</div>
													</div>




												</div>
												<!-- /BOX-->
												<!-- End Code for #indent GUI -->

												<!-- Start Code for #Sub_Obj GUI -->

												<!-- End Code for Sub_Obj GUI -->

												<!-- Start Code for Assesment GUI -->

												<!-- End Code for Assesment GUI -->


												<!-- Start Code for #Prescription GUI -->

												<!-- End Code for #Prescription GUI -->

												<!-- Start Code for CPOE GUI -->

												<!-- End Code for CPOE GUI -->

												<!-- Start Code for #DailyRoundReport GUI -->

												<!-- End Code for #DailyRoundReport GUI -->

												<!-- Start Code for #OrderForm GUI -->

												<!-- End Code for #OrderForm GUI -->

											</div>
											<!-- End Code for tab-content GUI -->
										</div>
									</div>
								</div>
								<!-- End Tab UI -->

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

			<!-- For Assesment and Order Form -->

		</c:if>
	</section>
<input id="callfromipd" type="hidden" name="callfromipd" value="<%=request.getParameter("type")%>"/>
<input id="tid" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
<input id="tr_Id" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
<input id="pt_Id" type="hidden"
				value="<%=request.getParameter("patientId")%>"
				style="display: none;" />
	<!-- IPD_DRR for Daily Round and Order Form -->
	<input type="hidden" value="<%=session.getAttribute("userType")%>"
		id="userType" />
	<div id="DRR" style="display: none;"></div>
	<div id="objorder" style="display: none;"></div>
	<input type="hidden" name="indentTemplateRowCount"
		id="indentTemplateRowCount" value="1">
</body>
</html>