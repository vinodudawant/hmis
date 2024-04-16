var isNew = 0;

/*
 * var inventoryMRNTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Quantity</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase
 * Request </div></th> </tr> </thead>" + "{#foreach
 * $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '0' &&
 * (($T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open') ||
 * ($T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'))}" + "
 * <tr class='center'>
 * <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>" +
 * "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>" +
 * "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>" +
 * "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>" +
 * "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' type='button'
 * data-toggle='modal' data-target='#MaterialRequestNoteList'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> " + "<td><button id='btnDelete'
 * value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-edit'></i></button></td></tr> " + "{#else}
 * <tr class='center'>
 * <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>
 * <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' type='button'
 * data-toggle='modal' data-target='#MaterialRequestNoteList'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT' disabled><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-trash-o'></i></button></td>" + " <td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td></tr>{#/if} {#/for}</table>"
 */
var SrNo = 1;
/*
 * var inventoryMRNTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='margin: 10px;width: 98%;'>" + "<thead class='cf'
 * style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Quantity</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>
 * Subinventory Name </div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase
 * Request </div></th> </tr> </thead>" + "{#foreach
 * $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '0' &&
 * (($T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open') ||
 * ($T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'))}" + "
 * <tr class='center'> <td>{SrNo++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"+"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"+"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>"+"
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> "+"
 * <td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'
 * data-toggle='modal' data-target='#MaterialRequestNoteList'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> " + "<td><button id='btnDelete'
 * value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-edit'></i></button></td></tr> " + "{#else}
 * <tr class='center'> <td>{SrNo++}</td>
 * <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>
 * <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>"+"<td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"+"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td>"+"<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' type='button'
 * data-toggle='modal' data-target='#MaterialRequestNoteList'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT' disabled><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-trash-o'></i></button></td>" + " <td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td></tr>{#/if} {#/for}</table>"
 */

/*
 * var inventoryMRNTemp = "<table class='table table-striped ' style='margin:
 * 10px;width: 98%;'>" + "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Remark</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN
 * Quantity</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>
 * Subinventory Name </div></th>
 * <th style='height: 21.5px;' class='col-md-2 center'><div> Mrn Raised By
 * </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>
 * <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase
 * Request </div></th> </tr> </thead>" + "{#foreach
 * $T.inventoryMaterialRequestNoteMasterDTO as
 * inventoryMaterialRequestNoteMasterDTO}" + "{#if
 * $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '0' &&
 * (($T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open') ||
 * ($T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'))}" + "
 * <tr class='center'> <td>{SrNo++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"+"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"+"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>"+"
 * <td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td> "+"
 * <td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'
 * data-toggle='modal' data-target='#MaterialRequestNoteList'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-trash-o'></i></button></td> " + "<td><button id='btnDelete'
 * value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i
 * class='fa fa-edit'></i></button></td></tr> " + "{#else}
 * <tr class='center'> <td>{SrNo++}</td>
 * <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>
 * <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>"+"<td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"+"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td>
 * <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
 * +"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>"+"<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' type='button'
 * data-toggle='modal' data-target='#MaterialRequestNoteList'
 * onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * value='EDIT' disabled><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-trash-o'></i></button></td>" + " <td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"
 * disabled><i class='fa fa-edit'></i></button></td></tr>{#/if} {#/for}</table>"
 * 
 */
/***************** old templet for Setting all mrn inprocess and open mrn 28jan2016 ****************************/ 
/*var inventoryMRNTemp = "<table class='table table-striped ' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div> Subinventory Name </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div> Mrn Raised By </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Request </div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}"
		+ "{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == '0' && (($T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open') || ($T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'))}"
		+ " <tr class='center'> <td>{SrNo++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
		+ "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
		+ "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
		+ "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
		+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
		+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td> "
		+ " <td><button id='btnEdit2' class='btn btn-xs btn-success'  type='button' data-toggle='modal' data-target='#MaterialRequestNoteList' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'   onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-trash-o'></i></button></td> "
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'   onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-edit'></i></button></td></tr> "
		+ "{#else} <tr class='center'> <td>{SrNo++}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
		+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
		+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#MaterialRequestNoteList' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT' disabled><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'  onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" disabled><i class='fa fa-trash-o'></i></button></td>"
		+ " <td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'   onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" disabled><i class='fa fa-edit'></i></button></td></tr>{#/if} {#/for}</table>"*/

/****** new with approved tamplete @Date 28 jan 2016 @Author:sudhir **************/
var inventoryMRNTemp = "<table class='table table-striped ' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div> Subinventory Name </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div> Mrn Raised By </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Request </div></th> </tr> </thead>"
	+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}"
	+ "{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag==2 && (($T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open') || ($T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'))}"
	+ " <tr class='center'> <td>{SrNo++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
	+ "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
	+ "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
	+ "{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td  style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
	+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
	+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td> "
	+ " <td><button id='btnEdit2' class='btn btn-xs btn-success'  type='button' data-toggle='modal' data-target='#MaterialRequestNoteList' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'   onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-trash-o'></i></button></td> "
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'   onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-edit'></i></button></td></tr> "
	+ "{#else} <tr class='center'> <td>{SrNo++}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left'  id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td  style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
	+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>"
	+ "{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#MaterialRequestNoteList' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT' disabled><i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'  onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" disabled><i class='fa fa-trash-o'></i></button></td>"
	+ " <td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'   onclick=\"createpurchaseOrderList({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" disabled><i class='fa fa-edit'></i></button></td></tr>{#/if} {#/for}</table>"
function setEditSave() {
	// alert("hii sudhir");

	var txtMRNID = $("#txtMRNID").val();
	var totalRow = $("#totalRow").val();
	for ( var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
		// alert(totalQty);
		if (totalQty == 0) {

			
			document.getElementById("accept" + i).disabled = true;
			document.getElementById("txtinventoryMaterailRequestNoteItemcode_"
					+ i).disabled = true;
			document
					.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
							+ i).disabled = true;

			document.getElementById("chkbox" + i).disabled = true;
			document.getElementById("selItemQty_" + i).disabled = true;

			/*
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorone" +
			 * i).disabled = true;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo" +
			 * i).disabled = true; document
			 * .getElementById("txtinventoryMaterailRequestNoteFactorthree" +
			 * i).disabled = true; document
			 * .getElementById("txtinventoryMaterailRequestNoteFactorfoure" +
			 * i).disabled = true;
			 */
			// document.getElementById("checkbox"+ i).disabled = true;
		} else {
			 
			
			/*document.getElementById("chkbox" + i).disabled = true;
			document.getElementById("accept" + i).disabled = true;*/
			document.getElementById("txtinventoryMaterailRequestNoteItemcode_"
					+ i).disabled = false;
			document
					.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
							+ i).disabled = false;
			/*
			 * document.getElementById("txtinventoryMaterailRequestNoteFactorone" +
			 * i).disabled = false;
			 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo" +
			 * i).disabled = false; document
			 * .getElementById("txtinventoryMaterailRequestNoteFactorthree" +
			 * i).disabled = false; document
			 * .getElementById("txtinventoryMaterailRequestNoteFactorfoure" +
			 * i).disabled = false;
			 */
		}

	}

}

function fetchMaterialRequestNoteListDetailsInList() {

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
			// alert(r);
			pobj1 = eval('(' + r + ')');
			//alert(r);
			$("#MRNcontent").setTemplate(inventoryMRNTemp);
			$("#MRNcontent").processTemplate(pobj1);

			$("#MRNAjaxResp").html(r);

		}
	});
}

// search function for mrnlist

