/** @author Dayanand Khandekar
 * @since 17-2-2021
 * @comment get Patient Info For EmbryoTransper
 ******************************************************************************/
function getPatientInfoForEmbryoTransper(){
	var treatmentId = $('#IVFTreatmentId').val();
	
	
	var inputs = [];
	inputs.push("ivftreatmentId=" +treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/getIvfPatientInfoByIVFTreatId",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#patientId').val(r.patientId);
			$('#nameOfPatient').val(r.patientName);
			$('#patientsAge').val(r.age);
			$("input:radio[name='gender'][value='"+r.gender+"']").prop("checked",true);
			
		}
	});
}


/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 17-2-2021
 * @comment get Patient Husband Name
 ******************************************************************************/
function getHusbandNameForEmbryoTransper() {

	var patId = $("#patientId").val();
	
	var inputs = [];

	inputs.push('patId=' + patId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getHusbandNameForOvamPickup",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			$("#husbanName").val(r);
			
		}
	});
}


/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 17-2-2021
 * @comment get Doctor List For Ovam Pick Up Form 
 ******************************************************************************/
function getDoctorListForEmbryoTransper() {
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

			 var htm="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < r.listDoctor.length; i++){    
			        htm = htm + "<option value='"+r.listDoctor[i].doctor_ID+"'> "+r.listDoctor[i].doc_name+" </option>";
			    }
			    $("#emrylogistFresh").html(htm);
			    $("#doctorNameForFresh").html(htm);
	
	
		/*var unitlistTemp = "";
		unitlistTemp = unitlistTemp
				+ "<option value='0'>--Select --</option>";
		for (var i = 0; i < r.listDoctor.length; i++) {
			unitlistTemp = unitlistTemp + "<option value="
					+ r.listDoctor[i].di + " ' data-name=" + r.listDoctor[i].dn + "'>"
					+  r.listDoctor[i].dn + "</option>";
		}
		 $("#emrylogistFresh").html(unitlistTemp);
		    $("#doctorNameForFresh").html(unitlistTemp);*/
		
	}
});
	
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 17-2-2021
 * @comment get Beta HCG Due Date automatically for Fresh  after selecting Embryo transper date
 ******************************************************************************/
function getBetaHCGDueDateForFresh(){
	var dateofembryotransper=$("#dateofembryotransper").val();
	
	var oneYearFromNow = new Date(dateofembryotransper);
	var day1 = oneYearFromNow
			.setDate(oneYearFromNow.getDate() + parseInt(14));
	var betadate= getBetaHCGDueDateForFreshAfterEMTDate(day1);
	
	$("#betahcgduedatefresh").val(betadate);
	
}

function getBetaHCGDueDateForFreshAfterEMTDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "/" + ('0' + mm).slice(-2) + "/" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
}


/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 17-2-2021
 * @comment get Beta HCG Due Date automatically for Frozen  after selecting Embryo transper date
 ******************************************************************************/
function getBetaHCGDueDateForFrozen(){
	var dateofembryotransper=$("#dateoffrozentransper").val();
	
	var oneYearFromNow = new Date(dateofembryotransper);
	var day1 = oneYearFromNow
			.setDate(oneYearFromNow.getDate() + parseInt(14));
	var betadate= getBetaHCGDueDateForFrozenAfterDate(day1);
	
	$("#betahcgduedatefrozen").val(betadate);
	
}

function getBetaHCGDueDateForFrozenAfterDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "/" + ('0' + mm).slice(-2) + "/" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 17-2-2021
 * @comment show fresh or frozen info after clicking on embryo transpr radio button 
 ******************************************************************************/
