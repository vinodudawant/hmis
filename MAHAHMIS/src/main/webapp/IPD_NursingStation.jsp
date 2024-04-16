
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>IPD Nursing Station</title>
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

<!-- Auto Suggestion response -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<!-- JQUERY Auto Suggestion Request -->
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
	
<!--Added by Pooja for alertify plugins  -->
<link rel="stylesheet" type="text/css"
    href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
    href="ehat-design/alertify/alertify.default.css" />
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!--End By Pooja -->

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

<!-- added by vishant for table column freeze -->
<script type="text/javascript" src="jquery/freeze-table.js"></script>
<script type="text/javascript" src="jquery/freeze-table.min.js"></script>
<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<style type="text/css">
.custom-date-style {
	background-color: red !important;
}
</style>
<!--TIMEPEACKER -->

<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/pop_up.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/pharma_patient.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/report.js"></script>
<script type="text/javascript" src="js/ipdTreatmentcmcc.js"></script>
<script type="text/javascript" src="js/ipd_nursing_transaction.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ehat_PatientChemo.js"></script>
<script type="text/javascript" src="js/ehat_OPDDoctorsDesk.js"></script>
<!-- <script type="text/javascript" src="js/operation.js"></script> -->
<script type="text/javascript" src="js/studyChart/exporting.js"></script>
<script type="text/javascript" src="js/studyChart/highcharts.js"></script>
<script type="text/javascript" src="js/studyChart/studyChart.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/emergencyChargesOpd.js"></script>
<script type="text/javascript" src="js/Channeling.js"></script>
<script type="text/javascript" src="js/ipd_nurshing_station.js"></script>
 <script type="text/javascript" src="js/ipd_nursing_transactionNEW.js"></script>
 <script type="text/javascript" src="js/nursingStationDocument.js"></script> <!-- add by rahul -->

<!-- Auto-Suggestion 8/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<script src="js/script.js"></script>
<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
	
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>	
<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>	
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_alternate_product.js"/>"></script>	
	<script src="jquery/jquery.ajaxfileupload.js" ></script>	

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script lang="Javascript">
$(document).click(function() {
	
	$('input[type="file"]').ajaxfileupload({
		'action' : 'UploadFileServlet',
	});
});
</script>

<style type="text/css">
.table-fixed thead {
	width: 300%;
}

.table-fixed tbody {
	height: 330px;
	overflow-y: auto;
	width: 300%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 30px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>

<script type="text/javascript">
	onload = function() {
		getPatientInfoOnNurshing(<%=request.getParameter("treatmentId")%>); //Added by sagar 
		  getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		  //Added By Pooja
		  getPatientBedHall(<%=request.getParameter("treatmentId")%>);
		  setTimeout(function() {
			getDoctornameForCommonTemp2();   //Added by sagar
				    fillDrugChart(todays_date);
					 

				},500);
			
			var preTreat = $("#preTreat").val();
			if(preTreat=="Y"){
				$("#saveBtn").hide();
				$("#iPackage").hide();
				$("#saveIPDServNusring").hide();
				$("#ipdPrintBtn").hide();
				$("#addDivNC").hide();
				$("#remDivNC").hide();
				$("#ipdPrintBtn").attr("disabled","disabled");
				$("#deleteIPDServicesLabel").attr("disabled","disabled");
				$('#docDispTable').find('.deleteBtn').removeAttr("onclick");
				$('#Upload_Document').find('input, button, select').attr('disabled', 'disabled');
				$('#prevtr').val("previousTreatmentOPDER");
				$("#INDENT *").prop('disabled',true);
				$('#tempdissum').removeAttr("class");
                $("#tempdissum").css('display','none');
				$('#bed').removeAttr("class");
                $("#bed").css('display','none');
                $('#autodissum').removeAttr("class");
                $("#autodissum").css('display','none');
                $('#disinv').removeAttr("class");
                $("#disinv").css('display','none');
                $('#pharmacyConsumptionIndent').removeAttr("class");
                $("#pharmacyConsumptionIndent").css('display','none');
                
                }
		var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
		}
		//onload for IPD_DIC
		var todays_date = $("#todays_date").val();
		/* 30-12-2014 */
		var dateSplit = todays_date.split('-');
		getIndentTemplateDetails('indent');
		/* 30/12/2014 */
		todays_date = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
		$("#date-pick").val(todays_date);
		$("#date-pickDrug").val(todays_date);
		$("#date-pick1").val(todays_date);
		$("#fromDate").val(todays_date);
		$("#toDate").val(todays_date);
		$("#date-pickForChemo").val(todays_date);
		$("#popup_container2").val(		dateSplit[0] + "-" + dateSplit[1] + "-" + dateSplit[2]);
		//getStoreDetails();//committed by dayanand
		$("#nurcha1").css('background-color', 'Yellow  ');
		$("#chart").val("select");
		shortcut.add("Alt+a", function() {
			showAlternateProduct();
		});
		
getNurchingChartDetails();//for getting nurshing chart list
	setTimeout(function() {
		//fillDIC(todays_date);//committed by dayanand
	  });
		
		shortcut.add("Alt+a", function() {
			showAlternateProduct();
		});
		new JsDatePick({
			useMode : 2,
			target : "txtMRNDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});
		
		//added By Tarique Aalam
		getDayOfWeek2();
		fetchHospitalHolidayEmrPer('onload');
		EmerChrAccordingToTimeOpd();
		hideDataForPreviousTreatment();
	};
	
	function showAlternateProduct() {
		searchAlternateProduct($("#hiddenProductId").val(), $("#indentProductName").val());
		$("#alternate_product_popUp_form").modal("show");
	}

	function getStoreDetails() {

		var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				storeName : 'IPD'
			},
			//url : "/EhatEnterprise/pharmacy/mrn/getStoreDetailsByStoreName",
			//url : "/EhatEnterprise/pharmacy/store/SubStoreList",
			url : "./pharmacy/store/SubStoreList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				//var parseData = jQuery.parseJSON(r);
				setIndentStoreDropDown(r);

			}
		});
	}

	function setIndentStoreDropDown(r) {
		var content = "";
		for ( var i = 0; i < r.lstSubStore.length; i++) {
			content = content+ "<option value='"+r.lstSubStore[i].storeId+"'>"
					+ r.lstSubStore[i].storeName + "</option>";
		}
		$("#pharmaStoreId").append(content);
	}

	function loadIndentPopUp() {
		if ($('#stockSelection').is(":checked")) {
			$('#Po_Pop_Up').modal('show');
			$('#orderFormContent1').html("");
		}
	};
	
	function clearData(type) {
		if(type == "Bed_Side"){
			$("#txtEqNameg1").val("");
			$("#txtEqQtyg1").val("");
			$("#txtEqNamei1").val("");
			$("#txtEqQtyi1").val("");
		}else if(type == "Gases"){
			$("#txtEqNameb1").val("");
			$("#txtEqQtyb1").val("");
			$("#txtEqNamei1").val("");
			$("#txtEqQtyi1").val("");
		}else{
			$("#txtEqNameb1").val("");
			$("#txtEqQtyb1").val("");
			$("#txtEqNameg1").val("");
			$("#txtEqQtyg1").val("");
			$("#txtEqQtyi1").val("");
		}
	};

	
</script>

<script type="text/javascript">
	function chkUnchkChkBox(chkCount) {
		var servicesListLength = $("#servicesListLength").val();
		for ( var i = 0; i < servicesListLength; i++) {
			if (i == chkCount)
				continue;

			var id1 = 'checkbox_' + i;
			$('#' + id1).prop('checked', false);
		}
	}

	$('#t1').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	$('#timeTo').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	$('#datetimepicker2').datetimepicker({
		yearOffset : 222,
		lang : 'ch',
		timepicker : false,
		format : 'd/m/Y',
		formatDate : 'Y/m/d',
		minDate : '-1970/01/02', // yesterday is minimum date
		maxDate : '+1970/01/02' // and tommorow is maximum date calendar
	});

	
		
</script>
</head>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date1 = formatter1.format(currentDate.getTime());
	
	ResourceBundle resourceBundleEhat1 = ResourceBundle.getBundle("OT_Service");
	int BedsideProcedure = Integer.parseInt(resourceBundleEhat1.getObject("BedsideProcedure").toString());
	int GasesAndMonitors = Integer.parseInt(resourceBundleEhat1.getObject("GasesAndMonitors").toString());
	int InstrumentsAndEquipments = Integer.parseInt(resourceBundleEhat1.getObject("InstrumentsAndEquipments").toString());
	int BedsideProcedure1 = Integer.parseInt(resourceBundleEhat1.getObject("BedsideProcedure").toString());
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String cancerOnOff = resourceBundleEha.getObject("cancerOnOff").toString();
	

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
					<%@include file="PharmacyIndentPopUp.jsp"%>
					
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_IPD.jsp"%>
				<!--End Left Menu -->

				<input type="hidden" id="todays_date" value="<%=todays_date%>" />

				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Start Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li>Nursing Station</li>
												<li><a href="IPD_NursingStation.jsp">Transaction</a></li>
												
												<li>
													<label class="checkbox-inline">Emergency Charge
														<input onclick="setBoxIpdServise();" type="checkbox" value="N" id="emrChrFlag">   
													</label>	
													 <label class="text-inline" id="perBox"> 
													<input type="text" value="0" name="emrPer" id="emrPer" 
													style="display: none;height:23px;width:54px;" 
													onkeyup="calculateEmerChrForIpdServices()" onkeypress="return validateNumPer2(event)"> 
													</label> 
													
										 		</li>
												<div class="li pull-right">
													<button class="btn btn-xs btn-warning"
														data-toggle="tooltip" data-placement="left" title="Print"
														onclick="showPrintPopup();">
														<i class="fa fa-print"></i>
													</button>
												</div>
											</ul>
										</div>
									</div>
						
						<div class="alert alert-block alert-info fade in col-md-12-1"style="padding-block-end:5%; padding-top:3%;margin-top:-29px;">
						
							<div class="row">
								<div class="col-md-1"style="margin-top:-30px;">
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
											<input type='hidden' value='0' id='intensvisitId2' />
											<input type='hidden' value='0' id='postOperationId2' />
											<input type="hidden" id="editIPDService" value="0" />
											<input type="hidden" id="strengthName" value="" />
											<input type="hidden" id="routeName" value="" />
												
												 <label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>
												 <label id="centerPatientId" class="control-label" ></label>  
												 <label id="patientId" class="control-label" style=" display: none"></label>
         										 <input type="hidden"  id="documentId" value="0">
											</div>
										</div>
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label id="patientName" class="control-label"></label>

											</div>
										</div>
										
										<div  class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentid" class="control-label"> <%=request.getParameter("treatmentId")%></label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Ipd No :</label> <label id="ipdNo" class="control-label"> IPD-D</label>

											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
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
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">BillNo: </label>  <label id="billNo" class="control-label"></label> 

											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
											<input type="hidden"  id="dtofadmission" value="0">
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

										 <div class="col-md-3" style="width: 22%">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall :</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                        </div>
                                        <div class="col-md-6" >
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>

											</div>
										</div>	
										
									</div>
								</div>
							</div>
						</div>
									<input type="hidden" value="${sessionScope.userId}"
										id="txtUserId" /> <input type="hidden"
										value="${sessionScope.userName}" id="txtUserName" />
								</div>
								<!-- End Page Date Print Discards-->

								<div class="divide-40"></div>

								<!-- Start Tab UI -->
								<div class="col-md-12-1">
									<!-- Start BOX -->
									<div class="box border col-md-12-1">
										<div class="divide-10"></div>
										<div class="tabbable col-md-12-1">
											<ul class="nav nav-tabs">
												<li class="active" ><a data-toggle="tab" 
													href="#IPD_Nursing_Chart"><i class="fa fa-table"></i> <span
														class="hidden-inline-mobile">IPD Nursing Chart</span></a></li>
												
												<li><a data-toggle="tab" href="#IPD_Services" onclick="fetchIpdServicesOnNurshing(6)" ><i
														class="fa fa-wheelchair"></i> <span class="hidden-inline-mobile">IPD
															Services</span></a></li>
												<li><a data-toggle="tab" href="#INDENT"><i
														class="fa fa-medkit"></i> <span class="hidden-inline-mobile" onclick="toCreateManualIndent();">Indent</span></a></li>
												<li><a data-toggle="tab" href="#DrugAdminSheet"  onclick="setDrugTempSheet()"><i
														class="fa fa-file-text-o"></i> <span class="hidden-inline-mobile">Drug Administration Sheet</span></a></li>
                                               
                                             
                                                <li><a data-toggle="tab" href="#Upload_Document" onclick="getNursingDocument()"><span
                                                            class="hidden-inline-mobile">Upload Document</span></a></li>
                                                            
                                                 <%
                                                 	if(cancerOnOff.equalsIgnoreCase("on")){
                                                 		%>
                                                 		<li><a data-toggle="tab" href="#PrePostChecklist" onclick = "fetchPrePostChecklistnew()"><i class="fa fa-file-text-o"></i>
                                                        <span class="hidden-inline-mobile">Pre Post Checklist</span></a></li>
                                                 		<li ><a href="#IPD_Monitoring_Sheet" data-toggle="tab" onclick="fetchDataForSheets('sheet1'),getIpdVitalList()" ><i class="fa fa-table"></i>
    													<span class="hidden-inline-mobile">Monitoring Sheet(day-wise)</span></a></li>
    													
    													<li><a data-toggle="tab" href="#NursingIntialAssessmentOneDay" onclick = "fetchInitalNursingAssessmentOneDay()"><i
                                                        class="fa fa-file-text-o"></i> <span
                                                        class="hidden-inline-mobile">Initial Nursing Assessment- One Day</span></a></li> 
                                                <li><a data-toggle="tab"
                                                    href="#IPD_Initial_Nursing_Assess" onclick = "fetchNursingAssesment1()"><i class="fa fa-table"></i> <span
                                                        class="hidden-inline-mobile">Initial Nursing Assessment</span></a></li>    
                                                <li><a data-toggle="tab" href="#NursingIntialAssessment" onclick = "fetchInitalNursingAssessment()"><i
                                                        class="fa fa-file-text-o"></i> <span
                                                        class="hidden-inline-mobile">Nursing Initial Assessment- Paediatric</span></a></li>
                                                 	 <li><a data-toggle="tab" href="#ChemoOrderSheet" onclick="fetchChemoDetailSOnNurshing()"><i
                                                        class="fa fa-file-text-o"></i> <span class="hidden-inline-mobile">Chemo Medicine Order Sheet</span></a></li>	
                                                 <%	}
                                                 %>
											
											<li><a data-toggle="tab" id="carePlanli" href="#CarePlan"><i
														class="fa fa-file-text-o"></i> <span class="hidden-inline-mobile" onclick="fetchNurshingCarePlan()">Care Plan</span></a></li>
											<li  onclick="getNurshingPainScale()" ><a data-toggle="tab" id="painScale" href="#PainScale"><i
														class="fa fa-file-text-o"></i> <span class="hidden-inline-mobile">Pain Scale</span></a></li>	
											
											</ul>
											<div class="divide-10"></div>
											<div id="ipdNursingStationJSPHeadDiv" class="tab-content">


<div id="NursingIntialAssessmentOneDay" class="tab-pane fade in">
													<div class="tabbable tabs-left col-md-12-1"
														style="margin-top: 0px; margin-left: 10px;">
															<ul id="NursingVerticalTabOneDay" class="nav nav-tabs"
															style="height: 150px;">
															<li><a href="NursingAssessmentForOneDay"
																data-toggle="tab">Page 1</a></li>
															
														</ul>
															<div class="tab-content">							
															<div id="NursingAssessmentForOneDay"
																class="tab-pane active fade in col-md-10">
																<table class="table table-bordered table-condensed header-fixed" >
																<tbody>
																<h6 style ="margin-left: 300px;"><b>One Day Initial Nursing Assessment & Reassessment</b></h6>
																<input type="button" style="margin-left:865px;" class="btn btn-xs btn-success" value="Save" id="saveOneDayId" onclick="saveNursingOneDay()">
																<tr>
																<td>(to be completed within 30 minutes of admission) Check all that apply</td>
																<td>Date:<input type="text" id="date-pickForOneDay" name="date-pickMaterials"onclick="displayCalendar(document.getElementById('date-pickForOneDay'),'dd/mm/yyyy',this)"readonly="readonly" /></td>
																<td>Time:<input type="text" id="TimeForOneDay"readonly="readonly" /></td>
																</tr>
																<tr>
																<td><input type="checkbox" id="chkIdBandOneDay">ID Band On &nbsp; &nbsp;<input type="checkbox" id="chkCallBell">Call Bell in reach &nbsp; &nbsp;<br>HT:<input type="text" id="txtHt"/>WT:<input type="text" id="txtWt"/><br>
																Mode:&nbsp; &nbsp;&nbsp; &nbsp;<input type="radio" name = "ModeOneDay" id="radioAmbulatoryOneDay"value ="ambulatoryOneDay">Ambulatory<input type="radio" name = "ModeOneDay" id="radioWheelOneDay" value ="wheelChairOneDay">Wheel Chair<input type="radio" name = "ModeOneDay" id="radioStrecherOneDay" value ="strecherOneDay">Strecher<br>
																Admitted As:&nbsp; &nbsp;&nbsp; &nbsp;<input type="radio" name = "AdmittedOneDay" id="radioEmergencyOneDay"value ="EmergencyOneDay">Emergency<input type="radio" name = "AdmittedOneDay" id="radioRegularAdmissionOneDay" value ="regularAdmissionOneDay">Regular Admission</td>
																<td colspan="2">INFORMATION OBTAINED FROM:<input type="radio" name = "infromationOneDay" id="radioPatientOneDay"value ="PatientOneDay">Patient<input type="radio" name = "infromationOneDay" id="radioFamilyOneDay" value ="FamilyOneDay">Family<input type="radio" name = "infromationOneDay" id="radioOldChartOneDay" value ="OldChartOneDay">Old Chart<input type="radio" name = "infromationOneDay" id="radioOtherOneDay" value ="OtherOneDay">Other<input type="radio" name = "infromationOneDay" id="radioInfoFamilyOneDay" value ="ConsentInfoOneDay">Consent given to obtain information from family<br>WHOM TO CALL IN AN EMERGENCY:<textarea Style="max-height: 40px;" id="txtAreaEmergencyCallOneDay"></textarea></td>
																</tr>
																<tr>
																<td><table class="table table-bordered table-condensed header-fixed" ><tbody><tr><td>Temprature:<input type="text" id="TempratureOneDay"class="form-control input-SmallText"/>*F&nbsp;&nbsp;</td><td>Pulse:<input type="text" id="PulseOneDay"class="form-control input-SmallText"/>/min&nbsp;&nbsp;</td><td>RR:<input type="text" id="RROneDay"class="form-control input-SmallText"/>/min&nbsp;&nbsp;</td><td>SpO2:<input type="text" id="SpO2OneDay"class="form-control input-SmallText" />%&nbsp;&nbsp;</td><td>BP:<input type="text" id="BloodpOneDay"class="form-control input-SmallText"/>/mg of Hg&nbsp;&nbsp;</td></tr></tbody></table></td>
																<td colspan="2">ADMITTING DIAGNOSIS:<input type="text" id="txtAdmittingOneDay"/><br>PATIENT'S CHIEF COMPLAINTS & DURATION:<input type="text" id="txtCheifComplainOneDay"/><br>Allergies:<input type="radio" name = "AllergiesOneDay" id="radioDrugOneDay"value ="DrugsOneDay">Drugs<input type="radio" name = "AllergiesOneDay" id="radioFoodOneDay"value ="FoodOneDay">Food<input type="radio" name = "AllergiesOneDay" id="radioOtherAllergiesOneDay"value ="OtherAllergiesOneDay">Other</td>
																</tr>
																<tr>
																<table class="table table-bordered table-condensed header-fixed "style="margin-top:-21px;" ><tbody><caption><h6><b>Vulnerability Assessement</b></h6></caption><th class="col-md-1-1">Sr. No.</th><th class="col-md-2-1">Category</th><th class="col-md-1-1">Yes</th><th class="col-md-2-1">Care to be Taken</th><th class="col-md-2-1">Yes</th><tr><td>1</td><td>Age more than 65 years</td><td><input type="checkbox" id="cateOneDay1"class="form-control input-SmallText col-md-1-1"/></td><td>Side rails provision</td><td><input type="checkbox" id="careOneDay1"class="form-control input-SmallText col-md-1-1"/></td></tr><tr><td>2</td><td>Physically Challenged</td><td><input type="checkbox" id="cateOneDay2"class="form-control input-SmallText col-md-1-1"/></td><td>Low height bed</td><td><input type="checkbox" id="careOneDay2"class="form-control input-SmallText col-md-1-1"/></td></tr><tr><td>3</td><td>Mentally Challenged/Mentally ill</td><td><input type="checkbox" id="cateOneDay3"class="form-control input-SmallText col-md-1-1"/></td><td>Nearer to Nursing Station</td><td><input type="checkbox" id="careOneDay3"class="form-control input-SmallText col-md-1-1"/></td></tr><tr><td>4</td><td>Terminally ill</td><td><input type="checkbox" id="cateOneDay4"class="form-control input-SmallText col-md-1-1"/></td><td>Continous Monitoring</td><td><input type="checkbox" id="careOneDay4"class="form-control input-SmallText col-md-1-1"/></td></tr><tr><td>5</td><td>Absence of Relative</td><td><input type="checkbox" id="cateOneDay5"class="form-control input-SmallText col-md-1-1"/></td><td>Full Time Attedndent</td><td><input type="checkbox" id="careOneDay5"class="form-control input-SmallText col-md-1-1"/></td></tr></tbody></table>
																</tr>
																<tr>
																<td colspan ="2">
																<b>Vulnerability level (check whichever is applicable)</b><br>
																<input type="radio" name = "VulnerabilityLevelOneDay" id="radioHighOneDay"value ="HighOneDay"><b>High</b> (if>"1" category or factor is marked "yes")
																<input type="radio" name = "VulnerabilityLevelOneDay" id="radioLowOneDay"value ="LowOneDay"><b>Low</b> (if"1" category or factor is marked "yes")
																</td>
																</tr>
																<tr>
																<table class="table table-bordered table-condensed header-fixed " >
																<tbody>
																<tr>
																<td style="width:200px;">
																<b>Pain Assessment</b> (Wong Baker Pain Scale)<br>
																<img style="margin-top: 45px; height: 230px; width: 410px;" src="images/pain.jpg"><br>
																Pain Scale:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" style="margin-top: 25px;" onkeypress="return validateNumbers(event)" id="idPainScaleOneDay">
																</td>
																<td>
																<b>Assessment of IV</b> (Cannula Insertion) <b>SITE</b>
																<table class="table table-bordered table-condensed header-fixed " >
																<tbody>
																<tr>
																<td>
																Date:
																<input type="text" id="date-pickForIvAssessmentOneDay" name="date-pickMaterials"onclick="displayCalendar(document.getElementById('date-pickForIvAssessmentOneDay'),'dd/mm/yyyy',this)"readonly="readonly" />
																</td>
																<td>
																Gauge:
																<input type="text" id="guageOneDay"/>
																</td>
																</tr>
																<tr>
																<td colspan="2">
																Part/Central Line/Venflon:
																<input type="text" id="VenflonOneDay"/>
																</td>
																</tr>
																<tr>
																<td>
																Change on:
																<input type="text" id="ChangeOnOneDay"/>
																</td>
																<td>
																Site:
																<input type="text" id="SiteOneDay"/>
																</td>
																</tr>
																<tr>
																<table class="table table-bordered table-condensed header-fixed " >
																<tbody>
																<tr>
																<td style="width:150px;">
																Time:
																</td>
																<td>
																<input type="text" style="width:60px;" id="Time01OneDay" readonly="readonly"/>
																</td>
																<td>
																<input type="text" style="width:60px;" id="Time02OneDay" readonly="readonly"/>
																</td>
																<td>
																<input type="text" style="width:60px;" id="Time03OneDay" readonly="readonly"/>
																</td>
																</tr>
																<tr>
																<table class="table table-bordered table-condensed header-fixed " >
																<tbody>
																<tr>
																<td style="width:150px;">
																Observation:
																</td>
																<td>
																Yes
																</td>
																<td>
																No
																</td>
																<td>
																Yes
																</td>
																<td>
																No
																</td>
																<td>
																Yes
																</td>
																<td>
																No
																</td>
																</tr>
																<tr>
																<td>
																1.Infiltration
																</td>
																<td>
																<input type="checkbox" id="Infiltration01OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Infiltration02OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Infiltration03OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Infiltration04OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Infiltration05OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Infiltration06OneDay"/>
																</td>
																</tr>
																<tr>
																<td>
																2.Swelling
																</td>
																<td>
																<input type="checkbox" id="Swelling01OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Swelling02OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Swelling03OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Swelling04OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Swelling05OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Swelling06OneDay"/>
																</td>
																</tr>
																<tr>
																<td>
																3.Redness
																</td>
																<td>
																<input type="checkbox" id="Redness01OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Redness02OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Redness03OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Redness04OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Redness05OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Redness06OneDay"/>
																</td>
																</tr>
																<tr>
																<td>
																4.Pain
																</td>
																<td>
																<input type="checkbox" id="Pain01OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Pain02OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Pain03OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Pain04OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Pain05OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Pain06OneDay"/>
																</td>
																</tr>
																<tr>
																<td>
																5.Thrombophlebitis
																</td>
																<td>
																<input type="checkbox" id="Thrombophlebitis1OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Thrombophlebitis2OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Thrombophlebitis3OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Thrombophlebitis4OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Thrombophlebitis5OneDay"/>
																</td>
																<td>
																<input type="checkbox" id="Thrombophlebitis6OneDay"/>
																</td>
																</tr>
																</tbody>
																</table>
																</tr>
																<td colspan="2">
																<b>INTAKE OUTPUT CHART</b>
																</td>
																<tr>
																<td colspan="2">
																<table class="table table-bordered table-condensed header-fixed " >
																<td>
																Time
																</td>
																<td>
																IV-FLUID
																</td>
																<td>
																AMOUNT (in/ml)
																</td>
																<td>
																URINE OUTPUT
																</td>
																<td>
																	<button class="btn btn-xs " onclick="toCreateRowOT()" title="Add" data-toggle="tooltip" style="background-color: #d9d9d9;">
																		<i class="fa fa-plus"></i>
																	</button>
																	<button class="btn btn-xs " onclick="toRemoveRowOT()" title="Remove" data-toggle="tooltip" style="background-color: #d9d9d9;">
																		<i class="fa fa-minus"></i>
																	</button>
																	<input id="OtRow" type="hidden" value="0">
																	<input type="hidden" id="RowCountOt" value="0" />
                                                    				<input type="hidden" id="addRowCountOt" value="0" />
																</td>
															
																<tbody id="nursingOtBody"></tbody>
																</table>
																</td>
																</tr>
																
																<td colspan="2">
																<b>NURSING RE ASSESSMENT OF VITAL SIGNS EVERY 3 HRS</b>
																</td>
																<tr>
																<td colspan="2">
																<table class="table table-bordered table-condensed header-fixed " >
																<td>
																Time
																</td>
																<td>
																Temp (*F)
																</td>
																<td>
																Pulse (/min)
																</td>
																<td>
																R.R (/min)
																</td>
																<td>
																B.P.(mm/Hg)
																</td>
																<td>
																Pain (0-10)
																</td>
																<td style="width:70px; ">
																	<button class="btn btn-xs " style="background-color: #d9d9d9;" data-toggle="tooltip" title="Add" onclick="toCreateRowNRA()">
																		<i class="fa fa-plus"></i></button>
																	<button class="btn btn-xs " style="background-color: #d9d9d9;" data-toggle="tooltip" title="Minus" onclick="toRemoveRowNRA()">
																		<i class="fa fa-minus"></i></button>																			
 																		<input id="reAssessmentRow" type="hidden" value="0">
																	<input id="addRowCountReAssessment" type="hidden" value="0">
																</td>
															
																<tbody id="nursingReAssessmentTBody"></tbody>
																</table>
																</td>
																</tr>
																</tbody>
																</table>
																</tr>
																</tbody>
																</table>
																</td>
																</tr>
																</tbody>
																</table>
																</tr><tr><td><b>Nursing Care Plan</b></td></tr><tr><table class="table table-bordered table-condensed header-fixed " ><tbody><tr><th>Shift</th><th>Assessment</th><th>Nursing Diagnosis</th><th>Planning</th><th>Intervention</th><th>Evaluation</th></tr><tr><td>Morning</td><td><input type="text"   id="Assessment01OneDay"/></td><td><input type="text"   id="Diagnosis01OneDay"/></td><td><input type="text"   id="Planning01OneDay"/></td><td><input type="text" id="Intervention01OneDay"/></td><td><input type="text" id="Evaluation01OneDay"/></td></tr><tr><td>Evening</td><td><input type="text"   id="Assessment02OneDay"/></td><td><input type="text"   id="Diagnosis02OneDay"/></td><td><input type="text"   id="Planning02OneDay"/></td><td><input type="text"   id="Intervention02OneDay"/></td><td><input type="text"   id="Evaluation02OneDay"/></td></tr><tr><td>Noon</td><td><input type="text" id="Assessment03OneDay"/></td><td><input type="text" id="Diagnosis03OneDay"/></td><td><input type="text" id="Planning03OneDay"/></td><td><input type="text"   id="Intervention03OneDay"/></td><td><input type="text" id="Evaluation03OneDay"/></td></tr><tr><td><input type="text" id="Shift004OneDay"/></td><td><input type="text" id="Assessment04OneDay"/></td><td><input type="text"   id="Diagnosis04OneDay"/></td><td><input type="text"   id="Planning04OneDay"/></td><td><input type="text"   id="Intervention04OneDay"/></td><td><input type="text"   id="Evaluation04OneDay"/></td></tr></tbody></table></tr>
																</tbody>
																</table>
																
															</div>
															</div>
															</div>
															</div>


