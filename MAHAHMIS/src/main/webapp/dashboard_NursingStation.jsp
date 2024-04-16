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
<title>IPD Nursing Station Dashboard</title>
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
<script type="text/javascript" src="js/pharma_patient.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/utility.js"></script>
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
<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css"
	type="text/css" />
	<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />

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

<!-- <script src="/WEB-INF/resources/js/app_js/pharma_counter_batch_popup.js"
	type="text/javascript"></script> -->

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
	
	
	<script type="text/javascript" src="js/registration.js"></script>
	<script type="text/javascript" src="js/ehat_CoversheetNew.js"></script>
	<script type="text/javascript" src="js/ipdhistory.js"></script> <!-- Touheed new Save and update-->	
	<script type="text/javascript" src="js/dd_prescription.js"></script><!-- add By rahul for medication -->

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		getPatientDataByTreatmentIdIPD(<%=request.getParameter("treatmentId")%>); 
		fetchDoctorList(<%=session.getAttribute("uId")%>);
		fetchDoctorRoundTemplateIPD(<%=session.getAttribute("uId")%>);
		getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		$("#RowCount").val('0');
		<%-- fetchDoctorRounds(<%=request.getParameter("treatmentId")%>,<%=session.getAttribute("uId")%>); --%>
		
		<%-- getAllPrescriptionsByTreatmentId(<%=request.getParameter("treatmentId")%>,<%=session.getAttribute("uId")%>) --%>
		//Added By Pooja
		getPatientBedHall(<%=request.getParameter("treatmentId")%>);
		//fetchDocList();
		
		
		
		var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
			/* $(".hideCustomClass").each(function(){
				  $(this).hide();
				}) */
		}
		var pid = $("#pid").val();
		//setPatientInfo(pid, "ipd");
		setTimeout(
				function() {

		var id = "drround";			
		//temForDoctorround(id, physicalDisFlag);			
		//fetchDoctorRoundsByDateOnchange();			
		setDoctorPreRound();
			}, 200);
		
		$("#indentRowCount").val("1");
		getStoreDetails();
		fetchLabResultData("OpdDoctorsDesk");
		
		//fetchNursingMedication("onload");
		//@author : Touheed made changes in calling function @date : 08-June-2016 
		//fetchTestDashboard();
		//@author : Touheed made changes in calling function @date : 08-June-2016
		
		//getPackages("onload");
		getDoctornameForCommonTemp2();
		fetchipddetailsdrdeskForNursDashboard();
		
		
		var preTreat = $("#preTreat").val();
		if(preTreat=="Y"){
			$('#tempdissum').removeAttr("class");
            $("#tempdissum").css('display','none');
			$('#bed').removeAttr("class");
            $("#bed").css('display','none');
            $('#autodissum').removeAttr("class");
            $("#autodissum").css('display','none');
            $('#disinv').removeAttr("class");
            $("#disinv").css('display','none');
            $('#ipdDoctorStationJSPHeadDiv').find('input, button, select').attr('disabled', 'disabled');
            $('#date-pick').removeAttr("disabled");
            $('#autodissum').removeAttr("class");
            $("#autodissum").css('display','none');
            $('#pharmacyConsumptionIndent').removeAttr("class");
            $("#pharmacyConsumptionIndent").css('display','none');
     		//$("#ipdDoctorStationJSPHeadDiv *").prop('disabled',true);

		}
		//getIndentTemplateDetails('indent');
		//to fetch the patObject for IPD_BedWard.jsp
		//display('IPD_DoctorStation');
		//getAllHeading("onload", "assignTest");
		//fetchTopicNm('instructions');
		//defaultViewTest("radioBodyPart");
		//defaultViewTest("RadioGroup");
		
		//$("#indentMasterListDiv").hide();

		//$("#lidoctor").addClass("anchorActive");

		//var pid = $("#pid").val();

		/* populate CKEDITOR sub obj tab */
		//fetchCKEditorDocterDesk1();

		/* prep. */
		//fetchPreperationsList("DoctorDesk");

		/* unit */
		//fetchUnitTypeList("DoctorDesk");

		/* prescription based route */
		//fetchAllMedicationMaster("RouteType");

		/* prescription instruction */
		//fectchAllPrescriptionInstruction();

		/* autoSuggestion onload */
		/* setPrescriptionAutocompleteNameID('name', 'onload'); */
		/* setTimeout(function() {
			fetchTestDashboard();
		}, 1000); */

		

					//setPatientInfo(pid, "ipd");
				//	setDoctorPreRound();
					
					//fetchHospitalDetailsPrint();

					//@modifiedBy: Touheed @modifiedDate:17-Mar-2015 because on editing test after assigned
					//featchPreviousLabTestOfPat("IPD");

					// for Doctor Round IPD_DoctorStation
					//loadRoundDoctors(null, null);

					//fetchDoctorHospital();
					//fetchBodyPartDetails();
					//Assesment
					//showAssessmentTemp();
					// IPD_DRR.jsp
					//setDoctorPreRound();

					//featchOrderFormByDate();
					//orderFormPopup();
					//fetchAllergyAlerts();
					// fetch all
					//fetchDoctorSpecilizations('custTemp');
					// fetch one
					//fetchSetDoctorSpecilizations();

					//setDiagnosisAutocompleteNameDescpID("diagnosis", "onload");
					//setDiagnosisAutocompleteNameDescpID("diagno_description","onload");
					//showPatientAdmissionNote("IPD");
					/* disable on previous treatment */
					/* setTimeout(function() {
						disableIpdDoctorStationJSP();
					}, 2500); */
			

		$("#RowCount").val('1');

		//IPD_DRR for Daily Round and Order Form
		$("#dairou1").css('background-color', 'Yellow  ');

		var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#date-pick").val(date);
		$("#OFdate-pick").val(date);
		$("#OFdate-pick1").val(date);
		$("#hiddenDate").val(date);
		$("#popup_container2").val(
				arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2]);
		$("#allergyDate").val(date);
		$("#assesmentDate").val(date);

		//setCommonPatInfo();

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

	function getStoreDetails() {
		var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				storeName : 'IPD'
			},
			url : "./pharmacy/mrn/getStoreDetailsByStoreName",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var parseData = jQuery.parseJSON(r);
				setIndentStoreDropDown(parseData.result);
			}
		});
	}

	function setIndentStoreDropDown(result) {
		var content = "";
		for ( var i = 0; i < result.length; i++) {

			content = content + "<option value='"+result[i].storeId+"'>"
					+ result[i].storeName + "</option>";
		}
		$("#pharmaStoreId").append(content);
	}

	function loadIndentPopUp() {
		if ($('#stockSelection').is(":checked")) {
			$('#Po_Pop_Up').modal('show');
			$('#orderFormContent1').html("");
		}
	};

	function printDiv(divName) {

		var date = $("#date").html();
		var date1 = date.split('-');
		var date2 = date1[0] + '        ' + date1[1] + '          ' + date1[2];
		var hospDetails = $("#hospDetails").html();
		hospDetails = eval('(' + hospDetails + ')');
		var hosp = hospDetails.listHosDetail[0];
		var originalContents = document.body.innerHTML;
		var i;
		var j = 1;
		var myobj = $("#PreTre").html();
		myObj = JSON.parse(myobj);
		var docName = $("#docName").html();
		var tit;
		var fname;
		var mname;
		var lname;
		var age = myObj.ag + " " + myObj.agtp;
		var weight = myObj.wt + " " + "Kg";
		var opdcount = myObj.objTreat.trCount;
		if (myObj.tit == undefined) {
			tit = "";
		} else {
			tit = myObj.tit;
		}
		if (myObj.fn == undefined) {
			fname = "";
		} else {
			fname = myObj.fn;
		}
		if (myObj.mn == undefined) {
			mname = "";
		} else {
			mname = myObj.mn;
		}
		if (myObj.ln == undefined) {
			lname = "";
		} else {
			lname = myObj.ln;
		}
		var name = tit + " " + fname + " " + mname + " " + lname;
		var mobile;
		if (myObj.mb == undefined) {
			mobile = "";
		} else {
			mobile = myObj.mb;
		}

		var arrTopic = $("#selTopicName").val();

		var WindowObject = window.open('', ' ', '');
		WindowObject.document.writeln('<html><body>');

		WindowObject.document
				.writeln('<div style="width: 106%; margin-top:21%;"><div style="width: 40%; float: left;margin-left:17%"><b>'
						+ opdcount
						+ '</b></div><div style="width: 15%; float: left;margin-left:20%; margin-top:0.1%;"><b>'
						+ date1[0]
						+ '&nbsp;&nbsp;&nbsp;&nbsp;'
						+ date1[1]
						+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
						+ date1[2]
						+ '</b></div></div>');

		WindowObject.document
				.writeln('<div style="width: 100%; "><div style="width: 60%; float: left;margin-left:20%;margin-top:1.5%;"><b><b>Dr.'
						+ docName
						+ '</b></div><div style="width: 40%; float: left; "><b> </b></div></div>');

		WindowObject.document
				.writeln('<div style="width: 100%; "><div style="width: 60%; float: left;margin-left:20%;margin-top:1.5%;"><b><b>'
						+ name
						+ '</b></div><div style="width: 40%; float: left; "><b> </b></div></div>');

		WindowObject.document
				.writeln('<div style="width: 100%;"><div style="width: 60%; float: left;"><b><b></b></div><div style="width: 40%; float: left;margin-left:80%;margin-top:4.2% "><b>'
						+ "" + ' </b></div></div>');

		/*	WindowObject.document
					.writeln('<div style="width: 75%;  padding-top: 3%;margin-left: 26%"><div style="width: 100%; padding-top: 3%;float: left;"><div style="width: 100%;  "><b>Diagnosis :</div><div style="width: 90%;  float: left;"><div name="impression"  id="impression" >'
							+ $("#diagnosis").val()
							+ ' </div></div></div></div></div><div style="width: 75%; padding-top: 3%;float: left;margin-left: 26%"><div style="width: 100%; float: left;padding-bottom: 10px;">Prescription :</div><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%"><tr><td style="border: solid 1px;" align="center" width="4%"><strong>#</strong></td><td style="border: solid 1px;width:43%" align="left"><strong>Medicine Name</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>M</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>A</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>E</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>N</strong></td><td style="border: solid 1px;" align="center" width="23%"><strong>Instruction</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>Days</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>Qty</strong></td></tr>');
		 */
		if ($("#diagnosis").val() != "") {
			WindowObject.document
					.writeln('<div style="width: 75%;  padding-top: 3%;margin-left: 26%"><div style="width: 100%; padding-top: 3%;float: left;"><div style="width: 100%;  "><b>Diagnosis :</div><div style="width: 90%;  float: left;"><div name="impression"  id="impression" >'
							+ $("#diagnosis").val()
							+ ' </div></div></div></div></div>');
		}
		var rowCount = $("#RowCount").val();

		if ($("#Medicine1").val() != "") {
			WindowObject.document
					.writeln('<div style="width: 75%; padding-top: 3%;float: left;margin-left: 26%"><div style="width: 100%; float: left;padding-bottom: 10px;">Prescription :</div><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%"><tr><td style="border: solid 1px;" align="center" width="4%"><strong>#</strong></td><td style="border: solid 1px;width:43%" align="left"><strong>Medicine Name</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>M</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>A</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>E</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>N</strong></td><td style="border: solid 1px;" align="center" width="23%"><strong>Instruction</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>Days</strong></td><td style="border: solid 1px;" align="center" width="5%"><strong>Qty</strong></td></tr>');
			for (i = 1; i <= rowCount; i++) {

				var txtName = "#Medicine" + i;
				var chkMName = "#M" + i;
				var chkAName = "#A" + i;
				var chkEName = "#E" + i;
				var chkNName = "#N" + i;
				var txtInstruction = "#Instruction" + i;
				var txtDays = "#Days" + i;
				var txtQty = "#Qty" + i;

				var txtValue = $(txtName).val();
				if (txtValue != "" && txtValue != undefined) {

					if (!($(chkMName).attr('checked')
							|| $(chkNName).attr('checked')
							|| $(chkAName).attr('checked') || $(chkEName).attr(
							'checked'))) {

						alert("Please select medicine prescription time");
						return false;

					} else if ($(txtDays).val() == "" || $(txtQty).val() == "") {

						alert("Please Enter Days And Quantity For medicine # No: "
								+ i);
						return false;

					} else {

						WindowObject.document
								.writeln('<tr><td  style="border: solid 1px;" align="center">'
										+ j++
										+ '</td><td style="border: solid 1px;" align="left" id="Medicine1">'
										+ txtValue + ' </td>');
						if ($(chkMName).attr('checked')) {

							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" src="images/Accept.png" width="15%" height="15%"> </td>');

						} else {
							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" width="0%" height="0%" /> </td>');
						}

						if ($(chkAName).attr('checked')) {

							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" src="images/Accept.png" width="15%" height="15%"> </td>');

						} else {
							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" width="0%" height="0%" /> </td>');
						}

						if ($(chkEName).attr('checked')) {
							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="E1"  src="images/Accept.png" width="15%" height="15%"> </td>');

						} else {
							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="E1" width="0%" height="0%"/> </td>');
						}
						if ($(chkNName).attr('checked')) {
							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="N1"  src="images/Accept.png" width="15%" height="15%">  </td>');

						} else {
							WindowObject.document
									.writeln('<td style="border: solid 1px;" align="center" ><img id="N1" width="0%" height="0%"/ > </td>');
						}

						WindowObject.document
								.writeln('<td  style="border: solid 1px;" align="left">&nbsp;'
										+ $(txtInstruction).val()
										+ '</td><td style="border: solid 1px;"  align="center" id="Medicine1">&nbsp;'
										+ $(txtDays).val()
										+ ' </td><td style="border: solid 1px;" align="center" id="Medicine1">&nbsp;'
										+ $(txtQty).val() + ' </td></tr>');

					}
				}
			}
		}
		WindowObject.document.writeln('</table>');
		if ($("#note").val() != "") {
			WindowObject.document
					.writeln('<div style="width: 100%;padding-top: 3%; float: right;"><div style="width: 100%; ">Note :</div><div style="width: 90%;  float: left;"><div name="impression"  id="impression" class="" >'
							+ $("#note").val() + ' </div></div>');
		}
		// Test Items

		var arrTopicSel = [];
		arrTopicSel = $("#selTopicName").val();

		var topic = $("#topic").html();
		topic = eval('(' + topic + ')');

		if (arrTopicSel != null) {

			WindowObject.document
					.writeln('<div style="width: 100%;padding-top: 3%; float: right;"><div style="width: 100%; ">Instructions :</div><div style="width: 90%;  float: left;"><div name="instructions"  id="instructions" class="" >');

			var count = 1;
			var count2 = 0;
			var topicName = [];

			for ( var j = 0; j < arrTopicSel.length; j++) {
				for ( var i = 0; i < topic.skcli.length; i++) {
					if (topic.skcli[i].idskm == arrTopicSel[j]) {
						var index = topicName.indexOf(topic.skcli[i].skname);
						if (index == -1) {
							count2 = 0;
							WindowObject.document.writeln(count++ + '. <b>'
									+ topic.skcli[i].skname + '</b>:-<br/>');

							for ( var i = 0; i < topic.skcli.length; i++) {

								if (topic.skcli[i].idskm == arrTopicSel[j]) {
									if (count2 == 0) {
										WindowObject.document
												.writeln('<span style="font-weight:normal;"> '
														+ topic.skcli[i].itnm
														+ '</span>');
										count2++;
									} else {
										WindowObject.document
												.writeln('<span style="font-weight:normal;">, '
														+ topic.skcli[i].itnm
														+ '</span>');
									}
								}
							}
							WindowObject.document.writeln('<br/>');

						}
					}
				}
			}

			WindowObject.document.writeln(' </div></div>');
		}

		WindowObject.document.close();

		WindowObject.focus();

		WindowObject.print();

		WindowObject.close();
		

	}

	function toCreateDiv(RowCount) {
		var w = $("#DRRaddCount").val();
		
		//var hiddenRowCount = $("#RowCount2").val();
			//document.getElementById(RowCount);
		var rowCount = $("#RowCount2").val();
			//hiddenRowCount.value;
		//rowCount = rowCount-1;
		var tm = $("#t" + rowCount + "").val();
		var tn = $("#tn" + rowCount + "").val();
		var cf = $("#cf" +  + "").val();
		var tr = $("#tr" + rowCount + "").val();
		var ia = $("#ia" + rowCount + "").val();
	    var cmt = $("#cmt" + rowCount + "").val();
	    var dtime = $("#dtime" + rowCount + "").val();
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
		document.getElementById(divId).innerHTML = '<td	style="height: 21.5px; width: 75px; text-align: center;">'
				+ rowCount
				+ '</td><td	style="height: 21.5px; width: 101px;"><input readonly="readonly" class="form-control input-SmallText" type="text" onkeypress="return validateComma(event)" id="t'
			//	+ rowCount
				//+ '" value="" onmouseover="click2(this)" /></td><td style="height: 21.5px; width: 195px;"><select onchange="getDocTemplate(this.value,'+rowCount+');"  class="form-control input-SmallText TextFont" id="tn'
				+ rowCount
				+ '" ><option></option></select></td><td style="height: 21.5px; width: 250px;"><textarea rows="2" cols="35" id="cf'
				+ rowCount
				+ '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 250px;"><textarea rows="2" cols="35" id="ia'
				+ rowCount
			 	+ '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 221px;"><select class="form-control input-SmallText TextFont" id="rb'
				+ rowCount
				+ '" ><option></option></select></td>'
				

				+ '<td	style="height: 21.5px; width: 101px;"><input readonly="readonly" class="form-control input-SmallText" type="text" onkeypress="return validateComma(event)" id="dtime'
				+ rowCount 
				+'" ></td><td style="height: 21.5px; width: 50px;"><textarea rows="2" cols="19" id="nursingnotes'
				+ rowCount
				+ '" name="textfield" onkeypress="return validateComma(event)"></textarea></td>'

				+'<td style="height: 21.5px; "><input type="checkbox" id="checkbox'
				+ rowCount + '"   name="checkboxDR" value= "0" /><input type="hidden" value="0" id="salveId'+ rowCount + '"/>'
				+'</td><input type="hidden" value="0" id="templateName'+ rowCount + '"/><input type="hidden" value="0" id="templateId'+ rowCount + '"/></div>';
				


				
			/* + '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 215px;"><input type="text" onkeyup=autoSuggestionForDoctorRoundChrg('+rowCount+') class="form-control input-SmallText TextFont" id="rb'
			+ rowCount
			+ '"><input type="hidden" id="drrDocId'+rowCount+'" value="0"></td><td style="height: 21.5px; width: 114px;"><input type="checkbox" name="checkbox'
			+ rowCount + '"   id="checkbox" value= "0" /><input type="hidden" value="0" id="bilid'+ rowCount + '"/></div>'; */

		$("#RowCount2").val(rowCount);
		$("#addRowCount").val(w);
	    $('#t' + rowCount).datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});

	    $('#dtime' + rowCount).datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});
		
		w++;
		$("#DRRaddCount").val(w);
		//ajaxResponse = $("#doctorBean").html();
		//alert('ajaxResponse:'+ajaxResponse);
		//DoctorBean = eval('(' + ajaxResponse + ')');
		var Doc_div = "rb" + rowCount;
		//var dispDoctor = "<option value='0'>--Select--</option>{#foreach $T as dl}<option value='{$T.dl.doctor_ID}'>{$T.dl.doc_name}</option>{#/for}";
			//var dispDoctor = "<input type='text'>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
		$("#" + Doc_div + "").html($("#select_doctorlist").html());
		//$("#" + Doc_div + "").setTemplate(dispDoctor);
		//$("#" + Doc_div + "").processTemplate(DoctorBean);
		//below code is for doctor round template in selectbox at doctor station
		var data = $("#DRTDetails").html();	//data set at ipdTreatment.fetchDoctorRoundTemplate("IPD_DoctorStation")
		//alert("data..."+data);
		//var result = eval('(' + data + ')');//onload function call
		var rowId = "tn" + rowCount;		// #tn is select box id with row count 
		//var tempDRT = "<option value='0'>--Select--</option>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}'>{$T.ldrt.templateName}</option>{#/for}";
			//var tempDRT = "<input type='text'>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}' onclick=fillDRT({$T.ldrt.templateId},'"+rowCount+"')>{$T.ldrt.templateName}</option>{#/for}";

		//$("#" + rowId + "").html($("#select_tempList").html());
		//$("#" + rowId).setTemplate(tempDRT);//set template
