var cancelTestSmplColFlag="N";
var deleteTestSmplColFlg="N";
var risReportFlag="N";
// this is for doctor list called sp by Vishnu
function getAllDoctorsList() {
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdServicesAdvised/getAllDoctorsList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		},
		success : function(r) {
			setDoctorList(r);
		}
	});
}

function setDoctorList(r) {
	var divContent = "";
	divContent = divContent + "<option value='0'>---Select Doctor---</option>";
	for (var i = 0; i < r.lstDoctorDto.length; i++) {
		divContent = divContent + "<option value='"
				+ r.lstDoctorDto[i].doctor_ID + "'  >"
				+ r.lstDoctorDto[i].doc_name + "</option>";
	}
	$("#doctor2").html(divContent);
	$("#doctor2").select2();

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 30-12-2021
 * @code : save Opd Services Advised
 ******************************************************************************/

function saveOpdServicesAdvised(callfrom) {
	var departmentId = $("#depdocdeskid").val();
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var receiptOf = "general";
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	var recSlaveId = 0;

	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined
			|| isNaN(recSlaveId)) {
		recSlaveId = 0;
	}

	var emrPer = $("#emrPer").val();

	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer = 0;
	}

	if (departmentId == 2) {
		saveIPDCpoe();
	} else {
		var flagUpdateorNotsendtoLab = $("#flagUpdateorNotsendtoLab").val();
		if (flagUpdateorNotsendtoLab == 1) {
			alert("Can Not Updated this Test Because test already send It!! ");
			return false;
		}

		var flagUpdateorNotsendtoRis = $("#flagUpdateorNotsendtoRis").val();
		if (flagUpdateorNotsendtoRis == 1) {
			alert("Can Not Updated this Test Because this test already send It!! ");
			return false;
		}

		var queryType = "insert";
		var module = "DrDesk";
		var treatmentId = $("#treatmentId").val();
		var patientId = $.trim(($("#patientId").val()));
		var callfrom1 = $("#callfromforprvTrtmnt").val();
		if (callfrom1 == 'privioustreatmentVise') {
			treatmentId = $("#priviousTrtmntId").val();
		} else if (callfrom1 == "cepisode") {
			treatmentId = $("#treatmentId").val();
		}

		var departmentId = $("#depdocdeskid").val();
		//var billId = $("#bill_Id").val();
		var billId = $("#billNo").text();
		
		var sourceTypeId = 1;
		var rate = 0;
		var otherRate = 0;
		var otherAmount = 0;
		if (sponsorId > 0 && chargesSlaveId > 0) {
			receiptOf = "sponsor";
			getchargesDR(0);
			otherRate = parseFloat($("#chargesfromConf").val());
			if (otherRate == 0 || otherRate == 0.0) {
				getchargesDR(2);
				otherRate = parseFloat($("#chargesubservice").val());
			}
			if (otherRate == 0 || otherRate == 0.0) {
				otherRate = parseFloat($("#chargesubservice").val());
			}
			var emrgancyper = parseFloat($('#emrPer').val());
			var emp = parseFloat(otherRate * emrgancyper / 100);
			otherRate = parseFloat(emp + otherRate);
			otherAmount = otherRate * 1;

		}
		//rate = $("#cpoeCharges2").val();
		rate = $("#chargesubservice").val();
		var quantity = 1;
		var amount = rate * 1;

		var billCat = $("#billCat").val();
		var coPay = 0;
		if (billCat == 0) {
			coPay = amount;
		}

		if (callfrom == "sponsorpack") {
			callfrom = "";
			sponsorId = 0;
			chargesSlaveId = 0;
		} else {
			callfrom = "DrDesk";
		}
		var iscombination = $("#iscombination").val();

		var serviceId = $("#serviceid").val();
		var subServiceId = $("#subserviceid").val();

		var billDetailsId = $("#billidservice").val();

		var subservicesname = $("#txtautoserviceName").val();
		var servicename = $("#servicename").val();
		var unitId = $("#uId").val();
		var doctorId = $("#doctor2").val();
		var clinicalNotes = $("#cpoeClinicalNotes").val();
		var instructions = $("#cpoeIns").val();
		var urgentflag = 'N';
		var sndToLabFlag = 'N';
		var sendToRisFlag = 'N';
		var radiationFlag = 'N';
		var drdeskflag = "-";
		if (departmentId == 3) {
			drdeskflag = 'D';
		} else {
			drdeskflag = 'Y';
		}
		if ($("#cpoeUrgent").is(':checked')) {
			urgentflag = 'Y';
		}
		if ($("#cpoeSendToRad").is(':checked')) {

			radiationFlag = 'Y';
		}
		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		var doctorsel = $("#doctor2 :selected").val();

		if (doctorsel == 0 || doctorsel == "" || doctorsel == null) {

		}
		if (clinicalNotes == "" || clinicalNotes == null) {
			clinicalNotes = "-";
		}
		if (instructions == "" || instructions == null) {
			instructions = "-";
		}

		if ($("#cpoeSendToRis").prop("checked") == true) {
			sendToRisFlag = 'Y';
			sndToLabFlag = 'N';
		}
		var serviceDetails = {
			listBillDetails : []
		};
		var patientId ='';
		if($("#patientId").text()!='' && $("#patientId").text() !=null && $("#patientId").text() !=undefined){
			patientId = $("#patientId").text();
		}else{
			patientId = $("#pt_Id").val();
		}
		
		//added by kishor for pathology
		var sampleTypeId  =	$('#sampleType').val();
		//var barCode  =	$('#barCode').val();
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			//inOutHouse = $('#inOutHouseCount').val();// only for outsource
			histopathLab = $('#histopathLab').val();
		}
		var customerType = 0; //$('#customerType').val();	
		var customerId = 0; //$('#customerId').val();	
		var businessType = 2;//$('#businessType').val();
		var prepaidReceiptId = 0;//$('#prepaidReceiptId').val();
		var collectionDate = $('#collectionDate').val();
		var collectionTime = $('#collectionTime').val();
		var regRefDocId = 0;//$('#refDocId').val();
		var barcodeNo=0;
		var templateWiseTestFlag = $("#templateWiseTestFlag").val();
		
		
		serviceDetails.listBillDetails.push({
			billDetailsId : billDetailsId,
			patienttId : patientId,
			treatmentId : $("#tr_Id").val(),
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sponsorId,
			rate : rate,
			quantity : quantity,
			amount : amount,
			serviceId : serviceId,
			subServiceId : subServiceId,
			doctorId : doctorId,
			urgentflag : urgentflag,
			clinicalnotes : clinicalNotes,
			instructions : instructions,
			unitId : unitId,
			coPay : coPay,
			drdeskflag : drdeskflag,
			callfrom : callfrom,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,
			iscombination : iscombination,
			otherRate : otherRate,
			otherAmount : otherAmount,
			otherPay : otherAmount,
			receiptOf : receiptOf,
			recSlaveId : recSlaveId,
			sndToLabFlag : sndToLabFlag,
			sendToRisFlag : sendToRisFlag,
			rFlag : radiationFlag,
			emrPer : emrPer,
			sampleTypeId : sampleTypeId,
			barCode : barcodeNo,
			inOutHouse : inOutHouse,
			histopathLab : histopathLab,
			businessType : businessType,
			customerId : customerId,
			customerType : customerType,
			collectionDate : collectionDate,
			collectionTime : collectionTime,
			regRefDocId : regRefDocId,
			templateWise : templateWiseTestFlag,
			ivfTreatFlag : "N"
		});
		var subList = {
			subSrvList : []
		};
		subList.subSrvList.push({
			serviceId : serviceId,
			subSrvid : subServiceId,
			refDocId : doctorId,
		});
		serviceDetails = JSON.stringify(serviceDetails);
		subList = JSON.stringify(subList);
		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

		var inputs = [];
		inputs.push('module=' + module);
		inputs.push('queryType=' + queryType);
		inputs.push('serviceDetails=' + serviceDetails);
		inputs.push('callfrom=' + callfrom);
		inputs.push('subList=' + subList);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/opdServicesAdvised/saveOpdServicesAdvised",

					success : function(r) {
					
						if (r == 1) {
							alertify.success("Service assign Successfully");
							if (departmentId == 3) {
								fetchbilldetailsDigno();
							} else {
								fetchBillDetails();
							}
							$('#txtautoserviceName').val("");
							$("#subservicesname").val("");
							$("#doctor2").select2("val", 0);
							$("#chargesubservice").val("");

							$("#servicename").val("");
							$("#cpoeClinicalNotes").val("");
							$("#cpoeIns").val("");
							$('#txtautoserviceName').attr('readonly', false);
							$('#dynamicItem').html("");
							$('#cpoeUrgent').attr('checked', false);
							$("#cpoesndtolabdiv").hide();
							$('#cpoesndtolab').attr('checked', false);
						} else if (r == 3) {

							alert("Package is not Configure Please Configure Package!");
							return false;
						}
						else if (r == 33) {
							var res = confirm("Package is not configure for sponsor. Do you want Default Package?");
							if (res == true) {
								// For opd sponsor patient.
								saveOpdServicesAdvised('sponsorpack');
							} else {

								return false;
							}

						}
						
						else if (r == 4) {
							var res = confirm("Package is not configure for sponsor. Do you want Default Package?");
							if (res == true) {
								// For opd sponsor patient.
								saveOpdServicesAdvised('sponsorpack');
							} else {

								return false;
							}

						} else if (r == 6) {
							alert("Package is out of Date Can't save!!!!");

						} else if (r == 2) {
							alertify.success("Update successfully...!!!");
							$('#txtautoserviceName').val("");
							$("#subservicesname").val("");
							$("#doctor2").select2("val", 0);
							$("#chargesubservice").val("");
							$("#servicename").val("");
							$("#cpoeClinicalNotes").val("");
							$("#cpoeIns").val("");
							$('#txtautoserviceName').attr('readonly', false);
							$('#dynamicItem').html("");
							$('#cpoeUrgent').attr('checked', false);
							$("#cpoesndtolabdiv").hide();
							$('#cpoesndtolab').attr('checked', false);
							$("#chargesubservice").val(0);
							$("#cpoeCharges2").val(0);
							$("#billidservice").val(0);
							
							fetchBillDetails();

						}
					}

				});
	}
	var chargesSlaveId = $("#chargesSlaveId").val();
	var sendTestFlagMeesha=$("#sendTestFlagMeesha").val();
	if(sendTestFlagMeesha == "on"){
		if(chargesSlaveId > 0){
			sendToPhlebotomyFromSaveSponsor(0);	
		}else{
		   sendToPhlebotomyFromSave(0);// send test automatically to LIS after save
		}
	}
	
		fetchBillDetails();	
}

