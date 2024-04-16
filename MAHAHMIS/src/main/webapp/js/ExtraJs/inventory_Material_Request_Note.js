var count = 1;
var test = 0;
var isNew = 0;

/**
 * ***************************************** Tamplet for show the master and
 * slave detalis in tabular form **********************************
 */
/*
 * var inventoryMRNTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th ' class='col-md-2 center'><div>MRN Doc No</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Recieve</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ==
 * 'open'||$T.inventoryMaterialRequestNoteMasterDTO.mrn_status ==
 * 'InProcess'||$T.inventoryMaterialRequestNoteMasterDTO.mrn_status
 * =='dispatch'}<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>" + "
 * <td><button id='btIssue' class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='issue'><i class='fa fa-edit'></i></button></td> <td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td>
 * <td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td>{#/if}</tr>{#/for}</table>";
 */

/*
 * var inventoryMRNTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th ' class='col-md-2 center'><div>MRN Doc No</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Recieve</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'}<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>" + "
 * <td><button id='btIssue' class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='issue'><i class='fa fa-edit'></i></button></td> <td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td>
 * <td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#else}<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>" + "
 * <td><button id='btIssue' class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td> <td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td>
 * <td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#/if}{#/for}</table>";
 */

/*
 * var inventoryMRNTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Receive</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='issue'><i class='fa fa-edit'></i></button></td>" +"<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td>
 * </tr>" + "{#elseif $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ==
 * 'open'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'InProcess'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td>" + "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}" + "</td></tr>{#/else
 * }{#/if}{#/for}</table>";
 */
/**
 * ***************** modified Date:18 nov 2015 Author Sudhir
 * ********************************
 */

/*
 * var inventoryMRNTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier
 * Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>
 * Mrn Raised By</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Receive</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='issue'><i class='fa fa-edit'></i></button></td>" +"<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td>
 * </tr>" + "{#elseif $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ==
 * 'open'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'InProcess'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td>" + "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}" + "</td></tr>{#/else
 * }{#/if}{#/for}</table>";
 */

/**
 * ***************** modified Date:18 jan 2016 Author Sudhir
 * ********************************
 */

var inventoryMRNTemp = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div> Mrn Raised By</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Approved status</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}"
		+ "{#if $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status == 'NYA'}"
		+ "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>"
		+ "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td> <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>"
		+ "<td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td> "
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#MRNForm' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td style='background-color: #ffcccc' id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status}</td> </tr>"
		+ "{#elseif $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status=='level-I'}"
		+ "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>"
		+ "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>"
		+ " <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#MRNForm' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td> "
		+ "<td style='background-color: #ccffcc' id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status}"
		+ "</td></tr>{#/else }{#/if}{#/for}</table>";

function issueMRNDetails(MrnId) {
	var didConfirm = confirm("Are you sure to receive this MRN ?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=issueMrnstausDispatch');
		inputs.push('MrnId=' + MrnId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "post",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						alert(r);
						// $('#showhideMrnMaintabs').show();
						$("#recieved").tab('show');
						onrecieved();
						fetchMaterialRequestNoteDetailsShows();
						fetchMaterialRequestNoteDetailsforIssue();
						fetchMaterialRequestNoteStockDetailsForSubInventory();
						fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock();

					}
				})
	}

}

function fetchMRNDetailById(mrnId) {
	if (mrnId == null || mrnId == "") {
		alert("Plz enter  mrn Id");
		$("#byMrnId").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
	inputs.push('isEdit=yes');
	inputs.push('MrnId=' + mrnId);

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
			objMRN = JSON.parse(r);
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {

				$("#MRNcontent").setTemplate(inventoryMRNTemp);
				$("#MRNcontent").processTemplate(pobj1);

			} else {
				alert("Record not found..!");
				fetchMaterialRequestNoteDetailsShows();
			}
			$('#byMrnId').val("");

		}
	});
}

function setEditSaveNote() {
	$('#iToHideBtns').css('display', 'block');
	$('#approvedHideBtns').css('display', 'none');
	$('#MRNForm').find('input:text').val('');
	$('#MRNForm').find('input:hidden').val('');

	$('#MRNForm').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#MRNForm').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	// alert("empty");
	isNew = 0;
	count = 1;
	var subinventoryTxt = $("#txtwardName").val();
	$("#txtMRNLocationName").val(subinventoryTxt);
	getNextMaterialRequestNoteIds();
	setMaterialRequestInfo();

	// window.location.reload("inventory_Materail_Request_Note.jsp");
}

function setMaterialRequestInfo() {

	/*
	 * $('#iToHideBtns').css('display', 'block'); $('#closeBtn').hide();
	 */
	if (test > 0 && isNew > 0) {
		if (count == 1) {
			/*
			 * var lenghtofpobj =
			 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; count =
			 * lenghtofpobj;
			 */
			count = test;

		}
		// alert(count);
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
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input readonly='readonly' type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)'   class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "' value='0'  /></div></td> <td><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='checkValueZero1(this.id)' onkeypress='return validateNumbers(event)'></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option value = '0'>Select</option></select></td> <td> <input type='hidden' id='txtinventoryMaterailRequestNoteMainStock"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' id='txtinventoryMaterailRequestNoteCurrentStock"
								+ count
								+ "' class='form-control input-SmallText' readonly></td> ");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
		// count++;
		/* totalDocQty(); */

	} else {

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td> <input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote' value ='0'   class='form-control input-SmallText'> <input readonly='readonly' type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "'  value='0' /> </div></td> <td><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='checkValueZero1(this.id)'></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option value = '0'>Select</option></select></td> <td> <input type='hidden' id='txtinventoryMaterailRequestNoteMainStock"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' id='txtinventoryMaterailRequestNoteCurrentStock"
								+ count
								+ "' class='form-control input-SmallText' readonly></td> ");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
		count++;

	}

}

/**
 * * Modified
 * 
 * @Date:1june2016
 * @Author:Sudhir ***
 */
function autoSuggest(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();
	/* $("#inputID").val('0'); */

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
						if (r.length === 32 || r.length <= 0) {
							alert("NO MATCHING FOUND");
							$("#" + inputID).val('');
							$("#" + inputID).focus();

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

			var current = (count - 1);
			var nextCall = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + current)
					.val();

			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;
			$("#txtMRNItemcodeId" + idValue).val(currentcode);
			// document.getElementById("txtinventoryMaterailRequestNoteItemcode_"
			// + idValue ).disabled = true;

			// featch item sales Details for mrn item name

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

					pobj1 = eval('(' + r + ')');
					$("#selItemQty_" + idValue).setTemplate(
							selInventorySalesDetailsTemplateforMRN);
					$("#selItemQty_" + idValue).processTemplate(pobj1);

					// $("#InvRate").val(pobj1.ltInventoryItemSaleDTOs[0].item_sales_uom);
				}
			});

			var subInventoryName = $("#txtMRNLocationName").val();
			var inputs = [];
			inputs
					.push('action=fetchItemsCurrentStockofSubinventoryandMainStock');
			inputs.push('itemId=' + currentcode);
			inputs.push('subInventoryName=' + subInventoryName);
			inputs.push('isEdit=no');
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

					var pobj2 = pobj1.split("_");
					var currentStock = pobj2[0];
					var mainstock = pobj2[1];

					$("#InvAQty").val(mainstock);
					 $("#txtinventoryMaterailRequestNoteCurrentStock"+idValue).val(currentStock);
					 $("#txtinventoryMaterailRequestNoteMainStock"+idValue).val(mainstock);

				}
			});

			if (nextCall != "") {
				setMaterialRequestInfo();
			}

		}
	}

}

/*
 * var selInventorySalesDetailsTemplateforMRN = "<option
 * value='Select'>-Select-</option>" + "{#foreach $T.ltInventoryItemSaleDTOs as
 * ltInventoryItemSaleDTOs}" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom1}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom2}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom3}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom4}</option>" +
 * "{#/for}";
 */

var selInventorySalesDetailsTemplateforMRN = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltInventoryItemSaleDTOs as ltInventoryItemSaleDTOs}"
		+ "{#if $T.ltInventoryItemSaleDTOs.item_sales_uom_factor1 !=''}"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom1}</option>"
		+ "{#elseif $T.ltInventoryItemSaleDTOs.item_sales_uom_factor2 !=''}"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom2}</option>"
		+ "{#elseif $T.ltInventoryItemSaleDTOs.item_sales_uom_factor3 !=''}"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom3}</option>"
		+ "{#elseif $T.ltInventoryItemSaleDTOs.item_sales_uom_factor4 !=''}"
		+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom4}</option>"
		+ "{#/else}{#/else}{#/else}{#/if}{#/for}";

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

			$("#totalRow").val(temp);
		}

		p++;

	}

	totalDocQty();
	chcknulldocQty();
	isNew = 1;
	// setEditSaveNote();

	/*
	 * var tblSubContractingCountRow1 = $("#txtMRNID").val();
	 * $("#totalRow").val(tblSubContractingCountRow1);
	 */

}

function deleteDItemMasterDetail(MrnId) {
	var didConfirm = confirm("Are you sure to delete?");
	var CurrentuserName = $("#CurrentuserName").val();

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!
	var yyyy = today.getFullYear();
	var today = dd + '/' + mm + '/' + yyyy;

	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteMrnMasterDetail');
		inputs.push('MrnId=' + MrnId);
		inputs.push('CurrentuserName=' + CurrentuserName);
		inputs.push('today=' + today);
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
				fetchMaterialRequestNoteDetailsShows();

			}
		});
	}
}

function saveMaterialRequestNote() {
	// General In
	var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteDocId").val();
	var txtDocNo = $("#txtmaterialReqaestNoteDocId").val();
	var txtDocDate = $("#txtMRNDate").val();
	var txtMRNTotal = $("#txtMRNTotal").val();
	var txtMRNRemark = $("#txtMRNRemark").val();
	var CurrentuserName = $("#CurrentuserName").val();
	var subInventoryId = $("#subInventoryId").val();
	var mrnApprovedStatus = 'NYA';
	// alert(CurrentuserName);

	/*
	 * var val = $("#btnAddNew").val(); alert(val); if(val = '+') {
	 * alert("please select at least one row"); $("#btnAddNew").focus(); return
	 * false; }
	 */
	if (txtDocDate == "" || txtDocDate == 0) {

		alert("Please select mrn date");
		$("#txtMRNDate").focus();
		return false;

	}

	var isEditUpdate = $("#isEditUpdate").val();

	if (!(isEditUpdate == "Update")) {
		if (txtDocDate) {
			var today = new Date();

			var dd = today.getDate();
			var mm = today.getMonth() + 1; // January is 0!
			var yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}

			var today1 = dd + '/' + mm + '/' + yyyy;
			/*
			 * var today = new Date(); var dd = today.getDate(); var mm =
			 * today.getMonth()+1; //January is 0!
			 * 
			 * var yyyy = today.getFullYear();
			 * 
			 * var today1 = dd+'/'+mm+'/'+yyyy;
			 */

			/*
			 * if(new Date(txtDocDate).getTime() == new Date(today1).getTime()) {
			 *  }
			 */
			if (txtDocDate === today1) {

			} else {
				alert("Please Enter Current Date ");
				$("#txtMRNDate").focus();
				return false;
			}
		}
	}

	var txtMRNID = $("#txtMRNID").val();
	var totalRow = $("#totalRow").val();

	var txtMRNLocationName = $("#txtMRNLocationName").val();

	var txtReceiverName = $("#txtReceiverName").val();

	/*
	 * var pattern = /^([a-zA-Z0-9]+\s?)*$/; if (!pattern.test(txtMRNRemark)) {
	 * alert("remark details should be of alphabets and digits with a single
	 * space allowed..!"); $("#txtMRNRemark").focus(); return false; }
	 */
	// var sclMRNLocation = $("#sclMRNLocation option:selected").text();
	var status = 'open';
	var materiallist = {
		inventoryMaterialRequestNoteItemInfoSlaveDTO : []
	};

	// SUFIYAN
	for (var i = 1; i < txtMRNID; i++) {

		if ($("#txtinventoryMaterailRequestNote" + i).val() != null
				&& $("#txtinventoryMaterailRequestNote" + i).val() != undefined) {
			var txtinventoryMaterailRequestNote = $(
					"#txtinventoryMaterailRequestNote" + i).val();
			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i).val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();
			var txtMRNDocQuantity = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i).val();

			var txtinventoryMaterailRequestNoteIssueQuantity = $(
					"#txtinventoryMaterailRequestNoteIssueQuantity" + i).val();

			/*
			 * if (txtMRNItemName == "" || txtMRNItemName == null) {
			 * 
			 * alert("Please enter item name in " + i + " Row");
			 * $("#txtinventoryMaterailRequestNoteItemcode_" + i).focus();
			 * return false;
			 *  }
			 */
			if (txtMRNDocQuantity == "" || txtMRNDocQuantity == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).focus();
				return false;

			}

			if (parseInt(txtMRNDocQuantity) <= 0) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).focus();
				return false;

			}

			var pattern = /^([0-9])*$/;
			if (!pattern.test(txtMRNDocQuantity)) {
				alert("MRN Quantity field is of digits only.!");
				$("#txtMRNDocQuantity" + i).focus();
				return false;

			}

			/*
			 * var txtfactor1 = $("#txtinventoryMaterailRequestNoteFactorone" +
			 * i) .val(); var txtfactor2 =
			 * $("#txtinventoryMaterailRequestNoteFactortwo" + i) .val(); var
			 * txtfactor3 = $( "#txtinventoryMaterailRequestNoteFactorthree" +
			 * i).val();
			 * 
			 * var txtfactor4 = $( "#txtinventoryMaterailRequestNoteFactorfoure" +
			 * i).val();
			 */
			// var selItemQty =$("#selItemQty option:selected" + i).text();
			var selItemQty = $("#selItemQty_" + i + " option:selected").text();

			// var selectbox = document.getElementById("selItemQty");
			// var select = selectbox.options[selectbox.selectedIndex].value;
			// alert(selItemQty);
			// var strUser1 = e.options[e.selectedIndex].text;
			if (selItemQty == 0 || selItemQty == '-Select-') {
				alert("Please select uom in " + i + " row");
				$("#selItemQty_").focus();
				return false;
			}
			// var selItemQty = $("#selItemQty" + i).val()
			;
			materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO
					.push({

						mrn_item_info_slave_id : txtinventoryMaterailRequestNote,
						mrn_item_info_slave_item_name : txtMRNItemName,
						mrn_item_info_slave_doc_qty : txtMRNDocQuantity,
						mrn_item_info_slave_item_name : txtMRNItemName,
						mrn_item_info_slave_item_code : txtMRNItemcodeId,
						/*
						 * mrn_item_info_slave_item_factor1 : txtfactor1,
						 * mrn_item_info_slave_item_factor2 : txtfactor2,
						 * mrn_item_info_slave_item_factor3 : txtfactor3,
						 * mrn_item_info_slave_item_factor4 : txtfactor4,
						 */
						mrn_item_info_slave_item_selItemQty : selItemQty,
						mrn_item_info_slave_issue_qty : txtinventoryMaterailRequestNoteIssueQuantity,
						mrn_item_info_slave_update_date : new Date(),
						mrn_item_info_slave_create_date : new Date()

					});

		}
	}

	var li = materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
	if (li == 0) {
		alert("please enter atleast one item row to mrn generated");
		return false;

	}

	materiallist = JSON.stringify(materiallist);
	var inputs = [];
	inputs.push('action=SaveMaterialRequestNoteDetails');

	// General Info
	inputs.push("materiallist=" + materiallist);
	inputs.push('txtMRNID=' + txtMRNID);
	inputs.push('txtDocNo=' + txtDocNo);
	inputs.push('txtDocDate=' + txtDocDate);
	inputs.push('txtMRNTotal=' + txtMRNTotal);
	inputs.push('txtMRNRemark=' + txtMRNRemark);
	inputs.push('txtMRNLocationName=' + txtMRNLocationName);
	inputs.push('txtReceiverName=' + txtReceiverName);
	inputs.push('txtMrnBookerName=' + CurrentuserName);
	inputs.push('MrnApprovedStatus=' + mrnApprovedStatus);
	inputs.push('subInventoryId=' + subInventoryId);

	/* inputs.push('sclMRNLocation=' + sclMRNLocation); */
	inputs.push('status=' + status);
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
			var isEditUpdate = $("#isEditUpdate").val();

			if (isEditUpdate == "Update") {
				/*
				 * var levelValue = $("#levelValue").val(); alert(levelValue);
				 * if(levelValue !=0) { return false; }
				 */
				alert("MRN Updated successfully..!");
				$('#MRNForm').removeClass('fade');
				$('#MRNForm').modal('hide');
				// $('#showhideMrnMaintabs').show();
				$('#mrn').tab('show');
				onmrn();
				fetchMaterialRequestNoteDetailsShows();
				fetchMaterialRequestNoteDetailsforIssue();
			} else {
				alert("Mrn generated successfully..!");
				$('#MRNForm').removeClass('fade');
				$('#MRNForm').modal('hide');
				// $('#showhideMrnMaintabs').show();
				$('#mrn').tab('show');
				onmrn();
				fetchMaterialRequestNoteDetailsShows();
				fetchMaterialRequestNoteDetailsforIssue();

			}

			// window.location.replace("inventory_Materail_Request_Note.jsp");
		}
	});
}

