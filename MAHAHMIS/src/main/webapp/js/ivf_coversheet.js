/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for set  opd coversheet template
 * *****/
function setTemForcoversheet(id) {
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");

	var temp = '<div style="margin: 0px;" class="col-md-12-3" id="row1">'
			+ '	<div class="col-md-4-1">'
			+ '	<div style="margin-top: 0px;" class="col-md-12-1 box border default">'
			+ '<div style="margin-top: 0px; background-color: #f0ad4e;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Patient Summary</h4></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1">'
			+ '<table class="table table-condensed"><thead>'
			+ '<tr class="TextFont"><th class="col-md-1-1">#</th>'
			+ '<th class="col-md-3-1">Referred To</th> '
			+ '<th class="col-md-3-1">Start Date</th>'
			+ '<th class="col-md-6-1">Admission No</th>'
			+ '<th class="col-md-3-1">Action</th></tr>'
			+ '</thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="previousPatientSummaryTable">'
			+ '</tbody>	</table></div></div></div>'
			+ '<div class="col-md-4-1"><div style="margin: 0px;" class="box border default col-md-12-1">'
			+ '<div style="margin-top: 0px; background-color: #539fb8;" class="box-title col-sm-12-1"><h4>'
			+ '<i class="fa fa-bars"></i>Lab</h4>'
			// Added by Laxman on 22-Feb-2018 for Compare Test result.
			+ '<div class="pull-right">'
			+ '<button title="Compare Test Results" onclick="showComparePopUp(\'cmprbtn\')" type="button" style="margin-top: -4px;display:none;" id="labcmpbut" class="lab_button">'
			+ '<i class="fa fa-exchange"></i></button>'

			+ '<button title="View Lab Result" onclick="showPopUpTestResult(\'viewbtn\')" type="button" style="margin-top: -4px;display:none;" id="labbut" class="lab_button">'
			+ '<i class="fa fa-eye View"></i></button>'
			+ '<button title="View Lab Result" onclick="showreqPopUp()" type="button" style="margin-top: -4px;display:none;" id="labbut" class="b">'
			+ '<i class="fa fa-eye View"></i></button>'
			+ '</div></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1"><table class="table table-condensed"><thead>'
			+ '<tr><th class="col-md-1-1"><div class="TextFont">#</div></th>'
			+ '<th class="col-md-4-1"><div class="TextFont">Particulars</div></th>'
			+ '<th class="col-md-2-1"><div class="TextFont">Date</div></th>'
			+ '<th class="col-md-2-1"><div class="TextFont">Time</div></th></tr></thead>'
			+ '</table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="coverSheetLabDashBoard">'
			+ '</tbody></table></div></div></div>'
			+ '<div class="col-md-4-1"><div style="margin: 0px;" class="box border default col-md-12-1">'
			+ '<div style="margin-top: 0px; background-color: #a696ce;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Vitals</h4>'
			+ '<div class="pull-right"><label style="cursor: pointer; margin-right: 20px;" id="editVitals" onclick="getAllVitalPopUp()">'
			+ '<i class="fa fa-eye View"></i>View All</label> <label style="cursor: pointer;" id="newVitals" onclick="showVitalsOnPopUp()">'
			+ '<i class="fa fa-plus-square"></i>Todays Vitals</label></div></div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1">'
			+ '<table class="table table-condensed">'
			+ '	<thead><tr>'
			+ '<th class="col-md-1-1 TextFont">#</th><th class="col-md-6-1 TextFont">Particulars</th>'
			+ '<th class="col-md-2-1 TextFont">Date</th><th class="col-md-2-1 TextFont center">Report</th>'
			+ '</tr></thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="opdDD2ReadonlyHtmlVitals"></tbody></table></div>'
			+ '</div></div></div>'

			+ '<div style="margin-top: 0px;" class="col-md-12-1" id="row2">'

			+ '<div class="col-md-4-1">'
			+ '<div style="margin: 0px;" class="box border default col-sm-12-1">'
			+ '<div style="margin-top: 0px; background-color: #a8bc7b;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Investigation</h4></div><div style="margin-top: 3px;" class="col-sm-12-1">'
			+ '<table class="table table-condensed"><thead><tr>'
			+ '<th class="col-md-1-1"><div class="TextFont">#</div></th><th class="col-md-7-1"><div class="TextFont">Particulars</div></th>'
			+ '<th class="col-sm-3-1"><div class="TextFont">Date</div></th>'
			+ '<th class="col-sm-2-1 center"><div class="TextFont">View</div></th>'
			+ '<th class="col-md-2-1"><div class="TextFont">Report</div></th></tr></thead></table>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="coverSheetInvestDashBoard">'
			+ '</tbody></table></div></div></div></div>'

			+ '<div class="col-md-4-1">'
			+ ' <div style="margin: 0px;" class="box border default col-sm-12-1">'
			+ '<div style="margin-top: 0px; background-color: #d9534f;" class="box-title col-sm-12-1"><h4>'
			+ '<i class="fa fa-bars"></i>Alerts &amp; Allergies</h4></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1"><table class="table table-condensed"><thead><tr>'
			+ '<th class="col-md-1-1">#</th><th class="col-md-8-1">Particulars</th>'
			+ '<th class="col-md-2-1">Date</th>'
			+ '</tr></thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="allergyAlertsCoverSheetTemp"></tbody>'
			+ '</table></div></div></div>'

			+ '<div class="col-md-4-1"><div style="margin: 0px;" class="box border default col-sm-12-1">'
			+ '<div style="margin-top: 0px;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Medication</h4></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1"><table class="table table-condensed">'
			+ '<thead><tr>'
			+ '<th class="col-md-1-1 center">#</th>'
			+ '<th class="col-md-4-1">Drugs</th>'
			+ '<th class="col-md-1-1 center">Frequency</th>'
			+ '<th class="col-md-1-1 center">Duration</th>'
			+ '<th style="padding-right: 20px;" class="col-md-1-1 center"><div class="TextFont">Status</div>'
			+ '</th></tr></thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="prescriptionCoverSheetContent"></tbody>'
			+ '</table></div></div></div></div>'

			+ '<div id="vitalEditDia" style="diplay: none; width: 100%; overflow-x: scroll;" title="All Vitals">'
			+ '<table style="width: 100%" class="table table-condensed table-bordered table-stripped">'
			+ '<tbody id="vitalsVIEWALLDATE"></tbody></table></div>'
			+ '<div id="vitalNewDia" style="diplay: none; width: 70%" title="Vitals">'
			+ '<table style="width: 100%" id="vitalNewDiaTableUI"></table></div>'
			+ '</div>'
			//todays start vital pop up
			+'<div class="modal" tabindex="-1" role="dialog" id="vitalModal"> '
			 +' <div class="modal-dialog" role="document" style="width:40%;"> '
			 +'  <div class="modal-content">'
			 +'     <div class="modal-header" style="background-color:blue;">'
			 +'      <h5 class="modal-title" >Vitals</h5>'
			
			 +'    </div>'
			 +'     <div class="modal-body">'
			// +'<div id="vitalsBodyList">  </div>'
			 +'<table class="datatable table table-striped table-bordered" id="vitalsTabel">'
			 +'<tbody id="vitalsBodyList" > </tbody>'
			 +'</table>'
			 
			 +'    </div>'
			 +'    <div class="modal-footer">'
			 +'      <button type="button" class="btn btn-primary" onclick="saveCoversheetVital()">Save changes</button>'
			 +'      <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeVitalPopUp()">Close</button>'
			 +'     </div>'
			 +'   </div>'
			 +' </div>'
			 +'</div>'
			//todays END vital pop up
			 
			//todays start all vital pop up
				+'<div class="modal" tabindex="-1" role="dialog" id="allvitalModal"> '
				 +' <div class="modal-dialog" role="document" style="width:70%;"> '
				 +'  <div class="modal-content">'
				 +'     <div class="modal-header" style="background-color:blue;">'
				 +'      <h5 class="modal-title" >Vitals</h5>'
				
				 +'    </div>'
				 +'     <div class="modal-body">'
				// +'<div id="vitalsBodyList">  </div>'
				/* +'<tabel>'
				+ '<tr>'
				 +'<th> <label> Treatment Id: </label></th>'
				 +'<th> <label>  </label></th>'
				 +'<th> <label> '+22+' </label></th>'
				 + '<tr>'
				 +'</tabel>'*/
				
				// +'<table class="datatable table table-striped table-bordered" id="vitalsTabel1">'
				/* +'<tbody id="vitalsBodyList1" > </tbody>'
				 +'</table>'*/
				 
				 +'<div id="vitalsBodyList1"> '
				 
				 +'</div>'
				 +'<div class="clearfix"></div>'
				 
				 +'    </div>'
				 +'    <div class="modal-footer">'
				 +'      <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeAllVitalPopUp()">Close</button>'
				 +'     </div>'
				 +'   </div>'
				 +' </div>'
				 +'</div>'
				// END allvital pop up

	;

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	getVitalsListOnCoversheet();
	fetchAllAllergyAlertsOnOPDCoversheet();
	getAllPrescriptionsOnOPDCoversheet();
	fetchInvestigationDashboard();
	fetchBillDetails();
}

