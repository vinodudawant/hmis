var totalRowCount = 1;

function getNextAutoIncrement() {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/mrn/getNextAutoIncrement",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#txtOrderNo1").val(r);

		}
	});

	return true;
}

function toCreateMrnDiv(RowCount, currentRowCount) {

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

		document.getElementById(rowId).innerHTML = "<td><center>"
				+ rowCount
				+ "</center></td>"
				+ "<td><input type='hidden' name='mrnSlaves["
				+ index
				+ "].mrnSlaveId' id='mrnSlaveId"
				+ rowCount
				+ "'> <input type='hidden' name='mrnSlaves["
				+ index
				+ "].productMaster.productId' id='hiddenProductId"
				+ rowCount
				+ "' /><input name='mrnSlaves["
				+ index
				+ "].productMaster.productName'  type='text' class='form-control input-SmallText' id='textProductName"
				+ rowCount
				+ "' data-toggle='modal' data-target='#Product_Information' onclick='loadPopUp("
				+ rowCount
				+ ")' onkeypress='loadPopUp("
				+ rowCount
				+ ")'/>"
				+ "</td> <td><input name='mrnSlaves["
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

				+ "<td><input name='mrnSlaves["
				+ index
				+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='textPack"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> <td><input name='mrnSlaves["
				+ index
				+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='textComp"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ " <td><input name='mrnSlaves["
				+ index
				+ "].mrnSlaveQty' type='text' class='form-control input-SmallText'  id='textQty"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td> "

				+ "<td><center><input type='checkbox' name='deleteGroup' value='"
				+ (rowCount) + "' id='deleteGroup" + (rowCount)
				+ "'></center></td></tr>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#textProductName' + rowCount).focus();
		fillRowMrnDiv(currentRowCount);

	} else {
		fillRowMrnDiv(currentRowCount);

	}
}

function fillRowMrnDiv(rCount) {
	var rowCount = parseInt(rCount);
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#textComp' + rowCount).val($('#txtComp').val());
	$('#textQty' + rowCount).val($('#txtQty').val());
	var prodCount = 0;
	if ($('#txtCount').val() != "") {

		for ( var i = 1; i < $('#RowCount').val(); i++) {
			if ($('#hiddenProductId' + i).val() != ""
					&& $('#hiddenProductId' + i).val() != null) {
				prodCount = prodCount + 1;
				$('#txtCount').val(prodCount);

			}
		}

	} else {
		$('#txtCount').val(1);
	}
}

function DublicateRecord(rowCount) {
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
	while (j < (count)) {

		productName = $('#hiddenProductId' + j).val();
		productName1 = $('#hiddenProductId').val();

		batchId = $('#textBatchId' + j).val();
		batchId1 = $('#hiddenBatchId').val();

		if ((productName == productName1) && (batchId == batchId1)) {
			alert("Dublicate Record Not insert");
			return 0;

		}
		j++;
	}
	return 1;
}

// checkStatus
function checkStatus() {

	if ($('#loginUser').val() != null && $('#loginUser').val() != '') {
		var storeId = $('#mrnStoreId').val();

		if (storeId != "" && storeId != null) {
			var inputs = [];
			inputs.push('storeId=' + storeId);

			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/mrn/storeWiseMRN",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
				},
				success : function(r) {
					setMRNList(r);
				}

			});
		} else {
			alertify.error("please select Store First");
			$('#divMRNList').html("<b><center>No Data Found</center></b>");
			return false;
		}

		return true;
	} else {
		alertify.error("please refresh the page");
	}
}

// receiveMrn
function receiveMrnList() {
	var storeId = $('#mrnStoreId').val();
	if (storeId != "" && storeId != null) {
		var inputs = [];
		inputs.push('storeId=' + storeId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/mrn/mrnIssueListForReceive",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
			},
			success : function(r) {
				setMRNListForReceive(r);
			}

		});
	} else {
		alertify.error("please select Store First");
		$('#divMRNList').html("<b><center>No Data Found</center></b>");
		return false;
	}

	return true;

}

function setMRNListForReceive(result) {
	var divContent = "";
	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			divContent = divContent + " <tr><td class='col-md-1 center'>"
					+ (i + 1) + "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnIssueId
					+ "<input type='hidden' id='HospitalBillNum"
					+ result[i].mrnIssueId + "'value='" + result[i].mrnIssueId
					+ "'>" + "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnIssueDocNo
					+ "<input type='hidden' id='InwardNo"
					+ result[i].mrnIssueDocNo + "' value='"
					+ result[i].mrnIssueDocNo + "'></td>"

					+ "<td class='col-md-2 center'>"
					+ getDate(result[i].mrnReceivedDate) + "</td>"

			if (result[i].mrnIssueNarration == 'complete') {
				divContent = divContent
						+ "<td class='col-md-2 center'> <a id='btnPrint"
						+ "' class='btn btn-xs btn-success' "
						+ " onclick=editMRNIssueByIdForReceive("
						+ result[i].mrnIssueDocNo
						+ ") disabled><i class='fa fa-edit'></i> </a> </td>";

			} else {
				divContent = divContent
						+ "<td class='col-md-2 center'> <a id='btnPrint"
						+ "' class='btn btn-xs btn-success' "
						+ " onclick=editMRNIssueByIdForReceive("
						+ result[i].mrnIssueDocNo
						+ ") ><i class='fa fa-edit'></i> </a> </td>";
			}

		}
	} else {
		divContent = divContent + "<b>Record Not found</b>";
	}

	$('#divIssueMrnListForReceive').html(divContent);
}

// editMRNIssue

