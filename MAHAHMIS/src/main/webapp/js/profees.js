/*******************************************************************************
 * @author : Irfan Khan
 * @date : 17-Nov-2016
 * @reason : Getting next Id
 ******************************************************************************/
function getNextId(callFrom) {
	var tableName = null;
	if (callFrom == "proFees" || callFrom == "saveButton"
			|| callFrom == "cancelbutton") {
		tableName = "ehat_profees_voucher_details";
	}

	var inputs = [];
	inputs.push('action=getNextId');
	inputs.push('tableName=' + tableName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (callFrom == "proFees" || callFrom == "saveButton") {
				$("#txtVoucherNumber").val(r);
			}

		}
	});
}// function getNextId end

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 18-Nov-2016
 * @reason : Fetching Test list according to serviceType of selected doctor
 ******************************************************************************/
function proFeesFetchTestList(callFrom) {
	
	if(callFrom == "removeAll"){
		// counting is there any record to add
		var rowsTable = $('#tableTestVoucherList tr').length;
		if (rowsTable == undefined || rowsTable == 0) {
			alert("There is no record to remove from Voucher List!");
			return false;
		}else {
			$("#tableTestVoucherList").empty();
			$("#txtComponentNo").val("0");
			$("#txtAmount").val("0");
			$("#txtReduction").val("0");
			$("#txtTotalAmount").val("0");
			$("#txtTotalDiscount").val("0");
			$("#txtTotalReduction").val("0");
			$("#txtTotalMotivation").val("0");
			$("#txtTotalClinicAmount").val("0");
			$("#txtAmountPayable").val("0");
			$("#serviceFlag").val("default");
		}
	}
	var txtDoctorId = $("#txtDoctorId").val();
	var txtSelectService = $("#txtSelectService").val();

	var inputs = [];
	inputs.push('action=proFeesFetchTestList');
	inputs.push('doctorId=' + txtDoctorId);
	inputs.push('serviceType=' + txtSelectService);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					var data = eval('(' + r + ')');
					var pfhtml = '<tr>';
					var rowCount = 0;
					var idpfPaymentDetails;
					for ( var i = 0; i < data.listProFeesPaymentDetails.length; i++) {
						rowCount = i + 1;
						idpfPaymentDetails = data.listProFeesPaymentDetails[i].idpfPaymentDetails;
						pfhtml = pfhtml
								+ "<td class='col-md-1 center'>"
								+ rowCount
								+ "</td>'"
								+ "<td class='col-md-1 center'><div id='billReceiptId2"
								+ idpfPaymentDetails
								+ "'>"
								+ data.listProFeesPaymentDetails[i].billReceiptId
								+ "</div></td>"
								+ "<td class='col-md-1 center'><div id='billComponentId2"
								+ idpfPaymentDetails
								+ "'>"
								+ data.listProFeesPaymentDetails[i].billComponentId
								+ "</div></td>"
								+ "<td class='col-md-2'><div id='testName2"
								+ idpfPaymentDetails
								+ "'>"
								+ data.listProFeesPaymentDetails[i].testName
								+ "</div></td>"
								+ "<td class='col-md-1' align='center'><div id='testPaidAmount2"
								+ idpfPaymentDetails
								+ "'>"
								+ (data.listProFeesPaymentDetails[i].testPaidAmount).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='discountOnTest2"
								+ idpfPaymentDetails
								+ "'>"
								+ (data.listProFeesPaymentDetails[i].discountOnTest).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='clinicAmount2"
								+ idpfPaymentDetails
								+ "'>"
								+ (data.listProFeesPaymentDetails[i].clinicPercentInAmount).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='pfUnpaidAmount2"
								+ idpfPaymentDetails
								+ "'>"
								+ (data.listProFeesPaymentDetails[i].pfUnpaidAmount).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1'><input id='chk"
								+ idpfPaymentDetails
								+ "' type='radio' value='' name='proFeesVocharChk' onclick='sendToVoucherList("
								+ idpfPaymentDetails
								+ ","
								+ data.listProFeesPaymentDetails[i].pfUnpaidAmount
								+ ","
								+ data.listProFeesPaymentDetails[i].billComponentId
								+ ","
								+ rowCount
								+ ")' style='cursor: pointer;'></td>"
								+ "<input id='billReceiptPaidStatus"
								+ idpfPaymentDetails
								+ "' type='hidden' value='"
								+ data.listProFeesPaymentDetails[i].billReceiptPaidStatus
								+ "'>"
								+ "<input id='doctorsActualCut2"
								+ idpfPaymentDetails
								+ "' type='hidden' value='"
								+ (data.listProFeesPaymentDetails[i].doctorsActualCut).toFixed(2)
								+ "'>"
								+ "<input id='testActualRate2"
								+ idpfPaymentDetails
								+ "' type='hidden' value='"
								+ (data.listProFeesPaymentDetails[i].testActualRate).toFixed(2)
								+ "'>"
								+ "<input id='testQuantity2"
								+ idpfPaymentDetails
								+ "' type='hidden' value='"
								+ data.listProFeesPaymentDetails[i].testQuantity
								+ "'>"
								+ "<input id='pfPaidAmount2"
								+ idpfPaymentDetails
								+ "' type='hidden' value='"
								+ (data.listProFeesPaymentDetails[i].pfPaidAmount).toFixed(2)
								+ "'>"
								+ "</tr>";

					}
					$("#tableTestDash").html(pfhtml);
				}
			});
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 21-Nov-2016
 * @reason : Set compId and paid amount onClick radio button
 ******************************************************************************/
