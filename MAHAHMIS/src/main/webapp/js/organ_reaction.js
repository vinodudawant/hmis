function toggleReactionDiv() {
	$("#divForNewOrganReaction").toggle('slow');
}
function donorsAutoSuggestionOrgnReaction(inputID) {
	
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
	inputs.push('findText=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
//		url : "ehat/organdonor/donorAutoSuggestion",
		url : "ehat/organReaction/searchDonorFromCheckList",
		cache : false,		
		success : function(r) {
	
			var template = "";
			
					for ( var j = 0; j < r.lstOrganDonorCheckupListDto.length; j++) {
						var arrValue = r.lstOrganDonorCheckupListDto[j].checkupListId +"-"+r.lstOrganDonorCheckupListDto[j].donorName;
						var idValue = r.lstOrganDonorCheckupListDto[j].checkupListId;
						var donorName = r.lstOrganDonorCheckupListDto[j].donorName;
						resultData.push({
							ID : idValue,
							Name : donorName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#odt_Doc_name .typeahead").html(template);
				$("div#odt_Doc_name .typeahead").show();

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
		var donorId = res[0];
		var donorName = res[1];
		
		$("#" + inputID).val(donorName);	
	
		setCheckupList(donorId, inputID);
	}
}


function setCheckupList(checkupListId, inputID){
	
	$("#" + inputID).val("");	
	
	$("#searchType").val(0);
	
	toggleReactionDiv();
	
	if(checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null"){
		
		var inputs = [];
		inputs.push('checkupListId=' + checkupListId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/editOrganDonorCheckupList",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				
				$('#organDonorId').val(r.organDonationRegistrationDto.id);
				$('#checkupListId').val(r.checkupListId);
				$('#treatmentId').val(r.organDonorTreatment.organDonorTreatmentId);	
				$("#prefix").val(r.title);
				$("#firstName").val(r.donorFName);
				$("#middleName").val(r.donorMName);
				$("#lastName").val(r.donorLName);
			
				fetchAllOrgansCollectedByCheckupListId(r.checkupListId);
			}
		});
	}
	
}

function fetchAllOrgansCollectedByCheckupListId(checkupListId){
//	alert("---fetchAllOrgansCollectedByCheckupListId----" + checkupListId);

	var inputs = [];
	inputs.push('checkupListId=' + checkupListId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
	//	url : "ehat/organDonorStockInward/getContainerList",
		url : "ehat/organReaction/getContainerListByChckpId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert("ii"+r.listOrganCollectionDto.length);
			
			setContainersList(r);
			setAllOrganReactions(r);
		}
	});
}

function setContainersList(r){
//	alert("length"+r.listOrganCollectionDto.length );
	var list = "";  
	list = list + "<option value='0'> - Select Container - </option>";
    for ( var i = 0; i < r.listOrganCollectionDto.length; i++) {  

        list = list + "<option value='"+r.listOrganCollectionDto[i].organCollectionId+"' class='un'>" + (r.listOrganCollectionDto[i].organCollectionId+"-"+r.listOrganCollectionDto[i].organDonorTreatment.organDonorTreatmentId+"-"+r.listOrganCollectionDto[i].organName) + "</option>";    
    }  
	$('#organContainer').html(list);
}



function getCollectedOrgnById(){
	
	//var organCollectionId = $('select#organContainer option:selected').val();
	var organCollectionId = $("#organContainer").val();
	//alert("id"+organCollectionId);
	if(organCollectionId !=undefined && organCollectionId!=null && organCollectionId!="" && organCollectionId!="null"){
		var inputs = [];
		inputs.push('organCollectionId=' + organCollectionId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/organDonorStockInward/getOrganCollectionById",
			
			error : function() {
				alert('error');
			},
			success : function(r) {
				setOrganCol(r);
			}
	
		});
	}
}

