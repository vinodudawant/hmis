var docNameTemplateForOPD = "<option value='0'>-select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";

// /@author :Sagar Kadam @date: 17-Jun-2017 @reason : fetch doctors for
// registartion
function setDocNameOT() {
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
		
			ajaxResponse = r;
		
			//var doctorBean = eval('(' + ajaxResponse + ')');
			
			doctorlist(r);
			//Added By kishor 
			
 		}
	});
}

function doctorlist(response) {

	var list = "<option value='0'>--- Select----</option>";

	for ( var i = 0; i < response.length; i++) {

		list = list + '<option value="' + (response[i].doctor_ID)
				+ '">' + (response[i].doc_name) + '</option>';
	}
	// $("#e1").html(list);
	$("#doctorNameOT").html(list);
	$("#doctorNameOT").select2('val','0');
}

function fetchHeaderList() {
	$('#pleaseWait').show();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/commanadv/SubServiceListCatN",

		error : function() {
			alert('error');
		},
		success : function(response) {

			$("#hallistdiv").html(JSON.stringify(response));
			servicesHeaders(response);
			$('#pleaseWait').hide();
		}
	});
}
/*******************************************************************************
 * @author :BILAL
 * @date :31-08-2017
 * @code :for setting all services
 ******************************************************************************/
function servicesHeaders(response) {
	
	var tHead1 = ""; 
	var tHead = "<tr><th  style='width: 250px;'>Type</th>";
	for ( var i = 0; i < response.lstsubcharges.length; i++) {

		tHead = tHead + "<th  style='width: 183px;'>"
				+ response.lstsubcharges[i].categoryName
				+ "<input type='hidden' class='hallid' id='th" + (i)
				+ "' value='" + response.lstsubcharges[i].slaveId + "'>"

				+ "<input type='hidden' class='hallid' id='thselfid" + (i)
				+ "' value='" + response.lstsubcharges[i].selfId + "'>"

				+ "<input type='hidden' class='hallid' id='thisCategory" + (i)
				+ "' value='" + response.lstsubcharges[i].isCategory
				+ "'></th>";
	}
	tHead = tHead + "</tr>";
	
	for ( var k = 0; k <= 3; k++) {
		
		var chargeType = "";
		var chargeId = "";		
		
		if(k==0){
			
			chargeType = "Consultation";
			chargeId = "txtConsultCharge";
			
		}else if(k==1){
			
			chargeType = "Consultation weekend";			
			chargeId = "txtConWeekCharge";
			
		}else if(k==2){
			
			chargeType = "Follow up";
			chargeId = "txtFollowCharge";
			
		}else if(k==3){
			
			chargeType = "Follow up weekend";	
			chargeId = "txtWeekendCharge";
		}
		
		tHead1 = tHead1 + "<tr><td  style='width: 250px;'>"+chargeType+"</td>";
		
		for ( var i = 0; i < response.lstsubcharges.length; i++) {
			tHead1 = tHead1
					+ "<td  style='width: 183px;'>"
					+ "<input type='hidden' class='hallid' id='thallid"
					+ (i)
					+ "' value='"
					+ response.lstsubcharges[i].slaveId
					+ "'>"
					+ "<input  style='text-align:right;'   type='text' class='hallid' id='"+chargeId+""
					+ (i) + "' value='" + 0
					+ "' onkeypress='return validateNumbers(event)'>"
					+ "<input type='hidden' class='hallid' id='txthDrid" + (i)
					+ "' value='" + 0 + "'>" + "</td>";
		}
		tHead1 = tHead1 + "</tr>";
	}
	
	$("#serviceHeader").html(tHead);
	$("#servicesDiv").html(tHead1);
	$("#txtConsultCharge0").css("background-color", "lightblue");
	$("#txtConsultCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtConsultCharge0").css('height', '27px');
	
	$("#txtConWeekCharge0").css("background-color", "lightblue");
	$("#txtConWeekCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtConWeekCharge0").css('height', '27px');
	
	$("#txtFollowCharge0").css("background-color", "lightblue");
	$("#txtFollowCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtFollowCharge0").css('height', '27px');
	
	$("#txtWeekendCharge0").css("background-color", "lightblue");
	$("#txtWeekendCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtWeekendCharge0").css('height', '27px');
	// fetchHeaderList();
}

function setsponsor() {

	$("#divsp").css("display", "block");
	$("#divsp").animate({
		//left : '90px'
	});
	$("#btnsp").css("display", "block");
	$("#btnhall").css("display", "none");
	$("#mulDynamicItemDiv").css("display", "block");
	$("#doctorNameOT").select2('val', '0');

	fetchHeaderList();
}

function setnormal() {
	$("#divsp").animate({
		//right : '90px'
	});
	$("#divsp").css("display", "none");
	$("#btnsp").css("display", "none");
	$("#btnhall").css("display", "block");
	$("#mulDynamicItemDiv").css("display", "none");
	$("#doctorNameOT").select2('val', '0');

	fetchHeaderList();
}

function getDrhallSponsercharg(callform) {
	var Drid = $("#doctorNameOT").val();
	var Spid = 0;

	if ($("#chksp").is(":checked")) {
		// fetchHeaderList();
		fetchSuperCatogoiresSlave("listmstr_select_service");
		return false;
	}
	if (callform == "sp") {
		Spid = $("#listmstr_select_service").val();
	}
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/commanadv/getDrhallcharg",
		data : {
			"Drid" : Drid,
			"callform" : callform,
			"SpId" : Spid
		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(response) {
			sethallwiserecord(response);
		}
	});
}
function sethallwiserecord(response) {
	
	if (response.lstDocroundDetails.length > 0) {

		for ( var k = 0; k <= 3; k++) {
			
			var chargeType = "";
			var chargeId = "";		
			
			if(k==0){
				
				chargeType = "Consultation";
				chargeId = "txtConsultCharge";
				
			}else if(k==1){
				
				chargeType = "Consultation weekend";			
				chargeId = "txtConWeekCharge";
				
			}else if(k==2){
				
				chargeType = "Follow up";
				chargeId = "txtFollowCharge";
				
			}else if(k==3){
				
				chargeType = "Follow up weekend";	
				chargeId = "txtWeekendCharge";
			}
		
			var tHead1 = "<tr><td  style='width: 183px;'>"+chargeType+"</td>";
	
			for ( var i = 0; i < (response.lstDocroundDetails.length); i++) {
				tHead1 = tHead1
						+ "<td  style='width: 183px;'>"
						+ "<input type='hidden' class='hallid' id='thallid"
						+ (i)
						+ "' value='"
						+ response.lstDocroundDetails[i].hallslave_id
						+ "'>"
						+ "<input  style='text-align:right'   type='text' class='hallid' id='"+chargeId+""
						+ (i) + "' value='"
						+ response.lstDocroundDetails[i].dr_amnt
						+ "'  onkeypress='return validateNumbers(event)'>"
						+ "<input type='hidden' class='hallid' id='txthDrid" + (i)
						+ "' value='" + response.lstDocroundDetails[i].drchargesid
						+ "'>" + "</td>";
			}
		}		
		
		tHead1 = tHead1 + "</tr>";
		$("#servicesDiv").html(tHead1);
		
		$("#txtConsultCharge0").css("background-color", "lightblue");
		$("#txtConsultCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtConsultCharge0").css('height', '27px');
		
		$("#txtConWeekCharge0").css("background-color", "lightblue");
		$("#txtConWeekCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtConWeekCharge0").css('height', '27px');
		
		$("#txtFollowCharge0").css("background-color", "lightblue");
		$("#txtFollowCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtFollowCharge0").css('height', '27px');
		
		$("#txtWeekendCharge0").css("background-color", "lightblue");
		$("#txtWeekendCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtWeekendCharge0").css('height', '27px');
	} else {
		fetchHeaderList();
	}

}

