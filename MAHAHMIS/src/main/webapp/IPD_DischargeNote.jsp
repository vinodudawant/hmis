<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!-- For Prescription Multilpe language -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Template Wise Summary</title>
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
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ehat_admin.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/ipdhistory.js"></script>
<script type="text/javascript" src="js/IPD_Discharge.js"></script>


<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<!-- /for Developers  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_DischargeNote"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>

<script type="text/javascript">
	onload = function() {
		getPatientDataByTreatmentIdIPD(<%=request.getParameter("treatmentId")%>); 
		getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		//Added By Pooja
		getPatientBedHall(<%=request.getParameter("treatmentId")%>);

		var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
			$("#saveDischargeSummeryButton").hide();
		}
		
		$("#IPD_DischargeNote").addClass("anchorActive");
		//fetchDischargeCode();
		var pid = $("#pid").val();
		//setPatientInfo(pid, "ipd");
		fetchCustomizeTemplateList();
		//setTemplateFunc();
		//getPatientDischargeDateTemplatewise();
		getTemplateListByDepartmentId();
 		getDoctornameForCommonTemp2();
 		fetchIPDDischargeSummaryTemplate("IPD");
 		
 		var physicalDisFlag =  $("#physicalDisFlag").val();
        if(physicalDisFlag=="Y"){
        	$("#saveDischargeSummeryButton").hide();
        }else{
        	$("#saveDischargeSummeryButton").show();
        }
		
	};
</script>

</head>
<body>

	<c:if test="${sessionScope.userType != null }">

		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
					java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
							"dd-MM-yyyy");
					String todays_date1 = formatter1.format(currentDate.getTime());
			%>
			<%@include file="left_menu_IPD.jsp"%>

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
											<li>Date : <%=todays_date1%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_Dashboard.jsp">IPD</a></li>
											<li><a href="IPD_DischargeNote.jsp">Template wise
													Summary</a></li>
											<div class="pull-right">
											<!--   <button class="btn btn-xs btn-primary editUserAccess" style="margin-right: 20px;"
													id="saveDischargeSummeryButton" data-toggle="tooltip"
													data-placement="left" title="Physical Discharge"
													onclick="PhysicalDischargeToPatientTempleteWise('IPD')" disabled="disabled">Physical Discharge
												</button>  
												 -->
												 <button class="btn btn-xs btn-primary editUserAccess" style="margin-right: 20px;"
													id="saveDischargeSummeryButton" data-toggle="tooltip"
													data-placement="left" title="Physical Discharge"
													onclick="physicalDischargeToIpdTemplate()" disabled="disabled">Physical Discharge
												</button>  
												<button class="btn btn-xs btn-success editUserAccess"
													id="saveDischargeSummeryButton"
													data-toggle="tooltip" data-placement="left" title="Save IPD Discharge Note"
													onclick="saveIPDDischargeSummaryTemplate('IPD')" disabled="disabled">
													<i class = "fa fa-save"></i>
													</button>
												<!-- <button class="btn btn-xs btn-warning"
												data-toggle="tooltip" data-placement="left" title="Print "
													onclick="PrintDischargeNote();">
													<i class = "fa fa-print"></i>
													</button> -->
												<button class="btn btn-xs btn-danger"
												data-toggle="tooltip" data-placement="left" title="Discard "
													onclick="refreshTrue();">
													<i class = "fa fa-refresh"></i>
													</button>

											</div>
										</ul>

									</div>
								</div>
								<!-- <div id="commonPatInfo" class="col-md-12-1"
									style="margin-top: -21px;"></div> -->
									
												
							<div class="alert alert-block alert-info fade in col-md-12-1"style="padding-block-end:5%; padding-top:3%;margin-top:-29px;">
						
							<div class="row">
								<div class="col-md-1">
									<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11">
									<div class="col-md-12">
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="bill_Id" value="0">											
											<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  <label id="patientId" class="control-label" style="display: none"></label> 
											<label class="control-label lblBold" id="lblCenterPIdVal"></label>
											<label id="pId" class="control-label" ></label>
											<input type="hidden"  id="documentId" value="0">
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label id="patientName" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatmentId")%></label>
											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">IPD No :</label> <label id="opdNo" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Age:</label> <label id="age" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>   
                                              </div>
                                         </div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>
											</div>
										</div>
										
										<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">Bill No:</label> <label id="billNo1" class="control-label"> </label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group" >
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="billCategoty" class="control-label"> </label>
											</div>
										</div>
										
										<div class="col-md-3">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label class="control-label lblBold">Height/weight: </label> <label id="h_w" class="control-label"></label> 
                                              </div>
                                    	</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BillNo: </label>  <label id="billNo" class="control-label"></label> 
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>
											</div>
										</div>
										
                                         <div class="col-md-3" style="width: 22%">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label id="hallnm" class="control-label lblBold">Hall:</label> <label id="hallName" class="control-label"></label> 
                                              </div>
                                    	</div>	
                                    	 
                                    	  <div id="finalAdvancediv" class="col-md-3">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label class="control-label lblBold">Common Advance :</label> <label id="finalAdvance" class="control-label"></label> 
                                              </div>
                                    	</div>	
									</div>
								</div>
							</div>
						</div>
						<%-- <div class="alert alert-block alert-info fade in" style="padding-top:3%;margin-top:3%">
						
							<div class="row">
								<div class="col-md-1" style="margin-top:-30px;">
									<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11" >

									<div class="col-md-12">

										<div class="col-md-3">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="bill_Id" value="0">
												<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  
												<label id="patientId" class="control-label"></label> 
											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
											</div>
										</div>

										<div class="col-md-4" style="">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label id="patientName" class="control-label"></label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Ipd No :</label> <label id="ipdNo" class="control-label"> IPD-D</label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">BillNo: </label>  <label id="billNo" class="control-label"></label> 

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>

											</div>
										</div>


										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>

											</div>
										</div>
										

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>

											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatmentId")%></label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>
												<label style="display: none;" id="dtofadmission" class="control-label"> DOA-D</label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="billCategoty" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
                                                 <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>                                                      
                                             </div>
										</div>
										
										<div class="col-md-4">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                    	</div>	
										
										<div class="col-md-4" >
											<div class="form-group">
