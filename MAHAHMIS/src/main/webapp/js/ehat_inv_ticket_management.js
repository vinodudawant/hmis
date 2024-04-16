function getAllAssetTicketsComplaintsData(){
	jQuery.ajax({
		async : true,
		type : 'POST',
		url : 'ehat/complaintsM/getAllAssetComplaintsData',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setAllAssetTicketsComplaintsData(r);
		}
	});
}

function setAllAssetTicketsComplaintsData(r) {
	var htm = "";
	var index = 1;
	if(r.lstAssetComplaintMasterDto.length == 0){
		$("#assetTicketManagementTableBodyId").html("");
		alert("No Data Found...!");
	}
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
				}else{
					htm = htm	+ ' <td class="col-md-1 center">NA</td>';	
				}
				
				if(r.lstAssetComplaintMasterDto[i].complaintHospDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintHospDeptName !="--Select Hospital Dept--"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintHospDeptName
					+ '</td>';
				}else{
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
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" data-toggle="modal" data-target="#assetTicketManagementModuleModal" data-name="approvedMRN" onclick=editAssetTicketManagement('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETTICKET")><i class="fa fa-edit"></i></button></td>'+
			    + '</tr>';
		index++;
	$("#assetTicketManagementTableBodyId").html(htm);
}
}


function getAllProcessedComplaintsDataReport(){
	jQuery.ajax({
		async : true,
		type : 'POST',
		url : 'ehat/complaintsM/getAllProcessedComplaintsDataReport',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setAllProcessedComplaintsDataReport(r);
		}
	});
}

function setAllProcessedComplaintsDataReport(r) {
	var htm = "";
	var index = 1;
	if(r.lstAssetComplaintMasterDto.length == 0){
		$("#assetTicketManagementTableBodyIdReport").html("");
		alert("No Data Found...!");
	}
	for ( var i = 0; i < r.lstAssetComplaintMasterDto.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDate(r.lstAssetComplaintMasterDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getTimeReport(r.lstAssetComplaintMasterDto[i].createdDateTime)
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
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].complaintBatchNo
				+ '</td>';
				if(r.lstAssetComplaintMasterDto[i].serialNo !=null){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].serialNo
					+ '</td>';
				}else {
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				if(r.lstAssetComplaintMasterDto[i].complaintDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintDeptName !="--Select Department--"){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintDeptName
					+ '</td>';
				}else {
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				if(r.lstAssetComplaintMasterDto[i].complaintHospDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintHospDeptName !="--Select Hospital Dept--"){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintHospDeptName
					+ '</td>';
				}else {
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				
				if(r.lstAssetComplaintMasterDto[i].location !=null){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].location
					+ '</td>';
				}else {
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].complainType
				+ '</td>';
				if(r.lstAssetComplaintMasterDto[i].description !=null){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].description
					+ '</td>';
				}else {
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				
				htm = htm  + ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].priority
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].rateOfInconvenience
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].urgent
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].ticketStatus
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTime(r.lstAssetComplaintMasterDto[i].updatedDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].userName
				+ '</td>'
			    + '</tr>';
		index++;
	$("#assetTicketManagementTableBodyIdReport").html(htm);
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
// this is added by vishnu for time 
function getTimeReport(date) {
	var date1;
	var formattedDate = new Date(date);
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = + hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return date1;
}

function getDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	return datee;
}

function assetTicketManagementSlaveTableByPlusButton(index){
	var newid = index - 1;
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-"  + currentdate.getDate() + "  " + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var previousRaisedBy = $("#raisedByAssetTicketManagementSlaveId"+newid).val();
	var commentAssetTicketManagementSlaveId = $("#commentAssetTicketManagementSlaveId"+newid).val();
	if(commentAssetTicketManagementSlaveId == null || commentAssetTicketManagementSlaveId == ""){
		alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
		return false;
	}
	var tbody = "<tr id='assetComplaintSlave"+index+"' class='newAdded'>"
	+ "<td class='col-md-1 center' style='display:none'><input type='text' id='assetTicketManagementSlaveId"+index+"' value='0'></td>"
	+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
	+ "<td class='col-md-3 center'><input type='text' id='assetTicketManagementSlaveDateId"+index+"' value='"+datetime+"'  readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='raisedByAssetTicketManagementSlaveId"+index+"' value='"+previousRaisedBy+"'  readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><textarea style='width:100%;' type='text' id='commentAssetTicketManagementSlaveId"+index+"' class='form-control input-SmallText' /> </td>"
	+ "</tr>";
	$("#assetTicketManagementSlaveTBodyId").append(tbody);
}

