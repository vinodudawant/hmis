function setFocusOnLoad() {

		$("#txtBarcode").focus();
}

function setFocusToSave()
{
	var a=$('#txtQty').val();
	
	if(parseFloat(a.lastIndexOf(".")) > 0)
	{
	alert("Enter proper Qty");
	$('#txtQty').val('');
	
	setTimeout(function() {
		$('#txtQty').focus();
	}, 400);
	
	return false;
	}
	
	$("#saveStockOut").focus();
}
/**
 * @Code : Fetch stock entry details
 * @return
 **/
function fetchStockEntryDetails()
{
	
	var txtStockEntryType = $("input[name='stockEntryTypeFetch']:checked").val();
	var inputs = [];
		
	inputs.push('StockEntry=' + txtStockEntryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/stockOutEntry/getStockEntryDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			$("#saveBtn").show();
			alert("oops something went wrong related to stock please save proper data or check mrp");
		},
		success : function(r) 
		{
			
             var jsObj =$.parseJSON(r);
			setStockOutEntryDetails(jsObj.result);
		}
		
	});

	return true;
}

/**
 * @Code : set stock out in enrty
 * @return
 **/

function setStockOutEntryDetails(result)
{
	var divContent="";
	var status;
	var stockQty;
	var stockOutQty;
	
	
	for(var i=0;i<result.length;i++)
	{
		//Added By BILAL For CLosing stock 
		var quantity =parseInt(result[i].stock_qty);
		var currentqyt = parseInt(result[i].current_Stock);
		var closingStock;
		
		if(result[i].stock_entry_type=='0')
		{
			status="Stock Out";
			stockQty=result[i].stock_qty;
		    stockOutQty="-";
		    closingStock =  quantity +  currentqyt ; 
		}
		else
		{
			status="Stock In";
			stockQty="-";
		    stockOutQty=result[i].stock_qty;
		    closingStock = currentqyt - quantity; 
		}	
		
		divContent=divContent+"<tr><td>"+result[i].product_name+"</td><td>"+result[i].batch_code+"</td><td>"+result[i].stock_qty+"</td><td>"+status+"</td><td>"+closingStock+"</td><td>"+result[i].current_Stock+"</td></tr>";
	}
	
	$("#tableStockOutDetails").html(divContent);
}
/**
 * @Code : save stock in out entry
 * @return
 **/
function saveStockOutEntry() {
	var hashes = window.location.href.split("=");
	var queryString = [];
	var hash = 0;
	var value1 = 0;
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		value1 = hashes[i].split(',');
	}
	if (hashes.length == 1) {

		var retVal = confirm("Do you want to Save?");
		if (retVal == true) {

			var stock = parseFloat($('#txtClosingStk').val());
			
			if(parseFloat($('#txtQty').val())==0)
			{
				alert("Enter Qty greater than 0");
				$('#txtQty').val('');
				$('#txtQty').focus();
				return false;
			}
			
			if ($("#txtQty").val() != null && $("#txtQty").val() != '')
			{
			var qty = parseFloat($('#txtQty').val());
			}
			else
				{
					alert("Enter Quantity");
					$('#txtQty').focus();
					return false;
				}
			
			var txtStockEntryType=$("input[name='stockEntryType']:checked").val();

				if(txtStockEntryType=="0")
				{
					if (stock < qty)
					{
						alert("Enter Quantity less than Stock");
						$('#txtQty').val('');
						$('#txtQty').focus();
						return false;
					}	
				}
				else
				{
					
					
				}	
				
				
				var txtBatchId = "";
				if ($('#hiddenBatchId').val() != null
						&& $('#hiddenBatchId').val() != "") {
					txtBatchId = $("#hiddenBatchId").val();
				}

				var txtProductId = "";
				if ($('#hiddenProductId').val() != null
						&& $('#hiddenProductId').val() != "") {
					txtProductId = $("#hiddenProductId").val();
				}

				var txtStockId = "";
				if ($('#hiddenStockId').val() != null
						&& $('#hiddenStockId').val() != "") {
					txtStockId = $("#hiddenStockId").val();
				}

				var txtQty = 0;
				if ($('#txtQty').val() != null && $('#txtQty').val() != ""
						&& $('#txtQty').val() != "0") {
					Qty = $("#txtQty").val();
				}

				var txtClosingStk = 0;
				if ($('#txtClosingStk').val() != null
						&& $('#txtClosingStk').val() != ""
						&& $('#txtClosingStk').val() != "0") {
					txtClosingStk = $("#txtClosingStk").val();
				}
				
				

				var inputs = [];

				inputs.push("saleFrom=stockOutEntry");
				inputs.push("BatchId=" + txtBatchId);
				inputs.push("ProductId=" + txtProductId);

				inputs.push("StockId=" + txtStockId);
				inputs.push("Qty=" + Qty);
				inputs.push("stockOutClosingStock=" + stock);
				inputs.push("stockEntryType=" + txtStockEntryType);

				
				var str = inputs.join('&');
				jQuery
						.ajax({
							async : false,
							type : "POST",
							data : str,
							/* url : "../indentSale/sampleTest", */
							//10 june 20
							//url : "../common/saleType",
							url : "../../pharmacy/stockOutEntry/save",
							catche : false,
							error : function() {
								$("#saveBtn").show();
								alert("oops something went wrong related to stock please save proper data or check mrp");
							},
							success : function(r) {

								/* var result=jQuery.parseJSON(r); */

								if (r.result == 'Error') {
									alert(r.result);

								} else {
									alertify.success("Record saved successfully..!");
									
									$('#correctionInRatet').find('input:text').val('');
									$('#correctionInRatet').find('input:hidden').val('');
									fetchStockEntryDetails();
									setFocusOnLoad();

								}
							}
						});
				
		}
	}
}
/**
 * @Code : serach products for stock in out
 * @return
 **/
