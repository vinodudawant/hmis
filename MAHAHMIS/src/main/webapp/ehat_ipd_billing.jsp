<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Billing | MAHAHMIS</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
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

<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />

<!-- STYLESHEETS -->
<!--[if lt IE 9]><script src="js/flot/excanvas.min.js"></script><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
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

<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">

<!-- BOOTSTRAP SWITCH -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<!-- FONTS -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<!-- CUSTOM SCRIPT -->
<!-- <script type="text/javascript" src="js/ehatMaster.js"></script>
	<script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script> -->
		<script src="js/chargesMasterSlave.js"></script>
<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>		
	
<script type="text/javascript" src="js/registration.js"></script>
<!--   <script type="text/javascript" src="js/billNoble.js"></script>  
 -->
  <script type="text/javascript" src="js/ehat_ipdbill.js"></script>
  <script type="text/javascript" src="js/ehat_ipdbill1.js"></script>

<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>
<script type="text/javascript" src="js/sendToLab.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/otPharma.js"></script>
<script type="text/javascript" src="js/ehat_ipdPharma.js"></script>
<script type="text/javascript" src="js/currencyMaster.js"></script>
<script type="text/javascript" src="js/emergengyCharges.js"></script>
<script type="text/javascript" src="js/sendToRis.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/radiation.js"></script>
<script type="text/javascript" src="js/pathology_information.js"></script>
<script type="text/javascript" src="js/ipd_bed_mgt.js"></script>
<!--  <script type="text/javascript" src="js/ehat_billing.js"></script>  -->

<!-- include js for development -->

<script type="text/javascript">
	
	shortcut.add("Shift+z", function() {
		
		var sponsorId=$("#receiptOf").val();				
		if(sponsorId=="IpdSponsor"){
			
			saveServiceToSponsorPatient();
		}else{
			
			saveServiceToPatient();
		}
	});
	/* -----for cghs print shortcuts------ */
	shortcut.add("Shift+y", function() {
		
		allPrints('Yes');
	});
	shortcut.add("Shift+n", function() {
	
		allPrints('No');
	});
	shortcut.add("Shift+x", function() {
	
		closePopupForCghsPrint();
	});
/* -----End of cghs print shortcuts------ */
	function stActiveTab(){
		
		var sponsorId=$("#chargesSlaveId").val();
		if(sponsorId>0){
					
			$("#ipdSponsor").trigger('click');	
			//resetAllIpd("IpdSponsor");	
		}else{
			
			//$("#ipdGeneral").trigger('click');	
			resetAllIpd("general");
		}	
	}
	
</script>

<script>
	jQuery(document).ready(function() {

		var fb=$("#finalbillis").val();
		var userType=$("#userType").val();
		
		setIpdBillDetailsDistribute();
		setBulkSettleDistributeOnloadIpd();

		if(fb=="finalBill"){
			if(userType=="admin"){
				
				hideBillDetails();
				hideBillDetailsCghs();
			}else{
				
				hideBillDetails();
				$("#hidebilldet").hide();
				//$("#hidebilldet").prop("disabled",true);
			} 
			
			$("#refundableCheckbox").show();
			$("#refundableDiffCheckbox").show();
			$("#outstandingCheckbox").show();			
			$("#btnRefund").show();	
			$("#btnDisSum").show();				
			
		}else{
			
			$("#outstandingCheckbox").hide();			
			$("#refundableCheckbox").hide();
			$("#refundableDiffCheckbox").hide();			
			$("#btnRefund").hide();	
			$("#btnDisSum").hide();	
		}			

		ViewTestSampleList("onload");//pathology related
		
		<%-- getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); 
		getPatientDataByTreatmentId2(<%=request.getParameter("treatmentId")%>); --%> 
		getIpdPatientHeaderInfo(<%=request.getParameter("treatmentId")%>);
		<%-- getPatientDischargeDateByTreatmentId(<%=request.getParameter("treatmentId")%>); --%>
		//Added By Pooja
		<%-- getPatientBedHall(<%=request.getParameter("treatmentId")%>); --%>
		getServicesOnBillingIPD();
		<%-- getPatientBillById(<%=request.getParameter("treatmentId")%>); --%>		
		setConcessionWhenAccesOnForIpd();
		<%-- getConsultantDrName(<%=request.getParameter("treatmentId")%>); --%> 
		
		var c=$("#preIpdId").val();
		
		if(fb=="finalBill" || c=="treatcloseForIpd"){
		
			$("#outstandingCheckbox").show();
			$("#refundableCheckbox").show();
			$("#btnDisc").show();
			$("#btnRefund").show();	
			//$("#btnDisSum").show();
			
		}else{
			
			$("#outstandingCheckbox").hide();
			$("#refundableCheckbox").hide();
			$("#btnDisc").hide();
			$("#btnRefund").hide();
			//$("#btnDisSum").hide();
		}		
		
		var phyDisFlag = "<%=request.getParameter("phyDisFlag")%>";
		if(phyDisFlag == "Y" || c=="treatcloseForIpd"){
			
			$("#lblShiftBed").hide();
			$("#lblShiftBedSp").hide();
		}else{
			
			$("#lblShiftBed").show();
			$("#lblShiftBedSp").show();
		}

		var treatIdd = <%=request.getParameter("treatmentId")%>;

		if(fb == "generalBill"){ 
			
			$("#btnTreatClose").hide();	
			$("#btnGenInvoice").show();	
			$("#btnDisSum").show();	
			$("#bedShiftBtn").attr("href","ipd_bed_allocation_new.jsp?treatId="+treatIdd+"&callFrom='shiftBed'&flag=newGeneral ");
			$("#bedShiftBtnSponsor").attr("href","ipd_bed_allocation_new.jsp?treatId="+treatIdd+"&callFrom='shiftBed'&flag=newGeneral ");
		}else{
			$("#btnTreatClose").show();
			$("#btnGenInvoice").hide();	
			$("#btnDisSum").hide();	
			$("#bedShiftBtn").attr("href","ipd_bed_allocation_new.jsp?treatId="+treatIdd+"&callFrom='shiftBed'&flag=newFinal ");
			$("#bedShiftBtnSponsor").attr("href","ipd_bed_allocation_new.jsp?treatId="+treatIdd+"&callFrom='shiftBed'&flag=newFinal ");
		}
		 
		if(c=="treatcloseForIpd"){ 
						
			//$("#btnGenInvoice").hide();	
			$('#currentCalfromdiv').hide();
			$('#prevCalfromdiv').show();
			//$("#divPrePay").show();				
			//$('#lblShiftBed').hide();
			
			$('#generalHideForIpd').hide();
			$('#generalHideForIpdPrevBill').show();
			$('#fileUploadForBilling').hide();
		}else{ 
			
			//$("#btnGenInvoice").show();	
			$('#currentCalfromdiv').show();
			$('#prevCalfromdiv').hide();
			//$("#divPrePay").hide();			
			//$('#lblShiftBed').show();
			
			$('#generalHideForIpdPrevBill').hide();
			$('#generalHideForIpd').show();
			
		} 
		
		var dischargeTimeForInvoiceFlage=$("#dischargeTimeForInvoiceFlage").val();
		//alert(dischargeTimeForInvoiceFlage);
		if(dischargeTimeForInvoiceFlage == "on"){
			$("#btnDisSum").show();
		}else{
			$("#btnDisSum").hide();
		}
		setTimeout(function() {			
			$('#perticular').focus();
			$('#perticularIpdSponsor').focus();
		}, 30);
		
		getDocListUnitWise();
		EmerChrAccordingToTime();
		
		updateIpdBillDetails();
		showAndHideSponsorForIpd();
		getBankMasterList2(); //Added by sagar 		
		fetchAuthorisedBy();
		getAllPayments();
		getAllNarrations();		
		
		/**************pharmacy indent******************/
		//GetTotalPaybleByTreatId('current');
		//displayTotalRecievedAmountByTreatmentId('current');
		displayPendingAmountByTreatmentId('current');
		getPatientCommanAdvance();// added by dayanand for getting common advance 
		getAllDoctorListForRegistartion();
		//getTotalindentDataByTreatmentId();
		//TotalDiscountByPharmacyOnBillByTreatmentId();
		//getOneCurrencySymbols();
		//getOneCurrencySymbols2();
		//getPharmacyInIpdBillOrNot();
		var shraddha=$("#shraddha").val();
		if(shraddha != "on"){			
			//returnAmoutPharma();			
			//pendingAmoutPharma();			
		}
		//setUiMode();
		
		/* var spnsrId=$("#chargesSlaveId").val();
		if(spnsrId>0){
			setallchargesConfigOnBilling("perticularIpdSponsor");
		}else{
			autosuggetionForDefaultIPD("perticular");
		} */
		/**************pharmacy indent******************/
		/* $("#hideshowiPharmacyBtn").hide('hide'); */
		$('#timeFrom2').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});
		$('#timeFrom3').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});
		
		stActiveTab();	
		setCreditBillMode();

		var sponsorIdIpd=$("#chargesSlaveId").val();
		if(sponsorIdIpd>0){
			
			getSpecialization("reg","specialityIdSponsor");
		}else{
			
			getSpecialization("reg","specialityId");
		}	
		$("#splNamePackageIpd").select2();
		$("#doctorNamePackageIpd").select2();
		$(".openAllSlaveIpd").trigger('click');

		/* var myEl = document.getElementsByClassName('openAllSlaveIpd');

		myEl[0].addEventListener('click', function() {
			userAccess();
		}, false); */	

		$(".openAllSlaveIpd").click(function(){
			setTimeout(function(){userAccess();},200);
		});	
		
	});
	
</script>

<style>
.lblBold {
	font-weight: 600;
	/* color: #518e2e; */
}
</style>

