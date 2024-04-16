var count = 1;
var immunizationTemplateMaster = "{#foreach $T.vaccineDTOList as il}<tr>"
		+ "<td class='col-md-1-1 center TextFont'>{count}.</td>	"
		+ "<td class='col-md-3-1 TextFont'>"
		+ "{$T.il.vaccineName}"
		+ " {#if $T.il.mandatoryFlag=='Y'} <b style='color: red; padding-left: 3px;'>*</b> {#/if}"
		+ " {#if $T.il.gender=='ALL'} <sup><i class='fa fa-users'></i></sup>{#/if}"
		+ " {#if $T.il.gender=='MALE'} <sup><i class='fa fa-male'></i></sup>{#/if}"
		+ " {#if $T.il.gender=='FEMALE'} <sup><i class='fa fa-female'></i></sup>{#/if}"
		+ "</td>"

		+ "{#if $T.il.days=='0' && $T.il.weeks=='0' && $T.il.months=='0' && $T.il.years=='0'}"
		+ "<td class='col-md-3-1 center TextFont' style='background: #E7F3FF;'> At Birth </td>"
		+ "{#/if}"

		+ "{#if $T.il.days!='0' && $T.il.weeks=='0' && $T.il.months=='0' && $T.il.years=='0'}"
		+ "<td class='col-md-3-1 center TextFont' style='background: #DAEDFF;'> {$T.il.days} to {$T.il.maxDays} Days </td>"
		+ "{#/if}"

		+ "{#if $T.il.days=='0' && $T.il.weeks!='0' && $T.il.months=='0' && $T.il.years=='0'}"
		+ "<td class='col-md-3-1 center TextFont' style='background: #C2E0FF;'> {$T.il.weeks} to {$T.il.maxWeeks} Weeks </td>"
		+ "{#/if}"

		+ "{#if $T.il.days=='0' && $T.il.weeks=='0' && $T.il.months!='0' && $T.il.years=='0'}"
		+ "<td class='col-md-3-1 center TextFont' style='background: #AAD4FF;'> {$T.il.months} to {$T.il.maxMonths} Months </td>"
		+ "{#/if}"

		+ "{#if $T.il.days=='0' && $T.il.weeks=='0' && $T.il.months=='0' && $T.il.years!='0'}"
		+ "<td class='col-md-3-1 center TextFont' style='background: #91C8FF;'> {$T.il.years} to {$T.il.maxYears} Years </td>"
		+ "{#/if}"

		+ "<td class='col-md-1-1 center TextFont'>"
		+ "<button onclick='editImmunization({count++})' class='btn btn-xs btn-success editUserAccess' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i></button></td>"

		/*
		 * + "<td class='col-md-1-1 center'>" + "<button
		 * onclick='saveUpdateFetchDeleteImmunization(\"DELETE\",
		 * {$T.il.saveUpdateImmunizationID})' class='btn btn-xs btn-danger'>" + "<i class='fa fa-trash-o'></i></button></td>"
		 */

		+ "</tr>{#/for}";

function refreshImmunization() {
	$("#saveUpdateImmunizationID").val("0");
	$("#vaccineName").val("");
	$("#vaccineID").val("0");
	$("#dayMonthYearNumber").val("0");
	$("#dayMonthYearText").val("DAYS");
	$("#optionalMandatoryFlag").val("OPTIONAL");
	$("#gender").val("ALL");
	$("#vaccineNotes").val("");
	$("#dayMonthYearNumberMax").val("0");
}