function fetchMRNDetailByIdNoteList(mrnId) {

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
			SrNo = 1 ;
			pobj1 = eval('(' + r + ')');
			objMRN = JSON.parse(r);
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {

				$("#MRNcontent").setTemplate(inventoryMRNTemp);
				$("#MRNcontent").processTemplate(pobj1);

			} else {
				alert("Record not found..!");
				fetchMaterialRequestNoteListDetailsInList();
			}
			$('#byMrnId').val("");

		}
	});
}

function gotoMrnPage() {
	window.location.reload("inventory_Materail_Request_Note.jsp");
}
function createpurchaseOrderList(MrnId) {
	var didConfirm = confirm("Are you sure to generate Purchase Request?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=createpurchaseOrderList');
		inputs.push('isEdit=no');
		inputs.push('MrnId=' + MrnId);
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

				/*
				 * alert("purchase Request Genrated successfully");
				 * fetchMaterialRequestNoteListDetailsInList();
				 */
				fetchMaterialRequestNoteListDetailsInList();

			}
		});
	}
}

/****************** befor editing 22 jan 2016 ********************************/
/*
function viewMRNDetails(MrnId) {

	if (MrnId == null || MrnId == "") {
		alert("Please enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	$('#iToHideBtns').css('display', 'block');
	refreshviewmrnl();

	var obj = $("#MRNAjaxResp").html();
	objMrnMaster = JSON.parse(obj);

	for ( var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtmaterialReqaestNoteListDocId")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
			*//**
			 * *******************************date convert
			 * ***husen*********************************
			 *//*
			
			 * var str =
			 * (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date)
			 * .split("-"); var mrnreqDate = str[2] + "-" + str[1] + "-" +
			 * str[0];
			 
			$("#txtmaterialReqaestNoteDocDate")
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

			$("#txtReceiverName")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);

			
			 * $("#sclMRNLocation option:selected")
			 * .text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
			 
		}
	}

	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteListDocId")
			.val();
	// alert(txtSubContractingMaterialIssueDocNo);
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
					pobj1 = eval('(' + r + ')');
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;

					var count = 1;
					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
						$("#ItemInfoTable > tbody")
								.append(
										" <tr id ='deleterows"
												+ count
												+ "' > <td> <input type='checkbox'  id='chkbox"
												+ count
												+ "'> </td> <td><input type='text' id='txtSrNo"
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
												+ "'></td> <td id='xyz'><select onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "'><option selected=selected >"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
												+ "</option></select></td> <td><input type='text' id='txtIssuedQty"
												+ count
												+ "' readonly=''  class='form-control input-SmallText' ><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
												+ count
												+ "'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' class='form-control input-SmallText' ></td> <td><input type='text' id='txtcurrentSubInventoryStock"
												+ count
												+ "' readonly=''  class='form-control input-SmallText'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].currentSubInventoryStock
												+ "' > <td><input type='text' id='txtmainInventoryStock"
												+ count
												+ "' readonly=''  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mainInventoryStock
												+ "' class='form-control input-SmallText' ></td> <td><input onclick='getMRNItemAvailableListDetails("
												+ count
												+ ")' "
												+ "type='button' data-toggle='modal' data-target='#MRNFormList' value='Check' id='iCheckAvailabilty"
												+ count
												+ "'class='btn btn-xs btn-success'></td><td><input onclick='updateBatchStockQty("
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
					setEditSave();

					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);

				}

			});
}*/




/* * new  alertd issue mrn in store 23 jan 2016  modified Date :22jully2016 @Author:sudhir add new column as Actual Requested Item Qty and change item qty column as pending req itemQty modified date 4oct2016 Adding(setting) SubInventory ID In this Function  */
function viewMRNDetails(MrnId) {

	if (MrnId == null || MrnId == "") {
		alert("Please enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	$('#iToHideBtns').css('display', 'block');
	refreshviewmrnl();
	var obj = $("#MRNAjaxResp").html();
	objMrnMaster = JSON.parse(obj);

	for ( var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtmaterialReqaestNoteListDocId")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
			  /**
			 * *******************************date convert
			 * ***husen*********************************
			 */ 
			 /* 
			
			 * var str =
			 * (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date)
			 * .split("-"); var mrnreqDate = str[2] + "-" + str[1] + "-" +
			 * str[0];
			 * 
			 * */
			 
			$("#txtmaterialReqaestNoteDocDate")
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

			$("#txtReceiverName")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);

			
			   $("#sclMRNLocation option:selected").text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
			   $("#subInventoryId").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_subinventory_id);
			   break;
			 
		}
	}

	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteListDocId")
			.val();
	// alert(txtSubContractingMaterialIssueDocNo);
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
					pobj1 = eval('(' + r + ')');
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;

					var count = 1;
					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
						var mrnActualItemQty = parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty) + parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory);
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
												+ "'></td> <td><input type='text' readonly='' id='mrnActualItemQty"
												+ count
												+ "' class='form-control input-SmallText' value='"
												+ mrnActualItemQty
												+ "'></td> <td id='xyz'><select style='width:60px;' onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"
												+ count
												+ "'><option selected=selected >"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
												+ "</option></select></td> <td><input type='text' id='txtIssuedQty"
												+ count
												+ "' class='form-control input-SmallText' ><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
												+ count
												+ "'  value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty
												+ "' class='form-control input-SmallText' ></td> <td><input type='text' id='txtcurrentSubInventoryStock"
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
						count++;
						test++;

					}

					totalDocQty();
					setEditSave();
					
					

					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);
					
					
					checkSession();

				}

			});
	
}





/**
 * **************************************change values on edit
 * Quntityiteams***********************************
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
			r = $.parseJSON(r);

			var newData = "<option value=''>" + selItemQtyval + "</option>";
			for ( var i = 0; i < +r.ltInventoryItemSaleDTOs.length; i++) {
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

		}
	});

}

/*
 * function fetchMaterialRequestNoteListDetailsInList() { var inputs = [];
 * inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
 * inputs.push('isEdit=no'); var str = inputs.join('&'); jQuery.ajax({ async :
 * true, type : "POST", data : str + "&reqType=AJAX", url : "InventoryServlet",
 * timeout : 1000 * 60 * 5, catche : false, error : function() { alert("error"); },
 * success : function(r) { pobj1 = eval('(' + r + ')');
 * $("#MRNcontent").setTemplate(inventoryMRNTemp);
 * $("#MRNcontent").processTemplate(pobj1);
 * 
 * $("#MRNAjaxResp").html(r); } }); }
 */

