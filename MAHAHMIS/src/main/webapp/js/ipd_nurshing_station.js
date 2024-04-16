var docNameUser= " ";


// set nurshing chart  on IPD Nurshing Station
function toCreateDivForNurshing() {

var rowCount = $('#nurChartId1 tbody tr').length;
	
	rowCount=parseInt(rowCount+1);
	var htm = "";

	htm = htm
		+ '<tr class="newStudyRowOvamPickUp" id="count'+ rowCount+' ">'
	      +'<td style="height: 21.5px; width: 24px;">'
			+ rowCount
			+ '</td><td	style="height: 21.5px; width: 55.5px;"><input type="text" class="form-control input-SmallText TextFont" name="textfield" id="t'
			+ rowCount
			+ '" value="" readonly="readonly" /></td>'
			+ '<td style="height: 21.5px; width: 58px;" id="sel'
			+ rowCount
			+ '"><select style="width: 90%; font-size: 11px;" name="headNote'
			+ rowCount
			+ '" id="headNote' + rowCount + '" onchange="getNotesbyHeadnoteId(this.id, ' + rowCount + ')"></select></td>'
			+ '<td style="height: 21.5px; width: 58px;"><input type="text" class="form-control input-SmallText TextFont auto" name="textfield"'
			+ ' onkeyup=setAutoNursingNotes(\"note'
			+ rowCount
			+ '\",\"onload\",\"IPD_NursingStation\")'
			+ ' id="note'
			+ rowCount
			+ '" value=""/></td>'
			
			
			/*+ '<td style="height: 21.5px; width: 48px;" id="sign'
			+ rowCount
			+ '"><select style="width: 90%; font-size: 11px;" name="NSDocName'
			+ rowCount
			+ '" id="NSDocName'
			+ rowCount
			+ '" onchange=docOrNurSet(($(this).val()),'
			+ (rowCount)
			+ ',(this.id)) >'
         	+ '</select></td>'*/
			
			+ '<td style="height: 21.5px; width: 48px;" id="sign'
			+ rowCount
			+ '"><select style="width: 90%; font-size: 11px;" name="NSDocName'
			+ rowCount
			+ '" id="NSDocName'
			+ rowCount
			+ '" onchange=openPasswordPopUp(($(this).val()),'
			+ (rowCount)
			+ ',(this.id)) >'
         	+ '</select></td>'
         	
         	+'<td style="height: 21.5px; width: 23px;"><input type="checkbox"  class="nurtr" name="checkbox'
         	
			+ rowCount
			+ '"   id="checkbox" value="0" /></td><input type="hidden" id="id'
			+ rowCount + '"/>'
			
			+'<td style="height: 21.5px; width: 23px;"></td><input type="hidden" value="0" id="masterId'
			+ rowCount + '"/>'
		  
			
			+ "</tr>";
	
	$("#nurChartIdBody").append(htm);

	$('#t' + rowCount).attr('readonly', 'readonly');
	$('#t' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 5
	});

	
	//setDoctorTempleteOnLoad("NSDocName" + rowCount, rowCount);
	getAllDoctorList("NSDocName" + rowCount);
	//setAutoNursingNotes("note"+rowCount, "onload", "IPD_NursingStation");
	getHeadingNotesOnNurshing("headNote" + rowCount);
	
	
	
	//fetchAllNursingNotes("temp", rowCount);
	
	//$("#NSDocName" + rowCount).select2();	
	
}
// set doctor list on nurshing chart template
function getAllDoctorList(dropDownId){
	var doctorId = 0;
	var callFrom = "speciality";
	
	var person = {
		doctor_id : doctorId,
        unitId : $("#unitId").val(),
        userId : $("#txtUserId").val(),
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
        url			: 'ehat/register/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	var htm = "<option value=0>--Select--</option>";
        	for ( var i = 0; i < r.lstDoctorBySpecialization.length; i++) {

        		htm = htm + "<option value="+r.lstDoctorBySpecialization[i].doctor_id+">"+r.lstDoctorBySpecialization[i].doc_name+"</option>";
        	}
        	$("#"+dropDownId).html(htm);
        	$("#"+dropDownId).select2();
        }        
    });
	
}
//open password pop up
function openPasswordPopUp(value, row, rowid) {
	$("#nurshingrowCount").val(row);
	$("#userUpdate").val(value);
	$('#iPackage').show('show');
	
	/*var preTreat = $("#preTreat").val();
	if(preTreat=="Y"){
		$("#saveBtn").hide();
		$("#iPackage").hide();
		$("#saveIPDServNusring").hide();
		$("#ipdPrintBtn").hide();
		$("#ipdPrintBtn").attr("disabled","disabled");
		$("#deleteIPDServicesLabel").attr("disabled","disabled");
	}*/
	


}

function saveNurshingChartDetails(){
	var datePick=$("#date-pick").val();
	var rowCount=$("#nurshingrowCount").val();
	var masterId=$("#masterId" + rowCount + "").val();
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var password=$("#password").val();
	var time=$("#t" + rowCount + "").val();
	if(time == null || time == "undefined" || time == undefined || time == "" || time == "null"){
		alert("Please Select time ");
		return false;
	}
	var headNote=$("#headNote" + rowCount + "").val();
	if(headNote == null || headNote == "undefined" || headNote == undefined || headNote == "" || headNote == "null"){
		headNote=0;
	}
	var note=$("#note"+ rowCount + "").val();
	if(note == null || note == "undefined" || note == undefined || note == "" || note == "null"){
		note=" ";
	}
	var NSDocNameId=$("#NSDocName"+ rowCount + "").val();
	var doctorName=$("#NSDocName" + rowCount +" option:selected").text();
	
	var headNoteName=$("#headNote" + rowCount +" option:selected").text();
	
	var inputs = [];
	
	inputs.push('id=' + masterId);
	
	inputs.push('checkUpdTime=' + time);
	
	inputs.push('headingNote=' + headNote);
	
	inputs.push('note=' + note);
	
	inputs.push('nurseId=' + NSDocNameId);
	
	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('unitId=' + unitId);
	
	inputs.push('userId=' + userId);
	
	inputs.push('password=' + password);
	inputs.push('doctorName=' + doctorName);
	inputs.push('headingName=' + headNoteName);
	inputs.push('dateVital=' + datePick);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/saveNurshingChartDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				hidePopupNursingChart();
				getNurchingChartDetails();
			}else if(r==2) {
				alert("Record Updated Successfully");
				hidePopupNursingChart();
				getNurchingChartDetails();
			}else if(r==3) {
				alert("Please Enter Correct Password");
			
			}
			else {
				alert("Network Issue..");
			}

		}
	});
	 
	
}

function getNurchingChartDetails(){
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var date=$("#date-pick").val();
	var userId=$("#txtUserId").val();
	var inputs = [];
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('date=' + date);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getNurchingChartDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			var rowCount=1;
			$("#nurChartIdBody").html(" ");
			var htm = "";
		
			for(var i=0; i < r.length;i++  ){
				
			htm = htm
				+ '<tr class="newStudyRowOvamPickUp" id="count'+ rowCount+' ">'
			      +'<td style="height: 21.5px; width: 24px;">'
					+ rowCount
					+ '</td><td	style="height: 21.5px; width: 55.5px;"><input type="text" class="form-control input-SmallText TextFont" name="textfield" id="t'
					+ rowCount
					+ '" value='+r[i].checkUpdTime+' readonly="readonly" /></td>'
					+ '<td style="height: 21.5px; width: 58px;" id="sel'
					+ rowCount
					+ '"><select style="width: 90%; font-size: 11px;" name="headNote'
					+ rowCount
					+ '" id="headNote'
					+ rowCount
					+ '" onchange="nurseValueSet($(this).val(),'
					+ rowCount
					+ ')"></select></td>'
					+ '<td style="height: 21.5px; width: 58px;"><input type="text" class="form-control input-SmallText TextFont auto" name="textfield"'
					+ ' onkeyup=setAutoNursingNotes(\"note'
					+ rowCount
					+ '\",\"onload\",\"IPD_NursingStation\")'
					+ ' id="note'
					+ rowCount
					+ '" value='+r[i].note+'></td>'
					
					
					/*+ '<td style="height: 21.5px; width: 48px;" id="sign'
					+ rowCount
					+ '"><select style="width: 90%; font-size: 11px;" name="NSDocName'
					+ rowCount
					+ '" id="NSDocName'
					+ rowCount
					+ '" onchange=docOrNurSet(($(this).val()),'
					+ (rowCount)
					+ ',(this.id)) >'
		         	+ '</select></td>'*/
					
					+ '<td style="height: 21.5px; width: 48px;" id="sign'
					+ rowCount
					+ '"><select style="width: 90%; font-size: 11px;" name="NSDocName'
					+ rowCount
					+ '" id="NSDocName'
					+ rowCount
					+ '" onchange=openPasswordPopUp(($(this).val()),'
					+ (rowCount)
					+ ',(this.id)) >'
		         	+ '</select></td>'
		         	
		         	+'<td style="height: 21.5px; width: 23px;"><input type="checkbox" name="checkbox' 
		         	
					+ rowCount
					+ '"   id="checkbox" value='+r[i].id+' "/></td><input type="hidden" id="id'
					+ rowCount + '"/>'
					
					+'<td style="height: 21.5px; width: 23px;"></td><input type="hidden" value='+r[i].id+' id="masterId'
					+ rowCount + '"/>'
				  
					
					+ "</tr>";
			rowCount++;
		

			$('#t' + rowCount).attr('readonly', 'readonly');
			$('#t' + rowCount).datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 5
			});

			
			//setDoctorTempleteOnLoad("NSDocName" + rowCount, rowCount);
		//	getAllDoctorList("NSDocName" + rowCount);
			//setAutoNursingNotes("note"+rowCount, "onload", "IPD_NursingStation");
			
			}
			
			
			$("#nurChartIdBody").append(htm);
			var count=1;
			for(var i=0; i < r.length;i++ ){
				getAllDoctorList("NSDocName" + (i+1));
				$("#NSDocName"+(i+1)).select2('val',r[i].nurseId);
			}
			
			for(var i=0; i < r.length;i++ ){
				getHeadingNotesOnNurshing("headNote" + (i+1));
				$("#headNote"+(i+1)).select2('val',r[i].headingNote);
			}
			//fetchAllNursingNotes("temp", rowCount);
			
			//$("#NSDocName" + rowCount).select2();	
			

		}
	});
	 
}

function removeNurshingChartDetails(){
	
	var allVals = [];
	var userId=$("#txtUserId").val();
	
	$.each($('#checkbox:checked'), function() {
		var id=$(this).val();
		if(id > 0){
			allVals.push(id);
		}
		else{
			$('.'+"nurtr"+':checkbox:checked').parents("tr").remove();
			return 0;
		}
		
		
	});
	
	
if(allVals.length!=0){
	var inputs = [];
	
	inputs.push('ids=' + allVals);
	inputs.push('userId=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/deleteNusrshingDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Deleted Successfully");
				
				//getNurshingDrugAdministartionlist();
				getNurchingChartDetails();
				
				//window.location.reload(true);
			}else {
				alert("Network Issue..");
			}

		}
	});
}
	 
}


function setNurshingTemplateList(cType){


	sr = 1;
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	var cType = $("#cType :selected").val();
	
	if (cType == "NursingChart" || cType == undefined) {
		$("#save").hide();
		$("#addDivNC").show();
		$("#remDivNC").show();
		//fillDIC($("#date-pick").val());
		$("#chartSlaveTemp").hide();
		$("#times").hide();
		$("#IPD_DICContent").show();
		$("#chartAddTemp").show();
		$("#printButton").show();
		$("#nurshingChartDiv").show();

	} else if (cType == "1" || cType == "2") {
		$("#chartSlaveTemp").hide();
		$("#nurshingChartDiv").hide();
		$("#IPD_DICContent").show();
		$("#addDivNC").hide();
		$("#remDivNC").hide();
		$("#times").hide();
		$("#printButton").hide();
		$("#save").show();
		$("#chartAddTemp").show();
		//var tid = $("#trid").html();
		 docNameUser= $("#txtUserName").val();
		 
		
		
		if(cType == "1"){
			$("#IPD_DICContent").setTemplate(postOperationChartAdminTempOnNusrshing);
			$("#IPD_DICContent").processTemplate();
			$("#save").show();
			var saveChartSlaveSaveButton = '<input type="button" value="Save Now" class="btn btn-xs btn-success editUserAccess" onclick="saveNurshingPostOperation()" disabled="disabled">';
			$("#save").html("");
			$("#save").setTemplate(saveChartSlaveSaveButton);
			$("#save").processTemplate();
			getPostIntensvisit(1);
		}else if(cType == "2"){
			$("#IPD_DICContent").setTemplate(intencivistAdminTempOnNusrshing);
			$("#IPD_DICContent").processTemplate();
			$("#save").show();
			var saveChartSlaveSaveButton = '<input type="button" value="Save Now" class="btn btn-xs btn-success editUserAccess" onclick="saveNurshingIntensivist()" disabled="disabled">';
			$("#save").html("");
			$("#save").setTemplate(saveChartSlaveSaveButton);
			$("#save").processTemplate();
			getPostIntensvisit(2);
		}
		
		//getChartReportNew(tid, cType);

	} else if (cType == "4" || cType == "5") {
		$("#nurshingChartDiv").hide();
		$("#chartSlaveTemp").show();
		$("#IPD_DICContent").hide();
		$("#times").hide();
		$("#addDivNC").hide();
		$("#remDivNC").hide();
		$("#printButton").hide();
		$("#chartAddTemp").show();
		setInputOutputTemp(cType);
		getIputOutputList(cType);
		getListOfInputOutputDetails();
	} 
	else if(cType == "3"){
		
		$("#chartSlaveTemp").show();
		$("#nurshingChartDiv").hide();
		$("#IPD_DICContent").hide();
		$("#addDivNC").hide();
		$("#remDivNC").hide();
		$("#times").show();
		$("#printButton").hide();
		$("#save").show();
		$("#chartAddTemp").hide();
		var saveChartSlaveSaveButton = '<input type="button" value="Save Now" class="btn btn-xs btn-success editUserAccess" onclick="saveNurshingVitals()" disabled="disabled">';
		$("#save").html("");
		$("#save").setTemplate(saveChartSlaveSaveButton);
		$("#save").processTemplate();
		//getIpdVitalList();
		setVitalsTemp();
	}
	
	else {

		if (cType == "" || cType == undefined) {
			cType = 1;
		}
		
		
		//$("#chartSlaveTemp").show();
		$("#nurshingChartDiv").hide();
		$("#IPD_DICContent").hide();
		$("#addDivNC").hide();
		$("#remDivNC").hide();
	//	$("#times").show();
		$("#printButton").hide();
	//	$("#save").show();
		$("#chartAddTemp").hide();
	//	var saveChartSlaveSaveButton = '<input type="button" value="Save Now" class="btn btn-xs btn-success editUserAccess" onclick="saveNurshingVitals()" disabled="disabled">';
	//	$("#save").html("");
	//	$("#save").setTemplate(saveChartSlaveSaveButton);
	//	$("#save").processTemplate();
		//setVitalsTemp();
	}
	
	/*if(cType != "NursingChart" && cType != 1 && cType != 2){
		count = 1;
		var trid=$("#tr_Id").val();//added by paras
		//var trid=$("#treatmentId").val();//added by paras
		var inputs = [];
		inputs.push('action=defaultChartSlaveView');
		inputs.push('cType=' + cType);
		inputs.push('tid=' + pobj1.trid);
		inputs.push('tid=' + trid);
		inputs.push('date=' + $("#date-pick").val());
		var str = inputs.join('&');

		if (cType == "Select") {
			$("#addDiv").hide();
			$("#remDiv").hide();
			$("#chartSlaveTemp").hide();
			$("#times").hide();
			$("#IPD_DICContent").hide();
			$("#save").hide();
			// location.reload(true);
		} else {
			//alert("ss");
			jQuery.ajax({
						async : false,
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
							$("#chartObj").html(ajaxResponse);
							pobj1 = eval('(' + ajaxResponse + ')');

							if (cType == 4 || cType == 5) {
								$("#chartAddTemp").setTemplate(defaultInputOutput);
								$("#chartAddTemp").processTemplate(pobj1);
							} else { // vitals
								$("#vitalsbody").setTemplate(defaultChartViewTempNew);
								$("#vitalsbody").processTemplate(pobj1);
							}

							if (cType == 4) {
								$('#time').datetimepicker({
									datepicker : false,
									format : 'H:i',
									step : 5
								});
								
								setDefaultChartTemp();
								
							} else if (cType == 5) {
								$("#chartTitle").html("Add Output Chart:");
								$('#time').datetimepicker({
									datepicker : false,
									format : 'H:i',
									step : 5
								});
								
								setDefaultChartTemp();
								
							}
						}
					});
		}
	}*/
	disableIpdNursingChart1();
	$("#save1").hide();
	var preTreat = $("#preTreat").val();
	if(preTreat=="Y"){
		$("#saveBtn").hide();
		$("#iPackage").hide();
		$("#saveIPDServNusring").hide();
		$("#ipdPrintBtn").hide();
		$("#pharmacyMedicine").hide();
		$("#save").hide();
	    $('#chartAddTemp').find('input, select').attr('disabled', 'disabled');
        $("#ipdPrintBtn").attr("disabled","disabled");
    	setTimeout(function() {
        $('#userMangTemp').find('.deleteUserAccess').remove("onclick");
        $('#userMangTemp').find('button').attr('disabled', 'disabled');}, 200);
	}

	
}