</head>
<body>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">
	
		<%@include file="Menu_Header_Nobel.jsp"%>


		<%
			java.util.Calendar currentDate = java.util.Calendar
						.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
						"dd-MM-yyyy");
				String todays_date = formatter.format(currentDate.getTime());
				java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
						"dd/MM/yyyy");
				String current_date = formatter1.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
				String todays_time = formatterrr.format(currentDate.getTime());
		%>
		
		<% 
			ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");   
		 	String concessionFlow = resourceBundleEha.getObject("concessionFlow").toString();
		 	String multipleSponsor = resourceBundleEha.getObject("multipleSponsor").toString();		 	
		 	
		 	ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");   
		 	String pharmacyInvoice = resourceBundle.getObject("pharmacyInvoice").toString();
		 	String pharmacy = resourceBundle.getObject("pharmacy").toString();
		 	String packageID = resourceBundle.getObject("packageID").toString();
		 
			String uiModeSetting = resourceBundleEha.getObject("uiMode").toString();
			String dischargeTimeForInvoiceFlage = resourceBundleEha.getObject("dischargeTimeForInvoiceFlage").toString();
			String shraddha = resourceBundleEha.getObject("shraddha").toString();
			
			ResourceBundle resourceBundleEhat1 = ResourceBundle.getBundle("Ehat");  
			ResourceBundle resourceBundleEhatOT = ResourceBundle.getBundle("OT_Service");
		 %>
	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">

		<!-- SIDEBAR -->
		<%@include file="left_menu_bill.jsp"%>
		<!-- /SIDEBAR -->
				
		<div id="main-content">
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header" style="margin-bottom: 5px">
									<!-- STYLER -->

									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li>Billing</li>
										
										<!-- <div class="li pull-right">
											<div class="form-group"> 
												<div class="col-md-12"> 													
													<div class="row" id="input-type"> 
														<div class="col-sm-4"> 
															<label class="radio-inline">Other  
															<input type="radio" value="Other" onclick="OtherRecord()" id="Otherid" name="privilegesModify">  
															</label> 
														</div> 
														
														<div class="col-sm-4"> 
															<label class="radio-inline">Patient  
															<input type="radio" value="Patient" onclick="OtherRecord2()" id="Patientid" name="privilegesModify" checked="checked">
															</label>
														</div> 		
														
														<div class="col-sm-4"> 
															<label class="radio-inline"> 
																<button onclick="savePatientRegDetails()" title="" data-placement="left" data-toggle="tooltip" class="pull-right btn btn-xs btn-success btn-table-add-row" id="savebuton" type="button" data-original-title="Save Patient Details &amp; Print"><i class="fa fa-save"></i></button>
											  				</label>
														</div> 											 
													</div> 
												</div> 
											</div> 
										</div> -->
																				
										<li id="requestToIPD"></li>
												<div class="li pull-right">
												
													<form action="UploadDoctordeskServlet" id="fileUploadfrm"
												name="fileUploadfrm" enctype="multipart/form-data"
												method="post">	
												
												<input type="hidden" id="TRTiD" name="TRTiD" value="<%=request.getParameter("treatmentId")%>"><input
													type="hidden" id="PiD" name="PiD" value="<%=request.getParameter("patientId")%>">
												<input type="hidden" id="txtNotes" name="txtNotes" value="From IPD Bill">
																				
												<div class="centered">													
													<!-- <div class="col-md-1" style="right: 0%;">
													<input type="file" name="file" 
															id="ifile" style="margin-top: 0px; cursor: pointer;display: none;"><br>
													</div>
													<div class="col-md-1">
													<button class="btn btn-xs btn-danger " type='submit' id="btnTreatClos"
												data-toggle="tooltip" data-placement="left" style="display: none;"
												title="Upload Documents" value="Upload Documents" onclick='uploadDocumentIpd()'>
												<i class=" fa fa-upload"></i>
												</button>	
													</div> -->
													
													
													<div class="col-md-6">
													
														<div class="col-sm-7"> 
															<label class="radio-inline">General
															<input type="radio" value="1" id="generalBill" checked="checked" name="billType">  
															</label> 
														</div> 
														
														<div class="col-sm-5"> 
															<label class="radio-inline">Credit
															<input type="radio" value="2" id="creditBill" name="billType">
															</label>
														</div> 		
														
														<!-- <div class="col-sm-4"> 
															<label class="radio-inline">Provisional
															<input type="radio" value="3" id="provisionalBill" name="billType">
															</label>
														</div> --> 
													
													</div>
													<div class="col-md-6">
																									
														<button class="btn btn-xs btn-success " type='button'
															data-toggle="tooltip" data-placement="left" id="btnGenInvoice"
															title="Generate Invoice" value='Generate Invoice' style="margin-left: 10px"
															onclick='generateInvoice(<%=request.getParameter("treatmentId")%>)'>
														<i class="fa fa-money"></i>
														</button>
													
														<button class="btn btn-xs btn-success " type='button'
															data-toggle="tooltip" data-placement="left" id="btnTreatClose"
															title="Close Treatment" value='Close Treatment'
															onclick='closePatientTreatmentForIPD(<%=request.getParameter("treatmentId")%>)'>
														<i class=" fa fa-times"></i>
														</button>
														<!-- <button class="btn btn-xs btn-warning editUserAccess"
															data-toggle="tooltip" data-placement="left"
															title="Convert To IPD" onclick="ConvertToIpd()" disabled="disabled">
															<i class="fa fa-exchange"></i>
														</button> -->
														
														<!-- <button class="btn btn-xs btn-success editUserAccess" type='button'
															data-toggle="tooltip" data-placement="left" id="btnIpdPrint" data-target="#ipdBillPrints" data-toggle="modal"
															title="Summary Bill Print" value='Summary Bill Print' onclick="showPrintsModal()">
														<i class=" fa fa-print"></i>
														</button> data-toggle="tooltip" data-placement="left" id="btnIpdPrint" data-target="#ipdBillPrints" data-toggle="modal"  -->	
														
														
														<button class="btn btn-xs btn-success " type='button'
															data-toggle="tooltip" data-placement="left" id="btnIpdPrint"
															title="Final Print Without Zero" value='Final Print Without Zero'
															onclick='receiptBillPrint("ipdSummary",<%=request.getParameter("treatmentId")%>)'>
														<i class=" fa fa-print"></i>
														</button>
														
														<button class="btn btn-xs btn-warning " type='button'
															data-toggle="tooltip" data-placement="left" id="btnIpdPrint"
															title="Final Print With Zero" value='Final Print With Zero'
															onclick='receiptBillPrint("ipdSummaryWithZero",<%=request.getParameter("treatmentId")%>)'>
														<i class=" fa fa-print"></i>
														</button>
														<%-- <%
															String rising = resourceBundleEha.getObject("rising").toString();
															if(rising.equals("on")){
																
														%>
														
														<button class="btn btn-xs btn-success editUserAccess" type='button'
															data-toggle="tooltip" data-placement="left" id="btnIpdPrint"
															title="Final Print WIthout Discount" value='Final Print WIth Discount'
															onclick='receiptBillPrint("ipdSummarywithoutDisc",<%=request.getParameter("treatmentId")%>)'>
															<i class=" fa fa-print"></i>
														</button>
														
														<%	} %> --%>
														
														<%-- <button class="btn btn-xs btn-primary editUserAccess" type='button'
															data-toggle="tooltip" data-placement="left" id="btnIpdPrint"
															title="Summary Bill with Pharmacy Print" value='print'
															onclick='receiptBillPrintWithPharmacy("ipdSummary",<%=request.getParameter("treatmentId")%>)'>
														<i class=" fa fa-print"></i>
														</button> --%>
														
														<button class="btn btn-xs btn-info" type='button'
															data-toggle="tooltip" data-placement="left" id="btnDisSum"
															title="Go to Discharge Summary" value='Generate Invoice' style="margin-left: 10px"
															onclick='goToDischargeSummary(<%=request.getParameter("treatmentId")%>)'>
														<i class="fa fa-share"></i>
														</button>
														
													<!-- <button class="btn btn-xs btn-danger">Discard</button> -->						
													</div>
													</div>
													</form>
												</div>
												
										<div class="li pull-right">

											<%-- <label id="fileUploadForBilling"
												style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
												<a target=""
												href="ehat_file_upload.jsp?treatmentId=<%=request.getParameter("treatmentId")%>&finalbillIs=<%=request.getParameter("finalbillIs")%> ">
													<i class="fa fa-arrow-circle-right"></i>  <font color="red">File Upload</font> 
											</a>
											</label> --%>
											<label class="checkbox-inline">Emergency Charge <input
												onclick="setBoxIpd();" type="checkbox" value="N"
												id="emrChrFlag">
												</label>
											   
										
												<label class="text-inline" id="perBox"> <input
												type="text" value="0" name="emrPer" id="emrPer"
												style="display: none;height:22px;width: 61px;" onkeyup="calculateEmrCheIpd('main')"
												onkeypress="return validateNumPer2(event)">
											
												</label>
										 
										</div>
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>
						<!-- /PAGE HEADER -->
						
						<div class="alert alert-block alert-info fade in" style="height: 0%;">

							<div class="row">
								<div class="col-md-1">
									<img id="patImg" style="width: 100%; height: 45px"
										src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11">

									<div class="col-md-12 form-row">

										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold" id="lblCenterPatientId">UHID
													:</label> <label class="control-label" id="patientId"
													style="display: none;"> </label> <label
													class="control-label" style="display: none" id="prnId">
												</label> <label class="control-label" id="centerPatientId">
												</label>
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label class="control-label" id="patientName"> </label>

											</div>
										</div>
										
										<div class="col-md-3"  style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label>
												<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
												</label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<input type="hidden" id="deptid" value="0"> <label
													id=billipdlable class="control-label lblBold">Ipd
													No :</label> <label class="control-label" id="ipdNo">
													IPD/00002017/553-D</label>
											</div>
										</div>
										
										<div class="col-md-3" style="display: none">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BNo: </label> <label
													class="control-label" id="billNo">01-D</label>

											</div>
										</div>
										
									</div>
									
									<div class="col-md-12 form-row">
										
										<div class="col-md-3"  style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label
													class="control-label" id="age"> </label>
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Ref Dr:</label> <label
													id="refDoctor" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-3"  style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label
													class="control-label" id="sex"> Male(D) </label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Bill No : </label> <label
													class="control-label" id="consultingDoctor"
													style="display: none;">Vinod-D</label> <label
													class="control-label" id="preBillId">0</label>
											</div>
										</div>
										
									</div>
									<div class="col-md-12 form-row">
										
										<div class="col-md-3"  style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">DOA :</label> <label
													class="control-label" id="doa"> 2017-05-12-D</label>

											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label>
												<label id="consultingDoctorr" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-3"  style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label class="control-label" id="billCategoty"> </label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">DOI :</label>
												<label class="control-label" id="invCreatedDateTime"> </label>

											</div>
										</div>
										
									</div>
									<div class="col-md-12 form-row">
										
										<div class="col-md-3"  style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label
													class="control-label" id="dod"></label>

											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label
													class="control-label" id="corporate"> </label>
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Hall Name :</label>
												<label class="control-label" id="hallName"> </label>

											</div>
										</div>
										
										<div class="col-md-3 hide">
											<div class="form-group">
												<input type="hidden" id="uId" value="<%=session.getAttribute("uId")%>" /> 
												<input type="hidden" id="prePostPaid" value="0" />
												<input type="hidden" id="customerType" value="0" /> 
												<input type="hidden" id="customerId" value="0" />
												<input type="hidden" id="businessType" value="2" />
												<input type="hidden" id="registeredAt" value="other" />
												<input type="hidden" id="depdocdeskid" value="0" />
												<input type="hidden" id="sourceTypeId" value="0" /> 
												<input type="hidden" id="subserviceid" value="0" /> 
												<input type="hidden" id="pId" value="0" /> 
												<input type="hidden" id="tId" value="0" />
												<input type="hidden" id="bNo" value="0" /> 
												<input type="hidden" id="bNo" value="0" /> 
												<input type="hidden" id="serviceid" value="0" /> 
												<input type="hidden" id="editPerticularType" value="0" /> 
												<input type="hidden" id="editPerticularId" value="0" /> 
												<input type="hidden" id="treatId" value=<%=request.getParameter("treatmentId")%> /> 
												<input type="hidden" id="generalId" value="0" />
												<input type="hidden" id="pHeight" value="0" />
												<input type="hidden" id="pWeight" value="0" />
												<input type="hidden" id="uvCount" value="0" />
												<input type="hidden" id="lmpDate" value="" />
												<input type="hidden" id="mobileNo" value="0" />
												<input type="hidden" id="hallTypeId" value="0" />
												<input type="hidden" id="hallId" value="0" />
												<input type="hidden" id="bedId" value="0" />
												<input type="hidden" id="treatBedsId" value="0" />
												<input id="drid" type="hidden" value="0" style="display: none;" />
												<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
												<%-- <input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> /> --%>
											</div>
										</div>
										
									</div>
									
								</div>
							</div>
						</div>
						
						<!-- SAMPLE -->
						<%-- <div class="panel panel-primary">
								<div class="panel-body">
								<div class="row">
								<div class="col-md-1">
									<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>
									<div class="col-md-10" style="margin-top: 10px;">
										<div class="col-md-4">
											<div class="form-group">

												<label class="control-label lblBold" id="lblCenterPatientId">Patient
													Id :</label> <label class="control-label" style="display: none"
													id="patientId"> </label> <label class="control-label"
													id="centerPatientId"> </label>
											</div>
										</div>

										<div class="col-md-4">
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
													class="control-label" id="ipdNo"></label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BNo: </label> <label
													class="control-label" id="billNo"></label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label
													class="control-label" id="sex"></label>

											</div>
										</div>

										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label
													class="control-label" id="doa"></label>

											</div>
										</div>


										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Bill No: </label> <label
													class="control-label" id="billno1"></label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label>
												<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
												</label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label>
												<label id="consultingDoctorr" class="control-label">
												</label>

											</div>
										</div>
										
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Ref Dr:</label> <label
													id="refDoctor" class="control-label"></label>
											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label
													class="control-label" id="dod"></label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label class="control-label" id="billCategoty"> </label>

											</div>
										</div>
										
										<div class="col-md-8">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label
													class="control-label" id="corporate"> </label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
												<!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
												<label class="control-label lblBold">Hall:</label> <label
													id="hallName" class="control-label"></label>
											</div>
										</div>



										<div class="col-md-4">
											<div class="form-group">
												<input type="hidden" id="uId"
													value="<%=session.getAttribute("uId")%>" /> <input
													type="hidden" id="depdocdeskid" value="0" /> <input
													type="hidden" id="sourceTypeId" value="0" /> <input
													type="hidden" id="subserviceid" value="-1" /> <input
													type="hidden" id="pId" value="0" /> <input type="hidden"
													id="tId" value="0" /> <input type="hidden" id="bNo"
													value="0" /> <input type="hidden" id="bNo" value="0" /> <input
													type="hidden" id="serviceid" value="0" /> <input
													type="hidden" id="editPerticularType" value="0" /> <input
													type="hidden" id="editPerticularId" value="0" /> <input
													type="hidden" id="treatId"
													value=<%=request.getParameter("treatmentId")%> /> <input
													type="hidden" id="generalId" value="0" /><input
													type="hidden" id="refDocId" value="0" />
												<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
												<input type="hidden" id="patientId"
													value=<%=request.getParameter("patientId")%> />
											</div>
										</div>
									</div>

								</div>
							</div>
						</div> --%>
								
						<%-- <div class="alert alert-block alert-info fade in col-md-12-1" style="padding-block-end:8%;margin-top:-4px;">

							<div class="row">
								<div class="col-md-1">
									<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11">

									<div class="col-md-12">

										<div class="col-md-3">
											<div class="form-group">

												<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label> <label
													class="control-label" style="display:none" id="patientId" > </label>
													
													<label class="control-label" id="centerPatientId" > </label>
											</div>
										</div>

										<div class="col-md-3"style="padding-left: 10%;">
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
													class="control-label" id="ipdNo"></label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BNo: </label> <label
													class="control-label" id="billNo"></label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label
													class="control-label" id="sex"></label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label class="control-label" id="billCategoty">
													 </label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label
													class="control-label" id="corporate"> </label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Bill No:
													</label> <label class="control-label" id="billno1"></label>

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
													class="control-label" id="doa"></label>

											</div>
										</div>										
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label
													class="control-label" id="dod"></label>

											</div>
										</div>								
										
										<div class="col-md-12" >
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-4">
										<div class="form-group">
                                          		<label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>                                  
                                         </div>
										</div>
											
									 <div class="col-md-4">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->   
                                              		<label class="control-label lblBold">Hall:</label> <label id="hallName" class="control-label"></label>
                                              </div>
                                     </div>
										

										<div class="col-md-3">
											<div class="form-group">
												<input type="hidden" id="uId"
													value="<%=session.getAttribute("uId")%>" /> <input
													type="hidden" id="depdocdeskid" value="0" /> <input
													type="hidden" id="sourceTypeId" value="0" /> <input
													type="hidden" id="subserviceid" value="-1" /> <input
													type="hidden" id="pId" value="0" /> <input type="hidden"
													id="tId" value="0" /> <input type="hidden" id="bNo"
													value="0" /> <input type="hidden" id="bNo" value="0" /> <input
													type="hidden" id="serviceid" value="0" /> <input
													type="hidden" id="editPerticularType" value="0" /> <input
													type="hidden" id="editPerticularId" value="0" /> <input
													type="hidden" id="treatId"
													value=<%=request.getParameter("treatmentId")%> /> <input
													type="hidden" id="generalId" value="0" /><input
													type="hidden" id="refDocId" value="0" />
												<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
												<input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> />
											</div>
										</div>

									</div>
								</div>
							</div>
						</div> --%>

						<div class="row">

							<%
								if(uiModeSetting.contains("on")){
									
							%>

							<div class="col-md-9" style="padding-right: 0px" id="servDiv">
							
							<%
								}else{
							%>
							
								<div class="col-md-12" style="padding-right: 0px" id="servDiv">
							<%
								}
							%>

								<div class="col-md-12 box">
									<!-- BOX -->
									<div class="box border">
										<div class="box-title">
											<h4>
												<i class="fa fa-column"></i><span
													class="hidden-inline-mobile"></span>
											</h4>
										</div>
										<div class="box-body" id="mainBillDeatils">
											<div class="tabbable header-tabs">
												<ul class="nav nav-tabs">
												
												 	<!-- <li><a href="#box_tab7" data-toggle="tab"><i
															class="fa fa-desktop" ></i>
															 <span
															class="hidden-inline-mobile" > Bill Estimate</span></a></li>
													
												
													<li><a href="#box_tab6" data-toggle="tab" ><i
															class="fa fa-desktop" ></i>
															 <span
															class="hidden-inline-mobile" onclick="setCghsMode()"> CGHS Bill</span></a></li> -->
													
													<li id="sponsorHideForIpd1"><a href="#box_tab5" data-toggle="tab" style="display: none;" id="sponsorHideForIpd"><i
															class="fa fa-flask"></i> <span id="ipdSponsor"
															
															class="hidden-inline-mobile" onclick="resetAllIpd('IpdSponsor')">Sponsor Bill</span></a></li>
													
													
													
													<li id="generalHideForIpd1" class="active"><a href="#box_tab4" id="generalHideForIpd"
														data-toggle="tab"><i class="fa fa-home"></i> <span id="ipdGeneral"
															class="hidden-inline-mobile" onclick="resetAllIpd('general')">General Bill</span> <!-- <span
														class="badge badge-blue font-11">3</span> --></a></li>
												
												
													<%-- <li class="active"><a href="#box_tab4"
														data-toggle="tab" id="generalHideForIpdPrevBill"><i class="fa fa-home"></i> <span
															class="hidden-inline-mobile" onclick="getPatientPreviousBillAmountForGenIpd(<%=request.getParameter("treatmentId")%>,'general')">General Bill</span> </a></li> --%>
															
													<li class="active"><a href="#box_tab4"
														data-toggle="tab" id="generalHideForIpdPrevBill"><i class="fa fa-home"></i> <span
															class="hidden-inline-mobile" onclick="resetAllIpd('general')">General Bill</span> </a></li>
												
																								
												</ul>
												<div class="tab-content">
												
												
														<div class="tab-pane fade" id="box_tab7">
														<div class="row">

															<form>

																<input type="hidden" class="form-control"
																	id="estimation" value="0" />

																<%-- <div class="form-group col-md-2" style="padding:0 0 0 16px">
																	<label class="TextFont" for="exampleInputPassword1">From Date</label>
																	<input type="text" id="dob"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'yyyy/mm/dd',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeOpdSponsorStart" value="" />
																</div> --%>
																
																<div class="form-group col-md-3" style="padding:0 0 0 16px;padding-top: 20px;">
																						<label style="margin-right: 14px;" class="control-label col-md-1">From Date<span
																							class="required"></span></label>

																						<div class="input-group date" style="width: -1%;">

																							<input type="text" class="form-control"
																								id="dob">

																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>	
																
																<%-- <div class="form-group col-md-2" style="padding:0 0 0 17px">
																	<label class="TextFont" for="exampleInputPassword1">To Date</label>
																	<input type="text" id="dob1"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'yyyy/mm/dd',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeOpdSponsorEnd" value="" />
																</div> --%>
																
																<div class="form-group col-md-3" style="padding:0 0 0 16px;padding-top: 20px;">
																						<label style="margin-right: 14px;" class="control-label col-md-1">To Date<span
																							class="required"></span></label>

																						<div class="input-group date" style="width: -1%;">

																							<input type="text" class="form-control"
																								id="dob1">

																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>	

																<div id="prevCalfromdiv" class="form-group col-md-3" style="padding-left: 35px;padding-top: 5px;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary editUserAccess" value="Get Estimate"
																		id="saveBillOpdSponsor" name="saveBillOpdSponsor" style="padding: 0px"
																		onclick="getPatientBillAmountIpdForEstimation(<%=request.getParameter("treatmentId")%>,'prev')">
																</div>
																<div id="currentCalfromdiv"  class="form-group col-md-3" style="padding-left: 35px;padding-top: 5px;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary editUserAccess" value="Get Estimate"
																		id="saveBillOpdSponsor" name="saveBillOpdSponsor" style="padding: 0px"
																		onclick="getPatientBillAmountIpdForEstimation(<%=request.getParameter("treatmentId")%>,'current')">
																</div>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />
															

															</form>
														</div>
														
																<div>

															<div
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																class="title col-md-12-1">
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New" onclick="crearAllFields()">
																	<i class="fa fa-plus-square"></i> New
																</label>
																
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabell" value="delete"
																	onclick="">
																	<i class="fa fa-trash-o"></i> Delete
																</label> <!-- <label
																	style="cursor: pointer;"padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="canclePerticularLabell" value="Delete"
																	onclick="" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->
																 <input	type="hidden" id="cancleType" value="N" />
															</div>

														</div>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="max-height: 350px; overflow: auto;">
															<div class="panel-body">

																<div class="row">

																	


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th>
																			</tr>
																		</thead>
																		
																		
																		
																		
																		<tbody id="ipdEstimation">

													<!-- Dynamic Tem added -->
													
													
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Service Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtysEstimate"> <i class="fa fa-at-o"></i>
																Total Qty:
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr edit_currency_symbol"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmtsEstimate"> <i class="fa fa-inr edit_currency_symbol"></i>
															</label>
														</div>
														<!-- /ORDER DETAILS -->
													</div>
												
												
												
													<div class="tab-pane fade in active" id="box_tab4">

														<div class="row">

															<form>

																<input type="hidden" class="form-control"
																	id="billDetailsId" value="0" />

																<!-- <div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="setallservautocompleteOnBilling(this.id),calculatePerticularTotal1();">
																</div> -->
																<div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Particular" name="perticular"
																		onkeyup="autosuggetionForDefaultIPD(this.id);">
																</div>
																<!-- <div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="autosuggetionForDefaultForIPD(this.id),calculatePerticularTotal1();">
																</div> -->
																
																<div id="barcodeNoShow" class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Barcode No:</label> <input
																		type="text" class="form-control" id="barcodeNo" onchange="barcodeValidation(this.id)"
																		placeholder="Enter Barcode No" name="barcodeNo" value="" maxlength="14"
																		>
																</div>
																
																<div class="form-group col-md-2" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Sample Type:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="sampleType" name="sampleType" style="padding: 0px"
																		class="form-control col-md-12" onclick=""></select>
																</div>	
																
																<div id="divService" class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servId" name="ServName" style="padding: 0px"
																		class="form-control col-md-12" onclick="" onchange="surgancharge(this.id)"></select>
																</div>
																
																<div class="form-group col-md-1" style="padding: 0 0 0 4px">
																	<label for="email">Speciality:</label>
																	<select id="specialityId" name="specialityId" style="padding: 0px" class="col-md-12"
																		onclick="getDoctorBySpecialization('generalOpdBill','doctorName')"></select>
																</div>

																<div id="doctorDiveGI" class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorName"  name="doctorName"
																		class="col-md-12" onchange="selecttime(),getDoctorConsultationChargesForIpd(),getSpecilizationByDoctorIdOnBilling()"></select>
																</div>



																<div id="dateDiveGI" class="form-group col-md-1" style="padding:0 0 0 4px;">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="finalDate"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTime" value="" />
																</div>
																
																
																<div id="collectionDateDiveG" class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label class="TextFont" for="exampleInputPassword1" data-toggle="tooltip" data-placement="left"
																	title="Sample Collection Date">Date:</label> 
																	<input id="collectionDate" class="form-control"
																			type="text" placeholder="Collection Date"
																			onclick="displayCalendar(document.getElementById('collectionDate'),'dd/mm/yyyy',this)"
																			readonly="readonly" value="<%=current_date%>">

																</div>
																
																<div id="collectionTimeDiveG" class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label class="TextFont" for="exampleInputPassword1" data-toggle="tooltip" data-placement="left"
																	title="Sample Collection Time">Time:</label> 
																	<input id="collectionTime" class="form-control"
																			type="text" placeholder="Collection Time"
																			readonly="readonly" value="<%=todays_time%>">
																</div>
																

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="numeric">Rate:</label> <input type="text"
																		style="text-align:right;" class="form-control" value="0" id="rate" name="rate"
																		onchange="calculateEmrCheIpd('general');"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal1()">
																		<input type="hidden" value="0" id="rate2" name="rate2">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="email">Qty:</label> <input type="text"
																		class="form-control" value="1" id="qty" name="qty"
																		onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal1();">
																		<!-- onkeyup="calculatePerticularTotal1();calculateEmrCheIpd('general');"> -->
																</div>

																

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="Amount">Amount:</label> <input type="text"
																		style="text-align:right;" class="form-control"
																		onkeyup="calculatePerticularPay1()" value="0"
																		id="amount" name="amount">
																</div>
																
																<div id="conPerDivGI" class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Per %:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdPer"
																		name="concessionIpdPer"
																		onkeypress="return validatePrice(event)"
																		onkeyup="concessionOnPercentageIpd(),calculatePerticularTotal1();">
																</div>
																 
																
																<div id="conDivGI" class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Concsn:</label> <input type="text"
																		class="form-control" value="0" id="concession"
																		name="concession"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calPerForConGenIpd(),calculatePerticularTotal1();">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Pay:</label> <input type="text"
																		style="text-align:right;" class="form-control" value="0" id="pay" name="pay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay1()">
																</div>

																<div id="coPayDivGI" class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">C-Pay:</label> <input type="text"
																		style="text-align:right;" class="form-control" value="0" id="coPay" name="coPay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay1()">
																</div>

																<div class="form-group col-md-1" style="padding-left: 4px;padding-top: 0px;">
																	<label for="email">(Shft + S)</label><input type="button"
																		class="form-control btn btn-primary" value="save"
																		id="saveBill" name="saveBill" style="padding: 0px"
																		onclick="saveServiceToPatient()">
																</div>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />
															</form>

														</div>
	                                                     <div style="margin-left:67px;display: none;" class="form-group  col-md-2-1" id="divsptime">
																<label class="TextFont">Start Time</label><b style="color: red;">*</b>
																 <input type="text" readonly="readonly" onchange="doctorroundcharg('Hall')" class="form-group " id="timeFrom2" style="width:89px">
																					</div>

														<div>

															<div
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																class="title col-md-12-1">
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New" onclick="crearAllFields()">
																	<i class="fa fa-plus-square"></i> New
																</label>
																<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"
																	onclick="onClickEdit(this.id)"> <i
																	class="fa fa-edit"></i> Edit
																</label> -->
																<label class="deleteUserAccess" disabled="disabled" 
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabels" value="delete"
																	onclick="deleteServiceToPatient(this.id)">
																	<i class="fa fa-trash-o"></i> Delete
																</label> <!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabels" value="Delete"
																	onclick="cancleOnClick(this.id)" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->
																
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="checkAllIpd('general')">	Check All 																
																</label>
																
																<!-- <i class="fa fa-plus" id="exploreServ"></i>  -->
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="uncheckAllIpd()">	UnCheck All 																
																</label>
																
																<i class="fa fa-plus" id="exploreServ"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="exploreOnClick('open'); userAccess(); ">	Open/Close All																
																</label>
																
																<i class="fa fa-plus" id="convertToPackipd2"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="convertToPackipd" data-toggle="modal" data-target="#packToConv" 
																	onclick="convertToPackageipd('open',<%=request.getParameter("treatmentId")%>)">	Convert To Pack																
																</label>
																
																<label style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;" onclick="sendToLab(2)">
																	<i class="fa fa-arrow-circle-right"></i>
																			Send To Lab
																</label>
																
																 <input	type="hidden" id="cancleType" value="N" />	
																<label  style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
																	<i class="fa fa-arrow-circle-right"></i>
																			Send To Ris
																</label> 
																 <input	type="checkbox" id="sendToRis" name="ipdBillCheckbox" value="N" checked />	
																 <label style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;" onclick="sendToRadiation('ipdBill')">
																	<i class="fa fa-arrow-circle-right"></i>
																			Send To Radiation
																</label>
																
																<label id="lblShiftBed" style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
																<a id="bedShiftBtn" target="">
																	<i class="fa fa-arrow-circle-right"></i>
																			Shift Bed
																</a></label>
																
																<!-- <label style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="setServiceForCash()" >
																	<i class="fa fa-fw"><img width="17px;" height="17px;" style="margin-right: 20px;"></i>&nbsp;&nbsp;&nbsp;&nbsp;Cash Payment
																</label> -->
																
															</div> 	

														</div>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="height: 320px; overflow: auto;" id="billPanel">
															<div class="panel-body">

																<div class="row">

																	<!-- <div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="newPerticular()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticular" value="Edit"
																			onclick="onClickEdit(this.id)"> <i
																			class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label> <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label>
																	</div> -->


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th>
																			</tr>
																		</thead>
																		<tbody id="billDetails">

																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												
																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												
																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->

														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Service Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQty"> <i class="fa fa-at-o"></i>
																Total Qty:
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr edit_currency_symbol"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmt"> <i class="fa fa-inr edit_currency_symbol"></i>
															</label>
															
															<% 
																if(uiModeSetting.contains("off")){
															%>
															
																<label
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="payAmount"> <i><a id="txtPayAmt" style="cursor: pointer;text-decoration: none;color: red;" onclick="setUiMode()"> Pay Amount</a></i>
																</label>
															
															<%
																}
															%>
															
															
															
															
															
															
															
														</div>


														<!-- /ORDER DETAILS -->
													</div>
													
													
													<div class="tab-pane fade" id="box_tab5">
														<div class="row">

															<form>


																<input type="hidden" class="form-control"
																	id="billDetailsId" value="0" />

																
																<div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticularIpdSponsor"
																		placeholder="Enter Particular" name="perticular"
																		onkeyup="setallchargesConfigOnBilling(this.id);">
																</div>
																
																<div id="barcodeNoShowOpdSponsor" class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Barcode No:</label> <input
																	type="text" class="form-control" id="barcodeNoOpdSponsor" onchange="barcodeValidation(this.id)"
																	placeholder="Enter Barcode No" name="barcodeNoOpdSponsor" value="" maxlength="14"
																	>
																</div>
															
																<div class="form-group col-md-2" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Sample Type:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="sampleTypeOpdSponsor" name="sampleTypeOpdSponsor" style="padding: 0px"
																	class="form-control col-md-12" onclick=""></select>
																</div>
																
																<div id="divServiceSp" class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servIdIpdSponsor" name="ServName" style="padding: 0px"
																		class="form-control col-md-12" onclick="" onchange="surgancharge(this.id)"></select>
																</div>

																<div class="form-group col-md-1" style="padding: 0 0 0 4px">
																	<label for="email">Speciality:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="specialityIdSponsor" name="specialityIdSponsor"
																		style="padding: 0px" class="col-md-12"
																		onchange="getDoctorBySpecialization('sponsorOpdBill','doctorNameIpdSponsor')"></select>
																</div>

																<div id="doctorDiveSI" class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorNameIpdSponsor"  name="doctorNameIpdSponsor"
																		class="col-md-12" onchange="selecttimesp(),getDoctorConsultationChargesForIpd(),getSpecilizationByDoctorIdOnBilling()"></select>
																</div>



																<div id="dateDiveSI" class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="finalDate"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeIpdSponsor" value="" />
																</div>
																
																
																<div id="collectionDateDiveS" class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label class="TextFont" for="exampleInputPassword1" data-toggle="tooltip" data-placement="left"
																	title="Sample Collection Date">Date:</label> 
																	<input id="collectionDateOpdSponsor" class="form-control"
																			type="text" placeholder="Collection Date"
																			onclick="displayCalendar(document.getElementById('collectionDateOpdSponsor'),'dd/mm/yyyy',this)"
																			readonly="readonly" value="<%=current_date%>">

																</div>
																
																<div id="collectionTimeDiveS" class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label class="TextFont" for="exampleInputPassword1" data-toggle="tooltip" data-placement="left"
																	title="Sample Collection Time">Time:</label> 
																	<input id="collectionTimeOpdSponsor" class="form-control"
																			type="text" placeholder="Collection Time"
																			readonly="readonly" value="<%=todays_time%>">
																</div>
																

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="numeric">Rate:</label> <input type="text"
																		style="text-align:right;" class="form-control" value="0" id="rateIpdSponsor" name="rate"
																		onchange="setHiddenFielde2Ipd(this.value),calculateEmrCheIpd('sponsor')",
																		onkeypress="return validatePrice(event)" 
																		onkeyup="calculatePerticularTotalIpdSponsor()">
																	<input type="hidden" value="0" id="rateIpdSponsor2" name="rateIpdSponsor2">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="email">Qty:</label> <input type="text"
																		class="form-control" value="1" id="qtyIpdSponsor" name="qty"
																		onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotalIpdSponsor()">
																		<!-- onkeyup="calculatePerticularTotalIpdSponsor(),calculateEmrCheIpd('sponsor')"> -->
																		
																</div>

																

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="Amount">Amount:</label> <input type="text"
																		style="text-align:right;" class="form-control"
																		onkeyup="calculatePerticularPaySponsor()" value="0"
																		id="amountIpdSponsor" name="amount">
																</div>
																
																<div id="conPerDivSI" class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Per %:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdSponsorPer"
																		name="concessionIpdSponsorPer"
																		onkeypress="return validatePrice(event)"
																		onkeyup="concessionOnPercentageIpdSponsor(),calculatePerticularTotalIpdSponsor();">
																</div>
																
																<div id="conDivSI" class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Concsn:</label> <input type="text"
																	style="text-align:right;" class="form-control" value="0" id="concessionIpdSponsor"
																		name="concession"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calPerForConSponIpd(),calculatePerticularTotalIpdSponsor();">
																</div>

																<div id="payDivSI" class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Pay:</label> <input type="text"
																		style="text-align:right;" class="form-control" value="0" id="payIpdSponsor" name="pay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPaySponsor()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">C-Pay:</label> <input type="text"
																	style="text-align:right;" class="form-control" value="0" id="coPayIpdSponsor" name="coPay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPaySponsor()">
																</div>

																<div class="form-group col-md-1" style="padding-left: 4px;padding-top: 0px;">
																	<label for="email">(Shft + S)</label> <input type="button"
																		class="form-control btn btn-primary" value="save"
																		id="saveBill1" name="saveBill" style="padding: 0px"
																		onclick="saveServiceToSponsorPatient(this.id)">
																</div>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />



															</form>

														</div>
                                            			<div style="margin-left:67px;display: none;" class="form-group  col-md-2-1" id="divHalltime" >
															<label class="TextFont">Start Time</label><b style="color: red;">*</b>
															<input type="text" readonly="readonly" onchange="doctorroundchargsp('SP')" class="form-group " id="timeFrom3" style="width:89px">
														</div>
														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														
														<div>

															<div class="title col-md-12" style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;">
																
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	onclick="crearAllFields()"> <i
																	class="fa fa-plus-square"></i> New
																</label> <!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="edit" value="Edit" onclick="editPerticular()">
																	<i class="fa fa-edit"></i> Edit
																</label> --> <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabell" onclick="deleteServiceToPatient(this.id)" value="Delete">
																	<i class="fa fa-trash-o"></i> Delete
																</label>
																
																<label style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="checkAllIpd('IpdSponsor')">	Check All 																
																</label>
																
																<!-- <i class="fa fa-plus" id="exploreServ"></i>  -->
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="uncheckAllIpd()">	UnCheck All 																
																</label>
																
																<i class="fa fa-plus" id="exploreServ"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="exploreOnClick('open'); userAccess();">	Open/Close All																
																</label>
																
																<i class="fa fa-plus" id="convertToPackipd2"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="convertToPackipd" data-toggle="modal" data-target="#packToConv" 
																	onclick="convertToPackageipd('open',<%=request.getParameter("treatmentId")%>)">	Convert To Pack																
																</label>																
																
																		
																		 <!-- <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label> --> <label
																			style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;"
																			onclick="sendToLab(2)"> <i
																			class="fa fa-arrow-circle-right"></i> Send To Lab
																		</label>
																		<!-- Sanjay Kr Shah -->
																		 <input	type="hidden" id="cancleType" value="N" />	
																<label  style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
																	<i class="fa fa-arrow-circle-right"></i>
																			Send To Ris
																</label> 
																 <input	type="checkbox" id="sendToRisSponsor" name="ipdBillCheckboxSponsor" value="N" checked/>
																 <label style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;" onclick="sendToRadiation('ipdBill')">
																	<i class="fa fa-arrow-circle-right"></i>
																			Send To Radiation
																</label>
																<label id="lblShiftBedSp" style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
																<a id="bedShiftBtnSponsor" target="" >
																	<i class="fa fa-arrow-circle-right"></i>
																			Shift Bed
																</a></label>
																
																<label id="lblSetSopnsorRate" style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;" onclick="setSponsorRateToSelfPatientIPD()">
																	<i class="fa fa-arrow-circle-right"></i>
																			Set Sponsor Rate
																</label>																
																
																<!-- <label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	onclick="setSponsorRateToSelfPatient()" value="convToSponsor">
																	<i class="fa fa-fw"><img width="17px;"
																		height="17px;" style="margin-right: 20px;"
																		></i>&nbsp;&nbsp;&nbsp;&nbsp;Set Sponsor Rate
																</label> -->															
																 	
															</div>
														</div>
															
														<div class="panel panel-default" style="height: 320px; overflow: auto; " id="ipdsponsortab">
															<div class="panel-body">
																<table class='table table-hover'>
																	<thead>
																		<tr>
																			<th class='only-checkbox'>#</th>
																			<th>Item</th>
																			<th>
																				<div class='text-center'>Quantity</div>
																			</th>
																			<th>
																				<div class='text-right'>Total Price</div>
																			</th>
																		</tr>
																	</thead>
																	
																	<tbody id="sponsorIpd">

																	</tbody>
																</table>
															</div>
														</div>
														
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Service Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQttty"> <i class="fa fa-at-o"></i>
																Total Qty:
															</label> 
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i id="edit_currency_symbol" class="fa fa-inr edit_currency_symbol"></i>&nbsp;&nbsp;Total
																Amount:</label>
																<label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmmmt"> <i class="fa fa-inr edit_currency_symbol"></i>
															</label>
															
															<% 
																if(uiModeSetting.contains("off")){
															%>
															
															<label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="payAmount"> <i><a id="txtPayAmtSp" style="cursor: pointer;text-decoration: none;color: red;" onclick="setUiMode()"> Pay Amount</a></i>
															</label>
															
															<%
																}
															%>
															
															<label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; display: none;"
																id="ppn"> <i><a id="txtppn" style="cursor: pointer;text-decoration: none;color: green;" onclick="distributePpnAmount()"> Distribute Rate In PPN :</a></i>
															</label>
															
															<label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; display: none;"
																id="ppnNumber"> <i><a id="txtnumber" style="cursor: pointer;text-decoration: none;color: red;">0</a></i>
															</label>
															
														</div>
														
														<!-- /ORDER DETAILS -->
														
													</div>
													<div class="tab-pane fade" id="box_tab6">
													

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default" id="cghsHide"
															style="height: 259px; overflow: auto;">
															
															<div class="panel-body">

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticularLabel" value="Edit">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label> 
																	</div>


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th>
																			</tr>
																		</thead>
																		
																		<tbody id="cghsBill">


																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Service Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtty"> <i class="fa fa-at-o"></i> Total Qty:
																</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr edit_currency_symbol"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmmt"> <i class="fa fa-inr edit_currency_symbol"></i>
															</label>
															<label style="padding-left: 650px; ">
														<a id="hidebilldetCghs" onclick="hideBillDetailsCghs()"><b><label id="billTextCghs">  Show Cghs View   </label> <i id="shBillViewCghs" class="fa fa-chevron-up"></i> 
															</b></a></label>
															
														</div>
														
														<!-- /ORDER DETAILS -->
														
														
															<div class="panel panel-default"
															style="height: 360px; overflow: auto;">
															<div class="panel-body">
																<div class="row" style="display: none;">

															<form>

																<div class="form-group col-md-3">
																	<label for="email">Perticular:</label> <input
																		type="text" class="form-control" id="perManual"
																		placeholder="Enter Perticular" name="email"
																		onkeyup="setallTempAutocompleteOnIpdBilling(this.id)">
																</div>
																
																<div class="form-group col-md-2">
																	<label for="email">Pack Code:</label> <input
																		type="text" class="form-control" id="packManual"
																		placeholder="Enter Code" name="email"	>
																</div>

																<div class="form-group col-md-2" style="display: none;">
																	<label for="email">Date:</label> <input type="email"
																		class="form-control" id="dateManual" value="<%=current_date%>""
																		readonly="readonly" name="email">
																</div>

																<div class="form-group col-md-2">
																	<label for="email">Rate:</label> <input type="email"
																		class="form-control" id="rateManual" name="email"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Qty:</label> <input type="email"
																		class="form-control" id="qtyManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1" style="display: none;">
																	<label for="email">Disc:</label> <input type="email"
																		class="form-control" id="concessionManual" name="email" value='0'
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-2">
																	<label for="email">Amount:</label> <input type="email"
																		class="form-control" id="amountManual" name="email" 
																		onkeyup="calculatePerticularPay2()">
																</div>

																<div class="form-group col-md-1" style="display: none;">
																	<label for="email">Pay:</label> <input type="email"
																		class="form-control" id="payManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay2()">
																</div>

																<div class="form-group col-md-1" style="display: none;">
																	<label for="email">Copay:</label> <input type="email"
																		class="form-control" id="coPayManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay2()">
																</div>

																<div class="form-group col-md-2" id="divSaveEditButton">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Add"
																		id="addService" name="email" onclick="setTemplateForTemp(this.id)">
																</div>

															</form>

														</div>

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label><label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; font-weight: bold;color: green;"
																			id="SaveCghs" value="Save"
																			onclick="saveIpdCghsDynamic()"> <i
																			class="fa fa-save"></i> Save Cghs
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;font-weight: bold;color: blueviolet;"
																			id="printCghs" value="printCghs"
																			onclick="openPopupForCghsPrint('printCghs')"> <i
																			class="fa fa-print"></i> Print Cghs
																		</label> 
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;font-weight: bold;color: blueviolet;"
																			id="printRemainCghs" value="printRemainCghs"
																			onclick="openPopupForCghsPrint('printRemainCghs')"> <i
																			class="fa fa-print"></i> Print Diff.Cghs Detail
																		</label><label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;font-weight: bold;color: blueviolet;"
																			id="PrintDiffCghsAmount" value="PrintDiffCghsAmount"
																			onclick="openPopupForCghsPrint('PrintDiffCghsAmount')"> <i
																			class="fa fa-print"></i> Print Diff.Cghs Amount
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;font-weight: bold;color: blueviolet;"
																			id="PrintAllCghsDetails" value="PrintAllCghsDetails"
																			onclick="openPopupForCghsPrint('PrintAllCghsDetails')"> <i
																			class="fa fa-print"></i> Print All.Cghs Detail
																		</label> 
																		

																		<button value="+" id="btnAddNew" type="button"
																			class="btn btn-xs btn-success"
																			onclick="setDynamicFieldInCghs();">+
																		</button>
																		
																		<!-- <label style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="payAmount"> <i><a id="txtPayAmtSp" style="cursor: pointer;text-decoration: none;color: red;" onclick="setUiMode()"> Pay Amount</a></i>
																		</label> -->
																		

																	</div>


																	<table>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				<!-- <th>Item</th> -->
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Code</div>
																				</th>
																				<!-- <th>
																					<div class='text-center'style="display: none;">Date</div>
																				</th> -->
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Qty</div>
																				</th>
																				<!-- <th>
																					<div class='text-center'style="display: none;">Disc</div>
																				</th> -->
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center' style="display: none;">Pay</div>
																				</th>
																				<th>
																					<div class='text-center' style="display: none;">CoPay</div>
																				</th>
																				
																				<!-- <th>
																					<div class='text-right'>Total Price</div>
																				</th> -->
																			</tr>
																		</thead>
																		
																		<tbody id="cghsBillManual">


																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>





																<!-- 	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Date</div>
																				</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Qty</div>
																				</th>
																				<th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th>
																			</tr>
																		</thead>
															
																
																
																		<tbody id="cghsBillManualChange">







																		</tbody>
																	</table> -->
																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>

														<table class='table table-hover'>

															<thead>
																<tr>
																	<th>
																	<div class="form-group col-md-2"class='form-group Remove-Padding col-md-2-1'
																		style='padding-right: 8px; margin-top: 13px;margin-left: 73%;'>
																		<label class='TextFont col-md-4-1' for="email">Total
																			Remains:</label> <input type="text" class="form-control"
																			id="totalManualRemains"
																			placeholder="Enter Perticular" name="email">
																	</div>
																	</th>
																</tr>
															</thead>
														</table>


														<div class="panel panel-default"
															style="height: 260px; overflow: auto;">
														<div style="display: none;">
														<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Service:</label> <input
																		type="text" class="form-control" id="SerManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
															
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;display: none;'>
																	<label for="email">Date:</label> <input
																		type="text" class="form-control" id="dateManualRemains"
																		 name="email" value="<%=current_date%>" >
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Pack Code:</label> <input
																		type="text" class="form-control" id="packManualRemains"
																		 name="email" placeholder="Enter Code" value=" ">
																</div>
																	<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Rate</label> <input
																		type="text" class="form-control" id="rateManualRemains"
																		placeholder="" name="email" value="0"
																		 onkeyup="calculatePerticularTotalRemains()" onkeypress="return validatePrice(event)">
																</div>
																	<div class="form-group col-md-1" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Qty:</label> <input
																		type="text" class="form-control" id="qtyManualRemains"
																		placeholder="" name="email" value="1"
																		 onkeyup="calculatePerticularTotalRemains()" onkeypress="return validatePrice(event)">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Amount:</label> <input
																		type="text" class="form-control" id="amountManualRemains"
																		placeholder="Enter Perticular" name="email" value="0">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px; display: none;'>
																	<label class='TextFont col-md-4-1' for="email">Pay:</label> <input
																		type="text" class="form-control" id="payManualRemains"
																		placeholder="Enter Perticular" name="email" value="0">
																</div>
																<div class="form-group col-md-1" style="padding-top:18px; " id="divSaveEditButton">
																	<label for="email"></label> <input type="button"
																		class="form-control btn-primary" value="Add"
																		id="addService" name="email" onclick="setTemplateForTempRemains(this.id)">
																</div>
																
																</div>
																<!-- <div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label class='TextFont col-md-4-1' for="email">Total Remains:</label> <input
																		type="text" class="form-control" id="totalManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div> -->
																
															
														
													
													
													
									
																	<table>

																		<thead>
																			<tr>
																				<th >#</th>
																				
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<!-- <th>
																					<div class='text-center'style="display: none;">Date</div>
																				</th> -->
																				<th>
																					<div class='text-center'>Code</div>
																				</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Qty</div>
																				</th>
																				
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center' style="display:none">Pay</div>
																				</th>
																				<!-- <th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th> -->
																			</tr>
																		</thead>
															
																
																
																		<tbody id="cghsBillManualChangeRemains">


																		</tbody>
																	</table>
																	
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- /BOX -->
								</div>
								
								<% 
									if(uiModeSetting.contains("off")){
								%>															
	
								<div class="col-md-12 box" id="receiptView" style="display: none;"> 
								
								<%
									}else{
									
								%>
								
								<div class="col-md-12 box" id="receiptView">
								
								<%
									}
								%>

								

									<!-- <div class="panel panel-default">
										<div class="panel-body">
											<div class="tabbable">
												<ul class="nav nav-tabs">
													<li class="active">
														<a onclick="getBillReceiptDetailsIpd('all')" data-toggle="tab"><i class="fa fa-user-md"></i>
															All Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetailsIpd('cash')" data-toggle="tab"><i class="fa fa-user-md"></i>
															Cash Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetailsIpd('credit')" data-toggle="tab"><i class="fa fa-ambulance"></i> 
															Credit Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetails('refund')" data-toggle="tab"><i class="fa fa-stethoscope"></i> 
															Refund Receipts</a></li>													
												</ul>
												<div class="tab-content">
													<div class="tab-pane fade in active" id="cashReceipts">

													</div>													
												</div>
											</div>
										</div>
									</div> -->
									
									<div class="panel panel-default" id="refundBillDetails" style="height: 182px;overflow: auto;">
										<div class="panel-body">
											<div class="tabbable">
												<ul class="nav nav-tabs" id="receiptUl">
													<li class="active" id="allReceipt">
														<a onclick="getBillReceiptDetailsIpd('all')" data-toggle="tab"><i class="fa fa-user-md"></i>
															All Receipts</a></li>
													<!-- <li>
														<a onclick="getBillReceiptDetailsIpd('cash')" data-toggle="tab"><i class="fa fa-user-md"></i>
															Cash Receipts</a></li> -->
													<!-- <li>
														<a onclick="getBillReceiptDetailsIpd('credit')" data-toggle="tab"><i class="fa fa-ambulance"></i> 
															Credit Receipts</a></li>													
													<li>
														<a onclick="getBillReceiptDetailsIpd('refundable')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Refundable</a></li> -->	
													<li>
														<a onclick="getBillRefundDetailsIpd('refund')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Refunded</a></li>
															
													<li id="deletedReceipt">
														<a onclick="getBillReceiptDetailsIpd('deleted')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Deleted</a></li>	
	
	<!-- Modal For Remark after Deleted test Start  -->

	<div class="md-modal md-effect-11" id="modal-21"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">

				<center>
					<h4 class="modal-title">
						<b>Remark To Deleted Refund</b>
					</h4>
				</center>

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">

							<div class="li pull-right" style="width: 100px"></div>

						</ul>
						<div class="divide-10"></div>

						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO1">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">

											<div style="width: 100%;; font-weight: bold; height: 100Px;">
												<form class="form-inline">
													<div class="form-group">
														<label for="inputPassword41">Remark  :</label>
														<input id="idremarkdeletedrefundipd" value ="0" type="hidden" >
														<input id="treatmentId" value ="0" style="display: none" >
													  <input id="billRefundId" value ="0" type="hidden" > 
														<textarea id="remarkDeletedRefund" name=remarkDeletedRefund
															cols="46" rows="2"></textarea>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- </div>  data-dismiss="modal"-->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button"
								class="form-control btn btn-primary md-close"
								id="idForCloseBill1" onclick="submitRemarkDeletedRefundIpd()">Submit</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button id="idForCloseBill1" type="button"
								class="form-control btn btn-primary md-close"
								onclick="cancelRemarkpopupDeletedRefundIpd()" 
								data-dismiss="modal">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal For Remark after cancel test end -->	
	
	<!-- Modal For Remark after Delete Receipt Start  -->

	<div class="md-modal md-effect-11" id="modal-20" style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header" style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">

				<center>  <h4 class="modal-title">	<b>Remark To Delete Receipt</b> </h4></center>

			</div>
			<div class="modal-body">
				<div style="margin-top: 12px;" class="box border col-md-12">
					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">
							<div class="li pull-right" style="width: 100px"></div>
						</ul>
						<div class="divide-10"></div>
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "	id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">

											<div style="width: 100%;; font-weight: bold; height: 100Px;">
												<form class="form-inline">
													<div class="form-group">
														<label for="inputPassword4">Remark  :</label>
														<input id="idremarkdeletereceipt" value ="0" type="hidden">
														<input id="recId" value ="0" style="display: none" >
														<textarea id="remarkdeletereceipt" name="remarkdeletereceipt"
															cols="46" rows="2"></textarea>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- </div>  data-dismiss="modal"-->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button"
								class="form-control btn btn-primary md-close"
								id="idForCloseBill" onclick="submitRemarkDeleteReceipt()">Submit</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button id="idForCloseBill" type="button"
								class="form-control btn btn-primary md-close"
								onclick="closeRemarkpopupDeleteReceipt()" 
								data-dismiss="modal">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal For Remark after delete receipt end RRR-->				
													<!-- <li id="paidInCash">
														<a onclick="getBillReceiptDetailsIpd('paidInCash')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Paid In Cash</a></li> -->		
													
													<!-- <li style="float: right;">
														<a id="hidebilldet" onclick="hideBillDetails()"><b><label id="billText">  Show Receipts View   </label> <i id="shBillView" class="fa fa-chevron-up"></i> 
															</b></a></li> -->
													<li style="float: right;">
														<button  onclick="hideBillDetails()">Show Receipts View</button>
														</li>													
												</ul>
												<div class="tab-content">
													<div class="tab-pane fade in active" id="cashReceipts">

													</div>													
												</div>
											</div>
										</div>
									</div>

								</div>

							</div>

							<% 
								if(uiModeSetting.contains("off")){
							%>															

							<div class="col-md-3" id="payDiv" style="display: none; padding-right: 0px">
							
							<%
								}else{
								
							%>
							
							<div class="col-md-3" id="payDiv" style="padding-right: 0px">
							
							<%
								}
							%>

								<!-- BOX -->
								<div class="box border">
									<div class="box-title">
										<h4>
											<i class="fa fa-colum"></i><span class="hidden-inline-mobile"></span>
										</h4>
									</div>
									<div class="box-body" style="min-height: 430px">
										
										<table class="table table-condensed  bottomLine">
											<tbody>
												<!-- <tr>
													<th class="col-md-5 center"><div class="TextFont"><button id="btnRefund" class="btn btn-xs btn-primary" onclick="saveRefundBillDetailsIpd('refund')" disabled="disabled">Refund</button></div></th>
													<th class="col-md-4 center"><div class="TextFont"><button class="btn btn-xs btn-warning">Receipt</button></div></th>
													<th class="numeric col-md-3 center"><div class="TextFont"><button class="btn btn-xs btn-info">Manage</button></div></th>

												</tr> -->
												<tr>
													<th class="col-md-3 center"><div class="TextFont"><button id="btnRefund" class="btn btn-xs btn-primary" onclick="saveRefundBillDetailsIpd('refund')" disabled="disabled">Refund</button></div></th>
													<!-- <th class="col-md-4 center"><div class="TextFont"><button class="btn btn-xs btn-warning" onclick="receiptBillPrint('receiptIpd',-5);">Receipt</button></div></th> -->
													<!-- <th class="col-md-4 center"><div class="TextFont"><button class="btn btn-xs btn-warning">Receipt</button></div></th> 
													<th class="numeric col-md-3 center"><div class="TextFont"><button class="btn btn-xs btn-info">Manage</button></div></th> -->
													<!-- <th class="col-md-3 center"><div class="TextFont"><button id="btnDisc" class="btn btn-xs btn-warning" onclick="manageDiscountIpd()">Manage</button></div></th> -->
													<th class="col-md-3 center"><div class="TextFont"><button id="btnDisc" class="btn btn-xs btn-warning" onclick="showManagePopUp('save')">Manage</button></div></th>
												</tr>												
											</tbody>
										</table>
															
										<table id="headerTable">	
										
											<tr>
												<td style="width: 50%"><label>PayMode</label></td>
												<td>
													<select id="payMode" style="width: 100%" onchange="BankOnSelect2()" class="form-control">
													</select>
												</td>	
												
												<td>
													<button id="btnMultiple" style="display: none;" class="md-trigger" data-modal="modal-11">Multi</button>
												</td>																
												
											</tr>	
											<tr class="member">
												<td><label>Bank</label></td>
												<td>
													<select id="bankID" class="form-control" style="width: 100%">
														<option value="1">ICICI</option>
														<option value="2">HDFC</option>
														<option value="3">YES BANK</option>
														<option value="4">IDBI</option>
													</select>
												</td>											
												
											</tr>	
											<tr class="member2">
												<td><label>Card/Cheque Number</label></td>
												<td><input type="text" id="batchnumber" class="form-control"></td>
												
											</tr>
											
										 	<tr class="member2">
												<td><label>Batch Number</label></td>
												<td><input type="text" id="newBatchNumber" class="form-control"></td>
												
											</tr> 
											
											<!-- <tr>
												<td><label>BankName</label></td>
												<td><input type="text" id="bName"></td>
												
											</tr> -->
																								
											<tr id="trPayable">
												<td><label>payable</label></td>
												<td><input type="text" id="payable" value="0" readonly class="form-control"></td>
												
											</tr>
											
											<!-- <tr id="trDisc">
												<td><label>Discount</label></td>
												<td><input type="text" id="discount" value="0" onkeyup="calDiscountIpd()" readonly></td>
												
											</tr> -->
											
											<tr id="trRefPer" style="display: none;">
												<td><label>Refund (%)</label></td>
												<td><input type="text" id="refPer" onkeyup="calRefundAmt()"></td>
												
											</tr>
											
											<tr>
												<td><label>Now Pay</label></td>
												<td><input type="text" id="payNow" value="0" class="form-control"></td>
												
											</tr>
											
											<tr style="" id="discRemark">
												<td><label>Remark  </label></td>
													<td>
													<input type="text" id="txtDiscRemk" class="form-control">
												</td>
												
											</tr>	
											
											<tr id="payeeTr" style="display: none;">
												
												<td><label>Payee</label></td>
												<td>
													<select class="form-control" style="width: 100%" id="payee" onchange="showSponsorIpd()">
														<option value="1">Patient</option>
														<option value="2">Sponsor</option>													
													</select>
												</td>		
											
											</tr>														
											
											<!-- <tr>
												<td></td>
												<td align="right"><input id="btnPayNow" type="button" onclick="saveBillDetailsIpd('cash')" class="btn btn-xs btn-primary" value="Pay Now"></td>
												
											</tr> -->	
											
											<tr>
												<td></td>
												<td></td>
											</tr>
											
											<tr>
												<td></td>
												<td></td>
											</tr>	
																																		
										</table>
										
										<table class="table table-condensed  bottomLine">
										
										<tr id="trSpon" style="display: none;">
												
												<td>
												
													<div class="form-group">
														<div>
															<select name="listmstr" id="listmstr_select_service" style="width: 95px"
																onchange="setDyanamicDivForCharges('dynamicItems',this.id)">
																<option id="firstElmts">--- Select Sponsor
																	---</option>
															</select>
														</div>
													</div>
												
												</td>
											
												<td>												
	
													<div class="col-md-12 select2-container select2-container-multi">
														<ul id="dynamicItems" class="select2-choices"
															style="overflow-y: scroll;">
	
														</ul>
													</div>
												</td>
											
											</tr>														
											
											<tr>
											<td><!-- getDiscOfSponser(0); -->
												<div id="hideshowiPharmacyBtn" class="TextFont" style="padding-top: 0px;
										           display: block;">
                                                <button id="iPharmacyBtn" class="btn btn-xs btn-success" data-target="#Indent_Sales_pending_data" data-toggle="modal" 
                                                  onclick="displayPendingAmountByTreatmentId();getSubServiceDetails1ForSponsorForNarco(21);getPharmacyInIpdBillOrNot();fetchAuthorisedByPharmacyPayment();getDiscOfSponserPharmacyBilling(0);" style=background: "red none repeat scroll 0% 0%;">Pharmacy Payment</button>
                                                  </div>
											</td>									
												
												<td align="right"><input id="btnPayNow" type="button" onclick="saveBillDetailsIpd('cash')" class="btn btn-xs btn-primary " value="Pay Now"></td>
												<!-- <style="font-size:10px;"> -->
											</tr>										
										    
										</table>
										<div style="max-height: 68px; width: 100%; overflow-y: scroll;" class="col-md-12-1">
											<table class="table table-condensed cf">
												<tr>
													<th style="border-top: none;" class="numeric col-md-6-1">Narration</th>
													<th style="border-top: none;" class="numeric col-md-0-1">Amount</th>												
													<th style="border-top: none;" class="numeric col-md-0-1">Status</th>
												</tr>											
												<tbody id="listDiscount"></tbody>
											</table>											
										</div>		
															
										<div class="divide-20"></div>
										
										<table class="table table-condensed ">

												<tbody>
													<tr class="divide-10"></tr>
													
													<tr>
														<td style="padding: 1px;" class="col-md-7-1">Grand Total</td>
														<td style="padding: 1px; font-weight: bold;text-align: right;" id="grandTotal" class="col-md-4-1"></td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>

													</tr>
													
													<!-- <tr style="display: none;">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Total</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalBillTotal" class="col-md-4-1"></td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr> -->
													<!-- <tr>
														<td style="padding: 1px;" id="idCategoryDiscount" class="col-md-7-1">Category Disc(0.0%)</td>
														<td style="color: #5CAFE6; padding: 1px; font-weight: bold;text-align: right;" id="categoryDiscount" class="col-md-4-1">0.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr>  -->
													
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Total Consn</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="conTotal" class="col-md-4-1"></td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													
													<!-- for 1 -->
													<tr>
														<td style="padding: 1px;" class="col-md-7-1">Discount</td>
														<td style="color: orange; padding: 1px; font-weight: bold;text-align: right;" id="finalDiscount" class="col-md-4-1"></td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<!-- / 1 -->
													<!-- <tr>
														<td style="padding: 1px;" id="totalServicTaxText" class="col-md-7-1">Total+Tax(0%)</td>
														<td style="padding: 1px; font-weight: bold;text-align: right;" id="finalBillTotalServiceTax" class="col-md-4-1">0.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr> -->
													<tr>
														<td style="border-top:; padding: 1px;" class="col-md-7-1">Total Net Amount</td>
														<td style="color :#DC143C; padding: 1px;text-align: right;" id="finalNetAmt" class="col-md-4-1"></td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Total Paid</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalPaid" class="col-md-4-1"></td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													
													<tr style="color: blue;">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Paid By Sponsor</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="paidBySponsor" class="col-md-4-1"></td>
														<!-- <td style="border-top: none; padding: 0px;" class="col-md-1-1"><input type="checkbox" id="outstandingCheckbox" class="editUserAccess" onclick="showOutstandingReceipt()"></td> -->
													</tr>
													
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Total Refund</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalRefund" class="col-md-4-1"></td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<!-- <tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Pharmacy/Paid</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="PharmacyAdvancePaid" class="col-md-4-1">0.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Pharmacy Return</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="PharmacyCashReturn" class="col-md-4-1">0.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr> -->
													<!-- <tr class="divide-10"></tr> -->
													<!-- <tr style="color: green;">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Refund</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalRefund" class="col-md-4-1">0.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"><input type="checkbox" id="refundChekbox" onclick="showRefundReceipt('finalrefund')" class="editUserAccess">
														</td>
													</tr> -->													
													
														<!-- Added By Bilal For pharmacy -->
														<tr>
															<td style="border-top: none; padding: 1px;" class="col-md-7-1">Pharmacy/Paid</td>
															<td id="PharmacyAdvancePaid" class="col-md-4-1" style="border-top: none; padding: 1px;text-align: right;"></td>
															<td style="border-top: none; padding: 0px;" class="col-md-1-1"></td>
														</tr>
														
														<tr>
															<td style="border-top: none; padding: 1px;" class="col-md-7-1">Pharmacy Return</td>
															<td id="PharmacyCashReturn" class="col-md-4-1" style="border-top: none; padding: 1px;text-align: right;"></td>
															<td style="border-top: none; padding: 0px;" class="col-md-1-1"></td>
														</tr>
													
													<!-- Added By Bilal For pharmacy -->
													
													<tr id="trRefundable">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Total Refundable</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalRefundable" class="col-md-4-1"></td>
														<td style="border-top: none; padding: 0px;" class="col-md-1-1"><input type="checkbox" id="refundableCheckbox"  onclick="showRefundable()"></td>
													</tr>
													
													<!-- <tr id="trRefundable">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Refundable Diff.</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="refundableDiff" class="col-md-4-1"></td>
														<td style="border-top: none; padding: 0px;" class="col-md-1-1"><input type="checkbox" id="refundableDiffCheckbox" class="editUserAccess" onclick="showDiffRefundable()"></td>
													</tr> -->
													
													<tr class="divide-10"></tr>
													<tr style="color: blue;">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Total Outstanding</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalRemain" class="col-md-4-1"></td>
														<td style="border-top: none; padding: 0px;" class="col-md-1-1"><input type="checkbox" id="outstandingCheckbox" name="outstandingCheckbox"  onclick="showOutstandingPayable()"></td>
													</tr>
													
													
													<tr class="divide-10"></tr>
													<tr style="color: crimson;">
														<td id="sponsorDetailsHead" style="border-top: none; padding: 1px;" class="col-md-7-1">Sponsor Details :-</td>
																												
													</tr>
													<tr style="color: Black;">
														<td style="border-top: none; padding: 1px; display: none;" id="sanctionAmountHead" class="col-md-7-1">Sanction Amount</td>
														<td style="border-top: none; padding: 1px;text-align: right; display: none;" id="sanctionAmount" class="col-md-4-1">00.00</td>														
													</tr>
													
													<tr style="color: Black;">
														<td style="border-top: none; padding: 1px;display: none;" id="utilisedAmountHead" class="col-md-7-1">Utilised Amount</td>
														<td style="border-top: none; padding: 1px;text-align: right;display: none;" id="utilisedAmount" class="col-md-4-1">00.00</td>														
													</tr>
													
													<tr style="color: Black;">
														<td style="border-top: none; padding: 1px;display: none;" id="balanceAmountHead" class="col-md-7-1">Balance Amount</td>
														<td style="border-top: none; padding: 1px;text-align: right;display: none;" id="balanceAmount" class="col-md-4-1">00.00</td>														
													</tr>
													
												</tbody>
											</table>
										
										
											
										<div style="margin-left: 0px; margin-top: -5px; color: red;" id="divPrePay">
												<label id="previousRemainingText" class="TextFont">Previous Pending Amount : </label>												
												<label id="previousRemaining"><label style="color: blue;"><i style="margin-right: 10px;" id="previousRemainingValue">0</i></label><button id="btnPrePay" style="line-height: 1.2;" class="btn btn-xs btn-warning" type="button" onclick="fetchPrevPendingIpd('onclick')">PAY</button></label>
										</div>
										
										<div style="margin-left: 0px; margin-top: -5px; color: red;" id="divPrePay">
												<label id="previousRemainingText" class="TextFont">Total Common Advance : </label>												
												<label id="finalAdvanceLbl"><label style="color: blue;"><i style="margin-right: 10px;" id="finalAdvance">0</i></label></label>
										</div>
											
										<!-- <table>
										
											<tr>
												<td style="color: red">Previous Pending Amount : 0</td>
												
											</tr>
											
											<tr>
												
												<td style="color: blue">Common Advance Amount : 0</td>
											</tr>
																					
										</table> -->	
										
										<!-- <table>
										
											<tr>												
												<td style="color: blue">Common Advc Amount : <label id="commnAdvc">0</label></td>
												
											</tr>
											
											<tr>												
												<td style="color: blue">Discount Amount : <label id="discAmt">0</label></td>
												
											</tr>
										
											<tr>
												<td style="color: red">Previous Refunded Amount : <label id="prevRefunded">0</label></td>
												<td></td>
												
											</tr>
											
											<tr>
												
												<td style="color: blue">Refundable Amount : <label id="nowRefunded">0</label></td>
												<td><button class="btn btn-xs btn-primary" onclick="setRefundable()">Pay</button></td>
											</tr>
																					
										</table> -->
														
														
										<div class="divide-10"></div>

										<div class="col-md-12 center bottomLine">
											<!-- <p>Final Billing</p> -->
										</div>
										<div class="col-md-12-1">
											
											<table>															
												<tr>
													<td><label></label></td>
													<td></td>
													
												</tr>
																									
											</table>															
											
										</div>													
													
									</div>
								</div>
								<!-- /BOX -->
							</div>

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>
		</div>

		<%@include file="footer_nobel.jsp"%>

	</section>
	<!--/PAGE -->
	
	<!------------- Modal for pay bill end---------------->
	
		
			<div class="modal fade" id="packIpd" role="dialog" >
				<div class="modal-dialog" style="width:90%">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"onclick="crearAllFields()">&times;</button>
							<h4 class="modal-title">Details</h4>
						</div>
						<div class="modal-body">

							<form class="form-horizontal col-md-12" style="margin-top: 0%;">
							
												<div class="col-md-12 box">

									<div class="panel panel-default"
															>
															<div class="panel-body">
																<div class="row">

															<form>

																<div class="form-group col-md-2">
																	<label for="email">Perticular:</label> <input
																		type="text" class="form-control" id="perManualPackageIpd"
																		placeholder="Enter Perticular" name="email"
																		onkeyup="autoSuggetionPackageIPD(this.id)">
																</div>
																	<div class="form-group col-md-2" style="margin-left: -1%;">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servIdPackageIpd" name="ServNamePackageIpd" style="padding: 0px"
																		class="form-control col-md-12" onclick=""></select>
																</div>
																
																<div class="form-group col-md-2" style="margin-left: -1%;">
																	<label for="spl">Speciality:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="SplNamePackageIpd" name="splNamePackageIpd"
																		class="col-md-12" onchange="getDoctorBySpecialization('generalOpdBill','doctorNamePackageIpd')"></select>
																</div>


																<div class="form-group col-md-2" style="margin-left: -1%;">
																	<label for="Doctor">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorNamePackageIpd" name="doctorNamePackageIpd"
																		class="col-md-12" onchange="getDoctorConsultationChargesForIpd()"></select>
																</div>
																
																<div class="form-group col-md-2"style="margin-left: -1%;">
																	<label for="email">Date:</label> <input type="email"
																		class="form-control" id="datePackageIpd" value="<%=current_date%>"
																		readonly="readonly" name="email">
																</div>

																<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Rate:</label> <input type="email"
																		class="form-control" id="ratePackageIpd" name="email"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePackageForIpd()">
																</div>

																<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Qty:</label> <input type="email"
																		class="form-control" id="qtyPackageIpd" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePackageForIpd()" value="1">
																</div>

															<!-- 	<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Disc:</label> <input type="email"
																		class="form-control" id="concessionPackage" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div> -->

																<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Amount:</label> <input type="email"
																		class="form-control" id="amountPackageIpd" name="email" 
																		onkeyup="calculatePackageForIpd()">
																</div>

											<!-- 					<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Pay:</label> <input type="email"
																		class="form-control" id="payPackage" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay2()">
																</div>

																<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Copay:</label> <input type="email"
																		class="form-control" id="coPayPackage" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay2()">
																</div> -->
																
																<div class="form-group col-md-1" id="divSaveEditButton"style="margin-left: -1%;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Save"
																		id="addServicePackageOT" name="email" onclick="savePackageBillingIPD('OT')">
																		
																		<input type="button"
																		class="form-control btn btn-primary" value="Save"
																		id="addServicePackage" name="email" onclick="savePackageBillingIPD('pack')">
																</div>
																
																
																

															</form>
															

														</div>
														</div>
									</div>
									
								</div>
												<!--  -->
								<div class="divide-20"></div>
								<div class="col-md-12">
									<div class="row">
										<div class="form-group col-md-12-1"
											style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
											<div class="box border blue">
												<div class="box-title">
													<h4 id='packageIpdDivName'>
														<i class="fa fa-table"></i>Package Details

													</h4>
													<div class="pull-right"></div>
												</div>
												
												<div class="box-body" style="height: 320px; overflow-y: scroll; border: 1px solid #ddd;">
													<div class='col-sm-12-1' style="margin-top: 1%;">
														<table class='table table-bordered' style='width: 100%;' id='packageIpdDiv' >
															<!-- <thead class='cf' id='popupheader'>
																<tr>
                                                                 
                                                                 <th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>#</div></th>
																			
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Pack Service</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Doc Name</div></th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Rate</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Qty</div></th>
																			
																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Disc</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Amount</div></th>
																			
																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Pay</div></th>
																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Co-Pay</div></th>
																	
																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Date</div></th>
																			
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Edit</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Delete</div></th>
																			<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>chB</div></th>
																</tr>
															</thead> -->
															
														</table>
													</div>

													<!-- <div class='col-sm-12-1'
														style='height: 250px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

														<table class='table table-striped table-condensed cf'>
															<tbody id="packageIpdDiv" >



															</tbody>
														</table>
													</div> -->
													
                                           
											
												</div>
												
												 <div class="title col-md-12-1"
												style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;">
												<label
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class=""></i>Service Total Qty:
												</label> <label id="totalQtyPackageIPD"
													style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
												<label
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class="fa fa-inr edit_currency_symbol"></i> Total Amount:
												</label> <label id="totalAmtPackageIPD"
													style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
													
													
													<label id="totalPackageAmountIPDLabel"
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class="fa fa-inr edit_currency_symbol"></i> Package Amount:
												</label> <label id="totalPackageAmountIPD"
													style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
													<label id="totalRemainingPackIPDLabel"
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class="fa fa-inr edit_currency_symbol"></i> Remaining Amount:
												</label> <label id="totalRemainingPackIPD"
													style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
													
													<label id="includeRemainingPack"style="cursor:pointer;
													 padding-top: 0px; margin-right: 5px; margin-bottom: 0px;" onclick="includeAmountInPackipd()">
													<i class="fa fa-plus"></i> Include In Package
												</label> 
												
												<label id="convertToBillingipd"
													style="cursor:pointer; padding-top: 0px; margin-right: 5px; margin-bottom: 0px;" 
										onclick="convertToBillingipd('open',<%=request.getParameter("treatmentId")%>)">
													<i class="fa fa-plus"></i> Convert To Billing
												</label> 
											</div>
											</div>
										</div>
									</div>
								</div>

							</form>
							<!-- 	</div> -->

						</div>
						<div class="modal-footer">
							<!-- <button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button> -->
						</div>
					</div>

				</div>
			</div>
	
	
	<!------------- Modal for pay bill start---------------->
	<div id="payBill" class="modal fade" role="dialog">
	  <div class="modal-dialog">
	
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">Pay Bill</h4>
	      </div>
	      <div class="modal-body">
	        <p></p>
	        
	        <div>
	        
	        	<div class="form-group">

					<label class="control-label col-sm-4 lblBold">Total Amount :</label> <label
						class="control-label" id="patientId"> </label>
						
					<input type="text" id="totAmt" value="0">
				</div>
				
	        	<div class="form-group">

					<label class="control-label col-sm-4 lblBold">Pay Amount :</label> <label
						class="control-label" id="patientId"> </label>
						
					<input type="text" id="payNow" value="0">
				</div>
	        </div>
	        
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	
	  </div>
	</div>
	<!------------- Modal for pay bill end---------------->
	
	 <!-- convert service to package  -->

	<div class="modal fade" id="packToConv" role="dialog">
		<div class="modal-dialog" style="width: 50%">

			<!-- Modal content-->
			<div class="modal-content ">
				

					<form class="form-horizontal col-md-12" style="margin-top: 0%;">


						<div class="divide-20"></div>
						<div class="col-md-12">
							<div class="row">
								<div class="form-group col-md-12-1"
									style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
									<div class="box border blue">
										<div class="box-title">
											<h4 id="">
												<i class="fa fa-table"></i>Package Details
                                                
											</h4>
											<button type="button" class="close" data-dismiss="modal">&times;</button>
											<div class="pull-right"></div>
										</div>

										<div class="box-body" style="height: 320px;">
											<div class='col-sm-12-1' style="margin-top: 1%;">
												<table class='table table-bordered' style='width: 100%;'>
													<thead class='cf'>
														<tr>

															<th class='col-md-4-1 center' style='height: 21.5px;'><div
																	class='TextFont'>#</div></th>

															<th class='col-md-4-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Pack Name</div></th>

															
															<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Amount</div></th>
															
															<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Chk</div></th>
														</tr>
													</thead>

												</table>
											</div>

											<div class='col-sm-12-1'
												style='height: 250px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

												<table class='table table-striped table-condensed cf'>
													<tbody id="packageDivToConvert">



													</tbody>
												</table>
											</div>



										</div>
									</div>
								</div>
							</div>
						</div>

					</form>

				<!-- </div> -->
			</div>

		</div>
	</div>

	<!-- convert service to package  -->
	
	
	
	<!-- Modal For Multiple Payments Start -->

	<!-- <div class="md-modal md-effect-11" id="modal-11" style="border-radius:10px">
		<div class="md-content">

			<div class="modal-header" style="background: #FFE0C2;height: 10px; 
					border-bottom: 1px solid orange; border-top: 1px solid orange;">
				<button type="button" style="font-size: 1.5em; color: red" 
					class="md-close close" data-dismiss="modal">&times;</button>
				<center>
					<h4 class="modal-title"><b>Multiple Payment Modes</b></h4>
				</center>
			</div>
			<div class="modal-body">

				<div class="row">
				
					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">CASH</label> 
									
							</div>
							
							<div class="form-group">
								<label for="email">Bank Name :</label> <input type="text"
									class="form-control" id="email">
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="pwd">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="cashAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							<div class="checkbox">
								<label><input type="checkbox"> Remember me</label>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>

					</div>
				
					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">CREDIT</label> 
									
							</div>
						
							<div class="form-group">
								<label for="email">Bank Name :</label> 
								<select class="form-control" id="bankIdCredit" style="width: 100%">
									
								</select>	
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="creditBNum">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="creditAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							
						</form>

					</div>

					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">CHEQUE</label> 
									
							</div>
							
							<div class="form-group">
								<label for="email">Bank Name :</label> 
								<select class="form-control" id="bankIdCheque" style="width: 100%">
									
								</select>	
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="chequeBNum">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="chequeAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							
						</form>

					</div>

					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">RTGS</label> 
									
							</div>
						
							<div class="form-group">
								<label for="email">Bank Name :</label> 
								<select class="form-control" id="bankIdRtgs" style="width: 100%">
									
								</select>	
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="rtgsBNum">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="rtgsAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							
						</form>

					</div>

					<div class="col-md-3 border">

						<form class="form-inline">
							<div class="form-group">
								<label for="email">Bank Name :</label> <input type="text"
									class="form-control" id="email">
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="pwd">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="pwd">
							</div>
							<div class="checkbox">
								<label><input type="checkbox"> Remember me</label>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>

					</div>
				</div>

				 </div>
		      <div class="modal-footer">
		      
		      	<form class="form-inline col-md-12">
					
					<div class="form-group col-md-3">
						<label for="email">Payable:</label> 
						<input type="text"
							class="form-control" id="multiPayable" value="0" readonly="readonly">						
					</div>
					<div class="form-group col-md-3">
						<label for="pwd">Pay Now :</label> <input type="text"
							class="form-control" id="multiPayNow" value="0" readonly="readonly">
					</div>	
					
					<div class="form-group col-md-3">
						<label for="pwd">Remain :</label> <input type="text"
							class="form-control" id="multiRemain" value="0" readonly="readonly">
					</div>	
										
					<div class="form-group col-md-3">
						<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
						<button type="button" class="form-control btn btn-primary md-close" 
						onclick="setMultiPayNow()" data-dismiss="modal">Submit</button>
					</div>							
					
				</form>		      
		        
		      </div>

			</div>
		</div>
	</div> -->
	
	<div class="md-modal md-effect-11" id="modal-11"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">
				<!-- <button type="button" style="font-size: 1.5em; color: red" 
					class="md-close close" data-dismiss="modal">&times;</button> -->
				<center>
					<h4 class="modal-title">
						<b>Multiple Payment Modes</b>
					</h4>
				</center>				

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">						
							
							<div class="li pull-right" style="width: 100px">
								<button value="+" id="btnAddNew" type="button" style="margin: 7px;float: left;margin-left: 60px"
									class="btn btn-xs btn-success" onclick="toCreateTr()">+</button>
								<button value="_" id="btnDelete" type="button" style="margin: 7px;" 
									class="btn btn-xs btn-success" onclick="toRemoveTr('RowCount')">-</button>
							</div>

						</ul>
						<div class="divide-10"></div>
						
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">
											
											<div style="width: 100%;; font-weight: bold; height: 150Px;">
												
												<table border="1" class="table table-bordered table-striped table-condensed"
													id="multiPayTable">
													<thead>
														<tr>
															<th class="col-md-2-2 center">Select</th>
															<th class="col-md-2-1 center">Pay Mode</th>	
															<th class="col-md-2-2 center">Amount</th>														
															<th class="col-md-2-1 center">Bank</th>
															<th class="col-md-2-2 center">Card No.</th>
															<th class="col-md-2-2 center">Batch No.</th>															
														</tr>
													</thead>
													<tbody	style="overflow-y: scroll; border: 1px solid #436a9d;" id="multiPayTbody">
																							
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

				<!-- </div> -->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<!-- <div class="form-group col-md-3">
							<label for="email">Payable:</label> <input type="text"
								class="form-control" id="multiPayable" value="0"
								readonly="readonly">
						</div> -->
						
						<div class="form-group col-md-3">
							<label for="pwd">Pay Now :</label> <input type="text"
								class="form-control" id="multiPayNow" value="0"
								readonly="readonly">
						</div>

						<!-- <div class="form-group col-md-2">
							<label for="pwd">Remain :</label> <input type="text"
								class="form-control" id="multiRemain" value="0"
								readonly="readonly">
						</div> -->

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button" class="form-control btn btn-primary md-close"
								id="idForClose"	onclick="setMultiPayNow()" data-dismiss="modal">Submit</button>							
						</div>
						
						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							
							<button type="button" class="form-control btn btn-primary md-close"
								onclick="resetPayMode();closePopup();" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>

	<!-- Modal For Multiple Payments End   -->
	
	
	<!--Manage Discount-->
	<!--Time click Popup modal-->

	<div style="display: none;" class="popup modal fade in" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" class="col-md-9">
				<div class="modal-header">
					<div class="box-title left">
						<h4 class="form-horizontal  col-md-4">Manage Discount</h4>
					</div>
					<div class="box-title right">
						<label style="color: green">Total Discount</label> 
						<input type="text"	readonly="readonly" class="col-md-2" id="overalldisount" value="0"/>
						<button type="button" title="Close" class="close" style="color: red;"
							onclick="closeManagePopUp()" data-dismiss="modal">&times;</button>
					</div>
					
				</div>
				<div class="modal-body">
					<div id="MainTabs" class="tab-content">
						
						<div class="panel panel-default" id="hosdiscdiv">
							<div class="panel-body" style="padding: 4px">
								<form class="form-horizontal  col-md-12">
									<table class="form-horizontal  col-md-12">
										
										<tr>
											<td class="col-md-3" colspan="2"><h5>Hospital
													Discount</h5></td>
											<td ><label>Discount From <span
																	class="required text-danger">*</span></label></td>
															<td><select id="discountFromIpd" class="form-control">
																	<option value="Hospital">Hospital</option>
																	<option id="refDoctorNameIpd" value="RefDoctor">Ref.Doctor</option>
																	
															</select></td>
										</tr>
										<tr>
											<td class="center col-md-3">Reason</td>
											<td class="center col-md-2">Amount</td>
											<td class="center col-md-2">Payable</td>
											<td class="center col-md-2">Discount(Rs) <span class="required text-danger">*</span></td>
											<td class="center col-md-2">Discount(%)</td>
											<!-- <td class="center col-md-1">Patient</td>
											<td class="center col-md-1">Sponsor</td> -->
										</tr>
										<tr>
											<td class="center col-md-3">
												<!-- <select onchange="setAmountOfDoc(this.id)" id="narrSel" style="width: 112px" class="form-control input-SmallText TextFont">
													<option value="select">-Select-</option>
												</select> -->
												<select  id="dNarration" style="width: 112px;" class="form-control input-SmallText TextFont">
													<!-- <option value='0'>--Select Narration--</option> -->
												</select>
											</td>
											<td class="center  col-md-2"><input id="dTotal"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="dPayable"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="dDiscount"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												onKeyup="setManagePayable('Hospital');" /></td>

											<td class="center  col-md-2"><input
												id="dDiscountInPercentage" style="text-align: right;"
												type="text" class="form-control input-SmallText TextFont"
												onKeyup="setPayableForPercentageDiscnt('Hospital');" /></td>


											<!-- <td class="center  col-md-2"><input id="disconCoPay"
												value="P" name="disc" type="radio"
												class="form-control input-SmallText TextFont" /></td>
											<td class="center  col-md-1"><input id="disconPay"
												value="S" name="disc" type="radio"
												class="form-control input-SmallText TextFont" /></td> -->
										</tr>
										<tr id="IdHeaderApprovedDisc">
											<td class="col-md-3" colspan="4" style="padding-top: 20px;"><h5>Approved
													Discount</h5></td>
										</tr>
										<tr id="idApprovedDiscountTr">
											<td class="center  col-md-3" >  Narration</td>
											<td class="center  col-md-2" > Discount</td>
											<td class="center  col-md-3" >  Date & Time</td>
										</tr>
										<tr id="idApprovedDiscountTextTr">
											<td class="center  col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="approvalDiscNarration" readonly="readonly"/></td>
											<td class="center  col-md-2"><input id="approvalDisc"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="approvalDiscDtTm"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
										</tr>
									</table>
								</form>
								
								
								
								<form class="form-horizontal  col-md-12">
								<div class="divide-20"></div>
									<table class="form-horizontal  col-md-12">
										
										<tr>
											<td class="center col-md-3">Remark</td>
											<td class="center col-md-3">Authorized by</td>
											<td class="center col-md-2">Patient</td>
											<td class="center col-md-2">Sponsor</td>											
										</tr>
										<tr>
											<td class="center col-md-3">
												<input id="discRemark11" type="text"
												class="form-control input-SmallText TextFont" />											
											</td>
											<td class="center  col-md-3">
												<select id="discAuthSel">
																											
												</select>												
											</td>
											<td class="center  col-md-2">											
												<input type="radio" checked="checked" style="margin-top: 0px !important;" 
												name="disc" value="P" id="disconCoPay">											
											</td>
											
											<td class="center  col-md-2">											
												<input type="radio" checked="checked" style="margin-top: 0px !important;" 
												name="disc" value="S" id="disconPay">											
											</td>	
											
											<td class="center  col-md-2">
												<button type="button" class="submitFrom btn btn-primary"												
												onclick="saveEditIPDDiscount()">Save Discount</button>
											</td>	
																		
											
										</tr>
										<!-- <tr id="IdHeaderApprovedDisc">
											<td class="col-md-3" colspan="4" style="padding-top: 20px;"><h5>Approved
													Discount</h5></td>
										</tr>
										<tr id="idApprovedDiscountTr">
											<td class="center  col-md-3" >  Narration</td>
											<td class="center  col-md-2" > Discount</td>
											<td class="center  col-md-3" >  Date & Time</td>
										</tr>
										<tr id="idApprovedDiscountTextTr">
											<td class="center  col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="approvalDiscNarration" readonly="readonly"/></td>
											<td class="center  col-md-2"><input id="approvalDisc"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="approvalDiscDtTm"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
										</tr> -->
									</table>
								</form>
								
								
								
								
								<!-- <div class="col-md-12" style="margin-top: 20px; margin-left: 5px;">
									
									<div class="col-md-2">
											<div class="form-group">
												<label class="control-label">Remark </label> 
												<input type="text" value="0" id="discRemark">
											</div>
									</div>
									
									<tr id="discAuth" style="display: none;">
												<td><label>Autherized By</label></td>
												<td>
													<select id="discAuthSel" class="form-control">
														<option value="0">Select</option>
														<option value="1">Mangesh Virkar</option>
														<option value="2">Sameer</option>
														<option value="3">Anurag</option>													
														<option value="4">Vinod</option>														
													</select>	
												</td>
												
											</tr>
									
									<div class="form-group col-md-4">
										<label class="col-sm-4 control-label">Remark</label>
										<div class="col-sm-8">
											<input type="text" id="discRemark" class="form-control">
										</div>
									</div>
																
									<div class="form-group col-md-4">
										<label class="col-sm-4 control-label">Reason</label>
										<div class="col-sm-8">
											<select class="form-control" id="discAuthSel"></select>
										</div>
									</div>									


									<div class="col-md-2">
										<label class=""> <input type="radio" checked="checked"
											style="margin-top: 0px !important;" name="disc" value="P"
											id="disconCoPay"> Patient
										</label>
									</div>
									<div class="col-md-6">
										<label class=""> <input type="radio"
											style="margin-top: 0px !important;" name="disc" value="S"
											id="disconPay"> Sponsor
										</label>
									</div>
									<div class="col-md-4">
										<button type="button" class="submitFrom btn btn-primary editUserAccess" style="margin-left: 62px"
											onclick="saveEditIPDDiscount()" disabled="disabled">Save Discount</button>
										<input type="hidden" value="save" id="discountSaveEditType">
									</div>
								</div> -->
								
								
							</div>
						</div>

						<div class="panel panel-default" id="docdiscdiv"
							style='margin-top: 4px;'>
							<div class="panel-body" style="padding: 4px">
								<form class="form-horizontal  col-md-12">
									<table class="form-horizontal  col-md-12">
										<!-- <tr class="">
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
										</tr> -->
										<tr class="">
											<td class="col-md-3-1" colspan="4"><h5>Surgeon
													Discount</h5></td>
										</tr>
										<tr class="">
											<td class="center  col-md-3">Surgeon</td>
											<td class="center  col-md-3">Reason</td>
											<td class="center  col-md-3">Amount</td>
											<td class="center  col-md-3">Payable</td>
											<td class="center  col-md-3">Discount(Rs)</td>
											<td class="center  col-md-3">Discount(%)</td>
										</tr>
										<tr class="" style="padding-top: 20px;">
											<!-- <td class="center  col-md-3">
												<select onchange="setTotalPayable()" id="surgeonlist" style="width: 112px" class="form-control input-SmallText TextFont">
													<option value="select">-Select-</option>
												</select>
											
											</td> -->
											<td class="center  col-md-3">
												<select onchange="fetchSurgonList('onchange')" id="surgeonlist" style="width: 112px" class="form-control input-SmallText TextFont">
													<option value="select">-Select-</option>
												</select>
												<select  id="surgeonchrge" style="width: 112px;display: none;" class="form-control input-SmallText TextFont">
													<option value="select">-Select-</option>
												</select>
											
											</td>
											<td class="center  col-md-2">
											
												<select  id="sNarration" class="form-control input-SmallText TextFont">
													
												</select>
											<!-- <input type="text"
												class="form-control input-SmallText TextFont"
												id="sNarration" /> --></td>
											<td class="center  col-md-2">
											
											<input id="sTotal" value="0" type="text" style="text-align: right;"
												class="form-control input-SmallText TextFont"
												readonly="readonly" />
												
											</td>
											<td class="center  col-md-2"><input id="sPayable"
												value="0" type="text" style="text-align: right;"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="sDiscount"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												onKeyup="setManagePayable('Doctor');" /></td>

											<td class="center  col-md-2"><input
												id="sDiscountInPercentage" style="text-align: right;"
												type="text" class="form-control input-SmallText TextFont"
												onKeyup="setPayableForPercentageDiscnt('Doctor');" /></td>
										</tr>
										<!-- <tr class="">
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
										</tr> -->
										
										<tr class="" id="IdHeaderApprovedSurgeonDisc">
											<td class="col-md-3" colspan="4" style="padding-top: 20px;"><h5>Approved
													Discount</h5></td>
										</tr>
										<tr id="idApprovedSurgeonDiscountTr">
											<td class="center  col-md-3" >  Narration</td>
											<td class="center  col-md-2" > Discount</td>
											<td class="center  col-md-3" >  Date & Time</td>
										</tr>
										<tr id="idApprovedSurgeonDiscountTextTr">
											<td class="center  col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="approvalSurgeonDiscNarration" readonly="readonly"/></td>
											<td class="center  col-md-2"><input id="approvalSurgeonDisc"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="approvalSurgeonDiscDtTm"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
										</tr>
										
									</table>
								</form>
								
								
								<form class="form-horizontal  col-md-12">
								<div class="divide-20"></div>
									<table class="form-horizontal  col-md-12">
										
										<tr>
											<td class="center col-md-3">Remark</td>
											<td class="center col-md-3">Authorized by</td>
											<td class="center col-md-2">Patient</td>
											<td class="center col-md-2">Sponsor</td>											
										</tr>
										<tr>
											<td class="center col-md-3">
												<input id="docDiscRemark" type="text"
												class="form-control input-SmallText TextFont" />											
											</td>
											<td class="center  col-md-3">
												<select id="docDiscAuthSel">
																											
												</select>												
											</td>
											<td class="center  col-md-2">											
												<input type="radio" checked="checked" style="margin-top: 0px !important;" 
												name="disc" value="P" id="docdisconCoPay">											
											</td>
											
											<td class="center  col-md-2">											
												<input type="radio" checked="checked" style="margin-top: 0px !important;" 
												name="disc" value="S" id="docdisconPay">											
											</td>	
											
											<td class="center  col-md-2">
												<button type="button" class="submitFrom btn btn-primary" id="discountSaveEditType"											
												onclick="saveDoctorDiscount()">Save Discount</button>
											</td>																
											
										</tr>
										<!-- <tr id="IdHeaderApprovedDisc">
											<td class="col-md-3" colspan="4" style="padding-top: 20px;"><h5>Approved
													Discount</h5></td>
										</tr>
										<tr id="idApprovedDiscountTr">
											<td class="center  col-md-3" >  Narration</td>
											<td class="center  col-md-2" > Discount</td>
											<td class="center  col-md-3" >  Date & Time</td>
										</tr>
										<tr id="idApprovedDiscountTextTr">
											<td class="center  col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="approvalDiscNarration" readonly="readonly"/></td>
											<td class="center  col-md-2"><input id="approvalDisc"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="approvalDiscDtTm"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
										</tr> -->
									</table>
								</form>
								
								
								<!-- <div class="col-md-12"
									style="margin-top: 20px; margin-left: 5px;">
									<div class="col-md-2">
										<label class=""> <input type="radio"
											style="margin-top: 0px !important;" name="disc" value="P"
											id="docdisconCoPay"> Patient
										</label>
									</div>
									<div class="col-md-6">
										<label class=""> <input type="radio"
											style="margin-top: 0px !important;" name="disc" value="S"
											id="docdisconPay"> Sponsor
										</label>
									</div>
									<div class="col-md-4">
										<button type="button" class="submitFrom btn btn-primary editUserAccess" style="margin-left: 62px"
											onclick="saveDoctorDiscount()" disabled="disabled">Save Discount</button>
										<input type="hidden" value="save" id="discountSaveEditType">
									</div>
								</div> -->
							</div>
						</div>

						<!-- <div class="panel panel-default" id="pharmadiscdiv"
							style='margin-top: 4px;'>
							<div class="panel-body" style="padding: 4px">
								<span style="font-size: 14px;">Pharmacy Discount</span>
								<div class="col-md-12"
									style="height: 110px; margin-bottom: 0px;">
									<input type="text" style="margin-bottom: 2px;float: right;"									
										readonly="readonly" class="form-horizontal  col-md-2"
										id="pharmacydiscount"/>
									<div style="height: 150px; margin-left: 0%;">
										<div
											style='width: 99%; padding: 1%; margin-top: 10px; font-weight: normal; height: 50%; overflow-y: scroll; border: 1px solid #436a9d;'>
											<div id="PharmaInfoTable"></div>

										</div>
									</div>
									<div id="PharmaInfoTableAjax" style="visibility: hidden;"></div>
								</div>
							</div>
						</div> -->
					</div>
				</div>
				<!-- <div class="modal-footer" style="margin-top: -35px;">
					<button type="button" class="btn btn-danger"
						data-dismiss="modal" onclick="closeManagePopUp()">Close</button>
				</div> -->
			</div>
		</div>
	</div>

