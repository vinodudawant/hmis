function resetProductValues(reset) {
	$('#productMaster').find('input:text').val('');
	$('#productMaster').find('input:hidden').val('');
	$('#productMaster').find('select').val('');
	if(reset=='reset')
	{
	$('#productMaster').find('input:radio').prop('checked', false);
	$('#searchBox').val('');
	}
}


function setCom()
{
	if ($('#txtCompany1').val()!=null && $('#txtCompany1').val()!='')
		{
	$('#txtCompany').val(0);
		}
}

function setPreparation()
{
	if ($('#txtPreparation1').val()!=null && $('#txtPreparation1').val()!='')
		{
	$('#txtPreparation').val(0);
		}
}

function setStrength()
{

	if ($('#txtStrength1').val()!=null && $('#txtStrength1').val()!='')
		{
	$('#txtStrength').val(0);
		}
}

function splitPreparationContent(content)
{
	if (content != "") {
		var arr = content.split("-");
		$('#txtPreparation1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtPreparation').val(arr[1]);
		}
	} else {
		$('#txtPreparation').val(0);
	}


}

function splitStrengthContent(content)
{
	if (content != "") {
		var arr = content.split("-");
		$('#txtStrength1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtStrength').val(arr[1]);
		}
	} else {
		$('#txtStrength').val(0);
	}


}


function splitCompanyContent(content) {
		
	if (content != "") {
		var arr = content.split("-");
		$('#txtCompany1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtCompany').val(arr[1]);
			$('#txtCompany2').val(arr[2]);
			
		}
	} else {
		$('#txtCompany').val(0);
	}
}
function setPack()
{
	
	if ($('#txtPacking1').val()!=null && $('#txtPacking1').val()!='')
		{
			$('#txtPacking').val(0);
		}
}
/**
 * @Code : split and set result packing autosuggestion 
 * @return
 **/
function splitPacking(content) {
	
	if (content != "") {
		var arr = content.split("-");
		$('#txtPacking1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtPacking').val(arr[1]);
		}
	} else {
		$('#txtPacking').val(0);
	}
}
function setCat()
{
	if ($('#txtCategory1').val()!=null && $('#txtCategory1').val()!='')
		{
	$('#txtCategory').val(0);
		}
}
/**
 * @Code : split and set result category autosuggestion 
 * @return
 **/
function splitCategory(content) {

	if (content != "") {
		var arr = content.split("-");
		$('#txtCategory1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtCategory').val(arr[1]);
		}
	} else {
		$('#txtCategory').val(0);
	}
}
function setUom()
{
	if ($('#txtUOM1').val()!=null && $('#txtUOM1').val()!='')
		{
	$('#txtUOM').val(0);
		}
}
function splitUOMContent(content) {
	
	if (content != "") {
		var arr = content.split("$$");
		$('#txtUOM1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtUOM').val(arr[1]);
		}
	} else {
		$('#txtUOM').val(0);
	}
}
function setDrg()
{
	if ($('#txtDrug1').val()!=null && $('#txtDrug1').val()!='')
		{
	$('#txtDrug').val(0);
		}
}

function splitIngredientContent(content) {
	if (content != "") {
		var arr = content.split("$$");
		$('#txtDrug1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtDrug').val(arr[1]);
		}
	} else {
		$('#txtDrug').val(0);
	}
}

function setShlef()
{
	if ($('#txtShelf1').val()!=null && $('#txtShelf1').val()!='')
		{
	$('#txtShelf').val(0);
		}
}
/**
 * @Code : split and set result shelf autosuggestion 
 * @return
 **/
function splitShelf(content) {
	
	if (content != "") {
		var arr = content.split("$$");
		$('#txtShelf1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtShelf').val(arr[1]);
		}
	} else {
		$('#txtShelf').val(0);
	}
}

