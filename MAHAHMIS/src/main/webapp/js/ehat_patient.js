
/************
* @author	: Vinod Udawant
* @date		: 05-June-2017
* @codeFor	: Get for ipd queue 
 ************/
function getIpdQueue(callfrom) {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/viewIpdQueue",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {

			setIpdQueueTemp(r);
		}
	});
}

function setIpdQueueTemp(res){
	
	var count=0;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
		//+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>UHID</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Allot Bed</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont'>Cancel Admission</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
		+ "	<table class='table table-condensed table-stripped cf'>"
		+ "<tbody class='cf'>";
	
	for(var indx=0;indx<res.lstIpdQueue.length;indx++){
		
		var fullName=res.lstIpdQueue[indx].patientName;
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"+count+"</td>"
		+ "	<td class='col-sm-3-1' id='divPi"+count+"' style='height: 21.5px;'>"+fullName+"</td>"
		+ "	<td class='col-sm-2-1' id='divPi"+count+"' style='height: 21.5px;'>"+res.lstIpdQueue[indx].pId+"</td>"
		+ "	<td class='col-sm-2-1' style='height: 21.5px;'>IPD/2017/06/166</td>"
		+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
		+ "		<input type='button' value='ALLOT BED' class='btn btn-xs btn-success editUserAccess' id='btnDelete"+count+"' "
		+ "		onclick=viewBedWard("+res.lstIpdQueue[indx].pId+","+res.lstIpdQueue[indx].treatId+") style='font-size: 12px;' />"
		+ "	</td>"
		+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
		+ "		<input type='button' value='Cancel Admission' name='#login-box' class='btn btn-xs btn-success editUserAccess' id='submit' "
		+ "				onclick='cancelAdmission("+res.lstIpdQueue[indx].pId+","+res.lstIpdQueue[indx].treatId+")' />"
		+ "	</td>" + "	</tr>";		
		
		count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#container").html(ipdqueueTemp);
}

/************
* @author	: Vinod Udawant
* @date		: 05-June-2017
* @codeFor	: View bed wards
 ************/
function viewBedWard(pId,treatId, callfrom) {
	//ajaxResponse = $("#patobject").html();
	//alert(ajaxResponse);
	/*myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patientId) {
			myObj = myArray.pl[i];

			break;
		}
	}*/
	
	window.location.href = "ehat_IPD_BedWard.jsp?pId="+pId+"&treatId="+treatId;

	/*myObj = JSON.stringify(myObj);

	if (bedAllocated == 'N') {
		window.location.href = "IPD_BedWard.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type=bed";
	} else {
		window.location.href = "IPD_CoverSheet.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type=bed";
	}*/

}


/************
* @author	: Vinod Udawant
* @date		: 05-June-2017
* @codeFor	: Autosuggestion for ipd queue 
 ************/
function setAutoCompleteForIpdQueue(inputId, callfrom) {

	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();
	
	var inputs = [];
	
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/autoSuggestionIpdQueue",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			
			if(callfrom=="search"){
				setIpdQueueTemp(r);
				autoCompTable(r, inputId);
				
			}else{
				autoCompTable(r, inputId);
			}			
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-June-2017
* @codeFor	: Autosuggestion for ipd queue 
 ************/
function autoCompTable(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.depNm != 'Match') {
			
				$('#byName').val(ui.item.patientName);
				var nm = ui.item.patientName;
				console.log(nm);
				setAutoCompleteForIpdQueue('byName','search');
				$('#byName').val('');
			}
			/*
			 * This function use for Enter keypress search
			 */
		//	setAutoCompleteForIpdQueue(id, 'search');

			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.lstIpdQueue.length);
			var result;
			if (!data || data.lstIpdQueue.length === 0 || !data.lstIpdQueue
					|| data.lstIpdQueue.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Not Found',
					'pId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.lstIpdQueue;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}

/**
 * @author :Sanjay kr Shah
 * @Date :08-03-018
 * @purpose:view testswise Ris details inside Ris
 */
function clickris(type, PID, TID, IDradiology, idradTestName,pageType, previousFlag) { // aniket kanse / 14 DEC 2020 / added previous flag to disable report generation in previous records.
	
//	alert("previousFlag : " + previousFlag);
	
	
	var page = $("#pageType").html();
	if (type == "createTemp") {
		window.location = "ehat_RisTemplate.jsp?";
	} else {

		var inputs = [];
		inputs.push('pid=' + PID);
		inputs.push('callform=' + TID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/registration/fetchPatientsRecordByTreatmentId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
//				ajaxResponse = r;
//
//				if (type == "createTemp") {
//					window.location = "ehat_RisTemplate.jsp?";
//				} else if (type == "viewRis") {
//					window.location = "ehat_ViewRis.jsp?" + "&Idradiology="
//							+ IDradiology + "&Tid=" + TID + "&Pid=" + PID
//							+ "&idradTestName=" + idradTestName + "&pageType="	+ pageType+ "&page="+ page;
//
//				} else if (type == "createReport") {
//					window.location = "ehat_RisCreateReportTemp.jsp?" + "&Tid="
//							+ TID;
//				}
				
				ajaxResponse = r;

				if (type == "createTemp") {
					window.location = "ehat_RisTemplate.jsp?";
				} else if (type == "viewRis") {
						
					//alert("type--> " + type);
					
					/*window.location = "ehat_ViewRis.jsp?" + "&Idradiology=" //commented/by/aniket/27OCT2020
							+ IDradiology + "&Tid=" + TID + "&Pid=" + PID
							+ "&idradTestName=" + idradTestName + "&pageType="	+ pageType+ "&page="+ page;*/
					
					
					if(previousFlag == undefined || previousFlag == "" || previousFlag == null || previousFlag == "null" || previousFlag == "undefined"){
						//alert(" new if");
						window.location = "ehat_view_ris_new.jsp?" + "&Idradiology="
						+ IDradiology + "&Tid=" + TID + "&Pid=" + PID
						+ "&idradTestName=" + idradTestName + "&pageType="	+ pageType+ "&page="+ page;
						
					}else {
						//alert(" new else" + previousFlag);
						window.location = "ehat_view_ris_previous_records.jsp?" + "&Idradiology="
						+ IDradiology + "&Tid=" + TID + "&Pid=" + PID
						+ "&idradTestName=" + idradTestName + "&pageType="	+ pageType+ "&page="+ page;
					}
					

				} else if (type == "createReport") {
					window.location = "ehat_RisCreateReportTemp.jsp?" + "&Tid="
							+ TID;
				}
			}
		});
	}
}

