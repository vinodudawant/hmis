/**
 /* @Bilal 24_May_2017
 *********************For charges master**/

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/

function refreshChargesMasterSlave() {

	$('#slaveId').val("");
	$('#categoryName').val("");
	$('#codeName').val("");
	$('#followUpCount').val(0);
	$('input[name="ppnTypes"][value="N"]').prop('checked', true);
	
	$("#ChargesIdHidden").val("");
	var masterid = $("#li0").val();
	removeInpuntFild(0,masterid,'dynamicItem');
	
	getChargesMasterSlaveList();

}

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to save or update the fields
 ******************************************************************************/

function saveChargesMasterSlave() {
	var numbr = 0;
	var slaveId = $("#slaveId").val();
	var categoryName = $("#categoryName").val();
	var codeName = $("#codeName").val();
	var isCategory = $("input:radio[name='privilegesTypes']:checked").val();
	var isPpn = $("input:radio[name='ppnTypes']:checked").val();
	var byName2 = $("#byName2").val();
	var masterid = $("#li0").val();// masterid
	var selfId = 0;// static self id
	numbr = $("#numbr").val();
	var liSize = $("#dynamicItem li").length;
	
	

	if (categoryName == "" || categoryName == "undefined"
			|| categoryName == null) {

		$("#categoryName").focus();
		return false;
	}
	
	if (codeName == "" || codeName == "undefined" || codeName == null) {

		$("#codeName").focus();
		return false;
	}
	
	if (liSize == 0) {

		alert("Please Select Atleast One Charges and Sub Charges! ");
		SetFocus('dynamicItems');
		return false;

	}
	
	if (liSize == 1) {
		fetchChargesSlaveListById(masterid, selfId);
	} else {

		selfId = $("#li" + (liSize - 1)).val();
		fetchChargesSlaveListById(masterid, selfId);
	}

	if (slaveId == "" || slaveId == null || slaveId == undefined) {
		slaveId = 0;
	}

	var disc = $("#disc").val();
	
	var followUpCount = $("#followUpCount").val();
	if (followUpCount == "" || followUpCount == null || followUpCount == undefined) {
		followUpCount = 0;
	}
	
	
	var inputs = [];

	inputs.push('slaveId=' + slaveId);
	inputs.push('categoryName=' + encodeURIComponent(categoryName));
	inputs.push('codeName=' + encodeURIComponent(codeName));
	inputs.push('numbr=' + encodeURIComponent(numbr));
	inputs.push('isCategory=' + isCategory);
	inputs.push('isPpn=' + isPpn);
	inputs.push('byName2=' + byName2);
	inputs.push('chargesId=' + masterid);
	inputs.push('selfId=' + selfId);
	inputs.push('discount=' + disc);
	inputs.push('followUpCount=' + followUpCount);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/chargesSlave/saveChragesSlave",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			refreshChargesMasterSlave();

		}
	});
}

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to get records in input when we click
 *       on edit button
 ******************************************************************************/
function updateChargesMasterSlave(slaveId) {
	$('#numbr').val($('#numbr' + slaveId).val());
	$('#categoryName').val($('#chName' + slaveId).html());
	$('#codeName').val($('#coName' + slaveId).html());
	$('#slaveId').val(slaveId); // set slave id for update
	$('#disc').val($('#discount' + slaveId).val());
	var cat = $('#isCats' + slaveId).val();
	var ppn = $('#isPpn' + slaveId).val();
	if (cat == "Y") {
		$('input[name="privilegesTypes"][value="Y"]').prop('checked', true);
		$('input[name="privilegesTypes"][value="N"]').prop('checked', false);
	} else {
		$('input[name="privilegesTypes"][value="Y"]').prop('checked', false);
		$('input[name="privilegesTypes"][value="N"]').prop('checked', true);
	}
	
	if (ppn == "Y") {
		$('input[name="ppnTypes"][value="Y"]').prop('checked', true);
		$('input[name="ppnTypes"][value="N"]').prop('checked', false);
	} else {
		$('input[name="ppnTypes"][value="Y"]').prop('checked', false);
		$('input[name="ppnTypes"][value="N"]').prop('checked', true);
	}

	$('#followUpCount').val($('#followUpCount' + slaveId).val());
	 if(cat == "Y"){
		  $("#followUpDiv").hide();
	  }else if(cat == "N"){
		  $("#followUpDiv").show();
	  }
}

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to fetch records on browser from data
 *       base
 ******************************************************************************/