function getNextMaterialRequestNoteIds() {
	// $("#txtMRNDate").val($("#todayDate").text());
	var todaysDate = $("#todayDate").html();
	todaysDate = todaysDate.split('-').join('/');

	var inputs = [];
	inputs.push('action=getMaterailRequestNoteNextId');
	inputs.push('tableName=inv_mrn_master');
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
			$("#txtmaterialReqaestNoteDocId").val(r);
			$("#txtMRNDate").val(todaysDate);

		}
	});
}

/* view dynamic data into the page on lodeing the page */

function viewMRNDetails(MrnId) {
	if (MrnId == null || MrnId == "") {
		alert("Plz enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	$("#isEditUpdate").val("Update");
	$('#iToHideBtns').css('display', 'none');
	$('#approvedHideBtns').css('display', 'block');
	// $('#ApprovedByIncharge2').css('display', 'block');
	refreshonview();
	var obj = $("#MRNAjaxResp").html();
	objMrnMaster = JSON.parse(obj);
	for (var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtmaterialReqaestNoteDocId")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
			/**
			 * *********************************date*convert******************************************
			 */
			/*******************************************************************
			 * **var str =
			 * (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date)
			 * .split("-"); var mrndate = str[2] + "/" + str[1] + "/" + str[0];
			 ******************************************************************/
			$("#txtMRNDate")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
			$("#txtMRNTotal")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
			$("#txtMRNRemark")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);

			$("#txtMRNLocationName")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);

			$("#subInventoryId")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_subinventory_id);

			$("#txtReceiverName")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);
			var Approvdstatus = (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_approved_status)
					.trim();

			document.getElementById("ApprovedByIncharge1").disabled = false;
			document.getElementById("ApprovedByIncharge2").disabled = false;
			if (Approvdstatus == 'NYA') {
				document.getElementById("ApprovedByIncharge2").disabled = true;
				document.getElementById("ApprovedByIncharge1").disabled = false;
			} else {
				document.getElementById("ApprovedByIncharge1").disabled = true;
				document.getElementById("ApprovedByIncharge2").disabled = false;
			}
			break;
		}

	}

	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteDocId").val();
	inputs.push('txtmaterialReqaestNoteDocId=' + txtmaterialReqaestNoteDocId);
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

						$("#ItemInfoTable > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' > <td> <input type='checkbox'  name='checkbox"
												+ count
												+ "' id='refreshPopUpcheckbox "
												+ count
												+ "' > </td> <td><input type='text' id='txtSrNo"
												+ count
												+ "' name='txtSrNo'  value="
												+ count
												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtinventoryMaterailRequestNote"
												+ count
												+ "' name='txtinventoryMaterailRequestNote'  value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
												+ "  class='form-control input-SmallText'></td>"
												+ " <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
												+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
												+ count
												+ "' "
												+ "onkeyup='autoSuggest(this.id,onchange)'  class='typeahead form-control input-SmallText' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
												+ "'/> <input type='hidden'  id='txtMRNItemcodeId"
												+ count
												+ "' value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
												+ " /></div></td>"
												+ "<input type='hidden'  id='txtMRNID"
												+ count
												+ "' /><td> <input id='txtinventoryMaterailRequestNoteIssueQuantity"
												+ count
												+ "' class='form-control input-SmallText' type='hidden' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "'/>    <input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
												+ count
												+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
												+ "'  onkeypress='return validateNumbers(event);' ></td>  "
												+ "<td id='xyz'><select onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "'><option selected=selected >"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
												+ "</option></select></td>  <td> <input type='hidden' id='txtinventoryMaterailRequestNoteMainStock"
												+ count
												+ "' value='0' class='form-control input-SmallText' /> <input type='text' id='txtinventoryMaterailRequestNoteCurrentStock"
												+ count
												+ "' class='form-control input-SmallText'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].currentSubInventoryStock
												+ "' readonly></td></tr>");

						$("#txtMRNID").val(count);
						count++;
						test++;

					}
					totalDocQty();
					// autoSuggestionForLocation("txtMRNLocationName","onchange");
					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);

				}

			});

}

/**
 * *************************************Auto suggetion for stock in
 * mrn***********************************
 */

function autoSuggestForStock(inputID, typeauto) {
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
		}

	}
}

/**
 * **************************************change values on edit
 * Quntityiteams***********************************
 */

function getSalesDetailsOnChange(id, count) {
	// alert("hii");

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

var selInventorySalesDetailsTemplateforMRNOnEdit = "<select>"
		+ "<option id ='firstselect' selected='selected' > -select-  </option>"
		+ "{#foreach $T.ltInventoryItemMasterDTOs as ltInventoryItemMasterDTOs}"
		+ "<option  value='{$T.ltInventoryItemMasterDTOs.item_sales_id}'>{$T.ltInventoryItemMasterDTOs.item_sales_factor_uom1}</option>"
		+ "<option  value='{$T.ltInventoryItemMasterDTOs.item_sales_id}'>{$T.ltInventoryItemMasterDTOs.item_sales_factor_uom2}</option>"
		+ "<option  value='{$T.ltInventoryItemMasterDTOs.item_sales_id}'>{$T.ltInventoryItemMasterDTOs.item_sales_factor_uom3}</option>"
		+ "<option  value='{$T.ltInventoryItemMasterDTOs.item_sales_id}'>{$T.ltInventoryItemMasterDTOs.item_sales_factor_uom4}</option>"
		+ "{#/for}" + "</select>";

function refreshPopUp() {
	$('#MRNForm').find('input:text').val('');
	$('#MRNForm').find('textarea').val('');

	// getNextMaterialRequestNoteId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtMRNTotal").val("");
	$("#txtMRNRemark").val("");
	$("#txtMRNItemName").val("");
	$("#txtMRNDocQuantity").val("");
	$("#txtfactor1").val("");
	$("#txtfactor2").val("");
	$("#txtfactor3").val("");
	$("#txtfactor4").val("");
	$("#txtMRNID").val('');
	window.location.reload("inventory_Materail_Request_Note.jsp");

}
function refreshonview() {
	$('#MRNForm').find('input:text').val('');
	$('#MRNForm').find('input:hidden').val('');

	$('#MRNForm').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#MRNForm').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	isNew = 1;
}

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

	$("#txtMRNTotal").val(sum);

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

	$("#txtMRNTotal").val(sum);
	$("#txtConsumptionTDocQty").val(sum);
	$("#txtMRNID").val(txtMRNID);

}

function autoSuggestionForLocation(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];
	$("#subInventoryId").val('0');
	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchLocationAndNameAtuosugg');
		inputs.push('txtVal=' + txtVal1);
		inputs.push('isEdit=no');
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
						// alert(r);
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');

							for (var i = 0; i < ajaxResponse.ltSubInventoryDTO.length; i++) {
								availableTags
										.push(ajaxResponse.ltSubInventoryDTO[i].subinventory_name
												+ "_"
												+ ajaxResponse.ltSubInventoryDTO[i].subinventory_Id);
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
									onSelect : displayResult1,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult1(item) {
			$('#' + inputID).val(item.text);
			$("#subInventoryId").val(item.value);

			var txtMRNLocationName = $("#txtMRNLocationName").val();
			var inputs = [];
			inputs.push('action=fetchLocationforNameAtuosugg');
			inputs.push('txtVal=' + item.text);
			inputs.push('isEdit=yes');
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(result) {
					// alert(result);
					pobj1 = eval('(' + result + ')');
					$("#sclMRNLocation").setTemplate(selSubInventoryLocation);
					$("#sclMRNLocation").processTemplate(pobj1);

				}
			});

		}

	}

}

/*
 * function locations() { var txtMRNLocationName =
 * $("#txtMRNLocationName").val(); alert("your name "+txtMRNLocationName);
 * inputs.push('action=fetchLocationforNameAtuosugg'); inputs.push('txtVal=' +
 * txtMRNLocationName); inputs.push('isEdit=yes'); var str = inputs.join('&');
 * 
 * jQuery .ajax({ async : true, type : "POST", data : str + "&reqType=AJAX", url :
 * "InventoryServlet", timeout : 1000 * 60 * 15, cache : true, error :
 * function() { alert('error'); }, success : function(r) { alert(r);
 * alert("hiiiiii"); pobj1 = eval('(' + r + ')');
 * $("#txtPurchaseQuotationList").setTemplate(selSubInventoryLocation);
 * $("#txtPurchaseQuotationList").processTemplate(pobj1);
 *  } }) }
 */

var selSubInventoryLocation = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltSubInventoryDTO as ltSubInventoryDTO}"
		+ "<option  value='{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_location}</option>"
		+ "{#/for}";

function fetchMRNDetailByIdNoteList(mrnId) {

	var subinventory = $('#txtwardName').val();
	// alert("in serach mrn=="+subinventory);
	if (mrnId == "") {
		alert("Please enter  mrn Id");
		$("#byMrnId").focus();
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(mrnId)) {
		alert("MRN id should be of digits only.!");
		$("#byMrnId").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
	inputs.push('isEdit=yes');
	inputs.push('MrnId=' + mrnId);
	inputs.push('subinventory=' + subinventory);

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
			objMRN = JSON.parse(r);
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {

				$("#MRNcontent").setTemplate(inventoryMRNTemp);
				$("#MRNcontent").processTemplate(pobj1);

			} else {
				alert("Record not found..!");
				fetchMaterialRequestNoteListDetails();
			}
			$('#byMrnId').val("");

		}
	});
}

/**
 * fecth stock details by ward name
 * 
 * @modifyied Date 16/march/2016
 * @author sudhir*
 */