function sendToVoucherList(idpfPaymentDetails, paidamount, compid, rowCount) {
	$("#txtComponentNo").val(compid);
	$("#txtAmount").val(paidamount);
	$("#idpfPaymentDetails").val(idpfPaymentDetails);
	$("#rowCount").val(rowCount);
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 21-Nov-2016
 * @reason : Adding Row in voucher list voucher list
 ******************************************************************************/
function addRowToVoucherList() {

	// counting is there any record to add
	var rowsTableTestDash = $('#tableTestDash tr').length;
	if (rowsTableTestDash == undefined || rowsTableTestDash == 0) {
		alert("There is no record to add in Voucher List!");
		return false;
	}
	// Initializing following variables
	var idpfPaymentDetails = parseInt($("#idpfPaymentDetails").val());
	var billReceiptId = parseInt($("#billReceiptId2" + idpfPaymentDetails)
			.text());
	var billComponentId = parseInt($("#billComponentId2" + idpfPaymentDetails)
			.text());
	var testPaidAmount = parseFloat($("#testPaidAmount2" + idpfPaymentDetails)
			.text());
	var discountOnTest = parseFloat($("#discountOnTest2" + idpfPaymentDetails)
			.text());
	var pfUnpaidAmount = parseFloat($("#pfUnpaidAmount2" + idpfPaymentDetails)
			.text());
	var doctorsActualCut = parseFloat($(
			"#doctorsActualCut2" + idpfPaymentDetails).val());
	var testActualRate = parseFloat($("#testActualRate2" + idpfPaymentDetails)
			.val());
	var clinicAmount = parseFloat($("#clinicAmount2"+ idpfPaymentDetails).text());
	
	var reduction = parseFloat($("#txtReduction").val());

	var serviceType = $("#txtSelectService").val();
	var serviceFlag = $("#serviceFlag").val();
	/*
	 * for future use if need var testName =
	 * $("#testName"+idpfPaymentDetails).text(); var pfPaidAmount =
	 * $("#pfPaidAmount"+idpfPaymentDetails).text(); var billReceiptPaidStatus=
	 * $("#billReceiptPaidStatus"+idpfPaymentDetails).val(); var testQuantity =
	 * $("#testQuantity"+idpfPaymentDetails).val();
	 */

	if (isNaN(reduction) || reduction == "") {// if reduction NaN then make it
												// as zero
		reduction = 0;
	} else if (reduction < 0) {// if reduction is less then zero, make it as
								// zero
		reduction = 0;
	}

	if (reduction > pfUnpaidAmount) {// if reduction greater then profees
										// unpaid Amount
		alert("Reduction amount Should be Less Or Equal to Pro.Fees Unpaid Amount!");
		SetFocus("txtReduction");
		return false;
	}

	var proFeesPayable = pfUnpaidAmount - reduction; // motivator business
														// logic, if reduction
														// is given, then amount
														// will less from
														// profees charges
	if (proFeesPayable < 0) {// if motivator payable is less then zero then
								// it shoud be zero
		proFeesPayable = 0;
	}

	var tableTestVoucherListCount = $('#tableTestVoucherList tr').length;// voucharlist
																			// count
	var checkedOrNot = $('#chk' + idpfPaymentDetails).is(":checked"); // is
																		// check
																		// box
																		// is
																		// checked
	var isthererow = $("#isthererow" + idpfPaymentDetails).val();
	if (checkedOrNot == false) { // validating comming record is check or not
		alert("Please check any Radio Button To add in Voucher list.!");
		return flase;
	}
	if (isthererow == undefined) { // if aleardy avlaiable then not add row (if
									// udefined then insert, if given any number
									// then don't insert)
		$('#tableTestVoucherList')
				.append(
						"<tr>"
								+ "<td class='col-md-1 center'><div id='rowcount"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (tableTestVoucherListCount + 1)
								+ "</div></td>"
								+ "<td class='col-md-1 center'><div id='billComponentId"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (billComponentId)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='testActualRate"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (testActualRate.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='discountOnTest"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (discountOnTest.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='testPaidAmount"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (testPaidAmount.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='clinicAmount"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (clinicAmount.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='doctorsActualCut"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (doctorsActualCut.toFixed(2))
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='reduction"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (reduction.toFixed(2))
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='proFeesPayable"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (proFeesPayable.toFixed(2))
								+ "</div></td>"
								+ "<input id='isthererow"
								+ (idpfPaymentDetails)
								+ "' type='hidden' value='"
								+ (idpfPaymentDetails)
								+ "'>"
								+ "<input id='idpfPaymentDetails"
								+ (tableTestVoucherListCount + 1)
								+ "' type='hidden' value='"
								+ (idpfPaymentDetails)
								+ "'>"
								+ "<input id='billReceiptId"
								+ (tableTestVoucherListCount + 1)
								+ "' type='hidden' value='"
								+ (billReceiptId)
								+ "'>" + "</tr>");

		// Making check box disable which was added in voucher list
		$('#chk' + idpfPaymentDetails).prop("disabled", true);

		// getting all values
		var totalAmount = parseFloat($("#txtTotalAmount").val());
		var totalDiscount = parseFloat($("#txtTotalDiscount").val());
		var totalMotivation = parseFloat($("#txtTotalMotivation").val());
		var totalReduction = parseFloat($("#txtTotalReduction").val());
		//var tDS = parseFloat($("#txtTDS").val());
		var totalClinicAmount = parseFloat($("#txtTotalClinicAmount").val());
		var amountPayable = parseFloat($("#txtAmountPayable").val());

		// Business logic for total calculation
		totalAmount = totalAmount + testPaidAmount;
		totalDiscount = totalDiscount + discountOnTest;
		totalMotivation = totalMotivation + doctorsActualCut;
		totalReduction = totalReduction + reduction;
		amountPayable = amountPayable + proFeesPayable;
		totalClinicAmount = totalClinicAmount + clinicAmount;

		// set values in respected fields
		$("#txtTotalAmount").val(totalAmount.toFixed(2));
		$("#txtTotalDiscount").val(totalDiscount.toFixed(2));
		$("#txtTotalMotivation").val(totalMotivation.toFixed(2));
		$("#txtTotalReduction").val(totalReduction.toFixed(2));
		$("#txtAmountPayable").val(amountPayable.toFixed(2));
		$("#txtTotalClinicAmount").val(totalClinicAmount.toFixed(2));

		//if two tests with different service Type is added in voucher list then service type set as "all"
		if (serviceFlag == "default") {
			serviceFlag = serviceType;
			$("#serviceFlag").val(serviceFlag);
		} else {
			if (serviceFlag != serviceType) {
				$("#serviceFlag").val("all");
			}
		}

	} else {
		alert("Already Added..!");
		
		// Making check box disable which was alerady added in voucher list
		$('#chk' + idpfPaymentDetails).prop("disabled", true);
	}
	// clearing input text fields.
	$("#txtComponentNo").val("");
	$("#txtAmount").val("");
	$("#txtReduction").val("0");

}// end of function addRowToVoucherList();

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 21-Nov-2016
 * @reason : Reset All Feilds
 ******************************************************************************/
function proFeesResetVoucher(callFrom) {
	if (callFrom == "proFees" || callFrom == "saveButton"
			|| callFrom == "cancelbutton") {

		$("#txtVoucherNumber").val("");
		$("#txtAuthorisedBy").val("1");

		if (callFrom != "saveButton") {
			$("#byName").val("");
			$("#txtDoctorId").val("0");
		}

		$("#txtPayTo").val("");
		$("#txtSelectService").val("investigation");
		$("#txtNaration").val("");
		$("#tableTestDash").empty();
		$("#tableTestVoucherList").empty();
		$("#txtComponentNo").val("0");
		$("#txtAmount").val("0");
		$("#txtReduction").val("0");
		$("#txtTotalAmount").val("0");
		$("#txtTotalDiscount").val("0");
		$("#txtTotalReduction").val("0");
		$("#txtTotalMotivation").val("0");
		$("#txtTotalClinicAmount").val("0");
		$("#txtTDS").val("0");
		$("#txtAmountPayable").val("0");
		$("#serviceFlag").val("default");

		getNextId(callFrom);

	}// if
}// function to resetVouchar end

/*****************************************
 * @author : Irfan Khan
 * @date : 21-Nov-2016
 * @reason : Saving ProFees voucher List
 ****************************************/
function proFeesSaveVoucherList(callForm) {

	if (callForm == 'proFees') {// if call from voucher

		var byName = $("#byName").val();
		var payTo = $("#txtPayTo").val();
		var doctorId = $("#txtDoctorId").val();
		var voucherNumber = $("#txtVoucherNumber").val();
		var authorisedBy = parseInt($("#txtAuthorisedBy").val());
		var serviceFlag = $("#serviceFlag").val();
		var serviceType = serviceFlag; // $("#txtSelectService").val();
		var date = $("#assesmentDate").val();
		var totalAmount = parseFloat($("#txtTotalAmount").val());
		var totalDiscount = parseFloat($("#txtTotalDiscount").val());
		var totalMotivation = parseFloat($("#txtTotalMotivation").val());
		var totalReduction = parseFloat($("#txtTotalReduction").val());
		var totalClinicAmount = parseFloat($("#txtTotalClinicAmount").val());
		var amountPayable = parseFloat($("#txtAmountPayable").val());
		var narration = $("#txtNaration").val();
		// alert(narration);
		var voucherList = {
			listProFeesPaymentDetails : []
		};
		var vocherDetails = {
			listVoucherDetails : []
		};

		var tableTestVoucherListCount = $('#tableTestVoucherList tr').length;// voucharlist
																				// count

		if (isNaN(authorisedBy)) {
			alert("Please Select Authorised By");
			SetFocus("txtAuthorisedBy");
			return false;
		}
		if (byName == undefined || byName == "") {
			alert("Give Doctor Name!");
			SetFocus("byName");
			return false;
		}
		if (doctorId == 0 || doctorId == "0") {
			alert("Doctor Name is not Valid!");
			SetFocus("byName");
			return false;
		}
		if (payTo == undefined || payTo == "") {
			alert("Give Name for Pay To!");
			SetFocus("txtPayTo");
			return false;
		}
		if (tableTestVoucherListCount == 0) {
			alert("There no Record in Voucher List to save!");
			return false;
		}

		if (tableTestVoucherListCount != 0) { // if table count greater than
												// zero
			for ( var i = 1; i <= tableTestVoucherListCount; i++) { // fetching
																	// data
																	// inside
																	// voucher
																	// test list

				// initializing variable
				var billReceiptId = parseInt($("#billReceiptId" + i).val());
				var billComponentId = parseInt($("#billComponentId" + i).text());
				var testActualRate = parseFloat($("#testActualRate" + i).text());
				var doctorsActualCut = parseFloat($("#doctorsActualCut" + i).text());
				var testPaidAmount = parseFloat($("#testPaidAmount" + i).text());
				var discountOnTest = parseFloat($("#discountOnTest" + i).text());
				var reduction = parseFloat($("#reduction" + i).text());
				var proFeesPayable = parseFloat($("#proFeesPayable" + i).text());
				var idpfPaymentDetails = parseInt($("#idpfPaymentDetails" + i).val());
				var clinicAmount = parseFloat($("#clinicAmount" + i).text());

				// setting values to proFeesPaymentDetails.java
				voucherList.listProFeesPaymentDetails.push({
					billReceiptId : billReceiptId,
					billComponentId : billComponentId,
					testActualRate : testActualRate,
					doctorsActualCut : doctorsActualCut,
					testPaidAmount : testPaidAmount,
					discountOnTest : discountOnTest,
					reductionAmount : reduction,
					payable : proFeesPayable,
					clinicPercentInAmount : clinicAmount,
					idpfPaymentDetails : idpfPaymentDetails
				});
			}// for loop i end fetchOperation
		}// if statemt tableTestVoucherListCount != 0 end

		if (voucherList.listProFeesPaymentDetails.length < 1) {
			alert("NO Data");
			return false;
		}

		vocherDetails.listVoucherDetails.push({
			date : date,
			idpfVoucherDetails : voucherNumber,
			idAuthorisedBy : authorisedBy,
			doctorName : byName,
			doctorId : doctorId,
			payTo : payTo,
			serviceType : serviceType,
			narration : narration,
			totalAmount : totalAmount,
			totalDiscount : totalDiscount,
			totalReduction : totalReduction,
			totalMotivation : totalMotivation,
			totalClinicAmount : totalClinicAmount,
			amountPayable : amountPayable

		});

		voucherList = JSON.stringify(voucherList);
		vocherDetails = JSON.stringify(vocherDetails);

		var inputs = [];
		inputs.push('action=proFeesSaveVoucherList');
		inputs.push("voucherList=" + encodeURIComponent(voucherList));
		inputs.push("vocherDetails=" + encodeURIComponent(vocherDetails));

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				// fetching latest service heading
				proFeesFetchTestList();
				proFeesResetVoucher('saveButton');
			}
		});

	}// if callFrom ='proFees' end
}// function proFeesSaveVoucherList end

