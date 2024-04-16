/********************************************************************************
 * @author Rohit Ambawade
 * @since 13/12/2021
 * @comment for toggle Special Case form
*******************************************************************************/
function toggleEntryDiv(id){
	$("#"+id).toggle('slow');
	$("#divForUpdateForm").hide();
}

/********************************************************************************
 * @author Rohit Ambawade
 * @since 13/12/2021
 * @comment for save Special Case
*******************************************************************************/
function savePrefix(){
	var prefix = $("#prefix").val();
	var prefixDesc = $("#prefix_description").val();
	var prefixStatus = $("#prefix_status").val();
	var prefixId = $("#prefixId").val();
	
	if(prefix == "" || prefix == null){
		alertify.error("Please Enter Prefix!");
		return false;
	}
	
	if(prefixDesc == "" || prefixDesc == null){
		alertify.error("Please Enter Prefix Description!");
		return false;
	}
	
	if(prefixStatus == "" || prefixStatus == null){
		alertify.error("Please Enter Prefix Status!");
		return false;
	}
	
	var inputs = [];	
	inputs.push('prefix=' + prefix);
	inputs.push('prefixDesc=' + prefixDesc);
	inputs.push('prefixStatus=' + prefixStatus);
	inputs.push('prefixId=' + prefixId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/parameterconf/savePrefix",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Prefix Saved Successfully");
			}else if (data == 2) {
				alertify.success( "Prefix Updated Successfully");				
			}else if(data==3){
				alertify.error("Prefix is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			$("#divForAddForm").toggle('slow');
			getAllPrefixes();
			resetPrefixForm();
		}
	});
}

/****************************************************************************************************
 * @author Rohit Ambawade
 * @since 13/12/2021
 * @comment for clear special Case Form
******************************************************************************************************/	
function resetPrefixForm(){
	$("#prefix").val("");
	$("#prefix_description").val("");
	$('#prefix_status').val("Y");
}

/****************************************************************************************************
 * @author Rohit Ambawade
 * @since 13/12/2021
 * @comment for clear special Case Form
******************************************************************************************************/	
function resetPrefixDetailsForm(){
	$("#prefix-suboption").val("");
	$("#prefix-subvalue").val("");
	$("#default-value").val("Y");
	$('#prefix-details-status').val("Y");
}

/****************************************************************************************************
 * @author Rohit Ambawade
 * @since 13/12/2021
 * @comment for fetch all prefixes
******************************************************************************************************/	
function getAllPrefixes(){
	jQuery.ajax({
		async : true,
		type : "GET",
		// url : "ehat/nationality/getAllNationalities",
		url : "ehat/parameterconf/getAllPrefix",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.comparammaster.length; i++) {
				
				var badge = "";
				
				if(r.comparammaster[i].mcm_prefix_status == "Y")
				{
					badge = "<span class='badge badge-pill badge-success'>Active</span>";
				}else{
					badge = "<span class='badge badge-pill badge-danger'>In-Active</span>";
				}				
				
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.comparammaster[i].mcm_prefix_name+"</td>"
						+ "<td  class='col-md-1 center'>"+ r.comparammaster[i].mcm_prefix_desc+ "</td>"
						+ "<td  class='col-md-1 center'>"+ badge + "</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
				+ "<button class='btn btn-xs btn-primary' id='view-id' onclick=viewPrefixById('"+r.comparammaster[i].mcm_prefix_master_id+"')><i class='fa fa-eye'></i></button></td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editParameterById('"+r.comparammaster[i].mcm_prefix_master_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteNationalityById('"+r.comparammaster[i].mcm_prefix_master_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#nationalityTableBody').html(divContent);
		}
	});	
}

/****************************************************************************************************
 * @author Rohit Ambawade
 * @since 13/12/2021
 * @comment for edit special Case by id
******************************************************************************************************/	
function editParameterById(id) {
	
	// alert(id)

	$("#divForUpdateForm").show();
	$("#prefix_id").val(id);
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/parameterconf/getPrefixById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			for ( var i = 0; i < r.comparammaster.length; i++) {
			
				$('#prefix_update').val(r.comparammaster[i].mcm_prefix_name);
				$('#prefix_description_update').val(r.comparammaster[i].mcm_prefix_desc);
				$('#prefix_status_update').val(r.comparammaster[i].mcm_prefix_status);
				// getAllPrefixes();
			}
		}
	});
}

