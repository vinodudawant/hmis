var totalRowCount = 1;
var counts = [];
var totalAmount = 0;

setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function splitVendorContents(content) {
	$('#hiddenVendorId').val(0);
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId').val(arr[1]);
			$('#txtAddress').val(arr[2]);
			$('#txtPhone').val(arr[3]);
		
				$('#NewPartywisePoDiv').hide();
				$('#PartywisePoDiv').show();
				displayPartywisePoRecords(arr[1], '0');
		
		}
	} else {
		$('#hiddenVendorId').val(0);
	}
}
function splitVendorData(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId').val(arr[1]);
		}
	} else {
		$('#hiddenVendorId').val(0);
	}
}

function changeFocus() {
	$("#txtPartyName").focus();
	if (document.getElementById('radioYes').checked) {
		$('#NewPartywisePoDiv').hide();
		$('#PartywisePoDiv').show();

	}
	/*
	 * else if(document.getElementById('radioNo').checked) {
	 * $('#PartywisePoDiv').hide(); $('#NewPartywisePoDiv').show();
	 * 
	 * $('#simplePo').val(""); }
	 */

}

function searchPO(id) {

	var inputs = [];
	inputs.push('vendorId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/partywisePo/getPObyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r == "") {
				alert("Data not found!");
				$('#txtPartyName').val('');

			}
			/* $("#hiddenVendorId").val(''); */
			setTableData(r);

		}
	});

	return true;
}

