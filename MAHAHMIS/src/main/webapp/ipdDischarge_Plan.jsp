<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>IPD Discharge Plan</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

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

<!--calendar Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
 <script type="text/javascript" src="js/IPD_Discharge.js"></script> 
<!-- /for Developers  -->

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("ipdDischarge_Process"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>


<script type="text/javascript">
	onload = function() {
		var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
			/* $(".hideCustomClass").each(function(){
				  $(this).hide();
				}) */
		}
		
		$("#displan").addClass("anchorActive");
		// fetchDischargeCode();
		fetchDischargePlan();
		setCommonPatInfo("Discharge_Plan");
		

		$('#dateSet').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});

		$('#transOwnArrvTime').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});

		$('#TDLTime').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});

		setTimeout(function() {
			var callFor = ($("#callFor").val()).trim();
			if (callFor === "previousTreatmentIPD") {
				$("#ipdDischargePlanJSPHeadDiv *").prop("disabled", true);
				$("#saveIPDDischargePlanButton").prop("disabled", true);
			}
		}, 1000);
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
     		$('#saveIPDDischargePlanButton').removeAttr("class");
    		$("#main-content *").prop('disabled',true);

	}
		
	};
</script>

<script type="text/javascript">
	/*  function fetchDischargeCode() {
		var inputs = [];
		//inputs.push('action=fetchDischargeCode');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "./ehat/ipdhistory/fetchDischargeCode",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error fetching Discharge codes');
					},
					success : function(r) {
						var ajaxResponse = r;
						//var pobj1 = eval('(' + ajaxResponse + ')');
						var pobj1 =  r;

						var dischargeCodeSelectHTML = "<option value=''>-select-</option>";

						for ( var i = 0; i < pobj1.ipddischargePlanDTOList.length; i++) {
							dischargeCodeSelectHTML += ("<option value='"
									+ (pobj1.ipddischargePlanDTOList[i].ipddischargePlanID)
									+ "'>"
									+ (pobj1.ipddischargePlanDTOList[i].dischargeCodeID) + "</option>");
						}

						$("#dischargeCode").html(dischargeCodeSelectHTML);

					}
				});
	};
 */ 
	function fetchIPDDischargePlan() {
		var treatmentId = $("#tid").val();
		//alert(treatmentId);

		var inputs = [];
		//inputs.push('action=fetchIPDDischargePlan');
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "./ehat/ipdhistory/fetchIPDDischargePlan",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error fetching DischargePlan');
					},
					success : function(r) {
						var ajaxResponse = r;
						//var pobj1 = eval('(' + ajaxResponse + ')');
						var pobj1 = r;

						if (pobj1.ipddischargePlanDTOList.length > 0) {
							$("#queryType").val('update');

							$("#dateAdmission")
									.val(
											pobj1.ipddischargePlanDTOList[0].dateAdmission);
							$("#dateExpectedDischarge")
									.val(
											pobj1.ipddischargePlanDTOList[0].dateExpectedDischarge);
							$("#dateSet").val(
									pobj1.ipddischargePlanDTOList[0].dateSet);

							$("#isInformed")
									.val(
											pobj1.ipddischargePlanDTOList[0].isInformed);

							$("#transportArranged")
									.val(
											pobj1.ipddischargePlanDTOList[0].transportArranged);

							(pobj1.ipddischargePlanDTOList[0].isInformed == "Y") ? ($('#isInformed')
									.attr('checked', true))
									: ($('#isInformed').attr('checked', false));

							/* 					(pobj1.IPDDischargePlanDTOList[0].isInformedByPatient == "Y") 
							 ? ($('#isInformedByPatient').attr('checked', true)) 
							 : ($('#isInformedByPatient').attr('checked', false));
							
							 (pobj1.IPDDischargePlanDTOList[0].isInformedByStaff == "Y") 
							 ? ($('#isInformedByStaff').attr('checked', true)) 
							 : ($('#isInformedByStaff').attr('checked', false)); */

							(pobj1.ipddischargePlanDTOList[0].isTransportOwn == "Y") ? ($('#isTransportOwn')
									.attr('checked', true))
									: ($('#isTransportOwn').attr('checked',
											false));

							(pobj1.ipddischargePlanDTOList[0].isTransportOwnBooked == "Y") ? ($('#isTransportOwnBooked')
									.attr('checked', true))
									: ($('#isTransportOwnBooked').attr(
											'checked', false));

							$("#transOwnArrvTime")
									.val(
											pobj1.ipddischargePlanDTOList[0].transOwnArrvTime);

							/* (pobj1.IPDDischargePlanDTOList[0].isTransportAmb == "Y") 
							? ($('#isTransportAmb').attr('checked', true)) 
								: ($('#isTransportAmb').attr('checked', false));
							
							(pobj1.IPDDischargePlanDTOList[0].isTransportAmbBooked == "Y") 
							? ($('#isTransportAmbBooked').attr('checked', true)) 
								: ($('#isTransportAmbBooked').attr('checked', false));
							
							$("#transAmbArrvTime").val(pobj1.IPDDischargePlanDTOList[0].transAmbArrvTime); */

							(pobj1.ipddischargePlanDTOList[0].isOwnMedic == "Y") ? ($('#isOwnMedic')
									.attr('checked', true))
									: ($('#isOwnMedic').attr('checked', false));

							(pobj1.ipddischargePlanDTOList[0].isNewMedic == "Y") ? ($('#isNewMedic')
									.attr('checked', true))
									: ($('#isNewMedic').attr('checked', false));

							(pobj1.ipddischargePlanDTOList[0].isTransferLetter == "Y") ? ($('#isTransferLetter')
									.attr('checked', true))
									: ($('#isTransferLetter').attr('checked',
											false));

							(pobj1.ipddischargePlanDTOList[0].isSocialService == "Y") ? ($('#isSocialService')
									.attr('checked', true))
									: ($('#isSocialService').attr('checked',
											false));

							$("#socialServiceRefDate")
									.val(
											pobj1.ipddischargePlanDTOList[0].socialServiceRefDate);
							$("#socialServiceAssesDate")
									.val(
											pobj1.ipddischargePlanDTOList[0].socialServiceAssesDate);

							(pobj1.ipddischargePlanDTOList[0].isOT == "Y") ? ($('#isOT')
									.attr('checked', true))
									: ($('#isOT').attr('checked', false));

							$("#OTRefDate").val(
									pobj1.ipddischargePlanDTOList[0].oTRefDate);
							$("#OTAssesDate")
									.val(
											pobj1.ipddischargePlanDTOList[0].oTAssesDate);

							(pobj1.ipddischargePlanDTOList[0].isPhysio == "Y") ? ($('#isPhysio')
									.attr('checked', true))
									: ($('#isPhysio').attr('checked', false));

							$("#physioRefDate")
									.val(
											pobj1.ipddischargePlanDTOList[0].physioRefDate);
							$("#physioAssesDate")
									.val(
											pobj1.ipddischargePlanDTOList[0].physioAssesDate);

							(pobj1.ipddischargePlanDTOList[0].isOther == "Y") ? ($('#isOther')
									.attr('checked', true))
									: ($('#isOther').attr('checked', false));

							$("#otherRefDate")
									.val(
											pobj1.ipddischargePlanDTOList[0].otherRefDate);
							$("#otherAssesDate")
									.val(
											pobj1.ipddischargePlanDTOList[0].otherAssesDate);
							$("#dateActualDischarge")
									.val(
											pobj1.ipddischargePlanDTOList[0].dateActualDischarge);

							$("#dischargeCode")
									.val(
											pobj1.ipddischargePlanDTOList[0].dischargeCodeID);

							(pobj1.ipddischargePlanDTOList[0].isTDL == "Y") ? ($('#isTDL')
									.attr('checked', true))
									: ($('#isTDL').attr('checked', false));

							$("#TDLTime").val(
									pobj1.ipddischargePlanDTOList[0].tDLTime);
							$("#diagCapacity")
									.val(
											pobj1.ipddischargePlanDTOList[0].diagCapacity);
							$("#waitTestRes")
									.val(
											pobj1.ipddischargePlanDTOList[0].waitTestRes);
							$("#waitMedRevDisc")
									.val(
											pobj1.ipddischargePlanDTOList[0].waitMedRevDisc);
							$("#MedConsulDelay")
									.val(
											pobj1.ipddischargePlanDTOList[0].medConsulDelay);
							$("#AlliedHelDelay")
									.val(
											pobj1.ipddischargePlanDTOList[0].alliedHelDelay);
							$("#RefCommProvLate")
									.val(
											pobj1.ipddischargePlanDTOList[0].refCommProvLate);
							$("#PatWaitConsEquip")
									.val(
											pobj1.ipddischargePlanDTOList[0].patWaitConsEquip);
							$("#Medication")
									.val(
											pobj1.ipddischargePlanDTOList[0].medication);
							$("#Transport").val(
									pobj1.ipddischargePlanDTOList[0].transport);
							$("#OtherHeltFacl")
									.val(
											pobj1.ipddischargePlanDTOList[0].otherHeltFacl);
							$("#Pallative").val(
									pobj1.ipddischargePlanDTOList[0].pallative);
							$("#Rehabilitation")
									.val(
											pobj1.ipddischargePlanDTOList[0].rehabilitation);
							$("#CareNurseHome")
									.val(
											pobj1.ipddischargePlanDTOList[0].careNurseHome);

						} else {

							$("#queryType").val('insert');
						}
					}
				});
	};

	/* function saveIPDDischargePlan() {

		var inputs = [];
		//inputs.push('action=saveIPDDischargePlan');
		inputs.push('tid=' + $("#tid").val());
		inputs.push('queryType=' + $("#queryType").val());

		inputs.push('dateAdmission=' + $("#dateAdmission").val());
		inputs.push('dateExpectedDischarge='
				+ $("#dateExpectedDischarge").val());
		inputs.push('dateSet=' + $("#dateSet").val());
		inputs.push('isInformed=' + $("#isInformed").val());

		/* inputs.push('isInformedByPatient='
				+ ($('#isInformedByPatient:checked').val() ? "Y" : "N"));
		inputs.push('isInformedByStaff='
				+ ($('#isInformedByStaff:checked').val() ? "Y" : "N")); */

	/* 	inputs.push('transportArranged=' + $("#transportArranged").val());
		inputs.push('isTransportOwn='
				+ ($('#isTransportOwn:checked').val() ? "Y" : "N"));
		inputs.push('isTransportOwnBooked='
				+ ($('#isTransportOwnBooked:checked').val() ? "Y" : "N"));
		inputs.push('transOwnArrvTime=' + $("#transOwnArrvTime").val());

		/* inputs.push('isTransportAmb='
				+ ($('#isTransportAmb:checked').val() ? "Y" : "N"));
		inputs.push('isTransportAmbBooked='
				+ ($('#isTransportAmbBooked:checked').val() ? "Y" : "N"));
		inputs.push('transAmbArrvTime=' + $("#transAmbArrvTime").val()); */

		/* inputs.push('isOwnMedic='
				+ ($('#isOwnMedic:checked').val() ? "Y" : "N"));
		inputs.push('isNewMedic='
				+ ($('#isNewMedic:checked').val() ? "Y" : "N"));
		inputs.push('isTransferLetter='
				+ ($('#isTransferLetter:checked').val() ? "Y" : "N"));
		inputs.push('isSocialService='
				+ ($('#isSocialService:checked').val() ? "Y" : "N"));
		inputs.push('socialServiceRefDate=' + $("#socialServiceRefDate").val());
		inputs.push('socialServiceAssesDate='
				+ $("#socialServiceAssesDate").val());
		inputs.push('isOT=' + ($('#isOT:checked').val() ? "Y" : "N"));
		inputs.push('OTRefDate=' + $("#OTRefDate").val());
		inputs.push('OTAssesDate=' + $("#OTAssesDate").val());
		inputs.push('isPhysio=' + ($('#isPhysio:checked').val() ? "Y" : "N"));
		inputs.push('physioRefDate=' + $("#physioRefDate").val());
		inputs.push('physioAssesDate=' + $("#physioAssesDate").val());
		inputs.push('isOther=' + ($('#isOther:checked').val() ? "Y" : "N"));
		inputs.push('otherRefDate=' + $("#otherRefDate").val());
		inputs.push('otherAssesDate=' + $("#otherAssesDate").val());
		inputs.push('dateActualDischarge=' + $("#dateActualDischarge").val());
		inputs.push('dischargeCode=' + $("#dischargeCode").val());
		inputs.push('isTDL=' + ($('#isTDL:checked').val() ? "Y" : "N"));
		inputs.push('TDLTime=' + $('#TDLTime').val());
		inputs.push('diagCapacity=' + $("#diagCapacity").val());
		inputs.push('waitTestRes=' + $("#waitTestRes").val());
		inputs.push('waitMedRevDisc=' + $("#waitMedRevDisc").val());
		inputs.push('MedConsulDelay=' + $("#MedConsulDelay").val());
		inputs.push('AlliedHelDelay=' + $("#AlliedHelDelay").val());
		inputs.push('RefCommProvLate=' + $("#RefCommProvLate").val());
		inputs.push('PatWaitConsEquip=' + $("#PatWaitConsEquip").val());
		inputs.push('Medication=' + $("#Medication").val());
		inputs.push('Transport=' + $("#Transport").val());
		inputs.push('OtherHeltFacl=' + $("#OtherHeltFacl").val());
		inputs.push('Pallative=' + $("#Pallative").val());
		inputs.push('Rehabilitation=' + $("#Rehabilitation").val());
		inputs.push('CareNurseHome=' + $("#CareNurseHome").val());

		var str = inputs.join('&');
		//alert(str);
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url :"./ehat/ipdhistory/saveIPDDischargePlan", 
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error saving IPDDischargePlan');
			},
			success : function(response) {
				alert(response);
				window.location.reload(true);
			}
		});

	}  */
