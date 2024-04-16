// @codeBy:Touheed For Saving Bed State Setting
function saveUpdateBedStateSetting(btnName){
	var id = $("#id").val();
	var bedMode = $("#bedMode").val();
	if(id==0){
		var trLength = $("#tbody_bedstate tr").length;
		if(trLength>0){
			alert("Only one setting can be saved, Do you want to change Mode? Click on edit buttion.");
			return false;
		}
	}
	
	var hours = $("#hours").val();
	var deleted= "N";	
	if(hours==""){
		alert("Please enter hours.");
		SetFocus("hours");
		return false;
	}
	
	var payload={
					id:id,
					bedMode:bedMode,
					hours:hours,
					deleted:deleted
				};
	var res = saveBackEndData(payload);
	alert(res);
	fetchBedStateSettingList();
}

function saveBackEndData(payload){
	var resp = "";
		jQuery.ajax({
			async : false,
			type : "POST",
			data :payload,
			url : "./ehat/ipdmaster/saveUpdateBedStateSetting",
			timeout : 1000*60*5,
			cache : false,
			error : function(){
				alert('error');
			},
			success : function(r){
				resp=r;
			}
	});
	
	return resp;
}

function fetchBedStateSettingList(){
	
	var inputs = [];
	inputs.push('id=' + encodeURIComponent(id));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "./ehat/ipdmaster/fetchBedStateSettingList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(r) {
			setTempforBedStateSetting(r);
		}
	});
}

function setTempforBedStateSetting(r){
	var htm='';
	
	 if(r!=null){
		for(var i =0; i < r.length; i++){
		 htm= htm + '<tr>'+ 
		 '<td class="col-md-1-1 center">1</td>'+ 
		 '<input type="hidden" id="bedStateSetId'+r[i].id+'" value="'+r[i].id+'">'+
		 '<td class="col-md-2-1 center" id="bedStateSetMode'+r[i].id+'">'+r[i].bedMode+'</td>'+
		 '<td class="col-md-5-1 center" id="bedStateSetHr'+r[i].id+'">'+r[i].hours+'</td>'+
		 '<td class="col-md-2-1 center"><button onclick="editBedStateSetting('+r[i].id+');" type="button" class="btn btn-xs btn-success"><i class="fa fa-edit"></i></button></td>'+ 
		 '<td class="col-md-2-1 center"><button onclick="deleteBedStateSetting('+r[i].id+');" type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button></td>'+
		 '</tr>';	
		}	
	}
	 $("#tbody_bedstate").html(htm);
}

function editBedStateSetting(id){
	$("#id").val(id);
	var mod = $("#bedStateSetMode"+id).text();
	var hrs = $("#bedStateSetHr"+id).text();
	$("#bedMode").val(mod);
	$("#hours").val(hrs);
}

function deleteBedStateSetting(id){
	var r = confirm("Are You Sure You Want To Delete this row ?");
    if (r == true) {
		var id =id;
		var bedMode = $("#bedStateSetMode"+id).text();
		var hours = $("#bedStateSetHr"+id).text();
		var deleted= "Y";	
		
			var payload={
						id:id,
						bedMode:bedMode,
						hours:hours,
						deleted:deleted
					};
		var res = saveBackEndData(payload);
		res = res.replace("Saved", "Deleted");
		alert(res);	
		fetchBedStateSettingList();
	}
}


function cleanData(){
	$("#id").val(0);
	$("#bedMode").val("auto");
	$("#hours").val('');	
}