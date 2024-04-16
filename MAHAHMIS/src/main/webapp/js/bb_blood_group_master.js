function toggleEntryDiv(id) {

	if (id == "divForEdit") {

		$("#divForEntryBloodGroup").show('slow');
	} else {

		$("#divForEntryBloodGroup").toggle('slow');
	}
}

function saveBloodGroupMaster(){
	
	var bloodGroupId = $("#bloodGroupId").val();
	var bloodGrouptName = $("#bloodGroupName").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(bloodGrouptName=="" || bloodGrouptName==undefined || bloodGrouptName==null || bloodGrouptName=="null"  ){
		alert("please enter Blood Group name");		
		$("#bloodGroupName").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('bloodGrouptName=' + encodeURIComponent(bloodGrouptName));
	inputs.push('bloodGroupId=' + bloodGroupId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_blood_group_master/saveBloodGroup",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Blood Group already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllBloodGroupMaster();
			refreshBloodGroupMaster();
		},
		
	})
}


function refreshBloodGroupMaster(){
	$('#bloodGroupName').val('');
	$('#bloodGroupId').val(0);
	
	
}


function getAllBloodGroupMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_group_master/getAllBloodGroupMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodGroupMaster(r,"All");
			setAllBloodgroupMasternew(r);
			
		}
	});
}


function setAllBloodGroupMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstBloodGroupMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodGroupMaster[i].bloodGroupId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodGroupMaster[i].bloodGrouptName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodGrouptMaster('+r.lstBloodGroupMaster[i].bloodGroupId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodGroupMaster('+r.lstBloodGroupMaster[i].bloodGroupId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodGroupId+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodGrouptName+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodGrouptMaster('+r.bloodGroupId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodGroupMaster('+r.bloodGroupId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#bloodGroupDetails").html(htm);
}

//Added By Annapurna 
function setAllBloodgroupMasternew(r){
	 var  list="";
	    for ( var i = 0; i < r.lstBloodGroupMaster.length; i++) {  
	        list = list + "<option value='"+r.lstBloodGroupMaster[i].bloodGroupId+"' >" + (r.lstBloodGroupMaster[i].bloodGrouptName) + "</option>";  
	    }  
	   $("#blood_group_group_testing").html(list);
	   $("#blood_group").html(list);
	}


function editBloodGrouptMaster(bloodGroupId){		
	var inputs = [];
	inputs.push('bloodGroupId=' + bloodGroupId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_group_master/editBloodGrouptMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryBloodGroup").show('slow');
			$('#bloodGroupName').val(r.bloodGrouptName);
			$('#bloodGroupId').val(r.bloodGroupId);	
			
		}
	});
}

function deleteBloodGroupMaster(bloodGroupId) {
	var r = confirm("Are You Sure You Want To Delete Blood Group Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_blood_group_master/deleteBloodGroupMaster",
			data : {
				"bloodGroupId" : bloodGroupId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshBloodGroupMaster();
				getAllBloodGroupMaster();
			}
		});
	}
}

function centerBloodGroupAutoSuggestion(inputID) {
	var resultData = [];
	var bloodGroupName = $("#" + inputID).val();


	if (bloodGroupName == "" || bloodGroupName == null || bloodGroupName == "null"	|| bloodGroupName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllBloodGroupMaster();
		
		return false;
	}

	var inputs = [];
	inputs.push('bloodGroupName=' + bloodGroupName);;
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_blood_group_master/centerBloodGroupAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstBloodGroupMaster.length; j++) {
				var arrValue = response.lstBloodGroupMaster[j].bloodGroupId +"-"+response.lstBloodGroupMaster[j].bloodGrouptName;
				var idValue = response.lstBloodGroupMaster[j].bloodGroupId;
				var bloodGroupName = response.lstBloodGroupMaster[j].bloodGrouptName;
				resultData.push({
					ID : idValue,
					Name : bloodGroupName,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

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
		var bloodGroupId = res[0];
		var bloodGroupName = res[1];	
		getBloodGroupMasterBybloodGroupId(bloodGroupId);
		$("input#" + inputID).val(bloodGroupName);
	}
}


function getBloodGroupMasterBybloodGroupId(bloodGroupId){
	var inputs = [];
	inputs.push('bloodGroupId=' + bloodGroupId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_group_master/editBloodGrouptMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodGroupMaster(r,"search");
			refreshBloodGroupMaster();
		}
		
	});

}


function centerBloodGroupMasterSearchById(){

	var complaintId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(complaintId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getBloodGroupMasterBybloodGroupId(bloodGroupId);	
}


