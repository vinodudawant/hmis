///*var ItemInfoList="<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td>";*/

var count = 1;
var test = 0;
var isNew = 0;

function setItemInfotrSubContractingMaterialIssue() {

	if (test > 0 && isNew > 0) {
		if (count == 1) {
			/*
			 * var lenghtofpobj =
			 * pobj1.inventroySubContractingMaterialIssueSlaveDTOs.length; count =
			 * lenghtofpobj;
			 */ 
			count = test;

		}

		count++;

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "'> <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td> <td><input type='hidden' id='txtSubcontractingissuseMasterSavleInvid"
								+ count
								+ "' name='txtSubcontractingissuseMasterSavleInvid'  value='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueItemcode"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueDocQuantity"
								+ count
								+ "'onkeyup='chcknulldocQty()' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueFactortwo"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text'  id='txtSubContractingMaterialIssueFactorthree"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueFactorfoure"
								+ count
								+ "' class='form-control input-SmallText'></td>");
		$("#tblSubContractingCountRow").val(count);
		
		var tblSubContractingCountRow1 = $("#tblSubContractingCountRow").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		
	} else {

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td><input type='hidden' id='txtSubcontractingissuseMasterSavleInvid"
								+ count
								+ "' name='txtSubcontractingissuseMasterSavleInvid'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueItemcode"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueDocQuantity"
								+ count
								+ "' onkeyup='chcknulldocQty()' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueFactortwo"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text'  id='txtSubContractingMaterialIssueFactorthree"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtSubContractingMaterialIssueFactorfoure"
								+ count
								+ "' class='form-control input-SmallText'></td>");
		$("#tblSubContractingCountRow").val(count);
		count++;

	}

}

function setEditSavesubContracting() {
	// alert("Hi sagar");
	// refreshPopUp();
	 

	$('#SubContracting_Material_issue').find('input:text').val('');
	$('#SubContracting_Material_issue').find('input:hidden').val('');

	$('#SubContracting_Material_issue').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#SubContracting_Material_issue').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	isNew = 0;
	count = 1;
	getNextIdSubContractingMaterialIssue();

	// window.location.reload("inventory_Materail_Request_Note.jsp");
}

function toRemovesetItemInfotrSubContractingMaterialIssue(
		tblSubContractingCountRow) {
	// alert(tblSubContractingCountRow);
	var tblSubContractingCountRow1 = $("#tblSubContractingCountRow").val();
	// alert(tblSubContractingCountRow);

	var temp = tblSubContractingCountRow1;
	var p = 1;
	for ( var i = 0; i < tblSubContractingCountRow1; i++) {
		// alert(p);

		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			$("#deleterows" + p + " ").remove();
			// alert(p);
			temp = temp - 1;

			$("#totalRow").val(temp);
		}

		p++;

	}
	totalDocQty();
	chcknulldocQty();
	isNew = 1;

}

function refreshinSubcontracting() {
	$('#SubContracting_Material_issue').find('input:text').val('');
	$('#SubContracting_Material_issue').find('input:hidden').val('');

	$('#SubContracting_Material_issue').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#SubContracting_Material_issue').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	isNew = 1;
}