<div id="IPD_Initial_Nursing_Assess" class="tab-pane fade in">
													<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 10px;">
														<ul id="ipdInitialAssessmentTab" class="nav nav-tabs"
															style="height: 150px;">
															<li class="active"><a data-toggle="tab" 
																 href="#Assessment_Sheet1" onclick="fetchNursingAssesmentnew1()">Page 1</a></li>
															<li><a data-toggle="tab"
																 href="#Assessment_Sheet2" onclick="fetchNursingAssesmentnew2()">Page 2</a></li>
															<li><a data-toggle="tab"
																 href="#Assessment_Sheet3" onclick="fetchNursingAssesment34()">Page 3 </a></li>
															<li><a data-toggle="tab" onclick="fetchDataForSheets('page4')"
																 href="#Assessment_Sheet4">Page 4 </a></li>
														</ul>

														<div class="tab-content col-md-10-1" style="margin-top: 15px;">
															<div id="Assessment_Sheet1" class="tab-pane active fade in col-md-12">
																<div class="divide-10"></div>
																<div class="col-md-12" >
																	<table style="margin-top:-21px;"  class="table table-bordered table-condensed header-fixed ">
																		<caption><h6><b>Check all that apply </b></h6></caption>
																		<div>
																			<input id="saveButton" class="btn btn-xs btn-success editUserAccess pull-right" type="button" style="margin-right:-75px;" value="Save" onclick="saveNursingAssesmentnew()">
																		</div>
																		<tbody class='cf'>
																			<tr><td style='width:60%;'>ID Band on: <input type="checkbox" id="idBandYes" >Yes<input type="checkbox" id="idBandNo">No<br>
																					Call Bell in reach:<input type="checkbox" id="idCallYes" >Yes<input type="checkbox" id="idCallNo" >No<br>
																					HT<input type="text" id="idHt" onkeypress="return validateNumbers(event)">WT<input type="text" id="idWt" onkeypress="return validateNumbers(event)"><br>
																					Mode:<input type="checkbox" id="idAmbulatory" value="1">Ambulatory<input type="checkbox" id="idStrecher" value="2">Strecher<input type="checkbox" id="idWheelchair" value="3">Wheel Chair<br>
																					Admitted As:<input type="checkbox" id="idEmer" value="1">Emergency<input type="checkbox" id="idReg" value="0">Regular Admission</td>
																					
																				<td style='width:50%;'><b>INFORMATION OBTAINED FROM</b><br>
																					<input type="checkbox" id="idInfoPat">Patient<input type="checkbox" id="idInfoFam">Family<input type="checkbox" id="idInfoOld">Old Chart<input type="checkbox" id="idInfoOther">Other<br>
																					<input type="checkbox" id="idInfoConsent">Consent given to obtain information from family<br>
																					WHOM TO CALL IN AN EMERGENCY<br>
																					<input type="text" width="80px;" id="idRalation"></td></tr>
																				
																			<tr><td style='width:60%;'><b>VITAL SIGNS</b><br>
																					T<input type="text" id="idT">F   P<input type="text" id="idP">/min   
																					R<input type="text" id="idR">/min 
																					<br>  BP:<input type="text" id="idBP1">/<input type="text" id="idBP2"> mm of Hg:    SPO2:<input type="text" id="idSP">%</td>
																				<td style='width:50%;'> Admitting Diagnosis :<br><textarea style="width: 333px; height: 38px;" id="idAdmitDia"></textarea></td></tr>
																			<tr><td style='width:60%;'>ALLERGIES :<br><input type="checkbox" id="idAlDrug"> DRUG <input type="checkbox" id="idAlFood"> FOOD <input type="checkbox" id="idAlOther"> OTHER</td>
																					<td style='width:50%;'> PATIENT'S CHIEF COMPLAINTS & DURATION :<br><textarea style="width: 333px; height: 38px;" id="idComplaint"></textarea></td></tr>
																		</tbody>	
																	</table>
																	<table class="table table-bordered table-condensed header-fixed "
																		style="margin-top:-21px;" >
																		<caption><h6><b>COMPLETE AMISSION ASSESSMENT</b>  (To be Comeplete within 24 hours)</h6></caption>
																		<tbody>
																			<tr><td style='width:100%;' colspan="2">
																					<label>HISTORY / PAST MEDICAL TREATMENT OF THE PATIENT :</label><br>
																					<input type="checkbox" id="idPHD">Heart Disease   <input type="checkbox" id="idPHyp">Hypertension   <input type="checkbox" id="idPAst">Asthama   <input type="checkbox" id="idPTB">TB   
																					<input type="checkbox" id="idPCan">Cancer   <input type="checkbox" id="idPAI">Anesthesia Issues   <input type="checkbox" id="idPDia">Diabetes   <input type="checkbox" id="idPKid">Kidney<br> 
																					<input type="checkbox" id="idPStroke">Stroke   <input type="checkbox" id="idPUL">Ulcer   <input type="checkbox" id="idPEP">Emotional/Psych   <input type="checkbox" id="idPLung">Lung
																					<input type="checkbox" id="idPSeizures">Seizures   <input type="checkbox" id="idPHepa">Hepatitis   <input type="checkbox" id="idPTU">Tobacoo Use<br></td></tr>
																			<tr><td style='width:50%;'>Other :<textarea style="width: 475px; height: 52px;" id="idPOther"> </textarea></td>
																			<td style='width:50%;'>Surgery :<textarea style="width: 475px; height: 52px;" id="idPSurgery"> </textarea></td></tr>		

																			<tr><td style='width:100%;' colspan="2">
																					<label>FAMILY HISTORY :</label><br>
																					<input type="checkbox" id="idFHD">Heart Disease   <input type="checkbox" id="idFHyp">Hypertension   <input type="checkbox" id="idFAst">Asthama   <input type="checkbox" id="idFTB">TB   
																					<input type="checkbox" id="idFCan">Cancer   <input type="checkbox" id="idFAI">Anesthesia Issues   <input type="checkbox" id="idFDia">Diabetes   <input type="checkbox" id="idFKid">Kidney<br> 
																					<input type="checkbox" id="idFStroke">Stroke   <input type="checkbox" id="idFUL">Ulcer   <input type="checkbox" id="idFEP">Emotional/Psych   <input type="checkbox" id="idFLung">Lung
																					<input type="checkbox" id="idFSeizures">Seizures   <input type="checkbox" id="idFHepa">Hepatitis   <input type="checkbox" id="idFTU">Tobacoo Use<br></td></tr>
																			<tr><td style='width:50%;'>Other :<textarea style="width: 475px; height: 52px;" id="idFOther"> </textarea></td>
																			<td style='width:50%;'>Surgery :<textarea style="width: 475px; height: 52px;" id="idFSurgery"> </textarea></td></tr>		

																			<tr><td style='width:100%;' colspan="2">
																					<label>PSYCOLOGICAL / ECONOMIC HISTORY :</label><br>
																					Marital Status: <input type="radio" id="idMarried" value="married" name="maritialStatus">Married   <input type="radio" id="idWidowed" value="widowed" name="maritialStatus">Widowed   <input type="radio" id="idSingle" value="single" name="maritialStatus">Single <br>   
																					Family:<input type="radio" id="idLivesWith" value="family" name="livesWith">Lives With   <input type="radio" id="idLivesALone" value="alone" name="livesWith">Lives Alone<br> 
																					Occupation:<input type="radio" id="idOccuFull" value="full" name="occupation">Full Time   <input type="radio" id="idOccuPart" value="part" name="occupation">Part  Time   <input type="radio" id="idOccuRetaired" value="retired" name="occupation">Retired   <input type="radio" id="idOccuOthr" value="other" name="occupation">Other<br>
																					Activity Level:<input type="radio" id="ActivityAmb" value="ambulatory" name="activity">Ambulatory   <input type="radio" id="idActivityCane" value="cane" name="activity">Cane   <input type="radio" id="idActivityCru" value="crutches" name="activity">Crutches   <input type="radio" id="idActivityWal" value="walker" name="activity">Walker   <input type="radio" id="idActivityWheel" value="weelchair" name="activity">Wheelchair   <input type="radio" id="idActivityBed" value="bedrest" name="activity">Bed Rest<br>
																					Emotional Status:<input type="radio" id="idStatusCoop" value="cooperative" name="emoStatus">Cooperative   <input type="radio" id="idStatusAnx" value="anxious" name="emoStatus">Anxious   <input type="radio" id="idStatusDep" value="depressed" name="emoStatus">Depressed<br>
																					</td>
																		</tbody>
																	</table>
																	
																	<table class="table table-bordered table-condensed header-fixed "
																		style="margin-top:-21px;" >
																		<caption><h6><b>ACTIVITIES OF DAILY LIVING</b></h6></caption>
																		<thead>
																		<tr>
																			<th style="width: 200px;"></th>
																			<th style="width: 200px;">Usual Level</th>
																			<th style="width: 200px;">Level on admission</th>
																			<th style="width: 350px;">Score</th>
																			</tr>
																		</thead>
																		<tbody>
																		<tr>
																			<td><label>Feeding</label><br>
																			<label>Bathing</label><br>
																			<label>Toileting</label><br>
																			<label>General Mobility / Gait</label><br>
																			<label>Dressing / Grooming</label></td>
																			<td><input type="text" onkeypress="return validateNumbers(event)" id="idFeeding"><br><input type="text" onkeypress="return validateNumbers(event)" id="idBathing"><br><input type="text" onkeypress="return validateNumbers(event)" id="idToileting"><br><input type="text" onkeypress="return validateNumbers(event)" id="idGeneral"><br><input type="text" onkeypress="return validateNumbers(event)" id="idDressing"></td>
																			<td><input type="text" onkeypress="return validateNumbers(event)" id="idAdmFeeding"><br><input type="text" onkeypress="return validateNumbers(event)" id="idAdmBathing"><br><input type="text" onkeypress="return validateNumbers(event)" id="idAdmToileting"><br><input type="text" onkeypress="return validateNumbers(event)" id="idAdmGeneral"><br><input type="text" onkeypress="return validateNumbers(event)" id="idAdmDressing"></td>
																			<td rowspan="5">Level 0-Independent, requires no supervision, assistance or teaching.<br>
																			Level 1-Requires supervision and/or teaching.<br>
																			Level 2-Requires at least minimum assistance from another person.<br>
																			Level 3-Is dependent and dose not participate.<br>
																			</td>
																		</tr>
																		</tbody>
																	</table>
																</div>
																
																<div class="divide-10"></div>
															</div>
															
														
															<div id="Assessment_Sheet2" class="tab-pane fade in col-md-12">
																<div class="divide-10"></div>
																<div class="col-md-12" >
																	<table style="margin-top:-21px;"  class="table table-bordered table-condensed header-fixed ">
																		<caption><h6><b>INDICATE SKIN ASSESSMENT FINDINGS ON DIAGRAM </b></h6></caption>
																		<div>
																			<input id="saveButton" class="btn btn-xs btn-success editUserAccess pull-right" type="button" style="margin-right:-75px;" value="Save" onclick="saveNursingAssesmentnew2()">
																		</div>
																		<tbody class='cf'>
																			<tr>
																				<td style='width:43%; height: 220px;'>
																					<img src="images/humanBody.jpg" alt="Human Body Structure" style="height:100%;width:95%; ">
																				</td>
																				<td style='width:14%; height: 220px;'>
																					<input type="checkbox"  id="idBurns" class="skinIndication" onclick="setSkinAssessments()" value="Burns" >B-Burns<br>
																					<input type="checkbox" id="idScar" class="skinIndication" onclick="setSkinAssessments()" value="Scar" >S-Scar<br>
																					<input type="checkbox" id="idUlcer" class="skinIndication" onclick="setSkinAssessments()" value="Ulcer" >U-Ulcer<br>
																					<input type="checkbox" id="idLaceration" class="skinIndication" onclick="setSkinAssessments()" value="Laceration" >L-Laceration<br>
																					<input type="checkbox" id="idRash" class="skinIndication" onclick="setSkinAssessments()" value="Rash" >R-Rash
																				</td>
																				<td style='width:43%; height: 220px;'>
																					<div id="skinindicationDIV" style="display: none;">
																						<textarea id="skinindicationTA" style="width: 95%;" rows="5"></textarea>
																					</div>
																				</td>
																			</tr>
																				
																		</tbody>	
																	</table>
																	<table style="margin-top:-21px;"  class="table table-bordered table-condensed header-fixed ">
																		<caption><h6><b>Vulnerability Assessment & Care to be Taken (Mark YES if required.) </b></h6></caption>
																		<caption>Vulnerability Factors </caption>
																		<tbody class='cf'>
																			<tr><th style='width:5%;'>Sr No.</th>
																				<th style='width:35%;'>Category</th>
																				<th style='width:5%;'>Yes</th>
																				<th style='width:5%;'>No</th>
																				<th style='width:35%;'>Care to be taken</th>
																				<th style='width:5%;'>Yes</th>
																				<th style='width:5%;'>No</th></tr>
																			<tr><td style='width:5%;'>1</td>
																				<td style='width:35%;'>Age more than 65 years & < 18 years.</td>
																				<td style='width:5%;'><input type="radio" id="cat1Y" value="yes" name="cat1Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat1N" value="no" name="cat1Val"></td>
																				<td style='width:35%;'>Side Rails provision</td>
																				<td style='width:5%;'><input type="radio" id="care1Y" value="yes" name="care1Val"></td>
																				<td style='width:5%;'><input type="radio" id="care1N" value="no" name="care1Val"></td></tr>
																			<tr><td style='width:5%;'>2</td>
																				<td style='width:35%;'>Physically challenged</td>
																				<td style='width:5%;'><input type="radio" id="cat2Y" value="yes" name="cat2Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat2N" value="no" name="cat2Val"></td>
																				<td style='width:35%;'>Low height bed</td>
																				<td style='width:5%;'><input type="radio" id="care2Y" value="yes" name="care2Val"></td>
																				<td style='width:5%;'><input type="radio" id="care2N" value="no" name="care2Val"></td></tr>
																			<tr><td style='width:5%;'>3</td>
																				<td style='width:35%;'>Mentally challenged / Mentally ill</td>
																				<td style='width:5%;'><input type="radio" id="cat3Y" value="yes" name="cat3Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat3N" value="no" name="cat3Val"></td>
																				<td style='width:35%;'>Nearer to Nursing Station</td>
																				<td style='width:5%;'><input type="radio" id="care3Y" value="yes" name="care3Val"></td>
																				<td style='width:5%;'><input type="radio" id="care3N" value="no" name="care3Val"></td></tr>
																			<tr><td style='width:5%;'>4</td>
																				<td style='width:35%;'>Terminally ill</td>
																				<td style='width:5%;'><input type="radio" id="cat4Y" value="yes" name="cat4Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat4N" value="no" name="cat4Val"></td>
																				<td style='width:35%;'>Continuous monitoring</td>
																				<td style='width:5%;'><input type="radio" id="care4Y" value="yes" name="care4Val"></td>
																				<td style='width:5%;'><input type="radio" id="care4N" value="no" name="care4Val"></td></tr>
																			<tr><td style='width:5%;'>5</td>
																				<td style='width:35%;'>Inability to speak</td>
																				<td style='width:5%;'><input type="radio" id="cat5Y" value="yes" name="cat5Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat5N" value="no" name="cat5Val"></td>
																				<td style='width:35%;'>Provide Aid for Communication</td>
																				<td style='width:5%;'><input type="radio" id="care5Y" value="yes" name="care5Val"></td>
																				<td style='width:5%;'><input type="radio" id="care5N" value="no" name="care5Val"></td></tr>
																			<tr><td style='width:5%;'>6</td>
																				<td style='width:35%;'>Altered consciousness</td>
																				<td style='width:5%;'><input type="radio" id="cat6Y" value="yes" name="cat6Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat6N" value="no" value="no" name="cat6Val"></td>
																				<td style='width:35%;'>Light and sound modification</td>
																				<td style='width:5%;'><input type="radio" id="care6Y" value="yes" name="care6Val"></td>
																				<td style='width:5%;'><input type="radio" id="care6N" value="no" name="care6Val"></td></tr>
																			<tr><td style='width:5%;'>7</td>
																				<td style='width:35%;'>Epileptic fit</td>
																				<td style='width:5%;'><input type="radio" id="cat7Y" value="yes" name="cat7Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat7N" value="no" name="cat7Val"></td>
																				<td style='width:35%;'>Full time attendant</td>
																				<td style='width:5%;'><input type="radio" id="care7Y" value="yes" name="care7Val"></td>
																				<td style='width:5%;'><input type="radio" id="care7N" value="no" name="care7Val"></td></tr>
																			<tr><td style='width:5%;'>8</td>
																				<td style='width:35%;'>Medication related consciousness defect</td>
																				<td style='width:5%;'><input type="radio" id="cat8Y" value="yes" name="cat8Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat8N" value="no" name="cat8Val"></td>
																				<td style='width:35%;'>Double checking of identification</td>
																				<td style='width:5%;'><input type="radio" id="care8Y" value="yes" name="care8Val"></td>
																				<td style='width:5%;'><input type="radio" id="care8N" value="no" name="care8Val"></td></tr>
																			<tr><td style='width:5%;'>9</td>
																				<td style='width:35%;'>Absence of raltive attendant</td>
																				<td style='width:5%;'><input type="radio" id="cat9Y" value="yes" name="cat9Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat9N" value="no" name="cat9Val"></td>
																				<td style='width:35%;'>Either of 3 or 4</td>
																				<td style='width:5%;'><input type="radio" id="care9Y" value="yes" name="care9Val"></td>
																				<td style='width:5%;'><input type="radio" id="care9N" value="no" name="care9Val"></td></tr>
																			<tr><td style='width:5%;'>10</td>
																				<td style='width:35%;'>Immuno-compromised / low immunity</td>
																				<td style='width:5%;'><input type="radio" id="cat10Y" value="yes" name="cat10Val"></td>
																				<td style='width:5%;'><input type="radio" id="cat10N" value="no" name="cat10Val"></td>
																				<td style='width:35%;'>Infection Control Precaution</td>
																				<td style='width:5%;'><input type="radio" id="care10Y" value="yes" name="care10Val"></td>
																				<td style='width:5%;'><input type="radio" id="care10N" value="no" name="care10Val"></td></tr>
																			<tr><td style='width:5%;'></td>
																				<td style='width:35%;' align="right">Total</td>
																				<td style='width:5%;'><input type="text" id="totalCat" style="width: 40px;"></td>
																				<td style='width:5%;'></td>
																				<td style='width:35%;' align="right">Total</td>
																				<td style='width:5%;'><input type="text" id="totalCare" style="width: 40px;"></td>
																				<td style='width:5%;'></td></tr>
																			<tr><td style='width:95%;' colspan="5" align="right">Total Yes:</td>
																				<td style='width:5%;' colspan="2"><input type="text" id="totalYes" style="width: 40px;"></td></tr>											
																		</tbody>	
																	</table>
																	<table style="margin-top:-21px;"  class="table table-bordered table-condensed header-fixed ">
																		<caption style=""><b>Vulnerability level (check whichever is applicable) </b></caption>
																		<tbody class='cf'>
																			<tr>
																				<td colspan="2">
																					<input type="checkbox" id="idHighVulnerability">High Vulnerability: (if more than '1' category or factor is marked 'YES')
																					<input type="checkbox" id="idLowVulnerability">Low Vulnerability: (if '1' category or factor is marked 'YES')			
																				</td>
																			</tr>
																			<tr>
																				<td style='width:50%;'>
																					<label>HEAD</label><br>
																					Injuries(Specify any):<textarea id="idInjuries" style="width: 317px; height: 44px;"></textarea>
																				</td>
																				<td style='width:50%;'>
																					<label>MOUTH</label><br>
																					<input type="checkbox" id="idLesion">Lesion<input type="checkbox" id="idDental">Dental Hygiene
																					<input type="checkbox" id="idBleeding">Bleeding Gums<input type="checkbox" id="idTaking">Taking Dental Hygiene Care<br>
																					<input type="checkbox" id="idMouthSense">Sense of Taste<input type="checkbox" id="idDentures">Dentures
																					Other:<input type="text" id="idMouthOther">
																				</td>
																			</tr>
																			<tr>
																				<td style='width:50%;'>
																					<label>EYE</label><br>
																					<input type="checkbox" id="idBlurred">Blurred Vision<input type="checkbox" id="idDouble">Double Vision<input type="checkbox" id="idInflammation">Inflammation
																					<input type="checkbox" id="idEyeColour">Colour Blinds<input type="checkbox" id="idItching">Itching<input type="checkbox" id="idRedness">Redness<br>
																					<input type="checkbox" id="idEyePain">Pain<input type="checkbox" id="idPupils">Pupils Abnormal
																					Other:<input type="text" id="idEyeOther">
																				</td>
																				<td style='width:50%;'>
																					<label>EAR</label><br>
																					<input type="checkbox" id="idDeaf">Deaf<input type="checkbox" id="idTinnitus">Tinnitus<input type="checkbox" id="idDizziness">Dizziness
																					<input type="checkbox" id="idEarPain">Pain<input type="checkbox" id="idEarSense">Sense of imbalance
																					<input type="checkbox" id="idDrainage">Drainage<br>Colour<input type="text" id="idEarColour">
																					Other:<input type="text" id="idEarOther">
																				</td>
																			</tr>
																			<tr>
																				<td style='width:50%;'>
																					<label>NOSE</label><br>
																					<input type="checkbox" id="idNoseBleed">Nose Bleed<input type="checkbox" id="idNoseCongestion">Congestion<input type="checkbox" id="idNosePain">Pain
																					<input type="checkbox" id="idNoseSinus">Sinus Problems<input type="checkbox" id="idNoseDrainage">Drainage<br>Colour<input type="text" id="idNoseColour">
																					Other:<input type="text" id="idNoseOther">
																				</td>
																				<td style='width:50%;'>
																					<label>THROAT</label><br>
																					<input type="checkbox" id="idThroatSore">Sore throat<input type="checkbox" id="idThroatHoarseness">Hoarseness<input type="checkbox" id="idThroatLumps">Lumps
																					<input type="checkbox" id="idThroatSwollen">Swollen Glands<input type="checkbox" id="idThroatStiffness">Stiffness<br>
																					<input type="checkbox" id="idThroatPain">Pain<input type="checkbox" id="idThroatDysphagia">Dysphagia
																					Other:<input type="text" id="idThroatOther">
																				</td>
																			</tr>
																			<tr>
																				<td colspan="2">
																					<label>BOWEL</label><br>
																					<input type="checkbox" id="idBowelDiarrhoea">Diarrhoea<input type="checkbox" id="idBowelConstipation">Constipation<input type="checkbox" id="idBowelIncontinence">Incontinence
																					<input type="checkbox" id="idBowelBlood">Blood in stool<input type="checkbox" id="idBowelNone">None
																					<input type="checkbox" id="idBowelPain">Pain<input type="checkbox" id="idBowelHemorrhoids">Hemorrhoids<br>
																					Frequency of stool<input type="text" id="idBowelFrequency">
																					Interventions:<input type="checkbox" id="idBowelInterNone">Laxatives:<input type="checkbox" id="idBowelLaxatives">Type:<input type="text" id="idBowelInterType">Frequency:<input type="text" id="idBowelInterFrequency">
																				</td>
																				
																			</tr>
																		</tbody>	
																	</table>
																	
																</div>
																
																<div class="divide-10"></div>
															</div>
															<div id="Assessment_Sheet3" class="tab-pane fade in col-md-12">
																<div class="divide-10"></div>
																<div class="col-md-12" >
																	<table style="margin-top:00px;"  class="table table-bordered table-condensed header-fixed ">
																		<div>
																			<input id="saveButton" class="btn btn-xs btn-success editUserAccess pull-right" type="button" style="margin-right:-75px;" value="Save" onclick="saveNursingAssesment33()">
																		</div>
																		<tbody class='cf'>
																			<tr>
																				<td style='width:50%;'>
																					<label>GASTROINTESTINAL (Select if 'YES')</label><br>
																					<input type="checkbox" id="idGasAppetite">Appetite Good<input type="checkbox" id="idGasNausea">Nausea
																					<input type="checkbox" id="idGasVomiting">Vomiting<input type="checkbox" id="idGasDistension">Distension<br>
																					<input type="checkbox" id="idGasHeart">Heart Burn<input type="checkbox" id="idGasFlatus">Flatus
																					<input type="checkbox" id="idGasPain">Pain<input type="checkbox" id="idGasRectal">Rectal Bleeding
																					<input type="checkbox" id="idGasColostomy">Colostomy<input type="checkbox" id="idGasIlleostomy">Illeostomy
																				</td>
																				<td style='width:50%;'>
																					<label>GENITO-URINARY (Select if 'YES')</label><br>
																					Urine Colour<input type="text" id="idUrineColour">Frequency<input type="text" onkeypress="return validateNumbers(event)" id="idUrineFrequency"><br>
																					<input type="checkbox" id="idUrinePain">Pain<input type="checkbox" id="idUrineBurning">Burning
																					<input type="checkbox" id="idUrineItching">Itching<input type="checkbox" id="idUrineUrgency">Urgency
																					<input type="checkbox" id="idUrineIncontinence">Incontinence<input type="checkbox" id="idUrineNocturia">Nocturia
																					<input type="checkbox" id="idUrineUrostomy">Urostomy<br><input type="checkbox" id="idUrineHistory">History of Calculi
																					<input type="checkbox" id="idUrineHistoryUTI">History of UTI<input type="checkbox" id="idUrineFoley">Foley's Catheter<br>
																					Date of Insertion:<input type="text" id="idUrineInsertion">
																				</td>
																			</tr>
																			 <tr>
																				<td style='width:50%;'>
																					<label>MUSCULOSKELETAL (Select if 'YES')</label><br>
																					Skin:<input type="radio" id="idMusWarm" name="MusValSkin" value="warm">Warm<input type="radio" id="idMusCool" name="MusValSkin" value="cool">Cool<input type="radio" id="idMusDry" name="MusValSkin" value="dry">Dry<input type="radio" id="idMusFirm" name="MusValSkin" value="firm">Firm<input type="radio" id="idMusFlaccid" name="MusValSkin" value="flaccid">Flaccid; Colour:<input type="text" id="idMusColour"><br>
																					Extremities:<input type="checkbox" id="idMusTingling">Tingling<input type="checkbox" id="idMusWeakness">Weakness<input type="checkbox" id="idMusDeformity">Deformity<br> 
																					Joints:<input type="checkbox" id="idMusPain">Pain<input type="checkbox" id="idMusStiffness">Stiffness<br>
																					Uses:<input type="radio" id="idMusWalker" name="MusValUses" value="walker">Walker<input type="radio" id="idMusWheelChair" name="MusValUses" value="weelchair">WheelChair<input type="radio" id="idMusCane" name="MusValUses" value="cane">Cane<input type="radio" id="idMusNone" name="MusValUses" value="none">None<br>
																					Other:<input type="text" id="idMusOther">
																				</td>
																				<td style='width:50%;'>
																					<label>REPRODUCTIVE (Select if 'YES')</label><br>
																					LMP:<input type="text" id="idReproLMP"><input type="checkbox" id="idReproMeno">Menopausai,If Yes Duration:<input type="text" id="idReproMenoDura"><br>
																					<input type="checkbox" id="idReproDysme">Dysmenorrhoea<input type="checkbox" id="idReproAmeno">Amenorrhoea,If Yes Duration:<input type="text" id="idReproAmenoDura"><br>
																					<input type="checkbox" id="idReproVaginal">Vaginal Discharge<input type="checkbox" id="idReproItching">Itching
																					Other:<input type="text" id="idReproOther">
																				</td>
																			</tr>
																			<tr>
																				<td style='width:50%;'>
																					<label>CVS (Select if 'YES')</label><br>
																					<input type="checkbox" id="idCVSDiscomfort">Chest Discomfort<input type="checkbox" id="idCVSOedema">Oedema,If Yes Location:<input type="text" id="idCVSOedemaLoca"><br>
																					Other:<input type="text" id="idCVSOther">
																				</td>
																				<td style='width:50%;'>
																					<label>BREAST (Select if 'YES')</label><br>
																					<input type="checkbox" id="idBreastFeeding">Breast Feeding<input type="checkbox" id="idBreastLumps">Lumps
																					Other:<input type="text" id="idBreastOther">
																				</td>
																			</tr>
																			<tr>
																				<td colspan="2">
																					<label>NEUROLOGIOCAL (Select if 'YES')</label><br>
																					<input type="radio" id="idNeuCoop" value="cooperative" name="neurologiocal">Cooperative<input type="radio" value="memoryChanges" id="idNeuMemory" name="neurologiocal">Memory Changes<input type="radio" value="dizzing" id="idNeuDizzing" name="neurologiocal">Dizzing<input type="radio" value="synocope" id="idNeuSynocope" name="neurologiocal">Synocope<input type="radio" value="seizure" id="idNeuSeizure" name="neurologiocal">Seizure<br>
																					<input type="radio" value="paralysis" id="idNeuPara" name="neurologiocal">Paralysis<input type="radio" value="headache" id="idNeuHead" name="neurologiocal">Headache<input type="radio" value="anxity" id="idNeuAnxity" name="neurologiocal">Anxity<input type="radio" value="depression" id="idNeuDepre" name="neurologiocal">Depression<input type="radio" value="suicidalAttempt" id="idNeuSuicide" name="neurologiocal">Suicidal Attempt<br>
																					Any Psychiatric Illness:<input type="text" id="idNeuPsych">Oriented To:<input type="radio" id="idNeuOriPer" value="person" name="neurologiocalPsy">Person<input type="radio" id="idNeuOriTime" value="time" name="neurologiocalPsy">Time<input type="radio" id="idNeuOriPlace" value="place" name="neurologiocalPsy">Place<br>
																					Pupils Size:<input type="text" onkeypress="return validateNumbers(event)" id="idNeuPupils">Deviation:<input type="text" id="idNeuDeviation">Reaction:<input type="radio" id="idNeuOriBrisk" value="brisk" name="neurologiocalPupils">Brisk<input type="radio" id="idNeuOriSluggish" value="sluggish" name="neurologiocalPupils">Sluggish<input type="radio" id="idNeuOriNoResp" value="noResponce" name="neurologiocalPupils">No Responce<br>
																					LOC:<input type="radio" id="idNeuLOCAlert" value="alert" name="neuAlert">Alert<input type="radio" id="idNeuLOCConfused" value="confused" name="neuAlert">Confused<input type="radio" id="idNeuLOCSedated" value="sedated" name="neuAlert">Sedated<input type="radio" id="idNeuLOCSomnolent" value="somnolent" name="neuAlert">Somnolent<input type="radio" id="idNeuLOCComatose" value="comatose" name="neuAlert">Comatose<input type="radio" id="idNeuLOCAgitated" value="agitated" name="neuAlert">Agitated,Other:<input type="text" id="idNeuLOCOther"><br>
																					Speech:<input type="radio" id="idNeuSpeechClear" value="clear" name="neuSpeech">Clear<input type="radio" id="idNeuLOCSturred" value="sturred" name="neuSpeech">Sturred<input type="radio" id="idNeuLOCAphasic" value="aphasic" name="neuSpeech">Aphasic<input type="radio" id="idNeuLOCDysphasia" value="dysphasia" name="neuSpeech">Dysphasia<input type="radio" id="idNeuLOCNone" value="none" name="neuSpeech">None<br>
																					Grips:<input type="text" id="idNeuGrips">Foot Pushes:<input type="text" id="idNeuFoot">Gag Reflex:<input type="text" id="idNeuGag">Other:<input type="text" id="idNeuOther">
																				</td>
																			</tr>
																			<tr>
																				<td>
																					<label>PAIN ASSESSMENT (Select if 'YES')</label><br>
																					Pain:<input type="checkbox" id="idPainAss">If Yes, Select the below Pain Scales for describing the Pain Score of the Patient.
																					Pain Location:<input type="text" id="idPainAssLocation">Duration:<input type="text" id="idPainAssDuration"><br>
																					<input type="radio" id="idPainAssQlty" name="painAssessment" value="quality">Quality<input type="radio" id="idPainAssConst" name="painAssessment" value="constant">Constant<input type="radio" id="idPainAssInter" name="painAssessment" value="intermittent">Intermittent<br>
																					<input type="radio" id="idPainAssChara" name="painAssessment" value="character">Character<input type="radio" id="idPainAssLacer" name="painAssessment" value="lacerating">Lacerating<input type="radio" id="idPainAssBurn" name="painAssessment" value="burning">Burning<input type="radio" id="idPainAssRedi" name="painAssessment" value="rediating">Rediating<br>
																					Exacerbating Factors:<input type="text" id="idExaFactor"><br>
																					Relivering Factors:<input type="radio" id="idReliveringFactor" name="painRelivering" value="rest">Rest<input type="radio" id="idReliveringMedication" name="painRelivering" value="medication">Medication<input type="radio" id="idReliveringOther" name="painRelivering" value="other">Other<br>
																					Affects daily routine:<input type="radio" id="idRoutineYes" name="dailyRoutine" value="yes">Yes<input type="radio" id="idRoutineNo" name="dailyRoutine" value="no">No,   Sleep:<input type="radio" id="idSleepYes" name="sleep" value="yes">Yes<input type="radio" id="idSleepNo" name="sleep" value="no">No<br>
																					Mostlikely causes of pain:<input type="text" id="idPainCauses"><br>
																					Plans:<textarea rows="" cols="" style="width: 393px; height: 47px;" id="idPlans"></textarea>
																				</td>
																				<td>
																					<label>Wong Baker Pain Scale:</label><br>
																					<img style="height: 170px; width: 430px;" src="images/pain.jpg"><br>
																					Pain Scale:<input type="text" onkeypress="return validateNumbers(event)" id="idPainScale">
																				</td>
																			</tr>
																		</tbody>	
																	</table>
																	
																	
																	
																</div>
																
																<div class="divide-10"></div>
															</div>
															<div id="Assessment_Sheet4" class="tab-pane fade in col-md-12">
																<div class="divide-10"></div>
																<div class="col-md-6">
																<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top: 10px;">
																	<caption style="background-color: #d9d9d9;"><h6><b>Glasgow Coma Scale (GCS)Score
																	<button class="btn btn-xs btn-success pull-right" data-toggle="tooltip" data-placement="left" title="Save" onclick="saveGlasgowComaScorePage4()">
																		<i class="fa fa-save"></i></button></h6> <input type="hidden" id="glasgowComaScorePage4Id" value="0" style="display: none;" />
																	</caption>
																	<tr style="background-color: #e8e8e8;">
																		<th colspan="2"> Adult</th>
																		<th> Score</th>
																		<th> Time</th></tr>
																		<tbody>
																			<tr><td rowspan="4"><b>Eye <br>Opening <br>Response</td>
																				<td class="col-md-5-1">Spontaneously</td>
																				<td class="col-md-2-1"><input id="Page4EyeOpenResponse4" name="Page4EyeOpenResponse" class="Page4ResponseScore" value="4" onchange="setGCSscoreNaction4()" type="radio"/>4</td>
																				<td class="col-md-2-1"><input id="Page4GCS_EOR_time_4" onclick="setGCSTime('EOR',4)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">To Speech/Verbal Command</td>
																				<td class="col-md-2-1"><input id="Page4EyeOpenResponse3" name="Page4EyeOpenResponse" class="Page4ResponseScore" value="3" onchange="setGCSscoreNactionPage4()" type="radio"/>3</td>
																				<td class="col-md-2-1"><input id="Page4GCS_EOR_time_3" onclick="setGCSTime('EOR',3)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">To Pain</td>
																				<td class="col-md-2-1"><input id="Page4EyeOpenResponse2" name="Page4EyeOpenResponse" class="Page4ResponseScore" value="2" onchange="setGCSscoreNactionPage4()" type="radio"/>2</td>
																				<td class="col-md-2-1"><input id="Page4GCS_EOR_time_2" onclick="setGCSTime('EOR',2)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">No Reponse</td>
																				<td class="col-md-2-1"><input id="Page4EyeOpenResponse1" name="Page4EyeOpenResponse" class="Page4ResponseScore" value="1" onchange="setGCSscoreNactionPage4()" type="radio"/>1</td>
																				<td class="col-md-2-1"><input id="Page4GCS_EOR_time_1" onclick="setGCSTime('EOR',1)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td rowspan="5"><b>Best <br>Verbal <br>Response</td>
																				<td class="col-md-5-1">Oriented and Talks</td>
																				<td class="col-md-2-1"><input id="Page4BestVerbalResponse5" name="Page4BestVerbalResponse" class="Page4ResponseScore" value="5" onchange="setGCSscoreNactionPage4()" type="radio"/>5</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BVR_time_5" onclick="setGCSTime('BVR',5)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Disoriented and Talks</td>
																				<td class="col-md-2-1"><input id="Page4BestVerbalResponse4" name="Page4BestVerbalResponse" class="Page4ResponseScore" value="4" onchange="setGCSscoreNactionPage4()" type="radio"/>4</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BVR_time_4" onclick="setGCSTime('BVR',4)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Inappropriate Words</td>
																				<td class="col-md-2-1"><input id="Page4BestVerbalResponse3" name="Page4BestVerbalResponse" class="Page4ResponseScore" value="3" onchange="setGCSscoreNactionPage4()" type="radio"/>3</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BVR_time_3" onclick="setGCSTime('BVR',3)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Incomprehensible Sounds</td>
																				<td class="col-md-2-1"><input id="Page4BestVerbalResponse2" name="Page4BestVerbalResponse" class="Page4ResponseScore" value="2" onchange="setGCSscoreNactionPage4()" type="radio"/>2</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BVR_time_2" onclick="setGCSTime('BVR',2)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">No Reponse</td>
																				<td class="col-md-2-1"><input id="Page4BestVerbalResponse1" name="Page4BestVerbalResponse" class="Page4ResponseScore" value="1" onchange="setGCSscoreNactionPage4()" type="radio"/>1</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BVR_time_1" onclick="setGCSTime('BVR',1)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td rowspan="6"><b>Best <br>Motor <br>Response</td>
																				<td class="col-md-5-1">Obey Verbal Commands</td>
																				<td class="col-md-2-1"><input id="Page4BestMotorResponse6" name="Page4BestMotorResponse" class="Page4ResponseScore" value="6" onchange="setGCSscoreNactionPage4()" type="radio"/>6</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BMR_time_6" onclick="setGCSTime('BMR',6)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Localizes Pain</td>
																				<td class="col-md-2-1"><input id="Page4BestMotorResponse5" name="Page4BestMotorResponse" class="Page4ResponseScore" value="5" onchange="setGCSscoreNactionPage4()" type="radio"/>5</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BMR_time_5" onclick="setGCSTime('BMR',5)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Withdraws to Pain</td>
																				<td class="col-md-2-1"><input id="Page4BestMotorResponse4" name="Page4BestMotorResponse" class="Page4ResponseScore" value="4" onchange="setGCSscoreNactionPage4()" type="radio"/>4</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BMR_time_4" onclick="setGCSTime('BMR',4)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Decorticate</td>
																				<td class="col-md-2-1"><input id="Page4BestMotorResponse3" name="Page4BestMotorResponse" class="Page4ResponseScore" value="3" onchange="setGCSscoreNactionPage4()" type="radio"/>3</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BMR_time_3" onclick="setGCSTime('BMR',3)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Decerebrate</td>
																				<td class="col-md-2-1"><input id="Page4BestMotorResponse2" name="Page4BestMotorResponse" class="Page4ResponseScore" value="2" onchange="setGCSscoreNactionPage4()" type="radio"/>2</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BMR_time_2" onclick="setGCSTime('BMR',2)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">No Reponse</td>
																				<td class="col-md-2-1"><input id="Page4BestMotorResponse1" name="Page4BestMotorResponse" class="Page4ResponseScore" value="1" onchange="setGCSscoreNactionPage4()" type="radio"/>1</td>
																				<td class="col-md-2-1"><input id="Page4GCS_BMR_time_1" onclick="setGCSTime('BMR',1)" class="form-control input-SmallText TextFont" type="text" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr style="background-color: #e8e8e8;">
																				<td rowspan="2" colspan="2"></td>
																				<td class="col-md-2-1"><b>Total Score</td>
																				<td class="col-md-2-1"><label id="Page4GCSTotalScore" ></label></td>
																			</tr>
																			<tr style="background-color: #e8e8e8;">
																			<td class="col-md-2-1"><b>Action (A,B,C)</td>
																				<td class="col-md-2-1"><label id="Page4GCSAction" ></label></td>
																			</tr>
																		</tbody>
																</table>
																<table class="col-md-12-1 table table-bordered table-condensed cf" style="margin-top:-20px;">
																	<tr>		<td rowspan="3" style="width: 20%;"><b>Action <br>Plan for <br>GCS Score</td>
																				<td class="col-md-3-1" style="width: 20%;"><b>GCS &lt; 8 </b></td>
																				<td class="col-md-7-1" style="width: 60%;"><b>A</b> - Inform Duty Dr. / Intensivist / Consultant / BSL / TPR / BP Monitoring / Consider Endotracheal Intubation </td>
																	</tr>
																	<tr>		<td class="col-md-3-1" style="width: 20%;"><b>GCS 8 - 12 </b></td>
																				<td class="col-md-7-1" style="width: 60%;"><b>B</b> - Consider Orpoharyngeal Airway / Nasopharyngeal Airway </td>
																	</tr>	
																	<tr>		<td class="col-md-3-1" style="width: 20%;"><b>GCS 12 - 15 </b></td>
																				<td class="col-md-7-1" style="width: 60%;"><b>C</b> - Observation </td>
																	</tr>		
																</table>
																</div><!-- 	Glasgow Coma div Page4 -->
																
																<div class="col-md-6">
																	<table class="col-md-6 table table-bordered table-condensed cf" style="margin-top: 10px;"> 
																		<caption style="background-color: #d9d9d9;"><h6><b> Morse Fallen Risk Assessment
																		<button class="btn btn-xs btn-success pull-right" onclick="saveMFRAScorePage4()" title="Save" data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i></button></b></h6></caption><input type="hidden" id="mfraScorePage4Id" value="0" style="display: none;" />
																		<tbody>
																			<tr style="background-color: #e8e8e8;">
																				<th class="col-md-3"><b>Risk Factor#</b></th>
																				<th class="col-md-3"><b>Scale</b></th>
																				<th class="col-md-1"><b>Score</b></th>
																				<th class="col-md-2"><b>Time</b></th>
																				<th class="col-md-3"><b>Action Taken</b></th>
																			</tr>
																			<tr><td rowspan="2"><b>History of fall</b></td>
																				<td >Yes</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="25" name="Page4historyOf" id="Page4historyOf_25">25</td>
																				<td rowspan="2"><input id="Page4Morse_time_1" onclick="setMFRATime(1)" class="form-control input-SmallText TextFont" type="text" readonly="readonly" value="" ></td>
																				<td rowspan="14"><label id="Page4MorseActionLabel"></label></td>
																			</tr>	
																			<tr><td >No</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="0" name="Page4historyOf" id="Page4historyOf_0">0</td>
																			</tr>
																			<tr><td rowspan="2"><b>Secondary Diagnosis</b></td>
																				<td >Yes</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="15" name="Page4diagnosis" id="Page4diagnosis_15">15</td>
																				<td rowspan="2"><input id="Page4Morse_time_2" onclick="setMFRATime(2)" class="form-control input-SmallText TextFont" type="text" readonly="readonly" value="" ></td>
																			</tr>	
																			<tr><td >No</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="0" name="Page4diagnosis" id="Page4diagnosis_0">0</td>
																			</tr>
																			<tr><td rowspan="3"><b>Ambulatory AID</b></td>
																				<td >Fruiniture</td>
																				<td><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="30" name="Page4ambulatory" id="Page4ambulatory_30">30</td>
																				<td rowspan="3"><input id="Page4Morse_time_3" onclick="setMFRATime(3)" class="form-control input-SmallText TextFont" type="text" readonly="readonly" value="" ></td>
																			</tr>
																			<tr><td >Crutches / Can / Walker</td>
																				<td><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="15" name="Page4ambulatory" id="Page4ambulatory_15">15</td></td>
																			</tr>
																			<tr><td >None / BedRest / WheelChair / Nurse</td>
																				<td><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="0" name="Page4ambulatory" id="Page4ambulatory_0">0</td></td>
																			</tr>
																			<tr><td rowspan="2"><b>IV / Heparin Lock</b></td>
																				<td >Yes</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="20" name="Page4heparin" id="Page4heparin_20">20</td>
																				<td rowspan="2"><input id="Page4Morse_time_4" onclick="setMFRATime(4)" class="form-control input-SmallText TextFont" type="text" readonly="readonly" value="" ></td>
																			</tr>	
																			<tr><td >No</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="0" name="Page4heparin" id="Page4heparin_0">0</td>
																			</tr>
																			<tr><td rowspan="3"><b>Gait / Transferring</b></td>
																				<td >Impaired</td>
																				<td><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="20" name="Page4transferring" id="Page4transferring_20">20</td>
																				<td rowspan="3"><input id="Page4Morse_time_5" onclick="setMFRATime(5)" class="form-control input-SmallText TextFont" type="text" readonly="readonly" value="" ></td>
																			</tr>
																			<tr><td >Weak</td>
																				<td><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="10" name="Page4transferring" id="Page4transferring_10">10</td></td>
																			</tr>
																			<tr><td >Normal / BedRest / Immobile</td>
																				<td><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="0" name="Page4transferring" id="Page4transferring_0">0</td></td>
																			</tr>
																			<tr><td rowspan="2"><b>Mental Status</b></td>
																				<td >Forgets Limitations</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="15" name="Page4mental" id="Page4mental_15">15</td>
																				<td rowspan="2"><input id="Page4Morse_time_6" onclick="setMFRATime(6)" class="form-control input-SmallText TextFont" type="text" readonly="readonly" value="" ></td>
																			</tr>	
																			<tr><td >Oriented to own Ability</td>
																				<td ><input class="Page4morseScore" type="radio" onchange="setMorseScoreAndActionPage4()" value="0" name="Page4mental" id="Page4mental_0">0</td>
																			</tr>
																			<tr><td colspan="2"><b>Total Score</b></td>
																				<td><b><label id="Page4MorseScore" ></label></b></td>
																				<td></td>	<td></td>
																			</tr>
																		</tbody>
																	</table>
																	<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top:-21px;">
																	<caption style="background-color: #d9d9d9;"><b>Risk Level as per Score & Action</b></caption>
																		<tr style="background-color: #e8e8e8;">
																			<th class="col-md-3"><b>Score</b></th>
																			<th class="col-md-3"><b>Risk Level</b></th>
																			<th class="col-md-6">Action Plan</th></tr>
																		<tbody><tr>
																					<td><input id="Page4morseHighCheck" class="Page4MorseRiskLevel" type="checkbox" disabled="true" value="High" >45+ </td>	
																					<td>High Risk</td>
																					<td><label id="Page4morseHighLabel"><b> A - </b>Implement <b>High Risk</b> Fall<br>(side Rails)</label></td>
																				</tr><tr>	
																					<td><input id="Page4morseModerateCheck" class="Page4MorseRiskLevel" type="checkbox" disabled="true" value="Moderate" >25-44 </td>	
																					<td>Moderate Risk</td>
																					<td><label id="Page4morseModerateLabel"><b> B - </b>Implement <b>Standard Risk</b> Fall<br>(side Rails)</label></td>
																				</tr><tr>
																					<td><input id="Page4morseLowCheck" class="Page4MorseRiskLevel" type="checkbox" disabled="true" value="Low" >0-24 </td>	
																					<td>Low Risk</td>
																					<td><label id="Page4morseLowLabel"><b> C - </b>Good Basic Nursing Care</label></td>
																				</tr></tbody>	
																	</table>
																</div>
																<div class="col-md-12">
																	<table style="background-color: #d9d9d9; table-layout: 2px;">
																	<tr><th style="width: 80%;">
																		<h6><b>Braden Scale For Predicting Pressure Ulcer Risk</b>(Please Refer the Braden Scale and tick the Applicable Score)</h6>
																		<th>
																		<th style="width: 16%;">Time</th>
																		<th style="width: 4%;">
																			<button class="btn btn-xs btn-success" onclick="saveUlcerRiskScorePage4()" title="Save" data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i><input type="hidden" id="ulcerRiskScorePage4Id" value="0" style="display: none;" />
																		</th></tr>
																</table>
																<table class="table table-bordered table-condensed cf">
																	<tr style="background-color: #e8e8e8">
																		<th style="width: 15%;">Sensory Perception</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Mobility</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Activity</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 14%;">Moisture</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Friction /<br> Shear</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Nutrution</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 5%; background-color: #e8e8e8">Total <br>Score</th>
																	</tr>
																	<tbody id="ulcerRiskTablePage4" class="cf">
																	<tr>
																		<td>Completely Limited</td>
																		<td><input id="Page4senPer1" name="Page4SensoryPerception" class="Page4SensoryPerception" onchange="setBradenScorePage4()" value="1" type="radio"/>1</td>
																		<td>Completely Immobile</td>
																		<td><input id="Page4mobi1" name="Page4Mobility" class="Page4Mobility" onchange="setBradenScorePage4()" value="1" type="radio"/>1</td>
																		<td>Bed Rest</td>
																		<td><input id="Page4acti1" name="Page4Activity" class="Page4Activity" onchange="setBradenScorePage4()" value="1" type="radio"/>1</td>
																		<td>Always Moist</td>
																		<td><input id="Page4moi1" name="Page4Moisture" class="Page4Moisture" onchange="setBradenScorePage4()" value="1" type="radio"/>1</td>
																		<td>Problem</td>
																		<td><input id="Page4fs1" name="Page4Friction" class="Page4Friction" onchange="setBradenScorePage4()" value="1" type="radio"/>1</td>
																		<td>Very Poor</td>
																		<td><input id="Page4nutr1" name="Page4Nutrition" class="Page4Nutrition" onchange="setBradenScorePage4()" value="1" type="radio"/>1</td>
																		<td rowspan="4" style="width: 4%; background-color: #e8e8e8;"><center><label id="Page4totalBradenScore"></label></center></td>
																		</tr>
																		<tr>
																		<td>Very Limited</td>
																		<td><input id="Page4senPer2" name="Page4SensoryPerception" class="Page4SensoryPerception" onchange="setBradenScorePage4()" value="2" type="radio"/>2</td>
																		<td>Very Limited</td>
																		<td><input id="Page4mobi2" name="Page4Mobility" class="Page4Mobility" onchange="setBradenScorePage4()" value="2" type="radio"/>2</td>
																		<td>chair</td>
																		<td><input id="Page4acti2" name="Page4Activity" class="Page4Activity" onchange="setBradenScorePage4()" value="2" type="radio"/>2</td>
																		<td>Very Moist</td>
																		<td><input id="Page4moi2" name="Page4Moisture" class="Page4Moisture" onchange="setBradenScorePage4()" value=2" type="radio"/>2</td>
																		<td>Potential Problem</td>
																		<td><input id="Page4fs2" name="Page4Friction" class="Page4Friction" onchange="setBradenScorePage4()" value="2" type="radio"/>2</td>
																		<td>Probably Inadequate</td>
																		<td><input id="Page4nutr2" name="Page4Nutrition" class="Page4Nutrition" onchange="setBradenScorePage4()" value="2" type="radio"/>2</td>
																		</tr>
																		<tr>
																		<td>Slightly Limited</td>
																		<td><input id="Page4senPer3" name="Page4SensoryPerception" class="Page4SensoryPerception" onchange="setBradenScorePage4()" value="3" type="radio"/>3</td>
																		<td>Slightly Limited</td>
																		<td><input id="Page4mobi3" name="Page4Mobility" class="Page4Mobility" onchange="setBradenScorePage4()" value="3" type="radio"/>3</td>
																		<td>Walks Ocationally</td>
																		<td><input id="Page4acti3" name="Page4Activity" class="Page4Activity" onchange="setBradenScorePage4()" value="3" type="radio"/>3</td>
																		<td>Ocationally Moist</td>
																		<td><input id="Page4moi3" name="Page4Moisture" class="Page4Moisture" onchange="setBradenScorePage4()" value=3" type="radio"/>3</td>
																		<td>No Apparent Problem</td>
																		<td><input id="Page4fs3" name="Page4Friction" class="Page4Friction" onchange="setBradenScorePage4()" value="3" type="radio"/>3</td>
																		<td>Adequate</td>
																		<td><input id="Page4nutr3" name="Page4Nutrition" class="Page4Nutrition" onchange="setBradenScorePage4()" value="3" type="radio"/>3</td>
																		</tr>
																		<tr>
																		<td>No Impairment</td>
																		<td><input id="Page4senPer4" name="Page4SensoryPerception" class="Page4SensoryPerception" onchange="setBradenScorePage4()" value="4" type="radio"/>4</td>
																		<td>No Limitation</td>
																		<td><input id="Page4mobi4" name="Page4Mobility" class="Page4Mobility" onchange="setBradenScorePage4()" value="4" type="radio"/>4</td>
																		<td>Walks Frequently</td>
																		<td><input id="Page4acti4" name="Page4Activity" class="Page4Activity" onchange="setBradenScorePage4()" value="4" type="radio"/>4</td>
																		<td>Rarely Moist</td>
																		<td><input id="Page4moi4" name="Page4Moisture" class="Page4Moisture" onchange="setBradenScorePage4()" value=4" type="radio"/>4</td>
																		<td></td>
																		<td></td>
																		<td>Excellent</td>
																		<td><input id="Page4nutr4" name="Page4Nutrition" class="Page4Nutrition" onchange="setBradenScorePage4()" value="4" type="radio"/>4</td>
																		</tr>
																		<tr>
																			<td colspan="13" style="background-color: #e8e8e8;">
																			Risk Level as per Score &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="Page4lowRisk" name="Page4riskLevel" class="Page4riskLevel" value="1" type="checkbox" disabled="true"/>(15-16) <b>Low Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="Page4modRisk" name="Page4riskLevel" class="Page4riskLevel" value="2" type="checkbox" disabled="true"/>(13-14) <b>Moderate Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="Page4highRisk" name="Page4riskLevel" class="Page4riskLevel" value="3" type="checkbox" disabled="true"/>(10-12) <b>High Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="Page4vHighRisk" name="Page4riskLevel" class="Page4riskLevel" value="4" type="checkbox" disabled="true"/>(9 or Below) <b>Very High Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			</td>
																		</tr>
																		<tr>
																		<td colspan="13" rowspan="2">
																			<label>Action Plan :</label> 
																			<textarea style="width: 90%;" id="Page4actionPlanTA"></textarea>
																		</td>
																		</tr>
																	</tbody>
																</table>
																</div>
																<div class="col-md-12">
																	<table class="table table-bordered table-condensed header-fixed " >
																	<caption><h6><b>Nursing Care Plan</b></h6></caption>
																			<tr>	
																				<th ><center>Assessment</center></th>
																				<th ><center>Nursing Diagnosis</center></th>
																				<th ><center>Planning</center></th>
																				<th ><center>Implementation /<br>Intervention</center></th>
																				<th ><center>Evaluation /<br>Outcome</center></th>
																				<th >Status Of Insertions </th>
																				<th > 
																					<input type='hidden' value='0' id='NCP4nRow' />
																					<input type='hidden' value='0' id='RowCountNCP4' />
																					<input type='hidden' value='0' id='addRowCountNCP4' />
																					
																					<input id="savebtnNCP" class="btn editUserAccess btn-success btn-xs " type="button" value="Save" onclick="saveNursingCarePlanPage4()"/><br>
																					<input  class="btn editUserAccess btn-xs" type="button" onclick="toCreateRowNCP4()" value="+">
																					<input  class="btn editUserAccess btn-xs" type="button" onclick="toRemoveRowNCP4()" value="-">
																				</th>
																			</tr>	
																			</table>
																			
																			<table class="table table-bordered table-condensed header-fixed cf" >
																				<div class="col-md-12-1" id="nursingCarePlanTablePage4" style="margin-left:15px;"></div>
																			</table>
																<div id="StoredNursingCarePlanDataPage4" style="display: none;"></div>
																</div>
															</div>	
														</div>
													</div>				
												</div>
												<!-- End Code for #IPD_Initial_Assessment GUI -->

