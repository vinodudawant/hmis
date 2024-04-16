/**
 /* @Bilal 15_May_2017
 *********************For charges master**/

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/

function refreshChargesMaster() {

	$('#chargesId').val("");
	$('#chargesName').val("");
	$('#codeName').val("");
	getChargesMasterList();

}
/** *** End**** */

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to save or update the fields
 ******************************************************************************/
function saveChargesMaster() {

	var chargesId = $("#chargesId").val();
	var chargesName = $("#chargesName").val();
	var codeName = $("#codeName").val();

	if (chargesName == "" || chargesName == null || chargesName == undefined) {
		$("#chargesName").focus();					
		return false;
	}
	if (codeName == "" || codeName == null || codeName == undefined) {
		$("#codeName").focus();					
		return false;
	}
	
	if (chargesId == "" || chargesId == null || chargesId == undefined) {
		chargesId = 0;
	}
	var inputs = [];
	// inputs.push('action=showDiagnosisHisab');
	inputs.push('chargesId=' + chargesId);
	inputs.push('chargesName=' + chargesName);
	inputs.push('codeName=' + codeName);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/charges/saveChragesMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			refreshChargesMaster();

		}
	});
}
/** *** End**** */

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to get records in input when we click
 *       on edit button
 ******************************************************************************/
function updateChargesMaster(chargesId) {

	$('#chargesName').val($('#chName' + chargesId).html());
	$('#codeName').val($('#coName' + chargesId).html());
	$('#chargesId').val(chargesId);

}
/** *** End**** */

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to fetch records on browser from data
 *       base
 ******************************************************************************/
function getChargesMasterList() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/charges/chargesMasterList",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//chargesMasterTemplate(response);
			setTemplateForCharges(response);
		}
	});
}
/** *** End**** */

/*******************************************************************************
 * @author Bilal
 * @date 16_May_2017 For charges master template
 ******************************************************************************/
function chargesMasterTemplate(response) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.lstCharges.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-sm-1-1 center' id='chName"
				+ response.lstCharges[i].chargesId
				+ "' style='height: 21.5px;'>"
				+ response.lstCharges[i].chargesName
				+ "</td><td class='col-sm-1-1 center' id='coName"
				+ response.lstCharges[i].chargesId
				+ "' style='height: 21.5px;'>"
				+ response.lstCharges[i].codeName
				+ "</td><td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editChargesMaster' onclick='updateChargesMaster("
				+ response.lstCharges[i].chargesId
				+ ")' ><i class='fa fa-edit'></i></button></td>"
				+ "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMaster' onclick='deleteChargesMaster("
				+ response.lstCharges[i].chargesId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		index++;

	}

	$("#chargesMasterBody").html(htm);

}
/** *** End**** */
/*******************************************************************************
 * @author Bilal
 * @date 16_May_2017 For charges master template
 ******************************************************************************/
function setTemplateForCharges(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Charges ID</th>'
						+ '<th class="col-md-1 center">Charges Name</th>'
						+ '<th class="col-md-1 center">Charges Code</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.lstCharges.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.lstCharges[int].chargesId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="uId'+(r.lstCharges[int].chargesId) +'" class="col-md-1 center">'+ (r.lstCharges[int].chargesId)+ '</td>'
								+ '<td id="chName'+(r.lstCharges[int].chargesId) +'" class="col-md-1 center">'+ (r.lstCharges[int].chargesName)+ ' </td>'
								+ '<td  id="coName'+(r.lstCharges[int].chargesId) +'" class="col-md-1 center">'+ (r.lstCharges[int].codeName)+ ' </td>'
								/*+ '<td class="col-md-1 center"><div> <input class=btn btn-xs btn-success style=font-size: 10px; type=button value=Edit onclick=editUnit('+ r.lstUnit[int].unitId+ ')/></div> </td>'
								+ '<td class="col-md-1 center"><div> <input style=font-size: 10px; type=button value=Delete onclick=deleteUnit('+ r.lstUnit[int].unitId + ')/></div> </td>'
								*/
								/*+ '<td class="col-md-1 center"><td class= col-md-1> <button id=btnEdit '
								+r.lstUnit[int].unitId+' onclick=editUnit() value=EDIT> <i class="fa fa-save"></i> Edit</button> </td> '*/
							+'<td class="col-md-1 center" ><button disabled class="btn btn-xs btn-success editUserAccess" value="EDIT" id=btnEdit1'+r.lstCharges[int].chargesId+' onclick="updateChargesMaster('+r.lstCharges[int].chargesId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button disabled class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete '+r.lstCharges[int].chargesId+' onclick=deleteChargesMaster('+r.lstCharges[int].chargesId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.lstCharges[int].chargesId+">"+r.lstCharges[int].chargesName+"</option>";
	}
	
	$("#masterModuleBody").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
		
}

/*******************************************************************************
 * @Bilal
 * @date 16_May_2017 this method is used to delete the records with id
 ******************************************************************************/
function deleteChargesMaster(chargesId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Charges Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/charges/deleteChragesMaster",
			data : {
				"chargesId" : chargesId
			},
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshChargesMaster();
				alertify.success(response);
				getChargesMasterList();
			}

		});
	}
}

/** *** End**** */


/*******************************************************************************
 * @Bilal
 * @date 17_May_2017 this method is used to set auto suggestion on browser
 ******************************************************************************/
function setAutoCompleteForChargesMaster2(inputId, callfrom) {

	// alert("hi");
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
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
		url : "ehat/charges/autoSuggestionChargesMasterNames",
		
		success : function(r) {
			// alert(r.lstCharges[0].chargesName);

			setTemplateForCharges(r);
			//chargesMasterTemplate(r);
			//autoCompTable(r, inputId);
			setTimeout(function(){userAccess();},100);
		}
	});
}
/** *** End**** */
/*******************************************************************************
 * @Bilal
 * @date 17_May_2017 this method is used to set auto suggestion on browser
 ******************************************************************************/
function autoCompTable(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
	// alert("hi");
	var myArray = response;// parsing response in JSON format
	// alert(myArray);
	// alert("b");
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
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ /*
									 * { name : 'chargesId', width : '100px',
									 * valueField : 'chargesId' },
									 */{
							name : 'chargesName',
							width : '100px',
							valueField : 'chargesName'
						} /*
							 * , { name : 'codeName', width : '100px',
							 * valueField : 'codeName' }
							 */],

						// Event handler for when a list item is selected.
						select : function(event, ui) {
							console.log(ui);
							// this.value = (ui.item ? ui.item.dn : '');
							// this.value = (ui.item.spl = 'undefined' ? '' :
							// ui.item.dn);
							var spl = (ui.item.spl = "" ? '' : ui.item.spl);
							if (ui.item.dn != 'No' && ui.item.spl != 'Record'
									&& ui.item.specialisationName != 'Found'
									&& ui.item.depNm != 'Match') {
								// $('#results').text(ui.item ? 'Selected: ' +
								// ui.item.dn + ', '+ spl + ', '+
								// ui.item.specialisationName + ', ' +
								// ui.item.depNm: 'Nothing selected, input was '
								// + this.value);
								// $('#' + id).val(ui.item.dn);
								// $('#userDocId').val(ui.item.ui);
								// $('#selectedObj').html(JSON.stringify(ui.item));
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
/**@author Bilal
 * @date 06-july-2017
 * @code for count on subservice***/
function getChargesMasterCount()
{

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/charges/getChargesMasterCount",

		    	success : function(r) {
		    		$("#chrgCount").html(r);
				//alert(r);
					//setTemplateForUnit(r);//call template
				}
			});
	

}