function fetchStockDetailsByWardName(WardName) {
	var subInventoryId = $("#subInventoryId").val();
	//alert("hi:"+WardName);
	if (WardName == null || WardName == "" || subInventoryId == '0') {
		alert("Please Enter Proper subinventory name");
		$("#txtwardName").focus();
		$("#subInventoryId").val('0');
		/* $('#txtwardName').css('border-color', 'red'); */
		return false;
	} else {
		$('#txtwardName').css('border-color', '');
		var inputs = [];
		inputs.push('action=fetchStockDetailsByWardName');
		inputs.push('isEdit=yes');
		inputs.push('WardName=' + WardName);

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

						 //alert(JSON.stringify(r));
						SrNa = 1;
						pobj1 = eval('(' + r + ')');
						objMRN = JSON.parse(r);
						if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {

							/* window.location.reload("inventory_Materail_Request_Note.jsp"); */
							$('#showhideMrnMaintabs').show();
							/*
							 * onindent(); $('#Indent').show();
							 * $("#MRN").hide(); $("#Recieved").hide();
							 * $("#ConsumptionBY").hide();
							 * $("#AvailableStock").hide();
							 */

							fetchMaterialRequestNoteDetailsShows();
							fetchMaterialRequestNoteDetailsforIssue();
							// fetchMaterialRequestNoteDetailsForStockAvaialable();

							fetchMaterialRequestNoteStockDetailsForSubInventory();
							fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock();
							featchConsumtionMasterDetails();
							fetchMrnApproveStatus();

						} else {
							$('#showhideMrnMaintabs').show();
							// alert("Record not found..!");

						}
						/*
						 * fetchMaterialRequestNoteDetailsShows();
						 * fetchMaterialRequestNoteDetailsforIssue();
						 * fetchMaterialRequestNoteStockDetailsForSubInventory();
						 * 
						 * fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock();
						 * featchConsumtionMasterDetails();
						 */

					}
				});
	}
}

function fetchMaterialRequestNoteDetailsShows() {
	var subinventory = $('#txtwardName').val();
	// alert("in mrn fecth=="+subinventory);
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
	inputs.push('isEdit=no');
	inputs.push('subinventory=' + subinventory);
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
			// alert(r);
			$("#MRNcontent").setTemplate(inventoryMRNTemp);
			$("#MRNcontent").processTemplate(pobj1);
			$("#MRNAjaxResp").html(r);
		}
	});
}

function fetchMaterialRequestNoteDetailsforIssue() {
	var subinventory = $('#txtwardName').val();
	// alert("in mrn receved=="+subinventory);
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailRecieved');
	inputs.push('isEdit=no');
	inputs.push('subinventory=' + subinventory);
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

			$("#MRNcontentRecieved").setTemplate(inventoryMRNTemp1Recieved);
			$("#MRNcontentRecieved").processTemplate(pobj1);
			$("#MRNAjaxRespRecieved").html(r);

			// set template for mrn return @author:paras @Date:21nov
			$("#txtMRNReturnTo").setTemplate(selMrnTemplate);
			$("#txtMRNReturnTo").processTemplate(pobj1);

		}
	});
}

function fetchMRNDetailByIdReceipt(mrnId) {
	// alert("mrn id in recevied"+mrnId);
	var subinventory = $('#txtwardName').val();
	// alert("in serach=="+subinventory);
	if (mrnId == "") {
		alert("Please enter MRN Id");
		$("#byMrnIdRecieved").focus();
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(mrnId)) {
		alert("MRN id should be of digits only!");
		$("#byMrnIdRecieved").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailRecieved');
	inputs.push('isEdit=yes');
	inputs.push('MrnId=' + mrnId);
	inputs.push('subinventory=' + subinventory);

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

						// alert("sucess");
						$("#MRNcontentRecieved").setTemplate(
								inventoryMRNTemp1Recieved);
						$("#MRNcontentRecieved").processTemplate(pobj1);

					} else {
						alert("Record not found..!");
						/*
						 * $("#MRNcontentRecieved").setTemplate("oops! No Record
						 * Found"); $("#MRNcontentRecieved").css("text-align",
						 * "left");
						 * $("#MRNcontentRecieved").processTemplate(pobj1);
						 */
						// fetchMaterialRequestNoteDetailsShows();
						fetchMaterialRequestNoteDetailsforIssue();
					}
					$('#byMrnIdRecieved').val("");

				}
			});
}

/*
 * var inventoryMRNTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th ' class='col-md-2 center'><div>MRN Doc No</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO} <tr> {#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ='complete'}<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#Purchase_Request'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='submit'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-edit'></i></button></td>
 * <td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#/if}{#/for}</table>"
 */

/* odl templete befor edit and delete button @Date:4:feb:2016 */
/*
 * var inventoryMRNTemp1Recieved = "<table class='table table-striped'
 * style='margin: 10px;width: 98%;'>" + "<thead class='cf' style='background:
 * white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Dispatch date </div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Received
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier
 * Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>
 * Mrn Raised By</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'complete'}<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td> " + "
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_recived_date}</td>
 * <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>
 * <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#MRNForm'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT' disabled><i class='fa fa-edit'></i></button></td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-trash-o'></i></button></td>
 * <td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#/if}{#/for}</table>";
 */

/**
 * *New templete after edit and delete button
 * 
 * @Date:4:feb:2016 **
 */
var inventoryMRNTemp1Recieved = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Dispatch date </div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Received Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div> Mrn Raised By</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>view</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>status</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'complete'}<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td> "
		+ " <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_recived_date}</td> <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td> "
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' data-target='#MRNPartialReceive' data-toggle='modal'  onclick=\"viewRecivedMRN({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" ><i class='fa fa-edit'></i></button></td> <td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#/if}{#/for}</table>";

function onloadindent() {
	$("#indent").css("background-color", "#81A981");
	$("#indent").css("color", "white");
	$("#ConsumptionBY").hide();
}

function onindent() {
	// $("#showhideMrnMaintabs").show();
	$("#indent").css("background-color", "#81A981");
	$("#indent").css("color", "white");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");
	$("#stock").css("color", "black");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");

	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#availablestock").css("color", "black");
	$("#availablestock").css("background-color", "");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");

}
function onmrn() {
	$("#indent").css("background-color", "");
	$("#mrn").css("background-color", "#81A981");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");

	$("#indent").css("color", "black");
	$("#mrn").css("color", "white");
	$("#recieved").css("color", "black");
	$("#stock").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "black");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");
	$("#availablestock").css("color", "black");
	$("#availablestock").css("background-color", "");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");
}
function onrecieved() {
	$("#indent").css("background-color", "");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "#81A981");
	$("#stock").css("background-color", "");

	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "white");
	$("#stock").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");
	$("#availablestock").css("color", "black");
	$("#availablestock").css("background-color", "");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");

}
function onstock() {
	$("#indent").css("background-color", "");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "#81A981");

	$("#availablestock").css("background-color", "");
	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#stock").css("color", "white");
	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");
	$("#availablestock").css("color", "black");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");

	fetchMaterialRequestNoteStockDetailsForSubInventory();
	fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock();

}

function onConsumptionBY() {

	$("#ConsumptionBY").show();
	$("#MrnReturn").hide();
	$("#indent").css("background-color", "");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");
	$("#consumptionBY").css("background-color", "#81A981");
	$("#availablestock").css("background-color", "");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");
	$("#consumptionBY").css("color", "white");
	$("#stock").css("color", "black");
	$("#availablestock").css("color", "black");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");
}

function onAvailableonstock() {

	$("#ConsumptionBY").hide();
	$("#indent").css("background-color", "");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");
	$("#availablestock").css("background-color", "#81A981");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");
	$("#stock").css("color", "");
	$("#availablestock").css("color", "white");
	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");

	fetchMaterialRequestNoteStockDetailsForSubInventory();
	fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock();
}

function onapproved() {
	$("#indent").css("background-color", "");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");
	$("#approved").css("background-color", "#81A981");
	$("#availablestock").css("background-color", "");
	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");

	$("#stock").css("color", "");
	$("#approved").css("color", "white");
	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");
	$("#availablestock").css("color", "black");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");

	fetchMrnApproveStatus();
}
/*******************************************************************************
 * @author : paras suryawanshi
 * @date :19nov2016
 * @code : tab baground color & hide onclick other tabs.
 ******************************************************************************/
function onmrnReturn() {
	$("#MrnReturn").show();
	$("#ConsumptionBY").hide();
	$("#mrnReturn").css("background-color", "#81A981");
	$("#mrnReturn").css("color", "white");
	$("#indent").css("background-color", "");
	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");
	$("#stock").css("color", "black");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");

	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#availablestock").css("color", "black");
	$("#availablestock").css("background-color", "");

}
// search stock mrn by item names
function fetchMrnItemNameSearchForStockAvaialable() {
	var subinventory = $('#txtwardName').val();
	var txtItemnameStock = $('#txtItemnameStock').val();
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtItemnameStock)) {
		alert("Item name should be of alphabets and digits only with a single space allowed..!");
		$("#txtparentcompany").focus();
		return false;
	}
	// alert("in mrn stock search inventory=="+subinventory);
	// alert("in mrn stock item name=="+txtItemnameStock);
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsStcock');
	inputs.push('isEdit=yes');
	inputs.push('subinventory=' + subinventory);
	inputs.push('txtItemnameStock=' + txtItemnameStock);
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
			objMRN = JSON.parse(r);
			SrNo = 1;
			if (objMRN.inventoryMRNStockDTO.length > 0) {

				$("#MRNcontentStock").setTemplate(inventoryMRNTempStock);
				$("#MRNcontentStock").processTemplate(pobj1);

			} else {
				alert("Record not found..!");
				fetchMaterialRequestNoteDetailsForStockAvaialable();
			}

		}
	});
}

// stock Recived stock in SubInventory
var SrNo = 1;
var inventoryMRNTempStock = "<table class='table table-striped ' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Item Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Item Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Received Date </div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Received Quantity</div></th>"
		+ "</tr>"
		+ "</thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteItemInfoSlaveDTO as inventoryMaterialRequestNoteItemInfoSlaveDTO}"
		+ "<tr class='center'>"
		+ "<td>{SrNo++}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_id}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_item_code}</td>"
		+ "<td style='text-align=left' >{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_item_name}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.inv_mrn_received_date}</td>"
		+ "<td style='text-align=left' >{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_fixed_issue_qty_to_subinventory}</td>"
		+ "</tr>" + "{#/for}</table>";

// stock Available stock in SubInventory
var SrNa = 1;
var inventoryMRNAvailableStock = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Item Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Item Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Available Quantity</div></th>"
		+ "</tr>"
		+ "</thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteItemInfoSlaveDTO as inventoryMaterialRequestNoteItemInfoSlaveDTO}"
		+ "<tr class='center'>"
		+ "<td>{SrNa++}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_item_code}</td>"
		+ "<td style='text-align = left'>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_item_name}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_issue_qty}</td>"
		+ "</tr>" + "{#/for}</table>";

/*
 * function fetchMaterialRequestNoteDetailsForStockAvaialable() { var
 * subinventory = $('#txtwardName').val(); //alert("in mrn
 * receved=="+subinventory); var inputs = [];
 * inputs.push('action=fetchMaterialRequestNoteDetailsStcock');
 * inputs.push('isEdit=no'); inputs.push('subinventory=' + subinventory); var
 * str = inputs.join('&'); jQuery.ajax({ async : true, type : "POST", data : str +
 * "&reqType=AJAX", url : "InventoryServlet", timeout : 1000 * 60 * 5, catche :
 * false, error : function() { alert("error"); }, success : function(r) { pobj1 =
 * eval('(' + r + ')'); // alert(r);
 * $("#MRNcontentStock").setTemplate(inventoryMRNTempStock);
 * $("#MRNcontentStock").processTemplate(pobj1); $("#MRNAjaxRespStock").html(r); }
 * }); }
 */

/**
 * ***************************************** Featch subInventory stock for
 * particular SubInventory ****************************************************
 */

function fetchMaterialRequestNoteStockDetailsForSubInventory() {
	var subinventory = $('#txtwardName').val();
	// alert("in mrn receved=="+subinventory);
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteStockDetailsForSubInventory');
	inputs.push('isEdit=no');
	inputs.push('subinventory=' + subinventory);
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
			SrNo = 1;
			pobj1 = eval('(' + r + ')');
			$("#MRNcontentStock").setTemplate(inventoryMRNTempStock);
			$("#MRNcontentStock").processTemplate(pobj1);
			$("#MRNAjaxRespStock").html(r);
		}
	});
}

/**
 * ************************************* Consumption for patient and indiviual
 * Author:sudhir Date 11:8:2015 ***********************************
 */

function setConsumptionBYDiv() {
	var sclConsumptionBY = $("#sclConsumptionBY option:selected").text();
	$("#iToHideBtnsConsumption").show();
	$("#btnAddNewConsumption").show();
	$("#btnRemoveConsumption").show();

	// $("#txtMRNDispencedDate").attr('autocomplete', 'off');

//	$("#txtMRNDispencedDate").val(new Date().toLocaleDateString());

	if (sclConsumptionBY == "Individual") {

		$("#txtConsumedBy").val(sclConsumptionBY);
		/*
		 * $("#divchkOPD").hide(); $("#divchkIPD").hide();
		 */
		$("#AlloptionBtn").hide();
		$("#divtxtPatientName").hide();
		$("#divtxtPatientId").hide();

		$("#divtxtMRNDispensedtoOthers").show();
		$("#divtxtMRNDispensedto").show();
		$("#ConsumptionIndividualForm").show();

		$("#txtPatientId").val(0);
		$("#txtPatientTreatmentId").val(0);
		getConsumptionMasterNextId();

	}
	createDivforConsumption();
	if (sclConsumptionBY == "Patient") {
		/* $("input:radio").attr("checked", true); */
		/* $("#typeOfpatient").prop('checked', true); */
		/*
		 * $("#IPDchk").prop('checked', true);
		 * $("#chkEntireDatabase").prop('checked', true);
		 */

		$("#OPDchk").val('opd');
		$("#IPDchk").val('ipd');
		$("#chkEntireDatabase").val('diagnosis');
		$("#txtMRNDispensedtoId").val(0);

		$("#txtConsumedBy").val(sclConsumptionBY);
		$("#divtxtMRNDispensedto").hide();
		$("#divDispensedName").hide();
		$("#divtxtMRNDispensedtoOthers").hide();
		$("#divtxtPatientName").hide();
		$("#divtxtPatientId").hide();
		$("#AlloptionBtn").show();
		$("#ConsumptionIndividualForm").show();
		getConsumptionMasterNextId();
	}
	if (sclConsumptionBY == "-select-") {
		alert("please select at least one  Consumption !");
	}

}