<div id="NursingIntialAssessment" class="tab-pane fade in">
													<div class="tabbable tabs-left col-md-12-1"
														style="margin-top: 0px; margin-left: 10px;">
															<ul id="NursingVerticalTab" class="nav nav-tabs"
															style="height: 150px;">
															<li><a href="#NursingAssessment1" onclick="fetchInitalNursingAssessment()"
																data-toggle="tab">Page 1</a></li>
															<li><a href="#NursingAssessment2"onclick="fetchInitalNursingAssessmentPageSecond()"
															 data-toggle="tab">Page2</a></li>
															 <li><a href="#NursingAssessment3" onclick="fetchInitalNursingAssessmentPagethree()"
															 data-toggle="tab">Page 3</a></li> 
														</ul>
																		<div class="tab-content">							
															<div id="NursingAssessment1"
																class="tab-pane active fade in col-md-10">
																<table class="table table-bordered table-condensed header-fixed "style="margin-top:40px;" >
																		<tbody>
																		<tr>
																		<td>
																			Date of Admission: 
																		<input type="text" id="date-pickForAdmission"																				name="date-pickMaterials"
																			onclick="displayCalendar(document.getElementById('date-pickForAdmission'),'dd/mm/yyyy',this)"
																				readonly="readonly" />
																		</td>
																		<td>
																		Recieved Time: 
																		<input type="text" id="recievedTime"
																		readonly="readonly" />
																		</td>
																		<td>
																		Assessement Time :
																		<input type="text" id="AssessementTime"
																		readonly="readonly" />
																		</td>
																		
																		<input type="button" onclick="saveInitalNursingAssessment()"
																			style="float: right; margin-top: 10px;" class="btn btn-xs btn-success editUserAccess"
																			value="Save " disabled="disabled"/>
																		
																		</tr>
																		 <tr>
																		<td colspan ="2">
																		<input type="checkbox" id="chkboxGenralConsentSigned"/>Genral Consent Signed:&nbsp;&nbsp;
																		<input type="checkbox" id="chkboxForIdBandTied"/>ID Band Tied:
																		</td>
																		</tr> 
																		</tbody>
																		</table>
																
																<table class="table table-bordered table-condensed header-fixed "style="margin-top:40px;" >
																		<tbody>
																		<tr>
																		<td colspan ="8">
																		Reason For Admission:&nbsp;&nbsp;
																<input type="radio" name = "ReasonOfAdmission" id="radioForEmergency" value="emergency"/>Emergency&nbsp;&nbsp;
																<input type="radio" name = "ReasonOfAdmission" id="radioForObeservation" value="obeservation"/>Obeservation&nbsp;&nbsp;
																<input type="radio" name = "ReasonOfAdmission" id="radioForFirst" value="firstTime""/>First Time&nbsp;&nbsp;
																<input type="radio" name = "ReasonOfAdmission" id="radioForContinuation" value="continuationofTreatment"/>Continuation of Treatment&nbsp;&nbsp;
																<input type="radio" name = "ReasonOfAdmission" id="radioForSupportive" value="supportiveTherapy"/>Supportive Therapy&nbsp;&nbsp;
																<input type="radio" name = "ReasonOfAdmission" id="radioForOther" value="admissionOther"/>Other&nbsp;&nbsp;
																		</td>
																		</tr>
																		<tr>
																		<td>
																		Temprature:
																<input type="text" id="Temprature1"class="form-control input-SmallText"/>*F&nbsp;&nbsp;
																		</td>
																		<td>
																		Pulse:
																<input type="text" id="Pulse"class="form-control input-SmallText"/>/min&nbsp;&nbsp;
																		</td>
																		<td>
																		RR:
																<input type="text" id="RR"class="form-control input-SmallText"/>/min&nbsp;&nbsp;
																		</td>
																		<td>
																		SpO2:
																<input type="text" id="SpO2"class="form-control input-SmallText" />%&nbsp;&nbsp;
																		</td>
																		<td>
																		BP:
																<input type="text" id="Bloodp1"class="form-control input-SmallText"/>/mg of Hg&nbsp;&nbsp;
																		</td>
																		<td>
																		Weight:
																<input type="text" id="Weight1"class="form-control input-SmallText"/>KG&nbsp;&nbsp;
																		</td>
																		<td>
																		Height:
																<input type="text" id="Height1"class="form-control input-SmallText"/>cm&nbsp;&nbsp;
																		</td>
																		<td>
																		Head Circumference(<5 yrsof age):
																<input type="text" id="Circumference1"class="form-control input-SmallText"/>
																		</td>
																		</tr>
																		</tbody>
																		</table>
															
															<table class="table table-bordered table-condensed header-fixed "style="margin-top:-21px;" >
																		<tbody>
																		<caption><h6><b>Vulnerability Assessement</b></h6></caption>
																				<th class="col-md-1-1">Sr. No.</th>
																				<th class="col-md-2-1">Category</th>
																				<th class="col-md-1-1">Yes</th>
																				<th class="col-md-2-1">Care to be Taken</th>
																				<th class="col-md-2-1">Yes</th>
																				<tr>
																				<td>
																				1
																				</td>
																				<td>
																				Physically Challenged
																				</td>
																				<td>
																				<input type="checkbox" id="cate1"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				<td>
																				Low Height bed/Side Rails provision
																				</td>
																				<td>
																				<input type="checkbox" id="care1"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				</tr>
																				
																				<tr>
																				<td>
																				2
																				</td>
																				<td>
																				Mentally Challenged/Mentally ill
																				</td>
																				<td>
																				<input type="checkbox" id="cate2"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				<td>
																				Nearer to Nursing Station
																				</td>
																				<td>
																				<input type="checkbox" id="care2"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				</tr>
																				
																				<tr>
																				<td>
																				3
																				</td>
																				<td>
																				Terminally ill
																				</td>
																				<td>
																				<input type="checkbox" id="cate3"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				<td>
																				Continous Monitoring
																				</td>
																				<td>
																				<input type="checkbox" id="care3"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				</tr>
																				
																				<tr>
																				<td>
																				4
																				</td>
																				<td>
																				Epileptic Fits
																				</td>
																				<td>
																				<input type="checkbox" id="cate4"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				<td>
																				Full Time Attedndent
																				</td>
																				<td>
																				<input type="checkbox" id="care4"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				</tr>
																				
																				<tr>
																				<td>
																				5
																				</td>
																				<td>
																				Immuno-compromised
																				</td>
																				<td>
																				<input type="checkbox" id="cate5"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				<td>
																				infection Control Precaution
																				</td>
																				<td>
																				<input type="checkbox" id="care5"class="form-control input-SmallText col-md-1-1"/>
																				</td>
																				</tr>
																				
																		</tbody>
															</table>
															
															
															<table class="table table-bordered table-condensed header-fixed ">
															<tr>
																	<td width="50%">
																		<img src="images/pain.jpg" style="height: 170px; width: 430px;"> 
																	
																	</td>
																	<td width="50%">
																		<label>Location of Pain:</label> 
																		<textarea style="width: 90%;" id="txtAreaPain"></textarea><br>
																		<label>Pain Score:</label> 
																		<input type = "text" style="width: 20%;" id="txtPainScore"></input>
																	</td>
															</tr>
															<tr>
																	<td>
																		 <label> Pressure Score</label>
																		 <input type="checkbox" id="chkboxPressureScorePresent">Present<br>
																	<table class="table table-bordered table-condensed header-fixed ">
																<tbody>
																<tr>
																	<td>
																<b>Stage</b>
																</td>
																<td>
																1
																</td>
																<td>
																2					
																</td>
																<td>
																3
																</td>
																<td>
																4
																</td>
																</tr>
																<tr>
																	<td>
																<b>Signs</b>
																</td>
																<td>
																Red Coloration
																</td>
																<td>
																Skin Break Only					
																</td>
																<td>
																Fat Exposed
																</td>
																<td>
																Muscle/Bone Exposed
																</td>
																</tr>
																
																<tr>
																	<td>
																Location
																</td>
																<td>
																<input type="text" id="txtlocation1" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																<td>
																<input type="text" id="txtlocation2" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																<td>
																<input type="text" id="txtlocation3" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																<td>
																<input type="text" id="txtlocation4" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																</tr>
																
																<tr>
																	<td>
																Stage
																</td>
																<td>
																<input type="text" id="txtStage1" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																<td>
																<input type="text" id="txtStage2" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																<td>
																<input type="text" id="txtStage3" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																<td>
																<input type="text" id="txtStage4" style="margin-top: 4px;"class="form-control input-SmallText col-md-12-1"/>
																</td>
																</tr>
																
																</tbody>
															</table>
															
															<table class="table table-bordered table-condensed header-fixed ">
																<tbody>
																<tr>
																<td width="100%">
																		<label>Pressure Ulcer Management:</label> 
																		<textarea style="width: 90%;" id="txtAreaUlcer"></textarea><br>
																		
																</td>
																</tr>
																</tbody>
															</table>
															
																	</td>
																	<td>
																		<label>Mark Location of wound</label> 
																		<img alt="" src="">
																		 
																		
																	</td>
															</tr>
															
															</table>
															
															<table class="table table-bordered table-condensed header-fixed ">
																<tbody>
																<tr>
																<td>
																<label>Mode of Movement:</label><input type="radio" name = "ModeofMovement" id="radioAmbulatory"value ="ambulatory">Ambulatory
																<input type="radio" name = "ModeofMovement" id="radioWheel" value ="wheelChair">Wheel Chair
																<input type="radio" name = "ModeofMovement" id="radioStrecher" value ="strecher">Strecher
																<label>Other</label><input type="text" style="margin-top: 4px;" id="txtOthermovement">	
																</td>
																</tr>
																
																<tr>
																<td>
																<label>Dependency:</label><input type="radio" name = "Dependency" id="radioIndependency"value ="independency">Independency
																<input type="radio"value ="partiallyIndependent" name = "Dependency" id="radioPartially"> Partially Independent
																<input type="radio"value ="completelyIndependent" name = "Dependency" id="radioCompletely">Completely Independent
																</td>
																</tr>
																
																<tr>
																<td>
																<label>Level of Consciousness:</label><input type="radio"value ="conscious" name = "LevelofConsciousness" id="radioConscious">Conscious
																<input type="radio" value ="semiconscious" name = "LevelofConsciousness" id="radioSemiConscious"> Semiconscious
																<input type="radio" value ="unconscious" name = "LevelofConsciousness" id="radioUnconscious">Unconscious
																<input type="radio" value ="oriented" name = "LevelofConsciousness" id="radioOriented">Oriented
																<input type="radio" value ="disoriented" name = "LevelofConsciousness" id="radioDisoriented">Disoriented
																</td>
																</tr>
																
																<tr>
																<td width="100%">
																		<label>Chief Complaints(as described by the patient) with duration:</label> 
																		<textarea style="width: 80%;" id="txtAreaChief"></textarea><br>
																		
																</td>
																</tr>
																<tr>
																<td width="100%">
																		<label>Present Medications:</label><br> 
																		<textarea style="width: 80%;" id="txtAreaMedications"></textarea><br>
																		
																</td>
																</tr>
																
																</tbody>
															</table>
															
														</div>
														
															<div id="NursingAssessment2"
																class="tab-pane fade in col-md-10">
																
																<table class="table table-bordered table-condensed header-fixed ">
															<tbody>
																<tr>
																<td>
																<label>Allergies:</label>
																<input type="checkbox" id="Food">Food
																<input type="checkbox" id="Medicines01">Medicines
																<input type="checkbox" id="chkOther01">
																<label>Other/Specify</label><input type="text" style="width: 50%;" id="txtSpecify">	
																<input type="checkbox" id="chkNotKnown">Not Known
																</td>
																<input type="button" onclick="saveInitalNursingAssessment2()"
																	style="float: right; margin-bottom: 5px;" class="btn btn-xs btn-success"
																	value="Save " />
																</tr>
																
														</tbody>
												</table>		
												
															<table class="table table-bordered table-condensed header-fixed ">
															<tbody>
																<tr>
																<td>
																<label>Birth History:</label><br>
																 <input type="checkbox" id="chkfullterm">Full Term &nbsp; &nbsp;
																  <input type="checkbox" id="chkPreterm">Pre Term &nbsp; &nbsp;
																  <input type="checkbox" id="chkBirthCry">Birth Cry &nbsp; &nbsp;
																</td>
																<td>
																<label>Delivery:</label><br>
																<input type="checkbox" id="chkNormalDelivery">Normal&nbsp; &nbsp; 
																<input type="checkbox" id="chkCeasarean">Ceasarean Section&nbsp; &nbsp; 
																<input type="checkbox" id="chkForceps">Forceps&nbsp; &nbsp; <br>
																<input type="checkbox" id="chkEpisiotomy">Episiotomy&nbsp; &nbsp; 
																<input type="checkbox" id="chkVaccum">Vaccum Pump Assisted&nbsp; &nbsp; 
																</td>
																</tr>
																<tr>
																<td colspan="2">
																<label>Immunization History:&nbsp; &nbsp;	</label>Completed <input type="checkbox" id="chkImmunization">
																Details if No.:-<input type="text" style="width: 50%;" id="txtDetailsIfNo">
																</td>
																</tr>
																<tr>
																<td>
																<label>Development History: (G&D as per page)</label><br>
																 <input type="checkbox" id="chkweght">Weight: &nbsp; &nbsp;
																 <input type="checkbox" id="chkHght">Height: &nbsp; &nbsp;
																<input type="checkbox" id="chkChestCircumference">Chest Circumference &nbsp; &nbsp; 
																</td>
																<td>
																Details if No:-
																<textarea style="width: 80%;" id="txtAreaDetailsifNo"></textarea>
																</td>																
																</tr>
																<tr>
																<td colspan="2">
																<label>Physical Assessment</label><br>
																<label>(place a check in areas of abnormality, if unable to assess indicate reason)</label>
																</td>
																</tr>
																<tr>
																<td colspan="2">
																<label>Eye, ENT &Implant:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<input type="checkbox" id="chkNoAbnormalityDetectedForEye">No Abnormality Detected
																&nbsp; &nbsp; <br>
																
																<input type="checkbox" id="chkImpaired">Impaired Vision: &nbsp; &nbsp;
																<input type="checkbox" id="chkLenses">Lenses: &nbsp; &nbsp;
																<input type="checkbox" id="chkSpectacles">Spectacles: &nbsp; &nbsp;
																<input type="checkbox" id="chkBlind">Blind: &nbsp; &nbsp;
																<input type="checkbox" id="chkDeaf">Deaf: &nbsp; &nbsp;
																<input type="checkbox" id="chkHearing">Hearing Aid: &nbsp; &nbsp;
																<input type="checkbox" id="chkChemo">Chemo port: &nbsp; &nbsp;
																<br>
																<input type="checkbox" id="chkOrthopedicImpl">Orthopedic Implants-Secify: &nbsp; &nbsp;
																<input type="text" style="width: 50%;" id="txtImplants"><br>
																<input type="checkbox" id="chkOthereye">Other(Specify)-&nbsp; &nbsp;
																<input type="text" style="width: 50%;" id="txtOthereye">
																
																</td>
																</tr>
																<tr>
																<td colspan="2">
																<label>Respiratory:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<input type="checkbox" id="chkAbnormalityRespiratory">No Abnormality Detected
																&nbsp; &nbsp; <br>
																<input type="checkbox" id="chkDyspnea">Dyspnea: &nbsp; &nbsp;
																<input type="checkbox" id="chkWheezes">Wheezes: &nbsp; &nbsp;
																<input type="checkbox" id="chkAsymmetric">Asymmetric: &nbsp; &nbsp;
																<input type="checkbox" id="chkCough">Cough: &nbsp; &nbsp;
																<input type="checkbox" id="chkSputum">Sputum(colour): &nbsp; &nbsp;
																<input type="text"style="width: 50%;"id="txtOtherRespiratory"><br>
																<input type="checkbox" id="chkOtherRespiratory">Other: &nbsp; &nbsp;
																</td>
																</tr>
																<tr>
																<td colspan="2">
																<label>Cardio Vascular:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<input type="checkbox" id="chkAbnormalityCardioVascular">No Abnormality Detected
																&nbsp; &nbsp; <br>
																
																<input type="checkbox" id="chkTachycardia">Tachycardia: &nbsp; &nbsp;
																<input type="checkbox" id="chkBradycardia">Bradycardia: &nbsp; &nbsp;
																<input type="checkbox" id="chkEdema">Edema: &nbsp; &nbsp;
																<input type="checkbox" id="chkFacial_Pedal">Facial/ Pedal: &nbsp; &nbsp;
																<input type="checkbox" id="chkSacral">Sacral: &nbsp; &nbsp;
																<input type="checkbox" id="chkGeneralized">Generalized: &nbsp; &nbsp;
																<input type="checkbox" id="chkCardioOther">Other: &nbsp; &nbsp;
																
																</td>
																</tr>
																<tr>
																<td colspan="2">
																<label>Gastrointestinal:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<input type="checkbox" id="chkAbnormalityGastrointestinal">No Abnormality Detected
																&nbsp; &nbsp; <br>
																
																<input type="checkbox" id="chkDistention">Distention: &nbsp; &nbsp;
																<input type="checkbox" id="chkRigidity">Rigidity: &nbsp; &nbsp;
																<input type="checkbox" id="chkDysphagia">Dysphagia: &nbsp; &nbsp;
																<input type="checkbox" id="chkDiarrhoea">Diarrhoea: &nbsp; &nbsp;
																<input type="checkbox" id="chkConstipation">Constipation: &nbsp; &nbsp;
																<input type="checkbox" id="chkLast">Last Bowel Movement: &nbsp; &nbsp;
																<input type="checkbox" id="chkGastrointestinalOther">Other: &nbsp; &nbsp;
																</td>
																</tr>
																
																<tr>
																<td colspan="2">
																<label>Genitourinary:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<input type="checkbox" id="chkAbnormalityGenitourinary">No Abnormality Detected
																&nbsp; &nbsp; <br>
																
																<input type="checkbox" id="chkDysuria">Dysuria: &nbsp; &nbsp;
																<input type="checkbox" id="chkHematuria">Hematuria: &nbsp; &nbsp;
																<input type="checkbox" id="chkHesitancy">Hesitancy: &nbsp; &nbsp;
																<input type="checkbox" id="chkFrequent">Frequent: &nbsp; &nbsp;
																<input type="checkbox" id="chkCatheter">On Catheter: &nbsp; &nbsp;
																<input type="checkbox" id="chkGenitourinaryOther">Other: &nbsp; &nbsp;<br>
																For Female:-&nbsp; &nbsp;&nbsp; &nbsp;
																
																<input type="checkbox" id="chkMenstrual">Menstrual History: &nbsp; &nbsp;
																<input type="checkbox" id="chkPregnancy">Pregnancy: &nbsp; &nbsp;
																<input type="checkbox" id="chkLMP">LMP: &nbsp; &nbsp;
																<input type="checkbox" id="chkGenitourinaryFemaleOther">Other: &nbsp; &nbsp;
																
																</td>
																</tr>
																
																<tr>
																<td colspan="2">
																<label>Neurology:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<input type="checkbox" id="chkAbnormalityNeurology">No Abnormality Detected
																&nbsp; &nbsp; <br>
																
																<input type="checkbox" id="chkComatose">Comatose: &nbsp; &nbsp;
																<input type="checkbox" id="chkSemi_Comatose">Semi-Comatose: &nbsp; &nbsp;
																<input type="checkbox" id="chkNeurologyParalysed">Paralysed: &nbsp; &nbsp;
																<input type="checkbox" id="chkSedated">Sedated: &nbsp; &nbsp;
																<input type="checkbox" id="chkLathargic">Lathargic: &nbsp; &nbsp;
																<input type="checkbox" id="chkConfused">Confused: &nbsp; &nbsp;
																<input type="checkbox" id="chkUnsteady">Unsteady: &nbsp; &nbsp;
																<input type="checkbox" id="chkNeurologyOther">Other: &nbsp; &nbsp;
																</td>
																</tr>
																
																<tr>
																<td colspan="2">
																<label>Skin & Extremities:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<input type="checkbox" id="chkAbnormalitySkin_Extremities">No Abnormality Detected
																&nbsp; &nbsp; <br>
																
																<input type="checkbox" id="chkProsthesis">Prosthesis: &nbsp; &nbsp;
																<input type="checkbox" id="chkSwelling">Swelling: &nbsp; &nbsp;
																<input type="checkbox" id="chkClubbing">Clubbing: &nbsp; &nbsp;
																<input type="checkbox" id="chkCyanosis">Cyanosis: &nbsp; &nbsp;
																<input type="checkbox" id="chkDeformity">Deformity: &nbsp; &nbsp;
																<input type="checkbox" id="chkPoor_Turgor">Poor Turgor: &nbsp; &nbsp;
																<input type="checkbox" id="chkSkin_ExtremitiesHot">Hot/Warm: &nbsp; &nbsp;
																<input type="checkbox" id="chkSkin_ExtremitiesCool">Cool: &nbsp; &nbsp;
																<input type="checkbox" id="chkSkin_ExtremitiesOther">Other: &nbsp; &nbsp;
																</td>
																</tr>
																<tr>
																<td colspan="2">
																<label>Referrals(other Than clinical specialties)requested by the Patient/Family:</label><br>
																<input type="checkbox" id="chkDiet11">Diet: &nbsp; &nbsp;
																<input type="checkbox" id="chkPhysiotherapy">Physiotherapy: &nbsp; &nbsp;
																<input type="checkbox" id="chkYoga">Yoga: &nbsp; &nbsp;
																<input type="checkbox" id="chkCounseler">Counseler: &nbsp; &nbsp;
																<input type="checkbox" id="chkReferralsPain_Management">Pain Management: &nbsp; &nbsp;
																<input type="checkbox" id="chkReferralsOther">Other: &nbsp; &nbsp;
																
																</td>
																</tr>
																<tr>
																<td colspan="2">
														<table class="table table-bordered table-condensed header-fixed ">
															<tbody>
																<tr>
																<td colspan="5">
																<label>Nursing Care Plan:</label>
																</td>
																</tr>
																<tr>
																<th>Assessemnt</th>
																<th>Nursing Diagnosis</th>
																<th>Planning</th>
																<th>Intervention</th>
																<th>Evaluation</th>
																</tr>
																<tr>
																<td>
																<textarea Style="widht:100%;" id="txtAreaAssessemntPlan"></textarea>
																</td>
																<td>
																<textarea Style="widht:100%;" id="txtAreaNursing_DiagnosisPlan"></textarea>
																</td>
																<td>
																<textarea Style="widht:100%;" id="txtAreaPlanningNursing"></textarea>
																</td>
																<td>
																<textarea Style="widht:100%;" id="txtAreaInterventionNursing"></textarea>
																</td>
																<td>
																<textarea Style="widht:100%;" id="txtAreaEvaluationPlan"></textarea>
																</td>
																</tr>
															</tbody>
														</table>
																</td>
																</tr>
														</tbody>
												</table>		
											</div>
											<div id="NursingAssessment3"
																class="tab-pane fade in col-md-10">
																
											<table class="table table-bordered table-condensed header-fixed ">
											<tbody>
												<tr>
												<td>
												<b>Assessment And Initiation:</b>
												<input type="button" onclick="saveRestraintAssessmentForm()"
																	style="float: right; margin-bottom: 5px;" class="btn btn-xs btn-success"
																	value="Save " />
												</td>
												</tr>
												<tr>
												<td>
												<input type="checkbox" id="chkBehaviourRestraint">Check behaviour that warrant use of restraint&nbsp;&nbsp;
												<input type="checkbox" id="chkIv">Attempting to remove tubes,lines,or IV's or dressing/Surgical wounds<br>
												<input type="checkbox" id="chkVoluntary">Voluntary or involuntary movement that may re injure a treated condition&nbsp;&nbsp;
												<input type="checkbox" id="chkUnfollowInstructions">Unable to follow directions or instruction&nbsp;&nbsp;
												<input type="checkbox" id="chkInitiationOthers">Others..
												</td>
												</tr>
												<tr>
												<td>
												<b>Less restrictive method tried or considered(check boxes that apply)</b>
												</td>
												</tr>
												<tr>
												<td>
												<input type="checkbox" id="chkVerbalIntervention">Verbal intervention(E.g. talk calmly,give one direction at a time, reasserance)&nbsp;&nbsp;
												<input type="checkbox" id="chkCompanionship">Companionship(E.g. family member, neighbour,friend)<br>
												<input type="checkbox" id="chkFrequentMonitoring">Frequent monitoring(E.g. place bed in direct view of nurse station)&nbsp;&nbsp;
												<input type="checkbox" id="chkcomfort">comfort measures(E.g. frequent toileting,pain control,positioning)<br>
												<input type="checkbox" id="chkReality">Reality orientation(E.g. explanation, glasses, hearing aids)&nbsp;&nbsp;
												<input type="checkbox" id="chkEnviromental">Enviromental intervention(E.g. reduce stimuli,decrease noise,reduce light,cover lines or tubes)<br>
												<input type="checkbox" id="chkRelaxation">Relaxation techniques(E.g. soft music, slow deep breathing, dim lights)<br>
												</td>
												</tr>
												<tr>
												<td>
												<b>Patient/Family Education</b>
												</td>
												</tr>
												<tr>
												<td>
												Family/informed of need for restraint and criteria for release<br>
												Name of person contacted: 
												<input type="text" style="width: 15%;" id="txtNameOfPersonContacted">&nbsp;&nbsp;&nbsp; 
												Relation with patient:
												<input type="text" style="width: 15%;" id="txtRelationWithPatient">&nbsp;&nbsp;&nbsp;	
												Time:
												<input type="text" id="TimeEducation"
												readonly="readonly" />&nbsp;&nbsp;&nbsp;
												</td>
												</tr>
												<tr>
												<td>
												<b>Type of Restraints used:</b>
												</td>
												</tr>
												</tbody>
											</table>
											<table class="table table-bordered table-condensed header-fixed ">
											<tbody>
												<tr>
												<td>
												Physical:<br>
												<input type="checkbox" id="chkSoftWrist">Soft wrist &nbsp;&nbsp;
												<input type="checkbox" id="chkSoftWristLeft">Left &nbsp;&nbsp;
												<input type="checkbox" id="chkSoftWristRight">Right &nbsp;&nbsp;
												<input type="checkbox" id="chkSoftWristBoth">Both <br>
												<input type="checkbox" id="chkSoftAnkle">Soft Ankle &nbsp;&nbsp;
												<input type="checkbox" id="chkSoftAnkleLeft">Left &nbsp;&nbsp;
												<input type="checkbox" id="chkSoftAnkleRight">Right &nbsp;&nbsp;
												<input type="checkbox" id="chkSoftAnkleBoth">Both &nbsp;&nbsp;
												</td>
												<td>
												Chemical:<input type="text" style="width: 50%;" id="txtChemical"><br>
												Drugs:<input type="text" style="width: 50%;" id="txtDrugs"><br>
												Dose:<input type="text" style="width: 50%;" id="txtDose"><br>
												</td>
												</tr>
												<tr>
												<td colspan = "2">
												<table class="table table-bordered table-condensed header-fixed ">
												<tbody>
												<tr>
												<td colspan = "3">
												<b>verbal order for Restraints:</b><br>
												Name:<input type="text" style="width: 30%;" id="txtRestraintsName">
												</td>
												</tr>
												<tr>
												<td>
												Consultant/Doctor:
												<input type="text" style="width: 50%;" id="txtConsultant_Doctor">
												</td>
												<td>
												Date:
												<input type="text" id="datePickForDoc"																				name="date-pickMaterials"
																			onclick="displayCalendar(document.getElementById('datePickForDoc'),'dd/mm/yyyy',this)"
																				readonly="readonly" />
												</td>
												<td>
												Time: 
												<input type="text" id="DocTme"readonly="readonly" />
												</td>
												</tr>
												<tr>
												<td>
												Primary Nurse:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<input type="text" style="width: 50%;" id="txtPrimaryNurse"><br>
												(Restraints initiated by)
												</td>
												<td>
												Date:
												<input type="text" id="datePickForNurse" name="date-pickMaterials"
												onclick="displayCalendar(document.getElementById('datePickForNurse'),'dd/mm/yyyy',this)"
																				readonly="readonly" />
												</td>
												<td>
												Time: 
												<input type="text" id="NurseTme"readonly="readonly" />
												</td>
												</tr>
												<tr>
												<td colspan = "3">
												<b>Attending consultant notified telephonically, if verbal order not obtained from the Attending Consultant.<br>
												(needed As Soon As Possible or within 12 Hours) </b>
												</td>
												</tr>
												</tbody>
												</table>
												</td>
												</tr>
												<tr>
												<td colspan = "2">
												<table class="table table-bordered table-condensed header-fixed ">
												<thead>
												<tr>
												<th>
												Time
												</th>
												<th>
												Name of Attending Consultant
												</th>
												<th>
												Notified by Primary Nurse Name 
												</th>
												<th>
												Duty Doctor's Name
												</th>
												<th>
												Duration<br>
												(not more than 24 hrs.)
												</th>
												<th>
												<input type="button" id ="removeRowForAssessment" style="float: right;"value="-" onclick="removeRowVBFR()"/>
												<input type="button" id ="addRowForAssessment" style="float: right;" value="+" onclick="createRowVBFR()"/>
													<input type="hidden" id="vbfrRow" value="0" />
                                                    <input type="hidden" id="RowCountvbfr" value="0" />
                                                    <input type="hidden" id="addRowCountvbfr" value="0" />
												</th>
												</tr>
												</thead>
												<tbody id="vbfrTableBody">
												</tbody>
												</table>
												</td>
												</tr>
												<tr>
												<td colspan="2">
												<b>#Staff intervention</b><br>
												(every 2 hours including assessment of need to continue to restraint and check for proper application)<br>
												<input type="checkbox" id="chkSkinCirculation" class="StaffInterventionClass" value="Skin Circulation" >Skin Circulation&nbsp;&nbsp;
												<input type="checkbox" id="chkNutritionHydration" class="StaffInterventionClass" value="Nutrition or hydration addressed">Nutrition or hydration addressed &nbsp;&nbsp;
												<input type="checkbox" id="chkEliminationAddressed" class="StaffInterventionClass" value="Elimination addressed">Elimination addressed &nbsp;&nbsp;
												<input type="checkbox" id="chkRestraintCheck" class="StaffInterventionClass" value="Restraint check for proper application">Restraint check for proper application <br>
												<input type="checkbox" id="chkRangeMotion" class="StaffInterventionClass" value="Range of motion">Range of motion&nbsp;&nbsp;
												<input type="checkbox" id="chkHygieneCare" class="StaffInterventionClass" value="Hygiene care">Hygiene care &nbsp;&nbsp;
												<input type="checkbox" id="chkVerbalInerac" class="StaffInterventionClass" value="Verbal interaction">Verbal interaction &nbsp;&nbsp;
												<input type="checkbox" id="chkPositionAdjus" class="StaffInterventionClass" value="Position adjusted">Position adjusted &nbsp;&nbsp;
												<input type="checkbox" id="chkSeeProgressNote" class="StaffInterventionClass" value="See progress note">See progress note&nbsp;&nbsp;
												<input type="checkbox" id="chkConsultantNoti" class="StaffInterventionClass" value="Consultant notified">Consultant notified &nbsp;&nbsp;<br>
												<input type="checkbox" id="chkExplanationGiven" class="StaffInterventionClass" value="Explanation given to patient or patient's relative">Explanation given to patient or patient's relative &nbsp;&nbsp;
												<input type="checkbox" id="chkCriteriaForRemoval" class="StaffInterventionClass" value="Criteria for removal discussed">Criteria for removal discussed <br>
												<input type="checkbox" id="chkOrderMet" class="StaffInterventionClass" value="Criteria for removal of restraint(In consultant order met)"> Criteria for removal of restraint(In consultant order met)&nbsp;&nbsp;
												<input type="checkbox" id="chkOrderNotMet" class="StaffInterventionClass" value="Criteria for removal of restraint(In consultant order not met)">Criteria for removal of restraint(In consultant order not met) &nbsp;&nbsp;
												<input type="checkbox" id="chkOtherRestraint" class="StaffInterventionClass" value="Other">Other &nbsp;&nbsp;
												</td>
												</tr>
												
												<tr>
												<td colspan = "2">
												<b>*Patient behaviour or Condition or Response</b><br>
												(To Be Documented 4 Hourly)<br>
												<input type="checkbox" id="chkAgitated" class="PatientBehavior" value="Agitated">Agitated&nbsp;&nbsp;
												<input type="checkbox" id="chkHallucinate" class="PatientBehavior" value="Hallucinated">Hallucinated &nbsp;&nbsp;
												<input type="checkbox" id="chkSelfInj" class="PatientBehavior" value="Self-Injury">Self-Injury&nbsp;&nbsp;
												<input type="checkbox" id="chkConfu" class="PatientBehavior" value="Confused">Confused&nbsp;&nbsp;
												<input type="checkbox" id="chkShouting" class="PatientBehavior" value="Shouting">Shouting&nbsp;&nbsp;
												<input type="checkbox" id="chkCooper" class="PatientBehavior" value="Co Operative">Co Operative&nbsp;&nbsp;
												<input type="checkbox" id="chkNonCooper" class="PatientBehavior" value="Non Cooperative">Non Cooperative&nbsp;&nbsp;
												<input type="checkbox" id="chkRestless" class="PatientBehavior" value="Restless">Restless&nbsp;&nbsp;<br>
												<input type="checkbox" id="chkCalm" class="PatientBehavior" value="Calm">Calm&nbsp;&nbsp;
												<input type="checkbox" id="chkDelirium" class="PatientBehavior" value="Delirium">Delirium&nbsp;&nbsp;
												<input type="checkbox" id="chkIncontinent" class="PatientBehavior" value="Incontinent">Incontinent&nbsp;&nbsp;
												<input type="checkbox" id="chkCriteriaSleeping" class="PatientBehavior" value="Sleeping">Sleeping&nbsp;&nbsp;
												<input type="checkbox" id="chkDisruptTherapies" class="PatientBehavior" value="Attempting to Disrupt Therapies">Attempting to Disrupt Therapies&nbsp;&nbsp;
												<input type="checkbox" id="chkOrderPatientBehaviour" class="PatientBehavior" value="Other">Other&nbsp;&nbsp;
												</td>
												</tr>
												<tr>
												<td colspan = "2">
												<table class="table table-bordered table-condensed header-fixed ">
												<thead>
												<tr>
												<th>
												Shift
												</th>
												<th>
												Time
												</th>
												<th>
												Behaviour*
												</th>
												<th>
												Intervention#
												</th>
												<th>
												Remarks
												</th>
												<th style="width: 81px;">
												<input type="button" id ="remRowAsse" style="float: right;"value="-" onclick="RowDeletion()"/>
												<input type="button" id ="addRowAsse" style="float: right;" value="+" onclick="RowAddition()"/>
												<input type="hidden" id="StaffInterventionRow" value="0" />
                                                <input type="hidden" id="RowCountStaffIntervention" value="0" />
                                                <input type="hidden" id="addRowCountStaffIntervention" value="0" />
												
												</th>
												</tr>
												</thead>
												<tbody id="StaffInterventionTableBody">
												</tbody>
												</table>
												</td>
												</tr>
												<tr>
												<td colspan = "2">
												<b>Complication Due to Restraint</b><br>
												<input type="checkbox" id="chkNonee">None&nbsp;&nbsp;
												<input type="checkbox" id="chkRednes">Redness &nbsp;&nbsp;
												<input type="checkbox" id="chkSwlng">Swelling&nbsp;&nbsp;
												<input type="checkbox" id="chkInjur">Injury&nbsp;&nbsp;
												<input type="checkbox" id="chkCompliPresScr">Pressure Score&nbsp;&nbsp;
												<input type="checkbox" id="chkComplicationBodyTemprature">Increased body temprature&nbsp;&nbsp;
												<input type="checkbox" id="chkComplicationOther">Other&nbsp;&nbsp;
												</td>
												</tr>
												<tr>
												<td colspan = "2">
												<b>Discontinuation of Restraint</b><br>
												Date:
												<input type="text" id="datePickFo"																				name="date-pickMaterials"
													onclick="displayCalendar(document.getElementById('datePickFo'),'dd/mm/yyyy',this)"
																				readonly="readonly" />&nbsp;&nbsp;&nbsp;&nbsp;
												
												Time: 
												<input type="text" id="Time010"readonly="readonly" />&nbsp;&nbsp;&nbsp;&nbsp;
												&nbsp;&nbsp;&nbsp;&nbsp;
												<input type="checkbox" id="chkTreatmenModif">Plan of treatment modified<br>
												Remarks:<br>
												<textarea style="width:50%;" id="txtAreaRemaar"></textarea>
												</td>
												</tr>
												</tbody>
												</table>
											</div>
															</div>
																	
												</div>
											</div>


