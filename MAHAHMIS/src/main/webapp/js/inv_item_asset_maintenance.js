/**
 * 
 */
function closeAssetMaintenancePopUp(){
	refreshAssetMaintenance();
	$("#assetModal").modal('hide');
}
/**
 * 
 * @param date
 * @returns
 */
function getDateWithTime(date) {
	
	var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	console.log("Datee >> " + date1);
	return date1;
}
/**
 * 
 * @param date
 * @returns
 */
function getDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
}
/**
 * @author Rohit Sandbhor
 * @since 16-07-2020
 * @comment to get all item asset maintenance data 
 */
function getAllItemAssetMaintenance(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/getAllItemAssetMaintenance",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setItemAssetMaintenanceDataToTable(r);
		}
	});
}
/**
 * @author Rohit Sandbhor
 * @since 16-07-2020
 * @comment to set item asset maintenance data to table
 * @param response
 */
function setItemAssetMaintenanceDataToTable(response){
var htm = "";
var index = 1;
	for (var i = 0; i < response.lstItemAssetMaintenanceMasterDto.length; i++) {
		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center">' +
			index +
			'</td>';
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].id +'</td>';
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemId +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].assetType == "LABEQUIPMENT"){
				htm = htm + ' <td class="col-md-1 center"><span style="color:red;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
			}
			else{
				htm = htm + ' <td class="col-md-1 center"><span style="color:darkorange;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
			}
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].productCategory +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationDeptName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 1){
			
				htm = htm + ' <td class="col-md-1 center">' +getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
			}
			else if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 3){
				htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime) +'</td>';
			}
		
			else{
				htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
			}
			htm = htm + ' <td class="col-md-3 center">' +response.lstItemAssetMaintenanceMasterDto[i].serialNo +'</td>' +
			
			' <td class="col-md-1 center">' +
 				'<button class="btn btn-xs btn-success" data-toggle="modal" id="assetModal" data-target="#assetModal" type="button" onclick=editItemAssetMaintenanceMaster('+response.lstItemAssetMaintenanceMasterDto[i].id+','+response.lstItemAssetMaintenanceMasterDto[i].recordType+',\"'+response.lstItemAssetMaintenanceMasterDto[i].assetType+'\");><i class="fa fa-edit View"></i></button></td>'+
			' <td class="col-md-1 center">' +
			'	<button class="btn btn-xs btn-success" type="button" onclick=getAssetMaintenanceBarCode('+response.lstItemAssetMaintenanceMasterDto[i].id+',\"'+encodeURIComponent(response.lstItemAssetMaintenanceMasterDto[i].serialNo)+'\",\"'+getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime)+'\",\"'+encodeURIComponent(response.lstItemAssetMaintenanceMasterDto[i].assetItemName)+'\",\"'+response.lstItemAssetMaintenanceMasterDto[i].assetItemId+'\",\"'+encodeURIComponent(response.lstItemAssetMaintenanceMasterDto[i].orgFarNo)+'\");><i class="fa fa-barcode"></i></button></td>' +
			' <td class="col-md-1 center">' +
			'	<button class="btn btn-xs btn-danger"  type="button" onclick=deleteAssetMaintenanceDetails('+response.lstItemAssetMaintenanceMasterDto[i].id+');><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
		
		var numberOfRows="";
		var index1=1;
		var count=response.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationAssetMaintenance("+index1+");'><a>"+index1+"</a></li>";
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationAssetMaintenance("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesAssetMaintenance').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#assetMaintenanceRecordPagination').html(numberOfRows);
		
		
		
	}
$("#assetMaintenance").html(htm);
}
/**
 * 
 * @param id
 */
function editItemAssetMaintenanceMaster(id,recordType,assetType){
	if(assetType == "LABEQUIPMENT"){
		document.getElementById("detailsAssetTabId").style.display = "block";
	}else if(assetType == "OTHER"){
		document.getElementById("detailsAssetTabId").style.display = "none";
	}
	$('#descInfoTabId').tab('show');
	var inputs = [];
	var htm = "";
	var index = 1;
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/editItemAssetMaintenanceMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			getLocationAssetMaintenanceDetailsByMasterId(r.id);
			getAssetMaintenanceDetailsTabInfo(r.id);
			if(r.lstItemAssetMaintenanceDocUploadDto === null){
				
			}
			else{
				getDocumentUploadedDetails(r);
			}
			$("#hiddenMasterId").val(r.id);
			$("#assetName").val(r.assetItemName);
			$("#hiddenAssetItemId").val(r.assetItemId);
			$("#hiddenAssetCategoryId").val(r.productCategory);
			$("#manufactureName").val(r.manufactureName);
			$("#partyName").val(r.partyName);
			if(r.assetUnitPrice !=null){
				$("#unitPriceId").val(r.assetUnitPrice);	
			}else{
				$("#unitPriceId").val(r.unitPrice);
			}
			
			$("#hiddenPartyId").val(r.partyMasterId);
			$("#orgFarNoId").val(r.orgFarNo);
			//$("#unitPriceId").val(r.unitPrice);
			$("#purchaseRefId").val(r.purchaseRef);
			$("#hiddenAssetType").val(r.assetType);
			if(recordType == 1){
				$("#purchaseDate").val(r.purchaseDate);
			}else if(recordType == 3){
				$("#purchaseDate").val(r.purchaseDate);	
			}else{
				$("#purchaseDate").val("");	
			}
			$("#assetId").val(r.assetItemId);
			$("#serialNo").val(r.serialNo);
			if(recordType == 1){
			$("#warrantyFromId").val(getDate(r.createdDateTime));
			}
			else if(recordType == 3){
				$("#warrantyFromId").val(getDate(r.updatedDateTime));	
			}
			else{
				$("#warrantyFromId").val("");	
			}
			$("#productWarrantyDurationId").val(r.productWarrantyDuration);
			$("#productWarrantyTimePeriodId").val(r.productWarrantyTimePeriod);
			$("#recordTypeId").val(recordType);
			
			if(r.itemAssetMaintenanceSlaveDtos.length == 0){
				//getMaintenanceContractType("assetMaintenanceContractId"+index);
				getUserName(r.userId,index);
				//getEntryDateTime(index);
				var tbody = "<tr id='multiTr"+index+"' class='newAdded'>"
				+ "<td class='col-md-1 center'><input type='checkbox' class='chkAssetMaintenance' id='checkbox"+index+"' value='"+index+"'></td>"
				+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
				+ "<td class='col-md-1 center' style='display:none'><input type='hidden' id='assetMaintenanceSlaveId"+index+"' value='0'></td>"
				+ "<td class='col-md-1 center'><select style='width: 100px;' id='assetMaintenanceContractId"+index+"' class='form-control input-SmallText '><option value='NA' >--Select Type--</option></select> </td>"
				+ "<td class='col-md-1 center'><input style='width: 100px;' type='text' id='assetMaintenanceDurationId"+index+"' onkeypress='return validateNumOnly(event)'  class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-1 center'><select style='width: 100px;' id='assetMaintenanceTimePeriodId"+index+"' onchange='getToDate("+index+")' class='form-control input-SmallText '><option value='NA' >--Select Type--</option></select></td>"
				+ "<td class='col-md-2 center'><select style='width: 150px;'id='assetMaintenanceServiceProviderId"+index+"' class='form-control input-SmallText '><option value='0' >--Select Service Provider--</option></select></td>"
				+ "<td class='col-md-2 center'><input style='width: 100px;' type='text' id='assetMaintenanceServiceCostId"+index+"' class='form-control input-SmallText ' onkeypress='return validateNumOnly(event)'> </td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceFromDateId"+index+"' onclick='getFromToDate(this.id,"+index+");' class='form-control input-SmallText '> </td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceToDateId"+index+"' onclick='getToDate("+index+")' class='form-control input-SmallText '> </td>"
				+ "<td class='col-md-2 center'><select style='width: 100px;' id='assetMaintenanceStatusId"+index+"' class='form-control input-SmallText '><option value='NA' >--Select Status--</option></select></td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceRemarkId"+index+"' class='form-control input-SmallText '> </td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceAlertDaysId"+index+"' onclick='getAlertDate(this.id,"+index+");' class='form-control input-SmallText '> </td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' readonly='readonly'id='assetMaintenanceRemainingDaysId"+index+"' class='form-control input-SmallText '> </td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' readonly='readonly' id='assetMaintenanceEntryDateTimeId"+index+"' class='form-control input-SmallText' value='"+new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + "-" + ('0' + new Date().getDate()).slice(-2) + " "+ new Date().getHours() + ":" +('0' + new Date().getMinutes()).slice(-2)+ ":" +('0' + new Date().getSeconds()).slice(-2)+"'> </td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' readonly='readonly' type='text' id='assetMaintenanceUserNameId"+index+"' class='form-control input-SmallText '> </td>"
				+ "<td class='col-md-2 center'><input style='width: 150px;' readonly='readonly' type='hidden' id='assetMaintenanceIsActiveId"+index+"' class='form-control input-SmallText '> </td>"
				+ "</tr>";
				$("#itemMaintenanceTableBodyId").html(tbody);
				getAllServiceProvider(index,0);
				getAssetMaintenanceStatus(index,0);
				getMaintenanceContract(index,0);
				getTimePeriod(index,0);
			}
			else{
				$("#installationDateId").val(r.installationDate);
				$("#warrantyToId").val(r.warrantyToDate);
				$("#productWarrantySpanTagId").text(r.warrantyStatus);
				for(var i = 1; i<= r.itemAssetMaintenanceSlaveDtos.length;i++){
					
					var tbody = "<tr id='multiTr"+index+"' class='newAdded'>"
					+ "<td class='col-md-1 center'><input type='checkbox' class='chkAssetMaintenance' id='checkbox"+index+"' value='"+index+"'></td>"
					+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
					+ "<td class='col-md-1 center' style='display:none'><input type='hidden' id='assetMaintenanceSlaveId"+index+"' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].id+"'></td>"
					+ "<td class='col-md-1 center'><select style='width: 100px;' id='assetMaintenanceContractId"+index+"' class='form-control input-SmallText '><option value='NA' >--Select Type--</option></select> </td>"
					+ "<td class='col-md-1 center'><input style='width: 100px;' type='text' id='assetMaintenanceDurationId"+index+"' onkeypress='return validateNumOnly(event)' class='form-control input-SmallText' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceDuration+"'> </td>"
					+ "<td class='col-md-1 center'><select  style='width: 100px;' id='assetMaintenanceTimePeriodId"+index+"' onchange='getToDate("+index+")' class='form-control input-SmallText '></select></td>"
					+ "<td class='col-md-1 center'><select  style='width: 100px;' id='assetMaintenanceServiceProviderId"+index+"' class='form-control input-SmallText '><option value='0' >--Select Service Provider--</option></select></td>"
					+ "<td class='col-md-2 center'><input style='width: 100px;' type='text' id='assetMaintenanceServiceCostId"+index+"' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].serviceCost+"'> </td>"
					+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceFromDateId"+index+"' onclick='getFromToDate(this.id,"+index+");' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceFromDate+"' > </td>"
					+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceToDateId"+index+"' onclick='getToDate("+index+")' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceToDate+"' > </td>"
					+ "<td class='col-md-2 center'><select style='width: 100px;' id='assetMaintenanceStatusId"+index+"' class='form-control input-SmallText '><option value='NA' >--Select Status--</option></select></td>"
					+ "<td class='col-md-2 center'><input type='text' style='width: 150px;' id='assetMaintenanceRemarkId"+index+"' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].remark+"'> </td>"
					+ "<td class='col-md-2 center'><input type='text' style='width: 150px;' id='assetMaintenanceAlertDaysId"+index+"' onclick='getAlertDate(this.id,"+index+");' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].alertDate+"'> </td>"
					+ "<td class='col-md-2 center'><input type='text' style='width: 150px;' readonly='readonly' id='assetMaintenanceRemainingDaysId"+index+"' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].remainingDays+"'> </td>"
					+ "<td class='col-md-2 center'><input type='text' style='width: 150px;' readonly='readonly' id='assetMaintenanceEntryDateTimeId"+index+"' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].entryDateTime+"'> </td>"
					+ "<td class='col-md-2 center'><input type='text' style='width: 150px;' readonly='readonly' id='assetMaintenanceUserNameId"+index+"' class='form-control input-SmallText ' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].userName+"'> </td>"
					+ "<td class='col-md-2 center'><input style='width: 150px;' readonly='readonly' type='hidden' id='assetMaintenanceIsActiveId"+index+"' class='form-control input-SmallText' value='"+r.itemAssetMaintenanceSlaveDtos[i-1].isActive+"'> </td>"
					+ "</tr>";
					
					index++;
					$("#itemMaintenanceTableBodyId").append(tbody);
					getAssetMaintenanceStatus(i,r);
					getAllServiceProvider(i,r);
					getMaintenanceContract(i,r);
					getTimePeriod(i,r);
				}
				
			  /*  var unitId = $("#unitId").val();
				var inputs = [];
				inputs.push('unitId=' + unitId);
				var str = inputs.join('&');
				jQuery.ajax({
					async : false,
					type : "POST",
					url : "ehat/inventoryAssetMaintenance/getMaintenanceContractType",
					data : str + "&reqType=AJAX",
					error : function() {
						alert('error');
					},
					success : function(res) {
						var htm="<option value='0'>--Select--</option>";
		        	    for ( var i = 0; i < res.lstMaintenanceContractMasterDto.length; i++){    
		        	        htm = htm + "<option value='"+res.lstMaintenanceContractMasterDto[i].id+"'>"+res.lstMaintenanceContractMasterDto[i].maintenanceType+"</option>";
		        	    }
		        	    for ( var i = 1; i <= r.itemAssetMaintenanceSlaveDtos.length; i++) {
		        	    	  $("#assetMaintenanceContractId"+i).html(htm);
				        	  $("#assetMaintenanceContractId" +i).val(r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceContract);
				        	  $("#assetMaintenanceTimePeriodId"+i).val(r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceTimePeriod);
		        	    }
					}
				});*/
				
			}
		}
		
	});
	
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 16-07-2020
 * @codeFor :getMaintenanceContractType Detail on asset maintenance tab
 ******************************************************************************/
