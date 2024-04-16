function setServiceAdviceTemplateForIvf(id){
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	var depid = $("#depdocdeskid").val();
	
	
	temForCpoe(id, depid);
	
	getAllUnitdrdesk();
	// unitMasterListOnLogin();
	var uid = $("#uids").val();
	setDocNamedrdesk();
	$("#uId").val(uid);
	saveCpoeForIvf
	// fetchDoctorHospital();
	showADNOTE(id);
	fetchbilldetailsIVF();
}

function temForCpoe(id, depid) {

	var temp = '<div class="tab-pane fade in active" id="CPOE">'
			+ '<div style="padding-top: 0px;" class="col-md-12-1" id="row1">'
			+ '<div style="margin-top: 0px; margin-left: 5px;" class="tabbable tabs-left col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="tab-content col-md-10-1">'
			+ '<div class="tab-pane fade active in col-md-12-1" id="Investigation">'
			+ '<div style="margin-top: 40px;" class="col-sm-12-1" id="Investigation_row_1"><div class="col-sm-4-1">'
			+ '<div style="padding-left:5%" class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont">Test Name </label>'
			+ '<div id="divInvestigationTestName"><input type="text" onkeyup="setallservautocomplete(this.id)" style="border: 1px solid orange;" class="typeahead form-control" id="txtautoserviceName" placeholder="Test Name">'
			+ '</div></div><input type="hidden" value="0" id="charges1"> <input type="hidden" value="0" id="investigationtestId">'
			+ '<input type="hidden" value="0" id="idTestSlave"></div>'
			+ '<div style="margin-left: 75px;" class="col-sm-5-1">'
			+ '<div style="padding-top: 15px;" class="col-sm-3-1"></div>'
			/*+ '<label for="exampleInputEmail1" class="TextFont">Select Reference</label>'*/
			+ '<div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont">Doctor</label>'
			+ '<select style="width:130px" class="input-SmallText" id="doctor2"></select></div>'
			+ '</div><div class="col-sm-4-1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont">Hospital</label>'
			+ '<select class="form-control input-SmallText" id="hospital2"><option selected="selected" value="0">Select</option></select>'
			+ '</div></div></div>'
			+ '<div style="margin-top:-2%" class="col-sm-2-1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label class="TextFont">Unit</label> <select onchange="cleartexrfiled();" class="form-control input-SmallText" id="uId"></select>'
			+ '<input type="hidden" id="allunitid"></div></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-12-1" id="Investigation_row2">'
			+ '<div class="col-sm-6 select2-container select2-container-multi " style="margin-top: 2%;" >'
			+ '<ul id="dynamicItem" class="select2-choices" style="overflow-y: scroll;"></ul>'
			+ '<input type="hidden" id="subserviceid" value="0">'
			+ '<input type="hidden" id="iscombination" value="0">'
			+ '<input type="hidden" id="serviceid" value="0"></div>'
			+ '<div style="margin-top: 10px;padding-left:2%" class="col-sm-1-1" id="col11">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Charges </label> <input type="text" id="chargesubservice" onchange="setHiddenFieldOpdDokDesk(this.value),calculateEmerChrForDocDesskOpd()" class="form-control input-SmallText" placeholder="Charges" readonly="readonly"><input type="hidden" value="" id="cpoeCharges2">'
			+ '</div></div><div style="margin-top: 10px;padding-left:2%" class="col-sm-2-1" id="col9">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Instructions </label> <input type="text" id="cpoeIns" class="form-control input-SmallText" placeholder="Instructions">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col10">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Clinical Notes </label><input type="text" id="cpoeClinicalNotes" class="form-control input-SmallText" placeholder="Clinical Notes">'
			+ '</div>'
			+ '</div>'

			+ '<div style="margin-top: 30px;padding-left:5px" class="col-sm-0-1" id="col11">'
			+ '<i><input id="saveCpoeForIvf" type="button" style="margin-left:1%" value="Save" onclick="saveCpoeForIvf(\'DoctorStation\')" class="btn btn-xs btn-success editUserAccess"> </i>'
			+ '</div></div>'

			// Modify By Laxman on 03-March for add Send to Lab flag
			+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<input type="checkbox" id="cpoeUrgent">'
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Urgent </label>'
			+ '</div>'
			+ '<div id="cpoesndtolabdiv" style="display:none;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;margin-left: -64px;">';

	if (depid == 2) {
		temp = temp
				+ '<input id="cpoesndtolab" type="checkbox" name="cpoesndtolab" checked>';
	} else {
		temp = temp
				+ '<input id="cpoesndtolab" type="checkbox" name="cpoesndtolab">';
	}

	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Send To Lab </label>'
			+ '</div>'
			+ '</div>'
			// +'</div>'

			// Code by Sanjay on 06-03-018 to send Ris from IPD, OPD, Diagnosis
			+ '<div id="cpoeSendToRisdiv" style="display:none;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;margin-left: -54px;">';

	if (depid == 2) {
		temp = temp
				+ '<input id="cpoeSendToRis" type="checkbox" name="cpoeSendToRis" checked>';
	} else {
		temp = temp
				+ '<input id="cpoeSendToRis" type="checkbox" name="cpoeSendToRis">';
	}

	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -50px;"> Send To Ris </label>'
			+ '</div>'
			+ '</div>'

			+ '<div id="cpoeSendToRaddiv" style="display:none;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;margin-left: -64px;">';

	if (depid == 2) {
		temp = temp
				+ '<input id="cpoeSendToRad" type="checkbox" name="cpoeSendToRad" checked>';
	} else {
		temp = temp
				+ '<input id="cpoeSendToRad" type="checkbox" name="cpoeSendToRad">';
	}

	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Send To Radiation </label>'
			+ '</div>'
			+ '</div>'

			+ '</div>'

			+ '<input type="hidden" value="insert" id="InvestigationQueryType"> <input type="hidden" value="0" id="billSlaveID"> <input type="hidden" value="0" id="investigationSlaveID">'
			+ '</div></div></div></div>'
			+ '<div style="margin-top: 28px" class="col-sm-12-1" id="row2">'
			+ '<div style="margin: 2px;" class="form-group col-md-12-1">'
			+ '<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="editCPOE_TestLabel1" onclick="editCPOE_Testnewivf()">'
			+ '<i class="fa fa-edit"></i> Edit</label> <label onclick="deleteCpoeServIvf(\'multiple\',\'DR\')" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="muldelcp">'
			+ '<i class="fa fa-trash-o"></i> Multiple Delete </label></div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-condensed ">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th style="height: 21.5px; padding-left: 5px;" class="col-md-2-1 center"><div class="TextFont">Particulars/Details</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Consultant Name</div></th>'
			+ '<th style="height: 21.5px; padding-right: 23px;" class="col-md-3-1 center"><div class="TextFont">Type</div></th>'
			+ '<th style="height: 21.5px; padding-right: 29px;" class="col-md-1-1 center"><div class="TextFont">Status</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Action</div></th>'
			+ '<th style="height: 21.5px; padding-right: 31px;" class="col-md-1-1 center"><div class="TextFont">Delete</div></th>'
			+ '</tr></thead></table>'
			+ '<div style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-striped table-condensed"><tbody id="tcpoeservices"></tbody>'
			+ '</table><input type="hidden" value="0" id="CPOErowCount"></div></div>'
			+ ' </div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveCpoeForIvf").disabled = "true";
	}

	
}