function setArrivalTime(count, PID, TID, IDradiology, IdMasterRadioAssignTest) {
	
	var r = confirm("Save Arrival Time ?");
	if (r == true) {
		
		var isSelected = 0;
		if ($('#idArrivalTime' + count).attr('checked')) {
			isSelected = 1;
		}

		var inputs = [];
		inputs.push('action=setArrivalTime');
		inputs.push('pid=' + PID);
		inputs.push('tid=' + TID);
		inputs.push('idRadiology=' + IDradiology);
		inputs.push('idMasterRadioAssignTest=' + IdMasterRadioAssignTest);
		inputs.push('isSelected=' + isSelected);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			url : "ehat/ris/setArrivalTime",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
			},
			success : function(r) {
				ajaxResponse = r;
				window.location.reload();
			}
		});
		
	}else
    {
		$("#idArrivalTime" + count).attr('checked', false);
		return false;
	}

}

function setTakenTime(count, PID, TID, IDradiology, IdMasterRadioAssignTest) {
	
	var r = confirm("Save Taken Time ?");
	if (r == true) {
		
		var isSelected = 0;
		if (!$('#idArrivalTime' + count).attr('checked')) {
			alert("Please Select Arrival First");
			$("#idTakenTime" + count).attr('checked', false);
			return false;
		}
		if ($('#idTakenTime' + count).attr('checked')) {
			isSelected = 1;
		}
		var inputs = [];
		inputs.push('action=setTakenTime');
		inputs.push('pid=' + PID);
		inputs.push('tid=' + TID);
		inputs.push('idRadiology=' + IDradiology);
		inputs.push('idMasterRadioAssignTest=' + IdMasterRadioAssignTest);
		inputs.push('isSelected=' + isSelected);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			url : "ehat/ris/setTakenTime",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
			},
			success : function(r) {
				ajaxResponse = r;
				window.location.reload();
			}
		});
		
	} else
    {
		$("#idTakenTime" + count).attr('checked', false);
		return false;
	}
	
	
}
function changeButton() {

	$("#btnViewReport").attr('disabled', true);
	$("#btnCreRepo").attr('disabled', true);
	$("#btnEditRepo").hide();

	
	
	if (sessionStorage.getItem("flag") == 0)
		$("#saveImage").hide();
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function riscreaterep(check) {

	var pageType = getUrlParameter("pageType");
	var TestID = $("#viewtest").val();//$("#TestID").text().trim(); 
	if(TestID == 0 || TestID == undefined || TestID == ""){
	 TestID = $("#idTestRadiology").text(); 
	}
	var TID = $("#TID").text();
	var PID = $("#PID").text();
	var idradTestName = $("#Idradiology").text();
	
	var idRadiologyTestReport = $("#createUpdateReportId").val();	// aniket//11/11/2020

	/*window.location = "ehat_RisCreateReportTemp.jsp?" + "&TestID=" + TestID	
			+ "&check=" + check + "&Tid=" + TID + "&Pid=" + PID+"&idradTestName="+idradTestName + "&pageType="	+ pageType;*/
	
	// added, aniket
	window.location = "ehat_RisCreateReportTemp.jsp?" + "&TestID=" + TestID	
	+ "&idRadiologyTestReport=" + idRadiologyTestReport + "&Tid=" + TID + "&Pid=" + PID+"&idradTestName="+idradTestName + "&pageType="	+ pageType + "&check=" + check;

}
function fetchRadiologyTest() {
	var TID = $("#TID").html();
	var testId = $("#Idradiology").html();
	var idradTestName = $("#idradTestName").html();
	var radTestId = $("#radTestId").html();
	var TestID1 = $("#TestID1").html();
	if(testId == 0 || testId == undefined || testId == "null"){
		testId = $("#TestID1").html();
		}
	if(idradTestName == 0 || idradTestName == undefined || idradTestName == "null"){
		idradTestName = $("#radTestId").html(); 
		}
	
	
	var inputs = [];
	inputs.push('tid=' + TID);
	inputs.push('idradTestName=' + idradTestName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchradiotest", 
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			var ajaxResp = r;
			
			var list = "";
			var testName = "";
			
			for ( var i = 0; i < r.testList.length; i++) {

				if (idradTestName == r.testList[i].idradiology_test) {

					testName = r.testList[i].testName;
					list = list + '<option onclick="setdeatils('
							+ r.testList[i].testID + ')" value="'
							+ (r.testList[i].testID) + '">'
							+ (r.testList[i].testName) + '</option>';
				}

			}
			$("#viewtest").html(list);
			$("#investigationName").val(testName); //aniket/28/OCT/2020
		}
	});
}

function getRisPatInfo() {

	var PID = $("#PID").html();
	var TID = $("#TID").html();

	var inputs = [];
	inputs.push('action=fetchPatInfo');
	inputs.push('pid=' + PID);
	inputs.push('tid=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",// ehat/registration/fetchPatientsRecordByTreatmentId
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#RisPBar").setTemplate(TempViewRisBar);
			$("#RisPBar").processTemplate(pobj1);
			if (r.pl[0].objTreat.tf == "N") {
				$("#btnCreRepo").hide();
				$("#btnEditRepo").hide();
			}
		}
	});
}

/*
 * //Selected Test which is given by Ris dashboard var TestTemp = "{#foreach
 * $T.testList as pattemplist}<option
 * onclick='setdeatils({$T.pattemplist.testID},{$T.pattemplist.testID})'" + "
 * value={$T.pattemplist.testID}>{$T.pattemplist.testID}</option>{#/for}";
 */