function subContractingMaterialIssueSave() {
	// alert("ddddg");
	var txtSubContractingMaterialIssueDocNo = $(
			"#txtSubContractingMaterialIssueDocNo").val();
	var txtSubContractingMaterialIssueDocDate = $(
			"#txtSubContractingMaterialIssueDocDate").val();
	var txtSubContractingMaterialIssueTotalDocQty = $(
			"#txtSubContractingMaterialIssueTotalDocQty").val();
	var txtSubContractingMaterialIssueRemark = $(
			"#txtSubContractingMaterialIssueRemark").val();

	var tblSubContractingCountRow = $("#tblSubContractingCountRow").val();

	var materialaList = {
		inventroySubContractingMaterialIssueSlaveDTOs : []
	};

	var currentdate = new Date();
	var cd = currentdate.getDate();
	var cm = currentdate.getMonth() + 1;
	var cy = currentdate.getFullYear();

	var fullDate = cy + '/' + cm + '/' + cd;

	var txtdeletflaf = 0;

	for ( var i = 1; i <= tblSubContractingCountRow; i++) {

		if ($("#txtSubcontractingissuseMasterSavleInvid" + i).val() != null
				&& $("#txtSubcontractingissuseMasterSavleInvid" + i).val() != undefined) {
			var txtSubContractingMaterialIssueItemcode = $(
					"#txtSubContractingMaterialIssueItemcode" + i).val();

			var txtSubContractingMaterialIssueDocQuantity = $(
					"#txtSubContractingMaterialIssueDocQuantity" + i).val();

			var txtSubContractingMaterialIssueFactor1 = $(
					"#txtSubContractingMaterialIssueFactorone" + i).val();
			var txtSubContractingMaterialIssueFactor2 = $(
					"#txtSubContractingMaterialIssueFactortwo" + i).val();
			var txtSubContractingMaterialIssueFactor3 = $(
					"#txtSubContractingMaterialIssueFactorthree" + i).val();
			var txtSubContractingMaterialIssueFactor4 = $(
					"#txtSubContractingMaterialIssueFactorfoure" + i).val();
			var txtSubcontractingissuseMasterSavleInvid = $(
					"#txtSubcontractingissuseMasterSavleInvid" + i).val();

			materialaList.inventroySubContractingMaterialIssueSlaveDTOs
					.push({

						subMIM_Item_Code : txtSubContractingMaterialIssueItemcode,
						subMIS_doc_quantity : txtSubContractingMaterialIssueDocQuantity,
						subMIS_factor1 : txtSubContractingMaterialIssueFactor1,
						subMIS_factor2 : txtSubContractingMaterialIssueFactor2,
						subMIS_factor3 : txtSubContractingMaterialIssueFactor3,
						subMIS_factor4 : txtSubContractingMaterialIssueFactor4,
						inv_subMIS_id : txtSubcontractingissuseMasterSavleInvid,
						subMIM_id : txtSubContractingMaterialIssueDocNo,
						subMIS_delete_flag : txtdeletflaf,
						subMIS_update_date : new Date(),
						subMIS_created_date : new Date()

					});

		}

	}

	var status = 'Y';
	materialaList = JSON.stringify(materialaList);

	var inputs = [];
	inputs.push('action=savesubContractingMaterialIssue');

	inputs.push('materiallist=' + materialaList);
	inputs.push('txtSubContractingMaterialIssueDocNo='
			+ txtSubContractingMaterialIssueDocNo);
	inputs.push('txtSubContractingMaterialIssueDocDate='
			+ txtSubContractingMaterialIssueDocDate);

	inputs.push('txtSubContractingMaterialIssueTotalDocQty='
			+ txtSubContractingMaterialIssueTotalDocQty);
	inputs.push('txtSubContractingMaterialIssueRemark='
			+ txtSubContractingMaterialIssueRemark);
	inputs.push('tblSubContractingCountRow=' + tblSubContractingCountRow);
	inputs.push('status' + status);

	var str = inputs.join('&');

	$.ajax({

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
			alert(r);
			ajaxResponse = r;
			window.location
					.replace("inventory_Sub_Contracting_Material_Issue.jsp");
		}

	});

}

function getNextIdSubContractingMaterialIssue() {
	var inputs = [];
	inputs.push('action=getNextIdSubContractingMaterialIssue');
	inputs.push('tableName=inv_sub_contracting_material_issue_master');
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
			// alert(r);
			$("#txtSubContractingMaterialIssueDocNo").val(r);
		}
	});
}

function fetchSubContractingMaterialIssueMasterDetails() {
	var inputs = [];
	inputs.push('action=fetchSubContractingDetail');
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
			// alert(r);
			pobj1 = eval('(' + r + ')');
			$("#SubContractingMateiralIssueMastercontent").setTemplate(
					inventorySubContractingMaterialIssuesMasterTemp);
			$("#SubContractingMateiralIssueMastercontent").processTemplate(
					pobj1);

			$("#subContractingMasterAjaxResp").html(r);
		}
	});
}

/* view dynamic data into the page on lodeing the page */

