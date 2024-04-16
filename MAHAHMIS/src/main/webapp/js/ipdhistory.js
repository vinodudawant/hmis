
function fetchDocList() {
	
	var inputs = [];
	//inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('docType=doc');
	inputs.push('drDeptId=' + 0);
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "ehat/commanadv/getDocList",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		error 	: function() {
			// alert("error");
		},
		success : function(r) {			
			//setchDocList(r,);
			$("#doctorBean").html(r);
 		}
	});
}


function setchDocList(response) {
	
	var list = "<option value='0'>--- Select----</option>";

	for ( var i = 0; i < response.length; i++) {

		list = list + '<option value="' + (response[i].doctor_ID)
				+ '">' + (response[i].doc_name) + '</option>';
	}
	// $("#e1").html(list);
	$("#doctorNameOT").html(list);
	$("#doctorNameOT").select2('val','0');
}


function getDoctorRounds(){
	var separator = '/';
	var replaceWith='-';
	var treatmentId=  $("#tr_Id").val();
	var unitId = $("#uids").val();
	var doctorRoundId = $('#doctorRoundId').val(); //getting doctorRoundId if exist or update
	var previousDate= convertStringtoYYYYMMDD($("#date-pick").val(),separator,replaceWith);
	var fromDate= convertStringtoYYYYMMDD($("#fromDate").val(),separator,replaceWith);
	var toDate= convertStringtoYYYYMMDD($("#toDate").val(),separator,replaceWith); 
	var createdBy =  $("#userId").val();
	
	var trCount =$('#DRRDiv >tr').length;
	var listDoctorRoundSlaveDTO=[];
	
	if(trCount>0){
		 for(var i=1;i<=trCount;i++){ 
			
			 var time = $("#t"+i).val();
			 if(time==""){
				 alert("Please Select Time");
				 return 0;
			 }
			/* var templateName = $("#tn"+i).val();
			 if(templateName=="0"){
				 alert("Please Select Template Name");
				 return 0;
			 }*/
			 var doctorName = $("#rb"+i).val();
			 if(doctorName == "0"){
				 alert("Please Select Doctor Name");
				 return 0;
			 }
			 
			 
			listDoctorRoundSlaveDTO.push({
				"doctorRoundSlaveId":($("#salveId"+i).val()),
				"time":($("#t"+i).val()) + ":00",
				"templateId":$("#tn"+i).val(),
				"clinicalNotes":$("#cf"+i).val(),
				"investigationAdvice":$("#ia"+i).val(),
				"doctorId":$("#rb"+i).val(),
				"unitId":unitId,
			//	$( "#myselect option:selected" ).text();
				
				"templateName":$("#tn"+i+" option:selected" ).text(),
				"doctorName":$("#rb"+i+" option:selected").text(),
				"drComplitionTime":($("#complitionTime"+i).val()), //+ ":00",
				"nursingNotes":$("#nursingNotes"+i).val(),
			});
		}
		
		var dto={
			"doctorRoundId":doctorRoundId,
			"previousDate":previousDate,
			"fromDate":fromDate,
			"toDate":toDate,
			"treatmentId":treatmentId,// Above common defined
			"unitId":unitId,// Above common defined
			"createdBy":createdBy,
			"listDoctorRoundSlaveDTO":listDoctorRoundSlaveDTO
		};
		saveDoctorRounds(dto);
	}else{
		alert('Please create alteast one note!');
	}
}

//save doctor round
function saveDoctorRounds(dto){
	
	     var treatmentId=$("#tr_Id").val();
	     var unitId=$("#unitId").val();
	$.ajax({
		async 		: false,
        url			: 'ehat/ipdhistory/saveDoctorRounds',
        type		: 'POST',
        dataType	: 'json',
        data		: JSON.stringify(dto),
        contentType	: 'application/json',
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {		
			alertify.success("Saved Doctor Round!");
			fetchDoctorRoundsByDateOnchange();
			//fetchDoctorRounds(treatmentId,unitId);
			// window.location.reload(true);
		}
		});
}