function getAllOpdServicesAdvised(callfrom) {
	var treatmentId = $("#tr_Id").val();
	if (treatmentId == 0) {
		return false;
	}
	var callform = "default";
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/opdServicesAdvised/getAllOpdServicesAdvised",
		data : {
			"treatmentId" : treatmentId,
			"callform" : callform
		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(response) {
			testcountipd = 1;
			if (callfrom == "AutoDischarge") {
				$("#tcpoeservices").setTemplate(servicedetailsipdDischarge);
				$("#tcpoeservices").processTemplate(response);
				$("#teleMedicpoeservices").setTemplate(
						servicedetailsipdDischarge);
				$("#teleMedicpoeservices").processTemplate(response);
			} else {
				$("#tcpoeservices").setTemplate(opdServicesAdvised);
				$("#tcpoeservices").processTemplate(response);
				var jsonConvertedData = JSON.stringify(response);
				$("#billdetailsnew").html(jsonConvertedData);
			}

		}

	});
}

function setOpdServicesAdvisedTemplate(id) {
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ddInstructions").hide();
	$("#instruct").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	var depid = $("#depdocdeskid").val();
	var temp = '<div class="tab-pane fade in active" id="CPOE">'
			+ '<div style="padding-top: 0px;" class="col-md-12-1" id="row1">'
			+ '<div style="margin-top: 0px; margin-left: 5px;" class="tabbable tabs-left col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="tab-content col-md-10-1">'
			+ '<div class="tab-pane fade active in col-md-12-1" id="Investigation">'
			+ '<div style="margin-top: 30px;" class="col-sm-12-1" id="Investigation_row_1"><div class="col-sm-4-1">'
			+ '<div style="padding-left:5%" class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont">Test Name </label>'
			+ '<div id="divInvestigationTestName"><input type="text" onkeyup="setAllServicesAdvisedAutoComplete(this.id)" style="border: 1px solid orange;" class="typeahead form-control" id="txtautoserviceName" placeholder="Test Name">'
			+ '</div></div><input type="hidden" value="0" id="charges1"> <input type="hidden" value="0" id="investigationtestId">'
			+ '<input type="hidden" value="0" id="idTestSlave"></div>'
			+ '<div style="margin-left: 75px;" class="col-sm-5-1">'
			+ '<div style="padding-top: 15px;" class="col-sm-3-1"></div>'
			+ '<div class="col-sm-4-1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont" style="margin-top: 5%;">Doctor</label>'
			+ '<select style="width:130px" class="input-SmallText" id="doctor2"></select></div>'
			+ '</div><div class="col-sm-5-1">'//	+ '</div><div class="col-sm-4-1">'
			+ '<div class="form-group col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont" style="margin-top: 10px; ">Hospital</label>'
			+ '<select class="form-control input-SmallText" style="height: 25px; margin-left: 3px;" id="hospital2"><option selected="selected" value="0">Select</option></select>'
			+ '</div></div></div>'
			+ '<div style="margin-top:-2%" class="col-sm-2-1">'
			+ '<div class="form-group col-sm-12-1">'
			+ '<label class="TextFont" style="margin-top: 10px;">Unit</label> <select onchange="cleartexrfiled();" class="form-control input-SmallText" id="uId"></select>'
			+ '<input type="hidden" id="allunitid"></div></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-12-1" id="Investigation_row2">'
			+ '<div class="col-sm-6 select2-container select2-container-multi " style="margin-top: 2%;" >'
			+ '<ul id="dynamicItem" class="select2-choices" style="overflow-y: "></ul>'//+ '<ul id="dynamicItem" class="select2-choices" style="overflow-y: scroll;"></ul>'
			+ '<input type="hidden" id="subserviceid" value="0">'
			+ '<input type="hidden" id="iscombination" value="0">'
			+ '<input type="hidden" id="serviceid" value="0"></div>'
			+ '<div style="margin-top: 10px;padding-left:2%" class="col-sm-1-1" id="col11">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Charges </label> <input type="text" id="chargesubservice" onchange="setHiddenFieldOpdServicesAdvised(this.value),calculateEmerChrForDocDesskOpdServicesAdvised()" class="form-control input-SmallText" placeholder="Charges" readonly="readonly" style="width: 123px; margin-left: 0px;"><input type="hidden" value="" id="cpoeCharges2">'
			+ '</div></div><div style="margin-top: 10px; margin-left: 7%; " class="col-sm-2-1" id="col9">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Instructions </label> <input type="text" id="cpoeIns" class="form-control input-SmallText" placeholder="Instructions" style="width: 157px; margin-left: 5px;">'
			+ '</div></div><div style="margin-top: 10px; margin-left: 2%;" class="col-sm-1-1" id="col10">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Clinical Notes </label><input type="text" id="cpoeClinicalNotes" class="form-control input-SmallText" placeholder="Clinical Notes"style="width: 146px; margin-left: 0px;" >'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<input type="checkbox" id="cpoeUrgent" style="margin-top: 20px; margin-left: 17px;">'
			+ '</div>'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 20px;margin-left: -41px;"> Urgent </label>'
			+ '</div>'
	    	+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
 
			+ '<div style="margin-top: 30px;padding-left:600px" class="col-sm-2-1" id="col11">'
			+ '<i><input type="button" style="margin-left:1%" value="Save" onclick="saveOpdServicesAdvised(\'DoctorStation\')" class="btn btn-xs btn-success editUserAccess"> </i>'
			+ '</div></div>'

			

		
			
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
				+ '<input id="cpoeSendToRis" type="checkbox" name="cpoeSendToRis" checked style="display:none;">';
	} else {
		temp = temp
				+ '<input id="cpoeSendToRis" type="checkbox" name="cpoeSendToRis" style="display:none;">';
	}

	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -50px;display:none;"> Send To Ris </label>'
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
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="editCPOE_TestLabel1" onclick="editOpdServicesAdvised()">'
			+ '<i class="fa fa-edit"></i> Edit</label> <label onclick="deleteOpdServicesAdvised(\'multiple\',\'DR\')" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="muldelcp">'
			+ '<i class="fa fa-trash-o"></i> Multiple Delete </label>'
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="editCPOE_TestLabel1" onclick="sendToLabFromOPD()">'
			+ '<i class="fa fa-edit"></i> Send To Lab</label>'
			
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="editCPOE_TestRISLabel1" onclick="sendToRisFromOPD()">'
			+ '<i class="fa fa-edit"></i> Send To RIS</label>'
			
			+'</div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-condensed ">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th  class="col-md-2-1 center"><div class="TextFont">Particulars/Details</div></th>'
			+ '<th  class="col-md-2-1 center"><div class="TextFont">   Date</div></th>'
			+ '<th  class="col-md-2-1 center"><div class="TextFont">Consultant Name</div></th>'
			+ '<th  class="col-md-2-1 center"><div class="TextFont">Type</div></th>'
			+ '<th  class="col-md-1-1 center"><div class="TextFont">Status</div></th>'
			+ '<th  class="col-md-1-1 center"><div class="TextFont">Action</div></th>'
			+ '<th  class="col-md-1-1 center"><div class="TextFont">Delete</div></th>'
			+ '</tr></thead></table>'
			+ '<div style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-striped table-condensed"><tbody id="tcpoeservices"></tbody>'
			+ '</table><input type="hidden" value="0" id="CPOErowCount"></div></div>'
			+ ' </div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	
	getAllDoctorsList();
	getAllUnitdrdesk();
	var uid = $("#uids").val();
	$("#uId").val(uid);
	//getAllOpdServicesAdvised();
	fetchBillDetails();
}
	
