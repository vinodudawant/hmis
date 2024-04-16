var result = "";
var totalRowCount = 1;
var functionCount = 0;
var indentReceiveCount = 0;
var indentSaleparseData="";

function setUpfocus() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');
				var splittedData = data.split("#");
				var focusElement = splittedData[1].trim();
				var id = $("input." + focusElement).parent().parent()
						.attr("id");
				$("#HSTDiv #hiddenCurrentRow").siblings("tr#" + id).prev()
						.find("td input.textNoDelete").focus();
			});
}

function setDownfocus() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');
				var splittedData = data.split("#");
				var focusElement = splittedData[1].trim();
				var id = $("input." + focusElement).parent().parent()
						.attr("id");
				$("#HSTDiv #hiddenCurrentRow").siblings("tr#" + id).next()
						.find("td input.textNoDelete").focus();
			});
}

function showDetails() {
	$("#txtBankName").val('');
	$("#txtChequeNo").val('');
	$("#txtComment").val('');
	$("#DivBank").show();
	$("#DivChequeNum").show();
	$("#DivComment").show();
}

function hideDetails() {
	$("#DivBank").hide();
	$("#DivChequeNum").hide();
	$("#DivComment").hide();
}

//Added By BILAL 
function showcardDetails() {
	$("#txtBankName").val('');
	$("#txtComment").val('');
	$("#txtCardNo").val('');
	
    $("#DivBank").show();
	$("#DivChequeNum").hide();
	$("#DivComment").show();
	
	$("#DivCardNum").show();

}

//Added By BILAL
function hideCardDetails(){
	
	$("#DivCardNum").hide();
	
}

function autoSuggestionForPendingPatientName(inputID, typeauto) {
	var typeOfpatient = 'diagnosis';
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {

						// alert(r.length);
						var availableTags = [];

						ajaxResponse = eval('(' + r + ')');

						for ( var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

							availableTags
									.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
											+ " "
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName
											+ " "
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName
											+ "__"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
											+ "_"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
											+ "_"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo);
						}

						var template = "";
						for ( var j = 0; j < availableTags.length; j++) {
							var arrValue = (availableTags[j]).split("__");
							var idValue = (arrValue[1]);
							resultData.push({
								ID : idValue,
								Name : arrValue[0]
							});

							template = template + '<li data-value="'
									+ (arrValue[1]) + '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}

						$("#div" + inputID + " .typeahead").html(template);

						setTimeout(
								function() {
									$('#' + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult4,
										scrollBar : true,

									});
									$("#txtPatientName1").data('typeahead').source = resultData;
								}, 500);

					}
				});
	}

}

function displayResult4(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId1').val(content[0]);

	/* getTreatmentIdForPendingPatient(content[0]); */

}

/*
 * $("#ipdData tr").on("click",function() { alert("Hi"); });
 */

function setAmtReceived() {
	$("#txtAmtRec").val(0);
	/* $('#txtAmtRec').attr('readonly', true); */
	calculatePending();
}

function showAlternateProduct() {
	searchAlternateProduct($("#hiddenProductId").val(), $("#particulars").val());
	$("#alternate_product_popUp_form").modal("show");
}

function showPendingIndentPerDate() {
	fetchIndentDetailsByDate($('#popup_container3').val());
}

function showSettleBill() {
	displayPendingPopUp();
}

function chkIndentReceive() {
	var flag = 0;
	for ( var p = 0; p < $("#RowCount").val()-1; p++) {
		if (qtyArr[p] > $("#textQty" + (p + 1)).val()) {
			flag = 1;
			break;
		}
	}
	if (flag == 0) {
		var indentNo = $('#txtIndentNo').val();
		var inputs = [];
		inputs.push('indentNo=' + indentNo);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/chkIndentReceived",
			catche : false,
			error : function() {

			},
			success : function(r) {

				if (r == 0) {
					saveIndentSale(flag);
				} else {

					alert("indent already received");
				}
			}
		});
	} else 
		saveIndentSale(flag);
}

function saveIndentSale(flag) {

	var retVal = confirm("Do you want to Save?");
	if (retVal == true) {
		calculateVat();

		var txtDocNo = "";
		if ($('#txtBillNo').val() != null && $('#txtBillNo').val() != "") {
			txtDocNo = $("#txtBillNo").val();
		} else {
			alertify.error("Enter Vou No");
			$('#txtBillNo').focus();
			return false;
		}

		var txtDate = "";
		if ($('#popup_container2').val() != null
				&& $('#popup_container2').val() != "") {
			txtDate = $("#popup_container2").val();
		} else {
			alertify.error("Enter Indent Received Date");
			$('#popup_container2').focus();
			return false;
		}

		var txtNarration = "-";
		txtNarration = $("#txtNaration").val();

		var txtGrossAmt = $("#txtGrossAmt").val();

		var txtAdd = $("#txtAdd").val();

		var txtLess = $("#txtLess").val();

		var txtNetAmt = $("#txtNetAmt").val();

		var txtSpecialDisc = $("#txtSpecialDisc").val();

		var txtSurcharge = $("#txtSurcharge").val();

		var txtRount = $("#txtRount").val();

		var txtCN = $("#txtCN").val();

		var txtCD = $("#txtCD").val();

		var txtCNAmt = $("#txtCNAmt").val();
		
		var categoryId =1;
		if ($('#billCategoryId').val() != null
				&& $('#billCategoryId').val() != ''
				&& $('#billCategoryId').val().trim().length > 0) {
			categoryId = $("#billCategoryId").val();
		}

		var txtAmtRec = 0;
		if ($('#txtAmtRec').val() != null && $('#txtAmtRec').val() != ''
				&& $('#txtAmtRec').val().trim().length > 0) {
			txtAmtRec = $("#txtAmtRec").val();
		} else {
			alertify.error("Enter Amount Receive");
			$('#txtAmtRec').focus();
			return false;
		}
		calculatePending();

		var txtAmtBal = 0;
		if ($('#txtAmtBal').val() != null && $('#txtAmtBal').val() != ''
				&& $('#txtAmtBal').val().trim().length > 0) {
			txtAmtBal = $("#txtAmtBal").val();
		} else {
			alertify.error("Enter Amount Balance");
			$('#txtAmtBal').focus();
			return false;
		}
		
		

		var indentSalePreviousBalance = $("#indentSalePreviousBalance").val();

		var txtCDAmt = $("#txtCDAmt").val();

		var txtIndentNo = 0;
		if ($('#txtIndentNo').val() != null && $('#txtIndentNo').val() != "") {
			txtIndentNo = $("#txtIndentNo").val();
		} else {
			alertify.error("Enter IndentNo No");
			$('#txtIndentNo').focus();
			return false;
		}
		var saleType = 0;
		if ($("input[name=indentSaleType]").is(":checked")) {
			saleType = $("input[name=indentSaleType]:checked").val();
		} else {
			alertify.error("Please select Type Sale On MRP/Sale On Cost Prise");
			return false;
		}

		var paymentMode = 0;
		if ($("input[name=indentBillMode]").is(":checked")) {
			paymentMode = $("input[name=indentBillMode]:checked").val();
		} else {
			alertify.error("Please select Type cash/credit");
			return false;
		}

		var txtTax5 = 0;
		if ($('#hiddenTax5').val() != null && $('#hiddenTax5').val() != "") {
			txtTax5 = $('#hiddenTax5').val();
		}

		var txtTax55 = 0;
		if ($('#hiddenTax55').val() != null && $('#hiddenTax55').val() != "") {
			txtTax55 = $('#hiddenTax55').val();
		}

		var txtTax12 = 0;
		if ($('#hiddenTax12').val() != null && $('#hiddenTax12').val() != "") {
			txtTax12 = $('#hiddenTax12').val();
		}

		var txtTax0 = 0;
		if ($('#hiddenTax0').val() != null && $('#hiddenTax0').val() != "") {
			txtTax0 = $('#hiddenTax0').val();
		}

		var txtTax6 = 0;
		if ($('#hiddenTax6').val() != null && $('#hiddenTax6').val() != "") {
			txtTax6 = $('#hiddenTax6').val();
		}

		var txtTax135 = 0;
		if ($('#hiddenTax135').val() != null && $('#hiddenTax135').val() != "") {
			txtTax135 = $('#hiddenTax135').val();
		}

		var totalRow = $("#RowCount").val();

		if (totalRow.length < 1) {
			alert("Enter Only Valid data");

			return false;
		}

		var bankName = "";
		if ($('#txtBankName').val() != null && $('#txtBankName').val() != "") {
			bankName = $("#txtBankName").val();
		} else {
			bankName = "";
		}

		var chequeNum = "";
		if ($('#txtChequeNo').val() != null && $('#txtChequeNo').val() != "") {
			chequeNum = $("#txtChequeNo").val();
		} else {
			chequeNum = "";
		}
		
		var txtCardNo = "";
		if ($('#txtCardNo').val() != null && $('#txtCardNo').val() != "") {
			txtCardNo = $("#txtCardNo").val();
		} else {
			txtCardNo = "";
		}
		
		
		var comment = "";
		if ($('#txtComment').val() != null && $('#txtComment').val() != "") {
			comment = $("#txtComment").val();
		} else {
			comment = "";
		}

		var materiallist = {
			indentSaleSlaves : []
		};
		var totalremains  = 0.0;
		var totalAmttorec =parseFloat(txtAmtRec);
		
		for ( var i = 1; i < totalRow; i++) {
			if ($("#hiddenProductId" + i).val() != null
					&& $("#hiddenProductId" + i).val() != "") {
				var batchId = 0;
				var productId = 0;
				if ($("#textBatchId" + i).val() != null
						&& $("#textBatchId" + i).val() != "") {
					batchId = $("#textBatchId" + i).val();
				} else {
					alertify.error("Please select Batch");
					$("#textBatch" + i).focus();
					return false;
				}

				if ($("#hiddenProductId" + i).val() != null
						&& $("#hiddenProductId" + i).val() != "") {
					productId = $("#hiddenProductId" + i).val();
				} else {
					alertify.error("Please select Product");
					$("#hiddenProductId" + i).focus();
					return false;
				}

				var batchCode = $("#textBatchNo" + i).val();

				var batchExpiry = $("#textExpiry" + i).val();

				var mrp = $("#textMrp" + i).val();

				var rate = $("#textLastPurRate" + i).val();

				var qty = $("#textQty" + i).val();
				if (qty == "" || qty == 0) {

					alertify.error("Please Enter Proper Quantity");
					$("#textQty" + i).focus();
					return false;
				}

				var vat = 0.0;

				vat = $("#textVat" + i).val();
				
				
				
				var txtUnit = $("#textUnit" + i).val();

				var amt = $("#textAmount" + i).val();

				var ratePerUnit = 0;

				if ($("#textRatePerUnit" + i).val() != null
						&& $("#textRatePerUnit" + i).val() != '') {
					ratePerUnit = $("#textRatePerUnit" + i).val();
				}
				var dispenceQty = 0;
				if ($("#textIssueQty" + i).val() != null
						&& $("#textIssueQty" + i).val() != '') {
					dispenceQty = $("#textIssueQty" + i).val();
				}

				var disc = 0;
				if ($("#textDis" + i).val() != null
						&& $("#textDis" + i).val() != '')
					disc = $("#textDis" + i).val();

				var counterSlaveVatAmt = 0;
				if ($("#textcounterSlaveVatAmt" + i).val() != null
						&& $("#textcounterSlaveVatAmt" + i).val() != '')
					counterSlaveVatAmt = $("#textcounterSlaveVatAmt" + i).val();

				
				var discAmt = 0;
				if ($("#textDisAmtPerQty" + i).val() != null
						&& $("#textDisAmtPerQty" + i).val() != '')
					discAmt = $("#textDisAmtPerQty" + i).val();
					
				var amtRecFlag="";
				if($("#amountGroup"+i).is(':checked')){
					amtRecFlag="Y";
					totalremains = totalremains + parseFloat(amt);
					
				}
				else
					amtRecFlag="N";

				materiallist.indentSaleSlaves.push({
					indentSaleSlaveBatchCode : batchCode,
					indentSaleSlaveBatchExpiry : batchExpiry,
					indentSaleSlaveMrp : mrp,
					indentSaleSlaveRate : rate,
					indentSaleSlaveQty : qty,
					indentSlaveDis : disc,
					indentSaleSlaveAmt : amt,
					indentSaleSlaveBatchId : batchId,
					indentSlaveVat : vat,
					
					indentlaveunit : txtUnit,
					indentSlaveRatePerUnit : ratePerUnit,
					indentSlaveVatAmt : counterSlaveVatAmt,
					indentSlaveDisAmt : discAmt,
					indentSaleSlaveIssueQty : dispenceQty,
					amtReceiveFlag:amtRecFlag,
					productMaster : {
						'productId' : productId,
						'batchMaster' : [ {
							'batchId' : batchId,
							'stockMaster' : {
								'stockId' : $("#textStockId" + i).val(),
								'stockQtyInHand' : $("#textStockQtyInHand" + i)
										.val()
							}
						} ]
					}
				});
			}
		}
		
		totalremains = totalremains - totalAmttorec;
		/*alert("amt remaining amt after :"+totalremains);
		alert("amt received :"+totalAmttorec);
		return false;*/
		
		if (materiallist.indentSaleSlaves.length < 1) {
			alert("Please Enter Valid Data");
			return false;
		}

		materiallist = JSON.stringify(materiallist);

		var inputs = [];

		// General Info
		inputs.push("indentSaleSlaves=" + materiallist);
		/* inputs.push("txtDate=" + txtDate); */

		inputs.push("txtTax5=" + txtTax5);
		inputs.push("txtTax55=" + txtTax55);

		inputs.push("txtTax12=" + txtTax12);
		inputs.push("txtTax0=" + flag);

		inputs.push("txtCN=" + txtCN);
		inputs.push("txtCD=" + txtCD);
		inputs.push("txtCDAmt=" + txtCDAmt);
		inputs.push("txtCNAmt=" + txtCNAmt);
		inputs.push("txtAdd=" + txtAdd);
		inputs.push("txtGrossAmt=" + txtGrossAmt);
		inputs.push("txtLess=" + txtLess);

		inputs.push("txtDocNo=" + txtDocNo);
		inputs.push("txtDate=" + txtDate);
		inputs.push("txtNarration=" + txtNarration);
		inputs.push("txtNetAmt=" + txtNetAmt);
		inputs.push("txtRound=" + txtRount);
		inputs.push("saleFrom=indentSale");
		inputs.push("txtSpecialDisc=" + txtSpecialDisc);
		inputs.push("txtSurcharge=" + txtSurcharge);
		inputs.push("txtAmtRec=" + txtAmtRec);
		inputs.push("txtAmtBal=" + txtAmtBal);//totalremains
		//inputs.push("txtAmtBal=" + totalremains);
		inputs.push("indentSalePreviousBalance=" + indentSalePreviousBalance);
		inputs.push("paymentMode=" + paymentMode);
		inputs.push("txtIndentNo=" + txtIndentNo);
		inputs.push("saleType=" + saleType);
		inputs.push("bankName=" + bankName);
		inputs.push("chequeNum=" + chequeNum);
		inputs.push("comment=" + comment);
		inputs.push("txtTax6=" + txtTax6);
		inputs.push("txtTax135=" + txtTax135);
		inputs.push("txtCategoryId=" + categoryId);
		inputs.push("txtCardNo=" + txtCardNo);
		
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str,
					/* url : "../indent/sampleTest", */
					//10 june 20
					url : "../../pharmacy/indentSale/saveIndentSale",
					//url : "../common/saleType",
					catche : false,
					error : function() {
						$("#saveBtn").show();
						alert("oops something went wrong related to stock please save proper data or check mrp");
					},
					success : function(r) {

						if (r.result == 'error') {
							alert(r.result);
						} else {
							alert("Record saved successfully..!");
							/*window.open(
									"/EhatEnterprise/pharmacy/indentSale/printView?indentSalelId="
											+ r.id, '_blank');*/
							indentSalePrint(r.id);

						}
						location.reload(true);
					}
				});
	}

}