function setdeatils(TestID) {

	$("#btnCreRepo").attr('disabled', false);
	$("#TestID").html(TestID);
	$("#testid").val(TestID);
	
	var inputs = [];
	inputs.push('testID=' + TestID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchtestrisdetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			var ajaxResp = r;
			pobj1 = eval('(' + ajaxResp + ')');
			fetchServicescat(TestID);
			fetchImage(TestID);
		}
	});
	//getTestDeatils(TestID);
}

function ShowDivUpdateReason1() {

	var testId = $("#TestID").text();
	fetchTestDetails(testId);
	$("#divDetailsForm").show();
	var coRelationVal = $("#txtComment1").val();
	var redoScanVal = $("#txtComment2").val();
	var relatedReactionVal = $("#txtComment3").val();
	var errorVal = $("#txtComment4").val();
	var history = $("#txtComment5").val();

	if (coRelationVal == "" && redoScanVal == "" && relatedReactionVal == ""
			&& errorVal == "" && history == "") {
		alert("Please save Q-OIndicators first...");
		return false;
	}

	var reportStatus = $("#updateReport").text();
	if (reportStatus == "update") {
		$("#divUpdateReason").show();
	} else {
		// saveCrtReportTemp();
	}
}

function saveCrtReportTemp() {
	var pageType = getUrlParameter("pageType");
	var templateId = $("#risTemplateList").val();
	var patId = $("#patientId").text();
	var radiologyTestId = $("#radiologyTestId").text();
	var testId = $("#TestID").html();
	var templateTypeId = $("#selRisCrTempList1").val();
	var treatmentId = $("#TID").text();
	var templateData = CKEDITOR.instances["Riseditor1"].getData();
	var nuclearMedicineTemp = "";
	if(pageType=="Nuclear"){
		nuclearMedicineTemp = CKEDITOR.instances["RiseditorSubjective1"].getData();
		if(nuclearMedicineTemp == "" || nuclearMedicineTemp ==undefined){
			alert("Please Enter Data to Create Report !");
			return false;
		}
	}
	var inputs = [];
	inputs.push('templateId=' + templateId);
	inputs.push('testId=' + testId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('templateTypeId=' + templateTypeId);
	inputs.push('patientId=' + patId);
	inputs.push('radiologyTestId=' + radiologyTestId);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('nuclearData=' + encodeURIComponent(nuclearMedicineTemp));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/saveCrtTemplateReport",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			var ajaxResponse = r;
			alert("Save Successfully...");

			window.location = "ehat_ViewRis.jsp?" + "&Tid=" + treatmentId+ "&Pid=" + patId+ "&TestID=" + testId
			+ "&idradTestName=" + radiologyTestId + "&pageType=" + pageType;
		}

	});

}

/*******************************************************************************
 * @Vikas Godse
 * @date 6_March_2018 this method is Getting All Created Template Data
 ******************************************************************************/
function getTestRadilogyReports(check){
	var pageType = getUrlParameter("pageType");
	var page = 1;
	//alert("check "+check);
	//var patId = $("#patientId").text();
	var patId = $("#PID").text();
	if(patId=="null"||patId==""||patId==undefined){
		patId=("#Pid").text();
	}

	var radiologyTestId = $("#idradTestName").text();
	var testId = $("#TestID").text();
	if(testId == 0 || testId ==undefined || testId =="null"){
		testId = $("#idTestRadiology").text();
	}
	if(radiologyTestId == 0 || radiologyTestId ==undefined || radiologyTestId ==""){
		radiologyTestId = $("#radiologyTestId").text().trim();
	}
	var treatmentId = $("#TID").html();
	
	var inputs = [];
	inputs.push('patientId=' + patId);
	inputs.push('testId=' + testId);
	inputs.push('radiologyTestId=' + radiologyTestId);
	inputs.push('treatmentId=' + treatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/getTestRadilogyReportsData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r.listRadiologyTempReportDTO.length > 0){
				
				$("#btnCreRepo").attr('disabled', true);
				$("#btnViewReport").attr('disabled', false);
				$("#btnCreRepo").hide();
				$("#btnEditRepo").show();
				
					if(pageType == "Nuclear"){
					setTimeout( function() {
						CKEDITOR.instances['viewckeditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
						 $('#selRisCrTempList1 option[value="'+r.listRadiologyTempReportDTO[0].templateTypeId+'"]').attr("selected",true);
						 $("#selRisCrTempList1").prop("disabled", true);
						 $("#risTemplateList").prop("disabled", true);  
						CKEDITOR.instances['Riseditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
						CKEDITOR.instances['Riseditor1'].setReadOnly(true);
						CKEDITOR.instances['RiseditorSubjective1'].setData(r.listRadiologyTempReportDTO[0].nuclearData);
						setRadiologyTemplates(r.listRadiologyTempReportDTO[0].templateId);
						}, 600);
					setTimeout( function() {
						CKEDITOR.instances['viewckeditor2'].setData(r.listRadiologyTempReportDTO[0].nuclearData);
					},500);
					}
					else{
					 setTimeout( function() {
					 CKEDITOR.instances['viewckeditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
					 $('#selRisCrTempList1 option[value="'+r.listRadiologyTempReportDTO[0].templateTypeId+'"]').attr("selected",true);
					 CKEDITOR.instances['Riseditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
					 setRadiologyTemplates(r.listRadiologyTempReportDTO[0].templateId);
					 }, 600);
				 }
				$("#btnCreRepo").hide();
				$("#btnEditRepo").show();
				
					 
				
			}else{
				
				$("#btnCreRepo").attr('disabled', false);
				if(pageType == "Nuclear"){
					 setTimeout( function() {
					CKEDITOR.instances['Riseditor1'].setReadOnly(true);
					 },600);
				}
				
			}
	
		}
	});
	
}

var TemplateRISList = "{#foreach $T.lstRisTemplate as pattemplist}" +
		"<option onclick=''	" +
		"value={$T.pattemplist.templateId}>{$T.pattemplist.templateName}</option>{#/for}";
function setRadiologyTemplates(templateId)
{
	var inputs = [];
	inputs.push('templateId='+templateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/getTemplateListById",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#risTemplateList").setTemplate(TemplateRISList);
			$("#risTemplateList").processTemplate(ajaxResponse);
			$('#risTemplateList option[value="'+r.lstRisTemplate[0].templateName+'"]').attr("selected",true);
		}
	});	
}