<!-- 												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>
 -->
											</div>
										</div>								
										
									</div>
								</div>
							</div>
						</div> --%>
									
									
									
							</div>
							<!-- /Common -->


							<div class="divide-20"></div>
							
							<div style="margin-top: 9px;" class="col-md-12-1">

								<div class="col-md-10-1">
									<div class="col-md-1-1 form-group">Template List</div>
									<div class="col-md-2-1" style="margin-left: 2.9%;">
										<select id="selTempWiseSummary" name="selTempWiseSummary"
											style="margin-top: 0px;"
											class="col-md-12-1 form-control input-SmallText " 
											onchange="getCustomizeTemplatesIDDischarge()">
											
										</select> 
										<input type="hidden" name="idTempMast" value="0"id="idTempMast">
									</div>

									<div class="col-md-1-1 form-group" style="margin-left: 5.5%;">Template Type</div>
									<div class="col-md-2-1" style="margin-left: 2.7%;">
										<select id="selTempType" style="margin-top: 0px;"
											class="col-md-12-1 form-control input-SmallText ">
											<option value="Select">-Select-</option>
											<option value="d" selected="selected">Discharge
												Summary</option>
										</select>
									</div>
									
									<div class="col-md-1-1 form-group" style="margin-left: 5.5%;">Template Name</div>
									<div class="col-md-2-1" style="margin-left: 2.8%;">
										<input type="text"
											class="col-md-12-1 form-control input-SmallText " value=""
											style="margin-top: 0px;" id="customizeTemplateName">
									</div>

								</div>

								<!-- <div class="col-md-3-1">
									<div class="col-md-5-1 form-group">
										Template Name<b style="color: red; padding-left: 3px;">*</b>
									</div>
									<div class="col-md-7-1">
										<input type="text"
											class="col-md-11-1 form-control input-SmallText " value=""
											style="margin-top: 0px;" id="customizeTemplateName">
									</div>
								</div> -->
								<div class="col-md-2-1">
									<button id="btnViewReport"
										onclick="fetchIPDDischargeSummaryTemplate('IPD','popup')"
										data-toggle="modal" data-target="#ViewDischargeSummaryPopUp"
										style="margin-left: 50px; text-align: center; margin-top: -20px; text-decoration: none; font: bold 14px/25pxArial, sans-serif;">
										<h4>
											<i class="fa fa-file-text"></i>
										</h4>
										View Report
									</button>

								</div>
							</div>
							<div class="divide-30"></div>
							<div class="col-md-10-1" style="margin-top: -3px;">
								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Discharge Date <b
										style="color: red;">*</b></label><input type="text"
										id="discharge_date_note" readonly="readonly"
										onclick="displayCalendar(document.getElementById('discharge_date_note'),'dd/mm/yyyy',this)"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Discharge Time <b
										style="color: red;">*</b></label><input type="text"
										id="discharge_Time_note" readonly="readonly"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Type of Discharge <b
										style="color: red;">*</b></label> <select name="discharge_Type"
										id="discharge_Type"
										class="form-control input-SmallText col-md-6-1">
										<option value="select">-SELECT-</option>
										<option value="Discharge">Discharge</option>
										<option value="Transferred">Transferred</option>
										<option value="DAMA">DAMA</option>
										<option value="Absconded">Absconded</option>
										<option value="Dead">Dead</option>
									</select>
								</div>
							</div>
							<div class="divide-40"></div>


							<div class="panel panel-danger col-md-12-1"
								style="margin-top: 10px;">
								<div class="panel-heading">
									<h2 class="panel-title">Template Wise Discharge Summary</h2>
								</div>
								<div class="panel-body">
									<div id="move" style="width: 100%;"
										class="ui-resizable ui-draggable ui-draggable-handle">
										<textarea class="ckeditor ui-widget-content " name="editor1"
											title="Rich Text Editor, editor1" placeholder="Content"
											id="editor1"></textarea>
									</div>
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
		</div>
		<!-- /outer -->

		<div id="ViewDischargeSummaryPopUp" class="modal fade in"
			tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
			aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" class="col-md-9">
					<div class="modal-header">
						<div class="box-title" style="text-align: center;">
							<h4>
								<i class="fa fa-calendar"></i>Report
							</h4>
				<button style="margin-top:-56px;margin-left:24%" onclick="TemplateSummaryPrintforIpd('HF')" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print ">
													<i class="fa fa-print">Print</i>
												</button>
				<button style="margin-top:-56px;margin-left:1%" onclick="TemplateSummaryPrintforIpd('withheader')" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print ">
													<i class="fa fa-print">H/F</i>
												</button>								
												
						</div>
					</div>
					<div class="modal-body">
						<div class="box-title" style="text-align: left;">
							<h5 class="" id="templateName"></h5>
						</div>
						<div ID="ckviewEditor" class="tab-pane fade in active">
							<textarea class="ckeditor ui-widget-content "
								name="viewckeditor1"
								title="Rich Text Editor, RiseditorSubjective"
								placeholder="Content" id="viewckeditor1"></textarea>
						</div>
						<div class="modal-footer">
							<label id="draftlab" style="margin-right: 567px;"></label>
							<button type="button" class="btn btn-success editUserAccess"
								onclick="saveIPDDischargeSummaryTemplate('Report')" disabled="disabled">Save</button>
							<button type="button" class="btn btn-primary"
								data-dismiss="modal">Close</button>

						</div>
					</div>
				</div>
			</div>
		</div>



		<div><%@include file="Footer.jsp"%></div>
		<div id="patobject" style="display: none;"></div>
		<input id="callfromipd" type="hidden" name="callfromipd" value="<%=request.getParameter("type")%>"/>
		<div id="id" style="display: none;"><%=request.getParameter("id")%></div>
		<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>
		<div id="hospDetails" style="display: none;"></div>
		<input id="pageName" style="display: none;"
			value="ipdDischargeSummary" />
		<div style="display: none;" id="docName">${sessionScope.userName}</div>
		<div id="date" style="display: none;"><%=todays_date%></div>
		<input type="hidden" id="pageType" value="IPD" style="display: none;" />


		<!-- IPD_DRR for Daily Doctor Round and Order Form -->
		<input type="hidden" id="treStart"
			value="<%=request.getParameter("treStart")%>" style="display: none;" />
		<div id="treatmentbedid" style="display: none;"><%=request.getParameter("treatmentbedid")%></div>

		<!-- For IPD_BedWard -->
 		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>"> 		
			<input id="drid" type="hidden"
				value="0"
				style="display: none;" />
		<input id="tid" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<input id="pid" type="hidden"
			value="0" style="display: none;" />
		<input id="treatmentId" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<input id="bedAllocated" type="hidden"
			value="<%=request.getParameter("bedallocated")%>"
			style="display: none;" />
		<input id="ht" type="hidden" value="<%=request.getParameter("ht")%>"
			style="display: none;" />
		<input id="pattype" type="hidden"
			value="<%=request.getParameter("pattype")%>" style="display: none;" />
		<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>

		<input type="hidden" id="idIPDdischargeSummary" value="0"
			style="display: none;" />
		<input type="hidden" id="queryTypeicf" value="insert"
			style="display: none;" />
		<div id="customizeTemplateDiv" style="display: none;"></div>
		<div id="IPDdischargeSummaryTemplateDiv" style="display: none;"></div>
		<input type="hidden" value="<%=session.getAttribute("userType")%>"
			id="userType" />
		<input type='hidden' id='physicalDisFlag' value='N' />
		<script>
			$('#discharge_Time_note').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>
	</c:if>
	<!-- /c:if -->
</body>
</html>