function showFreshFrozenEmbryoTransper(callfrom){
	
	if(callfrom === "Fresh"){
		
		$("#freshembryotransperinfo").show();	
		$("#frozenembryotransperinfo").hide();	
	}else if(callfrom === "Frozen" ){
		
		$("#frozenembryotransperinfo").show();	
		$("#freshembryotransperinfo").hide();	
	}
	
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 5-3-2021
 * @comment create row for fresh embryo tabel
 ******************************************************************************/
function createRowForFreshEmbryo(){
var rowCount = $('#embryotransperFreshTabel tbody tr').length;
	
	rowCount=parseInt(rowCount+1);
	
	
	var htm = "";

	htm = htm
			+ "<tr class='newRowFreshEmbryo' id='count"+ rowCount+ "'>"
			
			+ "<td><input type='checkbox' class='chkfreshembryo' id='checkbox" 
			+ parseInt(rowCount)
			+ "' name='checkbox'  value='"+parseInt(rowCount)+"'></td>"
			
			+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='freshEmbryoSlaveId" + rowCount + "' value='"
			+ 0 + "' ></td>"
			
			+
			"<td><input type='text'  class='form-control input-SmallText TextFont'  "
			+ "'  id='eggNumber"
			+parseInt(rowCount)
			+ "' ></td> "
			
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='numberOfCells"
			+ rowCount
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='gradeFresh"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			
			
			+ "</tr>";
	
	$("#embryotransperFreshBody").append(htm);
}

function deleteFreshEmbryos(tableId,checkboxClass){
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
	$("input[name='ovampickudocid']:checked").each(function() {	
		
		var slaveId=$("#freshEmbryoSlaveId"+$(this).val()).val();
		
		if(slaveId >0){
	
			docId.push($("#freshEmbryoSlaveId"+$(this).val()).val());
		}
	});

	

	
   if(docId.length>0){

	 var inputs = [];
		inputs.push('freshEmbryoSlaveIds=' + docId);
		inputs.push('userId=' + userId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/shelfsponser/deletefreshEmbryoSlaveInfo",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {
				$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
				alert(response);
				checkForFreshEmbryo(tableId);
				checkFreshEmbryoSequenece(tableId);
				//getIvfCalenderInfo();
				
				
				 
			}
		}); 
   } else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForFreshEmbryo(tableId);
	checkFreshEmbryoSequenece(tableId); 
	
   }
	
}

/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder srno after delete
 ************/
function checkForFreshEmbryo(tableId){
	
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkFreshEmbryoSequenece(tableId){
	
	var trLength = $('#'+tableId).find("tr:first th").length;
	
	trLength=trLength+1;
	
	obj=$('#'+tableId+' tbody tr td').find('input,select,span,td');
	
	
	var inx = 1;
	var idIndex = 1;
	$.each( obj, function( key, value ) {		
		
		if(inx == (trLength+1)){
			
			inx = 1;
			idIndex++;
		}		
		id=value.id;	
		
		var idText = (value.id).replace(/[0-9]/g, '');
		
		var replaceById = idText + idIndex;
		$('#'+id).attr('id',replaceById);
		
		inx++;
	});
}


/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 5-3-2021
 * @comment create row for frozen embryo tabel
 ******************************************************************************/
function createRowFrozenEmbryo(){
var rowCount = $('#embryotransperFrozenTabel tbody tr').length;
	
	rowCount=parseInt(rowCount+1);
	
	
	var htm = "";

	htm = htm
			+ "<tr class='newRowFrozenEmbryo' id='count"+ rowCount+ "'>"
			
			+ "<td><input type='checkbox' class='chkfrozenembryo' id='checkbox" 
			+ parseInt(rowCount)
			+ "' name='checkbox'  value='"+parseInt(rowCount)+"'></td>"
			
			+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='frozenEmbryoSlaveId" + rowCount + "' value='"
			+ 0 + "' ></td>"
			
			+
			"<td><input type='text'  class='form-control input-SmallText TextFont'  "
			+ "'  id='postThawCellStage"
			+parseInt(rowCount)
			+ "' ></td> "
			
			
			
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='gradeFrozen"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			
			
			+ "</tr>";
	
	$("#embryotransperFrozenBody").append(htm);
}


function deleteFrozenEmbryos(tableId,checkboxClass){
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
	$("input[name='ovampickudocid']:checked").each(function() {	
		
		var slaveId=$("#frozenEmbryoSlaveId"+$(this).val()).val();
		
		if(slaveId >0){
	
			docId.push($("#frozenEmbryoSlaveId"+$(this).val()).val());
		}
	});

	

	
   if(docId.length>0){

	 var inputs = [];
		inputs.push('frozenEmbryoSlaveIds=' + docId);
		inputs.push('userId=' + userId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/shelfsponser/deletefrozenEmbryoSlaveInfo",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {
				$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
				alert(response);
				checkForFrozenEmbryo(tableId);
				checkFrozenEmbryoSequenece(tableId);
				//getIvfCalenderInfo();
				
				
				 
			}
		}); 
   } else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForFrozenEmbryo(tableId);
	checkFrozenEmbryoSequenece(tableId); 
	
   }
	
}