function getTestRadilogyReportsById(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/ris/getTestRadilogyReportsData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r.listRadiologyTempReportDTO.length > 0){	
				
				CKEDITOR.instances['viewckeditor1']
				.setData(r.listRadiologyTempReportDTO[0].templateData);
				
				$("#btnCreRepo").hide();
				$("#btnEditRepo").show();
				$("#btnViewReport").attr('disabled', false);
			}
		}
	});
	
}

function setViewTestProcess() {
	$("#divDetailsForm").show();
}

function setHideTestProcess() {
	$("#divDetailsForm").hide();
}
function showTxtComment1() {
	$("#txtComment1").show();
}
function hideTxtComment1() {
	$("#txtComment1").hide();
}
function showTxtComment2() {
	$("#txtComment2").show();
}
function hideTxtComment2() {
	$("#txtComment2").hide();
}
function showTxtComment3() {
	$("#txtComment3").show();
}
function hideTxtComment3() {
	$("#txtComment3").hide();
}
function showTxtComment4() {
	$("#txtComment4").show();
}

function hideTxtComment4() {
	$("#txtComment4").hide();
}

function fetchTestDetails(testId) {

	if(testId == 0){
		testId = parseInt($("#TestID").text());
	}
	
	var treatId = parseInt($("#TID").text());
	var patId = parseInt($("#Pid").text());
	if (patId == undefined || patId == "") {
		patId = parseInt($("#patientId").text());
	}

	var inputs = [];
	inputs.push('testId=' + testId);
	inputs.push('treatId=' + treatId);
	inputs.push('patId=' + patId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchTestDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;

			if(ajaxResponse.lstRadiologyTestDto[0].coRelation != "" && ajaxResponse.lstRadiologyTestDto[0].coRelation != null){
			 $("#chkCoRelationY").prop("checked", "checked");
			 $("#txtComment1").show();
			 $("#txtComment1").val(ajaxResponse.lstRadiologyTestDto[0].coRelation); 
			 }
			
			 if(ajaxResponse.lstRadiologyTestDto[0].redoScan != "" && ajaxResponse.lstRadiologyTestDto[0].redoScan != null){
			 $("#chkRedoY").prop("checked", "checked");
			 $("#txtComment2").show();
			 $("#txtComment2").val(ajaxResponse.lstRadiologyTestDto[0].redoScan); }
			 
			 if(ajaxResponse.lstRadiologyTestDto[0].relatedReaction != "" &&	 ajaxResponse.lstRadiologyTestDto[0].relatedReaction != null){
			 $("#chkRelatedReactionY").prop("checked", "checked");
			 $("#txtComment3").show();
			 $("#txtComment3").val(ajaxResponse.lstRadiologyTestDto[0].relatedReaction); }
			 
			 if(ajaxResponse.lstRadiologyTestDto[0].error != "" && ajaxResponse.lstRadiologyTestDto[0].error != null){
			 $("#chkErrorY").prop("checked", "checked");
			 $("#txtComment4").show();
			 $("#txtComment4").val(ajaxResponse.lstRadiologyTestDto[0].error); }
			 
			 if(ajaxResponse.lstRadiologyTestDto[0].history != "" && ajaxResponse.lstRadiologyTestDto[0].history != null){
			 $("#txtComment5").val(ajaxResponse.lstRadiologyTestDto[0].history); }
			 
		}
	});

}
function saveTestDetails() {	var testId = $("#viewtest").val();   
var treatId = parseInt($("#TID").text());   
var patId = parseInt($("#patientId").text().trim()); 

if (testId == undefined || testId == "") {
	testId = $("#TestID").text();
}
if (testId == 0 || testId == "") {
	alert("Please Select Test First");
	return false;
}
if (patId == "" || treatId == "") {
	patId = parseInt($("#Pid").text());
	treatId = parseInt($("#TID").text());
}
var coRelationVal = $("#txtComment1").val();
var redoScanVal = $("#txtComment2").val();
var relatedReactionVal = $("#txtComment3").val();
var errorVal = $("#txtComment4").val();
var history = $("#txtComment5").val();

//aniket/26NOV2020/ flags added for radio

var clinicalCorrelationFlag = $("input[name=clinicalCorrelation]:checked").val();
var redoScanFlag = $("input[name=redoScan]:checked").val();
var contrastReactionFlag = $("input[name=contrastReaction]:checked").val();
var incidentFlag = $("input[name=incident]:checked").val();



if (coRelationVal == "" && redoScanVal == "" && relatedReactionVal == ""
		&& errorVal == "" && history == "") {
	alert("Please save Q-OIndicators first...");
	return false;
}

if (coRelationVal == "" || coRelationVal == undefined
		|| coRelationVal == null) {
	coRelationVal = "-";
}
if (redoScanVal == undefined || redoScanVal == "") {
	redoScanVal = "-";
}
if (relatedReactionVal == undefined || relatedReactionVal == "") {
	relatedReactionVal = "-";
}
if (errorVal == undefined || errorVal == "") {
	errorVal = "-";
}
if (history == undefined || history == "") {
	history = "-";
}

var inputs = [];
inputs.push('coRelationVal=' + coRelationVal);
inputs.push('redoScanVal=' + redoScanVal);
inputs.push('relatedReactionVal=' + relatedReactionVal);
inputs.push('errorVal=' + errorVal);
inputs.push('history=' + history);
inputs.push('testId=' + testId);
inputs.push('treatId=' + treatId);
inputs.push('patId=' + patId);

//aniket/26NOV2020
inputs.push('clinicalCorrelationFlag=' + clinicalCorrelationFlag);
inputs.push('redoScanFlag=' + redoScanFlag);
inputs.push('contrastReactionFlag=' + contrastReactionFlag);
inputs.push('incidentFlag=' + incidentFlag);

var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ris/savetTestDetails",
	timeout : 1000 * 60 * 5,
	catche : false,
	error : function() {
		// alert("error");
	},
	success : function(r) {
		ajaxResponse = r;
		alert(r);
		$("#divDetailsForm").hide();
		//fetchTestDetails(testId);
		//saveCrtReportTemp();
	}
});
}

