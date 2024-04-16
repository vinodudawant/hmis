function saveGroupDetails(){
	var instId = $("#instId").val();
	var engIns = $("#engIns").val();
	var hindiIns = $("#hindiIms").val();
	var marthiIns = $("#marthiIns").val();
	var unicode = $("#unicode").val();
	var referTo = $("#referTo").val();
	var inputs = [];
	inputs.push('id='+instId);
	inputs.push('englishInstruction='+engIns);
	inputs.push('hindiInstruction='+encodeURIComponent(hindiIns));
	inputs.push('marathiInstruction='+encodeURIComponent(marthiIns));
	inputs.push('unicode='+encodeURIComponent(unicode));
	inputs.push('referTo='+referTo);
	var str = inputs.join('&');
	
	if(engIns=="" || engIns== undefined){
		alertify.error("please  enter english Instruction");
		return false;
	}
	/*if(hindiIns=="" || hindiIns== undefined){
		alertify.error("please  enter hindi Instruction");
		return false;
	}
	if(marthiIns=="" || marthiIns== undefined){
		alertify.error("please  enter marathi Instruction");
		return false;
	}*/
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
			getGroupInstData();
		
		}
	});

}

function validateNumber(e) {
    const pattern = /^[0-9]$/;
    return pattern.test(e.key );
}

function clearform(){
$("#instId").val(0);
$("#searchById").val("");
$("#searchByName").val("");
$("#engIns").val("");
$("#hindiIms").val("");
$("#marthiIns").val("");
$("#unicode").val("");
$("#referTo").val(0);
}

function toggleEntryDiv(){
	clearform();
		$("#addNewGroups").toggle('slow');
}

function getGroupInstData(){
	var callFrom = $("#callFromForInstrution").val();
	var inputs = [];
	inputs.push('callFrom='+"Both");
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
			clearform();
			setDataTopreTable(r,"fromTable");
		}
	});

}

function getGrpInstDataForModal(){
	jQuery.ajax({
		async	: false,
		type: "GET",
		url : "ehat/ddgroupInst/getGroupDetails",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setDataToModalTable(r);
		}
	});
}



function setDataToModalTable(r){
	var htm = "";
	var index = 1;
	
	var str=$("#inputId").val();
	
	var arr = str.split(",");
	
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
			
		$("#grpDetailListModal").html(htm);
		
	}
	
	for ( var i = 0; i < r.length; i++) {
		
		for(var j=0;j<arr.length;j++){
			
			if(arr[j]==r[i].id){				
				$("#test"+r[i].id).prop('checked', true); 
				
			}
		}
	}
	
}



function searchInst(){
	var inputs = [];
	var url="";
var searchText = $("#searchById").val();

var sname=$("#searchByName").val();

if(searchText=="" && sname=="" || searchText==undefined && sname==undefined || searchText==null && sname==null){
	alertify.error("please enter something in searchbox");
	return false;
}


if(sname==undefined || sname==""){
	url ="ehat/ddgroupInst/getGroupDetailsById";
	inputs.push('id='+ searchText);
	
}
else{
	url ="ehat/ddgroupInst/getGroupDetailsByName";
	inputs.push('instname='+ sname);
	
}

var str = inputs.join('&');
jQuery.ajax({
	async	: false,
	type: "POST",
	url : url,
	data: str + "&reqType=AJAX",
	catche : false,
	error : function() {
		alert('error');
	},
	success : function(r) {
		setDataTopreTable(r,"fromTable");
	}
});


}

function onEditInst(id){
	$("#addNewGroups").show('slow');
	var inputs = [];
	inputs.push('id='+ id);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/ddgroupInst/getGroupDetailsById",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for ( var i = 0; i < r.length; i++) {
			$("#instId").val(r[i].id);
		$("#engIns").val( r[i].englishInstruction);
			 $("#hindiIms").val(r[i].hindiInstruction );
		 $("#marthiIns").val(r[i].marathiInstruction);
			 $("#unicode").val(r[i].unicode);
			$("#referTo").val(r[i].referTo);
		}
			
		}
	});

}

function checkUncheckAll(masterChkId,slaveChkClass){
	
	if($("#"+masterChkId).is(":checked")){
		
		$('.'+slaveChkClass).prop("checked",true);
	}else{
		
		$('.'+slaveChkClass).prop("checked",false);
	}
}


function setDataTopreTable(r,type){
	var htm = "";
	var index = 1;
	if(type=="fromTable"){
		for ( var i = 0; i < r.length; i++) {
			htm = htm + '<tr> ' + ' <td>' + index + '</td>'
					+ ' <td>' + r[i].id + '</td>'
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
					+ ' <td>' + r[0].groupInstructionMaster[i].id + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].englishInstruction + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].hindiInstruction + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].marathiInstruction + '</td>'
					+ ' <td>' + r[0].groupInstructionMaster[i].referTo + '</td>'
					+ '</tr>';
			index++;
		}
	}
	
	
	
	
	$("#groupDetailList").html(htm);
}
function selectInst(){
	$("#tempLateName1").val("");
	idList=[];
	 $("#groupDetailList").find('input[name="markCheckbox"]').each(function(){
		
	        if($(this).is(":checked")){
	        	 var currentId=$('#'+this.id).val();
	        		idList.push(currentId);	
	        }
	    });
	    $("#instIds").val(idList);
	  
}
function onSaveTemplate(type){
	var inputs = [];
	if(type=="edit"){
		idList=[];
		 $("#grpDetailListModal").find('input[name="markCheckbox1"]').each(function(){
				
		        if($(this).is(":checked")){
		        	 var currentId=$('#'+this.id).val();
		        		idList.push(currentId);	
		        }
		    });
		    $("#instIds").val(idList);
		    var templateName1 = $("#tempLateName1").val();
		    inputs.push('tempLateName='+templateName1);
	}
	else{
		var templateName=$("#tempLateName").val();
		
		if(templateName==""||templateName==undefined){
			alertify.error("please enter template name");
			return false;
		}
		
		inputs.push('tempLateName='+templateName);
		
	}
	
	 if(idList.length==0){
		 alertify.error("please select at least one instruction");
		 return false;
	 }
	var instIds = $("#instIds").val();
	
	
	
	
	var templateId=$("#templateId").val();
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

function getTemp(){
	$("#templateEditDiv").show();
	var tempIds =$("#tempNames").val();
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
			setDataTopreTable(r,"fromselect");
			 $("#editFlag").hide();
		        $("#delFlag").hide();
		        $("#checkFlag").hide();
		}
	});
}




function getAllTemplates(){
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
function onDeleteInst(id){
	var inputs = [];
	inputs.push('delId='+id);
	var str = inputs.join('&');
	var r = confirm("Are You Sure You Want To Delete Instruction");
	if(r==true){
		jQuery.ajax({
			async	: false,
			type: "POST",
			url : "ehat/ddgroupInst/deleteInstruction",
			data: str + "&reqType=AJAX",
			catche : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alertify.success(r);
				getGroupInstData();
			}
		});
	}
	
}


function onDeleteTemplate(id){
	var inputs = [];
	
	var tempId=$("#templateId").val();
	inputs.push('delTempId='+tempId);
	var str = inputs.join('&');
	var confirmation = confirm("Are You Sure You Want To Delete Template");
	if(confirmation==true){
		jQuery.ajax({
			async	: false,
			type: "POST",
			url : "ehat/ddgroupInst/deleteTemplate",
			data: str + "&reqType=AJAX",
			catche : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alertify.success(r);
				getAllTemplates();
				$("#templateId").val(0);
				window.location.reload();
			}
		});
	}
	
}
