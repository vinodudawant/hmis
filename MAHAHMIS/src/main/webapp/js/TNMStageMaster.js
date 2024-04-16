
function getAllBodyPart1() {
	jQuery.ajax({
		type : "GET",
		url : "useraccess/getAllBodyPart",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
		//	alert(JSON.stringify(response[0].bodyPartName));
			var bodyPartList = "<option value=''>-Select-</option>";
			for ( var i = 0; i < response.length; i++) {
				bodyPartList = bodyPartList + "<option value='"
						+ response[i].bodyPartId + "'>"
						+ response[i].bodyPartName + "</option>";
			}
			$('#bodyPartList').html(bodyPartList);
		}
	});
}

function removeTNMBytnmMasterId(tnmMasterIdArray) {
	var r = confirm("Are you sure you want to delete?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			data : {
				"tnmMasterIdArray[]" : tnmMasterIdArray
			},
			url : "useraccess/removeTNMBytnmMasterId",
			error : function() {
				alert("error");
			},
			success : function(r) {
				getTNMByBodyPartId($('#bodyPartList').val());
				alert("TNM Stage Master Romoved Successfully");
			}
		});
	}
}

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
			+ "' class='newTcheckBox' data-size='mini' data-on='Checkbox' data-off='Radio' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
			+ "<td><input type='checkbox' id='newTDelcheckBox_" + index
			+ "' class='newTDelcheckBox'></td></tr>";
	;
	$('#TMasterBody').append(content);
	$('.newTcheckBox').bootstrapToggle();
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
			+ "' class='newNcheckBox' data-size='mini' data-on='Checkbox' data-off='Radio' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
			+ "<td><input type='checkbox' id='newNDelcheckBox_" + index
			+ "' class='newNDelcheckBox'></td></tr>";
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
			+ "' class='newMetacheckBox' data-size='mini' data-on='Checkbox' data-off='Radio' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
			+ "<td><input type='checkbox' id='newMetaDelcheckBox_" + index
			+ "' class='newMetaDelcheckBox'></td></tr>";
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

