<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%-- <%@ page import="com.hms.model.AdminModel"%> --%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Billing</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- STYLESHEETS -->
<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css" href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css" href="ehat-design/css/responsive.css">

<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">

<!-- BOOTSTRAP SWITCH -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-wizard/wizard.css" />
<!-- FONTS -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.min.css" />

<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />

<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />

<!-- ----for table auto complete-------------- -->
<!-- <script type="text/javascript" src="js/ehatMaster.js"></script>
	<script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script> -->
<script src="js/chargesMasterSlave.js"></script>
<script src="ehat-design/js/jspdf.min.js"></script>
<script src="CryptoJS/crypto-js.js"></script>


<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ehat_billing.js"></script>
<script type="text/javascript" src="js/billNoble_opd.js"></script>
<script type="text/javascript" src="js/billNoble1.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>
<script type="text/javascript" src="js/sendToLab.js"></script>
<script type="text/javascript" src="js/currencyMaster.js"></script>
<script type="text/javascript" src="js/emergencyChargesOpd.js"></script>
<script type="text/javascript" src="js/sendToRis.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/radiation.js"></script>
<script type="text/javascript" src="js/pathology_information.js"></script>
<!-- include js for development -->
<script>
$(document).ready(function() {

	
	/* added by ajay:20-03-2019 */
	function fetchHospitalDetailsDiscount() {
		var sid = 0;
		var inputs = [];
		inputs.push('action=fetchHospitalDetails');
		inputs.push('corporateId=' + sid);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AdminServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						pobj1 = eval('(' + ajaxResponse + ')');

						if (pobj1.listHosDetail.length > 0) {
							if(!(pobj1.listHosDetail[0].disCountLimit1)==null || !(pobj1.listHosDetail[0].disCountLimit1)=="" || !(pobj1.listHosDetail[0].disCountLimit1)=="undefine"){
						
							$('#disCountLimit1').val(pobj1.listHosDetail[0].disCountLimit1);
							$('#disCountLimitType').val(pobj1.listHosDetail[0].discountLimitChrgType);
						}
						}
					}
				});
	}
	
	//fetchHospitalDetailsDiscount();	
}); 

</script>

<script type="text/javascript">
					
					
	shortcut.add("Shift+s", function() {
		
		var sponsorId=$("#receiptOf").val();				
		if(sponsorId=="sponsor"){
			
			saveServiceToSponsorPatient();
		}else{
			
			saveServiceToPatient();
		}
		
	});
		
	function stActiveTab(){
	
		var sponsorId=$("#chargesSlaveId").val();
		if(sponsorId>0){
					
			$("#sponsorOpd").trigger('click');			
			//resetAll("sponsor");	
		}else{
			
			//$("#ipdGeneral").trigger('click');			
			resetAll("general");
		}			
	}
	
	jQuery(document).ready(function() {

		//setTimeout(function(){userAccess();},300);
		<%ResourceBundle resourceBundleEhat4 = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = (String) resourceBundleEhat4.getObject("hospitalname").toString();	
	 	%>

		App.setPage("wizards_validations"); //Set current page 
		App.init(); //Initialise plugins and elements 
		handleHomePageTooltips();

		setOpdBillDetailsDistribute();
		setBulkSettleDistributeOnload();
		
		getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); 
		
		getServicesOnBilling();
		ViewTestSampleList("onload");//pathology related
		getAllPayments();
		getAllNarrations();  //comment by Rohini
		setConcessionWhenAccesOn();

		fetchOpdbilDiscount('opdBill');
		
		fetchAuthorisedBy();		 //comment by Rohini
		
		var c=$("#preId").val(); 
		if(c=="treatclose"){ 
			
			$("#btnTreatClose").hide();
			$("#btnConvertIpd").hide();
			$("#fileUploadForOpdBilling").hide();
			
		}else{
			
			$("#btnTreatClose").show();
		} 
		
		//getTempInCghs();
		//getServicesOnBilling();
		//getDoctornameForCommonTemp2();   
		//getBankMasterList(); //Added by sagar 
			
		showAndHideSponsor();
		//getAllChargesMasterOpd();
		
		setIPDnameForCommonTemp();
		<%-- callingSubServiceDetailsFunction(<%=request.getParameter("treatmentId")%>); --%>
		
		stActiveTab();
		
		var spnsrId=$("#chargesSlaveId").val();
		
		/* if(spnsrId>0){
			setallchargesConfigOnBillingOPD("perticularOpdSponsor");	
		}else{
			autosuggetionForDefault("perticular");
		} */		
		var multipleSponsor=$("#multipleSponsor").val();		
		if(multipleSponsor=="on"){
			getSponsorSanctionAmountForOpd();
			$('#sponsorDetailsHead').show();
			$('#sanctionAmountHead').show();
			$('#utilisedAmountHead').show();
			$('#balanceAmountHead').show();		
			$('#sanctionAmount').show();
			$('#utilisedAmount').show();
			$('#balanceAmount').show();		
		}
		setTimeout(function() {
			$('#perticular').focus();
			$('#perticularOpdSponsor').focus();
		}, 30);
		
		//getDayOfWeek2();
		//fetchHospitalHolidayEmrPer('onload');
		EmerChrAccordingToTimeOpd();
		<%-- setOpdBillMaster(<%=request.getParameter("treatmentId")%>); --%>
		//getPatientCommanAdvance();// added by dayanand for getting common advance amt
		$("#discRemark").show(); 
		//getOneCurrencySymbols2();
		getAllDoctorListForBilling();
		$("#servId").select2();

		var sponsorId=$("#chargesSlaveId").val();
		if(sponsorId>0){
			
			getSpecialization("reg","specialityIdSponsor");
		}else{
			
			getSpecialization("reg","specialityId");
		}	

		$("#splNamePackageOpd").select2();
		$("#doctorNamePackage").select2();
       var meeshaFlow= $("#sendTestFlagMeesha").val();
       getFollowUpCount();
       if(meeshaFlow== "on"){

	          /* $("#selPerticularDiv").show();
			           $("#selPerticularOpdSponsorDiv").show();
			           $("#PerticularOpdSponsorDiv").hide();
			           $("#servIdOpdSponsorDiv").hide();
			           $("#perticularDiv").hide();
			           $("#servIdDiv").hide();*/

			           $("#selPerticularDiv").hide();
			           $("#selPerticularOpdSponsorDiv").hide();
			           $("#PerticularOpdSponsorDiv").show();
			           $("#servIdOpdSponsorDiv").show();
			           $("#perticularDiv").show();
			           $("#servIdDiv").show();
			           
			   if(sponsorId>0){
		
					//setallservautocompleteOnBilling('perticular');
					//setallservautocompleteOnBillingForSponsor('selPerticularOpdSponsor');
			 }else{
		
					//setallservautocompleteOnBillingForNormal('selPerticular');
			}
       }else{
    	   $("#selPerticularDiv").hide();
           $("#selPerticularOpdSponsorDiv").hide();
           $("#PerticularOpdSponsorDiv").show();
           $("#servIdOpdSponsorDiv").show();
           $("#perticularDiv").show();
           $("#servIdDiv").show();
        }   

       });


	
	function handleHomePageTooltips() {		
		//Default tooltip (Top)
		$('.tip-focus').tooltip({
			trigger: 'focus'
		});
	}

	
	/* onload = function() {

		setTimeout(function(){
			
		},300);
	}); */
	
</script>




<style>
.lblBold {
	font-weight: 600;
}
</style>

