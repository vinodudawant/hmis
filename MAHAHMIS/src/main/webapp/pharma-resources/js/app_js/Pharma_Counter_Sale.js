var totalRowCount = 1;
var counts = [];
var i = 1;
var flag = 0;
var totalCountForDubBatch=1;

/**
 * @Code :show cheque with bank details 
 * @return
 **/
function showDetails() {
	$("#txtBankName").val('');
	$("#txtChequeNo").val('');
	$("#DivBank").show();
	$("#DivChequeNum").show();

}

/**
 * @Code :hide cheque with bank  details 
 * @return
 **/
function hideDetails() {
	$("#DivBank").hide();
	$("#DivChequeNum").hide();
	
	$("#DivBankforcard").hide();
	$("#DivNoforcard").hide();
}

/**
 * @Code :show card details 
 * @return
 **/
function showcardDetails() {
	$("#txtBankNameForcard").val('');
	$("#txtCardNo").val('');
	$("#DivBankforcard").show();
	$("#DivNoforcard").show();

}
/**
 * @Code :show cheque details 
 * @return
 **/
function hideChequeDetails(){
	$("#DivBank").hide();
	$("#DivChequeNum").hide();
	
}
/**
 * @Code :show card details 
 * @return
 **/
function hideCardDetails(){
	
	$("#DivBankforcard").hide();
	$("#DivNoforcard").hide();
}

function myFunction(value) {
	$("#rdoCash").val(value);
}
/**
 * @Code :show alternate products 
 * @return
 **/
function showAlternateProduct() {
	searchAlternateProduct($("#hiddenProductId").val(), $("#particulars").val());
	$("#alternate_product_popUp_form").modal("show");
}

/**
 * @Code :delete row on UI 
 * @return
 **/
function deleteRowOnFocus() {
	$(":focus").each(function() {
		var data = $(this).attr('class');
		var splittedData = data.split("#");
		$("#" + splittedData[1].trim()).attr("checked", true);
		deleteRow();
	});
}
/**
 * @Code : focus to current Uprow on UI 
 * @return
 **/
function setUpfocus() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');
				var splittedData = data.split("#");
				var focusElement = splittedData[1].trim();
				var id = $("input." + focusElement).parent().parent()
						.attr("id");

				$("#DRRDiv #hiddenCurrentRow").siblings("tr#" + id).prev()
						.find("td input.textNoDelete").focus();
			});
}
/**
 * @Code : focus to current Downrow on UI 
 * @return
 **/
function setDownfocus() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');

				var splittedData = data.split("#");
				var focusElement = splittedData[1].trim();

				var id = $("input." + focusElement).parent().parent()
						.attr("id");

				$("#DRRDiv tr").siblings("#" + id).next().find(
						"td input.textNoDelete").focus();
			});
}
/**
 * @Code : Shows Near Expiry Products
 * @return
 **/
function expiryBatches() {
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1; // Months are zero based
	var curr_year = d.getFullYear();
	/* alert(curr_year + "-" + curr_month + "-" + curr_date); */
	var callform='all';
	$
			.ajax({
				url : "../../pharmacy/report/getNearExpiryReport",
				method : "post",
				data : {
					from : curr_year+ "-" + +curr_month + "-" + "1",
					callform:callform,
				},

				success : function(r) {
					var divContent = "";
					for ( var i = 0; i < r.length; i++) {
						divContent = divContent
								+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa fa-medkit'></i><b>Batch Code-"
								+ r[i].batchCode
								+ "</b> &nbsp;&nbsp;&nbsp;<b> Product Name -"
								+ r[i].productName
								+ "&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> Batch Expiry -"
								+ r[i].batchExpiry;
					}
					$('#expiryBatches').html(divContent);
				},
				error : function(error) {
					alert(error);
				}
			});
}

/**
 * @Code : Save Counter Sale data
 * @return
 **/

function newSaveCounter()
{
	var lengthrows = $("#DRRDiv tr").length;
	var counter=0;
	
	for(var i=1; i<lengthrows; i++)
	{
		var productId = $("#hiddenProductId"+i).val();
		var count = getProductPrescription(productId);
		
		if(count == 0)
			counter++;
	}
	
	if(counter > 0)
	{
		assignCamera();
		$('#cameraModal').modal('show');
	} else 
		saveCounter()
}