//		$("#" + rowId).processTemplate(result);
	}
</script>

<!-- <script type="text/javascript">
	tinymce
			.init({
				selector : "textarea#editor1",
				theme : "modern",
				plugins : [
						"advlist autolink lists charmap print preview hr anchor pagebreak spellchecker",
						"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
						"table contextmenu directionality emoticons template textcolor paste fullpage textcolor" ],

				toolbar1 : "newdocument | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | searchreplace | bullist numlist | outdent indent blockquote | undo redo | print preview fullscreen  | forecolor backcolor | table | hr removeformat | subscript superscript | charmap emoticons inserttime | ltr rtl | visualchars visualblocks nonbreaking pagebreak restoredraft",

				//	menubar : false,
				menu : {
					file : {
						title : 'File',
						items : 'newdocument | print | fullscreen'
					},
					edit : {
						title : 'Edit',
						items : 'undo redo  | selectall | searchreplace'
					},
					insert : {
						title : 'Insert',
						items : 'charmap'
					},
					format : {
						title : 'Format',
						items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'
					},
					table : {
						title : 'Table',
						items : 'inserttable tableprops deletetable | cell row column'
					}
				},

				toolbar_items_size : 'small',

				style_formats : [ {
					title : 'Bold text',
					inline : 'b'
				}, {
					title : 'Red text',
					inline : 'span',
					styles : {
						color : '#ff0000'
					}
				} ],

				templates : [ {
					title : 'Test template 1',
					content : 'Test 1'
				}, {
					title : 'Test template 2',
					content : 'Test 2'
				} ]
			});
