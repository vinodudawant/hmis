/*******************************************************************************
 * @author Rohini Ambhore 
 * @since 22-Mar-2021
 * @comment set  template for ivf DoctorRound
 ******************************************************************************/

function setDoctorRoundTempForIvf(id) { 
	
	$(".ehatList").removeClass("active");
    $("#" + id).addClass("active");
	
	temForIvfDoctorround();
	setIvfDoctorPreRound();
}

function temForIvfDoctorround() {
	
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var today = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '')
			+ month + '/' + year;
	var temp1 = "";
	var temp = '<div class="tab-pane active" id="DailyRoundReport">'
			+ '<div style="padding-left: 30px;" class="col-sm-12-1">'
			+ '<div style="margin-top: 15px;" class="col-sm-2-1">'
			+ '<label class="TextFont">Previous Doctor RoundReport</label></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-3-1">'
			+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'date-pick\'),\'dd/mm/yyyy\',this)" value='
			+ today
			+ ' onchange="setIvfDoctorPreRound()" name="date-pick" id="date-pick" class="form-control input-SmallText">'
			+ '</div><div style="margin-top: 5px;" class="col-sm-1-1">'
			+ '<div class="divide-10"></div>';
	
		temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success editUserAccess" id="iddrr" onclick="saveIvfDoctorRoundDetails()">';
	

	temp = temp
			+ temp1
			+ '</div> <div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<label class="TextFont">From :</label></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<input type="text" class="form-control input-SmallText" id="fromDate" name="fromDate" onchange="" value='
			+ today
			+ ' onclick="displayCalendar(document.getElementById(\'fromDate\'),\'dd/mm/yyyy\',this)" readonly="readonly">'
			+ '</div>'
			+ '<div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<label class="TextFont">To :</label>'
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 15px;">'
			+ '<input type="text" class="form-control input-SmallText" id="toDate" name="toDate" onchange="" value='
			+ today
			+ ' onclick="displayCalendar(document.getElementById(\'toDate\'),\'dd/mm/yyyy\',this)" readonly="readonly">'
			+ '</div>'
			// print
			+ '<div style="margin-top: 13px;" id="ipdPrintBtn" class="col-sm-1-1">'
			+ '<button data-original-title="Print " title="print" class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="left" title="" onclick="printIvfDrround()">'
			+ '<i class="fa fa-print"></i></button>'
			
			+ '</div>'
			
			+ '	<div id="HSTDiv" class="panel body col-md-12 " style=" height: 500Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;margin-top: 35px;">'

			+ ' <div style="margin-top: 15px;">'
			+ ' <div class="panel-body" id="studyModalTableIVFF" style="margin-bottom: -5%;">'


			+ ' <div  id="moveF">'
			+ ' <div  class="col-sm-12-1 dynamicstructurescroll">'
			+ ' <table border="1" class="table table-bordered table-striped table-condensed" id="DoctorRoundTabel">'
			+ ' <col>'

			+ ' <thead>' 
			
			+ ' <tr>  ' + ' <th scope="col" width="5%" >#</th>'
			+ ' <th scope="col" width="10%">Time</th>'
			+ ' <th scope="col" width="15%" >Template Name </th>'
			+ ' <th scope="col"  width="15%">Clinical Notes</th>'
			+ ' <th scope="col"  width="15%">Investigation Advice</th>'
			+ ' <th scope="col"  width="15%">RoundBy</th>'
			+ '<th style="height: 21.5px; width: 25px;">'
			+ '<input type="button" class="editUserAccess" value="+" onclick="toCreateDivIvfRow();"> <input type="button" class="editUserAccess" value="-" onclick="toRemoveIvfDivDRR(\'RowCount\')"> '
			
			+ ' </thead>' + ' <tbody id="ipdDoctorRoundStationJSPHeadDiv" >'
			+ ' </tbody>' + '</tr>' + ' </table>'

			+ '</div>' + ' </div>' + ' </div>' + '</div>' 
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	
}

function setIvfDoctorPreRound() {
	
	rowCount = 1;
	k = 1;
	count = 1;

	var tid = $("#treatmentId").html();	
	var date = $("#date-pick").val();
	
	var inputs = [];
	
	inputs.push('tid=' + tid);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');

	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/setIvfDoctorPreRound",
	
		error : function() {
			alert('error...............');
		},
		success : function(r) {
			
			$("#ipdDoctorRoundStationJSPHeadDiv").html("");
			var htm = "";
			var rowCount = 0;

			if (r.listDoctorRound.length > 0) {

				for (var i = 0; i < r.listDoctorRound.length; i++) {
					rowCount++;

					htm = htm
							+ "<tr class='newDoctorRoundRow' id='count"
							+ (rowCount)
							+ "'>"

							+ "<td> <span id='snum"
							+ rowCount
							+ "'>"
							+ rowCount
							+ "</span><input type='hidden' id='doctorRoundidHidden"
							+ rowCount
							+ "' value="
							+ r.listDoctorRound[i].doctorRoundid
							+ "></td>"

							+ "<td ><input type='text' class='form-control input-SmallText TextFont' readOnly='readOnly' onClick='setTimeForDoctorRoundIvf("+rowCount+")'    value='"
							+ r.listDoctorRound[i].time
							+ "'    id='time"
							+ (rowCount)
							+ "' ></td> "
							
							+ "<td >"
							+"<select class='form-control input-SmallText TextFont' id='tmName"+rowCount+"' onChange='getTemplateDataByTempTdForIvfDoctorRound("+rowCount+")' "
							+"</select> "
							+"	</td> "
							
							+ "<td><textarea  rows='1' cols='30' "
							+ "' id='clinicalNotes" + (rowCount) + "' > "
							+ r.listDoctorRound[i].clinicalNotes
							+ "</textarea></td> "
							
							+ "<td><textarea  rows='1' cols='30' "
							+ "' id='investigationAd" + (rowCount) + "' > "
							+ r.listDoctorRound[i].investigationAd
							+ "</textarea></td> "
							
							+ "<td >"
							+"<select class='form-control input-SmallText TextFont' id='roundBy"+rowCount+"' "
							+"</select> "
							+"	</td> "
							
							+ "<td><input type='checkbox'   class='chkgyno'  value='"
							+ rowCount
							+ "'"
							+ " name='doctordocid'   isNew='false' id="
							+ r.listDoctorRound[i].doctorRoundid
							+ "></td>"

							+ "</tr>";
				}

				$("#ipdDoctorRoundStationJSPHeadDiv").append(htm);
				getDoctorListForEmbryoTransperIvfDoctor("fetch");
				//getTemplateDataByTempTdForIvfDoctorRound(rowCount);
				var rows = $('#DoctorRoundTabel tbody tr.newDoctorRoundRow').length;
				
				for(var i=0;i<rows;i++){ 
					
					$('#roundBy'+(i+1)).val( r.listDoctorRound[i].roundBy);
				
				}
				getIvfDoctorListTemplateName("fetch");
				for(var i=0;i<rows;i++){ 
					
					$('#tmName'+(i+1)).val( r.listDoctorRound[i].tmName);
				
				}					
				
			}
		}
	});

	
}

function toCreateDivIvfRow() {
	
	var rowCount = $('#DoctorRoundTabel tbody tr').length;
	rowCount=parseInt(rowCount+1);		
	var htm = "";

	htm = htm
	+"<tr class='newDoctorRoundRow' id='count"+(rowCount)+"'>" 
	
	+ "<td> "
	+"<span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='doctorRoundidHidden" + rowCount + "' value='"
	+ 0 + "' >" 
	+"</td>"	
	
	+ "<td><input type='text'  class='form-control input-SmallText TextFont' readonly='readonly' onClick='setTimeForDoctorRoundIvf("+rowCount+")'  "
	+ "'  id='time"
	+parseInt(rowCount)
	+ "' ></td> "
	
	+ "<td><select class='form-control input-SmallText TextFont' id='tmName"+rowCount+"' onChange='getTemplateDataByTempTdForIvfDoctorRound("+rowCount+")' "
	+"</select> "
	+ "</td> "
		
	+ "<td>"
	+"<textarea id='clinicalNotes"+(rowCount)+"' rows='1' cols='30' ></textarea> "
	+" </td> "
	
	+ "<td>"
	+"<textarea id='investigationAd"+(rowCount)+"' rows='1' cols='30' ></textarea> "
	+" </td> "
	
	+ "<td><select class='form-control input-SmallText TextFont' id='roundBy"+rowCount+"' "
	+"</select> "
	+ "</td> "

	+ "<td><input type='checkbox' class='chkgyno' id='checkbox" 
	+ parseInt(rowCount)
	+ "' name='checkbox'  value='"+parseInt(rowCount)+"'></td>"

    +"</tr>";
		
	$("#ipdDoctorRoundStationJSPHeadDiv").append(htm);
	getDoctorListForEmbryoTransperIvfDoctor("create");
	getIvfDoctorListTemplateName("create");	
	
}

function saveIvfDoctorRoundDetails() {
	
	var treatmentId = $("#tr_Id").val();
	var patientId = $("#patientId").html();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	
	var date = $("#date-pick").val();

	var DoctorRoundDtoDetails = {
		listDoctorRound : []
	};

	var rows = $('#DoctorRoundTabel tbody tr.newDoctorRoundRow').length;

	for (var i = 1; i <= rows; i++) {

		var doctorRoundid = $("#doctorRoundidHidden" + i).val();
		var time = $("#time" + i).val();
		var tmName = $("#tmName" + i).val();
		var tmNameIvfDoctorName= $( "#tmName"+i+" option:selected" ).text();
		var clinicalNotes = $("#clinicalNotes" + i).val();
		var investigationAd = $("#investigationAd" + i).val();
		var roundBy = $("#roundBy" + i).val();		
		var roundByDoctorName= $( "#roundBy"+i+" option:selected" ).text();

		if (time == "" && tmName == "" && clinicalNotes == "" && investigationAd == "") {
			alert("You can not save empty fields....");
			return false;
		} else if (time == undefined || time == "") {
			alert("Please select Time for Doctor Round");
			return false;
		} else if (roundBy == undefined || roundBy == 0) {
			alert("Please select Doctor Name For Round");
			return false;
		}
		
		setListDoctorRoundIvf(DoctorRoundDtoDetails, treatmentId, patientId, doctorRoundid, time, tmName, clinicalNotes,
				investigationAd, roundBy,userId,unitId,roundByDoctorName,tmNameIvfDoctorName,date)
	}
	
	DoctorRoundDtoDetails = JSON.stringify(DoctorRoundDtoDetails);

	var inputs = [];
	inputs.push("DoctorRoundDtoDetails="+ encodeURIComponent(DoctorRoundDtoDetails))
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/saveIvfDoctorRound",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Network Issue");
		},
		success : function(r) {
			alert(r);

			 $("#ipdDoctorRoundStationJSPHeadDiv").html("");
			//fetchDoctorRoundInfo();
			 setIvfDoctorPreRound(); 
			 
		}
	});
	
}
function setListDoctorRoundIvf(DoctorRoundDtoDetails, treatmentId, patientId,
		doctorRoundid, time, tmName, clinicalNotes,investigationAd,roundBy, userId,
		unitId,roundByDoctorName,tmNameIvfDoctorName,date) {

	DoctorRoundDtoDetails.listDoctorRound.push({
		
		doctorRoundid : doctorRoundid,
		patientId : patientId,
		treatmentId : treatmentId,
		time : time,
		tmName : tmName,		
		clinicalNotes : clinicalNotes,
		investigationAd : investigationAd,
		roundBy : roundBy,		
		createdBy : userId,
		updatedBy : userId,
		unitId : unitId,
		roundByDoctorName : roundByDoctorName,
		tmNameIvfDoctorName :tmNameIvfDoctorName,
		date :date,
		
	});	
}

function fetchDoctorRoundInfo() {
	
	 var pid = $("#patientId").html();
	 var tid = $("#treatmentId").html();

	 var inputs = [];
	 inputs.push('pid=' + pid);
	 inputs.push('tid=' + tid);
	
	 var str = inputs.join('&');

	 jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivfDoctorRound/fetchDoctorRound",

				error : function() {
					alert('Network Issue.......................!!!');
				},

				success : function(r) {
					//alert('Success fetch'+JSON.stringify(r))
					
					$("#ipdDoctorRoundStationJSPHeadDiv").html("");
					var htm = "";
					var rowCount = 0;

					if (r.listDoctorRound.length > 0) {

						for (var i = 0; i < r.listDoctorRound.length; i++) {
							rowCount++;

							htm = htm
									+ "<tr class='newDoctorRoundRow' id='count"
									+ (rowCount)
									+ "'>"

									+ "<td> <span id='snum"
									+ rowCount
									+ "'>"
									+ rowCount
									+ "</span><input type='hidden' id='doctorRoundidHidden"
									+ rowCount
									+ "' value="
									+ r.listDoctorRound[i].doctorRoundid
									+ "></td>"

									+ "<td ><input type='text' class='form-control input-SmallText TextFont' readOnly='readOnly' onClick='setTimeForDoctorRoundIvf("+rowCount+")'    value='"
									+ r.listDoctorRound[i].time
									+ "'    id='time"
									+ (rowCount)
									+ "' ></td> "
									
									+ "<td >"
									+"<select class='form-control input-SmallText TextFont' id='tmName"+rowCount+"' onChange='getTemplateDataByTempTdForIvfDoctorRound("+rowCount+")' "
									+"</select> "
									+"	</td> "
									
									+ "<td><textarea  rows='1' cols='30' "
									+ "' id='clinicalNotes" + (rowCount) + "' > "
									+ r.listDoctorRound[i].clinicalNotes
									+ "</textarea></td> "
									
									+ "<td><textarea  rows='1' cols='30' "
									+ "' id='investigationAd" + (rowCount) + "' > "
									+ r.listDoctorRound[i].investigationAd
									+ "</textarea></td> "
									
									+ "<td >"
									+"<select class='form-control input-SmallText TextFont' id='roundBy"+rowCount+"' "
									+"</select> "
									+"	</td> "
									
									+ "<td><input type='checkbox'   class='chkgyno'  value='"
									+ rowCount
									+ "'"
									+ " name='doctordocid'   isNew='false' id="
									+ r.listDoctorRound[i].doctorRoundid
									+ "></td>"

									+ "</tr>";
						}

						$("#ipdDoctorRoundStationJSPHeadDiv").append(htm);
						getDoctorListForEmbryoTransperIvfDoctor("fetch");
						//getTemplateDataByTempTdForIvfDoctorRound(rowCount);
						var rows = $('#DoctorRoundTabel tbody tr.newDoctorRoundRow').length;
						
						for(var i=0;i<rows;i++){ 
							
							$('#roundBy'+(i+1)).val( r.listDoctorRound[i].roundBy);
						
						}
						getIvfDoctorListTemplateName("fetch");
						for(var i=0;i<rows;i++){ 
							
							$('#tmName'+(i+1)).val( r.listDoctorRound[i].tmName);
						
						}					
						
					}
				}
			});		
}