/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for getVitalsListOnCoversheet  on  opd coversheet 
 * *****/
function getVitalsListOnCoversheet() {
	var cType = 3;
	
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
			setVitalsListOnCoversheet(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for setVitalsListOnCoversheet  on  opd coversheet 
 * *****/
function setVitalsListOnCoversheet(r){
	
	
	var todays_date=$("#todays_date").val();
 var dateArray=todays_date.split("-");
 var newDate=dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
	
	
	$("#opdDD2ReadonlyHtmlVitals").html("");
	var htm = "";
	var rowCount = 0;

	
	if (r.listChartType.length > 0) {

		for ( var i = 0; i < r.listChartType.length; i++) {
			rowCount++;
			
			htm = htm
					+ "<tr class='newChartTemp' id='count"
					+ (rowCount)
					+ "'>"
					
					+"<td class='col-md-1-1 TextFont'> "+rowCount+"  </td>" 
					
					+"<td class='col-md-6-1 TextFont' > "+r.listChartType[i].name+"  </td>" 
					
					+"<td class='col-md-2-1 TextFont'> "+newDate+"  </td>" 
					
					+"<td class='col-md-2-1 center'> <label id='vitalResult_"+i+"'  value="+r.listChartType[i].fee+"> "+r.listChartType[i].fee+" </label>  </td>" 
					
					+ "</tr>";
			
		}
		
		
		$("#opdDD2ReadonlyHtmlVitals").html(htm);
		getDataForCoversheet();
	}
	
	
}
/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for vital result   on  opd coversheet 
 * *****/
function getDataForCoversheet(){
	var treatmentId = $("#ivfTreatId").val();
	var unitId=$('#unitId').val();
	var todays_date=$("#todays_date").val();
	 var dateArray=todays_date.split("-");
	 var newDate=dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
	var inputs = [];
	
	
	
	inputs.push('unitId=' + unitId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('CallFrom=' + "today");
	inputs.push('userDate=' + newDate);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfvital/getCoversheetTreatmentListByTreatmentId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			
			
			for(var i=0; i< r.getListOfOPDCoversheetVitalDTO.length;i++){
				var neo_id = r.getListOfOPDCoversheetVitalDTO[i].vitalValue;
				
				 $("#vitalResult_"+i).text(r.getListOfOPDCoversheetVitalDTO[i].result);
			}
			
		}
	});
}