function resetIndentValues() {
	$('#indentSales').find('input:text').val('');
	$('#indentSales').find('input:hidden').val('');
	$('#txtInwardNumber').val('');
	// $('#searchBranch').val('');
}

function calculateDisc() {
	var pendingAmount = 0;
	var amtReceive = 0;
	var discount = 0;

	if ($('#pendingAmount').val() != null && $('#pendingAmount').val() != "")
		pendingAmount = parseFloat($('#pendingAmount').val());

	if ($('#amountReceive').val() != null && $('#amountReceive').val() != "")
		amtReceive = parseFloat($('#amountReceive').val());

	if ($('#discount').val() != null && $('#discount').val() != "")
		discount = parseFloat($('#discount').val());

	if (pendingAmount > 0 && pendingAmount >= (amtReceive + discount)) {
		var result = pendingAmount - (amtReceive + discount);
		$('#amountBalance').val((result).toFixed(2));
	} else {
		alert("Amount Receive is less than Amount Balance");
		$('#amountReceive').val('');
		$('#amountReceive').focus();
	}

}

function autoSuggestionForPateintNameIndentSale1(inputID, typeauto) {

	var typeOfpatient = 'diagnosis';
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {

						// alert(r.length);
						var availableTags = [];

						ajaxResponse = eval('(' + r + ')');

						for ( var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

							availableTags
									.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
											+ " "
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName
											+ " "
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName
											+ "__"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
											+ "_"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
											+ "_"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo);
						}

						var template = "";
						for ( var j = 0; j < availableTags.length; j++) {
							var arrValue = (availableTags[j]).split("__");
							var idValue = (arrValue[1]);
							resultData.push({
								ID : idValue,
								Name : arrValue[0]
							});

							template = template + '<li data-value="'
									+ (arrValue[1]) + '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}

						$("#div" + inputID + " .typeahead").html(template);

						setTimeout(
								function() {
									$('#' + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult1,
										scrollBar : true,

									});
									$("#txtPatientName1").data('typeahead').source = resultData;
								}, 500);

					}
				});

	}

}

function displayResult1(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId').val(content[0]);

}

function setAutoPatientName(inputID, onload, callFrom) {
	// alert("HHHHI");
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "pharma_indent_sale_list") {
		auto = 'PatientName';
	} else if (callFrom == "OPDOldPatientDatabase") {
		auto = 'OPDManagementPatient';
	} else if (callFrom == "IPD_BedWardPatientDatabase") {
		auto = 'ipdbedward';
	} else if (callFrom == "IPD_OldPatientDatabase") {
		auto = 'ipdPatient';
	} else if (callFrom == "IPD_Bill_PatientDatabase") {
		auto = 'IPDBillPatient';
	} else if (callFrom == "Diagno_PatientBillDatabase") {
		auto = 'DigonosticPatient';
	} else if (callFrom == "MarkVisit_Database") {
		auto = 'MarkVisitPatient';
	} else if (callFrom == "previousOPDbill") {
		auto = 'PreviousOPDBillPatient';
	} else if (callFrom == "IPD_AdvanceDatabase") {
		auto = 'IPDAdvance';
	} else if (callFrom == "Consentform_Database") {
		auto = 'Consentform';
	} else if (callFrom == "Manage_ReferenceDatabase") {
		auto = 'Manage_Reference';
	} else if (callFrom == "OPDDoctorDesk_Dashboard") {
		auto = 'OPDDoctorDesk';
		autoType = inputID.substring(5);
	} else if (callFrom == "OperationDashboard") {
		auto = 'ManageOperationPatient';
	} else if (callFrom == "OperationSummaryDashboard") {
		auto = 'previousOperation';
	} else if (callFrom == "prevIPD_BillDatabase") {
		auto = 'preIPDBillPatient';
		autoType = 'g';
	} else if (callFrom == "BillingRegister") {
		auto = 'preIPDBillPatient';
		autoType = 'c';
	} else if (callFrom == "Pharmacy_Invoice") {
		auto = 'ipdPatient';
	} else if (callFrom == "CardioAssignTestPatientDatabase") {
		auto = 'CardiologyAssignPatient';
		// Auto Suggetion for Admin Model
	} else if (callFrom == "UserMgmt_Database"
			|| callFrom == "User_Access_Mgmt" || callFrom == "HRMgmt_Database") {
		auto = 'UserName';
	} else if (callFrom == "HallType_Management") {
		auto = 'HallTypeName';
	} else if (callFrom == "BedWard_Management") {
		auto = 'HallName';
	} else if (callFrom == "ChartMgmt_Database") {
		auto = 'ChartName';
	} else if (callFrom == "PhysiotherapyTest") {
		auto = 'PhysioTestName';
	} else if (callFrom == "DentalService_Database") {
		auto = 'DentalService';
	} else if (callFrom == "CasualityService_Database") {
		auto = 'CasualityTestName';
	} else if (callFrom == "OTandIPDservice_Database") {
		auto = 'IpdService';
		testType = $("#testType").val();
		if (testType == "bed") {
			autoType = 'b';
		} else if (testType == "gas") {
			autoType = 'g';
		} else if (testType == "instrument") {
			autoType = 'i';
		}
	} else if (callFrom == "NursingStation_BedSideProcedures") {
		auto = 'IpdService';
		autoType = 'b';
	} else if (callFrom == "NursingStation_GasesMonitors") {
		auto = 'IpdService';
		autoType = 'g';
	} else if (callFrom == "NursingStation_Instruments") {
		auto = 'IpdService';
		autoType = 'i';
	} else if (callFrom == "InvestigationTest") {
		auto = 'Investigation_Test';
	} else if (callFrom == "InvestigationTestGroup") {
		auto = 'Invest_Test_Group';
	} else if (callFrom == "InvestigationBodyPart") {
		auto = 'Invest_Body_Part';
	} else if (callFrom == "prev_databaseForConsentForm") {
		auto = 'prev_databaseForConsentForm';
	} else if (callFrom == "OPD_Appoinment") {
		auto = 'PatientName';
	}
	/*
	 * else if (callFrom == "OPD_Appoinment") { //alert("in OPDAppoinment's
	 * condition "); auto = 'AutoPatientNameforAppointment'; }
	 */

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../../AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
				//	alert('error');
				},
				success : function(r) {
					ajaxResponse = decodeURIComponent(r);
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					// alert(availableTags);
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

					setTimeout(function() {// alert(template);
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
					}, 1000);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);
		$("#byName").val((item.text).trim());
		var content = item.value.split("-");
		$('#hiddenPatientId').val(content[0]);

	}

}


function displayPendingPopUp() {
	$("#Indent_Sales_pending_data").show();
	/* $("#indentPendingPrint").hide(); */
	fetchPendingPatientData();
}

function fetchIndentDetailsByDate(date) {
	//alert("hiiii");
	var indentDate = date;
	if (indentDate != '') {
		var inputs = [];
		inputs.push('date=' + indentDate);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/getIndentDetailsByDate",
			timeout : 2000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				$("#Indent_Sales_Data_Form").show();
				setDropDown(r);

			}
		});
		return true;
	}
}

/****
 * @author   :Bilal
 * @Date     :11-12-2017
 * @Code     :For patient search
 * *****/