function editMRNIssueByIdForReceive(mrnId) {
	var inputs = [];
	inputs.push('storeMrnId=' + mrnId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "../../pharmacy/mrn/editMRNIssueByIdForReceive",
		//url : "../mrn/editMRNIssueByIdForReceive",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		},
		success : function(r) {
			$('#box_tab1').prop("class", "tab-pane fade active in");

			$('#box_tab2').prop("class", "tab-pane fade");
			$('#box_tab3').prop("class", "tab-pane fade");
			$('#box_tab4').prop("class", "tab-pane fade");
			$('#box_tab5').prop("class", "tab-pane fade");

			$('#tab4').removeClass('active');
			$('#tab1').removeClass('active');
			$('#tab2').removeClass('active');
			$('#tab5').removeClass('active');
			$('#tab3').addClass('active');

			editIssueMrnForReceive(r);

		}
	});
}

function editIssueMrnForReceive(result) {

	$("#hiddenMrnId").val(result.mrnId);
	$("#txtOrderNo1").val(result.mrnId);
	$("#txtOrderNo").val(result.mrnDocId);
	$("#popup_container2").val(getDate(result.mrnDate));
	$("#txtTime").val(result.mrnTime);
	$("#txtMrnStoreName").val(result.mrnStoreName);
	$("#mrnRemark").val(result.mrnRemark);
	$("#txtCount").val(result.mrnProductCount);

	var divContent = "";
	var mrnSlaves = result.mrnSlaves;
	var totalRowCount = 0;
	$("#HSTDiv").hide();
	$("#HSTDivForReceive").show();
	for ( var i = 0; i < mrnSlaves.length; i++) {

		if (mrnSlaves[i].productMaster.companyMaster.compId == '1') {
			divContent = divContent
					+ "<input type='hidden' id='hiddenCurrentRow' value='0' /><tr id='remove1"
					+ "' style='background-color:#CCFFCC'><td><label  class=' input-SmallText'>"
					+ (i + 1)
					+ "</label></td>"
					+ "<td><input type='hidden' name='mrnSlaves["
					+ i
					+ "].productMaster.productId' id='hiddenProductIdRec"
					+ (i + 1)
					+ "' value='"
					+ mrnSlaves[i].productMaster.productId
					+ "'/><input name='mrnSlaves["
					+ i
					+ "].mrnSlaveId' id='mrnSlaveIdRec"
					+ (i + 1)
					+ "' type='hidden' value='"
					+ mrnSlaves[i].mrnSlaveId
					+ "'><input name='mrnSlaves["
					+ i
					+ "].productMaster.productName' readonly type='text' class='form-control input-SmallText' id='textProductNameRec"
					+ (i + 1)
					+ "' data-toggle='modal' data-target='#Product_Information' onclick='loadPopUp("
					+ (i + 1)
					+ ")' value='"
					+ mrnSlaves[i].productMaster.productName
					+ "' />"
					+ "</td> <td><input name='mrnSlaves["
					+ i
					+ "].productMaster.productUnit' type='text' class='form-control input-SmallText' id='textUnitRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].productMaster.productUnit
					+ "'/></td>"

					+ "<td style='display:none;'><input name='shelf' type='text' class='form-control input-SmallText' id='textShelfRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' /></td>"

					+ "<td style='display:none;'><input name='clStk' type='text' class='form-control input-SmallText' id='textClStkRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' /></td>"

					+ "<td><input name='mrnSlaves["
					+ i
					+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='textPackRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].productMaster.packingMaster.packType
					+ "'/></td> <td><input name='mrnSlaves["
					+ i
					+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='textCompRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].productMaster.companyMaster.compName
					+ "' /></td>"

					+ " <td><input name='mrnSlaves["
					+ i
					+ "].mrnSlaveQty' type='text' class='form-control input-SmallText'  id='textIssueQtyRec"
					+ (i + 1)
					+ "'  tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveQty
					+ "' readOnly /></td> "

					+ " <td ><input name='mrnSlaves["
					+ i
					+ "].mrnSlaveQty' type='text' class='form-control input-SmallText' readonly='true' id='textQtyRec"
					+ (i + 1)
					+ "'  tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveQty
					+ "' onblur='chkReceiveQty("
					+ (i + 1)
					+ ")'/></td> "

					+ " <td style='display:none;'><input  type='text' class='form-control input-SmallText'  id='hiddenBatchIdRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlavePendingQty
					+ "' /></td> "

					+ " <td style='display:none;'><input type='text' class='form-control input-SmallText'  id='hiddenStoreSlaveIdRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveSr
					+ "' /></td> "

					+ " <td><input name='mrnSlaves["
					+ i
					+ "].mrnSlavePendingQty' type='text' class='form-control input-SmallText'  id='textStatusRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveStatus
					+ "' /></td> "

					+ "<td><center><input  type='checkbox' name='deleteGroup' value='"
					+ (i + 1) + "' readonly='true' disabled='true' id='deleteGroup" + (i + 1)
					+ "'></center></td></tr>";
			totalRowCount++;

		} else {

			divContent = divContent
					+ "<input type='hidden' id='hiddenCurrentRow' value='0' /><tr id='remove1"
					+ "' style=''><td><label  class=' input-SmallText'>"
					+ (i + 1)
					+ "</label></td>"
					+ "<td><input type='hidden' name='mrnSlaves["
					+ i
					+ "].productMaster.productId' id='hiddenProductIdRec"
					+ (i + 1)
					+ "' value='"
					+ mrnSlaves[i].productMaster.productId
					+ "'/><input name='mrnSlaves["
					+ i
					+ "].mrnSlaveId' id='mrnSlaveIdRec"
					+ (i + 1)
					+ "' type='hidden' value='"
					+ mrnSlaves[i].mrnSlaveId
					+ "'><input name='mrnSlaves["
					+ i
					+ "].productMaster.productName'  type='text' class='form-control input-SmallText' id='textProductNameRec"
					+ (i + 1)
					+ "' data-toggle='modal' data-target='#Product_Information' onclick='loadPopUp("
					+ (i + 1)
					+ ")' value='"
					+ mrnSlaves[i].productMaster.productName
					+ "' />"
					+ "</td> <td><input name='mrnSlaves["
					+ i
					+ "].productMaster.productUnit' type='text' class='form-control input-SmallText' id='textUnitRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].productMaster.productUnit
					+ "'/></td>"

					+ "<td style='display:none;'><input name='shelf' type='text' class='form-control input-SmallText' id='textShelfRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' /></td>"

					+ "<td style='display:none;'><input name='clStk' type='text' class='form-control input-SmallText' id='textClStkRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' /></td>"

					+ "<td><input name='mrnSlaves["
					+ i
					+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='textPackRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].productMaster.packingMaster.packType
					+ "'/></td> <td><input name='mrnSlaves["
					+ i
					+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='textCompRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].productMaster.companyMaster.compName
					+ "' /></td>"

					+ " <td><input name='mrnSlaves["
					+ i
					+ "].mrnSlaveQty' type='text' class='form-control input-SmallText'  id='textIssueQtyRec"
					+ (i + 1)
					+ "'  tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveQty
					+ "' readOnly /></td> "

					+ " <td ><input name='mrnSlaves["
					+ i
					+ "].mrnSlaveQty' type='text' class='form-control input-SmallText'  id='textQtyRec"
					+ (i + 1)
					+ "'  tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveQty
					+ "' onblur='chkReceiveQty("
					+ (i + 1)
					+ ")'/></td> "

					+ " <td style='display:none;'><input  type='text' class='form-control input-SmallText'  id='hiddenBatchIdRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlavePendingQty
					+ "' /></td> "

					+ " <td style='display:none;'><input type='text' class='form-control input-SmallText'  id='hiddenStoreSlaveIdRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveSr
					+ "' /></td> "

					+ " <td><input name='mrnSlaves["
					+ i
					+ "].mrnSlavePendingQty' type='text' class='form-control input-SmallText'  id='textStatusRec"
					+ (i + 1)
					+ "' readonly='true' tabindex='-1' value='"
					+ mrnSlaves[i].mrnSlaveStatus
					+ "' /></td> "

					+ "<td><center><input  type='checkbox' name='deleteGroup' value='"
					+ (i + 1) + "' id='deleteGroup" + (i + 1)
					+ "'></center></td></tr>";
			totalRowCount++;
		}

	}

	$('#DRRDivForReceive').html(divContent);
	$("#RowCount").val(totalRowCount);
}

