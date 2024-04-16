/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since  : 27-07-2020
 * @codeFor: get all distinct asset category from item master
 ******************************************************************************/
function getAllAssetCategory() {
	jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/complaintsM/getAllAssetCategory",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select class='col-md-12'><option value='0'>--Select Category--</option>";
					for ( var i = 0; i < r.lstItemMaster.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lstItemMaster[i].categoryId + "'>"
								+ r.lstItemMaster[i].categoryType + "</option>";
					}
					divContent = divContent + "</select>";
					//asset complaint field
					$("#productCategoryAssetComplaintId").html(divContent);
					$("#productCategoryAssetComplaintId").select2();
					//asset ticket field
					$("#productCategoryAssetTicketId").html(divContent);
					$("#productCategoryAssetTicketId").select2();
					//asset complaint search
					$("#productCategoryAssetComplaintSearchId").html(divContent);
					$("#productCategoryAssetComplaintSearchId").select2();
					//asset other ticket search
					$("#productCategoryTicketSearchId").html(divContent);
					$("#productCategoryTicketSearchId").select2();
					//asset closed ticket search
					$("#productCategoryClosedTicketSearchId").html(divContent);
					$("#productCategoryClosedTicketSearchId").select2();
					//asset maintenance search
					$("#productCategoryMaintenanceSearchId").html(divContent);
					$("#productCategoryMaintenanceSearchId").select2();
				}
			});
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since  : 27-07-2020
 * @codeFor: get all asset names using category id from item master
 ******************************************************************************/
function getCategoryWiseAssetName(categoryId){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/complaintsM/getCategoryWiseAssetName",
		data : {
			"categoryId" : categoryId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<option value='0'>--Select Asset Name--</option>";
			for (var i = 0; i < r.lstItemMaster.length; i++) {
				divContent = divContent + "<option value='"
						+ r.lstItemMaster[i].id + "'>"
						+ r.lstItemMaster[i].itemName + "</option>";
			}
			//asset complaint field
			$("#assetNameAssetComplaintId").html(divContent);
			$("#assetNameAssetComplaintId").select2();
			//asset ticket field
			$("#assetNameAssetTicketId").html(divContent);
			$("#assetNameAssetTicketId").select2();
			//asset complaint search
			$("#assetNameAssetComplaintSearchId").html(divContent);
			$("#assetNameAssetComplaintSearchId").select2();
			//asset other ticket search
			$("#assetNameTicketSearchId").html(divContent);
			$("#assetNameTicketSearchId").select2();
			//asset closed ticket search
			$("#assetNameClosedTicketSearchId").html(divContent);
			$("#assetNameClosedTicketSearchId").select2();
			//asset maintenance search
			$("#assetNameMaintenanceSearchId").html(divContent);
			$("#assetNameMaintenanceSearchId").select2();
		}
	});
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since  : 27-07-2020
 * @codeFor: get all serial numbers using asset id/item id from item asset maintenance master table
 ******************************************************************************/
function getAssetWiseSerialNumber(assetId){
	 $("#assetItemId").val(assetId);
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/complaintsM/getAssetWiseSerialNumber",
		data : {
			"assetId" : assetId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			checkAssetItemOrNot(assetId);
			var divContent = "";
			divContent = divContent
					+ "<option value='0'>--Select Serial No--</option>";
			for (var i = 0; i < r.lstItemAssetMaintenanceMasterDto.length; i++) {
				divContent = divContent + "<option value='"
						+ r.lstItemAssetMaintenanceMasterDto[i].serialNo + "'>"
						+ r.lstItemAssetMaintenanceMasterDto[i].serialNo + "</option>";
			}
			$("#serialNumberAssetComplaintId").html(divContent);
			$("#serialNumberAssetComplaintId").select2();
			$("#serialNumberAssetTicketId").html(divContent);
			$("#serialNumberAssetTicketId").select2();
			//asset maintenance search
			$("#serialNoMaintenanceSearchId").html(divContent);
			$("#serialNoMaintenanceSearchId").select2();
		}
	});
}