// Template for current Voucher
var Current = "Current";
var tableCurrentProFeesVoucher = 1;
var tableCurrentProFeesVoucherTemplate = "{#foreach $T.listVoucherDetails as li}{#if $T.li.status =='Y'}<tr>"
		+ "<td class='col-md-1 center'><div id='rowcount{$T.li.idpfVoucherDetails}' class='TextFont'>{tableCurrentProFeesVoucher}</div></td>"
		+ "<td class='col-md-1'> <div class='TextFont' id='idpfVoucherDetails{$T.li.idpfVoucherDetails}'>{$T.li.idpfVoucherDetails}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='doctorName{$T.li.idpfVoucherDetails}'>{$T.li.doctorName}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='payTo{$T.li.idpfVoucherDetails}'>{$T.li.payTo}</div></td>"
		+ "<td class='col-md-2'> <div class='TextFont' id='amountPayable{$T.li.idpfVoucherDetails}'>{$T.li.amountPayable}</div></td>"
		+ "<td class='col-md-1 '> <div class='TextFont' id='date{$T.li.idpfVoucherDetails}'>{$T.li.date}</div></td>"
		+ "<td class='col-md-1 '>  <div class='TextFont'> <button class='btn btn-xs btn-success' type='button' onclick='proFeesViewVoucherDetailsById({$T.li.idpfVoucherDetails},"
		+ Current
		+ ")'><i class='fa fa-eye View'></i></button></div></td>"
		+ "{tableCurrentProFeesVoucher++}</tr>{#/for}";

// Template for current Voucher
var Cancel = "Cancel";
var tableCancelProfeesVoucher = 1;
var tableCancelProFeesVoucherTemplate = "{#foreach $T.listVoucherDetails as li}{#if $T.li.status =='N'}<tr>"
		+ "<td class='col-md-1 center'><div id='rowcount{$T.li.idpfVoucherDetails}' class='TextFont'>{tableCancelProFeesVoucher}</div></td>"
		+ "<td class='col-md-1'> <div class='TextFont' id='idpfVoucherDetails{$T.li.idpfVoucherDetails}'>{$T.li.idpfVoucherDetails}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='doctorName{$T.li.idpfVoucherDetails}'>{$T.li.doctorName}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='payTo{$T.li.idpfVoucherDetails}'>{$T.li.payTo}</div></td>"
		+ "<td class='col-md-2'> <div class='TextFont' id='amountPayable{$T.li.idpfVoucherDetails}'>{$T.li.cancelNarration}</div></td>"
		+ "<td class='col-md-1 '> <div class='TextFont' id='date{$T.li.idpfVoucherDetails}'>{$T.li.cancel_date_time}</div></td>"
		+ "<td class='col-md-1 center'>  <div class='TextFont '> <button class='btn btn-xs btn-success' type='button' onclick='proFeesViewVoucherDetailsById({$T.li.idpfVoucherDetails},"
		+ Cancel
		+ ")'><i class='fa fa-eye View'></i></button></div></td>"
		+ "{tableCancelProFeesVoucher++}</tr>{#/for}";

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : fetching All Generated Vouchers and cancel
 ******************************************************************************/
function proFeesFetchAllGeneratedVouchers(callFrom) {
	$("#tabName").val(callFrom);
	var voucherNo = $("#byVoucherNo").val();
	if (voucherNo == "" || voucherNo == undefined) {
		voucherNo = 0;
	}
	if (callFrom == 'Current' || callFrom == 'Cancel') {
		var inputs = [];
		inputs.push('action=proFeesFetchAllGeneratedVouchers');
		inputs.push('callFrom=' + callFrom);
		inputs.push('voucherNo=' + voucherNo);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				var data = eval('(' + r + ')');
				// for current
				if (callFrom == 'Current') {
					tableCurrentProFeesVoucher = 1;
					$("#tableCurrentTestDash").setTemplate(
							tableCurrentProFeesVoucherTemplate);
					$("#tableCurrentTestDash").processTemplate(data);
					$("#txtCancelNarration").prop("readonly", false);
				}
				// for cancel
				if (callFrom == 'Cancel') {
					tableCancelProFeesVoucher = 1;
					$("#tableCancelTestDash").setTemplate(
							tableCancelProFeesVoucherTemplate);
					$("#tableCancelTestDash").processTemplate(data);
				}
			}
		});
	}
	$("#tabName").val(callFrom);
}// function fetchAllGeneratedVouchers

// @Touheed Template authorised by @date 23-Aug-2016
var authorisedByListTemplate = "{#foreach $T.listDoctor as dpl}"
		+ "<option value='{$T.dpl.ui}'>{$T.dpl.dn}</option>{#/for}";

/*******************************************************************************
 * @author : Touheed Khan// used by Irfan khan
 * @date : 23-Aug-2016
 * @reason : Authorised Users List
 ******************************************************************************/
