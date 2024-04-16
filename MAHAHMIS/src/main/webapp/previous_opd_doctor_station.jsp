<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
 
<%@ page import="javax.servlet.http.HttpServletRequest"%>

<%@page import="java.util.Calendar"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<!-- For Prescription Multilple language -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<script type="text/javascript">
</script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Doctor Station</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />
<link rel="stylesheet" type="text/css"
    href="ehat-design/css/cloud-admin.css">
    <link rel="stylesheet" type="text/css"
    href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
    href="ehat-design/css/responsive.css">
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />

<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css" />
<link href="ehat-design/js/select2/select2.min.css" type="text/css" rel="stylesheet">
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
<!-- chart -->
<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css"
	type="text/css" />
	<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- /chart -->
<!-- chart -->
<script type="text/javascript" src="js/ExtraJs/jqx-widgets/jqxcore.js"></script>
<script type="text/javascript" src="js/ExtraJs/jqx-widgets/jqxdata.js"></script>
<script type="text/javascript" src="js/ExtraJs/jqx-widgets/jqxdraw.js"></script>
<script type="text/javascript"src="js/ExtraJs/jqx-widgets/jqxchart.core.js"></script>
<!-- /chart -->
<!-- for Developers  -->
<!-- Surgery advice -->
<script type="text/javascript" src="js/studyChart/highcharts.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/studyChart/studyChart.js"></script>
<script type="text/javascript" src="js/highslide-with-gallery.js"></script>
<script type="text/javascript" src="js/highslide.config.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="js/highslide.css" />
<script type="text/javascript" src="js/js.js"></script>
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript"	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"	src="js/jquery-validate/additional-methods.min.js"></script>



<script type="text/javascript" src="js/PatientChart.js"></script>	
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/ehat_CoversheetNew.js"></script>
<script type="text/javascript" src="js/ehat_OPDDoctorsDesk.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/pop_up.js"></script>
<!-- <script type="text/javascript" src="js/patient.js"></script> -->
<script type="text/javascript" src="js/pharma_patient.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/labresult.js"></script>
<script type="text/javascript" src="js/doctor.js"></script>
<script type="text/javascript" src="js/report.js"></script>
<script type="text/javascript" src="js/TNMStageMaster.js"></script>
<script type="text/javascript" src="js/ehat_sub_obj.js"></script>
<script type="text/javascript" src="js/ehat_PatientChemo.js"></script>
<script type="text/javascript" src="js/ehat_doctordesk.js"></script>
<script type="text/javascript" src="js/ehat_dialysis.js"></script>
<script type="text/javascript" src="js/ehat_copy_last_treatment_page.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="js/dd_patient_info.js"></script>
<script type="text/javascript" src="js/pre_dd_history.js"></script>
<script type="text/javascript" src="js/pre_dd_diet.js"></script>
<script type="text/javascript" src="js/pre_dd_document_upload.js"></script>
<script type="text/javascript" src="js/pre_dd_sx_adviced.js"></script>
<script type="text/javascript" src="js/pre_dd_dignosis.js"></script>
<script type="text/javascript" src="js/pre_dd_clinical_staging.js"></script>
<script type="text/javascript" src="js/pre_dd_prescription.js"></script> <!-- aniket kanse/21/DEC/21 -->
<script type="text/javascript" src="js/pre_dd_clinical_evaluation_new.js"></script> <!-- aniket kanse/28/DEC/21 -->
<script type="text/javascript" src="js/dd_demo_doctor.js"></script> <!-- aniket kanse/10/JAN/22 -->
<script type="text/javascript" src="js/pre_dd_services_advised.js"></script>
<script type="text/javascript" src="js/dd_coversheet.js"></script>
<script type="text/javascript" src="js/dd_conslutant_doctor.js"></script>
<script type="text/javascript" src="js/opd_main_print.js"></script>
<script type="text/javascript" src="js/dd_std_growth_chart.js"></script> <!-- aniket kanse/17/JAN/22 -->
<script type="text/javascript" src="js/pre_dd_instruction_tab.js"></script> <!-- Akshata Desai /10/MARCH/22 -->
<script type="text/javascript" src="js/pre_opd_indivisual_instruction.js"></script> <!-- Akshata Desai /10/MARCH/22 -->
<script type="text/javascript" src="js/pre_dd_group_inst.js"></script> <!-- Akshata Desai/11/MARCH/22 -->
<script type="text/javascript" src="js/dd_previoustreatment.js"></script> <!-- Akshata Desai/5/APRIL/22 -->
<script type="text/javascript" src="js/pathology_information.js"></script>
<script type="text/javascript" src="js/billNoble_opd.js"></script>


<script type="text/javascript"
	src="RichTextBox/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/themes/modern/theme.min.js"></script>
<!-- /for Developers  -->
<!-- immunization -->
<script type="text/javascript" src="js/DoctorDeskMasters.js"></script>
<script type="text/javascript" src="js/bootstrap-toggle.min.js"></script>
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
	href="<c:url value="pharma-resources/js/jqx-widgets/jqx.base.css"/>">
<script src="<c:url value="pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxloader.js"/>"></script>
<script	src="<c:url value="pharma-resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script type="text/javascript" 	src="<c:url value="pharma-resources/js/shortcut.js"/>"></script>
<script src="jquery/jquery.ajaxfileupload.js" ></script>
<script
	src="<c:url value="pharma-resources/js/app_js/pharma_alternate_product.js"/>"></script>
	<script type="text/javascript" src="js/dietcanteen.js"></script>
	<script type="text/javascript" src="js/emergencyChargesOpd.js"></script>
	
	
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<%
	session = request.getSession();
	String uid = (String) session.getAttribute("uid");
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String cancerOnOff = resourceBundleEha.getObject("cancerOnOff").toString();
	String subobjWithComplaintAndFinding = resourceBundleEha
			.getString("subobjWithComplaintAndFinding");
	ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");  
	String packageID = resourceBundle.getObject("packageID").toString();
%>		
<script lang="Javascript">
$(document).click(function() {
		$('input[type="file"]').ajaxfileupload({
		'action' : 'UploadFileServlet',
	});
});
</script>
<style type="text/css">
.jqx-chart-axis-text,.jqx-chart-legend-text,.jqx-chart-axis-description,.jqx-chart-title-text,.jqx-chart-title-description,.jqx-chart-label-text
	{
	font-size: 13px;
}
</style>
<script type="text/javascript">

	function setVaccineGivenDatePatient(jsObjVaccinationList) {
		// alert(jsObjVaccinationList.vaccineDTOList.length);
		for ( var int = 0; int < (jsObjVaccinationList.vaccineDTOList.length); int++) {
			new JsDatePick(
					{
						useMode : 2,
						target : "vaccineGivenDatePatient__"
								+ (jsObjVaccinationList.vaccineDTOList[int].saveUpdateImmunizationID),
						// target : "vaccineGivenDatePatient__1",
						yearsRange : [ 1920, 2099 ],
						limitToToday : false,
						dateFormat : "%d/%m/%Y",
						imgPath : "../img/",
						weekStartDay : 1,
					});

			new JsDatePick(
					{
						useMode : 2,
						target : "dueDatePatient__"
								+ (jsObjVaccinationList.vaccineDTOList[int].saveUpdateImmunizationID),
						// target : "vaccineGivenDatePatient__1",
						yearsRange : [ 1920, 2099 ],
						limitToToday : false,
						dateFormat : "%d/%m/%Y",
						imgPath : "../img/",
						weekStartDay : 1,
					});
		}
	}
</script>
<style type="text/css">
.centered {
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
}

input[type="range"]::-moz-range-progress {
  background-color: #94ccf3; 
  height: 3px;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background-color: #D3D3D3;
  border-radius: 1px;
  border: 0px solid #000000;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #2497E3;
  height: 12px;
  width: 12px;
  border-radius: 25px;
  background: #A1D0FF;
  cursor: pointer;
}
input[type=range]::-moz-focus-outer {
    border: 0;
    }
    
input[type=range]:-moz-focusring {
    outline: 1px solid orange;
}
</style>
<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page 
		App.init(); //Initialise plugins and elements 
		getPatientInfoByTreatId();
		getAllTemplates();
		getAllGrpInstDataForModal();
		getChargesSlaveIdandSponsorId();
		//fetchPreviousTreatmentsByTreatmentIDNew();
		//fetchPreviousTreatmentsByTreatmentID();
	});
</script>
<script type="text/javascript">
	onload = function() {
	 <%ResourceBundle resourceBundleEhat1 = ResourceBundle.getBundle("Ehat");%>
		//Added by Laxman on 15-March for get Consultant Dr Name(radiology.js)
  	<%-- getConsultantDrName(<%=request.getParameter("treatmentId")%>); --%>
	//Added By Pooja
	
	<%ResourceBundle resourceBundleEhat2 = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");%>
	
 	var cancerOnOff1 = $("#cancerOnOff").val();
 	if(cancerOnOff1 == "off"){
 	 	//$("#staging").hide();
		$("#subObj").show();
		}
	if($("#wardFlag").val()=="opd"){
			$("#opdButtons").show();
			$("#iSelTreatmentToCopy").show();
			$("#iSelPrecsriptionToCopy").show();
			$("#ckupDone").show();
			$("#ckupCancel").show();
			$("#curPreOPDPrint").show();
			
		}else{
			$("#iSelTreatmentToCopy").show();
			$("#iSelPrecsriptionToCopy").show();
			$("#ipdPrintBtn").show();
		}
	var preTreat = $("#prevtr").val();
	if(preTreat=="previousTreatmentOPDER"){
		$("#curPreOPDPrint").show();
		$("#iSelTreatmentToCopy").hide();
		$("#iSelPrecsriptionToCopy").hide();
		$("#ckupDone").hide();
		$("#ckupCancel").hide();
		$("#ipdPrintBtn").hide();
		$('.btn-success').attr("disabled","disabled");
		$('.btn-primary').attr("disabled","disabled");
	}
	<%
	String preTreat=request.getParameter("preflag");
	if(preTreat==null){
		
	}else{		
		if(preTreat.equals("previousTreatmentOPDER")){
			session.setAttribute("preTreat", "Y");
		}else{
			session.setAttribute("preTreat", "N");
		}
	}
	
%>
//getDialysisAdviceList();
//setDocNameForRegistration();
//fetchDoctorSpecilizationsForPatientRegistration();
//fetchHospitalDepartmentsForPatientRegistration();   

	<%-- getpatientTrIddrdesk(<%=request.getParameter("treatmentId")%>); --%>
	//fetchDoctorRoundTemplate("IPD_DoctorStation");
    setTimeout(function() {
    	setTemForcoversheet('coverSheet');
    	getLatestConsultantDoctorIdByTreatment();//added by dayanand on 12-1-2022 for getting latest consultant doctor id
    	cheUpDoneOrCancelOPD('send');//send patient to in
			}, 100);
		var rowCount=	$("#RowCount").val(rowCount);
			var type = $("#callFrom").val();
		if(type == "PDP"){
			$("#bed").hide();
		}
		$("#indentRowCount").val("1");
		
		//added by kishor
		setTimeout(function() {
			var deptId=$("#depdocdeskid").val();
			if(deptId == 2){
				$("#ipdPrintBtn").show();
			}else{
				$("#ipdPrintBtn").hide();
			}
			}, 30);
	
		//to fetch the patObject for IPD_BedWard.jsp
		
		
		
		//defaultViewTest("radioBodyPart");
		
		$("#indentMasterListDiv").hide();
		$("#lidoctor").addClass("anchorActive");

		var pid = $("#pid").val();
		var doctorname = $("#doctName").val($("#nameh").html());
		
		/* unit */
		
		/* prescription based route */
		
		/* prescription instruction */
		
		//heading fetched 
		
		//Tushar Changes
		shortcut.add("Alt+a", function() {
			//showAlternateProduct();
		});
		$("#uId").val(<%=session.getAttribute("uId")%>);
		
	//	
		$("#indentMasterListDiv").hide();
		$("#lidoctor").addClass("anchorActive");
	//	var pid = $("#pid").val();
	    var pid = $("#pt_Id").val();
		var doctorname = $("#doctName").val($("#nameh").html());
		/* prep. */
		//fetchPreperationsList("DoctorDesk");
		/* unit */
		//fetchUnitTypeList("DoctorDesk");
		/* prescription based route */
		//fetchAllMedicationMaster("RouteType");
		/* prescription instruction */
		//fectchAllPrescriptionInstruction("IPD");
			//Tushar Changes
		//heading fetched 
		//getAllHeading("onload" ,"onPkgAdd");
    	setTimeout(function() {
		//	fetchTestDashboard();
			//savefollowUpForPatient('FETCH');
		}, 1000);

		shortcut.add("Alt+a", function() {
			//showAlternateProduct();
		});
		//fetchPreviousTreatmentsByTreatmentID();
			//added By Tarique Aalam 
		//getDayOfWeek2();
		//fetchHospitalHolidayEmrPer('onload');
		//EmerChrAccordingToTimeOpd();
			setTimeout(
				function() {
					getDoctornameForCommonTemp2(); //Added By Sagar 
					
					/* disable on previous treatment */
					setTimeout(function() {
						//disableIpdDoctorStationJSP();
					}, 2500);
				}, 1000);
		
    	//previousTreatmentDisable();
		$("#RowCount").val('0');
		//IPD_DRR for Daily Round and Order Form
		$("#dairou1").css('background-color', 'Yellow  ');
    	var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#date-pick").val(date);
		$("#OFdate-pick").val(date);
		$("#OFdate-pick1").val(date);
		$("#hiddenDate").val(date);
		$("#popup_container2").val(		arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2]);
		$("#allergyDate").val(date);
		$("#assesmentDate").val(date);
		$("#BMIDate").val(date);
		$("#patientDOB").val(date);
		$("#BMIDate1").val(date);
    	//setCommonPatInfo();
		new JsDatePick({
			useMode : 2,
			target : "BMIDate",
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});

		new JsDatePick({
			useMode : 2,
			target : "BMIDate1",
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});
	// For Prescription multilpe language
		var lang = $("#language").html();
		if (lang == "Marathi") {
			// $("#instruction").html($("#InstructionListMarathi").html());
		} else {
			// $("#instruction").html($("#InstructionListEnglish").html());
		}
		// start:date picker on pop up
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

		new JsDatePick({
			useMode : 2,
			target : "allergyDate",
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});
		// end:date picker on pop up
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
			/* data : {
				storeName : 'IPD'
			}, */
			//url : "/EhatEnterprise/pharmacy/mrn/getStoreDetailsByStoreName",
			url : "/EhatEnterprise/pharmacy/store/SubStoreList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
						setIndentStoreDropDown(r);
			}
		});
	}

	function setIndentStoreDropDown(result) {
			var content = "";
		for ( var i = 0; i < result.lstSubStore.length; i++) {

			content = content + "<option value='"+result.lstSubStore[i].storeId+"'>"
					+ result.lstSubStore[i].storeName + "</option>";
		}
		$("#pharmaStoreId").append(content);
	}

	function loadIndentPopUp() {
		if ($('#stockSelection').is(":checked")) {
			$('#Po_Pop_Up').modal('show');
			$('#orderFormContent1').html("");
		}
	};
</script>

<!-- Abhijit Radke -->
<script type="text/javascript">
	