function addDispensedtoOthersName() {

	var lfckv = document.getElementById("chkOther").checked;
	if (lfckv == true) {
		$("#divDispensedName").show();

		document.getElementById("txtMRNDispensedto").disabled = true;

		$("#txtMRNDispensedto").val('');
		$("#txtMRNDispensedtoId").val(0);
		// $("#divtxtMRNDispensedto").hide();
	} else {
		$("#divDispensedName").hide();
		// $("#divtxtMRNDispensedto").show();
		document.getElementById("txtMRNDispensedto").disabled = false;
	}

}

/**
 * ******************************************create daynamic row for Consumption
 * Author:sudhir Date 11:8:2015*********************************************
 */

function createDivforConsumption() {

	$('#iToHideBtnsConsumption').css('display', 'block');
	$('#ConsumptionClose').hide();
	if (test > 0 && isNew > 0) {
		if (count == 1) {
			/*
			 * var lenghtofpobj =
			 * pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; count =
			 * lenghtofpobj;
			 */
			count = test;

		}
		// alert(count);

		$("#ItemInfoTableforConsumption > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='chkbox"
								+ (count)
								+ "'> </td>  <td><input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input readonly='readonly' type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' onchange='getSubInventoryAvaliableStock("
								+ count
								+ ")' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "' value='0'  /></div></td> <td><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' readonly='readonly' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteIssueQuantityAvail"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' readonly='readonly' id='txtinventoryMaterailRequestNoteDocQuantityAvail"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td><td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option value = '0'>-Select-</option></select></td>  <td><select class='form-control input-SmallText' id='sclItemStatus_"
								+ count
								+ "'><option value = '0'>-Select-</option><option value = 'Consumed'>Consumed</option><option value = 'In-use'>In-use</option></select></td><td><input onclick='updateSubInventoryStockQty("
								+ count + ")' "
								+ "type='button' value='accept' id='accept"
								+ count
								+ "'class='btn btn-xs btn-success'></td> ");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
		// count++;
		/* totalDocQty(); */

	} else {

		$("#ItemInfoTableforConsumption > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='chkbox"
								+ count
								+ "'> </td>  <td> <input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote' value ='0'   class='form-control input-SmallText'> <input readonly='readonly' type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' onchange='getSubInventoryAvaliableStock("
								+ count
								+ ")' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "'  value='0' /> </div></td> <td><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='chcknulldocQty()'></td> "

								+ "<td><input type='hidden' id='txtinventoryMaterailRequestNoteAvailQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /> <input type='text' readonly='readonly' id='txtinventoryMaterailRequestNoteDocQuantityAvail"
								+ count
								+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='chcknulldocQty()'></td> "

								+ "<td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option value = '0'>-Select-</option></select></td> <td><select class='form-control input-SmallText' id='sclItemStatus_"
								+ count
								+ "'><option value = '0'>-Select-</option><option value = 'Consumed'>Consumed</option><option value = 'In-use'>In-use</option></select></td>");
		
		
		/* <td><input onclick='updateSubInventoryStockQty("
				+ count + ")' "
				+ "type='button' value='accept' id='accept"
				+ count
				+ "'class='btn btn-xs btn-success'></td>
				
				
*/		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
		count++;

	}

}

/**
 * ************************************* Show show Pateint Name and ID
 * Author:sudhir Date 11:8:2015 ******************************
 */

function showPateintNameandID() {
	// $("input:radio").attr("checked", true);
	$("#divtxtPatientName").show();
	$("#divtxtPatientId").show();

	$("#txtPatientName").val('');
	$("#txtPatientId").val('');
	$("#txtPatientTreatmentId").val('');

	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
	/*
	 * if(typeOfpatient==""||typeOfpatient==null) { alert(typeOfpatient);
	 * 
	 * return false; }
	 */

	//autoSuggestionForPateintNameForOt("txtPatientName", "onload");
}

function hideConsumptionDiv() {

	$('#ConsumptionIndividualForm').find('input:text').val('');
	$('#ConsumptionIndividualForm').find('input:hidden').val('');

	$('#ConsumptionIndividualForm').find('input:text').val('');
	$('#ItemInfoTableforConsumption').find('input:text').val('');
	$('#ConsumptionIndividualForm').find('textarea').val('');
	$("#ItemInfoTableforConsumption > tbody").html('');
	$("input:radio").attr("checked", false);
	$('#sclConsumptionBY').attr('value', 'select');

	isNew = 0;
	count = 1;

	$("#ConsumptionIndividualForm").hide();
	$("#showhideMrnMaintabs").show();
	onConsumptionBY();

}

/**
 * ***************************** show and hide Dispenced Popup Author:Sudhir
 * Date :18/8/2015******************************************
 */

function hideDispecedpopup() {

	$("#MRNDispensedList").hide();
	$("#requiredQty").val('');

	$("#ConsumptionIndividualForm").show();
	$("#showhideMrnMaintabs").hide();

}
/** get SubInventory Stock for Indiviual or * Pateint ****** */
function getSubInventoryAvaliableStock(count) {

	var txtMRNItemcodeId = $("#txtMRNItemcodeId" + count).val();
	var txtinventoryMaterailRequestNoteItemcode_ = $(
			"#txtinventoryMaterailRequestNoteItemcode_" + count).val();
	var txtwardName = $("#txtwardName").val();
	$("#hiddenCount").val(count);
	if (txtinventoryMaterailRequestNoteItemcode_ == 0 || txtMRNItemcodeId == 0) {
		alert("Please Enter Item Name In " + count + " Row");
		$("#txtinventoryMaterailRequestNoteItemcode_" + count).focus();
		return false;

	}
	// $("#MRNDispensedList").show();
	$("#requiredQty").val('');

	var inputs = [];
	inputs.push('action=getSubInventoryAvaliableStockDetailsforConsumption');
	inputs.push('SubInventoryName=' + txtwardName);
	inputs.push('ItemName=' + txtinventoryMaterailRequestNoteItemcode_);
	inputs.push('ItemCode=' + txtMRNItemcodeId);
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

					// alert(pobj1.ltbatchstockDTO[0].avialbleItem);

					$(
							"#txtinventoryMaterailRequestNoteDocQuantityAvail"
									+ count)
							.val(
									pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[0].mrn_item_info_slave_issue_qty);
					$("#totalItemQty")
							.val(
									pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[0].mrn_item_info_slave_issue_qty);

					var totalItemQty = $("#totalItemQty").val();

					if (totalItemQty == 0) {
						document.getElementById("requiredQty").disabled = true;
					} else {
						document.getElementById("requiredQty").disabled = false;
					}

				}
			});

}

/**
 * ***********************************Check and Dispensed value to SubInventory
 * Author sudhir
 * Date:19:8:2015***************************************************
 */

function issueQtyAssign() {

	var hiddenCount = $("#hiddenCount").val();
	var requiredQty = $("#requiredQty").val();
	var totalItemQty = $("#totalItemQty").val()
	/*
	 * if(requiredQty > totalItemQty) { alert("Required Items Quantity should
	 * Not Greater then Available Items Quantity"); $("#requiredQty").focus();
	 * return false; }
	 */

	var docqty = $("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount)
			.val(requiredQty);

	$('#MRNDispensedList').hide();

	chcknulldocQty();
	$("#requiredQty").val('');
}

/**
 * ** deduct the item Quantity form SubInventory Stock from *
 * mrn_item_info_slave table in isseue_Quantity column Author: Sudhir , Date*
 * :19:8:2015***
 */
function updateSubInventoryStockQty(count) {
	var txtQuantity = $("#txtinventoryMaterailRequestNoteDocQuantity" + count)
			.val();
	var txtItemCode = $("#txtMRNItemcodeId" + count).val();
	var txtItemName = $("#txtinventoryMaterailRequestNoteItemcode_" + count)
			.val();
	var txtSubInventoryName = $("#txtwardName").val();
	var typeOfpatient = $("#referedTo").val();
	var txtPatientName = $("#txtPatientName").val();
	var txtPatientId = $("#txtPatientId").val();
	var txtPatientTreatmentId = $("#txtPatientTreatmentId").val();
	var selItemQty = $("#selItemQty_" + count + " option:selected").text();
	var avlqty = $("#txtinventoryMaterailRequestNoteDocQuantityAvail" + count)
			.val();
	if (txtQuantity == "" || txtQuantity == null || txtQuantity == undefined) {

		alert("Without filling Item Quantity you can not accept request");

		return false;

	}
	// alert(avlqty);
	if (parseInt(txtQuantity) > parseInt(avlqty)) {

		alert("Required Quantity should be less than Available Quantity!!");

		return false;

	}

	if (selItemQty == 0 || selItemQty == '-Select-') {
		alert("Please select uom in " + count + " row");
		$("#selItemQty_").focus();
		return false;
	}

	if (typeOfpatient == 'ipd') {
		if (txtPatientName == '' || txtPatientName == null
				|| txtPatientName == undefined || txtPatientId == ''
				|| txtPatientId == null || txtPatientId == undefined) {
			alert("Please Enter Patient Name !");
			return false;
		}
	}

	/*
	 * if(txtQuantity == 0) { alert("Without filling Mrn Quantity you can not
	 * accept request "); }
	 */
	var inputs = [];
	inputs.push('action=UpdateSubInventoryStockQty');
	inputs.push('txtItemCode=' + txtItemCode);
	inputs.push('txtQuantity=' + txtQuantity);
	inputs.push('txtItemName=' + txtItemName);
	inputs.push('txtSubInventoryName=' + txtSubInventoryName);

	inputs.push('typeOfpatient=' + typeOfpatient);
	inputs.push('txtPatientName=' + txtPatientName);
	inputs.push('txtPatientId=' + txtPatientId);
	inputs.push('txtPatientTreatmentId=' + txtPatientTreatmentId);

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
					/* ajaxResponse = r; */
					//alert(r);
					// window.location.replace("inventory_Materail_Request_List.jsp");
					// alert("hii sudhir you are in update");

					var txtMRNID = $("#txtMRNID").val();
					var totalRow = $("#totalRow").val();
					var totalQtys;
					
					
					
					/*
					 * for ( var i = 1; i <= txtMRNID; i++) { var
					 * txtinventoryMaterailRequestNoteDocQuantity =
					 * $("#txtinventoryMaterailRequestNoteDocQuantity"+
					 * i).val();
					 * 
					 * if(txtinventoryMaterailRequestNoteDocQuantity != "") {
					 * document.getElementById("chkbox"+ i).disabled = true;
					 * document.getElementById("accept"+ i).disabled = true;
					 * document.getElementById("iCheckAvailabilty"+ i).disabled =
					 * true;
					 * document.getElementById("txtinventoryMaterailRequestNoteItemcode_"+
					 * i).disabled = true;
					 * document.getElementById("txtinventoryMaterailRequestNoteDocQuantity"+
					 * i).disabled = true;
					 * document.getElementById("selItemQty_"+ i).disabled =
					 * true; document.getElementById("sclItemStatus_"+
					 * i).disabled = true;
					 *  } else {
					 * 
					 * document.getElementById("chkbox"+ i).disabled = false;
					 * document.getElementById("accept"+ i).disabled = false;
					 * document.getElementById("iCheckAvailabilty"+ i).disabled =
					 * false;
					 * document.getElementById("txtinventoryMaterailRequestNoteItemcode_"+
					 * i).disabled = false;
					 * document.getElementById("selItemQty_"+ i).disabled =
					 * false; document.getElementById("sclItemStatus_"+
					 * i).disabled = false;
					 *  }
					 *  }
					 */

					document.getElementById("chkbox" + count).disabled = true;
					document.getElementById("accept" + count).disabled = true;
					document.getElementById("iCheckAvailabilty" + count).disabled = true;
					document
							.getElementById("txtinventoryMaterailRequestNoteItemcode_"
									+ count).disabled = true;
					document
							.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
									+ count).disabled = true;
					document.getElementById("selItemQty_" + count).disabled = true;
					document.getElementById("sclItemStatus_" + count).disabled = true;
					
					
					
					

					/*
					 * for ( var i = 1; i <= txtMRNID; i++) {
					 * 
					 * totalQtys =
					 * $("#txtinventoryMaterailRequestNoteDocQuantity" +
					 * i).val(); }
					 */

				}
			});
}

/**
 * ********************************************************************** show
 * Available stock of subInventory Author :sudhir Date
 * :20:8:2015***************************************************************
 */
function fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock() {
	var subinventory = $('#txtwardName').val();
	// alert("in mrn receved=="+subinventory);
	var inputs = [];
	inputs
			.push('action=fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock');
	inputs.push('isEdit=no');
	inputs.push('subinventory=' + subinventory);
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
			SrNa = 1;
			pobj1 = eval('(' + r + ')');
			$("#MRNcontentAvailableStock").setTemplate(
					inventoryMRNAvailableStock);
			$("#MRNcontentAvailableStock").processTemplate(pobj1);
			$("#MRNAjaxRespAvailableStock").html(r);
		}
	});

}

/**
 * ******************************* Genrate new next Id for Consumtion Master
 * **************************************** Author :Sudhir Date :22:8:2015
 */
function getConsumptionMasterNextId() {

	var inputs = [];
	inputs.push('action=getMaterailRequestNoteNextId');
	inputs.push('tableName=inv_consumption_master');
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
			$("#txtConsumedId").val(r);
		}
	});
}

/**
 * *************************** AutoSuggetion for Dispesed To Author: sudhir
 * Date:21:8:2015***************************************************
 */
function autoSuggestionForDispensedto(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchDispensedtoNameAutosugg');
		inputs.push('txtVal=' + txtVal1);
		inputs.push('isEdit=no');
		var str = inputs.join('&');

		jQuery.ajax({
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
				// alert(r);
				// alert(r.length);
				var availableTags = [];
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = eval('(' + r + ')');

					for (var i = 0; i < ajaxResponse.ul.length; i++) {
						availableTags.push(ajaxResponse.ul[i].un + "_"
								+ ajaxResponse.ul[i].ui);
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
								+ (arrValue[1]) + '" class=""><a href="#">'
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
							onSelect : displayResult1,
							scrollBar : true

						});

					}, 500);
				}
			}
		});

		function displayResult1(item) {
			$('#' + inputID).val(item.text);
			$("#txtMRNDispensedtoId").val(item.value);
		}

	}

}

