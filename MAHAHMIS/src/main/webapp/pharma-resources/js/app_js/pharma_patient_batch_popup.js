function splitBatchContent(result) {
	
	setFocusBatchPopUp();
	/*$("#batchData").html("No Record Found");*/
	var count = 0;
	for ( var i = 0; i < result.length; i++) {
		if (result[i].clearStock > 0) {
			var count = 1;
			$('#patient_sale_Batch_Pop_Up').modal('show');
			$('#hospitalSaleBatchPopUp').modal('show');
			

			if (i == 0) {
				$("#batchData")
						.html(
								"<tr><td>"
										+ "<input type='radio' name='row' id='rowId"
										+ i
										+ "' value="
										+ i
										+ " checked='true' autofocus='autofocus'></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textLastPurchaseFrom"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillNo"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillDate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPurchaseRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchVat"
										+ i + "'" + "tabindex='-1' /></td>"

										+ "</tr>");

			} else {

				$("#batchData")
						.append(
								"<tr><td>"
										+ "<input type='radio' name='row' value="
										+ i
										+ " id='rowId"
										+ i
										+ "'></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textLastPurchaseFrom"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillNo"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillDate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPurchaseRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchVat"
										+ i + "'" + "tabindex='-1' /></td>"

										+ "</tr>");
			}

			/*$("#textBatchCode" + i).val(arr[0]);
			$("#textBatchExpiry" + i).val(arr[1]);
			$("#textBatchMRP" + i).val(arr[2]);
			$("#textSaleRate" + i).val(arr[3]);
			$("#textBatchClearStock" + i).val(arr[4]);
			
			$("#textBatchPopUpBatchId" + i).val(arr[5]);
			$("#textBatchStockId" + i).val(arr[6]);

			$("#textLastPurchaseFrom" + i).val(arr[8]);
			$("#textBillNo" + i).val(arr[9]);
			$("#textBillDate" + i).val(arr[10]);
			
			$("#textBatchPurchaseRate" + i).val(arr[11]);
			$("#textBatchVat" + i).val(arr[12]);*/

			$("#textBatchCode" + i).val(result[i].batchCode);
			$("#textBatchExpiry" + i).val(result[i].batchExpDate);
			$("#textBatchMRP" + i).val(result[i].mrp);

			$("#textBatchClearStock" + i).val(result[i].clearStock);

			$("#textBatchPopUpBatchId" + i).val(result[i].batchId);
			$("#textBatchStockId" + i).val(result[i].stockId);

			$("#textSaleRate" + i).val(result[i].saleRate);

			$("#textLastPurchaseFrom" + i).val(result[i].lastPurchaseFrom);
			$("#textBillNo" + i).val(result[i].billNo);
			$("#textBillDate" + i).val(result[i].billDate);

			$("#textBatchPurchaseRate" + i).val(result[i].purchaseRate);
			$("#textBatchVat" + i).val(result[i].vat);

		}
		if (count == 0) {
			$("#txtMRP").val('');
			$("#txtPurchaseRate").val('');
			$("#txtVat").val('');
			$("#txtBatchNo").val('');
			$("#txtExpiry").val('');
			$("#txtClStk").val('');
			$("#txtRate").val('');
			$("#hiddenBatchId").val('');
			$("#hiddenStockId").val('');
			$("#txtTotalStk").val('');
			$("#txtQty").val('');
			$("#txtAmt").val('');
			$("#txtRatePerUnit").val('');

		}
	}
}

function getProductByBatch(productId) {
	//var storeName = "store";
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId
			//validStore : storeName,
		},
		url : "../../pharmacy/purchase/getBatchDetails",

		error : function(error) {
			alert('error' + error);
		},
		success : function(result) {
			var jsObj = $.parseJSON(result);

			if (jsObj.result.length > 0) {
				splitBatchContent(jsObj.result);

			} else {
				/*	$("#batchData").html("No Record Found");*/
			}
		}
	});
}

function getProductByBatch2(productId) {
	//var storeName = "store";
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId
			//validStore : storeName,
		},
		url : "../../pharmacy/purchase/getBatchDetailsWithoutExpiry",

		error : function(error) {
			alert('error' + error);
		},
		success : function(result) {
			var jsObj = $.parseJSON(result);

			if (jsObj.result.length > 0) {
				splitBatchContent2(jsObj.result);

			} else {
				/*	$("#batchData").html("No Record Found");*/
			}
		}
	});
}