function setDefaultChartNamesOnNurshing() {

	var cType = $("#cType :selected").val();

	if (cType == "" || cType == undefined || cType == "Select") {
		cType = 1;
	} else if (cType == "4" || cType == "5") {
		$("#save").html("");
		/*var inputs = [];
		inputs.push('action=defaultChartNames');
		inputs.push('cType=' + cType);
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
						
						var ajaxResponse = r;
						var pobj1 = decodeURIComponent(ajaxResponse);
						pobj1 = eval('(' + pobj1 + ')');
						var htmlChartTemplate = "<option value='Select'>-Select-</option>";

						setTimeout(function() {

							for ( var int = 0; int < (pobj1.lichrt.length); int++) {
								htmlChartTemplate += ("<option value='" + (pobj1.lichrt[int].chrtid) + "'>"
										+ (pobj1.lichrt[int].cname) + "</option>");
							}
							$("#chartNm").html(htmlChartTemplate);
						}, 1000);
					}
				});*/
	}
	disableIpdNursingChart1();
}

function disableIpdNursingChart1() {
	
	setTimeout(function() {
		var callFor = ($("#callFor").val()).trim();
		if (callFor === "previousTreatmentIPD") {
			$("#ipdNursingStationJSPHeadDiv *").prop("disabled", true);
			$("#date-pick").prop("disabled", false);
			/* select tag */
			$("#cType").prop("disabled", false);
			/* option tag */
			$("#cType *").prop("disabled", false);
			// $("#ipdServicesVerticalTab *").prop("disabled", false);
			$("#save").prop("disabled", true);
		}
	}, 1000);
	setTimeout(function(){userAccess();},100);
};


function setInputOutputTemp(cType){
	
	if (cType == "Select") {
		$("#addDiv").hide();
		$("#remDiv").hide();
		$("#chartSlaveTemp").hide();
		$("#times").hide();
		$("#IPD_DICContent").hide();
		$("#save").hide();
		// location.reload(true);
	} 
	
	if (cType == 4 || cType == 5) {
		$("#chartAddTemp").setTemplate(defaultInputOutputOnNurshing);
		$("#chartAddTemp").processTemplate(pobj1);
	} else { // vitals
		$("#vitalsbody").setTemplate(defaultChartViewTempNew);
		$("#vitalsbody").processTemplate(pobj1);
	}

	if (cType == 4) {
		$('#time').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 5
		});
		
		setDefaultChartTempOnNurshing();
		
	} else if (cType == 5) {
		$("#chartTitle").html("Add Output Chart:");
		$('#time').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 5
		});
		
		setDefaultChartTempOnNurshing();
		
	}
}

function setDefaultChartTempOnNurshing() {
	$("#userMangTemp").setTemplate(defaultChartTempOnNurshing);
	$("#userMangTemp").processTemplate();
	/*
	var total=0;
	var cType = $("#cType").val();
	
	var trid=$("#tr_Id").val();//added by paras
	var chart_date = $("#date-pick").val();
	
	var input = [];
	input.push('action=getExistingInputCharts');
	input.push('cType=' + cType);
	input.push('trid=' + trid);
	input.push('chart_date=' + chart_date);
	var str = input.join('&');

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
			ajaxResponse = r;
	
			$("#InputChartDiv").html(ajaxResponse);
			result = eval('(' + ajaxResponse + ')');
			
			count = 1;
			$("#userMangTemp").setTemplate(defaultChartTempOnNurshing);
			$("#userMangTemp").processTemplate(result);
			
			for(var i=0; i<result.lichrt.length;i++){
				total = total + parseInt(result.lichrt[i].value);
			}
			$("#Total").val(total);
			setTimeout(function(){userAccess();},100);
		}
	});*/
}

var defaultInputOutputOnNurshing = "<div class='divide-20'></div>"
	+ "<div id='infoDiv' class='col-md-4-1' "
	+ "	style='border: 1px solid #ddd; height: 350px;margin-left: 2%;margin-bottom: 2%;'>"
	+ "<div><h3 id='chartTitle' style='margin-left:10%;'>Add Input Chart:</h3></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:20px;'>"
	+ "<div class='divide-10'></div>"
	+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Time'>Time<b style='color: red; padding-left: 3px;'>*</b></label>"
	+ "<input id='time' name='time' type='text' placeholder='Time' "
	+ "class='form-control input-SmallText col-md-6-1' readonly='readonly' /></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-10'></div>"
	+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Chart Name'>Chart Name<b style='color: red; padding-left: 3px;'>*</b></label>"
	+ "<select id='chartNm' name='chartNm' class='col-md-6-1'></select></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-10'></div>"
	+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Key'>Key</label>"
	+ "<input id='key' name='key' type='text' placeholder='Key' "
	+ "class='form-control input-SmallText col-md-6-1' required='true' maxlength='44'/></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-10'></div>"
	+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Value'>Value<b style='color: red; padding-left: 3px;'>*</b></label>"
	+ "<input id='value' name='value' type='text' placeholder='Value' onkeypress='return validateNumbers(event)'"
	+ "class='form-control input-SmallText col-md-6-1' required='true' maxlength='44'/></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-10'></div>"
	+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Unit'>Unit</label>"
	+ "<input id='unit' name='unit' type='text' placeholder='Unit'"
	+ "class='form-control input-SmallText col-md-6-1' maxlength='44'/></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1 center' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-10'></div>"
	+ "<button class='btn btn-xs btn-success editUserAccess' value='SAVE' id='saveBtn' onClick='saveInputOutputNurshingChart()' disabled='disabled'>"
	+ "Save Chart</button></div>"
	+ "<input id='queryType' value='insert' type='hidden' />"
	+ "<input type='hidden' id='chrtid' value='0' />"
	+ "</div>"
	+ "<div id='userMangTemp' class='col-md-7-1' style='margin-left: 4%;margin-bottom: 2%; height: 350px;'></div>"
	+ "<div class='divide-20'>" + "</div>";

var defaultChartTempOnNurshing = "<div class='col-sm-12-1'>"
	+ "<div class='divide-10'></div>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Time</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Chart Name</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Key</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Value</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Unit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 275px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody id='inputOutputBody'>"
	/*+ "{#foreach $T.lichrt as lichrt}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lichrt.time}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.cname}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.key}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.value}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.unit}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit{count}' onclick='editInputOutputChartDetails({$T.lichrt.id})' disabled='disabled'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete{count}' onclick='deleteInputOutputChartDetails({$T.lichrt.id})' disabled='disabled'>"
	+ "<i class='fa fa-trash-o'></i>"
	+ "</button>"
	+ "</td>"
	+ "</tr>"
	+ "{#/for}"*/
	+ "</tbody>"
	+ "</table>"
	+ "</div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;padding-leftt: 40%;'>"
	+ "<div class='divide-10'></div>"
	+ "<label class='TextFont col-md-1-1' style='margin-left:52%;margin-top: -1%;' for='Total'>Total</label>"
	+ "<input id='Total' name='Total' type='text' placeholder='Total' readonly='readonly'"
	+ "class='form-control input-SmallText col-md-3-1' maxlength='44'/></div>";

// set input or ouput list on inputouput chart in nurshing station
function getIputOutputList(cType){
	
	$("#save").html("");
	var inputs = [];

	inputs.push('cType=' + cType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/tempchartcontroller/administratortempletchartslave",
		
		error : function() {
			alert('error');
		},
		success : function(r) {
			var htm = "<option value=0>--Select--</option>";
			for ( var i = 0; i < r.listChartType.length; i++) {

				htm = htm + "<option value="+r.listChartType[i].idchartTypeTbl+">"+r.listChartType[i].name+"</option>";
			}
			$("#chartNm").html(htm);
			$("#chartNm").select2();
			setTimeout(function(){userAccess();},100);
		}
	});
}

function saveInputOutputNurshingChart(){
	
	var id=$("#chrtid").val();
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var time=$("#time").val();
	var chartId = $("#chartNm :selected").val();
	var chartName = $("#chartNm :selected").text();
	var cType = $("#cType").val();
	var key = $("#key").val();
	var value = $("#value").val();
	var value2= value.trim();
	var unit = $("#unit").val();
	var datePick = $("#date-pick").val();
	var inputs = [];
    
	  inputs.push('id=' + id);
	  inputs.push('treatmentId=' + treatmentId);
	  inputs.push('time=' + time);
	  inputs.push('chartId=' + chartId);
	  inputs.push('cName=' + chartName);
	  inputs.push('userId=' + userId);
	  inputs.push('unitId=' + unitId);
	  inputs.push('cType=' + cType);
	  inputs.push('constant=' + key);
	  inputs.push('value=' + value2);
	  inputs.push('unit=' + unit);
	  inputs.push('dateVital=' + datePick);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/saveInputOutputNurshingChart",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				getListOfInputOutputDetails();
				clearInputOutputFileds();
			}else if(r==2) {
				alert("Record Updated Successfully");
				getListOfInputOutputDetails();
				clearInputOutputFileds();
			}
			else {
				alert("Network Issue..");
			}

		}
	});
}

function getListOfInputOutputDetails(){
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	
	//var cType = $("#cType :selected").val();
	var cType = $("#cType").val();
	if(cType=='NursingChart' || cType=='Select'){
		return 0;
	}
	
	var chart_date = $("#date-pick").val();
	var inputs = [];
	
	var total=0;
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('cType=' + cType);
	inputs.push('vitalDate=' + chart_date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getListOfInputOutputDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
		
			var rowCount=0;
			$("#inputOutputBody").html(" ");
			var htm = "";
		
			for(var i=0; i < r.lstChartInfo.length;i++  ){
				rowCount++;
				
				htm=htm + "<tr>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+rowCount+"</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.lstChartInfo[i].time+"</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.lstChartInfo[i].cName+"</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.lstChartInfo[i].constant+"</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.lstChartInfo[i].value+"</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.lstChartInfo[i].unit+"</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit' onclick='editChartInfo("+r.lstChartInfo[i].id+")' >"
				+ "<i class='fa fa-edit'></i>"
				+ "</button>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete' onclick='deleteInputOutputDetails("+r.lstChartInfo[i].id+")' >"
				+ "<i class='fa fa-trash-o'></i>"
				+ "</button>"
				+ "</td>"
				+ "</tr>";
				
				
				total = total + parseInt(r.lstChartInfo[i].value);
			}
			
			
			$("#inputOutputBody").append(htm);
			$("#Total").val(total);
			
			

		}
	});
	 
}

function editChartInfo(id){

	var inputs = [];
	
	inputs.push('id=' + id);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/editChartInfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#chrtid").val(r.id);
			$("#time").val(r.time);
			 $("#chartNm").select2('val',r.chartId);
			 $("#cType").val(r.cType);
			 $("#key").val(r.constant);
			 $("#value").val(r.value);
			 $("#unit").val(r.unit);
		}
	});
}

function clearInputOutputFileds(){
	$("#chrtid").val(0);
	$("#time").val(" ");
	 $("#chartNm").select2('val',0);
	// $("#cType").val(" ");
	 $("#key").val(" ");
	 $("#value").val(" ");
	 $("#unit").val(" ");
}

function deleteInputOutputDetails(id){

	var inputs = [];
	var userId=$("#txtUserId").val();
	inputs.push('id=' + id);
	inputs.push('userId=' + userId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/deleteInputOutputDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r==1){
				alert("Record Deleted Successfully ");
				getListOfInputOutputDetails();
			}else{
				alert("Network Issues..");
			}
		}
	});
}

var postOperationChartAdminTempOnNusrshing = " <div class='col-sm-8-1'>"
	+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>#</label></th>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>Post Operation(hrs.)</label></th>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>Sign</label></th>"
	+ "</tr>"
	+ "</thead>"
	+ "</table>"
	+ "</div>"
	+ "<div id='DRRDiv' class='col-sm-8-1' style='margin-top:-22px; border: 1px solid #ddd; overflow-y:scroll; height: 220px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "<tr id='div1'>"
		+ "<td style='height: 21.5px; width: 79px;'>1.</td>"
		+ "<td style='height: 21.5px; width: 519px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='operationTime' value=''	onkeypress='return validateNumbers(event)' />"
		+ "</td>"
		+ "<td style='height: 21.5px;'  id='1' ></td>"
		+ "</tr>" 
		+ "<input type='hidden' value='1' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' value='0' id='postOperationId' name='txtRowCount' />"
		+ "<input type='hidden' value='1' id='addRowCount' /><input type='hidden' value='1' id='RowCount' />"
		+ "</tbody>" 
		+ "</table>" + "</div>";

var intencivistAdminTempOnNusrshing = " <div class='col-sm-8-1'>"
	+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th style='height: 21.5px; width: 80px;'><label class='TextFont'>#</label></th>"
	+ "<th style='height: 21.5px; width: 519px;'><label class='TextFont'>Intensivist</label></th>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>Sign</label></th>"
	+ "</tr>"
	+ "</thead>"
	+ "</table>"
	+ "</div>"
	+ "<div id='DRRDiv' class='col-sm-8-1' style='margin-top:-22px; border: 1px solid #ddd; overflow-y:scroll; height: 220px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "<tr id='div1'>"
		+ "<td style='height: 21.5px; width: 79px;'>1.</td>"
		+ "<td style='height: 21.5px; width: 519px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='intensivitTime' value=''	onkeypress='return validateNumbers(event)' />"
		+ "</td>"
		+ "<td style='height: 21.5px;'   id='1'></td>"
		+ "</tr>" 
		+ "<input type='hidden' value='0' id='intensvisitId' name='txtRowCount' />"
		+ "<input type='hidden' value='1' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' value='1' id='addRowCount' /><input type='hidden' value='1' id='RowCount' />"
		+ "</tbody>" 
		+ "</table>" + "</div>";



