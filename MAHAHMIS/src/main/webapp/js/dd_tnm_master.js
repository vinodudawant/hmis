function addTumorRow() {
	var index = $('#TMasterBody tr').length + 1;
	var content = "<tr class='newTmasterRow' id='newTmasterRow_"
			+ index
			+ "'><td><label class='TextFont'>"
			+ index
			+ "</label></td>"
			+ "<td><input type='text' id='newTdescription_"
			+ index
			+ "' class='form-control input-SmallText'></td>"
			+ "<td><input type='text' id='newTstage_"
			+ index
			+ "' class='form-control input-SmallText'></td>"
			+ "<td><input type='checkbox' id='newTcheckBox_"
			+ index
			+ "' class='newTcheckBox'  checked data-size='mini'  data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle' ></td>"
			+ "<td><input name='markchecks' type='checkbox' value='0' id='newTDelcheckBox_"
			+ index + "' class='newTDelcheckBox'></td></tr>";
	;
	$('#TMasterBody').append(content);
	$('#newTcheckBox_' + index).bootstrapToggle();
}

function removeTumorRow() {
	$.each($(".newTDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		$('#newTmasterRow_' + id).remove();
	});

	var tnmMasterIdArray = [];
	$.each($(".exTDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		tnmMasterIdArray.push(id);
	});

	if (tnmMasterIdArray != null && tnmMasterIdArray != "") {
		removeTNMBytnmMasterId(tnmMasterIdArray);
	}
}

function addNodeRow() {
	var index = $('#NMasterBody tr').length + 1;
	var content = "<tr class='newNmasterRow' id='newNmasterRow_"
			+ index
			+ "'><td><label class='TextFont'>"
			+ index
			+ "</label></td>"
			+ "<td><input type='text' id='newNdescription_"
			+ index
			+ "' class='form-control input-SmallText'></td>"
			+ "<td><input type='text' id='newNstage_"
			+ index
			+ "' class='form-control input-SmallText'></td>"
			+ "<td><input type='checkbox' id='newNcheckBox_"
			+ index
			+ "' class='newNcheckBox' data-size='mini'  data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
			+ "<td><input name='markchecksNm' type='checkbox' value='0' id='newNDelcheckBox_"
			+ index + "' class='newNDelcheckBox'></td></tr>";
	$('#NMasterBody').append(content);
	$('.newNcheckBox').bootstrapToggle();
}

function removeNodeRow() {
	$.each($(".newNDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		$('#newNmasterRow_' + id).remove();
	});

	var tnmMasterIdArray = [];
	$.each($(".exNDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		tnmMasterIdArray.push(id);
	});

	if (tnmMasterIdArray != null && tnmMasterIdArray != "") {
		removeTNMBytnmMasterId(tnmMasterIdArray);
	}
}

function addMetastasizedRow() {
	var index = $('#MetaMasterBody tr').length + 1;
	var content = "<tr class='newMetamasterRow' id='newMetamasterRow_"
			+ index
			+ "'><td><label class='TextFont'>"
			+ index
			+ "</label></td>"
			+ "<td><input type='text' id='newMetadescription_"
			+ index
			+ "' class='form-control input-SmallText'></td>"
			+ "<td><input type='text' id='newMetastage_"
			+ index
			+ "' class='form-control input-SmallText'></td>"
			+ "<td><input type='checkbox' id='newMetacheckBox_"
			+ index
			+ "' class='newMetacheckBox' data-size='mini'  data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
			+ "<td><input type='checkbox' name='markcheckMeta' value='0' id='newMetaDelcheckBox_"
			+ index + "' class='newMetaDelcheckBox'></td></tr>";
	$('#MetaMasterBody').append(content);
	$('.newMetacheckBox').bootstrapToggle();
}

function removeMetastasizedRow() {
	$.each($(".newMetaDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		$('#newMetamasterRow_' + id).remove();
	});

	var tnmMasterIdArray = [];
	$.each($(".exMetaDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		tnmMasterIdArray.push(id);
	});

	if (tnmMasterIdArray != null && tnmMasterIdArray != "") {
		removeTNMBytnmMasterId(tnmMasterIdArray);
	}
}