<!-- Modal For Narration after reeipt edit Start -->

	<div class="md-modal md-effect-11" id="modal-12"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">
				
				<center>
					<h4 class="modal-title">
						<b>Narration</b>
					</h4>
				</center>				

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">						
							
							<div class="li pull-right" style="width: 100px">
							
							</div>

						</ul>
						<div class="divide-10"></div>
						
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">
											
											<div style="width: 100%;; font-weight: bold; height: 100Px;">
												
												
												<form class="form-inline">
                                                        <div class="form-group">
                                                        <label for="inputPassword4">Narration:</label>
                                                        <textarea id="narrationid" name="addressText" cols="46" rows="2"></textarea>
                                                           
 														</div>
											     </form>
																								
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>					
					</div>
				</div>				

				<!-- </div>  data-dismiss="modal"-->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button" class="form-control btn btn-primary md-close"
								id="idForClose22"	onclick="setNarrationipd()" >Submit</button>							
						</div>
						
						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							
							<button id="idForClose32" type="button" class="form-control btn btn-primary md-close"
								onclick="closePopupnarrationipd()" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
	
	
	<!-- Modal For Remark after cancel test Start Added Rohini -->

	<div class="md-modal md-effect-11" id="modal-19"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">

				<center>
					<h4 class="modal-title">
						<b>Remark To Cancel Test</b>
					</h4>
				</center>

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">

							<div class="li pull-right" style="width: 100px"></div>

						</ul>
						<div class="divide-10"></div>

						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">

											<div style="width: 100%;; font-weight: bold; height: 100Px;">
												<form class="form-inline">
													<div class="form-group">
														<label for="inputPassword4">Remark  :</label>
														<input id="idremarkcanceltestipd" value ="0" type="hidden" >
														<input id="billDetailsId" value ="0" style="display: none" >
														<input id="callFrom" value ="0" style="display: none" >
														<textarea id="remarkcanceltestipd" name=remarkcanceltestipd
															cols="46" rows="2"></textarea>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- </div>  data-dismiss="modal"-->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button"
								class="form-control btn btn-primary md-close"
								id="idForCloseBill" onclick="submitRemarkCancelTestIpd()">Submit</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button id="idForCloseBill" type="button"
								class="form-control btn btn-primary md-close"
								onclick="cancelRemarkpopupCancelTestIpd()" 
								data-dismiss="modal">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal For Remark after cancel test end -->
 <!-- Modal For Narration after reeipt edit Start -->
	<!--/Time click Popup modal-->
	<!--/Manage Discount-->
	
	
	<!-- PARAS OT TABS -->
	<div role="dialog" class="modal fade in " id="DisplayOTModal" style="display: none;" aria-hidden="false">
	<div class="modal-dialog" style="width: 90%;">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
					
			<!-- 	<button data-dismiss="modal" class="close" type="button">×</button> -->
				<h4 id="DisplayModalTitle" class="modal-title col-md-11">OT Details</h4>
				<button data-dismiss="modal" class="btn btn-default " type="button" onclick="reloaddetails()">Close</button>
				
			</div>
			<div class="modal-body">
				<div class="row">
				<div style="display:block;">
		<div class="box border col-md-12">
									<div class="divide-10"></div>
									<div class="tabbable col-md-12">
										<ul class="nav nav-tabs mainTab">
											<li   id="od" class="active"><a data-toggle="tab" id="idOperation"
												href="#Operation"><span class="hidden-inline-mobile">Operation
														Details</span></a></li>
											<li  id="otchr" onclick="fetchipdbilldetails('OC'),setDocNameOT(),hallwiseCHARGE('OT')"><a  id="otserv" data-toggle="tab" href="#OTSERV"><span
													class="hidden-inline-mobile">OT CHARGES</span></a></li>		
											<!-- <li onclick="fetchfreez('OT' , 'OTCHARG' , 'dynamicItemcom2'),fetchdetailsOT(0, 0,'OTCHARG','ONTAB')"><a data-toggle="tab" href="#OTCHARGES"><span
													class="hidden-inline-mobile">OT CHARGES</span></a></li> -->
										<li id="otd" onclick="fetchfreez('OT' , 'OTDRUG' , 'dynamicItemdrug'),fetchdetailsOT(0, 0,'OTDRUG','ONTAB')"><a  id="otdrug" data-toggle="tab" href="#OTDRUG"><span
													class="hidden-inline-mobile">OT DRUGS</span></a></li>
												<li  id="otinv" onclick="fetchfreez('OT' , 'OTINV' , 'dynamicItemINV'),fetchdetailsOT(0, 0,'OTINV','ONTAB')"><a  id="linv" data-toggle="tab" href="#OTInv"><span
													class="hidden-inline-mobile">OT Inventory</span></a></li>
													
											<li id="otc" onclick="fetchfreez('OT' , 'OTCATH' , 'dynamicItemINV'),fetchdetailsOT(0, 0,'OTCATH','ONTAB')"><a id="licath" data-toggle="tab" href="#cathLab"><span
													class="hidden-inline-mobile">OT CathLab</span></a></li>
													
										</ul>
										<div class="divide-10"></div>

										<div id="" class="tab-content">
									
										
					
											
									<div class="tab-pane fade active in" id="Operation">
									
											   <div style="padding-right:57px" class="col-md-3 pull-right">
											   			<div class="col-sm-4 ">
										<input type="checkbox" name="radios" id="radioEmergency" value="radioemg">Emergency
									<label class="TextFont" style="padding-left: 0px;">
																					
																			
																			
																				</label>
								</div>
										<button class="btn btn-xs btn-success" onclick="SaveOperationDetailsBiilipd()">Save</button>
									
								
									</div>