function fetchIndentDetailsByPatientName(id) {
	
	var findingName = $("#particular3").val();
	
		var inputs = [];
		inputs.push('findingName=' + findingName);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/fetchIndentDetailsByPatientName2",
			timeout : 2000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				
				setIndentPatientSearch(r,id) ;
			}
		});
		return true;
	
}
/****
 * @author   :Bilal
 * @Date     :11-12-2017
 * @Code     :For patient search
 * *****/

function setIndentPatientSearch(response,id) {
    
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


	$("#" + id).mcautocomplete(
			{
				
				showHeader : true,
				columns : [ {
					name : 'patientName',
					width : '150px',
					valueField : 'patientName'
				},{
					name : 'IndentDrName',
					width : '150px',
					valueField : 'indentusername'
				},{
					name : 'indentreceivedfrom',
					width : '150px',
					valueField : 'indentreceivedfrom'
				}],

				select : function(event, ui) {
				
					
						$('#particular3').val(ui.item.patientName);
						$("#hiddenTreId").val(ui.item.indenttreatementid);
						
						$("#txtIndentNo").val(ui.item.indentid);
						$("#txtDrName").val(ui.item.indentusername);
						$("#txtMobileNumber").val(parseInt(ui.item.mobile));
						
						$("#indentGenerateDate").val(getDate(ui.item.indentgenerateddate));
						fetchPatientData(ui.item.indenttreatementid);
						fetchBalanceAmount(ui.item.indentid);
					
						$('#textProductName1').focus();
						fetchSponserData(ui.item.indenttreatementid);
						
						fetchSponserStatus(ui.item.indenttreatementid);
						getIndentDataById2(ui.item.indentid);
						//fetchIndentIds(ui.item.indenttreatementid);
					return false;
					
				},

			
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
				
					console.log(data.listPatientPharmaDetails.length);
					var result;
					if (!data || data.listPatientPharmaDetails.length === 0 || !data.listPatientPharmaDetails
							|| data.listPatientPharmaDetails.length === 0) {
						
						result = [ {
							
							'patientName' : 'NO',
							'indentreceivedfrom' : 'Match',
							
						} ];
					} else {
						result = data.listPatientPharmaDetails;
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}
/****
 * @author   :Bilal
 * @Date     :11-12-2017
 * @Code     :For patient search
 * *****/
function fetchIndentIds(indenttreatementid){
	var inputs = [];
	inputs.push('indenttreatementid=' + indenttreatementid);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/indentSale/fetchIndentIds",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			for ( var i = 0; i < r.listPatientPharmaDetails.length; i++) {
				getIndentDataById2(r.listPatientPharmaDetails[i].indentid);
			}

		}
	});


}
/****
 * @author   :Bilal
 * @Date     :11-12-2017
 * @Code     :For patient search
 * *****/
function getIndentDataById2(indentid) {
	
		var inputs = [];
		inputs.push('indentId=' + indentid);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/getIndentDataById",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				//console.log(r);
				setTableContent(r.ltIndentSlave);

			}
		});

}

/*********/
function fetchPendingPatientData() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "../../pharmacy/indentSale/getAllPatientData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setAllPateintData(r);
			
		}
	});
	return true;

}

function setAllPateintData(r) {

	var divContent = "";
	divContent = divContent
			+ "<select name='patientPendingIndentData' onchange='displayAllIndent(this.value)' style='width: 100%'><option value='0'>Select Patient</option>";
	
	for ( var i = 0; i < r.length; i++) {
		
		divContent = divContent + "<option value='" + r[i].treatmentId + "'>"
				+ r[i].patientName + "-" + r[i].patientMobileNumber + "-"
				+ r[i].treatmentId + "</option>";

	}
	divContent = divContent + "</select>";
 
	$("#patientData1").html(divContent);
	
}

function displayAllIndent(value) {

	$('#hiddenTreatmentId').val(value);

	var inputs = [];
	inputs.push('treatmentId=' + value);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/indentSale/getAllIndentDataByTreatmentId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					settalBillData();
					hospitalPaymentData();
					setAllIndentData(r);
					displayPendingAmountByTreatmentId(value);
				}
			});
	return true;
	location.reload(true);
}

function settalBillData() {

	var treatmentId = $('#hiddenTreatmentId').val();
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/getAllSettalBillTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						if (r != "") { /* alert(r); */
							setBillData(r);
						}
					}
				});

		return true;
	} else {
		$("#indentSettalBill").html("");
	}

}

function setBillData(r) {

	var divContent = "";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Bill id</th><th>Amount Balance</th><th>Amount Receive</th><th>Discount</th><th>Narration </th> <th>Final Date</th><th>Print</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {

		var receive = "";
		if (r[i].amountReceive != null && r[i].amountReceive != '') {
			receive = r[i].amountReceive;
		}
		if (receive > 0) {
			var balance = "";
			if (r[i].amountBal != null && r[i].amountBal != '') {
				balance = r[i].amountBal;
			}

			divContent = divContent
					+ "<tbody><tr><td>"
					+ r[i].historyId
					+ "</td><td>"
					+ balance
					+ "</td>  <td> "
					+ receive
					+ "</td>  <td>"
					+ r[i].discount
					+ "</td>  <td>"
					+ r[i].narration
					+ "</td>  <td id='historyId"
					+ r[i].historyId
					+ "' style='display:none' value='"
					+ r[i].historyId
					+ "' ><td>"
					+ r[i].finalAmt
					+ "</td><td><a  class='btn btn-xs btn-info' href='../../pharmacy/indentSale/printFinalView?treatmentId="
					+ r[i].historyId + "'>Print</a></td></tr></tbody>";
		}
		// location.reload(true);
	}
	divContent = divContent + "</table>";

	$("#indentSettalBill").html(divContent);

}

function displayPendingAmountByTreatmentId(treatmentId) {
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('spId=0');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/getPendingAmountByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						res = r.split("#");
						r = res[0];
						if (r != null && r != '' && r != 'null') {
							r=parseFloat(r)<0 ? (parseFloat(r)*-1) : parseFloat(r);
							$("#pendingAmount").html(r);
							$("#pendingAmount").val(r);
						} else
							$("#pendingAmount").html("NO pending Available");
					}
				});
		return true;
	}
}

function calculatePending() {
	var netAmt = 0;
	var amtReceive = 0;
	//var prevBal = 0;

	if ($('#txtNetAmt').val() != '' && $('#txtNetAmt').val() != null)
		netAmt = parseFloat($('#txtNetAmt').val());

	if ($('#txtAmtRec').val() != '' && $('#txtAmtRec').val() != null)
		amtReceive = parseFloat($('#txtAmtRec').val());

	/*if ($('#mainPendingBalance').html() != ''
			&& $('#mainPendingBalance').html() != null)
		prevBal = parseFloat($('#mainPendingBalance').html());*/

	var total = /*(prevBal +*/ netAmt - amtReceive;
	$('#txtAmtBal').val(total.toFixed(2));

}

function generatePrint() {
	var hiddenTreatmentId = $('#hiddenTreatmentId').val();
	var inputs = [];
	inputs.push('treatmentId=' + hiddenTreatmentId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/indentSale/printFinalView",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			window.open();

		}
	});
}

function saveIndentPendingData() {

	var hiddenTreatmentId = $('#hiddenTreatmentId').val();

	var list = {
			lstPharmaIndentAmountHistory : []
	};	
		
	$("#indentPendingData").find('input[name="chksalesBillId"]:checked').each(function() {
		if ($(this).is(":checked")) {
			var billId = $('#' + this.id).val();
			var receiveAmt = $('#receiveAmt'+billId).text();
			var amountBIllNet = $('#amountBIllNet'+billId).text();
			var discount = $('#discount'+billId).val();
			var amountBal = $('#amountBal'+billId).text();
			var narration = $('#narration'+billId).val();
			var payAmt = $('#payAmt'+billId).val();
			
			list.lstPharmaIndentAmountHistory.push({
				"idpharmaIndentAmountHistoryId" : 0,
				"treatmentId" :hiddenTreatmentId,
				"amountReceive" : receiveAmt,
				"discount" : discount,
				"narration" : narration,
				"amountBalance" : amountBal,
				"returnFlag" : "N",
				"indentSaleBillMasterId":billId
			});
		}
	});

	var listStr = JSON.stringify(list);
		var inputs = [];
		inputs.push('treatmentId=' + hiddenTreatmentId);
		inputs.push('listStr=' + encodeURIComponent(listStr));
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/saveIndentPendingAmount",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {

						alert("save successfully");
						/* generatePrint(); */
						window
								.open("../../pharmacy/indentSale/FinalView?treatmentId="
										+ hiddenTreatmentId + "");
						$("#Indent_Sales_pending_data").hide();
						$("#amountReceive").val("");
					}
				});
		location.reload(true);
}

