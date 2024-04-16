
function saveOrganStockDiscard(){
	var stockDiscardId = $('#stockDiscardId').val();
	var organDonorId = $('#organDonorId').val();
	var stockDiscardOrganCollectionId = $('#stockDiscardOrganCollectionId').val();
	var stockDiscardTreatmentId = $('#stockDiscardTreatmentId').val();
	
	var oragn_stock_discard_title = $('select#oragn_stock_discard_title').val();
	if(oragn_stock_discard_title=="" || oragn_stock_discard_title==0 || oragn_stock_discard_title==undefined || oragn_stock_discard_title==null){
		alert("Please select title");
		return false;
	}
	
	var firstName = $('#firstName').val();
	if(firstName==""){
		alert("Please enter first name");
		return false;
	}
	
	var middleName = $('#middleName').val();
//	if(middleName==""){
//		alert("Please enter middle name");
//		return false;
//	}

	var lastName = $('#lastName').val();
	if(lastName==""){
		alert("Please enter last name");
		return false;
	}
	
	var stockInwardId = $('select#container_id option:selected').val();
	if(stockInwardId=="" || stockInwardId =="0"){
		alert("Please select container");
		return false;
	}
	
	var collectionDateTime = $('#collection_date').val();
	if(collectionDateTime=="" || collectionDateTime==0){
		alert("Please enter collection Date ");
		return false;
	}
	
	var stockInwardDateTime = $('#inward_date').val();
	if(stockInwardDateTime=="" || stockInwardDateTime==0){
		alert("Please enter Stock inward Date ");
		return false;
	}
	
	var stockStockExpiryDate = $('#expriy_date').val();
	if(stockStockExpiryDate=="" || stockStockExpiryDate==0){
		alert("Please enter Stock expiry Date ");
		return false;
	}
	
	var bloodGroupId = $('select#bloodGroupId option:selected').val();
	if(bloodGroupId=="" || bloodGroupId =="0"){
		alert("Please enter blood group");
		return false;
	}
	
	var hemoglobin = $("#hemoglobin").val();
	if(hemoglobin=="" || hemoglobin==0){
		alert("Please enter hemoglobin ");
		return false;
	}
	
	var height = $("#height").val();
	if(height=="" || height==0){
		alert("Please enter height ");
		return false;
	}
	
	var Weight = $("#Weight").val();
	if(Weight=="" || Weight==0){
		alert("Please enter Weight ");
		return false;
	}
	
	var size_id = $("#size_id").val();
	if(size_id=="" || size_id==0){
		alert("Please enter size ");
		return false;
	}
	
	var organ_nameId = $('select#organ_name_container option:selected').val();
	var organName = $('select#organ_name_container option:selected').text();
	if(organ_nameId=="" || organ_nameId==0){
		alert("Please select organ Name");
		return false;
	}
	
	var stockDiscardDate = $('#discard_date').val();
	if(stockDiscardDate=="" || stockDiscardDate==0){
		alert("Please enter Stock Discard Date ");
		return false;
	}
	
	var discardAuthorizedByName = $('select#authorizedById option:selected').text();
	var discardAuthorizedBy = $('select#authorizedById option:selected').val();
	if(discardAuthorizedBy=="" || discardAuthorizedBy==0){
		alert("Please select Authorized By ");
		return false;
	}
	
	var organDiscardedQuantity = $('#organDiscardedQuantity').val();
	var discard_stock_remark = $('#discard_stock_remark').val();
	if(discard_stock_remark==""){
		alert("Please enter Remarks");
		return false;
	}
	
	var inputs = [];	
	inputs.push('stockDiscardId=' + stockDiscardId);
	inputs.push('organId=' + organ_nameId);
	inputs.push('dorganName=' + organName);
	inputs.push('collectionDateTime=' + collectionDateTime);
	inputs.push('stockInwardDateTime=' + stockInwardDateTime); 
	inputs.push('stockStockExpiryDate=' + stockStockExpiryDate); 
	inputs.push('stockDiscardDate=' + stockDiscardDate);
	inputs.push('organDiscardedQuantity=' + organDiscardedQuantity);
	inputs.push('discardAuthorizedBy=' + discardAuthorizedBy);
	inputs.push('discardAuthorizedByName=' + discardAuthorizedByName);
	inputs.push('remark=' + discard_stock_remark);
	inputs.push('organDonorId=' + organDonorId);
	inputs.push('organCollectionId=' + stockDiscardOrganCollectionId);
	inputs.push('organTreatmentId=' + stockDiscardTreatmentId);
	inputs.push('stockInwardId=' + stockInwardId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organStockDiscard/saveOrganStockDiscard",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Organ Stock Discard Saved Sucessfully");
				getAllOrganStockDiscardList();
				clearOrganStockDiscard();
				toggleRegDiv();
			}
			else if (data == 2) {
				alertify.success( "Organ Stock Discard Updated Sucessfully");	
				getAllOrganStockDiscardList();
				clearOrganStockDiscard();
				toggleRegDiv();
			}
		}
	});	
	
	
}