function getCreditBills(patientId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			patientId : patientId
		},
		url : "/EhatEnterprise/pharmacy/patientSale/getCreditBills",
		timeout : 1000 * 60 * 15,

		error : function(error) {
			alert('error' + error);
		},
		success : function(r) {
			$("#purchasePendingBillPopUp").show();
			$("#popUpHeading").html(
					"Pending Purchase Bill of " + $("#txtPatientName").val());
			if (r.length > 0) {

				setCreditBillContents(r);

			} else {

				$("#popUpHeading").html("No Record Found");
			}
		}
	});
}

function setCreditBillContents(content) {

	var data = content;

	var source = {
		datatype : "json",
		datafields : [ {
			name : 'billNo',
			type : 'string'
		}, {
			name : 'billDate',
			type : 'string'
		}, {
			name : 'vouNo',
			type : 'string'
		},
		/* { name: 'vouDate', type: 'string' },*/
		{
			name : 'type',
			type : 'string'
		}, {
			name : 'netAmount',
			type : 'string'
		},

		],
		localdata : data
	};
	var cellsrenderer = function(row, columnfield, value, defaulthtml,
			columnproperties, rowdata) {

		if (value == 0) {
			return '<span style="margin: 4px; float: '
					+ columnproperties.cellsalign
					+ '; color: #ff0000;">Cash Return</span>';
		} else {
			return '<span style="margin: 4px; float: '
					+ columnproperties.cellsalign
					+ '; color: #008000;">Credit Return</span>';
		}
	};

	/*var cellsrendererTotal = function (row, columnfield, value, defaulthtml, columnproperties) {
		var dataFromCellByColumnName = jQuery('#jqxgrid').jqGrid ('getCell', row, 'billNo');
		alert(dataFromCellByColumnName);
		var date = getDate(new Date());

		var a = moment(date, 'YYYY/M/D');
		var b = moment(value, 'YYYY/M/D');
		var diffDays = b.diff(a, 'days');

		$("#textPendDays" + i).val(0 - diffDays);
		
		
	if (value < 20.00) {
		return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">Cash/Credit</span>';
	}
	else {
		return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">Cash/Credit</span>';
	}
	}*/

	var dataAdapter = new $.jqx.dataAdapter(source, {
		downloadComplete : function(data, status, xhr) {
		},
		loadComplete : function(data) {
		},
		loadError : function(xhr, status, error) {
		}
	});
	$("#jqxgrid").jqxGrid({
		width : 850,
		source : dataAdapter,
		columnsresize : true,
		pageable : true,
		autoheight : true,
		sortable : true,
		altrows : true,
		enabletooltips : true,
		columns : [ {
			text : 'Bill NO',
			datafield : 'billNo',
			width : 150
		}, {
			text : 'Bill Date',
			datafield : 'billDate',
			width : 150
		}, {
			text : 'Voucher Number',
			datafield : 'vouNo',
			width : 180
		},
		/*  { text: 'Voucher Date', datafield: 'vouDate', width: 120 },*/
		{
			text : 'Type',
			datafield : 'type',
			cellsrenderer : cellsrenderer
		}, {
			text : 'Net Amount',
			datafield : 'netAmount'
		},
		/*{ text: 'Pending Days', cellsalign: 'right', cellsformat: 'c2',cellsrenderer:cellsrendererTotal},*/
		/* { text: 'Pending Days',  cellsrenderer: function(row, column, value, defaultSettings, columnSettings, rowdata )
		     {
		        
		         	
		         
		         
		         var date = getDate(new Date());

		 		var a = moment(date, 'YYYY/M/D');
		 		var b = moment(rowdata.billDate, 'YYYY/M/D');
		 		var diffDays = b.diff(a, 'days');

		 		var result=(0 - diffDays);
		         
		 		return "<div style='margin: 4px; color: blue;'>" + result + "</div>";
		     },
		         width: 50 },*/
		]
	});

	$("#excelExport").jqxButton();

	$("#csvExport").jqxButton();

	$("#pdfExport").jqxButton();
	$("#excelExport").click(function() {
		$("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');
	});

	$("#csvExport").click(function() {
		$("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid');
	});

	$("#pdfExport").click(function() {
		$("#jqxgrid").jqxGrid('exportdata', 'pdf', 'jqxGrid');
	});

}
//added by vishant
function splitBatchContent2(result2) {
	
	setFocusBatchPopUp();
	/*$("#batchData").html("No Record Found");*/
	var count = 0;
	
	var now = new Date();
	var currentMonthDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
	var resulty = (-(currentMonthDays)); 
	
	var result=[];
	for ( var i = 0; i < result2.length; i++) {
		
		var difference=parseInt(result2[i].difference); //result2[i].difference;
		if(difference>=0 || difference<=0 && difference >=resulty){
			
			result.push(result2[i]);
		}
		
	}
	
	for ( var i = 0; i < result.length; i++) {
	
		
//	if(difference>=0 || difference<=0 && difference >=resulty){
		if (result[i].clearStock > 0) {
			var count = 1;
			$('#patient_sale_Batch_Pop_Up').modal('show');
			$('#hospitalSaleBatchPopUp').modal('show');
			

			if (i == 0) {
				$("#batchData")
						.html(
								"<tr><td>"
										+ "<input type='radio' name='row' id='rowId"
										+ i
										+ "' value="
										+ i
										+ " checked='true' autofocus='autofocus'></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textLastPurchaseFrom"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillNo"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillDate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPurchaseRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchVat"
										+ i + "'" + "tabindex='-1' /></td>"

										+ "</tr>");

			} else {

				$("#batchData")
						.append(
								"<tr><td>"
										+ "<input type='radio' name='row' value="
										+ i
										+ " id='rowId"
										+ i
										+ "'></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textLastPurchaseFrom"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillNo"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillDate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPurchaseRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchVat"
										+ i + "'" + "tabindex='-1' /></td>"

										+ "</tr>");
			}

			/*$("#textBatchCode" + i).val(arr[0]);
			$("#textBatchExpiry" + i).val(arr[1]);
			$("#textBatchMRP" + i).val(arr[2]);
			$("#textSaleRate" + i).val(arr[3]);
			$("#textBatchClearStock" + i).val(arr[4]);
			
			$("#textBatchPopUpBatchId" + i).val(arr[5]);
			$("#textBatchStockId" + i).val(arr[6]);

			$("#textLastPurchaseFrom" + i).val(arr[8]);
			$("#textBillNo" + i).val(arr[9]);
			$("#textBillDate" + i).val(arr[10]);
			
			$("#textBatchPurchaseRate" + i).val(arr[11]);
			$("#textBatchVat" + i).val(arr[12]);*/

			$("#textBatchCode" + i).val(result[i].batchCode);
			$("#textBatchExpiry" + i).val(result[i].batchExpDate);
			$("#textBatchMRP" + i).val(result[i].mrp);

			$("#textBatchClearStock" + i).val(result[i].clearStock);

			$("#textBatchPopUpBatchId" + i).val(result[i].batchId);
			$("#textBatchStockId" + i).val(result[i].stockId);

			$("#textSaleRate" + i).val(result[i].saleRate);

			$("#textLastPurchaseFrom" + i).val(result[i].lastPurchaseFrom);
			$("#textBillNo" + i).val(result[i].billNo);
			$("#textBillDate" + i).val(result[i].billDate);

			$("#textBatchPurchaseRate" + i).val(result[i].purchaseRate);
			$("#textBatchVat" + i).val(result[i].vat);

		}
	//}
		if (count == 0) {
			$("#txtMRP").val('');
			$("#txtPurchaseRate").val('');
			$("#txtVat").val('');
			$("#txtBatchNo").val('');
			$("#txtExpiry").val('');
			$("#txtClStk").val('');
			$("#txtRate").val('');
			$("#hiddenBatchId").val('');
			$("#hiddenStockId").val('');
			$("#txtTotalStk").val('');
			$("#txtQty").val('');
			$("#txtAmt").val('');
			$("#txtRatePerUnit").val('');

		}
	}
}