// fetchDoctorRounds if any
function fetchDoctorRounds(treatmentId,unitId){
	$.ajax({
		async 		: false,
        url			: './ehat/ipdhistory/fetchDoctorRounds',
        type		: 'GET',
        dataType	: 'json',
        data		: {
						"treatmentId":treatmentId, // Above common defined
						"unitId":unitId // Above common defined
		},
        contentType	: 'application/json',
        beforeSend: function() {
		     $('#primeLoader').show();
		 },
		 complete: function(){
		     $('#primeLoader').hide();
		  },
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {		
			setDoctorRounds(r);
		}
		});
}

function setDoctorRounds(r){
	
	if(r.length ==0){
		$("#DRRDiv").html("");
		$("#RowCount2").val(0);
		 $('#doctorRoundId').val(0);
	}
	 
	if(r.length>0){
	$('#doctorRoundId').val(r[0].doctorRoundId);
	$("#DRRDiv").html("");
	$("#RowCount2").val(0);
		 var cnt=1;
		
		for(var i=0; i<r.length;i++){
			for(var j=0;j<r[i].listDoctorRoundSlaveDTO.length; j++){
				 
				toCreateDiv('RowCount');
				 var clinicalNotes= r[i].listDoctorRoundSlaveDTO[j].clinicalNotes;
				 var doctorId= r[i].listDoctorRoundSlaveDTO[j].doctorId;
				 var investigationAdvice = r[i].listDoctorRoundSlaveDTO[j].investigationAdvice;
				 var templateId =  r[i].listDoctorRoundSlaveDTO[j].templateId;
				 var timeAry= r[i].listDoctorRoundSlaveDTO[j].time.split(":");
				 var time = timeAry[0] +":"+timeAry[1];
				 var doctorRoundSlaveId=r[i].listDoctorRoundSlaveDTO[j].doctorRoundSlaveId;
				 var nursingNotes=r[i].listDoctorRoundSlaveDTO[j].nursingNotes;
				 var complitionTime=r[i].listDoctorRoundSlaveDTO[j].drComplitionTime;
				 $("#t"+cnt).val(time);
				 $("#tn"+cnt).val(templateId);
				 $("#cf"+cnt).val(clinicalNotes);
				 $("#ia"+cnt).val(investigationAdvice);
				 $("#rb"+cnt).select2('val',doctorId); 
				 $("#checkbox"+cnt).val(doctorRoundSlaveId);  
				 $("#salveId"+cnt).val(doctorRoundSlaveId);
				 $("#complitionTime"+cnt).val(complitionTime);
				 $("#nursingNotes"+cnt).val(nursingNotes);
				// toCreateDiv('RowCount');
				 cnt++;
			}
		}
	
	}
}

// Fetch doctor list
function fetchDoctorList(unitId){
		$.ajax({
		async 		: false,
        url			: './ehat/ipdhistory/fetchDoctorList',
        type		: 'GET',
        dataType	: 'json',
        data		: {
						"unitId":unitId
		},
        contentType	: 'application/json',
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {
			setDoctorListTemp(r);
		}
		});
}

//Fetch doctor round template
function setDoctorListTemp(r){
	/*var template="<option value='0'>Select</option>";
	for(var i=0; i<r.length; i++ ){
		var doctorId = r[i].doctor_id;
		var doctorName = r[i].doc_name;
		template = template+"<option id='"+ doctorId +"'>"+doctorName+ "</option>";
	}
	alert("template:"+template);
	$("#select_doctorlist").html(template);*/
	
	var template ="<option value='0'>Select Doctor</option>{#foreach $T as ls} <option value='{$T.ls.doctor_id}'>{$T.ls.doc_name}</option> {#/for}";
	$("#select_doctorlist").setTemplate(template);
	$("#select_doctorlist").processTemplate(r);
	
	//$('#div_doctorList').css('display','block');
	//$("#doctorBean").html(JSON.stringify(r));
	//alert("div_doctorList:"+$("#div_doctorList").html());
	//console.log("Data:"+$("#div_doctorList").html());
}

function fetchDoctorRoundTemplateIPD(unitId){
	$.ajax({
		async 		: false,
        url			: './ehat/ipdhistory/fetchDoctorRoundTemplate',
        type		: 'GET',
        dataType	: 'json',
        data		: {
						"unitId":unitId
		},
        contentType	: 'application/json',
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {
			setDoctorListTemplateIPD(r);
		}
		});
}

