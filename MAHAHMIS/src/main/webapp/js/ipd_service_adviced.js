var cancelTestSmplColFlag = "N";
var deleteTestSmplColFlg = "N";
var risReportFlag = "N";
function setIpdServicesAdvisedTemplate(id) {
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	//Added By Annapurna
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ddInstructions").hide();
	$("#instruct").hide();
	$("#ADNOTE").hide();
	//$("#Upload_Document").hide();
	
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
			+ '<div id="divInvestigationTestName"><input type="text" onkeyup="setAllIPDServicesAdvisedAutoComplete(this.id)" style="border: 1px solid orange;" class="typeahead form-control" id="txtautoserviceName" placeholder="Test Name">'
			+ '</div></div><input type="hidden" value="0" id="charges1"> <input type="hidden" value="0" id="investigationtestId">'
			+ '<input type="hidden" value="0" id="idTestSlave"></div>'
			+ '<div style="margin-left: 75px;" class="col-sm-5-1">'
			+ '<div style="padding-top: 15px;" class="col-sm-3-1"></div>'
			+ '<div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont" style="margin-top: 10%;">Doctor</label>'
			+ '<select style="width:130px" "margin-top: 5%;"class="input-SmallText" id="doctor2"></select></div>'
			+ '</div><div class="col-sm-4-1">'
			+ '<div class="form-group col-sm-12-1" style="margin-left: 20px;">'
			+ '<label for="exampleInputEmail1" class="TextFont" style="margin-top: 15px;">Hospital</label>'
			+ '<select class="form-control input-SmallText" id="hospital2"><option selected="selected" value="0">Select</option></select>'
			+ '</div></div></div>'
			+ '<div style="margin-top:-2%" class="col-sm-2-1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label class="TextFont" style="margin-top: 15px; ">Unit</label> <select onchange="cleartexrfiled();" class="form-control input-SmallText" id="uId"></select>'
			+ '<input type="hidden" id="allunitid"></div></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-12-1" id="Investigation_row2">'
			+ '<div class="col-sm-6 select2-container select2-container-multi " style="margin-top: 2%;" >'
			+ '<ul id="dynamicItem" class="select2-choices" style="overflow-y: "></ul>'//+ '<ul id="dynamicItem" class="select2-choices" style="overflow-y: scroll;"></ul>'
			+ '<input type="hidden" id="subserviceid" value="0">'
			+ '<input type="hidden" id="iscombination" value="0">'
			+ '<input type="hidden" id="serviceid" value="0"></div>'
			+ '<div style="margin-top: 10px;padding-left:2%" class="col-sm-1-1" id="col11">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Charges </label> <input type="text" id="chargesubservice" onchange="setHiddenFieldOpdServicesAdvised(this.value),calculateEmerChrForDocDesskOpdServicesAdvised()" class="form-control input-SmallText" placeholder="Charges" readonly="readonly" style="width: 120px"><input type="hidden" value="" id="cpoeCharges2">'
			+ '</div></div><div style="margin-top: 10px;margin-left:6%" class="col-sm-2-1" id="col9">'
			+ '<div class="form-group Remove-Padding col-sm-12-1" style="margin-left: 20px;"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Instructions </label> <input type="text" id="cpoeIns" class="form-control input-SmallText" placeholder="Instructions" style="width: 150px;">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col10">'
			+ '<div class="form-group Remove-Padding col-sm-12-1" style="margin-left: 20px;"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Clinical Notes </label><input type="text" id="cpoeClinicalNotes" class="form-control input-SmallText" placeholder="Clinical Notes" style="width: 190px;">'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<input type="checkbox" id="cpoeUrgent" style="margin-top: 20px; margin-left: 60px;">'
			+ '</div>'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 20px;margin-left: -60px;"> Urgent </label>'
			

			+ '<div style="margin-top: 30px;padding-left:5px" class="col-sm-0-1" id="col11">'
			+ '<i><input type="button" style="margin-left:47%" value="Save" onclick="saveServiceAdvicedFromIPD(\'DoctorStation\')" class="btn btn-xs btn-success editUserAccess"> </i>'
			+ '</div></div>'
            + '</div>'
			/*+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<input type="checkbox" id="cpoeUrgent">'
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Urgent </label>'
			+ '</div>'*/
			
			/*+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<input type="checkbox" id="sendToRis">'
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> SendToRis</label>'
			+ '</div>'*/
			
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

	/*if (depid == 2) {
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
*/
	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			/*+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Send To Radiation </label>'
*/			+ '</div>'
			+ '</div>'

			+ '</div>'

			+ '<input type="hidden" value="insert" id="InvestigationQueryType"> <input type="hidden" value="0" id="billSlaveID"> <input type="hidden" value="0" id="investigationSlaveID">'
			+ '</div></div></div></div>'
			+ '<div style="margin-top: 28px" class="col-sm-12-1" id="row2">'
			+ '<div style="margin: 2px;" class="form-group col-md-12-1">'
			+ '<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="editCPOE_TestLabel1" onclick="editIpdServiceAdviced()">'
			+ '<i class="fa fa-edit"></i> Edit</label> <label onclick="deleteIpdServicesAdvised(\'multiple\',\'DR\')" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="muldelcp">'
			//+ '<i class="fa fa-edit"></i> Edit</label> <label id="multiple" onclick="deleteIpdServicesAdvised()" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="muldelcp">'

			+ '<i class="fa fa-trash-o"></i> Multiple Delete </label>'
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="editCPOE_TestLabel1" onclick="sendToLabFromIPD()">'
			+ '<i class="fa fa-edit"></i> Send To Lab</label>'
			
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="sendToRis" onclick="sendToRisFromIPD()">'
			+ '<i class="fa fa-edit"></i> Send To RIS</label>'
			
			+'</div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-condensed ">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th style="height: 21.5px; padding-left: 5px;" class="col-md-2-1 center"><div class="TextFont">Particulars/Details</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"style="margin-left: 51px;"><div class="TextFont"">Date</div></th>'
			+ '<th style="height: 21.5px; padding-left: 128px;" class="col-md-2-1 center"><div class="TextFont" ">Consultant Name</div></th>'
			+ '<th style="height: 21.5px; padding-right: 1px;" class="col-md-3-1 center"><div class="TextFont" >Type</div></th>'
			+ '<th style="height: 21.5px; padding-right: 29px;" class="col-md-1-1 center"><div class="TextFont">Status</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Action</div></th>'
			+ '<th style="height: 21.5px; padding-right: 31px;" class="col-md-1-1 center"><div class="TextFont">Delete</div></th>'
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
	//fetchBillDetails();
	getPatientSubServiceDetailsOnIPD();
	
	var prevtre = $('#prevtr').val();
	if(prevtre=='previousPatient'){
	    previousTreatmentDisable();
	}
}

function  setAllIPDServicesAdvisedAutoComplete(inputID){

	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	sponsorId=0;
	chargesSlaveId=0;
	if (sponsorId > 0 && chargesSlaveId > 0) {
		setAllChargesConfigOnGenBillingIPDrDskServicesAdvised(inputID);
	} else {
		var resultData = [];
		var findingName = $("#" + inputID).val();
		var unit = $("#uId").val();
		var userId = $("#userId").val();
		//var unitlist = listofunit.slice(1);
		var unitlist="";
		var depdocdeskid = $("#depdocdeskid").val();
		var querytype = "all";
		var serviceid = 0;
		var inputs = [];
		inputs.push('unitid=' + unit);
		inputs.push('userId=' + unit);
		inputs.push('categoryName=' + encodeURIComponent(findingName));
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		inputs.push('dept_id=2');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "ehat/autoallservicestest/getallservices",
			url : "ehat/ipdtestautosuggest/getTestAutosuggestion",

			success : function(r) {
				autoCompIPDServicesAdvised(r, inputID);
			}
		});
	}

	
}