function chkReceiveQty(rowCount) {
	if ($('#textIssueQtyRec' + rowCount).val() != '') {
		var issueQty = parseFloat($('#textIssueQtyRec' + rowCount).val());
	}
	if ($('#textQtyRec' + rowCount).val() != '') {
		var qty = parseFloat($('#textQtyRec' + rowCount).val());
	}

	if (issueQty < qty) {
		alert("Enter Qty less than issue qty");
		$('#textQtyRec' + rowCount).val('');
		
		setTimeout(function()
         {
		$('#textQtyRec' + rowCount).focus();
     	}, 200);

	}

}

function setApproval() {
	if ($('#loginUser').val() != null && $('#loginUser').val() != '') {
		var storeId = $('#mrnStoreId').val();
		if (storeId != "" && storeId != null) {
			var inputs = [];
			inputs.push('storeId=' + storeId);

			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/mrn/storeWiseMRN",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					setApprovalMRNList(r);
				}

			});
		} else {
			alertify.error("please select Store First");
			$('#divMRNList').html("<b><center>No Data Found</center></b>");
			return false;
		}

		return true;
	} else {
		alertify.error("please refresh the page");
	}
}

function setApprovalMRNList(result) {
	var divContent = "";
	var storeUsers = $('#storeUsers').val();
	var splittedStoreUsers = storeUsers.split(",");
	var loginUser = ($('#loginUser').val());

	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			divContent = divContent + " <tr><td class='col-md-1 center'>"
					+ (i + 1) + "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnId
					+ "<input type='hidden' id='HospitalBillNum"
					+ result[i].mrnId + "'value='" + result[i].mrnId + "'>"
					+ "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnDocId
					+ "<input type='hidden' id='InwardNo" + result[i].mrnId
					+ "' value='" + result[i].mrnDocId + "'></td>"

					+ "<td class='col-md-2 center'>"
					+ getDate(result[i].mrnDate) + "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnStatus
					+ "</td>"

					+ "<td class='col-md-2 center'>";

			if (result[i].mrnApproved == 0) {

				if (result[i].mrnStatus != 'received') {
					var count = 0;
					for ( var j = 0; j < splittedStoreUsers.length; j++) {
						var splittedId = parseInt(splittedStoreUsers[j]);
						if (loginUser === splittedStoreUsers[j]
								&& splittedStoreUsers[j] != 0) {
							count = 1;
						}
					}
					if (count == 1) {
						divContent = divContent
								+ "Not Approved</td>"
								+ "<td class='col-md-1 center'> <input type='checkbox' name='approvalCheckbox' value='"
								+ result[i].mrnId + "'></td> </tr>";
					} else {
						divContent = divContent
								+ "Not Approved</td>"
								+ "<td class='col-md-1 center'> Permission Denied</td> </tr>";
					}
				}
			} else {
				var count = 0;
				for ( var j = 0; j < splittedStoreUsers.length; j++) {
					var splittedId = parseInt(splittedStoreUsers[j]);
					if (loginUser === splittedStoreUsers[j]) {
						count = 1;
					}
				}
				if (count == 1) {
					divContent = divContent
							+ "Approved</td>"
							+ "<td class='col-md-1 center'> <input type='checkbox' name='approvalCheckbox' value='"
							+ result[i].mrnId + "' disabled></td> </tr>";
				} else {
					divContent = divContent
							+ "Approved</td>"
							+ "<td class='col-md-1 center'> Permission Denied</td> </tr>";
				}
			}
		}
	} else {
		divContent = divContent + "<b>Record Not found</b>";
	}
	$('#divPendingApprovalList').html(divContent);
}