function getMaintenanceContractType(selectId) {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryAssetMaintenance/getMaintenanceContractType",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setMaintenanceContractType(r, selectId);
		}
	});
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 16-07-2020
 * @codeFor :setMaintenanceContractType Detail on asset maintenance tab
 ******************************************************************************/
function setMaintenanceContractType(r, selectId) {
	var htm = "<option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstMaintenanceContractMasterDto.length; i++) {
		htm = htm + "<option value='" + r.lstMaintenanceContractMasterDto[i].id + "'>"
				+ r.lstMaintenanceContractMasterDto[i].maintenanceType + "</option>";
	}
	$("#" + selectId).html(htm);
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 16-07-2020
 * @param inputID
******************************************************************************/
function getFromToDate(inputID) {
	new JsDatePick({
		useMode : 2,
		target : inputID,
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		dateFormat : "%Y-%m-%d",
		imgPath : "../img/",
		weekStartDay : 1,
	});
}
/**
 * 
 * @param index
 */
function getToDate(index){
	var duration = document.getElementById("assetMaintenanceDurationId"+index).value;
	var timePeriod = document.getElementById("assetMaintenanceTimePeriodId"+index).value;
	var fromDate = document.getElementById("assetMaintenanceFromDateId"+index).value;
	if(fromDate == ""){
		alert('Please select from date');
		return false;
	}
	
	if(timePeriod == "Year"){
		var oneYearFromNow = new Date(fromDate);
		year = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + parseInt(duration));
		$("#assetMaintenanceToDateId"+index).val(getDate(year));
	}
	if(timePeriod == "Month"){
		var oneYearFromNow = new Date(fromDate);
		month =  oneYearFromNow.setMonth(oneYearFromNow.getMonth()+ parseInt(duration));
		$("#assetMaintenanceToDateId"+index).val(getDate(month));
	}
	if(timePeriod == "Days"){
		var oneYearFromNow = new Date(fromDate);
		days =  oneYearFromNow.setDate(oneYearFromNow.getDate()+ parseInt(duration));
		$("#assetMaintenanceToDateId"+index).val(getDate(days));
	}
	
	if($("#assetMaintenanceToDateId"+index).val() !=""){
		var dayRemaining = new Date($("#assetMaintenanceToDateId"+index).val());
		var currentDate = new Date();
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		const firstDate = dayRemaining;
		const secondDate = currentDate;
		const diffDays = Math.round(Math.sign((firstDate - secondDate) / oneDay));
		const diffVal = Math.round(Math.abs((firstDate - secondDate) / oneDay));
		
		if(diffDays <=0){
			$("#addNewContract").show();
			$("#assetMaintenanceStatusId"+index).val("Expired");
			$("#assetMaintenanceRemainingDaysId"+index).val(-diffVal);
			$("#assetMaintenanceIsActiveId"+index).val(1);
		}else{
			$("#addNewContract").hide();
			$("#assetMaintenanceStatusId"+index).val("Active");	
			$("#assetMaintenanceRemainingDaysId"+index).val(diffVal);
			$("#assetMaintenanceIsActiveId"+index).val(0);
		}
	}
	
}

function getAlertDate(inputID){
		new JsDatePick({
			useMode : 2,
			target : inputID,
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			dateFormat : "%Y-%m-%d",
			imgPath : "../img/",
			weekStartDay : 1,
		});
}
/**
 * 
 * @param index
 */
function getAssetMaintetBodyByPlusButton(index){
	
	var newid = index - 1;
	var previousMaintenanceContractValue = $("#assetMaintenanceContractId"+newid).val();
	if(previousMaintenanceContractValue == null || previousMaintenanceContractValue == "" || previousMaintenanceContractValue == 0){
		alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
		return false;
	}
	getUserName(0,index);
	//getEntryDateTime(index);
	var tbody = "<tr id='multiTr"+index+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox' class='chkAssetMaintenance' id='checkbox"+index+"' value='"+index+"'></td>"
	+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
	+ "<td class='col-md-1 center' style='display:none'><input type='hidden' id='assetMaintenanceSlaveId"+index+"' value='0'></td>"
	+ "<td class='col-md-1 center'><select style='width: 100px;' id='assetMaintenanceContractId"+index+"' class='form-control input-SmallText '><option value='NA' >--Select Type--</option></select> </td>"
	+ "<td class='col-md-1 center'><input style='width: 100px;' type='text' id='assetMaintenanceDurationId"+index+"' onkeypress='return validateNumOnly(event)' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><select style='width: 100px;' id='assetMaintenanceTimePeriodId"+index+"' onchange='getToDate("+index+")' class='form-control input-SmallText '><option value='NA' >--Select Type--</option></select></td>"
	+ "<td class='col-md-1 center'><select style='width: 100px;'id='assetMaintenanceServiceProviderId"+index+"' class='form-control input-SmallText '><option value='0' >--Select Service Provider--</option></select></td>"
	+ "<td class='col-md-2 center'><input style='width: 100px;' type='text' id='assetMaintenanceServiceCostId"+index+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='assetMaintenanceFromDateId"+index+"' onclick='getFromToDate(this.id,"+index+");' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='assetMaintenanceToDateId"+index+"' onclick='getToDate("+index+")' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-2 center'><select style='width: 100px;' id='assetMaintenanceStatusId"+index+"' class='form-control input-SmallText '><option value='NA' >--Select Status--</option></select></td>"
	+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceRemarkId"+index+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' id='assetMaintenanceAlertDaysId"+index+"' onclick='getAlertDate(this.id,"+index+");' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' readonly='readonly' id='assetMaintenanceRemainingDaysId"+index+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-2 center'><input style='width: 150px;' type='text' readonly='readonly' id='assetMaintenanceEntryDateTimeId"+index+"' class='form-control input-SmallText ' value='"+new Date().getFullYear() + "-" + ('0' + new Date().getMonth() + 1).slice(-2) + "-" + ('0' + new Date().getDate()).slice(-2) + " "+ new Date().getHours() + ":" +('0' + new Date().getMinutes()).slice(-2)+ ":" +('0' + new Date().getSeconds()).slice(-2)+"'> </td>"
	+ "<td class='col-md-2 center'><input style='width: 150px;' readonly='readonly' type='text' id='assetMaintenanceUserNameId"+index+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-2 center'><input style='width: 150px;' readonly='readonly' type='hidden' id='assetMaintenanceIsActiveId"+index+"' class='form-control input-SmallText '> </td>"
	+ "</tr>";
	$("#itemMaintenanceTableBodyId").append(tbody);
	getAllServiceProvider(index,0);
	getAssetMaintenanceStatus(index,0);
	getMaintenanceContract(index,0);
	getTimePeriod(index,0);
}