function  setVitalsTemp() {
	var cType = 3
	var inputs = [];

	inputs.push('cType=' + cType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/tempchartcontroller/administratortempletchartslave",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setVitalsTempList(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}


function setVitalsTempList(r){
	
	var rowCount=0;
	$("#vitalsbody").html(" ");
	var htm = "";

	for(var i=0; i < r.listChartType.length;i++  ){
		rowCount++;
		htm=htm
		+ "<tr id='remove{count}'>"
		+ "<td class='center' style='height: 21.5px; width: 30px;'>"+rowCount+"</td>"
		+ "<td class='' style='height: 21.5px; width: 270px;' id='cname"+rowCount+"'>"+r.listChartType[i].name+"</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='8am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='8am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='9am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='9am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='10am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='10am"+rowCount+"' value='0'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='11am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='11am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='12am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='12am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='1pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='1pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='2pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='2pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='3pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='3pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='4pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='4pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='5pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='5pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='6pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='6pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='7pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='7pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='8pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='8pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='9pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='9pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='10pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='10pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='11pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='11pm"+rowCount+"' value='0'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='12pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='12pm"+rowCount+"' value='0'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='1am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='1am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='2am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='2am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='3am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='3am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='4am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='4am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='5am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='5am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='6am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='6am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='7am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='7am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<input type='hidden' value='0' id='masterId"+rowCount+"' name='idskco"+rowCount+"' />"
		+ "<input type='hidden' value='0' id='vitalId"+r.listChartType[i].idchartTypeTbl+"' name='idskco"+rowCount+"' />"
		+ "</tr>";
	}
	$("#vitalsbody").append(htm);
	
	//added by vishant to freeze seleted column
	$(".table-multi-columns").freezeTable({
		  'columnNum' : 2,
		});
	
	$("#vitalBodyLength").val(r.listChartType.length);
	getIpdVitalList();
}

function  setVitalsTempBlank() {
	var cType = 3
	var inputs = [];

	inputs.push('cType=' + cType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/tempchartcontroller/administratortempletchartslave",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setVitalsTempListBlank(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function setVitalsTempListBlank(r){
	
	var rowCount=0;
	$("#vitalsbody").html(" ");
	var htm = "";

	for(var i=0; i < r.listChartType.length;i++  ){
		rowCount++;
		htm=htm
		+ "<tr id='remove{count}'>"
		+ "<td class='center' style='height: 21.5px; width: 30px;'>"+rowCount+"</td>"
		+ "<td class='' style='height: 21.5px; width: 270px;' id='cname"+rowCount+"'>"+r.listChartType[i].name+"</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='8am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='8am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='9am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='9am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='10am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='10am"+rowCount+"' value='0'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='11am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='11am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='12am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='12am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='1pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='1pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='2pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='2pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='3pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='3pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='4pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='4pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='5pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='5pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='6pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='6pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='7pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='7pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='8pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='8pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='9pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='9pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='10pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='10pm"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='11pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='11pm"+rowCount+"' value='0'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='12pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='12pm"+rowCount+"' value='0'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='1am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='1am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='2am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='2am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='3am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='3am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='4am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='4am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='5am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='5am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='6am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='6am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='7am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='7am"+rowCount+"' value='0' />"
		+ "</td>"
		+ "<input type='hidden' value='0' id='masterId"+rowCount+"' name='idskco"+rowCount+"' />"
		+ "<input type='hidden' value='0' id='vitalId"+r.listChartType[i].idchartTypeTbl+"' name='idskco"+rowCount+"' />"
		+ "</tr>";
	}
	$("#vitalsbody").append(htm);
	
	$("#vitalBodyLength").val(r.listChartType.length);
	//getIpdVitalList();
}

function saveNurshingVitals(){
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var vitalList = {
			lstChartReport : []
		};
	
	var vitalLength=$("#vitalBodyLength").val();
	
	
	for(var i=0; i < vitalLength ;i++  ){
		var cname =$("#cname" + (i + 1)).text();
		var id =$("#masterId" + (i + 1)).val();
		var vitalId =$("#vitalId" + (i + 1)).val();
		     var oneam  =$("#1am" + (i + 1)).val();
		var twoam = $("#2am" + (i + 1)).val();
		var threeam = $("#3am" + (i + 1)).val();
		var fouram = $("#4am" + (i + 1)).val();
		var fiveam = $("#5am" + (i + 1)).val();
		var sixam= $("#6am" + (i + 1)).val();
		var sevenam = $("#7am" + (i + 1)).val();
		var eightam = $("#8am" + (i + 1)).val();
		var nineam = $("#9am" + (i + 1)).val();
		var tenam = $("#10am" + (i + 1)).val();
		var elevenam= $("#11am" + (i + 1)).val();
		var twleveam = $("#12am" + (i + 1)).val();

		var onepm = $("#1pm" + (i + 1)).val();
		 var twopm= $("#2pm" + (i + 1)).val();
		var threepm = $("#3pm" + (i + 1)).val();
		var fourpm = $("#4pm" + (i + 1)).val();
		var fivepm = $("#5pm" + (i + 1)).val();
		var sixpm= $("#6pm" + (i + 1)).val();
		var sevenpm= $("#7pm" + (i + 1)).val();
		var eightpm = $("#8pm" + (i + 1)).val();
		var ninepm = $("#9pm" + (i + 1)).val();
		var tenpm = $("#10pm" + (i + 1)).val();
		var elevenpm = $("#11pm" + (i + 1)).val();
		var twlevepm = $("#12pm" + (i + 1)).val();
		var treatmentId=$("#treatmentId").val();
		var date = $("#date-pick").val();
		
		setvitalInfoList(vitalList, id,vitalId,oneam,twoam,threeam,fouram,fiveam,sixam,sevenam,eightam,nineam,tenam,elevenam
				,twleveam,onepm,twopm,threepm,fourpm,fivepm,sixpm,sevenpm,eightpm,ninepm,tenpm,elevenpm,twlevepm,
				treatmentId,date,unitId,userId,date,cname);
	}
	vitalList = JSON.stringify(vitalList);
	var inputs = [];
	
	inputs.push("vitalList="	+ encodeURIComponent(vitalList));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/saveIpdVitals",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				//getOPDPatientHistoryByTreatment();
				getIpdVitalList();
				//Added Byb Annapurna 
				//location.reload(true);
			}else {
				alert("Network Issue..");
			}

			
			

		}
	});
	
}

function setvitalInfoList(vitalList, id,vitalId,oneam,twoam,threeam,fouram,fiveam,sixam,sevenam,eightam,nineam,tenam,elevenam
		,twleveam,onepm,twopm,threepm,fourpm,fivepm,sixpm,sevenpm,eightpm,ninepm,tenpm,elevenpm,twlevepm,
		treatmentId,date,unitId,userId,date,cname){
	
	vitalList.lstChartReport.push({
		id : id,
		am1 : oneam,
		am2 : twoam,
		am3 : threeam,
		am4 : fouram,
		am5 : fiveam,
		am6 : sixam,
		am7 : sevenam,
		am8 : eightam,
		am9: nineam,
		am10 : tenam,
		am11 : elevenam,
		am12 : twleveam,
		pm1 : onepm,
		pm2 : twopm,
		pm3 : threepm,
		pm4 : fourpm,
		pm5 : fivepm,
		pm6 : sixpm,
		pm7 : sevenpm,
		pm8 : eightpm,
		pm9 : ninepm,
		pm10 : tenpm,
		pm11 : elevenpm,
		pm12 : twlevepm,
		userId : userId,
		unitId : unitId,
		treatmentId : treatmentId,
		vitalId : vitalId,
		dateVital : date,
		cname : cname,
		
		
	});
	
}

function  getIpdVitalList() {
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var todayDate=$("#date-pick").val();
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('todayDate=' + todayDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getIpdVitalList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIpdVitalsTempList(r);
			
	
			setTimeout(function(){userAccess();},100);
		}
	});
}

function setIpdVitalsTempList(r){

	
	//$("#vitalsbody").find("input").val(0);	//Added By Annapurna
	
	   if(r.lstChartReport.length > 0){
		   for(var i=0; i < r.lstChartReport.length;i++  ) {
			   	$("#masterId" + (i + 1)).val(r.lstChartReport[i].id);
				$("#vitalId" + (i + 1)).val(r.lstChartReport[i].vitalId);
				$("#1am" + (i + 1)).val(r.lstChartReport[i].am1);
				$("#2am" + (i + 1)).val(r.lstChartReport[i].am2);
				$("#3am" + (i + 1)).val(r.lstChartReport[i].am3);
				$("#4am" + (i + 1)).val(r.lstChartReport[i].am4);
				$("#5am" + (i + 1)).val(r.lstChartReport[i].am5);
				$("#6am" + (i + 1)).val(r.lstChartReport[i].am6);
				$("#7am" + (i + 1)).val(r.lstChartReport[i].am7);
				$("#8am" + (i + 1)).val(r.lstChartReport[i].am8);
				$("#9am" + (i + 1)).val(r.lstChartReport[i].am9);
			    $("#10am" + (i + 1)).val(r.lstChartReport[i].am10);
				$("#11am" + (i + 1)).val(r.lstChartReport[i].am11);
				$("#12am" + (i + 1)).val(r.lstChartReport[i].am12);

				$("#1pm" + (i + 1)).val(r.lstChartReport[i].pm1);
				$("#2pm" + (i + 1)).val(r.lstChartReport[i].pm2);
				$("#3pm" + (i + 1)).val(r.lstChartReport[i].pm3);
			    $("#4pm" + (i + 1)).val(r.lstChartReport[i].pm4);
				$("#5pm" + (i + 1)).val(r.lstChartReport[i].pm5);
				$("#6pm" + (i + 1)).val(r.lstChartReport[i].pm6);
			     $("#7pm" + (i + 1)).val(r.lstChartReport[i].pm7);
				 $("#8pm" + (i + 1)).val(r.lstChartReport[i].pm8);
				 $("#9pm" + (i + 1)).val(r.lstChartReport[i].pm9);
				 $("#10pm" + (i + 1)).val(r.lstChartReport[i].pm10);
				 $("#11pm" + (i + 1)).val(r.lstChartReport[i].pm11);
				 $("#12pm" + (i + 1)).val(r.lstChartReport[i].pm12);
		   }
		   
		   $("#chartObj").html(JSON.stringify(r));
	   }
	   else{
		   setVitalsTempBlank();
	   }
	  
		   
	  
}

function saveNurshingPostOperation(){
	
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var todayDate=$("#date-pick").val();
	var treatmentId=$("#treatmentId").val();
	var time=$("#operationTime").val();
	var id=$("#postOperationId2").val();
	var userName=$("#txtUserName").val();
	//id=0;
	
	var inputs = [];
		inputs.push('id=' + id);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitId);
		inputs.push('dateVital=' + todayDate);
		inputs.push('time=' + time);
		inputs.push('userId=' + userId);
		inputs.push('createdBy=' + userId);
		inputs.push('sign=' + userId);
		inputs.push('chartId=' + 1);
		inputs.push('userName=' + userName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/savePostIntensvisit",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				getPostIntensvisit(1);
			}else if(r == 2){
				alert("Record Updated Successfully");
				getPostIntensvisit(2);
			}else {
				alert("Network Issue..");
			}

		}
	});
}

function  getPostIntensvisit(chartType) {
	
	var cType = $("#cType :selected").val();
	chartType=cType;
	if(chartType=='NursingChart'){
		return 0;
	}
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var todayDate=$("#date-pick").val();
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('todayDate=' + todayDate);
	inputs.push('chartType=' + chartType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getPostIntensvisit",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		var userNm = $("#txtUserName").val();	
		//alert(userNm);
		var sampleBean=0;
		$("userName").val(userNm);
		
		//if (r.lstChartReport.length == 0) {
			
		//}
		
		if(r.lstChartReport.length>0){	
			if(chartType == 1){
				$("#IPD_DICContent").setTemplate(postOperationChartAdminTempOnNusrshing);
				
				$("#IPD_DICContent").processTemplate(sampleBean);
				$("#1").html(userNm);
				
				$("#operationTime").val(r.lstChartReport[0].time);
				$("#postOperationId2").val(r.lstChartReport[0].id);
			}else if(chartType == 2){
				$("#IPD_DICContent").setTemplate(intencivistAdminTempOnNusrshing);
				
				$("#IPD_DICContent").processTemplate(sampleBean);
				$("#1").html(userNm);
				
				$("#intensivitTime").val(r.lstChartReport[0].time);
				$("#intensvisitId2").val(r.lstChartReport[0].id);
				
			}
			setTimeout(function(){userAccess();},100);
			}
		else{
			if(chartType == 1){
				$("#IPD_DICContent").setTemplate(postOperationChartAdminTempOnNusrshing);
				
				$("#IPD_DICContent").processTemplate(sampleBean);
				$("#operationTime").val("");
				$("#postOperationId2").val(0);
				$("#1").html(userNm);
			}else if(chartType == 2){
				$("#IPD_DICContent").setTemplate(intencivistAdminTempOnNusrshing);
				
				$("#IPD_DICContent").processTemplate(sampleBean);
				$("#intensivitTime").val("");
				$("#intensvisitId2").val(0);
				$("#1").html(userNm);
				
			}
		}
		}
	});
}


function saveNurshingIntensivist(){
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var todayDate=$("#date-pick").val();
	var treatmentId=$("#treatmentId").val();
	var time=$("#intensivitTime").val();
	var id=$("#intensvisitId2").val();
	
	var userName=$("#txtUserName").val();
	
	var inputs = [];
		inputs.push('id=' + id);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitId);
		inputs.push('dateVital=' + todayDate);
		inputs.push('time=' + time);
		inputs.push('userId=' + userId);
		inputs.push('createdBy=' + userId);
		inputs.push('sign=' + userId);
		inputs.push('chartId=' + 2);
		inputs.push('userName=' + userName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/savePostIntensvisit",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				getPostIntensvisit(2);
			}else if(r == 2){
				alert("Record Update Successfully");
				getPostIntensvisit(2);
			}else {
				alert("Network Issue..");
			}

		}
	});
}


function saveNurshingCarePlan(){
	var id=$("#carePlanId").val();
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var carePlanNotes=$("#carePlanNotes").val();
	var treatmentId=$("#treatmentId").val();
	var patientId=$("#pt_Id").val();
	
	
	var inputs = [];
		inputs.push('id=' + id);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('patientId=' + patientId);
		inputs.push('carePlan=' + carePlanNotes);
		inputs.push('unitId=' + unitId);
		inputs.push('userId=' + userId);
		inputs.push('createdBy=' + userId);
		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/saveNurshingCarePlan",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				fetchNurshingCarePlan();
			}else if(r == 2){
				alert("Record Update Successfully");
				fetchNurshingCarePlan();
			}else {
				alert("Network Issue..");
			}

		}
	});

}

function fetchNurshingCarePlan(){

	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getNurshingCarePlan",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			if( r != ""){
				$("#carePlanNotes").val(r.carePlan);
				$("#carePlanId").val(r.id);
			}
		
			
			setTimeout(function(){userAccess();},100);
		}
	});

}
function saveNurshingPainScale(){
	var id=$("#painScaleId").val();
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var treatmentId=$("#treatmentId").val();
	var patientId=$("#pt_Id").val();
	var painScaleDate=$("#date-pick1").val();
	var painScale=$("#idPainMeasurementScaleOneDay").val();
	var location=$("#idLoc").val();
	var acute="N";
	if ($('#idAcute').is(":checked"))
	{
		acute="Y";
	}
	
	var chronic="N";
	if ($('#idChronic').is(":checked"))
	{
		chronic="Y";
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('unitId=' + unitId);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('painScaleDate=' + painScaleDate);
	inputs.push('painScale=' + painScale);
	inputs.push('location=' + location);
	inputs.push('acute=' + acute);
	inputs.push('chronic=' + chronic);
	
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/nurshingchart/saveNurshingPainScale",
	timeout : 1000 * 60 * 5,
	catche : false,
	error : function() {
		alert("error");
	},
	success : function(r) {
		response = r;
		if (r == 1) {
			alert("Record Saved Successfully");
			getNurshingPainScale();
		}else if(r == 2){
			alert("Record Update Successfully");
			getNurshingPainScale();
		}else {
			alert("Network Issue..");
		}

	}
	});
}

function getNurshingPainScale(){
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var painScaleDate=$("#date-pick1").val();
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('todayDate=' + painScaleDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getNurshingPainScale",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		 
			if( r != ""){
				$("#painScaleId").val(r.id);
				$("#date-pick1").val(r.painScaleDate);
				$("#idPainMeasurementScaleOneDay").val(r.painScale);
				$("#idLoc").val(r.location);
				
				if (r.acute == "Y")
				{
					$('#idAcute').prop('checked', true);
				}else{
					$('#idAcute').prop('checked', false);
				}
				
				
				if (r.chronic =="Y")
				{
					$('#idChronic').prop('checked', true);
				}else{
					$('#idChronic').prop('checked', false);
				}
			}
			
			else{
				
				$("#painScaleId").val(0);
				$("#date-pick1").val($("#date-pick1").val());
				$("#idPainMeasurementScaleOneDay").val("");
				$("#idLoc").val("");
				$('#idChronic').prop('checked', false);
				$('#idAcute').prop('checked', false);
			}
		
			
			setTimeout(function(){userAccess();},100);
		}
	});


}

function printNurshingPainScale(){
 
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var treatId = $("#tr_Id").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var unitId = $("#unitId").val();
	
	var deptId=2;
	 var pendFlag="N"; 
	 var recId=0;
    
    window.open("ipd_nurshing_pain_scale_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&fromDate="+fromDate+"&toDate="+toDate+"&unitId="+unitId);


}


function fetchChemoDetailSOnNurshing(){
	//alert("hii");
	var tId = $("#tr_Id").val();
	var pId = $("#pt_Id").val();
	var date = $("#date-pickForChemo").val();
	var date1=date.split("/");
	var chemoDate=date1[2]+"-"+date1[1]+"-"+date1[0];
	var inputs = [];
//	inputs.push('patId=' + pId);
	inputs.push('treatmentId=' + tId);
	inputs.push('userDate=' + chemoDate);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/editOPDChemoByTreatmentIdAndDate",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#ChemoOrderSheetContent").empty();
			$("#ChemoOrderSheetContent").setTemplate(ChemotemplateOnNurshing);
			$("#ChemoOrderSheetContent").processTemplate();
			if(r.chemoTheropyMasterId > 0){
				 $("#OrderDiv").html(" ");
				setChemoDeatilsOnNurshing(r);
			}
			
		}
	});
	
}

var ChemotemplateOnNurshing ="<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='' style='height: 21.5px; width: 3.05%;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-4-1 center' style='height: 21.5px;'><div class='TextFont'>Chemo Protocol</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Start Time</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Stop Time</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sign</div></th>"
	+ "<th class='col-md-4-1 center' style='height: 21.5px;'><div class='TextFont'>Remark</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; height: 425px; max-height: auto;'>"
	+ "<table class='table table-condensed table-bordered table-stripped cf' style='width : 100%;'>"
	+ "<tbody id='OrderDiv'>"