/**
 * *************************** AutoSuggetion for Pateint To Author: sudhir
 * Date:21:8:2015***************************************************
 */
function autoSuggestionForPateintName(inputID, typeauto) {

	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
	
	//alert(typeOfpatient);
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}

	// alert(typeOfpatient);

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	
	//alert(txtVal1);
	/*
	 * if(typeOfpatient==null ||typeOfpatient==""||typeOfpatient==undefined) {
	 * return false; }
	 */
	// alert("text value is:"+txtVal1);
	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		inputs.push('action=fetchPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

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
						// alert(r);
						//alert(r.length);
						var availableTags = [];
						if (r.length == 37) {
							alert("NO MATCHING FOUND Please Enter Valid Patient Name !");
							$("#txtPatientName").val('');
							$("#txtPatientName").focus();

						} else {

							ajaxResponse = eval('(' + r + ')');

							for (var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

								availableTags
										.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
												+ "_"
												/*
												 * +
												 * ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName + " " +
												 * ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName +
												 * "__"
												 */
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for (var j = 0; j < availableTags.length; j++) {

								// alert(availableTags[j]);

								var arrValue = (availableTags[j]).split("__");
								var idValue = (arrValue[0]);
								resultData.push({
									ID : idValue,
									Name : arrValue[1]
								});
								// alert("resultData====>"+resultData[0]);
								template = template + '<li data-value="'
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
									onSelect : displayResult1,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult1(item) {

			var pidTip = (item.text).split("_");
			// alert(item.text);
			var pid = pidTip[1];
			var tid = pidTip[2];
			var referedTo = pidTip[3];
			$('#' + inputID).val(item.text);

			$("#txtPatientId").val(pid);
			$("#txtPatientTreatmentId").val(tid);
			$("#referedTo").val(referedTo);
		}

	}

}

/**
 * ** save Consumption Details Author: sudhir* Date:24:8:2015 *modified date
 * 14oct2016 Change date Formate
 */
function saveConsumptionDetails() {

	var txtConsumedId = $("#txtConsumedId").val();
	var txtConsumedBy = $("#txtConsumedBy").val();
	var txtMRNDispencedDate = $("#txtMRNDispencedDate").val();
	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
	var txtConsumptionTDocQty = $("#txtConsumptionTDocQty").val();
	var txtConsumptionRemark = $("#txtConsumptionRemark").val();
	var txtMRNDispensedto = $("#txtMRNDispensedto").val();
	var txtMRNDispensedtoId = $("#txtMRNDispensedtoId").val();

	var txtMRNDispensedtoOthers = $("#txtMRNDispensedtoOthers").val();
	var txtPatientName = $("#txtPatientName").val();

	var txtPatientId = $("#txtPatientId").val();
	var txtPatientTreatmentId = $("#txtPatientTreatmentId").val();
	var txtMRNID = $("#txtMRNID").val();
	var txtwardName = $("#txtwardName").val();
	// var serviceId = $("#14").val();
	if (txtConsumedBy == "Patient") {

		if (txtMRNDispencedDate == null || txtMRNDispencedDate == undefined
				|| txtMRNDispencedDate == "") {
			alert("Please Enter Dispensed Date");
			$("#txtMRNDispencedDate").focus();
			return false;
		}

		if (txtMRNDispencedDate) {
			/*
			 * var today = new Date(); var dd = today.getDate(); var mm =
			 * today.getMonth()+1; //January is 0!
			 * 
			 * var yyyy = today.getFullYear();
			 * 
			 * var today1 = dd+'/'+mm+'/'+yyyy;
			 */
			var today = new Date();

			var dd = today.getDate();
			var mm = today.getMonth() + 1; // January is 0!
			var yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}

			var today1 = dd + '/' + mm + '/' + yyyy;

			if (txtMRNDispencedDate === today1) {

			} else {
				alert("Please Enter Current Date ");
				$("#txtMRNDispencedDate").focus();
				return false;
			}
		}
		var referedTo = $("#referedTo").val();
		if (referedTo != null || referedTo != 0) {
			if (referedTo == 1) {
				typeOfpatient = "opd";
			} else if (referedTo == 2) {
				typeOfpatient = "ipd";
			} else {
				typeOfpatient = "diagnosis";
			}

		}

		if (typeOfpatient == null || typeOfpatient == undefined
				|| typeOfpatient == "") {
			alert("Please select Patient Category OPD or IPD or Entire Database");
			return false;
		}

		if (txtPatientName == null || txtPatientName == undefined
				|| txtPatientName == "") {
			alert("please Enter Patient Name ipd or opd or Entire Database");
			$("#txtPatientName").focus();
			return false;
		}

		if (txtPatientId == null || txtPatientId == undefined
				|| txtPatientId == "") {
			alert("please  Enter Patient Id ipd or opd or Entire Database");
			$("#txtPatientName").focus();
			return false;
		}

	}

	if (txtConsumedBy == "Individual") {
		if (txtMRNDispencedDate == null || txtMRNDispencedDate == undefined
				|| txtMRNDispencedDate == "") {
			alert("please Enter Dispenced  Date");
			$("#txtMRNDispencedDate").focus();
			return false;
		}

		if (txtMRNDispencedDate) {
			/*
			 * var today = new Date(); var dd = today.getDate(); var mm =
			 * today.getMonth()+1; //January is 0!
			 * 
			 * var yyyy = today.getFullYear();
			 * 
			 * var today1 = dd+'/'+mm+'/'+yyyy;
			 */

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; // January is 0!
			var yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}

			var today1 = dd + '/' + mm + '/' + yyyy;

			if (txtMRNDispencedDate === today1) {

			} else {
				alert("Please Enter Current Date ");
				$("#txtMRNDispencedDate").focus();
				return false;
			}
		}

		if (txtMRNDispensedto == "" && txtMRNDispensedtoOthers == "") {
			alert("please Enter Dispenced To");
			return false;

		}
	}

	var materiallist = {
		ltInventoryConsumptionItemSlaveDTOs : []
	};

	for (var i = 1; i < txtMRNID; i++) {
		
		var status=updateSubInventoryStockQty($("#txtSrNo" + i).val());
		
		
		if(typeof status === "undefined")
			{
		
			status=true;
			}
		
		if(!status)
			{
			return false;
			}
		
		

		var txtinventoryMaterailRequestNote = $(
				"#txtinventoryMaterailRequestNote" + i).val();
		if ($("#txtinventoryMaterailRequestNote" + i).val() != null
				&& $("#txtinventoryMaterailRequestNote" + i).val() != undefined) {
			var txtinventoryMaterailRequestNote = $(
					"#txtinventoryMaterailRequestNote" + i).val();
			var txtinventoryMaterailRequestNoteItemcode_ = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i).val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();

			var txtinventoryMaterailRequestNoteDocQuantity = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
			var selItemQty = $("#selItemQty_" + i + " option:selected").text();
			var sclItemStatus_ = $("#sclItemStatus_" + i + " option:selected")
					.text();

			if (txtinventoryMaterailRequestNoteItemcode_ == ""
					|| txtinventoryMaterailRequestNoteItemcode_ == null) {

				alert("Please enter item name in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteItemcode_" + i).focus();
				return false;

			}
			if (txtinventoryMaterailRequestNoteDocQuantity == ""
					|| txtinventoryMaterailRequestNoteDocQuantity == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).focus();
				return false;

			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(txtinventoryMaterailRequestNoteDocQuantity)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).val('');
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).focus();
				return false;
			}

			if (sclItemStatus_ == 0 || sclItemStatus_ == '-Select-') {

				sclItemStatus_ = "Consumed";
			}
			/*
			 * if (selItemQty == 0 || selItemQty == '-Select-') { alert("Please
			 * select uom in " + i + " row"); $("#selItemQty_").focus(); return
			 * false; }
			 * 
			 * if (sclItemStatus_ == 0 || sclItemStatus_ == '-Select-') {
			 * alert("Please select Item Status in " + i + " row");
			 * $("#sclItemStatus_").focus(); return false; }
			 */

			materiallist.ltInventoryConsumptionItemSlaveDTOs
					.push({

						inv_consumption_item_info_slave_id : txtinventoryMaterailRequestNote,
						inv_consumption_info_slave_item_name : txtinventoryMaterailRequestNoteItemcode_,
						inv_consumption_item_info_slave_item_qty : txtinventoryMaterailRequestNoteDocQuantity,
						inv_consumption_item_info_slave_item_code : txtMRNItemcodeId,
						/*
						 * mrn_item_info_slave_item_factor1 : txtfactor1,
						 * mrn_item_info_slave_item_factor2 : txtfactor2,
						 * mrn_item_info_slave_item_factor3 : txtfactor3,
						 * mrn_item_info_slave_item_factor4 : txtfactor4,
						 */
						inv_consumption_item_info_slave_uom : selItemQty,
						inv_consumption_item_info_consumption_status : sclItemStatus_,

					/*
					 * mrn_item_info_slave_issue_qty:txtinventoryMaterailRequestNoteIssueQuantity,
					 * mrn_item_info_slave_update_date : new Date(),
					 * mrn_item_info_slave_create_date : new Date()
					 */

					});

		}
		
		

	}

	var lenlist = materiallist.ltInventoryConsumptionItemSlaveDTOs.length;
	if (lenlist == 0) {
		alert("Please enter atleast one Consumption Item row to  save Consumption");
		return false;
	}
	materiallist = JSON.stringify(materiallist);
	var inputs = [];
	inputs.push('action=saveConsumptionDetails');

	// General Info
	inputs.push("materiallist=" + materiallist);
	inputs.push('txtConsumedId=' + txtConsumedId);
	inputs.push('txtConsumedBy=' + txtConsumedBy);
	inputs.push('txtMRNDispencedDate=' + txtMRNDispencedDate);
	inputs.push('typeOfpatient=' + typeOfpatient);

	inputs.push('txtwardName=' + txtwardName);

	inputs.push('txtConsumptionTDocQty=' + txtConsumptionTDocQty);
	inputs.push('txtMRNDispensedtoOthers=' + txtMRNDispensedtoOthers);
	inputs.push('txtConsumptionRemark=' + txtConsumptionRemark);
	inputs.push('txtMRNDispensedto=' + txtMRNDispensedto);
	inputs.push('txtMRNDispensedtoId=' + txtMRNDispensedtoId);

	inputs.push('txtPatientName=' + txtPatientName);
	inputs.push('txtPatientId=' + txtPatientId);
	inputs.push('txtPatientTreatmentId=' + txtPatientTreatmentId);

	// inputs.push('txtmaterialReqaestNoteId=' + txtmaterialReqaestNoteId);
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
			alert(r);
			
			hideConsumptionDiv();
			featchConsumtionMasterDetails();
			// window.location.replace("inventory_Materail_Request_Note.jsp");
		}
	});

}

/*
 * * ************* featch Consumtion Master Details Author :Sudhir *
 * Date:2:09:2015 **** modified Date :23/9/2015**********
 */

function featchConsumtionMasterDetails() {

	var txtwardName = $("#txtwardName").val();

	var typeOfpatient = $('input[name="typeOfpatientSearch"]:checked').val();

	var txtDispencedSearchDate = "";// $("#popup_container3").val();

	var inputs = [];

	if (txtDispencedSearchDate == "" && typeOfpatient == undefined) {
		inputs.push('isEdit=no');

	}

	if (txtDispencedSearchDate != "" && typeOfpatient == undefined) {
		inputs.push('isEdit=yes');
		inputs.push('SearchDate=' + txtDispencedSearchDate);

	}
	if (txtDispencedSearchDate != "" && typeOfpatient != undefined) {
		inputs.push('isEdit=yes');
		inputs.push('SearchDate=' + txtDispencedSearchDate);
		inputs.push('typeOfpatient=' + typeOfpatient);

	}
	if ((typeOfpatient == "opd" || typeOfpatient == "ipd"
			|| typeOfpatient == "diagnosis" || typeOfpatient == "Individual")
			&& (txtDispencedSearchDate == "")) {
		inputs.push('isEdit=yes');
		inputs.push('typeOfpatient=' + typeOfpatient);
	}

	inputs.push('action=featchConsumtionMasterDetails');
	inputs.push('txtwardName=' + txtwardName);
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
			objMRN = JSON.parse(r);
			SrNaC = 1;
			$("#MRNcontentConsumption").setTemplate(inventoryConsumption);
			$("#MRNcontentConsumption").processTemplate(objMRN);
			$("#MRNAjaxRespConsumption").html(r);

		}
	});

}

// Tamplet for View Consumption
var SrNaC = 1;
var inventoryConsumption = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Consumption Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Consumed By Individual</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Consumed By Patient</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Dispensed Date</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>view</div></th>"
		+ "</tr>"
		+ "</thead>"
		+ "{#foreach $T.ltInventoryConsumptionMasterDTOs as ltInventoryConsumptionMasterDTOs}"
		+ "<tr class='center'>"
		+ "<td>{SrNaC++}</td>"
		+ "<td>{$T.ltInventoryConsumptionMasterDTOs.inv_consumption_master_id}</td>"
		+ "<td style='text-align=left;' >{$T.ltInventoryConsumptionMasterDTOs.inv_consumption_master_dispenced_to_name}</td>"
		+ "<td style='text-align=left;'>{$T.ltInventoryConsumptionMasterDTOs.inv_consumption_master_patient_name}</td>"
		+ "<td>{$T.ltInventoryConsumptionMasterDTOs.inv_consumption_master_dispenced_date}</td>"
		+ "<td><button id='btnedit' value='edit' class='btn btn-xs btn-success' type='button' onclick=\"viewConsumptionDetails({$T.ltInventoryConsumptionMasterDTOs.inv_consumption_master_id})\"><i class='fa fa-edit'></i></button></td>"
		+ "</tr>" + "{#/for}</table>";