function showVitalsOnPopUp(){
	
	$("#vitalModal").show();
	//$("#vitalModal").dialog("open");
	getTodaysVitalsOnPopUp();
	
}

function closeVitalPopUp(){
	$("#vitalModal").hide();
}

/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for get todays vital list    on pop up  opd coversheet 
 * *****/
function getTodaysVitalsOnPopUp(){
	var cType = 3;
	
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
			setVitalsListOnOnPopUp(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for set todays vital list    on  opd coversheet 
 * *****/
function setVitalsListOnOnPopUp(r){
	
	var count=1;
	var temp="";
	for(var i=0; i< r.listChartType.length;i++){
		temp = temp 
		+'<tr class="newRowHistoryRow">'
		+'<td> <label>'+count+' </label> </td>' 
		
		+"<td class='col-md-2-1 TextFont' >   </td>" 
		
		+'<td> <label>'+r.listChartType[i].name+' </label> </td>'
		
		+"<td class='col-md-2-1 TextFont' >   </td>" 
		
		+'<td> <input type="text"  value="0"  id="textResult'+i+'"> </td>'
		//+'<input id=radio'+r.listChartType[i].name+' type="checkbox" name="radiationFlagChk" value="0_' +r.listChartType[i].name+'" onclick="delteRadioTheropySlave('+r.listChartType[i].name+')">'
		
		+'<td> <input type="hidden"  value="0_' +r.listChartType[i].idchartTypeTbl+'"  id="textMasterId'+i+'"> </td>'
		+'</tr>'
		
		count++;
	}
	
	$("#vitalsBodyList").html(temp);
	fecttodaysVitalList();
	
}

/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for save  vital     on  opd coversheet 
 * *****/
function saveCoversheetVital(){
var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var ivftreatmentId = $("#ivfTreatId").val();
	
	var unitId=$('#unitId').val();
	
	var userId=$('#userId').val();
	
	var uhid="";
	
	var todays_date=$("#todays_date").val();
	 var dateArray=todays_date.split("-");
	 var newDate=dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
	
	var coversheetDetails = {
			getListOfOPDCoversheetVitalDTO : []
		};
	
	var rows = $('#vitalsTabel tbody tr.newRowHistoryRow').length;
	
	for ( var i = 0; i <  rows; i++) {
		var textMasterId = $("#textMasterId" + i).val();
		
		var textIds=textMasterId.split("_");
		
		var vitalMasterId=textIds[0];
		
		var vitalValue=textIds[1];
		var vitalDate=newDate;
		
		var result = $("#textResult" + i).val();

		setCoversheetInfoList(coversheetDetails,vitalMasterId,
				vitalValue, vitalDate, unitId,userId,uhid,result);
	}
	
	coversheetDetails = JSON.stringify(coversheetDetails);
	var inputs = [];
	inputs.push('patientId=' + patientId);
	
	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('ivftreatmentId=' + ivftreatmentId);
	
	inputs.push("coversheetDetails="	+ encodeURIComponent(coversheetDetails));
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfvital/saveCoversheetVital",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				getVitalsListOnCoversheet();
				getTodaysVitalsOnPopUp();
				//refreshHistoryData();
				//getIPDHistoryTemplateList();
			}else if(r==2) {
				alert("Record Updated Successfully");
				getVitalsListOnCoversheet();
				getTodaysVitalsOnPopUp();
				//refreshHistoryData();
				//getIPDHistoryTemplateList();
			}
			else {
				alert("Network Issue..");
			}

			
			

		}
	});
}