function fetchAuthorisedBy(callFrom) {
	callFrom = "onload";

	var inputs = [];
	inputs.push('action=fetchAuthorisedBy');
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			var data = eval('(' + r + ')');
			$("#txtAuthorisedBy").setTemplate(authorisedByListTemplate);
			$("#txtAuthorisedBy").processTemplate(data);

		}
	});

}

function searchByVoucherNumber(callFrom) {
	var tabName = $("#tabName").val();
	if (tabName != "") {
		proFeesFetchAllGeneratedVouchers(tabName);
	}
	$("#byVoucherNo").val("");
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : fetching All data of that particular voucher
 ******************************************************************************/
function proFeesViewVoucherDetailsById(id, callFrom) {

	var inputs = [];
	inputs.push('action=proFeesViewVoucherDetailsById');
	inputs.push('callFrom=' + callFrom);
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					var data = eval('(' + r + ')');
					tableCurrentMotivatorVoucher = 1;

					if (callFrom == "Current" || callFrom == "Cancel") {
						// for current
						$("#txtVoucharNumber").val(data.idpfVoucherDetails);
						$("#txtAuthorisedBy").val(data.idAuthorisedBy);
						$("#byName").val(data.doctorName);
						$("#txtDoctorId").val(data.doctorId);
						$("#txtPayTo").val(data.payTo);
						$("#txtSelectService").val(data.serviceType);
						$("#txtNaration").val(data.narration);
						$("#txtTotalAmount").val((data.totalAmount).toFixed(2));
						$("#txtTotalDiscount").val((data.totalDiscount).toFixed(2));
						$("#txtTotalReduction").val((data.totalReduction).toFixed(2));
						$("#txtTotalMotivation").val((data.totalMotivation).toFixed(2));
						$("#txtTotalClinicAmount").val((data.totalClinicAmount).toFixed(2));
						$("#txtAmountPayable").val((data.amountPayable).toFixed(2));
						$("#txtCancelNarration").val(data.cancelNarration);

						for ( var int = 0; int < data.listProFeesPaymentDetails.length; int++) {
							$('#tableTestVoucherList')
									.append(
											'<tr>'
													+ '<td class="col-md-1 center"><div id="rowcount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (int + 1)
													+ '</div></td>'
													+ '<td class="col-md-1 center"><div id="billReceiptId'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].billReceiptId)
													+ '</div></td>'
													+ '<td class="col-md-1 center"><div id="billComponentId'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].billComponentId)
													+ '</div></td>'
													+ '<td class="col-md-1" align="right"><div id="testActualRate'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].testActualRate).toFixed(2)
													+ '</div> </td>'
													+ '<td class="col-md-1" align="right"> <div id="discountOnTest'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].discountOnTest).toFixed(2)
													+ '</div> </td>'
													+ '<td class="col-md-1" align="right"><div id="testPaidAmount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].testPaidAmount).toFixed(2)
													+ '</div> </td>'
													
													+ '<td class="col-md-1" align="right"><div id="clinicAmount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].clinicPercentInAmount).toFixed(2)
													+ '</div> </td>'
													+ '<td class="col-md-1" align="right"><div id="doctorsActualCut'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].doctorsActualCut).toFixed(2)
													+ '</div></td>'
													+ '<td class="col-md-1" align="right"><div id="reductionAmount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].reductionAmount).toFixed(2)
													+ '</div></td>'
													+ '<td class="col-md-1" align="right"><div id="proFeesPayable'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (data.listProFeesPaymentDetails[int].pfPaidAmount).toFixed(2)
													+ '</div></td>' + '</tr>');
						}

					}
				}
			});

	// show popup
	showPopUpProFeesVocher(callFrom);

}// viewProfeesVoucherDetails end

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : showing Popup
 ******************************************************************************/
function showPopUpProFeesVocher(callFrom) {
	$("#popUpProFeesVocher").show('show');
	if (callFrom == 'Cancel') {
		$("#btnPrintVoucher").hide();
		$("#btnCancelVoucher").hide();
		$("#divCancelNa").css("display", "block");
		$("#txtCancelNarration").prop("readonly", true);
	} else {
		$("#btnPrintVoucher").show();
		$("#btnCancelVoucher").show();
		$("#divCancelNa").css("display", "none");
	}
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : hiding Popup
 ******************************************************************************/
function hidePopUpProFeesVocher() {
	$("#popUpProFeesVocher").hide('hide');

	proFeesResetVoucher("cancelbutton");// to reset fields

	$("#txtCancelNarration").val("");
	$("#divCancelNa").css("display", "none");
	// fetch all generated vouchers
	proFeesFetchAllGeneratedVouchers('Current');
}// function hidePopUpProFeesVocher end

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 24-Nov-2016
 * @reason : Print current voucher
 ******************************************************************************/
function proFeesGeneratedVoucherPrint(callFrom) {
	// txtVoucharNumber
	var id = $("#txtVoucharNumber").val();
	if (id != 0) {

		window.open("proFeesGeneratedVoucherPrint.jsp?" + "&id=" + id);
	}
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 24-Nov-2016
 * @reason : cancelling and rolback Generated Voucher
 ******************************************************************************/
function proFeesCancelGenratedVoucher(callFrom) {

	if (callFrom == 'allgeneratedVoucher') {

		if ($('#divCancelNa').css('display') == 'none') {
			$("#divCancelNa").css("display", "block");
		} else if ($('#divCancelNa').css('display') == 'block') {
			$("#txtCancelNarration").prop("readonly", false);
			var res = confirm("Confirm to Cancel Generated Voucher Machine Details?");
			if (res == false) {
				$("#divCancelNa").css("display", "none");
				return false;
			}

			var id = $("#txtVoucharNumber").val();
			var narration = $("#txtCancelNarration").val();

			if (narration == "" || narration == undefined) {
				alert("Please type narration!");
				setFocus("txtCancelNarration");
				return false;
			}

			var inputs = [];
			inputs.push('action=proFeesCancelGenratedVoucher');
			inputs.push('id=' + id);
			inputs.push('narration=' + narration);

			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					alert(r);
					hidePopUpProFeesVocher();
				}
			});
		}
	}
}// function cancelGenratedVoucherend

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 25-Nov-2016
 * @reason : Reset report
 ******************************************************************************/