function setOrganCol(r){
	//alert(JSON.stringify(r));
	$("#organCollectionId").val(r.organCollectionId);
	$("#prefix").val(r.prefix);
	$("#firstName").val(r.firstName);
	$("#middleName").val(r.middleName);
	$("#lastName").val(r.lastName);
	$("#organDonorId").val(r.organDonationRegistrationDto.id);
	$("#checkupListId").val(r.donorCheckupList.checkupListId);
	$("#treatmentId").val(r.organDonorTreatment.organDonorTreatmentId);
	
	
	var htm = "";
	var index = 1;
	
			htm = htm
	
					+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.organName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
					//	+ r.organCollectionId
						+ r.organCollectionId+"-"+r.organDonorTreatment.organDonorTreatmentId+"-"+r.organName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
					//	+ r.surgeryTechniqueId
						+ r.stName
						+ '</td>'
						
						+ ' <td class="col-md-1 center">'
					//	+ r.preservationMethodId
						+ r.preservationMethodName
						+ '</td>'
						
						+ ' <td class="col-md-1 center">'
					//	+ r.coldIschemiaTimeId
						+ r.clodIschemiaTimeName
						+ '</td>'
						
						+ ' <td class="col-md-1 center">'
					//	+ r.collectedByUserId
						+ r.collectedByUsrName
						+ '</td>'
						
						+ ' <td class="col-md-1 center">'
						+ r.remarks
						+ '</td>'
						
						+ '</tr>';
			
	
	$("#organDonorsListDetails").html(htm);
	//$("#prefix").val(r.prefix);
	//$("#firstName").val(r.firstName);
//	$("#middleName").val(r.middleName);
	//$("#lastName").val(r.lastName);

}


function saveOrganReaction(){
	
	var organReactionId = $('#organReactionId').val();
	var organCollectionId = $('#organCollectionId').val();
	var organDonorId= $('#organDonorId').val();
	var treatmentId = $('#treatmentId').val();
	var checkupListId = $('#checkupListId').val();
	
	var prefix = $('#prefix').val();
	if(prefix=="" || prefix == "0"){
		alert("Please enter first name");
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
	
	var pain = $("input:radio[name=pain]:checked").val();
	if(pain == ""){
		alert("Please select pain status");
		return false;
	}
	
	var painRemarks = $('#painRemarks').val();
	if(painRemarks == ""){
		alert("Please enter pain Remarks");
		return false;
	}
	
	var allergyReaction = $("input:radio[name=allergyReaction]:checked").val();
	if(allergyReaction == ""){
		alert("Please select allergy reaction status");
		return false;
	}
	
	var allergyReactionRemarks = $('#allergyReactionRemarks').val();
	if(allergyReactionRemarks == ""){
		alert("Please enter allergy reaction Remarks");
		return false;
	}
	
	var outcome = $('#outcome').val();
	if(outcome == ""){
		alert("Please enter allergy reaction outcome");
		return false;
	}
	
	var organReactionRemarks = $('#organReactionRemarks').val();
	if(organReactionRemarks == ""){
		alert("Please enter allergy reaction Remarks");
		return false;
	}
	
	//document.getElementById("primeLoader").style.display = "block";
	
    var inputs = [];	
	
	inputs.push('organReactionId= '+organReactionId);
	inputs.push('organCollectionId=' + organCollectionId);
	inputs.push('organDonorId= '+organDonorId);
	inputs.push('treatmentId=' +treatmentId);
	inputs.push('checkupListId=' + checkupListId);
	inputs.push('prefix=' + prefix);
	inputs.push('firstName=' + firstName);
	inputs.push('middleName=' + middleName);
	inputs.push('lastName=' + lastName);
	inputs.push('pain=' + pain);
	inputs.push('painRemarks=' + painRemarks);
	inputs.push('allergyReaction=' + allergyReaction);
	inputs.push('allergyReactionRemarks=' + allergyReactionRemarks);
	inputs.push('outcome=' + outcome);
	inputs.push('organReactionRemarks=' + organReactionRemarks);
	var str = inputs.join('&');
	
		jQuery.ajax({
		type : "POST",
		url : "ehat/organReaction/saveOrganReaction",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Organ Reaction Saved Sucessfully");
				getAllDonorReactions();
				toggleReactionDiv();
				
				location.reload(true);
			}else if (data == 2) {
				alertify.success( "Organ Reaction Updated Sucessfully");
				getAllDonorReactions();
				toggleReactionDiv();
				
				location.reload(true);
			}
			
			//document.getElementById("primeLoader").style.display = "none";
		}
	});	
}

function getAllDonorReactions(){
	
	var unitId = $("#unitId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('lastDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organReaction/getAllOrganReactions",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllOrganReactions(r, "All");
		}
	});
}