function autoCompIPDServicesAdvised(response,id){

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
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							// console.log(ui);
							$("#templateWiseTestFlag").val(ui.item.templateWise);
							var categoryid = ui.item.categoryid;
							var isModify = ui.item.isModify;
							if (isModify == "N") {
								$("#rate").prop("disabled", true);
								$("#rateOpdSponsor").prop("disabled", true);
							} else {
								$("#rate").prop("disabled", false);
								$("#rateOpdSponsor").prop("disabled", false);
							}

							$('#categoryidsipd').val(categoryid);
							
							var isCombServLastId = 0;
							if(ui.item.iscombination=="Y")
								isCombServLastId = categoryid;
							
							getSponsorTestCharges(isCombServLastId,categoryid);
							var sponsorTestCharges = $("#sponsorTestCharges").val();
							var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
							

						//	$('#perticular').val(ui.item.categoryName);
							$('#txtautoserviceName').val(ui.item.categoryName);

							//$("#subservicesname").val(ui.item.categoryName);
							$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);
							var suserviceId = ui.item.categoryid;

							var rategeneralhall = sponsorTestCharges;//$("#rategeneral").val();
							if (rategeneralhall > 0) {
								//$("#rate").val(rategeneralhall);
								//$("#rate2").val(rategeneralhall);
								$("#chargesubservice").val(rategeneralhall);
							} else {

								var yearwisecharges = yearWiseSponsorTestCharges;//getyearwisecharges(suserviceId);
								if (yearwisecharges > 0) {
								//	$("#rate").val(yearwisecharges);
									//$("#rate2").val(yearwisecharges);
									$("#chargesubservice").val(yearwisecharges);
								} else {
									//$("#rate").val(ui.item.categorycharges);
									//$("#rate2").val(ui.item.categorycharges);
									getHallWiseTestCharges(isCombServLastId,categoryid);
									var hallWiseTestCharges = $("#hallWiseTestCharges").val();
									  if(hallWiseTestCharges > 0){
										  $("#chargesubservice").val(hallWiseTestCharges);
									     
									  }else{
									      $("#chargesubservice").val(ui.item.categorycharges);
									      
									  }
									
								}

								// $("#rate").val(ui.item.categorycharges);
							}
							
							// $("#concession").val(ui.item.concession);
							// $("#amount").val(ui.item.amount);
							$("#servId").val(ui.item.serviceid);
							$("#iscombinationIpd").val(ui.item.iscombination);

							// @auhtor-tk @date - 05-feb-2018 @reason open
							// doctor list after selecting service name
							//$('#doctorName').select2('open');
							
							//$('#specialityId').select2('open');
							
							
						//	calculatePerticularTotal1();
							// added by Tarique Aalam
							
							//calculateEmrCheIpd('general');

							// Sanjay Kr shah
						
							/*	if ($("#serviceid").val() == 12) {
								$("#sendToRis").prop("checked", true);
							} else {
								$("#sendToRis").prop("checked", false);
							}*/

							// For Consulting and Visiting
							
							/*if ($("#serviceid").val() == 5) {
								document.getElementById("qty").readOnly = true;
							} else {
								document.getElementById("qty").readOnly = false;
							}*/
							setServiceSuperCategoryOnIPD(ui.item.categoryid);
							
							if(ui.item.iscombination == "Y"){
								
								setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
							}else{
								
								if(ui.item.serviceid == 11){
									
									getPathologyPreDetailsOnIpd(ui.item.serviceid,ui.item.categoryid);
								}						
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
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
								// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}

/************
* @author	: Vinod Udawant
* @codeFor	: To get charges configured for sponsor
 ************/
function getHallWiseTestCharges(isComServlastId,serviceid) {
	
	var hallSlaveId = $("#hallSlaveId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var isComServId = $("#packageID").val();
	var unitId = $("#unitId").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId,
			"hallSlaveId" : hallSlaveId,
			"isComServId" : isComServId,
			"isComServlastId" : isComServlastId,
			"serviceid" : serviceid,
			"unitId" : unitId,
		},
		url : "ehat/ipdtestautosuggest/getHallWiseTestCharges",
		success : function(r) {
			
			if(r.lstSponsorTestChargesDto.length > 0){
				
				r = r.lstSponsorTestChargesDto[0];
				
				$("#hallWiseTestCharges").val(parseFloat(r.charges).toFixed(2));
				
			}
		} 
	});
}


function calculatePerticularTotal1() {
	var rate = ($("#rate").val()).trim();
	var qty = ($("#qty").val()).trim();
	var concession = ($("#concession").val()).trim();

	if (rate == "") {
		$("#rate").val(0);
	}
	if (qty == "" || qty == 0) {
		$("#qty").val(1);
		var a = rate * 1;
		setTimeout(function() {
			$("#amount").val(a);
			$("#concessionIpdPer").val(0);
			$("#concession").val(0);
			$("#coPay").val(a);
		}, 50);
	}
	if (concession == "") {
		$("#concession").val(0);
	}
	if (concession > (rate * qty)) {
		var quantity = $("#qty").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concession").val(0);
			calculatePerticularTotal1();
			return false;
		} else {
			alert("Discount Can Not Be Greater Than " + (rate * qty));
			$("#concession").val(0);
			$("#amount").val(rate * qty);
			$("#coPay").val(rate * qty);
			return false;
		}
	}
	// var amount = ((rate * qty) - concession);
	var amount = ((rate * qty));

	$("#amount").val(Math.round(amount));
	// $("#pay").val(amount);
	/*
	 * var sponsorId = $("#SponsorsourceTypeId").val(); var chargesSlaveId =
	 * $("#chargesSlaveId").val();
	 */

	/*
	 * if (sponsorId == 1 && chargesSlaveId > 0) {
	 * 
	 * $("#pay").val(amount);
	 *  } else {
	 */

	$("#coPay").val(Math.round(amount));

	/* } */
	/*
	 * var amount = $("#amount").val(); var concession = $("#concession").val();
	 * 
	 * var consAmt=((concession * 100 ) / amount);
	 * $("#concessionIpdPer").val(consAmt);
	 */

	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#pay").val()) == 0) {

		// calculatePerticularPay1();
		// calculatePerticularCoPay1();
	} /*
		 * else { //calculatePerticularCoPay1(); calculatePerticularPay1(); }
		 */
}

/************
* @author	: Vinod Udawant
* @codeFor	: To get charges configured for sponsor
 ************/
function getSponsorTestCharges(isComServlastId,serviceid) {
	
	var hallSlaveId = $("#hallSlaveId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var isComServId = $("#packageID").val();
	var unitId = $("#unitId").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId,
			"hallSlaveId" : hallSlaveId,
			"isComServId" : isComServId,
			"isComServlastId" : isComServlastId,
			"serviceid" : serviceid,
			"unitId" : unitId,
		},
		url : "ehat/ipdtestautosuggest/getSponsorTestCharges",
		success : function(r) {
	//		alert(JSON.stringify(r));
			r = r.lstSponsorTestChargesDto[0];
			
			$("#sponsorTestCharges").val(parseFloat(r.charges).toFixed(2));
			$("#yearWiseSponsorTestCharges").val(parseFloat(r.yearWiseCharges).toFixed(2));
		}
	});
}


function getPathologyPreDetailsOnIpd(serviceId, subServiceId) {
	var sex = $('#sex').text();
	var patientId = $('#patientId').text();
	var treatmentId = $('#treatmentId').text();
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
								

								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfOpd();
								//	$("#perticular").focus();
									$("#txtautoserviceName").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {

									if (sponsorId >= 1 && chargesSlaveId > 0) {
										$('#sampleType').val(r.labTestList[i].sampleId);
										$('#sampleTypeOpdSponsor').val(r.labTestList[i].sampleId);
										
									} else {
										$('#sampleType').val(r.labTestList[i].sampleId);
										
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
									clearAllFieldsOfOpd();
									//$("#perticular").focus();
									$("#txtautoserviceName").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {
									
								

										if(sponsorId >= 1
												&& chargesSlaveId > 0) {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											$('#sampleTypeOpdSponsor').val(
													r.labTestList[i].sampleId);
											
										} else {
											
											$('#sampleType').val(r.labTestList[i].sampleId);
											
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

						//generatePrerequisitePopup(heightCount, weightCount,	urineVolumeCount, lmpCount);// Call For open
															// popup of
															// Prerequisite

					}else {
						alert("Test Not Available For This Gender Type OR Profile Not Configured ! !");
						clearAllFieldsOfOpd();
						heightCount = 0;
						weightCount = 0;
						urineVolumeCount = 0;
					//	$("#perticular").focus();
						$("#txtautoserviceName").focus();
						return false;

					}
				}
			});
}


function checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId){
	var response = "";
	var inputs = [];
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateServicesFromPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function setPackageBarcodePopup(serviceId, subServiceId){
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var billDetailsId =$('#billDetailsId').val();
	var	patientId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val();
	
	var iscombination = $("#iscombination").val();

	if(iscombination == "Y"){
		var packageSampleTypeId = $("#packageDefaultSampleTypeId").val();
		if(packageSampleTypeId == 0){
			alert("Please add sample type for package.");
			closeAndResetBarcodePopup();
			return false;
		}else{
			$('#sampleType').val(packageSampleTypeId);
		}
	}
	
	$("#barcodeNo").val("NA");
	var checkDuplicate = checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	if(checkDuplicate == "Package" || checkDuplicate == "Profile"){
		var msg = "";
		if(checkDuplicate == "Package"){
			msg = "Given package is already exists.";
		}else{
			msg = "Some of the tests are already exists.";
		}
		alert(msg);

		//closeAndResetBarcodePopup();
		
		return false;
	}
	
	var inputs = [];
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getSampleWiseProfileFromPackage",
		success : function(r) {
			//resetBarcodePopup();
			//getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patienttId, treatmentId, billDetailsId);
			setTemplateForSampleWiseBarcode(r);
		}
	});
}

function setTemplateForSampleWiseBarcode(r){
	
	var htm = "";
	for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++){
		htm = htm
			+ '<tr class="">'
				+ ' <td class="col-md-1 center"><input type="hidden" id="barcodeSampleId'+(i+1)+'" value="0">'+(i+1)+'</td>'
				+ ' <td class="col-md-1 center">'+r.labSampleWiseMasterDtoList[i].samplename+'<input type="hidden" id="barcodeSampleName'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].sampleId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleTests'+i+'">'+r.labSampleWiseMasterDtoList[i].testName+'<input type="hidden" id="barcodeSampleTestsId'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].masterId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleNumber'+(i+1)+'"><input type="text" class="form-control" id="barcodeSampleNo'+(i+1)+'" onchange="barcodeValidation(this.id)" placeholder="Enter Barcode No" name="barcodeSampleNo'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].barCode+'" maxlength="14"></td>'
			+ '</tr>';
	}
	$("#sampleWiseBarcodeTableBody").append(htm);
	//$("#sampleWiseBarcode").modal('show');
}

function getIpdPatientHeaderInfoOnIPD(treatmentId){

	var unitId = $("#unitId").val();
		
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
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
				
	 			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');			
				var dd=date.split(',');
	  			//$("#dtofadmission").text(dd[0]);
	  		//	$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);
	  		//	$("#ptName").val(r.listRegTreBillDto[0].patientName);
	  		//	$("#corporate").text(r.listRegTreBillDto[0].categoryName);
	  			$("#idForDisc").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
	  			//$("#isPpn").val(r.listRegTreBillDto[0].isPpn);
	  		//	$("#numbr").val(r.listRegTreBillDto[0].numbr);
	  			
	  			if(r.listRegTreBillDto[0].isPpn == "Y"){
	  			//	$('#ppn').show();
	  			//	$("#ppnNumber").html(r.listRegTreBillDto[0].numbr);
	  			//	$('#ppnNumber').show();
	  			}
				
				var fileName=r.listRegTreBillDto[0].imageName;	
				//$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			//	$("#genInvoiceFlag").val(r.listRegTreBillDto[0].invoiceFlag);
				//$("#age").text(r.listRegTreBillDto[0].age);
			//	$("#patientName").text(r.listRegTreBillDto[0].patientName );
				$("#lblCenterPIdVal").text(r.listRegTreBillDto[0].centerPatientId);
			    $("#billNo").text(r.listRegTreBillDto[0].billId);
			    $("#billNo1").text(r.listRegTreBillDto[0].invoiceCount);
			    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			    $("#opdNo").text(r.listRegTreBillDto[0].trcount);
			  //  $("#consultingDoctorr").text(r.listRegTreBillDto[0].consultingDocName);
			   $("#drid").val(r.listRegTreBillDto[0].doctorId);
			  //  $("#pid").val(r.listRegTreBillDto[0].patientId);
			   // $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
	 		   //	$("#weight1").val(r.listRegTreBillDto[0].weight) ;
	 		   //	$("#height1").val(r.listRegTreBillDto[0].height) ;
				//$("#sex").text(r.listRegTreBillDto[0].gender);
				$("#deptId").val(r.listRegTreBillDto[0].departmentId);
				//$("#pId").val(r.listRegTreBillDto[0].patientId);
				//$("#PiD").val(r.listRegTreBillDto[0].patientId);			
				//$("#bId").val(r.listRegTreBillDto[0].billId);
				//$("#tId").val(r.listRegTreBillDto[0].treatmentId);
				//$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
				//$("#sId").val(r.listRegTreBillDto[0].serviceId);
				
				/*if(r.listRegTreBillDto[0].chargesMasterSlaveId > 0)
					$("#billCategoty").text("Sponsor");
				else
					$("#billCategoty").text("Self");*/
				
				//$("#corporate").text(r.listRegTreBillDto[0].categoryName);
	  			//$("#ipdNo").text(r.listRegTreBillDto[0].trcount);
	  			//$("#ipdNumber").val(r.listRegTreBillDto[0].trcount);
	 			//$("#doa").text(date);
	 			$("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
				$("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
				//$("#pt_Id").val(r.listRegTreBillDto[0].patientId);
				//$("#bill_Id").val(r.listRegTreBillDto[0].billId);
				//$("#refDocId").val(r.listRegTreBillDto[0].refDocId);
			//	$("#patientId").text(r.listRegTreBillDto[0].patientId);	
				//$("#consultingDoctor").text('');//r.listRegTreBillDto[0].invoiceCount			  
				$("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
			//	$("#prnId").text(r.listRegTreBillDto[0].patientId);
				//$("#preBillId").text(r.listRegTreBillDto[0].invoiceCount);			  
				//$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
				//$("#centeripdID").text(r.listRegTreBillDto[0].centerPatientId);
				$("#refDoctor").text(r.listRegTreBillDto[0].refDocName);
			 // 	$("#tFlag").val(r.listRegTreBillDto[0].tFlag);
	
			  	if(r.listRegTreBillDto[0].dischargeDate!="-" && r.listRegTreBillDto[0].dischargeDate!=null && r.listRegTreBillDto[0].dischargeDate!=""){
			  		var dischargeDate= new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
				  //	$("#dod").text((dischargeDate).split(",")[0]+", "+r.listRegTreBillDto[0].dischargeTime);
			  	}else{
			  		//$("#dod").text("-");
			  	}
			  	
			  	$("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
			 // 	$("#mrn").val(r.listRegTreBillDto[0].mrnno);
			  	$("#hallTypeId").val(r.listRegTreBillDto[0].hallTypeId);
			  	$("#hallId").val(r.listRegTreBillDto[0].hallId);
			  	$("#hallSlaveId").val(r.listRegTreBillDto[0].hallId);
			  	$("#bedId").val(r.listRegTreBillDto[0].bedId);
			  	$("#treatBedsId").val(r.listRegTreBillDto[0].treatBedsId);
			  	$("#hallName").text(r.listRegTreBillDto[0].hallName);
			  	var dod = r.listRegTreBillDto[0].dischargeDate;
			  	var tod = r.listRegTreBillDto[0].dischargeTime;
			  //	$("#dod").text(dod +" "+tod);
	 		}
 		}
	});
}