function getChargesMasterSlaveList() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/chargesSlave/chragesSlaveList",

		error : function() {
			alert('error');
		},
		success : function(response) {

			//chargesMasterTemplate(response);
			setTemplateForChargesSlave(response);
			//$("#listmstr_select").val($('#listmstr_select option:eq(2)').val()).trigger('change');
		}
	});
}
/*******************************************************************************
 * @author Bilal
 * @date 8_JUN_2017 For charges slave master template
 ******************************************************************************/
function setTemplateForChargesSlave(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Slave Id</th>'
						+ '<th class="col-md-1 center">Sub Charges Name</th>'
						+ '<th class="col-md-1 center">Sub Charges Code Name</th>'
						+ '<th class="col-md-1 center">IsCatogory</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="uId'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (r.lstChargesSlave[int].slaveId)+ '</td>'
								+ '<td id="chName'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (r.lstChargesSlave[int].categoryName)+ ' </td>'
								+ '<td  id="coName'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (r.lstChargesSlave[int].codeName)+ ' </td>'
								+ '<td  id="chargesCatogory'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (r.lstChargesSlave[int].isCategory)+ ' </td>'
								/*+ '<td class="col-md-1 center"><div> <input class=btn btn-xs btn-success style=font-size: 10px; type=button value=Edit onclick=editUnit('+ r.lstUnit[int].unitId+ ')/></div> </td>'
								+ '<td class="col-md-1 center"><div> <input style=font-size: 10px; type=button value=Delete onclick=deleteUnit('+ r.lstUnit[int].unitId + ')/></div> </td>'
								*/
								/*+ '<td class="col-md-1 center"><td class= col-md-1> <button id=btnEdit '
								+r.lstUnit[int].unitId+' onclick=editUnit() value=EDIT> <i class="fa fa-save"></i> Edit</button> </td> '*/
							+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success editUserAccess" value="EDIT" id=btnEdit1'+r.lstChargesSlave[int].slaveId+' onclick="updateChargesMasterSlave('+r.lstChargesSlave[int].slaveId+'),fetchSuperCatogoiresSlave('+r.lstChargesSlave[int].slaveId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete '+r.lstChargesSlave[int].slaveId+' onclick=deleteChargesMasterSlave('+r.lstChargesSlave[int].slaveId+') > <i class="fa fa-trash-o"></i></button> </td>'
							+ '<input type="hidden" id="isCats'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isCategory+'">'
							+ '<input type="hidden" id="isPpn'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isPpn+'">'
							+ '<input type="hidden" id="numbr'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].numbr+'">'
							+ '<input type="hidden" id="discount'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].discount+'">'
							+ '<input type="hidden" id="followUpCount'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].followUpCount+'">'
							+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.lstChargesSlave[int].slaveId+">"+r.lstChargesSlave[int].chargesName+"</option>";
	}
	
	$("#masterModuleBody").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
		
}

/*******************************************************************************
 * @author Bilal
 * @date 16_May_2017 For charges master template
 ******************************************************************************/
