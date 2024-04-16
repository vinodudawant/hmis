<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Patient Sale | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">
<link
	href="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/css/morphext.css"/>">
<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/clip2-ui/css/styles.css"/>">

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/clip2-ui/css/plugins.css"/>">

<!-- JQUERY -->
<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-jtemplates.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Patient_Sale_Bill.js"/>"></script>
<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_patient_batch_popup.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/morphext.min.js"/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<!-- Alertify -->
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<style>
.ui-menu .ui-menu-item a {
	background: ffc133;
	font-size: 12px;
}

.ui-autocomplete {
	max-height: 100px;
	overflow-y: auto;
	/* prevent horizontal scrollbar */
	overflow-x: hidden;
}
/* IE 6 doesn't support max-height
   * we use height instead, but this forces the menu to always be this tall
   */
* html .ui-autocomplete {
	height: 100px;
}
</style>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxmenu.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/webcam.min.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/jquery.ajaxfileupload.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>

<script lang="Javascript">
$(document).ready(function() {
	
	App.setPage("Pharma_Patient_Sales_Bill_Entry"); //Set current page
	App.init(); //Initialise plugins and elements
	setVouNo();
	expiryBatches();
	$('#patient_prescription_data').on('shown.bs.modal', function(e) {
		fetchPatientPriscription();
	});
	
	$('input[type="file"]').ajaxfileupload({
		'action' : 'UploadFileServlet',
		'onComplete' : function(response) {
			var fileName=$('#changeProfilePicture').val();
			$('#upload').hide();
			$('#message').show();
			var statusVal = JSON.stringify(response.status);
			if(statusVal == "false")
			{
				$("#message").html("<font color='red'>"+ JSON.stringify(response.message) +" </font>");
			}	
			if(statusVal == "true")
			{
				$("#message").html("<font color='green'>"+ JSON.stringify(response.message) +" </font>");
				$('#patImg').attr('src','../../pharmacy/pharmacy/readImage?url='+fileName);
			}			
		},
		'onStart' : function() {
			$('#upload').show();
			$('#message').hide();
		}
	});
});

function hideCameraPopUp()
{
	$('#cameraModal').hide();
}

        function assignCamera(){
        	$("#cameraClick").removeAttr("onclick");
        	Webcam.set({
                width: 320,
                height: 240,
                image_format: 'jpeg',
                jpeg_quality: 90,
                upload_name:$('#hiddenPatientId').val()+"_webcam"
            });
            Webcam.attach( '#my_camera' );
        }

        function take_snapshot() {
        	       // take snapshot and get image data
            Webcam.snap( function(data_uri) {
                // display results in page
                document.getElementById('results').innerHTML = 
                    '<img id="capturedImage" src="'+data_uri+'"/>';
            } );
        	       
        }
        
        function assignProfilePicture(){
    		var src=$("#capturedImage").attr("src");
    		if(document.getElementById('capturedImage')==null)
    		{
    			alert("please capture image");
    			return false;
    		}else
    			{
    			$('#patImg').attr('src',src);
    		Webcam.upload( src, '/../../EhatEnterprise/UploadFileServlet', function(code, text) {
    			//$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+$('#patID').val()+"_webcam.jpg");
    			$('#capturedImage').attr('value',+$('#hiddenPatientId').val()+"_webcam.jpg");
    		
            });
    		return true;
    			}
    	
    	}
    </script>
<!-- <script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$('#patient_prescription_data').on('shown.bs.modal', function (e) {
				
				fetchPatientPriscription();
				
			});
		});
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
		
</script> -->

</head>


