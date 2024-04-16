
function setMulSponser(){
	 var queryType = $("#queryType").val();
	 
		if(queryType=="update"){
			//$('#mulSponsorDetail').fadeIn();
			var si=1;
			
			if(si>0){
		 		/*$('#sponsor_select').select2('enable');
		 		
		 		$('#sponsor_select').html('');
		 		//$('.select2-chosen').text(" ");
		 		$('#dynamicItem').html('');
		 		 $( "#empid" ).prop( "disabled", false );*/
		 		//$('#empid').select2('enable');
				//$('#empid').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
		 		//$('#sponserselectDiv').show();
		 		//$('#sponserselectDiv').slideDown();
				$('#mulSponserselectDiv').fadeIn();
				getMulSponsorRecords('sourceid','slaveid');
		 		$("#mulDynamicItemDiv" ).prop( "disabled", true );
		 		$('#mulDynamicItemDiv').find('input, button, select').attr('disabled','disabled');
				$("#personalDetails2").css( "display","none");
				$('.mulRefClass').fadeIn();
		  		//$('#sponserselectDiv').fadeOut();
		 		//$('#dynamicItemDiv').show();
		 		
		 	}
			
			}else{
				//$('#mulSponsorDetail').fadeOut();
			}
		
}

function getMulSponsorRecords(callFrom,sourceTypeId) {
	//alert("hi sponsor...");
/*	var chargesMasterDto;
	if(callFrom=="sourceid") {
		chargesMasterDto=$("#mulSourceType").val();
	}else{
		
		//chargesMasterDto=0;
	}*/
	chargesMasterDto=1;
	//alert(chargesMasterDto);
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {
 			
 			console.log(r);
			setTemplateForMulSponsorSelectList(r,callFrom);
		//	$('#dynamicItem').html(" ");
			
			//alert(r);
			//setTempAllRecords(r);
		}
	});
}


function setTemplateForMulSponsorSelectList(r,callFrom){

	var list="<option></option>";
	//For remove existing data.
	var spnsrList = [];
	
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		list=list+'<option value="'+(r.lstChargesSlave[int].slaveId)+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
	}	
	
	$("#mul_sponsor_select").html(list);
	$('#mul_sponsor_select').select2();
	}

function saveMultipleSponsor() {
	var mulSponsorId=$('#mulSponsorId').val();
	var patientId=$('#patientId').val();
	var treatmentId=  $('#treatmentId').val();
	var sponsorId=1;
	var chargesSlaveId=$('#mul_sponsor_select').val();
	var tpaid=$("#mulTpaid").val();
	var empid=$("#mulEmpid").val();
	var sactionOrdNo=$("#mulSactionOrdNo").val();
	var sanctionAmt=$('#mulSanctionAmt').val();
	var neisNo=$("#mulNeisNo").val();
	var visitNo=$("#mulVisitNo").val();
	var ipdOrOpd=$("#mulIpdOrOpd").val();
	var treatPermited=$("#mulTreatPermited").val();
	var diseToBeTreat=$("#mulDiseToBeTreat").val();
	var refDt=$("#mulRefDate").val();
	var refDate="";
	var validUpToDt=$("#mulValidUpToDate").val();
	var validUpToDate="";
	var departmentId = $("#department option:selected").val();
	
	if (chargesSlaveId == 0 || chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined) {
		alertify.error("Please select sponsor..!!");
		return false;
	}
	
	if (departmentId == "" || departmentId == null || departmentId == undefined) {
		departmentId = 0;
	}
	
	if (mulSponsorId == "" || mulSponsorId == null || mulSponsorId == undefined) {
		mulSponsorId = 0;
	}

	if(refDt == null || refDt == "" || refDt == undefined){
		refDt=0;
	}
	
	if(sanctionAmt == null || sanctionAmt == "" || sanctionAmt == undefined){
		sanctionAmt = 0;
	}
	if(sactionOrdNo == null || sactionOrdNo == "" || sactionOrdNo == undefined){
		sactionOrdNo = 0;
	}
	if(neisNo == null || neisNo == "" || neisNo == undefined){
		neisNo = 0;
	}
	if(visitNo == null || visitNo == "" || visitNo == undefined){
		visitNo = 0;
	}
	if(ipdOrOpd == null || ipdOrOpd == "" || ipdOrOpd == undefined){
		ipdOrOpd = 0;
	}
	
	if(validUpToDt == null || validUpToDt == "" || validUpToDt == undefined){
		validUpToDt=0;
	}
	
	if(treatPermited == null || treatPermited == "" || treatPermited == undefined){
		treatPermited = 0;
	}
	if(diseToBeTreat == null || diseToBeTreat == "" || diseToBeTreat == undefined){
		diseToBeTreat = 0;
	}
	
	if(refDt!=0){
		var dd=refDt.split("/")[0];
		var mm=refDt.split("/")[1];
		var yyyy=refDt.split("/")[2];
		refDt=mm+"/"+dd+"/"+yyyy;
		refDate=new Date(refDt);
	}else{
		refDate=null;
	}
	
	
	if(validUpToDt!=0){
		var dd=validUpToDt.split("/")[0];
		var mm=validUpToDt.split("/")[1];
		var yyyy=validUpToDt.split("/")[2];
		validUpToDt=mm+"/"+dd+"/"+yyyy;
		validUpToDate=new Date(validUpToDt);
	}else{
		validUpToDate=null;
	}

	var multipleSponsorDtls = {
			listMultipleSponsor : []
		};
	
	multipleSponsorDtls.listMultipleSponsor.push({
		mulSponsorId	: mulSponsorId,
		patientId    	: patientId,
		treatmentId  	: treatmentId,
		sponsorId 		: sponsorId,
		chargesSlaveId 	: chargesSlaveId,
		sactionOrdNo 	: sactionOrdNo,
		sanctionAmt 	: sanctionAmt,
		neisNo 		 	: neisNo,
		visitNo 		: visitNo,
		ipdOrOpd 		: ipdOrOpd,
		treatPermited 	: treatPermited,
		diseToBeTreat 	: diseToBeTreat,
		tpaid 		 	: tpaid,
		empid 		 	: empid,
		refDate 		: refDate,
		validUpToDate   : validUpToDate,
		remSanctionAmt	: sanctionAmt,
		departmentId	: departmentId
	});
	
	multipleSponsorDtls = JSON.stringify(multipleSponsorDtls);

	var inputs = [];
	inputs.push('multipleSponsorDtls=' + multipleSponsorDtls);
	var str = inputs.join('&');
	
	jQuery.ajax({

        async : false,
        type : "POST",
        data : str + "&reqType=AJAX",
        url : "ehat/registration/saveMultipleSponsor",
		success : function(r) {

			if(Number(r)==1){
				if(Number(mulSponsorId)==0){
					alertify.success("Save successfully...!!");
				}else{
					alertify.success("Update successfully...!!");
				}
			}else if(Number(r)==2){
				alertify.error("Record already exist..!!");
			}else{
				alertify.error("error...!!");
			}
			refreshSponsorDiv();
		}
	});
}