function fetchServicescat(TestID) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(TestID)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicList('radioservices', response);
		}
	});
}
var RisImageTemp = "<div class='col-sm-12-1 scroller' style='margin-top:-21px; overflow-y: scroll;  height: 250px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'  style='margin-left: -20px; width: 103.2%;''>"
		+ "<tbody>"
		+ "{#foreach $T.lstRisImageUploadDTO as img}"
		+ "<tr>"
		+ "<td class='col-md-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "<td class='col-md-7 center' style='height: 21.5px;'><a href='RisImageReadServlet?name={$T.img.imageName}'target='_blank' style='color:black;'>{$T.img.imageName}</a></td>"
		+ "<td class='col-md-4 center' style='height: 21.5px;'>{new Date($T.img.createdDate).toLocaleDateString()}</td>"
		+ "</tr>{#/for}</tbody></table></div>";

function fetchImage(testid) {

	var idRadiologyTest = parseInt($("#Idradiology").html());
	var TestID = parseInt($("#TestID").text());
	var pId = parseInt($("#patientsId").val());
	
	var TID = parseInt($("#TID").html());
	
	count = 1;
	var inputs = [];
	
	inputs.push('tid=' + TID);
	inputs.push('testID=' + testid);
	inputs.push('idRadiologyTest=' + idRadiologyTest);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "ehat/ris/fetchImageTest",
		url : "ehat/ris/fetchRISDocuments",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 alert("error");
		},
		success : function(r) {
			
			if (!$.trim(r)){  
				
			}
			else{   
				setRISDocuments(r);
			}
			
			
		}
	});
}

function savePhoto() {

	var fileText = " ";

	var idRadiologyTest = parseInt($("#Idradiology").html());
//	var TestID = parseInt($("#TestID").text());
	
//	var TestID = parseInt($("#idTestRadiology").val());
	var TestID =  parseInt(getUrlParameter("TestID"));
	
	
	if(TestID == "null" || TestID == undefined || TestID ==0 || isNaN(TestID)){
		TestID = $("#idTestRadiology").val();
	}
	var patientId = $("#patientsId").val();
	
	//fields below added by aniket_kanse/24NOV2020
	var treatmentId = parseInt($("#TID").html());
	var documentName = $("#risDocName").val();
	var comment = $("#risDocComment").val();

	var idRadiologyTestReport = $("#idRadiologyTestReport").val();
	
	if (documentName == "" || documentName == "undefined" || documentName == undefined || documentName == null) {
		alert("Please enter document name ");
		return false;
	}
	
	var form = $("#fileUploadform")[0];
	if ( document.getElementsByName("uploadRISDocs").length == 0 || $("#fileUp").val() == "") {
		alert("Please select file");
		return false;
	}
	
	
	var doctorDeskFile = getFileValue('fileUp');
	
	var data = new FormData(form);
	data.append("idRadiologyTestReport", idRadiologyTestReport);
	data.append("risFile", doctorDeskFile);
	data.append("treatmentId", treatmentId);
	data.append("radiologyTestId", idRadiologyTest);
	data.append("patientId", patientId);
	data.append("testId", TestID);
	data.append("documentName", documentName);
	data.append("comment", comment);
	data.append("uploadRISDocs", doctorDeskFile);
	
	jQuery.ajax({
		async : true,
		type : "POST",
		enctype: 'multipart/form-data',
		data : data,
//		url : "ehat/ris/saveUploadedPhotoRis",
		url : "ehat/ris/uploadRisDocs",
		processData : false,
		contentType : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r == 1) {
		//		alertify.success("Document saved sucessfully");
				alert("Document saved sucessfully");
			}else if (r == 2) {
		//		alertify.success("Document updated sucessfully");
				alert("Document updated sucessfully");
			}
			
			$("#fileUp").val("");
			$("#fileUp").val('');
			$("#risDocName").val("");
			$("#risDocComment").val("");
			//$(".active").removeClass("active");
		    $("#uploadDocTabButton").addClass("active");
		    location.reload();
		}
	});
}


// added, aniket kanse
function getFileValue(id){
	
	
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		
		return val.name;
	});
	return document;
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('#patImg').attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}
function risReportPrint()
{

	   var pageType = getUrlParameter("pageType");
	   var testid = $("#TestID").text();
	   if(testid =="" || testid == null || testid == "null"){
		   testid = getUrlParameter("Idradiology");
	   }
	    var patID = $("#patientId").text();
	    if(patID=="null"||patID==""||patID==undefined ||patID=="-"){
			patID= $("#PID").html();
		}
	    
	   var treatID = $("#TID").html();
	   var radiologyTestId = $("#idradTestName").text();

	    window.open(("ehat_RISReportPrint.jsp?" + "testId="
	                       + (testid) + "&patID="
	                       + encodeURIComponent(patID) + "&treatID="
	                       + encodeURIComponent(treatID)+"&radiologyTestId="
	                       + encodeURIComponent(radiologyTestId)
	                       +"&pageType="+pageType));
	   


  // }, 300);
}

