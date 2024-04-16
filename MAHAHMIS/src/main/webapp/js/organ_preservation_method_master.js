function savePreservationMethodMaster() {
	var preservationMethodMasterId = $('#preservationId').val();
	var preservationMethodName = $('#preservationMethodName').val();
	if (preservationMethodName == "" || preservationMethodName == undefined
			|| preservationMethodName == null) {
		alert("Please enter Preservation Method Master type");
		return false;
	}

	var inputs = [];
	inputs.push('preservationMethodMasterId=' + preservationMethodMasterId);
	inputs.push('preservationMethodName=' + preservationMethodName);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/preservationMethodMaster/savePreservationMethodMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Preservation_method_master Saved Sucessfully");
				clearPreservationMethodMaster();
				getAllPreservationMethodMaster();
			} else if (data == 2) {
				alertify.success("Preservation_method_master Updated Sucessfully");
				clearPreservationMethodMaster();
				getAllPreservationMethodMaster();
			} else if (data == 3) {
				alertify.success("Preservation_method_master already present");
				clearPreservationMethodMaster();
				getAllPreservationMethodMaster();
				
			}
		}
	});
}

function getAllPreservationMethodMaster() {
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/preservationMethodMaster/getAllPreservationMethodMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			setAllPreservationMethodMaster(r, "All");
		}
	});
}

function setAllPreservationMethodMaster(r, CallFrom) {
	
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstPreservationMethodMasterDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstPreservationMethodMasterDto[i].preservationMethodMasterId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstPreservationMethodMasterDto[i].preservationMethodName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editPreservationMethodMaster('
					+ r.lstPreservationMethodMasterDto[i].preservationMethodMasterId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deletePreservationMethodMaster('
					+ r.lstPreservationMethodMasterDto[i].preservationMethodMasterId
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
				+ r.preservationMethodMasterId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.preservationMethodName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editPreservationMethodMaster('
				+ r.preservationMethodMasterId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deletePreservationMethodMaster('
				+ r.preservationMethodMasterId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#preservationMethodMasterTypeDetails").html(htm);
}

function editPreservationMethodMaster(preservationMethodMasterId) {
	var inputs = [];
	inputs.push('id=' + preservationMethodMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/preservationMethodMaster/editPreservationMethodMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntryPreservaionMethodMaster").show('slow');
			$('#preservationMethodName').val(r.preservationMethodName);
			$('#preservationId').val(r.preservationMethodMasterId);

		}
	});
}

function deletePreservationMethodMaster(preservationMethodMasterId) {
	var r = confirm("Are You Sure You Want To Delete PreservationMethod Type Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/preservationMethodMaster/deletePreservationMethodMaster",
			data : {
				"preservationMethodMasterId" : preservationMethodMasterId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllPreservationMethodMaster();
			}
		});
	}
}

function preservationMethodMasterAutoSuggestion(inputID) {
	var resultData = [];
	var preservationMethodName = $("#" + inputID).val();
	
	if (preservationMethodName == "" || preservationMethodName == null || preservationMethodName == "null"
			|| preservationMethodName == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllPreservationMethodMaster();
		return false;
	}

	var inputs = [];
	inputs.push('preservationMethodName=' + preservationMethodName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/preservationMethodMaster/preservationMethodMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstPreservationMethodMasterDto.length; j++) {
				var arrValue = response.lstPreservationMethodMasterDto[j].preservationMethodMasterId
						+ "-" + response.lstPreservationMethodMasterDto[j].preservationMethodName;
				var idValue = response.lstPreservationMethodMasterDto[j].preservationMethodMasterId;
				var preservationMethodName = response.lstPreservationMethodMasterDto[j].preservationMethodName;
				resultData.push({
					ID : idValue,
					Name : preservationMethodName,
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
		var preservationMethodMasterId = res[0];
		var preservationMethodName = res[1];
		getPreservationMethodMasterById(preservationMethodMasterId);
		$("input#" + inputID).val(preservationMethodName);
	}
}

function getPreservationMethodMasterById(preservationMethodMasterId) {
	var inputs = [];
	inputs.push('id=' + preservationMethodMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/preservationMethodMaster/editPreservationMethodMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllPreservationMethodMaster(r, "search");
			clearPreservationMethodMaster();
		}

	});

}

function preservationMethodMasterSearchById() {

	var preservationMethodMasterId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(preservationMethodMasterId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getPreservationMethodMasterById(preservationMethodMasterId);
}

function toggleEntryDiv() {
	$("#divForEntryPreservaionMethodMaster").toggle('slow');
}

function clearPreservationMethodMaster() {
	$('#preservationMethodName').val('');
	$('#preservationMethodMasterId').val(0);
}

