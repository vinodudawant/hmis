var coldroomid=0;
/*************************************************
fech the Cold Room name Master
**************************************************/
/***@author    :navnath 
 * @Date       :11-10-2019
 * @Code       :fech the Cold Room name Master***/
function fetchcoldroommastername(mor_id)
{	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/mortuary/fechcoldroommaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			var divContent = "";
			divContent = divContent
					+ "<select name='ColdRoom'  class='col-md-12' ><option value='0'>--Select--</option>";
			for ( var i = 0; i < r.listColdRoomMaster.length; i++) 
			{
				divContent = divContent + "<option data-coldroom='" + r.listColdRoomMaster[i].cold_room_id + "' data-quantity='"+r.listColdRoomMaster[i].quantity_of_beds+"' data-mor_id='"+mor_id+"'>"
						+ r.listColdRoomMaster[i].cold_room_name + "</option>";
			}
			divContent = divContent + "</select>";
			$("#selColdRoom").html(divContent);
		}
	});
}

/***************************************************************

Cold Room Bed Allocation 
**************************************************************/

function getBedAvaColdRoom(coldroomID) {
	//alert(coldroomID);
	var inputs = [];
	inputs.push('coldroomId=' + coldroomID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/mortuary/getbedavacoldroom",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {					
					
					/**********************************************/
					var cold_room_id=$("#cold_room_id").val();
					
					/*********************************************/
					if(cold_room_id == null || cold_room_id == undefined || cold_room_id == "" )
						{
						//betStateMangementAll(r);
						
						}
					else
						{
						betStateMangement(r);
						}
				}
			});
};


/**************************************************
 * 
 * model Class 
 * **********************************************/
function showBedAllocation(mor_id, cold_rm_id, bed_no){
	
  	if (mor_id == "" || mor_id == null || mor_id == undefined || mor_id =="null") {
  		mor_id =0;  
      alert("Mortuary Id Not Selected.....");
		
		return false;
 	}
	else 
	{
			Savemortuarybed(mor_id, cold_rm_id,bed_no);
			
			return true;
	}
}

function Savemortuarybed(mor_id, cold_room_id,bed_no)
{
	var result = confirm("Do you want to allocate a bed?");

	if(result==true)
	{
		var inputs = [];
		inputs.push('mor_id=' + mor_id);
		inputs.push('bed_number=' + bed_no);
		inputs.push('cold_room_id=' + cold_room_id);
		var str = inputs.join('&');

	jQuery.ajax({
			async : false,
			type : "POST",
			data :str+"&reqType=AJAX",
			url : "ehat/mortuary/savebedmortuary",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r == 1)
				{
					alert("Bed Allocated Successfully...!");
					location.reload(true);
				}
				else if(r == 0)
				{
					alert("Bed Not Allocated.");
				}
				else if(r == -1)
				{
					alert("Bed is already allocated.");
				}
			}
		});
	}
	else
	{
		alert("The bed was not allocated.");
	}
}
/*******************************************************
Bed DeAllocation
******************************************************/
function  bedDeAllocation(cold_room_slave_id)
{
	alert("This bed is already allocated .");
	
	/*if (cold_room_slave_id == "" || cold_room_slave_id == null || cold_room_slave_id == undefined || cold_room_slave_id =="null") {
  		
		return false;
 	}
	
	var inputs = [];
	inputs.push('cold_room_slave_id=' + cold_room_slave_id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data :str+"&reqType=AJAX",
		url : "ehat/mortuary/beddeallocation",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
			
		},
		success : function(r) {
				//alert(r);
				
				if(r > 0)
					{
					alert("Bed Deallocated Successfully.");
					location.reload(true); 
					}
				else
					{
					alert("Bed NOT Deallocated.");
					}
				
				
		}
	});
*/}


/*********************************************************************************
mortuary List 

***********************************************************************************/
function ListMortuary(id)
{	
var bed_quntity = $("#" + id).find(':selected').attr('data-quantity');
var coldroom_id = $("#" + id).find(':selected').attr('data-coldroom');
var mor_id = $("#" + id).find(':selected').attr('data-mor_id');

	if(coldroom_id == null || coldroom_id == undefined || coldroom_id == " ")
	{
		
		return false;
	}
	var inputs = [];
	inputs.push('cold_room_id='+coldroom_id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data :str+"&reqType=AJAX",
		url : "ehat/mortuary/listofmortuary",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
			
		},
		success : function(r) {
			//alert("Demo"+r.mor_id);
			
			//setListOfMortuary(r,id);
			ShowBedsInformation(r,bed_quntity,coldroom_id,mor_id);
		}
	});
	
	
}

