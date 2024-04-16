/**
 * @Code :read barcode
 * @return
 **/
function readBarcode(masterId,Qty,productName,batchCode)
{
	productName=encodeURI(productName);
	window.open("../../pharmacy/pharmacy/openingStockBarcode?masterId="+masterId+"&count="+Qty+"&productName="+productName+"&batchCode="+batchCode);
}

/**
 * @Code :set value for shelf  
 * @return
 **/
function setValuesToShelfAutocomplete(key) {

		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#txtShelfNo").val();

		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",

			url : "../../pharmacy/shelf/autoSuggestionShelfNames",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				if (r.length > 0) {
					for ( var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].shelfName + '_' + r[i].shelfId;
					}
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';
				}

				$("#div" + key + " .typeahead").html(template);
				$("#div" + key + " .typeahead").show();

				setTimeout(function() {
					$('#txtShelfNo').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayShelfResult,
						scrollBar : true
					});
				}, 500);
			}
		});
	}

/**
 * @Code :set value for product
 * @return
 **/
	function setValuesToProductAutocomplete(key) {

		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#txtProduct").val();

		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",

			url : "../../pharmacy/product/autoSuggestionProduct",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				/*alert('error');*/
			},
			success : function(r) {
				console.log(r);
				var availableTags = [];
				var resultData = [];

				for ( var i = 0; i < r.length; i++) {
					if (r.length > 0) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + "-"
								+ r[i].shelfMaster.shelfName + "-";
								/*+ r[i].batchMaster[i].batchId + "-"
								+ r[i].batchMaster[i].stockMaster.stockId + "-";*/
						        $('#taxMastertaxtIdForval').val(r[i].taxMaster.taxId);
						
					}
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';
				}

				$("#div" + key + " .typeahead").html(template);
				$("#div" + key + " .typeahead").show();

				setTimeout(function() {
					$('#txtProduct').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayProductResult,
						scrollBar : true
					});
					
					$("#txtProduct").data('typeahead').source = resultData;
				}, 500);
			}
		});
	}
	
	function displayProductResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
	    $('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
							
		loadBatchPopUp(content[0]);

	}
	/**
	 * @Code :load batch popup
	 * @return
	 **/
	function loadBatchPopUp(productId) {
		getProductByBatch(productId);

		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 500);
		$('#Batch_Pop_Up').modal('show');
	}

	function displayShelfResult(item) {
		var content = item.value.split("-");
		$('#txtShelfId').val(content[0]);
		$('#txtShelfNo').val(content[1]);
	

	}
	/**
	 * @Code :check MRP 
	 * @return
	 **/
	function checkMrp()
	{  
		
        var PRate=parseFloat($('#txtPurRate').val());
		var mrp=parseFloat($('#txtMRP').val());
		if (mrp < PRate) 
		 {	 
			alert("MRP should be greater than PurRate");
		  } 
		else
			{
			$('#txtRate').val($('#txtMRP').val());
			}
		/* else 
		 {
		     alert("mrp is greater than PurRate");
		 }*/
		
	}
	/**
	 * @Code :calculate amount 
	 * @return
	 **/
	function calculateAmt() {
		$('#txtRate').val($('#txtMRP').val());
		var qty=$('#txtQty').val();
		var PRate=$('#txtPurRate').val();
        var amt= PRate*qty;
        $('#txtAmt').val(amt);
		
	}
	/**
	 * @Code :check availablity
	 * @return
	 **/
	
	function checkBatchAvailability(number) {
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				number : number
			},
			url : "../../pharmacy/openingStockEntry/checkBatchAvailability",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setBatchAvailibilityDetails(r);	
			}
		});
	}	
	function setBatchAvailibilityDetails(result) {
		if (result.length == 0) {
			alertify.success("Add New Batch");
			$("#txtExpiry").val('');
			$("#txtExpiry").prop("readonly", false);
			$("#hiddenBatchId").val('0');
		} else {
			alertify.success("Batch Already Added");
			$("#txtExpiry").val(result[0].batchExpDate);
			$("#txtExpiry").prop("readonly", true);
		}
	}
	function setPopUpValues(number, totalRow) {
		
		getGSTamount();
		//Added By BILAl Date 05-12-2017
		//For opening stock print not working on edit
		var GST=$('#textBatchVat' + number).val();  
		var IGST=$('#textBatchIgst' + number).val();
		var Cess=$('#textBatchCess' + number).val();
		
		if (GST == "" || GST == null || GST == undefined || isNaN(GST)) {
			GST = 0;
		}
		if (IGST == "" || IGST == null || IGST == undefined || isNaN(IGST)) {
			IGST = 0;
		}
		if (Cess == "" || Cess == null || Cess == undefined || isNaN(Cess)) {
			Cess = 0;
		}
		$('#txtMRP').val($('#textBatchMRP' + number).val());
		$('#txtPurRate').val($('#textBatchPurRate' + number).val());
		$('#txtRate').val($('#textBatchRate' + number).val());
		$('#txtBatchNo').val($('#textBatchCode' + number).val());
		$('#txtExpiry').val($('#textBatchExpiry' + number).val());
		
		//
		if(IGST > 0){
			$('#txtVAT').val(0);
		}
		$('#txtIgst').val(IGST);
		$('#txtCess').val(Cess);
		
		if($('#textBatchPopUpBatchId' + number).val()!=null && $('#textBatchPopUpBatchId' + number).val()!="")
			$('#hiddenBatchId').val($('#textBatchPopUpBatchId' + number).val());
		
		$('#hiddenStockId').val($('#textBatchStockId' + number).val());
		$('#txtAmt').val('');
		if($('#textPurchaseSlaveId' + number).val()!=null && $('#textPurchaseSlaveId' + number).val()!='')
			$('#txtPurchaseSlaveId').val($('#textPurchaseSlaveId' + number).val());
		
	}
	/******
	 * @code       :For Gst amount from taxt master 
	 * *******/
	function getGSTamount(){
		var taxtId =$('#taxMastertaxtIdForval').val();
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "../../pharmacy/openingStockEntry/getGSTamount",
			data : {
				"taxtId" : parseInt(taxtId)
			},
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				$('#txtVAT').val(r);
	
			}
		});
	}
	/**
	 * @Code :delete opening stock
	 * @return
	 **/
	function deleteOpeningStock(openingId) {
		var retVal = confirm("Do you want to delete It?");
		if (retVal == true) {
		reset();
		alertify.success("Record deleted successfully");
		
			var inputs = [];
			inputs.push('openingStockId=' + openingId);

			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "../../pharmacy/openingStockEntry/delete",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(r) {
							//getCompanyList();
							if (r == true) {
								/*$('#resultDiv')
										.html(
												"<div class='alert alert-success' >Record deleted successfully..!</div>");
								hideResultDiv();*/
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
	/**
	 * @Code :opening stock print
	 * @return
	 **/	
	function openingStockPrint(openingStockId,productName) 
	{
		  window.open("../../pharmacy/openingStockEntry/printView?openingStockId="+openingStockId+"&productName="+productName);
		 
	}