function chargesMasterTemplate(response) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-sm-1-1 center' id='chName"
				+ response.lstChargesSlave[i].slaveId
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].categoryName
				+ "</td><td class='col-sm-1-1 center' id='coName"
				+ response.lstChargesSlave[i].slaveId
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].codeName
				+ "</td><td class='col-sm-1-1 center' id='coName"
				+ response.lstChargesSlave[i].slaveId
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].isCategory
				+ "</td><td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editChargesMaster' onclick='updateChargesMasterSlave("
				+ response.lstChargesSlave[i].slaveId
				+ "),fetchSuperCatogoiresSlave(" 
				+ response.lstChargesSlave[i].slaveId
				+ ")' ><i class='fa fa-edit'></i></button></td>"
				+ "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMasterSlave' onclick='deleteChargesMasterSlave("
				+ response.lstChargesSlave[i].slaveId
				+ ")' ><i class='fa fa-trash-o'></i></button></td>"
				+ "<input type='hidden' id='isCat"
				+ response.lstChargesSlave[i].slaveId + "' value='"
				+ response.lstChargesSlave[i].isCategory + "'</tr>";
		index++;

	}

	$("#chargesMasterSlaveBody").html(htm);

}

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to delete the records with id
 ******************************************************************************/
function deleteChargesMasterSlave(slaveId) {

	var r = confirm("Are You Sure You Want To Delete Charges Master Slave?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/chargesSlave/deleteChragesSlave",
			data : {
				"slaveId" : slaveId
			},
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshChargesMasterSlave();
				// alert(response);
				getChargesMasterSlaveList();
			}

		});
	}
}
/*******************************************************************************
 * @author Bilal
 * @date 23_05_2017
 * @code for fetching all charges master
 ******************************************************************************/
function getAllChargesMaster() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/charges/chargesMasterList",

		success : function(response) {
			multiSelect(response);
		}
	});

}

/*******************************************************************************
 * @author : Bilal
 * @date : 24-May-2017
 * @reason : for Fetching id of charges name and catogeory name
 ******************************************************************************/

function selectChargesName() {

	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	// var slaveId = 2; , slaveId
	fetchChargesSlaveListById(masterId, selfId);
}

/*******************************************************************************
 * @author : Bilal
 * @date : 24-May-2017
 * @reason : Fetching list of Charges slave by id fetcatY
 ******************************************************************************/
function fetchChargesSlaveListById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		//url : "ehat/chargesSlave/getChragesSlaveById",
		url : "ehat/chargesSlave/fetcatY",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		/* "slaveId" : parseInt(slaveId) */

		},
		success : function(response) {
			multiSelectSlave(response);
		}
	});
}

/*******************************************************************************
 * @Bilal
 * @date 17_May_2017 this method is used to set auto suggestion on browser
 ******************************************************************************/
function setSubChargesMaster(inputId, callfrom) {
	
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/chargesSlave/autoSuggestionChargesMasterNames",
		
		success : function(r) {

			// console.log(r);

			//autoCompTable(r, inputId);
			setTemplateForChargesSlave(r);
			setTimeout(function(){userAccess();},100);

		}
	});
}

/*******************************************************************************
 * @Bilal
 * @date 17_May_2017 this method is used to set auto suggestion on browser
 ******************************************************************************/