/*	+ "{#foreach $T.lstPatChemoOrderSheetdetials as lpcosd}"
	+ "<tr id='divD{count}' value='{$T.lpcosd.patOrderId}'>"
	+ "<td  style='height: 21.5px;  width: 3.05%; '>{count}.</td>"
	+ "<td  class='col-sm-4-1' style='height: 21.5px; '>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='' id='drugOrder{count}' value='{$T.lpcosd.chemoOrders}' readonly='readonly' /></td>"
	+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
	+ "<input class='form-control input-SmallText TextFont' name='sttime' id='sttime{count}' value='{$T.lpcosd.startTime}' onclick='setTimeOrderSheet(this.id)' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input class='form-control input-SmallText TextFont' name='sptime' id='sptime{count}' value='{$T.lpcosd.stopTime}' onclick='setTimeOrderSheet(this.id)' /></td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='staffName' id='staffName{count}' value='{$T.lpcosd.signPat}' /></td>"
	+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='Notes' id='Notes{count}' value='{$T.lpcosd.noteDose}' /></td>"
	+ "<input type='hidden' class='form-control input-SmallText TextFont' name='test' id='test{count}' value='{$T.lpcosd.patOrderId}' /></td>"
	+ "</tr>"
	+ "<input type='hidden' value='{count++}' id='drlcnt' />"
	+ "<input type='hidden' value='' id='nid{rowCount}' />"
	+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
	+ "{#/for} "
	+ "<input type='hidden' value='' id='addChemoOrderRowCount' />"
	+ "<input type='hidden' value='{--count}' id='drlRowCount' />"
	+ "<input type='hidden' class='form-control input-SmallText TextFont' name='pid' value='{$T.lpcosd.patId}' /></td>"*/
	+ "</tbody>" + "</table>" + "</div>";

function setChemoDeatilsOnNurshing(r){
	var htm="";
	var rowCount=1;
	  htm= htm+
		+ "<tr id='divD{count}' value='0'>"
		+ "<td  style='height: 21.5px;  width: 3.05%; '>"+rowCount+".</td>"
		+ "<td  class='col-sm-4-1' style='height: 21.5px; '>"
		+ "<input type='text' class='form-control input-SmallText TextFont' name='' id='drugOrder"+rowCount+"' value='"+r.chemotherapyProtocol+"' readonly='readonly' /></td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
		+ "<input class='form-control input-SmallText TextFont' name='sttime' id='sttime"+rowCount+"' value='"+r.startTime+"' onclick='setChemoTimeOnNurshing(this.id)' /></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input class='form-control input-SmallText TextFont' name='sptime' id='sptime"+rowCount+"' value='"+r.endTime+"' onclick='setChemoTimeOnNurshing(this.id)' /></td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText TextFont' name='staffName' id='staffName"+rowCount+"' value='"+r.sign+"' /></td>"
		+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText TextFont' name='Notes' id='Notes"+rowCount+"' value='"+r.remark+"' /></td>"
		+ "<input type='hidden' class='form-control input-SmallText TextFont' name='test' id='chemoMasterId"+rowCount+"' value='"+r.chemoTheropyMasterId+"' /></td>"
		+ "</tr>";
	  $("#OrderDiv").append(htm);
}
function setChemoTimeOnNurshing(id){
    $('#'+id).datetimepicker({
         datepicker:false,
         format:'H:i',
         step:15
         });
}

function updateChemoDetailsOnNurshing(){
	
	  var id=$("#chemoMasterId1").val();
	  
	  var startTime=$("#sttime1").val();
	  var stopTime=$("#sptime1").val();
	  var sign=$("#staffName1").val();
	  var remark=$("#Notes1").val();
	  
	  var inputs = [];
		inputs.push('id=' + id);
		inputs.push('startTime=' + startTime);
		inputs.push('stopTime=' + stopTime);
		inputs.push('sign=' + sign);
		inputs.push('remark=' + remark);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/nurshingchart/updateChemoDetailsOnNurshing",
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r == 1){
					alert("Record Saved Successfuuly");
				}else{
					alert("Network Issues");
				}
			}
		});
	  
}

function getChemoInfoOnNurshing(){
	var treatmentId = $("#tr_Id").val();

	
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	inputs.push('unitId=' + 1);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/getOPDChemoListByTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		

			if (r.getListOfOPDChemoTheropyDTO.length > 0) {

				var htm = "<div class='col-sm-12-1' style='margin-top:20px; border: 1px solid #ddd;'>"
						+ "<table class='table table-striped table-condensed cf'>"
						+ "<tbody>";
				for ( var i = 0; i < r.getListOfOPDChemoTheropyDTO.length; i++) {
					
					
					var createdDate = new Date(r.getListOfOPDChemoTheropyDTO[i].createdDateTime);
	              //  var    displayCreatedDate = createdDate.getDate().toString() + "-" + createdDate.getUTCMonth().toString() + "-" + createdDate.getFullYear();
					var displayCreatedDate= new Date(r.getListOfOPDChemoTheropyDTO[i].createdDateTime).toLocaleDateString('en-GB');
					var str = '"DataForPopUp_' + (i + 1) + '"';
					htm = htm
							+ "<tr>"
							+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>"
							+ (i + 1)
							+ "</td>"
							+ "<td class='col-sm-6-1 left' style='height: 21.5px;'>"
							+ r.getListOfOPDChemoTheropyDTO[i].chemotherapyProtocol
							+ "</td>"
							+ "<td class='col-sm-5-1 center' id ='PopUpChemoDate_"
							+ (i + 1)
							+ "' onclick = 'editOPDChemoByTreatmentIdAndDate("
							+ str + ")' style='height: 21.5px;'>"
							+ displayCreatedDate + "</td>" + "</tr>";

				}
				
				htm = htm + "</tbody>" + "</table>" + "</div>";
				$("#tableHistoryChemotherapy").html(htm);
			}
			$("#divHistoryChemotherapy").show();
		

		}
	});
	
	
}


var drugSheetTemp ="<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='' style='height: 21.5px; width: 3.05%;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Time</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Drug Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Strength</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dose</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Quantity</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Route</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Frequency</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sign</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; height: 425px; max-height: auto;'>"
	+ "<table class='table table-condensed table-bordered table-stripped cf' style='width : 100%;' id='drugTableId'>"
	+ "<tbody id='DrugDiv'>"
	/*+ "{#foreach $T.druglist as druglist}"
	+ "<tr id='divD{drugCount}'>"
	+ "<td  style='height: 21.5px;  width: 3.05%; '>{count++}.</td>"
	+ "<td  class='col-sm-1-1' style='height: 21.5px; '>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='time{drugCount}' id='time{drugCount}' value='{$T.druglist.DT}' readonly='readonly' /></td>"
	+ "<td class='col-sm-2-1' style='height: 21.5px;' id='sel{rowCount}'><input class='form-control input-SmallText TextFont' style='font-size: 11px;'  name='drugName{drugCount}' id='drugName{drugCount}' value='{$T.druglist.DName}' readonly='readonly' /></td>"
	+ "<td  class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='strength{drugCount}' id='strength{drugCount}' value='{$T.druglist.DS}' onkeypress='return validateNumbers(event)' onkeypress='makeUserselect({drugCount},\"DocName{drugCount}\")' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='dose{drugCount}' id='dose{drugCount}'onkeypress='return validateNumbers(event)' value='{$T.druglist.DD}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='qty{drugCount}' id='qty{drugCount}' onkeypress='return validateNumbers(event)' value='{$T.druglist.DQ}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='route{drugCount}' id='route{drugCount}' onkeypress='return validateNumbers(event)' value='{$T.druglist.DR}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='frequency{drugCount}' id='frequency{drugCount}' onkeypress='return validateNumbers(event)'  value='{$T.druglist.DF}' /></td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;' id='sign'>" 
	+ "<select style='font-size: 11px; margin-top:1%;' class='col-sm-10-1 form-control input-SmallText TextFont' name='DocName{drugCount}' id='DocName{drugCount}'" 
	+ " onclick='setDoctorTempleteforDrug((this.id),{drugCount}); this.onclick=null;' onchange='savePharmaMedicine(($(this).val()),{drugCount},(this.id))'> <option selected=selected value='{$T.druglist.DA}'>{$T.druglist.nname}</option></select>"
	+ "<input type='checkbox' id='Medcheckbox' name='Medcheckbox{drugCount++}' value='{$T.druglist.tnid}'></td>"
	+ "</tr>"
	+ "<input type='hidden' value='{$T.druglist.nid}' id='nid{rowCount}' />"
	+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
	+ "{#/for} "
	+ "<input type='hidden' value='' id='addDrugRowCount' />"
	+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"*/
	
	+ "</tbody>" + "</table>" + "</div>";

function setDrugTempSheet(){
	$("#DrugAdminSheetContent").setTemplate(drugSheetTemp);
	$("#DrugAdminSheetContent").processTemplate();
	getNurshingDrugAdministartionlist();
}


function toCreateDrugDiv(){
	
var rowCount = $('#drugTableId tbody tr').length;
	
	rowCount=parseInt(rowCount+1);
	var htm = "";
	

	htm = htm
		 + '<tr class="newStudyRowOvamPickUp" id="count'+ rowCount+' ">'
		+'<td  style="height: 21.5px;  width: 3%; text-align: center;"><label class="TextFont">'
			+ rowCount
			+ '</label></td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" class="form-control input-SmallText TextFont" name="textfield" id="time'
			+ rowCount
			+ '" value="" readonly="readonly" /></td>'
			+ '<td class="col-sm-2-1" style="height: 21.5px; id="sel'
			+ rowCount
			+ '">'
			+'<div id="divbyName">'
			+'<input style="font-size: 11px;" class="form-control input-SmallText TextFont"  name="drugName' 
			+ rowCount
			+ '" value="" onkeypress = "autoSuggestionForDrugMedicine(this.id,onchange,'+rowCount+')" id="drugName'
			+ rowCount
			+ '"/>'
			
			+'</div>'
			
			+'</td>'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)"  class="form-control input-SmallText TextFont" name="textfield" id="strength'
			+ rowCount
			+ '" value="" onkeypress="return validateNumbers(event)"/>'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text"  class="form-control input-SmallText TextFont" name="textfield" id="dose'
			+ rowCount
			+ '" value="" />'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont" name="textfield" id="qty'
			+ rowCount
			+ '" value=""  />'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateAlphabetsByRegEx(this.id)" class="form-control input-SmallText TextFont" name="textfield" id="route'
			+ rowCount
			+ '" value="" />'
			+ '<td class="col-sm-1-1 center" style="height: 21.5px;"><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont auto" name="textfield" onkeypress="return validateComma(event)"'
			+ ')"  id="frequency'
			+ rowCount
			+ '" value=""  /></td>'
			+ '<td class="col-sm-2-1 center" style="height: 21.5px;" id="sign'
			+ rowCount
			
			+ '"><select style=" font-size: 8px; margin-top:1%;" class="col-sm-10-1" name="DocName'
			+ rowCount
			+ '" id="DocName'
			+ rowCount
			+ '" onchange=openDrugPopUp(($(this).val()),'
			+ (rowCount)
			+ ',(this.id)) >'

			+ '</select><input type="checkbox" class="col-sm-1-1" style="margin-left:6%;" name="Medcheckbox'
			
			+ rowCount
			+ '"   id="Medcheckbox"/></td><input type="hidden" id="drugMasterId'
			+ rowCount + '" value="0"/></td>'
			+ "</tr>";
			
	
	$("#DrugDiv").append(htm);

	$('#time' + rowCount).attr('readonly', 'readonly');
	$('#time' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 5
	});

	//$("#mRow").val(rowCount);
	//$("#addDrugRowCount").val(k);
	//autoSuggestionForPharmacyMedicine("drugName" + rowCount, "onload");
	
	

	
	
	setTimeout(function() {
		getAllDoctorList("DocName" + rowCount);
		$("#DocName" + rowCount).select2();		
		//setDoctorTempleteforDrug("DocName" + rowCount, rowCount);
	}, 500);
}


function autoSuggestionForDrugMedicine(inputID,type,rowCount){
	var resultData = [];
	var findingName = $('#' + inputID).val();
	
	 var inputs = [];
		inputs.push('letter=' + findingName);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "ehat/nurshingchart/updateChemoDetailsOnNurshing",
			url : "./pharmacy/product/autoSuggestionProduct",
		//	url : "./pharmacy/drug/autoSuggestionDrug",
			error : function() {
				alert('error');
			},
			success : function(r) {/*
				
				var template = "";
				for ( var j = 0; j < r.length; j++) {
					
					var arrValue = r[j].drugId +"-"+r[j].drugName;
					var idValue = r[j].drugId;
					var patName = r[j].drugName;
					resultData.push({
						ID : idValue,
						Name : patName
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue
							+ '</a></li>';
				}
				
				setTimeout(function() {

					$("#div" + inputID + " .typeahead").html(template);
					$("#div" + inputID + " .typeahead").show();
					
					$("#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("#" + inputID).data('typeahead').source = resultData;
				}, 500);
			*/
				

				var availableTags = [];
				var resultData = [];
				var strengthName= r[0].strengthMaster.strengthName;
				var routeName= r[0].routeName;
				$("#strengthName").val(strengthName);
				$("#routeName").val(routeName);
				if (r.length > 0) {
					for ( var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId;
					}
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue+'_'+inputID,
						Name : arrValue[0],
						Strength: strengthName
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

				}
				$(".typehead1").html(template);
				$(".typehead1").show();

				setTimeout(function() {
					$("#"+inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true

					});
					$("#"+inputID).data('typeahead').source = resultData;
				}, 500);
			}
		});
		function displayResult(item) {/*

			var res = item.text.split('-');
			var patId = res[0];
			var patName = res[1];
			//var patMobile = res[2];
			
			$("#" + inputID).val(patName);	
			//getDrugNameById(patId);
		*/

			$('#strength'+rowCount).val($("#strengthName").val());
			$('#route'+rowCount).val($("#routeName").val());
			
			/*var hiddenRowC=$('#hiddenCurrentRow').val();
			var content = item.value.split("_");
			var text = item.text;
			var value = item.value;
			var rowCount= content[1];
			var id= content[0];
			
			$('#hiddenProductId'+rowCount).val(id);
			
			var inputs = [];
			inputs.push('productID=' + id);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./pharmacy/purchase/getTotalStockDetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$('#totalQty').val(r);
					$('#texttotalQty'+hiddenRowC).val(r);
				}
			});*/
			
			
		}
	
}

function getDrugNameById(drugId){
	var inputs = [];
	inputs.push('drugId=' + drugId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/drug/getDrugById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		   alert(r);
		}
	});
}



function openDrugPopUp(value, row, rowid) {
	/*var preTreat = $("#preTreat").val();
	if(preTreat=="Y"){
		$("#pharmacyMedicine").hide();
		}else{
			if(value == 0){
				
				alert("Please select user name");
				$('#pharmacyMedicine').hide('hide');
			  }else{
			      $("#userUpdate").val(value);
			     $('#pharmacyMedicine').show('show');
			}	
		}*/
	$("#userUpdate").val(value);
    $('#pharmacyMedicine').show('show');
	$("#drugMasterCount").val(row);

}

function hideDrugPopup() {
	$("#pharmaMedpassword").val("");
	$("#pharmacyMedicine").hide('hide');
}

function saveNurshingDrug(){
	var rowCount=$("#drugMasterCount").val();
	var id=$("#drugMasterId"+rowCount).val();
	var time=$("#time"+rowCount).val();
	var drugName=$("#drugName"+rowCount).val();
	var strength=$("#strength"+rowCount).val();
	var dose=$("#dose"+rowCount).val();
	var quantity=$("#qty"+rowCount).val();
	var route=$("#route"+rowCount).val();
	var frequency=$("#frequency"+rowCount).val();
	var doctorId=$("#DocName"+rowCount).val();
	var unitId=$("#unitId").val();
	var userId=$("#txtUserId").val();
	var treatmentId=$("#treatmentId").val();
	var password=$("#pharmaMedpassword").val();
	
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('time=' + time);
	inputs.push('drugName=' + drugName);
	inputs.push('strength=' + strength);
	inputs.push('dose=' + dose);
	inputs.push('quantity=' + quantity);
	inputs.push('route=' + route);
	inputs.push('frequency=' + frequency);
	inputs.push('doctorId=' + doctorId);
	inputs.push('password=' + password);
	
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/nurshingchart/saveNurshingDrugAdministration",
	timeout : 1000 * 60 * 5,
	catche : false,
	error : function() {
		alert("error");
	},
	success : function(r) {
		response = r;
		if (r == 1) {
			alert("Record Saved Successfully");
			getNurshingDrugAdministartionlist();
		}else if(r == 2){
			alert("Record Update Successfully");
			getNurshingDrugAdministartionlist();
		}else if(r == 2){
			alert("Please Enter  Correct password ");
			
		}
		else {
			alert("Network Issue..");
		}
		
		hideDrugPopup();
	}
	});
	
}