<div id="PrePostChecklist" class="tab-pane fade">
													<div align="right">
														<input type="button" class="btn btn-xs btn-success" value="Save" id="saveId" onclick="savePrePostChecklistnew()">
													</div>
                                                 <table style="margin-top: 10px;" class="table table-striped table-bordered header-fixed cf " >
                                                 	<tr>
                                                 		<td colspan="4">
                                                 			<label>Diagnosis:</label>
                                                 			<input type="text" value="" id="diagnosisId">
                                                 			<label>Pre Time:</label>
                                                 			<!-- <input type="text" value="" id="preTimeId" onclick="displayCalendar(document.getElementById('preTimeId'),'dd/mm/yyyy',this);"> -->
                                                 			<input type="text" style="width:60px;" id="preTimeId" readonly="readonly"/>
                                                 		</td>
                                                 		<td colspan="4">
                                                 			<label>Planed Surgery: </label>
                                                 			<input type="text" value="" id="surgeryId">
                                                 			<label>Post Time:</label>
                                                 			<!-- <input type="text" value="" id="postTimeId" onclick="displayCalendar(document.getElementById('postTimeId'),'dd/mm/yyyy',this);"> -->
                                                 			<input type="text" style="width:60px;" id="postTimeId" readonly="readonly"/>
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td colspan="3">
                                                 			<label>Ward / ICU / OPD</label>
                                                 			<label>(While taking in OT)</label>
														</td>
                                                 		<td colspan="2" align="center">
                                                 			<label>PARTICULARS ( Check while applicable)</label>
                                                 	
                                                 		</td>
                                                 		<td colspan="3">
                                                 			<label>Pre Holding / OR</label>
                                                 			<label>(While sending out OT)</label>
														</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">Yes<br>
                                                 		<!-- <input type="radio" id="wardId1" value="Y" name="wardNameRadio" /> -->
                                                 		</td>
                                                 		<td style="width: 50px;">NO<br>
                                                 		<!-- <input type="radio" id="wardId2" value="N" name="wardNameRadio" /> -->
                                                 		</td>
                                                 		<td style="width: 50px;">N.A.<br>
                                                 		<!-- <input type="radio" id="wardId3" value="NA" name="wardNameRadio" /> -->
                                                 		</td>
                                                 		<td colspan="2" align="center"> Drug Allergies: NKDA <input type="checkbox" id="drugAllergiesId"> Allergies to <input type="checkbox" id="allergiesId">
                                                 		</td>
                                                 		<td  style="width: 50px;">Yes<br>