function autoCompTable(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$
			.widget(
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

	// Sets up the multicolumn autocomplete widget.
	$("#" + id)
			.mcautocomplete(
					{

						showHeader : true,
						columns : [ /*
									 * { name : 'chargesId', width : '100px',
									 * valueField : 'chargesId' },
									 */{
							name : 'chargesName',
							width : '100px',
							valueField : 'chargesName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {
							console.log(ui);

							var spl = (ui.item.spl = "" ? '' : ui.item.spl);
							if (ui.item.dn != 'No' && ui.item.spl != 'Record'
									&& ui.item.specialisationName != 'Found'
									&& ui.item.depNm != 'Match') {

								$('#byName').val(ui.item.chargesName);
							}

							return false;
						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
							console.log(data);
							console.log(data.lstCharges.length);
							var result;
							if (!data || data.lstCharges.length === 0
									|| !data.lstCharges
									|| data.lstCharges.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'chargesName' : 'Record',
								/* 'codeName' : 'Found', */
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstCharges;// Response List for
								// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");
						}
					});
}

/**
 * ***/

function setTempAllService(r) {
	var tableBody = "";
	var index = 1;
	for ( var i = 0; i < r.listService.length; i++) {
		tableBody = tableBody
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ ""
				+ "</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listService[i].serviceId
				+ "</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listService[i].serviceName
				+ "</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editUserAccess' onclick='getProfileByProfileId("
				+ r.listService[i].serviceName
				+ ")' disabled='disabled'><i class='fa fa-edit'></i>"
				+ "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteProfile("
				+ r.listService[i].serviceId
				+ ")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
		index++;
	}
	$("#roleMasterBody").html(tableBody);
}

/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/

/*$(document).ready(function() {
	App.setPage("wizards_validations"); // Set current page
	App.init(); // Initialise plugins and elements
	FormWizard.init();
});*/
// multiselect ui
function multiSelect(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}

// Touheed for multiselect Data
function setDyanamicDivForCharges(setDiv, getDiv) {
	// listmstr_select
//alert("Hi");
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	
	if (liSize == 0) {
		getAllChargesMaster();// for masters
	} else {
		var masterid = $("#li" + 0).val();
		
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}// now inside submaster catagories

}

function setDyanamicHallTypes(setDiv, getDiv) {
	// listmstr_select

	var data = $('#' + getDiv).select2('data');
	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();
	var htm = "";
		
	if(count==0){
		
		htm = htm+ 
		
			'<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="" href="#"></a>'
			+ '<input id="li0" type="hidden" value="2">';//2 means Hall Id Charges Master
		+'</li>';
	}else{
		
		htm =htm+ 
			
			'<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		+'</li>';
		
		$('#hname').val(name);		
	}
					
	/*'<li id="liItme0" class="select2-search-choice"><div>Hall</div><a href="#" onclick="removeInpuntFild(0,4,\'dynamicItem\')" tabindex="-1" class="select2-search-choice-close"></a><input type="hidden" value="4" id="li0"></li>';*/
	
	$('#' + setDiv).append(htm);	

	var liSize = $("#" + setDiv + " li").length;
		
	/*if (liSize == 0) {
		fetchAllService();// for masters
	} else {*/
		var masterid = $("#li" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} /*else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}*/
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	/*}*/// now inside submaster catagories
		
		var hiddenId=$("#li"+(liSize-1)).val();		
		$('#hallTypeId').val(hiddenId);
		

}

function removeInpuntFild(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();
	} else {
		var masterid = $("#li" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}
}

// fo slave demo
// multiselect ui
function multiSelectSlave(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}
/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/

/********
 * @author	Bilal
 * @base 	Fetching super master of service based on there id
 * @since	7-June-2017
 ********/
function fetchSuperCatogoiresSlave(chargesMasterDto) {
	//if charges slave id is not equals or greter than zero 
	if (chargesMasterDto == "" || chargesMasterDto == null || chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"chargesMasterDto" : parseInt(chargesMasterDto)
			},
			
			url : "ehat/chargesSlave/fetchSuperCatogoires",
			error : function() {
				alert('Network Issue!');
			},
			success : function(response) {
				setDyanamicDivForList('dynamicItem',response);
			}
		});
	}
	
}
/********
 * @author	Bilal
 * @base 	Setting fectched Response of fetchSuperCatogoiresSlave 
 * @since	7-June-2017
 ********/
function setDyanamicDivForList(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
		 	
		 	//$('#disc').val(response.lstChargesSlave[i].discount);
	}
	$('#' + setDiv).html(htm);
}


/**@author Bilal
 * @date 10-july-2017
 * @code for count on subcharges***/
function getSubChargesCount()
{

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/chargesSlave/getSubChargesCount",

		    	success : function(r) {
		    		$("#subChrgCount").html(r);
				
				}
			});
	

}