function fetchServicescat(TestID) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(TestID)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicList('radioservices', response);
		}
	});
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getPatientDataByTidris(r) {

	var deptID = 0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			// setTempPatientRecords(r);
			console.log(r);
			var fileName=r.listRegTreBillDto[0].imageName;	
			$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			$("#patientId").text(r.listRegTreBillDto[0].centerPatientId);
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName);
			$("#billNo").text(r.listRegTreBillDto[0].billId);
			$("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);

			dept = r.listRegTreBillDto[0].departmentId;
			$("#drid").val(r.listRegTreBillDto[0].doctorId);
			$("#pid").val(r.listRegTreBillDto[0].patientId);

			// ****hidden set for bmi****//
			// alert("dob"+r.listRegTreBillDto[0].dob);
			$("#dbirth").val(r.listRegTreBillDto[0].dob);
			// alert(r.listRegTreBillDto[0].weight);
			$("#weight1").val(r.listRegTreBillDto[0].weight);
			$("#height1").val(r.listRegTreBillDto[0].height);

			$("#sex").text(r.listRegTreBillDto[0].gender);
			deptID = r.listRegTreBillDto[0].departmentId;
			$("#pId").val(r.listRegTreBillDto[0].patientId);
			$("#bId").val(r.listRegTreBillDto[0].billId);
			$("#tId").val(r.listRegTreBillDto[0].treatmentId);
			$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
			$("#sId").val(r.listRegTreBillDto[0].serviceId);
			$("#ipdNo").text(r.listRegTreBillDto[0].trcount);
			
			var tretmentcnt = r.listRegTreBillDto[0].trcount;
			
			if(tretmentcnt != ""||tretmentcnt != "-")
				{
				var splitedValue = [];
				 splitedValue = tretmentcnt.split("/");
				if(splitedValue[0]=="DIG")
					{
					$("#ipdlabel").text("Diagnostic No:");
					
					}else if(splitedValue[0]=="OPD")
					{
						$("#ipdlabel").text("OPD No:");
					}else{
						
						$("#ipdlabel1").text("IPD No:"); // change id same id get confused to all over ()befpre Id=ipdlabel)
						
					}
				
				}
			
			
			/* ****Added By Sagar***** */
			if (r.listRegTreBillDto[0].sourceTypeId > 0) {

				$("#billCategoty").text("Sponsor");
				$("#corporate").text(r.listRegTreBillDto[0].categoryName);

			} else {
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
			}

			$("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
			$("#chargesSlaveId").val(
					r.listRegTreBillDto[0].chargesMasterSlaveId);
			 var disDate = r.listRegTreBillDto[0].dischargeDate;
		  	 var disTime = r.listRegTreBillDto[0].dischargeTime;
			  	$("#dod").html(disDate+" "+disTime) ;
			  	var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');
			  	$("#doa").text(date);
			  	
			  	$("#refDoctor").text(r.listRegTreBillDto[0].docNameChan);
			  	
			  	
		}
	});
	return deptID;
}

//code by Sanjay Kr. Shah for Patient Search in Current and pevious RIS on 03-17-2018

function searchrispat(type) {
	
	var patId = parseInt($("#patid").val());
	
//	var patId = $("#patid").val();	// added by aniket kanse, 26/8/22 (patient_id = UHID)
//	alert("--patId--" + patId);
	
//	return;
	
//	debugger;
	
	if(patId == "" || isNaN(patId)){
//	if(patId == ""){
		
	//	alert("--if--");
		
		var flag = $("#pageType").html();
		var type = "search";
		var TID = "";
		var count = 1;
		
		var date1 = ($("#date1").val()).split("-").reverse().join("-");
		var date2 = ($("#date2").val()).split("-").reverse().join("-");
		var inputs = [];
		inputs.push('date1=' + date1);
		inputs.push('date2=' + date2);
		inputs.push('type=' + type);
		inputs.push('flag=' + flag);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/ris/searchPatienBetweenDate",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {

					},
					success : function(r) {
						
						
				//		alert(JSON.stringify(r));
					
						if(typeof date1 != "undefined" || typeof date2 != "undefined"){
							if(flag==1){
								
								$("#studTabD").setTemplate(searchPatienBetweenDate);
								$("#studTabD").processTemplate(r);
								$("#studTabD1").hide();
								$("#studTabD").show();
							}else{
								
								if(r.listRadiologyDTO.length=="" ||r.listRadiologyDTO.length== 0){
									alert("Data is not present");
								}else{
								$("#studTabD1").setTemplate(searchPatienBetweenDate1);
								$("#studTabD1").processTemplate(r);
								$("#studTabD").hide();
								$("#studTabD1").show();
								}
						}
					}
					}
				});
	}
	
	else{
//		alert("else");
		
	var flag = $("#pageType").html();
	var TID = "";
	var count = 1;
	var patName = $("#patname").val().trim();
	
	var inputs = [];
	inputs.push('tid=' + TID);
	inputs.push('type=' + type);
	inputs.push('flag=' + flag);
//	inputs.push('patId=' + patId);		// added by aniket kanse, 26/8/22 (patient_id = UHID)
	
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ris/getAllRadiologyDetail",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
		//			alert(JSON.stringify(r));
					
					if(patId != "" || patId != 0){
							if(flag==1){
								
			//					alert("flag 1 : " + flag);
								
								$("#studTabD").setTemplate(searchByPatientId);
								$("#studTabD").processTemplate(r);
								$("#studTabD1").hide();
								$("#studTabD").show();
							}else{
								
				//				alert("flag 2 : " + flag);
								
								$("#studTabD1").setTemplate(searchByPatientId1);
								$("#studTabD1").processTemplate(r);
								$("#studTabD").hide();
								$("#studTabD1").show();
						}
					}
					$("#patid").val("");
				}
			});
	
	var searchByPatientId = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if $T.pl.patientId == " +patId+" && $T.pl.groupName != 'Gamma'}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"				// aniket
		+ "{#if $T.pl.radUrgentFlag == '2'}"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"			// aniket
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "{#if $T.pl.arrivalTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>{#/if}"
		+ "{#if $T.pl.takenTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";
	
	
	var searchByPatientId1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if $T.pl.patientId == " +patId+"}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"
	//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"		
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"				// aniket
		+ "{#if $T.pl.radUrgentFlag == '2'}"
	//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"			// aniket
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
	//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"								// aniket
//		+ "<td class='col-md-2-1' style='height: 21.5px;'>{$T.pl.patientName}</td>"
//		+ "<td class='col-md-2-1' style='height: 21.5px;'>{$T.pl.testName}</td>"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
//		+ "<td class='col-md-1-1 ' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";

	
	
	}
}