function editProduct(productId) {
	showProductMasterDiv();
	$('#txtProductId').val($('#productId' + productId).val());
	$('#txtProduct').val($('#productName' + productId).val());
	$('#txtShortName').val($('#productShortName' + productId).val());
	
    $('#txtPreparation').val($('#productPreparationId'+productId).val());
	$('#txtStrength').val($('#productStrengthId'+productId).val());
	
	$('#txtCompany').val($('#productCompanyId' + productId).val());

	$('#txtPacking').val($('#productPackId' + productId).val());

	$('#txtCategory').val($('#productCategoryId' + productId).val());

	$('#txtUOM').val($('#productUomId' + productId).val());

	$('#txtDrug').val($('#productIngredientId' + productId).val());
	
	$('#hsnMaster').val($('#hsnNumber' + productId).val());
	$('#taxMaster').val($('#gstNumber' + productId).val());
	var cathlapFlag=$('#cathLabFlag' + productId).val();
	
	// added by dayanand 
	
	if ($('#nutracalProduct' + productId).val() == '0') {
		$('#radioNutracalNo').prop('checked', true);
		$('#nutracalProduct' + productId).val('0');
		
	} else {
		$('#radioNutracalYes').prop('checked', true);
		$('#nutracalProduct' + productId).val('1');
	}
	// end
	
	
	$('#radioRateWithMrpNo').val('0');
	$('#radioRateWithMrpYes').val('1');
	
	$('#radioH1No').val('0');
	$('#radioH1Yes').val('1');

	$('#radioNrxNo').val('0');
	$('#radioNrxYes').val('1');
		
	$('#radioSchXNo').val('0');
	$('#radioSchXYes').val('1');
	
	$('#radioSchNdpsNo').val('0');
	$('#radioSchNdpsYes').val('1');
		
	$('#radioShortListNo').val('0');
	$('#radioShortListYes').val('1');
	
	$('#radioSaleNo').val('0');
	$('#radioSaleYes').val('1');
	
	$('#radioProductWithPrescription').val('0');
	$('#radioProductWithoutPrescription').val('1');
	
	$('radioSCHX').val($('#productNewX' + productId).val());
	$('radioSCHNdps').val($('#productNewNdps' + productId).val());
	
	$('#txtShelf').val($('#productShelfId' + productId).val());
	$('#txtCompany1').val($('#productCompanyName' + productId).val());
	
	$('#txtPreparation1').val($('#productPreparationName'+productId).val());
	$('#txtStrength1').val($('#productStrengthName'+productId).val());
	
	$('#txtPacking1').val($('#productPackType' + productId).val());
	$('#txtCategory1').val($('#productCategoryName' + productId).val());
	$('#txtUOM1').val($('#productUomName' + productId).val());
	$('#txtUnit').val($('#productUnit' + productId).val());
	$('#txtDrug1').val($('#productIngredientContent' + productId).val());
	$('#txtShelf1').val($('#productShelfName' + productId).val());
	
	if (($('#productMinLevel' + productId).val()) != "null" && ($('#productMinLevel' + productId).val()) != null  && $('#productMinLevel' + productId).val()!="") 
	{
	$('#txtMinimumLvl').val($('#productMinLevel' + productId).val());
	}
	if (($('#productMaxLevel' + productId).val()) != "null" && ($('#productMaxLevel' + productId).val()) != null && $('#productMaxLevel' + productId).val()!="")
	{
	$('#txtMaximumLvl').val($('#productMaxLevel' + productId).val());
	}
	if (($('#productDesc' + productId).val()) != "null" && ($('#productDesc' + productId).val()) != null && $('#productDesc' + productId).val()!="")   
	{
	$('#txtDescription').val($('#productDesc' + productId).val());
	}
	
	if (cathlapFlag == '1' || cathlapFlag == 1) {
		$('#cathlapFlagYes').prop('checked', 'checked');
		$('#cathlapFlagNo').prop('value', 1);
	} else {
		$('#cathlapFlagNo').prop('value', 0);
	}
	
	changeCathFlag();
	
	if ($('#productShortList' + productId).val() == '1') {
		$('#radioShortListYes').prop('checked', true);
	} else {
		$('#radioShortListNo').prop('checked', true);
	}

	if ($('#productSaleDisc' + productId).val() == '1') {
		$('#radioSaleYes').prop('checked', true);
	} else {
		$('#radioSaleNo').prop('checked', true);
	}

	if ($('#productBillingMust' + productId).val() == '1') {
		$('#radioBillingYes').prop('checked', true);
	} else {
		$('#radioBillingNo').prop('checked', true);
	}

	if ($('#productH1' + productId).val() == '1') {
		$('#radioH1Yes').prop('checked', true);
	} else {
		$('#radioH1No').prop('checked', true);
	}
	
	if ($('#productNrx' + productId).val() == '1') {
		$('#radioNrxYes').prop('checked', true);
	} else {
		$('#radioNrxNo').prop('checked', true);
	}
	
	if ($('#productNewX' + productId).val() == '1') {
		$('#radioSchXYes').prop('checked', true);
		
		
	} else {
		$('#radioSchXNo').prop('checked', true);
	}
	
	if ($('#productNewNdps' + productId).val() == '1') {
		$('#radioSchNdpsYes').prop('checked', true);
		
	} else {
		
		$('#radioSchNdpsNo').prop('checked', true);
	}

	if ($('#productBatch' + productId).val() == '1') {
		$('#radioBatchYes').prop('checked', true);
	} else {
		$('#radioBatchNo').prop('checked', true);
	}
  
	if($('#rateEqualMrp' + productId).val() == '1')
		{
		$('#radioRateWithMrpYes').prop('checked', true);
		$('#radioRateWithMrpYes' + productId).val('1');
		}
	else
		{
		$('#radioRateWithMrpNo').prop('checked', true);
		$('#radioRateWithMrpNo' + productId).val('0');
		}
	if($('#productPrescriptionData' + productId).val() == '1')
	{
	$('#radioProductWithoutPrescription').prop('checked', true);
	$('#radioProductWithoutPrescription' + productId).val('1');
	}
else
	{
	$('#radioProductWithPrescription').prop('checked', true);
	$('#radioProductWithPrescription' + productId).val('0');
	}

	var taxCount = parseInt($('#hiddenTaxCount' + productId).val());
	//var taxCount1 = parseInt($('#hiddenTaxCount1' + productId).val());

	deSelectOptions('selectTax');

	var n = 1;
	
		var taxIdVal = '#productTax' + productId + '' + n++;
		$("#selectTax option[value='" + $(taxIdVal).val() + "']").attr({
			"selected" : "selected"
		});
		
		var taxIdVal = '#productTax' + productId + '' + n;
		$("#selectTax1 option[value='" + $(taxIdVal).val() + "']").attr({
			"selected" : "selected"
		});
		
		
	
	var vendorCount = parseInt($('#hiddenVendorCount' + productId).val());
	var n1 = 1;
	deSelectOptions('selectVendor');
	while (n1 <= vendorCount) {
		var vendorIdVal = '#productVendor' + productId + '' + n1;
		$("#selectVendor option[value='" + $(vendorIdVal).val() + "']").attr({
			"selected" : "selected"
		});
		n1++;
	}
	if (($('#productMarginRate' + productId).val()) != "null" && ($('#productMarginRate' + productId).val()) != null && $('#productMarginRate' + productId).val()!="")
		{
	$('#txtMarginRate').val($('#productMarginRate' + productId).val());
		}
	
	if (($('#productFixDiscount' + productId).val()) != "null" && ($('#productFixDiscount' + productId).val()) != null && $('#productFixDiscount' + productId).val()!="")
	{
	$('#txtDiscount').val($('#productFixDiscount' + productId).val());
	}
	
	if (($('#productScheme1' + productId).val()) != "null" && ($('#productScheme1' + productId).val()) != null && $('#productScheme1' + productId).val()!="")
	{
	$('#txtSchmQty1-1').val($('#productScheme1' + productId).val());
	}
	
	if (($('#productScheme1Qty' + productId).val()) != "null" && ($('#productScheme1Qty' + productId).val()) != null && $('#productScheme1Qty' + productId).val()!="")
	{
	$('#txtSchmQty1-2').val($('#productScheme1Qty' + productId).val());
	}
	
	if (($('#productScheme2' + productId).val()) != "null" && ($('#productScheme2' + productId).val()) != null && $('#productScheme2' + productId).val()!="")
	{
	$('#txtSchmQty2-1').val($('#productScheme2' + productId).val());
	}
	
	if (($('#productScheme2Qty' + productId).val()) != "null" && ($('#productScheme2Qty' + productId).val()) != null && $('#productScheme2Qty' + productId).val()!="")
	{
	$('#txtSchmQty2-2').val($('#productScheme2Qty' + productId).val());
	}
	
	if (($('#productScheme3' + productId).val()) != "null" && ($('#productScheme3' + productId).val()) != null && $('#productScheme3' + productId).val()!="")
	{
	$('#txtSchmQty3-1').val($('#productScheme3' + productId).val());
	}
	
	if (($('#productScheme3Qty' + productId).val()) != "null" && ($('#productScheme3Qty' + productId).val()) != null && $('#productScheme3Qty' + productId).val()!="")
	{
	$('#txtSchmQty3-2').val($('#productScheme3Qty' + productId).val());
	}

	$('#txtPhoto').val($('#productPhotoUrl' + productId).val());

	$('radioSale').val($('#productSaleDisc' + productId).val());
	$('radioBilling').val($('#productBillingMust' + productId).val());
	$('radioH1').val($('#productH1' + productId).val());
	$('radioNrx').val($('#productNrx' + productId).val());
	$('radioSCHX').val($('#productNewX' + productId).val());
	$('radioSCHNdps').val($('#productNewNdps' + productId).val());
	$('radioBatch').val($('#productBatch' + productId).val());
	
	$('#txtCreatedBy').val($('#txtCreatedBy'+productId).val());
	$('#txtProductIp').val($('#txtProductIp'+productId).val());
	$('radioPrescription').val($('#productPrescriptionData' + productId).val());

}