function setAllOrganReactions(r, CallFrom) {

	var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		 
		if (CallFrom == "All") {
		
			for ( var i = 0; i < r.listOrganReactionDto.length; i++) {
			//	alert(r.listOrganReactionDto.length);
				
				var createdDate = new Date(r.listOrganReactionDto[i].createdDate);
				var	displayCreatedDate = createdDate.getDate().toString() + "-" + createdDate.getUTCMonth().toString() + "-" + createdDate.getFullYear();
			
				//var checkListDate = new Date(r.listOrganReactionDto[i].organDonorCheckupListDto.createdDate);
				var checkListDate = new Date(r.listOrganReactionDto[i].checkUpDate);
				var	displaycheckListDate = checkListDate.getDate().toString() + "-" + checkListDate.getUTCMonth().toString() + "-" + checkListDate.getFullYear();
				
				
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganReactionDto[i].organReactionId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganReactionDto[i].donorId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganReactionDto[i].prefix+" "+r.listOrganReactionDto[i].firstName+" "+r.listOrganReactionDto[i].middleName+" "+r.listOrganReactionDto[i].lastName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ displayCreatedDate
						+ '</td>'
						/*+ ' <td class="col-md-1 center">'
						+ r.listOrganReactionDto[i].organCollectionDto.organName
						+ '</td>'*/
						+ ' <td class="col-md-1 center">'
						+ r.listOrganReactionDto[i].organName
						+ '</td>'
						
						+ ' <td class="col-md-1 center">'
						+ displaycheckListDate
						+ '</td>';
						if(r.listOrganReactionDto[i].isStockInward=="Y"){
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button disabled class="btn btn-xs btn-success" onclick=editDonorReactions('
							+ r.listOrganReactionDto[i].organReactionId
							+ ')><i class="fa fa-edit"></i></button></td>';
						}else{
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editDonorReactions('
							+ r.listOrganReactionDto[i].organReactionId
							+ ')><i class="fa fa-edit"></i></button></td>';
						}
					/*	+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonorReactions('
						+ r.listOrganReactionDto[i].organReactionId
						+ ')><i class="fa fa-trash-o"></i></button></td>'*/
						htm = htm + '</tr>';
						
						
				index++;
			   }
		
			}
			else{
				for ( var i = 0; i < r.listOrganReactionDto.length; i++) {
					
					var createdDate = new Date(r.listOrganReactionDto[i].createdDate);
					var	displayCreatedDate = createdDate.getDate().toString() + "-" + createdDate.getUTCMonth().toString() + "-" + createdDate.getFullYear();
				
					//var checkListDate = new Date(r.listOrganReactionDto[i].organDonorCheckupListDto.createdDate);
					var checkListDate = new Date(r.listOrganReactionDto[i].checkUpDate);
					var	displaycheckListDate = checkListDate.getDate().toString() + "-" + checkListDate.getUTCMonth().toString() + "-" + checkListDate.getFullYear();
					
					
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.listOrganReactionDto[i].organReactionId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.listOrganReactionDto[i].donorId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.listOrganReactionDto[i].prefix+" "+r.listOrganReactionDto[i].firstName+" "+r.listOrganReactionDto[i].middleName+" "+r.listOrganReactionDto[i].lastName
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ displayCreatedDate
							+ '</td>'
							/*+ ' <td class="col-md-1 center">'
							+ r.listOrganReactionDto[i].organCollectionDto.organName
							+ '</td>'*/
							+ ' <td class="col-md-1 center">'
							+ r.listOrganReactionDto[i].organName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ displaycheckListDate
							+ '</td>';
							if(r.listOrganReactionDto[i].isStockInward=="Y"){
								htm = htm	+ ' <td class="col-md-1 center">'
								+ '	<button disabled class="btn btn-xs btn-success" onclick=editDonorReactions('
								+ r.listOrganReactionDto[i].organReactionId
								+ ')><i class="fa fa-edit"></i></button></td>';
							}else{
								htm = htm	+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editDonorReactions('
								+ r.listOrganReactionDto[i].organReactionId
								+ ')><i class="fa fa-edit"></i></button></td>';
							}
						/*	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonorReactions('
							+ r.listOrganReactionDto[i].organReactionId
							+ ')><i class="fa fa-trash-o"></i></button></td>'*/
							htm = htm + '</tr>';
							
							
					index++;
				
			
				}
				
			}
		$("#organReactionTable").html(htm);
		
	}
}


function editDonorReactions(organReactionId){
	if(organReactionId !=undefined && organReactionId!=null && organReactionId!="" && organReactionId!="null"){
		var inputs = [];
		inputs.push('organReactionId=' + organReactionId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organReaction/editDonorReactions",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleReactionDiv();
				fetchAllOrgansCollectedByCheckupListId(r.organDonorCheckupListDto.checkupListId);
				$("#prefix").val(r.prefix);
				$("#firstName").val(r.firstName);
				$("#middleName").val(r.middleName);
				$("#lastName").val(r.lastName);
				
				$('#organDonorId').val(r.organDonationRegistrationDto.id);
				$('#organReactionId').val(r.organReactionId);
				$('#organCollectionId').val(r.organCollectionDto.organCollectionId);
				$("#treatmentId").val(r.organDonorTreatmentDto.organDonorTreatmentId);
				$("#checkupListId").val(r.organDonorCheckupListDto.checkupListId);
				
				var pain = r.pain;
				if(pain == "Y"){
					$("#painY").attr("checked","checked");
				}else if(pain == "N"){
					$("#painN").attr("checked","checked");
				}
				$("#painRemarks").val(r.painRemarks);
				
				var allergyReaction = r.allergyReaction;
				if(allergyReaction == "Y"){
					$("#allergyReactionY").attr("checked","checked");
				}else if(allergyReaction == "N"){
					$("#allergyReactionN").attr("checked","checked");
				}
				$("#allergyReactionRemarks").val(r.allergyReactionRemarks);
				$("#outcome").val(r.outcome);
				$("#organReactionRemarks").val(r.organReactionRemarks);
				$('select#organContainer option:selected').val(r.organCollectionDto.organCollectionId);
				$("#patientId").val(r.organDonationRegistrationDto.patientRegistered.patientId);
				getCollectedOrgnById();
				//cleardonorreaction();
				
			}
		});
	}
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
			$("#prefix").html(html);
		}
	});
}