function FetchDataOfTodayOnly(todays_date) {
	var flag = $("#pageType").html();
	var type = "search";
	var TID = "";
	var count = 1;
	var patId = $("#patid").val().trim();
	var patName = $("#patname").val().trim();
	var inputs = [];
	inputs.push('todays_date=' + todays_date);
	inputs.push('type=' + type);
	inputs.push('flag=' + flag);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ris/getAllRadiologyDetailByDate",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					if(typeof todays_date != "undefined"){
						if(flag==1){
							$("#studTabD").setTemplate(searchBytodays_date);
							$("#studTabD").processTemplate(r);
							$("#studTabD1").hide();
							$("#studTabD").show();
						}else{
							if(r.listRadiologyDTO.length=="" ||r.listRadiologyDTO.length== 0){
								alert("Data is not present");
							}else{
							$("#studTabD1").setTemplate(searchBytodays_date1);
							$("#studTabD1").processTemplate(r);
							$("#studTabD").hide();
							$("#studTabD1").show();
							}
					}
				}
				}
			});
}
var searchBytodays_date = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl} {#if $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "{#if $T.pl.arrivalTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/>{$T.pl.arrivalTime}</td>{#/if}"
	+ "{#if $T.pl.takenTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/>{$T.pl.takenTime}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+"{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";


var searchBytodays_date1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+"{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/for}</tbody></table></div>";

function searchPatientByName(type) {
	
	var flag = $("#pageType").html();
	
//	alert("flag-: " + flag);
	
	var TID = "";
 //	var patientId="";
	var patName="";
	var textType="";
	var patientId = $("#patid").val();
	var patName = $("#patname").val().trim();
	if(isNaN(patName)){
		textType="inputString";
		
	}else{
		textType="inputInteger";
	}
	if(patName == "" || patName == null){
		
		patName = "";
	}
	if(patientId == "" || patientId == null){
		
		patientId = 0;
	}
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('patName=' + patName);
	inputs.push('type=' + type);
	inputs.push('flag=' + flag);
	inputs.push('textType=' + textType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ris/searchPatienByName",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					
			//		alert(JSON.stringify(r));
			//		return;
					if(r.listRadiologyDTO == null){
						window.location.reload();
						
					}else{
					count=1;
					if(patName != undefined || patName != ""){
						if(flag==1){
							$("#studTabD").setTemplate(searchPatienByName);
							$("#studTabD").processTemplate(r);
							$("#studTabD1").hide();
							$("#studTabD").show();
							}
//						}else{
							/*if(r.listRadiologyDTO.length=="" ||r.listRadiologyDTO.length== 0){
								alert("Data is not present");
							}*/else{
							//var srNo=1;
							$("#studTabD1").setTemplate(searchPatienByName1);
							$("#studTabD1").processTemplate(r);
							$("#studTabD").hide();
							$("#studTabD1").show();
							}
					}
				}
				}
			});
}
var searchPatienByName = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	//+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.treatmentFlag == 'Y' && $T.pl.groupName != 'Gamma'}"
	+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "{#if $T.pl.arrivalTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/>{$T.pl.arrivalTime}</td>{#/if}"
	+ "{#if $T.pl.takenTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/>{$T.pl.takenTime}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+"{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";


var searchPatienByName1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.treatmentFlag == 'N' && $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
    + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+"{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";

var searchPatienBetweenDate = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "{#if $T.pl.arrivalTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/>{$T.pl.arrivalTime}</td>{#/if}"
	+ "{#if $T.pl.takenTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/>{$T.pl.takenTime}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+"{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";


var searchPatienBetweenDate1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";

function FetchDataOfyesterday(yestrDay) {
	var flag = $("#pageType").html();
	var type = "search";
	var TID = "";
	var count = 1;
	var inputs = [];
	inputs.push('yestrDay=' + yestrDay);
	inputs.push('type=' + type);
	inputs.push('flag=' + flag);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ris/getAllRadiologyDetailByyestrDay",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					if(typeof yestrDay != "undefined"){
						if(flag==1){
							$("#studTabD").setTemplate(searchByyesterday);
							$("#studTabD").processTemplate(r);
							$("#studTabD1").hide();
							$("#studTabD").show();
						}else{
							if(r.listRadiologyDTO.length=="" ||r.listRadiologyDTO.length== 0){
								alert("Data is not present");
							}else{
							$("#studTabD1").setTemplate(searchByyesterday1);
							$("#studTabD1").processTemplate(r);
							$("#studTabD").hide();
							$("#studTabD1").show();
							}
					}
				}
				}
			});
}
var searchByyesterday = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
    + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 ' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "{#if $T.pl.arrivalTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/>{$T.pl.arrivalTime}</td>{#/if}"
	+ "{#if $T.pl.takenTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/>{$T.pl.takenTime}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>" 
	+ "{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";


var searchByyesterday1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"			//aniket
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"		//aniket
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
    + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 ' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";

function defaultViewTestRIS(){

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/ris/risTestgroupBy",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				
				},
				success : function(r) {
					
					$("#radiologyTestType").setTemplate(
										"<option value='0'>Select</option>{#foreach $T.testList as tl}<option value='{$T.tl.underSubSer}'>{$T.tl.underSubSer}</option>{#/for}");
						$("#radiologyTestType").processTemplate(r);
				}
			});
}