var testcountipd = 1;
var opdServicesAdvised = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testcountipd}.</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-1-1 center"> {new Date($T.cpoeservice.created_date_time).toLocaleDateString()}</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
	+ '<td style="display:none;" id="empR{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.emrPer}</td>'
	+ '<td style="display:none;" id="rate{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.rate}</td>'
	+ '<td style="display:none;" id="subserviceid{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.categoryid}</td>'
	+ '<td style="display:none;" id="sId{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.serviceid}</td>'
	+ '<td style="display:none;" id="dId{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.doctor_id}</td>'

	+ '{#if $T.cpoeservice.deleted == "N" && $T.cpoeservice.cancel == "N"}'
	
	+ '{#if $T.cpoeservice.paid_flag == "Y"}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: orange;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkOpdBill"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice disabled " onclick=deleteOpdServicesAdvised({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '{#if $T.cpoeservice.paid_flag == "N"}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	
	+ '{#if $T.cpoeservice.servicename == "Pathology"}'
	+ '{#if $T.cpoeservice.sndtolabflag == "Y"}'
	+ '<td class="col-md-1-1 center">'
	+ '<input type="button" id="chkOpdBill{$T.cpoeservice.billipd_id}" value ="Sent" style="width:60px; background-color: orange;" disabled ></input></td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.sndtolabflag == "N"}'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkOpdBill{$T.cpoeservice.billipd_id}" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+'{#/if}'
	+ '<td class="col-md-1-1 center">'
	+ '-</td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.servicename != "Pathology"}'
	+ '<td class="col-md-1-1 center">'
	+ '-</td>'
	+'{#/if}'
	
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOpdServicesAdvised({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '{#else}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: red;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOpdServicesAdvised({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'

	+'{#/if}'
	
	+ '</tr>{testcountipd++}{#/for}';


function editOpdServicesAdvised(values) {
	var id = 0;
	var countcheckbox = 0;
	/*$.each($('#chkunserv:checked'), function() */
	 $('input[name=opdBillCheckbox]:checked').each( function(){
		id = $(this).val();
		countcheckbox++;
	});
	 
	
	 
	if (countcheckbox > 1) {
		alert("can not multiple test edit");
		return false;
	}
	if (id == 0) {
		alert("Please Check test to edit!!");
	} else {
		var depid = $("#depdocdeskid").val();
		var myArray = JSON.parse($("#billdetailsnew").html());
		if (depid == 1) {
			for (var k = 0; k < myArray.cpoeServdetails.length; k++) {

				if (myArray.cpoeServdetails[k].billdetailsid == id) {
					$("#cpoeIns")
							.val(myArray.cpoeServdetails[k].clinical_notes);
					$("#cpoeClinicalNotes").val(
							myArray.cpoeServdetails[k].instructions);
					$('#doctor2').select2('val',
							myArray.cpoeServdetails[k].doctor_id);
					$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
					$("#subserviceid").val(
							myArray.cpoeServdetails[k].categoryid);
					$("#txtautoserviceName").val(
							myArray.cpoeServdetails[k].categoryName);
					$("#txtautoserviceName").attr('readonly', true);
					$("#billidservice").val(
							myArray.cpoeServdetails[k].billdetailsid);
					$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
					$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
					var sentlabflag = (myArray.cpoeServdetails[k].sndtolabflag);

					if (sentlabflag > 'Y' || sentlabflag == 'Y') {
						$("#cpoesndtolab").prop("checked", true);

					}

					if (myArray.cpoeServdetails[k].sndtorisflag == "Y") {
						$("#cpoesndtolabdiv").hide();
					//	$("#cpoeSendToRisdiv").show();
						$("#cpoeSendToRis").prop("checked", true);
					}

					var emrP = parseFloat(myArray.cpoeServdetails[k].emrPer);
					if (isNaN(emrP)) {
						emrP = 0;
					}

					$('#emrPer').val(emrP);
					if (emrP > 0 || emrP == 0) {
						$("#emrChrFlag").prop("checked", true);
						$('#emrPer').css("display", "inline");
					}
					opdServicesAdvisedSuperCategory(myArray.cpoeServdetails[k].categoryid);
				}
			}
		} else if (depid == 3) {

			for (var k = 0; k < myArray.cpoeServdetails.length; k++) {

				if (myArray.cpoeServdetails[k].billdetailsid == id) {

					$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
					$("#cpoeClinicalNotes").val(
							myArray.cpoeServdetails[k].clinical_notes);
					$('#doctor2').select2('val',
							myArray.cpoeServdetails[k].doctor_id);
					$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
					$("#subserviceid").val(
							myArray.cpoeServdetails[k].categoryid);
					$("#txtautoserviceName").val(
							myArray.cpoeServdetails[k].categoryName);
					$("#txtautoserviceName").attr('readonly', true);
					$("#billidservice").val(
							myArray.cpoeServdetails[k].billdetailsid);
					$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
					$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);

					var sentlabflag = (myArray.cpoeServdetails[k].sndtolabflag);
					if (sentlabflag > 'Y' || sentlabflag == 'Y') {
						$("#cpoesndtolab").prop("checked", true);

						$("#cpoesndtolab").attr({
							disabled : "true"
						});

						$("#flagUpdateorNotsendtoLab").val(1);
					}

					if (myArray.cpoeServdetails[k].sndtorisflag == "Y") {

						$("#cpoesndtolabdiv").hide();

						$("#cpoeSendToRisdiv").show();

						$("#cpoeSendToRis").prop("checked", true);

						$("#cpoeSendToRis").attr({
							disabled : "true"
						});

						$("#flagUpdateorNotsendtoRis").val(1);
					}

					var emrP = parseFloat(myArray.cpoeServdetails[k].emrPer);
					if (isNaN(emrP)) {
						emrP = 0;
					}

					$('#emrPer').val(emrP);
					if (emrP > 0 || emrP == 0) {
						$("#emrChrFlag").prop("checked", true);
						$('#emrPer').css("display", "inline");
					}
					opdServicesAdvisedSuperCategory(myArray.cpoeServdetails[k].categoryid);
				}
			}

		} else {

			for (var k = 0; k < myArray.cpoeServdetails.length; k++) {

				if (myArray.cpoeServdetails[k].billipd_id == id) {
					$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
					$("#cpoeClinicalNotes").val(
							myArray.cpoeServdetails[k].clinical_notes);
					$('#doctor2').select2('val',
							myArray.cpoeServdetails[k].doctor_id);
					$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
					$("#subserviceid").val(
							myArray.cpoeServdetails[k].categoryid);
					$("#txtautoserviceName").val(
							myArray.cpoeServdetails[k].categoryName);
					$("#txtautoserviceName").attr('readonly', true);
					$("#billidservice").val(
							myArray.cpoeServdetails[k].billipd_id);
					$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
					$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
					$("#cpoesndtolab").val(
							myArray.cpoeServdetails[k].sndtolabflag);
					var emrP = parseFloat(myArray.cpoeServdetails[k].emrPer);
					if (isNaN(emrP)) {
						emrP = 0;
					}

					$('#emrPer').val(emrP);
					if (emrP > 0 || emrP == 0) {
						$("#emrChrFlag").prop("checked", true);
						$('#emrPer').css("display", "inline");
					}
					opdServicesAdvisedSuperCategory(myArray.cpoeServdetails[k].categoryid);
				}
			}
		}
	}
}

function deleteOpdServicesAdvised(values, callform) {
	deleteType = "Y";
	//var labservicelist ='';
	var treatId=$('#tId').val();
	var labservicelist=[];	
	if (values == 'multiple') {

	/*	$.each($('#chkunserv:checked'), function() {
			labservicelist = labservicelist + "," + $(this).val();
		});*/

		$('input[name=opdBillCheckbox]:checked').each(function() {

			labservicelist.push(parseInt($(this).val()));
			});
		
		if (labservicelist.length == 0) {

			alert("Please check  at least Service to delete");
			return false;

		}
	} else {
		//labservicelist = labservicelist + "," + values;
		labservicelist.push(values);

	}
	
	//deleteLabTestServicesAdvised(labservicelist, deleteType, values, callform);
	deleteLabTestServicesAdvised(labservicelist, treatId,deleteType);

	if (deleteTestSmplColFlg == "Y") {
		alert("Test Sample are collected,You can't cancel or delete this Test.");
		return false;
	}

	//deleteInvTestServicesAdvised(labservicelist, deleteType, values, callform);
	deleteInvTestServicesAdvised(labservicelist, deleteType);
	if (risReportFlag == "Y") {
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}

	//var tk = labservicelist.slice(1);
	
	var r = confirm("Are You Sure You Want To Permanantly Delete this row ?");
	if (r == true) {

		/*jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/opdServicesAdvised/deleteOpdServicesAdvised",
			data : {
				
				"labservicelist" : encodeURIComponent(labservicelist),
				"callform" : callform
			},
			timeout : 1000 * 60 * 5,
			cache : false,

			success : function(response) {

				if (response.indexOf("Delete") != -1) {
					alertify.success(response);
				} else {
					alertify.error(response);
					return false;
				}

				if (callform == "DR") {

					fetchBillDetails(); // for OPD

				} else if (callform == "IPD") {

					fetchipddetailsdrdesk(); // for ipd

				} else if (callform == "Diagno") {

					fetchbilldetailsDigno(); // for Diagno

				} else {
					fetchipdbilldetails(callform); // for ot
				}

			}

		});*/
		var inputs = [];	
		inputs.push("labservicelist="+ encodeURIComponent(labservicelist));
		inputs.push("callform="+ "BILL" );
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/doctordesk/deleteservdetails",
			data	: str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				alert('Network Issue!!!');
	  		},
			success : function(r) {
				
			
				if(r == '1'){
					alert("Service Deleted successfuly");
				}else if(r == '3'){
					alert("Accession Done!!! Test cannot be deleted");
				}else if(r == '4'){
					alert("Accession Done!!! OR Test Sample are collected.You can't cancel or delete this Test");
				}else if(r == '5'){
					alert("Oops something went wrong.....");
				}
				
				//fetchbilldetails();
				fetchBillDetails();
				
				//alert(r);
				//window.location.reload(true);
			}
			
		});
	}
}