/**
 * 
 */
function getProductWarrantyToDate(){
	var productWarrantyDuration = document.getElementById("productWarrantyDurationId").value;
	var productWarrantyTimePeriod = document.getElementById("productWarrantyTimePeriodId").value;
	var warrantyFrom = document.getElementById("warrantyFromId").value;
	
	if(productWarrantyTimePeriod == "Year"){
		var oneYearFromNow = new Date(warrantyFrom);
		year = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + parseInt(productWarrantyDuration));
		$("#warrantyToId").val(getDate(year));
	}
	if(productWarrantyTimePeriod == "Month"){
		var oneYearFromNow = new Date(warrantyFrom);
		year = oneYearFromNow.setMonth(oneYearFromNow.getMonth() + parseInt(productWarrantyDuration));
		$("#warrantyToId").val(getDate(year));
	}
	if(productWarrantyTimePeriod == "Days"){
		var oneYearFromNow = new Date(warrantyFrom);
		year = oneYearFromNow.setDate(oneYearFromNow.getDate() + parseInt(productWarrantyDuration));
		$("#warrantyToId").val(getDate(year));
	}
	var currentDate = new Date();
	if(currentDate < year){
		var spanValue = "With-IN";
		 $("#productWarrantySpanTagId").text(spanValue);
	}
	else if(currentDate > year){
		var spanValue = "Expired";
		 $("#productWarrantySpanTagId").text(spanValue);
	}
}

/**
 * 
 */
function saveItemAssetMaintenace(){
	var id = $("#hiddenMasterId").val();
	var hiddeAssetLocationId = $("#hiddeAssetLocationId").val();
	var hiddeAssetDetailsId = $("#hiddeAssetDetailsId").val();
	var assetName = $("#assetName").val();
	var hiddenItemId = $("#hiddenAssetItemId").val();
	var manufactureName = $("#manufactureName").val();
	var partyName = $("#partyName").val();
	var partyId = $("#hiddenPartyId").val();
	//item master id
	var serialNo = $("#serialNo").val();
	var purchaseDate = $("#purchaseDate").val();
	var installationDate = $("#installationDateId").val();
	var purchaseRefId = $("#purchaseRefId").val();
	var unitPriceId =$("#unitPriceId").val();
	var orgFarNoId =$("#orgFarNoId").val();
	
	var warrantyFrom = $("#warrantyFromId").val();
	var warrantyTo = $("#warrantyToId").val();
	var productWarrantyDuration = $("#productWarrantyDurationId").val();
	var productWarrantyTimePeriod = $("#productWarrantyTimePeriodId").val();
	var warrantyStatus = $("#productWarrantySpanTagId").text();
	//location asset maintenance slave
	var inchargeName = $("#inchargeNameId").val();
	var inchargeContactNo = $("#inchargeContactNoId").val();
	var locationRemark = $("#locationRemarkId").val();
	var productCategory = $("#hiddenAssetCategoryId").val();
	// this is added by Vishnu
	var locationDeptName =  $("#assetMaintenanceDepartmentId option:selected").text();
	var locationDeptId = $("#assetMaintenanceDepartmentId option:selected").val();
	if(locationDeptName == "--Select Department--"){
		locationDeptName = "NA";
	}
	var locationHospitalDeptName = $("#assetMaintenanceHospitalDeptId option:selected").text();
	var locationHospitalDeptId = $("#assetMaintenanceHospitalDeptId option:selected").val();
	if(locationHospitalDeptName == "--Select Hospital Dept--"){
		locationHospitalDeptName = "NA";
	}
	
	
	//details slave details
	var machineOwnershipType = $("#machineOwnershipTypeId").val();
	var machineOwner = $("#machineOwner").val();
	var usedFor = $("#usedForId").val();
	var departmentId = $("#departmentId option:selected").val();
	var departmentName = $("#departmentId option:selected").text();
	var testCount = $("#testCountId").val();
	//var assetMaintenanceLocationId = $("#assetMaintenanceLocationId option:selected").val();
	var assetMaintenanceLocationName = $("#assetMaintenanceLocationId").val();
	var reagentNameId ="";
	var reagentName = "";
	$('#reagentNameId option:selected').each(function() {
		if(!reagentNameId == ""){
			reagentNameId = reagentNameId +","+ $(this).val();
		}else{
			reagentNameId = $(this).val();
		}	    
	});
	$('#reagentNameId option:selected').each(function() {
		if(!reagentName == ""){
			reagentName = reagentName +","+ $(this).text();
		}else{
			reagentName = $(this).text();
		}	    
	});
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var recordType = $("#recordTypeId").val();
	var assetType = $("#hiddenAssetType").val();
	var recordTypeUpdated = 3;
	
	// validation for installation date
	if (purchaseDate == "" || purchaseDate == null || purchaseDate == undefined || purchaseDate == "undefined") {
		alert("please enter purchase date");
		$("#purchaseDate").focus();
		return false;
	}
	// validation for installation date
	if (installationDate == "" || installationDate == null || installationDate == undefined || installationDate == "undefined") {
		alert("please enter installation date");
		$("#installationDateId").focus();
		return false;
	}
	//validation for warranty from date
	if (warrantyFrom == "" || warrantyFrom == null || warrantyFrom == undefined || warrantyFrom == "undefined") {
		alert("please enter warranty from date");
		$("#warrantyFromId").focus();
		return false;
	}
	//validation for warranty to date
	if (warrantyTo == "" || warrantyTo == null || warrantyTo == undefined || warrantyTo == "undefined") {
		alert("Warranty to date is empty..!!");
		$("#warrantyToId").focus();
		return false;
	}
	/*//validation for test count
	if ((testCount == "" || testCount == null || testCount == undefined || testCount == "undefined") && assetType == "LABEQUIPMENT") {
		alert("please enter test count...!!");
		$("#testCountId").focus();
		return false;
	}
	//validation for department
	if ((departmentId == 0 || departmentId == "" || departmentId == null || departmentId == undefined || departmentId == "undefined") && assetType == "LABEQUIPMENT") {
		alert("please select department...!!");
		$("#departmentId").focus();
		return false;
	}*/
	
	
	var itemAssetMaintenanceSlaveDetails = {
			lstItemAssetMaintenanceSlaveDto : []
		};
	
	var rowsItemAssetMaintenanceSlave = $('#itemMaintenanceTableId tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsItemAssetMaintenanceSlave; i++) {
		var assetMaintenanceSlaveId = $("#assetMaintenanceSlaveId" + i).val();
		var assetMaintenanceContractId = $("#assetMaintenanceContractId" + i).val();
		var assetMaintenanceContractNameId = $("#assetMaintenanceContractId"+i+" option:selected").val();
		if(assetMaintenanceContractNameId == "NA"){
			alert("Please Fill Slave Table Required Details Properly..!!");
			return false;
		}
		
		var assetMaintenanceDurationId = $("#assetMaintenanceDurationId" + i).val();
		var assetMaintenanceTimePeriodId = $("#assetMaintenanceTimePeriodId"+i+" option:selected").val();
		var assetMaintenanceServiceProviderId = $("#assetMaintenanceServiceProviderId"+i+" option:selected").val();
		var assetMaintenanceServiceProviderName = $("#assetMaintenanceServiceProviderId"+i+" option:selected").text();
		
		if(assetMaintenanceServiceProviderId == 0 && assetMaintenanceServiceProviderName == "--Select Service Provider--"){
			alert("Please Select Service Provider");
			return false;
		}
		
		var assetMaintenanceServiceCostId = $("#assetMaintenanceServiceCostId" + i).val();
		var assetMaintenanceFromDateId = $("#assetMaintenanceFromDateId" + i).val();
		if(assetMaintenanceFromDateId == "" || assetMaintenanceFromDateId == undefined){
			alert("Please Select From Date");
			return false;
		}
		var assetMaintenanceToDateId = $("#assetMaintenanceToDateId" + i).val();
		if(assetMaintenanceToDateId == "" || assetMaintenanceToDateId == undefined){
			alert("Please Select To Date");
			return false;
		}
		var assetMaintenanceStatusId = $("#assetMaintenanceStatusId"+i+" option:selected").val();
		if(assetMaintenanceStatusId == "" || assetMaintenanceStatusId == "NA"){
			alert("Please Select Status");
			return false;
		}
		if(assetMaintenanceStatusId == "Expired"){
			$("#assetMaintenanceIsActiveId" + i).val(1);
		}else{
			$("#assetMaintenanceIsActiveId" + i).val(0);
		}
		var assetMaintenanceRemarkId =  $("#assetMaintenanceRemarkId" + i).val();
		var assetMaintenanceAlertDaysId = $("#assetMaintenanceAlertDaysId" + i).val();
		if(assetMaintenanceAlertDaysId == "" || assetMaintenanceAlertDaysId == undefined){
			alert("Please Select Alert Date");
			return false;
		}
		var assetMaintenanceRemainingDaysId = $("#assetMaintenanceRemainingDaysId" + i).val();
		var assetMaintenanceEntryDateTimeId = $("#assetMaintenanceEntryDateTimeId" + i).val();
		var assetMaintenanceUserNameId = $("#assetMaintenanceUserNameId" + i).val();
		var assetMaintenanceIsActiveId = $("#assetMaintenanceIsActiveId" + i).val();
		

		setAssetMaintenanceSlaveList(itemAssetMaintenanceSlaveDetails,
				assetMaintenanceSlaveId,assetMaintenanceContractId,assetMaintenanceDurationId,assetMaintenanceTimePeriodId,
				assetMaintenanceServiceProviderId,assetMaintenanceServiceProviderName,assetMaintenanceServiceCostId,
				assetMaintenanceFromDateId,assetMaintenanceToDateId,assetMaintenanceStatusId,assetMaintenanceRemarkId,
				assetMaintenanceAlertDaysId,assetMaintenanceRemainingDaysId,assetMaintenanceEntryDateTimeId,assetMaintenanceUserNameId,assetMaintenanceIsActiveId);
	}
	itemAssetMaintenanceSlaveDetails = JSON.stringify(itemAssetMaintenanceSlaveDetails);
	var inputs = [];
	inputs.push("id=" + encodeURIComponent(id));
	inputs.push("assetItemName=" + encodeURIComponent(assetName));	
	inputs.push("assetItemId=" + encodeURIComponent(hiddenItemId));
	inputs.push("manufactureName=" + encodeURIComponent(manufactureName));
	inputs.push("partyName=" + encodeURIComponent(partyName));
	inputs.push("partyMasterId=" + encodeURIComponent(partyId));
	inputs.push("serialNo=" + encodeURIComponent(serialNo));
	inputs.push("installationDate=" + encodeURIComponent(installationDate));
	inputs.push("purchaseDate=" + encodeURIComponent(purchaseDate));
	// this is added by Vishnu
	inputs.push("purchaseRef=" + encodeURIComponent(purchaseRefId));
	inputs.push("unitPrice=" + encodeURIComponent(unitPriceId));
	inputs.push("orgFarNo=" + encodeURIComponent(orgFarNoId));
	
	inputs.push("warrantyFromDate=" + encodeURIComponent(warrantyFrom));
	inputs.push("warrantyToDate=" + encodeURIComponent(warrantyTo));
	inputs.push("productWarrantyDuration=" + encodeURIComponent(productWarrantyDuration));
	inputs.push("productWarrantyTimePeriod=" + encodeURIComponent(productWarrantyTimePeriod));
	inputs.push("warrantyStatus=" + encodeURIComponent(warrantyStatus));
	inputs.push("productCategory=" + encodeURIComponent(productCategory));
	inputs.push("userId=" + encodeURIComponent(userId));
	inputs.push("unitId=" + encodeURIComponent(unitId));
	inputs.push("createdBy=" + encodeURIComponent(userId));
	//item asset maintenance slave
	inputs.push("itemAssetMaintenanceSlaveDetails=" + encodeURIComponent(itemAssetMaintenanceSlaveDetails));
	//location asset maintenance slave
	//inputs.push("locationName=" + encodeURIComponent(locationName));
	inputs.push("inchargeName=" + encodeURIComponent(inchargeName));
	inputs.push("inchargeContactNo=" + encodeURIComponent(inchargeContactNo));
	inputs.push("remark=" + encodeURIComponent(locationRemark));
	//this is added by Vishnu
	inputs.push("locationDeptId=" + encodeURIComponent(locationDeptId));
	inputs.push("locationDeptName=" + encodeURIComponent(locationDeptName));
	inputs.push("locationHospitalDeptId=" + encodeURIComponent(locationHospitalDeptId));
	inputs.push("locationHospitalDeptName=" + encodeURIComponent(locationHospitalDeptName));
	
	inputs.push("assetType=" + encodeURIComponent(assetType));
	
	
	inputs.push("machineOwnershipType=" + encodeURIComponent(machineOwnershipType));
	inputs.push("machineOwner=" + encodeURIComponent(machineOwner));
	inputs.push("usedFor=" + encodeURIComponent(usedFor));
	inputs.push("departmentId=" + encodeURIComponent(departmentId));
	inputs.push("departmentName=" + encodeURIComponent(departmentName));
	inputs.push("testCount=" + encodeURIComponent(testCount));
	inputs.push("reagentName=" + encodeURIComponent(reagentName));
	inputs.push("reagentNameId=" + encodeURIComponent(reagentNameId));
	//inputs.push("assetLocationId=" + encodeURIComponent(assetMaintenanceLocationId));
	inputs.push("assetLocationName=" + encodeURIComponent(assetMaintenanceLocationName));
	
	//location id
	inputs.push("locationId=" + encodeURIComponent(hiddeAssetLocationId));
	//details id 
	inputs.push("detailsId=" + encodeURIComponent(hiddeAssetDetailsId));
	if(recordType == 2){
	inputs.push("recordType=" + encodeURIComponent(recordTypeUpdated));
	}else{
		inputs.push("recordType=" + encodeURIComponent(recordType));	
	}
	//alert("ro::"+JSON.stringify(itemAssetMaintenanceSlaveDetails));
	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/inventoryAssetMaintenance/saveItemAssetMaintenance",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully"); // alert("Record
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				refreshAssetMaintenance();
				closeAssetMaintenancePopUp();
				
			} else if (r == 2) {
				alertify.success("Record Updated successfully..!"); // alert("Record
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				refreshAssetMaintenance();
				closeAssetMaintenancePopUp();
			} else {
				alertify.error("Oops something went wrong.....!");
				//to refresh the data
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				refreshAssetMaintenance();
				closeAssetMaintenancePopUp();
			}
		}
	});
}