function getMultilpleSponsorList() {

	var treatmentId=  $('#treatmentId').val();
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"treatmentId" : treatmentId
		},
		url : "ehat/registration/getMultilpleSponsorList",
		success : function(r) {
 			
 			console.log(r);
 			setTempSavedMulSponsor(r);
 			$("#mul_sponsor_select").select2({
 	            placeholder: "Select your sponsor"
 	        });
 			
 			$("#get_sponsor_select").select2({
 	            placeholder: "Select your sponsor"
 	        });
		//	$('#dynamicItem').html(" ");
			
			//alert(r);
			//setTempAllRecords(r);
		}
	});
}

function setTempSavedMulSponsor(r){

	var list="<option></option>";
	

	for ( var int = 0; int < r.listChargesMasterSlave.length; int++) {

	/*	if(callFrom==r.lstChargesSlave[int].slaveId){
  			$("#corporate").text(r.lstChargesSlave[int].categoryName);

		} */
			list=list+'<option value="'+(r.listChargesMasterSlave[int].slaveId)+'">'+(r.listChargesMasterSlave[int].categoryName)+'_'+(r.listMultipleSponsor[int].sanctionAmt)+'_'+(r.listMultipleSponsor[int].remSanctionAmt)+'</option>';
		 	//alert(r.lstChargesSlave[int].categoryName);
	}	
	
	$("#get_mul_sponsor_select").html(list);
	$('#get_mul_sponsor_select').select2();
	}

function getMulSponsorData(chargesSlaveId){


	var treatmentId=  $('#treatmentId').val();
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"treatmentId" : treatmentId,
			"chargesSlaveId" : chargesSlaveId
		},
		url : "ehat/registration/getMulSponsorData",
		success : function(r) {
 			//alert("===>>>>"+JSON.stringify(r));
 			
			$("#mulSponsorId").val(r.mulSponsorId);
 			$("#mulEmpid").val(r.empid);
 			$("#mulTpaid").val(r.tpaid);
 			if(r.refDate!=null){
 				var refDate=new Date(r.refDate).toLocaleString();
 	 			$("#mulRefDate").val(refDate.split(",")[0]);
 			}else{
 				$("#mulRefDate").val("");
 			}
 			
 			if(r.validUpToDate!=null){
 				var validUpToDate=new Date(r.validUpToDate).toLocaleString();
 				$("#mulValidUpToDate").val(validUpToDate.split(",")[0]);
 			}else{
 				$("#mulValidUpToDate").val("");
 			}
 			
 			$("#mulSanctionAmt").val(r.sanctionAmt);
 			$("#mulSactionOrdNo").val(r.sactionOrdNo);
 			$("#mulNeisNo").val(r.neisNo);
 			
 			
 			$("#mulVisitNo").val(r.visitNo);
 			
 			$("#mulIpdOrOpd").val(r.ipdOrOpd);
 			$("#mulTreatPermited").val(r.treatPermited);
 			$("#mulDiseToBeTreat").val(r.diseToBeTreat);
		}
	});

}


