/*****************************************
 * save the cold room master
 ************************************************/

function setColdroomMaster()
{
	
	var cold_room_id=$("#coldroomid").val();
	if(cold_room_id==null || cold_room_id==undefined|| cold_room_id=="")
	{
		cold_room_id=0;
	}
	var cold_room_name=$("#coldroomname").val();
	if(cold_room_name==null || cold_room_name==undefined|| cold_room_name=="")
		{
		alert("please Enter cold room name.");
		return false;
		}
	var quantity_of_beds=$("#quantityofbeds").val();
	if(quantity_of_beds==null || quantity_of_beds==undefined|| quantity_of_beds=="")
		{
		alert("please Enter quantity of beds.");
		return false;
		
		}
	var inputs = [];
	inputs.push('cold_room_id=' + cold_room_id);
	inputs.push('cold_room_name=' + encodeURIComponent(cold_room_name));
	inputs.push('quantity_of_beds=' + encodeURIComponent(quantity_of_beds));
	var str = inputs.join('&');
	 jQuery.ajax({
	   		async : true,
	   		type : "POST",
	   		data : str + "&reqType=AJAX",
	   		url : "ehat/mortuary/savecoldroommaster",
	   		timeout : 1000 * 60 * 5,
	   		cache : false,
	   		error : function() {
	   			alert('error');
	   		},
	   		success : function(r) {
	   			alert(r);
	   			clearData();
	   			fetchcoldroommaster();
	   		}
	   	});
       
}

function clearData()
{
	$("#coldroomid").val("");
	$("#coldroomname").val(" ");
	$("#quantityofbeds").val(" ");
	
}

/****************************************************
 * fetch the cold roommaster data
 * 
 * 
 * 
 * *******************************************************/
function fetchcoldroommaster()
{
	//alert("fetchcoldroommaster");
	 jQuery.ajax({
	   		async : true,
	   		type : "POST",
	   		//data : str + "&reqType=AJAX",
	   		url : "ehat/mortuary/fechcoldroommaster",
	   		timeout : 1000 * 60 * 5,
	   		cache : false,
	   		error : function() {
	   			alert('error');
	   		},
	   		success : function(r) {
	   		
	   			//alert("save Cold Room Sccessfull..."+r);
	   			setcoldroommaster(r);
	   		}
	   	});
	
}
function setcoldroommaster(r) {

	var optionList = "<option></option>";

	var masterModuleBody = '<thead id="ehatTHead" style="margin-right: 10px;">' + "<tr style='background-color: #EEEEEE; height: 30px;'>"
			+ '<th class="col-md-1 left">#</th>'
			+ '<th class="col-md-2 left">Cold Room Name</th>'
			+ '<th class="col-md-2 center">Quantity OF Beds</th>'
			+ '<th class="col-md-1 left">Edit</th>'
			+ '<th class="col-md-1 left">Delete</th>' + '</tr></thead>';
	for (var int = 0; int < r.listColdRoomMaster.length; int++) {

		masterModuleBody = masterModuleBody
				+

				"<tr style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
				+ '<td id="row'
				+ (r.listColdRoomMaster[int].cold_room_id)
				+ '" class="col-md-1 left">'
				+ (int + 1)
				+ '</td>'
				
				+ '<td id="nName'
				+ (r.listColdRoomMaster[int].cold_room_id)
				+ '" class="col-md-1 left">'
				+ (r.listColdRoomMaster[int].cold_room_name)
				+ ' </td>'
				+ '<td  id="nCode'
				+ (r.listColdRoomMaster[int].cold_room_id)
				+ '" class="col-md-1-1 center">'
				+ (r.listColdRoomMaster[int].quantity_of_beds)
				+ ' </td>'

				+ '<td class="col-md-1 left" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
				+ r.listColdRoomMaster[int].cold_room_id
				+ ' onclick="coldRoomupdatemaster('
				+ r.listColdRoomMaster[int].cold_room_id
				+ ')"><i class="fa fa-edit"></i></button></td>'

				+ '<td class="col-md-1 left"><button class="btn btn-xs btn-success" value="DELETE" id=btnDelete10 '
				+ r.listColdRoomMaster[int].cold_room_id + ' onclick=coldRoomDeletemaster('
				+ r.listColdRoomMaster[int].cold_room_id
				+ ') > <i class="fa fa-trash-o"></i></button> </td>'

				+ '</tr>';

		optionList = optionList + "<option value="
				+ r.listColdRoomMaster[int].cold_room_id + ">"
				+ r.listColdRoomMaster[int].cold_room_name + "</option>";
	}

	$("#masterModuleBodycoldroom").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}	
	
/************************************************
 * 
 * cold room Delete master
 **************************************************/	
	
	function coldRoomDeletemaster(id)
	{
	//	alert(id);
		var inputs = [];
		inputs.push('delete_id=' + id);
		
		var str = inputs.join('&');
		 jQuery.ajax({
		   		async : true,
		   		type : "POST",
		   		data : str + "&reqType=AJAX",
		   		url : "ehat/mortuary/deletecoldroommaster",
		   		timeout : 1000 * 60 * 5,
		   		cache : false,
		   		error : function() {
		   			alert('error');
		   		},
		   		success : function(r) {
		   			//Added By Annapurna for getting pop up msg
		   				alert(r);
		   					   			
		   			fetchcoldroommaster();
		   		}
		   	});
	}
	
	
/************************************************
	 * 
	 * cold room update master
**************************************************/	
		
		function coldRoomupdatemaster(id)
		{
		//	alert(id);
			var inputs = [];
			inputs.push('update_id=' + id);
			
			var str = inputs.join('&');
			 jQuery.ajax({
			   		async : true,
			   		type : "POST",
			   		data : str + "&reqType=AJAX",
			   		url : "ehat/mortuary/updatecoldroommaster",
			   		timeout : 1000 * 60 * 5,
			   		cache : false,
			   		error : function() {
			   			alert('error');
			   		},
			   		success : function(r) {

			   		
			   			$("#coldroomid").val(r.cold_room_id);
			   			$("#coldroomname").val(r.cold_room_name);
			   			$("#quantityofbeds").val(r.quantity_of_beds);
			   			
			   		}
			   	});
		}