<script type="text/javascript">

	function setVouNo()
	{
	
		var hashes=window.location.href.split("?");
		
		var queryString= [];
	    var hash=0;
	    var value1=0;
	    var val=0;
	    var result;
	    var value2=0;
	    var hash1=0;
	 
	  	if(hashes.length==1)
		{
			var inputs = [];
			inputs.push('docId=2');
			$("#txtPatientName").focus();
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/common/getDocNo",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					
				},
				success : function(r) {
					$('#txtBillNo').val(r);
				}
			});
		
		}else
		{
			 hash = hashes[1].split('&');
			 value1= hash[1].split("=");
			 
		var hash1 = hashes[1].split('&&');
	
		value2= hash1[1].split("=");
		
			$("#mainPendingBalance").html(value1[1]);
			$("#viewPrescription").hide();
			$("#viewSettleBill").hide();
		
			fetchSponserStatus(value2[1]);
		}
	   
	}

	onload = function() 
{
		getSponsorDetails("${patientSalesBill.patientId}");
		var hashes=window.location.href.split("=");
		var split=$("#hiddenBillModeId").val();
		$("#showPatientDetail").hide();
		$("#sampleDiv").hide();
		if(hashes.length==1)
		{
			$("#DivBank").hide();
			$("#DivChequeNum").hide();
		}
		else if(split==2)
		{	
			$("#DivBank").show();
		    $("#DivChequeNum").show();
		}
		else
			{
			$("#DivBank").hide();
			$("#DivChequeNum").hide();
			
			}
		/* $("#DivComment").hide(); */
	
		
	/* 	setInterval(function() {
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/common/getDocNo",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					$('#txtBillNo').val(r);
				}
			});
		}, 10000); */ //5 seconds
		$("#submitForm").click(function(event) {

			$("#PatientSaleBillForm").submit();
			window.open("../../pharmacy/patientSale/view");

			reset();
			alertify.success("Record Saved Successfully");
		});
		$("#txtRatePerUnit").css('background', 'yellow');

		$("#js-rotating").Morphext({
			// The [in] animation type. Refer to Animate.css for a list of available animations.
			animation : "flash",
			// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
			separator : ".",
			// The delay between the changing of each phrase in milliseconds.
			speed : 500,
			complete : function() {
				// Called after the entran	setAutoDoctorName("searchBox1", "onload", "OPD_Appoinment");ce animation is executed.
			}
		});
		setAutoDoctorName("searchBox1", "onload", "OPD_Appoinment"); 
		//autoSuggestionForPendingPatientName("txtPatientName1", "onload"); 
	/* 	autoSuggestionForPateintName("txtPatientName", "onload");  */
		
		return setValuesToAutocomplete(null);
		
	};
		/* $("#submitForm").click(function(event){
		alert("new tab");
		$('#PatientSaleBillForm').submit(function(event){
			window.open("/EhatEnterprise/pharmacy/patientSale/view");
			reset();
			alertify.success("Record Saved Succesfully");
		});
	}); */

	shortcut.add("Ctrl+s", function() {
		savePatientSale();
	});
	shortcut.add("Ctrl+l", function() {
		backToList('patientSale');
	});
	
	shortcut.add("delete", function() {
		deleteRowOnFocus();
	});
	
	shortcut.add("Up", function() {
		setUpfocus();
	});
	
	shortcut.add("Down", function() {
		setDownfocus();
	});
	shortcut.add("Alt+c", function() {
		showSettleBill();
	});
	
		
	shortcut.add("Alt+p", function() {
		$("#sampleDiv").show();
		$("#HSTDiv").hide();
		$("#txtPoProductName").focus();
		getNextAutoIncrement();
		});
		
		shortcut.add("Alt+d", function() {
			$("#sampleDiv").hide();
			$("#HSTDiv").show();
			$('#sampleDiv').find('input:text').val('');
			$('#textMin').html('');
			$('#textStockQty').html('');
			$('#textVat').html('');
			$('#textPhoneNo').html('');
			});
		
	
	/* shortcut.add("f6", function() {
		window.open("/EhatEnterprise/pharmacy/counterSale/view-frm");

	});

	shortcut.add("f8", function() {
		window.open("/EhatEnterprise/pharmacy/indentSale/view-frm");
	});
	
	shortcut.add("f5", function() {
		window.open("/EhatEnterprise/pharmacy/purchase/view-frm");
	}); */

	function validateData() 
	{
		var hashes=window.location.href.split("=");
		 if ($('#txtPatientName').val() != null && $('#txtPatientName').val() != "") {
						if ($('#searchBox1').val() != null
											&& $('#searchBox1').val() != "") {
		
		if ($('#txtProName1').val() != null && $('#txtProName1').val() != "")
		{
			if ($('#hiddenPatientSalesBillId').val() != null&& $('#hiddenPatientSalesBillId').val() != "")
			{
				calculateVat();
				alert("Record Updated successfully!");
				$('#PatientSaleBillForm')
						.submit(
								function(event) {
									window
											.open("../../pharmacy/patientSale/view");
									event.preventDefault();
								});

			} else {
				var totalFillRow = 0;
				for ( var i = 1; i < $('#RowCount').val(); i++) {
					if ($('#hiddenProductId' + i).val() != ''
							&& $('#hiddenProductId' + i).val() != null) {
						totalFillRow++;
					}

				}
				if (totalFillRow > 0) {
					calculateVat();
					if($('#txtAmtReceived').val() != null && $('#txtAmtReceived').val() !='' && $('#txtAmtReceived').val().trim().length>0)
					{
						alert($('#txtAmtReceived').val());
					alert("Record Saved successfully!");
					$('#PatientSaleBillForm').submit();
					window.open("../../pharmacy/patientSale/view");
					
					}
					else
					{
						alert($('#txtAmtReceived').val());
						alert("Enter Amount Receive");
						$('#txtAmtReceived').focus();
						return false;
					}
					
				} else {
					showAlert();
				}
			}
		}
 } else {
			alert("Enter doctor name");
			$('#searchBox1').focus();
		}		/*
		} else {
		alert("Select Date");
		$('#txtDate').focus();
		}
		}

		else {
		alert("Enter Bill No");
		$('#txtBillNo').focus();
		}
		} else {
		alert("Enter Doctor address");
		$('#txtDoctorAddress').focus();
		}
		}

		else {
		alert("Record not Found");
		$('#searchBox1').val('');
		$('#searchBox1').focus();
		}
		} else {
		alert("Enter Doctor Name");
		$('#searautocomplete="off"chBox1').focus();
		}
		}

		else {
		alert("Enter Patient Address");
		$('#txtPatientAddress').focus();
		}
		} else {
		alert("Record not found");
		$('#searchBox').val('');
		$('#searchBox').focus();
		}

		} */
		}
		else {
		alert("Enter Patient Name");
		$('#txtPatientName').focus();
		}
		 
	}
	function showAlert() {

		alert("Please Fill All the Details!");
	}
	
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<body style="background: white ! important;">
	<section id="page">



		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_Patient_Sale_pop_up.jsp"%>
			<%@include file="Pharma_patient_priscription_pop_up_list.jsp"%>
			<%@include file="pharma_patient_sale_pending_pop_up.jsp"%>
			<%@include file="HelpMenu.jsp"%>
			<%@include file="Pharma_Credit_Bills.jsp"%>
			<%@include file="pharma_view_expiry_product.jsp"%>
			<div id="main-content">
				<div class="container">
					<c:set scope="session"
						value="${fn:length(patientSalesBill.ltPatientSaleBill)}"
						var="slaveCount"></c:set>
					<div class="row">
						<div id="content" class="col-lg-12">
							<form:form commandName="patientSalesBill"
								id="PatientSaleBillForm"
								action="../../pharmacy/patientSale/save" method="post">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a
													href="../../Dashboard.jsp">Home</a></li>
												<li><a
													href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Patient Sales Bill Entry</li>

												<li><span style="background-color: red" class="badge"
													id='storeTitle'><i class="fa fa-hospital-o"></i> <%
 	if (session.getAttribute("pharmacyStoreName") != null) {
 %> <%=session.getAttribute("pharmacyStoreName")%> Store <%
 	} else {
 %> No Sub Store Selected <%
 	}
 %> </span></li>

												<div class="li pull-right" style="margin-left: 9px;">

													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="patientSalePrint('')">Print</button>
												</div>
												
												<!-- <div class="li pull-right" style="margin-left: 9px;">

													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="savePatientSaleAfterEdit()">Save
														and Print(Ctrl+S)</button>
												</div> -->
												
												<div class="li pull-right" style="margin-left: 9px;">
													<a href="../../pharmacy/patientSale/view"
														class="btn btn-xs btn-info">Back to List(Ctrl+L)</a>
												</div>

												<div class="li pull-right" style="margin-left: 9px;">
													<button type="button" data-toggle="modal"
														data-target="#patient_prescription_data"
														class="btn btn-xs btn-info" id="viewPrescription">View
														prescription</button>
												</div>

												<div class="li pull-right" style="margin-left: 9px;">
													<button type="button" data-toggle="modal"
														data-target="Patient_Sales_pending_data"
														onclick='displayPatientPendingPopUp()'
														class="btn btn-xs btn-info" id="viewSettleBill">Settle
														Bill(Alt+c)</button>
												</div>



											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
								<!-- <div class="col-md-12-1">
									<b>Patient Sales Bill Entry</b>
									<div id="indentNumber" class="col-md-6-1"></div>
									<div class="col-md-6-1" style="margin-left: 900px;">
										<button type="button" data-toggle="modal"
											data-target="#patient_prescription_data"
											class="btn btn-xs btn-info">View prescription</button>
									</div>

								</div> -->
								<div class="row">
									<div class="panel-body col-md-12-1"
										style="margin-top: -4%; margin-bottom: -2%">
										<div class="panel-body">
											<div id="patientSalesBill" class="col-md-4-1"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8; background-color: wheat;">

												<div class="col-md-4-1" style="margin-top: -3px;"
													id="AlloptionBtnforShow">
													<%-- <div class="col-md-12-1 center" style="margin-top: 9px;">
														<form:radiobutton path="" id="radioIpd"
															value='ipd' name="typeOfpatientSearch" checked="true" />
														ipd
														<form:radiobutton path="" id="radioOpd"
															value='opd' name="typeOfpatientSearch" />
														opd
													</div> --%>
													<!-- <div class="col-md-3-1" style="margin-top: 0px;">
														<b> </b>
													</div> -->
													<!-- <div class="col-md-2-1" style="padding-left: 10px;">
														<label class="checkbox input-SmallText"> <input
															id="OPDchkC" checked="true" type="radio" value="opd"
															name="typeOfpatient" style="margin-top: 0px !important;">
															OPD
														</label>
													</div>
													<div class="col-md-1-1" style="padding-left: 10px;">
														<label class="checkbox input-SmallText"> <input
															id="IPDchkC" type="radio" value="ipd"
															name="typeOfpatient" style="margin-top: 0px !important;">
															IPD
														</label>
													</div>
													<div class="col-md-3-1 " style="padding-left: 23px;">
														<label class="checkbox input-SmallText "> <input
															id="chkEntireDatabaseC" type="radio" value="diagnosis"
															name="typeOfpatient" style="margin-top: 0px !important;">
															Entire Database
														</label>
													</div> -->
													<c:choose>
														<c:when test="${slaveCount ==0}">
															<div
																class="radio clip-radio radio-primary radio-inline col-md-3-1">
																<input id="OPDchkC" type="radio" value="opd"
																	name="typeOfpatient"
																	style="margin-top: 0px !important;"> <label
																	for="OPDchkC"> OPD </label>
															</div>

															<div
																class="radio clip-radio radio-primary radio-inline col-md-3-1">
																<input id="IPDchkC" type="radio" value="ipd"
																	name="typeOfpatient"
																	style="margin-top: 0px !important;" checked="checked">
																<label for="IPDchkC"> IPD </label>
															</div>
															<div
																class="radio clip-radio radio-primary radio-inline col-md-5-1">
																<input id="chkEntireDatabaseC" type="radio" value="all"
																	name="typeOfpatient"
																	style="margin-top: 0px !important;"> <label
																	for="chkEntireDatabaseC"> Entire Database </label>
															</div>
														</c:when>
														<c:when test="${slaveCount !=0}">
															<c:if
																test="${patientSalesBill.patientSalesBillCD == 'ipd'}">
																<div
																	class="radio clip-radio radio-primary radio-inline col-md-3-1">
																	<input id="OPDchkC" type="radio" value="opd"
																		4 name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="OPDchkC"> OPD </label>
																</div>

																<div
																	class="radio clip-radio radio-primary radio-inline col-md-3-1">
																	<input id="IPDchkC" type="radio" value="ipd"
																		name="typeOfpatient"
																		style="margin-top: 0px !important;" checked="checked">
																	<label for="IPDchkC"> IPD </label>
																</div>
																<div
																	class="radio clip-radio radio-primary radio-inline col-md-5-1">
																	<input id="chkEntireDatabaseC" type="radio" value="all"
																		name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="chkEntireDatabaseC"> Entire Database </label>
																</div>
															</c:if>
															<c:if
																test="${patientSalesBill.patientSalesBillCD == 'opd'}">
																<div
																	class="radio clip-radio radio-primary radio-inline col-md-3-1">
																	<input id="OPDchkC" type="radio" value="opd"
																		checked="checked" name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="OPDchkC"> OPD </label>
																</div>

																<div
																	class="radio clip-radio radio-primary radio-inline col-md-3-1">
																	<input id="IPDchkC" type="radio" value="ipd"
																		name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="IPDchkC"> IPD </label>
																</div>
																<div
																	class="radio clip-radio radio-primary radio-inline col-md-5-1">
																	<input id="chkEntireDatabaseC" type="radio" value="all"
																		name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="chkEntireDatabaseC"> Entire Database </label>
																</div>
															</c:if>

															<c:if
																test="${patientSalesBill.patientSalesBillCD == 'all'}">
																<div
																	class="radio clip-radio radio-primary radio-inline col-md-3-1">
																	<input id="OPDchkC" type="radio" value="opd"
																		name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="OPDchkC"> OPD </label>
																</div>

																<div
																	class="radio clip-radio radio-primary radio-inline col-md-3-1">
																	<input id="IPDchkC" type="radio" value="ipd"
																		name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="IPDchkC"> IPD </label>
																</div>
																<div
																	class="radio clip-radio radio-primary radio-inline col-md-5-1">
																	<input id="chkEntireDatabaseC" type="radio"
																		checked="checked" value="all" name="typeOfpatient"
																		style="margin-top: 0px !important;"> <label
																		for="chkEntireDatabaseC"> Entire Database </label>
																</div>
															</c:if>
														</c:when>
													</c:choose>

													<!-- <div class="radio clip-radio radio-primary radio-inline"> -->

													<div class="col-md-12-1" style="margin-top: 11px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Patient </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:hidden value="patientSale" id="patientSale" path="" />
															<form:hidden path="patientSalesBillId"
																id="hiddenPatientSalesBillId" />
															<form:hidden id="hiddenTreatmentId"
																path="patientSaleTreatmentId" />


															<form:input type="hidden" id="hiddenPatientId"
																path="patientId" />

															<input type="hidden" id="hiddenPoType"
																value="patientSalePurchaseOrder" /> <input
																type="hidden" id="hiddenSponserFlag" value="0" /> <input
																type="hidden" id="billCategoryId" value="0" /> <input
																type="hidden" id="hiddenTreatmentFlag" value="0" /> <input
																type="hidden" id="hiddenCategoryName" value="0" />
															<form:input type="hidden" id="hiddenReferTo"
																path="patientType" />

															<div id="divtxtPatientName" class="typeahead">
																<c:choose>
																	<c:when test="${slaveCount ==0}">
																		<input name="txtPatientName" type="text"
																			id="txtPatientName" autocomplete="off"
																			class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
																			onblur="splitContentOfPatient($('#txtPatientName').val())" />
																	</c:when>
																	<c:when test="${slaveCount !=0}">
																		<input name="txtPatientName" type="text"
																			id="txtPatientName" autocomplete="off"
																			class="typeaheadPatientSale form-control input-SmallText "
																			value="${patientSalesBill.patientSalesBillPrescription}"
																			onblur="splitContentOfPatient($('#txtPatientName').val())" />
																		<form:hidden id="billCategoryId"
																			path="patientSaleBillCatId"
																			value="${patientSalesBill.patientSaleBillCatId}" />
																		<form:hidden id="hiddenTreatmentId"
																			path="patientSaleTreatmentId"
																			value="${patientSalesBill.patientSaleTreatmentId}" />
																		<%-- 	 <form:hidden id="hiddenCategoryName" path="patientSaleCategoryName" value="${patientSalesBill.patientSaleCategoryName}" />  --%>
																		<form:hidden path="patientSalesBillId"
																			id="hiddenPatientSalesBillId"
																			value="${patientSalesBill.patientSalesBillId}" />

																	</c:when>
																</c:choose>
															</div>



														</div>
														<script type="text/javascript">
															$("#txtPatientName")
																	.autocomplete(
																			{
																				source : function(
																						request,
																						response) {

																					var findingName = $(
																							"#txtPatientName")
																							.val();
																					var inputs = [];
																					inputs
																							.push('patientName='
																									+ findingName);
																					
																					var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
																					$('#hiddenReferTo').val(typeOfpatient);
																					if (typeOfpatient == "all") {
																						inputs.push('isEdit=yes');
																					} else {
																						inputs.push('isEdit=no');
																					}

																				//	inputs.push('action=fetchPharmaPateintNameAutosugg');
																					inputs.push('typeOfpatient=' + typeOfpatient);
																					var str = inputs
																							.join('&');

																					jQuery
																							.ajax({
																								async : true,
																								type : "GET",
																								data : str
																										+ "&reqType=AJAX",
																										url : "../../InventoryServlet",
																								timeout : 1000 * 60 * 5,
																								catche : false,
																								error : function() {
																									alert('error');
																								},
																								success : function(
																										r) {
																									var availableTags = [];

																									ajaxResponse = eval('(' + r + ')');

																									for ( var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

																										availableTags
																												.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
																														+ " "
																														+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName
																														+ " "
																														+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName
																														+ "__"
																														+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
																														+ "_"
																														+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
																														+ "_"
																														+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo);
																									}
																									response(availableTags);
																								}
																							});
																				}
																			});
														</script>
														<div class='col-md-1-1'
															style='margin-top: 0px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:hidden id="hiddenTax5" path="patientTaxVat5" />
															<form:hidden id="hiddenTax55" path="patientTaxVat55" />
															<form:hidden id="hiddenTax12" path="patientTaxVat12" />
															<form:hidden id="hiddenTax0" path="patientTaxVat0" />
															<form:hidden id="hiddenTotalTax" path="" />
															<form:hidden id="hiddenTax6" path="patientTaxVat6" />
															<form:hidden id="hiddenTax135" path="patientTaxVat135" />
															<input type="hidden" id="hiddenPoType"
																value="patientSalePurchaseOrder" /> <input
																type="hidden"
																value="<%=request.getParameter("BillMode")%>"
																id="hiddenBillModeId">

															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:textarea path="" id="txtPatientAddress"
																		class="col-md-11-1" required="true"
																		placeholder="Enter Address" name="txtPatientAddress"
																		style="width:97%;" readonly="true" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<textarea id="txtPatientAddress"
																		name="txtPatientAddress" class="col-md-11-1"
																		placeholder="Address" style="width: 97%;"
																		${patientSalesBill.patientSalesBillEntryBy}
																		maxlength="100" required readonly>${patientSalesBill.patientSalesBillEntryBy} </textarea>

																</c:when>
															</c:choose>


														</div>

														<div class='col-md-1-1'
															style='margin-top: 0px; color: red;'>
															<b> *</b>
														</div>

													</div>
													<div class="col-md-12-1 center" style="margin-top: 3px;">
														<c:choose>
															<c:when test="${slaveCount ==0}">
																<form:radiobutton path="patientSaleType" id="radioMRP"
																	value='0' name="radioRateMRP" checked="true" />
														Sale On MRP
														<form:radiobutton path="patientSaleType" id="radioPurRate"
																	value='1' name="radioRateMRP" />
														Sale On Purchase Rate
														</c:when>
															<c:when test="${slaveCount !=0}">
																<c:if test="${patientSalesBill.patientSaleType ==0}">
																	<form:radiobutton path="patientSaleType" id="radioMRP"
																		value='0' name="radioRateMRP" checked="true" />
														Sale On MRP
														 <form:radiobutton path="patientSaleType"
																		id="radioPurRate" value='1' name="radioRateMRP" />
														 Sale On Purchase Rate
														</c:if>
																<c:if test="${patientSalesBill.patientSaleType==1}">
																	<form:radiobutton path="patientSaleType" id="radioMRP"
																		value='0' name="radioRateMRP" />
														Sale On MRP
														 <form:radiobutton path="patientSaleType"
																		id="radioPurRate" value='1' name="radioRateMRP"
																		checked="true" />
														 Sale On Purchase Rate
														</c:if>
															</c:when>
														</c:choose>
													</div>

												</div>

												<div class="col-md-4-1" style="margin-top: 9px;">

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Doctor</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">

															<div id="divsearchBox1">
																<c:choose>
																	<c:when test="${slaveCount ==0}">
																		<form:input path="doctorName" type="text"
																			id="searchBox1" name="searchBox1" autocomplete="off"
																			class="typeahead form-control input-SmallText "
																			placeholder=" Doctor Name" required="true"
																			onkeypress="setAutoDoctorName('searchBox1','onload','OPD_Appoinment');" />
																		<form:hidden path="doctorId" id="hiddenDoctorId" />
																	</c:when>
																	<c:when test="${slaveCount !=0}">
																		<input id="searchBox1" name="searchBox1"
																			class="typeahead form-control input-SmallText"
																			type="text" value="${patientSalesBill.doctorName}"
																			placeholder="Address" style="width: 97%;"
																			maxlength="100" required />
																		<form:hidden path=""
																			value="${patientSalesBill.doctorId}"
																			id="hiddenDoctorId" />
																	</c:when>
																</c:choose>
															</div>
															<!--   ,isAlphaWithSpace('searchBox1',0,200) -->
															<!-- <script type="text/javascript">
																$("#searchBox1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#searchBox1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "/EhatEnterprise/pharmacy/doctor/autoSuggestionDoctorNames",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].doctorName
																													+ "-"
																													+ r[i].doctorAddress
																													+ "-"
																													+ r[i].doctorId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script> -->
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 204px; color: red;'>
																<b> *</b>
															</div> -->
														</div>
														<div class='col-md-1-1'
															style='margin-top: 0px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:textarea path="" id="txtDoctorAddress"
																		class="col-md-11-1" requird="true"
																		placeholder="Enter Address" name="txtDoctorAddress"
																		style="width:97%;" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<textarea id="txtDoctorAddress" name="txtDoctorAddress"
																		class="col-md-11-1" placeholder="Address"
																		style="width: 97%;"
																		${patientSalesBill.patientSalesBillEntryBy}
																		maxlength="100" required readonly>${patientSalesBill.patientSalesBillRound} </textarea>

																</c:when>
															</c:choose>

															<!-- <div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 206px; color: red;'>
																<b> *</b>
															</div> -->
														</div>

														<div class='col-md-1-1'
															style='margin-top: 0px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-3-1" style="margin-top: -7px;">
																<b> Sponsor Name </b>
															</div>
															<div class="col-md-7-1" style="margin-top: -5px;">
																<c:choose>
																	<c:when test="${slaveCount ==0}">
																		<form:input path="" id="txtSponser"
																			class="form-control input-SmallText" requird="true"
																			type="text" placeholder="Sponsor Name"
																			name="txtSponser" />
																		<form:hidden path="sponserId" id="hiddenSponserId" />
																	</c:when>
																	<c:when test="${slaveCount !=0}">
																		<input id="txtSponser" name="txtSponser"
																			class="form-control input-SmallText" type="text"
																			value="${patientSalesBill.patientType}"
																			placeholder="Sponsor Name" style="width: 97%;"
																			maxlength="100" required readonly />

																	</c:when>
																</c:choose>
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-3-1" style="margin-top: 0px;">
																<b> Narration </b>
															</div>
															<div class="col-md-7-1" style="margin-top: 0px;">
																<c:choose>
																	<c:when test="${slaveCount ==0}">
																		<form:input path="patientSalesBillNarration"
																			id="txtNaration" class="form-control input-SmallText"
																			requird="true" type="text" placeholder="Naration"
																			name="txtNaration" />
																	</c:when>
																	<c:when test="${slaveCount !=0}">
																		<form:input path="" id="txtNaration"
																			class="form-control input-SmallText" requird="true"
																			type="text" placeholder="Naration"
																			value="${patientSalesBill.patientSalesBillNarration}"
																			name="txtNaration" />

																	</c:when>
																</c:choose>
																<!--  onblur="isAlphaWithDigitSpace('txtNaration',0,500)" -->
															</div>
														</div>
													</div>

													<%--  <div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> View Prescription </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="patientSalesBillPrescription"
																id="txtViewPrescription"
																class="form-control input-SmallText" requird="true"
																type="text" placeholder="View Prescription "
																name="txtViewPrescription" />
															<!--  onblur="isAlphaWithDigitSpace('txtViewPrescription',0,500)" -->
														</div>
													</div>  --%>

													<%-- <div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Billed By </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" id="txtBilledBy"
																class="form-control input-SmallText" maxlength='70'
																requird="true" type="text" placeholder="Billed By "
																name="txtBilledBy" />
														</div>
													</div> --%>

												</div>
												<div class="col-md-4-1 " style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b> Bill No </b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="patientSalesBillDocNo" id="txtBillNo"
																		class="form-control input-SmallText" requird="true"
																		type="text" placeholder="Bill No" readonly="true"
																		name="txtBillNo" />
																</c:when>

																<c:when test="${slaveCount !=0}">
																	<form:input path="patientSalesBillDocNo" id="txtBillNo"
																		class="form-control input-SmallText" requird="true"
																		type="text" placeholder="Bill No" readonly="true"
																		name="txtBillNo"
																		value="${patientSalesBill.patientSalesBillDocNo}" />

																</c:when>
															</c:choose>
														</div>
														<div class='col-md-1-1'
															style='margin-top: 0px; color: red;'>
															<b> *</b>
														</div>
														<div class="col-md-4-1 center" style="margin-top: -8px;">
															<p id="demo"></p>
														</div>


													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b> Date </b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="patientBillDate" id="txtDate"
																		class="form-control input-SmallText" type="text"
																		readonly="true" name="txtDate" placeholder="Date"
																		required="true" value="<%=todays_date%>"
																		onclick="displayCalendar(document.getElementById('txtDate'),'dd/mm/yyyy',this)" />
																</c:when>
																<c:when test="${slaveCount !=0}">

																	<form:input path="patientBillDate" id="txtDate"
																		class="form-control input-SmallText" name="txtDate"
																		requird="true" type="text" placeholder="Date"
																		value="${patientSalesBill.patientBillMode}"
																		onclick="displayCalendar(document.getElementById('txtDate'),'dd/mm/yyyy',this)" />

																</c:when>
															</c:choose>

														</div>
														<div class='col-md-1-1'
															style='margin-top: 0px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-9-1 center" style="margin-top: 9px;">
														<c:choose>
															<c:when test="${slaveCount ==0}">
																<form:radiobutton path="patientBillMode" id="radioCash"
																	value='0' name="radioCashCredit" checked="true"
																	onclick="hideDetails(),checkSponserDisc();" />
														Cash
														<form:radiobutton path="patientBillMode" id="radioCredit"
																	value='1' name="radioCashCredit"
																	onclick="hideDetails(),checkSponserDisc();" />
														Credit
														<form:radiobutton path="patientBillMode" id="radioCheque"
																	value='2' name="radioCheque"
																	onclick="showDetails(),checkSponserDisc();" />
														Cheque
													</c:when>
															<c:when test="${slaveCount !=0}">
																<c:if test="${patientSalesBill.patientSaleForTime ==0}">
																	<form:radiobutton path="patientBillMode" id="radioCash"
																		value='0' name="radioCashCredit" checked="true"
																		onclick="hideDetails(),checkSponserDisc();" />
														Cash
														<form:radiobutton path="patientBillMode" id="radioCredit"
																		value='1' name="radioCashCredit"
																		onclick="hideDetails(),checkSponserDisc();" />
														Credit
														<form:radiobutton path="patientBillMode" id="radioCheque"
																		value='2' name="radioCashCredit"
																		onclick="hideDetails(),checkSponserDisc();" />
														Cheque
														
													</c:if>
																<c:if test="${patientSalesBill.patientSaleForTime ==1}">
																	<form:radiobutton path="patientBillMode" id="radioCash"
																		value='0' name="radioCashCredit"
																		onclick="hideDetails(),checkSponserDisc();" />
														Cash
														<form:radiobutton path="patientBillMode" id="radioCredit"
																		value='1' name="radioCashCredit" checked="true"
																		onclick="hideDetails(),checkSponserDisc();" />
														Credit
														<form:radiobutton path="patientBillMode" id="radioCheque"
																		value='2' name="radioCashCredit"
																		onclick="hideDetails(),checkSponserDisc();" />
														Cheque
												  </c:if>
																<c:if test="${patientSalesBill.patientSaleForTime ==2}">
																	<form:radiobutton path="patientBillMode" id="radioCash"
																		value='0' name="radioCashCredit"
																		onclick="hideDetails(),checkSponserDisc();" />
														Cash
														<form:radiobutton path="patientBillMode" id="radioCredit"
																		value='1' name="radioCashCredit"
																		onclick="hideDetails(),checkSponserDisc();" />
														Credit
														<form:radiobutton path="patientBillMode" id="radioCheque"
																		value='2' name="radioCashCredit" checked="true"
																		onclick="hideDetails(),checkSponserDisc();" />
														Cheque
												  </c:if>
															</c:when>
														</c:choose>
													</div>


													<div class="col-md-12-1" style="margin-top: 9px;"
														id="DivBank">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-2-1" style="margin-top: 6px;">
																<b> Bank Name </b>
															</div>
															<div class="col-md-5-1" style="margin-top: 5px;">
																<c:choose>
																	<c:when test="${slaveCount ==0}">
																		<form:input path="patientSaleBankName"
																			id="txtBankName" class="form-control input-SmallText"
																			requird="true" type="text" placeholder="Bank Name"
																			name="txtBankName" />

																	</c:when>
																	<c:when test="${slaveCount !=0}">
																		<input id="txtBankName" name="txtBankName"
																			class="form-control input-SmallText" type="text"
																			value="${patientSalesBill.patientSaleBankName}"
																			placeholder="Bank Name" style="width: 97%;"
																			maxlength="100" required readonly />

																	</c:when>
																</c:choose>
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;"
														id="DivChequeNum">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-2-1" style="margin-top: 0px;">
																<b> Cheque No </b>
															</div>
															<div class="col-md-5-1" style="margin-top: 0px;">
																<c:choose>
																	<c:when test="${slaveCount ==0}">
																		<form:input path="patientSaleChequeNum"
																			id="txtChequeNumber"
																			class="form-control input-SmallText" requird="true"
																			type="text" placeholder="Cheque No"
																			name="txtChequeNumber" />
																	</c:when>
																	<c:when test="${slaveCount !=0}">
																		<input id="txtChequeNumber" name="txtChequeNumber"
																			class="form-control input-SmallText" type="text"
																			value="${patientSalesBill.patientSaleChequeNum}"
																			placeholder="Cheque No" style="width: 97%;"
																			maxlength="100" required readonly />
																	</c:when>
																</c:choose>
															</div>
														</div>
													</div>
													<%--  <div class="col-md-12-1" style="margin-top: 9px;" id="DivComment">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-3-1" style="margin-top: 8px;">
																<b> Comment </b>
															</div>
															<div class="col-md-7-1" style="margin-top: 6px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">     
																<form:input path="patientSaleComment" id="txtComment"
																	class="form-control input-SmallText" requird="true"
																	type="text" placeholder="Comment"
																	name="txtComment" />
																	</c:when>
																<c:when test="${slaveCount !=0}">
																	<input id="txtComment" name="txtComment"
																		class="form-control input-SmallText" type="text" value="${patientSalesBill.patientSaleComment}"
																		placeholder="Comment" style="width:97%;"
																		 maxlength="100"
																		required readonly/>
																</c:when>	
																</c:choose>	
															</div>
														</div>
													</div> --%>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div id="HSTDiv"
									style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<div class="col-md-12-1">
										<input type="button" value="-" class="btn btn-xs btn-success"
											style="margin: 7px; float: right" onclick="deleteRow();"
											alt="delete row">
									</div>
									<table id="ItemInfoTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md-0.5 center" style="height: 21.5px;"><div
														class='TextFont'>#</div></th>
												<th class='col-md-1 center' style='height: 21.5px;'><div
														class='TextFont'>Barcode</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Product</div></th>

												<th class="col-md-0.5 center" style="height: 21.5px;"><div
														class='TextFont'>Unit</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Pack</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Prep</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Comp.</div></th>
												<th class="col-md-0.5 center" style="height: 21.5px;"><div
														class='TextFont'>GST%</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Batch No</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Expiry</div></th>
												<!-- <th class="col-md-1-0.5" style="height: 21.5px;"><div
														class='TextFont'>Shelf No.</div></th> -->
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>M.R.P</div></th>
												<th class="col-md-1-0.5 center" style="height: 21.5px;"><div
														class='TextFont'>Dis%</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Stock</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Qty</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Rate</div></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><div
														class='TextFont'>Amount</div></th>

												<th class=' col-md center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>
											</tr>
										</thead>

										<tbody id="DRRDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<c:choose>
												<c:when test="${slaveCount ==0}">
													<input type='hidden' id='hiddenCurrentRow' value='1' />
													<tr id="remove1">
														<td><label style='' class='TextFont'>1</label></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNoDelete'
																path="" autocomplete="off" style='' id='textBarcode1'
																onkeydown="clearBarcode(1,event)" name='textBarcode1'
																onblur="fetchProductNameByBarcode(this.value,1)" /></td>

														<td><form:hidden id="patientSlaveId0"
																path="ltPatientSaleBill[0].patientSlaveId" /> <form:hidden
																id="hiddenProductId1"
																path="ltPatientSaleBill[0].productMaster.productId" />
															<form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].productMaster.productName"
																style='' id='txtProName1' name='txtProName1'
																maxlength='150' data-target="#Patient_PopUp_Form"
																onclick="load(1,1)" onkeypress="load(1,1)"
																autocomplete="off" /> <form:hidden
																id="textRateForPrint1"
																path="ltPatientSaleBill[0].patientSlaveRatePerUnit" />
															<form:hidden id="textcounterSlaveVatAmt1"
																path="ltPatientSaleBill[0].patientSlaveVatAmt" /> <form:hidden
																id="textDisAmt1" path="" /> <form:hidden
																id="textDisAmtPerQty1"
																path="ltPatientSaleBill[0].patientSaleSlaveDiscAmt" />
															<input type="hidden" id="hiddenCategoryId1" value="0" /></td>

														<form:hidden id="textIssueQty1"
															path="ltPatientSaleBill[0].patientSaleSlaveIssueQty" />

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].productMaster.productUnit"
																style='' id='txtUnit1' name='txtUnit1' maxlength='8'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].productMaster.packingMaster.packType"
																style='' id='txtPack1' name='txtPack1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].productMaster.preparationMaster.preparationName"
																style='' id='txtPre1' name='txtPre1' maxlength='6'
																readonly="true" /></td>


														<td style="display: none;"><form:input type='text'
																class='form-control input-SmallText' path="" style=''
																id='txtProductPrescription1'
																name='txtProductPrescription1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].productMaster.companyMaster.compName"
																style='' id='txtComp1' name='txtComp1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSlaveVat" style=''
																id='textVat1' name='textVat1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSlaveBatchCode"
																style='' id='textBatch1' name='txtBatch1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSaleBatchExpiry"
																style='' id='txtExpiry1' name='txtExpiry1' maxlength='6'
																readonly="true" /></td>

														<td style="display: none;"><form:input type='text'
																class='form-control input-SmallText' path="" style=''
																id='txtShelfNo1' name='txtShelfNo1' maxlength='6'
																readonly="true" /></td>

														<td style="display: none;"><form:input type='text'
																class='form-control input-SmallText' path="" style=''
																id='txtProductPrescription1'
																name='txtProductPrescription1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSlaveMrp" style=''
																id='txtMRP1' name='txtMRP1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSlaveDisc" style=''
																id='textDis1' name='textDis1' maxlength='6'
																readonly="true" /></td>


														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
																style='' id='textClStk1' name='textClStk1' maxlength='6'
																readonly="true" /></td>

														<%-- <td><form:input id="textClStk1" path="ltPatientSaleBill[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
															class="form-control input-SmallText # deleteGroup1 # textNo"
															type="text" readonly/></td> --%>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSlaveQty" style=''
																id='txtQty1' name='txtQty1'
																onblur="isNumber('txtQty1'),calculateAmt(1)"
																maxlength='6' /></td>


														<td style="display: none;"><form:input
																path="ltPatientSaleBill[0].productMaster.batchMaster[0].batchId"
																type="text" id="textBatchId1" name="textBatchId1"
																class='form-control input-SmallText' readonly="true" />
															<form:input
																path="ltPatientSaleBill[0].patientSlavePrescriptionId"
																type="text" id="txtPrescription1"
																name="txtPrescription1"
																class='form-control input-SmallText' readonly="true" />
															<form:input
																path="ltPatientSaleBill[0].productMaster.batchMaster[0].stockMaster.stockId"
																type="text" id="textStockId1" name="textStockId1"
																class='form-control input-SmallText' readonly="true" />
															<form:input
																path="ltPatientSaleBill[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
																type="text" id="textStockQtyInHand1"
																name="textStockQtyInHand1"
																class='form-control input-SmallText' readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSlaveRate" style=''
																id='textRate1' name='txtRate1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[0].patientSlaveAmt" style=''
																id='txtAmt1' name='txtAmt1' maxlength='6'
																readonly="true" /></td>

														<td><input type="checkbox"
															class='form-control input-SmallText # deleteGroup1 # textNo'
															name="deleteGroup" value="1" id="deleteGroup1"></td>

														<td style="display: none;"><input id="textTotalStk1"
															class="form-control input-SmallText" type="text" readonly>
															<input id="textPurchaseRate1"
															class="form-control input-SmallText" type="text" readonly>
															<input id="textRatePerUnit1"
															class="form-control input-SmallText" type="text" readonly />
															<input id="textDisAmt1"
															class="form-control input-SmallText" type="text" readonly />

															<input id="textPerRatePerUnitFlag1"
															class="form-control input-SmallText" type="text" readonly />
														</td>
													</tr>
												</c:when>

												<c:when test="${slaveCount !=0}">
													<c:forEach items="${patientSalesBill.ltPatientSaleBill}"
														var="row" varStatus="count">
														<tr id="remove${count.index+1}">
															<td><label class='input-SmallText'>${(count.index)+1}</label>
																<input type='hidden' id='hiddenCurrentRow'
																value='${count.index+1}' /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText' path="" style=''
																	id='textBarcode${count.index+1}'
																	name='textBarcode${count.index+1}' readonly="true"
																	onblur="isNumber('textBarcode${count.index+1}',0,7),fetchProductNameByBarcode(this.value)" /></td>

															<td style="display: none;"><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlavePrescriptionId"
																	style='' id='txtProductPrescription${count.index+1}'
																	name='txtProductPrescription${count.index+1}'
																	maxlength='6' readonly="true" /> <input type="hidden"
																id="hiddenCategoryId${count.index+1}" value="0" /></td>
															<td><form:hidden id="patientSlaveId${count.index+1}"
																	path="ltPatientSaleBill[${count.index}].patientSlaveId" />
																<form:hidden id="hiddenProductId${count.index+1}"
																	path="ltPatientSaleBill[${count.index}].productMaster.productId" />
																<form:input type='text'
																	class='form-control input-SmallText # deleteGroup1 # textNo'
																	path="ltPatientSaleBill[${count.index}].productMaster.productName"
																	style='' id='txtProName${count.index+1}'
																	readonly="true" name='txtProName${count.index+1}'
																	maxlength='150' data-target="#Patient_PopUp_Form"
																	onclick="load(${count.index+1},1)" autocomplete="off" />
																<form:hidden id="textRateForPrint${count.index+1}"
																	path="ltPatientSaleBill[${count.index}].patientSlaveRatePerUnit" />
																<form:hidden id="textcounterSlaveVatAmt${count.index+1}"
																	path="ltPatientSaleBill[${count.index}].patientSlaveVatAmt" />

																<form:hidden id="textDisAmt${count.index+1}"
																	path="ltPatientSaleBill[${count.index}].patientSaleSlaveDiscAmt" />

																<form:hidden id="textDisAmtPerQty${count.index+1}"
																	path="" /> <form:hidden
																	id="textPurchaseRate${count.index+1}"
																	path="ltPatientSaleBill[${count.index}].patientSlavePurchaseRate" />

																<form:hidden id="textRatePerUnit${count.index+1}"
																	path="ltPatientSaleBill[${count.index}].patientSlaveRatePerUnit" />

															</td>

															<form:hidden id="textIssueQty${count.index+1}"
																path="ltPatientSaleBill[${count.index}].patientSaleSlaveIssueQty" />

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].productMaster.productUnit"
																	style='' id='txtUnit${count.index+1}'
																	name='txtUnit${count.index+1}' maxlength='8'
																	readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].productMaster.packingMaster.packType"
																	style='' id='txtPack${count.index+1}'
																	name='txtPack${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].productMaster.preparationMaster.preparationName"
																	style='' id='txtPre${count.index+1}'
																	name='txtPre${count.index+1}' maxlength='6'
																	readonly="true" /></td>


															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].productMaster.companyMaster.compName"
																	style='' id='txtComp${count.index+1}'
																	name='txtComp${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveVat"
																	style='' id='textVat${count.index+1}'
																	name='textVat${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveBatchCode"
																	style='' id='textBatch${count.index+1}'
																	name='txtBatch${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSaleBatchExpiry"
																	style='' id='txtExpiry${count.index+1}'
																	name='txtExpiry${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td style="display: none;"><form:input type='text'
																	class='form-control input-SmallText' path="" style=''
																	id='txtShelfNo${count.index}'
																	name='txtShelfNo${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveMrp"
																	style='' id='txtMRP${count.index+1}'
																	name='txtMRP${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveDisc"
																	style='' id='textDis${count.index+1}'
																	name='textDis${count.index+1}' maxlength='6'
																	readonly="true" /></td>


															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
																	style='' id='textClStk${count.index+1}'
																	name='textClStk${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<%-- 	<td><form:input id="textClStk${count.index+1}"
																class="form-control input-SmallText" type="text" path="ltPatientSaleBill[${count.index}].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
																readonly/></td>  --%>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveQty"
																	id='txtQty${count.index+1}'
																	name='txtQty${count.index+1}' maxlength='6'
																	readonly="true" onblur="calculateAmt(${count.index+1})" /></td>
															<%-- 
																		<td style="display: none;"><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveEditQty"
																	 id='txtEditQty${count.index+1}'
																	name='txtEditQty${count.index+1}' maxlength='6'
																	readonly="true" onblur="calculateAmt(${count.index+1})" /></td>
 --%>

															<td style="display: none;"><form:input
																	path="ltPatientSaleBill[${count.index}].productMaster.batchMaster[0].batchId"
																	type="text" id="textBatchId${count.index+1}"
																	name="textBatchId${count.index+1}"
																	class='form-control input-SmallText' readonly="true" />
																<form:input
																	path="ltPatientSaleBill[${count.index}].productMaster.batchMaster[0].stockMaster.stockId"
																	type="text" id="textStockId${count.index+1}"
																	name="textStockId${count.index+1}"
																	class='form-control input-SmallText' readonly="true" />
																<form:input path="" type="text"
																	id="textStockQtyInHand${count.index+1}"
																	name="textStockQtyInHand${count.index+1}"
																	class='form-control input-SmallText' readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveRate"
																	style='' id='textRate${count.index+1}' name='txtRate1'
																	maxlength='6' readonly="true" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${count.index}].patientSlaveAmt"
																	style='' id='txtAmt${count.index+1}' name='txtAmt1'
																	maxlength='6' readonly="true" /></td>

															<td><input type="checkbox" name="deleteGroup"
																value="${count.index+1}"
																id="deleteGroup${count.index+1}" disabled="disabled"></td>

															<td style="display: none;"><input
																id="textTotalStk${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly> <input id="textDisAmt${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /><input
																id="textPerRatePerUnitFlag${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /></td>

														</tr>
													</c:forEach>
													<tr id="remove${slaveCount+1}">
														<td><label class='input-SmallText'>${slaveCount+1}</label>
															<input type='hidden' id='hiddenCurrentRow'
															value='${slaveCount+1}' /></td>

														<td><form:input type='text'
																class='form-control input-SmallText' path="" style=''
																id='textBarcode${slaveCount+1}'
																name='textBarcode${slaveCount+1}'
																onblur="isNumber('textBarcode${slaveCount+1}',0,7),fetchProductNameByBarcode(this.value)" /></td>

														<td style="display: none;"><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlavePrescriptionId"
																style='' id='txtProductPrescription${slaveCount+1}'
																name='txtProductPrescription${slaveCount+1}'
																maxlength='6' readonly="true" /></td>


														<td><form:hidden id="patientSlaveId${slaveCount+1}"
																path="ltPatientSaleBill[${slaveCount}].patientSlaveId" />
															<form:hidden id="hiddenProductId${slaveCount+1}"
																path="ltPatientSaleBill[${slaveCount}].productMaster.productId" />
															<form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltPatientSaleBill[${slaveCount+1}].productMaster.productName"
																style='' id='txtProName${slaveCount+1}'
																name='txtProName${slaveCount+1}' maxlength='150'
																data-target="#Patient_PopUp_Form"
																onclick="load(${slaveCount+1})" autocomplete="off" /> <form:hidden
																id="textRateForPrint${slaveCount+1}"
																path="ltPatientSaleBill[${slaveCount}].patientSlaveRatePerUnit" />
															<form:hidden id="textcounterSlaveVatAmt${slaveCount+1}"
																path="ltPatientSaleBill[${slaveCount}].patientSlaveVatAmt" />

															<form:hidden id="textDisAmt${slaveCount+1}"
																path="ltPatientSaleBill[${slaveCount}].patientSaleSlaveDiscAmt" />

															<form:hidden id="textDisAmtPerQty${slaveCount+1}"
																path="ltPatientSaleBill[${slaveCount}].patientSaleSlaveDiscAmt" />

															<form:hidden id="textPurchaseRate${slaveCount+1}"
																path="ltPatientSaleBill[${slaveCount}].patientSlavePurchaseRate" />

														</td>

														<%-- 	<td style="display: none;"><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltPatientSaleBill[${slaveCount}].patientSlaveEditQty"
																	 id='txtEditQty${slaveCount+1}'
																	name='txtEditQty${slaveCount+1}' maxlength='6'
																	readonly="true" onblur="calculateAmt(${slaveCount+1})" /></td> --%>

														<form:hidden id="textIssueQty${slaveCount+1}"
															path="ltPatientSaleBill[${slaveCount}].patientSaleSlaveIssueQty" />

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].productMaster.productUnit"
																style='' id='txtUnit${slaveCount+1}'
																name='txtUnit${slaveCount+1}' maxlength='8'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].productMaster.packingMaster.packType"
																style='' id='txtPack${slaveCount+1}'
																name='txtPack${slaveCount+1}' maxlength='6'
																readonly="true" /></td>


														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].productMaster.preparationMaster.preparationName"
																style='' id='txtPre${slaveCount+1}'
																name='txtPre${slaveCount+1}' maxlength='6'
																readonly="true" /></td>


														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].productMaster.companyMaster.compName"
																style='' id='txtComp${slaveCount+1}'
																name='txtComp${slaveCount+1}' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlaveVat"
																style='' id='textVat${slaveCount+1}'
																name='textVat${slaveCount+1}' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlaveBatchCode"
																style='' id='textBatch${slaveCount+1}'
																name='txtBatch${slaveCount+1}' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSaleBatchExpiry"
																style='' id='txtExpiry${slaveCount+1}'
																name='txtExpiry${slaveCount+1}' maxlength='6'
																readonly="true" /></td>

														<td style="display: none;"><form:input type='text'
																class='form-control input-SmallText' path="" style=''
																id='txtShelfNo${slaveCount+1}'
																name='txtShelfNo${slaveCount+1}' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlaveMrp"
																style='' id='txtMRP${slaveCount+1}'
																name='txtMRP${slaveCount+1}' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlaveDisc"
																style='' id='textDis${slaveCount+1}'
																name='textDis${slaveCount+1}' maxlength='6' /></td>


														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].productMaster.batchMaster[${slaveCount}].stockMaster.stockQtyInHand"
																style='' id='textClStk${slaveCount+1}'
																name='textClStk${slaveCount+1}' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlaveQty"
																id='txtQty${slaveCount+1}' name='txtQty${slaveCount+1}'
																maxlength='6' onblur="calculateAmt(${slaveCount+1})" /></td>


														<td style="display: none;"><form:input
																path="ltPatientSaleBill[${slaveCount}].productMaster.batchMaster[${slaveCount}].batchId"
																type="text" id="textBatchId${slaveCount+1}"
																name="textBatchId${slaveCount+1}"
																class='form-control input-SmallText' readonly="true" />
															<form:input
																path="ltPatientSaleBill[${slaveCount}].productMaster.batchMaster[${slaveCount}].stockMaster.stockId"
																type="text" id="textStockId${slaveCount+1}"
																name="textStockId${slaveCount+1}"
																class='form-control input-SmallText' readonly="true" />
															<form:input path="" type="text"
																id="textStockQtyInHand${slaveCount+1}"
																name="textStockQtyInHand${slaveCount+1}"
																class='form-control input-SmallText' readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlaveRate"
																style='' id='textRate${slaveCount+1}' name='txtRate1'
																maxlength='6' readonly="true" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText'
																path="ltPatientSaleBill[${slaveCount}].patientSlaveAmt"
																style='' id='txtAmt${slaveCount+1}' name='txtAmt1'
																maxlength='6' readonly="true" /></td>

														<td><input type="checkbox" name="deleteGroup"
															value="${slaveCount+1}" id="deleteGroup${slaveCount+1}"></td>

														<td style="display: none;"><input
															id="textTotalStk${slaveCount+1}"
															class="form-control input-SmallText" type="text" readonly>
															<input id="textRatePerUnit${slaveCount+1}"
															class="form-control input-SmallText" type="text" readonly />
															<input id="textDisAmt${slaveCount+1}"
															class="form-control input-SmallText" type="text" readonly /><input
															id="textPerRatePerUnitFlag${slaveCount+1}"
															class="form-control input-SmallText" type="text" readonly /></td>
													</tr>
												</c:when>
											</c:choose>
										</tbody>
									</table>
								</div>

								<%@include file="pharma_sale_purchase_order.jsp"%>

								<div class="col-md-12-1 panel panel-default"
									style="margin-top: 9px; height: 153Px;">
									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; border-radius: 19%; border-color: powderblue">
										<%-- <div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-3-1"
												style="margin-top: 0px; padding-left: 0px;">
												<b>C.N.</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="patientSalesBillCN" id="txtCN"
													class="form-control input-SmallText" requird="true"
													type="text" placeholder="C.N." name="txtCN" readonly="true"
													onblur="isFloatingPoint('txtCN');" />

											</div>
										</div> --%>

										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-3-1" style="margin-top: 0px;">
												<b>C.D.%</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillCD" id="txtCD"
															class="form-control input-SmallText" requird="true"
															type="text" placeholder="C.D.%" name="txtCD"
															onblur="isFloatingPoint('txtCD'),calculatecdAmt();" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<form:input path="" id="txtCD"
															class="form-control input-SmallText" requird="true"
															type="text" placeholder="C.D.%" name="txtCD"
															onblur="calculatecdAmt();"
															value="${patientSalesBill.patientSalesBillCN}" />
													</c:when>
												</c:choose>

											</div>
										</div>
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">

											<div class="col-md-12-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:radiobutton path="" id="radioCD" value='0'
															name="radioDisc" checked="true"
															onclick="setFocusForDiscount();" />
														Apply CD
														<form:radiobutton path="" id="radioSpeDisc" value='1'
															name="radioDisc" onclick="setFocusForDiscount();" />
														Apply sp. Disc
														
														</c:when>
												</c:choose>

											</div>
										</div>
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">

											<div class="col-md-12-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:radiobutton path="" id="radioCD" value='0'
															name="radioDisc" checked="true"
															onclick="setFocusForDiscount();" />
														Apply CD
														<form:radiobutton path="" id="radioSpeDisc" value='1'
															name="radioDisc" onclick="setFocusForDiscount();" />
														Apply sp. Disc
														
														</c:when>
												</c:choose>

											</div>
										</div>

									</div>

									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%; border-radius: 6%; border-color: powderblue">
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Special Disc</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillSpecialDisc"
															id="txtSpecialDisc" class="form-control input-SmallText"
															requird="true" type="text" value='0' readonly="true"
															placeholder="Special Disc" name="txtSpecialDisc"
															onchange="isFloatingPoint('txtSpecialDisc'),calculateDiscount();" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<form:input path="" id="txtSpecialDisc"
															class="form-control input-SmallText" requird="true"
															type="text" placeholder="Special Disc"
															name="txtSpecialDisc" readonly="true"
															value="${patientSalesBill.patientSalesBillSpecialDisc}"
															onchange="calculateDiscount();" />
													</c:when>
												</c:choose>
											</div>
										</div>
										<%-- <div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>C.N.Amt</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="patientSalesBillCnAmt" id="txtCNAmt"
													class="form-control input-SmallText" requird="true"
													type="text" placeholder="C.N.Amt" name="txtCNAmt" readonly="true"
													onblur="isFloatingPoint('txtCNAmt');" />
											</div>
										</div> --%>

										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>C.D.Amt</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillCdAmt" id="txtCDAmt"
															class="form-control input-SmallText" requird="true"
															type="text" placeholder="C.D.Amt" name="txtCDAmt"
															readonly="true" onblur="isFloatingPoint('txtCDAmt');" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<form:input path="" id="txtCDAmt"
															class="form-control input-SmallText" requird="true"
															type="text" readonly="true" placeholder="C.D.Amt"
															name="txtCDAmt"
															value="${patientSalesBill.patientSalesBillCdAmt}" />
													</c:when>
												</c:choose>

											</div>
										</div>
									</div>

									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%; border-radius: 19%; border-color: powderblue">
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-5-1"
												style="margin-top: 0px; padding-left: 3px;">
												<b>SurCharge</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillSurcharge"
															id="txtSurCharge" class="form-control input-SmallText"
															requird="true" type="text" placeholder="SurCharge"
															name="txtSurCharge" 
															readonly="true"
															onblur="isFloatingPoint('txtSurCharge'),calculateSurcharge();" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<form:input path="" id="txtSurCharge"
															class="form-control input-SmallText" requird="true"
															type="text" placeholder="SurCharge" name="txtSurCharge"
															onblur="isFloatingPoint('txtSurCharge'),calculateSurcharge();"
															readonly="true"
															value="${patientSalesBill.patientSalesBillSurcharge}" />
													</c:when>
												</c:choose>
											</div>
										</div>
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-5-1"
												style="margin-top: 0px; padding-left: 3px;">
												<b>Total P.Rate</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="" id="txtTotalPurchase"
															class="form-control input-SmallText" requird="true"
															type="text" placeholder="Total Purchase"
															name="txtTotalPurchase" readonly="true" onblur="" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<form:input path="" id="txtTotalPurchase"
															class="form-control input-SmallText" requird="true"
															type="text" placeholder="Total Purchase"
															name="txtTotalPurchase" readonly="true"
															value="${patientSalesBill.patientSalesBillCnAmt}"
															onblur="" />
													</c:when>
												</c:choose>
											</div>
										</div>
									</div>
									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%; border-radius: 19%; height: 134Px; border-color: powderblue">
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1"
												style="margin-top: 5px; padding-left: 3px;">
												<b>Amount Received </b>
											</div>
											<div class="col-md-7-1" style="margin-top: 9px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillAmountReceived"
															type="text" id="txtAmtReceived"
															class="form-control input-SmallText"
															name="txtAmtReceived" placeholder="Amount Received"
															onblur="isFloatingPoint('txtAmtReceived');calculatePending()" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<form:input path="patientSalesBillAmountReceived"
															type="text" id="txtAmtReceived"
															class="form-control input-SmallText"
															onblur="isFloatingPoint('txtAmtReceived');calculatePending()"
															name="txtAmtReceived" placeholder="Amount Received"
															value="${patientSalesBill.patientSalesBillAmountReceived}" />
													</c:when>
												</c:choose>

											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1"
												style="margin-top: 5px; padding-left: 3px;">
												<b>Amount Balance </b>
											</div>
											<div class="col-md-7-1" style="margin-top: 9px;">
												<form:input path="patientSalesBillAmountBalance"
													id="txtAmtBalance" class="form-control input-SmallText"
													requird="true" type="text" placeholder="Amount Balance"
													name="txtAmtBalance" readonly="true" />

												<form:hidden path="patientSalePreviousBalance"
													id='patientSalePreviousBalance' />
											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-top: 1%; margin-left: 0%; background: yellow">
												<label class="TextFont"><b>Previous Balance</b></label>
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<span id='mainPendingBalance'></span>
													</c:when>
													<c:when test="${slaveCount !=0}">
														<span id='mainPendingBalance'></span>
													</c:when>
												</c:choose>
											</div>

											<div class="form-group  col-md-12-1" id="showPatientDetail"
												style="margin-right: 2%; margin-top: -5%; margin-left: 0%; background: lightblue;">
												<div class="TextFont" style="float: left; color: red;"
													id="patientBal">
													<label for="product" class="TextFont"><span
														id="js-rotating"></span></label>
												</div>
											</div>
										</div>
										<!-- 	<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-12-1 panel panel-default"
												style="margin-top: 9px;"></div>
										</div> -->
									</div>
									<div class="col-md-3-1 center"
										style="margin-top: 9px; margin-left: 6%;">
										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Gross Amount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillGrossAmt" id="txtGross"
															class="form-control input-SmallText" value='0'
															requird="true" type="text" placeholder="Gross Amount"
															name="txtGross" onclick="calculateNetAmountPatient();"
															readonly="true" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<input name="txtGross" type="text" id="txtGross"
															autocomplete="off" readonly
															class="typeahead form-control input-SmallText "
															onclick="calculateNetAmountPatient();"
															value="${patientSalesBill.patientSalesBillGrossAmt}" />
													</c:when>
												</c:choose>
											</div>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Less</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillLess" id="txtLess"
															class="form-control input-SmallText" value='0'
															requird="true" type="text" placeholder="Less"
															name="txtLess" readonly="true" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<input name="txtLess" type="text" id="txtLess"
															autocomplete="off" readonly
															class="typeahead form-control input-SmallText "
															value="${patientSalesBill.patientSalesBillLess}" />
													</c:when>
												</c:choose>

											</div>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Add</b>
											</div>

											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillAdd" id="txtAdd"
															value='0' class="form-control input-SmallText"
															requird="true" type="text" placeholder="Add"
															name="txtAdd" readonly="true" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<input name="txtAdd" type="text" id="txtAdd"
															autocomplete="off" readonly
															class="typeahead form-control input-SmallText "
															value="${patientSalesBill.patientSalesBillAdd}" />
													</c:when>
												</c:choose>


											</div>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Round</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount ==0}">
														<form:input path="patientSalesBillRound" id="txtRound"
															value='0' class="form-control input-SmallText"
															requird="true" type="text" placeholder="Round"
															name="txtRound"
															onblur="isFloatingPoint('txtRound'),setRoundNetAmount()" />
													</c:when>
													<c:when test="${slaveCount !=0}">
														<input name="txtRound" type="text" id="txtRound"
															autocomplete="off" onclick="calculateNetAmountPatient();"
															class="typeahead form-control input-SmallText "
															onblur="isFloatingPoint('txtRound'),setRoundNetAmount()"
															value="${patientSalesBill.patientSaleStatus}" />
													</c:when>
												</c:choose>

											</div>
										</div>
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Net Amount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="patientSalesBillNetAmt" id="txtNetAmt"
													class="form-control input-SmallText" requird="true"
													type="text" placeholder="Net Amount" name="txtNetAmt"
													readonly="true" />

												<div id="ItemManage"
													style="width: 98%; margin: 4% 0% 0% 1%;"></div>
											</div>

										</div>


									</div>
								</div>
								<!-- <div class="col-md-12-1"
									style="margin-top: 9px; ">
								<div class="col-md-6-1" style="margin-top: 9px;margin-bottom: 30px;width:85%; background: sandybrown;">
									<marquee >Expiring Batches</marquee>
									</div>
									<div class="col-md-4-1" style="margin-top: 9px;margin-left:64%;">
								<div class="li pull-right"  style="margin-top:-60px;"><a
													class="btn btn-warning"
													onclick="viewAllExpiryProduct()">View All Expiry Product</a></div>		
									</div>
									
								</div> -->


								<div id="batchScroll" class="col-md-12-1"
									style="margin-top: -10px;">
									<!-- <div class="col-md-6-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 9px;">
											<b></b>
										</div>
										<div class="col-md-3-1"
											style="margin-top: 9px; margin-left: 8%;">
											<marquee id='expiryBatches'>Expiring Batches</marquee>
										</div>
									</div> -->
									<div class="col-md-6-1" id="marquee"
										style="margin-top: 9px; margin-bottom: 30px; width: 85%; background: sandybrown;">
										<!-- <marquee id='expiryBatchesDetails' >Expiring Batches</marquee> -->
									</div>
									<div class="col-md-4-1"
										style="margin-top: 9px; margin-left: 64%;">
										<div class="li pull-right" style="margin-top: -60px;">
											<a class="btn btn-warning" onclick="viewAllExpiryProduct()">View
												All Expiry Product</a>
										</div>
									</div>

								</div>

							</form:form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="cameraModal" class="popup modal fade in">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							onclick="hideCameraPopUp();">&times;</button>
						<h4 class="modal-title">Camera</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-6">
								<!--  <h4 class="modal-title"></h4> -->
								<div id="txtProductData"></div>
								<div id="my_camera"></div>
							</div>
							<div class="col-md-6">
								<div id="results"></div>
							</div>
						</div>
						<div class="row" style="margin-top: 20px;">
							<div class="col-md-2 col-md-offset-3">
								<!-- A button for taking snaps -->
								<button onclick="take_snapshot()" class="btn btn-xs btn-warning">Take
									Snapshot</button>
							</div>
						</div>
						<!-- Configure a few settings and attach camera -->

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" data-dismiss="modal"
							onclick="savePatientSaleWithImage();">Save</button>
						<%-- <button class="btn btn-xs btn-warning"
							onclick="document.getElementById('changeProfilePicture').click();">Browse</button>
						<form style="display: none;">
							<input id="changeProfilePicture" type="file" name="file" /> 
						</form>--%>
						<button type="button" class="btn btn-default" data-dismiss="modal"
							onclick="hideCameraPopUp();">Close</button>
					</div>
				</div>

			</div>
		</div>

		<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
		<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
		<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>
		<c:choose>
			<c:when test="${slaveCount ==0}">
				<input type="hidden" value="1" id="RowCount">
			</c:when>
			<c:when test="${slaveCount !=0}">
				<input type="hidden" value="${slaveCount+1}" id="RowCount">
			</c:when>
		</c:choose>

		<input type="hidden" id="pharmaFetchStockOptionForPatientSale"
			value="<%=(String) session
					.getAttribute("fetchStockOptionForPatientSale")%>">



		<%@include file="Pharma_Footer.jsp"%>
		<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
		<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>
		<!--<input type='hidden' value='0' id='addRowCount' />  
		<input type='hidden' value='1' id='RowCount' /> -->
	</section>
</body>
</html>