function toRemoveIvfDivDRR() {
	
	var tableId = "DoctorRoundTabel";
	var checkboxClass = "chkgyno";

	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='doctordocid']:checked").each(function() {

		var slaveId = $("#doctorRoundidHidden" + $(this).val()).val();
		if (slaveId > 0) {

			docId.push($("#doctorRoundidHidden" + $(this).val()).val());
		}
	});

	if (docId.length > 0) {

		var inputs = [];
		inputs.push('ovampickupslaveids=' + docId);
		inputs.push('userId=' + userId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ivfDoctorRound/deleteDoctorRoundInfo",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error.................');
			},
			success : function(response) {
               
				$('.' + checkboxClass + ':checkbox:checked').parents("tr")
						.remove();
				alert(response);
				checkForFreshListDR(tableId);
				checkFreshListSequeneceDR(tableId);
				
			}
		});
	} else {
		$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
		checkForFreshListDR(tableId);
		checkFreshListSequeneceDR(tableId);
	}	
}

function checkForFreshListDR(tableId) {
	
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
	
}
function checkFreshListSequeneceDR() {
	
	var trLength = $('#' + tableId).find("tr:first th").length;

trLength = trLength + 1;

obj = $('#' + tableId + ' tbody tr td').find('input,span,td,select');

var inx = 1;
var idIndex = 1;
$.each(obj, function(key, value) {

	if (inx == (trLength + 1)) {

		inx = 1;
		idIndex++;
	}
	id = value.id;

	var idText = (value.id).replace(/[0-9]/g, '');
	var replaceById = idText + idIndex;
	$('#' + id).attr('id', replaceById);

	inx++;
});	
}

function getDoctorListForEmbryoTransperIvfDoctor(callfrom) { 
	
	var rows = $('#DoctorRoundTabel tbody tr.newDoctorRoundRow').length;
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getDoctorListForOvamPickUp",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			

		var unitlistTemp = "";
		unitlistTemp = unitlistTemp
				+ "<option value='0'>--Select --</option>";
		for (var i = 0; i < r.listDoctor.length; i++) {
			unitlistTemp = unitlistTemp + "<option value="
					+ r.listDoctor[i].di + " ' data-name=" + r.listDoctor[i].dn + "'>"
					+  r.listDoctor[i].dn + "</option>";
		}
		
		if(callfrom === "fetch"){
		for(var i=1;i<=rows;i++){ 
		
			$('#roundBy'+i).html(unitlistTemp);	
			
		}
			
		}else if(callfrom === "create"){
		
			for(var i=1;i<=rows;i++){ 
				var docId=	$('#roundBy'+i).val();
				
				$('#roundBy'+i).html(unitlistTemp);	
				$('#roundBy'+i).val(docId);
			}
		
		}	
	}
});
	
}

function getIvfDoctorListTemplateName(callfrom)
{
	var rows = $('#DoctorRoundTabel tbody tr.newDoctorRoundRow').length;

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/getTemplateNameForIvfDoctorRound",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			 alert("errorr..........");
		},
		success : function(r) {

			var unitlistTemp = "";
			unitlistTemp = unitlistTemp
					+ "<option value='0'>--Select --</option>";
			
			for (var i = 0; i < r.listDRT.length; i++) {  
				
				unitlistTemp = unitlistTemp + "<option value="
						+ r.listDRT[i].templateId + " ' data-name=" + r.listDRT[i].templateName + "'>"
						+  r.listDRT[i].templateName + "</option>";
			}
					
			if(callfrom === "fetch"){
				for(var i=1;i<=rows;i++){ 
									
					$('#tmName'+i).html(unitlistTemp);					
				}
					
				}else if(callfrom === "create"){
				
					for(var i=1;i<=rows;i++){ 
						var docId=	$('#tmName'+i).val();
						
						$('#tmName'+i).html(unitlistTemp);	
						$('#tmName'+i).val(docId);
					}				
				}				
		}
	});	
}

function setTimeForDoctorRoundIvf(rowCount){
	$('#time' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
}

function getTemplateDataByTempTdForIvfDoctorRound(rowCount){
	
	var tempId=$('#tmName'+(rowCount)).val();

	var inputs = [];
	inputs.push('tempId='+tempId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/getIvfTemplateDataForIvfDr",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			 alert("errorr..........");
		},
		success : function(r) {
			
			
				var clinicalNote=r.listDRT[0].clinicalNote;
				var investigationAdvice=r.listDRT[0].investigationAdvice;
				
				 $("#clinicalNotes" + rowCount).val(clinicalNote);
				
			    $("#investigationAd" + rowCount).val(investigationAdvice);			
			
		}
	});	
	
}


function printIvfDrround() {
	
	var patID = $("#pt_Id").val();
	var treatID = $("#tr_Id").val();
	
	var date = $("#date-pick").val();
	var from_date = $("#fromDate").val();
	var to_date = $("#toDate").val();
	

	setTimeout(
			function() {
				
					window .open(("ivf_doctor_round_Print.jsp?" + "patID="
							+ encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID))
							+ "&date=" + date
							+"&fromDate=" + encodeURIComponent(from_date) + "&toDate=" + encodeURIComponent(to_date));
			}, 300);
	return;	
}

/*******************************************************************************
 * @author Rohini AMbhore 
 * @since 26-03-2021
 * @comment set  template for ivf Prescription
 ******************************************************************************/

function setPrescriptionTempForIvf(id) { 
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	      showADNOTE('OrderForm');
         temForIvfPrescription();        
         //fetchIvfPrescriptionData();
         fetchPrescriptionByDate(); 
         
         fetchUnitTypeList("DoctorDesk");
		fetchPreperationsList("DoctorDesk");
		fetchUnitTypeList("DoctorDesk");
		fectchAllPrescriptionInstruction("IPD");
		
		showPrescriptionTemp();
		var v=$("#OFdate-pick").val(todaysDefaultDate); 
		var shraddhaFlow = $("#shraddhaFlow").val();
		if (shraddhaFlow == "off") {
			$("#shrdhaF").hide();
			$("#shrdhaH").hide();
		}
}
function temForIvfPrescription() { 
	
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var today = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '')
			+ month + '/' + year;
	
	var temp = '<div class="tab-pane active" id="OrderForm">'
		    
			+ '<div style="padding-left: 30px;" class="col-sm-12-1">'
			+ '<input type="hidden" id="prescriptionIdHidden" value="0">'
			+ '<div style="margin-top: 6px;" class="col-sm-1-1"><label class="TextFont">Prescription</label></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-3-1">'
			
			+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'date-pick\'),\'dd/mm/yyyy\',this)" value='
			+ today
			+ ' onchange="fetchPrescriptionByDate()" name="date-pick" id="date-pick" class="form-control input-SmallText col-sm-6-1">'
			
			//+ '<input type="text" value=today readonly="readonly" onclick="displayCalendar(document.getElementById(\'OFdate-pick\'),\'dd/mm/yyyy\',this)" onchange="checkDate(),setDoctorPreRound(),featchOrderFormByDate()" name="date-pick" id="OFdate-pick" class="form-control input-SmallText col-sm-6-1">'
			+ '<div style="margin-top: 2px; margin-left: 5px;" class="col-sm-5-1"><label class="TextFont col-sm-6-1">Order ID : </label>'
			+ '<div class="col-sm-6-1" id="divOmID"></div></div>'
			+ '</div>'
					
			+ '<div style="margin-top: 6px;" class="col-sm-2-1" id="divCopyOrderForm">'
			+ '<a style="color: inherit; background-color: transparent;" onmouseover="this.style.color=\'black\'" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'inherit\'" onclick="copyCurrentOrderForm(0)" href="#">Copy 	Prescription To Current Date</a></div>'
			+ '<div class="col-md-2-1"><button class="btn btn-xs btn-warning" data-toggle="modal"  style="margin-top: 10px;margin-left: -13px;"'
			+ 'onclick="showUpdateOrderTemp();refreshDocOrderformTemplate();disableDocOrderformTemplate1();refreshDocOrderformTemplateMedicine();fetchDocOrderformTemplateByID(0);">'
			+ 'Create and View Temp.</button></div>'
			+ '<div class="col-md-2-1"><button class="btn btn-xs btn-success" data-toggle="modal"  style="margin-top: 10px;margin-left: -13px;"'
			+ 'onclick="showHidePrescriptionSaveTemp();fetchDocOrderformTemplateByID(0);">'
			+ 'Save Temp.</button></div>'		
			
			+ '<div style="margin-top: 10px; float: right; margin-right: 0px;" class="col-sm-4-1">'
			+ '<div class="col-md-4-1"> General Medicine: <input type="checkbox" style="cursor: pointer;" id="medicineNotAvailableCheckbox"></div>'
			
			+ '<button id="ipdPrintPrRound" onclick="printIvfPrescription()" data-placement="left" data-toggle="tooltip"'
			+ '	class="btn btn-xs btn-warning col-md-1-1" data-original-title="Print "><i class="fa fa-print"></i></button>'
			
			+ '<div class="col-md-5-1"><button style="line-height: 1.2;float: right;" onclick="savePrescriptionIvf()" class="btn btn-xs btn-success editUserAccess">'
			+ '<i class="fa fa-save"></i> Save Prescription</button>'
			+ '</div></div></div>'
			+ '<div style="height: 70px; margin-top: 0px;" class="col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1" id="row1">'

			+ '<div style="margin-top: 10px;" class="col-sm-1-1" id="col4"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Preparation<b style="color: red; padding-left: 2px;">*</b></label>'
			+ '<select onchange="fetchRouteTypeList(\'afterLoad\')" class="form-control input-SmallText" id="prep"></select></div></div>'
			
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col3"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">'
			+ 'Medicine Name <b style="color: red; padding-left: 2px;">*</b></label><div id="divTagname">'
			+ '<input type="text" onkeypress="setPrescriptionAutocompleteNameID(this.id, \'afterLoad\');" class="typeahead form-control input-SmallText" autocomplete="off" name="name" id="name" placeholder="Name"></div>'
			+ '<input type="hidden" value="0" id="medicineID"><input type="hidden" value="N" id="paediatricsMedicineFlag"><input type="hidden" value="" id="paediatricsMedicineCapacity"> </div></div>'
			
			+ '<div style="margin-top: 10px;" class="col-sm-1-1" id="col4"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Strength</label>'
			+ '<input type="text" class="form-control input-SmallText" id="strength" name="strength" placeholder="Strength"></div></div>'
			
			+ '<div style="margin-top: 10px;" class="col-sm-1-1" id="col5"><div class="form-group Remove-Padding col-sm-12-1">'
			
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">DoseType</label> <input type="text" class="form-control input-SmallText" onkeypress="return validateNumberMinusSign(event)" id="doseP" name="dose" placeholder="Dose">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4A"><div class="form-group Remove-Padding col-sm-12-1">'
			
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Unit</label> <select class="form-control input-SmallText" id="unit" name="unit" onkeypress="return validateNumberMinusSign(event)"></select>'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4A"><div class="form-group Remove-Padding col-sm-12-1">'
			
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">MO - AN - EV - NT </label>'
			+ '<div style=" margin-top: -5px; margin-left:2px" class="col-sm-12-1">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Morning" name="timeslot" id="mo">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Afternoon" name="timeslot" id="an">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Evening" name="timeslot" id="ev">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Night" name="timeslot" id="nt">'
			
			+ '</div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col6"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Frequency</label>'
			+ '<input type="text" readonly="readonly" class="form-control input-SmallText" onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" id="frequency" name="frequency" placeholder="Frequency">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col7"><div class="form-group Remove-Padding col-sm-12-1">'
			
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Instructions</label><select class="form-control input-SmallText" id="instruction"></select>'
			+ '</div></div>'
			
			+ '<div style="margin-top: 10px;" class="col-sm-1-1" id="col8"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Route</label>'
			+ '<select class="form-control input-SmallText" id="route" name="route"><option value="0">SELECT</option></select>'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col9">'
			
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Days<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText" id="days" name="days" placeholder="Days">'
		
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col10">'	
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Quantity<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText" id="qty" name="qty" placeholder="Qty">'
			+ '</div></div></div>'
			+ '<div class="divide-10"></div><div class="divide-10"></div>'
			+ '<div style="height: 70px; margin-top: 0px;" class="col-md-12-1"><div style="margin-top: 0px;" class="col-sm-12-1" id="row1"><div style="margin-top: 10px; padding-left: 3px;" class="col-sm-1-1" id="col2">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> </div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col3">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> </div>'
			+ '</div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col5">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> '
			+ '</div></div><div id="col4A" class="col-sm-1-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> </div></div>'
			+ '<div style="margin-top: 30px;margin-left:-42px" class="col-sm-3-1" id="col11">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div style=" margin-top: -5px; margin-left:2px" class="col-sm-12-1">'
			+ '<input id="timeMorn" disabled="disabled" onclick="abcde();" placeholder="Morning " style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tmo"  onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText  col-sm-1-1" readonly="">'
			+ '<input id="timeAfter"  disabled="disabled" onclick="abcde();" placeholder="Afternoon" style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tan"  onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText  col-sm-1-1" readonly="">'
			+ '<input id="timeEven"  disabled="disabled" onclick="abcde();" placeholder="Evening" style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tev" onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText col-sm-1-1" readonly="">'
			+ '<input id="timeNight"  disabled="disabled" onclick="abcde();" placeholder="Night" style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tnt" class="form-control input-SmallText col-sm-1-1" readonly="">'
			+ '</div></div></div></div></div>'
			+ '</div>'
			
			+ '<div style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 13px;" class="col-md-12-1">'
			+ '<label value="New" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" id="enableTextBoxesLabel" class="btn" onclick="setPrescriptionTempForIvf()"> <i class="fa fa-plus"></i> New	</label>'
			+ '<label value="Edit" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"  class="btn" onclick="editPrescriptoinDatata()"> <i class="fa fa-edit"></i> Edit</label>'
			+ '<label value="Delete" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"  class="btn" onclick="deleteIvfPrescriptionData()"> <i class="fa fa-trash-o"></i>Delete'
			+ '</label></div>'
			
			+ '<div class="col-md-8-1" style="margin-left: 0%; margin-top: 10px; width: 1000px;">'
			
			+ '<div class="col-sm-12-1"style="width:1300px;overflow:auto;max-height:400px">'
			+ '<table class="table table-bordered responsive" id="IvfPrescriptionTabel">' + '<thead>'
			+ '<tr>'

			+ '<th># </th>' + '<th>Drug </th>' + '<th>Prep </th>'
			+ '<th>Instructions </th>' + '<th>Duration </th> ' + '<th>Action </th>'

			+ '</tr>' + '</thead>' + '<tbody id="prescriptionTempBody">'
			+ '</tbody>' + '</table>' + '</div>'
			
			+ '</div>' + '</div>' + '</div>' + '</div>';
		

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	
}