function saveAssetComplaint(){
	var productCategoryId = $("#productCategoryAssetComplaintId option:selected").val();
	var productCategoryValue = $("#productCategoryAssetComplaintId option:selected").text();
	var assetNameId = $("#assetNameAssetComplaintId option:selected").val();
	var assetNameValue = $("#assetNameAssetComplaintId option:selected").text();
	var serialNo = $("#serialNumberAssetComplaintId option:selected").val();
	var complain = $("#complainTypeAssetComplaintId option:selected").val();
	var complainantContactNo = $("#contactNoAssetComplaintId").val();
	var location = $("#locationAssetComplaintId").val();
	var description = $("#descriptionAssetComplaintId").val();
	var rateOfInconvenience = $("#rateAssetComplaintId option:selected").val();
	var priority = $("#priorityAssetComplaintId option:selected").val();
	
	//this is added by Vishnu
	var batchId = $("#batchNoAssetComplaintId option:selected").val();
	var batchName = $("#batchNoAssetComplaintId option:selected").text();
	var hospDeptId = $("#assetComplainantHospitalDeptId option:selected").val();
	var hospDeptName = $("#assetComplainantHospitalDeptId option:selected").text();
	var deptId = $("#assetComplainantDepartmentId option:selected").val();
	var deptName = $("#assetComplainantDepartmentId option:selected").text();	
	
	var urgent = $("#urgencyAssetComplaintId").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var id = $("#assetComplaintMasterId").val();
	var ticketStatus = $("#ticketStatusId").val();
	var raisedBy = $("#userNameId").val();
	var warrantyStatus = $("#productWarrantyComplaintSpanTagId").text();
	
	if (productCategoryId == 0 || productCategoryId == "" || productCategoryId == null || productCategoryId == undefined || productCategoryId == "undefined") {
		alert("please select product category first..!!");
		$("#productCategoryAssetComplaintId").focus();
		return false;
	}
	
	if (assetNameId == 0 || assetNameId == "" || assetNameId == null || assetNameId == undefined || assetNameId == "undefined") {
		alert("please select asset name first..!!");
		$("#assetNameAssetComplaintId").focus();
		return false;
	}
	
	if (batchId == 0 || batchId == "" || batchId == null || batchId == undefined || batchId == "undefined") {
		batchName = "NA";
	}
	
	if($("#assetItemStatusId").val() == 1){
		if (serialNo == 0 || serialNo == "" || serialNo == null || serialNo == undefined || serialNo == "undefined") {
			alert("please select serial number..!!");
			$("#serialNumberAssetComplaintId").focus();
			return false;
		}
	}
	
	if (complain == 0 || complain == "" || complain == null || complain == undefined || complain == "undefined") {
		alert("please select complain type first..!!");
		$("#complainTypeAssetComplaintId").focus();
		return false;
	}
	
	if(description == "" || description == null || description == undefined || description == "undefined"){
		alert("please fill the description first..!!");
		$("#descriptionAssetComplaintId").focus();
		return false;
	}
	
	if (rateOfInconvenience == 0 || rateOfInconvenience == "" || rateOfInconvenience == null || rateOfInconvenience == undefined || rateOfInconvenience == "undefined") {
		alert("please select rate of inconcenince first..!!");
		$("#rateAssetComplaintId").focus();
		return false;
	}
	
	if (priority == 0 || priority == "" || priority == null || priority == undefined || priority == "undefined") {
		alert("please select priority first..!!");
		$("#priorityAssetComplaintId").focus();
		return false;
	}
	
	
	var inputs = [];
	inputs.push('id=' + id);
	
	//this is added by Vishnu
	inputs.push('complaintBatchMasterId=' + batchId);
	inputs.push('complaintBatchNo=' + batchName);
	inputs.push('complaintHospDeptId=' + hospDeptId);
	inputs.push('complaintHospDeptName=' + hospDeptName);
	inputs.push('complaintDeptId=' + deptId);
	inputs.push('complaintDeptName=' + deptName);
	
	inputs.push('productCategoryId=' + productCategoryId);
	inputs.push('productCategoryName=' + productCategoryValue);
	inputs.push('assetId=' + assetNameId);
	inputs.push('assetName=' + assetNameValue);
	inputs.push('serialNo=' + serialNo);
	inputs.push('complainType=' + complain);
	inputs.push('complainantContactNo=' + complainantContactNo);
	inputs.push('location=' + location);
	inputs.push('description=' + description);
	inputs.push('rateOfInconvenience=' + rateOfInconvenience);
	inputs.push('priority=' + priority);
	inputs.push('urgent=' + urgent);
	inputs.push('ticketStatus=' + ticketStatus);
	inputs.push('warrantyStatus=' + warrantyStatus);
	inputs.push('userName=' + raisedBy);
	inputs.push('userId=' + userId);
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/complaintsM/saveAssetComplaint",
		cache : false,
		success : function(r) {
			if (r == 1) {
				alert("Records Saved Sucessfully");
				alertify.success("Records Saved Sucessfully");
				setTimeout(function() {
					window.location.reload();
				}, 300);
				refreshAssetComplaint();

			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
				setTimeout(function() {
					window.location.reload();
				}, 500);
				refreshAssetComplaint();
			} else {
				alertify.error("Oops Some Problem Ocured");
			}

		}
	});
	
}

