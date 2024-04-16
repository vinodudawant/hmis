/********************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To toggle micro-organism form
*******************************************************************************/
function toggleEntryDiv(id){
	$("#"+id).toggle('slow');
}


/********************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To save micro-organisms
*******************************************************************************/
function saveLabGrading(){
	var labGradingName = $.trim($("#labGradingName").val());
	var labGradingId = $('#labGradingId').val();
	var unitId = $('#unitId').val();

	var labTestId = $('#labTestId').val();
	
	if(labTestId == 0){
		alertify.error("Please Select Test Name!");
		return false;
	}else if(labGradingName == "" || labGradingName == null){
		alertify.error("Please Enter Grading Name!");
		return false;
	}
	
	var inputs = [];	
	inputs.push('labGradingName=' +  encodeURIComponent(labGradingName));
	inputs.push('labGradingId=' + labGradingId);
	inputs.push('testId=' + labTestId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/gradings/saveLabGrading",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Lab Grading Saved Successfully");
			}else if (data == 2) {
				alertify.success( "Lab Grading Updated Successfully");				
			}else if(data==3){
				alertify.error("Lab Grading is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			getAllGradings();
			resetGradingForm();
			$("#divForAddForm").toggle('slow');
		}
	});
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To clear micro-organism Form
******************************************************************************************************/	
function resetGradingForm(){
	$('#labGradingName').val("");
	$('#labGradingId').val("0");
	$("#labTestId").select2('val',"0");
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To get all micro-organisms
******************************************************************************************************/	
function getAllGradings(){
	var unitId = $('#unitId').val();
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/gradings/getAllGradings",
		data :{
			unitId : unitId
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.gradingsList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.gradingsList[i].labGradingName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.gradingsList[i].labTestDTO.testName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editLabGrading('"+r.gradingsList[i].labGradingId+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteLabGrading('"+r.gradingsList[i].labGradingId+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#labGradingTableBody').html(divContent);
		}
	});	
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To edit micro-organism by id
******************************************************************************************************/	
function editLabGrading(id) {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/gradings/editLabGrading",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		getLabTests();
		$('#labGradingName').val(r.labGradingName);
		$('#labGradingId').val(r.labGradingId);
		$("#labTestId").select2('val',r.labTestDTO.idTest);
		$("#divForAddForm").show('slow');
		}
	});
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To delete micro-organism by id
******************************************************************************************************/	
function deleteLabGrading(id){
	var r = confirm("Are you sure you want to delete this grading ?");
 	if (r) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/gradings/deleteLabGrading",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r){
				alertify.success( "Grading delete successfully");		
			}else{
				alertify.error( "Grading not deleted.");		
			}
			getAllGradings();
		}
	});
 	}
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To search micro-organism by name
******************************************************************************************************/	
function searchGradings(value){
	var unitId = $('#unitId').val();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/gradings/searchGradings",
		data :{
			searchName : value,
			unitId : unitId
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.gradingsList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.gradingsList[i].labGradingName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.gradingsList[i].labTestDTO.testName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editLabGrading('"+r.gradingsList[i].labGradingId+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteLabGrading('"+r.gradingsList[i].labGradingId+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#labGradingTableBody').html(divContent);
		}
	});
}

function getRequiredInfo(){
	getLabTests();
}

function getLabTests(){
	var unitId = $('#unitId').val();
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/microorganisms/getAllLabTests",
		data :{
			unitId : unitId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="0">Select Test</option>';
			for ( var i = 0; i < r.labTestList.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.labTestList[i].idTest+'">'+r.labTestList[i].testName+'</option>';	
			}	
			$("#labTestId").html(dropdownList);
		}
	});	
}