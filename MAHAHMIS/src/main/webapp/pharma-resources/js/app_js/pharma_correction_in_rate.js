/**
 * @Code : For autosuggstion
 * @return
 **/

function setValuesToAutocomplete(key) {

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

					for ( var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + '-'
								+ r[i].shelfMaster.shelfName;
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
								+ (arrValue[0]) + '</a></li>';

					}
					$(".typeahead").html(template);
					$(".typeahead").show();

					setTimeout(function() {
						$('#txtProductName').typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResultCorrectionRate,
							scrollBar : true
						});
						$("#txtProductName").data('typeahead').source = resultData;
					}, 500);
				}
			});
}
function displayResultCorrectionRate(item) {
	var content = item.split("$$");
	$('#hiddenProductId').val(content[0]);
	$('#txtUnit').val(content[1]);
	$('#txtPack').val(content[2]);
	$('#txtComp').val(content[3]);
	$('#txtShelf').val(content[4]);
	
	
	$('#txtProductName').val(content[0]);
	$('#hiddenProductId').val(content[1]);
	$('#txtUnit').val(content[2]);
	$('#txtPack').val(content[3]);
	$('#txtComp').val(content[4]);
	$('#txtShelf').val(content[5]);
	loadBatchPopUpForCorrection(content[0]);

}

/**
 * @Code : load batch details popup
 * @return
 **/

function loadBatchPopUpForCorrection() {
	var productId=$("#hiddenProductId").val();
	if(productId!=null && productId!="")
	{	
		getPurchaseByBatch(productId);
		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 450);
		$('#Purchse_Batch_Pop_Up').modal('show');
	}
	else
	{
		alertify.error("Select Product First");
	}	
}
/**
 * @Code : set popup value
 * @return
 **/

function setPopUpValues(number, totalRow) {
	
	$('#txtRate').val($('#textBatchMRP' + number).val());
	$('#txtMrp').val($('#textBatchMRP' + number).val());
	$('#txtPRate').val($('#textNetRate' + number).val());
	$('#txtBatchNo').val($('#textBatchCode' + number).val());
	$('#txtExpiry').val($('#textBatchExpiry' + number).val());
	$('#txtClStk').val($('#textBatchClearStock' + number).val());
	$('#txtBillRate').val($('#textBillRate' + number).val());
	$('#txtClosingStk').val($('#textBatchClearStock' + number).val());
	$('#batchId').val($('#textBatchPopUpBatchId' + number).val());
	$('#hiddenStockId').val($('#textBatchStockId' + number).val());
	$("#hiddenPurchaseId").val($("#textPurchaseMasterId" + number).val());
	$("#hiddenPurchaseSlaveId").val($("#textPurchaseSlaveId" + number).val());
	
	$('#oldBatch').val($('#textBatchPopUpBatchId' + number).val());
	$('#oldMrp').val($('#textBatchMRP' + number).val());
	$('#oldBillRate').val($('#textBillRate' + number).val());
	
	$('#oldRate').val($('#textSaleRate' + number).val());
	$('#oldPurRate').val($('#textNetRate' + number).val());
	
}

/**
 * @Code : check batch availability
 * @return
 **/

function checkBatchAvailability(number) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			number : number
		},
		url : "../../pharmacy/purchase/checkBatchAvailability",
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
/**
 * @Code : set batch availbiliy details
 * @return
 **/

function setBatchAvailibilityDetails(result) {
	if (result.length == 0) {
		alertify.success("Add New Batch");
		$("#txtExpiry").val('');
		$("#txtExpiry").prop("readonly", false);
		$("#batchId").val('0');
		
	} else {
		alertify.success("Batch Already Added");
		$("#txtExpiry").val(result[0].batchExpDate);
		$("#txtExpiry").prop("readonly", true);
	}
}
/**
 * @Code : add new batch
 * @return
 **/


function addNewBatch()
{
	var productId=$("#hiddenProductId").val();
	if(productId!=null && productId!="")
	{	
		if($("#batchId").val()!=null && $("#batchId").val()!='' && $("#batchId").val()!=0)
		{	
			$("#newBatch").append("<input type='text' onkeyup='setBatch(this.value)' onblur='checkBatchAvailability(this.value)'>");
		}
		else
		{
			alertify.error("Select Batch First");
		}
	}
	else
	{
		alertify.error("Select Product First");
	}	
	
}
/**
 * @Code : set batch
 * @return
 **/
function setBatch(value)
{
	$('#txtBatchNo').val(value);
}

function getCorrectionRateBackToList(){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "../../correctionRate/getCorrectionRateBackToList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setListCorrectionBackToList(r, "BackToList");
		}
	});
}

function setListCorrectionBackToList(r){
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='productId"
				+ r[i].productId
				+ "' value='"
				+ r[i].productId
				+ "'></td><td class='col-md-1 center'>"
				+ r[i].productName
				+ "<input type='hidden' id='productNameId"
				+ r[i].productName
				+ "' value='"
				+ r[i].batchCode
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].batchCode
				+ "<input type='hidden' id='batchCodeId"
				
				+ r[i].oldBatchCode
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].oldBatchCode
				+ "<input type='hidden' id='batchCodeIdOld"				
				
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].mrp
				+ "<input type='hidden' id='mrpId"				
				+ r[i].mrp
				
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].purCorMrp
				+ "<input type='hidden' id='mrpIdOld"	
				
				+ "<td class='col-md-1 center'>"
				+ r[i].billRate
				+ "<input type='hidden' id='billRateId"
				+ r[i].billRate
				+ "' value='"
				
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].purBillRate
				+ "<input type='hidden' id='billRateIdOld"
				
				+ r[i].purRate
				+ "'></td>"
				+ "<td class='col-md-1 center'>"
				+ r[i].purRate
				+ "<input type='hidden' id='purRateId"
				
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].oldPurRate
				+ "<input type='hidden' id='purRateIdOld"
				
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].updateDate
				+ "<input type='hidden' id='updateDateId"

								
				/*+ "'></td><td class='col-md-2 center'>"
				+ r[i].productId
				+ ")' value='Edit'> <i class='fa fa-edit'>"*/ +
						"</i> </button> </td> </tr>";
		// CorrectionRateEdit
	}

	$('#divCorrectionRateList').html(divContent);
}

/**
 * @Code : Search Correction Rate
 * @return
 **/
function searchCorrectionRate(id) {
	var inputs = [];
	inputs.push('productId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/correctionRate/searchCorrectionRate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			if (r == "") {
				alert("Record not found!");
			}
			$("#hiddenProductId").val('');
			setListCorrectionBackToList(r);

		}
	});
}

function CorrectionRateEdit(id)
{	
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('productId=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/correctionRate/getDataById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {											
				$("#txtProductName").text(productName);
				$('#f_name').attr('disabled', 'disabled');
				$("#txtUnit").val(unitId);
				$('#m_name').attr('disabled', 'disabled');
				$("#txtPack").text(packType);
				$('#l_name').attr('disabled', 'disabled');
				$("#txtComp").text(r.compName);
				$('#contact1').attr('disabled', 'disabled');
				$("#txtShelf").val(r.contactNo2);
				$("#txtBatchNo").text(r.batchCode);
				$("#txtExpiry").val(r.batchExpDate);
				$("#txtBillRate").val(r.billRate);				
				$("#txtPRate").val(r.purRate);
				$("#txtMrp").val(r.mrp);
				$("#txtClosingStk").val(r.productId);
				
				
	
			}
		});
	}


}