/**
 * 
 * @param itemAssetMaintenanceSlaveDetails
 * @param assetMaintenanceSlaveId
 * @param itemMasterId
 * @param assetMaintenanceContractId
 * @param assetMaintenanceDurationId
 * @param assetMaintenanceTimePeriodId
 * @param assetMaintenanceFromDateId
 * @param assetMaintenanceToDateId
 */
function setAssetMaintenanceSlaveList(itemAssetMaintenanceSlaveDetails,
		assetMaintenanceSlaveId,assetMaintenanceContractId,assetMaintenanceDurationId,assetMaintenanceTimePeriodId,
		assetMaintenanceServiceProviderId,assetMaintenanceServiceProviderName,assetMaintenanceServiceCostId,
		assetMaintenanceFromDateId,assetMaintenanceToDateId,assetMaintenanceStatusId,assetMaintenanceRemarkId,
		assetMaintenanceAlertDaysId,assetMaintenanceRemainingDaysId,assetMaintenanceEntryDateTimeId,assetMaintenanceUserNameId,assetMaintenanceIsActiveId){
	itemAssetMaintenanceSlaveDetails.lstItemAssetMaintenanceSlaveDto.push({
		id:assetMaintenanceSlaveId,
		assetMaintenanceContract:assetMaintenanceContractId,
		assetMaintenanceDuration:assetMaintenanceDurationId,
		assetMaintenanceTimePeriod:assetMaintenanceTimePeriodId,
		partyMasterId:assetMaintenanceServiceProviderId,
		partyName:assetMaintenanceServiceProviderName,
		serviceCost:assetMaintenanceServiceCostId !="" && assetMaintenanceServiceCostId!=undefined && assetMaintenanceServiceCostId!=null? assetMaintenanceServiceCostId:0,
		assetMaintenanceFromDate:assetMaintenanceFromDateId,
		assetMaintenanceToDate:assetMaintenanceToDateId,
		status:assetMaintenanceStatusId,
		remark:assetMaintenanceRemarkId,
		alertDate:assetMaintenanceAlertDaysId !="" && assetMaintenanceAlertDaysId!=undefined && assetMaintenanceAlertDaysId!=null? assetMaintenanceAlertDaysId:0,
		remainingDays:assetMaintenanceRemainingDaysId !="" && assetMaintenanceRemainingDaysId!=undefined && assetMaintenanceRemainingDaysId!=null? assetMaintenanceRemainingDaysId:0,
		entryDateTime:assetMaintenanceEntryDateTimeId,
		userName:assetMaintenanceUserNameId,
		isActive:assetMaintenanceIsActiveId
		
	});
}

/*******************************************************************************
 * @Since 20-07-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to get the location asset maintenance slave details by using master id
 ******************************************************************************/
function getLocationAssetMaintenanceDetailsByMasterId(id) {
	var inputs = [];
	inputs.push('masterId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
				async : true,
				type : 'GET',
				data : str + "&reqType=AJAX",
				url : 'ehat/inventoryAssetMaintenance/getLocationAssetMaintenanceDetailsByMasterId',
				timeout : 1000 * 60 * 5,
				catche : false,
				success : function(r) {
					if(r.locationId == null){
						document.getElementById("hiddeAssetLocationId").value = 0;	
					}else{
						document.getElementById("hiddeAssetLocationId").value = r.locationId;
					}
					document.getElementById("inchargeNameId").value = r.inchargeName;
					document.getElementById("inchargeContactNoId").value = r.inchargeContactNo;
					document.getElementById("locationRemarkId").value = r.remark;
					if(r.locationHospitalDeptId != null && r.locationHospitalDeptName !=null){
						document.getElementById("assetMaintenanceDepartmentId").value = r.locationDeptId;
						document.getElementById("assetMaintenanceDepartmentId").text = r.locationDeptName;
					}else{
						document.getElementById("assetMaintenanceDepartmentId").value = 0;
					}
					if(r.locationHospitalDeptId != null && r.locationHospitalDeptName !=null){
						document.getElementById("assetMaintenanceHospitalDeptId").value = r.locationHospitalDeptId;
						document.getElementById("assetMaintenanceHospitalDeptId").text = r.locationHospitalDeptName;
					}else{
						document.getElementById("assetMaintenanceHospitalDeptId").value = 0;
					}
					

				}
			});
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 20-02-2020
 * @codeFor : refreshGRN
 ******************************************************************************/