/**
 * ******************** view consumption Details Author :sudhir Date: 24/9/2015
 * *******
 */
function viewConsumptionDetails(conId) {
	$("#iToHideBtnsConsumption").hide();
	var obj = $("#MRNAjaxRespConsumption").html();
	objConsumptionMaster = JSON.parse(obj);
	var objConsumtion = "";

	for (var rowCount = 0; rowCount < objConsumptionMaster.ltInventoryConsumptionMasterDTOs.length; rowCount++) {
		if (objConsumptionMaster.ltInventoryConsumptionMasterDTOs[rowCount].inv_consumption_master_id == conId) {
			// alert(obj);
			objConsumtion = objConsumptionMaster.ltInventoryConsumptionMasterDTOs[rowCount];
			break;
		}
	}
	var typeofpatient = objConsumtion.inv_consumption_master_consumed_by_name;

	if (typeofpatient == "Individual") {
		$("#txtConsumedId").val(objConsumtion.inv_consumption_master_id);
		$("#txtConsumedBy").val(
				objConsumtion.inv_consumption_master_consumed_by_name);
		$("#txtMRNDispencedDate").val(
				objConsumtion.inv_consumption_master_dispenced_date);
		$("#txtMRNDispensedto").val(
				objConsumtion.inv_consumption_master_dispenced_to_name);
		$("#txtMRNDispensedtoOthers").val(
				objConsumtion.inv_consumption_master_dispenced_to_other_name);
		$("#txtConsumptionTDocQty").val(
				objConsumtion.inv_consumption_master_total_item_qty);
		$("#txtConsumptionRemark").val(
				objConsumtion.inv_consumption_master_remark);

		$("#AlloptionBtn").hide();
		$("#divtxtPatientName").hide();
		$("#divtxtPatientId").hide();
		$("#divtxtMRNDispensedtoOthers").hide();
		$("#divtxtMRNDispensedto").show();
		$("#ConsumptionIndividualForm").show();
		$("#btnAddNewConsumption").hide();
		$("#btnRemoveConsumption").hide();
	}

	if (typeofpatient == "Patient") {
		$("#txtConsumedId").val(objConsumtion.inv_consumption_master_id);
		$("#txtMRNDispencedDate").val(
				objConsumtion.inv_consumption_master_dispenced_date);
		$("#txtConsumedBy").val(
				objConsumtion.inv_consumption_master_consumed_by_name);
		var typeofpatient = objConsumtion.inv_consumption_master_referedTo;
		if (typeofpatient == "opd") {
			$("#OPDchk").prop('checked', true);
		}
		if (typeofpatient == "ipd") {
			$("#IPDchk").prop('checked', true);
		}

		if (typeofpatient == "diagnosis") {
			$("#chkEntireDatabase").prop('checked', true);
		}

		$("#txtPatientId").val(objConsumtion.inv_consumption_master_patient_id);
		$("#txtPatientName").val(
				objConsumtion.inv_consumption_master_patient_name);
		$("#txtConsumptionTDocQty").val(
				objConsumtion.inv_consumption_master_total_item_qty);
		$("#txtConsumptionRemark").val(
				objConsumtion.inv_consumption_master_remark);
		$("#AlloptionBtn").show();
		$("#divtxtPatientName").show();
		$("#divtxtPatientId").show();

		$("#divtxtMRNDispensedtoOthers").hide();
		$("#divtxtMRNDispensedto").hide();
		$("#ConsumptionIndividualForm").show();
		$("#btnAddNewConsumption").hide();
		$("#btnRemoveConsumption").hide();

	}

	var inputs = [];
	inputs.push('action=getConsumptionSlaveDetails');
	inputs.push('isEdit=no');
	var conId1 = conId;
	inputs.push('conId=' + conId1);
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
					var count = 1;
					for (var k = 0; k < pobj1.ltFetchConsumptionSalevsDetailsDTO.length; k++) {

						$("#ItemInfoTableforConsumption > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' > <td> <input type='checkbox'  name='checkbox"
												+ count
												+ "' id='chkbox"
												+ count
												+ "'> </td>  <td> <input type='hidden' id='txtinventoryMaterailRequestNote"
												+ count
												+ "' name='txtinventoryMaterailRequestNote' value='"
												+ pobj1.ltFetchConsumptionSalevsDetailsDTO[k].inv_consumption_item_info_slave_id
												+ "'   class='form-control input-SmallText'> <input readonly='readonly' type='text' id='txtSrNo"
												+ count
												+ "' name='txtSrNo'  value="
												+ count
												+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
												+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
												+ count
												+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='readonly' value='"
												+ pobj1.ltFetchConsumptionSalevsDetailsDTO[k].inv_consumption_info_slave_item_name
												+ "'/>"
												+ "<input type='hidden'  id='txtMRNID"
												+ count
												+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
												+ count
												+ "'  readonly='readonly' value='"
												+ pobj1.ltFetchConsumptionSalevsDetailsDTO[k].inv_consumption_item_info_slave_item_code
												+ "' /> </div></td> <td><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
												+ count
												+ "' readonly='readonly'class='form-control input-SmallText' /> <input type='text' readonly='readonly' id='txtinventoryMaterailRequestNoteDocQuantity"
												+ count
												+ "' class='form-control input-SmallText'   readonly='readonly' value='"
												+ pobj1.ltFetchConsumptionSalevsDetailsDTO[k].inv_consumption_item_info_slave_item_qty
												+ "'></td> "
												+ "<td><select class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "' readonly='readonly'> <option selected=selected >"
												+ pobj1.ltFetchConsumptionSalevsDetailsDTO[k].inv_consumption_item_info_slave_uom
												+ " </option></select> </td>"
												+ "<td><select class='form-control input-SmallText' id='sclItemStatus_"
												+ count
												+ "' readonly='readonly'><option selected=selected >"
												+ pobj1.ltFetchConsumptionSalevsDetailsDTO[k].inv_consumption_item_info_consumption_status
												+ " </option></select></td> ");
						
						
						
					/*	+ "<td><input type='button' value='Check' id='iCheckAvailabilty"
						+ count
						+ "'class='btn btn-xs btn-success'></td><td><input type='button' value='accept' id='accept"
						+ count
						+ "'class='btn btn-xs btn-success'></td>"*/

						$("#txtMRNID").val(count);
						var tblSubContractingCountRow1 = $("#txtMRNID").val();
						$("#totalRow").val(tblSubContractingCountRow1);
						// autoSuggest("txtinventoryMaterailRequestNoteItemcode_"
						// + count,"onload");
						count++;

					}
					// totalDocQty();
					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);

				}

			});

}
/**
 * ********************End view consumption Details Author :sudhir Date:
 * 24/9/2015 *******
 */

function deleteConsumptionDetails(conId) {
	var chk = confirm("Are You Sure Delete Consumption");
}

/**
 * ************************* hide mrn genrator div Author :sudhir Date:5/6/2015
 * *******************
 */

function hideMrnGenratorDiv() {

	/*
	 * $('#MRNForm').find('input:text').val('');
	 * $('#MRNForm').find('input:hidden').val('');
	 * $('#MRNForm').find('input:text').val('');
	 * $('#ItemInfoTable').find('input:text').val('');
	 * $('#MRNForm').find('textarea').val(''); $("#ItemInfoTable >
	 * tbody").html('');
	 */

	/*
	 * isNew = 0; count = 1;
	 */
	/*
	 * $('#showhideMrnMaintabs').show(); $("#MRNForm").hide();
	 */
	/* onindent(); */

}
/** ****************@author husenabdsha**for OT Indent********************* */
function showPatDiv() {
	$("#showPatDiv").show('show');
}

function showIndentDiv() {
	setCurrentDate();
	function setCurrentDate() {
		var currentdate = new Date();
		var date = currentdate.getDate() + "-" + (currentdate.getMonth() + 1)+ "-" + currentdate.getFullYear();
		$("#popup_container2").val(date);
	}
	// alert("indent");
	if ($("#txtPatientName").val() == "" || $("#txtPatientId").val() == "") {
		alert("Please select valid patient name");
		$("#txtPatientName").focus();
	} else {
		$("#IndentDiv").show('show');
	}
}

function approvedByIncharge1() {
	// alert("hii");

	/* $('#userNameandpasswordPopUp').css('display','block'); */
	// $('#userNameandpasswordPopUp').show();
}

function checkUserNameandPassword() {
	var ApprovedByIncharge = $("#levelValue").val();
	var userName = $("#userName").val();
	var userPassword = $("#userPassword").val();
	if (userName == "" || userPassword == "") {
		alert(" Please Fill All Details ");
		return false;
	}

	var MrnId = $("#txtmaterialReqaestNoteDocId").val();
	var inputs = [];
	inputs.push('action=getValidatUserNameandPassword');
	inputs.push('userPassword=' + userPassword);
	inputs.push('userName=' + userName);
	inputs.push('MrnId=' + MrnId);
	inputs.push('ApprovedByIncharge=' + ApprovedByIncharge);

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
					// ajaxResponse = r;
					var b = r.replace(/"/g, "");
					if (b == "1") {
						alert("Invalid User Name or Password");
						return false;

					} else {

						// General In
						var txtmaterialReqaestNoteId = $(
								"#txtmaterialReqaestNoteDocId").val();
						var txtDocNo = $("#txtmaterialReqaestNoteDocId").val();
						var txtDocDate = $("#txtMRNDate").val();
						var txtMRNTotal = $("#txtMRNTotal").val();
						var txtMRNRemark = $("#txtMRNRemark").val();
						var CurrentuserName = $("#CurrentuserName").val();
						var subInventoryId = $("#subInventoryId").val();
						var mrnApprovedStatus = $("#levelValue").val()

						if (txtDocDate == "" || txtDocDate == 0) {

							alert("Please select mrn date");
							$("#txtMRNDate").focus();
							return false;

						}

						var isEditUpdate = $("#isEditUpdate").val();

						if (!(isEditUpdate == "Update")) {
							if (txtDocDate) {
								var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth() + 1; // January is 0!

								var yyyy = today.getFullYear();

								var today1 = dd + '/' + mm + '/' + yyyy;

								if (new Date(txtDocDate).getTime() === new Date(
										today1).getTime()) {

								} else {
									alert("Please Enter Current Date ");
									$("#txtMRNDate").focus();
									return false;
								}
							}
						}

						var txtMRNID = $("#txtMRNID").val();
						var totalRow = $("#totalRow").val();

						var txtMRNLocationName = $("#txtMRNLocationName").val();

						var txtReceiverName = $("#txtReceiverName").val();

						var status = 'open';
						var materiallist = {
							inventoryMaterialRequestNoteItemInfoSlaveDTO : []
						};

						for (var i = 1; i <= txtMRNID; i++) {

							if ($("#txtinventoryMaterailRequestNote" + i).val() != null
									&& $("#txtinventoryMaterailRequestNote" + i)
											.val() != undefined) {
								var txtinventoryMaterailRequestNote = $(
										"#txtinventoryMaterailRequestNote" + i)
										.val();
								var txtMRNItemName = $(
										"#txtinventoryMaterailRequestNoteItemcode_"
												+ i).val();
								var txtMRNItemcodeId = $(
										"#txtMRNItemcodeId" + i).val();
								var txtMRNDocQuantity = $(
										"#txtinventoryMaterailRequestNoteDocQuantity"
												+ i).val();

								var txtinventoryMaterailRequestNoteIssueQuantity = $(
										"#txtinventoryMaterailRequestNoteIssueQuantity"
												+ i).val();

								if (txtMRNItemName == ""
										|| txtMRNItemName == null) {

									alert("Please enter item name in " + i
											+ " Row");
									$(
											"#txtinventoryMaterailRequestNoteItemcode_"
													+ i).focus();
									return false;

								}
								if (txtMRNDocQuantity == ""
										|| txtMRNDocQuantity == null) {

									alert("Please enter Item quantity in " + i
											+ " Row");
									$(
											"#txtinventoryMaterailRequestNoteDocQuantity"
													+ i).focus();
									return false;

								}

								var pattern = /^([0-9])*$/;
								if (!pattern.test(txtMRNDocQuantity)) {
									alert("MRN Quantity field is of digits only.!");
									$("#txtMRNDocQuantity" + i).focus();
									return false;

								}

								var selItemQty = $(
										"#selItemQty_" + i + " option:selected")
										.text();

								if (selItemQty == 0 || selItemQty == '-Select-') {
									alert("Please select uom in " + i + " row");
									$("#selItemQty_").focus();
									return false;
								}
								// var selItemQty = $("#selItemQty" + i).val()
								;
								materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO
										.push({

											mrn_item_info_slave_id : txtinventoryMaterailRequestNote,
											mrn_item_info_slave_item_name : txtMRNItemName,
											mrn_item_info_slave_doc_qty : txtMRNDocQuantity,
											mrn_item_info_slave_item_name : txtMRNItemName,
											mrn_item_info_slave_item_code : txtMRNItemcodeId,
											mrn_item_info_slave_item_selItemQty : selItemQty,
											mrn_item_info_slave_issue_qty : txtinventoryMaterailRequestNoteIssueQuantity,
											mrn_item_info_slave_update_date : new Date(),
											mrn_item_info_slave_create_date : new Date()

										});

							}
						}

						var li = materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
						if (li == 0) {
							alert("please enter atleast one item row to mrn generated");
							return false;

						}

						materiallist = JSON.stringify(materiallist);
						var inputs = [];
						inputs.push('action=SaveMaterialRequestNoteDetails');

						// General Info
						inputs.push("materiallist=" + materiallist);
						inputs.push('txtMRNID=' + txtMRNID);
						inputs.push('txtDocNo=' + txtDocNo);
						inputs.push('txtDocDate=' + txtDocDate);
						inputs.push('txtMRNTotal=' + txtMRNTotal);
						inputs.push('txtMRNRemark=' + txtMRNRemark);
						inputs.push('txtMRNLocationName=' + txtMRNLocationName);
						inputs.push('txtReceiverName=' + txtReceiverName);
						inputs.push('txtMrnBookerName=' + CurrentuserName);
						inputs.push('MrnApprovedStatus=' + mrnApprovedStatus);
						inputs.push('subInventoryId=' + subInventoryId);

						inputs.push('status=' + status);
						inputs.push('txtmaterialReqaestNoteId='
								+ txtmaterialReqaestNoteId);

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
							}
						});

						alert("Approved level Succssefully");
						$('#userNameandpasswordPopUp').removeClass('fade');
						$('#userNameandpasswordPopUp').modal('hide');
						$('#MRNForm').removeClass('fade');
						$('#MRNForm').modal('hide');
						onmrn();
						fetchMaterialRequestNoteDetailsShows();
					}
				}
			});

}

