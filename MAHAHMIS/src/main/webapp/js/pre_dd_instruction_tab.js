/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method used for set Instruction template
 * *****/

function getInstructionTemplate(id){	
	//alert("hii----:"+id);
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	
	$("#ipdDoctorStationJSPHeadDiv").html('');
	 $("#ddInstructions").show();
	 $("#instructionTableHeader").show();
		$("#instructionTableColumns").show();
		$("#instruct").show();
	
		$("#diets").hide();
		$("#Prescription").hide();
	 getIndivisualInstructionList();
	 fetchPCTreatmentInstruction();
	fetchGroupReportInstruction();
		 /*fetchSurgicalKitNm('instructions');
		fetchIndividualTreatmentInstruction();*/
	//$("#dd_Instructions").show();
	
}

/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method used for set Instruction List
 * *****/
function setIndivisualInstructionList(res){	
			var result='';
			var rowCount=1;
			
			if(res.getListOfOPDInstructionDTO.length > 0){
				
			for ( var i = 0; i < res.getListOfOPDInstructionDTO.length; i++) {
				
				
				var dietId  = res.getListOfOPDInstructionDTO[i].reportInstructionID;
				
				result = result
						+ '<tr> '
						
						+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='instructionSlaveId" + rowCount + "' value='"
						+ dietId + "' ></td>"
		
						+ '	<td>'
						+res.getListOfOPDInstructionDTO[i].reportInstruction
						+ '</td> '
		   
						if(res.getListOfOPDInstructionDTO[i].mandatoryInstFlag == "Y"){
						
							result = result	+'<td><input value="'+rowCount+'"  id="'+dietId+'" name="individualTreatmentInstructionCheckbox" type="checkbox" checked disabled="disabled"></td>'
						}else{
							result = result	+'<td><input value="'+rowCount+'"  id="'+dietId+'" name="individualTreatmentInstructionCheckbox" type="checkbox" disabled="disabled"></td>'
						}
				
				result = result	
						
						+ '</tr> ';
				rowCount++;
						
			}
			$("#TreatmentInstructionTemp").html(result);
			}		
}

/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method used for enable multiple instruction
 * *****/
function enableAddUpdateReportInstruction() {
	$("#reportInstruction").val("");
	$("#reportInstructionID").val("0");
	$("#reportInstructionHindi").val("");
	$("#reportInstructionMarathi").val("");
	$("#reportInstructionOther1").val("");
	$("#reportInstructionOther2").val("");
	$("#reportInstructionOther3").val("");
	
	$("input[name='checkboxRI']:checked").each(function() {
		$(this).prop("checked", false);
	});
}

/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method used for save multiple instruction
 * *****/
function saveAllIndividualTreatmentInstruction() {

	if (($("#TreatmentInstructionTemp").html()) == "") {
		alert("No Data to Save Instruction...");
		return;
	}

	var individualTreatmentInstructionCheckboxIDArray = new Array();
	var  treatmentid= ($("#tr_Id").val()).trim();
	//alert("treatmentid---"+treatmentid);
	$('#TreatmentInstructionTemp tr')
			.each(
					function() {
						var individualTreatmentInstructionCheckboxID = $(
								($(this)
										.find('input[name=individualTreatmentInstructionCheckbox]:checked')))
								.attr('id');

						if (individualTreatmentInstructionCheckboxID != undefined
								&& individualTreatmentInstructionCheckboxID != "0"
								&& individualTreatmentInstructionCheckboxID != "") {

							/* id=ITIC_13 */
							/*individualTreatmentInstructionCheckboxID = (individualTreatmentInstructionCheckboxID
									.split('_')[1]).trim();*/

							individualTreatmentInstructionCheckboxIDArray
									.push(individualTreatmentInstructionCheckboxID);
						}

					});

	if ((individualTreatmentInstructionCheckboxIDArray.length) == 0) {
		// alert("Please check the checkbox to save Instructions...");
		// return;
	}

	var inputs = [];
	inputs.push('treatmentId=' + treatmentid);
	inputs.push('individualTreatmentInstructionCheckboxIDArray='
			+ individualTreatmentInstructionCheckboxIDArray);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/instructionController/saveIndividualTreatmentInstruction",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			if(r == true){
				alert("Instruction Saved Successfully");
			}else{
				alert("Network Issue...");
			}
			//alert(r);
			fetchIndividualTreatmentInstruction();
		}
	});

}
/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method used save all group details
 * *****/