function checkForPriorityAssetComplaint() {
	var urgencyAssetComplaintId = $('input:checkbox[id=urgencyAssetComplaintId]');
	if (urgencyAssetComplaintId.is(':checked') == true) {
		$("#priorityAssetComplaintId").val("High");
		$("#rateAssetComplaintId").val(10);
		$("#urgencyAssetComplaintId").val("Yes");
	} else {
		$("#priorityAssetComplaintId").val("0");
		$("#rateAssetComplaintId").val("");
	}
}

function refreshAssetComplaint(){
	$('#productCategoryAssetComplaintId').select2('val',0);
	$('#assetNameAssetComplaintId').select2('val',0);
	$('#serialNumberAssetComplaintId').select2('val',0);
	$("#complainTypeAssetComplaintId").val(0);
	$("#contactNoAssetComplaintId").val("");
	$("#locationAssetComplaintId").val("");
	$("#descriptionAssetComplaintId").val("");
	$("#rateAssetComplaintId").val("");
	$("#priorityAssetComplaintId").val(0);
	$("#urgencyAssetComplaintId").val("No");
	$("#assetComplaintMasterId").val(0);
	$("#ticketStatusId").val("OPEN");
	$("#productWarrantyComplaintSpanTagId").text("");
	
}

function changeUrgentStatus() {
	var priority = $("#priorityAssetComplaintId").val();
	if (priority == 'High') {
		$("#urgencyAssetComplaintId").prop('checked', true);
		$("#urgencyAssetComplaintId").val("Yes");
	} else {
		$("#urgencyAssetComplaintId").prop('checked', false);
		$("#urgencyAssetComplaintId").val("No");
	}

}

function getAllAssetComplaintsData(){
	jQuery.ajax({
		async : true,
		type : 'POST',
		url : 'ehat/complaintsM/getAllAssetComplaintsData',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setAllAssetComplaintsData(r);
		}
	});
}

function setAllAssetComplaintsData(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstAssetComplaintMasterDto.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTime(r.lstAssetComplaintMasterDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].userName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].productCategoryName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].assetName
				+ '</td>';
				if(r.lstAssetComplaintMasterDto[i].complaintDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintDeptName !="--Select Department--"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintDeptName
					+ '</td>';
				}else {
					htm = htm	+ ' <td class="col-md-1 center">NA</td>';
				}
				if(r.lstAssetComplaintMasterDto[i].complaintHospDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintHospDeptName !="--Select Hospital Dept--"){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintHospDeptName
					+ '</td>';
				}else {
					htm = htm	+ ' <td class="col-md-1 center">NA</td>';
				}
				
				htm = htm	+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].complainType
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].ticketStatus
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].priority
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].rateOfInconvenience
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].urgent
				+ '</td>'
				if(r.lstAssetComplaintMasterDto[i].ticketStatus != "OPEN"){
					htm = htm + ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" data-toggle="modal" disabled data-target="#assetComplaintModuleModal" onclick=editAssetComplaintsData('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-edit"></i></button></td>'
				}
				else{
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" data-toggle="modal" data-target="#assetComplaintModuleModal" onclick=editAssetComplaintsData('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-edit"></i></button></td>'
				}
				htm = htm +	' <td class="col-md-1 center">'
				+'	<button class="btn btn-xs btn-info" data-toggle="modal" data-target="#assetComplaintViewModuleModal" onclick=editAssetTicketManagement('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-eye"></i></button></td>'
			    + '</tr>';
		index++;
		

		var numberOfRows="";
		var index1=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationAssetComplaint("+index1+");'><a>"+index1+"</a></li>";
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationAssetComplaint("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesAssetComplaint').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#assetComplaintRecordPagination').html(numberOfRows);
		
	$("#assetComplaintTableBodyId").html(htm);
}
}

function getDateTime(date){
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return datee;
}

