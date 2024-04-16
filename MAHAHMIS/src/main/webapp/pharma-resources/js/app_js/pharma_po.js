var totalRowCount = 1;
var counts = [];
var Vat=0;
/******
 * @Code       :For Dynamically change the address 
 * ********/
function splitVendorContentPo(content) {
	$('#hiddenVendorId').val(0);	
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId').val(arr[1]);
			
			jQuery.ajax({
				async : true,
				type : "GET",
				data : {
					"vendorId" : arr[1]
				},
				url : "../../pharmacy/vendoraddress/getAllAddressOfVendor",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					
				
					$("#vendorState").empty();
					for ( var i = 0; i < r.length; i++) {
						$("#vendorState").append('<option value="'+ r[i].stateId +'" >'+r[i].state+'</option> ');
						//$('#hiddenState').append('<input type="hidden" id="stateId'+(i + 1)+'" value="'+ r[i][13] +'">');   //$('#stateId' +  (i + 1)).val(r[i][13]);		
						//onclick="changeVendorAdd("'+( r[i][6] )+'" , "'+( r[i][9]) +'")";		
						//$('#stateIdHidden').val(r[i][13]);
						
					}
					
				//	$('#stateIds').val(r[0].stateId);
				    $("#txtAddress").val(r[0].vendorAddress);
				    $("#txtPhone").val(r[0].vendorMobileNumber);
				    $("#vengstNo").val(r[0].gstNo);	
				    
					$("#hiddenVendorAddId").val(arr[1]);
					
				   
				}
			});
			
			
		
		}
	} else {
		$('#hiddenVendorId').val(0);
	}
}

/******
 * @Code       :For Dynamically change the address 
 * ********/
function changeVendorAdd() {

	var searchBox = $('#txtPartyName').val();

	if (searchBox == "" || searchBox == null || searchBox == undefined) {
		return false;
	}
	var stateid = $("#vendorState").val();
	if (stateid == "" || stateid == null || stateid == undefined
			|| isNaN(stateid)) {
		stateid = 0;
	}
	if (stateid > 0) {

		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				"stateid" : stateid
			},
			url : "../../pharmacy/vendoraddress/changeVendorAdd",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				
				for ( var i = 0; i < r.lstvendadd.length; i++) {
					console.log(r.lstvendadd[i].vendorAddressId);
					$("#hiddenVendorAddId").val(r.lstvendadd[i].vendorAddressId);
				//	$('#stateIds').val(r.lstvendadd[i].stateId);

				}

			}
		});
	}
	
}

function splitVendorContentPurchaseOrder(content) {
	
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName1').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId1').val(arr[1]);
		}
	} else {
		$('#hiddenVendorId1').val(0);
	}
}

/******
 * @Code       :split productname-prodId-unit-packing-company
 * ********/
function splitProductContent(content) {

	var rowCount = $('#RowCount').val();
	if (content != "") {
		var arr = content.split("-");
		$('#textProductName' + rowCount).val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenProductId' + rowCount).val(arr[1]);
			$('#textUnit' + rowCount).val(arr[2]);
			$('#textPack' + rowCount).val(arr[3]);
			$('#textComp' + rowCount).val(arr[4]);
			$('#textMRP' + rowCount).val(arr[5]);
			$('#textPurRate' + rowCount).val(arr[6]);
			findLastPurRate(arr[1]);

		}
	} else {
		$('#hiddenVendorId' + rowCount).val(0);
	}
}
/******
 * @Code       :Find Last Purchase Rate
 * ********/
function findLastPurRate(productId) {

	var inputs = [];
	inputs.push('productId=' + productId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/po/getLastPurchaseVendor",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			console.log(r);
			splitLastPurchaseVendorContent(r);
		}
	});

	return true;
}
/******
 * @Code       :split Last Purchase vendor content
 * ********/
