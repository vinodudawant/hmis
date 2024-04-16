function procedureToggleForm(){
	resetProcedureForm();
	$("#addProName").toggle('slow');	
}

function saveProcedure(){
	var procTypeList = $("#procTypeList").val();
	var procName =$("#procName").val();
	var procGrpList =$("#procGrpList").val();
	var procCatListFornewOt = $("#procCatListFornewOt").val();
	var type = $("#type").val();
	var flag=$('#cathflag').is(":checked");
	var cathlab ="";
	var proMasterid = $("#proMasterid").val();
	procCatListFornewOt=1;
	
	

	if (procTypeList == 0 || procTypeList == undefined
			|| procTypeList == "") {
		alertify.error("please enter procedure type");
		return false;
	} else if (procName == null || procName == undefined || procName == "") {
		alertify.error("please enter procedure Name");
		return false;
	}
	else if (procGrpList == 0 || procGrpList == undefined || procGrpList == "") {
		alertify.error("please enter procedure group");
		return false;
	}
	else if (procCatListFornewOt == 0 || procCatListFornewOt == undefined || procCatListFornewOt == "") {
		alertify.error("please enter procedure group");
		return false;
	}
	
	
	var inputs = [];
	inputs.push('proTypeId=' + procTypeList);
	inputs.push('id=' + proMasterid);
	inputs.push('proGrpId=' + procGrpList);
	inputs.push('procedureName=' + procName);
	inputs.push('procatId=' + procCatListFornewOt);
	inputs.push('type=' + type);
	if(flag){
		cathlab=1;
	}
	else{
		cathlab=0;
	}
	inputs.push('cathlab=' + cathlab);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureMaster/saveprocedureMaster",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetProcedureForm();
		}
	});
}


function resetProcedureForm(){
$("#proMasterid").val(0);
$("#searchTextProcedure").val("");
$('#procTypeList').select2('val', 0);
$("#procName").val("");
$("#procGrpList").select2('val', 0);
$("#procCatListFornewOt").val(0);
$("#type").val(0);
$('#cathflag').prop('checked',false);
getProcedure();
}

function getProcedure(){
	var inputs = [];
	var callfrom = $("#searchTextProcedure").val();
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureMaster/getprocedure",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToProTable(r,type);
		}
	});
}

function setDataToProTable(r){
	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td  class=" col-md-1 text-center">'
				+ index
				+ '</td>'
				+ ' <td class=" col-md-3 text-center">'
				+ r[i].procedureName
				+ '</td>'
				
		        + '<td class="col-md-1 text-center"><button class="btn btn-success btn-xs" onclick=onEditotproc('
				+ r[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 text-center"><button class="btn btn-danger btn-xs" onclick=onDeleteotProc('
				+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';
		index++;
	}
	$("#procedurelist").html(htm);
}


function onEditotproc(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureMaster/getprocedureGrpById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#addProName").show('slow');
			for ( var i = 0; i < r.length; i++) {
				
				
				
			 	$('#procTypeList').select2('val', r[i].proTypeId);
				
	
				$("#procName").val(r[i].procedureName);
				

				$("#procGrpList").select2('val', r[i].proGrpId);

				$("#procCatListFornewOt").val(r[i].procatId);
				$("#type").val(r[i].type);
				$("#proMasterid").val(r[i].id);
				if(r[i].cathlab==0){
					$('#cathflag').prop('checked',false);	
				}
				else{
					$('#cathflag').prop('checked',true);
				}
				
			}
		}
	});
}
function onDeleteotProc(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureMaster/deleteprocedure",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetProcedureForm();
		}
	});
}