function onSaveTnmMaster() {

	var bodyPart = $("#bodyPart").val();
	
	var bodyPartName = $("#bodyPart").find(':selected').attr('data-name');

	if (bodyPart == 0) {
		alertify.error("please select body part");
		return false;
	}

	var onTnmTableList = {
		listOfTnmMaster : []
	};
	var count = 0;
	var countForNm = 0;
	var countForMeta = 0;
	var nmTotalRow = $('#NMasterBody tr').length;

	var onTnmTableNmList = {
		listOfTnmMaster : []
	};

	var onTnmMetalList = {
		listOfTnmMaster : []
	};

	for (var i = 1; i <= nmTotalRow; i++) {
		countForNm++;
		var idPostTnmTable = $("#newNDelcheckBox_" + countForNm + "").val();
		var description = $("#newNdescription_" + countForNm + "").val();
		var newstage = $("#newNstage_" + countForNm + "").val();
		var newNcheckBox = $("#newNcheckBox_" + countForNm + "").val();

		if ($("#newNcheckBox_" + countForNm + "").prop("checked")) {
			newNcheckBox = "yes";
		} else {
			newNcheckBox = "no";
		}

		onTnmTableNmList.listOfTnmMaster.push({
			"id" : idPostTnmTable,
			"tnmDesc" : description,
			"tnmStage" : newstage,
			"tnmStatus" : newNcheckBox,
			"bodyPartId" : bodyPart,
            "bodyPartName":bodyPartName
		});

	}

	var totalRow = $('#TMasterBody tr').length;

	for (var i = 1; i <= totalRow; i++) {

		count++;
		var idPostTnmTable = $("#newTDelcheckBox_" + count + "").val();

		var description = $("#newTdescription_" + count + "").val();

		var newstage = $("#newTstage_" + count + "").val();

		var checkBox = $("#newTcheckBox_" + count + "").val();

		if ($("#newTcheckBox_" + count + "").prop("checked")) {
			checkBox = "yes";
		} else {
			checkBox = "no";
		}

		onTnmTableList.listOfTnmMaster.push({
			"id" : idPostTnmTable,
			"tnmDesc" : description,
			"tnmStage" : newstage,
			"tnmStatus" : checkBox,
			"bodyPartId" : bodyPart,
			"bodyPartName":bodyPartName
		});

	}

	var metaMasterRow = $('#MetaMasterBody tr').length;

	for (var i = 1; i <= metaMasterRow; i++) {
		countForMeta++;
		var idPostTnmTable = $("#newMetaDelcheckBox_" + countForMeta + "")
				.val();
		var description = $("#newMetadescription_" + countForMeta + "").val();
		var newstage = $("#newMetastage_" + countForMeta + "").val();
		var newNcheckBox = $("#newMetacheckBox_" + countForMeta + "").val();

		if ($("#newMetacheckBox_" + countForMeta + "").prop("checked")) {
			newNcheckBox = "yes";
		} else {
			newNcheckBox = "no";
		}

		onTnmMetalList.listOfTnmMaster.push({
			"id" : idPostTnmTable,
			"tnmDesc" : description,
			"tnmStage" : newstage,
			"tnmStatus" : newNcheckBox,
			"bodyPartId" : bodyPart,
			"bodyPartName":bodyPartName
		});

	}

	onTnmTableList = JSON.stringify(onTnmTableList);
	onTnmTableNmList = JSON.stringify(onTnmTableNmList);
	onTnmMetalList = JSON.stringify(onTnmMetalList);

	var inputs = [];
	inputs.push("tabletnmData=" + encodeURIComponent(onTnmTableList));
	inputs.push("tabletnmNmData=" + encodeURIComponent(onTnmTableNmList));
	inputs.push("tabletnmMetaData=" + encodeURIComponent(onTnmMetalList));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/tnmMaster/savetnmMaster",
		data : str + "&reqType=AJAX",
		cache : false,

		error : function() {
			alertify.error("error");
		},
		success : function(r) {
			alertify.success(r);
			resetTnMaster();
		}
	});
}