/***************************************************************/
function ShowBedsInformation(r,bed_quntity,id,mor_id)
{
	
	var bedList = "<table class='table'> <tbody class='col-md-12-1' style='margin-bottom: 78px;'> ";
	var loopCounter = 0;
	
	var bedCount = bed_quntity;

	var row1 = 0;
	var row2 = 0;
	var row3 = 0;
	
	if (bedCount > 0 && bedCount <= 10) { // 1 to 10
		row1 = bedCount;

	} else if (bedCount > 10 && bedCount <= 20) {
		row1 = 10;
		row2 = bedCount;

	} else if (bedCount > 20 && bedCount <= 30) {
		row1 = 10;
		row2 = 20;
		row3 = bedCount;

	} else if (bedCount > 30) {
		row1 = (Math.round(bedCount / 3.5) + 1);
		row2 = row1 * 2;
		row3 = row1 * 3;
	}
	var bedState2=0;
	var bedState3=0;
	var bedState4=0;
	var totalcount=bed_quntity;
	var count = 1;
	
	
	for(var i = 0; i < bed_quntity; i++)
	{

		if (loopCounter == 0 || loopCounter == row1
				|| loopCounter == row2
				|| loopCounter == row3) {
			bedList = bedList + "<tr id='' class=''>";
		}
	
		
		if(r.list != null || r.list != undefined)
		{
			for(var j = 0; j < r.list.length; j++)
			{
				if(i+1 == r.list[j].bedNumber && r.list[j].bedStatus == 1)
				{
					//alert("bed :"+i)
					 bedList = bedList
						+ "<td>"
						+ "<div id='bbed1' style='width: 150px; min-height: 160px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198)'> "
						+ "<div style='height: 17px; width: 148px;'id=''>" 
						+"</div>"
						+ "<div style='height: 16px; width: 148px;'id=''>"
						+"<label class='' style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'> Nmae:-"+r.list[j].deceasedName+"</label>"
						+"</div>"
						+"<div>"
						+"<label class='' style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'> Date:-"+r.list[j].dod+"</label>"
						+"<div>"
						+ "<div style='height: 16px; width: 148px;'id=''>"
						+"<label class='' style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Gender:-"+r.list[j].gender+"</label>"	
						+"	<input type='hidden' value='' name='' id=''>"
						+"	<input type='hidden' value='1' name='' id=''>"
						+"	<input type='hidden' value='' name='' id=''>"
						+"</div>"
						+ "<div style='height: 33px; width: 148px;'id=''>"
						+ "<img id='' src='images/bedOcc1.png' width='40px' height='30px' onclick= bedDeAllocation('"+r.list[j].coldRoomMasterSlaveId+"') >"
						+ "<div style='height: 16px; width: 148px;'id=''>"
						+"<label class='' style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Bed No:-"+count+"</label>"
						+"</div>"
						+ "<div style='height: 16px; width: 148px;'id=''>"
						+"<label class='' style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Cold Room No:-"+id+"</label>"
						+"</div>"
						+"</div>"
						+ "</div> </td>";
					
					 count++;
					i++
					loopCounter++;
				}
			}
		}
		 bedList = bedList
			+ "<td>"
			+ "<div style='width: 150px; min-height: 160px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'> "
			+ "<div style='height: 17px; width: 148px;'id=''></div>"
			+ "<div style='height: 16px; width: 148px;'id=''></div>"
			+ "<div style='height: 16px; width: 148px;'id=''></div>"
			+ "<div style='height: 16px; width: 148px;'id=''>"
			+"	<input type='hidden' value='"+id+"' name='cold_room_id' id='cold_room_id'>"
			+"	<input type='hidden' value='' name='bed_state' id='bed_state'>"
			+"	<input type='hidden' value="+count+" name='bed_number' id='bed_number'>"
			
			+"</div>"
			+ "<div style='height: 33px; width: 148px;'id=''>"
			+ "<img id='' src='images/bedEmpty1.png' width='40px' height='30px'  onclick= showBedAllocation('"+mor_id+"','"+id+"','"+count+"')>"
			+ "<div style='height: 16px; width: 148px;'id=''>"
			+"<label class='' style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Bed No:-"+count+"</label>"
			+"<label id='bed_number'></label>"
			+"</div>"
			+ "<div style='height: 16px; width: 148px;'id=''>"
			+"<label class='' style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Cold Room No:-"+id+"</label>"
			+"</div>"
			+"</div>"
			+ "</div> </td>";
		 
		 count++;
		 loopCounter++;

			if (loopCounter == 0 || loopCounter == row1
					|| loopCounter == row2
					|| loopCounter == row3) {
				bedList = bedList + "</tr>";
			}
		
	}
	
 
	$("#allbeds").html(bedList);
	bedList = bedList + "</tbody> </table>";
	
}


/************************************************************************/

/************************************************************/
function singleMorturay(mor_id)
{
	
	var inputs = [];
	inputs.push('mor_id=' + mor_id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/mortuary/getmortuarybyid",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
		//alert(r.mor_id);
		$("#mortuaryId").html(r.mor_id);
		$("#address").html(r.address1);
		$("#sex").html(r.gender1);
		$("#deceasedName").html(r.deceased_name);
		
		$("#age").html(r.age1);
		$("#dod").html(r.date_of_death);	
		}
	});
	
}
/****************************************************/
function doHideShow3(mor_id)
{

	
	if(mor_id == null || mor_id == undefined || mor_id == " ")
	{
		  $("#mortuaryid_popup").hide();
		
		
			
	}	
	
}