function setAllIndentData(r) {
	/* $("#indentPendingPrint").show(); */
	var divContent = "";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Indent Generate Date</th><th>Net Amount</th><th>Amount Received </th> <th>Discount</th><th>Amount Balance</th><th>Narration</th><th>Pay Now</th><th style='width: 66px;' >Select <input id='allChksalesBillId'  type='checkbox' onclick='setAllCheckIndentSale()'></th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {
		
		var discount = "";
		if (r[i].discount != null
				&& r[i].discount != '') {
			discount = r[i].discount;
		}
		else{
			discount = 0;
		}
		var receive = "";
		if (r[i].amountReceive != null
				&& r[i].amountReceive != '') {
			receive = r[i].amountReceive;
		}
		else{
			receive = 0;
		}
		if(r[i].historyId == 0){
			var balance = "";
			if (r[i].amountBal != null
					&& r[i].amountBal != '') {
				balance = r[i].amountBal;
			}
			else{
				balance = r[i].indentSaleAmountBalance;
			}
		}
		else{
			if (r[i].amountBal != null
					&& r[i].amountBal != '') {
				balance = r[i].amountBal;
			}
		}
		
		
	
	   
	    if(balance>0){
			divContent = divContent + "<tr>" 
			
			+"<td>"+ getDate(r[i].indentMaster.indentGenerateDate)+ "</td> " 
			+"<td id='amountBIllNet"+ r[i].indentSalelId +"'>" + r[i].indentSaleNetAmt + "</td>"
			+"<td id='receiveAmt"+ r[i].indentSalelId +"'>" + receive + "</td><input type='hidden' id='finalRecAmt"+r[i].indentSalelId+"' value='"+ (receive) + "'>";
			
			if(discount > 0)
				divContent +="<td><input type='text' id='discount"+r[i].indentSalelId+"' value='"+ discount +"' disabled></td>" 
			else
				divContent +="<td><input type='text' id='discount"+r[i].indentSalelId+"'onkeyup='setTotalAmount("+ r[i].indentSalelId +", \"discount\")' value='"+ discount +"'></td>" +
						"<input type='hidden' id='finaldiscount"+r[i].indentSalelId+"' value='"+discount+"' >" 
				
			divContent +="<td id='amountBal"+ r[i].indentSalelId +"'>" + (balance) + "</td>"
			+"<input type='hidden' id='finalBalAmt"+r[i].indentSalelId+"' value='"+ (balance) + "'>" 
			+"<td><input type='text' id='narration"+r[i].indentSalelId+"'></td>" 

			if(r[i].historyId > 0)
				divContent +="<td><input type='text' id='payAmt"+r[i].indentSalelId+"'  onkeyup='setTotalAmount("+ r[i].indentSalelId +", \"partialtotal\")' value='0'></td>"
				+ "<td><input name='chksalesBillId' id='chksalesBillId"+r[i].indentSalelId+"'   type='checkbox' value='"+ r[i].indentSalelId +"' onclick='setFullPartialPayment("+r[i].indentSalelId+")'></td>";
			else
				divContent +="<td><input type='text' id='payAmt"+r[i].indentSalelId+"'  onkeyup='setTotalAmount("+ r[i].indentSalelId +", \"total\")' value='0'></td>" 
				+ "<td><input name='chksalesBillId' id='chksalesBillId"+r[i].indentSalelId+"'   type='checkbox' value='"+ r[i].indentSalelId +"'></td>";
				
			divContent +="<input type='hidden' id='historyIdd"+r[i].indentSalelId+"' value='"+r[i].historyId+"'>" 
			+"</tr>";

	    }

	}
	divContent = divContent + "</table>";

	$("#indentPendingData").html(divContent);

}
function setTotalAmount(id, callfrom)
{
	var discount = 0;
	var payNow = 0;
	var amountRec = 0;
	var amountBIllNet = $('#amountBIllNet'+id).text();
	var amountBal= $('#finalBalAmt'+id).val();
	discount = $('#discount'+id).val();
	returnAmtFinal = $('#return'+id).text();

	var actualAmountBal= $('#amountBal'+id).text();
	
	var totalAmtAfterdisc = 0;
	
	if(callfrom == 'discount')
	{
		 discount = $('#discount'+id).val();
		 var payAmt = $('#payAmt'+id).val();
		 
		 var historyIdd = $('#historyIdd'+id).val();
		 
		 if(historyIdd > 0)
			 amountBIllNet = $('#finalBalAmt'+id).val();
		
		 if(payAmt == 0)
		 {
			 totalAmtAfterdisc = Number(amountBIllNet) - Number(discount);
		 } else {
			 totalAmtAfterdisc = Number(amountBIllNet) - (Number(discount) + Number(payAmt));
		 }
		 
		 if(Number(totalAmtAfterdisc) < 0)
		 {
				alert('discount amount could not be greater')
		 		return false
		 }
		 
		 $('#amountBal'+id).text(totalAmtAfterdisc);
		 $('#totalAmtAfterdisc'+id).text(payAmt)
	 
	} else if(callfrom == 'partialtotal') {

		payNow = $('#payAmt'+id).val();
		var finalBalAmt =  $('#finalBalAmt'+id).val()
		 
		if(Number(finalBalAmt) < Number(payNow))
		{
			alert('Not allowed')
			return false
		}

		var finalreceiveAmt = $('#finalRecAmt'+id).val()
		var finalPayAmt = Number(finalBalAmt) - Number(payNow);
		
		var totalfinalPayAmt = Number(finalreceiveAmt) + Number(payNow);

		$('#receiveAmt'+id).text(totalfinalPayAmt)
		$('#amountBal'+id).text(finalPayAmt)
	} else {
		
		var receiveAmt = $('#finalBalAmt'+id).val()
		var amountBIllNet = $('#amountBIllNet'+id).text();
		var substrAmt = Number(amountBIllNet) - Number(receiveAmt);
		
		var payAmt = 0;
		var totalBal = 0;
		payAmt = $('#payAmt'+id).val();
		
		if(substrAmt == 0)
		{
			 totalBal = Number(amountBIllNet) - (Number(payAmt) + Number(discount));

			if(totalBal < 0)
			{
				alert('discount amount could not be greater')
				return false;
			}
			 
			$('#receiveAmt'+id).text(payAmt)
			
		} else {
			
			if(payAmt > Number(receiveAmt))
			{
				alert('Not allowed')
				return false;
			}
			
			totalBal = Number(amountBIllNet) - (Number(payAmt) + substrAmt-Number(discount));
			var payAmtFinal = Number(payAmt) + Number(substrAmt)-Number(discount);
			$('#receiveAmt'+id).text(payAmtFinal)
		}
		$('#amountBal'+id).text(totalBal)
	}
	
}

function closePop() {
	$("#Indent_Sales_Data_Form").hide();
}

function HideCommentPopUp() {

	$("#close_indent_pop_up").hide();
	$("#txtComment").val('');
}

function splitIndentSale(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtInwardNumber').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenIndentSaleId').val(arr[1]);

		}
	} else {
		$('#hiddenIndentSaleId').val(0);

	}
}


function splitIndentSaleByName(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtPatientName1').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenIndentSaleId').val(arr[0]);

		}
	} else {
		$('#hiddenIndentSaleId').val(0);

	}
}

function splitIndentSaleByName1(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtPatientName23').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenIndentSaleId').val(arr[0]);

		}
	} else {
		$('#hiddenIndentSaleId').val(0);

	}
}

function setDropDown(result) {

	var r = jQuery.parseJSON(result);

	var divContent = "";
	var ivfflag="";

	divContent = divContent

			+ "<div class='col-md-10-1' style='margin-top:0px;'><table  class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><tr><th>Indent No</th><th>Patient Name- IPD/OPD</th><th>Generated From</th><th>Store Name</th><th>Ward Name</th><th>Patient Type</th><th>Cancel</th></tr></thead><tbody id='indentDetailsTable' >";

	if (r.length > 0)
		for ( var i = 0; i < r.length; i++) {
		if(	 result.patientType=='undefined' ||  result.patientType=='null'||  result.patientType==undefined){
			var patientType="";
		}
			var result = r[i];
			divContent = divContent
					+ "<tr class='"
					+ result.IndentId
					+ "'><td id='indentId"
					+ i
					+ "' class='"
					+ result.IndentId
					+ "'>"
					+ result.IndentId
					+ "</td><td class='"
					+ result.IndentId
					+ "'>"
					+ result.patientName
					+ "</td><td class='"
					+ result.IndentId
					+ "'>"
					+ result.receivedFrom
					+ "</td><td class='"
					+ result.IndentId
					+ "'>"
					+ result.storeName
					+ "</td><td class='"
					+ result.IndentId
					+ "'>"
					+ result.wardName
					+ "</td><td class='"
					+ result.IndentId
					+ "'>"
					+ result.categoryName
					+ "</td><th><button type='button' id='btnCloseTreatment' class='btn btn-xs btn-danger' data-placement='left' onclick='addComment("
					+ result.IndentId
					+ ")' ><i class='fa fa-times'></i></button></th>" 
					/*+ "<input type='hidden' id='ivfFlag"+ result.IndentId
					+ "' value='"+ ivfflag + "' />" +*/
					+ "</tr>";
		}
	else
		divContent = divContent + "<tr><td colspan='6'>No Record Found</td>";

	divContent = divContent
			+ "</tbody></table>"

			/*
			 * + "<button style='margin-left:5%;' onclick='getIndentDataById()'
			 * id='getIndentData' type='button' class='btn btn-xs
			 * btn-success'>Get Data</button>"
			 */
			+ "<button style='margin-left:5%;'  onclick='closePop();'  id='getId' type='button' class='btn btn-xs btn-success'>Close</button></div>";

	$("#ipdData").html(divContent);

}

function addComment(id) {
	$("#indentId").val(id);
	$("#indentSaleData").val(id);
	$("#close_indent_pop_up").show();

}

function saveComment() {

	var narration = $('#txtComment').val();
	var indentId = $("#indentId").val();
	var inputs = [];
	inputs.push('narration=' + narration);
	inputs.push('indentId=' + indentId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/indentSale/saveIndentComment",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			alert("indent is close successfully");
			$("#txtComment").val('');
		}
	});

	$("#close_indent_pop_up").hide();

}

$(document).on("click", "#indentDetailsTable tr td", function() {
	var value = $(this).attr("class");

	getIndentDataById(value);
});

function getIndentDataById(value) {
	/* var indentId = $('#selectIndentId').val(); */

	/* var indentId = $("input[name=row]:checked").val(); */
	var indentId = value;
	/*
	 * if(indentId==undefined) { alert("Select Indent id"); }
	 */

	/* var indentId = indentId; */
	if (indentId != '' && indentId.length > 0 && indentId != null) {
		var inputs = [];
		inputs.push('indentId=' + indentId);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/getIndentDataById",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {

				fillFormData(r);

			}
		});
		return true;
	} else {

	}

}

function validationsOfQty() {

	var qty = parseInt($('#txtQty').val());
	var curStock = parseInt($('#txtClStk').val());

	if (qty > curStock) {
		alert("Quantity is less than current Stock");
	}

}

function validateSpeDiscount() {
	var speDis = parseFloat($('#txtSpecialDisc').val());
	var cdAmt = parseFloat($('#txtCDAmt').val());
	if (speDis > 0) {
		if (cdAmt >= speDis) {
			alert("Special discount should be greater than CD Amount!");
			$('#txtSpecialDisc').val('');
			$('#txtLess').val('0');
			$('#txtSpecialDisc').focus();
		} else
			calculateDiscount();
	}
	validateLess();
}

function CheckDis() {
	var cd = parseFloat($('#txtCD').val());
	if (cd > 100) {
		alert("CD% should be less than 100");
		$('#txtCD').val('');
		$('#txtCDAmt').val('');
	}
	calculateDiscount();

}
function validateLess() {
	var GrossAmt = parseFloat($('#txtGrossAmt').val());
	var Less = parseFloat($('#txtLess').val());
	if (Less > 0) {
		if (Less >= GrossAmt) {
			alert("Less should be less than gross amount!");
			$('#txtSpecialDisc').focus();
			$('#txtSpecialDisc').val('');
			$('#txtLess').val('0');
			$('#txtCD').val('');
			$('#txtCDAmt').val('');
			$('#txtSurcharge').val('');
			$('#txtAdd').val('0');
			$('#txtNetAmt').val('0');
		}
	}
	calculateNetAmount();
}

function deleteIndent(indentId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		reset();
		alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('indentSaleId=' + indentId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						// getCompanyList();
						if (r == true) {
							/*
							 * $('#resultDiv') .html( "<div class='alert
							 * alert-success' >Record deleted successfully..!</div>");
							 * hideResultDiv();
							 */
							// location.reload(true);
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						window.location.href = "view";
					}
				});

		return true;
	} else {

	}

}

function fillFormData(result) {
	$("#txtIndentNo").val(result.indentId);
	
	$("#hiddenTreId").val(result.indentTreatmentId);
	$("#indentGenerateDate").val(getDate(result.indentDate));
	fetchPatientData(result.indentTreatmentId);
	fetchBalanceAmount(result.indentId);
	setTableContent(result.ltIndentSlave);
	$('#textProductName1').focus();
	fetchSponserData(result.indentTreatmentId);
	
	fetchSponserStatus($('#hiddenTreId').val());

}

var spDisc=0;
function fetchSponserStatus(treatmentId) 
{
	spDisc=0;
	if (treatmentId != '') 
	{
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/getSponserStatus",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) 
			{
				var jsObj =$.parseJSON(r);
				if(jsObj!=null)
					{
					$("#hiddenSponserFlag").val(jsObj.status);
					$("#billCategoryId").val(jsObj.catId);
					
					document.getElementById("demo").innerHTML = "<h5><b><font color='red'>"+jsObj.catgoryName+"</font></b></h5>";
					if($("#applyDisc").val()==0)
					spDisc=jsObj.discount;
					if($("#hiddenSponserFlag").val()=='ACTIVE')
					{
						fetchAllCategoryDisc(treatmentId);
						// fetchMRPType(treatmentId);
						
					}
					
					}
				
			}
		});
		return true;
	}
}

function fetchMRPType(treatmentId)
{
	if (treatmentId != '') 
	{
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/indentSale/getMRPType",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() 
		{
			
		},
		success : function(r) 
		{
			
		if(r=="MRP")
			$("#radioMRP").prop("checked", true);
		else
			$("#radioPurRate").prop("checked", true);
		
		}
	});
	}

}