/************
* @author	:Dayanand Khandekar
* @date		: 8-3-2021
* @codeFor	: For reorder srno after delete
 ************/
function checkForFrozenEmbryo(tableId){
	
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 8-3-2021
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkFrozenEmbryoSequenece(tableId){

	var trLength = $('#'+tableId).find("tr:first th").length;
	
	trLength=trLength+1;
	obj=$('#'+tableId+' tbody tr td').find('input,select,span,td');
	var inx = 1;
	var idIndex = 1;
	$.each( obj, function( key, value ) {		
		
		if(inx == (trLength+1)){
			
			inx = 1;
			idIndex++;
		}		
		id=value.id;	
		
		var idText = (value.id).replace(/[0-9]/g, '');
		
		var replaceById = idText + idIndex;
		$('#'+id).attr('id',replaceById);
		
		
		inx++;
	});
}


function saveEmbryoTransperForm(){
	
	var embryoTransferMasterId=$("#embryoTransferMasterId").val();
	
	var treatmentId=$("#treatmentId").val();
	
	var patientId=$("#patientId").val();
	
	var patientName=$("#nameOfPatient").val();
	
	var patient_age=$("#patientsAge").val();
	
	var patientHusbandName=$("#husbanName").val();
	
	var patient_gender="";
	patient_gender=	$('input[name="gender"]:checked').val();
	
	var cycleNo=$("#cycleNo").val();
	
	var embryologistName=$("#embryologist").val();
	
	var dateofEmbryoTransper=$("#dateofembryotransper").val();
	
	var embryoTransperFlag=	$('input[name="embryotransper"]:checked').val();
	
	var anaThesia=$("#anaethesia").val();
	
	var noofEmbryoTranspered=$("#noofemtranspered").val();
	
	var timeofEmbryoTransper=$("#timeofembryotransper").val();
	
	var freshembryologistId=$("#emrylogistFresh").val();
	
	var freshembryologistName= $( "#emrylogistFresh option:selected" ).text();
	
	var phobotomisName = $("#emrylogistFresh").find(':selected').attr('data-name');
	
	//var selected = $('.category').find(':selected').attr('data-name');
//	alert("phobotomisName..."+phobotomisName );
	
	var Endometrium= $("#endometrium").val();
	
	var doctorFreshId= $("#doctorNameForFresh").val();
	
	var doctorFreshName=$( "#doctorNameForFresh option:selected" ).text();
	
	var cathetorUsed=$("#cathetorused").val();
	
	var witness=$("#witness").val();
	
	var natureOfET=$("#natureofet").val();
	
	var bloodInCatheter= $('input[name="bloodincatheter"]:checked').val();
	
	var embryoReturned=	$('input[name="embryoReturned"]:checked').val();
	
	var betaHCGDueDateFresh=$("#betahcgduedatefresh").val();
	
	var numberFrozen=$("#numberfrozen").val();
	
	var embryoNumber=$("#embryonumber").val();
	
	var numberofStraws=$("#numberofstraws").val();
	
	var strawDescription=$("#strawdescription").val();
	
	var storageSite=$("#storagesite").val();
	
	var comments=$("#comments").val();
	
	var assistedHatchingFalg=$('input[name="assistedhatching"]:checked').val();
	
	var dateOfAttachedHatching=$("#dateofattachedhatching").val();
	
	var timeOfAttachedHatching=$("#timeofattachedhatching").val();
	
	var blastocystFalg=$('input[name="blastocyst"]:checked').val();
	
	var dateOfBlastocyst=$("#dateofblastocyst").val();
	
	var timeOfBlastocyst=$("#timeofblastocyst").val();
	
	var frozenDate=$("#dateoffrozentransper").val();
	
	var frozenTime=$("#timeoffrozentransper").val();
	
	var frozenThawed=$("#thawed").val();
	
	var frozenTransfered=$("#frozentransfered").val();
	
	var frozenBalance=$("#frozenbalance").val();
	
	var frozenBetaHCGDueon=$("#betahcgduedatefrozen").val();
	
	var coupleId=$("#coupleId").val();
	
	var batchCreationId=$("#batchCreationId").val();
	
	var userId=$("#userId").val();
	
	var unitId=$("#unitId").val();
	
	
	// this is for fresh embryo salve details
	/*var freshembryoSlaveInfo = $('#embryotransperFreshTabel tbody tr.newRowFreshEmbryo').length;
	if (freshembryoSlaveInfo == "" || freshembryoSlaveInfo == null || freshembryoSlaveInfo == 0) {
		alert("Enter at least One Record In Fresh Embryo  Tabel ");
		return false;
	}*/
	
	var freshEmbryoSlaveList = {
			getListOfEmbryoFreshSlaveDTO : []
		};
	
	var rows = $('#embryotransperFreshTabel tbody tr.newRowFreshEmbryo').length;
	
	for ( var i = 1; i <= rows; i++) {
		var freshEmbryoSlaveId = $("#freshEmbryoSlaveId" + i).val();

		var eggNumber = $("#eggNumber" + i).val();
		var numberOfCells = $("#numberOfCells" + i).val();
		var gradeFresh = $("#gradeFresh" + i).val();
		
		

		setFreshEmbroSlavenfoInfoList(freshEmbryoSlaveList, freshEmbryoSlaveId,
				eggNumber, numberOfCells, gradeFresh, userId, unitId,patientId,treatmentId,cycleNo,coupleId,batchCreationId);
	}
	freshEmbryoSlaveList = JSON.stringify(freshEmbryoSlaveList);
	
	
	// this is for frozen embryo salve details
/*	var frozenembryoSlaveInfo = $('#embryotransperFrozenTabel tbody tr.newRowFrozenEmbryo').length;
	if (frozenembryoSlaveInfo == "" || frozenembryoSlaveInfo == null || frozenembryoSlaveInfo == 0) {
		alert("Enter at least One Record In Frozen Embryo  Tabel ");
		return false;
	}*/
	
	var rows1 = $('#embryotransperFrozenTabel tbody tr.newRowFrozenEmbryo').length;
	
	var frozenEmbryoSlaveList = {
			getListOfEmbryoFrozenSlaveDTO : []
		};
	
	for ( var i = 1; i <= rows1; i++) {
		var frozenEmbryoSlaveId = $("#frozenEmbryoSlaveId" + i).val();
		var postThawCellStage = $("#postThawCellStage" + i).val();
		var gradeFrozen = $("#gradeFrozen" + i).val();

		setFrozenEmbroSlavenfoInfoList(frozenEmbryoSlaveList, frozenEmbryoSlaveId,
				postThawCellStage, gradeFrozen, userId, unitId,patientId,treatmentId,cycleNo,coupleId,batchCreationId);
	}
	
	frozenEmbryoSlaveList = JSON.stringify(frozenEmbryoSlaveList);
	
	var inputs = [];
	
	inputs.push('embryoTransferMasterId=' + embryoTransferMasterId);
	
	inputs.push('patientId=' + patientId);
	
	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('patientName=' + patientName);
	
	inputs.push('patient_age=' + patient_age);
	
	inputs.push('patient_gender=' + patient_gender);
	
	inputs.push('patientHusbandName=' + patientHusbandName);
	
	inputs.push('cycleNo=' + cycleNo);
	
	inputs.push('embryologistName=' + embryologistName);
	
	inputs.push('dateofEmbryoTransper=' + dateofEmbryoTransper);
	
	inputs.push('embryoTransperFlag=' + embryoTransperFlag);
	
	inputs.push('anaThesia=' + anaThesia);
	
	inputs.push('noofEmbryoTranspered=' + noofEmbryoTranspered);
	
	inputs.push('timeofEmbryoTransper=' + timeofEmbryoTransper);
	
	inputs.push('freshembryologistId=' + freshembryologistId);
	
	inputs.push('freshembryologistName=' + freshembryologistName);
	
	inputs.push('Endometrium=' + Endometrium);
	
	inputs.push('doctorFreshId=' + doctorFreshId);
	
	inputs.push('doctorFreshName=' + doctorFreshName);
	
	inputs.push('cathetorUsed=' + cathetorUsed);
	
	inputs.push('witness=' + witness);
	
	inputs.push('natureOfET=' + natureOfET);
	
	inputs.push('bloodInCatheter=' + bloodInCatheter);
	
	inputs.push('embryoReturned=' + embryoReturned);
	
	inputs.push('betaHCGDueDateFresh=' + betaHCGDueDateFresh);
	
	inputs.push('numberFrozen=' + numberFrozen);
	
	inputs.push('embryoNumber=' + embryoNumber);
	
	inputs.push('numberofStraws=' + numberofStraws);
	
	inputs.push('strawDescription=' + strawDescription);
	
	inputs.push('storageSite=' + storageSite);
	
	inputs.push('comments=' + comments);
	
	inputs.push('assistedHatchingFalg=' + assistedHatchingFalg);
	
	inputs.push('dateOfAttachedHatching=' + dateOfAttachedHatching);
	
	inputs.push('timeOfAttachedHatching=' + timeOfAttachedHatching);
	
	inputs.push('blastocystFalg=' + blastocystFalg);
	
	inputs.push('dateOfBlastocyst=' + dateOfBlastocyst);
	
	inputs.push('timeOfBlastocyst=' + timeOfBlastocyst);
	
	inputs.push('frozenDate=' + frozenDate);
	
	inputs.push('frozenTime=' + frozenTime);
	
	inputs.push('frozenThawed=' + frozenThawed);
	
	inputs.push('frozenTransfered=' + frozenTransfered);
	
	inputs.push('frozenBalance=' + frozenBalance);
	
	inputs.push('frozenBetaHCGDueon=' + frozenBetaHCGDueon);
	
	inputs.push('coupleId=' + coupleId);
	
	inputs.push('batchCreationId=' + batchCreationId);
	
	inputs.push('createdBy=' + userId);
	
	inputs.push('userId=' + userId);
	
	inputs.push('unitId=' + unitId);
	
	inputs.push('updatedBy=' + userId);
	
	inputs.push("freshEmbryoSlaveList="	+ encodeURIComponent(freshEmbryoSlaveList));
	
	inputs.push("frozenEmbryoSlaveList="	+ encodeURIComponent(frozenEmbryoSlaveList));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/saveEmbryoTransperForm",
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

			
			getEmbryoMasterInfo();

		}
	});
	
}