</script>

</head>

<body style="background: white ! important;">

	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>

		<c:if test="${ sessionScope.userType != null }">

			<input type="hidden" id="tid"
				value="<%=request.getParameter("treatmentId")%>" />

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_IPD.jsp"%>
				<!--End Left Menu -->
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
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date1%>
												</li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li>IPD Discharge Plan</li>
												<div class="pull-right">
													<input type="submit" id="saveIPDDischargePlanButton"
														value="Save" class="btn btn-xs btn-success editUserAccess"
														onclick="saveDischargePlan();" disabled="disabled"/>
													<button class="btn btn-xs btn-danger"
													data-toggle="tooltip" data-placement="left" title="Discard "
														onclick="refreshTrue();">
														<i class = "fa fa-refresh"></i>
														</button>
												</div>
											</ul>
										</div>
									</div>

									<div id="commonPatInfo" class="col-md-12-1"
										style="margin-top: -21px;"></div>
								</div>
								<!-- Page Date Print Discards-->

								<label class="form-group Remove-Padding col-md-12-1 TextFont"
									style="text-align: center; font-weight: bold; font-size: medium; margin-top: 15px; background-color: lightblue">DISCHARGE
									PLAN</label>

								<div id="ipdDischargePlanJSPHeadDiv"
									class="panel panel-default panel-body Remove-Padding col-md-12-1"
									style="margin-top: -2px; padding-left: 5px;">
									<div class="form-group Remove-Padding col-md-4-1">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 5px;">Date of Admission to Ward:
											&nbsp;</label><input id="dateAdmission" value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-4-1"
											style="margin-top: 2px;" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 5px;">Expected Date of Discharge:
											&nbsp;</label> <input id="dateExpectedDischarge"
											value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-4-1"
											style="margin-top: 2px;" />
									</div>
									<!-- <div class="form-group Remove-Padding col-md-4-1" >
										<label class="form-group Remove-Padding col-md-2-1"
											style="margin-top: 5px;">Date
											Set: &nbsp;</label><input id="dateSet"
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-4-1"
											style="margin-top: 2px;" />
									</div> -->
									<div class="form-group Remove-Padding col-md-4-1">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 5px;">Expected Time of Discharge:
											&nbsp;</label><input id="dateSet" onmouseover="click2(this)"
											type="text" readonly="readonly" style="margin-top: 2px;"
											class="form-control input-SmallText TextFont col-md-4-1" />
									</div>
									<label class="form-group Remove-Padding col-md-12-1"
										for="horizontal_line"
										style="border-bottom: 1px solid black; margin-top: 5px;"></label>

									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 5px; padding-left: 5px;">
										<label class="col-md-7-1" style="margin-top: 0px;">Relatives/Carer/Friends
											informed?</label> <select
											class="form-control input-SmallText TextFont col-md-4-1"
											id="isInformed" onchange="" style="margin-top: 0px;">
											<option value="">-select Title-</option>
											<option value="ByPatient">By Patient</option>
											<option value="ByStaff">By Staff</option>
										</select>
									</div>


									<!-- <div class="form-group Remove-Padding col-md-2-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1 TextFont"
											style="font-weight: bold; font-size: small; margin-top: 9px;">Yes:
											&nbsp;</label> <input type="checkbox" style="margin-top: 12px;"
											id="isInformed" />
									</div>
									<div class="form-group Remove-Padding col-md-3-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-6-1 TextFont"
											style="font-weight: bold; font-size: small; margin-top: 9px;">ByPatient: &nbsp;</label><input type="checkbox"
											style="margin-top: 12px;" id="isInformedByPatient" />
									</div>
									<div class="form-group Remove-Padding col-md-3-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1 TextFont"
											style="font-weight: bold; font-size: small; margin-top: 9px;">ByStaff: &nbsp;</label><input type="checkbox" style="margin-top: 12px;"
											id="isInformedByStaff" />
									</div> -->


									<div class="form-group Remove-Padding col-md-3-1"
										style="margin-top: 5px;">
										<label class="col-md-7-1" style="margin-top: 0px;">Transport
											Arranged:</label> <select
											class="form-control input-SmallText TextFont col-md-5-1"
											id="transportArranged" onchange="" style="margin-top: 0px;">
											<option value="">-select Title-</option>
											<option value="Ambulance">Ambulance</option>
											<option value="Own">Own</option>

										</select>
									</div>
									<div class="form-group Remove-Padding col-md-2-1"
										style="margin-top: -3px; padding-left: 10px;">
										<label class="form-group Remove-Padding col-md-8-1"
											style="margin-top: 9px; padding-left: 46px;">Booked:
											&nbsp;</label><input type="checkbox" style="margin-top: 12px;"
											id="isTransportOwnBooked" />
									</div>
									<div class="form-group Remove-Padding col-md-3-1"
										style="margin-top: -3px;">
										<label class="form-group Remove-Padding col-md-8-1"
											style="margin-top: 9px;">Expected Time of arrival:
											&nbsp;</label><input type="text"
											class="form-control input-SmallText TextFont col-md-4-1"
											readonly="readonly" style="margin-top: 7px;"
											onmouseover="click2(this)" id="transOwnArrvTime" />
									</div>

									<!--<div class="form-group Remove-Padding col-md-12-1"></div>
									
									 <div class="form-group Remove-Padding col-md-3-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-6-1 TextFont"
											style="font-weight: bold; font-size: small; margin-top: 9px;">Ambulance:
											&nbsp;</label><input type="checkbox" style="margin-top: 12px;"
											id="isTransportAmb" />
									</div>
									<div class="form-group Remove-Padding col-md-3-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1 TextFont"
											style="font-weight: bold; font-size: small; margin-top: 9px;">Booked:
											&nbsp;</label><input type="checkbox" style="margin-top: 12px;"
											id="isTransportAmbBooked" />
									</div>
									<div class="form-group Remove-Padding col-md-7-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1 TextFont"
											style="font-weight: bold; font-size: small; margin-top: 9px;">Expected
											Time of arrival: &nbsp;</label><input type="text"
											class="form-control input-SmallText TextFont col-md-4-1"
											style="margin-top: 12px;" id="transAmbArrvTime" />
									</div> -->

									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-1-1"
											style="font-weight: bold; font-size: small; margin-top: 9px;">Medication:&nbsp;</label>

										<div class="form-group Remove-Padding col-md-1-1"
											style="margin-top: 1px;">
											<label class="form-group Remove-Padding col-md-5-1"
												style="margin-top: 9px;">Own: &nbsp;</label><input
												type="checkbox" style="margin-top: 10px;" id="isOwnMedic" />
										</div>
										<div class="form-group Remove-Padding col-md-6-1"
											style="margin-top: 1px;">
											<label class="form-group Remove-Padding col-md-5-1"
												style="margin-top: 9px;">New Medicines and
												Medication List: &nbsp;</label><input type="checkbox"
												style="margin-top: 10px;" id="isNewMedic" />
										</div>
									</div>

									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-2-1"
											style="font-weight: bold; font-size: small; margin-top: 9px;">Transfer
											Letter: &nbsp;</label>
										<!-- <input type="checkbox"
											style="margin-top: 12px;" id="isTransferLetter" /> -->
									</div>
									<label for="horizontal_line"
										class="form-group Remove-Padding col-md-12-1"
										style="border-bottom: 1px solid black; margin-top: 0px;"></label>

									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-6-1"
											style="margin-top: 9px;">Social Service: &nbsp;</label><input
											type="checkbox" style="margin-top: 12px;"
											id="isSocialService" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Referral Date: &nbsp;</label><input
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											value='<%=todays_date%>'
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" id="socialServiceRefDate" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Assessment Date: &nbsp;</label><input
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											value='<%=todays_date%>'
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" id="socialServiceAssesDate" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"></div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-6-1"
											style="margin-top: 9px;">OT: &nbsp;</label><input
											type="checkbox" style="margin-top: 12px;" id="isOT" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Referral Date: &nbsp;</label><input
											id="OTRefDate" value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Assessment Date: &nbsp;</label><input
											id="OTAssesDate" value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"></div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-6-1"
											style="margin-top: 9px;">Physiotherapy: &nbsp;</label><input
											type="checkbox" style="margin-top: 12px;" id="isPhysio" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Referral Date: &nbsp;</label><input
											id="physioRefDate" value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Assessment Date: &nbsp;</label><input
											id="physioAssesDate" value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"></div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-6-1"
											style="margin-top: 9px;">Other&nbsp;<i>(Please
												Specify)</i>: &nbsp;
										</label><input type="checkbox" style="margin-top: 12px;" id="isOther" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Referral Date: &nbsp;</label><input
											value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" id="otherRefDate" />
									</div>
									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Assessment Date: &nbsp;</label><input
											value='<%=todays_date%>'
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											class="form-control input-SmallText TextFont col-md-5-1"
											style="margin-top: 6px;" id="otherAssesDate" />
									</div>

									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px; border-top: 1px solid black;">

										<label class="form-group Remove-Padding col-md-4-1"
											style="font-weight: bold; font-size: small; margin-top: 9px;">Actual
											Date of Discharge: &nbsp;</label><input
											onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
											readonly="readonly" type="text" placeholder="Date"
											value='<%=todays_date%>'
											class="form-control input-SmallText TextFont col-md-2-1"
											style="margin-top: 6px;" id="dateActualDischarge" /> <label
											class="form-group Remove-Padding col-md-2-1"
											style="font-weight: bold; font-size: small; margin-top: 9px; margin-left: 20px;">Discharge
											Code: &nbsp;</label> <select
											class="form-control input-SmallText TextFont col-md-2-1"
											id="dischargeCode" style="margin-top: 6px;">
										 	<option value="">-select-</option>
											<option value="1">DAMA</option>
											<option value="2">Death</option>
											<option value="3">Transfer</option>
										</select>
									</div>

									<div class="form-group Remove-Padding col-md-4-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-12-1"
											style="margin-top: 9px;">Transfer to Discharge
											Lounge: &nbsp; </label>
									</div>
									<div class="form-group Remove-Padding col-md-2-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Yes/No: &nbsp;</label><input
											type="checkbox" style="margin-top: 12px;" id="isTDL" />
									</div>
									<div class="form-group Remove-Padding col-md-2-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-5-1"
											style="margin-top: 9px;">Time: &nbsp;</label><input
											type="text" onmouseover="click2(this)"
											class="form-control input-SmallText TextFont col-md-7-1"
											style="margin-top: 12px;" id="TDLTime" readonly="readonly" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-12-1"
											style="margin-top: 9px;">Reasons for difference in
											expected date of discharge and actual date of discharge:
											&nbsp;<i>(Please fill the below details as applicable)</i>
										</label>
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Diagnostic Capacity - delays
											due to lack of services(eg: MRI/CT scan): &nbsp;</label> <input
											type="text"
											class="form-control input-SmallText TextFont col-md-8-1"
											style="margin-top: 12px;" id="diagCapacity" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Waiting for test results:
											&nbsp;</label> <input type="text"
											class="form-control input-SmallText TextFont col-md-8-1"
											style="margin-top: 12px;" id="waitTestRes" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Waiting for medical review
											for discharge: &nbsp;</label> <input type="text"
											class="form-control input-SmallText TextFont col-md-8-1"
											style="margin-top: 12px;" id="waitMedRevDisc" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Medical Consultant delay:
											&nbsp;</label> <input type="text"
											class="form-control input-SmallText TextFont col-md-8-1"
											style="margin-top: 12px;" id="MedConsulDelay" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Allied Health delay
											(referral too late/unable to respond to request): &nbsp;</label><input
											type="text"
											class="form-control input-SmallText TextFont col-md-8-1"
											style="margin-top: 12px;" id="AlliedHelDelay" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Referral to community
											provider's made too late: &nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="RefCommProvLate" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Patient waiting for supply
											of Consumables/Equipment: &nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="PatWaitConsEquip" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Medication: &nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="Medication" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Transport: &nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="Transport" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Other health facilities(no
											bed available): &nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="OtherHeltFacl" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Palliative care/hospice:
											&nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="Pallative" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Rehabilitation: &nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="Rehabilitation" />
									</div>
									<div class="form-group Remove-Padding col-md-12-1"
										style="margin-top: 1px; padding-left: 5px;">
										<label class="form-group Remove-Padding col-md-4-1"
											style="margin-top: 9px;">Care Nursing home(high
											care): &nbsp;</label><input
											class="form-control input-SmallText TextFont col-md-8-1"
											type="text" style="margin-top: 12px;" id="CareNurseHome" />
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
			<input id="callfromipd" type="hidden" name="callfromipd" value="<%=request.getParameter("type")%>"/>
			<div id="patobject" style="display: none;"></div>
			<div id="hospDetails" style="display: none;"></div>
			<div id="container" style="display: none;"></div>
			<input type="hidden" id="queryType" name="queryType" value="insert" />
			<input style="display: none;" id="userName"
				value="${ sessionScope.userName }" />
			<input style="display: none;" id="userRole1"
				value="${sessionScope.userType}" />
			<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>

			<!-- For IPD_BedWard -->
			<input type="hidden" id="idplan" value="0" />
			<input type="hidden" value="<%=session.getAttribute("uId")%>" id="unitId" />
			<input id="tr_Id" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
			<input id="pid" type="hidden"
				value="<%=request.getParameter("patientId")%>"
				style="display: none;" />
			<input id="tid" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
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

			<!-- callFor=previousTreatmentIPD -->
			<input id="callFor" type="hidden"
				value="<%=request.getParameter("callFor")%>" style="display: none;" />
			<!-- /callFor=previousTreatmentIPD -->
			<input type="hidden" value="<%=session.getAttribute("preTreat")%>" id="preTreat" />
			

		</c:if>
	</section>
</body>
</html>