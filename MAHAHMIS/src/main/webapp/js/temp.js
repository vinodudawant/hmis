/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to Insert data in the temps.
 ******************************************************************************/

function insertMaster() {

	var tempId = $('#tempMasterId').val();
	if (tempId == "" || tempId == null) {
		saveTemp();
	} else {
		updateMaster(tempId);
	}
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to Refresh the temps.
 ******************************************************************************/
function refreshTempMaster() {
	$('#tempMasterId').val("");
	$('#tempName').val("");
	$('#tempCode').val("");
	//window.location.href = "temp.jsp";
	getAllTemp();
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to save the temps.
 ******************************************************************************/

function saveTemp() {
	var tempId= $('#tempId').val();
	var tempName = $('#tempName').val();
	var tempCode = $('#tempCode').val();
	var servId = $( "#uId option:selected" ).val();
	
	
	if(tempName=="" || tempName=="undefined" || tempName==null){
		
		$("#tempName").focus();					
		return false;
	}
	if(tempCode=="" || tempCode=="undefined" || tempCode==null){
		
		$("#tempCode").focus();	
		return false;
	}	

	if(tempId == "" || tempId == null || tempId == undefined){
		tempId = 0;
	}
	var inputs = [];	
	inputs.push('tempName=' + tempName);
	inputs.push('tempCode=' + tempCode);
	inputs.push('tempId=' + tempId);
	inputs.push('servId=' + servId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/temp/save",
		data	: str + "&reqType=AJAX",
	//	timeout : 1000 * 60 * 5,
	//	cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
		//	alert(r);
			//getAlltemp();
			refreshTempMaster();
			getTempCount();
			
		}
		
	});	

}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Updating master
 ******************************************************************************/

function updateTempMaster(tempId) {

	alert(tempId);
	$('#tempName').val($('#tempName' + tempId).html());
	$('#tempCode').val($('#tempCode' + tempId).html());
	$('#tempId').val(tempId);
	// editChargesMaster(chargesId);

}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getAllTemp() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/temp/fetchTempList",

				success : function(r) {
					setTemplateForTemp(r);//call template
				}
			});
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForTemp(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">CGHS ID</th>'
						+ '<th class="col-md-1 center">CGHS Name</th>'
						+ '<th class="col-md-1 center">CGHS Code</th>'
						+ '<th class="col-md-1 center">Service Id</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.listTemp.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.listTemp[int].tempId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="tId'+(r.listTemp[int].tempId) +'" class="col-md-1 center">'+ (r.listTemp[int].tempId)+ '</td>'
								+ '<td id="tName'+(r.listTemp[int].tempId) +'" class="col-md-1 center">'+ (r.listTemp[int].tempName)+ ' </td>'
								+ '<td  id="tCode'+(r.listTemp[int].tempId) +'" class="col-md-1 center">'+ (r.listTemp[int].tempCode)+ ' </td>'
								+ '<td  id="sId'+(r.listTemp[int].tempId) +'" class="col-md-1 center">'+ (r.listTemp[int].servId)+ ' </td>'

								/*+ '<td class="col-md-1 center"><div> <input class=btn btn-xs btn-success style=font-size: 10px; type=button value=Edit onclick=edittemp('+ r.listtemp[int].tempId+ ')/></div> </td>'
								+ '<td class="col-md-1 center"><div> <input style=font-size: 10px; type=button value=Delete onclick=deletetemp('+ r.listtemp[int].tempId + ')/></div> </td>'
								*/
								/*+ '<td class="col-md-1 center"><td class= col-md-1> <button id=btnEdit '
								+r.listtemp[int].tempId+' onclick=edittemp() value=EDIT> <i class="fa fa-save"></i> Edit</button> </td> '*/
							+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit1'+r.listTemp[int].tempId+' onclick="editTemp('+r.listTemp[int].tempId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete '+r.listTemp[int].tempId+' onclick=deleteTemp('+r.listTemp[int].tempId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.listTemp[int].tempId+">"+r.listTemp[int].tempName+"</option>";
	}
	
	$("#masterModuleBody").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
		
}

/*******************************************************************************
 * @Author  kishor Lokhande
 * @date 22_May_2017 
 * @Code This method is used to getting count of temp master
 ******************************************************************************/
function getTempCount()
{

	jQuery
			.ajax({
				async	: true,
				type	: "POST",
				url		: "ehat/temp/getTempCount",
					
				success : function(r) {
					$("#tempCount").html(r);
				}
			});
	

}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Delete data from temp id 
 ******************************************************************************/

function deleteTemp(tempId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Temp Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/temp/deletetempMaster",
			data : {
				"tempId" : tempId
			},
			//timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				refreshTempMaster();
				//alert(response);
				getAllTemp();
			}
		});
	}
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code update master
 ******************************************************************************/


function editTemp(tempId){
	$('#tempId').val(tempId);
	$('#tempName').val($('#tName'+tempId).html());
	$('#tempCode').val($('#tCode'+tempId).html());
	//$('#uId').val($('#sId'+tempId).html());
	var a=parseInt($('#sId'+tempId).text());
	
	 $('#uId').val(a).text();
	
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function use to auto complete filds
 ******************************************************************************/


function setAutoCompleteForTempMaster(inputId, callfrom) {

	//alert(callfrom);
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
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/temp/autoSuggestionTempMasterNames",
			//timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				 //alert(r.listTemp[0].TempName);
				
				if(callfrom=="search"){
					
					setTemplateForTemp(r);
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
					name : 'Temp Name',
					width : '100px',
					valueField : 'tempName'
				}, /*{
					name : 'TempCode',
					//width : '80px',
					valueField : 'TempCode'
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
						$('#byName').val(ui.item.tempName);
					}
					/*
					 * This function use for Enter keypress search 
					 */
					setAutoCompleteForTempMaster(id,'search');
					
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.listTemp.length);
					var result;
					if (!data || data.listTemp.length === 0 || !data.listTemp
							|| data.listTemp.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'tempName' : 'Record',
							'tempCode' : 'Found',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.listTemp;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/*Touheed
12-June-2017 for master of Master search*/
function setTempMaster(inputId) {

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
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/temp/autoSuggestionTempMasterNames",
			//timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				setTemplateForTemp(r);
			}
		});
	}



//@author : kishr Lokhande @date: 15-June-2017 @reason : Function for use to get all services
function getServicesInTemp() {

	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/serv/fetchServiceList",
		success : function(r) {
			setTempAllService(r);
		}
	});
}

//@author : kishr Lokhande @date: 15-June-2017 @reason : Template use to get all services
function setTempAllService(r) {

	var list = "<option value='0'>select</option>";    
	for ( var i = 0; i < r.listService.length; i++) {

		list = list + "<option value='"+r.listService[i].serviceId+"'>" + ((r.listService[i].serviceName)) + "</option>";    
		}   
	$("#uId").html(list);   
	

	}