</head>
<body>

	<c:if test="${ sessionScope.userType != null }">

	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>


		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat("dd/MM/yyyy");
			String current_date = formatter1.format(currentDate.getTime());
			
			java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
			String todays_time = formatterrr.format(currentDate.getTime());
			
			ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");   
		 	String concessionFlow = resourceBundleEha.getObject("concessionFlow").toString();
		 	String multipleSponsor = resourceBundleEha.getObject("multipleSponsor").toString();	
		 	
		 	ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");   
		 	String pharmacyInvoice = resourceBundle.getObject("pharmacyInvoice").toString();
		 	String pharmacyServId = resourceBundle.getObject("pharmacyServId").toString();
		 	String packageID = resourceBundle.getObject("packageID").toString();
		 	
		 	String uiModeSetting = resourceBundleEha.getObject("uiMode").toString();
		 	//String meeshaFlow = resourceBundleEha.getObject("billPrintsHeader").toString();
		 	String meeshaFlow = resourceBundle.getObject("meesha").toString();
		 	String sendTestFlagMeesha = resourceBundle.getObject("meesha").toString();
		%>

	</header>

	<%@include file="menu_HelpDesk.jsp"%>

	<!--End Left Menu -->

	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">

		<!-- SIDEBAR -->
		<%-- <%@include file="menu_HelpDesk.jsp"%> --%>
		<%-- <%@include file="left_menu_pathology.jsp"%> --%>
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

										<div class="li pull-right">

											<form action="UploadDoctordeskServlet" id="fileUploadfrm"
												name="fileUploadfrm" enctype="multipart/form-data"
												method="post">

												<input type="hidden" id="TRTiD" name="TRTiD"
													value="<%=request.getParameter("treatmentId")%>"><input
													type="hidden" id="PiD" name="PiD" value="0"> <input
													type="hidden" id="txtNotes" name="txtNotes"
													value="From OPD Bill">

												<div class="centered">

													<%-- <label id="fileUploadForOpdBilling"
														style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
														<a target=""
														href="ehat_file_upload_opd.jsp?treatmentId=<%=request.getParameter("treatmentId")%>">
															<i class="fa fa-arrow-circle-right"></i> <font
															color="red">File Upload</font>
													</a>
													</label> --%> 
													
													<label class="checkbox-inline">Emergency Charge <input
														onclick="setBox();" type="checkbox" value="N"
														id="emrChrFlag">
													</label> <label class="text-inline" id="perBox"> <input
														type="text" value="0" name="emrPer" id="emrPer"
														style="display: none; height: 23px; width: 54px;"
														onkeyup="calculate123('main')"
														onkeypress="return validateNumPer2(event)">
													</label>

													<button class="btn btn-xs btn-success"
														type='button' id="btnTreatClose" data-toggle="tooltip"
														data-placement="left" title="Close Treatment"
														value="Close Treatment"
														onclick='closePatientTreatment(<%=request.getParameter("treatmentId")%>)'
														>
														<i class=" fa fa-times"></i>
													</button>

													<button id="btnConvertIpd"
														class="btn btn-xs btn-warning"
														type='button' data-toggle="tooltip" data-placement="left"
														title="Convert To IPD"
														onclick="ConvertToIpd(<%=request.getParameter("treatmentId")%>)"
														>
														<i class="fa fa-exchange"></i>
													</button>

												</div>
											</form>
										</div>

									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>
						<!-- /PAGE HEADER -->
						<!-- SAMPLE -->

						<div class="alert alert-block alert-info fade in"
							style="height: 0%;">

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
										
										<div class="col-md-3" style="width: 22%">
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
									</div>
										
									<div class="col-md-12 form-row">
										
										<div class="col-md-3" style="width: 22%">
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
										
										<div class="col-md-3" style="width: 22%">
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
										
										<div class="col-md-3" style="display: none;">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BNo: </label> <label
													class="control-label" id="billNo">01-D</label>

											</div>
										</div>
                                    </div>	
                                    
                                    <div class="col-md-12 form-row">	
                                    	
                                    	<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label
													class="control-label" id="doa"> 2017-05-12-D</label>

											</div>
										</div>
										
                                   		<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label>
												<label id="consultingDoctorr" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label class="control-label" id="billCategoty"> </label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Follow Up Count  :</label> <label
													class="control-label" id="followUpCount">0 </label>

											</div>
										</div>
									</div>
									 
									 <div class="col-md-12 form-row">
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label
													class="control-label" id="corporate"> </label>

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
												<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
												<%-- <input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> /> --%>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						

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
											<div class="box-body" id="mainBillDeatilsForOpd">
												<div class="tabbable header-tabs">
													<ul class="nav nav-tabs">


														<li><a href="#box_tab6" data-toggle="tab"
															style="display: none;><i
															class="fa fa-desktop" ></i>
															<span class="hidden-inline-mobile"  onclick="resetAll('cghs');">CGHS Bill</span></a></li>
													<li><a href="#box_tab5" data-toggle="tab" style="display: none;" id="sponsorHide"><i
															class="fa fa-flask"></i> 
																														
															<span class="hidden-inline-mobile" id="sponsorOpd" onclick="resetAll('sponsor');">Sponsor Bill</span></a></li>
															<!-- class="
															hidden-inline-mobile"  onclick="getPatientBillAmount(<%=request.getParameter("treatmentId")%>,'sponsor')">Sponsor
																Bill</span>
														</a></li> -->

														<li class="active"><a href="#box_tab4"
															data-toggle="tab"><i class="fa fa-home"></i> <span
																id="generalOpd" class="hidden-inline-mobile"
																onclick="resetAll('general');"> General Bill</span></a></li>
														<!-- <span class="badge badge-blue font-11">3</span> </a></li>-->
													</ul>
													<div class="tab-content">
														<div class="tab-pane fade in active" id="box_tab4">

															<div class="row">

																<form>

																	<input type="hidden" class="form-control" id="billDetailsId" value="0" />
																	<div class="form-group col-md-4"
																		style="padding-right: 4px;" id="selPerticularDiv">
																		<label for="email">Particular:</label> 
																			
																			<select id="selPerticular" name="selPerticular" class="col-md-12" onchange="setProfileDetails()"></select>
																	</div>
																	
																		<div class="form-group col-md-2"
																		style="padding-right: 4px;display: none" id="perticularDiv">
																		<label for="email">Particular:</label>  <input
																			type="text" class="form-control" id="perticular"
																			placeholder="Enter Perticular" name="perticular"
																			onkeyup="autosuggetionForDefault(this.id);">
																			
																	</div>
																	
																	<!-- <div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="setallservautocompleteOnBilling(this.id),calculatePerticularTotal1();">
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
																<div class="form-group col-md-2" style="padding:0 0 0 4px;display: none;" id="servIdDiv">
																		<label for="email">Service:</label>
																		<!-- <div class="col-md-8"> -->
																		<select id="servId" name="ServName"
																			style="padding: 0px" class="col-md-12"
																			onclick=""></select>
																	</div>
																	
																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="email">Speciality:</label>
																		<!-- <div class="col-md-8"> -->
																		<select id="specialityId" name="specialityId"
																			style="padding: 0px" class="col-md-12"
																			onclick="getDoctorBySpecialization('generalOpdBill','doctorName')"></select>
																	</div>


																	<div id="doctorDiveG" class="form-group col-md-2"
																		style="padding: 0 0 0 4px">
																		<label for="email">Doctor:</label>
																		<!-- <div class="col-md-8"> -->
																		<select id="doctorName" value='null' name="doctorName"
																			onchange="getSpecilizationByDoctorIdOnBilling(),getDoctorConsultationCharges()" class="col-md-12"></select>
																	</div>



																	<div id="dateDiveG" class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
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


																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="numeric">Rate:</label> <input type="text"
																			style="text-align: right" class="form-control"
																			value="0" id="rate" name="rate"
																			onchange="setHiddenFielde(this.value),calculate123('general');"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularTotal1()"> <input
																			type="hidden" value="0" id="rate2" name="rate2">
																	</div>

																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="email">Qty:</label> <input type="text"
																			class="form-control" value="1" id="qty" name="qty"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularTotal1(),calculate123('general')">
																	</div>



																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="Amount">Amount:</label> <input type="text"
																			style="text-align: right" class="form-control"
																			onkeyup="calculatePerticularPay1()" value="0"
																			id="amount" name="amount">
																	</div>

																	<div id="conPerDivG" class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none">
																		<label for="email">Per %:</label> <input type="text"
																			class="form-control" value="0" id="concessionOnPerc"
																			name="concessionOnPerc"
																			onkeypress="return validatePrice(event)"
																			onkeyup="concessionOnPercentage(),calculatePerticularTotal1();">
																	</div>

																	<div id="conDivG" class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none">
																		<label for="email">Concsn:</label> <input type="text"
																			style="text-align: right" class="form-control"
																			value="0" id="concession" name="concession"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularTotal1(),calPerForCon(); ">
																	</div>


																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none;">
																		<label for="email">Pay:</label> <input type="text"
																			style="text-align: right" class="form-control"
																			value="0" id="pay" name="pay"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularCoPay1()">
																	</div>

																	<div id="conCoPayDivG" class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none;">
																		<label for="email">C-Pay:</label> <input type="text"
																			style="text-align: right" class="form-control"
																			value="0" id="coPay" name="coPay"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularPay1()">
																	</div>

																	<div class="form-group col-md-1"
																		style="padding-left: 4px;">
																		<label for="email">(Shft + S)</label> <input
																			type="button" class="form-control btn btn-primary"
																			value="save" id="saveBill" name="saveBill"
																			style="padding: 0px" onclick="saveServiceToPatient()">
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
																		id="clearPerticularLabel"
																		onclick="clearAllFieldsOfOpd()"> <i
																		class="fa fa-plus-square"></i> New
																	</label>
																	<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"
																	onclick="onClickEdit(this.id)"> <i
																	class="fa fa-edit"></i> Edit
																</label> -->

																	<%-- <%if(meeshaFlow.equals("on")) {%> --%>

																	<label class="deleteUserAccess"
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="deletePerticularLabels"
																		onclick="deleteServiceToPatient(this.id)"> <i
																		class="fa fa-trash-o"></i> Delete
																	</label>

																	<%-- <%}%> --%>
																	<!-- <label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="canclePerticularLabels" value="Delete"
																	onclick="cancleOnClick(this.id)" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->

																	<!-- <i class="fa fa-plus" id="exploreServ"></i> -->
																	<label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="expPerticularLabels" onclick="checkAll('general')">
																		Check All </label>

																	<!-- <i class="fa fa-plus" id="exploreServ"></i>  -->
																	<label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="expPerticularLabels" onclick="uncheckAll()">
																		UnCheck All </label> <i class="fa fa-plus" id="chkAllServ"></i>
																	<label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="expPerticularLabels"
																		onclick="exploreOnClick('open')"> Open
																		All/Close All </label> <i class="fa fa-plus"
																		id="convertToPack"></i> <label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="convertToPackageOpd" data-toggle="modal"
																		data-target="#packToConv"
																		onclick="convertToPackageOpd('open',<%=request.getParameter("treatmentId")%>)">
																		Convert To Pack </label> <label
																		style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;"
																		onclick="sendToLab(1)"> <i
																		class="fa fa-arrow-circle-right"></i> Send To Lab
																	</label>  <label data-target="#RisStatusPopUp"
																		data-toggle="modal"
																		style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
																		<i class="fa fa-arrow-circle-right"></i> Send To RIS
																	</label><!-- <label
																		style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;"
																		onclick="sendToRadiation(1)"> <i
																		class="fa fa-arrow-circle-right"></i> Send To
																		Radiation
																	</label> <label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		onclick="setServiceForCashOpd()"> <i
																		class="fa fa-fw"><img width="17px;" height="17px;"
																			style="margin-right: 20px;"></i>&nbsp;&nbsp;&nbsp;&nbsp;Cash
																		Payment
																	</label> --> <input type="hidden" id="cancleType" value="N" />
																</div>

															</div>

															<!-- ORDER DETAILS -->
															<!-- <div class="col-md-8"> -->
															<div class="panel panel-default"
																style="height: 320px; overflow: auto;" id="opdBillPanel">
																<div class="panel-body">


																	<div class="row">

																		<!-- <div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="clearAllFieldsOfOpd()"> <i
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
																	style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
																	<i class=""></i>&nbsp;&nbsp;Service Total Qty:
																</label> <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="totalQty"> <i class="fa fa-at-o"></i>
																	Totlal Qty:
																</label> <label
																	style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
																	<i class="fa fa-inr edit_currency_symbol"></i>&nbsp;&nbsp;Total
																	Amount:
																</label><label
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="totalAmt"> <i
																	class="fa fa-inr edit_currency_symbol"></i>
																</label>

																<% 
																if(uiModeSetting.contains("off")){
															%>

																<label
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="payAmount"> <i><a id="txtPayAmt"
																		style="cursor: pointer; text-decoration: none; color: red;"
																		onclick="setUiMode()"> Pay Amount</a></i>
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

																	<div class="form-group col-md-4" style="padding-right: 4px;" id="selPerticularOpdSponsorDiv">
																		<label for="email">Particular:</label> 
																		<select id="selPerticularOpdSponsor" name="selPerticularOpdSponsor" class="col-md-12" onchange="setProfileDetailsForSponsor()"></select>
																	</div>
																	
																	<div class="form-group col-md-2"
																		style="padding-right: 4px;display: none" id="PerticularOpdSponsorDiv">
																		<label for="email">Particular:</label> <input
																			type="text" class="form-control"
																			id="perticularOpdSponsor"
																			placeholder="Enter particular"
																			name="perticularOpdSponsor"
																			onkeyup="setallchargesConfigOnBillingOPD(this.id);">
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
																	<div class="form-group col-md-2"
																		style="padding: 0 0 0 4px;display: none" id="servIdOpdSponsorDiv">
																		<label for="email">Service:</label>
																		<!-- <div class="col-md-8"> -->
																		<select id="servIdOpdSponsor"
																			name="ServNameOpdSponsor" style="padding: 0px"
																			class="form-control col-md-12" onclick=""></select>
																	</div>
																	
																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="email">Speciality:</label>
																		<!-- <div class="col-md-8"> -->
																		<select id="specialityIdSponsor" name="specialityIdSponsor"
																			style="padding: 0px" class="col-md-12"
																			onchange="getDoctorBySpecialization('sponsorOpdBill','doctorNameOpdSponsor')"></select>
																	</div>

																	<div id="doctorDiveS" class="form-group col-md-2"
																		style="padding: 0 0 0 4px">
																		<label for="Doctor">Doctor:</label>
																		<!-- <div class="col-md-8"> -->
																		<select id="doctorNameOpdSponsor" value='null'
																			name="doctorName" class="col-md-12"
																			onchange="getSpecilizationByDoctorIdOnBilling(),getDoctorConsultationCharges()"></select>
																	</div>



																	<div id="dateDiveS" class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label class="TextFont" for="exampleInputPassword1">Date</label>
																		<input type="text" id="finalDate"
																			value="<%=current_date%>" readonly="readonly"
																			onclick="displayCalendar(document.getElementById('finalDate'),'dd/mm/yyyy',this)"
																			class="form-control input-SmallText"> <input
																			type="hidden" id="finalTimeOpdSponsor" value="" />
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
																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="numeric">Rate:</label> <input type="text"
																			class="form-control" value="0" id="rateOpdSponsor"
																			name="rateOpdSponsor"
																			onchange="setHiddenFielde2(this.value),calculate123('sponsor');"
																			style="text-align: right;"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularTotalOpdSponsor()">
																		<input type="hidden" value="0" id="rateOpdSponsor2"
																			name="rateOpdSponsor2">
																	</div>

																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="email">Qty:</label> <input type="text"
																			class="form-control" value="1" id="qtyOpdSponsor"
																			name="qtyOpdSponsor"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularTotalOpdSponsor(),calculate123('sponsor')">
																	</div>



																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px">
																		<label for="Amount">Amount:</label> <input type="text"
																			style="text-align: right;" class="form-control"
																			onkeyup="calculatePerticularPayOpdSponsor()"
																			value="0" id="amountOpdSponsor"
																			name="amountOpdSponsor" readonly="readonly">
																	</div>

																	<div id="conPerDivS" class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none">
																		<label for="email">per %:</label> <input type="text"
																			class="form-control" value="0"
																			id="concessionOpdSponsorOnPerc"
																			name="concessionOpdSponsorOnPerc" onkeypress=""
																			onkeyup="concessionOnPercentageOpdSponsor(),calculatePerticularTotalOpdSponsor();">
																	</div>


																	<div id="conDivS" class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none">
																		<label for="email">Concsn:</label> <input type="text"
																			class="form-control" value="0"
																			id="concessionOpdSponsor" name="concessionOpdSponsor"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularTotalOpdSponsor(),calPerForConIpd();">
																	</div>

																	<div id="payDivS" class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none">
																		<label for="email">Pay:</label> <input type="text"
																			style="text-align: right;" class="form-control"
																			value="0" id="payOpdSponsor" name="payOpdSponsor"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularCoPayOpdSponsor()">
																	</div>

																	<div class="form-group col-md-1"
																		style="padding: 0 0 0 4px; display: none;">
																		<label for="email">C-Pay:</label> <input type="text"
																			style="text-align: right;" class="form-control"
																			value="0" id="coPayOpdSponsor" name="coPayOpdSponsor"
																			onkeypress="return validatePrice(event)"
																			onkeyup="calculatePerticularPayOpdSponsor()">
																	</div>

																	<div class="form-group col-md-1"
																		style="padding-left: 4px; padding-top: 0px;">
																		<label for="email">(Shft + S)</label> <input
																			type="button" class="form-control btn btn-primary"
																			value="save" id="saveBillOpdSponsor"
																			name="saveBillOpdSponsor" style="padding: 0px"
																			onclick="saveServiceToSponsorPatient(this.id)">
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
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px; display: none;"
																		id="newPerticularLabel" value="New"
																		onclick="clearAllFieldsOfOpd()"> <i
																		class="fa fa-plus-square"></i> New
																	</label> <label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																		id="newPerticularLabel" value="New"
																		onclick="clearAllFieldsOfOpd()"> <i
																		class="fa fa-plus-square"></i> New
																	</label>

																	<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"
																	onclick="onClickEdit(this.id)"> <i
																	class="fa fa-edit"></i> Edit
																</label> -->

																	<%-- <%if(meeshaFlow.equals("on")) {%> --%>

																	<label class="deleteUserAccess"
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="deletePerticularLabell" value="delete"
																		onclick="deleteServiceToPatient(this.id)"> <i
																		class="fa fa-trash-o"></i> Delete
																	</label>

																	<%-- <%}%> --%>
																	<!-- <label
																	style="cursor: pointer;"padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="canclePerticularLabell" value="Delete"
																	onclick="cancleOnClick(this.id)" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->


																	<label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="expPerticularLabels" onclick="checkAll('sponsor')">
																		Check All </label>

																	<!-- <i class="fa fa-plus" id="exploreServ"></i>  -->
																	<label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="expPerticularLabels" onclick="uncheckAll()">
																		UnCheck All </label> <i class="fa fa-plus" id="exploreServv"></i>
																	<label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="expPerticularLabelss"
																		onclick="exploreOnClick('open')"> Open
																		All/Close All </label> <i class="fa fa-plus"
																		id="convertToPack"></i> <label
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																		id="convertToPackageOpd" data-toggle="modal"
																		data-target="#packToConv"
																		onclick="convertToPackageOpd('open',<%=request.getParameter("treatmentId")%>)">
																		Convert To Pack </label> <label
																		style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;"
																		onclick="sendToLab(1)"> <i
																		class="fa fa-arrow-circle-right"></i> Send To Lab
																	</label>  
																	
																	<label data-target="#RisStatusPopUp"
																		data-toggle="modal"
																		style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;">
																		<i class="fa fa-arrow-circle-right"></i> Send To RIS
																	</label>
																	
																	<!--  <label
																		style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;"
																		onclick="sendToRadiation(2)"> <i
																		class="fa fa-arrow-circle-right"></i> Send To
																		Radiation
																	</label> --> <label
																		style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;"
																		onclick="setSponsorRateToSelfPatientOPD()"> <i
																		class="fa fa-arrow-circle-right"></i> Set Sponsor Rate
																	</label> <input type="hidden" id="cancleType" value="N" />
																</div>

															</div>

															<!-- ORDER DETAILS -->
															<!-- <div class="col-md-8"> -->
															<div class="panel panel-default" id="opdBillPanelSponsor"
																style="height: 320px; overflow: auto;">
																<div class="panel-body">

																	<div class="row">

																		<!-- <div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="clearAllFieldsOfOpd()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="edit" value="Edit" onclick="editPerticular()">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabell" onclick="deleteServiceToPatient(this.id)" value="Delete">
																			<i class="fa fa-trash-o"></i> Delete
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

																			<tbody id="sponsor">
																			
																			</tbody>

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
																	style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
																	<i class=""></i>&nbsp;&nbsp;Service Total Qty:
																</label> <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="totalQtys"> <i class="fa fa-at-o"></i>
																	Totlal Qty:
																</label> <label
																	style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
																	<i class="fa fa-inr edit_currency_symbol"></i>&nbsp;&nbsp;Total
																	Amount:
																</label><label
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="totalAmts"> <i
																	class="fa fa-inr edit_currency_symbol"></i>
																</label>

																<!-- <label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="payAmount"> <i><a id="txtPayAmtSp" style="cursor: pointer;text-decoration: none;color: red;" onclick="setUiMode()"> Pay Amount</a></i>
															</label> -->

															</div>
															<!-- /ORDER DETAILS -->
														</div>

														<div class="tab-pane fade" id="box_tab6">


															<!-- ORDER DETAILS -->
															<!-- <div class="col-md-8"> -->
															<div class="panel panel-default"
																style="height: 259px; overflow: auto;">
																<div class="panel-body">

																	<div class="row">

																		<div
																			style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																			class="title col-md-12-1">
																			<label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																				id="newPerticularLabel" value="New"
																				onclick="clearAllFieldsOfOpd()"> <i
																				class="fa fa-plus-square"></i> New
																			</label> <label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id="editPerticularLabel" value="Edit"> <i
																				class="fa fa-edit"></i> Edit
																			</label> <label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id="deletePerticularLabel" value="Delete"
																				onclick="deletePerticular()"> <i
																				class="fa fa-trash-o"></i> Delete
																			</label> <label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id="sCghs" value="sCghs" onclick="saveOpdCghs()">
																				<i class="fa fa-trash-o"></i> save Cghs
																			</label><label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id="cghsOpdPrint" value="cghsOpdPrint"
																				onclick="cghsOpdPrint()"> <i
																				class="fa fa-print"></i> Print Cghs
																			</label> </label> <label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id="cghsRemainOpdPrint" value="cghsRemainOpdPrint"
																				onclick="cghsRemainOpdPrint()"> <i
																				class="fa fa-print"></i> Print Diff.Cghs Detail
																			</label><label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id=PrintDiffOpdCghsAmount
																				value="PrintDiffOpdCghsAmount"
																				onclick="PrintDiffOpdCghsAmount()"> <i
																				class="fa fa-print"></i> Print Diff.Cghs Amount
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
																
																<label
																	style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
																	<i class=""></i>&nbsp;&nbsp;Total Qty:
																</label> <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="totalQtty"> <i class="fa fa-at-o"></i>
																	Totlal Qty:
																</label> <label
																	style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
																	<i class="fa fa-inr edit_currency_symbol"></i>&nbsp;&nbsp;Total
																	Amount:
																</label><label
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="totalAmmt"> <i
																	class="fa fa-inr edit_currency_symbol"></i>
																</label>
															</div>

															<!-- /ORDER DETAILS -->


															<div class="panel panel-default"
																style="height: 260px; overflow: auto;">
																<div class="panel-body">
																	<div class="row">

																		<form>

																			<div class="form-group col-md-2">
																				<label for="email">Perticular:</label> <input
																					type="text" class="form-control" id="perManual"
																					placeholder="Enter Perticular" name="email"
																					onkeyup="setallTempAutocompleteOnOpdBilling(this.id)">
																			</div>
																			<div class="form-group col-md-2">
																				<label for="email">Pack Code:</label> <input
																					type="text" class="form-control" id="packManual"
																					placeholder="Enter Code" name="email">
																			</div>
																			<div class="form-group col-md-2">
																				<label for="email">Date:</label> <input type="email"
																					class="form-control" id="dateManual"
																					value="<%=current_date%>"
																					"
																		readonly="readonly"
																					name="email">
																			</div>

																			<div class="form-group col-md-1">
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

																			<div class="form-group col-md-1">
																				<label for="email">Disc:</label> <input type="email"
																					class="form-control" id="concessionManual"
																					name="email"
																					onkeypress="return validatePrice(event)"
																					onkeyup="calculatePerticularTotal2()">
																			</div>

																			<div class="form-group col-md-1">
																				<label for="email">Amount:</label> <input
																					type="email" class="form-control" id="amountManual"
																					name="email" onkeyup="calculatePerticularPay2()">
																			</div>

																			<div class="form-group col-md-1">
																				<label for="email">Pay:</label> <input type="email"
																					class="form-control" id="payManual" name="email"
																					onkeypress="return validatePrice(event)"
																					onkeyup="calculatePerticularCoPay2()">
																			</div>

																			<div class="form-group col-md-1">
																				<label for="email">Copay:</label> <input
																					type="email" class="form-control" id="coPayManual"
																					name="email"
																					onkeypress="return validatePrice(event)"
																					onkeyup="calculatePerticularPay2()">
																			</div>

																			<div class="form-group col-md-2"
																				id="divSaveEditButton">
																				<label for="email"></label> <input type="button"
																					class="form-control btn btn-primary" value="Save"
																					id="addService" name="email"
																					onclick="setTemplateForTemp(this.id)">
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
																				onclick="clearAllFieldsOfOpd()"> <i
																				class="fa fa-plus-square"></i> New
																			</label> <label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id="editPerticularLabel" value="Edit"> <i
																				class="fa fa-edit"></i> Edit
																			</label> <label
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																				id="deletePerticularLabel" value="Delete"
																				onclick="deletePerticular()"> <i
																				class="fa fa-trash-o"></i> Delete
																			</label>
																			<!-- <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label> -->
																		</div>


																		<table id='opdCghsTableM' class='table table-hover'>

																			<thead>
																				<tr>
																					<th class='text-center'>#</th>
																					<!-- <th>Item</th> -->
																					<th>
																						<div class='text-center'>Service</div>
																					</th>
																					<th>
																						<div class='text-center'>Pack Code</div>
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

																					<!-- <th>
																					<div class='text-right'>Total Price</div>
																				</th> -->
																				</tr>
																			</thead>

																			<tbody id="cghsBillManual">

																			</tbody>
																		</table>

																	</div>
																	<!-- /TABLE -->

																</div>
																<!-- /PANEL BODY -->

															</div>


															<div class="form-group col-md-2"
																class='form-group Remove-Padding col-md-2-1'
																style='padding-right: 8px; margin-top: 13px;'>
																<label for="email">Service:</label> <input type="text"
																	class="form-control" id="SerManualRemains"
																	placeholder="Enter Perticular" name="email">
															</div>
															<div class="form-group col-md-2"
																class='form-group Remove-Padding col-md-2-1'
																style='padding-right: 8px; margin-top: 13px;'
																style="padding:0 0 0 4px">
																<label class="TextFont" for="exampleInputPassword1">Date</label>
																<input type="text" id="dateManualRemains"
																	value="<%=current_date%>" readonly="readonly"
																	class="form-control input-SmallText">
															</div>
															<div class="form-group col-md-2"
																class='form-group Remove-Padding col-md-2-1'
																style='padding-right: 8px; margin-top: 13px;'>
																<label for="email">Amount:</label> <input type="text"
																	class="form-control" id="amountManualRemains"
																	placeholder="Enter Perticular" name="email">
															</div>
															<div class="form-group col-md-2"
																class='form-group Remove-Padding col-md-2-1'
																style='padding-right: 8px; margin-top: 13px;'>
																<label class='TextFont col-md-4-1' for="email">Pay:</label>
																<input type="text" class="form-control"
																	id="payManualRemains" placeholder="Enter Perticular"
																	name="email">
															</div>
															<div class="form-group col-md-2"
																class='form-group Remove-Padding col-md-2-1'
																style='padding-right: 8px; margin-top: 13px;'>
																<label class='TextFont col-md-4-1' for="email">Total
																	Remains:</label> <input type="text" class="form-control"
																	id="totalManualRemains" placeholder="Enter Perticular"
																	name="email">
															</div>
															<div class="form-group col-md-2" id="divSaveEditButton">
																<label for="email"></label> <input type="button"
																	class="form-control btn btn-primary" value="Add"
																	id="addService" name="email"
																	onclick="setTemplateForTempRemains(this.id)">
															</div>


															<table class='table table-hover'>

																<thead>
																	<tr>
																		<th class='text-center'>#</th>

																		<th>
																			<div class='text-center'>Service</div>
																		</th>
																		<th>
																			<div class='text-center'>Date</div>
																		</th>
																		<th>
																			<div class='text-center'>Amount</div>
																		</th>
																		<th>
																			<div class='text-center'>Pay</div>
																		</th>
																		
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
										<!-- /BOX -->
									</div>

								<% 
									if(uiModeSetting.contains("off")){
								%>

									<div class="col-md-12 box" id="receiptView"
										style="display: none;">

								<%
									}else{
									
								%>

										<div class="col-md-12 box" id="receiptView">

								<%
									}
								%>

											<div class="panel panel-default" id="refundBillDetails"
												style="height: 182px; overflow: auto;">
												<div class="panel-body">
													<div class="tabbable">
														<ul class="nav nav-tabs" id="receiptUl">
															<li class="active" id="allReceipt"><a
																onclick="getBillReceiptDetails('all')" data-toggle="tab"><i
																	class="fa fa-user-md"></i> All Receipts</a></li>
															<li><a onclick="getBillReceiptDetails('cash')"
																data-toggle="tab"><i class="fa fa-user-md"></i> Cash
																	Receipts</a></li>
															<li><a onclick="getBillReceiptDetails('credit')"
																data-toggle="tab"><i class="fa fa-credit-card"></i>
																	Credit Receipts</a></li>
															<li><a onclick="getBillReceiptDetails('refundable')"
																data-toggle="tab"><i class="fa fa-credit-card"></i>
																	Refundable</a></li>
															<li><a onclick="getBillRefundDetails('refund')"
																data-toggle="tab"><i class="fa fa-credit-card"></i>
																	Refunded</a></li>
															<li id="deletedReceipt"><a
																onclick="getBillReceiptDetails('deleted')"
																data-toggle="tab"><i class="fa fa-credit-card"></i>
																	Deleted</a></li>

															<!-- <li id="deletedReceipt">
														<a onclick="getBillReceiptDetails('cashPaid')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Paid In Cash</a></li> -->

															<li style="float: right;"><a
																onclick="hideBillDetails()"><b><label
																		id="billText"> Show Receipts View </label> <i
																		id="shBillView" class="fa fa-chevron-up"></i> </b></a></li>
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

									<div class="col-md-3" id="payDiv" style="display: none;padding-right: 0px">

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
														<i class="fa fa-colum"></i><span
															class="hidden-inline-mobile"></span>
													</h4>
												</div>
												<div class="box-body" style="min-height: 430px">

													<table class="table table-condensed  bottomLine">
														<tbody>
															<tr>
																<th class="col-md-3 center"><div class="TextFont">
																		<button id="btnRefund" class="btn btn-xs btn-primary"
																			onclick="saveRefundBillDetailsByApproved('refund')"
																			disabled="disabled">Refund</button>
																	</div></th>
																<!-- <th class="col-md-4 center"><div class="TextFont"><button class="btn btn-xs btn-warning" onclick="receiptBillPrint('receipt',-5);">Receipt</button></div></th> -->
																<!-- <th class="numeric col-md-3 center"><div class="TextFont"><button class="btn btn-xs btn-info">Manage</button></div></th> -->
																<th class="col-md-3 center"><div class="TextFont">
																		<button id="btnDisc" class="btn btn-xs btn-warning"
																			onclick="manageDiscount()">Discount</button>
																	</div></th>
															</tr>
														</tbody>
													</table>

													<table id="headerTable">

														<tr>
															<td style="width: 50%"><label>Pay Mode</label></td>
															<td><select class="form-control" id="payMode"
																style="width: 100%" onchange="BankOnSelect();">
															</select></td>
															<td>
																<button id="btnMultiple" style="display: none;"
																	class="md-trigger" data-modal="modal-11">Multi</button>
															</td>

														</tr>
														
														<tr id="discAuth">
															<td><label>Authorized <span
																	class="required text-danger">*</span></label></td>
															<td><select id="discAuthSel" class="form-control">
																	<option value="0">Select</option>
																	<option value="1">Mangesh Virkar</option>
																	<option value="2">Sameer</option>
																	<option value="3">Anurag</option>
																	<option value="4">Vinod</option>
															</select></td>

														</tr>
														
													<!-- added by vishant -->	
													   
													<%if(hospitalName.equalsIgnoreCase("Siddhivinayak")){
															%>
													   <tr id="discFrom">
															<td><label>Discount From <span
																	class="required text-danger">*</span></label></td>
															<td><select id="discountFrom" class="form-control">
																	<option value="Hospital">Hospital</option>
																	<option id="refDoctorName" value="RefDoctor">Ref.Doctor</option>
																	
															</select></td>

														</tr>
													<%}%>

														<tr class="member">
															<td><label>Bank</label></td>
															<td><select class="form-control" id="bankID"
																style="width: 100%">
																	<option value="1">ICICI</option>
																	<option value="2">HDFC</option>
																	<option value="3">YES BANK</option>
																	<option value="4">IDBI</option>
															</select></td>

														</tr>
														<tr class="member2">
															<td><label>Card Number</label></td>
															<td><input class="form-control" type="text" id="cardnumber"></td>
														</tr>
														<tr class="member3">
															<td><label>Cheque Number</label></td>
															<td><input class="form-control" type="text" id="chequenumber"></td>
														</tr>
														<tr class="member2">
															<td><label>Batch Number</label></td>
															<td><input class="form-control" type="text" id="newBatchNumber"></td>
														</tr>
														
														<tr>
															<td><label>Payable</label></td>
															<td><input class="form-control" type="text" id="payable" readonly></td>

														</tr>

														<tr>
															<td><label>Now Pay</label></td>
															<td><input class="form-control" type="text" id="payNow" value="0"
																onkeyup="calRefundPerOpd()"></td>

														</tr>

														<tr id="trDisc" style="display: none;">
															<td><label>Discount (%)</label></td>
															<!-- <td><input class="form-control" type="text" id="discount" value="0"
																onkeyup="calDiscount()"></td> -->
																<td><input class="form-control" type="text" id="discount" value="0"
																onChange="calDiscountLimit()"></td>

														</tr>

														<tr id="trDiscAmt">
															<td><label>Discount</label></td>
															<!-- <td><input class="form-control" type="text" id="discountAmt" value="0"
																onkeyup="calDiscountPer()"></td> -->
																<td><input class="form-control" type="text" id="discountAmt" value="0"
																onChange="calDiscountPerLimit()"></td>

														</tr>

														

														<tr id="discNarrtn" style="display: none;">
															<td><label>Reason <span
																	class="required text-danger">*</span></label></td>
															<td><select id="narrSel" class="form-control">
															</select></td>

														</tr>


														<tr style="display: none;" id="trRefPer">
															<td><label>Refund (%)</label></td>
															<td><input class="form-control" type="text" onkeyup="calRefundAmtOpd()"
																id="refPer"></td>

														</tr>

														<tr id="refAuth" style="display: none;">
															<td><label>Authorized By </label></td>
															<td><select id="refAuthSel" class="form-control">
																	<option value="0">Select</option>
																	<option value="1">Mangesh Virkar</option>
																	<option value="2">Sameer</option>
																	<option value="3">Anurag</option>
																	<option value="4">Vinod</option>
															</select></td>

														</tr>

														<tr id="discRemark" style="display: none;">
															<td><label>Remark </label></td>
															<td><input class="form-control" type="text" id="txtDiscRemk"></td>

														</tr>

														<tr id="refRemark" style="display: none;">
															<td><label>Remark <span
																	class="required text-danger">*</span>
															</label></td>
															<td><input class="form-control" type="text" id="txtRefRemk"></td>

														</tr>

														<tr style="display: none;">

															<td><label>Payee</label></td>
															<td><select class="form-control" style="width: 100%"
																id="payee" onchange="showSponsor()">
																	<option value="1">Patient</option>
																	<option value="2">Sponsor</option>
															</select></td>

														</tr>

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
																		<select name="listmstr" id="listmstr_select_service"
																			style="width: 95px"
																			onchange="setDyanamicDivForChargesOpd('dynamicItems',this.id)">
																			<option id="firstElmts">--- Select Sponsor
																				---</option>
																		</select>
																	</div>
																</div>

															</td>

															<td>

																<div
																	class="col-md-12 select2-container select2-container-multi">
																	<ul id="dynamicItems" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>
															</td>

														</tr>

														<tr>
															<td>
																<div id="hideshowiPharmacyBtn" class="TextFont" style="padding-top: 0px; display: none;">
																	<button id="iPharmacyBtn" class="btn btn-xs btn-success" data-target="#Indent_Sales_pending_data"
																		data-toggle="modal"	onclick="patientPaymentData();getSubServiceDetailsForSponsor11(21);getDiscOfSponser(1);getPharmacyInBillOrNot();"
																		style="background: red none repeat scroll 0% 0%;">Pharmacy Payment</button>
																</div>
															</td>
															
															<td align="right"><input id="btnPayNow"
																type="button" onclick="saveBillDetails('cash')"
																class="btn btn-xs btn-primary" value="Pay Now" disabled></td>

														</tr>

													</table>
														
													<%if(hospitalName.equalsIgnoreCase("Siddhivinayak")){%>	
														<div
															style="max-height: 68px; width: 100%; overflow-y: scroll;"
															class="col-md-12-1">
															<table class="table table-condensed cf">
																<tr>
																	<th style="border-top: none;"
																		class="numeric col-md-6-1">Narration</th>
																	<th style="border-top: none;"
																		class="numeric col-md-0-1">Amount</th>
																	<th style="border-top: none;"
																		class="numeric col-md-0-1">Status</th>
																</tr>
																<tbody id="listDiscount"></tbody>
															</table>
														</div>
														<%}%>	
														<script type="text/javascript">
											
											function patientPaymentData() {

												var treatmentId=$('#treatmentId').text();
												var inputs = [];
												if (treatmentId != '0') {
													inputs.push('treatmentId=' + treatmentId);
													inputs.push('spId=' + $("#idForDisc").val());
													var str = inputs.join('&');
													jQuery
															.ajax({
																async : true,
																type : "GET",
																data : str + "&reqType=AJAX",
																url : "/MAHAHMIS/pharmacy/patientSale/getPendingAmountByTreatmentId",
																timeout : 1000 * 60 * 5,
																catche : false,
																error : function() {

																},
																success : function(r) {
																	$("#patientSaleAmt").val(r);
																}
															});

													return true;
												} else {
													$("#indentHospitalPaymentDiv").html("");
												}

											}
											
											</script>
													<div class="divide-20"></div>

													
													<table class="table table-condensed ">

														<tbody>
															<tr class="divide-10"></tr>

															<!-- <tr>
														<td style="padding: 1px;" id="idCategoryDiscount" class="col-md-7-1">Category Disc(0.0%)</td>
														<td style="color: #5CAFE6; padding: 1px; font-weight: bold;text-align: right;" id="categoryDiscount" class="col-md-4-1">0.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr>  -->

															<tr>
																<td style="padding: 1px;" class="col-md-7-1">Grand
																	Total</td>
																<td
																	style="padding: 1px; font-weight: bold; text-align: right;"
																	id="grandTotal" class="col-md-4-1"></td>
																<td style="border-top:; padding: 1px;"
																	class="col-md-1-1"></td>

															</tr>


															<tr>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-7-1">Total Consn</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right;"
																	id="conTotal" class="col-md-4-1"></td>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-1-1"></td>
															</tr>

															<!-- for 1 -->
															<tr>
																<td style="padding: 1px;" class="col-md-7-1">Discount</td>
																<td
																	style="color: orange; padding: 1px; font-weight: bold; text-align: right;"
																	id="finalDiscount" class="col-md-4-1"></td>
																<td style="border-top:; padding: 1px;"
																	class="col-md-1-1"></td>
															</tr>

															<tr>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-7-1">Total Net Amount</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right;"
																	id="finalBillTotal" class="col-md-4-1"></td>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-1-1"></td>
															</tr>
															
															<tr>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-7-1">Total Paid</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right;"
																	id="finalPaid" class="col-md-4-1"></td>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-1-1"></td>
															</tr>

															<tr style="color: blue;">
																<td style="border-top: none; padding: 1px;"
																	class="col-md-7-1">Paid By Sponsor</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right;"
																	id="paidBySponsor" class="col-md-4-1"></td>																
															</tr>

															<tr>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-7-1">Total Refund</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right;"
																	id="finalRefund" class="col-md-4-1"></td>
																<td style="border-top: none; padding: 1px;"
																	class="col-md-1-1"></td>
															</tr>
															
															<tr class="divide-10"></tr>
															
															<tr style="color: blue;">
																<td style="border-top: none; padding: 1px;"
																	class="col-md-7-1">Total Remain</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right;"
																	id="finalRemain" class="col-md-4-1"></td>																
															</tr>

															<tr class="divide-10"></tr>
															
															<tr style="color: crimson;display: none;">
																<td id="sponsorDetailsHead"
																	style="border-top: none; padding: 1px;"
																	class="col-md-7-1">Sponsor Details :-</td>

															</tr>
															<tr style="color: Black;">
																<td
																	style="border-top: none; padding: 1px; display: none;"
																	id="sanctionAmountHead" class="col-md-7-1">Sanction
																	Amount</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right; display: none;"
																	id="sanctionAmount" class="col-md-4-1">00.00</td>
															</tr>

															<tr style="color: Black;">
																<td
																	style="border-top: none; padding: 1px; display: none;"
																	id="utilisedAmountHead" class="col-md-7-1">Utilised
																	Amount</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right; display: none;"
																	id="utilisedAmount" class="col-md-4-1">00.00</td>
															</tr>

															<tr style="color: Black;">
																<td
																	style="border-top: none; padding: 1px; display: none;"
																	id="balanceAmountHead" class="col-md-7-1">Balance
																	Amount</td>
																<td
																	style="border-top: none; padding: 1px; text-align: right; display: none;"
																	id="balanceAmount" class="col-md-4-1">00.00</td>
															</tr>

														</tbody>
													</table>

													<div class="divide-20"></div>

													<div
														style="margin-left: 0px; margin-top: -5px; color: red;"
														id="divPrePay">
														<label id="previousRemainingText" class="TextFont">Previous
															Pending Amount : </label> <label id="previousRemaining"><label
															style="color: blue;"><i
																style="margin-right: 10px;" id="previousRemainingValue">0</i></label>
														<button id="btnPrePay" style="line-height: 1.2;"
																class="btn btn-xs btn-warning" type="button"
																onclick="fetchPrevPending('onclick')">PAY</button></label>
													</div>

													<div
														style="margin-left: 0px; margin-top: -5px; color: red;"
														id="divPrePay">
														<label class="TextFont">Total Common Advance : </label> <label><label
															style="color: blue;"><i
																style="margin-right: 10px;" id="finalAdvance">0</i></label></label>
													</div>


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
										<span class="go-top"> <i class="fa fa-chevron-up"></i>
											Top
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

	<div class="modal fade" id="pack" role="dialog">
		<div class="modal-dialog" style="width: 90%">

			<!-- Modal content-->
			<div class="modal-content ">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						onclick="clearAllFieldsOfOpd()">&times;</button>

					<h4 class="modal-title">Package Details</h4>
				</div>
				<div class="modal-body">

					<form class="form-horizontal col-md-12" style="margin-top: 0%;">

						<div class="col-md-12 box">

							<div class="panel panel-default">
								<div class="panel-body">
									<div class="row">

										<form>

											<div class="form-group col-md-2">
												<label for="email">Perticular:</label> <input type="text"
													class="form-control" id="perManualPackage"
													placeholder="Enter Perticular" name="email"
													onkeyup="autoSuggetionPackageOPD(this.id)">
											</div>
											<div class="form-group col-md-2" style="margin-left: -1%;">
												<label for="email">Service:</label>
												<!-- <div class="col-md-8"> -->
												<select id="servIdPackage" name="ServNamePackage"
													style="padding: 0px" class="form-control col-md-12"
													onclick=""></select>
											</div>

											<div class="form-group col-md-2" style="margin-left: -1%;">
												<label for="spl">Speciality:</label>
												<!-- <div class="col-md-8"> -->
												<select id="splNamePackageOpd" name="splNamePackageOpd"
													class="col-md-12" onchange="getDoctorBySpecialization('generalOpdBill','doctorNamePackage')"></select>
											</div>

											<div class="form-group col-md-2" style="margin-left: -1%;">
												<label for="Doctor">Doctor:</label>
												<!-- <div class="col-md-8"> -->
												<select id="doctorNamePackage" value='null'
													name="doctorName" class="col-md-12"
													onchange=""></select>
											</div>
											<div class="form-group col-md-2" style="margin-left: -1%;">
												<label for="email">Date:</label> <input type="email"
													class="form-control" id="datePackage"
													value="<%=current_date%>" readonly="readonly" name="email">
											</div>

											<div class="form-group col-md-1" style="margin-left: -1%;">
												<label for="email">Rate:</label> <input type="email"
													class="form-control" id="ratePackage" name="email"
													onkeypress="return validatePrice(event)"
													onkeyup="calculatePackage()">
											</div>

											<div class="form-group col-md-1" style="margin-left: -1%;">
												<label for="email">Qty:</label> <input type="text"
													class="form-control" id="qtyPackage" name="qu"
													onkeypress="return validatePrice(event)"
													onkeyup="calculatePackage()" value="1">
											</div>

											<div class="form-group col-md-1" style="margin-left: -1%;">
												<label for="email">Amount:</label> <input type="email"
													class="form-control" id="amountPackage" name="email"
													onkeyup="calculatePackage()" readonly>
											</div>

											<div class="form-group col-md-1" id="divSaveEditButton"
												style="margin-left: -1%;">
												<label for="email"></label> <input type="button"
													class="form-control btn btn-primary editUserAccess" value="Save"
													id="addServicePackage" name="email"
													onclick="savePackageBillingOPD()">
											</div>

										</form>

									</div>
								</div>
							</div>

						</div>
						
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
											<div class="pull-right"></div>
										</div>

										<div class="box-body"
											style="height: 320px; overflow-y: scroll; border: 1px solid #ddd;">
											<div class='col-sm-12-1' style="margin-top: 1%;">
												<table class='table table-bordered' style='width: 100%;'
													id="packageDiv">													

												</table>
											</div>


										</div>

										<!-- Added for Package Total amount and Remaining Amount By Bilal -->
										<div class="title col-md-12-1"
											style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;">
											<label
												style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
												<i class=""></i> Service Total Qty:
											</label> <label id="totalQtyPackage"
												style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
											<label
												style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
												<i class="fa fa-inr edit_currency_symbol"></i> Total Amount:
											</label> <label id="totalAmtPackage"
												style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>

											<label
												style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
												<i class="fa fa-inr edit_currency_symbol"></i> Package
												Amount:
											</label> <label id="totalPackageAmount"
												style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
											<label
												style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
												<i class="fa fa-inr edit_currency_symbol"></i> Remaining
												Amount:
											</label> <label id="totalRemainingPack"
												style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>

											<label id="includeRemainingPack"
												style="cursor: pointer; padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
												onclick="includeAmountInPack()"> <i
												class="fa fa-plus"></i> Include In Package
											</label> <label id="convertToBilling"
												style="cursor: pointer; padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
												onclick="convertToBillingOPD('open',<%=request.getParameter("treatmentId")%>)">
												<i class="fa fa-plus"></i> Convert To Billing
											</label>
										</div>
										<!-- Added for Package Total amount and Remaining Amount By Bilal -->
									</div>
								</div>
							</div>
						</div>

					</form>
					<!-- 	</div> -->

				</div>
				<div class="modal-footer">
					
				</div>

			</div>

		</div>
	</div>

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

	<!--  </div>
   </div>
  </div> -->

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
				<div class="modal-body"
					style="overflow: scroll; height: auto; width: auto">

					<table id="" border="1"
						class="table table-bordered table-striped table-condensed">
						<thead style="background-color: #D3D3D3;">
							<tr>
								<th>Patient Sale Balance</th>
								<th>Give Discount?</th>
							</tr>
						</thead>
						<tbody id="">
							<tr>
								<td><input type='text' id="patientSaleAmt"
									readonly="readonly" class='form-control input-SmallText' /></td>
								<td><input type="checkbox" id="patientCheck"
									onclick="checkFun(2)" /></td>
							</tr>
						</tbody>
					</table>

					<table id="" border="1"
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

								<td><input type="checkbox" id="narCheck"
									onclick="checkFun(4)" /></td>
							</tr>
						</tbody>
					</table>

					<div class="text-left">
						<div class="panel-group" id="accordionn">
							<div class="panel">
								<div class="panel-heading">
									<h3 class="panel-title">
										<a class="accordion-toggle openAllSlaveIpd"
											data-toggle="collapse" data-parent="#accordionn"
											href="#collapseTwon"
											onclick="getSubServiceDetailsForSponsor11(21)">
											<div class="row">
												<div class="col-md-10">Narcotic Drug Invoice</div>
												<div class="col-md-1">
													<i class="fa fa-chevron-down" id="list5n"></i>
												</div>
											</div>
										</a>
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
													<!-- 	<th class="only-checkbox">Edit</th>
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
						<span style="background-color: #D3D3D3;">Disc Given By :</span><select
							id="discBy" style="width: 180px"><option>AAAAAAAAAA</option>
							<option>BBBBB</option>
							<option>CCCCCCCCC</option></select> <span
							style="background-color: #D3D3D3; margin-left: 40px">Naration</span>
						<textarea id="narration" placeholder="Enter some text"
							class='form-control input-SmallText'
							style="margin-left: 290px; width: 267px; height: 60px;"></textarea>
						<span style="background-color: #D3D3D3;">Total Pending For
							Disc :</span><input type="text" readonly="readonly" id="pendingTot"><br>
						<span style="background-color: #D3D3D3;">Disc(%) :</span><input
							type="text" value="0" onblur="funDisc1()" id="disc1"><br>
						<span style="background-color: #D3D3D3;">Disc(Amt) :</span><input
							type="text" value="0" onblur="funDisc2()" id="disc2"><br>
						<span style="background-color: #D3D3D3;">Final Amt :</span><input
							type="text" value="0" id="fAmt" readonly>
						<!-- <button id="" class="btn btn-primary" onclick="giveDisc()" type="button" style="margin-left:460px;margin-top:10px">Give Discount</button> -->
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" id="outstandAmt" class="btn"
						style="background-color: #999966; color: white;"
						onclick="addAmtToOpdOutstanding()" data-dismiss="modal">Add
						to outstanding</button>
					<!-- <button type="button" id="DispatchAmt" class="btn"
						style="background-color: #999966; color: white;"
						onclick="SendTotalRecievedOrPaidAmountToPharmacy()"
						data-dismiss="modal">Pay Amount To Patient</button>
					<button type="button" id="RecieveAmt" class="btn btn-primary"
						onclick="SendTotalRecievedOrPaidAmountToPharmacy()"
						data-dismiss="modal">Receive Amount From Patient</button> -->
					<button type="button" class="btn btn-danger"
						onclick="hideModelAdminCharges();" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>
	<!-- 	/********End pharmacy div*******/ -->

	<!-- Modal For Multiple Payments Start -->

	<div class="md-modal md-effect-11" id="modal-11"
		style="border-radius: 10px; width: 700px">
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
								<button value="+" id="btnAddNew" type="button"
									style="margin: 7px; float: left; margin-left: 40px"
									class="btn btn-xs btn-success" onclick="toCreateTr()">+</button>
								<button value="_" id="btnDelete" type="button"
									style="margin: 7px;" class="btn btn-xs btn-success"
									onclick="toRemoveTr('RowCount')">-</button>
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

												<table border="1"
													class="table table-bordered table-striped table-condensed"
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
													<tbody
														style="overflow-y: scroll; border: 1px solid #436a9d;"
														id="multiPayTbody">

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

						<div class="form-group col-md-3">
							<label for="email">Payable:</label> <input type="text"
								class="form-control" id="multiPayable" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-3">
							<label for="pwd">Pay Now :</label> <input type="text"
								class="form-control" id="multiPayNow" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd">Remain :</label> <input type="text"
								class="form-control" id="multiRemain" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button"
								class="form-control btn btn-primary md-close" id="idForClose"
								onclick="setMultiPayNow()">Submit</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button type="button" id="idForCloseP"
								class="form-control btn btn-primary md-close"
								onclick="resetPayMode();closePopup();">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>

	<!-- Modal For Multiple Payments End   -->
	
	<!-- added by vishant: 1-april-2024 show pop-up user name and password purpose click on discount button and this pop-up  -->
			
			
			<div id="userNameandpasswordPopUpByRefund" class="modal fade in" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog" style="width: 500px;">
					<div class="modal-content">
						<div class="modal-header">
							<div class="box-title">
								<h4>
									Password Verification
								</h4>
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
												<label for="exampleInputEmail1" style="color: red;">Please
													Enter User Name !!</label> <input type="text"
													id="userNameref" class="form-control"
													placeholder="User Name">
											</div>
										</div>

										<div class="col-xs-12 col-md-12">
											<div class="col-xs-4 col-md-12">
											<div class="divide-20"></div>
												<label for="exampleInputEmail1" style="color: red;">Please
													Enter User Password !!</label> <input type="password"
													id="userPasswordref" class="form-control"
													placeholder="Password">
											</div>
										</div>
										 
										<!-- /BOX-->
									</div>
								</div>
							</div>
							<!-- /BODY-->
							<div class="modal-footer">
							<input type="button" value="Submit" class="btn btn-primary"
									onclick="checkUserNameandPasswordByRefundApproved()" />
									<button type="button" class="btn btn-default"
									id="closeDispecedpopup" onclick="hideRefundpopup();">Close</button>
							</div>
						</div>
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
														<label for="inputPassword4">Narration :</label>
														<textarea id="narrationid" name="addressText" cols="46"
															rows="2"></textarea>
														
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
								class="form-control btn btn-primary md-close" id="idForClose22"
								onclick="setNarration()">Submit</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button id="idForClose32" type="button"
								class="form-control btn btn-primary md-close"
								onclick="closePopupnarration()" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
	<!-- Modal For Narration after reeipt edit End -->



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
														<label for="inputPassword4">Narration:</label>
														<textarea id="narrationidBill" name="addressText"
															cols="46" rows="2"></textarea>
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
							<button type="button"
								class="form-control btn btn-primary md-close"
								id="idForCloseBill" onclick="setNarrationBill()">Submit</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button id="idForCloseBill" type="button"
								class="form-control btn btn-primary md-close"
								onclick="closePopupnarrationBill()" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
	<!-- Modal For Narration after Bill edit end -->
	
	<!-- Modal For Remark after cancel test Start  -->

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
														<input id="idremarkcanceltest" value ="0" type="hidden" >
														<input id="billDetailsId" value ="0" style="display: none" >
														<input id="callFrom" value ="0" style="display: none" >
														<textarea id="remarkcanceltest" name=remarkcanceltest
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
								id="idForCloseBill" onclick="submitRemarkCancelTest()">Submit</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button id="idForCloseBill" type="button"
								class="form-control btn btn-primary md-close"
								onclick="cancelRemarkpopupCancelTest()" 
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
	<!-- Modal For Remark after cancel test end RRR-->
	

	<!-- Modal For Narration after reeipt delete Start -->

	<div class="md-modal md-effect-11" id="modal-18"
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
														<label for="inputPassword4">Narration:</label>
														<textarea id="delNarration" name="addressText" cols="46"
															rows="2"></textarea>
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
								class="form-control btn btn-primary md-close" id="idForClose22"
								onclick="deleteNarration('submit')">
								Sub<input id="multipleSponsor" type="hidden"
									value="<%=multipleSponsor%>" />mit
							</button>
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

							<button id="idForClose32" type="button"
								class="form-control btn btn-primary md-close"
								data-dismiss="modal" onclick="deleteNarration('cancel')">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
	<!-- Modal For Narration after reeipt delete End -->


	<!-- popup modal of status for investigation test send to  RIS from OPDBill -->
	<div id="RisStatusPopUp" class="popup modal fade in" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 500px;">
			<div class="modal-content">
				<div class="modal-header">
					<div class="box-title">
						<h4>Test Status</h4>
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
										<div id="InvestigationStatus" class="col-sm-12-1"
											style="margin-top: 15px;">
											<input type="radio" value="1" id="idInvestigationUrgent1"
												name="InvestigationUrgent" onclick="setUrgency(1)" /> <label
												style="margin-top: 0px;"> Routine </label> <input
												type="radio" value="2" id="idInvestigationUrgent2"
												name="InvestigationUrgent" onclick="setUrgency(2)" /> <label
												style="margin-top: 0px;"> Semi-Urgent </label> <input
												type="radio" value="3" id="idInvestigationUrgent3"
												name="InvestigationUrgent" onclick="setUrgency(3)" /> <label
												style="margin-top: 0px;"> Urgent </label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- /BOX-->
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" value="Send To RIS" class="btn btn-primary"
						onclick="sendToRis()" />
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /BODY-->
		</div>
	</div>
					
				
				<!-- ----Added by kishor for prerequisite_Pop_Up Popup ---- -->
		<div class="modal fade" id="prerequisite_Pop_Up"
			tabindex="-1" role="dialog"
			aria-labelledby="labTestModal" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered"
				role="document" style="width: 43%;">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="center">
							<b>Required Pre-requisite</b>
						</h4>
						
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
								<div class="container">
									<div class="panel panel-primary">
										<div class="panel-heading" id="divEhatContent"></div>
										<div class="panel-body">
										
											<div id="hieghtShowHide" class="form-group col-md-4" style="display: none;">
												<label for="exampleInputEmail1">Enter Height (cm):
												</label> <input type="text" id="hieghtPupUp" onkeypress="return validatePrice(event)"
													class="form-control" placeholder="Enter Height">																							</div>
											<div id="weightShowHide" class="form-group col-md-4"style="display: none;">
												<label for="exampleInputEmail1" >Enter Weight (kg):
												</label> <input type="text" id="weightPupUp" onkeypress="return validatePrice(event)"
													class="form-control" placeholder="Enter Weight">
											</div>
											<div id="urineValumeShowHide" class="form-group col-md-4" style="display: none;">
												<label for="exampleInputEmail1">Enter Urine Volume (ml):
												</label> <input type="text" id="urineValumePupUp" onkeypress="return validatePrice(event)"
													class="form-control" placeholder="Enter Urine Volume">
											</div>
											
											
											<div id="lmpDateShowHide" class="form-group col-md-4">
												<label for="exampleInputEmail1">Enter LMP Date:</label> 
												<input type="text"
														class="form-control" value=""
														class="span6 input-mini search-query" placeholder="Date"
														name="date" readonly="readonly"
														onclick="displayCalendar(document.getElementById('lmpDatePupUp'),'dd/mm/yyyy',this)"
														id="lmpDatePupUp">
												</div>
											
											
											
										</div>
									</div>
								</div>
							</div>
							<div class="row">
							<div class="pull-right" style="margin-right: 15%;">
								<button type="button" class="btn btn-success"
									onclick="SavePrerequisiteInTreatment()">Save</button>
								<button type="button" class="btn btn-danger"
									data-dismiss="modal">Close</button>
							</div>
						</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
			
				<!-- ----Added by kishor for Barcode_Pop_Up Popup ---- -->
		<div class="modal fade" id="Barcode_Pop_Up"
			tabindex="-1" role="dialog"
			aria-labelledby="labTestModal" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered"
				role="document" style="width: 20%;">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="center">
							<b>Barcode Number </b>
						</h4>
						
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
								<div class="container">
									<div class="panel panel-primary">
										<div class="panel-heading" id="divEhatContent"></div>
										<div class="panel-body">
										<input id="outlabId" type="hidden" value="0">
											<!-- <div class="form-group col-md-12">
												<label for="exampleInputEmail1">Enter Barcode Number:
												</label> <input type="text" id="txtBarcodecnt" onkeypress="return validatePrice(event)"
													class="form-control" placeholder="Enter Barcode Number">
											</div> -->
											<div class="form-group col-md-12">
												<label for="exampleInputEmail1">Enter Barcode Number:
												</label> <input type="text" id="txtBarcodecnt"
													class="form-control" placeholder="Enter Barcode Number">
											</div>
											
											
											
										</div>
									</div>
								</div>
							</div>
							<div class="row">
							<div class="pull-right" style="margin-right: 15%;">
								<button type="button" class="btn btn-success"
									onclick="setDataOfBarcodeOnPopup()">Set</button>
								<button type="button" class="btn btn-danger"
									data-dismiss="modal">Close</button>
							</div>
						</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>			
		
		<!-- Start Add sample wsie barcode pop-up -->
		<div id="sampleWiseBarcode" class="modal fade in" tabindex="-1" data-keyboard="false" data-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">
							Sample Wise Services
							<div class="pull-right" style="margin-right: 15px;">
								<button data-dismiss="modal" class="btn btn-primary btn-danger"
									onclick="closeAndResetBarcodePopup();" type="button">Close</button>
							</div>
							<div class="pull-right" style="margin-right: 15px;">
								<button class="btn btn-primary btn-success" onclick="saveSampleWiseBarcodes();"
									type="button">Save</button>
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
		
		
		//////////////////
		<!-- User Name and password for Approve Incharge -->
	<%-- <form id="myForm" name="myForm"
			action="<%=request.getContextPath()%>/UserServlet" method="post"> --%>
			
	<!-- added by Rohini: 18-jan-2024 show pop-up user name and password purpose click on discount button and this pop-up  -->
			
	<div id="userNameandpasswordPopUp" class="modal fade in" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog" style="width: 500px;">
					<div class="modal-content">
						<div class="modal-header">
							<div class="box-title">
								<h4>
									Password Verification
								</h4>
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
												<label for="exampleInputEmail1" style="color: red;">Please
													Enter User Name !!</label> <input type="text"
													id="userName" class="form-control"
													placeholder="User Name">
											</div>
										</div>

										<div class="col-xs-12 col-md-12">
											<div class="col-xs-4 col-md-12">
											<div class="divide-20"></div>
												<label for="exampleInputEmail1" style="color: red;">Please
													Enter User Password !!</label> <input type="password"
													id="userPassword" class="form-control"
													placeholder="Password">
											</div>
										</div>
										 
										<!-- /BOX-->
									</div>
								</div>
							</div>
							<!-- /BODY-->
							<div class="modal-footer">
							<input type="button" value="Submit" class="btn btn-primary"
									onclick="checkUserNameandPasswordcalDiscountPerLimit()" />
									<button type="button" class="btn btn-default"
									id="closeDispecedpopup" onclick="hideDispecedpopup1();">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
				<!-- ending of show pop-up user name and password purpose click on discount button and this pop-up  -->
			
			//////						
 
 	<input type='hidden' id="idHiddentUrgencyStatus" value='' />
 
	<!-- JAVASCRIPTS -->
	
	<!-- DATE RANGE PICKER -->
	<script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- bootstrap datepicker -->
	<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<!-- SELECT2 -->
	<script type="text/javascript" src="ehat-design/js/select2/billing_select2.js"></script>
	<!-- SELECT2 -->
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- BOOTSTRAP SWITCH -->
	<script type="text/javascript" src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
	<!-- WIZARD -->
	<script type="text/javascript" src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<!-- BOOTBOX -->
	<script type="text/javascript" src="ehat-design/js/bootbox/bootbox.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
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
		
		
	</script>
	<!-- /JAVASCRIPTS -->
	<input id="narrationBill" type="hidden" value='' />
	<input id="barcodeCondition" type="hidden" value='' />	
	<input type="hidden" id="preId"
		value=<%=request.getParameter("treatclose")%>>
	<input type="hidden" id="unitId"
		value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userId"
		value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="againstId" value="0">
	<input id="SponsorsourceTypeId" type="hidden" value="" />
	<input id="chargesSlaveId" type="hidden" value="0" />
	<input id="queryType" type="hidden" value="insert" />
	<input id="saveServiceCallFrom" type="hidden" value="N" />
	<input id="receiptSlaveId" type="hidden" value="0" />

	<input id="receiptMasterId" type="hidden" value="0" />

	<input id="recId" type="hidden" value="0" />
	<input id="callFromForSave" type="hidden" value="" />
	<input id="prevPaid" type="hidden" value="0" />

	<input id="sponsortab" type="hidden" value="" />

	<input id="chargesfromConf" type="hidden" value="0" />
	<input id="sponsortabcall" type="hidden" value="" />

	<input id="defchargesfromConf" type="hidden" value="0" />

	<input id="iscombination" type="hidden" value="N" />

	<input id="iscombinationsponsor" type="hidden" value="N" />


	<input id="otherBillDetailsIdOpd" type="hidden" value="0" />
	<input id="childsubServiceID" type="hidden" value="0" />
	<input id="billDetailsIdOPD" type="hidden" value="0" />

	<input id="subServiceIdOPD" type="hidden" value="0" />
	<input id="servIdPackageOPD" type="hidden" value="0" />


	<input id="drid" type="hidden" value="0" style="display: none;" />

	<input id="ptName" type="hidden" value="0" />
	<input id="OpdIpdNo" type="hidden" value="0" />
	<input id="categoryids" type="hidden" value="0">

	<input id="receiptOf" type="hidden" value="general" />

	<input id="toDateopd" type="hidden" value="0" />

	<input id="receiptEditSponsor" type="hidden" value="0" />

	<input id="amountpack" type="hidden" value="0" />
	<input id="concessionpack" type="hidden" value="0" />

	<input id="callFrompackagebilling" type="hidden" value="general" />

	<input id="callFromforsavebutton" type="hidden" value="general" />

	<input id="rategeneralopd" type="hidden" value="0" />

	<input id="selfid" type="hidden" value="0" />
	<input id="counterOpdCghs" type="hidden" value="0" />
	<input id="editHidden" type="hidden" value=0 />
	<input id="editHiddenR" type="hidden" value=0 />
	<input id="genInvoiceFlag" type="hidden" value=0 />

	<input id="inputAuto" type="hidden" value="-" />

	<!-- For Profees fees Added by Bilal on receipt edit -->


	<input id="narration" type="hidden" value='' />

	<input id="deletenarration" type="hidden" value='delete' />

	<input id="sponsorid2" type="hidden" value='0' />
	<input id="chargesSlaveId2" type="hidden" value='0' />

	<input id="pendingFlag" type="hidden" value='N' />
	<input id="pendingTreatId" type="hidden" value='0' />

	<input id="deptId" type="hidden" value='0' />
	<input id="pharmacyInvoice" type="hidden" value="<%=pharmacyInvoice%>" />
	<input id="pharmacyServId" type="hidden" value="<%=pharmacyServId%>" />
	<input id="multipleSponsor" type="hidden" value="<%=multipleSponsor%>" />
	<%
		String uiM="";
		if(uiModeSetting.contains("on")){
			
			uiM = "P";
		}else{
			
			uiM = "S";
		}
	%>

	<input id="uiMode" type="hidden" value='<%=uiM%>' />
	<input id="concessionFlow" type="hidden" value="<%=concessionFlow%>" />

	<input id="discountFlag" type="hidden" value='0' />

	<input id="sendToRisId" type="hidden" value='N' />
	<!-- For Profees fees Added by Bilal on receipt edit -->

	<!-- //tk -->
	<table id='tkt' class='table table-hover' style="display: none;">
		<tbody id="tkb">
		</tbody>
	</table>
	<table id='tktR' class='table table-hover' style="display: none;">
		<tbody id="tkbR">
		</tbody>
	</table>
      <!-- start loader -->
      <!-- <div class="col-md-12 container-fluid" id="primeLoader" style="display:none;z-index:9999;height:100vh;background-color:rgba(13,13,13,0.3);position:absolute;">
                <div class="col-md-offset-5 col-md-1" style="overflow: hidden;border-radius:25%;top:30%;background-color:#eee;padding:0;">

                    <img src="images/3.gif" style="top:0;left:0" width="125" height="100">          
                </div>
</div> -->
      <!--End Loader  -->

	<input type="hidden" id="billPrefix" value="">
	<input type="hidden" id="billMiddle" value="">
	<input type="hidden" id="billSufix" value="">

	<input type="hidden" id="patPrefix" value="">
	<input type="hidden" id="patMiddle" value="">
	<input type="hidden" id="patSufix" value="">

	<input type="hidden" id="recPrefix" value="">
	<input type="hidden" id="recMiddle" value="">
	<input type="hidden" id="recSufix" value="">


	<input type="hidden" id="slaveId" value="">
	<input type="hidden" id="recId" value="">

	<!--current_date Added By Tarique  todays_date-->
	<input type="hidden" id="todayDateForempr" value="<%=current_date%>">
	<input type="hidden" id="sndtolabflag" value='N'>
	<input id="idForDisc" type="hidden" />

	<input id="paidByCashFlag" type="hidden" value='N' />
	<input id="paidByCashServices" type="hidden" value='0' />
	<input type="hidden" id="meeshaFlow" value='<%=meeshaFlow%>'>
	
	<input type="hidden" id="hospitalName" value='<%=hospitalName%>'>

	<input type="hidden" id="disCountLimit1">	
	<input type="hidden" id="disCountLimitType">
	<input type="hidden" id="disCount" value='N'>	
	<input type="hidden" id="inOutHouseCount" value="0">
	<input type="hidden" id="histopathLab" value="N">	
	<input type="hidden" value="N" id="templateWiseTestFlag"/>
	<input type="hidden" id="sponsorTestCharges" value="0">
	<input type="hidden" id="yearWiseSponsorTestCharges" value="0">	
	<input type="hidden" id="packageID" value="<%=packageID%>">
	<input type="hidden" id="defaultPkgFlag" value="0">
 <input type="hidden" id="sendTestFlagMeesha" value="<%=sendTestFlagMeesha%>">
 <input type="hidden" id="isMultiple" name="isMultiple" value="NA">
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
</body>
</html>