function saveCpoeForIvf(callfrom){

	var IVFTreatmentId = $("#IVFTreatmentId").val();
	 
	var	departmentId =  $("#depdocdeskid").val();
	departmentId=1;
	
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	//var receiptOf  ="xyz";
	var receiptOf  ="general";
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
    var recSlaveId  =0;	//$('#receiptSlaveId').val();	//receipt slave id
	
	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined || isNaN(recSlaveId)) {
		recSlaveId = 0;
	} 
	
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	if(departmentId==2){
		//Call for IPDCpoe.
		saveIPDCpoe();
		
	}else{
	//adding by ajay:2-06-2020 update time check this varible if test is already send it lab and  Ris that time using this varible
	var flagUpdateorNotsendtoLab  =  $("#flagUpdateorNotsendtoLab").val();  	
	if(flagUpdateorNotsendtoLab==1)
	{
		alert("Can Not Updated this Test Because test already send It!! ");
		return false;
	}
	
	var flagUpdateorNotsendtoRis  =  $("#flagUpdateorNotsendtoRis").val();  	
	if(flagUpdateorNotsendtoRis==1)
	{
		alert("Can Not Updated this Test Because this test already send It!! ");
		return false;
	}
	
	var queryType 	 = "insert";
	var module 	 = "DrDesk";
	var	patienttId   =  $("#patientId").html();
	//var	patientId   =  $("#patientId").val();
	var treatmentId  =  $("#treatmentId").val();  
	//var patientId = $.trim(($("#patientId").text()));
	var callfrom1 = $("#callfromforprvTrtmnt").val();
	if (callfrom1 == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom1 == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	

	
	var	departmentId =  $("#depdocdeskid").val();
	var billId       =  $("#bill_Id").val();  
	var	sourceTypeId =  1;
	var rate = 0;
	var otherRate=0;
	var otherAmount=0;
	if (sponsorId > 0 && chargesSlaveId > 0) {
		receiptOf="sponsor";
		getchargesDR(0);
		otherRate = parseFloat($("#chargesfromConf").val());
		if(otherRate== 0 || otherRate== 0.0){
			getchargesDR(2);
			otherRate =	parseFloat($("#chargesubservice").val());
			}
		if(otherRate== 0 || otherRate== 0.0){
			
			otherRate =	parseFloat($("#chargesubservice").val());
			
		}
		var emrgancyper=parseFloat($('#emrPer').val());
		var emp=parseFloat(otherRate*emrgancyper/100);
		otherRate = parseFloat(emp + otherRate);
		otherAmount=otherRate *1;
		
	}
	   //rate =	$("#chargesubservice").val();	
		 rate =  $("#cpoeCharges2").val();
	
	var quantity     =  1;
	var amount       =  rate * 1;  
	
	var billCat		 = $("#billCat").val();
	var coPay        = 0;
	if(billCat==0)
	{
		coPay=amount;
		
	}
	
	//for sponcer patient pkg.
	if(callfrom =="sponsorpack"){
		callfrom="";
		sponsorId =0;
		chargesSlaveId = 0;
	}else{
		callfrom="DrDesk";
	} 
	//Added by Laxman.
	var iscombination =$("#iscombination" ).val();

	var serviceId    =  $("#serviceid" ).val();
	var subServiceId =  $("#subserviceid").val();

	var billDetailsId     = $("#billidservice").val();

    var subservicesname   = $("#txtautoserviceName").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var doctorId          = $("#doctor2").val();                         
    var clinicalNotes     = $("#cpoeClinicalNotes").val();
    var instructions      = $("#cpoeIns").val();
    var urgentflag='N';
    var sndToLabFlag='N';
    var	sendToRisFlag = 'N';
    var radiationFlag='N';
   // var paid_flag='N';
   //alert(subservicesname);
   /* if(serviceId=='12'){
    	paid_flag='Y';
    }*/
    var drdeskflag="-";
    if(departmentId==3){
    	drdeskflag='D';
    }else{
     drdeskflag='Y';
    }
    
    if($("#cpoeUrgent").is(':checked')){
    	urgentflag='Y';
    }
    if($("#cpoesndtolab").is(':checked')){
    	sndToLabFlag='Y';
    	sendToRisFlag='N';
    }
    if($("#cpoeSendToRad").is(':checked')){

        radiationFlag='Y';
    }
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
		//alert("Please Select doctor ");
		//return false;
		
	}
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	} 
	
	//Added by sanjay on savecpoe send to ris opd/digno.
	if($("#cpoeSendToRis").prop("checked")==true){
		sendToRisFlag = 'Y';
		sndToLabFlag='N';
	}
	

	
	var serviceDetails = {
            listBillDetails : []
        };

	
	serviceDetails.listBillDetails.push({
    	billDetailsId:billDetailsId,
    	patienttId : patienttId,
    	treatmentId :  $("#tr_Id").val(),
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sponsorId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
        doctorId:doctorId,
        urgentflag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        sponsorId  : sponsorId,
        chargesSlaveId : chargesSlaveId,
        iscombination : iscombination,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherPay :otherAmount,
        receiptOf : receiptOf,
        recSlaveId : recSlaveId,
        sndToLabFlag : sndToLabFlag,
		sendToRisFlag : sendToRisFlag,
		rFlag : radiationFlag,
		emrPer : emrPer,
		ivfTreatmentId : IVFTreatmentId
		//paidFlag:paid_flag
    });
    
	//Added by Laxman on 04-March-2018 for service send to lab.
	var subList 	= {	subSrvList : [] };
	subList.subSrvList.push({
		serviceId		: serviceId,
		subSrvid 		: subServiceId,
		refDocId		: doctorId,
	});	
    serviceDetails = JSON.stringify(serviceDetails);
    subList = JSON.stringify(subList);
    
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push('subList=' + subList);
	/*inputs.push('billDetailsId=' + billDetailsId);
	inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('sourceTypeId=' + sourceTypeId);
	inputs.push('billId=' + billId);
	inputs.push('amount=' + amount);
	inputs.push('quantity=' + quantity);
	inputs.push('departmentId=' + departmentId);
	inputs.push('rate=' + rate);
	inputs.push('subServiceId=' + subServiceId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('unitId=' + unitId);
	inputs.push('doctorId=' + doctorId);
	
	
	inputs.push('ClinicalNotes=' + ClinicalNotes);
	inputs.push('instructions=' + instructions);
	inputs.push('urgentflag=' + urgentflag);*/
	
		var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfbill/saveCpoe",
	
		success : function(r) {
			
			 
		if(r ==1){
			alertify.success("Service assign Successfully");
			if(departmentId==3){
				fetchbilldetailsDigno();
				 
 			}else{
			
 				fetchbilldetailsIVF();
 			}
			$('#txtautoserviceName').val("");
			$("#subservicesname").val("");
			$("#doctor2").val("0");
			$("#chargesubservice").val("");
			
			$("#servicename").val("");
			    $("#cpoeClinicalNotes").val("");
			   $("#cpoeIns").val("");
			   $('#txtautoserviceName').attr('readonly',false);
			   $('#dynamicItem').html("");
			   $('#cpoeUrgent').attr('checked', false);
			   $("#cpoesndtolabdiv").hide();
			   $('#cpoesndtolab').attr('checked', false);
			}else if (r ==3) {
				
				alert("Package is not Configure Please Configure Package!");
				return false;
			}else if(r ==4){
				var res = confirm("Package is not configure for sponsor. Do you want Default Package?");
				if (res == true) {
					//For opd sponsor patient.
					saveCpoeForIvf('sponsorpack');
				}else{
					
					return false;
				}
				
			}else if(r ==6){
				 alert("Package is out of Date Can't save!!!!");
				
			}else if(r ==2){
				 alertify.success("Update successfully...!!!");
				 $('#txtautoserviceName').val("");
				 $("#subservicesname").val("");
				 $("#doctor2").val("0");
				 $("#chargesubservice").val("");
				 $("#servicename").val("");
				 $("#cpoeClinicalNotes").val("");
				 $("#cpoeIns").val("");
				 $('#txtautoserviceName').attr('readonly',false);
				 $('#dynamicItem').html("");
				 $('#cpoeUrgent').attr('checked', false);
				 $("#cpoesndtolabdiv").hide();
				 $('#cpoesndtolab').attr('checked', false);
				 $("#chargesubservice").val(0);
				 $("#cpoeCharges2").val(0);
				 $("#billidservice").val(0);
				
			}
		}	
		
	});
	}

}

