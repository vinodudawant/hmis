/*var tempforLab = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Report Due Date</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Value</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Repart</div></th>"
		+ "	</tr></thead><tbody div  >"
		+ " {#foreach $T.trmli as trmli}<tr>"
		+ "<td class='filterable-cell'>{count++}.</td>" 
		+ "<td class='filterable-cell'>{$T.trmli.tmcoll}</td>"
		+ "<td class='filterable-cell'>{$T.trmli.tmdd}</td>"
		+ "<td class='filterable-cell'>{$T.trmli.objp.pini}{$T.trmli.objp.pnm}</td>"
		+ "<td class='filterable-cell'>{$T.trmli.objp.pag}{$T.trmli.objp.pagty}</td>"
		+ "<td class='filterable-cell'>{$T.trmli.objp.psx}</td>"
		+ "<td class='numeric filterable-cell'><input onclick='viewTestforResult({$T.trmli.tmid})'	style='font-size: 10px;' type='button' value='ROUTINE VALUES' class='edit' /></td>"
		+ "<td class='numeric filterable-cell'><input						onclick='viewPathalogyPatientReport({$T.trmli.tmid})'						style='font-size: 10px;' type='button' value='ROUTINE REPORT'						class='edit' /></td>"
		+ "</tr>{#/for}";*/
var tempforLab = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Item Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Contact Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Basic Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Account Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Freight Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Repart</div></th>"
		+ "	</tr></thead><tbody div  >";
function getSalesQuotationDashboard(type) {
	if (type == "onload") {
		var pobj1;
		$("#patientcontainer").setTemplate(tempforLab);
		$("#patientcontainer").processTemplate(pobj1);
	}
}

var ItemInfoList = "<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td>";

function setItemInfotr() {

	$("#ItemInfoTable > tbody")
			.append(
					"<tr><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td>");

}

function setItemInfoGoodsIssue() {

	$("#ItemInfoTable > tbody")
			.append(
					"<tr> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td>");
}
function setItemInfoGoodsReceipt() {

	$("#ItemInfoTable > tbody")
			.append(
					"<tr> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td>");
}
function addBasicInfo() {
	$("#BasicInfoTable > tbody")
			.append(
					"<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='trowCountext'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><tr>");
}
function addAccountInfo() {
	$("#AccountInfoTable > tbody")
			.append(
					"	<tr><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td></tr>");
}
function addFreightDetails() {
	$("#FreightDetailsTable > tbody")
			.append(
					"	<tr><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td></tr>");
}

function toRemovesetItemInfotrMRN(tblSubContractingCountRow) {
	// alert(tblSubContractingCountRow);
	var tblSubContractingCountRow1 = $("#txtMRNID").val();
	// $("#totalRow").val(tblSubContractingCountRow1);
	var oldrow = $("#totalRow").val();

	// alert(tblSubContractingCountRow1);

	var temp = tblSubContractingCountRow1;
	var p = 1;
	for (var i = 0; i < tblSubContractingCountRow1; i++) {
		// alert(p);

		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			$("#deleterows" + p + " ").remove();
			// alert(p);
			temp = temp - 1;

			$("#txtMRNID").val(temp);
		}

		p++;

	}

	totalDocQty();
	chcknulldocQty();
	var tblSubContractingCountRow1 = $("#txtMRNID").val();
	$("#totalRow").val(tblSubContractingCountRow1);

}
var count = 1;
var test = 0;
var totalQty;

function setMaterialRequestInfo() {

	if (test > 0) {
		if (count == 1) {
			count = test;
		}

		count++;

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td><input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' onkeypress='return validateOnlyName(event);' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "'  value='0' /> </div></td> </td><td><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td><td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option value = '0'>Select</option></select></td>  <td><input type='text' id='txtIssuedQty"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' readonly='readonly' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td> <td><input onclick='getMRNItemAvailableListDetails("
								+ count
								+ ")' "
								+ "type='button' data-toggle='modal' data-target='#MRNFormList' value='Check' id='iCheckAvailabilty"
								+ count
								+ "'class='btn btn-xs btn-success'></td><td><input onclick='updateBatchStockQty("
								+ count + ")' "
								+ "type='button' value='accept' id='accept"
								+ count
								+ "'class='btn btn-xs btn-success'></td>");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");

		/* totalDocQty(); */
	} else {

		$("#ItemInfoTable > tbody")
				.append(
						"<tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td><input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' onkeypress='return validateOnlyName(event);' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "'  value='0' /> </div></td> </td><td><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td><td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option >Select</option></select></td>  <td><input type='text' id='txtIssuedQty"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' readonly='readonly' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td> <td><input onclick='getMRNItemAvailableListDetails("
								+ count
								+ ")' "
								+ "type='button' data-toggle='modal' data-target='#MRNFormList' value='Check' id='iCheckAvailabilty"
								+ count
								+ "'class='btn btn-xs btn-success'></td><td><input onclick='updateBatchStockQty("
								+ count + ")' "
								+ "type='button' value='accept' id='accept"
								+ count
								+ "'class='btn btn-xs btn-success'></td>");
		$("#txtMRNID").val(count);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
		count++;
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);

		readonly = 'readonly'

	}
	/* totalDocQty(); */

}

function setenableDiseble() {
	// alert("hii sudhir");
	var totalQty;
	var txtMRNID = $("#txtMRNID").val();
	var totalRow = $("#totalRow").val();
	for (var i = 1; i <= totalRow; i++) {

		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
		// alert(totalQty);
		if (totalQty == 0) {

			document.getElementById("chkbox" + i).disabled = true;
			document.getElementById("accept" + i).disabled = true;
			/* document.getElementById("iCheckAvailabilty" + i).disabled = true; */
			document.getElementById("txtinventoryMaterailRequestNoteItemcode_"
					+ i).disabled = true;
			document
					.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
							+ i).disabled = true;
			/*
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorone"+
			 * i).disabled = true;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo"+
			 * i).disabled = true;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorthree"+
			 * i).disabled = true;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorfoure"+
			 * i).disabled = true;
			 */
			// document.getElementById("checkbox"+ i).disabled = true;

		} else {
			document.getElementById("accept" + i).disabled = false;
			/* document.getElementById("iCheckAvailabilty"+ i).disabled = false; */
			document.getElementById("txtinventoryMaterailRequestNoteItemcode_"
					+ i).disabled = false;
			document
					.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
							+ i).disabled = false;
			/*
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorone"+
			 * i).disabled = false;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo"+
			 * i).disabled = false;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorthree"+
			 * i).disabled = false;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorfoure"+
			 * i).disabled = false;
			 */
		}

	}

}

function fetchMaterialRequestNoteDetailsInGoodsIssue() {
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			$("#txtGoodsIssueIssueTo")
					.setTemplate(selInventoryDocumentTemplate);
			$("#txtGoodsIssueIssueTo").processTemplate(pobj1);

			$("#MRNAjaxResp").html(r);
		}
	});
}

var selInventoryDocumentTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '2'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '3'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open'||$T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'}"
		+ "{#if $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status == 'level-II' || $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status == 'level-III' }"
		+ "<option  value='{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</option>"
		+ "{#/if}" + "{#/if}{#/for}";
/*
 * var selInventoryDocumentTemplate = "<option value='Select'>-Select-</option>" +
 * "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '2'||
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '3'||
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ==
 * 'open'||$T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'}" + "<option
 * value='{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</option>"
 *  + "{#/if}{#/for}";
 */
function refreshPopUp() {
	$('#Goods_Issue').find('input:text').val('');
	$('#Goods_Issue').find('textarea').val('');

	// getNextMaterialRequestNoteId();

	$("#ItemInfoTable > tbody").html('');
	$("#txtMRNTotal").val("");
	$("#txtGoodsIssueRemark").val("");
	$("#txtMRNItemName").val("");
	$("#txtGoodsIssueTotalDocQty").val("");
	$("#txtfactor1").val("");
	$("#txtfactor2").val("");
	$("#txtfactor3").val("");
	$("#txtfactor4").val("");
	window.location.reload("inventory_Goods_Issue.jsp");

}
function goodsIssueRefresh()

{
	$('#Goods_Issue').find('input:text').val('');
	$('#Goods_Issue').find('textarea').val('');
	$('#Goods_Issue').find('input:hidden').val('');

	$("#ItemInfoTable > tbody").html('');
	$("#txtMRNTotal").val("");
	$("#txtGoodsIssueRemark").val("");
	$("#txtMRNItemName").val("");
	$("#txtGoodsIssueTotalDocQty").val("");
	isNew = 0;
	count = 1;

	// fetchMaterialRequestNoteDetailsInGoodsIssue();

}

/**
 * *** old gi befor Edit
 * 
 * @Date6feb2016
 */
/*
 * function viewMRNDetails(MrnId) {
 * 
 * goodsIssueRefresh();
 * 
 * if (MrnId == null || MrnId == "") { alert("Please enter Proper Item Id Id");
 * $("#byName").focus(); return false; }
 * 
 * var obj = $("#MRNAjaxResp").html(); objMrnMaster = JSON.parse(obj);
 * 
 * for ( var i = 0; i <
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) { if
 * (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
 * $("#txtGoodsIssueDocNo").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
 * var
 * str=(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date).split("-");
 * var goodsIssueDate=str[2]+"-"+str[1]+"-"+str[0];
 * $("#txtGoodsIssueDate").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
 * $("#txtGoodsIssueTotalDocQty") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
 * $("#txtGoodsIssueRemark") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);
 * 
 * $("#txtMRNLocationName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);
 * 
 * $("#txtReceiverName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);
 * 
 * $("#sclMRNLocation
 * option:selected").text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location); } }
 * 
 * var inputs = []; inputs.push('action=getMaterialRequestNoteSlaveDetails');
 * inputs.push('isEdit=no'); var txtmaterialReqaestNoteDocId =
 * $("#txtmaterialReqaestNoteDocId").val(); //
 * alert(txtSubContractingMaterialIssueDocNo);
 * inputs.push('txtmaterialReqaestNoteDocId=' + MrnId); var str =
 * inputs.join('&'); jQuery .ajax({ async : true, type : "POST", data : str +
 * "&reqType=AJAX", url : "InventoryServlet", timeout : 1000 * 60 * 5, catche :
 * false, error : function() { alert("error"); }, success : function(r) {
 *  // alert(r); pobj1 = eval('(' + r + ')'); // alert(r); var lenghtofpobj =
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; //
 * alert(lenghtofpobj);
 * 
 * var count = 1; for ( var k = 0; k <
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
 * 
 * $("#ItemInfoTable > tbody") .append( " <tr id ='deleterows" + count + "' >
 * <td> <input type='checkbox' id='chkbox"+count+ "' > </td> <td><input
 * type='text' id='txtSrNo" + count + "' name='txtSrNo' value=" + count + "
 * class='form-control input-SmallText'> <input type='hidden'
 * id='txtinventoryMaterailRequestNote" + count + "'
 * name='txtinventoryMaterailRequestNote' value=" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id + "
 * class='form-control input-SmallText'></td> <td><div
 * style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>" + "<input
 * type='text' id='txtinventoryMaterailRequestNoteItemcode_" + count + "' " +
 * "onkeyup='autoSuggest(this.id,onchange)' onkeypress='return
 * validateOnlyName(event);' class='typeahead form-control input-SmallText'
 * value='" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name + "' />
 * <input type='hidden' id='txtMRNItemcodeId" + count + "' value=" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code + " /></div></td>
 * <td><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity" +
 * count + "' class='form-control input-SmallText' onkeyup='chcknulldocQty()'
 * onkeypress='return validateNumbers(event)' value='" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty +
 * "'></td> <td id='xyz'><select onclick=getSalesDetailsOnChange(this.id);
 * class='form-control input-SmallText' id='selItemQty_"+count+"'><option
 * selected=selected
 * >"+pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty+"</option></select></td>
 * <td><input type='text' id='txtIssuedQty" + count + "' readonly='readonly'
 * class='form-control input-SmallText'value='" + "' ><input type='hidden'
 * id='txtinventoryMaterailRequestNoteIssueQuantity"+count+"'
 * value='"+pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty+"'
 * class='form-control input-SmallText' ></td><td><input
 * onclick='getMRNItemAvailableListDetails(" + count + ")' " + "type='button'
 * data-toggle='modal' data-target='#MRNFormList' value='Check'
 * id='iCheckAvailabilty" + count + "'class='btn btn-xs btn-success'></td><td><input
 * onclick='updateBatchStockQty(" + count + ")' " + "type='button'
 * value='accept' id='accept" + count + "'class='btn btn-xs btn-success'></td>");
 * 
 * $("#txtMRNID").val(count); count++; test++;
 *  }
 * 
 * var tblSubContractingCountRow1 = $("#txtMRNID").val();
 * $("#totalRow").val(tblSubContractingCountRow1);
 * 
 * totalDocQty(); setenableDiseble();
 * 
 *  }
 * 
 * });
 * 
 *  }
 */

/*
 * **** new alertd issue mrn in Goods Issue 6 feb 2016 modified @Date
 * 27jully2016 @Author Mr Sudhir jadhav Adding new column as Requested Item Qty
 * which fixed mrn qty* *
 */
