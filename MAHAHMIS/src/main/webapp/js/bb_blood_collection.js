
function getBloodDonorTreatmentDetailsforCollectionById(id,callform){	
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('callform=' + callform);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/donor/getBloodDonorTreatmentDetailsById",
		data : str + "&reqType=AJAX",
		error : function() {
			//alert('error');
		},
		success : function(r) {
			$('#diveForEntryBloodBagCollection').show();
			$('#title').select2('val',r.title);
			$('#blood_user_title').attr('disabled', 'disabled');
			$('#blood_first_name').val(r.donorFname);
			$('#blood_first_name').attr('disabled', 'disabled');
			$('#blood_middle_name').val(r.donorMname);
			$('#blood_middle_name').attr('disabled', 'disabled');
			$('#blood_last_name').val(r.donorLname);
			$('#blood_last_name').attr('disabled', 'disabled');
			$('#donorTreatmentId').val(r.maxDonorTreatmentId);
		}
	});
	

}
function searchBloodCollectionDonorDonorByName(value,callform){

	var resultData = [];
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/searchDonorByName",
		data :{
			searchName : value ,
			callfrom : callform
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.length; j++) {
				var donorName= r[j].donorFname+" "+r[j].donorLname;
				var arrValue = r[j].maxDonorTreatmentId +"-"+donorName+"-"+r[j].contactNumber1;
				var donorId = r[j].maxDonorTreatmentId;
				var donorFname = r[j].donorFname;
				resultData.push({
					ID : donorId,
					Name : arrValue
				});
				template = template + '<li data-value="' + donorId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#divtext_search_name_collection .typeahead").html(template);
				$("#divtext_search_name_collection .typeahead").show();
				
				$("#text_search_name_collection").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
			
				
				$("#text_search_name_collection").data('typeahead').source = resultData;
			
				
			}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
		$("#text_search_name_collection").val(name);	
		getAllBloodBagCollectionDonorById(id);
		
	}

}

function getAllBloodBagCollectionDonorList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bloodBank/getAllBloodBagCollectionDonorList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
		//	$('#diveForEntryBloodBagCollection').hide();
			setAllBloodBagCollectionDonorList(r,"ALL");
		}
	});	
}