function NurshingDrugPopUp()
{
	$("#iPrintDrugPopUp").show('show');

}

function hideNurshingDrugPopUp() {
	$("#iPrintDrugPopUp").hide('show');
	$("#NewPopUp").hide('show');
	$("#allRadio").hide('show');

}

function getNurshingDrugAdministartionlist(){
	var treatmentId=$("#treatmentId").val();
	var unitId=$("#unitId").val();
	var dateDrug = $("#date-pickDrug").val(); 
	var inputs = [];
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('dateDrug=' + dateDrug);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getNurshingDrugAdministartionlist",
		
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDrugListOnNurshing(r);
			setTimeout(function(){userAccess();},100);
		}
	});


}

function setDrugListOnNurshing(r){
	
	var rowCount=0;
	$("#DrugDiv").html(" ");
	var htm = "";

	for(var i=0; i < r.lstNurshingDrugs.length;i++  ){
		rowCount++;
		htm=htm
		
		 + '<tr class="newStudyRowOvamPickUp" id="count'+ rowCount+' ">'
			+'<td  style="height: 21.5px;  width: 3%; text-align: center;"><label class="TextFont">'
				+ rowCount
				+ '</label></td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" class="form-control input-SmallText TextFont" name="textfield" id="time'
				+ rowCount
				+ '" value="'+r.lstNurshingDrugs[i].time+'" readonly="readonly" /></td>'
				+ '<td class="col-sm-2-1" style="height: 21.5px; id="sel'
				+ rowCount
				+ '">'
				+'<div id="divbyName">'
				+'<input style="font-size: 11px;" class="form-control input-SmallText TextFont"  name="drugName' 
				+ rowCount
				+ '" value="'+r.lstNurshingDrugs[i].drugName+'" onkeypress = "autoSuggestionForDrugMedicine(this.id,onchange,'+rowCount+')" id="drugName'
				+ rowCount
				+ '"/>'
				
				+'</div>'
				
				+'</td>'
				+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)"  class="form-control input-SmallText TextFont" name="textfield" id="strength'
				+ rowCount
				+ '" value="'+r.lstNurshingDrugs[i].strength+'" onkeypress="return validateNumbers(event)"/>'
				+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont" name="textfield" id="dose'
				+ rowCount
				+ '" value="'+r.lstNurshingDrugs[i].dose+'" onkeypress="return validateNumbers(event)" />'
				+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont" name="textfield" id="qty'
				+ rowCount
				+ '" value="'+r.lstNurshingDrugs[i].quantity+'"  />'
				+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateAlphabetsByRegEx(this.id)" class="form-control input-SmallText TextFont" name="textfield" id="route'
				+ rowCount
				+ '" value="'+r.lstNurshingDrugs[i].route+'" />'
				+ '<td class="col-sm-1-1 center" style="height: 21.5px;"><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont auto" name="textfield" onkeypress="return validateComma(event)"'
				+ ')"  id="frequency'
				+ rowCount
				+ '" value="'+r.lstNurshingDrugs[i].frequency+'"  /></td>'
				+ '<td class="col-sm-2-1 center" style="height: 21.5px;" id="sign'
				+ rowCount
				
				+ '"><select style=" font-size: 8px; margin-top:1%;" class="col-sm-10-1 form-control input-SmallText TextFont" name="DocName'
				+ rowCount
				+ '" id="DocName'
				+ rowCount
				+ '" onchange=openDrugPopUp(($(this).val()),'
				+ (rowCount)
				+ ',(this.id)) >'

				+ '</select><input type="checkbox" class="col-sm-1-1" style="margin-left:6%;" name="Medcheckbox'
				
				+ rowCount
				+ '"   id="Medcheckbox"   value="'+r.lstNurshingDrugs[i].id+'" /></td><input type="hidden" id="drugMasterId'
				+ rowCount + '" value="'+r.lstNurshingDrugs[i].id+'"/></td>'
				+ "</tr>";
	}
	
	$("#DrugDiv").append(htm);

	$('#time' + rowCount).attr('readonly', 'readonly');
	$('#time' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 5
	});
	
	//$("#nurChartIdBody").append(htm);
	
	for(var i=0; i < r.lstNurshingDrugs.length;i++ ){
		getAllDoctorList("DocName" + (i+1));
		$("#DocName"+(i+1)).select2('val',r.lstNurshingDrugs[i].doctorId);
	}
}


function removeNurshingChartDrugDetails(){
	var allVals = [];
	var userId=$("#txtUserId").val();
	$.each($('#Medcheckbox:checked'), function() {
		var id=$(this).val();
		if(id > 0)
		allVals.push(id);
		
	});
	
	
var inputs = [];
	
	inputs.push('ids=' + allVals);
	inputs.push('userId=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/deleteNusrshingDrugDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Deleted Successfully");
				
				getNurshingDrugAdministartionlist();
				//window.location.reload(true);
			}else {
				alert("Network Issue..");
			}

		}
	});
	 
}


function printNurshingDrug(){
	 
	var billId=0;
	var patId = $("#pt_Id").val();
	var treatId = $("#tr_Id").val();
	var unitId = $("#unitId").val();
	var dateDrug = $("#date-pickDrug").val(); 
	var checkDate = $("input[name='langDrugPrint']:checked").val();
	
	var deptId=2;
	 var pendFlag="N"; 
	 var recId=0;
    
    window.open("nurshing_drug_administartion_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&unitId="+unitId+"&dateDrug="+dateDrug+"&checkDate="+checkDate);


}



function setnursingservices1(inputID,value) {
	
	
	var findingName=$("#" + inputID).val();
	var unitId = $("#unitId").val();
	//var unit = 1;
	
	    var serviceid=value; 
	
    
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('findName=' + findingName);
	inputs.push('serviceId=' + serviceid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getServiceDetailsOnNurshing",
		success : function(r) {
			/*	        alert(r.lstSubService[0].categoryName);
			*/			
				
						//alert(JSON.stringify(r));
						
			setautoperationOnNursing(r,inputID,value);
			             
			         
							
					}
				});
	
	
}



function setautoperationOnNursing(response,id,value) {
	
	var qty = id.slice(0, -1); // for dyamic col getting id
	//alert("hi");
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
	$
			.widget(
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
					name : 'CategoryName',
					width : '100px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '90px',
					valueField : 'serviceName'
				}/*, {
					name : 'doctypeId',
				//	width : '90px',
					valueField : 'doctypeId'
				}*/],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
					//	$('#results').text(ui.item ? 'Selected: ' + ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.depNm: 'Nothing selected, input was ' + this.value);
						//$('#' + id).val(ui.item.dn);
						//$('#userDocId').val(ui.item.ui);
						//$('#selectedObj').html(JSON.stringify(ui.item));
				
						if(ui.item.categoryName!="NO"){
							
							if(value==6){
								$("#txtEqNameb1TestID").val(ui.item.categoryid);
							}else if(value==7){
								$("#txtEqNameg1TestID").val(ui.item.categoryid);
								 
							
							}else if(value==8){
								//alert("asa");
								$("#txtEqNamei1TestID").val(ui.item.categoryid);
							
							}
							$("#idservnur").val(ui.item.categoryid);
							}
						
						   var sponsorId = $("#SponsorsourceTypeId").val();
	                        var chargesSlaveId = $("#chargesSlaveId").val();
	                     //   if(sponsorId > 0 && chargesSlaveId > 0){
							var depdocdeskid = 2;

	                       if(sponsorId == 0 && chargesSlaveId == 0){
	                    	   if(depdocdeskid==2){
	                    		   getchargesDRNST(2);
	                     		var chargesfromConf= $("#chargesfromConfNS").val();
	                     		if(chargesfromConf==0 || chargesfromConf==null){
	                     			 $("#chargesubservice" ).val(ui.item.categorycharges); 
	                     			 $("#txtcategorycharges").val(ui.item.categorycharges);
	                     		}else{
	                     			 $("#chargesubservice" ).val(chargesfromConf); 
	                     			 $("#txtcategorycharges").val(chargesfromConf);
	                     		}
	                     	  }else{
	                         		 	   $("#chargesubservice" ).val(ui.item.categorycharges);
	                                	   $("#txtcategorycharges").val(ui.item.categorycharges); 
	                         		 }
	                   
	                             }else{
	                            	 getchargesDR(2);
	                            	 var chargesfromConf= $("#chargesfromConfNS").val();
	                            	 if(depdocdeskid==2){
	                            	
	                            		if(chargesfromConf==0 || chargesfromConf==null){
	                            			if(parseFloat (chargesfromConf)==0.0 || parseFloat(chargesfromConf) ==0 || chargesfromConf ==null || chargesfromConf ==undefined){
	                            				if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
	                                   			 $("#chargesubservice").val(ui.item.categorycharges);

	                               			 }else{
	                                   			 $("#chargesubservice").val(ui.item.configcharges);

	                               			 }
	                            			}
	                            			$("#txtcategorycharges").val(ui.item.categorycharges);

	                            			/* $("#chargesubservice" ).val(ui.item.categorycharges); 
	                            			 $("#cpoeCharges2").val(ui.item.categorycharges);*/
	                            		}else{
	                            			     $("#chargesubservice" ).val(chargesfromConf); 
	                                           	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
	                                			 $("#txtcategorycharges").val(ui.item.categorycharges);

	                            			 }else{
	                                			 $("#txtcategorycharges").val(ui.item.configcharges);

	                            			 }
	                            		}
	                            	 }else{

	                    			     $("#chargesubservice" ).val(chargesfromConf); 
	                                   	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
	                        			 $("#txtcategorycharges").val(ui.item.categorycharges);

	                    			 }else{
	                        			 $("#txtcategorycharges").val(ui.item.configcharges);

	                    			 }
	                    		
	                        			

	                            	 }
	                            	
	                             }
					calculateEmerChrForIpdServices();
						
						$("#" + id).val(ui.item.categoryName);
					}
				
					return false;
					
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
			
				}
			});
}

function saveIPDServOnNusring(){

	var quantity     =  1;
		// Bed Side Procedures
		var eleArrBedSide = null;

		// in Gases and Monitors
		var eleArrGas = null;

		// in Instruments and Equipments
		var eleArrInstrument = null;

		// Bed Side Procedures
		eleArrBedSide =  $("#txtEqQtyb1").val() ;
		if (($("#txtEqNameb1TestID").val()) == "")
			eleArrBedSide = "";

		// in Gases and Monitors
		eleArrGas = $("#txtEqQtyg1").val();
		if (($("#txtEqNameg1TestID").val()) == "")
			eleArrGas = "";
		//alert($("#txtEqNamei1TestID").val());

		// in Instruments and Equipments
		eleArrInstrument =$("#txtEqQtyi1").val() ;
		if (($("#txtEqNamei1TestID").val()) == "")
			eleArrInstrument = "";

		//alert(className);
		if (eleArrBedSide == "") {
			if (eleArrGas == "") {
				if (eleArrInstrument == "") {
					alert("Please enter atleast one valid service...");
					return false;
				}
			}
		}
		var classNameb = $('#Bed_Side_ProceduresTab').attr('class');
		var classNameg = $('#Gases_and_MonitorsTab').attr('class');
	 	var classNamei = $('#Instruments_and_EquipmentsTab').attr('class');
	 	
		var emrPer=$("#emrPer").val();
		if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
			emrPer=0;
		}

	  var values=0;
		
		if (classNameb=="active")
		{  
			values=6;
			if (($("#txtEqQtyb1").val()).trim() == "" || ($("#txtEqQtyb1").val()).trim() == 0) {
				alert("Please enter quantity for Bed Side Procedure...");
				SetFocus("txtEqQtyb1");
				eleArrBedSide = "";
				return false;
			}
			subserviceid = $("#txtEqNameb1TestID").val();
			quantity=$("#txtEqQtyb1").val() ;
		}

		if (classNameg=="active") {
			values=7;
			if (($("#txtEqQtyg1").val()).trim() == "" || ($("#txtEqQtyg1").val()).trim() == 0) {
				alert("Please enter quantity for Gases and Monitors...");
				SetFocus("txtEqQtyg1");
				eleArrGas = "";
				return false;
			}
			subserviceid = $("#txtEqNameg1TestID").val();
			quantity=$("#txtEqQtyg1").val() ;
		}

		if (classNamei=="active") {
			
			values=8;
			if (($("#txtEqQtyi1").val()).trim() == "" || ($("#txtEqQtyi1").val()).trim() == 0) {
				alert("Please enter quantity for Instruments and Equipments...");
				SetFocus("txtEqQtyi1");
				eleArrInstrument = "";
				return false;
			}
			subserviceid = $("#txtEqNamei1TestID").val();
			quantity=$("#txtEqQtyi1").val() ;
		}


		var queryType 	 = "insert";
		var module 	 = "OT";
		//var	patienttId   =  $("#patientId").text();
		var	patienttId   =  $("#pt_Id").val();
		var treatmentId  =  $("#tr_Id").val();  
		var	departmentId =  2;
		var billId       =  $("#bill_Id").val();  
		var	sourceTypeId =  1;
      	var serviceId    =  values;
		var subServiceId =  subserviceid;
        var rate = 0;
		var otherRate=0;
		var otherAmount=0;
		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();
		var txting1 = $("#txting1").val();
		var txtoutg1 = $("#txtoutg1").val();
	/*		getchargesNS(subServiceId);
			if (sponsorId > 0 && chargesSlaveId > 0) {
			otherRate = $("#chargesfromConfNS").val();
			}
			if(otherRate== 0 || otherRate== 0.0){
				otherRate =	$("#txtcategorycharges").val();
				
			}*/
		
		if (sponsorId > 0 && chargesSlaveId > 0) {
			receiptOf="sponsor";
			getchargesDRNST(0);
			otherRate = parseFloat($("#chargesfromConfNS").val());
			if(otherRate== 0 || otherRate== 0.0){
				getchargesDRNST(2);
				otherRate =	parseFloat($("#chargesubservice").val());
				}
			if(otherRate== 0 || otherRate== 0.0){
				
				otherRate =	parseFloat($("#chargesubservice").val());
				
			}
	
			otherAmount=otherRate *quantity;
			
		}
			
		
			rate =	$("#txtcategorycharges").val();	
		
		
		
		var amount       =  rate * quantity;  
		
		var billDetailsId     = $("#idbillipd").val();
	    
	    var unitId            = $("#unitId").val();
	    var doctorId          = 0;                         
	    var clinicalNotes     = "-";
	    var instructions      ="-";
	    var urgentflag='N';
	    var ot_flag='N';
	    var drdeskflag='N';
	    var coPay        = amount;
	    
	    var callfrom="DrDeskNS";
	
		if(unitId==null || unitId==""){
			unitId=1;
		}
		
		var serviceDetails = {
				listBillDetailsIpd : []
	        };
		serviceDetails.listBillDetailsIpd.push({
			billDetailsId:billDetailsId,
			patienttId : patienttId,
	        treatmentId : treatmentId,
	        departmentId : departmentId,
	        billId : billId,
	        sourceTypeId : sponsorId,
	        chargesSlaveId:chargesSlaveId,
	        rate : rate,
	        quantity : quantity,
	        amount : amount,
	        serviceId : serviceId,
	        subServiceId : subServiceId,
	      
	        doctorId:doctorId,
	        urgentFlag:urgentflag,
	        clinicalnotes:clinicalNotes,
	        instructions:instructions,
	        unitId : unitId,
	        ot_flag:ot_flag,
	        coPay  :coPay,
	        drdeskflag:drdeskflag,
	        callfrom : callfrom,
	        otherRate : otherRate,
	        otherAmount : otherAmount,
	        otherPay :otherAmount,
	        onBedFlag:"N",
	        emrPer:emrPer,
	        fromdate : txting1,
	        tomdate  : txtoutg1
	    });
	    
	    serviceDetails = JSON.stringify(serviceDetails);
		
		var inputs = [];
		inputs.push('module=' + module);
		inputs.push('queryType=' + queryType);
		inputs.push('serviceDetails=' + serviceDetails);
		inputs.push('callfrom=' + callfrom);
		
			var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/saveCpoe",
		
			success : function(r) {
				
				 
			if(r >0){
				
				var ipdService = $("#editIPDService").val();
				if(ipdService==1){
					alert("Service update Successfully");
					$("#editIPDService").val(0);
				}
				else{
					alert("Service assign Successfully");
				}
				
				refreshIPDServices(values);
				fetchIpdServicesOnNurshing(values);
				}
			}	
			
		});
		

}