function editAssetTicketManagement(id,callFrom){
	var raisedBy = $("#userNameId").val();
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-"  + currentdate.getDate() + "  " + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var inputs = [];
	var index = 1;
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ticketManagementM/editAssetTicketManagement",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			if(callFrom == "ASSETCOMPLAINT"){
				$("#plusMinusButtonDivIdGeneratedMrn").hide();
				$("#saveAssetTicketManagement").hide();
			var eleman = document.getElementById("ticketStatusManagementId");
		    eleman.setAttribute("disabled", true);
			}else{
				$("#plusMinusButtonDivIdGeneratedMrn").show();
				$("#saveAssetTicketManagement").show();
			}
			$("#assetTicketManagementMasterId").val(r.id);
			getAllAssetCategory();
			$('#productCategoryAssetTicketId').select2('val',r.productCategoryId);
			//getCategoryWiseAssetName(r.productCategoryId);
			getAllItemInvAndSubInv();
			$('#assetNameAssetTicketId').select2('val',r.assetId);
			getAssetWiseSerialNumber(r.assetId);
			$('#serialNumberAssetTicketId').select2('val',r.serialNo);
			$("#complainTypeAssetTicketId").val(r.complainType);
			$("#contactNoAssetTicketId").val(r.complainantContactNo);
			$("#locationAssetTicketId").val(r.location);
			$("#descriptionAssetTicketId").val(r.description);
			$("#rateAssetTicketId").val(r.rateOfInconvenience);
			$("#priorityAssetTicketId").val(r.priority);
			$("#ticketStatusManagementId").val(r.ticketStatus);
			$("#productWarrantyTicketSpanTagId").text(r.warrantyStatus);
			$("#deptNameAssetTicketId").val(r.complaintDeptId);
			$("#hopsDeptNameAssetTicketId").val(r.complaintHospDeptId);
			$("#deptClosedTicketId").val(r.complaintDeptId);
			$("#hospitalDeptClosedTicketId").val(r.complaintHospDeptId);
			getAllBatchNOInvAndSubInv(r.assetId)
			$('#batchNumberAssetTicketId').select2('val',r.complaintBatchMasterId);
			$('#batchNumberClosedTicketId').select2('val',r.complaintBatchMasterId);
			
			if(r.urgent !== "No" ){
				$('#urgencyAssetTicketId').prop('checked', true);
				$("#urgencyAssetTicketId").val(r.urgent);
			}else{
				$("#urgencyAssetTicketId").val(r.urgent);
				$('#urgencyAssetTicketId').prop('checked', false);
			}
			if(r.lstAssetComplaintSlaveDtos.length == 0){
				if(callFrom == "ASSETTICKET"){
				var tbody = "<tr id='assetComplaintSlave"+index+"' class='newAdded'>"
				+ "<td class='col-md-1 center' style='display:none'><input type='text' id='assetTicketManagementSlaveId"+index+"' value='0'></td>"
				+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
				+ "<td class='col-md-1 center'><input type='text' id='assetTicketManagementSlaveDateId"+index+"' value='"+datetime+"'  readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-1 center'><input type='text' id='raisedByAssetTicketManagementSlaveId"+index+"' value='"+raisedBy+"'  readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-1 center'><textarea style='width:100%;' type='text' id='commentAssetTicketManagementSlaveId"+index+"' class='form-control input-SmallText' /> </td>"
				+ "</tr>";
				$("#assetTicketManagementSlaveTBodyId").html(tbody);
				}

			}
			else{
				for(var i = 1; i<= r.lstAssetComplaintSlaveDtos.length;i++){
					var tbody = "<tr id='assetComplaintSlave"+index+"' class='newAdded'>"
					+ "<td class='col-md-1 center' style='display:none'><input type='text' id='assetTicketManagementSlaveId"+index+"' value='"+r.lstAssetComplaintSlaveDtos[i-1].id+"'></td>"
					+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
					+ "<td class='col-md-1 center'><input type='text' id='assetTicketManagementSlaveDateId"+index+"' value='"+r.lstAssetComplaintSlaveDtos[i-1].createdSlaveDate+"' readonly class='form-control input-SmallText'> </td>"
					+ "<td class='col-md-1 center'><input type='text' id='raisedByAssetTicketManagementSlaveId"+index+"' value='"+r.lstAssetComplaintSlaveDtos[i-1].raisedBy+"' readonly class='form-control input-SmallText'> </td>"
					if(callFrom == "ASSETTICKET"){
				    tbody = tbody + "<td class='col-md-1 center'><textarea style='width:100%;' disabled type='text' id='commentAssetTicketManagementSlaveId"+index+"' class='form-control input-SmallText'>"+r.lstAssetComplaintSlaveDtos[i-1].comment+"</textarea> </td>"
					}
					else{
					tbody = tbody + "<td class='col-md-1 center'><textarea style='width:100%;'  disabled type='text' id='commentAssetTicketManagementSlaveId"+index+"' class='form-control input-SmallText'>"+r.lstAssetComplaintSlaveDtos[i-1].comment+"</textarea> </td>"
					}
					+ "</tr>";
					index++;
					$("#assetTicketManagementSlaveTBodyId").append(tbody);
					
				}
			}
		}
		
	});
}