function splitLastPurchaseVendorContent(result) {

	if (result != "") {
		for ( var i = 0; i < result.length; i++) {
			var arr = result[i].split("_");
			if (arr.length > 1) {
				$("#textLastPartyName").val(arr[0]);
				$("#textLastQty").val(arr[1]);
				$("#textLastMRP").val(arr[2]);
				var calc = (parseFloat(arr[1]) * parseFloat(arr[3]) );
				$("#textLastTrate").val(calc);

				$("#textLastPurRate").val(arr[3]);
				$("#textLastPurRate1").val(arr[7]);
				
				//if($("#textVat"+$('#hiddenProductId').val()).val()==0 && $("#txtIGST"+$('#hiddenProductId').val()).val()==0 && $("#txtCess"+$('#hiddenProductId').val()).val()==0){
				$("#textVat").val(arr[4]);
				$("#txtIGST").val(arr[5]);
				$("#txtCess").val(arr[6]);
				//}
			}
		}
	} else {
		$("#textLastPartyName").val("");
		$("#textLastQty").val("");
		$("#textLastSchm").val("");
		$("#textLastMRP").val("");
		$("#textLastTrate").val("");
		$("#textLastPurRate").val("");
		$("#textLastPurRate1").val("");
	}
}

/******
 * @Code       :create purchase order div
 * ********/