function editAssetComplaintsData(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/complaintsM/editAssetComplaintsData",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#assetComplaintMasterId").val(r.id);
			getAllAssetCategory();
			$('#productCategoryAssetComplaintId').select2('val',r.productCategoryId);
			///getCategoryWiseAssetName(r.productCategoryId);
			getAllItemInvAndSubInv()
			$('#assetNameAssetComplaintId').select2('val',r.assetId);
			getAssetWiseSerialNumber(r.assetId);
			$('#serialNumberAssetComplaintId').select2('val',r.serialNo);
			
			$("#complainTypeAssetComplaintId").val(r.complainType);
			$("#contactNoAssetComplaintId").val(r.complainantContactNo);
			$("#locationAssetComplaintId").val(r.location);
			$("#descriptionAssetComplaintId").val(r.description);
			$("#rateAssetComplaintId").val(r.rateOfInconvenience);
			$("#priorityAssetComplaintId").val(r.priority);
			$("#ticketStatusId").val(r.ticketStatus);
			$("#productWarrantyComplaintSpanTagId").text(r.warrantyStatus);
			
			// this is added by Vishnu
			
			$("#assetComplainantDepartmentId").val(r.complaintDeptId);
			$("select#assetComplainantHospitalDeptId").val(r.complaintHospDeptId);
			//getItemWiseCategory(r.assetId);
			getAllBatchNOInvAndSubInv(r.assetId);
			$('#batchNoAssetComplaintId').select2('val',r.complaintBatchMasterId);
			
			if(r.urgent !== "No" ){
				$('#urgencyAssetComplaintId').prop('checked', true);
				$('#urgencyAssetComplaintId').val(r.urgent);
			}else if(r.urgent == "No"){
				$('#urgencyAssetComplaintId').prop('checked', false);
				$('#urgencyAssetComplaintId').val(r.urgent);
			}
		}
	});
}

function refreshAssetComplaintViewDetails(){
	$('#productCategoryAssetComplaintId').select2('val',0);
	$('#assetNameAssetComplaintId').select2('val',0);
	$('#serialNumberAssetComplaintId').select2('val',0);
	$("#complainTypeAssetTicketId").val(0);
	$("#contactNoAssetTicketId").val("");
	$("#locationAssetTicketId").val("");
	$("#descriptionAssetTicketId").val("");
	$("#rateAssetTicketId").val(0);
	$("#priorityAssetTicketId").val(0);
	$("#urgencyAssetTicketId").val("No");
	$("#ticketStatusManagementId").val(0);
	$("#assetComplaintMasterId").val(0);
	$("#ticketStatusId").val("OPEN");
	$("#productWarrantyComplaintSpanTagId").text("");
	$('#batchNoAssetComplaintId').select2('val',0);
	$("#assetComplainantDepartmentId").val(0);
	$("#assetComplainantHospitalDeptId").val(0);
	var tableHeaderRowCount = 1;
	var table = document.getElementById('assetTicketSlaveTableId');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

function getClosedComplaintsRecords(){
	jQuery.ajax({
		async : true,
		type : 'POST',
		url : 'ehat/complaintsM/getClosedComplaintsRecords',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setClosedAssetComplaintsData(r);
		}
	});
}

function setClosedAssetComplaintsData(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstAssetComplaintMasterDto.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTime(r.lstAssetComplaintMasterDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].userName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].productCategoryName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].assetName
				+ '</td>';
				if(r.lstAssetComplaintMasterDto[i].complaintDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintDeptName !="--Select Department--"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintDeptName
					+ '</td>';
				}else {
					htm = htm	+ ' <td class="col-md-1 center">NA</td>';
				}
				if(r.lstAssetComplaintMasterDto[i].complaintHospDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintHospDeptName !="--Select Hospital Dept--"){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintHospDeptName
					+ '</td>';
				}else {
					htm = htm	+ ' <td class="col-md-1 center">NA</td>';
				}
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].complainType
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].ticketStatus
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].priority
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].rateOfInconvenience
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].urgent
				+ '</td>'
				+' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-info" data-toggle="modal" data-target="#assetComplaintViewModuleModal" data-name="approvedMRN" onclick=editAssetTicketManagement(' + r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-eye"></i></button></td>'
			    + '</tr>';
		index++;
		
		var numberOfRows="";
		var index1=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationAssetClosedComplaint("+index1+");'><a>"+index1+"</a></li>";
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationAssetClosedComplaint("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesAssetClosedComplaint').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#assetClosedComplaintRecordPagination').html(numberOfRows);
		
	$("#assetClosedComplaintTableBodyId").html(htm);
}
}

