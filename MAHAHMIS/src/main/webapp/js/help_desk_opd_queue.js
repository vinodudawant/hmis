
function displayLED(){
	
	var specialityId = $("#specialityId").val();
	var inputs = [];
	inputs.push('specialityId=' + specialityId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		data : str + "&reqType=AJAX",
		type : "POST",
		url : "ehat/opdqueue/displayLED",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {			
		},
		success : function(response) {
			
			$('#displayLEDBody').html("");
			setTempDisplayLED(response);
		}
	});
}

/* //Modify by Laxman on 29-Dec-2017.
function setTempDisplayLEDOld(response) {
	alert("============"+JSON.stringify(response));
	var myArray = new Array();
	var displayLED = "";
	 for(var i=0;i<response.roomArray.length;i++){
		displayLED = displayLED + "<tr class='room_"+response.roomArray[i].room_id+"' style='height: 55px;'><td style='text-align: center;' >"+response.roomArray[i].room_name+"</td><td id ='room_"+response.roomArray[i].room_id+"'>("+response.roomArray[i].created_date_time+")  "+response.roomArray[i].tokenno+" </td></tr>";
		myArray['tokenRoom_'+response.roomArray[i].room_id] = 0;
	}
	$('#displayLEDBody').html(displayLED); 
	var index=1;
	for(var j=0;j<response.tokenArray.length;j++){
		// console.log(response.tokenArray[j].roomId); 
		if(response.tokenArray[j].queueStatus=="in"){
		 $("#room_"+response.tokenArray[j].roomId).append("<input class='btn btn-success tokenRoom_"+response.tokenArray[j].roomId+"_"+index+"' id='btntoken_"+response.tokenArray[j].roomId+"_"+index+"' type='button' style='font-size: 18px; width:4%;color: black;margin-left: 10px !important;' value="+response.tokenArray[j].commonTokenNumber+"></button>");
		myArray['tokenRoom_'+response.tokenArray[j].roomId] = index;
		index++;
		}
		
	 }
	for(var j=0;j<response.tokenArray.length;j++){
		if(response.tokenArray[j].queueStatus!="in" && response.tokenArray[j].queueStatus!="out" && response.tokenArray[j].queueStatus!="cancel"){
			$("#room_"+response.tokenArray[j].roomId).append("<input class='btn btn-danger tokenRoom_"+response.tokenArray[j].roomId+"_"+index+"' id='btntoken_"+response.tokenArray[j].roomId+"_"+index+"' type='button' style='font-size: 18px; width:4%;color: black;margin-left: 10px !important;' value="+response.tokenArray[j].commonTokenNumber+"></button>");
			index++;
		}
	}
	
	for (var i in myArray) {
		($("."+i+"_"+myArray[i]).next()).removeClass("btn-danger").addClass("btn-warning");
		($("#room_"+i.split("_")[1]+" .btn-warning").next().nextAll()).remove();
		var trLength =$("#room_"+i.split("_")[1]+" .btn").length;
		//alert(i.split("_")[1]);
		if(trLength==0){
			$(".room_"+i.split("_")[1]).remove();
		}
		
		var tokenlength = ($("#room_"+i.split("_")[1]+" .btn-warning")).length;
		if(tokenlength==0){
			($("#room_"+i.split("_")[1]+" .btn-danger").nextAll().slice($("#tokenLimit").val(), $("#room_"+i.split("_")[1]+" .btn-danger").length)).remove();
		}
	}
	
} */