function fetchbilldetailsIVF(){
	
	var tID  = $("#treatmentId").val(); 
	
	
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		tID = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		tID = $("#treatmentId").val();
	}
	
	/*var depid= $("#depdocdeskid").val(); */
	
	
    var servid=0;
	if(tID==0){
		
	//	return false;
		
	}
	
	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "GET",
		url 	: "ehat/ivfdoctordesk/fetchbilldetails",
		data	: {
			"tID"        : $("#tr_Id").val(),
			"callform"   :callform,
			"servid"      :servid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
		
			
			//alert(JSON.stringify(response))
			
			    testRowCountcpoe = 1;
			
				$("#tcpoeservices").setTemplate(servicedetailsIVF);
				$("#tcpoeservices").processTemplate(response);
				  var jsonConvertedData = JSON.stringify(response);
				 
				$("#billdetailsnew").html(jsonConvertedData);
			
			
		}
		
	});
	
}



var servicedetailsIVF = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testRowCountcpoe}.</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-1-1 center"> {$T.cpoeservice.created_date_time}</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
	+ '<td style="display:none;" id="empR{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.emrPer}</td>'

	+ '{#if $T.cpoeservice.deleted == "N" && $T.cpoeservice.cancel == "N"}'
	
	+ '{#if $T.cpoeservice.paid_flag == "Y"}'
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: orange;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunservIvf" class="btn disabled" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice disabled"  onclick=deleteCpoeServIvf({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.paid_flag == "N"}'
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunservIvf" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServIvf({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	+'{#/if}'
	
	+ '{#else}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: red;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunservIvf" class="btn disabled" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice"  onclick=deleteCpoeServIvf({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '</tr>{testRowCountcpoe++}{#/for}';

function editCPOE_Testnewivf(values){
	


	var id=0;
	var countcheckbox=0;
	$.each($('#chkunservIvf:checked'), function() {
		id = $(this).val();
		countcheckbox++;
		$("#cpoesndtolabdiv").show();
		});
	if(countcheckbox>1){	
		alert("can not multiple test edit");	
		return false;
	}

		/*var emrP =parseFloat($('#empR'+id).html());	*/
		if(id==0){
			alert("Please Check test to edit!!");
		}else{
			var depid= $("#depdocdeskid").val(); 
			depid=1;
			var myArray = JSON.parse($("#billdetailsnew").html());
		
			if(depid==1){
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					//console.log(JSON.stringify(myArray.cpoeServdetails));
					
					if(myArray.cpoeServdetails[k].billdetailsid == id){
						$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].clinical_notes);
						$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billdetailsid);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						//alert(JSON.stringify(myArray.cpoeServdetails[k].sndtolabflag));
						//$("#cpoesndtolab").val(myArray.cpoeServdetails[k].sndtolabflag);
						var sentlabflag = (myArray.cpoeServdetails[k].sndtolabflag);
					//	alert(sentlabflag);
						
						//$('#cpoesndtolab').val(sentlabflag); 
						if (sentlabflag > 'Y' || sentlabflag == 'Y' ) 
						{
							$("#cpoesndtolab").prop("checked", true);
						
						}
						
						//alert(myArray.cpoeServdetails[k].sndtorisflag);
						
						if(myArray.cpoeServdetails[k].sndtorisflag=="Y"){
							$("#cpoesndtolabdiv").hide();
							$("#cpoeSendToRisdiv").show();
							$("#cpoeSendToRis").prop("checked", true);
						}
						
						
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
							fetchSuperCatIVF(myArray.cpoeServdetails[k].categoryid);
					}
				}	
			}else if(depid==3){
				
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					
					if(myArray.cpoeServdetails[k].billdetailsid == id){
					
						$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].clinical_notes);
						$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billdetailsid);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						
						//$("#cpoesndtolab").val(myArray.cpoeServdetails[k].sndToLabFlag);
						//$('#cpoesndtolab').attr('checked', true);
						var sentlabflag = (myArray.cpoeServdetails[k].sndtolabflag);						
						if (sentlabflag > 'Y' || sentlabflag == 'Y' ) 
							{						
								$("#cpoesndtolab").prop("checked", true);
								
								$("#cpoesndtolab").attr({disabled:"true"});
								
								$("#flagUpdateorNotsendtoLab").val(1);							
							}
						
						if(myArray.cpoeServdetails[k].sndtorisflag=="Y"){
							
							$("#cpoesndtolabdiv").hide();
							
							$("#cpoeSendToRisdiv").show();
							
							$("#cpoeSendToRis").prop("checked", true);
							
							$("#cpoeSendToRis").attr({disabled:"true"});
							
							$("#flagUpdateorNotsendtoRis").val(1);		
						}
					
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
							fetchSuperCatIVF(myArray.cpoeServdetails[k].categoryid);
					}
				}
				
			}else{
				
			
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					
					if(myArray.cpoeServdetails[k].billipd_id == id){
						$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].clinical_notes);
						$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billipd_id);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						$("#cpoesndtolab").val(myArray.cpoeServdetails[k].sndtolabflag);
					//	$('#cpoesndtolab').attr('checked', true);
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
							fetchSuperCatIVF(myArray.cpoeServdetails[k].categoryid);
					}
				}
			}
			
			
			
		
		}


	
}



