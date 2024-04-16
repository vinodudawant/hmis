function openmainPrintPopUp(){
	
	 var html="";

	html = html + '<div tabindex="-1" class="modal fade in"  style="display: block;">'
	            +'<div class="modal-dialog"><div style="margin-top: 13%; margin-left: 13%;" class="modal-content col-md-7">'
			    +'<div class="modal-header"><div class="box-title"><h4 class="col-md-8-1">'
				+'<i class="fa fa-calendar"></i> Prescription Instruction Language</h4>'
				+'<div style="float: right;" class="form-group col-md-4-1">'
	            +'<button type="button" onclick="printOPDMain(\'withheader\');" class="btn btn-xs btn-warning">'
				+'<i class="fa fa-print"></i> Print(H/F)</button>'
				+'<button type="button" onclick="printOPDMain(\'withoutheader\');" class="btn btn-xs btn-warning">'
				+'<i class="fa fa-print"></i> Print</button>'
				+'<button onclick="closeOPDMainPopUp();" class="btn btn-xs btn-danger">'
				+'<i class="fa fa-arrows"></i> Close</button></div></div></div>'
                +'<div class="modal-body col-md-12-1"><div class="col-md-3-1">'
				+'<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="prepInstructionPopup" value="ENGLISH" checked="checked"> : English'
				+'</label></div><div class="col-md-3-1">'
				+'<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="prepInstructionPopup" value="HINDI"> : Hindi'
				+'</label></div>'
				+'<div class="col-md-3-1">'
				+'<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="prepInstructionPopup" value="MARATHI"> : Marathi'
				+'</label>'
			    +'</div>'
			   /* +'<div class="col-md-4-1">'
				+'<label class="input-SmallText"> <input type="checkbox" style="margin-top: 0px; cursor: pointer" name="vaccinationFlagCheckboxPrint" id="vaccinationFlagCheckboxPrint"> : Print'
				+'Vaccination chart</label>'
				+'</div>'*/
				+'<hr></div></div></div></div>';
	
	$("#idMainPrintPopUp").html(html);
	
	$("#idMainPrintPopUp").show();

}

function closeOPDMainPopUp(){
	$("#idMainPrintPopUp").hide();
}

function printOPDMain(CallFrom){
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var unitId = $("#unitId").val();
  
	var deptId=1;
  
	 var pendFlag="N"; 
	 var recId=0;
    
	
	 var instructionLanguage = $("input[name='prepInstructionPopup']:checked").val();
    
    window.open("ipd_main_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&instructionLanguage="+instructionLanguage+"&CallFrom="+CallFrom+"&unitId="+unitId);
	

	
}

function printOPDMainWithoutHistory(){
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var unitId = $("#unitId").val();
  
	var deptId=1;
  
	 var pendFlag="N"; 
	 var recId=0;
    
	var CallFrom="all";
	 var instructionLanguage ="English" ;
    
    window.open("ipd_main_print_without_history.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&instructionLanguage="+instructionLanguage+"&CallFrom="+CallFrom+"&unitId="+unitId);
}