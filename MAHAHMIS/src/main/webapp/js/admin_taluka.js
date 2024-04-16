/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for get All State List for dropdown
******************************************************************************************************/	
function getAllStateList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/state/getAllState",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
	        divContent = divContent + "<select name='State Name' class='col-md-12'><option value='0'>--Select State--</option>";
	         for ( var i = 0; i < r.stateList.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.stateList[i].state_id + "'>"+ r.stateList[i].state_name + "</option>";
	            }
	            divContent = divContent + "</select>";
	            $("#stateId").html(divContent);
		}
		});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for get All District List for dropdown
******************************************************************************************************/	
function getAllDistrictListByStateId(stateId){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/district/getAllDistrictListByStateId",
		data: {stateId : stateId},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
	        divContent = divContent + "<select name='District Name' class='col-md-12'><option value='0'>--Select District--</option>";
	         for ( var i = 0; i < r.districtList.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.districtList[i].district_id + "'>"+ r.districtList[i].district_name + "</option>";
	            }
	            divContent = divContent + "</select>";
	            $("#districtId").html(divContent);
		}
		});
}
/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for clear Taluka Form
******************************************************************************************************/	
function resetTalukaForm(){
	$('#stateId').select2('val','0');
	$('#districtId').select2('val','0');
	$('#talukaName').val("");
}



/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for Save District
******************************************************************************************************/	
function saveTalukaMaster() {
	var stateId = $('#stateId').val();
	if(stateId=="" || stateId==0){
		alert("please select state name");		
		$("#stateId").focus();					
		return false;
	}	
	
	var districtId = $('#districtId').val();
	if(districtId=="" || districtId==0){
		alert("please select district name");		
		$("#districtId").focus();					
		return false;
	}	
	
	var talukaName = $('#talukaName').val();
	if(talukaName=="" || talukaName==undefined || talukaName==null){
		alert("please enter taluka name");		
		$("#talukaName").focus();					
		return false;
	}	
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var districtId=$('#districtId').val();
	var stateId = $('#stateId').val();
	var talukaName = $('#talukaName').val();
	var talukaId = $('#talukaId').val();
	var inputs = [];	
	inputs.push('taluka_ID=' + talukaId);
	inputs.push('state_ID=' + stateId);
	inputs.push('district_ID=' + districtId);
	inputs.push('talukaName=' + talukaName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/taluka/saveTaluka",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Taluka Saved Sucessfully");				
			} else if (r == 2) {
				alertify.success( "Taluka Updated Sucessfully");				
			}else if (r == 3) {				
				alertify.error("Taluka Name is Already Exist");				
			}else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetTalukaForm();
			getAllTalukaList();
		}
	});
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for fetch all Taluka List
******************************************************************************************************/	
function getAllTalukaList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/taluka/getAllTalukaList",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.talukaList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.talukaList[i].taluka_name+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.talukaList[i].districtName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.talukaList[i].stateName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editTalukaById('"+r.talukaList[i].taluka_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteTalukaById('"+r.talukaList[i].taluka_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#talukaDetailsBody').html(divContent);
		}
	});	
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for edit Taluka by id
******************************************************************************************************/
function editTalukaById(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/taluka/editTalukaById",
		data : {
			taluka_id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#stateId').select2('val',r.state_ID);
		getAllDistrictListByStateId(r.state_ID);
		$('#districtId').select2('val',r.district_ID);
		$('#talukaName').val(r.taluka_name);
		$('#talukaId').val(r.taluka_id);
		}
	});
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for delete City by id
******************************************************************************************************/
function deleteTalukaById(id){
	var r = confirm("Are You Sure You Want To Delete this Taluka ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/taluka/deleteTalukaById",
		data : {
			taluka_id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(res) {
			if(res==true){
				alertify.success( "Taluka Delete Sucessfully");		
			}else{
				alertify.error( "Taluka Not Deleted.");		
			}
			getAllTalukaList();
			}
		});
 	}
}
/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for search taluka  by Name
******************************************************************************************************/	
function searchTalukaByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			searchName : value
		},
		url : "ehat/taluka/searchTalukaByName",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.talukaList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.talukaList[i].taluka_name+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.talukaList[i].districtName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.talukaList[i].stateName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editTalukaById('"+r.talukaList[i].taluka_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteTalukaById('"+r.talukaList[i].taluka_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#talukaDetailsBody').html(divContent);
		}
	});	
}