function setTableData(result) {
	var r = result;

	var divContent = "";
	for ( var i = 0; i < r.length; i++) {

		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='poId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].podocId
				+ "<input type='hidden' id='podocId"
				+ r[i].poId
				+ "' value='"
				+ r[i].podocId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='poVendorName"
				+ r[i].poId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorAddress
				+ "<input type='hidden' id='poDate"
				+ r[i].poId
				+ "' value='"
				+ r[i].vendorMaster.vendorAddress
				+ "'></td>"
				+ "</td><td style='display: none' id='vendorId'>"
				+ r[i].vendorMaster.vendorId
				+ "<input type='hidden' id='povendorId"
				+ +r[i].poId
				+ "'value='"
				+ r[i].vendorMaster.vendorId
				+ "'>"
				/*
				 * + "<td class='col-md-2 center'><a id='btnPrint" + r[i].poId + "'
				 * class='btn btn-xs btn-success'
				 * href='/EhatEnterprise/pharmacy/partywisePo/printView?poId=" +
				 * r[i].poId + "'> <i class='fa fa-print'></i> </a></td>"
				 */
				+ "<td class='col-md-2 center'><button id='btnPrint"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success'  onclick='partywisePoPrint("
				+ r[i].poId
				+ ")'> <i class='fa fa-print'></i> </button></td>"

				+ "<td class='col-md-2 center'> <a id='btnEdit"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success' value='EDIT' href='/EhatEnterprise/pharmacy/partywisePo/edit-view?poId="
				+ r[i].poId
				+ "'>"
				+ "<i class='fa fa-edit'></i> </a></td>"

				+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePO("
				+ r[i].poId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divProductOrderList').html(divContent);
}

function splitLastPurchaseContent(result) {

	if (result != "") {
		for ( var i = 0; i < result.length; i++) {
			var arr = result[i].split("_");
			if (arr.length > 1) {
				$("#textLastPartyName").val(arr[0]);
				$("#textLastQty").val(arr[1]);
				$("#textLastMRP").val(arr[2]);
				var calc = (parseFloat(arr[1]) * parseFloat(arr[3]));
				$("#textLastTrate").val(calc);

				$("#textLastPurRate").val(arr[3]);
			}
		}
	} else {
		$("#textLastPartyName").val("");
		$("#textLastQty").val("");
		$("#textLastSchm").val("");
		$("#textLastMRP").val("");
		$("#textLastTrate").val("");
		$("#textLastPurRate").val("");
	}
}

// productname-prodId-unit-packing-company
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

function findLastPurRate(productId) {

	var inputs = [];
	inputs.push('productId=' + productId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/partywisePo/getLastPurchaseVendor",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			splitLastPurchaseContent(r);
		}
	});

	return true;
}
function displayPartywisePoRecords(number) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			vendorId : number
		},
		url : "/EhatEnterprise/pharmacy/purchase/getPurbyVendorId",
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
function setTableContent(result) {

	var r = result;
	var count = 1;
	var index = 0;
	rowCount = 0;
	var divContent = "";
	for ( var j = 0; j < r.length; j++) {
		for ( var i = 0; i < r[j].ltPurSlave.length; i++) {
			/*
			 * divContent = divContent + "<tr><td><label class='
			 * input-SmallText'>" + (count++) + "</label></td>" +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText' id='type" +
			 * r[i].purId + "' value='" + "'></td>" +"<td class='col-md-1' style='height: 21.5px;'>" +"<input
			 * type='hidden' name='ltPOslave[" +r[j].ltPurSlave[i].purSlaveId
			 * +"].productMaster.productId'" +" id='hiddenProductId"
			 * +r[j].ltPurSlave[i].purSlaveId +"'
			 * value='"+r[j].ltPurSlave[i].productMaster.productId+"'/>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='productName" + r[j].ltPurSlave[i].purSlaveId + "' value='" +
			 * r[j].ltPurSlave[i].productMaster.productName + "'></td>" +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billNo" + r[j].ltPurSlave[i].purSlaveId + "' value='" +
			 * r[j].ltPurSlave[i].productMaster.productUnit + "'></td>" +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billNo" + r[j].ltPurSlave[i].purSlaveId + "' value='" +
			 * r[j].ltPurSlave[i].productMaster.packingMaster.packType + "'></td>" +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billNo" + r[j].ltPurSlave[i].purSlaveId + "' value='" +
			 * r[j].ltPurSlave[i].productMaster.companyMaster.compName + "'></td>";
			 * 
			 * 
			 * if(r[j].ltPurSlave[i].purSlaveMrp==null) { divContent =
			 * divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText' id='vat" +
			 * r[j].ltPurSlave[i].purSlaveId + "' name='ltPOslave["
			 * +r[j].ltPurSlave[i].purSlaveId +"].poSlaveMrp' value='0'></td>"; }
			 * else { divContent = divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText' id='vat" +
			 * r[j].ltPurSlave[i].purSlaveId + "' value='" +
			 * r[j].ltPurSlave[i].purSlaveMrp + "' name='ltPOslave["
			 * +r[j].ltPurSlave[i].purSlaveId +"].poSlaveMrp'></td>"; }
			 * 
			 * if(r[j].ltPurSlave[i].purSlaveQty==null) { divContent =
			 * divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "' value=0'
			 * name='ltPOslave[" +r[j].ltPurSlave[i].purSlaveId +"].poSlaveQty'></td>"; }
			 * else { divContent = divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "' value='" +
			 * r[j].ltPurSlave[i].purSlaveQty + "' name='ltPOslave["
			 * +r[j].ltPurSlave[i].purSlaveId +"].poSlaveQty'></td>"; }
			 * 
			 * if(r[j].ltPurSlave[i].purSlaveScheme==null) { divContent =
			 * divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "' value='0'
			 * name='ltPOslave[" +r[j].ltPurSlave[i].purSlaveId
			 * +"].poSlaveScheme'></td>"; } else { divContent = divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "' value='" +
			 * r[j].ltPurSlave[i].purSlaveScheme + "' name='ltPOslave["
			 * +r[j].ltPurSlave[i].purSlaveId +"].poSlaveScheme'></td>"; } +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].purId + "' value='" +
			 * r[j].ltPurSlave[i].purSlaveScheme + "'></td>";
			 * 
			 * 
			 * if(r[j].ltPurSlave[i].purSlavePurchaseRate==null) { divContent =
			 * divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "'value='0'
			 * name='ltPOslave[" +r[j].ltPurSlave[i].purSlaveId
			 * +"].poSlaveRate'></td>"; } else { divContent = divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "'value='" +
			 * r[j].ltPurSlave[i].purSlavePurchaseRate + "' name='ltPOslave["
			 * +r[j].ltPurSlave[i].purSlaveId +"].poSlaveRate'></td>"; }
			 * 
			 * if(r[j].ltPurSlave[i].purSlaveAmt==null) { divContent =
			 * divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "'value='0'
			 * name='ltPOslave[" +r[j].ltPurSlave[i].purSlaveId +"].poSlaveAmt'></td>"; }
			 * else { divContent = divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='text' class='form-control input-SmallText'
			 * id='billAmt" + r[j].ltPurSlave[i].purSlaveId + "'value='" +
			 * r[j].ltPurSlave[i].purSlaveAmt + "' name='ltPOslave["
			 * +r[j].ltPurSlave[i].purSlaveId +"].poSlaveAmt'></td>"; }
			 * 
			 * divContent = divContent +"<td class='col-md-1' style='height: 21.5px;'>" + "
			 * <input type='checkbox' id='selected" +
			 * r[j].ltPurSlave[i].purSlaveId + "' name='selectedValues'" +"
			 * onclick='calculate("+r[j].ltPurSlave[i].purSlaveId+")'" +
			 * "value='" +r[j].ltPurSlave[i].purSlaveId +"' ></td>" + " <input
			 * type='hidden' id='purchaseMaster" + r[j].ltPurSlave[i].purSlaveId + "'
			 * name='ltPOslave[" +r[j].ltPurSlave[i].purSlaveId
			 * +"].purchaseMaster.purId' value='"+r[j].purId+"'" +">" + " <input
			 * type='hidden' id='purchaseSlave" + r[j].ltPurSlave[i].purSlaveId + "'
			 * name='ltPOslave[" +r[j].ltPurSlave[i].purSlaveId
			 * +"].purchaseMaster.ltPurSlave[0].purSlaveId'
			 * value='"+r[j].ltPurSlave[i].purSlaveId+"'" +">" +"</td>" +"</tr>";
			 */

			divContent = divContent
					+ "<tr><td><label  class=' input-SmallText'>"
					+ count
					+ "</label></td>"
					/*
					 * +"<td class='col-md-1' style='height: 21.5px;'>" + "
					 * <input type='text' class='form-control input-SmallText'
					 * id='type" + count + "' value='" + "'></td>"
					 */
					+ "<td class='col-md-1' style='height: 21.5px;'><input type='hidden' id='hiddenCurrentRow' value='1' />"

					+ "<input type='hidden' name='ltPOslave["
					+ rowCount
					+ "].productMaster.productId'"
					+ " id='hiddenProductId"
					+ count
					+ "' value='"
					+ r[j].ltPurSlave[i].productMaster.productId
					+ "'/>"

					+ " <input type='text' class='form-control input-SmallText' id='particulars"
					+ count
					+ "' value='"
					+ r[j].ltPurSlave[i].productMaster.productName
					+ "'  data-toggle='modal' data-target='#Partywise_Po_Pop_Up' onclick='loadPopUp("
					+ count
					+ ")'></td>"

					+ "<td class='col-md-1' style='height: 21.5px;'>"
					+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtUnit"
					+ count
					+ "' value='"
					+ r[j].ltPurSlave[i].productMaster.productUnit
					+ "'></td>"

					+ "<td class='col-md-1' style='height: 21.5px;'>"
					+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtPack"
					+ count
					+ "' value='"
					+ r[j].ltPurSlave[i].productMaster.packingMaster.packType
					+ "'></td>"

					+ "<td class='col-md-1' style='height: 21.5px;'>"
					+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtComp"
					+ count + "' value='"
					+ r[j].ltPurSlave[i].productMaster.companyMaster.compName
					+ "'></td>";

			if (r[j].ltPurSlave[i].purSlaveMrp == null) {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='vat"
						+ count + "' name='ltPOslave[" + rowCount
						+ "].poSlaveMrp' value='0'></td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='vat"
						+ count + "' value='" + r[j].ltPurSlave[i].purSlaveMrp
						+ "' name='ltPOslave[" + rowCount
						+ "].poSlaveMrp'></td>";
			}

			if (r[j].ltPurSlave[i].purSlaveQty == null) {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtQty"
						+ count + "' value=0' name='ltPOslave[" + rowCount
						+ "].poSlaveQty'></td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtQty"
						+ count + "' value='" + r[j].ltPurSlave[i].purSlaveQty
						+ "' name='ltPOslave[" + rowCount
						+ "].poSlaveQty'></td>";
			}

			if (r[j].ltPurSlave[i].purSlaveScheme == null) {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtScheme"
						+ count + "' value='0' name='ltPOslave[" + rowCount
						+ "].poSlaveScheme'></td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtScheme"
						+ count + "' value='"
						+ r[j].ltPurSlave[i].purSlaveScheme
						+ "' name='ltPOslave[" + rowCount
						+ "].poSlaveScheme'></td>";
			}

			/*
			 * +"<td class='col-md-1' style='height: 21.5px;'>" + " <input
			 * type='text' class='form-control input-SmallText' id='scheme" +
			 * count + "' value='" + r[j].ltPurSlave[i].purSlaveScheme + "'></td>";
			 */

			if (r[j].ltPurSlave[i].purSlavePurchaseRate == null) {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtPurRate"
						+ count + "'value='0' name='ltPOslave[" + rowCount
						+ "].poSlaveRate'></td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtPurRate"
						+ count + "'value='"
						+ r[j].ltPurSlave[i].purSlavePurchaseRate
						+ "' name='ltPOslave[" + rowCount
						+ "].poSlaveRate'></td>";
			}

			if (r[j].ltPurSlave[i].purSlaveAmt == null) {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='billAmt"
						+ count + "'value='0' name='ltPOslave[" + rowCount
						+ "].poSlaveAmt'></td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-1' style='height: 21.5px;'>"
						+ " <input type='text' readonly='true' class='form-control input-SmallText' id='billAmt"
						+ count + "'value='" + r[j].ltPurSlave[i].purSlaveAmt
						+ "' name='ltPOslave[" + rowCount
						+ "].poSlaveAmt'></td>";
			}

			divContent = divContent
					+ "<td class='col-md-1' style='height: 21.5px;'>"
					+ " <input type='text' readonly='true' class='form-control input-SmallText' id='textStock"
					+ count + "' value='" + r[j].ltPurSlave[i].purSlaveBillRate
					+ "'  name='ltPOslave[" + rowCount
					+ "].totalstockQty'></td>";

			divContent = divContent
					+ "<td class='col-md-1' style='height: 21.5px;'>"
					+ " <input type='checkbox' id='selected" + count
					+ "' name='selectedValues'" + " onclick='calculateTotal()'" + "value='" + count + "' ></td>"

					+ " <input type='hidden' id='purchaseMaster" + count
					+ "' name='ltPOslave[" + rowCount
					+ "].partywisePoPurId' value='" + r[j].purId + "'"
					+ ">"

					+ " <input type='hidden' id='purchaseSlave" + count
					+ "' name='ltPOslave[" + rowCount
					+ "].productMaster.categoryMaster.catId' value='" + count
					+ "'" + ">"

					+ "</td>" + "</tr>";

			count++;
			rowCount++;

		}

	}

	divContent = divContent
			+ "<tr><td><label  class=' input-SmallText'>"
			+ count
			+ "</label></td>"
			/*
			 * +"<td class='col-md-1' style='height: 21.5px;'>" + " <input
			 * type='text' class='form-control input-SmallText' id='type" +
			 * count + "' value='" + "'></td>"
			 */
			+ "<td class='col-md-1' style='height: 21.5px;'>"

			+ "<input type='hidden' name='ltPOslave["
			+ rowCount
			+ "].productMaster.productId'"
			+ " id='hiddenProductId"
			+ count
			+ "' value='"

			+ "'/>"

			+ " <input type='text' class='form-control input-SmallText' id='particulars"
			+ count
			+ "'  data-toggle='modal' data-target='#Partywise_Po_Pop_Up' onclick='loadPopUp("
			+ count
			+ ","
			+ 0
			+ ","
			+ 1
			+ ")'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtUnit"
			+ count
			+ "' value='"

			+ "'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text'  readonly='true' class='form-control input-SmallText' id='txtPack"
			+ count
			+ "' value='"

			+ "'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtComp"
			+ count
			+ "' value=''></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text'  readonly='true' class='form-control input-SmallText' id='textMRP"
			+ count
			+ "'  "
			+ "  name='ltPOslave["
			+ rowCount
			+ "].poSlaveMrp'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtQty"
			+ count
			+ "' value='"
			+ "' name='ltPOslave["
			+ rowCount
			+ "].poSlaveQty'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtScheme"
			+ count
			+ "' value='"
			+ "' name='ltPOslave["
			+ rowCount
			+ "].poSlaveScheme'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text' readonly='true' class='form-control input-SmallText' id='txtPurRate"
			+ count
			+ "'value='"
			+ "' name='ltPOslave["
			+ rowCount
			+ "].poSlaveRate'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text' readonly='true' class='form-control input-SmallText' id='billAmt"
			+ count
			+ "'value='"
			+ "' name='ltPOslave["
			+ rowCount
			+ "].poSlaveAmt'></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text' readonly='true' class='form-control input-SmallText' id='textStock"
			+ count + "' value='" + "' name='ltPOslave[" + rowCount
			+ "].totalstockQty' ></td>"

			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='checkbox' id='selected" + count
			+ "' name='selectedValues'" + " onclick='calculateTotal()'" + "value='" + count + "' ></td>"

			+ " <input type='hidden' id='purchaseMaster" + count
			+ "' name='ltPOslave[" + rowCount
			+ "].partywisePoPurId' value=''>"

			+ " <input type='hidden' id='purchaseSlave" + count
			+ "' name='ltPOslave[" + rowCount
			+ "].productMaster.categoryMaster.catId' value='" + count + "'>"

			+ "</td>" + "</tr>";

	divContent = divContent
			+ "<input type='hidden' name='no' id='simplePo' value='1'>";

	$("#RowCount").val(count);
	$('#PartywisePoDiv').html(divContent);

}

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

		/*
		 * if (document.getElementById('radioNo').checked)
		 * document.getElementById("NewPartywisePoDiv").appendChild(x); else
		 */
		document.getElementById("PartywisePoDiv").appendChild(x);

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
				+ "].productMaster.productName'  type='text' class='form-control input-SmallText' id='particulars"
				+ rowCount
				+ "' data-toggle='modal' data-target='#Partywise_Po_Pop_Up' onclick='loadPopUp("
				+ rowCount
				+ ")'/>"
				+ "</td> <td><input name='ltPOslave["
				+ index
				+ "].productMaster.productUnit' type='text' class='form-control input-SmallText' id='txtUnit"
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
				+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='txtPack"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> <td><input name='ltPOslave["
				+ index
				+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='txtComp"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input name='ltPOslave["
				+ index
				+ ".poSlaveMrp' type='text' class='form-control input-SmallText' id='textMRP"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> "

				+ "<td><input name='ltPOslave["
				+ index
				+ "].poSlaveQty' readonly='true' type='text' class='form-control input-SmallText' id='txtQty"
				+ rowCount
				+ "' /></td>"

				+ " <td><input name='ltPOslave["
				+ index
				+ ".poSlaveScheme' readonly='true'  type='text' class='form-control input-SmallText' id='txtScheme"
				+ rowCount
				+ "' /></td>"

				+ " <td><input name='ltPOslave["
				+ index
				+ "].poSlaveRate' type='text' class='form-control input-SmallText' id='txtPurRate"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"
				+ " <td><input name='ltPOslave["
				+ index
				+ "].poSlaveAmt' type='text' readonly='true' class='form-control input-SmallText' id='billAmt"
				+ rowCount
				+ "' /></td><td><input  type='text' readonly='true' class='form-control input-SmallText' id='textStock"
				+ rowCount
				+ "' name='ltPOslave["
				+ index
				+ "].totalstockQty' /></td></tr>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#textProductName' + rowCount).focus();
		fillRow(currentRowCount);
		/* calculateAmt(currentRowCount); */
	} else {
		fillRow(currentRowCount);
		calculateAmt(currentRowCount);
	}
}