function saveAssetTicketManagement(){
	var productCategoryId = $("#productCategoryAssetTicketId option:selected").val();
	var productCategoryValue = $("#productCategoryAssetTicketId option:selected").text();
	var assetNameId = $("#assetNameAssetTicketId option:selected").val();
	var assetNameValue = $("#assetNameAssetTicketId option:selected").text();
	var serialNo = $("#serialNumberAssetTicketId option:selected").val();
	var complain = $("#complainTypeAssetTicketId option:selected").val();
	var complainantContactNo = $("#contactNoAssetTicketId").val();
	var location = $("#locationAssetTicketId").val();
	var description = $("#descriptionAssetTicketId").val();
	var rateOfInconvenience = $("#rateAssetTicketId option:selected").val();
	var priority = $("#priorityAssetTicketId option:selected").val();
	var urgent = $("#urgencyAssetTicketId").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var id = $("#assetTicketManagementMasterId").val();
	var ticketStatus = $("#ticketStatusManagementId").val();
	var warrantyStatus = $("#productWarrantyTicketSpanTagId").text();
	var raisedBy = $("#userNameId").val();
	
	//this is added by Vishnu
	var batchId = $("#batchNumberAssetTicketId option:selected").val();
	var batchName = $("#batchNumberAssetTicketId option:selected").text();
	var hospDeptId = $("#hopsDeptNameAssetTicketId option:selected").val();
	var hospDeptName = $("#hopsDeptNameAssetTicketId option:selected").text();
	var deptId = $("#deptNameAssetTicketId option:selected").val();
	var deptName = $("#deptNameAssetTicketId option:selected").text();	
	
	if (productCategoryValue == 0 || productCategoryValue == "" || productCategoryValue == null || productCategoryValue == undefined || productCategoryValue == "undefined") {
		alert("please select product category first..!!");
		$("#productCategoryAssetComplaintId").focus();
		return false;
	}
	
	if (assetNameValue == 0 || assetNameValue == "" || assetNameValue == null || assetNameValue == undefined || assetNameValue == "undefined") {
		alert("please select asset name first..!!");
		$("#assetNameAssetComplaintId").focus();
		return false;
	}
	
	/*if (serialNo == 0 || serialNo == "" || serialNo == null || serialNo == undefined || serialNo == "undefined") {
		alert("please select serial number first..!!");
		$("#serialNumberAssetComplaintId").focus();
		return false;
	}*/
	
	var assetTicketManagementSlaveDetails = {
			lstAssetComplaintSlaveDto : []
		};
	
	
	var rowsAssetTicketManagementSlave = $('#assetTicketSlaveTableId tbody tr.newAdded').length;
	
	for ( var i = 1; i <= rowsAssetTicketManagementSlave; i++) {
		var assetTicketManagementSlaveId = $("#assetTicketManagementSlaveId" + i).val();
		var assetTicketManagementSlaveDate = $("#assetTicketManagementSlaveDateId" + i).val();
		var raisedByAssetTicketManagementSlave = $("#raisedByAssetTicketManagementSlaveId" + i).val();
		var commentAssetTicketManagementSlave = $("#commentAssetTicketManagementSlaveId" + i).val();
		if(commentAssetTicketManagementSlave == ""){
			alert("Please Fill Slave Table Required Details Properly..!!");
			return false;
		}
		setAssetTicketManagementSlaveList(assetTicketManagementSlaveDetails,assetTicketManagementSlaveId,
				assetTicketManagementSlaveDate,raisedByAssetTicketManagementSlave,commentAssetTicketManagementSlave);
	}
	assetTicketManagementSlaveDetails = JSON.stringify(assetTicketManagementSlaveDetails);
	
	var inputs = [];
	inputs.push('id=' + id);
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
	inputs.push('assetTicketManagementSlaveDetails='+ assetTicketManagementSlaveDetails);
	
	//this is added by Vishnu
	inputs.push('complaintBatchMasterId=' + batchId);
	inputs.push('complaintBatchNo=' + batchName);
	inputs.push('complaintHospDeptId=' + hospDeptId);
	inputs.push('complaintHospDeptName=' + hospDeptName);
	inputs.push('complaintDeptId=' + deptId);
	inputs.push('complaintDeptName=' + deptName);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ticketManagementM/saveAssetTicketManagement",
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

/**
 * 
 * @param assetTicketManagementSlaveDetails
 * @param assetTicketManagementSlave
 * @param assetTicketManagementSlaveDate
 * @param raisedByAssetTicketManagementSlave
 * @param commentAssetTicketManagementSlave
 */
function setAssetTicketManagementSlaveList(assetTicketManagementSlaveDetails,assetTicketManagementSlaveId,
		assetTicketManagementSlaveDate,raisedByAssetTicketManagementSlave,commentAssetTicketManagementSlave){
	assetTicketManagementSlaveDetails.lstAssetComplaintSlaveDto.push({
		id:assetTicketManagementSlaveId,
		createdSlaveDate:assetTicketManagementSlaveDate,
		raisedBy:raisedByAssetTicketManagementSlave,
		comment:commentAssetTicketManagementSlave
	});
}

function refreshAssetTicketManagementDetails(){
	$("#productCategoryAssetTicketId").val(0);
	$("#assetNameAssetTicketId").val(0);
	$("#serialNumberAssetTicketId").val(0);
	$("#complainTypeAssetTicketId").val(0);
	$("#contactNoAssetTicketId").val("");
	$("#locationAssetTicketId").val("");
	$("#descriptionAssetTicketId").val("");
	$("#rateAssetTicketId").val(0);
	$("#priorityAssetTicketId").val(0);
	$("#urgencyAssetTicketId").val("No");
	$("#ticketStatusManagementId").val(0);
	
	var tableHeaderRowCount = 1;
	var table = document.getElementById('assetTicketSlaveTableId');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

function getClosedTicketsRecords(){
	jQuery.ajax({
		async : true,
		type : 'POST',
		url : 'ehat/complaintsM/getClosedComplaintsRecords',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setClosedTicketsData(r);
		}
	});
}

function setClosedTicketsData(r) {
	var htm = "";
	var index = 1;
	if(r.lstAssetComplaintMasterDto.length == 0){
		$("#assetClosedTicketManagementTableBodyId").html("");
		alert("No Data Found...!");
	}
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
				}else{
					htm = htm	+ ' <td class="col-md-1 center">NA</td>';	
				}
				
				if(r.lstAssetComplaintMasterDto[i].complaintHospDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintHospDeptName !="--Select Hospital Dept--" && r.lstAssetComplaintMasterDto[i].complaintHospDeptName !="--Select Hospital Department--"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintHospDeptName
					+ '</td>';
				}else{
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
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-info" data-toggle="modal" data-target="#assetTicketManagementModuleModal" data-name="approvedMRN" onclick=editAssetTicketManagement('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-eye"></i></button></td>'+
			    + '</tr>';
		index++;
	$("#assetClosedTicketManagementTableBodyId").html(htm);
}
}

