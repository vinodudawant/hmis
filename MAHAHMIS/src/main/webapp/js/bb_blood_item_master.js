function toggleEntryDiv(id) {

	if (id == "divForEdit") {

		$("#divForEntryBloodItem").show('slow');
	} else {

		$("#divForEntryBloodItem").toggle('slow');
	}
}

function saveBloodItemMaster(){
	var bloodItemName = $("#bloodItemName").val();
	var bloodItemId = $("#bloodItemId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(bloodItemName=="" || bloodItemName==undefined || bloodItemName==null || bloodItemName=="null"  ){
		alert("please enter Blood Item name");		
		$("#bloodItemName").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('bloodItemName=' + bloodItemName);
	inputs.push('bloodItemId=' + bloodItemId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_blood_item/saveBloodItemMaster",
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
			getAllBloodItemMaster();
			refreshBloodItemMaster();
		},
		
	})
}


function refreshBloodItemMaster(){
	$('#bloodItemName').val('');
	$('#bloodItemId').val(0);
	
	
}


function getAllBloodItemMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_item/getAllBloodItemMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodItemMaster(r,"All");			
		}
	});
}

function setAllBloodItemMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstBloodItemMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodItemMaster[i].bloodItemId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodItemMaster[i].bloodItemName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodItemMaster('+r.lstBloodItemMaster[i].bloodItemId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodItemMaster('+r.lstBloodItemMaster[i].bloodItemId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodItemId+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodItemName+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodItemMaster('+r.bloodItemId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodItemMaster('+r.bloodItemId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#bloodItemDetails").html(htm);
}

function editBloodItemMaster(bloodItemId){		
	var inputs = [];
	inputs.push('bloodItemId=' + bloodItemId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_item/editBloodItemMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryBloodItem").show('slow');
			$('#bloodItemName').val(r.bloodItemName);
			$('#bloodItemId').val(r.bloodItemId);	
			
		}
	});
}

function deleteBloodItemMaster(bloodItemId) {
	var r = confirm("Are You Sure You Want To Delete Blood Group Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_blood_item/deleteBloodItemMaster",
			data : {
				"bloodItemId" : bloodItemId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshBloodItemMaster();
				getAllBloodItemMaster();
			}
		});
	}
}

function centerBloodItemAutoSuggestion(inputID) {
	var resultData = [];
	var bloodItemName = $("#" + inputID).val();


	if (bloodItemName == "" || bloodItemName == null || bloodItemName == "null"	|| bloodItemName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllBloodItemMaster();
		
		return false;
	}

	var inputs = [];
	inputs.push('bloodItemName=' + bloodItemName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_blood_item/centerBloodItemAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstBloodItemMaster.length; j++) {
				var arrValue = response.lstBloodItemMaster[j].bloodItemId +"-"+response.lstBloodItemMaster[j].bloodItemName;
				var idValue = response.lstBloodItemMaster[j].bloodItemId;
				var bloodItemName = response.lstBloodItemMaster[j].bloodItemName;
				resultData.push({
					ID : idValue,
					Name : bloodItemName,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByItemName .typeahead").html(template);
				$("div#documentByItemName .typeahead").show();

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
		var bloodItemId = res[0];
		var bloodItemName = res[1];	
		getBloodItemMasterBybloodItemId(bloodItemId);
		$("input#" + inputID).val(bloodItemName);
	}
}


function getBloodItemMasterBybloodItemId(bloodItemId){
	var inputs = [];
	inputs.push('bloodItemId=' + bloodItemId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_item/editBloodItemMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodItemMaster(r,"search");
			refreshBloodItemMaster();
		}
		
	});

}


function centerBloodItemMasterSearchById(){

	var bloodItemId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(bloodItemId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getBloodItemMasterBybloodItemId(bloodItemId);	
}


