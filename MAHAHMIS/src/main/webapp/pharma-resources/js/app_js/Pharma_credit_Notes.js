var returnType = 0;


function deleteRowOnFocus()
{
	$(":focus").each(function() {
	    var data=$(this).attr('class');
	    var splittedData=data.split("#");
	    $("#"+splittedData[1].trim()).attr("checked",true);
	    deleteRow();
	});
}
function clearInputValues() {
	$("#divAmtCalc input").each(function() {
		$(this).val("0");
	});

	/*$("#mainPendingBalance").html("0.0");*/
}
function deleteRowOnFocus()
{
	$(":focus").each(function() {
	    var data=$(this).attr('class');
	    var splittedData=data.split("#");
	    $("#"+splittedData[1].trim()).attr("checked",true);
	    deleteRow();
	});
}
function saveCreditNote() 
{
	var retVal = confirm("Do you want to Save?");
	if (retVal == true) 
	{
		calculateVat();
		calculateCreditPending();
		var DocNo="";
		if($('#txtVouNo').val() != null && $('#txtVouNo').val() != "")
		{
			DocNo= $("#txtVouNo").val();
		}
		else
		{
			alertify.error("Enter Vou No");
			$('#txtVouNo').focus();
			return false;
		}
		
		var patientName = $("#txtPatientName").val();
		var patientAddress = $("#txtPatientAddress").val();
		var patientPhone = $("#txtPhone").val();
		
		var transationType = 0;
		if ($("input[name=creditNoteTransactionType]").is(":checked")) 
		{
			transationType = $("input[name=creditNoteTransactionType]:checked").val();
		}
		else
		{
			alertify.error("Please select Type cash/credit");
			return false;
		}
		
		/*var transationType =  $("input:radio[name=radioCashCredit]:checked").val();*/
		
		
		var vouDate = $("#txtVouDate").val();
		var narration = $("#txtNarration").val();
		var discPer = $("#txtDic").val();
		var disc = $("#txtDiscount").val();
		var surCharge = $("#txtSurCharge").val();
		var adjBillNo = $("#txtAdjustinBillNo").val();
		if(adjBillNo==""||adjBillNo==null||adjBillNo==undefined){
			adjBillNo=0;
		}
		var adjBillDate = $("#txtAdjDate").val();
		if(adjBillDate==""||adjBillDate==null||adjBillDate==undefined){
			adjBillDate=vouDate;
		}
		var enterBy = $("#txtEntrDate").val();
		var less = $("#txtLess").val();
		var add = $("#txtAdd").val();
		var gross = $("#txtGross").val();
		var netAmt = $("#txtNetAmt").val();
		var hiddenTreatmentId = $("#hiddenCreditNoteTratmentId").val();
		if(hiddenTreatmentId==""||hiddenTreatmentId==null||hiddenTreatmentId==undefined){
			hiddenTreatmentId=0;
		}
		var patientSaleId=0;
		if ($('#patientSaleId').val()!=null && $('#patientSaleId').val()!="")
		{
			patientSaleId = $("#patientSaleId").val();
		}
		
		var counterSaleId="";
		if ($('#counterSaleId').val() != null && $('#counterSaleId').val() != "")
		{
			counterSaleId = $("#counterSaleId").val();
		}
		
		var indentSaleId= $("#hiddenIndentId").val();
		
		var taxVat5 = 0;
		if ($('#hiddenTax5').val() != null && $('#hiddenTax5').val() != "") {
			taxVat5 = $('#hiddenTax5').val();
		}
		
		var taxVat55 = 0;
		if ($('#hiddenTax55').val() != null && $('#hiddenTax55').val() != "") {
			taxVat55 = $('#hiddenTax55').val();
		} 
		
		var taxVat12 = 0;
		if ($('#hiddenTax12').val() != null && $('#hiddenTax12').val() != "") {
			taxVat12 = $('#hiddenTax12').val();
		}
		
		var taxVat0=0;
		if ($('#hiddenTax0').val() != null && $('#hiddenTax0').val() != "") 
		{
			taxVat0 = $('#hiddenTax0').val();
			
		}		
		var patientId=0;
		if ($('#patientId').val()!=null && $('#patientId').val()!="")
		{
			patientId = $("#patientId").val();
		}
		
		var amtPayable = $("#txtAmtRec").val();
		var prevBalance = $("#indentSalePreviousBalance").val();
		var amtBalance = $("#txtAmtBal").val();
		
		var totalRow = $("#RowCount").val();

		var materiallist = {
				creditNoteSlaves : []
		};

		for ( var i = 1; i <=totalRow; i++) {
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

				var qty = $("#txtQty" + i).val();
				var amt = $("#txtAmt" + i).val();
				var rate = $("#txtRate" + i).val();
				var batchCode = $("#txtBatchNo" + i).val();
				var batchExpiry = $("#txtExpiry" + i).val();
				var mrp = $("#txtMRP" + i).val();
				var indentSlaveId = $("#txtCreditNoteSlaveIndentId" + i).val();
				var patientSlaveId = $("#txtCreditNoteSlavePatientId" + i).val();
				var counterSlaveId = $("#txtCreditNoteSlaveCounterId" + i).val();
				var code=$("#txtCode" + i).val();
				var vat = 0.0;
				vat=$("#textVat" + i).val();
				var vatAmt=$("#textCreditSlaveVatAmt" + i).val();
				
				var ratePerUnit=0;
				if($("#textRatePerUnit" + i).val()!=null && $("#textRatePerUnit" + i).val()!='')
				{
					ratePerUnit=$("#textRatePerUnit" + i).val();
				}
				
				var discAmt=0;
				if($("#txtDisAmt" + i).val()!=null && $("#txtDisAmt" + i).val()!='')
					discAmt=$("#txtDisAmt" + i).val();
				
				if (qty == "" || qty == 0) {
					alertify.error("Please Enter Proper Quantity");
					$("#txtQty" + i).focus();
					return false;
				}
	
				materiallist.creditNoteSlaves.push({
					creditSlaveQty : qty,
					creditNoteSlaveAmt : amt,
					creditNoteSlaveRate : rate,
					creditNoteSlaveBatchCode : batchCode,
					creditNoteSlaveBatchExpiry : batchExpiry,
					creditNoteSlaveMrp : mrp,
					creditNoteSlaveBatchId : batchId,
					creditNoteSlaveIndentId : indentSlaveId,
					creditNoteSlavePatientId : patientSlaveId,
					creditNoteSlaveCounterId:counterSlaveId,
					creditNoteSlaveCode:code,
					creditSlaveVat:vat,
					creditSlaveVatAmt:vatAmt,
					creditNoteSlaveRatePerUnit:ratePerUnit,
					creditNoteSlaveDiscAmt:discAmt,
					productMaster : {
						'productId' : productId,
						'batchMaster' : [ {
							'batchId' : batchId,
							'stockMaster' : {
								'stockId' : 1,
								'stockQtyInHand' : 10
							}
						} ]
					}
				});
			}
		}
		
		if(materiallist.creditNoteSlaves.length<1)
		{
			alert("Please Enter Valid Data");
			return false;
		}
		
		materiallist = JSON.stringify(materiallist);

		var inputs = [];

		// General Info
		inputs.push("creditNoteSlaves=" + materiallist);
		inputs.push("DocNo=" + DocNo);
		inputs.push("patientName=" + patientName);
		inputs.push("patientAddress=" + patientAddress);
		inputs.push("patientPhone=" + patientPhone);
		inputs.push("transationType=" + transationType);
		inputs.push("vouDate=" + vouDate);
		inputs.push("narration=" + narration);
		inputs.push("discPer=" + discPer);
		inputs.push("disc=" + disc);
		inputs.push("surCharge=" + surCharge);
		inputs.push("adjBillNo=" + adjBillNo);
		inputs.push("adjBillDate=" + adjBillDate);
		inputs.push("enterBy" + enterBy);
		inputs.push("less=" + less);
		inputs.push("add=" + add);
		inputs.push("gross=" + gross);
		inputs.push("netAmt=" + netAmt);
		inputs.push("hiddenTreatmentId=" + hiddenTreatmentId);
		inputs.push("patientSaleId=" + patientSaleId);
		inputs.push("counterSaleId=" + counterSaleId);
		inputs.push("indentSaleId=" + indentSaleId);
		inputs.push("taxVat5=" + taxVat5);
		inputs.push("taxVat55=" + taxVat55);
		inputs.push("taxVat12=" + taxVat12); 
		inputs.push("taxVat0="+taxVat0);
		inputs.push("patientId=" + patientId);
		inputs.push("amtPayable=" + amtPayable);
		inputs.push("prevBalance=" + prevBalance);
		inputs.push("amtBalance=" + amtBalance);
		inputs.push("returnType=" + returnType);
				
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str,
			/*url : "../indentSale/sampleTest",*/
			url : "../../pharmacy/creditNote/saveCreditNote",
			catche : false,
			error : function() {
				$("#saveBtn").show();
				alert("oops something went wrong related to stock please save proper data or check mrp");
			},
			success : function(r) {
			
				if(r.result=='Error')
				{
					alert(r.result);
				}
				else
				{
					alert("Record saved successfully..!");
						window
						.open("../../pharmacy/creditNote/printView?creditNoteId="+r.id,'_blank');
						location.reload(true);
						
				}	
			}
		});
		}
	
	
}


function calculateCashData() {
	var treatmentId = $('#hiddenCreditNoteTratmentId').val();

	if (treatmentId != null && treatmentId != "") {
		fetchPendingAmount(treatmentId);
		calculateCreditPending();
	}

}

function calculateCreditData() {
	clearInputValues() ;
	var treatmentId = $('#hiddenCreditNoteTratmentId').val();

	if (treatmentId != null && treatmentId != "") {
		fetchPendingAmount(treatmentId);
		calculateCreditPending();
	}

}


function calculateDisc() {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	var finalAmout = 0;
	if ($('#txtDis').val() < 100) {
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

			ratePerUnit = (rate / unit).toFixed(2);
			finalAmout = (ratePerUnit * qty).toFixed(2);
			if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
				discount = parseFloat($('#txtDis').val());
				DiscAmt = (discount / 100) * finalAmout;
				$('#txtDiscAmt').val((DiscAmt).toFixed(2));
			}

		}

		calculateAmount();
	} else {
		alert("Enter Discount less than 100");
		$('#txtDis').val(0);
		$('#txtDiscAmt').val(0);
		calculateAmount();
	}
}

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}

function displayIndentPopUp() {
	$("#credit_note_indent_data").show();
	$("#txtPatientName1").focus();
  $("#btnCounterReturn").hide();
	$("#btnPatientReturn").hide();
returnType=1;
	/*fetchPendingPatientData();*/
}

function displayPatientPopUp() {
	$("#credit_note_patient_data").show();
	$("#txtPatientNamePatientSale").focus();
	$("#btnIndentReturn").hide();
	$("#btnCounterReturn").hide();
	returnType=2;
}

function displayCounterPopUp() {
	$("#credit_note_counter_data").show();
	$("#searchBox").focus();
	$("#btnIndentReturn").hide();
	$("#btnPatientReturn").hide();
	returnType=3;
}

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

function fetchPendingPatientSaleBillData() {
	var patientId = $('#hiddenPatientId').val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/patientSale/getAllPatientBillSaleData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {

			setAllPateintSaleBillData(r);
		}
	});
	return true;

}

