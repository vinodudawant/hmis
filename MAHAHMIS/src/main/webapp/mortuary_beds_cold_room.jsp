<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Mortuary_coldRoom_BedWard</title>
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
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
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
<script type="text/javascript" src="js/registration.js"></script>
<script src="js/jquery.datePicker-min.js" type="text/javascript"></script>

<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script> -->
	
	<script type="text/javascript" src="js/mortuary_Beds_cold_Room.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("Mortuary_coldRoom_BedWard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">

onload = function() {
	fetchcoldroommastername(<%=request.getParameter("id")%>);
	
	
if(<%=request.getParameter("id")%> == null)
	{
	
	//ListMortuary();
	//setTheListMortuarybedallocation();
	doHideShow3(<%=request.getParameter("id")%>);
	}
else
	{
	singleMorturay(<%=request.getParameter("id")%> );
	<%-- //fechListOfmortuarysolve(<%=request.getParameter("id")%>); --%>
	
	<%-- ListMortuary(<%=request.getParameter("id")%>); --%>
		<%-- getBedAvaColdRoom(<%=request.getParameter("id")%>); --%>
		
		
	}
	

	

};




<%-- onload = function() {
	getPatientDataByTreatmentId(<%=request.getParameter("treatId")%>);
	getallHallType('dummyParam');	
	getBedAva('allBed');
	$("#bedwar").addClass("anchorActive");
	alert($("#id").val());
	getConsultantDrName(<%=request.getParameter("treatId")%>); 
	
	setTimeout(function() {
		
		var bedStatus = $("#bedAllocated").val();
		var ht = $("#ht").val();
		var pattype = $("#pattype").val();
		
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
				var ajaxResponseHallDetailDiv = $("#hallDetailDiv").val();
				var pobj1 = eval('(' + ajaxResponseHallDetailDiv + ')');
				
				//alert("1st pobj1.htli.length: "+(pobj1.htli.length));
				if ((pobj1.htli.length) != 0) {
					var wardID = (pobj1.htli[0].idht);
					//alert(wardID);
					
					setTimeout(function() {
						$("#wardType1").val(wardID);
						setHallTypeSelectID(wardID);
						//alert("wardType1: "+wardID);
					}, 300);
					
					setTimeout(function() {
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
						
					}, 300);
				}
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
	
};
 --%>
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
			<%@include file="left_menu_mortuary.jsp"%>
				
				<!--End Left Menu -->
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
							
								<input type="hidden" id="cold_room_id" name="" value="<%=request.getParameter("id")%>">
								
								<!-- Page Date Print Discards Common Path info -->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header" style="margin-bottom: 5px">
											<ul class="breadcrumb col-md-12">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ehat_mortuary.jsp">Mortuary</a></li>

												<li>Mortuary_ColdRoom_BedWard</li>
											</ul>
										</div>
									</div>
								</div>
								
								
								
								<div id="mortuaryid_popup" class="breadcrumb col-md-12-1" style="padding-block-end:0%; 
								margin-top:-3px;">

												<div class="row">
													<div class="col-md-1" style="margin-top: -4px">
														<img id="patImg" class="img-responsive" src="" alt="">
													</div>
					
													<div class="col-md-11">
					
														<div class="col-md-12" style="margin-top: 20px">
					
															<div class="col-md-2">
																<div class="form-group">
					
																	<label class="control-label lblBold">Mortuary Id :</label> <label
																		class="control-label" id="mortuaryId"> </label>
																		<input type="hidden" id="mortuaryId">
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
																	<label class="control-label lblBold">Deceased Name :</label>
																	<label class="control-label" id="deceasedName"> </label>
					
																</div>
															</div>
					
															<div class="col-md-3">
																<div class="form-group">
																	<label class="control-label lblBold">Date of Death :</label> <label
																		class="control-label" id="dod">
																		2017-05-12-D</label>
					
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">Gender: </label> <label
																		class="control-label" id="sex"></label>
					
																</div>
															</div>
					
															<div class="col-md-6">
																<div class="form-group">
																	<label class="control-label lblBold">Address :</label> <label
																		class="control-label" id="address"> Address </label>
					
																</div>
															</div>
					
					<%-- 										<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">Bill Category :</label>
																	<label class="control-label" id="billCategoty">
																		 </label>
					
																</div>
															</div>
					
															<div class="col-md-12">
																<div class="form-group">
																	<label class="control-label lblBold">Consulting
																		Doctor :</label> <label class="control-label" id="consultingDoctorr">
																		-</label>
					
																</div>
															</div>
					
															<div class="col-md-4">
																<div class="form-group">
																	<label class="control-label lblBold">Corporate :</label> <label
																		class="control-label" id="corporate"> </label>
					
																</div>
															</div>
					
															<div class="col-md-3">
																<div class="form-group">
																	<label class="control-label lblBold">DOA:</label> <label
																		class="control-label" id="doa"> 2017-05-12-D</label>
					
																</div>
															</div>
					
															<div class="col-md-3">
																<div class="form-group">
																	<label class="control-label lblBold">DOD :</label> <label
																		class="control-label" id="dod"> 2017-05-12-D</label>
					
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
                                                 					<label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>                                                      
                                             					</div>
															</div> --%>
					
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
																		value=<%=request.getParameter("treatId")%> /> <input
																		type="hidden" id="generalId" value="0" />
																	<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
																	<%-- <input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> /> --%>
																</div>
															</div>
					
														</div>
													</div>
												</div>
											</div>
										
										
										
									<!-- --Touheed Old patient information remove-- -->
								
						
								<div class="col-sm-12" style="margin-top:2%;">
								
									<div class="col-md-4-1" style="margin-top: 0%;">
									
										<div class="form-group col-md-4-1 TextFont" style="font: bold;" >Cold Room Name:</div>//ap
										<div id="ColdRoomSelectID"style="margin-top: -3%;" class="form-group col-md-8-1">

											<select id="selColdRoom" class="form-control input-SmallText" onchange="ListMortuary(this.id);">
											</select>
											<input type="hidden" value="" name="" id="">										</div>
										
									</div>
									
								
								</div>
								<br><br>
								
								
								<!---------------------- Modal  for document start --------- -->

					<!-- <div class="modal fade" id="myModal">
						<div class="modal-dialog">
							<div class="modal-content">

								Modal Header
								<div class="modal-header">
									<h4 class="modal-title" style="background: green; color: white;text-align: center;">AllocateBad</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>
								</div>

								Modal body
								<div class="modal-body">
									<div class="col-lg-12">
										<Div class="col-md-6-1"><input type="radio" name="bedName" value=""/>
										<label id="" style="font-size:2em;">Mortuary Allocate Bed</label></div>
									</div>
									<div class="" style="margin: 0px;">
										<table class="table table-condensed cf table-bordered"
											style="margin-top: 10px;">
											<thead class='cf' style="background: blue">
												<tr style="font-weight: bold;">
													<th class='center TextFont'
														style="width: 5%; color: white; font-size: 15px;">#</th>
													<th class='center TextFont'
														style="width: 5%; color: white; font-size: 15px;">File</th>
													<th class='TextFont'
														style="width: 5%; color: white; font-size: 15px;">View</th>
													<th class='TextFont'
														style="width: 5%; color: white; font-size: 15px;">Remove</th>
												</tr>
											</thead>
											<tbody id="viewDoctratment">
												
											</tbody>
										</table>
									</div>
									<br> <br> <br>
									<div class="col-md-12">
										<div class="col-md-4">
											<label> Attach File</label>
										</div>

										<div class="col-md-4">
											<input type="file" name="file" id="ifile" multiple="multiple"/>
										</div>
										
										<div class="col-md-4">
											<button type="button" class="btn btn-primary" onclick="savePatientDocument()">Upload Document</button>
										</div>
									</div>
								</div>

								Modal footer
								<div class="modal-footer" style="text-align: center;">
									<button type="button" class="btn btn-primary" onclick="setDataMortuary()">Yes</button>
									<button type="button" class="btn btn-warning"
										data-dismiss="modal">No</button>
								</div>
							</div>
						</div>
					</div>
 -->
					<!---------------------- Modal  for document End --------- -->

			

						<!-- --Touheed Old patient information remove-- -->

						<!-- Common Path info -->

						<!-- </div> -->
						<!--End Page Date Print Discards Common Path info-->
						<div class="divide-5-1"></div>
						<div class="col-sm-12" style="margin-top:20px;overflow:auto;">
									<div class="col-md-2-1" id="allbeds" >
									
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

			<!-- For coldRoom_BedWard -->
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
			<!--End: For IPD_BedWard -->

			<input type="hidden" id="BedAllocStatus" value="new"
				style="display: none;" />
			<input type="hidden" id="DallocBedId" value="0"
				style="display: none;" />
			<input id="allBedObj" type="hidden" style="display: none;" />
			<input id="hallDetailDiv" type="hidden" style="display: none;" />
			<div id="setHallAndBed" style="display: none;" ></div>
			<input id="gridView" type="hidden" style="display: none;" />

			<!-- callFor=previousTreatmentIPD -->
			<input id="callFor" type="hidden"
				value="<%=request.getParameter("callFor")%>" style="display: none;" />
			<!-- /callFor=previousTreatmentIPD -->

 
		</c:if>
	</section>
</body>
</html>