function rowwisefixrate() {
	var tBodyLength = $('#servicesDiv td').length;
	var consultCharges = $("#txtConsultCharge0").val();
	var consultWeekCharges = $("#txtConWeekCharge0").val();
	var followCharges = $("#txtFollowCharge0").val();
	var weekendCharges = $("#txtWeekendCharge0").val();
	for ( var j = 1; j < tBodyLength; j++) {
		
		$("#txtConsultCharge" + j).val(consultCharges);
		$("#txtConWeekCharge" + j).val(consultWeekCharges);
		$("#txtFollowCharge" + j).val(followCharges);
		$("#txtWeekendCharge" + j).val(weekendCharges);
	}
}

function getAllChargeslot() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getSponsorList",

		success : function(response) {
			multiSelectchargesinfoot(response);
		}
	});
}

function multiSelectchargesinfoot(response) {

	var list = "<option value='0'>-SELECT-</option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}

	$("#listmstr_select_service").html(list);
	$("#listmstr_select_service").select2();

}

function fetchChargesSlaveListById(Id, masterid) {
	// var selfId = $("#" + Id ).val();
	jQuery.ajax({
		type : "POST",
		// url : "ehat/chargesSlave/getChragesSlaveById",
		url : "ehat/chargesSlave/getChragesSlaveByIddr",
		data : {
			"masterId" : parseInt(1),
			// "selfId" : parseInt(selfId)
			"selfId" : parseInt(Id)

		},
		success : function(response) {

			setsponser(response, Id, masterid);
			setConsultsponser(response, Id, masterid);
			$("#splistdiv").html(JSON.stringify(response));
			// fetchSuperCatogoiresSlave(selfId);

		}
	});
}

