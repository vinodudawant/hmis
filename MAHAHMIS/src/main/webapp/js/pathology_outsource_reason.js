/********************************************************************************
 * @author Ajay S Khandare
 * @since 26/10/2020
 * @comment for toggle OutSorce Reasin form
*******************************************************************************/
function toggleEntryDiv(id){
		$("#"+id).toggle('slow');
}


/********************************************************************************
 * @author Ajay S Khandare
 * @since 26/10/2020
 * @comment for save OutSorce Reason
*******************************************************************************/
function saveOutSourceReason(){
	var outReasonName = $("#outReasonName").val();
	var outReasonId = $('#outReasonId').val();
	var inputs = [];	
	inputs.push('outReasonName=' + outReasonName);
	inputs.push('idOutReason=' + outReasonId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/outsourceReason/saveoutsourcereason",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("OutSource Reason Saved Sucessfully");
			}
			else if (data == 2) {
				alertify.success( "OutSource Reason Updated Sucessfully");				
			}
			else if(data==3){
				alertify.error("OutSource Reason Name is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			getAllOutSorceReasonList();
			resetOutSorceReasonForm();
		}
	});
}




/****************************************************************************************************
 * @author Ajay S Khandare
 * @since 26/10/2020
 * @comment for clear OutSorce Reason Form
******************************************************************************************************/	
function resetOutSorceReasonForm(){
	$('#outReasonName').val("");

}


/************************************************************************************
 * @author Ajay S Khandare
 * @since 26/10/2020
 * @comment for fetch all OutSorce Reason List
**************************************************************************************/	
function getAllOutSorceReasonList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/outsourceReason/getAllOutsourceReason",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.outReasonList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.outReasonList[i].outReasonName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editOutSourceReason('"+r.outReasonList[i].idOutReason+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteOutSourceReason('"+r.outReasonList[i].idOutReason+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#outSourceReasonTableBody').html(divContent);
		}
	});	
}


/*********************************************************************************
 * @author Ajay S Khandare
 * @since 26/10/2020
 * @comment for edit OutSorce Reason by id
***********************************************************************************/	
function editOutSourceReason(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/outsourceReason/editOutSourceReasonById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#outReasonName').val(r.outReasonName);
		$('#outReasonId').val(r.idOutReason);
		$("#divForAddForm").show('slow');
		}
	});

}

/**********************************************************************************
 * @author Ajay S Khandare
 * @since 26/10/2020
 * @comment for delete OutSorce Reason by id
***********************************************************************************/	
function deleteOutSourceReason(id){
	var r = confirm("Are You Sure You Want To Delete this Sample Container ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/outsourceReason/deleteOutSourceReasonById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "OutSource Reason Delete Sucessfully");		
			}else{
				alertify.error( "OutSource Reason Not Deleted.");		
			}
			getAllOutSorceReasonList();
		}
	});
 	}
}

/****************************************************************************************************
 * @author Ajay S Khandare
 * @since  26/10/2020
 * @comment for search OutSource Reason by name
******************************************************************************************************/	
function searchOutSourceReasonByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/outsourceReason/searchOutSourceReasonByName",
		data :{
			searchName : value
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.outReasonList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.outReasonList[i].outReasonName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editOutSourceReason('"+r.outReasonList[i].idOutReason+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteOutSourceReason('"+r.outReasonList[i].idOutReason+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#outSourceReasonTableBody').html(divContent);
		}
		});
}