/****************************************************************************************************
 * @author Rohit Ambawade
 * @since 13/12/2021
 * @comment for delete special Case by id
******************************************************************************************************/	
function deleteNationalityById(id){
	var r = confirm("Are You Sure You Want To Delete this Nationality?");
 	if (r){ 
 		jQuery.ajax({
 			async : true,
 			type : "POST",
			url : "ehat/parameterconf/getPrefixById",
			data : {
				id : id
			},
			cache : false,
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if(r){
					alertify.success( "Nationality Delete Successfully");		
				}else{
					alertify.error( "Nationality Not Deleted.");		
				}
				getAllNationalities();
			}
 		});
 	}
}


function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}


function viewPrefixById(id)
{
	// alert(id)
	
	// set value to the prefixId
	$("#prefixId").val(id);
	
	$("#display-parameter-details").show();
	
	$("#prefix-suboption").val("");
	$("#prefix-subvalue").val("");
	$("#default-value").val("Y");
	$('#prefix-details-status').val("Y");

	jQuery.ajax({
		async : true,
		type : "GET",
		// url : "ehat/nationality/getAllNationalities",
		url : "ehat/parameterconf/getPrefixDetails",
		data : {
			id : id
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.comparamdetails.length; i++) {
				
				var badge = "";
				
				if(r.comparamdetails[i].mcd_prefix_status == "Y")
				{
					badge = "<span class='badge badge-pill badge-success'>Active</span>";
				}else{
					badge = "<span class='badge badge-pill badge-danger'>In-Active</span>";
				}
				
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.comparamdetails[i].mcd_prefix_sub_option+"</td>"
						+ "<td  class='col-md-1 center'>"+ r.comparamdetails[i].mcd_prefix_sub_value+ "</td>"
						+ "<td  class='col-md-1 center'>"+ badge + "</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=getParameterDetails('"+r.comparamdetails[i].mcd_prefix_detail_id+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteNationalityById('"+r.comparamdetails[i].mcd_prefix_detail_id+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#parameterdetailsTableBody').html(divContent);

			$("#update_button").hide();
			$("#add_button").show();
		}
	});	
	
}



function savePrefixDetails()
{

	var prefixId = $("#prefixId").val();
	
	var prefix_suboption = $("#prefix-suboption").val();
	var prefix_subvalue = $("#prefix-subvalue").val();
	var default_value = $("#default-value").val();
	var status = $("#prefix-details-status").val();
	
	if(prefix_suboption == "" || prefix_suboption == null){
		alertify.error("Please Enter Prefix Suboption!");
		return false;
	}
	
	if(prefix_subvalue == "" || prefix_subvalue == null){
		alertify.error("Please Enter Prefix Value!");
		return false;
	}
	
	var inputs = [];	
	inputs.push('prefixId=' + prefixId);
	inputs.push('prefix_suboption=' + prefix_suboption);
	inputs.push('prefix_subvalue=' + prefix_subvalue);
	inputs.push('default_value=' + default_value);
	inputs.push('status=' + status);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/parameterconf/savePrefixDetails",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Prefix Detail Saved Successfully");
			}else if (data == 2) {
				alertify.success( "Prefix Detail Updated Successfully");				
			}else if(data==3){
				alertify.error("Prefix Detail is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			
			viewPrefixById(prefixId);
			resetPrefixDetailsForm();
		}
	});

}


function getParameterDetails(id)
{
	// alert(id)
	$("#prefix_detail_id").val(id);
	
	$("#update_button").show();
	$("#add_button").hide();
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/parameterconf/getPrefixDetailById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			for ( var i = 0; i < r.comparamdetails.length; i++) {
			
				$('#prefix-suboption').val(r.comparamdetails[i].mcd_prefix_sub_option);
				$('#prefix-subvalue').val(r.comparamdetails[i].mcd_prefix_sub_value);
				$('#default-value').val(r.comparamdetails[i].mcd_prefix_default_value);
				$('#prefix-details-status').val(r.comparamdetails[i].mcd_prefix_status);
				// getAllPrefixes();
			}
		}
	});
}


function updatePrefix()
{
	var prefix_id = $("#prefix_id").val();
	var prefix_update = $("#prefix_update").val();
	var prefix_description_update = $("#prefix_description_update").val();
	var prefix_status_update = $("#prefix_status_update").val();
	
	// alert(prefix_id+" "+prefix_update+" "+prefix_description_update+" "+prefix_status_update);

	
	var inputs = [];	
	inputs.push('prefix_id=' + prefix_id);
	inputs.push('prefix_update=' + prefix_update);
	inputs.push('prefix_description_update=' + prefix_description_update);
	inputs.push('prefix_status_update=' + prefix_status_update);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/parameterconf/editPrefix",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Prefix Updated Successfully");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
				
			getAllPrefixes();
			$("#divForUpdateForm").hide();
		}
	});
	
}