function saveCounter() {
	var totalRow = $("#RowCount").val();
	var prescriptionId = $("#product_prescription").val();
	
	//$('#textQty' + totalRow).trigger('blur'); 
	calculateVat();
	
	var schH1Count = 0;
	var schH1ProductName = "";

	for ( var i = 1; i < totalRow; i++) {
		if ($("#textProductH1" + i).val() != null
				&& $("#textProductH1" + i).val() != "") {
			if ($("#textProductH1" + i).val() == 1) {
				schH1Count = 1;
				schH1ProductName = $("#textProductName" + i).val();
			}
		}

	}
	if (schH1Count == 1) {
		var patientName = $("#txtName").val();
		if (patientName.trim() == "") {
			alert("Please Fill Patient Name For Sch H1 Product =>"
					+ schH1ProductName);
			return false;
		}
	}

	if (totalRow.length < 1) {
		alert("Enter Only Valid data");

		return false;
	}

	$("#saveCounterButton").hide();

	var txtDate = $("#txtDate").val();

	var txtTime = $("#txtTime").val();

	var txtEnterByName = $("#txtEnterByName").val();

	var txtGrossAmt = $("#txtGrossAmt").val();

	var txtNetAmt = $("#txtNetAmt").val();

	var rdoCash = $("#rdoCash").val();

	var saveNo = $("#txtSaveNo").val();

	var txtGrossAmount = $("#txtGrossAmount").val();

	var txtNetAmount = $("#txtNetAmount").val();
	
	var txtPrescription = $("#txtPrescription").val();

	var txtName = $("#txtName").val();
	if(txtName==""||txtName==null||txtName==undefined||txtName=="undefined"){
		alert("Please enter the patient name");
		return false;
	}	
	var txtAddress = $("#txtAddress").val();
	if(txtAddress==""||txtAddress==null||txtAddress==undefined||txtAddress=="undefined"){
		alert("Please enter the patient address");
		return false;
	}

	/*if ($('#offflow').val() == "off" || $('#offflow').val() == off ) {
		
		if (txtName == "" || txtName == null || txtName == undefined) {
			alert("Please Insert Patient Name!!");
			return false;
		}
		if (txtAddress == "" || txtAddress == null || txtAddress == undefined) {
			alert("Please Insert Patient Address!!");
			return false;
		}
		
	} */
	var txtMobile = $("#txtMobile").val();

	var txtDoctor = $("#txtDoctor").val();

	var txtNaration = $("#txtNaration").val();

	var txtTax5 = $("#hiddenTax5").val();

	var txtTax55 = $("#hiddenTax55").val();

	var txtTax12 = $("#hiddenTax12").val();

	var txtTax0 = $("#hiddenTax0").val();

	var txtTotalTax = $("#hiddenTotalTax").val();

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
		if ($('#txtBankNameForcard').val() != null && $('#txtBankNameForcard').val() != "") {
			bankName = $("#txtBankNameForcard").val();
		} else {
			bankName = "";
		}  
	} else {
		txtCardNo = "";
	}
	
	var txtTax6 = 0;
	/*if ($('#hiddenTax6').val() != null && $('#hiddenTax6').val() != "") {
		txtTax6 = $('#hiddenTax6').val();
	}*/

	var txtTax135 = 0;
	if ($('#hiddenTax135').val() != null && $('#hiddenTax135').val() != "") {
		txtTax135 = $('#hiddenTax135').val();
	}

	var materiallist = {
		ltCounterSlave : []
	};

	if (chkDub() == 0) {
		return false;
	}
	for ( var i = 1; i < totalRow; i++) {
		if (saveNo == $("#textNo" + i).val()) {
			var Dis = 0;
			var DisAmt = 0;
			var batchId = $("#textBatchId" + i).val();

			var counterNo = $("#textNo" + i).val();

			var productId = $("#hiddenProductId" + i).val();

			var batchCode = $("#textBatchNo" + i).val();

			var batchExpiry = $("#textExp" + i).val();

			var mrp = $("#textMrp" + i).val();

			var rate = $("#textRate" + i).val();

			var vat = $("#textNewVat" + i).val();
			
			var qty = $("#textQty" + i).val();
			
			var issueQty = $("#textIssueQty" + i).val();
			if (issueQty == "" || issueQty == null || issueQty == undefined || isNaN(issueQty)) {
				issueQty = qty;
			}
			var rateforPrint = $("#textRate" + i).val();

			if ($("#textDiscount" + i).val() != null
					&& $("#textDiscount" + i).val() != '')
				Dis = $("#textDiscount" + i).val();

			if ($("#textDisAmtPerUnit" + i).val() != null
					&& $("#textDisAmtPerUnit" + i).val() != '')
				DisAmt = $("#textDisAmtPerUnit" + i).val();

			if (qty == "" || qty == 0) {

				alert("Please Enter Proper Quantity");
				$("#textQty" + i).focus();
				return false;
			}

			var amt = $("#textAmount" + i).val();
			
			if (prescriptionId == 0) {				
					alert("Please take Prescription Photo ");
					return false;				
			}
			
			
			//var vatAmt = amt*(vat/100);
			//Remove gst from amount 
			//GST Amount = Original Cost - ( Original Cost * ( 100 / ( 100 + GST% ) ) )
			var amts =parseFloat(amt);
			var fvat = 100 + parseFloat(vat);
			var vatAmt = amts - ( amts * ( 100 / ( fvat ) ) );
			vatAmt =vatAmt.toFixed(2);
			
			var textUnit =$("#textUnit" + i).val();
			
			materiallist.ltCounterSlave.push({
				counterSlaveNo : counterNo,
				counterSaleBatchCode : batchCode,
				counterSaleBatchExpiry : batchExpiry,
				counterSlaveMrp : mrp,
				counterSlaveRate : rate,
				counterSlaveQty : qty,
				counterSlaveAmt : amt,
				counterSlaveBatchId : batchId,
				counterSlaveVat : vat,
				counterslaveunit  : textUnit,
				counterSlaveVatAmt : vatAmt,
				counterSlaveRateForPrint : rateforPrint,
				counterSlaveDisc : Dis,
				counterSlaveDiscAmt : DisAmt,
				counterSaleSlaveIssueQty : issueQty,
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

	if (materiallist.ltCounterSlave.length < 1) {
		alert("Please Enter Valid Data");
		return false;
	}

	materiallist = JSON.stringify(materiallist);
	
	
	//alert("lengthrows*** "+lengthrows)
	// 
	
	var src = $('#capturedImage').attr('src');
	var inputs = [];

	// General Info
	inputs.push("ltCounterSlave=" + materiallist);

	inputs.push("txtDate=" + txtDate);
	inputs.push("txtEnterByName=" + txtEnterByName);
	inputs.push("txtGrossAmt=" + txtGrossAmt);
	inputs.push("txtNetAmt=" + txtNetAmt);
	inputs.push("rdoCash=" + rdoCash);
	inputs.push("saveNo=" + saveNo);
	inputs.push("txtGrossAmount=" + txtGrossAmount);
	inputs.push("txtNetAmount=" + txtNetAmount);
	inputs.push("txtPrescription=" + txtPrescription);
	inputs.push("txtName=" + txtName);
	inputs.push("txtAddress=" + txtAddress);
	inputs.push("txtMobile=" + txtMobile);
	inputs.push("txtDoctor=" + txtDoctor);
	inputs.push("txtNaration=" + txtNaration);
	inputs.push("txtTime=" + txtTime);
	inputs.push("txtTax5=" + txtTax5);
	inputs.push("txtTax55=" + txtTax55);
	inputs.push("txtTax12=" + txtTax12);
	inputs.push("txtTax0=" + txtTax0);
	inputs.push("txtTotalTax=" + txtTotalTax);
	inputs.push("txtTax6=" + txtTax6);
	inputs.push("txtTax135=" + txtTax135);
	inputs.push("bankName=" + bankName);
	inputs.push("chequeNum=" + chequeNum);
	inputs.push("saleFrom=counterSale");
	inputs.push("counterTaxCardNo=" + txtCardNo);
	//inputs.push("prescriptionImage=" + src);
	
	var str = inputs.join('&');
	
	//alert(str);
	//return false
	
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str,
				 url : "../../pharmacy/counterSale/save", 
				/*url : "../common/saleType",*/
				catche : false,
				error : function() {
					alert("oops something went wrong related to stock please save proper data or check mrp");
				},
				success : function(r) {

					if (r[0] == 'error') {
						$("#saveCounterButton").show();
						alert(r[1]);
					} else {
						//assignProfilePicture();
						alert("Record saved successfully..!");
						$("#saveCounterButton").show();
						$('#oldDiv').show();
						$('#newDiv').hide();

						$('#txtSaveNo').val('');
						$('#txtGrossAmt').val('');
						$('#txtNetAmt').val('');

						//Added By BILAL 
						$("#txtBankNameForcard").val('');
						$("#txtCardNo").val('');
						$("#DivBankforcard").hide();
						$("#DivNoforcard").hide();
						$("#rdoCash").prop("checked", true);
						
						getLastCounterAmount();
						getLastBillNum();

						if (r[1] == 'apple' && r[2] == '5') {
							window.open(
									"../../pharmacy/counterSale/printView1?counterSaleId="
											+ r[0], '_blank');
							$("#Counter_Patient_PopUp_Form").modal('hide');
						} else {
							window.open(
									"../../pharmacy/counterSale/printView?counterSaleId="
											+ r[0], '_blank');
							$("#Counter_Patient_PopUp_Form").modal('hide');

						}
						/*
						 * window
						 * .open("/EhatEnterprise/pharmacy/counterSale/printView?counterSaleId="+r,'_blank');
						 * $("#Counter_Patient_PopUp_Form").modal('hide');
						 */

						deleteRowAfterSave(saveNo);
					}

				}
			});
	
	$('#txtCreditNoteNo').val('');
	$('#txtCreditNoteAmt').val('');
	$('#txtDoctor').val('');
	$('#txtNaration').val('');
	$('#txtPrescription').val('');
	$('#txtName').val('');
	$('#txtAddress').val('');
	$('#txtMobile').val('');
	
	

}

/**
 * @Code : Last Counter Counter Sale amount
 * @return
 **/
function getLastCounterAmount() {
	$.ajax({
		url : "getLastCounterAmount",
		method : "post",
		success : function(result) {
			$("#txtLastCounterAmt").val(result);

		},
		error : function(error) {
			alert(error);
		}
	});

}
/**
 * @Code : Last Counter sale Bill Number
 * @return
 **/
function getLastBillNum() {
	$.ajax({
		url : "getLastBillNum",
		method : "post",
		success : function(r) {
			$("#txtLastBillNo").val(r);

		},
		error : function(error) {
			alert(error);
		}
	});

}
/**
 * @Code : Delete Empty Row After Save
 * @return
 **/
function deleteRowAfterSave(number) {

	var favorite = [];
	var finalAmount = 0.00;
	for ( var i = 1; i <= $("#RowCount").val(); i++) {
		if ($("#textNo" + i).val() == number) {
			favorite.push(i);
		}
	}

	for ( var i = 0; i < favorite.length; i++) {
		/* alert("delete line is "+favorite[i].val()); */
		var textNo = $("#textNo" + favorite[i]).val();
		if ($("#hiddenProductId" + favorite[i]) != null
				&& $('#hiddenProductId' + favorite[i]).val() != "") {
			$("#deleteGroup" + favorite[i]).prop("checked", false);
			var amount = parseFloat($("#textAmount" + favorite[i]).val());
			$("#textNo" + favorite[i]).val("");
			$("#hiddenProductId" + favorite[i]).val("");
			$("#remove" + favorite[i]).remove();

			var mainAmount = parseFloat($("#txtAmount" + textNo).val());

			if (mainAmount >= amount)
				finalAmount = ((mainAmount) - (amount)).toFixed(2);

			$("#txtAmount" + textNo).val(finalAmount);

			$("#textAmount" + favorite[i]).val(0);
			$("#txtItems" + textNo).val(
					parseInt($("#txtItems" + textNo).val()) - 1);
			$("#txtAmount" + textNo).val(finalAmount);
		}

	}

}

/**
 * @Code : hide Result Dive
 * @return
 **/
function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
/**
 * @Code : Reset Values
 * @return
 **/
function resetValues() {
	$('#Counter_Patient_PopUp_Form').find('input:text').val('');
	$('#txtDis').val('');
	$('#txtDiscAmt').val('');

}
/**
 * @Code : split counter sale bill no
 * @return
 **/
function splitCounterSaleBill(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenPatientId').val(arr[1]);

		}
	} else {
		$('#hiddenPatientId').val(0);
	}
}
/**
 * @Code : split register no of counter sale
 * @return
 **/
function splitCounterSaleRegisterNo(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox1').val(arr[0]);

	} else {
		$('#searchBox1').val('');
	}
}
/**
 * @Code : Search counter sale
 * @return
 **/
function searchCounterSale(id) {
	var inputs = [];
	inputs.push('CounterSaleId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/counterSale/counterSalesBillDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			if (r == "") {
				alert("Record not found!");
			}
			$("#hiddenPatientId").val('');
			setTableData(r);

		}
	});

	return true;
}
/**
 * @Code : Set search counter sale data
 * @return
 **/
function setTableData(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='counterSaleId"
				+ r[i].counterSaleId
				+ "' value='"
				+ r[i].counterSaleId
				+ "'></td><td class='col-md-1 center'>"
				+ r[i].counterSaleForTime
				+ "<input type='hidden' id='enterByName"
				+ r[i].counterSaleForTime
				+ "' value='"
				+ r[i].counterSaleForTime
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].counterSalePatientName
				+ "<input type='hidden' id='patientNameId"
				+ r[i].counterSaleId
				+ "' value='"
				+ r[i].counterSalePatientName
				+ "'></td>"
			/*	<td class='col-md-2 center'>"
				+ r[i].counterSaleEnteredBy
				+ "<input type='hidden' id='enterByName"
				+ r[i].counterSaleId
				+ "' value='"
				+ r[i].counterSaleEnteredBy
				+ "'></td>"*/
				+ "<td class='col-md-1 center'>"
				+ r[i].counterSaleAddress
				+ "<input type='hidden' id='date"
				+ r[i].counterSaleId
				+ "' value='"
				+ r[i].counterSaleAddress
				+ "'></td>"
				+ "<td class='col-md-1 center'>"
				+ r[i].counterSaleNetAmt
				+ "<input type='hidden' id='enterByName"
				+ r[i].counterSaleId
				+ "' value='"
				+ r[i].counterSaleNetAmt
				/*
				 * "'></td><td class='col-md-1 center'><a id='btnPrint" +
				 * r[i].counterSaleId + "' class='btn btn-xs btn-success'
				 * href='/EhatEnterprise/pharmacy/counterSale/printView?counterSaleId=" +
				 * r[i].counterSaleId + "'> <i class='fa fa-print'></i> </a></td>"
				 */
				+ "'></td><td class='col-md-1 center'><button id='btnPrint"
				+ r[i].counterSaleId
				+ "' class='btn btn-xs btn-success'  onclick=' counterSalePrint("
				+ r[i].counterSaleId
				+ ")'> <i class='fa fa-print'></i> </button></td>"

				+ "<td class='col-md-1 center'><button id='btnDelete2' class='btn btn-xs btn-success' onclick=' deleteCounterSale("
				+ r[i].counterSaleId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divCounterSaleList').html(divContent);
}
/**
 * @Code : delete row
 * @return
 **/