function setAllBloodBagCollectionDonorList(r,callform){

	//alert('.............r..'+JSON.stringify(r));

	var htm = "";
	var index = 1;
	if (callform == "ALL") {
	//	var datetime= new Date(r.listDonorBloodBagDetails[i].createdDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});

		for ( var i = 0; i < r.length; i++) {
		var datetime= new Date(r[i].createdDate).toLocaleString('en-GB');

			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodBagDetailsId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_treatment_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodBagDetails
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].typeOfBloodBag
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].collectedBy
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datetime
					+ '</td>'
					if(r[i].reactionStatus == "Y"){
					htm = htm	+ ' <td class="col-md-1 center">'
						+ '	<button disabled  class="btn btn-xs btn-success"  onclick=editBloodBagCollectionDonorList('
						+r[i].donor_treatment_id
						+ ')><i class="fa fa-edit"></i></button></td>'
					}else{
					htm = htm	+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBloodBagCollectionDonorList('
						+r[i].donor_treatment_id
						+ ')><i class="fa fa-edit"></i></button></td>'
					}
				
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deletedBloodBagCollectionDonorList('
					+ r[i].donor_treatment_id	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					/*+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-info" onclick=sendBloodDonorToBloodBagCollectionList('
					+ r[i].donor_id+","+r[i].donor_treatment_id
					+ ')><i class="fa fa-cloud-upload"></i></button></td>'*/
					+ '</tr>';
			index++;
		}
	}else{
		
	//	for ( var i = 0; i < r.length; i++) {
		//var datetime= new Date(r.listDonorBloodBagDetails[i].createdDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
		var datetime1= new Date(r.createdDate).toLocaleString('en-GB');
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.bloodBagDetailsId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.donorTreatment.donorMaster.donorId	
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.donorTreatment.donorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.donorTreatment.donorMaster.donorFname+" "+r.donorTreatment.donorMaster.donorMname+" "+r.donorTreatment.donorMaster.donorLname
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.bloodBagDetails
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.typeOfBloodBag
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.collectedBy
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datetime1
					+ '</td>'
					if(r.reactionStatus == "Y"){
					htm = htm	+ ' <td class="col-md-1 center">'
						+ '	<button disabled class="btn btn-xs btn-success" onclick=editBloodBagCollectionDonorList('
						+ r.donorTreatment.donorMaster.donorId+","+r.donorTreatment.donorTreatmentId
						+ ')><i class="fa fa-edit"></i></button></td>'
					}else{
					htm = htm	+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBloodBagCollectionDonorList('
						+ r.donorTreatment.donorMaster.donorId+","+r.donorTreatment.donorTreatmentId
						+ ')><i class="fa fa-edit"></i></button></td>'
					}
					
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deletedBloodBagCollectionDonorList('
					+ r.donorTreatment.donorTreatmentId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					/*+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-info" onclick=sendBloodDonorToBloodBagCollectionList('
					+ r[i].donor_id+","+r[i].donorTreatmentId
					+ '); toggleBloodBagCollectionListDiv()><i class="fa fa-cloud-upload"></i></button></td>'*/
					+ '</tr>';
			index++;
	//}
	}
	$("#BloodDonorsBloodBagCollectionListDetails").html(htm);


}

function editBloodBagCollectionDonorList(donor_treatment_id){

	$("#diveForEntryBloodBagCollection").show('slow');
	if(donor_treatment_id !=undefined && donor_treatment_id!=null && donor_treatment_id!="" && donor_treatment_id!="null"){
		var inputs = [];
		inputs.push('id=' + donor_treatment_id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/bloodBank/editBloodBagCollectionDonorList",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
			
				//toggleBloodBagCollectionListDiv();
				for(var i=0; i<r.listDonorBloodBagDetails.length; i++){
				$('#donorId').val(r.listDonorBloodBagDetails.donorId);
				$('#bloodBagDetailsId').val(r.listDonorBloodBagDetails[0].bloodBagDetailsId);
				$('#donorId').attr('disabled', 'disabled');
				$("#title").val(r.listDonorBloodBagDetails[0].patient_title_name)
				$('#title').attr('disabled', 'disabled');;
				//$('#blood_user_title').attr('disabled', 'disabled');
				$("#blood_first_name").val(r.listDonorBloodBagDetails[0].first_name);
				$('#blood_first_name').attr('disabled', 'disabled');
				$("#blood_middle_name").val(r.listDonorBloodBagDetails[0].middle_name);
				$('#blood_middle_name').attr('disabled', 'disabled');
				$("#blood_last_name").val(r.listDonorBloodBagDetails[0].last_name);
				$('#blood_last_name').attr('disabled', 'disabled');				
				$("#type_of_blood_bag option:selected").text(r.listDonorBloodBagDetails[0].typeOfBloodBag);
				$('#volume_of_collection').val(r.listDonorBloodBagDetails[0].volumeOfCollection);
				$('#blood_item_name option:selected').text(r.listDonorBloodBagDetails[0].bloodItemName);
				$('#blood_bag_details_remarks').val(r.listDonorBloodBagDetails[0].bloodBagDetailsRemarks);
				$('#no_of_barcode').val(r.listDonorBloodBagDetails[0].quantity);
				$('#blood_group ').val(r.listDonorBloodBagDetails[0].bloodGroup);
				$('#donorTreatmentId').val(r.listDonorBloodBagDetails[0].donorTreatmentId);
				$('#collected_by option:selected').text(r.listDonorBloodBagDetails[0].collectedBy);
				$('#blood_bag_details option:selected').text(r.listDonorBloodBagDetails[0].bloodBagDetails);
				//window.location.reload(true);		
				}
			}
		});
	}


}

function deletedBloodBagCollectionDonorList(donorTreatmentId){

	if(donorTreatmentId !=undefined && donorTreatmentId!=null && donorTreatmentId!="" && donorTreatmentId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/bloodBank/deletedBloodBagCollectionDonorList",
				data : {
					"donorTreatmentId" : donorTreatmentId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllBloodBagCollectionDonorList();
				}
			});
		}
	}

}

function getAllBloodBagCollectionDonorById(id){
	if(id !=undefined && id != null && id != "" && id != "null"){
		
		var inputs = [];
		inputs.push('id=' + id);
		//inputs.push('callform=' + callform)
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/donor/getbagDetailsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllBloodBagCollectionDonorList(r, "search");
				
			}
		});
		
	}
	


}

