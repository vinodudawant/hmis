function getHallList(){
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : "reqType=AJAX",
		url : "ehat/bedstatemgt/getHallMasterList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setHallList(r);
		}
	});
}

function setHallList(r){

	var htm = "";
	htm = "<option value='0'>-- Select Hall Name --</option>";
	
	for (var i=0;i<r.lstChargesSlave.length;i++)	{
		
		htm = htm + "<option value="+r.lstChargesSlave[i].slaveId+">"+r.lstChargesSlave[i].categoryName+"</option>";
	}
	$("#selHallName").html(htm);
	$("#selHallName").select2();
}

function viewBedsOfHall(callFrom){
	
	var hallId = 0;
	
	if(callFrom == 'onload')
		hallId = 0;
	else
		hallId = $("#selHallName").val();
		
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/bedstatemgt/viewBedsOfHall",
		data : { "hallId" : hallId },
		error : function() {
			alert('Network Issue');
		},
		success : function(response) {
			
			setBedsOfHall(response);
		}
	});
}
function setBedsOfHall(r){
	
	var tBody = "";
	
	for(var i=0; i < r.bl.length; i++){
		
		var datetime= new Date(r.bl[i].createdDate).toLocaleDateString('en-GB');
		
		tBody = tBody + "<tr>" 
		  + "<td>"+(i+1)+"</td>" 
		  + "<td>"+r.bl[i].bi+"</td>" 
		  + "<td>"+r.bl[i].bdnm+"</td>" 
		  + "<td><button class='btn btn-xs btn-warning' value='Cleaning'>Cleaning</button></td>" 		  
		  + "<td>"+datetime+"</td>" 
		  + "<td class='center'><input class='chkBed' type='checkbox' id='chkBedState' value="+r.bl[i].bi+"></td>"
		  +	"</tr>";
	}
	$("#tBodyBedDetails").html(tBody);
}

function selectAllBeds(){
	
	if($('#chkSelAll').is(":checked"))
		$('.chkBed').prop("checked",true);
	else
		$('.chkBed').prop("checked",false);
}

function deallocateCleanedBeds(){
	
	var userId = $("#userId").val();
	var bedList = [];
	
	$(".chkBed:checked").each(function(){
		
	   var bedId = $(this).val();	   
	   bedList.push(bedId);	
	});	
	
	var bedIds = bedList.join(',');
	
	var r = confirm("Are You Sure You Want Deallocate Selected Beds");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bedstatemgt/deallocateCleanedBeds",
			data : { "bedList" : bedIds, "userId" : userId },
			error : function() {
				alert('Network error');
			},
			success : function(response) {

				if(response == 1){
					
					alertify.success("Beds Deallocated successfully");
				}
				viewBedsOfHall('onload');
			}
		});
	}
}