function deSelectOptions(selectBox) {
	var elements = document.getElementById(selectBox).options;
	for ( var i = 0; i < elements.length; i++) {
		elements[i].selected = false;
	}
}

function deleteProduct(productId) {

	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('productId=' + productId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						if (r == true) {
							/*location.reload(true);
							$('#msgDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
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

function searchProduct(productId) {
	resetProductValues('reset');

	var inputs = [];
	inputs.push('productId=' + productId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "getProductById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r=="")
			{
			alert("Record not found!");
			}
			$("#hiddenId").val('');
			console.log(r);
			setTableContent(r);
		}
	});
}

function hideProductMasterDiv() {
	$("#productlist1").show();
	$("#isviewListOfProduct").val("YES");
	$("#productMaster").hide(1000);
	$("#productList").css({
		'height' : '500px',
		'width' : '100%',
		'overflow-y' : 'scroll',
		'max-height' : 'auto',
		'margin-left' : '2%',
		' margin-top' : '-9%'
	});

}

function showProductMasterDiv() {
	resetProductValues();
	$("#productMaster").show(1000);
	$("#isviewListOfProduct").val("NO");
	$("#productlist1").hide();
	/*
	 * $('#productList').attr('style','height:220px','width: 100%','overflow-y:
	 * scroll','max-height: auto','margin-left: 2%',' margin-top: -9%');
	 */
}

function splitContent(content) {

	if (content != "") {
		var arr = content.split("$$");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + " <tr> <td class='col-md-1 center'>"
				+ (i + 1) + " <input type='hidden' id='productId"
				+ r[i].productId + "' value='" + r[i].productId + "'></td> "

				+ "<td class='col-md-2 center'>" + r[i].productName
				+ "<input type='hidden' id='productName" + r[i].productId
				+ "' value='" + r[i].productName + "'></td>"

				+ "<td class='col-md-2 center'>" + r[i].companyMaster.compName
				+ "<input type='hidden' id='productCompanyId" + r[i].productId
				+ "' value='" + r[i].companyMaster.compId + "'>"
				+ "<input type='hidden' id='productCompanyName"
				+ r[i].productId + "' value='" + r[i].companyMaster.compName
				+ "'>" + "</td>"

				+ "<td class='col-md-2 center'>" + r[i].packingMaster.packType
				+ "<input type='hidden' id='productPackId" + r[i].productId
				+ "' value='" + r[i].packingMaster.packId + "'>"
				+ "<input type='hidden' id='productPackType" + r[i].productId
				+ "' value='" + r[i].packingMaster.packType + "'>" + "</td>"

				+ "<td class='col-md-2 center'>" + r[i].categoryMaster.catName
				+ "<input type='hidden' id='productCategoryId" + r[i].productId
				+ "' value='" + r[i].categoryMaster.catId + "'>"
				+ "<input type='hidden' id='productCategoryName"
				+ r[i].productId + "' value='" + r[i].categoryMaster.catName
				+ "'>" + "</td>"

				+ "<td class='col-md-2 center'>" + r[i].uomMaster.uomName
				+ "<input type='hidden' id='productUomId" + r[i].productId
				+ "' value='" + r[i].uomMaster.uomId + "'>"
				+ "<input type='hidden' id='productUomName" + r[i].productId
				+ "' value='" + r[i].uomMaster.uomName + "'>" + "</td>";

		var taxCount = 0;
		/*for ( var j = 0; j < r[i].taxMaster.length; j++) {
			divContent = divContent + r[i].taxMaster[j].taxName
					+ "<input type='hidden' id='productTax" + r[i].productId
					+ "" + (j + 1) + "' value='" + r[i].taxMaster[j].taxId
					+ "'>";
			taxCount = j + 1;
		}*/
		
		var taxCount1 = 0;
		/*for ( var k = 0; k < r[i].taxMaster.length; k++) {
			divContent = divContent + r[i].taxMaster[k].taxName
					+ "<input type='hidden' id='productTax" + r[i].productId
					+ "" + (k + 1) + "' value='" + r[i].taxMaster[k].taxId
					+ "'>";
			taxCount1 = k + 1;
		}*/

		divContent = divContent + "<input type='hidden' id='hiddenTaxCount"
				+ r[i].productId + "' value='" + taxCount + "'>"
				
				+ "<td class='col-md-2 center'>" + r[i].drugMaster.drugName
				+ "<input type='hidden' id='productIngredientId"
				+ r[i].productId + "' value='" + r[i].drugMaster.drugId + "'>"
				+ "<input type='hidden' id='productIngredientContent"
				+ r[i].productId + "' value='" + r[i].drugMaster.drugName
				+ "'>" + "</td>"

				+ "<td class='col-md-2 center'>" + r[i].shelfMaster.shelfName
				+ "<input type='hidden' id='productShelfId" + r[i].productId
				+ "' value='" + r[i].shelfMaster.shelfId + "'>"
				+ "<input type='hidden' id='productShelfName" + r[i].productId
				+ "' value='" + r[i].shelfMaster.shelfName + "'>" + "</td>"

				+ "<td class='col-md-2 center'>" + r[i].productUnit
				+ "<input type='hidden' id='productUnit" + r[i].productId
				+ "' value='" + r[i].productUnit + "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productShortName
				+ "<input type='hidden' id='productShortName" + r[i].productId
				+ "' value='" + r[i].productShortName + "'></td>"

				+ "<td class='col-md-2 center'>";
		var vendorCount = 0;
		for ( var k = 0; k < r[i].vendorMasters.length; k++) {
			divContent = divContent + r[i].vendorMasters[k].vendorName
					+ "<input type='hidden' id='productVendor" + r[i].productId
					+ "" + (k + 1) + "' value='"
					+ r[i].vendorMasters[k].vendorId + "'>";
			vendorCount = k + 1;
		}
		divContent = divContent + "<td class='col-md-2 center'>" + r[i].preparationMaster.preparationName
		+ "<input type='hidden' id='productPreparationId" + r[i].productId
		+ "' value='" + r[i].preparationMaster.preparationId+ "'>"
		+ "<input type='hidden' id='productPreparationName" + r[i].productId
		+ "' value='" + r[i].preparationMaster.preparationName + "'>" + "</td>"
		
		divContent = divContent + "<td class='col-md-2 center'>" + r[i].strengthMaster.strengthName
		+ "<input type='hidden' id='productStrengthId" + r[i].productId
		+ "' value='" + r[i].strengthMaster.strengthId+ "'>"
		+ "<input type='hidden' id='productStrengthName" + r[i].productId
		+ "' value='" + r[i].strengthMaster.strengthName + "'>" + "</td>";
		
		divContent = divContent
				+ "<input type='hidden' id='hiddenVendorCount"
				+ r[i].productId
				+ "' value='"
				+ vendorCount
				+ "'>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productShortList
				+ "<input type='hidden' id='productShortList"
				+ r[i].productId
				+ "' value='"
				+ r[i].productShortList
				+ "'></td>"
							
				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productSaleDisc
				+ "<input type='hidden' id='productSaleDisc"
				+ r[i].productId
				+ "' value='"
				+ r[i].productSaleDisc
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productBillingMust
				+ "<input type='hidden' id='productBillingMust"
				+ r[i].productId
				+ "' value='"
				+ r[i].productBillingMust
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productH1
				+ "<input type='hidden' id='productH1"
				+ r[i].productId
				+ "' value='"
				+ r[i].productH1
				+ "'></td>"
				
				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productPrescription
				+ "<input type='hidden' id='productPrescriptionData"
				+ r[i].productId
				+ "' value='"
				+ r[i].productPrescription
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productNrx
				+ "<input type='hidden' id='productNrx"
				+ r[i].productId
				+ "' value='"
				+ r[i].productNrx
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productBatch
				+ "<input type='hidden' id='productBatch"
				+ r[i].productId
				+ "' value='"
				+ r[i].productBatch
				+ "'></td>"
				
				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productX
				+ "<input type='hidden' id='productNewX"
				+ r[i].productId
				+ "' value='"
				+ r[i].productX
				+ "'></td>"
				
				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productNdps
				+ "<input type='hidden' id='productNewNdps"
				+ r[i].productId
				+ "' value='"
				+ r[i].productNdps
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productMinLevel
				+ "<input type='hidden' id='productMinLevel"
				+ r[i].productId
				+ "' value='"
				+ r[i].productMinLevel
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productMaxLevel
				+ "<input type='hidden' id='productMaxLevel"
				+ r[i].productId
				+ "' value='"
				+ r[i].productMaxLevel
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productDesc
				+ "<input type='hidden' id='productDesc"
				+ r[i].productId
				+ "' value='"
				+ r[i].productDesc
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productPhotoUrl
				+ "<input type='hidden' id='productPhotoUrl"
				+ r[i].productId
				+ "' value='"
				+ r[i].productPhotoUrl
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productMarginRate
				+ "<input type='hidden' id='productMarginRate"
				+ r[i].productId
				+ "' value='"
				+ r[i].productMarginRate
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productFixDiscount
				+ "<input type='hidden' id='productFixDiscount"
				+ r[i].productId
				+ "' value='"
				+ r[i].productFixDiscount
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productScheme1
				+ "<input type='hidden' id='productScheme1"
				+ r[i].productId
				+ "' value='"
				+ r[i].productScheme1
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productScheme1Qty
				+ "<input type='hidden' id='productScheme1Qty"
				+ r[i].productId
				+ "' value='"
				+ r[i].productScheme1Qty
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productScheme2
				+ "<input type='hidden' id='productScheme2"
				+ r[i].productId
				+ "' value='"
				+ r[i].productScheme2
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productScheme2Qty
				+ "<input type='hidden' id='productScheme2Qty"
				+ r[i].productId
				+ "' value='"
				+ r[i].productScheme2Qty
				+ "'></td>"
                	
				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].rateEqualsMrp
				+ "<input type='hidden' id='rateEqualMrp"
				+ r[i].productId
				+ "' value='"
				+ r[i].rateEqualsMrp
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productScheme3
				+ "<input type='hidden' id='productScheme3"
				+ r[i].productId
				+ "' value='"
				+ r[i].productScheme3
				+ "'></td>"

				+ "<td class='col-md-2 center' style='display:none;'>"
				+ r[i].productScheme3Qty
				+ "<input type='hidden' id='productScheme3Qty"
				+ r[i].productId
				+ "' value='"
				+ r[i].productScheme3Qty
				+ "'>" 
				
				+ "<input type='hidden' id='hsnNumber"
				+ r[i].productId
				+ "' value='"
				+ r[i].hsn
				+ "'>"
				
				+ "<input type='hidden' id='cathLabFlag"
				+ r[i].productId
				+ "' value='"
				+ r[i].cathlabFlag
				+ "'>" 
				
				+ "<input type='hidden' id='gstNumber"
				+ r[i].productId
				+ "' value='"
				+ r[i].taxMaster.taxId
				+ "'>"
				
				+ "<input type='hidden' id='nutracalProduct"
				+ r[i].productId
				+ "' value='"
				+ r[i].nutracalProduct
				+ "'>"
				
				+"</td>"
				
				

				+ "<td class='col-md-1 center'> <button id='btnEdit"
				+ r[i].productId
				+ "' class='btn btn-xs btn-success' onclick='editProduct("
				+ r[i].productId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteProduct("
				+ r[i].productId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divProductList').html(divContent);
}

function changeCathFlag(){
	if($("#cathlapFlagYes").prop("checked")==true){
		$("#cathlapFlagYes").val(1);
	}
	else{
		$("#cathlapFlagYes").val(0);
	}
	
}

function setNuracalvalue(nVal){
	$("#nutracalProduct").val(nVal);
}