function savePrescriptionIvf() {
	
	var prescriptionId = $("#prescriptionIdHidden").val(); 
	var treatmentId = $("#tr_Id").val();
	var patientId = $("#patientId").html();
	 
	var date = $("#date-pick").val(); 
	
	var userId = $("#userId").val();
    var unitId = $("#unitId").val();
	
	var preparation = $("#prep").val();
	var prepName = $("#prep option:selected").text();
	//var preparation = $("#preparation").val();
	
	var medicineId = $("#name").val();	
	var strength = $("#strength").val();	
	var doseType = $("#doseP").val();	
	var unit = $("#unit").val();
	
	var morning = "";
	var afternoon = "";
	var evening ="" ;
	var night ="" ;
	
	if ($("#mo").prop('checked')) {
		 morning = $("#mo").val();
	}else
		{
		 morning=""; 
		}
	
	if ($("#an").prop('checked')) {
		afternoon = $("#an").val();
	}else
		{
		afternoon=""; 
		}
	
	if ($("#ev").prop('checked')) {   
		evening = $("#ev").val();
	}else
		{
		evening=""; 
		}
	
	if ($("#nt").prop('checked')) {
		night = $("#nt").val();
	}else
		{
		night=""; 
		}
	
	
	var frequency = $("#frequency").val();
	var instruction = $("#instruction").val();	
	var instructionName = $("#instruction option:selected").text();
	
	var route = $("#route").val();
	var days = $("#days").val();
	var quantity = $("#qty").val();	
	/*if ($("#medicineNotAvailableCheckbox").prop("checked")){
		// No need to show validation
		if(route=="" || route==null || route== undefined)
		{
			route="0";
		}
		}else{*/
			if (medicineId == "0" || medicineId == "undefined" || medicineId == "") {
				alert("Please enter proper medicine name");
				SetFocus("name");
				return false;
			}
			if (prepName == "") {
				alert("Please enter proper medicine name");
				$("#medicineID").val("0");
				SetFocus("name");
				return false;
			}
		//}
	
	if (instruction == "0") {
		
		instructionName='';
	}
	if (frequency == "0" || frequency == "undefined" || frequency == "") {
		alert("Please check at least one Time Slot for Frequency..!");
		SetFocus("mo");
		return false;
	}

	if (days == "") {
		alert("Please Enter days...");
		SetFocus("days");
		return false;
	}
	if (quantity == "") {
		alert("Please Select Quantity...");
		SetFocus("qty");
		return false;
	}
	
	var inputs = [];
	inputs.push('prescriptionId=' + prescriptionId);

	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('preparation=' + preparation); 
	inputs.push('prepName=' + prepName); 
    inputs.push('medicineId=' + medicineId);
	inputs.push('strength=' + strength);	
	inputs.push('doseType=' + doseType);
	inputs.push('unit=' + unit);
	inputs.push('morning=' + morning);  
    inputs.push('afternoon=' + afternoon);
	inputs.push('evening=' + evening);	
	inputs.push('night=' + night);
	inputs.push('frequency=' + frequency);
	inputs.push('instruction=' + instruction);
	inputs.push('instructionName=' + instructionName);
    inputs.push('route=' + route);
	inputs.push('days=' + days);	
	inputs.push('quantity=' + quantity);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/saveIvfPrescriptionInfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}
			//temForIvfPrescription();
			setTemForIvfPrescription()
			//fetchIvfPrescriptionData(); 
			fetchPrescriptionByDate();
			
		}
	});		
}
function setTemForIvfPrescription() {
	
	$("#prep").val("0");
	$("#name").val('');
	$("#prep").attr("disabled", false);
	$("#name").attr("disabled", false);     
	$("#strength").val('');
	$("#doseP").val('');
	$("#unit").val('0');
	$("#frequency").val('');
	$("#instruction").val('0');
	$("#route").html('<option value="0">SELECT</option>');
	$("#route").val('0');
	$("#days").val('');
	$("#qty").val('');
	$("#medicineID").val('0');        
	
	//Unchecking time slot 
	$("#mo").prop('checked', false);
	$("#an").prop('checked', false);
	$("#ev").prop('checked', false);
	$("#nt").prop('checked', false);	
	
}

function fetchPrescriptionByDate() {
	
	var treatmentId = $("#treatmentId").html();
	var date = $("#date-pick").val();
	
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('date=' + date);

	var str = inputs.join('&');
	
	jQuery
	.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/fetchPrescriptionByDate",

		error : function() {
			alert('Network Issue.......................!!!');
		},

		success : function(r) {
			
         //alert('Success fetch'+JSON.stringify(r))
			$("#prescriptionTempBody").html("");
			var htm = "";
			var rowCount = 0;

			if (r.ivfPrescriptionList.length > 0) {
				
				for (var i = 0; i < r.ivfPrescriptionList.length; i++) {  
					rowCount++;

					htm = htm
							+ "<tr  class='newPrescriptionRow' id='count"
							+ (rowCount)
							+ "'>"

							+ "<td> <span id='snum"
							+ rowCount
							+ "'>"
							+ rowCount
							+ "</span><input type='hidden' id='prescriptionIdHidden"
							+ rowCount
							+ "' value="
							+ r.ivfPrescriptionList[i].prescriptionId
							+ "></td>"

							+ "<td  >"
							+ r.ivfPrescriptionList[i].medicineId
							+ "</td>"

							+ "<td>"
							+ r.ivfPrescriptionList[i].prepName
							+ "</td>"
							
							+ "<td>"
							+ r.ivfPrescriptionList[i].instructionName
							+ "</td>"

							+ "<td>"
							+ r.ivfPrescriptionList[i].days
							+ "</td>"
																
							+ "<td ><input type='checkbox'   class='chkgyno'  value='"
							+ rowCount
							+ "'"
							+ " name='prescrptiodocid'   isNew='false' id="
							+ r.ivfPrescriptionList[i].prescriptionId
							+ "></td>"
							+ "</tr>";
	
				}
				$("#prescriptionTempBody").append(htm);
			}

		}
	});

}


function fetchIvfPrescriptionData() {
	
	var treatmentId = $("#treatmentId").html();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivfDoctorRound/fetchIvfPrescriptionData",

				error : function() {
					alert('Network Issue.......................!!!');
				},

				success : function(r) {
					
   ///alert('Success fetch'+JSON.stringify(r))
					$("#prescriptionTempBody").html("");
					var htm = "";
					var rowCount = 0;

					if (r.ivfPrescriptionList.length > 0) {
						
						for (var i = 0; i < r.ivfPrescriptionList.length; i++) {  
							rowCount++;

							htm = htm
									+ "<tr  class='newPrescriptionRow' id='count"
									+ (rowCount)
									+ "'>"

									+ "<td> <span id='snum"
									+ rowCount
									+ "'>"
									+ rowCount
									+ "</span><input type='hidden' id='prescriptionIdHidden"
									+ rowCount
									+ "' value="
									+ r.ivfPrescriptionList[i].prescriptionId
									+ "></td>"

									+ "<td  >"
									+ r.ivfPrescriptionList[i].medicineId
									+ "</td>"

									+ "<td>"
									+ r.ivfPrescriptionList[i].prepName
									+ "</td>"
									
									+ "<td>"
									+ r.ivfPrescriptionList[i].instructionName
									+ "</td>"

									+ "<td>"
									+ r.ivfPrescriptionList[i].days
									+ "</td>"
																		
									+ "<td ><input type='checkbox'   class='chkgyno'  value='"
									+ rowCount
									+ "'"
									+ " name='prescrptiodocid'   isNew='false' id="
									+ r.ivfPrescriptionList[i].prescriptionId
									+ "></td>"
									+ "</tr>";
			
						}
						$("#prescriptionTempBody").append(htm);
					}

				}
			});
	
}

function editPrescriptoinDatata() {
	
	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='prescrptiodocid']:checked").each(function() {
         
		var presId = $("#prescriptionIdHidden" + $(this).val()).val();
		
		if (presId > 0) {

			docId.push($("#prescriptionIdHidden" + $(this).val()).val());      //prescriptionIdHidden
		}
	});
	
	if ((docId.length) == 0) {
		alert("Please check the checkbox to edit...");
		return false;
	}

	if ((docId.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}
	
	var inputs = [];
	inputs.push('prescriptionId=' + docId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ivfDoctorRound/editIvfPrescriptionData",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {    
			
			//alert('aaaaaaaaaaaa......'+JSON.stringify(r));		
			$("#prescriptionIdHidden").val(r.prescriptionId);
			$("#name").val(r.medicineId);
			
	        $("#prep").val(r.preparation);
			$("#instruction").val(r.instruction);		
			$("#strength").val(r.strength);
			$("#route").val(r.route);
			$("#frequency").val(r.frequency);
			$("#doseP").val(r.doseType);
			$("#unit").val(r.unit);		
			$("#days").val(r.days);			
			
			$("#qty").val(r.quantity);
			
			if (r.morning == "Morning") {
				$("#mo").prop('checked', true);
			}else
				{
				$("#mo").prop('checked', false);
				}
			
			if (r.afternoon == "Afternoon") {
				$("#an").prop('checked', true);
			}else
				{
				$("#an").prop('checked', false);
				}
			
			if (r.evening == "Evening") {
				$("#ev").prop('checked', true);
			}else
				{
				$("#ev").prop('checked', false);
				}
			if (r.night == "Night") {
				$("#nt").prop('checked', true);
			}else
				{
				$("#nt").prop('checked', false);
				}
			
		}
	});
}


function deleteIvfPrescriptionData() {
	
	var tableId = "IvfPrescriptionTabel";	
	var checkboxClass = "chkgyno";
	
	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='prescrptiodocid']:checked").each(function() {
         
		var presId = $("#prescriptionIdHidden" + $(this).val()).val();
		
		if (presId > 0) {

			docId.push($("#prescriptionIdHidden" + $(this).val()).val());    
		}
	});

	if (docId.length > 0) {

		var inputs = [];
		inputs.push('prescriptionIdRow=' + docId);
		inputs.push('userId=' + userId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ivfDoctorRound/deleteIvfPrescriptionRow",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error.................');
			},
			success : function(response) {
              alert(response)
                // $("#prescriptionTempBody").html("");
               //fetchIvfPrescriptionData();
              
				$('.' + checkboxClass + ':checkbox:checked').parents("tr")
						.remove();
				alert(response);
				checkForFreshListDR(tableId);
				checkFreshListSequeneceDR(tableId);
				
			}
		});
	} else {
		$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
		checkForFreshListDR(tableId);
		checkFreshListSequeneceDR(tableId);
	}	
}
function printIvfPrescription() {
	
	var patID = $("#pt_Id").val();
	var treatID = $("#tr_Id").val();

	var consultingDoctorr = $("#consultingDoctorr").text();
	var corporate = $("#corporate").text();

	setTimeout(
			function() {
				window
						.open(("ivf_prescription_print.jsp?" + "patID="
								+ encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)));
			}, 300);
	return;	
	
}


/////////New Ivf History Temp Start....///////////////////

function temForNewHistory() { 
	
	    showADNOTE('History');	                                         
		temForNewIvfHistory('History');                       
		fetchIvfHistoryMaster();                      
		fetchIvftemplateNameForHistory('Dr');          
		var mrnid = $("#mrnID").val();
		
		$("#mrn").val(mrnid);
	
}

