function saveClodIschemiaTime() {
	
	var clodIschemiaTimeId = $('#clodIschemiaTimeId').val();
	var clodIschemiaTimeName = $('#clodIschemiaTimeName').val();
	if (clodIschemiaTimeName == "" || clodIschemiaTimeName == undefined
			|| clodIschemiaTimeName == null) {
		alert("Please enter Clod Ischemia Time type");
		return false;
	}
	var inputs = [];
	inputs.push('clodIschemiaTimeId=' + clodIschemiaTimeId);
	inputs.push('clodIschemiaTimeName=' + clodIschemiaTimeName);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/clodIschemiaTime/saveClodIschemiaTime",
		data : str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Clod_Ischemia_TIme Saved Sucessfully");
				clearClodIschemiaTime();
				getAllClodIschemiaTime();
			} else if (data == 2) {
				alertify.success("Clod_Ischemia_TIme Updated Sucessfully");
				clearClodIschemiaTime();
				getAllClodIschemiaTime();
			} else if (data == 3) {
				alertify.success("Clod_Ischemia_TIme already present");
				clearClodIschemiaTime();
				getAllClodIschemiaTime();
				
			}
		}
	});
}

function getAllClodIschemiaTime() {
	
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clodIschemiaTime/getAllClodIschemiaTime",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			setAllClodIschemiaTime(r, "All");
		}
	});
}

function setAllClodIschemiaTime(r, CallFrom) {
	
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstClodIschemiaTimeDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstClodIschemiaTimeDto[i].clodIschemiaTimeId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstClodIschemiaTimeDto[i].clodIschemiaTimeName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editClodIschemiaTime('
					+ r.lstClodIschemiaTimeDto[i].clodIschemiaTimeId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteClodIschemiaTime('
					+ r.lstClodIschemiaTimeDto[i].clodIschemiaTimeId
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
				+ r.clodIschemiaTimeId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.clodIschemiaTimeName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editClodIschemiaTime('
				+ r.clodIschemiaTimeId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteClodIschemiaTime('
				+ r.clodIschemiaTimeId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#clodIschemiaTimeTypeDetails").html(htm);
}

function editClodIschemiaTime(clodIschemiaTimeId) {
	var inputs = [];
	inputs.push('id=' + clodIschemiaTimeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clodIschemiaTime/editClodIschemiaTime",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntryClodIschemiaTimeType").show('slow');
			$('#clodIschemiaTimeName').val(r.clodIschemiaTimeName);
			$('#clodIschemiaTimeId').val(r.clodIschemiaTimeId);

		}
	});
}

function deleteClodIschemiaTime(clodIschemiaTimeId) {
	var r = confirm("Are You Sure You Want To Delete ClodIschemiaTime Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/clodIschemiaTime/deleteClodIschemiaTime",
			data : {
				"clodIschemiaTimeId" : clodIschemiaTimeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllClodIschemiaTime();
			}
		});
	}
}

function clodIschemiaTimeAutoSuggestion(inputID) {
	var resultData = [];
	var clodIschemiaTimeName = $("#" + inputID).val();

	if (clodIschemiaTimeName == "" || clodIschemiaTimeName == null || clodIschemiaTimeName == "null"
			|| clodIschemiaTimeName == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllClodIschemiaTime()
		return false;
	}

	var inputs = [];
	inputs.push('clodIschemiaTimeName=' + clodIschemiaTimeName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/clodIschemiaTime/clodIschemiaTimeAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstClodIschemiaTimeDto.length; j++) {
				var arrValue = response.lstClodIschemiaTimeDto[j].clodIschemiaTimeId
						+ "-" + response.lstClodIschemiaTimeDto[j].clodIschemiaTimeName;
				var idValue = response.lstClodIschemiaTimeDto[j].clodIschemiaTimeId;
				var clodIschemiaTimeName = response.lstClodIschemiaTimeDto[j].clodIschemiaTimeName;
				resultData.push({
					ID : idValue,
					Name : clodIschemiaTimeName,
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
		var clodIschemiaTimeId = res[0];
		var clodIschemiaTimeName = res[1];
		getClodIschemiaTimeById(clodIschemiaTimeId);
		$("input#" + inputID).val(clodIschemiaTimeName);
	}
}

function getClodIschemiaTimeById(clodIschemiaTimeId) {
	var inputs = [];
	inputs.push('id=' + clodIschemiaTimeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clodIschemiaTime/editClodIschemiaTime",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllClodIschemiaTime(r, "search");
			clearClodIschemiaTime();
		}

	});

}

function clodIschemiaTimeSearchById() {
	var clodIschemiaTimeId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(clodIschemiaTimeId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getClodIschemiaTimeById(clodIschemiaTimeId);
}

function toggleEntryDiv() {
	$("#divForEntryClodIschemiaTimeType").toggle('slow');
}

function clearClodIschemiaTime() {
	$('#clodIschemiaTimeName').val('');
	$('#clodIschemiaTimeId').val(0);
}