function viewMRNDetails(MrnId) {
	goodsIssueRefresh();
	if (MrnId == null || MrnId == "") {
		alert("Please enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	var obj = $("#MRNAjaxResp").html();
	objMrnMaster = JSON.parse(obj);
	for (var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtGoodsIssueDocNo")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
			var str = (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date)
					.split("-");
			var goodsIssueDate = str[2] + "-" + str[1] + "-" + str[0];
			$("#txtGoodsIssueDate")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
			$("#txtGoodsIssueTotalDocQty")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
			$("#txtGoodsIssueRemark")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);

			$("#txtMRNLocationName")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);

			$("#txtReceiverName")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);

			$("#sclMRNLocation option:selected")
					.text(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
			$("#subInventoryId")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_subinventory_id);
			break;

		}
	}

	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteDocId").val();
	// alert(txtSubContractingMaterialIssueDocNo);
	inputs.push('txtmaterialReqaestNoteDocId=' + MrnId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					// alert(r);
					pobj1 = eval('(' + r + ')');
					// alert(r);
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
					// alert(lenghtofpobj);
					var count = 1;
					for (var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
						var mrnActualItemQty = parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty)
								+ parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory);
						$("#ItemInfoTable > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' > <td> <input type='checkbox'  name='checkbox"
												+ count
												+ "' onclick='chkForAccept("
												+ count
												+ ")'  id='chkbox"
												+ count
												+ "'> </td> <td><input type='text' id='txtSrNo"
												+ count
												+ "' name='txtSrNo'  value="
												+ count
												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtinventoryMaterailRequestNote"
												+ count
												+ "' name='txtinventoryMaterailRequestNote'  value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
												+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;width:200px;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
												+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
												+ count
												+ "' "
												+ "onkeyup='autoSuggest(this.id,onchange)' onkeypress='return validateOnlyName(event);' class='typeahead form-control input-SmallText' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
												+ "' readonly='readonly'/> <input type='hidden'  id='txtMRNItemcodeId"
												+ count
												+ "' value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
												+ " /></div></td> <td><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
												+ count
												+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' readonly='readonly' onkeypress='return validateNumbers(event)' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
												+ "'></td><td><input type='text' readonly='' id='mrnActualItemQty"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ mrnActualItemQty
												+ "'></td> <td id='xyz'><select style='width:60px;' onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "'><option selected=selected >"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
												+ "</option></select></td>  <td><input type='text' id='txtIssuedQty"
												+ count
												+ "' class='form-control input-SmallText'value='"
												+ "' onkeypress='var status=validateNumbers(event); return status;' onkeyup='checkValueZero(this.id)' ><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
												+ count
												+ "'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' class='form-control input-SmallText' ></td><td><input type='text' id='txtcurrentSubInventoryStock"
												+ count
												+ "' readonly=''  class='form-control input-SmallText'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].currentSubInventoryStock
												+ "' > <td><input type='text' id='txtmainInventoryStock"
												+ count
												+ "' readonly=''  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mainInventoryStock
												+ "' class='form-control input-SmallText' ></td><td><input onclick='updateBatchStockQty("
												+ count
												+ ")' "
												+ "type='button' value='accept' id='accept"
												+ count
												+ "'class='btn btn-xs btn-success'></td>");

						$("#txtMRNID").val(count);
						if (pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mainInventoryStock == 0) {
							$("#txtIssuedQty" + count).val(0);
							document.getElementById("txtIssuedQty" + count).disabled = true;
						}
						count++;
						test++;

					}

					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);

					totalDocQty();
					setenableDiseble();
					checkSession();

				}

			});

}


//function checkValueZero(obj)
//{
//
//	if(parseInt(obj.value)==0)
//		{
//		alert("Quantity should not be 0");
//		obj.value="";
//		document.getElementById(obj.id).focus(); 
//		//$(obj.id).focus();
//		return false;
//		}
//}

/* ********* new alertd issue mrn in Goods Issue 6 feb 2016 ********** */
/*
 * function viewMRNDetails(MrnId) {
 * 
 * if (MrnId == null || MrnId == "") { alert("Please enter Proper Item Id Id");
 * $("#byName").focus(); return false; } $('#iToHideBtns').css('display',
 * 'block'); refreshviewmrnl(); var obj = $("#MRNAjaxResp").html(); objMrnMaster =
 * JSON.parse(obj);
 * 
 * for ( var i = 0; i <
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) { if
 * (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
 * $("#txtmaterialReqaestNoteListDocId") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
 *//**
	 * *******************************date convert
	 * ***husen*********************************
	 */
/*
 * 
 * 
 * var str = (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date)
 * .split("-"); var mrnreqDate = str[2] + "-" + str[1] + "-" + str[0];
 * 
 * 
 * 
 * $("#txtmaterialReqaestNoteDocDate") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
 * $("#txtMRNTotal") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
 * $("#txtMRNRemark") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);
 * 
 * $("#txtMRNLocationName") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);
 * 
 * $("#txtReceiverName") .val(
 * objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);
 * 
 * 
 * $("#sclMRNLocation option:selected")
 * .text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
 *  } }
 * 
 * var inputs = []; inputs.push('action=getMaterialRequestNoteSlaveDetails');
 * inputs.push('isEdit=no'); var txtmaterialReqaestNoteDocId =
 * $("#txtmaterialReqaestNoteListDocId") .val(); //
 * alert(txtSubContractingMaterialIssueDocNo);
 * inputs.push('txtmaterialReqaestNoteDocId=' + txtmaterialReqaestNoteDocId);
 * var str = inputs.join('&'); jQuery .ajax({ async : true, type : "POST", data :
 * str + "&reqType=AJAX", url : "InventoryServlet", timeout : 1000 * 60 * 5,
 * catche : false, error : function() { alert("error"); }, success : function(r) {
 * pobj1 = eval('(' + r + ')'); var lenghtofpobj =
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
 * 
 * var count = 1; for ( var k = 0; k <
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
 * $("#ItemInfoTable > tbody") .append( " <tr id ='deleterows" + count + "' >
 * <td> <input type='checkbox' name='checkbox" + count + "'
 * onclick='chkForAccept(" + count + ")' id='chkbox" + count + "'> </td> <td><input
 * type='text' id='txtSrNo" + count + "' name='txtSrNo' value=" + count + "
 * class='form-control input-SmallText'> <input type='hidden'
 * id='txtinventoryMaterailRequestNote" + count + "'
 * name='txtinventoryMaterailRequestNote' value=" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id + "
 * class='form-control input-SmallText'></td> <td><div
 * style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>" + "<input
 * type='text' id='txtinventoryMaterailRequestNoteItemcode_" + count + "' " +
 * "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control
 * input-SmallText' readonly='' value='" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name + "' />
 * <input type='hidden' id='txtMRNItemcodeId" + count + "' value=" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code + " /></div></td>
 * <td><input type='text' readonly=''
 * id='txtinventoryMaterailRequestNoteDocQuantity" + count + "'
 * class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty +
 * "'></td> <td id='xyz'><select onclick=getSalesDetailsOnChange(this.id);
 * class='form-control input-SmallText' id='selItemQty_" + count + "'><option
 * selected=selected >" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty + "</option></select></td>
 * <td><input type='text' id='txtIssuedQty" + count + "' class='form-control
 * input-SmallText' ><input type='hidden'
 * id='txtinventoryMaterailRequestNoteIssueQuantity" + count + "' value='" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty + "'
 * class='form-control input-SmallText' ></td> <td><input type='text'
 * id='txtcurrentSubInventoryStock" + count + "' readonly='' class='form-control
 * input-SmallText' value='" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].currentSubInventoryStock + "' >
 * <td><input type='text' id='txtmainInventoryStock" + count + "' readonly=''
 * value='" +
 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mainInventoryStock + "'
 * class='form-control input-SmallText' ></td><td><input
 * onclick='updateBatchStockQty(" + count + ")' " + "type='button'
 * value='accept' id='accept" + count + "'class='btn btn-xs btn-success'></td>");
 * 
 * $("#txtMRNID").val(count); count++; test++;
 *  }
 * 
 * totalDocQty(); setEditSave();
 * 
 * 
 * 
 * var tblSubContractingCountRow1 = $("#txtMRNID").val();
 * $("#totalRow").val(tblSubContractingCountRow1);
 * 
 * 
 * //checkSession();
 *  }
 * 
 * });
 *  }
 */