function setFreshEmbroSlavenfoInfoList(freshEmbryoSlaveList, freshEmbryoSlaveId,
		eggNumber, numberOfCells, gradeFresh, userId, unitId,patientId,treatmentId,cycleNo,coupleId,batchCreationId)
{
	freshEmbryoSlaveList.getListOfEmbryoFreshSlaveDTO.push({
		freshEmbryoSlaveId : freshEmbryoSlaveId,
		eggNumber : eggNumber,
		numberOfCells : numberOfCells,
		gradeFresh : gradeFresh,
		coupleId : coupleId,
		patientId : patientId,
		batchCreationId : batchCreationId,
		treatmentId : treatmentId,
		cycleNo : cycleNo,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
		
	});
	
}

function setFrozenEmbroSlavenfoInfoList(frozenEmbryoSlaveList, frozenEmbryoSlaveId,
		postThawCellStage, gradeFrozen, userId, unitId,patientId,treatmentId,cycleNo,coupleId,batchCreationId){
	
	frozenEmbryoSlaveList.getListOfEmbryoFrozenSlaveDTO.push({
		frozenEmbryoSlaveId : frozenEmbryoSlaveId,
		postThawCellStage : postThawCellStage,
		gradeFrozen : gradeFrozen,
		coupleId : coupleId,
		patientId : patientId,
		batchCreationId : batchCreationId,
		treatmentId : treatmentId,
		cycleNo : cycleNo,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
		
	});
	
}