function searchDonorReactionByName(value,callform){


	var resultData = [];
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/searchDonorByName",
		data :{
			searchName : value ,
			callfrom : callform
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.length; j++) {
				var donorName= r[j].donorFname+" "+r[j].donorLname;
				var arrValue = r[j].maxDonorTreatmentId +"-"+donorName+"-"+r[j].contactNumber1;
				var donorId = r[j].maxDonorTreatmentId;
				var donorFname = r[j].donorFname;
				resultData.push({
					ID : donorId,
					Name : arrValue
				});
				template = template + '<li data-value="' + donorId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#header_search_donor_reaction .typeahead").html(template);
				$("#header_search_donor_reaction .typeahead").show();
				
				$("#text_search_name_reaction").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
			
				
				$("#text_search_name_reaction").data('typeahead').source = resultData;
			
				
			}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
		$("#text_search_name_reaction").val(name);	
		getAllBloodBagFReactionDonorById(id,"recation");
		
	}

}

function getAllBloodBagFReactionDonorById(id,callform){
	if(id !=undefined && id != null && id != "" && id != "null"){
		
		var inputs = [];
		inputs.push('id=' + id);
		//inputs.push('callform=' + callform)
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/donor/getbagDetailsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				//alert(JSON.stringify(r))
				if(r.reactionStatus == "Y"){
					alert("Blood Group Testing Done");
				}else{
				if(callform=="recation"){
					$('#title').select2('val',r.donorTreatment.donorMaster.title);
					$('#title').select2('disable');
					$('#txt_first_name').val(r.donorTreatment.donorMaster.donorFname);
					$('#txt_first_name').attr('disabled','disabled');
					$('#txt_middle_name').val(r.donorTreatment.donorMaster.donorMname);
					$('#txt_middle_name').attr('disabled','disabled');
					$('#txt_last_name').val(r.donorTreatment.donorMaster.donorLname);
					$('#txt_last_name').attr('disabled','disabled');
					$('#sel_bloodBagNumber option:selected').text(r.bloodBagDetails);
					$('#donorTreatmentId').val(r.donorTreatment.donorTreatmentId);
					setBagDetailsByTreatmentId(r);
					
					
				}
			}
				
				
			}
		});
		
	}
}

function getAllDonorReaction(){

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bloodBank/getAllDonorReaction",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorReactionDetailsList(r,"ALL");
		}
	});	

}

function setAllDonorReactionDetailsList(r, callform){
	var htm = "";
	var index = 1;
	
		for ( var i = 0; i < r.length; i++) {
			var datetime= new Date(r[i].createdDate).toLocaleDateString('en-GB');
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorReactionId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datetime
					+ '</td>'
					if(r[i].testingStatus == "Y"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button disabled class="btn btn-xs btn-success" onclick=editDonorReaction('
					+ r[i].donorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'
					}else{
					htm = htm	+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editDonorReaction('
						+ r[i].donorTreatmentId
						+ ')><i class="fa fa-edit"></i></button></td>'
					}
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonorReaction('
					+ r[i].donorReactionId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					+ '</tr>';
			index++;
		}
		$('#BloodDonorReactionListDetails').html(htm);
}

function editDonorReaction(id){
	$("#divForReg").show('slow');

	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/bloodBank/editDonorReaction",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				for(var i=0; i< r.lstDonorReactionDto.length;i++){
					$('#donorReactionId').val(r.lstDonorReactionDto[0].donorReactionId);
					$('#donorTreatmentId').val(r.lstDonorReactionDto[0].donorTreatmentId);	
					$('#title').select2('val',r.lstDonorReactionDto[0].title)
					$('#title').select2('disable');
					$('#txt_first_name').val(r.lstDonorReactionDto[0].firstName);
					$('#txt_first_name').attr('disabled','disabled');
					$('#txt_middle_name').val(r.lstDonorReactionDto[0].middleName);
					$('#txt_middle_name').attr('disabled','disabled');
					$('#txt_last_name').val(r.lstDonorReactionDto[0].lastName);
					$('#txt_last_name').attr('disabled','disabled');
					$('#pain_details').val(r.lstDonorReactionDto[0].painDetails)
					$('#allergy_reaction_details').val(r.lstDonorReactionDto[0].allergyReactionDetails);
					$('#outcome_details').val(r.lstDonorReactionDto[0].outcomeDetails);	
					$('#ta_remarks').val(r.lstDonorReactionDto[0].remark);
					$("input:radio[name='ra_pain'][value='"+r.lstDonorReactionDto[0].pain+"']").prop("checked",true);
					$("input:radio[name='ra_allergy_reaction'][value='"+r.lstDonorReactionDto[0].allergyReaction+"']").prop("checked",true);
					$("input:radio[name='ra_outcome'][value='"+r.lstDonorReactionDto[0].outcome+"']").prop("checked",true);
					getAllBloodBagFReactionDonorByIdEdit(r.lstDonorReactionDto[0].donorTreatmentId);
				}
				
			}
		});
	}



	
}

