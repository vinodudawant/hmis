function toggleForm() {
	resetProGrpForm();
	$("#addProGrp").toggle('slow');
}

function onSaveProcedureGrp() {

	var procedureGrpId = $("#procedureGrpId").val();
	var procedureGrpName = $("#procedureGrpName").val();
	var grpType = $("#grpType").val();

	if (procedureGrpName == null || procedureGrpName == undefined
			|| procedureGrpName == "") {
		alertify.error("please enter procedure group");
		return false;
	} else if (grpType == null || grpType == undefined || grpType == ""
			|| grpType == 0) {
		alertify.error("please enter procedure group type");
		return false;
	}

	var inputs = [];
	inputs.push('proGrpName=' + procedureGrpName);
	inputs.push('id=' + procedureGrpId);
	inputs.push('grpType=' + grpType);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureGrp/saveprocedureGrp",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetProGrpForm();
		}
	});
}

function resetProGrpForm() {
	$("#procedureGrpId").val(0);
	$("#procedureGrpName").val("");
	$("#grpType").val(0);
	$("#searchTextGrp").val("");
	getProcedureGrpList();
}

function getProcedureGrpList(type) {
	var inputs = [];
	var callfrom = $("#searchTextGrp").val();
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureGrp/getproceduregrp",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToProGrpTable(r,type);
		}
	});
}

function setDataToProGrpTable(r,type) {
	if(type=="dropdownlist"){
		var alistTemp = alistTemp + "<option value='0'>--Select Group--</option>";
		for ( var i = 0; i < r.length; i++) {
			alistTemp = alistTemp + "<option value=" + r[i].id
					+ " data-name=" + r[i].proGrpName + ">"
					+ r[i].proGrpName + "</option>";
		}
		$("#procGrpList").html(alistTemp);
		$("#procGrpList").select2();
	}
	else{
		var htm = "";
		var index = 1;

		for ( var i = 0; i < r.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td  class=" col-md-1 text-center">'
					+ index
					+ '</td>'
					+ ' <td class=" col-md-3 text-center">'
					+ r[i].proGrpName
					+ '</td>'
					+ ' <td class=" col-md-3 text-center">'
					+ r[i].grpType
					+ '</td>'

					+ '<td class="col-md-1 text-center"><button class="btn btn-success btn-xs" onclick=onEditProGrp('
					+ r[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ '<td class="col-md-1 text-center"><button class="btn btn-danger btn-xs" onclick=onDeleteProGrp('
					+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'

					+ '</tr>';
			index++;
		}
		$("#procedureGrpist").html(htm);
	}
	
}

function onEditProGrp(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureGrp/getprocedureGrpById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#addProGrp").show('slow');
			for ( var i = 0; i < r.length; i++) {
				$("#procedureGrpId").val(id);
				$("#procedureGrpName").val(r[i].proGrpName);
				$("#grpType").val(r[i].grpType);
			}
		}
	});
}
function onDeleteProGrp(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureGrp/deleteprocedureType",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetProGrpForm();
		}
	});
}