<!-- 											 <div class="divide-40"></div>
 -->												<div style="padding-left: 2%;" class="col-sm-12">
													<div class="col-sm-12">
														<div class="col-sm-12">
															<div class="divide-10"></div>
															<div class="col-sm-6">
														<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="tr_Id">
														
																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-12">
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">Procedure Type</label> <select class="form-control input-SmallText TextFont" id="selOTtype" name="">
																			<option value="0">-SELECT-</option>
																		</select>
																	</div>
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-1"></div>
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">Procedure Group</label> <select class="form-control input-SmallText TextFont" onchange="getOperationName()" id="department" name="">
																			<option value="0">-SELECT-</option>
																		</select>
																	</div>
																</div>
																<div style="margin-top: 19px;margin-left:13px" class="form-group Remove-Padding col-md-6">
																		<label class="TextFont">Procedure Category</label>
																		 <select class="form-control input-SmallText" name="opgrade" id="opgrade">
                                                                      </select>
                                                                      <input type="hidden" value="0" id="departmentOT">
																	</div>
																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-12">
																	<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-10">
																		<label class="TextFont">Procedure Name</label> <select onclick="fetchPTPG()" class="form-control input-SmallText TextFont" id="selOTName" name="">
																			<option value="0">-SELECT-</option>
																		</select>
																	</div>
																	<div style="margin-top: 20px;" class="form-group Remove-Padding col-md-1">
																		<button style="line-height: 1.3" class="btn btn-xs btn-success" onclick="addProcedureNameToList('OTB')">
																			<i class="fa fa-save"></i>
																		</button>
																	</div>
																</div>

																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-12">
																	<div style="margin-top: 2px; padding-right: 2%;" class="form-group Remove-Padding col-md-11">
																		<label class="TextFont">Scheduled Procedure
																			&nbsp;&nbsp;&nbsp;&nbsp;<img width="18" height="18" onclick="removeOperationNameFromList()" src="images/minus.jpg">
																		</label> <select id="scheduledProcedure" multiple="multiple" style="margin-top: 6px;" class="col-md-12" size="4">
																		</select>
																	</div>
																				<input type='hidden' id='topId' value='0' />
																				<input type='hidden' id='pid' value='0' />
																				<input type='hidden' id='pt_Id' value='0' />
																				<input type='hidden' id='bill_Id' value='0' />
																				<input type='hidden' id='operationDate' value='0' />
																				<input id="pageName" type="hidden" value="operation">
																				<input type='hidden' value='insert' id='queryTypeOS'/>
		                              	                                        <input type='hidden' value='insert' id='queryTypeOD'/>
			                                                                  <input type='hidden' value='insert' id='queryTypeOI'/>
			                                                                 <input type='hidden' value='insert' id='queryTypeOTC'/>
						                                                    <input id="treatmentoperationid" type="hidden" value="0" name="treatmentoperationid">
						                                                    <input id="totalchargesph" type="hidden" value="0">
                                                                     <input id="totalchargesinv" type="hidden" value="0">
                                                                            <input id="totalchargescath" type="hidden" value="0">
			
			                                                                   <!-- <input type='hidden' value='0' id='subIDs'/> -->
			                                                                 <div id="subIDs" style="display: none;"></div>
																	
																</div>
															</div>
															<div class="col-sm-6">
																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-12">
																	<div style="margin-top: 9px; padding-right: 5%;" class="form-group Remove-Padding col-md-6">
																		<label class="TextFont">OT Name</label> <select class="form-control input-SmallText TextFont" id="otName" name="" onchange="setOtNameOfPopup()">
																		</select>
																	</div>

																	<div style="margin-top: 24px;" class="form-group Remove-Padding col-md-5">
                                                                 <input type="text" readonly="readonly"
																							id="popup_container2"
																							onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)"
																							class="form-control input-SmallText"
																							name="idTourDateDetails" />																	</div>
																</div>
																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-12">
																	<div class="divide-10"></div>
																	<div class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">Start Time</label> <input type="text" onclick="click1()" class="form-control input-SmallText col-md-12 margin-1" readonly="readonly" name="txtStartTime" id="txtStartTime">
																	</div>
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-1"></div>
																	<div class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">End Time</label> <input type="text" onclick="click1()" class="form-control input-SmallText col-md-12 margin-1" readonly="readonly" name="txtEndTime" id="txtEndTime">
																	</div>
																</div>

																<div style="margin-top: 11px;" class="form-group Remove-Padding col-md-12">

																	<div style="margin-top: 2px; padding-right: 7%;" class="form-group Remove-Padding col-md-6">
																		<label class="TextFont">Anaes.Charge Type</label> <select class="form-control input-SmallText TextFont" style="width: 100%;" name="txtchargetype" id="txtchargetype1">
																			<option value="ASAIV">ASA IV</option>
																			<option value="Normal">Normal</option>
																			<option value="StandBy">StandBy</option>
																		</select>
																	</div>

																	<div style="margin-top: 2px; padding-right: 7%;" class="form-group Remove-Padding col-md-6">
																		<label class="TextFont">Anaesthesia Type</label> <select class="form-control input-SmallText TextFont" id="anesthesiaType" name="">
																			<option value="0">-SELECT-</option>
																			<option value="1">General</option>
																			<option value="2">Regional</option>
																			<option value="3">Local</option>
																			<option value="4">Spinel</option>
																			<option value="5">Epidural</option>
																			<option value="6">Brachcal block</option>
																			<option value="7">Block</option>
																			<option value="8">Sedetion</option>
																			<option value="9">Ankull Block</option>
																			<option value="10">Ring Block</option>
																			<option value="11">Femonel block</option>
																			<option value="12">Axilleny Block</option>
																			<option value="13">Epidural analgesia</option>
																			<option value="14">Peripheral nerve block</option>
																			<option value="15">Heavy sedation or
																				monitored</option>
																			<option value="16">Spinal with Epidural with
																				General</option>
																			<option value="17">Spinal with Epidural with
																				Femonel block</option>
																		</select>
																	</div>

																</div>
																			<div id="divPatId" style="display: none;"></div>
																
																<div style="margin-top: 1px;" class="form-group Remove-Padding col-md-12">
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-3">
																		<label class="TextFont">Infection</label> <input type="checkbox" id="infectFlag">
																	</div>
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-3">
																		<label class="TextFont">Critical</label> <input type="checkbox" id="criticalFlag">
																	</div>
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-4">
																		<label class="TextFont">Operation Charge</label> <input type="checkbox" name="opCharge" id="opCharge1">
																	</div>
																</div>
															</div>
														</div>

														<div class="col-sm-12">
															<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-12">
																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-6">
																	<label class="TextFont">Surgery Team</label> <select class="form-control input-SmallText TextFont" onchange="setTeamDoctors('ManageOT')" id="teanNameList" name="">
																		<option value="0">-SELECT-</option>
																	</select>
																</div>
																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-6"> 
																	<label class="TextFont">Doctor Type</label> <select class="form-control input-SmallText TextFont" onchange="setUsetType()" id="doctype" name="">
																		<option value="select">-Select-</option>
																		<option value="surgeon">Surgeon</option>
																		<option value="surgeon1">Surgeon 1</option>
																		<option value="surgeon2">Surgeon 2</option>
																		<option value="surgeon3">Surgeon 3</option>
																		<option value="asssurgeon">Assistant Surgeon</option>
																		<option value="assSurgeon1">Assistant Surgeon 1</option>
																		<option value="assSurgeon2">Assistant Surgeon 2</option>
																		<option value="assSurgeon3">Assistant Surgeon 3</option>
																		<option value="scrubNurse1">Scrub Nurse 1</option>
																		<option value="scrubNurse2">Scrub Nurse 2</option>
																		<option value="scrubNurse3">Scrub Nurse 3</option>
																		<option value="circulatingNurse1">Circulating Nurse 1</option>
																		<option value="circulatingNurse2">Circulating Nurse 2</option>
																		<option value="circulatingNurse3">Circulating Nurse 3</option>
																		<option value="anesthetist">Anaesthesiologist</option>
																		<option value="anaesthesiologist1">Anaesthesiologist 1</option>
																		<option value="anaesthesiologist2">Anaesthesiologist 2</option>
																		<option value="anaesthesiologist3">Anaesthesiologist 3</option>
																		<option value="assAnaesthesiologist1">Assistant Anaesthesiologist 1</option>
																		<option value="assAnaesthesiologist2">Assistant Anaesthesiologist 2</option>
																		<option value="assAnaesthesiologist3">Assistant Anaesthesiologist 3</option>
																		<option value="other">Other</option>
																	</select>
																	<input type="hidden" value="select" id="type">
																</div>
																

															</div>

															<div style="margin-top: 1px;" class="form-group Remove-Padding col-md-12">

																<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-4">
																	<label class="TextFont">Name</label>
																	<div id="divuserName">
																		<input class="form-control input-SmallText" onkeyup="setAutoCompleteForDoctorName(this.id,'ManageOT')" name="userName" id="userName">
																	</div>
																	<div id="selectedObj" style="display: none;"></div>
																</div>
																<div style="margin-top: 29px;" class="form-group Remove-Padding col-md-1">
																	<button style="line-height: 1.2" class="btn btn-xs btn-success" onclick="addDoctorToScheduleOT('ManageOT')">
																		<i class="fa fa-save"></i>
																	</button>
																</div>
															</div>

															
															<div style="max-height: 220px; margin-top: 10px; max-width: 720px;margin-left:47px;overflow: auto;" class="box border  col-md-12">

																<div class="form-group box-body">
																	
																	<div style="margin-top: 0px; background: #FFE0C2; border: 1px solid orange; padding-left: 3px;" class="col-md-12">
																		<label style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" class="TextFont">
																			<i class="fa fa-users fa fw"></i> Scheduled Team
																		</label> <label onclick="removeDoctorNameFromList()" style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" class="TextFont"> <i class="fa fa-minus-square fa fw"></i> Remove
																		</label>

																	</div>
																	<div id="teamList" style="display: none;"></div>
																	<input type="hidden" id="teamMemberCount" value="0" />
																	<div class="divide-20"></div>
																	<div class="col-md-12">
																		<table style="margin-top: 9px;" id="" class="table table-hover table-bordered">
																			<thead>
																				<tr>
																					<th style="padding-right: 13px; padding-left: 14px; width:4%;" class="center">
																						<div>#</div>
																					</th>
																					<th style="width:25%;" class="center"><div>Doctor Name</div></th>
																					<th style="width:14.7%;" class="center"><div>User Type</div></th>
																					<th style="width:15%;" class="center"><div>Speciality</div></th>
																					<th style="width:20%;" class="center"><div>Department</div></th>
																					<th style="width:18%;" class="center"><div>Doctor Type</div></th>
																					<th style="width:6%;" class="center"><div>Action</div></th>
																				</tr>
																			</thead>
																			<tbody style="max-height: 122px; overflow-y: auto;" id="teamMembersList">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															
															<div style="margin-top: -15px;display: none;" class="form-group Remove-Padding col-md-12">
																<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-6">
																	<div style="margin-top: 2px; padding-right: 0%;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">OHR</label> <input type="text" class="form-control input-SmallText TextFont" name="ohr" id="ohr1">
																	</div>
																	<div style="margin-top: 2px;" class="form-group Remove-Padding col-md-1"></div>
																	<div style="margin-top: 2px; padding-right: 0%;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">CHR</label> <input type="text" class="form-control input-SmallText TextFont" name="chr" id="chr1">
																	</div>
																</div>

																<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-6">
																	<div style="margin-top: 2px; padding-right: 0%;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">OBP</label> <input type="text" class="form-control input-SmallText TextFont" name="obp" id="obp1">
																	</div>
																	<div style="margin-top: 2px;" class="form-group Remove-Padding col-md-1"></div>
																	<div style="margin-top: 2px; padding-right: 0%;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">CBP</label> <input type="text" class="form-control input-SmallText TextFont" name="cbp" id="cbp1">
																	</div>
																</div>
															</div>

															<div style="margin-top: 9px;padding-bottom:4px" class="form-group Remove-Padding col-md-12">
																<div class="col-md-6">
																	<div style="margin-top: 9px; padding-right: 0%;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">Operation No</label> <input type="text" class="form-control input-SmallText TextFont" readonly="readonly" name="txtCathNo" id="txtCathNo1">
																	</div>
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-1"></div>
																	<div style="margin-top: 9px; padding-right: 0%;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">Suggested By</label> <input type="text" class="form-control input-SmallText TextFont" readonly="readonly" name="suggestedBy" id="suggestedBy">
																	</div>
																</div>
																<div class="col-md-6">
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">Instruments
																			Charges(%):</label> <input type="text" class="form-control input-SmallText col-md-12 margin-1" style="" value="0" id="surInstrument1">
																	</div>
																	<div class="col-md-1" style="margin-top: 9px;">
																	</div>
																	<div style="margin-top: 9px;" class="form-group Remove-Padding col-md-5">
																		<label class="TextFont">Anaes.(one-on-one)</label> <select class="form-control input-SmallText TextFont" style="width: 100%;" name="txtRoute" id="txtRoute1">
																			<option value="Y">Y</option>
																			<option value="N">N</option>
																		</select>
																	</div>
																</div>
															</div>

														</div>
													</div>

													
												</div>
											</div>


							  <!-- New OT CHARGES -->
                         <div id="OTSERV" class="tab-pane fade in">
                        <div id="row1" class="col-md-12" style="padding-top: 0px;">
                        <div class="tabbable tabs-left col-md-12" style="margin-top: 0px; margin-left: 5px;">
                        <div class="tab-content col-md-10" style="margin-top: 0px;">
          <div id="Investigation" class="tab-pane fade active in col-md-12">
          <div id="Investigation_row_1" class="col-sm-12" style="margin-top: 26px;margin-left:-39px">
            <div class="col-sm-4"><div class="form-group  col-sm-12" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1"> Name </label>
              <div >
              <input type="text" placeholder=" Name" id="txtOserv" class="typeahead form-control" style="border: 1px solid hsl;height:34px" onkeyup="hallwiseOPchargeOT(this.id,'OC')"></div>
              </div><input type="hidden" id="chargesOS" value="0"> <input type="hidden" id="investigationtestId" value="0"><input type="hidden" id="idTestSlave" value="0"></div>
            <div style="margin-top: -3px;margin-left:20px" class="col-sm-3">
                 <div  class="form-group  col-sm-12">
                <label for="exampleInputEmail1" class="TextFont">Amount </label>
                <input type="text" value="1"  style=" border: 1px solid sliver;height:34px" class=" form-control" id="txtOservamt"></div></div> 
         
            
              <div class="col-sm-2" style="margin-top:-3px;"><div class="form-group  col-sm-12" style="width:152px">
                <label class="TextFont" for="exampleInputEmail1">Doctor</label>
                <div class="" style="margin-top:4px">
               <select id="doctorNameOT"  name="doctorNameOT"
				class="form-control col-md-12" onchange=""></select></div></div></div>
                  
                  <div class="col-sm-2" style="margin-top:4px;width:177px">
                  <div class="form-group Remove-Padding col-sm-12">
                  <label class="TextFont">Unit</label> 
                  <select id="unlId" class="form-control input-SmallText" onchange="cleartexrfiled();">
                  </select><!-- <input type="hidden" id="allunitid"> -->
                  </div></div>
                  </div>
                  <div id="Investigation_row2" class="col-sm-12" style="margin-top: 11px;padding-left:0%">
                  <div style="margin-top: 2%;" class="col-sm-4 select2-container select2-container-multi ">
                  <ul style="overflow-y: scroll;" class="select2-choices" id="dynamicItemos"></ul>
                  <input type="hidden" value="0" id="subserviceidOS">
                  <input type="hidden" value="0" id="chargesubserviceOS">
                  <input type="hidden" value="0" id="serviceidOS">
                  <input type="hidden" value="0" id="billidserviceOS"></div>
                  <div id="col9" class="col-sm-2" style="margin-top: 10px;padding-left:2%">
                  <div class="form-group Remove-Padding col-sm-12" style="display: none;"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-2" style="margin-top: 10px;display: none;">
                   <div class="form-group Remove-Padding col-sm-12"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-0" style="margin-top: 22px;padding-left:5px;">
                   <input type="checkbox" id="cpoeUrgent" style="display: none;"> 
                   <label style="margin-top: 0px;display: none;" class="TextFont Remove-Padding"> Urgent </label>
                   <i><input type="button" class="btn btn-xs btn-success editUserAccess" onclick="saveOTCpoe('OC')" value="Save" style="margin-left:6%"> </i>
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12" style="margin-top: 28px">
                   <div class="form-group col-md-12" style="margin: 2px;">
                   <div class="col-md-12" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editCPOE_Test()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deleteCpoeServ('multiple','OT')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12" style="margin-top: 0px;">
                   <table class="table table-condensed "><thead>
					<tr>
					<th style="height: 21.5px;" class="col-md-1 center"><div
							class="TextFont">#</div></th>
					<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
						class='TextFont'>Charges ID</div></th> -->
					<th style="height: 21.5px; padding-right: 13px;" class="col-md-1 center"><div class="TextFont">Particulars/Details</div></th>
					<th style="height: 21.5px;" class="col-md-1 center"><div class="TextFont">Date</div></th>
					<th style="height: 21.5px; padding-right: 0px;"class="col-md-1 center"><div class="TextFont">Status</div>
					</th><th style="height: 21.5px; padding-left: 0px;"class="col-md-1 center">
					<div class="TextFont">Edit</div></th><th style="height: 21.5px;"
					class="numeric col-md-1 center"><div class="TextFont">Delete</div></th>
					</tr></thead></table>														
                   <div id="flip-scroll" class="col-sm-12 " style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;">
                   <table class="table table-striped table-condensed">
                   <tbody id="tOTcharge"></tbody>
                   </table><input type="hidden" id="CPOErowCount" value="0">
                   </div></div> 
                   </div>
                   </div></div>
                   
                         
                    <!-- New OTCHARGES -->	
                   
                   
                   <!-- OT CHARGES -->
                   <!-- 
                   <div id="OTCHARGES" class="tab-pane fade in">
                   <div class="col-md-4">
                   
														<div class="row">
															
															<label class="TextFont" style="margin-bottom: 4px;margin-top:7px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otcharges"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemcom',this.id,'OTCHARG')">
																			<option id="firstElmtcom" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemcom" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																	
																</div>
                                                      
															</div>
														
                                                  
                                                   
														</div>
														<div class="divide-20"></div>
													</div>
													
													 <div class="col-md-4">
                   
														<div class="row">
															
															<label class="TextFont" style="margin-bottom: 4px;margin-top:7px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom2" id="listmstr_select_otcharges2"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemcom2',this.id,'OTCHARG')">
																			<option id="firstElmtcom" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemcom2" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																	
																</div>
                                                      
															</div>
														
                                                  
                                                   
														</div>
														<div class="divide-20"></div>
													</div>
													
													<div class="col-md-4" style="margin-top:48px">
													<button id="bOTC" type="button" class="btn btn-xs btn-info" onclick="Freez('OT','OTCHARG')">Freez</button>
													<button onclick="Saveoperations('OTCHARG')" class="btn btn-xs btn-success">Save</button>
													</div>
                   
                   <div id="divLine3" class=" box border col-md-12"
												style="margin-left: 0%; margin-top: -1%;">
												<form class="form-horizontal col-md-12"
													style="margin-top: 0%;">
													<div class="divide-20"></div>
													<div class="col-md-6">
														<div class="row">

															<div class="form-group col-md-12">
																<div class="form-group col-md-11"
																	style="margin-left: -1%; margin-top: -1%; width: 98%; height: 267px;">
																	<div class="box border primary">
																		<div class="box-title">
																			<h4 id="">
																				<i class="fa fa-table"></i>Services
																			</h4>
																		</div>

																		<div class="box-body"
																			style="height: 300px; width: 100%;">
																			<div class='col-sm-12' style="margin-top: 0%;">
																				search configuration

																				<div style="" class="col-md-1">
																					<label class="TextFont"
																						style="margin-left: 1%; margin-top: 3%; margin-right: 12px; font-size: 11px;">Search
																						By:</label>
																				</div>

																				<div
																					style="margin-top: 0px; width: 77%; margin-right: 2px;"
																					class="col-md-2 TextFont" id="divbyName">
																					<input class="col-md-8" name="byName" type="text"
																						onkeyup="setAutoCompleteForConfiguration(this.id,'search')"
																						class="typeahead form-control input-SmallText "
																						id="byName" style="margin-left: 50px;" />
																				</div>

																				<div class="col-md-1" style="text-align: center;">
																					<input type="button" value="search"
																						class="btn btn-xs btn-primary" id="searchCharges"
																						onclick="setAutoCompleteForConfiguration(this.id,'search')" />
																				</div>

																			

																				<table class='table table-bordered'
																					style='width: 100%;'>
																					<thead class='cf'>
																						<tr>

																							<th class='col-md-5 center'
																								style='height: 21.5px;'><div
																									class='TextFont'>Service Name</div></th>
																							<th class='col-md-5 center'
																								style='height: 21.5px;'><div
																									class='TextFont'>Charges</div></th>
																							<th class='col-md-2 center'
																								style='height: 21.5px;'><input
																								type='button' value='>>'
																								onclick='addAllTRtoRight()'></th>

																						</tr>
																					</thead>

																				</table>

																			</div>

																			<div class='col-sm-12'
																				style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

																				<table
																					class='table table-striped table-condensed cf'>
																					<tbody id="leftDiv">



																					</tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

														</div>
														<div class="divide-20"></div>
													</div>

													<div class="col-md-6">
														<div class="row">
															<div class="form-group col-md-12"
																style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
																
																<div class="box border blue">
																	<div class="box-title">
																		<h4 id="">
																			<i class="fa fa-table"></i>Charges Configuration

																		</h4>
																		<div class="pull-right"></div>
																	</div>
																	<div class="box-body" style="height: 297px;">
																		<div class='col-sm-12' style="margin-top: 1%;">
																		
																		<div class="col-md-11 center">
																			<label style="margin-top: 6px; margin-left:46px;">Total
																				Charges</label> <input id="totalcharges" type="text"
																				maxlength="200" name="toatalCharges"
																				style="width: 43%; margin-top: -6px; margin-left: 32px;" value="0">
																				
																		<input type="hidden" id="bidipdoc" value="0">		
																		</div>
																			<table class='table table-bordered'
																				style='width: 100%;'>
																				<thead class='cf'>
																					<tr>

																						<th class='col-md-3 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>Service Name</div></th>

																						<th class='col-md-3 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>Charges</div></th>
																								<th class='col-md-3 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>C-Pay</div></th>
																							<th class='col-md-2 center'
																								style='height: 21.5px;'></th>
																								<input
																								type='button' value='<<'
																								onclick='addAllTRtoLeft()'>
																					</tr>
																				</thead>
																			</table>
																		</div>

																		<div class='col-sm-12'
																			style='height: 234px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

																			<table class='table table-striped table-condensed cf'>
																				<tbody id="rightDiv" class="rightDivClass">



																				</tbody>
																			</table>
																		</div>
																		
																	</div>
																</div>
															</div>
														</div>
													</div>

												</form>
											</div>
                   </div>
                   
                    -->
                   
                             <div id="OTDRUG" class="tab-pane fade in">
  <div id="row1" class="col-md-12" style="padding-top: 0px;">
    <div class="tabbable tabs-left col-md-12" style="margin-top: 0px; margin-left: 5px;">
      <div class="tab-content col-md-10" style="margin-top: 0px;">
        <div id="Investigation" class="tab-pane fade active in col-md-12">
          <div id="Investigation_row_1" class="col-sm-12" style="margin-top: 40px;">
            <div class="col-sm-4"><div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1">Product Name </label>
              <div id="divInvestigationTestName">
              <input type="text" placeholder="Product Name" id="txtautoservicePharma" class="typeahead form-control" style="border: 1px solid orange;height:34px" onkeypress="return setValuesToAutocompleteOT(this.id)" >
       <!--              <input id="txtautoservicePharma" class="typehead form-control input-SmallText" type="text" required="" onkeypress="return setValuesToAutocomplete(event)" autocomplete="off" autofocus="autofocus" tabindex="1" placeholder="Product" name="txtProductName" >
 -->          <input type="hidden" value="0" id="textBhVat">
              <input type="hidden" value="0" id="txtAQty">
              <input type="hidden" value="0" id="txtExpiry"><!--new filed pharma expdate  -->    
              <input type="hidden" value="0" id="textBatch"> <!--new filed pharma batchcode  -->   
              <input type="hidden" value="0" id="bathid"> <!--new filed pharma bathid  -->   
              <input type="hidden" value="0" id="serIDPharma">
               <input type="hidden" value="0" id="billidPharma">
              </div>
              </div></div>
     
                 <div  class="col-sm-2" style="margin-top: 0px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Rate</label>
                <input type="text" placeholder="Rate" id="pharmaRate" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="0"></div></div>
                <div  class="col-sm-2" style="margin-top: 0px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Qty </label>
                <input type="text"  id="pharmaQty" class=" form-control" style=" border: 1px solid sliver;" onkeyup="calculateTotalOT()" onkeypress="return validatePrice(event)" value="1"></div></div>
                   <div  class="col-sm-2" style="margin-top: 0px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Amount </label>
                <input type="text"  id="pharmaAmt" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="1"></div></div> 
       
                  
                </div>
                  <div id="Investigation_row2" class="col-sm-12" style="">
                  
                  
                  
                           <div class="col-md-4">
														<div class="row" style="margin-top: 40px;">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: 0px;margin-top:21px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otdrugs"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemdrug',this.id,'OTDRUG')">
																			<option id="firstElmtcomdrug" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemdrug" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
													

														</div>
														<div class="divide-20"></div>
													</div>
                  
                  
                   <div id="col9" class="col-sm-3" style="margin-top: 91px;padding-left:0%">
                  <div class="form-group Remove-Padding col-sm-12"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-2" style="margin-top: 91px;padding-left:0%">
                   <div class="form-group Remove-Padding col-sm-12"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-3" style="margin-top: 115px;px;padding-left:0px">
                   <input type="checkbox" id="cpoeUrgent"> 
                   <label style="margin-top: 0px;" class="TextFont Remove-Padding"> Urgent </label>
                   <i>
                   <button id="bOTD"  onclick="Freez('OT','OTDRUG')" class="btn btn-xs btn-info" type="button" style="margin-left:1%;margin-top:-12px">Freez</button>
                   <input type="button" class="btn btn-xs btn-success editUserAccess" onclick="saveOD('OTDRUG')" value="Save" style="margin-left:1%;margin-top:-12px"> </i>
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12" style="margin-top: 28px">
                   <div class="form-group col-md-12" style="margin: 2px;">
                   <div class="col-md-12" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editTestOD()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deletepharma('multiple','OTDRUG')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12" style="margin-top: 0px;">
                   
                   
                   
													<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'
														id="doctorMasterPojo">
														<thead class='cf'>
															<tr>
																<th class='col-md-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																	<th class='col-md-1 center' style='height: 21.5px;padding-right: 13px;'><div
																		class='TextFont'>Particulars/Details</div></th>		
																<th class='col-md-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Date</div></th>
															<th class="col-md-1 center" style="height: 21.5px; padding-right: 0px;">
                                                             <div class="TextFont">Status</div></th>
                                                             
                                                             <th class="col-md-1 center" style="height: 21.5px; padding-left: 0px;">
                                                              <div class="TextFont">Edit</div></th>
															
																<th class='numeric col-md-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table>
										
											
                   
                   
                
                   
                   </div> 
                   		
				<div style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
                <div class='col-sm-12'	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
				<table class='table table-striped table-condensed cf'>
				<tbody id="tcpoeservicesOD"></tbody>
				</table>
				</div>
				
                 </div>
                 </div>
                 
                 		<div id="patient_sale_Batch_Pop_Up" class="modal fade in">
	<div class="modal-dialog" style="width:54%;">
		<form action="">
			<div class="modal-content center" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i>BatchWise Product Information
						</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 0px;"></div>
					</div>

					<div class="col-md-12-1"
						style="height: 100%; width: 100%; padding-left: 0px;">
						<table id="ItemInfoTable" border="1"
							class="table table-bordered table-striped table-condensed"
							style="height: 100%; width: 100%;">
							<thead>
								<tr>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>select Product</div></th>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Batch Number</div></th>
									<th class=' col-md-2-1 center' style='height: 21.5px;'><div
											class='TextFont'>Expiry</div></th>
											
									<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Net Rate</div></th>
 -->
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>MRP</div></th>

									<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Sale Rate</div></th>
									
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Bill Rate</div></th>	 -->
									
									
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Rate</div></th>
											
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Stock</div></th>			

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Last Purchase From</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Last bill number</div></th>
											
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Last Pur date</div></th>		

									
								</tr>
							</thead>

							<!-- <tbody id="batchData1"
								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
							</tbody> -->
						</table>
					</div>
					
					<div class='col-sm-12-1'style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
                          <table class='table  table-bordered table-striped table-condensed cf'><tbody id="batchData1">
                             </tbody></table></div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">
					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<button type="button" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave" onclick="setPopUpValuesot()"
							>Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
		
                 </div>
               
                   
                             <div id="OTInv" class="tab-pane fade in">
  <div id="row1" class="col-md-12" style="padding-top: 0px;">
    <div class="tabbable tabs-left col-md-12" style="margin-top: 0px; margin-left: 5px;">
      <div class="tab-content col-md-10" style="margin-top: 0px;">
        <div id="Investigation" class="tab-pane fade active in col-md-12">
          <div id="Investigation_row_1" class="col-sm-12" style="margin-top: 40px;">
            <div class="col-sm-4"><div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1">Item Name </label>
              <div id="divInvestigationTestName2">
              <input type="text" placeholder="Item Name" id="txtautoserviceOI" class="typeahead form-control" style="border: 1px solid orange;height:34px" onkeyup="fetchpharmaproductandinvclick(this.id,'OTINV')"></div>
              </div><input type="hidden" id="charges1" value="0"> 
              <input type="hidden" id="billdinv" value="0">
              <input type="hidden" id="serIDinv" value="0">
              <input type="hidden" id="mrnslaveId" value="0">
              </div>
        
                  
                      <div  class="col-sm-2" style="margin-top: 0;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Rate</label>
                <input type="text" placeholder="Rate" id="InvRate" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="0"></div></div>
                <div  class="col-sm-2" style="margin-top: 0px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Qty </label>
                <input type="text"  id="InvQty" class=" form-control" style=" border: 1px solid sliver;" onkeyup="calculateTotalOINV()" onkeypress="return validatePrice(event)" value="1"></div>
                
                
                </div>
                <div  class="col-sm-2" style="margin-top: 0px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Available Qty </label>
                <input type="text"  id="InvAQty" class=" form-control" style=" border: 1px solid sliver;"  onkeypress="return validatePrice(event)" value="1"></div>
                
                
                </div>
                   <div  class="col-sm-2" style="margin-top: 0px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Amount </label>
                <input type="text"  id="InvAmt" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="0"></div></div> 
                
                  
                  </div>
                  <div id="Investigation_row2" class="col-sm-12" style="margin-top: 10px;">
                  <div class="col-md-4">
														<div class="row" style="margin-top:40px;">
														
															<label class="TextFont" style="margin-bottom: 0px;margin-top:21px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otinv"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemINV',this.id,'OTINV')">
																			<option id="firstElmtcomdrug" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemINV" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
														

														</div>
														<div class="divide-20"></div>
													</div>
                  <div id="col9" class="col-sm-3" style="margin-top: 91px;padding-left:0%">
                  <div class="form-group Remove-Padding col-sm-12"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-2" style="margin-top: 91px;padding-left:0%">
                   <div class="form-group Remove-Padding col-sm-12"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-3" style="margin-top: 115px;px;padding-left:0px">
                   <input type="checkbox" id="cpoeUrgent"> 
                   <label style="margin-top: 0px;" class="TextFont Remove-Padding"> Urgent </label>
                   <i>
                   <button id="bOTI" onclick="Freez('OT','OTINV')" class="btn btn-xs btn-info" type="button" style="margin-left:1%;margin-top:-12px">Freez</button>
                   <input type="button" class="btn btn-xs btn-success editUserAccess" onclick="saveOD('OTINV')" value="Save" style="margin-left:1%;margin-top:-12px"> </i>
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12" style="margin-top: 28px">
                   <div class="form-group col-md-12-1" style="margin: 2px;">
                   <div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editCPOE_Test()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deleteCpoeServ('multiple','OT')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12-1" style="margin-top: 0px;">
                  	<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'
														id="doctorMasterPojo">
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																
																	<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 13px;'><div
																		class='TextFont'>Particulars/Details</div></th>		
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Date</div></th>
															<th class="col-md-1-1 center" style="height: 21.5px; padding-right: 0px;">
                                                             <div class="TextFont">Status</div></th>
                                                             
                                                             <th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
                                                              <div class="TextFont">Edit</div></th>
															
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table></div> 
													
													
													
													<div style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
                <div class='col-sm-12-1'	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
				<table class='table table-striped table-condensed cf'>
				<tbody id="tcpoeservicesOI"></tbody>
				</table>
				</div>
                   </div>
                   </div></div>
              
                  <div id="cathLab" class="tab-pane fade in">
  <div id="row1" class="col-md-12" style="padding-top: 0px;">
    <div class="tabbable tabs-left col-md-12" style="margin-top: 0px; margin-left: 5px;">
      <div class="tab-content col-md-10" style="margin-top: 0px;">
        <div id="Investigation" class="tab-pane fade active in col-md-12">
          <div id="Investigation_row_1" class="col-sm-12" style="margin-top: 40px;">
            <div class="col-sm-4"><div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1">Product Name </label>
              <div id="divInvestigationTestName3">
              <input type="text" placeholder="Product Name" id="txtCath" class="typeahead form-control" style="border: 1px solid orange;height:34px" onkeypress="return setValuesToAutocompleteCath(event)">
              <input type="hidden" value="0" id="setIDPharma">
               <input type="hidden" value="0" id="billidcath">
              </div>
              </div></div>
       
                 <div  class="col-sm-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1" style="display:none; ">Rate</label>
                <input  type="text" placeholder="Rate" id="cathRate" class=" form-control" style=" border: 1px solid sliver;display:none;" readonly="readonly" value="0"></div></div>
                <div  class="col-sm-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label style="display:none; " class="TextFont" for="exampleInputEmail1">Qty </label>
                <input type="text"  id="cathQty" class=" form-control" style=" border: 1px solid sliver;display:none;" onkeyup="calculateTotalOT()" onkeypress="return validatePrice(event)" value="1"></div></div>
                   <div  class="col-sm-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12" style="padding-left:5%">
                <label style="display:none; " class="TextFont" for="exampleInputEmail1">Amount </label>
                <input type="text"  id="cathAmt" class=" form-control" style=" border: 1px solid sliver;display:none;" readonly="readonly" value="1"></div></div> 
                <div class="col-md-6">
														<div class="row" style="margin-top:-40px;margin-left:30px">
															
															<label class="TextFont" style="margin-bottom: 0px;margin-top:21px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otcath"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemcath',this.id,'OTCATH')">
																			<option id="firstElmtcomdrug" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemcath" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
														
														</div>
														<div class="divide-20"></div>
													</div>
                  </div>
                  <div id="Investigation_row2" class="col-sm-12" style="margin-top: -18px;">
                   <div id="col9" class="col-sm-3" style="margin-top: 10px;padding-left:2%">
                  <div class="form-group Remove-Padding col-sm-12"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-3" style="margin-top: 10px;">
                   <div class="form-group Remove-Padding col-sm-12"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-0" style="margin-top: 35px;px;padding-left:5px">
                   <input type="checkbox" id="cpoeUrgent"> 
                   <label style="margin-top: 0px;" class="TextFont Remove-Padding"> Urgent </label>
                   <i>
                   <button id="bOTD"  onclick="pharmareflect()" class="btn btn-xs btn-info" type="button" style="margin-left:1%;margin-top:-12px">PharmaReflection</button>
                   <input type="button" class="btn btn-xs btn-success editUserAccess" onclick="saveOD('OTCATH')" value="Save" style="margin-left:1%;margin-top:-12px"> </i>
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12" style="margin-top: 28px">
                   <div class="form-group col-md-12-1" style="margin: 2px;">
                   <div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editTestOD()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deletepharma('multiple','OTCATH')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12-1" style="margin-top: 0px;">
                   
                   
                   
													<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'
														id="doctorMasterPojo">
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																
																	<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 13px;'><div
																		class='TextFont'>Particulars/Details</div></th>		
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Date</div></th>
															<th class="col-md-1-1 center" style="height: 21.5px; padding-right: 0px;">
                                                             <div class="TextFont">Status</div></th>
                                                             
                                                             <th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
                                                              <div class="TextFont">Edit</div></th>
															
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table>
								
                   </div> 
                   		
				<div style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
                <div class='col-sm-12-1'	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
				<table class='table table-striped table-condensed cf'>
				<tbody id="tbOTCAH"></tbody>
				</table>
				</div>
				
                 </div>
                 </div></div>
                   <!-- ot cath lab(end) -->
                   
                   <!--END OT CHARGE  -->
                   
                   
                   

											<!-- ____________@author : Touheed @date : 26-May-2016 @reason : CPOE UI For Manage Opreation (End)_________ -->
										</div>
									</div>
								</div>
	
						</div>
				</div>
			</div>
			<div class="modal-footer">
			<!-- 	<button data-dismiss="modal" class="btn btn-default" type="button">Close</button> -->
			</div>
		</div>
	</div>
