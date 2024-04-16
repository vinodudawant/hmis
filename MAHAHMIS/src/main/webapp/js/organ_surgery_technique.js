function saveSurgeryTechnique() {
	var stId = $('#stId').val();
	var stName = $('#stName').val();
	if (stName == "" || stName == undefined
			|| stName == null) {
		alert("Please enter Surgery Technique type");
		return false;
	}
	var inputs = [];
	inputs.push('stId=' + stId);
	inputs.push('stName=' + stName);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/surgeryTechnique/saveSurgeryTechnique",
		data : str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("surgery_technique Saved Sucessfully");
				clearSurgeryTechnique();
				getAllSurgeryTechnique();
			} else if (data == 2) {
				alertify.success("surgery_technique Updated Sucessfully");
				clearSurgeryTechnique();
				getAllSurgeryTechnique();
			} else if (data == 3) {
				alertify.success("surgery_technique already present");
				clearSurgeryTechnique();
				getAllSurgeryTechnique();
				
			}
		}
	});
}

function getAllSurgeryTechnique() {

	
	var unitId = $("#unitId").val();
	var inputs = [];
	//inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/surgeryTechnique/getAllSurgeryTechnique",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			setAllSurgeryTechnique(r, "All");
		}
	});
}

function setAllSurgeryTechnique(r, CallFrom) {
	
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstSurgeryTechniqueDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstSurgeryTechniqueDto[i].stId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstSurgeryTechniqueDto[i].stName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editSurgeryTechnique('
					+ r.lstSurgeryTechniqueDto[i].stId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteSurgeryTechnique('
					+ r.lstSurgeryTechniqueDto[i].stId
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
				+ r.stId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.stName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editSurgeryTechnique('
				+ r.stId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteSurgeryTechnique('
				+ r.stId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#surgeryTechniqueTypeDetails").html(htm);
}

function editSurgeryTechnique(stId) {
	var inputs = [];
	inputs.push('id=' + stId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/surgeryTechnique/editSurgeryTechnique",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntrySurgeryTechnique").show('slow');
			$('#stName').val(r.stName);
			$('#stId').val(r.stId);

		}
	});
}

function deleteSurgeryTechnique(stId) {
	var r = confirm("Are You Sure You Want To Delete Surgery Technique Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/surgeryTechnique/deleteSurgeryTechnique",
			data : {
				"stId" : stId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllSurgeryTechnique();
			}
		});
	}
}

function surgeryTechniqueAutoSuggestion(inputID) {
	
	var resultData = [];
	var stName = $("#" + inputID).val();

	if (stName == "" || stName == null || stName == "null"
			|| stName == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllSurgeryTechnique();
		return false;
	}

	var inputs = [];
	inputs.push('stName=' + stName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/surgeryTechnique/surgeryTechniqueAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstSurgeryTechniqueDto.length; j++) {
				var arrValue = response.lstSurgeryTechniqueDto[j].stId
						+ "-" + response.lstSurgeryTechniqueDto[j].stName;
				var idValue = response.lstSurgeryTechniqueDto[j].stId;
				var stName = response.lstSurgeryTechniqueDto[j].stName;
				resultData.push({
					ID : idValue,
					Name : stName,
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
		var stId = res[0];
		var stName = res[1];
		getSurgeryTechniqueById(stId);
		$("input#" + inputID).val(stName);
	}
}

function getSurgeryTechniqueById(stId) {
	var inputs = [];
	inputs.push('id=' + stId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/surgeryTechnique/editSurgeryTechnique",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSurgeryTechnique(r, "search");
			clearSurgeryTechnique();
		}

	});

}

function surgeryTechniqueSearchById() {

	var stId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(stId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getSurgeryTechniqueById(stId);
}

function toggleEntryDiv() {
	$("#divForEntrySurgeryTechnique").toggle('slow');
}

function clearSurgeryTechnique() {
	$('#stName').val('');
	$('#stId').val(0);
}