function setAllPateintSaleBillData(r) {
	var divContent = "<div class='col-md-1' style='float:right'><button class='btn btn-xs btn-info' onclick='setPatientBillSlaveData()' type='button'>Ok</button></div>";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Patient Date</th><th>Net Amount</th><th>Product</th><th>Unit</th><th>Pack</th><th>Batch Code</th><th>Batch Expiry </th><th>Vat </th> <th>Qty </th> <th>Rate</th><th>Pur. Rate</th><th>Select</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {

		divContent = divContent + "<tbody><tr><td>" + r[i].patientBillDate
				+ "</td>  <td> " + r[i].patientSalesBillNetAmt
				+ "</td>  <td id='productName" + r[i].patientSlaveId + "'>"
				+ r[i].productName + "</td> <td id='unit" + r[i].patientSlaveId
				+ "'>" + r[i].unit + "</td> <td id='pack" + r[i].patientSlaveId
				+ "'>" + r[i].pack + "</td> <td id='batchCode"
				+ r[i].patientSlaveId + "'>" + r[i].batchCode
				+ "</td> <td id='expiry" + r[i].patientSlaveId + "'>"
				+ r[i].batchExpiry + "</td><td id='vat" + r[i].patientSlaveId
				+ "'>" + r[i].vat + "</td><td id='qty" + r[i].patientSlaveId
				+ "'>" + r[i].qty + "</td><td>" + r[i].rate
				+ "</td><td id='purRate" + r[i].patientSlaveId
				+ "' >" + r[i].purRate
				+ "</td><td><input type='checkbox' id='selectProduct"
				+ r[i].patientSlaveId + "' name='selectProduct' value='"
				+ r[i].patientSlaveId + "'></td>" + "<td id='productId"
				+ r[i].patientSlaveId + "' style='display:none'>"
				+ r[i].productId + "</td><td id='patientSlaveId"
				+ r[i].patientSlaveId + "' style='display:none'>"
				+ r[i].patientSlaveId + "</td><td id='batchId"
				+ r[i].patientSlaveId + "' style='display:none'>"
				+ r[i].batchId + "</td>" + "<td id='mrp" + r[i].patientSlaveId
				+ "' style='display:none'>" + r[i].mrp + "</td>"
				+ "<td id='rate" + r[i].patientSlaveId
				+ "' style='display:none'>" + r[i].rate
				+ "</td><td id='fName" + r[i].patientSlaveId
				+ "' style='display:none' value='" + r[i].patientName + "' >"
				+ r[i].patientName + "</td><td id='paddress"
				+ r[i].patientSlaveId + "' style='display:none'>"
				+ r[i].paddress + "</td><td id='phoneNumber"
				+ r[i].patientSlaveId + "' style='display:none'>"
				+ r[i].phoneNumber + "</td><td id='patientSalesBillId"
				+ r[i].patientSlaveId + "' style='display:none' >"
				+ r[i].patientSalesBillId + "</td><td id='Disc"
				+ r[i].patientSlaveId + "' style='display:none' >" + r[i].disc
				+ "</td><td id='patientId" + r[i].patientSlaveId
				+ "' style='display:none' >" + r[i].patientId
				+ "</td><td id='treatmentId" + r[i].patientSlaveId
				+ "' style='display:none' >" + r[i].treatmentId
				+ "</td><td id='patientSaleType" + r[i].patientSlaveId
				+ "' style='display:none'>" + r[i].saleType
				+ "</td><td id='patientBillMode" + r[i].patientSlaveId
				+ "' style='display:none'>" + r[i].patientBillMode
				+ "</td></tr></tbody";
		
		$('#hiddenPatientId').val(r[i].patientId);

	}
	divContent = divContent + "</table>";

	$("#patientSalePendingData").html(divContent);

}

function setPatientBillSlaveData() {
	
	var patientId = $("input[name='selectProduct']:checked").val();
	$("#txtPatientName").val($('#fName' + patientId).html());
	$("#txtPatientAddress").val($('#paddress' + patientId).html());
	$("#txtPhone").val($('#phoneNumber' + patientId).html());
	$("#txtPatientId").val($('#patientSalesBillId' + patientId).html());

	$("#patientSaleId").val($('#patientSalesBillId' + patientId).html());

	$("#hiddenCreditNoteTratmentId").val($('#treatmentId' + patientId).html());
	
	$("#hiddenSaleTypeId").val($('#patientSaleType' + patientId).html());

	$("#patientId").val($('#patientId' + patientId).html());
	$("#type").val("patientSale");
	
	$("input[name=creditNoteTransactionType][value=" + $('#patientBillMode' + patientId).html() + "]").attr('checked', 'checked');
	
	getSpecialDiscData($( "#patientReceiptData option:selected" ).val(),$("#type").val());

	$("#patientSaleDiv").show("show");
	/*$('#credit_note_patient_data').modal('hide');*/
	$('#credit_note_patient_data').hide();
	var favorite = [];

	$.each($("input[name='selectProduct']:checked"), function() {
		favorite.push($(this).val());
	});

	if (favorite.length == 0) {
		alert("Select atleast one record");
	} else {
		var divContent = "";
		var rowCount = 1;
		var currentRowCount = 0;
		for ( var i = 0; i < favorite.length; i++) {
			var Disc = 0;
			var productName = $('#productName' + favorite[i]).html();
			var slaveId = $('#patientSlaveId' + favorite[i]).html();
			var productId = $('#productId' + favorite[i]).html();
			var pack = $('#pack' + favorite[i]).html();
			var expiry = $('#expiry' + favorite[i]).html();
			var unit = $('#unit' + favorite[i]).html();
			var batchCode = $('#batchCode' + favorite[i]).html();
			var batchId = $('#batchId' + favorite[i]).html();
			var mrp = $('#mrp' + favorite[i]).html();
			var batchRate = $('#rate' + favorite[i]).html();
			var vat = $('#vat' + favorite[i]).html();
			var qty = $('#qty' + favorite[i]).html();
			var purRate = $('#purRate' + favorite[i]).html();
			
			if ($('#Disc' + favorite[i]).html() != null
					&& $('#Disc' + favorite[i]).html() != "null")
				Disc = $('#Disc' + favorite[i]).html();

			$("#RowCount").val(rowCount);
			divContent = divContent
					+ "<tr id='remove"
					+ rowCount
					+ "'><td><label class='input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text' id='txtCreditNoteSlavePatientId"
					+ rowCount
					+ "'  name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlavePatientId'"
					+ " class='form-control input-SmallText' readonly='true' value='"
					+ slaveId
					+ "'></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='hidden' name='creditNoteSlaves["
					+ i
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "' value='"
					+ productId
					+ "'>"

					+ "<input data-toggle='modal' data-target='#CreditNote_PopUp_Form' id='textProductName"
					+ rowCount
					+ "' type='text' class='form-control input-SmallText # deleteGroup1 # textNo' onclick='load("
					+ rowCount
					+ ")' name='creditNoteSlaves["
					+ i
					+ "].productMaster.productName' value='"
					+ productName
					+ "' readonly='true'></td>"
					+ "<td><input type='text'  id='textUnit"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
					+ i
					+ "].productMaster.productUnit' value='"
					+ unit
					+ "' readonly='true'></td>"

					+ "<td><input type='text' id='textPack"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
					+ i
					+ "].productMaster.packingMaster.packType' value='"
					+ pack
					+ "' readonly='true'></td>"

					+ "<td><input type='text' id='textVat"
					+ rowCount
					+ "' class='form-control input-SmallText' value='"
					+ vat
					+ "' name='creditNoteSlaves["
					+ i
					+ "].creditSlaveVat' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text' id='textCreditSlaveVatAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditSlaveVatAmt' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textRatePerUnit"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveRatePerUnit' readonly='true'></td>"

					+ "<td><input type='text' id='txtDispenceQty"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly value='"
					+ qty
					+ "' ></td>"

					+ "<td style=display:none;><input type='text' id='txtDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveDiscAmt' readonly value='"
					+ Disc
					+ "' ></td>"

					+ "<td><input type='text' id='txtQty"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
					+ i
					+ "].creditSlaveQty' onblur='calculatePatientAmount("
					+ rowCount
					+ "),calculateVatAmt("
					+ rowCount
					+ ")'></td>"

					+ "<td><input type='text' id='txtBatchNo"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveBatchCode' value='"
					+ batchCode
					+ "' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ i
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true' value='"
					+ batchId
					+ "'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ i
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ i
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td><input type='text' id='txtExpiry"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveBatchExpiry' value='"
					+ expiry
					+ "' readonly='true'></td>"

					+ "<td><input type='text' id='txtMRP"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveMrp' value='"
					+ mrp
					+ "'></td>"

					+ "<td><input type='text' id='txtRate"
					+ rowCount
					+ "' class='form-control  input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveRate' value='"
					+ batchRate
					+ "'></td>"

					+ "<td><input type='text' id='txtCode"
					+ rowCount
					+ "'  name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveCode'"
					+ " class='form-control input-SmallText' value='stock' readonly='true'></td>"

					+ "<td><input type='text' id='textPurchaseRate"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly='true'  value='"
					+ purRate
					+ "'></td>"

					+ "<td><input type='text' value='0' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveAmt' id='txtAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"
					+ "<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>"

					+ "</tr>";
			rowCount++;
			currentRowCount++;
		}
		divContent = divContent
				+ "<input type='hidden' id='hiddenCurrentRow' value='"
				+ currentRowCount + "'";
		$('#DRRDiv').html(divContent);
		$('#credit_note_indent_data').hide();
	}
	$("#txtQty1").focus();
	fetchPendingAmount($("#hiddenCreditNoteTratmentId").val());
}

function setAllPateintData(r) {
	var divContent = "";
	divContent = divContent
			+ "<select name='patientPendingIndentData' id='patientPendingIndentData' onchange='displayAllIndentReceiptData(this.value)' style='margin-top:0%' class='col-md-12-1'><option value='0'>Select Patient</option>";

	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<option value='" + r[i].treatmentId + "'>"
				+ r[i].patientName + "$$" + r[i].patientAddress + "$$"
				+ r[i].patientMobileNumber + "$$" + +r[i].treatmentId
				+ "</option>";

	}
	divContent = divContent + "</select>";

	$("#patientData1").html(divContent);

	$("#receiptData1").hide();

}

function getTreatmentDetails(patientId)
{
		
			var inputs = [];
			inputs.push('patientId=' + patientId);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/report/getTreatmentDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					
					var data=jQuery.parseJSON(r);
					var divContent="<div class='col-md-5-1' style='margin-top:2px;'><label for='product'>Select Treatment :</label></div><div class='col-md-6-1'><select id='treatmentSelect' name='treatmentSelect' onchange='displayAllIndentReceiptData(this.value)' style='margin-top:6px'><option>Select Treatment Id</option>";
					
					for(var i=0;i<data.length;i++)
					{
						divContent=divContent+"<option value="+data[i].treatmentId+">"+data[i].treatmentId+" - "+data[i].status+"</option>";
					}
					divContent=divContent+"</select></div>";
					$("#divPatientWiseTreatment").html(divContent);
				}
			});
			return true;
}