function refreshAssetMaintenance(){	
		 $("#assetName").val("");
		 $("#partyName").val("");
		 $("#assetId").val("");
		 $("#manufactureName").val("");
		 $("#purchaseDate").val("");
		 $("#serialNo").val("");
		 $("#installationDateId").val("");
		 $("#unitPriceId").val("");
		 $("#orgFarNoId").val("");
		 $("#purchaseRefId").val("");
		 $("#warrantyFromId").val("");
		 $("#warrantyToId").val("");
		 $("#productWarrantyDurationId").val("");
		 $("#productWarrantyTimePeriodId").val("");
		 $("#hiddenAssetItemId").val(0);
		 $("#hiddenMasterId").val(0);
		 $("#hiddenPartyId").val(0);
		 //$("#locationNameId").val("");
		 $("#inchargeNameId").val("");
		 $("#inchargeContactNoId").val("");
		 $("#locationRemarkId").val("");
		 $("#productWarrantySpanTagId").text("");
		 
		var tableHeaderRowCount = 1;
		var table = document.getElementById('itemMaintenanceTableId');
		var rowCount = table.rows.length;
		for (var i = tableHeaderRowCount; i < rowCount; i++) {
		    table.deleteRow(tableHeaderRowCount);
		}
	
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 21-07-2020
 * @codeFor : Remove row temp for MRN
 ******************************************************************************/
function removeRowFromTableForAssetMaintenance(tableId, checkboxClass) {
	$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
	checkForAssetMaintenance(tableId);
	checkCompForAssetMaintenance(tableId);
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 21-07-2020
 * @codeFor : For reorder srno after delete
 ******************************************************************************/
function checkForAssetMaintenance(tableId) {
	obj = $('#' + tableId + ' tbody tr').find('span');
	$.each(obj, function(key, value) {
		id = value.id;
		$('#' + id).html(key + 1);
	});
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 21-07-2020
 * @codeFor : For reorder index ids of componant after delete
 ******************************************************************************/
function checkCompForAssetMaintenance(tableId) {
	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('input,select,radio,checkbox,span,textarea');
	console.log(obj);
	var inx = 1;
	var idIndex = 1;
	$.each(obj, function(key, value) {
		if (inx == (trLength + 1)) {
			inx = 1;
			idIndex++;
		}
		id = value.id;
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#' + id).attr('id', replaceById);
		inx++;
	});
}

function uploadAssetMaintenenceDocuments(){
	var form = $("#documentForm")[0];
	
	 if( document.getElementsByName("uploadAssetMaintenanceDocs").length == 0 || $("#uploadAssetMaintenanceDocument").val()==""){
		    alert("Please select file");
		    return false;
		}
	 var assetMaintenanceMasterId = $("#hiddenMasterId").val();
	 var assetMaintenanceDocUploadId = $("#hiddenAssetMaintenanceDocUploadId").val();
	 var uploadAssetMaintenanceDocument=getFileValue('uploadAssetMaintenanceDocument');
	 var uploadAssetMaintenanceDocumentComment=$("#uploadAssetMaintenanceDocumentComment").val();
		
	var documentTab = {	lstItemAssetMaintenanceDocUpload : []};
	documentTab.lstItemAssetMaintenanceDocUpload.push({
		id : assetMaintenanceDocUploadId,
		assetMaintenenceMasterId : assetMaintenanceMasterId,
		filePath : JSON.stringify(uploadAssetMaintenanceDocument),
		uploadComment : uploadAssetMaintenanceDocumentComment,
	});
		
	 var data = new FormData(form);
	 data.append("documentUpload", JSON.stringify(documentTab));
	 data.append("assetMaintenenceMasterId", assetMaintenanceMasterId);
	 
	
	jQuery.ajax({
		async : true,
		type : "POST",
		enctype: 'multipart/form-data',
		url : "ehat/inventoryAssetMaintenance/uploadAssetMaintenanceDocument",
		data : data,
		processData: false,
        contentType: false,               
   	 	catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alertify.success(r);
			getUploadedDocuments();
			$('#uploadAssetMaintenanceDocument').val("");
			$('#uploadAssetMaintenanceDocumentComment').val("");
		}
	});
	 
}

/****************************************************************************************************
 * @author Rohit Sandbhor
 * @since 22-07-2020
 * @comment for get file value(only name)
******************************************************************************************************/	
function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}
/****************************************************************************************************
 * @author Rohit Sandbhor
 * @since 22-07-2020 
 * @comment for get uploaded documents list against the asset maintenance master id
******************************************************************************************************/	
function getUploadedDocuments(){
	var assetMaintenanceMasterId = $("#hiddenMasterId").val();
	var count = 0;
	var htm = "";
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {"assetMaintenanceMasterId" : assetMaintenanceMasterId },
		url : "ehat/inventoryAssetMaintenance/getUploadedDocuments",
		success : function(response) {
			for ( var i = 0; i < response.lstItemAssetMaintenanceDocUpload.length; i++) {
				count++;
				htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ count
				+ '</td>'
				+ ' <td class="col-md-1 center" id="filePathDocumentUploadId' + count
				+ '" >'
				+ response.lstItemAssetMaintenanceDocUpload[i].filePath
				+ '</td>'
				+ ' <td class="col-md-1 center" id="commentDocumentUploadId' + count
				+ '" >'
				+ response.lstItemAssetMaintenanceDocUpload[i].uploadComment
				+ '</td>'
				+ ' <td class="col-md-1 center" id="uploadedDateDocumentUploadId' + count
				+ '" >'
				+ getDateWithTime(response.lstItemAssetMaintenanceDocUpload[i].createdDateTime)
				+ '</td>'
				//view button
				+ ' <td class="col-md-1 center"><button id="viewDocumentUploadId'+count+'" value="'+JSON.parse(response.lstItemAssetMaintenanceDocUpload[i].filePath)+'"  type="button" onclick="viewUploadedDocument(this.value)" ><i class="fa fa-eye" title="View Document"></i></button>'
				+ '</td>'
				
				+ '</tr>';
			}
			$('#uploadedDocumentAssetMaintenanceTBody').html(htm);
		}
			
	});
}
/**
 * @author Rohit Sandbhor
 * @since 22-07-2020 
 * @param response
 */
function getDocumentUploadedDetails(response){
	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.lstItemAssetMaintenanceDocUploadDto.length; i++) {
		
		count++;
		htm = htm
		+ '<tr class="newAdded"> '
		+ ' <td class="col-md-1 center">'
		+ count
		+ '</td>'
		+ ' <td class="col-md-1 center" id="filePathDocumentUploadId' + count
		+ '" >'
		+ response.lstItemAssetMaintenanceDocUploadDto[i].filePath
		+ '</td>'
		+ ' <td class="col-md-1 center" id="commentDocumentUploadId' + count
		+ '" >'
		+ response.lstItemAssetMaintenanceDocUploadDto[i].uploadComment
		+ '</td>'
		+ ' <td class="col-md-1 center" id="uploadedDateDocumentUploadId' + count
		+ '" >'
		+ getDateWithTime(response.lstItemAssetMaintenanceDocUploadDto[i].createdDateTime)
		+ '</td>'
		//view button
		+ ' <td class="col-md-1 center"><button id="viewDocumentUploadId'+count+'" value="'+JSON.parse(response.lstItemAssetMaintenanceDocUploadDto[i].filePath)+'"  type="button" onclick="viewUploadedDocument(this.value)" ><i class="fa fa-eye" title="View Document"></i></button>'
		+ '</td>'
		//delete by Vishnu
		+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" id="viewDocumentUploadId'+count+'" value="'+response.lstItemAssetMaintenanceDocUploadDto[i].id+'"  type="button" onclick="deleteUploadedDocument(this.value)" ><i class="fa fa-trash-o" title="Delete Document"></i></button>'
		+ '</td>'
		
		+ '</tr>';
	}
	$("#uploadedDocumentAssetMaintenanceTBody").html(htm);
}

/**
 * @author Rohit Sandbhor
 * @since 22-07-2020 
 * @param document
 */
function viewUploadedDocument(document){
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		var assetMaintenanceMasterId = $("#hiddenMasterId").val();
		$('#viewDocumentAssetMaintenance').attr("src","");
		$('#viewDocumentAssetMaintenance').attr("src","ehat/inventoryAssetMaintenance/readDocuments?assetMaintenanceMasterId="+assetMaintenanceMasterId+"&fileName="+document);
		$('#viewDocModal').modal('show');
	}

}

function setWarrantyFromDate(){
	var purchaseDate = document.getElementById("purchaseDate").value;
	//var purchaseDate = $("#purchaseDate").val();
	$("#warrantyFromId").val(purchaseDate);
	new JsDatePick({
		useMode : 2,
		target : "warrantyFromId",
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		dateFormat : "%Y-%m-%d",
		imgPath : "../img/",
		weekStartDay : 1,
	});
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since  : 05-08-2020
 * @codeFor: get all lab locations i.e lab names
 ******************************************************************************/
function getPathologyDepartments() {
	jQuery.ajax({
	async : false,
	type : "GET",
	url : "ehat/inventoryAssetMaintenance/getPathologyDepartments",
	error : function() {
		alert('error');
	},
	success : function(r) {
		var divContent = "";
		divContent = divContent
				+ "<select class='col-md-12'><option value='0'>--Select Department Name--</option>";
		for ( var i = 0; i < r.lstSubService.length; i++) {
			divContent = divContent + "<option value='"
					+ r.lstSubService[i].subId + "'>"
					+ r.lstSubService[i].categoryName + "</option>";
		}
		divContent = divContent + "</select>";
		$("#departmentId").html(divContent);
		$("#departmentId").select2();
	}
});
}

function getAllReagentNames(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
	async : false,
	type : "GET",
	data : str + "&reqType=AJAX",
	url : "ehat/inventoryAssetMaintenance/getAllReagentNames",
	error : function() {
		alert('error');
	},
	success : function(r) {
		var divContent = "";
		divContent = divContent
				+ "<select class='col-md-12'><option value='0'>--Select Reagent Name--</option>";
		for ( var i = 0; i < r.lstItemMaster.length; i++) {
			divContent = divContent + "<option value='"
					+ r.lstItemMaster[i].id + "'>"
					+ r.lstItemMaster[i].itemName + "</option>";
		}
		divContent = divContent + "</select>";
		$("#reagentNameId").html(divContent);
		$("#reagentNameId").select2();
	}
});
}