function saveServiceAdvicedFromIPD(callform){


	var chargesConf = $("#chargesfromConfIpd").val();

	var emrPer = $('#emrPer').val(); // added by Tarique Aalam
	if (emrPer == "" || emrPer == null || emrPer == undefined) {
		emrPer = 0;
	}

	// Added By BILAL For narration of receipt at the time of edit
	//var narration = $("#narration").val();
	var narration= "";
	if (narration == "narration") {
		setnarationpopupipd();
		return false;
	}
	//var narrationid = $('#narrationid').val();
	var narrationid = "";
	if (narrationid != "" || narrationid != null || narrationid != undefined) {
		//closePopupnarrationipd();
	}

	if (narrationid == "" || narrationid == null || narrationid == undefined) {
		narrationid = "-";
	}

	var drdeskflag1 = $('#drdeskflag').val();
	var update = $('#queryType').val();
	if (update == "update") {
		// alert("in 2977");
		if (drdeskflag1 == "" || drdeskflag1 == null
				|| drdeskflag1 == undefined) {
			drdeskflag1 = "-";
		}

		var drdeskflag = drdeskflag1.trim();
	}

	
	var narrationBill = $("#narrationBill").val();
	if (narrationBill == "narrationBill") {
		//setnarationpopupBill();
		//return false;
	}

	var narrationidBill = $("#narrationidBill").val();
	if (narrationidBill != "" || narrationidBill != null || narrationidBill != undefined) {
	//	closePopupnarrationBill();
	}

	if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		narrationidBill = "-";
	}

	// Added By Bilal for getting proper rates of sponsor and hall
	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	$("#sponsorid2").val(sponsorId);
	$("#chargesSlaveId2").val(chargesSlaveId);
	var serviceId = $("#serviceid").val();

	// Only for Consulting and Visiting
	if (serviceId == 5) {
		if (($("#doctorName option:selected").val()) == 0) {
			alert("Please select Doctor...!!!");
			return false;
		}

		if ($("#timeFrom2").val() == "") {
			var billDetailsId = $('#billDetailsId').val();
			if (billDetailsId == 0) {
				alert("Please select start Time...!!!");
				return false;
			}

		}
	}

	if (serviceId != 3) {

		if (sponsorId > 0 && chargesSlaveId > 0) {
			getchargesipd();
		}
	}
	if (chargesConf > 0) {
		// chargesConf =chargesConf;
	} else {
		$("#hallId").val(0);
		getchargesipd();
		chargesConf = $("#chargesfromConfIpd").val();
		if (chargesConf > 0) {
			// chargesConf =chargesConf;
		} else {
			$("#SponsorsourceTypeId").val(0);
			$("#chargesSlaveId").val(0);
			$("#hallId").val(2);
			getchargesipd();
			chargesConf = $("#chargesfromConfIpd").val();
		}
	}

	var sponsorid2 = $("#sponsorid2").val();
	var chargesSlaveId2 = $("#chargesSlaveId2").val();

	$("#hallId").val(2);
	$("#SponsorsourceTypeId").val(sponsorid2);
	$("#chargesSlaveId").val(chargesSlaveId2);
	// END By Bilal for getting proper rates of sponsor and hall
	if (callform == "general2") {
		$("#hallId").val(0);
		$("#SponsorsourceTypeId").val(0);
		$("#chargesSlaveId").val(0);
	}
	var defchargesfromConfIpd = $("#defchargesfromConfIpd").val();
	// alert(defchargesfromConfIpd);

	if (serviceId == 4) {
		alert("Can not edit Surgery Charges");
		crearAllFields()();
		return false;
	}

	
	var callfrom = $('#saveServiceCallFrom').val();
	var masterReceiptId = $('#receiptMasterId').val();

	var iscombination = $("#iscombinationIpd").val();

	var receiptOf = $("#receiptOf").val();
	

	var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

	var hallId = $('#hallId').val();

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}

	if (recSlaveIdIPD == "" || recSlaveIdIPD == null
			|| recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	}

	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (masterReceiptId == "" || masterReceiptId == null
			|| masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}

	var sndToLabFlag = $("#sndtolabflag").val().trim();
	// var sndToLabFlag ="N";


		var ot_flag = 'N';
		var queryType = $('#queryType').val();
		var billDetailsId = $('#billDetailsId').val();
		var doctorId = $("#doctor2 option:selected").val();
		
		var patienttId = $("#pId").val();
		// var doctorId =$('#doctorName').val();
		var treatmentId = $("#treatmentId").text();

		var departmentId = $("#depdocdeskid").val();

		var billId = parseInt($("#billNo").html());// $("#bNo").val();
		var sourceTypeId = $("#sourceTypeId").val();
		
		//var rate = $("#rate").val();
		var rate = $("#chargesubservice").val();
		var concession = $("#concession").val();
		var concessionPer = $("#concessionIpdPer").val();
	//	var quantity = $("#qty").val();
		var quantity =1;
		//var amount = $("#amount").val();
		var amount = $("#chargesubservice").val();

		var pay = $("#pay").val();
		var coPay = $("#coPay").val();
		var createdDateTime = $("#finalDate").val();
		
		var subServiceId = parseInt($("#subserviceid").val());

		var update = $('#queryType').val();
		if (update != "update") {
			
			//var pharmacyInvname = $("#perticular").val(); // Pooja
			var pharmacyInvname = $("#txtautoserviceName").val();
			var drdeskflag = "-";
			if (subServiceId == -1
					&& (pharmacyInvname != "" || pharmacyInvname == null
							|| pharmacyInvname == undefined
							|| pharmacyInvname == 0 || isNaN(pharmacyInvname))) {
				subServiceId = 9;
				serviceId = $("#pharmacyInvoice").val();// only for invoice
				
				//drdeskflag = $("#perticular").val();
				drdeskflag = $("#txtautoserviceName").val();

			}
		}

		if (subServiceId == -1) {
			alert("Please enter valid service Name");
			crearAllFields();
			return false;
		}

		//var ratevalidation = $('#rate').val();
		var ratevalidation = $('#chargesubservice').val();

	//	var subservicesname = $("#perticular").val();
		var subservicesname = $("#txtautoserviceName").val();
		var servicename = $("#servicename").val();
		//var perticularSName = $("#perticular").val();
		var perticularSName = $("#txtautoserviceName").val();
		

		var unitId = $("#uId").val();

		var otherAmount = 0;
		var otherCoPay = 0;
		var otherPay = 0;
		var otherRate = 0;
		var otherConcession = 0;
		
		

		if (chargesConf == -10) {
			
			otherRate = rate;
			otherAmount = (rate * quantity);
			

			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			otherCoPay = 0;

			otherPay = amount - otherconAmt;
			otherConcession = otherconAmt;
		} else {
			otherRate = chargesConf;
			otherAmount = (otherRate * quantity);
			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			// alert("In else"+otherAmount);
			otherCoPay = 0;
			otherPay = otherAmount - otherconAmt;
			otherConcession = otherconAmt;
		}

		if(sponsorId > 0){
			receiptOf="IpdSponsor";
			otherAmount=rate;
			var otherRate = rate;
			var otherPay = rate;
		}
		
		// @author bilal for IPD receipt edit
		var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

	

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		// Added by sanjay on ipd, service assign save button.send to ris
		var sendToRisIpdBill = 'N';
		if ($("#sendToRis").prop("checked") == true) {
			sendToRisIpdBill = 'Y';
			
			if (serviceId != 12) {
				alertify
						.error("Select Investigation Test or Uncheck Send To Ris");
				return false;
			}
		}
		
	/*	var sendToRisIpdBill = 'N';
		
		if(serviceId == 12){
			sendToRisIpdBill="Y"; // added for send investigation  test to RIS at the time saving automatically
		}
		*/
		var barcodeNo=0;
		var templateWiseTestFlag = $("#templateWiseTestFlag").val();
	
		var sampleTypeId  =	$("#sampleType").val();
		//var barCode  =	$('#barCode').val();
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}
		var customerType = 0; //$('#customerType').val();	
		var customerId = 0; //$('#customerId').val();	
		var businessType = 2;//$('#businessType').val();
		var prepaidReceiptId = 0;//$('#prepaidReceiptId').val();
		var collectionDate = $('#collectionDate').val();
		var collectionTime = $('#collectionTime').val();
		var regRefDocId = 0;//$('#refDocId').val();

		// Added for validate
		if(sampleTypeId <= 0 || sampleTypeId == undefined){
			//alert("Please Select Sample Type!");
			//return false;
			sampleTypeId = 0;
		}
		
		var specialityId = $('#specialityId').val();
		if(specialityId == undefined || specialityId == null){
			
			specialityId = 0;
		}
		
		var hallSlaveId = $("#hallSlaveId").val();
		//var validationResult = validateBusinessAmountLimit(amount);
		var defaultFlag = $("#defaultPkgFlag").val();
		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());
		
		var serviceDetails = {
			listBillDetailsIpd : []
		};
		serviceDetails.listBillDetailsIpd.push({

			patienttId : patienttId,
			perticularSName : perticularSName,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			concession : concession,
			concessionPer : concessionPer,
			quantity : quantity,
			amount : amount,
			pay : pay,
			coPay : coPay,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			createdDateTime : addDate,
			recSlaveIdIPD : recSlaveIdIPD,
			urgentFlag : "N",
			callfrom : callfrom,
			masterReceiptId : masterReceiptId,
			subservicesname : subservicesname,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,

			otherRate : otherRate,
			otherAmount : otherAmount,
			otherCoPay : otherCoPay,
			otherPay : otherPay,
			otherConcession : otherConcession,
			iscombination : iscombination,
			receiptOf : receiptOf,
			narration : narrationid,
			hallId : hallId,
			hallSlaveId : hallSlaveId,
			narrationidBill : narrationidBill,
			accountStatusIpd : "N",
			emrPer : emrPer,
			sendToRisIpdBill : sendToRisIpdBill,
			ot_flag : ot_flag,
			sndToLabFlag : sndToLabFlag,
			drdeskflag : drdeskflag,
			
			sampleTypeId : sampleTypeId,
			barCode : barcodeNo,
			inOutHouse : inOutHouse,
			histopathLab : histopathLab,
			businessType : businessType,
			customerId : customerId,
			customerType : customerType,
			//invoiceRemainAmount : amount,
			//prepaidReceiptId : prepaidReceiptId,
			collectionDate : collectionDate,
			collectionTime : collectionTime,
			regRefDocId : regRefDocId,
			templateWise : templateWiseTestFlag,
			ivfTreatFlag : "N",
			defaultFlag : defaultFlag
		});

		serviceDetails = JSON.stringify(serviceDetails);

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("module="+ inOutHouse);
		inputs.push("callfrom=" + callfrom);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/doctordesk/saveIpd",

					error : function() {
						alert('Network Issue!!!');
					},
					success : function(r) {

						// if (r > 0) {
						if (r == 1 && queryType == 'insert') {
							alertify.success("Service assign Successfully");
							getPatientSubServiceDetailsOnIPD();
							crearAllFields();

						} else if (r == 2 && queryType == 'update') {
							alertify.success("Service Update Successfully");
							getPatientSubServiceDetailsOnIPD();
							crearAllFields();
						} else if (r == 6) {
							alertify
									.error("Dublicate Radiation Test cannot be added");
						} else if (r == 4) {
							var r = confirm("Package is not configure for Hall. Do you want Default Package?");
							if (r == true) {
								$("#hallId").val(0);

								saveServiceToPatient('general2');

							} else {
								return false;
							}
						}else if(r == 22 || r == 33){

							
							var r = confirm("Package is not configure for Hall. Do you want Default Hall Package?");
							if (r == true) {
								$("#hallId").val(2);
								//$("#SponsorsourceTypeId").val(0);
								//$("#chargesSlaveId").val(0);
								$("#defaultPkgFlag").val(1);
								saveServiceAdvicedFromIPD('general2');
							} else {
								return false;
							}
						
						}
						var chargesSlaveId = $("#chargesSlaveId").val();	
						if(chargesSlaveId > 0){
							var hospitalName=$("#hospitalName").val();
							if(hospitalName=="vatsalya"){
								sendToPhlebotomyFromSaveSponsor(0);// send test automatically to LIS after save
							}		
						}else{
							var hospitalName=$("#hospitalName").val();
							if(hospitalName=="vatsalya"){
								sendToPhlebotomyFromSave(0);// send test automatically to LIS after save
							}
						}
						//getPatientBillAmountIpd(treatmentId);
						//calculatePerticularTotal1();
					}
				});
	
