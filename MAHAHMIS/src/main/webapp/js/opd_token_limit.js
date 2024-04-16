/*******************************************************************************
 * @CodeBy : Tushar Jadhav.
 * @CodeFor : OPD_Token_Limit_Master.
 ******************************************************************************/
function getSpecializationInfoForUserMgmt() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalspcializationList",
		success : function(r) {
			
			setspcializationListForUserMgmt(r);
		}
	});
}

function setspcializationListForUserMgmt(r)
{
	var listspec="";	
	listspec = listspec + "<select class='col-md-12'><option value='0'>--Select Speciality --</option>";
	for(var i=0;i<r.hospitalspclgetlist.length;i++)
	{
		listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
	}
	$("#SpecialityId").html(listspec);
}


function saveSpecialityMaster() {

	var pattern = /^[0-9]+\.?[0-9]*$/;
	var tokenid = $('#tokenid').val();
	var SpecialityId = $('#SpecialityId').val();
	var inCount = $('#inCount').val();
	var nextCount = $('#nextCount').val();
	var waitingCount = $('#waitingCount').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	if(inCount=="" || inCount==undefined || inCount==null){
		
		alert("please enter In Count ");		
		$("#inCount").focus();					
		return false;
	}
	
	if (!pattern.test(inCount)) {
		alert("Please Enter Number Only!");
		$("#inCount").focus();
		return false;
	}
	if(nextCount=="" || nextCount==undefined || nextCount==null){
			
			alert("please enter Next Count ");		
			$("#nextCount").focus();					
			return false;
	}
	if (!pattern.test(nextCount)) {
		alert("Please Enter Number Only!");
		$("#nextCount").focus();
		return false;
	}
	if(waitingCount=="" || waitingCount==undefined || waitingCount==null){
		
		alert("please enter Waiting Count ");		
		$("#waitingCount").focus();					
		return false;
	}
	if (!pattern.test(waitingCount)) {
		alert("Please Enter Number Only!");
		$("#waitingCount").focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('tokenid=' + tokenid);
	inputs.push('specialisationId=' + SpecialityId);
	inputs.push('inCount=' + inCount);
	inputs.push('nextCount=' + nextCount);
	inputs.push('waitingCount=' + waitingCount);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/centerMgttoken/saveTokenLimitMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error("Record is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			refreshSpecialityMaster();
			getAllSpecialityMaster();
		}
	});	
}



function getAllSpecialityMaster(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgttoken/getAllSpecialityMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSpecialityMaster(r,"All");			
		}
	});
}


function setAllSpecialityMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All")
		{
				for ( var i = 0; i < r.lstSpecialityMaster.length; i++) {		
							htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstSpecialityMaster[i].tokenid+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstSpecialityMaster[i].specializationName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstSpecialityMaster[i].inCount+'</td>'		
							+ ' <td class="col-md-1 center">'+r.lstSpecialityMaster[i].nextCount+'</td>'	
							+ ' <td class="col-md-1 center">'+r.lstSpecialityMaster[i].waitingCount+'</td>'	
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editSpecialityMaster('+r.lstSpecialityMaster[i].tokenid+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteSpecialityMaster('+r.lstSpecialityMaster[i].tokenid+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
							index++;
				}
		}else if(CallFrom=="search"){
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.tokenid+'</td>'
				+ ' <td class="col-md-1 center">'+r.specializationName+'</td>'
				+ ' <td class="col-md-1 center">'+r.inCount+'</td>'	
				+ ' <td class="col-md-1 center">'+r.nextCount+'</td>'		
				+ ' <td class="col-md-1 center">'+r.waitingCount+'</td>'		
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editSpecialityMaster('+r.tokenid+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteSpecialityMaster('+r.tokenid+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
				index++;
			
		}
	$("#specialityDetails").html(htm);
}


function editSpecialityMaster(tokenid){		
	var inputs = [];
	inputs.push('tokenid=' + tokenid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgttoken/editSpecialityMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			$('#SpecialityId').select2('val',r.specialisationId);
			$('#inCount').val(r.inCount);
			$('#nextCount').val(r.nextCount);
			$('#waitingCount').val(r.waitingCount);
			$('#tokenid').val(r.tokenid);			
		}
	});
}


function deleteSpecialityMaster(tokenid) {
	var r = confirm("Are You Sure You Want To Delete OPD Token Limit Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/centerMgttoken/deleteSpecialityMaster",
			data : {
				"tokenid" : tokenid
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshSpecialityMaster();
				getAllSpecialityMaster();
			}
		});
	}
}

function refreshSpecialityMaster(){
	
	$("#specialisationId").select2('val',"0");
	$('#SpecialityId').select2('val','0');
	$('#inCount').val('');
	$('#nextCount').val('');
	$('#waitingCount').val('');
//	$('#tokenid').val('');
}



function centerSpecialityMasterAutoSuggestion(inputID) {
	var resultData = [];
	var specializationName = $("#" + inputID).val();

	if (specializationName == "" || specializationName == null	|| specializationName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllSpecialityMaster();
		return false;
	}

	var inputs = [];
	inputs.push('specializationName=' + specializationName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgttoken/centerSpecialityMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstSpecialityMaster.length; j++) {
				var arrValue = response.lstSpecialityMaster[j].tokenid +"-"+response.lstSpecialityMaster[j].specializationName;
				var idValue = response.lstSpecialityMaster[j].tokenid;
				var specializationName = response.lstSpecialityMaster[j].specializationName;
				resultData.push({
					ID : idValue,
					Name : specializationName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var tokenid = res[0];
		var specializationName = res[1];		
		getSpecialityMasterBySpecialityId(tokenid);
		$("input#" + inputID).val(specializationName);
	}
}

function getSpecialityMasterBySpecialityId(tokenid){
	var inputs = [];
	inputs.push('tokenid=' + tokenid);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgttoken/editSpecialityMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSpecialityMaster(r,"search");
			
		}
		
	});

}