function toCreatPurchaseOrderDiv(RowCount, currentRowCount) {
    
	var currentRow = currentRowCount;
	if (currentRow == undefined) {
		currentRow = 0;
	}
	var j = 1;

	var rowCount = $('#' + RowCount).val();
	if (rowCount == -1) {
		rowCount = 0;
	}
	if (rowCount == currentRow) {
		totalRowCount++;
		
		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);
		var index = parseInt(rowCount) - 1;

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ rowCount
				+ "</label></td>"
				+ "<td><input type='hidden' name='ltPOslave["
				+ index
				+ "].productMaster.productId' id='hiddenProductId"
				+ rowCount
				+ "' /><input name='ltPOslave["
				+ index
				+ "].productMaster.productName'  type='text'  autocomplete='off' class='form-control input-SmallText' id='textProductName"
				+ rowCount
				+ "' onkeypress='setValuesToAutocomplete(event,"+ rowCount+ ")'  />"
				//data-toggle='modal' data-target='#Product_Information' onclick='loadPopUp("+ rowCount+ ")'
				+ "</td> <td><input name='ltPOslave["
				+ index
				+ "].productMaster.productUnit' type='text' class='form-control input-SmallText' id='textUnit"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td style='display:none;'><input name='shelf' type='text' class='form-control input-SmallText' id='textShelf"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td style='display:none;'><input name='clStk' type='text' class='form-control input-SmallText' id='textClStk"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input name='ltPOslave["
				+ index
				+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='textPack"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> <td><input name='ltPOslave["
				+ index
				+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='textComp"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input name='ltPOslave["
				+ index
				+ "].poSlaveMrp' onchange="+"isFloatingPoint('textMRP"
			    + rowCount
			    + "');"+" type='text' class='form-control input-SmallText'  id='textMRP"
				+ rowCount
				+ "' tabindex='-1'  /></td>"

				+ " <td><input name='ltPOslave["
				+ index
				+ "].poSlaveQty' type='text' class='form-control input-SmallText'  id='textQty"
				+ rowCount
				+ "'   onkeyup='calculateAmt("+ rowCount+")' /></td> "

				+ "<td><input type='text' class='form-control input-SmallText' id='textScm"
				+ rowCount
				+ "' name='ltPOslave["
				+ index
				+ "].poSlaveScheme' value='0' /></td> "

				+ "<td><input name='ltPOslave["
				+ index
				+ "].poSlaveRate' type='text' class='form-control input-SmallText'  id='textPurRate"
				+ rowCount
				+ "'   onkeyup='calculateAmt("+ rowCount+")' /></td> "
				
				+ "<td><input name='ltPOslave["
				+ index
				+ "].hsn' type='text' class='form-control input-SmallText' id='txtHsn"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> "
			

				+ "<td><input type='text' readonly='true' class='form-control input-SmallText' id='textVat"
				+ rowCount
				+ "' tabindex='-1' name='ltPOslave["
				+ index
				+ "].poSlaveVat'></td>"
			
				+ "<td><input name='ltPOslave["
				+ index
				+ "].poIgst' type='text' class='form-control input-SmallText' id='txtIgst"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> "
				
				+ "<td><input name='ltPOslave["
				+ index
				+ "].poCess' type='text' class='form-control input-SmallText' id='txtCess"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> "

				
				+ "<td><input type='text' readonly='true' class='form-control input-SmallText' id='textAmount"
				+ rowCount
				+ "' tabindex='-1' name='ltPOslave["
				+ index
				+ "].poSlaveAmt'></td>"
				
			
				+ "<td><input type='checkbox' name='deleteGroup' value='"
	            + (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td></tr>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#textProductName' + rowCount).focus();
		fillRow(currentRowCount);
		//calculateAmt(currentRowCount);
		
		
	} 
	else 
	{	
		fillRow(currentRowCount);
		//calculateAmt(currentRowCount);
	
		
	}
}
/******
 * @Code       : calculate total vat
 * ********/
function TotalVat()
{
	var rowCount=$('#RowCount').val();
	var vat = 0;
	var amount = 0;
	var purchaseRate=0;
	var vatamt=0;
	var total=parseFloat($('#txtTotal').val());
	
	for(var i=1;i<rowCount;i++)
	{
		vat = 0;
		purchaseRate=0;
		vatamt=0;
		
		if ($("#hiddenProductId" + i) != null
				&& $('#hiddenProductId' + i).val() != "") {
		
		if ($('#textAmount' +i).val() != '' && $('#textAmount' +i).val() > 0)
		purchaseRate = parseFloat($('#textAmount' +i).val());
	
		if ($('#textVat' + i).val() != '' && $('#textVat' +i).val() > 0)
		vat=parseFloat(($('#textVat' + i).val())/100);
		
		if ($('#txtIgst' + i).val() != '' && $('#txtIgst' +i).val() > 0)
			vat=parseFloat(($('#txtIgst' + i).val())/100);
		
		if ($('#txtCess' + i).val() != '' && $('#txtCess' +i).val() > 0)
			vat=parseFloat(($('#txtCess' + i).val())/100);
		
		vatamt=(parseFloat(vat) * parseFloat(purchaseRate));
		amount = amount+vatamt;
		
		/*	total=parseFloat($('#txtTotal').val());*/
	/*	$('#txtTotal').val((parseFloat(total)+parseFloat(vatamt)).toFixed(2));*/
		}	
	}
	$('#textVatTotal').val((amount).toFixed(2));
	var netAmount=(parseFloat(total)+parseFloat(amount)).toFixed(2);
	$('#textNetTotal').val(Math.round(netAmount));
}

/******
 * @Code       :fill row
 * ********/

function fillRow(rCount) {
	var rowCount = parseInt(rCount);
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#textComp' + rowCount).val($('#txtComp').val());
	var mrp = $('#txtMrp').val();
	if (mrp == "null") {
		$('#textMRP' + rowCount).val(0);
	} else {
		$('#textMRP' + rowCount).val($('#txtMrp').val());
	}
	$('#textQty' + rowCount).val($('#txtQty').val());
	$('#textPurRate' + rowCount).val($('#txtPurRate').val());
	$('#textShelf' + rowCount).val($('#txtShelf').val());
	$('#textClStk' + rowCount).val($('#txtClStk').val());
	$('#textScm' + rowCount).val($('#txtScheme').val());
	$('#textVat' + rowCount).val($('#textVat').val());
	
	var finalamt = (parseFloat($('#txtPurchaseRate').val())
				* parseFloat($('#txtQty').val())).toFixed(2);
	
	if (finalamt == "" || finalamt == null || finalamt == undefined || isNaN(finalamt)) {
		finalamt = 0;
	}
	$('#textAmount' + rowCount).val(finalamt);
	$('#textMRP' + rowCount).focus();
}
/******
 * @Code       :reset all values
 * ********/
function resetAllPopUpValues() {
	$('#Po_Pop_Up').find('input:text').val('');
	$('#Po_Pop_Up').find('input:hidden').val('');
	$('#txtPartyName1').val('');
}
/******
 * @Code       :delete po
 * ********/
function deletePO(purchaseOrderId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	var poId = parseInt(purchaseOrderId);
	
		var inputs = [];
		inputs.push('poId=' + poId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/po/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getPOList();
						if (r == true) {
							/*$('#msgDiv')
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
/******
 * @Code       :get po list
 * ********/
function getPOList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/po/PoList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setTableContent(r);
		}
	});

	return true;
}
/******
 * @Code       :get next auto increment
 * ********/
function getNextAutoIncrement() {
	
	var inputs = [];
	

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/po/getNextAutoIncrement",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) 
		{
			$("#txtOrderNo1").val(r);
		
		}
	});

	return true;
}