function deleteRow() {
	/* var result= $("input[name='deleteGroup']:checked").val(); */

	/* $("#remove"+result).hide(); */
	var finalAmount = 0.00;
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
			var textNo = $("#textNo" + favorite[i]).val();
			if ($("#hiddenProductId" + favorite[i]) != null
					&& $('#hiddenProductId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				var amount = parseFloat($("#textAmount" + favorite[i]).val());
				$("#textNo" + favorite[i]).val("");
				$("#hiddenProductId" + favorite[i]).val("");
				$("#textBatchId" + favorite[i]).val("");
				$("#textPurchaseRate" + favorite[i]).val("");
				$("#remove" + favorite[i]).remove();

				var mainAmount = parseFloat($("#txtAmount" + textNo).val());

				if (mainAmount >= amount)
					finalAmount = ((mainAmount) - (amount)).toFixed(2);

				$("#txtAmount" + textNo).val(finalAmount);

				$("#textAmount" + favorite[i]).val(0);
				$("#txtItems" + textNo).val(
						parseInt($("#txtItems" + textNo).val()) - 1);
				totalRowCount--;
			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
		$("#textNo" + $("#RowCount").val()).focus();
	}
	calculateTotalPurchase();
	//displayGrossAmt();
}

/**
 * @Code : delete Counter sale
 * @return
 **/
function deleteCounterSale(counterSaleBillId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		reset();

		var inputs = [];
		inputs.push('counterSaleId=' + counterSaleBillId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/counterSale/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						// getPurchaseList();
						if (r == true) {
							/*
							 * $('#msgDiv') .html( "<div class='alert
							 * alert-success' >Record deleted successfully..!</div>");
							 */
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						alertify.success("Record deleted  successfully");
						window.location.href = "view";
					}
				});

		return true;
	} else {

	}
}
/**
 * @Code : calculate total counter amount
 * @return
 **/
function calculateCounterAmount(value) {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	/* var vat=0; */
	var vatAmt = 0;

	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	if (value == 'qty')
		$("#txtRate").focus();

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0
			&& $('#hiddenProductId').val() != 0) {
		ratePerUnit = (rate / unit).toFixed(2);

		$("#txtRatePerUnit").val(ratePerUnit);
		var finalAmout = (ratePerUnit * qty).toFixed(2);

		if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
			discount = parseFloat($('#txtDis').val());
			DiscAmt = (discount / 100) * finalAmout;
		}

		if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
			DiscAmt = parseFloat($('#txtDiscAmt').val());
		}

		if (DiscAmt < finalAmout)
			$('#txtAmt').val((finalAmout - DiscAmt).toFixed(2));
		else {
			$('#txtAmt').val((ratePerUnit * qty).toFixed(2));

		}

		var amt = parseFloat($('#txtAmt').val());
		val = (Math.floor(1000 * (amt / qty)) / 1000).toFixed(2);

		$('#txtRateForPrint').val(val);

	}
}
/**
 * @Code : calculate counter discount
 * @return
 **/
function calculateCounterDisc() {
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
		calculateCounterAmount();

	} else {
		alert("Enter Discount less than 100");
		$('#txtDis').val(0);
		$('#txtDiscAmt').val(0);
		calculateCounterAmount();
	}
}

function hideSaveCounterDetailsDiv() {
	$("#oldDiv").show();
	$("#newDiv").hide();
}
/**
 * @Code : conter sale fifth counter print view
 * @return
 **/
function printPharmaCounter(counterId) {

	var inputs = [];
	inputs.push('counterId=' + counterId);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/counterSale/print-view",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;

					var counterSlaveQty = ajaxResponse.ltCounterSlave[0].counterSlaveQty;
					var counterSlaveMrp = ajaxResponse.ltCounterSlave[0].counterSlaveMrp;
					var counterSlaveRate = ajaxResponse.ltCounterSlave[0].counterSlaveRate;
					var counterSlaveAmt = ajaxResponse.ltCounterSlave[0].counterSlaveAmt;

					var counterSalePrescription = ajaxResponse.counterSalePrescription;

					setTimeout(
							function() {
								window
										.open("/EhatEnterprise/pharma_counter_bill.jsp?counterSlaveQty="
												+ counterSlaveQty
												+ "&counterSlaveMrp="
												+ counterSlaveMrp
												+ "&counterSlaveRate="
												+ counterSlaveRate
												+ "&counterSlaveAmt="
												+ counterSlaveAmt
												+ "&counterSalePrescription="
												+ counterSalePrescription
												+ "&counterId=" + counterId);
							}, 2500);

				}
			});

}
/**
 * @Code : change color
 * @return
 **/
function changeColor() {
	$("#PopDiv").css('background', 'white');
	/*if ($('#txtSaveNumber').val() == '1') {
		$("#PopDiv").css('background', 'green');
	} else if ($('#txtSaveNumber').val() == '2') {
		$("#PopDiv").css('background', 'yellow');
	} else if ($('#txtSaveNumber').val() == '3') {
		$("#PopDiv").css('background', 'pink');
	} else if ($('#txtSaveNumber').val() == '4') {
		$("#PopDiv").css('background', 'darkgray');
	} else if ($('#txtSaveNumber').val() == '5') {
		$("#PopDiv").css('background', 'lightblue');
	} else
		$("#PopDiv").css('background', 'white');*/

}
/**
 * @Code : save discount
 * @return
 **/
function saveDiscountMaster() {
	
	var totalRow = $("#RowCount").val();
	$('#txtSaveNo').val($('#textNo' + (totalRowCount - 1)).val());
	for ( var i = 1; i < totalRow; i++) {
		var qty = $("#textQty" + i).val();
		if (qty == "" || qty == 0) {
			qty=1;
		}
		if (qty == "" || qty == 0) {
			alert("Please Enter Proper Quantity in current row");
			$("#textQty" + i).focus();
			return false;
		}
	}

	calculateTotalPurchase();
	if ((($('#txtAmount1').val() != 0 || $('#txtAmount2').val() != 0
			|| $('#txtAmount3').val() != 0 || $('#txtAmount4').val() != 0 || $(
			'#txtAmount5').val() != 0))) {

		if ($('#txtSaveNo').val() != '' && $('#txtSaveNo').val().length > 0) {

			if ($('#txtSaveNo').val() > 5 || $('#txtSaveNo').val() < 1) {
				alert("please enter correct counter number");
				$('#txtSaveNo').focus();
				return false;
			} else {
				//$('#Counter_Patient_PopUp_Form').modal('show');
				//$("#oldDiv").hide();
				//$("#newDiv").show();
				//displayGrossAmt();
				resetValues();
				$('#txtSaveNumber').val($('#txtSaveNo').val());
				$('#txtGrossAmount').val($('#txtAmount1').val());
				$('#txtNetAmount').val($('#txtAmount1').val());
				$('#txtGrossAmt').val($('#txtAmount1').val());
				$('#txtNetAmt').val($('#txtAmount1').val());
				$('#txtGrossAmtNew').val($('#txtAmount1').val());
				$('#txtNetAmtNew').val($('#txtAmount1').val());
				changeColor();
				
				/*setTimeout(function() {
					$("#txtName").focus();
				}, 400);*/
			}

		} else {
			alert("please enter counter no");
			setTimeout(function() {
				$('#txtSaveNo').focus();
			},400);
			//$("#newDiv").show();
			//$("#oldDiv").hide();
		}
		//saveCounter();
	} /*else {
		alert("Enter Product Name");
		$('#textProductName1').focus();
	}*/
}
/**
 * @Code : to create counter sale div
 * @return
 **/
function toCreateCounterSaleDiv(RowCount, currentRowCount) {

	var currentRow = $('#tkr').val();
	/*
	 * var n = fillRow(currentRowCount); if (n == true) {
	 */
	/*
	 * alert("value of n"+n); alert("add new row");
	 */

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
			document.getElementById(rowId).innerHTML = "<td style='display:none;'><input type='hidden' name='ltCounterSlave["
					+ index
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "'></td>"

					+ "<td><input type='text' value='1' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNoDelete' id='textNo"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveNo'  maxlength='1' readonly></td>"

					+ "<td style='display:none;'><input type='hidden' name='ltCounterSlave["
					+ index
					+ "].counterSlaveId' id='counterSlaveId"
					+ rowCount
					+ "'></td>"
					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textRatePerUnit"
					+ rowCount
					+ "' name='' name='textRatePerUnit' maxlength='8' readonly></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textContent"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textTotalStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textPurchaseRate"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textProductH1"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].counterSaleSlaveIssueQty' readonly id='textIssueQty"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' readonly='true'></td>"

					/*
					 * + "<td style=display:none;><input type='text'
					 * class='form-control input-SmallText'
					 * name='ltCounterSlave[" + index + "].counterSlaveVat'
					 * id='textVat" + rowCount + "' readonly='true' ></td>"
					 */

					/*
					 * + "<td style=display:none;><input type='text'
					 * class='form-control input-SmallText' id='textRatePerUnit" +
					 * rowCount + "' readonly='true' ></td>"
					 */

					/*
					 * + "<td><input type='text' class='form-control
					 * input-SmallText # deleteGroup" + rowCount + " # textNo'
					 * id='textBarcode" + rowCount + "' autocomplete='off'
					 * maxlength='150' onblur=isNumber('textBarcode" + rowCount +
					 * "'),fetchProductNameByBarcode(this.value," + rowCount +
					 * ")'></td>"
					 */

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' onblur=isNumber('textBarcode"
					+ rowCount
					+ "',0,7),fetchProductNameByBarcode(this.value,"
					+ rowCount
					+ ") id='textBarcode"
					+ rowCount
					+ "'  autocomplete='off' maxlength='150' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText typeheadCounterPo"+rowCount+"' id='textProductName"
					+ rowCount
					+ "' onkeypress='return setValuesToAutocomplete(event,"+rowCount+")' name='ltCounterSlave["
					+ index
					+ "].productMaster.productName' autocomplete='off' class='form-control input-SmallText typeheadCounterPo"+rowCount+"'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textUnit"
					+ rowCount
					+ "'name='ltCounterSlave["
					+ index
					+ "].productMaster.productUnit' readonly maxlength='6' tabindex='-1' onkeypress='return validateNumbers(event)'></td>"

					+ "<td><input type='text' readonly class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textPack"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].productMaster.packingMaster.packType' tabindex='-1' ></td>"
					
					+ "<td><input type='text' readonly class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='txtPre"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].productMaster.preparationMaster.preparationName' tabindex='-1' ></td>"

					+ "<td><input type='text' readonly class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textCom"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].productMaster.companyMaster.compName' maxlength='8' tabindex='-1' ></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].counterSlaveDisc'  id='textDis"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].counterSlaveRateForPrint'  id='textRateForPrint"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text'  id='textDisAmtPerUnit"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='ltCounterSlave["
					+ index
					+ "].counterSlaveDiscAmt' ></td>"

					+ "<td style='display:none;'><input type='text'  id='textDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  ></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textBatchNo"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSaleBatchCode' maxlength='8' tabindex='-1' readonly></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textExp"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSaleBatchExpiry' maxlength='6' tabindex='-1' readonly></td>"

					+ "<td>" 
							+"<input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textNewVat"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveVat' maxlength='6' tabindex='-1' readonly>" 
					
					+"<input type='hidden' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='hiddenvatId"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveVatid' maxlength='6' tabindex='-1' readonly>" 
					
							+"</td>"

					+ "<td style='display:none;'><input type='text'  id='textcounterSlaveVatAmt"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='ltCounterSlave["
					+ index
					+ "].counterSlaveVatAmt' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textMrp"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveMrp' maxlength='8' tabindex='-1' readonly></td>"

					+ "<td style='display: none;'><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textRate"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveRate' maxlength='8' tabindex='-1' readonly></td>"

					+ "<td style='display:none;'><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textShelf"
					+ rowCount
					+ "'"
					+ "  name='ltCounterSlave["
					+ index
					+ "].productMaster.shelfMaster.shelfName' name='textShelf'"
					+ " maxlength='8' readonly></td>"
					
					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textDiscount"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveDisc' onblur='disc("
					+ rowCount
					+ ")' value=''></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textClStk"
					+ rowCount
					+ "' readonly='true' tabindex='-1' ></td>"

					+ "<td><input type 	='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textQty"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveQty' maxlength='8'  onblur=isNumber('textQty"
					+ rowCount
					+ "'),calculateAmt("
					+ rowCount
					+ ") ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textAmount"
					+ rowCount
					+ "'name='ltCounterSlave["
					+ index
					+ "].counterSlaveAmt' maxlength='8' tabindex='-1' "
					+ " readonly></td>"

					+ "<td><input type='checkbox' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='deleteGroup' value='"
					+ rowCount + "' id='deleteGroup" + rowCount + "'></td>";
			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;
			totalRowCount++;
			totalCountForDubBatch++;
			//$('#textNo' + rowCount).focus();
			if ($('#textBarcode' + rowCount).val() == '') {
				//fillRow(currentRowCount);
				calculateAmtCounterSale(currentRowCount);
			}

		}
	} else {
		if ($('#textBarcode' + rowCount).val() == '') {
			var result = DublicateRecordForEdit(currentRow);
			if (result == 1) {
			//	fillRow(currentRowCount);
				addAmount();
			}
		}
	}

}
/**
 * @Code : fill row
 * @return
 **/