</script>
 -->

<!-- Abhijit Radke -->
<script type="text/javascript">


/*
	var w = 1;
	function toCreateDiv(RowCount) {
		var hiddenRowCount = document.getElementById(RowCount);
		var rowCount = hiddenRowCount.value;
		var tm = $("#t" + rowCount + "").val();
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
		//alert(DRRDivDash);
		var x = document.createElement('tr');
		x.setAttribute('id', divId);
		document.getElementById("DRRDiv").appendChild(x);
		//var Doc_div = "rb" + rowCount;
		//loadRoundDoctors(Doc_div);
		document.getElementById(divId).innerHTML = '<td	style="height: 21.5px; width: 78px; text-align: center;">'
				+ rowCount
				+ '</td><td	style="height: 21.5px; width: 101px;"><input readonly="readonly" class="form-control input-SmallText" type="text" onkeypress="return validateComma(event)" id="t'
				+ rowCount
				+ '" value="" onmouseover="click2(this)" /></td><td style="height: 21.5px; width: 316px;"><textarea rows="2" cols="37" id="cf'
				+ rowCount
				+ '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 315px;"><textarea rows="2" cols="37" id="ia'
				+ rowCount
				+ '" name="textfield" onkeypress="return validateComma(event)"></textarea></td><td style="height: 21.5px; width: 221px;"><select class="form-control input-SmallText TextFont" id="rb'
			+ rowCount
			+ '" ><option></option></select></td><td ><input type="checkbox" name="checkbox'
			+ rowCount + '"   id="checkbox"/></div>';

		//$("#"+divId+"").innerHTML =='<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'+rowCount+'</div><div	style="width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;"><input	style="width: 90%;" type="text"  id="t"'+rowCount+'	value="" /></div><div	style="width: 31.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;"><input	style="width: 90%;" type="text" id="cf"'+rowCount+'	value="" /></div><div	style="width: 31%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" name="textfield" id="tr"'+rowCount+'	value="" /></div><div	style="width: 16%; height: 25px; padding-left: 1%; padding-top: 3px;"><select	 style="width: 90%;" id="rb"'+rowCount+' ><option></option>></div></div>';
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(w);

		$('#t' + rowCount).datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});

		//	var z= document.createElement('input');
		//	z.setAttribute('id', 'addRowCount');
		//	z.setAttribute('value',i);
		//z.setAttribute('type', 'hidden');
		//document.getElementById("DRRDivDash").appendChild(z);
		w++;

		ajaxResponse = $("#doctorBean").html();
		DoctorBean = eval('(' + ajaxResponse + ')');
		var Doc_div = "rb" + rowCount;
		var dispDoctor = "<option value='0'>--Select--</option>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
		$("#" + Doc_div + "").setTemplate(dispDoctor);
		$("#" + Doc_div + "").processTemplate(DoctorBean);

	}*/
	
