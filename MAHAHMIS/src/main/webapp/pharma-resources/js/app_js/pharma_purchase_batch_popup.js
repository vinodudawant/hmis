function splitLastPurchaseContent(content) {
	setFocusBatchPopUp();

	/*for ( var i = 0; i < content.length; i++) {
		if (i == 0) {
			$("#lastPurchaseData")
					.html(
							"<tr><td>"
									+ "<input type='radio' name='lastPurchase' id='lastPurchaseRowId"
									+ i
									+ "'"
									+ " checked='true' autofocus='autofocus'></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVouNo"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textType"
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

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPartyName"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textQty"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textSchm"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textSchmDisc"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textDisc"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchNo"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textMRP"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPurRate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textTrate"
									+ i + "'" + "tabindex='-1' /></td>"

									+ "</tr>");

		} else {
			$("#lastPurchaseData")
					.append(
							"<tr><td>"
									+ "<input type='radio' name='lastPurchase' id='lastPurchaseRowId"
									+ i
									+ "' value="
									+ i
									+ "></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVouNo"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textType"
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

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPartyName"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textQty"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textSchm"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textSchmDisc"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textDisc"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchNo"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textMRP"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPurRate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textTrate"
									+ i + "'" + "tabindex='-1' /></td>"

									+ "</tr>");

		}
		$("#textVouNo" + i).val(content[i].purDocId);

		if (content[i].purTransType == '0') {
			$("#textType" + i).val('Cash/Credit');
		} else {
			$("#textType" + i).val('Cash');
		}

		$("#textBillNo" + i).val(content[i].purBillNo);
		$("#textBillDate" + i).val(content[i].purBillDate);

		$("#textPartyName" + i).val(content[i].vendorMaster.vendorName);

		$("#textQty" + i).val(content[i].ltPurSlave[0].purSlaveQty);
		$("#textSchm" + i).val();

		$("textSchmDisc" + i).val();

		$("#textDisc" + i).val();
		$("#textBatchNo" + i).val(content[i].ltPurSlave[0].batchCode);
		$("#textMRP" + i).val(content[i].ltPurSlave[0].purSlaveMrp);

		$("#textPurRate" + i)
				.val(content[i].ltPurSlave[0].purSlavePurchaseRate);
		$("#textTrate" + i).val(content[i].ltPurSlave[0].purSlaveBillRate);
	}*/
	
	var data = content;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
                     
            { name: 'purDocId', type: 'string'},
            { name: 'type', type: 'string'},
            { name: 'purBillNo', type: 'string' },
            { name: 'purBillDate', type: 'string'  },
            { name: 'vendorName',map:'vendorMaster>vendorName', type: 'string'  },
            
            { name: 'purSlaveQty',map:'ltPurSlave>0>purSlaveQty',type: 'string' },
            { name: 'Schm', type: 'string'  },
            { name: 'SchmDisc',type: 'string' },
            { name: 'Disc%', type: 'string' },
            { name: 'batchCode', map:'ltPurSlave>0>batchCode',type: 'string'  },
            
            { name: 'purSlaveMrp',map:'ltPurSlave>0>purSlaveMrp', type: 'string'  },
            
            { name: 'purSlavePurchaseRate',map:'ltPurSlave>0>purSlavePurchaseRate',type: 'string' },
            
            { name: 'purSlaveBillRate',map:'ltPurSlave>0>purSlaveBillRate',type: 'string' },
        ],
        localdata: data
    };
    var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    	
        if (value ==0) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">Cash/Credit</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">Cash</span>';
        }
    };
    
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    $("#jqxgrid1").jqxGrid(
    {
        width: 1150,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        columns: [
            { text: 'Vou NO', datafield: 'purDocId', width: 150 },
            { text: 'Type', datafield: 'type',cellsrenderer: cellsrenderer},
            { text: 'Bill No', datafield: 'purBillNo', width: 150 },
            
            { text: 'Bill Date',  datafield: 'purBillDate',cellsrenderer: function(row, column, value, defaultSettings, columnSettings, rowdata )
                {
                    var date = getDate(value);

            		return "<div style='margin: 4px; color: blue;'>" + date + "</div>";
                },
                    width: 50 },
            { text: 'Party Name', datafield: 'vendorName', width: 180 },
            
            { text: 'Qty', datafield: 'purSlaveQty', width: 180 },
            { text: 'Schm',  width: 180 },
            { text: 'SchmDisc', width: 180 },
            { text: 'Disc%', width: 180 },
            { text: 'BatchNo', datafield: 'batchCode', width: 180 },
            
            { text: 'Mrp', datafield: 'purSlaveMrp', width: 120 },
            
            { text: 'Pur Rate', datafield: 'purSlavePurchaseRate'},
            
            { text: 'T_rate', datafield: 'purSlaveBillRate'},
            
            /*{ text: 'Pending Days', cellsalign: 'right', cellsformat: 'c2',cellsrenderer:cellsrendererTotal},*/
           
        ]
    });
   
   $("#excelExport1").jqxButton();
   
    $("#csvExport1").jqxButton();
   
    $("#pdfExport1").jqxButton();
    $("#excelExport1").click(function () {
        $("#jqxgrid1").jqxGrid('exportdata', 'xls', 'jqxGrid');           
    });
  
    $("#csvExport1").click(function () {
        $("#jqxgrid1").jqxGrid('exportdata', 'csv', 'jqxGrid');
    });
    
    $("#pdfExport1").click(function () {
        $("#jqxgrid1").jqxGrid('exportdata', 'pdf', 'jqxGrid');
    });

}