function fillRow(rCount) {
	rCount=$('#tkr').val();
	var rowCount = parseInt(rCount);
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textRateForPrint' + rowCount).val($('#txtRateForPrint').val());
	/*$('#textProductName' + rowCount).val($('#particulars').val());*/
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#textCom' + rowCount).val($('#txtComp').val());
	$('#textMrp' + rowCount).val($('#txtMRP').val());
	$('#textShelf' + rowCount).val($('#txtShelf').val());
	$('#textQty' + rowCount).val($('#txtQty').val());
	$('#textBatchNo' + rowCount).val($('#txtBatchNo').val());
	$('#textExp' + rowCount).val($('#txtExpiry').val());
	$('#textRate' + rowCount).val($('#txtRate').val());
	
	$('#textBarcode' + rowCount).val($('#hiddenBatchId').val());

	$('#textIssueQty' + rowCount).val($('#txtQty').val());

	$('#txtPre' + rowCount).val($('#txtPre').val());
	$('#textDiscount' + rowCount).val(0);

	var qty = parseFloat($('#txtQty').val());

	$('#textDisAmt' + rowCount).val($('#txtDiscAmt').val());

	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		disc = parseFloat($('#txtDiscAmt').val());
		var result = (disc / qty);
		$('#textDisAmtPerUnit' + rowCount).val((result).toFixed(2));
	} else
		$('#textDisAmtPerUnit' + rowCount).val(0);

	/* $('#txtSaveNo').val($('#textNo' + rowCount).val()); */

	$("#textNo" + rowCount).prop("readonly", true);

	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());

	$('#textStockId' + rowCount).val($('#hiddenStockId').val());

	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());

	$('#textClStk' + rowCount).val($('#txtClStk').val());

	$('#textRatePerUnit' + rowCount).val($('#txtRatePerUnit').val());

	$('#textContent' + rowCount).val($('#txtContent').val());

	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());

	$('#textProductH1' + rowCount).val($('#hiddenProductH1').val());

	$('#textPurchaseRate' + rowCount).val($('#txtPurchaseRate').val());
	$('#textNewVat' + rowCount).val($('#txtVat').val());
	$('#hiddenvatId' + rowCount).val($('#txtVatid').val());

	if ($('#txtAmt').val() != '' && $('#txtAmt').val().length > 0)
		$('#textAmount' + rowCount).val($('#txtAmt').val());
	else
		$('#textAmount' + rowCount).val(0);

	if ($('#txtSaveNo').val() == 1) {
		$('#txtGrossAmt').val($('#txtAmount1').val());
		$('#txtNetAmt').val(Math.round($('#txtAmount1').val()));
	} else if ($('#txtSaveNo').val() == 2) {
		$('#txtGrossAmt').val($('#txtAmount2').val());
		$('#txtNetAmt').val(Math.round($('#txtAmount2').val()));
	} else if ($('#txtSaveNo').val() == 3) {
		$('#txtGrossAmt').val($('#txtAmount3').val());
		$('#txtNetAmt').val(Math.round($('#txtAmount3').val()));
	} else if ($('#txtSaveNo').val() == 4) {
		$('#txtGrossAmt').val($('#txtAmount4').val());
		$('#txtNetAmt').val(Math.round($('#txtAmount4').val()));
	} else if ($('#txtSaveNo').val() == 5) {
		$('#txtGrossAmt').val($('#txtAmount5').val());
		$('#txtNetAmt').val(Math.round($('#txtAmount5').val()));
	}

	if ($('#textBarcode' + rowCount).val() != ''
			&& $('#textBarcode' + rowCount).val().length > 0)
		$('#textBarcode' + rowCount).val($('#hiddenBatchId').val());
	
	
	calculateVatAmt(rCount);
	calculateTotalPurchase();
	$('#textQty' + rowCount).focus();
	
	toCreateCounterSaleDiv('RowCount', $('#hiddenCurrentRow').val());

}
/**
 * @Code : calculate total purchase
 * @return
 **/
function calculateTotalPurchase() {
	var total = 0;
	var pRate = 0;
	var qty = 0;
	var unit = 0;
	var saveNo = parseFloat($("#txtSaveNo").val());

	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if (saveNo == $("#textNo" + i).val()) {

			if ($('#textPurchaseRate' + i).val() >= 0
					&& $('#textPurchaseRate' + i).val() != ''
					&& $('#textPurchaseRate' + i).val() != null) {
				pRate = parseFloat($('#textPurchaseRate' + i).val());
				qty = parseFloat($('#textQty' + i).val());
				unit = parseFloat($('#textUnit' + i).val());
				total = total + ((pRate / unit) * qty);
			}
		}
	}
	$('#txtTotalPurchase').val(total.toFixed(2));
}

function calculateVatAmt(rCount) {
	var rowCount = parseInt(rCount);
	var Amt = parseFloat($('#txtAmt').val());
	var vat = parseFloat($('#txtVat').val());

	var vatAmt = 100 + vat;

	/* var result=parseFloat(((Amt/vatAmt)*vat).toFixed(2)); */

	var result = (Math.floor(100 * ((Amt / vatAmt) * vat)) / 100).toFixed(2);

	$("#textcounterSlaveVatAmt" + rowCount).val(result);

}
/**
 * @Code : check duplicate record
 * @return
 **/
function DublicateRecord(rowCount) {
	var num;
	var num1;
	var productName;
	var productName1;
	var j = 1;
	var batchId;
	var batchId1;

	while (j < (totalRowCount)) {

		num = $('#textNo' + j).val();
		num1 = $('#textNo' + rowCount).val();
		/*
		 * productName = $('#textProductName' + j).val(); productName1 =
		 * $('#particulars').val();
		 */

		productName = $('#hiddenProductId' + j).val();
		productName1 = $('#hiddenProductId').val();

		batchId = $('#textBatchId' + j).val();
		batchId1 = $('#hiddenBatchId').val();

		if ((num == num1) && (productName == productName1)
				&& (batchId == batchId1)) {
			alert("Dublicate Record Not insert");
			
			$('#hiddenProductId' + rowCount).val("");
			$('#textRateForPrint' + rowCount).val("");
			/*$('#textProductName' + rowCount).val($('#particulars').val());*/
			$('#textUnit' + rowCount).val("");
			$('#textPack' + rowCount).val("");
			$('#textCom' + rowCount).val("");
			$('#textMrp' + rowCount).val("");
			$('#textShelf' + rowCount).val("");
			$('#textQty' + rowCount).val("");
			$('#textBatchNo' + rowCount).val("");
			$('#textExp' + rowCount).val("");
			$('#textRate' + rowCount).val("");
			$('#textIssueQty' + rowCount).val("");
			$('#textDiscount' + rowCount).val("");
			$('#textProductName' + rowCount).val("");
			$('#textNewVat' + rowCount).val("");
			$('#textClStk' + rowCount).val("");
			$('#textNewVat' + rowCount).val("");
			
			return 0;

		}
		j++;
	}
	return 1;

}
function chkDub() {
	var num;
	var num1;
	var DubbatchId;
	var DubbatchId1;
	var productName;
	var productName1;

	var i;
	var j;

	for (i = 1; i < totalRowCount; i++) {
		for (j = 2; j < totalRowCount; j++) {
			num = $('#textNo' + i).val();
			num1 = $('#textNo' + j).val();

			DubbatchId = $('#textBatchId' + i).val();
			DubbatchId1 = $('#textBatchId' + j).val();

			productName = $('#hiddenProductId' + i).val();
			productName1 = $('#hiddenProductId' + j).val();
			/*
			 * alert("batch id "+DubbatchId); alert("batch id1 "+DubbatchId1);
			 * alert("productId "+productName);
			 * 
			 * alert("productId1 "+productName1); alert("i "+i); alert("j "+j);
			 */
			if ((num == num1) && (productName != productName1)
					&& (DubbatchId == DubbatchId1) && (i != j)) {

				/* var newProductName=$('#textProductName'+j).val(); */

				alert("Dublicate batch id not insertated of product ");
				return 0;

			}
		}
	}

	return 1;
}
function splitPurchaseRate(content) {
	if (content != "") {

		$('#txtPurchaseRate').val(content);
	}
}
/**
 * @Code : Get Batch-wise Purchase Rate
 * @return
 **/