function setMRNList(result) {
	var divContent = "";

	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			divContent = divContent + " <tr><td class='col-md-1 center'>"
					+ (i + 1) + "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnId
					+ "<input type='hidden' id='HospitalBillNum"
					+ result[i].mrnId + "'value='" + result[i].mrnId + "'>"
					+ "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnDocId
					+ "<input type='hidden' id='InwardNo" + result[i].mrnId
					+ "' value='" + result[i].mrnDocId + "'></td>"

					+ "<td class='col-md-2 center'>"
					+ getDate(result[i].mrnDate) + "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnStatus
					+ "</td>"

					+ "<td class='col-md-2 center'>";

			if (result[i].mrnApproved == 0) {
				divContent = divContent + "Not Approved</td>";
			} else {
				divContent = divContent + "Approved</td>";
			}

			/*
			 * divContent = divContent + "<td class='col-md-2 center'> <a
			 * id='btnPrint" + "' class='btn btn-xs btn-success' " + "
			 * href=/EhatEnterprise/pharmacy/mrn/printView?mrnId=" +
			 * result[i].mrnId + " > <i class='fa fa-print'></i> </a> </td>";
			 */

			divContent = divContent
					+ "<td class='col-md-2 center'> <a id='btnPrint"
					+ "' class='btn btn-xs btn-success' "
					+ " onclick='storeMrnPrint(" + result[i].mrnId
					+ ")' > <i class='fa fa-print'></i> </a> </td>";

			if (result[i].mrnStatus == 'complete') {
				divContent = divContent
						+ "<td class='col-md-2 center'> <a id='btnPrint"
						+ "' class='btn btn-xs btn-success' "
						+ " onclick=editMRN(" + result[i].mrnId
						+ ") disabled><i class='fa fa-edit'></i> </a> </td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-2 center'> <a id='btnPrint"
						+ "' class='btn btn-xs btn-success' "
						+ " onclick=editMRN(" + result[i].mrnId
						+ ")><i class='fa fa-edit'></i> </a> </td>";
			}

			if (result[i].mrnStatus == 'complete'
					|| result[i].mrnStatus == 'In Process') {
				divContent = divContent
						+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteIndent("
						+ result[i].mrnId
						+ ")' value='DELETE' disabled> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
			} else {
				divContent = divContent
						+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteMRN("
						+ result[i].mrnId
						+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
			}

		}
	} else {
		divContent = divContent + "<b>Record Not found</b>";
	}

	$('#divMRNList').html(divContent);
}

function deleteMRN(mrnId) {
	var retVal = confirm("Do you want to Save?");
	if (retVal == true) {
		if (mrnId != null && mrnId != '') {
			var mrnId = mrnId;

			var inputs = [];
			inputs.push('mrnId=' + mrnId);

			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/mrn/deleteMRN",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					checkStatus();
				}

			});
		}
	}

}

// get formatted date dd/mm/yyyy
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

