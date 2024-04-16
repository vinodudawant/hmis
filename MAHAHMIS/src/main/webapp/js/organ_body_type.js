function saveBodyType() {
	
	var bodyTypeId = $('#bodyTypeId').val();
	var bodyTypeName = $('#bodyTypeName').val();
	if (bodyTypeName == "" || bodyTypeName == undefined
			|| bodyTypeName == null) {
		alert("Please enter Body type");
		return false;
	}
	var inputs = [];
	inputs.push('bodyTypeId=' + bodyTypeId);
	inputs.push('bodyTypeName=' + bodyTypeName);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/bodyType/saveBodyType",
		data : str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Body_Type Saved Sucessfully");
				clearBodyType();
				getAllBodyType();
			} else if (data == 2) {
				alertify.success("Body_Type Updated Sucessfully");
				clearBodyType();
				getAllBodyType();
			} else if (data == 3) {
				alertify.success("Body_Type already present");
				clearBodyType();
				getAllBodyType();
				
			}
		}
	});
}

function getAllBodyType() {

	var unitId = $("#unitId").val();
	var inputs = [];
	//inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodyType/getAllBodyType",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			setAllBodyType(r, "All");
		}
	});
}

function setAllBodyType(r, CallFrom) {
	
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstBodyTypeDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstBodyTypeDto[i].bodyTypeId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstBodyTypeDto[i].bodyTypeName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBodyType('
					+ r.lstBodyTypeDto[i].bodyTypeId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBodyType('
					+ r.lstBodyTypeDto[i].bodyTypeId
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
				+ r.bodyTypeId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.bodyTypeName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editBodyType('
				+ r.bodyTypeId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteBodyType('
				+ r.bodyTypeId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#bodyTypeDetails").html(htm);
}

function editBodyType(bodyTypeId) {
	var inputs = [];
	inputs.push('id=' + bodyTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodyType/editBodyType",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntryBodyType").show('slow');
			$('#bodyTypeName').val(r.bodyTypeName);
			$('#bodyTypeId').val(r.bodyTypeId);

		}
	});
}

function deleteBodyType(bodyTypeId) {
	var r = confirm("Are You Sure You Want To Delete Body Type Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bodyType/deleteBodyType",
			data : {
				"bodyTypeId" : bodyTypeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllBodyType();
			}
		});
	}
}

function bodyTypeAutoSuggestion(inputID) {
	var resultData = [];
	var bodyTypeName = $("#" + inputID).val();

	if (bodyTypeName == "" || bodyTypeName == null || bodyTypeName == "null"
			|| bodyTypeName == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllBodyType()
		return false;
	}

	var inputs = [];
	inputs.push('bodyTypeName=' + bodyTypeName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bodyType/bodyTypeAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstBodyTypeDto.length; j++) {
				var arrValue = response.lstBodyTypeDto[j].bodyTypeId
						+ "-" + response.lstBodyTypeDto[j].bodyTypeName;
				var idValue = response.lstBodyTypeDto[j].bodyTypeId;
				var bodyTypeName = response.lstBodyTypeDto[j].bodyTypeName;
				resultData.push({
					ID : idValue,
					Name : bodyTypeName,
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
		var bodyTypeId = res[0];
		var bodyTypeName = res[1];
		getBodyTypeById(bodyTypeId);
		$("input#" + inputID).val(bodyTypeName);
	}
}

function getBodyTypeById(bodyTypeId) {
	var inputs = [];
	inputs.push('id=' + bodyTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodyType/editBodyType",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBodyType(r, "search");
			clearBodyType();
		}

	});

}

function bodyTypeSearchById() {
	var bodyTypeId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(bodyTypeId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getBodyTypeById(bodyTypeId);
}

function toggleEntryDiv() {
	$("#divForEntryBodyType").toggle('slow');
}

function clearBodyType() {
	$('#bodyTypeName').val('');
	$('#bodyTypeId').val(0);
}