function splitBatchContent(result) {
	setFocusBatchPopUp();

	for ( var i = 0; i < result.length; i++) {
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
									+ "class='form-control input-SmallText' readonly='true' id='textNetRate"
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
									+ "class='form-control input-SmallText' readonly='true' id='textBillRate"
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
									+ "class='form-control input-SmallText' readonly='true' id='textPurchaseMasterId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPurchaseSlaveId"
									+ i + "'" + "tabindex='-1' /></td>"
                                  

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVat"
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
									+ "class='form-control input-SmallText' readonly='true' id='textNetRate"
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
									+ "class='form-control input-SmallText' readonly='true' id='textBillRate"
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
									+ "class='form-control input-SmallText' readonly='true' id='textPurchaseMasterId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPurchaseSlaveId"
									+ i + "'" + "tabindex='-1' /></td>"


									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVat"
									+ i + "'" + "tabindex='-1' /></td>"
									
									+ "</tr>");
		}
		/*$("#textBatchCode" + i).val(arr[0]);
		$("#textBatchExpiry" + i).val(arr[1]);
		$("#textBatchMRP" + i).val(arr[2]);

		$("#textBatchClearStock" + i).val(arr[4]);
		$("#textBatchPopUpBatchId" + i).val(arr[5]);
		$("#textBatchStockId" + i).val(arr[6]);

		$("#textLastPurchaseFrom" + i).val(arr[8]);
		$("#textBillNo" + i).val(arr[9]);
		$("#textBillDate" + i).val(arr[10]);

		$("#textBillRate" + i).val(arr[7]);
		$("#textSaleRate" + i).val(arr[3]);

		$("#textNetRate" + i).val(arr[11]);
		$("#textVat" + i).val(arr[12]);

		$("#textPurchaseMasterId" + i).val(arr[13]);
		$("#textPurchaseSlaveId" + i).val(arr[14]);*/
		
		$("#textBatchCode" + i).val(result[i].batchCode);
		$("#textBatchExpiry" + i).val(result[i].batchExpDate);
		$("#textBatchMRP" + i).val(result[i].mrp);
		
		$("#textBatchClearStock" + i).val(result[i].clearStock);
		$("#textBatchPopUpBatchId" + i).val(result[i].batchId);
		$("#textBatchStockId" + i).val(result[i].stockId);
		
		$("#textLastPurchaseFrom" + i).val(result[i].lastPurchaseFrom);
		$("#textBillNo" + i).val(result[i].billNo);
		$("#textBillDate" + i).val(result[i].billDate);
		
		$("#textBillRate" + i).val(result[i].billRate);
		$("#textSaleRate" + i).val(result[i].saleRate);
		
		$("#textNetRate" + i).val(result[i].purchaseRate);
		$("#textVat" + i).val(result[i].vat);
		
		$("#textPurchaseMasterId" + i).val(result[i].purchaseId);
		$("#textPurchaseSlaveId" + i).val(result[i].purchaseSlaveId);
		
		/*$("#textBatchPurchaseRate" + i).val(result[i].purchaseRate);
		$("#textBatchVat" + i).val(result[i].vat);*/

	}
}

function getLastPurchase(productId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId
		},
		url : "../../pharmacy/purchase/getLastPurchaseDetails",
		timeout : 1000 * 60 * 15,

		error : function(error) {
			alert('error' + error);
		},
		success : function(r) {
			if (r.length > 0) {
				splitLastPurchaseContent(r);
			} else {
				$("#lastPurchaseData").html("No Record Found");
			}
		}
	});
}

function getPendingBills(vendorId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			vendorId : vendorId
		},
		url : "../../pharmacy/cashPaidEntry/getPendingBills",
		error : function(error) {
			alert('error' + error);
		},
		success : function(r) {
			$("#popUpHeading").html(
					"Pending Purchase Bill of " + $("#searchBox").val());
			if (r.length > 0) {
				setPendingBillContents(r);
				/*$('#jqxgrid').jqxGrid('selectrow', 1);*/

			} else {

				$("#pendingBillsData").html("No Record Found");
			}
		}
	});
}

function getPurchaseByBatch(productId) {

	var validStore = "";
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId,
			validStore : validStore
		},
		url : "../../pharmacy/purchase/getBatchDetails",
		timeout : 1000 * 60 * 15,

		error : function(error) {
			alert('error' + error);
		},
		success : function(result) {
			var jsObj =$.parseJSON(result);
			
			if (jsObj.result.length > 0) {
				splitBatchContent(jsObj.result);
			} else {
				$("#batchData").html("No Record Found");
			}
		}
	});
}