//	getSponsorSanctionAmount();
	//crearAllFields();
	// window.location.reload(true);
	// added by vinod
	//$("#perticular").removeAttr('readonly');
	//$("#pay").removeAttr('readonly');
	//$("#coPay").removeAttr('readonly');
	//$("#concession").removeAttr('readonly');
	//$("#qty").removeAttr('readonly');
	
	// added by vinod
	//resetAllIpd("general");
	
	// added by vinod
	$("#chargesfromConfIpd").val("0");
	$("#defchargesfromConfIpd").val("0");
	$("#narration").val('');
	$('#narrationid').val('');
	$('#drdeskflag').val('-');
	// $('#receiptOf').val('general');
	$("#SponsorsourceTypeId").val(sponsorid2);
	$("#chargesSlaveId").val(chargesSlaveId2);
	$("#hallId").val(2);
	//$("#divsptime").css("display", 'none');

	
}

function getchargesipd() {
	var val = 0;
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	var categoryid = $("#categoryidsipd").val();

	var hallId = 2;//$('#hallId').val();
	var hallSlaveId = $('#hallId').val();
	var treatId = $("#treatId").val();
	var toDate = $("#toDate").val();
	// alert("toDate???"+toDate);

	if (toDate == "" || toDate == null || toDate == undefined) {
		toDate = "0";
	}
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
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

	if (treatId == "" || treatId == null || treatId == undefined
			|| isNaN(treatId)) {
		treatId = 0;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	// inputs.push('toDate=' + toDate);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			val = r;
			$("#rategeneral").val(r);
			$("#chargesfromConfIpd").val(r);
			console.log(r);
		}
	});
	return val;
}


function readSampleWiseBarcodes(){
	var subList = {	labSampleWiseMasterDtoList : [] };
	var count = 0;
	var totalRow = $('#sampleWiseBarcodeTableBody tr').length;
	for(var i = 1; i <= totalRow; i++) {
		count++;
		var sampleTypeId = $("#barcodeSampleName" + count +"").val();
		var masterIds = $("#barcodeSampleTestsId" + count + "").val();
		var barcodeSampleNo = $("#barcodeSampleNo" + count + "").val();
		
		var subServiceIds = masterIds.split(",");
		
		if(subServiceIds.length > 1){
			for(var num = 0; num < subServiceIds.length; num++)
				subList.labSampleWiseMasterDtoList.push({
					subServiceId	: subServiceIds[num],
					sampleTypeId	: sampleTypeId,
					barCode       	: barcodeSampleNo
			});
		}else{
			subList.labSampleWiseMasterDtoList.push({
				subServiceId	: masterIds,
				sampleTypeId	: sampleTypeId,
				barCode       	: barcodeSampleNo
			});
		}
	}
	return subList;
}