function saveAllGroupDetails(){
	var instId = 0;
	var engIns = $.trim($("#txtMedicine").val());
	var hindiIns = $.trim($("#txtMedicineH").val());
	var marthiIns = $.trim($("#txtMedicineM").val());
	var otherIns1 = $.trim($("#txtMedicine1ol").val());
	var otherIns2 = $.trim($("#txtMedicine2ol").val());
	var otherIns3 = $.trim($("#txtMedicine3ol").val());
	var unicode = "0";
	var referTo ='OPD';
	var inputs = [];
	inputs.push('id='+instId);
	inputs.push('englishInstruction='+engIns);
	inputs.push('hindiInstruction='+hindiIns);
	inputs.push('marathiInstruction='+marthiIns);
	inputs.push('otherInstruction1='+otherIns1);
	inputs.push('otherInstruction2='+otherIns2);
	inputs.push('otherInstruction3='+otherIns3);
	inputs.push('unicode='+unicode);
	inputs.push('referTo='+referTo);
	var str = inputs.join('&');
	
	if(engIns=="" || engIns== undefined){
		alertify.error("please  enter english Instruction");
		return false;
	}
	if(hindiIns=="" || hindiIns== undefined){
		alertify.error("please  enter hindi Instruction");
		return false;
	}
	if(marthiIns=="" || marthiIns== undefined){
		alertify.error("please  enter marathi Instruction");
		return false;
	}
	if(unicode=="" || unicode== undefined){
		alertify.error("please  enter unicode");
		return false;
	}
	if(referTo=="" || referTo== 0){
		alertify.error("please  select refernce");
		return false;
	}
	
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/ddgroupInst/saveGroupDetails",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getAllGrpInstDataForModal();
		
		}
	});

}

function getAllGrpInstDataForModal(){
	var inputs = [];
	inputs.push('callFrom='+"OPD");
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "GET",
		url : "ehat/ddgroupInst/getGroupDetails",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllDataToModalTable(r);
		}
	});
}

function setAllDataToModalTable(r){
	var htm = "";
	var index = 1;
	
	
	for ( var i = 0; i < r.length; i++) {
		
	
		
		
			htm = htm + '<tr> ' + ' <td>' + index + '</td>'
					+ ' <td>' + r[i].id + '</td>'
					+ ' <td>' + r[i].englishInstruction + '</td>'
					+ ' <td>' + r[i].hindiInstruction + '</td>'
					+ ' <td>' + r[i].marathiInstruction + '</td>'
					+ ' <td>' + r[i].referTo + '</td>'
					+ '<td><input  name="markCheckbox1"  value="'+r[i].id+'" id="test'+r[i].id+'" type="checkbox" style="cursor: pointer" /></td>'
					+ '</tr>';			
			index++;
		$("#TableBodyInstructionTempName").html(htm);
		
	}
	

	
}

/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method used for save group instruction
 * *****/


function onSaveTemplateTab(type){
	var inputs = [];
		var templateName=$("#inputPCAdminInstructionTempName").val();
		
		if(templateName==""||templateName==undefined){
			alertify.error("please enter template name");
			return false;
		}
		 var idList=[];
		 $("#TableBodyInstructionTempName").find('input[name="markCheckbox1"]').each(function(){
			//alert("HEllo");
		        if($(this).is(":checked")){
		        	 var currentId=$('#'+this.id).val();
		        		idList.push(currentId);	
		        }
		    });
		    $("#instIds").val(idList);
		inputs.push('tempLateName='+templateName);
		
	
	
	 if(idList.length==0){
		 alertify.error("please select at least one instruction");
		 return false;
	 }
	var instIds = $("#instIds").val();
	
	
	
	
	var templateId=0;
	inputs.push('id='+templateId);
	inputs.push('instructionId='+instIds);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/ddgroupInst/saveTemplate",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			getAllTemplates();
			alertify.success(r);
			 $("#instIds").val(0);
			$("#tempLateName").val("");
			$("#templateId").val(0);
			$("#chkAllCheck").prop("checked",false);
			$(".checkInst").prop("checked",false);
		}
	});
	
}

function setAllPCTreatmentInstructionAutocomplete(inputID, onloadTempVar) {
	var resultData = [];
	var auto = "DoctorDesk";
	var data = "instruction";
	var findingName = $("#" + inputID).val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('data=' + data);
	inputs.push('q=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/instructionController/autoSuggetionInstruction",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					//var availableTags = [];
					//availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < r.length; j++) {
					//	var arrValue = (availableTags[j]).split("_");
						var idValue = (r[j].id);
						var tempname= r[j].tempLateName;
						//alert("tempLateName---"+tempname);
						resultData.push({
							ID : idValue,
							Name : tempname
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + tempname
								+ '</a></li>';
					}

					$("#divTag" + inputID + " .typeahead").html(template);

					/*if (onloadTempVar != "onLoad") {
						$("#divTag" + inputID + " .typeahead").show();
					}*/

					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 100);
				}
			});

	function displayResult(item) {
		$("#PCTreatmentInstructionName").val((item.text).trim());
		$("#PCTreatmentInstructionNameID").val((item.value).trim());

	}
}