function setDoctorListTemplateIPD(r){
	var template ="<option value='0'>Select Template</option>{#foreach $T as ls} <option value='{$T.ls.doctorRoundTemplateId}'>{$T.ls.tempName}</option>{#/for}";
	$("#select_tempList").setTemplate(template);
	$("#select_tempList").processTemplate(r);
	$("#input_jsonDateTempList").val( JSON.stringify(r));
}

function getDocTemplate(templateId,rowCount){
	var templateJson =  eval('(' + $("#input_jsonDateTempList").val() + ')');;
	for(var i=0 ; i<templateJson.length; i++){
		var doctorRoundTemplateId =templateJson[i].doctorRoundTemplateId;
		if(doctorRoundTemplateId==templateId){
				var investigationAdvice = templateJson[i].investigationAdvice;
				var clinicalNotes = templateJson[i].clinicalNotes;
				$("#cf"+rowCount).val(clinicalNotes);
				$("#ia"+rowCount).val(investigationAdvice);
				return false;
		}else{
			$("#cf"+rowCount).val('');
			$("#ia"+rowCount).val('');
		}

	}
}

function deleteDoctorRoundIPD(){
	var unitId =parseInt($("#uids").val());
	var doctorRoundSlaveIds=[];
	$("input:checkbox[name=checkboxDR]:checked").each(function(){
	    doctorRoundSlaveIds.push($(this).val());
	});
	if(doctorRoundSlaveIds.length> 0){
		//alert("doctorRoundSlaveIds:"+doctorRoundSlaveIds);
		var deleteDR = confirm("Are You Sure You Want To Delete DoctorRound ?");
		var doctorSlaveRoIds = doctorRoundSlaveIds.toString();
		 	if (deleteDR == true) { 
			deleteDoctorRoundIPDAjax(unitId,doctorSlaveRoIds);
		}	
	}	
}

function deleteDoctorRoundIPDAjax(unitId,doctorSlaveRoIds){
		$.ajax({
				async 		: false,
		        url			: './ehat/ipdhistory/deleteDoctorRoundIPD',
		        type		: 'GET',
		       // dataType	: 'json',
		        data		: {
								"unitId":unitId,
								"doctorSlaveIds":doctorSlaveRoIds
				},
		        //contentType	: 'application/json',
		        error 		: function() { alertify.error('Network Issue!!!'); },
		        success		: function (r) {
						alertify.success(r);
						//refreshAndFetchDoctorRound(treatmentId,unitId);
						 window.location.reload(true);
						fetchDoctorRoundsByDateOnchange();
				}
				});
	
}

function refreshAndFetchDoctorRound(treatmentId,unitId){
	$("#DRRDiv").html('');
	setTimeout(fetchDoctorRounds(treatmentId,unitId),0);
}


function fetchPCTreatmentInstructionIPD(){
	var treatmentId=  $("#tr_Id").val();
	fetchPCTreatmentInstructionIPDAjax(treatmentId);
}
function fetchPCTreatmentInstructionIPDAjax(treatmentId){
		$.ajax({
		async 		: true,
        url			: './ehat/ipdhistory/fetchPCTreatmentInstruction',
        type		: 'GET',
        dataType	: 'json',
        data		: {
						"treatmentId":treatmentId
		},
        contentType	: 'application/json',
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {
			alert("fetchPCTreatmentInstructionAjax"+r);
		}
		});
}


//Get Instruction
function getListOfIndivisualInstruction(){
var unitId = $("#uids").val();
var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	 getListOfIndivisualInstructionAjax(str);
}

function getListOfIndivisualInstructionAjax(str){
	$.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/getListOfIndivisualInstruction",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			setInstructionTemplate(r);
		}	
	});
}

var reportInstructionTemp = "{#foreach $T.getListOfOPDInstructionDTO as ril}<tr>"
		+ "<td class='col-md-1-1'>{reportInstructionCount++}.</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstruction}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionHindi}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionMarathi}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionOther1}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionOther2}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionOther3}</td>"
		+ "<td class='col-md-1-1 center'>"
		+ "<input name='checkboxRI' id='{$T.ril.reportInstructionID}' type='checkbox' style='cursor: pointer' /></td>"
		+ "</tr>{#/for}";