function toCreatPurchaseOrderDiv1(RowCount, currentRowCount) {
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

		/*
		 * if (document.getElementById('radioNo').checked)
		 * document.getElementById("NewPartywisePoDiv").appendChild(x); else
		 */
		document.getElementById("PartywisePoDiv").appendChild(x);

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
				+ "].productMaster.productName'  type='text' class='form-control input-SmallText' id='particulars"
				+ rowCount
				+ "' data-toggle='modal' data-target='#Partywise_Po_Pop_Up' onclick='loadPopUp("
				+ rowCount
				+ ","
				+ 0
				+ ","
				+ 1
				+ ");'/>"
				+ "</td> <td><input name='ltPOslave["
				+ index
				+ "].productMaster.productUnit' type='text' class='form-control input-SmallText' id='txtUnit"
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
				+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='txtPack"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> <td><input name='ltPOslave["
				+ index
				+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='txtComp"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input name='ltPOslave["
				+ index
				+ "].poSlaveMrp' type='text' class='form-control input-SmallText' id='textMRP"
				+ rowCount
				+ "'  readonly='true' tabindex='-1' /></td> "

				+ "<td><input name='ltPOslave["
				+ index
				+ "].poSlaveQty' type='text' readonly='true' class='form-control input-SmallText' id='txtQty"
				+ rowCount
				+ "' /></td>"

				+ " <td><input name='ltPOslave["
				+ index
				+ ".poSlaveScheme' type='text' readonly='true'  class='form-control input-SmallText' id='txtScheme"
				+ rowCount
				+ "' /></td>"

				+ " <td><input name='ltPOslave["
				+ index
				+ "].poSlaveRate' type='text' class='form-control input-SmallText' id='txtPurRate"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ " <td><input name='ltPOslave["
				+ index
				+ "].poSlaveAmt' type='text' readonly='true' class='form-control input-SmallText' id='billAmt"
				+ rowCount
				+ "'  /></td>"

				+ " <td><input type='text'  readonly='true' class='form-control input-SmallText' id='textStock"
				+ rowCount
				+ "'  name='ltPOslave["
				+ index
				+ "].totalstockQty'/></td>"

				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='checkbox' id='selected"
				+ rowCount
				+ "' name='selectedValues'"
				+ " onclick='calculateTotal()'"
				+ " value='"
				+ rowCount
				+ "' ></td>"

				+ "<input type='hidden' value='"
				+ rowCount
				+ "' name='ltPOslave["
				+ index
				+ "].productMaster.categoryMaster.catId' id='purchaseSlave"
				+ rowCount + "'>"

				+ "</tr>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#textProductName' + rowCount).focus();
		fillRow(currentRowCount, 1);
		/* calculateAmt(currentRowCount); */
	} else {
		fillRow(currentRowCount, 1);

	}
}

function fillRow(rCount, type) {

	var rowCount = parseInt(rCount);
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#particulars' + rowCount).val($('#particulars').val());
	$('#txtUnit' + rowCount).val($('#txtUnit').val());
	$('#txtPack' + rowCount).val($('#txtPack').val());
	$('#txtComp' + rowCount).val($('#txtComp').val());
	$('#textMRP' + rowCount).val('0');
	$('#txtQty' + rowCount).val($('#txtQty').val());
	$('#txtPurRate' + rowCount).val($('#txtPurRate').val());

	$('#txtShelf' + rowCount).val($('#txtShelf').val());
	$('#txtClStk' + rowCount).val($('#txtClStk').val());
	$('#textStock' + rowCount).val($('#txtClStk').val());
	$('#txtScheme' + rowCount).val($('#txtScheme').val());

	var purRate = 0;
	var qty = 0;

	if ($('#txtPurRate').val() != '' && $('#txtPurRate').val().length > 0)
		purRate = parseFloat($('#txtPurRate').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	$('#billAmt' + rowCount).val((purRate * qty).toFixed(2));
	
	calculateTotal();

}

function calculateTotalAmt() {

	var total = 0;
	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($('#billAmt' + i).val() >= 1) {
			total = parseFloat(total) + parseFloat($('#billAmt' + i).val());
		}
		$('#txtTotal').val((total).toFixed(2));
	}

}

function resetAllPopUpValues() {
	$('#Partywise_Po_Pop_Up').find('input:text').val('');
	$('#Partywise_Po_Pop_Up').find('input:hidden').val('');
}

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
					url : "/EhatEnterprise/pharmacy/partywisePo/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						// getPOList();
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
						window.location.href = "view";
					}
				});

		return true;
	} else {

	}

}
function getPOList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/partywisePo/PoList",
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