function displayAllCounterReceiptData() {

	var patientName = $('#searchBox').val();
	var inputs = [];
	inputs.push('patientName=' + patientName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/counterSale/getAllCounterDataByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setAllCounterSaleData(r);

				}
			});
	return true;
}

function setAllCounterSaleData(r) {
	var divContent = "";
	divContent = divContent
			+ "<select name='patientReceiptData' id='patientReceiptData' onchange='displayAllCounterSaleData(this.value)'><option value='0'>Select Receipt Number</option>";

	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<option value='" + r[i].counterSaleId + "'>"
				+ r[i].counterSaleId + "</option>";

	}
	divContent = divContent + "</select>";

	$("#receiptData4").html(divContent);
	$("#receiptData4").show();

}

function displayAllPatientReceiptData() {

	var patientId = $('#hiddenPatientId').val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/patientSale/getAllPatientReceiptDataByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setAllPatientReceiptData(r);

				}
			});
	return true;
}
function setAllPatientReceiptData(r) {
	var divContent = "";
	divContent = divContent
			+ "<select name='patientReceiptData' id='patientReceiptData' onchange='displayAllPatientSaleData(this.value)'><option value='0'>Select Receipt Number</option>";

	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<option value='" + r[i].patientSalesBillId
				+ "'>" + r[i].patientSalesBillId + "</option>";

	}
	divContent = divContent + "</select>";

	$("#receiptData2").html(divContent);

}
function displayAllPatientSaleData(id) {

	
	var value =0;
	if(id!="" && id!=null)
		value=id;
	else
		value=$('#billNumber').val();
	
	if(value=="" || value==0 || value==null)
		return;
	
	var inputs = [];
	inputs.push('patientId=' + value);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/patientSale/getAllPatientBillSaleData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {

			setAllPateintSaleBillData(r);
		}
	});
	return true;

}

function displayAllCounterSaleData() {

	var inputs = [];
	var value = $('#searchBox').val();
	inputs.push('counterSaleId=' + value);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/counterSale/getAllCounterBillSaleData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			if (r != "")
				setAllCounterData(r);
			else {
				alert("Record not found!");
				$('#searchBox').val('');
			}

		}
	});
	return true;

}
function setAllCounterData(r) {
	var divContent = "<div class='col-md-1' style='float:right'><button class='btn btn-xs btn-info' onclick='setCounterSaleData()' type='button'>Ok</button></div>";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Counter Date</th><th>Net Amount</th><th>Product</th><th>Unit</th><th>Pack</th><th>Batch Code</th><th>Batch Expiry </th><th>Vat</th><th>Qty </th><th>Rate</th><th>Pur. Rate</th><th>Select</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {

		divContent = divContent + "<tbody><tr><td>" + r[i].counter_sale_for_date
				+ "</td>  <td> " + r[i].counter_sale_net_amt
				+ "</td>  <td id='productName" + r[i].counter_slave_id + "'>"
				+ r[i].product_name + "</td> <td id='unit" + r[i].counter_slave_id
				+ "'>" + r[i].product_uom_unit + "</td> <td id='pack" + r[i].counter_slave_id
				+ "'>" + r[i].pack_type + "</td> <td id='batchCode"
				+ r[i].counter_slave_id + "'>" + r[i].counter_slave_batch_code
				+ "</td> <td id='expiry" + r[i].counter_slave_id + "'>"
				+ r[i].counter_slave_batch_expiry + "</td><td id='vat" + r[i].counter_slave_id
				+ "'>" + r[i].counter_slave_vat + "</td>  <td id='qty" + r[i].counter_slave_id
				+ "'>" + r[i].counter_sale_slave_issue_qty + "</td><td id='rate" + r[i].counter_slave_id
				+ "' >" + r[i].mrp1
				+ "</td><td id='purRate" + r[i].counter_slave_id
				+ "' >" + r[i].pur_rate
				+ "</td><td><input type='checkbox' id='selectProduct"
				+ r[i].counter_slave_id + "' name='selectProduct' value='"
				+ r[i].counter_slave_id + "'></td>" + "<td id='productId"
				+ r[i].counter_slave_id + "' style='display:none'>"
				+ r[i].counter_slave_product_id + "</td><td id='counterSaleId"
				+ r[i].counter_slave_id + "' style='display:none'>"
				+ r[i].counter_sale_id + "</td><td id='batchId"
				+ r[i].counter_slave_id + "' style='display:none'>"
				+ r[i].counter_slave_BatchId + "</td>" + "<td id='mrp" + r[i].counter_slave_id
				+ "' style='display:none'>" + r[i].mrp1 + "</td>"
				+ "<td id='batchRate" + r[i].counter_slave_id
				+ "' style='display:none'>" + r[i].rate1
				+ "</td><td id='fName" + r[i].counter_slave_id
				+ "' style='display:none' value='" + r[i].counter_sale_patient_name + "' >"
				+ r[i].counter_sale_patient_name + "</td><td id='paddress"
				+ r[i].counter_slave_id + "' style='display:none'>"
				+ r[i].counter_sale_address + "</td><td id='phoneNumber"
				+ r[i].counter_slave_id + "' style='display:none'>"
				+ r[i].counter_sale_mobile + "</td><td id='counterSlaveId"
				+ r[i].counter_slave_id + "' style='display:none'>"
				+ r[i].counter_slave_id + "</td><td id='Disc"
				+ r[i].counter_slave_id + "' style='display:none' >"
				+ r[i].discount + "</td></tr></tbody";

	}
	divContent = divContent + "</table>";

	$("#counterSalePendingData").html(divContent);

}

function setCounterSaleData() {
	
	var patientId = $("input[name='selectProduct']:checked").val();
	$("#txtPatientName").val($('#fName' + patientId).html());
	$("#txtPatientAddress").val($('#paddress' + patientId).html());
	$("#txtPhone").val($('#phoneNumber' + patientId).html());
	$("#txtPatientId").val($('#counterSaleId' + patientId).html());
	$("#counterSaleId").val($('#counterSaleId' + patientId).html());
	$("#patientSaleDiv").show("show");

	$("#type").val("counterSale");

	$('#credit_note_counter_data').modal('hide');
	$('#credit_note_counter_data').hide();

	var favorite = [];

	$.each($("input[name='selectProduct']:checked"), function() {
		favorite.push($(this).val());
	});

	if (favorite.length == 0) {
		alert("Select atleast one record");
	} else {
		var divContent = "";
		var rowCount = 1;
		var currentRowCount = 0;
		for ( var i = 0; i < favorite.length; i++) {
			var Disc = 0;
			var productName = $('#productName' + favorite[i]).html();
			var counterSlaveId = $('#counterSlaveId' + favorite[i]).html();
			var productId = $('#productId' + favorite[i]).html();
			var pack = $('#pack' + favorite[i]).html();
			var expiry = $('#expiry' + favorite[i]).html();
			var unit = $('#unit' + favorite[i]).html();
			var batchCode = $('#batchCode' + favorite[i]).html();
			var batchId = $('#batchId' + favorite[i]).html();
			var mrp = $('#mrp' + favorite[i]).html();
			var batchRate = $('#rate' + favorite[i]).html();
			var vat = $('#vat' + favorite[i]).html();
			var qty = $('#qty' + favorite[i]).html();
			var purRate = $('#purRate' + favorite[i]).html();

			if ($('#Disc' + favorite[i]).html() != null
					&& $('#Disc' + favorite[i]).html() != "null")
				Disc = $('#Disc' + favorite[i]).html();

			$("#RowCount").val(rowCount);
			divContent = divContent
					+ "<tr id='remove"
					+ rowCount
					+ "'><td><label class='input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text' id='txtCreditNoteSlaveCounterId"
					+ rowCount
					+ "'  name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveCounterId'"
					+ " class='form-control input-SmallText' readonly='true' value='"
					+ counterSlaveId
					+ "'></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
					+ rowCount
					+ "' readonly='true' ></td>"

				    + "<td><input type='hidden' name='creditNoteSlaves["
					+ i
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "' value='"
					+ productId
					+ "'>"

					+ "<input data-toggle='modal' data-target='#CreditNote_PopUp_Form' id='textProductName"
					+ rowCount
					+ "' type='text' class='form-control input-SmallText # deleteGroup1 # textNo' onclick='load("
					+ rowCount
					+ ")' name='creditNoteSlaves["
					+ i
					+ "].productMaster.productName' value='"
					+ productName
					+ "' readonly='true'></td>"
					+ "<td><input type='text'  id='textUnit"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
					+ i
					+ "].productMaster.productUnit' value='"
					+ unit
					+ "' readonly='true'></td>"

					+ "<td><input type='text' id='textPack"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
					+ i
					+ "].productMaster.packingMaster.packType' value='"
					+ pack
					+ "' readonly='true'></td>"

					+ "<td><input type='text' id='textVat"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
					+ i
					+ "].creditSlaveVat' value='"
					+ vat
					+ "' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textRatePerUnit"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveRatePerUnit' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textCreditSlaveVatAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditSlaveVatAmt' readonly='true'></td>"

					+ "<td><input type='text' id='txtDispenceQty"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly value='"
					+ qty
					+ "' ></td>"

					+ "<td style=display:none;><input type='text' id='txtDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveDiscAmt'  readonly value='"
					+ Disc
					+ "' ></td>"

					+ "<td><input type='text' id='txtQty"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
					+ i
					+ "].creditSlaveQty' onblur='calculateIndentAmount("
					+ rowCount
					+ "),calculateVatAmt("
					+ rowCount
					+ ")'></td>"

					+ "<td><input type='text' id='txtBatchNo"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveBatchCode' value='"
					+ batchCode
					+ "' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ i
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true' value='"
					+ batchId
					+ "'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ i
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ i
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td><input type='text' id='txtExpiry"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveBatchExpiry' value='"
					+ expiry
					+ "' readonly='true'></td>"

					+ "<td><input type='text' id='txtMRP"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveMrp' value='"
					+ mrp
					+ "'></td>"

					+ "<td><input type='text' id='txtRate"
					+ rowCount
					+ "' class='form-control  input-SmallText' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveRate' value='"
					+ batchRate
					+ "'></td>"

					+ "<td><input type='text' id='txtCode"
					+ rowCount
					+ "'  name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveCode'"
					+ " class='form-control input-SmallText' value='stock' readonly='true'></td>"

					+ "<td><input type='text' id='textPurchaseRate"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly='true'  value='"
					+ purRate
					+ "'></td>"
					+ "<td><input type='text' value='0' name='creditNoteSlaves["
					+ i
					+ "].creditNoteSlaveAmt' id='txtAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"
					+ "<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>"

					+ "</tr>";
			rowCount++;
			currentRowCount++;
		}
		divContent = divContent
				+ "<input type='hidden' id='hiddenCurrentRow' value='"
				+ currentRowCount + "'";
		$('#DRRDiv').html(divContent);

	}
	$("#txtQty1").focus();

}

function displayAllIndentReceiptData(value) {

	$('#hiddenTreatmentId').val(value);
	var inputs = [];
	inputs.push('treatmentId=' + value);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/indentSale/getAllIndentReceiptDataByTreatmentId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setAllIndentReceiptData(r);

				}
			});
	return true;
}