function opdServicesAdvisedSuperCategory(serviceId) {

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
			setSuperCatogoiresList('dynamicItem',response);
		}
	});
}

function setSuperCatogoiresList(setDiv,response) {
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

function fetchBillDetails(){
	
	
	var chargesSlaveId  = $("#chargesSlaveId").val(); 
	
	var tID  = $("#treatmentId").val(); 
	
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		tID = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		tID = $("#treatmentId").val();
	}
	
    var servid=0;
	if(tID==0){
		
	}
	var inputs = [];

	inputs.push('treatmentId=' + $("#tr_Id").val());

	var str = inputs.join('&');
    var callform="default";
	/*jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/opdServicesAdvised/fetchBillDetails",
		data	: {
			"tID"        : $("#tr_Id").val(),
			"callform"   :callform,
			"servid"      :servid
		
		async : false,
		type 	: "POST",
		url : "ehat/opdServicesAdvised/getPatientServiceBill",
		data	: {
			"treatmentId"        : $("#tr_Id").val()
		//	"serviceId"      :servid
		
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			    testRowCountcpoe = 1;
				$("#tcpoeservices").setTemplate(servicedetails);
				$("#tcpoeservices").processTemplate(response);
				  var jsonConvertedData = JSON.stringify(response);
				$("#billdetailsnew").html(jsonConvertedData);
				setOpdlab(response);
			
			setSubServiceDetails(response);
			
		}
		
	});*/
    
    
    jQuery
	.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdServicesAdvised/getPatientServiceBill",

		error : function() {
			alert('Network Issue.......................!!!');
		},

		success : function(r) {
			if(chargesSlaveId > 0){
				setSubserviceDeatilsForSponser(r);
			}else{
				setSubServiceDetails(r);
			}
			
			
			
			
			// for edit data set to template
					if($("#tr_Id").val() > 0){
						
						jQuery.ajax({
						async : false,
						type 	: "POST",
						url 	: "ehat/opdServicesAdvised/fetchBillDetails",
						data	: {
							"tID"        : $("#tr_Id").val(),
							"callform"   :callform,
							"servid"      :servid
						
						
						},
						timeout : 1000 * 60 * 5,
						cache 	: false,
					
						success : function(response) {
							    testRowCountcpoe = 1;
								  var jsonConvertedData = JSON.stringify(response);
								$("#billdetailsnew").html(jsonConvertedData);
								//setOpdlab(response);
							
						}
						
					});
						
					}

		}
	});
	
}


function setSubServiceDetails(r){
	
	$("#tcpoeservices").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listBillNobleServiceDto.length > 0) {
		
		for ( var i = 0; i < r.listBillNobleServiceDto.length; i++) {
			
					if(r.listBillNobleServiceDto[i].serviceId !=1 &&  r.listBillNobleServiceDto[i].serviceId !=2 ){
					var datetime12= new Date(r.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
					var dname= r.listBillNobleServiceDto[i].docName;
					var serviceId= r.listBillNobleServiceDto[i].serviceId
					var cghsCode = "("+r.listBillNobleServiceDto[i].cghsCode+")";
					if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
						cghsCode="";
					}
					if(dname==null){
						
						dname="-";
					}
					
					rowCount++;
					
					htm = htm
					+'<tr>'
					+ '<td class="col-md-1-1 center">'+rowCount+'</td>'
					
					
					if(serviceId == 11 || serviceId == 13 ){
						if((r.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
							htm = htm		+ '<td class="col-md-2-1 center"  style="color: green;"> '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}else{
							htm = htm + '<td class="col-md-2-1 center"  > '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}
					
					}
						
					if(serviceId == 12  ){
						if((r.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
							htm = htm	+ '<td class="col-md-2-1 center"  style="color: #00bfff;"> '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}else{
							htm = htm	+ '<td class="col-md-2-1 center" > '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}
					
					}
					
					if(serviceId != 12 && serviceId != 11 && serviceId != 13 ){
						
							htm = htm	+ '<td class="col-md-2-1 center"  style="color: #00bfff;"> '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						
					
					}
						
					
					
					
			htm = htm	
					+ '<td class="col-md-2-1 center"> '+datetime12+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listBillNobleServiceDto[i].docName+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listBillNobleServiceDto[i].serviceName+' </td>'
					
					if(r.listBillNobleServiceDto[i].paidFlag =="Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: orange;" disabled></input></td>'
					}else if(r.listBillNobleServiceDto[i].paidFlag =="N"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: green;" disabled></input></td>'
					}
				
			if(r.listBillNobleServiceDto[i].paidFlag =="Y"){
					htm = htm		+ '<td class="col-md-1-1 center">'
					+ '<input id="chkOpdBill'+r.listBillNobleServiceDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;"  disabled value='+r.listBillNobleServiceDto[i].billDetailsId+'></input></td>'
					
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOpdServicesAdvised('+r.listBillNobleServiceDto[i].billDetailsId+',\'DR\') disabled ><i class="fa fa-trash-o"></i></button></td>'
			}else { //if((r.listBillNobleServiceDto[i].sndtorisflag)=="N"){
				htm = htm		+ '<td class="col-md-1-1 center">'
				+ '<input id="chkOpdBill'+r.listBillNobleServiceDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox"   checked="checked"  style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listBillNobleServiceDto[i].billDetailsId+'></input></td>'
				
				+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOpdServicesAdvised('+r.listBillNobleServiceDto[i].billDetailsId+',\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
			}
					
				htm =htm	+	'<td style="display:none;" id="barCode'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].subServiceId+' </td>'
					
					+	'<td style="display:none;" id="spclId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].specialityId+' </td>'
					
					+	'<td style="display:none;" id="dId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].docId+' </td>'
					
					+	'<td style="display:none;" id="sId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].serviceId+' </td>'
									
					+	'<td style="display:none;" id="amt'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].amount+' </td>'
					
					+	'<td style="display:none;" id="isCombination'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].isCombination+' </td>'
					
					+	'<td style="display:none;" id="emrP'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].emrPer+' </td>'
					
					+	'<td style="display:none;" id="othRates'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].otherRate +' </td>'
					
					+	'<td style="display:none;" id="sndtolabflag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtolabflag+' </td>'
					
					+	'<td style="display:none;" id="sampleType'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sampleTypeId+' </td>'
					
					+	'<td style="display:none;" id="barCodeId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" id="inOutHouse'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].inOutHouse+'</td>'
					
					+	'<td style="display:none;" id="histopathLab'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].histopathLab+'</td>'
					
					+	'<td style="display:none;" id="collectionDate'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionDate+' </td>'
					
					+	'<td style="display:none;" id="collectionTime'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionTime+' </td>'
		
					+	'<td style="display:none;" id="regRefDocId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
		
					// added by vinod
					+	'<td style="display:none;" id="sendToRisId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtorisflag +' </td>'
					
					// added by vinod
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].templateWise +' </td>'
					
					+	'<td style="display:none;" id="payFlag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].paidFlag+' </td>'
					
					+	'<td style="display:none;" id="catName'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>'
					
					+	'<td style="display:none;" id="char'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ (r.listBillNobleServiceDto[i].amount).toFixed(2)+' </td>';
					
					+ "</tr>";
				
				}
			
		}
		
		$("#tcpoeservices").html(htm);
	}
}