function saveTNMStageMaster() {
	var bodyPartId = $('#bodyPartList').val();
	var newTdescriptionArray = [];
	var newTstageArray = [];
	var newTcheckRadioArray = [];
	var newNdescriptionArray = [];
	var newNstageArray = [];
	var newNcheckRadioArray = [];
	var newMetadescriptionArray = [];
	var newMetastageArray = [];
	var newMetacheckRadioArray = [];
	var exTdescriptionArray = [];
	var exTstageArray = [];
	var exTcheckRadioArray = [];
	var exNdescriptionArray = [];
	var exNstageArray = [];
	var exNcheckRadioArray = [];
	var exMetadescriptionArray = [];
	var exMetastageArray = [];
	var exMetacheckRadioArray = [];
	var exTmasterIdArray = [];
	var exNmasterIdArray = [];
	var exMetamasterIdArray = [];

	$.each($("#TMasterBody .exTmasterRow"), function() {
		var id = (this.id).split("_")[1];
		exTmasterIdArray.push(id);
		exTdescriptionArray.push($('#exTdescription_' + id).val());
		exTstageArray.push($('#exTstage_' + id).val());
		if ($("#exTcheckBox_" + id).prop("checked")) {
			exTcheckRadioArray.push("checkbox");
		} else {
			exTcheckRadioArray.push("radio");
		}
	});

	$.each($("#NMasterBody .exNmasterRow"), function() {
		var id = (this.id).split("_")[1];
		exNmasterIdArray.push(id);
		exNdescriptionArray.push($('#exNdescription_' + id).val());
		exNstageArray.push($('#exNstage_' + id).val());
		if ($("#exNcheckBox_" + id).prop("checked")) {
			exNcheckRadioArray.push("checkbox");
		} else {
			exNcheckRadioArray.push("radio");
		}
	});

	$.each($("#MetaMasterBody .exMetamasterRow"), function() {
		var id = (this.id).split("_")[1];
		exMetamasterIdArray.push(id);
		exMetadescriptionArray.push($('#exMetadescription_' + id).val());
		exMetastageArray.push($('#exMetastage_' + id).val());
		if ($("#exMetacheckBox_" + id).prop("checked")) {
			exMetacheckRadioArray.push("checkbox");
		} else {
			exMetacheckRadioArray.push("radio");
		}
	});

	$.each($("#TMasterBody .newTmasterRow"), function() {
		var id = (this.id).split("_")[1];
		newTdescriptionArray.push($('#newTdescription_' + id).val());
		newTstageArray.push($('#newTstage_' + id).val());
		if ($("#newTcheckBox_" + id).prop("checked")) {
			newTcheckRadioArray.push("checkbox");
		} else {
			newTcheckRadioArray.push("radio");
		}
	});

	$.each($("#NMasterBody .newNmasterRow"), function() {
		var id = (this.id).split("_")[1];
		newNdescriptionArray.push($('#newNdescription_' + id).val());
		newNstageArray.push($('#newNstage_' + id).val());
		if ($("#newNcheckBox_" + id).prop("checked")) {
			newNcheckRadioArray.push("checkbox");
		} else {
			newNcheckRadioArray.push("radio");
		}
	});

	$.each($("#MetaMasterBody .newMetamasterRow"), function() {
		var id = (this.id).split("_")[1];
		newMetadescriptionArray.push($('#newMetadescription_' + id).val());
		newMetastageArray.push($('#newMetastage_' + id).val());
		if ($("#newMetacheckBox_" + id).prop("checked")) {
			newMetacheckRadioArray.push("checkbox");
		} else {
			newMetacheckRadioArray.push("radio");
		}
	});

	if (bodyPartId == "") {
		alert("Please Select Body Part");
	} else {
		jQuery.ajax({
			type : "POST",
			data : {
				"bodyPartId" : bodyPartId,
				"exTdescriptionArray[]" : exTdescriptionArray,
				"exTstageArray[]" : exTstageArray,
				"exTcheckRadioArray[]" : exTcheckRadioArray,
				"exNdescriptionArray[]" : exNdescriptionArray,
				"exNstageArray[]" : exNstageArray,
				"exNcheckRadioArray[]" : exNcheckRadioArray,
				"exMetadescriptionArray[]" : exMetadescriptionArray,
				"exMetastageArray[]" : exMetastageArray,
				"exMetacheckRadioArray[]" : exMetacheckRadioArray,
				"newTdescriptionArray[]" : newTdescriptionArray,
				"newTstageArray[]" : newTstageArray,
				"newTcheckRadioArray[]" : newTcheckRadioArray,
				"newNdescriptionArray[]" : newNdescriptionArray,
				"newNstageArray[]" : newNstageArray,
				"newNcheckRadioArray[]" : newNcheckRadioArray,
				"newMetadescriptionArray[]" : newMetadescriptionArray,
				"newMetastageArray[]" : newMetastageArray,
				"newMetacheckRadioArray[]" : newMetacheckRadioArray,
				"exTmasterIdArray[]" : exTmasterIdArray,
				"exNmasterIdArray[]" : exNmasterIdArray,
				"exMetamasterIdArray[]" : exMetamasterIdArray
			},
			url : "useraccess/saveTNMStageMaster",
			error : function() {
				alert("error");
			},
			success : function(r) {
				getTNMByBodyPartId(bodyPartId);
				alert("TNM Stage Master Saved Successfully");
			}
		});
	}
}