/**
 * *******change values on edit Quntityiteams modified
 * 
 * @Date27jully2016
 * @author Mr Sudhirjadhav*******
 */

function getSalesDetailsOnChange(id, count) {
	// alert(id);

	/* alert(selItemQtyval); */
	var arrValue = (id).split("_");
	var idValue = (arrValue[1]);
	var txtMRNItemcodeId = $("#txtMRNItemcodeId" + idValue).val();
	var selItemQtyval = $("#selItemQty_" + idValue + " option:selected").text();

	var inputs = [];
	inputs.push('action=fetchItemSalesDetail');
	inputs.push('itemId=' + txtMRNItemcodeId);
	inputs.push('isId=yes');
	var str = inputs.join('&');
	// docuemntAjaxResp
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			// alert(r);
			r = $.parseJSON(r);

			/* pobj1 = eval('(' + r + ')'); */

			// alert(selItemQtyval);
			var newData = "<option value=''>" + selItemQtyval + "</option>";
			for (var i = 0; i < +r.ltInventoryItemSaleDTOs.length; i++) {
				var data = "";

				data = "<option value="
						+ r.ltInventoryItemSaleDTOs[i].item_sales_id + ">"
						+ r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom1
						+ "</option>" + "<option value="
						+ r.ltInventoryItemSaleDTOs[i].item_sales_id + ">"
						+ r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom2
						+ "</option>" + "<option value="
						+ r.ltInventoryItemSaleDTOs[i].item_sales_id + ">"
						+ r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom3
						+ "</option>" + "<option value="
						+ r.ltInventoryItemSaleDTOs[i].item_sales_id + ">"
						+ r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom4
						+ "</option>";
				newData += data;

			}
			$("#" + id).html(newData);

			/*
			 * $("#"+id).setTemplate(selInventorySalesDetailsTemplateforMRNOnEdit);
			 * $("#"+id).processTemplate(pobj1);
			 */
		}
	});

}
/*******************************************************************************
 * ************************************************get item total quantity
 ******************************************************************************/
/*
 * function getMRNItemAvailableListDetails(count) {
 * 
 * var txtinventoryMatertotalQtyailRequestNoteItemcode = $(
 * "#txtinventoryMaterailRequestNoteItemcode" + count).val();
 * $("#txtinventoryMaterailRequestNoteItemcode" + count).val(
 * txtinventoryMaterailRequestNoteItemcode); var hiddenCount =
 * $("#hiddenCount").val(count);
 * 
 * var inputs = []; inputs.push('action=MRNItemAvailableListInBatchDetails');
 * inputs.push('ItemName=' + txtinventoryMaterailRequestNoteItemcode); var str =
 * inputs.join('&'); jQuery.ajax({ async : true, type : "POST", data : str +
 * "&reqType=AJAX", url : "InventoryServlet", timeout : 1000 * 60 * 5, catche :
 * false, error : function() { alert("error"); }, success : function(r) { pobj1 =
 * eval('(' + r + ')'); // alert(pobj1.ltbatchstockDTO[0].avialbleItem);
 * $("#totalItemQty").val(pobj1.ltbatchstockDTO[0].avialbleItem);
 *  } });
 *  }
 */

function getMRNItemAvailableListDetails(count) {

	var txtinventoryMaterailRequestNoteItemcode = $("#txtMRNItemcodeId" + count)
			.val();
	$("#txtinventoryMaterailRequestNoteItemcode" + count).val(
			txtinventoryMaterailRequestNoteItemcode);
	var hiddenCount = $("#hiddenCount").val(count);

	var inputs = [];
	inputs.push('action=MRNItemAvailableListInBatchDetails');
	inputs.push('ItemName=' + txtinventoryMaterailRequestNoteItemcode);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			// alert(pobj1.ltbatchstockDTO[0].avialbleItem);
			// alert(r)
			$("#totalItemQty").val(
					pobj1.ltInventoryBatchStockDTO[0].avialbleItem);

			var totalItemQty = $("#totalItemQty").val();

			if (totalItemQty == 0) {
				document.getElementById("requiredQty").disabled = true;
			} else {
				document.getElementById("requiredQty").disabled = false;
			}

		}
	});

}