</script>


<!-- Abhijit Radke -->

</head>

<%
	java.util.Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateformatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = dateformatter.format(currentDate.getTime());
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
					<%-- <%@include file="PharmacyIndentPopUp.jsp"%>
					<%@include file="pharmacy_indent_template_pop_up.jsp"%> --%>

				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_IPD.jsp"%>
				<!--End Left Menu -->
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>"> <!-- add By rahul for medication -->
	<input type="hidden" id="uids" value="<%=session.getAttribute("uId")%>"> <!-- add By rahul for medication -->
	<input type="hidden" id="formDate" value="">
	<input type="hidden" id="toDate" value="">
	<input type="hidden" id="createdBy" value="">
	<input type="hidden" id="physicalDisFlag" value="N" />
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input id="hiddenDate" type="hidden" /> <input type="hidden"
					id="todays_date" value="<%=todays_date%>" />

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
												<li>Nursing Station</li>
												<li><a href="">Dashboard</a></li>
											</ul>
										</div>
									</div>
								<!-- 	<div id="commonPatInfo" class="col-md-12-1"
										style="margin-top: -18px;"></div> -->
										
										
						<!-- <div class="panel" style="padding-top:3%;margin-top:3%;background-color:#e7e7e7;"> -->
						<div class="alert alert-block alert-info fade in col-md-12-1"style="padding-block-end:5%; padding-top:3%;margin-top:-29px;">
						<!-- <div class="panel-body"> -->
							<div class="row">
								<div class="col-md-1" style="margin-top:-30px;">
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
												<label class="control-label lblBold" id="lblCenterPatientId">UHID :</label>
												 <label id="centerPatientId" class="control-label" ></label>  
												 <label id="patientId" class="control-label" style=" display: none"></label> 
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
												<label class="control-label lblBold">BillNo: </label>  <label id="billNo1" class="control-label"></label> 

											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
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
										
										 <div class="col-md-3" >
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall :</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                     	</div>	
										
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>

											</div>
										</div>
								</div>
							</div>
						</div>
										
										
									</div>	
								</div>
								<!-- Page Date Print Discards-->

								<!-- Start Tab UI -->
								<input type="hidden"  id="doctorRoundId" value="0">
								<div id="div_tempList" style="display: none;">
									<select id="select_tempList" name="select_doctorlist">
									</select>
									<input id="input_jsonDateTempList" type="hidden" value='0' />	
								</div>
								
								<div class="col-md-12-1"
									style="margin-top: 5px; margin-left: 0px;">
									<!-- Start BOX -->
									<div class="box border col-md-12-1">
										<div class="divide-10"></div>
										<div class="tabbable col-md-12-1">
											<ul class="nav nav-tabs">

												<li class="active"> <a id="dr" data-toggle="tab" href="#DailyRoundReport"><span
														class="hidden-inline-mobile">Doctor Round</span></a></li>
												<li><a id="cp" data-toggle="tab" href="#CPOE"><span
														class="hidden-inline-mobile" onclick="fetchipddetailsdrdeskForNursDashboard('nursingdash');">Investigation</span></a></li>
											 	<li><a id="md" data-toggle="tab" href="#OrderForm"><span
                                                        class="hidden-inline-mobile" onClick="getAllPrescriptionsForMedication()">Medication</span></a></li>
											</ul>
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

												
												<!-- Start Code for CPOE GUI -->
												<div id="CPOE" class="tab-pane fade">
													

													<!-- Start Code for row2 CPOE GUI -->
													<div id="row2" class="col-sm-12-1" style="margin: 0px">
														<div class="form-group col-md-12-1" style="margin: 2px;">
															<!-- Start Header for Edit Delete Option -->
															<div class="col-md-12-1"
																style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																  
																<button class="btn btn-xs btn-success" id="labbut" title="View Lab Result"
																				style="margin-left: 10px;" 
																				onclick="showPopUpTestResult('viewbtn')" 
																				title="View Lab Result">
																				<i class="fa fa-eye View"></i>
																</button>
																
																<button class="btn btn-xs btn-success" title="Radiology and Images"
																				style="margin-left: 10px;" 
																				onclick="showPopUpRIS()">
																				<i class="fa fa-eye View"></i>
																</button>
																
																<label id="labrestxt" onclick=""
																	style="cursor: pointer; padding-top: 0px; margin-right: 0px; margin-left: 0px; margin-bottom: 0px; display: none; ">
																	Lab Result Posted
																</label> 
																
															</div>
															<!-- End Header for Edit Delete Option -->

															<div class="col-sm-12-1" style="margin-top: 0px;">
																<table class="table table-condensed ">
													<!-- 				<thead>
																		<tr>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">#</div></th>
																			<th class="col-md-2-1 center"
																				style="height: 21.5px; padding-left: 5px;"><div
																					class="TextFont">Particulars/Details</div></th>
																			<th class="col-md-1-1 center"
																				style="height: 21.5px; padding-left: 0px;"><div
																					class="TextFont">Date</div></th>
																			<th class="col-md-2-1 center"
																				style="height: 21.5px; padding-left: 0px;"><div
																					class="TextFont">Consultant Name</div></th>
																			<th class="col-md-3-1 center"
																				style="height: 21.5px; padding-right: 23px;"><div
																					class="TextFont">Type</div></th>
																			<th class="col-md-1-1 center"
																				style="height: 21.5px; padding-right: 31px;"><div
																					class="TextFont">Test</div></th>
																			 <th class="col-md-1-1 center"
																				style="height: 21.5px; padding-right: 29px;"><div
																					class="TextFont">Status</div></th>
																			<th class="col-md-1-1 center"
																				style="height: 21.5px; padding-left: 0px;"><div
																					class="TextFont">Action</div></th> 
																		</tr>
																	</thead> -->
																</table>
																<div id="flip-scroll" class="col-sm-12-1"
																	style="overflow-y: scroll; height: 380px; maxheight: auto; margin-top: -21px;">
																	<table class="table table-striped table-condensed">
																					<thead>
																		<tr>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">#</div></th>
																			<th class="col-md-2-1 center"
																				style="height: 21.5px; padding-left: 5px;"><div
																					class="TextFont">Particulars/Details</div></th>
																			<th class="col-md-1-1 center"
																				style="height: 21.5px; padding-left: 0px;"><div
																					class="TextFont">Date</div></th>
																			<th class="col-md-2-1 center"
																				style="height: 21.5px; padding-left: 0px;"><div
																					class="TextFont">Consultant Name</div></th>
																			<th class="col-md-3-1 center"
																				style="height: 21.5px; padding-right: 23px;"><div
																					class="TextFont">Type</div></th>
																			<th class="col-md-1-1 center"
																				style="height: 21.5px; padding-right: 9px;"><div
																					class="TextFont">Added From</div></th>
																			<!-- <th class="col-md-1-1 center"
																				style="height: 21.5px; padding-right: 31px;"><div
																					class="TextFont">Test</div></th>
																			 <th class="col-md-1-1 center"
																				style="height: 21.5px; padding-right: 29px;"><div
																					class="TextFont">Status</div></th>
																			<th class="col-md-1-1 center"
																				style="height: 21.5px; padding-left: 0px;"><div
																					class="TextFont">Action</div></th>  -->
																		</tr>
																	</thead>
																		<tbody id="testDashNursing">
																		</tbody>
																	</table>
																	<input type="hidden" id="CPOErowCount" value="0" />
																</div>
															</div>
														</div>
													</div>
													<!-- End Code for row2 CPOE GUI -->
												</div>
												<!-- End Code for CPOE GUI -->

												<!-- Start Code for #DailyRoundReport GUI -->
												<div id="DailyRoundReport" class="tab-pane fade in active">

													<!-- Start Save DRR Section -->
													<div class="col-sm-12-1" style="padding-left: 30px;">
														<div class="col-sm-2-1" style="margin-top: 15px;">
															<label class="TextFont">Previous Doctor Round
																Report</label>
														</div>
														<div class="col-sm-3-1" style="margin-top: 15px;">
															<input type="text" class="form-control input-SmallText"
																id="date-pick" name="date-pick"
																onchange="setDoctorPreRound()"
																onclick="displayCalendar(document.getElementById('date-pick'),'dd/mm/yyyy',this)"
																readonly="readonly" />
														</div>
														
														
														<div class="col-sm-2-1" style="margin-top: 15px; float: right;">
															<input type="button" value="Update DRR" class="btn btn-xs btn-success"
															 onclick="saveNursingDoctorRounds()">
															 <input type="button" value="Reset" class="btn btn-xs btn-warning"
															 onclick="resetDoctorRoundTemp()">
														</div>


													</div>
													<!-- End Save DRR Section -->

													<!-- Start Table Code -->
													<div class='col-sm-12-1'>
														<table class='table table-bordered'
															style='margin-top: 20px; width: 99%;'>
															<thead>
																<tr>
																	<th style='height: 21.5px; width: 25px;'><label
																		class='TextFont'>#</label></th>
																	<th style='height: 21.5px; width: 25px;'><label
																		class='TextFont'>Time</label></th>
																	<th style='height: 21.5px; width: 100px;'><label
																		class='TextFont'>Clinical Notes</label></th>
																	<th style='height: 21.5px; width: 100px;'><label
																		class='TextFont'>Investigation Advice</label></th>
																	<!-- <th style='height: 21.5px; width: 70px;'><label
																		class='TextFont'>RoundBy</label></th> -->
																	<!-- <th style='height: 21.5px; width: 25px;'><label
																		class='TextFont'>Time</label></th> -->
																	<th style='height: 21.5px; width: 70px;'><label
																		class='TextFont'>RoundBy</label></th>
																		
																	<th style='height: 21.5px; width: 25px;'><label
																		class='TextFont'>Time</label></th>
																	<th style='height: 21.5px; width: 70px;'><label
																		class='TextFont'>RoundBy</label></th>	
																	
																</tr>
															</thead>
														</table>
													</div>

													<div class="col-md-12-1"
														style="margin-top: -22px; overflow-y: scroll; height: 370px; max-height: auto;">
														<table class="table table-striped table-condensed">
															<tbody id="DRRDiv">
															</tbody>
														</table>
													</div>
													<!-- End Table Code -->
												</div>
												<!-- End Code for #DailyRoundReport GUI -->

												<!-- Start Code for #OrderForm GUI -->
									<div id="OrderForm" class="tab-pane fade">

													<!-- Start Save DRR Section -->
													<div class="col-sm-12-1" style="padding-left: 30px;">
														<div class="col-sm-1-1" style="margin-top: 6px;">
															<label class="TextFont">Medication Form</label>
														</div>

														<div class="col-sm-3-1" style="margin-top: 15px;">
															<input type="text"
																class="form-control input-SmallText col-sm-6-1"
																id="OFdate-pick" name="date-pick"
																onchange="checkDate(),setDoctorPreRound(),getAllPrescriptionsForMedication()"
																onclick="displayCalendar(document.getElementById('OFdate-pick'),'dd/mm/yyyy',this)"
																readonly="readonly" />
															<!-- <div class="col-sm-5-1"
																style="margin-top: 2px; margin-left: 5px;">
																<label class="TextFont col-sm-6-1">Order ID : </label>
																<div id="divOmID" class="col-sm-6-1"></div>
															</div> -->

														</div>

														<!-- <div id="divCopyOrderForm" class="col-sm-2-1"
															style="margin-top: 6px;">
															<a href="#" onclick="copyCurrentOrderForm(0)"
																onmouseout="this.style.backgroundColor='transparent'; this.style.color='inherit'"
																onmouseover="this.style.color='black'"
																style="color: inherit; background-color: transparent;">Copy
																Order Form To Current Date</a>
														</div> -->

														
													</div>
													<!-- End Save DRR Section -->

													<!-- Start Column:2 Row:3 -->
													<div class="col-md-12-1" style="padding-top: 10px;">
														<div class="col-md-12-1">
															<!-- Start Header for New Edit Delete Option -->
															<div class="col-md-12-1"
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 15px;">
																
																<label 
																	style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"> 
																	To be Administrated 
																</label> 
																
																<label class="btn" id="administrateMedication"
																	style="padding-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px;"
																	value="New"> <i class="fa fa-check-square"></i> Administrate
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
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">strength</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Dose</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Unit</div></th>
																			<th class="col-md-1-1 center" style="height: 20.5px;"><div
																					class="TextFont">Time Slot </div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">C.Day/T.Days</div></th>					
																			<th class="col-md-3-1 center" style="height: 21.5px;"><div
																					class="TextFont">Instructions</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Duration</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Quantity</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont"></div></th>		
																		</tr>
																	</thead>
																</table>
																<!--End Table Heading -->

																<!--Start Table Body -->
																<div id="flip-scroll" class="col-sm-12-1"
																	style="overflow-y: scroll; height: 150px; maxheight: auto; margin-top: -21px;">
																	<table class="table table-condensed">
																		<tbody id="orderFormContentAdministrative">
																			
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




						<!-- ___________________________________________________End___________________________________________________________ -->

					<div class="col-md-12-1" style="padding-top: 10px;">
									<div class="col-md-12-1">
											<!-- Start Header for New Edit Delete Option -->
											<div class="col-md-12-1"
													style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 15px;">
													
													<label style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"> 
													Administrated 
													</label> 
													
													<label class="btn" id="reverseMedication"
														style="padding-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 33px;"
														value="New"> <i class="fa fa-level-up"></i> Reverse
													</label>
																 
											</div>
											<!-- End Header for New Edit Delete Option -->
											<div class="col-sm-12-1" style="margin-top: 0px;">
												<!--Start Table Heading -->
													<table class="table table-condensed">
														<thead>
															<tr>
																<tr>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">#</div></th>
																			<th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Drug</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Preparation</div></th>
																			<th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Instructions</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Time Slot</div></th>		
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">C.Day/T.Days</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Date</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont">Dose Type/Unit</div></th>
																			<th class="col-md-1-1 center" style="height: 21.5px;"><div
																					class="TextFont"></div></th>		
																		</tr>
															</tr>
														</thead>
													</table>
												<!--End Table Heading -->

												<!--Start Table Body -->
												<div id="flip-scroll" class="col-sm-12-1"
													style="overflow-y: scroll; height: 150px; maxheight: auto; margin-top: -21px;">
														<table class="table table-condensed">
															<tbody id="orderFormContentAdministrated">
																			
															</tbody>
														</table>
												</div>
												<!--End Table Body -->
												<input type='hidden' id='OFqueryType2' value='insert' />
												<input type='hidden' id='OFSlaveID2' value='0' />
											</div>
									</div>
							</div>
					
					
					
					</div>
												<!-- End Code for #OrderForm GUI -->

					</div>
											<!-- End Code for tab-content GUI -->
				</div>
			</div>
		</div>
		<!-- End Tab UI -->


							
								<!-- End code of pathlogy test template -->

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
			<input type='hidden' id='queryType' value='save' />
