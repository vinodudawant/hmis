



/************
* @codeFor	: Save physical stock update
 ************/
function savePhyStockUpdate() {
	
		var retVal = confirm("Do you want to Save?");
		if (retVal == true) {

			  var stock = parseFloat($('#txtClosingStk').val());
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
			
				var txtClosingStk = 0;
				if ($('#txtClosingStk').val() != null
						&& $('#txtClosingStk').val() != ""
						) {
					txtClosingStk = $("#txtClosingStk").val();
				}
				
				var txtPhyQty = 0;
				if ($('#txtPhyQty').val() != null
						&& $('#txtPhyQty').val() != "") {
				 txtPhyQty = $("#txtPhyQty").val();
				}
				else{
					alert("Please Enter Physical Qty");
					return;
				}
				
				var txtVoucher = 0;
				if ($('#txtVoucher').val() != null
						&& $('#txtVoucher').val() != 0) {
					txtVoucher = $("#txtVoucher").val();
				}
				else{
					alert("Please Select Voucher No.");
					return;
				}
				var txtBatchNo =$("#txtBatchNo").val();
				if (txtBatchNo == "" || txtBatchNo == null || txtBatchNo == undefined ) {
						
					alert("Please Select Bach No.");
					return;
				}
				var inputs = [];

				inputs.push("saleFrom=stockOutEntry");
				inputs.push("BatchId=" + txtBatchId);
				inputs.push("ProductId=" + txtProductId);
				inputs.push("StockId=" + txtStockId);
				inputs.push("txtPhyQty=" + txtPhyQty);
				inputs.push("ClosingStock=" + txtClosingStk);
				inputs.push("txtVoucher=" + txtVoucher);
				
				var str = inputs.join('&');
				jQuery
						.ajax({
							async : false,
							type : "POST",
							data : str,
							url : "../../pharmacy/physicalStockUpdate/save",
							catche : false,
							error : function() {
								$("#saveBtn").show();
								alert("Oops something went wrong related to stock please save proper data");
							},
							success : function(r) {

								if (r.result == 'Error') {
									alert(r.result);

								} else {
									alertify.success("Record saved successfully..!");
									$("#txtBarcode").val('');
									$("#txtPhyQty").val('');
									$("#txtBatchNo").val('');
									$("#txtVoucher").val('');
									$("#txtExpiry").val('');
									$("#txtClosingStk").val('');
									$("#txtProductName").val('');
									$("#txtUnit").val('');
									$("#txtPack").val('');
									$("#txtComp").val('');
									$("#txtShelf").val('');
									setFocusOnLoad();
									fetchPhyStockUpdateDetails();

								}
							}
						});
				
		}
	}
/************
* @codeFor	: Fetch physical stock update
 ************/
function fetchPhyStockUpdateDetails()
{
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "../../pharmacy/physicalStockUpdate/getPhyStockUpdateDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			$("#saveBtn").show();
			alert("Oops something went wrong related to stock please save proper data");
		},
		success : function(result) 
		{
			setPhysicalStockUpdat(result);
			//alert(result);
            // var jsObj =$.parseJSON(result);
            // (jsObj.result);
		}
		
	});

	return true;
}

function setPhysicalStockUpdat(result){
	var divContent="";
	var userName1 =$('#hiddenUserName').val();
	//alert(userName1);
	for(var i=0;i<result.lstStockOutEnrty.length;i++)
	{
		divContent=divContent+"<tr><td>"+result.lstStockOutEnrty[i].product_name+"</td><td>"+result.lstStockOutEnrty[i].batch_code+"</td><td>"+result.lstStockOutEnrty[i].batch_exp_date+"</td><td>"+result.lstStockOutEnrty[i].phy_stock+"</td><td>"+userName1+"</td><td>"+result.lstStockOutEnrty[i].vou_no+"</td></tr>";
	}
	$("#PhyStockUpdate").html(divContent);
}
/************
* @codeFor	: Fetch physical stock by product name
 ************/

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
	alert("Barcode should not starts with 0");
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

/************
* @codeFor	:Set auto focus to physical qty
 ************/

function setFocusToSave()
{
	var a=$('#txtPhyQty').val();
	if(parseFloat(a.lastIndexOf(".")) > 0)
	{
	  alert("Enter proper Qty");
	  $('#txtPhyQty').val('');
 	
	  setTimeout(function() {
	  $('#txtPhyQty').focus();
	}, 400);
	
	return false;
	}
	$("#saveStockOut").focus();
}


/************
* @codeFor	: Div for setting physical details.
 ************/

function setPhyStockDetails(result)
{
	var divContent="";
	var userName1 =$('#hiddenUserName').val();
	//alert(userName1);
	for(var i=0;i<result.length;i++)
	{
		divContent=divContent+"<tr><td>"+result[i].product_name+"</td><td>"+result[i].batch_code+"</td><td>"+result[i].physical_stock+"</td><td>"+userName1+"</td><td>"+result[i].voucher_no+"</td></tr>";
	}
	$("#PhyStockUpdate").html(divContent);
}


/************
* @codeFor	: Function for search product by voucher number.
 ************/

function fetchVoucherNo(){
	var VoucherNo =  $("#txtVoucher").val();
	var inputs = [];
	inputs.push('voucher_no=' + VoucherNo);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/physicalStockUpdate/fetchProductByVoucherNumber",
				timeout : 1000 * 60 * 5,
				catche : false,
				global : false,
				error : function() {
					alert("error");
				},
				success : function(result) {
					//alert(result);
					$("#tableStockOutDetails").empty();
					//var data = jQuery.parseJSON(result);
					setStockOutEntryAdjustDetails(result);
				}
			});
	return true;
	
}
function createVoucher(){
	var VoucherNo =  $("#vouNumber").val();
	var inputs = [];
	inputs.push('voucherno=' + VoucherNo);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/physicalStockUpdate/saveVoucherNumber",
				timeout : 1000 * 60 * 5,
				catche : false,
				global : false,
				error : function() {
					alert("error");
				},
				success : function(result) {
					alert("success...!");
					$("#txtVoucher").append('<option value='+VoucherNo+' selected="selected">'+VoucherNo+'_'+$("#hiddenUserName").val()+'</option>');
				}
			});
	}


function fetchVoucherNumber(){
	jQuery
	.ajax({
		async : true,
		type : "GET",
		url : "../../pharmacy/physicalStockUpdate/fetchVoucherNumber2",
		timeout : 1000 * 60 * 5,
		catche : false,
		global : false,
		error : function() {
			alert("error");
		},
		success : function(result) {
			console.log(result);
			setVoucherNumber(result);
			/*for(var i=0;i<result.length;i++){
				$("#txtVoucher").append('<option value='+result[i][1]+'>'+result[i][1]+'_'+result[i][4]+'</option>');
			}*/
		}
	});
}


function setVoucherNumber(r) {
	var list = "<option value='0'>--Select--</option>";    
    for ( var i = 0; i < r.lstvocher.length; i++) {    

        list = list + "<option value='"+r.lstvocher[i].voucherNo+"'>" + ((r.lstvocher[i].voucherNo) + (r.lstvocher[i].createdUserName)) + "</option>";    
        }  
    $("#txtVoucher").html(list);
}