function setsponser(response, id, masterid) {

	var Drid = $("#doctorNameOT").val();
	if (Drid == 0) {
		alertify.error("Please Select Doctor!!!");
		return false;
	}
	// Spid = $("#listmstr_select_service").val();
	Spid = id;
	$('#pleaseWait').show();
	jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/commanadv/getDrhallcharg",
				data : {
					"Drid" : Drid,
					"callform" : "sp",
					"SpId" : Spid
				},
				timeout : 1000 * 60 * 5,
				cache : false,

				success : function(response1) {

					var ajaxResponse = $("#hallistdiv").html();
					var ajaxResponse1 = JSON.parse(ajaxResponse);
					var lengthhead = ajaxResponse1.lstsubcharges.length;
					var lengthsp = response.lstChargesSlave.length;
					var chk = 0;
					$("#lengthhead").val(lengthhead);
					$("#lengthsp").val(lengthsp);
					if (response1.lstDocroundDetails.length > 0) {
						var tHead1 = "";
						var tHead = "<tr><th  style='width: 50px;'>#</th><th  style='width: 200px;'>Sponser</th>";
						for ( var i = 0; i < ajaxResponse1.lstsubcharges.length; i++) {
							tHead = tHead
									+ "<th  style='width: 183px;'>"
									+ ajaxResponse1.lstsubcharges[i].categoryName
									+ "<input type='hidden' class='hallid' id='th"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].slaveId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thselfid"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].selfId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thisCategory"
									+ (i) + "' value='"
									+ ajaxResponse1.lstsubcharges[i].isCategory
									+ "'></th>";
						}
						tHead = tHead + "</tr>";

						$("#serviceHeader").html(tHead);
						for ( var j = 0; j < (response.lstChargesSlave.length); j++) {

							tHead1 = tHead1
									+ "<tr  style='width: 183px;'>"
									+ "<td  style='width: 50px;'>"
									+ (j + 1)
									+ "</td>"
									+ "<td  style='width: 200px;'>"
									+ "<input type='hidden' class='hallid' id='thselfId"
									+ (j)
									+ "' value='"
									+ response.lstChargesSlave[j].selfId
									+ "'>"
									+ "<input type='hidden' class='hallid' id='txthslaveId"
									+ (j) + "' value='"
									+ response.lstChargesSlave[j].slaveId
									+ "'>"
									+ response.lstChargesSlave[j].categoryName
									+ "</td>";

							breakout = "N";
							chk = 0;
							for ( var i = 0; i < (response1.lstDocroundDetails.length); i++) {

								if (response.lstChargesSlave[j].slaveId == response1.lstDocroundDetails[i].sponserslave_id) {
									if (response1.lstDocroundDetails[i].hallslave_id < 0) {
										var a = j
												+ '_'
												+ response1.lstDocroundDetails[i].hallslave_id
												+ '_'
												+ response.lstChargesSlave[j].slaveId;
										tHead1 = tHead1
												+ "<td  style='width: 183px;'>"
												+ "<input type='hidden' class='hallid' id='thallid"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].hallslave_id
												+ "'>"
												+ "<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='txthcharge"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].dr_amnt
												+ "' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"
												+ a
												+ "'\)>"
												+ "<input type='hidden' class='hallid' id='txthDrid"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].drchargesid
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdselfId"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].sponser_id
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].sponserslave_id
												+ "'>"

												+ "</td>";

									} else {
										tHead1 = tHead1
												+ "<td  style='width: 183px;'>"
												+ "<input type='hidden' class='hallid' id='thallid"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].hallslave_id
												+ "'>"
												+ "<input  style='text-align:right;'   type='text' class='hallidch' id='txthcharge"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].dr_amnt
												+ "' onkeypress='return validateNumbers(event)'  >"
												+ "<input type='hidden' class='hallid' id='txthDrid"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].drchargesid
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdselfId"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].sponser_id
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
												+ (j)
												+ ""
												+ (response1.lstDocroundDetails[i].hallslave_id)
												+ ""
												+ (response1.lstDocroundDetails[i].sponserslave_id)
												+ "' value='"
												+ response1.lstDocroundDetails[i].sponserslave_id
												+ "'>"

												+ "</td>";
									}

								} else {
									if (breakout = "N") {

										for ( var d = 0; d < (response1.lstDocroundDetails.length); d++) {
											if (response.lstChargesSlave[j].slaveId == response1.lstDocroundDetails[d].sponserslave_id) {
												breakout = "N";
												break;
											} else {
												breakout = "Y";

											}
										}
									}
									if (breakout == "Y") {
										// alert(
										// response.lstChargesSlave[j].categoryName);
										for ( var k = 0; k < ajaxResponse1.lstsubcharges.length; k++) {

											if (ajaxResponse1.lstsubcharges[k].slaveId < 0) {
												var a = j
														+ '_'
														+ ajaxResponse1.lstsubcharges[k].slaveId
														+ '_'
														+ response.lstChargesSlave[j].slaveId;
												tHead1 = tHead1
														+ "<td  style='width: 183px;'>"
														+ "<input type='hidden' class='hallid' id='thallid"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ ajaxResponse1.lstsubcharges[k].slaveId
														+ "'>"
														+ "<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='txthcharge"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ 0
														+ "' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"
														+ a
														+ "'\)>"
														+ "<input type='hidden' class='hallid' id='txthDrid"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ 0
														+ "'>"
														+ "<input type='hidden' class='hallid' id='tdselfId"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ response.lstChargesSlave[j].selfId
														+ "'>"
														+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ response.lstChargesSlave[j].slaveId
														+ "'>"

														+ "</td>";

											} else {
												// console.log(ajaxResponse1.lstsubcharges[k].slaveId
												// );
												// alert(j+ "==" +
												// response.lstChargesSlave[j].categoryName
												// );
												tHead1 = tHead1
														+ "<td  style='width: 183px;'>"
														+ "<input type='hidden' class='hallid' id='thallid"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ ajaxResponse1.lstsubcharges[k].slaveId
														+ "'>"
														+ "<input  style='text-align:right;'   type='text' class='hallidch' id='txthcharge"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ 0
														+ "' onkeypress='return validateNumbers(event)'>"
														+ "<input type='hidden' class='hallid' id='txthDrid"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ 0
														+ "'>"
														+ "<input type='hidden' class='hallid' id='tdselfId"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ response.lstChargesSlave[j].selfId
														+ "'>"
														+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
														+ (j)
														+ ""
														+ (ajaxResponse1.lstsubcharges[k].slaveId)
														+ ""
														+ response.lstChargesSlave[j].slaveId
														+ "' value='"
														+ response.lstChargesSlave[j].slaveId
														+ "'>"

														+ "</td>";
											}
										}
									}
								}
								if (breakout == "Y") {
									break;
								}
							}
							tHead1 = tHead1 + "</tr>";
						}
						$("#servicesDiv").html(tHead1);

						$("#divdrr").css('height', '-moz-available');

					} else {
						var tHead1 = "";
						var tHead = "<tr><th  style='width: 50px;'>#</th><th  style='width: 200px;'>Sponser</th>";

						for ( var i = 0; i < ajaxResponse1.lstsubcharges.length; i++) {
							tHead = tHead
									+ "<th  style='width: 183px;'>"
									+ ajaxResponse1.lstsubcharges[i].categoryName
									+ "<input type='hidden' class='hallid' id='th"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].slaveId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thselfid"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].selfId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thisCategory"
									+ (i) + "' value='"
									+ ajaxResponse1.lstsubcharges[i].isCategory
									+ "'></th>";
						}
						tHead = tHead + "</tr>";

						$("#serviceHeader").html(tHead);

						if (response.lstChargesSlave.length > 0) {
							tHead1 = "";
							var tHead2 = "";

							for ( var i = 0; i < (response.lstChargesSlave.length); i++) {

								tHead1 = tHead1
										+ "<tr  style='width: 183px;'>"
										+ "<td  style='width: 50px;'>"
										+ (i + 1)
										+ "</td>"
										+ "<td  style='width: 200px;'>"
										+ "<input type='hidden' class='hallid' id='thselfId"
										+ (i)
										+ "' value='"
										+ response.lstChargesSlave[i].selfId
										+ "'>"
										+ "<input type='hidden' class='hallid' id='txthslaveId"
										+ (i)
										+ "' value='"
										+ response.lstChargesSlave[i].slaveId
										+ "'>"
										+ response.lstChargesSlave[i].categoryName
										+ "</td>";

								for ( var j = 0; j < ajaxResponse1.lstsubcharges.length; j++) {
									if (ajaxResponse1.lstsubcharges[j].slaveId < 0) {
										var a = i
												+ '_'
												+ ajaxResponse1.lstsubcharges[j].slaveId
												+ '_'
												+ response.lstChargesSlave[i].slaveId;
										tHead1 = tHead1
												+ "<td  style='width: 183px;'>"
												+ "<input type='hidden' class='hallid' id='thallid"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ ajaxResponse1.lstsubcharges[j].slaveId
												+ "'>"
												+ "<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='txthcharge"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ 0
												+ "' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"
												+ a
												+ "'\)>"
												+ "<input type='hidden' class='hallid' id='txthDrid"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ 0
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdselfId"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ response.lstChargesSlave[i].selfId
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ response.lstChargesSlave[i].slaveId
												+ "'>"

												+ "</td>";

									} else {
										tHead1 = tHead1
												+ "<td  style='width: 183px;'>"
												+ "<input type='hidden' class='hallid' id='thallid"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ ajaxResponse1.lstsubcharges[j].slaveId
												+ "'>"
												+ "<input  style='text-align:right;'   type='text' class='hallidch' id='txthcharge"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ 0
												+ "' onkeypress='return validateNumbers(event)'>"
												+ "<input type='hidden' class='hallid' id='txthDrid"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ 0
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdselfId"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ response.lstChargesSlave[i].selfId
												+ "'>"
												+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
												+ (i)
												+ ""
												+ (ajaxResponse1.lstsubcharges[j].slaveId)
												+ ""
												+ response.lstChargesSlave[i].slaveId
												+ "' value='"
												+ response.lstChargesSlave[i].slaveId
												+ "'>"

												+ "</td>";
									}
								}
								tHead1 = tHead1 + "</tr>";
							}

							$("#servicesDiv").html(tHead1);

							$("#divdrr").css('height', '-moz-available');

						}

						/*
						 * 
						 * var tHead1 = ""; var tHead = "<tr><th  style='width: 50px;'>#</th><th  style='width: 200px;'>Sponser</th>";
						 * var ajaxResponse = $("#hallistdiv").html(); var
						 * ajaxResponse1 = JSON.parse(ajaxResponse); var
						 * lengthhead = ajaxResponse1.lstsubcharges.length; var
						 * lengthsp = response.lstChargesSlave.length;
						 * $("#lengthhead").val(lengthhead);
						 * $("#lengthsp").val(lengthsp); for(var i=0; i<ajaxResponse1.lstsubcharges.length;
						 * i++){ tHead = tHead + "<th  style='width: 183px;'>"+
						 * ajaxResponse1.lstsubcharges[i].categoryName +"<input
						 * type='hidden' class='hallid' id='th"+(i)+"' value='"
						 * +ajaxResponse1.lstsubcharges[i].slaveId+"'>"
						 *  +"<input type='hidden' class='hallid'
						 * id='thselfid"+(i)+"' value='"
						 * +ajaxResponse1.lstsubcharges[i].selfId+"'>"
						 *  +"<input type='hidden' class='hallid'
						 * id='thisCategory"+(i)+"' value='"
						 * +ajaxResponse1.lstsubcharges[i].isCategory+"'></th>" ; }
						 * tHead = tHead +"</tr>";
						 * 
						 * $("#serviceHeader").html(tHead);
						 * 
						 * 
						 * if(response.lstChargesSlave.length > 0){ tHead1 = "";
						 * var tHead2 = "";
						 * 
						 * 
						 * for(var i=0; i< (response.lstChargesSlave.length) ;
						 * i++){
						 * 
						 * tHead1 = tHead1 + "<tr  style='width: 183px;'>" + "<td  style='width: 50px;'>" +
						 * (i + 1) + "</td>" + "<td  style='width: 200px;'>" + "<input
						 * type='hidden' class='hallid' id='thselfId"+(i)+"'
						 * value='" + response.lstChargesSlave[i].selfId+"'>" + "<input
						 * type='hidden' class='hallid' id='txthslaveId"+(i)+"'
						 * value='" + response.lstChargesSlave[i].slaveId +"'>" +
						 * response.lstChargesSlave[i].codeName + "</td>";
						 * 
						 * 
						 * for(var j=0; j< ajaxResponse1.lstsubcharges.length;
						 * j++){ if(ajaxResponse1.lstsubcharges[j].slaveId < 0){
						 * var a= i +'_'+ j; tHead1 = tHead1 + "<td  style='width: 183px;'>" + "<input
						 * type='hidden' class='hallid'
						 * id='thallid"+(i)+""+(j)+"' value='"
						 * +ajaxResponse1.lstsubcharges[j].slaveId+"'>" +"<input
						 * style='text-align:right;background-color : lightblue'
						 * type='text' class='hallidch"+(i)+"'
						 * id='txthcharge"+(i)+""+(j)+"' value='" + 0 +"'
						 * onkeypress='return validateNumbers(event)'
						 * onkeyup=rowwisefixratesponser(\'"+ a + "'\)>" + "<input
						 * type='hidden' class='hallid'
						 * id='txthDrid"+(i)+""+(j)+"' value='" + 0 +"'>" + "<input
						 * type='hidden' class='hallid'
						 * id='tdselfId"+(i)+""+(j)+"' value='" +
						 * response.lstChargesSlave[i].selfId+"'>" + "<input
						 * type='hidden' class='hallid'
						 * id='tdslaveIdsp"+(i)+""+(j)+"' value='" +
						 * response.lstChargesSlave[i].slaveId +"'>"
						 *  +"</td>";
						 * 
						 * }else{ tHead1 = tHead1 + "<td  style='width: 183px;'>" + "<input
						 * type='hidden' class='hallid'
						 * id='thallid"+(i)+""+(j)+"' value='"
						 * +ajaxResponse1.lstsubcharges[j].slaveId+"'>" +"<input
						 * style='text-align:right;' type='text'
						 * class='hallidch"+(i)+"' id='txthcharge"+(i)+""+(j)+"'
						 * value='" + 0 +"' onkeypress='return
						 * validateNumbers(event)'>" + "<input type='hidden'
						 * class='hallid' id='txthDrid"+(i)+""+(j)+"' value='" +
						 * 0 +"'>" + "<input type='hidden' class='hallid'
						 * id='tdselfId"+(i)+""+(j)+"' value='" +
						 * response.lstChargesSlave[i].selfId+"'>" + "<input
						 * type='hidden' class='hallid'
						 * id='tdslaveIdsp"+(i)+""+(j)+"' value='" +
						 * response.lstChargesSlave[i].slaveId +"'>"
						 *  +"</td>"; } } tHead1 =tHead1 + "</tr>"; }
						 * 
						 * 
						 * $("#servicesDiv").html(tHead1);
						 * 
						 * $("#divdrr").css('height','-moz-available');
						 * $("#btnsp").css("display","block");
						 * $("#btnhall").css("display","none"); }
						 * 
						 */}

					$('#pleaseWait').hide();

				}
			});

}