function saveMRN() {

	var mrnStoreId = 0;
	if ($("#mrnStoreId").val() != null && $("#mrnStoreId").val() != "") {
		mrnStoreId = $("#mrnStoreId").val();
	} else {
		alertify.error("please select store first");
		return false;
	}

	var mrnApproved = 0;
	if ($("#storeUsers").val() == '0' && $("#storeUsers").val() != null
			&& $("#storeUsers").val() != '') {
		mrnApproved = 1;
	} else {

		if ($("#storeUsers").val() != null && $("#storeUsers").val() != '') {
			var loginUser = $('#loginUser').val();
			var storeUsers = $('#storeUsers').val();
			var splittedStoreUsers = storeUsers.split(",");
			for ( var j = 0; j < splittedStoreUsers.length; j++) {
				if (loginUser === splittedStoreUsers[j]) {
					count = 1;
					mrnApproved = 1;
					break;
				}
			}
		} else {
			mrnApproved = 0;
		}
	}

	var mrnId = $("#hiddenMrnId").val();
	/*if(mrnId==""){
		mrnId=0;
	}*/
	var txtOrderNo = $("#txtOrderNo").val();
	var mrnId11 = $("#txtOrderNo1").val();

	var txtMrnStoreName = $("#txtMrnStoreName").val();

	var txtDate = $("#popup_container2").val();

	/* var txtTime=$("#txtTime").val(); */

	var mrnRemark = $("#mrnRemark").val();

	var txtCount = $("#txtCount").val();

	var totalRow = $("#RowCount").val();

	var txtTime = 0;
	if ($("#txtTime").val() != null && $("#txtTime").val() != "") {
		txtTime = $("#txtTime").val();
	} else {
		alertify.error("Please Enter Time");
		$("#txtTime").focus();
		return false;
	}

	if (totalRow.length < 1) {
		alertify.error("Enter Only Valid data");
		return false;
	}

	var materiallist = {
		mrnSlaves : []
	};

	for ( var i = 1; i < totalRow; i++) {

		if ($("#hiddenProductId" + i).val() != null
				&& $("#hiddenProductId" + i).val() != "") {
			var productId = 0;

			if ($("#hiddenProductId" + i).val() != null
					&& $("#hiddenProductId" + i).val() != "") {
				productId = $("#hiddenProductId" + i).val();
			} else {
				alertify.error("Please select Product");
				$("#hiddenProductId" + i).focus();
				return false;
			}

			var qty = $("#textQty" + i).val();
			if (qty == "" || qty == 0 || qty == null) {

				alertify.error("Please Enter Proper Quantity");
				$("#textQty" + i).focus();
				return false;
			}

			if ($("#mrnSlaveId" + i).val() != null
					&& $("#mrnSlaveId" + i).val() != "") {
				var pendingQty = 0;
				if ($('#textIssueQty' + i).val() != null
						&& $('#textIssueQty' + i).val() != '')
					pendingQty = $('#textIssueQty' + i).val();

				var status = '';

				if ($('#textStatus' + i).val() != null
						&& $('#textStatus' + i).val() != '')
					status = $('#textStatus' + i).val();

				materiallist.mrnSlaves.push({
					mrnSlaveId : $("#mrnSlaveId" + i).val(),
					mrnSlaveQty : qty,
					mrnSlavePendingQty : pendingQty,
					mrnSlaveStatus : status,
					storeReceiveQty : 0,
					productMaster : {
						'productId' : productId
					}
				});
			} else {
				materiallist.mrnSlaves.push({
					mrnSlaveQty : qty,
					mrnSlavePendingQty : 0,
					mrnSlaveStatus : 'pending',
					storeReceiveQty : 0,
					productMaster : {
						'productId' : productId
					}
				});
			}
		}
	}

	if (materiallist.mrnSlaves.length < 1) {
		alertify.error("Please Enter Valid Data");
		return false;
	}

	materiallist = JSON.stringify(materiallist);

	var inputs = [];

	inputs.push("mrnSlaves=" + materiallist);

	inputs.push("mrnStoreId=" + mrnStoreId);
	inputs.push("txtOrderNo=" + txtOrderNo);
	inputs.push("txtMrnStoreName=" + txtMrnStoreName);
	inputs.push("mrnRemark=" + mrnRemark);

	inputs.push("txtCount=" + txtCount);

	inputs.push("txtDate=" + txtDate);

	inputs.push("txtTime=" + txtTime);

	inputs.push("txtMrnId=" + mrnId);

	inputs.push("mrnApproved=" + mrnApproved);

	inputs.push("mrnMainStoreId=" + $('#hiddenMainStoreId').val()); 

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str,
				url : "../../pharmacy/mrn/save",
				//url : "../mrn/save",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("oops something went wrong related to stock please save proper data or check mrp");
				},
				success : function(r) {
					alertify.success(r);
					location.reload(true);
					storeMrnPrint(mrnId11)
					
				}
			});
}

function receiveMrn() {
	var mrnStoreId = 0;
	var mrnId = $("#hiddenMrnId").val();
	var totalRowCount = $("#RowCount").val();
	var materiallist = {
		mrnSlaves : []
	};
	
	
	var favorite = [];
	$.each($("input[name='deleteGroup']:checked"), function() {
		favorite.push($(this).val());
	});

	if(favorite.length==0)
		{
		alert("select product for receive");
		setTimeout(function()
		         {
				$('#deleteGroup1').focus();
		     	},500);
		return false;
		}
	
	for ( var i = 0; i < favorite.length; i++) {

		if ($("#hiddenProductIdRec" + favorite[i]).val() != null
				|| $("#hiddenProductIdRec" + favorite[i]).val() != "") {
			productId = $("#hiddenProductIdRec" + favorite[i]).val();
		} else {
			alertify.error("Please select Product");
			$("#hiddenProductIdRec" + favorite[i]).focus();
			return false;
		}
		var qty = $("#textQtyRec" + favorite[i]).val();

		if (qty == "" || qty == null) {

			alertify.error("Please Enter Proper Quantity");
		
			setTimeout(function()
			         {
				$("#textQty" + favorite[i]).focus();
			     	},500);
			return false;
		}
		var batchId = $("#hiddenBatchIdRec" + favorite[i]).val();

		if ($("#mrnSlaveIdRec" + favorite[i]).val() != null
				&& $("#mrnSlaveIdRec" + favorite[i]).val() != "") {

			materiallist.mrnSlaves.push({
				mrnSlaveId : $("#mrnSlaveIdRec" + favorite[i]).val(),
				mrnSlaveQty : qty,
				mrnSlavePendingQty : batchId,
				mrnSlaveSr : $("#hiddenStoreSlaveIdRec" + favorite[i]).val(),

				productMaster : {
					'productId' : productId
				}
			});
		}

	}
	materiallist = JSON.stringify(materiallist);

	var inputs = [];

	inputs.push("mrnSlaves=" + materiallist);

	inputs.push("mrnId=" + mrnId);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str,
				global: false, 
				url : "../../pharmacy/mrn/saveReceiveMrn",
			//	url : "../mrn/saveReceiveMrn",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("oops something went wrong related to stock please save proper data or check mrp");
				},
				success : function(r) {
					alert("Record save successfully!");
					location.reload(true);
				}
			});

}

function openStorePopUp() {
	$("#store_pop_up").dialog({
		title : "Store Details",
		modal : true
	});
}

function openStorePopUp1() {
	$("#store_pop_up1").dialog({
		title : "Store Details",
		modal : true
	});
}

function hideModel(){
//	$(".ui-dialog");
}

function splitMRNData(content) {

	if (content != "") {

		$('#txtMrnIssueNo').val(content);
		$('#hiddenMRNIssueId').val(content);

	} else {
		$('#hiddenMRNIssueId').val(0);
	}
}