function getBatchwisePurchaseRate(batchCode) {
	var BatchCode = batchCode;
	if (BatchCode != '') {
		var inputs = [];
		inputs.push('BatchCode=' + batchCode);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/counterSale/BatchWisePurRate",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {

				splitPurchaseRate(r);

			}
		});
		return true;
	}
}
/**
 * @Code : Display Gross amount
 * @return
 **/
function displayGrossAmt() {
	if ($('#txtSaveNo').val() == '1') {
		$('#txtGrossAmt').val($('#textAmount1').val());
		$('#txtNetAmt').val(Math.round($('#textAmount1').val()));
	} else if ($('#txtSaveNo').val() == '2') {
		$('#txtGrossAmt').val($('#textAmount2').val());
		$('#txtNetAmt').val(Math.round($('#textAmount2').val()));
	} else if ($('#txtSaveNo').val() == '3') {
		$('#txtGrossAmt').val($('#textAmount3').val());
		$('#txtNetAmt').val(Math.round($('#textAmount3').val()));
	} else if ($('#txtSaveNo').val() == '4') {
		$('#txtGrossAmt').val($('#textAmount4').val());
		$('#txtNetAmt').val(Math.round($('#textAmount4').val()));
	} else if ($('#txtSaveNo').val() == '5') {
		$('#txtGrossAmt').val($('#textAmount5').val());
		$('#txtNetAmt').val(Math.round($('#textAmount5').val()));
	}
}
/**
 * @Code : calculate counter sale amount of particular row
 * @return
 **/
function calculateAmtCounterSale(rowCount) {
	var flag = 0;
	counts.push(rowCount);
	var i = 0;
	if ($('#textNo' + rowCount).val() == 1) {
		// increment count of item1
		if ($('#txtItems1').val() != "") {
			while (i < counts.length - 1) {
				if ($('#hiddenProductId' + rowCount).val() != "") {
					if (rowCount == counts[i]) {
						flag = 1;
					}
				}
				i++;
			}
			if (flag == 0 && $('#hiddenProductId' + rowCount).val() != "") {

				var prodCount = parseInt($('#txtItems1').val());
				$('#txtItems1').val(prodCount + 1);
			}
		} else {
			$('#txtItems1').val(1);
		}
		// addition of amount in txtAmount

		/*
		 * var qty = parseInt($('#textQty' + rowCount).val()); var purRate =
		 * parseInt($('#textRate' + rowCount).val()); $('#textAmount' +
		 * rowCount).val((qty * purRate));
		 */
		var total = 0;
		for ( var i = 1; i < $('#RowCount').val(); i++) {

			if ($('#textNo' + i).val() != '' && $('#textNo' + i).val() != null
					&& $('#textNo' + i).val().length > 0
					&& $('#textNo' + i).val() == '1') {
				var slaveAmount = parseFloat($('#textAmount' + i).val());

				total = (total) + (slaveAmount);

			}

		}
		$('#txtAmount1').val(total.toFixed(2));
		/*
		 * var finalAmt = parseFloat($('#txtAmount1').val()); var slaveAmount =
		 * parseFloat($('#textAmount' + rowCount).val());
		 * 
		 * finalAmt = (finalAmt) + (slaveAmount);
		 * 
		 * $('#txtAmount1').val(finalAmt.toFixed(2));
		 */

	} else if ($('#textNo' + rowCount).val() == 2) {
		// increment count of item1
		if ($('#txtItems2').val() != "") {
			while (i < counts.length - 1) {
				if ($('#hiddenProductId' + rowCount).val() != "") {
					if (rowCount == counts[i]) {
						flag = 1;
					}
				}
				i++;
			}
			if (flag == 0 && $('#hiddenProductId' + rowCount).val() != "") {

				var prodCount = parseInt($('#txtItems2').val());
				$('#txtItems2').val(prodCount + 1);
			}
		} else {
			$('#txtItems2').val(1);
		}
		// addition of amount in txtAmount

		/*
		 * var qty = parseInt($('#textQty' + rowCount).val()); var purRate =
		 * parseInt($('#textRate' + rowCount).val()); $('#textAmount' +
		 * rowCount).val((qty * purRate));
		 */
		var total = 0;
		for ( var i = 1; i <= $('#RowCount').val(); i++) {

			if ($('#textNo' + i).val() != '' && $('#textNo' + i).val() != null
					&& $('#textNo' + i).val().length > 0
					&& $('#textNo' + i).val() == '2') {
				var slaveAmount = parseFloat($('#textAmount' + i).val());

				total = (total) + (slaveAmount);

			}

		}
		$('#txtAmount2').val(total.toFixed(2));

		/*
		 * var finalAmt1 = parseFloat($('#txtAmount2').val()); finalAmt1 =
		 * finalAmt1 + parseFloat($('#textAmount' + rowCount).val());
		 * $('#txtAmount2').val(finalAmt1);
		 */

	}

	else if (($('#textNo' + rowCount).val() == 3)) {
		// increment count of item1
		if ($('#txtItems3').val() != "") {
			while (i < counts.length - 1) {
				if ($('#hiddenProductId' + rowCount).val() != "") {
					if (rowCount == counts[i]) {
						flag = 1;
					}
				}
				i++;
			}
			if (flag == 0 && $('#hiddenProductId' + rowCount).val() != "") {

				var prodCount = parseInt($('#txtItems3').val());
				$('#txtItems3').val(prodCount + 1);
			}
		} else {
			$('#txtItems3').val(1);
		}
		// addition of amount in txtAmount

		/*
		 * var qty = parseInt($('#textQty' + rowCount).val()); var purRate =
		 * parseInt($('#textRate' + rowCount).val()); $('#textAmount' +
		 * rowCount).val((qty * purRate));
		 */
		/*
		 * var finalAmt2 = parseFloat($('#txtAmount3').val()); var slaveAmount =
		 * parseFloat($('#textAmount' + rowCount).val());
		 * 
		 * finalAmt2 = (finalAmt2) + (slaveAmount);
		 * 
		 * $('#txtAmount3').val(finalAmt2.toFixed(2));
		 */

		var total = 0;
		for ( var i = 1; i <= $('#RowCount').val(); i++) {

			if ($('#textNo' + i).val() != '' && $('#textNo' + i).val() != null
					&& $('#textNo' + i).val().length > 0
					&& $('#textNo' + i).val() == '3') {
				var slaveAmount = parseFloat($('#textAmount' + i).val());

				total = (total) + (slaveAmount);

			}

		}
		$('#txtAmount3').val(total.toFixed(2));

		/*
		 * var finalAmt2 = parseFloat($('#txtAmount3').val()); finalAmt2 =
		 * (finalAmt2) + parseFloat($('#textAmount' + rowCount).val());
		 * 
		 * $('#txtAmount3').val(finalAmt2);
		 */

	} else if ($('#textNo' + rowCount).val() == 4) {
		// increment count of item1
		if ($('#txtItems4').val() != "") {
			while (i < counts.length - 1) {
				if ($('#hiddenProductId' + rowCount).val() != "") {
					if (rowCount == counts[i]) {
						flag = 1;
					}
				}
				i++;
			}
			if (flag == 0 && $('#hiddenProductId' + rowCount).val() != "") {

				var prodCount = parseInt($('#txtItems4').val());
				$('#txtItems4').val(prodCount + 1);
			}
		} else {
			$('#txtItems4').val(1);
		}
		// addition of amount in txtAmount

		/*
		 * var qty = parseInt($('#textQty' + rowCount).val()); var purRate =
		 * parseInt($('#textRate' + rowCount).val()); $('#textAmount' +
		 * rowCount).val((qty * purRate));
		 */

		/*
		 * var finalAmt3 = parseFloat($('#txtAmount4').val()); var slaveAmount =
		 * parseFloat($('#textAmount' + rowCount).val());
		 * 
		 * finalAmt3 = (finalAmt3) + (slaveAmount);
		 * 
		 * $('#txtAmount4').val(finalAmt3.toFixed(2));
		 */

		var total = 0;
		for ( var i = 1; i <= $('#RowCount').val(); i++) {

			if ($('#textNo' + i).val() != '' && $('#textNo' + i).val() != null
					&& $('#textNo' + i).val().length > 0
					&& $('#textNo' + i).val() == '4') {
				var slaveAmount = parseFloat($('#textAmount' + i).val());
				total = (total) + (slaveAmount);
			}
		}
		$('#txtAmount4').val(total.toFixed(2));

		/*
		 * var finalAmt3 = parseFloat($('#txtAmount4').val());
		 * 
		 * finalAmt3 = (finalAmt3) + parseFloat($('#textAmount' +
		 * rowCount).val()); $('#txtAmount4').val(finalAmt3);
		 */

	} else if ($('#textNo' + rowCount).val() == 5) {
		// increment count of item1
		if ($('#txtItems5').val() != "") {
			while (i < counts.length - 1) {
				if ($('#hiddenProductId' + rowCount).val() != "") {
					if (rowCount == counts[i]) {
						flag = 1;
					}
				}
				i++;
			}
			if (flag == 0 && $('#hiddenProductId' + rowCount).val() != "") {

				var prodCount = parseInt($('#txtItems5').val());
				$('#txtItems5').val(prodCount + 1);
			}
		} else {
			$('#txtItems5').val(1);
		}
		// addition of amount in txtAmount

		/*
		 * var qty = parseInt($('#textQty' + rowCount).val()); var purRate =
		 * parseInt($('#textRate' + rowCount).val()); $('#textAmount' +
		 * rowCount).val((qty * purRate));
		 */

		/*
		 * var finalAmt4 = parseFloat($('#txtAmount5').val()); var slaveAmount =
		 * parseFloat($('#textAmount' + rowCount).val());
		 * 
		 * finalAmt4 = (finalAmt4) + (slaveAmount);
		 * 
		 * $('#txtAmount5').val(finalAmt4.toFixed(2));
		 */

		var total = 0;
		for ( var i = 1; i <= $('#RowCount').val(); i++) {

			if ($('#textNo' + i).val() != '' && $('#textNo' + i).val() != null
					&& $('#textNo' + i).val().length > 0
					&& $('#textNo' + i).val() == '5') {
				var slaveAmount = parseFloat($('#textAmount' + i).val());
				total = (total) + (slaveAmount);
			}
		}
		$('#txtAmount5').val(total.toFixed(2));

		/*
		 * var finalAmt4 = parseFloat($('#txtAmount5').val());
		 * 
		 * finalAmt4 = (finalAmt4) + parseFloat($('#textAmount' +
		 * rowCount).val()); $('#txtAmount5').val(finalAmt4);
		 */

	}
}

