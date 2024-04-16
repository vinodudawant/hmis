/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to Insert data in the units.
 ******************************************************************************/

function insertMaster() {

	var unitId = $('#unitMasterId').val();	
	if (unitId == "" || unitId == null) {
		saveUnit();
	} else {
		updateMaster(unitId);
	}
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to Refresh the units.
 ******************************************************************************/
function refreshUnitMaster() {
	$('#unitId').val(0);
	$('#unitName').val("");//getAllUnitListMaster();
	$('#unitCode').val("");
	$("#stateId").select2('val',"0");
	$("#distictId").select2('val',"0");
	$("#typeId").select2('val',"0");
	$("#hospitalId").select2('val',"0");
	$("#yearId").select2('val',"0");
	$('#ncomb').prop('checked', true);
	getAllUnit();
	setTimeout(function(){userAccess();},700);
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to save the units.
 ******************************************************************************/
function saveUnit() {
	
	var unitId= $('#unitId').val();
	var unitName = $('#unitName').val();
	var unitCode = $('#unitCode').val();
	var stateId = $('#stateId').val();
	var distictId = $('#distictId').val();
	var typeId = $('#typeId').val();
	var hospitalId = $('#hospitalId').val();	
	var yearId = $('#yearId').val();
	var isActive="";
	if($("input[type='radio'].iscomb").is(':checked')) {
		
		isActive = $("input[type='radio'].iscomb:checked").val();  
	}
	
	/*if(isActive=="Y"){
		getCountOfActiveUnit();	
		var activeId = $('#activeId').val();	
		if(parseFloat(activeId)>0){
			alert("Already One Unit Is active");			
			return false;
		}
	}*/

	if(stateId=="" || stateId==undefined || stateId==null || stateId=='0'){
		
		alert("please select state");		
		$("#stateId").focus();					
		return false;
	}
	
	if(distictId=="" || distictId==undefined || distictId==null ||distictId=='0'){
		
		alert("please select district");		
		$("#distictId").focus();					
		return false;
	}	
	
	if(typeId=="" || typeId==undefined || typeId==null ||typeId=='0'){
		
		alert("please select Type");		
		$("#typeId").focus();					
		return false;
	}	
	
	if(hospitalId=="" || hospitalId==undefined || hospitalId==null ||hospitalId=='0'){
			
		alert("please select Hospital Code");		
		$("#hospitalId").focus();					
		return false;
	}	

	if(yearId=="" || yearId==undefined || yearId==null ||yearId=='0'){
			
		alert("please select Year");		
		$("#yearId").focus();					
		return false;
	}	
	
	if(unitName=="" || unitName=="undefined" || unitName==null){
		
		$("#unitName").focus();					
		return false;
	}
	if(unitCode=="" || unitCode=="undefined" || unitCode==null){
		
		$("#unitCode").focus();	
		return false;
	}	

	if(unitId == "" || unitId == null || unitId == undefined){
		unitId = 0;
	}
	
	var inputs = [];	
	inputs.push('unitName=' + unitName);
	inputs.push('unitCode=' + unitCode);
	inputs.push('unitId=' + unitId);
	inputs.push('stateId=' + stateId);
	inputs.push('districtId=' + distictId);
	inputs.push('typeId=' + typeId);
	inputs.push('hospitalId=' + hospitalId);
	inputs.push('yearId=' + yearId);
	inputs.push('activeFlag=' + isActive);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/unit/save",
		data	: str + "&reqType=AJAX",
	//	timeout : 1000 * 60 * 5,
	//	cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			alertify.success(r);		
			getAllUnit();
			refreshUnitMaster();
			getUnitCount();
		}
	});	
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Updating master
 ******************************************************************************/