function getAllOrganStockDiscardList(){
	var unitId = $("#unitId").val();
	var fromDate = $("#fromDate").val();
	var lastDate = $("#lastDate").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('lastDate=' + lastDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organStockDiscard/getAllOrganStockDiscardList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllOrganStockDiscard(r, "All");
		}
	});
}

function setAllOrganStockDiscard(r, CallFrom) {
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstOrganStockDiscardDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].stockDiscardId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].organCollectionId+"-"+r.lstOrganStockDiscardDto[i].donorTreatmentId+"-"+r.lstOrganStockDiscardDto[i].dorganName 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].prefix +" "+ r.lstOrganStockDiscardDto[i].firstName +" "+ r.lstOrganStockDiscardDto[i].middleName +" "+ r.lstOrganStockDiscardDto[i].lastName 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].bodyType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].dorganName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].stockStockExpiryDate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].stockDiscardDate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].remark
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstOrganStockDiscardDto[i].discardAuthorizedByName
					+ '</td>'
					/*+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganStockDiscard('
					+ r.lstOrganStockDiscardDto[i].stockDiscardId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganStockDiscard('
					+ r.lstOrganStockDiscardDto[i].stockDiscardId
					+ ')><i class="fa fa-trash-o"></i></button></td>'*/
					+ '</tr>';
			index++;
		}
	} else if (CallFrom == "search") {
		
		htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.stockDiscardId
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organCollectionDto.organCollectionId+"-"+r.organDonorTreatment.organDonorTreatmentId+"-"+r.dorganName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organDonationRegistrationDto.prefix +" "+ r.organDonationRegistrationDto.firstName +" "+ r.organDonationRegistrationDto.middleName +" "+ r.organDonationRegistrationDto.lastName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organDonorStockInwardDto.bodyType
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.dorganName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.stockStockExpiryDate
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.stockDiscardDate
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.remark
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.discardAuthorizedByName
		+ '</td>'
		/*+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success"  onclick=editOrganStockDiscard('
		+ r.stockDiscardId
		+ ')><i class="fa fa-edit"></i></button></td>'*/
		/*+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger"  onclick=deleteOrganStockDiscard('
		+ r.stockDiscardId
		+ ')><i class="fa fa-trash-o"></i></button></td>'*/
		+ '</tr>';
		index++;
	}
	$("#organDonorStockDiscardDetails").html(htm);
}

function deleteOrganStockDiscard(stockDiscardId){
	
	if(stockDiscardId !=undefined && stockDiscardId!=null && stockDiscardId!="" && stockDiscardId!="null"){
		var r = confirm("Are You Sure You Want To Delete Stock Discard Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organStockDiscard/deleteOrganStockDiscard",
				data : {
					"organStockDiscardId" : stockDiscardId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.success(response);
					getAllOrganStockDiscardList();
				}
			});
		}
	}
	
}

function clearOrganStockDiscard(){
	
	$('#oragn_stock_discard_title').val("select");
	$('#firstName').val("");
	$('#middleName').val("");
	$('#lastName').val("");
	$('#collection_date').val("");
	$('#bloodGroupId').val("");
	$('#hemoglobin').val("");
	$('#height').val("");
	$('#Weight').val("");
	$('#organ_name_container').select2('val',0);
	$('#size_id').val("");
	$('#container_id').val("0");
	$('#discard_stock_remark').val("");
	$('#organDiscardedQuantity').val("0"); 
	$('#inward_date').val(""); 
	$('#expriy_date').val(""); 
	$('#discard_date').val(""); 
	$('#authorizedById').val("select");
	
}

