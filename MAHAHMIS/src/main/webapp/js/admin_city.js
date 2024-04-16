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
 * @comment for get All Taluka List for dropdown
******************************************************************************************************/	
function getAllTalukaListByDistrictId(districtId){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/taluka/getAllTalukaListByDistrictId",
		data: {districtId : districtId},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
	        divContent = divContent + "<select name='Taluka Name' class='col-md-12'><option value='0'>--Select Taluka--</option>";
	         for ( var i = 0; i < r.talukaList.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.talukaList[i].taluka_id + "'>"+ r.talukaList[i].taluka_name + "</option>";
	            }
	            divContent = divContent + "</select>";
	            $("#talukaId").html(divContent);
		}
		});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for clear Town Form
******************************************************************************************************/	
function resetCityForm(){
	$('#stateId').select2('val','0');
	$('#districtId').select2('val','0');
	$('#talukaId').select2('val','0');
	$('#cityName').val("");
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for Save City
******************************************************************************************************/	
function saveCityMaster() {
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
	
	var talukaId = $('#talukaId').val();
	if(talukaId=="" || talukaId==0){
		alert("please select taluka name");		
		$("#talukaId").focus();					
		return false;
	}	
	
	var cityName = $('#cityName').val();
	if(cityName=="" || cityName==undefined || cityName==null){
		alert("please enter city name");		
		$("#cityName").focus();					
		return false;
	}	
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var talukaId=$('#talukaId').val();
	var districtId=$('#districtId').val();
	var stateId = $('#stateId').val();
	var cityName = $('#cityName').val();
	var cityId = $('#cityId').val();
	var inputs = [];	
	inputs.push('city_ID=' + cityId);
	inputs.push('taluka_ID=' + talukaId);
	inputs.push('district_ID=' + districtId);
	inputs.push('state_ID=' + stateId);
	inputs.push('cityName=' + cityName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/city/saveCity",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("City Saved Sucessfully");				
			} else if (r == 2) {
				alertify.success( "City Updated Sucessfully");				
			}else if (r == 3) {				
				alertify.error("City Name is Already Exist");				
			}else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetCityForm();
			getAllCityList();
		}
	});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for fetch all City List
******************************************************************************************************/	
function getAllCityList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/city/getAllCityList",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.cityList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].city_name+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].talukaName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].districtName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].stateName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editCityById('"+r.cityList[i].city_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteCityById('"+r.cityList[i].city_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#cityDetailsBody').html(divContent);
		}
	});	
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for edit City by id
******************************************************************************************************/
function editCityById(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/city/editCityById",
		data : {
			cityId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#stateId').select2('val',r.state_ID);
		getAllDistrictListByStateId(r.state_ID);
		getAllTalukaListByDistrictId(r.district_ID);
		$('#districtId').select2('val',r.district_ID);
		$('#talukaId').select2('val',r.taluka_ID);
		$('#cityName').val(r.city_name);
		$('#cityId').val(r.city_id);
		}
	});

}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for delete City by id
******************************************************************************************************/
function deleteCityById(id){
	var r = confirm("Are You Sure You Want To Delete this City ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/city/deleteCityById",
		data : {
			cityId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(res) {
			if(res==true){
				alertify.success( "City Delete Sucessfully");		
			}else{
				alertify.error( "City Not Deleted.");		
			}
			getAllCityList();
			}
		});
 	}
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 22/01/2020
 * @comment for search city  by Name
******************************************************************************************************/	
function searchCityByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			searchName : value
		},
		url : "ehat/city/searchCityByName",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.cityList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].city_name+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].talukaName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].districtName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cityList[i].stateName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editCityById('"+r.cityList[i].city_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteCityById('"+r.cityList[i].city_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#cityDetailsBody').html(divContent);
		}
	});	
}