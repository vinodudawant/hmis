function toggleEntryDiv(id){
	
		
		$("#divForEntry").toggle('slow');
	
}

/** ***********************************FetchBed****************************************** */
function ipdViewBedStatus() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/wardtypecontroller/fetchipdbedstatusadmin",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ipdViewBedStatusDisplay(r);
			
		}
	});
}

function ipdViewBedStatusDisplay(r)
{
var htm ="";
var index=1;
	
	for ( var i = 0; i < r.bedstatuslist.length; i++) {	
		htm = htm +'<tr> '
	+ " <td class='col-md-1-1 center'>"+index+'</td>'
	+ " <td class='col-md-2-1 center'>"+r.bedstatuslist[i].idbedState+"</td>"
	+ "<td class='col-md-5-1 center'>"+r.bedstatuslist[i].bedState+"</td>"
	
	+ " <td class='col-md-2-1 center'>"
	+ "<button onclick='editBedState("+r.bedstatuslist[i].idbedState+");'type='button' class='btn btn-xs btn-success'><i class='fa fa-edit'></i></button>"	
	+"</td>"
	
	+ " <td class='col-md-2-1 center'>"
	+ "<button onclick='deleteBedState("+r.bedstatuslist[i].idbedState+");'type='button' class='btn btn-xs btn-danger'><i class='fa fa-trash-o'></i></button>"	
	+"</td>"
	
	+ '</tr>';
		index++;
	}
	$("#bedStateList").html(htm);
}

function saveBedState(){
	var idbedState=$("#idbedState").val();
	var bedState=$("#bedStateName").val();
	var inputs = [];
	inputs.push('idbedState=' + idbedState);
	inputs.push('bedState=' + bedState);
	inputs.push('bedStateStatus=' + "Y");
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/saveBedState",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	        
			if( r== 1){
				alert("Record Saved SuccessFully");
			}else if( r == 2){
				alert("Record Updated SuccessFully");
			} else{
				alert("Network Issue...");
			}
			
			refreshBedState();
			ipdViewBedStatus();
			$("#divForEntry").hide('slow');
		}
	});	
}


function editBedState(idbedState){
	$("#divForEntry").show('slow');
	var inputs = [];
	inputs.push('idbedState=' + idbedState);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/editBedState",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	
		$("#idbedState").val(r.idbedState);
		$("#bedStateName").val(r.bedState);
		}
	});	
}

function deleteBedState(idbedState){
	
	var inputs = [];
	inputs.push('idbedState=' + idbedState);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/deleteBedState",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	
			if( r == 1){
				alert("Record Deleted Successfully");
				ipdViewBedStatus();
			}else{
				alert("Network issue...");
			}
			
			
			
			
		}
	});	
}

function refreshBedState(){
	$("#idbedState").val(0);
	$("#bedStateName").val("");
}