<input id="callfromipd" type="hidden" name="callfromipd" value="<%=request.getParameter("type")%>"/>
			<div id="patobject" style="display: none;"></div>
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
			<input type="hidden" name="DRRaddCount" id="DRRaddCount" value="1">
			<div id="testDetails" style="display: none;"><%=request.getParameter("myobj")%></div>
			<!-- For IPD_BedWard -->
			
			
			<input id="drid" type="hidden"
				value="0"
				style="display: none;" /> 
			<input id="tid" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
			<input id="pid" type="hidden"
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

			<!-- For Assesment -->
			<div id="assesmentDetails" style="display: none;"></div>
			<input type="hidden" style="display: none;" id="icd10_id_forAssmnt"
				value="0" />
			<input type="hidden" style="display: none;" id="diagno_slave_id"
				value="0" />

			<div id="allergyAlertsDetails" style="display: none;"></div>

			<div id="customizeTemplate" style="display: none;"></div>

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
			<input type='hidden' value='0' id='addRowCount' />
			<input type='hidden' value='0' id='RowCount' />
			<input type='hidden' value='0' id='RowCount2' />

			<input type='hidden' value='0' id='consumptionRowCount' />
			<input type='hidden' value='0' id='morning' />
			<input type='hidden' value='0' id='afternoon' />
			<input type='hidden' value='0' id='evening' />
			<input type='hidden' value='0' id='night' />
		</c:if>
			<div id="userObj" style="display: none;"></div>
			<div id="div_doctorList" style="display: none;">
					<select id="select_doctorlist" name="select_doctorlist">
					</select>
				</div>
	<!-- @codeBy : Touheed @codeDate : 18-Feb-2016 --> 
