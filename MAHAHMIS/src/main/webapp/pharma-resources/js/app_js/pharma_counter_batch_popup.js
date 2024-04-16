function splitBatchContentCounter(result) {
	
	$('#jqxgrid').jqxGrid('selectrow', 0);
	
	var data=[];
	
	for(var i=0;i<result.length;i++)
	{
		var stock=parseFloat(result[i].clearStock);
		if(stock>0)
		{
			data.push(result[i]);
		}	
	
	}
	if(data!="")
	setCounterGridData(data);
	else
		{
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
	$("#txtContent").val('');
	$("#txtCompany").val('');
	$("#txtRatePerUnit").val('');
		}
	
}


function setCounterGridData(result)
{
	var data = result;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'batchCode', type: 'string' },
            { name: 'batchExpDate', type: 'string' },
            { name: 'mrp', type: 'string' },
            { name: 'saleRate', type: 'string' },
            { name: 'clearStock', type: 'string' },
            { name: 'lastPurchaseFrom', type: 'string' },
            { name: 'billNo', type: 'string' },
            
            { name: 'billDate', type: 'string' },
            { name: 'batchId', type: 'string' },
            { name: 'stockId', type: 'string' },
            
            { name: 'purchaseId', type: 'string' },
            { name: 'purchaseSlaveId', type: 'string' },
            { name: 'vat', type: 'string' },
            { name: 'purchaseRate', type: 'string' },
            
        ],
        localdata: data
    };
    	
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
   
   
    
    $("#jqxgrid").jqxGrid(
    {
        width:800,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        theme: 'energyblue',
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        keyboardnavigation: true,
        editmode: 'enter',
        ready: function()
        {
            $("#jqxgrid").jqxGrid('selectcell', 0, 'batchCode');
            // focus jqxgrid.
            $("#jqxgrid").jqxGrid('focus');
            $('#jqxgrid').jqxGrid('selectrow', 0);
        },
        	
        handlekeyboardnavigation: function (event) {
            var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == 13) {
                  setPopUpValues1(rowindex);
             }
        },
        
        columns: [
            { text: 'Batch Code', datafield: 'batchCode', width: 150 },
            { text: 'Expiry', datafield: 'batchExpDate', width: 50 },
            { text: 'MRP', datafield: 'mrp', width: 80 },
            { text: 'Sale Rate', datafield: 'saleRate', width: 100 },
            { text: 'Stock', datafield: 'clearStock',cellsrenderer: deleterenderer , width: 100 },
            { text: 'Last Purchase From', datafield: 'lastPurchaseFrom',width: 250 },
            { text: 'Last Bill No', datafield: 'billNo',width: 150 },
            { text: 'Last Bill Date', datafield: 'billDate',width: 150 },
            { text: 'Batch Id', datafield: 'batchId',hidden:true},
            { text: 'Stock Id', datafield: 'stockId',hidden:true},
            { text: 'Purchase Id', datafield: 'purchaseId',hidden:true},
            { text: 'Purchase Slave Id', datafield: 'purchaseSlaveId',hidden:true},
            { text: 'Vat', datafield: 'vat',hidden:true},
            { text: 'Pur Rate', datafield: 'purchaseRate',hidden:true},
        ],
        
    });
    
    var deleterenderer= function (row, column, value) 
    {
    	$("#jqxGrid").jqxGrid('hiderowdetails', 1);
    	
   };
    
    $("#jqxgrid").bind('rowdoubleclick', function (event) {
        var  lastRow = event.args.rowindex;
        setPopUpValues1(lastRow);
    });
    
    $('#Counter_Batch_Pop_Up').modal('show');
    
    $("#jqxgrid").jqxGrid('selectcell', 0, 'batchCode');
    // focus jqxgrid.
    
    setTimeout(function() {
    	$("#jqxgrid").jqxGrid('focus');
	}, 500);
}