function setAllIndentReceiptData(r) {
	var divContent = "";
	divContent = divContent
			+ "<select name='indentReceiptData' id='indentReceiptData' onchange='displayAllProductData(this.value)'><option value='0'>Select Receipt Number</option>";

	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<option value='" + r[i].indentId + "'>"
				+ r[i].indentId + "</option>";

	}
	divContent = divContent + "</select>";

	$("#indentReceiptData").html(divContent);

}

function displayAllProductData(value) {

	$('#hiddenTreatmentId').val(value);
	var inputs = [];
	inputs.push('indentId=' + value);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/indentSale/getAllIndentProductDataByTreatmentId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setAllIndentProductData(r);

				}
			});
	return true;
}

function setAllIndentProductData(r) {
	
	var divContent = "<div class='col-md-4' style='float:right'><button class='btn btn-xs btn-info' onclick='setProducts()' style='margin-left:31%' type='button'>Ok</button>  <button class='btn btn-xs btn-danger' onclick='selectAllProducts()' type='button'>Select All</button> <button class='btn btn-xs btn-success' onclick='unSelectAllProducts()' type='button'>UnSelect All</button></div>";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf' style='margin-top:2%'><thead><tr><th>Indent Date</th><th>Net Amount</th><th>Product</th><th>Unit</th><th>Pack</th><th>Batch Code</th><th>Batch Expiry </th><th>Vat</th><th>Qty </th><th>Rate</th><th>Pur. Rate</th><th>Select</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {

		divContent = divContent + "<tbody><tr><td>" + r[i].indentDate
				+ "</td>  <td> " + r[i].netAmount
				+ "</td>  <td id='productName" + r[i].indentSlaveId + "'>"
				+ r[i].productName + "</td> <td id='unit" + r[i].indentSlaveId
				+ "'>" + r[i].unit + "</td> <td id='pack" + r[i].indentSlaveId
				+ "'>" + r[i].pack + "</td> <td id='batchCode"
				+ r[i].indentSlaveId + "'>" + r[i].batchCode
				+ "</td> <td id='expiry" + r[i].indentSlaveId + "'>"
				+ r[i].batchExpiry + "</td><td id='vat" + r[i].indentSlaveId
				+ "'>" + r[i].vat + "</td>  <td id='qty" + r[i].indentSlaveId
				+ "'>" + r[i].qty + "</td><td id='rate" + r[i].indentSlaveId
				+ "'>" + r[i].batchRate
				+ "</td><td id='purRate" + r[i].indentSlaveId
				+ "' >" + r[i].purRate
				+ "</td><td><input type='checkbox' class='selectProduct' id='selectProduct" 
				+ r[i].indentSlaveId + "' name='selectProduct' value='"
				+ r[i].indentSlaveId + "'></td>" + "<td id='productId"
				+ r[i].indentSlaveId + "' style='display:none'>"
				+ r[i].productId + "</td><td id='indentId" + r[i].indentSlaveId
				+ "' style='display:none'>" + r[i].indentId
				+ "</td><td id='indentId" + r[i].indentSlaveId
				+ "' style='display:none'>" + r[i].indentId
				+ "</td><td id='batchId" + r[i].indentSlaveId
				+ "' style='display:none'>" + r[i].batchId + "</td>"
				+ "<td id='mrp" + r[i].indentSlaveId
				+ "' style='display:none'>" + r[i].mrp + "</td><td id='discAmt"
				+ r[i].indentSlaveId + "' style='display:none' >"
				+ r[i].discAmt + "</td>" + "<td id='batchRate" + r[i].indentSlaveId
				+ "' style='display:none'>" + r[i].batchRate
				+ "</td><td id='patientId" + r[i].indentSlaveId
				+ "' style='display:none'>" + r[i].patientId
				+ "</td><td id='indentSaleType" + r[i].indentSlaveId
				+ "' style='display:none'>" + r[i].saleType
				+ "</td></tr></tbody";
		
		$('#hiddenPatientId').val(r[i].patientId);
		

	}
	divContent = divContent + "</table>";

	$("#indentPendingData").html(divContent);

}

function selectAllProducts()
{
	$(".selectProduct").prop('checked', true);
}

function unSelectAllProducts()
{
	$(".selectProduct").prop('checked', false);
}

function setProducts() {

	/*var patientData = $('#patientPendingIndentData :selected').text();
	var result = patientData.split("$$");

	$('#txtPatientName').val(result[0]);
	$('#txtPatientAddress').val(result[1]);
	$('#txtPhone').val(result[2]);

	var value = $("input[name='selectProduct']:checked").val();
	$("#patientId").val($('#patientId' + value).html());

	$("#txtPatientId").val($('#indentId' + value).html());

	$("#patientSaleDiv").show();

	$('#hiddenCreditNoteTratmentId').val(result[3]);

	$("#type").val("indentSale");

	if (result[3] != '' && result[3] != null) {
		var favorite = [];

		$.each($("input[name='selectProduct']:checked"), function() {
			favorite.push($(this).val());
		});

		if (favorite.length == 0) {
			alert("Select atleast one record");
		} else {
			var divContent = "";
			var rowCount = 1;
			var currentRowCount = 0;
			for ( var i = 0; i < favorite.length; i++) {
				var productName = $('#productName' + favorite[i]).html();
				var indentId = $('#indentId' + favorite[i]).html();
				var productId = $('#productId' + favorite[i]).html();
				var pack = $('#pack' + favorite[i]).html();
				var expiry = $('#expiry' + favorite[i]).html();
				var unit = $('#unit' + favorite[i]).html();
				var batchCode = $('#batchCode' + favorite[i]).html();
				var batchId = $('#batchId' + favorite[i]).html();
				var mrp = $('#mrp' + favorite[i]).html();
				var batchRate = $('#rate' + favorite[i]).html();
				var vat = $('#vat' + favorite[i]).html();
				var discAmt = $('#discAmt' + favorite[i]).html();
				var qty = $('#qty' + favorite[i]).html();

				$("#RowCount").val(rowCount);
				divContent = divContent
						+ "<tr id='remove"
						+ rowCount
						+ "'><td><label class='input-SmallText'>"
						+ (rowCount)
						+ "</label></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
						+ rowCount
						+ "' readonly='true' ></td>"

						+ "<td style='display:none;'><input type='text' id='txtCreditNoteSlaveIndentId"
						+ rowCount
						+ "'  name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveIndentId'"
						+ " class='form-control input-SmallText' readonly='true' value='"
						+ indentId
						+ "'></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
						+ rowCount
						+ "' readonly='true' ></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
						+ rowCount
						+ "' readonly='true' ></td>"
						+ "<td><input type='hidden' name='creditNoteSlaves["
						+ i
						+ "].productMaster.productId' id='hiddenProductId"
						+ rowCount
						+ "' value='"
						+ productId
						+ "'>"

						+ "<input data-toggle='modal' data-target='#CreditNote_PopUp_Form' id='textProductName"
						+ rowCount
						+ "' type='text' class='form-control input-SmallText' onclick='load("
						+ rowCount
						+ ")' name='creditNoteSlaves["
						+ i
						+ "].productMaster.productName' value='"
						+ productName
						+ "' readonly='true'></td>"
						+ "<td><input type='text'  id='textUnit"
						+ rowCount
						+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
						+ i
						+ "].productMaster.productUnit' value='"
						+ unit
						+ "' readonly='true'></td>"

						+ "<td><input type='text' id='textPack"
						+ rowCount
						+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
						+ i
						+ "].productMaster.packingMaster.packType' value='"
						+ pack
						+ "' readonly='true'></td>"

						+ "<td><input type='text' id='textVat"
						+ rowCount
						+ "' class='form-control input-SmallText' value='"
						+ vat
						+ "' name='creditNoteSlaves["
						+ i
						+ "].creditSlaveVat' readonly='true' ></td>"

						+ "<td style='display:none;'><input type='text' id='textCreditSlaveVatAmt"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditSlaveVatAmt' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' id='textRatePerUnit"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveRatePerUnit' readonly='true'></td>"

						+ "<td><input type='text' id='txtDispenceQty"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly value='"
						+ qty
						+ "' ></td>"

						+ "<td><input type='text' id='txtDisAmt"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveDiscAmt' readonly value='"
						+ discAmt
						+ "' ></td>"

						+ "<td><input type='text' id='txtQty"
						+ rowCount
						+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
						+ i
						+ "].creditSlaveQty' onblur='calculateIndentAmount("
						+ rowCount
						+ "),calculateVatAmt("
						+ rowCount
						+ ")'></td>"

						+ "<td><input type='text' id='txtBatchNo"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveBatchCode' value='"
						+ batchCode
						+ "' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
						+ i
						+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true' value='"
						+ batchId
						+ "'></td>"

						+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
						+ i
						+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
						+ i
						+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td><input type='text' id='txtExpiry"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveBatchExpiry' value='"
						+ expiry
						+ "' readonly='true'></td>"

						+ "<td><input type='text' id='txtMRP"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveMrp' value='"
						+ mrp
						+ "'></td>"

						+ "<td><input type='text' id='txtRate"
						+ rowCount
						+ "' class='form-control  input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveRate' value='"
						+ batchRate
						+ "'></td>"

						+ "<td><input type='text' id='txtCode"
						+ rowCount
						+ "'  name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveCode'"
						+ " class='form-control input-SmallText' value='stock' readonly='true'></td>"

						+ "<td><input type='text' value='0' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveAmt' id='txtAmt"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"
						+ "<td><input type='checkbox' name='deleteGroup' value='"
						+ (rowCount) + "' id='deleteGroup" + (rowCount)
						+ "'></td>";
				+"<td><input type='checkbox' name='deleteGroup' value='"
						+ (rowCount) + "' id='deleteGroup" + (rowCount)
						+ "'></td>"

						+ "</tr>";
				rowCount++;
				currentRowCount++;
			}
			divContent = divContent
					+ "<input type='hidden' id='hiddenCurrentRow' value='"
					+ currentRowCount + "'";
			$('#DRRDiv').html(divContent);
			$('#credit_note_indent_data').hide();
		}

	} else {
		alert("select Patient");
	}
	fetchPendingAmount(result[3]);*/
	
	//new code by suraj
	
	/*var patientData = $('#patientPendingIndentData :selected').text();
	var result = patientData.split("$$");*/

	/*
	$('#txtPatientAddress').val(result[1]);
	$('#txtPhone').val(result[2]);*/
	
	$('#txtPatientName').val($("#txtPatientName1").val());
	$('#txtPatientAddress').val($("#hiddenIndentSalePatientAddress").val());
	$('#txtPhone').val($("#hiddenIndentSalePatientNumber").val());
	
	var value = $("input[name='selectProduct']:checked").val();
	$("#patientId").val($('#hiddenPatientId').val());
	$("#txtPatientId").val($('#indentId' + value).html());
	
	$("#patientSaleDiv").show();
	
	var selectedTreatId=$('#treatmentSelect :selected').val();
	$('#hiddenCreditNoteTratmentId').val(selectedTreatId);
	$("#type").val("indentSale");
	
	$("#hiddenSaleTypeId").val($('#indentSaleType' + value).html());
	var indentId = $('#indentId' + value).html();
	$("#hiddenIndentId").val(indentId);
	
	if (selectedTreatId != '' && selectedTreatId != null) {
		var favorite = [];

		$.each($("input[name='selectProduct']:checked"), function() {
			favorite.push($(this).val());
		});

		if (favorite.length == 0) {
			alert("Select atleast one record");
		} else {
			var divContent = "";
			var rowCount = 1;
			var currentRowCount = 0;
			for ( var i = 0; i < favorite.length; i++) {
				var productName = $('#productName' + favorite[i]).html();
				var indentId = $('#indentId' + favorite[i]).html();
				var productId = $('#productId' + favorite[i]).html();
				var pack = $('#pack' + favorite[i]).html();
				var expiry = $('#expiry' + favorite[i]).html();
				var unit = $('#unit' + favorite[i]).html();
				var batchCode = $('#batchCode' + favorite[i]).html();
				var batchId = $('#batchId' + favorite[i]).html();
				var mrp = $('#mrp' + favorite[i]).html();
				var batchRate = $('#rate' + favorite[i]).html();
				var vat = $('#vat' + favorite[i]).html();
				var discAmt = $('#discAmt' + favorite[i]).html();
				var qty = $('#qty' + favorite[i]).html();
				var purRate = $('#purRate' + favorite[i]).html();
              	$("#RowCount").val(rowCount);
				
				divContent = divContent
						+ "<tr id='remove"
						+ rowCount
						+ "'><td><label class='input-SmallText'>"
						+ (rowCount)
						+ "</label></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
						+ rowCount
						+ "' readonly='true' ></td>"

						+ "<td style='display:none;'><input type='text' id='txtCreditNoteSlaveIndentId"
						+ rowCount
						+ "'  name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveIndentId'"
						+ " class='form-control input-SmallText' readonly='true' value='"
						+ indentId
						+ "'></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
						+ rowCount
						+ "' readonly='true' ></td>"

						+ "<td><input type='hidden' name='creditNoteSlaves["
						+ i
						+ "].productMaster.productId' id='hiddenProductId"
						+ rowCount
						+ "' value='"
						+ productId
						+ "'>"

						+ "<input data-toggle='modal' data-target='#CreditNote_PopUp_Form' id='textProductName"
						+ rowCount
						+ "' type='text' class='form-control input-SmallText # deleteGroup1 # textNo' onclick='load("
						+ rowCount
						+ ")' name='creditNoteSlaves["
						+ i
						+ "].productMaster.productName' value='"
						+ productName
						+ "' readonly='true'></td>"
						+ "<td><input type='text'  id='textUnit"
						+ rowCount
						+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
						+ i
						+ "].productMaster.productUnit' value='"
						+ unit
						+ "' readonly='true'></td>"

						+ "<td><input type='text' id='textPack"
						+ rowCount
						+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
						+ i
						+ "].productMaster.packingMaster.packType' value='"
						+ pack
						+ "' readonly='true'></td>"

						+ "<td><input type='text' id='textVat"
						+ rowCount
						+ "' class='form-control input-SmallText' value='"
						+ vat
						+ "' name='creditNoteSlaves["
						+ i
						+ "].creditSlaveVat' readonly='true' ></td>"

						+ "<td style='display:none;'><input type='text' id='textCreditSlaveVatAmt"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditSlaveVatAmt' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' id='textRatePerUnit"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveRatePerUnit' readonly='true'></td>"

						+ "<td><input type='text' id='txtDispenceQty"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly value='"
						+ qty
						+ "' ></td>"

						+ "<td style=display:none;><input type='text' id='txtDisAmt"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveDiscAmt' readonly value='"
						+ discAmt
						+ "' ></td>"

						+ "<td><input type='text' id='txtQty"
						+ rowCount
						+ "' class='form-control input-SmallText'  name='creditNoteSlaves["
						+ i
						+ "].creditSlaveQty' onblur='calculateIndentAmountWithSaleType("
						+ rowCount
						+ "),calculateVatAmt("
						+ rowCount
						+ ")'></td>"

						+ "<td><input type='text' id='txtBatchNo"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveBatchCode' value='"
						+ batchCode
						+ "' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
						+ i
						+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true' value='"
						+ batchId
						+ "'></td>"

						+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
						+ i
						+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
						+ i
						+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td><input type='text' id='txtExpiry"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveBatchExpiry' value='"
						+ expiry
						+ "' readonly='true'></td>"

						+ "<td><input type='text' id='txtMRP"
						+ rowCount
						+ "' class='form-control input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveMrp' value='"
						+ mrp
						+ "'></td>"

						+ "<td><input type='text' id='txtRate"
						+ rowCount
						+ "' class='form-control  input-SmallText' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveRate' value='"
						+ batchRate
						+ "'></td>"

						+ "<td><input type='text' id='txtCode"
						+ rowCount
						+ "'  name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveCode'"
						+ " class='form-control input-SmallText' value='stock' readonly='true'></td>"

						+ "<td><input type='text' id='textPurchaseRate"
						+ rowCount
						+ "' class='form-control  input-SmallText' readonly='true'  value='"
						+ purRate
						+ "'></td>"

						+ "<td><input type='text' value='0' name='creditNoteSlaves["
						+ i
						+ "].creditNoteSlaveAmt' id='txtAmt"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"
						+ "<td><input type='checkbox' name='deleteGroup' value='"
						+ (rowCount) + "' id='deleteGroup" + (rowCount)
						+ "'></td>";
				+"<td><input type='checkbox' name='deleteGroup' value='"
						+ (rowCount) + "' id='deleteGroup" + (rowCount)
						+ "'></td>"

						+ "</tr>";
				rowCount++;
				currentRowCount++;
			}
			divContent = divContent
					+ "<input type='hidden' id='hiddenCurrentRow' value='"
					+ currentRowCount + "'";
			$('#DRRDiv').html(divContent);
			$('#credit_note_indent_data').hide();
		}

	} else {
		alert("select Patient");
	}
	$("#txtQty1").focus();
	fetchPendingAmount(selectedTreatId);
	getSpecialDiscData($( "#indentReceiptData option:selected" ).val(),$("#type").val());
}