<input id='testmasterId' type='hidden' name='testmasterId' value='0'/>
<div id="iPopupFormula" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-11-1"
								style="margin-top: 7%; margin-left: 9%;">
								<div class="modal-header">
									<button class="btn btn-xs btn-danger" aria-label="Close" title="Close"
										data-dismiss="modal" type="button"
										style="margin-top: -5px;; margin-left: 730px"
										onclick="closeLabPop()">
										<i class="fa fa-times"></i>
									</button>
									<!-- <button class="btn btn-xs btn-success" title="Edit"
										style="margin-top: -37px; margin-left: 700px"
										" data-original-title="savepass " data-toggle="tooltip"
										data-placement="left" onclick="">
										<i class="fa fa-edit"></i>
									</button>
									
									<button class="btn btn-xs btn-danger" aria-label="Delete Formula" title="Delete Formula"
										data-dismiss="modal" type="button"
										style="margin-top: -70px;; margin-left: 758px"
										onclick="">
										<i class="fa fa-trash-o"></i>
									</button> -->
		
									<h4 id="testHead" style="margin-top: -25px;">
										<i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i> Lab Test Results :
									</h4>
								</div>
				<div class="modal-body">
				
				<div class="divide-20"></div>

									<div class="col-sm-12-1">

										<div class="col-sm-6-1 center">
											<label class="TextFont col-md-3-1">Posted Date:</label> <label
												id="postDate" class="TextFont col-md-3-1"></label>
										</div>
										<div class="col-sm-6-1 center">
											<label class="TextFont col-md-3-1">Posted Time:</label> <label
												id="postTime" class="TextFont col-md-3-1"></label>
										</div>


									</div>


									<div class="divide-10"></div>
				
				
					<div id="ratediv" class="col-sm-12-1">
						<table class="table table-bordered" style="margin-top: 0px; width: 1067px;">
							<thead>
							<tr>
								<th class="col-sm-1 center">#</th>
								<th class="col-sm-5-1 center">Test Name</th>
								<th class="col-sm-2-1 center">Test Result</th>
								<th class="col-sm-2-1 center">Normal Values</th>
								<th class="col-sm-2-1 center">Method</th>
								</tr>
							</thead>
						</table>
					</div>
					<div id="testDivLab"  class="col-md-12-1"
								style="width: 782px; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;margin-top:-21px; margin-bottom:10px;"></div>
					
				</div>
				</div>
			</div>
		</div>
		
		
	</section>

	<!-- IPD_DRR for Daily Round and Order Form -->
	<div id="onloadDrrSet" style="display: none;"></div>
	<input type="hidden" value="<%=session.getAttribute("userType")%>"
		id="userType" />
	<div id="DRR" style="display: none;"></div>
	<div id="objorder" style="display: none;"></div>
	<input type="hidden" name="indentRowCount" id="indentRowCount"
		value="1">

	<input type="hidden" name="indentTemplateRowCount"
		id="indentTemplateRowCount" value="1">