function viewSubContractingMaterialIssueMasterDetail(invsubMIMid) {

	if (invsubMIMid == null || invsubMIMid == "") {
		alert("Plz enter Doc No");
		$("#byName").focus();
		return false;
	}

	refreshinSubcontracting();

	var obj = $("#subContractingMasterAjaxResp").html();
  objSubContractingIssueMaster = JSON.parse(obj);

	for ( var i = 0; i < objSubContractingIssueMaster.inventroySubContractingMaterialIssueMasterDTO.length; i++) {
		if (objSubContractingIssueMaster.inventroySubContractingMaterialIssueMasterDTO[i].inv_subMIM_id == invsubMIMid) {
			$("#txtSubContractingMaterialIssueDocNo")
					.val(
							objSubContractingIssueMaster.inventroySubContractingMaterialIssueMasterDTO[i].subMIM_doc_no);
			$("#txtSubContractingMaterialIssueDocDate")
					.val(
							objSubContractingIssueMaster.inventroySubContractingMaterialIssueMasterDTO[i].subMIM_doc_date);
			$("#txtSubContractingMaterialIssueTotalDocQty")
					.val(
							objSubContractingIssueMaster.inventroySubContractingMaterialIssueMasterDTO[i].subMIM_total_doc_quantity);
			$("#txtSubContractingMaterialIssueRemark")
					.val(
							objSubContractingIssueMaster.inventroySubContractingMaterialIssueMasterDTO[i].subMIM_remark);
		}
	}

	var inputs = [];
	inputs.push('action=getDynamicSubContractingSlavesData');
	inputs.push('isEdit=no');
	var txtSubContractingMaterialIssueDocNo = $(
			"#txtSubContractingMaterialIssueDocNo").val();
	// alert(txtSubContractingMaterialIssueDocNo);
	inputs.push('txtSubContractingMaterialIssueDocNo='
			+ txtSubContractingMaterialIssueDocNo);
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

					var lenghtofpobj = pobj1.inventroySubContractingMaterialIssueSlaveDTOs.length;
					// alert(lenghtofpobj);

					var count = 1;
					for ( var k = 0; k < pobj1.inventroySubContractingMaterialIssueSlaveDTOs.length; k++) {

						$("#ItemInfoTable > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' > <td> <input type='checkbox'  name='checkbox"
												+ count
												+ "' id='checkbox "
												+ count
												+ "'> </td> <td><input type='text' id='txtSrNo"
												+ count
												+ "' name='txtSrNo'  value="
												+ count
												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtSubcontractingissuseMasterSavleInvid"
												+ count
												+ "' name='txtSubcontractingissuseMasterSavleInvid'  value="
												+ pobj1.inventroySubContractingMaterialIssueSlaveDTOs[k].inv_subMIS_id
												+ "  class='form-control input-SmallText'></td>  <td><input type='text' id='txtSubContractingMaterialIssueItemcode"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ pobj1.inventroySubContractingMaterialIssueSlaveDTOs[k].subMIM_Item_Code
												+ "'></td> <td><input type='text' id='txtSubContractingMaterialIssueDocQuantity"
												+ count
												+ "' onkeyup='chcknulldocQty()' class='form-control input-SmallText' value='"
												+ pobj1.inventroySubContractingMaterialIssueSlaveDTOs[k].subMIS_doc_quantity
												+ "'></td> <td><input type='text' id='txtSubContractingMaterialIssueFactorone"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ pobj1.inventroySubContractingMaterialIssueSlaveDTOs[k].subMIS_factor1
												+ "' ></td> <td><input type='text' id='txtSubContractingMaterialIssueFactortwo"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ pobj1.inventroySubContractingMaterialIssueSlaveDTOs[k].subMIS_factor2
												+ "' ></td>    <td><input type='text'  id='txtSubContractingMaterialIssueFactorthree"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ pobj1.inventroySubContractingMaterialIssueSlaveDTOs[k].subMIS_factor3
												+ "' > </td>   <td><input type='text' id='txtSubContractingMaterialIssueFactorfoure"
												+ count
												+ "' class='form-control input-SmallText'value='"
												+ pobj1.inventroySubContractingMaterialIssueSlaveDTOs[k].subMIS_factor4
												+ "' ></td>");

						$("#tblSubContractingCountRow").val(count);
						count++;
						test++;

					}

					totalDocQty();

					var tblSubContractingCountRow1 = $(
							"#tblSubContractingCountRow").val();
					$("#totalRow").val(tblSubContractingCountRow1);
				}

			});

}