function saveUpdateFetchDeleteImmunization(actionToPerform, loadSearchParam) {

	if (actionToPerform == "SAVEUPDATE") {

		var saveUpdateImmunizationID = $.trim($("#saveUpdateImmunizationID")
				.val());
		var vaccineName = $.trim($("#vaccineName").val());
		if (vaccineName == "") {
			alert("please enter a vaccine name...");
			return false;
		}

		var vaccineID = $.trim($("#vaccineID").val());
		var gender = $.trim($("#gender").val());
		var vaccineNotes = $.trim($("#vaccineNotes").val());

		var days = 0;
		var maxDays = 0;

		var weeks = 0;
		var maxWeeks = 0;

		var months = 0;
		var maxMonths = 0;

		var years = 0;
		var maxYears = 0;

		var dayMonthYearText = $.trim($("#dayMonthYearText").val());

		var dayMonthYearNumber = $.trim($("#dayMonthYearNumber").val());
		var dayMonthYearNumberMax = $.trim($("#dayMonthYearNumberMax").val());

		if (dayMonthYearText == "DAYS") {
			days = dayMonthYearNumber;
			maxDays = dayMonthYearNumberMax;
		} else if (dayMonthYearText == "WEEKS") {
			weeks = dayMonthYearNumber;
			maxWeeks = dayMonthYearNumberMax;
		} else if (dayMonthYearText == "MONTHS") {
			months = dayMonthYearNumber;
			maxMonths = dayMonthYearNumberMax;
		} else if (dayMonthYearText == "YEARS") {
			years = dayMonthYearNumber;
			maxYears = dayMonthYearNumberMax;
		}

		if ((dayMonthYearText != "DAYS") && (dayMonthYearNumber == 0)) {
			alert("Please select proper value for " + dayMonthYearText);
			$("#dayMonthYearNumberMax").focus();
			return false;
		}

		if (parseFloat(dayMonthYearNumber) > parseFloat(dayMonthYearNumberMax)) {
			alert("Max. Value should be greater than min. value...");
			$("#dayMonthYearNumberMax").focus();
			return false;
		}

		var mandatoryFlag = "N";
		if ($.trim($("#optionalMandatoryFlag").val()) == "MANDATORY") {
			mandatoryFlag = "Y";
		}

		var inputs = [];
		inputs.push('action=saveUpdateFetchDeleteImmunization');
		inputs.push('actionToPerform=' + actionToPerform);
		inputs.push('saveUpdateImmunizationID=' + saveUpdateImmunizationID);
		inputs.push('vaccineName=' + encodeURIComponent(vaccineName));
		inputs.push('vaccineID=' + vaccineID);
		inputs.push('gender=' + gender);
		inputs.push('days=' + days);
		inputs.push('weeks=' + weeks);
		inputs.push('months=' + months);
		inputs.push('years=' + years);
		inputs.push('maxDays=' + maxDays);
		inputs.push('maxWeeks=' + maxWeeks);
		inputs.push('maxMonths=' + maxMonths);
		inputs.push('maxYears=' + maxYears);
		inputs.push('mandatoryFlag=' + mandatoryFlag);
		inputs.push('vaccineNotes=' + encodeURIComponent(vaccineNotes));
		var str = inputs.join('&');
		jQuery.ajax({
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
				var ajaxResponse = r;
				alert(ajaxResponse);
				refreshImmunization();
				saveUpdateFetchDeleteImmunization('FETCH', 'ONLOAD');
			}
		});

	} else if (actionToPerform == "FETCH") {

		var inputs = [];
		inputs.push('action=saveUpdateFetchDeleteImmunization');
		inputs.push('actionToPerform=' + actionToPerform);
		inputs.push('loadSearchParam=' + loadSearchParam);
		if (loadSearchParam != "ONLOAD")
			inputs.push('searchVaccineByName='
					+ $.trim($("#searchVaccineByName").val()));
		var str = inputs.join('&');
		jQuery.ajax({
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
				var ajaxResponse = r;
				$("#ImmunizationDetailsList").html(ajaxResponse);

				var jsObj = eval('(' + ajaxResponse + ')');
				count = 1;
				$("#immunizationTemplateMasterTable").setTemplate(
						immunizationTemplateMaster);
				$("#immunizationTemplateMasterTable").processTemplate(jsObj);
			}
		});

	} else if (actionToPerform == "DELETE") {

		var booleanFlag = confirm("Do you wish to delete?");
		if (booleanFlag) {
			var inputs = [];
			inputs.push('action=saveUpdateFetchDeleteImmunization');
			inputs.push('actionToPerform=' + actionToPerform);
			inputs.push('saveUpdateImmunizationID=' + loadSearchParam);
			var str = inputs.join('&');
			jQuery.ajax({
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
					var ajaxResponse = r;
					alert(ajaxResponse);
					saveUpdateFetchDeleteImmunization('FETCH', 'ONLOAD');
				}
			});
		}
	}
	setTimeout(function(){userAccess();},100);
}

function editImmunization(arrayCount) {

	(arrayCount--);

	var ajaxResponse = $("#ImmunizationDetailsList").html();
	var jsObj = eval('(' + ajaxResponse + ')');

	jsObj = jsObj.vaccineDTOList[arrayCount];

	$("#saveUpdateImmunizationID").val(jsObj.saveUpdateImmunizationID);
	$("#vaccineName").val(jsObj.vaccineName);
	$("#vaccineID").val(jsObj.vaccineID);
	$("#gender").val(jsObj.gender);
	$("#vaccineNotes").val(jsObj.vaccineNotes);

	var optionalMandatoryFlag = "OPTIONAL";
	if (jsObj.mandatoryFlag == 'Y') {
		optionalMandatoryFlag = "MANDATORY";
	}
	$("#optionalMandatoryFlag").val(optionalMandatoryFlag);

	if (jsObj.days == "0" && jsObj.weeks == "0" && jsObj.months == "0"
			&& jsObj.years == "0") {
		$("#dayMonthYearNumber").val(jsObj.days);
		$("#dayMonthYearNumberMax").val(jsObj.maxDays);
		$("#dayMonthYearText").val("DAYS");
	} else if (jsObj.days != "0") {
		$("#dayMonthYearNumber").val(jsObj.days);
		$("#dayMonthYearNumberMax").val(jsObj.maxDays);
		$("#dayMonthYearText").val("DAYS");
	} else if (jsObj.weeks != "0") {
		$("#dayMonthYearNumber").val(jsObj.weeks);
		$("#dayMonthYearNumberMax").val(jsObj.maxWeeks);
		$("#dayMonthYearText").val("WEEKS");
	} else if (jsObj.months != "0") {
		$("#dayMonthYearNumber").val(jsObj.months);
		$("#dayMonthYearNumberMax").val(jsObj.maxMonths);
		$("#dayMonthYearText").val("MONTHS");
	} else if (jsObj.years != "0") {
		$("#dayMonthYearNumber").val(jsObj.years);
		$("#dayMonthYearNumberMax").val(jsObj.maxYears);
		$("#dayMonthYearText").val("YEARS");
	}

}
