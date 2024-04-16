function saveReportInstruction() {

	var reportInstructionID = $('#reportInstructionID').val();
	var reportInstructionEnglish = $('#reportInstruction').val();
	if (reportInstructionEnglish == "") {
		alert("Please enter Instruction ...");
		SetFocus("reportInstruction");
		return;
	}

	var reportInstructionHindi = $('#reportInstructionHindi').val();
	var reportInstructionMarathi = $('#reportInstructionMarathi').val();
			
	var reportInstructionOther1 = $('#reportInstructionOther1').val();
	var reportInstructionOther2 = $('#reportInstructionOther2').val();
	var reportInstructionOther3 = $('#reportInstructionOther3').val();
	var hindiUnicode = $('#hindiUnicode').val();
	var maratiUnicode = $('#maratiUnicode').val();
	
	if(hindiUnicode == " " ||  maratiUnicode == " "){
		alert("Please Enter Hindi and Marati Instruction Unicode");
		return false;
	}

	var mandatoryInstFlag = "N";
	if ($("#mandatoryInstFlag").prop("checked"))
		mandatoryInstFlag = "Y";

	var inputs = [];
	

	
	inputs.push('reportInstructionID=' + reportInstructionID);
	inputs.push('reportInstruction=' + reportInstructionEnglish);
	inputs.push('reportInstructionHindi=' + encodeURIComponent(reportInstructionHindi));
	inputs.push('reportInstructionMarathi=' + encodeURIComponent(reportInstructionMarathi));
	inputs.push('reportInstructionOther1=' + reportInstructionOther1);
	inputs.push('reportInstructionOther2=' + reportInstructionOther2);
	inputs.push('reportInstructionOther3=' + reportInstructionOther3);
	inputs.push('mandatoryInstFlag=' + mandatoryInstFlag);
	inputs.push('unicodeMarati=' +  encodeURIComponent(maratiUnicode));
	inputs.push('unicodeHindi=' +  encodeURIComponent(hindiUnicode));

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/saveIndivisualInstruction",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
			if(res==1){
				alert("Record Inserted Successfully");
			}else if(res==2){
				alert("Record Updated Successfully");
			}else{
				alert("Network issue");
			}

			
		
			$('#reportInstructionID').val("0");
			$('#reportInstruction').val("");

			$('#reportInstructionHindi').val("");
			$('#reportInstructionMarathi').val("");
			$('#reportInstructionOther1').val("");
			$('#reportInstructionOther2').val("");
			$('#reportInstructionOther3').val("");
			$("#mandatoryInstFlag").prop('checked', false);
			getIndivisualInstructionList();

		}
	});
}


function getIndivisualInstructionList(){
		var inputs = [];
		inputs.push('unitId=' + 1);
		var str = inputs.join('&');
		
		
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/ddinstruction/getListOfIndivisualInstruction",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(res) {
				//Added By Akshata 10/MARCH/22
				setIndivisualInstructionList(res);
				
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
							+res.getListOfOPDInstructionDTO[i].reportInstructionID
							+ '</td> '
							
							+ '	<td>'
							+res.getListOfOPDInstructionDTO[i].reportInstruction
							+ '</td> '
							
							
							
							+ '	<td>'
							+res.getListOfOPDInstructionDTO[i].reportInstructionHindi
							+ '</td> '
							
							
							
							+ '	<td>'
							+res.getListOfOPDInstructionDTO[i].reportInstructionMarathi
							+ '</td> '
							
							
							
							if(res.getListOfOPDInstructionDTO[i].mandatoryInstFlag == "Y"){
								
								result = result		+'<td><input value="'+rowCount+'"  id="'+dietId+'" name="instructioneditdelete" type="checkbox"  disabled></td>'
							}else{
								result = result	 +'<td><input value="'+rowCount+'"  id="'+dietId+'" name="instructioneditdelete" type="checkbox"></td>'
							}	
							
					result = result
							
							
							+ '</tr> ';
					rowCount++;
							
				}
				$("#ReportInstructionTemp").html(result);
				}
				
			}
		});
	//	
}


function deleteIndivisualInstruction(){
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
	$("input[name='instructioneditdelete']:checked").each(function() {	
		
		var instructionSlaveId=$("#instructionSlaveId"+$(this).val()).val();
		
		docId.push(instructionSlaveId);
	});

	
	if(docId.length === 0){
		alert("Please Select At Least On Instruction..");
		return false;
	}

	
	
	   if(docId.length>0){

		 var inputs = [];
			inputs.push('instructionIds=' + docId);
			inputs.push('userId=' + userId);
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/ddinstruction/deleteIndivisualInstruction",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
						
					if(r==0){
						alert("Network issue....");
					}else{
						alert("Record Deleted Successfully");
						getIndivisualInstructionList();
					}
				
					
					
					 
				}
			}); 
	   } 
}


function editIndivisualInstruction(){
	var docId = new Array();
	
	$("input[name='instructioneditdelete']:checked").each(function() {	
		
		/*var dietId=$('input[name=ivfdietforeditdelete]:checked').val();
	
			docId.push(dietId);*/
		
		var dietId=$("#instructionSlaveId"+$(this).val()).val();
		
		docId.push(dietId);
		
	});
	
	
	
	if(docId.length > 1){
		alert("Please Select Only One Instruction To edit...");
		return false;
	}
	
	//var dietId=$('input[name=ivfdietforeditdelete]:checked').val();
	
	
	if(docId.length  == 0 )
		{
		alert("Please Select At Least On Instruction..");
		return false;
		}
	
	
    var inputs = [];
	inputs.push('instructionId=' + docId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/editIndivisualInstruction",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			$('#reportInstructionID').val(r.reportInstructionID);
			$('#reportInstruction').val(r.reportInstruction);

			$('#reportInstructionHindi').val(r.reportInstructionHindi);
			$('#reportInstructionMarathi').val(r.reportInstructionMarathi);
			$('#reportInstructionOther1').val(r.reportInstructionOther1);
			$('#reportInstructionOther2').val(r.reportInstructionOther2);
			$('#reportInstructionOther3').val(r.reportInstructionOther3);
			if(r.mandatoryInstFlag=="Y"){
				$("#mandatoryInstFlag").prop('checked', true);
			}else{
			$("#mandatoryInstFlag").prop('checked', false);
			}
			
			$('#hindiUnicode').val(r.unicodeHindi);
	       $('#maratiUnicode').val(r.unicodeMarati);
			
		}
	});
}

function toggleEntryDiv(id){
	
	//$("#addNewPres").show('slow');
document.getElementById("preInsForm").reset();

	$("#addNewPres").toggle('slow');

}