<input type="hidden" value="0" id="idipd_nursingStation_medication_dashboard" />

	<!-- ---------------------------Touheed Khan @date : 27-Apr-2016--------------------- -->
					<div id="postPopup" class="modal fade in" tabindex="-1">
						<div class="modal-dialog">
							<div class="modal-content col-md-7-1"
								style="margin-top: 16%; margin-left: 25%;">
								<div class="modal-header">
									<h4 id="testHead" style="margin-top: 0px;">
										<i class="fa fa-fw"><img width="19px;" height="19px;"
											src="images/science-512.png" alt=""></i>Select Posted Lab Test Result To View :
									
										<button class="btn btn-xs btn-success" 
											title="View Post Result" data-dismiss="modal" type="button"
											style="margin-top: 0px;; margin-left: 16%"
											onclick="viewAllLabTestResult()">
											<i class="fa fa-eye View"></i>
										</button>
										
										<button class="btn btn-xs btn-danger" aria-label="Close"
											title="Close" data-dismiss="modal" type="button"
											style="margin-top: 0px;; margin-left:0px"
											onclick="hideValueforResult()">
											<i class="fa fa-times"></i>
										</button>
										
									</h4>
									
								</div>
								<div class="modal-body">
									<div id="totalposttime" class="col-md-12-1">
										<table class="table table-bordered"
											style="margin-top: 0px;">
											<thead>
												<tr>
													<th class="col-sm-1 center">#</th>
													<th class="col-sm-3-1 center">Post</th>
													<th class="col-sm-3-1 center">Post Time</th>
													<th class="col-sm-3-1 center">Post Date</th>
													<th class="col-sm-1-1 center"><i class="fa  fa-eye View"></i></th>
												</tr>
											</thead>
										</table>
									</div>

									<div class="divide-10"></div>

									<div  class="col-md-7-1"
										style="width: 100%; height: 150px; overflow-y: auto; border: 1px solid #b8b8b8; margin-top: -21px; margin-bottom: 10px;">
										
										<table class="table table-striped table-condensed"
											style="margin-top: 0px;">
											
											<tbody id="totalpost">
											
											</tbody>
											
										</table>
										
									</div>


										

								</div>
							</div>
						</div>
					</div>