function getProductWarrantyComplaint(){
	var productCategoryName = $("#productCategoryAssetComplaintId option:selected").text();
	var assetNameId = $("#assetNameAssetComplaintId option:selected").val();
	var serialNo = $("#serialNumberAssetComplaintId option:selected").val();
	var inputs = [];
	inputs.push('productCategoryName=' + productCategoryName);
	inputs.push('assetNameId=' + assetNameId);
	inputs.push('serialNo=' + serialNo);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/complaintsM/getProductWarrantyComplaint",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r.warrantyStatus == null){
				$("#productWarrantyComplaintSpanTagId").text("No-Status");
			}
			else{
				$("#productWarrantyComplaintSpanTagId").text(r.warrantyStatus);
			}
		}
	});
}

//this is added by Vishnu 23-10-2020
function getAllDepartment(){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptListAll",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var divContent = "";
			divContent = divContent +
				"<option value='0'>--Select Department--</option>";
			 for (var i = 0; i < r.lstDepts.length; i++) {
				divContent = divContent + "<option value='" +
					r.lstDepts[i].deptId + "'  >" +
					r.lstDepts[i].deptName +
					"</option>";
			}
			$("#assetComplainantDepartmentId").html(divContent);
			$("#assetTicketDepartmentId").html(divContent);
			$("#assetTicketClosedDepartmentId").html(divContent);
			$("#deptNameAssetTicketId").html(divContent);
			$("#deptClosedTicketId").html(divContent);
			
		}
	});
}
//this is added by Vishnu 23-10-2020
/*function getAllHospitalDepartment(){
	
	var inputs = [];
	inputs.push('action=fetchHospitalDepartments');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');
			var divContent = "";
			divContent = divContent +
				"<option value='0'>--Select Hospital Dept--</option>";
			for ( var i = 0; i < doctorBean.liDep.length; i++) {
				divContent = divContent + "<option value='" +
					doctorBean.liDep[i].depId + "'  >" +
					doctorBean.liDep[i].depNm +
					"</option>";
			}
			$("#assetComplainantHospitalDeptId").html(divContent);
			$("#assetTicketHospitalDeptId").html(divContent);
			$("#assetTicketClosedHospitalDeptId").html(divContent);
			$("#hopsDeptNameAssetTicketId").html(divContent);
			$("#hospitalDeptClosedTicketId").html(divContent);
		}
	});
}*/

function getAllHospitalDepartment(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/fetchHospitalDepartments",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent +
				"<option value='0'>--Select Hospital Dept--</option>";
			for ( var i = 0; i < r.listDepartments.length; i++) {
				divContent = divContent + "<option value='" +
					r.listDepartments[i].departmentId + "'  >" +
					r.listDepartments[i].departmentName +
					"</option>";
			}
			$("#assetComplainantHospitalDeptId").html(divContent);
			$("#assetTicketHospitalDeptId").html(divContent);
			$("#assetTicketClosedHospitalDeptId").html(divContent);
			$("#hopsDeptNameAssetTicketId").html(divContent);
			$("#hospitalDeptClosedTicketId").html(divContent);
		}
	});
}

// this is by Vishnu for get all inventory and sub inventory item and batch name
function getAllItemInvAndSubInv(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/complaintsM/getAllItemInvAndSubInv",
		error : function() {
			alert('error');
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<option value='0'>--Select Asset Name--</option>";
			for (var i = 0; i < r.lstItemMaster.length; i++) {
				divContent = divContent + "<option value='"
						+ r.lstItemMaster[i].id + "'>"
						+ r.lstItemMaster[i].itemName + "</option>";
			}
			//asset complaint field
			$("#assetNameAssetComplaintId").html(divContent);
			$("#assetNameAssetComplaintId").select2();
			
			$("#assetNameTicketSearchId").html(divContent);
			$("#assetNameTicketSearchId").select2();
			
			$("#assetNameClosedTicketSearchId").html(divContent);
			$("#assetNameClosedTicketSearchId").select2();
			
			$("#assetNameAssetTicketId").html(divContent);
			$("#assetNameAssetTicketId").select2();
		}
	});
}