function temForNewIvfHistory(id) {
	
	fetchIvftemplateNameForHistory('Dr');
	
	 var temp = '<div id="HistoryGYN" class="tab-pane active">'
		+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
		+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 10px;">'
		+ '<ul id="History" class="nav nav-tabs colorChanges" style="height: 550px;">'
		+ '<li id="History" class="active">'
		+ '<a data-toggle="tab" href="#History" onclick=temForNewHistory(); style="background-color: rgb(248, 196, 113);">History</a>'
		+ '</li>'
		
		temp = temp
		+ '<li id="Gynhistory" class="">'
		+ '<a data-toggle="tab" href="#Gynhistory" onclick=gynHistory(),fetchGynaecologicalHistory();>Gynaecological History</a>'
		+ '</li>'
		
		temp = temp
		+ '<li id="ObstetricsHistory" class="">'
		+ '<a data-toggle="tab" href="#ObstetricsHistory" onclick="">Obstetrics History</a>'
		+ '</li>'
		
		temp = temp
		+ '<li id="PrevFertiTreat" class="">'
		+ '<a data-toggle="tab" href="#PrevFertiTreat" onclick=previousfertilitytreatment(),fetchsavepreviousfertilitytreatment();>Previous Fertility Treatement</a>'
		+ '</li>'
		
		temp = temp
		+ '<li id="SurgicalHistory" class="">'
		+ '<a data-toggle="tab" href="#SurgicalHistory" onclick="newSurgical(),fetchSurgicalHistory()"> Surgical History</a>'
		+ '</li>'
		
		temp = temp
		+ '<li id="PreRepList" class="">'
		+ '<a data-toggle="tab" href="#PreRepList" onclick=""> Previous Reports List</a>'
		+ '</li>'
		
		
		temp = temp
		+ '<li id="GynExamHis" class="">'
		+ '<a data-toggle="tab" href="#GynExamHis" onclick="gynExamHis();fetchGynoExam();"> Gynacological Examination</a>'
		+ '</li>'
		
		        
	temp = temp
	        + '</ul>'
	        + '<div class="tabbable tabs-left col-md-12-1" style="width: 1050px;margin-top: 10px;margin-left: 5px;border: 1px solid #b8b8b8; height: 1800px;" id="History"> '                             		

	        + '<div class="tab-pane active" id="History">'
	        
	       
			+ ' <div style="padding-top: 0px;" class="col-md-12-1" id="historyRow"></div>'
			+ '<div style="margin-top: 10px; margin-left: 5px;" class="tabbable tabs-left col-md-12-1">'
			
			+'<input id="history_master_id" name="history_master_id" type="hidden" value="0"/>'
			
			/* +'<div style="margin-top: 0px;" class="tab-content col-md-2-1"></div>' */
			+ '<div style="margin-top: 0px;" class="tab-content col-md-12-1">'
			+ '<div class="tab-pane fade active in col-md-12-1" id="chiefComplaints">'
			+ '<div style="margin-top: 2px;" class="tab-content col-md-12-1">'
			+ '<div style="padding-left: 2%;padding-top: 0px;" class="col-sm-12-1">'
			+ '<div class="col-md-1-1"  style="margin-top: 15px;">	<label class="TextFont">Template List</label></div>'
			+ '<div class="col-md-3-1"  style="margin-top: 15px;">'
			+ '<select id="selIvfCustomizeTemp" name="selIvfCustomizeTemp" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText" onchange=fetchTemplateIPDHistoryIvf(this.value)><option value="Dr" >NewTemplate</option>	</select></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-2-1">'
			+ '<label class="TextFont">Medical Officer Name.</label></div>'
			+ '<div style="padding-left: -5%; margin-top: 15px;" class="col-sm-2-1">'
			+ '<input type="text" value="" readonly="readonly" name="name" id="medOffName" class="form-control input-SmallText">'
			+ '</div><div style="margin-top: 15px; padding-left: 0%;" class="col-sm-1-1">'
			+ '<label class="TextFont">MRN No.</label></div>'
			+ '<div style="margin-top: 15px;width:150px" class="col-sm-1-1">'
			+ '<input type="text" value="MS16170000001483" readonly="readonly" name="mrn" id="mrn" class="form-control input-SmallText">'
			+ '</div></div>'
			+ '<div style="margin-top: -32px; margin-left:94%;" class="col-sm-2-1"><div class="divide-10"></div>'
			+ '<button onclick="saveIvfHistory()" title="Save Ivf History " data-placement="left" data-toggle="tooltip" id="saveAddIpdHistory" class="btn btn-xs btn-success" style="margin-left: 2px;">'
			+ '<i class="fa fa-save"></i>'
			+ '</button><button onclick="IvfHistoryPrint();" title="Print " data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning coversheetBtn">'
			+ '<i class="fa fa-print"></i></button></div></div>'
			+ '<div style="padding-left: 2%;"><label class="TextFont">CHIEF COMPLAINTS :</label><div>'
			
			 
			+ '<div style="margin-top: 25px;" class="col-sm-12-1" id="row_1"> </div>'			
			+ '<input type="hidden" id="history_slave_id" value="0">'
			+ ' <table style="margin-top: 25px; width: 100%;" class="table table-bordered" id="IvfHistoryTabelivf"><thead><tr>'
			
			+ '<th style="height: 21.5px; font-size: &quot;103&quot;;" class="col-sm-1-1 center"><label class="TextFont">#</label></th>'
			+ '<th style="height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-4-1 center"><label class="TextFont">Chief Complaints</label></th>'
			+ '<th style="height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-6-1 center"><label class="TextFont"> Duration</label></th>'
			+ '<th style="height: 21.5px; width: 25px;"><input type="button" value="+" onclick="createDivForIvfHistory()"> <input type="button" value="-" onclick="deleteIvfHistoryInfo(\'RowCount\')">'
			+ '</th></tr></thead></table><div style="width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;">'
			+ '<table class="table table-condensed table-bordered table-stripped cf" id="IvfHistoryTabel">'
			+ '<tbody id="historyDivTbody"></tbody></table></div>'

			+ '<div style="padding-left: 1%; margin-top: 2%;" class="col-md-10-1"><label id="ibch1"class="TextFont">Chief Complaints:</label>'
			+ '<textarea class="" cols="52" rows="1" id="chiefComplaintsTxt"></textarea></div>'

			+ '<div style="padding-left: 1%; margin-top: 2%;" class="col-md-10-1"><label class="TextFont">Negative History:</label>'
			+ '<textarea class="" cols="52" rows="3" id="clinicalFinding"></textarea></div>'

			/* +'<div><label class="TextFont">Past Medical History :</label><div>' */
			+ '<div class="tab-pane fade active in col-md-12-1" id="pastMedHistory"><div style="margin-top: 8px;" class="tab-content col-md-12-1">'
			+ '</div><div style="margin-top: 10px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%">'
			+ ' </div><div style="font: bold; padding-bottom: 1%; padding-top: 2%; padding-left: 2%;" class="col-md-5-1 form-group">'
			+ '<label>PAST/PERSONAL/FAMILY HISTORY :</label><div style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif; padding-top: 1%; font-size: 13px; float:;" id="tableContent">'

			+ '<table cellspacing="0" cellpadding="0" style="border: 1px solid lightgrey;">'
			+ '<tbody><tr>'
			+ '	<td align="center" style="height: 35px; border: 1px solid lightgrey;"></td>'
			+ '<td align="center" style="height: 35px; border: 1px solid lightgrey;">Yes/No</td>'
			+ '<td align="center" style="height: 35px; border: 1px solid lightgrey;">Duration</td>'
			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">DM</td>'
			+ '<td width="20%" ;="" style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkDm" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtDm" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'

			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">HTN</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkHtn" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtHtn" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">IHD</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkIhd" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtIhd" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td></tr>'
			+ '<tr><td width="30%" align="center" style="border: 1px solid lightgrey;">BA/COPD</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkBaco" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtBaco" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'

			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">OTHER</td>'
			+ '<td style="border: 0.2px solid lightgrey;">'
			+ '<input type="checkbox" id="chkOther" style="width: 105%; border: 0.2px solid lightgrey;" name="">'
			+ '</td>'
			
			+ '<td><textarea id="txtOther" style="width: 100%; border: 0.2px solid lightgrey;"></textarea></td></tr></tbody></table>'
			+ '</div></div>'

			+ '<div id="PastPresentFamilyHistory" class="col-md-6-1" style="padding-left: 0%; margin-top: 1%;">'
			+ '<div class="col-md-12-1">'
			+ '<div style="padding-left: 0%; margin-top: 2%;" class="col-md-6-1">'
			+ '<label class="TextFont">Past Surgical History:</label><textarea class="" cols="39" rows="2" id="past_surgical_his"></textarea>'
			+ '</div>'
			+ '<div style="padding-left: 10%; margin-top: 2%;" class="col-md-6-1">'
			+ '<label class="TextFont">Medications:</label><textarea class="" cols="39" rows="2" id="medications"></textarea>'
			+ '</div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left: 0%;">'
			+ '<label class="TextFont">GYNAC History :</label><textarea class="" cols="39" rows="2" id="gynac"></textarea>'
			+ '</div>'
			+ '<div class="col-md-6-1" style="padding-left: 10%;">'
			+ '<label class="TextFont">Any allergies or adversedrug reactions?:</label>'
			+ '<textarea class="" cols="39" rows="2" id="drugReaction"></textarea></div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left: 0%;"><label class="TextFont">Family History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="familyHistory"></textarea></div>'
			+ '<div class="col-md-6-1" style="padding-left: 10%;"><label class="TextFont">Personal History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="personalHistory"></textarea></div>'
			+ '</div>'
			
			
			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left:0%;"><label class="TextFont">Past Medical History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="pastMedicalHistory"></textarea>'
			+ '</div>'
			
			+ '<div class="col-md-6-1" style="padding-left:10%;"><label class="TextFont">OBS History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="obsHistory"></textarea></div>'
			+ '</div>'
		
			+ '</div>'
			+ '</div>'
			
			+ '<div style="padding-right: 8px; margin-top: 1%;" class="col-md-12-1">'

			+ '<div class="divide-10"></div><div class="col-md-4-1" style="display:none;">'
			+ '<label class="TextFont">Habbits:</label>'
			+ '<textarea class="" cols="40" rows="3" id="habbits"></textarea></div>'
			+ '<div style="padding-left: 0.8%;display:none;" class="col-md-4-1">'
			+ '<label class="TextFont">Bowel:</label><textarea class="" cols="40" rows="3" id="bowel"></textarea>'
			+ '</div>'
			+ '<div style="padding-left: 1.6%;display:none;" class="col-md-4-1"><label class="TextFont">Blader:</label>'
			+ '<textarea class="" cols="40" rows="3" id="blader"></textarea></div>'
			+ '</div></div>'

			+ '<div class="tab-pane fade active in col-md-12-1" id="OnExaminations">'
			+ '<div style="margin-top: -17px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+ '<div><label class="TextFont">ON EXAMINATION :</label><div>'
			+ '<div style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1">'
			+ '<div class="divide-10"></div><label class="TextFont">VITALS:</label>'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Temperature:</label> <input type="text" class="form-control input-SmallText" placeholder="Temparature" name="temp" id="temp">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Pulse:</label> <input type="text" class="form-control input-SmallText" placeholder="Pulse" name="pulse" id="pulse">'
			+ '</div>'
			
			+'<div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">BP :</label> <input type="text" class="form-control input-SmallText" placeholder="BP" name="bp" id="bp">'

			+ '</div>'
			
			+'<div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">SPO2 :</label> <input type="text" class="form-control input-SmallText" placeholder="SPO2" name="spo2" id="spo2">'

			+ '</div>'
			
			+'</div>'			
		
			+'<div style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1"><div class="divide-10"></div>'
			+ '<label class="TextFont">General Exam:</label><div class="divide-10"></div><div class="col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Pallor:</label> <input type="text" class="form-control input-SmallText" placeholder="Pallor" name="pallor" id="pallor"></div>'
			+ '<div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Clubbing:</label> <input type="text" class="form-control input-SmallText" placeholder="Clubbing" name="clubbing" id="clubbing">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Lymph Adenopathy:</label> <input type="text" class="form-control input-SmallText" placeholder="Lymph Adenopathy " name="Lymph Adenopathy" id="lymph">'
			+ '</div></div></div><div style="padding-left: 15px; padding-top: 20px;" class="form-group Remove-Padding col-md-4-1">'
			+ '<div class="divide-10"></div><div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Icterus:</label> <input type="text" class="form-control input-SmallText" placeholder="Lcterus" name="lcterus" id="lcterus">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Oedema:</label> <input type="text" class="form-control input-SmallText" placeholder="Oedema" name="oedema" id="oedema">'
			+ '</div></div></div>'

			+ '<div class="tab-pane fade active in col-md-12-1 " id="SystematicExaminations">'
			+ '<div style="margin-top: 15px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+ '<div><label class="TextFont">SYSTEMIC EXAMINATIONS :</label><div>'
			
			
			+ '<div style="left: 15px; margin-top: 1%;" class="col-md-12-1"><div style="margin-top: 0px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">CVS:</label> <input type="text" class="form-control input-SmallText" placeholder="CVS" name="CVS" id="cvs">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">R/S:</label> <input type="text" class="form-control input-SmallText" placeholder="R/S" name="R/S " id="rs">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">PA:</label> <input type="text" class="form-control input-SmallText" placeholder="PA" name="PA" id="pa">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">CNS:</label> <input type="text" class="form-control input-SmallText" placeholder="CNS" name="CNS" id="cns">'

			+ '</div>'+
			
			'<div style="margin-top: 0px; margin-left: 0px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">PS:</label> <input type="text" class="form-control input-SmallText" placeholder="PS"  id="ps">'

			+ '</div>'+
			
			'<div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">PV:</label> <input type="text" class="form-control input-SmallText" placeholder="PV"  id="pv">'

			+ '</div>'+
			
			'</div>'+
			'<div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1"><label class="TextFont">Local Examinations:</label>'
			+ '<textarea class="" cols="40" rows="3" id="local_Exma" style="margin-left: 3%;"></textarea></div>'
			+ '<div style="padding-left: 0.8%;" class="col-md-6-1"><label class="TextFont">Investigation Reports:</label>'
			+ '<textarea class="" cols="40" rows="3" id="investigation" style="margin-left: 1%;"></textarea></div>'
			
			+ '<div style="padding-right: 8px; margin-top: 3%;" class="col-md-6-1"><label class="TextFont">Provisional Diagnosis:</label>'
			+ '<textarea class="" cols="40" rows="3" id="proplan" style="margin-left: 1%;"></textarea></div>'
			+ '</div>'
			
			+ '<div style="margin-top:-7%;margin-left:54%;" class="col-md-6-1"><label class="TextFont">Confirm Diagnosis:</label>'
			+ '<textarea class="" cols="40" rows="3" id="confirmDiagn" style="margin-left: 1%;"></textarea></div>'
			+ '</div>'		
			+ '</div>'
					
			+'<div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1" id="divtempProvId" ">'
			+ '<label class="TextFont">Treatment Plan:</label>'
			+ '<textarea class="" cols="40" rows="3" id="treatPlan" style="margin-left: 0%;"></textarea></div>'
			
			/*+ '<div style="padding-left: 0.8%; id="divtempTreatId" margin-top: 3%;"  class="col-md-6-1"><label class="TextFont" >Treatment Plan:</label>'
			+ '<textarea class="" cols="40" rows="3" id="treatPlan" style="margin-left: 9%;"></textarea></div>'*/
			+' </div>'
			
			+'<div class="tab-pane fade active in col-md-12-1 " id="history_investigation">'
			
			+'<div style="margin-top: 15px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+'<div><label class="TextFont">Investigations:</label>'
			+'</div>'
			+'<div class="divide-20"></div>'
			
			
			+'<div class="col-md-3 form-group">'
			+'<label>Hb</label>'
			+'<input type="text" class="form-control input-SmallText" id="hb">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>TLC</label>'
			+'<input type="text" class="form-control input-SmallText" id="tlc">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>DLC</label>'
			+'<input type="text" class="form-control input-SmallText" id="dlc">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>USG</label>'
			+'<input type="text" class="form-control input-SmallText" id="usg">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>IVP</label>'
			+'<input type="text" class="form-control input-SmallText" id="ivp">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>Urea</label>'
			+'<input type="text" class="form-control input-SmallText" id="urea">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>Creatinine</label>'
			+'<input type="text" class="form-control input-SmallText"id="crt">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>Na</label>'
			+'<input type="text" class="form-control input-SmallText" id="na">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>K</label>'
			+'<input type="text" class="form-control input-SmallText" id="hk">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>PSA</label>'
			+'<input type="text" class="form-control input-SmallText" id="psa">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>Blood Group</label>'
			+'<input type="text" class="form-control input-SmallText" id="blgroup">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>Urine</label>'
			+'<input type="text" class="form-control input-SmallText" id="urrine">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>HIV</label>'
			+'<input type="text" class="form-control input-SmallText" id="hiv">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>HBsAg</label>'
			+'<input type="text" class="form-control input-SmallText" id="hbs">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>Xray Chest</label>'
			+'<input type="text" class="form-control input-SmallText" id="xray">'
			+'</div>'
							
			+'<div class="col-md-3 form-group">'
			+'<label>Xray Pelvis</label>'
			+'<input type="text" class="form-control input-SmallText" id="pelvis">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>CT Scan</label>'
			+'<input type="text" class="form-control input-SmallText" id="cts">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>CA 125</label>'
			+'<input type="text" class="form-control input-SmallText" id="ca125">'
			+'</div>'
						
			+'<div class="col-md-3 form-group">'
			+'<label>VDRL</label>'
			+'<input type="text" class="form-control input-SmallText" id="vdrl">'
			+'</div>'
							
			+'<div class="col-md-3 form-group">'
			+'<label>TSH</label>'
			+'<input type="text" class="form-control input-SmallText" id="tsh">'
			+'</div>'
							
			+'<div class="col-md-3 form-group">'
			+'<label>RBS</label>'
			+'<input type="text" class="form-control input-SmallText" id="rbs">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>PT</label>'
			+'<input type="text" class="form-control input-SmallText" id="pt">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>APTT</label>'
			+'<input type="text" class="form-control input-SmallText" id="aptt">'
			+'</div>'
			
			+'<div class="col-md-3 form-group">'
			+'<label>Histopathology</label>'
			+'<input type="text" class="form-control input-SmallText" id="pathology">'
			+'</div>'
			
			+ '<div class="col-md-3 form-group">'
			+ '<label>Others</label>'
			+ '<textarea class="" cols="39" rows="2" id="others"></textarea></div>'

			+ '</div>'
			
			
			
			+ '</div></div> </div></div></div>'
           + '</div>'
	;

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	$("#medOffName").val($("#docName").html());
	
var ambaflow = $("#ambaflow").val();

	if(ambaflow=="off"){
		$("#history_investigation").hide();
	}
	else{
		$("#history_investigation").show();
	}
	
}

