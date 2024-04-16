/********************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment for toggle Special Case form
*******************************************************************************/
function toggleEntryDiv(id){
		$("#"+id).toggle('slow');
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment for save Special Case
*******************************************************************************/
function saveSpecialCase(){
	var specialCaseName = $("#specialCaseName").val();
	var specialCaseId = $('#specialCaseId').val();
	if(specialCaseName == "" || specialCaseName == null){
		alertify.error("Please Enter Special Case Name!");
		return false;
	}
	var inputs = [];	
	inputs.push('spacialCaseName=' + specialCaseName);
	inputs.push('idSpecialCase=' + specialCaseId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/specialcase/savespecialcase",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Special Case Saved Successfully");
			}
			else if (data == 2) {
				alertify.success( "Special Case Updated Successfully");				
			}
			else if(data==3){
				alertify.error("Special Case Name is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			getAllSpecialCasesList();
			resetSpecialCaseForm();
		}
	});
}




/****************************************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment for clear special Case Form
******************************************************************************************************/	
function resetSpecialCaseForm(){
	$('#specialCaseName').val("");

}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment for fetch all Special Case List
******************************************************************************************************/	
function getAllSpecialCasesList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/specialcase/getAllSpecialCases",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.specialCaseList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.specialCaseList[i].spacialCaseName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editSpecialCase('"+r.specialCaseList[i].idSpecialCase+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteSpecialCase('"+r.specialCaseList[i].idSpecialCase+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#specialCaseTableBody').html(divContent);
		}
	});	
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment for edit special Case by id
******************************************************************************************************/	
function editSpecialCase(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/specialcase/editSpecialCaseById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#specialCaseName').val(r.spacialCaseName);
		$('#specialCaseId').val(r.idSpecialCase);
		$("#divForAddForm").show('slow');
		}
	});

}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment for delete special Case by id
******************************************************************************************************/	
function deleteSpecialCase(id){
	var r = confirm("Are You Sure You Want To Delete this Sample Container ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/specialcase/deleteSpecialCaseById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "Special Case Delete Successfully");		
			}else{
				alertify.error( "Special Case Not Deleted.");		
			}
			getAllSpecialCasesList();
		}
	});
 	}
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment for search special case by name
******************************************************************************************************/	
function searchSpecialCaseByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/specialcase/searchSpecialCaseByName",
		data :{
			searchName : value
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.specialCaseList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.specialCaseList[i].spacialCaseName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editSpecialCase('"+r.specialCaseList[i].idSpecialCase+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteSpecialCase('"+r.specialCaseList[i].idSpecialCase+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#specialCaseTableBody').html(divContent);
		}
		});
}