function getTNMByBodyPartId(bodyPartId) {
	if (bodyPartId != "") {
		jQuery
				.ajax({
					type : "POST",
					data : {
						"bodyPartId" : bodyPartId
					},
					url : "useraccess/getTNMByBodyPartId",
					error : function() {
						alert("error");
					},
					success : function(r) {
						$('#TMasterBody').html("");
						$('#NMasterBody').html("");
						$('#MetaMasterBody').html("");

						// For doctor desk-->clinical stage
						$('#TMasterBodyDD').html("");
						$('#NMasterBodyDD').html("");
						$('#MetaMasterBodyDD').html("");

						var TIndex = 1;
						var NIndex = 1;
						var MIndex = 1;
						for ( var i = 0; i < r.length; i++) {
							if (r[i].tnmType == 'T') {
								var content = "<tr class='exTmasterRow' id='exTmasterRow_"
										+ r[i].tnmMasterId
										+ "'><td><label class='TextFont'>"
										+ TIndex
										+ "</label></td>"
										+ "<td><input type='text' id='exTdescription_"
										+ r[i].tnmMasterId
										+ "' value='"
										+ r[i].tnmDescription
										+ "' class='form-control input-SmallText'></td>"
										+ "<td><input type='text' id='exTstage_"
										+ r[i].tnmMasterId
										+ "' value='"
										+ r[i].tnmStage
										+ "' class='form-control input-SmallText'></td>"
										+ "<td><input type='checkbox' id='exTcheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exTcheckBox bootstrapToggle' data-size='mini' data-on='Checkbox' data-off='Radio' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
										+ "<td><input type='checkbox' id='exTDelcheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exTDelcheckBox groupMaster groupMaster_"
										+ r[i].tnmMasterId
										+ "' onchange='setGroupStage()'></td></tr>";
								$('#TMasterBody').append(content);
								if (r[i].tnmCheckBoxRadio == "checkbox") {
									$('#exTcheckBox_' + r[i].tnmMasterId).prop(
											'checked', true);
								}
								TIndex++;

								// For doctor desk-->clinical stage
								var contentDD = "<tr id='exTmasterRow_"
										+ r[i].tnmMasterId
										+ "'><td style='width: 30px;'><input value='"
										+ r[i].tnmStage
										+ "' type='checkbox' id='exTcheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exTcheckBox stageMaster' onchange='setStage()'></td><td>"
										+ r[i].tnmDescription + "</td></tr>";
								$('#TMasterBodyDD').append(contentDD);
							} else if (r[i].tnmType == 'N') {
								var content = "<tr class='exNmasterRow' id='exNmasterRow_"
										+ r[i].tnmMasterId
										+ "'><td><label class='TextFont'>"
										+ NIndex
										+ "</label></td>"
										+ "<td><input type='text' id='exNdescription_"
										+ r[i].tnmMasterId
										+ "' value='"
										+ r[i].tnmDescription
										+ "' class='form-control input-SmallText'></td>"
										+ "<td><input type='text' id='exNstage_"
										+ r[i].tnmMasterId
										+ "' value='"
										+ r[i].tnmStage
										+ "' class='form-control input-SmallText'></td>"
										+ "<td><input type='checkbox' id='exNcheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exNcheckBox bootstrapToggle' data-size='mini' data-on='Checkbox' data-off='Radio' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
										+ "<td><input type='checkbox' id='exNDelcheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exNDelcheckBox groupMaster groupMaster_"
										+ r[i].tnmMasterId
										+ "' onchange='setGroupStage()'></td></tr>";
								$('#NMasterBody').append(content);
								if (r[i].tnmCheckBoxRadio == "checkbox") {
									$('#exNcheckBox_' + r[i].tnmMasterId).prop(
											'checked', true);
								}
								NIndex++;

								// For doctor desk-->clinical stage
								var contentDD = "<tr id='exNmasterRow_"
										+ r[i].tnmMasterId
										+ "'><td style='width: 30px;'><input value='"
										+ r[i].tnmStage
										+ "' type='checkbox' id='exNcheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exNcheckBox stageMaster' onchange='setStage()'></td><td>"
										+ r[i].tnmDescription + "</td></tr>";
								$('#NMasterBodyDD').append(contentDD);
							} else if (r[i].tnmType == 'M') {
								var content = "<tr class='exMetamasterRow' id='exMetamasterRow_"
										+ r[i].tnmMasterId
										+ "'><td><label class='TextFont'>"
										+ MIndex
										+ "</label></td>"
										+ "<td><input type='text' id='exMetadescription_"
										+ r[i].tnmMasterId
										+ "' value='"
										+ r[i].tnmDescription
										+ "' class='form-control input-SmallText'></td>"
										+ "<td><input type='text' id='exMetastage_"
										+ r[i].tnmMasterId
										+ "' value='"
										+ r[i].tnmStage
										+ "' class='form-control input-SmallText'></td>"
										+ "<td><input type='checkbox' id='exMetacheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exMetacheckBox bootstrapToggle' data-size='mini' data-on='Checkbox' data-off='Radio' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"
										+ "<td><input type='checkbox' id='exMetaDelcheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exMetaDelcheckBox groupMaster groupMaster_"
										+ r[i].tnmMasterId
										+ "' onchange='setGroupStage()'></td></tr>";
								;
								$('#MetaMasterBody').append(content);
								if (r[i].tnmCheckBoxRadio == "checkbox") {
									$('#exMetacheckBox_' + r[i].tnmMasterId)
											.prop('checked', true);
								}
								MIndex++;

								// For doctor desk-->clinical stage
								var contentDD = "<tr id='exMetamasterRow_"
										+ r[i].tnmMasterId
										+ "'><td style='width: 30px;'><input value='"
										+ r[i].tnmStage
										+ "' type='checkbox' id='exMetacheckBox_"
										+ r[i].tnmMasterId
										+ "' class='exMetacheckBox stageMaster' onchange='setStage()'></td><td>"
										+ r[i].tnmDescription + "</td></tr>";
								$('#MetaMasterBodyDD').append(contentDD);
							}
						}

						$('.bootstrapToggle').bootstrapToggle();

					}
				});
	}
}