function rowwisefixratesponser(id) {
	var ajaxResponse = $("#hallistdiv").html();
	var ajaxResponse1 = JSON.parse(ajaxResponse);
	var spid = id.split("_");
	var consultCharge = $("#txtConsultCharge" + spid[0] + spid[1] + spid[2]).val();
	var conWeekCharge = $("#txtConWeekCharge" + spid[0] + spid[1] + spid[2]).val();
	var followCharge = $("#txtFollowCharge" + spid[0] + spid[1] + spid[2]).val();
	var weekendCharge = $("#txtWeekendCharge" + spid[0] + spid[1] + spid[2]).val();

	for ( var j = 1; j < ajaxResponse1.lstsubcharges.length; j++) {

		$("#txtConsultCharge" + spid[0]+ ajaxResponse1.lstsubcharges[j].slaveId + spid[2]).val(consultCharge);
		$("#txtConWeekCharge" + spid[0]+ ajaxResponse1.lstsubcharges[j].slaveId + spid[2]).val(conWeekCharge);
		$("#txtFollowCharge" + spid[0]+ ajaxResponse1.lstsubcharges[j].slaveId + spid[2]).val(followCharge);
		$("#txtWeekendCharge" + spid[0]+ ajaxResponse1.lstsubcharges[j].slaveId + spid[2]).val(weekendCharge);
	}
}

function applytoall() {

	var rate = $("#rate").val();

	if ($("#chksp").is(":checked")) {
		var doctorNameOT = $("#doctorNameOT").val();
		if (doctorNameOT == 0) {
			alertify.error("Please Select Doctor!!");
			return false;
		}
		var sponser = $("#listmstr_select_service").val();
		if (sponser == 0) {
			alertify.error("Please Select Sponser!!");
			return false;
		}
		var tBodyLength = $("#lengthsp").val();
		var ajaxResponse = $("#hallistdiv").html();
		var ajaxResponse1 = JSON.parse(ajaxResponse);
		$('.hallidch').val(rate);

	} else {

		var doctorNameOT = $("#doctorNameOT").val();
		if (doctorNameOT == 0) {
			alertify.error("Please Select Doctor!!");
			return false;
		}

		var tBodyLength = $('#servicesDiv td').length;

		for ( var j = 0; j < tBodyLength; j++) {
				
			$("#txtConsultCharge" + j).val(rate);
			$("#txtConWeekCharge" + j).val(rate);
			$("#txtFollowCharge" + j).val(rate);
			$("#txtWeekendCharge" + j).val(rate);
		}
	}
}

