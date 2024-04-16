function getTemForOPDStaging(id) {
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	//Added by Akshata
	$("#instruct").hide();
	$("#ddInstructions").hide();
	$("#ADNOTE").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	 $("#ddInstructions").hide();
	var temp = '<div id="Clinical" class="tab-pane fade active in">'
			+ '<div id="row1" class="c	temForSubObj(id);ol-sm-12-1" style="margin-bottom: 9px;">'
			+'<input type="hidden" value="0" id="clinicalStagingMasterId">'
			+'<input type="hidden" value="0" id="stageMasterId">'
			+ '<div id="col1" class="col-sm-2-1" style="margin-top: 10px; margin-left: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label class="TextFont">Body Part</label>'
			+ '<select onchange=getTNMByBodyPartIdOnClinicalStaging("onload") name="body_part" id="bodyPartList" class="form-control input-SmallText"></select>'
			+ '</div></div>'
			+ '<div id="col2" class="col-sm-2-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label class="TextFont">TNM Stage</label>'
			+ '<div id="tnm_stage">'
			+ '<input type="text" id="tnmStage" placeholder="TNM Stage" name="tnmStage" value="t0,n0,m0" class="typeahead form-control input-SmallText" />'
			+ '</div></div></div>'
			+ '<div id="col2" class="col-sm-2-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label class="TextFont">Group Name</label>'
			+ '<div> <input type="text" id="tnmGroupStage" placeholder="Group Name" name="tnm_gr_stage" class="typeahead form-control input-SmallText" />'
			+ '</div></div></div>'
			+ '<div id="col3" class="col-sm-1-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Description</label>'
			+ '<textarea id="tnmDescription" class="form-control" style="width: 162px; height: 29px;" type="text" rows="2" cols="10" placeholder="Description"></textarea>'
			+ '</div> </div>'
			+ '<div id="col4" class="col-sm-1-1" style="margin-top: 10px; margin-left: 80px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Date</label>'
			+ '<input type="text" placeholder="Date" name="date" readonly="readonly" id="clinicalStageDate" onclick=displayCalendar(document.getElementById("clinicalStageDate"),\'yyyy-mm-dd\',this) class="form-control input-SmallText" />'
			+ '</div> </div>'
			+ '<div id="col3" class="col-sm-1-1" style="margin-top: 10px; margin-left: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Comment</label>'
			+ '<input type="text" placeholder="Comments" name="comments" id="commentClinicalstate" class="form-control input-SmallText" />'
			+ '</div> </div>'
			+ '<div id="col8" class="col-sm-1-1" style="margin-top: -31px; margin-left: 300px;"> <div class="divide-10"></div>'
			+ '<button id="btnSaveClinicalStage" class="btn btn-xs btn-success editUserAccess" onclick="saveOPDCinicalStaging()">Save</button>'
			+ '</div> </div>'
			+ '<div class="col-md-12-1" style="padding: 12px 10px 2px 12px;">'
			+ '<div class="col-md-4-1"> <div class="row"> <div class="col-md-8"> <h4>Tumor</h4> </div> </div>'
			+ '<div style="overflow-y: auto; max-height: 150px;">'
			+ '<table class="table table-responsive table-bordered">'
			+ '<tbody id="TMasterBodyDD"> </tbody>'
			+ '</table> </div> </div>'
			+ '<div class="col-md-4-1"> <div class="row"> <div class="col-md-8"> <h4>Lymph Nodes</h4> </div> </div>'
			+ '<div style="overflow-y: auto; max-height: 150px;">'
			+ '<table class="table table-responsive table-bordered">'
			+ '<tbody id="NMasterBodyDD"> </tbody>'
			+ '</table> </div> </div>'
			+ '<div class="col-md-4-1"> <div class="row">'
			+ '<div class="col-md-8">'
			+ '<h4>Metastasis</h4>'
			+ '</div> </div>'
			+ '<div style="overflow-y: auto; max-height: 150px;">'
			+ '<table class="table table-responsive table-bordered">'
			+ '<tbody id="MetaMasterBodyDD">'
			+ '</tbody>'
			+ '</table> </div> </div></div>'
			+ '<div id="row2" class="col-sm-12-1" style="margin-top: 9px;">'
			+ '<div class="col-md-12-1"> <div class="col-sm-12-1"></div>'
			+ '<div class="box-body col-md-12-1"><div class="form-group  box border col-md-12-1">'
			+ '<div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">'
			+ '<label class="btn" onclick="resetTNMSatge()" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;">'
			+ '<i class="fa fa-plus"></i> New </label>'
			+ '<label class="btn" onclick="editOPDClinicalStaging()" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" id="editClinical"> '
			+ '<i class="fa fa-edit"></i> Edit </label>'
			+ '<label class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" id="deleteClinical" onclick="deleteOPDClinicalStaging()">'
			+ '<i class="fa fa-trash-o"></i> Delete </label> </div>'
			+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: 0px;">'
			+ '<table class="table table-bordered table-striped table-condensed cf">'
			+ '<thead> <tr> <th class="center"><div class="TextFont">#</div></th>'
			+ '<th><div class="TextFont">Body Part</div></th><th><div class="TextFont">TNM Stage</div></th>'
			+ '<th><div class="TextFont">Group Name</div></th><th><div class="TextFont">Description</div></th>'
			+ '<th><div class="TextFont">Date</div></th><th><div class="TextFont">Comment</div></th>'
			+ '<th><div class="TextFont">Investigator</div></th><th><div class="TextFont">Action</div></th></tr></thead>'
			+ '<tbody id="clinicalStagesBody"></tbody></table>'
			+ '</div></div></div></div></div></div></div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	getBodyPartList();
	getOPDClinicalStagingList();

}