function setCoversheetInfoList(coversheetDetails,vitalMasterId,
		vitalValue, vitalDate, unitId,userId,uhid,result){
	
	coversheetDetails.getListOfOPDCoversheetVitalDTO.push({
		vitalMasterId : vitalMasterId,
		vitalValue : vitalValue,
		vitalDate : vitalDate,
		unitId : unitId,
		userId : userId,
		uhid : uhid,
		result:result,
		
		
	});
	
}
/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for fetch todays vital list    on  opd coversheet 
 * *****/
function fecttodaysVitalList(){
	
	var treatmentId = $("#ivfTreatId").val();
	var unitId=$('#unitId').val();
	var todays_date=$("#todays_date").val();
	 var dateArray=todays_date.split("-");
	 var newDate=dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
	var inputs = [];
	
	
	
	inputs.push('unitId=' + unitId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('CallFrom=' + "today");
	inputs.push('userDate=' + newDate);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfvital/getCoversheetTreatmentListByTreatmentId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			
			//getTodaysVitalsOnPopUp();
			
			
			
			for(var i=0; i< r.getListOfOPDCoversheetVitalDTO.length;i++){
				var neo_id = r.getListOfOPDCoversheetVitalDTO[i].vitalValue;
				
				 $("#textMasterId"+i).val(r.getListOfOPDCoversheetVitalDTO[i].vitalMasterId+"_"+r.getListOfOPDCoversheetVitalDTO[i].vitalValue);
				
				 $("#textResult"+i).val(r.getListOfOPDCoversheetVitalDTO[i].result);
			}
			
			
			

		}
	});
}


function getAllVitalPopUp(){
	$("#allvitalModal").show();
	//getAllVitalList();
	getVitalListOnAllPopUp();
}

function closeAllVitalPopUp(){
	$("#allvitalModal").hide();
	
}

