function saveAllGroupDetails1(){
	
	var callFrom = $("#callFromForInstrution").val();
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
	inputs.push('otherInstruction3='+otherIns3);
	inputs.push('unicode='+unicode);
	inputs.push('referTo='+referTo);
	//inputs.push('callFrom='+callFrom);
	var str = inputs.join('&');
	
	if(engIns=="" || engIns== undefined){
		alertify.error("please enter the english Instruction");
		return false;
	}
	if(hindiIns=="" || hindiIns== undefined){
		alertify.error("please enter the hindi Instruction");
		return false;
	}
	if(marthiIns=="" || marthiIns== undefined){
		alertify.error("please enter the marathi Instruction");
		return false;
	}
	if(unicode=="" || unicode== undefined){
		alertify.error("please enter the unicode");
		return false;
	}
	if(referTo=="" || referTo== 0){
		alertify.error("please  select the refernce");
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
	
	var callFrom = $("#callFromForInstrution").val();
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
			
			setAllDataToModalTable1(r);
		}
	});
}
function setAllDataToModalTable1(r){
	var htm = "";
	var index = 1;
	
	
	for ( var i = 0; i < r.length; i++) {
		
	
		
		
			htm = htm + '<tr> ' + ' <td>' + index + '</td>'
					/*+ ' <td>' + r[i].id + '</td>'*/
					+ ' <td>' + r[i].englishInstruction + '</td>'
					+ ' <td>' + r[i].hindiInstruction + '</td>'
					+ ' <td>' + r[i].marathiInstruction + '</td>'
					+ ' <td>' + r[i].referTo + '</td>'
					+ '<td><input  name="markCheckbox1" class="checkInst"  value="'+r[i].id+'" id="test'+r[i].id+'" type="checkbox" style="cursor: pointer" /></td>'
					+ '</tr>';			
			index++;
		$("#TableBodyInstructionTempName").html(htm);
		
	}
	

	
}

/***********
 * @author	: Vishant Pawar
 * @date 	: 01-Dec-2023
 * @reason 	: get all template for ipd
 **********/
function getAllTemplatesForIPD(){
	jQuery.ajax({
		async	: false,
		type: "GET",
		url : "ehat/ddgroupInst/getTemplates",
		data: "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
	        divContent = divContent + "<option value='0'>--Select Template--</option>";
	        for ( var i = 0; i < r.length; i++) {          
	        	 divContent = divContent + "<option value='" + r[i].id + "'>"+ r[i].tempLateName + "</option>";
	        }
	         
	         $("#tempNames").html(divContent);
	         $("#tempNames").select2();
	         $("#selPCAdminInstructionTempName").html(divContent);
	         $("#selPCAdminInstructionTempName").select2();
	         
		}
	});
}

/***********
 * @author	: Vishant Pawar
 * @date 	: 01-Dec-2023
 * @reason 	: get template by id for ipd
 **********/

function getIPDTempById(){
	$("#templateEditDiv").show();
	var tempIds =$("#selPCAdminInstructionTempName").val();
	
	if(tempIds=='0'){
		getAllGrpInstDataForModal();
	}
	//alert(tempIds);
	var inputs = [];
	inputs.push('tempIds='+tempIds);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/ddgroupInst/getTemplatesById",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataTopreTableIPD(r,"fromselect");
			 $("#editFlag").hide();
		        $("#delFlag").hide();
		        //$("#checkFlag").hide();
		}
	});
}

/***********
 * @author	: Vishant Pawar
 * @date 	: 01-Dec-2023
 * @reason 	: set template instruction
 **********/
function setDataTopreTableIPD(r,type){
	var htm = "";
	var index = 1;
	if(type=="fromTable"){
		for ( var i = 0; i < r.length; i++) {
			htm = htm + '<tr> ' + ' <td>' + index + '</td>'
					//+ ' <td>' + r[i].id + '</td>'
					+ ' <td>' + r[i].englishInstruction + '</td>'
					+ ' <td>' + r[i].hindiInstruction + '</td>'
					+ ' <td>' + r[i].marathiInstruction + '</td>'
					+ ' <td>' + r[i].referTo + '</td>'					
					+ '<td><button class="btn btn-success btn-xs editUserAccess" onclick=onEditInst('+r[i].id+')><i class="fa fa-edit"></i></button></td>'
					+ '<td><button class="btn btn-danger btn-xs deleteUserAccess" onclick=onDeleteInst('+r[i].id+')><i class="fa fa-trash-o"></i></button></td>'
					+ '<td><input  name="markCheckbox" class="checkInst" value="'+r[i].id+'" id="'+r[i].id+'" type="checkbox" style="cursor: pointer" /></td>'
					+ '</tr>';
			index++;
		}
	}
	else{
		
		for ( var i = 0; i < r[0].groupInstructionMaster.length; i++) {
			$("#inputId").val(r[0].instructionId); 
			$("#tempName").html(r[0].tempLateName);
			$("#templateId").val(r[0].id);
			$("#tempLateName1").val(r[0].tempLateName);
			
			htm = htm + '<tr> ' + ' <td>' + index + '</td>'
					//+ ' <td>' + r[0].groupInstructionMaster[i].id + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].englishInstruction + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].hindiInstruction + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].marathiInstruction + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].referTo + '</td>'
					+ '<td><input  name="markCheckbox1" class="checkInst"s  value="'+r[0].groupInstructionMaster[i].id+'" id="test'+r[0].groupInstructionMaster[i].id+'" type="checkbox" style="cursor: pointer" /></td>'
					+ '</tr>';
			index++;
		}
	}
	
	
	
	
	$("#TableBodyInstructionTempName").html(htm);
}