/*
 * function saveMaterialRequestNote() { // General Info
 * 
 * var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteListDocId").val();
 * var txtDocNo = $("#txtmaterialReqaestNoteListDocId").val(); var txtDocDate =
 * $("#txtmaterialReqaestNoteDocDate").val(); var txtMRNTotal =
 * $("#txtMRNTotal").val(); var txtMRNRemark = $("#txtMRNRemark").val(); var
 * txtMRNID = $("#txtMRNID").val(); var status = 'open'; var materiallist = {
 * inventoryMaterialRequestNoteItemInfoSlaveDTO : [] };
 * 
 * for ( var i = 1; i <= txtMRNID; i++) {
 * 
 * if ($("#txtinventoryMaterailRequestNote" + i).val() != null &&
 * $("#txtinventoryMaterailRequestNote" + i).val() != undefined) { var
 * txtinventoryMaterailRequestNote = $( "#txtinventoryMaterailRequestNote" +
 * i).val(); var txtMRNItemName = $( "#txtinventoryMaterailRequestNoteItemcode" +
 * i).val(); var txtMRNDocQuantity = $(
 * "#txtinventoryMaterailRequestNoteDocQuantity" + i).val(); var txtfactor1 =
 * $("#txtinventoryMaterailRequestNoteFactorone" + i) .val(); var txtfactor2 =
 * $("#txtinventoryMaterailRequestNoteFactortwo" + i) .val(); var txtfactor3 = $(
 * "#txtinventoryMaterailRequestNoteFactorthree" + i).val(); var txtfactor4 = $(
 * "#txtinventoryMaterailRequestNoteFactorfoure" + i).val();
 * 
 * materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.push({
 * 
 * mrn_item_info_slave_id : txtinventoryMaterailRequestNote,
 * mrn_item_info_slave_item_name : txtMRNItemName, mrn_item_info_slave_doc_qty :
 * txtMRNDocQuantity, mrn_item_info_slave_item_name : txtMRNItemName,
 * mrn_item_info_slave_item_factor1 : txtfactor1,
 * mrn_item_info_slave_item_factor2 : txtfactor2,
 * mrn_item_info_slave_item_factor3 : txtfactor3,
 * mrn_item_info_slave_item_factor4 : txtfactor4,
 * mrn_item_info_slave_update_date : new Date(), mrn_item_info_slave_create_date :
 * new Date()
 * 
 * }); }
 *  }
 * 
 * materiallist = JSON.stringify(materiallist); var inputs = [];
 * inputs.push('action=SaveMaterialRequestNoteDetails');
 *  // General Info inputs.push("materiallist=" + materiallist);
 * inputs.push('txtMRNID=' + txtMRNID); inputs.push('txtDocNo=' + txtDocNo);
 * inputs.push('txtDocDate=' + txtDocDate); inputs.push('txtMRNTotal=' +
 * txtMRNTotal); inputs.push('txtMRNRemark=' + txtMRNRemark);
 * inputs.push('status=' + status); inputs.push('txtmaterialReqaestNoteId=' +
 * txtmaterialReqaestNoteId);
 * 
 * var str = inputs.join('&'); jQuery .ajax({ async : true, type : "POST", data :
 * str + "&reqType=AJAX", url : "InventoryServlet", timeout : 1000 * 60 * 5,
 * catche : false, error : function() { alert("error"); }, success : function(r) {
 * ajaxResponse = r; alert("Record saved successfully..!"); window.location
 * .replace("inventory_Material_Request_Note_List.jsp"); } }); }
 */
/**
 * *************************************save on edit mrn when issue any iteam  ******* 
 */
function saveMaterialRequestNoteList() {
	// General In
	//deductStock();
	var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteDocId").val();
	var txtDocNo = $("#txtmaterialReqaestNoteListDocId").val();
	var txtDocDate = $("#txtmaterialReqaestNoteDocDate").val();
	var txtMRNTotal = $("#txtMRNTotal").val();
	var txtMRNRemark = $("#txtMRNRemark").val();
	var txtMRNID = $("#txtMRNID").val();
	var totalRow = $("#totalRow").val();
	var txtMRNLocationName = $("#txtMRNLocationName").val();
	var txtReceiverName = $("#txtReceiverName").val();
	if (txtDocDate == "" || txtDocDate == 0) {

		alert("Please select mrn date");
		$("#txtmaterialReqaestNoteDocDate").focus();
		return false;

	}
	if (txtMRNLocationName == "" || txtMRNLocationName == 0) {

		alert("Please Enter SubInventory Name");
		$("#txtMRNLocationName").focus();
		return false;

	}
	/* var sclMRNLocation = $("#sclMRNLocation option:selected").text(); */
	var status = 'InProcess';
	var materiallist = {
		inventoryMaterialRequestNoteItemInfoSlaveDTO : []
	};

	for ( var i = 1; i <= txtMRNID; i++) {
		if ($("#txtinventoryMaterailRequestNote" + i).val() != null
				&& $("#txtinventoryMaterailRequestNote" + i).val() != undefined) {
			var txtinventoryMaterailRequestNote = $(
					"#txtinventoryMaterailRequestNote" + i).val();
			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i).val();

			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();

			var txtMRNDocQuantity = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
			var selItemQty = $("#selItemQty_" + i + " option:selected").text();

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

			var pattern = /^[0-9]+$/;
			if (!pattern.test(txtMRNDocQuantity)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).val('');
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i).focus();
				return false;
			}

			if (selItemQty == 0 || selItemQty == '-Select-') {
				alert("Please select uom in " + i + " row");
				$("#selItemQty_").focus();
				return false;
			}
			/*
			 * var txtfactor1 = $("#txtinventoryMaterailRequestNoteFactorone" +
			 * i) .val(); var txtfactor2 =
			 * $("#txtinventoryMaterailRequestNoteFactortwo" + i) .val(); var
			 * txtfactor3 = $( "#txtinventoryMaterailRequestNoteFactorthree" +
			 * i).val(); refreshPopUp var txtfactor4 = $(
			 * "#txtinventoryMaterailRequestNoteFactorfoure" + i).val();
			 */

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

			materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.push({

				mrn_item_info_slave_id : txtinventoryMaterailRequestNote,
				mrn_item_info_slave_item_name : txtMRNItemName,
				mrn_item_info_slave_doc_qty : txtMRNDocQuantity,
				mrn_item_info_slave_item_name : txtMRNItemName,
				mrn_item_info_slave_item_code : txtMRNItemcodeId,
				mrn_item_info_slave_item_selItemQty : selItemQty,
				/*
				 * mrn_item_info_slave_item_factor1 : txtfactor1,
				 * mrn_item_info_slave_item_factor2 : txtfactor2,
				 * mrn_item_info_slave_item_factor3 : txtfactor3,
				 * mrn_item_info_slave_item_factor4 : txtfactor4,
				 */
				mrn_item_info_slave_issue_qty : txtIssuedQty,
				mrn_item_info_slave_update_date : new Date(),
				mrn_item_info_slave_create_date : new Date()

			});
		}

	}
	
	var li = materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
	 if(li == 0)
		{
		alert("please enter atleast one item row to issue mrn ");
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

	/* inputs.push('sclMRNLocation=' + sclMRNLocation); */
	inputs.push('status=' + status);
	inputs.push('txtmaterialReqaestNoteId=' + txtmaterialReqaestNoteId);

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
					ajaxResponse = r;
					 if(r == "1")
					{ 
						deductStock();
						alert("Record Updated Successfully..!");
					}
					else
						{
							alert(r);
						}
					
					$('#MaterialRequestNoteList').removeClass('fade');
					$('#MaterialRequestNoteList').modal('hide');
					window.location.reload("inventory_Material_Request_Note_List.jsp");
				}
			});
}
function deleteDItemMasterDetail(MrnId) {
	var didConfirm = confirm("Are you sure to delete record?");
	// alert(MrnId);
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteMrnMasterDetail');
		inputs.push('MrnId=' + MrnId);
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
				fetchMaterialRequestNoteListDetailsInList();

			}
		});
	}
}

var count = 1;
var test = 0;
// fetchMaterialRequestNoteDetails
/**************  old Add items in mrn funtion 22 jan 2016 ********/
/*function setMaterialRequestInfo() {

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
								+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "' value='0'  /></div></td> <td><input type='text' onkeypress='return validateNumbers(event)' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' ></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option >Select</option></select></td><td><input  readonly='' type='text' id='txtIssuedQty"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' ></td> <td><input  readonly='' type='text' id='txtcurrentSubInventoryStock"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' ></td><td><input  readonly='' type='text' id='txtmainInventoryStock"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' ></td><td><input onclick='getMRNItemAvailableListDetails("
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
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'> </td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "' value='0'  /></div></td><td><input type='text' onkeypress='return validateNumbers(event)' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' ></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactortwo"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text'  id='txtinventoryMaterailRequestNoteFactorthree"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorfoure"
								+ count
								+ "' class='form-control input-SmallText'></td>");
		$("#txtMRNID").val(count);
		count++;
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");

	}

}*/