function getVitalListOnAllPopUp(){
	
	var pt_Id = $("#pt_Id").val();

	var inputs = [];
	
	
	
	
	inputs.push('patientId=' + pt_Id);
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfvital/lstCoversheetVitalInfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			/*let a= [];
			for(var i=0; i< r.lstCoversheetVitalInfo.length;i++){
				a.push(r.lstCoversheetVitalInfo[i].treatment_id);
			}
			
			
			var unique = a.filter((item, i, ar) => ar.indexOf(item) === i).toString();
			
			
			var ArrayVital=unique.split(",");
			
			
			
			//getTodaysVitalsOnPopUp();
			
			for(var i=0;i<ArrayVital.length;i++){
				
				ArrayVital[i];
			}*/

			let a= [];
			for(var i=0; i< r.lstCoversheetVitalInfo.length;i++){
				a.push(r.lstCoversheetVitalInfo[i].treatment_id);
			}
			
			
			var unique = a.filter((item, i, ar) => ar.indexOf(item) === i).toString();
			
			
			var ArrayVital=unique.split(",");

			// for Vitals
			let b= [];
			for(var i=0; i< r.lstCoversheetVitalInfo.length;i++){
				b.push(r.lstCoversheetVitalInfo[i].vital);
			}
			
			
			var unique1 = b.filter((item, i, ar) => ar.indexOf(item) === i).toString();
			
			
			var ArrayVital1=unique1.split(",");
			
			//  for get unique date
			let c= [];
			for(var i=0; i< r.lstCoversheetVitalInfo.length;i++){
				c.push(r.lstCoversheetVitalInfo[i].vital_date);
			}
			
			var unique2 = c.filter((item, i, ar) => ar.indexOf(item) === i).toString();
			
			var ArrayVital2=unique2.split(",");
			
			
			//

			// alert("ArrayVital1.... "+ArrayVital1)
			

			$("#vitalsBodyList1").html("");
			var htm = "";	
			var rowCount = 0;
			
			htm = htm +"<div class='col-md-12'>"
			
			if (ArrayVital1.length > 0) {
			
				htm = htm +"<div class='first-block col-md-3' style='display: block; '><b style='color:red; font-size:12px;' >TreatmentID &nbsp;&nbsp; &#10132;</b> ";
			
				
				for ( var i = 0; i < ArrayVital1.length; i++) {
					rowCount++;
					
					
					htm = htm +"<div class='btn btn-success' style='width: 100%'>"+ArrayVital1[i]+"</div>";
					
							
							//+"<td class='col-md-1-1 TextFont'> "+rowCount+"  </td>" 
							
							//+"<td class='TextFont' style='width: 30%'> "+ArrayVital1[i]+"  </td>" 
							
							 
							
						//	+"<td class='TextFont' > "+r.lstCoversheetVitalInfo[i].result+"  </td>" 

							
							
							//+"<td class='col-md-6-1 TextFont' > "+r.listChartType[i].name+"  </td>" 
							
							// + "</tr>";
					
				}
				
				
				
				htm = htm +"</div>";

		 for( var k = 0; k < ArrayVital2.length; k++){
            for( var j = 0; j < ArrayVital.length; j++){
            	
            	var displayHeaderFlag = 'N';
            	for ( var i = 0; i < r.lstCoversheetVitalInfo.length; i++) {
					rowCount++;
					
					
					if(ArrayVital2[k] == r.lstCoversheetVitalInfo[i].vital_date && ArrayVital[j] == r.lstCoversheetVitalInfo[i].treatment_id  )
					{
						
						
						displayHeaderFlag = 'Y';

					
					}
							
					
				}
            	if(displayHeaderFlag == 'Y')
            		htm = htm +"<div class='first-block col-md-2' style='display: block; '>"+ArrayVital[j]+"- "+ArrayVital2[k]+"";
            		
            	for ( var i = 0; i < r.lstCoversheetVitalInfo.length; i++) {
					rowCount++;
					
					
					if(ArrayVital2[k] == r.lstCoversheetVitalInfo[i].vital_date && ArrayVital[j] == r.lstCoversheetVitalInfo[i].treatment_id  )
					{
						
						
						htm = htm +"<div class='btn btn-success' style='width: 100%'>"+r.lstCoversheetVitalInfo[i].result+"</div>";

					
					}
							
					
				}
            	if(displayHeaderFlag == 'Y')
            		htm = htm +"</div>";
            	
				
			}
            
          
			}
		 
				

				
				
				$("#vitalsBodyList1").html(htm);
				
			}
			
			 htm = htm +"</div>";
			

		}
	});
	
}
function getAllVitalList(){
	var treatmentId = $("#ivfTreatId").val();
	var unitId=$('#unitId').val();
	var todays_date=$("#todays_date").val();
	 var dateArray=todays_date.split("-");
	 var newDate=dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
	var inputs = [];
	
	
	
	inputs.push('unitId=' + unitId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('CallFrom=' + "today");
	inputs.push('userDate=' + newDate);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfvital/getCoversheetTreatmentListByTreatmentId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			
			//getTodaysVitalsOnPopUp();
			
			for(var i=0; i< r.getListOfOPDCoversheetVitalDTO.length;i++){
				var neo_id = r.getListOfOPDCoversheetVitalDTO[i].vitalValue;
				
				 $("#textMasterId"+i).val(r.getListOfOPDCoversheetVitalDTO[i].vitalMasterId+"_"+r.getListOfOPDCoversheetVitalDTO[i].vitalValue);
				
				 $("#textResult"+i).val(r.getListOfOPDCoversheetVitalDTO[i].result);
			}
			
			
			

		}
	});
}

/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for fetch allergy    on  opd coversheet 
 * *****/