function editMRN(mrnId) {

	if (mrnId != "" && mrnId != null) {
		var inputs = [];
		inputs.push('mrnId=' + mrnId);

		var str = inputs.join('&');
		jQuery.ajax({
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/mrn/edit",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#box_tab1').prop("class", "tab-pane fade active in");
				$('#box_tab2').prop("class", "tab-pane fade");
				$('#box_tab3').prop("class", "tab-pane fade");

				$('#tab1').removeClass('active');
				$('#tab2').removeClass('active');
				$('#tab3').addClass('active');

				setEditMRNData(r);
			}

		});
	} else {
		alertify.error("please select Record");
	}

	return true;
}

function setEditMRNData(result) {
	$("#hiddenMrnId").val(result.mrnId);
	$("#popup_container2").val(getDate(result.mrnDate));
	$("#mrnStoreId").val(result.mrnStoreId);
	$("#txtOrderNo1").val(result.mrnId);

	$("#txtMrnStoreName").val(result.mrnStoreName);
	$("#txtOrderNo").val(result.mrnDocId);
	$("#mrnRemark").val(result.mrnRemark);
	$("#txtCount").val(result.mrnProductCount);
	$("#txtTime").val(result.mrnTime);

	var divContent = "";
	var mrnSlaves = result.mrnSlaves;
	var totalRowCount = 0;
	for ( var i = 0; i < mrnSlaves.length; i++) {
		divContent = divContent
				+ "<tr id='remove"
				+ (i + 1)
				+ "'><td><center>"
				+ (i + 1)
				+ "</center></td>"
				+ "<td><input type='hidden' name='mrnSlaves["
				+ i
				+ "].productMaster.productId' id='hiddenProductId"
				+ (i + 1)
				+ "' value='"
				+ mrnSlaves[i].productMaster.productId
				+ "'/><input name='mrnSlaves["
				+ i
				+ "].mrnSlaveId' id='mrnSlaveId"
				+ (i + 1)
				+ "' type='hidden' value='"
				+ mrnSlaves[i].mrnSlaveId
				+ "'><input name='mrnSlaves["
				+ i
				+ "].productMaster.productName'  type='text' class='form-control input-SmallText' id='textProductName"
				+ (i + 1)
				+ "' data-toggle='modal' data-target='#Product_Information' onclick='loadPopUp("
				+ (i + 1)
				+ ")' value='"
				+ mrnSlaves[i].productMaster.productName
				+ "' readonly/>"
				+ "</td> <td><input name='mrnSlaves["
				+ i
				+ "].productMaster.productUnit' type='text' class='form-control input-SmallText' id='textUnit"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' value='"
				+ mrnSlaves[i].productMaster.productUnit
				+ "'/></td>"

				+ "<td style='display:none;'><input name='shelf' type='text' class='form-control input-SmallText' id='textShelf"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td style='display:none;'><input name='clStk' type='text' class='form-control input-SmallText' id='textClStk"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input name='mrnSlaves["
				+ i
				+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='textPack"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' value='"
				+ mrnSlaves[i].productMaster.packingMaster.packType
				+ "'/></td> <td><input name='mrnSlaves["
				+ i
				+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='textComp"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' value='"
				+ mrnSlaves[i].productMaster.companyMaster.compName
				+ "' /></td>"

				+ " <td><input name='mrnSlaves["
				+ i
				+ "].mrnSlaveQty' type='text' class='form-control input-SmallText'  id='textQty"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' value='"
				+ mrnSlaves[i].mrnSlaveQty
				+ "' /></td> "

				+ " <td style='display:none'><input name='mrnSlaves["
				+ i
				+ "].mrnSlavePendingQty' type='text' class='form-control input-SmallText'  id='textIssueQty"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' value='"
				+ mrnSlaves[i].mrnSlavePendingQty
				+ "' /></td> "

				+ " <td style='display:none'><input name='mrnSlaves["
				+ i
				+ "].mrnSlavePendingQty' type='text' class='form-control input-SmallText'  id='textStatus"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' value='"
				+ mrnSlaves[i].mrnSlaveStatus
				+ "' /></td> "

				+ "<td><center><input disabled='true' type='checkbox' name='deleteGroup' value='"
				+ (i + 1) + "' id='deleteGroup" + (i + 1)
				+ "'></center></td></tr>";
		/* $("#RowCount").val(i+1); */
		totalRowCount++;
	}

	divContent = divContent
			+ "<input type='hidden' id='hiddenCurrentRow' value='1'><tr id='remove"
			+ (totalRowCount + 1)
			+ "'><td><center>"
			+ (totalRowCount + 1)
			+ "</center></td>"
			+ "<td><input type='hidden' name='mrnSlaves["
			+ totalRowCount
			+ "].productMaster.productId' id='hiddenProductId"
			+ (totalRowCount + 1)
			+ "'/><input name='mrnSlaves["
			+ totalRowCount
			+ "].productMaster.productName'  type='text' class='form-control input-SmallText' id='textProductName"
			+ (totalRowCount + 1)
			+ "' data-toggle='modal' data-target='#Product_Information' onclick='loadPopUp("
			+ (totalRowCount + 1)
			+ ")' />"
			+ "</td> <td><input name='mrnSlaves["
			+ totalRowCount
			+ "].productMaster.productUnit' type='text' class='form-control input-SmallText' id='textUnit"
			+ (totalRowCount + 1)
			+ "' readonly='true' tabindex='-1' /></td>"

			+ "<td style='display:none;'><input name='shelf' type='text' class='form-control input-SmallText' id='textShelf"
			+ (totalRowCount + 1)
			+ "' readonly='true' tabindex='-1' /></td>"

			+ "<td style='display:none;'><input name='clStk' type='text' class='form-control input-SmallText' id='textClStk"
			+ (totalRowCount + 1)
			+ "' readonly='true' tabindex='-1' /></td>"

			+ "<td><input name='mrnSlaves["
			+ totalRowCount
			+ "].productMaster.packingMaster.packType' type='text' class='form-control input-SmallText' id='textPack"
			+ (totalRowCount + 1)
			+ "' readonly='true' tabindex='-1' /></td> <td><input name='mrnSlaves["
			+ totalRowCount
			+ "].productMaster.companyMaster.compName' type='text' class='form-control input-SmallText' id='textComp"
			+ (totalRowCount + 1)
			+ "' readonly='true' tabindex='-1'  /></td>"

			+ " <td style='display:none'><input name='mrnSlaves["
			+ totalRowCount
			+ "].mrnSlavePendingQty' type='text' class='form-control input-SmallText'  id='textIssueQty"
			+ (totalRowCount + 1)
			+ "' readonly='true' tabindex='-1' /></td> "

			+ " <td style='display:none'><input name='mrnSlaves["
			+ totalRowCount
			+ "].mrnSlavePendingQty' type='text' class='form-control input-SmallText'  id='textStatus"
			+ (totalRowCount + 1)
			+ "' readonly='true' tabindex='-1' /></td> "

			+ " <td><input name='mrnSlaves["
			+ totalRowCount
			+ "].mrnSlaveQty' type='text' class='form-control input-SmallText'  id='textQty"
			+ (totalRowCount + 1) + "' readonly='true' tabindex='-1' /></td> "

			+ "<td><center><input type='checkbox' name='deleteGroup' value='"
			+ (totalRowCount + 1) + "' id='deleteGroup" + (totalRowCount + 1)
			+ "'></center></td></tr>";

	$("#DRRDiv").html(divContent);
	$("#RowCount").val(++totalRowCount);
}

// delete Row Code

function deleteRow() {
	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroup']:checked"), function() {
			favorite.push($(this).val());
		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
		}

		for ( var i = 0; i < favorite.length; i++) {
			if ($("#hiddenProductId" + favorite[i]) != null
					&& $('#hiddenProductId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				$("#hiddenProductId" + favorite[i]).val("");
				$("#remove" + favorite[i]).remove();

				$("#txtCount").val(parseFloat($("#txtCount").val()) - 1);

			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
	}
}

function setApprovalDetails() {
	var favorite = [];

	$.each($("input[name='approvalCheckbox']:checked"), function() {
		favorite.push($(this).val());
	});

	if (favorite.length == 0) {
		alert("Please select checkbox to Approval");
	} else {
		$("#authentication_pop_up").dialog({
			title : "Login Details",
			modal : true
		});
	}
}

function fetchStock() {
	$("#box_tab4").show();
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/mrn/fetchStock",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var jsObj = $.parseJSON(r);
			
			$('#box_tab4').prop("class", "tab-pane fade active in");
			
			$('#box_tab1').prop("class", "tab-pane fade");
			$('#box_tab3').prop("class", "tab-pane fade");
			$('#box_tab2').prop("class", "tab-pane fade");
			$('#box_tab5').prop("class", "tab-pane fade");

			$('#tab1').removeClass('active');
			$('#tab3').removeClass('active');
			$('#tab2').removeClass('active');
			$('#tab5').removeClass('active');
			
			$('#tab4').addClass('active');
			
			setStockGridData(jsObj.result);
		}
	});

	return true;
}

