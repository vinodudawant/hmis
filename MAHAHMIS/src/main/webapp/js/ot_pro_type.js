
function toggleForm(){
	resetProTypeForm();
	$("#addProType").toggle('slow');
}

function onSaveProcedureType(){
	
	var procedureType = $("#procedureType").val();
	var procedureTypeId =$("#procedureTypeId").val();
	
	if(procedureType==null || procedureType==undefined ||procedureType==""){
		alertify.error("please enter procedure type");
		return false;
	}
	
	var inputs = [];
	inputs.push('proName='+procedureType);
	inputs.push('id='+procedureTypeId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/newOt/saveprocedureType",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetProTypeForm();
		}
	});
}

function resetProTypeForm(){
	$("#procedureType").val("");
	$("#procedureTypeId").val(0);
	$("#searchText").val("");
	getProcedureTypeList();
}

function getProcedureTypeList(type){
	var inputs = [];
	var callfrom = $("#searchText").val();
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/newOt/getprocedureType",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToProTypeTable(r,type);
		}
	});
}

function setDataToProTypeTable(r,type){
	var alistTemp="";
	if(type=="dropdownlist"){
		 alistTemp = alistTemp + "<option value='0'>--Select Type--</option>";
		for ( var i = 0; i < r.length; i++) {
			
			alistTemp = alistTemp + "<option value=" + r[i].id
					+ " data-name=" + r[i].proName + ">"
					+ r[i].proName + "</option>";
		}
		$("#procTypeList").html(alistTemp);
		$("#procTypeList").select2();
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
					+ r[i].proName
					+ '</td>'
					+ '<td class="col-md-1 text-center"><button class="btn btn-success btn-xs editUserAccess" onclick=onEditProType('
					+ r[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ '<td class="col-md-1 text-center"><button class="btn btn-danger btn-xs deleteUserAccess" onclick=onDeleteProType('
					+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
					
					
					+ '</tr>';
			index++;
		}
		$("#procedureTypeist").html(htm);
	}
	
	
}

function onEditProType(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/newOt/getprocedureTypeById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#addProType").show('slow');
			for ( var i = 0; i < r.length; i++) {
				$("#procedureType").val(r[i].proName);
				$("#procedureTypeId").val(r[i].id);
			}
		}
	});
}
function onDeleteProType(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/newOt/deleteprocedureType",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetProTypeForm();
		}
	});
}