function getTnmMasterDetail(type) {
	var bodyPartId = $("#bodyPart").val();
	
	if(type=='onload'){
		$("#tnmGroupStage").val("t0,n0,m0");
		$("#groupName").val("");
	}
	
	var inputs = [];
	inputs.push("bodyPartId=" + bodyPartId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/tnmMaster/getTnmDetails",
				data : str + "&reqType=AJAX",
				cache : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$('#TMasterBody').html("");
					//$("#tnmGroupStage").val("t0,n0,m0");
					$('#NMasterBody').html("");
					$('#MetaMasterBody').html("");
					var str = $("#tnmGroupStage").val();
				
					var arr = str.split(",");
					var index = 1;
					var lindex = 1;
					var mindex = 1;
					// for tumor
					for (var i = 0; i < r.length; i++) {
						if (r[i].tnmFlag == "t") {
							var content = "<tr class='newTmasterRow' id='newTmasterRow_"
									+ index
									+ "'><td><label class='TextFont'>"
									+ index
									+ "</label></td>"
									+ "<td><input type='text'  value='"
									+ r[i].tnmDesc
									+ "' id='newTdescription_"
									+ index
									+ "' class='form-control input-SmallText'></td>"
									+ "<td><input type='text' value='"
									+ r[i].tnmStage
									+ "' id='newTstage_"
									+ index
									+ "' class='form-control input-SmallText'></td>"
									+ "<td><input type='checkbox' id='newTcheckBox_"
									+ index
									+ "' class='newTcheckBox' data-size='mini'  data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
									+ "<td><input type='checkbox'  name='markchecks' value='"
									+ r[i].id
									+ "' id='newTDelcheckBox_"
									+ index
									+ "' class='newTDelcheckBox groupMaster_"
									+ r[i].id
									+ "' onchange='setGroupStage()'></td></tr>";
							;
							$('#TMasterBody').append(content);
							if (r[i].tnmStatus == "yes") {

								$('#newTcheckBox_' + index).prop('checked',
										true);
							}
							$('.newTcheckBox').bootstrapToggle();

							for (var j = 0; j < arr.length; j++) {
								if (arr[j] == r[i].tnmStage) {

									$("#newTDelcheckBox_" + index).prop(
											'checked', true);
								}
							}
							index++;

						}
						if (r[i].tnmFlag == "l") {
							var content = "<tr class='newNmasterRow' id='newNmasterRow_"
									+ lindex
									+ "'><td><label class='TextFont'>"
									+ lindex
									+ "</label></td>"
									+ "<td><input type='text'  value='"
									+ r[i].tnmDesc
									+ "' id='newNdescription_"
									+ lindex
									+ "' class='form-control input-SmallText'></td>"
									+ "<td><input type='text' value='"
									+ r[i].tnmStage
									+ "' id='newNstage_"
									+ lindex
									+ "' class='form-control input-SmallText'></td>"
									+ "<td><input type='checkbox' id='newNcheckBox_"
									+ lindex
									+ "' class='newNcheckBox' data-size='mini' data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
									+ "<td><input type='checkbox' name='markchecksNm' value='"
									+ r[i].id
									+ "' id='newNDelcheckBox_"
									+ lindex
									+ "' class='newNDelcheckBox_ groupMaster_"
									+ r[i].id
									+ "' onchange='setGroupStage()'></td></tr>";
							$('#NMasterBody').append(content);

							if (r[i].tnmStatus == "yes") {
								$('#newNcheckBox_' + lindex).prop('checked',
										true);
							}
							$('.newNcheckBox').bootstrapToggle();

							for (var j = 0; j < arr.length; j++) {
								if (arr[j] == r[i].tnmStage) {

									$("#newNDelcheckBox_" + lindex).prop(
											'checked', true);
								}
							}
							lindex++;
						}

						if (r[i].tnmFlag == "m") {
							var content = "<tr class='newMetamasterRow' id='newMetamasterRow_"
									+ mindex
									+ "'><td><label class='TextFont'>"
									+ mindex
									+ "</label></td>"
									+ "<td><input type='text' value='"
									+ r[i].tnmDesc
									+ "' id='newMetadescription_"
									+ mindex
									+ "' class='form-control input-SmallText'></td>"
									+ "<td><input type='text' value='"
									+ r[i].tnmStage
									+ "' id='newMetastage_"
									+ mindex
									+ "' class='form-control input-SmallText'></td>"
									+ "<td><input type='checkbox' id='newMetacheckBox_"
									+ mindex
									+ "' class='newMetacheckBox'  data-size='mini'  data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
									+ "<td><input name='markcheckMeta' type='checkbox' value='"
									+ r[i].id
									+ "' id='newMetaDelcheckBox_"
									+ mindex
									+ "' class='newMetaDelcheckBox_ groupMaster_"
									+ r[i].id
									+ "' onchange='setGroupStage()'></td></tr>";
							$('#MetaMasterBody').append(content);

							if (r[i].tnmStatus == "yes") {
								$('#newMetacheckBox_' + mindex).prop('checked',
										true);
							}
							$('.newMetacheckBox').bootstrapToggle();
							for (var j = 0; j < arr.length; j++) {
								if (arr[j] == r[i].tnmStage) {

									$("#newMetaDelcheckBox_" + mindex).prop(
											'checked', true);
								}
							}
							mindex++;
						}
					}
				}
			});

}