function setStockGridData(result) {
	var data = result;
	// prepare the data
	var source = {
		datatype : "json",
		datafields : [ {
			name : 'currentStock',
			type : 'string'
		}, {
			name : 'batchCode',
			type : 'string'
		}, {
			name : 'batchExpDate',
			type : 'string'
		}, {
			name : 'productName',
			type : 'string'
		}, {
			name : 'purRate',
			type : 'string'
		}, {
			name : 'mrp',
			type : 'string'
		}, ],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source, {
		downloadComplete : function(data, status, xhr) {
		},
		loadComplete : function(data) {
		},
		loadError : function(xhr, status, error) {
		}
	});

	$("#divStockList")
			.jqxGrid(
					{
						width : 1100,
						source : dataAdapter,
						columnsresize : true,
						pageable : true,
						theme : 'energyblue',
						showstatusbar : true,
						autoheight : true,
						sortable : true,
						altrows : true,
						enabletooltips : true,
						keyboardnavigation : true,
						renderstatusbar : function(statusbar) {
							// appends buttons to the status bar.
							var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
							var addButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/add.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Add</span></div>");
							var deleteButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/close.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Delete</span></div>");
							var reloadButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/refresh.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Reload</span></div>");
							var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
							container.append(addButton);
							container.append(deleteButton);
							container.append(reloadButton);
							container.append(searchButton);
							statusbar.append(container);
							addButton.jqxButton({
								width : 60,
								height : 20
							});
							deleteButton.jqxButton({
								width : 65,
								height : 20
							});
							reloadButton.jqxButton({
								width : 65,
								height : 20
							});
							searchButton.jqxButton({
								width : 50,
								height : 20
							});
							// add new row.
							addButton.click(function(event) {
								var datarow = generatedata(1);
								$("#jqxgrid").jqxGrid('addrow', null,
										datarow[0]);
							});
							// delete selected row.
							deleteButton.click(function(event) {
								var selectedrowindex = $("#divStockList")
										.jqxGrid('getselectedrowindex');
								var rowscount = $("#divStockList").jqxGrid(
										'getdatainformation').rowscount;
								var id = $("#jqxgrid").jqxGrid('getrowid',
										selectedrowindex);
								$("#jqxgrid").jqxGrid('deleterow', id);
							});
							// reload grid data.
							reloadButton.click(function(event) {
								$("#divStockList").jqxGrid({
									source : dataAdapter
								});
							});
							// search for a record.
							searchButton.click(function(event) {
								var offset = $("#divStockList").offset();
								$("#jqxwindow").jqxWindow('open');
								$("#jqxwindow").jqxWindow('move',
										offset.left + 30, offset.top + 30);
							});
						},
						columns : [ {
							text : 'Product Name',
							datafield : 'productName',
							width : 200
						}, {
							text : 'Batch Code',
							datafield : 'batchCode',
							width : 200
						}, {
							text : 'Batch Exp Date',
							datafield : 'batchExpDate',
							width : 200
						}, {
							text : 'Current Stock',
							datafield : 'currentStock',
							width : 200
						}, {
							text : 'Purchase Rate',
							datafield : 'purRate',
							width : 100
						}, {
							text : 'Mrp',
							datafield : 'mrp',
							width : 200
						}, ],

					});

	$("#jqxwindow").jqxWindow({
		resizable : false,
		autoOpen : false,
		width : 210,
		height : 180
	});
	// create find and clear buttons.
	$("#findButton").jqxButton({
		width : 70
	});
	$("#clearButton").jqxButton({
		width : 70
	});
	// create dropdownlist.
	$("#dropdownlist").jqxDropDownList({
		autoDropDownHeight : true,
		selectedIndex : 0,
		width : 200,
		height : 23,
		source : [ 'Product Name' ]
	});
	if (theme != "") {
		$("#inputField").addClass('jqx-input-' + theme);
	}
	// clear filters.
	$("#clearButton").click(function() {
		$("#divStockList").jqxGrid('clearfilters');
	});
	// find records that match a criteria.
	$("#findButton")
			.click(
					function() {
						$("#divStockList").jqxGrid('clearfilters');
						var searchColumnIndex = $("#dropdownlist")
								.jqxDropDownList('selectedIndex');
						var datafield = "";
						switch (searchColumnIndex) {
						case 0:
							datafield = "productName";
							break;
						}
						var searchText = $("#inputField").val();
						var filtergroup = new $.jqx.filter();
						var filter_or_operator = 1;
						var filtervalue = searchText;
						var filtercondition = 'contains';
						var filter = filtergroup.createfilter('stringfilter',
								filtervalue, filtercondition);
						filtergroup.addfilter(filter_or_operator, filter);
						$("#divStockList").jqxGrid('addfilter', datafield,
								filtergroup);
						// apply the filters.
						$("#divStockList").jqxGrid('applyfilters');
					});
}