/*******************************************************************************
 * @Since 06-08-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to get the details slave details by using master id
 ******************************************************************************/
function getAssetMaintenanceDetailsTabInfo(id) {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('masterId=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
	async : true,
	type : 'GET',
	data : str + "&reqType=AJAX",
	url : 'ehat/inventoryAssetMaintenance/getAssetMaintenanceDetailsTabInfo',
	timeout : 1000 * 60 * 5,
	catche : false,
	success : function(r) {
		if(r.detailsId == null){
			$("#hiddeAssetDetailsId").val(0);
		}else if(r.detailsId != null){
			$("#hiddeAssetDetailsId").val(r.detailsId);
		}
		if(r.machineOwnershipType != null){
			$("#machineOwnershipTypeId").val(r.machineOwnershipType);	
		}else if(r.machineOwnershipType == null){
			var divContent = "";
			divContent = divContent
					+ "<select class='col-md-12'><option value='0'>--Select Ownership Type--</option><option value='Owned'>Owned</option><option value='Rental'>Rental</option><option value='Lease'>Lease</option><option value='Subscriptions'>Subscriptions</option></select>";
			$("#machineOwnershipTypeId").html(divContent);
		}
		
		$("#machineOwner").val(r.machineOwner);
		$("#usedForId").val(r.usedFor);
		$("#testCountId").val(r.testCount);
		$("#assetMaintenanceLocationId").val(r.assetLocationName);
		if(r.departmentId != null){
		$('#departmentId').select2('val',r.departmentId);
		}else if(r.departmentId == null){
			jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryAssetMaintenance/getPathologyDepartments",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select class='col-md-12'><option value='0'>--Select Department Name--</option>";
					for ( var i = 0; i < r.lstSubService.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lstSubService[i].subId + "'>"
								+ r.lstSubService[i].categoryName + "</option>";
					}
					divContent = divContent + "</select>";
					$("#departmentId").html(divContent);
					$("#departmentId").select2();
				}
			});
		}
		if(r.reagentNameId != null){
			
			var artAndPlayTherapyArr = (r.reagentNameId).split(',');
		 	$('#reagentNameId').select2('val', artAndPlayTherapyArr);
			
			
			//$('#reagentNameId').select2('val',r.reagentNameId);	
		}else if(r.reagentNameId == null){
			var unitId = $("#unitId").val();
			var inputs = [];
			inputs.push('unitId=' + unitId);
			var str = inputs.join('&');
			jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/inventoryAssetMaintenance/getAllReagentNames",
			error : function() {
				alert('error');
			},
			success : function(r) {
				var divContent = "";
				divContent = divContent
						+ "<select class='col-md-12'><option value='0'>--Select Reagent Name--</option>";
				for ( var i = 0; i < r.lstItemMaster.length; i++) {
					divContent = divContent + "<option value='"
							+ r.lstItemMaster[i].id + "'>"
							+ r.lstItemMaster[i].itemName + "</option>";
				}
				divContent = divContent + "</select>";
				$("#reagentNameId").html(divContent);
				$("#reagentNameId").select2();
			}
		});
		}
	}
});
}

function getLabEquipmentOrAssetItems(value){
	var type = "";
	var unitId = $("#unitId").val();
	var productCategoryId = $("#productCategoryMaintenanceSearchId option:selected").val();
		if(value == "LABEQUIPMENT"){
			type = 1;
		}else if(value == "OTHER"){
			type = 1;
		}else{
			type = 0;
		}
		var inputs = [];
		inputs.push('value=' + value);
		inputs.push('type=' + type);
		inputs.push('productCategoryId=' + productCategoryId);
		inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/inventoryAssetMaintenance/getLabEquipmentOrAssetItems",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setItemAssetMaintenanceDataToTable(r);
				}
			});
	}

function universalSearchAssetMaintenance(){
	var productCategoryMaintenanceSearch =  "";
	var productCategoryMaintenanceSearchId = "";
	var assetNameMaintenanceSearch =  "";
	var serialNoMaintenanceSearch = "";
	var fromDateMaintenanceSearch =  "";
	var toDateMaintenanceSearch =  "";
	var assetTypeMaintenanceSearch = "";
	
	var assetMaintenanceMasterDepartmentId ="";
	var assetMaintenanceMasterHospitalDeptId="";
	
    productCategoryMaintenanceSearch = $("#productCategoryMaintenanceSearchId option:selected").text();
    productCategoryMaintenanceSearchId =  $.trim($("#productCategoryMaintenanceSearchId").val());
	assetNameMaintenanceSearch =  $.trim($("#assetNameMaintenanceSearchId").val());
	fromDateMaintenanceSearch =  $.trim($("#fromDateMaintenanceSearchId").val());
	toDateMaintenanceSearch =  $.trim($("#toDateMaintenanceSearchId").val());
	serialNoMaintenanceSearch = $.trim($("#serialNoMaintenanceSearchId").val());
	assetTypeMaintenanceSearch = $.trim($("input[name=inlineRadioOptions]:checked").val());
	assetMaintenanceMasterDepartmentId = $("#assetMaintenanceMasterDepartmentId option:selected").val();
	assetMaintenanceMasterHospitalDeptId = $("#assetMaintenanceMasterHospitalDeptId option:selected").val();
	
	var searchBy = "";
	if (productCategoryMaintenanceSearchId == "0" && assetNameMaintenanceSearch == "0" && fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""
		&& serialNoMaintenanceSearch == "0" && assetTypeMaintenanceSearch == "" && assetMaintenanceMasterHospitalDeptId == "0" && assetMaintenanceMasterDepartmentId =="0" ) {
		alert("Please enter something to search");
		return false;
	}
	if(productCategoryMaintenanceSearchId == 0){
		if ((fromDateMaintenanceSearch != "" && (toDateMaintenanceSearch == "")) || (toDateMaintenanceSearch != "" && (fromDateMaintenanceSearch == ""))) {
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val(" ");
			$("#fromDateMaintenanceSearchId").val(" ");
			alert("Please select both date to search");
			return false;
		}else if((fromDateMaintenanceSearch != "" && toDateMaintenanceSearch !="") ){
			searchBy = "byDate";
		}else if(assetMaintenanceMasterHospitalDeptId !=0 && assetMaintenanceMasterDepartmentId !=0){
			searchBy = "byDepartment";
		}
	}
   else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch == 0){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategory";
		}else if (fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == "") {
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if((fromDateMaintenanceSearch != "" && toDateMaintenanceSearch != "" && productCategoryMaintenanceSearchId != 0)) {
			searchBy = "byProductCategoryDate";
		}
	}else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch ==0 && assetMaintenanceMasterHospitalDeptId==0 && assetMaintenanceMasterDepartmentId==0){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategoryAssetName";
		}else if (fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == "") {
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch !=0 && assetMaintenanceMasterDepartmentId !=0 && assetMaintenanceMasterHospitalDeptId ==0 ){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategoryAssetNameSerialNoDepartment";
		}else if(fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch !=0 && assetMaintenanceMasterDepartmentId ==0 && assetMaintenanceMasterHospitalDeptId !=0 ){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategoryAssetNameSerialNoHospitalDepartment";
		}else if(fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}
	
	else if((fromDateMaintenanceSearch != "" && toDateMaintenanceSearch != "" 
		&& productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch !=0 && assetMaintenanceMasterDepartmentId !=0 && assetMaintenanceMasterHospitalDeptId !=0)) {
		searchBy = "byAll";
	}else if((assetMaintenanceMasterDepartmentId != "" && assetMaintenanceMasterHospitalDeptId != "" && assetMaintenanceMasterDepartmentId !=0 && assetMaintenanceMasterHospitalDeptId !=0 )){

		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byDepartment";
		}else if(fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}
	
	var inputs = [];
	inputs.push('productCategoryMaintenanceSearch=' + productCategoryMaintenanceSearch);
	inputs.push('assetNameMaintenanceSearch=' + assetNameMaintenanceSearch);
	inputs.push('fromDateMaintenanceSearch=' + fromDateMaintenanceSearch);
	inputs.push('toDateMaintenanceSearch=' + toDateMaintenanceSearch);
	inputs.push('serialNoMaintenanceSearch=' + serialNoMaintenanceSearch);
	inputs.push('locationDeptId=' + assetMaintenanceMasterDepartmentId);
	inputs.push('locationHospitalDeptId=' + assetMaintenanceMasterHospitalDeptId);
	inputs.push('searchBy=' + searchBy);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryAssetMaintenance/universalSearchAssetMaintenance",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r.lstItemAssetMaintenanceMasterDto.length == 0){
				alert("No Data Found..!!");
				getAllItemAssetMaintenance();
				$('#productCategoryMaintenanceSearchId').select2('val',"0");
				$('#assetNameMaintenanceSearchId').select2('val',"0");
				$('#serialNoMaintenanceSearchId').select2('val',"0");
				$("#fromDateMaintenanceSearchId").val("");
				$("#toDateMaintenanceSearchId").val("");
				$("#assetMaintenanceMasterDepartmentId").val("0");
				$("#assetMaintenanceMasterHospitalDeptId").val("0");
			}
			else{
			$('#productCategoryMaintenanceSearchId').select2('val',"0");
			$('#assetNameMaintenanceSearchId').select2('val',"0");
			$('#serialNoMaintenanceSearchId').select2('val',"0");
			$("#fromDateMaintenanceSearchId").val("");
			$("#toDateMaintenanceSearchId").val("");
			$("#assetMaintenanceMasterDepartmentId").val("0");
			$("#assetMaintenanceMasterHospitalDeptId").val("0");
			$('#assetNameMaintenanceSearchId'). empty();
			$('#serialNoMaintenanceSearchId'). empty();
			setItemAssetMaintenanceDataToTable(r);
			}
			
			
		}
	});
}