function getContainerListNew()
{
	$.ajax({
		type : "GET",
		url : "ehat/organReaction/getContainerListNew",
		async : false,
		error : function() {
			alert("Something Went Wrong!!")
		},
		success : function(r) {
			setContainersList(r);
		}
	});
}

//Added By Annapurna
function getDonarTreatment(organReactionId){
	var inputs = [];
	inputs.push('organTreatId=' + organReactionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organdonor/editOrganDonorTreatment",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			var htm = "";
			var index = 1;
			
				
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.organDonorTreatmentId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.organDonationRegistrationDto.id
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.prefix +" "+ r.firstName +" "+ r.middleName +" "+ r.lastName 
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorTreatment('
							+ r.organDonationRegistrationDto.id+","+r.organDonorTreatmentId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorTreatment('
							+ r.organDonorTreatmentId	
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							
							if(r.isCheckup == "Y"){
								htm = htm + ' <td class="col-md-1 center">'
						//	+ '	<button class="btn btn-xs btn-info"  disabled   onclick=sendDonorToCheckupList('
							+ '	<button class="btn btn-xs btn-info"   onclick=sendDonorToCheckupList('
							+ r.organDonationRegistrationDto.id+","+r.organDonationRegistrationDto.patientId+","+r.organDonorTreatmentId
							+ ')><i class="fa fa-cloud-upload"></i></button></td>'
							}else{
								htm = htm + ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-info" onclick=sendDonorToCheckupList('
								+ r.organDonationRegistrationDto.id+","+r.organDonationRegistrationDto.patientId+","+r.organDonorTreatmentId
								+ ')><i class="fa fa-cloud-upload"></i></button></td>'
							}
							
					htm = htm
							+ '</tr>';
					
				
		
			$("#organDonorsTreatmentListDetails").html(htm);

			
		}
	});



}
// function Added By Annapurna fetching data byreaction searchbyid