function fetchIpdServicesOnNurshing(values) {
	
		var trid = $("#trid").html();

		var inputs = [];
		//inputs.push('action=fetchIpdServices');
		inputs.push('trid=' + trid);
		inputs.push('serviceid=' + values);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : false,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "./ehat/ipdhistory/fetchIpdServices",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						//ajaxResponse = r;
						 
					 // resp =	eval('(' + ajaxResponse + ')');
					//	console.log(r);
						 
						var resp=r;
				var htm="";	 
					
					for ( var k = 0; k < resp.cpoedetails.length; k++) {

					
						var dt=new Date(resp.cpoedetails[k].created_date_time).toLocaleString();
						htm =htm+ '<tr> '
								+ '<td style="height: 21.5px; width: 5%;">'
								+ (k + 1)
								+ '</td>'
								+ '<td style="height: 21.5px; width: 30%;">'
								+ resp.cpoedetails[k].categoryName
								+ '<input type="hidden" id="caName'+ k +'" value="'+ resp.cpoedetails[k].categoryName  +'" />'
								+ '<input type="hidden" id="caid'+ k +'" value="'+ resp.cpoedetails[k].categoryid  +'" />'
	                            + '<input type="hidden" id="caQty'+ k +'" value="'+ resp.cpoedetails[k].quantity  +'" />'
	                            + '<input type="hidden" id="frdate'+ k +'" value="'+ resp.cpoedetails[k].fromdate  +'" />'
	                            + '<input type="hidden" id="todate'+ k +'" value="'+ resp.cpoedetails[k].tomdate  +'" />'

	                            + '</td>'
								+ '<td style="height: 21.5px; width: 18%;">'
								+ resp.cpoedetails[k].servicename
								+ '</td>'
								+ '<td style="height: 21.5px; width: 7%;text-align: center;">'
								+  resp.cpoedetails[k].quantity
								+ '</td>'
								+ '<td style="height: 21.5px; width: 20%;text-align: center;">'
								+  resp.cpoedetails[k].docName
								+ '</td>'
								+ '<td style="height: 21.5px; width: 14%;">'
								+ dt
								+ '</td>'
								+ '<td style="height: 21.5px; width: 14%;">'
								+ '<button value="EDI" onclick="editIPDServicesOnNurshing('+k+','+  resp.cpoedetails[k].serviceid +')" class="btn btn-xs btn-success" >'
								+'<i class="fa fa-edit"></i></button></td>'	
								+ '<td style="height: 21.5px;text-align: center;">'
								+ '<input id="checkbox_'
								+ k
								+ '" type="checkbox" class="ipdServiceDelete" onclick="chkUnchkChkBox('
								+ k
								+ ','+  resp.cpoedetails[k].serviceid +')"'
								+ 'value="'+ resp.cpoedetails[k].billipd_id  +'" '
	 							+ '" style="margin-top: 2px; margin-left: 0px;" />'
	 							+ '<input type="hidden" id="bidipd'+ k +'" value="'+ resp.cpoedetails[k].billipd_id  +'" />'

								+ '</td>'
								+ '</tr>';

						
					} // end of for loop
					
					$("#ipdServiceSum").html(htm);
	 				//$("#queryType").val("update");
					var preTreat = $("#preTreat").val();
					if(preTreat=="Y"){
						
						setTimeout(function() {
					        $('#IPD_Services').find('.editUserAccess').remove("onclick");
					        $('#IPD_Services').find('button,input,select').attr('disabled', 'disabled');}, 200);
						
					}
				} // end of if loop
					
						
					
					});
	}

function editIPDServicesOnNurshing(value, serviceid){
	
	
	
	var prname=$("#caName"+ value +"").val();
	var caid =$("#caid"+ value +"").val();
	var ipdbillid=$("#bidipd"+ value +"").val();
	var qtyph=$("#caQty"+ value +"").val();
	if(serviceid==6){
		$("#txtEqNameb1TestID").val(caid);
		$("#txtEqNameb1").val(prname);
		$("#txtEqQtyb1").val(qtyph);
		$("#txtEqNameb1").prop("readonly", true);
	    $("#idbillipd").val(ipdbillid);
	
	}else if(serviceid==7){
		var frdate=$("#frdate"+ value +"").val();
		var todate =$("#todate"+ value +"").val();
		if(frdate==undefined){
		frdate="00.00";
		}
	if(todate==undefined){
		todate="00.00";
		}
		
		$("#txting1").val(frdate);
		$("#txtoutg1").val(todate);
		$("#txtEqNameg1TestID").val(caid);
		$("#txtEqNameg1").val(prname);
		$("#txtEqQtyg1").val(qtyph);
		$("#txtEqNameg1").prop("readonly", true);
		 $("#idbillipd").val(ipdbillid);
		
	}else{
		$("#txtEqNamei1TestID").val(caid);
		$("#txtEqNamei1").prop("readonly", true);
		$("#txtEqNamei1").val(prname);
		$("#txtEqQtyi1").val(qtyph);
		 $("#idbillipd").val(ipdbillid);
	}
	
	$("#editIPDService").val(1);
	//alert($("#editIPDService").val());
	
}

function deleteIpdServiceDetailsOnNusrshing(){
	
	var userId=$("#txtUserId").val();
	var ipdServiceID = [];
	$('input[class=ipdServiceDelete]:checked').each(function() {
		//alert($(this).val());
		ipdServiceID.push($(this).val());
	});
	
	
	if(ipdServiceID.length == 0){
		alert("Please Select At least one Service To Delete");
		return false;
	}
	
var inputs = [];
	
	inputs.push('ids=' + ipdServiceID);
	inputs.push('userId=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/deleteIpdServiceDetailsOnNusrshing",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Deleted Successfully");
				window.location.reload(true);
			}else {
				alert("Network Issue..");
			}

		}
	});
}


function getHeadingNotesOnNurshing(dropDownId) {
	jQuery.ajax({
		async : false,
		type : "GET",
		//data : str + "&reqType=AJAX",
		url : "./ehat/ipdmaster/fetchNursingNotes",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			var htm = "<option value=0>--Select--</option>";
        	for ( var i = 0; i < r.length; i++) {

        		htm = htm + "<option value="+r[i].noteId+">"+r[i].headNote+"</option>";
        	}
        	$("#"+dropDownId).html(htm);
        	$("#"+dropDownId).select2();
			
				setTimeout(function(){userAccess();},100);
		}
	});
}

function getNotesbyHeadnoteId(id, i) {
	//alert(i)
	var noteId = 0;

	noteId = $("#"+id).val();
	var inputs=[];
	inputs.push('noteId=' + noteId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
			url : "./ehat/ipdmaster/getNotesbyHeadnoteId",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
	        
	        	$("#note"+i).val(r);
			}
		});
	}
function nursingPrint() {
	
	 var CallforPrint ="all";
	var printType = $('input[name="printType"]:checked').val();
	if(printType == "nursingChart"){
		CallforPrint="nurshing";
	}
	
	if(printType == "input"){
		CallforPrint="input";
	}
	
	if(printType == "output"){
		CallforPrint="output";
	}
	
	if(printType == "vitals"){
		CallforPrint="vitals";
	}
	
	if(printType == "intensivist"){
		CallforPrint="intensvisit";
	}
	
	
	if(printType == "postOperation"){
		CallforPrint="post";
	}
	

	if(printType == "chemo"){
		CallforPrint="chemo";
	}
	if(printType == "careplane"){
		
		CallforPrint="careplane";
	}
	if(printType == "painScale"){
		
		CallforPrint="painScale";
	}
	
	
	
	
	var date_pick = $.trim($("#date-pick").val());
	
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var unitId = $("#unitId").val();
  
	 var pendFlag="N"; 
	 var recId=0;
	 
	 var CallFrom= "withheader";
	 
	 
	 setTimeout(
				function() {
					if(printType=="NurrsingAsses"||printType=="prepostChecklist"){ 
						window.open(("iPD_NurrsingAsses.jsp?" + 
								"pid="+ encodeURIComponent(patId) + 
								"&tid="+ encodeURIComponent(treatId) + 
								"&printType="+ encodeURIComponent(printType)));  
					}else if(printType=="oneDayAsses"){
						window.open(("ehat_initial_assessment_print.jsp?" + 
								"pid="+ encodeURIComponent(patId) + 
								"&tid="+ encodeURIComponent(treatId) + 
								"&printType="+ encodeURIComponent(printType)));
					}else if(printType=="monitoringSheet"){
							window.open(("IPD_MonitoringSheet_Print.jsp?" + 
								"pid="+ encodeURIComponent(patId) + 
								"&tid="+ encodeURIComponent(treatId)));
					}else if(printType=="nursingAssessment"){
						window.open(("IPD_NursingAssessment_Print.jsp?" + 
								"pid="+ encodeURIComponent(patId) + 
								"&tid="+ encodeURIComponent(treatId)));
					}else{
					/*window.open(("iPD_Nursing_Print.jsp?" + "pid="
									+ encodeURIComponent(pid) + "&tid="
									+ encodeURIComponent(tid) + "&printType="
									+ encodeURIComponent(printType) + "&date_pick="
									+ encodeURIComponent(date_pick) ));//+ "&myObj=" + encodeURIComponent(myObj)
					*/
						
						window.open("ipd_nurshing_station_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&unitId="+unitId+"&fromDate="+date_pick+"&CallFrom="+CallFrom+"&CallforPrint="+CallforPrint);	
				}
				}, 300);
	    
	    
	
}