<!--                                                  		<input type="radio" id="icuId110" value="Y" name="icuNameRadio11" />
 -->                                                 		</td>
                                                 		<td  style="width: 50px;">NO<br>
                                                 		<!-- <input type="radio" id="icuId111" value="N" name="icuNameRadio11" /> -->
                                                 		</td>
                                                 		<td style="width: 50px;">N.A.<br>
                                                 		<!-- <input type="radio" id="icuId112" value="NA" name="icuNameRadio11" /> -->
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="bandId1" value="Y" name="bandNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="bandId2" value="N" name="bandNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="bandId3" value="NA" name="bandNameRadio" />
                                                 		</td>
                                                 		<td colspan="2" align="center"> ID Band tied; Patient Identification verified
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="IdentificationId1" value="Y" name="IdentificationName" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="IdentificationId2" value="N" name="IdentificationName" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="IdentificationId3" value="NA" name="IdentificationName" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="htId1"  value="Y" name="htNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="htId2" value="N" name="htNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="htId3" value="NA" name="htNameRadio" />
                                                 		</td>
                                                 		<td colspan="2" align="center"> Ht.:<input type="text" id="htId" value=""> cm; Wt.:<input type="text" id="wtId" value=""> Kg;
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="wtId1" value="Y" name="wtNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="wtId2" value="N" name="wtNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="wtId3" value="NA" name="wtNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="preOpId1" value="Y" name="preOpNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="preOpId2" value="N" name="preOpNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="preOpId3" value="NA" name="preOpNameRadio" />
                                                 		</td>
                                                 		<td><b>Pre Op</b><br> HR.:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="hrId" value=""> /min;&nbsp;&nbsp;&nbsp;PR.:<input type="text" id="prId" value=""> /min;<br>
                                                 		 SpO2.:<input type="text" id="spo2Id" value=""> %;  Temp.&nbsp;&nbsp;&nbsp;:<input type="text" id="tempId" value=""> <br>
                                                 		BP.:&nbsp;&nbsp;&nbsp;<input type="text" id="bpId" value="">&nbsp;&nbsp;/&nbsp;&nbsp;<input type="text" id="bpId3" value=""> /mm of Hg;
                                                 		</td>
                                                 		<td><b>Post Op</b><br> HR.:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="postHrId" value=""> /min;&nbsp;&nbsp;&nbsp;PR.:<input type="text" id="postId" value=""> /min;<br>
                                                 		 SpO2.:<input type="text" id="postSo2Id" value=""> %;  Temp.:&nbsp;&nbsp;&nbsp;<input type="text" id="postTempid" value=""> <br>
                                                 		BP.:&nbsp;&nbsp;&nbsp;<input type="text" id="postBpId" value="">&nbsp;&nbsp;/&nbsp;&nbsp;<input type="text" id="postBpId1" value=""> /mm of Hg;
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="preOperationId1" value="Y" name="preOperationNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="preOperationId2" value="N" name="preOperationNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="preOperationId3" value="NA" name="preOperationNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	
                                                 		<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="postId1" value="Y" name="postNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="postId2" value="N" name="postNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="postId3" value="NA" name="postNameRadio" />
                                                 		</td>
                                                 		<td>Oxygen&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="oxygenId1" value=""> L
                                                 		</td>
                                                 		<td>Oxygen&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="oxygenId12" value=""> L
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="icuId101" value="Y" name="icuNameRadio1" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="icuId102" value="N" name="icuNameRadio1" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="icuId103" value="NA" name="icuNameRadio1" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="surgeryId1" value="Y" name="surgeryNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="surgeryId2" value="N" name="surgeryNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="surgeryId3" value="NA" name="surgeryNameRadio" />
                                                 		</td>
                                                 		<td>Surgery / Procedure Consent Signed
                                                 		</td>
                                                 		<td>Surgical Safety Checklist Completed
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="surgicalID1" value="Y" name="surgicalNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="surgicalID2" value="N" name="surgicalNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="surgicalID3" value="NA" name="surgicalNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="specificId1" value="Y" name="specificNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="specificId2" value="N" name="specificNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="specificId3" value="NA" name="specificNameRadio" />
                                                 		</td>
                                                 		<td>Specific Surgery Consent Signed
                                                 		</td>
                                                 		<td>Post op Care orders written
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="specificId11" value="Y" name="specificCkNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="specificId12" value="N" name="specificCkNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="specificId13" value="NA" name="specificCkNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="consentId1" value="Y" name="wardCkNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="consentId2" value="N" name="wardCkNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="consentId3" value="NA" name="wardCkNameRadio" />
                                                 		</td>
                                                 		<td>Anesthesia Consent Signed
                                                 		</td>
                                                 		<td>Surgery Notes attached
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="consentId11" value="Y" name="consentNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="consentId12" value="N" name="consentNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="consentId13" value="NA" name="consentNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="anesthesiaId1" value="Y" name="anesthesiaNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="anesthesiaId2" value="N" name="anesthesiaNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="anesthesiaId3" value="NA" name="anesthesiaNameRadio" />
                                                 		</td>
                                                 		<td>Anesthesia Record - PAC completed
                                                 		</td>
                                                 		<td>Anesthesia Record completed
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="anesthesiaRecId1" value="Y" name="anesthesiaRecNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="anesthesiaRecId2" value="N" name="anesthesiaRecNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="anesthesiaRecId3" value="NA" name="anesthesiaRecNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="testId1" value="Y" name="testIdckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="testId2" value="N" name="testIdckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="testId3" value="NA" name="testIdckNameRadio" />
                                                 		</td>
                                                 		<td colspan="2"><b>Serology Results Available:</b><br>
                                                 		 <div class="col-md-12" style="margin-top:7px; margin-bottom:3px;">
                                                 			 <div class="col-md-2" ><b>Test</b></div>
                                                 			  <div class="col-md-1"><b>HIV</b></div>
                                                 			  <div class="col-md-1"><b>HBsAg</b></div>
                                                 			  <div class="col-md-1"><b>HCV</b></div>
                                                 			  <div class="col-md-1"><b>VDRL</b></div>
                                                 			  <div class="col-md-1"><b>MRSA</b></div>
                                                 		 </div>
                                                 		 <div class="col-md-12" style="margin-top:7px;">
                                                 			 <div class="col-md-2"><b>Positive</b></div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id="HivTestP" type="radio" class ="HivTestResult" name="HivTest" value="positive" >
															  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id="HBsAgTestP" type="radio" class ="HBsAgTestResult" name="HBsAgTest" value="positive" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id= "HCVTestP" type="radio" class ="HCVTestResult" name="HCVTest" value="positive" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id= "VDRLTestP" type="radio" class ="HCVTestResult" name="VDRLTest" value="positive" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id= "MRSATestP" type="radio" class ="HCVTestResult" name="MRSATest" value="positive" >
                                                 			  </div>
                                                 		 </div>
                                                 		 <div class="col-md-12" style="margin-top:7px;">
                                                 			 <div class="col-md-2"><b>Non Reactive</b></div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id="HivTestNR" type="radio" class ="HivTestResult" name="HivTest" value="nonReactive" >
															  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id="HBsAgTestNR" type="radio" class ="HBsAgTestResult" name="HBsAgTest" value="nonReactive" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 			 	 <input id= "HCVTestNR" type="radio" class ="HCVTestResult" name="HCVTest" value="nonReactive" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id= "VDRLTestNR" type="radio" class ="HCVTestResult" name="VDRLTest" value="nonReactive" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 				<input id= "MRSATestNR" type="radio" class ="HCVTestResult" name="MRSATest" value="nonReactive" >		  	
                                                 			  </div>
                                                 		 </div>
                                                 		 <div class="col-md-12" style="margin-top:7px;">
                                                 			 <div class="col-md-2"><b>Not Done</b></div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id="HivTestND" type="radio" class ="HivTestResult" name="HivTest" value="notDone" >
															  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id="HBsAgTestND" type="radio" class ="HBsAgTestResult" name="HBsAgTest" value="notDone" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id= "HCVTestND" type="radio" class ="HCVTestResult" name="HCVTest" value="notDone" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 			  	<input id= "VDRLTestND" type="radio" class ="HCVTestResult" name="VDRLTest" value="notDone" >
                                                 			  </div>
                                                 			  <div class="col-md-1">
                                                 				<input id= "MRSATestND" type="radio" class ="HCVTestResult" name="MRSATest" value="notDone" >		  	
                                                 			  </div>
                                                 		 </div>
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="testId11" value="Y" name="testIdNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="testId12" value="N" name="testIdNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="testId13" value="NA" name="testIdNameRadio" />
                                                 		</td>
                                                 	</tr>
													<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="RBSLId1" value="Y" name="RBSLNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="RBSLId2" value="N" name="RBSLNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="RBSLId3" value="NA" name="RBSLNameRadio" />
                                                 		</td>
                                                 		<td>RBSL&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="RBSLsId" value=""> at <input type="text" id="RBSLAtId" value="">
                                                 		</td>
                                                 		<td>RBSL&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="RBSLs1Id" value=""> at <input type="text" id="RBSLAt1Id" value="">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="RBSLId11" value="Y" name="RBSLckNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="RBSLId12" value="N" name="RBSLckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="RBSLId13" value="NA" name="RBSLckNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pathologyId1" value="Y" name="pathologyNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pathologyId2" value="N" name="pathologyNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pathologyId3" value="NA" name="pathologyNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Pathology reports available in the Case File
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="pathologyId11" value="Y" name="pathologyckNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="pathologyId12" value="N" name="pathologyckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pathologyId13" value="NA" name="pathologyckNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 <tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="labId1" value="Y" name="labNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="labId2" value="N" name="labNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="labId3" value="NA" name="labNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Lab Results Pending -
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="labId11" value="Y" name="labckNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="labId12" value="N" name="labckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="labId13" value="NA" name="labckNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="diagnosticId1" value="Y" name="diagnosticNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="diagnosticIdId2" value="N" name="diagnosticNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="diagnosticIdId3" value="NA" name="diagnosticNameRadio" />
                                                 		</td>
                                                 		<td colspan="2"><b>Diagnostic Reports & Films available in Case File.</b><br>
                                                 		<b>X-ray</b>&nbsp;&nbsp;<input type="checkbox" value="" id="XrayId"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>USG</b> &nbsp;&nbsp;<input type="checkbox" value="" id="USGId"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>CT</b>&nbsp;&nbsp;<input type="checkbox" value="" id="ctId"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <b>PET CT</b> &nbsp;&nbsp;<input type="checkbox" value="" id="petId"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>MRI</b>&nbsp;&nbsp;<input type="checkbox" value="" id="mriId"/>&nbsp;&nbsp;<b>Mammo</b>&nbsp;&nbsp;<input type="checkbox" value="" id="mammoId"/>&nbsp;&nbsp;<b>ECG</b>&nbsp;&nbsp;<input type="checkbox" value="" id="ecgId"/>&nbsp;&nbsp;<b>ECHO</b>&nbsp;&nbsp;<input type="checkbox" value="" id="echoId"/><br>
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="X-rayId1" value="Y" name="X-rayNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="X-rayId2" value="N" name="X-rayNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="X-rayId3" value="NA" name="X-rayNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="multipraId1" value="Y" name="multipraNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="multipraId2" value="N" name="multipraNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="multipraId3" value="NA" name="multipraNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Multipra Monitor
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="multiprackId11" value="Y" name="multiprackNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="multiprackId12" value="N" name="multiprackNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="multiprackId13" value="NA" name="multiprackNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="solidsId1" value="Y" name="solidsNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="solidsId2" value="N" name="solidsNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="solidsId3" value="NA" name="solidsNameRadio" />
                                                 		</td>
                                                 		<td>No solids after &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="icuId1" name="icuNameRadio" /><br>
                                                 		NO clear liquids after &nbsp;&nbsp;&nbsp;<input type="text" id="icuId2" name="icuNameRadio" />
                                                 		</td>
                                                 		<td>NBM Till f/o or For &nbsp;&nbsp;&nbsp;<input type="text" id="icuId3" name="icuNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="NBMId1" value="Y" name="NBMNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="NBMId2" value="N" name="NBMNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="NBMId3" value="NA" name="NBMNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pre-OpId1" value="Y" name="pre-OpNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pre-OpId2" value="N" name="pre-OpNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pre-OpId3" value="NA" name="pre-OpNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Pre-Operative Medicines Administered (see DMOR)
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="pre-OprId" value="NA" name=icuNameRadio111 />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="medicationId1" value="Y" name="medicationsNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="medicationId2" value="N" name="medicationsNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="medicationId3" value="NA" name="medicationsNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Medication Administration Record Updated
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="medicationId10" value="Y" name="medicationNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="medicationId20" value="N" name="medicationNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="medicationId31" value="NA" name="medicationNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="antibioticsId1" value="Y" name="antibioticsIdNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="antibioticsId2" value="N" name="antibioticsIdNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="antibioticsId3" value="NA" name="antibioticsIdNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">iv Antibiotics given (Time <input type="text" id="AB_Time" value=""> )
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="antibioticsckId1" value="Y" name="antibioticsCkNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="antibioticsckId2" value="N" name="antibioticsCkNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="antibioticsckId3" value="NA" name="antibioticsCkNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="skinId1" value="Y" name="skinNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="skinId2" value="N" name="skinNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="skinId3" value="NA" name="skinNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Skin Preparation done,surgery Site Marked
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="skinckId1" value="NA" name="icuNameRadio13" />
                                                 		</td>
                                                 	</tr><tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="radioId1" value="Y" name="radioNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="radioId2" value="N" name="radioNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="radioId3" value="NA" name="radioNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Enema Given at <input type="text" id="Enema_Time" value="">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="checkId1" value="Y" name="checkNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="checkId2" value="N" name="checkNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="checkId3" value="NA" name="checkNameRadio" />
                                                 		</td>
                                                 	</tr><tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="bloodArrangedId1" value="Y" name="bloodArrangedNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="bloodArrangedId2" value="N" name="bloodArrangedNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="bloodArrangedId3" value="NA" name="bloodArrangedNameRadio" />
                                                 		</td>
                                                 		<td colspan="2"><b>Blood Arranged:</b> Component Type <input type="text" id="componentType" value=""> 
                                                 		No of units<input type="text" id="componentUnit" value="">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="bloodArrangedCheckId1" value="Y" name="bloodArrangedCheckNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="bloodArrangedCheckId2" value="N" name="bloodArrangedCheckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="bloodArrangedCheckId3" value="NA" name="bloodArrangedCheckNameRadio" />
                                                 		</td>
                                                 	</tr><tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="BloodTransfusionId1" value="Y" name="BloodTransfusionNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="BloodTransfusionId2" value="N" name="BloodTransfusionNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="BloodTransfusionId3" value="NA" name="BloodTransfusionNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Blood Transfusion Consent signed
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="BloodTransfusionId31" value="Y" name="BloodNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="BloodTransfusionId32" value="N" name="BloodNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="BloodTransfusionId33" value="NA" name="BloodNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="TransfusedId1" value="Y" name="TransfusedNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="TransfusedId2" value="N" name="TransfusedNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="TransfusedIdId3" value="NA" name="TransfusedNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">No of Unit Transfused <input type="text" id="transfusedUnit" value="">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="TransfusedCheckId" value="Y" name="TransfusedCheckNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="TransfusedCheck2" value="N" name="TransfusedCheckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="TransfusedCheckId3" value="NA" name=TransfusedCheckNameRadio />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="prosthesisId1" value="Y" name="prosthesisNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="prosthesisId2" value="N" name="prosthesisNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="prosthesisId3" value="NA" name="prosthesisNameRadio" />
                                                 		</td>
                                                 		<td colspan="2">Prosthesis -<input type="text" id="ProsId" value="">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="prosthesisCheckId1" value="Y" name="prosthesisCheckNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="prosthesisCheckId2" value="N" name="prosthesisCheckNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="prosthesisCheckId3" value="NA" name="prosthesisCheckNameRadio"/>
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="dentureId11" value="Y" name="dentureNameRadio1" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="dentureId12" value="N" name="dentureNameRadio1" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="dentureId13" value="NA" name="dentureNameRadio1" />
                                                 		</td>
                                                 		<td colspan="2">Implants -<input type="text" id="ImplId" value="">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="ImplantsId1" value="Y" name="ImplantsNameRadio" />
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		<input type="radio" id="ImplantsId2" value="N" name="ImplantsNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="ImplantsId3" value="NA" name="ImplantsNameRadio" />
                                                 		</td>
                                                 	</tr><tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="dentureId1" value="Y" name="dentureNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="dentureId2" value="N" name="dentureNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="dentureId3" value="NA" name="dentureNameRadio" />
                                                 		</td>
                                                 		<td colspan="2"><input type="checkbox" value="" id="dentId"/>&nbsp;&nbsp;&nbsp;<b>Dentures</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" id="bridgeId"/>&nbsp;&nbsp;&nbsp;<b>Bridges</b>&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" id="spectId"/>&nbsp;&nbsp;&nbsp;<b>Spectacles</b>&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" id="contactlenseId"/>&nbsp;&nbsp;&nbsp;<b>Contact lenses</b>&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" id="harId"/><b>Hearing Aid rempved</b> -Handed over to family                                                 		
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="spectacleId" value="NA" name="spectaclesNameRadio" />
                                                 		</td>
                                                 	</tr><tr>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="jewlryId1" value="Y" name="jewlryNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="jewlryId2" value="N" name="jewlryNameRadio" />
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="jewlryId3" value="NA" name="jewlryNameRadio" />
                                                 		</td>
                                                 		<td colspan="2"><input type="checkbox" value="" id="jewId"/>&nbsp;&nbsp;&nbsp;<b>Jewlry</b>&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" id="haringId"/>&nbsp;&nbsp;&nbsp;<b>Hairpins</b>&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" id="wId"/>&nbsp;&nbsp;&nbsp;<b>Wig</b> etc. removed -Handed over to family
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		</td>
                                                 		<td  style="width: 50px;">
                                                 		</td>
                                                 		<td style="width: 50px;">
                                                 		<input type="radio" id="wigId" value="NA" name="wigNameRadio" />
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td colspan="3" style="width: 50px;">
                                                 		
                                                 		</td>
                                                 		<td colspan="2" class="center"><b>Name & Signature of Nurse </b>
                                                 		</td>
                                                 		
                                                 		<td colspan="3">
                                                 		
                                                 		</td>
                                                 	</tr>
                                                 	<tr>
                                                 		<td style="width: 50px;" colspan="3">Patient old file/films of radiology recived by OT Staff(if yes,ick nd mention the no.)
                                                 		
                                                 		</td>
                                                 		<td align="center"><input id="yesCheckId" type="checkbox">Yes   
                                                 		</td>
                                                 		<td align="center"><input id="yesCheckId1" type="checkbox">Yes    
                                                 		</td>
                                                 		<td colspan="3">Patient old file/films of radiology handed over to relative by OT Staff (if yes,ick nd mention the no.)
                                                 		
                                                 		</td>
                                                 	</tr>
                                                 	
										 </table>
										 </div>

<div id="ChemoOrderSheet" class="tab-pane fade">
													<div class="divide-20"></div>
													<!-- Page Search Header -->
													<div class="form-group Remove-Padding col-md-4-1"
														style="margin-top: -20px;">
														Date: <input id="date-pickForChemo" onchange="fetchChemoDetailSOnNurshing()" type="text" readonly="readonly" onclick="displayCalendar(document.getElementById('date-pickForChemo'),'dd/mm/yyyy',this)" name="date-pickChemo">
														<button type="button" id="HistoryChemo"onclick="getChemoInfoOnNurshing()"class="btn btn-xs btn-warning">History</button>
														<button  class="btn btn-xs btn-success" onclick="updateChemoDetailsOnNurshing();" 
															style="margin-left: 900px; margin-top: -50px;" title="Save" data-placement="left" data-toggle="tooltip">
                                                            <i class="fa fa-save"></i>
                                                         </button>
														
													</div>
													<!-- Page Search Header -->

													<div class="divide-10"></div>
													<div class="divide-10"></div>

													<div id="ChemoOrderSheetContent">
														<div id="ChemoOrderSheetTemp"></div>
													</div>

													<div id="ChemoOrderSheetSlaveTemp"
														style="padding-top: 0%; height: 80%;">
														
														<div id="ChemoOrdersheetAddTemp" class='col-md-12-1'
															style="margin: 0px;"></div>

														<input type='hidden' value='0' id='addChemoOrderRowCount' /> <input
															type='hidden' value='0' id='ChemoOrderRowCount' />
													</div>

												</div>
												
												<!-- Start Code For Care Plan UI -->
												
													<div id="CarePlan" class="tab-pane fade">

													<div class="col-sm-12-1"
														style="margin-top: -10px;padding: 3%; border: 2px solid #ddd; overflow-y: scroll; height: 300px; max-height: auto;">
														
														<div class="form-group Remove-Padding col-md-10-1">
														<label class="TextFont">Care Plan :</label>
														<textarea id="carePlanNotes" class="form-control" cols="10"
															rows="10" type="text"></textarea>
													</div>

														<div class="form-group Remove-Padding col-md-1-1"
															style="margin-top: -10px; padding-left: 20px;">
															<input id="carePlan"
																class="btn btn-xs btn-success editUserAccess"
																type="button" value="Save"
																onclick="saveNurshingCarePlan()">
														</div>

													</div>

												</div>
												
												<!-- End Code for Care Plan -->
												
												<!-- Start Code For Pain Scale UI -->
												
													<div id="PainScale" class="tab-pane fade">
                                                     <div class="col-sm-2-1" style="margin-top: 15px;">
                                                     <label class="TextFont">Pain Scale Date</label>
                                                     </div>
                                                     <div class="col-sm-3-1" style="margin-top: 15px;">
                                                     <input id="date-pick1" class="form-control input-SmallText" type="text" name="date-pick1" onchange="getNurshingPainScale()" value="23/04/2019" onclick="displayCalendar(document.getElementById('date-pick1'),'dd/mm/yyyy',this)" readonly="readonly">
                                                     </div>
                                                     <div class="col-sm-1-1" style="margin-top: 15px;">
                                                     <label class="TextFont">From :</label>
													 </div>
												     <div class="col-sm-1-1" style="margin-top: 15px;">
													<input id="fromDate" class="form-control input-SmallText" type="text" readonly="readonly" onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)" value="24/04/2019" onchange="" name="fromDate">
													</div>
													<div class="col-sm-1-1" style="margin-top: 15px;">
												    <label class="TextFont">To :</label>
													</div>
                                                   	<div class="col-sm-1-1" style="margin-top: 15px;">
                                                    <input id="toDate" class="form-control input-SmallText" type="text" readonly="readonly" onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)" value="24/04/2019" onchange="" name="toDate">
													</div>
                                                    <div id="ipdPrintBtn" class="col-sm-1-1" style="margin-top: 13px;">
                                                    <button class="btn btn-xs btn-warning" onclick="printNurshingPainScale()" data-placement="left" data-toggle="tooltip" title="print with header" data-original-title="Print ">Print</button>
                                                   </div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 0%;">
														<div class="divide-10"></div>
														<div class="col-sm-1-1" style="margin-top: 20px; margin-left:94%;">
															<div class="divide-10"></div>
																<button style="margin-left: 2px;" class="btn btn-xs btn-success"
																	id="ipdPainScale" data-toggle="tooltip"
																	data-placement=top title="Save Pain Scale "
																	onclick="saveNurshingPainScale()">
																	<i class="fa fa-save"></i>
																</button>
															</div>
														<table>
														<tbody>
														<tr>
														<td style="width:200px;">
																<b>Pain Assessment</b> (Wong Baker Pain Scale)<br>
																<img style="margin-top: 45px; height: 230px; width: 410px;" src="images/pain.jpg"><br>
																Pain Scale:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" style="margin-top: 25px;" onkeypress="return validateNumbers(event)" id="idPainMeasurementScaleOneDay">
																</td>
														</tr>
														<tr>
														<td>
														Acute:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" style="margin-top: 25px;" id="idAcute">
														
														Chronic:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" style="margin-top: 25px;" id="idChronic">
													
														Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" style="margin-top: 25px;" id="idLoc">
														</td>
														</tr>		
														</tbody>
														</table>
														
													</div>

												</div>
												
												<!-- End Code for Pain Scale -->