function getAllBloodBagFReactionDonorByIdEdit(id){

	//alert("hi");
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getbagDetailsByTreatmentId",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		//getCheckUpListByTreatmentId('reaction');
			setBagDetailsByTreatmentIdEdit(r);
			
		}
	});

}

function setBagDetailsByTreatmentIdEdit(r){
	var list = "<option value=0 class='un'>SELECT</option>";
		
	   // for ( var i = 0; i < r.length; i++) {  

	        list = list + "<option value='"+r.bloodBagDetailsId+"' class='un' onclick='getCheckUpListByTreatmentId(),getDetailsByBloodBag("+r.bloodBagDetailsId+")'>" + (r.bloodBagDetails) + "</option>";    
	    //}  
	   
	    $("#sel_bloodBagNumber").html(list);
	  	  
	}

function deleteDonorReaction(donorReactionId){


	if(donorReactionId !=undefined && donorReactionId!=null && donorReactionId!="" && donorReactionId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/bloodBank/deleteDonorReaction",
				data : {
					"donorReactionId" : donorReactionId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllDonorReaction();
				}
			});
		}
	}
	
}

function getAllBloodGroupTestingList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bloodBank/getAllBloodGroupTestingList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodGroupTestingDetailsList(r,"ALL");
		}
	});	
	
}