function changeCounterColor(number1) {

	if ($("#textNo" + number1).val() == '1') {
		$("#textNo" + number1).css('background', '#5cb85c');
		// $("#textNo" + number1).prop("readonly",true);

	} else if ($("#textNo" + number1).val() == '2') {
		$("#textNo" + number1).css('background', 'yellow');
		$("#textNo" + number1).prop("readonly", true);

	} else if ($("#textNo" + number1).val() == '3') {
		$("#textNo" + number1).css('background', 'pink');
		$("#textNo" + number1).prop("readonly", true);

	} else if ($("#textNo" + number1).val() == '4') {
		$("#textNo" + number1).css('background', 'darkgray');
		$("#textNo" + number1).prop("readonly", true);

	} /*
		 * else if ($("#textNo" + number1).val() == '5' && flag==0) { alert("No
		 * such Counter"); $("#textNo" + number1).val(""); $("#textNo" +
		 * number1).css('background', 'lightblue'); }
		 */
	else if ($("#textNo" + number1).val() == '5') {
		$("#textNo" + number1).css('background', 'lightblue');
		$("#textNo" + number1).prop("readonly", true);
	}
	/*
	 * else if($("#textNo" + number1).val() == '5') { $("#textNo" +
	 * number1).css('background', 'lightblue'); }
	 */
	else
		$("#textNo" + number1).css('background', 'white');

}


/**
 * @Code : check stock qunatity
 * @return
 **/
function checkQtyforStock() {
	if (parseFloat($('#txtQty').val()) > parseFloat($('#txtClStk').val())) {
		alert("Total Qty should be not more than current Batch Stock");
		$("#txtQty").focus();
	}
}
/**
 * @Code : check counter number
 * @return
 **/
function checkCounterNumber(value) {
	$("#saveCounterButton").show();
	var number = parseInt(value);
	if (number > 5 || number < 1) {
		alert("please enter correct counter number");
		return false;
	}
}
/**
 * @Code : check password
 * @return
 **/ 
function chkPassword(No) {
	$("#textNo" + No).prop("readonly", true);
	if ($("#textNo" + No).val() == '9') {
		bootbox.prompt({
			title : "Enter your password",
			inputType : "password",
			callback : function(result) {
				showResult(result);
				$("#textNo" + No).val('');
			}
		});
		$("#textNo" + No).focus();
		$("#Counter_PopUp_Form").hide();
	}
}

function showResult(r) {
	if (r == '5') {
		alert("password is correct");
		$("#fifthCounter").show();
		flag = 1;
	} else {
		alert("password is incorrect");
	}

}
/**
 * @Code : calculate vat
 * @return
 **/ 
function calculateVat() {

	var vat5Amt = 0;
	var vat12Amt = 0;
	var vat0Amt = 0;
	var vat5 = 0;
	var vat55 = 0;
	var vat12 = 0;
	var vat0 = 0;
	var vat6 = 0;
	var vat135 = 0;
	var saveNo = $('#txtSaveNo').val();
	/* alert(saveNo); */
	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($("#hiddenProductId" + i).val() != null
				&& $('#hiddenProductId' + i).val() != "") {
			/* alert($("#textNo" + i).val()); */
			if (saveNo == $("#textNo" + i).val()) {
				if ($('#textNewVat' + i).val() != ''
						&& $('#textNewVat' + i).val().length > 0)
					vat = parseFloat($('#textNewVat' + i).val())*parseFloat($('#textAmount' + i).val())*0.01;

				if ($('#textNewVat' + i).val() == 5.0
						|| $('#textNewVat' + i).val() == 5) {
					vat5 = vat5 + vat;
				} else if ($('#textNewVat' + i).val() == 12.5) {
					vat12 = vat12 + vat;
				} else if ($('#textNewVat' + i).val() == 5.5) {
					vat55 = vat55 + vat;
				} else if ($('#textNewVat' + i).val() == 0) {
					vat0 = vat0 + vat;
				} else if ($('#textNewVat' + i).val() == 6) {
					vat6 = vat6 + vat;
				} else if ($('#textNewVat' + i).val() == 13.5) {
					vat135 = vat135 + vat;
				}

			}
		}

	}

	/*
	 * vat5Amt=(vat5/105)*5; vat12Amt=(vat12/112.5)*12.5; vat0Amt=vat0;
	 */

	$("#hiddenTax6").val(vat6);
	$("#hiddenTax135").val(vat135);
	$("#hiddenTax5").val(vat5);
	$("#hiddenTax55").val(vat55);
	$("#hiddenTax12").val(vat12);
	$("#hiddenTax0").val(0);

	var totalTax = vat5 + vat12 + 0 + vat55 + vat6 + vat135;
	$("#hiddenTotalTax").val((totalTax).toFixed(2));

}

/**
 * @Code : check dulplicate record for edit
 * @return
 **/ 
function DublicateRecordForEdit(rowCount) {

	var productName;
	var productName1;
	var textNo;
	var textNo1;
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

			textNo = $('#textNo' + j).val();
			textNo1 = $('#textNo' + rowCount).val();

			if ((textNo == textNo1) && (productName == productName1)
					&& (batchId == batchId1)) {
				alert("Dublicate Record Not insert");
				return 0;

			}
			j++;
		}
	}
	return 1;
}
/**
 * @Code : Counter Sale print
 * @return
 **/
function counterSalePrint(counterSaleId) {
	window.open("../../pharmacy/counterSale/printView?counterSaleId="
			+ counterSaleId + "");

}
/**
 * @Code : fetch product name by record
 * @return
 **/
function fetchProductNameByBarcode(batchId, rowCount) {
	if ($('#textBarcode' + rowCount).val() != '') {
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
						global : false,
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

			$('#textProductName' + rowCount).val('');
			$('#textUnit' + rowCount).val('');
			$('#textPack' + rowCount).val('');
			$('#textCom' + rowCount).val('');
			$('#textBatchNo' + rowCount).val('');
			$('#textExp' + rowCount).val('');
			$('#textNewVat' + rowCount).val('');
			$('#textMrp' + rowCount).val('');
			$('#textRate' + rowCount).val('');
			$('#textPurchaseRate' + rowCount).val('');
			$('#hiddenProductId' + rowCount).val('');
			$('#textBatchId' + rowCount).val('');
			$('#textClStk' + rowCount).val('');
			$('#textTotalStk' + rowCount).val('');
			$('#textStockId' + rowCount).val('');
			$('#textStockQtyInHand' + rowCount).val('');
			$('#textRatePerUnit' + rowCount).val('');
			$('#textQty' + rowCount).val('');
			$('#textAmount' + rowCount).val('');
			$('#textShelf' + rowCount).val('');
			setTimeout(function() {
				$('#textBarcode' + rowCount).focus();
				$('#textBarcode' + rowCount).val('');
			}, 00);

		}
	}
}
/**
 * @Code : set data for barcode
 * @return
 **/
function setTableDataByBarcode(r, rowCount) {

	var currentRow = rowCount;
	if (r != "" && r != null) {
		if ($('#textBarcode' + currentRow).val() != '') {
			if (r[0].clearStock != 0.0) {
				var unit=parseInt(r[0].unit);
				//alert("Unit>>"+unit);
				var mrp = r[0].mrp;
			//	alert("mrp>>>"+mrp);
				
				$('#textProductName' + currentRow).val(r[0].productName);
				$('#textUnit' + currentRow).val(unit);
				$('#textPack' + currentRow).val(r[0].pack);
				$('#textCom' + currentRow).val(r[0].comp);
				$('#textBatchNo' + currentRow).val(r[0].batchCode);
				$('#textExp' + currentRow).val(r[0].batchExpDate);
				$('#textNewVat' + currentRow).val(r[0].vat);
				$('#textMrp' + currentRow).val(r[0].mrp);
				$('#textRate' + currentRow).val(r[0].rate);
				$('#textPurchaseRate' + currentRow).val(r[0].purchaseRate);
				$('#hiddenProductId' + currentRow).val(r[0].productId);
				$('#textBatchId' + currentRow).val(r[0].batchId);
				$('#txtPre' + currentRow).val(r[0].pre);

				$('#textQty' + currentRow).val(1);
				$('#textAmount' + currentRow).val(r[0].mrp/r[0].unit);

				/* $("#textProductName"+currentRow).prop("readonly",true); */
				var rate = parseFloat($('#textRate' + currentRow).val());
				var unit = parseFloat($('#textUnit' + currentRow).val());

				$('#textClStk' + currentRow).val(r[0].clearStock);
				$('#textTotalStk' + currentRow).val(r[0].clearStock);

				$('#textStockId' + currentRow).val(r[0].stockId);
				$('#textStockQtyInHand' + currentRow).val(r[0].clearStock);

				$('#textShelf' + currentRow).val(r[0].shelfName);
				$('#textContent' + currentRow).val(r[0].drugName);

				var ratePerUnit = parseFloat(rate / unit).toFixed(2);
				$('#textRatePerUnit' + currentRow).val(ratePerUnit);
				
				setTimeout(function() {
					$("#textQty"+currentRow).focus();
				}, 400);

				if ($('#hiddenProductId' + currentRow).val() != ''
						&& $('#hiddenProductId' + currentRow).val() != null)
					addNewRow('RowCount', currentRow);
				addAmount();
			} else {
				alert("Product not found");
				$('#textBarcode' + currentRow).val('');
				$('#textBarcode' + currentRow).focus();
			}
		}
	
		saveDiscountMaster();
	} else {
		alert("Record not found");
		$('#textBarcode' + currentRow).val('');
		$('#textBarcode' + currentRow).focus();
	}
}
/**
 * @Code : calculate total amount
 * @return
 **/