var reportIndividualTreatmentInstructionTemp = "{#foreach $T.getListOfOPDInstructionDTO as ril}<tr>"
		+ "<td class='col-md-1-1 center'>{reportInstructionCount++}.</td>"
		+ "<td class='col-md-10-1'>{$T.ril.reportInstruction}</td>"
		+ "<td class='col-md-1-1 center'>"
		+ "{#if $T.ril.mandatoryInstFlag == 'N'}"
		+ "<input name='individualTreatmentInstructionCheckbox' id='ITIC_{$T.ril.reportInstructionID}' value='ITIC_{$T.ril.reportInstruction}' type='checkbox' style='cursor: pointer' />"
		+ "{#else}"
		+ "<input name='individualTreatmentInstructionCheckbox' id='ITIC_{$T.ril.reportInstructionID}' value='ITIC_{$T.ril.reportInstruction}' type='checkbox' disabled='disabled' checked='checked'/>"
		+ "</td>{#/if}</tr>{#/for}";

function setInstructionTemplate(r){
	$("#ReportInstructionDetails").html(JSON.stringify(r));
	$("#ReportInstructionTemp").setTemplate(reportInstructionTemp);
	$("#ReportInstructionTemp").processTemplate(r);
	
	reportInstructionCount = 1;
	// Instruction Tab
	$("#TreatmentInstructionTemp").setTemplate(reportIndividualTreatmentInstructionTemp);
	$("#TreatmentInstructionTemp").processTemplate(r);
}

function fetchAllTreatmentTopicIPD(){
	var unitId = $("#uids").val();
	$.ajax({
		async : true,
		type : "GET",
		data :{
			"action":"fetchAllSK",
			"pageName":"instructions",
			"unitId":unitId
		},
		url : "./ehat/ipdhistory/fetchAllTreatmentTopicIPD",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			alert("fetchAllTreatmentTopicIPD:"+r);
		}	
	});
}

function fetchIndividualTreatmentInstructionIPD(){
	var treatmentId=  $("#tr_Id").val();
	fetchIndividualTreatmentInstructionIPDAjax(treatmentId);
}

function fetchIndividualTreatmentInstructionIPDAjax(treatmentId){
	$.ajax({
		async : true,
		type : "GET",
		data :{
			"treatmentId":treatmentId
		},
		url : "./ehat/ipdhistory/fetchIndividualTreatmentInstructionIPD",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			//alert("fetchIndividualTreatmentInstructionIPD:"+r);
		}	
	});
}

//pharmacyAutoSuggesiontion
function setCreditNoteAutocomplete2(key,currentVal) {
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
						onSelect : displayResult,
						scrollBar : true

					});
					$("#textProductName"+currentVal).data('typeahead').source = resultData;
				}, 500);
			}
		});
}


	function displayResult(item) {
		
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
		});
		//createRow();
	}

function getPatientDataByTreatmentIdIPD(r) {
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
  			$("#opdNo").text(r.listRegTreBillDto[0].trcount);
  			$("#ptName").val(r.listRegTreBillDto[0].patientName);
  			$("#corporate").text(r.listRegTreBillDto[0].categoryName);
  			$("#idForDisc").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
  			$("#isPpn").val(r.listRegTreBillDto[0].isPpn);
  			$("#numbr").val(r.listRegTreBillDto[0].numbr);
  			
  			if(r.listRegTreBillDto[0].isPpn == "Y"){
  				$('#ppn').show();
  				
  				//$("#txtnumber").html(r.listRegTreBillDto[0].numbr);
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
			$("#lblCenterPIdVal").text(r.listRegTreBillDto[0].centerPatientId);
		    $("#billNo").text(r.listRegTreBillDto[0].billId);
		    //alert(r.listRegTreBillDto[0].departmentId);
		    $("#billNo1").text(r.listRegTreBillDto[0].invoiceCount);
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
		   $("#hallName").text(r.listRegTreBillDto[0].hallName );		//added by sandip
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
				$("#corporate").text("Self");
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
		  	 
		  	 if(r.listRegTreBillDto[0].target_height != 6.5 && r.listRegTreBillDto[0].target_height != -6.5 )
		  	{
		  		$("#TARGET_HEIGHT").text(r.listRegTreBillDto[0].target_height);
		  	}
		  	
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
 			
 			
 			$("#h_w").text(r.listRegTreBillDto[0].height + " /"+r.listRegTreBillDto[0].weight);
 			
 			//$("#mrnIpd").val(r.listRegTreBillDto[0].mrnno);
 			$("#mrn12").val(r.listRegTreBillDto[0].mrnno);
 		}
	});
	
	//getIpdPatientHeaderInfoOnIPD(r)
	return deptID;
}