function setStage() {
	var exTcheckBoxArray = [];
	$.each($(".exTcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exTcheckBoxArray.push(parseInt(id));
	});
	var Tmax = Math.max.apply(null, exTcheckBoxArray);
	var TValue = $('#exTcheckBox_' + Tmax).val();

	var exNcheckBoxArray = [];
	$.each($(".exNcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exNcheckBoxArray.push(parseInt(id));
	});
	var Nmax = Math.max.apply(null, exNcheckBoxArray);
	var NValue = $('#exNcheckBox_' + Nmax).val();

	var exMetacheckBoxArray = [];
	$.each($(".exMetacheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exMetacheckBoxArray.push(parseInt(id));
	});
	var Metamax = Math.max.apply(null, exMetacheckBoxArray);
	var MetaValue = $('#exMetacheckBox_' + Metamax).val();

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
	$('#tnmStage').val(tnmStage);
	getGroupName(tnmStage);
}

function saveClinicalStage() {
	var tnmStageId = $('#tnmStageMasterId').val();
	var bodyPartId = $('#bodyPartList').val();
	var tnmStage = $('#tnmStage').val();
	var tnmGroupStage = $('#tnmGroupStage').val();
	var tnmDescription = $('#tnmDescription').val();
	var clinicalStageDate = $('#clinicalStageDate').val();
	var commentClinicalstate = $('#commentClinicalstate').val();
	var patientId = $('#pid').val();
	var stageArray = [];
	$.each($(".stageMaster:checked"), function() {
		stageArray.push(this.value);
	});
	jQuery.ajax({
		type : "POST",
		data : {
			"tnmStageId" : tnmStageId,
			"bodyPartId" : bodyPartId,
			"tnmStage" : tnmStage,
			"tnmGroupStage" : tnmGroupStage,
			"tnmDescription" : tnmDescription,
			"clinicalStageDate" : clinicalStageDate,
			"commentClinicalstate" : commentClinicalstate,
			"stageArray" : stageArray.toString(),
			"patientId" : patientId
		},
		url : "useraccess/saveClinicalStage",
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#tnmStageMasterId').val("");
			getTNMStageByPatientId(patientId);
			resetTNMSatge();
			alert(r);
		}
	});
}

function getTNMStageByPatientId(patientId) {
	jQuery
			.ajax({
				type : "POST",
				data : {
					"patientId" : patientId
				},
				url : "useraccess/getTNMStageByPatientId",
				error : function() {
					alert("error");
				},
				success : function(r) {
					var content = "";
					var index = 1;
					for ( var i = 0; i < r.length; i++) {
						content += "<tr><td>"
								+ index
								+ "</td><td class='bodyPartId_"
								+ r[i].bodyPartId
								+ "' id='bodypart_"
								+ r[i].tnmStageId
								+ "'>"
								+ r[i].bodyPartName
								+ "</td><td id='tnmStage_"
								+ r[i].tnmStageId
								+ "'>"
								+ r[i].tnmStage
								+ "</td><td id='tnmGroupStage"
								+ r[i].tnmStageId
								+ "'>"
								+ r[i].tnmGroupStage
								+ "</td><td id='tnmDescription_"
								+ r[i].tnmStageId
								+ "'>"
								+ r[i].tnmDescription
								+ "</td><td id='tnmClinicalDate_"
								+ r[i].tnmStageId
								+ "'>"
								+ r[i].tnmClinicalDate
								+ "</td><td id='commentClinicalstate_"
								+ r[i].tnmStageId
								+ "'>"
								+ r[i].tnmComment
								+ "</td><td>"
								+ r[i].userName
								+"</td>";
								
								if(($('#prevtr').val())=="previousTreatmentOPDER"){
									content +="<td><input disabled='' value='"
										+ r[i].tnmStageId
										+ "' class='clinicalCheckBox' type='checkbox'></td><td class='hidden' id='tnmAllStages_"
										+ r[i].tnmStageId + "'>" + r[i].tnmAllStages
										+ "</td>";
								}else{
									content +="<td><input value='"
										+ r[i].tnmStageId
										+ "' class='clinicalCheckBox' type='checkbox'></td><td class='hidden' id='tnmAllStages_"
										+ r[i].tnmStageId + "'>" + r[i].tnmAllStages
										+ "</td>";
								}
								
								content +="<td class='hidden' id='tnmGroupStage_"
								+ r[i].tnmStageId + "'>" + r[i].tnmGroupStage
								+ "</td></tr>";
						index++;
					}
					$('#clinicalStagesBody').html(content);
				}
			});
}