function getBodyPartList(){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organ/getAllOrganMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var organListTemp = "";
			organListTemp = organListTemp + "<option value='0'>--Select Organ--</option>";
			for ( var i = 0; i < r.lstOrganMaster.length; i++) {
				organListTemp = organListTemp + "<option value=" +r.lstOrganMaster[i].organId + " data-name="+r.lstOrganMaster[i].organName+">"
					+ r.lstOrganMaster[i].organName + "</option>";
			}
			$("#bodyPartList").html(organListTemp);
			
		}
	});
	
	var prevtre = $('#prevtr').val();
	if(prevtre=='previousPatient'){
	    previousTreatmentDisable();
	}
}


function saveOPDCinicalStaging(){
	
	var treatmentId = $("#tr_Id").val();
	var patientId = $("#pt_Id").val();
	//var treatmentId;
	var clinicalStagingMasterId = $("#clinicalStagingMasterId").val();
	var bodyPartId = $("#bodyPartList").val();
	var tnmStage = $("#tnmStage").val();
	var groupName = $("#tnmGroupStage").val();
	var description = $("#tnmDescription").val();
	var clinicalDate = $("#clinicalStageDate").val();
	var comment = $("#commentClinicalstate").val();
	var stageMasterId = $("#stageMasterId").val();
	
	
	var bodyPartName=$("#bodyPartList option:selected").text();
	var UHID="";
	var unitId=1;
	
	var userId=1;
	
	
	
	if(bodyPartId == " " || bodyPartId ==0 || bodyPartId == null || bodyPartId == "undefined" || bodyPartId == undefined){
		
		alert("Please Select Body Part First..");
		return false;
	}
	
	
var inputs = [];
	
	inputs.push('clinicalStagingMasterId=' + clinicalStagingMasterId);
	
	inputs.push('bodyPartId=' + bodyPartId);
	
	inputs.push('bodyPartName=' + bodyPartName);
	
	inputs.push('tnmStage=' + tnmStage);
	
	inputs.push('groupName=' + groupName);
	
	inputs.push('description=' + description);
	
	inputs.push('clinicalDate=' + clinicalDate);
	
	inputs.push('comment=' + comment);
	
	inputs.push('UHID=' + UHID);
	
	inputs.push('unitId=' + unitId);
	
	inputs.push('userId=' + userId);
	
	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('stageMasterId=' + stageMasterId);
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdclinical/saveOPDCinicalStaging",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if(r ==1){
				alert("Record Saved Successfully");
			}else if(r == 2){
				alert("Updated Saved Successfully");
			}else{
				alert("Network Issue..");
			}
		

			getOPDClinicalStagingList();
			refreshOPDDClinicalDataData();
		}
	});

	
}

function refreshOPDDClinicalDataData(){
	 $("#clinicalStagingMasterId").val(0);
	 $("#bodyPartList").val(0);
	$("#tnmStage").val(" ");
	 $("#tnmGroupStage").val(" ");
	 $("#tnmDescription").val(" ");
	 $("#clinicalStageDate").val(" ");
	 $("#commentClinicalstate").val(" ");
	 
		$('#TMasterBodyDD').html("");
		$('#NMasterBodyDD').html("");
		$('#MetaMasterBodyDD').html("");
}

function getOPDClinicalStagingList(){
	var treatmentId = $("#tr_Id").val();

	//var unitId = $("#unitId").val();
	var unitId=1;
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('unitId=' + unitId);

	//inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdclinical/getOPDClinicalStagingList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			
			setOPDClinicalList(r);

		}
	});
}