function removetable() {

	window.location.replace("inventory_Sub_Contracting_Material_Issue.jsp");
}

function deleteSubContractingIssuesMasterDetail(invsubMIMid) {
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteSubContractingIssueMasterDetail');
		inputs.push('invsubMIMid=' + invsubMIMid);
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
				alert(r);
				fetchSubContractingMaterialIssueMasterDetails();

			}
		});
	}
}

function totalDocQty() {
	// var i=1;

	var sum = 0;
	var totalQty;
	var txtMRNID = $("#tblSubContractingCountRow").val();
	/* var tblSubContractingCountRow1 = $("#txtMRNID").val(); */

	var tblSubContractingCountRow1 = $("#totalRow").val();

	for ( var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtSubContractingMaterialIssueDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {

		}

		else {
			sum = parseInt(sum) + parseInt(totalQty);
		}
	}

	$("#txtSubContractingMaterialIssueTotalDocQty").val(sum);

}

function chcknulldocQty() {

	var sum = 0;
	var totalQty;
	var txtMRNID = $("#tblSubContractingCountRow").val();
	var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtSubContractingMaterialIssueDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtSubContractingMaterialIssueTotalDocQty").val(sum);
	$("#txtMRNID").val(txtMRNID);

}

/* New Sub Contracting Material Issues Master Function */

var inventorySubContractingMaterialIssuesSlaveTemp1 = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 698px;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Item Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Doc Quantity</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>factor1</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>factor2</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>factor3</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>factor4</div></th>  <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th> </tr> </thead>"
		+ "{#foreach $T.inventroySubContractingMaterialIssueSlaveDTOs as inventroySubContractingMaterialIssueSlaveDTOs}<tr><td id='id{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}'>{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}</td><td id='txtSubContractingMaterialIssueItemcode{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}'>{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_Item_Code}</td> <td id='txtSubContractingMaterialIssueDocQuantity{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}'>{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIS_doc_quantity}</td> <td id='txtSubContractingMaterialIssueFactorone{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}'>{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIS_factor1}</td> <td id='txtSubContractingMaterialIssueFactortwo{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}'>{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIS_factor2}</td> <td id='txtSubContractingMaterialIssueFactorthree{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}'>{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIS_factor3}</td> <td id='txtSubContractingMaterialIssueFactorfoure{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id}'>{$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIS_factor4}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'	data-target='#SubContracting_Material_issue' onclick=\"viewSubContractingMaterialIssueMasterDetail({$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='submit' onclick=\"deleteCategoryDetail({$T.inventroySubContractingMaterialIssueSlaveDTOs.subMIM_id})\"><i class='fa fa-edit'></i></button></td</tr>{#/for}</table>"

var inventorySubContractingMaterialIssuesMasterTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px; width:1000px;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Doc No</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Doc Date</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Total Doc qty</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>remark</div></th>  <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th> </tr> </thead>"
		+ "{#foreach $T.inventroySubContractingMaterialIssueMasterDTO as inventroySubContractingMaterialIssueMasterDTO}<tr><td id='id{$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id}'>{$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id}</td><td id='desc{$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id}'>{$T.inventroySubContractingMaterialIssueMasterDTO.subMIM_doc_no}</td> <td id='docDate{$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id}'>{$T.inventroySubContractingMaterialIssueMasterDTO.subMIM_doc_date}</td> <td id='toaldocQty{$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id}'>{$T.inventroySubContractingMaterialIssueMasterDTO.subMIM_total_doc_quantity}</td> <td id='remark{$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id}'>{$T.inventroySubContractingMaterialIssueMasterDTO.subMIM_remark}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'	data-target='#SubContracting_Material_issue' onclick=\"viewSubContractingMaterialIssueMasterDetail({$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='submit' onclick=\"deleteSubContractingIssuesMasterDetail({$T.inventroySubContractingMaterialIssueMasterDTO.inv_subMIM_id})\"><i class='fa fa-edit'></i></button></td</tr>{#/for}</table>"