function fetchAllAllergyAlertsOnOPDCoversheet(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		
		inputs.push('treatmentId=' + treatmentId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/opdClinicalEvaluation/fetchAllAllergyAlerts",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
		//	alert(JSON.stringify(r));
		//	setAllAllergyAlerts(r);
				
				var testObj = r;
				var allergyAlertsCount = 1;
				var allergyTypeText = "";
				var allergyReactionText = "";
				
				
				var AllergyAlertsTempHtml = "";
				
				if (testObj.listOPDAllergyAlertsDto.length > 0) {
					
					for ( var int = 0; int < testObj.listOPDAllergyAlertsDto.length; int++) {
						
						if ((testObj.listOPDAllergyAlertsDto[int].allergyType) == 0) {
							allergyTypeText = "---";
						} else {
							allergyTypeText = $(
									"#allergyType option[value='"
											+ testObj.listOPDAllergyAlertsDto[int].allergyType
											+ "']").text();
											
						}
						
						if ((testObj.listOPDAllergyAlertsDto[int].allergyReaction) == "0") {
							allergyReactionText = "---";
						} else {
							allergyReactionText = $(
									"#allergyReaction option[value='"
											+ testObj.listOPDAllergyAlertsDto[int].allergyReaction
											+ "']").text();
						}
						
						AllergyAlertsTempHtml = AllergyAlertsTempHtml
								
								+ "<tr><td class='col-md-1-1'>"
								+ allergyAlertsCount
								+ "</td>"
								
								+ "<td class='col-md-8-1  '>"
								+ testObj.listOPDAllergyAlertsDto[int].allergyName
								+ "</td>"
								
								
								
								+ "<td class='col-md-2-1 '>"
								+ testObj.listOPDAllergyAlertsDto[int].allergyDate
								+ "</td>"
								
								+ "</tr>";
								

								
							}
				}
				
			
				
			$('#allergyAlertsCoverSheetTemp').html(AllergyAlertsTempHtml);
				
			}
		});
	}
}

/******
 * @author   :HM00054
 * @Date     :7-1-2022
 * @Code     :this method used for get prescription list    on  opd coversheet 
 * *****/
function getAllPrescriptionsOnOPDCoversheet(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = $("#unitId").val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/prescriptionController/getAllPrescriptionsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptionsOnOPDCoversheet(r);
			}
		});
	}
}

function setAllPrescriptionsOnOPDCoversheet(r){
	
	var testObj = r;

	var prescriptionContentTemp = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	
	var prepCount = 0;
	
	if (testObj.listOPDPrescriptionDtoSP.length > 0) {
		
		for ( var int = 0; int < testObj.listOPDPrescriptionDtoSP.length; int++) {
			

			prescriptionContentTemp = prescriptionContentTemp
					+ "<tr><td class='col-md-1-1 '>"
					+ ++prepCount
					+ ".</td>"
					+ "<td class='col-md-4-1'>"
					
					+ testObj.listOPDPrescriptionDtoSP[int].medicineName
					+ "</td>"
					
					+ "<td class='col-md-1-1 '>"
					+ testObj.listOPDPrescriptionDtoSP[int].frequency
					+ "</td>"
					
				
					+ "<td class='col-md-1-1 '>"
					+ testObj.listOPDPrescriptionDtoSP[int].days +"Days"
					+ "</td>"
					
					+ "<td class='col-md-1-1 '>"
					+ "ACTIVE"
					+ "</td>"
					
					
					+ "</tr>";
		}
	}

	$('#prescriptionCoverSheetContent').html(prescriptionContentTemp);
	

	
	
}

// this is all about lab detials by Vishnu

/******
 * @author   :HM00066
 * @Date     :7-1-2022
 * @Code     :this method used for get Opd lab list on  opd coversheet 
 * *****/