/*
 * function calculateAmt(rowCount) {
 * 
 * var flag = 0; counts.push(rowCount); var i = 0;
 * 
 * if ($('#txtCount').val() != "") { while (i < counts.length - 1) { if
 * ($('#hiddenProductId' + rowCount).val() != "") { if (rowCount == counts[i]) {
 * flag = 1; } } i++; } if (flag == 0 && $('#hiddenProductId' + rowCount).val() !=
 * "") { var prodCount = parseInt($('#txtCount').val());
 * $('#txtCount').val(prodCount + 1); } } else { $('#txtCount').val(1); }
 * 
 * var qty = parseInt($('#textQty' + rowCount).val()); var purRate =
 * parseInt($('#textPurRate' + rowCount).val()); $('#textAmount' +
 * rowCount).val((qty * purRate));
 * 
 * if ($('#txtTotal').val() != "") { var i = 1; var finalAmt = 0; while (i <
 * totalRowCount) {
 * 
 * finalAmt = parseInt(finalAmt) + parseInt($('#textAmount' + i).val()); i++; }
 * $('#txtTotal').val(finalAmt); } else { $('#txtTotal').val(0); var finalAmt =
 * parseInt($('#txtTotal').val()); $('#txtTotal').val((finalAmt + (qty *
 * purRate))); } }
 */