/******
 * @Code       :search po
 * ********/
function searchPurchaseOrder(id) {
	resetAllPopUpValues();
	var inputs = [];
	inputs.push('vendorId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/po/getPObyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r =="") {
				alert("Data not found!");
				$('#txtPartyName').val('');
			}
			$("#hiddenVendorId1").val('');
			setTableContent(r);
		

		}
	});

	return true;
}
/******
 * @Code       :calculate total amount row
 * ********/
function calculateAmt(rowCount) 
{
	var flag = 0;
	counts.push(rowCount);
	var i = 0;

	if ($('#txtCount').val() != "" && $('#hiddenProductId' + rowCount).val() != "") {
		while (i++ < counts.length - 1) {
			if (rowCount == counts[i]) {
				flag = 1;
				break;
			}
		}
	}
		
	if (flag == 0 && $('#hiddenProductId' + rowCount).val() != "" && $('#txtCount').val()<rowCount) 
	{
		
		var prodCount = parseInt($('#txtCount').val());
		$('#txtCount').val(prodCount + 1);
	
	} else {
		$('#txtCount').val(1);
	}

	var qty = parseInt($('#textQty' + rowCount).val());
	var purRate = parseFloat($('#textPurRate' + rowCount).val());
	$('#textAmount' + rowCount).val((qty * purRate));

	if ($('#txtTotal').val() != "") {
		var i = 1;
		var finalAmt = 0;
		
		while (i < totalRowCount) {

			finalAmt = parseInt(finalAmt)
					+ parseInt($('#textAmount' + i).val());
			i++;

		}
		$('#txtTotal').val((finalAmt).toFixed(2));

	} else {
		$('#txtTotal').val(0);
		var finalAmt = parseInt($('#txtTotal').val());
		$('#txtTotal').val((finalAmt + (qty * purRate)).toFixed(2));
	}
	calculateTotalAmount();
	TotalVat();
	/*calculateNetAmount();*/
}
/******
 * @Code       :calculate total amount
 * ********/
function calculateTotalAmount() {
	var total = 0;
	var i;
	
	for (i = 1; i < $('#RowCount').val(); i++) {
		if ($('#textAmount' + i).val() >= 1) {
			total = parseFloat(total) + parseFloat($('#textAmount' + i).val());
		}

	}

	$('#txtTotal').val((total).toFixed(2));
	
	
}

/******
 * @Code       : get formatted date dd/mm/yyyy
 * ********/
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
/******
 * @Code       : set list content
 * ********/