function setOPDClinicalList(res){

	var result='';
	var rowCount=1;
	
	if(res.getListOfOPDClinicalStagingDTO.length > 0){
		

			for (var i = 0; i < res.getListOfOPDClinicalStagingDTO.length; i++) {

			var clinicalStagingMasterId = res.getListOfOPDClinicalStagingDTO[i].clinicalStagingMasterId;

			result = result + '<tr> '

			+ "<td> <span id='snum" + rowCount + "'>" + rowCount
					+ "</span><input type='hidden'   id='dietSlaveId"
					+ rowCount + "' value='" + clinicalStagingMasterId
					+ "' ></td>"

					+ '	<td>'
					+ res.getListOfOPDClinicalStagingDTO[i].bodyPartName
					+ '</td> '

					+ '	<td>' + res.getListOfOPDClinicalStagingDTO[i].tnmStage
					+ '</td> '

					+ '	<td>' + res.getListOfOPDClinicalStagingDTO[i].groupName
					+ '</td> '

					+ '	<td>'
					+ res.getListOfOPDClinicalStagingDTO[i].description
					+ '</td> '

					+ '	<td>'
					+ res.getListOfOPDClinicalStagingDTO[i].clinicalDate
					+ '</td> '

					+ '	<td>' + res.getListOfOPDClinicalStagingDTO[i].comment
					+ '</td> '

					+ '	<td>' + res.getListOfOPDClinicalStagingDTO[i].investigatorName + '</td> '

					+ '<td><input value="' + rowCount + '"  id="'
					+ clinicalStagingMasterId
					+ '" name="opddietforeditdelete" type="checkbox"></td>'

					+ '</tr> ';
			rowCount++;

		}
	
	}else{//Added By Annapurna
		result = result + '<tr> <td callspan="5" > record not found </td>/tr>';	
	}
	$("#clinicalStagesBody").html(result);
}


/******
 * @author   :Dayanand khandekar
 * @Date     :28-12-2021
 * @Code     :set clinical Staging for opd Doctor Station
 * *****/
function editOPDClinicalStaging(){
	var docId = new Array();
	
	$("input[name='opddietforeditdelete']:checked").each(function() {	
		
		
		
		var dietId=$("#dietSlaveId"+$(this).val()).val();
		
		docId.push(dietId);
		
	});
	
	
	
	if(docId.length > 1){
		alert("Please Select Only One Record To edit...");
		return false;
	}
	
	
	
	
	if(docId.length  == 0 )
		{
		alert("please select Record First.");
		return false;
		}
	
	
    var inputs = [];
	inputs.push('id=' + docId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdclinical/editOPDClinicalStaging",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			 $("#clinicalStagingMasterId").val(r.clinicalStagingMasterId);
			 $("#bodyPartList").val(r.bodyPartId);
			$("#tnmStage").val(r.tnmStage);
			 $("#tnmGroupStage").val(r.groupName);
			 $("#tnmDescription").val(r.description);
			 $("#clinicalStageDate").val(r.clinicalDate);
			 $("#commentClinicalstate").val(r.comment);
			 getTNMByBodyPartIdOnClinicalStaging('ONLOAD');
			 
			    var stageMasterIds=r.stageMasterId;
			    var stageArray=stageMasterIds.split(",");
			    var tvalue=stageArray[0];
			    var lvalue=stageArray[1];
			    var mvalue=stageArray[2];
			    
			    $("input:checkbox[class='newTDelcheckBox groupMaster_"+tvalue+"']").attr("checked", true);
			    $("input:checkbox[class='newNDelcheckBox_ groupMaster_"+lvalue+"']").attr("checked", true);
			    $("input:checkbox[class='newMetaDelcheckBox_ groupMaster_"+mvalue+"']").attr("checked", true);
			
					//$('#newTcheckBox_' + index).prop('checked',	true);
				
		}
	});
}


/******
 * @author   :Dayanand khandekar
 * @Date     :28-12-2021
 * @Code     :set clinical Staging for deleteOPDClinicalStaging
 * *****/

function deleteOPDClinicalStaging(){
	var docId = new Array();
//	var userId		= parseInt($("#userId").val());
	var userId=1;	
	$("input[name='opddietforeditdelete']:checked").each(function() {	
		
		var dietId=$("#dietSlaveId"+$(this).val()).val();
		
		docId.push(dietId);
	});

	
	if(docId.length == 0){
		alert("Please Select Record..");
		return false;
	}

	
	
	   if(docId.length>0){

		 var inputs = [];
			inputs.push('id=' + docId);
			inputs.push('userId=' + userId);
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/opdclinical/deleteOPDClinicalStaging",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
						
					if(r==0){
						alert("Network issue....");
					}else{
						alert("Record Deleted Successfully");
						
						getOPDClinicalStagingList();
						
					}
				
				
				}
			}); 
	   } 
}




/******
 * @author   :Dayanand khandekar
 * @Date     :5-1-2022
 * @Code     :get Tnm Master Details On Clinical Staging
 * *****/