</div>
	
	
	
	
	<!--  END PARAS OT TABS-->
	<!-- /*********************modal for print bill For Previous*****************************/ -->
	<div id="ipdBillPrints" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-9"
				style="margin-top: 50px; margin-left: 140px;">
				<div class="modal-header">
					<button type="button" class="close" style="color: red" onclick="hidepurOrderPrint()">&times;</button>
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i>&nbsp;&nbsp; Select Ipd Bills For Print
						</h4>
					</div>
					<div class="box-title" style="margin-left: 60%">					
											
						<button type="button" onclick="checkAllPurchaseOrders()" class="btn btn-xs btn-success">Select All</button>
						<button type="button" onclick="uncheckAllPurchaseOrders()" class="btn btn-xs btn-danger">UnSelect All</button>										
										
					</div>
				</div>

				<div class="modal-body">
					<table border="1"
						class="table table-bordered table-striped table-condensed">
						<thead style="background-color: #FFE0C2;">
							<tr>
								<th>General Bill</th>
								<th>Credit Bill</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><label class="radio"> <input type="checkbox" class="check-uncheck"
										id="supplierscopy" name="billPrint" value="Suppliers Copy"
										onclick="" />
								</label></td>
								<td><label class="radio"> <input type="checkbox" class="check-uncheck"
										id="purchasercopy" name="billPrint" value="Purchaser Copy"
										onclick="" />
								</label></td>
							</tr>
						</tbody>
						<thead style="background-color: #FFE0C2;">
							<tr>
								<th>Provisional Bill</th>
								<th></th>
							</tr>
						</thead>
						<tr>
							<td><label class="radio"> <input type="checkbox" class="check-uncheck"
									id="receiptcopy" name="billPrint" value="Receipt Copy"
									onclick="" />
							</label></td>
							<!-- <td><label class="radio"> <input type="checkbox" class="check-uncheck"
									id="accountscopy" name="accountscopy" value="Accounts Copy"
									onclick="" />
							</label></td> -->
						</tr>
						<!-- <thead style="background-color: #FFE0C2;">
							<tr>
								<th>Indentors Copy</th>
								<th>Master Copy</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><label class="radio"> <input type="checkbox" class="check-uncheck"
										id="indentorscopy" name="indentorscopy" value="Indentors Copy"
										onclick="" />
								</label></td>
								<td><label class="radio"> <input type="checkbox" class="check-uncheck"
										id="mastercopy" name="mastercopy" value="Master Copy"
										onclick="" />
								</label></td>
							</tr>
						</tbody> -->
					</table>

					<div id="purchaseorderprintshow" class="modal-footer">
						<!-- <div class="form-group col-md-9"></div>
						<div class="form-group col-md-1">
							<button type="button" class="btn btn-primary btn-md" style="background-color: #8FBC8F; border: 0px solid green; color: white;font-size: 15px;padding: 8px;" onclick="printPurchaseOrderVendorsWise();">Print</button>							
						</div>
						<div class="form-group col-md-2">
							<button type="button" class="btn btn-primary btn-md" onclick="hidepurOrderPrint();" style="background-color: #8FBC8F; border: 0px solid green; color: white;font-size: 15px;padding: 8px;">Cancel</button>							
						</div> -->
						<button type="button" onclick="printPurchaseOrderVendorsWise()" class="btn btn-sm btn-success">Print</button>
						<button type="button" onclick="hidepurOrderPrint()" class="btn btn-sm btn-danger">Cancel</button>
						
					</div>
				</div>
			</div>
			 
			 <input type="hidden" id="purOrderPrintId" value="0" name="purOrderPrintId"/>
				
		</div>
	</div>

	<!-- /********************* Modal for print bill For Previous end *****************************/ -->
	
	<!-- /*********************modal for Previous pending amount start*****************************/ -->	
	<div data-backdrop="static" tabindex="-1" class="modal fade in" id="previousPendingPopup">
		<div class="modal-dialog">
			<div style="margin-top: 10px; margin-left: 50px;" class="modal-content col-md-12-1">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							Previous Pending Details
							<div class="pull-right">
								<button onclick="setUIPreviousRemainingValue('ipd')" class="btn btn-success">
									<i class="fa fa-save"></i>
								</button>
								<button onclick="closePreviousPendingPopup();" class="btn btn-danger">
									<i class="fa fa-times"></i>
								</button>
							</div>
						</h4>

					</div>
				</div>
				<div class="modal-body">

					<div style="height: 280px; max-height: auto; margin-top: 3%; border: 1px solid #ddd;" id="pendingDetailsDiv" class=""><div class="col-sm-12-1"><table style="margin-top: 9px;" class="table table-condensed header-fixed"><thead><tr style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange;"><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Treatment ID</div></th><th style="height: 21.5px;padding-right:10px;" class="col-md-1-1 center"><div class="TextFont">Treatment Count</div></th><th style="height: 21.5px;padding-right:10px;" class="col-md-1-1 center"><div class="TextFont">Treatment Date</div></th><th style="height: 21.5px;padding-right:20px;" class="col-md-1-1 center"><div class="TextFont">Bill Type</div></th><th style="height: 21.5px;padding-right:15px;" class="col-md-1-1 center"><div class="TextFont">Pending Amount</div></th><th style="height: 21.5px;padding-right:15px;" class="col-md-1-1 center"><div class="TextFont">Payment Amount</div></th><th style="height: 21.5px;padding-right:30px;" class="col-md-1-1 center"><div class="TextFont">Action</div></th></tr></thead>	</table></div><div style="overflow-y:scroll; margin-top:-21px; height: 250px; max-height: auto;" class="col-sm-12-1"><table class="table table-striped table-condensed cf"><tbody></tbody></table></div></div>

					<div style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-bottom: 1%; margin-top: 0%;" class="title col-md-12-1">
						<label style="padding-top: 13px; font-size: 10px; color: blue;" class="col-md-3-1">
						</label> <label style="padding-top: 13px; font-size: 10px; color: green;" class="col-md-2-1" value="refund">
							Total Amount Refund - </label> <label style="padding-top: 13px; font-size: 10px; color: green; padding-left: 1%;" class="col-md-2-1" id="totalRefunds">0</label> <label style="padding-top: 13px; font-size: 10px; color: blue;" class="col-md-2-1" value="pending">
							Total Amount Pending - </label> <label style="padding-top: 13px; font-size: 10px; color: blue; padding-left: 1%;" class="col-md-2-1" id="totalPendings">0</label>
					</div>

					<div class="modal-footer">
						<div class="form-group col-md-12-1 center"></div>
					</div>
				</div>
			</div>
		</div>
	</div>	
	<!-- /********************* Modal for Previous pending amount end *****************************/ -->
	
	<!-- Modal For Narration after Bill edit Start -->

	<div class="md-modal md-effect-11" id="modal-15"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">
				
				<center>
					<h4 class="modal-title">
						<b>Narration</b>
					</h4>
				</center>				

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">						
							
							<div class="li pull-right" style="width: 100px">
							
							</div>

						</ul>
						<div class="divide-10"></div>
						
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">
											
											<div style="width: 100%;; font-weight: bold; height: 100Px;">
												
												
												<form class="form-inline">
                                                        <div class="form-group">
                                                        <label for="inputPassword4">Narration:</label>
                                                        <textarea id="narrationidBill" name="addressText" cols="46" rows="2"></textarea>
                                                           <!-- <label for="inputPassword4">Narration:</label>
   														     <input type="text" id="narrationid" 
   														      class="form-control tip-focus form-control mx-sm-3" title="Please enter narration">
   														        -->
   														   <!--  <label for="inputPassword4">User Name:</label>
   														     <input type="text" id="usernameid" 
   														      class="form-control tip-focus form-control mx-sm-3" title="Please enter User Name"> 
   														       
   														     <label for="inputPassword4">Edit Reason:</label>
   														     <input type="text" id="editreasonid" 
   														        class="form-control tip-focus form-control mx-sm-3" title="Please enter reasone for edit">     
    -->
 														</div>
											     </form>
												
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>					
					</div>
				</div>				

				<!-- </div>  data-dismiss="modal"-->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button" class="form-control btn btn-primary md-close"
								id="idForCloseBill"	onclick="setNarrationBill()" >Submit</button>							
						</div>
						
						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							
							<button id="idForCloseBill" type="button" class="form-control btn btn-primary md-close"
								onclick="closePopupnarrationBill()" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
 <!-- Modal For Narration after Bill edit end -->
 
 
 <!-- Modal For CGHS Print after Bill Start -->

	<div class="md-modal md-effect-11" id="modal-20"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">
				
				<center>
					<h4 class="modal-title">
						<b>Do You want to add Advance Amount ?</b>
					</h4>
				</center>				

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;display: none;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">						
							
							<div class="li pull-right" style="width: 100px">
							
							</div>

						</ul>
						<div class="divide-10"></div>
						
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;display: none;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">
											
											<div style="width: 100%;; font-weight: bold; height: 100Px;">
												
												
												<form class="form-inline">
                                                        <div class="form-group">
                                                        <label for="inputPassword4">Narration:</label>
                                                        <textarea id="narrationidBill" name="addressText" cols="46" rows="2"></textarea>
                                                          
 														</div>
											     </form>
												
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>					
					</div>
				</div>				

				<!-- </div>  data-dismiss="modal"-->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-4">
							
							<button type="button" class="form-control btn btn-primary md-close"
								id="idForCloseBill"	onclick="allPrints('Yes')"style="font-size: 15px">Yes(Shift-Y)</button>							
						</div>
						
						<div class="form-group col-md-4">
							
							<button type="button" class="form-control btn-primary md-close"
								id="idForCloseBill"	onclick="allPrints('No')" style="font-size: 15px" >No(Shift-N)</button>							
						</div>
						
						<div class="form-group col-md-4">
														
							<button id="idForCloseBill" type="button" class="form-control btn btn-primary md-close"
								onclick="closePopupForCghsPrint()" data-dismiss="modal" style="font-size: 15px">Cancel(Shift-X)</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
 <!-- Modal For CGHS Print after Bill end -->
	
	<!-- 	/********start pharmacy div*******/ -->
			<!-- /*********************modal on click check*****************************/ -->

	<div id="Indent_Sales_pending_data" class="modal fade" role="dialog">
		<div class="modal-dialog" style="margin-top: 40px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Pharmacy Amount Details</h4>
				</div>
				<div class="modal-body" style="overflow:scroll;height:auto;width:auto">
					<table id=""  border="1"
						class="table table-bordered table-striped table-condensed">
						<thead style="background-color: #D3D3D3;">
							<tr>
								<th>Indent Sale Balance</th>
								<th>Pharmacy Balance</th>
								<th>Total Amount Received by pharmacy</th>
								<th>Total Bill Amount</th>
								<th>Give Discount?</th>
							</tr>
						</thead>
						<tbody id="">
							<tr>
								<td><input type='text' id="iPatientAMT" readonly="readonly"
									class='form-control input-SmallText' /></td>
								<td><input type='text' id="pendingAmount"
									readonly="readonly" class='form-control input-SmallText' /></td>

								<td><input type='text' id="iPharmacyAMT"
									readonly="readonly" class='form-control input-SmallText' /></td>
								<td><input type='text' id="iPharmacyTotalAMT"
									readonly="readonly" class='form-control input-SmallText' /></td>
								<!-- <td><textarea id="narration" placeholder="Enter some text"
										class='form-control input-SmallText'></textarea></td> -->
										
										<td><input type="checkbox" id="indentCheck" onclick="checkFun(1)"/></td>
							</tr>
						</tbody>
					</table>
					
					<table id="" cellpadding="0" cellspacing="0" border="1"
						class="table table-bordered table-striped table-condensed">
						<thead style="background-color: #D3D3D3;">
							<tr>
								<th>Patient Sale Balance</th>
								<th>Give Discount?</th>
								<!-- <th>Pharmacy Balance</th>
								<th>Total Amount Received by pharmacy</th>
								<th>Total Bill Amount</th>
								<th>Narration</th> -->
							</tr>
						</thead>
						<tbody id="">
							<tr>
								<td><input type='text' id="patientSaleAmt" readonly="readonly"
									class='form-control input-SmallText' /></td>
									<td><input type="checkbox" id="patientCheck" onclick="checkFun(2)"/></td>
								<!-- <td><input type='text' id="pendingAmount"
									readonly="readonly" class='form-control input-SmallText' /></td>

								<td><input type='text' id="iPharmacyAMT"
									readonly="readonly" class='form-control input-SmallText' /></td>
								<td><input type='text' id="iPharmacyTotalAMT"
									readonly="readonly" class='form-control input-SmallText' /></td>
								<td><textarea id="narration" placeholder="Enter some text"
										class='form-control input-SmallText'></textarea></td> -->
							</tr>
						</tbody>
					</table>
					<table id="" border="1"
						class="table table-bordered table-striped table-condensed">
						<thead style="background-color: #D3D3D3;">
							<tr>
								<th>OT Balance</th>
								<th>Give Discount?</th>
							</tr>
						</thead>
						<tbody id="">
							<tr>
								<td><input type='text' id="otAmt" readonly="readonly"
									class='form-control input-SmallText' /></td>
								 
							<td><input type="checkbox" id="otCheck" onclick="checkFun(3)"/></td>

							</tr>
						</tbody>
					</table>
					
					<table id=""  border="1"
						class="table table-bordered table-striped table-condensed">
						<thead style="background-color: #D3D3D3;">
							<tr>
								<th>Narcotic Amt</th>
								<th>Give Discount?</th>
							</tr>
						</thead>
						<tbody id="">
							<tr>
								<td><input type='text' id="narAmt" readonly="readonly"
									class='form-control input-SmallText' /></td>
								 
							<td><input type="checkbox" id="narCheck" onclick="checkFun(4)"/></td>
							</tr>
						</tbody>
					</table>

					<div id="indentHospitalPaymentDiv"></div>
					<div class="text-left">
						<div class="panel-group" id="accordionn">
							<div class="panel">
								<div class="panel-heading">
									<h3 class="panel-title">
										<!-- <a class="accordion-toggle openAllSlaveIpd"
											data-toggle="collapse" data-parent="#accordionn"
											href="#collapseTwon"
											onclick="getSubServiceDetails1ForSponsorForNarco(21)"> -->
										<a class="accordion-toggle openAllSlaveIpd"
											data-toggle="collapse" data-parent="#accordionn"
											href="#collapseTwon">
										<div class="row">
												<div class="col-md-10">Narcotic Drug Invoice</div>
												<div class="col-md-1">
													<i class="fa fa-chevron-down" id="list5n"></i>
												</div>
											</div></a>
									</h3>
								</div>
								<div id="collapseTwon" class="panel-collapse collapse">
									<div class="panel-body"
										style="overflow: scroll; height: auto; width: auto">
										<table class="table table-hover">
											<thead>
												<tr>
													<th class="only-checkbox">#</th>
													<th>SubService Name</th>
													<th>Doc Name</th>
													<th><div class="text-center">Rate</div></th>
													<th><div class="text-center">Qty</div></th>
													<th><div class="text-center">Amount</div></th>
													<!-- <th><div class="text-center">Disc</div></th>
													<th><div class="text-center">Disc Per%</div></th> -->
													<th><div class="text-center">Pay</div></th>
													<th><div class="text-right">Date</div></th>
													<!-- <th class="only-checkbox">Edit</th>
													<th class="only-checkbox">Cancel</th>
													<th class="only-checkbox">ChB</th> -->
												</tr>
											</thead>
											<tbody id="naroticDiv">

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<input id="sumPayByHospAMT" type="hidden" /> <input
						id="sumPharmaAMTRecievedByHosp" type="hidden" />
					<div>
					<span class="text-danger" style="background-color: #D3D3D3;">Disc Given By : *</span><select id="discBy" style="width:140px"></select>
						<span style="background-color: #D3D3D3;margin-left:40px">Naration</span>
						<textarea id="narration" placeholder="Enter some text"
							class='form-control input-SmallText' style="margin-left: 290px; width: 267px; height: 60px;"></textarea>
							<span style="background-color: #D3D3D3;">Total Pending For Disc :</span><input type="text" readonly="readonly" id="pendingTot"><br>
							<span style="background-color: #D3D3D3;">Disc(%) :</span><input type="text" value="0" onchange="funDiscForPharmacyPayment()" id="disc1"><br>
							<span style="background-color: #D3D3D3;">Disc(Amt) :</span><input type="text" value="0" onchange="funDiscForPharmacyPayment2()" id="disc2"><br>
							<span style="background-color: #D3D3D3;">Final Amt :</span><input type="text" value="0" id="fAmt" readonly>
							<button id="" class="btn btn-primary" onclick="giveDisc()" type="button" style="margin-left:460px;margin-top:10px">Give Discount</button>
					</div>
				</div>
				
				<div class="modal-footer">
					<button type="button" id="outstandAmt" class="btn"
						style="background-color: #999966; color: white;"
						onclick="addAmtToIpdOutstanding()"
						data-dismiss="modal">Add to outstanding</button>
					<button type="button" id="DispatchAmt" class="btn"
						style="background-color: #999966; color: white;"
						onclick="SendTotalRecievedOrPaidAmountToPharmacy()"
						data-dismiss="modal">Pay Amount To Patient</button>
					<button type="button" id="RecieveAmt" class="btn btn-primary"
						onclick="SendTotalRecievedOrPaidAmountToPharmacy()"
						data-dismiss="modal">Receive Amount From Patient</button>
					<button type="button" class="btn btn-danger"
						onclick="hideModelAdminCharges();" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>

	

	<!-- 	/********End pharmacy div*******/ -->
									<!--Code by Sanjay Kumar Shah Date-07/03/2018 -->
									<!--		popup modal of status for investigation test send to  RIS from IPDBill
			<div id="RisStatusPopUp" class="popup modal fade in" tabindex="-1"
					role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog" style="width: 500px;">
						<div class="modal-content">
							<div class="modal-header">
								<div class="box-title">
									<h4>Test Status </h4>
								</div>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										BOX
										<div class="box-body">
											Panel Body
											<div class="col-xs-12 col-md-12">
												<div class="col-xs-4 col-md-12">
													<div class="divide-20"></div>
													<div id="InvestigationStatus" class="col-sm-12-1" style="margin-top: 15px;">
														<input type="radio" value="1" id="idInvestigationUrgent1" name="InvestigationUrgent" onclick="setUrgency(1)"/> 
															<label	style="margin-top: 0px;"> Routine </label>
														<input type="radio" value="2" id="idInvestigationUrgent2" name="InvestigationUrgent" onclick="setUrgency(2)"/>
															<label	style="margin-top: 0px;"> Semi-Urgent </label>
														<input type="radio" value="3" id="idInvestigationUrgent3" name="InvestigationUrgent" onclick="setUrgency(3)"/>
													    	<label style="margin-top: 0px;"> Urgent </label>		
													</div>
												</div>
											</div>
										</div>
									</div>
									/BOX
								</div>
							</div>
							<div class="modal-footer">
								<input type="button" value="Send To RIS" class="btn btn-primary"
									onclick="sendToRis()" />
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
							</div>
						</div>
						/BODY
					</div>
				</div>
 <input type='hidden' id="idHiddentUrgencyStatus" value='' /> -->


									<!-- /*********************modal on click check*****************************/ -->
									<!-- JAVASCRIPTS -->
									<!-- Placed at the end of the document so the pages load faster -->

									<!-- DATE RANGE PICKER -->
									<script
										src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>

									<script
										src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>

									<!-- bootstrap datepicker -->
									<script
										src="ehat-design/datepicker/bootstrap-datepicker-by-kishor.js"></script>

									<!-- SLIMSCROLL -->
									<script type="text/javascript"
										src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
									<script type="text/javascript"
										src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
									<!-- BLOCK UI -->
									<script type="text/javascript"
										src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
									<!-- SELECT2 -->
									<script type="text/javascript"
										src="ehat-design/js/select2/billing_select2.js"></script>
									<!-- UNIFORM -->
									<script type="text/javascript"
										src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
									<!-- WIZARD -->

									<!-- BOOTSTRAP SWITCH -->
									<script type="text/javascript"
										src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>

									<script
										src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
									<!-- WIZARD -->
									<script
										src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
									<script
										src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
									<!-- BOOTBOX -->
									<script type="text/javascript"
										src="ehat-design/js/bootbox/bootbox.min.js"></script>
									<!-- COOKIE -->
									<script type="text/javascript"
										src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
									<!-- CUSTOM SCRIPT -->
									<script src="ehat-design/js/script.js"></script>
									<script
										src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>

									<div class="md-overlay"></div>

									<script src="ehat-design/modal/js/classie.js"></script>
									<script src="ehat-design/modal/js/modalEffects.js"></script>

									<script>
		//Date picker
		$('#dob').datepicker({
			autoclose : true
		});

		$('#dob1').datepicker({
			autoclose : true
		});

		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page
			App.init(); //Initialise plugins and elements
			FormWizard.init();
		});
	</script>
									<!-- /JAVASCRIPTS -->
									<input id="cghsPrintFrom" type="hidden" value='' /> <input
										id="narrationBill" type="hidden" value='' /> <input
										type="hidden" id="preIpdId"
										value=<%=request.getParameter("treatcloseForIpd")%>> <input
										id="finalbillis" type="hidden"
										value=<%=request.getParameter("finalbillIs")%> /> <input
										type="hidden" id="unitId"
										value="<%=session.getAttribute("uId")%>"> <input
										type="hidden" id="userId"
										value="<%=session.getAttribute("userId1")%>"> <input
										id="SponsorsourceTypeId" type="hidden" value="" /> <input
										id="docamountonpopup" type="hidden" value="0" /> <input
										id="chargesSlaveId" type="hidden" value="0" /> <input
										id="saveServiceCallFrom" type="hidden" value="N" /> <input
										id="receiptSlaveIdIPD" type="hidden" value="0" /> <input
										id="receiptMasterId" type="hidden" value="0" /> <input
										id="recId" type="hidden" value="0" /> <input
										id="callFromForSave" type="hidden" value="" /> <input
										id="prevPaid" type="hidden" value="0" /> <input
										id="chargesfromConfIpd" type="hidden" value="0" /> <input
										id="defchargesfromConfIpd" type="hidden" value="0" /> <input
										id="iscombinationIpd" type="hidden" value="N" /> <input
										id="iscombinationsponsorIpd" type="hidden" value="N" /> <input
										id="otherBillDetailsIdIpd" type="hidden" value="0" /> <input
										id="childsubServiceIDIpd" type="hidden" value="0" /> <input
										id="billDetailsIdIpd" type="hidden" value="0" /> <input
										id="subServiceIdIpd" type="hidden" value="0" /> <input
										id="servIdPackageIpd2" type="hidden" value="0" /> <input
										id="hallTypeId" type="hidden"
										value="<%=request.getParameter("hallTypeId")%>"
										style="display: none;" /> <input id="ehathallTypeId"
										type="hidden" value="0" style="display: none;" /> <input
										id="billDetailsIdIPD" type="hidden" value="0" /> <input
										id="otProcedureId" type="hidden" value="0" /> <input
										id="receiptOf" type="hidden" value="general" /> <input
										id="categoryidsipd" type="hidden" value="0" /> <input
										id="ehathallidd" type="hidden" value="0" /> <input
										id="hallIDD" type="hidden" value="0" /> <input
										id="idHallTypee" type="hidden" value="0" /> <input
										id="ehatHalltypeIdd" type="hidden" value="0" /> <input
										id="otServId" type="hidden" value="0" />

									<!-- <input id="subServiceIdIPD" type="hidden" value="0" />
	<input id="servIdPackageIPD" type="hidden" value="0" /> -->

									<input id="ehatHallIdFromUI" type="hidden" value="0" /> <input
										id="toDate" type="hidden" value="0" /> <input id="amountpack"
										type="hidden" value="0" /> <input id="concessionpack"
										type="hidden" value="0" /> <input id="rategeneral"
										type="hidden" value="0" /> <input id="counterIpdCghs"
										type="hidden" value="0" /> <input id="editHidden"
										type="hidden" value=0 /> <input id="editHiddenR"
										type="hidden" value=0 /> <input id="genInvoiceFlag"
										type="hidden" value=0 /> <input id="drdeskflag" type="hidden"
										value="-" /> <input id="drdeskflagSpon" type="hidden"
										value="-" /> <input id="finalbill" type="hidden"
										value="<%=request.getParameter("finalbillIs")%>" /> <input
										id="userType" type="hidden"
										value="<%=session.getAttribute("userType")%>" /> <input
										id="narration" type="hidden" value='' /> <input id="hallId"
										type="hidden" value='2' /> <input id="sponsorid2"
										type="hidden" value='0' /> <input id="chargesSlaveId2"
										type="hidden" value='0' /> <input id="deptId" type="hidden"
										value='2' />
									<!-- //tk -->
									<table id='tkt' class='table table-hover'
										style="display: none;">
										<tbody id="tkb">
										</tbody>
									</table>
									<table id='tktR' class='table table-hover'
										style="display: none;">
										<tbody id="tkbR">
										</tbody>
									</table>

									<input id="advancePaid" type="hidden" value="0" /> <input
										id="pendingFlag" type="hidden" value='N' /> <input
										id="pendingBillId" type="hidden" value='0' /> <input
										id="pendingTreatId" type="hidden" value='0' /> <input
										id="shraddha" type="hidden" value="<%=shraddha%>" /> <input
										id="concessionFlow" type="hidden" value="<%=concessionFlow%>" />
									<input id="multipleSponsor" type="hidden"
										value="<%=multipleSponsor%>" /> <input id="pharmacyInvoice"
										type="hidden" value="<%=pharmacyInvoice%>" /> <input
										id="pharmacy" type="hidden" value="<%=pharmacy%>" /> <input
										id="dischargeTimeForInvoiceFlage" type="hidden"
										value="<%=dischargeTimeForInvoiceFlage%>" /> <input
										id="isPpn" type="hidden" value="N" /> <input id="numbr"
										type="hidden" value=0 /> <input type="hidden"
										id="ipdTestSendToLab"
										value="<%=resourceBundleEhat1.getObject("ipdTestSendToLab").toString()%>">

									<%
		String uiM="";
		if(uiModeSetting.contains("on")){
			
			uiM = "P";
		}else{
			
			uiM = "S";
		}
	%>

									<input id="uiMode" type="hidden" value='<%=uiM%>' /> <input
										id="inputAuto" type="hidden" value="-" />
									<!--current_date Added By Tarique  todays_date-->
									<input type="hidden" id="todayDateForemprIpd"
										value="<%=current_date%>"> <input id="sndtolabflag"
										type="hidden" value='N' /> <input id="txtOservamt2"
										type="hidden" value='0' /> <input id="callfrom" type="hidden"
										value='otCharges' /> <input id="idForDisc" type="hidden" /> <input
										id="paidByCashFlag" type="hidden" value='N' /> <input
										id="paidByCashServices" type="hidden" value='0' /> <input
										type="hidden" id="risingFlow"
										value="<%=resourceBundleEha.getObject("rising").toString()%>">
									<input id="bedServiceId" type="hidden" value='0' />
									<!-- ======================= OT Doctors Popup ========================== -->
									<div class="modal fade" id="OTDoctors" role="dialog">
										<div class="modal-dialog" style="width: 50%">
											<!-- Modal content-->
											<div class="modal-content ">
												<form class="form-horizontal col-md-12"
													style="margin-top: 0%;">
													<div class="divide-20"></div>
													<div class="col-md-12">
														<div class="row">
															<div class="form-group col-md-12-1"
																style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
																<div class="box border blue">
																	<div class="box-title">
																		<h4 id="">
																			<i class="fa fa-table"></i>Doctor Details
																		</h4>
																		<button type="button" class="close"
																			data-dismiss="modal">&times;</button>
																		<div class="pull-right"></div>
																	</div>

																	<div class="box-body" style="height: 320px;">
																		<div class='col-sm-12-1' style="margin-top: 1%;">
																			<table class='table table-bordered'
																				style='width: 100%;'>
																				<thead class='cf'>
																					<tr>

																						<th class='col-md-4-1 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>#</div></th>

																						<th class='col-md-4-1 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>Doctor Name</div></th>


																						<!-- <th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Amount</div></th>
															
															<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Chk</div></th> -->
																					</tr>
																				</thead>

																			</table>
																		</div>

																		<div class='col-sm-12-1'
																			style='height: 250px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

																			<table class='table table-striped table-condensed cf'>
																				<tbody id="docDetails">



																				</tbody>
																			</table>
																		</div>



																	</div>
																</div>
															</div>
														</div>
													</div>

												</form>

											</div>

										</div>
									</div>

									<!-- ======================= OT Doctors Popup ========================== -->

									<!-- Start Add sample wsie barcode pop-up -->
									<div id="sampleWiseBarcode" class="modal fade in" tabindex="-1"
										data-keyboard="false" data-backdrop="static">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<h4 class="modal-title">
														Sample Wise Services
														<div class="pull-right" style="margin-right: 15px;">
															<button data-dismiss="modal"
																class="btn btn-primary btn-danger"
																onclick="closeAndResetBarcodePopup();" type="button">Close</button>
														</div>
														<div class="pull-right" style="margin-right: 15px;">
															<button class="btn btn-primary btn-success"
																onclick="saveSampleWiseBarcodes();" type="button">Save</button>
														</div>
													</h4>
												</div>
												<div class="modal-body">
													<div style="overflow: auto;">
														<table id="sampleWiseBarcodeTable"
															class="table table-bordered table-hover table-striped table-responsive">
															<thead>
																<tr>
																	<th>Sr.No</th>
																	<th>Sample Type</th>
																	<th>Tests</th>
																	<th>Barcode</th>
																</tr>
															</thead>
															<tbody id="sampleWiseBarcodeTableBody">
															</tbody>
														</table>
													</div>
												</div>

												<!-- /BODY-->
												<div class="modal-footer"></div>
											</div>
										</div>
									</div>
									<!-- END Add sample wsie barcode pop-up -->
									
									
									<!--  added by vishant  @reason for check user for discount pharmacy -->
	<div id="userNameandpasswordPopUpNew" class="modal fade in" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		style="display: none;">
		<div class="modal-dialog" style="width: 500px;">
			<div class="modal-content">
				<div class="modal-header">
					<div class="box-title">
						<h4>Password Verification</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<!-- BOX -->
							<div class="box-body">

								<!--Panel Body-->

								<div class="col-xs-12 col-md-12">
									<div class="col-xs-4 col-md-12">
										<div class="divide-20"></div>
										<label  style="color: red;">Please
											Enter User Name !!</label> <input type="text" id="userName5"
											class="form-control" placeholder="User Name">
									</div>
								</div>

								<div class="col-xs-12 col-md-12">
									<div class="col-xs-4 col-md-12">
										<div class="divide-20"></div>
										<label  style="color: red;">Please
											Enter User Password !!</label> <input type="password"
											id="userPassword5" class="form-control" placeholder="Password">
									</div>
								</div>

								<!-- /BOX-->
							</div>
						</div>
					</div>
				</div>
					<!-- /BODY-->
					<div class="modal-footer">
						<input type="button" value="Submit" class="btn btn-primary"
							onclick="checkUserNameandPasswordcalDiscountPharamcy()">
						<button type="button" class="btn btn-default"
							id="closeDispecedpopup" onclick="hideDispecedpopup1();">Close</button>

					</div>
				
			</div>
		</div>
	</div>
	<!-- end user popup   -->
	
	<!--  added by vishant  @reason for if any outstanding amount is pending add remark is mandatory -->
	<div id="remarkPopUpNew" class="modal fade in" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		style="display: none;">
		<div class="modal-dialog" style="width: 500px;">
			<div class="modal-content">
				<div class="modal-header">
					<div class="box-title">
						<h4>Add Remark For Oustanding Amount</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<!-- BOX -->
							<div class="box-body">

								<!--Panel Body-->

								<div class="col-xs-12 col-md-12">
									<div class="col-xs-4 col-md-12">
										<select id="OutStandingReason" style="width: 112px;" class="form-control input-SmallText TextFont"><option value="0">--Select Narration--</option></select>
										<div class="divide-20"></div>
										<label  style="color: red;">Please
											Add Remark !!</label> <input type="text" id="outStandingRemark"
											class="form-control" placeholder="remark">
									</div>
								</div>
								<!-- /BOX-->
							</div>
						</div>
					</div>
				</div>
					<!-- /BODY-->
					<div class="modal-footer">
						<input type="button" value="Submit" class="btn btn-primary"
							onclick="submitOutStandingRemark()">
						<button type="button" class="btn btn-default"
							id="closeDispecedpopup" onclick="hideRemarkPopup();">Close</button>

					</div>
				
			</div>
		</div>
	</div>
	<!-- end remark popup   -->

									<!-- FORSURGANCHARGES -->
									<input type="hidden" id="PreAnethesiaCHARGE" value="0" /> <input
										type='hidden' value='0' id='anetheisacharge' /> <input
										type='hidden' value='0' id='assisuragncharge' /> <input
										type='hidden' value='0' id='mainsurgancharg' /> <input
										type='hidden' value='0' id='OTRentcharg' /> <input
										type='hidden' value='0' id='OTinstrumentcharge' />

									<!--end FORSURGANCHARGES -->
									<!-- FORSURGANCHARGES billdeatilsid-->
									<input type='hidden' value='0' id='billidanetheisa' /> <input
										type='hidden' value='0' id='billidassisuragnc' /> <input
										type='hidden' value='0' id='billidmainsurgan' /> <input
										type='hidden' value='0' id='billidOTRent' /> <input
										type='hidden' value='0' id='billidPreAnethesia' /> <input
										type='hidden' value='0' id='billidOTinstrument' />

									<!--end FORSURGANCHARGES billdeatilsid-->
									<!-- FORSURGANCHARGES serviesid-->
									<input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("MainSurgan").toString()%>"
										id='MainSurgan' /> <input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("AsistanSurgan").toString()%>"
										id='AsistanSurgan' /> <input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("AnethesiaNormal").toString()%>"
										id='Anethesia' /> <input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("AnethesiaASAIV").toString()%>"
										id='AnethesiaAIV' /> <input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("AnethesiaStandBy").toString()%>"
										id='AnethesiaSATNDBY' /> <input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("PreAnethesia").toString()%>"
										id='PreAnethesia' /> <input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("OTRent").toString()%>"
										id='OTRent' /> <input type='hidden'
										value="<%=resourceBundleEhatOT.getObject("INSTRUMENTCHARGES").toString()%>"
										id='OTinstrument' /> <input type="hidden" id="inOutHouseCount"
										value="0"> <input type="hidden" id="histopathLab"
										value="N"> <input type="hidden" value="N"
										id="templateWiseTestFlag" /> <input type="hidden"
										id="sponsorTestCharges" value="0"> <input
										type="hidden" id="yearWiseSponsorTestCharges" value="0">
									<input type="hidden" id="hallWiseTestCharges" value="0">
									<input type="hidden" id="packageID" value="<%=packageID%>">
									<input type="hidden" value=0 id="hallSlaveId" /> <input
										type="hidden" value=0 id="defaultPkgFlag" /> <input
										type="hidden" value="P" id="drdeskflag" /> <input
										type="hidden" value="I" id="Inventoryflag" />
 										<input type="hidden" id="isMultiple" name="isMultiple" value="NA">
										
</body>
</html>