function  createDivForIvfHistory() {

    var rowCount = $('#IvfHistoryTabel tbody tr').length;
	
	rowCount=parseInt(rowCount+1);		
	var htm = "";

	htm = htm
	+"<tr class='newHistoryRow' id='count"+(rowCount)+"'>" 
	
	+ "<td> "
	+"<span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='history_slave_id" + rowCount + "' value='"
	+ 0 + "' >" 
	+"</td>"	
	
		+ "<td style='height: 21.5px;  width: 8.37%; text-align: center;'><textarea  rows='1' cols='30' "
		+ "' id='chiefComp" + (rowCount) + "'  > "
		+ "</textarea></td> "
		
		+ '<td style="width: 50.96%; height: 21.5px;'           
		+ rowCount
		+ '"><div class="col-md-12-1" style="margin-top:5%"><div class="col-md-6-1" style="margin-top:-3%"><input type="range"  min="0" max="100" class="defaultSlider" id="defaultSlider_'+rowCount+'" style="font-size: 11px; width:120%;" name="duration' 
		+ rowCount
		+ '" value="" id="duration_'+rowCount+'"'
		+ rowCount
		+ '"/></div>'
		+'<p class="note"><div class="col-md-6-1" id="divipd"><span class="duration_'+rowCount+'""></span>'
		+ '<input type = "text" class="col-sm-2-1" style="margin-left:125%; margin-top:-7.3%; font-weight:bold;" name="qty'
		+ rowCount
		+ '"   id="qty'
		+ rowCount +'" onkeyup="changeSlider('+rowCount+')" />'
		+'</td>'
			
		+ "<td >"
		+"<select class='form-control input-SmallText TextFont' id='day_month_year"+rowCount+"' "
		
		+ '<option value="">-Select-</option>  <option value="Hours">Hours</option>  <option value="Days">Days</option>'
		+ '<option value="Month">Month</option> <option value="Year">Year</option>'
		+"</select> "
		+"	</td> "
		
		+ "<td><input type='checkbox'   class='chkgyno'  value='"
		+ rowCount
		+ "'"
		+ " name='history_slave_id'   isNew='false' id="
	
		+ "></td>"

		+ "</tr>";
	
	$("#historyDivTbody").append(htm);

}
function deleteIvfHistoryInfo() {
	
	var tableId = "IvfHistoryTabel";
	var checkboxClass = "chkgyno";

	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='historydocid']:checked").each(function() {

		var slaveId = $("#history_slave_id" + $(this).val()).val();
		if (slaveId > 0) {

			docId.push($("#history_slave_id" + $(this).val()).val());
		}
	});
    
	if (docId.length > 0) {

		var inputs = [];
		inputs.push('historyslaveId=' + docId);
		inputs.push('userId=' + userId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ivfDoctorRound/deleteIvfHistoryInfo",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error.................');
			},
			success : function(response) {
               
				alert(response);
				$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
				
				fetchIvfHistoryMaster();
				
			}
		});
	} else {
		$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
		checkForFreshListDR(tableId);
		checkFreshListSequeneceDR(tableId);
	}	
}

function fetchIvftemplateNameForHistory(value) {
	
	var selectRouteSelectBox = "<option value='Dr'>NewTemplate</option>";
	var inputs = [];
	var ajaxresponce;
	 inputs.push("customizeTemplateName="+ value);	 
	 var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchtemplatename",
		error : function() {
			alert('error');
		},
		success : function(o) {
			
			Object.keys(o).forEach(function(key) {
				
				var keyvalu=key;
				var values=o[key];
			   if(keyvalu!=undefined && values!= undefined ){
				 selectRouteSelectBox = selectRouteSelectBox + "<option value='"+ keyvalu+"'>"+ values +"</option>";
			   }
			});
		$("#selIvfCustomizeTemp").html(selectRouteSelectBox);	
			
		}
	});

}

function fetchTemplateIPDHistoryIvf(val) {
	
	var customizeTemplateName= $("#selIvfCustomizeTemp").val();  
	if(customizeTemplateName==null || customizeTemplateName==undefined || customizeTemplateName=="-" ||customizeTemplateName==0 || customizeTemplateName=="0"){
		
		if(val=="Dr"){
		return false;
		}else{
		
			window.location = "IpdTemplateHistory.jsp";
		}
		}
	var inputs = [];
	 inputs.push("value="+ customizeTemplateName);	
	 inputs.push("callform="+ "Onchange");	
	 var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchTemplateIPDHistory",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
				IvfMasterHistoryTemp(r,val);
				
		}
	});	
}

function IvfMasterHistoryTemp(r,val) {

	$("#historyDetails").html(r);
	
var countobj=0;

if(r.ltiTemplateIPDHistory.length > 0)
{

if(val!="Dr"){
	 $("#id_ipdhistorymaster").val(r.ltiTemplateIPDHistory[0].id_ipdhistorymaster);
		 $("#customizeTemplateName").val(r.ltiTemplateIPDHistory[0].templatename)  
}

 for(  var cnt=0;cnt<r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave.length;cnt++){
	 
  		if(r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].statuscf=="N"){
				
				  if(val!="Dr"){ 
				//$("#id_ipdhistoryslave").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].id_ipdhistoryslave);
					  var id_ipdhistoryslave=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].id_ipdhistoryslave;
					  $("#id_ipdhistoryslave").val(id_ipdhistoryslave);
					
				  }
				 var chiefComplaintsTxt=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].chiefComplaintsTemp;
				 var clinicalFinding=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].clinicalFinding;
				 var past_surgical_his=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pastSur;
				 var medications=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].medic;
				 var pastReguler=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pastReg;
				 		 
				 var PresentReguler=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].preReg;
				 var gynac=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].gynac;
				 var drugReaction=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].DrgRea;
				 var familyHistory=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].famHis;
				 var obsHistory=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].obsHistory;
				 			 
				 var pastMedicalHistory=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pastMedicalHistory;
				 var personalHistory=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].perHis;
				 var habbits=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].hab;
				 var bowel=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].bowel;
				 var blader=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].blader;
				 
				 var temp=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].temp;
				 var pallor=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pallor;
				 var lcterus=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].lcterus;
				 var pulse=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pulse;
				 var clubbing=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].clubbing;
				 			 
				 var oedema=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].oedema;
				 var bp=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].bp;
				 var lymph=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].lymph;
				 var rs=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].rs;
				 var cns=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].cns;
				 
				 var cvs=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].cvs;
				 var pa=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pa;
				
				 var ps=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].ps;
				 var pv=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pv;
				 		 
				 var spo2=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].spo2;
				 var local_Exma=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].locE;
				 var investigation=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].invtg;
				 var provisional=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].prov;
				 var confirmDiagn=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].tt;
				 var treatPlan=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].tt;
								
				 $("#chiefComplaintsTxt").val(chiefComplaintsTxt);
				 $("#clinicalFinding").val(clinicalFinding);
				 $("#past_surgical_his").val(past_surgical_his);
				 $("#medications").val(medications);
				 $("#pastReguler").val(pastReguler);
				 $("#PresentReguler").val(PresentReguler);
				 $("#gynac").val(gynac);
				 $("#drugReaction").val(drugReaction);
				 $("#familyHistory").val(familyHistory);
				 $("#obsHistory").val(obsHistory);
				 
				 $("#pastMedicalHistory").val(pastMedicalHistory);
				 $("#personalHistory").val(personalHistory);
				 $("#habbits").val(habbits);
				 $("#bowel").val(bowel);
				 $("#blader").val(blader);
				 
				 $("#temp").val(temp);
				 $("#pallor").val(pallor);
				 $("#lcterus").val(lcterus);
				 $("#pulse").val(pulse);
				 $("#clubbing").val(clubbing);
				 
				 $("#oedema").val(oedema);
				 $("#bp").val(bp);
				 $("#lymph").val(lymph);
				 $("#rs").val(rs);
				 $("#cns").val(cns);
				 
				 $("#cvs").val(cvs);
				 $("#pa").val(pa);
				 $("#local_Exma").val(local_Exma);
				 $("#ps").val(ps);
				 $("#pv").val(pv);
				 
				 $("#spo2").val(spo2);
				 $("#investigation").val(investigation);
				 $("#provisional").val(provisional);
				 $("#confirmDiagn").val(confirmDiagn);
				 
				 var htn=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].htn.split("-");
				 (htn[0] > 0) ? $("#chkHtn").attr('checked', true) :  $("#chkHtn").attr('checked', false);
		 			$("#txtHtn").val(htn[1]);
				 
		 	    var dm=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].dm.split("-");
		 	    (dm[0] > 0) ? $("#chkDm").attr('checked', true) :  $("#chkDm").attr('checked', false);
	 			$("#txtDm").val(dm[1]);
	 			
	 			var ihd=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].ihd.split("-");
	 			(ihd[0] > 0) ? $("#chkIhd").attr('checked', true) :  $("#chkIhd").attr('checked', false);
	 			$("#txtIhd").val(ihd[1]);
	 			
	 			var bacopd=r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].bacopd.split("-");
	 			(bacopd[0] > 0) ? $("#chkBaco").attr('checked', true) :  $("#chkBaco").attr('checked', false);
	 			$("#txtBaco").val(bacopd[1]);
	 
	 			var otr = r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].otr.split("-");
	 			(otr[0] > 0) ? $("#chkOther").attr('checked', true) :  $("#chkOther").attr('checked', false);
	 			$("#txtOther").val(otr[1]);
	 						

		}else{
			countobj ++;
			$("#HisRowCount").val(countobj);
		} }

		if(val!="Dr"){ 
			var html="";
			var rowCount=1;
	       for(  var cnt=0;cnt<r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave.length;cnt++){
	    	  
 		if(r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].statuscf== "Y"){
 			
 			
 			html=html+'<tr class="newHistoryRow" id="count'+ rowCount +'">'+
 			'<td align="center" style="width: 8.35%; font: bold; height: 21.5px; ">'+ rowCount +'.</td>'+
 			'<td style="width: 33.96%; height: 21.5px;">'+
 			'<textarea rows ="1" cols ="38" class="" id="chiefComp'+ rowCount +'" value="'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].chfdur +'">'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].chfdur +'</textarea></td>'+
 			'<td style="width: 50.96%; height: 21.5px;">'+
 			'<input style="width:60%;" type="range" min="0" max="100" class="defaultSlider" id="defaultSlider_'+ rowCount +'" name="duration'+ rowCount +'" id="duration'+ rowCount +'" value="'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].duration+'" />'+
 			'<p class="note"><span class="duration_'+ rowCount +'"></span>'+
 			'<input type = "text" class="col-sm-1-1" style="margin-left:63%; margin-top:-2.6%; font-weight:bold;" name="qty'+ rowCount +''+
 			'"id="qty'+ rowCount +'" value = "'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].duration+'" onkeyup="changeSlider('+ rowCount +')" />'+
 			'<select class="col-sm-3-1" style="margin-left:74%; margin-top:-4.6%;" id="day_month_year'+ rowCount +'" name="day_month_year'+ rowCount +'">'+
 			'<option value="'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].days_month_year+'">'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].days_month_year+'</option><option value="Select">-Select-</option><option value="Days">Days</option>'+
 			'<option value="Month">Month</option><option value="Year">Year</option></select>'+
 			'</p></td>'+
 			'<td style=" height: 21.5px;">'+
 			'<input type="checkbox" name="chkgyno" id="chkgyno'+ rowCount +'"/>'+
 			'<input id="idIPDComp'+ rowCount +'" name="idIPDComp'+ (rowCount)+'" type="hidden" value="'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].idAdddHisComp+'"/></td>'+
 			//'<input id="history_slave_id'+ rowCount +'" name="history_slave_id'+ (rowCount)+'" type="hidden" value="'+r.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].id_ipdhistoryslave+'"/></td>'+

 			'{#/if}'+
 			'{#/for}'+
 			'</tr>'+
 			//'<input type="hidden" value="'+ rowCount +'" id="addRowCount" name="addRowCount"/>';
 			'<input type="hidden" value="'+ rowCount +'" id="history_slave_id" name="history_slave_id"/>';
 			rowCount++;
 		}
 		
	       }
	     $("#historyDivTbody").html(html);	    
  }
 }	
}