function getTNMByBodyPartIdOnClinicalStaging(type) {
	var bodyPartId = $("#bodyPartList").val();
	
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
					
					$('#TMasterBodyDD').html("");
					$('#NMasterBodyDD').html("");
					$('#MetaMasterBodyDD').html("");
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
									/*+ "<td><input type='checkbox' id='newTcheckBox_"
									+ index
									+ "' class='newTcheckBox' data-size='mini'  data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"*/
									+ "<td><input type='checkbox'  name='markchecks' value='"
									+ r[i].id
									+ "' id='newTDelcheckBox_"
									+ index
									+ "' class='newTDelcheckBox groupMaster_"
									+ r[i].id
									+ "' onchange='setGroupStageOnClinicalStage()'></td></tr>";
							;
							$('#TMasterBodyDD').append(content);
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
									/*+ "<td><input type='checkbox' id='newNcheckBox_"
									+ lindex
									+ "' class='newNcheckBox' data-size='mini' data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"*/
									+ "<td><input type='checkbox' name='markchecksNm' value='"
									+ r[i].id
									+ "' id='newNDelcheckBox_"
									+ lindex
									+ "' class='newNDelcheckBox_ groupMaster_"
									+ r[i].id
									+ "' onchange='setGroupStageOnClinicalStage()'></td></tr>";
							$('#NMasterBodyDD').append(content);

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
									/*+ "<td><input type='checkbox' id='newMetacheckBox_"
									+ mindex
									+ "' class='newMetacheckBox'  data-size='mini'  data-on='yes' data-off='No' data-onstyle='success' data-offstyle='danger' data-toggle='toggle'></td>"*/
									+ "<td><input name='markcheckMeta' type='checkbox' value='"
									+ r[i].id
									+ "' id='newMetaDelcheckBox_"
									+ mindex
									+ "' class='newMetaDelcheckBox_ groupMaster_"
									+ r[i].id
									+ "' onchange='setGroupStageOnClinicalStage()'></td></tr>";
							$('#MetaMasterBodyDD').append(content);

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


/******
 * @author   :Dayanand khandekar
 * @Date     :5-1-2022
 * @Code     :get Tnm Master Details On Clinical Staging
 * *****/
function setGroupStageOnClinicalStage() {
	var exTcheckBoxArray = [];
	var primaryTecheckBoxArray = [];
	$.each($(".newTDelcheckBox:checked"), function() {
		var id = (this.id).split("_")[1];
		exTcheckBoxArray.push(parseInt(id));
		primaryTecheckBoxArray.push(this.value);
	});
	var Tmax = Math.max.apply(null, exTcheckBoxArray);
	var TValue = $('#newTstage_' + Tmax).val();

	var pvalue = Math.max.apply(null, primaryTecheckBoxArray);
	
	var exNcheckBoxArray = [];
	var primaryNecheckBoxArray = [];
	$.each($(".newNDelcheckBox_:checked"), function() {
		var id = (this.id).split("_")[1];
		exNcheckBoxArray.push(parseInt(id));
		primaryNecheckBoxArray.push(this.value);
	});
	var Nmax = Math.max.apply(null, exNcheckBoxArray);
	var NValue = $('#newNstage_' + Nmax).val();
	var nvalue = Math.max.apply(null, primaryNecheckBoxArray);

	var exMetacheckBoxArray = [];
	var primaryMecheckBoxArray = [];
	$.each($(".newMetaDelcheckBox_:checked"), function() {
		var id = (this.id).split("_")[1];
		exMetacheckBoxArray.push(parseInt(id));
		primaryMecheckBoxArray.push(this.value);
	});
	var Metamax = Math.max.apply(null, exMetacheckBoxArray);
	var MetaValue = $('#newMetastage_' + Metamax).val();
	var mvalue = Math.max.apply(null, primaryMecheckBoxArray);

	if (TValue == undefined) {
		TValue = "t0";
	}
	if (NValue == undefined) {
		NValue = "n0";
	}
	if (MetaValue == undefined) {
		MetaValue = "m0";
	}
	
	if (pvalue == undefined) {
		pvalue = "0";
	}
	
	if (nvalue == undefined) {
		nvalue = "0";
	}
	
	if (mvalue == undefined) {
		mvalue = "0";
	}

	var tnmStage = TValue + "," + NValue + "," + MetaValue;
	$('#tnmStage').val(tnmStage);
	var primaryValues=pvalue +"," + nvalue +"," +mvalue;
	$("#stageMasterId").val(primaryValues);
	getGroupNameByTnmStage(tnmStage);
	
}


function getGroupNameByTnmStage(groupStage){

	var inputs = [];
	inputs.push('groupStage=' + groupStage);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/tnmMaster/getGroupNameByTnmStage",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			if(r==""){
				$("#tnmGroupStage").val("t0,n0,m0")
			}else{
				$("#tnmGroupStage").val(r)
			}
			
			
		}
	});

	
}