/*function getIpdPatientHeaderInfoOnIPD(r){
	


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

	
}*/




function getAllPrescriptionsByTreatmentId(tid,unitId){

	var treatmentId = tid; //$.trim($('#tr_Id').val()); 
	var unitID = unitId; //$("#unitId").val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getAllPrescriptionsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptionsNurTemp(r);
			}
		});
	}	
}


function setAllPrescriptionsNurTemp(r){
	
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
					+ "<tr><td class='col-md-1-1 center'>"
					+ ++prepCount
					+ ".</td>"
					+ "<td class='col-md-2-1'>"
					+ testObj.listOPDPrescriptionDtoSP[int].prepName
					+ ". "
					+ testObj.listOPDPrescriptionDtoSP[int].medicineName
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].strength
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].dose
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].unitName
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].dayPrescription
					+ "</td>"
					+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].instructionName
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].days
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].qty
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ "<input name='prepTreatmentMedicineCheckbox' id='checkboxToBeAdmins"
					+ (testObj.listOPDPrescriptionDtoSP[int].prescriptionId)
					+ "' type='checkbox' value='"+(testObj.listOPDPrescriptionDtoSP[int].prescriptionId)+"' style='cursor: pointer; margin-top: 2px;' /></td>"
					+ "</tr>";
		}
	}

	$('#orderFormContentAdministrative').html(prescriptionContentTemp);
//	$("#prescription_id").val("0");

}


function fetchDoctorRoundsByDate(){
	var separator = '/';
	var replaceWith='-';
	var treatmentId=  $("#tr_Id").val();
	var unitId = $("#uids").val();
	
	var fromDate= convertStringtoYYYYMMDD($("#fromDate").val(),separator,replaceWith);
	var toDate= convertStringtoYYYYMMDD($("#toDate").val(),separator,replaceWith); 
	
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	 var pendFlag="N"; 
	 var recId=0;
	 var CallFrom= "withheader";
    
    window.open("ipd_doctor_round.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&unitId="+unitId+"&fromDate="+fromDate+"&toDate="+toDate+"&CallFrom="+CallFrom);
	
	/*$.ajax({
		async 		: false,
        url			: './ehat/ipdhistory/fetchDoctorRoundsByDate',
        type		: 'GET',
        dataType	: 'json',
        data		: {
						"treatmentId":treatmentId, // Above common defined
						"unitId":unitId, // Above common defined
						"fromDate":fromDate, // Above common defined
						"toDate":toDate //
		},
        contentType	: 'application/json',
        beforeSend: function() {
		     $('#primeLoader').show();
		 },
		 complete: function(){
		     $('#primeLoader').hide();
		  },
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {		
			setDoctorRounds(r);
		}
		});*/
}

function fetchDoctorRoundsByDateOnchange(){
	var separator = '/';
	var replaceWith='-';
	var treatmentId=  $("#tr_Id").val();
	var unitId = $("#uids").val();
	
	var fromDate= convertStringtoYYYYMMDD($("#date-pick").val(),separator,replaceWith);

	
	$.ajax({
		async 		: false,
        url			: './ehat/ipdhistory/fetchDoctorRoundsByDateOnchange',
        type		: 'GET',
        dataType	: 'json',
        data		: {
						"treatmentId":treatmentId, // Above common defined
						"unitId":unitId, // Above common defined
						"fromDate":fromDate // Above common defined
						
		},
        contentType	: 'application/json',
        beforeSend: function() {
		     $('#primeLoader').show();
		 },
		 complete: function(){
		     $('#primeLoader').hide();
		  },
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {		
			setDoctorRounds(r);
		}
		});
}