function setSubserviceDeatilsForSponser(r){

	
	$("#tcpoeservices").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listBillNobleServiceDto.length > 0) {
		
		for ( var i = 0; i < r.listBillNobleServiceDto.length; i++) {
			
					if(r.listBillNobleServiceDto[i].serviceId !=1 &&  r.listBillNobleServiceDto[i].serviceId !=2 ){
					var datetime12= new Date(r.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
					var dname= r.listBillNobleServiceDto[i].docName;
					var serviceId= r.listBillNobleServiceDto[i].serviceId
					var cghsCode = "("+r.listBillNobleServiceDto[i].cghsCode+")";
					if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
						cghsCode="";
					}
					if(dname==null){
						
						dname="-";
					}
					
					rowCount++;
					
					htm = htm
					+'<tr>'
					+ '<td class="col-md-1-1 center">'+rowCount+'</td>'
					
					
					if(serviceId == 11 || serviceId == 13 ){
						if((r.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
							htm = htm		+ '<td class="col-md-2-1 center"  style="color: green;"> '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}else{
							htm = htm + '<td class="col-md-2-1 center"  > '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}
					
					}
						
					if(serviceId == 12  ){
						if((r.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
							htm = htm	+ '<td class="col-md-2-1 center"  style="color: #00bfff;"> '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}else{
							htm = htm	+ '<td class="col-md-2-1 center" > '+r.listBillNobleServiceDto[i].categoryName+' </td>'
						}
					
					}
						
					
					
					
			htm = htm	
					+ '<td class="col-md-2-1 center"> '+datetime12+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listBillNobleServiceDto[i].docName+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listBillNobleServiceDto[i].serviceName+' </td>'
					
					if(r.listBillNobleServiceDto[i].paidFlag =="Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: orange;" disabled></input></td>'
					}else if(r.listBillNobleServiceDto[i].paidFlag =="N"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: green;" disabled></input></td>'
					}
				
			if(r.listBillNobleServiceDto[i].paidFlag =="Y"){ // if((r.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
					htm = htm		+ '<td class="col-md-1-1 center">'
					+ '<input id="chkOpdBill'+r.listBillNobleServiceDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" disabled value='+r.listBillNobleServiceDto[i].billDetailsId+'></input></td>'
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" disabled onclick=deleteOpdServicesAdvised('+r.listBillNobleServiceDto[i].billDetailsId+',\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
					    
			}else{
                	htm = htm		+ '<td class="col-md-1-1 center">'
					+ '<input id="chkOpdBill'+r.listBillNobleServiceDto[i].billDetailsId+'" type="checkbox"  checked=checked  name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listBillNobleServiceDto[i].billDetailsId+'></input></td>'
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOpdServicesAdvised('+r.listBillNobleServiceDto[i].billDetailsId+',\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
					
                }
			htm = htm	
					
					+	'<td style="display:none;" id="barCode'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].subServiceId+' </td>'
					
					+	'<td style="display:none;" id="spclId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].specialityId+' </td>'
					
					+	'<td style="display:none;" id="dId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].docId+' </td>'
					
					+	'<td style="display:none;" id="sId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].serviceId+' </td>'
									
					+	'<td style="display:none;" id="amt'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].amount+' </td>'
					
					+	'<td style="display:none;" id="isCombination'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].isCombination+' </td>'
					
					+	'<td style="display:none;" id="emrP'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].emrPer+' </td>'
					
					+	'<td style="display:none;" id="othRates'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].otherRate +' </td>'
					
					+	'<td style="display:none;" id="sndtolabflag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtolabflag+' </td>'
					
					+	'<td style="display:none;" id="genRate'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].rate+' </td>'
					
					+	'<td style="display:none;" id="oCon'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].otherConcession+' </td>'

					+	'<td style="display:none;" id="oPay'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].otherPay+' </td>'
					
					+	'<td style="display:none;" id="emrPerSpon'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].emrPer+' </td>'
					
					+	'<td style="display:none;" id="isCombinationSponsor'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].isCombination+' </td>'
			 
					
					+	'<td style="display:none;" id="sampleTypeOpdSponsorr'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sampleTypeId+' </td>'

					+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].barCode+' </td>'

					+	'<td style="display:none;" id="inOutHouseOpdSponsor'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].inOutHouse+' </td>'
					+	'<td style="display:none;" id="histopathLabOpdSponsor'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].histopathLab+' </td>'

					+	'<td style="display:none;" id="collectionDateOpdSponsor'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionDate+' </td>'

					+	'<td style="display:none;" id="collectionTimeOpdSponsor'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionTime+' </td>'

					+	'<td style="display:none;" id="regRefDocId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
		
					// added by vinod
					+	'<td style="display:none;" id="sendToRisId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtorisflag +' </td>'
					
					// added by vinod
					+	'<td style="display:none;" id="isTemplateWiseTestSponsor'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].templateWise +' </td>'
					
					+	'<td style="display:none;" id="payFlag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].paidFlag+' </td>'
					
					+	'<td style="display:none;" id="catName'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>'
					
					+	'<td style="display:none;" id="char'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ (r.listBillNobleServiceDto[i].amount).toFixed(2)+' </td>';
					
					+ "</tr>";
				
				}
			
		}
		
		$("#tcpoeservices").html(htm);
	}

	
}



var testRowCountcpoe = 1;

var servicedetails = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testRowCountcpoe}.</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-1-1 center"> {new Date($T.cpoeservice.created_date_time).toLocaleDateString()}</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
	+ '<td style="display:none;" id="empR{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.emrPer}</td>'
	+ '<td style="display:none;" id="rate{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.rate}</td>'
	+ '<td style="display:none;" id="subserviceid{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.categoryid}</td>'
	+ '<td style="display:none;" id="sId{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.serviceid}</td>'
	+ '<td style="display:none;" id="dId{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.doctor_id}</td>'


	+ '{#if $T.cpoeservice.deleted == "N" && $T.cpoeservice.cancel == "N"}'
	
	+ '{#if $T.cpoeservice.paid_flag == "Y"}'
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: orange;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" class="btn disabled" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice disabled"  onclick=deleteOpdServicesAdvised({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.paid_flag == "N"}'
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	
	+ '{#if $T.cpoeservice.servicename == "Pathology"}'
	+ '{#if $T.cpoeservice.sndtolabflag == "Y"}'
	+ '<td class="col-md-1-1 center">'
	+ '<input type="button" id="chkOpdBill{$T.cpoeservice.billdetailsid}" value ="Sent" style="width:60px; background-color: orange;" disabled ></input></td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.sndtolabflag == "N"}'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkOpdBill{$T.cpoeservice.billdetailsid}" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+'{#/if}'
	+ '<td class="col-md-1-1 center">'
	+ '-</td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.servicename != "Pathology"}'
	+ '<td class="col-md-1-1 center">'
	+ '-</td>'
	+'{#/if}'
	
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOpdServicesAdvised({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	+'{#/if}'
	
	+ '{#else}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: red;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" class="btn disabled" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice"  onclick=deleteOpdServicesAdvised({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '</tr>{testRowCountcpoe++}{#/for}';

function setHiddenFieldOpdServicesAdvised(value){
	$("#cpoeCharges2").val(value);
}

function calculateEmerChrForDocDesskOpdServicesAdvised() {

	var emrgancyper = parseFloat($('#emrPer').val());
	if (isNaN(emrgancyper)) {
		$("#emrPer").val(0);
		emrgancyper = parseFloat($('#emrPer').val());
	}
	if (emrgancyper > 100) {
		alert("Percentage should be less than 100");
		$("#emrPer").val(0);
		emrgancyper = parseFloat($('#emrPer').val());
	}
	var rate = 0;
	rate = parseFloat($("#chargesubservice").val());
	var emp = parseFloat(rate * emrgancyper / 100);
	rate = parseFloat(emp + rate);

	if (isNaN(rate)) {
		rate = parseFloat($("#chargesubservice").val());
	}
	$("#chargesubservice").val(rate);
}

function setAllServicesAdvisedAutoComplete(inputID) {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	/*if (sponsorId > 0 && chargesSlaveId > 0) {
		setAllChargesConfigOnGenBillingIPDrDskServicesAdvised(inputID);
	} else {*/
		var resultData = [];
		var findingName = $("#" + inputID).val();
		var unit = $("#uId").val();
		var unitlist = listofunit.slice(1);
		var depdocdeskid = $("#depdocdeskid").val();
		var querytype = "all";
		var serviceid = 0;
		var inputs = [];
		inputs.push('unit=' + unit);
		inputs.push('findingName=' + encodeURIComponent(findingName));
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/autoallservicestest/getallservices",

			success : function(r) {
				autoCompDDServicesAdvised(r, inputID);
			}
		});
	//}
}

function setAllChargesConfigOnGenBillingIPDrDskServicesAdvised(inputID) {
	
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = 0;
	
	var sponsorId = 0;
	sponsorId =  parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = 0;
	chargesSlaveId =parseInt($("#chargesSlaveId").val());
	var hallId = 2;
	var hallSlaveId = 0; 
	var treatId=$("#tr_Id").val();
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
		hallSlaveId = 0;
	}
	if (treatId == "" || treatId == null || treatId == undefined || isNaN(treatId)) {
		treatId = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservicesConf",

		success : function(r) {
			autoCompDDServicesAdvised(r, inputID);

		}
	});
}