function calculateAmt(rowCount) {
	var qty = 0;
	var currentStock = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	/* var vat=0; */
	var vatAmt = 0;

	if ($('#textQty' + rowCount).val() != ''
			&& $('#textQty' + rowCount).val().length > 0)
		qty = parseFloat($('#textQty' + rowCount).val());

	if ($('#textClStk' + rowCount).val() != ''
			&& $('#textClStk' + rowCount).val().length > 0)
		currentStock = parseFloat($('#textClStk' + rowCount).val());

	if (qty <= currentStock) {
		$('#textIssueQty' + rowCount).val($('#textQty' + rowCount).val());

		var ratePerUnit = parseFloat($('#textMrp' + rowCount).val())/parseFloat($('#textUnit' + rowCount).val());
		var finalAmout = parseFloat((ratePerUnit * qty).toFixed(2));

		$('#textAmount' + rowCount).val(parseFloat(finalAmout-(finalAmout * $('#textDiscount' + rowCount).val()/100)).toFixed(2));

		if ($('#textDiscount' + rowCount).val() != ''
				&& $('#textDiscount' + rowCount).val().length > 0) {
			discount = parseFloat($('#textDiscount' + rowCount).val());
			DiscAmt = (((discount / 100) * finalAmout).toFixed(2));
			$('#textDisAmt' + rowCount).val(DiscAmt);
		}

		if ($('#textDisAmt' + rowCount).val() != ''
				&& $('#textDisAmt' + rowCount).val().length > 0) {
			DiscAmt = parseFloat($('#textDisAmt' + rowCount).val());
		}

		/* $('#txtDiscAmt').val($('#textDisAmtPerUnit' + rowCount).val()); */

		/* alert($('#textDisAmt' + rowCount).val()); */

		if (DiscAmt < finalAmout) {
			$('#textAmount' + rowCount).val((finalAmout - DiscAmt).toFixed(2));

		} else
			$('#textAmount' + rowCount).val((ratePerUnit * qty).toFixed(2));

		var amt = parseFloat($('#textAmount' + rowCount).val());
		val = (Math.floor(1000 * (amt / qty)) / 1000).toFixed(2);

		$('#textRateForPrint' + rowCount).val(val);
		/* $('#txtSaveNo').val($('#textNo' + rowCount).val()); */
		calculateVatAmount(rowCount);
		calculateTotalPurchase();
		//displayGrossAmt();
		addAmount();
	} else {
		alert("Qty should be than current stock");
		$('#textAmount' + rowCount).val('');
		$('#textQty' + rowCount).val('');
		setTimeout(function() {
			$('#textQty' + rowCount).focus();
		},100);
		
		calculateVatAmount(rowCount);
		calculateTotalPurchase();
		//displayGrossAmt();
	}
	
	saveDiscountMaster();
}
/**
 * @Code : Add amount to row
 * @return
 **/
function addAmount() {
	var item1 = 0;
	var item2 = 0;
	var item3 = 0;
	var item4 = 0;
	var item5 = 0;
	var totalAmountForText1 = 0;
	var totalAmountForText2 = 0;
	var totalAmountForText3 = 0;
	var totalAmountForText4 = 0;
	var totalAmountForText5 = 0;

	for ( var i = 1; i < $("#RowCount").val(); i++) {

		if ($("#textNo" + i).val() == '1') {
			item1++;

			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());

			}

			/*
			 * if ($('#txtAmount1').val() != ' ' &&
			 * $('#txtAmount1').val().length > 0) { totalAmount =
			 * parseFloat($('#txtAmount1').val()); }
			 */

			totalAmountForText1 = (totalAmountForText1) + (amount);

			$("#txtAmount1").val(totalAmountForText1.toFixed(2));

			$("#txtItems1").val(item1);

			$("#textNo" + i).css('background', 'green');

		} else if ($("#textNo" + i).val() == '2') {
			item2++;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			/*
			 * if ($('#txtAmount2').val() != ' ' &&
			 * $('#txtAmount2').val().length > 0) { totalAmount =
			 * parseFloat($('#txtAmount2').val()); }
			 */

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * 
			 * $("#txtAmount1").val(totalAmount.toFixed(2));
			 */

			totalAmountForText2 = (totalAmountForText2) + (amount);
			$("#txtAmount2").val(totalAmountForText2.toFixed(2));

			$("#txtItems2").val(item2);

			$("#textNo" + i).css('background', 'yellow');

		} else if ($("#textNo" + i).val() == '3') {
			item3++;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			/*
			 * if ($('#txtAmount3').val() != ' ' &&
			 * $('#txtAmount3').val().length > 0) { totalAmount =
			 * parseFloat($('#txtAmount3').val()); }
			 */

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * $("#txtAmount2").val(totalAmount.toFixed(2));
			 */

			totalAmountForText3 = (totalAmountForText3) + (amount);
			$("#txtAmount3").val(totalAmountForText3.toFixed(2));

			$("#txtItems3").val(item3);

			$("#textNo" + i).css('background', 'pink');

		} else if ($("#textNo" + i).val() == '4') {
			item4++;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			/*
			 * if ($('#txtAmount4').val() != ' ' &&
			 * $('#txtAmount4').val().length > 0) { totalAmount =
			 * parseFloat($('#txtAmount4').val()); }
			 */

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * $("#txtAmount2").val(totalAmount.toFixed(2));
			 */

			totalAmountForText4 = (totalAmountForText4) + (amount);
			$("#txtAmount4").val(totalAmountForText4.toFixed(2));

			$("#txtItems4").val(item4);

			$("#textNo" + i).css('background', 'darkgray');

		} else if ($("#textNo" + i).val() == '5') {
			item5++;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			/*
			 * if ($('#txtAmount5').val() != ' ' &&
			 * $('#txtAmount5').val().length > 0) { totalAmount =
			 * parseFloat($('#txtAmount5').val()); }
			 */

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * $("#txtAmount4").val(totalAmount.toFixed(2));
			 */

			totalAmountForText5 = (totalAmountForText5) + (amount);
			$("#txtAmount5").val(totalAmountForText5.toFixed(2));
			$("#txtItems5").val(item5);

			$("#textNo" + i).css('background', 'lightblue');
		} else
			$("#textNo" + i).css('background', 'white');
	}
}
/**
 * @Code : Set Counter Sale Data
 * @return
 **/
function setData() {
	var item1 = 0;
	var item2 = 0;
	var item3 = 0;
	var item4 = 0;
	var item5 = 0;

	for ( var i = 1; i < $("#RowCount").val(); i++) {

		if ($("#textNo" + i).val() == '1') {
			item1++;
			var totalAmount = 0;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());

			}

			if ($('#txtAmount1').val() != ' '
					&& $('#txtAmount1').val().length > 0) {
				totalAmount = parseFloat($('#txtAmount1').val());

			}

			totalAmount = (totalAmount) + (amount);

			$("#txtAmount1").val(totalAmount.toFixed(2));

			$("#txtItems1").val(item1);

			$("#textNo" + i).css('background', 'green');

		} else if ($("#textNo" + i).val() == '2') {
			item2++;
			var totalAmount = 0;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			if ($('#txtAmount2').val() != ' '
					&& $('#txtAmount2').val().length > 0) {
				totalAmount = parseFloat($('#txtAmount2').val());
			}

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * 
			 * $("#txtAmount1").val(totalAmount.toFixed(2));
			 */

			totalAmount = (totalAmount) + (amount);
			$("#txtAmount2").val(totalAmount.toFixed(2));

			$("#txtItems2").val(item2);

			$("#textNo" + i).css('background', 'yellow');

		} else if ($("#textNo" + i).val() == '3') {
			item3++;
			var totalAmount = 0;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			if ($('#txtAmount3').val() != ' '
					&& $('#txtAmount3').val().length > 0) {
				totalAmount = parseFloat($('#txtAmount3').val());
			}

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * $("#txtAmount2").val(totalAmount.toFixed(2));
			 */

			totalAmount = (totalAmount) + (amount);
			$("#txtAmount3").val(totalAmount.toFixed(2));

			$("#txtItems3").val(item3);

			$("#textNo" + i).css('background', 'pink');

		} else if ($("#textNo" + i).val() == '4') {
			item4++;
			var totalAmount = 0;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			if ($('#txtAmount4').val() != ' '
					&& $('#txtAmount4').val().length > 0) {
				totalAmount = parseFloat($('#txtAmount4').val());
			}

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * $("#txtAmount2").val(totalAmount.toFixed(2));
			 */

			totalAmount = (totalAmount) + (amount);
			$("#txtAmount4").val(totalAmount.toFixed(2));

			$("#txtItems4").val(item4);

			$("#textNo" + i).css('background', 'darkgray');

		} else if ($("#textNo" + i).val() == '5') {
			item5++;
			var totalAmount = 0;
			var amount = 0;
			if ($('#textAmount' + i).val() != ' '
					&& $('#textAmount' + i).val().length > 0) {
				amount = parseFloat($('#textAmount' + i).val());
			}

			if ($('#txtAmount5').val() != ' '
					&& $('#txtAmount5').val().length > 0) {
				totalAmount = parseFloat($('#txtAmount5').val());
			}

			/*
			 * totalAmount = (totalAmount) + (amount);
			 * $("#txtAmount4").val(totalAmount.toFixed(2));
			 */

			totalAmount = (totalAmount) + (amount);
			$("#txtAmount5").val(totalAmount.toFixed(2));
			$("#txtItems5").val(item5);

			$("#textNo" + i).css('background', 'lightblue');
		} else
			$("#textNo" + i).css('background', 'white');
	}
}
/**
 * @Code : calculate vat amount
 * @return
 **/