/*********** new mrn add items alertd function 22 jan 2016 *******/
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
								+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "' value='0'  /></div></td> <td><input type='text' onkeypress='return validateNumbers(event)' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' ></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option >Select</option></select></td><td><input  readonly='' type='text' id='txtIssuedQty"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' ></td> <td><input  readonly='' type='text' id='txtcurrentSubInventoryStock"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' ></td><td><input  readonly='' type='text' id='txtmainInventoryStock"
								+ count
								+ "' class='form-control input-SmallText'value='"
								+ "' ></td><td><input onclick='updateBatchStockQty("
								+ count + ")' "
								+ "type='button' value='accept' id='accept"
								+ count
								+ "'class='btn btn-xs btn-success'></td>");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
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
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'> </td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "' value='0'  /></div></td><td><input type='text' onkeypress='return validateNumbers(event)' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' ></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactortwo"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text'  id='txtinventoryMaterailRequestNoteFactorthree"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorfoure"
								+ count
								+ "' class='form-control input-SmallText'></td>");
		$("#txtMRNID").val(count);
		count++;
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");

	}

}

function toRemovesetItemInfotrMRN(tblSubContractingCountRow) {
	// alert(tblSubContractingCountRow);
	var tblSubContractingCountRow1 = $("#txtMRNID").val();
	// alert(tblSubContractingCountRow);
	var totalRow = $("#totalRow").val();

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

}

function getNextMaterialRequestNoteListId() {

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
			$("#txtmaterialReqaestNoteListDocId").val(r);
		}
	});
}

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
	// $("#txtMRNID").val('0');
	window.location.reload("inventory_Material_Request_Note_List.jsp");

}
function totalDocQty() {
	// var i=1;

	var sum = 0;
	var totalQty;
	var txtMRNID = $("#txtMRNID").val();
	/* var tblSubContractingCountRow1 = $("#txtMRNID").val(); */

	var tblSubContractingCountRow1 = $("#totalRow").val();

	for ( var i = 1; i <= txtMRNID; i++) {

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

	for ( var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtMRNTotal").val(sum);
	$("#txtMRNID").val(txtMRNID);

}

function getMRNItemAvailableListDetails(count) {

	var txtinventoryMaterailRequestNoteItemcode = $("#txtMRNItemcodeId" + count)
			.val();
	$("#txtMRNItemcodeId" + count).val(txtinventoryMaterailRequestNoteItemcode);
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
			// alert(r);
			pobj1 = eval('(' + r + ')');
			// alert(pobj1.ltbatchstockDTO[0].avialbleItem);
			$("#totalItemQty").val(pobj1.ltbatchstockDTO[0].avialbleItem);
			var totalItemQty = $("#totalItemQty").val();

			if (totalItemQty == 0) {
				document.getElementById("requiredQty").disabled = true;
			} else {
				document.getElementById("requiredQty").disabled = false;
			}

		}
	});

}
/************ old update function for stock deduct Date 22jan2016 *****/
/*function updateBatchStockQty(count) {

	var txtQuantity = $("#txtIssuedQty" + count).val();
	var txtitemCode = $("#txtMRNItemcodeId" + count).val();
	var itemName = $("#txtinventoryMaterailRequestNoteItemcode_" + count).val();
	var txtReceiverName = $("#txtReceiverName").val();
	var txtslaveId = $("#txtinventoryMaterailRequestNote" + count).val();
	var txtMRNSubInventoryName = $("#txtMRNLocationName").val();
	var txtMrnId = $("#txtmaterialReqaestNoteListDocId").val();
	var itemQauntity = $("#txtinventoryMaterailRequestNoteDocQuantity" + count)
			.val();
	var Totalquntity = parseInt(itemQauntity) + parseInt(txtQuantity);

	if (txtQuantity == "" || txtQuantity == null || txtQuantity == undefined) {
		alert("Without filling Issued Quantity you can not accept request");

		return false;
	}

	// alert("item code:" + txtitemCode);
	var inputs = [];
	inputs.push('action=UpdateBatchStockQtyDetails');
	inputs.push('ItemCode=' + txtitemCode);
	inputs.push('Quantity=' + txtQuantity);
	inputs.push('itemName=' + itemName);
	inputs.push('txtReceiverName=' + txtReceiverName);
	inputs.push('txtslaveId=' + txtslaveId);
	inputs.push('txtMrnId=' + txtMrnId);
	inputs.push('txtMRNSubInventoryName=' + txtMRNSubInventoryName);
	inputs.push('Totalquntity=' + Totalquntity);
	inputs.push('ItempendingQty=' + itemQauntity);

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
					 ajaxResponse = r; 
					alert(r);
					// window.location.replace("inventory_Materail_Request_List.jsp");
					// alert("hii sudhir you are in update");

					var txtMRNID = $("#txtMRNID").val();
					var totalRow = $("#totalRow").val();
					for ( var i = 1; i <= txtMRNID; i++) {

						totalQty = $(
								"#txtinventoryMaterailRequestNoteDocQuantity"
										+ i).val();
						// alert(totalQty);
						if (totalQty == 0) {

							document.getElementById("accept" + i).disabled = true;
							document.getElementById("iCheckAvailabilty" + i).disabled = true;
							document
									.getElementById("txtinventoryMaterailRequestNoteItemcode_"
											+ i).disabled = true;
							document
									.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
											+ i).disabled = true;
							document.getElementById("chkbox" + i).disabled = true;
							
							 * document.getElementById("txtinventoryMaterailRequestNoteFactorone" +
							 * i).disabled = true;
							 * document.getElementById("txtinventoryMaterailRequestNoteFactortwo"+
							 * i).disabled = true;
							 * document.getElementById("txtinventoryMaterailRequestNoteFactorthree"+
							 * i).disabled = true;
							 * document.getElementById("txtinventoryMaterailRequestNoteFactorfoure" +
							 * i).disabled = true;
							 

						} else {

							document.getElementById("accept" + i).disabled = false;
							document.getElementById("iCheckAvailabilty" + i).disabled = false;
							document
									.getElementById("txtinventoryMaterailRequestNoteItemcode_"
											+ i).disabled = false;
							document
									.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
											+ i).disabled = false;
							
							 * document.getElementById("txtinventoryMaterailRequestNoteFactorone" +
							 * i).disabled = false; document
							 * .getElementById("txtinventoryMaterailRequestNoteFactortwo" +
							 * i).disabled = false; document
							 * .getElementById("txtinventoryMaterailRequestNoteFactorthree" +
							 * i).disabled = false; document
							 * .getElementById("txtinventoryMaterailRequestNoteFactorfoure" +
							 * i).disabled = false;
							 
							// document.getElementById("checkbox"+
							// count).disabled = false;
						}
					}

				}
			});
}*/