//Modify by Laxman on 05-Jan-2018.
function setTempDisplayLED(response) {

	var tokenLimitIn = $("#tokenLimitIn").val();
	var tokenLimitNext = $("#tokenLimitNext").val();
	var tokenLimitWait = $("#tokenLimitWait").val();
	
	var displayLED = "";
	
	//For rooms.
	for(var i=0;i<response.roomArray.length;i++){
			
		var inPatientCount = 1;
		var nextPatientCount = 1;
		var waitPatientCount = 1;
		
		displayLED = "<tr class='room_"+response.roomArray[i].room_id+"' style='height: 55px;'><td style='text-align: center;' >"+response.roomArray[i].room_name+"</td><td class='col-md-1'>"+response.roomArray[i].docInitial+" </td><td class='col-md-3' id ='room_in_"+response.roomArray[i].room_id+"'></td><td class='col-md-3' id ='room_next_"+response.roomArray[i].room_id+"'></td><td class='col-md-3' id ='room_wait_"+response.roomArray[i].room_id+"'></td></tr>";
		$('#displayLEDBody').append(displayLED);
				
		//for in patients.
		for(var j=0;j<response.tokenArray.length;j++){
			if(response.tokenArray[j].queueStatus=="in" && Number(response.roomArray[i].room_id) == Number(response.tokenArray[j].roomId) && Number(inPatientCount) <= Number(tokenLimitIn)){
				$("#room_in_"+response.tokenArray[j].roomId).append("<input title='"+response.tokenArray[j].patientName+"_"+response.tokenArray[j].sendDateTime+"' class='btn btn-success tokenRoom_"+response.tokenArray[j].roomId+"' id='btntoken_"+response.tokenArray[j].roomId+"' type='button' style='font-size: 20px; width:45px; color: black;margin-left: 10px !important;border: 1px solid black;' value="+response.tokenArray[j].commonTokenNumber+"></button>");
				inPatientCount++;
			}
		 }
		
		//for next patients.
		//if(Number(inPatientCount) > Number(tokenLimitIn)){
			for(var j=0;j<response.tokenArray.length;j++){
				if(response.tokenArray[j].queueStatus=="next" && Number(response.roomArray[i].room_id) == Number(response.tokenArray[j].roomId) && Number(nextPatientCount) <= Number(tokenLimitNext)){
					$("#room_next_"+response.tokenArray[j].roomId).append("<input title='"+response.tokenArray[j].patientName+"' class='btn btn-warning tokenRoom_"+response.tokenArray[j].roomId+"' id='btntoken_"+response.tokenArray[j].roomId+"' type='button' style='font-size: 20px; width:45px; color: black;margin-left: 10px !important;border: 1px solid black;' value="+response.tokenArray[j].commonTokenNumber+"></button>");
					nextPatientCount++;
				}
			 }
		//}
		
	 	//for wait patients.
		//if(Number(inPatientCount) > Number(tokenLimitIn) && Number(nextPatientCount) > Number(tokenLimitNext)){
			for(var j=0;j<response.tokenArray.length;j++){
				if(response.tokenArray[j].queueStatus=="wait" && Number(response.roomArray[i].room_id) == Number(response.tokenArray[j].roomId) && Number(waitPatientCount) <= Number(tokenLimitWait)){
					$("#room_wait_"+response.tokenArray[j].roomId).append("<input title='"+response.tokenArray[j].patientName+"' class='btn btn-danger tokenRoom_"+response.tokenArray[j].roomId+"' id='btntoken_"+response.tokenArray[j].roomId+"' type='button' style='font-size: 20px; width:45px; color: black;margin-left: 10px !important;border: 1px solid black;' value="+response.tokenArray[j].commonTokenNumber+"></button>");
					waitPatientCount++;
				}
			} 
		//} 	
	}
}

function getAllSpecialityMaster(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/centerMgttoken/getAllSpecialityMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSpecialityMaster(r,"All");			
		}
	});
}

function setAllSpecialityMaster(r,CallFrom){

	var specialityId = $("#specialityId").val();
	for ( var i = 0; i < r.lstSpecialityMaster.length; i++) {
		
		if(specialityId == r.lstSpecialityMaster[i].specialisationId){
			
			$("#tokenLimitIn").val(r.lstSpecialityMaster[i].inCount);
			$("#tokenLimitNext").val(r.lstSpecialityMaster[i].nextCount);
			$("#tokenLimitWait").val(r.lstSpecialityMaster[i].waitingCount);
		}		
	}
}