function setGroupStage() {
	var exTcheckBoxArray = [];
	$.each($(".newTDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exTcheckBoxArray.push(parseInt(id));
	});
	var Tmax = Math.max.apply(null, exTcheckBoxArray);
	var TValue = $('#newTstage_' + Tmax).val();

	var exNcheckBoxArray = [];
	$.each($(".newNDelcheckBox_:checked"), function() {
		var id = (this.id).split("_")[1];
		exNcheckBoxArray.push(parseInt(id));
	});
	var Nmax = Math.max.apply(null, exNcheckBoxArray);
	var NValue = $('#newNstage_' + Nmax).val();

	var exMetacheckBoxArray = [];
	$.each($(".newMetaDelcheckBox_:checked"), function() {
		var id = (this.id).split("_")[1];
		exMetacheckBoxArray.push(parseInt(id));
	});
	var Metamax = Math.max.apply(null, exMetacheckBoxArray);
	var MetaValue = $('#newMetastage_' + Metamax).val();

	if (TValue == undefined) {
		TValue = "t0";
	}
	if (NValue == undefined) {
		NValue = "n0";
	}
	if (MetaValue == undefined) {
		MetaValue = "m0";
	}

	var tnmStage = TValue + "," + NValue + "," + MetaValue;
	$('#tnmGroupStage').val(tnmStage);
}

function saveTnmGroupMaster() {
	var bodyPartName = $("#bodyPart").find(':selected').attr('data-name');
	idList = [];
	$("#TMasterBody").find('input[name="markchecks"]').each(function() {
		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	$("#NMasterBody").find('input[name="markchecksNm"]').each(function() {
		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});
	$("#MetaMasterBody").find('input[name="markcheckMeta"]').each(function() {
		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});
	
	if(idList.length==0){
		alertify.error("please Fill TNM Master First");
		return false;
	}

	$("#tnmMasterIds").val(idList);
	var inputs = [];
	var ids = $("#tnmMasterIds").val();
	var bodyPartId = $("#bodyPart").val();
	var groupName = $("#groupName").val();

	if (bodyPartId == "" || bodyPartId == null || bodyPartId == undefined
			|| bodyPartId == 0) {
		alertify.error("please select body part");
		return false;
	}
	if (groupName == "" || groupName == null || groupName == undefined
			|| groupName == 0) {
		alertify.error("please enter group name");
		return false;
	}

	var groupId = $("#groupId").val();
	inputs.push("id=" + groupId);
	inputs.push("bodyPartId=" + bodyPartId);
	var tnmGroupStage = $("#tnmGroupStage").val();
	inputs.push('bodyPartName=' + bodyPartName);
	inputs.push('groupName=' + groupName);
	inputs.push('groupStage=' + tnmGroupStage);
	inputs.push('tnmMasterId=' + ids);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/tnmMaster/saveTnmGroups",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			getGroups();
			alertify.success(r);
			resetTnMaster();

		}
	});
}
function getGroups() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/tnmMaster/getTnmGroups",
		data : "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToPopupTable(r);
		}
	});
}
function setDataToPopupTable(r) {
	var htm = "";
	var index = 1;
	for (var i = 0; i < r.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td>'
				+ index
				+ '</td>'
				+ ' <td>'
				+ r[i].groupName
				+ '</td>'
				+ "<td id='groupstageid_'>"
				+ r[i].groupStage
				+ ' <td>'
				+ r[i].bodyPartName
				+ '</td>'
				+ "<td class='hidden' id='groupArray_"
				+ r[i].id
				+ "'>"
				+ r[i].tnmMasterId
				+ '<td><button class="btn btn-success btn-xs" data-dismiss="modal" onclick=editGroups('
				+ r[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td><button class="btn btn-danger btn-xs" data-dismiss="modal" onclick=deleteGroups('
				+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
	}
	if (r.length == 0) {
		htm = htm
				+ "<tr><td colspan='6' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}

	$("#tnmGroupList").html(htm);

}

function editGroups(id) {
	var inputs = [];
	inputs.push("id=" + id);
	var groupArray = $('#groupArray_' + id).html();
	console.log("aaaaaaaaa" + groupArray);
	var tnmAllStages = groupArray.split(",");
	setTimeout(function() {
		for (var i = 0; i < tnmAllStages.length; i++) {
			$(".groupMaster_" + tnmAllStages[i]).attr("checked", true);
		}
	}, 300);
	$('#tnmGroupStage').val($('#groupstageid_').html());
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/tnmMaster/getTnmGroupsById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			for (var i = 0; i < r.length; i++) {	
				$("#groupModal").modal('hide');
				$("#groupId").val(r[i].id);
				$("#bodyPart").val(r[i].bodyPartId);
				//$("#tnmGroupStage").val(r[i].groupStage);
				$("#groupName").val(r[i].groupName);
				getTnmMasterDetail();
			}
		}
	});

}
function deleteGroups(id) {
	var inputs = [];
	inputs.push("id=" + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/tnmMaster/deleteTnmGroups",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getGroups();
		}
	});

}

function resetTnMaster() {
	$("#groupId").val(0);
	$("#bodyPart").val(0);
	$('#TMasterBody').html("");
	$('#NMasterBody').html("");
	$('#MetaMasterBody').html("");
	$("#tnmGroupStage").val("t0,n0,m0");
	$("#groupName").val("");

}