function donorsAutoSuggestionOrgnReactionnew(inputID) {
	
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
	inputs.push('organReactionId=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
//		url : "ehat/organdonor/donorAutoSuggestion",
		url : "ehat/organReaction/organReactionAutoSuggestion",
		cache : false,		
		success : function(r) {
			//alert(r);
			var template = "";
			
					for ( var j = 0; j < r.listOrganReactionDto.length; j++) {
						
					//	alert( r.listOrganDonationRegistrationDto[j].id +"-"+r.listOrganDonationRegistrationDto[j].donorName +"-"+r.listOrganDonationRegistrationDto[j].mobile);
						var arrValue = r.listOrganReactionDto[j].organReactionId +"-"+r.listOrganReactionDto[j].prefix +"-"+r.listOrganReactionDto[j].firstName+"-"+r.listOrganReactionDto[j].middleName+"-"+r.listOrganReactionDto[j].lastName;
						//var arrValue = r.listOrganReactionDto[j].organReactionId +"-"+r.listOrganReactionDto[j].donorName;
						var idValue = r.listOrganReactionDto[j].organReactionId;
						var donorName = r.listOrganReactionDto[j].firstName;
						resultData.push({
							ID : idValue,
							Name : donorName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#odt_Doc_name .typeahead").html(template);
				$("div#odt_Doc_name .typeahead").show();

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
		var organReactionId = res[0];
		var donorName = res[1];
		
		$("#" + inputID).val(donorName);	
		if(organReactionId !=0 && organReactionId!=undefined && organReactionId!=""&& organReactionId!=null){
			getOrganReactionById(organReactionId);
		}
		
	}
}


function getOrganReactionById(organReactionId){
	if(organReactionId !=undefined && organReactionId!=null && organReactionId!="" && organReactionId!="null"){
		
		var inputs = [];
		inputs.push('organReactionId=' + organReactionId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organReaction/getOrganReactionById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllOrganReactionsnew(r, "search");
			}
		});
	}
}

function setAllOrganReactionsnew(r,callfrom){
	var htm = "";
	var index = 1;
				
				var createdDate = new Date(r.createdDate);
				var	displayCreatedDate = createdDate.getDate().toString() + "-" + createdDate.getUTCMonth().toString() + "-" + createdDate.getFullYear();
			
				
				var checkListDate = new Date(r.checkUpDate);
				var	displaycheckListDate = checkListDate.getDate().toString() + "-" + checkListDate.getUTCMonth().toString() + "-" + checkListDate.getFullYear();
				
				
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.organReactionId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.organDonationRegistrationDto.id
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.prefix+" "+r.firstName+" "+r.middleName+" "+r.lastName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ displayCreatedDate
						+ '</td>'
						/*+ ' <td class="col-md-1 center">'
						+ r.listOrganReactionDto[i].organCollectionDto.organName
						+ '</td>'*/
						+ ' <td class="col-md-1 center">'
						+ r.organDonationRegistrationDto.donateOrganName
						+ '</td>'
						
						+ ' <td class="col-md-1 center">'
						+ displaycheckListDate
						+ '</td>';
						if(r.isStockInward=="Y"){
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button disabled class="btn btn-xs btn-success" onclick=editDonorReactions('
							+ r.organReactionId
							+ ')><i class="fa fa-edit"></i></button></td>';
						}else{
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editDonorReactions('
							+ r.organReactionId
							+ ')><i class="fa fa-edit"></i></button></td>';
						}
					/*	+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonorReactions('
						+ r.listOrganReactionDto[i].organReactionId
						+ ')><i class="fa fa-trash-o"></i></button></td>'*/
						htm = htm + '</tr>';
						
           $("#organReactionTable").html(htm);
	
}
//Added By Annapurna
function getContainerListfororgan_reaction()
{
	$.ajax({
		type : "GET",
		url : "ehat/organReaction/getContainerListfororgan_reaction",
		async : false,
		error : function() {
			alert("Something Went Wrong!!")
		},
		success : function(r) {
			setContainersList(r);
		}
	});
}

function getDonorDetailsByIdOrganDonation(id){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bloodBank/getDonorDetailsByIdOrganDonation",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			var htm = "";
			var index = 1;
			if(r !="" && r!=undefined){
				 
				
				
					for ( var i = 0; i < r.lstDonorReactionDto.length; i++) {
					//	alert(r.listOrganReactionDto.length);
						
						var datetime1= new Date(r.lstDonorReactionDto[i].createdDate).toLocaleDateString('en-GB');						
						htm = htm
								+ '<tr> '
								+ ' <td class="col-md-1 center">'
								+ index
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstDonorReactionDto[i].donorReactionId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstDonorReactionDto[i].donor_id
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstDonorReactionDto[i].donorTreatmentId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstDonorReactionDto[i].donor_name
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ datetime1
								+ '</td>'
							if(r.lstDonorReactionDto[i].testingStatus == "Y"){
							htm = htm + ' <td class="col-md-1 center">'
							+ '	<button disabled class="btn btn-xs btn-success" onclick=editDonorReaction('
							+ r.lstDonorReactionDto[i].donorTreatmentId
							+ ')><i class="fa fa-edit"></i></button></td>'
							}else{
							htm = htm	+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editDonorReaction('
								+ r.lstDonorReactionDto[i].donorTreatmentId
								+ ')><i class="fa fa-edit"></i></button></td>'
							}
							htm = htm + ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonorReaction('
							+ r.lstDonorReactionDto[i].donorReactionId	
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							
							+ '</tr>';
											
						index++;
					   }
				
					$("#BloodDonorReactionListDetails").html(htm);

				}
		   }
		});	
	
 }

//added by sandip 
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}