function saveIvfHistory() {
	
	var r;
	r = confirm("Do you want to save...?");
	if (r == true) { 
		
		var history_master_id=$("#history_master_id").val();
		var treatmentId = $("#tr_Id").val();
		var patientId = $("#patientId").html();		
		
		var templateId=$("#selIvfCustomizeTemp").val();
		var templateName = $("#selIvfCustomizeTemp option:selected").text();	
		var mrn=$("#mrn").val();
		var chiefComplaintsTemp = $("#chiefComplaintsTxt").val();  
		var clinicalFindingNegHis = $("#clinicalFinding").val();		
		
		var dm = "No";
		if ($('#chkDm').is(':checked')) {
			dm = "Yes";
		}
		
		var dmDuration = $("#txtDm").val();
		var htnDuration = $("#txtHtn").val();
		var ihdDuration = $("#txtIhd").val();
		var bacopdDuration = $("#txtBaco").val();
		var otherDuration = $("#txtOther").val();	
		
		var htn = "No";
		if ($('#chkHtn').is(':checked')) {
			htn = "Yes";
		} 
		
		var ihd = "No";
		if ($('#chkIhd').is(':checked')) {
			ihd = "Yes";
		} 
			
		var bacopd = "No";
		if ($('#chkBaco').is(':checked')) {
			bacopd = "Yes";
		}
		
		var other = "No";
		if ($('#chkOther').is(':checked')) {
			other = "Yes";
		}
		
		var past_surgical_his=$("#past_surgical_his").val();
		var medications = $("#medications").val();
		var gynac = $("#gynac").val();	
		var drugReactions=$("#drugReaction").val();	
		var familyHistory=$("#familyHistory").val();
		var personalHistory = $("#personalHistory").val();
		var pastMedicalHistory = $("#pastMedicalHistory").val();  
		var obsHistory = $("#obsHistory").val();
		
		var temp = $("#temp").val();
		var pulse = $("#pulse").val();
		var bp = $("#bp").val();
		var spo2=$("#spo2").val();
		var pallor=$("#pallor").val();
		var clubbing=$("#clubbing").val();	
		var lymph=$("#lymph").val();
		var lcterus = $("#lcterus").val();
		var oedema=$("#oedema").val();
		
		var cvs=$("#cvs").val();
		var ps = $("#ps").val();
		var rs = $("#rs").val();
		var pv=$("#pv").val();
		var pa=$("#pa").val();
		var cns = $("#cns").val();	
		var local_Exma = $("#local_Exma").val();
		var provisional = $("#proplan").val();  
		var investigation=$("#investigation").val();
		var confirmDiagn=$("#confirmDiagn").val(); treatPlan	
		var treatPlan=$("#treatPlan").val(); 
		
		var hb = $("#hb").val();	
		var tlc=$("#tlc").val();
		var dlc=$("#dlc").val();
		var usg = $("#usg").val();	
		var ivp = $("#ivp").val();	
		var urea=$("#urea").val();
		var crt=$("#crt").val();      
		var na = $("#na").val();	    
		var hk = $("#hk").val();	
		var psa=$("#psa").val();
		var blgroup=$("#blgroup").val();
		var urrine = $("#urrine").val();
		var hiv = $("#hiv").val();	
		var hbs=$("#hbs").val();
		var xray=$("#xray").val();
		var pelvis = $("#pelvis").val();	
		var cts = $("#cts").val();	      
		var ca125=$("#ca125").val();        
		var vdrl=$("#vdrl").val();
		var tsh = $("#tsh").val();
		var rbs = $("#rbs").val();	    
		var pt=$("#pt").val();
		var aptt=$("#aptt").val();
		var pathology = $("#pathology").val();	
		var others = $("#others").val();		
		
		var userId = $("#userId").val();
	    var unitId = $("#unitId").val();
	     
	    var listIvfHisCompObj = {
	    		listIvfHistorySlaveDto : []
			};
	    
	    var rowCount = $('#IvfHistoryTabel tbody tr').length;
		
		for ( var i = 1; i <= rowCount; i++) {
			
                var history_slave_id=$("#history_slave_id" + i).val();             
				var chfdur = $("#chiefComp" + i).val();
                var idAdddHisComp = $("#idIPDComp" +i).val();  
                var duration = $("#qty"+ i).val();
                var days_month_year = $("#day_month_year" +i).val();
                
				setlistIvfHisCompObj(listIvfHisCompObj,history_slave_id,chfdur,idAdddHisComp,duration,days_month_year,patientId,treatmentId,userId, unitId);				
		}
	    
	   
		listIvfHisCompObj = JSON.stringify(listIvfHisCompObj);
		
		var inputs = [];
		
		inputs.push("listIvfHisCompObj="+ encodeURIComponent(listIvfHisCompObj));
		
		
		inputs.push('history_master_id=' + history_master_id);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
				
		inputs.push('templateId=' + templateId);
		inputs.push('templateName=' + templateName);	
		
		inputs.push('mrn=' + mrn);
		inputs.push('chiefComplaintsTemp=' + chiefComplaintsTemp);			
		inputs.push('clinicalFindingNegHis=' + clinicalFindingNegHis);
		
		inputs.push('dm=' + dm);		
		inputs.push('htn=' + htn);
		inputs.push('ihd=' + ihd);		
		inputs.push('bacopd=' + bacopd);		
		inputs.push('other=' + other);
		
		inputs.push('dmDuration=' + dmDuration);		
		inputs.push('htnDuration=' + htnDuration);
		inputs.push('ihdDuration=' + ihdDuration);		
		inputs.push('bacopdDuration=' + bacopdDuration);		
		inputs.push('otherDuration=' + otherDuration);
		
		inputs.push('past_surgical_his=' + past_surgical_his);	
		inputs.push('medications=' + medications);
		inputs.push('gynac=' + gynac);
		inputs.push('drugReactions=' + drugReactions);
		inputs.push('familyHistory=' + familyHistory);		
		inputs.push('personalHistory=' + personalHistory);
		inputs.push('pastMedicalHistory=' + pastMedicalHistory);
		inputs.push('obsHistory=' + obsHistory);
		
		inputs.push('temp=' + temp);
		inputs.push('pulse=' + pulse);
		inputs.push('bp=' + bp);
		inputs.push('spo2=' + spo2);
		inputs.push('pallor=' + pallor);
		inputs.push('clubbing=' + clubbing);
		inputs.push('lymph=' + lymph);
        inputs.push('lcterus=' + lcterus);
		inputs.push('oedema=' + oedema);
		
		inputs.push('cvs=' + cvs);	
		inputs.push('ps=' + ps);
		inputs.push('rs=' + rs);
		inputs.push('pv=' + pv);
		inputs.push('pa=' + pa); 
		inputs.push('cns=' + cns);
		inputs.push('local_Exma=' + local_Exma);
		inputs.push('provisional=' + provisional);
		inputs.push('investigation=' + investigation);	
		inputs.push('confirmDiagn=' + confirmDiagn);
		inputs.push('treatPlan=' + treatPlan);
		
		inputs.push('hb=' + hb);	
		inputs.push('tlc=' + tlc);
		inputs.push('dlc=' + dlc);
		inputs.push('usg=' + usg);
		inputs.push('ivp=' + ivp); 
		inputs.push('urea=' + urea);
		inputs.push('crt=' + crt);
		inputs.push('na=' + na);		
		inputs.push('hk=' + hk);	
		inputs.push('psa=' + psa);
		inputs.push('blgroup=' + blgroup);
		inputs.push('urrine=' + urrine);
		inputs.push('hiv=' + hiv); 
		inputs.push('hbs=' + hbs);	
		inputs.push('xray=' + xray);	
		inputs.push('pelvis=' + pelvis);
		inputs.push('cts=' + cts);
		inputs.push('ca125=' + ca125);
		inputs.push('vdrl=' + vdrl); 
		inputs.push('tsh=' + tsh);
		inputs.push('rbs=' + rbs);	
		inputs.push('pt=' + pt);
		inputs.push('aptt=' + aptt);
		inputs.push('pathology=' + pathology);
		inputs.push('others=' + others); 
		
		inputs.push('unitId=' + unitId);
		inputs.push('userId=' + userId);
	
		var str = inputs.join('&');
		                
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ivfDoctorRound/saveIvfHistory",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				response = r;
				if (r == 1) {
					alert("Record Saved Successfully");
				}else if(r==2) {
					alert("Record Updated Successfully");
				}
				else {
					alert("Network Issue..");
				}

				fetchIvfHistoryMaster()
				
			}
		});	
		
   }	
	else
	{
	return false;
	}
	
}


function setlistIvfHisCompObj(listIvfHisCompObj,history_slave_id,chfdur,idAdddHisComp,duration,days_month_year,patientId,treatmentId,userId, unitId) {

	listIvfHisCompObj.listIvfHistorySlaveDto.push({
		history_slave_id :history_slave_id,
		chfdur : chfdur,
		idAdddHisComp :idAdddHisComp,
		duration : duration,
		days_month_year : days_month_year,
		patientId : patientId,
		treatmentId : treatmentId,
		userId : userId,
		unitId : unitId,
	});
}

function fetchIvfHistoryMaster() {
	
	var treatmentId = $("#treatmentId").html();
	
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivfDoctorRound/fetchIvfHistoryMaster",

				error : function() {
					alert('Network Issue.......................!!!');
				},

				success : function(r) {
				
            // alert('Success fetch'+JSON.stringify(r))
       	
 			if(r === ""){
 				return false;
 			}else{
 				
 			    $("#history_master_id").val(r.history_master_id);
 			   
 				$("#selIvfCustomizeTemp").val(r.templateId);
 				
 				$("#mrn").val(r.mrn);
 				$("#chiefComplaintsTxt").val(r.chiefComplaintsTemp);
 				$("#clinicalFinding").val(r.clinicalFindingNegHis);
 			
 				if (r.dm == "Yes") {
 					$("#chkDm").prop('checked', true);
 				}else
 					{
 					$("#chkDm").prop('checked', false);
 					}
 				
 				if (r.htn == "Yes") {
 					$("#chkHtn").prop('checked', true);
 				}else
 					{
 					$("#chkHtn").prop('checked', false);                               
 					}
 				
 				if (r.ihd == "Yes") {
 					$("#chkIhd").prop('checked', true);
 				}else
 					{
 					$("#chkIhd").prop('checked', false);
 					}
 				
 				if (r.bacopd == "Yes") {
 					$("#chkBaco").prop('checked', true);
 				}else
 					{
 					$("#chkBaco").prop('checked', false);
 					}
 				
 				if (r.other == "Yes") {
 					$("#chkOther").prop('checked', true);
 				}else
 					{
 					$("#chkOther").prop('checked', false);
 					}
 							
 				$("#past_surgical_his").val(r.past_surgical_his);
 				$("#medications").val(r.medications);
 				$("#gynac").val(r.gynac);
 				$("#drugReaction").val(r.drugReactions);
 				$("#familyHistory").val(r.familyHistory);
 				$("#personalHistory").val(r.personalHistory); 
 				$("#pastMedicalHistory").val(r.pastMedicalHistory);  
 				$("#obsHistory").val(r.obsHistory);
 				
 				$("#temp").val(r.temp);
 				$("#pulse").val(r.pulse);
 				$("#bp").val(r.bp);
 				$("#spo2").val(r.spo2);			
 				$("#pallor").val(r.pallor);
 				$("#clubbing").val(r.clubbing);
 				$("#lymph").val(r.lymph);			
 				$("#lcterus").val(r.lcterus);				
 				$("#oedema").val(r.oedema);
 				
 				$("#cvs").val(r.cvs);
 				$("#ps").val(r.ps);
 				$("#rs").val(r.rs);
 				$("#pv").val(r.pv);			
 				$("#pa").val(r.pa);
 				$("#cns").val(r.cns);
 				$("#local_Exma").val(r.local_Exma);			
 				$("#proplan").val(r.provisional);				
 				$("#investigation").val(r.investigation);
 				$("#confirmDiagn").val(r.confirmDiagn); 
 				$("#treatPlan").val(r.treatPlan); 
 				
 				$("#hb").val(r.hb);
 				$("#tlc").val(r.tlc);
 				$("#dlc").val(r.dlc);
 				$("#usg").val(r.usg);			
 				$("#ivp").val(r.ivp);
 				$("#urea").val(r.urea);
 				$("#crt").val(r.crt);			
 				$("#na").val(r.na);				
 				$("#hk").val(r.hk);
 				$("#psa").val(r.psa);
 				
 				$("#blgroup").val(r.blgroup);
 				$("#urrine").val(r.urrine);
 				$("#hiv").val(r.hiv);
 				$("#hbs").val(r.hbs);			
 				$("#xray").val(r.xray);
 				$("#pelvis").val(r.pelvis);
 				$("#cts").val(r.cts);			
 				$("#ca125").val(r.ca125);				
 				$("#vdrl").val(r.vdrl);
 				$("#tsh").val(r.tsh);
 				$("#rbs").val(r.rbs);
 				$("#pt").val(r.pt);
 					    
 			    $("#aptt").val(r.aptt);
				$("#pathology").val(r.pathology);
				$("#others").val(r.others);
				
				$("#userId").val(r.userId);			
				$("#unitId").val(r.unitId);
				
 				setIvfHistorySlaveTemplate(r);
 				
 			}	

		}
	});
	
}