function editClinicalStage() {
	if ($(".clinicalCheckBox:checked").length < 1) {
		alert("Please Select Atleast One Stage");
	} else if ($(".clinicalCheckBox:checked").length > 1) {
		alert("Please Select Only One Stage");
	} else if ($(".clinicalCheckBox:checked").length == 1) {
		var tnmStageId = $(".clinicalCheckBox:checked").val();
		var bodyPartId = $("#bodypart_" + tnmStageId).attr("class").split("_")[1];
		getTNMByBodyPartId(bodyPartId);
		var tnmStage = $('#tnmStage_' + tnmStageId).html();
		var tnmGroupStage = $('#tnmGroupStage_' + tnmStageId).html();
		var tnmDescription = $('#tnmDescription_' + tnmStageId).html();
	//	var clinicalStageDate = $('#clinicalStageDate_' + tnmStageId).html();
		var clinicalStageDate = $('#tnmClinicalDate_' + tnmStageId).html();
		var commentClinicalstate = $('#commentClinicalstate_' + tnmStageId)
				.html();
		var stageArray = $('#tnmAllStages_' + tnmStageId).html();

		$('#bodyPartList').val(bodyPartId);
		$('#tnmStage').val(tnmStage);
		$('#tnmGroupStage').val(tnmGroupStage);
		$('#tnmDescription').val(tnmDescription);
		$('#clinicalStageDate').val(clinicalStageDate);
		$('#commentClinicalstate').val(commentClinicalstate);
		var tnmAllStages = stageArray.split(",");

		setTimeout(function() {
			for ( var i = 0; i < tnmAllStages.length; i++) {
				$("input:checkbox[value=" + tnmAllStages[i] + "]").attr(
						"checked", true);
			}
		}, 300);

		$('#tnmStageMasterId').val(tnmStageId);
	}
}

function removeTNMStageById() {
	var tnmStageIdArray = [];
	$.each($(".clinicalCheckBox:checked"), function() {
		tnmStageIdArray.push(this.value);
	});
	if (tnmStageIdArray != null && tnmStageIdArray != "") {
		var r = confirm("Are you sure you want to delete!");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				data : {
					"tnmStageIdArray[]" : tnmStageIdArray
				},
				url : "useraccess/removeTNMStageById",
				error : function() {
					alert("error");
				},
				success : function(r) {
					getTNMStageByPatientId($('#pt_Id').html());
					alert("TNM Stage Romoved Successfully");
				}
			});
		}
	}
}

function resetTNMSatge() {
	$('#bodyPartList').val("");
	$('#tnmStage').val("t0,n0,m0");
	$('#tnmGroupStage').val("");
	$('#tnmGroupName').val("");
	$('#tnmDescription').val("");
	$('#clinicalStageDate').val("");
	$('#commentClinicalstate').val("");
	$('#tnmStageMasterId').val("");
	$('#TMasterBodyDD').html("");
	$('#NMasterBodyDD').html("");
	$('#MetaMasterBodyDD').html("");
	$('#groupMasterId').val("");
	$('#TMasterBody').html("");
	$('#NMasterBody').html("");
	$('#MetaMasterBody').html("");
}