function fetchPendingAmount(treatmentId) {
	
	if ($("#type").val() == "indentSale") {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/creditNote/getPendingAmounttByTreatId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						$("#mainPendingBalance").html(r);
						$("#indentSalePreviousBalance").val(r);
					}
				});
		return true;
	}
	else if ($("#type").val() == "patientSale") {
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/getPendingAmount",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						$("#mainPendingBalance").html(r);
						$("#indentSalePreviousBalance").val(r);
					}
				});
		return true;
	}
}

function calculateCreditPending() {

	//for indent sale
	if ($('#radioCash').is(':checked') && $("#type").val() == "indentSale") {
		var netAmt = 0;
		//var amtReceive = 0;
		var prevBal = 0;

		if ($('#txtNetAmt').val() != '' && $('#txtNetAmt').val() != null)
			netAmt = parseFloat($('#txtNetAmt').val());

		if ($('#mainPendingBalance').html() != ''
				&& $('#mainPendingBalance').html() != null)
			prevBal = parseFloat($('#mainPendingBalance').html());
		//suraj code commented for onco
		/*if(prevBal>0)
		{
			var total = (prevBal - netAmt);
			if (total > 0) {
				$('#txtAmtBal').val(total.toFixed(2));
				$('#txtAmtRec').val(0);
			} else {
				
				$('#txtAmtBal').val(0);
				$('#txtAmtRec').val((total.toFixed(2)) * (-1));
			}
		}
		else
		{
				$('#txtAmtBal').val(prevBal);
				$('#txtAmtRec').val(netAmt);
		}*/	
		$('#txtAmtRec').val(netAmt);
		$('#txtAmtBal').val(prevBal);
	}
	else if ($('#radioCredit').is(':checked') && $("#type").val() == "indentSale") {
		var netAmt = 0;
		var amtReceive = 0;
		var prevBal = 0;

		if ($('#txtNetAmt').val() != '' && $('#txtNetAmt').val() != null)
			netAmt = parseFloat($('#txtNetAmt').val());

		if ($('#mainPendingBalance').html() != ''
				&& $('#mainPendingBalance').html() != null)
			prevBal = parseFloat($('#mainPendingBalance').html());
		
		var total=(prevBal)-(netAmt);
		$('#txtAmtBal').val(total.toFixed(2));
		
	}
	//for patient sale
	else if ($('#radioCash').is(':checked') && $("#type").val() == "patientSale") {
		var netAmt = 0;
		//var amtReceive = 0;
		var prevBal = 0;

		if ($('#txtNetAmt').val() != '' && $('#txtNetAmt').val() != null)
			netAmt = parseFloat($('#txtNetAmt').val());

		if ($('#mainPendingBalance').html() != ''
				&& $('#mainPendingBalance').html() != null)
			prevBal = parseFloat($('#mainPendingBalance').html());

		if(prevBal>0)
		{
			var total = (prevBal - netAmt);
			if (total > 0) {
				$('#txtAmtBal').val(total.toFixed(2));
				$('#txtAmtRec').val(0);
			} else {
				
				$('#txtAmtBal').val(0);
				$('#txtAmtRec').val(Math.round(total) * (-1));
			}
		}
		else
		{
				$('#txtAmtBal').val(prevBal);
				$('#txtAmtRec').val(netAmt);
		}	
	}
}

function calculateCounterAmount(value) {

	var qty = 0;
	var rate = 0;
	var ratePerUnit = 0;
	var unit = 0;
	var dispenceQty = 0;
	var dis = 0;
	var disAmt = 0;
	if ($("#txtQty" + value).val() != ''
			&& $("#txtQty" + value).val() != 'null') {
		qty = $("#txtQty" + value).val();
	}
	if ($("#txtRate" + value).val() != ''
			&& $("#txtRate" + value).val() != 'null') {
		rate = $("#txtRate" + value).val();
	}
	if ($('#textUnit' + value).val() != ''
			&& $('#textUnit' + value).val().length > 0) {
		unit = parseFloat($('#textUnit' + value).val());
	}

	if ($('#txtDispenceQty' + value).val() != ''
			&& $('#txtDispenceQty' + value).val().length > 0) {
		dispenceQty = parseFloat($('#txtDispenceQty' + value).val());
	}

	if ($('#txtDisAmt' + value).val() != ''
			&& $('#txtDisAmt' + value).val().length > 0) {
		dis = parseFloat($('#txtDisAmt' + value).val());
		disAmt = dis / dispenceQty;

	}

	ratePerUnit = (rate / unit).toFixed(2);

	$("#textRatePerUnit" + value).val(ratePerUnit);

	var finalAmout = (ratePerUnit * qty).toFixed(2);

	if (dispenceQty >= qty)

		$("#txtAmt" + value).val((finalAmout - (disAmt * qty)).toFixed(2));
	else {
		alert("Enter Qty less than dispence Qty");
		$("#txtQty" + value).val("");
		$("#txtAmt" + value).val("");
		$("#txtQty" + value).focus();
	}

	calculateGrossAmount1();
	calculateDiscount();

}

