
/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for save state
******************************************************************************************************/	
function saveStateMaster(){
	var stateName = $('#stateName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var stateId = $('#stateId').val();
	
	if(stateName=="" || stateName==undefined || stateName==null || stateName=="null"  ){
		alert("please enter state name");		
		$("#stateName").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('stateName=' + stateName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('state_ID=' + stateId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/state/saveState",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("State Saved Sucessfully");
			}
			else if (data == 2) {
				alertify.success( "State Updated Sucessfully");				
			}
			else if(data==3){
				alertify.error("State Name is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			getStateList();
			resetStateForm();
		}
	});	
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for clear State Form
******************************************************************************************************/	
function resetStateForm(){
	$('#stateName').val("");
	$('#stateId').val("0");
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for fetch all State List
******************************************************************************************************/	
function getStateList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/state/getAllState",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.stateList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.stateList[i].state_name+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editStateMaster('"+r.stateList[i].state_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteStateMaster('"+r.stateList[i].state_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#stateDetailsBody').html(divContent);
		}
	});	
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for edit State by id
******************************************************************************************************/	
function editStateMaster(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/state/editStateById",
		data : {
			state_id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#stateName').val(r.state_name);
		$('#stateId').val(r.state_id);
		}
	});

}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for delete State by id
******************************************************************************************************/	
function deleteStateMaster(id){
	var r = confirm("Are You Sure You Want To Delete this State ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/state/deleteStateById",
		data : {
			state_id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "State Delete Sucessfully");		
			}else{
				alertify.error( "State Not Deleted.");		
			}
			getStateList();
		}
	});
 	}
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for search State by name
******************************************************************************************************/	
function searchStateByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/state/searchSateByName",
		data :{
			searchName : value
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			var divContent = "";
			if(r.stateList!=null){
				for ( var i = 0; i < r.stateList.length; i++) {
					divContent = divContent
							+ '<tr>'
							+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.stateList[i].state_name+"</td>";
					divContent = divContent+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-success' onclick=editStateMaster('"+r.stateList[i].state_id+"')><i class='fa fa-edit'></i></button></td>";
					divContent = divContent
							+ " <td class='col-md-1 center'>"
							+ "	<button class='btn btn-xs btn-danger' onclick=deleteStateMaster('"+r.stateList[i].state_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
				}

				$('#stateDetailsBody').html(divContent);
			}
		}
		});
}