function chklevlval(val) {
	$("#levelValue").val(val);
	$("#userName").val('');
	$("#userPassword").val('');
	$("#showhideMrnMaintabs").show();
}

/**
 * *************fetch Mrn Approve Status approved by id Author:sudhir Date :19
 * jan 2016 ******************
 */
function fetchMrnApproveStatus() {
	var subinventory = $('#txtwardName').val();
	// alert("in mrn fecth=="+subinventory);
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
	inputs.push('isEdit=no');
	inputs.push('subinventory=' + subinventory);
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
			// alert(r);
			// alert(r);
			$("#MRNcontentApproved").setTemplate(inventoryMRNApproved);
			$("#MRNcontentApproved").processTemplate(pobj1);
			$("#MRNAjaxRespApproved").html(r);
		}
	});
}

/**
 * *************88 Search approved by id Author:sudhir Date :19 jan 2016
 * ******************
 */
function fetchMrnApproveStatusById(mrnId) {

	var subinventory = $('#txtwardName').val();
	// alert("in serach mrn=="+subinventory);
	if (mrnId == "") {
		alert("Please enter  mrn Id");
		$("#byMrnId").focus();
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(mrnId)) {
		alert("MRN id should be of digits only.!");
		$("#byMrnId").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
	inputs.push('isEdit=yes');
	inputs.push('MrnId=' + mrnId);
	inputs.push('subinventory=' + subinventory);

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
			objMRN = JSON.parse(r);
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {

				$("#MRNcontentApproved").setTemplate(inventoryMRNApproved);
				$("#MRNcontentApproved").processTemplate(pobj1);

			} else {
				alert("Record not found..!");
				fetchMrnApproveStatus();
			}
			$('#byMrnIdApproved').val("");

		}
	});
}
/**
 * ***************** modified Date:19 jan 2016 Author Sudhir
 * ********************************
 */

/*
 * var inventoryMRNApproved = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>
 * Mrn Raised By</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier
 * Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>Approved
 * status</div></th> </tr> </thead>" + "{#foreach
 * $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status
 * =='level-II'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td>" +"<td style='background-color: #ffcccc' id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status}</td>
 * </tr>" +"{#/if}{#/for}</table>";
 */

/*
 * var inventoryMRNApproved = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier
 * Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>
 * Mrn Raised By</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Receive</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='issue'><i class='fa fa-edit'></i></button></td>" +"<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td>
 * </tr>" + "{#elseif $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ==
 * 'open'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'InProcess'||
 * $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status
 * =='level-II}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td>" + "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}" + "</td></tr>{#/else
 * }{#/if}{#/for}</table>";
 */

/** ************* ******* old tamplete 2 feb 2016 **************** */
/*
 * var inventoryMRNApproved = "<table class='table table-striped'
 * style='margin: 10px;width: 98%;'>" + "<thead class='cf' style='background:
 * white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier
 * Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>
 * Mrn Raised By</div></th>
 * <th style='height: 21.5px;' class='col-md-2 center'><div>App-level-I</div></th>
 * <th style='height: 21.5px;' class='col-md-2 center'><div>App-level-II</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Receive</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th>
 * </tr> </thead>" + "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td>" + "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>
 * <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a1_doc_id}</td>
 * <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a2_doc_id}</td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='issue'><i class='fa fa-edit'></i></button></td>" +"<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td>
 * </tr>" + "{#elseif $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ==
 * 'open'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'InProcess'}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>
 * <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}
 * <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a1_doc_id}</td>
 * <td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a2_doc_id}</td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td>" + "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}" + "</td></tr>{#elseif
 * $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status
 * =='level-II}" + "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>" + "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>" + "<td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td>
 * <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td>
 * <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a1_doc_id}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a2_doc_id}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a3_doc_id}</td> " + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> <td><button id='btIssue'
 * class='btn btn-xs btn-success' type='button'
 * onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td>" + "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}" + "</td></tr>{#/else}{#/else}{#/if}{#/for}</table>";
 */

/** ********** new templet 2 feb 2016 with Adding partial mrn Items ***** */
var inventoryMRNApproved = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Dispatch date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Carrier Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div> Mrn Raised By</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>App-level-I</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>App-level-II</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Receive Partial MRN</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Receive</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}"
		+ "{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'}"
		+ "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>"
		+ "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td>"
		+ "<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>"
		+ "<td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td> <td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td> <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a1_doc_id}</td> <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a2_doc_id}</td>"
		+ "<td><button id='btnPartialMrn' data-toggle='modal'data-target='#MRNPartialReceive'  onclick=\"viewAndRecivedPartialMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='viewParitalMrn' class='btn btn-xs btn-success' type='button'><i class='fa fa-edit'></i></button></td> "
		+ " <td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-trash-o'></i></button></td>  <td><button id='btIssue' class='btn btn-xs btn-success' type='button' onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='issue'><i class='fa fa-edit'></i></button></td>"
		+ "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td> </tr>"
		+ "{#elseif $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'InProcess'}"
		+ "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>"
		+ "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>"
		+ "<td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td> <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td> <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name} <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a1_doc_id}</td> <td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a2_doc_id}</td>"
		+ "<td><button id='btnPartialMrn' data-toggle='modal'data-target='#MRNPartialReceive' onclick=\"viewAndRecivedPartialMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='viewParitalMrn' class='btn btn-xs btn-success' type='button'><i class='fa fa-edit'></i></button></td><td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-trash-o'></i></button></td>  <td><button id='btIssue' class='btn btn-xs btn-success' type='button' onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" disabled><i class='fa fa-edit'></i></button></td>"
		+ "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}"
		+ "</td></tr>{#elseif $T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_approved_status =='level-II}"
		+ "<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>"
		+ "<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td>"
		+ "<td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td> <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_receiver_name}</td> <td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a1_doc_id}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a2_doc_id}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_a3_doc_id}</td> "
		+ "<td><button id='btnPartialMrn' onclick=\"viewAndRecivedPartialMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" data-toggle='modal'data-target='#MRNPartialReceive' value='viewParitalMrn' class='btn btn-xs btn-success' type='button'><i class='fa fa-edit'></i></button></td><td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-trash-o'></i></button></td>  <td><button id='btIssue' class='btn btn-xs btn-success' type='button' onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" disabled><i class='fa fa-edit'></i></button></td>"
		+ "<td  id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}"
		+ "</td></tr>{#/else}{#/else}{#/if}{#/for}</table>";

/* Recived partial Mrn @author: sudhir @Date:3 feb 2016 */
function viewAndRecivedPartialMRNDetails(MrnId) {

	if (MrnId == null || MrnId == "") {
		alert("Please enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	$('#acceptonViewandApproved').css('display', 'block');
	$('#Return').css('display', 'none');
	/* refreshviewmrnl(); */
	refreshPartialMrnCount();

	var obj = $("#MRNAjaxResp").html();
	objMrnMaster = JSON.parse(obj);

	for (var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtmaterialReqaestNoteDocIdParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);

			$("#txtMRNDateParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
			$("#txtMRNTotalParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
			$("#txtMRNRemarkParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);

			$("#txtMRNLocationNameParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);

			$("#txtReceiverNameParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);

			/*
			 * $("#sclMRNLocation option:selected")
			 * .text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
			 */

		}
	}
	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	// var txtmaterialReqaestNoteDocId =
	// $("#txtmaterialReqaestNoteDocIdParReceive").val();
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
					pobj1 = eval('(' + r + ')');
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
					var count = 1;
					for (var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
						$("#ItemInfoTableParReceive > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' ><td><input type='text' id='txtSrNo"
												+ count
												+ "' name='txtSrNo'  value="
												+ count
												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtinventoryMaterailRequestNote"
												+ count
												+ "' name='txtinventoryMaterailRequestNote'  value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
												+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
												+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
												+ count
												+ "' "
												+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
												+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
												+ count
												+ "' value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
												+ " /></div></td> <td><input type='text' readonly='' id='txtinventoryMaterailRequestNoteDocQuantity"
												+ count
												+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
												+ "'></td> <td id='xyz'><select readonly='' onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "'><option selected=selected >"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
												+ "</option></select></td> <td><input type='text' id='txtIssuedQty"
												+ count
												+ "' class='form-control input-SmallText' readonly='' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' ><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
												+ count
												+ "'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' class='form-control input-SmallText' ></td><td><input onclick='updateSubInventoryItemStockQty("
												+ count
												+ ")' "
												+ "type='button' value='accept' id='accept"
												+ count
												+ "'class='btn btn-xs btn-success'></td>");

						$("#txtMRNID").val(count);
						count++;
						test++;

					}

					totalDocQty();
					setAcceptDisActive();
					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);

				}

			});
}

function refreshPartialMrnCount() {
	$('#MRNPartialReceive').find('input:text').val('');
	$('#MRNPartialReceive').find('input:hidden').val('');

	$('#MRNPartialReceive').find('input:text').val('');
	$('#ItemInfoTableParReceive').find('input:text').val('');
	$('#MRNPartialReceive').find('textarea').val('');
	$("#ItemInfoTableParReceive > tbody").html('');
	isNew = 0;
	count = 1;

}

function setAcceptDisActive() {
	// alert("hii sudhir");

	var txtMRNID = $("#txtMRNID").val();
	// var totalRow = $("#totalRow").val();
	for (var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtIssuedQty" + i).val();
		if (totalQty == 0) {

			document.getElementById("accept" + i).disabled = true;
		} else {
			document.getElementById("accept" + i).disabled = false;
		}

	}

}

function updateSubInventoryItemStockQty(count) {
	document.getElementById("accept" + count).disabled = true;

	var txtMrnItemSlaveId = $("#txtinventoryMaterailRequestNote" + count).val();
	var txtMrnId = $("#txtmaterialReqaestNoteDocIdParReceive").val();

	var inputs = [];
	inputs.push('action=updateSubInventoryItemStockQtyPartialMrn');
	inputs.push('isEdit=no');
	inputs.push('txtMrnItemSlaveId=' + txtMrnItemSlaveId);
	inputs.push('txtMrnId=' + txtMrnId);
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

			alert("Item Received Successfully");

		}
	});

}

function viewRecivedMRN(MrnId) {
	if (MrnId == null || MrnId == "") {
		alert("Please enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	$('#acceptonViewandApproved').css('display', 'none');
	$('#Return').css('display', 'block');
	/* refreshviewmrnl(); */
	refreshPartialMrnCount();

	var obj = $("#MRNAjaxResp").html();
	objMrnMaster = JSON.parse(obj);

	for (var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtmaterialReqaestNoteDocIdParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);

			$("#txtMRNDateParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
			$("#txtMRNTotalParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
			$("#txtMRNRemarkParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);

			$("#txtMRNLocationNameParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);

			$("#txtReceiverNameParReceive")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);

			break;
			/*
			 * $("#sclMRNLocation option:selected")
			 * .text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
			 */

		}
	}
	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	// var txtmaterialReqaestNoteDocId =
	// $("#txtmaterialReqaestNoteDocIdParReceive").val();
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
					pobj1 = eval('(' + r + ')');
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
					var count = 1;
					for (var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
						
						//mrn_item_info_slave_issue_qty
						$("#ItemInfoTableParReceive > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' ><td><input type='text' id='txtSrNo"
												+ count
												+ "' name='txtSrNo'  value="
												+ count
												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtinventoryMaterailRequestNote"
												+ count
												+ "' name='txtinventoryMaterailRequestNote'  value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
												+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
												+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
												+ count
												+ "' "
												+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
												+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
												+ count
												+ "' value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
												+ " /></div></td> <td><input type='text' readonly='' id='txtinventoryMaterailRequestNoteDocQuantity"
												+ count
												+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory
												+ "'></td> <td id='xyz'><select readonly=''  class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "'><option selected=selected >"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
												+ "</option></select></td> <td><input type='text' id='txtIssuedQty"
												+ count
												+ "' class='form-control input-SmallText' readonly='' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory
												+ "' ><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
												+ count
												+ "'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' class='form-control input-SmallText' readonly='' ></td><td><input type='text' readonly='' id='txtinventoryReturnQuantity"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_Return_qty
												+ "'></td>");

						$("#txtMRNID").val(count);
						count++;
						test++;

					}

					totalDocQty();
					setAcceptDisActive();
					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);

				}

			});

}

// template for mrn return..@author: paras suryawanshi @date:8nov
var selMrnTemplate = "<option  value='-Select-' >-Select-</option>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}"
		+ "<option  value='{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</option>"
		+ "{#/for}";

/*******************************************************************************
 * @author : paras suryawanshi
 * @date :3nov2016
 * @code : viewMRNReturnDetails
 ******************************************************************************/