function getCounterByBatch(productId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId
		},
		url : "../../pharmacy/purchase/getBatchDetails",
		error : function(error) {
			alert('error' + error);
		},
		success : function(result) {
			
		//	alert(JSON.stringify(result));
			
			var jsObj = $.parseJSON(result);
			
			
			//var jsObj =JSON.parse(result);
			 $("#jqxgrid").jqxGrid({ source: jsObj.result });
			if (jsObj.result.length > 0) {
				splitBatchContentCounter(jsObj.result);
				$('#jqxgrid').jqxGrid('selectrow', 0);
				$("#particulars").blur(); 
				
			} else {
				
				 $('#jqxgrid').jqxGrid('refresh');
				
			}
			
			
			
			
			///////////////////////////////////////////////////////////////
			
			/*var rowCount=1;
			$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
			$('#textRateForPrint' + rowCount).val($('#txtRateForPrint').val());
			//$('#textProductName' + rowCount).val($('#particulars').val());
			$('#textUnit' + rowCount).val($('#txtUnit').val());
			$('#textPack' + rowCount).val($('#txtPack').val());
			$('#textCom' + rowCount).val($('#txtComp').val());
			$('#textMrp' + rowCount).val(jsObj.result[0].mrp);
			$('#textShelf' + rowCount).val($('#txtShelf').val());
			//$('#textQty' + rowCount).val($('#txtQty').val());
			$('#textBatchNo' + rowCount).val(jsObj.result[0].batchCode);
			$('#textExp' + rowCount).val(jsObj.result[0].batchExpDate);
			$('#textRate' + rowCount).val(jsObj.result[0].saleRate);

			$("#textNo" + rowCount).prop("readonly", true);

			$('#textBatchId' + rowCount).val(jsObj.result[0].mrp);

			$('#textStockId' + rowCount).val($('#hiddenStockId').val());

			$('#textStockQtyInHand' + rowCount).val(jsObj.result[0].clearStock);

			$('#textClStk' + rowCount).val(jsObj.result[0].clearStock);

			$('#textRatePerUnit' + rowCount).val(jsObj.result[0].billRate);

			$('#textContent' + rowCount).val($('#txtContent').val());

			$('#textTotalStk' + rowCount).val(jsObj.result[0].clearStock);

			$('#textProductH1' + rowCount).val($('#hiddenProductH1').val());

			$('#textPurchaseRate' + rowCount).val(jsObj.result[0].clearStock);
			$('#textNewVat' + rowCount).val(jsObj.result[0].vat);

			

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
				$('#textBarcode' + rowCount).val($('#hiddenBatchId').val());*/

			//calculateVatAmt(rCount);
			//calculateTotalPurchase();

			
			////////////////////////////////////////////////////////////////
			
			
		}
	});
}
//added by vishant
function getCounterByBatch2(productId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId
		},
		url : "../../pharmacy/purchase/getBatchDetailsWithoutExpiry",
		error : function(error) {
			alert('error' + error);
		},
		success : function(result) {
			
		//	alert(JSON.stringify(result));
			
			var jsObj = $.parseJSON(result);
			
			
			//var jsObj =JSON.parse(result);
			 $("#jqxgrid").jqxGrid({ source: jsObj.result });
			if (jsObj.result.length > 0) {
				splitBatchContentCounter2(jsObj.result);
				$('#jqxgrid').jqxGrid('selectrow', 0);
				$("#particulars").blur(); 
				
			} else {
				
				 $('#jqxgrid').jqxGrid('refresh');
				
			}
			
			
			
			
			///////////////////////////////////////////////////////////////
			
			/*var rowCount=1;
			$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
			$('#textRateForPrint' + rowCount).val($('#txtRateForPrint').val());
			//$('#textProductName' + rowCount).val($('#particulars').val());
			$('#textUnit' + rowCount).val($('#txtUnit').val());
			$('#textPack' + rowCount).val($('#txtPack').val());
			$('#textCom' + rowCount).val($('#txtComp').val());
			$('#textMrp' + rowCount).val(jsObj.result[0].mrp);
			$('#textShelf' + rowCount).val($('#txtShelf').val());
			//$('#textQty' + rowCount).val($('#txtQty').val());
			$('#textBatchNo' + rowCount).val(jsObj.result[0].batchCode);
			$('#textExp' + rowCount).val(jsObj.result[0].batchExpDate);
			$('#textRate' + rowCount).val(jsObj.result[0].saleRate);

			$("#textNo" + rowCount).prop("readonly", true);

			$('#textBatchId' + rowCount).val(jsObj.result[0].mrp);

			$('#textStockId' + rowCount).val($('#hiddenStockId').val());

			$('#textStockQtyInHand' + rowCount).val(jsObj.result[0].clearStock);

			$('#textClStk' + rowCount).val(jsObj.result[0].clearStock);

			$('#textRatePerUnit' + rowCount).val(jsObj.result[0].billRate);

			$('#textContent' + rowCount).val($('#txtContent').val());

			$('#textTotalStk' + rowCount).val(jsObj.result[0].clearStock);

			$('#textProductH1' + rowCount).val($('#hiddenProductH1').val());

			$('#textPurchaseRate' + rowCount).val(jsObj.result[0].clearStock);
			$('#textNewVat' + rowCount).val(jsObj.result[0].vat);

			

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
				$('#textBarcode' + rowCount).val($('#hiddenBatchId').val());*/

			//calculateVatAmt(rCount);
			//calculateTotalPurchase();

			
			////////////////////////////////////////////////////////////////
			
			
		}
	});
}