function getSponsorRecords(callFrom, sourceTypeId) {
	// alert("hi sponsor...");
	var chargesMasterDto;
	if (callFrom == "sourceid") {
		// chargesMasterDto=$("#sourceType").val();
		chargesMasterDto = 1;
	} else {
		chargesMasterDto = sourceTypeId;
		// chargesMasterDto=0;
	}
	// alert(chargesMasterDto);
	jQuery.ajax({

		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {

			console.log(r);
			setTemplateForSponsorSelectList(r, callFrom);
			// $('#dynamicItem').html(" ");

			// alert(r);
			// setTempAllRecords(r);
		}
	});
}

function setTemplateForSponsorSelectList(r, callFrom) {

	var list = "<option></option>";

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		/*
		 * if(callFrom==r.lstChargesSlave[int].slaveId){
		 * $("#corporate").text(r.lstChargesSlave[int].categoryName);
		 *  }
		 */
		list = list + '<option value="' + (r.lstChargesSlave[int].slaveId)
				+ '">' + (r.lstChargesSlave[int].categoryName) + '</option>';
		// alert(r.lstChargesSlave[int].categoryName);
	}

	$("#listmstr_select_service").html(list);

}

function fetchSuperCatogoiresSlave(chargesMasterDto) {
	
	var selfId = $("#" + chargesMasterDto).val();
	chargesMasterDto = selfId;
	// if charges slave id is not equals or greter than zero
	if (chargesMasterDto == "" || chargesMasterDto == null
			|| chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	} else {
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
				// alert(response.lstChargesSlave.length);
				if (response.lstChargesSlave.length > 0) {
					var listlength = response.lstChargesSlave.length;
					if (listlength == 1) {
						fetchChargesSlaveListById(
								response.lstChargesSlave[0].slaveId,
								response.lstChargesSlave[0].slaveId);
					} else {
						var listlengthnew = listlength - 1;
						fetchChargesSlaveListById(
								response.lstChargesSlave[listlengthnew].slaveId,
								response.lstChargesSlave[1].slaveId);

					}
				}
				setDyanamicDivForList('mulDynamicItem', response);
			}
		});
	}
}

function setDyanamicDivForList(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count = i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItme'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="li' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';

		// $('#disc').val(response.lstChargesSlave[i].discount);
	}
	$('#' + setDiv).html(htm);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 07-April-2019
 * @codeFor : Save Consultation charges hall wise
 ******************************************************************************/