function proFeesResetReport(callFrom) {

	if (callFrom == "reset") {
		$("#byName").val("");
		$("#txtDoctorId").val("0");
		$("#inputFromDate").val("");
		$("#inputToDate").val("");
		$("#txtSelectServiceReport").val("investigation");
		$("#inputTotalamt").val("");
		$('#tableTestVoucherListHead').empty();
		$('#tableTestVoucherList').empty();
		$("#radioAll").prop("checked", true);

	} else if (callFrom == "report") {
		$("#byName").val("");
		$("#txtDoctorId").val("0");
		$("#groupId").val("0");
		$("#inputFromDate").val("");
		$("#inputToDate").val("");
		$("#txtSelectServiceReport").val("all");
		$("#inputTotalamt").val("");
		$('#tableTestVoucherListHead').empty();
		$('#tableTestVoucherList').empty();
		$("#radioAll").prop("checked", true);

	} else {
		$("#inputFromDate").val("");
		$("#inputToDate").val("");
		$("#txtSelectServiceReport").val("investigation");
		$("#inputTotalamt").val("");
		$('#tableTestVoucherListHead').empty();
		$('#tableTestVoucharList').empty();
		$("#radioAll").prop("checked", true);
	}
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 25-Nov-2016
 * @reason : comparing with current date
 ******************************************************************************/
function checkWithCurrentDate(callFrom) {
	var currentDate = $.datepicker.formatDate('yy-mm-dd', new Date());
	var fromDate = $("#inputFromDate").val();

	if (fromDate > currentDate) {
		alert("'From Date' can't be Greater than Today's Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}

	if (callFrom == "ReportToProFees") {
		var toDate = $("#inputToDate").val();
		if (toDate < fromDate) {
			alert("'To Date' can't be less than 'From Date',but Equal to It!");
			$("#inputToDate").val("");
			SetFocus("inputToDate");
			return false;
		}

	}
	// making table empty
	$('#tableTestVoucherList').empty();

}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 25-Nov-2016
 * @reason : Doctor's payable report
 ******************************************************************************/
function proFeesfetchReports(callFrom) {
	var doctorName = null;
	var fromDate = null;
	var toDate = null;
	var doctorId = null;
	var serviceType = null;

	if (callFrom == "doctor") {
		doctorName = $("#byName").val();
		fromDate = $("#inputFromDate").val();
		toDate = $("#inputToDate").val();
		doctorId = $("#txtDoctorId").val();
		serviceType = $("#txtSelectServiceReport").val();

		if (byName == "" || byName == undefined) {
			alert("Please Type Doctor Name!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (doctorId == 0 || doctorId == "" || doctorId == undefined) {
			alert("Doctor Name is not Valid, Please Select Doctor Name Form Suggestion List!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (fromDate == "" || fromDate == undefined) {
			alert("Please Select From Date!");
			$("#inputFromDate").val("");
			SetFocus("inputFromDate");
			return false;
		} else if (toDate == "" || toDate == undefined) {
			alert("Please Select From Date!");
			$("#inputToDate").val("");
			SetFocus("inputToDate");
			return false;
		}

	}
	var inputs = [];
	inputs.push('action=proFeesfetchReports');
	inputs.push('callFrom=' + callFrom);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('serviceType=' + serviceType);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				beforeSend : function() {
					$('#ajaxloaderimg').show();
				},
				complete : function() {
					$('#ajaxloaderimg').hide();
				},
				error : function() {
					// alert("error");
				},
				success : function(r) {
					var data = eval('(' + r + ')');
					var html = '';
					// var html2='';
					var totalAmountPayable = 0;
					var totalNetAmount = 0;
					var totalReduction = 0;
					var totalPaid = 0;
					var totalUnpaid = 0;
					var totalClinicAmount = 0;
					var serviceType = null;
					
					if(data.listReports[0] == undefined ){
							
						html = html 
						+ '<tr style="height:30px; color:red; font-size:30px;"><th class="col-md-1 center">No Records Found...!!!</th></tr>';
						
					} else{

					html = html
							+ '<tr ><th colspan="3" left>'
							+ data.listReports[0].hospitalName
							+ '<br>Doctors Payable Report<br>From  : <b>'
							+ fromDate
							+ '</b> To  : <b>'
							+ toDate
							+ '</b><br>Doctor Name : <b>'
							+ doctorName
							+ '</b><br>Doctor Speciality: <b>'
							+ data.listReports[0].speciality
							+ '</b></th></tr>'
							+ '<tr style = "background-color:#EEEEEE;">'
							+ '<th style="height: 21.5px;" class="col-md-1" center>#</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Trtmnt-Start Date</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Srvc-Assign Date</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Receipt No</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Patient Id</th>'
							+ '<th style="height: 21.5px;" class="col-md-3" >Patient-Name</th>'
							+ '<th style="height: 21.5px;" class="col-md-3" >Service-Type</th>'
							+ '<th style="height: 21.5px;" class="col-md-5" >Service-Details</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Test-Paid Amt</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Clinic Amt.</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Pro.Fees Amt</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Reduction</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>PF.Paid</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>PF.UnPaid</th>'
							+ ' </tr>';

					for ( var i = 0; i < data.listReports.length; i++) {

						serviceType = data.listReports[i].serviceType;
						if (serviceType == "Doc") {
							serviceType = "Consulting";
						} else if (serviceType == "CasualityServices") {
							serviceType = "Casualty Services";
						}else if (serviceType == "investigation") {
							serviceType = "Investigation";
						}else if (serviceType == "physiotherapy") {
							serviceType = "Physiotherapy";
						}else if (serviceType == "OtherServices") {
							serviceType = "Other Services";
						}else if (serviceType == "pathology") {
							serviceType = "Pathology";
						}
						html = html + '<tr >';
						html = html
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ (i + 1) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].visitDate + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].assignDate + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].billReceiptId + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].patientId + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-3" >'
								+ data.listReports[i].patientName + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-3" >'
								+ serviceType + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-5" >'
								+ data.listReports[i].testName + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].payable).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].clinicPercentInAmount).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].doctorsActualCut).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].reductionAmount).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].pfPaidAmount).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].pfUnpaidAmount).toFixed(2) + '</td>'
								+ ' </tr>';

						totalAmountPayable = totalAmountPayable
								+ data.listReports[i].payable;
						totalNetAmount = totalNetAmount
								+ data.listReports[i].doctorsActualCut;
						totalReduction = totalReduction
								+ data.listReports[i].reductionAmount;
						totalPaid = totalPaid
								+ data.listReports[i].pfPaidAmount;
						totalUnpaid = totalUnpaid
								+ data.listReports[i].pfUnpaidAmount;
						totalClinicAmount = totalClinicAmount
								+ data.listReports[i].clinicPercentInAmount;
					}
					html = html
							+ '<tr ><td colspan="3" style="height: 11.5px;"></td></tr>';
					html = html
							+ '<tr style = "background-color:#EEEEEE;"><td colspan="7"></td><th>Total</th><td class="col-md-1" align="right" >'
							+ totalAmountPayable.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalClinicAmount.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalNetAmount.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalReduction.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalPaid.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalUnpaid.toFixed(2)
							+ '</td></tr>';
						}

					// $("#tableTestVoucherListHead").html(html2);
					$("#tableTestVoucherList").html(html);
				}
			});
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 29-Nov-2016
 * @reason : Diagnostics payable report
 ******************************************************************************/
