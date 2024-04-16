<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Subjective Objective Temp Type</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />

	<!-- BOOTSTRAP -->
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css" />

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />

<!-- /for Developers  -->
<script type="text/javascript" src="js/ipd_history_template.js"></script>

<!-- include js for development -->
<!-- <script type="text/javascript" src="js/ehat_center.js"></script> -->
<script type="text/javascript" src="js/dd_subjective_objective_tempType.js"></script>


<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<script>
$(document).on('change','.defaultSlider',function(){
	var id = $(this).attr('id').split("_")[1];
	$('.duration_'+id).html(this.value).hide();
	
	var span_Qty = $('.duration_'+id).text();
	 $("#qty"+ id).val(span_Qty);
	
});
</script>

<style>
#content .page-header
{
	height: 35px;
}
</style>

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
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">

			<%@include file="Menu_Header_Nobel.jsp"%>

		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<div id="outer" class="container-main" style="width: 100%;">
			
			<%@include file="dd_menu_DoctorDesk.jsp"%>

				<input id="hiddenDate" type="hidden" /> <input type="hidden"
					id="todays_date" value="<%=todays_date%>" />

			<!-- /SIDEBAR -->
			<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12" style="background: #FFF">

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
												
												<li>IPD History Template </li>

												<li style="float: right"><input type="button"
													value="Save" class="btn btn-xs btn-danger editUserAccess"
													onclick="saveIPDHistorytemplate()" style="float: right" disabled="disabled"></li>
												<div class="clearfix"></div>

											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<!-- Start Tab UI -->
								
							<div style="margin: 15px 0 50px;" class="col-md-12-1">

									<div class="col-md-3-1">
										<div class="col-md-5-1 form-group">Template List</div>
										<div class="col-md-7-1">
											<select id="selCustomizeTemp" name="selCustomizeTemp" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText " onchange="getIPDHistorytemplateById()">
											<option value="0">NewTemplate</option>
											</select> <input type="hidden" name="idTempMast" value="0" id="idTempMast">
										</div>

								

									</div>

									
									<!-- <div class="col-md-2-1 form-group">History Type</div>
										<div class="col-md-4-1">
											<select class="col-md-11-1 form-control input-SmallText "
												style="margin-top: 0px;" id="selCustomizeTempSubType">
												<option value="s">Subjective</option>
												<option value="o">Objective</option>
											</select>
										</div> 
									</div>-->

									<div class="col-md-3-1">
										<div class="col-md-5-1 form-group">
											Template Name<b style="color: red; padding-left: 3px;">*</b>
										</div>
										<div class="col-md-7-1">
											<input type="text" class="col-md-11-1 form-control input-SmallText " value="" style="margin-top: 0px;" id="customizeTemplateName">
										</div>
									</div>
								
								</div>
								<div class="col-md-12-1"
									style="margin-top: 5px; margin-left: 0px;">
									<!-- Start BOX -->
									<div class="tab-content" id="ipdDoctorStationJSPHeadDiv">
										<div id="History" class="tab-pane active">
											<div id="historyRow" class="col-md-12-1"
												style="padding-top: 0px;"></div>
											<div class="tabbable tabs-left col-md-12-1"
												style="margin-top: -9px; margin-left: 5px;">
												<div class="tab-content col-md-12-1"
													style="margin-top: 0px;">
													<div id="chiefComplaints"
														class="tab-pane fade active in col-md-12-1">
														<div class="tab-content col-md-12-1"
															style="margin-top: 8px;">
													
														
														</div>
														<div>
															<label class="TextFont">CHIEF COMPLAINTS :</label>
															<div>
																<div id="row_1" class="col-sm-12-1"
																	style="margin-top: 25px;"></div>
																<table class="table table-bordered"
																	style="margin-top: 25px; width: 100%;" id="historyTable1">
																	<thead>
																		<tr>
																			<th class="col-sm-1-1 center"
																				style="height: 21.5px; font-size: &amp;quot;"><label
																				class="TextFont">#</label></th>
																			<th class="col-sm-4-1 center"
																				style="height: 21.5px; font-size: &amp;quot;"><label
																				class="TextFont">Chief Complaints</label></th>
																			<th class="col-sm-6-1 center"
																				style="height: 21.5px; font-size: &amp;quot;"><label
																				class="TextFont"> Duration</label></th>
																			<th style="height: 21.5px; width: 25px;"><input
																				type="button" onclick="createDivIPDHistoryTemplate('IPDH')"
																				value="+"> <input type="button"
																				onclick="removeChifCompIPD()" value="-"></th>
																		</tr>
																	</thead>
																	<tbody id="historyDiv">
																	</tbody>
																</table>
																<!-- <div
																	style="width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;">
																	<table
																		class="table table-condensed table-bordered table-stripped cf">
																		<tbody id="historyDiv"></tbody>
																	</table>
																</div> -->
																<div
														style='width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;'>
														<table
															class="table table-condensed table-bordered table-stripped cf" >
															
														</table>
													</div>
																
																<div class="col-md-10-1"
																	style="padding-left: 1%; margin-top: 2%;">
																	<label class="TextFont">Chief Complaints::</label>
																	<textarea id="chiefComplaintsTxt" rows="3" cols="52"
																		class=""></textarea>
																</div>
																<div class="col-md-10-1"
																	style="padding-left: 1%; margin-top: 2%;">
																	<label class="TextFont">Negative History:</label>
																	<textarea id="clinicalFinding" rows="3" cols="52"
																		class=""></textarea>
																</div>
																<div id="pastMedHistory"
																	class="tab-pane fade active in col-md-12-1">
																	<div class="tab-content col-md-12-1"
																		style="margin-top: 8px;"></div>
																	<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 10px;">
																		<hr
																			style="height: 0px; border-top: 1px solid; margin: 1em 0; width: 99%">
																	</div>
																	<div class="col-md-5-1 form-group"
																		style="font: bold; padding-bottom: 1%; padding-top: 2%; padding-left: 2%;">
																		<label>PAST/PERSONAL/FAMILY HISTORY :</label>
																		<div id="tableContent"
																			style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif; padding-top: 1%; font-size: 13px; float:;">
																			<table cellspacing="0" cellpadding="0"
																				style="border: 1px solid lightgrey;">
																				<tbody>
																					<tr>
																						<td align="center"
																							style="height: 35px; border: 1px solid lightgrey;"></td>
																						<td align="center"
																							style="height: 35px; border: 1px solid lightgrey;">Yes/No</td>
																						<td align="center"
																							style="height: 35px; border: 1px solid lightgrey;">Duration</td>
																					</tr>
																					<tr>
																						<td width="30%" align="center"
																							style="border: 1px solid lightgrey;">DM</td>
																						<td width="20%"
																							style="border: 0.2px solid lightgrey;";=""><input
																							type="checkbox" name=""
																							style="width: 105%; border: 0.2px solid lightgrey;"
																							id="chkDm"></td>
																						<td><input type="text" name=""
																							style="width: 100%; border: 0.2px solid lightgrey;"
																							id="txtDm"></td>
																					</tr>
																					<tr>
																						<td width="30%" align="center"
																							style="border: 1px solid lightgrey;">HTN</td>
																						<td style="border: 0.2px solid lightgrey;"><input
																							type="checkbox" name=""
																							style="width: 105%; border: 0.2px solid lightgrey;"
																							id="chkHtn"></td>
																						<td><input type="text" name=""
																							style="width: 100%; border: 0.2px solid lightgrey;"
																							id="txtHtn"></td>
																					</tr>
																					<tr>
																						<td width="30%" align="center"
																							style="border: 1px solid lightgrey;">IHD</td>
																						<td style="border: 0.2px solid lightgrey;"><input
																							type="checkbox" name=""
																							style="width: 105%; border: 0.2px solid lightgrey;"
																							id="chkIhd"></td>
																						<td><input type="text" name=""
																							style="width: 100%; border: 0.2px solid lightgrey;"
																							id="txtIhd"></td>
																					</tr>
																					<tr>
																						<td width="30%" align="center"
																							style="border: 1px solid lightgrey;">BA/COPD</td>
																						<td style="border: 0.2px solid lightgrey;"><input
																							type="checkbox" name=""
																							style="width: 105%; border: 0.2px solid lightgrey;"
																							id="chkBaco"></td>
																						<td><input type="text" name=""
																							style="width: 100%; border: 0.2px solid lightgrey;"
																							id="txtBaco"></td>
																					</tr>
																					<tr>
																						<td width="30%" align="center"
																							style="border: 1px solid lightgrey;">OTHER</td>
																						<td style="border: 0.2px solid lightgrey;"><input
																							type="checkbox" name=""
																							style="width: 105%; border: 0.2px solid lightgrey;"
																							id="chkOther"></td>
																						<td><textarea
																								style="width: 100%; border: 0.2px solid lightgrey;"
																								id="txtOther"></textarea></td>
																					</tr>
																				</tbody>
																			</table>
																		</div>
																	</div>
																	<div style="padding-left: 0%; margin-top: 1%;"
																		class="col-md-6-1" id="PastPresentFamilyHistory">
																		<div class="col-md-12-1">
																			<div class="col-md-6-1"
																				style="padding-left: 10%; margin-top: 0%;">
																				<label class="TextFont">Past Surgical
																					History:</label>
																				<textarea id="pastSurgHistory" rows="2" cols="39"
																					class=""></textarea>
																			</div>
																			<div class="col-md-6-1"
																				style="padding-left: 15%; margin-top: 0%;">
																				<label class="TextFont">Medications:</label>
																				<textarea id="medications" rows="2" cols="39"
																					class=""></textarea>
																			</div>
																		</div>
																		<div style="margin-top: 2%;" class="col-md-12-1">
																			<div style="padding-left: 10%;" class="col-md-6-1">
																				<label class="TextFont">GYNAE/OBS History :</label>
																				<textarea id="gynac" rows="2" cols="39" class=""></textarea>
																			</div>
																			<div style="padding-left: 15%;" class="col-md-6-1">
																				<label class="TextFont">Any allergies or
																					adversedrug reactions?:</label>
																				<textarea id="drugReaction" rows="2" cols="39"
																					class=""></textarea>
																			</div>
																		</div>
																		<div style="margin-top: 2%;" class="col-md-12-1">
																			<div style="padding-left: 10%;" class="col-md-6-1">
																				<label class="TextFont">Family History     : </label>
																				<textarea id="familyHis" rows="2" cols="39" class="" style="height: 51px; width: 192px;"></textarea>
																			</div>
																			<div style="padding-left: 15%;" class="col-md-6-1">
																				<label class="TextFont">Personal History:</label>
																				<textarea id="perHistory" rows="2" cols="39"
																					class=""></textarea>
																			</div>
																		</div>
																	</div>
																</div>
																<div class="col-md-12-1"
																	style="padding-right: 8px; margin-top: 1%;">
																	<div class="divide-10"></div>
																	<div style="display: none;" class="col-md-4-1">
																		<label class="TextFont">Habbits:</label>
																		<textarea id="habbits" rows="3" cols="40" class=""></textarea>
																	</div>
																	<div class="col-md-4-1"
																		style="padding-left: 0.8%; display: none;">
																		<label class="TextFont">Bowel:</label>
																		<textarea id="bowel" rows="3" cols="40" class=""></textarea>
																	</div>
																	<div class="col-md-4-1"
																		style="padding-left: 1.6%; display: none;">
																		<label class="TextFont">Blader:</label>
																		<textarea id="blader" rows="3" cols="40" class=""></textarea>
																	</div>
																</div>
															</div>
															<div id="OnExaminations"
																class="tab-pane fade active in col-md-12-1">
																<div id="row_1" class="col-sm-12-1"
																	style="margin-top: -17px;">
																	<hr
																		style="height: 0px; border-top: 1px solid; margin: 1em 0; width: 99%">
																</div>
																<div>
																	<label class="TextFont">ON EXAMINATION :</label>
																	<div>
																		<div class="form-group Remove-Padding col-md-4-1"
																			style="padding-left: 15px;">
																			<div class="divide-10"></div>
																			<label class="TextFont">VITALS:</label>
																			<div class="form-group Remove-Padding col-md-12-1"
																				style="margin-top: 0px;">
																				<label class="TextFont">Temperature:</label> <input
																					type="text" id="temparature" name="temparature"
																					placeholder="Temparature"
																					class="form-control input-SmallText">
																			</div>
																			<div class="form-group Remove-Padding col-md-12-1"
																				style="margin-top: 5px;">
																				<label class="TextFont">Pulse:</label> <input
																					type="text" id="pulse" name="pulse"
																					placeholder="Pulse"
																					class="form-control input-SmallText">
																			</div>
																			<div class="form-group Remove-Padding col-md-12-1"
																				style="margin-top: 5px;">
																				<label class="TextFont">BP :</label> <input
																					type="text" id="bp" name="bp" placeholder="BP"
																					class="form-control input-SmallText">
																			</div>
																		</div>
																		<div class="form-group Remove-Padding col-md-4-1"
																			style="padding-left: 15px;">
																			<div class="divide-10"></div>
																			<label class="TextFont">General Exam:</label>
																			<div class="divide-10"></div>
																			<div class="col-md-12-1">
																				<div class="form-group Remove-Padding col-md-12-1"
																					style="margin-top: 0px;">
																					<label class="TextFont">Pallor:</label> <input
																						type="text" id="pallor" name="Pallor"
																						placeholder="Pallor"
																						class="form-control input-SmallText">
																				</div>
																				<div class="form-group Remove-Padding col-md-12-1"
																					style="margin-top: 5px;">
																					<label class="TextFont">Clubbing:</label> <input
																						type="text" id="clubbing" name="Clubbing"
																						placeholder="Clubbing"
																						class="form-control input-SmallText">
																				</div>
																				<div class="form-group Remove-Padding col-md-12-1"
																					style="margin-top: 5px;">
																					<label class="TextFont">Lymph Adenopathy:</label> <input
																						type="text" id="lymph" name="Lymph Adenopathy"
																						placeholder="Lymph Adenopathy "
																						class="form-control input-SmallText">
																				</div>
																			</div>
																		</div>
																		<div class="form-group Remove-Padding col-md-4-1"
																			style="padding-left: 15px; padding-top: 20px;">
																			<div class="divide-10"></div>
																			<div class="form-group Remove-Padding col-md-12-1"
																				style="margin-top: 0px;">
																				<label class="TextFont">Icterus:</label> <input
																					type="text" id="lcterus" name="Lcterus"
																					placeholder="Lcterus"
																					class="form-control input-SmallText">
																			</div>
																			<div class="form-group Remove-Padding col-md-12-1"
																				style="margin-top: 5px;">
																				<label class="TextFont">Oedema:</label> <input
																					type="text" id="oedema" name="Oedema"
																					placeholder="Oedema"
																					class="form-control input-SmallText">
																			</div>
																		</div>
																	</div>
																	<div id="SystematicExaminations"
																		class="tab-pane fade active in col-md-12-1 ">
																		<div id="row_1" class="col-sm-12-1"
																			style="margin-top: 15px;">
																			<hr
																				style="height: 0px; border-top: 1px solid; margin: 1em 0; width: 99%">
																		</div>
																		<div>
																			<label class="TextFont">SYSTEMATIC
																				EXAMINATIONS :</label>
																			<div>
																				<div class="col-md-12-1"
																					style="left: 15px; margin-top: 1%;">
																					<div class="form-group Remove-Padding col-md-3-1"
																						style="margin-top: 0px;">
																						<label class="TextFont">CVS:</label> <input
																							type="text" id="cvs" name="CVS" placeholder="CVS"
																							class="form-control input-SmallText">
																					</div>
																					<div class="form-group Remove-Padding col-md-3-1"
																						style="margin-top: 0px; margin-left: 45px;">
																						<label class="TextFont">R/S:</label> <input
																							type="text" id="rs" name="R/S " placeholder="R/S"
																							class="form-control input-SmallText">
																					</div>
																					<div class="form-group Remove-Padding col-md-3-1"
																						style="margin-top: 0px; margin-left: 45px;">
																						<label class="TextFont">PA:</label> <input
																							type="text" id="pa" name="PA" placeholder="PA"
																							class="form-control input-SmallText">
																					</div>
																					<div class="form-group Remove-Padding col-md-3-1"
																						style="margin-top: 0px; margin-left: 45px;">
																						<label class="TextFont">CNS:</label> <input
																							type="text" id="cns" name="CNS" placeholder="CNS"
																							class="form-control input-SmallText">
																					</div>
																				</div>
																				<div class="col-md-12-1"
																					style="padding-right: 8px; margin-top: 3%;">
																					<div class="divide-10"></div>
																					<div class="col-md-6-1">
																						<label class="TextFont">Local
																							Examinations:</label>
																						<textarea style="margin-left: 3%;" id="localExm"
																							rows="3" cols="40" class=""></textarea>
																					</div>
																					<div class="col-md-6-1" style="padding-left: 0.8%;">
																						<label class="TextFont">Investigation
																							Reports:</label>
																						<textarea style="margin-left: 1%;" id="invsRep"
																							rows="3" cols="40" class=""></textarea>
																					</div>
																				</div>
																				<div class="col-md-12-1"
																					style="padding-right: 8px; margin-top: 3%;">
																					<div class="divide-10"></div>
																					<div style="" class="col-md-6-1">
																						<label class="TextFont">Provisional
																							Diagnosis:</label>
																						<textarea style="margin-left: 0%;" id="provDia"
																							rows="3" cols="40" class=""></textarea>
																					</div>
																					<div class="col-md-6-1"
																						style="padding-left: 0.8%; ">
																						<label class="TextFont">Treatment Plan:</label>
																						<textarea style="margin-left: 9%;" id="treatPlan"
																							rows="3" cols="40" class=""></textarea>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
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
						
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			</div>
			
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->

	<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllSubjectiveMaster();
				//fetchtemplatename('onload');
				getIPDHistoryTemplateList();
		});
	</script>
	<input type="hidden" id=subjectiveId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>