function toggleEntryDiv(id){
	if(id=="divForEdit"){
		$("#divForEntry").show('slow');
	}else{
		$("#divForEntry").toggle('slow');
	}	
}
function clearFeild(){
	 $("#vitalid").val("");
	 $("#vitalname").val("");
}
function saveWhitetal()
{
	var vitalid=$("#vitalid").val();
	if(vitalid == null || vitalid == undefined || vitalid == "")
	{
		vitalid=0;
	}
	var vitalname=$("#vitalname").val();
	if(vitalname == null || vitalname == undefined || vitalname == "")
	{
	alert("Please Enter whitetal Name.");
	return false;
	}
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	var inputs = [];
	inputs.push('vital_id=' + vitalid);
	inputs.push('vitalname=' + encodeURIComponent(vitalname));
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/savewhitetal",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r == 1)
			{
			alertify.success("Save Sucessfully");	
			}
			else if(r == 2)
			{
			alertify.success("Update Sucessfully");	
			}
			else if(r == 0)
			{
			alertify.error("Oops Some Problem Ocured");
			}
			$("#vitalname").val("");
			$("#vitalid").val("")
			fetchVital();
			}
	});
}
function fetchVital()
{
	
	var vitalname=$("#vitalauto_search").val();
	var inputs = [];
	inputs.push('vitalname=' + vitalname);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/fetchwhitetal",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setFetchVital(r);
			}
	});
}
function setFetchVital(r)
{
	var htm ="";
	var index=1;
		for ( var i = 0; i < r.vitallist.length; i++) {	
			htm = htm +'<tr> '
		+ " <td class='col-md-1-1 center'>"+index+'</td>'
		+ "<td class='col-md-5-1 center'>"+r.vitallist[i].vitalname+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='editVital("+r.vitallist[i].vital_id+");'type='button' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-edit'></i></button>"	
		+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='deleteVital("+r.vitallist[i].vital_id+");'type='button' class='btn btn-xs btn-danger deleteUserAccess'><i class='fa fa-trash-o'></i></button>"	
		+"</td>"
		+ '</tr>';
			index++;
		}
		$("#setfetchwhitetal").html(htm);
}
function editVital(id)
{
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/editvital",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#divForEntry").show('slow');
			$("#vitalname").val(r.vitalname);
			$("#vitalid").val(r.vital_id);
			$("#vitalauto_search").val("");
			}
	});	
}
function deleteVital(id)
{
	var userId=$("#userId").val();
	var inputs = [];
	inputs.push('vital_id=' + id);
	inputs.push('deletedBy=' + userId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/deletevital",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			 if(r == 1)
			{
			alertify.success("Delete Sucessfully");	
			}
			else if(r == 0)
			{
			alertify.error("Oops Some Problem Ocured");
			}
			 fetchVital();
			}
	});	
}