function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1;

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}
/*
 * function setTableData(result) { var r = result; var divContent = ""; for (
 * var i = 0; i < r.length; i++) {
 * 
 * divContent = divContent + " <tr><td class='col-md-1 center'>" + (i + 1) + "
 * <input type='hidden' id='poId" + r[i].poId + "' value='" + r[i].poId + "'></td><td class='col-md-2 center'>" +
 * r[i].podocId + "<input type='hidden' id='podocId" + r[i].poId + "' value='" +
 * r[i].podocId + "'></td><td class='col-md-2 center'>" +
 * r[i].vendorMaster.vendorName + "<input type='hidden' id='poVendorName" +
 * r[i].poId + "' value='" + r[i].vendorMaster.vendorName + "'></td><td class='col-md-2 center'>" +
 * r[i].vendorMaster.vendorAddress + "<input type='hidden' id='poVendorName" +
 * r[i].poId + "' value='" + r[i].vendorMaster.vendorAddress + "'></td>" + "</td><td style='display: none' id='vendorId'>" +
 * r[i].vendorMaster.vendorId + "<input type='hidden' id='povendorId" +
 * +r[i].poId + "'value='" + r[i].vendorMaster.vendorId + "'>" + "<td class='col-md-2 center'><a
 * id='btnPrint" + r[i].poId + "' class='btn btn-xs btn-success'
 * href='/EhatEnterprise/pharmacy/partywisePo/printView?poId=" + r[i].poId + "'>
 * <i class='fa fa-print'></i> </a></td>" + "<td class='col-md-1 center'> <a
 * id='btnEdit" + r[i].poId + "' class='btn btn-xs btn-success' value='EDIT'
 * href='/EhatEnterprise/pharmacy/partywisePo/edit-view?poId=" + r[i].poId +
 * "'>" + "<i class='fa fa-edit'></i> </a></td>" + "<td class='col-md-1 center'>
 * <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePO(" +
 * r[i].poId + ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button>
 * </td> </tr>"; }
 * 
 * $('#divProductOrderList').html(divContent); }
 */