function fetchSuperCatIVF(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			
			setDyanamicDivForListIVF('dynamicItem',response);
		}
	});
}




function setDyanamicDivForListIVF(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count =i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
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
		 	
		 if(response.lstSubService[i].serviceId == 11 || response.lstSubService[i].serviceId == 13){
		 	$("#cpoesndtolabdiv").show();
			$("#cpoeSendToRisdiv").hide();
		 	$("#cpoesndtolab").prop("checked", true);
			
			}
			
			if(response.lstSubService[i].serviceId == 12){
				$("#cpoesndtolabdiv").hide();
				$("#cpoeSendToRisdiv").show();
				$("#cpoeSendToRis").prop("checked", true);
			}
		 
	}
	$('#' + setDiv).html(htm);
}


function  deleteCpoeServIvf(values,callform){
//	alert(callform+"   aa    "+values);
	var labservicelist ='';
	//var cnt =-1;
	deleteType="Y";
	if (values=='multiple'){
		
		$.each($('#chkunservIvf:checked'), function() {
			//alert("aa");
		//	labservicelist.push(parseInt($(this).val()));
			labservicelist=labservicelist+","+$(this).val();
			//alert(labservicelist);
		});
		
		 if(labservicelist.length==0){
			   
			   
			   alert("Please check  at least Service to delete");	   
			   return false;
			   
		   }
	}else{
		labservicelist=labservicelist+","+ values;
		
	}
	
	alert(callform+"   aa    "+values  +"  "+labservicelist +" "+deleteType);
	//call for delete test in lab on 08-March-2018.
	deleteLabTestCpoe(labservicelist,deleteType,values,callform);
 
	if(deleteTestSmplColFlg=="Y"){
		alert("Test Sample are collected,You can't cancel or delete this Test.");
		return false;
	}
	
	
	//Added by Vikas Godse for Delete Investigation Test from cpoe
	deleteInvTestCpoe(labservicelist,deleteType,values,callform);
	if(risReportFlag=="Y"){
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}
	
	var tk = labservicelist.slice(1); 
	
	var r = confirm("Are You Sure You Want To Permanantly Delete this row ?");
 	if (r == true) { 

	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/ivfdoctordesk/deleteservdetails",
		data	: {
			
		  "labservicelist" : tk,
			"callform":callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			
			if(response.indexOf("Delete") != -1){
				alertify.success(response);
			}
			else{
				alertify.error(response);
				return false;
			}
			
			if(callform=="DR"){
			
			
				fetchbilldetailsIVF();   //for OPD 
				
				
			}else if(callform=="IPD"){
				
				fetchipddetailsdrdesk();  //for ipd
				
			}else if(callform=="Diagno"){
				
				fetchbilldetailsDigno(); //for Diagno
				
			}
			else {
				fetchipdbilldetails(callform);  //for ot
			}
			
			
		}
		
	});
 }
}