function fetchAllCategoryDisc(treatmentId)
{
	if (treatmentId != '') 
	{
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/common/getCategorywiseDiscount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) 
		{
			 indentSaleparseData=jQuery.parseJSON(r);
		//	alert(indentSaleparseData.result[0].pharma_category_id);
		}
	});
	}

}




function fetchBalanceAmount(indentId) {
	if (indentId != '') {
		var inputs = [];
		inputs.push('indentNo=' + indentId);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/getPendingAmount",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				r=parseFloat(r)<0 ? (parseFloat(r)*-1).toFixed(2) : parseFloat(r).toFixed(2);
				$("#mainPendingBalance").html(r);
				$("#indentSalePreviousBalance").val(r);

				if (r > 0) {
					$("#showPatientDetail").show();
					$('#patientBal').html('<b>Patient Balance </b>' + r);
					$(function() {
						blinkeffect('#patientBal');

					})
					function blinkeffect(selector) {
						$(selector).fadeOut(
								'slow',
								function() {
									$(this).fadeIn(
											'slow',
											function() {
												blinkeffect(this);
												$('#patientBal').css('color',
														'red').css(
														'font-weight', 'bold');

											});
								});
					}
				} else if (r < 0) {
					$("#showPatientDetail").show();
					$('#patientBal').html('<b>Pharmacy Balance </b>' + r);
					$(function() {
						blinkeffect('#patientBal');

					})
					function blinkeffect(selector) {
						$(selector).fadeOut('slow', function() {
							$(this).fadeIn('slow', function() {
								blinkeffect(this);
								$('#patientBal').css('color', 'red');
							});
						});
					}
				} else {
					$("#showPatientDetail").hide();

				}
				$('#patientBal').css('color', 'red');

			}
		});
		return true;
	}
}

function fetchPatientData(treatmentId) {
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/getPatientDataByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						$("#txtPatient").val(r.patientName);
						$("#txtPatientAddress").val(r.patientAddress);
						$("#txtMobileNumber").val(r.patientMobileNumber);
						$("#txtivfFlag").val(r.ivfFlag);						
						$("#txtDrName").val(r.consultantName);

					}
				});
		return true;
	}
}

function fetchSponserData(treatmentId) {
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/getSponserDataByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						if (r != "")
							$("#txtSponser").val(r.sponserName);

					}
				});
		return true;
	}
}

function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}

var qtyArr=[];
function setTableContent(r) {

	totalRowCount = r.length;
	var divContent = "<input type='hidden' id='hiddenCurrentRow' value=1 />";
	for ( var i = 0; i < r.length; i++) {

		divContent = divContent
				+ " <tr id='remove"
				+ (i + 1)
				+ "'> <td><label class='input-SmallText'>"
				+ (i + 1)
				+ "</label></td>"
				
				+ "<td style='display:none;'><input type='hidden' name='' id='hiddenCategoryId"
				+ (i + 1)
				+ "' />"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textRatePerUnit"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style='display:none;'><input type='hidden' name='indentSaleSlaves["
				+ i
				+ "].productMaster.productId' id='hiddenProductId"
				+ (i + 1)
				+ "' value="
				+ r[i].indentProductId
				+ ">"

				+ "<td style='display:none;'><input type='text' id='textcounterSlaveVatAmt"
				+ (i + 1)
				+ "' name='indentSaleSlaves["
				+ i
				+ "].indentSlaveVatAmt' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td style='display:none;'><input type='hidden' name='indentSaleSlaves["
				+ i
				+ "].indentSlaveRatePerUnit' id='hiddenRatePerUnit"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='hidden' class='form-control input-SmallText'  id='rowDeleteFlag"
				+ (i + 1)
				+ "' readonly='true' value='0'></td>"

				+ "<td style='display:none;'><input type='text' name='indentSaleSlaves["
				+ i
				+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
				+ (i + 1)
				+ "' class='form-control input-SmallText'></td>"

				+ "<td style='display:none;'><input type='text' name='indentSaleSlaves["
				+ i
				+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
				+ (i + 1)
				+ "' class='form-control input-SmallText'></td>"

				+ "<td style='display:none;'><input type='text' name='indentSaleSlaves["
				+ i
				+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
				+ (i + 1)
				+ "' class='form-control input-SmallText'></td>"

				/*
				 * + "<td><input type='text' autocomplete='off'
				 * onblur=isNumber('textBarcode" + (i + 1) +
				 * "'),fetchProductNameByBarcode(this.value," + (i + 1) + ")
				 * class='form-control input-SmallText' id='textBarcode" + (i +
				 * 1) + "' value='"
				 *  + "' tabindex='-1'></td>"
				 */

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textNoDelete' id='textBarcode"
				+ (i + 1)
				+ "'  autocomplete='off' tabindex='1'  maxlength='150' onblur=isNumber('textBarcode"
				+ (i + 1)
				+ "'),fetchProductNameByBarcode(this.value,"
				+ (i + 1)
				+ ")></td>"

				+ "<td><input id='textProductName"
				+ (i + 1)
				+ "' name='indentSaleSlaves["
				+ i
				+ "].productMaster.productName"
				+ "' type='text' tabindex='1' maxlength='25' autocomplete='off'  autofocus='autofocus' class='form-control input-SmallText # deleteGroup"	
				+ (i + 1)
				+ " # textProductName' value='"
				+ "' onclick='load("
				+ (i + 1)
				+ ")' onkeypress='load("
				+  (i + 1)
				+ ")' ></td>"

				+ "<td><input type='text' name=indentSaleSlaves["
				+ i
				+ "].productMaster.productUnit class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' id='textUnit"
				+ (i + 1)
				+ "' readonly='true' value='"

				+ "' tabindex='1'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' name='indentSaleSlaves["
				+ i
				+ "].productMaster.packingMaster.packType' id='textPack"
				+ (i + 1)
				+ "' readonly='true' value='"

				+ "' tabindex='1'></td>"
				
				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' name='indentSaleSlaves["
				+ i
				+ "].productMaster.preparationMaster.preparationName' id='txtPre"
				+ (i + 1)
				+ "' readonly='true' value='"
				+ "' tabindex='1'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName'  name='indentSaleSlaves["
				+ i
				+ "].productMaster.companyMaster.compName' id='textComp"
				+ (i + 1)
				+ "' readonly='true'  value='"

				+ "' tabindex='1'></td>"

				+ "<td>" 
						+"<input type='text'  name='indentSaleSlaves["
				+ i
				+ "].indentSlaveVat'  id='textVat"
				+ (i + 1)
				+ "' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' tabindex='1' readonly='true'>" 
				
				+"<input type='hidden'  name='indentSaleSlaves["
				+ i
				+ "].indentSlaveVatId'  id='hiddenvatId"
				+ (i + 1)
				+ "' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' tabindex='1' readonly='true'>" 
				
						+"</td>"

				+ "<td><input type='text' readonly='true' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' tabindex='1' id='textBatchNo"
				+ (i + 1)
				+ "' name='indentSaleSlaves["
				+ i
				+ "].indentSaleSlaveBatchCode'></td>"
				+ "<td><input type='text' readonly='true' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' tabindex='1' id='textExpiry"
				+ (i + 1)
				+ "' name='indentSaleSlaves["
				+ i
				+ "].indentSaleSlaveBatchExpiry'></td>"

				+ "<td><input type='text' id='textShelf"
				+ (i + 1)
				+ "' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' "
				+ " readonly='true' tabindex='1' ></td>"

				+ "<td><input type='text' id='textMrp"
				+ (i + 1)
				+ "' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' readonly='true' name='indentSaleSlaves["
				+ i
				+ "].indentSaleSlaveMrp' tabindex='1'>"
				/* +" value="+ r[i].productLastMRP+ ">" */
				+ "</td>"

				+ "<td><input type='text' id='textDis"
				+ (i + 1)
				+ "' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName' tabindex='1'  name='indentSaleSlaves["
				+ i
				+ "].indentSlaveDis' >"
				+ "</td>"

				+ "<td style='display:none;'><input type='text'  id='textDisAmt"
				+ (i + 1)
				+ "' class='form-control input-SmallText'  ></td>"

				+ "<td style='display:none;'><input type='text'  id='textDisAmtPerQty"
				+ (i + 1)
				+ "' class='form-control input-SmallText' name='indentSaleSlaves["
				+ i
				+ "].indentSlaveDisAmt' ></td>"

				+ "<td style='display:none;'><input type='text' id='textIssueQty"
				+ (i + 1)
				+ "' name='indentSaleSlaves["
				+ i
				+ "].indentSaleSlaveIssueQty' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName'  id='textClStk"
				+ (i + 1)
				+ "' readonly='true' tabindex='1'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName'  name='indentSaleSlaves["
				+ i
				+ "].indentSaleSlaveQty' id='textQty"
				+ (i + 1)
				+ "' "
				+ " value='"
				+ (parseInt(r[i].indentSlaveRequireQty))
				+ "' onblur='calculateAmt("
				+ (i + 1)
				+ ")' tabindex='1'></td>"

				+ "<td style='display:none;' ><input type='text' id='textLastPurRate"
				+ (i + 1)
				+ "' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName'  name='indentSaleSlaves["
				+ i
				+ "].indentSaleSlaveRate' "
				/* +"value=" + r[i].productLastPurRate+ "" */
				+ " readonly='true' tabindex='1'></td>"

				+ "<td><input value='0' type='text' id='textAmount"
				+ (i + 1)
				+ "' name='indentSaleSlaves["
				+ i
				+ "].indentSaleSlaveAmt' class='form-control input-SmallText # deleteGroup"
				+ (i + 1)
				+ " # textProductName'  tabindex='1' readonly='true'>"

				+ "<td><input type='checkbox' name='deleteGroup' value='"
				+ (i + 1) + "'	id=deleteGroup" + (i + 1) + "><input type='checkbox' name='amountGroup' id='amountGroup" 
				+ (i + 1) 
				+ "'  onclick='calculateGrossAmount()'></td></tr>";
		
				/*+ "<td><input type='checkbox' name='deleteGroup' value='"
				+ (i + 1) 
				+ "'	id='deleteGroup'" 
				+ (i + 1) 
				+ "><input type='checkbox' name='amountGroup' id='amountGroup" 
				+ (i + 1) 
				+ "' checked='checked' onclick='calculateGrossAmount()'></td></tr>";*/

		rowCount = i;
		$("#RowCount").val(i + 1);
		
		qtyArr.push(parseInt(r[i].indentSlaveRequireQty)-parseInt(r[i].indentSlavePendingQty));

		result1 = getProductNameByProductId(r[i].indentProductId, i);

	}
	closePopUp();
	$('#HSTDiv').html(divContent);
	$("#RowCount").val(totalRowCount + 1);
	$('#textProductName1').focus();
}
function calculateAmt(rowCount) {
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	var vatAmt = 0;

	$('#textIssueQty' + rowCount).val($('#textQty' + rowCount).val());
	if ($('#textQty' + rowCount).val() != ''
			&& $('#textQty' + rowCount).val().length > 0)
		qty = parseFloat($('#textQty' + rowCount).val());

	if ($('#textClStk' + rowCount).val() != ''
			&& $('#textClStk' + rowCount).val().length > 0)
		currentStock = parseFloat($('#textClStk' + rowCount).val());

	if (qty <= currentStock) {

		var ratePerUnit = $('#textRatePerUnit' + rowCount).val();
		var finalAmout = parseFloat((ratePerUnit * qty).toFixed(2));
		$('#textAmount' + rowCount).val((finalAmout));

		$('#textAmount' + rowCount).val((finalAmout));

		if ($('#textDisAmt' + rowCount).val() != ''
				&& $('#textDisAmt' + rowCount).val().length > 0) {
			DiscAmt = parseFloat($('textDisAmt' + rowCount).val());
		}

		if ($('#textDis' + rowCount).val() != ''
				&& $('#textDis' + rowCount).val().length > 0) {
			discount = parseFloat($('#textDis' + rowCount).val());
			DiscAmt = (((discount / 100) * finalAmout).toFixed(2));
			$('#textDisAmt' + rowCount).val(DiscAmt);
		}

		if (DiscAmt <= finalAmout)
			$('#textAmount' + rowCount).val((finalAmout - DiscAmt).toFixed(2));
		else {
			$('#textAmount' + rowCount).val((ratePerUnit * qty).toFixed(2));

		}

		var amt = parseFloat($('#textAmount' + rowCount).val());
		val = (Math.floor(1000 * (amt / qty)) / 1000).toFixed(2);

		$('#hiddenRatePerUnit' + rowCount).val(val);

		calculateVatAmount(rowCount);
		calculateGrossAmount();
		calculateTotalPurchase();
	} else {
		alert("Qty should be less than current stock");
		$('#textAmount' + rowCount).val('');
			$('#textQty' + rowCount).val('');
			$('#textQty' + rowCount).focus();
	
		calculateVatAmount(rowCount);
		calculateGrossAmount();
		calculateTotalPurchase();
	}
}
function fetchProductNameByBarcode(batchId, rowCount) {
	if ($('#textBarcode' + rowCount).val() != ''
			&& $('#textBarcode' + rowCount).val()) {
		if (chkDublicateRecortForBatch(rowCount, $('#textBarcode' + rowCount)
				.val()) == 1) {
			var BatchId = batchId;
			var inputs = [];
			inputs.push('BatchId=' + BatchId);
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "../../pharmacy/purchase/fetchProductNameByBarcode",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(result) {
							var data = jQuery.parseJSON(result);
							setTableDataByBarcode(data.result, rowCount);
						}
					});
			return true;
		} else {
			$('#textBarcode' + rowCount).val('');
			$('#textProductName' + rowCount).val('');
			$('#textUnit' + rowCount).val('');
			$('#textPack' + rowCount).val('');
			$('#textComp' + rowCount).val('');
			$('#textBatchNo' + rowCount).val('');
			$('#textExpiry' + rowCount).val('');
			$('#textVat' + rowCount).val('');
			$('#textMrp' + rowCount).val('');
			$('#textRate' + rowCount).val('');
			$('#textQty' + rowCount).val('');
			$('#hiddenProductId' + rowCount).val('');
			$('#textBatchId' + rowCount).val('');
			$('#textClStk' + rowCount).val('');
			$('#textTotalStk' + rowCount).val('');
			$('#textStockId' + rowCount).val('');
			$('#textStockQtyInHand' + rowCount).val('');
			$('#textRatePerUnit' + rowCount).val('');
			$('#textLastPurRate' + rowCount).val('');
			$('#textAmount' + rowCount).val('');
			$('#textLastPurRate' + rowCount).focus();

		}
	}
}