function getAssetMaintenanceBarCode(assetMaintenanceId,serailNo,purchaseDate,assetName,assetId,orgFarNo){
	var link = "inv_asset_maintenance_barcode_details.jsp?assetMaintenanceId="+assetMaintenanceId+"&serailNo="+serailNo+"&purchaseDate="+purchaseDate+"&assetName="+assetName+"&assetId="+assetId+"&orgFarNo="+orgFarNo;
	 window.open(link); 
}

function deleteAssetMaintenanceDetails(assetMaintenanceId) {
	var assetDeletionReason = prompt("Enter reason for deletion of Asset :");
	if(assetDeletionReason)
	{
		var didConfirm = confirm("Are you sure to delete Assets record?");
		if (didConfirm) {
		 var inputs = [];
			inputs.push('id='+assetMaintenanceId);
			inputs.push('assetDeletionReason='+assetDeletionReason);	
			var str = inputs.join('&');
			jQuery.ajax({
				async	: false,
				type	: "POST",
				data 	: str + "&reqType=AJAX",
				url 	: "ehat/inventoryAssetMaintenance/deleteAssetMaintenanceDetails",
				timeout : 1000 * 60 * 5,
				catche	: false,
				success : function(r) {
					  alert(r);
					  getAllItemAssetMaintenance();
				}
			});
		}
		else
		{
			return false;
		}
	}
	else
	{
		alert("please enter reason for deletion of asset");
		return false;
	}
	
	
}
// this is added by Vishnu 
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
			$("#assetMaintenanceDepartmentId").html(divContent);
			$("#assetMaintenanceMasterDepartmentId").html(divContent);
		}
	});
}
//this is added by Vishnu 
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
			$("#assetMaintenanceHospitalDeptId").html(divContent);
			$("#assetMaintenanceMasterHospitalDeptId").html(divContent);
		}
	});
}

//this is added by Vishnu 
function deleteUploadedDocument(id){
	var inputs = [];
	inputs.push('id='+id);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "ehat/inventoryAssetMaintenance/deleteUploadedDocument",
		timeout : 1000 * 60 * 5,
		catche	: false,
		success : function(r) {
			if(r == true){
				alertify.success("Document Deleted Sucessfully");
			}else {
				alertify.error("Document Is Not Deleted ");
			}
		}
	});
}

//this is added by Vishnu 
function getAllServiceProvider(id,response){
	var divContent = "";
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/getAllServiceProvider",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			divContent = divContent +
			"<option value='0'>--Select Service Provider--</option>";
			 for (var i = 0; i < r.partyMasterDto.length; i++) {
				divContent = divContent + "<option value='" +
					r.partyMasterDto[i].id + "'  >" +
					r.partyMasterDto[i].name +
					"</option>";
			}
			 $("#assetMaintenanceServiceProviderId"+id).html(divContent);
			 $("#assetMaintenanceServiceProviderId"+id).select2(); 
			 if(response != 0){
				 for(var i = 1; i<= response.itemAssetMaintenanceSlaveDtos.length;i++){
					 if(id == i){
						 $("#assetMaintenanceServiceProviderId"+id).select2('val',response.itemAssetMaintenanceSlaveDtos[i-1].partyMasterId);
					 }
				 }
			 }
				 
		}
	});
}

//this is added by Vishnu 
function getUserName(userId,index){
	
	if(userId == 0){
		userId = $("#userId").val(); 	
	}
	var inputs = [];
	inputs.push('User_ID=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/getUserName",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#assetMaintenanceUserNameId"+index).val("Mr. "+r.user_Name); 
		}
	});
}

function getEntryDateTime(index){
	var datee ="";
	var formattedDate = new Date();
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	alert(datee);
	$('#'+index).val(datee); 
}


function getAssetMaintenanceStatus(id,r){
	var divContent = "";
	divContent = divContent +
	"<option value='NA' >--Select Status--</option><option value='Active'>Active</option><option value='Expired'>Expired</option></select>";
	 $("#assetMaintenanceStatusId"+id).html(divContent);
	 if(r != 0){
		 for(var i = 1; i<= r.itemAssetMaintenanceSlaveDtos.length;i++){
			 if(r.itemAssetMaintenanceSlaveDtos[i-1].status == "Expired"){
				 $("#assetMaintenanceStatusId"+id).attr("disabled","disabled");
				 $("#assetMaintenanceIsActiveId"+i).val(r.itemAssetMaintenanceSlaveDtos[i-1].isActive);
				 $("#addNewContract").show();
			 }else{
				 $("#assetMaintenanceStatusId"+id).attr("disabled","disabled");
				 $("#addNewContract").hide();
			 }
			$("#assetMaintenanceStatusId"+i).val(r.itemAssetMaintenanceSlaveDtos[i-1].status);
		 } 
	 }
	 if($("#assetMaintenanceStatusId"+id+" option:selected").val() == "Expired"){
		 $("#addNewContract").show();
		// $("#assetMaintenanceStatusId"+id).removeAttr("disabled");
	 }else{
		 $("#addNewContract").hide();
	 }
}

function getMaintenanceContract(id,r){
	var divContent = "";
	divContent = divContent +
	"<option value='NA' >--Select Type--</option><option value='Warranty'>Warranty</option><option value='Extended Warranty'>Extended Warranty</option><option value='CMC'>CMC</option><option value='AMC'>AMC</option><option value='Service'>Service</option><option value='On call'>On call</option><option value='Preventive Maintenance'>Preventive Maintenance</option></select>";
	 $("#assetMaintenanceContractId"+id).html(divContent);
	 if(r != 0){
		 for(var i = 1; i<= r.itemAssetMaintenanceSlaveDtos.length;i++){
			$("#assetMaintenanceContractId"+i).val(r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceContract);
		 } 
	 }
}

function setPreventiveMaintenanceContract(){
	var id = 1;
	var divContent = "";
	divContent = divContent +
	"<option value='NA' >--Select Type--</option><option value='Warranty'>Warranty</option><option value='Extended Warranty'>Extended Warranty</option><option value='CMC'>CMC</option><option value='AMC'>AMC</option><option value='Service'>Service</option><option value='On call'>On call</option><option selected value='Preventive Maintenance'>Preventive Maintenance</option></select>";
	 $("#assetMaintenanceContractId"+id).html(divContent);
}

function getTimePeriod(id,r){
	var divContent = "";
	divContent = divContent +
	"<option value='NA' >--Select Type--</option><option value='Year'>Year</option><option value='Month'>Month</option><option value='Days'>Days</option></select>";
	 $("#assetMaintenanceTimePeriodId"+id).html(divContent);
	 if(r != 0){
		 for(var i = 1; i<= r.itemAssetMaintenanceSlaveDtos.length;i++){
			$("#assetMaintenanceTimePeriodId"+i).val(r.itemAssetMaintenanceSlaveDtos[i-1].assetMaintenanceTimePeriod);
		 } 
	 }
}