function setAllBloodGroupTestingDetailsList(r,callform){
	
	var htm = "";
	var index = 1;
	
		for ( var i = 0; i < r.length; i++) {
			var datetime1= new Date(r[i].createdDate).toLocaleString('en-GB');
		//	alert(JSON.stringify());
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodGroupTestingId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodBagNumber
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datetime1
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBloodGroupTesting('
					+ +r[i].donorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodGroupTesting('
					+ r[i].bloodGroupTestingId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					+ '</tr>';
			index++;
		}
		$('#BloodDonorGroupTestingListDetails').html(htm);
}

function editBloodGroupTesting(id){
	 $("#divForBloodTesting").show('slow');	
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/bloodBank/editBloodGroupTesting",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				for(var i=0; i< r.lstBloodGroupTestingDto.length;i++){
				//	alert('.............r..'+r.lstBloodGroupTestingDto[0].collectedDate);
					var collectedDate1= new Date(r.lstBloodGroupTestingDto[0].collectedDate).toLocaleString('en-GB');
			
					$('#bloodGroupTestingId').val(r.lstBloodGroupTestingDto[0].bloodGroupTestingId);
					$('#donorTreatmentId').val(r.lstBloodGroupTestingDto[0].donorTreatmentId);	
					var donor_name = r.lstBloodGroupTestingDto[0].donor_name;
					var donorN= donor_name.split('-');
					var Patient_title_name =donorN[0];
					var fName=donorN[1];
					var mName=donorN[2];
					var lName=donorN[3];
					$('#title').val(Patient_title_name);
					$('#title').attr('disabled','disabled');
					$('#first_name').val(fName);
					$('#first_name').attr('disabled','disabled');
					$('#middle_name').val(mName);
					$('#middle_name').attr('disabled','disabled');
					$('#last_name').val(lName);
					$('#last_name').attr('disabled','disabled');
					$('#bl_blood_bag_no ').text(r.lstBloodGroupTestingDto[0].bloodBagNumber);
					$('#bl_type_blood_bag' ).text(r.lstBloodGroupTestingDto[0].type_of_blood_bag);
       			    $('#bl_group ').text(r.lstBloodGroupTestingDto[0].bloodgroupname_txt);
					$('#bl_blood_item_no ').text(r.lstBloodGroupTestingDto[0].blood_item_name);
					$('#bl_volume_collection ').text(r.lstBloodGroupTestingDto[0].volume_of_collection);
					$('#bl_date_collection ').text(collectedDate1);
					$('#bl_remarks ').text(r.lstBloodGroupTestingDto[0].blood_bag_details_remarks);
					$('#blood_group_testing_remark').val(r.lstBloodGroupTestingDto[0].bloodGroupTestingRemark);		
					$("input:radio[name='forward_serology'][value='"+r.lstBloodGroupTestingDto[0].bloodCellGrouping+"']").prop("checked",true);
					$("input:radio[name='reverse_serology'][value='"+r.lstBloodGroupTestingDto[0].bloodSerumGrouping+"']").prop("checked",true);
					//Added By Annapurna
					$('#blood_group_group_testing').select2('val',r.lstBloodGroupTestingDto[0].bloodGroup);
					var bloodGroupName=$('#blood_group_group_testing option:selected').text();					
					$('#bl_group ').text(bloodGroupName);
					var htmForbloodbag = "<option value='"+r.lstBloodGroupTestingDto[0].bloodBagNumbe+"'>"+r.lstBloodGroupTestingDto[0].bloodBagNumber+"</option>";
					$("#type_of_blood_bag_gropu_testing").html(htmForbloodbag);

					getDonorDetailsnew();
					getAllBloodGroupMaster();//Added By Annapurna
				}
				
			}
		});
	}



	
}
function deleteBloodGroupTesting(bloodGroupTestingId){


	if(bloodGroupTestingId !=undefined && bloodGroupTestingId!=null && bloodGroupTestingId!="" && bloodGroupTestingId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/bloodBank/deleteBloodGroupTesting",
				data : {
					"bloodGroupTestingId" : bloodGroupTestingId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllBloodGroupTestingList();
				}
			});
		}
	}
	
}
function getAllSampleDispatch(){



	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bloodBank/getAllSampleDispatch",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodSampleDispatchDetailsList(r,"ALL");
		}
	});	
	

}
function setAllBloodSampleDispatchDetailsList(r,callform){

	var htm = "";
	var index = 1;
	
		for ( var i = 0; i < r.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodGroupTestingId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodBagNumber
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].createdDate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBloodSampleDispatch('
					+ r[i].donor_id+","+r[i].donorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodSampleDispatch('
					+ r[i].donorTreatmentId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					+ '</tr>';
			index++;
		}
		$('#BloodSampleDispatchListDetails').html(htm);

	
}

function editBloodSampleDispatch(id){
	
}

function deleteBloodSampleDispatch(id){
	
}

function getAllTestRegister (){


	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bloodBank/getAllTestRegister",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllTestRegisterDetailsList(r,"ALL");
		}
	});	
}