function storeMrnPrint(storeMrnId) {
	window.open("../../pharmacy/mrn/printView?mrnId=" + storeMrnId
			+ "");

}

function splitStoreDetail(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtStoreName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenStoreId').val(arr[1]);

		}
	} else {
		$('#hiddenStoreId').val(0);

	}
}

function searchMRNIssueByStore(storeId) {

	if (storeId != null && storeId != "") {
		var inputs = [];
		inputs.push('storeId=' + storeId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str,
			url : "../../pharmacy/mrn/storeWiseMrnByStoreId",
			//url : "../mrn/storeWiseMrnByStoreId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setTableData(r);
			}
		});
	} else {
		alertify.error("Enter Store Name First");
	}
}
function setTableData(result) {
	var divContent = "";

	for ( var i = 0; i < result.length; i++) {
		divContent = divContent + " <tr><td class='col-md-1 center'>" + (i + 1)
				+ "</td>";
		divContent = divContent + "<td class='col-md-2 center'>"
				+ result[i].mrnId + "<input type='hidden' id='MrnId"
				+ result[i].mrnId + "' value='" + result[i].mrnId + "'></td>";

		divContent = divContent + "<td class='col-md-2 center'>"
				+ result[i].mrnDocId + "<input type='hidden' id='DocNo"
				+ result[i].mrnId + "' value='" + result[i].mrnDocId
				+ "'></td>";

		divContent = divContent + "<td class='col-md-2 center'>"
				+ getDate(result[i].mrnDate) + "</td>";

		divContent = divContent + "<td class='col-md-2 center'>"
				+ result[i].mrnStatus + "<input type='hidden' id='Status"
				+ result[i].mrnId + "' value='" + result[i].mrnStatus
				+ "'></td>";

		divContent = divContent + "<td class='col-md-2 center'>"
				+ result[i].mrnApprovedBy + "</td>";

		/*
		 * if (result[i].MrnApproved == 0) { divContent = divContent + "Not
		 * Approved</td>"; } else { divContent = divContent + "Approved</td>"; }
		 */

		divContent = divContent
				+ "<td class='col-md-2 center'> <a id='btnPrint"
				+ "' class='btn btn-xs btn-success' "
				+ " onclick='storeMrnPrint(" + result[i].mrnId
				+ ")' > <i class='fa fa-print'></i> </a> </td>";

		if (result[i].mrnStatus == 'complete') {
			divContent = divContent
					+ "<td class='col-md-2 center'> <a id='btnPrint"
					+ "' class='btn btn-xs btn-success' " + " onclick=editMRN("
					+ result[i].mrnId
					+ ") disabled><i class='fa fa-edit'></i> </a> </td>";
		} else {
			divContent = divContent
					+ "<td class='col-md-2 center'> <a id='btnPrint"
					+ "' class='btn btn-xs btn-success' " + " onclick=editMRN("
					+ result[i].mrnId
					+ ")><i class='fa fa-edit'></i> </a> </td>";
		}

		if (result[i].mrnStatus == 'complete'
				|| result[i].mrnStatus == 'In Process') {
			divContent = divContent
					+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteIndent("
					+ result[i].mrnId
					+ ")' value='DELETE' disabled> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
		} else {
			divContent = divContent
					+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteMRN("
					+ result[i].mrnId
					+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
		}

	}
	$('#divMRNList').html(divContent);
}