function saveGoodsIssue() {
	
	
	// General Info
	// deductStock();
	totalDocQty();
	var totalRow = $("#totalRow").val();

	var txtmaterialReqaestNoteId = $("#txtGoodsIssueDocNo").val();

	var txtDocNo = $("#txtGoodsIssueDocNo").val();
	// alert(txtDocNo);
	var txtDocDate = $("#txtGoodsIssueDate").val();
	var txtMRNTotal = $("#txtGoodsIssueTotalDocQty").val();
	var txtMRNRemark = $("#txtGoodsIssueRemark").val();
	var txtMRNLocationName = $("#txtMRNLocationName").val();
	var sclMRNLocation = $("#sclMRNLocation option:selected").text();
	var txtGoodsIssueIssueTo = $("#txtGoodsIssueIssueTo").val();
	var txtReceiverName = $("#txtReceiverName").val();
	var subInventoryId = $("#subInventoryId").val();

	if (txtGoodsIssueIssueTo == 0 || txtGoodsIssueIssueTo == 'Select') {
		alert("Please select MRN No to issue");
		$("#txtGoodsIssueIssueTo").focus();
		return false;
	}

	var txtMRNID = $("#txtMRNID").val();
	// alert(txtMRNID);
	// var flag = $("#flag").val();
	var status = 'hold';
	var materiallist = {
		inventoryMaterialRequestNoteItemInfoSlaveDTO : []
	};

	for (var i = 1; i <= txtMRNID; i++) {
		var aceeptchk = $("#chkbox" + i).prop("checked");
		var totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i)
				.val();
		if (totalQty > 0) {
			if (aceeptchk == false) {
				alert("Please Accept Quantity in " + i + " Row !!");
				$("#accept" + i).focus();
				$("#txtaccptsave").val(1);
				return false;

			}
		}

		$("#txtaccptsave").val(0);
		if ($("#txtinventoryMaterailRequestNote" + i).val() != null
				&& $("#txtinventoryMaterailRequestNote" + i).val() != undefined) {
			var txtinventoryMaterailRequestNote = $(
					"#txtinventoryMaterailRequestNote" + i).val();

			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i).val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();

			var txtMRNDocQuantity = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i).val();

			var txtIssuedQty = $("#txtIssuedQty" + i).val();
			var txtinventoryMaterailRequestNoteIssueQuantity = $(
					"#txtinventoryMaterailRequestNoteIssueQuantity" + i).val();
			if (txtIssuedQty == null || txtIssuedQty == undefined
					|| txtIssuedQty == '') {
				/*
				 * txtIssuedQty = parseInt(txtIssuedQty) +
				 * parseInt(txtinventoryMaterailRequestNoteIssueQuantity);
				 */
				txtIssuedQty = txtinventoryMaterailRequestNoteIssueQuantity;
			} else {
				txtIssuedQty = parseInt(txtIssuedQty)
						+ parseInt(txtinventoryMaterailRequestNoteIssueQuantity);
			}
			/*
			 * var txtfactor1 = $("#txtinventoryMaterailRequestNoteFactorone" +
			 * i) .val(); var txtfactor2 =
			 * $("#txtinventoryMaterailRequestNoteFactortwo" + i) .val(); var
			 * txtfactor3 = $("#txtinventoryMaterailRequestNoteFactorthree" + i)
			 * .val(); var txtfactor4 =
			 * $("#txtinventoryMaterailRequestNoteFactorfoure" + i).val();
			 */
			if (txtMRNItemName == "" || txtMRNItemName == null) {

				alert("Please enter item name in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteItemcode_" + i).focus();
				return false;

			}
			if (txtMRNDocQuantity == "" || txtMRNDocQuantity == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).focus();
				return false;

			}

			var selItemQty = $("#selItemQty_" + i + " option:selected").text();

			if (selItemQty == 0 || selItemQty == '-Select-') {
				alert("Please select uom in " + i + " row");
				$("#selItemQty_").focus();
				return false;
			}

			/*
			 * var txtIssuedQty = $("#txtIssuedQty"+ i).val();
			 * 
			 * if(txtIssuedQty == null || txtIssuedQty == undefined ||
			 * txtIssuedQty == '') { txtIssuedQty = 0; }
			 */
			materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.push({

				mrn_item_info_slave_id : txtinventoryMaterailRequestNote,
				mrn_item_info_slave_item_name : txtMRNItemName,
				mrn_item_info_slave_item_code : txtMRNItemcodeId,
				mrn_item_info_slave_doc_qty : txtMRNDocQuantity,
				// mrn_item_info_slave_item_name : txtMRNItemName,
				/*
				 * mrn_item_info_slave_item_factor1 : txtfactor1,
				 * mrn_item_info_slave_item_factor2 : txtfactor2,
				 * mrn_item_info_slave_item_factor3 : txtfactor3,
				 * mrn_item_info_slave_item_factor4 : txtfactor4,
				 */
				mrn_item_info_slave_item_selItemQty : selItemQty,
				mrn_item_info_slave_issue_qty : txtIssuedQty,
				mrn_item_info_slave_update_date : new Date(),
				mrn_item_info_slave_create_date : new Date()

			});

		}
	}

	materiallist = JSON.stringify(materiallist);
	var inputs = [];
	/* inputs.push('action=SaveGoodsIssue'); */
	inputs.push('action=SaveMaterialRequestNoteDetails');
	// General Info
	inputs.push("materiallist=" + materiallist);
	inputs.push('txtMRNID=' + txtMRNID);
	inputs.push('txtDocNo=' + txtDocNo);
	inputs.push('txtDocDate=' + txtDocDate);
	inputs.push('txtMRNTotal=' + txtMRNTotal);
	inputs.push('txtMRNRemark=' + txtMRNRemark);
	inputs.push('txtMRNLocationName=' + txtMRNLocationName);
	inputs.push('sclMRNLocation=' + sclMRNLocation);
	inputs.push('txtReceiverName=' + txtReceiverName);
	inputs.push('subInventoryId=' + subInventoryId);

	inputs.push('status=' + status);
	// inputs.push('flag=' + flag);
	inputs.push('txtmaterialReqaestNoteId=' + txtmaterialReqaestNoteId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			if (r == "1") {
				deductStock();
				alert("Record saved successfully..!");
			} else {
				alert(r);
			}

			$('#MRNForm').removeClass('fade');
			$('#MRNForm').modal('hide');
			window.location.reload("inventory_Goods_Issue.jsp");
		}
	});
}