function getEmbryoMasterInfo(){
	
	var inputs = [];
	var patientId=$("#patientId").val();
	var cycleNo=$("#cycleNo").val();

	inputs.push('patientId=' + patientId);
	inputs.push('cycleNo=' + cycleNo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getEmbryoMasterInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
	
			if(r === ""){
				return false;
			}else{
				
			$("#embryoTransferMasterId").val(r.embryoTransferMasterId);
			
				$("#treatmentId").val(r.treatmentId);
				
				$("#patientId").val(r.patientId);
				
				$("#nameOfPatient").val(r.patientName);
				
				$("#patientsAge").val(r.patient_age);
				
				$("#husbanName").val(r.patientHusbandName);
				
				$("#cycleNo").val(r.cycleNo);
				
				$("#embryologist").val(r.embryologistName);
				
				$("#dateofembryotransper").val(r.dateofEmbryoTransper);
				
				$("input:radio[name='embryotransper'][value='"+r.embryoTransperFlag+"']").prop("checked",true);
				
				$("#anaethesia").val(r.anaThesia);
				
				$("#noofemtranspered").val(r.noofEmbryoTranspered);
				
				$("#timeofembryotransper").val(r.timeofEmbryoTransper);
				
				var strVale = r.freshembryologistId;

				var strArr = strVale.split(',');
				
			 	$('#emrylogistFresh').select2('val', strArr);
				
				$("#endometrium").val(r.Endometrium);
				
				var strVale11 = r.freshembryologistId;

				var strArr11 = strVale11.split(',');
				
				$('#doctorNameForFresh').select2('val', strArr11);
				
				$("#cathetorused").val(r.cathetorUsed);
				
				$("#witness").val(r.witness);
				
				$("#natureofet").val(r.natureOfET);
				
				$("input:radio[name='bloodincatheter'][value='"+r.bloodInCatheter+"']").prop("checked",true);
				
				$("input:radio[name='embryoReturned'][value='"+r.embryoReturned+"']").prop("checked",true);
				
				$("#betahcgduedatefresh").val(r.betaHCGDueDateFresh);
				
				$("#numberfrozen").val(r.numberFrozen);
				
				$("#embryonumber").val(r.embryoNumber);
				
				$("#numberofstraws").val(r.numberofStraws);
				
				$("#strawdescription").val(r.strawDescription);
				
				$("#storagesite").val(r.storageSite);
				
				$("#comments").val(r.comments);
				
				$("input:radio[name='assistedhatching'][value='"+r.assistedHatchingFalg+"']").prop("checked",true);
				
				$("#dateofattachedhatching").val(r.dateOfAttachedHatching);
				
				$("#timeofattachedhatching").val(r.timeOfAttachedHatching);
				
				$("input:radio[name='blastocyst'][value='"+r.blastocystFalg+"']").prop("checked",true);
				
				$("#dateofblastocyst").val(r.dateOfBlastocyst);
				
				$("#timeofblastocyst").val(r.timeOfBlastocyst);
				
				$("#dateoffrozentransper").val(r.frozenDate);
				
				$("#timeoffrozentransper").val(r.frozenTime);
				
				$("#thawed").val(r.frozenThawed);
				
				$("#frozentransfered").val(r.frozenTransfered);
				
				$("#frozenbalance").val(r.frozenBalance);
				
				$("#betahcgduedatefrozen").val(r.frozenBetaHCGDueon);
				
				$("#coupleId").val(r.coupleId);
				
				$("#batchCreationId").val(r.batchCreationId);
				
				var embfalg=r.embryoTransperFlag;
				if(embfalg === "Frozen"){ 
				showFreshFrozenEmbryoTransper('Frozen');
				}else if (embfalg === 'Fresh'){
					showFreshFrozenEmbryoTransper('Fresh');
				}
				
				setfreshEmbryoSlaveTemplate(r);
				setfrozenEmbryoSlaveTemplate(r);
				
			}

			
		}
	});
}

