function onSaveAllergy(){
	var allergyType = $("#allergtype").val();
	var allergyId = $("#allergyId").val();
	if(allergyType=="" || allergyType == undefined || allergyType == null){
		alertify.error("please enter allergy type");
		return false;
	}
	
	var inputs = [];
	inputs.push('allergyType='+allergyType);
	inputs.push('id='+allergyId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/allergydd/saveallergytype",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetallergyType();
		}
	});
}

function resetallergyType(){
	$("#allergtype").val("");
	$("#allergyId").val(0);
	$("#searchbyName").val("");
	getAllergyType();
}

function getAllergyType(type){
	var inputs = [];
	inputs.push('searchtext='+"");
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/allergydd/getallergytype",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(type=="alergypopup"){
				getAllergyReaction('alergypopup');
				getAllergies('foreditdel');
				var alistTemp = "";
				alistTemp = alistTemp
						+ "<option value='0'>--Select allergy Type--</option>";
				for ( var i = 0; i < r.length; i++) {
					alistTemp = alistTemp + "<option value=" + r[i].id
							+ " data-name='"+ r[i].allergyType+"'>"
							+ r[i].allergyType + "</option>";
				}
				$("#altype").html(alistTemp);
				$("#altype").select2();
			}
			setDataToAllergyType(r);
		}
	});
}


function searchAllergyType(){
	var inputs = [];
	var searchtext = $("#searchbyName").val();
	inputs.push('searchtext='+searchtext);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/allergydd/getallergytype",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToAllergyType(r);
		}
	});
}




function setDataToAllergyType(r){
	var htm = "";
	var index = 1;
	
	for ( var i = 0; i < r.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td  class="text-center">'
				+ index
				+ '</td>'

				+ ' <td class="text-center">'
				+ r[i].allergyType
				+ '</td>'

				
				+ '<td class="text-center"><button class="btn btn-success btn-xs" onclick=onEditAllergyType('
				+ r[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="text-center"><button class="btn btn-danger btn-xs" onclick=onDeleteAllergyType('
				+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
				
				
				+ '</tr>';
		index++;
	}
	$("#allergylist").html(htm);
}

function onEditAllergyType(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/allergydd/getallergytypeById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#addNewallergy").show('slow');
			for ( var i = 0; i < r.length; i++) {
				$("#allergtype").val(r[i].allergyType);
				$("#allergyId").val(r[i].id);
			}
		}
	});
}

function onDeleteAllergyType(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/allergydd/deleteAllergyType",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetallergyType();
		}
	});
}

function toggleEntryDiv(){
	$("#addNewallergy").toggle('slow');
	resetallergyType();
}

function toggleEntryDivAr(){
	resetallergyReaction();
	$("#addNewallergyReaction").toggle('slow');
}
function onSaveAllergyReaction(){
	var allergyType = $("#allergyreaction").val();
	var allergyId = $("#allergyReactionId").val();
	if(allergyType=="" || allergyType == undefined || allergyType == null){
		alertify.error("please enter allergy reaction");
		return false;
	}
	
	var inputs = [];
	inputs.push('allergyReaction='+allergyType);
	inputs.push('id='+allergyId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/allergydd/saveallergyReaction",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetallergyReaction();
		}
	});
}
function resetallergyReaction(){
	 $("#allergyreaction").val("");
	 $("#allergyReactionId").val(0);
	 $("#searchbyReactionName").val("");
	 getAllergyReaction();
}

function getAllergyReaction(type){
	var inputs = [];
	inputs.push('searchtext='+"");
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/allergydd/getallergyReaction",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(type=="alergypopup"){
				var alistTemp = "";
				alistTemp = alistTemp
						+ "<option value='0'>--Select allergy Reaction--</option>";
				for ( var i = 0; i < r.length; i++) {
					alistTemp = alistTemp + "<option value=" + r[i].id
							+ " data-name='"+r[i].allergyReaction+"'>"
							+ r[i].allergyReaction + "</option>";
				}
				$("#alReaction").html(alistTemp);
				$("#alReaction").select2();
			}
			setDataToAllergyReaction(r);
		}
	});
}

function searchAllergyReaction(){
	var inputs = [];
	var searchtext = $("#searchbyReactionName").val();
	inputs.push('searchtext='+searchtext);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/allergydd/getallergyReaction",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToAllergyReaction(r);
		}
	});
}

function setDataToAllergyReaction(r){
	var htm = "";
	var index = 1;
	
	for ( var i = 0; i < r.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td  class="text-center">'
				+ index
				+ '</td>'

				+ ' <td class="text-center">'
				+ r[i].allergyReaction
				+ '</td>'

				
				+ '<td class="text-center"><button class="btn btn-success btn-xs" onclick=onEditAllergyReaction('
				+ r[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="text-center"><button class="btn btn-danger btn-xs" onclick=onDeleteAllergyReaction('
				+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
				
				
				+ '</tr>';
		index++;
	}
	$("#allergyReactionlist").html(htm);
}
function onEditAllergyReaction(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/allergydd/getAllergyReactionById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#addNewallergyReaction").show('slow');
			for ( var i = 0; i < r.length; i++) {
				$("#allergyreaction").val(r[i].allergyReaction);
				$("#allergyReactionId").val(r[i].id);
			}
		}
	});
}

function onDeleteAllergyReaction(id){
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/allergydd/deleteAllergyreaction",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			resetallergyReaction();
		}
	});
}