function diagnoPayableReport(callFrom) {
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	var doctorId = 0;
	var serviceType = "all";

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];
	inputs.push('action=proFeesfetchReports');
	inputs.push('callFrom=' + callFrom);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('serviceType=' + serviceType);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				beforeSend : function() {
					$('#ajaxloaderimg').show();
				},
				complete : function() {
					$('#ajaxloaderimg').hide();
				},
				error : function() {
					// alert("error");
				},
				success : function(r) {
					var data = eval('(' + r + ')');
					var html = '';
					var html2 = '';
					var totalTestCharges = 0;
					var totalConcession = 0;
					var totalTestPaid = 0;
					var totalClinicShare = 0;
					var serviceType = null;

					if(data.listReports[0] == undefined ){
						
						html = html 
						+ '<tr style="height:30px; color:red; font-size:30px;"><th class="col-md-1 center">No Records Found...!!!</th></tr>';
						
					} else{
					html2 = html2 + '<tr ><th colspan="3" left>'
							+ data.listReports[0].hospitalName
							+ '<br>Diagnostics Payable Report<br>'
							+ 'From  : <b>' + fromDate + '</b> To  : <b>'
							+ toDate + '</b></th></tr>';
					html2 = html2 + '<tr style = "background-color:#EEEEEE;">'
							+ '<th style="height: 21.5px;" class="col-md-1" center>#</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Trtmnt-Start Date</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Srvc-Assign Date</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Receipt No</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Patient.Id</th>'
							+ '<th style="height: 21.5px;" class="col-md-3" >Patient Name</th>'
							+ '<th style="height: 21.5px;" class="col-md-3" >Service Type</th>'
							+ '<th style="height: 21.5px;" class="col-md-5" >Test Details</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Test Charges</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Test Quantity</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Concession</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Test-Paid Amount</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Clinic Share</th>'
							+ ' </tr>';

					for ( var i = 0; i < data.listReports.length; i++) {

						serviceType = data.listReports[i].serviceType;
						if (serviceType == "Doc") {
							serviceType = "Consulting";
						} else if (serviceType == "CasualityServices") {
							serviceType = "Casualty Services";
						}else if (serviceType == "investigation") {
							serviceType = "Investigation";
						}else if (serviceType == "physiotherapy") {
							serviceType = "Physiotherapy";
						}else if (serviceType == "OtherServices") {
							serviceType = "Other Services";
						}else if (serviceType == "pathology") {
							serviceType = "Pathology";
						}
						html = html + '<tr >';
						html = html
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ (i + 1) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].visitDate + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].assignDate + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].billReceiptId + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].patientId + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-3" >'
								+ data.listReports[i].patientName + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-3" >'
								+ serviceType + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-5" >'
								+ data.listReports[i].testName + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listReports[i].testActualRate).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ data.listReports[i].testQuantity + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listReports[i].discountOnTest).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listReports[i].testPaidAmount).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listReports[i].clinicPercentInAmount).toFixed(2)
								+ '</td>'
								+ ' </tr>';

						totalTestCharges = totalTestCharges
								+ data.listReports[i].testActualRate;
						totalConcession = totalConcession
								+ data.listReports[i].discountOnTest;
						totalTestPaid = totalTestPaid
								+ data.listReports[i].testPaidAmount;
						totalClinicShare = totalClinicShare
								+ data.listReports[i].clinicPercentInAmount;
					}
					html = html
							+ '<tr><td colspan="3" style="height: 11.5px;"></td></tr>';
					html = html
							+ '<tr style = "background-color:#EEEEEE;"><td colspan="7"></td><th>Total</th><td class="col-md-1" align="right">'
							+ totalTestCharges.toFixed(2)
							+ '</td><td center></td><td class="col-md-1" align="right">'
							+ totalConcession.toFixed(2) + '</td><td class="col-md-1" align="right">'
							+ totalTestPaid.toFixed(2) + '</td><td class="col-md-1" align="right">'
							+ totalClinicShare.toFixed(2) + '</td></tr>';
					}

					$("#tableTestVoucherListHead").html(html2);
					$("#tableTestVoucherList").html(html);
				}
			});
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 30-Nov-2016
 * @reason : Business summary report for doctor
 ******************************************************************************/
function proFeesBusinessReport(callFrom) {
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	var doctorName = $("#byName").val();
	if (doctorName == "") {
		doctorName = "blank";
	}

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];
	inputs.push('action=proFeesBusinessReport');
	inputs.push('callFrom=' + callFrom);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorName=' + doctorName);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				beforeSend : function() {
					$('#ajaxloaderimg').show();
				},
				complete : function() {
					$('#ajaxloaderimg').hide();
				},
				error : function() {
					// alert("error");
				},
				success : function(r) {

					var data = eval('(' + r + ')');
					var html = '';
					var html2 = '';

					html2 = html2 + '<tr ><th colspan="3" left>'
							+ data.listBusinessReports[0].hospitalName
							+ '<br>Business Summary Report - Doctors<br>'
							+ 'From  : <b>' + fromDate + '</b> To  : <b>'
							+ toDate + '</b></th></tr>';
					html2 = html2 + '<tr style = "background-color:#EEEEEE;">'
							+ '<th style="height: 21.5px;" class="col-md-1" center>#</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" align="center">Speciality</th>'
							+ '<th style="height: 21.5px;" class="col-md-2" align="center">Doctor Name</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" align="center" colspan="4">Consulting</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" align="center" colspan="4">Physiotherapy</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" align="center" colspan="4">Investigation</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" align="center" colspan="4">Other Services</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" align="center" colspan="4">Casualty Services</th>'
							+ '<th style="height: 21.5px;" class="col-md-3" align="center" center colspan="4">Total OPD Business</th>'
							+ ' </tr><tr style = "background-color:#EEEEEE;">'
							+ '<th></th><th></th><th></th><th>Total</th><th>Net</th><th>Paid</th><th>Reduction</th>'
							+ '<th>Total</th><th>Net</th><th>Paid</th><th>Reduction</th><th>Total</th><th>Net</th><th>Paid</th><th>Reduction</th>'
							+ '<th>Total</th><th>Net</th><th>Paid</th><th>Reduction</th><th>Total</th><th>Net</th><th>Paid</th><th>Reduction</th>'
							+ '<th>Total Billing</th><th>Net Billing</th><th>Total Paid</th><th>Total Reduction</th>'
							+ '</tr>';

					var docTotalf = 0;
					var docNetf = 0;
					var docPFPaidf = 0;
					var docReductionf = 0;

					var invTotalf = 0;
					var invNetf = 0;
					var invPFPaidf = 0;
					var invReductionf = 0;

					var physioTotalf = 0;
					var physioNetf = 0;
					var physioPFPaidf = 0;
					var physioReductionf = 0;

					var osTotalf = 0;
					var osNetf = 0;
					var osPFPaidf = 0;
					var osReductionf = 0;

					var csTotalf = 0;
					var csNetf = 0;
					var csPFPaidf = 0;
					var csReductionf = 0;

					var totalBillingf = 0;
					var netBillingf = 0;
					var totalPFPaidf = 0;
					var totalReductionf = 0;
					var count = 1;

					for ( var i = 0; i < data.listBusinessReports.length; i++) {

						html = html + '<tr >'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ count + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listBusinessReports[i].speciality
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listBusinessReports[i].doctorName
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].docTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].docNet).toFixed(2) + '</td>'
								
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].docPFPaid).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].docReduction).toFixed(2) + '</td>'
								
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].physioTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].physioNet).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].physioPFPaid).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].physioReduction).toFixed(2) + '</td>'
								
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].invTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].invNet).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].invPFPaid).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].invReduction).toFixed(2) + '</td>'
								
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].osTotal).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].osNet).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].osPFPaid).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].osReduction).toFixed(2) + '</td>'
								
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].csTotal).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].csNet).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].csPFPaid).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].csReduction).toFixed(2) + '</td>'
								
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].totalBilling).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px; " class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].netBilling).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].totalPFPaid).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].totalReduction).toFixed(2)
								+ '</td>'
								+ ' </tr>';
						count++;

						totalBillingf = totalBillingf
								+ data.listBusinessReports[i].totalBilling;
						netBillingf = netBillingf
								+ data.listBusinessReports[i].netBilling;
						totalPFPaidf = totalPFPaidf 
								+ data.listBusinessReports[i].totalPFPaid;
						totalReductionf = totalReductionf 
								+ data.listBusinessReports[i].totalReduction;

						docTotalf = docTotalf
								+ data.listBusinessReports[i].docTotal;
						docNetf = docNetf + data.listBusinessReports[i].docNet;
						docPFPaidf = docPFPaidf + data.listBusinessReports[i].docPFPaid;
						docReductionf = docReductionf + data.listBusinessReports[i].docReduction;

						invTotalf = invTotalf
								+ data.listBusinessReports[i].invTotal;
						invNetf = invNetf + data.listBusinessReports[i].invNet;
						invPFPaidf = invPFPaidf + data.listBusinessReports[i].invPFPaid;
						invReductionf = invReductionf + data.listBusinessReports[i].invReduction;

						physioTotalf = physioTotalf
								+ data.listBusinessReports[i].physioTotal;
						physioNetf = physioNetf
								+ data.listBusinessReports[i].physioNet;
						physioPFPaidf = physioPFPaidf + data.listBusinessReports[i].physioPFPaid;
						physioReductionf = physioReductionf + data.listBusinessReports[i].physioReduction;

						osTotalf = osTotalf
								+ data.listBusinessReports[i].osTotal;
						osNetf = osNetf + data.listBusinessReports[i].osNet;
						osPFPaidf = osPFPaidf + data.listBusinessReports[i].osPFPaid;
						osReductionf = osReductionf + data.listBusinessReports[i].osReduction;
						

						csTotalf = csTotalf
								+ data.listBusinessReports[i].csTotal;
						csNetf = csNetf + data.listBusinessReports[i].csNet;
						csPFPaidf = csPFPaidf + data.listBusinessReports[i].csPFPaid;
						csReductionf = csReductionf + data.listBusinessReports[i].csReduction;

					}

					html = html
							+ '<tr><td colspan="3" style="height: 11.5px;"></td></tr>';
					html = html
							+ '<tr style = "background-color:#EEEEEE;"><td colspan="2"></td><th>Total</th><td align="right" class="col-md-1">'
							+ docTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ docNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ docPFPaidf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ docReductionf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ physioTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ physioNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ physioPFPaidf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ physioReductionf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ invTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ invNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ invPFPaidf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ invReductionf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ osTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ osNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ osPFPaidf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ osReductionf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ csTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ csNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ csPFPaidf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ csReductionf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ totalBillingf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ netBillingf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ totalPFPaidf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ totalReductionf.toFixed(2) + '</td></tr>';

					$("#tableTestVoucherListHead").html(html2);
					$("#tableTestVoucherList").html(html);
				}
			});
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 05-Dec-2016
 * @reason : Business summary report for Hospital
 ******************************************************************************/
