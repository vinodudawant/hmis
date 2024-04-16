function toggleEntryDiv(id) {

	if (id == "divForEdit") {

		$("#divForEntryBloodBagMaster").show('slow');
	} else {

		$("#divForEntryBloodBagMaster").toggle('slow');
	}
}

function saveBloodBagMaster(){
	var bloodBagCount = $("#bloodBagCount").val();
	var bloodBagId = $("#bloodBagId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(bloodBagCount=="" || bloodBagCount==undefined || bloodBagCount==null || bloodBagCount=="null"  ){
		alert("please enter Blood Bag count");		
		$("#bloodBagCount").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('bloodBagCount=' + bloodBagCount);
	inputs.push('bloodBagId=' + bloodBagId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_bag_master/saveBloodBagMaster1",
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
			getAllBloodBagMaster();
			refreshBloodBagMaster();
		},
		
	})
}


function refreshBloodBagMaster(){
	$('#bloodBagName').val('');
	$('#bloodBagId').val(0);
	
	
}


function getAllBloodBagMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_bag_master/getAllBloodBagMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodBagMaster(r,"All");			
		}
	});
}

function setAllBloodBagMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstBloodBagMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodBagMaster[i].bloodBagId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodBagMaster[i].bloodBagtName+'</td>'		
			/*+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodBagtMaster('+r.lstBloodBagMaster[i].bloodBagId+')><i class="fa fa-edit"></i></button></td>'*/
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodBagMaster('+r.lstBloodBagMaster[i].bloodBagId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodBagId+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodBagtName+'</td>'
			/*+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodBagtMaster('+r.bloodBagId+')><i class="fa fa-edit"></i></button></td>'*/
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodBagMaster('+r.bloodBagId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#bloodBagDetails").html(htm);
}

function editBloodBagtMaster(bloodBagId){		
	var inputs = [];
	inputs.push('bloodBagId=' + bloodBagId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_bag_master/editBloodBagtMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryBloodBagMaster").show('slow');
			$('#bloodBagName').val(r.bloodBagtName);
			$('#bloodBagId').val(r.bloodBagId);	
			
		}
	});
}

function deleteBloodBagMaster(bloodBagId) {
	var r = confirm("Are You Sure You Want To Delete Blood Group Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_bag_master/deleteBloodBagMaster",
			data : {
				"bloodBagId" : bloodBagId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshBloodBagMaster();
				getAllBloodBagMaster();
			}
		});
	}
}

function centerBloodBagAutoSuggestion(inputID) {
	var resultData = [];
	var bloodBagName = $("#" + inputID).val();


	if (bloodBagName == "" || bloodBagName == null || bloodBagName == "null"	|| bloodBagName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllBloodBagMaster();
		
		return false;
	}

	var inputs = [];
	inputs.push('bloodBagName=' + bloodBagName);;
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_bag_master/centerBloodBagAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstBloodBagMaster.length; j++) {
				var arrValue = response.lstBloodBagMaster[j].bloodBagId +"-"+response.lstBloodBagMaster[j].bloodBagtName;
				var idValue = response.lstBloodBagMaster[j].bloodBagId;
				var bloodBagName = response.lstBloodBagMaster[j].bloodBagtName;
				resultData.push({
					ID : idValue,
					Name : bloodBagName,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

			setTimeout(function() {
				$("div#documentBybloodName .typeahead").html(template);
				$("div#documentBybloodName .typeahead").show();

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
		var bloodBagId = res[0];
		var bloodBagName = res[1];	
		getBloodBagMasterBybloodBagId(bloodBagId);
		$("input#" + inputID).val(bloodBagName);
	}
}


function getBloodBagMasterBybloodBagId(bloodBagId){
	var inputs = [];
	inputs.push('bloodBagId=' + bloodBagId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_bag_master/editBloodBagtMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodBagMaster(r,"search");
			refreshBloodBagMaster();
		}
		
	});

}


function centerBloodBagMasterSearchById(){

	var bloodBagId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(bloodBagId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getBloodBagMasterBybloodBagId(bloodBagId);	
}