/******************* new alerted updateBatchStockQty Date:22jan2016 **************/
function updateBatchStockQty(count) {
	
	/* document.getElementById("btnsaveMrnList").disabled = false;*/
	 var txtmainInventoryStock = $("#txtmainInventoryStock"+ count).val();
	 
	 var itemQauntity = $("#txtinventoryMaterailRequestNoteDocQuantity" + count).val();
	 if(itemQauntity == 0)
		 {
		 return false;
		 }
	
	 if(parseInt(txtmainInventoryStock) == 0 || parseInt(txtmainInventoryStock) < 0)
		 {
		 alert("Stock not available");
		 document.getElementById("chkbox"+ count).checked = false;
		 document.getElementById("accept" + count).disabled = true;
		 return false;
		 }
	 
	 var txtIssuedQty = $("#txtIssuedQty" + count).val();
	 if(txtIssuedQty != "" && txtIssuedQty !=" ")
	 {
		 if(parseInt(txtIssuedQty) > parseInt(itemQauntity))
			 {
			 alert("Issue Quantity is less then item Quantity");
			 return false;
			 }
		 
		 if(parseInt(txtIssuedQty) <= parseInt(itemQauntity))
		 {
			 if(parseInt(txtIssuedQty) > parseInt(txtmainInventoryStock))
				 {
				 alert("Issue Quantity is less then Main Inventory Stock");
				 return false;
				 }
			 else
				 {
				 var finalItemQty = parseInt(itemQauntity) - parseInt(txtIssuedQty);
				 $("#txtinventoryMaterailRequestNoteDocQuantity" + count).val(finalItemQty);
				 document.getElementById("chkbox" + count).disabled = true;
				 document.getElementById("chkbox"+ count).checked = true;
				 document.getElementById("accept" + count).disabled = true;
				 document.getElementById("txtIssuedQty" + count).disabled = true;
				 totalDocQty();
				 return false;
				 
				 }
			  
		 }
		 
	 }
	 if(parseInt(itemQauntity) > parseInt(txtmainInventoryStock))
		 {
		 var finalIssueqty = parseInt(itemQauntity) - parseInt(txtmainInventoryStock);
		 $("#txtIssuedQty" + count).val(txtmainInventoryStock);
		 $("#txtinventoryMaterailRequestNoteDocQuantity" + count).val(finalIssueqty);
		
		 document.getElementById("chkbox"+ count).checked = true;
		 document.getElementById("chkbox" + count).disabled = true;
		 document.getElementById("accept" + count).disabled = true;
		 document.getElementById("txtIssuedQty" + count).disabled = true;
		 
		 }
	 var txtIssuedQty = $("#txtIssuedQty" + count).val();
	
	 if(txtIssuedQty ==" " || txtIssuedQty =="")
		 {
		 var finalIssueqty = parseInt(txtmainInventoryStock) - parseInt(itemQauntity);
		 $("#txtIssuedQty" + count).val(itemQauntity);
		 $("#txtinventoryMaterailRequestNoteDocQuantity" + count).val(0);
		 document.getElementById("chkbox" + count).disabled = true;
		 document.getElementById("chkbox"+ count).checked = true;
		 document.getElementById("accept" + count).disabled = true;
		 document.getElementById("txtIssuedQty" + count).disabled = true;
		 }
	 
	 totalDocQty();
	 return false;
	 
	 
	 
 
}




/*
 * function issueQtyAssign() {
 * 
 * var hiddenCount = $("#hiddenCount").val(); // alert(hiddenCount); var
 * requiredQty = $("#requiredQty").val(); if(requiredQty == 0|| requiredQty ==
 * null) {
 * 
 * alert("please enter required quantity"); $("#requiredQty").focus(); return
 * false; } else { $('#MRNFormList').removeClass('fade');
 * $('#MRNFormList').modal('hide'); } $("#txtIssuedQty" +
 * hiddenCount).val(requiredQty);
 * 
 * var txtIssuedQty = $("#txtIssuedQty" + hiddenCount).val(); alert("your issuse
 * Quntity"+txtIssuedQty); var docqty =
 * $("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount) .val(); //
 * alert(docqty); var reqridQty = $("#requiredQty").val(); //alert(reqridQty);
 * var remainitemqty = docqty - reqridQty; //alert(remainitemqty);
 * $("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount).val(
 * remainitemqty);
 * 
 * totalDocQty(); $("#requiredQty").val(''); }
 */

function issueQtyAssign() {

	var hiddenCount = $("#hiddenCount").val();
	// alert(hiddenCount);
	var requiredQty = $("#requiredQty").val();

	var totalItemQty = $("#totalItemQty").val();

	/*
	 * if(requiredQty > totalItemQty) { alert("Required Items less then
	 * Available Items"); $("#requiredQty").val(''); $("#requiredQty").focus();
	 * return false; }
	 */

	var requiredQtyfinal = parseInt(requiredQty);
	var totalItemQtyFinal = parseInt(totalItemQty);

	if (requiredQtyfinal > totalItemQtyFinal) {
		alert("Required Items should be equal to or less than Available Items");
		$("#requiredQty").focus();
		$("#requiredQty").val('');
		return false;
	}

	var txtIssuedQty = $("#txtIssuedQty" + hiddenCount).val(requiredQty);
	var docqty = $("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount)
			.val();
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
		alert("Required Quantity should not greater then Item Quantity");
		$("#txtinventoryMaterailRequestNoteDocQuantity" + hiddenCount).val(
				docqty);
		$("#txtIssuedQty" + hiddenCount).val("");
		$("#requiredQty").val('');
		return false;
	}

	totalDocQty();
	$("#requiredQty").val('');
}

function refreshviewmrnl() {

	$('#MaterialRequestNoteList').find('input:text').val('');
	$('#MaterialRequestNoteList').find('input:hidden').val('');

	$('#MaterialRequestNoteList').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#MaterialRequestNoteList').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');

}

function autoSuggestionForLocation(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

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

							for ( var i = 0; i < ajaxResponse.ltSubInventoryDTO.length; i++) {
								availableTags
										.push(ajaxResponse.ltSubInventoryDTO[i].subinventory_name
												+ "_"
												+ ajaxResponse.ltSubInventoryDTO[i].subinventory_Id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
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

var selSubInventoryLocation = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltSubInventoryDTO as ltSubInventoryDTO}"
		+ "<option  value='{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_location}</option>"
		+ "{#/for}";

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
						if (r.length == 32) {
							alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$(
									"#txtinventoryMaterailRequestNoteItemcode_"
											+ idValue1).val('');
							$(
									"#txtinventoryMaterailRequestNoteItemcode_"
											+ idValue1).focus();

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
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

					pobj1 = eval('(' + r + ')');

					$("#selItemQty_" + idValue).setTemplate(
							selInventorySalesDetailsTemplateforMRNListEdit);
					$("#selItemQty_" + idValue).processTemplate(pobj1);

				}
			});
			
			
			
			var subInventoryName =$("#txtMRNLocationName").val();
			var inputs = [];
			inputs.push('action=fetchItemsCurrentStockofSubinventoryandMainStock');
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
				  pobj1 = eval('(' + r + ')');
				  var pobj2 = pobj1.split("_");
				  var currentStock = pobj2[0]
				  var mainstock = pobj2[1];
				  $("#txtcurrentSubInventoryStock"+idValue).val(currentStock);
				  $("#txtmainInventoryStock"+idValue).val(mainstock);
				   
				   
				}
			});
			
			
			
			

		}
	}

}

/*
 * var selInventorySalesDetailsTemplateforMRNListEdit = "<option
 * value='Select'>-Select-</option>" + "{#foreach $T.ltInventoryItemSaleDTOs as
 * ltInventoryItemSaleDTOs}" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom1}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom2}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom3}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom4}</option>" +
 * "{#/for}";
 */

var selInventorySalesDetailsTemplateforMRNListEdit = "<option value='Select'>-Select-</option>"
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

/**
 * **********************Adding dynamic rows in table dynamically mrn in
 * list****************************
 */

