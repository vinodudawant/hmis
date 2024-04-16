function saveDonorTypeMaster() {
	var donorTypeId = $('#donorTypeId').val();
	var donorTypeName = $('#donorTypeName').val();
	if (donorTypeName == "" || donorTypeName == undefined
			|| donorTypeName == null) {
		alert("Please enter donor type");
		return false;
	}
	var inputs = [];
	inputs.push('donorTypeId=' + donorTypeId);
	inputs.push('donorType=' + donorTypeName);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/donorTypeMaster/saveDonorTypeMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Donor Type Saved Sucessfully");
				clearDonorTypeForm();
				getAllDonorTypeMaster();
			} else if (data == 2) {
				alertify.success("Donor Type Updated Sucessfully");
				clearDonorTypeForm();
				getAllDonorTypeMaster();
			} else if (data == 3) {
				alertify.success("Donor Type already present");
				clearDonorTypeForm();
				getAllDonorTypeMaster();
			}
		}
	});
}

function getAllDonorTypeMaster() {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donorTypeMaster/getAllDonorTypeMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorTypeMaster(r, "All");
		}
	});
}

function setAllDonorTypeMaster(r, CallFrom) {

	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstDonorTypeMasterDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDonorTypeMasterDto[i].donorTypeId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDonorTypeMasterDto[i].donorType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editDonorTypeMaster('
					+ r.lstDonorTypeMasterDto[i].donorTypeId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonorTypeMaster('
					+ r.lstDonorTypeMasterDto[i].donorTypeId
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
				+ r.donorTypeId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.donorType
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editDonorTypeMaster('
				+ r.donorTypeId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonorTypeMaster('
				+ r.donorTypeId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#organDonorTypeDetails").html(htm);
}

function editDonorTypeMaster(donorTypeId) {
	var inputs = [];
	inputs.push('id=' + donorTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donorTypeMaster/editDonorTypeMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntryDonorType").show('slow');
			$('#donorTypeName').val(r.donorType);
			$('#donorTypeId').val(r.donorTypeId);

		}
	});
}

function deleteDonorTypeMaster(donorTypeId) {
	var r = confirm("Are You Sure You Want To Delete Donor Type Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/donorTypeMaster/deleteDonorTypeMaster",
			data : {
				"donorTypeId" : donorTypeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllDonorTypeMaster();
			}
		});
	}
}

function donorTypeAutoSuggestion(inputID) {
	var resultData = [];
	var donorType = $("#" + inputID).val();

	if (donorType == "" || donorType == null || donorType == "null"
			|| donorType == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllDonorTypeMaster()
		return false;
	}

	var inputs = [];
	inputs.push('donorType=' + donorType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/donorTypeMaster/donorTypeMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstDonorTypeMasterDto.length; j++) {
				var arrValue = response.lstDonorTypeMasterDto[j].donorTypeId
						+ "-" + response.lstDonorTypeMasterDto[j].donorType;
				var idValue = response.lstDonorTypeMasterDto[j].donorTypeId;
				var donorType = response.lstDonorTypeMasterDto[j].donorType;
				resultData.push({
					ID : idValue,
					Name : donorType,
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
		var donorTypeId = res[0];
		var donorType = res[1];
		getDonorTypeMasterById(donorTypeId);
		$("input#" + inputID).val(donorType);
	}
}

function getDonorTypeMasterById(donorTypeId) {
	var inputs = [];
	inputs.push('id=' + donorTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donorTypeMaster/editDonorTypeMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorTypeMaster(r, "search");
			clearDonorTypeForm();
		}

	});

}

function donorTypeMasterSearchById() {
	var donorTypeId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(donorTypeId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getDonorTypeMasterById(donorTypeId);
}

function toggleEntryDiv() {
	$("#divForEntryDonorType").toggle('slow');
}

function clearDonorTypeForm() {
	$('#donorTypeName').val('');
	$('#donorTypeId').val(0);
}
function refreshDonorTypeMaster() {
	$('#donorTypeName').val('');
	$('#donorTypeId').val(0);
}