<!-- _________________________________________TK End_____________________________________________ -->
		
		
		
			
<!-- @codeBy: Touheed  @codeDate:25-Feb-2016 (Start) -->
		<div id="iPopupEditor" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
								style="margin-top: 16%; margin-left: 20%;">
								<div class="modal-header">
									<!-- <button class="btn btn-xs btn-danger" aria-label="Close" title="Close"
										data-dismiss="modal" type="button"
										style="margin-top: -5px;; margin-left: 730px"
										onclick="">
										<i class="fa fa-times"></i>
									</button>
									 <button class="btn btn-xs btn-success" title="Edit"
										style="margin-top: -37px; margin-left: 700px"
										" data-original-title="savepass " data-toggle="tooltip"
										data-placement="left" onclick="">
										<i class="fa fa-edit"></i>
									</button>
									
									<button class="btn btn-xs btn-danger" aria-label="Delete Formula" title="Delete Formula"
										data-dismiss="modal" type="button"
										style="margin-top: -70px;; margin-left: 758px"
										onclick="">
										<i class="fa fa-trash-o"></i>
									</button>  -->
		
									<h4 id="testHead" style="margin-top: 0px;">
										<i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i> Lab Test Results Editor:
										
										<button id="btnSavelab" class="btn btn-xs btn-success" onclick="saveEditorForResult()" title="Save"  style=" margin-left:48%;">
										<i class="fa fa-save"></i>
										</button>
										<!-- <button class="btn btn-xs btn-success" onclick="" title="Edit" >
										<i class="fa fa-edit"></i>
										</button> -->
										<button class="btn btn-xs btn-danger" onclick="closeEditorForResult()" title="Close" >
										<i class="fa fa-times"></i>
										</button>
										<!-- <button class="btn btn-xs btn-success" onclick="" title="Save" >
										<i class="fa fa-save"></i>
										</button> -->
									</h4>
									
									
									
								</div>
						<div class="modal-body">
				
							
										<div>
											<!-- <textarea class="ckeditor ui-widget-content"
												name="editorSubjective" id="editorForLabResult"
												title="Rich Text Editor, editorSubjective"
												placeholder="Content"></textarea>
												 -->
											<textarea id="txtLabNote" class=" " cols="88" rows="8"></textarea>	
										</div>		
						</div>
				</div>
			</div>
		</div>
		
	<!-- @codeBy: Touheed  @codeDate:25-Feb-2016 (End)-->
	

<!-- @codeBy: Laxman  @codeDate:23-July-2018 (Start) For Ris Result Show-->
	
<div class="modal fade" id="risImgReportModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 11%;">
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
				
				<div class="col-md-12-2">
					<!-- BOX-->
					<div class="box border default col-md-12-1"
						style="margin: 0px;">
						<div class="box-title col-sm-12-1"
							style="margin-top: 0px; background-color: #a696ce;">
							<h4>
								<i class="fa fa-bars"></i>Radiology and Images
							</h4>
						</div>
						<div class="col-sm-12-1" style="margin-top: 3px;">
							<table class="table table-condensed">
								<thead>
									<tr>
										<th class="col-md-1-1"><div class="TextFont">#</div></th>
										<th class="col-md-4-1"><div class="TextFont">Particulars</div></th>
										<th class="col-md-2-1"><div class="TextFont">Date</div></th>
										<th class="col-md-2-1 center"
											style="height: 21.5px; padding-right: 40px;"><div
												class="TextFont">Report</div></th>
									</tr>
								</thead>
							</table>
						</div>
						<div id="flip-scroll" class="col-md-12-1"
							style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
							<table class="table table-condensed">
								<tbody id="coverSheetInvestDashBoard11">
								</tbody>
							</table>
						</div>
					</div>
					<!-- /BOX -->
				</div>

			</div>
			<div class="modal-footer">
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
			<input type="hidden" value="<%=session.getAttribute("preTreat")%>" id="preTreat" />
			
<!-- @codeBy: Laxman  @codeDate:23-July-2018 (End) -->
			
</body>
</html>