//Get The Sub Service Details On IPD Service Adviced
function getPatientSubServiceDetailsOnIPD(){
	var t = $("#treatmentId").text();
	jQuery.ajax({
		async : false,
		type : "POST",
		
		data : {
			"treatmentId" : t,
			"serviceId" : 0
		},
		url : "ehat/opdServicesAdvised/getPatientSubServiceDetailsOnIPD",
		success : function(r) {
		
			//getSubServiceDetailsTemp1(i, r, s);
			var chargesSlaveId = $("#chargesSlaveId").val();
			if(chargesSlaveId > 0){
				setSubServiceDetailsOnIPDForSponsporPatient(r);
			}else{
			setSubServiceDetailsOnIPDForNormalPatient(r);
			}
		
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function setSubServiceDetailsOnIPDForNormalPatient(r){
	
	$("#tcpoeservices").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listSubServiceIpdDto.length > 0) {
		
		for ( var i = 0; i < r.listSubServiceIpdDto.length; i++) {
			
					if(r.listSubServiceIpdDto[i].serviceId == 11 ||  r.listSubServiceIpdDto[i].serviceId == 12 ||  r.listSubServiceIpdDto[i].serviceId == 13 ){
					var datetime12= new Date(r.listSubServiceIpdDto[i].createdDate).toLocaleDateString('en-GB');
					
					rowCount++;
					
					htm = htm
					+'<tr>'
					+ '<td class="col-md-1-1 center">'+rowCount+'</td>';
					
					// added by Badrinath on 31Jan 2023 for the IPD bill name issue
					if(r.listSubServiceIpdDto[i].sndtolabflag == 'Y' && r.listSubServiceIpdDto[i].serviceId == 11 || r.listSubServiceIpdDto[i].serviceId == 13)
						htm += '<td class="col-md-2-1 center" style="color: green"> '+r.listSubServiceIpdDto[i].categoryName+' </td>';
					else if(r.listSubServiceIpdDto[i].sndtorisflag == 'Y' && r.listSubServiceIpdDto[i].serviceId == 12 || r.listSubServiceIpdDto[i].serviceId == 13 )
						htm += '<td class="col-md-2-1 center" style="color: #00bfff"> '+r.listSubServiceIpdDto[i].categoryName+' </td>';
					else
						htm += '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].categoryName+' </td>';
					
					// ==============================================================
					
					htm += '<td class="col-md-2-1 center"> '+datetime12+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].docName+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].serviceName+' </td>'
					
					if(r.listSubServiceIpdDto[i].paidFlag =="Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: orange;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].deleteFrom =="B"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: red;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].paidFlag =="N" && r.listSubServiceIpdDto[i].test_status==6 ){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: blue;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].paidFlag =="N" && r.listSubServiceIpdDto[i].verifyFlag=="Y"  ){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: Yellow;" disabled></input></td>'
					}
					else if(r.listSubServiceIpdDto[i].paidFlag =="N"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: green;" disabled></input></td>'
					}
					var hospitalName=$("#hospitalName").val();
					if(hospitalName=="vatsalya"){
						htm = htm		+ '<td class="col-md-1-1 center">'
						+ '<input id="chkOpdBill'+r.listSubServiceIpdDto[i].billDetailsId+'" type="checkbox" checked="checked" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listSubServiceIpdDto[i].billDetailsId+'   class="billSlaveChk' 
						+ r.listSubServiceIpdDto[i].serviceId+' "></input></td>'
						
						+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" id ="p" onclick=deleteIpdServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
						
						
						
						+ '<td style="display:none;" id="barCode'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'											
						
						+	'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
						+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
						+	'<td style="display:none;" id="sampleType'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
						+	'<td style="display:none;" id="barCodeId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
						+	'<td style="display:none;" id="inOutHouse'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
						+	'<td style="display:none;" id="histopathLab'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
						+	'<td style="display:none;" id="collectionDate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
						+	'<td style="display:none;" id="collectionTime'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
						+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
						+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
						+	'<td style="display:none;" id="isCombination'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
						+	'<td style="display:none;" id="othIpdRate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].otherRate +' </td>'
						+	'<td style="display:none;" id="catName'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].categoryName +' </td>'
						+	'<td style="display:none;" id="dId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].docId+' </td>'
						+	'<td style="display:none;" id="amt'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].amount+' </td>'
						+	'<td style="display:none;" id="emrP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].emrPer+' </td>'
						+	'<td style="display:none;" id="char'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].rate).toFixed(2)+' </td>'
						+	'<td style="display:none;" id="q'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].quantity+' </td>'
						+	'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
						+	'<td style="display:none;" id="cP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].coPay).toFixed(2)+' </td>'
						+	'<td style="display:none;" id="con'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concession).toFixed(2)+' </td>'
						+	'<td style="display:none;" id="conPer'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concessionPer).toFixed(2)+' </td>'


					}else{
						htm = htm		+ '<td class="col-md-1-1 center">'
						+ '<input id="chkOpdBill'+r.listSubServiceIpdDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listSubServiceIpdDto[i].billDetailsId+'   class="billSlaveChk' 
						+ r.listSubServiceIpdDto[i].serviceId+' "></input></td>'
					
					
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" id ="p" onclick=deleteIpdServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
				
				
					
					+ '<td style="display:none;" id="barCode'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					
					/*+	'<td style="display:none;" id="barCode'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
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
					
					+	'<td style="display:none;" id="payFlag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].paidFlag+' </td>';*/
					
					+	'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
					+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
					+	'<td style="display:none;" id="sampleType'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
					+	'<td style="display:none;" id="barCodeId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="inOutHouse'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
					+	'<td style="display:none;" id="histopathLab'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
					+	'<td style="display:none;" id="collectionDate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
					+	'<td style="display:none;" id="collectionTime'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
					+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
					+	'<td style="display:none;" id="isCombination'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
					+	'<td style="display:none;" id="othIpdRate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].otherRate +' </td>'
					+	'<td style="display:none;" id="catName'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].categoryName +' </td>'
					+	'<td style="display:none;" id="dId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].docId+' </td>'
					+	'<td style="display:none;" id="amt'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].amount+' </td>'
					+	'<td style="display:none;" id="emrP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].emrPer+' </td>'
					+	'<td style="display:none;" id="char'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].rate).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="q'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].quantity+' </td>'
					+	'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
					+	'<td style="display:none;" id="cP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].coPay).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="con'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concession).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="conPer'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concessionPer).toFixed(2)+' </td>'
					}
					+ '</tr>';
				
				}
			
		}
		
		$("#tcpoeservices").html(htm);
	}

}


