// this is for add Maintenance dashboard by Vishnu

function getWarrantyActionAlert() {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/maintenanceDashboard/getWarrantyActionAlert",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(response) {
				var htm = "";
				var index = 0;
				var count = 0;
				if(response !="" && response !=null){
					for (var i = 0; i < response.lstItemAssetMaintenanceMasterDto.length; i++) {
						for (var j = 0; j < response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos.length; j++) {
						count++;
						htm = htm +
							'<tr> ' +
							' <td class="col-md-1 center">' +
							count +
							'</td>';
							htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemId +'</td>';
							if(response.lstItemAssetMaintenanceMasterDto[i].assetType == "LABEQUIPMENT"){
								htm = htm + ' <td class="col-md-1 center"><span style="color:red;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
							}
							else{
								htm = htm + ' <td class="col-md-1 center"><span style="color:darkorange;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
							}
							htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].serialNo +'</td>';
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
								//if(response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].status == "Active"){
									htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].partyName +'</td>'
									+ ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceContract +'</td>'
									+ ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceFromDate +'</td>'
									+ ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceToDate +'</td>'
									+ ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].alertDate +'</td>'
									+ ' <td class="col-md-1 center">' +getRemainngdays(response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceFromDate,response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceToDate) +'</td>';
								//}
							}
							htm = htm + '</tr>';
						index++;
					}
				$("#warrantyActionAlertTotal").html("Warranty Action Alert (" + index + ") ");
				$("#maintenanceWarrantyActionAlert").html(htm);
			}
		}
	});
}

function getExpiredWarranty() {

	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/maintenanceDashboard/getExpiredWarranty",
				error : function() {
					alert('Network Issue..!!');
				},
				success : function(response) {
					var htm = "";
					var index = 0;
					var count = 0;
					if(response !="" && response !=null){
						for (var i = 0; i < response.lstItemAssetMaintenanceMasterDto.length; i++) {
							for (var j = 0; j < response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos.length; j++) {
							count++;
							
							htm = htm +
								'<tr> ' +
								' <td class="col-md-1 center">' +
								count +
								'</td>';
								htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemId +'</td>';
								if(response.lstItemAssetMaintenanceMasterDto[i].assetType == "LABEQUIPMENT"){
									htm = htm + ' <td class="col-md-1 center"><span style="color:red;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
								}
								else{
									htm = htm + ' <td class="col-md-1 center"><span style="color:darkorange;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
								}
								htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].serialNo +'</td>';
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
								}else if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 3){
									htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime) +'</td>';
								}else{
									htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
								}
								//for (var j = 0; j < response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos.length; j++) {
									if(response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].status == "Expired"){
										htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].partyName +'</td>'
										+' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceContract +'</td>'
										+ ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceFromDate +'</td>'
										+ ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceToDate +'</td>'
										+ ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].alertDate+'</td>'
										+ ' <td class="col-md-1 center">' +getRemainngdaysExpiry(response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceFromDate,response.lstItemAssetMaintenanceMasterDto[i].itemAssetMaintenanceSlaveDtos[j].assetMaintenanceToDate) +'</td>';
									}
								}
								htm = htm + '</tr>';
							index++;
						}
						$("#expiredWarrantyTotal").html("Expired Warranty (" + index + ") ");
						$("#maintenanceExpiredWarranty").html(htm);
					}
				}
			});
}
function getDateWithoutTime(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	return datee;
}

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
function getRemainngdays(fromDate,toDate){
	var dayRemaining = new Date(toDate);
	var currentDate = new Date(fromDate);
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate = dayRemaining;
	const secondDate = currentDate;
	const diffDays = Math.round(Math.sign((firstDate - secondDate) / oneDay));
	const diffVal = Math.round(Math.abs((firstDate - secondDate) / oneDay));
	if(diffDays <=0){
		return - diffVal;
	}else{
		return diffVal;
	}
	
}

function getRemainngdaysExpiry(fromDate,toDate){
	var dayRemaining = new Date(fromDate);
	var currentDate = new Date(toDate);
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate = dayRemaining;
	const secondDate = currentDate;
	const diffDays = Math.round(Math.sign((firstDate - secondDate) / oneDay));
	const diffVal = Math.round(Math.abs((firstDate - secondDate) / oneDay));
	if(diffDays <=0){
		return - diffVal;
	}else{
		return diffVal;
	}
	
}