/*
 * function calculate(id) { if ($('#selected' + id).is(':checked')) {
 * 
 * totalAmount = totalAmount + parseFloat($('#billAmt' + id).val());
 * $('#txtTotal').val(totalAmount); } else { totalAmount = totalAmount -
 * parseFloat($('#billAmt' + id).val());
 * $('#txtTotal').val((totalAmount).toFixed(2)); } }
 */

function calculate1(id) {

	if ($('#selected' + id).is(':checked')) {
		var totalAmount = 0;
		var billAmt = 0;

		if ($('#billAmt' + id).val() != ''
				&& $('#billAmt' + id).val().length > 0)
			billAmt = parseFloat($('#billAmt' + id).val());

		if ($('#txtTotal').val() != '' && $('#txtTotal').val().length > 0)
			totalAmount = parseFloat($('#txtTotal').val());

		totalAmount = parseFloat(totalAmount + billAmt);
		$('#txtTotal').val((totalAmount).toFixed(2));

	} else {
		var totalAmount = 0;
		var billAmt = 0;

		if ($('#billAmt' + id).val() != ''
				&& $('#billAmt' + id).val().length > 0)
			billAmt = parseFloat($('#billAmt' + id).val());

		if ($('#txtTotal').val() != '' && $('#txtTotal').val().length > 0)
			totalAmount = parseFloat($('#txtTotal').val());

		totalAmount = totalAmount - parseFloat(billAmt);
		$('#txtTotal').val((totalAmount).toFixed(2));
	}
}

function calculateTotal() 
{
	var count = 0;
	var favorite = [];
	var total = 0;
	$.each($("input[name='selectedValues']:checked"), function() {
		favorite.push($(this).val());
		count++;

	});

	for ( var i = 0; i < favorite.length; i++) {
		if ($('#billAmt' + favorite[i]).val() != ''
				&& $('#billAmt' + favorite[i]).val().length > 0)
			total = total + parseFloat($("#billAmt" + favorite[i]).val());
	
		$("#txtTotal").val((total).toFixed(2));
	
	}
	if (favorite.length == 0) {
		$("#txtTotal").val(0);
}
}


function partywisePoPrint(partywisePoId) {
	window.open("/EhatEnterprise/pharmacy/partywisePo/printView?poId="
			+ partywisePoId + "");

}