function updateUnitMaster(unitId) {	
	getCountOfActiveUnit();
	var activeId = $('#activeId').val();
	//alert(activeId);
	if(parseInt(activeId)>0){
		alert("Already One Unit Is active");
		return false;
	}
	$('#unitName').val($('#unitName' + unitId).html());
	$('#unitCode').val($('#unitCode' + unitId).html());
	$('#unitId').val(unitId);
	// editChargesMaster(chargesId);

}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getAllUnit() {

	jQuery.ajax({
				async : true,
				type : "POST",
				url : "ehat/unit/fetchUnitList",

				success : function(r) {
					setTemplateForUnit(r);//call template
				}
			});
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForUnit(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Unit ID</th>'
						+ '<th class="col-md-1 center">State Name</th>'
						+ '<th class="col-md-1 center">District Name</th>'
						+ '<th class="col-md-1 center">Type Name</th>'
						+ '<th class="col-md-1 center">Hospital Code</th>'
						+ '<th class="col-md-1 center">Year</th>'
						+ '<th class="col-md-1 center">Unit Name</th>'
						+ '<th class="col-md-1 center">Unit Code</th>'
						+ '<th class="col-md-1 center">Status</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.lstUnit.length; int++) {
		var str=r.lstUnit[int].activeFlag;

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="uId'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].unitId)+ '</td>'
								+ '<td id="ustateName'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].stateName)+ '</td>'
								+ '<td id="udName'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].districtName)+ '</td>'
								+ '<td id="utName'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].typeName)+ '</td>'
								+ '<td id="uhName'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].hospitalName)+ '</td>'
								+ '<td id="uyName'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].year)+ '</td>'
								
								+ '<td id="uName'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].unitName)+ ' </td>'
								+ '<td  id="uCode'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].unitCode)+ ' </td>'
								+ '<td  id="uflag'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+ (r.lstUnit[int].activeFlag)+ ' </td>'

								/*+ '<td class="col-md-1 center"><div> <input class=btn btn-xs btn-success style=font-size: 10px; type=button value=Edit onclick=editUnit('+ r.lstUnit[int].unitId+ ')/></div> </td>'
								+ '<td class="col-md-1 center"><div> <input style=font-size: 10px; type=button value=Delete onclick=deleteUnit('+ r.lstUnit[int].unitId + ')/></div> </td>'
								*/
								/*+ '<td class="col-md-1 center"><td class= col-md-1> <button id=btnEdit '
								+r.lstUnit[int].unitId+' onclick=editUnit() value=EDIT> <i class="fa fa-save"></i> Edit</button> </td> '*/
							+'<td class="col-md-1 center" ><button disabled class="btn btn-xs btn-success editUserAccess"  id=btnEdit1'+r.lstUnit[int].unitId+' onclick="editUnit('+r.lstUnit[int].unitId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button disabled class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete '+r.lstUnit[int].unitId+' onclick=deleteUnit('+r.lstUnit[int].unitId+') > <i class="fa fa-trash-o"></i></button> </td>'
							+ '<input type="hidden" id="usId'+(r.lstUnit[int].unitId) +'" value='+ (r.lstUnit[int].stateId)+'>'
							+ '<input type="hidden" id="udId'+(r.lstUnit[int].unitId) +'" value='+ (r.lstUnit[int].districtId)+'>'
							+ '<input type="hidden" id="utId'+(r.lstUnit[int].unitId) +'" value='+ (r.lstUnit[int].typeId)+'>'
							+ '<input type="hidden" id="uhId'+(r.lstUnit[int].unitId) +'" value='+ (r.lstUnit[int].hospitalId)+'>'
							+ '<input type="hidden" id="uyId'+(r.lstUnit[int].unitId) +'" value='+ (r.lstUnit[int].yearId)+'>'
							+ '<input type="hidden" id="statusId'+(r.lstUnit[int].unitId) +'" value='+ (r.lstUnit[int].activeFlag)+'>'

							
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.lstUnit[int].unitId+">"+r.lstUnit[int].unitName+"</option>";
	}
	
	$("#masterModuleBody").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
		
}

/*******************************************************************************
 * @Author  kishor Lokhande
 * @date 22_May_2017 
 * @Code This method is used to getting count of unit master
 ******************************************************************************/