function setOpdlab(response) {
	
	var pathoMngmnt=$("#pathoMngmnt").val();
	if(pathoMngmnt=="on"){
		$(".lab_button").show();
		$(".b").hide();
	}else{
		$(".b").show();
		$(".lab_button").hide();
	}
	
	var htm = "";
	var index = 1;
	var count = 1;
	$("#labbut").prop('disabled',true);
	$("#labcmpbut").prop('disabled',true);
	for ( var i = 0; i < response.cpoeServdetails.length; i++) {
		var dateTime=new Date(response.cpoeServdetails[i].inserted_date_time).toLocaleString();
		var date=dateTime.split(",")[0];
		var time=dateTime.split(",")[1];
		if(response.listLabRequest!=null && response.listLabRequest[i].postedResultFlag=="Y"){
			$("#labbut").prop('disabled',false);
			$("#labcmpbut").prop('disabled',false);
			var testmasterId=response.listLabRequest[i].labRequestId;
			var postDate=response.listLabRequest[i].postedDatetime;
			var labReqSlvId=response.listLabRequestSlave[i].labReqSlvId;
			//Profile Id.
			var subSerId=response.cpoeServdetails[i].categoryid;
			var isPackageFlag = "";
			isPackageFlag = response.listLabRequestSlave[i].isPackageFlag;
			htm = htm
			+ "<tr id='labNmRow"+count+"' class='btn-success' onClick='setLabTestId1("+count+","+postDate+")' ondblClick='setLabTestId("+count+","+postDate+")'>"
			+ "<td class='col-md-1-1 TextFont'>"+ index	+ "</td>"
			+ "<td class='col-md-4-1 TextFont'  >"+ response.cpoeServdetails[i].categoryName+ "</td>"
			+ "<td class='col-md-2-1 TextFont' >"+date + "</td>"
			+ "<td class='col-md-2-1 TextFont' >"+time+ "</td>"
			//+ "<td class='col-md-2-1 TextFont'></td>"
			+"<input type='hidden' value='"+testmasterId+"' id='labReqMstId"+(count)+"' />"
			+"<input type='hidden' value='"+labReqSlvId+"' id='labReqSlvId"+(count)+"' />"
			+"<input type='hidden' value='"+postDate+"' id='postDateId"+(count)+"' />"
			+"<input type='hidden' value='"+subSerId+"' id='subSerId"+(count)+"' />"
			+"<input type='hidden' value='"+isPackageFlag+"' id='isPackageFlag"+(count)+"' />"
	        + "</tr>";
	count++;	
	index++;
		}else{
			if(response.cpoeServdetails[i].serviceid !=12){
				htm = htm
				+ "<tr id='labNmRow"+count+"' class=''><td class='col-md-1-1 TextFont'>"+ index+ "</td>"
				+ "<td class='col-md-4-1 TextFont'  >"+ response.cpoeServdetails[i].categoryName+ "</td>"
				+ "<td class='col-md-2-1 TextFont' >"+date + "</td>"
				+ "<td class='col-md-2-1 TextFont' >"+time+ "</td>"
				//+ "<td class='col-md-2-1 TextFont'></td>"
		        + "</tr>";
		}
	count++;	
	index++;
		}
	}
	$("#coverSheetLabDashBoard").html(htm);
}

/******
 * @author   :HM00066
 * @Date     :7-1-2022
 * @Code     :this method used for get Opd Investigation list on  opd coversheet 
 * *****/