<div id="Upload_Document" class="tab-pane fade">
<!-- 													<form action="UploadFileServlet" id="fileUploadfrm" name="fileUploadfrm" enctype="multipart/form-data" method="post">
 -->	
 													<form method="post" enctype="multipart/form-data" name="fileUploadfrm" id="fileUploadform">
 												
 	<div class="centered">
													
															<div class="divide-10"></div>
															<div class="col-md-12-1" style="height: 50px;">
															<label class="col-md-2-1"
																style="margin-top: 3px; padding-left: 5px;">
																Select a File to Upload: </label> 
																<input type="file" name="uploadDocs" id="ifile" multiple="multiple"
																style="margin-top: 0px; cursor: pointer;" /><br />
																<input type="hidden" id="TRTiD" name="TRTiD" value="<%=request.getParameter("treatmentId")%>">
																<input type="hidden" id="PiD" name="PiD" value="0">
															</div>
															<div class="divide-10"></div>
															<div class="col-md-12-1" style="height: 50px;">
															<label class="col-md-2-1" style="margin-top: 3px; padding-left: 5px;">
																Comment: </label> 
																<textarea class="col-md-4-1" rows="2" cols="60" 
																style="width: 236px; height: 48px;" name="txtNotes" id="iNotes"  maxlength="120"></textarea>
															</div>
															<div class="divide-10"></div>
															<div class="col-md-4-1" style="height: 50px;">
															<label class="col-md-12-1" style="margin-top: 3px; padding-left: 5px;"></label>
															<button type="button" name="fileUp" 
																id="ifileUp" onclick="uploadDocument()" class="btn btn-xs btn-success editUserAccess"
																style=" margin-top: 3px; margin-left: 80px" disabled="disabled">Upload Document</button>
															</div>
														</div>
														</form>
														<br>
														
														<div class="divide-10"></div>
														<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1" >
																	<div class="form-group  box border col-md-12-1">
																		<!-- Start Header for New Edit Delete Option -->
																		<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">
																			 
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div id="divdocDispTable" style="margin-top: 0px;margin-top: 0px; height: 250px; overflow-y: scroll;" class="col-sm-12-1">
																			<table class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																				<thead>
																					<tr>
																						<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>
																						<th style="height: 21.5px; padding-left: 50px;" class="col-md-2-1"><div class="TextFont">Document</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Note</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">View / Delete</div></th>
																					</tr>
																				</thead>
																					<tbody id="docDispTable"></tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>

													<div id="IPD_Monitoring_Sheet" class="tab-pane fade in">
													<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 10px;">
														<ul id="ipdMonitoringSheetVerticalTab" class="nav nav-tabs"
															style="height: 150px;">
															<li><a data-toggle="tab" onclick="fetchDataForSheets('sheet1')"
																 href="#DayWise_Sheet1">Sheet 1</a></li>
															<li><a data-toggle="tab" onclick="fetchDataForSheets('sheet2')"
																 href="#DayWise_Sheet2">Sheet 2</a></li>
															<li><a data-toggle="tab"
																 href="#Monitoring_Graph" onclick="setVitalRecordGraph('Temp');">Temp Graph </a></li>
															<li><a data-toggle="tab"
																 href="#Monitoring_Graph" onclick="setVitalRecordGraph('Pulse');">Pulse Graph </a></li>
															<li><a data-toggle="tab"
																 href="#Monitoring_Graph" onclick="setVitalRecordGraph('Bp');">Bp Graph </a></li>
															<li><a data-toggle="tab"
																 href="#Monitoring_Graph" onclick="setVitalRecordGraph('Spo');">Spo Graph </a></li>
														</ul>

														<div class="tab-content col-md-10-1" style="margin-top: 15px;">
															<div id="DayWise_Sheet1" class="tab-pane fade in active col-md-12">
																<div class="divide-10"></div>
																<div class="col-md-6" >
																	<table style="margin-top:-21px;"  class="table table-bordered table-condensed header-fixed ">
																		<caption><h6><b>Patient Personal Hygiene Chart </b></h6></caption>
																		<thead class='cf'>
																			<tr><th style='width:30%;'>Procedure</th>
																				<th style='width:15%;'>Frequency</th>
																				<th style='width:15%;'>Time</th>
																				<th style='width:40%;'>Name & Sign of PN/ICN</th>
																			</tr>
																		</thead>	
																		<tbody id="HygieneTable1" class='cf'></tbody>
																	</table>
																	<table class="table table-bordered table-condensed header-fixed "
																		style="margin-top:-21px;" >
																		<tbody>
																			<tr><td style='width:30%;'>ICN Orders</td>
																				<td> <label id="totatCountOfFreq" ></label>
																					<input type="button" onclick="moveSelectedProcedures()" id="moveButton" value="Move"
																						class="btn btn-xs btn-success editUserAccess pull-right" disabled="disabled" /> </td>
																			</tr>
																		</tbody>
																	</table>
																</div>
																<div class="col-md-5" style="margin-top:5px;">
																	<input type="button" onclick="saveHygieneChart()"
																		class="btn btn-xs btn-success editUserAccess pull-right" id="saveButton"
																		value="Save" style="margin-right:-75px;"/>
																	<table class="table table-bordered table-condensed header-fixed " style="margin-left:30px;" >
																		<th> Shift </th>
																		<th> <center> Special Instruction/Order </center></th>
																		<tbody>
																			<tr><td style="height: 166px;"><label>Morning</label></td>
																				<td ><label id="morningInstructions"></label>
																				<textarea id="morningInstructionsTA" rows="3" style="width: 95%;margin-left:2%;"
																					 placeholder="Morning Instructions"></textarea>
																				<textarea id="icnOrdersMTA" placeholder="ICN Orders Morning" rows="2" 
																					style="width: 95%;margin-left:2%;margin-top:10px;"></textarea></td>
																				<div id="morningInstructionsData" style="display: none;"></div>
																			</tr>
																			<tr><td style="height: 166px;"><label>Afternoon /<br> Evening</label></td>
																				<td ><label id="eveningInstructions"></label>
																				<textarea id="eveningInstructionsTA" rows="3" style="width: 95%;margin-left:2%;"
																					 placeholder="Afternoon/Evening Instructions"></textarea>
																				<textarea id="icnOrdersETA" placeholder="ICN Orders Afternoon/Evening" rows="2" 
																					style="width: 95%;margin-left:2%;margin-top:10px;"></textarea></td>
																				<div id="eveningInstructionsData" style="display: none;"></div>
																			</tr>
																			<tr>
																				<td style="height: 166px;"><label>Night</label></td>
																				<td ><label id="nightInstructions"></label>
																				<textarea id="nightInstructionsTA" rows="3" style="width: 95%;margin-left:2%;" 
																					 placeholder="Night Instructions"></textarea>
																				<textarea id="icnOrdersNTA" placeholder="ICN Orders Night" rows="2" 
																					style="width: 95%;margin-left:2%;margin-top:10px;"></textarea>
																				</td>
																				<div id="nightInstructionsData" style="display: none;"></div>
																			</tr>

																		</tbody>
																	</table>
																</div>
																<div class="divide-10"></div>
																<div class="col-md-12-1" >
																		<table class="table table-bordered table-condensed header-fixed ">
																			<caption><h6><b>Invasive Site Care</b></h6></caption>
																				<th class="col-md-2-1">Line / Tube</th>
																				<th class="col-md-1-1">Site</th>
																				<th class="col-md-1-1">Date/Days</th>
																				<th class="col-md-2-1">Condition</th>
																				<th class="col-md-2-1">Action</th>
																				<th class="col-md-1-1">Change</th>
																				<th class="col-md-1-1">
																					<input id="addDiv" class="btn editUserAccess btn-xs" type="button" value="+" onclick="toCreateInvRow('RowCount')">
																					<input id="remDiv" class="btn editUserAccess btn-xs" type="button" value="-" onclick="toRemoveInvRow('RowCount')"></th>
																				<th class="col-md-1-1">IV Set:</th>
																				<th class="col-md-1-1">
																					<input id="saveInvasion" class="btn editUserAccess btn-success btn-xs" type="button" value="Save" onclick="saveInvasionSiteCare()">
																				 </th>
																				<tbody id="invasionSiteCareTable" class='cf' ></tbody>
																		</table>
																		<div id="StoredInvasionSiteCareData" style="display: none;"></div>
																	<div class="col-md-6" style="padding-left:0%;padding-right:0%;margin-top:-20px; ">
																		<table id="invasionSiteCareConditionTable" style="background-color: #e8e8e8;"
																			class="table table-bordered table-condensed header-fixed ">
																			<tr><td rowspan="2" class="col-md-4"><b>Condition</b></td>
																				<td colspan="4" >
																					<div  class="col-md-12" style="margin-top:2px;">
																						<input type="checkbox" id="checkCondition" class="checkCondition" name="Pain" value="pain" />Pain 
																						<input type="checkbox" id="checkCondition" class="checkCondition" style="margin-left:3px;" name="Redness" value="redness" />Redness
																						<input type="checkbox" id="checkCondition" class="checkCondition" style="margin-left:3px;" name="Swelling" value="swelling" />Swelling
																					</div>
																					<br><br>
																					<div class="col-md-12" style="margin-top:1px;">
																						<input type="checkbox" id="checkCondition" class="checkCondition" name="Dressing Loose" value="dressingLoose" />Dressing Loose																					
																						<input type="checkbox" id="checkCondition" class="checkCondition" style="margin-left:3px;" name="Dressing Intact" value="dressingIntact" />Dressing Intact
																					</div>
																					<br><br>
																					<div class="col-md-12" style="margin-top:1px;">
																						<input type="checkbox" id="checkCondition" class="checkCondition" name="Tissue Breakdown" value="tissueBreakdown" />Tissue Breakdown
																						<input type="checkbox" id="checkCondition" class="checkCondition" style="margin-left:4px;" name="OK" value="ok" />OK
																					</div>
																				</td>
																			</tr>	
																		</table>
																	</div>
																	<div class="col-md-6" style="padding-left:0%;padding-right:0%;margin-top:-20px;">
																		<table id="invasionSiteCareActionTable"
																			class="table table-bordered table-condensed header-fixed " style="background-color: #e8e8e8;">
																			<tr><td rowspan="2" class="col-md-4"><b>Action</b></td>
																				<td colspan="4" >
																					<div class="col-md-12" style="margin-top:1px;">
																						<input type="checkbox" id="checkAction" class="checkAction" name="Tape Secure" value="tapeSecure" />Tape Secure																					
																						<input type="checkbox" id="checkAction" class="checkAction" style="margin-left:3px;" name="Dressing Change" value="dressingChange" />Dressing Change
																					</div>
																					<br><br>
																					<div class="col-md-12" style="margin-top:1px;">
																						<input type="checkbox" id="checkAction" class="checkAction" name="Discontinue" value="discontinue" />Discontinue																					
																						<input type="checkbox" id="checkAction" class="checkAction" style="margin-left:3px;" name="Tube Change" value="tubeChange" />Tube Change
																					</div>
																					<br><br>
																					<div class="col-md-12" style="margin-top:1px;">
																						<input type="checkbox" id="checkAction" class="checkAction" style="margin-left:3px;" name="Remove" value="remove" />Remove
																					</div>
																				</td>
																			</tr>	
																		</table>
																	</div>
																</div>
																<div id="HygieneTable1Data" style="display: none;"></div>
																<div class="col-md-12-1" >
																	<table class="table table-bordered table-condensed header-fixed " >
																	<caption><h6><b>Nursing Care Plan</b></h6></caption>
																			<tr>	
																				<th ><center>Assessment</center></th>
																				<th ><center>Nursing Diagnosis</center></th>
																				<th ><center>Planning</center></th>
																				<th ><center>Implementation /<br>Intervention</center></th>
																				<th ><center>Evaluation /<br>Outcome</center></th>
																				<th >Status Of Insertions </th>
																				<th > 
																					<input type='hidden' value='0' id='NCPnRow' />
																					<input type='hidden' value='0' id='RowCountNCP' />
																					<input type='hidden' value='0' id='addRowCountNCP' />
																					
																					<input id="savebtnNCP" class="btn editUserAccess btn-success btn-xs " type="button" value="Save" onclick="saveNursingCarePlan()"/><br>
																					<input  class="btn editUserAccess btn-xs" type="button" onclick="toCreateRowNCP()" value="+">
																					<input  class="btn editUserAccess btn-xs" type="button" onclick="toRemoveRowNCP()" value="-">
																				</th>
																			</tr>	
																			</table>
																			
																			<table class="table table-bordered table-condensed header-fixed cf" >
																				<div class="col-md-12-1" id="nursingCarePlanTable" style="margin-left:15px;"></div>
																			</table>
																<div id="StoredNursingCarePlanData" style="display: none;"></div>
																<div class="divide-10"></div>
																<table class="table table-bordered table-condensed header-fixed " >
																	<caption><h6><b>Hand Hygiene Checklist during Procedure</b></h6></caption>
																				<th class="col-md-2">Procedure Name</th>
																				<th class="col-md-1">Done By</th>
																				<th class="col-md-3">Protocol Before Procedure</th>
																				<th class="col-md-3">Protocol After Procedure</th>
																				<th class="col-md-1">Name & Sign</th>
																				<th class="col-md-1">ICN Sign</th>
																				<th class="col-md-1">
																					<input class="btn editUserAccess btn-success btn-xs" type="button" value="Save" onclick="saveHandHygieneChecklist()"/><br>
																					<input class="btn editUserAccess btn-xs" type="button" value="+" onclick="toCreateRowHandHygiene()"/>
																					<input class="btn editUserAccess btn-xs" type="button" value="-" onclick="toRemoveRowHandHygiene()"/>
																					<input type="hidden" id="hhcdpRow" value="0" />
																					<input type="hidden" id="RowCountHHcdP" value="0" />
																					<input type="hidden" id="addRowCountHHcdP" value="0" />
																				</th>
																				<tbody  id="handHygieneChecklistTable" class='cf' >
																				</tbody>
																</table>
																</div>																
															</div>
															
															<div id="DayWise_Sheet2" class="tab-pane fade in col-md-11-1">
																<table style="background-color: #d9d9d9; table-layout: 2px;">
																	<tr><th style="width: 80%;">
																		<h6><b>Braden Scale For Predicting Pressure Ulcer Risk</b>(Please Refer the Braden Scale and tick the Applicable Score)</h6>
																		<th>
																		<th style="width: 16%;">Time</th>
																		<th style="width: 4%;">
																			<button class="btn btn-xs btn-success" onclick="saveUlcerRiskScore()" title="Save" data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i><input type="hidden" id="ulcerRiskScoreId" value="0" style="display: none;" />
																		</th></tr>
																</table>
																<table class="table table-bordered table-condensed cf">
																	<tr style="background-color: #e8e8e8">
																		<th style="width: 15%;">Sensory Perception</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Mobility</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Activity</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 14%;">Moisture</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Friction /<br> Shear</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 15%;">Nutrution</th>
																		<th style="width: 5%;">Score</th>
																		<th style="width: 5%; background-color: #e8e8e8">Total <br>Score</th>
																	</tr>
																	<tbody id="ulcerRiskTable" class="cf">
																	<tr>
																		<td>Completely Limited</td>
																		<td><input id="senPer1" name="SensoryPerception" class="SensoryPerception" onchange="setBradenScore()" value="1" type="radio"/>1</td>
																		<td>Completely Immobile</td>
																		<td><input id="mobi1" name="Mobility" class="Mobility" onchange="setBradenScore()" value="1" type="radio"/>1</td>
																		<td>Bed Rest</td>
																		<td><input id="acti1" name="Activity" class="Activity" onchange="setBradenScore()" value="1" type="radio"/>1</td>
																		<td>Always Moist</td>
																		<td><input id="moi1" name="Moisture" class="Moisture" onchange="setBradenScore()" value="1" type="radio"/>1</td>
																		<td>Problem</td>
																		<td><input id="fs1" name="Friction" class="Friction" onchange="setBradenScore()" value="1" type="radio"/>1</td>
																		<td>Very Poor</td>
																		<td><input id="nutr1" name="Nutrition" class="Nutrition" onchange="setBradenScore()" value="1" type="radio"/>1</td>
																		<td rowspan="4" style="width: 4%; background-color: #e8e8e8;"><center><label id="totalBradenScore"></label></center></td>
																		</tr>
																		<tr>
																		<td>Very Limited</td>
																		<td><input id="senPer2" name="SensoryPerception" class="SensoryPerception" onchange="setBradenScore()" value="2" type="radio"/>2</td>
																		<td>Very Limited</td>
																		<td><input id="mobi2" name="Mobility" class="Mobility" onchange="setBradenScore()" value="2" type="radio"/>2</td>
																		<td>chair</td>
																		<td><input id="acti2" name="Activity" class="Activity" onchange="setBradenScore()" value="2" type="radio"/>2</td>
																		<td>Very Moist</td>
																		<td><input id="moi2" name="Moisture" class="Moisture" onchange="setBradenScore()" value=2" type="radio"/>2</td>
																		<td>Potential Problem</td>
																		<td><input id="fs2" name="Friction" class="Friction" onchange="setBradenScore()" value="2" type="radio"/>2</td>
																		<td>Probably Inadequate</td>
																		<td><input id="nutr2" name="Nutrition" class="Nutrition" onchange="setBradenScore()" value="2" type="radio"/>2</td>
																		</tr>
																		<tr>
																		<td>Slightly Limited</td>
																		<td><input id="senPer3" name="SensoryPerception" class="SensoryPerception" onchange="setBradenScore()" value="3" type="radio"/>3</td>
																		<td>Slightly Limited</td>
																		<td><input id="mobi3" name="Mobility" class="Mobility" onchange="setBradenScore()" value="3" type="radio"/>3</td>
																		<td>Walks Ocationally</td>
																		<td><input id="acti3" name="Activity" class="Activity" onchange="setBradenScore()" value="3" type="radio"/>3</td>
																		<td>Ocationally Moist</td>
																		<td><input id="moi3" name="Moisture" class="Moisture" onchange="setBradenScore()" value=3" type="radio"/>3</td>
																		<td>No Apparent Problem</td>
																		<td><input id="fs3" name="Friction" class="Friction" onchange="setBradenScore()" value="3" type="radio"/>3</td>
																		<td>Adequate</td>
																		<td><input id="nutr3" name="Nutrition" class="Nutrition" onchange="setBradenScore()" value="3" type="radio"/>3</td>
																		</tr>
																		<tr>
																		<td>No Impairment</td>
																		<td><input id="senPer4" name="SensoryPerception" class="SensoryPerception" onchange="setBradenScore()" value="4" type="radio"/>4</td>
																		<td>No Limitation</td>
																		<td><input id="mobi4" name="Mobility" class="Mobility" onchange="setBradenScore()" value="4" type="radio"/>4</td>
																		<td>Walks Frequently</td>
																		<td><input id="acti4" name="Activity" class="Activity" onchange="setBradenScore()" value="4" type="radio"/>4</td>
																		<td>Rarely Moist</td>
																		<td><input id="moi4" name="Moisture" class="Moisture" onchange="setBradenScore()" value=4" type="radio"/>4</td>
																		<td></td>
																		<td></td>
																		<td>Excellent</td>
																		<td><input id="nutr4" name="Nutrition" class="Nutrition" onchange="setBradenScore()" value="4" type="radio"/>4</td>
																		</tr>
																		<tr>
																			<td colspan="13" style="background-color: #e8e8e8;">
																			Risk Level as per Score &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="lowRisk" name="riskLevel" class="riskLevel" value="1" type="checkbox" disabled="true"/>(15-16) <b>Low Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="modRisk" name="riskLevel" class="riskLevel" value="2" type="checkbox" disabled="true"/>(13-14) <b>Moderate Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="highRisk" name="riskLevel" class="riskLevel" value="3" type="checkbox" disabled="true"/>(10-12) <b>High Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			<input id="vHighRisk" name="riskLevel" class="riskLevel" value="4" type="checkbox" disabled="true"/>(9 or Below) <b>Very High Risk</b>&nbsp;&nbsp;&nbsp;&nbsp;
																			</td>
																		</tr>
																		<tr>
																		<td colspan="13" rowspan="2">
																			<label>Action Plan :</label> 
																			<textarea style="width: 90%;" id="actionPlanTA"></textarea>
																		</td>
																		</tr>
																	</tbody>
																</table>
																<div class="col-md-6">
																<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top: 10px;">
																	<caption style="background-color: #d9d9d9;"><h6><b>Glasgow Coma Scale (GCS)Score
																	<button class="btn btn-xs btn-success pull-right" data-toggle="tooltip" data-placement="left" title="Save" onclick="saveGlasgowComaScore()">
																		<i class="fa fa-save"></i></button></h6> 
																		<input type="hidden" id="glasgowComaScoreId" value="0" style="display:none; "/>
																	</caption>
																	<tr style="background-color: #e8e8e8;">
																		<th colspan="2"> Adult</th>
																		<th> Score</th>
																		<th> Time</th></tr>
																		<tbody>
																			<tr><td rowspan="4"><b>Eye <br>Opening <br>Response</td>
																				<td class="col-md-5-1">Spontaneously</td>
																				<td class="col-md-2-1"><input id="EyeOpenResponse4" name="EyeOpenResponse" class="ResponseScore" value="4" onchange="setGCSscoreNaction()" type="radio"/>4</td>
																				<td class="col-md-2-1"><input id="GCS_EOR_time_4" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('EOR',4)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">To Speech/Verbal Command</td>
																				<td class="col-md-2-1"><input id="EyeOpenResponse3" name="EyeOpenResponse" class="ResponseScore" value="3" onchange="setGCSscoreNaction()" type="radio"/>3</td>
																				<td class="col-md-2-1"><input id="GCS_EOR_time_3" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('EOR',3)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">To Pain</td>
																				<td class="col-md-2-1"><input id="EyeOpenResponse2" name="EyeOpenResponse" class="ResponseScore" value="2" onchange="setGCSscoreNaction()" type="radio"/>2</td>
																				<td class="col-md-2-1"><input id="GCS_EOR_time_2" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('EOR',2)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">No Reponse</td>
																				<td class="col-md-2-1"><input id="EyeOpenResponse1" name="EyeOpenResponse" class="ResponseScore" value="1" onchange="setGCSscoreNaction()" type="radio"/>1</td>
																				<td class="col-md-2-1"><input id="GCS_EOR_time_1" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('EOR',1)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td rowspan="5"><b>Best <br>Verbal <br>Response</td>
																				<td class="col-md-5-1">Oriented and Talks</td>
																				<td class="col-md-2-1"><input id="BestVerbalResponse5" name="BestVerbalResponse" class="ResponseScore" value="5" onchange="setGCSscoreNaction()" type="radio"/>5</td>
																				<td class="col-md-2-1"><input id="GCS_BVR_time_5" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BVR',5)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Disoriented and Talks</td>
																				<td class="col-md-2-1"><input id="BestVerbalResponse4" name="BestVerbalResponse" class="ResponseScore" value="4" onchange="setGCSscoreNaction()" type="radio"/>4</td>
																				<td class="col-md-2-1"><input id="GCS_BVR_time_4" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BVR',4)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Inappropriate Words</td>
																				<td class="col-md-2-1"><input id="BestVerbalResponse3" name="BestVerbalResponse" class="ResponseScore" value="3" onchange="setGCSscoreNaction()" type="radio"/>3</td>
																				<td class="col-md-2-1"><input id="GCS_BVR_time_3" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BVR',3)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Incomprehensible Sounds</td>
																				<td class="col-md-2-1"><input id="BestVerbalResponse2" name="BestVerbalResponse" class="ResponseScore" value="2" onchange="setGCSscoreNaction()" type="radio"/>2</td>
																				<td class="col-md-2-1"><input id="GCS_BVR_time_2" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BVR',2)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">No Reponse</td>
																				<td class="col-md-2-1"><input id="BestVerbalResponse1" name="BestVerbalResponse" class="ResponseScore" value="1" onchange="setGCSscoreNaction()" type="radio"/>1</td>
																				<td class="col-md-2-1"><input id="GCS_BVR_time_1" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BVR',1)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td rowspan="6"><b>Best <br>Motor <br>Response</td>
																				<td class="col-md-5-1">Obey Verbal Commands</td>
																				<td class="col-md-2-1"><input id="BestMotorResponse6" name="BestMotorResponse" class="ResponseScore" value="6" onchange="setGCSscoreNaction()" type="radio"/>6</td>
																				<td class="col-md-2-1"><input id="GCS_BMR_time_6" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BMR',6)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Localizes Pain</td>
																				<td class="col-md-2-1"><input id="BestMotorResponse5" name="BestMotorResponse" class="ResponseScore" value="5" onchange="setGCSscoreNaction()" type="radio"/>5</td>
																				<td class="col-md-2-1"><input id="GCS_BMR_time_5" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BMR',5)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Withdraws to Pain</td>
																				<td class="col-md-2-1"><input id="BestMotorResponse4" name="BestMotorResponse" class="ResponseScore" value="4" onchange="setGCSscoreNaction()" type="radio"/>4</td>
																				<td class="col-md-2-1"><input id="GCS_BMR_time_4" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BMR',4)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Decorticate</td>
																				<td class="col-md-2-1"><input id="BestMotorResponse3" name="BestMotorResponse" class="ResponseScore" value="3" onchange="setGCSscoreNaction()" type="radio"/>3</td>
																				<td class="col-md-2-1"><input id="GCS_BMR_time_3" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BMR',3)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">Decerebrate</td>
																				<td class="col-md-2-1"><input id="BestMotorResponse2" name="BestMotorResponse" class="ResponseScore" value="2" onchange="setGCSscoreNaction()" type="radio"/>2</td>
																				<td class="col-md-2-1"><input id="GCS_BMR_time_2" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BMR',2)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr><td class="col-md-5-1">No Reponse</td>
																				<td class="col-md-2-1"><input id="BestMotorResponse1" name="BestMotorResponse" class="ResponseScore" value="1" onchange="setGCSscoreNaction()" type="radio"/>1</td>
																				<td class="col-md-2-1"><input id="GCS_BMR_time_1" class="form-control input-SmallText TextFont" type="text" onclick="setGCSTimeforMain('BMR',1)" name="textfield" value="" readonly="readonly"></td>
																			</tr>
																			<tr style="background-color: #e8e8e8;">
																				<td rowspan="2" colspan="2"></td>
																				<td class="col-md-2-1"><b>Total Score</td>
																				<td class="col-md-2-1"><label id="GCSTotalScore" ></label></td>
																			</tr>
																			<tr style="background-color: #e8e8e8;">
																			<td class="col-md-2-1"><b>Action (A,B,C)</td>
																				<td class="col-md-2-1"><label id="GCSAction" ></label></td>
																			</tr>
																		</tbody>
																</table>
																<table class="col-md-12-1 table table-bordered table-condensed cf" style="margin-top:-20px;">
																	<tr>		<td rowspan="3" style="width: 20%;"><b>Action <br>Plan for <br>GCS Score</td>
																				<td class="col-md-3-1" style="width: 20%;"><b>GCS &lt; 8 </b></td>
																				<td class="col-md-7-1" style="width: 60%;"><b>A</b> - Inform Duty Dr. / Intensivist / Consultant / BSL / TPR / BP Monitoring / Consider Endotracheal Intubation </td>
																	</tr>
																	<tr>		<td class="col-md-3-1" style="width: 20%;"><b>GCS 8 - 12 </b></td>
																				<td class="col-md-7-1" style="width: 60%;"><b>B</b> - Consider Orpoharyngeal Airway / Nasopharyngeal Airway </td>
																	</tr>	
																	<tr>		<td class="col-md-3-1" style="width: 20%;"><b>GCS 12 - 15 </b></td>
																				<td class="col-md-7-1" style="width: 60%;"><b>C</b> - Observation </td>
																	</tr>		
																</table>
																</div><!-- 	Glasgow Coma div -->
																<div class="col-md-6">
																	<table class="col-md-12-1 table table-bordered table-condensed cf" style="margin-top: 10px;">
																		<caption style="background-color: #d9d9d9;"><h6><b>VIP Score And Action Taken</b></h6>
																		<!-- <button class="btn btn-xs btn-success pull-right" data-toggle="tooltip" data-placement="left" title="Save" onclick="saveVIPScoreAndActionTaken()">
																		<i class="fa fa-save"></i></button> --><input id="vipScoreId" type="hidden" value="0">
																		</caption>
																		<tr><th class="col-md-8"><b>Action Plan Selected </b></th>
																			<th class="col-md-4">
																			<select id ="vipDurationSelect" style="margin-top: 3px;" class="form-control input-SmallText TextFont col-md-10-1" onchange="" >
																				<option value="Select">-Select-</option>
																				<option value="morning">Morning</option>
																				<option value="evening">Evening</option>
																				<option value="night"  >Night</option>
																			</select><br>
																					<input class="btn btn-xs btn-success pull-right" type="button" value="save" onclick="saveVIPActionPlanTaken()" />
																					<input class="btn btn-xs btn-outline-warning pull-right" type="button" value="clear" onclick="clearVIPActionPlanTaken()" />
																					<input class="btn btn-xs btn-outline-success pull-right" type="button" value="set" onclick="setVIPActionPlanTaken()" />																					
																			</th>
																		</tr>
																		<tr style="height: 75px;">
																			<td><label id="vipDurationAction"><b></b></label></td>
																			<td><label id="vipDurationText"><b></b></label></td>
																		</tr>
																	</table>
																	<table class="col-md-12-1 table table-bordered table-condensed cf" style="margin-top: -20px;">
																		<tr style="background-color: #e8e8e8;">
																			<th class="col-md-5"><b>Assessment</b></th>
																			<th class="col-md-2"><b>Score</b></th>
																			<th class="col-md-5"><b>Action Plan</b></th>
																		</tr>
																		<tr >
																			<td class="col-md-5"><b>IV Site appears Healthy</b></td>
																			<td class="col-md-2"><input id="VIPScore0" name="VIPScore" class="VIPScore" 
																				value="0" onchange="setVIPscoreNaction()" type="radio"/>0</td>
																			<td class="col-md-5" id="VIPActonPlanfor0"><label ><b>A-Observation </b><br>(No Sign of Phlebitis)</td>
																		</tr>
																		<tr >
																			<td class="col-md-5"><b>Slight Pain or Redness near IV Site</b></td>
																			<td class="col-md-2"><input id="VIPScore1" name="VIPScore" class="VIPScore" 
																				value="1" onchange="setVIPscoreNaction()" type="radio"/>1</td>
																			<td class="col-md-5"><label id="VIPActonPlanfor1"><b>B-Observation Cannula</b><br>(Possibly First Sign of Phlebitis)</label></td>
																		</tr>
																		<tr >
																			<td class="col-md-5"><b>Pain, Redness, Swelling</b></td>
																			<td class="col-md-2"><input id="VIPScore2" name="VIPScore" class="VIPScore" 
																				value="2" onchange="setVIPscoreNaction()" type="radio"/>2</td>
																			<td class="col-md-5"><label id="VIPActonPlanfor2"><b>C-Resite Cannula</b><br>(Early Stage of Phelebitis)</label></td>
																		</tr>
																		<tr >
																			<td class="col-md-5"><b>Pain along path of Cannula, Redness & Swelling</b></td>
																			<td class="col-md-2"><input id="VIPScore3" name="VIPScore" class="VIPScore" 
																				value="3" onchange="setVIPscoreNaction()" type="radio"/>3</td>
																			<td class="col-md-5"><label id="VIPActonPlanfor3"><b>D-Resite Cannula+consider Treatment</b><br>(Medium Stage of Phlebitis)</label></td>
																		</tr>
																		<tr >
																			<td class="col-md-5"><b>Pain along path of Cannula, Redness, Swelling & Palpable Venous Cord</b></td>
																			<td class="col-md-2"><input id="VIPScore4" name="VIPScore" class="VIPScore" 
																				value="4" onchange="setVIPscoreNaction()" type="radio"/>4</td>
																			<td class="col-md-5"><label id="VIPActonPlanfor4"><b>E-Resite Cannula+consider Treatment</b><br>(Advanced Stage of Phlebitis OR start of Thrombophlebitis)</label></td>
																		</tr>
																		<tr >
																			<td class="col-md-5"><b>Pain along path of Cannula, Redness, Swelling, Palpable Venous Cord & Fever</b></td>
																			<td class="col-md-2"><input id="VIPScore5" name="VIPScore" class="VIPScore" 
																				value="5" onchange="setVIPscoreNaction()" type="radio"/>5</td>
																			<td class="col-md-5"><label id="VIPActonPlanfor5"><b>F-Resite Cannula+Initiate Treatment</b><br>(Advanced Stage of Thrombophlebitis)</label></td>
																		</tr>
																	</table>
																</div>
																<div class="col-md-12-1" >
																	<div class="col-md-6" >
																	<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top: 15px;">
																		<caption style="background-color: #d9d9d9;"><h6><b>Deep Vein Thrombosis Risk Score (DVT)
																			<button class="btn btn-xs btn-success pull-right" onclick="saveDVTScore()" title="Save" data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i></button></b></h6><input id="dvtScoreId" type="hidden" style="display: none;" value="0">
																		</caption>
																		<tr style="background-color: #e8e8e8;">
																			<th class="col-md-6"><b>Clinical Feature</b></th>
																			<th class="col-md-1"><b>Score</b></th>
																			<th class="col-md-2"><b>Time</b></th>
																			<th class="col-md-3"><b>Action Taken</b></th>
																		</tr>
																		<tr><td>Active Cancer<br>(Treatment on-going,within 6months,or palliative)</td>
																			<td><input id="clinicalFeature1" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_1" class="form-control input-SmallText TextFont" onclick="setTimeThroughId('#dvt_time_1')" type="text" readonly="readonly" name="textfield"></td>
																			<td rowspan="10"><label id="dvtActionLabel"></label></td>
																		</tr>
																		<tr><td>Paralysis,paresis,or recent plaster immobilization of the extremities</td>
																			<td><input id="clinicalFeature2" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_2" class="form-control input-SmallText TextFont" onclick="setTimeThroughId('#dvt_time_2')" type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>Recently bedridden for 3days or more or major surgery within 12weeks reqiuring general or regional anaesthesia</td>
																			<td><input id="clinicalFeature3" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_3" class="form-control input-SmallText TextFont" onclick="setTimeThroughId('#dvt_time_3')" type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>localized tenderness along the distribution of the deep venous system</td>
																			<td><input id="clinicalFeature4" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_4" class="form-control input-SmallText TextFont"  onclick="setTimeThroughId('#dvt_time_4')"type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>Entire leg swollen</td>
																			<td><input id="clinicalFeature5" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_5" class="form-control input-SmallText TextFont" type="text" onclick="setTimeThroughId('#dvt_time_5')" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>Calf swelling atleast 3cm larger than asymptomatic side.(measured 10cm below the tibial tuberosity)</td>
																			<td><input id="clinicalFeature6" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_6" class="form-control input-SmallText TextFont" onclick="setTimeThroughId('#dvt_time_6')" type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>Pitting oedema confined to the symptomatic leg</td>
																			<td><input id="clinicalFeature7" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_7" class="form-control input-SmallText TextFont"  onclick="setTimeThroughId('#dvt_time_7')"type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>Collateral superficial veins(non varicose)</td>
																			<td><input id="clinicalFeature8" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_8" class="form-control input-SmallText TextFont" onclick="setTimeThroughId('#dvt_time_8')" type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>Previously documented DVT</td>
																			<td><input id="clinicalFeature9" type="checkbox" value="1" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >1</td>
																			<td><input id="dvt_time_9" class="form-control input-SmallText TextFont" onclick="setTimeThroughId('#dvt_time_9')" type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td>An alternative diagnosis is atleast as likely as DVT(Baker's cyst,cellulitis,muscle damage,superficial venous thrombosis,post phlebitic syndrome,inguinal lymphadenopathy,external venous compression)</td>
																			<td><input id="clinicalFeature10" type="checkbox" value="-2" onclick="countDVTscore()" name="clinicalFeature" class="clinicalFeature" >-2</td>
																			<td><input id="dvt_time_10" class="form-control input-SmallText TextFont"  onclick="setTimeThroughId('#dvt_time_10')"type="text" readonly="readonly" name="textfield"></td>
																		</tr>
																		<tr><td><b>Total Score</b></td>
																			<td><label id="totalDVTScore"></label></td>
																			<td> </td><td> </td>
																		</tr>
																	</table>
																	<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top:-21px;">
																		<tr style="background-color: #e8e8e8;">
																			<th class="col-md-6"><b>DVT Risk Score Interpretation</b></th>
																			<th class="col-md-6">Action Plan</th></tr>
																		<tbody><tr>
																					<td><b>-2 to 0</b>(Low)</td>
																					<td><label id="DVTAPA"><b> A - </b>Observe</label></td>
																				</tr><tr>	
																					<td><b> 1 to 2</b>(Moderate)</td>
																					<td><label id="DVTAPB"><b> B - </b>Ambulation & DVT Stocking</label></td>
																				</tr><tr>
																					<td><b> 3 to 8</b>(High)</td>
																					<td><label id="DVTAPC"><b> C - </b>DVT Stocking,Inform Dr,Ambulation Prophylaxis<br>(Inj. Fragmin 5000unit OD)*</label></td>
																				</tr><tr>
																					<td><b> Above 8</b></td>
																					<td><label id="DVTAPD"><b> * - </b>Inj. Fragmin 5000unit OD (Subcutaneous)</label></td>
																				</tr></tbody>	
																	</table>
																</div>	
																<div class="col-md-6">
																	<table class="col-md-6 table table-bordered table-condensed cf" style="margin-top: 15px;"> 
																		<caption style="background-color: #d9d9d9;"><h6><b> Morse Fallen Risk Assessment
																		<button class="btn btn-xs btn-success pull-right" onclick="saveMFRAScore()" title="Save" data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i></button></b></h6></caption>
																		<tbody>
																			<input id="mfraScoreId" type="hidden" value="0" style="display: none;" >
																			<tr style="background-color: #e8e8e8;">
																				<th class="col-md-3"><b>Risk Factor#</b></th>
																				<th class="col-md-3"><b>Scale</b></th>
																				<th class="col-md-1"><b>Score</b></th>
																				<th class="col-md-2"><b>Time</b></th>
																				<th class="col-md-3"><b>Action Taken</b></th>
																			</tr>
																			<tr><td rowspan="2"><b>History of fall</b></td>
																				<td >Yes</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="25" name="historyOf" id="historyOf_25">25</td>
																				<td rowspan="2"><input id="Morse_time_1" class="form-control input-SmallText TextFont" 
																						onclick="setTimeThroughId('#Morse_time_1')"		type="text" readonly="readonly" value="" ></td>
																				<td rowspan="14"><label id="MorseActionLabel"></label></td>
																			</tr>	
																			<tr><td >No</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="0" name="historyOf" id="historyOf_0">0</td>
																			</tr>
																			<tr><td rowspan="2"><b>Secondary Diagnosis</b></td>
																				<td >Yes</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="15" name="diagnosis" id="diagnosis_15">15</td>
																				<td rowspan="2"><input id="Morse_time_2" class="form-control input-SmallText TextFont" 
																							onclick="setTimeThroughId('#Morse_time_2')"	type="text" readonly="readonly" value="" ></td>
																			</tr>	
																			<tr><td >No</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="0" name="diagnosis" id="diagnosis_0">0</td>
																			</tr>
																			<tr><td rowspan="3"><b>Ambulatory AID</b></td>
																				<td >Fruiniture</td>
																				<td><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="30" name="ambulatory" id="ambulatory_30">30</td>
																				<td rowspan="3"><input id="Morse_time_3" class="form-control input-SmallText TextFont" 
																							onclick="setTimeThroughId('#Morse_time_3')"	type="text" readonly="readonly" value="" ></td>
																			</tr>
																			<tr><td >Crutches / Can / Walker</td>
																				<td><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="15" name="ambulatory" id="ambulatory_15">15</td></td>
																			</tr>
																			<tr><td >None / BedRest / WheelChair / Nurse</td>
																				<td><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="0" name="ambulatory" id="ambulatory_0">0</td></td>
																			</tr>
																			<tr><td rowspan="2"><b>IV / Heparin Lock</b></td>
																				<td >Yes</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="20" name="heparin" id="heparin_20">20</td>
																				<td rowspan="2"><input id="Morse_time_4" class="form-control input-SmallText TextFont" 
																							onclick="setTimeThroughId('#Morse_time_4')"	type="text" readonly="readonly" value="" ></td>
																			</tr>	
																			<tr><td >No</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="0" name="heparin" id="heparin_0">0</td>
																			</tr>
																			<tr><td rowspan="3"><b>Gait / Transferring</b></td>
																				<td >Impaired</td>
																				<td><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="20" name="transferring" id="transferring_20">20</td>
																				<td rowspan="3"><input id="Morse_time_5" class="form-control input-SmallText TextFont" 
																							onclick="setTimeThroughId('#Morse_time_5')"	type="text" readonly="readonly" value="" ></td>
																			</tr>
																			<tr><td >Weak</td>
																				<td><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="10" name="transferring" id="transferring_10">10</td></td>
																			</tr>
																			<tr><td >Normal / BedRest / Immobile</td>
																				<td><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="0" name="transferring" id="transferring_0">0</td></td>
																			</tr>
																			<tr><td rowspan="2"><b>Mental Status</b></td>
																				<td >Forgets Limitations</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="15" name="mental" id="mental_15">15</td>
																				<td rowspan="2"><input id="Morse_time_6" class="form-control input-SmallText TextFont" 
																							onclick="setTimeThroughId('#Morse_time_6')"	type="text" readonly="readonly" value="" ></td>
																			</tr>	
																			<tr><td >Oriented to own Ability</td>
																				<td ><input class="morseScore" type="radio" onchange="setMorseScoreAndAction()" value="0" name="mental" id="mental_0">0</td>
																			</tr>
																			<tr><td colspan="2"><b>Total Score</b></td>
																				<td><b><label id="MorseScore" ></label></b></td>
																				<td></td>	<td></td>
																			</tr>
																		</tbody>
																	</table>
																	<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top:-21px;">
																	<caption style="background-color: #d9d9d9;"><b>Risk Level as per Score & Action</b></caption>
																		<tr style="background-color: #e8e8e8;">
																			<th class="col-md-3"><b>Score</b></th>
																			<th class="col-md-3"><b>Risk Level</b></th>
																			<th class="col-md-6">Action Plan</th></tr>
																		<tbody><tr>
																					<td><input id="morseHighCheck" class="MorseRiskLevel" type="checkbox" disabled="true" value="High" >45+ </td>	
																					<td>High Risk</td>
																					<td><label id="morseHighLabel"><b> A - </b>Implement <b>High Risk</b> Fall<br>(side Rails)</label></td>
																				</tr><tr>	
																					<td><input id="morseModerateCheck" class="MorseRiskLevel" type="checkbox" disabled="true" value="Moderate" >25-44 </td>	
																					<td>Moderate Risk</td>
																					<td><label id="morseModerateLabel"><b> B - </b>Implement <b>Standard Risk</b> Fall<br>(side Rails)</label></td>
																				</tr><tr>
																					<td><input id="morseLowCheck" class="MorseRiskLevel" type="checkbox" disabled="true" value="Low" >0-24 </td>	
																					<td>Low Risk</td>
																					<td><label id="morseLowLabel"><b> C - </b>Good Basic Nursing Care</label></td>
																				</tr></tbody>	
																	</table>
																</div>
																</div>
																<div class="col-md-12-1" >
																	<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top:10px;">
																		<caption style="background-color: #d9d9d9;"><h6><b>SAS Score
																			<button class="btn btn-xs btn-success pull-right" onclick="saveSASScoreAction()" title="Save" data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i></button></b></h6></caption>
																		<tr style="background-color: #e8e8e8;">	
																				<th class="col-md-9"><b>Action</b></th>
																				<th class="col-md-1"><b>Time</b></th>
																				<th class="col-md-1">
																					<input class="btn editUserAccess btn-xs" type="button" onclick="toCreateSASRow()" value="+">
																					<input class="btn editUserAccess btn-xs" type="button" onclick="toRemoveSASRow()" value="-"></th>
																				
																					<input type='hidden' value='0' id='SASnRow' />
																					<input type='hidden' value='0' id='RowCountSAS' />
																					<input type='hidden' value='0' id='addRowCountSAS' />
																		</tr>
																		<tbody id ="sasTable" ></tbody>
																		
																	</table>
																	<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top:-21px;" id="sasScoreTal">/*id="sasScoreTable*/
																		<caption style="background-color: #d9d9d9;"><h6><b>Score Key</b></h6></caption>
																		<tr >	<td><input id="scoreKey_s1" class="scoreKey" type="checkbox" onchange="" value="s1" name="scoreKey"><b>S1</b></td>
																				<td  class="col-md-11"><label id ="s1_label">Minimal or no reaponse to noxious stimuli,does not communicate or follow command</label></td>
																		</tr>
																		<tr >	<td><input id="scoreKey_s2" class="scoreKey" type="checkbox" onchange="" value="s2" name="scoreKey"><b>S2</b></td>
																				<td  class="col-md-11"><label id ="s2_label">Arrose to physical stimuli but does not communicate or follow commands,may move spontaneously</label></td>
																		</tr>
																		<tr >	<td><input id="scoreKey_s3" class="scoreKey" type="checkbox" onchange="" value="s3" name="scoreKey"><b>S3</b></td> 
																				<td  class="col-md-11"><label id ="s3_label">Difficult to arrose but awakens to verbal stimuli or gentle shaking,follows simple commands but drifts off again</label></td>
																		</tr>			
																		<tr >	<td><input id="scoreKey_s4" class="scoreKey" type="checkbox" onchange="" value="s4" name="scoreKey"><b>S4</b></td>
																				<td  class="col-md-11"><label id ="s4_label">Calm,easily arousable, follow commands</label></td>
																		</tr>			
																		<tr >	<td><input id="scoreKey_s5" class="scoreKey" type="checkbox" onchange="" value="s5" name="scoreKey"><b>S5</b></td>
																				<td  class="col-md-11"><label id ="s5_label">Anxious or physically agitated,calms to verbal instructions</label></td>
																		</tr>			
																		<tr >	<td><input id="scoreKey_s6" class="scoreKey" type="checkbox" onchange="" value="s6" name="scoreKey"><b>S6</b></td>
																				<td  class="col-md-11"><label id ="s6_label">Requiring restraint and frequent verbal reminding of limits,bitting ETT</label></td>
																		</tr>			
																		<tr >	<td><input id="scoreKey_s7" class="scoreKey" type="checkbox" onchange="" value="s7" name="scoreKey"><b>S7</b></td>
																				<td  class="col-md-11"><label id ="s7_label">Pulling at ET tube,trying to remove catheters,climbing over bedrails,striking at staff,thrashing side-to-side</label></td>
																		</tr>																		
																	</table>
																	<table class="col-md-12 table table-bordered table-condensed cf" style="margin-top:-21px;">
																		<caption style="background-color: #d9d9d9;"><h6><b>SAS Score</b></h6></caption>
																		<tr style="background-color: #e8e8e8;">	
																				<th><b>SAS Score</b></th>
																				<th class="col-md-10"><center><b>Action Plan for SAS Score</b></center></th>
																		</tr>
																		<tr>	<th><b>S1, S2</b></th>
																				<th class="col-md-10"><label id ="sasActionA" >Condition A - W/F Vitals/May need Intubation/Mechanical Ventilation</label></th>
																		</tr>
																		<tr>	<th><b>S3, S4</b></th>
																				<th class="col-md-10"><label id ="sasActionB" >Condition B - Ideal Sedation</label></th>
																		</tr>
																		<tr>	<th><b>S5, S6, S7</b></th>
																				<th class="col-md-10"><label id ="sasActionC" >Condition C - Call Intensivist/Consultant/Duty Dr.(Inj. Midaz 1-2mg/Inj. Serenace 1Amp IV Slowly/Apply Restraint Policy)</label></th>
																		</tr>
																	</table>
																</div>
															</div>
															<div id="Monitoring_Graph"
																class="tab-pane fade in col-md-12-1">
																<div class="divide-10"></div>
																<div class="modal-content">
																<div class="modal-header">
																	<div class="row">
																		<div class="col-md-4 col-xs-11">
																			<h3 class="modal-title" id="myModalLabel">Temprature Graph</h3>
																		</div>
																		<br> <br>
																	</div>
																	<div class="modal-body" id="tempModalGraph"
																		style="margin-bottom: -5%;">

																		<div class="row">
																			<div class="col-md-12">
																				<!-- BOX -->
																				<div class="box border blue">
																					<div class="box-title">
																						<h4>
																							<i class="fa fa-bars"></i>Temprature Graph
																						</h4>
																					</div>
																					<div class="box-body">
																						<div id="tempratureContainer"
																							style="height: 300px; width: 80%"></div>
																					</div>
																				</div>
																				<!-- /BOX -->
																			</div>
																		</div>

																	</div>
																	
																</div>
															</div>
															</div>
														</div>
													</div>				
												</div>

												<!-- Start Code for #IPD_Nursing_Chart GUI -->
												<div id="IPD_Nursing_Chart" class="tab-pane fade in active ">

													<div class="divide-20"></div>

													<!-- Page Search Header -->
													<div class="form-group Remove-Padding col-md-3-1"
														style="padding-left: 10px;">
														<label class="TextFont col-md-4-1">Select Date:</label> <input
															id="date-pick" name="date-pick"
															onclick="displayCalendar(document.getElementById('date-pick'),'dd/mm/yyyy',this)"
															class="form-control input-SmallText col-md-6-1"
															readonly="readonly"
															onchange="getIpdVitalList(),getNurchingChartDetails(),
															getListOfInputOutputDetails(),getPostIntensvisit()" />
														
													</div>

													<div class="form-group Remove-Padding col-md-4-1">
														<label class="TextFont col-md-4-1">Select Chart
															Type:</label> <select id="cType" name="cType"
															class="form-control input-SmallText TextFont col-md-6-1"
															onchange="setNurshingTemplateList(),setDefaultChartNamesOnNurshing()">
															<option value="Select">-Select-</option>
															<option selected="selected" value="NursingChart">Nursing
																Chart</option>
															<option value="4">INPUT</option>
															<option value="2">Intensivist</option>
															<option value="5">OUTPUT</option>
															<option value="1">Post Operation</option>
															<!-- <option value="6">Urine</option> -->
															<option value="3">VITALS</option>
														</select> <input type="hidden" id="idcTypeMast" value="0"
															name="idcTypeMast" />
													</div>

													<div class="form-group Remove-Padding col-md-2-1" id="save"
														style="margin-top: -19px;display: none;" >
														<input type="button" onclick="saveDIC()"
															class="btn btn-xs btn-success editUserAccess" id="saveButton"
															value="Save" disabled="disabled"/>
													</div>
													<div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: -20px;">
														<input type="button" onclick="toCreateDivForNurshing('RowCount')"
															value="+" id="addDivNC" class="editUserAccess" disabled="disabled"/> <input type="button"
															onclick="removeNurshingChartDetails('RowCount')" value="-"
															id="remDivNC" class="editUserAccess" disabled="disabled"/>
													</div>
													<!-- Page Search Header -->
													<!--Start Nurching Chart Div  -->
													<div id="nurshingChartDiv">
													<div class='col-sm-12-1'  >
														<table
															class='table table-condensed table-bordered table-stripped cf'
															style='margin-top: 10px;'>
															<thead class='cf'>
																<tr>
																	<th style='height: 21.5px; width: 18px;'><label
																		class='TextFont'>#</label></th>
																	<th style='height: 21.5px; width: 45px;'><label
																		class='TextFont'>Time</label></th>
																	<th style='height: 21.5px; width: 35px;'><label
																		class='TextFont'>HeadingNote</label></th>
																	<th style='height: 21.5px; width: 45px;'><label
																		class='TextFont'>Note</label></th>
																	<th style='height: 21.5px; width: 117px;'><label
																		class='TextFont'>Sign</label></th>
																</tr>
															</thead>
														</table>
													</div>
													<div class='col-sm-12-1'
														style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 300px; max-height: auto;'>
														<table class='table table-striped table-condensed cf' id='nurChartId1'>
															<tbody id='nurChartIdBody'>

															</tbody>
														</table>
													</div>
													</div>
													<!--  End Nurshing Chart  -->
													
													<div class="divide-10"></div>
													<div class="divide-10"></div>

													<div id="IPD_DICContent">
														<div id="chartAddTempNew"></div>
													</div>
                                           <!-- display none vitals by paras -->
													<div  id="chartSlaveTemp"
														style="padding-top: 0%; height: 80%;display: none;">
														<div id="times" class="table-multi-columns" class='col-sm-12-1'
															style='height: 400px; max-height: auto; overflow-x: auto'>
															<table
																class='table table-bordered table-striped table-condensed cf table-fixed'
																style='width: 300%; max-width: 500%;'>
																<thead>
																	<tr>
																		<th class='TextFont center' style='width: 30px;'>Sr</th>
																		<th class='TextFont center' style='width: 270px;'>Name</th>
																		<th class='TextFont center' style='width: 100px;'>8
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>9
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>10
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>11
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>12
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>1
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>2
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>3
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>4
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>5
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>6
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>7
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>8
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>9
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>10
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>11
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>12
																			pm</th>
																		<th class='TextFont center' style='width: 100px;'>1
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>2
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>3
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>4
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>5
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>6
																			am</th>
																		<th class='TextFont center' style='width: 100px;'>7
																			am</th>
																	</tr>
																</thead>
																<tbody id="vitalsbody">
																</tbody>

															</table>
														</div>

														<div id="chartAddTemp" class='col-md-12-1'
															style="margin: 0px;"></div>

														<input type='hidden' value='0' id='addRowCount' /> <input
															type='hidden' value='0' id='RowCount' />
													</div>

												</div>
												<!-- End Code for #IPD_Nursing_Chart GUI -->

												<!-- START INDENT GUI -->
												<div ID="INDENT" class="tab-pane fade">
													<form class="form-horizontal  col-md-12-1" method="get">

														<div class="form-group col-sm-1-1"
															style="margin-right: 2%;">
															<label for="exampleInputEmail1" class="TextFont">Doc
																No </label><input type="text"
																class="form-control input-SmallText" required="true"
																name="first" id="first" placeholder="Doc No">
														</div>
														<div class="form-group col-sm-1-1"
															style="margin-right: 2%;">
															<label for="exampleInputEmail1" class="TextFont">Indent
																Date </label><input id='popup_container2'
																onclick="displayCalendar(document.getElementById('popup_container2'),'dd-mm-yyyy',this)"
																readonly='readonly' name='dob' type='text'
																placeholder='Date' value=""
																class='form-control input-SmallText'> <input
																type="hidden" name="receivedFrom" value="nursingstation"
																id="receivedFrom">
														</div>
														<div class="form-group col-sm-1-1"
															style="margin-right: 2%;">
															<label for="exampleInputEmail1" class="TextFont">Item
																Short Code</label> <input type="text"
																class="form-control input-SmallText" name="emailID"
																id="email" placeholder="Code"></input>
														</div>

														<div class="form-group col-sm-1-1"
															style="margin-right: 2%; float: right;">
															<label for="exampleInputEmail1" class="TextFont">Fetch
																From Stock</label> <input type="checkbox"
																class="form-control input-SmallText"
																name="stockSelection" id="stockSelection"
																onclick="loadIndentPopUp()"></input>
														</div>

														<div id="Po_Pop_Up" class="modal fade in">
															<div class="modal-dialog" style="width: 1120px;">

																<div class="modal-content" class="col-md-12">
																	<div class="modal-header">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-calendar"></i>Indent Information
																			</h4>
																		</div>

																	</div>
																	<div class="modal-body">

																		<div class="tab-pane fade active in" id="OrderForm1">

																			<!-- Start Save DRR Section -->
																			<div style="padding-left: 30px;" class="col-sm-12-1">
																				
																				<div class="form-group col-sm-1-1"
																					style="margin-right: 2%;">
																					<label for="exampleInputEmail1" class="TextFont">Mrn
																						Date<b style="color: red;">*</b>
																					</label><input class="form-control input-SmallText" name=""
																						id="txtMRNDate" placeholder="Date">

																					<button type="button"
																						onclick="featchOrderFormByDate('indent')">Get
																						Data</button>

																				</div>

																			</div>
																			
																			<div style="padding-top: 10px;" class="col-md-12-1">
																				<div class="col-md-12-1">
																					<!-- Start Header for New Edit Delete Option -->
																			
																					<!-- End Header for New Edit Delete Option -->
																					<div style="margin-top: 0px;" class="col-sm-12-1">
																						<!--Start Table Heading -->
																						<table class="table table-condensed">
																							<thead>
																								<tr>
																									<th style="height: 21.5px;"
																										class="col-md-1-1 center"><div
																											class="TextFont">#</div></th>
																									<th style="height: 21.5px;"
																										class="col-md-2-1 center"><div
																											class="TextFont">Drug</div></th>
																									<th style="height: 21.5px;"
																										class="col-md-2-1 center"><div
																											class="TextFont">Prep.</div></th>
																									
																									<th style="height: 21.5px;"
																										class="col-md-2-1 center"><div
																											class="TextFont">Duration</div></th>


																									<th style="height: 21.5px;"
																										class="col-md-1-1 center"><div
																											class="TextFont">Select</div></th>
																								</tr>
																							</thead>
																						</table>
																						<!--End Table Heading -->

																						<!--Start Table Body -->
																						<div
																							style="overflow-y: scroll; height: 290px; maxheight: auto; margin-top: -21px;"
																							class="col-sm-12-1" id="flip-scroll">
																							<table class="table table-condensed">
																								<tbody id="orderFormContent1"></tbody>
																							</table>
																						</div>
																						<!--End Table Body -->
																						<input type="hidden" value="insert"
																							id="OFqueryType1"> <input type="hidden"
																							value="0" id="OFSlaveID1">
																					</div>
																				</div>
																			</div>


																		</div>


																	</div>
																	<!-- /BODY-->
																	<div class="modal-footer">

																		<div class="form-group col-md-7-1"
																			style="margin-top: 15px;">
																			<button type="button" class="btn btn-primary"
																				id="btnSubContractingMaterialIssueSave"
																				name="btnSubContractingMaterialIssueSave"
																				onclick="setIndentDetails()">Ok</button>
																			<button type="button" class="btn btn-default"
																				data-dismiss="modal">Cancel</button>
																		</div>
																	</div>
																</div>

															</div>
														</div>

														<div style="margin-top: 0px; margin-left: 2px;"
															class="col-md-12-1">
															<!-- BOX -->

															<div class="box border col-md-12-1">

																<div class="tabbable col-md-12-1">
																	<ul class="nav nav-tabs">
																		<li class="active"><a data-toggle="tab"
																			href="#ItemInfo"><i class="fa fa-user"></i> <span
																				class="hidden-inline-mobile">New Indent</span></a></li>

																		<li class=""><a data-toggle="tab"
																			href="#prevIndent"><i class="fa fa-user"></i> <span
																				class="hidden-inline-mobile"
																				onclick="previousIndentByTreatmentId()">Prev
																					Indent</span></a></li>


																	</ul>
																	<div class="divide-10"></div>
																	<div class="divide-10"></div>
																	<div class="divide-10"></div>
																	<form>
																		<div class="tab-content col-md-12-1">
																			<div id="ItemInfo" class="tab-pane fade in active "
																				style="overflow-x: auto;">

																				<div class="panel-body col-md-12-1">
																					<div style="padding-left: 12px;"
																						class="col-sm-12-1">
																						<div style="height: 85%; margin-left: 2%;">
																							<div
																								style='width: 95%; font-weight: bold; height: 200Px; overflow-y: scroll; border: 1px solid #436a9d;'>
																								
																								
																								<div class="col-md-12-1" style="margin-top: 15px;margin-left:0%;margin-bottom: 15px;">
																									<div class="col-md-3-1">Select Indent
																										Template</div>

																									<div class="col-md-9-1" id="selectIndentTemplateDiv"></div>
																								</div>
																								
																								
																								<button onclick="toCreateManualIndent()"
																									class="btn btn-xs btn-success" type='button'>Add
																									New</button>

																								<button value="_" class="btn btn-xs btn-danger"
																									style="margin: 7px;" onclick="toRemoveRow()"
																									type="button">-</button>
																								<table id="ItemInfoTable" cellpadding="0"
																									cellspacing="0" border="1"
																									class="table table-bordered table-striped table-condensed">
																									<thead>
																										<tr>
																											<th class="col-md-2-2 center">select</th>
																											<th class="col-md-2-2 center">#</th>
																											<th class="col-md-2-2 center">Product
																												Name</th>
																											<th class="col-md-2-2 center">Required
																												Quantity</th>
																											<th class="col-md-2-2 center">Total
																												Quantity</th>

																										</tr>
																									</thead>
																									<tbody id="ItemInfoList"
																										style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																										
																									</tbody>
																								</table>

																							</div>


																						</div>
																					</div>

																					<div class="form-group col-sm-2-1"
																						style="margin-left: 2%;">
																						<label for="exampleInputEmail1" class="TextFont">Total
																							Doc Qty </label><input type="text"
																							class="form-control input-SmallText"
																							name="totalDocQty" id="totalDocQty"
																							placeholder="Total Doc Qty">
																					</div>

																					<div class="form-group col-sm-2-1"
																						style="margin-left: 2%;">
																						<label for="exampleInputEmail1" class="TextFont">Select
																							Store </label> <select id='pharmaStoreId'
																							class='form-control input-SmallText' ><option
																								value="0">Main Store</option></select>
																					</div>

																					<div class=" col-sm-2-1"
																						style="margin-left: 2%; margin-top: 2%">
																						<input type="button"
																							onclick="savePharmacyIndent()"
																							class="btn btn-xs btn-success editUserAccess"
																							value="Generate Indent"  id="saveBtnIndent">
																					</div>
																				</div>
																			</div>
																			<div id="prevIndent" class="tab-pane fade "
																				style="overflow-x: auto;">
																				<table style="margin-top: 10px; width: 100%;"
																					class="table table-striped table-bordered header-fixed cf ">
																					<thead style="background: white;" class="cf">
																						<tr>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Sr.</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Indent
																									Date</div></th>

																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Status</div></th>

																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Store
																									Name</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Generated
																									From</div></th>

																							

																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>View</div></th>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Edit</div></th>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Print</div></th>		
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Cancel</div></th>
																						</tr>
																					</thead>
																					<tbody id='preIndentData'>

																					</tbody>
																				</table>

																			</div>

																		</div>


																	</form>
																	<!--/nikhil  -->
																</div>

															</div>
															<!-- /BOX -->
														</div>

													</form>
												</div>
												<!-- /BOX-->
												<!-- End Code for #indent GUI -->
												
												 <!-- START Code for #Drug Administration Sheet GUI (Date:-27 Sept 2016) -->

                                               <div id="DrugAdminSheet" class="tab-pane fade">

													<div class="divide-20"></div>

													<!-- Page Search Header -->
													<div class="form-group Remove-Padding col-md-3-1"
														style="padding-left: 10px;">
														<label class="TextFont col-md-4-1">Select Date:</label> <input
															id="date-pickDrug" name="date-pickDrug"
															onclick="displayCalendar(document.getElementById('date-pickDrug'),'dd/mm/yyyy',this)"
															class="form-control input-SmallText col-md-6-1"
															readonly="readonly"
															onchange="setDrugViewChartNew(),setDefaultChartNames(),getNurshingDrugAdministartionlist()" />
														
													</div>

													<div class="form-group Remove-Padding col-md-4-1">
														<label class="TextFont col-md-4-1">Select Chart
															Type:</label> 
															
															<select id="dType" name="dType"
															class="form-control input-SmallText TextFont col-md-6-1"
															onchange="setDrugViewChartNew(),setDefaultChartNames()">
															<option value="Select">-Select-</option>
															<option selected="selected" value="MedicineChart">Medicine
																Chart</option>
														
														</select> <input type="hidden" id="idcTypeMast" value="0"
															name="idcTypeMast" />
													</div>

													<div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: -20px;">
														<input type="button" onclick="toCreateDrugDiv('DrugRowCount')"
															value="+" id="addDrugDiv" /> <input type="button"
															onclick="removeNurshingChartDetails()" value="-"
															id="remDrugDiv" />
														<button  class="btn btn-xs btn-warning" onclick="NurshingDrugPopUp();" title="Print" data-placement="left" data-toggle="tooltip">
                                                            <i class="fa fa-print"></i>
                                                         </button>
													</div>
													<!-- Page Search Header -->

													<div class="divide-10"></div>
													<div class="divide-10"></div>

													<div id="DrugAdminSheetContent">
														<div id="DrugAdminSheetTemp"></div>
													</div>
													<div id="DrugAdminSheetSlaveTemp"
														style="padding-top: 0%; height: 80%;">
														
														<div id="DrugsheetAddTemp" class='col-md-12-1'
															style="margin: 0px;"></div>

														<input type='hidden' value='0' id='addDrugRowCount' />
														 <input type='hidden' value='0' id='DrugRowCount' />
														<input type='hidden' value='0' id='addDrugRowCount1' />  
													</div>

												</div>
												<!-- Start Code for #IPD_Materials GUI -->
												<div id="IPD_Materials" class="tab-pane fade">

													<div class="divide-10"></div>
													<div class="divide-10"></div>
													<!-- Page Search Header -->
													<div class="form-group Remove-Padding col-md-12-1"
														style="padding-left: 10px;">
														<label class="TextFont col-md-2-1">Previous
															Investigation:</label> <input type="text" id="date-pickMaterials"
															class="form-control input-SmallText col-md-2-1"
															name="date-pickMaterials" value="<%=todays_date1%>"
															onclick="displayCalendar(document.getElementById('date-pickMaterials'),'dd/mm/yyyy',this)"
															onchange="setPatientMaterialUsed('materialOnchange')"
															readonly="readonly" />

														<div class="form-group Remove-Padding col-md-1-1"
															style="margin-top: -12px; padding-left: 20px;">
															<input type="button" onclick="saveMaterialUsed()"
																class="btn btn-xs btn-success editUserAccess" id="saveMaterialUsed"
																value="Save Materials" disabled="disabled"/>
														</div>

														<div class="form-group Remove-Padding col-md-1-1"
															style="margin-top: -12px; float: right">
															<input type="button" onclick="toCreateDivM()" value="+" class="editUserAccess" disabled="disabled"/>
															<input type="button" onclick="toRemoveDivMat()" value="-" class="editUserAccess" disabled="disabled"/>
														</div>

													</div>
													<!-- Page Search Header -->
													<div class="divide-10"></div>
													<div class="divide-10"></div>

													<div id="IPD_MaterialContent">
														<input type='hidden' name='mid' id='mid' value='0' />
													</div>
												</div>
												<!-- End Code for #IPD_Materials GUI -->

												<!-- Start Code for #IPD_Services GUI -->
												<div id="IPD_Services" class="tab-pane fade in">

													<div class="tabbable tabs-left col-md-12-1"
														style="margin-top: 0px; margin-left: 10px;">
													<ul id="ipdServicesVerticalTab" class="nav nav-tabs"
															style="height: 150px;">
															<li id="Bed_Side_ProceduresTab"class="active"><a href="#Bed_Side_Procedures"
																	data-toggle="tab" onclick="clearData('Bed_Side'),fetchIpdServicesOnNurshing(<%=BedsideProcedure%>)">Bed Side Procedures</a></li>
															<li id="Gases_and_MonitorsTab"><a href="#Gases_and_Monitors" data-toggle="tab" onclick="clearData('Gases'),fetchIpdServicesOnNurshing(<%=GasesAndMonitors%>)">Gases
																	and Monitors</a></li>
															<li id="Instruments_and_EquipmentsTab"><a href="#Instruments_and_Equipments"
																data-toggle="tab" onclick="clearData('Instruments'),fetchIpdServicesOnNurshing(<%=InstrumentsAndEquipments%>)">Instruments and Equipments</a></li>
														</ul>
														<div class="tab-content col-md-10-1"
															style="margin-top: 5px;">
															
															<!-- Start Code for #Bed_Side_Procedures GUI -->
															<div id="Bed_Side_Procedures"
																class="tab-pane fade in active col-md-11-1">
																<div class="divide-10"></div>
																<div class="divide-10"></div>
																<label id="bsp"
																	style="text-align: center; background-color: lightblue; margin-top: -15px;"
																	class="form-group Remove-Padding col-md-12-1">Bed
																	Side Procedures</label>

																<!-- Page Search Header -->
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 22px;">
																	<div class="form-group Remove-Padding col-md-5-1"
																		id="divtxtEqNameb1" style="padding-left: 7px">
																		<label class="TextFont">Item:</label>
																	<!-- old -->	
																	<!--new  -->
																		<input
																			id="txtEqNameb1" name="txtEqNameb1" type="text"
																			onkeypress="return validatealphabetic(event)"  onkeyup="setnursingservices1(this.id,6)" 
																			class="typeahead form-control input-SmallText" /> 	
																			
																			<input
																			type="hidden" id="txtEqNameb1TestID" value="" /> <input
																			type="hidden" id="txtEqNameb1AssignedBy" value="0" />
																	</div>
																	<div class="form-group Remove-Padding col-md-4-1"
																		style="padding-left: 7px">
																		<label class="TextFont">Quantity:</label> <input
																			type='text' id='txtEqQtyb1'
																			class="form-control input-SmallText"
																			onkeypress="return validateNumbers(event)" />
																	</div>
																	
																	<div class="form-group Remove-Padding"
																		style="padding-top: 20px; margin-right: 150px;">
																		<input type="button" onclick="saveIPDServOnNusring()"
																			style="float: right;" class="btn btn-xs btn-success editUserAccess"
																			value="Save " disabled="disabled"/>
																	</div>
																</div>
																<!-- Page Search Header -->
																
															</div>
															<!-- End Code for #Bed_Side_Procedures GUI -->
															<!-- Start Code for #Gases_and_Monitors GUI -->
															<div id="Gases_and_Monitors"
																class="tab-pane fade col-md-11-1">
																<div class="divide-10"></div>
																<div class="divide-10"></div>
																<label id="gm"
																	style="text-align: center; background-color: lightblue; margin-top: -15px;"
																	class="form-group Remove-Padding col-md-12-1">Gases
																	and Monitors</label>

																<!-- Page Search Header -->
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 22px;">
																	<div class="form-group Remove-Padding col-md-5-1"
																		id="divtxtEqNameg1" style="padding-left: 7px">
																		<label class="TextFont">Item:</label> 
																		<!--old  -->
																		<!--new  -->	
																			<input
																			type='text' id='txtEqNameg1'
																			class="typeahead form-control input-SmallText"
																			onkeypress="return  validatealphabetic(event)"  onkeyup="setnursingservices1(this.id,7)"/>
																			<input
																			type="hidden" id="txtEqNameg1TestID" value="" /> <input
																			type="hidden" id="txtEqNameg1AssignedBy" value="0" />
																	</div>
																	<div class="form-group Remove-Padding col-md-4-1"
																		style="padding-left: 7px">
																		<label class="TextFont">Quantity:</label> <input
																			type='text' id='txtEqQtyg1'
																			class="form-control input-SmallText"
																			onkeypress="return validateNumbers(event)" />
																	</div>
																	
																		<div class="form-group Remove-Padding col-md-1-1"
																		style="padding-left: 7px">
																		<label class="TextFont">From:</label> <input
																			type='text' id='txting1' name="time" readonly="readonly" 
																			class="form-control input-SmallText" />
																	</div>
																	<!-- for time peacker -->
																			<script type="text/javascript">
																				$(
																						'#txting1')
																						.datetimepicker(
																								{
																									datepicker : false,
																									format : 'H:i',
																									step : 15
																								});
																			</script>
																	<div class="form-group Remove-Padding col-md-1-1"
																		style="padding-left: 7px">
																		<label class="TextFont">To:</label> <input
																			type='text' id='txtoutg1' name="time" readonly="readonly" 
																			class="form-control input-SmallText" />
																	</div>
																	<!-- for time peacker -->
																			<script type="text/javascript">
																				$(
																						'#txtoutg1')
																						.datetimepicker(
																								{
																									datepicker : false,
																									format : 'H:i',
																									step : 15
																								});
																			</script>
																	
																	<div class="form-group Remove-Padding col-md-1-1"
																		style="padding-top: 20px;">
																		<input type="button" onclick="saveIPDServOnNusring()"
																			style="float: right;" class="btn btn-xs btn-success editUserAccess"
																			value="Save " disabled="disabled"/>
																	</div>
																</div>
																<!-- Page Search Header -->
																
															</div>
															<!-- End Code for #Gases_and_Monitors GUI -->

															<!-- Start Code for #Instruments_and_Equipments GUI -->
															<div id="Instruments_and_Equipments"
																class="tab-pane fade col-md-11-1">
																<div class="divide-10"></div>
																<div class="divide-10"></div>
																<label id="ie"
																	style="text-align: center; background-color: lightblue; margin-top: -15px;"
																	class="form-group Remove-Padding col-md-12-1">Instruments
																	and Equipments</label>

																<!-- Page Search Header -->
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 22px;">
																	<div class="form-group Remove-Padding col-md-5-1"
																		id="divtxtEqNamei1" style="padding-left: 7px">
																		<label class="TextFont">Item:</label>
																			<input type='text' id='txtEqNamei1'
																			class="typeahead form-control input-SmallText"
																			onkeypress="return  validatealphabetic(event)" onkeyup="setnursingservices1(this.id,8)"/> 
																			<input
																			type="hidden" id="txtEqNamei1TestID" value="" /> <input
																			type="hidden" id="txtEqNamei1AssignedBy" value="0" />

																	</div>
																	<div class="form-group Remove-Padding col-md-4-1"
																		style="padding-left: 7px">
																		<label class="TextFont">Quantity:</label> <input
																			type='text' id='txtEqQtyi1'
																			class="form-control input-SmallText"
																			onkeypress="return validateNumbers(event)" />
																	</div>
																	
																	<div class="form-group Remove-Padding"
																		style="padding-top: 20px; margin-right: 150px;">
																		<input type="button" onclick="saveIPDServOnNusring()"
																			style="float: right;" class="btn btn-xs btn-success editUserAccess"
																			value="Save " disabled="disabled"/>
																	</div>
																</div>
																<!-- Page Search Header -->
																
															</div>
															<!-- End Code for #Instruments_and_Equipments GUI -->

														</div>
													</div>

													<!-- Start Code for row2 IPD_Services GUI -->
													<div id="row2" class="col-sm-12-1">
														<div class="col-md-12-1" style="margin-top: 10px;">
															<div class="divide-10"></div>
															<div class="box-body col-md-12-1">
																<div class="form-group col-md-12-1"
																	style="border: 1px solid lightgrey;">
																	<!-- Start Header for Edit Delete Option -->
																	<div class="col-md-12-1"
																		style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																		<label id="refreshIPDServicesLabel"
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																			<i class="fa fa-plus-square"></i> New
																		</label> <label id="editIPDServicesLabel"
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;display:none;" >
																			<i class="fa fa-edit"></i> Edit
																		</label> <label id="deleteIPDServicesLabelOnNurshing"
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deleteIpdServiceDetailsOnNusrshing()">
																			<i class="fa fa-trash-o"></i> Delete
																		</label>
																	</div>
																	<!-- End Header for Edit Delete Option -->
																	<div class="col-sm-12-1" style="margin-top: 0px;">
																		<table class="table table-condensed ">
																			<thead>
																				<tr>
																					<th style="height: 21.5px; width: 5%;">#</th>
																					<th style="height: 21.5px; width: 30%;">Particulars/Details</th>
																					<th
																						style="height: 21.5px; width: 18%; padding-left: 0px;">Service
																						Type</th>
																					<th style="height: 21.5px; width: 7%;">Quantity</th>
																					<th style="height: 21.5px; width: 20%;text-align: center;">Assign By</th>
																					<th style="height: 21.5px; width: 14%;">Assign Date & Time</th>
																					<th style="height: 21.5px; width: 14%;">Edit</th>
																					<th style="height: 21.5px; padding-left: 0px;">Action</th>
																				</tr>
																			</thead>
																		</table>

																		<div id="flip-scroll" class="col-sm-12-1"
																			style="overflow-y: auto; height: 200px; maxheight: auto; margin-top: -21px;">
																			<table class="table table-condensed">
																				<tbody id="ipdServiceSum">
																				</tbody>


																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<!-- End Code for row2 IPD_Services GUI -->
												</div>
												<!-- End Code for #IPD_Services GUI -->

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
			<div id="iPackage" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-6"
						style="margin-top: 200px; margin-left: 250px;">
						<div class="modal-header">
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -5px;; margin-left: 380px"
								onclick="hidePopupNursingChart()">
								<i class="fa  fa-times"></i>
							</button>
							<button class="btn btn-xs btn-success"
								style="margin-top: -37px; margin-left: 350px;"
								data-original-title="savepass " data-toggle="tooltip"
								data-placement="left" title="Save Password"
								onclick="saveNurshingChartDetails();" id="saveBtnNurshingChart">
								<i class="fa fa-save"></i>
							</button>
							<h4 id="testHead" style="margin-top: -36px;">Please Enter
								Password:</h4>
						</div>

						<div class="modal-body">
							<div class='col-md-4-1 '>
								<label class="TextFont">Password</label>
							</div>
							<div class='col-md-6-1 center'>
								<input type="hidden" style="display: none;" value=""
									id="userUpdate" /> <input type='password' style="width: 100%;"
									name='password' id='password' maxlength='200' value='' />
							</div>
						</div>

					</div>
				</div>
			</div>
 <!-- Save for Pharmacy Medicine Chart -->
         <div id="pharmacyMedicine" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-6"
						style="margin-top: 200px; margin-left: 250px;">
						<div class="modal-header">
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -5px;; margin-left: 380px"
								onclick="hideDrugPopup()">
								<i class="fa  fa-times"></i>
							</button>
							<button class="btn btn-xs btn-success"
								style="margin-top: -37px; margin-left: 350px;"
								data-original-title="savepass " data-toggle="tooltip"
								data-placement="left" title="Save Password"
								onclick="saveNurshingDrug();">
								<i class="fa fa-save"></i>
							</button>
							<h4 id="testHead" style="margin-top: -36px;">Please Enter
								Password:</h4>
						</div>

						<div class="modal-body">
							<div class='col-md-4-1 '>
								<label class="TextFont">Password</label>
							</div>
							<div class='col-md-6-1 center'>
								<input type="hidden" style="display: none;" value=""
									id="userUpdate" /> <input type='password' style="width: 100%;"
									name='password' id='pharmaMedpassword' maxlength='200' value='' />
							</div>
						</div>

					</div>
				</div>
			</div>
			<!-- End -->
			<div id="iPrint" class="modal fade in" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content col-md-12-1"
                        style="margin-top: 123px; margin-left: 95px;">
                        <div class="modal-header">
                            <button class="btn btn-xs btn-danger" aria-label="Close"
                                data-dismiss="modal" type="button"
                                style="margin-top: -5px;; margin-left: 500px"
                                onclick="hidePrintPopup()">
                                <i class="fa  fa-undo"></i>
                            </button>
                            <button class="btn btn-xs btn-warning" title="Print"
                                style="margin-top: -37px; margin-left: 470px"
                                 data-original-title="savepass " data-toggle="tooltip"
                                data-placement="left" onclick="nursingPrint();">
                                <i class="fa fa-print"></i>
                            </button>                            <h4 id="testHead" style="margin-top: -36px;">
                                <i class="fa fa-print"></i> Print:
                            </h4>
                        </div>    
                        <div class="modal-body">
                            <div class="col-md-12-1" style="background-color: #ccffeb;margin-top:-10px; padding-left:10px;height:152px ">
                            <div class="divide-10" ></div>
                                <div class="col-md-3-1" >
                                    <input id="all" type="radio" checked="checked" value="all"
                                        name="printType"> <b>All</b>
                                </div>                                <div class="col-md-3-1" >
                                    <input id="nursingChart" type="radio" value="nursingChart"
                                        name="printType"> <b>Nursing Chart</b>
                                </div>                                <div class="col-md-3-1" >
                                    <input id="input" type="radio" value="input" name="printType">
                                    <b>Input</b>
                                </div>
                                
                                <div class="col-md-3-1" style="margin-right: 0px;">
                                    <input id="vitals" type="radio" value="vitals" name="printType">
                                    <b>Vitals</b>
                                </div>                                <div class="divide-40" ></div>                                <div class="col-md-3-1">
                                    <input id="output" type="radio" value="output" name="printType">
                                    <b>Output</b>
                                </div>                                <div class="col-md-3-1" >
                                    <input id="intensivist" type="radio" value="intensivist"
                                        name="printType"> <b>Intensivist</b>
                                </div>                                <div class="col-md-3-1" >
                                    <input id="postOperation" type="radio" value="postOperation"
                                        name="printType"> <b>Post Operation</b>
                                </div>
                                
                                     <div class="col-md-3-1" >
                                    <input id="chemo" type="radio" value="chemo"
                                        name="printType"> <b>ChemoTheoropy</b>
                                </div>
                                <div class="divide-40" ></div>
                                
													<%
                                                 	if(cancerOnOff.equalsIgnoreCase("on")){
                                                 		%>
                                <div class="col-md-3-1" >
                                    <input id="monitoringSheet" type="radio" value="monitoringSheet"
                                        name="printType"> <b>Monitoring Sheet</b>
                                </div>
                                
                                <div class="col-md-3-1">
                                                    <input id="prepostChecklist" type="radio" value="prepostChecklist"
                                                        name="printType"> <b>PrePostChecklist</b>
                                                </div>
                                
                                                <div class="col-md-3-1">
                                                    <input id="ipdServices" type="radio" value="NurrsingAsses"
                                                        name="printType"> <b>Restraint Form & Paediatric</b>
                                                </div>
                               
                                                <div class="col-md-3-1">
                                                    <input id="oneDayAsses" type="radio" value="oneDayAsses"
                                                        name="printType"> <b>Nursing Assessment-One Day</b>
                                                </div>
                               
                                <div class="divide-40"></div>
								
								<%	}%>
								
								 <div class="col-md-3-1" >
                                    <input id="nursingAssessment" type="radio" value="nursingAssessment"
                                        name="printType"> <b>Nursing Assessment</b>
                                </div>
								<div class="col-md-3-1">
									<input id="idpainScale" type="radio"
										value="careplane" name="printType"> <b>Care Plan</b>
								</div>
								<div class="col-md-3-1">
									<input id="idpainScale" type="radio"
										value="painScale" name="printType"> <b>PainScale</b>
								</div>
								
							</div> 
						</div>
                    </div>
                </div>
            </div>

			<!-- Suraj Code For Prev Indent Information-->
			<div id="prevIndentPopUp" class="modal fade in">
				<div class="modal-dialog" style="width: 1120px;">

					<div class="modal-content" class="col-md-12">
						<div class="modal-header">
							<div class="">
								<h4>
									<i class="fa fa-calendar"></i>Indent Information
								</h4>
							</div>

						</div>
						<div class="modal-body">

							<div style="margin-top: 00px;" class="box border primary">
								<div class="box-title">
									<h4>
										<i class="fa fa-table"></i>Generated Indent Information
									</h4>
									<div class="tools">
										<a class="config" data-toggle="modal" href="#box-config">
											<i class="fa fa-cog"></i>
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
											<i class="fa fa-star"></i><b>Indent No -<span
												id='divIndentNo'></span>
										</div>
										<div class='col-md-4-1'>
											<i class="fa fa-calendar"></i>Indent Date -</b> <span
												id='divIndentDate'></span>
										</div>
										<div class='col-md-4-1'>
											<i class="fa fa-home"></i>Generated From -</b> <span
												id='divIndentGenerateFrom'></span>
										</div>
									</div>
									<table class="table table-striped" style="margin-top: 40px;"">
										<thead style="background: white;" class="cf">
											<tr>
												<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>
												<th class="col-md-2 center" style="height: 21.5px;"><div>Product
														Name</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Required
														Qty</div></th>

											</tr>
										</thead>
										<tbody id='preIndentDataById'>

										</tbody>
									</table>
								</div>
							</div>

							<div style="margin-top: 00px;" class="box border primary">
								<div class="box-title">
									<h4>
										<i class="fa fa-table"></i>Received Indent Information

									</h4>
									<div class="tools">
										<a class="config" data-toggle="modal" href="#box-config">
											<i class="fa fa-cog"></i>
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
											<i class="fa fa-star"></i><b>Indent Sale No -<span
												id='divIndentSaleNo'></span>
										</div>
										<div class='col-md-4-1'>
											<i class="fa fa-calendar"></i>Indent Received Date -</b> <span
												id='divIndentReceiveDate'></span>
										</div>

									</div>
									<table class="table table-striped" style="margin-top: 40px;">
										<thead style="background: white;" class="cf">
											<tr>
												<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>
												<th class="col-md-2 center" style="height: 21.5px;"><div>Product
														Name</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Batch
														Code</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Batch
														Expiry</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Qty</div></th>

											</tr>
										</thead>
										<tbody id='preIndentSaleDataById'>

										</tbody>
									</table>
								</div>
							</div>

						</div>
						<!-- /BODY-->
						<div class="modal-footer">

							<div class="form-group col-md-7-1" style="margin-top: 15px;">
								<button type="button" class="btn btn-primary"
									id="btnSubContractingMaterialIssueSave"
									name="btnSubContractingMaterialIssueSave"
									onclick="setIndentDetails()">Ok</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<!-- //edit indent start   added by vishant-->
			<div id="editIndentPopUp" class="modal fade in">

				<div class="modal-dialog" style="width: 1120px;">
					<div class="modal-content">
						<div class="modal-header form-group">
							<h3 class="col-md-6">Edit Indent Information</h3>
							<div class="col-md-6 text-right">
								<button type="button" onclick="saveIndentSlave();"
									class="btn btn-info">Save Indent</button>
							</div>
						</div>
						<div class="modal-body">
							<div style="margin-top: 00px;" class="box border primary">
								<div class="box-title">
									<h4>
										<i class="fa fa-table"></i>Generated Indent Information
									</h4>
									<div class="tools">
										<a class="config" data-toggle="modal" href="#box-config">
											<i class="fa fa-cog"></i>
										</a> <a class="reload" href="javascript:;"> <i
											class="fa fa-refresh"></i>
										</a> <a class="collapse" href="javascript:;"> <i
											class="fa fa-chevron-up"></i>
										</a> <a class="remove" href="javascript:;"> <i
											class="fa fa-times"></i></a>
									</div>
								</div>
								<div class="box-body">
									<div class="col-md-12-1" style="margin-top: 10px;">
										<div class="col-md-4-1">
											<i class="fa fa-star"></i><b>Indent No -<span
												id="editdivIndentNo"></span>
											</b>
										</div>
										<b></b>
										<div class="col-md-4-1">
											<b> <i class="fa fa-calendar"></i>Indent Date -
											</b> <span id="editdivIndentDate"></span>
										</div>
										<div class="col-md-4-1">
											<i class="fa fa-home"></i>Generated From - <span
												id="editdivIndentGenerateFrom"></span>
										</div>
									</div>
									<table id="editpreIndentTable" class="table table-striped"
										style="margin-top: 40px;">
									<thead style="background: white;" class="cf">	
										<tr>
											<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>
											<th class="col-md-2 center" style="height: 21.5px;">
												<div>Product Name</div>
											</th>
											<th class="col-md-2 center" style="height: 21.5px;"><div>RequiredQty</div></th>
											<th class="col-md-2 center" style="height: 21.5px;"><div>Total
													QTY</div></th>
										</tr>
										</thead>

										<tbody id="editpreIndentDataById">
										</tbody>
									</table>
								</div>
							</div>
						</div>
						
						<div class="modal-footer">

							<div class="form-group col-md-7-1" style="margin-top: 15px;">
								<button type="button" class="btn btn-primary"
									id="btnSubContractingMaterialIssueSave"
									name="btnSubContractingMaterialIssueSave"
									onclick="setIndentDetails()">Ok</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</div>
						<!-- //edit indent end -->

						<!--  Harshit changes -->
						<div class="modal fade bs-example-modal-lg" id="viewDocModal"
							tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
							aria-hidden="true">
							<div class="modal-dialog modal-dialog modal-lg">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										<div class="row">
											<div class="col-md-4 col-xs-11">
												<h3 class="modal-title" id="myModalLabel">View document</h3>
											</div>
											<br>
											<br>
											<div class="col-md-6 col-xs-11">
												<h5></h5>
												<h6 id="documentComment"></h6>
											</div>
										</div>
									</div>
									<div class="modal-body">
										<iframe id="ViewDocumemnt" width="80%" height="330px"></iframe>
									</div>
								</div>
							</div>
						</div>
						<div class="divide-10"></div>

						<div class="divide-10"></div>

						<div id="ChemoOrderSheetContent">

							<div id="ChemoOrderSheetTemp"></div>

						</div>

						<div id="ChemoOrderSheetSlaveTemp"
							style="padding-top: 0%; height: 80%;">

							<div id="ChemoOrdersheetAddTemp" class='col-md-12-1'
								style="margin: 0px;"></div>

							<input type='hidden' value='0' id='addChemoOrderRowCount' /> <input
								type='hidden' value='0' id='ChemoOrderRowCount' />

						</div>

						<div id="divHistoryChemotherapy" class="modal fade in"
							tabindex="-1">
							<div class="modal-dialog">
								<div class="modal-content col-md-7"
									style="margin-top: 13%; margin-left: 13%;">
									<div class="modal-header">
										<div class="box-title">
											<h4 class="col-md-8-1">Chemotherapy Previous History :</h4>
										</div>
										<div class="form-group col-md-4-1" style="float: right;">
											<button class="btn btn-xs btn-danger"
												style="margin-left: 100px;"
												onclick="historyChemotherapyHide();">
												<i class="fa fa-arrows"></i> Close
											</button>
										</div>

									</div>
									<div class="modal-body col-md-12-1">
										<div id="tableHistoryChemotherapy" class="col-md-12-1">
										</div>
									</div>
								</div>
							</div>
						</div>
						
			
			<div tabindex="-1" class="modal fade in" id="iPrintDrugPopUp" style="display: none;">
		<div class="modal-dialog" style="display: block;">
			<div style="margin-top: 13%; margin-left: 13%;" class="modal-content col-md-7">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-calendar"></i> Drug Administration Sheet
						</h4>
						<div style="float: right;" class="form-group col-md-4-1">
							<button type="button" onclick="printNurshingDrug();" class="btn btn-xs btn-warning">
								<i class="fa fa-print"></i> Print
							</button>
							<button onclick="hideNurshingDrugPopUp();" class="btn btn-xs btn-danger">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDrugPrint" value="allDrug" checked="checked"> All Drugs
						</label>
					</div>

					<div class="col-md-4-1">
						<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDrugPrint" value="dateWiseDrug"> Selected Date Drugs
						</label>
					</div>

				</div>
			</div>
		</div>
	</div>

						<div><%@include file="Footer.jsp"%></div>
						<input id="callfromipd" type="hidden" name="callfromipd"
							value="<%=request.getParameter("type")%>" />
						<div id="patobject" style="display: none;"></div>
						<%-- <div id="pid" style="display: none;"><%=request.getParameter("patientId")%></div> --%>
						<div id="appo_type" style="display: none;"><%=request.getParameter("appo_type")%></div>
						<div id="id" style="display: none;"><%=request.getParameter("id")%></div>
						<div id="updateOn" style="display: none;"><%=request.getParameter("updateFlagOn")%></div>
						<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>
						<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
						<input type="hidden" style="display: none;"
							value="<%=request.getParameter("FunType")%>" id="FunType" />
						<div id="hospDetails" style="display: none;"></div>
						<div id="topic" style="display: none;"></div>
						<div style="display: none;" id="docName">${sessionScope.userName}</div>
						<input type="hidden" value="${sessionScope.userId}" id="txtUserId" />
						<div id="date" style="display: none;"><%=todays_date%></div>
						<input type="hidden" id="pageType" value="DoctorDesk"
							style="display: none;" />
						<div id="chartObj" style="display: none;"></div>
						<input type="hidden" id="tridId" name="tridId" value=""
							style="display: none;" /> <input type="hidden" id="treStart"
							value="<%=request.getParameter("treStart")%>"
							style="display: none;" /> <input type="hidden" id="chart"
							style="display: none;" />

						<!-- For IPD_Services -->
						<div id="trid" style="display: none;"><%=request.getParameter("treatmentId")%></div>
						<input id='invProdID' type="hidden" value='0'
							style="display: none;" /> <input id='tempQnt' type="hidden"
							value='0' style="display: none;" /> <input type="hidden"
							id="queryType" value="insert" style="display: none;" /> <input
							type="hidden" id="idtriServices" value="0" style="display: none;" />
						<input type="hidden" id="idbillipd" value="0"
							style="display: none;" />
						<div id="servicesList" style="display: none;"></div>
						<input id="drid" type="hidden" value="0" style="display: none;" />
						<input id="tid" type="hidden"
							value="<%=request.getParameter("treatmentId")%>"
							style="display: none;" /> <input id="pid" type="hidden"
							value="0" style="display: none;" /> <input id="treatmentId"
							type="hidden" value="<%=request.getParameter("treatmentId")%>"
							style="display: none;" /> <input id="bedAllocated" type="hidden"
							value="<%=request.getParameter("bedallocated")%>"
							style="display: none;" /> <input id="ht" type="hidden"
							value="<%=request.getParameter("ht")%>" style="display: none;" />
						<input id="pattype" type="hidden"
							value="<%=request.getParameter("pattype")%>"
							style="display: none;" />
						<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>

						<input id="callFor" type="hidden"
							value="<%=request.getParameter("callFor")%>"
							style="display: none;" />
						>
		</c:if>
<!-- nursing station start-->
														<input type="hidden" id="invnRow" value="0" />
														<input type='hidden' id='InvRowCount' value='0'/>
														<input type='hidden' id='addRowCountInv' value='0'/>
														<input type='hidden' value='0' id='NCPnRow' />
														<input type='hidden' value='0' id='RowCountNCP' />
														<input type='hidden' value='0' id='addRowCountNCP' />
														<input type="hidden" id="hhcdpRow" value="0" />
														<input type="hidden" id="RowCountHHcdP" value="0" />
														<input type="hidden" id="addRowCountHHcdP" value="0" />
														<input type='hidden' value='0' id='SASnRow' />
														<input type='hidden' value='0' id='RowCountSAS' />
														<input type='hidden' value='0' id='addRowCountSAS' />
														
<!-- nursing station end-->
		<!-- For IPD_DIC -->
		<input type="hidden" id="tmpQty" name="tmpQty" style="display: none;" />
		<input type="text" value="<%=session.getAttribute("userType")%>"
			id="userType" style="display: none;" /> <input type="text"
			value="<%=session.getAttribute("userType")%>" id="userRole1"
			style="display: none;" /> <input type="hidden"
			id="servicesListLength" value="" style="display: none;" />
		<div id="DIC" style="display: none;"></div>
		<div id="Material" style="display: none;"></div>
		<input type="hidden" id="nRow" value="0" />
		<input type="hidden" id="idForOneDay" value="0" />
		<input type="hidden" id="idForpediatric1" value="0" />
		<input type="hidden" id="idForpediatric2" value="0" />
		<input type="hidden" id="idForpediatric3" value="0" />
		<input type="hidden" id="idForop1" value="0" />
		<input type="hidden" id="idForintialass1" value="0" />
		<input type="hidden" id="idForintialass2" value="0" />
		<input type="hidden" id="idForintialass3" value="0" />
		<input type="hidden" id="cancerOnOff" value="<%=cancerOnOff %>" />
		<div id="pharmaMedicineChart" style="display: none;"></div>
		<input type="hidden" id="mRow" value="0" />		
		<input type="hidden" id="personalHygieneId" value="0" />
		<div id="InputChartDiv" style="display: none;"></div>
		<div id="ChartNames" style="display: none;"></div>
		<div id="nursingnotesAjax" style="display: none;"></div>
		<input type="hidden" name="indentRowCount" id="indentRowCount"
			value="1">
		<!--ipdnursing hidden filed station added by paras   -->	
			<input type="hidden" id="idservnur" value="0"
				style="display: none;" />
			<input type="hidden" id="deptid" value="0"
				style="display: none;" />
				<input type="hidden" id="txtcategorycharges" value="0"
				style="display: none;" />
				<input type="hidden" id="txtcategorycharges2" value="0"
				style="display: none;" />
			<input type="hidden" id="SponsorsourceTypeId" value="0"
				style="display: none;" />
			<input type="hidden" id="chargesSlaveId" value="0"
				style="display: none;" />		
			<input type="hidden" id="chargesfromConfNS" value="0"
				style="display: none;" />
				<input type="hidden" id="vitalBodyLength" value="0"
				style="display: none;" />
				<!--  For Nurshing Chart-->
				<input type="hidden" id="nurshingrowCount" value="0"	style="display: none;" />
				<!-- End Nurshing chart -->
	<input type="hidden" value="<%=session.getAttribute("uId")%>" id="unitId" />
	<input type="hidden" value="<%=session.getAttribute("preTreat")%>" id="preTreat" />
		<input type="hidden" value="N" id="prevtr" />
	<!-- ipdnursing hidden filed station added by paras   - -->
	<input type='hidden' id="idPian" value="0" />
	<input type='hidden' id="carePlanId" value="0" />
	<input type='hidden' id="painScaleId" value="0" />
	<input type='hidden' id="drugMasterCount" value="0" />
	<input type="hidden" id="bedProcedureId" value="<%=BedsideProcedure1%>" />
	<input type="hidden" id="gasesandMonitors" value="<%=GasesAndMonitors%>" />
	<input type="hidden" id="instrumentsandEquipment" value="<%=InstrumentsAndEquipments%>" />
	<input type="hidden" id="callFromVal" value="<%=request.getParameter("callFromVal")%>">
	
	</section>
	<script>
	$('#recievedTime').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

	$('#TimeEducation').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	
	$('#DocTme').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	
	$('#NurseTme').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	
	$('#Time010').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	
	$('#AssessementTime').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

	$('#TimeForOneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time01OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time02OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time03OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time001OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time002OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time003OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time004OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time0001OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time0002OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time0003OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#Time0004OneDay').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    
	    $('#preTimeId').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    $('#postTimeId').datetimepicker({
	        datepicker : false,
	        format : 'H:i',
	        step : 15
	    });
	    
	</script>
</body>
</html>