function  getIpdVitalList1() {
	var treatmentId=$("#tr_Id").val();
	var unitId=$("#unitId").val();
	var todayDate=$("#date-pick").val();
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('todayDate=' + todayDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getIpdVitalList",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIpdVitalsTempList(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

/*function setIpdVitalsTempList(r){
	
	   if(r.lstChartReport.length > 0){
		   for(var i=0; i < r.lstChartReport.length;i++  ) {
			   	$("#masterId" + (i + 1)).val(r.lstChartReport[i].id);
				$("#vitalId" + (i + 1)).val(r.lstChartReport[i].vitalId);
				$("#1am" + (i + 1)).val(r.lstChartReport[i].am1);
				$("#2am" + (i + 1)).val(r.lstChartReport[i].am2);
				$("#3am" + (i + 1)).val(r.lstChartReport[i].am3);
				$("#4am" + (i + 1)).val(r.lstChartReport[i].am4);
				$("#5am" + (i + 1)).val(r.lstChartReport[i].am5);
				$("#6am" + (i + 1)).val(r.lstChartReport[i].am6);
				$("#7am" + (i + 1)).val(r.lstChartReport[i].am7);
				$("#8am" + (i + 1)).val(r.lstChartReport[i].am8);
				$("#9am" + (i + 1)).val(r.lstChartReport[i].am9);
			    $("#10am" + (i + 1)).val(r.lstChartReport[i].am10);
				$("#11am" + (i + 1)).val(r.lstChartReport[i].am11);
				$("#12am" + (i + 1)).val(r.lstChartReport[i].am12);

				$("#1pm" + (i + 1)).val(r.lstChartReport[i].pm1);
				$("#2pm" + (i + 1)).val(r.lstChartReport[i].pm2);
				$("#3pm" + (i + 1)).val(r.lstChartReport[i].pm3);
			    $("#4pm" + (i + 1)).val(r.lstChartReport[i].pm4);
				$("#5pm" + (i + 1)).val(r.lstChartReport[i].pm5);
				$("#6pm" + (i + 1)).val(r.lstChartReport[i].pm6);
			     $("#7pm" + (i + 1)).val(r.lstChartReport[i].pm7);
				 $("#8pm" + (i + 1)).val(r.lstChartReport[i].pm8);
				 $("#9pm" + (i + 1)).val(r.lstChartReport[i].pm9);
				 $("#10pm" + (i + 1)).val(r.lstChartReport[i].pm110);
				 $("#11pm" + (i + 1)).val(r.lstChartReport[i].pm11);
				 $("#12pm" + (i + 1)).val(r.lstChartReport[i].pm12);
		   }
	   }
	   
	
	   $("#chartObj").html(JSON.stringify(r));
}*/


/*function setVitalRecordGraph(vType){
	var am8 = 0;
	var am9 = 0;
	var am10 = 0;
	var am11 = 0;
	var am12 = 0;
	var am1 = 0;
	var am2 = 0;
	var am3 = 0;
	var am4 = 0;
	var am5 = 0;
	var am6 = 0;
	var am7 = 0;
	var pm8 = 0;
	var pm9 = 0;
	var pm10 = 0;
	var pm11 = 0;
	var pm12 = 0;
	var pm1 = 0;
	var pm2 = 0;
	var pm3 = 0;
	var pm4 = 0;
	var pm5 = 0;
	var pm6 = 0;
	var pm7 = 0;
	
	
	//var demo=$('#chartObj').html();
	var pobj =JSON.parse($('#chartObj').html());
	//JSON.stringify(postData)
	//var pobj1= eval('('+ pobj +')');
	
	
	if(pobj.lstChartReport.length>0){
	
		if(pobj1.listReport[0].cname == "TEMPERATURE (*F)"){
		if(vType == "Temp"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
			am8 =pobj.lstChartReport[0].am8;
		
			am9 = pobj.lstChartReport[0].am9;
			am10 = pobj.lstChartReport[0].am10;
			am11 = pobj.lstChartReport[0].am11;
			am12 =pobj.lstChartReport[0].am12;
			am1 = pobj.lstChartReport[0].am1;
			am2 = pobj.lstChartReport[0].am2;
			am3 = pobj.lstChartReport[0].am3;
			am4 = pobj.lstChartReport[0].am4;
			am5 = pobj.lstChartReport[0].am5;
			am6 = pobj.lstChartReport[0].am6;
			am7 = pobj.lstChartReport[0].am7;
			pm8 = pobj.lstChartReport[0].pm8;
			pm9 = pobj.lstChartReport[0].pm9;
			pm10 = pobj.lstChartReport[0].pm10;
			pm11 = pobj.lstChartReport[0].pm11;
			pm12 = pobj.lstChartReport[0].pm12;
			pm1 = pobj.lstChartReport[0].pm1;
			pm2 = pobj.lstChartReport[0].pm2;
			pm3 = pobj.lstChartReport[0].pm3;
			pm4 = pobj.lstChartReport[0].pm4;
			pm5 = pobj.lstChartReport[0].pm5;
			pm6 = pobj.lstChartReport[0].pm6;
			pm7 = pobj.lstChartReport[0].pm7;
		}
		if(vType == "Pulse"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
			am8 =pobj.lstChartReport[1].am8;
		
			am9 = pobj.lstChartReport[1].am9;
			am10 = pobj.lstChartReport[1].am10;
			am11 = pobj.lstChartReport[1].am11;
			am12 =pobj.lstChartReport[1].am12;
			am1 = pobj.lstChartReport[1].am1;
			am2 = pobj.lstChartReport[1].am2;
			am3 = pobj.lstChartReport[1].am3;
			am4 = pobj.lstChartReport[1].am4;
			am5 = pobj.lstChartReport[1].am5;
			am6 = pobj.lstChartReport[1].am6;
			am7 = pobj.lstChartReport[1].am7;
			pm8 = pobj.lstChartReport[1].pm8;
			pm9 = pobj.lstChartReport[1].pm9;
			pm10 = pobj.lstChartReport[1].pm10;
			pm11 = pobj.lstChartReport[1].pm11;
			pm12 = pobj.lstChartReport[1].pm12;
			pm1 = pobj.lstChartReport[1].pm1;
			pm2 = pobj.lstChartReport[1].pm2;
			pm3 = pobj.lstChartReport[1].pm3;
			pm4 = pobj.lstChartReport[1].pm4;
			pm5 = pobj.lstChartReport[1].pm5;
			pm6 = pobj.lstChartReport[1].pm6;
			pm7 = pobj.lstChartReport[1].pm7;
		}		
		if(vType == "Bp"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
			am8 =pobj.lstChartReport[2].am8;
		
			am9 = pobj.lstChartReport[2].am9;
			am10 = pobj.lstChartReport[2].am10;
			am11 = pobj.lstChartReport[2].am11;
			am12 =pobj.lstChartReport[2].am12;
			am1 = pobj.lstChartReport[2].am1;
			am2 = pobj.lstChartReport[2].am2;
			am3 = pobj.lstChartReport[2].am3;
			am4 = pobj.lstChartReport[2].am4;
			am5 = pobj.lstChartReport[2].am5;
			am6 = pobj.lstChartReport[2].am6;
			am7 = pobj.lstChartReport[2].am7;
			pm8 = pobj.lstChartReport[2].pm8;
			pm9 = pobj.lstChartReport[2].pm9;
			pm10 = pobj.lstChartReport[2].pm10;
			pm11 = pobj.lstChartReport[2].pm11;
			pm12 = pobj.lstChartReport[2].pm12;
			pm1 = pobj.lstChartReport[2].pm1;
			pm2 = pobj.lstChartReport[2].pm2;
			pm3 = pobj.lstChartReport[2].pm3;
			pm4 = pobj.lstChartReport[2].pm4;
			pm5 = pobj.lstChartReport[2].pm5;
			pm6 = pobj.lstChartReport[2].pm6;
			pm7 = pobj.lstChartReport[2].pm7;
		}
		if(vType == "Spo"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
			am8 =pobj.lstChartReport[3].am8;
		
			am9 = pobj.lstChartReport[3].am9;
			am10 = pobj.lstChartReport[3].am10;
			am11 = pobj.lstChartReport[3].am11;
			am12 =pobj.lstChartReport[3].am12;
			am1 = pobj.lstChartReport[3].am1;
			am2 = pobj.lstChartReport[3].am2;
			am3 = pobj.lstChartReport[3].am3;
			am4 = pobj.lstChartReport[3].am4;
			am5 = pobj.lstChartReport[3].am5;
			am6 = pobj.lstChartReport[3].am6;
			am7 = pobj.lstChartReport[3].am7;
			pm8 = pobj.lstChartReport[3].pm8;
			pm9 = pobj.lstChartReport[3].pm9;
			pm10 = pobj.lstChartReport[3].pm10;
			pm11 = pobj.lstChartReport[3].pm11;
			pm12 = pobj.lstChartReport[3].pm12;
			pm1 = pobj.lstChartReport[3].pm1;
			pm2 = pobj.lstChartReport[3].pm2;
			pm3 = pobj.lstChartReport[3].pm3;
			pm4 = pobj.lstChartReport[3].pm4;
			pm5 = pobj.lstChartReport[3].pm5;
			pm6 = pobj.lstChartReport[3].pm6;
			pm7 = pobj.lstChartReport[3].pm7;
		}		
	}

	var vitalType="";
	var vtext="";
	var vname="";
	
	if(vType == "Temp"){
		
		vitalType="Temperature Graph";
		vtext="Temp(*Celsius)";
		vname="Temperature";		
	}
	if(vType == "Pulse"){
		
		vitalType="Pulse Graph";
		vtext="Pulse(*bpm)";
		vname="Pulse";
	}
	if(vType == "Bp"){
		
		vitalType="Bp Graph";
		vtext="Bp(*Millimeters)";
		vname="Bp";
	}
	if(vType == "Spo"){
		
		vitalType="Spo Graph";
		vtext="Spo(*F)";
		vname="Spo";
	}
	
	$('#tempratureContainer').highcharts({
		title: {
            text: vitalType,
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: 'Time'
            },
            categories: ['am8','am9','am10','am11','am12','pm1','pm2','pm3','pm4','pm5','pm6','pm7','pm8','pm9','pm10','pm11','pm12','am1','am2','am3','am4','am5','am6','am7']
        },
        yAxis: {
            title: {
                text: vtext
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: vname,
            data: [parseFloat(am8),parseFloat(am9),parseFloat(am10),parseFloat(am11),parseFloat(am12),parseFloat(pm1),parseFloat(pm2),parseFloat(pm3),parseFloat(pm4),parseFloat(pm5),parseFloat(pm6),parseFloat(pm7),parseFloat(pm8),parseFloat(pm9),parseFloat(pm10),parseFloat(pm11),parseFloat(pm12),parseFloat(am1),parseFloat(am2),parseFloat(am3),parseFloat(am4),parseFloat(am5),parseFloat(am6),parseFloat(am7)]
        }]
    });
	
	$('#myModalLabel').html(vitalType);
}
*/

function setVitalRecordGraph(vType){
	var am8 = "";
	var am9 = "";
	var am10 = "";
	var am11 = "";
	var am12 = "";
	var am1 = "";
	var am2 = "";
	var am3 = "";
	var am4 = "";
	var am5 = "";
	var am6 = "";
	var am7 = "";
	var pm8 = "";
	var pm9 = "";
	var pm10 = "";
	var pm11 = "";
	var pm12 = "";
	var pm1 = "";
	var pm2 = "";
	var pm3 = "";
	var pm4 = "";
	var pm5 = "";
	var pm6 = "";
	var pm7 = "";
	
	
	
	var pobj =JSON.parse($('#chartObj').html());
	//JSON.stringify(postData)
	//var pobj1= eval('('+ pobj +')');
	
	
	if(pobj.lstChartReport.length>0){
	
		/*if(pobj1.listReport[0].cname == "TEMPERATURE (*F)"){*/
		if(vType == "Temp"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
		if(pobj.lstChartReport[0].am8 !="0")
			am8 =pobj.lstChartReport[0].am8;
		if(pobj.lstChartReport[0].am9 !="0")
			am9 = pobj.lstChartReport[0].am9;
		if(pobj.lstChartReport[0].am10 !="0")	
			am10 = pobj.lstChartReport[0].am10;
		if(pobj.lstChartReport[0].am11 !="0")	
			am11 = pobj.lstChartReport[0].am11;
		if(pobj.lstChartReport[0].am12 !="0")	
			am12 =pobj.lstChartReport[0].am12;
		
		if(pobj.lstChartReport[0].am1 !="0")	
			am1 = pobj.lstChartReport[0].am1;
		if(pobj.lstChartReport[0].am2 !="0")	
			am2 = pobj.lstChartReport[0].am2;
		if(pobj.lstChartReport[0].am3 !="0")	
			am3 = pobj.lstChartReport[0].am3;
		if(pobj.lstChartReport[0].am4 !="0")	
			am4 = pobj.lstChartReport[0].am4;
		if(pobj.lstChartReport[0].am5 !="0")	
			am5 = pobj.lstChartReport[0].am5;
		if(pobj.lstChartReport[0].am6 !="0")	
			am6 = pobj.lstChartReport[0].am6;
		if(pobj.lstChartReport[0].am7 !="0")	
			am7 = pobj.lstChartReport[0].am7;
		
		if(pobj.lstChartReport[0].pm8 !="0")	
			pm8 = pobj.lstChartReport[0].pm8;
		if(pobj.lstChartReport[0].pm9 !="0")	
			pm9 = pobj.lstChartReport[0].pm9;
		if(pobj.lstChartReport[0].pm10 !="0")	
			pm10 = pobj.lstChartReport[0].pm10;
		if(pobj.lstChartReport[0].pm11 !="0")	
			pm11 = pobj.lstChartReport[0].pm11;
		if(pobj.lstChartReport[0].pm12 !="0")	
			pm12 = pobj.lstChartReport[0].pm12;
		if(pobj.lstChartReport[0].pm1 !="0")	
			pm1 = pobj.lstChartReport[0].pm1;
		if(pobj.lstChartReport[0].pm2 !="0")	
			pm2 = pobj.lstChartReport[0].pm2;
		if(pobj.lstChartReport[0].pm3 !="0")	
			pm3 = pobj.lstChartReport[0].pm3;
		if(pobj.lstChartReport[0].pm4 !="0")	
			pm4 = pobj.lstChartReport[0].pm4;
		if(pobj.lstChartReport[0].pm5 !="0")	
			pm5 = pobj.lstChartReport[0].pm5;
		if(pobj.lstChartReport[0].pm6 !="0")	
			pm6 = pobj.lstChartReport[0].pm6;
		if(pobj.lstChartReport[0].pm7 !="0")	
			pm7 = pobj.lstChartReport[0].pm7;
		}
		if(vType == "Pulse"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
			if(pobj.lstChartReport[1].am8 !="0")
				am8 =pobj.lstChartReport[1].am8;
			if(pobj.lstChartReport[1].am9 !="0")
				am9 = pobj.lstChartReport[1].am9;
			if(pobj.lstChartReport[1].am10 !="0")	
				am10 = pobj.lstChartReport[1].am10;
			if(pobj.lstChartReport[1].am11 !="0")	
				am11 = pobj.lstChartReport[1].am11;
			if(pobj.lstChartReport[1].am12 !="0")	
				am12 =pobj.lstChartReport[1].am12;
			
			if(pobj.lstChartReport[1].am1 !="0")	
				am1 = pobj.lstChartReport[1].am1;
			if(pobj.lstChartReport[1].am2 !="0")	
				am2 = pobj.lstChartReport[1].am2;
			if(pobj.lstChartReport[1].am3 !="0")	
				am3 = pobj.lstChartReport[1].am3;
			if(pobj.lstChartReport[1].am4 !="0")	
				am4 = pobj.lstChartReport[1].am4;
			if(pobj.lstChartReport[1].am5 !="0")	
				am5 = pobj.lstChartReport[1].am5;
			if(pobj.lstChartReport[1].am6 !="0")	
				am6 = pobj.lstChartReport[1].am6;
			if(pobj.lstChartReport[1].am7 !="0")	
				am7 = pobj.lstChartReport[1].am7;
			
			if(pobj.lstChartReport[1].pm8 !="0")	
				pm8 = pobj.lstChartReport[1].pm8;
			if(pobj.lstChartReport[1].pm9 !="0")	
				pm9 = pobj.lstChartReport[1].pm9;
			if(pobj.lstChartReport[1].pm10 !="0")	
				pm10 = pobj.lstChartReport[1].pm10;
			if(pobj.lstChartReport[1].pm11 !="0")	
				pm11 = pobj.lstChartReport[1].pm11;
			if(pobj.lstChartReport[1].pm12 !="0")	
				pm12 = pobj.lstChartReport[1].pm12;
			if(pobj.lstChartReport[1].pm1 !="0")	
				pm1 = pobj.lstChartReport[1].pm1;
			if(pobj.lstChartReport[1].pm2 !="0")	
				pm2 = pobj.lstChartReport[1].pm2;
			if(pobj.lstChartReport[1].pm3 !="0")	
				pm3 = pobj.lstChartReport[1].pm3;
			if(pobj.lstChartReport[1].pm4 !="0")	
				pm4 = pobj.lstChartReport[1].pm4;
			if(pobj.lstChartReport[1].pm5 !="0")	
				pm5 = pobj.lstChartReport[1].pm5;
			if(pobj.lstChartReport[1].pm6 !="0")	
				pm6 = pobj.lstChartReport[1].pm6;
			if(pobj.lstChartReport[1].pm7 !="0")	
				pm7 = pobj.lstChartReport[1].pm7;
			
			/*am8 =pobj.lstChartReport[1].am8;
		
			am9 = pobj.lstChartReport[1].am9;
			am10 = pobj.lstChartReport[1].am10;
			am11 = pobj.lstChartReport[1].am11;
			am12 =pobj.lstChartReport[1].am12;
			am1 = pobj.lstChartReport[1].am1;
			am2 = pobj.lstChartReport[1].am2;
			am3 = pobj.lstChartReport[1].am3;
			am4 = pobj.lstChartReport[1].am4;
			am5 = pobj.lstChartReport[1].am5;
			am6 = pobj.lstChartReport[1].am6;
			am7 = pobj.lstChartReport[1].am7;
			pm8 = pobj.lstChartReport[1].pm8;
			pm9 = pobj.lstChartReport[1].pm9;
			pm10 = pobj.lstChartReport[1].pm10;
			pm11 = pobj.lstChartReport[1].pm11;
			pm12 = pobj.lstChartReport[1].pm12;
			pm1 = pobj.lstChartReport[1].pm1;
			pm2 = pobj.lstChartReport[1].pm2;
			pm3 = pobj.lstChartReport[1].pm3;
			pm4 = pobj.lstChartReport[1].pm4;
			pm5 = pobj.lstChartReport[1].pm5;
			pm6 = pobj.lstChartReport[1].pm6;
			pm7 = pobj.lstChartReport[1].pm7;*/
		}		
		if(vType == "Bp"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
			if(pobj.lstChartReport[3].am8 !="0")
				am8 =pobj.lstChartReport[3].am8;
			if(pobj.lstChartReport[3].am9 !="0")
				am9 = pobj.lstChartReport[3].am9;
			if(pobj.lstChartReport[3].am10 !="0")	
				am10 = pobj.lstChartReport[3].am10;
			if(pobj.lstChartReport[3].am11 !="0")	
				am11 = pobj.lstChartReport[3].am11;
			if(pobj.lstChartReport[3].am12 !="0")	
				am12 =pobj.lstChartReport[3].am12;
			
			if(pobj.lstChartReport[3].am1 !="0")	
				am1 = pobj.lstChartReport[3].am1;
			if(pobj.lstChartReport[3].am2 !="0")	
				am2 = pobj.lstChartReport[3].am2;
			if(pobj.lstChartReport[3].am3 !="0")	
				am3 = pobj.lstChartReport[3].am3;
			if(pobj.lstChartReport[3].am4 !="0")	
				am4 = pobj.lstChartReport[3].am4;
			if(pobj.lstChartReport[3].am5 !="0")	
				am5 = pobj.lstChartReport[3].am5;
			if(pobj.lstChartReport[3].am6 !="0")	
				am6 = pobj.lstChartReport[3].am6;
			if(pobj.lstChartReport[3].am7 !="0")	
				am7 = pobj.lstChartReport[3].am7;
			
			if(pobj.lstChartReport[3].pm8 !="0")	
				pm8 = pobj.lstChartReport[3].pm8;
			if(pobj.lstChartReport[3].pm9 !="0")	
				pm9 = pobj.lstChartReport[3].pm9;
			if(pobj.lstChartReport[3].pm10 !="0")	
				pm10 = pobj.lstChartReport[3].pm10;
			if(pobj.lstChartReport[3].pm11 !="0")	
				pm11 = pobj.lstChartReport[3].pm11;
			if(pobj.lstChartReport[3].pm12 !="0")	
				pm12 = pobj.lstChartReport[3].pm12;
			if(pobj.lstChartReport[3].pm1 !="0")	
				pm1 = pobj.lstChartReport[3].pm1;
			if(pobj.lstChartReport[3].pm2 !="0")	
				pm2 = pobj.lstChartReport[3].pm2;
			if(pobj.lstChartReport[3].pm3 !="0")	
				pm3 = pobj.lstChartReport[3].pm3;
			if(pobj.lstChartReport[3].pm4 !="0")	
				pm4 = pobj.lstChartReport[3].pm4;
			if(pobj.lstChartReport[3].pm5 !="0")	
				pm5 = pobj.lstChartReport[3].pm5;
			if(pobj.lstChartReport[3].pm6 !="0")	
				pm6 = pobj.lstChartReport[3].pm6;
			if(pobj.lstChartReport[3].pm7 !="0")	
				pm7 = pobj.lstChartReport[3].pm7;
			
			/*am8 =pobj.lstChartReport[2].am8;
		
			am9 = pobj.lstChartReport[2].am9;
			am10 = pobj.lstChartReport[2].am10;
			am11 = pobj.lstChartReport[2].am11;
			am12 =pobj.lstChartReport[2].am12;
			am1 = pobj.lstChartReport[2].am1;
			am2 = pobj.lstChartReport[2].am2;
			am3 = pobj.lstChartReport[2].am3;
			am4 = pobj.lstChartReport[2].am4;
			am5 = pobj.lstChartReport[2].am5;
			am6 = pobj.lstChartReport[2].am6;
			am7 = pobj.lstChartReport[2].am7;
			pm8 = pobj.lstChartReport[2].pm8;
			pm9 = pobj.lstChartReport[2].pm9;
			pm10 = pobj.lstChartReport[2].pm10;
			pm11 = pobj.lstChartReport[2].pm11;
			pm12 = pobj.lstChartReport[2].pm12;
			pm1 = pobj.lstChartReport[2].pm1;
			pm2 = pobj.lstChartReport[2].pm2;
			pm3 = pobj.lstChartReport[2].pm3;
			pm4 = pobj.lstChartReport[2].pm4;
			pm5 = pobj.lstChartReport[2].pm5;
			pm6 = pobj.lstChartReport[2].pm6;
			pm7 = pobj.lstChartReport[2].pm7;*/
		}
		if(vType == "Spo"){
			//pobj1 = pobj1.listReport[0];
			var pobj1=pobj.lstChartReport;
			
			//am8 =pobj.lstChartReport[3].am8;
		
			if(pobj.lstChartReport[2].am8 !="0")
				am8 =pobj.lstChartReport[2].am8;
			if(pobj.lstChartReport[2].am9 !="0")
				am9 = pobj.lstChartReport[2].am9;
			if(pobj.lstChartReport[2].am10 !="0")	
				am10 = pobj.lstChartReport[2].am10;
			if(pobj.lstChartReport[2].am11 !="0")	
				am11 = pobj.lstChartReport[2].am11;
			if(pobj.lstChartReport[2].am12 !="0")	
				am12 =pobj.lstChartReport[2].am12;
			
			if(pobj.lstChartReport[2].am1 !="0")	
				am1 = pobj.lstChartReport[2].am1;
			if(pobj.lstChartReport[2].am2 !="0")	
				am2 = pobj.lstChartReport[2].am2;
			if(pobj.lstChartReport[2].am3 !="0")	
				am3 = pobj.lstChartReport[2].am3;
			if(pobj.lstChartReport[2].am4 !="0")	
				am4 = pobj.lstChartReport[2].am4;
			if(pobj.lstChartReport[2].am5 !="0")	
				am5 = pobj.lstChartReport[2].am5;
			if(pobj.lstChartReport[2].am6 !="0")	
				am6 = pobj.lstChartReport[2].am6;
			if(pobj.lstChartReport[2].am7 !="0")	
				am7 = pobj.lstChartReport[2].am7;
			
			if(pobj.lstChartReport[2].pm8 !="0")	
				pm8 = pobj.lstChartReport[2].pm8;
			if(pobj.lstChartReport[2].pm9 !="0")	
				pm9 = pobj.lstChartReport[2].pm9;
			if(pobj.lstChartReport[2].pm10 !="0")	
				pm10 = pobj.lstChartReport[2].pm10;
			if(pobj.lstChartReport[2].pm11 !="0")	
				pm11 = pobj.lstChartReport[2].pm11;
			if(pobj.lstChartReport[2].pm12 !="0")	
				pm12 = pobj.lstChartReport[2].pm12;
			if(pobj.lstChartReport[2].pm1 !="0")	
				pm1 = pobj.lstChartReport[2].pm1;
			if(pobj.lstChartReport[2].pm2 !="0")	
				pm2 = pobj.lstChartReport[2].pm2;
			if(pobj.lstChartReport[2].pm3 !="0")	
				pm3 = pobj.lstChartReport[2].pm3;
			if(pobj.lstChartReport[2].pm4 !="0")	
				pm4 = pobj.lstChartReport[2].pm4;
			if(pobj.lstChartReport[2].pm5 !="0")	
				pm5 = pobj.lstChartReport[2].pm5;
			if(pobj.lstChartReport[2].pm6 !="0")	
				pm6 = pobj.lstChartReport[2].pm6;
			if(pobj.lstChartReport[2].pm7 !="0")	
				pm7 = pobj.lstChartReport[2].pm7;
			
			/*am9 = pobj.lstChartReport[3].am9;
			am10 = pobj.lstChartReport[3].am10;
			am11 = pobj.lstChartReport[3].am11;
			am12 =pobj.lstChartReport[3].am12;
			am1 = pobj.lstChartReport[3].am1;
			am2 = pobj.lstChartReport[3].am2;
			am3 = pobj.lstChartReport[3].am3;
			am4 = pobj.lstChartReport[3].am4;
			am5 = pobj.lstChartReport[3].am5;
			am6 = pobj.lstChartReport[3].am6;
			am7 = pobj.lstChartReport[3].am7;
			pm8 = pobj.lstChartReport[3].pm8;
			pm9 = pobj.lstChartReport[3].pm9;
			pm10 = pobj.lstChartReport[3].pm10;
			pm11 = pobj.lstChartReport[3].pm11;
			pm12 = pobj.lstChartReport[3].pm12;
			pm1 = pobj.lstChartReport[3].pm1;
			pm2 = pobj.lstChartReport[3].pm2;
			pm3 = pobj.lstChartReport[3].pm3;
			pm4 = pobj.lstChartReport[3].pm4;
			pm5 = pobj.lstChartReport[3].pm5;
			pm6 = pobj.lstChartReport[3].pm6;
			pm7 = pobj.lstChartReport[3].pm7;*/
		}		
	}

	var vitalType="";
	var vtext="";
	var vname="";
	
	if(vType == "Temp"){
		
		vitalType="Temperature Graph";
		vtext="Temp(*Celsius)";
		vname="Temperature";		
	}
	if(vType == "Pulse"){
		
		vitalType="Pulse Graph";
		vtext="Pulse(*bpm)";
		vname="Pulse";
	}
	if(vType == "Bp"){
		
		vitalType="Bp Graph";
		vtext="Bp(*Millimeters)";
		vname="Bp";
	}
	if(vType == "Spo"){
		
		vitalType="Spo Graph";
		vtext="Spo(*F)";
		vname="Spo";
	}
	
	$('#tempratureContainer').highcharts({
		title: {
            text: vitalType,
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: 'Time'
            },
           
           
            categories: ['am8','am9','am10','am11','am12','pm1','pm2','pm3','pm4','pm5','pm6','pm7','pm8','pm9','pm10','pm11','pm12','am1','am2','am3','am4','am5','am6','am7']
        },
        yAxis: {
            title: {
                text: vtext
            },
            
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080',
               // lineColor: 'transparent',
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
        	lineColor:'#ffffff',
            name: vname,
            data: [
            	parseFloat(am8),
            	parseFloat(am9),
            	parseFloat(am10),
            	parseFloat(am11),
            	parseFloat(am12),
            	parseFloat(pm1),
            	parseFloat(pm2),
            	parseFloat(pm3),
            	parseFloat(pm4),
            	parseFloat(pm5),
            	parseFloat(pm6),
            	parseFloat(pm7),
            	parseFloat(pm8),parseFloat(pm9),parseFloat(pm10),parseFloat(pm11),parseFloat(pm12),parseFloat(am1),parseFloat(am2),parseFloat(am3),parseFloat(am4),parseFloat(am5),parseFloat(am6),parseFloat(am7)]
        
        }]
    });
	
	$('#myModalLabel').html(vitalType);
}