function getUnitCount()
{

	jQuery
			.ajax({
				async	: true,
				type	: "POST",
				url		: "ehat/unit/getUnitCount",
					
				success : function(r) {
					$("#unitCount").html(r);
				}
			});
	

}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Delete data from unit id 
 ******************************************************************************/

function deleteUnit(unitId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Charges Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/unit/deleteUnitMaster",
			data : {
				"unitId" : unitId
			},
			timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				refreshUnitMaster();
				//alert(response);
				getAllUnit();
			}
		});
	}
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code update master
 ******************************************************************************/


function editUnit(unitId){
	$('#unitId').val(unitId);
	$('#unitName').val($('#uName'+unitId).html());
	$('#unitCode').val($('#uCode'+unitId).html());
	$('#stateId').select2('val',$('#usId'+unitId).val());
	getAllDistrictBystateId();
	$('#distictId').select2('val',$('#udId'+unitId).val());
	$('#typeId').select2('val',$('#utId'+unitId).val());
	$('#hospitalId').select2('val',$('#uhId'+unitId).val());
	$('#yearId').select2('val',$('#uyId'+unitId).val());	
	var isActive = $('#statusId'+unitId).val();
	
	if(isActive=="Y"){ 
	    	
	    	$('#ncomb').prop('checked', false);
	    	$('#comb').prop('checked', true);	
	    }else{
	     	$('#comb').prop('checked', false);	
	    	$('#ncomb').prop('checked', true);
	    }
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function use to auto complete filds
 ******************************************************************************/


function setAutoCompleteForUnitMaster(inputId, callfrom) {

	//alert("hi");
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();

	
		var inputs = [];
		
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/unit/autoSuggestionUnitMasterNames",
			timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				 //alert(r.lstUnit[0].unitName);
				
				if(callfrom=="search"){
					setTemplateForUnit(r);
					autoCompTable(r, inputId);
					
				}else{
					autoCompTable(r, inputId);
				}
				
			}
		});
	}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to autocomplete box.
 ******************************************************************************/

function autoCompTable(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
	//alert("hi");
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
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
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [  {
					name : 'Unit Name',
					width : '100px',
					valueField : 'unitName'
				}, /*{
					name : 'unitCode',
					//width : '80px',
					valueField : 'unitCode'
				}*/],

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
					//	$('#results').text(ui.item ? 'Selected: ' + ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.depNm: 'Nothing selected, input was ' + this.value);
						//$('#' + id).val(ui.item.dn);
						//$('#userDocId').val(ui.item.ui);
						//$('#selectedObj').html(JSON.stringify(ui.item));
						$('#byName').val(ui.item.unitName);
					}
					/*
					 * This function use for Enter keypress search 
					 */
					setAutoCompleteForUnitMaster(id,'search');
					
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstUnit.length);
					var result;
					if (!data || data.lstUnit.length === 0 || !data.lstUnit
							|| data.lstUnit.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'unitName' : 'Record',
							'unitCode' : 'Found',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstUnit;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/*Touheed
12-June-2017 for master of Master search*/
function setUnitMaster(inputId) {

	var usertype = "";
	var letter="";
	letter=$("#byName").val();
	
	var findingName = $("#" + inputId).val();

	
		var inputs = [];
		
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/unit/autoSuggestionUnitMasterNames",
			timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				setTemplateForUnit(r);
				setTimeout(function(){userAccess();},100);
			}
		});
	}
/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	:  get getDistrictMasterBydistrictId Detail
 ************/
function getCountOfActiveUnit(){	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/unit/getCountOfActiveUnit",			
		success : function(r) {		
			$('#activeId').val(r);
		}		
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	:  get getDistrictMasterBydistrictId Detail
 ************/
function getAllUnitListMaster(){	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/unit/getAllUnitListMaster",			
		success : function(r) {		
			setAllUnitListMaster(r);
		}		
	});
}

function setAllUnitListMaster(r) {
	
	var list = "<option value='0'>-- Select --</option>";    
    for ( var i = 0; i < r.lstUnit.length; i++) {    

		list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
	}   
	$("#e1").html(list);
}