function editOrganStockDiscard(organStockDiscardId){
	
	if(organStockDiscardId !=undefined && organStockDiscardId!=null && organStockDiscardId!="" && organStockDiscardId!="null"){
		
		var inputs = [];
		inputs.push('organStockDiscardId=' + organStockDiscardId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organStockDiscard/editOrganStockDiscard",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleRegDiv();
				$("#stockDiscardId").val(r.stockDiscardId);
				$('#organDonorId').val(r.organDonationRegistrationDto.id);
				$("#stockDiscardTreatmentId").val(r.organDonorTreatment.organDonorTreatmentId);
				$("#stockDiscardOrganCollectionId").val(r.organCollectionDto.organCollectionId);
				$('#collection_date').val(r.collectionDateTime);
				$('select#oragn_stock_discard_title').val(r.organDonationRegistrationDto.prefix);
				$('#firstName').val(r.organDonationRegistrationDto.firstName);
				$('#middleName').val(r.organDonationRegistrationDto.middleName);
				$('#lastName').val(r.organDonationRegistrationDto.lastName);
				$("select#organ_name_container").select2("val",r.organId);
				$('#bloodGroupId').val(r.organDonationRegistrationDto.bloodGroupId);
				$("#height").val(r.organCollectionDto.donorCheckupList.heightInCm);
				$("#Weight").val(r.organCollectionDto.donorCheckupList.weightInKg);
				$("#hemoglobin").val(r.organCollectionDto.donorCheckupList.hemoglobin);
				$('#size_id').val(r.organDonorStockInwardDto.organSize);
				$('select#container_id').val(r.organDonorStockInwardDto.stockInwardId);
				$('#inward_date').val(r.stockInwardDateTime);
				$('#expriy_date').val(r.stockStockExpiryDate);
				$('#discard_date').val(r.stockDiscardDate);
				$('select#authorizedById').val(r.discardAuthorizedBy);
				$("#discard_stock_remark").val(r.remark);
			}
		});
	}
	
}

function getOrganCollectionStockDiscardById(){
	var stockInwardId = $('select#container_id option:selected').val();
	if(stockInwardId !=undefined && stockInwardId!=null && stockInwardId!="" && stockInwardId!="null" && stockInwardId!=0){
		var inputs = [];
		inputs.push('stockInwardId=' + stockInwardId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organStockDiscard/getOrganDonorStockInwardById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setOrganCollectionStockDiscard(r);
			}
	
		});
	}
}

function setOrganCollectionStockDiscard(r){
	$('select#oragn_stock_discard_title').val(r.organDonationRegistrationDto.prefix);
	$('#firstName').val(r.organDonationRegistrationDto.firstName);
	$('#middleName').val(r.organDonationRegistrationDto.middleName);
	$('#lastName').val(r.organDonationRegistrationDto.lastName);
	$('#stockDiscardTreatmentId').val(r.organDonorTreatment.organDonorTreatmentId);
	$('#stockDiscardOrganCollectionId').val(r.organCollectionDto.organCollectionId);
	$('#organDonorId').val(r.organDonationRegistrationDto.id);
	$("#organ_name_container").select2("val",r.organId);
	$('select#bloodGroupId').val(r.bloodGroupId);
	$("#height").val(r.organCollectionDto.donorCheckupList.heightInCm); 
	$('#Weight').val(r.organCollectionDto.donorCheckupList.weightInKg);
	$("#hemoglobin").val(r.organCollectionDto.donorCheckupList.hemoglobin);
	$("#size_id").val(r.organSize); 
	$("#inward_date").val(r.stockInwardDateTime); 
	$("#expriy_date").val(r.stockInwardExpiryDate);
	$("#collection_date").val(r.collectionDateTime);
	$("#organDiscardedQuantity").val(r.organQuantity);
}


function getBloodGroupList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getBloodGroupList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBloodGroupList(r);
		},
	});
}

function setBloodGroupList(r) {

	var list = "";
	list = list + "<option value='0'> - Select Blood Group - </option>";

	for (var i = 0; i < r.lstBloodGroupMaster.length; i++) {

		list = list + "<option value='" + r.lstBloodGroupMaster[i].bloodGroupId
				+ "' class='un'>" + (r.lstBloodGroupMaster[i].bloodGrouptName)
				+ "</option>";
	}
	$("#bloodGroupId").html(list);
	$("#blood_group_container").html(list);
}