function autoCompDDServicesAdvised(response,id) {
	
	
	var qty = id.slice(0, -1); // for dyamic col getting id
	var myArray = response;// parsing response in JSON format
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
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					
					console.log(ui);
				
					var tempWise = ui.item.templateWise;
					$("#templateWiseTestFlag").val(ui.item.templateWise);
					
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
				
						if(ui.item.categoryName!="NO"){
							var depdocdeskid = $("#depdocdeskid").val();
						$('#txtautoserviceName').val(ui.item.categoryName);
/*						$("#subservicesname").val(ui.item.categoryName);
*/						$("#subserviceid").val(ui.item.categoryid);
/*						$("#servicename").val(ui.item.serviceName);
*/						$("#serviceid" ).val(ui.item.serviceid);
                        var sponsorId = $("#SponsorsourceTypeId").val();
                        var chargesSlaveId = $("#chargesSlaveId").val();
                     //   if(sponsorId > 0 && chargesSlaveId > 0){
                        var iscombination = ui.item.iscombination;
                        var categoryid= ui.item.categoryid;
						var isComServlastId = 0;
						if(iscombination == "Y"){
							
							isComServlastId = ui.item.categoryid;
						}
                        getSponsorTestChargesOnOPD(isComServlastId,categoryid);
    					var sponsorTestCharges = $("#sponsorTestCharges").val();
    					var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
                        
    					var valsponsor = sponsorTestCharges;
    					var yearwisecharges = yearWiseSponsorTestCharges;
    					/*if( valsponsor > 0){
    						$("#chargesfromConf").val(valsponsor);
    						$("#chargesubservice").val(valsponsor);
							//$("#rateOpdSponsor2").val(valsponsor);
    						 $("#chargesubservice").val(chargesfromConf);
    					}else{
    						$("#chargesfromConf").val(ui.item.categorycharges);
    					}*/
    					
    					
    				
    					
    					
                       if(sponsorId == 0 && chargesSlaveId == 0){
                    	   if(depdocdeskid==2){
                      		 getchargesDR(2);
                     		var chargesfromConf= $("#chargesfromConf").val();
                     		if(chargesfromConf==0 || chargesfromConf==null){
                     			 $("#chargesubservice" ).val(ui.item.categorycharges); 
                     			 $("#cpoeCharges2").val(ui.item.categorycharges);
                     		}else{
                     			 $("#chargesubservice" ).val(chargesfromConf); 
                     			 $("#cpoeCharges2").val(chargesfromConf);
                     		}
                     	  }else{
                         		 	   $("#chargesubservice" ).val(ui.item.categorycharges);
                                	   $("#cpoeCharges2").val(ui.item.categorycharges); 
                         		 }
                   
                             }else{
                            	// getchargesDR(2);
                            	 var chargesfromConf= $("#chargesfromConf").val();
                            	 if(depdocdeskid==2){
                            	
                            		if(chargesfromConf==0 || chargesfromConf==null){
                            			if(parseFloat (chargesfromConf)==0.0 || parseFloat(chargesfromConf) ==0 || chargesfromConf ==null || chargesfromConf ==undefined){
                            				if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                                   			 $("#chargesubservice").val(ui.item.categorycharges);

                               			 }else{
                                   			 $("#chargesubservice").val(ui.item.configcharges);

                               			 }
                            			}
                            			$("#cpoeCharges2").val(ui.item.categorycharges);

                            		}else{
                            			     $("#chargesubservice" ).val(chargesfromConf); 
                                           	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                                			 $("#cpoeCharges2").val(ui.item.categorycharges);

                            			 }else{
                                			 $("#cpoeCharges2").val(ui.item.configcharges);

                            			 }
                            		}
                            	 }else{

                    			     $("#chargesubservice" ).val(chargesfromConf); 
                                   	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                        			 $("#cpoeCharges2").val(ui.item.categorycharges);

                    			 }else{
                        			 $("#cpoeCharges2").val(ui.item.configcharges);

                    			 }

                            	 }
                            	
                             }
                    
                   	if (Number(valsponsor) > 0) {
						
						$("#chargesubservice").val(valsponsor);
						$("#chargesfromConf").val(valsponsor);
						if (Number(yearwisecharges) > 0) {
							
							$("#defchargesfromConf").val(yearwisecharges);
						}else{
							
							$("#defchargesfromConf").val(ui.item.categorycharges);
						}
					}
					else {
						
						if (Number(yearwisecharges) > 0) {
							$("#chargesubservice" ).val(yearwisecharges);
							$("#defchargesfromConf").val(yearwisecharges);
							//$("#rateOpdSponsor2" ).val(yearwisecharges);
						}else{
							$("#chargesubservice" ).val(ui.item.categorycharges);
							$("#defchargesfromConf").val(ui.item.categorycharges);
							//$("#rateOpdSponsor2" ).val(ui.item.categorycharges);
						}
					}
					
                       
                       calculateEmerChrForDocDesskOpdServicesAdvised();
                       
						
						if($("#uId").val()==0){
							$("#allunitid").val(ui.item.categoryid);
						}
						opdServicesAdvisedSuperCategory(ui.item.categoryid);
						}
						if($("#serviceid" ).val()==11 || $("#serviceid" ).val()==13){
							//$("#cpoesndtolabdiv").show();
						}else{
							$("#cpoesndtolabdiv").hide();
						}
						
						if($("#serviceid" ).val()==12){
							$("#cpoeSendToRisdiv").show();
						}else{
							$("#cpoeSendToRisdiv").hide();
						}
						
						if($("#serviceid" ).val()==18){
							$("#cpoeSendToRaddiv").show();
						}else{
							$("#cpoeSendToRaddiv").hide();
						}
						$("#iscombination" ).val(ui.item.iscombination);
					}
				
					var iscombination = ui.item.iscombination;
					var categoryid= ui.item.categoryid;
					var isComServlastId = 0;
					if(iscombination == "Y"){
						
						isComServlastId = ui.item.categoryid;
					}
					
					if(ui.item.iscombination == "Y"){
					setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
					///}else if(isPkg == 'N'){
					}else{
						
						if(ui.item.serviceid == 11){
						
								
								getPathologyPreDetailsOnOPD(ui.item.serviceid,ui.item.categoryid);
							
							
						}else if(ui.item.serviceid == 12){ //Added Rohini Ambhore ris test 
							
							var isDuplicate = getInvstigationPreDetailsDoctordesk(ui.item.serviceid, ui.item.categoryid);
							if(isDuplicate > 0){
								alert("Test/Profile Already Added");
								clearAllFieldsOfOpd();
								return false;
							}
						}
						
						/*else{
							var isDuplicate = setCollectionCharges(ui.item.serviceid, ui.item.categoryid);
							if(isDuplicate > 0){
								alert("Test/Profile Already Added");
								clearAllFieldsOfOpd();
								return false;
							}
						}*/							
					}
					
					return false;
				},
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						result = [ {
							'categoryName' : 'NO',
							'serviceName' : 'Match',
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

function getchargesDR(hallid) {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var	departmentId =  $("#depdocdeskid").val();
	var categoryid = $("#subserviceid").val();
	var treatId=$("#tr_Id").val();
	var toDate ="";
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}
	
    var hallId=0;
	var hallSlaveId = 0;
   if (departmentId == 2){
		
	   hallId =hallid;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			$("#chargesfromConf").val(r);
			console.log(r);

		}
	});
	
}

