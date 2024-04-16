<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>IPD_BedWard</title>
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
<link href="css/pop_up.css" rel="stylesheet" type="text/css" />

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
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/bed.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/package.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script src="js/jquery.datePicker-min.js" type="text/javascript"></script>


<script type="text/javascript" src="js/registration.js"></script>

<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_BedWardDashboard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>


<script type="text/javascript">
onload = function() {
	$("#wardType1").val(0);
	fetchHallIdsToSetOnload(<%=request.getParameter("treatmentId")%>);
	getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); //Added by sagar
	
	getIpdBedDetailsForTid(<%=request.getParameter("treatmentId")%>);
	
	getallHallType('dummyParam');	
	getBedAva('allBed');
	$("#bedwar").addClass("anchorActive");
	
	setTimeout(function() {
		
		var bedStatus = $("#bedAllocated").val();
		var ht = $("#ht").val();
		var pattype = $("#pattype").val();
		getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		//alert(bedStatus);
		
		if (bedStatus == 'Y') {
			
			 if (pattype == 'R') {
				 
				// alert("pattype: " + pattype);
				 
				var patId = $("#pid").val();
				var input = [];
				input.push('action=DisplayTopPat');
				input.push('page_name=' + encodeURIComponent("ipd_bedward_patR"));
				input.push('patId=' + encodeURIComponent(patId));
				var str = input.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PatientServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var ajaxResponse = r;
						var patientBean = eval('(' + ajaxResponse + ')');
						
						if(patientBean.pl.length > 0) {
							var myobj = patientBean.pl[0];
							ht = patientBean.pl[0].objHall.ht;
							var parsebcObj = JSON.stringify(myobj);
							$("#divPatId").html(parsebcObj);
						}
					}
				});
				
				setTimeout(function() {
					if (pattype == 'R') {
						var pobj = $("#divPatId").html();
						var pobj1 = eval('(' + pobj + ')');
						if (pattype != pobj1.otrBed.bdalfr) {
							$("#bedAllocated").val("N");
						} else {
							$("#bedAllocated").val("Y");
						}
						
						if ((pobj1.oBed) != undefined) {
							if (pobj1.oBed.iso == "1") {
								$('#txtIsolation').prop('checked', true);
							}else{
								$('#txtIsolation').prop('checked', false);
							}
						}
					}
				}, 500);
			}else{
				//code added by kavita
				var patId = $("#pid").val();
				var input = [];
				input.push('action=DisplayTopPat');
				input.push('page_name=' + encodeURIComponent("IPD_OldPatientDatabase"));
				input.push('patId=' + encodeURIComponent(patId));
				var str = input.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PatientServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var ajaxResponse = r;
						var patientBean = eval('(' + ajaxResponse + ')');
						
						if(patientBean.pl.length > 0) {
							var myobj = patientBean.pl[0];
							ht = patientBean.pl[0].objHall.ht;
							var parsebcObj = JSON.stringify(myobj);
							$("#divPatId").html(parsebcObj);
						}
					}
				}); //code end by kavita
			}
			 
			setTimeout(function() {
					getBillable();
			}, 1000);
			 
			var someSession = '${sessionScope.moduleName}';
			if (someSession == "opd") {
				setAvaStatus();
			}
			
		} else { // Start = bedAllocatedStatus = 'N'
			
			setTimeout(function() {
				
				showHallofType('onload');
				var pid = $("#pid").val();
				//setPatientInfo(pid);
			
				// setting Default UI for beds
				//Start  = setting of Select box and UI 
				
				//var ajaxResponseHallDetailDiv = $("#hallDetailDiv").val();
				//var pobj1 = eval('(' + ajaxResponseHallDetailDiv + ')');
				
				//irfan khan changes for new bed ui flow
				//alert("1st pobj1.htli.length: "+(pobj1.htli.length));
				//if ((pobj1.htli.length) != 0) {
					var wardID = ($("#wardIdNew").val());
					var hallTypeSelectId = ($("#hallIdNew").val());
					
					//alert(wardID + "  "+hallTypeSelectId);
					
					setTimeout(function() {
						$("#wardType1").val(wardID);
						setHallTypeSelectID(wardID);
						setHallBedsUI(hallTypeSelectId);
						$("#hallTypeSelectID").val(hallTypeSelectId);
						//alert("wardType1: "+wardID);
					}, 300);
					
					/* setTimeout(function() {
						var ajaxResponse = $("#allBedObj").val();
						var myArray = JSON.parse(ajaxResponse);
						var flag = false;
						var hallTypeSelectId = 0;
						for ( var i = 0; i < (myArray.hl.length); i++) {
							
							if ((myArray.hl[i].ht) == wardID){
								hallTypeSelectId = (myArray.hl[i].hi);
								$("#hallTypeSelectID").val(hallTypeSelectId);
								flag = true;
								break;
							}
						}
						
						if (flag) {
							setHallBedsUI(hallTypeSelectId);
						}
						
						$("#wardType1").val(wardID);
						$("#hallTypeSelectID").val(hallTypeSelectId);
						
					}, 300); */
				//}
			}, 500); //End  = setting of Select box and UI 
			
			 $("#billableDiv").hide();
			
		} // End = bedAllocatedStatus = 'N'
		
		setTimeout(function() {
			var callFor = ($("#callFor").val()).trim();
			if (callFor === "previousTreatmentIPD") {
				$("#ipdBedWardJSPHeadDiv *").prop("disabled", true);
			}
		}, 1500);
		
	}, 700);
	<%-- getDoctornameForCommonTemp(<%=request.getParameter("drid")%>); --%>
};

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
				 
				
				
				<%
	
			
			 String dtid=request.getParameter("treatmentId");
			int trid =Integer.parseInt(dtid);
			int deptid=FetchHospitalDetails.depid(trid);
			System.err.println("depid>>>>----------------->>" + deptid);
				String moduleName = (String) session.getAttribute("moduleName");
			System.err.println("moduleName>>>>>>" + moduleName);

				String pageIncludeType = request
							.getParameter("pageIncludeType");

				if (deptid==2) {

				 
			%>
			<%@include file="left_menu_IPD.jsp"%>
			<%
				} 
				else if ((deptid==1)) {
					%>
					<%@include file="menu_HelpDesk.jsp"%>
					<%
						}
				
				else {
			%>
			<%@include file="menu_DoctorDesk.jsp"%>
			<%
				}

					 
			%>
				
				
				
				<!--End Left Menu -->
				
								<%-- <%@include file="left_menu_IPDMain.jsp"%> --%>
				
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

								<!-- Page Date Print Discards Common Path info -->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li>IPD BedWard</li>
											</ul>
										</div>
									</div>

									<!-- Common Path info js/CommonTemplate.js <var commonPatInfoforbed>-->
									<!-- <div id="commonPatInfo" class="col-md-12-1"
										style="margin-top: -21px;"></div> -->
										
										
										
								
								<div class="alert alert-block alert-info fade in" style="padding-top:3%;margin-top:3%">
						
							<div class="row">
								<div class="col-md-1" style="margin-top: -33PX;">
									<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11">

									<div class="col-md-12">

										<div class="col-md-2">
											<div class="form-group">

												

												<label class="control-label lblBold">Patient Id :</label> <label
													class="control-label" id="patientId"> </label>
											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label
													class="control-label" id="age"> </label>
											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label class="control-label" id="patientName"> </label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Ipd No :</label> <label
													class="control-label" id="ipdNo">
													IPD/00002017/553-D</label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">BillNo: </label> <label
													class="control-label" id="billNo">01-D</label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label
													class="control-label" id="sex"> Male(D) </label>

											</div>
										</div>

										<div class="col-md-4">
										<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label
													class="control-label" id="corporate"> </label>

											</div>											
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Consulting
													Doctor :</label> <label class="control-label" id="consultingDoctorr">
													-</label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label class="control-label" id="billCategoty">
													 </label>

											</div>
										</div>
										
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label>
												<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
												</label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label
													class="control-label" id="doa"> 2017-05-12-D</label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label
													class="control-label" id="dod"> 2017-05-12-D</label>

											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<input type="hidden" id="uId"
													value="<%=session.getAttribute("uId")%>" /> <input
													type="hidden" id="depdocdeskid" value="0" /> <input
													type="hidden" id="sourceTypeId" value="0" /> <input
													type="hidden" id="subserviceid" value="0" /> <input
													type="hidden" id="pId" value="0" /> <input type="hidden"
													id="tId" value="0" /> <input type="hidden" id="bNo"
													value="0" /> <input type="hidden" id="bNo" value="0" /> <input
													type="hidden" id="serviceid" value="0" /> <input
													type="hidden" id="editPerticularType" value="0" /> <input
													type="hidden" id="editPerticularId" value="0" /> <input
													type="hidden" id="treatId"
													value=<%=request.getParameter("treatmentId")%> /> <input
													type="hidden" id="generalId" value="0" />
												<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
												<%-- <input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> /> --%>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
										
										
										
										
										
										
										
									<!-- Common Path info -->

								</div>
								<!--End Page Date Print Discards Common Path info-->
								<!-- <div class="divide-40"></div> -->
								<div id="ipdBedWardJSPHeadDiv">
									<div id="billableDiv" class="col-md-4-1" style="height: 70px;">
										<div class="col-md-12-1 TextFont" style="margin-bottom: 10px;">
											<h5 style="text-align: center;">Billable Bed</h5>
										</div>
										<div class="col-md-6-1">
											<div class="col-md-4-1 TextFont">Ward Type:</div>
											<div id="wardTypeSelectIDBillable"
												class="form-group col-md-8-1"></div>
										</div>

										<div class="col-md-6-1">
											<div style="padding-left: 22px;" class="col-md-4-1 TextFont">Ward:</div>
											<div class="form-group col-md-8-1">
												<select id="hallTypeSelectIDBillable"
													class="form-control input-SmallText"
													onchange="updateBillableBed()">
												</select>
											</div>
										</div>
									</div>

									<div class="col-md-1-1"
										style="margin: 0px; padding-left: 30px; font-weight: bold; float: right;">
										<div class="col-md-12-1 TextFont">
											<input id="txtIsolation" type="checkbox"
												onclick="deallocateBedAtIPD()" /> Isolation
										</div>
									</div>

									<div id="allBedsSummary" class="col-md-4-1"
										style="margin: 0px; float: right;"></div>

									<div class="divide-40"></div>

									<!-- Select Info type Header -->

									<div class="col-md-12-1" style="margin-top: 0px;">

										<!-- <div class="form-group col-md-1-1">
									<label class='TextFont'> Isolation : </label> 
									<input type="checkbox" id="txtIsolation"
										onclick="deallocateBedAtIPD()" class="form-group" />
									</div> -->

										<div class="col-md-2-1" style="margin: 0px;">
											<div class="col-md-4-1 TextFont">Ward Type:</div>
											<div id="wardTypeSelectID" class="form-group col-md-8-1">

												<!-- <select id="wardTypeSelectID"
													class="form-control input-SmallText"
													onchange='if (this.selectedIndex) getHallAndBed(this.value)'>
												</select> -->

											</div>
										</div>

										<div class="col-md-2-1" style="margin: 0px;">
											<div style="padding-left: 22px;" class="col-md-4-1 TextFont">Ward:</div>
											<div class="form-group col-md-8-1">
												<select id="hallTypeSelectID"
													class="form-control input-SmallText"
													onchange='if (this.selectedIndex) setHallBedsUI(this.value);'>
												</select>
											</div>
										</div>
										<!-- <div class="col-md-2-1" style="margin: 0px;">
											<div style="padding-left: 15px;" class="col-md-4-1 TextFont">Package:</div>
											<div class="form-group col-md-8-1">
												<select id="selectPackageID"
													class="form-control input-SmallText" onchange=''>
												</select>
											</div>
										</div> -->

										<div class="col-md-2-1" style="margin: 0px;">
											<div style="padding-left: 15px;" class="col-md-4-1 TextFont">View:</div>
											<div class="form-group col-md-8-1">
												<select class="form-control input-SmallText">
													<option onclick="changeView(this.value);"
														value="graphicalView">Graphical View</option>
													<option onclick="changeView(this.value);" value="listView">List
														View</option>
													<option id="gridViewSelectOption"
														onclick="createGridView();" value="gridView">Grid
														View</option>
												</select>
											</div>
										</div>

									</div>


									<!-- Select Info type Header -->
									<div class="panel panel-default" style="margin-top: 3.5%;">
										<div class="panel-body">

											<!-- <div id="allhalltype" style="width: 100%; overflow-x: auto;"></div> -->

											<!-- from .js <var > -->
											<div id="allbeds" class="col-md-12-1"
												style="overflow-x: scroll; max-width: auto; height: 390px;"></div>

											<div id="allbedsListViewTemp" class="col-md-12-1"
												style="display: none; margin-top: 0px"></div>

											<div id="hallsBeds" class="col-md-12-1"
												style="display: none; margin-top: 0px"></div>


											<!-- Ward Type -->
											<!-- <div style="display: none;" id="allhalltypeTemp">
												{#foreach $T.htli as htli}
												<div class='size18'
													style='width: 15%; padding: 0.3%; border: 1px solid #06C;'
													id="ht{$T.htli.idht}"
													onclick="showHallofType({$T.htli.idht})">
													<div style='width: 100%;'>{$T.htli.htnm}</div>
												</div>
												{#/for}
											</div> -->
											<!-- Ward Type -->

											<!--Billable bed popup -->
											<div id="ChangeAppointment" class="popup modal fade in"
												tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
												aria-hidden="true">
												<div class="modal-dialog col-md-6-1"
													style="margin-top: 13%; margin-left: 23%">
													<div class="modal-content">

														<div class="modal-header"
															style="padding-bottom: 0px; padding-top: 0px;">
															<div class="box-title">
																<h4>Billable Bed Tariff</h4>
															</div>
															<div
																style="float: right; padding-right: 6px; margin-top: -4%;">
																<button type="button" class="btn btn-xs btn-danger exit"
																	data-dismiss="modal">
																	<i class="fa fa-arrows"></i> Close
																</button>
																<input id="bedIDPop" type="hidden"> <input
																	id="htPop" type="hidden"> <input
																	id="patientTypePop" type="hidden">
															</div>
														</div>

														<div class="modal-body" style="height: 125px;">
															<div class="col-md-12">
																<form class="form-horizontal col-md-12-1"
																	style="margin: 0px;">
																	<!--Panel Body-->
																	<div class="form-group col-md-6-1" style="margin: 0px;">
																		<label class="checkbox-inline input-SmallText"
																			style="padding-left: 20px;"> <input
																			onclick="setBillableBed()" name="radBillableBed"
																			type="radio" id="radBillableBed1" value="sameBed">
																			Selected Bed
																		</label>
																	</div>
																	<div class="form-group col-md-6-1" style="margin: 0px;">
																		<label class="checkbox-inline input-SmallText"
																			style="padding-left: 20px;"> <input
																			onclick="setBillableBed()" name="radBillableBed"
																			type="radio" id="radBillableBed2"
																			value="differentBed"> Select Bed Type
																		</label>
																	</div>
																	<div id="divWardType" class="form-group col-md-12-1"
																		style="float: right; margin-top: 3%; margin-bottom: 0%; display: none;">
																		<div class="col-md-12-1"
																			style="margin-left: 0px; margin-top: 10px;">
																			<div class="form-group col-md-2-1">
																				<label class='TextFont'>Ward Type</label>
																			</div>
																			<div id="wardTypeSelectIDBB"
																				class="form-group col-md-4-1"
																				style="padding: 0px 5px;"></div>

																			<div class="col-md-4-1" style="padding-top: 9px;">
																				<div class="form-group col-md-3-1">
																					<label class='TextFont'>Hall</label>
																				</div>
																				<div class="form-group col-md-9-1">
																					<select id="hallTypeSelectIDBB"
																						class="form-control input-SmallText">
																					</select>
																				</div>
																			</div>

																			<button type="button" class="btn btn-primary"
																				onclick="updateBillableBed1()"
																				style="line-height: 0.6">
																				<i class="fa fa-save"></i> Save
																			</button>

																		</div>
																	</div>
																</form>
															</div>
															<!-- /BOX-->
														</div>
														<!-- /BODY-->
													</div>
												</div>
											</div>
											<!--/Billable bed popup -->
										</div>
									</div>

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

			<!-- For IPD_BedWard -->
			
			
			<input id="drid" type="hidden"
				value="<%=request.getParameter("drid") %>"
				style="display: none;" />
			<input id="tid" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
			<input id="pid" type="hidden"
				value="<%=request.getParameter("patientId")%>"
				style="display: none;" />
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
			<div id="divPatId2" style="display: none;"></div>
			<!--End: For IPD_BedWard -->

			<input type="hidden" id="BedAllocStatus" value="new"
				style="display: none;" />
			<input type="hidden" id="DallocBedId" value="0"
				style="display: none;" />
			<input id="allBedObj" type="hidden" style="display: none;" />
			<input id="hallDetailDiv" type="hidden" style="display: none;" />
			<input id="wardIdNew" type="hidden" value="0" />
			<input id="hallIdNew" type="hidden" value="0" />
			<div id="setHallAndBed" style="display: none;" ></div>
			<input id="gridView" type="hidden" style="display: none;" />
			<input id="shiftStatus" type="hidden" value="No" style="display: none;" />

			<!-- callFor=previousTreatmentIPD -->
			<input id="callFor" type="hidden"
				value="<%=request.getParameter("callFor")%>" style="display: none;" />
			<!-- /callFor=previousTreatmentIPD -->


		</c:if>
	</section>
</body>
</html>