function getAllIntendedOrgansToDonate() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getAllOrgansIntendedToDonate",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setOrgansList(r);
		},
	});
}

function setOrgansList(r) {
	var list = "";
	list = list + "<option value='0'> - Select Organ - </option>";
	for (var i = 0; i < r.lstIntendOrganDonorMasterDto.length; i++) {
		list = list + "<option value='"
				+ r.lstIntendOrganDonorMasterDto[i].intendId + "' class='un'>"
				+ (r.lstIntendOrganDonorMasterDto[i].intendOrganDonor)
				+ "</option>";
	}
	$('#organ_name_container').select2();
	$("#organ_name_container").html(list);

}

function toggleRegDiv() {
	$("#divForNewDonorReg").toggle('slow');
	$("#header_search_donor").hide();
}

function showPatSearchDiv() {
	$("#header_search_donor").toggle('slow');
	$("#divForNewDonorReg").hide();
}

function getAllTitle(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllTitle",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var html = "";
			html = html + "<option value='select'>-Select Title-</option>";
			for ( var i = 0; i < r.length; i++) {

				html = html + "<option value='" + r[i].fTitle
						+ "'>" + r[i].fTitle + "</option>";

			}
			$("#oragn_stock_discard_title").html(html);
		}
	});
}

function getAllDoctors(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllDoctors",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var html = "";
			html = html + "<option value='select'>--Select Doctor Name--</option>";
			for ( var i = 0; i < r.length; i++) {

				html = html + "<option value='" + r[i].doctor_ID
						+ "'>" + r[i].doc_name + "</option>";

			}
			$("#authorizedById").html(html);
		}
	});
}


function getDiscardContainerList(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organStockDiscard/getContainerList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setContainerList(r);
		}
	});
}

function setContainerList(r){
	var list = "";  
	list = list + "<option value='0'> - Select Container - </option>";
    for ( var i = 0; i < r.lstOrganDonorStockInwardDto.length; i++) {  

        list = list + "<option value='"+r.lstOrganDonorStockInwardDto[i].stockInwardId+"' class='un'>" + (r.lstOrganDonorStockInwardDto[i].organCollectionDto.organCollectionId+"-"+r.lstOrganDonorStockInwardDto[i].organDonorTreatment.organDonorTreatmentId+"-"+r.lstOrganDonorStockInwardDto[i].dorganName) + "</option>";    
    }  
	$('#container_id').html(list);
}


function organStockDisacrdAutoSuggestion(inputID) {
	
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('organStockDiscardId=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organStockDiscard/stockDiscardAutoSuggestion",
		cache : false,		
		success : function(r) {
			var template = "";
			
					for ( var j = 0; j < r.lstOrganStockDiscardDto.length; j++) {
						
						var arrValue = r.lstOrganStockDiscardDto[j].stockDiscardId +"-"+r.lstOrganStockDiscardDto[j].prefix +"-"+r.lstOrganStockDiscardDto[j].firstName+"-"+r.lstOrganStockDiscardDto[j].middleName+"-"+r.lstOrganStockDiscardDto[j].lastName;
						var idValue = r.lstOrganStockDiscardDto[j].stockDiscardId;
						var organStockDiscardName = r.lstOrganStockDiscardDto[j].firstName;
						resultData.push({
							ID : idValue,
							Name : organStockDiscardName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#organRquestDiv .typeahead").html(template);
				$("div#organRquestDiv .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var stockDiscardId = res[0];
		var organStockDiscardName = res[1];
		$("#" + inputID).val(organStockDiscardName);	
		if(stockDiscardId !=0 && stockDiscardId!=undefined && stockDiscardId!=""&& stockDiscardId!=null){
			getOrganStockDiscardById(stockDiscardId);
		}
	}
}

function getOrganStockDiscardById(organStockDiscardId){
	
	if(organStockDiscardId !=undefined && organStockDiscardId!=null && organStockDiscardId!="" && organStockDiscardId!="null"){
		
		var inputs = [];
		inputs.push('organStockDiscardId=' + organStockDiscardId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organStockDiscard/editOrganStockDiscard",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllOrganStockDiscard(r, "search");
			}
		});
	}
	
}