function setTableDataByBarcode(r, rowCount) {
	var discount=0;
	var ratePerUnit = 0;
	var currentRow = rowCount;
	if (r != "") {
		if (r[0].clearStock != 0.0) {
			$('#textProductName' + currentRow).val(r[0].productName);
			var unit1 = r[0].unit;
			var FinalUnit = unit1.split(".");
			$('#textUnit' + currentRow).val(FinalUnit[0]);
			$('#textPack' + currentRow).val(r[0].pack);
			$('#textComp' + currentRow).val(r[0].comp);
			$('#textBatchNo' + currentRow).val(r[0].batchCode);
			$('#textExpiry' + currentRow).val(r[0].batchExpDate);
			$('#textVat' + currentRow).val(r[0].vat);
			$('#textMrp' + currentRow).val(r[0].mrp);
			$('#txtPre' + currentRow).val(r[0].pre);
			$('#textLastPurRate' + currentRow).val(r[0].rate);
			$('#textLastPurRate' + currentRow).val(r[0].rate);
			$('#textPurchaseRate' + currentRow).val(r[0].purchaseRate);
			$('#hiddenProductId' + currentRow).val(r[0].productId);
			$('#textBatchId' + currentRow).val(r[0].batchId);

			$('#textShelf' + currentRow).val(r[0].shelfName);

			var rate = parseFloat($('#textLastPurRate' + currentRow).val());
			var purRate = parseFloat($('#textPurchaseRate' + currentRow).val());

			var unit = parseFloat($('#textUnit' + currentRow).val());

			$('#textClStk' + currentRow).val(r[0].clearStock);
			$('#textTotalStk' + currentRow).val(r[0].clearStock);

			$('#textStockId' + currentRow).val(r[0].stockId);
			$('#textStockQtyInHand' + currentRow).val(r[0].clearStock);

			if ($("#radioMRP").is(":checked")) {
				ratePerUnit = (rate / unit).toFixed(2);
			} else {
				ratePerUnit = (purRate / unit).toFixed(2);
			}
			
			if ($('#textQty'+currentRow).val() != "")
				{
				$('#textQty'+currentRow).focus();
				}
			else
				{
				setTimeout(function() {
					$('#textProductName'+(currentRow + 1)).focus();
				},00);
				
				}
				
			$('#textRatePerUnit' + currentRow).val(ratePerUnit);
			
			$('#hiddenCategoryId'+currentRow).val(r[0].categoryId);
			
			$('#textDis' + currentRow).val(spDisc);
			
			if($("#hiddenSponserFlag").val()=='ACTIVE')
			{
			/*for ( var i = 0; i < indentSaleparseData.result.length; i++) 
			{
									
				var catId=$('#hiddenCategoryId'+currentRow).val();
			if(catId==indentSaleparseData.result[i].pharma_category_id)
				{
				discount=indentSaleparseData.result[i].discount_in_percent;
				//alert("disc"+indentSaleparseData.result[i].discount_in_percent);
				break;
				}
			}*/
			
			$('#textDis'+ currentRow).val(spDisc);
			
			}

		} else {
			alert("Product not found");
			$('#textBarcode' + currentRow).val('');
			$('#textBarcode' + currentRow).focus();
		}
	} else {
		alert("Product not found");
		$('#textBarcode' + currentRow).val('');
		$('#textBarcode' + currentRow).focus();
	}
}

function getProductNameByProductId(indentProductId, rowNumber) {
	rowNumber++;
	if (indentProductId != '') {

		var inputs = [];
		inputs.push('productId=' + indentProductId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/getProductNameByProductId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						$("#textProductName" + rowNumber).val(r);
					}
				});
	}

}

function fillRows(rCount) {
	var result=0;
	if ($('#hiddenProductId' + rowCount).val() == '') {
		result = DublicateRecord(rCount);
	} else {
		result = DublicateRecordForEdit(rCount);
	}

	if (result == 1) {

		var rowCount = parseInt(rCount);
		$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
		//$('#textProductName' + rowCount).val($('#particulars').val());
		$('#textUnit' + rowCount).val($('#txtUnit').val());
		$('#textPack' + rowCount).val($('#txtPack').val());
		$('#textComp' + rowCount).val($('#txtComp').val());
		$('#textMrp' + rowCount).val($('#txtMRP').val());
		$('#textQty' + rowCount).val($('#txtQty').val());
		$('#txtPre' + rowCount).val($('#txtPre').val());

		$('#textIssueQty' + rowCount).val($('#txtQty').val());

		$('#textLastPurRate' + rowCount).val($('#txtRate').val());
		$('#textBatchNo' + rowCount).val($('#txtBatchNo').val());
		$('#textExpiry' + rowCount).val($('#txtExpiry').val());

		$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
		$('#textStockId' + rowCount).val($('#hiddenStockId').val());
		$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());

		$('#textVat' + rowCount).val($('#txtVat').val());
		$('#hiddenvatId' + rowCount).val($('#txtVatid').val());
		
		$('#textShelf' + rowCount).val($('#txtShelf').val());

		$('#textClStk' + rowCount).val($('#txtClStk').val());

		$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());

		$('#textPurchaseRate' + rowCount).val($('#txtPurchaseRate').val());

		$('#textScm' + rowCount).val($('#txtScheme').val());

		$('#textRate' + rowCount).val($('#txtRate').val());
		
		$('#textBarcode' + rowCount).val($('#hiddenBatchId').val());

		$('#textAmount' + rowCount).val($('#txtAmount').val());
		$('#textRatePerUnit' + rowCount).val($('#txtRatePerUnit').val());
		$('#textDis' + rowCount).val($('#txtDis').val());
		$('#textDisAmt' + rowCount).val($('#txtDiscAmt').val());

		var disc = 0;
		var qty = parseFloat($('#txtQty').val());
		if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
			disc = parseFloat($('#txtDiscAmt').val());
			var result = (disc / qty);
			/*
			 * alert($('#txtDiscAmt').val()); alert(qty); alert(result);
			 */
			$('#textDisAmtPerQty' + rowCount).val((result).toFixed(2));
		} else
			$('#textDisAmtPerQty' + rowCount).val(0);

		$('#hiddenRatePerUnit' + rowCount).val($('#hiddenRatePerUnit').val());
		
		$('#textProductName'+(rowCount+1)).focus();
		
		$('#hiddenCategoryId' + rowCount).val($('#hiddenProductCategoryId').val());

		/*
		 * var a = parseFloat($('#txtRate').val()); var b =
		 * parseFloat($('#txtQty').val()); var c =
		 * parseFloat($('#txtGrossAmt').val()); $('#txtGrossAmt').val((a * b) +
		 * c);
		 */
		calculateGrossAmount(totalRowCount);
		calculateVatAmount(rowCount);
	}
}
// added by suraj to check dulplicate record for edit
function DublicateRecordForEdit(rowCount) {

	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
	while (j < (count)) {

		if (rowCount == j) {
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((batchId == batchId1)) {
				return 1;
			} else {
				var popUpBatchId;
				var formBatchId;
				for ( var i = 1; i < count; i++) {
					formProductName = $('#hiddenProductId' + j).val();
					popUpProductName = $('#hiddenProductId').val();

					formBatchId = $('#textBatchId' + j).val();
					popUpBatchId = $('#hiddenBatchId').val();
					if ((formBatchId == popUpBatchId)) {
						alert("Dublicate Record Not insert");
						return 0;
					}
				}
			}
			j++;
		} else {
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((productName == productName1) && (batchId == batchId1)) {
				alert("Dublicate Record Not insert");
				return 0;

			}
			j++;
		}
	}
	return 1;
}

function calculateVatAmount(rCount) {

	var rowCount = parseInt(rCount);
	var Amt = parseFloat($('#textAmount' + rowCount).val());
	var vat = parseFloat($('#textVat' + rowCount).val());

	var vatAmt = 100 + vat;

	/* var result=parseFloat(((Amt/vatAmt)*vat).toFixed(2)); */

	var result = (Math.floor(100 * ((Amt / vatAmt) * vat)) / 100).toFixed(2);
	$("#textcounterSlaveVatAmt" + rowCount).val(result);

}

function calculateTotalPurchase() {
	var total = 0;
	var pRate = 0;
	var qty = 0;
	var unit = 0;

	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($('#textPurchaseRate' + i).val() >= 0
				&& $('#textPurchaseRate' + i).val() != ''
				&& $('#textPurchaseRate' + i).val() != null) {
			pRate = parseFloat($('#textPurchaseRate' + i).val());
			qty = parseFloat($('#textQty' + i).val());
			unit = parseFloat($('#textUnit' + i).val());
			total = total + ((pRate / unit) * qty);
		}
	}
	$('#txtTotalPurchase').val(total.toFixed(2));
}
function calculateVatAmt(rCount) {
	var rowCount = parseInt(rCount);
	var Amt = parseFloat($('#txtAmount').val());
	var vat = parseFloat($('#txtVat').val());

	var vatAmt = 100 + vat;

	/* var result=parseFloat(((Amt/vatAmt)*vat).toFixed(2)); */

	var result = (Math.floor(100 * ((Amt / vatAmt) * vat)) / 100).toFixed(2);
	alert("<" + result);
	$("#textcounterSlaveVatAmt" + rowCount).val(result);

}