function setPendingBillContents(content) {
	/*setFocusBatchPopUp();

	for ( var i = 0; i < content.length; i++) {
		if (i == 0) {
			$("#pendingBillsData")
					.html(
							"<tr><td>"
									+ "<input type='radio' name='pendingPurchase' id='lastPurchaseRowId"
									+ i
									+ "'"
									+ " checked='true' autofocus='autofocus'></td>"

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

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVouNo"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVouDate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textType"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textNetAmount"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textAmountBalance"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPendDays"
									+ i + "'" + "tabindex='-1' /></td>"

									+ "</tr>");

		} else {
			$("#pendingBillsData")
					.append(
							"<tr><td>"
									+ "<input type='radio' name='pendingPurchase' id='lastPurchaseRowId"
									+ i
									+ "'"
									+ "></td>"

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

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVouNo"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textVouDate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textType"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textNetAmount"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textAmountBalance"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPendDays"
									+ i + "'" + "tabindex='-1' /></td>"

									+ "</tr>");
		}

		$("#textVouNo" + i).val(content[i].vouNo);

		if (content[i].type == '0') {
			$("#textType" + i).val('Cash/Credit');
		} else {
			$("#textType" + i).val('Cash');
		}

		$("#textBillNo" + i).val(content[i].billNo);
		$("#textBillDate" + i).val(content[i].billDate);

		$("#textVouDate" + i).val(content[i].vouDate);

		$("#textNetAmount" + i).val(content[i].netAmount);
		$("#textAmountBalance" + i).val(content[i].netAmount);

		var date = getDate(new Date());

		var a = moment(date, 'YYYY/M/D');
		var b = moment($("#textBillDate" + i).val(), 'YYYY/M/D');
		var diffDays = b.diff(a, 'days');

		$("#textPendDays" + i).val(0 - diffDays);

	}*/
	var data = content;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'billNo', type: 'string' },
            { name: 'billDate', type: 'string' },
            { name: 'vouNo', type: 'string' },
            { name: 'vouDate', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'netAmount', type: 'string' },
            { name: 'billDate', type: 'string' },
           
        ],
        localdata: data
    };
    var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    	
        if (value ==0) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">Cash/Credit</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">Cash</span>';
        }
    };
    
    	var cellsrendererTotal = function (row, columnfield, value, defaulthtml, columnproperties) {
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
    	}
	
    
    	
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
   


    
    $("#jqxgrid").jqxGrid(
    {
        width: 850,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        keyboardnavigation: true,
        editmode: 'enter',
        ready: function () {
        	//$(“#jqxgrid”).jqxGrid(‘sortby’, ‘ObjectId’, ‘asc’);
        	//$(“#jqxgrid”).jqxGrid(‘selectionmode’, ‘singlerow’);
        	/*$('#jqxgrid').jqxGrid('selectrow', 0);*/
        	$('#jqxgrid').jqxGrid('selectrow', 0);
        	 $("#jqxgrid").jqxGrid('focus');
        	},
        	
        	rendergridrows: function () {
        		return dataadapter.records;
        		},
        		
        		 handlekeyboardnavigation: function (event) {
                     var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
                     var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                     if (key == 13) {
                         $('#jqxgrid').jqxGrid('deleterow', rowindex);
                         return true;
                     }
                 },
        
        columns: [
            { text: 'Bill NO', datafield: 'billNo', width: 150 },
            { text: 'Bill Date', datafield: 'billDate', width: 150 },
            { text: 'Voucher Number', datafield: 'vouNo', width: 180 },
            { text: 'Voucher Date', datafield: 'vouDate', width: 120 },
            { text: 'Type', datafield: 'type',cellsrenderer: cellsrenderer},
            { text: 'Net Amount', datafield: 'netAmount'},
            /*{ text: 'Pending Days', cellsalign: 'right', cellsformat: 'c2',cellsrenderer:cellsrendererTotal},*/
            { text: 'Pending Days',  cellsrenderer: function(row, column, value, defaultSettings, columnSettings, rowdata )
                {
                    var date = getDate(new Date());

            		var a = moment(date, 'YYYY/M/D');
            		var b = moment(rowdata.billDate, 'YYYY/M/D');
            		var diffDays = b.diff(a, 'days');

            		var result=(0 - diffDays);
                    
            		return "<div style='margin: 4px; color: blue;'>" + result + "</div>";
                },
                    width: 50 },
        ]
    });
    
    $("#excelExport").jqxButton();
   
    $("#csvExport").jqxButton();
   
    $("#pdfExport").jqxButton();
    $("#excelExport").click(function () {
        $("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');           
    });
  
    $("#csvExport").click(function () {
        $("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid');
    });
    
    $("#pdfExport").click(function () {
        $("#jqxgrid").jqxGrid('exportdata', 'pdf', 'jqxGrid');
    });

   /* $('#jqxgrid').jqxGrid('selectrow', 0);*/
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

	return yyyy + '-' + mm + '-' + dd;
}