function toCreateDiv(RowCount) {
	var w = $("#DRRaddCount").val();
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var tm = $("#t" + rowCount + "").val();
	var tn = $("#tn" + rowCount + "").val();
	var cf = $("#cf" + rowCount + "").val();
	var tr = $("#tr" + rowCount + "").val();
	var ia = $("#ia" + rowCount + "").val();
    var cmt = $("#cmt" + rowCount + "").val();
	var flag = 0;
	// alert(mt);
	if (tm == "" && cf == "" && tr == "" && ia == "") {
		alert("Please fill the previous added row.");
		return false;
	}

	rowCount++;
	divId = "div" + rowCount;
	//alert(DRRDiv);
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("DRRDiv").appendChild(x);
	//var Doc_div = "rb" + rowCount;
	//loadRoundDoctors(Doc_div);
	document.getElementById(divId).innerHTML = '<td	style="height: 21.5px; width: 52px; text-align: center;">'
			+ rowCount
			+ '</td><td	style="height: 21.5px; width: 115px;"><input readonly="readonly" class="form-control input-SmallText" type="text" onkeypress="return validateComma(event)" id="t'
			+ rowCount
			+ '" value="" onmouseover="click2(this)" /></td><td style="height: 21.5px; width: 195px;"><select onchange="fillDRT(this.value,'+rowCount+')"  class="form-control input-SmallText TextFont" id="tn'
			+ rowCount
			+ '" ><option></option></select></td><td style="height: 21.5px; width: 275px;"><textarea rows="2" cols="37" id="cf'
			+ rowCount
			+ '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 275px;"><textarea rows="2" cols="37" id="ia'
			+ rowCount
		 	+ '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 215px;"><select class="form-control input-SmallText TextFont" id="rb'
			+ rowCount
			+ '" ><option></option></select></td><td style="height: 21.5px; width: 114px;"><input type="checkbox" name="checkbox'
			+ rowCount + '"   id="checkbox" value= "0" /><input type="hidden" value="0" id="bilid'+ rowCount + '"/></div>';
		/* + '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 215px;"><input type="text" onkeyup=autoSuggestionForDoctorRoundChrg('+rowCount+') class="form-control input-SmallText TextFont" id="rb'
		+ rowCount
		+ '"><input type="hidden" id="drrDocId'+rowCount+'" value="0"></td><td style="height: 21.5px; width: 114px;"><input type="checkbox" name="checkbox'
		+ rowCount + '"   id="checkbox" value= "0" /><input type="hidden" value="0" id="bilid'+ rowCount + '"/></div>'; */

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(w);
    $('#t' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	
	w++;
	$("#DRRaddCount").val(w);
	ajaxResponse = $("#doctorBean").html();
	DoctorBean = eval('(' + ajaxResponse + ')');
	var Doc_div = "rb" + rowCount;
	var dispDoctor = "<option value='0'>--Select--</option>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
		//var dispDoctor = "<input type='text'>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";

	$("#" + Doc_div + "").setTemplate(dispDoctor);
	$("#" + Doc_div + "").processTemplate(DoctorBean);
	//below code is for doctor round template in selectbox at doctor station
	var data = $("#DRTDetails").html();	//data set at ipdTreatment.fetchDoctorRoundTemplate("IPD_DoctorStation")
	//alert("data..."+data);
	var result = eval('(' + data + ')');//onload function call
	var rowId = "tn" + rowCount;		// #tn is select box id with row count 
	var tempDRT = "<option value='0'>--Select--</option>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}'>{$T.ldrt.templateName}</option>{#/for}";
		//var tempDRT = "<input type='text'>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}' onclick=fillDRT({$T.ldrt.templateId},'"+rowCount+"')>{$T.ldrt.templateName}</option>{#/for}";

	$("#" + rowId).setTemplate(tempDRT);//set template
	$("#" + rowId).processTemplate(result);

	$("#rb" + rowCount).select2();
}
</script>
<!-- Abhijit Radke -->

</head>
<%
	java.util.Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateformatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = dateformatter.format(currentDate.getTime());
	java.text.SimpleDateFormat dateformatter2 = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date2 = dateformatter2.format(currentDate.getTime());
	java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
	String todays_time = formatterrr.format(currentDate.getTime());
	
%>


<body style="background: white ! important;">
	<!-- prime loader starts here -->
		<div class="col-md-12 container-fluid" id="primeLoader" style="display:none;z-index:9999;height:100vh;background-color:rgba(13,13,13,0.3);position:absolute;">
	          <div  class="col-md-offset-5 col-md-1" style="overflow: hidden;border-radius:25%;top:30%;background-color:#eee;padding:0;">
	
	              <img src="images/ajax_loader_blue_48.gif" style="top:0;left:0" height="100" width="125" />          
	          </div>
		</div>
	<!-- prime loader ends here -->
	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
					
					<%-- <%@include file="ehat_consentFromTreatmentPopup.jsp"%> --%>
			
				</header>
				<!--/HEADER -->
                         <%-- <jsp:include page="ehat_consentFromTreatmentPopup.jsp" />  --%>
				<!--Start Left Menu -->
				<%-- <%@include file="left_menu_IPD.jsp"%> --%>
				<%
			
			int deptid=1;
				String moduleName = (String) session.getAttribute("moduleName");

				String pageIncludeType = request
							.getParameter("pageIncludeType");

				if (deptid==2) {
			%>
			<%@include file="left_menu_IPD.jsp"%>
			<%
				} else {
			%>
			<%-- <%@include file="menu_DoctorDesk.jsp"%> --%>
			<%@include file="dd_menu_DoctorDesk.jsp"%>
			<%
				}
			%>
				<!--End Left Menu -->
	           
				<input id="hiddenDate" type="hidden" /> <input type="hidden"
					id="todays_date" value="<%=todays_date%>" />

				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12" style="min-height: 1519.4px;">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: -5px;">
												<li>Date : <%=todays_date%></li>
												<%
												if(deptid == 1){
												%>
													<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
													</li>
													<li><a href="OPDDoctorsDeskDashboard.jsp">OPD</a></li>
													<li>Doctor Desk</li>
												<% 		
												}else{
												%>
													<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
													</li>
													<li><a href="IPD_Dashboard.jsp">IPD</a></li>
													<li>IPD Doctor Station</li>
												<% 	
												}
												%>
												
												

												<div id="opdButtons" class="li pull-right">
												
													<button onclick="openmainPrintPopUp();" title="Print With History" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print Prescription">
														<i class="fa fa-print"></i>
													</button>
													
													<button id="curPreOPDPrint" class="btn btn-xs btn-warning" data-toggle="tooltip"
													data-placement="left" title="Print Without History "
													onclick="printOPDMainWithoutHistory()" title="Print WithOut History"  >
													<i class="fa fa-print"></i>
												</button>
													<button id="ipdPrintBtn" onclick="printCurrentPrescriptionNewIpd('PRINT')"
													title="" data-placement="left" data-toggle="tooltip"
													class="btn btn-xs btn-warning" data-original-title="Print " style="display: none;">
													<i class="fa fa-print"></i>
												</button>
												
												</div>

											</ul>
										</div>
									</div>
								
						<div class="alert alert-block alert-info fade in col-md-12-1"style="padding-block-end:5%; padding-top:3%;margin-top:-29px;">
						
							<div class="row">
								<div class="col-md-1">
									<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11">
									<div class="col-md-12">
										<div class="col-md-3">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="<%=request.getParameter("pid")%>">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("tid")%>">
											<input type="hidden"  id="token_No" value="<%=request.getParameter("tokenNo")%>">
											<input type="hidden"  id="bill_Id" value="0">
											<input type="hidden"  id="depdocdeskid" value="1">
											<input type="hidden"  id="clinicalEvalBMIPK" value="0">
											<%-- <input type="hidden"  id="doctorId" value="<%=request.getParameter("doctorId")%>"> --%>
											 <input type="hidden"  id="doctorId" value="0"><%-- //added by dayanand(12-1-2022) for getting latest consultant doctor id--%>
											<input type="hidden"  id="wardFlag" value="<%=request.getParameter("wardFlag")%>">
											<input type="hidden"  id="pathoMngmnt" value="<%=resourceBundleEhat1.getObject("pathologyManagement").toString()%>">
											<input type="hidden"  id="shraddhaFlow" value="<%=resourceBundleEhat2.getObject("shraddha").toString()%>">
										    <input type="hidden"  id="risingFlow" value="<%=resourceBundleEhat2.getObject("rising").toString()%>">
											<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  <label id="patientId" class="control-label" style="display: none"></label> 
											<label class="control-label lblBold" id="lblCenterPIdVal"></label>
											<label id="pIdd" class="control-label" ></label>
											<input type="hidden"  id="documentId" value="0">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Age:</label> <label id="age" class="control-label"></label>
											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label id="patientName" class="control-label"></label>
											</div>
										</div>
									
								<div class="col-md-2" >
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>
											</div>
										</div>
											
									
									
										
										
										<div class="col-md-3" style="display: none;">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BillNo: </label>  <label id="billNo" class="control-label"></label> 
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label"></label>
											</div>
										</div>
											<div class="col-md-2" >
											<div class="form-group">
												<label class="control-label lblBold">Bill No:</label> <label id="billNo1" class="control-label"> </label>
											</div>
											</div>
										
										
											
                                      <div class="col-md-4">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>   
                                              </div>
                                         </div> 
                                         
                                          <div class="col-md-2">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label class="control-label lblBold">Height/weight: </label> <label id="h_w" class="control-label"></label> 
                                              </div>
                                    	</div>
                                        
																				
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Opd No :</label> <label id="opdNo" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="billCategoty" class="control-label"> </label>
											</div>
										</div>
									

				                      <div class="col-md-4" >
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>
											</div>
										</div>
										
										 <div id="finalAdvancediv" class="col-md-2">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label class="control-label lblBold">Common Advance :</label> <label id="finalAdvance" class="control-label"></label> 
                                              </div>
                                    	</div>	
						
						                   <div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatmentId")%></label>
											</div>
											</div>
											
										   <div class="col-md-6">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>
											</div>
										</div>
							                 
										
										
										                                         
                                         <div class="col-md-2">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label id="hallnm" style="display: none" class="control-label lblBold">Hall:</label> <label id="hallName" class="control-label"></label> 
                                              </div>
                                    	</div>	
                                    	
 									</div>
								</div>
							</div>
						</div>
								<!-- 	<div id="commonPatInfo" class="col-md-12-1"
										style="margin-top: -18px;"></div> -->
								</div>
								<!-- Page Date Print Discards-->

								<!-- Start Tab UI -->
								<div class="col-md-12-1"
									style="margin-top: 30px; margin-left: 0px;">
									<!-- Start BOX -->
									<div class="box border col-md-12-1">
									
										<div class="divide-10"></div>
										<div class="tabbable col-md-12-1">
											<ul class="nav nav-tabs">

												
												 
												<li  class="ehatList"  id="coverSheet" onclick="setTemForcoversheet(this.id);" ><a 
														><span class="hidden-inline-mobile">Cover
																Sheet</span></a></li>	
																
													 <li class="active ehatList"  id="History" onclick="giveHistoryTemplate(this.id);"><a ><span
															class="hidden-inline-mobile">History</span></a></li>
												<!-- <li class="ehatList" id="Cover_History_Opd"  onclick="setNewtempDoctorDesk(this.id);" style="display: none"><a ><span
												class="hidden-inline-mobile">Cover History</span></a></li>	 -->
												
												<li class="ehatList"  id="Assessment" onclick="getDignosisTemplate(this.id);" ><a ><span
														class="hidden-inline-mobile">Diagnosis</span></a></li>
														
													<!-- 	<li  class="ehatList" id="drround" onclick="setNewtempDoctorDesk(this.id);" ><a ><span
														class="hidden-inline-mobile"   style="display: none">Doctor Round</span></a></li> -->
														
														<li class="ehatList" id="cpoe" onclick="setOpdServicesAdvisedTemplate(this.id);" ><a ><span
														class="hidden-inline-mobile">Services Advised</span></a></li>
														
														<!-- <li class="ehatList" id="prescription"   onclick="setNewtempDoctorDesk(this.id);" ><a ><span
															class="hidden-inline-mobile">Prescription</span></a></li> -->
															
															<li class="ehatList" id="prescription" onclick="getPrescriptionTemplate(this.id);" ><a ><span
															class="hidden-inline-mobile">Prescription</span></a></li>
															
														<!-- <li class="ehatList" id="dialysisAdvice"   onclick="setNewtempDoctorDesk(this.id);" style="display: none"><a ><span
															class="hidden-inline-mobile">Dialysis Advice</span></a></li> -->	
												
											<!-- 	<li class="ehatList"  id="OrderForm" onclick="setNewtempDoctorDesk(this.id);featchOrderFormByDate();"><a ><span
                                                        class="hidden-inline-mobile" style="display: none">Prescription</span></a></li> -->
												
															
															<li class="ehatList" id="SurgeryAdvices" onclick="getSexAdviceTemplate(this.id);" ><a ><span
															class="hidden-inline-mobile">Sx Advice</span></a></li>
															
														<li class="ehatList" id="instructiontab1"   onclick="getInstructionTemplate(this.id);" ><a ><span
															class="hidden-inline-mobile">Instruction</span></a></li>
															 
															<li class="ehatList" id="diet"   onclick="getDietTemplate(this.id);" ><a ><span
															class="hidden-inline-mobile">Diet</span></a></li>

												<!-- <li class="ehatList" id="ADNOTE2"
													onclick="setNewtempDoctorDesk(this.id);"
													style="display: none"><a><span
														class="hidden-inline-mobile">Admission Note</span></a></li> -->
														
														
														<li class="ehatList" id="staging" onclick="getTemForOPDStaging(this.id);"><a ><span
															class="hidden-inline-mobile">Clinical Staging</span></a></li>
															
															<!-- <li class="ehatList"  id="subObj" onclick="setNewtempDoctorDesk(this.id);getAllBodyPart();fetchAllSubobjTemplate();FetchEMRAssignedCompFind(0);fetchCKEditorDocterDesk1();"><a ><span
														class="hidden-inline-mobile">Clinical Evaluation</span></a></li> -->
														
														<li class="ehatList"  id="subObj" onclick="getClinicalEvaluationTemplate(this.id);"><a ><span
														class="hidden-inline-mobile">Clinical Evaluation</span></a></li>
															

                                                     <li class="ehatList" id="INDENT" onclick="setNewtempDoctorDesk(this.id);"  style="display: none"><a><span
														class="hidden-inline-mobile">Indent</span></a></li>




												
												<!-- <li><a data-toggle="tab" href="#Prescription"><i.
														class="fa fa-home"></i> <span class="hidden-inline-mobile">Prescription</span></a></li> -->
												
											
												
												<li class="ehatList" id="Upload_Document" onclick="temForUploadDocumentOPD(this.id);"  ><a  ><span
															class="hidden-inline-mobile">Upload Document</span></a></li>

                                                
                                               <!--  <li class="ehatList" id="iStudy"   onclick="setNewtempDoctorDesk(this.id);" style="display: none"  ><a  ><span
															class="hidden-inline-mobile">Study</span></a></li> -->
										
															
												
											</ul>
											<div class="divide-10"></div>
											
											
							<div id="formulapopupdiv"  class="modal fade in"></div>
							
								<div id="ICD10ButtonPopup" class="modal fade">
						<div class="modal-dialog col-md-10-1"
							style="margin-top: 5%; margin-left: 10%; padding: 5px;">
							<div class="modal-content" class="col-md-12-1"
								style="height: 535px;">
								<div class="col-md-12-1" style="margin: 0px; padding: 10px;">
									<div style="float: right; padding-right: 6px;">
										<button class="btn btn-xs btn-danger" data-dismiss="modal"
											type="button">
											<i class="fa fa-arrows"></i> Close
										</button>
									</div>
								</div>

								<div class="col-md-12-1"
									style="background-color: #EEEEEE; padding: 5px; height: 34px;">
									<div style="width: 8%; float: left; padding-top: 5px;">
										ICD Code: <b style="color: red; padding-left: 2px;">*</b>
									</div>
									<div style="width: 9%; float: left;">
										<input type="text" id="txtIcdCode" style="width: 100%;"
											placeholder="Level1 ICD Code..." /> <input id="idIcd10L"
											type="hidden" value="0" />
									</div>

									<div
										style="width: 8%; float: left; padding-top: 5px; margin-left: 25px;">
										ICD Diagnosis: <b style="color: red; padding-left: 2px;">*</b>
									</div>
									<div style="width: 24.5%; float: left;">
										<input type="text" id="txtIcdDiagnosis" style="width: 100%;"
											placeholder="Level1 ICD Diagnosis..." />
									</div>

									<div
										style="width: 13%; float: left; padding-top: 5px; padding-left: 1%">
										Diagnosis & Description: <b
											style="color: red; padding-left: 2px;">*</b>
									</div>
									<div style="width: 24.5%; float: left;">
										<input type="text" id="txtIcdDiagnosis1" style="width: 100%;"
											placeholder="Level1 Diagnosis & Description..." />
									</div>

									<div style="float: right;">
										<button id="a" class="btn btn-xs btn-success editUserAccess"
											onclick="saveICDDiagnosisLevelOPD('1')" disabled="disabled">
											<i class="fa fa-save"></i> Save Level1 ICD
										</button>
									</div>
									<div style="float: right;">
										<button id="b" class="btn btn-xs btn-success editUserAccess"
											onclick="saveICDDiagnosisLevelOPD('0')" disabled="disabled">
											<i class="fa fa-save"></i> Save Level1 ICD
										</button>
									</div>
								</div>

								<!-- Start Search for ICD Option -->
								<div class='col-md-12-1' style="margin-top: 20px">
									<div style="font-weight: bold;" class="col-md-1">Search
										By:</div>
									<div class="col-md-1-1">ICD Diagnosis:</div>
									<div class="col-md-3-1 " id="divByICD">
										<input style="width: 100%;" name="byName" type="text"
											class="form-control input-SmallText " id="byName" onkeyup="getAutoSuggestionDiagoNameOnPopUp(this.id)"/>
									</div>
									<!-- <div class="col-md-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="edit"
											onclick="fetchICD10Level1('search')" />
									</div> -->
								</div>

								<!-- End Search for ICD Option -->

								<!-- Start Header for New Edit Delete Option -->
								<div id="ICDCodeTempDiv"class="col-md-12-1"
									style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">
									<label id="setAddICDCodeTempLabel"
										style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;display: none">
										<i class="fa fa-plus"></i> New
									</label> <label id="deleteIcd10LCodeLabel"
										style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px; display: none">
										<i class="fa fa-trash-o"></i> Delete
									</label>
								</div>
								<!-- End Header for New Edit Delete Option -->

								<div class="col-md-12-1" style="margin: 0px">
									<table class="table table-condensed" style="margin-top: 10px;">
										<thead>
											<tr>
												<th class='col-md-1-1 center'>#</th>
												<th class='col-md-1-1 center'>ICD Code</th>
												<th class='col-md-3-1 center'>ICD	Diagnosis</th>
												<th class='col-md-1-1 center'>UPDATE</th>
												<th class='col-md-1-1 center'>Delte</th>
											</tr>
										</thead>
									</table>
								</div>

								<div id="flip-scroll" class="col-sm-12-1"
									style="overflow-y: scroll; height: 375px; maxheight: auto; margin-top: -22px;">
									<table
										class="table table-bordered table-striped table-condensed cf">
										<tbody id="DRRDiv1">
										</tbody>
									</table>
								</div>

							</div>
						</div>
					</div>
					<!--/click Popup modal for ICD10-->
											
											
											<div id="ipdDoctorStationJSPHeadDiv" class="tab-content">
												
                                        <!-- cover sheeet Statr opd by paras @date :13 jun-2017  -->
                                        <!-- end cover sheet -->
                                        
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
															<label for="exampleInputEmail1" class="TextFont">Doc
																Date </label><input id='popup_container2'
																onclick="displayCalendar(document.getElementById('popup_container2'),'dd-mm-yyyy',this)"
																readonly='readonly' name='dob' type='text'
																placeholder='Date' value="<%=todays_date%>"
																class='form-control input-SmallText'> <input
																type="hidden" name="receivedFrom" value="doctorstation"
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
																			<!-- End Save DRR Section -->

																			<!-- End Column:2 Row:2 -->

																			<!-- Start Column:2 Row:3 -->
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
																									<!-- <th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Advice</div></th> -->
																									<!-- <th style="height: 21.5px;"
																										class="col-md-3-1 center"><div
																											class="TextFont">Instructions</div></th> -->
																									<th style="height: 21.5px;"
																										class="col-md-2-1 center"><div
																											class="TextFont">Duration</div></th>
																									<!-- <th style="height: 21.5px;"
																										class="col-md-2-1 center"><div
																											class="TextFont">Status</div></th> -->
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

																		<div style="margin-top: 00px;"
																			class="box border primary">
																			<div class="box-title">
																				<h4>
																					<i class="fa fa-table"></i>Generated Indent
																					Information
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
																				<table class="table table-striped"
																					style="margin-top: 40px;"">
																					<thead style="background: white;" class="cf">
																						<tr>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Sr.</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Product
																									Name</div></th>

																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Required
																									Qty</div></th>
																						</tr>
																					</thead>
																					<tbody id='preIndentDataById'>

																					</tbody>
																				</table>
																			</div>
																		</div>

																		<div style="margin-top: 00px;"
																			class="box border primary">
																			<div class="box-title">
																				<h4>
																					<i class="fa fa-table"></i>Received Indent
																					Information

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
																						<i class="fa fa-star"></i><b>Indent Sale No -<span
																							id='divIndentSaleNo'></span>
																					</div>
																					<div class='col-md-4-1'>
																						<i class="fa fa-calendar"></i>Indent Received Date
																						-</b> <span id='divIndentReceiveDate'></span>
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
																								style="height: 21.5px;"><div>Batch
																									Code</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Batch
																									Expiry</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Qty</div></th>
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

																		<div class="form-group col-md-7-1"
																			style="margin-top: 15px;">
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
																		<li class=""><a data-toggle="tab"
																			href="#divIndentMaster"><i class="fa fa-user"></i>
																				<span class="hidden-inline-mobile" onclick="">Indent
																					Master</span></a></li>
																		<li class=""><a data-toggle="tab"
																			href="#divCancelIndentMaster"><i
																				class="fa fa-user"></i> <span
																				class="hidden-inline-mobile" onclick="cancelIndentByTreatmentId()">Cancel
																					Indent </span></a></li>			
																	</ul>
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
																									class="table table-bordered table-striped table-condensed" style="margin-top:1%">
																									<thead>
																										<tr>
																											<th class="col-md-2 center">select</th>
																											<th class="col-md-2 center">#</th>
																											<th class="col-md-2 center">Product
																												Name</th>
																											<th class="col-md-2 center">Required
																												Quantity</th>
																											<th class="col-md-2 center">Total
																												Quantity</th>


																											<!-- 	<th class="col-md-2-2 center">Factor 1</th>
																											<th class="col-md-2-2 center">Factor 2</th>
																											<th class="col-md-2-2 center">Factor 3</th>
																											<th class="col-md-2-2 center">Factor 4</th> -->
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
																							class='form-control input-SmallText'><option
																								value="0">Main Store</option></select>
																					</div>

																					<div class=" col-sm-2-1"
																						style="margin-left: 2%; margin-top: 2%">
																						<input type="button"
																							onclick="savePharmacyIndent()"
																							class="btn btn-xs btn-success editUserAccess"
																							value="Generate Indent" disabled="disabled">
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
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Status</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Generated
																									From</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Store
																									Name</div></th>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>View</div></th>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Cancel</div></th>
																						</tr>
																					</thead>
																					<tbody id='preIndentData'>

																					</tbody>
																				</table>
																			</div>

																			<div id="divCancelIndentMaster"
																				class="tab-pane fade " style="overflow-x: auto;">
																				<table style="margin-top: 10px; width: 100%;"
																					class="table table-striped table-bordered header-fixed cf ">
																					<thead style="background: white;" class="cf">
																						<tr>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>Sr.</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Indent
																									Date</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Status</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Generated
																									From</div></th>
																							<th class="col-md-2 center"
																								style="height: 21.5px;"><div>Store
																									Name</div></th>
																							<th class="col-md-1 center"
																								style="height: 21.5px;"><div>View</div></th>
																						</tr>
																					</thead>
																					<tbody id='cancelIndentData'>

																					</tbody>
																				</table>

																			</div>
																			
																			<!-- Suraj code for indent master -->
																			<div class="col-md-12" style="margin-top: 2%"
																				id="indentMasterListDiv">

																				<table cellspacing="0" cellpadding="0" border="1"
																					class="table table-bordered table-striped table-condensed">
																					<thead>
																						<tr>
																							<th class="col-md-2-2 center">select</th>
																							<th class="col-md-2-2 center">#</th>
																							<th class="col-md-2-2 center">Template Name</th>
																							<th class="col-md-1 center">Description</th>
																							<th class="col-md-2-2 center">Edit</th>
																							<th class="col-md-2-2 center">Delete</th>
																							<th class="col-md-2-2 center">View</th>
																						</tr>
																					</thead>
																					<tbody
																						style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;"
																						id="indetTemplateList">

																					</tbody>
																				</table>

																			</div>
																		</div>
																	</form>
																</div>
															</div>
															<!-- /BOX -->
														</div>
													</form>
												</div>
												<!-- /BOX-->
												<!-- End Code for #indent GUI -->
												<!-- Start Code for Assesment GUI -->
												<!-- End Code for Assesment GUI -->
												<!-- Start Code for #Prescription GUI -->
												<!-- End Code for #Prescription GUI -->
												 <!-- Start Code for CPOE GUI -->
												<!-- End Code for CPOE GUI -->

												<!-- Start Code for #Upload_Document GUI -->
												<div id="Upload_Document" class="tab-pane fade">
													<%-- <form method="post" id="documentForm" name="documentForm" enctype="multipart/form-data"> --%>
														<div class="centered">
															<div class="divide-10"></div>
															<div class="col-md-12-1" style="height: 50px;">
															<label class="col-md-2-1"
																style="margin-top: 3px; padding-left: 5px;">
																Select a File to Upload: </label> 
																<!-- <input type="file" name="file" id="ifile"
																style="margin-top: 0px; cursor: pointer;" multiple="multiple" /> --><br />
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
																
																
																<div id="Cover_History_Opds" class="tab-pane fade">
																
																	<div class="panel-body">
																		<table class="table table-bordered header-fixed cf "
																			style="Width: 100%; margin-top: 5px;">
																			<thead class="cf" style="background: white;">
																				
																			</thead>
																			<tbody id="coverHistoryDetailsOpd"
																			style="max-height: auto; overflow-y: auto;">
																			
																			</tbody>
																		</table>
																		
																		</div>
																		
																</div>
																
																
																
															<!-- Modal for view upload document -->
															
                                        <!-- Start Code for #History(Date:-08/10/2016) GUI -->
												<div id="History" class="tab-pane fade">
                                                <div id="historyRow" class="col-md-12-1"
														style="padding-top: 0px;">
													</div>
														<div class="tabbable tabs-left col-md-12-1"
															style="margin-top: -9px; margin-left: 5px;">
															<ul class="nav nav-tabs" style="height: 380px;">
																<li class="active"><a href="#chiefComplaints"
																	data-toggle="tab"> Chief Complaints and Duration </a></li>
																<li><a href="#pastMedHistory" data-toggle="tab">
																		Past Medical History </a></li>
																<li><a href="#PastPresentFamilyHistory" data-toggle="tab">
																		Past/Present/Family History </a></li>
																<li><a href="#OnExaminations"
																	data-toggle="tab"> On Examinations </a></li>
																<li><a href="#SystematicExaminations"
																	data-toggle="tab"> Systematic Examinations </a></li>
																
															</ul>
															
															<div class="tab-content col-md-9-1"
																style="margin-top: 0px;">
														<div id="chiefComplaints"
																	class="tab-pane fade in active col-md-12-1">
																	
													<div class="tab-content col-md-12-1"
																style="margin-top: 8px;">
														<div class="col-sm-12-1" style="padding-left: 30%;padding-top: 5px;">
														
														<div class="col-sm-3-1" style="margin-top: 15px;">
															<label class="TextFont">Medical Officer Name.</label>
														</div>
														<div class="col-sm-3-1" style="padding-left: -5%; margin-top: 15px;">
															<input type="text" class="form-control input-SmallText"
																id="medOffName" name="name" readonly="readonly" value="Mr. Yashwant Ramakant Kokate"/>
														</div>
														
														<div class="col-sm-2-1" style="margin-top: 15px; padding-left: 3%;">
															<label class="TextFont">MRN No.</label>
														</div>
														<div class="col-sm-3-1" style="margin-top: 15px;">
															<input type="text" class="form-control input-SmallText"
																id="mrn" name="mrn" readonly="readonly" value="MS16170000001483"/>
														</div>
											
													</div>
													
												<div class="col-sm-1-1" style="margin-top: -32px; margin-left:94%;">
													<div class="divide-10"></div>
												<button style="margin-left: 2px;" class="btn btn-xs btn-success"
													id="saveAddIpdHistory" data-toggle="tooltip"
													data-placement="left" title="Save History "
													onclick="saveAddIpdHistory()">
													<i class="fa fa-save"></i>
												</button>
												<button class="btn btn-xs btn-warning" data-toggle="tooltip"
													data-placement="left" title="Print "
													onclick="IPDHistoryPrint();">
													<i class="fa fa-print"></i>
												</button> 
												
											</div>
													</div>
																	<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 25px;">
                                                                     </div>
                                                           <table class='table table-bordered'
															style='margin-top: 25px; width: 100%;'>
															<thead>
																<tr>
																	<th class='col-sm-1-1 center'
																		style='height: 21.5px; font-size: "103";'><label
																		class='TextFont'>#</label></th>
																	<th class='col-sm-4-1 center'
																		style='height: 21.5px; font-size: "3";'><label
																		class='TextFont'>Chief Complaints</label></th>
																	<th class='col-sm-6-1 center'
																		style='height: 21.5px; font-size: "3";'><label
																		class='TextFont'> Duration</label></th>
																	<th style='height: 21.5px; width: 25px;'><input
																		type="button" onclick="createDivIPDHistory()"
																		value="+" /> <input type="button"
																		onclick="removeChifComp('RowCount')" value="-" />
																</tr>
															</thead>
														</table>
														
														<div
														style='width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;'>
														<table
															class="table table-condensed table-bordered table-stripped cf">
															<tbody id="historyDiv">
															</tbody>
														</table>
													</div>
													
													<div class="col-md-10-1" style="padding-left: 1%; margin-top: 5%;" >
															<label class="TextFont">Clinical Findings:</label>
															<textarea id='clinicalFinding' rows='3' cols='52' class=""></textarea>
													</div>													
                                         			</div>
                                         			
                                         			<div id="pastMedHistory"
																	class="col-md-12-1 tab-pane fade in">
													<div class="tab-content col-md-12-1"
																style="margin-top: 8px;">
													</div>
																	
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 30px;">
                                                                     </div>
                                                            <div class="col-md-5-1 form-group"
															style="font: bold; padding-bottom: 1%; padding-top: 3%; padding-left: 2%;">
															<label>Past Medical History</label>

															<div id="tableContent"
																style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif; padding-top: 1%; font-size: 13px; float:;">

																<table style="border: 1px solid lightgrey;"
																	cellpadding="0" cellspacing="0">
																	<tr>
																		<td align="center"
																			style="height: 35px; border: 1px solid lightgrey;"></td>
																		<td align="center"
																			style="height: 35px; border: 1px solid lightgrey;">Yes/
																			No</td>
																		<td align="center"
																			style="height: 35px; border: 1px solid lightgrey;">Duration(Hr.)</td>

																	</tr>
																	<tr>
																		<td width="30%" align="center"
																			style="border: 1px solid lightgrey;">DM</td>
																		<td style="border: 0.2px solid lightgrey;" width="20%";><input
																			type="checkbox" name=""
																			style="width: 105%; border: 0.2px solid lightgrey;"
																			id="chkDm" /></td>
																		<td><input type="text" name=""
																			style="width: 100%; border: 0.2px solid lightgrey;"
																			id="txtDm" /></td>

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
																		<td><input type="text" name=""
																			style="width: 100%; border: 0.2px solid lightgrey;"
																			id="txtOther"></td>
																	</tr>

																</table>
															</div>
														</div> 
														
														<div class="col-md-4-1" style="padding-left: 10%; margin-top: 2%;" >
															<label class="TextFont">Past Surgical History:</label>
															<textarea id='pastSurgHistory' rows='3' cols='52' class=""></textarea>
														</div>
														
														<div class="col-md-4-1" style="padding-left: 10%; margin-top: 2%;">
															<label class="TextFont">Medications:</label>
															<textarea id='medications' rows='3' cols='52' class=""></textarea>
														</div>
                                                </div>
                                                <div id="PastPresentFamilyHistory"
																	class="col-md-12-1 tab-pane fade in">
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 58px;">
                                                                     </div>
                                                          <div class="col-md-4-1">
															<label class="TextFont">Past Reguler :</label>
															<textarea id='pastReguler' rows='3' cols='40' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">Present Reguler :</label>
															<textarea id='PresentReguler' rows='3' cols='40' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">GYNAE/OBS History :</label>
															<textarea id='gynac' rows='3' cols='40' class=""></textarea>
														</div>
														<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1%;">
														<div class="divide-10"></div>
														<div class="col-md-4-1">
															<label class="TextFont">Any allergies or adverse
																drug reactions?:</label>
															<textarea id='drugReaction' rows='3' cols='40' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">Family History:</label>
															<textarea id='familyHis' rows='3' cols='40' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">Personal History:</label>
															<textarea id='perHistory' rows='3' cols='40' class=""></textarea>
														</div>
													</div>
												<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1%;">
														<div class="divide-10"></div>
														<div class="col-md-4-1">
															<label class="TextFont">Habbits:</label>
															<textarea id='habbits' rows='3' cols='40' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">Bowel:</label>
															<textarea id='bowel' rows='3' cols='40' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">Blader:</label>
															<textarea id='blader' rows='3' cols='40' class=""></textarea>
														</div>
													</div>
													</div>
													<div id="OnExaminations"
																	class="col-md-12-1 tab-pane fade in">
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 58px;">
                                                                     </div>
                                                             <div class="form-group Remove-Padding col-md-4-1"
															style="padding-left: 15px;">
															<div class="divide-10"></div>
															<label class="TextFont">VITALS:</label>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">Temperature:</label> <input
																	type="text" id="temparature" name="temparature"
																	placeholder="Temparature"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Pulse:</label> <input
																	type="text" id="pulse" name="pulse" placeholder="Pulse"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">BP :</label> <input type="text"
																	id="bp" name="bp" placeholder="BP"
																	class="form-control input-SmallText" />
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
																		class="form-control input-SmallText" />
																</div>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 5px;">
																	<label class="TextFont">Clubbing:</label> <input
																		type="text" id="clubbing" name="Clubbing"
																		placeholder="Clubbing"
																		class="form-control input-SmallText" />
																</div>

																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 5px;">
																	<label class="TextFont">Lymph Adenopathy:</label> <input
																		type="text" id="lymph" name="Lymph Adenopathy"
																		placeholder="Lymph Adenopathy "
																		class="form-control input-SmallText" />
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
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Oedema:</label> <input
																	type="text" id="oedema" name="Oedema"
																	placeholder="Oedema"
																	class="form-control input-SmallText" />
															</div>
														</div>
													</div>
													<div id="SystematicExaminations"
																	class="col-md-12-1 tab-pane fade in">
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 58px;">
                                                                     </div>
                                                  <div class="col-md-12-1"
														style="left: 15px; margin-top: 1%;">
														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px;">
															<label class="TextFont">R/S:</label> <input type="text"
																id="rs" name="R/S " placeholder="R/S"
																class="form-control input-SmallText" />
														</div>

														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px; margin-left: 45px;">
															<label class="TextFont">CVS:</label> <input type="text"
																id="cvs" name="CVS" placeholder="CVS"
																class="form-control input-SmallText" />
														</div>

														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px; margin-left: 45px;">
															<label class="TextFont">CNS:</label> <input type="text"
																id="cns" name="CNS" placeholder="CNS"
																class="form-control input-SmallText" />
														</div>

														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px; margin-left: 45px;">
															<label class="TextFont">PA:</label> <input type="text"
																id="pa" name="PA" placeholder="PA"
																class="form-control input-SmallText" />
														</div>
                                                     </div>
                                                     <div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 3%;">
														<div class="divide-10"></div>
														<div class="col-md-6-1">
															<label class="TextFont">Local Examinations:</label>
															<textarea style='margin-left: 3%;' id='localExm' rows='3'
																cols='40' class=""></textarea>
														</div>
														<div class="col-md-6-1" style="padding-left: 0.8%;">
															<label class="TextFont">Investigation Reports:</label>
															<textarea style='margin-left: 1%;' id='invsRep' rows='3'
																cols='40' class=""></textarea>
														</div>
													</div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 3%;">
														<div class="divide-10"></div>
														<div class="col-md-6-1">
															<label class="TextFont" >Provisional Diagnosis:</label>
															<textarea style='margin-left: 0%;' id='provDia' rows='3'
																cols='40' class=""></textarea>
														</div>
														<div class="col-md-6-1" style="padding-left: 0.8%;">
															<label class="TextFont">Treatment Plan:</label>
															<textarea style='margin-left: 9%;' id='treatPlan'
																rows='3' cols='40' class=""></textarea>
														</div>
													</div>
													</div>
                                         		</div>
											</div>
                                           </div>
                                 <!-- End Code for #History GUI -->


												<!-- Start Code for #OrderForm GUI -->
												<div id="OrderForm" class="tab-pane fade">

													<!-- Start Save DRR Section -->
													<div class="col-sm-12-1" style="padding-left: 30px;">
														<div class="col-sm-1-1" style="margin-top: 6px;">
															<label class="TextFont">Order Form</label>
														</div>

														<div class="col-sm-3-1" style="margin-top: 15px;">
															<input type="text"
																class="form-control input-SmallText col-sm-6-1"
																id="OFdate-pick" name="date-pick"
																onchange="checkDate(),setDoctorPreRound(),featchOrderFormByDate()"
																onclick="displayCalendar(document.getElementById('OFdate-pick'),'dd/mm/yyyy',this)"
																 />
															<div class="col-sm-5-1"
																style="margin-top: 2px; margin-left: 5px;">
																<label class="TextFont col-sm-6-1">Order ID : </label>
																<div id="divOmID" class="col-sm-6-1"></div>
															</div>
														</div>


														<div class="col-sm-5-1"	style="margin-top: 10px; float: right; margin-right: 0px;">
															<div class="col-md-6-1" > General Medicine: 
															<input id="medicineNotAvailableCheckbox" type="checkbox" style="cursor: pointer;" /></div>
															<div class="col-md-6-1">
																<button class="btn btn-xs btn-success editUserAccess"
																	onclick="saveOrderFormDetails('OrderForm')"
																	style="line-height: 1.2;float: right;" disabled="disabled">
																	<i class="fa fa-save"></i> Save Order Form
															</button>
														</div>
														</div>
													</div>
													<!-- End Save DRR Section -->

													<div class="col-md-12-1"
														style="height: 70px; margin-top: 0px;">
														<div id="row1" class="col-sm-12-1"
															style="margin-top: 0px;">

															<!-- Start Popup UI Code -->
															<!-- <div id="PrepPopup" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> -->
															<div id="PrepPopup" class="modal fade in">
																<div class="modal-dialog col-md-8-1"
																	style="margin-left: 300px; margin-top: 150px;">
																	<div class="modal-content">
																		<div class="modal-body" class="col-md-12-1"
																			style="border: 1px solid black;">

																			<div class="col-md-12-1">
																				<button class="close" aria-hidden="true"
																					data-dismiss="modal" type="button">×</button>
																			</div>
																			<div class="divide-10"></div>
																			<div id="popupRow1" class="col-md-12-1">
																				<div class="form-group Remove-Padding col-sm-2-1">
																					<div class="divide-10"></div>
																					<label class="TextFont"> Prep. </label> <input
																						type="text" placeholder="Prep."
																						class="form-control" />
																				</div>
																				<div class="form-group Remove-Padding col-sm-2-1">
																					<div class="divide-10"></div>
																					<label class="TextFont"> Name </label> <input
																						type="text" placeholder="Name"
																						class="form-control" />
																				</div>
																				<div class="form-group Remove-Padding col-sm-2-1">
																					<div class="divide-10"></div>
																					<label class="TextFont"> Strength </label> <input
																						type="text" placeholder="Strength"
																						class="form-control" />
																				</div>
																				<div class="form-group Remove-Padding col-sm-2-1">
																					<div class="divide-10"></div>
																					<label class="TextFont"> Product Code </label> <input
																						type="text" placeholder="Product Code"
																						class="form-control" />
																				</div>
																				<div class="form-group Remove-Padding col-sm-2-1">
																					<div class="divide-40"></div>
																					<label class="TextFont"
																						style="padding-left: 45px; padding-top: 5px;">
																						Fetch from Stock </label>
																				</div>
																				<div class="form-group Remove-Padding">
																					<div class="divide-40"></div>
																					<div class="make-switch switch-mini"
																						data-on="warning" data-off="danger">
																						<input type="checkbox">
																					</div>
																				</div>
																			</div>
																			<div id="popupRow2" class="col-md-12-1"
																				style="margin-top: 15px;">
																				<div class="form-group Remove-Padding col-sm-3-1">
																					<div class="divide-10"></div>
																					<label class="TextFont"> Generic Name </label> <input
																						type="text" placeholder="Generic Name"
																						class="form-control" />
																				</div>
																				<div class="form-group Remove-Padding col-sm-2-1">
																					<div class="col-md-8-1">
																						<label class="TextFont" style="margin-top: 19px;">
																							Search By </label>
																					</div>
																					<div class="col-md-9-1" style="padding-top: 5px;">
																						<input type="radio" /> <label> Product
																							Name </label>
																					</div>
																					<div class="col-md-0-1">
																						<input type="radio" /> <label> Generic
																							Name </label>
																					</div>
																				</div>
																				<div class="form-group col-md-2-1"
																					style="padding-top: 45px;">
																					<button type="submit"
																						class="btn btn-primary col-md-9-1">
																						search
																						<!-- <span class="fa fa-search"></span> -->
																					</button>
																				</div>
																			</div>

																			<div id="popupRow3" class="col-md-12-1">
																				<!--Start Row: 3 -->
																				<div class="col-md-12-1"
																					style="margin-top: 7px; margin-left: 0px;">
																					<div class="col-sm-6-1" style="height: 230px;">
																						<div class="col-sm-12-1" style="margin-top: 0px;">
																							<h6 style="margin-left: 5px;">Search Results</h6>
																						</div>
																						<table class="table table-condensed"
																							style="border-top: 1px solid orange; border-right: 1px solid orange;">
																							<thead>
																								<tr>
																									<th class="col-md-1-1"><div
																											class="TextFont">#</div></th>
																									<th class="col-md-2-1"><div
																											class="TextFont">Prep.</div></th>
																									<th class="col-md-2-1"><div
																											class="TextFont">Drug</div></th>
																									<th class="col-md-3-1"><div
																											class="TextFont">Generic Name</div></th>
																									<th class="col-md-3-1"><div
																											class="TextFont">Available Qty</div></th>
																									<th class="col-md-1-1"><div
																											class="TextFont">Use</div></th>
																								</tr>
																							</thead>
																						</table>
																						<!--<div id="flip-scroll" overflow-y: scroll; -->
																						<div id="flip-scroll" class="col-sm-12-1"
																							style="border-top: 1px solid black; border-right: 1px solid orange; height: 170px; maxheight: auto; margin-top: -21px;">
																							<table class="table table-condensed">
																								<tbody>
																									<tr>
																										<td class="col-md-1-1">kbdfb</td>
																										<td class="col-md-2-1">dfbdg</td>
																										<td class="col-md-2-1">dfbdg</td>
																										<td class="col-md-3-1">kbdfb</td>
																										<td class="col-md-3-1">dfbdg</td>
																										<td class="col-md-1-1 fa fa-plus-square"></td>
																									</tr>
																									<tr>
																										<td class="col-md-1-1">kbdfb</td>
																										<td class="col-md-3-1">dfbdg</td>
																										<td class="col-md-3-1">dfbdg</td>
																										<td class="col-md-3-1">kbdfb</td>
																										<td class="col-md-1-1">dfbdg</td>
																										<td class="col-md-1-1 fa fa-plus-square"></td>
																									</tr>
																								</tbody>
																							</table>
																						</div>
																					</div>
																					<div class="col-sm-6-1"
																						style="height: 230px; margin-top: 0px;">
																						<div class="col-sm-12-1">
																							<h6 style="margin-left: 5px;">Alternatives
																								Available</h6>
																						</div>
																						<table class="table table-condensed"
																							style="border-top: 1px solid orange;">
																							<thead>
																								<tr>
																									<th class="col-md-1-1"><div
																											class="TextFont">#</div></th>
																									<th class="col-md-2-1"><div
																											class="TextFont">Prep.</div></th>
																									<th class="col-md-2-1"><div
																											class="TextFont">Drug</div></th>
																									<th class="col-md-3-1"><div
																											class="TextFont">Generic Name</div></th>
																									<th class="col-md-3-1"><div
																											class="TextFont">Available Qty</div></th>
																									<th class="col-md-1-1"><div
																											class="TextFont">Use</div></th>
																								</tr>
																							</thead>
																						</table>
																						<div id="flip-scroll" class="col-sm-12-1"
																							style="height: 170px; border-top: 1px solid black; maxheight: auto; margin-top: -21px;">
																							<table class="table table-condensed">
																								<tbody>
																									<tr>
																										<td class="col-md-1-1">kbdfb</td>
																										<td class="col-md-2-1">dfbdg</td>
																										<td class="col-md-2-1">dfbdg</td>
																										<td class="col-md-3-1">kbdfb</td>
																										<td class="col-md-3-1">dfbdg</td>
																										<td class="col-md-1-1 fa fa-plus-square"></td>
																									</tr>
																									<tr>
																										<td class="col-md-1-1">kbdfb</td>
																										<td class="col-md-3-1">dfbdg</td>
																										<td class="col-md-3-1">dfbdg</td>
																										<td class="col-md-3-1">kbdfb</td>
																										<td class="col-md-1-1">dfbdg</td>
																										<td class="col-md-1-1 fa fa-plus-square"></td>
																									</tr>
																								</tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																				<!--End Row: 3 -->
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!-- End Popup UI Code -->

															<div id="col2" class="col-sm-1-1"
																style="margin-top: 10px; padding-left: 3px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Preparation<b
																		style="color: red; padding-left: 2px;">*</b></label> 
																		
<!-- 																	<select -->
<!-- 																		id="prep" class="form-control input-SmallText" -->
<!-- 																		onchange="fetchRouteTypeList('afterLoad')"> -->
<!-- 																	</select> -->

																	<!-- changed, aniket kanse, 22DEC21 -->
																	<select
																		id="prep" class="form-control input-SmallText"
																		onchange="fetchRoutesByPreparationId('prescription')">
																	</select>
																</div>
															</div>
															<div id="col3" class="col-sm-2-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">
																		Medicine Name <b
																		style="color: red; padding-left: 2px;">*</b>
																	</label>
																	<div id="divTagname">
																		<!-- <input type="text" placeholder="Name" id="name"
																			name="name" autocomplete="off"
																			class="typeahead form-control input-SmallText"
																			onkeypress="setPrescriptionAutocompleteNameID(this.id, 'afterLoad');" /> -->
																			
																			<!-- changed, aniket kanse 22 DEC 21 -->
																			<input type="text" placeholder="Name" id="name"
																			name="name" autocomplete="off"
																			class="typeahead form-control input-SmallText"
																			onkeypress="autoSuggestMedicines(this.id, 'prescription');" />
																	</div>
																	<input type="hidden" id="medicineID" value="0" />
																	<input type="hidden" id="paediatricsMedicineFlag" value="N" /> 
																	<input type="hidden" id="paediatricsMedicineCapacity" value="" />
																</div>
															</div>
															<div id="col4" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Strength</label>
																	<input type="text" placeholder="Strength"
																		name="strength" id="strength"
																		class="form-control input-SmallText" />
																</div>
															</div>
															<div id="col5" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Dose
																		Type</label> <input type="text" placeholder="Dose" name="dose"
																		id="dose"
																		onkeypress="return validateNumberMinusSign(event)"
																		class="form-control input-SmallText" />
																</div>
															</div>
															<div id="col4A" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont">Unit</label> <select
																		name="unit" id="unit"
																		class="form-control input-SmallText">
																	</select>
																</div>
															</div>
															
															<div id="col11" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">MO - AN - EV - NT </label>
																	<div class="col-sm-12-1" style=" margin-top: -5px; margin-left:2px">
																	<input id="mo" name="timeslot"  value="Morning"  onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	<input id="an" name="timeslot" value="Afternoon" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	<input id="ev" name="timeslot" value="Evening" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	<input id="nt"  name="timeslot" value="Night" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	</div>
																	
																</div>
															</div>
															
															<div id="col6" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Frequency</label>
																	<input type="text" placeholder="Frequency"
																		name="frequency" id="frequency"
																		onkeyup="calculateQuantity()"
																		onkeypress="return validateNumbers(event)"
																		class="form-control input-SmallText" readonly="readonly" />
																</div>
															</div>
															
															
															<div id="col7" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Instructions</label>
																	<select id="instruction"
																		class="form-control input-SmallText"></select>
																</div>
															</div>
															<div id="col8" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Route</label>
																	<select name="route" id="route"
																		class="form-control input-SmallText"><option
																			value="0">SELECT</option></select>
																</div>
															</div>
															<div id="col9" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Days<b
																		style="color: red; padding-left: 2px;">*</b></label> <input
																		type="text" placeholder="Days" name="days" id="days"
																		class="form-control input-SmallText"
																		onkeyup="calculateQuantity()"
																		onkeypress="return validateNumbers(event)" />
																</div>
															</div>
															<div id="col10" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">Quantity<b
																		style="color: red; padding-left: 2px;">*</b></label> <input
																		type="text" placeholder="Qty" name="qty" id="qty"
																		class="form-control input-SmallText"
																		onkeypress="return validateNumbers(event)" />
																</div>
															</div>
														</div>
													</div>
													
													<!-- End Column:2 Row:2 -->

													<!-- Start Column:2 Row:3 -->
													<div class="col-md-12-1" style="padding-top: 10px;">
														<div class="col-md-12-1">
															<!-- Start Header for New Edit Delete Option -->
															<div class="col-md-12-1"
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">
																<label class="btn" id="enableTextBoxesLabel"
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	value="New"> <i class="fa fa-plus"></i> New
																</label> <label class="btn" id="editOrderFormLabel"
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	value="Edit"> <i class="fa fa-edit"></i> Edit
																</label> <label class="btn" id="deleteOrderFormLabel"
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	value="Delete"> <i class="fa fa-trash-o"></i>
																	Delete
																</label>
															</div>
															<!-- End Header for New Edit Delete Option -->
															<div class="col-sm-12-1" style="margin-top: 0px;">
																<!--Start Table Heading -->
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">#</div></th>
																			<th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Drug</div></th>
																			<th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Prep.</div></th>
																			<!-- <th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Advice</div></th> -->
																			<th class="col-md-3-1 center" style="height: 21.5px;"><div
																					class="TextFont">Instructions</div></th>
																			<th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Duration</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont"></div></th>
																		</tr>
																	</thead>
																</table>
																<!--End Table Heading -->

																<!--Start Table Body -->
																<div id="flip-scroll" class="col-sm-12-1"
																	style="overflow-y: scroll; height: 290px; maxheight: auto; margin-top: -21px;">
																	<table class="table table-condensed">
																		<tbody id="orderFormContent">
																			
																		</tbody>
																	</table>
																</div>
																<!--End Table Body -->
																<input type='hidden' id='OFqueryType' value='insert' />
																<input type='hidden' id='OFSlaveID' value='0' />
															</div>
														</div>
													</div>
													<!-- End Column:2 Row:3 -->

												</div>
												<!-- End Code for #OrderForm GUI -->
											</div>
										
												
												<!-- End Code for Sub_Obj GUI -->

<!-- Start of Diet template -->

											<div id="diets" class="tab-pane fade in"
												style="display: none">
												<div class="col-md-7-1"
													style="padding-left: 10px; padding-top: 10px;">
													<textarea class="ckeditor ui-widget-content "
														name="editorSubjectives"
														title="Rich Text Editor, editorSubjectives"
														placeholder="Content" id="editorSubObjTreatments"></textarea>
													<input type="hidden" id="idTreatmentCkeditors" value="0"
														style="display: none" /> <input type="hidden"
														id="keyValueCKEditorArrayDivs" value=""
														style="display: none" />
												</div>

												<div class="col-md-5-1"
													style="padding-left: 20px; padding-top: 50px;">


													<div class="btn-group dropdown dropup btn-block">
													<!-- Sanjay Kumar Shah -->
													<button data-target="#ViewBMIDetailsPopup" data-toggle="modal" onclick="getOPDBMIListByTreatmentId();" id="viewBMI" class="btn btn-xs btn-success">BMI &amp; BSA</button>
														<!-- <label class="TextFont col-sm-2-1">Speciality</label> <select
															id="selDocSpecDiet" style="margin-left: -10px;"
															class="col-sm-4-1"
															onchange="fetchCustomizeTemplatesdiet(this.value, 'diet');">
														</select> --> 
														<label class="TextFont col-sm-1">Template</label> 
														<select
															id="customizeTemplatesdiet" class="col-sm-4-1"
															style="margin-left: 34px;"
															onchange="getCustomizeTemplatesIDdiet()">
															
															</select>
														<input id="customizeTemplatesIDdiet" value="0" type="hidden">
														<input
															   id="dbackend" value="0" type="hidden">
													</div>

                                                    <div id="hiddendiet" style="display: none;"></div>
													<div  id="dynamicset">
													
													</div>

												</div>

											</div>
											
											

<!-- end of Diet template -->


										<!-- Start Code for #InstructionTab GUI -->
													<div id="ddInstructions" class="tab-pane fade in" style="display:none"">
													 <div class="divide-10"></div> 
														<!-- Start code for Instruction Box1 -->
														<div class="col-md-6-1"
															style="padding-top: 0px; border-right: 1px solid #b8b8b8; height: 405px;">
															<div
																style="color: #333; background-color: #EEEEEE; height: 35px;">
																<div
																	style="width: 26%; float: left; padding-top: 8px; padding-left: 15px;">Select
																	Instruction Name:</div>
																<div style="float: left; padding-top: 5px;">
																	<div id="divTagPCTreatmentInstructionName">
																		<input type="text" id="PCTreatmentInstructionName"
																			placeholder="Instruction Name"
																			class="typeahead form-control input-SmallText"
																			onkeyup="setAllPCTreatmentInstructionAutocomplete(this.id, 'afterLoad');"
																			 />
																	</div>
																	<input type="hidden" value="0"
																		id="PCTreatmentInstructionNameID" />
																	<!-- <select style="width: 99%;"
																		name="selPCTreatmentInstructionTempName"
																		id="selPCTreatmentInstructionTempName"></select> <input
																		type="hidden" value="0"
																		id="selPCTreatmentInstructionTempNameID" /> -->
																</div>
																<div style="float: left; padding-top: 5px;">
																	
																</div>
																<div
																	style="float: right; padding-top: 8px; padding-right: 15px;">
																	
																</div>
															

															<!--Start #AddUpdateAdminInstructionPopup Popup -->
															<div id="AddUpdateAdminInstructionPopup"
																class="modal fade in">
																<div class="modal-dialog col-md-10-1"
																	style="margin-top: 45px; margin-left: 103px;">
																	<div class="modal-content" class="col-md-12"
																		style="height: 490px;">
																		<div class="modal-header" style="padding-bottom: 0px;">
																			<div class="box-title" style="margin-bottom: -1px;">
																				<h4>
																					<i class="fa fa-calendar"></i>Add Update Group
																					Instructions
																				</h4>
																				<div class="form-group col-md-2-1"
																					style="float: right;">
																						<button class="btn btn-xs btn-warning editUserAccess"
																						name="btnCreate" id="btnCreate" value="Save Now"
																						onclick="onSaveTemplateTab()" disabled="disabled">Create Template</button>
																					<button class="btn btn-xs btn-success editUserAccess"
																						name="btnSave" id="btnSave" value="Save Now"
																						onclick="saveAllGroupDetails()" disabled="disabled">Save</button>
																					<button type="button"
																						class="btn  btn-xs btn-default"
																						data-dismiss="modal">Close</button>
																						
																				</div>
																			</div>
																		</div>
																		<div class="modal-body">
																			<div class="form-group col-md-12-1">
																				<div class="form-group Remove-Padding col-md-12-1"
																					style="margin-top: 0px;">
																					<div
																						style="color: #333; background-color: #EEEEEE; padding: 1%; height: 40px">
																						<div
																							style="width: 10%; float: left; margin-top: 5px;">Select
																							Topic Name:</div>
																						<div style="width: 20%; float: left;">
																							<select style="cursor: pointer; width: 90%;"
																								name="selTempName"
																								id="selPCAdminInstructionTempName"></select> <input
																								type="hidden" id="idTempMast" value="0"
																								name="idTempMast" />
																						</div>
																						<div
																							style="width: 8%; float: left; padding-top: 5px; padding-left: 15px;">Topic
																							Name:</div>
																						<div style="width: 30%; float: left;">
																							<input type="text"
																								id="inputPCAdminInstructionTempName"
																								name="inputTempName"
																								style="width: 88%;" maxlength="450" />
																						</div>
																					</div>
																				</div>
																				<div class="col-md-12-1" style="margin-top: 9px;">
																					<!--Start Table Heading -->
																					<div class="col-sm-12-1">
																						<table class="table table-condensed">
																							<thead>
																								<tr>
																									<!-- <th><div class="TextFont">#</div></th> -->
																									<td class='col-sm-2-1 center'>
																										<input type='text' class='form-control input-SmallText' placeholder='English' id='txtMedicine'>
																									</td>
																									<td class='col-sm-2-1 center'>
																										<input type='text' class='form-control input-SmallText' placeholder=' Hindi' id='txtMedicineH'>
																									</td>
																									<td class='col-sm-2-1 center'>
																										<input type='text' class='form-control input-SmallText' placeholder='Marathi' id='txtMedicineM'>
																									</td>
																									<td class='col-sm-2-1 center'>
																										<input type='text' class='form-control input-SmallText' placeholder='Other language1' id='txtMedicine1ol'>
																									</td>
																									<td class='col-sm-2-1 center'>
																										<input type='text' class='form-control input-SmallText' placeholder='Other language2' id='txtMedicine2ol'>
																									</td>
																									<td class='col-sm-2-1 center'>
																										<input type='text' class='form-control input-SmallText' placeholder='Other language3' id='txtMedicine3ol'>
																									</td>
																									<!-- <th class="col-md-9-1 center"
																										style="height: 21.5px;"><div
																											class="TextFont">Instruction Name</div></th>
																									<th class="col-md-1-1 center"
																										style="height: 21.5px;"><input
																										type="button"
																										onclick="createPCAdminInstruction()" value="+"
																										id="btnAdd" class="editUserAccess" disabled="disabled"/> <input type="button"
																										onclick="removePCAdminInstruction('RowCount')"
																										value="-" class="editUserAccess" disabled="disabled"/></th> -->
																								</tr>
																							</thead>
																						</table>
																					</div>
																					<!--End Table Heading -->
																					<!--Start Table Body -->
																					<div class="col-sm-12-1"
																						style="overflow-y: scroll; height: 345px; maxheight: auto; margin-top: -20px;">
																						<table
																							class="table table-striped table-condensed cf">
																								<thead>
																									<tr>
																										<th>#</th>
																										<th>Instruction Id</th>
																										<th>English Instruction</th>
																										<th>Hindi Instruction</th>
																										<th>Marathi Instruction</th>
																										<th>Ref To</th>
																										<th  id="checkFlag"><input type="checkbox" id="chkAllCheck"
																											onclick="checkUncheckAll('chkAllCheck','checkInst')"></th>
																									</tr>
																								</thead>
																							<tbody id="TableBodyInstructionTempName">
																							</tbody>
																						</table>
																					</div>
																					<input type='hidden' value='0' id='addRowCount' /><input
																						type='hidden' value='0' id='RowCount' />
																					<!--End Table Body -->
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!--End #AddUpdateAdminInstructionPopup Popup -->

															<div class="col-sm-12-1" style="margin-top: 0px;">
																<table class="table table-bordered table-condensed cf">
																	<thead class="cf">
																		<tr>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">#</div></th>
																			<th class="col-md-9-1 center" style="height: 21.5px;"><div
																					class="TextFont">Instruction Name</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Status</div></th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div class="col-sm-12-1"
																style="overflow-y: scroll; margin-top: -21px; height: 120px; max-height: auto;">
																<table class='table table-striped table-condensed'>
																	<tbody id="Table1PCTreatmentInstructionNameID">
																		<!-- <tr>
																			<th class='col-md-1-1 center'>1</th>
																			<th class='col-md-10-1 center'>Instruction
																				Instruction Instruction Instruction Instruction
																				Instruction Instruction</th>
																			<th class='col-md-1-1 center'><input
																				type='button' id='button1' onclick='' /></th>
																		</tr>
																		<tr>
																			<th class='col-md-1-1 center'>2</th>
																			<th class='col-md-10-1 center'>Instruction
																				Instruction Instruction Instruction Instruction
																				Instruction Instruction</th>
																			<th class='col-md-1-1 center'><input
																				type='button' id='button2' onclick='' /></th>
																		</tr> -->
																	</tbody>
																</table>
															</div>
															<div class="col-sm-12-1"
																style="border-top: 2px solid orange; overflow-y: scroll; margin-top: 0px; height: 223px; max-height: auto;">
																<table class='table table-striped table-condensed'>
																	<tbody id="Table2PCTreatmentInstructionNameID">
																	</tbody>
																</table>
															</div>
														</div>
														</div>
														<!-- End code for Instruction Box1 -->

														<!-- Start code for Instruction Box2 -->
														<div class="col-md-6-1" id="instruct"
															style="padding-top: 5px; border-left: 1px solid #b8b8b8; height: 405px;">
															<div class="col-md-12-1" style="margin-top: 4px;">
																<div id="instructionTableHeader" class='col-sm-12-1'>
																	<table class='table table-bordered table-condensed'>
																		<thead>
																			<tr>
																				<th class='col-md-1-1 center'>#</th>
																				<th class='col-md-10-1 center'>Instructions
																					
																					<div style="float: right; margin-right: 5px;">
																						
																					</div>
																				</th>
																			</tr>
																		</thead>
																	</table>
																</div>
																<div id="instructionTableColumns" class='col-sm-12-1'
																	style='margin-top: -21px; height: 372px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;'>
																	<table class='table table-striped table-condensed'>
																		<tbody id="TreatmentInstructionTemp">
																			<tr>
																				<!-- <th class='col-md-1-1 center'>1</th>
																				<th class='col-md-1-1 center'><input
																					type='checkbox' id='' onclick=''
																					style="cursor: pointer;" /></th>
																				<th class='col-md-10-1'>Instruction Instruction
																					Instruction Instruction Instruction Instruction
																					Instruction</th> -->
																			</tr>
																		</tbody>
																	</table>
																</div>

																<!--Start AddUpdateInstructionPopup Popup -->
																<div id="AddUpdateInstructionPopup"
																	class="modal fade in">
																	<div class="modal-dialog col-md-11-1"
																		style="margin-top: 45px; margin-left: 70px;">
																		<div class="modal-content" class="col-md-12"
																			style="height: 570px;">
																			<div class="modal-header"
																				style="padding-bottom: 0px;">
																				<div class="box-title" style="margin-bottom: -1px;">
																					<h4>
																						<i class="fa fa-calendar"></i>Add Update
																						Instructions
																					</h4>
																					<div class="form-group col-md-4-1"
																						style="float: right;">

																						<div class="col-md-8-1" style="margin-top: 1px;">
																							Make it Madatory Instruction: <input
																								style="cursor: pointer;" id="mandatoryInstFlag"
																								type="checkbox" />
																							<!-- <div class="make-switch switch-mini"
																								data-on="warning" data-off="danger">
																								<input id="mandatoryInstFlag" type="checkbox">
																							</div> -->
																						</div>

																						<button type="submit"
																							class="btn btn-xs btn-primary editUserAccess"
																							onclick="saveReportInstruction()" disabled="disabled">Save</button>
																						<button type="button"
																							class="btn  btn-xs btn-default"
																							data-dismiss="modal">Close</button>
																					</div>
																				</div>
																			</div>
																			<div class="modal-body">
																				<div class="form-group col-md-12-1">

																					<input type="hidden" id="reportInstructionID"
																						value="0" />

																					<!-- left -->
																					<div class="col-md-6-1" style="margin-top: 0px;">
																						<div class="col-md-12-1" style="margin-top: 0px;">
																							<label style="margin-top: -5px; padding: 0px;"
																								class="form-group Remove-Padding col-md-2">
																								Instruction English: <b
																								style="color: red; padding-left: 1px;">*</b>
																							</label> <input id="reportInstruction"
																								class="form-control col-md-10-1" type="text"
																								placeholder="English Instruction">
																						</div>

																						<div class="col-md-12-1" style="margin-top: 10px;">
																							<label style="margin-top: 0px; padding: 0px;"
																								class="form-group Remove-Padding col-md-2">
																								Instruction Hindi: </label> <input
																								id="reportInstructionHindi"
																								class="form-control col-md-10-1" type="text"
																								placeholder="Instruction Hindi">
																						</div>

																						<div class="col-md-12-1" style="margin-top: 10px;">
																							<label style="margin-top: -5px; padding: 0px;"
																								class="form-group Remove-Padding col-md-2">
																								Instruction Marathi: </label> <input
																								id="reportInstructionMarathi"
																								class="form-control col-md-10-1" type="text"
																								placeholder="Instruction Marathi">
																						</div>
																					</div>
																					<!-- /left -->

																					<!-- right -->
																					<div class="col-md-6-1" style="margin-top: 0px;">
																						<div class="col-md-12-1" style="margin-top: 0px;">
																							<label
																								style="margin-top: -6px; padding: 0px; padding-left: 28px"
																								class="form-group Remove-Padding col-md-2">
																								Other Language 1.: </label> <input
																								id="reportInstructionOther1"
																								class="form-control col-md-10-1" type="text"
																								placeholder="Instruction Other Language 1">
																						</div>

																						<div class="col-md-12-1" style="margin-top: 10px;">
																							<label
																								style="margin-top: -6px; padding: 0px; padding-left: 28px"
																								class="form-group Remove-Padding col-md-2">
																								Other Language 2.: </label> <input
																								id="reportInstructionOther2"
																								class="form-control col-md-10-1" type="text"
																								placeholder="Instruction Other Language 2">
																						</div>

																						<div class="col-md-12-1" style="margin-top: 10px;">
																							<label
																								style="margin-top: -6px; padding: 0px; padding-left: 28px"
																								class="form-group Remove-Padding col-md-2">
																								Other Language 3.: </label> <input
																								id="reportInstructionOther3"
																								class="form-control col-md-10-1" type="text"
																								placeholder="Instruction Other Language 3">
																						</div>
																					</div>

																					<!-- /right -->

																					<div class="col-md-12-1" style="margin-top: 20px;">
																						<div class="col-md-12-1">
																							<!-- Start Header for New Edit Delete Option -->
																							<div class="col-md-12-1"
																								style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																								<label id="enableAddUpdateReportInstructionLabel"
																									style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																									<i class="fa fa-plus"></i>New
																								</label> <label id="editReportInstructionLabel"
																									style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																									<i class="fa fa-edit"></i> Edit
																								</label> <label id="deleteReportInstructionLabel"
																									style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																									<i class="fa fa-trash-o"></i> Delete
																								</label>
																							</div>
																							<!-- End Header for New Edit Delete Option -->
																							<!--Start Table Heading -->
																							<div class="col-sm-12-1" style="margin-top: 0px;">
																								<table class="table table-condensed">
																									<thead>
																										<tr>
																											<th class="col-md-1-1"
																												style="height: 21.5px;"><div
																													class="TextFont">#</div></th>
																											<th class="col-md-11-1 center"
																												style="height: 21.5px;"><div
																													class="TextFont">Instruction Name</div></th>
																										</tr>
																									</thead>
																								</table>
																							</div>
																							<!--End Table Heading -->
																							<!--Start Table Body -->
																							<div id="flip-scroll" class="col-sm-12-1"
																								style="overflow-y: scroll; height: 337px; maxheight: auto; margin-top: -21px;">
																								<table class="table table-condensed">
																									<tbody id="ReportInstructionTemp">
																									</tbody>
																								</table>
																							</div>
																							<!--End Table Body -->
																						</div>
																					</div>
																					<!-- End Column:2 Row:3 -->
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<!--End AddUpdateInstructionPopup Popup -->
															</div>
														</div>
														<!-- End code for Instruction Box2 -->
													</div>


												<!-- Start Code for #Prescription GUI -->
																								
												<!-- Start Code for #Prescription GUI -->
													<div id="Prescription" class="tab-pane fade in" style="display: none;" >
														<div class="col-md-12-1">
															<!--Start Column 1 -->
															<div class="col-md-2-1"
																style="border-right: 1px solid orange; margin-top: 7px; margin-left: 0px;">
																<div class="col-sm-12-1" style="margin: 0px;">
																	<div class="col-sm-12-1" style="margin-top: 0px;">
																		<h6 style="margin-left: 5px;">Diagnosis Details</h6>
																	</div>
																	<table class="table table-bordered table-condensed">
																		<thead>
																			<tr>
																				<th class="col-md-1-1"><div class="TextFont">#</div></th>
																				<th class="col-md-3-1"><div class="TextFont">Diagnosis</div></th>
																				<th class="col-md-2-1"><div class="TextFont">Code</div></th>
																			</tr>
																		</thead>
																	</table>
																	<div id="flip-scroll" class="col-sm-12-1"
																		style="overflow-y: scroll; height: 150px; maxheight: auto; margin-top: -21px;">
																		<table class="table table-striped table-condensed">
																			<tbody id="assesmentContentConfirmaedPrescription">
																			</tbody>
																		</table>
																	</div>
																</div>

																<div class="col-sm-12-1"
																	style="margin: 0px; border-top: 2px solid orange">
																	<div class="col-sm-12-1">
																		<h6 style="margin-left: 5px; color: red;">Alerts
																			& Allergies</h6>
																	</div>
																	<table class="table table-bordered table-condensed">
																		<thead>
																			<tr class="TextFont">
																				<th class="col-md-1-1">#</th>
																				<th class="col-md-3-1">Allergies</th>
																				<th class="col-md-2-1 center">Type</th>
																			</tr>
																		</thead>
																	</table>
																	<div id="flip-scroll" class="col-sm-12-1"
																		style="overflow-y: scroll; height: 186px; maxheight: auto; margin-top: -21px;">
																		<table class="table table-striped table-condensed">
																			<tbody id="allergyAlertsPrescriptionContent">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--End Column 1 -->

															<!--Start Column 2 -->
															<div class="col-md-10-1" style="margin-top: 15px;">

																<div class="col-md-12-1"
																	style="padding-left: 5px; padding-top: 5px; padding-right: 10px;">

																	<div class="col-md-12-1" style="margin-top: 0px;">
																		<div class="col-md-2-1" style="margin-top: 0px;">
																			<div class="col-md-6-1" style="margin-top: 0px;">
																				<strong>Follow-up After:</strong>
																			</div>

																			<div class="col-md-5-1" style="margin-top: 6px;">
																				<select
																					class="col-md-12-1 form-control input-SmallText"
																					id="DWMSelect">
																					<option value="">-SELECT-</option>
																					<option onclick="getOPDInstruction()" value="DAY">DAY</option>
																					<option onclick="getOPDInstruction()" value="WEEK">WEEK</option>
																					<option onclick="getOPDInstruction()" value="MONTH">MONTH</option>
																				</select>
																			</div>
																		</div>
																		<div class="col-md-4-1" style="margin-top: 0px;">

																			<div class="col-md-2-1" style="margin-top: 6px;">
																				<select id="noOf"
																					onchange="getOPDInstruction(),savefollowUpForOPDPatient('SAVE')"
																					class="col-md-12-1 form-control input-SmallText">
																					<option value="">-SELECT-</option>
																					<option value="0">0</option>
																					<option value="1">1</option>
																					<option value="2">2</option>
																					<option value="3">3</option>
																					<option value="4">4</option>
																					<option value="5">5</option>
																					<option value="6">6</option>
																					<option value="7">7</option>
																					<option value="8">8</option>
																					<option value="9">9</option>
																					<option value="10">10</option>
																					<option value="11">11</option>
																					<option value="12">12</option>
																				</select>
																			</div>

																			<div class="col-md-9-1 pull-right" style="margin-top: 6px;margin-right:17px;">
																				
																				<!-- commented by aniket 12 JAN 22 -->
																				<!-- <button style="line-height: 1.2; margin-top: -13px;"
																					class="btn btn-xs btn-warning" data-toggle="modal"
																					onclick="refreshDocPrescriptionTemplate();disableDocPrescriptionTemplate();refreshDocPrescriptionTemplateMedicine();fetchDocPrescriptionTemplateByID('0')"
																					data-target="#AddUpdatePrescriptionTemplatePopup">
																					Create and View Temp.</button> -->
																					
																				<button style="line-height: 1.2; margin-top: -13px;"
																					class="btn btn-xs btn-warning" data-toggle="modal"
																					onclick="refreshOPDPrescriptionTemplatesModal(); fetchOPDPrescriptionTemplatesByID('0')" 
																					data-target="#AddUpdatePrescriptionTemplatePopup" disabled="disabled">
																					Create and View Temp.</button>

																				<!-- commented by aniket 16 JAN 22 -->
																				<!-- <button style="line-height: 1.2; margin-top: -13px;"
																					class="btn btn-xs btn-success" data-toggle="modal"
																					onclick="fetchDocPrescriptionTemplateByID('0')"
																					data-target="#AddTreatmentPrescriptionToTemplatePopup">
																					Save Temp.</button> -->
																					
																					<button style="line-height: 1.2; margin-top: -13px;"
																					class="btn btn-xs btn-success" data-toggle="modal"
																					onclick="fetchOPDPrescriptionTemplatesByID('0')" 
																					data-target="#AddTreatmentPrescriptionToTemplatePopup" disabled="disabled">
																					Save Temp.</button>
																					
																					
																			</div>
																		</div>
																		<div class="col-md-5-1 pull-right"
																			style="margin-top: -6px;margin-right:73px;">

																			

																			<div class="col-md-4-1" style="margin-top: -3px;">
																				Fetch From Stock: <input id="fetchStockFromChkbox"
																					type="checkbox" style="cursor: pointer;" />
																			</div>

																			<div class="col-md-4-1" style="margin-top: -3px;">
																				Paediatrics Doctor: <input
																					id="paediatricsDocCheckBox" type="checkbox"
																					style="cursor: pointer;" />
																			</div>
																			
																			<div class="col-md-4-1" style="margin-top: -3px;">
																				General Medicine: <input
																					id="medicineNotAvailableCheckbox" type="checkbox"
																					style="cursor: pointer;" />
																			</div>

																	

																		</div>
																		
																		<div class="col-md-1-2 pull-right"
																			style="margin-top: -23px;">
																			
																			<!-- commented, aniket kanse 2 JAN 22 -->
																			<!-- <button id="col11"  class="btn btn-xs btn-success editUserAccess" title="Save Prescription" onclick="saveUpdatePrescription()" data-toggle="tooltip" disabled="disabled">
																					<i class="fa fa-save"></i>
																			</button> -->
																			
																			<!-- changed, aniket kanse 2 JAN 22 -->
																			
																			
																			<button id="printPrescriptionNewOpd" class="btn btn-xs btn-warning" style="" onclick="opdPrescriptionPrintPopup()" title="Print " data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-print"></i>
																			</button>
																		</div>
																	</div>

																	<div class="col-md-12-1"
																		style="margin-top: 3px; height: 14px;">
																		<div id="divfollow" class="col-md-5-1"
																			style="margin-top: 5px;"></div>
																		<div id="divfollowDate" class="col-md-3-1"
																			style="margin-top: 5px; color: red;"></div>
																	</div>

																	<!-- Start Column:2 Row:2 -->
																	<div class="col-md-12-1"
																		style="height: 45px; margin-top: 0px;">
																		<div id="row1" class="col-sm-12-1"
																			style="margin: 0px;">
																			<div id="col2" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-12-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Prep<b
																						style="color: red; padding-left: 2px;">*</b></label>
																						
																					 <!-- <select
																						id="prep" class="form-control input-SmallText"
																						onchange="fetchRouteTypeList('afterLoad')">
																					</select>  -->
																					
																					<!-- changed, aniket kanse, 22DEC21 -->
																					<select 	
																						id="prep"
																						class="form-control input-SmallText"
																						onchange="fetchRoutesByPreparationId('prescription')">
																					</select>
																		</div>
																			</div>
																			<div id="col3" class="col-sm-1-1"
																				style="margin-top: -4px;">
																				<div class="form-group Remove-Padding col-sm-11-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Medicine Name <b
																						style="color: red; padding-left: 2px;">*</b>
																					</label>
																					<div id="divTagname">
																						<!-- <input type="text" placeholder="Name" id="name"
																							name="name" autocomplete="off"
																							class="typeahead form-control input-SmallText"
																							onkeypress="setPrescriptionAutocompleteNameID(this.id, 'afterLoad');" /> -->
																							
																						<!-- changed, aniket kanse 22 DEC 21 -->
																							<input type="text" placeholder="Name" id="name"
																							name="name" autocomplete="off"
																							class="typeahead form-control input-SmallText"
																							onkeypress="autoSuggestMedicines(this.id, 'prescription');" />
																					</div>
																					<input type="hidden" id="medicineID" value="0" />
																					<input type="hidden" id="paediatricsMedicineFlag"
																						value="N" /> <input type="hidden"
																						id="paediatricsMedicineCapacity" value="" />
																				</div>
																			</div>
																			<div id="col4" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-11-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Capacity</label> <input
																						type="text" placeholder="Capacity" name="Capacity"
																						id="strength" class="form-control input-SmallText" />
																				</div>
																			</div>
																			<div id="col5" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-11-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Dose Type</label> <input
																						type="text" placeholder="Dose" name="dose"
																						id="dose"
																						onkeypress="return validateNumberMinusSign(event)"
																						class="form-control input-SmallText" />
																				</div>
																			</div>
																			<div id="col4A" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-12-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Unit</label> <select
																						name="unit" id="unit"
																						class="form-control input-SmallText">
																					</select>
																				</div>
																			</div>
																			
																<div id="col12" class="col-sm-2-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1" style="word-spacing: 6px;margin-left:9px;">MO - AN - EV - NT </label>
																	<div class="col-sm-12-1" style=" margin-top: -5px; margin-left:2px">
																	<input id="mo" name="timeslot"  value="Morning"  onclick ="setFrequency()" type="checkbox" style="cursor: pointer;margin-left:11px">
																	<input id="an" name="timeslot" value="Afternoon" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;margin-left:11px">
																	<input id="ev" name="timeslot" value="Evening" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;margin-left:11px">
																	<input id="nt"  name="timeslot" value="Night" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;margin-left:11px">
																	</div>
																</div>
																</div>
																
																			<div id="col6" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-11-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Frequency</label> <input
																						readonly="readonly" type="text" placeholder="Frequency"
																						name="frequency" id="frequency"
																						onkeyup="calculateQuantity()"
																						onkeypress="return validateNumbers(event)"
																						class="form-control input-SmallText" />
																				</div>
																			</div>
																			<div id="col7" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-12-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Instructions</label> <select
																						id="instruction"
																						class="form-control input-SmallText"></select>
																				</div>
																			</div>
																			<div id="col8" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-12-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Route</label> <select
																						name="route" id="route"
																						class="form-control input-SmallText">
																						<option value="0">SELECT</option>
																					</select>
																				</div>
																			</div>
																			<div id="col9" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-11-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Days<b
																						style="color: red; padding-left: 2px;">*</b></label> <input
																						type="text" placeholder="Days" name="days"
																						id="days" class="form-control input-SmallText"
																						onkeyup="calculateQuantity()"
																						onkeypress="return validateNumbers(event)" />
																				</div>
																			</div>
																			<div id="col10" class="col-sm-1-1"
																				style="margin-top: 10px;">
																				<div class="form-group Remove-Padding col-sm-10-1">
																					<div class="divide-10"></div>
																					<label class="TextFont">Quantity<b
																						style="color: red; padding-left: 2px;">*</b></label> <input
																						type="text" placeholder="Qty" name="qty" id="qty"
																						class="form-control input-SmallText"
																						onkeypress="return validateNumbers(event)" />
																				</div>
																			</div>
																			
																		</div>
																	</div>
																		<div class="divide-20"></div>
															<div class="col-md-12-1"
																style=" margin-top: 0px;">
																<div id="row1" class="col-sm-12-1"
																	style="margin-top: 0px;">
																	<div id="col2" class="col-sm-1-1"
																		style="margin-top: 10px; padding-left: 3px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div id="col3" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div id="col4" class="col-sm-1-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div id="col5" class="col-sm-1-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div style="margin-top: 10px;" class="col-sm-1-1"
																		id="col4A">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div id="col11" class="col-sm-4-1"
																		style="margin-top: 30px; margin-left: -97px">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="col-sm-12-1"
																				style="margin-top: -5px; margin-left: 2px">
																				<input type="text" readonly=""
																					class="form-control input-SmallText  col-sm-1-1"
																					id="tmo" value="1" onkeyup="calculateQuantity()" style="width: 25px"><input
																					type="text" readonly="" onkeyup="calculateQuantity()"
																					class="form-control input-SmallText  col-sm-1-1"
																					id="tan" value="1" style="width: 25px"><input
																					type="text" readonly=""
																					class="form-control input-SmallText col-sm-1-1"
																					id="tev" value="1" style="width: 25px" onkeyup="calculateQuantity()"><input
																					type="text" readonly=""
																					class="form-control input-SmallText col-sm-1-1"
																					id="tnt" value="1" style="width: 25px" onkeyup="calculateQuantity()">
																					
																					
																					
												       
																			
																			</div>
																			
																			
																		</div>
																	</div>
																</div>
															</div>
															<!-- End Column:2 Row:2 -->
																	<!-- Start Column:2 Row:3 -->
																	<div class="col-md-12-1" style="margin-top: 7px;">
																		<!-- Start Header for New Edit Delete Option -->
																		<div class="col-md-12-1"
																			style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">
																			<button id="enableTextBoxesLabel"  disabled="disabled"
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																				<i class="fa fa-plus"></i> New
																			</button> <button id="editPrescriptionLabel" disabled="disabled"
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																				<i class="fa fa-edit"></i> Edit
																			</button> <button id="deletePrescriptionLabel"  disabled="disabled"
																				style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																				<i class="fa fa-trash-o"></i> Delete
																			</button>
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div class="col-sm-12-1" style="margin-top: 0px;">
																			<!--Start Table Heading -->
																			<table class="table table-bordered table-condensed">
																				<thead>
																					<tr>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">#</div></th>
																						<th class="col-md-2-1" style="height: 21.5px;"><div
																								class="TextFont">Prep. Medicine Name</div></th>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">strength</div></th>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">Dose</div></th>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">Unit</div></th>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">Frequency</div></th>
																								
																						<th class="col-md-3-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">Instructions</div></th>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">Duration</div></th>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont">Quantity</div></th>
																						<th class="col-md-1-1 center"
																							style="height: 21.5px;"><div
																								class="TextFont"></div></th>
																					</tr>
																				</thead>
																			</table>
																			<!--End Table Heading -->

																			<!--Start Table Body -->
																			<div id="flip-scroll" class="col-sm-12-1"
																				style="overflow-y: scroll; height: 310px; maxheight: auto; margin-top: -21px;">
																				<table class="table table-striped table-condensed">
																					<tbody id="prescriptionContent">
																					</tbody>
																				</table>
																			</div>
																			<!--End Table Body -->
																		</div>
																	</div>
																	<!-- End Column:2 Row:3 -->
																</div>
															</div>

															<!--Start #AddUpdatePrescriptionTemplatePopup Popup -->
															<div id="AddUpdatePrescriptionTemplatePopup"
																class="modal fade in">
																<div class="modal-dialog col-md-11-1"
																	style="margin-top: 40px; margin-left: 65px;">
																	<div class="modal-content" class="col-md-12"
																		style="height: 580px;">

																		<div class="modal-header" style="padding-bottom: 0px;height:41px">
																			<div class="box-title" style="margin-bottom: 29px;">
																				<h4 class="col-md-8-1"><i class="fa fa-calendar"></i>Add Update
																					Prescription Templates
																				</h4>
																				<div style="width: 9%; float: left; padding-left: 3px;  ">
																				
																					<!-- commented, aniket kanse 13 JAN 22 -->
																					<!-- <button id="saveMedDoc" class="btn btn-xs btn-success editUserAccess" onclick="saveUpdatePrescriptionDocTemplateMedicine()">Save Medicine</button> -->
																					
																					<!-- changed, aniket kanse 13 JAN 22 -->
																					<button id="saveMedDoc" class="btn btn-xs btn-success editUserAccess" onclick="saveUpdateOPDPrescriptionTemplateMedicine()">Save Medicine</button>
																					<input id="prepDocTemplateMedicineID" type="hidden" value="0">
																				</div>
																				<div style="float: right; padding-right: 6px;">
																					<button type="button" class="btn btn-xs btn-danger"
																						data-dismiss="modal">
																						<i class="fa fa-arrows"></i> Close
																					</button>
																				</div>
																			</div>
																		</div>
																		<div class="modal-body">
																			<div class="form-group col-md-12-1">
																				<div class="form-group Remove-Padding col-md-12-1"
																					style="margin-top: -8px;">
																					<div	style="background-color: #EEEEEE; padding: 5px; height: 34px;">
																						<div style="width: 20%; float: left;">
																							<select		onchange="refreshFetchOPDPrescriptionTemplate()"
																								id="docTemplateNameSelect" style="cursor: pointer; width: 90%;">
																							</select>
																						</div>
																						<div style="width: 8%; float: left; padding-top: 5px;">
																							Template Name: <b	style="color: red; padding-left: 2px;">*</b>
																						</div>
																						<div style="width: 30%; float: left;">
																							<input type="text" id="docTemplateNameText"	style="width: 100%;" maxlength="500"
																								placeholder="Enter Template Name..." /> <input id="docTemplateNameID" type="hidden" value="0" />
																						</div>
																						<div style="width: 6%; float: left; padding-top: 5px; margin-left: 27px;"> General Medicine: </div>
																						<div style="width: 3%; float: left;"><input type="checkbox" style="cursor: pointer;" id="medicineNotAvailableCheckboxTemp"> </div>
																						<div
																							style="width: 6%; float: left; padding-top: 5px; margin-left: 8px;">My
																							Template:</div>
																						<div style="width: 3%; float: left;">
																							<input type="checkbox" id="docMyTemplateCheckbox"
																								style="cursor: pointer;" />
																						</div>
																						<div
																							style="width: 10%; float: left; padding-top: 5px;">Organization
																							Template:</div>
																						<div style="width: 3%; float: left;">
																							<input type="checkbox"
																								id="docOrgTemplateCheckbox"
																								style="cursor: pointer;" />
																						</div>

																						<div style="float: right;">
																							<button class="btn btn-xs btn-success editUserAccess"
																								onclick="saveUpdateOPDPrescriptionTemplates()">
																								<i class="fa fa-save"></i> Save Template
																							</button>
																						</div>
																					</div>
																				</div>
																				<!-- Start Column:2 Row:2 -->
																				<div class="col-md-12-1"
																					style="height: 45px; margin-top: 0px;">
																					<div id="row1" class="col-sm-12-1"
																						style="margin: 0px;">
																						<div id="col2" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Prep<b
																									style="color: red; padding-left: 2px;">*</b></label> <select
																									id="prepDoc"
																									class="form-control input-SmallText"
																									onchange="fetchRoutesByPreparationId('opdTemplate')">
																								</select>
																							</div>
																						</div>
																						<div id="col3" class="col-sm-2-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Medicine Name <b
																									style="color: red; padding-left: 2px;">*</b>
																								</label>
																								<div id="divTagmedicineNameDoc">
																									<!-- <input type="text" placeholder="Name"
																										id="medicineNameDoc"
																										class="typeahead form-control input-SmallText"
																										onkeypress="setPrescriptionAutocompleteNameID(this.id, 'DoctorDesk_DocTempPopup');" /> -->
																										
																										<!-- changed, aniket kanse -->
																										<input type="text" placeholder="Name"
																										id="medicineNameDoc"
																										class="typeahead form-control input-SmallText"
																										onkeypress="autoSuggestMedicines(this.id, 'opdTemplate');" />
																								</div>
																								<input type="hidden" id="medicineIDDoc"
																									value="0" />
																							</div>
																						</div>
																						<div id="col4" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Strength</label> <input
																									type="text" placeholder="Strength"
																									id="strengthDoc"
																									class="form-control input-SmallText" />
																							</div>
																						</div>
																						<div id="col5" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Dose Type</label> <input
																									type="text" placeholder="Dose" id="doseDoc"
																									onkeypress="return validateNumberMinusSign(event)"
																									class="form-control input-SmallText" />
																							</div>
																						</div>
																						<div id="col4A" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Unit</label> <select
																									id="unitDoc"
																									class="form-control input-SmallText">
																								</select>
																							</div>
																						</div>
																						<div id="colFrq12" class="col-sm-1-1" style="margin-top: 10px;">
																							<div class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont" for="exampleInputEmail1">MO - AN - EV - NT </label>
																								<div class="col-sm-12-1" style=" margin-top: -5px; margin-left:2px">
																									<input id="mo1" type="checkbox" style="cursor: pointer;" onclick="setFrequencyOpd()" value="Morning" name="timeslot">
																									<input id="an1" type="checkbox" style="cursor: pointer;" onclick="setFrequencyOpd()" value="Afternoon" name="timeslot">
																									<input id="ev1" type="checkbox" style="cursor: pointer;" onclick="setFrequencyOpd()" value="Evening" name="timeslot">
																									<input id="nt1" type="checkbox" style="cursor: pointer;" onclick="setFrequencyOpd()" value="Night" name="timeslot">
																								</div>
																							</div>
																							</div>
																						<div id="col6" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Frequency</label> <input
																									type="text" placeholder="Frequency"
																									id="frequencyDoc"
																									onkeyup="calculateQuantity('prepDoc')"
																									class="form-control input-SmallText" />
																							</div>
																						</div>
																						<div id="col7" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Instructions</label> <select
																									id="instructionDoc"
																									class="form-control input-SmallText"></select>
																							</div>
																						</div>
																						<div id="col8" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Route</label> <select
																									name="routeDoc" id="routeDoc"
																									class="form-control input-SmallText"></select>
																							</div>
																						</div>
																						<div id="col9" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Days<b
																									style="color: red; padding-left: 2px;">*</b></label> <input
																									type="text" placeholder="Days" id="daysDoc"
																									class="form-control input-SmallText"
																									onkeyup="calculateQuantity('prepDoc')"
																									onkeypress="return validateNumbers(event)" />
																							</div>
																						</div>
																						<div id="col10" class="col-sm-1-1"
																							style="margin-top: 10px;">
																							<div
																								class="form-group Remove-Padding col-sm-12-1">
																								<div class="divide-10"></div>
																								<label class="TextFont">Quantity<b
																									style="color: red; padding-left: 2px;">*</b></label> <input
																									type="text" placeholder="Qty" id="qtyDoc"
																									class="form-control input-SmallText"
																									onkeypress="return validateNumbers(event)" />
																							</div>
																						</div>
																							<div class="divide-10"></div>
																							
																							<div style=" margin-top: 0px;" class="col-md-12-1">
																<div style="margin-top: 0px;" class="col-sm-12-1" id="row1">
																	<div style="margin-top: 10px; padding-left: 3px;" class="col-sm-1-1" id="col2">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div style="margin-top: 10px;" class="col-sm-2-1" id="col3">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div style="margin-top: 10px;" class="col-sm-1-1" id="col4">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div style="margin-top: 10px;" class="col-sm-1-1" id="col5">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div id="col4A" class="col-sm-1-1" style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<div style="margin-top: 30px; margin-left: -45px" class="col-sm-4-1" id="col11">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div style="margin-top: -5px; margin-left: 2px" class="col-sm-12-1">
																									<input type="text" style="width: 47px"
																										value="1" id="tmo1"
																										class="form-control input-SmallText  col-sm-1-1"
																										readonly="readonly" onkeyup="calculateQuantity('prepDoc')"><input type="text"
																										style="width: 47px" value="1" id="tan1"
																										class="form-control input-SmallText  col-sm-1-1"
																										readonly="readonly" onkeyup="calculateQuantity('prepDoc')"><input type="text"
																										style="width: 47px" value="1" id="tev1"
																										class="form-control input-SmallText col-sm-1-1"
																										readonly="readonly" onkeyup="calculateQuantity('prepDoc')"><input type="text"
																										style="width: 47px" value="1" id="tnt1"
																										class="form-control input-SmallText col-sm-1-1"
																										readonly="readonly" onkeyup="calculateQuantity('prepDoc')">
																								</div>
																		</div>
																	</div>
																</div>
															</div>
                                                          	</div>
																				</div>
																				<!-- End Column:2 Row:2 -->
																				<!-- Start Column:2 Row:3 -->
																				<div class="col-md-12-1" style="margin-top: 41px;">
																					<!-- Start Header for New Edit Delete Option -->
																					<div class="col-md-12-1"
																						style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">
																						<label id="refreshDocPrescriptionTemplateMedicineLabel"
																							style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																							<i class="fa fa-plus"></i> New
																						</label> <label id="editDocPrescriptionTemplateMedicinelabel"
																							style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																							<i class="fa fa-edit"></i> Edit
																						</label> <label id="deleteDocPrescriptionTemplateMedicineLabel"
																							style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																							<i class="fa fa-trash-o"></i> Delete
																						</label>
																					</div>
																					<!-- End Header for New Edit Delete Option -->
																					<div class="col-sm-12-1" style="margin-top: 0px;">
																						<!--Start Table Heading -->
																						<table
																							class="table table-bordered table-condensed">
																							<thead>

																								<tr>
																									<td class="col-md-1-1 center">#</td>
																									<td class="col-md-4-1">Prep. Drug</td>
																									<td class="col-md-1-1 center">Strength</td>
																									<td class="col-md-1-1 center">Dose</td>
																									<td class="col-md-1-1 center">Frequency</td>
																									<td class="col-md-2-1 center">Instruction</td>
																									<td class="col-md-1-1 center">Route</td>
																									<td class="col-md-1-1 center">Days</td>
																									<td class="col-md-1-1">Quantity</td>
																									<td class="col-md-1-1"></td>
																								</tr>
																							</thead>
																						</table>
																						<!--End Table Heading -->

																						<!--Start Table Body -->
																						<div id="flip-scroll" class="col-sm-12-1"
																							style="overflow-y: scroll; height: 160px; maxheight: auto; margin-top: -21px;">
																							<table
																								class="table table-striped table-condensed">
																								<tbody id="prescriptionTemplateContentDocTable">
																								</tbody>
																							</table>
																						</div>
																						<!--End Table Body -->
																					</div>
																				</div>
																				<!-- End Column:2 Row:3 -->


																				<!-- start: second row -->
																				<!-- Start Column:2 Row:1_1 -->
																				<div class="col-md-12-1"
																					style="margin-top: 3px; border: 2px solid orange;">
																					<div class="tabbable tabs-left col-md-12-1"
																						style="margin-top: 10px; margin-left: 5px;">
																						<ul class="nav nav-tabs col-md-1-1"
																							style="margin: 0px;">
																							<li class="active" style="margin-top: -6px"><a
																								data-toggle="tab" href="#prepDocMyTemplate">
																									My Templates </a></li>
																							<li><a data-toggle="tab"
																								href="#prepDocOrgTemplate"> Org.Temp </a></li>
																						</ul>
																						<div class="tab-content col-md-11-1"
																							style="margin: 0px;">

																							<div id="prepDocMyTemplate"
																								class="tab-pane fade in active"
																								style="margin: 0px; padding-right: 4px; padding-left: 0px;">
																								<div class="col-md-12-1"
																									style="margin-top: 0px; padding-right: 10px; padding-left: 0px;">
																									<!-- Start Header for New Edit Delete Option -->
													
																									<!-- End Search Option -->
																								</div>
																								<div class="col-sm-12-1"
																									style="margin-top: -1px;">
																									<table class="table table-condensed">
																										<thead>
																											<tr>
																												<th class="col-sm-1-1 center"><div
																														class="TextFont">#</div></th>
																												<th class="col-sm-1-1 center"><div
																														class="TextFont">Template Name</div></th>
																												<th class="col-sm-2-1 center"
																													style="padding-left: 7px;"><div
																														class="TextFont">Owner</div></th>
																												<th class="col-sm-1-1 center"
																													style="padding-left: 15px;"><div
																														class="TextFont">Use</div></th>
																												<th class="col-sm-1-1 center"
																													style="padding-left: 15px;"><div
																														class="TextFont">Delete</div></th>
																											</tr>
																										</thead>
																									</table>
																									<div id="flip-scroll" class="col-sm-12-1"
																										style="overflow-y: scroll; height: 135px; maxheight: auto; margin-top: -21px;">
																										<table
																											class="table table-striped table-condensed">
																											<tbody id="prepDocMyTemplateTable">
																											</tbody>
																										</table>
																									</div>
																								</div>
																							</div>



																							<div id="prepDocOrgTemplate"
																								class="tab-pane fade in"
																								style="margin: 0px; padding-right: 4px; padding-left: 0px;">
																								<div class="col-md-12-1"
																									style="margin-top: 0px; padding-right: 10px; padding-left: 0px;">
																									<!-- Start Header for New Edit Delete Option -->
																									<!-- <div class="col-md-12-1"
											
																									<!-- End Search Option -->
																								</div>
																								<div class="col-sm-12-1"
																									style="margin-top: -1px;">
																									<table class="table table-condensed">
																										<thead>
																											<tr>
																												<th class="col-sm-1-1 center"><div
																														class="TextFont">#</div></th>
																												<th class="col-sm-1-1 center"><div
																														class="TextFont">Template Name</div></th>
																												<th class="col-sm-2-1 center"
																													style="padding-left: 7px;"><div
																														class="TextFont">Owner</div></th>
																												<th class="col-sm-1-1 center"
																													style="padding-left: 15px;"><div
																														class="TextFont">Use</div></th>
																												<th class="col-sm-1-1 center"
																													style="padding-left: 15px;"><div
																														class="TextFont">Delete</div></th>
																											</tr>
																										</thead>
																									</table>
																									<div id="flip-scroll" class="col-sm-12-1"
																										style="overflow-y: scroll; height: 135px; maxheight: auto; margin-top: -21px;">
																										<table class="table table-condensed">
																											<tbody id="prepDocOrgTemplateTable">
																											</tbody>
																										</table>
																									</div>
																								</div>
																							</div>


																						</div>
																					</div>
																				</div>
																				<!-- End Column:2 Row:1_1 -->
																				<!-- End: second row -->
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!--End #AddUpdatePrescriptionTemplatePopup Popup -->





															<!--Start #AddTreatmentPrescriptionToTemplatePopup Popup -->
															<div id="AddTreatmentPrescriptionToTemplatePopup"
																class="modal fade in">
																<div class="modal-dialog col-md-4-1"
																	style="margin-top: 128px; margin-left: 34%;">
																	<div class="modal-content" class="col-md-12"
																		style="height: 170px;">

																		<div class="modal-header" style="padding-bottom: 0px;">
																			<div class="box-title" style="margin-bottom: -1px;">
																				<h4>
																					<i class="fa fa-calendar"></i>Prescription
																					Templates
																				</h4>
																				<div style="float: right; padding-right: 6px;">
																				
																					<!-- commented, aniket -->
																					<!-- <button type="button"
																						class="btn btn-xs btn-success editUserAccess"
																						onclick="saveAddnewOrUpdateExistingTemplate()" disabled="disabled">
																						<i class="fa fa-save"></i> Save
																					</button> -->
																					
																					<button type="button"
																						class="btn btn-xs btn-success editUserAccess"
																						onclick="addPrescriptionAsOPDTemplate()" disabled="disabled">
																						<i class="fa fa-save"></i> Save
																					</button>
																					
																					<button type="button" class="btn btn-xs btn-danger"
																						data-dismiss="modal">
																						<i class="fa fa-arrows"></i> Close
																					</button>
																				</div>
																			</div>
																		</div>
																		<div class="modal-body">
																			<div class="form-group col-md-12-1">
																				<div class="form-group Remove-Padding col-md-12-1"
																					style="margin-top: -8px;">

																					<div
																						style="background-color: #EEEEEE; padding: 5px; height: 34px;">
																						<div class="form-group Remove-Padding col-md-7-1"
																							style="margin: 0px">
																							<select class="form-control input-SmallText"
																								style="cursor: pointer;"
																								onchange="showHideAddNewUpdateExistingTemplate(this.value)"
																								id="addNewUpdateExistingTemplateSelect">
																								<option value="NEW">Add New Template</option>
																								<option value="EXISTING">Update
																									Existing Template</option>
																							</select>
																						</div>


																						
																					</div>

																					<div style="padding: 5px; height: 34px;">
																						<div id="newTempDiv"
																							class="form-group Remove-Padding col-md-12-1"
																							style="margin: 0px">

																							<div
																								class="form-group Remove-Padding col-md-11-1"
																								style="margin: 5px">
																								Template Name: <input type="text"
																									id="existingAddReplaceTemplateNameText"
																									placeholder="Template Name..." />
																								<!-- <input type="hidden" id="existingAddReplaceTemplateNameHiddenID" value="0" /> -->
																							</div>

																							<div
																								class="form-group Remove-Padding col-md-12-1"
																								style="margin-top: 7px;">
																								<input
																									class="form-control input-SmallText col-md-1-1"
																									type="radio" value="BOTH"
																									name="usedForTemplate"> <label
																									class="TextFont col-md-2-1"
																									style="margin-top: 8px; font-weight: normal;">Both</label>
																								<input
																									class="form-control input-SmallText col-md-1-1"
																									type="radio" value="MYTEMPLATE"
																									name="usedForTemplate"> <label
																									class="TextFont col-md-3-1"
																									style="margin-top: 8px; font-weight: normal;">My
																									Template</label> <input
																									class="form-control input-SmallText col-md-1-1"
																									type="radio" value="ORGNTEMPLATE"
																									name="usedForTemplate"> <label
																									class="TextFont col-md-4-1"
																									style="margin-top: 8px; font-weight: normal;">Organization
																									Template</label>
																							</div>

																						</div>


																						<div id="existingTempDiv"
																							class="form-group Remove-Padding col-md-12-1"
																							style="margin: 0px; display: none;">

																						

																							<div class="form-group Remove-Padding col-md-7-1"
																								style="padding: 5px; margin-top: 4px;">
																								<label style="font-weight: normal;">Template
																									Name:</label> <select
																									class="form-control input-SmallText"
																									id="existingAddReplaceTemplateNameSelect">
																								</select>
																							</div>


																						</div>
																					</div>


																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!--End #AddTreatmentPrescriptionToTemplatePopup Popup -->



														</div>
													</div>
													<!-- End Code for #Prescription GUI -->
													
													
									<!-- added by ajay:17/10/2019 Start Code for #DailysisAdvice GUI -->
											<div id="DialysisAdvice" class="tab-pane fade in"
												style="display: none;">
												<div class="col-md-12-1">
													<div class="col-md-1-2 pull-right"
														style="margin-top: -23px;">

														

														<button id="idConsentFrom" class="btn btn-xs btn-warning"
															style="" onclick="showConsentFromPopup()" title="Print "
															data-placement="left" data-toggle="tooltip">Consent
															From Temp</button>
													</div>


													<!--Start Column 1 -->


													<div class="col-md-2-1"
														style="border-right: 1px solid orange; margin-top: 7px; margin-left: 0px;">
														<div class="col-sm-12-1" style="margin: 0px;">
															<div class="col-sm-12-1" style="margin-top: 0px;">
																<h6 style="margin-left: 5px;">Diagnosis Details</h6>
															</div>
															<table class="table table-bordered table-condensed">
																<thead>
																	<tr>
																		<th class="col-md-1-1"><div class="TextFont">#</div></th>
																		<th class="col-md-3-1"><div class="TextFont">Diagnosis</div></th>
																		<th class="col-md-2-1"><div class="TextFont">Code</div></th>
																	</tr>
																</thead>
															</table>
															<div id="flip-scroll" class="col-sm-12-1"
																style="overflow-y: scroll; height: 150px; maxheight: auto; margin-top: -21px;">
																<table class="table table-striped table-condensed">
																	<tbody id="assesmentContentConfirmaedPrescription1">
																	</tbody>
																</table>
															</div>
														</div>

														<div class="col-sm-12-1"
															style="margin: 0px; border-top: 2px solid orange">
															<div class="col-sm-12-1">
																<h6 style="margin-left: 5px; color: red;">Alerts &
																	Allergies</h6>
															</div>
															<table class="table table-bordered table-condensed">
																<thead>
																	<tr class="TextFont">
																		<th class="col-md-1-1">#</th>
																		<th class="col-md-3-1">Allergies</th>
																		<th class="col-md-2-1 center">Type</th>
																	</tr>
																</thead>
															</table>
															<div id="flip-scroll" class="col-sm-12-1"
																style="overflow-y: scroll; height: 186px; maxheight: auto; margin-top: -21px;">
																<table class="table table-striped table-condensed">
																	<tbody id="allergyAlertsPrescriptionContent1">
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<!--End Column 1 -->


													<div id="registrationn1">
														<div class="panel-group col-md-12" id="accordion"
															style="margin-right: 6px; width: 81%; margin-bottom: 12%; margin-top: 6%;">
															<div class="panel panel-default">

																<div class="panel-heading accordion-toggle"
																	data-toggle="collapse" data-parent="#accordion"
																	data-target="#regg">
																	<h4 class="panel-title"></h4>

																</div>


																<div id="reg">
																	<div class="container">
																		<div class="panel-body">


																			<div class="panel-body">


																				<div class="col-md-6">
																					<div class="form-group">
																						<label class='TextFont col-md-4-1'>Indication<b
																							style='color: red; padding-left: 3px;'>*</b></label>
																						<div class="">
																							<input id='indicationId' type='text'
																								placeholder='Indication'
																								class="typeahead form-control" required='true'
																								style='margin-left: 0%;' maxlength='150' /> <input
																								type='hidden' id="dialysisAdviceId" value='0' />
																						</div>
																					</div>
																				</div>
																				<div class=" col-md-6">
																					<div class="form-group">
																						<label class='TextFont col-md-4-1'>Types
																							of Dialysis<b
																							style='color: red; padding-left: 3px;'>*</b>
																						</label>
																						<div class="">
																							<select class="typeahead form-control"
																								id="dialysisType" name="sameDay"
																								style='margin-left: 0%;'>
																								<option value="1">Plain Dialysis with
																									no UF</option>
																								<option value="2">Plain Dialysis with
																									UF</option>
																								<option value="3">Sequential Dialysis
																									with UF</option>
																								<option value="4">Sequential Dialysis
																									with Isolated UF</option>
																							</select>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class='TextFont col-md-4-2'>Frequency
																							of Dialysis<b
																							style='color: red; padding-left: 3px;'>*</b>
																						</label>
																						<div class="">
																							<input id='frequencyDialysis' type='text'
																								placeholder='Frequency of Dialysis'
																								class="typeahead form-control" required='true'
																								style='margin-left: 0%;' maxlength='150' />

																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class='TextFont col-md-4-2'>Note<b
																							style='color: red; padding-left: 3px;'>*</b></label>
																						<div class="">
																							<input type="text" id="Note" placeholder='Note'
																								class="typeahead form-control"
																								style='margin-left: 0%;' />
																						</div>
																					</div>
																				</div>
																				<div>
																					<input type="button" value="Dialysis Schedular"
																						class="btn btn-success"
																						style="float: right; margin-right: 1%" onclick="dialysisScheduler()" />
																				</div>
																				<div class="" style='margin-left: 73%;'>
																					<input type="button" value="Advice Save"
																					class="btn btn-success"
																					onclick="saveDialysisAdvice()"/>
																				
																				<div>
																			</div>

																		</div>
																	</div>
																</div>



															</div>
														</div>


													</div>
												</div>
											</div>
						         
						      


									


										<!-- End Code for #Prescription GUI -->
													
			
											<div id="Cover_History_Opd" class="tab-pane fade in">
										<div class="panel-body">
											<table class="table table-bordered header-fixed cf "
												style="Width: 100%; margin-top: 5px;">
												<thead class="cf" style="background: white;">
													
												</thead>
												<tbody id="coverHistoryDetailsOpd"
												style="max-height: auto; overflow-y: auto;">
												
												</tbody>
											</table>
											
											</div>
									</div>
																			
											<!--click Popup modal for ICD10-->
					
				
											
											
											
											<div ID="ADNOTE"  class="tab-pane fade in"
													style="width: 96%; margin-left: 2%; display:none">
													<!-- MARKDOWN -->
													<div class="box border red">
														<div class="box-title">
															<h4>
																<i class="fa fa-pencil-square"></i>Bootstrap Markdown
																Editor
															</h4>
															<div id="updateAdmissionNoteDiv" class="tools hidden-xs">
																<a id="updateAdmissionNote" class="updateAdmissionNoteClass"><i
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
												
												
																	<!-- Modal for Follicular Study -->
																<div class="modal fade bs-example-modal-lg" id="viewStudyTablePopup"
																	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
																	aria-hidden="true">
																	<div class="modal-dialog modal-dialog modal-lg" style="width: 90%;" >
																		<div class="modal-content">
																			<div class="modal-header">
																				<div class="col-md-1-1 li pull-right">
																					<button type="button" id="saveStudyRecordbtn" onclick="saveStudyRecord()" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-success editUserAccess" data-original-title="Save" style="margin-left: 0px;margin-top: 3px;" disabled="disabled">
																						<i class="fa fa-save"></i>
																					</button>
																					<button type="button" id="closeStudyRecordtbn" onclick="closeStudyRecord()" data-placement="down" value="Close" class="btn btn-xs btn-primary editUserAccess" data-toggle="tooltip"  data-original-title="Close Study" Style="margin-top: 3px;" disabled="disabled">
																						<i class="fa fa-times"></i>
																					</button>
																					<button id="studyPrintBtn" data-original-title="Print" data-toggle="tooltip" data-placement="left" title="" onclick="printStudyData('PRINT');" class="btn btn-xs btn-warning" style="margin-top: 3px;">
                                            											<i class="fa fa-print"></i>
  																					</button>
																					<button class="btn btn-xs btn-danger" id="closePopUpbtn" onclick="closePopUpbtn()" aria-label="Close" data-dismiss="modal" type="button" style="margin-top: 3px;">
																						<i class="fa fa-times"></i>
																					</button>
																				</div>
																				
																				<div class="row" >
																					<div class="col-md-4 col-xs-11">
																						<h3 class="modal-title" id="myModalLabel">Follicular Study Table</h3>
																					</div><br><br>
																					<div id="lmpDateDiv" class="col-md-3 col-xs-11">
																						<h5>LMP Date: </h5>
																					<input type="text" style="margin-top: -25px;margin-left: 100px;" class="form-control input-SmallText TextFont" placeholder="LMP Date" name="lmpdt" id="lmpdt">
																					</div>
																					
																			</div>
																			<div class="modal-body" id="studyModalGraph" style="margin-bottom: -5%;">
																				
																				<div class="row">
																				<div class="col-md-12">
																					<!-- BOX -->
																					<div class="box border blue">
																					<div class="box-title">
																					<h4><i class="fa fa-bars"></i>Follicular Study graph</h4>
																					</div>
																					<div class="box-body">
																						<div id="studyContainer" style="height: 300px; width: 80%">
																						</div>
																					</div>
																					</div>
																					<!-- /BOX -->
																				</div>
																				</div>
																				
																			</div>
																			<div class="modal-body" class="panel panel-info col-md-12-1">
																				<div style="margin-top: 0px;">
																						<div class="panel-body" id="studyModalTable" style="margin-bottom: -4%;">
																							<div style="width: 100%; height: 200px;" id="move">
																								<div style="margin-top: 0px;" class="col-sm-12-1">
																									<table style="width : 100%; margin-top: 10px;" class="table table-bordered table-condensed header-fixed cf">
																									<thead>
																									<tr>
																									<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>
																									<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>
																									<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Days</div></th>
																									<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">RTOV(mm)</div></th>
																									<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">LTOV(mm)</div></th>
																									<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">ENDO(mm)</div></th>
																									<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont"><input type="button" value="+" onclick="toCreateStudyDiv()" class="editUserAccess" disabled="disabled"></div></th>
																									</tr>
																									</thead>
																									</table>
																									<div style="border:1px solid #ddd; overflow-y: scroll; height: 150px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="">
																									<table style="width : 100%;" class="table table-condensed header-fixed cf">
																									<tbody id="testTable" style="overflow-y: scroll;"> 
																									</tbody>
																									</table>
																									</div>
																								</div>
																							</div>
																						</div>
																					<!-- /panel-body -->
																				</div>
																			</div>
			<div id="iCommentBox" class="modal fade in" tabindex="-1">
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
								data-placement="left" onclick="saveStudyRecord();">
								<i class="fa fa-save"></i>
							</button>
							<h4 id="testHead" style="margin-top: -36px;">Comment:</h4>
						</div>
						<div class="modal-body">
							<div class="col-md-12-1">
								<div class="col-md-6-1" style="background-color: #ccffeb;">
									<textarea rows="3" cols="50" id="txtComment" type="textarea"
										name="txtComment"></textarea>
								</div>

								<div class="divide-40"></div>
							</div>
							<div class="divide-40"></div>
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
			</div>
			<!-- id="outer" -->
			<div><%@include file="Footer.jsp"%></div>

			<!-- For Assesment and Order Form -->
			<input type='hidden' id='prevtr' value='<%=request.getParameter("preflag")%>' />
			<input type='hidden' id='queryType' value='save' />
<%-- 			<input type="hidden" style="display: none" value="<%=request.getParameter("callFrom")%>" id="callFrom" />
 --%>			<div id="patobject" style="display: none;"></div>
			<%-- <div id="pid" style="display: none;"><%=request.getParameter("patientId")%></div> --%>
			<div id="appo_type" style="display: none;"><%=request.getParameter("appo_type")%></div>
			<div id="id" style="display: none;"><%=request.getParameter("id")%></div>
			<div id="updateOn" style="display: none;"><%=request.getParameter("updateFlagOn")%></div>
			<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>
			<input type="hidden" value="<%=request.getParameter("FunType")%>"
				id="FunType" style="display: none;" />
			<div id="hospDetails" style="display: none;"></div>
			<div id="topic" style="display: none;"></div>
			<div style="display: none;" id="docName">${sessionScope.userName}</div>
			<div id="date" style="display: none;"><%=todays_date%></div>
			<input type="hidden" id="pageType" value="IPD" style="display: none;" />
			<input type="hidden" id="testCount" value="1" style="display: none;" />
			<input type="hidden" id="profileCount" value="1"
				style="display: none;" />
			<input type="hidden" id="pkgCount" value="1" style="display: none;" />
			<input type="hidden" id="labPatId" value="" style="display: none;" />
			<input type="hidden" id="testResultMastId" value=""
				style="display: none;" />
			<input type="hidden" id="CPOE_testId" value="" style="display: none;" />
			<input id="CPOE_TestDetails" style="display: none;" />

			<!-- IPD_DRR for Daily Doctor Round and Order Form -->
			<input type="hidden" id="treStart"
				value="<%=request.getParameter("treStart")%>" style="display: none;" />
			<div id="treatmentbedid" style="display: none;"><%=request.getParameter("treatmentbedid")%></div>
			<div id="doctorBean" style="display: none;"></div>
			<div id="DRTDetails" style="display: none;"></div>
			<input type="hidden" id="callformDigno" value="callfrom">

			<!-- For IPD_BedWard -->
			<input id="pname" type="hidden"
				value="0"
				style="display: none;" />				
			<input id="dbirth" type="hidden"
				value="0"
				style="display: none;" />				
			<input id="weight1" type="hidden"
				value="0"
				style="display: none;" />				
			<input id="height1" type="hidden"
				value="0"
				style="display: none;" />
			<input id="drid" type="hidden"
				value="0"
				style="display: none;" />
			<input id="tid11" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
			<input id="pid11" type="hidden"
				value="0"
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
			<div id="historyDetails" type="hidden" style="display: none;"></div>

			<!-- For Assesment -->
			<div id="assesmentDetails" style="display: none;"></div>
			<input type="hidden" style="display: none;" id="icd10_id_forAssmnt"
				value="0" />
			<input type="hidden" style="display: none;" id="diagno_slave_id"
				value="0" />

			<div id="allergyAlertsDetails" style="display: none;"></div>

			<div id="customizeTemplate" style="display: none;"></div>
			
			<!-- added below on 08 JAN 22, aniket kanse. -->
			<div id="varCustomTemplateData" style="display: none;"></div>

			<!-- prescription route details as per prepID -->
			<div id="routeDetails" style="display: none;"></div>

			<!-- callFor=previousTreatmentIPD -->
			<input id="callFor" type="hidden"
				value="<%=request.getParameter("callFor")%>" style="display: none;" />
			<!-- /callFor=previousTreatmentIPD -->

			<!-- For Prescription -->
			<div id="InstructionListEnglish" style="display: none;">
				<option value="">----</option>
				<option value="1">After Dinner</option>
				<option value="2">Topical Application</option>
				<option value="3">Before Breakfast-Before Dinner</option>
				<option value="4">After Breakfast-After Dinner</option>
			</div>
			<div id="InstructionListMarathi" style="display: none;">
				<option value="">----</option>
				<option value="1">जेवणानंतर/After Dinner</option>
				<option value="2">बाहेरून लावणे/Topical Application</option>
				<option value="3">नाश्त्या अगोदर-जेवणाअगोदर/Before
					Breakfast-Before Dinner</option>
				<option value="4">नाश्त्या नंतर-जेवणानंतर/After Food</option>
			</div>
			<div id="language" style="display: none;">Marathi</div>
			<!-- <input type='hidden' value='0' id='addRowCount' /> -->
			<input type='hidden' value='0' id='RowCount' />
			<input type='hidden' value='0' id='HisRowCount' />
			<input type='hidden' value='0' id='treStart' />
			<input type='hidden' value='1' id='consumptionRowCount' />
			<input type='hidden' value='0' id='billidservice' />
		</c:if>
	</section>
	
	<!-- department id added by paras -->
	<%-- <input type="hidden" value="<%=request.getParameter("depdoctordesk")%>"
		id="depdocdeskid" /> --%>
		<div id="prescriptionTemplateContentDocHiddenDiv"
				style="display: none;"></div>
				<div id="billdetailsnew" style="visibility: hidden;"></div>
		<!-- vitals -->
		<div id="ReportInstructionDetails" style="display: none;"></div>
		<div id="vitalsDD2" style="display: none;"></div>
	    <input type="hidden" style="display: none;" id="todaysDefaultDate"  value="<%=todays_date%>"/>
	    <!-- vitals -->
		<input type="hidden" value="0" id="cnt">
		<input type="hidden" id="stdRowCnt" value="0"/>
	    <input type="hidden" id="studyidR" value="0"/>
		<div id="studyContainer" style="height: 300px; width: 80%"></div>
	    <div id="studydata" style="display: none;"></div>
		<input type="hidden" id="studyQueryType" value="Running"/>
		<input id='hiddenIcdDetail' type='hidden' name='hiddenIcdDetail' />
		<input type="hidden" id="stdt" value="0"/>
		<input type="hidden" value="0" id="billCat" />
		<input type="hidden" value="0" id="SponsorsourceTypeId" />
		<input type="hidden" value="0" id="chargesSlaveId" />
		<input type="hidden" value="0" id="chargesfromConf" />
<!-- 		<input type="hidden" value="2" id="depdocdeskid" />
 -->		<div id="prescriptionDetails" style="display: none;"></div>
	   <input type="hidden" style="display: none;" id="prescription_id"	value="0" /> <!-- aniket_kanse /01/JAN/22-->
	   <input type="hidden" style="display: none;" id="allergyAlertsId" value="0" /> <!-- aniket_kanse /06/JAN/22 -->
	   
	   <%--  <input type="hidden" style="display: none;" id="userdr_id"	value="<%=session.getAttribute("userId1")%>" /> --%>
	    <input type="hidden" style="display: none;" id="userdr_id"	value="0" />
	<input type="hidden" value="<%=session.getAttribute("uId")%>" id="uids" />
	<input type="hidden" id="rowId" value="0"/>
	<input type="hidden" id="studyid" value="0"/>
	<input type="hidden" id="currentDateForwardSlash" value="<%=todays_date%>" />
	<input type="hidden" id="currentDateForwardSlash2" value="<%=todays_date2%>" />
	<input type="hidden" style="display: none;" id="dayPrescription"	value="" />
	
	<div id="adviceDetails" style="display: none;"></div>
	<div id="radiotherapyDivAjax" style="display: none;"></div>
	<!-- department id added by paras -->
	<!-- BMI details -->
			<div id="PatientBMIInfoTableAjaxResp" style="display: none;"></div>
	<!-- IPD_DRR for Daily Round and Order Form -->
	<input type="hidden" value="<%=session.getAttribute("userType")%>"
		id="userType" />
	<input type="hidden" id="date-pick" value="<%=todays_date%>" />	
	
	<div id="DRR" style="display: none;"></div>
	<div id="objorder" style="display: none;"></div>
	<input type="hidden" name="indentRowCount" id="indentRowCount"
		value="1">
		<input type="hidden" name="mrnID" id="mrnID"
		value="0">
		<input type="hidden" name="trcountBMI" id="trcountBMI"
		value="0">
	<input type="hidden" name="DRRaddCount" id="DRRaddCount" value="1">
	<input type="hidden" name="indentTemplateRowCount"
		id="indentTemplateRowCount" value="1">
		
		<input type="hidden" name="tIdd" id="tIdd" value="0">
		<input type="hidden" name="pIdd" id="pIdd" value="0">
		<input type="hidden" name="tIddI" id="tIddI" value="0">
		<input type="hidden" name="pIddI" id="pIddI" value="0">
		
		<!-- Touheed Dynamic Popup @date:13-Dec-2017 @js: labresult.js-->
		<div id="labReqNoPop" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-12"
							style="margin-top: 30px; margin-left: 0px;">
							<div class="modal-header" id ="labReqPopHead">
							
							</div>
							<div class="modal-body" id="labReqBody">
							</div>
				</div>
			</div>
		</div>
	<!-- Touheed Dynamic Popup  @date:13-Dec-2017 @js: labresult.js-->
					<!-- @codeBy : Touheed @codeDate : 18-Feb-2016 -->
				<div id="iPopupFormula" class="modal fade in" tabindex="-1">
					
				</div>
				
				<!-- Laxman Dynamic Compare Popup  @date:22-Feb-2018-->
				<div id="iPopupCompare" class="modal fade in" tabindex="-1">
					
				</div>
				
		<!-- @codeBy: Touheed  @codeDate:24-Feb-2016 (Start) -->
		<div id="iPopupEditor" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
								style="margin-top: 16%; margin-left: 20%;">
								<div class="modal-header">
									<h4 id="testHead" style="margin-top: 0px;">
										<i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i> Lab Test Results Editor:
										<button class="btn btn-xs btn-danger" onclick="closeEditorForResult()" title="Close" style="margin-left:56%;"><i class="fa fa-times"></i></button>
									</h4>
								</div>
						<div class="modal-body">
						<div><textarea id="txtLabNote" class=" " cols="88" rows="8"></textarea></div>		
						</div>
				</div>
			</div>
		</div>
				<!--Added by Laxman  -->
				<input id='testmasterId' type='hidden' name='testmasterId' value='0' />
				<input id='labReqSlvId' type='hidden' name='labReqSlvId' value='0' />
				<input id='subSerId' type='hidden' name='subSerId' value='0' />
				<input id='isPackageFlag' type='hidden' name='isPackageFlag' value='' />
				<div id="testDetails" style="display: none;"></div>
				<input id="deptId" type="hidden" value='1' />	
</body>
<!--Cancel opd queue narration pop up-->
<div id="narrationModal1" class="modal fade in" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content col-md-6-1"
			style="margin-top: 123px; margin-left: 213px;">
			<div class="modal-header">
				<button class="btn btn-xs" aria-label="Close" data-dismiss="modal"
					type="button" style="margin-top: -5px;; margin-left: 388px">
					<i class="fa fa-undo"></i>
				</button>
				<button id="saveNarration" class="btn btn-xs btn-save" title="Save"
					style="margin-top: -37px; margin-left: 360px"
					data-original-title="Save" data-toggle="tooltip"
					data-placement="left" onclick="cheUpDoneOrCancelOPD('cancel')">
					<i class="fa fa-save"></i>
				</button>
				<h4 style="margin-top: -36px;">Narration:</h4>
			</div>
			<div class="modal-body">
				<div class="col-md-12-1">
					<div class="col-md-6-1" style="background-color: #ccffeb;">
						<textarea rows="3" cols="64" id="cancelNarration" type="textarea"
							name="txtNarration"></textarea>
					</div>
					<div class="divide-40"></div>
				</div>
				<div class="divide-40"></div>
			</div>
		</div>
	</div>
</div>

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
													</div><br><br>
													<div class="col-md-6 col-xs-11">
														<h5> </h5><h6 id="documentComment"> </h6>
														</div>
														</div>
													</div>
												<div class="modal-body">
													<iframe id="ViewDocumemnt"  width="80%" height="330px"></iframe>
													</div>
												</div>
											</div>
										</div>
<div id="SummarypostPopup123" class="modal fade in" tabindex="-1">
		<div class="modal-dialog" style="border: thin; width: 90%;" >
			<div class="modal-content col-md-12-1"
				style="margin-top: -1%; margin-left: 0%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-10-1"> Primary Summary:
						</h4>
						<div class="form-group col-md-1-1" style="float: right;">
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionNew('PRINT');" type="button">
								<i class="fa fa-print"></i>
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="hideSummaryPostPopupNew('HIDE_POPUP_PRINT');">
								<i class="fa fa-times"></i>
							</button>
							
						</div>
					</div>
					</div>
					<div class="modal-body" id="setBodyOpdCoverSheet">
					
				</div>
				
			</div>					
			</div>
</div>
<div id="idMainPrintPopUp" class="modal fade in" tabindex="-1"> </div>
<div id="iPrintBillNew" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-9"
				style="margin-top: 13%; margin-left: 13%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-6-1">
							<i class="fa fa-calendar"></i> Prescription Instruction Language
						</h4>
						<div class="form-group col-md-6-1" style="float: right;">
							<button id="shrdhaH" class="btn btn-xs btn-warning"
								onclick="printPrescriptionNewIPD('HF');" type="button">
								<i class="fa fa-print"></i> Print(H/F)
							</button>
							<button  id="shrdhaF" class="btn btn-xs btn-warning"
								onclick="printPrescriptionNewIPD('Plain');" type="button">
								<i class="fa fa-print"></i> Print
							</button>
								<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionNewIPD('NR');" type="button">
								<i class="fa fa-print"></i>IPD Print
							</button>
							<button id="btrising" class="btn btn-xs btn-warning"
								onclick="printPrescriptionNewIPD('ALL');" type="button">
								<i class="fa fa-print"></i> Print
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="printPrescriptionNewCLOSE('HIDE_POPUP_PRINT');">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input checked="checked"
							type="radio" value="ENGLISH" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : English
						</label>
					</div>

					<div class="col-md-3-1" style="display: none;">
						<label class="input-SmallText"> <input type="radio"
							value="HINDI" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : Hindi
						</label>
					</div>

					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="MARATHI" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : Marathi
						</label>
					</div>

					<div class="col-md-4-1"style="display: none;">
						<label class="input-SmallText"> <input type="checkbox"
							id="vaccinationFlagCheckboxPrint"
							name="vaccinationFlagCheckboxPrint"
							style="margin-top: 0px; cursor: pointer"> : Print
							Vaccination chart
						</label>
					</div>
					
					<hr>
					
					<div class="col-md-3-1" style="display: none;">
						<label class="input-SmallText"> <input type="radio" checked="checked"
							value="standard" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Standard
						</label>
					</div>
					
					<div class="col-md-3-1" style="display: none;">
						<label class="input-SmallText"> <input type="radio"
							value="custom" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Custom
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="iPrintBillNewOPD" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-9"
				style="margin-top: 13%; margin-left: 13%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-6-1">
							<i class="fa fa-calendar"></i> Prescription Instruction Language
						</h4>
						<div class="form-group col-md-6-1" style="float: right;">
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionHF('HF');" type="button">
								<i class="fa fa-print"></i> Print(H/F)
							</button>
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionHF('Plain');" type="button">
								<i class="fa fa-print"></i> Print
							</button>
								<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionHF('OPD');" type="button">
								<i class="fa fa-print"></i>OPD Print
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="printPrescriptionNewCLOSE('HIDE_POPUP_PRINT');">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input checked="checked"
							type="radio" value="ENGLISH" name="prepInstructionPopup1"
							style="margin-top: 0px; cursor: pointer"> : English
						</label>
					</div>

					<div class="col-md-3-1" style="display: none;">
						<label class="input-SmallText"> <input type="radio"
							value="HINDI" name="prepInstructionPopup1"
							style="margin-top: 0px; cursor: pointer"> : Hindi
						</label>
					</div>

					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="MARATHI" name="prepInstructionPopup1"
							style="margin-top: 0px; cursor: pointer"> : Marathi
						</label>
					</div>

					<div class="col-md-4-1"style="display: none;">
						<label class="input-SmallText"> <input type="checkbox"
							id="vaccinationFlagCheckboxPrint"
							name="vaccinationFlagCheckboxPrint"
							style="margin-top: 0px; cursor: pointer"> : Print
							Vaccination chart
						</label>
					</div>
					
					<hr>
					
					<div class="col-md-3-1" style="display: none;">
						<label class="input-SmallText"> <input type="radio" checked="checked"
							value="standard" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Standard
						</label>
					</div>
					
					<div class="col-md-3-1" style="display: none;">
						<label class="input-SmallText"> <input type="radio"
							value="custom" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Custom
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Modal for view EMR question -->
	<div class="modal fade bs-example-modal-lg" id="viewEMRQueModal"
		tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog modal-lg" style="width: 70%;">
			<div class="modal-content">
				<div class="modal-header">
					<button data-dismiss="modal"
						class="btn btn-xs btn-danger pull-right" type="button"
						style="margin-left: 5px;">Close</button>
					<button type="button" id="isaveQue" onclick="saveEmrQueAns()"
						class="btn btn-xs btn-success pull-right">Save</button>
					<div class="row">
						<div class="col-md-4 col-xs-11">
							<h3 class="modal-title" id="myModalLabel">Question</h3>
						</div>
					</div>
				</div>
				<div id="emrQuestionBody" class="modal-body"
					style="max-height: 600px; overflow: auto;"></div>
			</div>
		</div>
	</div>
	<!-- End of Modal for view EMR question -->
	<!-- /*********************modal for complaint	*****************************/ -->
	<div id="viewEMRComplaintModal" class="modal fade bs-example-modal-lg"
		tabindex="-1" data-backdrop="static">
		<div class="modal-dialog modal-lg" style="width: 80%;">
			<div class="modal-content col-md-12-1"
				style="margin-top: 10px; max-height: 600px; overflow: auto;">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							Complaints
							<div class="pull-right">
								<button type="button" class="close" data-dismiss="modal"
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						</h4>
					</div>
				</div>

				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 0PX;">
						<div class="col-md-1-1"
							style="padding-top: 10px; padding-left: 10px;">
							<label class="TextFont">Search</label>
						</div>
						<div class="col-md-4-1"
							style="padding-top: 10px; padding-left: 10px;">
							<input id="complaint_byName"
								class="typeahead form-control input-SmallText" type="text"
								name="byName"
								onkeyup="setAutoComplaint('complaint_byName', 'onload', 'Complaints')">
						</div>
						<div class="col-md-1-1"
							style="padding-top: 10px; padding-left: 10px;">
							<input class="btn btn-xs btn-primary" type="button"
								onclick="addComplaintToAssign()" value="Add">
						</div>
						<div class="col-md-1-1"
							style="padding-top: 10px; padding-left: 10px;">
							<button class="btn btn-success" style="margin-right: 15px;"
								onclick="saveComplaintFinding('complaint')">Save</button>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 10PX;">
						<div class="col-md-6-1" id=""
							style="max-height: auto; margin-top: 0.5%; border: 1px solid #ddd;">
							<table class="table table-condensed"
								style="margin-top: 0px; overflow-y: auto;">

								<tbody id="emrComplaintBody" style="overflow-y: auto;">

								</tbody>
								<input type="hidden" id="cmpCount" value="1" />
							</table>
						</div>
						<div class="col-md-6-1" id=""
							style="max-height: auto; margin-top: 0.5%; border: 1px solid #ddd;">
							<table class="table table-condensed"
								style="margin-top: 0px; overflow-y: auto;">

								<tbody id="assignComplaintBody" style="overflow-y: auto;">

								</tbody>
								<input type="hidden" id="cmpCount" value="1" />
							</table>
						</div>
					</div>

					<div class="modal-footer"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- 	/********end complaint div*******/ -->
	<!-- /*********************modal for finding	*****************************/ -->
	<div id="viewEMRFindingModal" class="modal fade bs-example-modal-lg"
		tabindex="-1" data-backdrop="static">
		<div class="modal-dialog modal-lg" style="width: 80%;">
			<div class="modal-content col-md-12-1"
				style="margin-top: 10px; max-height: 600px; overflow: auto;">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							Finding
							<div class="pull-right">
								<button type="button" class="close" data-dismiss="modal"
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						</h4>
					</div>
				</div>

				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 0PX;">
						<div class="col-md-1-1"
							style="padding-top: 10px; padding-left: 10px;">
							<label class="TextFont">Search</label>
						</div>
						<div class="col-md-4-1"
							style="padding-top: 10px; padding-left: 10px;">
							<input id="finding_byName"
								class="typeahead form-control input-SmallText" type="text"
								name="byName"
								onkeyup="setAutoFinding('finding_byName', 'onload', 'Findings')">
						</div>
						<div class="col-md-1-1"
							style="padding-top: 10px; padding-left: 10px;">
							<input class="btn btn-xs btn-primary" type="button"
								onclick="addFindingToAssign()" value="Add">
						</div>
						<div class="col-md-1-1"
							style="padding-top: 10px; padding-left: 10px;">
							<button class="btn btn-success" style="margin-right: 15px;"
								onclick="saveComplaintFinding('finding')">Save</button>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 10PX;">
						<div class="col-md-6-1" id=""
							style="max-height: auto; margin-top: 0.5%; border: 1px solid #ddd;">
							<table class="table table-condensed"
								style="margin-top: 0px; overflow-y: auto;">

								<tbody id="emrFindingBody" style="overflow-y: auto;">

								</tbody>
								<input type="hidden" id="fndCount" value="1" />
							</table>
						</div>
						<div class="col-md-6-1" id=""
							style="max-height: auto; margin-top: 0.5%; border: 1px solid #ddd;">
							<table class="table table-condensed"
								style="margin-top: 0px; overflow-y: auto;">

								<tbody id="assignFindingBody" style="overflow-y: auto;">

								</tbody>
								<input type="hidden" id="fndCount" value="1" />
							</table>
						</div>
					</div>

					<div class="modal-footer"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- 	/********end finding div*******/ -->
	
	<div id="IPDSummarypostPopup" class="modal fade in" tabindex="-1">
		<div class="modal-dialog" style="border: thin; width: 90%;" >
			<div class="modal-content col-md-12-1"
				style="margin-top: -1%; margin-left: 0%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-10-1"> Primary Summary:
						</h4>
						<div class="form-group col-md-1-1" style="float: right;">
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionIPDNew('PRINT');" type="button">
								<i class="fa fa-print"></i>
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="hideSummaryPostPopupIPD();">
								<i class="fa fa-times"></i>
							</button>
							
						</div>
					</div>
					</div>
					<div class="modal-body" id="setTempIpnInOpd">
					</div>					
			</div>
		</div>
</div>
	<!-- Sanjay Kr Shah ; code for viewRis Report in coversheet on20-03-2018 -->
<div id="RisviewPopUp" class="modal fade in" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content" class="col-md-9">
						<div class="modal-header">
							<div class="box-title" style="margin-left: 380px;">
								<h4>
									<i class="fa fa-calendar"></i>Report
								</h4>
						
							</div>
						</div>
						<div class="modal-body">

							<div ID="ckviewEditor" class="tab-pane fade in active">
								<textarea class="ckeditor ui-widget-content "
									name="viewckeditor1"
									title="Rich Text Editor, RiseditorSubjective"
									placeholder="Content" id="viewckeditor1"></textarea>
							</div>
							<div class="modal-footer">
								<label id="draftlab" style="margin-right: 567px;"></label>
								<button type="button" class="btn btn-primary"
									data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="groupModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width: 538px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h5 class="modal-title">Investingation</h5>
			</div>
			<div class="modal-body">
				<div id="totalposttime" class="col-md-12-1">
					<table class="table table-bordered" style="margin-top: 0px;">
							<thead>
								<tr>
									<th class="col-sm-1 center">#</th>
									<th class="col-sm-3-1 center">Investingation X-ray</th>
									<th class="col-sm-3-1 center">Date</th>
								</tr>
							</thead>
					</table>
						<table class="table table-striped table-condensed" style="margin-top: 0px;">
							<tbody id="totalX-ray">
							</tbody>
						</table>
				</div>
			</div>
			<div class="modal-footer">
			</div>
		</div>
	</div>
</div>
<!-- /Popup page charts -->
						<div id="ddchart" class="modal fade in">
							<div class="modal-dialog" style="width: 100%; margin-top: 10%;">
								<div class="modal-content">
									<div class="col-md-12">
										<div class="col-md-6">
											<h2>Vaccination Chart</h2>
										</div>
										<div class="col-md-6  pull-right">
											<div class="col-md-10"></div>
											<div class="col-md-1 " style="margin-top: 3%; float: right; padding-right: 6px;">
												<button class="btn btn-xs btn-success"
													onclick="saveImmunizationPatient();" disabled="disabled">
													<i class="fa fa-save"></i> Save
												</button>
											</div>
											<div class="col-md-1" style="margin-top: 3%; float: right; padding-right: 6px;">

												<button class="btn btn-xs btn-danger cls coversheetBtn "
													onclick="closeImmunizationCharts();" data-dismiss="modal"
													type="button">
													<i class="fa fa-arrows"></i> Close
												</button>
											</div>
										</div>
									</div>



									<div class="panel-body" style="overflow: auto; height: 300px">
										<table id="fixed_header"
											class="table table-striped table-bordered"
											style="overflow: auto;">
											<thead id="ehatTHead" class="fixedheaderdemo">
												<tr>
													<th class="col-md-1 center">#</th>
													<th class="col-md-1 center">Age</th>
													<th class="col-md-2 center">Vaccine Name</th>
													<th class="col-md-1 center">From Date</th>
													<th class="col-md-1 center">TO Date</th>
													<th class="col-md-2 center">Due Date</th>
													<th class="col-md-2 center">Given Date</th>
													<th class="col-md-2 center">Vaccine status</th>

												</tr>
											</thead>
											<tbody id="setfetchimmunizationconfigcharts">
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<!-- /Popup page charts end-->

<!-- Test Template Added by Laxman. -->
	<!-- Test Template Modal -->
				<div id="viewLabTestTemplate" class="modal" role="dialog">
							<div class="modal-dialog">
								<div class="panel panel-default col-md-12-1"
									style="margin-top: 0px; height: 600px;">
								<div style="margin-top: 9px;" class="col-md-12-1">
									<div class="col-md-5-1" style="margin-left: 10px;">
										 <div class="col-md-5-1 form-group" style="margin-top: 10px;">Template List</div>
										<div class="col-md-6-1"  style="margin-top: 10px;">
											<select id="selRisTempList" name="selRisTempList"
												style="margin-top: 0px;"
												class="col-md-11-1 form-control input-SmallText " onchange="fillDRT(this.value,1)">
												
												<option onclick="setNewCustomizeTemp()" value="0">NewTemplate</option>
											</select> 
											<input type="hidden" name="idTempMast" value="0" id="idTempMast">
										</div>
									</div>
									<div class="col-md-5-1" style="margin-left: 10px;">
										<div class="col-md-6-1 form-group"  style="margin-top: 10px;">
											Template Name<b style="color: red; padding-left: 3px;">*</b>
										</div>
										<div class="col-md-6-1"  style="margin-top: 10px;">
											<input type="text" disabled="disabled"
												class="col-md-11-1 form-control input-SmallText " value=""
												style="margin-top: 0px;" id="iTestTemplateName" >
										</div>
									</div>
								<div class="pull-right">
								<!-- <button onclick="savePatientTestTemplate()" title="Save Template" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-success" data-original-title="Update Test Template">
									<i class="fa fa-save"></i></button> -->
									&nbsp;&nbsp;&nbsp;
								<button aria-label="Close" data-dismiss="modal" class="close" type="button" style="margin-right: 10px;">
									<span aria-hidden="true">x</span>
								</button>
							</div>
								</div>
									<div class="panel-body">
										<div id="move" style="width: 100%; display: none;"
											class="ui-resizable ui-draggable ui-draggable-handle">
											<textarea class="ckeditor ui-widget-content " name="editor1"
												title="Rich Text Editor, editor1" placeholder="Content"
												id="editor1"></textarea>
										</div>
										<div id="historyTemp" style="width: 100%;"
											class="tabbable ui-resizable ui-draggable ui-draggable-handle">
											<ul class="nav nav-tabs">
											</ul>
											<div class="divide-10"></div>
											<div class="tab-content">
												<div ID="testTemplate" class="tab-pane fade in active">
													<textarea class="ckeditor ui-widget-content "
														name="txtEditorTestTemplate"
														title="Rich Text Editor, editorTestTemplate"
														placeholder="Content" id="iEditorTestTemplate"></textarea>
												</div>
										</div>
									</div>
									<div ID="impressionDiv" class="" style="margin-left: 10px;">
										<label>Impressions :</label>
												<textarea name="txtImpression" title="" cols="60" rows="4"
												placeholder="Content" id="iImpression"></textarea>
									</div>
								</div>		
						</div>
				</div>
			</div>
				<!-- /Test Template Modal -->	
				
					<!--Start #AddUpdateOrderformTemplatePopup Popup -->
															<div id="AddUpdateOrderformTemplatePopupForIpda"
																class="modal fade in"></div>
					<!--End #AddUpdatePrescriptionTemplatePopup Popup -->
				
				<div id="divHistoryChemotherapy" class="modal fade in" tabindex="-1">
														<div class="modal-dialog">
														<div class="modal-content col-md-7"
															style="margin-top: 13%; margin-left: 13%;">
															<div class="modal-header">
																<div class="box-title">
																	<h4 class="col-md-8-1">
																		Chemotherapy Previous History :
																	</h4>
																</div>
																<div class="form-group col-md-4-1" style="float: right;">
																	<button class="btn btn-xs btn-danger" style="margin-left: 100px;"
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
					
		<!--Added by Laxman  -->
		<input type="hidden" value="0" id="printtypeforbtn" />
		<input type="hidden" value="0" id="hTestTemplateName" />
		<input type="hidden" value="0" id="hTestTemplate" />
		<input type="hidden" value="0" id="hImpression" />
		<input type="hidden" value="0" id="hID" />
		<input type="hidden" value="insert" id="hQueryType" />
		<input type="hidden" value="0" id="htestId" />
		
	<input type='hidden' id="fingId" value='0' />
	<input type='hidden' id="type" value='0' />
	<input type='hidden' id="chemId" value='0' />
	<input type='hidden' id="chemoId" value='0' />
	<input type='hidden' id="queryType1" value='update' />
	<div id="chemotherapyDetails" style="display: none;"></div>             <!--     Pooja -->
	<input id="callFor" type="hidden" value="" style="display: none;" />
	<input type="hidden" id="tnmStageMasterId" value="" />
	<input type="hidden" id="queryTypeForComplaintFinding" value="1" />
	<div style="display: none;" id="oncoEmrAssignCompFindList"></div>
	<input type='hidden' id="subobjType" value='0' />	
	<input id="hallId" type="hidden" value='2' />
	<input id="opdBmiMasterId" type="hidden" value='0' />
	<input id="doctorSpecilizationId" type="hidden" value='0' />
<!--********End of cancel opd queue narration pop up*******-->

<!-- Sanjay Kr Shah ,In order to display BMSI and BSA in DIET Section  -->
<div id="ViewBMIDetailsPopup" class="modal fade in" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
	<div class="modal-dialog">
		<div class="modal-content" class="col-md-9">
			<div class="modal-body">
				<div class="col-md-3-1 pull-right" style="margin-top: 5px;">
					<label>Patient DOB: </label><label id="pdob"
						style="padding-left: 15px;"></label>
				</div>
				<div class="modal-header" style="padding-top: 3%;">
					<div class="col-md-10-1">
						<div class="col-md-2-1">
							<label class="TextFont">Weight (Kg)<b
								style="color: red; padding-left: 2px;">*</b></label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="weight" onkeyup="caclculatePatientBMI()"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="Weight" name="weight"
									onkeypress="return validateNumbers(event)" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">Height (Cm)<b
								style="color: red; padding-left: 2px;">*</b></label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="height" onkeyup="caclculatePatientBMI()"
									onkeypress="return validateNumbers(event)"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="height" name="height" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">BMI (Kg/(M<sup>2</sup>))
							</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="BMI" class="form-control input-SmallText col-md-9-1"
									type="text" placeholder="BMI" name="BMI" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">BSA (M<sup>2</sup>)
							</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="BSA" class="form-control input-SmallText col-md-9-1"
									type="text" placeholder="BSA" name="BSA" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">Head CIM (Cm/In)</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="HCIM" onkeypress="return validateNumbers(event)"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="HCIM" name="HCIM" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">BMI Date</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="BMIDate" readonly="readonly"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="BMI Date" />
							</div>
						</div>
					</div>
					<div>
						<div class="col-md-1-1" style="margin-top: 0px; line-height: 1.2">
							
							<button onclick="refreshBMIBSA();" title="" data-placement="left"
								data-toggle="tooltip" class="btn btn-xs btn-danger"
								data-original-title="Refresh">
								<i class="fa fa-refresh"></i>
							</button>
						</div>
						<button class="btn btn-xs btn-danger coversheetBtn cls" type="button"
							style="margin-top: 0px;" data-dismiss="modal">
							<i class="fa fa-arrows"></i> Close
						</button>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-sm-12-1">
						<table class="table table-condensed">
							<thead>
								<tr>
									<th class="col-md-1-1 center">#</th>
									<!-- <th class="col-md-2-1 center"><div class="TextFont">Adm.
											no.</div></th> -->
									<th class="col-md-1-1 center">Weight
											(Kg)</th>
									<th class="col-md-1-1 center">Height
											(Cm)</th>
									<th class="col-md-1-1 center">
											BMI (Kg/M</th>
									<th class="col-md-1-1 center">
											BSA </th>
									<th class="col-md-1-1 center">Head
											CIM (Cm/In)</th>
									<th class="col-md-1-1">BMI
											Date</th>
									<th class="col-md-1-1 center">Edit</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="col-sm-12-1"
						style="margin-top: -21px; border: 1px solid #b8b8b8; overflow-y: scroll; height: 230px; max-height: auto;">
						<table class="table table-striped table-condensed">
							<tbody id="PatientBMIInfoTable">
							</tbody>
						</table>
						<input id="patBMI_BSA_ID" value="0" type="hidden"
							style="display: none;" />
					</div>					'
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

<input type="hidden" id="subobjWithComplaintAndFinding" value="<%=subobjWithComplaintAndFinding %>" />
<input type="hidden" id="idForPlanofTreat" value="0" />
<input type="hidden" id="compId" value="0" />
<input type="hidden" id="ICDCallFrom" value="" />
<input type="hidden" id="labBtnFlg" value="N" />
<input type="hidden" id="physicalDisFlag" value="N" />
<input type='hidden' id='pagetypopd' value='OrderForm' />
<input type="hidden" id="cancerOnOff" value="<%=cancerOnOff %>" />
<div  style="display: none;"   id="prescriptionTemplateContentDocHiddenDiva"></div>


<!-- aniket, 22 DEC 21 -->
<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
<input type="hidden" id="userId" value="1">
<!-- aniket, 08 JAN 22 -->
<input type="hidden" id="opdCustomTemplateId" value="0" />

<!-- aniket, 08 JAN 22 -->
<input type="hidden" id="opdCustomTemplateSubjectiveData" value="0" />

<!-- aniket, 08 JAN 22 -->
<input type="hidden" id="opdCustomTemplateOjectiveData" value="0" />

<!-- aniket, 09 JAN 22 -->
<input type="hidden" id="clinicalEvalId" value="0" />

<!-- aniket, 17 JAN 22 -->
<input type="hidden" id="followUpId" value="0" />

<!-- aniket, 09 JAN 22 -->
<input type="hidden" id="setimmunizationconfigcount" value="">
<div style="display: none;" id="doctorObject"></div>
<div style="display: none;" id="specObject"></div>
<div style="display: none;" id="deptObject"></div>
<div style="display: none;" id="cathConsTrolleyDiv"></div>
<div style="display: none;" id="conDocsList"></div>
<div style="display: none;" id="oncoEmrQueList"></div>
<input type="hidden" id="docQueryType" value="insert" />
<!-------------------------For LIS Start---------------------  -->
<input type="hidden" id="inOutHouseCount" value="0">
<input type="hidden" id="histopathLab" value="N">
<input type="hidden" value="N" id="templateWiseTestFlag" />
<input type="hidden" value="<%=todays_date2%>" id="collectionDate" />
<input type="hidden" value="<%=todays_time%>" id="collectionTime" />
<input type="hidden" value="0" id="sampleType" />
<input	type="hidden" id="registeredAt" value="other" />
 <input	type="hidden" id="customerType" value="0" /> 
 <input  type="hidden" id="customerId" value="0" />
 <input type="hidden" id="businessType" value="2" />
 <input type="hidden" class="form-control"		id="billDetailsId" value="0" />
 <input type="hidden"  id="pId" value="<%=request.getParameter("pid")%>">
<input type="hidden"  id="tId" value="<%=request.getParameter("tid")%>">
<input type="hidden" id="sponsorTestCharges" value="0">
	<input type="hidden" id="yearWiseSponsorTestCharges" value="0">	
	<input type="hidden" id="packageID" value="<%=packageID%>">
	<input id="defchargesfromConf" type="hidden" value="0" />
<!-------------------------For LIS END---------------------  -->


<!--Consultation Docter pop up-->
<div id="divConsDoc" class="modal fade in" tabindex="-1"
	data-backdrop="static">
	<div class="modal-dialog">
		<div class="modal-content col-md-12-1"
			style="margin-top: 10px; margin-left: 50px;">
			<div class="modal-header">
				<div class="box-title">
					<h4>
						Consultation Details
						<div class="pull-right">
							<button id="iSaveConsultationDoctor"
								class="btn btn-success editUserAccess"
								onclick="saveOPDConsultationDoctor()" value="insert">
								<i class='fa fa-save'></i>
							</button>
							<button class="btn btn-danger"
								onclick="closeOPDConsultationPopUP();">
								<i class='fa fa-times'></i>
							</button>
						</div>
					</h4>

				</div>
			</div>

			<div class="modal-body">
				<table border="1" id="tblData1"
					class="table table-bordered table-striped table-condensed">
					<thead>
						<tr style="background-color: transparent;">
							<th colspan="4">Patient ID:<span id="patIDSpan"></span></th>
							<!-- <th colspan="2">Patient Name:<span id="patNamSpan"></span></th> -->
						</tr>
						<tr>
							<th>Date</th>
							<th>Doctor</th>
							<th>Specialization</th>
							<th>Department</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style="width: 150px"><input type="text" id="iDate" readonly class="form-control input-SmallText" onclick="displayCalendar(document.getElementById('iDate'),'dd/mm/yyyy',this)" /></td>
							<td style="width: 150px"><select id="iConsDoc"  onchange="getDepartNameByDoctorId()" style="width: 98%; font-size: 11px;"></select></td>
							<td style="width: 150px"><select id="iConsSpec" onchange="getDoctorBySpecialization();" style="width: 98%; font-size: 11px;"></select></td>
							<td style="width: 150px" ><select id="iConsDept"  style="width: 98%; font-size: 11px;"></select></td>
						</tr>
					</tbody>
				</table>


				<div class="title col-md-12-1" id="tblRow1"
					style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-bottom: 1%; margin-top: 1%;">
					<label
						style="padding-top: 0px; margin-bottom: 0px; margin-right: 20px; margin-left: 20px; font-size: 10px;"
						class="editUserAccess btn" onclick="addNewConsDoc()"> <i
						class='fa fa-plus'></i> New Consultation Doctor
					</label>

				</div>

				<div class="" id="consDocDiv"
					style="height: 300px; max-height: auto; margin-top: 8.3%; border: 1px solid #ddd;">
					<table border="1"
						class="table table-bordered table-striped table-condensed">
						<thead>
							<tr>
								<th>#</th>
								<th>Doctor Name</th>
								<th>Specialization</th>
								<th>Department</th>
								<th>App.Date</th>
								<th id='tblHeader'>Delete</th>
							</tr>
						</thead>

						<tbody id="iConsDocTable">

						</tbody>
					</table>

				</div>

				<div class="modal-footer">
					<div class="form-group col-md-12-1 center"></div>
					<input type='hidden' id="commonAd_patId" value='0' /> <input
						type='hidden' id="commonAd_treatId" value='0' /> <input
						type='hidden' id="commonAd_receipt_type" value='advance' />
						<input type="hidden" id="instIds" value="0"> <!--Added By Akshata  -->
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Start  Lab test Result Pop Up -->
<div class="modal" tabindex="-1" role="dialog" id="labResultModal"> 
			  <div class="modal-dialog" role="document" style="width:49%;"> 
			   <div class="modal-content">
			      <div class="modal-header" style="background-color:blue;">
			       <h5 class="modal-title" >Test Results</h5>
			
			     </div>
			      <div class="modal-body" style="overflow: auto; height: 300px">
			
			       <table border="1"
						class="table table-bordered table-striped table-condensed">
						<thead>
							<tr>
								<th>#</th>
								<th>Profile Name</th>
								<th>Test Name</th>
								<th>Normal Range</th>
								<th>Result</th>
								
							</tr>
						</thead>

						<tbody id="labTestResultBody" style="height: 300px">

						</tbody>
					</table>
			 
			     </div>
			     <div class="modal-footer">
			       <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeLabResultPopUp()">Close</button>
			      </div>
			    </div>
			  </div>
			 </div>
<!-- End  Lab test Result Pop Up -->
						<!-- Test Template Modal -->
				<div id="viewLabTestTemplateWise" class="modal" role="dialog">
							<div class="modal-dialog">
								<div class="panel panel-default col-md-12-1"
									style="margin-top: 0px; height: 600px;">
								<div style="margin-top: 9px;" class="col-md-12-1">
									
									
								<div class="pull-right">
								<!-- <button onclick="savePatientTestTemplate()" title="Save Template" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-success" data-original-title="Update Test Template">
									<i class="fa fa-save"></i></button> -->
									&nbsp;&nbsp;&nbsp;
								<button type="button" class="btn btn-warning" onclick="closeTemplatePopUp()"	 data-dismiss="modal">Close</button>
							</div>
								</div>
									<div class="panel-body">
										<div id="move" style="width: 100%; display: none;"
											class="ui-resizable ui-draggable ui-draggable-handle">
											<textarea class="ckeditor ui-widget-content " name="editor1"
												title="Rich Text Editor, editor1" placeholder="Content"
												id="editorTemp1"></textarea>
										</div>
										<div id="historyTemp" style="width: 100%;"
											class="tabbable ui-resizable ui-draggable ui-draggable-handle">
											<ul class="nav nav-tabs">
											</ul>
											<div class="divide-10"></div>
											<div class="tab-content">
												<div ID="testTemplate" class="tab-pane fade in active">
													<textarea class="ckeditor ui-widget-content "
														name="txtEditorTestTemplate"
														title="Rich Text Editor, editorTestTemplate"
														placeholder="Content" id="iEditorTestTemplateWise"></textarea>
												</div>
										</div>
									</div>
									
								</div>		
						</div>
				</div>
			</div>
				<!-- /Test Template Modal -->	

<script>
 	$('#timeFrom').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	}); 
	
$('#timeMorn').datetimepicker({
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
	var logic = function(currentDateTime) {
		if (currentDateTime.getDay() == 6) {
			this.setOptions({
				minTime : '11:00'
			});
		} else
			this.setOptions({
				minTime : '8:00'
			});
	};
	
</script>


<script>
	var phyDisFlag = "<%=request.getParameter("phyDisFlag")%>";
	if(phyDisFlag == "Y"){
		
		$("#bed").hide();			
	}else{
		
		$("#bed").show();			
	}
</script>

</html>