function calculateVatAmount(rowCount) {

	var Amt = parseFloat($('#textAmount' + rowCount).val());
	var vat = parseFloat($('#textNewVat' + rowCount).val());
	var vatAmt = 100 + vat;

	/* var result=parseFloat(((Amt/vatAmt)*vat).toFixed(2)); */

	var result = (Math.floor(100 * ((Amt / vatAmt) * vat)) / 100).toFixed(2);

	$("#textcounterSlaveVatAmt" + rowCount).val(result);

}
/**
 * @Code : Check duplicate record for Batch
 * @return
 **/
function chkDublicateRecortForBatch(rowCount, barcode) {
	var num;
	var num1;
	var j = 1;
	var batchId;
	var count = 0;

	while (j < (totalCountForDubBatch)) {
			
		if ($('#textNo' + j).val() != "undefined") 
		{
			num = $('#textNo' + j).val();
		}
		else
			num = 0;

		if ($('#textNo' + rowCount).val() != "undefined") 
		{
		num1 = $('#textNo' + rowCount).val();
		}else
			num1 = 0;
		
		if ($('#textBatchId' + j).val() != 'undefined')
			batchId = $('#textBatchId' + j).val();
		else
			batchId = 0;
		
		
		if (((num == num1) && (batchId == barcode) && j != rowCount))
		{
			alert("Dublicate Record Not insert");
			return 0;
		}
		j++;
	}
	return 1;

}
/**
 * @Code : add new row UI
 * @return
 **/
function addNewRow(RowCount, currentRowCount) {

	var currentRow = currentRowCount;
	/*
	 * var n = fillRow(currentRowCount); if (n == true) {
	 */
	/*
	 * alert("value of n"+n); alert("add new row");
	 */

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

		rowCount++;

		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);
		var index = parseInt(rowCount) - 1;
		document.getElementById(rowId).innerHTML = "<td style='display:none;'><input type='hidden' name='ltCounterSlave["
					+ index
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "'></td>"

					+ "<td><input type='text' value='1' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNoDelete' id='textNo"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveNo'  maxlength='1' readonly></td>"

					+ "<td style='display:none;'><input type='hidden' name='ltCounterSlave["
					+ index
					+ "].counterSlaveId' id='counterSlaveId"
					+ rowCount
					+ "'></td>"
					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textRatePerUnit"
					+ rowCount
					+ "' name='' name='textRatePerUnit' maxlength='8' readonly></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textContent"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textTotalStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textPurchaseRate"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textProductH1"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].counterSaleSlaveIssueQty' readonly id='textIssueQty"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' readonly='true'></td>"

					/*
					 * + "<td style=display:none;><input type='text'
					 * class='form-control input-SmallText'
					 * name='ltCounterSlave[" + index + "].counterSlaveVat'
					 * id='textVat" + rowCount + "' readonly='true' ></td>"
					 */

					/*
					 * + "<td style=display:none;><input type='text'
					 * class='form-control input-SmallText' id='textRatePerUnit" +
					 * rowCount + "' readonly='true' ></td>"
					 */

					/*
					 * + "<td><input type='text' class='form-control
					 * input-SmallText # deleteGroup" + rowCount + " # textNo'
					 * id='textBarcode" + rowCount + "' autocomplete='off'
					 * maxlength='150' onblur=isNumber('textBarcode" + rowCount +
					 * "'),fetchProductNameByBarcode(this.value," + rowCount +
					 * ")'></td>"
					 */

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' onblur=isNumber('textBarcode"
					+ rowCount
					+ "',0,7),fetchProductNameByBarcode(this.value,"
					+ rowCount
					+ ") id='textBarcode"
					+ rowCount
					+ "'  autocomplete='off' maxlength='150' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText typeheadCounterPo"+rowCount+"' id='textProductName"
					+ rowCount
					+ "' onkeypress='return setValuesToAutocomplete(event,"+rowCount+")' name='ltCounterSlave["
					+ index
					+ "].productMaster.productName' autocomplete='off' class='form-control input-SmallText typeheadCounterPo"+rowCount+"'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textUnit"
					+ rowCount
					+ "'name='ltCounterSlave["
					+ index
					+ "].productMaster.productUnit' readonly maxlength='6' onkeypress='return validateNumbers(event)'></td>"

					+ "<td><input type='text' readonly class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textPack"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].productMaster.packingMaster.packType' ></td>"
					
					+ "<td><input type='text' readonly class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='txtPre"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].productMaster.preparationMaster.preparationName' ></td>"

					+ "<td><input type='text' readonly class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textCom"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].productMaster.companyMaster.compName' maxlength='8' ></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].counterSlaveDisc'  id='textDis"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].counterSlaveRateForPrint'  id='textRateForPrint"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td style='display:none;'><input type='text'  id='textDisAmtPerUnit"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='ltCounterSlave["
					+ index
					+ "].counterSlaveDiscAmt' ></td>"

					+ "<td style='display:none;'><input type='text'  id='textDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  ></td>"

					+ "<td style='display:none;'><input type='text' name='ltCounterSlave["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textBatchNo"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSaleBatchCode' maxlength='8' readonly></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textExp"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSaleBatchExpiry' maxlength='6' readonly></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textNewVat"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveVat' maxlength='6' readonly></td>"

					+ "<td style='display:none;'><input type='text'  id='textcounterSlaveVatAmt"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='ltCounterSlave["
					+ index
					+ "].counterSlaveVatAmt' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textMrp"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveMrp' maxlength='8' readonly></td>"

					+ "<td style='display: none;'><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textRate"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveRate' maxlength='8' readonly></td>"

					+ "<td style='display:none;'><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textShelf"
					+ rowCount
					+ "'"
					+ "  name='ltCounterSlave["
					+ index
					+ "].productMaster.shelfMaster.shelfName' name='textShelf'"
					+ " maxlength='8' readonly></td>"
					
					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textDiscount"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveDisc' onblur='disc("
					+ rowCount
					+ ")' value=''></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textClStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type 	='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textQty"
					+ rowCount
					+ "' name='ltCounterSlave["
					+ index
					+ "].counterSlaveQty' maxlength='8'  onblur=isNumber('textQty"
					+ rowCount
					+ "'),calculateAmt("
					+ rowCount
					+ ") ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='textAmount"
					+ rowCount
					+ "'name='ltCounterSlave["
					+ index
					+ "].counterSlaveAmt' maxlength='8'"
					+ " readonly></td>"

					+ "<td><input type='checkbox' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='deleteGroup' value='"
					+ rowCount + "' id='deleteGroup" + rowCount + "'></td>";
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		totalRowCount++;
		totalCountForDubBatch++;
		$('#textNo' + rowCount).focus();

	} else {
		$('#textBarcode' + rowCount).val('');
		$('#textProductName' + rowCount).val('');
		$('#textUnit' + rowCount).val('');
		$('#textPack' + rowCount).val('');
		$('#textCom' + rowCount).val('');
		$('#textBatchNo' + rowCount).val('');
		$('#textExp' + rowCount).val('');
		$('#textNewVat' + rowCount).val('');
		$('#textMrp' + rowCount).val('');
		$('#textRate' + rowCount).val('');
		$('#textPurchaseRate' + rowCount).val('');
		$('#hiddenProductId' + rowCount).val('');
		$('#textBatchId' + rowCount).val('');
		$('#textClStk' + rowCount).val('');
		$('#textTotalStk' + rowCount).val('');
		$('#textStockId' + rowCount).val('');
		$('#textStockQtyInHand' + rowCount).val('');
		$('#textRatePerUnit' + rowCount).val('');
	}
}

function disc(rowCount){
	var mrp=parseFloat($('#textMrp' + rowCount).val());
	var unit=parseFloat($('#textUnit' + rowCount).val());
	var qty=parseFloat($('#textQty' + rowCount).val());
	var disc=parseFloat($('#textDiscount' + rowCount).val());
	mrp=(mrp/unit)*qty;
	$('#textAmount' + rowCount).val((mrp-(mrp*disc/100)).toFixed(2));
	
	var total = 0;
	for ( var i = 1; i < $('#RowCount').val(); i++) {

		if ($('#textNo' + i).val() != '' && $('#textNo' + i).val() != null
				&& $('#textNo' + i).val().length > 0
				&& $('#textNo' + i).val() == '1') {
			var slaveAmount = parseFloat($('#textAmount' + i).val());

			total = (total) + (slaveAmount);

		}

	}
	
	$('#txtAmount1').val(total.toFixed(2));
	calculateTotalPurchase();
}

function getProductPrescription(productId)
{
	var res = 0;
	$.ajax({
		async : false,
		type : "GET",
		data : {"productId" : productId},
		url : "../../pharmacy/purchase/getProductPrescriptionId",
		error : function() {
			alert("error");
		},
		success : function(r) {
			res = r;
		}
	});
	
	return res;
}

function hideCameraPopUp()
{
	$('#cameraModal').hide();
}

 function assignCamera(){
        	$("#cameraClick").removeAttr("onclick");
        	Webcam.set({
                width: 320,
                height: 240,
                image_format: 'jpeg',
                jpeg_quality: 90,
                upload_name:$('#hiddenPatientId').val()+"_webcam"
            });
            Webcam.attach( '#my_camera' );
        }

        function take_snapshot() {
        	       // take snapshot and get image data
            Webcam.snap( function(data_uri) {
                // display results in page
                document.getElementById('results').innerHTML = 
                    '<img id="capturedImage" src="'+data_uri+'"/>';
            } );
        	       
        }