function fetchInvestigationDashboard() {
	var tID = $("#tr_Id").val();
	var servid = 12;
	var callform = "coversheet";
	jQuery.ajax({
		async : false,
		type : "POST",
	//	url : "ehat/opdServicesAdvised/fetchBillDetails", 	// changed, aniket kanse, 6 FEB 22
		url : "ehat/ris/fetchInvestigations",
		data : {
			"tID" : tID,
			"callform" : callform,
			"servid" : servid
		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(response) {
			
	//		alert(JSON.stringify(response));
			
			setInvestigationDashboard(response);
		}

	});

}

/******
 * @author   :HM00066
 * @Date     :7-1-2022
 * @Code     :this method used for set Opd Investigation list on  opd coversheet 
 * *****/ 

function setInvestigationDashboard(response) {
	var htm = "";
	var index = 1;

/*	for ( var i = 0; i < response.cpoeServdetails.length; i++) {
		htm = htm
				+ "<tr><<td class='col-md-1-1 TextFont'>"
				+ index
				+ "</td>"
				+ "<td class='col-md-4-1 TextFont'  >"
				+ response.cpoeServdetails[i].categoryName
				+ "</td>"
				+ "<td class='col-md-2-1 TextFont' >"
				+ new Date(response.cpoeServdetails[i].created_date_time).toLocaleDateString()
				+ "</td>"
				+ "<td class='col-md-1-1 TextFont' > "
				+ "<button id='xrayImg' class='btn btn-xs btn-success' title='View investigation image' onclick='displayInvestigationXray("
				+ response.cpoeServdetails[i].billdetailsid
				+ ","
				+ response.cpoeServdetails[i].categoryid
				+ ")' type='button' style='margin-top: -4px;'><i class='fa fa-eye View'></i></button></td>"
				+ "<td class='col-md-1-1 TextFont'> "
				+ "<button id='risview' class='btn btn-xs btn-primary' data-target='#RisviewPopUp' data-toggle='modal' onclick='getTestRadilogyReports("
				+ response.cpoeServdetails[i].billdetailsid + ","
				+ response.cpoeServdetails[i].categoryid
				+ ")'><i class='fa fa-credit-card'></i></button>" + "</td>"
				+ "</tr>";
		index++;

	}

	$("#coverSheetInvestDashBoard").html(htm);*/
	
	// changed, Aniket Kanse, FEB 22
	for ( var i = 0; i < response.listPatientInvestigations.length; i++) {
		htm = htm
				+ "<tr><<td class='col-md-1-1 TextFont'>"
				+ index
				+ "</td>"
				+ "<td class='col-md-4-1 TextFont'  >"
				+ response.listPatientInvestigations[i].investigation
				+ "</td>"
				+ "<td class='col-md-2-1 TextFont' >"
				+ response.listPatientInvestigations[i].templateName
				+ "</td>"
				+ "<td class='col-md-2-1 TextFont' > "
				+ "<button id='xrayImg' class='b' title='View investigation image' onclick='displayXray("
				+ response.listPatientInvestigations[i].idRadiologyTest
				+ ","
				+ response.listPatientInvestigations[i].testId
				+ ")' type='button' style='margin-top: -4px;'><i class='fa fa-eye View'></i></button>"
				+ "<button id='risview' class='b' title='Print investigation Report' onclick='risReportPrint("
				+ response.listPatientInvestigations[i].testId
				+ ","
				+ response.listPatientInvestigations[i].patientId
				+ ","
				+ response.listPatientInvestigations[i].treatmentId
				+ ","
				+ response.listPatientInvestigations[i].idRadiologyTest
				+ ","
				+ response.listPatientInvestigations[i].testReportId
				+ ","
				+ response.listPatientInvestigations[i].pkViewRisRecordsDTO
				+ ")' type='button' style='margin-top: -4px;'><i class='fa fa-print'></i></button>"
				// + "<button id='risview' class='btn btn-xs btn-primary'
				// data-target='#RisviewPopUp' data-toggle='modal'
				// onclick='viewRISReports("+response.listPatientInvestigations[i].testReportId+")'><i
				// class='fa fa-credit-card'></i></button>"
				+ "</td>" + "</tr>";
		index++;

	}

	$("#coverSheetInvestDashBoard").html(htm);
}

/******
 * @author   :HM00066
 * @Date     :7-1-2022
 * @Code     :this method used for get Opd Investigation list on  opd coversheet 
 * *****/

function displayInvestigationXray(billdetailsid, categoryid) {
	fetchInvestigationXrayImage(billdetailsid, categoryid);
	$("#groupModal").modal();
}

/******
 * @author   :HM00066
 * @Date     :7-1-2022
 * @Code     :this method used for get Opd Investigation image on opd coversheet 
 * *****/

function fetchInvestigationXrayImage(billdetailsid, categoryid) {
	var treatmentId = $("#tr_Id").val();
	count = 1;
	var inputs = [];
	inputs.push('testId=' + categoryid);
	inputs.push('billdetailsid=' + billdetailsid);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdCoverSheetLab/fetchInvestigationXrayImage",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			setOpdXrayImage(r)
			ajaxResponse = JSON.stringify(r);
			//var obj = eval('(' + ajaxResponse + ')');
			//$("#totalX-ray").setTemplate(opdXrayImageTempNew);
		//	$("#totalX-ray").processTemplate(obj);
		}
	});
}


/******
 * @author   :HM00066
 * @Date     :7-1-2022
 * @Code     :this method used for Opd Xray Image on  opd coversheet 
 * *****/

function setOpdXrayImage(result){
	
	var divContent = "";
	var count=0;
	divContent = divContent
	+"<div class='col-sm-12-1 scroller' style='margin-top:-21px; height: 0px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='margin-left: 00px; width: 103.2%;'>"
	+ "<tbody>";
	if (result.lstRisImageUploadDTO !=null && result.lstRisImageUploadDTO.length > 0) {
		for (var i = 0; i < result.lstRisImageUploadDTO.length; i++) {
			count++;
			divContent = divContent	
				+ "<tr>"
				+ "<td class='col-md-1 center' style='height: 21.5px;'>"+count+"</td>"
				+ "<td class='col-md-1 center' style='height: 21.5px;'>"+count+"</td>"
				+ "<td class='col-md-3 center' style='height: 21.5px;'>"+new Date(result.lstRisImageUploadDTO[i].createdDate).toLocaleDateString()+"</td>"
				+ "<td class='col-md-3 center' style='height: 21.5px;'><button class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='viewOpdXrayImage("+'Screenshot from 2020-04-02 14:53:15.png'+")' type='button'><i class='fa fa-eye View'></i></button></td>"
				+ "</tr></tbody></table></div>";
		}
	} else {
		divContent = divContent
				+ "<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#totalX-ray").html(divContent);
}

/******
 * @author   :HM00066
 * @Date     :7-1-2022
 * @Code     :this method used for Opd Xray Image on  opd coversheet 
 * *****/ 
function viewOpdXrayImage(imageName) {
	if(imageName ==null || imageName =="" || imageName ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		$('#ViewDocumemntXray').attr("src","ehat/opdCoverSheetLab/viewXrayImage?fileName="+imageName);
		$('#viewDocModal-Xray').modal('show');
	}
}