function setIvfHistorySlaveTemplate(r) {

	$("#historyDivTbody").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listIvfHistorySlaveDto.length > 0) {

		for (var i = 0; i < r.listIvfHistorySlaveDto.length; i++) {
			rowCount++;
			
			htm = htm
					+ "<tr class='newHistoryRow' id='count"
					+ (rowCount)
					+ "'>"

					+ "<td> <span id='snum"
					+ rowCount
					+ "'>"
					+ rowCount
					+ "</span><input type='hidden' id='history_slave_id"
					+ rowCount
					+ "' value="
					+ r.listIvfHistorySlaveDto[i].history_slave_id
					+ "></td>"

					+ "<td><textarea  rows='1' cols='30' "
					+ "' id='chiefComp" + (rowCount) + "' > "
					+ r.listIvfHistorySlaveDto[i].chfdur
					+ "</textarea></td> "
					
					
					
					+ '<td style="width: 50.96%; height: 21.5px;'           
					+ rowCount
					+ '"><div class="col-md-12-1" style="margin-top:5%"><div class="col-md-6-1" style="margin-top:-3%"><input type="range"  min="0" max="100" class="defaultSlider" id="defaultSlider_'+rowCount+'" style="font-size: 11px; width:120%;" name="duration' 
					+ rowCount
					+ '" value="'+ r.listIvfHistorySlaveDto[i].duration+'" id="duration_'+rowCount+'"'
					+ rowCount
					+ '"/></div>'
					+'<p class="note"><div class="col-md-6-1" id="divipd"><span class="duration_'+rowCount+'""></span>'
					+ '<input type = "text" class="col-sm-2-1" style="margin-left:125%; margin-top:-7.3%; font-weight:bold;" name="qty'
					+ rowCount
					+ '"   id="qty'
					+ rowCount +'" value="'+ r.listIvfHistorySlaveDto[i].duration+'"  onkeyup="changeSlider('+rowCount+')" />'
					+'</td>'
					
					+ "<td >"
					+"<select class='form-control input-SmallText TextFont' id='day_month_year"+rowCount+"' "
					+ r.listIvfHistorySlaveDto[i].days_month_year
					
					+ '<option value="">-Select-</option>  <option value="Hours">Hours</option>  <option value="Days">Days</option>'
					+ '<option value="Month">Month</option> <option value="Year">Year</option>'
					+"</select> "
					+"	</td> "
					
					+ "<td><input type='checkbox'   class='chkgyno'  value='"
					+ rowCount
					+ "'"
					+ " name='historydocid'   isNew='false' id="
					+ r.listIvfHistorySlaveDto[i].history_slave_id
					+ "></td>"
					
					+ "</tr>";
		}

		$("#historyDivTbody").append(htm);
						
		
	}

}
function IvfHistoryPrint() {

var patID = $("#pt_Id").val();
var treatID = $("#tr_Id").val();

//var consultingDoctorr = $("#consultingDoctorr").text();
//var corporate = $("#corporate").text();

setTimeout(
		function() {
			window
					.open(("ivf_history_print.jsp?" + "patID="
							+ encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)));
		}, 300);
return;	

}

/*******************************************************************************
 * @author Rohini Ambhore 
 * @since 20-04-2021
 * @comment set  template  for payment mode for General Vouchers
 ******************************************************************************/

function getAllPayments() { 

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/payment/fetchPayList",

		success : function(r) {
			setTempPaymode(r);
		}
	});
}

function setTempPaymode(r) {
	var list = "";    
    for ( var i = 0; i < r.listPay.length; i++) {  

        list = list + "<option value='"+r.listPay[i].payId+"' class='un'>" + (r.listPay[i].payName) + "</option>";    
    }  
    
    $("#pamentMode").html(list);
}
function CurrentYearFunction() { 
	  var d = new Date();
	  var n = d.getFullYear();
	
	  $("#currentYear").val(n);
	  	  
}
/*function getAutoSuggessionPatientNameForGeneralVoucher() {
	//alert('autosugg......')
	var resultData = [];
	//var patientId =$("#" + patientId).val();
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/getAutoSuggessionPatientNameForGeneralVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			 alert("errorr..........");
		},
		success : function(r) {
			
			//alert('Success fetch'+JSON.stringify(r));
			var unitlistTemp = "";
			unitlistTemp = unitlistTemp
					+ "<option value='0'>--Select --</option>";
			
			for (var i = 0; i < r.patientList.length; i++) {  
				
				//alert("r.listDRT[i].getTemplateId,,,," +r.patientList[i].fName +r.patientList[i].patientId)
				unitlistTemp = unitlistTemp + "<option value="
						+ r.patientList[i].patientId
						+ " ' data-name=" + r.patientList[i].fName + "'>"
						+ r.patientList[i].fName + "</option>";
			}
		
					$('#txtperson').html(unitlistTemp);			
			
			
			ajaxResponse=r;
			var obj = eval('(' + ajaxResponse + ')');
			
			$("#txtperson").setTemplate(patientTemp);
			$("#txtperson").processTemplate(obj);
			
			
			var template = "";
			for ( var i = 0; i < r.patientList.length; i++) {
				
				var arrValue = r.patientList[i].patientId +"-"+r.patientList[i].fName;
				
				var idValue = r.patientList[i].patientId;
				var patName = r.patientList[i].fName;
				//alert('...arrValue...'+arrValue)
				resultData.push({    
					ID : idValue,
					txtperson : patName
				});
				//alert("pppp"+txtperson);
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
				
				setTimeout(function() {

					$("#div" + inputID + " .typeahead").html(template);
					$("#div" + inputID + " .typeahead").show();
					alert('88888888888888')
					$("#" + inputID).typeahead({
						source : resultData,
						displayField : 'txtperson',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					alert('eeeeeeeeeeeeeeeeee')
					$("#" + inputID).data('typeahead').source = resultData;
				}, 500);
				
				
				
				
				////
			}
							
		}
	});	
}*/


function getAutoSuggessionPatientNameForGeneralVoucher(inputID){
	alert("getAutoSuggessionPatientNameForGeneralVoucher..........")
	var resultData = [];
	var findingName =$("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + 2);		
	inputs.push('callFrom=' + "reg");		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/getAutoSuggessionPatientNameForGeneralVoucher",
		cache : false,		
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile;
				var idValue = r.lstRegviewDto[j].ptId;
				var patName = r.lstRegviewDto[j].patientName;
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
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		///////////////////////////////
		//$("#" + inputID).val(patId);
	
		if(callFrom == "reg"){			
			setSearchedPatientRegTemp(patId);		
		}		
	

}
	
	
}

function getAutoSuggessionPatientNameForGeneralVoucher11(inputID){
	
	var resultData = [];
	var findingName =$("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + 2);		
	inputs.push('callFrom=' + "reg");		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/markvisit/autoSuggestionMarkVisit1",
		cache : false,		
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile;
				var idValue = r.lstRegviewDto[j].ptId;
				var patName = r.lstRegviewDto[j].patientName;
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
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);				
}
}