function setGroupStage() {
	var exTcheckBoxArray = [];
	$.each($(".exTDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exTcheckBoxArray.push(parseInt(id));
	});
	var Tmax = Math.max.apply(null, exTcheckBoxArray);
	var TValue = $('#exTstage_' + Tmax).val();

	var exNcheckBoxArray = [];
	$.each($(".exNDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exNcheckBoxArray.push(parseInt(id));
	});
	var Nmax = Math.max.apply(null, exNcheckBoxArray);
	var NValue = $('#exNstage_' + Nmax).val();

	var exMetacheckBoxArray = [];
	$.each($(".exMetaDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exMetacheckBoxArray.push(parseInt(id));
	});
	var Metamax = Math.max.apply(null, exMetacheckBoxArray);
	var MetaValue = $('#exMetastage_' + Metamax).val();

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

function saveTNMGroup() {
	var groupMasterId = $("#groupMasterId").val();
	var bodyPartId = $('#bodyPartList').val();
	var tnmGroupStage = $('#tnmGroupStage').val();
	var tnmGroupName = $('#tnmGroupName').val();
	var groupArray = [];
	$.each($(".groupMaster:checked"), function() {
		groupArray.push(this.id.split("_")[1]);
	});
	if (bodyPartId == "") {
		alert("Please Select Body Part");
	} else if (tnmGroupName == "") {
		alert("Please Enter Group Name");
	} else {
		jQuery.ajax({
			type : "POST",
			data : {
				"groupMasterId" : groupMasterId,
				"bodyPartId" : bodyPartId,
				"tnmGroupStage" : tnmGroupStage,
				"tnmGroupName" : tnmGroupName,
				"groupArray" : groupArray.toString()
			},
			url : "useraccess/saveTNMGroup",
			error : function() {
				alert("error");
			},
			success : function(r) {
				resetTNMSatge();
				alert(r);
			}
		});
	}
}

function getAllGroup() {
	jQuery
			.ajax({
				type : "get",
				url : "useraccess/getAllGroup",
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#groupModal").modal();
					var content = "";
					var index = 1;
					for ( var i = 0; i < r.length; i++) {
						content += "<tr><td class='center'>"
								+ index
								+ "</td><td id='groupName_"
								+ r[i].groupMasterId
								+ "'>"
								+ r[i].groupName
								+ "</td><td id='groupStage_"
								+ r[i].groupMasterId
								+ "'>"
								+ r[i].groupStage
								+ "</td><td id='bodyPart_"
								+ r[i].groupMasterId
								+ "' class='"
								+ r[i].bodyPartId
								+ "'>"
								+ r[i].bodyPartName
								+ "</td>"
								+ "<td class='hidden' id='groupArray_"
								+ r[i].groupMasterId
								+ "'>"
								+ r[i].groupArray
								+ "</td><td><button class='btn btn-xs btn-success' onclick='getGroupByGroupId("
								+ r[i].groupMasterId
								+ ")'><i class='fa fa-edit'></i></button></td>"
								+ "<td><button class='btn btn-xs btn-success' onclick='deleteGroup("
								+ r[i].groupMasterId
								+ ")'><i class='fa fa-trash-o'></i></button></td></tr>";
						index++;
					}
					if (r.length == 0) {
						content = "<tr><td colspan='6' class='center'>Sorry No Records To Display</td></tr>";
					}
					$("#groupList").html(content);
				}
			});
}

function getGroupByGroupId(groupId) {
	$("#groupMasterId").val(groupId);
	$('#bodyPartList').val($('#bodyPart_' + groupId).attr('class'));
	$('#tnmGroupStage').val($('#groupStage_' + groupId).html());
	$('#tnmGroupName').val($('#groupName_' + groupId).html());
	getTNMByBodyPartId($('#bodyPartList').val());
	var groupArray = $('#groupArray_' + groupId).html();
	var tnmAllStages = groupArray.split(",");
	setTimeout(function() {
		for ( var i = 0; i < tnmAllStages.length; i++) {
			$(".groupMaster_" + tnmAllStages[i]).attr("checked", true);
		}
	}, 300);
	$("#groupModal").modal('hide');
}

function deleteGroup(groupId) {
	var r = confirm("Are you sure you want to delete?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			data : {
				"groupId" : groupId
			},
			url : "useraccess/removeTNMGroupById",
			error : function() {
				alert("error");
			},
			success : function(r) {
				getAllGroup();
				alert(r);
			}
		});
	}
}
// Added by Vikas Godse
function getGroupName(tnmStage) {

	jQuery.ajax({

		type : "POST",

		data : {

			"tnmStage" : tnmStage

		},

		url : "useraccess/getGroupName",

		error : function() {

			alert("error");

		},

		success : function(r) {

			for ( var i = 0; i < r.length; i++) {

				$('#tnmGroupStage').val(r[i].groupName);

			}

			if (r.length == 0) {

				$('#tnmGroupStage').val("");

			}

		}

	});

}