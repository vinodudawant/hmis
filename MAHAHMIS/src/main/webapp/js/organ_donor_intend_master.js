function saveIntendOrganDonorMaster() {
	var intendId = $('#intendId').val();
	var intendOrganDonor = $('#intendOrganDonorName').val();
	if (intendOrganDonor == "" || intendOrganDonor == undefined
			|| intendOrganDonor == null) {
		alert("Please enter donor type");
		return false;
	}
	var inputs = [];
	inputs.push('intendId=' + intendId);
	inputs.push('intendOrganDonor=' + intendOrganDonor);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/intendOrganDonorMaster/saveIntendOrganDonorMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Intend Organ Donor Saved Sucessfully");
				clearIntendOrganDonorMasterForm();
				getAllIntendOrganDonorMaster();
			} else if (data == 2) {
				alertify.success("Intend Organ Donor Updated Sucessfully");
				clearIntendOrganDonorMasterForm();
				getAllIntendOrganDonorMaster();
			} else if (data == 3) {
				alertify.success("Intend Organ Donor already present");
				clearIntendOrganDonorMasterForm();
				getAllIntendOrganDonorMaster();
			}
		}
	});
}

function getAllIntendOrganDonorMaster() {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/intendOrganDonorMaster/getAllIntendOrganDonorMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllIntendOrganDonorMaster(r, "All");
		}
	});
}

function setAllIntendOrganDonorMaster(r, CallFrom) {

	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstIntendOrganDonorMasterDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstIntendOrganDonorMasterDto[i].intendId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstIntendOrganDonorMasterDto[i].intendOrganDonor
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editIntendOrganDonorMaster('
					+ r.lstIntendOrganDonorMasterDto[i].intendId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteIntendOrganDonorMaster('
					+ r.lstIntendOrganDonorMasterDto[i].intendId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (CallFrom == "search") {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.intendId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.intendOrganDonor
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editIntendOrganDonorMaster('
				+ r.intendId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteIntendOrganDonorMaster('
				+ r.intendId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#intendOrganDonorDetails").html(htm);
}

function editIntendOrganDonorMaster(intendId) {
	var inputs = [];
	inputs.push('intendId=' + intendId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/intendOrganDonorMaster/editIntendOrganDonorMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntryIntendOrganDonor").show('slow');
			$('#intendOrganDonorName').val(r.intendOrganDonor);
			$('#intendId').val(r.intendId);

		}
	});
}

function deleteIntendOrganDonorMaster(intendId) {
	var r = confirm("Are You Sure You Want To Delete Intend Organ Donor Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/intendOrganDonorMaster/deleteIntendOrganDonorMaster",
			data : {
				"intendId" : intendId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllIntendOrganDonorMaster();
			}
		});
	}
}

function intendOrganDonorMasterAutoSuggestion(inputID) {
	var resultData = [];
	var intendOrganDonor = $("#" + inputID).val();

	if (intendOrganDonor == "" || intendOrganDonor == null || intendOrganDonor == "null"
			|| intendOrganDonor == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllIntendOrganDonorMaster()
		return false;
	}

	var inputs = [];
	inputs.push('intendOrganDonor=' + intendOrganDonor);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/intendOrganDonorMaster/intendOrganDonorMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstIntendOrganDonorMasterDto.length; j++) {
				var arrValue = response.lstIntendOrganDonorMasterDto[j].intendId
						+ "-" + response.lstIntendOrganDonorMasterDto[j].intendOrganDonor;
				var idValue = response.lstIntendOrganDonorMasterDto[j].intendId;
				var intendOrganDonor = response.lstIntendOrganDonorMasterDto[j].intendOrganDonor;
				resultData.push({
					ID : idValue,
					Name : intendOrganDonor,
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
		var intendId = res[0];
		var intendOrganDonor = res[1];
		getIntendOrganDonorMasterById(intendId);
		$("input#" + inputID).val(intendOrganDonor);
	}
}

function getIntendOrganDonorMasterById(intendId) {
	var inputs = [];
	inputs.push('intendId=' + intendId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/intendOrganDonorMaster/editIntendOrganDonorMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllIntendOrganDonorMaster(r, "search");
			clearIntendOrganDonorMasterForm();
		}

	});

}

function intendOrganDonorMasterSearchById() {
	var intendId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(intendId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getIntendOrganDonorMasterById(intendId);
}

function toggleEntryDiv() {
	$("#divForEntryIntendOrganDonor").toggle('slow');
}

function clearIntendOrganDonorMasterForm() {
	$('#intendOrganDonorName').val('');
	$('#intendId').val(0);
}
function refreshIntendOrganDonorMaster() {
	$('#intendOrganDonorName').val('');
	$('#intendId').val(0);
}


function getAllIntendedOrgansToDonate(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getAllOrgansIntendedToDonate",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setOrgansList(r);
		},
	});
}

function setOrgansList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Organ - </option>";
	
    for ( var i = 0; i < r.lstIntendOrganDonorMasterDto.length; i++) {  

        list = list + "<option value='"+r.lstIntendOrganDonorMasterDto[i].intendId+"' class='un'>" + (r.lstIntendOrganDonorMasterDto[i].intendOrganDonor) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'></option>";  
    $("#intendToDonateOrganId").html(list);
    $('#intendToDonateOrganId').select2();
    $('#select_organ_donor_name_id').html(list);
    $('#select_organ_donor_name_id').select2();

}
function getAllDonorTypeList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getAllDonorTypeList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDonorTypeList(r);
		},
	});
}

function setDonorTypeList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Donor Type - </option>";
	
    for ( var i = 0; i < r.lstDonorTypeMasterDto.length; i++) {  

        list = list + "<option value='"+r.lstDonorTypeMasterDto[i].donorTypeId+"' class='un'>" + (r.lstDonorTypeMasterDto[i].donorType) + "</option>";    
    }  
    //list = list + "<option value='-1' class='un'></option>";  
    $("#donorType").html(list);

}