function saveAllPCAdminInstruction(){
	var PCTreatmentInstructionNameID = $("#PCTreatmentInstructionNameID").val();
	//alert("PCTreatmentInstructionNameID---"+PCTreatmentInstructionNameID);
	//return false;
	
	var treatmentId = ($("#tr_Id").val()).trim();

	if (PCTreatmentInstructionNameID == "0"
			|| PCTreatmentInstructionNameID == ""
			|| PCTreatmentInstructionNameID == undefined) {
		alert("Please select proper group Instruction...");
		return;
	}

	var alreadyPresent = false;
	$('#Table1PCTreatmentInstructionNameID tr').each(
			function() {
				var buttonValue = $(($(this).find('button[type=button]')))
						.prop('value');

				if (PCTreatmentInstructionNameID == buttonValue) {
					alreadyPresent = true;
				}
			});

	if (alreadyPresent) {
		alert("The Selected Instruction is already present...");
		refreshPCTreatmentInstruction();
		return;
	}

	var inputs = [];
	//inputs.push('action=savePCTreatmentInstruction');
	inputs.push('PCTreatmentInstructionNameID=' + PCTreatmentInstructionNameID);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/instructionController/savePCAdminInstruction",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
		
			fetchPCTreatmentInstruction();
		}
	});

}

function fetchPCTreatmentInstruction() {
	/* Enable Text box and reset ID */
	refreshPCTreatmentInstruction();

	Table2PCTICount = 0;
	var Table1PCTICount = 0;
	var treatmentId = ($("#tr_Id").val()).trim();
	var inputs = [];
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/instructionController/fetchPCTreatmentInstruction",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
				//	ajaxResponse = r;
					
					var htm = "";
					var index = 1;
					
					
					for ( var i = 0; i < r.listTreatmentInstruction.length; i++) {
						
					//alert("Hello-----"+r.listTreatmentInstruction.length);
						
						
							htm = htm + '<tr> ' + ' <td>' + index + '</td>'
									+ ' <td>' + r.listTreatmentInstruction[i].tempName + '</td>'
									+ '<td><button  type="button" name="ptDeleteInstruction" class="btn btn-xs btn-danger deleteUserAccess" id="'+r.listTreatmentInstruction[i].idpctreatmentinstruction+'" value="'+r.listTreatmentInstruction[i].idpctreatmentinstruction+'" onclick="deletePCTreatmentInstruction(this.id)" disabled="disabled"><i class="fa fa-trash-o"></i></button></td>'
									+ '</tr>';			
							index++;
						$("#Table1PCTreatmentInstructionNameID").html(htm);
						
					}
					
				}
			});
}

function refreshPCTreatmentInstruction() {
	$("#PCTreatmentInstructionNameID").val("0");
	$("#PCTreatmentInstructionName").val("");
}

function deletePCTreatmentInstruction(PCTreatmentInstructionID){


	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {

		if (PCTreatmentInstructionID == "" || PCTreatmentInstructionID == "0"
				|| PCTreatmentInstructionID == undefined) {
			alert("ID not defiend properly... Internal Error");
			return;
		}

		var inputs = [];
		//inputs.push('action=deletePCTreatmentInstruction');
		inputs.push('PCTreatmentInstructionID=' + PCTreatmentInstructionID);
		//inputs.push('treatmentId=' + ($("#treatmentId").val()).trim());
		inputs.push('treatmentId=' + ($("#tr_Id").val()).trim());

		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/instructionController/deletePCTreatmentInstruction",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				if(r == "true"){
					alert("Record Deleted Successfully");
				}
		
				fetchPCTreatmentInstruction();
			}
		});
	}

}

function fetchGroupReportInstruction(){
	var inputs = [];
	inputs.push('treatmentId=' + ($("#tr_Id").val()).trim());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/instructionController/fetchGroupReportInstruction",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var htm = "";
			var index = 1;
			
			
			for ( var i = 0; i < r.length; i++) {
				
			//alert("Hello-----"+r.listTreatmentInstruction.length);
				var arryData=r[i].split(",");
				var groupName=arryData[0];
				var instructionName=arryData[1];
				
				htm = htm + '<tr> ' + ' <td>' + index + '</td>'
							//+ ' <td>' + r[i]+ '</td>'
							+ ' <td>' +groupName              +"          -           "            + instructionName+ '</td>'
							+ '</tr>';			
					index++;
				$("#Table2PCTreatmentInstructionNameID").html(htm);
				
			}
			
		
			
	
			
		}
	});
}