function setRisTestgroupBy() {
	var type = "search";
	var flag = $("#pageType").html();
	var groupTestName = $("#radiologyTestType").val();
	
	var inputs = [];
	inputs.push('type=' + type);
	inputs.push('flag=' + flag);
	inputs.push('groupTestName=' + groupTestName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ris/searchByGropuName",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					var count =1;
						if(flag==1){
							$("#studTabD").setTemplate(searchByGroup);
							$("#studTabD").processTemplate(r);
							$("#studTabD1").hide();
							$("#studTabD").show();
						}else{
							if(r.listRadiologyDTO.length=="" ||r.listRadiologyDTO.length== 0){
								alert("Data is not present");
							}else{
							$("#studTabD1").setTemplate(searchByGroup1);
							$("#studTabD1").processTemplate(r);
							$("#studTabD").hide();
							$("#studTabD1").show();
							}
					}
				}
			});
}
var searchByGroup = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if  $T.pl.groupName != 'Gamma'}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"

		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"				
		+ "{#if $T.pl.radUrgentFlag == '2'}"

		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"			
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
        + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>" //Annapurna 29/8/2023
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "{#if $T.pl.arrivalTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>{#/if}"
		+ "{#if $T.pl.takenTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";
		
		var searchByGroup1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if  $T.pl.groupName != 'Gamma'}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"	
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"				
		+ "{#if $T.pl.radUrgentFlag == '2'}"	
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"			
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	    + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>" //Annapurna 29/8/2023
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";


/*var searchByGroup11 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if  $T.pl.groupName != 'Gamma'}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"

		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"				
		+ "{#if $T.pl.radUrgentFlag == '2'}"

		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"			
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
        + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>" //Annapurna 29/8/2023
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignDate}</td>"		
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "{#if $T.pl.arrivalTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>{#/if}"
		+ "{#if $T.pl.takenTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";
*/

function clinicalInstructionNote() {

	var idRadiologyTest = getUrlParameter("idradTestName");
	var inputs = [];
	inputs.push('idRadiologyTest=' + idRadiologyTest);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/clinicalInstructionNote",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			 $("#instViewRis").val(r.testList[0].radiologyInstruction);
			 $("#clnoteViewRis").val(r.testList[0].radiologyClinicalNote);
		}
	});
}

// aniket
function saveCreatedRISReport(){
	
	var pageType = getUrlParameter("pageType");
	var templateId = $("#risTemplateList").val();
	var templateName = $("#risTemplateList").find('option').filter(':selected').text(); // aniket 03DEC2020
	//alert("--templateName-- :: " + templateName);
//	var patId = $("#patientId").text();
//	var patId = parseInt($("#patientId").text());
	var patId = parseInt($("#patientsId").val());
	
//	alert("--patId-- :: " + patId);
	
	var radiologyTestId = $("#radiologyTestId").text();
	var testId = $("#TestID").html();
	var templateTypeId = $("#selRisCrTempList1").val();
	var treatmentId = $("#TID").text();
	var templateData = CKEDITOR.instances["Riseditor1"].getData();
	var nuclearMedicineTemp = "";
	
	// aniket 26 8 22
	// nuclearMedicineTemp = CKEDITOR.instances["RiseditorSubjective1"].getData();
	if(templateData == "" || templateData == undefined){
		alert("Please Enter Data to Create Report !");
		return false;
	}
	
	if(pageType=="Nuclear"){
		nuclearMedicineTemp = CKEDITOR.instances["RiseditorSubjective1"].getData();
		if(nuclearMedicineTemp == "" || nuclearMedicineTemp ==undefined){
			alert("Please Enter Data to Create Report !");
			return false;
		}
	}
	var idRadiologyTestReport = $("#createUpdateReportId").val();
	
	//alert("idRadiologyTestReport :: " + idRadiologyTestReport);
	
	var inputs = [];
	inputs.push('idRadiologyTestReport=' + idRadiologyTestReport); //added later to modify flow
	inputs.push('templateId=' + templateId);
	inputs.push('templateName=' + templateName);
	inputs.push('testId=' + testId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('templateTypeId=' + templateTypeId);
	inputs.push('patientId=' + patId);
	inputs.push('radiologyTestId=' + radiologyTestId);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('nuclearData=' + encodeURIComponent(nuclearMedicineTemp));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/saveCreatedRISReport",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			
			alert("RIS Report Saved !");

			/*window.location = "ehat_ViewRis.jsp?" + "&Tid=" + treatmentId+ "&Pid=" + patId+ "&TestID=" + testId
			+ "&idradTestName=" + radiologyTestId + "&pageType=" + pageType;*/
			
			window.location = "ehat_view_ris_new.jsp?" + "&Tid=" + treatmentId+ "&Pid=" + patId+ "&TestID=" + testId
			+ "&idradTestName=" + radiologyTestId + "&pageType=" + pageType + "&testReportId=" + r;		//aniket/05/11/2020
			
			$("#btnEditReport").attr('disabled', true);
			$("#btnCreReport").attr('disabled', true);
			
		}

	});

	
}

//Added By Annapurna serach data from begining
var searchByFromBegining = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if  $T.pl.groupName != 'Gamma'}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"

		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"				
		+ "{#if $T.pl.radUrgentFlag == '2'}"

		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"			
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
        + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>" //Annapurna 29/8/2023
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "{#if $T.pl.arrivalTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/>{$T.pl.arrivalTime}</td>{#/if}"
		+ "{#if $T.pl.takenTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/>{$T.pl.takenTime}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";
		
		var searchByFromBegining1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if  $T.pl.groupName != 'Gamma'}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"	
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"				
		+ "{#if $T.pl.radUrgentFlag == '2'}"	
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"			
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
	    + "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>" //Annapurna 29/8/2023
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";
	
	
		
function FetchDataOfFromBegining(fromBegining) {
	var type = "fromBegining";
	var flag = $("#pageType").html();
	var TID = "";
	var count = 1;
	var patName = $("#patname").val().trim();
	
	var inputs = [];
	inputs.push('tid=' + TID);
	 inputs.push('type=' + type);
	inputs.push('flag=' + flag);
	
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ris/getAllFromBegining",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
		//			alert(JSON.stringify(r));
					
					
							if(flag==1){
								
			//					alert("flag 1 : " + flag);
								
								$("#studTabD").setTemplate(searchByFromBegining);
								$("#studTabD").processTemplate(r);
								$("#studTabD1").hide();
								$("#studTabD").show();
							}else{
								
				//				alert("flag 2 : " + flag);
								
								$("#studTabD1").setTemplate(searchByFromBegining1);
								$("#studTabD1").processTemplate(r);
								$("#studTabD").hide();
								$("#studTabD1").show();
						}
					
					$("#patid").val("");
				}
			});
	
	
	}