function proFeesBusinessReportHosp(callFrom) {
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];
	inputs.push('action=proFeesBusinessReportHosp');
	inputs.push('callFrom=' + callFrom);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				beforeSend : function() {
					$('#ajaxloaderimg').show();
				},
				complete : function() {
					$('#ajaxloaderimg').hide();
				},
				error : function() {
					// alert("error");
				},
				success : function(r) {

					var data = eval('(' + r + ')');
					var html = '';
					var html2 = '';

					html2 = html2 + '<tr ><th colspan="4" left>'
							+ data.listBusinessReports[0].hospitalName
							+ '<br>Business Summary Report - Hopital<br>'
							+ 'From  : <b>' + fromDate + '</b> To  : <b>'
							+ toDate + '</b></th></tr>';
					html2 = html2
							+ '<tr style = "background-color:#EEEEEE;">'
							+ '<th style="height: 21.5px;" class="col-md-1" center>#</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Date</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center colspan="2">Consulting</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" colspan="2">Physiotherapy</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" colspan="2">Investigation</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" colspan="2">Other Services</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" colspan="2">Casualty Services</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" colspan="2">Daily OPD Business</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" colspan="2">Pathology</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" colspan="2">Total Daily Business</th>'
							+ ' </tr><tr style = "background-color:#EEEEEE;">'
							+ '<th></th><th></th><th>Total</th><th>Net</th><th>Total</th><th>Net</th><th>Total</th><th>Net</th>'
							+ '<th>Total</th><th>Net</th><th>Total</th><th>Net</th><th>Total</th><th>Net</th><th>Total</th><th>Net</th>'
							+ '<th>Total Billing</th><th>Net Billing</th>'
							+ '</tr>';

					var docTotalf = 0;
					var docNetf = 0;

					var invTotalf = 0;
					var invNetf = 0;

					var physioTotalf = 0;
					var physioNetf = 0;

					var osTotalf = 0;
					var osNetf = 0;

					var csTotalf = 0;
					var csNetf = 0;

					var pathoTotalf = 0;
					var pathoNetf = 0;

					var dailyTotalf = 0;
					var dailyNetf = 0;

					var totalBillingf = 0;
					var netBillingf = 0;

					var count = 1;

					for ( var i = 0; i < data.listBusinessReports.length; i++) {

						html = html + '<tr >';
						html = html
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ count + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listBusinessReports[i].dateString
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].docTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].docNet).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].physioTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].physioNet).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].invTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].invNet).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].osTotal).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].osNet).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].csTotal).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].csNet).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].dailyTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].dailyNet).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].pathoTotal).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].pathoNet).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].totalBilling).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" align="right">'
								+ (data.listBusinessReports[i].netBilling).toFixed(2)
								+ '</td>'
								+ ' </tr>';
						count++;

						totalBillingf = totalBillingf
								+ data.listBusinessReports[i].totalBilling;
						netBillingf = netBillingf
								+ data.listBusinessReports[i].netBilling;

						docTotalf = docTotalf
								+ data.listBusinessReports[i].docTotal;
						docNetf = docNetf + data.listBusinessReports[i].docNet;

						invTotalf = invTotalf
								+ data.listBusinessReports[i].invTotal;
						invNetf = invNetf + data.listBusinessReports[i].invNet;

						physioTotalf = physioTotalf
								+ data.listBusinessReports[i].physioTotal;
						physioNetf = physioNetf
								+ data.listBusinessReports[i].physioNet;

						osTotalf = osTotalf
								+ data.listBusinessReports[i].osTotal;
						osNetf = osNetf + data.listBusinessReports[i].osNet;

						dailyTotalf = dailyTotalf
								+ data.listBusinessReports[i].dailyTotal;
						dailyNetf = dailyNetf
								+ data.listBusinessReports[i].dailyNet;

						csTotalf = csTotalf
								+ data.listBusinessReports[i].csTotal;
						csNetf = csNetf + data.listBusinessReports[i].csNet;

						pathoTotalf = pathoTotalf
								+ data.listBusinessReports[i].pathoTotal;
						pathoNetf = pathoNetf
								+ data.listBusinessReports[i].pathoNet;

					}

					html = html
							+ '<tr><td colspan="2" style="height: 11.5px;"></td></tr>';
					html = html + '<tr style = "background-color:#EEEEEE;"><td></td><th>Total</th><td align="right" class="col-md-1">'
							+ docTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ docNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ physioTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ physioNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ invTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ invNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ osTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ osNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ csTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ csNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ dailyTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ dailyNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ pathoTotalf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ pathoNetf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ totalBillingf.toFixed(2) + '</td><td align="right" class="col-md-1">'
							+ netBillingf.toFixed(2) + '</td></tr>';

					$("#tableTestVoucherListHead").html(html2);
					$("#tableTestVoucherList").html(html);

				}
			});
}

//@UsedBy:Irfan khan @codeDate:29-Dec-2016 (Auto-Suggestion list for inhouse doctor name list)
function setAutoSuggestDocName(inputID, onload, callFrom) {
	//alert(inputID+" "+onload+" "+callFrom);
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var auto = '';
	if (callFrom == "proFees") {
		auto = 'proFees';
	} 
	
	var inputs = [];

	inputs.push('letter=' + findingName);
	inputs.push('autoSuggest=' + auto);
	
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/doctor/fetchAutoListForDoctorName",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					 alert('error');
				},
				success : function(response) {
					//alert(JSON.stringify(response));
					if(response.listDoctor.length > 0){
							
							var template = "";
							for(var j = 0; j < response.listDoctor.length; j++) {
								var arrValue = "";
								var idValue = "";
								var name = "";
								
								//arrValue = response.listDoctor[j].doctor_ID +"-"+response.listDoctor[j].doc_name;
								arrValue =response.listDoctor[j].doc_name;
								idValue = response.listDoctor[j].doctor_ID;
								name = response.listDoctor[j].doc_name;
								
								resultData.push({
									ID : idValue,
									Name : name
								});
								template = template + '<li data-value="' + idValue
										+ '" class=""><a href="#">' + arrValue + '</a></li>';
							}
				
							setTimeout(function() {
								$("div#divbyName .typeahead").html(template);
								$("div#divbyName .typeahead").show();
				
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
				}
			});
			function displayResult(item) {
				var res = item.text.split('-');
				var docId = res[0];
				var doc_Id = item.value;
				var doctorName = res[1];
				//getPatientById(patId, type, tabId, emergencyFlag);
				//$("input#" + docId).val(doc_name);
				$("#" + inputID).val((item.text).trim());
				$("#txtDoctorId").val(doc_Id);
			}
					
	/*				ajaxResponse = decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
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
		var doc_Id = item.value;
		$("#" + inputID).val((item.text).trim());
		$("#txtDoctorId").val(doc_Id);
	}*/

}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 10-jan-2017
 * @reason : Adding all rows in voucher list voucher list
 ******************************************************************************/