function getClosedComplaintsReports(){
	jQuery.ajax({
		async : true,
		type : 'POST',
		url : 'ehat/complaintsM/getClosedComplaintsReports',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setClosedTicketsDataReports(r);
		}
	});
}

function setClosedTicketsDataReports(r) {
	var htm = "";
	var index = 1;
	if(r.lstAssetComplaintMasterDto.length == 0){
		$("#assetClosedTicketManagementTableBodyIdReports").html("");
		alert("No Data Found...!");
	}
	for ( var i = 0; i < r.lstAssetComplaintMasterDto.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDate(r.lstAssetComplaintMasterDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getTimeReport(r.lstAssetComplaintMasterDto[i].createdDateTime)
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
				if(r.lstAssetComplaintMasterDto[i].complaintBatchNo !=null && r.lstAssetComplaintMasterDto[i].complaintBatchNo !="--Select Batch No--"){
					htm = htm + ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].complaintBatchNo
				+ '</td>';
				}else{
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				if(r.lstAssetComplaintMasterDto[i].serialNo !=null){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].serialNo
					+ '</td>';
				}else{
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				
				if(r.lstAssetComplaintMasterDto[i].complaintDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintDeptName !="--Select Department--"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintDeptName
					+ '</td>';
				}else{
					htm = htm + '<td class="col-md-1 center">NA</td>';
				}
				if(r.lstAssetComplaintMasterDto[i].complaintHospDeptName !=null && r.lstAssetComplaintMasterDto[i].complaintHospDeptName !="--Select Hospital Dept--"  && r.lstAssetComplaintMasterDto[i].complaintHospDeptName!="--Select Hospital Department--"  ){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].complaintHospDeptName
					+ '</td>';
				}else{
					htm = htm + '<td class="col-md-1 center">NA</td>';
				}
				if(r.lstAssetComplaintMasterDto[i].location !=null){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].location
					+ '</td>';
				}else{
					htm = htm + '<td class="col-md-1 center">NA</td>';
				}
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].complainType
				+ '</td>';
				if(r.lstAssetComplaintMasterDto[i].description !=null){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstAssetComplaintMasterDto[i].description
					+ '</td>';
				}else{
					htm = htm + '<td class="col-md-1 center">NA</td>';
				}
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].priority
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].rateOfInconvenience
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].urgent
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].ticketStatus
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTime(r.lstAssetComplaintMasterDto[i].updatedDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].userName
				+ '</td>'
			    + '</tr>';
		index++;
	$("#assetClosedTicketManagementTableBodyIdReports").html(htm);
	}
}