function setAllTestRegisterDetailsList(r,callform){

	var htm = "";
	var index = 1;

	
		for ( var i = 0; i < r.length; i++) {
				var sampleItemName= r[i].sel_component_seperation
				if(sampleItemName==1){
		        	sampleItemName='Red cell serology';
		              }
	            	else{
		             sampleItemName='Transfusion Transmitted Disease Lab';
		              }	
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodGroup
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].dateOfBagCollection
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ sampleItemName			
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editTestRegister('
					+ r[i].testRegisterId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteTestRegister('
					+ r[i].testRegisterId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					+ '</tr>';
			index++;
		}
		$('#BloodDonorTestRegisterListDetails').html(htm);
}
function editTestRegister(id){
	$("#divTestRegister").show('slow');
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/bloodBank/editTestRegister",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
			     	$('#sel_component_seperation').select2('val',r.sel_component_seperation);
			     	$('#sel_bloodBagNumber').select2('val',r.bloodBagNumber);
					$('#bagno1').val(r.bloodBagNumber);<!--Added By Annapurna  -->
					
					$('#testRegisterId').val(r.testRegisterId);
					$('#donorTreatmentId').val(r.donorTreatmentId);	
					$('#date_of_bag_collection').val(r.dateOfBagCollection);
					$('#txt_blood_group').val(r.bloodGroupName);
					$('#txt_blood_group').attr('disabled','disabled');
					var donor_name = r.donor_name;
					var donorN= donor_name.split('-');
					var title =donorN[0];
					var fName=donorN[1];
					var mName=donorN[2];
					var lName=donorN[3];
					$('#title').select2('val',title)
					$('#title').select2('disable');
					$('#txt_first_name').val(fName);
					$('#txt_first_name').attr('disabled','disabled');
					$('#txt_middle_name').val(mName);
					$('#txt_middle_name').attr('disabled','disabled');
					$('#txt_last_name').val(lName);
					$('#txt_last_name').attr('disabled','disabled');
					$('#reamrk_test_1').val(r.remark);
					$('#remarks_test_register').val(r.testremark);
					getDonorDetails();
					$('#callfrom').val('update');
					var htmBody="";
					for ( var i = 0; i < r.testRegisterSlave.length; i++) {
						//alert("---length----"+r.length);
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' id='test_name_"+(i+1)+"' >" + r.testRegisterSlave[i].testName + "</td>"
						+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_result_"+(i+1)+"' placeholder='Result' value="+ r.testRegisterSlave[i].testResult +"></td>"
						+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='date_time_result_test_"+(i+1)+"' value="+r.testRegisterSlave[i].dateTime+"></td>"
						+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='reamrk_test_"+(i+1)+"' value="+r.testRegisterSlave[i].remark+"></td>";
					
					}
				
				
				$("#testRegisterDetailsBody").html(htmBody);

				
			}
		});
	}



	

}
function deleteTestRegister(testRegisterId){



	if(testRegisterId !=undefined && testRegisterId!=null && testRegisterId!="" && testRegisterId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/bloodBank/deleteTestRegister",
				data : {
					"testRegisterId" : testRegisterId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllTestRegister();
				}
			});
		}
	}	
	
}

function getAllComponentSeperationList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bloodBank/getAllComponentSeperationList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllComponentSeperationDetailsList(r,"ALL");
		}
	});	

}

function setAllComponentSeperationDetailsList(r,callform){


	var htm = "";
	var index = 1;
	
		for ( var i = 0; i < r.length; i++) {
			
			var expiryDateSplit1 = r[i].expiryDate.split('-');
			var expirydate=expiryDateSplit1[2]+ "/" +expiryDateSplit1[1]+ "/" +expiryDateSplit1[0];
			var inwardDateSplit =  r[i].dateOfBagCollection.split('-');
			var collectionDate=inwardDateSplit[0]+ "/" +inwardDateSplit[1]+ "/" +inwardDateSplit[2];
			
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].blood_bag_details
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].componentName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].volume
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ expirydate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bagDetails
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ collectionDate
					+ '</td>'
					if(r[i].bloodBagStatus == 2){
						htm = htm	+ ' <td class="col-md-1 center">'
						+ '	<button disabled class="btn btn-xs btn-success" onclick=editComponentSeperation('
						+ r[i].donorTreatmentId+","+r[i].componentSeperationId
						+ ')><i class="fa fa-edit"></i></button></td>'
					}else{
						htm = htm + ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editComponentSeperation('
						+ r[i].donorTreatmentId+","+r[i].componentSeperationId
						+ ')><i class="fa fa-edit"></i></button></td>'
					}
					
			htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteComponentSeperation('
					+ r[i].componentSeperationId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					+ '</tr>';
			index++;
		}
		$('#BloodComponentSeperationListDetails').html(htm);

}
function editComponentSeperation(id,componentSeperationId){
	$("#divComponentSeperation").show('slow');
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
		inputs.push('componentSeperationId=' + componentSeperationId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/bloodBank/editComponentSeperation",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
					$('#componentSeperationId').val(r.componentSeperationId);
					$('#donorTreatmentId').val(r.donorTreatmentId);	
					$('#date_of_bag_collection').val(r.dateOfBagCollection);
					$('#txt_blood_group').val(r.bloodGroup);
					$('#txt_blood_group').attr('disabled','disabled');
					var donor_name = r.donor_name;
					var donorN= donor_name.split('-');
					var title =donorN[0];
					var fName=donorN[1];
					var mName=donorN[2];
					var lName=donorN[3];
					$('#title').select2('val',title)
					$('#title').select2('disable');
					$('#txt_first_name').val(fName);
					$('#txt_first_name').attr('disabled','disabled');
					$('#txt_middle_name').val(mName);
					$('#txt_middle_name').attr('disabled','disabled');
					$('#txt_last_name').val(lName);
					$('#txt_last_name').attr('disabled','disabled');
					$('#sel_bloodBagNumber').val(r.bloodBagNumber);
					$('#bagno').val(r.bloodBagNumber);
					 $('#txt_volume_').val(r.volume);
					$('#date_time_result_component1').val(r.dateOfBagCollection);
					 $('#reamrk_component_').val(r.componentRemark);
					$('#callfrom').val('update');
					getDonorDetails();
					//for ( var i = 0; i < r.lstComponentMaster.length; i++) {
						var i=0;
						var htmBody="";
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' id='component_name_"+(i+1)+"' >" + r.componentName + "</td>"
						+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_volume_"+(i+1)+"' placeholder='Result' value="+ r.volume + "></td>"
						+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='date_time_result_component"+(i+1)+"' value=" +r.expiryDate +"></td>"
						+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='reamrk_component_"+(i+1)+"'  value=" + r.componentRemark +"></td>";
					//}

					$("#componentSepreationDetails").html(htmBody);
			}
		});
	}
}
function deleteComponentSeperation(componentSeperationId){
	if(componentSeperationId !=undefined && componentSeperationId!=null && componentSeperationId!="" && componentSeperationId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/bloodBank/deleteComponentSeperation",
				data : {
					"componentSeperationId" : componentSeperationId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllComponentSeperationList();
				}
			});
		}
	}	
}
function getDonorDetailsnew(){
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		return false;
	}
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getCheckUpByTreatmentId",
		data : {
			id : donorTreatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=null){
					
					document.getElementById('bl_weight').innerText=r.donorWeight+" Kg";
					document.getElementById('bl_height').innerText=r.donorHeight+" Cm";
					document.getElementById('bl_hamoglobin').innerText=r.donorHemoglobin;
					document.getElementById('bl_temprature').innerText=r.donorTemprature;
			}
		}
	});
}