function saveConsultationCharges() {

	var totalcharges = parseFloat($("#rate").val());
	var Drid = $("#doctorNameOT").val();
	var drSpecialityId = $("#doctorSpeciality").val();
	var DrchargesId = 0;

	if (Drid == 0) {
		alertify.error("Please Select Doctor!!!");
		return false;
	}
	// For sponser Charges Id
	var sponserId = $("#lis0").val();// chargesId
	var sponserSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	sponserSlaveId = $("#lis" + (liSize - 1)).val();

	var DocroundDetails = {
		lstDocroundDetails : []
	};

	var tHeadLength = $('#serviceHeader th').length;
	var tBodyLength = $('#servicesDiv td').length;

	if (sponserId == "" || sponserId == null || sponserId == undefined) {
		sponserId = 0;
	}

	if (sponserSlaveId == "" || sponserSlaveId == null
			|| sponserSlaveId == undefined) {
		sponserSlaveId = 0;
	}

	for ( var j = 0; j < tHeadLength - 1; j++) {

		var HallSlaveId = $("#thallid" + j).val();
		DrchargesId = $("#txthDrid" + j).val();
		// var charges = parseFloat($("#td"+ j+"td"+HallSlaveId ).val());
		
		var consultCharges = parseFloat($("#txtConsultCharge" + j).val());
		var consultWeekendCharges = parseFloat($("#txtConWeekCharge" + j).val());
		var followupCharges = parseFloat($("#txtFollowCharge" + j).val());
		var followWeekendCharges = parseFloat($("#txtWeekendCharge" + j).val());
		/*if (charges == "" || charges == null || charges == undefined
				|| isNaN(charges)) {
			charges = 0;
		}*/

		if (HallSlaveId == "" || HallSlaveId == null
				|| HallSlaveId == undefined || isNaN(HallSlaveId)) {
			HallSlaveId = 0;
		}

		DocroundDetails.lstDocroundDetails.push({
			drchargesid : DrchargesId,
			dr_id : Drid,
			drSpecialityId : drSpecialityId,
			consultAmnt : consultCharges,
			consultWeekendAmnt : consultWeekendCharges,
			followupAmnt : followupCharges,
			followWeekendAmnt : followWeekendCharges,
			hall_id : 0,
			hallslave_id : HallSlaveId,
			sponser_id : 0,
			sponserslave_id : 0,
			drflag : "H"
		});
	}

	// Json List
	DocroundDetails = JSON.stringify(DocroundDetails);

	var inputs = [];
	inputs.push("consultationChargesDetails="
			+ encodeURIComponent(DocroundDetails));
	var str = inputs.join('&');
	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/commanadv/saveConsultationCharges",
		error : function() {
			alert('Network Error');
		},
		success : function(r) {

			alertify.success(r);
			$("#rate").val(0);
			setTimeout(function() {
				window.location.reload();
			}, 400);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 07-April-2019
 * @codeFor : Save Consultation charges hall/sponsor wise
 ******************************************************************************/
function saveConsulationChargeSponsor() {

	var totalcharges = parseFloat($("#rate").val());
	var Drid = $("#doctorNameOT").val();
	var drSpecialityId = $("#doctorSpeciality").val();
	var DrchargesId = 0;
	if (Drid == 0) {
		alertify.error("Please Select Doctor!!!");
		return false;
	}
	var sponser = $("#listmstr_select_service").val();
	if (sponser == 0) {
		alertify.error("Please Select Sponser!!!");
		return false;
	}
	// For sponser Charges Id
	var sponserId = 0;// chargesId
	var sponserSlaveId = 0;// static chargesSlaveId
	var DocroundDetails = {

		lstDocroundDetails : []
	};

	var tHeadLength = $("#lengthhead").val();
	// var tBodyLength = $("#lengthsp").val();
	var tBodyLength = $("#splistdiv").html();
	var spajaxResponse1 = JSON.parse(tBodyLength);
	var ajaxResponse = $("#hallistdiv").html();
	var ajaxResponse1 = JSON.parse(ajaxResponse);

	for ( var i = 0; i < spajaxResponse1.lstChargesSlave.length; i++) {

		for ( var j = 0; j < ajaxResponse1.lstsubcharges.length; j++) {

			
			
			var HallSlaveId = $(
					"#thallid" + i + ajaxResponse1.lstsubcharges[j].slaveId
							+ spajaxResponse1.lstChargesSlave[i].slaveId).val();
			DrchargesId = $(
					"#txthDrid" + i + ajaxResponse1.lstsubcharges[j].slaveId
							+ spajaxResponse1.lstChargesSlave[i].slaveId).val();
			sponserId = $(
					"#tdselfId" + i + ajaxResponse1.lstsubcharges[j].slaveId
							+ spajaxResponse1.lstChargesSlave[i].slaveId).val();
			sponserSlaveId = $(
					"#tdslaveIdsp" + i + ajaxResponse1.lstsubcharges[j].slaveId
							+ spajaxResponse1.lstChargesSlave[i].slaveId).val();
			// var charges = parseFloat($("#td"+ j+"td"+HallSlaveId ).val());
			//var charges = parseFloat($("#txthcharge" + i + ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val());
			
			
			var consultCharges = parseFloat($("#txtConsultCharge" + i + ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val());
			var consultWeekendCharges = parseFloat($("#txtConWeekCharge" + i + ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val());
			var followupCharges = parseFloat($("#txtFollowCharge" + i + ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val());
			var followWeekendCharges = parseFloat($("#txtWeekendCharge" + i + ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val());

			/*if (charges == "" || charges == null || charges == undefined
					|| isNaN(charges)) {
				charges = 0;
			}*/

			if (HallSlaveId == "" || HallSlaveId == null
					|| HallSlaveId == undefined || isNaN(HallSlaveId)) {
				HallSlaveId = 0;
			}

			if (sponserId == "" || sponserId == null || sponserId == undefined) {
				sponserId = 0;
			}

			if (sponserSlaveId == "" || sponserSlaveId == null
					|| sponserSlaveId == undefined) {
				sponserSlaveId = 0;
			}

			DocroundDetails.lstDocroundDetails.push({
				drchargesid : DrchargesId,
				drSpecialityId : drSpecialityId,
				dr_id : Drid,
				consultAmnt : consultCharges,
				consultWeekendAmnt : consultWeekendCharges,
				followupAmnt : followupCharges,
				followWeekendAmnt : followWeekendCharges,
				hall_id : 0,
				hallslave_id : HallSlaveId,
				sponser_id : sponserId,
				sponserslave_id : sponserSlaveId,
				drflag : "S"
			});
		}
	}

	/*
	 * if (chargesSlaveId == 0 && HallSlaveId==0 && isComServlastId==0) {
	 * alert("please select any combination or hall or sponsor to save
	 * services!"); return false; }
	 */

	// Json List
	DocroundDetails = JSON.stringify(DocroundDetails);

	var inputs = [];
	inputs.push("consultationChargesDetails="
			+ encodeURIComponent(DocroundDetails));
	var str = inputs.join('&');
	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/commanadv/saveConsultationCharges",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);

			setTimeout(function() {
				window.location.href = "ehat_consultation_master.jsp";
			}, 800);
		}
	});
}

function getConsulthallSponsercharg(callform) {

	var Drid = $("#doctorNameOT").val();
	var Spid = $("#listmstr_select_service").val();
	
	if(Drid == "" || Drid == undefined || Drid == "undefined"){
		
		Drid = 0;
	}
	
	if(Spid == "" || Spid == undefined || Spid == "undefined"){
		
		Spid = 0;
	}

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/commanadv/getConsulthallcharg",
		data : {
			"Drid" : Drid,
			"callform" : callform,
			"SpId" : Spid
		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(response) {
			sethallwiserecord(response,Spid);
		}
	});
}
function sethallwiserecord(response,Spid) {

	if (response.lstDocroundDetails.length > 0) {
		
		var tHead = "";
		var tHead1 = "";
		// ================== Set table header start ================
		
		if(Spid > 0){
			
			tHead = tHead + "<tr><th style='width: 183px;'>Type</th> <th style='width: 183px;'>Sponsor</th>";
		}else{
			
			tHead = tHead + "<tr><th style='width: 183px;'>Type</th>";
		}
		
		for ( var i = 0; i < response.lstDocroundDetails.length; i++) {

			tHead = tHead + "<th  style='width: 183px;'>"
					+ response.lstDocroundDetails[i].categoryName
					/*+ "<input type='hidden' class='hallid' id='th" + (i)
					+ "' value='" + response.lstDocroundDetails[i].slaveId + "'>"

					+ "<input type='hidden' class='hallid' id='thselfid" + (i)
					+ "' value='" + response.lstDocroundDetails[i].selfId + "'>"

					+ "<input type='hidden' class='hallid' id='thisCategory" + (i)
					+ "' value='" + response.lstDocroundDetails[i].isCategory
					+ "'></th>";*/
					+ "</th>";
		}
		tHead = tHead + "</tr>";
					
		$("#serviceHeader").html(tHead);
		// ================== Set table header end ================
		
		// ================== Set table body start ================
		for ( var k = 0; k <= 3; k++) {
			
			var chargeType = "";
			var chargeId = "";		
			var charges = 0;		
			
			if(k==0){
				
				chargeType = "Consultation";
				chargeId = "txtConsultCharge";				
				
			}else if(k==1){
				
				chargeType = "Consultation weekend";			
				chargeId = "txtConWeekCharge";				
				
			}else if(k==2){
				
				chargeType = "Follow up";
				chargeId = "txtFollowCharge";			
				
			}else if(k==3){
				
				chargeType = "Follow up weekend";	
				chargeId = "txtWeekendCharge";				
			}
		
			tHead1 = tHead1 +"<tr><td  style='width: 183px;'>"+chargeType+"</td>";
			if(Spid > 0){
				
				tHead1 = tHead1 + "<td style='width: 183px;'>"+response.lstDocroundDetails[k].sponsername+"</td>";
			}
			
			for ( var i = 0; i < (response.lstDocroundDetails.length); i++) {
				
				if(k==0){
				
					charges = response.lstDocroundDetails[i].consultAmnt;
					
				}else if(k==1){
					
					charges = response.lstDocroundDetails[i].consultWeekendAmnt;
					
				}else if(k==2){
					
					charges = response.lstDocroundDetails[i].followupAmnt;
					
				}else if(k==3){
					
					charges = response.lstDocroundDetails[i].followWeekendAmnt;
				}
				
				tHead1 = tHead1
						+ "<td  style='width: 183px;'>"
						+ "<input type='hidden' class='hallid' id='thallid"
						+ (i)
						+ "' value='"
						+ response.lstDocroundDetails[i].hallslave_id
						+ "'>"
						+ "<input  style='text-align:right'   type='text' class='hallid' id='"+chargeId+""
						+ (i) + "' value='"
						+ charges
						+ "'  onkeypress='return validateNumbers(event)'>"
						+ "<input type='hidden' class='hallid' id='txthDrid" + (i)
						+ "' value='" + response.lstDocroundDetails[i].drchargesid
						+ "'>" + "</td>";
			}
		}		
		
		tHead1 = tHead1 + "</tr>";
		$("#servicesDiv").html(tHead1);
		// ================== Set table body end ================
		
		$("#txtConsultCharge0").css("background-color", "lightblue");
		$("#txtConsultCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtConsultCharge0").css('height', '27px');
		
		$("#txtConWeekCharge0").css("background-color", "lightblue");
		$("#txtConWeekCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtConWeekCharge0").css('height', '27px');
		
		$("#txtFollowCharge0").css("background-color", "lightblue");
		$("#txtFollowCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtFollowCharge0").css('height', '27px');
		
		$("#txtWeekendCharge0").css("background-color", "lightblue");
		$("#txtWeekendCharge0").attr('onkeyup', 'rowwisefixrate()');
		$("#txtWeekendCharge0").css('height', '27px');
	} else {
		fetchHeaderList();
	}
}

function setConsultsponser(response, id, masterid) {

	var Drid = $("#doctorNameOT").val();
	if (Drid == 0) {
		alertify.error("Please Select Doctor!!!");
		return false;
	}
	// Spid = $("#listmstr_select_service").val();
	Spid = id;
	$('#pleaseWait').show();
	jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/commanadv/getConsulthallcharg",
				data : {
					"Drid" : Drid,
					"callform" : "sp",
					"SpId" : Spid
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				success : function(response1) {

					var ajaxResponse = $("#hallistdiv").html();
					var ajaxResponse1 = JSON.parse(ajaxResponse);
					var lengthhead = ajaxResponse1.lstsubcharges.length;
					var lengthsp = response.lstChargesSlave.length;
					var chk = 0;
					$("#lengthhead").val(lengthhead);
					$("#lengthsp").val(lengthsp);
					
					if (response1.lstDocroundDetails.length > 0) {
						var tHead1 = "";
						var tHead = "<tr><th  style='width: 50px;'>Type</th><th  style='width: 200px;'>Sponser</th>";
						for ( var i = 0; i < ajaxResponse1.lstsubcharges.length; i++) {
							tHead = tHead
									+ "<th  style='width: 183px;'>"
									+ ajaxResponse1.lstsubcharges[i].categoryName
									+ "<input type='hidden' class='hallid' id='th"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].slaveId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thselfid"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].selfId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thisCategory"
									+ (i) + "' value='"
									+ ajaxResponse1.lstsubcharges[i].isCategory
									+ "'></th>";
						}
						tHead = tHead + "</tr>";

						$("#serviceHeader").html(tHead);
						for ( var j = 0; j < (response.lstChargesSlave.length); j++) {

							for ( var k = 0; k <= 3; k++) {
								
								var chargeType = "";
								var chargeId = "";		
								
								if(k==0){
									
									chargeType = "Consultation";
									chargeId = "txtConsultCharge";
									
								}else if(k==1){
									
									chargeType = "Consultation weekend";			
									chargeId = "txtConWeekCharge";
									
								}else if(k==2){
									
									chargeType = "Follow up";
									chargeId = "txtFollowCharge";
									
								}else if(k==3){
									
									chargeType = "Follow up weekend";	
									chargeId = "txtWeekendCharge";
								}								
								
								tHead1 = tHead1
										+ "<tr  style='width: 183px;'>"
										+ "<td  style='width: 50px;'>"+ chargeType + "</td>"
										+ "<td  style='width: 200px;'>"
										+ "<input type='hidden' class='hallid' id='thselfId"
										+ (j)
										+ "' value='"
										+ response.lstChargesSlave[j].selfId
										+ "'>"
										+ "<input type='hidden' class='hallid' id='txthslaveId"
										+ (j) + "' value='"
										+ response.lstChargesSlave[j].slaveId
										+ "'>"
										+ response.lstChargesSlave[j].categoryName
										+ "</td>";
	
								breakout = "N";
								chk = 0;
								for ( var i = 0; i < (response1.lstDocroundDetails.length); i++) {
	
									if(k==0){
										
										charges = response1.lstDocroundDetails[i].consultAmnt;
										
									}else if(k==1){
										
										charges = response1.lstDocroundDetails[i].consultWeekendAmnt;
										
									}else if(k==2){
										
										charges = response1.lstDocroundDetails[i].followupAmnt;
										
									}else if(k==3){
										
										charges = response1.lstDocroundDetails[i].followWeekendAmnt;
									}
									
									if (response.lstChargesSlave[j].slaveId == response1.lstDocroundDetails[i].sponserslave_id) {
										if (response1.lstDocroundDetails[i].hallslave_id == 0) {
											var a = j
													+ '_'
													+ response1.lstDocroundDetails[i].hallslave_id
													+ '_'
													+ response.lstChargesSlave[j].slaveId;
											tHead1 = tHead1
													+ "<td  style='width: 183px;'>"
													+ "<input type='hidden' class='hallid' id='thallid"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].hallslave_id
													+ "'>"
													+ "<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='"+chargeId+""
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ charges
													+ "' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"
													+ a
													+ "'\)>"
													+ "<input type='hidden' class='hallid' id='txthDrid"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].drchargesid
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdselfId"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].sponser_id
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].sponserslave_id
													+ "'>"
	
													+ "</td>";
	
										} else {
											tHead1 = tHead1
													+ "<td  style='width: 183px;'>"
													+ "<input type='hidden' class='hallid' id='thallid"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].hallslave_id
													+ "'>"
													+ "<input  style='text-align:right;'   type='text' class='hallidch' id='"+chargeId+""
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ charges
													+ "' onkeypress='return validateNumbers(event)'  >"
													+ "<input type='hidden' class='hallid' id='txthDrid"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].drchargesid
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdselfId"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].sponser_id
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
													+ (j)
													+ ""
													+ (response1.lstDocroundDetails[i].hallslave_id)
													+ ""
													+ (response1.lstDocroundDetails[i].sponserslave_id)
													+ "' value='"
													+ response1.lstDocroundDetails[i].sponserslave_id
													+ "'>"
	
													+ "</td>";
										}
	
									} else {
										if (breakout = "N") {
	
											for ( var d = 0; d < (response1.lstDocroundDetails.length); d++) {
												if (response.lstChargesSlave[j].slaveId == response1.lstDocroundDetails[d].sponserslave_id) {
													breakout = "N";
													break;
												} else {
													breakout = "Y";
	
												}
											}
										}
	
										if (breakout == "Y") {
	
											for ( var k = 0; k < ajaxResponse1.lstsubcharges.length; k++) {
	
												if (ajaxResponse1.lstsubcharges[k].slaveId < 0) {
	
													var a = j
															+ '_'
															+ ajaxResponse1.lstsubcharges[k].slaveId
															+ '_'
															+ response.lstChargesSlave[j].slaveId;
													tHead1 = tHead1
															+ "<td  style='width: 183px;'>"
															+ "<input type='hidden' class='hallid' id='thallid"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ ajaxResponse1.lstsubcharges[k].slaveId
															+ "'>"
															+ "<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='txthcharge"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ 0
															+ "' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"
															+ a
															+ "'\)>"
															+ "<input type='hidden' class='hallid' id='txthDrid"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ 0
															+ "'>"
															+ "<input type='hidden' class='hallid' id='tdselfId"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ response.lstChargesSlave[j].selfId
															+ "'>"
															+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ response.lstChargesSlave[j].slaveId
															+ "'>"
	
															+ "</td>";
	
												} else {
													// console.log(ajaxResponse1.lstsubcharges[k].slaveId
													// );
													// alert(j+ "==" +
													// response.lstChargesSlave[j].categoryName
													// );
													tHead1 = tHead1
															+ "<td  style='width: 183px;'>"
															+ "<input type='hidden' class='hallid' id='thallid"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ ajaxResponse1.lstsubcharges[k].slaveId
															+ "'>"
															+ "<input  style='text-align:right;'   type='text' class='hallidch' id='txthcharge"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ 0
															+ "' onkeypress='return validateNumbers(event)'>"
															+ "<input type='hidden' class='hallid' id='txthDrid"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ 0
															+ "'>"
															+ "<input type='hidden' class='hallid' id='tdselfId"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ response.lstChargesSlave[j].selfId
															+ "'>"
															+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
															+ (j)
															+ ""
															+ (ajaxResponse1.lstsubcharges[k].slaveId)
															+ ""
															+ response.lstChargesSlave[j].slaveId
															+ "' value='"
															+ response.lstChargesSlave[j].slaveId
															+ "'>"
	
															+ "</td>";
												}
											}
										}
									}
	
									if (breakout == "Y") {
										break;
									}
								}
								tHead1 = tHead1 + "</tr>";
							}
						}
						$("#servicesDiv").html(tHead1);
						$("#divdrr").css('height', '-moz-available');

					} else {
						var tHead1 = "";
						var tHead = "<tr><th  style='width: 50px;'>Type</th><th  style='width: 200px;'>Sponser</th>";

						for ( var i = 0; i < ajaxResponse1.lstsubcharges.length; i++) {
							tHead = tHead
									+ "<th  style='width: 183px;'>"
									+ ajaxResponse1.lstsubcharges[i].categoryName
									+ "<input type='hidden' class='hallid' id='th"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].slaveId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thselfid"
									+ (i)
									+ "' value='"
									+ ajaxResponse1.lstsubcharges[i].selfId
									+ "'>"

									+ "<input type='hidden' class='hallid' id='thisCategory"
									+ (i) + "' value='"
									+ ajaxResponse1.lstsubcharges[i].isCategory
									+ "'></th>";
						}
						tHead = tHead + "</tr>";

						$("#serviceHeader").html(tHead);

						if (response.lstChargesSlave.length > 0) {
							tHead1 = "";
							var tHead2 = "";
							
							for ( var k = 0; k <= 3; k++) {
									
								var chargeType = "";
								var chargeId = "";		
								
								if(k==0){
									
									chargeType = "Consultation";
									chargeId = "txtConsultCharge";
									
								}else if(k==1){
									
									chargeType = "Consultation weekend";			
									chargeId = "txtConWeekCharge";
									
								}else if(k==2){
									
									chargeType = "Follow up";
									chargeId = "txtFollowCharge";
									
								}else if(k==3){
									
									chargeType = "Follow up weekend";	
									chargeId = "txtWeekendCharge";
								}								
	
								for ( var i = 0; i < (response.lstChargesSlave.length); i++) {
	
									tHead1 = tHead1
											+ "<tr  style='width: 183px;'>"
											+ "<td  style='width: 50px;'>"+chargeType+"</td>"
											+ "<td  style='width: 200px;'>"
											+ "<input type='hidden' class='hallid' id='thselfId"
											+ (i)
											+ "' value='"
											+ response.lstChargesSlave[i].selfId
											+ "'>"
											+ "<input type='hidden' class='hallid' id='txthslaveId"
											+ (i)
											+ "' value='"
											+ response.lstChargesSlave[i].slaveId
											+ "'>"
											+ response.lstChargesSlave[i].categoryName
											+ "</td>";
	
									for ( var j = 0; j < ajaxResponse1.lstsubcharges.length; j++) {
	
										if (ajaxResponse1.lstsubcharges[j].slaveId == 0) {
											var a = i
													+ '_'
													+ ajaxResponse1.lstsubcharges[j].slaveId
													+ '_'
													+ response.lstChargesSlave[i].slaveId;
											tHead1 = tHead1
													+ "<td  style='width: 183px;'>"
													+ "<input type='hidden' class='hallid' id='thallid"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ ajaxResponse1.lstsubcharges[j].slaveId
													+ "'>"
													+ "<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='"+chargeId+""
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ 0
													+ "' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"
													+ a
													+ "'\)>"
													+ "<input type='hidden' class='hallid' id='txthDrid"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ 0
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdselfId"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ response.lstChargesSlave[i].selfId
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ response.lstChargesSlave[i].slaveId
													+ "'>" + "</td>";
	
										} else {
											tHead1 = tHead1
													+ "<td  style='width: 183px;'>"
													+ "<input type='hidden' class='hallid' id='thallid"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ ajaxResponse1.lstsubcharges[j].slaveId
													+ "'>"
													+ "<input  style='text-align:right;'   type='text' class='hallidch' id='"+chargeId+""
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ 0
													+ "' onkeypress='return validateNumbers(event)'>"
													+ "<input type='hidden' class='hallid' id='txthDrid"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ 0
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdselfId"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ response.lstChargesSlave[i].selfId
													+ "'>"
													+ "<input type='hidden' class='hallid' id='tdslaveIdsp"
													+ (i)
													+ ""
													+ (ajaxResponse1.lstsubcharges[j].slaveId)
													+ ""
													+ response.lstChargesSlave[i].slaveId
													+ "' value='"
													+ response.lstChargesSlave[i].slaveId
													+ "'>" + "</td>";
										}
									}
									tHead1 = tHead1 + "</tr>";
								}
							}

							$("#servicesDiv").html(tHead1);
							$("#divdrr").css('height', '-moz-available');
						
						}
					}
					$('#pleaseWait').hide();
				}
			});
}

/* Doctor Departments and Specialization Code */

function fetchDoctorSpecilizationsForPatientRegistration(type) {

	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			var list = "<option value='0'>--- Select----</option>";

			for ( var i = 0; i < pobj1.liSplz.length; i++) {

				list = list + '<option value="' + (pobj1.liSplz[i].splzId)
						+ '">' + (pobj1.liSplz[i].splzNm) + '</option>';
			}

			$("#doctorSpeciality").html(list);
			$("#doctorSpeciality").select2();
		}
	});
}