function universalSearchAssetTicketManagement(callFrom){
	var productCategorySearch =  "";
	var assetNameTicketSearch =  "";
	var fromDateTicketSearch =  "";
	var toDateTicketSearch =  "";
	var departmentTicketSearch =  "";
	var hospitalDeptTicketSearch =  "";
	
	if(callFrom == "Others"){
		productCategorySearch =  $.trim($("#productCategoryTicketSearchId").val());
		assetNameTicketSearch =  $.trim($("#assetNameTicketSearchId").val());
		fromDateTicketSearch =  $.trim($("#fromDateTicketSearchId").val());
		toDateTicketSearch =  $.trim($("#toDateTicketSearchId").val());
		departmentTicketSearch =  $.trim($("#assetTicketDepartmentId").val());
		hospitalDeptTicketSearch =  $.trim($("#assetTicketHospitalDeptId").val());
		
	}
	else{
		productCategorySearch =  $.trim($("#productCategoryClosedTicketSearchId").val());
		assetNameTicketSearch =  $.trim($("#assetNameClosedTicketSearchId").val());
		fromDateTicketSearch =  $.trim($("#fromDateClosedTicketSearchId").val());
		toDateTicketSearch =  $.trim($("#toDateClosedTicketSearchId").val());
		departmentTicketSearch =  $.trim($("#assetTicketClosedDepartmentId option:selected").val());
		hospitalDeptTicketSearch =  $.trim($("#assetTicketClosedHospitalDeptId option:selected").val());
	}
	var searchBy = "";
	if (productCategorySearch == "0" && assetNameTicketSearch == "0" && fromDateTicketSearch == "" && toDateTicketSearch == "" && departmentTicketSearch == 0 && hospitalDeptTicketSearch == 0) {
		alert("Please enter something to search");
		return false;
	}
	if(assetNameTicketSearch == 0){
		if ((fromDateTicketSearch != "" && (toDateTicketSearch == "")) || (toDateTicketSearch != "" && (fromDateTicketSearch == ""))) {
			$("#productCategoryTicketSearchId").val(0);
			$("#toDateTicketSearch").val(" ");
			$("#fromDateTicketSearch").val(" ");
			alert("Please select both date to search");
			return false;
		}else{
			searchBy = "byDate";
		}
	}
   else if(assetNameTicketSearch != 0 ){
		if(fromDateTicketSearch == "" && toDateTicketSearch == ""){
			searchBy = "byProductId";
		}else if (fromDateTicketSearch != "" && toDateTicketSearch == "") {
			$("#productCategoryTicketSearchId").val(0);
			$("#assetNameTicketSearchId").val(0);
			$("#toDateTicketSearchId").val("");
			$("#fromDateTicketSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateTicketSearch == "" && toDateTicketSearch != ""){
			$("#productCategoryTicketSearchId").val(0);
			$("#assetNameTicketSearchId").val(0);
			$("#toDateTicketSearchId").val("");
			$("#fromDateTicketSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if((fromDateTicketSearch != "" && toDateTicketSearch != "" && assetNameTicketSearch != 0 && productCategorySearch == 0 )) {
			searchBy = "byProductIdDate";
		}else if((fromDateTicketSearch != "" && toDateTicketSearch != "" && assetNameTicketSearch != 0 && productCategorySearch != 0 )){
			searchBy = "byProductIdCategoryDate";
		}
	}else if(assetNameTicketSearch != 0 &&  productCategorySearch != 0){
		if(fromDateTicketSearch == "" && toDateTicketSearch == ""){
			searchBy = "byProductCategoryAssetName";
		}else if (fromDateTicketSearch != "" && toDateTicketSearch == "") {
			$("#productCategoryTicketSearchId").val(0);
			$("#assetNameTicketSearchId").val(0);
			$("#toDateTicketSearchId").val("");
			$("#fromDateTicketSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateTicketSearch == "" && toDateTicketSearch != ""){
			$("#productCategoryTicketSearchId").val(0);
			$("#assetNameTicketSearchId").val(0);
			$("#toDateTicketSearchId").val("");
			$("#fromDateTicketSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if((fromDateTicketSearch != "" && toDateTicketSearch != "" && assetNameTicketSearch != 0)){
			
			
		}else if((fromDateTicketSearch != "" && toDateTicketSearch != "" && productCategorySearch != 0 && assetNameTicketSearch != 0)) {
			searchBy = "byAll";
		}
	}
	
//	$("#custTypeId").val(custTypeId);
//	$("#custNameId").val(custNameId);
//	$("#fromDate").val(txtFdate);
//	$("#toDate").val(txtTdate);
//	$("#searchBy").val(searchBy);
	
	var inputs = [];
	inputs.push('productCategoryTicket=' + productCategorySearch);
	inputs.push('assetNameTicket=' + assetNameTicketSearch);
	inputs.push('fromDateTicket=' + fromDateTicketSearch);
	inputs.push('toDateTicket=' + toDateTicketSearch);
	inputs.push('department=' + departmentTicketSearch);
	inputs.push('hospitalDept=' + hospitalDeptTicketSearch);
	inputs.push('searchBy=' + searchBy);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ticketManagementM/universalSearchAssetTicketManagement",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(callFrom == "Others"){
			$('#productCategoryTicketSearchId').select2('val',"0");
			$('#assetNameTicketSearchId').select2('val',"0");
			$("#fromDateTicketSearchId").val("");
			$("#toDateTicketSearchId").val("");
			$("#assetTicketDepartmentId").val(0);
			$("#assetTicketHospitalDeptId").val(0);
			setAllAssetTicketsComplaintsData(r);
			setAllProcessedComplaintsDataReport(r);
			}
			else{
			$('#productCategoryClosedTicketSearchId').select2('val',"0");
			$('#assetNameClosedTicketSearchId').select2('val',"0");
			$("#fromDateClosedTicketSearchId").val("");
			$("#toDateClosedTicketSearchId").val("");
			$("#assetTicketDepartmentId").val(0);
			$("#assetTicketHospitalDeptId").val(0);
			setClosedTicketsData(r);
			setClosedTicketsDataReports(r)
			}
		}
	});
}

function getAllBreakdownRecords(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ticketManagementM/getAllBreakdownRecords",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setAllBreakdownRecords(r);
		}
	});
}

function setAllBreakdownRecords(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstAssetComplaintMasterDto.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
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
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].serialNo
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTime(r.lstAssetComplaintMasterDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center" style="display: none">'
				+ r.lstAssetComplaintMasterDto[i].description
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTime(r.lstAssetComplaintMasterDto[i].updatedDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].downtimeHours
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAssetComplaintMasterDto[i].userId
				+ '</td>'
			    + '</tr>';
		index++;
	$("#breakdownRecordsTbodyId").html(htm);
	}
}