function fetchMulSuperCatogoiresSlave(chargesMasterDto) {
	//if charges slave id is not equals or greter than zero 
	$("#mul_sponsor_select").val(chargesMasterDto);
	$("#mul_sponsor_select").select2();
	if (chargesMasterDto == "" || chargesMasterDto == null || chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"chargesMasterDto" : parseInt(chargesMasterDto)
			},
			
			url : "ehat/chargesSlave/fetchSuperCatogoires",
			error : function() {
				alert('Network Issue!');
			},
			success : function(response) {
				setMulDyanamicDivForList('mulDynamicItem',response);
			}
		});
	}
	
}

function fetchMulSuperSlave(chargesMasterDto) {
	//if charges slave id is not equals or greter than zero 
	
	if (chargesMasterDto == "" || chargesMasterDto == null || chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"chargesMasterDto" : parseInt(chargesMasterDto)
			},
			
			url : "ehat/chargesSlave/fetchSuperCatogoires",
			error : function() {
				alert('Network Issue!');
			},
			success : function(response) {
				
				$("#mul_sponsor_select").val(chargesMasterDto);
				$("#mul_sponsor_select").select2();
				setMulDyanamicDivForList('mulDynamicItem',response);

				
			}
		});
	}
	
}

function setMulDyanamicDivForList(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
		 	
		 	//$('#disc').val(response.lstChargesSlave[i].discount);
	}
	$('#' + setDiv).html(htm);
}

function deleteMultipleSponsor() {
	var chargesSlaveId=0;
	var treatmentId= $('#treatmentId').val();
	var mulSponsorId=$('#mulSponsorId').val();
	
	$('#get_mul_sponsor_select option:selected').each(function() {
		if($(this).val()!=0 && $(this).val()!=""){
			chargesSlaveId=parseInt($(this).val());
			
		}
	});

	if(chargesSlaveId==0 || chargesSlaveId=="" || chargesSlaveId==undefined){
		alertify.error("Please select sponsor..!!");
		return false;
	}
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"mulSponsorId" : parseInt(mulSponsorId),
			"treatmentId" : parseInt(treatmentId)
		},
		
		url : "ehat/registration/deleteMultipleSponsor",
		error : function() {
			alertify.error('Network Issue!');
		},
		success : function(r) {
			
			if(Number(r)==1){
					alertify.success("Delete successfully...!!");
			}else if(Number(r)==2){
				alertify.error("Recorde already in used,can not deleted..!!");
			}else{
				alertify.error("error..!!");
			}
			refreshSponsorDiv();
		}
	});

	
}