function newDivHide() { 
	
	$("#newDiv").hide();
	$("#existDiv").show();
		
}

 function existDivHide() {
	
	    $("#newDiv").show();
		$("#existDiv").hide();
		
}

 /************
 * @author	: Rohini Ambhore
 * @date		: 22-Apr-2021
 * @codeFor	: Save/Delete voucher
  ************/
 function ivfsaveGeneralVoucher() {
	
	 var voucherTypeid=$("#selVoucherType").val();
	 var voucherTypeName = $("#selVoucherType option:selected").text();
	 
	 var generalVoucherId=$("#generalVoucherId").val();
	 var txtcurrentDate=$("#txtcurrentDate").val();
	 var txtPayTo=$("#txtPayTo").val();
	 var txtAmount=$("#txtAmount").val();
	 var selGroupid=$("#selGroupName").val();
	 var selGroupName = $("#selGroupName option:selected").text();
	 var selLedgerHeadid=$("#selLedgerHead").val();
	 var selLedgerHead = $("#selLedgerHead option:selected").text(); 
	 var selAuthorisedById=$("#selAuthorisedBy").val();
	 var selAuthorisedBy = $("#selAuthorisedBy option:selected").text();	 
	 var txtNarration=$("#txtNarration").val();
	// var txtperson=$("#txtperson").val();
	 var radiovalue=$("input:radio[name=surgicalRadio]:checked").val();
		if(radiovalue=="fetch"){
			txtperson=$.trim($("#txtperson1").val());      
		}
		else {
			txtperson=$.trim($("#txtperson").val());     
		}
	 
	 var txtAddress=$("#txtAddress").val();
	 var typeofPaymentId=$("#typeofPayment").val();
	 var typeofPayment = $("#typeofPayment option:selected").text();
	 var subgroupid=$("#subgroup").val();
	 var subgroup = $("#subgroup option:selected").text();	 
	 var totalPaidAmount=$("#totalPaidAmount").val();
	 var amountInWords=$("#amountInWords").val();
	 var donorpanNo=$("#donorpanNo").val();
	 var currentYear=$("#currentYear").val();
	 var pamentModeId=$("#pamentMode").val();
	 var pamentMode = $("#pamentMode option:selected").text();
	 var remark=$("#remark").val();
	 
	/* var userId = $("#userId").val();
	 var unitId = $("#unitId").val();*/
	 

		if (txtcurrentDate == null || txtcurrentDate == "") {		
			alert("Please select date.");		
			$("#txtcurrentDate").focus();
			return false;
		}
		if (txtPayTo == null || txtPayTo == "") {		
			alert("Please enter payee name.");
			$("#txtPayTo").focus();
			return false;
		}
		if (txtAmount == null || txtAmount == "") {		
			alert("Please enter voucher amount.");
			$("#txtAmount").focus();
			return false;
		}
	   
	    if(selAuthorisedBy=="0") { 
	    	alert("Please select authorised by.");
	    	$("#selAuthorisedBy").focus();
	    	return false;
	    }
	    if (txtNarration == null || txtNarration == "") {		
			alert("Please enter narration.");
			$("#txtNarration").focus();
			return false;
		}
	 
	 var inputs = [];
	 
		inputs.push('generalVoucherId=' + generalVoucherId);
		inputs.push('txtcurrentDate=' + txtcurrentDate);
		inputs.push('txtPayTo=' + txtPayTo);
		inputs.push('txtAmount=' + txtAmount); selGroupid
		inputs.push('selGroupid=' + selGroupid);
		inputs.push('selGroupName=' + selGroupName);
		inputs.push('selLedgerHeadid=' + selLedgerHeadid);
	    inputs.push('selLedgerHead=' + selLedgerHead);
	    inputs.push('selAuthorisedById=' + selAuthorisedById);
		inputs.push('selAuthorisedBy=' + selAuthorisedBy);	
		inputs.push('txtNarration=' + txtNarration);
		inputs.push('txtperson=' + txtperson);
		inputs.push('txtAddress=' + txtAddress); 
		inputs.push('typeofPaymentId=' + typeofPaymentId);
	    inputs.push('typeofPayment=' + typeofPayment);
	    inputs.push('subgroupid=' + subgroupid);
		inputs.push('subgroup=' + subgroup);	
		inputs.push('totalPaidAmount=' + totalPaidAmount);
		inputs.push('amountInWords=' + amountInWords);
		inputs.push('donorpanNo=' + donorpanNo);
		inputs.push('currentYear=' + currentYear);
		inputs.push('pamentModeId=' + pamentModeId);
	    inputs.push('pamentMode=' + pamentMode);
		inputs.push('remark=' + remark);	
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ivfDoctorRound/ivfsaveGeneralVoucher",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				response = r;
				if (r == 1) {
					alert("Record Saved Successfully");
				} else if (r == 2) {
					alert("Record Updated Successfully");
				} else {
					alert("Network Issue..");
				}
				
				refreshGeneralVoucher();
				fetchGeneralVouchersList();
			}
		});	
	
}
 
 function refreshGeneralVoucher() {  
	 
	    $("#generalVoucherId").val("0");
		$("#txtPayTo").val("");
		$("#txtAmount").val("");
		$("#selLedgerHead").val("");
		
		$("#selAuthorisedBy").val("0");
		$("#txtNarration").val("");	
		
		$("#txtperson1").val("");
		$("#txtperson").val("");
		$("#txtAddress").val("");
		$("#subgroup").val("0");
		$("#donorpanNo").val("");
		
		$("#txtVoucheridView").val("");	
		$("#typeofPayment").val("0");
		$("#totalPaidAmount").val("");
		$("#amountInWords").val("");
		$("#pamentMode").val("1");
		$("#remark").val("");
		
		$("#searchText").val("");
		$("#selSearchType").val("1");
		
}
 
 /*function getradiobuttonRefresh(id) {
	 alert('rrrrrrrr') 
	// document.getElementById(id).checked = false;
	
	 var radiovalue=$("input:radio[name=surgicalRadio]:checked").val();
		if(radiovalue=="new"){
			alert('fffffffffffradiovalueradiovaluefetch'+radiovalue)
			document.getElementById(id).checked = true;      
		}
		else if(radiovalue=="new"){  
			alert('ffffffffeeeeeeeeeeeeeeeeeeeefffradiovalue'+radiovalue)
			document.getElementById("fetch").checked = true;     
		}
		
		if (r.dm == "Yes") {
 					$("#chkDm").prop('checked', true);
 				}else
 					{
 					$("#chkDm").prop('checked', false);
 					}
	 
	 alert('rrrrrrrr11111111111112222222222222222222')
	 document.getElementById(id).checked = true; 
	
}*/
 
 function validateNumberfordonorpanNo() {
		
	 var reg = /^[0-9]+$/;
		var id = $("#donorpanNo").val();
		if (id != "" && !reg.test(id)) {
			alert("Please Enter Only number!");
			$("#donorpanNo").val("");
			return false;
		}

	}

 
 function ConvertAmountInWords(callFrom)
 { 
 	if(callFrom == "ExpVoucher")
 		{
 		var reg = /^[0-9]+$/;
 		var amount = $("#totalPaidAmount").val();
 		
 		if (amount != "" && !reg.test(amount)) {
 			alert("Please Enter Only number!");
 			$("#amountPaid").val("");
 			return false;
 		}
 		if(amount != "")
 			{
 			var inputs = [];
 			inputs.push('action=ConvertAmountInWords');
 			inputs.push('amount=' + amount);
 			var str = inputs.join('&');
 			jQuery.ajax({
 				async : true,
 				type : "POST",
 				data : str + "&reqType=AJAX",
 				url : "IPDTreatmentServlet",
 				timeout : 1000 * 60 * 5,
 				cache : false,
 				error : function() {
 					alert('error');
 				},
 				success : function(r) {
 					var ajaxResponse = r;
 				
 					if(ajaxResponse != "")
 						{
 						$("#amountInWords").val(ajaxResponse);
 						}
 					else{
 						$("#amountInWords").val("");
 					}
 				}
 			});
 			} else{
 			$("#amountInWords").val("");
 		}
 		}
 }
 
 
 function getNextGeneralVoucherId() {  
	// alert('ppppppppppppppppppppp99999999999') 
	 
		var inputs = [];

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/ivfDoctorRound/getNextGeneralVoucherId",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function(r) {

			},
			success : function(r) {

				alert(r);
				fetchGeneralVouchersList();

			}
		});	
		 	 	 
}
 function fetchGeneralVouchersList() {
	
	 var unitId = $('#unitId').val();
    //alert('.unitId.'+unitId);
		var inputs = [];

		inputs.push('unitId=' + unitId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/ivfDoctorRound/fetchGeneralVouchersList",

					error : function() {
						alert('Network Issue.......................!!!');
					}, 

					success : function(r) {
						//alert('Success fetch'+JSON.stringify(r))
							
						var tbody = "";
						
							for(var count=0;count<r.listIvfGeneralVoucherDto.length;count++) // Create Dynamic table template of processed vouchers data
							{  
								
								tbody=tbody+"<tr>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+(count+1)+"</td>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].generalVoucherId+"</td>"
								+ "<td class='col-md-3-1 center' style='height: 21.5px;'>"+r.listIvfGeneralVoucherDto[count].txtperson+"</td>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].pamentMode+"</td>"
								/*+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+pobj1.vouchersList[count].typeOfPayment+"</td>"					
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+pobj1.vouchersList[count].payTo+"</td>"*/					
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].txtAmount+"</td>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].totalPaidAmount+"</td>"
								
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"
								+ "<button class='btn btn-xs btn-warning' value='Print' id='btnEdit2' onclick='printGeneralVoucher("+r.listIvfGeneralVoucherDto[count].generalVoucherId+")'>"
								+ "<i class='fa fa-print'></i>"
								+ "</button>" + "</td>"
								
								+ "<td class='col-md-1-1 center' style='height: 10.5px;' >"
								+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='updateGeneralVoucher("+ r.listIvfGeneralVoucherDto[count].generalVoucherId+")' >"
								+ "<i class='fa fa-edit'></i>"
								+ "</button>"
								
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"
								+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete2' onclick='deleteGeneralVoucher("+r.listIvfGeneralVoucherDto[count].generalVoucherId+")'>"
								+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>";			
							}		
							$("#processedVouchers").html(tbody); // Set table template in table body 
							
					}
				}); 
	
}
 function fetchCanceledVouchersList() {
		
	 var unitId = $('#unitId').val();
    
		var inputs = [];

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/ivfDoctorRound/fetchCanceledVouchersList",

					error : function() {
						alert('Network Issue.......................!!!');
					}, 

					success : function(r) {
						//alert('Success fetch'+JSON.stringify(r))
							
						var tbody = "";
						
							for(var count=0;count<r.listIvfGeneralVoucherDto.length;count++) // Create Dynamic table template of cancelled vouchers data
							{  
								
								tbody=tbody+"<tr>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+(count+1)+"</td>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].generalVoucherId+"</td>"
								+ "<td class='col-md-3-1 center' style='height: 21.5px;'>"+r.listIvfGeneralVoucherDto[count].txtperson+"</td>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].pamentMode+"</td>"
								/*+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+pobj1.vouchersList[count].typeOfPayment+"</td>"					
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+pobj1.vouchersList[count].payTo+"</td>"*/					
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].txtAmount+"</td>"
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].totalPaidAmount+"</td>"
								
								+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"
								+ "<button class='btn btn-xs btn-warning' value='Print' id='btnEdit2' onclick='printCanceledGeneralVoucher("+r.listIvfGeneralVoucherDto[count].generalVoucherId+")'>"
								+ "<i class='fa fa-print'></i>"
								+ "</button>" + "</td>"
								
								 + "</tr>";			
							
								
							}		
							$("#cancelledVouchers").html(tbody); // Set table template in table body 
								
					}
				}); 
	
}
 function fetchVouchersBYSearch(callFrom) {	
	
		var searchText = $.trim($("#searchText").val()); // serachText to search voucher byName
		var selVoucherType= $("#selVoucherType").val();
		//var voucherTypeName = $("#selVoucherType option:selected").text();
		
		//alert('voucherType.....'+selVoucherType)
		//alert('voucherTypeName.....'+voucherTypeName)
		
		var selSearchType= $("#selSearchType").val();
		//var tabType= $("#tabType").val();
		
		if (callFrom == "search") { 
			if(selSearchType=="1"){
				if (searchText == "") {
					alert("Please Enter Voucher Id !");
					setFocus("#searchText");
				}
			}else{
				if (searchText == "") {
					alert("Please Enter Payee Name !");
					setFocus("#searchText");
				}
			}		
		}	
		 
		
		var inputs = [];
		/*inputs.push('action=fetchGeneralVouchers');	
		inputs.push('callFrom=' + callFrom);
		inputs.push('voucherType=' + voucherType);
		inputs.push('tabType=' + tabType);
		
		inputs.push('searchText=' + encodeURIComponent(searchText));*/
		inputs.push('searchBy=' + searchText);
		inputs.push('selSearchType=' + selSearchType);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ivfDoctorRound/fetchVouchersBYSearch",

			error : function() {
				alert('Network Issue.......................!!!');
			}, 

			success : function(r) {
				//alert('Success fetch'+JSON.stringify(r))					
				var tbody = "";
				
					for(var count=0;count<r.listIvfGeneralVoucherDto.length;count++) // Create Dynamic table template of processed vouchers data
					{  
						
						tbody=tbody+"<tr>"
						+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+(count+1)+"</td>"
						+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].generalVoucherId+"</td>"
						+ "<td class='col-md-3-1 center' style='height: 21.5px;'>"+r.listIvfGeneralVoucherDto[count].txtperson+"</td>"
						+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].pamentMode+"</td>"					
						+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].txtAmount+"</td>"
						+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"+r.listIvfGeneralVoucherDto[count].totalPaidAmount+"</td>"
						
						+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"
						+ "<button class='btn btn-xs btn-warning' value='Print' id='btnEdit2' onclick='printGeneralVoucher("+r.listIvfGeneralVoucherDto[count].generalVoucherId+")'>"
						+ "<i class='fa fa-print'></i>"
						+ "</button>"
						+ "<td class='col-md-1-1 center' style='height: 10.5px;'>"
						+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete2' onclick='deleteGeneralVoucher("+r.listIvfGeneralVoucherDto[count].generalVoucherId+")'>"
						+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>";			
					}		
					$("#processedVouchers").html(tbody); // Set table template in table body 		
			}
		});
}
 
 function deleteGeneralVoucher(todeletegeneralVoucherId) {
	
	 var flag=confirm("Are you confirm to Delete Voucher?");
	if(flag)
	{
		var inputs = [];

		inputs.push('todeletegeneralVoucherId=' + todeletegeneralVoucherId);
		//inputs.push('userId=' + userId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ivfDoctorRound/deletegeneralVoucher",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function(r) {

			},
			success : function(r) {

				alert(r);
				fetchGeneralVouchersList();

			}
		});	
	}	
		
}
 function updateGeneralVoucher(updategeneralVoucherId){
	 
	 var r= confirm("Do you want to update...?");
	if (r == true) {
		
		var inputs = [];
		inputs.push('updategeneralVoucherId=' + updategeneralVoucherId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/ivfDoctorRound/updateGeneralVoucher",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {  
				
				// alert('Success fetch'+JSON.stringify(r))
				// selectVoucherGrp('1');
				selectVoucherGrp(r.selGroupid);                // to fetch and add selLedgerHead									
		$("#generalVoucherId").val(r.generalVoucherId);	
		$("#txtcurrentDate").val(r.txtcurrentDate);
		
		$("#txtPayTo").val(r.txtPayTo);
		$("#txtAmount").val(r.txtAmount);
		$("#selGroupName").val(r.selGroupid);
		$("#selLedgerHead").val(r.selLedgerHeadid);
		// $("#selLedgerHead").val(r.selLedgerHead);
		
		$("#selAuthorisedBy").val(r.selAuthorisedById);
		$("#txtNarration").val(r.txtNarration);	
		$("#txtperson").val(r.txtperson);
		$("#txtperson1").val(r.txtperson);
		$("#txtAddress").val(r.txtAddress);
		$("#subgroup").val(r.selGroupid);
		$("#donorpanNo").val(r.donorpanNo);
		
		$("#txtVoucheridView").val(r.txtVoucheridView);	
		$("#typeofPayment").val(r.typeofPaymentId);
		$("#totalPaidAmount").val(r.totalPaidAmount);
		$("#amountInWords").val(r.amountInWords);
		$("#pamentMode").val(r.pamentModeId);
		$("#remark").val(r.remark);
		
				
			}
		});
}
	else
	{
	return false;
	}
 }
 
 function printGeneralVoucher(generalVoucherId) {

	 var generalVoucherId = generalVoucherId;
	
	 setTimeout(
	 		function() {
	 			window
	 			.open(("ivfGeneralVoucher.jsp?"+ "generalVoucherId="
							+ encodeURIComponent(generalVoucherId)  ));
	 		}, 300);
	 return;	
}
 
 function printCanceledGeneralVoucher(generalVoucherId) { 

	 var generalVoucherId = generalVoucherId;
	
	 setTimeout(
	 		function() {
	 			window
	 			.open(("ivfCanceledGeneralVoucherPrint.jsp?"+ "generalVoucherId="
							+ encodeURIComponent(generalVoucherId)  ));
	 		}, 300);
	 return;	
}
 
 
////////////////////////////report//// 
 function clearothergenfields(){
	   $("#gen_voucherlist").val(0);
	   $("#gen_ledlist").val(0);
	   $("#gen_userautoid").val("");
	   $("#gen_userid").val(0);
}

function clearGenform(){ 
	$("#gen_fromdate").val("");
	$("#gen_fromtime").val("");
	$("#gen_todate").val("");
	$("#gen_totime").val("");
 $("#gen_voucherlist").val(0);
 $("#gen_ledlist").val(0);
 $("#gen_userid").val(0);
}


function getlistRecord(type)
{
 var inputs = [];

var date = $("#date-pick").val();
var fromdate = $("#gen_fromdate").val();
var todate = $("#gen_todate").val();


var fromtime = $("#gen_fromtime").val();
var totime = $("#gen_totime").val();
var voucherlist=$("#gen_voucherlist").val();
var ledlist=$("#gen_ledlist").val();
// var userid=$("#gen_userid").val();
var userid=$("#gen_userid").val();

if(type!='onload'){

if(fromdate=="" || fromdate==undefined || fromdate==null){
	alertify.error("please select from date");
	return false;
}
else if(new Date(todate) < new Date(fromdate)){
	alertify.error("todate can't be greater than from date");
	return false;
}
else if(fromtime=="" || fromtime==undefined || fromtime==null){
	alertify.error("please select from time");
	return false;
}
else if(todate=="" || todate==undefined || todate==null){
	alertify.error("please select to date");
	return false;
}

else if(totime=="" || totime==undefined || totime==null){
	alertify.error("please select to time");
	return false;
}

}

inputs.push('fromdate=' + fromdate);
inputs.push('todate=' + todate);
inputs.push('fromtime=' + fromtime);
inputs.push('totime=' + totime);
inputs.push('voucherlist=' + voucherlist);
inputs.push('ledlist=' + ledlist);
inputs.push('userid=' + userid);

inputs.push('callfrom=' + type);
var str = inputs.join('&');
jQuery.ajax({
	async	: false,
	type: "GET",
	url : "ehat/ivfDoctorRound/getListRecord",
	data: str + "&reqType=AJAX",
	catche : false,
	error : function() {
		alert('error');
	},
	success : function(r) {		
		alert('sucess list....'+JSON.stringify(r))
		
		setDataGenTable(r);
		$("#gen_userid").val(0);
	}
});
}
function setDataGenTable(r){
	//alert("pppppp");
	var htm = "";
	var index = 1;
	var tbody = "";
	
	for ( var i = 0; i < r.listIvfGeneralVoucherDto.length; i++) {
		
		htm = htm
				+ '<tr> '
				+ ' <td  class="text-center">'
				+ index
				+ '</td>'

				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].selGroupName
				+ '</td>'
             
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].txtPayTo
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].txtcurrentDate
				+ '</td>'
				
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].txtperson
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].pamentMode
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].subgroup
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].typeofPayment
				+ '</td>'
				
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].totalPaidAmount
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].selAuthorisedBy
				+ '</td>'
				
				+ ' <td class="text-center">'
				+  r.listIvfGeneralVoucherDto[i].selLedgerHead
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].txtNarration
				+ '</td>'
			
				+ ' <td class="text-center">'
				+ r.listIvfGeneralVoucherDto[i].userName
				+ '</td>'
			
				+ '</tr>';
		index++;
	}
	//alert("-----------"+personName);
	if (r.listIvfGeneralVoucherDto.length == 0) {
		htm = htm
				+ "<tr><td colspan='13' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}
	$("#generallist").html(htm);
}