/*function deleteLabTestServicesAdvised(labservicelist, deleteType, values, callform)*/ 
function deleteLabTestServicesAdvised(billDetId,treatmentId,deleteType){
	
	/*
	var deptId = 0;
	if (callform == "IPD") {
		deptId = 2;
	} else {
		deptId = $("#deptId").val();
	}
	var billDetailIds = labservicelist.slice(1);
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/opdServicesAdvised/cancelLabTest",
		data : {

			"billDetId" : billDetailIds,
			"cancleType" : deleteType,
			"deptId" : deptId,

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {

			if (r == "0") {
				deleteTestSmplColFlg = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				deleteTestSmplColFlg = "N";
			}
		}

	});
*/
	

	var deptId=$('#deptId').val();
	var billDId = billDetId.join(',');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelLabTest",
		data	: {
			
		  "billDetId" : billDId,
		  "cancleType" : deleteType,
		  "deptId" : deptId,
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if(r=="0")
			{
				deleteTestSmplColFlg="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				deleteTestSmplColFlg="N";
				//call for cancel service.
				//deleteservdetails();
			}
		}
		
	});

	
	
}

/*function deleteInvTestServicesAdvised(labservicelist, deleteType, values,callform) */
function deleteInvTestServicesAdvised(labservicelist,deleteType)
{
	
	/*
	deleteType = "N";
	var deptId = 0;
	if (callform == "IPD") {
		deptId = 2;
	} else {
		deptId = $("#deptId").val();
	}
	var billDetailIds = labservicelist.slice(1);
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/opdServicesAdvised/cancelInvestigationTest",
		data : {

			"billDetId" : billDetailIds,
			"cancleType" : deleteType,
			"callform" : callform,

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {

			if (r == "0") {
				risReportFlag = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				risReportFlag = "N";
			}
		}

	});
*/
	

	
	var deleteType="N";
	var callform="OPDDignoBill";
	var billDetailIds = labservicelist.join(',');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelInvestigationTest",
		data	: {
			
		  "billDetId" : billDetailIds,
		  "cancleType" : deleteType,
		  "callform" : callform,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			
			if(r=="0")
			{ 
				risReportFlag="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				risReportFlag="N";
			}
		}
		
	});


}



function getPathologyPreDetailsOnOPD(serviceId, subServiceId) {
	var sex = $('#sex').text();
	var treatmentId=$("#tr_Id").val();
	var patientId=$("#pt_Id").val();
	var gender = 0;
	if (sex == "Male") {
		gender = 1;
	} else if (sex == "Female") {
		gender = 2;
	} else {
		gender = 3;
	}
	var callfrom = "ABC";

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : {
					"patientId" : encodeURIComponent(patientId),
					"treatmentId" : encodeURIComponent(treatmentId),
					"serviceId" : encodeURIComponent(serviceId),
					"subServiceId" : encodeURIComponent(subServiceId),
					"gender" : encodeURIComponent(gender),
					"callfrom" : encodeURIComponent(callfrom)
				},
				url : "ehat/phlebotomy/getpathologypredetails",
				error : function() {
					alert('Not coneected to server: Please check connections!');
				},
				success : function(r) {

					var heightCount = 0;
					var weightCount = 0;
					var urineVolumeCount = 0;
					var lmpCount = 0;
					var inHouse = 0;
					var outHouse = 0;
					var inOutHouseCount = 0;
					var sampleIdd = 0;

					var sponsorId = $("#SponsorsourceTypeId").val();
					var chargesSlaveId = $("#chargesSlaveId").val();

					if(r.labTestList.length > 0) {

						for ( var i = 0; i < r.labTestList.length; i++) {
							// START histopath test validation
							if (r.labTestList[i].histopathLab == "Y") {
								//alert("hi");

								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									//clearAllFieldsOfOpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {

									if (sponsorId >= 1 && chargesSlaveId > 0) {
										$('#sampleType').val(r.labTestList[i].sampleId);
										$('#sampleTypeOpdSponsor').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('disabled',
										// 'disabled');
										// $('#sampleTypeOpdSponsor').attr('disabled',
										// 'disabled');
									} else {
										$('#sampleType').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('readonly',
										// 'true');
									}
									$('#histopathLab').val(r.labTestList[i].histopathLab);
									sampleIdd = r.labTestList[i].sampleId;

									var processAtOutlab = (r.labTestList[i].processAtOutlab);
									if(processAtOutlab == "Y") {
										outHouse++;
									} else {
										inHouse++;
									}
								}
								// END histopath test validation
							} else {
								// START LIS test validation
								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									//clearAllFieldsOfOpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									//Added By Badrinath
									// reset fileds
									$("#txtautoserviceName").val('');
									$("#chargesubservice").val('');
									$("#dynamicItem").html("");
									
									// end reset fields
									return false;
								} else {
									//if(r.labTestList[i].isMatch == "N") {// check
										// already
										// test
										// is
										// present
										// or
										// not

										if(sponsorId >= 1
												&& chargesSlaveId > 0) {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											$('#sampleTypeOpdSponsor').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('disabled',
											// 'disabled');
											// $('#sampleTypeOpdSponsor').attr('disabled',
											// 'disabled');
										} else {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('readonly',
											// 'true');
										}

										sampleIdd = r.labTestList[i].sampleId;

										var processAtOutlab = (r.labTestList[i].processAtOutlab);
										
										
										
										if(processAtOutlab == "Y") {
											outHouse++;
										} else {
											inHouse++;
										}

										var prerequisite = (r.labTestList[i].prerequisite);
										// if (prerequisite == "Y") {
										var height = (r.labTestList[i].height);
										var weight = (r.labTestList[i].weight);
										var urineVolume = (r.labTestList[i].urineVolume);
										var lmpVolume = (r.labTestList[i].lmpStatus);

										if (height == "Y") {
											heightCount++;
										}
										if (weight == "Y") {
											weightCount++;
										}
										if (urineVolume == "Y") {
											urineVolumeCount++;
										}
										if (lmpVolume == "Y") {
											lmpCount++;
										}
										// }

									/*}else {
										// decideDuplicateTestGiven(serviceId,subServiceId);
										alert("Test Already Present !");
										clearAllFieldsOfOpd();
										$("#perticular").focus();

										return false;
									}*/

								}
							}// END LIS test validation
						}

						// setting value of IN House Lab
						if(inHouse > 0 && outHouse > 0) {
							inOutHouseCount = 3;
						} else if (inHouse > 0) {
							inOutHouseCount = 1;
						} else if (outHouse > 0) {
							inOutHouseCount = 2;
						}
						//getBarcodeIdFromSampleWise(sampleIdd, inOutHouseCount);
						$('#inOutHouseCount').val(inOutHouseCount);// set count
																	// of In Out
																	// House

						generatePrerequisitePopup(heightCount, weightCount,
								urineVolumeCount, lmpCount);// Call For open
															// popup of
															// Prerequisite

					}else {
						alert("Test Not Available For This Gender Type OR Profile Not Configured ! !");
						clearAllFieldsOfOpd();
						heightCount = 0;
						weightCount = 0;
						urineVolumeCount = 0;
						$("#perticular").focus();
						return false;

					}
				}
			});
}

function sendToLabFromOPD(){
	var chargesSlaveId = $("#chargesSlaveId").val();
//	alert("chargesSlaveId==="+chargesSlaveId)
	if(chargesSlaveId > 0){
		
		sendToPhlebotomyFromSaveSponsor(1);
	}else{
		
		sendToPhlebotomyFromSave(1);
	}
}