function setPrimarySponsor() {
	/*var chargesSlaveId=0;
	var treatmentId= $('#treatmentId').val();
	var mulSponsorId=$('#mulSponsorId').val();
	
	$('#get_mul_sponsor_select option:selected').each(function() {
		if($(this).val()!=0 && $(this).val()!=""){
			chargesSlaveId=parseInt($(this).val());
			
		}
	});

	if(chargesSlaveId==0 || chargesSlaveId=="" || chargesSlaveId==undefined){
		alertify.error("Please select sponsor..!!");
		return false;
	}
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"mulSponsorId" : parseInt(mulSponsorId),
			"treatmentId" : parseInt(treatmentId)
		},
		
		url : "ehat/registration/setPrimarySponsor",
		error : function() {
			alertify.error('Network Issue!');
		},
		success : function(r) {
			
			if(Number(r)==1){
				//added by kishor
				var r = confirm("Are You Sure You Want Set Primary ?");
				if (r == true) {
					chargesSlaveId = $('#mul_sponsor_select').val();
					$('#sponsor_select').select2('val', chargesSlaveId);
					setPrimaryMulSuperSlave(chargesSlaveId);

					$("#empid").val($("#mulEmpid").val());
					$("#tpaid").val($("#mulTpaid").val());
					$("#refDate").val($("#mulRefDate").val());
					$("#sactionOrdNo").val($("#mulSactionOrdNo").val());
					$("#sanctionAmt").val($("#mulSanctionAmt").val());
					$("#neisNo").val($("#mulNeisNo").val());
					$("#visitNo").val($("#mulVisitNo").val());
					$("#ipdOrOpd").val($("#mulIpdOrOpd").val());
					$("#validUpToDate").val($("#mulValidUpToDate").val());
					$("#treatPermited").val($("#mulTreatPermited").val());
					$("#diseToBeTreat").val($("#mulDiseToBeTreat").val());
					alertify.success("Set Primary successfully...!!");
					savePatientRegDetails();
				}
			}else if(Number(r)==2){
				alertify.error("Recorde already primary..!!");
			}else{
				alertify.error("error..!!");
			}			
			refreshSponsorDiv();
		}
	});*/

	
	
	var chargesSlaveId=0;
	
	
	var sourceType = $("#sourceType").val();
	if(sourceType==0){
		alertify.error("Please first select source type sponsor..!!");
		return false;
	}
	
	$('#get_mul_sponsor_select option:selected').each(function() {
		if($(this).val()!=0 && $(this).val()!=""){
			chargesSlaveId=parseInt($(this).val());
			
		}
	});

	if(chargesSlaveId==0 || chargesSlaveId=="" || chargesSlaveId==undefined){
		alertify.error("Please select sponsor..!!");
		return false;
	}
	
	$('#sponsor_select').val(chargesSlaveId);
	$("#sponsor_select").select2();
	fetchSuperCatogoiresSlave(chargesSlaveId);
	
	
	$("#empid").val($("#mulEmpid").val());
	$("#tpaid").val($("#mulTpaid").val());
	$("#refDate").val($("#mulRefDate").val());
	$("#sactionOrdNo").val($("#mulSactionOrdNo").val());
	$("#sanctionAmt").val($("#mulSanctionAmt").val());
	$("#neisNo").val($("#mulNeisNo").val());
	$("#visitNo").val($("#mulVisitNo").val());
	$("#ipdOrOpd").val($("#mulIpdOrOpd").val());
	$("#validUpToDate").val($("#mulValidUpToDate").val());
	$("#treatPermited").val($("#mulTreatPermited").val());
	$("#diseToBeTreat").val($("#mulDiseToBeTreat").val());
	
	
}
function refreshSponsorDiv() {
	getMultilpleSponsorList();
	setMulSponser('ehat_patient');
	getMulSponsorRecords('sourceid','slaveid');
	
	$('#mulSponsorId').val(0);
	
	/*$('#refDate').val("");
	$('#sanctionAmt').val("");
	$('#sactionOrdNo').val("");
	$('#neisNo').val("");
	
	$('#visitNo').val("");
	$('#ipdOrOpd').val("");
	$('#validUpToDate').val("");
	$('#treatPermited').val("");
	$('#diseToBeTreat').val("");*/
	
	$("#mulSponsorId").val("");
	$("#mulEmpid").val("");
	$("#mulTpaid").val("");
	
	$("#mulRefDate").val("");
	$("#mulSanctionAmt").val("");
	$("#mulSactionOrdNo").val("");
	$("#mulNeisNo").val("");
	
	$("#mulVisitNo").val("");
	$("#mulValidUpToDate").val("");
	$("#mulIpdOrOpd").val("");
	$("#mulTreatPermited").val("");
	$("#mulDiseToBeTreat").val("");
	
	$("#mulDynamicItem").html("");
	
}


//added by kishor
function setPrimaryMulSuperSlave(chargesMasterDto) {
	//if charges slave id is not equals or greter than zero 
	
	if (chargesMasterDto == "" || chargesMasterDto == null || chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"chargesMasterDto" : parseInt(chargesMasterDto)
			},
			
			url : "ehat/chargesSlave/fetchSuperCatogoires",
			error : function() {
				alertify.error('Network Issue!');
			},
			success : function(response) {
				
				$("#mul_sponsor_select").val(chargesMasterDto);
				$("#mul_sponsor_select").select2();
				setPrimarysetMulDyanamicDivForList('dynamicItem',response);

				
			}
		});
	}
	
}
//added by kishor
function setPrimaryMulDyanamicDivForList(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
		 	
		 	//$('#disc').val(response.lstChargesSlave[i].discount);
	}
	$('#' + setDiv).html(htm);
}

function refreshSpnsrMainDiv() {
	$('#refDate').val("");
	$('#sanctionAmt').val("0");
	$('#sactionOrdNo').val("");
	$('#neisNo').val("");
	
	$('#visitNo').val("");
	$('#ipdOrOpd').val("");
	$('#validUpToDate').val("");
	$('#treatPermited').val("");
	$('#diseToBeTreat').val("");
}