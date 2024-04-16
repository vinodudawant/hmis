/********************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment for toggle sample container form
*******************************************************************************/
function toggleEntryDiv(id){
		$("#"+id).toggle('slow');
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment for save Sample Container
*******************************************************************************/
function saveSampleContainer(){
	var sampleConatinerName = $("#sampleContainerName").val();
	var sampleContainerId = $('#sampleContainerId').val();
	
	if(sampleConatinerName == "" || sampleConatinerName == null){
		alertify.error("Please Enter Sample Container Name!");
		return false;
	}
	var inputs = [];	
	inputs.push('conatinerName=' + sampleConatinerName);
	inputs.push('idSampleConatiner=' + sampleContainerId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/samplecontainer/saveSampleContainer",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Sample Container is Saved Successfully");
			}
			else if (data == 2) {
				alertify.success( "Sample Container is Updated Successfully");				
			}
			else if(data==3){
				alertify.error("Sample Container Name is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			getSampleContainerList();
			resetSampleContainerForm();
		}
	});
}




/****************************************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment for clear Sample Container Form
******************************************************************************************************/	
function resetSampleContainerForm(){
	$('#sampleContainerName').val("");
	$('#sampleContainerId').val('0');

}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment for fetch all Sample Container List
******************************************************************************************************/	
function getSampleContainerList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/samplecontainer/getAllSampleContainer",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.sampleContainerList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.sampleContainerList[i].conatinerName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editSampleContainer('"+r.sampleContainerList[i].idSampleConatiner+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger deleteUserAccess' onclick=deleteSampleContainer('"+r.sampleContainerList[i].idSampleConatiner+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#sampleContainerTableBody').html(divContent);
		}
	});	
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment for edit Sample Container by id
******************************************************************************************************/	
function editSampleContainer(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/samplecontainer/editSampleContainerById",
		data : {
			sampleContainerId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#sampleContainerName').val(r.conatinerName);
		$('#sampleContainerId').val(r.idSampleConatiner);
		$("#divForAddForm").show('slow');
		}
	});

}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment for delete Sample Container by id
******************************************************************************************************/	
function deleteSampleContainer(id){
	var r = confirm("Are You Sure You Want To Delete this Sample Container ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/samplecontainer/deleteSampleContainerById",
		data : {
			sampleContainerId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "Sample Container Delete successfully");		
			}else{
				alertify.error( "Sample Container Not Deleted.");		
			}
			getSampleContainerList();
		}
	});
 	}
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment for search Sample Container by name
******************************************************************************************************/	
function searchSampleContainerByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/samplecontainer/searchSampleContainerByName",
		data :{
			searchName : value
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.sampleContainerList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.sampleContainerList[i].conatinerName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editSampleContainer('"+r.sampleContainerList[i].idSampleConatiner+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger deleteUserAccess' onclick=deleteSampleContainer('"+r.sampleContainerList[i].idSampleConatiner+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#sampleContainerTableBody').html(divContent);
		}
		});
}