function getAllBatchNOInvAndSubInv(itemId){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/complaintsM/getAllBatchNOInvAndSubInv",
		data : {
			"itemId" :itemId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<option value='0'>--Select Batch No--</option>";
			for (var i = 0; i < r.lstBatchStockDto.length; i++) {
				 var batchCode = (r.lstBatchStockDto[i].itemBatchCode !=0) ? r.lstBatchStockDto[i].itemBatchCode :"NA";
				divContent = divContent + "<option value='"
						+ r.lstBatchStockDto[i].batchMasterId + "'>"
						+batchCode+ "</option>";
			}
			//asset complaint field
			$("#batchNoAssetComplaintId").html(divContent);
			$("#batchNoAssetComplaintId").select2();
			$("#batchNumberAssetTicketId").html(divContent);
			$("#batchNumberAssetTicketId").select2();
			$("#batchNumberClosedTicketId").html(divContent);
			$("#batchNumberClosedTicketId").select2();
		}
	});
}

function getItemWiseCategory(itemId){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/complaintsM/getItemWiseCategory",
		data : {
			"itemId" : itemId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for (var i = 0; i < r.lstItemMaster.length; i++) {
				$("#productCategoryAssetComplaintId").select2('data', {id: r.lstItemMaster[i].categoryId, text: r.lstItemMaster[i].categoryType});
				$("#productCategoryTicketSearchId").select2('data', {id: r.lstItemMaster[i].categoryId, text: r.lstItemMaster[i].categoryType});
				$("#productCategoryClosedTicketSearchId").select2('data', {id: r.lstItemMaster[i].categoryId, text: r.lstItemMaster[i].categoryType});
			}
		}
	});
}

function getAllBatchNo() {
	jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/complaintsM/getAllBatchNo",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select class='col-md-12'><option value='0'>--Select Batch No--</option>";
					for ( var i = 0; i < r.lstBatchMasterDto.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lstBatchMasterDto[i].id + "'>"
								+ r.lstBatchMasterDto[i].itemBatchCode + "</option>";
					}
					divContent = divContent + "</select>";
					$("#batchNoAssetComplaintId").html(divContent);
					$("#batchNoAssetComplaintId").select2();
				}
			});
}


function checkAssetItemOrNot(itemId){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/complaintsM/checkAssetItemOrNot",
		data : {
			"itemId" : itemId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#assetItemStatusId").val(r.lstItemMaster[0].assetItemStatus);
		}
	});
}

function assetComplaintView(){
	$('#assetComplaintTicketModuleModal').modal('show');
}

function getAssetDetailsByItemIdAndSerialNo(serialNo){
	var itemId = $("#assetItemId").val();
	var inputs = [];
	var index = 1;
	inputs.push('itemId=' + itemId);
	inputs.push('serialNo=' + serialNo);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/getAssetDetailsByItemIdAndSerialNo",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			var tbody = "";
			if(r.itemAssetMaintenanceSlaveDtos.length != 0){
				for(var i = 1; i<= r.itemAssetMaintenanceSlaveDtos.length;i++){
					tbody = tbody +"<tr id='multiTr"+index+"' class='newAdded'>"
					+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
					+ "<td class='col-md-1 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceContract+"</td>"
					+ "<td class='col-md-1 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceDuration+"</td>"
					+ "<td class='col-md-1 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceTimePeriod+"</td>"
					+ "<td class='col-md-1 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].partyName+"</td>"
					+ "<td class='col-md-2 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].serviceCost+" </td>"
					+ "<td class='col-md-2 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceFromDate+" </td>"
					+ "<td class='col-md-2 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceToDate+"</td>"
					+ "<td class='col-md-2 center'>"+r.itemAssetMaintenanceSlaveDtos[i-1].status+"</td>"
					+ "</tr>";
					index++;
					$("#assetMaintenanceDecriptionTBodyId").html(tbody);
				}
			}
			else{
				tbody = tbody + "<tr>"
				+ "<td class='col-md-1 center'></td>"
				+ "<td class='col-md-1 center'></td>"
				+ "<td class='col-md-1 center'></td>"
				+ "<td class='col-md-1 center'></td>"
				+ "<td class='col-md-1 center'>No Details Available</td>"
				+ "<td class='col-md-2 center'></td>"
				+ "<td class='col-md-2 center'></td>"
				+ "<td class='col-md-2 center'></td>"
				+ "<td class='col-md-2 center'></td>"
				+ "</tr>";
				$("#assetMaintenanceDecriptionTBodyId").html(tbody);
			}
		}
		
	});
}


