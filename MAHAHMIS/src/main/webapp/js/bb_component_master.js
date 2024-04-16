function toggleEntryDiv(id) {

	if (id == "divForEdit") {

		$("#divForEntryComponent").show('slow');
	} else {

		$("#divForEntryComponent").toggle('slow');
	}
}

function saveComponentMaster(){
	var componentName = $("#componentName").val();
	var componentId = $("#componentId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(componentName=="" || componentName==undefined || componentName==null || componentName=="null"  ){
		alert("please enter Blood Group name");		
		$("#componentName").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('componentName=' + componentName);
	inputs.push('componentId=' + componentId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/component/saveComponent",
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
			 alertify.success("Component already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllComponentMaster();
			refreshComponentMaster();
		},
		
	})
}


function refreshComponentMaster(){
	$('#componentName').val('');
	$('#componentId').val(0);
	
	
}


function getAllComponentMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/component/getAllComponentMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllComponentMaster(r,"All");	
			setAllComponentMasterDetails(r);
			setAllComponentDetails(r);
		}
	});
}

function setAllComponentMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstComponentMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstComponentMaster[i].componentId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstComponentMaster[i].componentName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editComponentMaster('+r.lstComponentMaster[i].componentId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteComponentMaster('+r.lstComponentMaster[i].componentId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.componentId+'</td>'
			+ ' <td class="col-md-1 center">'+r.componentName+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editComponentMaster('+r.componentId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteComponentMaster('+r.componentId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#componentDetails").html(htm);
}


function editComponentMaster(componentId){		
	var inputs = [];
	inputs.push('componentId=' + componentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/component/editComponentMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryComponent").show('slow');
			$('#componentName').val(r.componentName);
			$('#componentId').val(r.componentId);	
			
		}
	});
}

function deleteComponentMaster(componentId) {
	var r = confirm("Are You Sure You Want To Delete Blood Group Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/component/deleteComponentMaster",
			data : {
				"componentId" : componentId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshComponentMaster();
				getAllComponentMaster();
			}
		});
	}
}

function centerComponentAutoSuggestion(inputID) {
	var resultData = [];
	var componentName = $("#" + inputID).val();


	if (componentName == "" || componentName == null || componentName == "null"	|| componentName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllComponentMaster();
		
		return false;
	}

	var inputs = [];
	inputs.push('componentName=' + componentName);;
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/component/centerComponentAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstComponentMaster.length; j++) {
				var arrValue = response.lstComponentMaster[j].componentId +"-"+response.lstComponentMaster[j].componentName;
				var idValue = response.lstComponentMaster[j].componentId;
				var componentName = response.lstComponentMaster[j].componentName;
				resultData.push({
					ID : idValue,
					Name : componentName,
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
		var componentId = res[0];
		var componentName = res[1];	
		getComponentBycomponentId(componentId);
		$("input#" + inputID).val(componentName);
	}
}


function getComponentBycomponentId(componentId){
	var inputs = [];
	inputs.push('componentId=' + componentId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/component/editComponentMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllComponentMaster(r,"search");
			refreshComponentMaster();
		}
		
	});

}


function centerComponentMasterSearchById(){

	var componentId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(componentId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getComponentBycomponentId(componentId);	
}

function setAllComponentMasterDetails(r){
	
	var htmBody = "";
	if (r.lstComponentMaster.length == 0 || r.lstComponentMaster.length == null) {
		htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records</th></tr>";
		
	} else {
		
		for ( var i = 0; i < r.lstComponentMaster.length; i++) {
			
			htmBody = htmBody + "<tr style='height:21px;'>"
			+ "<td class='col-md-1 center' id='component_name_"+(i+1)+"' >" + r.lstComponentMaster[i].componentName + "</td>"
			//+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='test_name"+ r.listTestMaster[i].testName+"'></td>"
		//	+ "<td class='col-md-1 center' ><select class='form-select' id='sel_test_result_test_"+(i+1)+"'></select></td>"
			+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_volume_"+(i+1)+"' placeholder='Result'></td>"
			+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='date_time_result_component"+(i+1)+"'></td>"
			+ "<td class='col-md-1 center' ><textarea class='form-control' id='reamrk_component_"+(i+1)+"'></textarea></td>";
		}
	}
	
	$("#componentSepreationDetails").html(htmBody);
	$("#componentTabel").html(htmBody);
}

function setAllComponentDetails(r){
	
	var htmBody = "";
	if (r.lstComponentMaster.length == 0 || r.lstComponentMaster.length == null) {
		htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records</th></tr>";
		
	} else {
		
		for ( var i = 0; i < r.lstComponentMaster.length; i++) {
			
			htmBody = htmBody + "<tr style='height:21px;'>"
			+ "<td class='col-md-1 center' id='component_name_"+(i+1)+"' >" + r.lstComponentMaster[i].componentName + "</td>"
			//+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='test_name"+ r.listTestMaster[i].testName+"'></td>"
		//	+ "<td class='col-md-1 center' ><select class='form-select' id='sel_test_result_test_"+(i+1)+"'></select></td>"
			+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_volume_"+(i+1)+"' placeholder='Result'></td>"
			//+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='date_time_result_component"+(i+1)+"'></td>"
			//+ "<td class='col-md-1 center' ><textarea class='form-control' id='reamrk_component_"+(i+1)+"' rows='5'></textarea></td>";
		}
	}
	
	$("#componentTabel").html(htmBody);
}