function DublicateRecord(rowCount) {
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
	while (j < (count)) {

		productName = $('#hiddenProductId' + j).val();
		productName1 = $('#hiddenProductId').val();

		batchId = $('#textBatchId' + j).val();
		batchId1 = $('#hiddenBatchId').val();

		if ((productName == productName1) && (batchId == batchId1)) {
			alert("Dublicate Record Not insert");
			return 0;

		}
		j++;
	}
	return 1;
}

function calculateIndentAmount(value) {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var RatePerUnit = 0;
	var DiscAmt = 0;
	var purRate = 0;

	if ($('txtPurchaseRate').val() != ''
			&& $('#txtPurchaseRate').val().length > 0)
		purRate = parseFloat($('#txtPurchaseRate').val());

	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0
			&& $('#txtRate').val().length != null)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0
			&& $('#txtQty').val() != null)
		qty = parseFloat($('#txtQty').val());

	if (value == 'qty')
		$("#txtRate").focus();

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0
			&& $('#txtUnit').val() != '' && $('#txtUnit').val().length > 0) {
		if ($("#radioMRP").is(":checked")) {
			RatePerUnit = (rate / unit).toFixed(2);
		} else {
			RatePerUnit = (purRate / unit).toFixed(2);

		}
	}

	$("#txtRatePerUnit").val(RatePerUnit);
	var finalAmout = (RatePerUnit * qty).toFixed(2);
	/* $('#txtAmount').val((RatePerUnit * qty).toFixed(2)); */

	if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
		discount = parseFloat($('#txtDis').val());
		DiscAmt = (discount / 100) * finalAmout;
	}

	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		DiscAmt = parseFloat($('#txtDiscAmt').val());
	}

	if (DiscAmt <= finalAmout)
		$('#txtAmount').val((finalAmout - DiscAmt).toFixed(2));
	else {
		$('#txtAmount').val((RatePerUnit * qty).toFixed(2));
	}

	var amt = parseFloat($('#txtAmount').val());
	val = (Math.floor(1000 * (amt / qty)) / 1000).toFixed(2);

	$('#hiddenRatePerUnit').val(val);

}

function calculateGrossAmount() {

	var total = 0,total1 = 0;

	for ( var i = 1; i < $("#RowCount").val(); i++) {
		if ($('#hiddenProductId' + i).val() != ''
				&& $('#hiddenProductId' + i).val().length > 0) {
			if ($('#textAmount' + i).val() >= 0) {
				total = ((parseFloat(total) + parseFloat($('#textAmount' + i)
						.val())).toFixed(2));
				
				if($("#amountGroup"+i).is(':checked')){
					total1=+total1 + parseFloat($('#textAmount' + i)
							.val());
				}

			}
		}

	}
	$('#txtAmtRec').val(total1);
	$('#txtAmtRec').focus();
	$('#txtGrossAmt').val(total);
	validateLess();
	calculateNetAmount();
	calculatecdAmt();
}

function setFocusToRate() {
	$("#txtRate").focus();
}

function calculateNetAmount() {

	var gross = 0;
	var less = 0;
	var add = 0;
	var total = 0;

	if ($('#txtGrossAmt').val() != '' && $('#txtGrossAmt').val().length > 0) {
		gross = parseFloat($('#txtGrossAmt').val());
	}
	if ($('#txtLess').val() != '' && $('#txtLess').val().length > 0) {
		less = parseFloat($('#txtLess').val());
	}
	if ($('#txtAdd').val() != '' && $('#txtAdd').val().length > 0) {
		add = parseFloat($('#txtAdd').val());
	}

	if (gross > 0) {
		$('#txtNetAmt').val(((gross - less) + add).toFixed(2));
	} else {
		$('#txtNetAmt').val(0);
	}

}

function calculatecdAmt() {
	var cdAmt = 0;
	var gross = 0;
	if ($('#txtCD').val() != '' && $('#txtCD').val().length > 0) {
		cdAmt = parseFloat($('#txtCD').val());
	}

	if ($('#txtGrossAmt').val() != '' && $('#txtGrossAmt').val().length > 0) {
		gross = parseFloat($('#txtGrossAmt').val());
	}

	if (cdAmt > 0) {
		var result = gross * (cdAmt / 100);
		$('#txtCDAmt').val(result.toFixed(2));
	} else {
		$('#txtCDAmt').val(0);
	}

	calculateNetAmount();
	calculateDiscount();

}

function calculateDiscount() {
	if (($('#txtSpecialDisc').val() != '') && ($('#txtSpecialDisc').val() != 0)) 
		$('#txtLess').val($('#txtSpecialDisc').val());
	else if (($('#txtCD').val() != '') && ($('#txtCD').val() != 0)) 
		$('#txtLess').val($('#txtCDAmt').val());
	else 
		$('#txtLess').val('0');
	
	calculateNetAmount();
}

function calculateSurchargeHos() {
	var add = 0;
	if ($('#txtSurcharge').val() != '' && $('#txtSurcharge').val().length > 0) {
		add = parseFloat($('#txtSurcharge').val());
	}

	$("#txtAdd").val(add);
	calculateNetAmount();
	/* calculateNetAmount(); */
}

function searchIndentSaleById(id) {
	resetIndentValues();
	var inputs = [];
	inputs.push('indentSaleId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/indentSale/getIndentSaleDataById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {

			if (r == "" || $("#indentSaleId").val() == '0'
					|| $("#indentSaleId").val() == "") {
				alert("Record not found!");
				$("#txtInwardNumber").val('');

			}

			else {
				$("#indentSaleId").val('');
				setTableData(r);
			}
		}
	});

	return true;
}

function searchIndentSaleByPatientId(id) {
	resetIndentValues();
	var inputs = [];
	inputs.push('PatientId=' + id);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/indentSale/getIndentSaleDataByPatientName",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setTableDataPatientwise(r);

				}

			});

	return true;
}



function setTableDataPatientwise(r) {

	var divContent = "";

	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + " <tr><td class='col-md-1 center'>" + (i + 1)
				+ " <input type='hidden' id='hiddenHospitalSaleBillId"
				+ r[i].indentSalelId + "' value='" + r[i].indentSalelId
				+ "'></td>"

				+ "<td class='col-md-2 center'>" + r[i].indentMaster.indentId
				+ "<input type='hidden' id='InwardNo" + r[i].indentSalelId
				+ "' value='" + r[i].indentMaster.indentId + "'></td>"

				+ "<td class='col-md-2 center'>" + r[i].indentSalelId
				+ "<input type='hidden' id='HospitalBillNum"
				+ +r[i].indentSalelId + "'value='" + r[i].indentSalelId + "'>"
				+ "</td>"

				+ "<td class='col-md-2 center'>" + r[i].indentSaleNarration
				+ "<input type='hidden' id='patientName" + +r[i].indentSalelId
				+ "'value='" + r[i].indentSaleNarration + "'>" + "</td>"

				+ "<td class='col-md-2 center'>" + r[i].indentSaleDocNo
				+ "<input type='hidden' id='BillDate" + r[i].indentSalelId
				+ "'value='" + r[i].indentSaleDocNo + "'>" + "</td>"

				+ "<td class='col-md-2 center'>" + r[i].indentSaleNetAmt
				+ "<input type='hidden' id='BillDate" + r[i].indentSalelId
				+ "'value='" + r[i].indentSaleNetAmt + "'>" + "</td>"

				/*
				 * + "<td class='col-md-2 center'> <a id='btnPrint" + "'
				 * class='btn btn-xs btn-success' " + "
				 * href=/EhatEnterprise/pharmacy/indentSale/printView?indentSalelId=" +
				 * r[i].indentSalelId + " > <i class='fa fa-print'></i> </a>
				 * </td>"
				 */

				+ "<td class='col-md-2 center'> <a id='btnPrint"
				+ "' class='btn btn-xs btn-success' "
				+ " onclick='indentSalePrint(" + r[i].indentSalelId
				+ ")' > <i class='fa fa-print'></i> </a> </td></tr>";

		/*
		 * + "<td class='col-md-1 center'> <button id='btnDelete2' class='btn
		 * btn-xs btn-success' onclick='deleteIndent(" + r[i].indentSalelId +
		 * ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td>
		 * </tr>"
		 */;
	}
	$('#divHospitalSaleList').html(divContent);

}

function setTableData(result) {
	var r = result;
	var divContent = "";

	divContent = divContent + " <tr><td class='col-md-1 center'>" + 1
			+ " <input type='hidden' id='hiddenHospitalSaleBillId"
			+ r.indentSalelId + "' value='" + r.indentSalelId + "'></td>"

			+ "<td class='col-md-2 center'>" + r.indentMaster.indentId
			+ "<input type='hidden' id='InwardNo" + r.indentSalelId
			+ "' value='" + r.indentMaster.indentId + "'></td>"

			+ "<td class='col-md-2 center'>" + r.indentSalelId
			+ "<input type='hidden' id='HospitalBillNum" + +r.indentSalelId
			+ "'value='" + r.indentSalelId + "'>" + "</td>"

			+ "<td class='col-md-2 center'>" + r.indentSaleNarration
			+ "<input type='hidden' id='patientName" + r.indentSalelId
			+ "'value='" + r.indentSaleNarration + "'>" + "</td>"

			+ "<td class='col-md-2 center'>" + r.indentSaleDocNo
			+ "<input type='hidden' id='BillDate" + r.indentSalelId
			+ "'value='" + r.indentSaleDocNo + "'>" + "</td>"

			+ "<td class='col-md-2 center'>" + r.indentSaleNetAmt
			+ "<input type='hidden' id='BillDate" + r.indentSalelId
			+ "'value='" + r.indentSaleNetAmt + "'>" + "</td>"

			/*
			 * + "<td class='col-md-2 center'> <a id='btnPrint" + "' class='btn
			 * btn-xs btn-success' " + "
			 * href=/EhatEnterprise/pharmacy/indentSale/printView?indentSalelId=" +
			 * r.indentSalelId + " > <i class='fa fa-print'></i> </a> </td>"
			 */

			+ "<td class='col-md-2 center'> <a id='btnPrint"
			+ "' class='btn btn-xs btn-success' "
			+ " onclick='indentSalePrint(" + r.indentSalelId
			+ ")' > <i class='fa fa-print'></i> </a> </td></tr>";

	/*
	 * + "<td class='col-md-1 center'> <button id='btnDelete2' class='btn
	 * btn-xs btn-success' onclick='deleteIndent(" + r.indentSalelId + ")'
	 * value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>"
	 */;

	$('#divHospitalSaleList').html(divContent);
}