function setMaterialRequestInfoInList() {

	$('#iToHideBtns').css('display', 'block');
	$("#closeonclick").hide();
	if (test > 0 && isNew > 0) {
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
								+ "'> </td>  <td><input type='hidden' id='txtinventoryMaterailRequestNoteInList"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcodeInList_'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcodeInList_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNIDInList"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeIdInList"
								+ count
								+ "' value='0'  /></div></td> <td>  <td><input type='text' onkeypress='return validateNumbers(event)'  id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()'/><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option >Select</option></select></td>");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
		// count++;
		/* totalDocQty(); */
	} else {

		$("#ItemInfoTableinLiST > tbody")
				.append(
						" <tr id ='deleterowsInList"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td> <input type='hidden' id='txtinventoryMaterailRequestNoteInList"
								+ count
								+ "' name='txtinventoryMaterailRequestNoteInList' value ='0'   class='form-control input-SmallText'/> <input type='text' id='txtSrNoInList"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'/></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcodeInList'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcodeInList_"
								+ count
								+ "'onkeyup='autoSuggestItemNameInList(this.id,onchange)' class='typeahead form-control input-SmallText'/>"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "'   /> <input type='hidden'  id='txtMRNItemcodeIdInList"
								+ count
								+ "'  value='0' /> </div></td> <td> <input type='text' onkeypress='return validateNumbers(event)' id='txtinventoryMaterailRequestNoteDocQuantityInList"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQtyInList()'/> <input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option >Select</option></select></td> ");
		$("#txtMRNIDInList").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNIDInList").val();
		$("#totalRowInList").val(tblSubContractingCountRow1);
		autoSuggestItemNameInList(
				"txtinventoryMaterailRequestNoteItemcodeInList_" + count,
				"onload");
		count++;

	}

}

/**
 * **********************Removeing dynamic rows in table dynamically mrn in
 * list****************************
 */
function toRemovesetItemInfotrMRNInList(tblSubContractingCountRow) {
	// alert(tblSubContractingCountRow);
	var tblSubContractingCountRow1 = $("#txtMRNIDInList").val();
	// $("#totalRow").val(tblSubContractingCountRow1);
	var oldrow = $("#totalRowInList").val();

	// alert(tblSubContractingCountRow1);

	var temp = tblSubContractingCountRow1;
	var p = 1;
	for ( var i = 0; i < tblSubContractingCountRow1; i++) {
		// alert(p);

		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			$("#deleterowsInList" + p + " ").remove();
			// alert(p);
			temp = temp - 1;

			$("#totalRowInList").val(temp);
		}

		p++;

	}

	/*
	 * totalDocQty(); chcknulldocQty(); isNew = 1;
	 */
	// setEditSaveNote();
	/*
	 * var tblSubContractingCountRow1 = $("#txtMRNID").val();
	 * $("#totalRow").val(tblSubContractingCountRow1);
	 */

}

/**
 * ******************************************************** save new mrn in List
 * in store ************************************************************
 */

function saveMaterialRequestNoteInList() {
	// General In
	var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteDocIdInList")
			.val();
	var txtDocNo = $("#txtmaterialReqaestNoteDocIdInList").val();
	var txtDocDate = $("#txtMRNDateInList").val();
	var txtMRNTotal = $("#txtMRNTotalInList").val();
	var txtMRNRemark = $("#txtMRNRemarkInList").val();
	var txtMRNID = $("#txtMRNIDInList").val();
	var totalRow = $("#totalRowInList").val();
	var txtReceiverName = $("#txtReceiverName1").val();
	var txtMRNLocationName = $("#txtMRNLocationNameInList").val();
	var CurrentuserName = $("#CurrentuserName").val();
	var subInventoryId = $("#subInventoryId").val();
	var mrnApprovedStatus='NYA';

	if (txtDocDate == "" || txtDocDate == 0) {

		alert("Please select mrn date");
		$("#txtMRNDateInList").focus();
		return false;

	}
	if(txtDocDate)
	{
	   var today = new Date();
		 
		var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    
	    if(dd<10){
	        dd='0'+dd;
	    } 
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    var today1 = dd+'/'+mm+'/'+yyyy;

	    if (txtDocDate === today1) {

		} else {
			alert("Please Enter Current Date ");
			$("#txtMRNDateInList").focus();
			return false;
		}
	}

	if (txtMRNLocationName == "" || txtMRNLocationName == 0) {

		alert("Please Enter Suninventory Name");
		$("#txtMRNLocationNameInList").focus();
		return false;

	}

	/* var sclMRNLocation = $("#sclMRNLocationInList option:selected").text(); */
	var status = 'open';
	var materiallist = {
		inventoryMaterialRequestNoteItemInfoSlaveDTO : []
	};

	for ( var i = 1; i <= txtMRNID; i++) {
		if ($("#txtinventoryMaterailRequestNoteInList" + i).val() != null
				&& $("#txtinventoryMaterailRequestNoteInList" + i).val() != undefined) {
			var txtinventoryMaterailRequestNote = $(
					"#txtinventoryMaterailRequestNoteInList" + i).val();
			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcodeInList_" + i)
					.val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeIdInList" + i).val();
			var txtMRNDocQuantity = $(
					"#txtinventoryMaterailRequestNoteDocQuantityInList" + i)
					.val();
			var txtinventoryMaterailRequestNoteIssueQuantity = $(
					"#txtinventoryMaterailRequestNoteIssueQuantity" + i).val();

			var selItemQty = $("#selItemQty_" + i + " option:selected").text();
			if (txtMRNItemName == "" || txtMRNItemName == null) {

				alert("Please enter item name in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteItemcodeInList_" + i)
						.focus();
				return false;

			}
			if (txtMRNDocQuantity == "" || txtMRNDocQuantity == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantityInList" + i)
						.focus();
				return false;

			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(txtMRNDocQuantity)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtMRNDocQuantity" + i).val('');
				$("#txtMRNDocQuantity" + i).focus();
				return false;
			}

			if (selItemQty == 0 || selItemQty == '-Select-') {
				alert("Please select uom in " + i + " row");
				$("#selItemQty_").focus();
				return false;
			}
			/*
			 * var txtfactor1 =
			 * $("#txtinventoryMaterailRequestNoteFactoroneInList" + i) .val();
			 * var txtfactor2 =
			 * $("#txtinventoryMaterailRequestNoteFactortwoInList" + i) .val();
			 * var txtfactor3 = $(
			 * "#txtinventoryMaterailRequestNoteFactorthreeInList" + i).val();
			 * var txtfactor4 = $(
			 * "#txtinventoryMaterailRequestNoteFactorfoureInList" + i).val();
			 */

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

	var lenlist = materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;

	if (lenlist == 0) {
		alert("Please enter atleast one Item row to Save Material Request Note");
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

	// inputs.push('sclMRNLocation=' + sclMRNLocation);
	inputs.push('status=' + status);
	inputs.push('txtmaterialReqaestNoteId=' + txtmaterialReqaestNoteId);
	inputs.push('txtMrnBookerName=' + CurrentuserName);
	inputs.push('MrnApprovedStatus=' + mrnApprovedStatus);
	inputs.push('subInventoryId=' + subInventoryId);
	

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
					ajaxResponse = r;
					alert("Record saved successfully..!");
					$('#NewMRNForm').removeClass('fade');
					$('#NewMRNForm').modal('hide');
					window.location
							.reload("inventory_Material_Request_Note_List.jsp");
				}
			});
}

function getNextMaterialRequestNoteIdInLIst() {

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
			$("#txtmaterialReqaestNoteDocIdInList").val(r);
		}
	});
}