function sendToRisFromOPD() {

	var r = confirm("Are you sure to Send these tests into RIS?");
	if (r == false) {
		return false;
	}
  
	var patientId = parseInt($("#patientId").text());
	if ( isNaN(patientId)) {
		patientId=0;
	}
	
	var treatmentId = parseInt($("#treatmentId").text());
	if ( isNaN(treatmentId)) {
		treatmentId=0;
	}
	
	var investigationTestUrgentFlag = 0;
	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = $("#idHiddentUrgencyStatus").val();
	}else{
			investigationTestUrgentFlag =  1;
	}

	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = 1;
	}
	var particular = new Array();
	var isCombinationFlag ='N';
	//var subSrvNBilDetIds=[]; 
	var subList 	= {	subSrvList : [] };
    $('input[name=opdBillCheckbox]:checked').each(function(){
		var bilDetId	=  parseInt($(this).val());
		if ( isNaN(bilDetId)) {
			bilDetId=0;
		}
		//getting service id 
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if ( isNaN(serviceId)) {
			serviceId=0;
		}
		
		var isCombinationFlag = $("#isCombination"+bilDetId).text().trim();
		
		/*if(serviceId == 13){
			var chargesSlaveId = $("#chargesSlaveId").val();
			if(chargesSlaveId > 0){
				
				sendToPhlebotomyFromSaveSponsor(0);
			}else{
				
				sendToPhlebotomyFromSave(0);
			}
			resetAll("general");
			return false;
		}*/
		
		/*if(serviceId != 12 || serviceId != 13){
			alert("Please select investigation Test!");
			return false;
		}*/
		//getting sub service id
		var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		if ( isNaN(subSrvid)) {
			subSrvid=0;
		}
		
		var testName	= $("#catName"+bilDetId).text();
		var totalBillAmt	= $("#char"+bilDetId).text();
		particular.push(testName);
		
		var riscount=0;
		
		if(isCombinationFlag == "Y" || (isCombinationFlag == "N" && serviceId == 12 )){
		var	departmentId =0;
			var response = getAllSubservicesUnderPackage(serviceId, subSrvid, bilDetId, departmentId);
			
			//if(departmentId == 2){}else {
				
				for(var i = 0; i < response.listOpdPackageDto.length; i++) {
					//alert('.............rrrr..lllllllll.'+response.listOpdPackageDto.length);
					 if(response.listOpdPackageDto[i].childServiceId == 12){
						
						 subList.subSrvList.push({
							bilDetId		: bilDetId,
							serviceId		: 12,
							subSrvid 		: response.listOpdPackageDto[i].childSubServiceId,
							testName		:  response.listOpdPackageDto[i].categoryName,
							totalBillAmt	: response.listOpdPackageDto[i].rate,
							doctorId	: response.listOpdPackageDto[i].docId
						});	
						
						riscount++;
					}
				}	
				//}	
		}
		
		//pusing sub service id into variable
		//subSrvNBilDetIds.push(bilDetId+"^"+subSrvid);
		subList.subSrvList.push({
			bilDetId		: bilDetId,
			serviceId		: serviceId,
			subSrvid 		: subSrvid,
			testName		: testName,
			totalBillAmt	: totalBillAmt
		});	
	});
    if(particular.length == 0){
		alert("Please select At least one investigation Test!");
		return false;
	}
    subList = JSON.stringify(subList);
    
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("invesTestFlag="+1);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/ris/sendToRis",
		error 	: function() {
					alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			if(r=="-1"){
				alert("Test has been already sent to Ris!");
			}else if(parseInt(r)>0){
					alertify.success("Tests Sent.");
			}else{
					alertify.error("Test has not been sent");
			}
			//window.location.reload(true);
			
			/*if (departmentId == 3) {
				fetchbilldetailsDigno();
			} else {*/
				fetchBillDetails();
			//}
		}
	});	
}

/************
* @author	: Vinod Udawant
* @codeFor	: To get charges configured for sponsor
 ************/
function getSponsorTestChargesOnOPD(isComServlastId,serviceid) {
	
	var chargesSlaveId = $("#chargesSlaveId").val();
	var isComServId = $("#packageID").val();
	var unitId = $("#unitId").val();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId,
			"isComServId" : isComServId,
			"isComServlastId" : isComServlastId,
			"serviceid" : serviceid,
			"unitId" : unitId,
		},
		url : "ehat/testautosuggest/getSponsorTestCharges",
		success : function(r) {
			
			r = r.lstSponsorTestChargesDto[0];
			
			$("#sponsorTestCharges").val(parseFloat(r.charges).toFixed(2));
			$("#yearWiseSponsorTestCharges").val(parseFloat(r.yearWiseCharges).toFixed(2));
		}
	});
}


function getChargesSlaveIdandSponsorId(){

	
	var treatmentId = $("#tr_Id").val();
	if (treatmentId == null || treatmentId == undefined || treatmentId == "") {
		alert("Please select patient");
		return false;
	}
	var dpid = 1;

	
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	//inputs.push('dpid=' + encodeURIComponent(dpid));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "ehat/opdhistory/getPatientInfoByTreatmentId",
				url : "ehat/opdbill/getPatientInfoByTreatmentId",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					 $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
					  $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
				}
			});

}

//added Rohini for ris test for check duplicate ris test.

function getInvstigationPreDetailsDoctordesk(serviceId, subServiceId) {
	var sex = $('#sex').text();
	sex = sex.trim();
	var patientId = $('#patientId').text();
	patientId = patientId.trim();
	var treatmentId = $('#treatmentId').text();
	treatmentId=  treatmentId.trim();
	var gender = 0;
	if (sex == "Male") {
		gender = 1;
	} else if (sex == "Female") {
		gender = 2;
	} else {
		gender = 3;
	}
	var callfrom = "RIS";

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : {
					"patientId" : encodeURIComponent(patientId),
					"treatmentId" : encodeURIComponent(treatmentId),
					"serviceId" : encodeURIComponent(serviceId),
					"subServiceId" : encodeURIComponent(subServiceId),
					"gender" : encodeURIComponent(gender),
					"callfrom" : encodeURIComponent(callfrom)
				},
				url : "ehat/phlebotomy/getInvstigationPreDetails",
				error : function() {
					alert('Not coneected to server: Please check connections!');
				},
				success : function(r) {

					var heightCount = 0;
					var weightCount = 0;
					var urineVolumeCount = 0;
					var lmpCount = 0;
					var inHouse = 0;
					var outHouse = 0;
					var inOutHouseCount = 0;
					var sampleIdd = 0;

					var sponsorId = $("#SponsorsourceTypeId").val();
					var chargesSlaveId = $("#chargesSlaveId").val();

					if(r.labTestList.length > 0) {

						for ( var i = 0; i < r.labTestList.length; i++) {
							// START histopath test validation
							if (r.labTestList[i].histopathLab == "Y") {
								//alert("hi");

								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									//clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {

									if (sponsorId >= 1 && chargesSlaveId > 0) {
										$('#sampleType').val(r.labTestList[i].sampleId);
										$('#sampleTypeOpdSponsor').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('disabled',
										// 'disabled');
										// $('#sampleTypeOpdSponsor').attr('disabled',
										// 'disabled');
									} else {
										$('#sampleType').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('readonly',
										// 'true');
									}
									$('#histopathLab').val(r.labTestList[i].histopathLab);
									sampleIdd = r.labTestList[i].sampleId;

									var processAtOutlab = (r.labTestList[i].processAtOutlab);
									if(processAtOutlab == "Y") {
										outHouse++;
									} else {
										inHouse++;
									}
								}
								// END histopath test validation
							} else {
								// START LIS test validation
								if(r.labTestList[i].callFrom == "Profile Not Configured In LIS") {
									
									alert("Profile Not Configured In LIS !");
									//clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								}
								
								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									$("#txtautoserviceName").val('');
									$("#chargesubservice").val('');
									$("#dynamicItem").html("");
									return false;
								} else {
									//if(r.labTestList[i].isMatch == "N") {// check
										// already
										// test
										// is
										// present
										// or
										// not

										if(sponsorId >= 1
												&& chargesSlaveId > 0) {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											$('#sampleTypeOpdSponsor').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('disabled',
											// 'disabled');
											// $('#sampleTypeOpdSponsor').attr('disabled',
											// 'disabled');
										} else {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('readonly',
											// 'true');
										}

										sampleIdd = r.labTestList[i].sampleId;

										var processAtOutlab = (r.labTestList[i].processAtOutlab);
										if(processAtOutlab == "Y") {
											outHouse++;
										} else {
											inHouse++;
										}

										var prerequisite = (r.labTestList[i].prerequisite);
										// if (prerequisite == "Y") {
										var height = (r.labTestList[i].height);
										var weight = (r.labTestList[i].weight);
										var urineVolume = (r.labTestList[i].urineVolume);
										var lmpVolume = (r.labTestList[i].lmpStatus);

										if (height == "Y") {
											heightCount++;
										}
										if (weight == "Y") {
											weightCount++;
										}
										if (urineVolume == "Y") {
											urineVolumeCount++;
										}
										if (lmpVolume == "Y") {
											lmpCount++;
										}
										// }

									/*}else {
										// decideDuplicateTestGiven(serviceId,subServiceId);
										alert("Test Already Present !");
										clearAllFieldsOfOpd();
										$("#perticular").focus();

										return false;
									}*/

								}
							}// END LIS test validation
						}

						// setting value of IN House Lab
						if(inHouse > 0 && outHouse > 0) {
							inOutHouseCount = 3;
						} else if (inHouse > 0) {
							inOutHouseCount = 1;
						} else if (outHouse > 0) {
							inOutHouseCount = 2;
						}
						//getBarcodeIdFromSampleWise(sampleIdd, inOutHouseCount);
						$('#inOutHouseCount').val(inOutHouseCount);// set count
																	// of In Out
																	// House

						generatePrerequisitePopup(heightCount, weightCount,
								urineVolumeCount, lmpCount);// Call For open
															// popup of
															// Prerequisite

					}else {
						alert("Test Not Available For This Gender Type OR Profile Not Configured ! !");
						clearAllFieldsOfOpd;
						heightCount = 0;
						weightCount = 0;
						urineVolumeCount = 0;
						$("#perticular").focus();
						return false;

					}
				}
			});
}