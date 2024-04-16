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
	            $("#searchStateId").html(divContent);
		}
		});
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for Save District
******************************************************************************************************/	
function saveDistrict() {
	var stateId = $('#stateId').val();
	if(stateId=="" || stateId==0){
		alert("please select state name");		
		$("#stateId").focus();					
		return false;
	}	
	var districtName = $('#districtName').val();
	if(districtName=="" || districtName==undefined || districtName==null){
		alert("please enter district name");		
		$("#districtName").focus();					
		return false;
	}	
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var districtId=$('#districtId').val();
	var inputs = [];	
	inputs.push('district_ID=' + districtId);
	inputs.push('state_ID=' + stateId);
	inputs.push('districtName=' + districtName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/district/saveDistrict",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("District Saved Sucessfully");				
			} else if (r == 2) {
				alertify.success( "District Updated Sucessfully");				
			}else if (r == 3) {				
				alertify.error("District Name is Already Exist");				
			}else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetDistrictForm();
			getAllDistrictList();
		}
	});
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for clear District Form
******************************************************************************************************/	
function resetDistrictForm(){
	$('#districtName').val("");
	$('#districtId').val("0");
	$('#stateId').select2('val','0');
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for fetch all District List
******************************************************************************************************/	
function getAllDistrictList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/district/getAllDistrict",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.districtList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.districtList[i].district_name+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.districtList[i].stateName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editDistrictMaster('"+r.districtList[i].district_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteDistrictMaster('"+r.districtList[i].district_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#districtDetailsBody').html(divContent);
		}
	});	
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for edit District by id
******************************************************************************************************/	
function editDistrictMaster(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/district/editDistrictById",
		data : {
			district_id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#districtId').val(r.district_id);
		$('#districtName').val(r.district_name);
		$('#stateId').select2('val',r.state_id);
		}
	});

}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for delete State by id
******************************************************************************************************/	
function deleteDistrictMaster(id){
	var r = confirm("Are You Sure You Want To Delete this District ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/district/deleteDistrictById",
		data : {
			district_id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "District Delete Sucessfully");		
			}else{
				alertify.error( "District Not Deleted.");		
			}
			getAllDistrictList();
		}
	});
 }
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for search district in State by Name
******************************************************************************************************/	
function searchDistrictByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			searchName : value
		},
		url : "ehat/district/searchDistrictByName",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.districtList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.districtList[i].district_name+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.districtList[i].stateName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editDistrictMaster('"+r.districtList[i].district_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteDistrictMaster('"+r.districtList[i].district_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#districtDetailsBody').html(divContent);
		}
	});	
}