function calculateAmount(rowCount){
	$('#textIssueQty' + rowCount).val($('#textQty'+rowCount).val());

	//$('#textDis' + rowCount).val($('#txtDis').val());

	var qty = parseFloat($('#textQty'+rowCount).val());

	//$('#textDisAmt' + rowCount).val($('#txtDiscAmt').val());
	$('#textDisAmt' + rowCount).val(0);

	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		disc = parseFloat($('#txtDiscAmt').val());
		var result = (disc / qty);
		$('#textDisAmtPerUnit' + rowCount).val((result).toFixed(3));
	} else
		$('#textDisAmtPerUnit' + rowCount).val(0);
	
	
	if ($('#txtAmt').val() != '' && $('#txtAmt').val().length > 0)
		$('#textAmount' + rowCount).val($('#txtAmt').val());
	else
		$('#textAmount' + rowCount).val($('#textMrp'+rowCount).val() * qty);
	
	$('#txtGrossAmt').val($('#textMrp'+rowCount).val() * qty);

	var tot=0;
	for ( var i = 1; i < $('#RowCount').val(); i++) {
		tot=+tot + +parseFloat($('#textAmount'+i).val());
	}
	$('#txtAmount1').val(tot);
}

//added by vishant
function splitBatchContentCounter2(result) {
	
	$('#jqxgrid').jqxGrid('selectrow', 0);
	
	var data=[];
	
	var now = new Date();
	var currentMonthDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
	var resulty = (-(currentMonthDays)); 
	
	for(var i=0;i<result.length;i++)
	{
		var stock=parseFloat(result[i].clearStock);
		var difference=parseInt(result[i].difference);
	if(difference>=0 || difference<=0 && difference >=resulty){	
		if(stock>0)
		{
			data.push(result[i]);
		}
	 }
	
	}
	if(data!="")
	setCounterGridData2(data);
	else
		{
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
	$("#txtContent").val('');
	$("#txtCompany").val('');
	$("#txtRatePerUnit").val('');
		}
	
}


function setCounterGridData2(result)
{
	var data = result;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'batchCode', type: 'string' },
            { name: 'batchExpDate', type: 'string' },
            { name: 'mrp', type: 'string' },
            { name: 'saleRate', type: 'string' },
            { name: 'clearStock', type: 'string' },
            { name: 'lastPurchaseFrom', type: 'string' },
            { name: 'billNo', type: 'string' },
            
            { name: 'billDate', type: 'string' },
            { name: 'batchId', type: 'string' },
            { name: 'stockId', type: 'string' },
            
            { name: 'purchaseId', type: 'string' },
            { name: 'purchaseSlaveId', type: 'string' },
            { name: 'vat', type: 'string' },
            { name: 'purchaseRate', type: 'string' },
            
        ],
        localdata: data
    };
    	
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
   
   
    
    $("#jqxgrid").jqxGrid(
    {
        width:800,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        theme: 'energyblue',
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        keyboardnavigation: true,
        editmode: 'enter',
        ready: function()
        {
            $("#jqxgrid").jqxGrid('selectcell', 0, 'batchCode');
            // focus jqxgrid.
            $("#jqxgrid").jqxGrid('focus');
            $('#jqxgrid').jqxGrid('selectrow', 0);
        },
        	
        handlekeyboardnavigation: function (event) {
            var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == 13) {
                  setPopUpValues1(rowindex);
             }
        },
        
        columns: [
            { text: 'Batch Code', datafield: 'batchCode', width: 150 },
            { text: 'Expiry', datafield: 'batchExpDate', width: 50 },
            { text: 'MRP', datafield: 'mrp', width: 80 },
            { text: 'Sale Rate', datafield: 'saleRate', width: 100 },
            { text: 'Stock', datafield: 'clearStock',cellsrenderer: deleterenderer , width: 100 },
            { text: 'Last Purchase From', datafield: 'lastPurchaseFrom',width: 250 },
            { text: 'Last Bill No', datafield: 'billNo',width: 150 },
            { text: 'Last Bill Date', datafield: 'billDate',width: 150 },
            { text: 'Batch Id', datafield: 'batchId',hidden:true},
            { text: 'Stock Id', datafield: 'stockId',hidden:true},
            { text: 'Purchase Id', datafield: 'purchaseId',hidden:true},
            { text: 'Purchase Slave Id', datafield: 'purchaseSlaveId',hidden:true},
            { text: 'Vat', datafield: 'vat',hidden:true},
            { text: 'Pur Rate', datafield: 'purchaseRate',hidden:true},
        ],
        
    });
    
    var deleterenderer= function (row, column, value) 
    {
    	$("#jqxGrid").jqxGrid('hiderowdetails', 1);
    	
   };
    
    $("#jqxgrid").bind('rowdoubleclick', function (event) {
        var  lastRow = event.args.rowindex;
        setPopUpValues1(lastRow);
    });
    
    $('#Counter_Batch_Pop_Up').modal('show');
    
    $("#jqxgrid").jqxGrid('selectcell', 0, 'batchCode');
    // focus jqxgrid.
    
    setTimeout(function() {
    	$("#jqxgrid").jqxGrid('focus');
	}, 500);
}