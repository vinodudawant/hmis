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
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/IPD_Discharge.js"></script>

<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>


<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_DischargeNote"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#IPD_DischargeNote").addClass("anchorActive");
		
		
getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); //Added by sagar
getConsultantDrName(<%=request.getParameter("treatmentId")%>);
//Added By Pooja
 <%-- getPatientBedHall(<%=request.getParameter("treatmentId")%>); --%>
 getIpdPatientHeaderInfoOnIPD2(<%=request.getParameter("treatmentId")%>);
setTimeout(function() {
//setTemplateDetails();	
}, 100);	
fetchCustomizeTemplateList();
fetchIPDDischargeSummaryTemplate("IPD");

setPatientInfoPrevDischareSummary("Previous_Discharge_Summary");
  getDoctornameForCommonTemp2();  //Added by sagar
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
			<%@include file="left_menu_IPDMain.jsp"%>

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: -3px;">
											<li>Date : <%=todays_date1%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_Dashboard.jsp">IPD</a></li>
											<li><a href="IPD_DischargeNote.jsp">Previous Template wise
													Summary</a></li>
											<div class="pull-right">
									<!-- <button onclick="ipd_TempSummary()" title="Print " data-placement="right" data-toggle="tooltip" class="btn btn-xs btn-warning" type="button";">
									<i class="fa fa-print"></i>
									</button> -->
									<button onclick="TemplateSummaryPrintforIpd();" title="Print" data-placement="right" class="btn btn-primary pull-right">Print(H/F)</button>
									<button style="margin-right:48px" class="btn btn-primary pull-right" onclick="TemplateSummaryPrintforIpd('HF');" title="Print" data-placement="center">Print</button>
											</div>
										</ul>

									</div>
								</div>
								<!-- <div id="commonPatInfo" class="col-md-12-1"
									style="margin-top: -21px;"></div> -->
									
						<div class="alert alert-block alert-info fade in" style="padding-top:3%;margin-top:3%">
						
							<div class="row">
								<div class="col-md-1" style="margin-top:-30px;">
									<img id="patImg" style="width: 100%;height: 45px" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
								</div>

								<div class="col-md-11" >

									<div class="col-md-12">

										<div class="col-md-2">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="bill_Id" value="0">
												<!--  <label class="control-label lblBold">Patient Id :</label>  <label id="patientId" class="control-label"></label>-->
									          <label class="control-label lblBold">UH Id :</label>  <label id="patientId" class="control-label"></label> 
												 
											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
											</div>
										</div>

										<div class="col-md-4">
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
												<label class="control-label lblBold">Bill Categoty :</label>
												<label id="billCategoty" class="control-label"> </label>

											</div>
										</div>

										<div class="col-md-4" >
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label id="dod" class="control-label"> DOD-D</label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatmentId")%></label>

											</div>
										</div>
										<div class="col-md-2">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                    	</div>
										<div class="col-md-3">
											<div class="form-group">
                                                 <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>                                                      
                                             </div>
										</div>
										
										
										
									</div>
								</div>
							</div>
						</div>
							
							
									
									
							</div>
							<!-- /Common -->


							<div class="divide-20"></div>

								<div class="col-md-12-1" style="margin-top: 10px;">
									<div class="col-md-4-1">
									<label class="TextFont col-md-4-1">Template List</label>
										<select id="selTempWiseSummary" name="selTempWiseSummary"
											class="col-md-6-1 form-control input-SmallText ">
										</select> <input type="hidden" name="idTempMast" value="0"
											id="idTempMast">
									</div>

									<div class="col-md-4-1">
										<label class="TextFont col-md-4-1">Template Type</label> <select
											id="selTempType" 
											class="col-md-6-1 form-control input-SmallText ">
											<option value="Select">-Select-</option>
											<option value="d" selected="selected">Discharge
												Summary</option>
										</select>
									</div>

									<div class="col-md-4-1">
										<label class="TextFont col-md-4-1">Template Name </label>
										<input type="text"
											id="customizeTemplateName" readonly="readonly"
											class="form-control input-SmallText col-md-6-1"></input>
									</div>
							</div>
							<div class="divide-40"></div>
							<div class="col-md-12-1" style="margin-top: 1px;">
								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Discharge Date <b
										style="color: red;">*</b></label><input type="text"
										id="discharge_date_note" readonly="readonly"
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
										class="form-control input-SmallText TextFont col-md-6-1">
										<option value="select">-SELECT-</option>
										<option value="Discharge" selected="selected">Discharge</option>
										<option value="Transferred">Transferred</option>
										<option value="DAMA">DAMA</option>
										<option value="Absconded">Absconded</option>
										<option value="Dead">Dead</option>

									</select>
								</div>
								

							<div class="divide-10"></div>
							<div class="divide-20"></div>
							<div class="panel panel-danger col-md-12-1"
								style="margin-top: 1px;">
								<div class="panel-heading">
									<h2 class="panel-title">Template Wise Discharge Summary</h2>
								</div>
								<div class="panel-body">
									<div id="move" style="width: 100%;"
										class="ui-resizable ui-draggable ui-draggable-handle">
										<textarea class="ckeditor ui-widget-content " name="editor1"
											title="Rich Text Editor, editor1" placeholder="Content"
											id="editor1" disabled="disabled"></textarea>
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
							<button type="button" class="btn btn-success"
								onclick="saveIPDDischargeSummaryTemplate('IPD')">Save</button>
							<button type="button" class="btn btn-primary"
								data-dismiss="modal">Close</button>

						</div>
					</div>
				</div>
			</div>
		</div>

		<div><%@include file="Footer.jsp"%></div>
		<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>
		<input id="pageName" style="display: none;"
			value="ipdDischargeSummary" />
		<div style="display: none;" id="docName">${sessionScope.userName}</div>
		<div id="date" style="display: none;"><%=todays_date%></div>

		<!-- For IPD_BedWard -->
		<input id="tid" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<input id="pid" type="hidden"
			value="<%=request.getParameter("patientId")%>" style="display: none;" />
		<input id="treatmentId" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>

		<div id="customizeTemplateDiv" style="display: none;"></div>
	<input id="CallFor" style="display: none;"
			value="<%=request.getParameter("CallFor")%>" />
		
	</c:if>
	<!-- /c:if -->
</body>
</html>