function universalSearchAssetMaintenanceRepoerts(){
	var productCategoryMaintenanceSearch =  "";
	var productCategoryMaintenanceSearchId = "";
	var assetNameMaintenanceSearch =  "";
	var serialNoMaintenanceSearch = "";
	var fromDateMaintenanceSearch =  "";
	var toDateMaintenanceSearch =  "";
	var assetTypeMaintenanceSearch = "";
	
	var assetMaintenanceMasterDepartmentId ="";
	var assetMaintenanceMasterHospitalDeptId="";
	
    productCategoryMaintenanceSearch = $("#productCategoryMaintenanceSearchId option:selected").text();
    productCategoryMaintenanceSearchId =  $.trim($("#productCategoryMaintenanceSearchId").val());
	assetNameMaintenanceSearch =  $.trim($("#assetNameMaintenanceSearchId").val());
	fromDateMaintenanceSearch =  $.trim($("#fromDateMaintenanceSearchId").val());
	toDateMaintenanceSearch =  $.trim($("#toDateMaintenanceSearchId").val());
	serialNoMaintenanceSearch = $.trim($("#serialNoMaintenanceSearchId").val());
	assetTypeMaintenanceSearch = $.trim($("input[name=inlineRadioOptions]:checked").val());
	assetMaintenanceMasterDepartmentId = $("#assetMaintenanceMasterDepartmentId option:selected").val();
	assetMaintenanceMasterHospitalDeptId = $("#assetMaintenanceMasterHospitalDeptId option:selected").val();
	
	var searchBy = "";
	if (productCategoryMaintenanceSearchId == "0" && assetNameMaintenanceSearch == "0" && fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""
		&& serialNoMaintenanceSearch == "0" && assetTypeMaintenanceSearch == "" && assetMaintenanceMasterHospitalDeptId == "0" && assetMaintenanceMasterDepartmentId =="0" ) {
		alert("Please enter something to search");
		return false;
	}
	if(productCategoryMaintenanceSearchId == 0){
		if ((fromDateMaintenanceSearch != "" && (toDateMaintenanceSearch == "")) || (toDateMaintenanceSearch != "" && (fromDateMaintenanceSearch == ""))) {
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val(" ");
			$("#fromDateMaintenanceSearchId").val(" ");
			alert("Please select both date to search");
			return false;
		}else if((fromDateMaintenanceSearch != "" && toDateMaintenanceSearch !="") ){
			searchBy = "byDate";
		}else if(assetMaintenanceMasterHospitalDeptId !=0 && assetMaintenanceMasterDepartmentId !=0){
			searchBy = "byDepartment";
		}
	}
   else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch == 0){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategory";
		}else if (fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == "") {
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if((fromDateMaintenanceSearch != "" && toDateMaintenanceSearch != "" && productCategoryMaintenanceSearchId != 0)) {
			searchBy = "byProductCategoryDate";
		}
	}else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch ==0 && assetMaintenanceMasterHospitalDeptId==0 && assetMaintenanceMasterDepartmentId==0){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategoryAssetName";
		}else if (fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == "") {
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch !=0 && assetMaintenanceMasterDepartmentId !=0 && assetMaintenanceMasterHospitalDeptId ==0 ){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategoryAssetNameSerialNoDepartment";
		}else if(fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}else if(productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch !=0 && assetMaintenanceMasterDepartmentId ==0 && assetMaintenanceMasterHospitalDeptId !=0 ){
		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byProductCategoryAssetNameSerialNoHospitalDepartment";
		}else if(fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}
	
	else if((fromDateMaintenanceSearch != "" && toDateMaintenanceSearch != "" 
		&& productCategoryMaintenanceSearchId != 0 && assetNameMaintenanceSearch != 0 && serialNoMaintenanceSearch !=0 && assetMaintenanceMasterDepartmentId !=0 && assetMaintenanceMasterHospitalDeptId !=0)) {
		searchBy = "byAll";
	}else if((assetMaintenanceMasterDepartmentId != "" && assetMaintenanceMasterHospitalDeptId != "" && assetMaintenanceMasterDepartmentId !=0 && assetMaintenanceMasterHospitalDeptId !=0 )){

		if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch == ""){
			searchBy = "byDepartment";
		}else if(fromDateMaintenanceSearch != "" && toDateMaintenanceSearch == ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}else if(fromDateMaintenanceSearch == "" && toDateMaintenanceSearch != ""){
			$("#productCategoryMaintenanceSearchId").val(0);
			$("#assetNameMaintenanceSearchId").val(0);
			$("#toDateMaintenanceSearchId").val("");
			$("#fromDateMaintenanceSearchId").val("");
			alert("Please select both date to search");
			return false;
		}
	}
	
	var inputs = [];
	inputs.push('productCategoryMaintenanceSearch=' + productCategoryMaintenanceSearch);
	inputs.push('assetNameMaintenanceSearch=' + assetNameMaintenanceSearch);
	inputs.push('fromDateMaintenanceSearch=' + fromDateMaintenanceSearch);
	inputs.push('toDateMaintenanceSearch=' + toDateMaintenanceSearch);
	inputs.push('serialNoMaintenanceSearch=' + serialNoMaintenanceSearch);
	inputs.push('locationDeptId=' + assetMaintenanceMasterDepartmentId);
	inputs.push('locationHospitalDeptId=' + assetMaintenanceMasterHospitalDeptId);
	inputs.push('searchBy=' + searchBy);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryAssetMaintenance/universalSearchAssetMaintenanceReports",
		error : function() {
			alert('error');
		},
		success : function(r) {
			debugger;
			if(r.lstItemAssetMaintenanceMasterDto.length == 0){
				alert("No Data Found..!!");
				getAllItemAssetMaintenanceReports();
				$('#productCategoryMaintenanceSearchId').select2('val',"0");
				$('#assetNameMaintenanceSearchId').select2('val',"0");
				$('#serialNoMaintenanceSearchId').select2('val',"0");
				$("#fromDateMaintenanceSearchId").val("");
				$("#toDateMaintenanceSearchId").val("");
				$("#assetMaintenanceMasterDepartmentId").val("0");
				$("#assetMaintenanceMasterHospitalDeptId").val("0");
			}else{
				$('#productCategoryMaintenanceSearchId').select2('val',"0");
				$('#assetNameMaintenanceSearchId').select2('val',"0");
				$('#serialNoMaintenanceSearchId').select2('val',"0");
				$("#fromDateMaintenanceSearchId").val("");
				$("#toDateMaintenanceSearchId").val("");
				$("#assetMaintenanceMasterDepartmentId").val("0");
				$("#assetMaintenanceMasterHospitalDeptId").val("0");
				$('#assetNameMaintenanceSearchId'). empty();
				$('#serialNoMaintenanceSearchId'). empty();
				setItemAssetMaintenanceDataReportToTable(r);
			}
		}
	});
}


function getAllItemAssetMaintenanceReports(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/getAllItemAssetMaintenanceReports",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setItemAssetMaintenanceDataReportToTable(r);
		}
	});
}
/**
 * @author Vishnu Thorat
 * @since 1-12-2020
 * @comment to set item asset maintenance data report to table
 * @param response
 */
function setItemAssetMaintenanceDataReportToTable(response){
	debugger;
var htm = "";
var index = 1;
	for (var i = 0; i < response.lstItemAssetMaintenanceMasterDto.length; i++) {
		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center">' +
			index +
			'</td>';
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemId +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].assetType == "LABEQUIPMENT"){
				htm = htm + ' <td class="col-md-1 center" style="color:red;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</td>';
			}
			else{
				htm = htm + ' <td class="col-md-1 center" style="color:darkorange;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</td>';
			}
			htm = htm + ' <td class="col-md-3 center">' +response.lstItemAssetMaintenanceMasterDto[i].serialNo +'</td>';
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].productCategory +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationDeptName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].orgFarNo !="" && response.lstItemAssetMaintenanceMasterDto[i].orgFarNo !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].orgFarNo +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].unitPrice !="" && response.lstItemAssetMaintenanceMasterDto[i].unitPrice !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].unitPrice +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].manufactureName !="" && response.lstItemAssetMaintenanceMasterDto[i].manufactureName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].manufactureName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].purchaseRef !="" && response.lstItemAssetMaintenanceMasterDto[i].purchaseRef !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].purchaseRef +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			
			if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 1){
			
				htm = htm + ' <td class="col-md-1 center">' +getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
			}
			else if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 3){
				htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime) +'</td>';
			}
		
			else{
				htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
			}
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].partyName +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].installationDate !="" && response.lstItemAssetMaintenanceMasterDto[i].installationDate !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].installationDate +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			
			if(response.lstItemAssetMaintenanceMasterDto[i].warrantyFromDate !="" && response.lstItemAssetMaintenanceMasterDto[i].warrantyFromDate !=null){
				htm = htm + ' <td class="col-md-1 center">' +getDate(response.lstItemAssetMaintenanceMasterDto[i].warrantyFromDate) +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			
			if(response.lstItemAssetMaintenanceMasterDto[i].warrantyToDate !="" && response.lstItemAssetMaintenanceMasterDto[i].warrantyToDate !=null){
				htm = htm + ' <td class="col-md-1 center">' +getDate(response.lstItemAssetMaintenanceMasterDto[i].warrantyToDate) +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].warrantyStatus !="" && response.lstItemAssetMaintenanceMasterDto[i].warrantyStatus !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].warrantyStatus +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime !="" && response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime !=null){
				htm = htm + ' <td class="col-md-1 center">' +getDateWithTime(response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime) +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			
			if(response.lstItemAssetMaintenanceMasterDto[i].userName !="" && response.lstItemAssetMaintenanceMasterDto[i].userName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].userName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			htm = htm + '</tr>';
			
		index++;
	}
	$("#assetMaintenanceReports").html(htm);
}

function getAllDeletedAssetMaintenanceReports(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryAssetMaintenance/getAllDeletedAssetMaintenanceReports",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setDeletedAssetMaintenanceDataReportToTable(r);
		}
	});
}
/**
 * @author Vishnu Thorat
 * @since 1-12-2020
 * @comment to set item asset maintenance data report to table
 * @param response
 */
function setDeletedAssetMaintenanceDataReportToTable(response){
var htm = "";
var index = 1;
	for (var i = 0; i < response.lstItemAssetMaintenanceMasterDto.length; i++) {
		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center">' +
			index +
			'</td>';
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemId +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].assetType == "LABEQUIPMENT"){
				htm = htm + ' <td class="col-md-1 center" style="color:red;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</td>';
			}
			else{
				htm = htm + ' <td class="col-md-1 center" style="color:darkorange;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</td>';
			}
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].serialNo +'</td>';
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].productCategory +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationDeptName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].orgFarNo !="" && response.lstItemAssetMaintenanceMasterDto[i].orgFarNo !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].orgFarNo +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].unitPrice !="" && response.lstItemAssetMaintenanceMasterDto[i].unitPrice !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].unitPrice +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].manufactureName !="" && response.lstItemAssetMaintenanceMasterDto[i].manufactureName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].manufactureName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].purchaseRef !="" && response.lstItemAssetMaintenanceMasterDto[i].purchaseRef !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].purchaseRef +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 1){
			
				htm = htm + ' <td class="col-md-1 center">' +getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
			}
			else if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 3){
				htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime) +'</td>';
			}
		
			else{
				htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
			}
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].partyName +'</td>';
			if(response.lstItemAssetMaintenanceMasterDto[i].installationDate !="" && response.lstItemAssetMaintenanceMasterDto[i].installationDate !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].installationDate +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			
			if(response.lstItemAssetMaintenanceMasterDto[i].warrantyFromDate !="" && response.lstItemAssetMaintenanceMasterDto[i].warrantyFromDate !=null){
				htm = htm + ' <td class="col-md-1 center">' +getDate(response.lstItemAssetMaintenanceMasterDto[i].warrantyFromDate) +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			
			if(response.lstItemAssetMaintenanceMasterDto[i].warrantyToDate !="" && response.lstItemAssetMaintenanceMasterDto[i].warrantyToDate !=null){
				htm = htm + ' <td class="col-md-1 center">' +getDate(response.lstItemAssetMaintenanceMasterDto[i].warrantyToDate) +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			
			if(response.lstItemAssetMaintenanceMasterDto[i].warrantyStatus !="" && response.lstItemAssetMaintenanceMasterDto[i].warrantyStatus !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].warrantyStatus +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].deleteReason !="" && response.lstItemAssetMaintenanceMasterDto[i].deleteReason !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].deleteReason +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].deletedDate !="" && response.lstItemAssetMaintenanceMasterDto[i].deletedDate !=null){
				htm = htm + ' <td class="col-md-1 center">' +getDateWithTime(response.lstItemAssetMaintenanceMasterDto[i].deletedDate) +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			if(response.lstItemAssetMaintenanceMasterDto[i].userName !="" && response.lstItemAssetMaintenanceMasterDto[i].userName !=null){
				htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].userName +'</td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">NA</td>';
			}
			htm = htm + '</tr>';
		index++;
	}
	$("#deletedAssetMaintenanceReports").html(htm);
}