function calculateIndentAmount(value) {
	var qty = 0;
	var rate = 0;
	var ratePerUnit = 0;
	var unit = 0;
	var dispenceQty = 0;
	var dis = 0;
	var disAmt = 0;
	
	
	if ($("#txtQty" + value).val() != ''
			&& $("#txtQty" + value).val() != 'null') {
		qty = $("#txtQty" + value).val();
	}
	if ($("#txtRate" + value).val() != ''
			&& $("#txtRate" + value).val() != 'null') {
		rate = $("#txtRate" + value).val();
	}
	if ($('#textUnit' + value).val() != ''
			&& $('#textUnit' + value).val().length > 0) {
		unit = parseFloat($('#textUnit' + value).val());
	}

	if ($('#txtDispenceQty' + value).val() != ''
			&& $('#txtDispenceQty' + value).val().length > 0) {
		dispenceQty = parseFloat($('#txtDispenceQty' + value).val());
	}

	if ($('#txtDisAmt' + value).val() != ''
			&& $('#txtDisAmt' + value).val().length > 0) {
		dis = parseFloat($('#txtDisAmt' + value).val());
		disAmt=dis/dispenceQty;

	}
	ratePerUnit = (rate / unit).toFixed(2);
	
	$("#textRatePerUnit" + value).val(ratePerUnit);
	var finalAmout = (ratePerUnit * qty).toFixed(2);

	if (dispenceQty >= qty)
		$("#txtAmt" + value).val((finalAmout - (disAmt * qty)).toFixed(2));
	else {
		alert("Enter Qty less than dispence Qty");
		$("#txtQty" + value).val("");
		$("#txtAmt" + value).val("");
		$("#txtQty" + value).focus();
	}

	calculateGrossAmount1();
	calculateDiscount();

	calculateCreditPending();

}

function calculatePatientAmount(value) {
	var qty = 0;
	var rate = 0;
	var ratePerUnit = 0;
	var unit = 0;
	var dispenceQty = 0;
	var dis = 0;
	var disAmt = 0;
	
	if ($("#txtQty" + value).val() != ''
			&& $("#txtQty" + value).val() != 'null') {
		qty = $("#txtQty" + value).val();
	}
	
	if($("#hiddenSaleTypeId").val()==0)
	{
	if ($("#txtRate" + value).val() != ''
			&& $("#txtRate" + value).val() != 'null') {
		rate = $("#txtRate" + value).val();
	}
	}
	else if($("#hiddenSaleTypeId").val()==1)
	{
		if ($("#textPurchaseRate" + value).val() != ''&& $("#textPurchaseRate" + value).val() != 'null')
		{
			rate = $("#textPurchaseRate" + value).val();
		}
	}
	
	
	if ($('#textUnit' + value).val() != ''
			&& $('#textUnit' + value).val().length > 0) {
		unit = parseFloat($('#textUnit' + value).val());
	}

	if ($('#txtDispenceQty' + value).val() != ''
			&& $('#txtDispenceQty' + value).val().length > 0) {
		dispenceQty = parseFloat($('#txtDispenceQty' + value).val());
	}

	if ($('#txtDisAmt' + value).val() != ''
			&& $('#txtDisAmt' + value).val().length > 0) {
		dis = parseFloat($('#txtDisAmt' + value).val());
		/*disAmt=dis/dispenceQty;*/

	}
	/*alert(dis);*/
	ratePerUnit = (rate / unit).toFixed(2);

	$("#textRatePerUnit" + value).val(ratePerUnit);
	var finalAmout = (ratePerUnit * qty);

	if (dispenceQty >= qty)
		$("#txtAmt" + value).val((finalAmout - (dis/100 * finalAmout)).toFixed(2));
	else {
		alert("Enter Qty less than dispence Qty");
		$("#txtQty" + value).val("");
		$("#txtAmt" + value).val("");
		$("#txtQty" + value).focus();
	}

	calculateGrossAmount1();
	calculateDiscount();

	calculateCreditPending();

}
function calculateIndentAmountWithSaleType(value) {
	var qty = 0;
	var rate = 0;
	var ratePerUnit = 0;
	var unit = 0;
	var dispenceQty = 0;
	var dis = 0;
	var disAmt = 0;
			
	if ($("#txtQty" + value).val() != ''
			&& $("#txtQty" + value).val() != 'null') {
		qty = $("#txtQty" + value).val();
	}
	
	if($("#hiddenSaleTypeId").val()==0)
	{
		if ($("#txtMRP" + value).val() != ''
			&& $("#txtMRP" + value).val() != 'null') {
		rate = $("#txtMRP" + value).val();
	}
	}
	else
		if ($("#textPurchaseRate" + value).val() != ''&& $("#textPurchaseRate" + value).val() != 'null')
		{
			rate = $("#textPurchaseRate" + value).val();
		}
	
	if ($('#textUnit' + value).val() != ''
			&& $('#textUnit' + value).val().length > 0) {
		unit = parseFloat($('#textUnit' + value).val());
	}

	if ($('#txtDispenceQty' + value).val() != ''
			&& $('#txtDispenceQty' + value).val().length > 0) {
		dispenceQty = parseFloat($('#txtDispenceQty' + value).val());
	}

	if ($('#txtDisAmt' + value).val() != ''
			&& $('#txtDisAmt' + value).val().length > 0) {
		dis = parseFloat($('#txtDisAmt' + value).val());
		/*disAmt=dis/dispenceQty;*/

	}
	/*alert(dis);*/
	ratePerUnit = (rate / unit).toFixed(2);

	$("#textRatePerUnit" + value).val(ratePerUnit);
	var finalAmout = (ratePerUnit * qty).toFixed(2);

	if (dispenceQty >= qty)
		$("#txtAmt" + value).val((finalAmout - (dis/100 * finalAmout)).toFixed(2));
	else {
		alert("Enter Qty less than dispence Qty");
		$("#txtQty" + value).val("");
		$("#txtAmt" + value).val("");
		$("#txtQty" + value).focus();
	}

	calculateGrossAmount1();
	calculateDiscount();

	calculateCreditPending();

}


function calculateGrossAmount1() {
	var total = 0;
	for ( var i = 1; i <= $('#RowCount').val(); i++) {
		if ($('#txtAmt' + i).val() >= 0 && $('#txtAmt' + i).val() != ''
				&& $('#txtAmt' + i).val() != null) {
			total = ((parseFloat(total) + parseFloat($('#txtAmt' + i).val()))
					.toFixed(2));
		}

	}
	$('#txtGross').val(total);

	validateLess();
	calculateNetAmount1();
}

function calculateNetAmount1() {

	var gross = 0;
	var less = 0;
	var add = 0;
	//var totalNetAmt = 0;
	// net amount

	if ($('#txtGross').val() != '')
		gross = parseFloat($('#txtGross').val());

	if ($('#txtLess').val() != '')
		less = parseFloat($('#txtLess').val());

	if ($('#txtAdd').val() != '')
		add = parseFloat($('#txtAdd').val());

	$('#txtNetAmt').val(Math.round((gross - less) + add));

}

function validateLess() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var Less = parseFloat($('#txtLess').val());

	if (Less > GrossAmt) {
		alert("Less should be less than gross amount!");
		$('#txtDic').focus();
		$('#txtDic').val(0);
		$('#txtDiscount').val('');
		$('#txtNetAmt').val('');
		$('#txtLess').val('');
		$('#txtSurCharge').val('');
		$('#txtAdd').val('');
	}

}

function calculateDiscount() {
	var disc = 0;
	var gross = 0;
	//CALCULATING DISCOUNT AMOUNT OF CRIDIT NOTE COUNTER SALE 
	if ($('#txtDic').val() != '' && $('#txtDic').val().length > 0) {
		disc = parseFloat($('#txtDic').val());
	}

	if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
		gross = parseFloat($('#txtGross').val());
	}

	$('#txtDiscount').val(((gross * (disc / 100))).toFixed(2));
	

	if ($('#txtDiscount').val() != '' && $('#txtDiscount').val().length > 0) {
		dic = parseFloat($('#txtDiscount').val());
		$('#txtLess').val((dic).toFixed(2));
	}
	validateLess();
	calculateNetAmount();
	calculateCreditPending();
}

function validateDis() {
	var disc = 0;
	if ($('#txtDic').val() != '' && $('#txtDic').val().length > 0
			&& $('#txtDic').val() != '0') {
		disc = parseFloat($('#txtDic').val());
	}

	if (disc > 99) {
		alert("Discount should be less than 100");
		$('#txtDic').val('');
		$('#txtDiscount').val('');

	}

}

function splitPatientDetails(content) {
	$('#hiddenPatientId').val('');
	if (content != "") {
		var arr = content.split("-");

		$('#txtPatientName').val(arr[0]);
		if (arr.length > 1) {
			$('#txtPatientAddress').val(arr[1]);
			$('#hiddenPatientId').val(arr[2]);
		}
		$('#txtNarration').focus();
	} else {
		$('#hiddenPatientId').val(0);
	}
}
function splitPatientContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtPatientName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenCreditNoteId1').val(arr[1]);
		}
	} else {
		$('#hiddenCreditNoteId1').val(1);
	}
}

function searchCreditNotePatient(id) {
	resetCreditPopUpValues();
	var inputs = [];
	inputs.push('creditNoteId=' + id);

	if (id != null && id != "") {
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/creditNote/getCreditNotebyCreditId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						if (r == "") {
							alert("Record not found!");
							$('#txtPatientName').val('');
							$('#txtCreditNoteId1').val('');
						} else {
							$("#hiddenCreditNoteId1").val('');
							setTableContent(r);
						}
					}
				});
	} else {
		alert("Record not found!");
		$('#txtPatientName').val('');
		$('#txtCreditNoteId1').val('');
	}
	return true;
}
function getProductDetail(pId) {
	var productId = pId;
	if (productId != '') {
		var inputs = [];
		inputs.push('ProductId=' + productId);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/creditNote/getProductDetails",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {

				splitBatchCode(r);

			}
		});
		return true;
	}
}
function splitBatchCode(content) {
	if (content != "") {
		var arr = content.split("#");
		if (arr.length > 1) {
			$('#txtBatchNo').val(arr[0]);
			$('#txtExpiry').val(arr[1]);
			$('#txtClStk').val(arr[2]);
			$('#txtTotalStk').val(arr[2]);
		}
	}
}

function validationsOfQty() {
	var qty = parseInt($('#txtQty').val());
	var curStock = parseInt($('#txtClStk').val());

	if (qty > curStock) {
		alert("Quantity is less than current Stock");
	}
}

