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
function saveMicroorganism(){
	var microorganismName = $.trim($("#microorganismName").val());
	var microorganismId = $('#microorganismId').val();
	var unitId = $('#unitId').val();

	var labTestData = $('#labTestId').val();
	var data = labTestData.split(",");
	var labTestId = data[0];
	var microorganismCount = data[1];
	
	if(labTestId == 0){
		alertify.error("Please Select Test Name!");
		return false;
	}else if(microorganismName == "" || microorganismName == null){
		alertify.error("Please Enter Microorganism Name!");
		return false;
	}
	
	var inputs = [];	
	inputs.push('microorganismName=' +  encodeURIComponent(microorganismName));
	inputs.push('microorganismId=' + microorganismId);
	inputs.push('testId=' + labTestId);
	inputs.push('microorganismCount=' + microorganismCount);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/microorganisms/saveMicroorganisms",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Microorganism Saved Successfully");
			}else if (data == 2) {
				alertify.success( "Microorganism Updated Successfully");				
			}else if(data==3){
				alertify.error("Microorganism is Already Exist");
			}else if(data==4){
				alertify.error("Microorganism Limit Exceeded For This Test.");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			getAllMicroorganisms();
			resetMicroorganismForm();
			$("#divForAddForm").toggle('slow');
		}
	});
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To clear micro-organism Form
******************************************************************************************************/	
function resetMicroorganismForm(){
	$('#microorganismName').val("");
	$('#microorganismId').val("0");
	$("#labTestId").select2('val',"0");
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To get all micro-organisms
******************************************************************************************************/	
function getAllMicroorganisms(){
	var unitId = $('#unitId').val();
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/microorganisms/getAllMicroorganisms",
		data :{
			unitId : unitId
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.microorganismsList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.microorganismsList[i].microorganismName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.microorganismsList[i].labTestDTO.testName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editMicroorganism('"+r.microorganismsList[i].microorganismId+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteMicroorganism('"+r.microorganismsList[i].microorganismId+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#microorganismTableBody').html(divContent);
		}
	});	
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To edit micro-organism by id
******************************************************************************************************/	
function editMicroorganism(id) {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/microorganisms/editMicroorganism",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			getLabTests();
		$('#microorganismName').val(r.microorganismName);
		$('#microorganismId').val(r.microorganismId);
		$("#labTestId").select2('val',r.labTestDTO.idTest+","+r.labTestDTO.microorganismCount);
		$("#divForAddForm").show('slow');
		}
	});
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To delete micro-organism by id
******************************************************************************************************/	
function deleteMicroorganism(id){
	var r = confirm("Are you sure you want to delete this microorganism ?");
 	if (r) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/microorganisms/deleteMicroorganism",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r){
				alertify.success( "Microorganism delete successfully");		
			}else{
				alertify.error( "Microorganism not deleted.");		
			}
			getAllMicroorganisms();
		}
	});
 	}
}

/****************************************************************************************************
 * @author Akshay Mache
 * @since 17/09/2020
 * @comment To search micro-organism by name
******************************************************************************************************/	
function searchMicroorganisms(value){
	var unitId = $('#unitId').val();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/microorganisms/searchMicroorganisms",
		data :{
			searchName : value,
			unitId : unitId
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.microorganismsList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.microorganismsList[i].microorganismName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.microorganismsList[i].labTestDTO.testName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editMicroorganism('"+r.microorganismsList[i].microorganismId+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteMicroorganism('"+r.microorganismsList[i].microorganismId+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#microorganismTableBody').html(divContent);
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
				dropdownList=dropdownList+'<option value="'+r.labTestList[i].idTest+','+r.labTestList[i].microorganismCount+'">'+r.labTestList[i].testName+'</option>';	
			}	
			$("#labTestId").html(dropdownList);
		}
	});	
}