function getDonorDetailsByIdTestRegister(id){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bloodBank/getDonorDetailsByIdTestRegister",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if(r!=null){
				
				var htm = "";
				var index = 1;
				
				for ( var i = 0; i < r.testRegister.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.testRegister[i].testRegisterId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.testRegister[i].donor_id
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.testRegister[i].donorTreatmentId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.testRegister[i].donor_name
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.testRegister[i].bloodGroup
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.testRegister[i].dateOfBagCollection
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editTestRegister('
								+ r.testRegister[i].donorTreatmentId
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteTestRegister('
								+ r.testRegister[i].testRegisterId	
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								
								+ '</tr>';
						index++;
					}
					$('#BloodDonorTestRegisterListDetails').html(htm);
			}
		   }
		});	
	
}

function getPatientDetailsByIdComponentsepration(id){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bloodBank/getPatientDetailsByIdComponentsepration",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if(r!=null){
				
				var htm = "";
				var index = 1;
				
					for ( var i = 0; i < r.lstComponentseperation.length; i++) {
						htm = htm
								+ '<tr> '
								+ ' <td class="col-md-1 center">'
								+ index
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstComponentseperation[i].blood_bag_details
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstComponentseperation[i].componentName
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstComponentseperation[i].volume
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstComponentseperation[i].expiryDate
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstComponentseperation[i].bloodGroup
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstComponentseperation[i].dateOfBagCollection
								+ '</td>'
								if(r.lstComponentseperation[i].bloodBagStatus == 2){
									htm = htm	+ ' <td class="col-md-1 center">'
									+ '	<button disabled class="btn btn-xs btn-success" onclick=editComponentSeperation('
									+ r.lstComponentseperation[i].donorTreatmentId+","+r.lstComponentseperation[i].componentSeperationId
									+ ')><i class="fa fa-edit"></i></button></td>'
								}else{
									htm = htm + ' <td class="col-md-1 center">'
									+ '	<button class="btn btn-xs btn-success" onclick=editComponentSeperation('
									+ r.lstComponentseperation[i].donorTreatmentId+","+r.lstComponentseperation[i].componentSeperationId
									+ ')><i class="fa fa-edit"></i></button></td>'
								}
								
						htm = htm + ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteComponentSeperation('
								+ r.lstComponentseperation[i].componentSeperationId	
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								
								+ '</tr>';
						index++;
					}
					$('#BloodComponentSeperationListDetails').html(htm);

			}
		   }
		});	
	
}