function setfreshEmbryoSlaveTemplate(r){
	
	$("#embryotransperFreshBody").html("");
	var htm = "";
	var rowCount = 0;

	
	if (r.getListOfEmbryoFreshSlaveDTO.length > 0) {

		for ( var i = 0; i < r.getListOfEmbryoFreshSlaveDTO.length; i++) {
			rowCount++;
			
			htm = htm
					+ "<tr class='newRowFreshEmbryo' id='count"
					+ (rowCount)
					+ "'>"
					
					+ "<td><input type='checkbox' class='chkfreshembryo'   value='"+rowCount+"'"
					
					+ " name='ovampickudocid'   isNew='false' id="+r.getListOfEmbryoFreshSlaveDTO[i].freshEmbryoSlaveId+"></td>"
					
			
					+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden' id='freshEmbryoSlaveId"+rowCount+"' value="+r.getListOfEmbryoFreshSlaveDTO[i].freshEmbryoSlaveId+"></td>"
					
					
					+"<td><input type='text'  class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfEmbryoFreshSlaveDTO[i].eggNumber
					+ "'  id='eggNumber"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td ><input type='text' class='form-control input-SmallText TextFont'   value='"
					+ r.getListOfEmbryoFreshSlaveDTO[i].numberOfCells
					+ "'    id='numberOfCells"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfEmbryoFreshSlaveDTO[i].gradeFresh
					+ "' id='gradeFresh"
					+ (rowCount)
					+ "' ></td> "
					
					
					+ "</tr>";
			
		}
		
		
		$("#embryotransperFreshBody").append(htm);
	}
	
}