function issueQtyAssign() {

	var hiddenCount = $("#hiddenCount").val();
	// alert(hiddenCount);
	var requiredQty = $("#requiredQty").val();
	var totalItemQty = $("#totalItemQty").val()
	var docqty = $("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount)
			.val();

	var requiredQtyfinal = parseInt(requiredQty);
	var totalItemQtyFinal = parseInt(totalItemQty);

	if (requiredQtyfinal > totalItemQtyFinal) {
		alert("Required Items are less then Available Items ");
		$("#requiredQty").focus();
		return false;
	}

	/*
	 * if(requiredQty > totalItemQty) { alert("Required Items are less then
	 * Available Items "); $("#requiredQty").focus(); return false; }
	 */

	/*
	 * if(requiredQty < docqty ) { alert("Required Items are less then Item
	 * Quantity "); $("#requiredQty").focus(); return false; }
	 */

	var txtIssuedQty = $("#txtIssuedQty" + hiddenCount).val(requiredQty);

	// alert(docqty);
	var reqridQty = $("#requiredQty").val();
	if (reqridQty == 0 || reqridQty == null) {
		alert("Please enter required quantity");
		$("#requiredQty").focus();
		return false;
	} else {
		$('#MRNFormList').removeClass('fade');
		$('#MRNFormList').modal('hide');
	}

	// alert(reqridQty);
	var remainitemqty = docqty - reqridQty;
	// alert(remainitemqty);
	$("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount).val(
			remainitemqty);
	if (remainitemqty < 0) {
		alert("Required Quantity should not gerater then Item Quantity");
		$("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount).val(
				docqty);
		$("#txtIssuedQty" + hiddenCount).val("");
		return false;
	}

	totalDocQty();
	$("#requiredQty").val('');
}
/*
 * function updateBatchStockQty(count) {
 * 
 * var txtQuantity = $("#txtIssuedQty" + count).val(); //alert(txtQuantity); var
 * txtitemCode = $("#txtinventoryMaterailRequestNoteItemcode" + count) .val();
 * //alert("item code:" + txtitemCode); var inputs = [];
 * inputs.push('action=UpdateBatchStockQtyDetails'); inputs.push('ItemCode=' +
 * txtitemCode); inputs.push('Quantity=' + txtQuantity); var str =
 * inputs.join('&'); jQuery.ajax({ async : true, type : "POST", data : str +
 * "&reqType=AJAX", url : "InventoryServlet", timeout : 1000 * 60 * 5, catche :
 * false, error : function() { alert("error"); }, success : function(r) {
 * ajaxResponse = r; alert(r); //
 * window.location.replace("inventory_Materail_Request_List.jsp");
 * 
 * var txtMRNID = $("#txtMRNID").val(); var totalRow = $("#totalRow").val(); for (
 * var i = 1; i <= txtMRNID; i++) {
 * 
 * totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val(); //
 * alert(totalQty); if (totalQty==0) {
 * 
 * document.getElementById("accept"+ i).disabled = true;
 * document.getElementById("iCheckAvailabilty"+ i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteItemcode"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteDocQuantity"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorone"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorthree"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorfoure"+
 * i).disabled = true; //document.getElementById("checkbox"+ count).disabled =
 * true;
 * 
 *  } else {
 * 
 * document.getElementById("accept"+ i).disabled = false;
 * document.getElementById("iCheckAvailabilty"+ i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteItemcode"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteDocQuantity"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorone"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorthree"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorfoure"+
 * i).disabled = false; // document.getElementById("checkbox"+ count).disabled =
 * false;
 *  } }
 * 
 * 
 * 
 *  } }); }
 */

/** **** new alerted 6feb2016 for Update ***** */
function updateBatchStockQty(count) {

	/* document.getElementById("btnsaveMrnList").disabled = false; */
	var txtmainInventoryStock = $("#txtmainInventoryStock" + count).val();

	var itemQauntity = $("#txtinventoryMaterailRequestNoteDocQuantity" + count)
			.val();
	if (itemQauntity == 0) {
		return false;
	}

	if (parseInt(txtmainInventoryStock) == 0
			|| parseInt(txtmainInventoryStock) < 0) {
		alert("Stock not available");
		document.getElementById("chkbox" + count).checked = false;
		document.getElementById("accept" + count).disabled = true;
		return false;
	}

	var txtIssuedQty = $("#txtIssuedQty" + count).val();
	if (txtIssuedQty != "" && txtIssuedQty != " ") {
		if (parseInt(txtIssuedQty) > parseInt(itemQauntity)) {
			alert("Issue Quantity is less then item Quantity");
			return false;
		}
	
		if (parseInt(txtIssuedQty)< 0) {
			alert("Issue Quantity should not less than 0");
			return false;
		}

		if (parseInt(txtIssuedQty) <= parseInt(itemQauntity)) {
			if (parseInt(txtIssuedQty) > parseInt(txtmainInventoryStock)) {
				alert("Issue Quantity is less then Main Inventory Stock");
				return false;
			} else {
				var finalItemQty = parseInt(itemQauntity)
						- parseInt(txtIssuedQty);
				$("#txtinventoryMaterailRequestNoteDocQuantity" + count).val(
						finalItemQty);
				document.getElementById("chkbox" + count).disabled = true;
				document.getElementById("chkbox" + count).checked = true;
				document.getElementById("accept" + count).disabled = true;
				document.getElementById("txtIssuedQty" + count).disabled = true;
				totalDocQty();
				return false;

			}

		}

	}
	if (parseInt(itemQauntity) > parseInt(txtmainInventoryStock)) {
		var finalIssueqty = parseInt(itemQauntity)
				- parseInt(txtmainInventoryStock);
		$("#txtIssuedQty" + count).val(txtmainInventoryStock);
		$("#txtinventoryMaterailRequestNoteDocQuantity" + count).val(
				finalIssueqty);

		document.getElementById("chkbox" + count).checked = true;
		document.getElementById("chkbox" + count).disabled = true;
		document.getElementById("accept" + count).disabled = true;
		document.getElementById("txtIssuedQty" + count).disabled = true;
	}
	var txtIssuedQty = $("#txtIssuedQty" + count).val();

	if (txtIssuedQty == " " || txtIssuedQty == "") {
		var finalIssueqty = parseInt(txtmainInventoryStock)
				- parseInt(itemQauntity);
		$("#txtIssuedQty" + count).val(itemQauntity);
		$("#txtinventoryMaterailRequestNoteDocQuantity" + count).val(0);
		document.getElementById("chkbox" + count).disabled = true;
		document.getElementById("chkbox" + count).checked = true;
		document.getElementById("accept" + count).disabled = true;
		document.getElementById("txtIssuedQty" + count).disabled = true;
	}

	totalDocQty();
	return false;

}

/**
 * ******** old update function
 * 
 * @since 6 feb 2016 ****
 */
/*
 * function updateBatchStockQty(count) {
 * 
 * var txtQuantity = $("#txtIssuedQty" + count).val(); var txtitemCode =
 * $("#txtMRNItemcodeId" + count).val();
 * 
 * if(txtQuantity==""|| txtQuantity== null ||txtQuantity == undefined) {
 * 
 * alert("Without filling Issued Quantity you can not accept request"); return
 * false;
 *  } var itemName = $("#txtinventoryMaterailRequestNoteItemcode_"+count).val();
 * var txtReceiverName = $("#txtReceiverName").val(); var txtslaveId =
 * $("#txtinventoryMaterailRequestNote"+ count).val(); var
 * txtMRNSubInventoryName = $("#txtMRNLocationName").val(); var txtMrnId
 * =$("#txtGoodsIssueDocNo").val(); var itemQauntity =
 * $("#txtinventoryMaterailRequestNoteDocQuantity"+count).val(); var
 * Totalquntity = parseInt(itemQauntity) + parseInt(txtQuantity);
 * 
 * var inputs = []; inputs.push('action=UpdateBatchStockQtyDetails');
 * inputs.push('ItemCode=' + txtitemCode); inputs.push('Quantity=' +
 * txtQuantity);
 * 
 * inputs.push('itemName=' + itemName); inputs.push('txtReceiverName=' +
 * txtReceiverName); inputs.push('txtslaveId=' + txtslaveId);
 * inputs.push('txtMrnId=' + txtMrnId); inputs.push('txtMRNSubInventoryName=' +
 * txtMRNSubInventoryName); inputs.push('Totalquntity=' + Totalquntity);
 * inputs.push('ItempendingQty=' + itemQauntity);
 * 
 * var str = inputs.join('&'); jQuery .ajax({ async : true, type : "POST", data :
 * str + "&reqType=AJAX", url : "InventoryServlet", timeout : 1000 * 60 * 5,
 * catche : false, error : function() { alert("error"); }, success : function(r) {
 * ajaxResponse = r; alert(r); //
 * window.location.replace("inventory_Materail_Request_List.jsp"); //alert("hii
 * sudhir you are in update");
 * 
 * var txtMRNID = $("#txtMRNID").val(); var totalRow = $("#totalRow").val(); var
 * totalQtys; for ( var i = 1; i <= txtMRNID; i++) {
 * 
 * totalQtys = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val(); //
 * alert(totalQty); if (totalQtys == 0) {
 * 
 * document.getElementById("chkbox"+ i).disabled = true;
 * document.getElementById("accept"+ i).disabled = true;
 * document.getElementById("iCheckAvailabilty"+ i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteItemcode_"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteDocQuantity"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorone"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorthree"+
 * i).disabled = true;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorfoure"+
 * i).disabled = true; //document.getElementById("checkbox"+ count).disabled =
 * true;
 * 
 *  } else {
 * 
 * document.getElementById("accept"+ i).disabled = false;
 * document.getElementById("iCheckAvailabilty"+ i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteItemcode_"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteDocQuantity"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorone"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorthree"+
 * i).disabled = false;
 * document.getElementById("txtinventoryMaterailRequestNoteFactorfoure"+
 * i).disabled = false; // document.getElementById("checkbox"+ count).disabled =
 * false;
 *  } }
 *  } }); }
 */

function totalDocQty() {
	// var i=1;

	var sum = 0;
	var totalQty;
	var txtMRNID = $("#txtMRNID").val();
	/* var tblSubContractingCountRow1 = $("#txtMRNID").val(); */

	var tblSubContractingCountRow1 = $("#totalRow").val();

	for (var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {

		}

		else {
			sum = parseInt(sum) + parseInt(totalQty);
		}
	}

	$("#txtGoodsIssueTotalDocQty").val(sum);

}

function chcknulldocQty() {

	var sum = 0;
	var totalQty;
	var txtMRNID = $("#txtMRNID").val();
	var totalRow = $("#totalRow").val();

	for (var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtGoodsIssueTotalDocQty").val(sum);
	$("#txtMRNID").val(txtMRNID);

}

/**
 * ***********************Autosuggetion for item
 * name*********************************
 */

function autoSuggest(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemNamesOnlyAutoSuggest');
		inputs.push('txtVal=' + txtVal1);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							for (var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for (var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {
			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;

			$("#txtMRNItemcodeId" + idValue).val(currentcode);

			var inputs = [];
			inputs.push('action=fetchItemSalesDetail');
			inputs.push('itemId=' + currentcode);
			inputs.push('isId=yes');
			var str = inputs.join('&');
			// docuemntAjaxResp
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					// alert(r);
					pobj1 = eval('(' + r + ')');

					$("#selItemQty_" + idValue).setTemplate(
							selInventorySalesDetailsTemplateforGoodsIusse);
					$("#selItemQty_" + idValue).processTemplate(pobj1);

				}
			});

		}
	}

}