function viewMRNReturnDetails(MrnId) {

	mrnReturnRefreshChange();

	if (MrnId == null || MrnId == "") { // if Mrn id is empty
		alert("Please enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}

	if (MrnId == "-Select-") {
		mrnReturnRefresh();

		return false;
	}

	var obj = $("#MRNAjaxRespRecieved").html();
	objMrnReturn = JSON.parse(obj);

	// set values to MRN Return text filed
	for (var i = 0; i < objMrnReturn.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnReturn.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtmrnreturnDocId")
					.val(
							objMrnReturn.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
			$("#txtMaterialReqaestNoteDate")
					.val(
							objMrnReturn.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
			$("#txtMRNReturnName")
					.val(
							objMrnReturn.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);
			$("#subInventoryId")
					.val(
							objMrnReturn.inventoryMaterialRequestNoteMasterDTO[i].inv_subinventory_id);
			break;

		}
	}

	// end set values to MRN Return text filed

	/** *** fetch Mrn slave Details*** */
	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	var txtmaterialReqaestNoteDocId = $("#txtmrnreturnDocId").val();
	inputs.push('txtmaterialReqaestNoteDocId=' + MrnId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				success : function(r) {

					pobj1 = eval('(' + r + ')');
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
					var count = 1;
					for (var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
						var mrnActualItemQty = parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty)
								+ parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory);
						$("#ItemInfoTableMRN > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' > <td> <input type='checkbox'  name='checkboxMrn"
												+ count
												+ "' onclick='chkForAccept("
												+ count
												+ ")'  id='chkboxMrn"
												+ count
												+ "'> </td> <td><input type='text' style='text-align:left;width:33px;' id='txtSrNo"
												+ count
												+ "' name='txtSrNo'  value="
												+ count
												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtinventoryMRN"
												+ count
												+ "' name='txtinventoryMRN'  value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
												+ "  class='form-control input-SmallText'></td>  <td><div  id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
												+ "<input style='text-align:left;width:250px;' type='text' id='txtinventoryMRNItemname_"
												+ count
												+ "' "
												+ "onkeyup='autoSuggest(this.id,onchange)' onkeypress='return validateOnlyName(event);' class='typeahead form-control input-SmallText' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
												+ "' readonly='readonly'/> <input type='hidden'  id='txtMRNReturnItemcodeId"
												+ count
												+ "' value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
												+ " /></div></td> <td><input type='text' readonly='' id='mrnActualItemQty"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ /* mrnActualItemQty */pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory
												+ "' onkeyup='chcknulldocQty()'></td> <td id='xyz'><select style='width:95px;'  class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "'><option selected=selected >"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
												+ "</option></select></td>  <td><input type='text' id='txtReturnQty"
												+ count
												+ "'   class='form-control input-SmallText' onkeypress='return validateNumbers(event);'   value='"
												+ "' ><input type='hidden' id='txtinventoryMRNIssueQuantity"
												+ count
												+ "'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' class='form-control input-SmallText' ></td><td><input type='text' id='txtRecivedQty"
												+ count
												+ "' readonly=''  class='form-control input-SmallText'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' > <td><input type='text' id='txtConsumeQty"
												+ count
												+ "' readonly=''  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].inv_mrn_item_info_slave_subinventory_consumption_qty
												+ "' class='form-control input-SmallText' ></td><td><input onclick='acceptReturnQty("
												+ count
												+ ")' "
												+ "type='button' value='accept' name='acceptMrn' id='acceptMrn"
												+ count
												+ "'class='btn btn-xs btn-success'></td>");

						$("#txtMRNReturnID").val(count);

						count++;
						test++;

					}

					var tblSubContractingCountRow1 = $("#txtMRNReturnID").val();

					$("#totalRowMRN").val(tblSubContractingCountRow1);
					totalDocQty();

				}

			});

	/** *** End fetch Mrn slave Details*** */
}

/*******************************************************************************
 * @author : paras suryawanshi
 * @date :3nov2016
 * @code : total actual item quantity
 ******************************************************************************/
function totalDocQty() {
	var sum = 0;
	var totalQty;
	var txtMRNID = $("#txtMRNReturnID").val();
	var tblSubContractingCountRow1 = $("#totalRowMRN").val();

	// calculate total actual quantity.
	for (var i = 1; i <= txtMRNID; i++) {
		totalQty = $("#mrnActualItemQty" + i).val();

		if (totalQty == null || totalQty == undefined || totalQty == '') {

		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}
	}

	$("#txttotalquantity").val(sum);

}

/*******************************************************************************
 * @author : paras suryawanshi
 * @date :3nov2016
 * @code : items to be return
 ******************************************************************************/

function acceptReturnQty(count) {
	var txtReturnQty = $("#txtReturnQty" + count).val();
	var txtRecivedQty = $("#txtRecivedQty" + count).val();

	/** *calulate return & recived quantity ** */

	if (txtReturnQty != "" && txtReturnQty != " ") {
		if (parseInt(txtReturnQty) <= parseInt(txtRecivedQty)) {

			if (parseInt(txtReturnQty) < 0) {
				alert("please enter valid return quantity !");

				return false;

			} else {
				var finalqty = parseInt(txtRecivedQty) - parseInt(txtReturnQty);
				$("#txtRecivedQty" + count).val(finalqty);
				document.getElementById("chkboxMrn" + count).disabled = true;
				document.getElementById("chkboxMrn" + count).checked = true;
				document.getElementById("acceptMrn" + count).disabled = true;
				document.getElementById("txtReturnQty" + count).disabled = true;
				totalReturnQty();
			}

		}

		if (parseInt(txtReturnQty) > parseInt(txtRecivedQty)) {

			alert("please enter valid return quantity !");
			return false;
		}
	} else {
		if (parseInt(txtRecivedQty) == 0 || parseInt(txtRecivedQty) < 0) {
			alert("Stock not available");
			document.getElementById("chkboxMrn" + count).checked = false;
			document.getElementById("acceptMrn" + count).disabled = true;
			return false;

		}

		if (parseInt(txtRecivedQty) > 0) {

			$("#txtReturnQty" + count).val(txtRecivedQty);
			$("#txtRecivedQty" + count).val(0);

			document.getElementById("chkboxMrn" + count).disabled = true;
			document.getElementById("chkboxMrn" + count).checked = true;
			document.getElementById("acceptMrn" + count).disabled = true;
			document.getElementById("txtReturnQty" + count).disabled = true;
		}

	}

	/** * end calulate return & recived quantity ** */
	totalReturnQty();

}
/*******************************************************************************
 * @author : paras suryawanshi
 * @date :8nov2016
 * @code : total return items
 ******************************************************************************/

function totalReturnQty() {

	var total = 0;
	var totalQty;
	var txtMRNID = $("#txtMRNReturnID").val();
	// calculate total return quantity..
	for (var i = 1; i <= txtMRNID; i++) {
		totalQty = $("#txtReturnQty" + i).val();

		if (totalQty == null || totalQty == undefined || totalQty == '') {
			// total = 0;
		} else {
			total = parseInt(total) + parseInt(totalQty);
		}
	}

	$("#txttotalReturnqty").val(total);

}
/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 9nov2016
 * @code : saveMRNReturn.
 ******************************************************************************/

function saveMRNReturn() {
	var txtMRNReturnTo = $("#txtMRNReturnTo").val();
	var materialReqaestNoteDocId = $("#txtmrnreturnDocId").val();

	var txtDocNo = $("#txtmrnreturnDocId").val();
	var totalRow = $("#totalRowMRN").val();
	var txtMRNDate = $("#txtMRNDate").val();

	var txtMRNReturnName = $("#txtMRNReturnName").val();
	var subInventoryId = $("#subInventoryId").val();
	var txtMRNReturnDate = $("#txtMRNReturnDate").val();

	var txtMRNRemark = $("#txtMRNRemark").val();
	var txtReturnBy = $("#txtReturnBy").val();

	var txtMRNTotal = $("#txttotalquantity").val();
	var txttotalReturnqty = $("#txttotalReturnqty").val();
	var txttablesize = $("#txtMRNReturnID").val();
	var currentUserID = $("#CurrentuserId").val();
	var currentuserName = $("#CurrentuserName").val();

	/** *****validation to MRN reTURN fileds************* */

	if (txtMRNReturnTo == 0 || txtMRNReturnTo == 'Select') {
		alert("Please select  MRN ");
		$("#txtMRNReturnTo").focus();
		return false;
	}
	if (txtMRNReturnDate == "" || txtMRNReturnDate == null) {
		alert("Please select  Return Date ");
		$("#txtMRNReturnDate").focus();
		return false;
	}

	var mrnmateriallist = {
		inventoryMaterialRequestNoteItemInfoSlaveDTO : []
	};
	var p = 1;

	// get values & calculate if button is disabled & checkbox is checked for
	// only return items.
	for (var i = 1; i <= txttablesize; i++) {
		var $radios = $('input:checkbox[name=checkboxMrn' + p + ']');
		var $button1 = $("#acceptMrn" + p).is(":disabled");

		if ($radios.is(':checked') == true && $button1 == true) {
			if ($("#txtinventoryMRN" + i).val() != null
					&& $("#txtinventoryMRN" + i).val() != undefined) {
				var txtinventorysalveid = $("#txtinventoryMRN" + i).val();
				var txtMRNItemName = $("#txtinventoryMRNItemname_" + i).val();
				var txtMRNItemcodeId = $("#txtMRNReturnItemcodeId" + i).val();
				var mrnActualItemQty = $("#mrnActualItemQty" + i).val();
				var txtReturnQty = $("#txtReturnQty" + i).val();
				var txtRecivedQty = $("#txtRecivedQty" + i).val();
				var txtConsumeQty = $("#txtConsumeQty" + i).val();
				var txtinventoryMaterailRequestNoteIssueQuantity = $(
						"#txtinventoryMRNIssueQuantity" + i).val();

				if (txtReturnQty == null || txtReturnQty == undefined
						|| txtReturnQty == '') {
					txtReturnQty = 0;

				}

				if (txtMRNItemName == "" || txtMRNItemName == null) {

					alert("Please enter item name in " + i + " Row");
					$("#txtinventoryMRNItemname_" + i).focus();
					return false;

				}
				var selItemQty = $("#selItemQty_" + i + " option:selected")
						.text();

				if (selItemQty == 0 || selItemQty == '-Select-') {
					alert("Please select uom in " + i + " row");
					$("#selItemQty_").focus();
					return false;
				}

				mrnmateriallist.inventoryMaterialRequestNoteItemInfoSlaveDTO
						.push({

							mrn_id : txtMRNReturnTo,
							mrnReturndocno : materialReqaestNoteDocId,
							mrnDate : txtMRNDate,
							mrnTotal : txtMRNTotal,
							mrnRemark : txtMRNRemark,
							mrnReturnName : txtMRNReturnName,
							mrnReturnDate : txtMRNReturnDate,
							mrnReturnBy : txtReturnBy,
							inv_subinventory_id : subInventoryId,

							mrntotalReturn : txttotalReturnqty,
							mrn_item_info_slave_id : txtinventorysalveid,
							mrn_item_info_slave_item_name : txtMRNItemName,
							mrn_item_info_slave_item_code : txtMRNItemcodeId,
							mrn_item_info_slave_fixed_issue_qty_to_subinventory : mrnActualItemQty,
							mrn_item_info_slave_item_selItemQty : selItemQty,
							mrn_item_info_slave_Return_qty : txtReturnQty,
							mrn_item_info_slave_issue_qty : txtRecivedQty,
							mrn_item_info_slave_Return_ConsumeQty : txtConsumeQty,

							currentuserName : currentuserName,
							currentUserID : currentUserID
						});
			}

		}
		p++;

	}
	// end get values & calculate if button is disabled & checkbox is checked
	// for only return items.
	var li = mrnmateriallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
	if (li == 0) {
		alert("please select atleast one item row to return mrn ");
		return false;

	}
	/** ***end**validation to MRN reTURN fileds************* */
	mrnmateriallist = JSON.stringify(mrnmateriallist);
	var inputs = [];
	inputs.push('action=SaveMRNReturnDetails');
	// General Info
	inputs.push("mrnmateriallist=" + mrnmateriallist);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			ajaxResponse = r;
			if (r == "1") {
				alert("Record saved successfully.!");

				$('#MrnReturnForm').removeClass('fade');
				$('#MrnReturnForm').modal('hide');
				$('#mrnReturn').tab('show');
				onmrnReturn();

			} else {
				alert(r);
			}

		}
	});

}

/**
 * ******* saveMRNReturn by paras suryawanshi
 * 
 * @author paras r suryawanshi
 * @Date:9 nov******************************************************************
 */

/*******************************************************************************
 * @author : paras suryawanshi
 * @date :3nov2016
 * @code : set Mrn text filed to be empty.
 ******************************************************************************/
function mrnReturnRefresh()

{
	$("#txtmrnreturnDocId").val('');
	$("#txtMaterialReqaestNoteDate").val('');
	$("#txtMRNReturnName").val('');
	$("#subInventoryId").val('');
	$("#txtMRNReturnDate").val('');
	$("#ItemInfoTableMRN > tbody").html('');
	$("#txttotalquantity").val('');
	$("#txttotalReturnqty").val('');
	$("#txtMRNReturnTo option[value='-Select-']").prop('selected', true);
	fetchMaterialRequestNoteDetailsforIssue();
}
/*******************************************************************************
 * @author : paras suryawanshi
 * @date :19nov2016
 * @code : set Mrn text filed to be empty onchange.
 ******************************************************************************/
function mrnReturnRefreshChange() {
	$("#txtmrnreturnDocId").val('');
	$("#txtMaterialReqaestNoteDate").val('');
	$("#txtMRNReturnName").val('');
	$("#subInventoryId").val('');
	$("#txtMRNReturnDate").val('');
	$("#ItemInfoTableMRN > tbody").html('');
	$("#txttotalquantity").val('');
	$("#txttotalReturnqty").val('');
}


function checkValueZero1(id)
{
	chcknulldocQty();
	if(parseInt(document.getElementById(id).value)==0)
		{
		alert("Quantity should not be 0");
		document.getElementById(id).value="";
		document.getElementById(id).focus(); 
		//$(obj.id).focus();
		return false;
		}
}