function getPatientCommanAdvance(){
	var patient_ID = $('#pt_Id').val();

    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvMasterList",
		data	: {
			"pID_cID" : patient_ID,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			
			var total=0;
			var add=0;
			for ( var i = 0; i < response.lstCommonadv.length; i++) {
				//total=Number(total)+Number( response.lstCommonadv[i].commonadv_amnt).toFixed(2);
				add=parseFloat(add)+parseFloat(response.lstCommonadv[i].commonadv_amnt);
			}
			
			$("#finalAdvance").text(add);
			
		}

	});
 
}

function hideFieldsUsingCallfrom(callfrom)
{
	 if(callfrom == 'previousPatient')
	 {
	//	 alert("Hii");
		 $("#diagnosis").attr("disabled", "disabled");
	 }
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

		async : false,
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
					//onSelect : getPharmaStockDetails,
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
		async : false,
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


function getPharmaStockDetails(item) {
	
	var hiddenRowC=$('#hiddenCurrentRow').val();
	var content = item.value.split("_");
	var text = item.text;
	var value = item.value;
	var rowCount= content[1];
	var id= content[0];
	
	$('#hiddenProductId'+rowCount).val(id);
	
	var subStoreName=$("#pharmaStoreId  option:selected").text();
	
	if(subStoreName == "Main Store") {
		subStoreName="Main";
	}
	
	
	
	var inputs = [];
	inputs.push('productId=' + id);
	inputs.push('subStoreName=' + subStoreName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
	//	url : "./pharmacy/purchase/getPharmaStockDetails",
		url : "ehat/pharmastock/getPharmaStockDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setPharamaStockDetails(r);
			toCreateManualIndent();
		}
	});
	
}


function setPharamaStockDetails(r){
	
	if(r.lstPharmaStockDto.length > 0){
		$("#abcc").modal('show');
	  for ( var i = 0; i < r.lstPharmaStockDto.length; i++) {

			var count = 1;
			
			//$('#hospitalSaleBatchPopUp').modal('show');
			

			if (i == 0) {
				$("#batchData1")
						.html(
								"<tr><td  class='col-md-1-1 center'>"
										+ "<input type='radio' name='row' id='rowId"
										+ i
										+ "' value="
										+ i
										+ " checked='true' autofocus='autofocus'></td>"
										
										+ "<td  class='col-md-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-md-2-1 center'><input type='text'"
										+ "class='TextFont' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td class='col-md-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textProductId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										
										+ "</tr>");

			} else {

				$("#batchData1")
						.append(
								"<tr><td>"
										+ "<input type='radio' name='row' value="
										+ i
										+ " id='rowId"
										+ i
										+ "'></td>"
										
										+ "<td class='col-md-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td><input type='text'"
										+ "class='TextFont' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td class='col-md-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textProductId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"


										

										+ "</tr>");
			}
			
			$("#textBatchCode" + i).val(r.lstPharmaStockDto[i].batchCode);
			$("#textBatchExpiry" + i).val(r.lstPharmaStockDto[i].batchExpirayDate);
			$("#textBatchStock" + i).val(r.lstPharmaStockDto[i].stockQtyInHand);
			$("#textBatchId" + i).val(r.lstPharmaStockDto[i].batchId);
			$("#textProductId" + i).val(r.lstPharmaStockDto[i].productID);
		
		
	     }
	
	}
}


function setPopUpValuesToIndenet()
{
	var totalRow=0;
	$('#batchData1 input[type=radio]').each(function()
	{
		totalRow++;
	});
//	setQtyFocusot();
	var value =$("input[name=row]:checked").val();
//	alert(value);
	setPopUpValuesIndenetSlave(value,totalRow);
}

function setPopUpValuesIndenetSlave(number, totalRow) {
	var hiddenRowC=$('#hiddenCurrentRow').val();
	if (totalRow == '0') {

		

	} else {
		
		$('#texttotalQty'+hiddenRowC).val($('#textBatchStock' + number).val());
		$('#textIndentProductBatchId'+hiddenRowC).val($('#textBatchId' + number).val());
		$('#textIndentProductId'+hiddenRowC).val($('#textProductId' + number).val());
		
	   $('#patient_sale_Batch_Pop_Up').css('display','none');
	   //$('#patient_sale_Batch_Pop_Up').modal('hide');
	}

}