function setTableContent(result) {
	var r = result;

	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var poDate = getDate(r[i].poDate);
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='poId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].poId
				+ "<input type='hidden' id='poId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poId
				+ "'></td><td Style=display:none class='col-md-2 center'>"
				+ r[i].poDeleteFlag
				+ "<input type='hidden' id='invoiceId"
				+ r[i].poId
				+ "' value='"
				+ r[i].invoice_id
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].podocId
				+ "<input type='hidden' id='podocId"
				+ r[i].poId
				+ "' value='"
				+ r[i].podocId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].vendor_name
				+ "<input type='hidden' id='poVendorName"
				+ r[i].poId
				+ "' value='"
				+ r[i].vendor_name
				+ "'></td><td class='col-md-2 center'>"
				+ poDate
				+ "<input type='hidden' id='poDate"
				+ r[i].poId
				+ "' value='"
				+ poDate
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].poProductCount
				+ "<input type='hidden' id='ProductCount"
				+ +r[i].poId
				+ "'value='"
				+ r[i].poProductCount
				+ "'>"
				+ "</td><td class='col-md-2 center'>"
				+ r[i].poStatus
				+ "<input type='hidden' id='poStatus"
				+ +r[i].poId
				+ "'value='"
				+ r[i].poStatus
				+ "'>"
				+ "</td><td style='display: none' id='vendorId'>"
				+ r[i].vendor_id
				+ "<input type='hidden' id='povendorId"
				+ +r[i].poId
				+ "'value='"
				+ r[i].vendor_id
				+ "'>"
				+ "<td class='col-md-2 center'><a id='btnPrint"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success'  onclick='purchaseOrderPrint("
			    + r[i].poId
			    + ")'> <i class='fa fa-print'></i> </a></td>";
		
		if(r[i].poStatus=="pending"){
				
			divContent=divContent+ "<td class='col-md-2 center'> <a id='btnEdit"
			+ r[i].poId
			+ "' class='btn btn-xs btn-success' value='EDIT' href='../../pharmacy/po/edit-view?poId="
			+ r[i].poId
			+ "'>"
			+ "<i class='fa fa-edit'></i> </a></td>";
		}
		else{divContent=divContent
				+ "<td class='col-md-2 center'> <a id='btnEdit"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success' value='EDIT' disabled='true' href='../../pharmacy/po/edit-view?poId="
				+ r[i].poId
				+ "'>"
				+ "<i class='fa fa-edit'></i> </a></td>";
		}

		divContent=divContent	+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePO("
				+ r[i].poId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divProductOrderList').html(divContent);
}
/******
 * @Code       : delete row
 * ********/
function deleteRow() {
	/*var result= $("input[name='deleteGroup']:checked").val();*/

	/*$("#remove"+result).hide();*/
	
	if(confirm("Are you confirm to delete selected row"))
		{
	var favorite = [];

	$.each($("input[name='deleteGroup']:checked"), function() {
		favorite.push($(this).val());

	});
	var length=favorite.length;
	if(($('#txtCount').val())!=0)
	/*$('#txtCount').val(($('#txtCount').val())-length);*/
	
	if (favorite.length == 0) {
		alert("Please select checkbox to delete");
		return;
	}
	
	for ( var i = 0; i < favorite.length; i++) {

		if ($("#hiddenProductId" + favorite[i]) != null
				&& $('#hiddenProductId' + favorite[i]).val() != "") {
			
			$("#deleteGroup" + favorite[i]).prop("checked", false);
			$('#txtCount').val(($('#txtCount').val())-1);
			$("#hiddenProductId" + favorite[i]).val("");
			$("#remove" + favorite[i]).hide();
			
			var totVat=0,amt=0.0,g1=0.0,g2=0.0,g3=0.0;
			amt=parseFloat($('#textAmount' + favorite[i]).val())/100;
			g1=$("#textVat" + favorite[i]).val();
			g2=$("#txtIgst" + favorite[i]).val();
			g3=$("#txtCess" + favorite[i]).val();
			totVat=parseFloat($('#textVatTotal').val());
			totVat=totVat-(amt * (parseFloat(g1)+parseFloat(g2)+parseFloat(g3)));
			if(totVat<0)
				totVat=0;
			$('#textVatTotal').val(totVat.toFixed(2));
			
			var totNet=0;
			totNet=$('#txtTotal').val()-$("#textAmount" + favorite[i]).val();
			if(totNet<0)
				totNet=0;
			$('#txtTotal').val(totNet.toFixed(2));
			
			$('#textNetTotal').val(+$('#textVatTotal').val() + +$('#txtTotal').val());
			
			$("#textAmount" + favorite[i]).val("");
			$("#textVat" + favorite[i]).val("");
			$("#txtIgst" + favorite[i]).val("");
			$("#txtCess" + favorite[i]).val("");
			
		} else {
			alert("Can not delete empty row");
			$("#deleteGroup" + favorite[i]).prop("checked", false);
		}
	}
}
}
/******
 * @Code       : split last purchase content of po
 * ********/
function splitLastPurchaseContentForPo(content) {
	
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
/******
 * @Code       : purchase order print
 * ********/
function purchaseOrderPrint(purchaseOrderId) 
{
	  window.open("../../pharmacy/po/printView?poId="+purchaseOrderId+"");
	
}