function deleteRow() {
	/* var result= $("input[name='deleteGroup']:checked").val(); */

	/* $("#remove"+result).hide(); */

	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroup']:checked"), function() {
			favorite.push($(this).val());

		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
		}

		for ( var i = 0; i < favorite.length; i++) {

			if ($("#hiddenProductId" + favorite[i]) != null
					&& $('#hiddenProductId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				var amount = parseFloat($("#textAmount" + favorite[i]).val());

				$("#rowDeleteFlag" + favorite[i]).val("1");

				$("#hiddenProductId" + favorite[i]).val("");
				$("#textBatchId" + favorite[i]).val("");
				$("#textPurchaseRate" + favorite[i]).val("");
				$("#remove" + favorite[i]).hide();
				$("#textQty" + favorite[i]).val("");

				$("#txtAmount" + favorite[i]).val(
						parseFloat($("#txtAmount" + favorite[i]).val())
								- (amount));
				$("#textAmount" + favorite[i]).val("");

				/*
				 * $("#txtItems" + textNo).val( parseInt($("#txtItems" +
				 * textNo).val()) - 1);
				 */

				calculateGrossAmount();

				// alert("selected row is deleted successfully");
			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
	}
	calculateTotalPurchase();
	calculatePending();
	calculateNetAmount();
}
function calculateCounterDisc() {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	var finalAmout = 0;
	if ($('#txtDis').val() <= 100) {
		if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
			rate = parseFloat($('#txtRate').val());

		if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
			qty = parseFloat($('#txtQty').val());

		if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
			unit = parseFloat($('#txtUnit').val());

		if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
			discount = parseFloat($('#txtDis').val());

		if ($('#hiddenProductId').val() != ''
				&& $('#hiddenProductId').val().length > 0
				&& $('#hiddenProductId').val() != 0) {

			ratePerUnit = parseFloat($('#txtRatePerUnit').val());
			finalAmout = (ratePerUnit * qty).toFixed(2);
			if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
				discount = parseFloat($('#txtDis').val());
				DiscAmt = (discount / 100) * finalAmout;
				$('#txtDiscAmt').val((DiscAmt).toFixed(2));
			}

		}
		calculateIndentAmount();

	} else {
		alert("Enter Discount less than 100");
		$('#txtDis').val(0);
		$('#txtDiscAmt').val(0);
		calculateIndentAmount();
	}
}

function calculateVat() {

	var vat5 = 0;
	var vat55 = 0;
	var vat12 = 0;
	var vat0 = 0;
	var vat6 = 0;
	var vat135 = 0;

	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($("#hiddenProductId" + i).val() != null
				&& $('#hiddenProductId' + i).val() != "") {

			if ($('#textVat' + i).val() != ''
					&& $('#textVat' + i).val().length > 0)
				vat = parseFloat($('#textcounterSlaveVatAmt' + i).val());

			if ($('#textVat' + i).val() == 5.0 || $('#textVat' + i).val() == 5) {
				vat5 = vat5 + vat;
			} else if ($('#textVat' + i).val() == 12.5) {
				vat12 = vat12 + vat;
			} else if ($('#textVat' + i).val() == 5.5) {
				vat55 = vat55 + vat;
			} else if ($('#textVat' + i).val() == 0) {
				vat0 = vat0 + vat;
			} else if ($('#textVat' + i).val() == 6) {
				vat6 = vat6 + vat;
			} else if ($('#textVat' + i).val() == 13.5) {
				vat135 = vat135 + vat;
			}

		}
	}

	$("#hiddenTax5").val(vat5);
	$("#hiddenTax55").val(vat55);
	$("#hiddenTax12").val(vat12);
	$("#hiddenTax6").val(vat6);
	$("#hiddenTax135").val(vat135);
	$("#hiddenTax0").val(0);
	var totalTax = vat5 + vat12 + 0 + vat55 + vat6 + vat135;
	$("#hiddenTotalTax").val(totalTax);
}

function indentSalePrint(indentSaleId) {
	window.open("../../pharmacy/indentSale/printView?indentSalelId="
			+ indentSaleId + "");
}

function setRoundForIndent() {
	if ($('#txtRount').val() != null && $('#txtRount').val() != '') {
		var retVal = confirm("Do you want to Round off Net Amount  ?");
		var r = Math.round($('#txtRount').val());

		if ($('#txtGrossAmt').val() != '' && $('#txtGrossAmt').val().length > 0) {
			gross = parseFloat($('#txtGrossAmt').val());
		}

		if ((retVal == true)
				&& (parseFloat($('#txtRount').val()) == parseFloat($(
						'#txtNetAmt').val()))) {
			$('#txtNetAmt').val(r);
		} else {
			alert("Enter same value of net amount");
			$('#txtRount').val('');
			$('#txtRount').focus();
		}
	} else {
		calculateNetAmount();
	}
	calculatePending();
}

// suraj code for print

function hospitalPaymentData() {

	var treatmentId = $('#hiddenTreatmentId').val();
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/indentSale/getHospitalPaymentDetailsTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						//setHospitalBillData1(r);

					}
				});

		return true;
	} else {
		$("#indentHospitalPaymentDiv").html("");
	}

}

function setHospitalBillData1(r) {

	var divContent = "";
	divContent = divContent
			+ "<b>Hospital Payment Details</b><table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Amount Receive By Ipd</th><th>Amount Paid By Ipd</th><th>Narration </th> <th>Final Date</th><th>Time</th><th>Print</th></thead></tr>";
	if (r.length > 0) {

		for ( var i = 0; i < r.length; i++) {

			divContent = divContent
					+ "<tbody><tr>"
					+ "<td> "
					+ r[i].amountReceive
					+ "</td>  <td>"
					+ r[i].amountBal
					+ "</td>  <td>"
					+ r[i].narration
					+ "</td>  <td id='historyId"
					+ r[i].historyId
					+ "' style='display:none' value='"
					+ r[i].historyId
					+ "' ><td>"
					+ r[i].date
					+ "</td><td>"
					+ r[i].time
					+ "</td><td><a  class='btn btn-xs btn-info' href='/EhatEnterprise/pharmacy/indentSale/printHospitalPaymentReceipt?receiptId="
					+ r[i].historyId
					+ "' target='_blank'>Print</a></td></tr></tbody>";
		}

		divContent = divContent + "</table>";

		$("#indentHospitalPaymentDiv").html(divContent);
	} else {
		$("#indentHospitalPaymentDiv")
				.html(
						divContent
								+ "<tbody><tr><td>No Hospital Payment Received</td></tr></tbody>");
	}

}

function chkDublicateRecortForBatch(rowCount, barcode) {
	var j = 1;
	var batchId = 0;
	var batchId1 = 0;

	while (j <= (totalRowCount)) {
		if ($('#textBatchId' + j).val() != '')
			batchId = $('#textBatchId' + j).val();
		else
			batchId = 0;

		/*
		 * if($('#textBarcode' +rowCount).val()!='') batchId1 = $('#textBarcode'
		 * +rowCount).val();
		 */

		if ((batchId == barcode) && j != rowCount) {
			alert("Dublicate Record Not insert");
			return 0;

		}
		j++;
	}
	return 1;
}

function deleteRowOnFocus() {
	$(":focus").each(function() {
		var data = $(this).attr('class');
		var splittedData = data.split("#");
		$("#" + splittedData[1].trim()).attr("checked", true);
		deleteRow();
	});
}

function expiryBatches() {

	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1; // Months are zero based
	var curr_year = d.getFullYear();
	var divContent = "";
	var callform="all";
	/* alert(curr_year + "-" + curr_month + "-" + curr_date); */
	$
			.ajax({
				url : "../../pharmacy/report/getNearExpiryReport",
				method : "post",
				data : {
					//from : "1/" + curr_month + "/" + curr_year,
					from : curr_year+ "-" + +curr_month + "-" + "1",
					callform,
				},

				success : function(r) {
					divContent = "<marquee>";
					for ( var i = 0; i < r.length; i++) {
						divContent = divContent
								+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa fa-medkit'></i><b>Batch Code-"
								+ r[i].batchCode
								+ "</b> &nbsp;&nbsp;&nbsp;<b> Product Name -"
								+ r[i].productName
								+ "&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> Batch Expiry -"
								+ r[i].batchExpiry;

					}
					divContent = divContent + "</marquee>";
					$('#marquee').html(divContent);
				},
				error : function(error) {
					alert(error);
				}
			});
}


function setFocusForDiscount()
{

	if ($("#radioCD").is(":checked")) 
	{
		$('#txtSpecialDisc').attr('readonly', 'true');
		$("#txtCD").removeAttr("readonly");
		$('#txtCD').val(0);
		$('#txtCDAmt').val(0);
		$('#txtSpecialDisc').val(0);
		$('#txtLess').val(0);
		
		$('#txtCD').focus();
		
		
	} 
	else if($("#radioSpeDisc").is(":checked"))
	{
		$('#txtCD').attr('readonly', 'true');
		$("#txtSpecialDisc").removeAttr("readonly");
		$('#txtCD').val(0);
		$('#txtCDAmt').val(0);
		$('#txtSpecialDisc').val(0);
		$('#txtLess').val(0);
		$('#txtSpecialDisc').focus();
		
	}
	
	calculateNetAmount();
}

function setFullPartialPayment(billId)
{
	var finaldiscount = $('#finaldiscount'+billId).val();
	var discount = $('#discount'+billId).val();
	
	var amountBal = $('#finalBalAmt'+billId).val();
	$('#amountBal'+billId).text(0);
	
	if(finaldiscount == 0)
	{
		amountBal = Number(amountBal) - Number(discount);
		
		if(amountBal < 0)
		{
			alert('not allowed')
			return false
		}
	}
	
	$('#payAmt'+billId).val(amountBal)
	
	$('#receiveAmt'+billId).text(amountBal)
}

function setAllCheckIndentSale(){

	if($("#allChksalesBillId").is(":checked")){
		$("input[name=chksalesBillId]").prop('checked',true)
	} else{
		$("input[name=chksalesBillId]").prop('checked',false)

	}

	$("#indentPendingData").find('input[name="chksalesBillId"]:checked').each(function() {
		if ($(this).is(":checked")) {
			var billId = $(this).val();
			var finaldiscount = $('#finaldiscount'+billId).val();
			var discount = $('#discount'+billId).val();
			
			var amountBal = $('#finalBalAmt'+billId).val();
			$('#amountBal'+billId).text(0);
			
			if(finaldiscount == 0)
			{
				amountBal = Number(amountBal) - Number(discount);
				
				if(amountBal < 0)
				{
					alert('not allowed')
					return false
				}
			}
			
			$('#payAmt'+billId).val(amountBal)
			
			$('#receiveAmt'+billId).text(amountBal)
			
		}
	});
	
}
function setAutoPatientNameIndent(inputID,e) {
	
	var resultData = [];
	var findtext = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findtext == "" || findtext == null || findtext == "null" || findtext == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
		searchIndentSalePatientData(inputID);
}

function searchIndentSalePatientData(inputID){
	var resultData = [];
	var findtext = $("#" + inputID).val();

	if(findtext == "" || findtext == null || findtext == "null" || findtext == undefined){
			
			alert("Please enter search value");
			$("#" + inputID).focus();
			return false;
		}
			
		var inputs = [];	
		inputs.push('findtext=' + findtext);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/indentSale/searchIndentSalePatientDetails",
			cache : false,		
			success : function(r) {
				
				var template = "";
				for ( var j = 0; j < r.length; j++) {
					
					var arrValue = r[j].patientName ;
					var idValue = r[j].indentId;
					var patName = r[j].patientName;
					var treatmentId = r[j].indentTreatmentId;
					resultData.push({
						ID : idValue,
						Name : patName,
						treatmentId: treatmentId
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + treatmentId + '-' + arrValue
							+ '</a></li>';
				}
				
				setTimeout(function() {

					$("#div" + inputID + " .typeahead").html(template);
					$("#div" + inputID + " .typeahead").show();
					
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
			var res = item.text.split('-');
			var treatmentId = res[0];
			var patName = res[1];
			$("#" + inputID).val(patName);	
			displayAllIndent(treatmentId);
		} 		
	}

function fetchIndentPatientName(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Indent No Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else {
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}
}