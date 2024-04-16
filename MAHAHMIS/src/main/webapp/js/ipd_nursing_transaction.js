function fetchDataForSheets(sheet){
	
	if(sheet=="sheet1"){
		fetchPatientHygieneProceduresMaster();
		fetchPersonalHygieneChart();
		fetchInvasionSiteCare();
		fetchNursingCarePlan();
		fetchHandHygieneChecklist();
		
	}else if(sheet=="sheet2"){
		fetchUlcerRiskScore();
		fetchGlasgowComaScore();
		fetchVIPActionPlanTaken();
		fetchDVTScore();
		fetchMFRAScore();
		fetchSASScoreAction();
	}else if(sheet=='page4'){
		fetchGlasgowComaScore4();
		fetchMFRAScore4();
		fetchUlcerRiskScore4();
		fetchNursingCarePlanPage4();
	}
	
}


function setTemplateAndData(response,callFrom,setOnto){
	
	var htm="";
	
	if(callFrom=="fetchInvasionSiteCareInformation"){
		$("#invnRow").val(response.listISC.length);
		var count=0;
		for(var i=0;i<response.listISC.length;i++){
			count++;
			htm=htm + '<tr id="RowCount'+count+'">'
				 	+ '<td class="col-md-2"><input type="text" class="form-control input-SmallText TextFont auto" name="lineOtube" id="lineOtube'+count+'" value="'+response.listISC[i].lineTube+'"/></td>'
					+ '<td class="col-md-1"><input type="text" class="form-control input-SmallText TextFont auto" name="site" id="site'+count+'" value="'+response.listISC[i].site+'"/></td>'
					+ '<td class="col-md-1"><input type="text" class="form-control input-SmallText TextFont auto" name="dateOdays" id="dateOdays'+count+'" value="'+response.listISC[i].dateDays+'" /></td>'
					+ '<td class="col-md-2"><label id="condition'+count+'" value="'+response.listISC[i].conditions+'" >'+response.listISC[i].conditions+'</label></td>'
					+ '<td class="col-md-2"><label id="action'+count+'" value="'+response.listISC[i].actions+'" >'+response.listISC[i].actions+'</label></td>'
					+ '<td class="col-md-1"><select class="form-control input-SmallText TextFont" name="change" id="change'+count+'" value="'+response.listISC[i].changeMedicine+'" > <option value="'+response.listISC[i].changeMedicine+'">'+response.listISC[i].changeMedicine+'</option> <option value="Select">Select</option> <option value="YES">YES</option> <option value="NO">NO</option> </select> </td>'
					+ '<td class="col-md-1"><button type="button" class="btn btn-primary btn-xs"  name="setRecord" onclick="setInvasionSiteCareDetails('+count+')">Set</button></td>'
					+ '<td class="col-md-1"><label id="totalDays'+count+'"> totalDays</label> </td>'
					+ '<td class="col-md-1"><input id="checkInvRecord" type="checkbox" name="checkRecord'+count+'" value="'+response.listISC[i].invasiveSiteCareId+'" >'
					+' <input id="idRecord'+count+'" type="hidden" value="'+response.listISC[i].invasiveSiteCareId+'"></td>'
					+' </tr>';
		}
	}else if(callFrom=="fetchNursingCarePlanInformation"){
		//$("#invnRow").val(response.listISC.length);
		var ncpCount=0;
		$("#NCPnRow").val(response.listNCP.length);
			for(var i=0;i<response.listNCP.length;i++){
				ncpCount++;
				htm=htm + '<tbody id="RowCountNCP'+ncpCount+'" >'
						+ '<tr><td rowspan="8" style="width:12%;"><textarea id="assessment_'+ncpCount+'" style="width: 90%;" rows ="12" placeholder="Assessment" value='+response.listNCP[i].assessment+' >'+response.listNCP[i].assessment+'</textarea></td>'
						+ '<td rowspan="8" style="width:15%;"><textarea id="nursing_'+ncpCount+'" style="width: 95%;" rows ="12" placeholder="Nursing Diagnosis" value='+response.listNCP[i].nursingDiagnosis+' >'+response.listNCP[i].nursingDiagnosis+'</textarea></td>'
						+ '<td rowspan="8" style="width:15%;"><textarea id="planning_'+ncpCount+'" style="width: 90%;"rows ="12"  placeholder="Planning" value='+response.listNCP[i].planning+' >'+response.listNCP[i].planning+'</textarea></td>'
						+ '<td rowspan="8" style="width:15%;"><textarea id="implementation_'+ncpCount+'" style="width: 90%;"rows ="12" placeholder="Implementation / Intervention" value='+response.listNCP[i].implementation+' >'+response.listNCP[i].implementation+'</textarea></td>'
						+ '<td rowspan="8" style="width:15%;"><textarea id="evaluation_'+ncpCount+'" style="width: 90%;"rows ="12" placeholder="Evaluation / Outcome" value='+response.listNCP[i].evaluation+' >'+response.listNCP[i].evaluation+'</textarea></td>'
						+ '<td>		<input id="1test_'+ncpCount+'" class="test_'+ncpCount+'" type="checkbox" name="I/V Cannula" value="test1"/>I/V Cannula</td>'
						+ '<td rowspan="8" style="width:10%;"><input id="deleteNCPCheck" type="checkbox" name="deleteNCPCheck'+ncpCount+'" /> </td></tr>'
						+ '<tr><td ><input id="2test_'+ncpCount+'" class="test_'+ncpCount+'" type="checkbox" name="Foleys Catheter" value="test2"/>Foleys Catheter</td></tr>'
						+ '<tr><td ><input id="3test_'+ncpCount+'" class="test_'+ncpCount+'" type="checkbox" name="Ryles Tube" value="test3"/>Ryles Tube</td></tr>'
						+ '<tr><td ><input id="4test_'+ncpCount+'" class="test_'+ncpCount+'" type="checkbox" name="Drain" value="test4"/>Drain</td></tr>'
						+ '<tr><td ><input id="5test_'+ncpCount+'" class="test_'+ncpCount+'" type="checkbox" name="ICD" value="test5"/>ICD</td></tr>'
						+ '<tr><td ><input id="6test_'+ncpCount+'" class="test_'+ncpCount+'" type="checkbox" name="Colostomy" value="test6"/>Colostomy</td></tr>'
						+ '<tr><td ><input id="7test_'+ncpCount+'" class="test_'+ncpCount+'" type="checkbox" name="Ileostomy" value="test7"/>Ileostomy</td></tr>'
						+ '<tr><td >Sisters Sign</td><input type="hidden" value="0" id="nursingCarePlanRow_'+ncpCount+'" />'
						+ '<input id="idNcpRecord'+ncpCount+'" type="hidden" value='+response.listNCP[i].nursingCarePlanId+'></td></tr></tbody>';
			}
		
	}else if(callFrom=="fetchHandHygieneChecklistInformation"){
		
		var HHCCount=0;
		$("#hhcdpRow").val(response.listHHC.length);
			for(var i=0;i<response.listHHC.length;i++){
				HHCCount++;
				htm=htm +'<tr id="RowCountHHCRow'+HHCCount+'">'
				+'<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="proceduretxt'+HHCCount+'" value="'+response.listHHC[i].procedure+'"/></td>'
				+'<td class="col-md-1"><input type="text" class="form-control input-SmallText" id="doneBytxt'+HHCCount+'" value="'+response.listHHC[i].doneBy+'"/></td>'
				+'<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="protocolBeforetxt'+HHCCount+'" value="'+response.listHHC[i].protocolBefore+'"/></td>'
				+'<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="protocolAftertxt'+HHCCount+'" value="'+response.listHHC[i].protocolAfter+'"/></td>'
				+'<td class="col-md-1"><input type="text" class="form-control input-SmallText" id="nameNsigntxt'+HHCCount+'" value="'+response.listHHC[i].signature+'"/></td>'
				+'<td class="col-md-1"><input type="text" class="form-control input-SmallText" id="ICNsigntxt'+HHCCount+'" value="'+response.listHHC[i].icnSign+'"/></td>'
				+'<td class="col-md-1"><input  class="checkCondition" type="checkbox" value="" id="HHdPcheck" name="HHdPcheck'+HHCCount+'" value="'+response.listHHC[i].hygieneId+'"/><input type="hidden" value="'+response.listHHC[i].hygieneId+'" id="handHygieneId'+HHCCount+'" /></td></tr>';
			}
		
	}else if(callFrom=="fetchPatientHygieneProceduresMaster"){
		
		var PHPMCount=0;
		for(var i=0;i<response.proList.length;i++){
			PHPMCount++;
			
			var timeId = "#time_";
			var id =+response.proList[i].procedureId;
			
			var pass = "'#time_"+id+"'";
			htm=htm +'<tr id="idCount_'+response.proList[i].procedureId+'"><td style="width:30%;" >'+response.proList[i].procedureName+'</td>'
					+'<td style="width:15%;" ><input type="checkbox" name="procedureBox'+response.proList[i].procedureId+'" id="freq_'+response.proList[i].procedureId+'" onclick="countSelectedProcedures()" value="check_'+response.proList[i].procedureId+'" /></td>'
					+'<td style="width:15%;" ><input id="time_'+response.proList[i].procedureId+'" onclick="setTimeThroughId('+pass+')" class="form-control input-SmallText TextFont" type="text" readonly="readonly" value="" name="textfield"></td>'
					+'<td style="width:40%;" ><input id="nameNsign_'+response.proList[i].procedureId+'" class="form-control input-SmallText TextFont auto" type="text" value="" name="textfield"></td></tr>';
		}
		
	}else if(callFrom=="fetchSASScoreAction"){
		
		var sasCount=0;
		$("#SASnRow").val(response.listSAS.length);
		for(var i=0;i<response.listSAS.length;i++){
			sasCount++;
		
			htm=htm +'<tr id="sasRow_'+sasCount+'" >'
					+'<th class="col-md-9"><label id="sasAction_'+sasCount+'">'+response.listSAS[i].actionPlan+'</label> </th><input id="SASScoreKey_'+sasCount+'" type="hidden" value="'+response.listSAS[i].scoreKey+'+">'
					+'<th class="col-md-1"><input id="sasTime_'+sasCount+'" class="form-control input-SmallText TextFont" type="text" name="textfield" onclick="setSASTime('+sasCount+')" value="'+response.listSAS[i].time+'" readonly="readonly"></th>'
					+'<th class="col-md-1"><input id="sasCheck" type="checkbox" value="" name="sasRowDelete_'+sasCount+'"><input id="idSASRecord'+sasCount+'" type="hidden" value="'+response.listSAS[i].sasScoreId+'">'
					+'<input class="btn btn-xs btn-outline-success pull-right" type="button" onclick="setScoreKeyForSAS('+sasCount+')" value="set"></th></tr>';
		
		}
	}else if(callFrom=="fetchNursingCarePlanPage4"){
		
		var ncp4Count = 0;
		$("#NCP4nRow").val(response.listNCP.length);
		for(var i=0;i<response.listNCP.length;i++){
			ncp4Count++;
			
			htm= htm+ '<tbody id="RowCountNCPPage4'+ncp4Count+'" >'
				+ '<tr><td rowspan="8" style="width:15%;"><textarea id="Page4assessment_'+ ncp4Count+'" style="width: 95%;" rows ="12" >'+response.listNCP[i].assessment+'</textarea></td>'
				+ '<td rowspan="8" style="width:15%;"><textarea id="Page4nursing_'+ncp4Count+'" style="width: 95%;" rows ="12" placeholder="Nursing Diagnosis" >'+response.listNCP[i].nursingDiagnosis+'</textarea></td>'
				+ '<td rowspan="8" style="width:15%;"><textarea id="Page4planning_'+ncp4Count+'" style="width: 90%;"rows ="12"  placeholder="Planning" >'+response.listNCP[i].planning+'</textarea></td>'
				+ '<td rowspan="8" style="width:15%;"><textarea id="Page4implementation_'+ncp4Count+'" style="width: 90%;"rows ="12" placeholder="Implementation / Intervention" >'+response.listNCP[i].implementation+'</textarea></td>'
				+ '<td rowspan="8" style="width:15%;"><textarea id="Page4evaluation_'+ncp4Count+'" style="width: 90%;"rows ="12" placeholder="Evaluation / Outcome" >'+response.listNCP[i].evaluation+'</textarea></td>'
				+ '<td>		<input id="Page41test_'+ncp4Count+'" class="Page4test_'+ncp4Count+'" type="checkbox" name="I/V Cannula" value="test1"/>I/V Cannula</td>'
				+ '<td rowspan="8" style="width:10%;"><input id="Page4deleteNCPCheck" type="checkbox" name="Page4deleteNCPCheck'+ncp4Count+'" /> </td></tr>'
				+ '<tr><td ><input id="Page42test_'+ncp4Count+'" class="Page4test_'+ncp4Count+'" type="checkbox" name="Foleys Catheter" value="test2"/>Foleys Catheter</td></tr>'
				+ '<tr><td ><input id="Page43test_'+ncp4Count+'" class="Page4test_'+ncp4Count+'" type="checkbox" name="Ryles Tube" value="test3"/>Ryles Tube</td></tr>'
				+ '<tr><td ><input id="Page44test_'+ncp4Count+'" class="Page4test_'+ncp4Count+'" type="checkbox" name="Drain" value="test4"/>Drain</td></tr>'
				+ '<tr><td ><input id="Page45test_'+ncp4Count+'" class="Page4test_'+ncp4Count+'" type="checkbox" name="ICD" value="test5"/>ICD</td></tr>'
				+ '<tr><td ><input id="Page46test_'+ncp4Count+'" class="Page4test_'+ncp4Count+'" type="checkbox" name="Colostomy" value="test6"/>Colostomy</td></tr>'
				+ '<tr><td ><input id="Page47test_'+ncp4Count+'" class="Page4test_'+ncp4Count+'" type="checkbox" name="Ileostomy" value="test7"/>Ileostomy</td></tr>'
				+ '<tr><td >Sisters Sign</td><input type="hidden" value="0" id="Page4nursingCarePlanRow_'+ncp4Count+'" />'
				+ '<input id="Page4idNcpRecord'+ncp4Count+'" type="hidden" value='+response.listNCP[i].nursingCarePlanId+'></td></tr></tbody>';
		}
		
	}
	
	$("#"+setOnto).html(htm);
}

var procedureList = {proList : [] };

procedureList.proList.push(
		{procedureId: 1,		procedureName : "Mouth Care"},
		{procedureId: 2,		procedureName : "Mouth Gargles"},
		{procedureId: 3,		procedureName : "Eye Care"},
		{procedureId: 4,		procedureName : "Nail Care"},
		{procedureId: 5,		procedureName : "Sponge Bath"},
		{procedureId: 6,		procedureName : "Back Care"},
		{procedureId: 7,		procedureName : "Urinary Catheter Care"},
		{procedureId: 8,		procedureName : "RT/PEG/JT Care"},
		{procedureId: 9,		procedureName : "Suction"},
		{procedureId:10,		procedureName : "Drain Care"},
		{procedureId:11,		procedureName : "ICD Care"},
		{procedureId:12,		procedureName : "Bedsore Dressing"},
		{procedureId:13,		procedureName : "Position Changing"}
);

function fetchPatientHygieneProceduresMaster(){
	
	setTemplateAndData(procedureList,"fetchPatientHygieneProceduresMaster","HygieneTable1");
			
}


function countSelectedProcedures(){
	 
	var count = 0;
		
		for(var i=0 ; i< procedureList.proList.length ;i++){
			
			var $boxes = $('input:checkbox[name=procedureBox' 
					+ procedureList.proList[i].procedureId + ']');
			if ($boxes.is(':checked') == true) 
			{
				count++;
			}
		}	
		
		if(count > 0){
			
			$("#totatCountOfFreq").html(count);
			$("#moveButton").prop('disabled',false);
		}
}


function moveSelectedProcedures(){
	
	$("#morningInstructions").html("");
	$("#morningInstructionsData").html("");
	$("#nightInstructions").html("");
	$("#nightInstructionsData").html("");
	$("#eveningInstructions").html("");
	$("#eveningInstructionsData").html("");
	
	var morning ="";
	var evening ="";
	var night ="";
	
	var morningTemp ="";
	var eveningTemp ="";
	var nightTemp ="";
	
	for(var i=0 ; procedureList.proList.length ;i++){

		var $boxes = $('input:checkbox[name=procedureBox' + procedureList.proList[i].procedureId + ']');
		if ($boxes.is(':checked') == true) {
			
			var time = $("#time_"+procedureList.proList[i].procedureId).val();
			var nameNsign = $("#nameNsign_"+procedureList.proList[i].procedureId).val();
			
			if(time == "" || time == undefined )
			{
				alert("please select time for "+procedureList.proList[i].procedureName);
				$("#time_"+procedureList.proList[i].procedureId).focus();
				return false;
			}else
			{
				var timings = time.split(':');
				var hours = timings[0];
				var min = timings[1];
				
				if(hours >= 04 && hours <= 11 || hours ==12 && min == 00){
					
					morning= morning +"morning_,"+time +"_,"+procedureList.proList[i].procedureName +"_,"+nameNsign+"\n@#";
					morningTemp = morningTemp+""+procedureList.proList[i].procedureName +"<br>";
					$("#morningInstructions").html(morningTemp);
					$("#morningInstructionsData").html(morning);
					
				}else if(hours >= 12 && hours <= 19 || hours ==12 && min == 30){
					
					evening = evening +"evening_,"+time +"_,"+procedureList.proList[i].procedureName +"_,"+nameNsign+"\n@#";
					eveningTemp = eveningTemp+""+procedureList.proList[i].procedureName +"<br>";
					$("#eveningInstructions").html(eveningTemp);
					$("#eveningInstructionsData").html(evening);
					
				}else if(hours >= 19 && hours <= 23 || hours >=00 && hours < 04){
					
					night= night +"night_,"+time +"_,"+procedureList.proList[i].procedureName +"_,"+nameNsign+"\n@#";
					nightTemp = nightTemp+""+procedureList.proList[i].procedureName +"<br>";
					$("#nightInstructions").html(nightTemp);
					$("#nightInstructionsData").html(night);
				}
			}
		}
	}
}

function setTimeThroughId(id){

	$(id).attr('readonly', 'readonly');
	$(id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 30
	});
}


function fetchPersonalHygieneChart(){
	
	 var todays_date = $("#todays_date").val();
	 var tId = $("#tid").val();
	 var inputs = [];
		inputs.push('treatmentId=' + tId);
		inputs.push('todays_date=' + todays_date);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/fetchPersonalHygieneChart",	
			//url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				
				if(response.listPHC.length > 0){
					
				$("#personalHygieneId").val(response.listPHC[0].personalHygieneId);
				$("#morningInstructions").html("");
				$("#morningInstructionsData").html("");
				$("#nightInstructions").html("");
				$("#nightInstructionsData").html("");
				$("#eveningInstructions").html("");
				$("#eveningInstructionsData").html("");
				$("#icnOrdersMTA").html(response.listPHC[0].icnOrdersMorning);
				$("#icnOrdersETA").html(response.listPHC[0].icnOrdersEvening);
				$("#icnOrdersNTA").html(response.listPHC[0].icnOrdersNight);
				
				if(response.listPHC[0].morningInstructions !="-"){
					$("#morningInstructionsTA").val(response.listPHC[0].morningInstructions);
				}
				if(response.listPHC[0].eveningInstructions!="-"){
					$("#eveningInstructionsTA").val(response.listPHC[0].eveningInstructions);
				}
				if(response.listPHC[0].nightInstructions!="-"){
					$("#nightInstructionsTA").val(response.listPHC[0].nightInstructions);
				}			
				
				var thestring = response.listPHC[0].procedure;
				var times = response.listPHC[0].times;
				var signa = response.listPHC[0].signatures;
				signarr = signa.split('\n,');
				timesarr =times.split(',');
				arr = thestring.split(',');
				
					for(var j=0;j< (arr.length - 1);j++){
						var procedureN = arr[j];
						for(var i=0;i<procedureList.proList.length;i++){
							var id=0;
							id =procedureList.proList[i].procedureId;
							var proc = "";
							proc = procedureList.proList[i].procedureName;
							if(proc==procedureN){
								document.getElementById("freq_"+id).checked = true;
								$("#time_"+id).val(timesarr[j]);
								$("#nameNsign_"+id).val(signarr[j]);
							}
						}
					}
				}
				countSelectedProcedures();
				moveSelectedProcedures();
			}
		});
} 


function saveHygieneChart(){

	 var pId = $("#pid").val();
	 var tId = $("#tid").val();
	 
	 var todays_date = $("#todays_date").val();
	 var icnOrdersM = document.getElementById('icnOrdersMTA').value;
	 var icnOrdersE = document.getElementById('icnOrdersETA').value;
	 var icnOrdersN = document.getElementById('icnOrdersNTA').value;	 
	 
	 var morningInstructions= $("#morningInstructionsData").html();
	 var eveningInstructions= $("#eveningInstructionsData").html();
	 var nightInstructions= $("#nightInstructionsData").html();
	 
	 var morningInstructionsTA= document.getElementById('morningInstructionsTA').value;
	 var eveningInstructionsTA= document.getElementById('eveningInstructionsTA').value;
	 var nightInstructionsTA= document.getElementById('nightInstructionsTA').value;
	 
	 if(morningInstructionsTA == ""){
		 morningInstructionsTA="-";
	 }else if(morningInstructionsTA !="" && morningInstructions == ""){
		 alert("Please select atleast one Procedure in the Morning time !");
		 return false;
	 }
	 if(eveningInstructionsTA ==""){
		 eveningInstructionsTA="-";
	 }else if(eveningInstructionsTA !="" && eveningInstructions == ""){
		 alert("Please select atleast one Procedure in the Afternoon/Evening time !");
		 return false;
	 }
	 if(nightInstructionsTA ==""){
		 nightInstructionsTA="-";
	 }else if(nightInstructionsTA !="" && nightInstructions == ""){
		 alert("Please select atleast one Procedure in the Night time !");
		 return false;
	 }
	 
	 //alert(" morningInstructionsTA"+morningInstructionsTA+"\n eveningInstructionsTA"+eveningInstructionsTA+"\n nightInstructionsTA"+nightInstructionsTA);
	 
	 var allInstructions = morningInstructions+eveningInstructions+nightInstructions;
	 if(allInstructions==""){
		 alert("Please Fill Data");
		 return 0;
	 }
	 //alert("allInstructions \n"+allInstructions);
var id=$("#personalHygieneId").val();
	var PersonalHygiene = {
			listPHC : []
    };
	 
	PersonalHygiene.listPHC.push({
		personalHygieneId:id,
		patientId:pId,
		treatmentId:tId,
		allInstructions:allInstructions,
		morningInstructions:morningInstructionsTA,
		eveningInstructions:eveningInstructionsTA,
		nightInstructions:nightInstructionsTA,
		icnOrdersMorning:icnOrdersM,
		icnOrdersEvening:icnOrdersE,
		icnOrdersNight:icnOrdersN,
		date:todays_date
	});
	
	listPHC= JSON.stringify(PersonalHygiene);
	 var inputs = [];
	 
	 inputs.push('listPHC=' + listPHC);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveHygieneChartInformation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(response) {
				alert(response);
				fetchPersonalHygieneChart();
			}
		});
		
}


function saveInvasionSiteCare(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var rowCount = $("#invnRow").val();
	//var data = "";
	if(rowCount == 0){  
		alert("Please fill the detailes!!");
		return false;    }
	var tid = $("#tr_Id").val();
	var InvasionSiteCare = {
			listISC : []
    };
	for(var i=1;i<=rowCount;i++){
		
		var id = $("#idRecord"+i).val();
		var lineOtube = $("#lineOtube"+i).val();
		if(lineOtube==undefined || lineOtube=="")
			continue;
		
		var site = $("#site"+i).val();
		var dateOdays = "1";//$("#dateOdays"+i).val();
		var conditions = $("#condition"+i).html();
		var actions = $("#action"+i).html();
		var change = $("#change"+i).val();
		
		InvasionSiteCare.listISC.push({
			
			invasiveSiteCareId:id,
			lineTube:lineOtube,
			site:site,
			dateDays:dateOdays,
			conditions:conditions,
			actions:actions,
			changeMedicine:change,
			patientId:pId,
			treatmentId:tid,
			date:todays_date
		});

		//data = data + lineOtube +"&"+site+"&"+dateOdays+"&"+conditions+"&"+actions+"&"+change+"#";
	}
	if(InvasionSiteCare.listISC.length == 0){  
		alert("Please fill the detailes!!");
		return false;    }
	listISC= JSON.stringify(InvasionSiteCare);

	 var inputs = [];
		//inputs.push('action=saveInvasionSiteCareInformation');
		inputs.push('listISC=' +  listISC);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/saveInvasionSiteCareInformation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchInvasionSiteCare();
			}
		});
}

function fetchInvasionSiteCare(){
	 
	 var todays_date = $("#todays_date").val();
	 var tid = $("#tr_Id").val();

	 var inputs = [];
		//inputs.push('action=fetchInvasionSiteCareInformation');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/fetchInvasionSiteCareInformation",	
			//url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				
				setTemplateAndData(response,"fetchInvasionSiteCareInformation","invasionSiteCareTable");
				//alert(response);
			}
		});
}


function saveNursingCarePlan(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tr_Id").val();
	
	var rowCount = $("#NCPnRow").val();
	if(rowCount == 0){  
		alert("Please fill the detailes!!");
		return false;    }
	var NursingCarePlan = {
			listNCP : []
    };
	for(var i=1;i<=rowCount;i++){
		
		var idRecord = $("#idNcpRecord"+i).val();
		var assessment = $("#assessment_"+i).val();
		if(assessment==undefined)
			continue;
		var nursing = $("#nursing_"+i).val();
		var planning = $("#planning_"+i).val();
		var implementation = $("#implementation_"+i).val();
		var evaluation = $("#evaluation_"+i).val();
		var tests = document.getElementsByClassName('test_'+i);
		var testValues = "";
		
		for(var j=0; tests[j]; ++j){
		      if(tests[j].checked){
		    	  testValues = testValues + tests[j].value +",";
		      }
		  }
		NursingCarePlan.listNCP.push({
			nursingCarePlanId:idRecord,
			patientId:pId,
			treatmentId:tid,
			assessment:assessment,
			nursingDiagnosis:nursing,
			planning:planning,
			implementation:implementation,
			evaluation:evaluation,
			testValues:testValues,
			date:todays_date
		});
		
	}
	NursingCarePlan = JSON.stringify(NursingCarePlan);
	
	 var inputs = [];
		//inputs.push('action=saveNursingCarePlanInformation');
		inputs.push('NursingCarePlan=' + NursingCarePlan);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveNursingCarePlanInformation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchNursingCarePlan();
			}
		});
}


function fetchNursingCarePlan(){
	
	var todays_date = $("#todays_date").val();
	var tid = $("#tr_Id").val();

	var inputs = [];
		//inputs.push('action=fetchNursingCarePlan');
		inputs.push('treatId=' + tid);
		inputs.push('todays_date=' + todays_date);
	
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchNursingCarePlanInformation",	
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				
				setTemplateAndData(response,"fetchNursingCarePlanInformation","nursingCarePlanTable");
				
				for(var i=0 ; response.listNCP.length ;i++){
					var thestring = response.listNCP[i].testValues;
					alltests = thestring.split(',');
						for(var j=0;j< (alltests.length - 1);j++){
							var no = alltests[j].match(/\d+/g).map(Number);
							document.getElementById(no+"test_"+(i+1)).checked = true;
						}
				}
			}
		});	
	
}


function saveHandHygieneChecklist(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tr_Id").val();
	var rowCount = $("#hhcdpRow").val();
	if(rowCount == 0){  
		alert("Please fill the detailes!!");
		return false;    }
	var HygieneChecklist = {
			listHHC : []
    };
	for(var i=1;i<=rowCount;i++){
		
		var id=$("#handHygieneId" + i + "").val();
		var proceduretxt = $("#proceduretxt" + i + "").val();
		var doneBytxt = $("#doneBytxt" + i + "").val();
		var protocolBeforetxt = $("#protocolBeforetxt" + i + "").val();
		var protocolAftertxt = $("#protocolAftertxt" + i + "").val();
		var nameNsigntxt = $("#nameNsigntxt" + i + "").val();
		var ICNsigntxt = $("#ICNsigntxt" + i + "").val();
		
		if (ICNsigntxt == "" || ICNsigntxt == null || ICNsigntxt == undefined ) {
		alert("Please Insert ICN Sign !");
		return false ;
		}
		
		HygieneChecklist.listHHC.push({
			hygieneId:id,
			patientId:pId,
			treatmentId:tid,
			procedure:proceduretxt,
			doneBy:doneBytxt,
			protocolBefore:protocolBeforetxt,
			protocolAfter:protocolAftertxt,
			signature:nameNsigntxt,
			icnSign:ICNsigntxt,
			date:todays_date
			});
		//data = data + proceduretxt +"&"+doneBytxt+"&"+protocolBeforetxt+"&"+protocolAftertxt+"&"+nameNsigntxt+"&"+ICNsigntxt+"#";
	}
	
	HygieneChecklist=JSON.stringify(HygieneChecklist);
	 var inputs = [];
		//inputs.push('action=saveHandHygieneChecklistInformation');
		inputs.push('HygieneChecklist=' +  HygieneChecklist);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/saveHandHygieneChecklistInformation",	
			//url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchHandHygieneChecklist();
			}
		});
}


function fetchHandHygieneChecklist(){
	 
	 var todays_date = $("#todays_date").val();
	 var tid = $("#tr_Id").val(); 
	 var inputs = [];
		//inputs.push('action=fetchHandHygieneChecklistInformation');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchHandHygieneChecklistInformation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				//alert(response.listHHC.length);
				setTemplateAndData(response,"fetchHandHygieneChecklistInformation","handHygieneChecklistTable");
				
			}
		});
}


function saveUlcerRiskScore(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var id = $("#ulcerRiskScoreId").val();
	var tid = $("#tid").val();
	var actionPlan = $("#actionPlanTA").val();
	//var total=Number($("#totalBradenScore").html());
	
	var SensoryPerception = Number(0);
	var Mobility = Number(0);
	var Activity = Number(0);
	var Moisture = Number(0);
	var Friction = Number(0);
	var Nutrition = Number(0);
	
	if($("input[name='SensoryPerception']:checked").val() != undefined){
		  SensoryPerception = $("input[name='SensoryPerception']:checked").val();
		  SensoryPerception = parseInt(SensoryPerception);
	 }else
	 	return false;
	if($("input[name='Mobility']:checked").val() != undefined){
		  Mobility = $("input[name='Mobility']:checked").val();
		  Mobility = parseInt(Mobility);
	 }else
	 	return false;
	if($("input[name='Activity']:checked").val() != undefined){
		  Activity = $("input[name='Activity']:checked").val();
		  Activity = parseInt(Activity);
	 }else
	 	return false;
	if( $("input[name='Moisture']:checked").val() != undefined){
		  Moisture = $("input[name='Moisture']:checked").val();
		  Moisture = parseInt(Moisture);
	 }else
	 	return false;
	if($("input[name='Friction']:checked").val() != undefined){
		  Friction = $("input[name='Friction']:checked").val();
		  Friction = parseInt(Friction);
	 }else
	 	return false;
	if($("input[name='Nutrition']:checked").val() != undefined){
		  Nutrition = $("input[name='Nutrition']:checked").val();
		  Nutrition = parseInt(Nutrition);
	 }else
	 	return false;
	 
	 var riskLevel = null;
	 
	 var risks = document.getElementsByClassName('riskLevel');
	  
	  for(var i=0; risks[i]; ++i){
	      if(risks[i].checked){
	    	  riskLevel =risks[i].value ;
	      }
	  }
	  
	  var UlcerRiskScore = {
				listURS : []
	    }; 
	  
	  UlcerRiskScore.listURS.push({
		  ulcerRiskScoreId:id,
		  patientId:pId,
		  treatmentId:tid,
		  date:todays_date,
		  sensoryPerception: SensoryPerception,
		  activity:Activity,
		  mobility: Mobility,
		  moisture:Moisture,
		  friction: Friction,
		  nutrition: Nutrition,
		  riskLevel:riskLevel,
		  actionPlan: actionPlan
	  });
	  
	  UlcerRiskScore=JSON.stringify(UlcerRiskScore);
	  
	 var inputs = [];
		//inputs.push('action=saveUlcerRiskScore');
		/*inputs.push('patId=' + pId);
		inputs.push('tId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('SensoryPerception=' + SensoryPerception);
		inputs.push('Mobility=' + Mobility);
		inputs.push('Activity=' + Activity);
		inputs.push('Moisture=' + Moisture);
		inputs.push('Friction=' + Friction);
		inputs.push('Nutrition=' + Nutrition);
		//inputs.push('totalScore=' + total);
		inputs.push('riskLevel=' + riskLevel);
		inputs.push('actionPlan=' +  encodeURIComponent(actionPlan)); */
		
		inputs.push('UlcerRiskScore=' + UlcerRiskScore); 
 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveUlcerRiskScore",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchUlcerRiskScore();
			}
		});
 
}


function fetchUlcerRiskScore(){
	 
	 var todays_date = $("#todays_date").val();
	 var tId = $("#tid").val();
	 var id = $("#ulcerRiskScoreId").val();
	 var inputs = [];
		//inputs.push('action=fetchUlcerRiskScoreInformation');
		inputs.push('ulcerRiskScoreId=' + id);
		inputs.push('treatmentId=' + tId);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchUlcerRiskScore",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				//alert(response);
				if(response.listURS.length > 0){
				
				$("#ulcerRiskScoreId").val(response.listURS[0].ulcerRiskScoreId);
				
				$('input:radio[class=SensoryPerception][id=senPer'+response.listURS[0].sensoryPerception+']').prop('checked', true);
				$('input:radio[class=Mobility][id=mobi'+response.listURS[0].mobility+']').prop('checked', true);
				$('input:radio[class=Activity][id=acti'+response.listURS[0].activity+']').prop('checked', true);
				$('input:radio[class=Moisture][id=moi'+response.listURS[0].moisture+']').prop('checked', true);
				$('input:radio[class=Friction][id=fs'+response.listURS[0].friction+']').prop('checked', true);
				$('input:radio[class=Nutrition][id=nutr'+response.listURS[0].nutrition+']').prop('checked', true);
				
				var total = response.listURS[0].nutrition 
						+response.listURS[0].friction
						+response.listURS[0].moisture
						+response.listURS[0].activity
						+response.listURS[0].mobility
						+response.listURS[0].sensoryPerception;
				 $("#totalBradenScore").html(total);
			      
			      if(response.listURS[0].riskLevel == "4"){
			    	  	document.getElementById("vHighRisk").checked = true;
			      }	
			      else if(response.listURS[0].riskLevel == "3"){
			    	  	document.getElementById("highRisk").checked = true;
			      }
			      else if (response.listURS[0].riskLevel == "2"){
			    	  	document.getElementById("modRisk").checked = true;
			      }
			      else if (response.listURS[0].riskLevel == "1"){
			    	  	document.getElementById("lowRisk").checked = true;
			      }
			      $("#actionPlanTA").attr("value",response.listURS[0].actionPlan);
			}
			}		
		});
}


function saveGlasgowComaScore(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	var id = $("#glasgowComaScoreId").val();
	
	var TotalScore = $("#GCSTotalScore").html();
	var ActionUndertaken = $("#GCSAction").html();
	
	var EyeOpenResponse = Number(0);
	var BestVerbalResponse = Number(0);
	var BestMotorResponse = Number(0);
	
	var EORTime ="";
	var BVRTime ="";
	var BMRTime ="";
	
	if( $("input[name='EyeOpenResponse']:checked").val() != undefined){
		EyeOpenResponse = $("input[name='EyeOpenResponse']:checked").val();
		EyeOpenResponse = parseInt(EyeOpenResponse);
		EORTime = $("#GCS_EOR_time_"+EyeOpenResponse).val();
	    }else
	    	return false;
	
	if( $("input[name='BestVerbalResponse']:checked").val() != undefined){
		BestVerbalResponse = $("input[name='BestVerbalResponse']:checked").val();
		BestVerbalResponse = parseInt(BestVerbalResponse);
		BVRTime =  $("#GCS_BVR_time_"+BestVerbalResponse).val();
	    }else
	    	return false;
	
	if( $("input[name='BestMotorResponse']:checked").val() != undefined){
		BestMotorResponse = $("input[name='BestMotorResponse']:checked").val();
		BestMotorResponse = parseInt(BestMotorResponse);
		BMRTime =  $("#GCS_BMR_time_"+BestMotorResponse).val();
	    }else
	    	return false;
	
	 var GlasgowComaScore = {
			listGCS : []
    }; 
	 
	 GlasgowComaScore.listGCS.push({
		 glasgowComaScoreId:id,
		 patientId:pId,
		 treatmentId:tid,
		 date:todays_date,
		 totalScore:TotalScore,
		 actionUndertaken:ActionUndertaken,
		 eorScore:EyeOpenResponse,
		 bvrScore:BestVerbalResponse,
		 bmrScore:BestMotorResponse,
		 eorTime:EORTime,
		 bvrTime:BVRTime,
		 bmrTime:BMRTime
	 });
	
	 GlasgowComaScore=JSON.stringify(GlasgowComaScore);
	 var inputs = [];
		//inputs.push('action=saveGlasgowComaScore');
		/*inputs.push('patId=' + pId);
		inputs.push('treatId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('TotalScore=' + TotalScore);
		inputs.push('ActionUndertaken=' + ActionUndertaken);
		inputs.push('EyeOpenResponse=' + EyeOpenResponse);
		inputs.push('BestVerbalResponse=' + BestVerbalResponse);
		inputs.push('BestMotorResponse=' + BestMotorResponse);
		inputs.push('eorTime=' + EORTime);
		inputs.push('bvrTime=' + BVRTime);
		inputs.push('bmrTime=' + BMRTime);*/
	 inputs.push('GlasgowComaScore=' + GlasgowComaScore);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveGlasgowComaScore",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchGlasgowComaScore();
			}
			});
	
}

function setGCSTimeforMain(type,id){
	
	$('#GCS_'+type+'_time_' + id).attr('readonly', 'readonly');
	$('#GCS_'+type+'_time_' + id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 30
	});
}


function fetchGlasgowComaScore(){
	 
	 var todays_date = $("#todays_date").val();
	 var tId = $("#tid").val();
	 var id = $("#glasgowComaScoreId").val();
 	 //time
	 
	 var inputs = [];
		//inputs.push('action=fetchGlasgowComaScoreInformation');
		inputs.push('Id=' + id);
		inputs.push('treatmentId=' + tId);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchGlasgowComaScore",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				//alert(response);
				if(response.listGCS.length > 0){
					$("#glasgowComaScoreId").val(response.listGCS[0].glasgowComaScoreId);
					$('input:radio[class=ResponseScore][id=EyeOpenResponse'+response.listGCS[0].eorScore+']').prop('checked', true);
					$('input:radio[class=ResponseScore][id=BestVerbalResponse'+response.listGCS[0].bvrScore+']').prop('checked', true);
					$('input:radio[class=ResponseScore][id=BestMotorResponse'+response.listGCS[0].bmrScore+']').prop('checked', true);
					
					 $("#GCS_BMR_time_"+response.listGCS[0].bmrScore).val(response.listGCS[0].bmrTime);
					 $("#GCS_BVR_time_"+response.listGCS[0].bvrScore).val(response.listGCS[0].bvrTime);
					 $("#GCS_EOR_time_"+response.listGCS[0].eorScore).val(response.listGCS[0].eorTime);
					
					 $("#GCSTotalScore").html(response.listGCS[0].totalScore);
					 $("#GCSAction").html(response.listGCS[0].actionUndertaken);
				}
			}
		});

}


function saveVIPActionPlanTaken(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	var id = $("#vipScoreId").val();
	
	var duration= $("#vipDurationText").html();
	var actionPlan = $("#vipDurationAction").html();
	
	if( $("input[name='VIPScore']:checked").val() != undefined){
		VIPScore = $("input[name='VIPScore']:checked").val();
		VIPScore = parseInt(VIPScore);
		
	    }else
	    	return false;
	
	var VIPScoreObj = {
			listVIP : []
    }; 
	
	VIPScoreObj.listVIP.push({
		vipScoreId:id,
		patientId:pId,
		treatmentId:tid,
		date:todays_date,
		duration:duration,
		actionPlan:actionPlan,
		vipScore:VIPScore
	});
	
	var VIPScoreStr=JSON.stringify(VIPScoreObj);
	 var inputs = [];
		/*inputs.push('action=saveVIPScoreAndActionTaken');
		inputs.push('patId=' + pId);
		inputs.push('tId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('VIPScore=' + VIPScore);
		inputs.push('actionPlan=' + actionPlan);
		inputs.push('duration=' + duration);*/
	 	inputs.push('VIPScoreStr=' + VIPScoreStr);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveVIPScoreAndActionTaken",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchVIPActionPlanTaken();
			}
			});
	
}
/*"") String glassgowId, 
@RequestParam("todays_date") String date,@RequestParam("")*/


function fetchVIPActionPlanTaken(){

	var todays_date = $("#todays_date").val();
	var tid = $("#tid").val();
	
	 var inputs = [];
		//inputs.push('action=fetchVIPActionPlanTakenInformation');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchVIPScoreAndActionTaken",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				//alert(response);
				if(response.listVIP.length > 0){
					$("#vipScoreId").val(response.listVIP[0].vipScoreId);
					$('input:radio[class=VIPScore][id=VIPScore'+response.listVIP[0].vipScore+']').prop('checked', true);
					$("#vipDurationText").html(response.listVIP[0].duration);
					$("#vipDurationAction").html(response.listVIP[0].actionPlan);
				}
			}
		});
		
}


function saveDVTScore(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	var id = $("#dvtScoreId").val();
	var dvtAction = $("#dvtActionLabel").html();
	var DVTTotalScore = $("#totalDVTScore").html();
	
	var clinicalFeature = document.getElementsByClassName('clinicalFeature');
	var record="";
	
	  for(var i=0; clinicalFeature[i]; i++){
	      if(clinicalFeature[i].checked){ 
	    	  j=i+1;
	    	  var cf = "clinicalFeature"+j ;
	    	  var time = $("#dvt_time_"+j).val();
	    	  record = record + cf +","+time+"#";
	      }
	  }

		var DVTScore = {
				listDVT : []
	    }; 
		
		DVTScore.listDVT.push({
			dvtScoreId:id,
			patientId:pId,
			treatmentId:tid,
			date:todays_date,
			record:record,
			totalScore:DVTTotalScore,
			actionPlan:dvtAction
		});
		
		DVTScore=JSON.stringify(DVTScore);
		 var inputs = [];
			/*inputs.push('action=saveDVTScoreInformation');
			inputs.push('patId=' + pId);
			inputs.push('tId=' + tid);
			inputs.push('todays_date=' + todays_date);
			inputs.push('totalScore=' + DVTTotalScore);
			inputs.push('actionTaken=' + dvtAction);
			inputs.push('records=' + record);*/
		 inputs.push('DVTScore=' + DVTScore);
		 
			
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveDVTScoreInformation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchDVTScore();
			}
		});
}

function fetchDVTScore(){	
	
	var todays_date = $("#todays_date").val();
	var tid = $("#tid").val();

	var inputs = [];
		//inputs.push('action=fetchDVTScore');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchDVTScore",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(dvtBean) {
				//alert(response);
			if(dvtBean.listDVT.length > 0){
				$("#dvtScoreId").val(dvtBean.listDVT[0].dvtScoreId);
				$("#dvtActionLabel").html(dvtBean.listDVT[0].actionPlan);
				$("#totalDVTScore").html(dvtBean.listDVT[0].totalScore);
				
				var cfs =dvtBean.listDVT[0].clinicalFeatures;
				alltests = cfs.split(',');
				var times = dvtBean.listDVT[0].times;
				time = times.split(',');
				
				for(var j=0;j< (alltests.length - 1);j++){
					document.getElementById(alltests[j]).checked = true;
					var no = alltests[j].match(/\d+/g).map(Number);
					
					$("#dvt_time_"+no).val(time[j]);
				}
			}
			}
		});
		
	}


function saveMFRAScore(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	var id = $("#mfraScoreId").val();
	
	var totalScore = Number(0);
	var factor1 = Number(0);
	var factor2 = Number(0);
	var factor3 = Number(0);
	var factor4 = Number(0);
	var factor5 = Number(0);
	var factor6 = Number(0);
	
	var f1Time = "";
	var f2Time = "";
	var f3Time = "";
	var f4Time = "";
	var f5Time = "";
	var f6Time = "";
	
	var actionTaken="";
	
	if( $("input[name='historyOf']:checked").val() != undefined){
		factor1 = $("input[name='historyOf']:checked").val();
		factor1 = parseInt(factor1);
		f1Time=$("#Morse_time_1").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='diagnosis']:checked").val() != undefined){
		factor2 = $("input[name='diagnosis']:checked").val();
		factor2 = parseInt(factor2);
		f2Time=$("#Morse_time_2").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='ambulatory']:checked").val() != undefined){
		factor3 = $("input[name='ambulatory']:checked").val();
		factor3 = parseInt(factor3);
		f3Time=$("#Morse_time_3").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='heparin']:checked").val() != undefined){
		factor4 = $("input[name='heparin']:checked").val();
		factor4 = parseInt(factor4);
		f4Time=$("#Morse_time_4").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='transferring']:checked").val() != undefined){
		factor5 = $("input[name='transferring']:checked").val();
		factor5 = parseInt(factor5);
		f5Time=$("#Morse_time_5").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='mental']:checked").val() != undefined){
		factor6 = $("input[name='mental']:checked").val();
		factor6 = parseInt(factor6);
		f6Time=$("#Morse_time_6").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if(f1Time=="" || f1Time==null || f1Time==undefined){
		alert("select History of fall Time..!!");
    	return false;
	}
	
	if(f2Time=="" || f2Time==null || f2Time==undefined){
		alert("select Secondary Diagnosis Time..!!");
    	return false;
	}
	
	if(f3Time=="" || f3Time==null || f3Time==undefined){
		alert("select Ambulatory AID Time..!!");
    	return false;
	}
	
	if(f4Time=="" || f4Time==null || f4Time==undefined){
		alert("select IV / Heparin Lock Time..!!");
    	return false;
	}
	
	if(f5Time=="" || f5Time==null || f5Time==undefined){
		alert("select Gait / Transferring Time..!!");
    	return false;
	}
	
	if(f6Time=="" || f6Time==null || f6Time==undefined){
		alert("select Mental Status Time..!!");
    	return false;
	}
	
	totalScore = factor1 + factor2 + factor3 + factor4 + factor5 + factor6 ;
	$("#MorseScore").html(totalScore);
	
	actionTaken =$("#MorseActionLabel").html();
	
	var MorseRiskLevel="";
	var MorseRisk = document.getElementsByClassName('MorseRiskLevel');
	  for(var i=0; MorseRisk[i]; ++i){
	      if(MorseRisk[i].checked){
	    	  MorseRiskLevel =MorseRisk[i].value ;
	      }
	  }
	
	var records =   "factor1 "+","+factor1+","+f1Time+"#"+
					"factor2 "+","+factor2+","+f2Time+"#"+
					"factor3 "+","+factor3+","+f3Time+"#"+
					"factor4 "+","+factor4+","+f4Time+"#"+
					"factor5 "+","+factor5+","+f5Time+"#"+
					"factor6 "+","+factor6+","+f6Time;
	
	var MFRAScore = {
			listMFRA : []
    }; 
	
	MFRAScore.listMFRA.push({
		mfraScoreId:id,
		patientId:pId,
		treatmentId:tid,
		date:todays_date,
		records:records,
		totalScore:totalScore,
		actionPlan:actionTaken,
		riskLevel:MorseRiskLevel
	});
	
	MFRAScore=JSON.stringify(MFRAScore);
	
	 var inputs = [];
	/*	inputs.push('action=saveMFRAScoreInformation');
		inputs.push('patId=' + pId);
		inputs.push('tId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('totalScore=' + totalScore);
		inputs.push('actionTaken=' + actionTaken);
		inputs.push('MorseRiskLevel=' + MorseRiskLevel);
		inputs.push('records=' + records);*/
	 
	 inputs.push('MFRAScore=' + MFRAScore);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveMFRAScoreInformation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				//fetchMFRAScore();
			}
		});
	
}


function fetchMFRAScore(){

	var todays_date = $("#todays_date").val();
	var tid = $("#tid").val();
	
	 var inputs = [];
		//inputs.push('action=fetchMFRAScore');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchMFRAScoreInformation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				//alert(response);
				if(response.listMFRA.length > 0){
					$("#mfraScoreId").val(response.listMFRA[0].mfraScoreId);
					$("#MorseScore").html(response.listMFRA[0].totalScore);
					$("#MorseActionLabel").html(response.listMFRA[0].actionPlan);
					
					var riskLevel = response.listMFRA[0].riskLevel;
					
					document.getElementById("morseHighCheck").checked = false;
					document.getElementById("morseModerateCheck").checked = false;
					document.getElementById("morseLowCheck").checked = false;
					
					if(riskLevel == "High"){
						document.getElementById("morseHighCheck").checked = true;
					}else if(riskLevel == "Moderate"){
						document.getElementById("morseModerateCheck").checked = true;
					}else if(riskLevel == "Low"){
						document.getElementById("morseLowCheck").checked = true;
					}
					
					var scores = response.listMFRA[0].scores;
					var times = response.listMFRA[0].times;
					var factors = response.listMFRA[0].factors;
					score =scores.split(',');
					time  =times.split(',');
					
					factor = factors.split(' ,');
	
					for(var j=0;j< (factor.length - 1);j++){
						
						var no = factor[j].match(/\d+/g).map(Number);
						$("#Morse_time_"+no).val(time[j]);
						
						if(factor[j]=="factor1"){
							$('input:radio[class=morseScore][id=historyOf_'+
									score[j]+']').prop('checked', true);	
						}else if(factor[j]=="factor2"){
							$('input:radio[class=morseScore][id=diagnosis_'+
									score[j]+']').prop('checked', true);
						}else if(factor[j]=="factor3"){
							$('input:radio[class=morseScore][id=ambulatory_'+
									score[j]+']').prop('checked', true);
						}else if(factor[j]=="factor4"){
							$('input:radio[class=morseScore][id=heparin_'+
									score[j]+']').prop('checked', true);
						}else if(factor[j]=="factor5"){
							$('input:radio[class=morseScore][id=transferring_'+
									score[j]+']').prop('checked', true);
						}else if(factor[j]=="factor6"){
							$('input:radio[class=morseScore][id=mental_'+
									score[j]+']').prop('checked', true);
						}
					}	
				}
			}
		});
		
}


function saveSASScoreAction(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tId = $("#tid").val();
	//Added BY Annapurna
	var rowCount = $("#SASnRow").val();
	var idList = [];
	for(var i=0; i<=7; i++)
	{
		if($("#scoreKey_s"+i).is(":checked"))
		{
			idList.push($("#scoreKey_s"+i).val());
		}
	}
	
	if(idList.length == 0)
	{
		alert("Please select atleast one record from the list!");
		return false;
	}
	var rowCount = $("#SASnRow").val();
	//var data = "";
	var SASScore = {
			listSAS : []
    };
	for(var j=1 ;j <= rowCount;j++){
		
		var idRecord = $("#idSASRecord"+j).val();
		var time = $("#sasTime_"+j).val();
		var actionPlan = $("#sasAction_"+j).html();
		var scoreKey = $("#SASScoreKey_"+j).val();
			if(time==undefined ||actionPlan==undefined ||scoreKey==undefined)
				continue;

		SASScore.listSAS.push({
			sasScoreId:idRecord,
			patientId:pId,
			treatmentId:tId,
			date:todays_date,
			time:time,
			actionPlan:actionPlan,
			scoreKey:scoreKey
		});
		
		//data = data + idRecord +"&"+ scoreKey +"&"+ actionPlan +"&"+ time + "#";
	}
	SASScore=JSON.stringify(SASScore);
	var inputs = [];
	//Added By Annapurna
	if(time==undefined ){
		alert("please select time first");
		return false;
	}

	/*inputs.push('action=saveSASScoreAction');
	inputs.push('treatmentId=' + tId);
	inputs.push('patId=' + pId);
	inputs.push('todays_date=' + todays_date);
	inputs.push('data=' + encodeURIComponent(data));*/
	inputs.push('SASScore=' + SASScore);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "IPDTreatmentServlet",
		url : "ehat/nursingstation/saveSASScoreAction",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
			fetchSASScoreAction();
		}
	});
}


function fetchSASScoreAction(){
	
	var todays_date = $("#todays_date").val();
	var tid = $("#tid").val();

	var inputs = [];
		//inputs.push('action=fetchSASScoreAction');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchSASScoreAction",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				//alert(response);
				setTemplateAndData(response,"fetchSASScoreAction","sasTable");
					
			}
		});	
}


function saveGlasgowComaScorePage4(){

	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	var id = $("#glasgowComaScorePage4Id").val();
	
	var TotalScore = $("#Page4GCSTotalScore").html();
	var ActionUndertaken = $("#Page4GCSAction").html();
	
	var EyeOpenResponse = Number(0);
	var BestVerbalResponse = Number(0);
	var BestMotorResponse = Number(0);
	
	var EORTime ="";
	var BVRTime ="";
	var BMRTime ="";
	
	if( $("input[name='Page4EyeOpenResponse']:checked").val() != undefined){
		EyeOpenResponse = $("input[name='Page4EyeOpenResponse']:checked").val();
		EyeOpenResponse = parseInt(EyeOpenResponse);
		EORTime = $("#Page4GCS_EOR_time_"+EyeOpenResponse).val();
	    }else
	    	return false;
	
	if( $("input[name='Page4BestVerbalResponse']:checked").val() != undefined){
		BestVerbalResponse = $("input[name='Page4BestVerbalResponse']:checked").val();
		BestVerbalResponse = parseInt(BestVerbalResponse);
		BVRTime =  $("#Page4GCS_BVR_time_"+BestVerbalResponse).val();
	    }else
	    	return false;
	
	if( $("input[name='Page4BestMotorResponse']:checked").val() != undefined){
		BestMotorResponse = $("input[name='Page4BestMotorResponse']:checked").val();
		BestMotorResponse = parseInt(BestMotorResponse);
		BMRTime =  $("#Page4GCS_BMR_time_"+BestMotorResponse).val();
	    }else
	    	return false;
	
	/*alert("EyeOpenResponse"+EyeOpenResponse+"\nEORTime"+EORTime);
	alert("BestVerbalResponse"+BestVerbalResponse+"\nBVRTime"+BVRTime);
	alert("BestMotorResponse"+BestMotorResponse+"\nBMRTime"+BMRTime);*/
	
	
	 var GlasgowComaScorePage4 = {
				listGCS : []
	    }; 
		 
		 GlasgowComaScorePage4.listGCS.push({
			 glasgowComaScoreId:id,
			 patientId:pId,
			 treatmentId:tid,
			 date:todays_date,
			 totalScore:TotalScore,
			 actionUndertaken:ActionUndertaken,
			 eorScore:EyeOpenResponse,
			 bvrScore:BestVerbalResponse,
			 bmrScore:BestMotorResponse,
			 eorTime:EORTime,
			 bvrTime:BVRTime,
			 bmrTime:BMRTime
		 });
		
		 GlasgowComaScorePage4=JSON.stringify(GlasgowComaScorePage4);
	
	 var inputs = [];
	/*	inputs.push('action=saveGlasgowComaScorePage4');
		inputs.push('patId=' + pId);
		inputs.push('tId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('TotalScore=' + TotalScore);
		inputs.push('ActionUndertaken=' + ActionUndertaken);
		inputs.push('EyeOpenResponse=' + EyeOpenResponse);
		inputs.push('BestVerbalResponse=' + BestVerbalResponse);
		inputs.push('BestMotorResponse=' + BestMotorResponse);
		inputs.push('eorTime=' + EORTime);
		inputs.push('bvrTime=' + BVRTime);
		inputs.push('bmrTime=' + BMRTime);*/
	 inputs.push('GlasgowComaScorePage4=' + GlasgowComaScorePage4);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveGlasgowComaScorePage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
			});
	
}


function fetchGlasgowComaScore4(){
	 
	 var todays_date = $("#todays_date").val();
	 var pId = $("#pid").val();
	 var tId = $("#tid").val();
	 
	 var inputs = [];
	//	inputs.push('action=fetchGlasgowComaScorePage4');
		inputs.push('patId=' + pId);
		inputs.push('treatmentId=' + tId);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchGlasgowComaScorePage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(gcsBean) {
				//alert(response);
				//gcsBean = eval('(' + response + ')');
				
				$("#glasgowComaScorePage4Id").val(gcsBean.listGCS[0].glasgowComaScoreId);
				
				$('input:radio[class=Page4ResponseScore][id=Page4EyeOpenResponse'+gcsBean.listGCS[0].eorScore+']').prop('checked', true);
				$('input:radio[class=Page4ResponseScore][id=Page4BestVerbalResponse'+gcsBean.listGCS[0].bvrScore+']').prop('checked', true);
				$('input:radio[class=Page4ResponseScore][id=Page4BestMotorResponse'+gcsBean.listGCS[0].bmrScore+']').prop('checked', true);
				
				 $("#Page4GCS_BMR_time_"+gcsBean.listGCS[0].bmrScore).val(gcsBean.listGCS[0].bmrTime);
				 $("#Page4GCS_BVR_time_"+gcsBean.listGCS[0].bvrScore).val(gcsBean.listGCS[0].bvrTime);
				 $("#Page4GCS_EOR_time_"+gcsBean.listGCS[0].eorScore).val(gcsBean.listGCS[0].eorTime);
				
				 $("#Page4GCSTotalScore").html(gcsBean.listGCS[0].totalScore);
				 $("#Page4GCSAction").html(gcsBean.listGCS[0].actionUndertaken);
				 
			}
		});

}


function saveMFRAScorePage4(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	var id = $("#mfraScorePage4Id").val();

	var totalScore = Number(0);
	var factor1 = Number(0);
	var factor2 = Number(0);
	var factor3 = Number(0);
	var factor4 = Number(0);
	var factor5 = Number(0);
	var factor6 = Number(0);
	
	var f1Time = "";
	var f2Time = "";
	var f3Time = "";
	var f4Time = "";
	var f5Time = "";
	var f6Time = "";
	
	var actionTaken="";
	
	if( $("input[name='Page4historyOf']:checked").val() != undefined){
		factor1 = $("input[name='Page4historyOf']:checked").val();
		factor1 = parseInt(factor1);
		f1Time=$("#Page4Morse_time_1").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='Page4diagnosis']:checked").val() != undefined){
		factor2 = $("input[name='Page4diagnosis']:checked").val();
		factor2 = parseInt(factor2);
		f2Time=$("#Page4Morse_time_2").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='Page4ambulatory']:checked").val() != undefined){
		factor3 = $("input[name='Page4ambulatory']:checked").val();
		factor3 = parseInt(factor3);
		f3Time=$("#Page4Morse_time_3").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='Page4heparin']:checked").val() != undefined){
		factor4 = $("input[name='Page4heparin']:checked").val();
		factor4 = parseInt(factor4);
		f4Time=$("#Page4Morse_time_4").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='Page4transferring']:checked").val() != undefined){
		factor5 = $("input[name='Page4transferring']:checked").val();
		factor5 = parseInt(factor5);
		f5Time=$("#Page4Morse_time_5").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if( $("input[name='Page4mental']:checked").val() != undefined){
		factor6 = $("input[name='Page4mental']:checked").val();
		factor6 = parseInt(factor6);
		f6Time=$("#Page4Morse_time_6").val();
	    }else{
	    	alert("Please fill all details in \"Morse Fallen Risk Assessment\" ");
	    	return false;
	    }
	
	if(f1Time=="" || f1Time==null || f1Time==undefined){
		alert("select History of fall Time..!!");
    	return false;
	}
	
	if(f2Time=="" || f2Time==null || f2Time==undefined){
		alert("select Secondary Diagnosis Time..!!");
    	return false;
	}
	
	if(f3Time=="" || f3Time==null || f3Time==undefined){
		alert("select Ambulatory AID Time..!!");
    	return false;
	}
	
	if(f4Time=="" || f4Time==null || f4Time==undefined){
		alert("select IV / Heparin Lock Time..!!");
    	return false;
	}
	
	if(f5Time=="" || f5Time==null || f5Time==undefined){
		alert("select Gait / Transferring Time..!!");
    	return false;
	}
	
	if(f6Time=="" || f6Time==null || f6Time==undefined){
		alert("select Mental Status Time..!!");
    	return false;
	}
	
	totalScore = factor1 + factor2 + factor3 + factor4 + factor5 + factor6 ;
	$("#Page4MorseScore").html(totalScore);
	
	actionTaken =$("#Page4MorseActionLabel").html();
	
	var MorseRiskLevel="";
	var MorseRisk = document.getElementsByClassName('Page4MorseRiskLevel');
	  for(var i=0; MorseRisk[i]; ++i){
	      if(MorseRisk[i].checked){
	    	  MorseRiskLevel =MorseRisk[i].value ;
	      }
	  }
	
	var records =   "factor1 "+","+factor1+","+f1Time+"#"+
					"factor2 "+","+factor2+","+f2Time+"#"+
					"factor3 "+","+factor3+","+f3Time+"#"+
					"factor4 "+","+factor4+","+f4Time+"#"+
					"factor5 "+","+factor5+","+f5Time+"#"+
					"factor6 "+","+factor6+","+f6Time;
	
	
	var MFRAScorePage4 = {
			listMFRA : []
    }; 
	
	MFRAScorePage4.listMFRA.push({
		mfraScoreId:id,
		patientId:pId,
		treatmentId:tid,
		date:todays_date,
		records:records,
		totalScore:totalScore,
		actionPlan:actionTaken,
		riskLevel:MorseRiskLevel
	});
	
	MFRAScore=JSON.stringify(MFRAScorePage4);
	 var inputs = [];
		/*inputs.push('action=saveMFRAScorePage4');
		inputs.push('patId=' + pId);
		inputs.push('tId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('totalScore=' + totalScore);
		inputs.push('actionTaken=' + actionTaken);
		inputs.push('MorseRiskLevel=' + MorseRiskLevel);
		inputs.push('records=' + records);*/
	 
	 inputs.push('MFRAScore=' + MFRAScore);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveMFRAScorePage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
			});

}


function fetchMFRAScore4(){

	var todays_date = $("#todays_date").val();
	var tid = $("#tid").val();
	
	 var inputs = [];
		//inputs.push('action=fetchMFRAScorePage4');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchMFRAScorePage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(mfraBean) {
				//alert(response);
				//mfraBean = eval('(' + response + ')');
				$("#mfraScorePage4Id").val(mfraBean.listMFRA[0].mfraScoreId);
				$("#Page4MorseActionLabel").html(mfraBean.listMFRA[0].actionPlan);
				$("#Page4MorseScore").html(mfraBean.listMFRA[0].totalScore);
				
				var riskLevel = mfraBean.listMFRA[0].riskLevel;
				
				document.getElementById("Page4morseHighCheck").checked = false;
				document.getElementById("Page4morseModerateCheck").checked = false;
				document.getElementById("Page4morseLowCheck").checked = false;
				
				if(riskLevel == "High"){
					document.getElementById("Page4morseHighCheck").checked = true;
				}else if(riskLevel == "Moderate"){
					document.getElementById("Page4morseModerateCheck").checked = true;
				}else if(riskLevel == "Low"){
					document.getElementById("Page4morseLowCheck").checked = true;
				}
				
				var scores = mfraBean.listMFRA[0].scores;
				var times = mfraBean.listMFRA[0].times;
				var factors = mfraBean.listMFRA[0].factors;
				score =scores.split(',');
				time  =times.split(',');
				
				factor = factors.split(' ,');

				for(var j=0;j< (factor.length - 1);j++){
					
					var no = factor[j].match(/\d+/g).map(Number);
					$("#Page4Morse_time_"+no).val(time[j]);
					
					if(factor[j]=="factor1"){
						$('input:radio[class=Page4morseScore][id=Page4historyOf_'+
								score[j]+']').prop('checked', true);	
					}else if(factor[j]=="factor2"){
						$('input:radio[class=Page4morseScore][id=Page4diagnosis_'+
								score[j]+']').prop('checked', true);
					}else if(factor[j]=="factor3"){
						$('input:radio[class=Page4morseScore][id=Page4ambulatory_'+
								score[j]+']').prop('checked', true);
					}else if(factor[j]=="factor4"){
						$('input:radio[class=Page4morseScore][id=Page4heparin_'+
								score[j]+']').prop('checked', true);
					}else if(factor[j]=="factor5"){
						$('input:radio[class=Page4morseScore][id=Page4transferring_'+
								score[j]+']').prop('checked', true);
					}else if(factor[j]=="factor6"){
						$('input:radio[class=Page4morseScore][id=Page4mental_'+
								score[j]+']').prop('checked', true);
					}
					
				}
			}
		});
		
}


function saveUlcerRiskScorePage4(){

	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	var actionPlan = $("#Page4actionPlanTA").val();
	//var total=Number($("#Page4totalBradenScore").html());
	
	var SensoryPerception = Number(0);
	var Mobility = Number(0);
	var Activity = Number(0);
	var Moisture = Number(0);
	var Friction = Number(0);
	var Nutrition = Number(0);
	
	if($("input[name='Page4SensoryPerception']:checked").val() != undefined){
		  SensoryPerception = $("input[name='Page4SensoryPerception']:checked").val();
		  SensoryPerception = parseInt(SensoryPerception);
 }else
 	return false;
	if($("input[name='Page4Mobility']:checked").val() != undefined){
	  Mobility = $("input[name='Page4Mobility']:checked").val();
	  Mobility = parseInt(Mobility);
 }else
 	return false;
 if($("input[name='Page4Activity']:checked").val() != undefined){
	  Activity = $("input[name='Page4Activity']:checked").val();
	  Activity = parseInt(Activity);
 }else
 	return false;
 if( $("input[name='Page4Moisture']:checked").val() != undefined){
	  Moisture = $("input[name='Page4Moisture']:checked").val();
	  Moisture = parseInt(Moisture);
 }else
 	return false;
 if($("input[name='Page4Friction']:checked").val() != undefined){
	  Friction = $("input[name='Page4Friction']:checked").val();
	  Friction = parseInt(Friction);
 }else
 	return false;
 if($("input[name='Page4Nutrition']:checked").val() != undefined){
	  Nutrition = $("input[name='Page4Nutrition']:checked").val();
	  Nutrition = parseInt(Nutrition);
 }else
 	return false;
 
 var riskLevel = null;
 
 var risks = document.getElementsByClassName('Page4riskLevel');
	  
	  for(var i=0; risks[i]; ++i){
	      if(risks[i].checked){
	    	  riskLevel =risks[i].value ;
	      }
	  }
	  
	  var id = $("#ulcerRiskScorePage4Id").val();
	  var UlcerRiskScore = {
				listURS : []
	    }; 
	  
	  UlcerRiskScore.listURS.push({
		  ulcerRiskScoreId:id,
		  patientId:pId,
		  treatmentId:tid,
		  date:todays_date,
		  sensoryPerception: SensoryPerception,
		  activity:Activity,
		  mobility: Mobility,
		  moisture:Moisture,
		  friction: Friction,
		  nutrition: Nutrition,
		  riskLevel:riskLevel,
		  actionPlan: actionPlan
	  });
	  
	  UlcerRiskScore=JSON.stringify(UlcerRiskScore);
	  
	 var inputs = [];
		/*inputs.push('action=saveUlcerRiskScorePage4');
		inputs.push('patId=' + pId);
		inputs.push('tId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('SensoryPerception=' + SensoryPerception);
		inputs.push('Mobility=' + Mobility);
		inputs.push('Activity=' + Activity);
		inputs.push('Moisture=' + Moisture);
		inputs.push('Friction=' + Friction);
		inputs.push('Nutrition=' + Nutrition);
		//inputs.push('totalScore=' + total);
		inputs.push('riskLevel=' + riskLevel);
		inputs.push('actionPlan=' +  encodeURIComponent(actionPlan));  */
	 
	 inputs.push('UlcerRiskScore=' + UlcerRiskScore);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveUlcerRiskScorePage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
		});
}


function fetchUlcerRiskScore4(){
	 
	 var todays_date = $("#todays_date").val();
	 var pId = $("#pid").val();
	 var tId = $("#tid").val();
	 
	 var inputs = [];
		//inputs.push('action=fetchUlcerRiskScorePage4');
		inputs.push('patId=' + pId);
		inputs.push('treatmentId=' + tId);
		inputs.push('todays_date=' + todays_date);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchUlcerRiskScorePage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(ulcerBean) {
				//ulcerBean = eval('(' + response + ')');
				
				$("#ulcerRiskScorePage4Id").val(ulcerBean.listURS[0].ulcerRiskScoreId);
				
				$('input:radio[class=Page4SensoryPerception][id=Page4senPer'+ulcerBean.listURS[0].sensoryPerception+']').prop('checked', true);
				$('input:radio[class=Page4Mobility][id=Page4mobi'+ulcerBean.listURS[0].mobility+']').prop('checked', true);
				$('input:radio[class=Page4Activity][id=Page4acti'+ulcerBean.listURS[0].activity+']').prop('checked', true);
				$('input:radio[class=Page4Moisture][id=Page4moi'+ulcerBean.listURS[0].moisture+']').prop('checked', true);
				$('input:radio[class=Page4Friction][id=Page4fs'+ulcerBean.listURS[0].friction+']').prop('checked', true);
				$('input:radio[class=Page4Nutrition][id=Page4nutr'+ulcerBean.listURS[0].nutrition+']').prop('checked', true);
				
				var total = ulcerBean.listURS[0].nutrition 
						+ulcerBean.listURS[0].friction
						+ulcerBean.listURS[0].moisture
						+ulcerBean.listURS[0].sensoryPerception
						+ulcerBean.listURS[0].mobility
						+ulcerBean.listURS[0].activity;
				 $("#Page4totalBradenScore").html(total);
			      
			      if(ulcerBean.listURS[0].riskLevel == "4"){
			    	  	document.getElementById("Page4vHighRisk").checked = true;
			      }	
			      else if(ulcerBean.listURS[0].riskLevel == "3"){
			    	  	document.getElementById("Page4highRisk").checked = true;
			      }
			      else if (ulcerBean.listURS[0].riskLevel == "2"){
			    	  	document.getElementById("Page4modRisk").checked = true;
			      }
			      else if (ulcerBean.listURS[0].riskLevel == "1"){
			    	  	document.getElementById("Page4lowRisk").checked = true;
			      }
			      $("#Page4actionPlanTA").attr("value",ulcerBean.listURS[0].actionPlan);
			}
		});

}


function saveNursingCarePlanPage4(){
	
	var todays_date = $("#todays_date").val();
	var pId = $("#pid").val();
	var tid = $("#tid").val();
	
	var rowCount = $("#NCP4nRow").val();
	//var data = "";
	
	var NursingCarePlan = {
			listNCP : []
    };
	
	for(var i=1;i<=rowCount;i++){
		
		var idRecord = $("#Page4idNcpRecord"+i).val();
		var assessment = $("#Page4assessment_"+i).val();
		var nursing = $("#Page4nursing_"+i).val();
		var planning = $("#Page4planning_"+i).val();
		var implementation = $("#Page4implementation_"+i).val();
		var evaluation = $("#Page4evaluation_"+i).val();
		var tests = document.getElementsByClassName('Page4test_'+i);
		var testValues = "";
		
		if(assessment==undefined || nursing==undefined ||implementation==undefined ||evaluation==undefined)
		continue;
		for(var j=0; tests[j]; ++j){
		      if(tests[j].checked){
		    	  testValues = testValues + tests[j].value +",";
		      }
		  }
		NursingCarePlan.listNCP.push({
			nursingCarePlanId:idRecord,
			patientId:pId,
			treatmentId:tid,
			assessment:assessment,
			nursingDiagnosis:nursing,
			planning:planning,
			implementation:implementation,
			evaluation:evaluation,
			testValues:testValues,
			date:todays_date
		});
		//data = data + assessment +"&"+nursing+"&"+planning+"&"+implementation+"&"+evaluation+"&"+testValues+"&"+idRecord+"#";
	}
	
	NursingCarePlan=JSON.stringify(NursingCarePlan);
	//alert(data);
	 var inputs = [];
		/*inputs.push('action=saveNursingCarePlanPage4');
		inputs.push('patId=' + pId);
		inputs.push('tId=' + tid);
		inputs.push('todays_date=' + todays_date);
		inputs.push('data=' +  encodeURIComponent(data));*/
	 
	 inputs.push('NursingCarePlan=' + NursingCarePlan);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/saveNursingCarePlanPage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
		});
}


function fetchNursingCarePlanPage4(){
	
	var todays_date = $("#todays_date").val();
	var tid = $("#tid").val();

	var inputs = [];
		//inputs.push('action=fetchNursingCarePlanPage4');
		inputs.push('treatmentId=' + tid);
		inputs.push('todays_date=' + todays_date);
	
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/fetchNursingCarePlanPage4",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				//alert(response);
				
				setTemplateAndData(response,"fetchNursingCarePlanPage4", "nursingCarePlanTablePage4");
				
				for(var i=0 ; response.listNCP.length ;i++){
					var thestring = response.listNCP[i].testValues;
					alltests = thestring.split(',');
						for(var j=0;j< (alltests.length - 1);j++){	
							var no = alltests[j].match(/\d+/g).map(Number);
							var id="Page4"+no+"test_"+(i+1);
							document.getElementById(id).checked = true;
						}
				}
			}
		});	
	
}


var k = 1;
function toCreateInvRow() {

	var rowCount = $("#invnRow").val();
	var addrowottCount = $("#addRowCountInv").val();
	var invnRow = $("#invnRow").val();

	if (addrowottCount != 0) {

		var lineOtube = $("#lineOtube" + addrowottCount + "").val();
		var site = $("#site" + addrowottCount + "").val();
		var condition = $("#condition" + addrowottCount + "").val();
		var action = $("#action" + addrowottCount + "").val();
		var dateOdays = $("#dateOdays" + addrowottCount + "").val();
		var change = $("#change" + addrowottCount + "").val();
		
	}

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	rowId = "RowCount" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	document.getElementById("invasionSiteCareTable").appendChild(x);

	document.getElementById(rowId).innerHTML = '<td class="col-md-2">'
			+ '<input type="text" class="form-control input-SmallText TextFont auto" value="" name="lineOtube" id="lineOtube'
			+ rowCount
			+ '"/></td>'
			+ '<td class="col-md-1"><input type="text" class="form-control input-SmallText TextFont auto" name="site" value="" id="site'
			+ rowCount
			+ '"/></td>'
			+ '<td class="col-md-1"><input type="text" class="form-control input-SmallText TextFont auto" name="dateOdays" value="" id="dateOdays'
			+ rowCount
			+ '"  ></td>'
			+ '<td class="col-md-2"><label id="condition'
			+ rowCount
			+ '"></label></td>'
			+ '<td class="col-md-2"><label id="action'
			+ rowCount
			+ '"></label></td>'
			+ '<td class="col-md-1"><select class="form-control input-SmallText TextFont" name="change" id="change'
			+ rowCount
			+ '" ><option value="Select">-Select-</option><option value="YES">YES</option><option value="NO">NO</option></select></td>'
			+ '<td class="col-md-1">'
			+ '<button type="button" class="btn btn-primary btn-xs" name="setRecord" onclick="setInvasionSiteCareDetails('
			+ rowCount
			+ ')">Set</button></td>'
			+ '<td class="col-md-1"><label id="totalDays'
			+ rowCount
			+ '"> totalDays:</label> </td>'
			+ '<td class="col-md-1">'
			+ '<input id="checkInvRecord" type="checkbox" name="checkRecord'
			+ rowCount
			+ '"> <input id="idRecord'
			+ rowCount
			+ '" type="hidden" value="0"></td>';

	$("#invnRow").val(rowCount);
	$("#addRowCountInv").val(k);
	k++;
}



function toRemoveInvRow(row){

		var nRowrowCount = $("#invnRow").val();
		if (nRowrowCount == "0") {
			alert("No Data in Invasion Site Care");
			return false;
		}
		var allVals = [];
		var flag = false;
		
		$.each($('#checkInvRecord:checked'), function() {
			allVals.push($(this).val());
			flag = true;
		});

		if (!flag) {
			alert("please check the checbox...");
			return false;
		}
	
		var hiddenRowCount = $("#invnRow").val();//$("#InvRowCount").val();
		var rowCount = hiddenRowCount;
		var addrowottCount = $("#addRowCountInv").val();
		
		var count = rowCount - addrowottCount;
		var totalRowCount = (Number(rowCount) + Number(addrowottCount));
		var p = 1;
		
		for ( var i = 0; i < (totalRowCount); i++) {
			var $radios = $('input:checkbox[name=checkRecord' + p + ']');
			if ($radios.is(':checked') == true) {
				var id =$("#idRecord"+p).val();
				$("#RowCount" + p + "").remove();
				if(id != 0){
					deleteInvasiveSiteCareRecord(id);
				}
			}
			p++;
		}; 
}

function setInvasionSiteCareDetails(no){
	  
	  var actionValues ="";
	  var conditionValues ="";
	  
	  var checkedActions = document.getElementsByClassName('checkAction');
	  var checkedConditions = document.getElementsByClassName('checkCondition');
	  
	  for(var i=0; checkedActions[i]; ++i){
	      if(checkedActions[i].checked){
	    	  actionValues = actionValues + checkedActions[i].value +",";
	      }
	  }
	  
	  for(var i=0; checkedConditions[i]; ++i){
	      if(checkedConditions[i].checked){
	    	  conditionValues = conditionValues + checkedConditions[i].value +",";
	      }
	  }
	  $("#condition"+no).html(conditionValues);
	  $("#action"+no).html(actionValues);
	  
}



function toCreateRowHandHygiene(){

	var rowCount = $("#hhcdpRow").val();
	var addrowottCount = $("#addRowCountHHcdP").val();

	if (addrowottCount != 0) {
		var proceduretxt = $("#proceduretxt" + addrowottCount + "").val();
		var doneBytxt = $("#doneBytxt" + addrowottCount + "").val();
		var protocolBeforetxt = $("#protocolBeforetxt" + addrowottCount + "").val();
		var protocolAftertxt = $("#protocolAftertxt" + addrowottCount + "").val();
		var nameNsigntxt = $("#nameNsigntxt" + addrowottCount + "").val();
		var ICNsigntxt = $("#ICNsigntxt" + addrowottCount + "").val();
	}

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	rowId = "RowCountHHCRow" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	document.getElementById("handHygieneChecklistTable").appendChild(x);

	document.getElementById(rowId).innerHTML = 
			 '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="proceduretxt'
			+ rowCount+ '"/></td>'
			+ '<th class="col-md-1"><input type="text" class="form-control input-SmallText" id="doneBytxt'
			+ rowCount	+ '"/></td>'
			+ '<th class="col-md-3"><input type="text" class="form-control input-SmallText" id="protocolBeforetxt'
			+ rowCount+ '"  ></td>'
			+ '<th class="col-md-3"><input type="text" class="form-control input-SmallText" id="protocolAftertxt'
			+ rowCount+ '"  ></td>'
			+ '<td class="col-md-1"><input type="text" class="form-control input-SmallText" id="nameNsigntxt'
			+ rowCount+ '"  ></td>'
			+ '<td class="col-md-1"><input type="text" class="form-control input-SmallText" id="ICNsigntxt'
			+ rowCount+ '"  ></td>'
			+ '<td class="col-md-1"><input  class="checkCondition" type="checkbox" value="" id="HHdPcheck" name="HHdPcheck'
			+ rowCount+ '"  ><input type="hidden" value="0" id="handHygieneId'+ rowCount+ '" /></td>';

	$("#hhcdpRow").val(rowCount);
	$("#addRowCountHHcdP").val(k);
	k++;
	
}


function setBradenScore(){
	
	var total=Number(0);
	var SensoryPerception = Number(0);
	var Mobility = Number(0);
	var Activity = Number(0);
	var Moisture = Number(0);
	var Friction = Number(0);
	var Nutrition = Number(0);
	document.getElementById("vHighRisk").checked = 	false;
	document.getElementById("highRisk").checked = 	false;
	document.getElementById("modRisk").checked = 	false;
	document.getElementById("lowRisk").checked = 	false;
	if($("input[name='SensoryPerception']:checked").val() != undefined 
			&& $("input[name='Mobility']:checked").val() != undefined
			&& $("input[name='Activity']:checked").val() != undefined 
			&& $("input[name='Moisture']:checked").val() != undefined 
			&& $("input[name='Friction']:checked").val() != undefined 
			&& $("input[name='Nutrition']:checked").val() != undefined){
		  if($("input[name='SensoryPerception']:checked").val() != undefined){
			  SensoryPerception = $("input[name='SensoryPerception']:checked").val();
			  SensoryPerception = parseInt(SensoryPerception);
	      }
		  if($("input[name='Mobility']:checked").val() != undefined){
	    	  Mobility = $("input[name='Mobility']:checked").val();
	    	  Mobility = parseInt(Mobility);
	      }
	      if($("input[name='Activity']:checked").val() != undefined){
	    	  Activity = $("input[name='Activity']:checked").val();
	    	  Activity = parseInt(Activity);
	      }
	      if( $("input[name='Moisture']:checked").val() != undefined){
	    	  Moisture = $("input[name='Moisture']:checked").val();
	    	  Moisture = parseInt(Moisture);
	      }
	      if($("input[name='Friction']:checked").val() != undefined){
	    	  Friction = $("input[name='Friction']:checked").val();
	    	  Friction = parseInt(Friction);
	      }
	      if($("input[name='Nutrition']:checked").val() != undefined){
	    	  Nutrition = $("input[name='Nutrition']:checked").val();
	    	  Nutrition = parseInt(Nutrition);
	      }
	      total = SensoryPerception+ Mobility+ Activity+ Moisture+ Friction+ Nutrition;
	      $("#totalBradenScore").html(total);
	      
	      if(total<=9){
	    	  	document.getElementById("vHighRisk").checked = true;
	      }	
	      else if(total>=10 && total<=12){
	    	  	document.getElementById("highRisk").checked = true;
	      }
	      else if (total>=13 && total<=14){
	    	  	document.getElementById("modRisk").checked = true;
	      }
	      else if ((total>=15)){
	    	  	document.getElementById("lowRisk").checked = true;
	      }
	}
}


function setGCSscoreNaction(){
	
	var EyeOpenResponse = Number(0);
	var BestVerbalResponse = Number(0);
	var BestMotorResponse = Number(0);
	var Score = Number(0);
	
	var label="";
	
	if( $("input[name='EyeOpenResponse']:checked").val() != undefined){
		EyeOpenResponse = $("input[name='EyeOpenResponse']:checked").val();
		EyeOpenResponse = parseInt(EyeOpenResponse);
	    }else
	    	return false;
	
	if( $("input[name='BestVerbalResponse']:checked").val() != undefined){
		BestVerbalResponse = $("input[name='BestVerbalResponse']:checked").val();
		BestVerbalResponse = parseInt(BestVerbalResponse);
	    }else
	    	return false;
	
	if( $("input[name='BestMotorResponse']:checked").val() != undefined){
		BestMotorResponse = $("input[name='BestMotorResponse']:checked").val();
		BestMotorResponse = parseInt(BestMotorResponse);
	    }else
	    	return false;
	
	Score = EyeOpenResponse + BestVerbalResponse + BestMotorResponse;
	
	if(Score < 8 ){
		label = "A";
	}else if (Score >= 8 && Score < 12){
		label = "B";
	}else{
		label = "C";
	}
	
	$("#GCSTotalScore").html(Score);
	$("#GCSAction").html(label);
	
}

function setVIPActionPlan(duration){
	
	var VIPScore = Number(0);
	
		if( $("input[name='VIPScore']:checked").val() != undefined){
			VIPScore = $("input[name='VIPScore']:checked").val();
			VIPScore = parseInt(VIPScore);
			
		    }else
		    	return false;
	
	var actionPlan =$("#VIPActonPlanfor"+VIPScore).text();
	
		if(duration == "morning"){
			$("#vipDurationM").html(actionPlan);
		}else if(duration == "evening"){
			$("#vipDurationE").html(actionPlan);
		}else if(duration == "night"){
			$("#vipDurationN").html(actionPlan);
		}
}

function clearVIPActionPlan(duration){
	
	if(duration == "morning"){
		$("#vipDurationM").html("");
	}else if(duration == "evening"){
		$("#vipDurationE").html("");
	}else if(duration == "night"){
		$("#vipDurationN").html("");
	}
}

function setVIPActionPlanTaken(){
	
	var VIPScore = Number(0);
	
	if( $("input[name='VIPScore']:checked").val() != undefined){
		VIPScore = $("input[name='VIPScore']:checked").val();
		VIPScore = parseInt(VIPScore);
		
	    }else
	    	return false;

var actionPlan =$("#VIPActonPlanfor"+VIPScore).text();

var duration = $("#vipDurationSelect").val();

$("#vipDurationText").html(duration);
$("#vipDurationAction").html(actionPlan);

}


function countDVTscore(){
	
	 var checkedCF = document.getElementsByClassName('clinicalFeature');
	 var totalScore= Number(0);
	 var label="";
	  
	  for(var i=0; checkedCF[i]; ++i){
	      if(checkedCF[i].checked){
	    	  var value = Number(checkedCF[i].value)
	    	  totalScore = totalScore + value;
	      }
	  }
	  $("#totalDVTScore").html(totalScore);
	  
	  if(totalScore<0){
		  label= $("#DVTAPA").html();
	  }else if(totalScore > 1 && totalScore < 3){
		  label= $("#DVTAPB").html();
	  }else if(totalScore > 2 && totalScore < 9){
		  label= $("#DVTAPC").html();
	  }else if(totalScore > 8){
		  label= $("#DVTAPD").html();
	  }
	  
	  $("#dvtActionLabel").html(label);
}

function setMorseScoreAndAction(){

	var totalScore = Number(0);
	var factor1 = Number(0);
	var factor2 = Number(0);
	var factor3 = Number(0);
	var factor4 = Number(0);
	var factor5 = Number(0);
	var factor6 = Number(0);
	
	var label="";
	
	if( $("input[name='historyOf']:checked").val() != undefined){
		factor1 = $("input[name='historyOf']:checked").val();
		factor1 = parseInt(factor1);
	    }else
	    	return false;
	
	if( $("input[name='diagnosis']:checked").val() != undefined){
		factor2 = $("input[name='diagnosis']:checked").val();
		factor2 = parseInt(factor2);
	    }else
	    	return false;
	
	if( $("input[name='ambulatory']:checked").val() != undefined){
		factor3 = $("input[name='ambulatory']:checked").val();
		factor3 = parseInt(factor3);
	    }else
	    	return false;
	
	if( $("input[name='heparin']:checked").val() != undefined){
		factor4 = $("input[name='heparin']:checked").val();
		factor4 = parseInt(factor4);
	    }else
	    	return false;
	
	if( $("input[name='transferring']:checked").val() != undefined){
		factor5 = $("input[name='transferring']:checked").val();
		factor5 = parseInt(factor5);
	    }else
	    	return false;
	
	if( $("input[name='mental']:checked").val() != undefined){
		factor6 = $("input[name='mental']:checked").val();
		factor6 = parseInt(factor6);
	    }else
	    	return false;
	
	totalScore = factor1 + factor2 + factor3 + factor4 + factor5 + factor6 ;
	$("#MorseScore").html(totalScore);
	
	document.getElementById("morseHighCheck").checked = false;
	document.getElementById("morseModerateCheck").checked = false;
	document.getElementById("morseLowCheck").checked = false;
	
	if(totalScore >= 45){
	  	document.getElementById("morseHighCheck").checked = true;
	  	label= $("#morseHighLabel").html();
	}else if(totalScore < 45 && totalScore >= 25){
		document.getElementById("morseModerateCheck").checked = true;
		label= $("#morseModerateLabel").html();
	}else if(totalScore < 25){
		document.getElementById("morseLowCheck").checked = true;
		label= $("#morseLowLabel").html();
	}
	$("#MorseActionLabel").html(label);
	
}



var ncp = 1;
function toCreateRowNCP(){

	 	var rowCount = $("#NCPnRow").val();
	 	var addrowottCount = $("#addRowCountNCP").val();

	 	if (rowCount == -1) {
	 		rowCount = 0;
	 	}
	 	rowCount++;
	 	rowId = "RowCountNCP" + rowCount;
	 	var x = document.createElement('tbody');
	 	x.setAttribute('id', rowId);
	 	document.getElementById("nursingCarePlanTable").appendChild(x);

	 	document.getElementById(rowId).innerHTML = '<tr><td rowspan="8" style="width:10%;"><textarea id="assessment_'+ rowCount+'" style="width: 95%;" rows ="12"></textarea></td>'
	 			+ '<td rowspan="8" style="width:15%;"><textarea id="nursing_'+ rowCount+'" style="width: 95%;" rows ="12"></textarea></td>'
	 			+ '<td rowspan="8" style="width:15%;"><textarea id="planning_'+ rowCount+'" style="width: 90%;"rows ="12"></textarea></td>'
	 			+ '<td rowspan="8" style="width:15%;"><textarea id="implementation_'+ rowCount+'" style="width: 90%;"rows ="12"></textarea></td>'
	 			+ '<td rowspan="8" style="width:15%;"><textarea id="evaluation_'+ rowCount+'" style="width: 90%;"rows ="12"></textarea></td>'
	 			+ '<td>		<input id="1test_'+ rowCount+'" class="test_'+ rowCount+'" type="checkbox" name="I/V Cannula" value="test1"/>I/V Cannula</td>'
	 			+ '<td rowspan="8" style="width:10%;"><input id="deleteNCPCheck" type="checkbox" name="deleteNCPCheck'+ rowCount+'" /> </td></tr>'
	 			+ '<tr><td ><input id="2test_'+ rowCount+'" class="test_'+ rowCount+'" type="checkbox" name="Foleys Catheter" value="test2"/>Foleys Catheter</td></tr>'
	 			+ '<tr><td ><input id="3test_'+ rowCount+'" class="test_'+ rowCount+'" type="checkbox" name="Ryles Tube" value="test3"/>Ryles Tube</td></tr>'
	 			+ '<tr><td ><input id="4test_'+ rowCount+'" class="test_'+ rowCount+'" type="checkbox" name="Drain" value="test4"/>Drain</td></tr>'
	 			+ '<tr><td ><input id="5test_'+ rowCount+'" class="test_'+ rowCount+'" type="checkbox" name="ICD" value="test5"/>ICD</td></tr>'
	 			+ '<tr><td ><input id="6test_'+ rowCount+'" class="test_'+ rowCount+'" type="checkbox" name="Colostomy" value="test6"/>Colostomy</td></tr>'
	 			+ '<tr><td ><input id="7test_'+ rowCount+'" class="test_'+ rowCount+'" type="checkbox" name="Ileostomy" value="test7"/>Ileostomy</td></tr>'
	 			+ '<tr><td >Sisters Sign</td><input type="hidden" value="0" id="nursingCarePlanRow_'+ rowCount+'" /></tr>'
	 			+ '<input id="idNcpRecord'+ rowCount+ '" type="hidden" value="0"></td>';
	 			
	 	$("#NCPnRow").val(rowCount);
	 	$("#addRowCountNCP").val(ncp);
	 	ncp++;
	 	
	 }

function toRemoveRowNCP(){

	var nRowrowCount = $("#NCPnRow").val();
	if (nRowrowCount == "0") {
		alert("No Data in Nursing Care Plan");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#deleteNCPCheck:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}

	var hiddenRowCount = $("#NCPnRow").val();//$("#InvRowCount").val();
	var rowCount = hiddenRowCount;
	var addrowottCount = $("#addRowCountNCP").val();
	
	var count = rowCount - addrowottCount;
	var totalRowCount = (Number(rowCount) + Number(addrowottCount));
	var p = 1;
	for ( var i = 0; i < (totalRowCount); i++) {
		var $radios = $('input:checkbox[name=deleteNCPCheck' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idNcpRecord"+p).val();
			$("#RowCountNCP" + p + "").remove();
			if(id != 0){
				deleteNursingCarePlanRecord(id);
			}
		}
		p++;
	}; 

}


function toRemoveRowHandHygiene(){

	var nRowrowCount = $("#hhcdpRow").val();
	if (nRowrowCount == "0") {
		alert("No Data in Hand Hygiene CheckList");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#HHdPcheck:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}

	var hiddenRowCount = $("#hhcdpRow").val();//$("#InvRowCount").val();
	var rowCount = hiddenRowCount;
	var addrowottCount = $("#addRowCountHHcdP").val();
	
	var count = rowCount - addrowottCount;
	var totalRowCount = (Number(rowCount) + Number(addrowottCount));
	var p = 1;
	for ( var i = 0; i < (totalRowCount); i++) {
		var $radios = $('input:checkbox[name=HHdPcheck' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#handHygieneId"+p).val();
			$("#RowCountHHCRow" + p + "").remove();
			if(id != 0){
				deleteHandHygieneRecord(id);
			}
		}
		p++;
	}; 

}

var sasRowAdd=1;
function toCreateSASRow(){

	var rowCount = $("#SASnRow").val();
	var addrowottCount = $("#addRowCountSAS").val();

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	rowId = "sasRow_" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	document.getElementById("sasTable").appendChild(x);

	document.getElementById(rowId).innerHTML = '<th class="col-md-9"><label id="sasAction_'+ rowCount+'"></label> </th><input id="SASScoreKey_'+ rowCount+ '" type="hidden" value="0">'
		+'<th class="col-md-1"><input id="sasTime_'+ rowCount+'" class="form-control input-SmallText TextFont" type="text" name="textfield" onclick="setSASTime('+ rowCount+')" readonly="readonly"></th>'
		+'<th class="col-md-1"><input id="sasCheck" type="checkbox" value="" name="sasRowDelete_'+ rowCount+'"><input id="idSASRecord'+ rowCount+ '" type="hidden" value="0">'
		+'<input class="btn btn-xs btn-outline-success pull-right" type="button" onclick="setScoreKeyForSAS('+ rowCount+')" value="set"></th>';
	
	$("#SASnRow").val(rowCount);
	$("#addRowCountSAS").val(sasRowAdd);
	sasRowAdd++;
	
}

function toRemoveSASRow(){

	var nRowrowCount = $("#SASnRow").val();
	if (nRowrowCount == "0") {
		alert("No Data in SAS ");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#sasCheck:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}

	var hiddenRowCount = $("#SASnRow").val();//$("#InvRowCount").val();
	var rowCount = hiddenRowCount;
	var addrowottCount = $("#addRowCountSAS").val();
	
	var count = rowCount - addrowottCount;
	var totalRowCount = (Number(rowCount) + Number(addrowottCount));
	var p = 1;
	for ( var i = 0; i < (totalRowCount); i++) {
		var $radios = $('input:checkbox[name=sasRowDelete_' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idSASRecord"+p).val();
			$("#sasRow_" + p + "").remove();
			if(id != 0){
				deleteSASRecord(id);
			}
		}
		p++;
	}; 

}

function setScoreKeyForSAS(rowNo){
	
	var scoreKey=[];
	var actionTaken = "";
	
	if($("input[id='scoreKey_s1']:checked").val() != undefined){
		scoreKey.push($("input[id='scoreKey_s1']:checked").val());
	}
	if($("input[id='scoreKey_s2']:checked").val() != undefined){
		scoreKey.push($("input[id='scoreKey_s2']:checked").val());
	}
	if($("input[id='scoreKey_s3']:checked").val() != undefined){
		scoreKey.push($("input[id='scoreKey_s3']:checked").val());
		
	}if($("input[id='scoreKey_s4']:checked").val() != undefined){
		scoreKey.push($("input[id='scoreKey_s4']:checked").val());
		
	}if($("input[id='scoreKey_s5']:checked").val() != undefined){
		scoreKey.push($("input[id='scoreKey_s5']:checked").val());
		
	}if($("input[id='scoreKey_s6']:checked").val() != undefined){
		scoreKey.push($("input[id='scoreKey_s6']:checked").val());
		
	}if($("input[id='scoreKey_s7']:checked").val() != undefined){
		scoreKey.push($("input[id='scoreKey_s7']:checked").val());
		
	}
	//alert(scoreKey);
	var label1 = "";
	var label2 = "";
	var label3 = "";
	
	for(var i =0 ;i<scoreKey.length;i++){
		if(scoreKey[i] == "s1" || scoreKey[i] == "s2"){
			label1=$("#sasActionA").html()+ ", ";
		}
		if(scoreKey[i] == "s4" || scoreKey[i] == "s3"){
			label2=$("#sasActionB").html()+", ";
		}
		if(scoreKey[i] == "s5" || scoreKey[i] == "s6" || scoreKey[i] == "s7"){
			label3=$("#sasActionC").html();
		}
	}
	var label = label1+label2+label3;
	
	
	//$("#SASScoreKey_"+rowNo).val(scoreKey);
	/*var label = label1 + label2 + label3;
	if(scoreKey == "s1" || scoreKey == "s2"){
		label = $("#sasActionA").html();
	}else if(scoreKey == "s3" || scoreKey == "s4"){
		label = $("#sasActionB").html();
	}else if(scoreKey == "s5" || scoreKey == "s6" || scoreKey == "s7"){
		label = $("#sasActionC").html();
	}*/
	
	$("#sasAction_"+rowNo).html(label);
	  
}

function setSASTime(row){
	
	$('#sasTime_' +row).attr('readonly', 'readonly');
	$('#sasTime_' + row).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 60
	});
	
}

function setGCSTime(type,id){
	
	$('#Page4GCS_'+type+'_time_' + id).attr('readonly', 'readonly');
	$('#Page4GCS_'+type+'_time_' + id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 30
	});
}

function setGCSscoreNactionPage4(){
	
	var EyeOpenResponse = Number(0);
	var BestVerbalResponse = Number(0);
	var BestMotorResponse = Number(0);
	var Score = Number(0);
	
	var label="";
	
	if( $("input[name='Page4EyeOpenResponse']:checked").val() != undefined){
		EyeOpenResponse = $("input[name='Page4EyeOpenResponse']:checked").val();
		EyeOpenResponse = parseInt(EyeOpenResponse);
	    }else
	    	return false;
	
	if( $("input[name='Page4BestVerbalResponse']:checked").val() != undefined){
		BestVerbalResponse = $("input[name='Page4BestVerbalResponse']:checked").val();
		BestVerbalResponse = parseInt(BestVerbalResponse);
	    }else
	    	return false;
	
	if( $("input[name='Page4BestMotorResponse']:checked").val() != undefined){
		BestMotorResponse = $("input[name='Page4BestMotorResponse']:checked").val();
		BestMotorResponse = parseInt(BestMotorResponse);
	    }else
	    	return false;
	
	Score = EyeOpenResponse + BestVerbalResponse + BestMotorResponse;
	
	if(Score < 8 ){
		label = "A";
	}else if (Score >= 8 && Score < 12){
		label = "B";
	}else{
		label = "C";
	}
	
	$("#Page4GCSTotalScore").html(Score);
	$("#Page4GCSAction").html(label);
	
}

function setMorseScoreAndActionPage4(){

	var totalScore = Number(0);
	var factor1 = Number(0);
	var factor2 = Number(0);
	var factor3 = Number(0);
	var factor4 = Number(0);
	var factor5 = Number(0);
	var factor6 = Number(0);
	
	var label="";
	
	if( $("input[name='Page4historyOf']:checked").val() != undefined){
		factor1 = $("input[name='Page4historyOf']:checked").val();
		factor1 = parseInt(factor1);
	    }else
	    	return false;
	
	if( $("input[name='Page4diagnosis']:checked").val() != undefined){
		factor2 = $("input[name='Page4diagnosis']:checked").val();
		factor2 = parseInt(factor2);
	    }else
	    	return false;
	
	if( $("input[name='Page4ambulatory']:checked").val() != undefined){
		factor3 = $("input[name='Page4ambulatory']:checked").val();
		factor3 = parseInt(factor3);
	    }else
	    	return false;
	
	if( $("input[name='Page4heparin']:checked").val() != undefined){
		factor4 = $("input[name='Page4heparin']:checked").val();
		factor4 = parseInt(factor4);
	    }else
	    	return false;
	
	if( $("input[name='Page4transferring']:checked").val() != undefined){
		factor5 = $("input[name='Page4transferring']:checked").val();
		factor5 = parseInt(factor5);
	    }else
	    	return false;
	
	if( $("input[name='Page4mental']:checked").val() != undefined){
		factor6 = $("input[name='Page4mental']:checked").val();
		factor6 = parseInt(factor6);
	    }else
	    	return false;
	
	totalScore = factor1 + factor2 + factor3 + factor4 + factor5 + factor6 ;
	$("#Page4MorseScore").html(totalScore);
	
	document.getElementById("Page4morseHighCheck").checked = false;
	document.getElementById("Page4morseModerateCheck").checked = false;
	document.getElementById("Page4morseLowCheck").checked = false;
	
	if(totalScore >= 45){
	  	document.getElementById("Page4morseHighCheck").checked = true;
	  	label= $("#Page4morseHighLabel").html();
	}else if(totalScore < 45 && totalScore >= 25){
		document.getElementById("Page4morseModerateCheck").checked = true;
		label= $("#Page4morseModerateLabel").html();
	}else if(totalScore < 25){
		document.getElementById("Page4morseLowCheck").checked = true;
		label= $("#Page4morseLowLabel").html();
	}
	$("#Page4MorseActionLabel").html(label);
	
}

function setMFRATime(id){
	
	$('#Page4Morse_time_' + id).attr('readonly', 'readonly');
	$('#Page4Morse_time_' + id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 30
	});
}


function setBradenScorePage4(){

	$("#Page4actionPlanTA").val("");
	var total=Number(0);
	var SensoryPerception = Number(0);
	var Mobility = Number(0);
	var Activity = Number(0);
	var Moisture = Number(0);
	var Friction = Number(0);
	var Nutrition = Number(0);
	document.getElementById("Page4vHighRisk").checked = 	false;
	document.getElementById("Page4highRisk").checked = 	false;
	document.getElementById("Page4modRisk").checked = 	false;
	document.getElementById("Page4lowRisk").checked = 	false;
	if($("input[name='Page4SensoryPerception']:checked").val() != undefined 
			&& $("input[name='Page4Mobility']:checked").val() != undefined
			&& $("input[name='Page4Activity']:checked").val() != undefined 
			&& $("input[name='Page4Moisture']:checked").val() != undefined 
			&& $("input[name='Page4Friction']:checked").val() != undefined 
			&& $("input[name='Page4Nutrition']:checked").val() != undefined){
		  if($("input[name='Page4SensoryPerception']:checked").val() != undefined){
			  SensoryPerception = $("input[name='Page4SensoryPerception']:checked").val();
			  SensoryPerception = parseInt(SensoryPerception);
	      }
		  if($("input[name='Page4Mobility']:checked").val() != undefined){
	    	  Mobility = $("input[name='Page4Mobility']:checked").val();
	    	  Mobility = parseInt(Mobility);
	      }
	      if($("input[name='Page4Activity']:checked").val() != undefined){
	    	  Activity = $("input[name='Page4Activity']:checked").val();
	    	  Activity = parseInt(Activity);
	      }
	      if( $("input[name='Page4Moisture']:checked").val() != undefined){
	    	  Moisture = $("input[name='Page4Moisture']:checked").val();
	    	  Moisture = parseInt(Moisture);
	      }
	      if($("input[name='Page4Friction']:checked").val() != undefined){
	    	  Friction = $("input[name='Page4Friction']:checked").val();
	    	  Friction = parseInt(Friction);
	      }
	      if($("input[name='Page4Nutrition']:checked").val() != undefined){
	    	  Nutrition = $("input[name='Page4Nutrition']:checked").val();
	    	  Nutrition = parseInt(Nutrition);
	      }
	      total = SensoryPerception+ Mobility+ Activity+ Moisture+ Friction+ Nutrition;
	      $("#Page4totalBradenScore").html(total);
	      
	      if(total<=9){
	    	  	document.getElementById("Page4vHighRisk").checked = true;
	    	  	$("#Page4actionPlanTA").val("Very High Risk");
	      }	
	      else if(total>=10 && total<=12){
	    	  	document.getElementById("Page4highRisk").checked = true;
	    		$("#Page4actionPlanTA").val("High Risk");
	      }
	      else if (total>=13 && total<=14){
	    	  	document.getElementById("Page4modRisk").checked = true;
	    		$("#Page4actionPlanTA").val("Moderate Risk");
	      }
	      else if ((total>=15)){
	    	  	document.getElementById("Page4lowRisk").checked = true;
	    		$("#Page4actionPlanTA").val("Low Risk");
	      }
	}

}

var ncp4 =1;
function toCreateRowNCP4(){

 	var rowCount = $("#NCP4nRow").val();
 	var addrowottCount = $("#addRowCountNCP4").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "RowCountNCPPage4" + rowCount;
 	var x = document.createElement('tbody');
 	x.setAttribute('id', rowId);
 	document.getElementById("nursingCarePlanTablePage4").appendChild(x);

 	document.getElementById(rowId).innerHTML = '<tr><td rowspan="8" style="width:15%;"><textarea id="Page4assessment_'+ rowCount+'" style="width: 95%;" rows ="12"></textarea></td>'
 			+ '<td rowspan="8" style="width:15%;"><textarea id="Page4nursing_'+ rowCount+'" style="width: 95%;" rows ="12"></textarea></td>'
 			+ '<td rowspan="8" style="width:15%;"><textarea id="Page4planning_'+ rowCount+'" style="width: 90%;"rows ="12"></textarea></td>'
 			+ '<td rowspan="8" style="width:15%;"><textarea id="Page4implementation_'+ rowCount+'" style="width: 90%;"rows ="12"></textarea></td>'
 			+ '<td rowspan="8" style="width:15%;"><textarea id="Page4evaluation_'+ rowCount+'" style="width: 90%;"rows ="12"></textarea></td>'
 			+ '<td>		<input id="Page41test_'+ rowCount+'" class="Page4test_'+ rowCount+'" type="checkbox" name="I/V Cannula" value="test1"/>I/V Cannula</td>'
 			+ '<td rowspan="8" style="width:10%;"><input id="Page4deleteNCPCheck" type="checkbox" name="Page4deleteNCPCheck'+ rowCount+'" /> </td></tr>'
 			+ '<tr><td ><input id="Page42test_'+ rowCount+'" class="Page4test_'+ rowCount+'" type="checkbox" name="Foleys Catheter" value="test2"/>Foleys Catheter</td></tr>'
 			+ '<tr><td ><input id="Page43test_'+ rowCount+'" class="Page4test_'+ rowCount+'" type="checkbox" name="Ryles Tube" value="test3"/>Ryles Tube</td></tr>'
 			+ '<tr><td ><input id="Page44test_'+ rowCount+'" class="Page4test_'+ rowCount+'" type="checkbox" name="Drain" value="test4"/>Drain</td></tr>'
 			+ '<tr><td ><input id="Page45test_'+ rowCount+'" class="Page4test_'+ rowCount+'" type="checkbox" name="ICD" value="test5"/>ICD</td></tr>'
 			+ '<tr><td ><input id="Page46test_'+ rowCount+'" class="Page4test_'+ rowCount+'" type="checkbox" name="Colostomy" value="test6"/>Colostomy</td></tr>'
 			+ '<tr><td ><input id="Page47test_'+ rowCount+'" class="Page4test_'+ rowCount+'" type="checkbox" name="Ileostomy" value="test7"/>Ileostomy</td></tr>'
 			+ '<tr><td >Sisters Sign</td><input type="hidden" value="0" id="Page4nursingCarePlanRow_'+ rowCount+'" /></tr>'
 			+ '<input id="Page4idNcpRecord'+ rowCount+ '" type="hidden" value="0"></td>';
 			
 	$("#NCP4nRow").val(rowCount);
 	$("#addRowCountNCP4").val(ncp4);
 	ncp4++;
	
}


function toRemoveRowNCP4(){

	var nRowrowCount = $("#NCP4nRow").val();
	if (nRowrowCount == "0") {
		alert("No Data in Nursing Care Plan");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#Page4deleteNCPCheck:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}

	var hiddenRowCount = $("#NCP4nRow").val();//$("#InvRowCount").val();
	var rowCount = hiddenRowCount;
	var addrowottCount = $("#addRowCountNCP4").val();
	
	var count = rowCount - addrowottCount;
	var totalRowCount = (Number(rowCount) + Number(addrowottCount));
	var p = 1;
	for ( var i = 0; i < (totalRowCount); i++) {
		var $radios = $('input:checkbox[name=Page4deleteNCPCheck' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#Page4idNcpRecord"+p).val();
			$("#RowCountNCPPage4" + p + "").remove();
			if(id != 0){
				deleteNCPPageRecord(id);
			}
		}
		p++;
	}; 
	
}



function deleteInvasiveSiteCareRecord(id){
	
	 var inputs = [];
		//inputs.push('action=deleteInvasiveSiteCareRecord');
		inputs.push('id=' + id);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/deleteInvasiveSiteCareRecord",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
		});
	
}

function deleteNursingCarePlanRecord(id){
	
	 var inputs = [];
		//inputs.push('action=deleteNursingCarePlanRecord');
		inputs.push('id=' + id);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/deleteNursingCarePlanRecord",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
		});
}


function deleteHandHygieneRecord(id){
	
	 var inputs = [];
		//inputs.push('action=deleteHandHygieneRecord');
		inputs.push('id=' + id);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/deleteHandHygieneRecord",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
		});
}


function deleteSASRecord(id){
	
	 var inputs = [];
		//inputs.push('action=deleteSASRecord');
		inputs.push('id=' + id);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/deleteSASRecord",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
		});
}


function deleteNCPPageRecord(id){
	
	 var inputs = [];
		inputs.push('action=deleteNCPPage4Record');
		inputs.push('id=' + id);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "IPDTreatmentServlet",
			url : "ehat/nursingstation/deleteNCPPage4Record",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
			}
		});
}

function setSkinAssessments(){
	
	var existingValues=$("#skinindicationTA").val();
	 var skinIndications = document.getElementsByClassName('skinIndication');
	  var count =0;
	  for(var i=0; skinIndications[i]; ++i){
	      if(skinIndications[i].checked){
	    	 count++;
	    	 var subString = skinIndications[i].value+" :-";
	    	  
	    	 if(!existingValues.includes(subString)){
	    		  existingValues = existingValues + skinIndications[i].value +" :- \n";
	    	  }   	  
	    	  if(count > 0){
				  $("#skinindicationDIV").show();
		    	  $("#skinindicationTA").val(existingValues);
		      }else{
		    	  $("#skinindicationDIV").hide();
		      }
	    	  
	      }
	      
	  }
	
}


/*Sufiyans Code end here*/


function saveNursingAssesment33(){


	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
	var idForintialass3 = $("#idForintialass3").val();
	
	var gasAppetite = $('input:checkbox[id=idGasAppetite]');
	if(gasAppetite.is(':checked') == true){
		gasAppetite = 1;
	}else{
		gasAppetite = 0;
	}
	var gasNausea = $('input:checkbox[id=idGasNausea]');
	if(gasNausea.is(':checked') == true){
		gasNausea = 1;
	}else{
		gasNausea = 0;
	}
	var gasVomiting = $('input:checkbox[id=idGasVomiting]');
	if(gasVomiting.is(':checked') == true){
		gasVomiting = 1;
	}else{
		gasVomiting = 0;
	}
	var gasDistension = $('input:checkbox[id=idGasDistension]');
	if(gasDistension.is(':checked') == true){
		gasDistension = 1;
	}else{
		gasDistension = 0;
	}
	var gasHeart = $('input:checkbox[id=idGasHeart]');
	if(gasHeart.is(':checked') == true){
		gasHeart = 1;
	}else{
		gasHeart = 0;
	}
	var gasFlatus = $('input:checkbox[id=idGasFlatus]');
	if(gasFlatus.is(':checked') == true){
		gasFlatus = 1;
	}else{
		gasFlatus = 0;
	}
	var gasPain = $('input:checkbox[id=idGasPain]');
	if(gasPain.is(':checked') == true){
		gasPain = 1;
	}else{
		gasPain = 0;
	}
	var gasRectal = $('input:checkbox[id=idGasRectal]');
	if(gasRectal.is(':checked') == true){
		gasRectal = 1;
	}else{
		gasRectal = 0;
	}
	var gasColostomy = $('input:checkbox[id=idGasColostomy]');
	if(gasColostomy.is(':checked') == true){
		gasColostomy = 1;
	}else{
		gasColostomy = 0;
	}
	var gasIlleostomy = $('input:checkbox[id=idGasIlleostomy]');
	if(gasIlleostomy.is(':checked') == true){
		gasIlleostomy = 1;
	}else{idForintialass3
		gasIlleostomy = 0;
	}
	// alert(gasAppetite+"="+gasNausea+"="+gasVomiting+"="+gasDistension+"="+gasHeart+"="+gasFlatus+"="+gasPain+"="+gasRectal+"="+gasColostomy+"="+gasIlleostomy);
	
	var urineColour = $("#idUrineColour").val();
	var urineFrequency = $("#idUrineFrequency").val();
	var urinePain = $('input:checkbox[id=idUrinePain]');
	if(urinePain.is(':checked') == true){
		urinePain = 1;
	}else{
		urinePain = 0;
	}
	var urineBurning = $('input:checkbox[id=idUrineBurning]');
	if(urineBurning.is(':checked') == true){
		urineBurning = 1;
	}else{
		urineBurning = 0;
	}
	var urineItching = $('input:checkbox[id=idUrineItching]');
	if(urineItching.is(':checked') == true){
		urineItching = 1;
	}else{
		urineItching = 0;
	}
	var urineUrgency = $('input:checkbox[id=idUrineUrgency]');
	if(urineUrgency.is(':checked') == true){
		urineUrgency = 1;
	}else{
		urineUrgency = 0;
	}
	var urineIncontinence = $('input:checkbox[id=idUrineIncontinence]');
	if(urineIncontinence.is(':checked') == true){
		urineIncontinence = 1;
	}else{
		urineIncontinence = 0;
	}
	var urineNocturia = $('input:checkbox[id=idUrineNocturia]');
	if(urineNocturia.is(':checked') == true){
		urineNocturia = 1;
	}else{
		urineNocturia = 0;
	}
	var urineUrostomy = $('input:checkbox[id=idUrineUrostomy]');
	if(urineUrostomy.is(':checked') == true){
		urineUrostomy = 1;
	}else{
		urineUrostomy = 0;
	}
	var urineHistory = $('input:checkbox[id=idUrineHistory]');
	if(urineHistory.is(':checked') == true){
		urineHistory = 1;
	}else{
		urineHistory = 0;
	}
	var urineHistoryUTI = $('input:checkbox[id=idUrineHistoryUTI]');
	if(urineHistoryUTI.is(':checked') == true){
		urineHistoryUTI = 1;
	}else{
		urineHistoryUTI = 0;
	}
	var urineFoley = $('input:checkbox[id=idUrineFoley]');
	if(urineFoley.is(':checked') == true){
		urineFoley = 1;
	}else{
		urineFoley = 0;
	}
	var urineInsertion = $("#idUrineInsertion").val();
	
	var musValSkin = $("input:radio[name='MusValSkin']:checked").val();
	if(musValSkin==undefined)
	{
		musValSkin = "0";
	}
	var musColour = $("#idMusColour").val();
	var musTingling = $('input:checkbox[id=idMusTingling]');
	if(musTingling.is(':checked') == true){
		musTingling = 1;
	}else{
		musTingling = 0;
	}
	var musWeakness = $('input:checkbox[id=idMusWeakness]');
	if(musWeakness.is(':checked') == true){
		musWeakness = 1;
	}else{
		musWeakness = 0;
	}
	var musDeformity = $('input:checkbox[id=idMusDeformity]');
	if(musDeformity.is(':checked') == true){
		musDeformity = 1;
	}else{
		musDeformity = 0;
	}
	var musPain = $('input:checkbox[id=idMusPain]');
	if(musPain.is(':checked') == true){
		musPain = 1;
	}else{
		musPain = 0;
	}
	var musStiffness = $('input:checkbox[id=idMusStiffness]');
	if(musStiffness.is(':checked') == true){
		musStiffness = 1;
	}else{
		musStiffness = 0;
	}
	var musValUses = $("input:radio[name='MusValUses']:checked").val();
	if(musValUses==undefined)
	{
		musValUses = "0";
	}
	var musOther = $("#idMusOther").val();
	// alert(musValSkin+"="+musColour+"="+musTingling+"="+musWeakness+"="+musDeformity+"="+musPain+"="+musStiffness+"="+musValUses+"="+musOther);
	
	var reproLMP = $("#idReproLMP").val();
	var reproMeno = $('input:checkbox[id=idReproMeno]');
	if(reproMeno.is(':checked') == true){
		reproMeno = 1;
	}else{
		reproMeno = 0;
	}
	var reproMenoDura = $("#idReproMenoDura").val();
	var reproDysme = $('input:checkbox[id=idReproDysme]');
	if(reproDysme.is(':checked') == true){
		reproDysme = 1;
	}else{
		reproDysme = 0;
	}
	var reproAmeno = $('input:checkbox[id=idReproAmeno]');
	if(reproAmeno.is(':checked') == true){
		reproAmeno = 1;
	}else{
		reproAmeno = 0;
	}
	var reproAmenoDura = $("#idReproAmenoDura").val();
	var reproVaginal = $('input:checkbox[id=idReproVaginal]');
	if(reproVaginal.is(':checked') == true){
		reproVaginal = 1;
	}else{
		reproVaginal = 0;
	}
	var reproItching = $('input:checkbox[id=idReproItching]');
	if(reproItching.is(':checked') == true){
		reproItching = 1;
	}else{
		reproItching = 0;
	}
	var reproOther = $("#idReproOther").val();
	// alert(reproLMP+"="+reproMeno+"="+reproMenoDura+"="+reproDysme+"="+reproAmeno+"="+reproAmenoDura+"="+reproVaginal+"="+reproItching+"="+reproOther);
	var cVSDiscomfort = $('input:checkbox[id=idCVSDiscomfort]');
	if(cVSDiscomfort.is(':checked') == true){
		cVSDiscomfort = 1;
	}else{
		cVSDiscomfort = 0;
	}
	var cVSOedema = $('input:checkbox[id=idCVSOedema]');
	if(cVSOedema.is(':checked') == true){
		cVSOedema = 1;
	}else{
		cVSOedema = 0;
	}
	var cVSOedemaLoca = $("#idCVSOedemaLoca").val();
	var cVSOther = $("#idCVSOther").val();
	// alert(cVSDiscomfort+"="+cVSOedema+"="+cVSOedemaLoca+"="+cVSOther);
	
	var breastFeeding = $('input:checkbox[id=idBreastFeeding]');
	if(breastFeeding.is(':checked') == true){
		breastFeeding = 1;
	}else{
		breastFeeding = 0;
	}
	var breastLumps = $('input:checkbox[id=idBreastLumps]');
	if(breastLumps.is(':checked') == true){
		breastLumps = 1;
	}else{
		breastLumps = 0;
	}
	var breastOther = $("#idBreastOther").val();
	// alert(breastFeeding+"="+breastLumps+"="+breastOther);
	var neurologiocal = $("input:radio[name='neurologiocal']:checked").val();
	if(neurologiocal==undefined)
	{
		neurologiocal = "0";
	}
	var neuPsych = $("#idNeuPsych").val();
	var neurologiocalPsy = $("input:radio[name='neurologiocalPsy']:checked").val();
	if(neurologiocalPsy==undefined)
	{
		neurologiocalPsy = "0";
	}
	var neuPupils = $("#idNeuPupils").val();
	var neuDeviation = $("#idNeuDeviation").val();
	var neurologiocalPupils = $("input:radio[name='neurologiocalPupils']:checked").val();
	if(neurologiocalPupils==undefined)
	{
		neurologiocalPupils = "0";
	}
	var neuAlert = $("input:radio[name='neuAlert']:checked").val();
	if(neuAlert==undefined)
	{
		neuAlert = "0";
	}
	var neuLOCOther = $("#idNeuLOCOther").val();
	var neuSpeech = $("input:radio[name='neuSpeech']:checked").val();
	if(neuSpeech==undefined)
	{
		neuSpeech = "0";
	}
	var neuGrips = $("#idNeuGrips").val();
	var neuFoot = $("#idNeuFoot").val();
	var neuGag = $("#idNeuGag").val();
	var neuOther = $("#idNeuOther").val();
	// alert(neurologiocal+"="+neuPsych+"="+neurologiocalPsy+"="+neuPupils+"="+neuDeviation+"="+neurologiocalPupils+"="+neuAlert+"="+neuLOCOther+"="+neuSpeech+"="+neuGrips+"="+neuFoot+"="+neuGag+"="+neuOther);
	var painAssess = $('input:checkbox[id=idPainAss]');
	if(painAssess.is(':checked') == true){
		painAssess = 1;
	}else{
		painAssess = 0;
	}
	var painAssLocation = $("#idPainAssLocation").val();
	var painAssDuration = $("#idPainAssDuration").val();
	var painAssessment = $("input:radio[name='painAssessment']:checked").val();
	if(painAssessment==undefined)
	{
		painAssessment = "0";
	}
	var exaFactor = $("#idExaFactor").val();
	var painRelivering = $("input:radio[name='painRelivering']:checked").val();
	if(painRelivering==undefined)
	{
		painRelivering = "0";
	}
	var dailyRoutine = $("input:radio[name='dailyRoutine']:checked").val();
	if(dailyRoutine==undefined)
	{
		dailyRoutine = "0";
	}
	var sleep = $("input:radio[name='sleep']:checked").val();
	if(sleep==undefined)
	{
		sleep = "0";
	}
	var painCauses = $("#idPainCauses").val();
	var plans = $("#idPlans").val();
	var painScale = $("#idPainScale").val();

	
	 var Nursingobj03 = {
			 nursingthreelist : []
	        };
	  Nursingobj03.nursingthreelist.push({
	    	pId:pId1,
	    	tId : tId,
	    	idNursingInitialAssessmentThree: idForintialass3,
	    	gasAppetite: gasAppetite,
			gasNausea: gasNausea,
			gasVomiting: gasVomiting,
			gasDistension: gasDistension,
			gasHeart: gasHeart,
			gasFlatus: gasFlatus,
			gasPain: gasPain,
			gasRectal: gasRectal,
			gasColostomy: gasColostomy,
			gasIlleostomy: gasIlleostomy,
			urineColour: urineColour,
			urineFrequency: urineFrequency,
			urinePain: urinePain,
			urineBurning: urineBurning,
			urineItching: urineItching,
			urineUrgency: urineUrgency,
			urineIncontinence: urineIncontinence,
			urineNocturia: urineNocturia,
			urineUrostomy: urineUrostomy,
			urineHistory: urineHistory,
			urineHistoryUTI: urineHistoryUTI,
			urineFoley: urineFoley,
			urineInsertion: urineInsertion,
			musValSkin: musValSkin,
			musColour: musColour,
			musTingling: musTingling,
			musWeakness: musWeakness,
			musDeformity: musDeformity,
			musPain: musPain,
			musStiffness: musStiffness,
			musValUses: musValUses,
			musOther: musOther,
			reproLMP: reproLMP,
			reproMeno: reproMeno,
			reproMenoDura: reproMenoDura,
			reproDysme: reproDysme,
			reproAmeno: reproAmeno,
			reproAmenoDura: reproAmenoDura,
			reproVaginal: reproVaginal,
			reproItching: reproItching,
			reproOther: reproOther,
			cVSDiscomfort: cVSDiscomfort,
			cVSOedema: cVSOedema,
			cVSOedemaLoca: cVSOedemaLoca,
			cVSOther: cVSOther,
			breastFeeding: breastFeeding,
			breastLumps: breastLumps,
			breastOther: breastOther,
			neurologiocal: neurologiocal,
			neuPsych: neuPsych,
			neurologiocalPsy: neurologiocalPsy,
			neuPupils: neuPupils,
			neuDeviation: neuDeviation,
			neurologiocalPupils: neurologiocalPupils,
			neuAlert: neuAlert,
			neuLOCOther: neuLOCOther,
			neuSpeech: neuSpeech,
			neuGrips: neuGrips,
			neuFoot: neuFoot,
			neuGag: neuGag,
			neuOther: neuOther,
			painAssess: painAssess,
			painAssLocation: painAssLocation,
			painAssDuration: painAssDuration,
			painAssessment: painAssessment,
			exaFactor: exaFactor,
			painRelivering: painRelivering,
			dailyRoutine: dailyRoutine,
			sleep: sleep,
			painCauses: painCauses,
			plans: plans,
			painScale: painScale
		
			});
	    
	  Nursingobj03 = JSON.stringify(Nursingobj03);
	    var inputs = [];
	    inputs.push('Nursingobj03=' + Nursingobj03);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/saveNursingAssessment03",
	
			success : function(response) {
				alert(response);
				fetchNursingAssesment34();
			}
		});
}


function fetchNursingAssesment34(){


	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var inputs = [];
		inputs.push('pId=' + pId1);
		inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/nursingstation/NursingA3fetch",
			
			
			success : function(response) {
				
				$("#idForintialass3").val(response.nursingthreelist[0].idNursingInitialAssessmentThree);
				
				if(response.nursingthreelist[0].gasAppetite=="1"){
					$("#idGasAppetite").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasNausea=="1"){
					$("#idGasNausea").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasVomiting=="1"){
					$("#idGasVomiting").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasDistension=="1"){
					$("#idGasDistension").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasHeart=="1"){
					$("#idGasHeart").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasFlatus=="1"){
					$("#idGasFlatus").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasPain=="1"){
					$("#idGasPain").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasRectal=="1"){
					$("#idGasRectal").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasColostomy=="1"){
					$("#idGasColostomy").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].gasIlleostomy=="1"){
					$("#idGasIlleostomy").prop("checked", "checked");
				}
				$("#idUrineColour").val(response.nursingthreelist[0].urineColour);
				$("#idUrineFrequency").val(response.nursingthreelist[0].urineFrequency);
				if(response.nursingthreelist[0].urinePain=="1"){
					$("#idUrinePain").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineBurning=="1"){
					$("#idUrineBurning").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineItching=="1"){
					$("#idUrineItching").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineUrgency=="1"){
					$("#idUrineUrgency").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineIncontinence=="1"){
					$("#idUrineIncontinence").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineNocturia=="1"){
					$("#idUrineNocturia").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineUrostomy=="1"){
					$("#idUrineUrostomy").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineHistory=="1"){
					$("#idUrineHistory").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineHistoryUTI=="1"){
					$("#idUrineHistoryUTI").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].urineFoley=="1"){
					$("#idUrineFoley").prop("checked", "checked");
				}
				$("#idUrineInsertion").val(response.nursingthreelist[0].urineInsertion);
				if(response.nursingthreelist[0].musValSkin=="warm"){
					$("#idMusWarm").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValSkin=="cool"){
					$("#idMusCool").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValSkin=="dry"){
					$("#idMusDry").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValSkin=="firm"){
					$("#idMusFirm").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValSkin=="flaccid"){
					$("#idMusFlaccid").prop("checked", "checked");
				}
				$("#idMusColour").val(response.nursingthreelist[0].musColour);
				if(response.nursingthreelist[0].musTingling=="1"){
					$("#idMusTingling").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musWeakness=="1"){
					$("#idMusWeakness").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musDeformity=="1"){
					$("#idMusDeformity").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musPain=="1"){
					$("#idMusPain").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musStiffness=="1"){
					$("#idMusStiffness").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValUses=="walker"){
					$("#idMusWalker").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValUses=="wheelchair"){
					$("#idMusWheelChair").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValUses=="cane"){
					$("#idMusCane").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].musValUses=="none"){
					$("#idMusNone").prop("checked", "checked");
				}
				$("#idMusOther").val(response.nursingthreelist[0].musOther);
				$("#idReproLMP").val(response.nursingthreelist[0].reproLMP);
				if(response.nursingthreelist[0].reproMeno=="1"){
					$("#idReproMeno").prop("checked", "checked");
				}
				$("#idReproMenoDura").val(response.nursingthreelist[0].reproMenoDura);
				if(response.nursingthreelist[0].reproDysme=="1"){
					$("#idReproDysme").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].reproAmeno=="1"){
					$("#idReproAmeno").prop("checked", "checked");
				}
				$("#idReproAmenoDura").val(response.nursingthreelist[0].reproAmenoDura);
				if(response.nursingthreelist[0].reproVaginal=="1"){
					$("#idReproVaginal").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].reproItching=="1"){
					$("#idReproItching").prop("checked", "checked");
				}
				$("#idReproOther").val(response.nursingthreelist[0].reproOther);
				if(response.nursingthreelist[0].cVSDiscomfort=="1"){
					$("#idCVSDiscomfort").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].cVSOedema=="1"){
					$("#idCVSOedema").prop("checked", "checked");
				}
				$("#idCVSOedemaLoca").val(response.nursingthreelist[0].cVSOedemaLoca);
				$("#idCVSOther").val(response.nursingthreelist[0].cVSOther);
				if(response.nursingthreelist[0].breastFeeding=="1"){
					$("#idBreastFeeding").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].breastLumps=="1"){
					$("#idBreastLumps").prop("checked", "checked");
				}
				$("#idBreastOther").val(response.nursingthreelist[0].breastOther);
				if(response.nursingthreelist[0].neurologiocal=="cooperative"){
					$("#idNeuCoop").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="memoryChanges"){
					$("#idNeuMemory").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="dizzing"){
					$("#idNeuDizzing").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="synocope"){
					$("#idNeuSynocope").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="seizure"){
					$("#idNeuSeizure").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="paralysis"){
					$("#paralysis").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="headache"){
					$("#idNeuHead").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="anxity"){
					$("#idNeuAnxity").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="depression"){
					$("#idNeuDepre").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocal=="suicidalAttempt"){
					$("#idNeuSuicide").prop("checked", "checked");
				}
				$("#idNeuPsych").val(response.nursingthreelist[0].neuPsych);
				if(response.nursingthreelist[0].neurologiocalPsy=="person"){
					$("#idNeuOriPer").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocalPsy=="time"){
					$("#idNeuOriTime").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocalPsy=="place"){
					$("#idNeuOriPlace").prop("checked", "checked");
				}
				$("#idNeuPupils").val(response.nursingthreelist[0].neuPupils);
				$("#idNeuDeviation").val(response.nursingthreelist[0].neuDeviation);
				if(response.nursingthreelist[0].neurologiocalPupils=="brisk"){
					$("#idNeuOriBrisk").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocalPupils=="sluggish"){
					$("#idNeuOriSluggish").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neurologiocalPupils=="noResponce"){
					$("#idNeuOriNoResp").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuAlert=="alert"){
					$("#idNeuLOCAlert").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuAlert=="confused"){
					$("#idNeuLOCConfused").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuAlert=="sedated"){
					$("#idNeuLOCSedated").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuAlert=="somnolent"){
					$("#idNeuLOCSomnolent").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuAlert=="comatose"){
					$("#idNeuLOCComatose").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuAlert=="agitated"){
					$("#idNeuLOCAgitated").prop("checked", "checked");
				}
				$("#idNeuLOCOther").val(response.nursingthreelist[0].neuLOCOther);
				if(response.nursingthreelist[0].neuSpeech=="clear"){
					$("#idNeuSpeechClear").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuSpeech=="sturred"){
					$("#idNeuLOCSturred").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuSpeech=="aphasic"){
					$("#idNeuLOCAphasic").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuSpeech=="dysphasia"){
					$("#idNeuLOCDysphasia").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].neuSpeech=="none"){
					$("#idNeuLOCNone").prop("checked", "checked");
				}
				$("#idNeuGrips").val(response.nursingthreelist[0].neuGrips);
				$("#idNeuFoot").val(response.nursingthreelist[0].neuFoot);
				$("#idNeuGag").val(response.nursingthreelist[0].neuGag);
				$("#idNeuOther").val(response.nursingthreelist[0].neuOther);
				if(response.nursingthreelist[0].painAssess=="1"){
					$("#idPainAss").prop("checked", "checked");
				}
				$("#idPainAssLocation").val(response.nursingthreelist[0].painAssLocation);
				$("#idPainAssDuration").val(response.nursingthreelist[0].painAssDuration);
				if(response.nursingthreelist[0].painAssessment=="quality"){
					$("#idPainAssQlty").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painAssessment=="constant"){
					$("#idPainAssConst").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painAssessment=="intermittent"){
					$("#idPainAssInter").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painAssessment=="character"){
					$("#idPainAssChara").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painAssessment=="lacerating"){
					$("#idPainAssLacer").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painAssessment=="burning"){
					$("#idPainAssBurn").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painAssessment=="rediating"){
					$("#idPainAssRedi").prop("checked", "checked");
				}
				$("#idExaFactor").val(response.nursingthreelist[0].exaFactor);
				if(response.nursingthreelist[0].painRelivering=="rest"){
					$("#idReliveringFactor").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painRelivering=="medication"){
					$("#idReliveringMedication").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].painRelivering=="other"){
					$("#idReliveringOther").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].dailyRoutine=="yes"){
					$("#idRoutineYes").prop("checked", "checked");
				}else{
					$("#idRoutineNo").prop("checked", "checked");
				}
				if(response.nursingthreelist[0].sleep=="yes"){
					$("#idSleepYes").prop("checked", "checked");
				}else{
					$("#idSleepNo").prop("checked", "checked");
				}
				$("#idPainCauses").val(response.nursingthreelist[0].painCauses);
				$("#idPlans").val(response.nursingthreelist[0].plans);
				$("#idPainScale").val(response.nursingthreelist[0].painScale);
			}
		});
}



function saveNursingOneDay(){
	
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var idForOneDay = $("#idForOneDay").val();
    var Date1 =$("#date-pickForOneDay").val();
    var Time1 =$("#TimeForOneDay").val();
    var chkIdBandOneDay = $('input:checkbox[id=chkIdBandOneDay]');
    var chkCallBell = $('input:checkbox[id=chkCallBell]');
    var txtHt =$("#txtHt").val();
    var txtWt =$("#txtWt").val();
    var ModeOneDay = $("input:radio[name='ModeOneDay']:checked").val();
    if(ModeOneDay==undefined)
    	{
    	ModeOneDay = "0";

    	}
    var AdmittedOneDay = $("input:radio[name='AdmittedOneDay']:checked").val();
    if(AdmittedOneDay==undefined)
	{
    	AdmittedOneDay = "0";
	}
    var infromationOneDay = $("input:radio[name='infromationOneDay']:checked").val();
    if(infromationOneDay==undefined)
	{
    	infromationOneDay = "0";
	}
    var txtAreaEmergencyCallOneDay =$("#txtAreaEmergencyCallOneDay").val();
    var TempratureOneDay =$("#TempratureOneDay").val();
    var PulseOneDay =$("#PulseOneDay").val();
    var RROneDay =$("#RROneDay").val();
    var SpO2OneDay =$("#SpO2OneDay").val();
    var BloodpOneDay =$("#BloodpOneDay").val();
    var txtAdmittingOneDay =$("#txtAdmittingOneDay").val();
    var txtCheifComplainOneDay =$("#txtCheifComplainOneDay").val();
    var AllergiesOneDay = $("input:radio[name='AllergiesOneDay']:checked").val();
    if(AllergiesOneDay==undefined)
	{
    	AllergiesOneDay = "0";
	}
    var cateOneDay1 = $('input:checkbox[id=cateOneDay1]');
    var careOneDay1 = $('input:checkbox[id=careOneDay1]');
    var cateOneDay2 = $('input:checkbox[id=cateOneDay2]');
    var careOneDay2 = $('input:checkbox[id=careOneDay2]');
    var cateOneDay3 = $('input:checkbox[id=cateOneDay3]');
    var careOneDay3 = $('input:checkbox[id=careOneDay3]');
    var cateOneDay4 = $('input:checkbox[id=cateOneDay4]');
    var careOneDay4 = $('input:checkbox[id=careOneDay4]');
    var cateOneDay5 = $('input:checkbox[id=cateOneDay5]');
    var careOneDay5 = $('input:checkbox[id=careOneDay5]');
    var Infiltration01OneDay = $('input:checkbox[id=Infiltration01OneDay]');
    var Infiltration02OneDay = $('input:checkbox[id=Infiltration02OneDay]');
    var Infiltration03OneDay = $('input:checkbox[id=Infiltration03OneDay]');
    var Infiltration04OneDay = $('input:checkbox[id=Infiltration04OneDay]');
    var Infiltration05OneDay = $('input:checkbox[id=Infiltration05OneDay]');
    var Infiltration06OneDay = $('input:checkbox[id=Infiltration06OneDay]');
    var Swelling01OneDay = $('input:checkbox[id=Swelling01OneDay]');
    var Swelling02OneDay = $('input:checkbox[id=Swelling02OneDay]');
    var Swelling03OneDay = $('input:checkbox[id=Swelling03OneDay]');
    var Swelling04OneDay = $('input:checkbox[id=Swelling04OneDay]');
    var Swelling05OneDay = $('input:checkbox[id=Swelling05OneDay]');
    var Swelling06OneDay = $('input:checkbox[id=Swelling06OneDay]');
    var Redness01OneDay = $('input:checkbox[id=Redness01OneDay]');
    var Redness02OneDay = $('input:checkbox[id=Redness02OneDay]');
    var Redness03OneDay = $('input:checkbox[id=Redness03OneDay]');
    var Redness04OneDay = $('input:checkbox[id=Redness04OneDay]');
    var Redness05OneDay = $('input:checkbox[id=Redness05OneDay]');
    var Redness06OneDay = $('input:checkbox[id=Redness06OneDay]');
    var Pain01OneDay = $('input:checkbox[id=Pain01OneDay]');
    var Pain02OneDay = $('input:checkbox[id=Pain02OneDay]');
    var Pain03OneDay = $('input:checkbox[id=Pain03OneDay]');
    var Pain04OneDay = $('input:checkbox[id=Pain04OneDay]');
    var Pain05OneDay = $('input:checkbox[id=Pain05OneDay]');
    var Pain06OneDay = $('input:checkbox[id=Pain06OneDay]');
    var Thrombophlebitis1OneDay = $('input:checkbox[id=Thrombophlebitis1OneDay]');
    var Thrombophlebitis2OneDay = $('input:checkbox[id=Thrombophlebitis2OneDay]');
    var Thrombophlebitis3OneDay = $('input:checkbox[id=Thrombophlebitis3OneDay]');
    var VulnerabilityLevelOneDay = $("input:radio[name='VulnerabilityLevelOneDay']:checked").val();
    if(VulnerabilityLevelOneDay==undefined)
	{
    	VulnerabilityLevelOneDay = "0";
	}
    var datePickForIvAssessmentOneDay =$("#date-pickForIvAssessmentOneDay").val();
    var guageOneDay =$("#guageOneDay").val();
    var VenflonOneDay =$("#VenflonOneDay").val();
    var ChangeOnOneDay =$("#ChangeOnOneDay").val();
    var SiteOneDay =$("#SiteOneDay").val();
    var Time01OneDay =$("#Time01OneDay").val();
    var Time02OneDay =$("#Time02OneDay").val();
    var Time03OneDay =$("#Time03OneDay").val();
    var Thrombophlebitis4OneDay = $('input:checkbox[id=Thrombophlebitis4OneDay]');
    var Thrombophlebitis5OneDay = $('input:checkbox[id=Thrombophlebitis5OneDay]');
    var Thrombophlebitis6OneDay = $('input:checkbox[id=Thrombophlebitis6OneDay]');
    var idPainScaleOneDay =$("#idPainScaleOneDay").val();
    
    /*var Time001OneDay =$("#Time001OneDay").val();
    var Time002OneDay =$("#Time002OneDay").val();
    var Time003OneDay =$("#Time003OneDay").val();
    var Time004OneDay =$("#Time003OneDay").val();
    var Temp001OneDay =$("#Temp001OneDay").val();
    var Temp002OneDay =$("#Temp002OneDay").val();
    var Temp003OneDay =$("#Temp003OneDay").val();
    var Temp004OneDay =$("#Temp004OneDay").val();
    var Pulse001OneDay =$("#Pulse001OneDay").val();
    var Pulse002OneDay =$("#Pulse002OneDay").val();
    var Pulse003OneDay =$("#Pulse003OneDay").val();
    var Pulse004OneDay =$("#Pulse004OneDay").val();
    var RR001OneDay =$("#RR001OneDay").val();
    var RR002OneDay =$("#RR002OneDay").val();
    var RR003OneDay =$("#RR003OneDay").val();
    var RR004OneDay =$("#RR004OneDay").val();
    var BP001OneDay =$("#BP001OneDay").val();
    var BP002OneDay =$("#BP002OneDay").val();
    var BP003OneDay =$("#BP003OneDay").val();
    var BP004OneDay =$("#BP004OneDay").val();
    var Pain001OneDay =$("#Pain001OneDay").val();
    var Pain002OneDay =$("#Pain002OneDay").val();
    var Pain003OneDay =$("#Pain003OneDay").val();
    var Pain004OneDay =$("#Pain004OneDay").val();*/
    
    var reAssessmentList = [];
    var reAssCount = $("#reAssessmentRow").val();
    
    for(var i =1;i<= reAssCount;i++){
    	var reAssessmentId = $("#reAssessmentId"+i).val();

    	if (reAssessmentId == undefined)
    		continue;
    	
    	var reAssessmentTime = $("#TimeOneDay"+i).val();
    	var reAssessmentTemp = $("#TempOneDay"+i).val();
    	var reAssessmentPulse = $("#PulseOneDay"+i).val();
    	var reAssessmentRR = $("#RROneDay"+i).val();
    	var reAssessmentBP = $("#BPOneDay"+i).val();
    	var reAssessmentPain = $("#PainOneDay"+i).val();
    	
    	reAssessmentList.push({
    		reAssessmentId : reAssessmentId,
    		reAssessmentTime : reAssessmentTime,
    		reAssessmentTemp :reAssessmentTemp,
    		reAssessmentPulse : reAssessmentPulse,
    		reAssessmentRR : reAssessmentRR,
    		reAssessmentBP : reAssessmentBP,
    		reAssessmentPain : reAssessmentPain
    	});
    }

     var Assessment01OneDay =$("#Assessment01OneDay").val();
    var Assessment02OneDay =$("#Assessment02OneDay").val();
    var Assessment03OneDay =$("#Assessment03OneDay").val();
    var Assessment04OneDay =$("#Assessment04OneDay").val();
    var Diagnosis01OneDay =$("#Diagnosis01OneDay").val();
    var Diagnosis02OneDay =$("#Diagnosis02OneDay").val();
    var Diagnosis03OneDay =$("#Diagnosis03OneDay").val();
    var Diagnosis04OneDay =$("#Diagnosis04OneDay").val();
    var Planning01OneDay =$("#Planning01OneDay").val();
    var Planning02OneDay =$("#Planning02OneDay").val();
    var Planning03OneDay =$("#Planning03OneDay").val();
    var Planning04OneDay =$("#Planning04OneDay").val();
    var Intervention01OneDay =$("#Intervention01OneDay").val();
    var Intervention02OneDay =$("#Intervention02OneDay").val();
    var Intervention03OneDay =$("#Intervention03OneDay").val();
    var Intervention04OneDay =$("#Intervention04OneDay").val();
    
    var Evaluation01OneDay =$("#Evaluation01OneDay").val();
    var Evaluation02OneDay =$("#Evaluation02OneDay").val();
    var Evaluation03OneDay =$("#Evaluation03OneDay").val();
    var Evaluation04OneDay =$("#Evaluation04OneDay").val();
    var Shift004OneDay =$("#Shift004OneDay").val();
    if(chkIdBandOneDay.is(':checked') == true){
    	chkIdBandOneDay = 1;
    }else{
    	chkIdBandOneDay = 0;
    }
    
    if(chkCallBell.is(':checked') == true){
    	chkCallBell = 1;
    }else{
    	chkCallBell = 0;
    }
    if(cateOneDay1.is(':checked') == true){
    	cateOneDay1 = 1;
    }else{
    	cateOneDay1 = 0;
    }
    if(careOneDay1.is(':checked') == true){
    	careOneDay1 = 1;
    }else{
    	careOneDay1 = 0;
    }
    if(cateOneDay2.is(':checked') == true){
    	cateOneDay2 = 1;
    }else{
    	cateOneDay2 = 0;
    }
    if(careOneDay2.is(':checked') == true){
    	careOneDay2 = 1;
    }else{
    	careOneDay2 = 0;
    }
    if(cateOneDay3.is(':checked') == true){
    	cateOneDay3 = 1;
    }else{
    	cateOneDay3 = 0;
    }
    if(careOneDay3.is(':checked') == true){
    	careOneDay3 = 1;
    }else{
    	careOneDay3 = 0;
    }
    if(cateOneDay4.is(':checked') == true){
    	cateOneDay4 = 1;
    }else{
    	cateOneDay4 = 0;
    }
    if(careOneDay4.is(':checked') == true){
    	careOneDay4 = 1;
    }else{
    	careOneDay4 = 0;
    }
    if(cateOneDay5.is(':checked') == true){
    	cateOneDay5 = 1;
    }else{
    	cateOneDay5 = 0;
    }
    if(careOneDay5.is(':checked') == true){
    	careOneDay5 = 1;
    }else{
    	careOneDay5 = 0;
    }
    if(Infiltration01OneDay.is(':checked') == true){
    	Infiltration01OneDay = 1;
    }else{
    	Infiltration01OneDay = 0;
    }
    if(Infiltration02OneDay.is(':checked') == true){
    	Infiltration02OneDay = 1;
    }else{
    	Infiltration02OneDay = 0;
    }
    if(Infiltration03OneDay.is(':checked') == true){
    	Infiltration03OneDay = 1;
    }else{
    	Infiltration03OneDay = 0;
    }
    if(Infiltration04OneDay.is(':checked') == true){
    	Infiltration04OneDay = 1;
    }else{
    	Infiltration04OneDay = 0;
    }
    if(Infiltration05OneDay.is(':checked') == true){
    	Infiltration05OneDay = 1;
    }else{
    	Infiltration05OneDay = 0;
    }
    if(Infiltration06OneDay.is(':checked') == true){
    	Infiltration06OneDay = 1;
    }else{
    	Infiltration06OneDay = 0;
    }
    if(Swelling01OneDay.is(':checked') == true){
    	Swelling01OneDay = 1;
    }else{
    	Swelling01OneDay = 0;
    }
    if(Swelling02OneDay.is(':checked') == true){
    	Swelling02OneDay = 1;
    }else{
    	Swelling02OneDay = 0;
    }
    if(Swelling03OneDay.is(':checked') == true){
    	Swelling03OneDay = 1;
    }else{
    	Swelling03OneDay = 0;
    }
    if(Swelling04OneDay.is(':checked') == true){
    	Swelling04OneDay = 1;
    }else{
    	Swelling04OneDay = 0;
    }
    if(Swelling05OneDay.is(':checked') == true){
    	Swelling05OneDay = 1;
    }else{
    	Swelling05OneDay = 0;
    }
    if(Swelling06OneDay.is(':checked') == true){
    	Swelling06OneDay = 1;
    }else{
    	Swelling06OneDay = 0;
    }
    if(Redness01OneDay.is(':checked') == true){
    	Redness01OneDay = 1;
    }else{
    	Redness01OneDay = 0;
    }
    if(Redness02OneDay.is(':checked') == true){
    	Redness02OneDay = 1;
    }else{
    	Redness02OneDay = 0;
    }
    if(Redness03OneDay.is(':checked') == true){
    	Redness03OneDay = 1;
    }else{
    	Redness03OneDay = 0;
    }
    if(Redness04OneDay.is(':checked') == true){
    	Redness04OneDay = 1;
    }else{
    	Redness04OneDay = 0;
    }
    if(Redness05OneDay.is(':checked') == true){
    	Redness05OneDay = 1;
    }else{
    	Redness05OneDay = 0;
    }
    if(Redness06OneDay.is(':checked') == true){
    	Redness06OneDay = 1;
    }else{
    	Redness06OneDay = 0;
    }
    if(Pain01OneDay.is(':checked') == true){
    	Pain01OneDay = 1;
    }else{
    	Pain01OneDay = 0;
    }
    if(Pain02OneDay.is(':checked') == true){
    	Pain02OneDay = 1;
    }else{
    	Pain02OneDay = 0;
    }
    if(Pain03OneDay.is(':checked') == true){
    	Pain03OneDay = 1;
    }else{
    	Pain03OneDay = 0;
    }
    if(Pain04OneDay.is(':checked') == true){
    	Pain04OneDay = 1;
    }else{
    	Pain04OneDay = 0;
    }
    if(Pain05OneDay.is(':checked') == true){
    	Pain05OneDay = 1;
    }else{
    	Pain05OneDay = 0;
    }
    if(Pain06OneDay.is(':checked') == true){
    	Pain06OneDay = 1;
    }else{
    	Pain06OneDay = 0;
    }
    if(Thrombophlebitis1OneDay.is(':checked') == true){
    	Thrombophlebitis1OneDay = 1;
    }else{
    	Thrombophlebitis1OneDay = 0;
    }
    if(Thrombophlebitis2OneDay.is(':checked') == true){
    	Thrombophlebitis2OneDay = 1;
    }else{
    	Thrombophlebitis2OneDay = 0;
    }
    if(Thrombophlebitis3OneDay.is(':checked') == true){
    	Thrombophlebitis3OneDay = 1;
    }else{
    	Thrombophlebitis3OneDay = 0;
    }
    if(Thrombophlebitis4OneDay.is(':checked') == true){
    	Thrombophlebitis4OneDay = 1;
    }else{
    	Thrombophlebitis4OneDay = 0;
    }
    if(Thrombophlebitis5OneDay.is(':checked') == true){
    	Thrombophlebitis5OneDay = 1;
    }else{
    	Thrombophlebitis5OneDay = 0;
    }
    if(Thrombophlebitis6OneDay.is(':checked') == true){
    	Thrombophlebitis6OneDay = 1;
    }else{
    	Thrombophlebitis6OneDay = 0;
    }
    
    var OtData= "";
    var addRowCountOt = $("#OtRow").val();
    for(var i=1;i<=addRowCountOt;i++){
    	
    	var timeoT = "";
    	var iVoT ="";
    	var amtoT ="";
    	var urineoT ="";
    	var oTId ="";
    	
    	timeoT =$("#oToTime"+i).val();
    	iVoT =$("#oTIv"+i).val();
    	amtoT =$("#oTAmt"+i).val();
    	urineoT =$("#oTUrine"+i).val();
    	oTId =$("#oTId"+i).val();
    	if((timeoT != "" && iVoT != "" && amtoT != "" && urineoT != "" )&&(
    			timeoT != undefined && iVoT != undefined && amtoT !=undefined && urineoT != undefined ))
    	{
    		OtData = OtData+ timeoT+"_"+iVoT+"_"+amtoT+"_"+urineoT+"_"+oTId+"#";
    	}
    	
    }
    
    
    var OneDayDetails = {
    		listOneDay : []
        };
    OneDayDetails.listOneDay.push({
    	pId:pId1,
    	tId : tId,
    	idnursing_assessment_one_day : idForOneDay,
    	date1 : Date1,
    	time1: Time1,
        chkIdBandOneDay: chkIdBandOneDay,
        chkCallBell: chkCallBell,
        txtHt: txtHt,
        txtWt: txtWt,
        modeOneDay: ModeOneDay,
        admittedOneDay: AdmittedOneDay,
        infromationOneDay: infromationOneDay,
        txtAreaEmergencyCallOneDay: txtAreaEmergencyCallOneDay,
        tempratureOneDay: TempratureOneDay,
        pulseOneDay: PulseOneDay,
        rROneDay: RROneDay,
        spO2OneDay: SpO2OneDay,
        bloodpOneDay: BloodpOneDay,
        txtAdmittingOneDay: txtAdmittingOneDay,
        txtCheifComplainOneDay: txtCheifComplainOneDay,
        allergiesOneDay: AllergiesOneDay,
        cateOneDay1: cateOneDay1,
        careOneDay1: careOneDay1,
        cateOneDay2: cateOneDay2,
        careOneDay2: careOneDay2,
        cateOneDay3: cateOneDay3,
        careOneDay3: careOneDay3,
        cateOneDay4: cateOneDay4,
        careOneDay4: careOneDay4,
        cateOneDay5: cateOneDay5,
        careOneDay5: careOneDay5,
        infiltration01OneDay: Infiltration01OneDay,
        infiltration02OneDay: Infiltration02OneDay,
        infiltration03OneDay: Infiltration03OneDay,
        infiltration04OneDay: Infiltration04OneDay,
        infiltration05OneDay: Infiltration05OneDay,
        infiltration06OneDay: Infiltration06OneDay,
        swelling01OneDay: Swelling01OneDay,
        swelling02OneDay: Swelling02OneDay,
        swelling03OneDay: Swelling03OneDay,
        swelling04OneDay: Swelling04OneDay,
        swelling05OneDay: Swelling05OneDay,
        swelling06OneDay: Swelling06OneDay,
        redness01OneDay: Redness01OneDay,
        redness02OneDay: Redness02OneDay,
        redness03OneDay: Redness03OneDay,
        redness04OneDay: Redness04OneDay,
        redness05OneDay: Redness05OneDay,
        redness06OneDay: Redness06OneDay,
        pain01OneDay: Pain01OneDay,
        pain02OneDay: Pain02OneDay,
        pain03OneDay: Pain03OneDay,
        pain04OneDay: Pain04OneDay,
        pain05OneDay: Pain05OneDay,
        pain06OneDay: Pain06OneDay,
        thrombophlebitis1OneDay: Thrombophlebitis1OneDay,
        thrombophlebitis2OneDay: Thrombophlebitis2OneDay,
        thrombophlebitis3OneDay: Thrombophlebitis3OneDay,
        thrombophlebitis4OneDay: Thrombophlebitis4OneDay,
        thrombophlebitis5OneDay: Thrombophlebitis5OneDay,
        thrombophlebitis6OneDay: Thrombophlebitis6OneDay,
        vulnerabilityLevelOneDay: VulnerabilityLevelOneDay,
        datePickForIvAssessmentOneDay: datePickForIvAssessmentOneDay,
        guageOneDay: guageOneDay,
        venflonOneDay: VenflonOneDay,
        changeOnOneDay: ChangeOnOneDay,
        siteOneDay: SiteOneDay,
        time01OneDay: Time01OneDay,
        time02OneDay: Time02OneDay,
        time03OneDay: Time03OneDay,
        idPainScaleOneDay: idPainScaleOneDay,
      /*  time001OneDay: Time001OneDay,
        time002OneDay: Time002OneDay,
        time003OneDay: Time003OneDay,
        time004OneDay: Time004OneDay,
        temp001OneDay: Temp001OneDay,
        temp002OneDay: Temp002OneDay,
        temp003OneDay: Temp003OneDay,
        temp004OneDay: Temp004OneDay,
        pulse001OneDay: Pulse001OneDay,
        pulse002OneDay: Pulse002OneDay,
        pulse003OneDay: Pulse003OneDay,
        pulse004OneDay: Pulse004OneDay,
        rR001OneDay: RR001OneDay,
        rR002OneDay: RR002OneDay,
        rR003OneDay: RR003OneDay,
        rR004OneDay: RR004OneDay,
        bP001OneDay: BP001OneDay,
        bP002OneDay: BP002OneDay,
        bP003OneDay: BP003OneDay,
        bP004OneDay: BP004OneDay,
        pain001OneDay: Pain001OneDay,
        pain002OneDay: Pain002OneDay,
        pain003OneDay: Pain003OneDay,
        pain004OneDay: Pain004OneDay,*/
        
        reAssessmentList: reAssessmentList,
        assessment01OneDay: Assessment01OneDay,
        assessment02OneDay: Assessment02OneDay,
        assessment03OneDay: Assessment03OneDay,
        assessment04OneDay: Assessment04OneDay,
        diagnosis01OneDay: Diagnosis01OneDay,
        diagnosis02OneDay: Diagnosis02OneDay,
        diagnosis03OneDay: Diagnosis03OneDay,
        diagnosis04OneDay: Diagnosis04OneDay,
        planning01OneDay: Planning01OneDay,
        planning02OneDay: Planning02OneDay,
        planning03OneDay: Planning03OneDay,
        planning04OneDay: Planning04OneDay,
        intervention01OneDay: Intervention01OneDay,
        intervention02OneDay: Intervention02OneDay,
        intervention03OneDay: Intervention03OneDay,
        intervention04OneDay: Intervention04OneDay,
        evaluation01OneDay: Evaluation01OneDay,
        evaluation02OneDay: Evaluation02OneDay,
        evaluation03OneDay: Evaluation03OneDay,
        evaluation04OneDay: Evaluation04OneDay,
        shift004OneDay: Shift004OneDay,
        otData: OtData
    });
    
    OneDayDetails = JSON.stringify(OneDayDetails);
    var inputs = [];
    inputs.push('OneDayDetails=' + OneDayDetails);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/saveAssessmentOneDay",
	
		success : function(r) {
			alert(r);
			fetchInitalNursingAssessmentOneDay();
		}	
	});
}



function fetchInitalNursingAssessmentOneDay(){
	
	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
    var inputs = [];
    inputs.push('pId=' + patId);
    inputs.push('tId=' + treatId);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/fetchAssessmentOneDay",
	
	
			success : function(response) {
				$("#idForOneDay").val(response.listOneDay[0].idnursing_assessment_one_day);
				$("#date-pickForOneDay").val(response.listOneDay[0].date1);
				$("#TimeForOneDay").val(response.listOneDay[0].time1);
				if(response.listOneDay[0].chkIdBandOneDay==1){
					$("#chkIdBandOneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].chkCallBell==1){
					$("#chkCallBell").prop("checked", "checked");
				}
				$("#txtHt").val(response.listOneDay[0].txtHt);
				$("#txtWt").val(response.listOneDay[0].txtWt);
				
				if(response.listOneDay[0].infromationOneDay=="PatientOneDay"){
                    $("#radioPatientOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].infromationOneDay=="FamilyOneDay"){
                    $("#radioFamilyOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].infromationOneDay=="OldChartOneDay"){
                    $("#radioOldChartOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].infromationOneDay=="OtherOneDay"){
                    $("#radioOtherOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].infromationOneDay=="ConsentInfoOneDay"){
                    $("#radioInfoFamilyOneDay").prop("checked", "checked");
                }
				
				
				$("#txtAreaEmergencyCallOneDay").val(response.listOneDay[0].txtAreaEmergencyCallOneDay);
				
				if(response.listOneDay[0].modeOneDay=="ambulatoryOneDay"){
                    $("#radioAmbulatoryOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].modeOneDay=="wheelChairOneDay"){
                    $("#radioWheelOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].modeOneDay=="strecherOneDay"){
                    $("#radioStrecherOneDay").prop("checked", "checked");
                }
				
				
				if(response.listOneDay[0].admittedOneDay=="EmergencyOneDay"){
                    $("#radioEmergencyOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].admittedOneDay=="regularAdmissionOneDay"){
                    $("#radioRegularAdmissionOneDay").prop("checked", "checked");
                }
				
				$("#TempratureOneDay").val(response.listOneDay[0].tempratureOneDay);
				$("#PulseOneDay").val(response.listOneDay[0].pulseOneDay);
				$("#RROneDay").val(response.listOneDay[0].rROneDay);
				$("#SpO2OneDay").val(response.listOneDay[0].spO2OneDay);
				$("#BloodpOneDay").val(response.listOneDay[0].bloodpOneDay);
				
				$("#txtAdmittingOneDay").val(response.listOneDay[0].txtAdmittingOneDay);
				$("#txtCheifComplainOneDay").val(response.listOneDay[0].txtCheifComplainOneDay);
				
				if(response.listOneDay[0].allergiesOneDay=="DrugsOneDay"){
                    $("#radioDrugOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].allergiesOneDay=="FoodOneDay"){
                    $("#radioFoodOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].allergiesOneDay=="OtherAllergiesOneDay"){
                    $("#radioOtherAllergiesOneDay").prop("checked", "checked");
                }
				
				
				if(response.listOneDay[0].cateOneDay1==1){
					$("#cateOneDay1").prop("checked", "checked");
				}
				if(response.listOneDay[0].careOneDay1==1){
					$("#careOneDay1").prop("checked", "checked");
				}
				if(response.listOneDay[0].cateOneDay2==1){
					$("#cateOneDay2").prop("checked", "checked");
				}
				if(response.listOneDay[0].careOneDay2==1){
					$("#careOneDay2").prop("checked", "checked");
				}
				if(response.listOneDay[0].cateOneDay3==1){
					$("#cateOneDay3").prop("checked", "checked");
				}
				if(response.listOneDay[0].careOneDay3==1){
					$("#careOneDay3").prop("checked", "checked");
				}
				if(response.listOneDay[0].cateOneDay4==1){
					$("#cateOneDay4").prop("checked", "checked");
				}
				if(response.listOneDay[0].careOneDay4==1){
					$("#careOneDay4").prop("checked", "checked");
				}
				if(response.listOneDay[0].cateOneDay5==1){
					$("#cateOneDay5").prop("checked", "checked");
				}
				if(response.listOneDay[0].careOneDay5==1){
					$("#careOneDay5").prop("checked", "checked");
				}
				
				
				if(response.listOneDay[0].vulnerabilityLevelOneDay=="HighOneDay"){
                    $("#radioHighOneDay").prop("checked", "checked");
                }else if(response.listOneDay[0].vulnerabilityLevelOneDay=="LowOneDay"){
                    $("#radioLowOneDay").prop("checked", "checked");
                }
				$("#date-pickForIvAssessmentOneDay").val(response.listOneDay[0].datePickForIvAssessmentOneDay);
				$("#guageOneDay").val(response.listOneDay[0].guageOneDay);
				$("#VenflonOneDay").val(response.listOneDay[0].venflonOneDay);
				$("#ChangeOnOneDay").val(response.listOneDay[0].changeOnOneDay);
				$("#SiteOneDay").val(response.listOneDay[0].siteOneDay);
				$("#idPainScaleOneDay").val(response.listOneDay[0].idPainScaleOneDay);
				
				$("#Time01OneDay").val(response.listOneDay[0].time01OneDay);
				$("#Time02OneDay").val(response.listOneDay[0].time02OneDay);
				$("#Time03OneDay").val(response.listOneDay[0].time03OneDay);
				
				if(response.listOneDay[0].infiltration01OneDay==1){
					$("#Infiltration01OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].infiltration02OneDay==1){
					$("#Infiltration02OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].infiltration03OneDay==1){
					$("#Infiltration03OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].infiltration04OneDay==1){
					$("#Infiltration04OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].infiltration05OneDay==1){
					$("#Infiltration05OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].infiltration06OneDay==1){
					$("#Infiltration06OneDay").prop("checked", "checked");
				}
				
				
				if(response.listOneDay[0].swelling01OneDay==1){
					$("#Swelling01OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].swelling02OneDay==1){
					$("#Swelling02OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].swelling03OneDay==1){
					$("#Swelling03OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].swelling04OneDay==1){
					$("#Swelling04OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].swelling05OneDay==1){
					$("#Swelling05OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].swelling06OneDay==1){
					$("#Swelling06OneDay").prop("checked", "checked");
				}
				
				if(response.listOneDay[0].redness01OneDay==1){
					$("#Redness01OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].redness02OneDay==1){
					$("#Redness02OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].redness03OneDay==1){
					$("#Redness03OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].redness04OneDay==1){
					$("#Redness04OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].redness05OneDay==1){
					$("#Redness05OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].redness06OneDay==1){
					$("#Redness06OneDay").prop("checked", "checked");
				}
				
				if(response.listOneDay[0].pain01OneDay==1){
					$("#Pain01OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].pain02OneDay==1){
					$("#Pain02OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].pain03OneDay==1){
					$("#Pain03OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].pain04OneDay==1){
					$("#Pain04OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].pain05OneDay==1){
					$("#Pain05OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].pain06OneDay==1){
					$("#Pain06OneDay").prop("checked", "checked");
				}
				
				if(response.listOneDay[0].thrombophlebitis1OneDay==1){
					$("#Thrombophlebitis1OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].thrombophlebitis2OneDay==1){
					$("#Thrombophlebitis2OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].thrombophlebitis3OneDay==1){
					$("#Thrombophlebitis3OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].thrombophlebitis4OneDay==1){
					$("#Thrombophlebitis4OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].thrombophlebitis5OneDay==1){
					$("#Thrombophlebitis5OneDay").prop("checked", "checked");
				}
				if(response.listOneDay[0].thrombophlebitis6OneDay==1){
					$("#Thrombophlebitis6OneDay").prop("checked", "checked");
				}
				
				/*$("#Time001OneDay").val(response.listOneDay[0].time001OneDay);
				$("#Time002OneDay").val(response.listOneDay[0].time002OneDay);
				$("#Time003OneDay").val(response.listOneDay[0].time003OneDay);
				$("#Time004OneDay").val(response.listOneDay[0].time004OneDay);
				
				$("#Temp001OneDay").val(response.listOneDay[0].temp001OneDay);
				$("#Temp002OneDay").val(response.listOneDay[0].temp002OneDay);
				$("#Temp003OneDay").val(response.listOneDay[0].temp003OneDay);
				$("#Temp004OneDay").val(response.listOneDay[0].temp004OneDay);
				
				$("#Pulse001OneDay").val(response.listOneDay[0].pulse001OneDay);
				$("#Pulse002OneDay").val(response.listOneDay[0].pulse002OneDay);
				$("#Pulse003OneDay").val(response.listOneDay[0].pulse003OneDay);
				$("#Pulse004OneDay").val(response.listOneDay[0].pulse004OneDay);
				
				$("#RR001OneDay").val(response.listOneDay[0].rr001OneDay);
				$("#RR002OneDay").val(response.listOneDay[0].rr002OneDay);
				$("#RR003OneDay").val(response.listOneDay[0].rr003OneDay);
				$("#RR004OneDay").val(response.listOneDay[0].rr004OneDay);
				
				$("#BP001OneDay").val(response.listOneDay[0].bp001OneDay);
				$("#BP002OneDay").val(response.listOneDay[0].bp002OneDay);
				$("#BP003OneDay").val(response.listOneDay[0].bp003OneDay);
				$("#BP004OneDay").val(response.listOneDay[0].bp004OneDay);
				
				$("#Pain001OneDay").val(response.listOneDay[0].pain001OneDay);
				$("#Pain002OneDay").val(response.listOneDay[0].pain002OneDay);
				$("#Pain003OneDay").val(response.listOneDay[0].pain003OneDay);
				$("#Pain004OneDay").val(response.listOneDay[0].pain004OneDay);*/
				
				
				$("#Assessment01OneDay").val(response.listOneDay[0].assessment01OneDay);
				$("#Assessment02OneDay").val(response.listOneDay[0].assessment02OneDay);
				$("#Assessment03OneDay").val(response.listOneDay[0].assessment03OneDay);
				$("#Assessment04OneDay").val(response.listOneDay[0].assessment04OneDay);
				
				$("#Diagnosis01OneDay").val(response.listOneDay[0].diagnosis01OneDay);
				$("#Diagnosis02OneDay").val(response.listOneDay[0].diagnosis02OneDay);
				$("#Diagnosis03OneDay").val(response.listOneDay[0].diagnosis03OneDay);
				$("#Diagnosis04OneDay").val(response.listOneDay[0].diagnosis04OneDay);
				
				$("#Planning01OneDay").val(response.listOneDay[0].planning01OneDay);
				$("#Planning02OneDay").val(response.listOneDay[0].planning02OneDay);
				$("#Planning03OneDay").val(response.listOneDay[0].planning03OneDay);
				$("#Planning04OneDay").val(response.listOneDay[0].planning04OneDay);
				
				$("#Intervention01OneDay").val(response.listOneDay[0].intervention01OneDay);
				$("#Intervention02OneDay").val(response.listOneDay[0].intervention02OneDay);
				$("#Intervention03OneDay").val(response.listOneDay[0].intervention03OneDay);
				$("#Intervention04OneDay").val(response.listOneDay[0].intervention04OneDay);
				
				$("#Evaluation01OneDay").val(response.listOneDay[0].evaluation01OneDay);
				$("#Evaluation02OneDay").val(response.listOneDay[0].evaluation01OneDay);
				$("#Evaluation03OneDay").val(response.listOneDay[0].evaluation01OneDay);
				$("#Evaluation04OneDay").val(response.listOneDay[0].evaluation01OneDay);
				
				$("#Shift004OneDay").val(response.listOneDay[0].shift004OneDay);
				intCounot =0;
				$("#nursingOtBody").setTemplate(OtListTemp);
				$("#nursingOtBody").processTemplate(response);
				
				$("#OtRow").val(response.oTList.length);
				
				fetchReAssessment(response.listOneDay[0].idnursing_assessment_one_day);
			}
		});
}

function saveInitalNursingAssessment(){

	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
    var idForpediatric1 = $("#idForpediatric1").val();
    
    var DateOfAdmission = $("#date-pickForAdmission").val();
    var RecievedTime = $("#recievedTime").val();
    var AssessementTime = $("#AssessementTime").val();
    var chkboxGenralConsentSigned = $('input:checkbox[id=chkboxGenralConsentSigned]');
    var chkboxForIdBandTied = $('input:checkbox[id=chkboxForIdBandTied]');
    var ReasonOfAdmission = $("input:radio[name='ReasonOfAdmission']:checked").val();
    if(ReasonOfAdmission==undefined)
	{
    	ReasonOfAdmission = "0";
	}
    var Temprature1 = $("#Temprature1").val();
    var Pulse = $("#Pulse").val();
    var RR = $("#RR").val();
    var SpO2 = $("#SpO2").val();
    var Bloodp1 = $("#Bloodp1").val();
    var Weight1 = $("#Weight1").val();
    var Height1 = $("#Height1").val();
    var Circumference = $("#Circumference1").val();
    var RedColorationLocation = $("#txtlocation1").val();
    var SkinBreakOnlyLocation  = $("#txtlocation2").val();
    var FatExposedLocation = $("#txtlocation3").val();
    var Muscle_BoneExposedLocation  = $("#txtlocation4").val();
    var RedColorationStage = $("#txtStage1").val();
    var SkinBreakOnlyStage = $("#txtStage2").val();
    var FatExposedStage = $("#txtStage3").val();
    var Muscle_BoneExposedStage = $("#txtStage4").val();
    var PressureUlcerManagement = $("#txtAreaUlcer").val();
    var ModeofMovement = $("input:radio[name='ModeofMovement']:checked").val();
    if(ModeofMovement==undefined)
	{
    	ModeofMovement = "0";
	}
    var Othermovement = $("#txtOthermovement").val();
    var Dependency = $("input:radio[name='Dependency']:checked").val();
    if(Dependency==undefined)
	{
    	Dependency = "0";
	}
    var LevelofConsciousness = $("input:radio[name='LevelofConsciousness']:checked").val();
    if(LevelofConsciousness==undefined)
	{
    	LevelofConsciousness = "0";
	}
    var ChiefComplain = $("#txtAreaChief").val();
    var PresentMedication = $("#txtAreaMedications").val();
    var PhysicallyChallenged = $('input:checkbox[id=cate1]');
    var LowHeightbed = $('input:checkbox[id=care1]');
    var MentallyChallenged = $('input:checkbox[id=cate2]');
    var NearertoNursingStation = $('input:checkbox[id=care2]');
    var Terminallyill = $('input:checkbox[id=cate3]');
    var ContinousMonitoring = $('input:checkbox[id=care3]');
    var EpilepticFits = $('input:checkbox[id=cate4]');
    var FullTimeAttedndent = $('input:checkbox[id=care4]');
    var Immunocompromised = $('input:checkbox[id=cate5]');
    var infectionControlPrecaution = $('input:checkbox[id=care5]');
    var LocationOfPain = $("#txtAreaPain").val();
    var PainScore = $("#txtPainScore").val();
    var PressureScorePresent = $('input:checkbox[id=chkboxPressureScorePresent]');
    if(chkboxForIdBandTied.is(':checked') == true){
    	chkboxForIdBandTied = 1;
    }else{
    	chkboxForIdBandTied = 0;
    }
    if(chkboxGenralConsentSigned.is(':checked') == true){
    	chkboxGenralConsentSigned = 1;
    }else{
    	chkboxGenralConsentSigned = 0;
    }
    if(PhysicallyChallenged.is(':checked') == true){
    	PhysicallyChallenged = 1;
    }else{
    	PhysicallyChallenged = 0;
    }
    if(LowHeightbed.is(':checked') == true){
    	LowHeightbed = 1;
    }else{
    	LowHeightbed = 0;
    }
    if(MentallyChallenged.is(':checked') == true){
    	MentallyChallenged = 1;
    }else{
    	MentallyChallenged = 0;
    }
    if(NearertoNursingStation.is(':checked') == true){
    	NearertoNursingStation = 1;
    }else{
    	NearertoNursingStation = 0;
    }
    if(Terminallyill.is(':checked') == true){
    	Terminallyill = 1;
    }else{
    	Terminallyill = 0;
    }
    if(ContinousMonitoring.is(':checked') == true){
    	ContinousMonitoring = 1;
    }else{
    	ContinousMonitoring = 0;
    }
    if(EpilepticFits.is(':checked') == true){
    	EpilepticFits = 1;
    }else{
    	EpilepticFits = 0;
    }
    if(FullTimeAttedndent.is(':checked') == true){
    	FullTimeAttedndent = 1;
    }else{
    	FullTimeAttedndent = 0;
    }
    if(Immunocompromised.is(':checked') == true){
    	Immunocompromised = 1;
    }else{
    	Immunocompromised = 0;
    }
    if(infectionControlPrecaution.is(':checked') == true){
    	infectionControlPrecaution = 1;
    }else{
    	infectionControlPrecaution = 0;
    }
    if(PressureScorePresent.is(':checked') == true){
    	PressureScorePresent = 1;
    }else{
    	PressureScorePresent = 0;
    }

    
    var assessmentpediatric = {
    		listpediatric : []
        };
    assessmentpediatric.listpediatric.push({
    	pId:patId,
    	tId : treatId,
    	idnursing_assessment_paediatric : idForpediatric1,
    	dateOfAdmission: DateOfAdmission,
        recievedTime: RecievedTime,
        assessementTime: AssessementTime,
        chkboxGenralConsentSigned: chkboxGenralConsentSigned,
        chkboxForIdBandTied: chkboxForIdBandTied,
        reasonOfAdmission: ReasonOfAdmission,
        temprature1: Temprature1,
        pulse: Pulse,
        rR: RR,
        spO2: SpO2,
        bloodp1: Bloodp1,
        weight1: Weight1,
        height1: Height1,
        circumference: Circumference,
        redColorationLocation: RedColorationLocation,
        skinBreakOnlyLocation: SkinBreakOnlyLocation,
        fatExposedLocation: FatExposedLocation,
        muscle_BoneExposedLocation: Muscle_BoneExposedLocation,
        redColorationStage: RedColorationStage,
        skinBreakOnlyStage: SkinBreakOnlyStage,
        fatExposedStage: FatExposedStage,
        muscle_BoneExposedStage: Muscle_BoneExposedStage,
        pressureUlcerManagement: PressureUlcerManagement,
        modeofMovement: ModeofMovement,
        othermovement: Othermovement,
        dependency: Dependency,
        levelofConsciousness: LevelofConsciousness,
        chiefComplain: ChiefComplain,
        presentMedication: PresentMedication,
        physicallyChallenged: PhysicallyChallenged,
        lowHeightbed: LowHeightbed,
        mentallyChallenged: MentallyChallenged,
        nearertoNursingStation: NearertoNursingStation,
        terminallyill: Terminallyill,
        continousMonitoring: ContinousMonitoring,
        epilepticFits: EpilepticFits,
        fullTimeAttedndent: FullTimeAttedndent,
        immunocompromised: Immunocompromised,
        infectionControlPrecaution: infectionControlPrecaution,
        locationOfPain: LocationOfPain,
        painScore: PainScore,
        pressureScorePresent: PressureScorePresent
    });
    
    assessmentpediatric = JSON.stringify(assessmentpediatric);
    var inputs = [];
    inputs.push('assessmentpediatric=' + assessmentpediatric);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/saveAssessmentPediatric",
	
		success : function(r) {
			alert(r);
			fetchInitalNursingAssessment();
		}	
	});
}


function fetchInitalNursingAssessment(){
	
	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
    var inputs = [];
    inputs.push('pId=' + patId);
    inputs.push('tId=' + treatId);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/fetchInitalNursing",
	
		success : function(response) {
			$("#idForpediatric1").val(response.listpediatric[0].idnursing_assessment_paediatric);
			$("#date-pickForAdmission").val(response.listpediatric[0].dateOfAdmission);
			$("#recievedTime").val(response.listpediatric[0].recievedTime);
			$("#AssessementTime").val(response.listpediatric[0].assessementTime);
			
			if(response.listpediatric[0].chkboxGenralConsentSigned==1){
				$("#chkboxGenralConsentSigned").prop("checked", "checked");
			}
			if(response.listpediatric[0].chkboxForIdBandTied==1){
				$("#chkboxForIdBandTied").prop("checked", "checked");
			}
			if(response.listpediatric[0].reasonOfAdmission=="emergency"){
				$("#radioForEmergency").prop("checked", "checked");
			}else if(response.listpediatric[0].reasonOfAdmission=="obeservation"){
				$("#radioForObeservation").prop("checked", "checked");
			}else if(response.listpediatric[0].reasonOfAdmission=="firstTime"){
				$("#radioForFirst").prop("checked", "checked");
			}else if(response.listpediatric[0].reasonOfAdmission=="continuationofTreatment"){
				$("#radioForContinuation").prop("checked", "checked");
			}else if(response.listpediatric[0].reasonOfAdmission=="supportiveTherapy"){
				$("#radioForSupportive").prop("checked", "checked");
			}else if(response.listpediatric[0].reasonOfAdmission=="admissionOther"){
				$("#radioForOther").prop("checked", "checked");
			}
			$("#Temprature1").val(response.listpediatric[0].temprature1);
			$("#Pulse").val(response.listpediatric[0].pulse);
			$("#RR").val(response.listpediatric[0].rR);
			$("#SpO2").val(response.listpediatric[0].spO2);
			$("#Bloodp1").val(response.listpediatric[0].bloodp1);
			$("#Weight1").val(response.listpediatric[0].weight1);
			$("#Height1").val(response.listpediatric[0].height1);
			$("#Circumference1").val(response.listpediatric[0].circumference);
			
			
			if(response.listpediatric[0].physicallyChallenged==1){
				$("#cate1").prop("checked", "checked");
			}
			if(response.listpediatric[0].mentallyChallenged==1){
				$("#cate2").prop("checked", "checked");
			}
			if(response.listpediatric[0].terminallyill==1){
				$("#cate3").prop("checked", "checked");
			}
			if(response.listpediatric[0].epilepticFits==1){
				$("#cate4").prop("checked", "checked");
			}
			if(response.listpediatric[0].immunocompromised==1){
				$("#cate5").prop("checked", "checked");
			}
			if(response.listpediatric[0].lowHeightbed==1){
				$("#care1").prop("checked", "checked");
			}
			if(response.listpediatric[0].nearertoNursingStation==1){
				$("#care2").prop("checked", "checked");
			}
			if(response.listpediatric[0].continousMonitoring==1){
				$("#care3").prop("checked", "checked");
			}
			if(response.listpediatric[0].fullTimeAttedndent==1){
				$("#care4").prop("checked", "checked");
			}
			if(response.listpediatric[0].infectionControlPrecaution==1){
				$("#care5").prop("checked", "checked");
			}
			
			
			$("#txtAreaPain").val(response.listpediatric[0].locationOfPain);
			$("#txtPainScore").val(response.listpediatric[0].painScore);
			
			if(response.listpediatric[0].pressureScorePresent==1){
				$("#chkboxPressureScorePresent").prop("checked", "checked");
			}
			$("#txtlocation1").val(response.listpediatric[0].redColorationLocation);
			$("#txtlocation2").val(response.listpediatric[0].skinBreakOnlyLocation);
			$("#txtlocation3").val(response.listpediatric[0].fatExposedLocation);
			$("#txtlocation4").val(response.listpediatric[0].muscle_BoneExposedLocation);
			$("#txtStage1").val(response.listpediatric[0].redColorationStage);
			$("#txtStage2").val(response.listpediatric[0].skinBreakOnlyStage);
			$("#txtStage3").val(response.listpediatric[0].fatExposedStage);
			$("#txtStage4").val(response.listpediatric[0].muscle_BoneExposedStage);
			$("#txtAreaUlcer").val(response.listpediatric[0].pressureUlcerManagement);
			
			
			if(response.listpediatric[0].modeofMovement=="ambulatory"){
				$("#radioAmbulatory").prop("checked", "checked");
			}else if(response.listpediatric[0].modeofMovement=="wheelChair"){
				$("#radioWheel").prop("checked", "checked");
			}else if(response.listpediatric[0].modeofMovement=="strecher"){
				$("#radioStrecher").prop("checked", "checked");
			}else{
				$("#txtOthermovement").val(response.listpediatric[0].othermovement);
			}
			
			
			if(response.listpediatric[0].dependency=="independency"){
				$("#radioIndependency").prop("checked", "checked");
			}else if(response.listpediatric[0].dependency=="partiallyIndependent"){
				$("#radioPartially").prop("checked", "checked");
			}else if(response.listpediatric[0].dependency=="completelyIndependent"){
				$("#radioCompletely").prop("checked", "checked");
			}
			
			
			if(response.listpediatric[0].levelofConsciousness=="conscious"){
				$("#radioConscious").prop("checked", "checked");
			}else if(response.listpediatric[0].levelofConsciousness=="semiconscious"){
				$("#radioSemiConscious").prop("checked", "checked");
			}else if(response.listpediatric[0].levelofConsciousness=="unconscious"){
				$("#radioUnconscious").prop("checked", "checked");
			}else if(response.listpediatric[0].levelofConsciousness=="oriented"){
				$("#radioOriented").prop("checked", "checked");
			}else if(response.listpediatric[0].LevelofConsciousness=="disoriented"){
				$("#radioDisoriented").prop("checked", "checked");
			}
			$("#txtAreaChief").val(response.listpediatric[0].chiefComplain);
			$("#txtAreaMedications").val(response.listpediatric[0].presentMedication);
			
		}
	});
}


function saveInitalNursingAssessment2(){

	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
    var idForpediatric2 = $("#idForpediatric2").val();
    var Food = $('input:checkbox[id=Food]');
    var Medicines = $('input:checkbox[id=Medicines01]');
    var chkAllergiesOther = $('input:checkbox[id=chkOther01]');
    var txtAllergiesSpecify = $("#txtSpecify").val();
    var chkAllergiesNotKnown = $('input:checkbox[id=chkNotKnown]');
    var chkBirthHistoryfullterm = $('input:checkbox[id=chkfullterm]');
    var chkBirthHistoryPreterm = $('input:checkbox[id=chkPreterm]');
    var chkBirthHistoryBirthCry = $('input:checkbox[id=chkBirthCry]');
    var chkNormalDelivery = $('input:checkbox[id=chkNormalDelivery]');
    var chkDeliveryCeasarean = $('input:checkbox[id=chkCeasarean]');
    var chkDeliveryForceps = $('input:checkbox[id=chkForceps]');
    var chkDeliveryEpisiotomy = $('input:checkbox[id=chkEpisiotomy]');
    var chkDeliveryVaccum = $('input:checkbox[id=chkVaccum]');
    var chkImmunizationCompleted = $('input:checkbox[id=chkImmunization]');
    var txtImmunizationDetailsIfNo = $("#txtDetailsIfNo").val();
    var chkDevelopmentHistoryweight = $('input:checkbox[id=chkweght]');
    var chkDevelopmentHistoryHeight = $('input:checkbox[id=chkHght]');
    var chkDevelopmentHistoryChestCircumference = $('input:checkbox[id=chkChestCircumference]');
    var txtAreaDevelopmentHistoryDetailsifNo = $("#txtAreaDetailsifNo").val();
    var chkNoAbnormalityDetectedForEye = $('input:checkbox[id=chkNoAbnormalityDetectedForEye]');
    var chkImpairedEye = $('input:checkbox[id=chkImpaired]');
    var chkEyeLenses = $('input:checkbox[id=chkLenses]');
    var chkEyeSpectacles = $('input:checkbox[id=chkSpectacles]');
    var chkBlind = $('input:checkbox[id=chkBlind]');
    var chkDeaf = $('input:checkbox[id=chkDeaf]');
    var chkHearingAid = $('input:checkbox[id=chkHearing]');
    var chkChemoPort = $('input:checkbox[id=chkChemo]');
    var chkOrthopedicImpl = $('input:checkbox[id=chkOrthopedicImpl]');
    var txtImplants = $("#txtImplants").val();
    var chkOthereye = $('input:checkbox[id=chkOthereye]');
    var txtOthereye = $("#txtOthereye").val();
    var chkAbnormalityRespiratory = $('input:checkbox[id=chkAbnormalityRespiratory]');
    var chkDyspnea = $('input:checkbox[id=chkDyspnea]');
    var chkWheezes = $('input:checkbox[id=chkWheezes]');
    var chkAsymmetric = $('input:checkbox[id=chkAsymmetric]');
    var chkCough = $('input:checkbox[id=chkCough]');
    var chkSputum = $('input:checkbox[id=chkSputum]');
    var txtOtherRespiratory = $("#txtOtherRespiratory").val();
    var chkOtherRespiratory = $('input:checkbox[id=chkOtherRespiratory]');
    var chkAbnormalityCardioVascular = $('input:checkbox[id=chkAbnormalityCardioVascular]');
    var chkTachycardia = $('input:checkbox[id=chkTachycardia]');
    var chkBradycardia = $('input:checkbox[id=chkBradycardia]');
    var chkEdema = $('input:checkbox[id=chkEdema]');
    var chkFacial_Pedal = $('input:checkbox[id=chkFacial_Pedal]');
    var chkSacral = $('input:checkbox[id=chkSacral]');
    var chkGeneralized = $('input:checkbox[id=chkGeneralized]');
    var chkCardioOther = $('input:checkbox[id=chkCardioOther]');
    var chkAbnormalityGastrointestinal = $('input:checkbox[id=chkAbnormalityGastrointestinal]');
    var chkDistention = $('input:checkbox[id=chkDistention]');
    var chkRigidity = $('input:checkbox[id=chkRigidity]');
    var chkDysphagia = $('input:checkbox[id=chkDysphagia]');
    var chkDiarrhoea = $('input:checkbox[id=chkDiarrhoea]');
    var chkConstipation = $('input:checkbox[id=chkConstipation]');
    var chkLast = $('input:checkbox[id=chkLast]');
    var chkGastrointestinalOther = $('input:checkbox[id=chkGastrointestinalOther]');
    var chkAbnormalityGenitourinary = $('input:checkbox[id=chkAbnormalityGenitourinary]');
    var chkDysuria = $('input:checkbox[id=chkDysuria]');
    var chkHematuria = $('input:checkbox[id=chkHematuria]');
    var chkHesitancy = $('input:checkbox[id=chkHesitancy]');
    var chkFrequent = $('input:checkbox[id=chkFrequent]');
    var chkCatheter = $('input:checkbox[id=chkCatheter]');
    var chkGenitourinaryOther = $('input:checkbox[id=chkGenitourinaryOther]');
    var chkMenstrual = $('input:checkbox[id=chkMenstrual]');
    var chkPregnancy = $('input:checkbox[id=chkPregnancy]');
    var chkLMP = $('input:checkbox[id=chkLMP]');
    var chkGenitourinaryFemaleOther = $('input:checkbox[id=chkGenitourinaryFemaleOther]');
    var chkAbnormalityNeurology = $('input:checkbox[id=chkAbnormalityNeurology]');
    var chkComatose = $('input:checkbox[id=chkComatose]');
    var chkSemi_Comatose = $('input:checkbox[id=chkSemi_Comatose]');
    var chkNeurologyParalysed = $('input:checkbox[id=chkNeurologyParalysed]');
    var chkSedated = $('input:checkbox[id=chkSedated]');
    var chkLathargic = $('input:checkbox[id=chkLathargic]');
    var chkConfused = $('input:checkbox[id=chkConfused]');
    var chkUnsteady = $('input:checkbox[id=chkUnsteady]');
    var chkNeurologyOther = $('input:checkbox[id=chkNeurologyOther]');
    var chkAbnormalitySkin_Extremities = $('input:checkbox[id=chkAbnormalitySkin_Extremities]');
    var chkProsthesis = $('input:checkbox[id=chkProsthesis]');
    var chkSwelling = $('input:checkbox[id=chkSwelling]');
    var chkClubbing = $('input:checkbox[id=chkClubbing]');
    var chkCyanosis = $('input:checkbox[id=chkCyanosis]');
    var chkDeformity = $('input:checkbox[id=chkDeformity]');
    var chkPoor_Turgor = $('input:checkbox[id=chkPoor_Turgor]');
    var chkSkin_ExtremitiesHot = $('input:checkbox[id=chkSkin_ExtremitiesHot]');
    var chkSkin_ExtremitiesCool = $('input:checkbox[id=chkSkin_ExtremitiesCool]');
    var chkSkin_ExtremitiesOther = $('input:checkbox[id=chkSkin_ExtremitiesOther]');
    var chkReferralDiet = $('input:checkbox[id=chkDiet11]');
    var chkPhysiotherapy = $('input:checkbox[id=chkPhysiotherapy]');
    var chkYoga = $('input:checkbox[id=chkYoga]');
    var chkCounseler = $('input:checkbox[id=chkCounseler]');
    var chkReferralsPain_Management = $('input:checkbox[id=chkReferralsPain_Management]');
    var chkReferralsOther = $('input:checkbox[id=chkReferralsOther]');
    var txtAreaAssessemntPlan = $("#txtAreaAssessemntPlan").val();
    var txtAreaNursing_DiagnosisPlan = $("#txtAreaNursing_DiagnosisPlan").val();
    var txtAreaPlanningNursing = $("#txtAreaPlanningNursing").val();
    var txtAreaInterventionNursing = $("#txtAreaInterventionNursing").val();
    var txtAreaEvaluationPlan = $("#txtAreaEvaluationPlan").val();
   
    if(Food.is(':checked') == true){
    	Food = 1;
    }else{
    	Food = 0;
    }
    if(Medicines.is(':checked') == true){
    	Medicines = 1;
    }else{
    	Medicines = 0;
    }
    if(chkAllergiesOther.is(':checked') == true){
    	chkAllergiesOther = 1;
    }else{
    	chkAllergiesOther = 0;
    }
    if(chkAllergiesNotKnown.is(':checked') == true){
    	chkAllergiesNotKnown = 1;
    }else{
    	chkAllergiesNotKnown = 0;
    }
    if(chkBirthHistoryfullterm.is(':checked') == true){
    	chkBirthHistoryfullterm = 1;
    }else{
    	chkBirthHistoryfullterm = 0;
    }
    if(chkBirthHistoryPreterm.is(':checked') == true){
    	chkBirthHistoryPreterm = 1;
    }else{
    	chkBirthHistoryPreterm = 0;
    }
    if(chkBirthHistoryBirthCry.is(':checked') == true){
    	chkBirthHistoryBirthCry = 1;
    }else{
    	chkBirthHistoryBirthCry = 0;
    }
    if(chkNormalDelivery.is(':checked') == true){
    	chkNormalDelivery = 1;
    }else{
    	chkNormalDelivery = 0;
    }
    if(chkDeliveryCeasarean.is(':checked') == true){
    	chkDeliveryCeasarean = 1;
    }else{
    	chkDeliveryCeasarean = 0;
    }
    if(chkDeliveryForceps.is(':checked') == true){
    	chkDeliveryForceps = 1;
    }else{
    	chkDeliveryForceps = 0;
    }
    if(chkDeliveryEpisiotomy.is(':checked') == true){
    	chkDeliveryEpisiotomy = 1;
    }else{
    	chkDeliveryEpisiotomy = 0;
    }
    if(chkDeliveryVaccum.is(':checked') == true){
    	chkDeliveryVaccum = 1;
    }else{
    	chkDeliveryVaccum = 0;
    }
    if(chkImmunizationCompleted.is(':checked') == true){
    	chkImmunizationCompleted = 1;
    }else{
    	chkImmunizationCompleted = 0;
    }
    if(chkDevelopmentHistoryweight.is(':checked') == true){
    	chkDevelopmentHistoryweight = 1;
    }else{
    	chkDevelopmentHistoryweight = 0;
    }
    if(chkDevelopmentHistoryHeight.is(':checked') == true){
    	chkDevelopmentHistoryHeight = 1;
    }else{
    	chkDevelopmentHistoryHeight = 0;
    }
     if(chkDevelopmentHistoryChestCircumference.is(':checked') == true){
    	chkDevelopmentHistoryChestCircumference = 1;
    }else{
    	chkDevelopmentHistoryChestCircumference = 0;
    }
     if(chkNoAbnormalityDetectedForEye.is(':checked') == true){
    	chkNoAbnormalityDetectedForEye = 1;
    }else{
    	chkNoAbnormalityDetectedForEye = 0;
    }
     if(chkImpairedEye.is(':checked') == true){
    	chkImpairedEye = 1;
    }else{
    	chkImpairedEye = 0;
    }
     if(chkEyeLenses.is(':checked') == true){
    	chkEyeLenses = 1;
    }else{
    	chkEyeLenses = 0;
    }
     if(chkEyeSpectacles.is(':checked') == true){
    	chkEyeSpectacles = 1;
    }else{
    	chkEyeSpectacles = 0;
    }
     if(chkBlind.is(':checked') == true){
    	chkBlind = 1;
    }else{
    	chkBlind = 0;
    }
    if(chkDeaf.is(':checked') == true){
    	chkDeaf = 1;
    }else{
    	chkDeaf = 0;
    }
    if(chkHearingAid.is(':checked') == true){
    	chkHearingAid = 1;
    }else{
    	chkHearingAid = 0;
    }
     if(chkChemoPort.is(':checked') == true){
    	chkChemoPort = 1;
    }else{
    	chkChemoPort = 0;
    }
    if(chkOrthopedicImpl.is(':checked') == true){
    	chkOrthopedicImpl = 1;
    }else{
    	chkOrthopedicImpl = 0;
    }
     if(chkOthereye.is(':checked') == true){
    	chkOthereye = 1;
    }else{
    	chkOthereye = 0;
    }
     if(chkAbnormalityRespiratory.is(':checked') == true){
    	chkAbnormalityRespiratory = 1;
    }else{
    	chkAbnormalityRespiratory = 0;
    }
    if(chkDyspnea.is(':checked') == true){
    	chkDyspnea = 1;
    }else{
    	chkDyspnea = 0;
    }
    if(chkWheezes.is(':checked') == true){
    	chkWheezes = 1;
    }else{
    	chkWheezes = 0;
    }
     if(chkAsymmetric.is(':checked') == true){
    	chkAsymmetric = 1;
    }else{
    	chkAsymmetric = 0;
    }
    if(chkCough.is(':checked') == true){
    	chkCough = 1;
    }else{
    	chkCough = 0;
    }
    if(chkSputum.is(':checked') == true){
    	chkSputum = 1;
    }else{
    	chkSputum = 0;
    }
     if(chkOtherRespiratory.is(':checked') == true){
    	chkOtherRespiratory = 1;
    }else{
    	chkOtherRespiratory = 0;
    }
     if(chkAbnormalityCardioVascular.is(':checked') == true){
    	chkAbnormalityCardioVascular = 1;
    }else{
    	chkAbnormalityCardioVascular = 0;
    }
     if(chkTachycardia.is(':checked') == true){
    	chkTachycardia = 1;
    }else{
    	chkTachycardia = 0;
    }
    if(chkBradycardia.is(':checked') == true){
    	chkBradycardia = 1;
    }else{
    	chkBradycardia = 0;
    }
    if(chkEdema.is(':checked') == true){
    	chkEdema = 1;
    }else{
    	chkEdema = 0;
    }
    if(chkFacial_Pedal.is(':checked') == true){
    	chkFacial_Pedal = 1;
    }else{
    	chkFacial_Pedal = 0;
    }
    if(chkSacral.is(':checked') == true){
    	chkSacral = 1;
    }else{
    	chkSacral = 0;
    }
    if(chkGeneralized.is(':checked') == true){
    	chkGeneralized = 1;
    }else{
    	chkGeneralized = 0;
    }
    if(chkCardioOther.is(':checked') == true){
    	chkCardioOther = 1;
    }else{
    	chkCardioOther = 0;
    }
    if(chkAbnormalityGastrointestinal.is(':checked') == true){
    	chkAbnormalityGastrointestinal = 1;
    }else{
    	chkAbnormalityGastrointestinal = 0;
    }
    if(chkDistention.is(':checked') == true){
    	chkDistention = 1;
    }else{
    	chkDistention = 0;
    }
    if(chkRigidity.is(':checked') == true){
    	chkRigidity = 1;
    }else{
    	chkRigidity = 0;
    }
    if(chkDysphagia.is(':checked') == true){
    	chkDysphagia = 1;
    }else{
    	chkDysphagia = 0;
    }
    if(chkDiarrhoea.is(':checked') == true){
    	chkDiarrhoea = 1;
    }else{
    	chkDiarrhoea = 0;
    }
    if(chkConstipation.is(':checked') == true){
    	chkConstipation = 1;
    }else{
    	chkConstipation = 0;
    }
    if(chkLast.is(':checked') == true){
    	chkLast = 1;
    }else{
    	chkLast = 0;
    }
    if(chkGastrointestinalOther.is(':checked') == true){
    	chkGastrointestinalOther = 1;
    }else{
    	chkGastrointestinalOther = 0;
    }
    if(chkAbnormalityGenitourinary.is(':checked') == true){
    	chkAbnormalityGenitourinary = 1;
    }else{
    	chkAbnormalityGenitourinary = 0;
    }
    if(chkDysuria.is(':checked') == true){
    	chkDysuria = 1;
    }else{
    	chkDysuria = 0;
    }
    if(chkHematuria.is(':checked') == true){
    	chkHematuria = 1;
    }else{
    	chkHematuria = 0;
    }
    if(chkHesitancy.is(':checked') == true){
    	chkHesitancy = 1;
    }else{
    	chkHesitancy = 0;
    }
    if(chkFrequent.is(':checked') == true){
    	chkFrequent = 1;
    }else{
    	chkFrequent = 0;
    }
    if(chkCatheter.is(':checked') == true){
    	chkCatheter = 1;
    }else{
    	chkCatheter = 0;
    }
    if(chkGenitourinaryOther.is(':checked') == true){
    	chkGenitourinaryOther = 1;
    }else{
    	chkGenitourinaryOther = 0;
    }
    if(chkMenstrual.is(':checked') == true){
    	chkMenstrual = 1;
    }else{
    	chkMenstrual = 0;
    }
    if(chkPregnancy.is(':checked') == true){
    	chkPregnancy = 1;
    }else{
    	chkPregnancy = 0;
    }
    if(chkLMP.is(':checked') == true){
    	chkLMP = 1;
    }else{
    	chkLMP = 0;
    }
    if(chkGenitourinaryFemaleOther.is(':checked') == true){
    	chkGenitourinaryFemaleOther = 1;
    }else{
    	chkGenitourinaryFemaleOther = 0;
    }
    if(chkAbnormalityNeurology.is(':checked') == true){
    	chkAbnormalityNeurology = 1;
    }else{
    	chkAbnormalityNeurology = 0;
    }
    if(chkComatose.is(':checked') == true){
    	chkComatose = 1;
    }else{
    	chkComatose = 0;
    }
    if(chkSemi_Comatose.is(':checked') == true){
    	chkSemi_Comatose = 1;
    }else{
    	chkSemi_Comatose = 0;
    }
    if(chkNeurologyParalysed.is(':checked') == true){
    	chkNeurologyParalysed = 1;
    }else{
    	chkNeurologyParalysed = 0;
    }
    if(chkSedated.is(':checked') == true){
    	chkSedated = 1;
    }else{
    	chkSedated = 0;
    }
   	if(chkLathargic.is(':checked') == true){
    	chkLathargic = 1;
    }else{
    	chkLathargic = 0;
    }
   	if(chkConfused.is(':checked') == true){
    	chkConfused = 1;
    }else{
    	chkConfused = 0;
    }
    if(chkUnsteady.is(':checked') == true){
    	chkUnsteady = 1;
    }else{
    	chkUnsteady = 0;
    }
    if(chkNeurologyOther.is(':checked') == true){
    	chkNeurologyOther = 1;
    }else{
    	chkNeurologyOther = 0;
    }
    if(chkAbnormalitySkin_Extremities.is(':checked') == true){
    	chkAbnormalitySkin_Extremities = 1;
    }else{
    	chkAbnormalitySkin_Extremities = 0;
    }
    if(chkProsthesis.is(':checked') == true){
    	chkProsthesis = 1;
    }else{
    	chkProsthesis = 0;
    }
    if(chkSwelling.is(':checked') == true){
    	chkSwelling = 1;
    }else{
    	chkSwelling = 0;
    }
    if(chkClubbing.is(':checked') == true){
    	chkClubbing = 1;
    }else{
    	chkClubbing = 0;
    }
    if(chkCyanosis.is(':checked') == true){
    	chkCyanosis = 1;
    }else{
    	chkCyanosis = 0;
    }
    if(chkDeformity.is(':checked') == true){
    	chkDeformity = 1;
    }else{
    	chkDeformity = 0;
    }
    if(chkPoor_Turgor.is(':checked') == true){
    	chkPoor_Turgor = 1;
    }else{
    	chkPoor_Turgor = 0;
    }
    if(chkSkin_ExtremitiesHot.is(':checked') == true){
    	chkSkin_ExtremitiesHot = 1;
    }else{
    	chkSkin_ExtremitiesHot = 0;
    }
    if(chkSkin_ExtremitiesCool.is(':checked') == true){
    	chkSkin_ExtremitiesCool = 1;
    }else{
    	chkSkin_ExtremitiesCool = 0;
    }
    if(chkSkin_ExtremitiesOther.is(':checked') == true){
    	chkSkin_ExtremitiesOther = 1;
    }else{
    	chkSkin_ExtremitiesOther = 0;
    }
    if(chkReferralDiet.is(':checked') == true){
    	chkReferralDiet = 1;
    }else{
    	chkReferralDiet = 0;
    }
    if(chkPhysiotherapy.is(':checked') == true){
    	chkPhysiotherapy = 1;
    }else{
    	chkPhysiotherapy = 0;
    }
    if(chkYoga.is(':checked') == true){
    	chkYoga = 1;
    }else{
    	chkYoga = 0;
    }
    if(chkCounseler.is(':checked') == true){
    	chkCounseler = 1;
    }else{
    	chkCounseler = 0;
    }
    if(chkReferralsPain_Management.is(':checked') == true){
    	chkReferralsPain_Management = 1;
    }else{
    	chkReferralsPain_Management = 0;
    }
    if(chkReferralsOther.is(':checked') == true){
    	chkReferralsOther = 1;
    }else{
    	chkReferralsOther = 0;
    }
    
    var assessmentpediatric2 = {
    		listpediatric2 : []
        };
    assessmentpediatric2.listpediatric2.push({
    		pId:patId,
    		tId : treatId,
    		idnursing_assessment_paediatric_page_two : idForpediatric2,
    	 	food: Food,
    	    medicines: Medicines,
    	    chkAllergiesOther: chkAllergiesOther,
    	    txtAllergiesSpecify: txtAllergiesSpecify,
    	    chkAllergiesNotKnown: chkAllergiesNotKnown,
    	    chkBirthHistoryfullterm: chkBirthHistoryfullterm,
    	    chkBirthHistoryPreterm: chkBirthHistoryPreterm,
    	    chkBirthHistoryBirthCry: chkBirthHistoryBirthCry,
    	    chkNormalDelivery: chkNormalDelivery,
    	    chkDeliveryCeasarean: chkDeliveryCeasarean,
    	    chkDeliveryForceps: chkDeliveryForceps,
    	    chkDeliveryEpisiotomy: chkDeliveryEpisiotomy,
    	    chkDeliveryVaccum: chkDeliveryVaccum,
    	    chkImmunizationCompleted: chkImmunizationCompleted,
    	    txtImmunizationDetailsIfNo: txtImmunizationDetailsIfNo,
    	    chkDevelopmentHistoryweight: chkDevelopmentHistoryweight,
    	    chkDevelopmentHistoryHeight: chkDevelopmentHistoryHeight,
    	    chkDevelopmentHistoryChestCircumference: chkDevelopmentHistoryChestCircumference,
    	    txtAreaDevelopmentHistoryDetailsifNo: txtAreaDevelopmentHistoryDetailsifNo,
    	    chkNoAbnormalityDetectedForEye: chkNoAbnormalityDetectedForEye,
    	    chkImpairedEye: chkImpairedEye,
    	    chkEyeLenses: chkEyeLenses,
    	    chkEyeSpectacles: chkEyeSpectacles,
    	    chkBlind: chkBlind,
    	    chkDeaf: chkDeaf,
    	    chkHearingAid: chkHearingAid,
    	    chkChemoPort: chkChemoPort,
    	    chkOrthopedicImpl: chkOrthopedicImpl,
    	    txtImplants: txtImplants,
    	    chkOthereye: chkOthereye,
    	    txtOthereye: txtOthereye,
    	    chkAbnormalityRespiratory: chkAbnormalityRespiratory,
    	    chkDyspnea: chkDyspnea,
    	    chkWheezes: chkWheezes,
    	    chkAsymmetric: chkAsymmetric,
    	    chkCough: chkCough,
    	    chkSputum: chkSputum,
    	    txtOtherRespiratory: txtOtherRespiratory,
    	    chkOtherRespiratory: chkOtherRespiratory,
    	    chkAbnormalityCardioVascular: chkAbnormalityCardioVascular,
    	    chkTachycardia: chkTachycardia,
    	    chkBradycardia: chkBradycardia,
    	    chkEdema: chkEdema,
    	    chkFacial_Pedal: chkFacial_Pedal,
    	    chkSacral: chkSacral,
    	    chkGeneralized: chkGeneralized,
    	    chkCardioOther: chkCardioOther,
    	    chkAbnormalityGastrointestinal: chkAbnormalityGastrointestinal,
    	    chkDistention: chkDistention,
    	    chkRigidity: chkRigidity,
    	    chkDysphagia: chkDysphagia,
    	    chkDiarrhoea: chkDiarrhoea,
    	    chkConstipation: chkConstipation,
    	    chkLast: chkLast,
    	    chkGastrointestinalOther: chkGastrointestinalOther,
    	    chkAbnormalityGenitourinary: chkAbnormalityGenitourinary,
    	    chkDysuria: chkDysuria,
    	    chkHematuria: chkHematuria,
    	    chkHesitancy: chkHesitancy,
    	    chkFrequent: chkFrequent,
    	    chkCatheter: chkCatheter,
    	    chkGenitourinaryOther: chkGenitourinaryOther,
    	    chkMenstrual: chkMenstrual,
    	    chkPregnancy: chkPregnancy,
    	    chkLMP: chkLMP,
    	    chkGenitourinaryFemaleOther: chkGenitourinaryFemaleOther,
    	    chkAbnormalityNeurology: chkAbnormalityNeurology,
    	    chkComatose: chkComatose,
    	    chkSemi_Comatose: chkSemi_Comatose,
    	    chkNeurologyParalysed: chkNeurologyParalysed,
    	    chkSedated: chkSedated,
    	    chkLathargic: chkLathargic,
    	    chkConfused: chkConfused,
    	    chkUnsteady: chkUnsteady,
    	    chkNeurologyOther: chkNeurologyOther,
    	    chkAbnormalitySkin_Extremities: chkAbnormalitySkin_Extremities,
    	    chkProsthesis: chkProsthesis,
    	    chkSwelling: chkSwelling,
    	    chkClubbing: chkClubbing,
    	    chkCyanosis: chkCyanosis,
    	    chkDeformity: chkDeformity,
    	    chkPoor_Turgor: chkPoor_Turgor,
    	    chkSkin_ExtremitiesHot: chkSkin_ExtremitiesHot,
    	    chkSkin_ExtremitiesCool: chkSkin_ExtremitiesCool,
    	    chkSkin_ExtremitiesOther: chkSkin_ExtremitiesOther,
    	    chkReferralDiet: chkReferralDiet,
    	    chkPhysiotherapy: chkPhysiotherapy,
    	    chkYoga: chkYoga,
    	    chkCounseler: chkCounseler,
    	    chkReferralsPain_Management: chkReferralsPain_Management,
    	    chkReferralsOther: chkReferralsOther,
    	    txtAreaAssessemntPlan: txtAreaAssessemntPlan,
    	    txtAreaNursing_DiagnosisPlan: txtAreaNursing_DiagnosisPlan,
    	    txtAreaPlanningNursing: txtAreaPlanningNursing,
    	    txtAreaInterventionNursing: txtAreaInterventionNursing,
    	    txtAreaEvaluationPlan: txtAreaEvaluationPlan
    	 
    });
    
    assessmentpediatric2 = JSON.stringify(assessmentpediatric2);
    var inputs = [];
    inputs.push('assessmentpediatric2=' + assessmentpediatric2);
     
    var str = inputs.join('&');


    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/saveAssessmentPediatric2",
	
		success : function(r) {
			alert(r);
		    fetchInitalNursingAssessmentPageSecond();
        }
    });
}


function fetchInitalNursingAssessmentPageSecond(){
	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
    var inputs = [];
    inputs.push('pId=' + patId);
    inputs.push('tId=' + treatId);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/fetchInitalNursing2",

		
			success : function(response) {
				$("#idForpediatric2").val(response.listpediatric2[0].idnursing_assessment_paediatric_page_two);
			
				if(response.listpediatric2[0].food==1){
					$("#Food").prop("checked", "checked");
				}
				if(response.listpediatric2[0].medicines==1){
					$("#Medicines01").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkAllergiesOther==1){
					$("#chkOther01").prop("checked", "checked");
				}
				$("#txtSpecify").val(response.listpediatric2[0].txtAllergiesSpecify);
				if(response.listpediatric2[0].chkAllergiesNotKnown==1){
					$("#chkNotKnown").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkBirthHistoryfullterm==1){
					$("#chkfullterm").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkBirthHistoryPreterm==1){
					$("#chkPreterm").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkBirthHistoryBirthCry==1){
					$("#chkBirthCry").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkNormalDelivery==1){
					$("#chkNormalDelivery").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDeliveryCeasarean==1){
					$("#chkCeasarean").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDeliveryForceps==1){
					$("#chkForceps").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDeliveryEpisiotomy==1){
					$("#chkEpisiotomy").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDeliveryVaccum==1){
					$("#chkVaccum").prop("checked", "checked");
				}
				
				if(response.listpediatric2[0].chkImmunizationCompleted==1){
					$("#chkImmunization").prop("checked", "checked");
				}
				$("#txtDetailsIfNo").val(response.listpediatric2[0].txtImmunizationDetailsIfNo);
				if(response.listpediatric2[0].chkDevelopmentHistoryweight==1){
					$("#chkweght").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDevelopmentHistoryHeight==1){
					$("#chkHght").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDevelopmentHistoryChestCircumference==1){
					$("#chkChestCircumference").prop("checked", "checked");
				}
				$("#txtAreaDetailsifNo").val(response.listpediatric2[0].txtAreaDevelopmentHistoryDetailsifNo);
				if(response.listpediatric2[0].chkNoAbnormalityDetectedForEye==1){
					$("#chkNoAbnormalityDetectedForEye").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkImpairedEye==1){
					$("#chkImpaired").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkEyeLenses==1){
					$("#chkLenses").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkEyeSpectacles==1){
					$("#chkSpectacles").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkBlind==1){
					$("#chkBlind").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDeaf==1){
					$("#chkDeaf").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkHearingAid==1){
					$("#chkHearing").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkChemoPort==1){
					$("#chkChemo").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkOrthopedicImpl==1){
					$("#chkOrthopedicImpl").prop("checked", "checked");
				}
				$("#txtImplants").val(response.listpediatric2[0].txtImplants);
				if(response.listpediatric2[0].chkOthereye==1){
					$("#chkOthereye").prop("checked", "checked");
				}
				$("#txtOthereye").val(response.listpediatric2[0].txtOthereye);
				if(response.listpediatric2[0].chkAbnormalityRespiratory==1){
					$("#chkAbnormalityRespiratory").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDyspnea==1){
					$("#chkDyspnea").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkWheezes==1){
					$("#chkWheezes").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkAsymmetric==1){
					$("#chkAsymmetric").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkCough==1){
					$("#chkCough").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSputum==1){
					$("#chkSputum").prop("checked", "checked");
				}
				$("#txtOtherRespiratory").val(response.listpediatric2[0].txtOtherRespiratory);
				if(response.listpediatric2[0].chkOtherRespiratory==1){
					$("#chkOtherRespiratory").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkAbnormalityCardioVascular==1){
					$("#chkAbnormalityCardioVascular").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkTachycardia==1){
					$("#chkTachycardia").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkBradycardia==1){
					$("#chkBradycardia").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkEdema==1){
					$("#chkEdema").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkFacial_Pedal==1){
					$("#chkFacial_Pedal").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSacral==1){
					$("#chkSacral").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkGeneralized==1){
					$("#chkGeneralized").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkCardioOther==1){
					$("#chkCardioOther").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkAbnormalityGastrointestinal==1){
					$("#chkAbnormalityGastrointestinal").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDistention==1){
					$("#chkDistention").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkRigidity==1){
					$("#chkRigidity").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDysphagia==1){
					$("#chkDysphagia").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDiarrhoea==1){
					$("#chkDiarrhoea").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkConstipation==1){
					$("#chkConstipation").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkLast==1){
					$("#chkLast").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkGastrointestinalOther==1){
					$("#chkGastrointestinalOther").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkAbnormalityGenitourinary==1){
					$("#chkAbnormalityGenitourinary").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDysuria==1){
					$("#chkDysuria").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkHematuria==1){
					$("#chkHematuria").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkHesitancy==1){
					$("#chkHesitancy").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkFrequent==1){
					$("#chkFrequent").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkCatheter==1){
					$("#chkCatheter").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkGenitourinaryOther==1){
					$("#chkGenitourinaryOther").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkMenstrual==1){
					$("#chkMenstrual").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkPregnancy==1){
					$("#chkPregnancy").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkLMP==1){
					$("#chkLMP").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkGenitourinaryFemaleOther==1){
					$("#chkGenitourinaryFemaleOther").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkAbnormalityNeurology==1){
					$("#chkAbnormalityNeurology").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkComatose==1){
					$("#chkComatose").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSemi_Comatose==1){
					$("#chkSemi_Comatose").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkNeurologyParalysed==1){
					$("#chkNeurologyParalysed").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSedated==1){
					$("#chkSedated").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkLathargic==1){
					$("#chkLathargic").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkConfused==1){
					$("#chkConfused").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkUnsteady==1){
					$("#chkUnsteady").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkNeurologyOther==1){
					$("#chkNeurologyOther").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkAbnormalitySkin_Extremities==1){
					$("#chkAbnormalitySkin_Extremities").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkProsthesis==1){
					$("#chkProsthesis").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSwelling==1){
					$("#chkSwelling").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkClubbing==1){
					$("#chkClubbing").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkCyanosis==1){
					$("#chkCyanosis").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkDeformity==1){
					$("#chkDeformity").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkPoor_Turgor==1){
					$("#chkPoor_Turgor").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSkin_ExtremitiesHot==1){
					$("#chkSkin_ExtremitiesHot").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSkin_ExtremitiesCool==1){
					$("#chkSkin_ExtremitiesCool").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSkin_ExtremitiesOther==1){
					$("#chkSkin_ExtremitiesOther").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkReferralDiet==1){
					$("#chkDiet11").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkPhysiotherapy==1){
					$("#chkPhysiotherapy").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkYoga==1){
					$("#chkYoga").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkSkin_ExtremitiesOther==1){
					$("#chkSkin_ExtremitiesOther").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkCounseler==1){
					$("#chkCounseler").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkReferralsPain_Management==1){
					$("#chkReferralsPain_Management").prop("checked", "checked");
				}
				if(response.listpediatric2[0].chkReferralsOther==1){
					$("#chkReferralsOther").prop("checked", "checked");
				}
				$("#txtAreaAssessemntPlan").val(response.listpediatric2[0].txtAreaAssessemntPlan);
				$("#txtAreaNursing_DiagnosisPlan").val(response.listpediatric2[0].txtAreaNursing_DiagnosisPlan);
				$("#txtAreaPlanningNursing").val(response.listpediatric2[0].txtAreaPlanningNursing);
				$("#txtAreaInterventionNursing").val(response.listpediatric2[0].txtAreaInterventionNursing);
				$("#txtAreaEvaluationPlan").val(response.listpediatric2[0].txtAreaEvaluationPlan);
			}
		});
}


function saveRestraintAssessmentForm(){
	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
    var idForpediatric3 = $("#idForpediatric3").val();
    var chkBehaviourRestraint = $('input:checkbox[id=chkBehaviourRestraint]');
    var chkIv = $('input:checkbox[id=chkIv]');
    var chkVoluntary = $('input:checkbox[id=chkVoluntary]');
    var chkUnfollowInstructions = $('input:checkbox[id=chkUnfollowInstructions]');
    var chkInitiationOthers = $('input:checkbox[id=chkInitiationOthers]');
    var chkVerbalIntervention = $('input:checkbox[id=chkVerbalIntervention]');
    var chkCompanionship = $('input:checkbox[id=chkCompanionship]');
    var chkFrequentMonitoring = $('input:checkbox[id=chkFrequentMonitoring]');
    var chkcomfort = $('input:checkbox[id=chkcomfort]');
    var chkReality = $('input:checkbox[id=chkReality]');
    var chkEnviromental = $('input:checkbox[id=chkEnviromental]');
    var chkRelaxation = $('input:checkbox[id=chkRelaxation]');
    var txtNameOfPersonContacted = $("#txtNameOfPersonContacted").val();
    var txtRelationWithPatient = $("#txtRelationWithPatient").val();
    var TimeEducation = $("#TimeEducation").val();
    var chkSoftWrist = $('input:checkbox[id=chkSoftWrist]');
    var chkSoftWristLeft = $('input:checkbox[id=chkSoftWristLeft]');
    var chkSoftWristRight = $('input:checkbox[id=chkSoftWristRight]');
    var chkSoftWristBoth = $('input:checkbox[id=chkSoftWristBoth]');
    var chkSoftAnkle = $('input:checkbox[id=chkSoftAnkle]');
    var chkSoftAnkleLeft = $('input:checkbox[id=chkSoftAnkleLeft]');
    var chkSoftAnkleRight = $('input:checkbox[id=chkSoftAnkleRight]');
    var chkSoftAnkleBoth = $('input:checkbox[id=chkSoftAnkleBoth]');
    var txtChemical = $("#txtChemical").val();
    var txtDrugs = $("#txtDrugs").val();
    var txtDose = $("#txtDose").val();
    var txtRestraintsName = $("#txtRestraintsName").val();
    var txtConsultant_Doctor = $("#txtConsultant_Doctor").val();
    var datePickForDoc = $("#datePickForDoc").val();
    var DocTme = $("#DocTme").val();
    var txtPrimaryNurse = $("#txtPrimaryNurse").val();
    var datePickForNurse = $("#datePickForNurse").val();
    var NurseTme = $("#NurseTme").val();
    var chkNone = $('input:checkbox[id=chkNonee]');
    var chkRedness = $('input:checkbox[id=chkRednes]');
    var chkSwelling = $('input:checkbox[id=chkSwlng]');
    var chkInjur = $('input:checkbox[id=chkInjur]');
    var chkCompliPresScr = $('input:checkbox[id=chkCompliPresScr]');
    var chkComplicationBodyTemprature = $('input:checkbox[id=chkComplicationBodyTemprature]');
    var chkComplicationOther = $('input:checkbox[id=chkComplicationOther]');
    var datePickFo = $("#datePickFo").val();
    var Time010 = $("#Time010").val();
    var txtAreaRemaar = $("#txtAreaRemaar").val();
    var chkTreatmenModif = $('input:checkbox[id=chkTreatmenModif]');
    var VBFRData007= "";
    var StaffInterventionData="";
    
    if(chkBehaviourRestraint.is(':checked') == true){
    	chkBehaviourRestraint = 1;
    }else{
    	chkBehaviourRestraint = 0;
    }
    
    if(chkIv.is(':checked') == true){
    	chkIv = 1;
    }else{
    	chkIv = 0;
    }
    if(chkVoluntary.is(':checked') == true){
    	chkVoluntary = 1;
    }else{
    	chkVoluntary = 0;
    }
    if(chkUnfollowInstructions.is(':checked') == true){
    	chkUnfollowInstructions = 1;
    }else{
    	chkUnfollowInstructions = 0;
    }
    if(chkInitiationOthers.is(':checked') == true){
    	chkInitiationOthers = 1;
    }else{
    	chkInitiationOthers = 0;
    }
    if(chkVerbalIntervention.is(':checked') == true){
    	chkVerbalIntervention = 1;
    }else{
    	chkVerbalIntervention = 0;
    }
    if(chkCompanionship.is(':checked') == true){
    	chkCompanionship = 1;
    }else{
    	chkCompanionship = 0;
    }
    if(chkFrequentMonitoring.is(':checked') == true){
    	chkFrequentMonitoring = 1;
    }else{
    	chkFrequentMonitoring = 0;
    }
    if(chkcomfort.is(':checked') == true){
    	chkcomfort = 1;
    }else{
    	chkcomfort = 0;
    }
    if(chkReality.is(':checked') == true){
    	chkReality = 1;
    }else{
    	chkReality = 0;
    }
    if(chkEnviromental.is(':checked') == true){
    	chkEnviromental = 1;
    }else{
    	chkEnviromental = 0;
    }
    if(chkRelaxation.is(':checked') == true){
    	chkRelaxation = 1;
    }else{
    	chkRelaxation = 0;
    }
     if(chkSoftWrist.is(':checked') == true){
    	chkSoftWrist = 1;
    }else{
    	chkSoftWrist = 0;
    }
    if(chkSoftWristLeft.is(':checked') == true){
    	chkSoftWristLeft = 1;
    }else{
    	chkSoftWristLeft = 0;
    }
     if(chkSoftWristRight.is(':checked') == true){
    	chkSoftWristRight = 1;
    }else{
    	chkSoftWristRight = 0;
    }
     if(chkSoftWristBoth.is(':checked') == true){
    	chkSoftWristBoth = 1;
    }else{
    	chkSoftWristBoth = 0;
    }
    if(chkSoftAnkle.is(':checked') == true){
    	chkSoftAnkle = 1;
    }else{
    	chkSoftAnkle = 0;
    }
    if(chkSoftAnkleLeft.is(':checked') == true){
    	chkSoftAnkleLeft = 1;
    }else{
    	chkSoftAnkleLeft = 0;
    }
    if(chkSoftAnkleRight.is(':checked') == true){
    	chkSoftAnkleRight = 1;
    }else{
    	chkSoftAnkleRight = 0;
    }
    if(chkSoftAnkleBoth.is(':checked') == true){
    	chkSoftAnkleBoth = 1;
    }else{
    	chkSoftAnkleBoth = 0;
    }
    
    if(chkNone.is(':checked') == true){
    	chkNone = 1;
    }else{
    	chkNone = 0;
    }
    if(chkRedness.is(':checked') == true){
    	chkRedness = 1;
    }else{
    	chkRedness = 0;
    }
    if(chkSwelling.is(':checked') == true){
    	chkSwelling = 1;
    }else{
    	chkSwelling = 0;
    }
    if(chkInjur.is(':checked') == true){
    	chkInjur = 1;
    }else{
    	chkInjur = 0;
    }
    if(chkCompliPresScr.is(':checked') == true){
    	chkCompliPresScr = 1;
    }else{
    	chkCompliPresScr = 0;
    }
    if(chkComplicationBodyTemprature.is(':checked') == true){
    	chkComplicationBodyTemprature = 1;
    }else{
    	chkComplicationBodyTemprature = 0;
    }
    if(chkComplicationOther.is(':checked') == true){
    	chkComplicationOther = 1;
    }else{
    	chkComplicationOther = 0;
    }
    if(chkTreatmenModif.is(':checked') == true){
    	chkTreatmenModif = 1;
    }else{
    	chkTreatmenModif = 0;
    }
 
    var addRowCountvbfr = $("#vbfrRow").val();
    for(var i=1;i<=addRowCountvbfr;i++){
    	
    	var time007 = "";
    	var name007 ="";
    	var nurse007 ="";
    	var doctor007 ="";
    	var duration007 ="";
    	var verbalId ="";
    	
    	time007 =$("#vbfrTime"+i).val();
    	name007 =$("#vbfrConsultant"+i).val();
    	nurse007 =$("#vbfrNurse"+i).val();
    	doctor007 =$("#vbfrDutyDoctor"+i).val();
    	duration007 =$("#vbfrDuration"+i).val();
    	verbalId =$("#vbId"+i).val();
    	if((time007 != "" && name007 != "" && nurse007 != "" && doctor007 != "" && duration007 != "" )&&(
    			time007 != undefined && name007 != undefined && nurse007 !=undefined && doctor007 != undefined && duration007 != undefined ))
    	{
    		VBFRData007 = VBFRData007+ time007+"_"+name007+"_"+nurse007+"_"+doctor007+"_"+duration007+"_"+verbalId+"#";
    	}
    	
    }
    var rowCount001 = $("#StaffInterventionRow").val();
    
    for(var i=1;i<=rowCount001;i++){
    	var shift001 = "";
    	var time001 ="";
    	var behaviour001 ="";
    	var intervention001 ="";
    	var remarks001 ="";
    	var interId ="";
    	
    	shift001 =$("#shiftRw"+i).val();
    	time001 =$("#shiftT"+i).val();
    	behaviour001 =$("#shiftBehav"+i).val();
    	intervention001 =$("#shiftInterven"+i).val();
    	remarks001 =$("#shiftRemarrk"+i).val();
    	interId =$("#InterId"+i).val();
    	
    	if((shift001 != "" && time001 != "" && behaviour001 != "" && intervention001 != "" && remarks001 != "" )&&(
    			shift001 != undefined && time001 !=undefined && behaviour001 !=undefined && intervention001 != undefined && remarks001 != undefined))
    	{
    		StaffInterventionData = StaffInterventionData +shift001+"_"+time001+"_"+behaviour001+"_"+intervention001+"_"+remarks001+"_"+interId+"#";
    	}
    	
    }
    var assessmentpediatric3 = {
    		listpediatric3 : []
        };
    assessmentpediatric3.listpediatric3.push({
    			pId:patId,
    			tId : treatId,
    			idnursing_assessment_paediatric_page_three : idForpediatric3,
    			chkBehaviourRestraint: chkBehaviourRestraint,
    		    chkIv: chkIv,
    		    chkVoluntary: chkVoluntary,
    		    chkUnfollowInstructions: chkUnfollowInstructions,
    		    chkInitiationOthers: chkInitiationOthers,
    		    chkVerbalIntervention: chkVerbalIntervention,
    		    chkCompanionship: chkCompanionship,
    		    chkFrequentMonitoring: chkFrequentMonitoring,
    		    chkcomfort: chkcomfort,
    		    chkReality: chkReality,
    		    chkEnviromental: chkEnviromental,
    		    chkRelaxation: chkRelaxation,
    		    txtNameOfPersonContacted: txtNameOfPersonContacted,
    		    txtRelationWithPatient: txtRelationWithPatient,
    		    timeEducation: TimeEducation,
    		    chkSoftWrist: chkSoftWrist,
    		    chkSoftWristLeft: chkSoftWristLeft,
    		    chkSoftWristRight: chkSoftWristRight,
    		    chkSoftWristBoth: chkSoftWristBoth,
    		    chkSoftAnkle: chkSoftAnkle,
    		    chkSoftAnkleLeft: chkSoftAnkleLeft,
    		    chkSoftAnkleRight: chkSoftAnkleRight,
    		    chkSoftAnkleBoth: chkSoftAnkleBoth,
    		    txtChemical: txtChemical,
    		    txtDrugs: txtDrugs,
    		    txtDose: txtDose,
    		    txtRestraintsName: txtRestraintsName,
    		    txtConsultant_Doctor: txtConsultant_Doctor,
    		    datePickForDoc: datePickForDoc,
    		    docTme: DocTme,
    		    txtPrimaryNurse: txtPrimaryNurse,
    		    datePickForNurse: datePickForNurse,
    		    nurseTme: NurseTme,
    		    chkNone: chkNone,
    		    chkRedness: chkRedness,
    		    chkSwelling: chkSwelling,
    		    chkInjur: chkInjur,
    		    chkCompliPresScr: chkCompliPresScr,
    		    chkComplicationBodyTemprature: chkComplicationBodyTemprature,
    		    chkComplicationOther: chkComplicationOther,
    		    datePickFo: datePickFo,
    		    time010: Time010,
    		    txtAreaRemaar: txtAreaRemaar,
    		    chkTreatmenModif: chkTreatmenModif,
    		    vBFRData007: VBFRData007,
    		    staffInterventionData: StaffInterventionData
    	 
    });
    
    assessmentpediatric3 = JSON.stringify(assessmentpediatric3);
    var inputs = [];
    inputs.push('assessmentpediatric3=' + assessmentpediatric3);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/saveAssessmentPediatric3",
	
		success : function(r) {
			alert(r);
			fetchInitalNursingAssessmentPagethree();
        }
    });
}


var intCount =0;
var InterventionListTemp ='{#foreach $T.interventionList as list}<tr id="RowCountStaffRow{++intCount}"><td class="col-md-1"><input type="text" data-toggle="tooltip" title="Morning/Evening/Night" class="form-control input-SmallText" id="shiftRw'
    +'{intCount}" value="{$T.list.shiftInven}"  /></td>'
    + '<td class="col-md-1"><input type="text" readonly="readonly" onclick="setTimeForStaff({intCount})" class="form-control input-SmallText" id="shiftT'
    + '{intCount}" value="{$T.list.timeInven}" ></td>'
    + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="shiftBehav'
    + '{intCount}"  value="{$T.list.behaviourInven}" ></td>'
    + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="shiftInterven'
    + '{intCount}" value="{$T.list.intervention}" ></td>'
    + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="shiftRemarrk'
    + '{intCount}" value="{$T.list.remarksInven}" ></td>'
    + '<td class="col-md-1"><input  class="checkVBFR" type="checkbox" value="" id="shftCheck" name="shftCheck'
    + '{intCount}" ><input type="hidden" value="{intCount}" id="vbShiId{intCount}" /><input type="hidden" value="{$T.list.idIntervention}" id="InterId{intCount}" />'
    +'<input type="button" onclick="setInterventionAndBehavior()" value="set" style="float: right;"></td></tr>{#/for}';



var intCoun =0;
var VerbalListTemp ='{#foreach $T.verbalList as list1}<tr id="RowCountvbfrRow{++intCoun}"><td class="col-md-1"><input type="text" readonly="readonly" onclick= "setTimeForVBFR({intCoun})" class="form-control input-SmallText" id="vbfrTime'
	+ '{intCoun}" value="{$T.list1.timeForVerbal}"/></td>'
	+ '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="vbfrConsultant'
	+ '{intCoun}" value="{$T.list1.consultingNameForVerbal}"  ></td>'
	+ '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="vbfrNurse'
	+ '{intCoun}" value="{$T.list1.primiaryNurseVerbal}"  ></td>'
	+ '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="vbfrDutyDoctor'
	+ '{intCoun}" value="{$T.list1.doctorVerbal}"  ></td>'
	+ '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="vbfrDuration'
	+ '{intCoun}" value="{$T.list1.durationVerbal}"  ></td>'
	+ '<td class="col-md-1"><input  class="checkVBFR" type="checkbox" value="" id="VBFRcheck" name="VBFRcheck'
	+ '{intCoun}"  ><input type="hidden" value="{$T.list1.idVerbal}" id="vbId{intCoun}" /></td></tr>{#/for}';



var vbfrRwCount =1;
function createRowVBFR(){
	
		var rowCount = $("#vbfrRow").val();
	    var addrowottCount = $("#addRowCountvbfr").val();

	    if (rowCount == -1) {
	        rowCount = 0;
	    }
	    rowCount++;
	    rowId = "RowCountvbfrRow" + rowCount;
	    var x = document.createElement('tr');
	    x.setAttribute('id', rowId);
	    document.getElementById("vbfrTableBody").appendChild(x);

	    document.getElementById(rowId).innerHTML =
	             '<td class="col-md-1"><input type="text" readonly="readonly" onclick= "setTimeForVBFR('+rowCount+')" class="form-control input-SmallText" id="vbfrTime'
	            + rowCount    + '"/></td>'
	            + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="vbfrConsultant'
	            + rowCount+ '"  ></td>'
	            + '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="vbfrNurse'
	            + rowCount+ '"  ></td>'
	            + '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="vbfrDutyDoctor'
	            + rowCount+ '"  ></td>'
	            + '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="vbfrDuration'
	            + rowCount+ '"  ></td>'
	            + '<td class="col-md-1"><input  class="checkVBFR" type="checkbox" value="" id="VBFRcheck" name="VBFRcheck'
	            + rowCount+ '"  ><input type="hidden" value="0" id="vbId'+ rowCount+ '" /></td>';

	    $("#vbfrRow").val(rowCount);
	    $("#addRowCountvbfr").val(vbfrRwCount);
	    vbfrRwCount++;
	 
}

function removeRowVBFR(){
	
    var nRowrowCount = $("#vbfrRow").val();
    if (nRowrowCount == "0") {
        alert("No Data in CheckList");
        return false;
    }
    var allVals = [];
    var flag = false;
    
    $.each($('#VBFRcheck:checked'), function() {
        allVals.push($(this).val());
        flag = true;
    });

    if (!flag) {
        alert("please check the checbox...");
        return false;
    }

    var rowCount = $("#vbfrRow").val();// $("#InvRowCount").val();
    var addrowottCount = $("#addRowCountvbfr").val();
    
    var count = rowCount - addrowottCount;
    var totalRowCount = (Number(rowCount) + Number(addrowottCount));
    var p = 1;
    var ids="";
    var id ="";
    for ( var i = 1; i <= totalRowCount; i++) {
        var $radios = $('input:checkbox[name=VBFRcheck' + i + ']');
        if ($radios.is(':checked') == true) {
            id =$("#vbId"+i).val();
            if(id != ""){
            	ids+= id +"_";	
            }
            $("#RowCountvbfrRow" + i + "").remove();
            $("#vbfrRow").val(--rowCount);
            
        } 
    }
    
	    var inputs = [];
	    inputs.push('idVerbal=' + ids);
		var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/deleteVerbalRow",
		
		
		success : function(response) {
			alert(response);
			alertify.success(response);
			fetchInitalNursingAssessmentPagethree();
		}
	});
}

function setTimeForVBFR(id){
	
	$('#vbfrTime'+id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
}


var staffCount =1;
function RowAddition(){
	

	var rowCount = $("#StaffInterventionRow").val();
    var addrowottCount = $("#addRowCountStaffIntervention").val();

    if (rowCount == -1) {
        rowCount = 0;
    }
    rowCount++;
    rowId = "RowCountStaffRow" + rowCount;
    var x = document.createElement('tr');
    x.setAttribute('id', rowId);
    document.getElementById("StaffInterventionTableBody").appendChild(x);

    document.getElementById(rowId).innerHTML =
             '<td class="col-md-1"><input type="text" data-toggle="tooltip" title="Morning/Evening/Night" class="form-control input-SmallText" id="shiftRw'
            + rowCount    + '"/></td>'
            + '<td class="col-md-1"><input type="text" readonly="readonly" onclick="setTimeForStaff('+rowCount +')" class="form-control input-SmallText" id="shiftT'
            + rowCount+ '"  ></td>'
            + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="shiftBehav'
            + rowCount+ '"  ></td>'
            + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="shiftInterven'
            + rowCount+ '"  ></td>'
            + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="shiftRemarrk'
            + rowCount+ '"  ></td>'
            + '<td class="col-md-1"><input  class="checkVBFR" type="checkbox" value="" id="shftCheck" name="shftCheck'
            + rowCount+ '" ><input type="hidden" value="'+rowCount+'" id="vbShiId'+ rowCount+ '" /><input type="hidden" value="0" id="InterId'+ rowCount+ '" />'
            +'<input type="button" onclick="setInterventionAndBehavior('+rowCount+')" value="set" style="float: right;"></td>';

    $("#StaffInterventionRow").val(rowCount);
    $("#addRowCountStaffIntervention").val(staffCount);
    staffCount++;
	
}


function RowDeletion(){
	
    var nRowrowCount = $("#StaffInterventionRow").val();
    if (nRowrowCount == "0") {
        alert("No Data in CheckList");
        return false;
    }
    var allVals = [];
    var flag = false;
    
    $.each($('#shftCheck:checked'), function() {
        allVals.push($(this).val());
        flag = true;
    });

    if (!flag) {
        alert("please check the checbox...");
        return false;
    }

    var rowCount = $("#StaffInterventionRow").val();// $("#InvRowCount").val();
    var addrowottCount = $("#addRowCountStaffIntervention").val();
    
    var count = rowCount - addrowottCount;
    var totalRowCount = (Number(rowCount) + Number(addrowottCount));
    var p = 1;
    var ids="";
    var id ="";
    for ( var i = 1; i <= totalRowCount; i++) {
        var $radios = $('input:checkbox[name=shftCheck' + i + ']');
        if ($radios.is(':checked') == true) {
            id =$("#InterId"+i).val();
            if(id != ""){
            	ids+= id +"_";	
            }
            $("#RowCountStaffRow" + i + "").remove();
            $("#StaffInterventionRow").val(--rowCount);
            
        }
    }
    var inputs = [];
    
    inputs.push('idIntervention=' + ids);
	var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/deleteInterventionRow",
	
		success : function(response) {
			fetchInitalNursingAssessmentPagethree();
		}
	});
}

function setTimeForStaff(id){
	
	$('#shiftT'+id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
}



function setInterventionAndBehavior(no){

	
	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
   var inventionValues ="";
    var conditionValues ="";
    
    var checkedInventions = document.getElementsByClassName('StaffInterventionClass');
    var checkedConditions = document.getElementsByClassName('PatientBehavior');
    
    for(var i=0; checkedInventions[i]; ++i){
        if(checkedInventions[i].checked){
        	inventionValues = inventionValues + checkedInventions[i].value +",";
        }
    }
    
    for(var i=0; checkedConditions[i]; ++i){
        if(checkedConditions[i].checked){
            conditionValues = conditionValues + checkedConditions[i].value +",";
        }
    }
    $("#shiftBehav"+no).val(conditionValues);
    $("#shiftInterven"+no).val(inventionValues);

    chkSkinCirculation.checked = false;
    chkNutritionHydration.checked = false;
    chkEliminationAddressed.checked = false;
    chkRestraintCheck.checked = false;
    chkRangeMotion.checked = false;
    chkHygieneCare.checked = false;
    chkVerbalInerac.checked = false;
    chkPositionAdjus.checked = false;
    chkSeeProgressNote.checked = false;
    chkConsultantNoti.checked = false;
    chkExplanationGiven.checked = false;
    chkCriteriaForRemoval.checked = false;
    chkOrderMet.checked = false;
    chkOrderNotMet.checked = false;
    chkOtherRestraint.checked = false;
    
    chkAgitated.checked = false;
    chkHallucinate.checked = false;
    chkSelfInj.checked = false;
    chkConfu.checked = false;
    chkShouting.checked = false;
    chkCooper.checked = false;
    chkNonCooper.checked = false;
    chkRestless.checked = false;
    chkCalm.checked = false;
    chkDelirium.checked = false;
    chkIncontinent.checked = false;
    chkCriteriaSleeping.checked = false;
    chkDisruptTherapies.checked = false;
    chkOrderPatientBehaviour.checked = false;
    
}

function fetchInitalNursingAssessmentPagethree(){
	
	var patId = $("#pid").val();
    var treatId = $("#tr_Id").val();
    var inputs = [];
    inputs.push('pId=' + patId);
    inputs.push('tId=' + treatId);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/fetchInitalNursing3",
	
	
			success : function(response) {
				intCoun =0;
				intCount =0;
				$("#idForpediatric3").val(response.listpediatric3[0].idnursing_assessment_paediatric_page_three);
				
				if(response.listpediatric3[0].chkBehaviourRestraint==1){
					$("#chkBehaviourRestraint").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkIv==1){
					$("#chkIv").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkVoluntary==1){
					$("#chkVoluntary").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkUnfollowInstructions==1){
					$("#chkUnfollowInstructions").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkInitiationOthers==1){
					$("#chkInitiationOthers").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkVerbalIntervention==1){
					$("#chkVerbalIntervention").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkCompanionship==1){
					$("#chkCompanionship").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkFrequentMonitoring==1){
					$("#chkFrequentMonitoring").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkcomfort==1){
					$("#chkcomfort").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkReality==1){
					$("#chkReality").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkEnviromental==1){
					$("#chkEnviromental").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkRelaxation==1){
					$("#chkRelaxation").prop("checked", "checked");
				}
				$("#txtNameOfPersonContacted").val(response.listpediatric3[0].txtNameOfPersonContacted);
				$("#txtRelationWithPatient").val(response.listpediatric3[0].txtRelationWithPatient);
				$("#TimeEducation").val(response.listpediatric3[0].timeEducation);
				if(response.listpediatric3[0].chkSoftWrist==1){
					$("#chkSoftWrist").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSoftWristLeft==1){
					$("#chkSoftWristLeft").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSoftWristRight==1){
					$("#chkSoftWristRight").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSoftWristBoth==1){
					$("#chkSoftWristBoth").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSoftAnkle==1){
					$("#chkSoftAnkle").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSoftAnkleLeft==1){
					$("#chkSoftAnkleLeft").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSoftAnkleRight==1){
					$("#chkSoftAnkleRight").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSoftAnkleBoth==1){
					$("#chkSoftAnkleBoth").prop("checked", "checked");
				}
				$("#txtChemical").val(response.listpediatric3[0].txtChemical);
				$("#txtDrugs").val(response.listpediatric3[0].txtDrugs);
				$("#txtDose").val(response.listpediatric3[0].txtDose);
				$("#txtRestraintsName").val(response.listpediatric3[0].txtRestraintsName);
				$("#txtConsultant_Doctor").val(response.listpediatric3[0].txtConsultant_Doctor);
				$("#datePickForDoc").val(response.listpediatric3[0].datePickForDoc);
				$("#DocTme").val(response.listpediatric3[0].docTme);
				$("#txtPrimaryNurse").val(response.listpediatric3[0].txtPrimaryNurse);
				$("#datePickForNurse").val(response.listpediatric3[0].datePickForNurse);
				$("#NurseTme").val(response.listpediatric3[0].nurseTme);
				if(response.listpediatric3[0].chkNone==1){
					$("#chkNonee").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkRedness==1){
					$("#chkRednes").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkSwelling==1){
					$("#chkSwlng").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkInjur==1){
					$("#chkInjur").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkCompliPresScr==1){
					$("#chkCompliPresScr").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkComplicationBodyTemprature==1){
					$("#chkComplicationBodyTemprature").prop("checked", "checked");
				}
				if(response.listpediatric3[0].chkComplicationOther==1){
					$("#chkComplicationOther").prop("checked", "checked");
				}
				$("#datePickFo").val(response.listpediatric3[0].datePickFo);
				$("#Time010").val(response.listpediatric3[0].time010);
				$("#txtAreaRemaar").val(response.listpediatric3[0].txtAreaRemaar);
				
				if(response.listpediatric3[0].chkTreatmenModif==1){
					$("#chkTreatmenModif").prop("checked", "checked");
				}
				
				$("#StaffInterventionTableBody").setTemplate(InterventionListTemp);
				$("#StaffInterventionTableBody").processTemplate(response);
				$("#StaffInterventionRow").val(response.interventionList.length);
				$("#vbfrTableBody").setTemplate(VerbalListTemp);
				$("#vbfrTableBody").processTemplate(response);
				$("#vbfrRow").val(response.verbalList.length);
				
			}
		});
}



function savePrePostChecklist(){
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var idForop1 = $("#idForop1").val();
    var diagnosis = $("#diagnosisId").val();
	var planedSurgery = $("#surgeryId").val();
	var prosthesis = $("#ProsId").val();
	var implants = $("#ImplId").val();
	var preTime = $("#preTimeId").val();
	var postTime = $("#postTimeId").val();
	
	var preOT2 = $('input[name=bandNameRadio]:checked').val();
	if(preOT2==undefined)
	{
		preOT2 = "0";
	}
	var afterOT2 = $('input[name=IdentificationName]:checked').val();
	if(afterOT2==undefined)
	{
		afterOT2 = "0";
	}
	var preOT3 = $('input[name=htNameRadio]:checked').val();
	if(preOT3==undefined)
	{
		preOT3 = "0";
	}
	var afterOT3 = $('input[name=wtNameRadio]:checked').val();
	if(afterOT3==undefined)
	{
		afterOT3 = "0";
	}
	var preOT4 = $('input[name=preOpNameRadio]:checked').val();
	if(afterOT4==undefined)
	{
		afterOT4 = "0";
	}
	var afterOT4 = $('input[name=preOperationNameRadio]:checked').val();
	if(afterOT4==undefined)
	{
		afterOT4 = "0";
	}
	var preOT5 = $('input[name=postNameRadio]:checked').val();
	if(preOT5==undefined)
	{
		preOT5 = "0";
	}
	var afterOT5 = $('input[name=icuNameRadio1]:checked').val();
	if(afterOT5==undefined)
	{
		afterOT5 = "0";
	}
	var preOT6 = $('input[name=surgeryNameRadio]:checked').val();
	if(preOT6==undefined)
	{
		preOT6 = "0";
	}
	var afterOT6 = $('input[name=surgicalNameRadio]:checked').val();
	if(afterOT6==undefined)
	{
		afterOT6 = "0";
	}
	var preOT7 = $('input[name=specificNameRadio]:checked').val();
	if(preOT7==undefined)
	{
		preOT7 = "0";
	}
	var afterOT7 = $('input[name=specificCkNameRadio]:checked').val();
	if(afterOT7==undefined)
	{
		afterOT7 = "0";
	}
	var preOT8 = $('input[name=wardCkNameRadio]:checked').val();
	if(afterOT8==undefined)
	{
		afterOT8 = "0";
	}
	var afterOT8 = $('input[name=consentNameRadio]:checked').val();
	if(afterOT8==undefined)
	{
		afterOT8 = "0";
	}
	var preOT9= $('input[name=anesthesiaNameRadio]:checked').val();
	if(preOT9==undefined)
	{
		preOT9 = "0";
	}
	var afterOT9 = $('input[name=anesthesiaRecNameRadio]:checked').val();
	if(afterOT9==undefined)
	{
		afterOT9 = "0";
	}
	var preOT10 = $('input[name=testIdckNameRadio]:checked').val();
	if(preOT10==undefined)
	{
		preOT10 = "0";
	}
	var afterOT10 = $('input[name=testIdNameRadio]:checked').val();
	if(afterOT10==undefined)
	{
		afterOT10 = "0";
	}
	var preOT11 = $('input[name=RBSLNameRadio]:checked').val();
	if(preOT11==undefined)
	{
		preOT11 = "0";
	}
	var afterOT11 = $('input[name=RBSLckNameRadio]:checked').val();
	if(afterOT11==undefined)
	{
		afterOT11 = "0";
	}
	var preOT12 = $('input[name=pathologyNameRadio]:checked').val();
	if(preOT12==undefined)
	{
		preOT12 = "0";
	}
	var afterOT12 = $('input[name=pathologyckNameRadio]:checked').val();
	if(afterOT12==undefined)
	{
		afterOT12 = "0";
	}
	var preOT13 = $('input[name=labNameRadio]:checked').val();
	if(preOT13==undefined)
	{
		preOT13 = "0";
	}
	var afterOT13 = $('input[name=labckNameRadio]:checked').val();
	if(afterOT13==undefined)
	{
		afterOT13 = "0";
	}
	var preOT14 = $('input[name=multipraNameRadio]:checked').val();
	if(preOT14==undefined)
	{
		preOT14 = "0";
	}
	var afterOT14 = $('input[name=multiprackNameRadio]:checked').val();
	if(afterOT14==undefined)
	{
		afterOT14 = "0";
	}
	var preOT15 = $('input[name=solidsNameRadio]:checked').val();
	if(preOT15==undefined)
	{
		preOT15 = "0";
	}
	var afterOT15 = $('input[name=NBMNameRadio]:checked').val();
	if(afterOT15==undefined)
	{
		afterOT15 = "0";
	}
	var preOT16 = $('input[name=pre-OpNameRadio]:checked').val();
	if(preOT16==undefined)
	{
		preOT16 = "0";
	}
	var afterOT16 = $('input[name=icuNameRadio111]:checked').val();
	if(afterOT16==undefined)
	{
		afterOT16 = "0";
	}
	var preOT17 = $('input[name=medicationsNameRadio]:checked').val();
	if(preOT17==undefined)
	{
		preOT17 = "0";
	}
	var afterOT17 = $('input[name=medicationNameRadio]:checked').val();
	if(afterOT17==undefined)
	{
		afterOT17 = "0";
	}
	var preOT18 = $('input[name=antibioticsIdNameRadio]:checked').val();
	if(preOT18==undefined)
	{
		preOT18 = "0";
	}
	var afterOT18 = $('input[name=antibioticsCkNameRadio]:checked').val();
	if(afterOT18==undefined)
	{
		afterOT18 = "0";
	}
	var preOT19 = $('input[name=skinNameRadio]:checked').val();
	if(preOT19==undefined)
	{
		preOT19 = "0";
	}
	var afterOT19 = $('input[name=icuNameRadio13]:checked').val();
	if(afterOT19==undefined)
	{
		afterOT19 = "0";
	}
	var preOT20 = $('input[name=radioNameRadio]:checked').val();
	if(preOT20==undefined)
	{
		preOT20 = "0";
	}
	var afterOT20 = $('input[name=checkNameRadio]:checked').val();
	if(afterOT20==undefined)
	{
		afterOT20 = "0";
	}
	var preOT21 = $('input[name=bloodArrangedNameRadio]:checked').val();
	if(preOT21==undefined)
	{
		preOT21 = "0";
	}
	var afterOT21 = $('input[name=bloodArrangedCheckNameRadio]:checked').val();
	if(afterOT21==undefined)
	{
		afterOT21 = "0";
	}
	var preOT22 = $('input[name=BloodTransfusionNameRadio]:checked').val();
	if(preOT22==undefined)
	{
		preOT22 = "0";
	}
	var afterOT22 = $('input[name=BloodNameRadio]:checked').val();
	if(afterOT22==undefined)
	{
		afterOT22 = "0";
	}
	var preOT23 = $('input[name=TransfusedNameRadio]:checked').val();
	if(preOT23==undefined)
	{
		preOT23 = "0";
	}
	var afterOT23 = $('input[name=TransfusedCheckNameRadio]:checked').val();
	if(afterOT23==undefined)
	{
		afterOT23 = "0";
	}
	var preOT24 = $('input[name=prosthesisNameRadio]:checked').val();
	if(preOT24==undefined)
	{
		preOT24 = "0";
	}
	var afterOT24 = $('input[name=prosthesisCheckNameRadio]:checked').val();
	if(afterOT24==undefined)
	{
		afterOT24 = "0";
	}
	var preOT25 = $('input[name=dentureNameRadio1]:checked').val();
	if(preOT25==undefined)
	{
		preOT25 = "0";
	}
	var afterOT25 = $('input[name=ImplantsNameRadio]:checked').val();
	if(afterOT25==undefined)
	{
		afterOT25 = "0";
	}
	var preOT26 = $('input[name=dentureNameRadio]:checked').val();
	if(preOT26==undefined)
	{
		preOT26 = "0";
	}
	var afterOT26 = $('input[name=spectaclesNameRadio]:checked').val();
	if(afterOT26==undefined)
	{
		afterOT26 = "0";
	}
	var preOT27 = $('input[name=jewlryNameRadio]:checked').val();
	if(preOT27==undefined)
	{
		preOT27 = "0";
	}
	var afterOT27 = $('input[name=wigNameRadio]:checked').val();
	if(afterOT27==undefined)
	{
		afterOT27 = "0";
	}
	
	var preOT28 = $('input[name=diagnosticNameRadio]:checked').val();
	if(preOT28==undefined)
	{
		preOT28 = "0";
	}
	var afterOT28 = $('input[name=X-rayNameRadio]:checked').val();
	if(afterOT28==undefined)
	{
		afterOT28 = "0";
	}
	
	var drugAllergies = $('input:checkbox[id=drugAllergiesId]');
	if(drugAllergies.is(':checked') == true){ 
		drugAllergies = 1;   
		}else{
			drugAllergies = 0;   
	   }     
	var allergies = $('input:checkbox[id=allergiesId]');
	if(allergies.is(':checked') == true){ 
		allergies = 1;   
		}else{
			allergies = 0;   
	   }
	var ht = $("#htId").val();
	var wt = $("#wtId").val();
	var preOpHr = $("#hrId").val();
	var preOpRr = $("#prId").val();
	var preOpSpo2 = $("#spo2Id").val();
	var preOpTemp = $("#tempId").val();
	var preOpBp = $("#bpId").val();
	var preOpBpprefix = $("#bpId3").val();
	var postOpHr = $("#postHrId").val();
	var postOpRr = $("#postId").val();
	var postOpSpo2 = $("#postSo2Id").val();
	var postOpTemp = $("#postTempid").val();
	var postOpBp = $("#postBpId").val();
	var postOpBpPrefix = $("#postBpId1").val();
	var preOxygen = $("#oxygenId1").val();
	var postOxygen = $("#oxygenId12").val();
	var HivTest = $('input[name=HivTest]:checked').val();
	if(HivTest==undefined)
	{
		HivTest = "0";
	}
	var HBsAgTest = $('input[name=HBsAgTest]:checked').val();
	if(HBsAgTest==undefined)
	{
		HBsAgTest = "0";
	}
	var HCVTest = $('input[name=HCVTest]:checked').val();
	if(HCVTest==undefined)
	{
		HCVTest = "0";
	}
	var VDRLTest = $('input[name=VDRLTest]:checked').val();
	if(VDRLTest==undefined)
	{
		VDRLTest = "0";
	}
	var MRSATest = $('input[name=MRSATest]:checked').val();
	if(MRSATest==undefined)
	{
		MRSATest = "0";
	}
	var preRBSL = $("#RBSLsId").val();
	var preRBSLAt = $("#RBSLAtId").val();
	var postRBSLs = $("#RBSLs1Id").val();
	var postRBSLAt = $("#RBSLAt1Id").val();
	var noSolidAfter = $("#icuId1").val();
	var noClearLiquidAfter = $("#icuId2").val();
	var NBM = $("#icuId3").val();
	var AB_Time = $("#AB_Time").val();
	var Enema_time = $("#Enema_Time").val();
	var componentType = $("#componentType").val();
	var componentUnit = $("#componentUnit").val();
	var transfusedUnit = $("#transfusedUnit").val();
	var preYes = $('input:checkbox[id=yesCheckId]');
	if(preYes.is(':checked') == true){ 
		preYes = 1;   
		}else{
			preYes = 0;   
	   }     
	var postyes = $('input:checkbox[id=yesCheckId1]');
	if(postyes.is(':checked') == true){ 
		postyes = 1;   
		}else{
			postyes = 0;   
	   }
	var Xray = $('input:checkbox[id=XrayId]');
	if(Xray.is(':checked') == true){ 
		Xray = 1;   
		}else{
			Xray = 0;   
	   }     
	var USG = $('input:checkbox[id=USGId]');
	if(USG.is(':checked') == true){ 
		USG = 1;   
		}else{
			USG = 0;   
	   }
	var ct = $('input:checkbox[id=ctId]');
	if(ct.is(':checked') == true){ 
		ct = 1;   
		}else{
			ct = 0;   
	   }     
	var pet_ct = $('input:checkbox[id=petId]');
	if(pet_ct.is(':checked') == true){ 
		pet_ct = 1;   
		}else{
			pet_ct = 0;   
	   }	
	var mri = $('input:checkbox[id=mriId]');
	if(mri.is(':checked') == true){ 
		mri = 1;   
		}else{
			mri	= 0;   
	   }     
	var mammo = $('input:checkbox[id=mammoId]');
	if(mammo.is(':checked') == true){ 
		mammo = 1;   
		}else{
			mammo = 0;   
	   }
	var ecg = $('input:checkbox[id=ecgId]');
	if(ecg.is(':checked') == true){ 
		ecg = 1;   
		}else{
			ecg = 0;   
	   }     
	var echo = $('input:checkbox[id=echoId]');
	if(echo.is(':checked') == true){ 
		echo = 1;   
		}else{
			echo = 0;   
	   } 
	
	var dentures = $('input:checkbox[id=dentId]');
	if(dentures.is(':checked') == true){ 
		dentures = 1;   
		}else{
			dentures = 0;   
	   }     
	var bridge = $('input:checkbox[id=bridgeId]');
	if(bridge.is(':checked') == true){ 
		bridge = 1;   
		}else{
			bridge = 0;   
	   }
	var spectacle = $('input:checkbox[id=spectId]');
	if(spectacle.is(':checked') == true){ 
		spectacle = 1;   
		}else{
			spectacle = 0;   
	   }     
	var contactLense = $('input:checkbox[id=contactlenseId]');
	if(contactLense.is(':checked') == true){ 
		contactLense = 1;   
		}else{
			contactLense = 0;   
	   }
	var hearingAid = $('input:checkbox[id=harId]');
	if(hearingAid.is(':checked') == true){ 
		hearingAid = 1;   
		}else{
			hearingAid = 0;   
	   }     
	var jewelry = $('input:checkbox[id=jewId]');
	if(jewelry.is(':checked') == true){ 
		jewelry = 1;   
		}else{
			jewelry = 0;   
	   }	
	var hairpins = $('input:checkbox[id=haringId]');
	if(hairpins.is(':checked') == true){ 
		hairpins = 1;   
		}else{
			hairpins = 0;   
	   }     
	var wig = $('input:checkbox[id=wId]');
	if(wig.is(':checked') == true){ 
		wig = 1;   
		}else{
			wig = 0;   
	   }   
	var PrePostDetails = {
			nursinAssesmentList : []
        };
	PrePostDetails.nursinAssesmentList.push({
    	pId:pId1,
    	tId : tId,
    	idpre_post_checklist : idForop1,
    	diagnosis: diagnosis,
    	planedSurgery: planedSurgery,
    	preOT2: preOT2,
    	afterOT2: afterOT2,
    	preOT3: preOT3,
    	afterOT3: afterOT3,
    	preOT4: preOT4,
    	afterOT4: afterOT4,
    	preOT5: preOT5,
    	afterOT5: afterOT5,
    	preOT6: preOT6,
    	afterOT6: afterOT6,
    	preOT7: preOT7,
    	afterOT7: afterOT7,
    	preOT8: preOT8,
    	afterOT8: afterOT8,
    	preOT9: preOT9,
    	afterOT9: afterOT9,
    	preOT10: preOT10,
    	afterOT10: afterOT10,
    	preOT11: preOT11,
    	afterOT11: afterOT11,
    	preOT12: preOT12,
    	afterOT12: afterOT12,
    	preOT13: preOT13,
    	afterOT13: afterOT13,
    	preOT14: preOT14,
    	afterOT14: afterOT14,
    	preOT15: preOT15,
    	afterOT15: afterOT15,
    	preOT16: preOT16,
    	afterOT16: afterOT16,
    	preOT17: preOT17,
    	afterOT17: afterOT17,
    	preOT18: preOT18,
    	afterOT18: afterOT18,
    	preOT19: preOT19,
    	afterOT19: afterOT19,
    	preOT20: preOT20,
    	afterOT20: afterOT20,
    	preOT21: preOT21,
    	afterOT21: afterOT21,
    	preOT22: preOT22,
    	afterOT22: afterOT22,
    	preOT23: preOT23,
    	afterOT23: afterOT23,
    	preOT24: preOT24,
    	afterOT24: afterOT24,
    	preOT25: preOT25,
    	afterOT25: afterOT25,
    	preOT26: preOT26,
    	afterOT26: afterOT26,
    	preOT27: preOT27,
    	afterOT27: afterOT27,
    	preOT28: preOT28,
    	afterOT28: afterOT28,
    	height: ht,
    	weight: wt,
    	preOpHr: preOpHr,
    	preOpRr: preOpRr,
    	preOpSpo2: preOpSpo2,
    	preOpTemp: preOpTemp,
    	preOpBp: preOpBp,
    	preOpBpprefix: preOpBpprefix,
    	postOpHr: postOpHr,
    	postOpRr: postOpRr,
    	postOpSpo2: postOpSpo2,
    	postOpTemp: postOpTemp,
    	postOpBp: postOpBp,
    	postOpBpPrefix: postOpBpPrefix,
    	preOxygen: preOxygen,
    	postOxygen: postOxygen,
    	hivTest: HivTest,
    	hBsAgTest: HBsAgTest,
    	hCVTest: HCVTest,
    	vDRLTest: VDRLTest,
    	mRSATest: MRSATest,
    	preRBSL: preRBSL,
    	preRBSLAt: preRBSLAt,
    	postRBSLs: postRBSLs,
    	postRBSLAt: postRBSLAt,
    	noSolidAfter: noSolidAfter,
    	noClearLiquidAfter: noClearLiquidAfter,
    	nBM: NBM,
    	aB_Time: AB_Time,
    	enema_time: Enema_time,
    	componentType: componentType,
    	componentUnit: componentUnit,
    	transfusedUnit: transfusedUnit,
    	preYes: preYes,
    	postyes: postyes,
    	xray: Xray,
    	uSG: USG,
    	ct: ct,
    	pet_ct: pet_ct,
    	mri: mri,
    	mammo: mammo,
    	ecg: ecg,
    	echo: echo,
    	drugAllergies: drugAllergies,
    	allergies: allergies,
    	dentures: dentures,
    	bridge: bridge,
    	spectacle: spectacle,
    	contactLense: contactLense,
    	hearingAid: hearingAid,
    	jewelry: jewelry,
    	hairpins: hairpins,
    	prosthesis: prosthesis,
    	implants: implants,
    	wig: wig,
    	preTime: preTime,
    	postTime: postTime
    });
    
	PrePostDetails = JSON.stringify(PrePostDetails);
    var inputs = [];
    inputs.push('PrePostDetails=' + PrePostDetails);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/savePrePost",
		
		
				success : function(r) {
					ajaxResponse = r;
					alert(r);
					fetchPrePostChecklist();
				}
			});
	
}



function fetchPrePostChecklist(){
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
  
    var inputs = [];
	    inputs.push('pId=' + pId1);
	    inputs.push('tId=' + tId);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/fetchprepost",
		
				success : function(response) {
					$("#idForop1").val(response.nursinAssesmentList[0].idpre_post_checklist);
					$("#diagnosisId").val(response.nursinAssesmentList[0].diagnosis);
					$("#surgeryId").val(response.nursinAssesmentList[0].planedSurgery);
					$("#htId").val(response.nursinAssesmentList[0].height);
					$("#wtId").val(response.nursinAssesmentList[0].weight);
					$("#hrId").val(response.nursinAssesmentList[0].preOpHr);
					$("#prId").val(response.nursinAssesmentList[0].preOpRr);
					$("#spo2Id").val(response.nursinAssesmentList[0].preOpSpo2);
					$("#tempId").val(response.nursinAssesmentList[0].preOpTemp);
					$("#bpId").val(response.nursinAssesmentList[0].preOpBp);
					$("#bpId3").val(response.nursinAssesmentList[0].preOpBpprefix);
					$("#postHrId").val(response.nursinAssesmentList[0].postOpHr);
					$("#postId").val(response.nursinAssesmentList[0].postOpRr);
					$("#postSo2Id").val(response.nursinAssesmentList[0].postOpSpo2);
					$("#postTempid").val(response.nursinAssesmentList[0].postOpTemp);
					$("#postBpId").val(response.nursinAssesmentList[0].postOpBp);
					$("#postBpId1").val(response.nursinAssesmentList[0].postOpBpPrefix);
					$("#oxygenId1").val(response.nursinAssesmentList[0].preOxygen);
					$("#oxygenId12").val(response.nursinAssesmentList[0].postOxygen);
					$("#RBSLsId").val(response.nursinAssesmentList[0].preRBSL);
					$("#RBSLAtId").val(response.nursinAssesmentList[0].preRBSLAt);
					$("#RBSLs1Id").val(response.nursinAssesmentList[0].postRBSLs);
					$("#RBSLAt1Id").val(response.nursinAssesmentList[0].postRBSLAt);
					$("#icuId1").val(response.nursinAssesmentList[0].noSolidAfter);
					$("#icuId3").val(response.nursinAssesmentList[0].nBM);
					$("#icuId2").val(response.nursinAssesmentList[0].noClearLiquidAfter);
					$("#AB_Time").val(response.nursinAssesmentList[0].aB_Time);
					$("#Enema_Time").val(response.nursinAssesmentList[0].enema_time);
					$("#componentType").val(response.nursinAssesmentList[0].componentType);
					$("#componentUnit").val(response.nursinAssesmentList[0].componentUnit);
					$("#transfusedUnit").val(response.nursinAssesmentList[0].transfusedUnit);
					
					$("#ProsId").val(response.nursinAssesmentList[0].prosthesis);
					$("#ImplId").val(response.nursinAssesmentList[0].implants);
					$("#preTimeId").val(response.nursinAssesmentList[0].preTime);
					$("#postTimeId").val(response.nursinAssesmentList[0].postTime);
					
					 if(response.nursinAssesmentList[0].drugAllergies==1){
		                    $("#drugAllergiesId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].allergies==1){
		                    $("#allergiesId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].xray==1){
	                    $("#XrayId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].uSG==1){
		                    $("#USGId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].ct==1){
		                    $("#ctId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].pet_ct==1){
	                    $("#petId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].mri==1){
		                    $("#mriId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].mammo==1){
		                    $("#mammoId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].ecg==1){
	                    $("#ecgId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].echo==1){
		                    $("#echoId").prop("checked", "checked");
		               }
					if(response.nursinAssesmentList[0].preYes==1){
		                    $("#yesCheckId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].postyes==1){
	                    $("#yesCheckId1").prop("checked", "checked");
	                  }

					if(response.nursinAssesmentList[0].preOT2=="Y"){
	                    $("#bandId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT2=="N"){
	                    $("#bandId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT2=="NA"){
	                    $("#bandId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT3=="Y"){
	                    $("#htId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT3=="N"){
	                    $("#htId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT3=="NA"){
	                    $("#htId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT4=="Y"){
	                    $("#preOpId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT4=="N"){
	                    $("#preOpId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT4=="NA"){
	                    $("#preOpId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT5=="Y"){
	                    $("#postId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT5=="N"){
	                    $("#postId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT5=="NA"){
	                    $("#postId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT6=="Y"){
	                    $("#surgeryId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT6=="N"){
	                    $("#surgeryId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT6=="NA"){
	                    $("#surgeryId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT7=="Y"){
	                    $("#specificId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT7=="N"){
	                    $("#specificId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT7=="NA"){
	                    $("#specificId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT8=="Y"){
	                    $("#consentId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT8=="N"){
	                    $("#consentId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT8=="NA"){
	                    $("#consentId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT9=="Y"){
	                    $("#anesthesiaId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT9=="N"){
	                    $("#anesthesiaId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT9=="NA"){
	                    $("#anesthesiaId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT10=="Y"){
	                    $("#testId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT10=="N"){
	                    $("#testId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT10=="NA"){
	                    $("#testId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT11=="Y"){
	                    $("#RBSLId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT11=="N"){
	                    $("#RBSLId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT11=="NA"){
	                    $("#RBSLId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT12=="Y"){
	                    $("#pathologyId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT12=="N"){
	                    $("#pathologyId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT12=="NA"){
	                    $("#pathologyId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT13=="Y"){
	                    $("#labId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT13=="N"){
	                    $("#labId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT13=="NA"){
	                    $("#labId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT14=="Y"){
	                    $("#multipraId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT14=="N"){
	                    $("#multipraId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT14=="NA"){
	                    $("#multipraId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT28=="Y"){
	                    $("#diagnosticId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT28=="N"){
	                    $("#diagnosticIdId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT28=="NA"){
	                    $("#diagnosticIdId3").prop("checked", "checked");
	                }
					
					if(response.nursinAssesmentList[0].preOT15=="Y"){
	                    $("#solidsId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT15=="N"){
	                    $("#solidsId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT15=="NA"){
	                    $("#solidsId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT16=="Y"){
	                    $("#pre-OpId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT16=="N"){
	                    $("#pre-OpId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT16=="NA"){
	                    $("#pre-OpId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT17=="Y"){
	                    $("#medicationId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT17=="N"){
	                    $("#medicationId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT17=="NA"){
	                    $("#medicationId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT18=="Y"){
	                    $("#antibioticsId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT18=="N"){
	                    $("#antibioticsId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT18=="NA"){
	                    $("#antibioticsId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT19=="Y"){
	                    $("#skinId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT19=="N"){
	                    $("#skinId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT19=="NA"){
	                    $("#skinId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT20=="Y"){
	                    $("#radioId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT20=="N"){
	                    $("#radioId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT20=="NA"){
	                    $("#radioId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT21=="Y"){
	                    $("#bloodArrangedId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT21=="N"){
	                    $("#bloodArrangedId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT21=="NA"){
	                    $("#bloodArrangedId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT22=="Y"){
	                    $("#BloodTransfusionId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT22=="N"){
	                    $("#BloodTransfusionId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT22=="NA"){
	                    $("#BloodTransfusionId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT23=="Y"){
	                    $("#TransfusedId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT23=="N"){
	                    $("#TransfusedId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT23=="NA"){
	                    $("#TransfusedIdId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT24=="Y"){
	                    $("#prosthesisId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT24=="N"){
	                    $("#prosthesisId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT24=="NA"){
	                    $("#prosthesisId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT25=="Y"){
	                    $("#dentureId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT25=="N"){
	                    $("#dentureId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT25=="NA"){
	                    $("#dentureId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT26=="Y"){
	                    $("#dentureId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT26=="N"){
	                    $("#dentureId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT26=="NA"){
	                    $("#dentureId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT27=="Y"){
	                    $("#jewlryId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT27=="N"){
	                    $("#jewlryId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT27=="NA"){
	                    $("#jewlryId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT2=="Y"){
	                    $("#IdentificationId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT2=="N"){
	                    $("#IdentificationId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT2=="NA"){
	                    $("#IdentificationId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT3=="Y"){
	                    $("#wtId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT3=="N"){
	                    $("#wtId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT3=="NA"){
	                    $("#wtId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT4=="Y"){
	                    $("#preOperationId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT4=="N"){
	                    $("#preOperationId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT4=="NA"){
	                    $("#preOperationId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT5=="Y"){
	                    $("#icuId101").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT5=="N"){
	                    $("#icuId102").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT5=="NA"){
	                    $("#icuId103").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT6=="Y"){
	                    $("#surgicalID1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT6=="N"){
	                    $("#surgicalID2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT6=="NA"){
	                    $("#surgicalID3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT7=="Y"){
	                    $("#specificId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT7=="N"){
	                    $("#specificId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT7=="NA"){
	                    $("#specificId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT8=="Y"){
	                    $("#consentId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT8=="N"){
	                    $("#consentId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT8=="NA"){
	                    $("#consentId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT9=="Y"){
	                    $("#anesthesiaRecId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT9=="N"){
	                    $("#anesthesiaRecId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT9=="NA"){
	                    $("#anesthesiaRecId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT10=="Y"){
	                    $("#testId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT10=="N"){
	                    $("#testId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT10=="NA"){
	                    $("#testId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT11=="Y"){
	                    $("#RBSLId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT11=="N"){
	                    $("#RBSLId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT11=="NA"){
	                    $("#RBSLId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT12=="Y"){
	                    $("#pathologyId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT12=="N"){
	                    $("#pathologyId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT12=="NA"){
	                    $("#pathologyId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT13=="Y"){
	                    $("#labId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT13=="N"){
	                    $("#labId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT13=="NA"){
	                    $("#labId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT28=="Y"){
	                    $("#X-rayId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT28=="N"){
	                    $("#X-rayId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT28=="NA"){
	                    $("#X-rayId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT14=="Y"){
	                    $("#multiprackId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT14=="N"){
	                    $("#multiprackId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT14=="NA"){
	                    $("#multiprackId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT15=="Y"){
	                    $("#NBMId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT15=="N"){
	                    $("#NBMId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT15=="NA"){
	                    $("#NBMId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT16=="NA"){
	                    $("#pre-OprId").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT17=="Y"){
	                    $("#medicationId10").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT17=="N"){
	                    $("#medicationId20").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT17=="NA"){
	                    $("#medicationId31").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT18=="Y"){
	                    $("#antibioticsckId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT18=="N"){
	                    $("#antibioticsckId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT18=="NA"){
	                    $("#antibioticsckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT19=="NA"){
	                    $("#skinckId1").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT20=="Y"){
	                    $("#checkId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT20=="N"){
	                    $("#checkId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT20=="NA"){
	                    $("#checkId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT21=="Y"){
	                    $("#bloodArrangedCheckId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT21=="N"){
	                    $("#bloodArrangedCheckId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT21=="NA"){
	                    $("#bloodArrangedCheckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterO22=="Y"){
	                    $("#BloodTransfusionId31").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT22=="N"){
	                    $("#BloodTransfusionId32").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT22=="NA"){
	                    $("#BloodTransfusionId33").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT23=="Y"){
	                    $("#TransfusedCheckId").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT23=="N"){
	                    $("#TransfusedCheck2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT23=="NA"){
	                    $("#TransfusedCheckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT24=="Y"){
	                    $("#prosthesisCheckId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT24=="N"){
	                    $("#prosthesisCheckId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT24=="NA"){
	                    $("#prosthesisCheckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT25=="Y"){
	                    $("#ImplantsId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT25=="N"){
	                    $("#ImplantsId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT25=="NA"){
	                    $("#ImplantsId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT26=="NA"){
	                    $("#spectacleId").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT27=="NA"){
	                    $("#wigId").prop("checked", "checked");
	                }
					
					if(response.nursinAssesmentList[0].hivTest=="positive"){
						$("#HivTestP").prop("checked", "checked");
					}else if(response.nursinAssesmentList[0].hivTest=="nonReactive"){
						$("#HivTestNR").prop("checked", "checked");
					}else if(response.nursinAssesmentList[0].hivTest=="notDone"){
						$("#HivTestND").prop("checked", "checked");
					}
					if(response.nursinAssesmentList[0].hCVTest=="positive"){
	                    $("#HCVTestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hCVTest=="nonReactive"){
	                    $("#HCVTestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hCVTest=="notDone"){
	                    $("#HCVTestND").prop("checked", "checked");
	                }if(response.nursinAssesmentList[0].vDRLTest=="positive"){
	                    $("#VDRLTestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].vDRLTest=="nonReactive"){
	                    $("#VDRLTestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].vDRLTest=="notDone"){
	                    $("#VDRLTestND").prop("checked", "checked");
	                }if(response.nursinAssesmentList[0].mRSATest=="positive"){
	                    $("#MRSATestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].mRSATest=="nonReactive"){
	                    $("#MRSATestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].mRSATest=="notDone"){
	                    $("#MRSATestND").prop("checked", "checked");
	                }if(response.nursinAssesmentList[0].hBsAgTest=="positive"){
	                    $("#HBsAgTestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hBsAgTest=="nonReactive"){
	                    $("#HBsAgTestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hBsAgTest=="notDone"){
	                    $("#HBsAgTestND").prop("checked", "checked");
	                }
					 if(response.nursinAssesmentList[0].dentures==1){
		                    $("#dentId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].bridge==1){
		                    $("#bridgeId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].spectacle==1){
	                    $("#spectId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].contactLense==1){
		                    $("#contactlenseId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].hearingAid==1){
		                    $("#harId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].jewelry==1){
	                    $("#jewId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].hairpins==1){
		                    $("#haringId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].wig==1){
		                    $("#wId").prop("checked", "checked");
		              }
					

				}
			});
	}

function saveNursingAssesment1(){

	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var idForintialass1 = $("#idForintialass1").val();
    
	var bandOn = $('input:checkbox[id=idBandYes]');
	if(bandOn.is(':checked') == true){
		bandOn = 1;
	}else{
		bandOn = 0;
	}
	var call = $('input:checkbox[id=idCallYes]');
	if(call.is(':checked') == true){
		call = 1;
	}else{
		call = 0;
	}
	var ht = $("#idHt").val();
	var wt = $("#idWt").val();
	var ambulatory = $('input:checkbox[id=idAmbulatory]');
	if(ambulatory.is(':checked') == true){
		ambulatory = 1;
	}else{
		ambulatory = 0;
	}
	var strecher = $('input:checkbox[id=idStrecher]');
	if(strecher.is(':checked') == true){
		strecher = 1;
	}else{
		strecher = 0;
	}
	var wheelchair = $('input:checkbox[id=idWheelchair]');
	if(wheelchair.is(':checked') == true){
		wheelchair = 1;
	}else{
		wheelchair = 0;
	}
	var admissionEmergency = $('input:checkbox[id=idEmer]');
	if(admissionEmergency.is(':checked') == true){
		admissionEmergency = 1;
	}else{
		admissionEmergency = 0;
	}
	var admissionRegular = $('input:checkbox[id=idReg]');
	if(admissionRegular.is(':checked') == true){
		admissionRegular = 1;
	}else{
		admissionRegular = 0;
	}
	// alert(bandOn+"="+call+"="+ht+"="+wt+"="+ambulatory+"="+strecher+"="+wheelchair+"="+admissionEmergency+"="+admissionRegular);
	var infoPat = $('input:checkbox[id=idInfoPat]');
	if(infoPat.is(':checked') == true){
		infoPat = 1;
	}else{
		infoPat = 0;
	}
	var infoFam = $('input:checkbox[id=idInfoFam]');
	if(infoFam.is(':checked') == true){
		infoFam = 1;
	}else{
		infoFam = 0;
	}
	var infoOld = $('input:checkbox[id=idInfoOld]');
	if(infoOld.is(':checked') == true){
		infoOld = 1;
	}else{
		infoOld = 0;
	}
	var infoOther = $('input:checkbox[id=idInfoOther]');
	if(infoOther.is(':checked') == true){
		infoOther = 1;
	}else{
		infoOther = 0;
	}
	var infoConsent = $('input:checkbox[id=idInfoConsent]');
	if(infoConsent.is(':checked') == true){
		infoConsent = 1;
	}else{
		infoConsent = 0;
	}
	var infoRelative = $("#idRalation").val();
	// alert(infoPat+"="+infoFam+"="+infoOld+"="+infoOther+"="+infoConsent+"="+infoRelative);
	var vitalT = $("#idT").val();
	var vitalP = $("#idP").val();
	var vitalR = $("#idR").val();
	var vitalBp1 = $("#idBP1").val();
	var vitalBp2 = $("#idBP2").val();
	var vitalSp = $("#idSP").val();
	
	var admittingDiagnosis = $("#idAdmitDia").val();
	var allergyDrug = $('input:checkbox[id=idAlDrug]');
	if(allergyDrug.is(':checked') == true){
		allergyDrug = 1;
	}else{
		allergyDrug = 0;
	}
	var allergyFood = $('input:checkbox[id=idAlFood]');
	if(allergyFood.is(':checked') == true){
		allergyFood = 1;
	}else{
		allergyFood = 0;
	}
	var allergyOther = $('input:checkbox[id=idAlOther]');
	if(allergyOther.is(':checked') == true){
		allergyOther = 1;
	}else{
		allergyOther = 0;
	}
	var admittingComplaint = $("#idComplaint").val();
	// alert(vitalT+"="+vitalP+"="+vitalR+"="+vitalBp1+"="+vitalBp2+"="+vitalSp);
	// alert(admittingDiagnosis+"="+allergyDrug+"="+allergyFood+"="+allergyOther+"="+admittingComplaint);
	var patHD = $('input:checkbox[id=idPHD]');
	if(patHD.is(':checked') == true){
		patHD = 1;
	}else{
		patHD = 0;
	}
	var patHyp = $('input:checkbox[id=idPHyp]');
	if(patHyp.is(':checked') == true){
		patHyp = 1;
	}else{
		patHyp = 0;
	}
	var patAst = $('input:checkbox[id=idPAst]');
	if(patAst.is(':checked') == true){
		patAst = 1;
	}else{
		patAst = 0;
	}
	var patTB = $('input:checkbox[id=idPTB]');
	if(patTB.is(':checked') == true){
		patTB = 1;
	}else{
		patTB = 0;
	}
	var patCan = $('input:checkbox[id=idPCan]');
	if(patCan.is(':checked') == true){
		patCan = 1;
	}else{
		patCan = 0;
	}
	var patAI = $('input:checkbox[id=idPAI]');
	if(patAI.is(':checked') == true){
		patAI = 1;
	}else{
		patAI = 0;
	}
	var patDia = $('input:checkbox[id=idPDia]');
	if(patDia.is(':checked') == true){
		patDia = 1;
	}else{
		patDia = 0;
	}
	var patKid = $('input:checkbox[id=idPKid]');
	if(patKid.is(':checked') == true){
		patKid = 1;
	}else{
		patKid = 0;
	}
	var patStroke = $('input:checkbox[id=idPStroke]');
	if(patStroke.is(':checked') == true){
		patStroke = 1;
	}else{
		patStroke = 0;
	}
	var patUL = $('input:checkbox[id=idPUL]');
	if(patUL.is(':checked') == true){
		patUL = 1;
	}else{
		patUL = 0;
	}
	var patEP = $('input:checkbox[id=idPEP]');
	if(patEP.is(':checked') == true){
		patEP = 1;
	}else{
		patEP = 0;
	}
	var patLung = $('input:checkbox[id=idPLung]');
	if(patLung.is(':checked') == true){
		patLung = 1;
	}else{
		patLung = 0;
	}
	var patSeizures = $('input:checkbox[id="idPSeizures"]');
	if(patSeizures.is(':checked') == true){
		patSeizures = 1;
	}else{
		patSeizures = 0;
	}
	var patHepa = $('input:checkbox[id="idPHepa"]');
	if(patHepa.is(':checked') == true){
		patHepa = 1;
	}else{
		patHepa = 0;
	}
	var patTU = $('input:checkbox[id="idPTU"]');
	if(patTU.is(':checked') == true){
		patTU = 1;
	}else{
		patTU = 0;
	}
	var patOther = $("#idPOther").val();
	var patSurgery = $("#idPSurgery").val();
	// alert(patHD+"="+patHyp+"="+patAst+"="+patTB+"="+patCan+"="+patAI+"="+patDia+"="+patKid+"="+patStroke+"="+patUL);
	// alert(patEP+"="+patLung+"="+patSeizures+"="+patHepa+"="+patTU+"="+patOther+"="+patSurgery);
	var famHD = $('input:checkbox[id=idFHD]');
	if(famHD.is(':checked') == true){
		famHD = 1;
	}else{
		famHD = 0;
	}
	var famHyp = $('input:checkbox[id=idFHyp]');
	if(famHyp.is(':checked') == true){
		famHyp = 1;
	}else{
		famHyp = 0;
	}
	var famAst = $('input:checkbox[id=idFAst]');
	if(famAst.is(':checked') == true){
		famAst = 1;
	}else{
		famAst = 0;
	}
	var famTB = $('input:checkbox[id=idFTB]');
	if(famTB.is(':checked') == true){
		famTB = 1;
	}else{
		famTB = 0;
	}
	var famCan = $('input:checkbox[id=idFCan]');
	if(famCan.is(':checked') == true){
		famCan = 1;
	}else{
		famCan = 0;
	}
	var famAI = $('input:checkbox[id=idFAI]');
	if(famAI.is(':checked') == true){
		famAI = 1;
	}else{
		famAI = 0;
	}
	var famDia = $('input:checkbox[id=idFDia]');
	if(famDia.is(':checked') == true){
		famDia = 1;
	}else{
		famDia = 0;
	}
	var famKid = $('input:checkbox[id=idFKid]');
	if(famKid.is(':checked') == true){
		famKid = 1;
	}else{
		famKid = 0;
	}
	var famStroke = $('input:checkbox[id=idFStroke]');
	if(famStroke.is(':checked') == true){
		famStroke = 1;
	}else{
		famStroke = 0;
	}
	var famUL = $('input:checkbox[id=idFUL]');
	if(famUL.is(':checked') == true){
		famUL = 1;
	}else{
		famUL = 0;
	}
	var famEP = $('input:checkbox[id=idFEP]');
	if(famEP.is(':checked') == true){
		famEP = 1;
	}else{
		famEP = 0;
	}
	var famLung = $('input:checkbox[id=idFLung]');
	if(famLung.is(':checked') == true){
		famLung = 1;
	}else{
		famLung = 0;
	}
	var famSeizures = $('input:checkbox[id="idFSeizures"]');
	if(famSeizures.is(':checked') == true){
		famSeizures = 1;
	}else{
		famSeizures = 0;
	}
	var famHepa = $('input:checkbox[id="idFHepa"]');
	if(famHepa.is(':checked') == true){
		famHepa = 1;
	}else{
		famHepa = 0;
	}
	var famTU = $('input:checkbox[id="idFTU"]');
	if(famTU.is(':checked') == true){
		famTU = 1;
	}else{
		famTU = 0;
	}
	var famOther = $("#idFOther").val();
	var famSurgery = $("#idFSurgery").val();
	var maritialStatus = $("input:radio[name='maritialStatus']:checked").val();
	if(maritialStatus==undefined)
	{
		maritialStatus = "0";
	}
	var livesWith = $("input:radio[name='livesWith']:checked").val();
	if(livesWith==undefined)
	{
		livesWith = "0";
	}
	var occupation = $("input:radio[name='occupation']:checked").val();
	if(occupation==undefined)
	{
		occupation = "0";
	}
	var activity = $("input:radio[name='activity']:checked").val();
	if(activity==undefined)
	{
		activity = "0";
	}
	var emoStatus = $("input:radio[name='emoStatus']:checked").val();
	if(emoStatus==undefined)
	{
		emoStatus = "0";
	}
	var usualFeeding = $("#idFeeding").val();
	var usualBathing = $("#idBathing").val();
	var usualToileting = $("#idToileting").val();
	var usualGeneral = $("#idGeneral").val();
	var usualDressing = $("#idDressing").val();
	var admsFeeding = $("#idAdmFeeding").val();
	var admsBathing = $("#idAdmBathing").val();
	var admsToileting = $("#idAdmToileting").val();
	var admsGeneral = $("#idAdmGeneral").val();
	var admsDressing = $("#idAdmDressing").val();
	
	// alert(usualFeeding+"="+usualBathing+"="+usualToileting+"="+usualGeneral+"="+usualDressing);
	// alert(admsFeeding+"="+admsBathing+"="+admsToileting+"="+admsGeneral+"="+admsDressing);
	  var Nursingobj01 = {
			  nursinglist : []
	        };
	  Nursingobj01.nursinglist.push({
	    	pId:pId1,
	    	tId : tId,
	    	idNursingInitialAssessment: idForintialass1,
	    	bandOn: bandOn,
			call: call,
			ht: ht,
			wt: wt,
			ambulatory: ambulatory,
			strecher: strecher,
			wheelchair: wheelchair,
			admissionEmergency: admissionEmergency,
			admissionRegular: admissionRegular,
			infoPat: infoPat,
			infoFam: infoFam,
			infoOld: infoOld,
			infoOther: infoOther,
			infoConsent: infoConsent,
			infoRelative: infoRelative,
			vitalT: vitalT,
			vitalP: vitalP,
			vitalR: vitalR,
			vitalBp1: vitalBp1,
			vitalBp2: vitalBp2,
			vitalSp: vitalSp,
			admittingDiagnosis: admittingDiagnosis,
			allergyDrug: allergyDrug,
			allergyFood: allergyFood,
			allergyOther: allergyOther,
			admittingComplaint: admittingComplaint,
			patHD: patHD,
			patHyp: patHyp,
			patAst: patAst,
			patTB: patTB,
			patCan: patCan,
			patAI: patAI,
			patDia: patDia,
			patKid: patKid,
			patStroke: patStroke,
			patUL: patUL,
			patEP: patEP,
			patLung: patLung,
			patSeizures: patSeizures,
			patHepa: patHepa,
			patTU: patTU,
			patOther: patOther,
			patSurgery: patSurgery,
			famHD: famHD,
			famHyp: famHyp,
			famAst: famAst,
			famTB: famTB,
			famCan: famCan,
			famAI: famAI,
			famDia: famDia,
			famKid: famKid,
			famStroke: famStroke,
			famUL: famUL,
			famEP: famEP,
			famLung: famLung,
			famSeizures: famSeizures,
			famHepa: famHepa,
			famTU: famTU,
			famOther: famOther,
			famSurgery: famSurgery,
			maritialStatus: maritialStatus,
			livesWith: livesWith,
			occupation: occupation,
			activity: activity,
			emoStatus: emoStatus,
			usualFeeding: usualFeeding,
			usualBathing: usualBathing,
			usualToileting: usualToileting,
			usualGeneral: usualGeneral,
			usualDressing: usualDressing,
			admsFeeding: admsFeeding,
			admsBathing: admsBathing,
			admsToileting: admsToileting,
			admsGeneral: admsGeneral,
			admsDressing: admsDressing
			});
	    
	  Nursingobj01 = JSON.stringify(Nursingobj01);
	    var inputs = [];
	    inputs.push('Nursingobj01=' + Nursingobj01);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/saveNursingAssessment01",
		
			success : function(response) {
				alert(response);
				fetchNursingAssesment1();
			}
		});
}



function fetchNursingAssesment1(){
	
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var inputs = [];
		inputs.push('pId=' + pId1);
		inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/nursingstation/NursingA",
			
			success : function(response) {
				
				$("#idForintialass1").val(response.nursinglist[0].idNursingInitialAssessment);
			
			if(response.nursinglist[0].bandOn==1){
				$("#idBandYes").prop("checked", "checked");
			}else{
				$("#idBandNo").prop("checked", "checked");
			}
			if(response.nursinglist[0].call==1){
				$("#idCallYes").prop("checked", "checked");
			}else{
				$("#idCallNo").prop("checked", "checked");
			}
			$("#idHt").val(response.nursinglist[0].ht);
			$("#idWt").val(response.nursinglist[0].wt);
			if(response.nursinglist[0].ambulatory==1){
				$("#idAmbulatory").prop("checked", "checked");
			}
			if(response.nursinglist[0].strecher==1){
				$("#idStrecher").prop("checked", "checked");
			}
			if(response.nursinglist[0].wheelchair==1){
				$("#idWheelchair").prop("checked", "checked");
			}
			if(response.nursinglist[0].admissionEmergency==1){
				$("#idEmer").prop("checked", "checked");
			}
			if(response.nursinglist[0].admissionRegular==1){
				$("#idReg").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoPat==1){
				$("#idInfoPat").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoFam==1){
				$("#idInfoFam").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoOld==1){
				$("#idInfoOld").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoOther==1){
				$("#idInfoOther").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoConsent==1){
				$("#idInfoConsent").prop("checked", "checked");
			}
			$("#idRalation").val(response.nursinglist[0].infoRelative);
			$("#idT").val(response.nursinglist[0].vitalT);
			$("#idP").val(response.nursinglist[0].vitalP);
			$("#idR").val(response.nursinglist[0].vitalR);
			$("#idBP1").val(response.nursinglist[0].vitalBp1);
			$("#idBP2").val(response.nursinglist[0].vitalBp2);
			$("#idSP").val(response.nursinglist[0].vitalSp);
			$("#idAdmitDia").val(response.nursinglist[0].admittingDiagnosis);
			if(response.nursinglist[0].allergyDrug==1){
				$("#idAlDrug").prop("checked", "checked");
			}
			if(response.nursinglist[0].allergyFood==1){
				$("#idAlFood").prop("checked", "checked");
			}
			if(response.nursinglist[0].allergyOther==1){
				$("#idAlOther").prop("checked", "checked");
			}
			$("#idComplaint").val(response.nursinglist[0].admittingComplaint);
			if(response.nursinglist[0].patHD==1){
				$("#idPHD").prop("checked", "checked");
			}
			if(response.nursinglist[0].patHyp==1){
				$("#idPHyp").prop("checked", "checked");
			}
			if(response.nursinglist[0].patAst==1){
				$("#idPAst").prop("checked", "checked");
			}
			if(response.nursinglist[0].patTB==1){
				$("#idPTB").prop("checked", "checked");
			}
			if(response.nursinglist[0].patCan==1){
				$("#idPCan").prop("checked", "checked");
			}
			if(response.nursinglist[0].patAI==1){
				$("#idPAI").prop("checked", "checked");
			}
			if(response.nursinglist[0].patDia==1){
				$("#idPDia").prop("checked", "checked");
			}
			if(response.nursinglist[0].patKid==1){
				$("#idPKid").prop("checked", "checked");
			}
			if(response.nursinglist[0].patStroke==1){
				$("#idPStroke").prop("checked", "checked");
			}
			if(response.nursinglist[0].patUL==1){
				$("#idPUL").prop("checked", "checked");
			}
			if(response.nursinglist[0].patEP==1){
				$("#idPEP").prop("checked", "checked");
			}
			if(response.nursinglist[0].patLung==1){
				$("#idPLung").prop("checked", "checked");
			}
			if(response.nursinglist[0].patSeizures==1){
				$("#idPSeizures").prop("checked", "checked");
			}
			if(response.nursinglist[0].patHepa==1){
				$("#idPHepa").prop("checked", "checked");
			}
			if(response.nursinglist[0].patTU==1){
				$("#idPTU").prop("checked", "checked");
			}
			$("#idPOther").val(response.nursinglist[0].patOther);
			$("#idPSurgery").val(response.nursinglist[0].patSurgery);
			if(response.nursinglist[0].famHD==1){
				$("#idFHD").prop("checked", "checked");
			}
			if(response.nursinglist[0].famHyp==1){
				$("#idFHyp").prop("checked", "checked");
			}
			if(response.nursinglist[0].famAst==1){
				$("#idFAst").prop("checked", "checked");
			}
			if(response.nursinglist[0].famTB==1){
				$("#idFTB").prop("checked", "checked");
			}
			if(response.nursinglist[0].famCan==1){
				$("#idFCan").prop("checked", "checked");
			}
			if(response.nursinglist[0].famAI==1){
				$("#idFAI").prop("checked", "checked");
			}
			if(response.nursinglist[0].famDia==1){
				$("#idFDia").prop("checked", "checked");
			}
			if(response.nursinglist[0].famKid==1){
				$("#idFKid").prop("checked", "checked");
			}
			if(response.nursinglist[0].famStroke==1){
				$("#idFStroke").prop("checked", "checked");
			}
			if(response.nursinglist[0].famUL==1){
				$("#idFUL").prop("checked", "checked");
			}
			if(response.nursinglist[0].famEP==1){
				$("#idFEP").prop("checked", "checked");
			}
			if(response.nursinglist[0].famLung==1){
				$("#idFLung").prop("checked", "checked");
			}
			if(response.nursinglist[0].famSeizures==1){
				$("#idFSeizures").prop("checked", "checked");
			}
			if(response.nursinglist[0].famHepa==1){
				$("#idFHepa").prop("checked", "checked");
			}
			if(response.nursinglist[0].famTU==1){
				$("#idFTU").prop("checked", "checked");
			}
			$("#idFOther").val(response.nursinglist[0].famOther);
			$("#idFSurgery").val(response.nursinglist[0].famSurgery);
			if(response.nursinglist[0].maritialStatus=="married"){
				$("#idMarried").prop("checked", "checked");
			}else if(response.nursinglist[0].maritialStatus=="widowed"){
				$("#idWidowed").prop("checked", "checked");
			}else if(response.nursinglist[0].maritialStatus=="single"){
				$("#idSingle").prop("checked", "checked");
			}
			if(response.nursinglist[0].livesWith=="family"){
				$("#idLivesWith").prop("checked", "checked");
			}else if(response.nursinglist[0].livesWith=="alone"){
				$("#idLivesALone").prop("checked", "checked");
			}
			if(response.nursinglist[0].occupation=="full"){
				$("#idOccuFull").prop("checked", "checked");
			}else if(response.nursinglist[0].occupation=="part"){
				$("#idOccuPart").prop("checked", "checked");
			}else if(response.nursinglist[0].occupation=="retired"){
				$("#idOccuRetaired").prop("checked", "checked");
			}else if(response.nursinglist[0].occupation=="other"){
				$("#idOccuOthr").prop("checked", "checked");
			}
			if(response.nursinglist[0].activity=="ambulatory"){
				$("#ActivityAmb").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="cane"){
				$("#idActivityCane").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="crutches"){
				$("#idActivityCru").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="walker"){
				$("#idActivityWal").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="weelchair"){
				$("#idActivityWheel").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="bedrest"){
				$("#idActivityBed").prop("checked", "checked");
			}
			if(response.nursinglist[0].emoStatus=="cooperative"){
				$("#idStatusCoop").prop("checked", "checked");
			}else if(response.nursinglist[0].emoStatus=="anxious"){
				$("#idStatusAnx").prop("checked", "checked");
			}else if(response.nursinglist[0].emoStatus=="depressed"){
				$("#idStatusDep").prop("checked", "checked");
			}
			$("#idFeeding").val(response.nursinglist[0].usualFeeding);
			$("#idBathing").val(response.nursinglist[0].usualBathing);
			$("#idToileting").val(response.nursinglist[0].usualToileting);
			$("#idGeneral").val(response.nursinglist[0].usualGeneral);
			$("#idDressing").val(response.nursinglist[0].usualDressing);
			$("#idAdmFeeding").val(response.nursinglist[0].admsFeeding);
			$("#idAdmBathing").val(response.nursinglist[0].admsBathing);
			$("#idAdmToileting").val(response.nursinglist[0].admsToileting);
			$("#idAdmGeneral").val(response.nursinglist[0].admsGeneral);
			$("#idAdmDressing").val(response.nursinglist[0].admsDressing);
		}
		});
}



function saveNursingAssesment2(){

	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var idForintialass2 = $("#idForintialass2").val();
    var cntCat = 0;
	var cntCare = 0;
	var cat1Val = $("input:radio[name='cat1Val']:checked").val();
	if(cat1Val == "yes"){
		cntCat++;
	}
	if(cat1Val==undefined)
	{
		cat1Val = "0";
	}
	var care1Val = $("input:radio[name='care1Val']:checked").val();
	if(care1Val == "yes"){
		cntCare++;
	}
	if(care1Val==undefined)
	{
		care1Val = "0";
	}
	var cat2Val = $("input:radio[name='cat2Val']:checked").val();
	if(cat2Val == "yes"){
		cntCat++;
	}
	if(cat2Val==undefined)
	{
		cat2Val = "0";
	}
	var care2Val = $("input:radio[name='care2Val']:checked").val();
	if(care2Val == "yes"){
		cntCare++;
	}
	if(care2Val==undefined)
	{
		care2Val = "0";
	}
	var cat3Val = $("input:radio[name='cat3Val']:checked").val();
	if(cat3Val == "yes"){
		cntCat++;
	}
	if(cat3Val==undefined)
	{
		cat3Val = "0";
	}
	var care3Val = $("input:radio[name='care3Val']:checked").val();
	if(care3Val == "yes"){
		cntCare++;
	}
	if(care3Val==undefined)
	{
		care3Val = "0";
	}
	var cat4Val = $("input:radio[name='cat4Val']:checked").val();
	if(cat4Val == "yes"){
		cntCat++;
	}
	if(cat4Val==undefined)
	{
		cat4Val = "0";
	}
	var care4Val = $("input:radio[name='care4Val']:checked").val();
	if(care4Val == "yes"){
		cntCare++;
	}
	if(care4Val==undefined)
	{
		care4Val = "0";
	}
	var cat5Val = $("input:radio[name='cat5Val']:checked").val();
	if(cat5Val == "yes"){
		cntCat++;
	}
	if(cat5Val==undefined)
	{
		cat5Val = "0";
	}
	var care5Val = $("input:radio[name='care5Val']:checked").val();
	if(care5Val == "yes"){
		cntCare++;
	}
	if(care5Val==undefined)
	{
		care5Val = "0";
	}
	var cat6Val = $("input:radio[name='cat6Val']:checked").val();
	if(cat6Val == "yes"){
		cntCat++;
	}
	if(cat6Val==undefined)
	{
		cat6Val = "0";
	}
	var care6Val = $("input:radio[name='care6Val']:checked").val();
	if(care6Val == "yes"){
		cntCare++;
	}
	if(care6Val==undefined)
	{
		care6Val = "0";
	}
	var cat7Val = $("input:radio[name='cat7Val']:checked").val();
	if(cat7Val == "yes"){
		cntCat++;
	}
	if(cat7Val==undefined)
	{
		cat7Val = "0";
	}
	var care7Val = $("input:radio[name='care7Val']:checked").val();
	if(care7Val == "yes"){
		cntCare++;
	}
	if(care7Val==undefined)
	{
		care7Val = "0";
	}
	var cat8Val = $("input:radio[name='cat8Val']:checked").val();
	if(cat8Val == "yes"){
		cntCat++;
	}
	if(cat8Val==undefined)
	{
		cat8Val = "0";
	}
	var care8Val = $("input:radio[name='care8Val']:checked").val();
	if(care8Val == "yes"){
		cntCare++;
	}
	if(care8Val==undefined)
	{
		care8Val = "0";
	}
	var cat9Val = $("input:radio[name='cat9Val']:checked").val();
	if(cat9Val == "yes"){
		cntCat++;
	}
	if(cat9Val==undefined)
	{
		cat9Val = "0";
	}
	var care9Val = $("input:radio[name='care9Val']:checked").val();
	if(care9Val == "yes"){
		cntCare++;
	}
	if(care9Val==undefined)
	{
		care9Val = "0";
	}
	var cat10Val = $("input:radio[name='cat10Val']:checked").val();
	if(cat10Val == "yes"){
		cntCat++;
	}
	if(cat10Val==undefined)
	{
		cat10Val = "0";
	}
	var care10Val = $("input:radio[name='care10Val']:checked").val();
	if(care10Val == "yes"){
		cntCare++;
	}
	if(care10Val==undefined)
	{
		care10Val = "0";
	}
	$("#totalCat").val(cntCat);
	$("#totalCare").val(cntCare);
	$("#totalYes").val(cntCat+cntCare);
	if(cntCat > 1){
		$("#idHighVulnerability").attr("checked",true);
		$("#idLowVulnerability").attr("checked",false);
	}else{
		$("#idLowVulnerability").attr("checked",true);
		$("#idHighVulnerability").attr("checked",false);
	}
	
	var headInjuries = $("#idInjuries").val();
	var mouthLesion = $('input:checkbox[id=idLesion]');
	if(mouthLesion.is(':checked') == true){
		mouthLesion = 1;
	}else{
		mouthLesion = 0;
	}
	var mouthDental = $('input:checkbox[id=idDental]');
	if(mouthDental.is(':checked') == true){
		mouthDental = 1;
	}else{
		mouthDental = 0;
	}
	var mouthBleeding = $('input:checkbox[id=idBleeding]');
	if(mouthBleeding.is(':checked') == true){
		mouthBleeding = 1;
	}else{
		mouthBleeding = 0;
	}
	var mouthTaking = $('input:checkbox[id=idTaking]');
	if(mouthTaking.is(':checked') == true){
		mouthTaking = 1;
	}else{
		mouthTaking = 0;
	}
	var mouthSense = $('input:checkbox[id=idMouthSense]');
	if(mouthSense.is(':checked') == true){
		mouthSense = 1;
	}else{
		mouthSense = 0;
	}
	var mouthDentures = $('input:checkbox[id=idDentures]');
	if(mouthDentures.is(':checked') == true){
		mouthDentures = 1;
	}else{
		mouthDentures = 0;
	}
	var mouthOther = $("#idMouthOther").val();
	// alert(headInjuries+"="+mouthLesion+"="+mouthDental+"="+mouthBleeding+"="+mouthTaking+"="+mouthSense+"="+mouthDentures+"="+mouthOther);
	
	var eyeBlurred = $('input:checkbox[id=idBlurred]');
	if(eyeBlurred.is(':checked') == true){
		eyeBlurred = 1;
	}else{
		eyeBlurred = 0;
	}
	var eyeDouble = $('input:checkbox[id=idDouble]');
	if(eyeDouble.is(':checked') == true){
		eyeDouble = 1;
	}else{
		eyeDouble = 0;
	}
	var eyeInflammation = $('input:checkbox[id=idInflammation]');
	if(eyeInflammation.is(':checked') == true){
		eyeInflammation = 1;
	}else{
		eyeInflammation = 0;
	}
	var eyeColour = $('input:checkbox[id=idEyeColour]');
	if(eyeColour.is(':checked') == true){
		eyeColour = 1;
	}else{
		eyeColour = 0;
	}
	var eyeItching = $('input:checkbox[id=idItching]');
	if(eyeItching.is(':checked') == true){
		eyeItching = 1;
	}else{
		eyeItching = 0;
	}
	var eyeRedness = $('input:checkbox[id=idRedness]');
	if(eyeRedness.is(':checked') == true){
		eyeRedness = 1;
	}else{
		eyeRedness = 0;
	}
	var eyePain = $('input:checkbox[id=idEyePain]');
	if(eyePain.is(':checked') == true){
		eyePain = 1;
	}else{
		eyePain = 0;
	}
	var eyePupils = $('input:checkbox[id=idPupils]');
	if(eyePupils.is(':checked') == true){
		eyePupils = 1;
	}else{
		eyePupils = 0;
	}
	var eyeOther = $("#idEyeOther").val();
	// alert(eyeBlurred+"="+eyeDouble+"="+eyeInflammation+"="+eyeColour+"="+eyeItching+"="+eyeRedness+"="+eyePain+"="+eyePupils+"="+eyeOther);
	
	var earDeaf = $('input:checkbox[id=idDeaf]');
	if(earDeaf.is(':checked') == true){
		earDeaf = 1;
	}else{
		earDeaf = 0;
	}
	var earTinnitus = $('input:checkbox[id=idTinnitus]');
	if(earTinnitus.is(':checked') == true){
		earTinnitus = 1;
	}else{
		earTinnitus = 0;
	}
	var earDizziness = $('input:checkbox[id=idDizziness]');
	if(earDizziness.is(':checked') == true){
		earDizziness = 1;
	}else{
		earDizziness = 0;
	}
	var earPain = $('input:checkbox[id=idEarPain]');
	if(earPain.is(':checked') == true){
		earPain = 1;
	}else{
		earPain = 0;
	}
	var earSense = $('input:checkbox[id=idEarSense]');
	if(earSense.is(':checked') == true){
		earSense = 1;
	}else{
		earSense = 0;
	}
	var earDrainage = $('input:checkbox[id=idDrainage]');
	if(earDrainage.is(':checked') == true){
		earDrainage = 1;
	}else{
		earDrainage = 0;
	}
	var earColour = $("#idEarColour").val();
	var earOther = $("#idEarOther").val();
	// alert(earDeaf+"="+earTinnitus+"="+earDizziness+"="+earPain+"="+earSense+"="+earDrainage+"="+earColour+"="+earOther);
	
	var noseBleed = $('input:checkbox[id=idNoseBleed]');
	if(noseBleed.is(':checked') == true){
		noseBleed = 1;
	}else{
		noseBleed = 0;
	}
	var noseCongestion = $('input:checkbox[id=idNoseCongestion]');
	if(noseCongestion.is(':checked') == true){
		noseCongestion = 1;
	}else{
		noseCongestion = 0;
	}
	var nosePain = $('input:checkbox[id=idNosePain]');
	if(nosePain.is(':checked') == true){
		nosePain = 1;
	}else{
		nosePain = 0;
	}
	var noseSinus = $('input:checkbox[id=idNoseSinus]');
	if(noseSinus.is(':checked') == true){
		noseSinus = 1;
	}else{
		noseSinus = 0;
	}
	var noseDrainage = $('input:checkbox[id=idNoseDrainage]');
	if(noseDrainage.is(':checked') == true){
		noseDrainage = 1;
	}else{
		noseDrainage = 0;
	}
	var noseColour = $("#idNoseColour").val();
	var noseOther = $("#idNoseOther").val();
	// alert(noseBleed+"="+noseCongestion+"="+nosePain+"="+noseSinus+"="+noseDrainage+"="+noseColour+"="+noseOther);
	
	var throatSore = $('input:checkbox[id=idThroatSore]');
	if(throatSore.is(':checked') == true){
		throatSore = 1;
	}else{
		throatSore = 0;
	}
	var throatHoarseness = $('input:checkbox[id=idThroatHoarseness]');
	if(throatHoarseness.is(':checked') == true){
		throatHoarseness = 1;
	}else{
		throatHoarseness = 0;
	}
	var throatLumps = $('input:checkbox[id=idThroatLumps]');
	if(throatLumps.is(':checked') == true){
		throatLumps = 1;
	}else{
		throatLumps = 0;
	}
	var throatSwollen = $('input:checkbox[id=idThroatSwollen]');
	if(throatSwollen.is(':checked') == true){
		throatSwollen = 1;
	}else{
		throatSwollen = 0;
	}
	var throatStiffness = $('input:checkbox[id=idThroatStiffness]');
	if(throatStiffness.is(':checked') == true){
		throatStiffness = 1;
	}else{
		throatStiffness = 0;
	}
	var throatPain = $('input:checkbox[id=idThroatPain]');
	if(throatPain.is(':checked') == true){
		throatPain = 1;
	}else{
		throatPain = 0;
	}
	var throatDysphagia = $('input:checkbox[id=idThroatDysphagia]');
	if(throatDysphagia.is(':checked') == true){
		throatDysphagia = 1;
	}else{
		throatDysphagia = 0;
	}
	var throatOther = $("#idThroatOther").val();
	
	// alert(throatSore+"="+throatHoarseness+"="+throatLumps+"="+throatSwollen+"="+throatStiffness+"="+throatPain+"="+throatDysphagia+"="+throatOther);
	
	var bowelDiarrhoea = $('input:checkbox[id=idBowelDiarrhoea]');
	if(bowelDiarrhoea.is(':checked') == true){
		bowelDiarrhoea = 1;
	}else{
		bowelDiarrhoea = 0;
	}
	var bowelConstipation = $('input:checkbox[id=idBowelConstipation]');
	if(bowelConstipation.is(':checked') == true){
		bowelConstipation = 1;
	}else{
		bowelConstipation = 0;
	}
	var bowelIncontinence = $('input:checkbox[id=idBowelIncontinence]');
	if(bowelIncontinence.is(':checked') == true){
		bowelIncontinence = 1;
	}else{
		bowelIncontinence = 0;
	}
	var bowelBlood = $('input:checkbox[id=idBowelBlood]');
	if(bowelBlood.is(':checked') == true){
		bowelBlood = 1;
	}else{
		bowelBlood = 0;
	}
	var bowelNone = $('input:checkbox[id=idBowelNone]');
	if(bowelNone.is(':checked') == true){
		bowelNone = 1;
	}else{
		bowelNone = 0;
	}
	var bowelPain = $('input:checkbox[id=idBowelPain]');
	if(bowelPain.is(':checked') == true){
		bowelPain = 1;
	}else{
		bowelPain = 0;
	}
	var bowelHemorrhoids = $('input:checkbox[id=idBowelHemorrhoids]');
	if(bowelHemorrhoids.is(':checked') == true){
		bowelHemorrhoids = 1;
	}else{
		bowelHemorrhoids = 0;
	}
	var bowelFrequency = $("#idBowelFrequency").val();
	var bowelInterNone = $('input:checkbox[id=idBowelInterNone]');
	if(bowelInterNone.is(':checked') == true){
		bowelInterNone = 1;
	}else{
		bowelInterNone = 0;
	}
	var bowelLaxatives = $('input:checkbox[id=idBowelLaxatives]');
	if(bowelLaxatives.is(':checked') == true){
		bowelLaxatives = 1;
	}else{
		bowelLaxatives = 0;
	}
	var bowelInterType = $("#idBowelInterType").val();
	var bowelInterFrequency = $("#idBowelInterFrequency").val();
	var skinIndicationsTA = $("#skinindicationTA").val();
	
	var Nursingobj02 = {
			 nursingtwolist : []
	        };
	  Nursingobj02.nursingtwolist.push({
	    	pId:pId1,
	    	tId : tId,
	    	idNursingInitialAssessmentTwo: idForintialass2,
	    	cat1Val: cat1Val,
			care1Val: care1Val,
			cat2Val: cat2Val,
			care2Val: care2Val,
			cat3Val: cat3Val,
			care3Val: care3Val,
			cat4Val: cat4Val,
			care4Val: care4Val,
			cat5Val: cat5Val,
			care5Val: care5Val,
			cat6Val: cat6Val,
			care6Val: care6Val,
			cat7Val: cat7Val,
			care7Val: care7Val,
			cat8Val: cat8Val,
			care8Val: care8Val,
			cat9Val: cat9Val,
			care9Val: care9Val,
			cat10Val: cat10Val,
			care10Val: care10Val,
			headInjuries: headInjuries,
			mouthLesion: mouthLesion,
			mouthDental: mouthDental,
			mouthBleeding: mouthBleeding,
			mouthTaking: mouthTaking,
			mouthSense: mouthSense,
			mouthDentures: mouthDentures,
			mouthOther: mouthOther,
			eyeBlurred: eyeBlurred,
			eyeDouble: eyeDouble,
			eyeInflammation: eyeInflammation,
			eyeColour: eyeColour,
			eyeItching: eyeItching,
			eyeRedness: eyeRedness,
			eyePain: eyePain,
			eyePupils: eyePupils,
			eyeOther: eyeOther,
			earDeaf: earDeaf,
			earTinnitus: earTinnitus,
			earDizziness: earDizziness,
			earPain: earPain,
			earSense: earSense,
			earDrainage: earDrainage,
			earColour: earColour,
			earOther: earOther,
			noseBleed: noseBleed,
			noseCongestion: noseCongestion,
			nosePain: nosePain,
			noseSinus: noseSinus,
			noseDrainage: noseDrainage,
			noseColour: noseColour,
			noseOther: noseOther,
			throatSore: throatSore,
			throatHoarseness: throatHoarseness,
			throatLumps: throatLumps,
			throatSwollen: throatSwollen,
			throatStiffness: throatStiffness,
			throatPain: throatPain,
			throatDysphagia: throatDysphagia,
			throatOther: throatOther,
			bowelDiarrhoea: bowelDiarrhoea,
			bowelConstipation: bowelConstipation,
			bowelIncontinence: bowelIncontinence,
			bowelBlood: bowelBlood,
			bowelNone: bowelNone,
			bowelPain: bowelPain,
			bowelHemorrhoids: bowelHemorrhoids,
			bowelFrequency: bowelFrequency,
			bowelInterNone: bowelInterNone,
			bowelLaxatives: bowelLaxatives,
			bowelInterType: bowelInterType,
			bowelInterFrequency: bowelInterFrequency,
			skinAssessments:skinIndicationsTA
			});
	    
	  Nursingobj02 = JSON.stringify(Nursingobj02);
	    var inputs = [];
	    inputs.push('Nursingobj02=' + Nursingobj02);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/saveNursingAssessment02",
		
		
		success : function(response) {
				alert(response);
				fetchNursingAssesment2();
			}
		});
}

function fetchNursingAssesment2(){

	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var inputs = [];
		inputs.push('pId=' + pId1);
		inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/nursingstation/NursingA2fetch",
			
				success : function(response) {
					$("#idForintialass2").val(response.nursingtwolist[0].idNursingInitialAssessmentTwo);
					
					var cntCat = 0;
					var cntCare = 0;
					
					$("#skinindicationTA").val(response.nursingtwolist[0].skinAssessments);
					if(response.nursingtwolist[0].skinAssessments !=""){
						$("#skinindicationDIV").show();
					}
					
					if(response.nursingtwolist[0].cat1Val=="yes"){
						$("#cat1Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat1N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care1Val=="yes"){
						$("#care1Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care1N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat2Val=="yes"){
						$("#cat2Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat2N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care2Val=="yes"){
						$("#care2Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care2N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat3Val=="yes"){
						$("#cat3Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat3N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care3Val=="yes"){
						$("#care3Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care3N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat4Val=="yes"){
						$("#cat4Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat4N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care4Val=="yes"){
						$("#care4Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care4N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat5Val=="yes"){
						$("#cat5Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat5N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care5Val=="yes"){
						$("#care5Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care5N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat6Val=="yes"){
						$("#cat6Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat6N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care6Val=="yes"){
						$("#care6Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care6N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat7Val=="yes"){
						$("#cat7Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat7N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care7Val=="yes"){
						$("#care7Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care7N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat8Val=="yes"){
						$("#cat8Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat8N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care8Val=="yes"){
						$("#care8Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care8N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat9Val=="yes"){
						$("#cat9Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat9N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care9Val=="yes"){
						$("#care9Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care9N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].cat10Val=="yes"){
						$("#cat10Y").prop("checked", "checked");
						cntCat++;
					}else{
						$("#cat10N").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].care10Val=="yes"){
						$("#care10Y").prop("checked", "checked");
						cntCare++;
					}else{
						$("#care10N").prop("checked", "checked");
					}
					$("#totalCat").val(cntCat);
					$("#totalCare").val(cntCare);
					$("#totalYes").val(cntCat + cntCare);
					if(cntCat > 1){
						$("#idHighVulnerability").attr("checked",true);
						$("#idLowVulnerability").attr("checked",false);
					}else{
						$("#idLowVulnerability").attr("checked",true);
						$("#idHighVulnerability").attr("checked",false);
					}
					$("#idInjuries").val(response.nursingtwolist[0].headInjuries);
					if(response.nursingtwolist[0].mouthLesion=="1"){
						$("#idLesion").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].mouthDental=="1"){
						$("#idDental").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].mouthBleeding=="1"){
						$("#idBleeding").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].mouthTaking=="1"){
						$("#idTaking").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].mouthSense=="1"){
						$("#idMouthSense").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].mouthDentures=="1"){
						$("#idDentures").prop("checked", "checked");
					}
					$("#idMouthOther").val(response.nursingtwolist[0].mouthOther);
					if(response.nursingtwolist[0].eyeBlurred=="1"){
						$("#idBlurred").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].eyeDouble=="1"){
						$("#idDouble").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].eyeInflammation=="1"){
						$("#idInflammation").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].eyeColour=="1"){
						$("#idEyeColour").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].eyeItching=="1"){
						$("#idItching").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].eyeRedness=="1"){
						$("#idRedness").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].eyePain=="1"){
						$("#idEyePain").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].eyePupils=="1"){
						$("#idPupils").prop("checked", "checked");
					}
					$("#idEyeOther").val(response.nursingtwolist[0].eyeOther);
					if(response.nursingtwolist[0].earDeaf=="1"){
						$("#idDeaf").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].earTinnitus=="1"){
						$("#idTinnitus").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].earDizziness=="1"){
						$("#idDizziness").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].earPain=="1"){
						$("#idEarPain").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].earSense=="1"){
						$("#idEarSense").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].earDrainage=="1"){
						$("#idDrainage").prop("checked", "checked");
					}
					$("#idEarColour").val(response.nursingtwolist[0].earColour);
					$("#idEarOther").val(response.nursingtwolist[0].earOther);
					if(response.nursingtwolist[0].noseBleed=="1"){
						$("#idNoseBleed").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].noseCongestion=="1"){
						$("#idNoseCongestion").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].nosePain=="1"){
						$("#idNosePain").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].noseSinus=="1"){
						$("#idNoseSinus").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].noseDrainage=="1"){
						$("#idNoseDrainage").prop("checked", "checked");
					}
					$("#idNoseColour").val(response.nursingtwolist[0].noseColour);
					$("#idNoseOther").val(response.nursingtwolist[0].noseOther);
					if(response.nursingtwolist[0].throatSore=="1"){
						$("#idThroatSore").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].throatHoarseness=="1"){
						$("#idNoseCongestion").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].throatLumps=="1"){
						$("#idThroatHoarseness").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].throatLumps=="1"){
						$("#idThroatLumps").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].throatSwollen=="1"){
						$("#idThroatSwollen").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].throatStiffness=="1"){
						$("#idThroatStiffness").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].throatPain=="1"){
						$("#idThroatPain").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].throatDysphagia=="1"){
						$("#idThroatDysphagia").prop("checked", "checked");
					}
					$("#idThroatOther").val(response.nursingtwolist[0].throatOther);
					if(response.nursingtwolist[0].bowelDiarrhoea=="1"){
						$("#idBowelDiarrhoea").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].bowelConstipation=="1"){
						$("#idBowelConstipation").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].bowelIncontinence=="1"){
						$("#idBowelIncontinence").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].bowelBlood=="1"){
						$("#idBowelBlood").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].bowelNone=="1"){
						$("#idBowelNone").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].bowelPain=="1"){
						$("#idBowelPain").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].bowelHemorrhoids=="1"){
						$("#idBowelHemorrhoids").prop("checked", "checked");
					}
					$("#idBowelFrequency").val(response.nursingtwolist[0].bowelFrequency);
					if(response.nursingtwolist[0].bowelInterNone=="1"){
						$("#idBowelInterNone").prop("checked", "checked");
					}
					if(response.nursingtwolist[0].bowelLaxatives=="1"){
						$("#idBowelLaxatives").prop("checked", "checked");
					}
					$("#idBowelInterType").val(response.nursingtwolist[0].bowelInterType);
					$("#idBowelInterFrequency").val(response.nursingtwolist[0].bowelInterFrequency);
				}
		});
}


var intCounot =0;
var OtListTemp ='{#foreach $T.oTList as list1}<tr id="RowCountOt{++intCounot}"><td class="col-md-1"><input type="text" readonly="readonly" onclick= "setTimeForOt({intCounot})" class="form-control input-SmallText" id="oToTime'
	+ '{intCounot}" value="{$T.list1.time}"></td>'
	+ '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="oTIv'
	+ '{intCounot}" value="{$T.list1.iv}"></td>'
	+ '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="oTAmt'
	+ '{intCounot}" value="{$T.list1.amt}" ></td>'
	+ '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="oTUrine'
	+ '{intCounot}" value="{$T.list1.urine}" ></td>'
	+ '<td class="col-md-1"><input class="oTcheck" type="checkbox" value="" id="oTcheck" name="oTcheck'
	+ '{intCounot}" ><input type="hidden" value="{$T.list1.idOutput}" id="oTId{intCounot}" ></td></tr>{#/for}';

var oTRowCount =1;
function toCreateRowOT(){
	
		var rowCountt = $("#OtRow").val();
	    var addrowCountt = $("#addRowCountOt").val();

	    if (rowCountt == -1) {
	        rowCountt = 0;
	    }
	    rowCountt++;
	    rowId = "RowCountOt" + rowCountt;
	    var y = document.createElement('tr');
	    y.setAttribute('id', rowId);
	    document.getElementById("nursingOtBody").appendChild(y);

	    document.getElementById(rowId).innerHTML =
	             '<td class="col-md-1"><input type="text" readonly="readonly" onclick= "setTimeForOt('+rowCountt+')" class="form-control input-SmallText" id="oToTime'
	            + rowCountt    + '"/></td>'
	            + '<td class="col-md-3"><input type="text" class="form-control input-SmallText" id="oTIv'
	            + rowCountt+ '"  ></td>'
	            + '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="oTAmt'
	            + rowCountt+ '"  ></td>'
	            + '<td class="col-md-2"><input type="text" class="form-control input-SmallText" id="oTUrine'
	            + rowCountt+ '"  ></td>'
	            + '<td class="col-md-1"><input  class="checkOt" type="checkbox" value="" id="oTcheck" name="oTcheck'
	            + rowCountt+ '"  ><input type="hidden" value="0" id="oTId'+ rowCountt+ '" /></td>';

	    $("#OtRow").val(rowCountt);
	    $("#addRowCountOt").val(oTRowCount);
	    oTRowCount++;
	 
}

function setTimeForOt(id){
	
	$('#oToTime'+id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
}


function toRemoveRowOT(){
	
    var nRowotrowCount = $("#OtRow").val();
    if (nRowotrowCount == "0") {
        alert("No Data in CheckList");
        return false;
    }
    var allVals = [];
    var flag = false;
    
    $.each($('#oTcheck:checked'), function() {
        allVals.push($(this).val());
        flag = true;
    });

    if (!flag) {
        alert("please check the checbox...");
        return false;
    }

    var rowCountot = $("#OtRow").val();// $("#InvRowCount").val();
    var addrowottCount = $("#addRowCountOt").val();
    
    var count = rowCountot - addrowottCount;
    var totalRowotCount = (Number(rowCountot) + Number(addrowottCount));
    var p = 1;
    var ids="";
    var id ="";
    for ( var i = 1; i <= totalRowotCount; i++) {
        var $radios = $('input:checkbox[name=oTcheck' + i + ']');
        if ($radios.is(':checked') == true) {
            id =$("#oTId"+i).val();
            if(id != ""){
            	ids+= id +"_";	
            }
            $("#RowCountOt" + i + "").remove();
            $("#OtRow").val(--rowCountot);
            
        } 
    }
    
	    var inputs = [];
	    inputs.push('idOutput=' + ids);
		var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/deleteOtRow",
		
		
		success : function(response) {
			alert(response);
			fetchInitalNursingAssessmentOneDay();
		}
	});
}

function setTimeById(id){
	
	$("#"+id).attr('readonly', 'readonly');
	$("#"+id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 30
	});
}

var nra = 1;
function toCreateRowNRA(){
	
	var rowCount = $("#reAssessmentRow").val();

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	rowId = "RowCountNRA" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	document.getElementById("nursingReAssessmentTBody").appendChild(x);

	document.getElementById(rowId).innerHTML = 
			  '<td><input type="text" style="width:60px;" id="TimeOneDay'+rowCount+'" onclick="setTimeById(this.id)" readonly="readonly"/></td>'
			+ '<td>	<input type="text" style="width:60px;" id="TempOneDay'+rowCount+'"/></td>'
			+ '<td> <input type="text" style="width:60px;" id="PulseOneDay'+rowCount+'"/></td>'
			+ '<td> <input type="text" style="width:60px;" id="RROneDay'+rowCount+'"/></td>'
			+ '<td> <input type="text" style="width:60px;" id="BPOneDay'+rowCount+'"/></td>'
			+ '<td> <input type="text" style="width:60px;" id="PainOneDay'+rowCount+'"/></td>'
			+ '<td><input id="checkReAssessment" type="checkbox" name="checkReAssessment'+rowCount+'" value="0">'
			+ ' <input type="hidden" id="reAssessmentId'+rowCount+'" value="0"/></td>';

	$("#reAssessmentRow").val(rowCount);
	$("#addRowCountReAssessment").val(nra);
	nra++;
}
															

function toRemoveRowNRA(){

	var nRowrowCount = $("#reAssessmentRow").val();
	if (nRowrowCount == "0") {
		alert("No Data to Delete ");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkReAssessment:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checkbox...");
		return false;
	}

	var hiddenRowCount = $("#reAssessmentRow").val();
	var rowCount = hiddenRowCount;
	var addrowCount = $("#addRowCountReAssessment").val();
	
	var totalRowCount = (Number(rowCount) + Number(addrowCount));
	var p = 1;
	for ( var i = 0; i < (totalRowCount); i++) {
		var $radios = $('input:checkbox[name=checkReAssessment'+p+']');
		if ($radios.is(':checked') == true) {
			var id = $("#reAssessmentId"+p).val();
			$("#RowCountNRA"+p).remove();
			if(id != 0){
				deleteNRARecord(id);
			}
		}
		p++;
	}; 
}


function deleteNRARecord(id){
	 
	var inputs = [];
		inputs.push('id=' + id);
	 
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/deleteNRARecord",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert("error");
			},
			success : function(response) {
				alert(response);
				fetchInitalNursingAssessmentOneDay();
			}
		});
	
}


function fetchReAssessment(id){
	
	var inputs = [];
	inputs.push('id=' + id);
 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/fetchReAssessment",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {

				var reAssCount=0;
				var htm = '';
				$("#reAssessmentRow").val(response.reAssessmentList.length);
				
				for(var i=0;i < response.reAssessmentList.length;i++){
					reAssCount++;
				
					htm=htm +'<tr id="RowCountNRA'+reAssCount+'" >'
					+ '<td><input type="text" style="width:60px;" id="TimeOneDay'+reAssCount+'" value="'+response.reAssessmentList[i].reAssessmentTime+'" onclick="setTimeById(this.id)" readonly="readonly"/></td>'
					+ '<td>	<input type="text" style="width:60px;" id="TempOneDay'+reAssCount+'" value="'+response.reAssessmentList[i].reAssessmentTemp+'"/></td>'
					+ '<td> <input type="text" style="width:60px;" id="PulseOneDay'+reAssCount+'" value="'+response.reAssessmentList[i].reAssessmentPulse+'"/></td>'
					+ '<td> <input type="text" style="width:60px;" id="RROneDay'+reAssCount+'" value="'+response.reAssessmentList[i].reAssessmentRR+'"/></td>'
					+ '<td> <input type="text" style="width:60px;" id="BPOneDay'+reAssCount+'" value="'+response.reAssessmentList[i].reAssessmentBP+'"/></td>'
					+ '<td> <input type="text" style="width:60px;" id="PainOneDay'+reAssCount+'" value="'+response.reAssessmentList[i].reAssessmentPain+'"/></td>'
					+ '<td> <input id="checkReAssessment" type="checkbox" name="checkReAssessment'+reAssCount+'"  value="'+response.reAssessmentList[i].reAssessmentId+'">'
					+ ' <input type="hidden" id="reAssessmentId'+reAssCount+'" value="'+response.reAssessmentList[i].reAssessmentId+'"></td></tr>';
				
				}
				$("#nursingReAssessmentTBody").html(htm);
				
		}
	});
}