function toCreateCreditNotesDiv(RowCount, currentRowCount) {

	var currentRow = currentRowCount;

	if (currentRow == undefined) {
		currentRow = 0;
	}

	var j = 1;

	var rowCount = $('#' + RowCount).val();

	if (rowCount == undefined) {
		rowCount = 1;
	}

	if (rowCount == -1) {
		rowCount = 0;
	}
	if (rowCount == currentRow) {
		var result = DublicateRecord(currentRow);
		if (result == 1) {
			rowCount++;
			rowId = "remove" + rowCount;
			var x = document.createElement('tr');
			x.setAttribute('id', rowId);
			/* x.setAttribute('class', 'col-md-12-1'); */
			x.setAttribute('style', 'margin-top:0px');
			document.getElementById("DRRDiv").appendChild(x);
			var index = parseInt(rowCount) - 1;

			document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textCreditDisc"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='hidden' name='creditNoteSlaves["
					+ index
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "'>"

					+ "<input data-toggle='modal' data-target='#CreditNote_PopUp_Form' id='textProductName"
					+ rowCount
					+ "' type='text' class='form-control input-SmallText # deleteGroup1 # textNo' onclick='load("
					+ rowCount
					+ ")' name='creditNoteSlaves["
					+ index
					+ "].productMaster.productName'></td>"
					+ "<td><input type='text'  id='textUnit"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo'  name='creditNoteSlaves["
					+ index
					+ "].productMaster.productUnit' readonly='true'></td>"

					+ "<td><input type='text' id='textPack"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo'  name='creditNoteSlaves["
					+ index
					+ "].productMaster.packingMaster.packType' readonly='true'></td>"

					+ "<td><input type='text'name='creditNoteSlaves["
					+ index
					+ "].creditSlaveVat'  class='form-control input-SmallText # deleteGroup1 # textNo' id='textVat"
					+ rowCount
					+ "' readonly='true'></td>"

					+ "<td><input type='text' id='txtDispenceQty"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo' readonly='true'  readonly='true'></td>"

					+ "<td style=display:none;><input type='text' id='txtDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo' name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveDiscAmt'  readonly='true' readonly='true'></td>"

					+ "<td><input type='text' id='txtQty"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo'  name='creditNoteSlaves["
					+ index
					+ "].creditSlaveQty' readonly='true'></td>"

					+ "<td><input type='text' id='txtBatchNo"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo' name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveBatchCode' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ index
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textCreditSlaveVatAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ index
					+ "].creditSlaveVatAmt' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='creditNoteSlaves["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textRatePerUnit"
					+ rowCount
					+ "' class='form-control input-SmallText' name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveRatePerUnit' readonly='true'></td>"

					+ "<td><input type='text' id='txtExpiry"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo' name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveBatchExpiry' readonly='true'></td>"

					+ "<td><input type='text' id='txtMRP"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo' name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveMrp' readonly='true'></td>"

					+ "<td><input type='text' id='txtRate"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo' name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveRate' readonly='true'></td>"

					+ "<td><input type='text' id='txtCode"
					+ rowCount
					+ "'  name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveCode'"
					+ " class='form-control input-SmallText # deleteGroup1 # textNo' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup1 # textNo'  id='textPurchaseRate"
					+ rowCount
					+ "' readonly='true' ></td>"
					
					+ "<td><input type='text' value='0' name='creditNoteSlaves["
					+ index
					+ "].creditNoteSlaveAmt' id='txtAmt"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup1 # textNo' readonly='true'></td>"
					+ "<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"</tr>";
			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;

			$("#txtProductName" + rowCount).focus();
			fillRow(currentRowCount);
		}
	} else {

		var result = DublicateRecord(currentRow);
		if (result == 1) {
			fillRow(currentRowCount);
		}
	}

}

function fillRow(rCount) {
	var rowCount = parseInt(rCount);

	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#txtQty' + rowCount).val($('#txtQty').val());

	$('#txtCode' + rowCount).val($('#txtCode').val());
	$('#textSchm' + rowCount).val($('#txtScheme').val());
	$('#txtBatchNo' + rowCount).val($('#txtBatchNo').val());
	$('#txtExpiry' + rowCount).val($('#txtExpiry').val());
	$('#txtMRP' + rowCount).val($('#txtMrp').val());

	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
	$('#textStockId' + rowCount).val($('#hiddenStockId').val());
	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());
	$('#hiddenPurchaseSlaveId' + rowCount).val($('#hiddenPurchaseId').val());

	$('#textClStk' + rowCount).val($('#txtClStk').val());

	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());

	$('#textPurchaseRate' + rowCount).val($('#txtPRate').val());

	$('#textVat' + rowCount).val($('#txtVat').val());

	$('#textPurchaseRate' + rowCount).val($('#txtPRate').val());

	$('#txtDisAmt' + rowCount).val($('#txtDiscAmt').val());

	$('#textCreditDisc' + rowCount).val($('#txtDis').val());

	/*
	 * alert($('#textBatchId' + rowCount).val()); alert($('#textStockId' +
	 * rowCount).val()); alert($('#textStockQtyInHand' + rowCount).val());
	 */

	if ($('#txtMRP' + rowCount).val() != "") {

		$('#txtRate' + rowCount).val($('#txtRate').val());

		if ($('#txtAmt').val() != '' && $('#txtAmt').val().length > 0)
			$('#txtAmt' + rowCount).val($('#txtAmt').val());
		else
			$('#txtAmt' + rowCount).val(0);

		var rate = 0;
		var qty = 0;
		var gross = 0;

		if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
			rate = parseFloat($('#txtRate').val());

		if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
			qty = parseFloat($('#txtQty').val());

		$('#textRatePerUnit' + rowCount).val($('#txtRatePerUnit').val());
		$('#txtQty' + rowCount).focus();
		calculateGrossAmount();
		calculateDiscount();

		/*
		 * gross = parseFloat($('#txtGross').val()); $('#txtGross').val((rate *
		 * qty) + gross);
		 */
	}
	calculateVatAmt(rowCount);
	calculateNetAmount();
}

function calculateVatAmt(rCount) {
	var rowCount = parseInt(rCount);
	var Amt = parseFloat($('#txtAmt' + rowCount).val());
	var vat = parseFloat($('#textVat' + rowCount).val());

	var vatAmt = 100 + vat;

	/*var result=parseFloat(((Amt/vatAmt)*vat).toFixed(2));*/

	var result = (Math.floor(100 * ((Amt / vatAmt) * vat)) / 100).toFixed(2);

	$("#textCreditSlaveVatAmt" + rowCount).val(result);

}
function calculateGrossAmount() {
	var total = 0;
	for ( var i = 1; i <= $('#RowCount').val(); i++) {
		if ($('#txtAmt' + i).val() >= 0 && $('#txtAmt' + i).val() != ''
				&& $('#txtAmt' + i).val() != null) {
			total = ((parseFloat(total) + parseFloat($('#txtAmt' + i).val()))
					.toFixed(2));
		}

	}
	$('#txtGross').val(total);

	validateLess();
	calculateNetAmount();
}

function calculateAdd() {
	var add = 0;

	if ($('#txtSurCharge').val() != '' && $('#txtSurCharge').val().length > 0)
		add = parseFloat($('#txtSurCharge').val());

	$('#txtAdd').val(add);
	calculateNetAmount();
	calculateCreditPending();
}

function calculateNetAmount() {

	var gross = 0;
	var less = 0;
	var add = 0;
	var totalNetAmt = 0;
	// net amount

	if ($('#txtGross').val() != '')
		gross = parseFloat($('#txtGross').val());

	if ($('#txtLess').val() != '')
		less = parseFloat($('#txtLess').val());

	if ($('#txtAdd').val() != '')
		add = parseFloat($('#txtAdd').val());

	$('#txtNetAmt').val(Math.round((gross - less) + add));

}
function calculateAmount() {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var RatePerUnit = 0;
	var DiscAmt = 0;
	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0
			&& !isNaN($('#txtRate').val()))
		rate = parseFloat($('#txtRate').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0
			&& $('#txtUnit').val() != '' && $('#txtUnit').val().length > 0) {
		RatePerUnit = (rate / unit).toFixed(2);
	}
	$('#txtCode').focus();

	$("#txtRatePerUnit").val(RatePerUnit);
	var finalAmout = (RatePerUnit * qty).toFixed(2);

	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		DiscAmt = parseFloat($('#txtDiscAmt').val());
	}

	if (DiscAmt < finalAmout)

		$('#txtAmt').val((finalAmout - DiscAmt).toFixed(2));
	else {
		$('#txtAmt').val((RatePerUnit * qty).toFixed(2));
	}

	calculateGrossAmount();
}

function resetCreditPopUpValues() {
	$('#credit_note_pop_up').find('input:text').val('');
	$('#credit_note_pop_up').find('input:hidden').val('');
	$('#txtPatientName').val('');

}
// get formatted date dd/mm/yyyy
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
function deleteCreditNote(creditNoteId) {
	var retVal = confirm("Do you want to delete It?");
	reset();
	alertify.success("Record deleted successfully");
	if (retVal == true) {
		var inputs = [];
		inputs.push('creditNoteId=' + creditNoteId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/creditNote/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						// setTableContent(r);
						/* location.reload(true); */
						if (r == true) {

							/*
							 * $('#msgDiv') .html( "<div class='alert
							 * alert-success' >Record deleted successfully..!</div>");
							 * hideResultDiv(); location.reload();
							 */
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
function setTableContent(result) {
	var r = result;
	var divContent = "";

	var creditDate = getDate(r.creditNotDate);
	divContent = divContent
			+ " <tr><td class='col-md-1 center'>"
			+ 1
			+ " <input type='hidden' id='creditNoteId"
			+ r.creditNoteId
			+ "' value='"
			+ r.creditNoteId
			+ "'></td><td class='col-md-2 center'>"
			+ r.creditNoteId
			+ "<input type='hidden' id='BillNo"
			+ r.creditNoteId
			+ "' value='"
			+ r.creditNoteId
			+ "'></td><td class='col-md-2 center'>"
			+ r.patientName
			+ "<input type='hidden' id='patientName"
			+ r.creditNoteId
			+ "' value='"
			+ r.patientName
			+ "'></td><td class='col-md-2 center'>"
			+ r.creditNoteDocNo
			+ "<input type='hidden' id='CreditNoteDocId"
			+ r.creditNoteId
			+ "' value='"
			+ r.creditNoteDocNo
			+ "'></td><td class='col-md-2 center'>"
			+ creditDate
			+ "<input type='hidden' id='CreditDate"
			+ r.creditNoteId
			+ "' value='"
			+ creditDate
			+ "'></td>"
			+ "<td class='col-md-2 center'><button id='btnPrint"
			+ r.creditNoteId
			+ "' class='btn btn-xs btn-success'  onclick='creditNotePrint("
			+ r.creditNoteId
			+ ")' > <i class='fa fa-print'></i> </button></td>"

			/*+ "<td class='col-md-2 center'><a id='btnPrint"
			+ r.creditNoteId
			+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/creditNote/printView?creditNoteId="
			+ r.creditNoteId
			+ "'> <i class='fa fa-print'></i> </a></td>"*/

			/*
			 * + "<td class='col-md-2 center'> <a id='btnEdit" +
			 * r[i].creditNoteId + "' class='btn btn-xs btn-success'
			 * value='EDIT'
			 * href='/EhatEnterprise/pharmacy/creditNote/edit-view?creditNoteId=" +
			 * r[i].creditNoteId + "'>" + "<i class='fa fa-edit'></i> </a></td>"
			 */

			+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCreditNote("
			+ r.creditNoteId
			+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";

	$('#divCreditList').html(divContent);
}

function deleteRow() {
	/* var result= $("input[name='deleteGroup']:checked").val(); */

	/* $("#remove"+result).hide(); */
	alert("Are you confirm to delete selected row");
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
			var amount = parseFloat($("#txtAmt" + favorite[i]).val());

			$("#hiddenProductId" + favorite[i]).val("");
			$("#remove" + favorite[i]).hide();

			$("#txtAmt" + favorite[i]).val(
					parseFloat($("#txtAmt" + favorite[i]).val()) - (amount));
			$("#txtAmt" + favorite[i]).val("");
			/*
			 * $("#txtItems" + textNo).val( parseInt($("#txtItems" +
			 * textNo).val()) - 1);
			 */

		} else {
			alert("Can not delete empty row");
			$("#deleteGroup" + favorite[i]).prop("checked", false);
		}
	}
	calculateGrossAmount();
	calculateDiscount();
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
function autoSuggestionForPatientNameIndentSale(inputID, typeauto) {
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

		//inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					//url : "../../InventoryServlet",
					url : "../../pharmacy/patientSale/fetchPateintNameAutosugg",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {

						// alert(r.length);
						var availableTags = [];

						//ajaxResponse = eval('(' + r + ')');

						for ( var i = 0; i < r.listRegTreBillDto.length; i++) {

							availableTags
									.push(r.listRegTreBillDto[i].patientName
											+ "__"
											+ r.listRegTreBillDto[i].patientIdd
											+ "_"
											+ r.listRegTreBillDto[i].treatmentId
											+ "_"
											+ r.listRegTreBillDto[i].referedTo
											+ "_"
											+ r.listRegTreBillDto[i].mobile
											+ "_"
											+ r.listRegTreBillDto[i].addressLine1);
							
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
										onSelect : IndentDisplayResult,
										scrollBar : true,

									});
									$("#txtPatientName1").data('typeahead').source = resultData;
								}, 500);

					}
				});

	}

}


