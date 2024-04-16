function saveBodySize() {
	var bodySizeId = $('#bodySizeId').val();
	var bodySizeName = $('#bodySizeName').val();
	if (bodySizeName == "" || bodySizeName == undefined
			|| bodySizeName == null) {
		alert("Please enter Body Size type");
		return false;
	}
	var inputs = [];
	inputs.push('bodySizeId=' + bodySizeId);
	inputs.push('bodySizeName=' + bodySizeName);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/bodySize/saveBodySize",
		data : str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("body_size Saved Sucessfully");
				clearBodySize();
				getAllBodySize();
			} else if (data == 2) {
				alertify.success("body_size Updated Sucessfully");
				clearBodySize();
				getAllBodySize();
			} else if (data == 3) {
				alertify.success("body_size already present");
				clearBodySize();
				getAllBodySize();
				
			}
		}
	});
}

function getAllBodySize() {

	
	var unitId = $("#unitId").val();
	var inputs = [];
	//inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodySize/getAllBodySize",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			setAllBodySize(r, "All");
		}
	});
}

function setAllBodySize(r, CallFrom) {
	
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstBodySizeDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstBodySizeDto[i].bodySizeId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstBodySizeDto[i].bodySizeName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBodySize('
					+ r.lstBodySizeDto[i].bodySizeId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBodySize('
					+ r.lstBodySizeDto[i].bodySizeId
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
				+ r.bodySizeId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.bodySizeName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editBodySize('
				+ r.bodySizeId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteBodySize('
				+ r.bodySizeId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#bodySizeTypeDetails").html(htm);
}

function editBodySize(bodySizeId) {

	var inputs = [];
	inputs.push('id=' + bodySizeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodySize/editBodySize",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntryBodySize").show('slow');
			$('#bodySizeName').val(r.bodySizeName);
			$('#bodySizeId').val(r.bodySizeId);

		}
	});
}

function deleteBodySize(bodySizeId) {
	var r = confirm("Are You Sure You Want To Delete Body Size Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bodySize/deleteBodySize",
			data : {
				"bodySizeId" : bodySizeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllBodySize();
			}
		});
	}
}

function bodySizeAutoSuggestion(inputID) {

	var resultData = [];
	var bodySizeName = $("#" + inputID).val();

	if (bodySizeName == "" || bodySizeName == null || bodySizeName == "null"
			|| bodySizeName == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllBodySize()
		return false;
	}

	var inputs = [];
	inputs.push('bodySizeName=' + bodySizeName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bodySize/bodySizeAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstBodySizeDto.length; j++) {
				var arrValue = response.lstBodySizeDto[j].bodySizeId
						+ "-" + response.lstBodySizeDto[j].bodySizeName;
				var idValue = response.lstBodySizeDto[j].bodySizeId;
				var bodySizeName = response.lstBodySizeDto[j].bodySizeName;
				resultData.push({
					ID : idValue,
					Name : bodySizeName,
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
		var bodySizeId = res[0];
		var bodySizeName = res[1];
		getBodySizeById(bodySizeId);
		$("input#" + inputID).val(bodySizeName);
	}
}

function getBodySizeById(bodySizeId) {
	var inputs = [];
	inputs.push('id=' + bodySizeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodySize/editBodySize",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBodySize(r, "search");
			clearBodySize();
		}

	});

}

function bodySizeSearchById() {
	var bodySizeId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(bodySizeId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getBodySizeById(bodySizeId);
}

function toggleEntryDiv() {
	$("#divForEntryBodySize").toggle('slow');
}

function clearBodySize() {
	$('#bodySizeName').val('');
	$('#bodySizeId').val(0);
}