function setclearPOPONAdd() {
	$('#NewMRNForm').find('input:text').val('');
	// $('#NewMRNForm').find('input:hidden').val('');

	$('#NewMRNForm').find('input:text').val('');
	$('#ItemInfoTableinLiST').find('input:text').val('');
	$('#NewMRNForm').find('textarea').val('');
	$("#ItemInfoTableinLiST > tbody").html('');
	$("#sclMRNLocationInList option:selected").text('');
	isNew = 0;
	count = 1;
	getNextMaterialRequestNoteIdInLIst();
	
	/*** set Defalut todays Date to date @Date3Aug2016 @Author Sudhir */
	var today = new Date();
	 
	var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    var today1 = dd+'/'+mm+'/'+yyyy;
    $("#txtMRNDateInList").val(today1);

	// window.location.reload("inventory_Materail_Request_Note.jsp");
}

/***Auto suggetion for item name in mrn list modified @Date16 march 2016 ****/

function autoSuggestItemNameInList(inputID, typeauto) {
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
						if (r.length == 32) {
							alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$(
									"#txtinventoryMaterailRequestNoteItemcodeInList_"
											+ idValue1).val('');
							$(
									"#txtinventoryMaterailRequestNoteItemcodeInList_"
											+ idValue1).focus();

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
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

			$("#txtMRNItemcodeIdInList" + idValue).val(currentcode);
			document.getElementById("txtinventoryMaterailRequestNoteItemcodeInList_" + idValue ).disabled = true;

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
					// alert(r);
					pobj1 = eval('(' + r + ')');

					$("#selItemQty_" + idValue).setTemplate(
							selInventorySalesDetailsTemplateforMRNList);
					$("#selItemQty_" + idValue).processTemplate(pobj1);

				}
			});

		}
	}

}

var selInventorySalesDetailsTemplateforMRNList = "<option value='Select'>-Select-</option>"
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

/*
 * var selInventorySalesDetailsTemplateforMRNList = "<option
 * value='Select'>-Select-</option>" + "{#foreach $T.ltInventoryItemSaleDTOs as
 * ltInventoryItemSaleDTOs}" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom1}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom2}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom3}</option>" + "<option
 * value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom4}</option>" +
 * "{#/for}";
 */

/** ****************Auto suggetion for mrn List Item NAme*********************** */
function autoSuggestionForLocationInList(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

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
						if (r.length == 24) {
							alert("NO MATCHING FOUND Please Enter Valid Subinventory Name");
							$("#txtMRNLocationNameInList").val('');
							$("#txtMRNLocationNameInList").focus();

						} else {
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltSubInventoryDTO.length; i++) {
								availableTags
										.push(ajaxResponse.ltSubInventoryDTO[i].subinventory_name
												+ "_"
												+ ajaxResponse.ltSubInventoryDTO[i].subinventory_Id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
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
			var txtMRNLocationName = $("#txtMRNLocationNameInList").val();
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
					$("#sclMRNLocationInList").setTemplate(
							selSubInventoryLocationInList);
					$("#sclMRNLocationInList").processTemplate(pobj1);

				}
			});

		}

	}

}

function chcknulldocQtyInList() {

	var sum = 0;
	var totalQty;
	var txtMRNID = $("#txtMRNIDInList").val();
	var totalRow = $("#totalRowInList").val();

	for ( var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantityInList" + i)
				.val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtMRNTotalInList").val(sum);
	$("#txtMRNIDInList").val(txtMRNID);

}

var selSubInventoryLocationInList = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltSubInventoryDTO as ltSubInventoryDTO}"
		+ "<option  value='{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_location}</option>"
		+ "{#/for}";

/***** set incharge level val for the incharge Date:21 jan 2016 Author :sudhir jadhav ***************/
function chklevlval(val)
{
	 $("#levelValue").val(val);
	 $("#userName").val('');
	 $("#userPassword").val('');
}
/***** End set incharge level val for the incharge Date:21 jan 2016 Author :sudhir jadhav ***************/

/************  vaildation for Incharge level 3 in store author sudhir Date:21 jan 2016 ********************/
function checkUserNameandPassword() 
{
	//alert("hi");	
var ApprovedByIncharge = $("#levelValue").val();
var userName = $("#userName").val();
var userPassword = $("#userPassword").val();
if(userName=="" || userPassword =="")
	{
	alert(" Please Fill All Details ");
	return false;
	}

var MrnId = $("#txtmaterialReqaestNoteListDocId").val();
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
		 //ajaxResponse = r;
		 var b = r.replace(/"/g, "");
		 if(b=="1")
		 {
			alert("Invalid User Name or Password");
			return false;
			
		 }
		 else
			 
		 {  
			 
			 saveMaterialRequestNoteList();
			 $('#userNameandpasswordPopUp').removeClass('fade');
			 $('#userNameandpasswordPopUp').modal('hide');
			/* document.getElementById("btnsaveMrnList").disabled = true;*/
			 //setUnableanddisablechk();
			 return false;
			 
/*			// General In
				var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteDocId").val();
				var txtDocNo = $("#txtmaterialReqaestNoteDocId").val();
				var txtDocDate = $("#txtMRNDate").val();
				var txtMRNTotal = $("#txtMRNTotal").val();
				var txtMRNRemark = $("#txtMRNRemark").val();
				var CurrentuserName = $("#CurrentuserName").val();
				
				var mrnApprovedStatus= $("#levelValue").val()
				 
				if (txtDocDate == "" || txtDocDate == 0) {

					alert("Please select mrn date");
					$("#txtMRNDate").focus();
					return false;

				}
				
				var isEditUpdate =$("#isEditUpdate").val();
				
				   if(!(isEditUpdate=="Update"))
				   {		  
				   if(txtDocDate)
					{
					var today = new Date();
				   var dd = today.getDate();
				   var mm = today.getMonth()+1; //January is 0!

				   var yyyy = today.getFullYear();
				   
				   var today1 = dd+'/'+mm+'/'+yyyy;
				   
				   if(new Date(txtDocDate).getTime() === new Date(today1).getTime())
					   {
					   		    
					   }
				   else
				   {
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

				for ( var i = 1; i <= txtMRNID; i++) {

					if ($("#txtinventoryMaterailRequestNote" + i).val() != null
							&& $("#txtinventoryMaterailRequestNote" + i).val() != undefined) {
						var txtinventoryMaterailRequestNote = $(
								"#txtinventoryMaterailRequestNote" + i).val();
						var txtMRNItemName = $(
								"#txtinventoryMaterailRequestNoteItemcode_" + i).val();
						var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();
						var txtMRNDocQuantity = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
						

						var txtinventoryMaterailRequestNoteIssueQuantity = $(
								"#txtinventoryMaterailRequestNoteIssueQuantity" + i).val();

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
						
						var pattern = /^([0-9])*$/;
						if (!pattern.test(txtMRNDocQuantity)) {
							alert("MRN Quantity field is of digits only.!");
							$("#txtMRNDocQuantity" + i).focus();
							return false;
							
						}
						

						var selItemQty = $("#selItemQty_" + i + " option:selected").text();

						 
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
				 if(li == 0)
					{
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
			 }
			});*/
			 
			 
			 
			 
			 
			 alert("Approved level Succssefully");
				/*$('#userNameandpasswordPopUp').removeClass('fade');
				$('#userNameandpasswordPopUp').modal('hide');
				$('#MRNForm').removeClass('fade');
				$('#MRNForm').modal('hide');
				onmrn();
				fetchMaterialRequestNoteDetailsShows();*/
		 }
	}
	});
  
}

/************ End vaildation for Incharge level 3 in store author sudhir Date:21 jan 2016 ********************/