function setValuesToAutocompletestockinout(key) {

	if (key != null) {
		var keycode = (key.which) ? key.which : key.keyCode;
		if (keycode == 9) {
			$('#txtQty').focus();
			return false;
		}
	}

	var findingName = $("#txtProductName").val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/product/autoSuggestionProduct",
				timeout : 1000 * 60 * 15,

				error : function(error) {
					alert('error' + error);
				},
				success : function(r) {
					var availableTags = [];
					var resultData = [];

					for (var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + '-'
								+ r[i].shelfMaster.shelfName;
					}

					var template = "";
					for (var j = 0; j < availableTags.length; j++) {
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
					$(".typeahead1").html(template);
					$(".typeahead1").show();

					setTimeout(
							function() {
								$('#txtProductName').typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResultStockInOut,
									scrollBar : true
								});
								$("#txtProductName").data('typeahead').source = resultData;
							}, 500);
				}
			});
}

function displayResultStockInOut(item) {
	var content = item.value.split("-");
	$('#hiddenProductId').val(content[0]);
	$('#txtUnit').val(content[1]);
	$('#txtPack').val(content[2]);
	$('#txtComp').val(content[3]);
	$('#txtShelf').val(content[4]);
	/* loadBatchPopUp(content[0]); */
}

function loadBatchPopUp() {
	
	var productId = $("#hiddenProductId").val();
	if (productId != null && productId != "") 
	{
		getPurchaseByBatch(productId);
		$("#rowId0").focus();
		setTimeout(function()
				{
			$("#rowId0").focus();
		}, 450);
		$('#Purchse_Batch_Pop_Up').modal('show');
	} else {
		/*alertify.error("Select Product First");*/
	}
}

function setPopUpValues(number, totalRow) 
{
	$('#txtBatchNo').val($('#textBatchCode' + number).val());
	$('#txtClosingStk').val($('#textBatchClearStock' + number).val());
	$('#hiddenBatchId').val($('#textBatchPopUpBatchId' + number).val());
	$('#hiddenStockId').val($('#textBatchStockId' + number).val());
	$('#txtExpiry').val($('#textBatchExpiry' + number).val());
	$('#txtBarcode').val($('#textBatchPopUpBatchId' + number).val());
	$('#txtVat').val($('#textBatchVat' + number).val());
	$('#txtIgst').val($('#textBatchIgst' + number).val());
	$('#txtCess').val($('#textBatchCess' + number).val());
	
}


function fetchProductNameByBarcode(batchId)
{
	var a=batchId;
	
	if( parseInt(a.lastIndexOf(".")) > 0)
	{
	alert("Enter proper barcode");
	$('#txtBarcode').val('');
	$('#txtBarcode').focus();
	return false;
	}

if((a.indexOf("0")==0))
{
	alert("barcode should not starts with 0");
	$('#txtBarcode').val('');
	$('#txtBarcode').focus();
	return false;
}
	
	if ($('#txtBarcode').val() != '') 
	{
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
							setTableDataByBarcode(data.result);
						}
					});
			return true;
		
	}
}

function setTableDataByBarcode(r) 
{

	if (r != "" && r != null)
	{
		if ($('#txtBarcode').val() != '')
		{
				$('#txtProductName').val(r[0].productName);
				$('#txtUnit').val(r[0].unit);
				$('#txtPack').val(r[0].pack);
				$('#txtComp').val(r[0].comp);
				$('#txtBatchNo').val(r[0].batchCode);
				$('#txtExpiry').val(r[0].batchExpDate);
				$('#txtQty').val("1");
				$('#txtClosingStk').val(r[0].clearStock);
				$('#hiddenBatchId').val($('#txtBarcode').val());
				$('#hiddenStockId').val(r[0].stockId);
				$("#hiddenProductId").val(r[0].productId);
				$("#txtShelf").val(r[0].shelfName);
				
				$('#hiddenBatchId').val($('#txtBarcode').val());
				$("#txtQty").focus();
				
		}
	} else {
		alert("Record not found");
		$('#txtProductName').val('');
		$('#txtUnit').val('');
		$('#txtPack').val('');
		$('#txtComp').val('');
		$("#txtShelf").val('');
		$('#txtBatchNo').val('');
		$('#txtExpiry').val('');
		$('#txtQty').val('');
		$('#txtClosingStk').val('');
		$('#hiddenStockId').val('');
		$("#hiddenProductId").val('');
		$('#hiddenBatchId').val('');
	}
}