function IndentDisplayResult(item) {
	
	var content = item.value.split("_");
	$('#hiddenPatientId').val(content[0]);
	
	$('#hiddenIndentSalePatientAddress').val(content[4]);
	$('#hiddenIndentSalePatientNumber').val(content[3]);	
	getTreatmentDetails(content[0]);

}

function autoSuggestionForPatientNamePatientSale(inputID, typeauto) {
	
	
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
	//	inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
				//	url : "../../InventoryServlet",
					url : "../../pharmacy/patientSale/fetchPharmaPatientNameAutoSuggest",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {

						// alert(r.length);
						var availableTags = [];

						//ajaxResponse = eval('(' + r + ')');

						for ( var i = 0; i < r.length; i++) {

							availableTags
									.push(r[i].f_name
											+ " "
											+ r[i].m_name
											+ " "
											+ r[i].l_name	
											+ "__"
											+ r[i].patientId
											+ "_"
											+ r[i].treatmentId
											+ "_"
											+ r[i].mobile);
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
									$("#txtPatientNamePatientSale").data('typeahead').source = resultData;
								}, 500);

					}
				});

	}

}

function displayResult1(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId').val(content[0]);

}
/*function autoSuggestionForPatientNameCounterSale(key) 
 {
 $("#hiddenProductId").val("0");
 if (key != null) {
 var keycode = (key.which) ? key.which : key.keyCode;
 if (keycode == 9) {
 $('#txtQty').focus();
 return false;
 }
 }

 var findingName = $("#searchBox").val();
 var inputs = [];
 inputs.push('letter=' + findingName);
 var str = inputs.join('&');


 jQuery.ajax({
 async : true,
 type : "GET",
 data : str + "&reqType=AJAX",
 url : "/EhatEnterprise/pharmacy/counterSale/autoSuggestionRegisterNo",
 timeout : 1000 * 60 * 15,
 cache : false,
 error : function(error) {
 alert('error' + error);
 },
 success : function(r) {
 var availableTags = [];
 var resultData = [];

 for ( var i = 0; i < r.length; i++) {

 availableTags[i] = r[i].counterSaleId+"_"+r[i].counterSaleId;

 }

 var template = "";
 for ( var j = 0; j < availableTags.length; j++) {
 var arrValue = (availableTags[j]).split("_");
 var idValue = (arrValue[1]);
 resultData.push({
 ID : idValue,
 Name : arrValue[0]
 });

 template = template + '<li data-value="'
 + (arrValue[1]) + '" class=""><a href="#">'
 + arrValue[0] + '</a></li>';

 }
 $(".typeahead").html(template);
 $(".typeahead").show();

 setTimeout(function() {
 $('#searchBox').typeahead({
 source : resultData,
 displayField : 'Name',
 valueField : 'ID',
 onSelect : displayResult2,
 scrollBar : true,


 });
 $("#searchBox").data('typeahead').source = resultData;
 }, 500);
 }
 });

 }

 function displayResult2(item) {

 var content = item.value.split("_");
 $('#hiddenCounterSaleId').val(content[0]);

 }*/

function calculateVat() {
	var vat5 = 0;
	var vat12 = 0;
	var vat0 = 0;
	var vat55 = 0;
	var vat6 = 0;
	var vat135 = 0;

	for ( var i = 1; i <= $('#RowCount').val(); i++) {
		if ($("#hiddenProductId" + i).val() != null
				&& $('#hiddenProductId' + i).val() != "") {

			if ($('#textVat' + i).val() != ''
					&& $('#textVat' + i).val().length > 0)
				vat = parseFloat($('#textCreditSlaveVatAmt' + i).val());

			if ($('#textVat' + i).val() == 5.0 || $('#textVat' + i).val() == 5) {
				vat5 = vat5 + vat;
			} else if ($('#textVat' + i).val() == 12.5) {
				vat12 = vat12 + vat;

			} else if ($('#textVat' + i).val() == 5.5) {
				vat55 = vat55 + vat;

			} else
				vat0 = vat0 + vat;
		}
	}

	$("#hiddenTax5").val(vat5);
	$("#hiddenTax55").val(vat55);
	$("#hiddenTax12").val(vat12);
	$("#hiddenTax0").val(0);

	var totalTax = vat5 + vat12 + 0 + vat55;
	$("#hiddenTotalTax").val(totalTax);
}

function creditNotePrint(creditNoteId) {
	window.open("../../pharmacy/creditNote/printView?creditNoteId="
			+ creditNoteId + "");

}

//suraj code for getting special discount

function getSpecialDiscData(value,type) {

	var inputs = [];
	inputs.push('saleId=' + value);
	inputs.push('type=' + type);
	
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/common/getSpecialDiscountDetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					
					
					setSpecialDiscData(r,type);
				}
			});
	return true;
}

function setSpecialDiscData(result,type)
{
	/*var result1=jQuery.parseJSON(result);*/
	var discDivContent="";
	var surchargeDivContent="";
	var netAmtDivContent="";
	var prevCreditDivContent="";
	
	if(type=='indentSale')
	{
/*		discDivContent=discDivContent+"<input type='text' readonly value="+result.disc+">";
		surchargeDivContent=surchargeDivContent+"<input type='text' readonly value="+result.surcharge+">";
		netAmtDivContent=netAmtDivContent+"<input type='text' readonly value="+result.netAmt+">";
		prevCreditDivContent=prevCreditDivContent+"<input type='button' class='btn btn-xs btn-info' value='Prev Credit Note'>";*/
		discDivContent=discDivContent+"<input type='text' readonly value="+result.disc+">";
		surchargeDivContent=surchargeDivContent+""+result.surcharge+"";
		netAmtDivContent=netAmtDivContent+""+result.netAmt+"";
		prevCreditDivContent=prevCreditDivContent+"<input type='button' class='btn btn-xs btn-info' value='Prev Credit Note' onclick='getPrevCreditNoteDetailsBySaleId()'>";
	}
	else
	{
		discDivContent=discDivContent+"<input type='text' readonly value="+result.disc+">";
		surchargeDivContent=surchargeDivContent+""+result.surcharge+"";
		netAmtDivContent=netAmtDivContent+""+result.netAmt+"";
		prevCreditDivContent=prevCreditDivContent+"<input type='button' class='btn btn-xs btn-info' value='Prev Credit Note' onclick='getPrevCreditNoteDetailsBySaleId()'>";
	}	
	$("#divSpecialDisc").show();
	$("#divSurcharge").show();
	$("#divNetAmt").show();
	
	
	$("#indentSaleSpecialDiscDiv").html(discDivContent);
	$("#divSurchargeData").html(surchargeDivContent);
	$("#divNetAmtData").html(netAmtDivContent);
	$("#prevCreditDiv").html(prevCreditDivContent);
	
	
	$("#spanSaleType").html("<font color='red'>"+type+"</font>");
	
}

function getPrevCreditNoteDetailsBySaleId()
{
		var saleId=$("#txtPatientId").val();
		var type=$("#type").val();
		var inputs = [];
		inputs.push('saleId=' + saleId);
		inputs.push('saleType=' + type);
		
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/creditNote/getCreditNoteDetailsBySaleId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						$("#prevCreditNotePopUp").show();
						setPrevCreditNoteData(r);
					}
				});
		return true;
}

function setPrevCreditNoteData(result)
{
	var r=jQuery.parseJSON(result);
	var divContent = "";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf' style='margin-top:2%'><thead><tr><th>Credit Note Bill Id</th><th>Discount</th><th>Net Amt</th><th>Date</th><th>Surcharge</th></thead></tr>";
	
	if(r.length>0)
	{
		for ( var i = 0; i < r.length; i++) {

			divContent = divContent + "<tbody><tr><td>" + r[i].billId
					+ "</td>  <td> " + r[i].disc
					+ "</td>  <td>"
					+ r[i].netAmt + "</td> <td>" + r[i].date + "</td> <td>" + r[i].surcharge + "</td> </tr></tbody";

		}
	}
	else
	{
		divContent = divContent + "<tr><td colspan='5'><b>No Record Found </b></td></tr>";
	}	
	
	divContent = divContent + "</table>";

	$("#prevCreditNoteData").html(divContent);
	$("#prevCreditNoteType").html("<b>"+$("#type").val()+" Bill No-"+$("#txtPatientId").val()+"</b>");
	
}



function searchCreditNoteByPatientId(id) {
	var inputs = [];
	inputs.push('patientCreditNoteId=' + id);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/creditNote/CreditNoteDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					if (r == "") {
						alert("Record not found!");
						$('#txtPatientId').val('');
					}
					$("#patientSaleId").val('');
					setTableContent1(r);

				}
			});

	return true;
}

function setTableContent1(result) {
	var r = result;
	var divContent = "";
for ( var i = 0; i < r.length; i++) {

	var creditDate = getDate(r[i].creditNotDate);
	divContent = divContent
			+ " <tr><td class='col-md-1 center'>"
			+ (i+1)
			+ " <input type='hidden' id='creditNoteId"
			+ r[i].creditNoteId
			+ "' value='"
			+ r[i].creditNoteId
			+ "'></td><td class='col-md-2 center'>"
			+ r[i].creditNoteId
			+ "<input type='hidden' id='BillNo"
			+ r[i].creditNoteId
			+ "' value='"
			+ r[i].creditNoteId
			+ "'></td><td class='col-md-2 center'>"
			+ r[i].patientName
			+ "<input type='hidden' id='patientName"
			+ r[i].creditNoteId
			+ "' value='"
			+ r[i].patientName
			+ "'></td><td class='col-md-2 center'>"
			+ r[i].creditNoteDocNo
			+ "<input type='hidden' id='CreditNoteDocId"
			+ r[i].creditNoteId
			+ "' value='"
			+ r[i].creditNoteDocNo
			+ "'></td><td class='col-md-2 center'>"
			+ creditDate
			+ "<input type='hidden' id='CreditDate"
			+ r[i].creditNoteId
			+ "' value='"
			+ creditDate
			+ "'></td>"
			+ "<td class='col-md-2 center'><button id='btnPrint"
			+ r[i].creditNoteId
			+ "' class='btn btn-xs btn-success'  onclick='creditNotePrint("
			+ r[i].creditNoteId
			+ ")' > <i class='fa fa-print'></i> </button></td>"

			+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCreditNote("
			+ r[i].creditNoteId
			+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
       }
	$('#divCreditList').html(divContent);
}