function setSubServiceDetailsOnIPDForSponsporPatient(r){
	
	$("#tcpoeservices").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listSubServiceIpdDto.length > 0) {
		
		for ( var i = 0; i < r.listSubServiceIpdDto.length; i++) {
			
					if(r.listSubServiceIpdDto[i].serviceId ==11 ||  r.listSubServiceIpdDto[i].serviceId ==12 ||  r.listSubServiceIpdDto[i].serviceId ==13 ){
					var datetime12= new Date(r.listSubServiceIpdDto[i].createdDate).toLocaleDateString('en-GB');
					var cghsCode = "(" + r.listSubServiceIpdDto[i].cghsCode + ")";
					if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
							|| cghsCode == "(-)" || cghsCode == "(null)") {
						cghsCode = "";
					}
					rowCount++;
					
					htm = htm
					+'<tr>'
					+ '<td class="col-md-1-1 center">'+rowCount+'</td>'
					
				//	+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].categoryName+' </td>'
					
					// added by Badrinath on 31Jan 2023 for the IPD bill name issue
					if(r.listSubServiceIpdDto[i].sndtolabflag == 'Y' && r.listSubServiceIpdDto[i].serviceId == 11 ||  r.listSubServiceIpdDto[i].serviceId == 13)
						htm += '<td class="col-md-2-1 center" style="color: green"> '+r.listSubServiceIpdDto[i].categoryName+' </td>';
					else if(r.listSubServiceIpdDto[i].sndtorisflag == 'Y' && r.listSubServiceIpdDto[i].serviceId == 12 || r.listSubServiceIpdDto[i].serviceId == 13 )
						htm += '<td class="col-md-2-1 center" style="color: #00bfff"> '+r.listSubServiceIpdDto[i].categoryName+' </td>';
					
					else
						htm += '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].categoryName+' </td>';
					
					htm +=	 '<td class="col-md-2-1 center"> '+datetime12+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].docName+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].serviceName+' </td>'
					
					if(r.listSubServiceIpdDto[i].paidFlag =="Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: orange;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].deleteFrom =="B"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: red;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].paidFlag =="N" && r.listSubServiceIpdDto[i].test_status == 6){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: blue;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].paidFlag =="N" && r.listSubServiceIpdDto[i].verifyFlag == "Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: Yellow;" disabled></input></td>'
					}
					else if(r.listSubServiceIpdDto[i].paidFlag =="N"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: green;" disabled></input></td>'
					}
				
					var hospitalName=$("#hospitalName").val();
					if(hospitalName=="vatsalya"){
					htm = htm		+ '<td class="col-md-1-1 center">'
					+ '<input id="chkOpdBill'+r.listSubServiceIpdDto[i].billDetailsId+'" type="checkbox" checked="checked" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listSubServiceIpdDto[i].billDetailsId+'   class="billSlaveChk' 
					+ r.listSubServiceIpdDto[i].serviceId+' "></input></td>'
                	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteIpdServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
				
				
					
					+ '<td style="display:none;" id="barCode'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					
					
					+'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
					+	'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
					+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
					+	'<td style="display:none;" id="sampleTypeOpdSponsorr'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
					+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="inOutHouseOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
					+	'<td style="display:none;" id="histopathLabOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
					+	'<td style="display:none;" id="collectionDateOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
					+	'<td style="display:none;" id="collectionTimeOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
					+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="isTemplateWiseTestSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
					+	'<td style="display:none;" id="isCombinationSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
					+ '<td style="display:none;" id="drdeskflagSpon'+ (r.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ r.listSubServiceIpdDto[i].drdeskflag + ' </td>'
					
					'<td id="catName'	+ (r.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ r.listSubServiceIpdDto[i].categoryName + cghsCode
					+ ' </td>'
					
					'<td id="char'	+ (r.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ (r.listSubServiceIpdDto[i].rate).toFixed(2)
					+ ' </td>';
					}
					else{
					htm = htm		+ '<td class="col-md-1-1 center">'
					+ '<input id="chkOpdBill'+r.listSubServiceIpdDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listSubServiceIpdDto[i].billDetailsId+'   class="billSlaveChk' 
					+ r.listSubServiceIpdDto[i].serviceId+' "></input></td>'
					
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteIpdServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
				
				
					
					+ '<td style="display:none;" id="barCode'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					
					/*+	'<td style="display:none;" id="barCode'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
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
					
					+	'<td style="display:none;" id="payFlag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].paidFlag+' </td>';*/
					
					/*+	'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
					+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
					+	'<td style="display:none;" id="sampleType'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
					+	'<td style="display:none;" id="barCodeId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="inOutHouse'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
					+	'<td style="display:none;" id="histopathLab'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
					+	'<td style="display:none;" id="collectionDate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
					+	'<td style="display:none;" id="collectionTime'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
					+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
					+	'<td style="display:none;" id="isCombination'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
					+	'<td style="display:none;" id="othIpdRate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].otherRate +' </td>'
					+	'<td style="display:none;" id="catName'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].categoryName +' </td>'
					+	'<td style="display:none;" id="dId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].docId+' </td>'
					+	'<td style="display:none;" id="amt'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].amount+' </td>'
					+	'<td style="display:none;" id="emrP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].emrPer+' </td>'
					+	'<td style="display:none;" id="char'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].rate).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="q'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].quantity+' </td>'
					+	'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
					+	'<td style="display:none;" id="cP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].coPay).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="con'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concession).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="conPer'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concessionPer).toFixed(2)+' </td>'*/
					+'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
					+	'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
					+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
					+	'<td style="display:none;" id="sampleTypeOpdSponsorr'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
					+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="inOutHouseOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
					+	'<td style="display:none;" id="histopathLabOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
					+	'<td style="display:none;" id="collectionDateOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
					+	'<td style="display:none;" id="collectionTimeOpdSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
					+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="isTemplateWiseTestSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
					+	'<td style="display:none;" id="isCombinationSponsor'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
					+ '<td style="display:none;" id="drdeskflagSpon'+ (r.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ r.listSubServiceIpdDto[i].drdeskflag + ' </td>'
					
					'<td id="catName'	+ (r.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ r.listSubServiceIpdDto[i].categoryName + cghsCode
					+ ' </td>'
					
					'<td id="char'	+ (r.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ (r.listSubServiceIpdDto[i].rate).toFixed(2)
					+ ' </td>';
					}
					
					+ '</tr>';
				
				}
			
		}
		
		$("#tcpoeservices").html(htm);
	}

}


function editIpdServiceAdviced(){

	var id = 0;
	var countcheckbox = 0;
	
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
		//var depid = $("#depdocdeskid").val();
			editOnClick(id);
		
	}

}



function editOnClick(billDetailsId) {

	$('#queryType').val('update');
	
	$('#billDetailsId').val(billDetailsId);
	
	//$('#perticular').val($('#catName' + billDetailsId).text());
	$('#txtautoserviceName').val($('#catName' + billDetailsId).text());

	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();

	$('#chargesfromConfIpd').val(chargesfromConf);

	var a = parseInt($('#sId' + billDetailsId).text());
	$('#servId').val(a).text();
	$("#serviceid").val(a);
	// alert(a);
	// $('#servId option:not(:selected)').prop('disabled', true);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	var d = parseInt($('#dId' + billDetailsId).text());
	//$('#doctorName').select2('val', d);
	$('#doctor2').select2('val', d);

	$('#rate').val($('#char' + billDetailsId).text());
	
	$('#chargesubservice').val($('#char' + billDetailsId).text());// set the charges
	
	
	$('#sampleType').val($('#sampleType' + billDetailsId).text());// set sample type

	$('#qty').val($('#q' + billDetailsId).text());

	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#conPer' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionIpdPer').val(0);

	$('#amount').val($('#amt' + billDetailsId).text());
	$('#amount').attr('readonly', 'true');

	// $('#pay').val($('#p' + billDetailsId).text());
	$('#pay').val(0);
	$('#coPay').val($('#cP' + billDetailsId).text());
	$('#drdeskflag').val($('#drdeskflag' + billDetailsId).text());
	var a = $('#otProcedureId' + billDetailsId).text();
	$('#otProcedureId').val(a);

	/*
	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});*/

	$("#narrationBill").val('narrationBill');

	$("#narrationBill").val('narrationBill');


	$('#rate2').val($('#char' + billDetailsId).text());

	var emrP = parseFloat($('#emrP' + billDetailsId).text());
	if (isNaN(emrP)) {
		emrP = 0;
	}

	$('#emrPer').val(emrP);
	if (emrP > 0 || emrP == 0) {
		//$("#emrChrFlag").prop("checked", true);
		//$('#emrPer').css("display", "inline");
	}
	
	fetchSuperCatForBillng(subserviceid, "general");
	setServiceSuperCategoryOnIPD(subserviceid);
}


function fetchSuperCatForBillng(serviceId, categery) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			// $("#cpoeCharges2").val(response.lstSubService[0].charges);
			// calculateEmerChrForDocDesskOpd();
			if (categery == "general") {
				$('#rate2').val(response.lstSubService[0].charges);
			} else {
				$('#rateIpdSponsor2').val(response.lstSubService[0].charges);
			}

		}
	});
}


function setNarrationBill(){

	var receiptEditSponsor  = $("#receiptOf").val(); 	
	var narrationidBill =$('#narrationidBill').val();
	
    if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		$("#narrationidBill").focus();		
		$("#narrationidBill").val("");
		//return false;
	}
    
 
    
    $("#narrationBill").val('notnarrationBill');
	if (receiptEditSponsor == "IpdSponsor") {
		
		saveServiceToSponsorPatient('saveBillOpdSponsor');
	}else{
		saveServiceToPatient('general');
	}
	
	
}


function crearAllFields()
{
	//$('#perticular').attr('readonly', 'false');
	//$('#txtautoserviceName').attr('readonly', 'false');
	$('#doctor2').select2('val', 0);
	$('#txtautoserviceName').val("");
	$("#rate").val("0");
	$("#qty").val("1");
	$("#concession").val("0");
	$("#amount").val("0");
	$("#chargesubservice").val("0");
	
	$("#pay").val("0");
	$("#coPay").val("0");
	$("#servId").val("0");
	$("#concessionIpdPer").val("0");
	$('#queryType').val("insert");
	$('#billDetailsId').val("0");
	$('#subserviceid').val("0");
	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPay").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');
	
	$("#cpoeIns").val("");
	$("#cpoeClinicalNotes").val("");
	$('#dynamicItem').html('');

	// for sponsor
	/*$('#doctorNameIpdSponsor').select2('val', 0);
	$('#perticularIpdSponsor').attr('readonly', 'false');
	$('#perticularIpdSponsor').val("");
	$("#rateIpdSponsor").val("0");
	$("#qtyIpdSponsor").val("1");
	$("#concessionIpdSponsor").val("0");
	$("#amountIpdSponsor").val("0");
	$("#payIpdSponsor").val("0");
	$("#coPayIpdSponsor").val("0");
	$("#servIdIpdSponsor").val("0");
	$("#concessionIpdSponsorPer").val(0);
	$('#queryType').val("insert");
	$('#billDetailsId').val("0");
	$('#subserviceid').val("0");
	
	$("#perticularIpdSponsor").removeAttr('readonly');
	$("#payIpdSponsor").removeAttr('readonly');
	$("#coPayIpdSponsor").removeAttr('readonly');
	$("#concessionIpdSponsorPer").removeAttr('readonly');
	$("#qtyIpdSponsor").removeAttr('readonly');
	
	$("#narrationBill").val('notnarrationBill');
	$("#narrationidBill").val('');
	//for cghs
	
	$('#perManual').val("");
	$("#packManual").val("");
	$("#rateManual").val("0");
	$("#qtyManual").val("1");
	$("#concessionManual").val("0");
	$("#amountManual").val("0");
	
	$("#packManualRemains").val("");
	$("#rateManualRemains").val("0");
	$("#qtyManualRemains").val("1");
	
	$("#SerManualRemains").val("");
	$("#amountManualRemains").val("0");
	
	$('#queryType').val("insert");
    $('#subserviceid').val("-1");
    $('#sndtolabflag').val("N");*/
}