function addAllRowsToVoucherList() {

	// counting is there any record to add
	var rowsTableTestDash = $('#tableTestDash tr').length;
	if (rowsTableTestDash == undefined || rowsTableTestDash == 0) {
		alert("There is no record to add in Voucher List!");
		return false;
	}
	var reduction = $("#txtReduction").val();
	if(reduction > 0 || reduction <0)
		{
			alert("You can't reduct while 'Adding All',Make it '0'");
			return false;
		}

	var txtDoctorId = $("#txtDoctorId").val();
	var txtSelectService = $("#txtSelectService").val();

	var inputs = [];
	inputs.push('action=proFeesFetchTestList');
	inputs.push('doctorId=' + txtDoctorId);
	inputs.push('serviceType=' + txtSelectService);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					var data = eval('(' + r + ')');
					var idpfPaymentDetails;
					var tableTestVoucherListCount;
					var reduction = 0;
					var htm = "";
					var totalAmount = 0;
					var totalDiscount = 0;
					var totalMotivation = 0;
					var totalReduction = 0;
					var amountPayable = 0;
					var totalClinicAmount = 0;

					for ( var i = 0; i < data.listProFeesPaymentDetails.length; i++) {
						tableTestVoucherListCount = $('#tableTestVoucherList tr').length;
						idpfPaymentDetails = data.listProFeesPaymentDetails[i].idpfPaymentDetails;

						htm = htm
								+ "<tr>"
								+ "<td class='col-md-1 center'><div id='rowcount"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (i + 1)
								+ "</div></td>"
								+ "<td class='col-md-1 center'><div id='billComponentId"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ data.listProFeesPaymentDetails[i].billComponentId
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='testActualRate"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (data.listProFeesPaymentDetails[i].testActualRate).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='discountOnTest"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (data.listProFeesPaymentDetails[i].discountOnTest).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='testPaidAmount"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (data.listProFeesPaymentDetails[i].testPaidAmount).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='clinicAmount"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (data.listProFeesPaymentDetails[i].clinicPercentInAmount).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='doctorsActualCut"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (data.listProFeesPaymentDetails[i].doctorsActualCut).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='reduction"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (reduction).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='proFeesPayable"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (data.listProFeesPaymentDetails[i].pfUnpaidAmount).toFixed(2)
								+ "</div></td>"
								+ "<input id='isthererow"
								+ idpfPaymentDetails
								+ "' type='hidden' value='"
								+ idpfPaymentDetails
								+ "'>"
								+ "<input id='idpfPaymentDetails"
								+ (i + 1)
								+ "' type='hidden' value='"
								+ idpfPaymentDetails
								+ "'>"
								+ "<input id='billReceiptId"
								+ (i + 1)
								+ "' type='hidden' value='"
								+ data.listProFeesPaymentDetails[i].billReceiptId
								+ "'>" + "</tr>";

						// Making check box disable which was added in voucher list getting all values
						$('#chk' + idpfPaymentDetails).prop("disabled", true);

						// Business logic for total calculation
						totalAmount = totalAmount
								+ data.listProFeesPaymentDetails[i].testPaidAmount;
						totalDiscount = totalDiscount
								+ data.listProFeesPaymentDetails[i].discountOnTest;
						totalMotivation = totalMotivation
								+ data.listProFeesPaymentDetails[i].doctorsActualCut;
						totalReduction = totalReduction + reduction;
						amountPayable = amountPayable
								+ data.listProFeesPaymentDetails[i].pfUnpaidAmount;
						totalClinicAmount = totalClinicAmount 
								+ data.listProFeesPaymentDetails[i].clinicPercentInAmount;
						// cleaning input text fields.
					}
					$('#tableTestVoucherList').html(htm);
					$("#txtTotalAmount").val(totalAmount.toFixed(2));
					$("#txtTotalDiscount").val(totalDiscount.toFixed(2));
					$("#txtTotalMotivation").val(totalMotivation.toFixed(2));
					$("#txtTotalReduction").val(totalReduction.toFixed(2));
					$("#txtAmountPayable").val(amountPayable.toFixed(2));
					$("#txtTotalClinicAmount").val(totalClinicAmount.toFixed(2));
					$("#serviceFlag").val("all");
					$("#txtComponentNo").val("");
					$("#txtAmount").val("");
					$("#txtReduction").val("0");
					$("#txtTDS").val("0");
				}
			});

}// end of function addRowToVoucherList();


//Hospital Report Monthly Report 
function getOPDIPDOperationSpecilitywiseReport() {

	var fromMonth = $("#FromMonth").val();
	var fromYear = $("#FromYear").val();


         	var inputs = [];
			inputs.push('fromMonth=' + encodeURIComponent(fromMonth));
			inputs.push('fromYear=' + encodeURIComponent(fromYear));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getOPDIPDOperationSpecilitywiseReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th colspan='1' class='col-md-1'>Indicator"
						    + "</th><th colspan='1' class='col-md-1'>"
							+ "</th><th colspan='3' class='col-md-1'>OPD"
							+ "</th><th colspan='3' class='col-md-1'>IPD"
							+ "</th><th colspan='4' class='col-md-1'>OPERATION"
							+ "</th></tr>";
					
					htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE'><th>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
				
					+ "</th><th  class='col-md-1'>Male"
					+ "</th><th  class='col-md-1'>Female"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th><th  class='col-md-1'>Male"
					+ "</th><th  class='col-md-1'>Female"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th><th  class='col-md-1'>SupraMajor"
					+ "</th><th  class='col-md-1'>Major"
					+ "</th><th  class='col-md-1'>Minor"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th></tr>";

					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {
						
						htmBody = htmBody + "<tr style='height:21px;'>"
								+ "<td  rowspan='2'  class='col-md-1'>1</td>"
								+ "<td rowspan='2' class='col-md-1'>Nephrology & Urology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].monthlycount+"</td><td class='col-md-1'> "+r.listTreatment[1].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[2].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[3].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[4].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[5].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[6].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[7].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[8].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[9].monthlycount+" </td></tr>" 
							                                                       	+ "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[1].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[2].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[3].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[4].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[5].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[6].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[7].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[8].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[9].progressivecount+"</td></tr>";
							
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>2</td>"
						+ "<td rowspan='2' class='col-md-1'>Plastic Surgery</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountplastic+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[5].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[6].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[7].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[8].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[9].deptMonthCountplastic+" </td></tr>" 
						                                                 + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[5].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[6].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[7].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[8].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[9].deptPrgCountPlastic+"</td></tr>";
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>3</td>"
						+ "<td rowspan='2' class='col-md-1'>Paediatric & NICU Surgery </td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountPaediatric+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[5].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[6].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[7].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[8].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[9].deptMonthCountPaediatric+" </td></tr>" 
						                                                            + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[5].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[6].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[7].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[8].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[9].deptPrgCountPaediatric+"</td></tr>";
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>4</td>"
						+ "<td rowspan='2' class='col-md-1'>NCD</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountNCD+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[5].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[6].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[7].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[8].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[9].deptMonthCountNCD+" </td></tr>" 
						                                     + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[5].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[6].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[7].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[8].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[9].deptPrgCountNCD+"</td></tr>";
						
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>5</td>"
						+ "<td rowspan='2' class='col-md-1'>Lithotripsy</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].lithomonthCount+"</td></tr>" 
						                                     + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].lithoprogcount+"</td></tr>";
						
						
						
					}
						
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}


