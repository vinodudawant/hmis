/************
* @author	: Navnath Erande
* @date		: 10-10-2019
* @codeFor	: Template for Mortuary Records
 ************/
function fetchcoldroommasterqueue()
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
	   			setcoldroommasterqueue(r);
	   		}
	   	});
	
}
function setcoldroommasterqueue(r) {

	var optionList = "<option></option>";

	var masterModuleBody = '<thead id="ehatTHead" style="margin-right: 10px;">' + '<tr>'
			+ '<th class="col-md-1 center" style="border: 1px solid yellowgreen;">#</th>'
			+ '<th class="col-md-1 left"  style="border: 1px solid yellowgreen;">Cold Room Name</th>'
			+ '<th class="col-md-1 left" style="border: 1px solid yellowgreen;">Quantity OF Beds</th>'
			+ '<th class="col-md-1 left" style="border: 1px solid yellowgreen;">Bed Allocate</th>'
			+ '<th class="col-md-1 left" style="border: 1px solid yellowgreen;">Cancal Bed</th>' + '</tr></thead>';
	if(r.listColdRoomMaster.lengt > 0)
		{
	for (var int = 0; int < r.listColdRoomMaster.length; int++) {

		masterModuleBody = masterModuleBody
				+

				'<tr>'
				+ '<td id="row'
				+ (r.listColdRoomMaster[int].cold_room_id)
				+ '" class="col-md-1 center">'
				+ (int + 1)
				+ '</td>'
				
				+ '<td id="nName'
				+ (r.listColdRoomMaster[int].cold_room_id)
				+ '" class="col-md-1 left">'
				+ (r.listColdRoomMaster[int].cold_room_name)
				+ ' </td>'
				+ '<td  id="nCode'
				+ (r.listColdRoomMaster[int].cold_room_id)
				+ '" class="col-md-1 left">'
				+ (r.listColdRoomMaster[int].quantity_of_beds)
				+ ' </td>'

				+ '<td class="col-md-1 left" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
				+ r.listColdRoomMaster[int].cold_room_id
				+ ' onclick="BedAllocatedMortuary('
				+ r.listColdRoomMaster[int].cold_room_id
				+ ')">Allot Bed</i></button></td>'
				+ '</tr>';

		optionList = optionList + "<option value="
				+ r.listColdRoomMaster[int].cold_room_id + ">"
				+ r.listColdRoomMaster[int].cold_room_name + "</option>";
	}
		}
	else
		{
		masterModuleBody = masterModuleBody+"<tr><td colspan = 5>No Record Found</td></tr>";
		}

	$("#masterModuleBodycoldroomAllocated").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}	

/********************************************************

function Allocated Bed Mortuary
*******************************************************/

/*$('#buttonid').click(function(){
    window.open('yourJspPageHere.jsp','_blank');
 });*/

function BedAllocatedMortuary(id)
{	
	window.location.href = "mortuary_beds_cold_room.jsp?"
		+ "id=" + id;
}
/**************************************************************/
function fetchMortuaryAll(callform) {
	
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/mortuaryReg/getAllMortuaryRegisterPatient",
		data : {
			"callform" :callform
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setTempMorPat(r);
   			
		}
	});
}


function setTempMorPat(r) {

	var index = 1;
	var htm = "<div  id='exgetdeath' class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
		+ "<thead>"
		+ "<tr style='background-color: #EEEEEE;'>"
		+ "<th style='width:4%;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 ' style='height: 21.5px;padding-left:1%;'><div class='TextFont'>Mor ID</div></th>"

		+ "<th class='col-md-6-1 ' style='height: 21.5px;padding-left:5%;'><div class='TextFont'>Deceased Name</div></th>"
		+ "<th class='col-md-1-1 ' style='height: 21.5px;'><div class='TextFont'>Mor Date</div></th>"
		+ "<th class='col-md-1-1 ' style='height: 21.5px;'><div class='TextFont'>Mor Time</div></th>"

		+ "<th class='col-md-1-1 ' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"

		+ "<th class='col-md-1-1 ' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='col-sm-2-1 ' style='height: 21.5px;'><div class='TextFont'>Allot Bed</div></th>"

		+ "</tr>" + "</thead>	" + "</table></div>";
	if(r.mordto.length > 0)
		{
	
	for ( var i = 0; i < r.mordto.length; i++) {

		if(r.mordto[i].isBedAlloted == 'N' )
		{	

		var a = "";

		htm = htm
				+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td >"
				+ index
				+ "</td>"
				+ "<td class='col-sm-1-1' style='height: 21.5px;padding-left:1%;'>"
				+ r.mordto[i].mor_id
				+ "</td>"
				+ "<td class='col-sm-3-1 ' style='height: 21.5px; padding-left:5%;'>"
				+ r.mordto[i].deceased_name
				+ "</td>"
				+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>"
				+ r.mordto[i].date_in
				+ "</td>"
				+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>"
				+ r.mordto[i].time_in
				+ "</td>"
				+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>"
				+ r.mordto[i].age1
				+ "</td>"
				+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>"
				+ r.mordto[i].gender1
				+ "</td>" 
				+ "<td class='col-sm-6-1 ' style='height: 21.5px;'>"
				+ "<button onclick='AllocateBed("+r.mordto[i].mor_id+")'type='button' class='btn btn-xs btn-success' value='("+r.mordto[i].mor_id+")'><i class=''>Allocate Bed</i></button>"
	        	+ "</td>"
				+ "</tr>" + "</tbody>"
				+ "</table>" + "</div>";
		index++;
	}
	}
		}else
			{
			htm = htm+"<tr><td colspan = 5>No Record Found</td></tr>";
			}
	
	$("#Mortuarytable").html(htm);
}

function AllocateBed(morId)
{
	window.location.href = "mortuary_beds_cold_room.jsp?"
		+ "id=" + morId;
}
/*
 Autosuggestion
*/
function autoSuggestionMortury(inputId)
{
	
	var findingName = $("#byName").val();
	var inputs = [];	
	inputs.push('findingName=' + findingName);	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mortuary/mortuarynameautosuggestion",
		cache : false,	
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempMorPat(r);
			mortuaryAutosuggestion(r,inputId);
		}
	});
	
}

function mortuaryAutosuggestion(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	$("#" + id).mcautocomplete(
	{
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Deceased name',
			width : '100px',
			valueField : 'deceased_name'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],
		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.deceased_name != 'Match') {
			
				 
				$('#'+id).val(ui.item.deceased_name);
				
			}
			/*
			 * This function use for Enter keypress search
			 */
			autoSuggestionMortury(id,'search');
			return false;
		},
		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.mordto.length);
			var result;
			if (!data || data.mordto.length === 0 || !data.mordto
					|| data.mordto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'deceased_name' : 'Record',
					'mor_id' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.mordto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
 