var selInventorySalesDetailsTemplateforGoodsIusse = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltInventoryItemSaleDTOs as ltInventoryItemSaleDTOs}"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom1}</option>"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom2}</option>"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom3}</option>"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom4}</option>"
		+ "{#/for}";

/** ***************Featch goods issue where status is dispatch**************** */

function fetchMaterialRequestNoteListDetailsInGoodsIssue() {
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			$("#MRNcontent").setTemplate(inventoryMRNTemp);
			$("#MRNcontent").processTemplate(pobj1);

			$("#MRNAjaxResp").html(r);
		}
	});
}

var SrNo = 1;
var inventoryMRNTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Subinventory Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Status</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'} <td>{SrNo++}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>"
		+ "<td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td>{#/if}</tr>{#/for}</table>"

/**
 * ***************** Search in goods Issue where status is dispatch
 * *************
 */

function fetchMRNDetailByIdNoteListInGoodsIssue(mrnId) {

	if (mrnId == null || mrnId == "") {
		alert("Please Enter MRN Id");
		$("#byMrnId").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
	inputs.push('isEdit=yes');
	inputs.push('MrnId=' + mrnId);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					pobj1 = eval('(' + r + ')');
					objMRN = JSON.parse(r);
					if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {

						var status = objMRN.inventoryMaterialRequestNoteMasterDTO[0].mrn_status;

						if (status == 'dispatch') {
							$("#MRNcontent").setTemplate(inventoryMRNTemp);
							$("#MRNcontent").processTemplate(pobj1);
						} else

						{
							alert("Record not found..!");
							fetchMaterialRequestNoteListDetailsInGoodsIssue();

						}

					} else {
						alert("Record not found..!");
						fetchMaterialRequestNoteListDetailsInGoodsIssue();
						// fetchMaterialRequestNoteDetailsInGoodsIssue();
					}
					$('#byMrnId').val("");

				}
			});
}

/**
 * function for issueing checked items and set item qty and issue qty
 * 
 * @Date:6/feb/2016
 * @Author:sudhir*
 */
function chkForAccept(count) {
	var $radios = $('input:checkbox[name=checkbox' + count + ']');
	if ($radios.is(':checked') == true) {
		document.getElementById("accept" + count).disabled = false;
		document.getElementById("txtIssuedQty" + count).disabled = false;
	}
	if ($radios.is(':checked') == false) {
		var txtmainInventoryStock = $("txtmainInventoryStock" + count).val();
		if (txtmainInventoryStock == 0) {
			return false;
		}

		var txtIssuedQty = $("#txtIssuedQty" + count).val();

		if (txtIssuedQty == " " || txtIssuedQty == "") {
			return false;
		}
		var txtinventoryMaterailRequestNoteDocQuantity = $(
				"#txtinventoryMaterailRequestNoteDocQuantity" + count).val();
		if (txtinventoryMaterailRequestNoteDocQuantity != ""
				|| txtIssuedQty != " " || txtIssuedQty != "") {
			var finalQty = parseInt(txtinventoryMaterailRequestNoteDocQuantity)
					+ parseInt(txtIssuedQty);
			$("#txtinventoryMaterailRequestNoteDocQuantity" + count).val(
					finalQty);
			$("#txtIssuedQty" + count).val(' ');

			document.getElementById("accept" + count).disabled = true;
			$("#accept" + count).css('background-color', '264d00');

			return false;
		}

	}

	return false;
}