/*function deleteIpdServicesAdvised(values, callform) {
	
	var labservicelist = [];
	var treatId = $('#treatId').val();
	var userId = $('#userId').val();
	var deleteType = "Y";
	if (values == 'multiple') {

		$.each($('#chkunserv:checked'), function() {
			labservicelist = labservicelist + "," + $(this).val();
		});
		
		 $('input[name=opdBillCheckbox]:checked').each( function(){
			//	id = $(this).val();
			// labservicelist = labservicelist + "," + $(this).val();
			 labservicelist.push(parseInt($(this).val()));
				
			});
			 

		if (labservicelist.length == 0) {

			alert("Please check  at least Service to delete");
			return false;

		}
	} else {
		//labservicelist = labservicelist + "," + values;
	//	labservicelist =  values;
		labservicelist.push(parseInt(values));

	}
	
	deleteIpdLabTestFromIpdServiceAdvice(labservicelist, treatId, deleteType);// to check pathology test sample collection

	if (deleteTestSmplColFlg == "Y") {
		alert("Test Sample are collected,You can't cancel or delete this Test.");
		return false;
	}


	deleteInvTestFromIpdServiceAdvice(labservicelist, deleteType);
	if (risReportFlag == "Y") {
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}

	var tk = labservicelist;


	var r = confirm("Are You Sure You Want To  Delete Test ?");
	if (r == true) {

		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/opdServicesAdvised/deleteIpdServicesAdvised",
			data : {
				
				"labservicelist" : encodeURIComponent(tk),
				"userId" : userId
			},
			timeout : 1000 * 60 * 5,
			cache : false,

			success : function(r) {
				
				if(r==1){
					alert("Record Deleted SuccessFully");
					getPatientSubServiceDetailsOnIPD();
					return false;
				}else{
					alert("Network issuess...");
				}
				
			}

		});
	}
}*/

function deleteIpdServicesAdvised(values, callform){
	
	var labservicelist = [];
	var treatId = $('#treatId').val();
	var userId = $('#userId').val();
	var deleteType = "Y";
	if (values == 'multiple') {

		$.each($('#chkunserv:checked'), function() {
			labservicelist = labservicelist + "," + $(this).val();
		});
		
		 $('input[name=opdBillCheckbox]:checked').each( function(){
			//	id = $(this).val();
			// labservicelist = labservicelist + "," + $(this).val();
			 labservicelist.push(parseInt($(this).val()));
				
			});
			 

		if (labservicelist.length == 0) {

			alert("Please check  at least Service to delete");
			return false;

		}
	} else {
		//labservicelist = labservicelist + "," + values;
	//	labservicelist =  values;
		labservicelist.push(parseInt(values));

	}
	
	deleteIpdLabTestFromIpdServiceAdvice(labservicelist, treatId, deleteType);// to check pathology test sample collection

	if (deleteTestSmplColFlg == "Y") {
		alert("Test Sample are collected,You can't cancel or delete this Test.");
		return false;
	}


	deleteInvTestFromIpdServiceAdvice(labservicelist, deleteType);
	if (risReportFlag == "Y") {
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}
	var inputs = [];
	//var tk = labservicelist;
	


	var r = confirm("Are You Sure You Want To  Delete Test ?");
	if (r == true) {

		inputs.push("labservicelist="+labservicelist);
		inputs.push("userId="+1);
		var str = inputs.join('&');
		jQuery.ajax({	async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/opdServicesAdvised/deleteIpdServicesAdvised",
			timeout : 1000 * 60 * 5,
			catche : false,

			success : function(r) {
				
				if(r==1){
					alert("Record Deleted SuccessFully");
					getPatientSubServiceDetailsOnIPD();
					return false;
				}else if(r==2){
					alert("Accession Done!!! Test cannot be deleted");
					getPatientSubServiceDetailsOnIPD();
					return false;
				} else {
					alert("Network issuess...");
				}
				
			}

		});
	}

}

function deleteIpdLabTestFromIpdServiceAdvice(billDetId, treatmentId, deleteType) {

	var deptId = $('#deptId').val();
	var billDId = billDetId.join(',');
//	var billDId = billDetId;
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelLabTest",
		data : {

			"billDetId" : billDId,
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
				// call for cancel service.
				// deletesIpdSrvDetails();
			}
		}

	});

}


function deleteInvTestFromIpdServiceAdvice(labservicelist, deleteType) {

	var callform = "IpdBill";
	var deleteType = "N";
	var billDetailIds = labservicelist.join(',');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelInvestigationTest",
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
}

function sendToLabFromIPD(){	
	var chargesSlaveId = $("#chargesSlaveId").val();	
	if(chargesSlaveId > 0){
	
			sendToPhlebotomyFromSaveSponsor(1);
		}		
	else{
	
			sendToPhlebotomyFromSave(1);
		
	}
}


function setServiceSuperCategoryOnIPD(serviceId) {

	jQuery.ajax({
		async : false,
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

function sendToRisFromIPD() {

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
	
	var doctorId = parseInt($("#doctor2").val());
	
	var investigationTestUrgentFlag = 0;
	if (investigationTestUrgentFlag == 0) {
		//investigationTestUrgentFlag = $("#idHiddentUrgencyStatus").val();
	}else{
			investigationTestUrgentFlag =  1;
	}

	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = 1;
	}
	var particular = new Array();
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
		
		if(serviceId != 12 && serviceId != 13){
			alert("Please select investigation Test!");
			return false;
		}
		
		
		
		
		//getting sub service id
		var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		if ( isNaN(subSrvid)) {
			subSrvid=0;
		}
		
		var testName	= $("#catName"+bilDetId).text();
		var totalBillAmt	= $("#char"+bilDetId).text();
		particular.push(testName);
		
		
		//pusing sub service id into variable
		//subSrvNBilDetIds.push(bilDetId+"^"+subSrvid);
		 if(serviceId == 12){
		subList.subSrvList.push({
			bilDetId		: bilDetId,
			serviceId		: serviceId,
			subSrvid 		: subSrvid,
			testName		: testName,
			totalBillAmt	: totalBillAmt,
			doctorId	: doctorId
		});	
		
		 }else  if(serviceId == 13){
			 var response = getAllSubservicesUnderPackage(serviceId, subSrvid, bilDetId, 2);

				
					for(var i = 0; i < response.listIpdPackageDto.length; i++) {
						if(response.listIpdPackageDto[i].childServiceId == 12){
							subList.subSrvList.push({
								bilDetId		: bilDetId,
								serviceId		: 12,
								subSrvid 		: response.listIpdPackageDto[i].childSubServiceId,
								testName		:  response.listIpdPackageDto[i].categoryName,
								totalBillAmt	: response.listIpdPackageDto[i].rate,
								doctorId	: response.listIpdPackageDto[i].docId
							});	
							
					         }
						}
					
				
			 
		 }
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
			window.location.reload(true);
		}
	});	
}

function getInvestigationTestDetails(){

	var response = getAllSubservicesUnderPackage(serviceId, subSrvid, bilDetId, departmentId);

	if(departmentId == 2){
		
		for(var i = 0; i < response.listIpdPackageDto.length; i++) {
			
			if(response.listIpdPackageDto[i].childServiceId == 12){
				
				subListRIS.subSrvList.push({
					bilDetId		: bilDetId,
					serviceId		: 12,
					subSrvid 		: response.listIpdPackageDto[i].childSubServiceId,
					testName		:  response.listIpdPackageDto[i].categoryName,
					totalBillAmt	: response.listIpdPackageDto[i].rate,
					doctorId	: response.listIpdPackageDto[i].docId
				});	
				
				
			}
		}
	}
	
}