/******* Active checkbox and accept button while Approval by the store keeper in store ************/
function setUnableanddisablechk() {

	var txtMRNID = $("#txtMRNID").val();
//	var totalRow = $("#totalRow").val();
	for ( var i = 1; i <= txtMRNID; i++) {

		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
		 
		if (totalQty == 0)
		{ 
			document.getElementById("chkbox" + i).disabled = true;
			document.getElementById("accept" + i).disabled = true;
			/*document.getElementById("iCheckAvailabilty" + i).disabled = true;*/
			document.getElementById("txtinventoryMaterailRequestNoteItemcode_"
					+ i).disabled = true;
			document
					.getElementById("txtinventoryMaterailRequestNoteDocQuantity"
							+ i).disabled = true;

			/*document.getElementById("chkbox" + i).disabled = true;*/
			document.getElementById("selItemQty_" + i).disabled = true;

			 
		}
		else 
		{
			document.getElementById("chkbox" + i).disabled = false;
			document.getElementById("accept" + i).disabled = true;
		/*	document.getElementById("iCheckAvailabilty" + i).disabled = false;*/
			document.getElementById("txtinventoryMaterailRequestNoteItemcode_"+ i).disabled = false;
			document.getElementById("txtinventoryMaterailRequestNoteDocQuantity"+ i).disabled = false;
			 
		}

	}

}

function chkForAccept(count)
{
	var $radios = $('input:checkbox[name=checkbox' + count + ']');
	if ($radios.is(':checked') == true)
	{
		document.getElementById("accept" + count).disabled = false;
		document.getElementById("txtIssuedQty" + count).disabled = false;
	}
	if ($radios.is(':checked') == false)
	{ 
		var txtmainInventoryStock =$("txtmainInventoryStock"+count).val();
		 if(txtmainInventoryStock == 0)
			 {
			 return false;
			 }
		 
		var txtIssuedQty = $("#txtIssuedQty"+count).val();
		
		if(txtIssuedQty==" "|| txtIssuedQty=="")
			{
			return false;
			}
		var txtinventoryMaterailRequestNoteDocQuantity = $("#txtinventoryMaterailRequestNoteDocQuantity"+count).val();
		if(txtinventoryMaterailRequestNoteDocQuantity !="" || txtIssuedQty !=" " || txtIssuedQty !="")
		{
			var finalQty = parseInt(txtinventoryMaterailRequestNoteDocQuantity) + parseInt(txtIssuedQty);
			$("#txtinventoryMaterailRequestNoteDocQuantity"+count).val(finalQty);
			 $("#txtIssuedQty"+count).val(' ');
			 
			 document.getElementById("accept" + count).disabled = true;
			 $("#accept"+ count).css('background-color','264d00');
			
		return false;
		}
		
		
		
		/*$("#txtinventoryMaterailRequestNoteDocQuantity"+count).val(txtIssuedQty);
		 $("#txtIssuedQty"+count).val(' ');
		
		document.getElementById("accept" + count).disabled = true;
		 $("#accept"+ count).css('background-color','264d00');*/
	}
	 
//alert(count);
return false;
}

function deductStock() {
	var txtMRNID = $("#txtMRNID").val();
	var txtReceiverName = $("#txtReceiverName").val();
	var txtMrnId = $("#txtmaterialReqaestNoteListDocId").val();
	var txtMRNSubInventoryName = $("#txtMRNLocationName").val();
	var subInventoryId = $("#subInventoryId").val();
	
	
	var materiallist = {
			ltInventoryBatchStockDTO : []
	};

	var p = 1;
	for ( var i = 1; i <= txtMRNID; i++) {
		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			var txtIssuedQty = $("#txtIssuedQty" + i).val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();
			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i).val();
			var txtslaveId = $("#txtinventoryMaterailRequestNote" + i).val();
			
			var itemQauntity = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
			var Totalquntity = parseInt(itemQauntity) + parseInt(txtIssuedQty);
			
			materiallist.ltInventoryBatchStockDTO.push({

				inv_mrn_item_info_issue_slave_item_name:txtMRNItemName,
				inv_item_code:txtMRNItemcodeId,
				inv_issue_qty:txtIssuedQty,
				inv_mrn_item_info_issue_carrier_name:txtReceiverName,
				inv_mrn_item_info_slave_id:txtslaveId,
				inv_mrn_id:txtMrnId,
				inv_mrn_item_info_issue_slave_subinventory:txtMRNSubInventoryName,
				inv_item_qty:Totalquntity,
				inv_mrn_item_info_issue_slave_pending_item_qty:itemQauntity,
				inv_mrn_item_info_issue_slave_item_qty:Totalquntity,
				inv_subinventory_id:subInventoryId,
			});
		}
		p++;
	}

	var li = materiallist.ltInventoryBatchStockDTO.length;
	 if(li == 0)
		{
		return false;
		}

	materiallist = JSON.stringify(materiallist);
	var inputs = [];
	// General Info
	inputs.push("materiallist=" + materiallist);
	inputs.push('action=UpdateBatchStockQtyDetails');
	
	/*inputs.push('ItemCode=' + txtMRNItemcodeId);
	inputs.push('itemName=' + txtMRNItemName);
	inputs.push('txtReceiverName=' + txtReceiverName);
	inputs.push('txtslaveId=' + txtslaveId);
	inputs.push('txtMrnId=' + txtMrnId);
	inputs.push('txtMRNSubInventoryName=' + txtMRNSubInventoryName);
	inputs.push('Totalquntity=' + Totalquntity);
	inputs.push('ItempendingQty=' + itemQauntity);*/
	
	 
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
					/*ajaxResponse = r;
					alert("Record Updated Successfully..!");
					$('#MaterialRequestNoteList').removeClass('fade');
					$('#MaterialRequestNoteList').modal('hide');
					window.location
							.replace("inventory_Material_Request_Note_List.jsp");*/
				}
			});
	 

}


function setSessionvalue() {
	
	var txtMRNID = $("#txtMRNID").val();
	var txtReceiverName = $("#txtReceiverName").val();
	var txtMrnId = $("#txtmaterialReqaestNoteListDocId").val();
	var txtMRNSubInventoryName = $("#txtMRNLocationName").val();
	var materiallistforSession = {
			ltInventoryBatchStockDTO : []
	};
	var p = 1;
	for ( var i = 1; i <= txtMRNID; i++) {
		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			var txtIssuedQty = $("#txtIssuedQty" + i).val();
			var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();
			var txtMRNItemName = $("#txtinventoryMaterailRequestNoteItemcode_" + i).val();
			var txtslaveId = $("#txtinventoryMaterailRequestNote" + i).val();
			
			var itemQauntity = $("#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
			var Totalquntity = parseInt(itemQauntity) + parseInt(txtIssuedQty);
			
			materiallistforSession.ltInventoryBatchStockDTO.push({

				inv_mrn_item_info_issue_slave_item_name:txtMRNItemName,
				inv_item_code:txtMRNID,
				inv_issue_qty:txtIssuedQty,
				inv_mrn_item_info_issue_carrier_name:txtReceiverName,
				inv_mrn_item_info_slave_id:txtslaveId,
				inv_mrn_id:txtMrnId,
				inv_mrn_item_info_issue_slave_subinventory:txtMRNSubInventoryName,
				inv_item_qty:Totalquntity,
				inv_mrn_item_info_issue_slave_pending_item_qty:itemQauntity,
				inv_mrn_item_info_issue_slave_item_qty:Totalquntity,
			});
		}
		p++;
	}
	
	var li = materiallistforSession.ltInventoryBatchStockDTO.length;
	 if(li == 0)
		{
		 $('#MaterialRequestNoteList').removeClass('fade');
		 $('#MaterialRequestNoteList').modal('hide');
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
					$('#MaterialRequestNoteList').removeClass('fade');
					$('#MaterialRequestNoteList').modal('hide');
					window.location.reload("inventory_Material_Request_Note_List.jsp");
				}	
			});	
}