/**
 * **** set session values on close button
 * 
 * @date:6:feb:2016 Author:sudhir ********* ****
 */
function setSessionvalue() {

	var txtMRNID = $("#txtMRNID").val();
	var txtReceiverName = $("#txtReceiverName").val();
	var txtMrnId = $("#txtGoodsIssueDocNo").val();
	var txtMRNSubInventoryName = $("#txtMRNLocationName").val();
	var materiallistforSession = {
		ltInventoryBatchStockDTO : []
	};
	var p = 1;
	for (var i = 1; i <= txtMRNID; i++) {
		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			var txtIssuedQty = $("#txtIssuedQty" + i).val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();
			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i).val();
			var txtslaveId = $("#txtinventoryMaterailRequestNote" + i).val();

			var itemQauntity = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
			var Totalquntity = parseInt(itemQauntity) + parseInt(txtIssuedQty);

			materiallistforSession.ltInventoryBatchStockDTO
					.push({

						inv_mrn_item_info_issue_slave_item_name : txtMRNItemName,
						inv_item_code : txtMRNID,
						inv_issue_qty : txtIssuedQty,
						inv_mrn_item_info_issue_carrier_name : txtReceiverName,
						inv_mrn_item_info_slave_id : txtslaveId,
						inv_mrn_id : txtMrnId,
						inv_mrn_item_info_issue_slave_subinventory : txtMRNSubInventoryName,
						inv_item_qty : Totalquntity,
						inv_mrn_item_info_issue_slave_pending_item_qty : itemQauntity,
						inv_mrn_item_info_issue_slave_item_qty : Totalquntity,
					});
		}
		p++;
	}

	var li = materiallistforSession.ltInventoryBatchStockDTO.length;
	if (li == 0) {
		$('#Goods_Issue').removeClass('fade');
		$('#Goods_Issue').modal('hide');
		/* refreshPopUp(); */
		return false;
	}

	materiallistforSession = JSON.stringify(materiallistforSession);
	var inputs = [];
	// General Info
	inputs.push("materiallistforSession=" + materiallistforSession);
	inputs.push('action=SetSessionValforDynamicRows');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#Goods_Issue').removeClass('fade');
			$('#Goods_Issue').modal('hide');
			/* refreshPopUp(); */
			window.location.reload("inventory_Goods_Issue.jsp");
		}
	});
}

/**
 * **deduct Stock
 * 
 * @Date:8:feb:2016
 * @Author: Sudhir ***
 */
function deductStock() {
	
	var txtMRNID = $("#txtMRNID").val();
	var txtReceiverName = $("#txtReceiverName").val();
	var txtMrnId = $("#txtGoodsIssueDocNo").val();
	var txtMRNSubInventoryName = $("#txtMRNLocationName").val();
	var subInventoryId = $("#subInventoryId").val();

	var materiallist = {
		ltInventoryBatchStockDTO : []
	};

	var p = 1;
	for (var i = 1; i <= txtMRNID; i++) {
		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			var txtIssuedQty = $("#txtIssuedQty" + i).val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();
			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i).val();
			var txtslaveId = $("#txtinventoryMaterailRequestNote" + i).val();

			var itemQauntity = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
			var Totalquntity = parseInt(itemQauntity) + parseInt(txtIssuedQty);

			materiallist.ltInventoryBatchStockDTO
					.push({

						inv_mrn_item_info_issue_slave_item_name : txtMRNItemName,
						inv_item_code : txtMRNItemcodeId,
						inv_issue_qty : txtIssuedQty,
						inv_mrn_item_info_issue_carrier_name : txtReceiverName,
						inv_mrn_item_info_slave_id : txtslaveId,
						inv_mrn_id : txtMrnId,
						inv_mrn_item_info_issue_slave_subinventory : txtMRNSubInventoryName,
						inv_item_qty : Totalquntity,
						inv_mrn_item_info_issue_slave_pending_item_qty : itemQauntity,
						inv_mrn_item_info_issue_slave_item_qty : Totalquntity,
						inv_subinventory_id : subInventoryId,
					});
		}
		p++;
	}
	var li = materiallist.ltInventoryBatchStockDTO.length;
	if (li == 0) {
		return false;
	}

	materiallist = JSON.stringify(materiallist);
	var inputs = [];
	// General Info
	inputs.push("materiallist=" + materiallist);
	inputs.push('action=UpdateBatchStockQtyDetails');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			/*
			 * ajaxResponse = r; alert("Record Updated Successfully..!");
			 * $('#MaterialRequestNoteList').removeClass('fade');
			 * $('#MaterialRequestNoteList').modal('hide'); window.location
			 * .replace("inventory_Material_Request_Note_List.jsp");
			 */
		}
	});

}

/**
 * set incharge level val for the incharge
 * 
 * @Date:8:feb:2016
 * @Author:sudhir jadhav ***** **
 */
function chklevlval(val) {
	$("#levelValue").val(val);
	$("#userName").val('');
	$("#userPassword").val('');
}
/**
 * *** End set incharge level val for the incharge
 * 
 * @Date:8:feb:2016
 * @Author:sudhir jadhav **************
 */

/**
 * *** vaildation for Incharge level 3 in Goods Issue
 * 
 * @Date:8:feb:2016
 * @Author:sudhir jadhav ********
 */
function checkUserNameandPassword() {
	var ApprovedByIncharge = $("#levelValue").val();
	var userName = $("#userName").val();
	var userPassword = $("#userPassword").val();
	if (userName == "" || userPassword == "") {
		alert(" Please Fill All Details ");
		return false;
	}

	var MrnId = $("#txtGoodsIssueDocNo").val();
	var inputs = [];
	inputs.push('action=getValidatUserNameandPassword');
	inputs.push('userPassword=' + userPassword);
	inputs.push('userName=' + userName);
	inputs.push('MrnId=' + MrnId);
	inputs.push('ApprovedByIncharge=' + ApprovedByIncharge);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			// ajaxResponse = r;
			var b = r.replace(/"/g, "");
			if (b == "1") {
				alert("Invalid User Name or Password");
				return false;

			} else

			{
				saveGoodsIssue();
				if ($("#txtaccptsave").val() == 1) {
					$('#userNameandpasswordPopUp').removeClass('fade');
					$('#userNameandpasswordPopUp').modal('hide');
					return false;

				}

				// saveMaterialRequestNoteList();
				$('#userNameandpasswordPopUp').removeClass('fade');
				$('#userNameandpasswordPopUp').modal('hide');
				$('#Goods_Issue').removeClass('fade');
				$('#Goods_Issue').modal('hide');
				return false;

				alert("Approved level Succssefully");

			}
		}
	});

}

/**
 * ** End vaildation for Incharge level 3 Goods Issue
 * 
 * @Date:8:feb:2016
 * @Author:sudhir jadhav **********
 */