function getPatientInfoOnNurshing(r){

	var deptID=0;
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",*/
		data : {
			"treatmentId" : r
		},
		url : "ehat/opdbill/getPatientInfoByTreatmentId",
		success : function(r) {
			
			
			
			// setTempPatientRecords(r);
			//console.log(r);
 			if(r.listRegTreBillDto[0]!=undefined || r.listRegTreBillDto[0]!=null){
			 /*****Added By Sagar******/
			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');
			//set hidden date +
			var dd=date.split(',');
  			$("#dtofadmission").text(dd[0]);
  			//set hidden for print +
  			$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);
  			$("#ptName").val(r.listRegTreBillDto[0].patientName);
  			$("#corporate").text(r.listRegTreBillDto[0].categoryName);
  			$("#idForDisc").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
  			$("#isPpn").val(r.listRegTreBillDto[0].isPpn);
  			$("#numbr").val(r.listRegTreBillDto[0].numbr);
  			
  			if(r.listRegTreBillDto[0].isPpn == "Y"){
  				$('#ppn').show();
  				$("#ppnNumber").html(r.listRegTreBillDto[0].numbr);
  				$('#ppnNumber').show();
  			}
  			
			
			$("#genInvoiceFlag").val(r.listRegTreBillDto[0].invoiceFlag);
			
			var fileName=r.listRegTreBillDto[0].imageName;	
			$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			   			  
   			getSponsorRecords(r.listRegTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
 			
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName );
			$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
		   // $("#billNo").text(r.listRegTreBillDto[0].billId);
			 $("#billNo").text(r.listRegTreBillDto[0].invoiceCount);
		    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
		    //hidden set 
		    $("#deptid").val(r.listRegTreBillDto[0].departmentId);
		    
		    $("#consultingDoctorr").text(r.listRegTreBillDto[0].consultingDocName);
			 
		    dept=r.listRegTreBillDto[0].departmentId;
		    $("#drid").val(r.listRegTreBillDto[0].doctorId);
		    $("#pid").val(r.listRegTreBillDto[0].patientId);
		    
		    //****hidden set for bmi****//
 		   $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
 		   $("#weight1").val(r.listRegTreBillDto[0].weight) ;
		   $("#height1").val(r.listRegTreBillDto[0].height) ;
 
			$("#sex").text(r.listRegTreBillDto[0].gender);
			deptID =r.listRegTreBillDto[0].departmentId;
			$("#deptId").val(r.listRegTreBillDto[0].departmentId);
			$("#pId").val(r.listRegTreBillDto[0].patientId);
			$("#PiD").val(r.listRegTreBillDto[0].patientId);			
			$("#bId").val(r.listRegTreBillDto[0].billId);
			$("#tId").val(r.listRegTreBillDto[0].treatmentId);
			$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
			$("#sId").val(r.listRegTreBillDto[0].serviceId);
			//$("#ipdNo").text(r.listRegTreBillDto[0].fName);
			
  			if(r.listRegTreBillDto[0].sourceTypeId>0){
 				sponsorTypeList(r.listRegTreBillDto[0].sourceTypeId);
 			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
			}
  			  $("#ipdNo").text(r.listRegTreBillDto[0].trcount);
  			$("#ipdNumber").val(r.listRegTreBillDto[0].trcount);
 			  $("#doa").text(date);
 			  $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
			  $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
 			  //hidden field set 
			  $("#pt_Id").val(r.listRegTreBillDto[0].patientId);
			  $("#bill_Id").val(r.listRegTreBillDto[0].billId);
			  $("#refDocId").val(r.listRegTreBillDto[0].refDocId);
			  $("#patientId").text(r.listRegTreBillDto[0].patientId);	
			  //$("#consultingDoctor").text('');//r.listRegTreBillDto[0].invoiceCount			  
			  $("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
			  
			  $("#prnId").text(r.listRegTreBillDto[0].patientId);	
			  $("#preBillId").text(r.listRegTreBillDto[0].invoiceCount);			  
			  
			 var patPrefix=$("#patPrefix").val();
			 var patMiddle=$("#patMiddle").val();
			 var patSufix=$("#patSufix").val();
			 var patIdPrefix=patPrefix+patMiddle+r.listRegTreBillDto[0].patientId+patSufix;				
	  		 //$("#prnId").text(patIdPrefix);
			 $("#prnId").text(r.listRegTreBillDto[0].patientId);
			 $("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			 $("#centeripdID").text(r.listRegTreBillDto[0].centerPatientId);

			 
			 var billPrefix=$("#billPrefix").val();
		  	 var billMiddle=$("#billMiddle").val();
		  	 var billSufix=$("#billSufix").val();
		  	 var billIdPrefix=billPrefix+billMiddle+r.listRegTreBillDto[0].invoiceCount+billSufix;
		  	 $("#preBillId").text(billIdPrefix);
		  	 $("#refDoctor").text(r.listRegTreBillDto[0].docNameChan);
		  	//$("#refDoctor").text(r.listRegTreBillDto[0].refDocName);
		  	
		  	$("#tFlag").val(r.listRegTreBillDto[0].tFlag);

		  	
		  	if(r.listRegTreBillDto[0].dischargeDate!="-" && r.listRegTreBillDto[0].dischargeDate!=null && r.listRegTreBillDto[0].dischargeDate!=""){
		  		var dischargeDate= new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
			  	$("#dod").text((dischargeDate).split(",")[0]+", "+r.listRegTreBillDto[0].dischargeTime);
		  	}else{
		  		$("#dod").text("-");
		  	}
		  	$("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
		  	 $("#mrn").val(r.listRegTreBillDto[0].mrnno );
			  
 			}
 		}
	});
	
	getIpdPatientHeaderInfoOnIPD(r);
	return deptID;

}

function getIpdPatientHeaderInfoOnIPD(r){
	


	var unitId = $("#unitId").val();
		
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(r));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getIpdPatientHeaderInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
	 		if(r.listRegTreBillDto[0]!=undefined || r.listRegTreBillDto[0]!=null){
			  	$("#hallName").text(r.listRegTreBillDto[0].hallName);
			  
	 		}
 		}
	});

	
}

function setProductAutoComplete(key,currentVal) {
	$('#hiddenCurrentRow').val(currentVal);
	
	if (key != null) {
		var keycode = (key.which) ? key.which : key.keyCode;
		if (keycode == 9) {
			$('#txtQty').focus();
			return false;
		}
	}

	var findingName = $("#textProductName"+currentVal).val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({

		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/product/autoSuggestionProduct",
		timeout : 1000 * 60 * 15,

		error : function(error) {
		},
		success : function(r) {
			var availableTags = [];
			var resultData = [];

			if (r.length > 0) {
				for ( var i = 0; i < r.length; i++) {
					availableTags[i] = r[i].productName + '_'
							+ r[i].productId;
				}
			}

			var template = "";
			for ( var j = 0; j < availableTags.length; j++) {
				var arrValue = (availableTags[j]).split("_");
				var idValue = (arrValue[1]);
				resultData.push({
					ID : idValue+'_'+currentVal,
					Name : arrValue[0]
				});

				template = template + '<li data-value="' + (arrValue[1])
						+ '" class=""><a href="#">' + arrValue[0]
						+ '</a></li>';

			}
			$(".typehead1").html(template);
			$(".typehead1").show();

			setTimeout(function() {
				$("#textProductName"+currentVal).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : getTotalStockWithoutExpiry,
					scrollBar : true

				});
				$("#textProductName"+currentVal).data('typeahead').source = resultData;
			}, 500);
		}
	});
}


function getTotalStockWithoutExpiry(item) {
	
	var hiddenRowC=$('#hiddenCurrentRow').val();
	var content = item.value.split("_");
	var text = item.text;
	var value = item.value;
	var rowCount= content[1];
	var id= content[0];
	
	$('#hiddenProductId'+rowCount).val(id);
	
	var inputs = [];
	inputs.push('productID=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/purchase/getTotalStockWithoutExpiry",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#totalQty').val(r);
			$('#texttotalQty'+hiddenRowC).val(r);
			toCreateManualIndent();
		}
	});
	//createRow();
}

function hideDataForPreviousTreatment(){
	var callFromVal =$("#callFromVal").val().trim();

	if(callFromVal == "'previousPatient'"){
		
		 $("#saveBtnNurshingChart").attr("disabled","disabled");
		 
		    $('#IPD_Services').find('.editUserAccess').remove("onclick");
	        $('#IPD_Services').find('button,input,select').attr('disabled', 'disabled');
	        
	        $('#INDENT').find('button,input,select').attr('disabled', 'disabled');
	        $("#saveBtnIndent").attr('disabled', 'disabled');
	        
	        $('#DrugAdminSheet').find('.editUserAccess').remove("onclick");
	        $('#DrugAdminSheet').find('button,input,select').attr('disabled', 'disabled');
	        
	        $('#Upload_Document').find('.editUserAccess').remove("onclick");
	        $('#Upload_Document').find('button,input,select').attr('disabled', 'disabled');
	        
	        $('#PrePostChecklist').find('.editUserAccess').remove("onclick");
	        $('#PrePostChecklist').find('button,input,select').attr('disabled', 'disabled');
	        
	        $('#IPD_Monitoring_Sheet').find('.editUserAccess').remove("onclick");
	        $('#IPD_Monitoring_Sheet').find('button,input,select').attr('disabled', 'disabled');
	        
	        $('#DayWise_Sheet1').find('.editUserAccess').remove("onclick");
	        $('#DayWise_Sheet1').find('button,input,select,table').attr('disabled', 'disabled');
	        
	        $('#DayWise_Sheet2').find('.editUserAccess').remove("onclick");
	        $('#DayWise_Sheet2').find('button,input,select,table').attr('disabled', 'disabled');
	       
	        
	        $('#NursingIntialAssessmentOneDay').find('.editUserAccess').remove("onclick");
	        $('#NursingIntialAssessmentOneDay').find('button,input,select').attr('disabled', 'disabled');
	        
	       
	        
	       // $('#IPD_Initial_Nursing_Assess').find('.editUserAccess').remove("onclick");
	        $('#IPD_Initial_Nursing_Assess').find('button,input,select').attr('disabled', 'disabled');
	        //$('#Assessment_Sheet1').find('.editUserAccess').remove("onclick");
	        $('#Assessment_Sheet1').find('button,input,select,.editUserAccess').attr('disabled', 'disabled');
	       
	       
	        
	      //  $('#NursingIntialAssessment').find('.editUserAccess').remove("onclick");
	        $('#NursingIntialAssessment').find('button,input,select').attr('disabled', 'disabled');
	        
	        //$('#ChemoOrderSheet').find('.editUserAccess').remove("onclick");
	        $('#ChemoOrderSheet').find('button,input,select').attr('disabled', 'disabled');
	        
	      //  $('#CarePlan').find('.editUserAccess').remove("onclick");
	        $('#CarePlan').find('button,input,select').attr('disabled', 'disabled');
	        
	        //$('#PainScale').find('.editUserAccess').remove("onclick");
	        $('#PainScale').find('button,input,select').attr('disabled', 'disabled');
	        
	        $('.editUserAccess').attr('disabled', 'disabled');
	      
	}
}