function setfrozenEmbryoSlaveTemplate(r){
	
	$("#embryotransperFrozenBody").html("");
	var htm = "";
	var rowCount = 0;

	
	if (r.getListOfEmbryoFrozenSlaveDTO.length > 0) {

		for ( var i = 0; i < r.getListOfEmbryoFrozenSlaveDTO.length; i++) {
			rowCount++;
			
			htm = htm
					+ "<tr class='newRowFrozenEmbryo' id='count"
					+ (rowCount)
					+ "'>"
					
					+ "<td><input type='checkbox' class='chkfrozenembryo'   value='"+rowCount+"'"
					
					+ " name='ovampickudocid'   isNew='false' id="+r.getListOfEmbryoFrozenSlaveDTO[i].frozenEmbryoSlaveId+"></td>"
					
			
					+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden' id='frozenEmbryoSlaveId"+rowCount+"' value="+r.getListOfEmbryoFrozenSlaveDTO[i].frozenEmbryoSlaveId+"></td>"
					
					
					+"<td><input type='text'  class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfEmbryoFrozenSlaveDTO[i].postThawCellStage
					+ "'  id='postThawCellStage"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td ><input type='text' class='form-control input-SmallText TextFont'   value='"
					+ r.getListOfEmbryoFrozenSlaveDTO[i].gradeFrozen
					+ "'    id='gradeFrozen"
					+ (rowCount)
					+ "' ></td> "
					
					+ "</tr>";
			
		}
		
		
		$("#embryotransperFrozenBody").append(htm);
	}
	
}


function embryoTransperPrint(){
	/*var patientId =$("#patientId").val();
	var treatmentId =$("#treatmentId").val();
	var cycleNo =$("#cycleNo").val();
	var pageSize = "standard"; 
	
	window.open(("embryo_transper_form_print.jsp?pid=" + patientId +"&tid="+treatmentId +"&cycleNo="+cycleNo +"&pageSize="+pageSize));*/

	var treatmentId=$("#treatmentId").val();
	var patientId=$("#patientId").val();
	var cycleNo=$("#cycleNo").val();
	var IVFTreatmentId=$("#IVFTreatmentId").val();
	
	var pageSize = "standard"; 
	var billId=0;
	var recId=0;
	 var pendFlag="N"; 
	
	
		setTimeout(function() {
			window.open(("embryo_transper_form_print.jsp?" + "&treatId="+ treatmentId + "&patId=" + patientId + "&cycleNo=" + cycleNo + "&recId=" + recId+"&billId="+billId+"&pendFlag="+pendFlag ));
		}, 300);
	
}