/***********
 * @author	: Vishant Pawar
 * @date 	: 01-Dec-2023
 * @reason 	: create dynamic table row
 **********/
var i = 1;

function createPCAdminInstructionIPD() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtMedicine = $("#txtMedicine" + rowCount + "").val();
		var txtQty = $("#txtQty" + rowCount + "").val();

		if (txtMedicine == "" && txtQty == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;
	var divId = "PCAdminInstruction" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("TableBodyPCAdminInstructionTempName").appendChild(
			x);
	document.getElementById(divId).innerHTML = "<td>"
			+ (rowCount)
			+ "</td>"
			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='English' id='txtMedicine"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='Marathi' id='txtMedicineM"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='Hindi' id='txtMedicineH"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='other 1' id='txtMedicine1ol"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='other 2' id='txtMedicine2ol"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='other 3' id='txtMedicine3ol"
			+ rowCount + "' /></td>"

			+ "<td class='col-sm-1-1 center'>"
			+ "<input type='checkbox' name='checkboxPCAI" + rowCount
			+ "' /></td>" + "<input type='hidden' value='0'  id='idskco"
			+ rowCount + "' name='idskco" + rowCount + "' />" + "</tr>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

}

/***********
 * @author	: Vishant Pawar
 * @date 	: 01-Dec-2023
 * @reason 	: save all group details
 **********/
function saveAllGroupDetails(){
	
	var tableLength = $("#TableBodyPCAdminInstructionTempName tr").length;
	var groupInstructionMaster={
			englishInstruction:null,
			groupinstructionmasterlist:[]
	};
for(var j=1;j<=tableLength;j++){	
	var callFrom = $("#callFromForInstrution").val();
	var instId = 0;
	var engIns = $.trim($("#txtMedicine"+j).val());
	var hindiIns = $.trim($("#txtMedicineH"+j).val());
	var marthiIns = $.trim($("#txtMedicineM"+j).val());
	var otherIns1 = $.trim($("#txtMedicine1ol"+j).val());
	var otherIns2 = $.trim($("#txtMedicine2ol"+j).val());
	var otherIns3 = $.trim($("#txtMedicine3ol"+j).val());
	var unicode = "0";
	var referTo ='OPD';
//	var inputs = [];
//	inputs.push('id='+instId);
//	inputs.push('englishInstruction='+engIns);
//	inputs.push('hindiInstruction='+hindiIns);
//	inputs.push('marathiInstruction='+marthiIns);
//	inputs.push('otherInstruction1='+otherIns1);
//	inputs.push('otherInstruction2='+otherIns2);
//	inputs.push('otherInstruction3='+otherIns3);
//	inputs.push('otherInstruction3='+otherIns3);
//	inputs.push('unicode='+unicode);
//	inputs.push('referTo='+referTo);
	//inputs.push('callFrom='+callFrom);
//	var str = inputs.join('&');
	
	groupInstructionMaster['groupinstructionmasterlist'].push({
		
		englishInstruction:engIns,
		hindiInstruction:	hindiIns,
		marathiInstruction:marthiIns,
		unicode:unicode,
		referTo:referTo,
		otherInstruction1:otherIns1,
		otherInstruction2:otherIns2,
		otherInstruction3:otherIns3
		
	})
	
	
	if(engIns=="" || engIns== undefined){
		alertify.error("please enter the english Instruction");
		return false;
	}
	/*if(hindiIns=="" || hindiIns== undefined){
		alertify.error("please enter the hindi Instruction");
		return false;
	}
	if(marthiIns=="" || marthiIns== undefined){
		alertify.error("please enter the marathi Instruction");
		return false;
	}*/
	if(unicode=="" || unicode== undefined){
		alertify.error("please enter the unicode");
		return false;
	}
	if(referTo=="" || referTo== 0){
		alertify.error("please  select the refernce");
		return false;
	}
	
	//groupInstructionMaster['groupinstructionmasterlist'].push(groupInstructionMaster);
}

	/*var groupInstructionMaster={
			groupinstructionmasterlist:[groupInstructionMasterArr]
	}*/
	
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/ddgroupInst/saveMultipleGroupDetails",
		//dataType	: 'json',
        data		: JSON.stringify(groupInstructionMaster),
		//data: str + "&reqType=AJAX",
        contentType	: 'application/json',
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			
			$("#TableBodyPCAdminInstructionTempName").html("");
			$("#RowCount").val(0);
			getAllGrpInstDataForModal();
		
		}
	});
}

function checkUncheckAllIPD(masterChkId,slaveChkClass){
	
	if($("#"+masterChkId).is(":checked")){
		
		$('.'+slaveChkClass).prop("checked",true);
	}else{
		
		$('.'+slaveChkClass).prop("checked",false);
	}
}