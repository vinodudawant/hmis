/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to Insert data in the temps.
 ******************************************************************************/

function saveNarrationMaster() {

	var narrId = $('#narrMasterId').val();
	if (narrId == "" || narrId == null) {
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
function refreshNarrMaster() {
	$('#narrMasterId').val("");	
	$('#narrId').val("");
	$('#narrName').val("");
	$('#narrCode').val("");
	//window.location.href = "narrationTemp.jsp";
	//getAllTemp();
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This function is use to save the temps.
 ******************************************************************************/

function saveTemp() {
	var narrId= $('#narrId').val();
	var narrName = $('#narrName').val();
	var narrCode = $('#narrCode').val();
	//var servId = $( "#uId option:selected" ).val();
	
	
	if(narrName=="" || narrName=="undefined" || narrName==null){		
		$("#narrName").focus();					
		return false;
	}
	if(narrCode=="" || narrCode=="undefined" || narrCode==null){		
		$("#narrCode").focus();	
		return false;
	}	

	if(narrId == "" || narrId == null || narrId == undefined){
		narrId = 0;
	}
	var inputs = [];	
	inputs.push('narrName=' + narrName);
	inputs.push('narrCode=' + narrCode);
	inputs.push('narrId=' + narrId);
	//inputs.push('servId=' + servId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/narration/save",
		data	: str + "&reqType=AJAX",
	//	timeout : 1000 * 60 * 5,
	//	cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
		//	alert(r);
			getAllNarrations();
			refreshNarrMaster();
			//getTempCount();			
		}		
	});	
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getAllNarrations() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/narration/fetchNarrList",

				success : function(r) {
					setTemplateForNarration(r);//call template
				}
			});
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForNarration(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Narration ID</th>'
						+ '<th class="col-md-1 center">Narration Name</th>'
						+ '<th class="col-md-1 center">Narration Code</th>'
						
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.listNarr.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.listNarr[int].narrId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="nId'+(r.listNarr[int].narrId) +'" class="col-md-1 center">'+ (r.listNarr[int].narrId)+ '</td>'
								+ '<td id="nName'+(r.listNarr[int].narrId) +'" class="col-md-1 center">'+ (r.listNarr[int].narrName)+ ' </td>'
								+ '<td  id="nCode'+(r.listNarr[int].narrId) +'" class="col-md-1 center">'+ (r.listNarr[int].narrCode)+ ' </td>'

								+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'+r.listNarr[int].narrId+' onclick="editNarrations('+r.listNarr[int].narrId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete10 '+r.listNarr[int].narrId+' onclick=deleteNarrations('+r.listNarr[int].narrId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.listNarr[int].narrId+">"+r.listNarr[int].narrName+"</option>";
	}
	
	$("#masterModuleBodyNarr").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code update master
	 ******************************************************************************/


	function editNarrations(narrId){
		$('#narrId').val(narrId);		
		$('#narrName').val($('#nName' + narrId).html());
		$('#narrCode').val($('#nCode' + narrId).html());
		
		
	}	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code Delete data from temp id 
	 ******************************************************************************/

	function deleteNarrations(narrId) {
		// deleteModule()
		var r = confirm("Are You Sure You Want To Delete Temp Master?");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/narration/deleteNarrMaster",
				data : {
					"narrId" : narrId
				},
				//timeout	: 1000 * 60 * 5,
				cache	: false,
				error	: function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					//refreshTempMaster();
					//alert(response);
					getAllNarrations();
				}
			});
		}
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This function use to auto complete filds
	 ******************************************************************************/


	function setAutoCompleteForNarrationMaster(inputId, callfrom) {

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
				url : "ehat/narration/autoSuggestionNarrationMasterNames",
				//timeout : 1000 * 60 * 15,
				cache : false,
				success : function(r) {
					 //alert(r.listTemp[0].TempName);
					
					if(callfrom=="search"){
						
						setTemplateForNarration(r);
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
						name : 'Narration Name',
						width : '100px',
						valueField : 'narrName'
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
							$('#byName').val(ui.item.narrName);
						}
						/*
						 * This function use for Enter keypress search 
						 */
						setAutoCompleteForNarrationMaster(id,'search');
						
						return false;
					},

					// The rest of the options are for configuring the ajax
					// webservice call.
					minLength : 1,
					source : function(request, response) {
						var data = myArray;
						console.log(data);
						console.log(data.listNarr.length);
						var result;
						if (!data || data.listNarr.length === 0 || !data.listNarr
								|| data.listNarr.length === 0) {
							/*
							 * result = [{ label: 'No match found.' }];
							 */
							result = [ {
								/*'dn' : 'No',*/
								'narrName' : 'Record',
								'narrCode' : 'Found',
								/*'depNm' : 'Match'*/
							} ];
						} else {
							result = data.listNarr;// Response List for All
														// Services
						}
						response(result);
						$('#ui-id-1').css("z-index", "10000000000");
					}
				});
	}
	
	/*******************************************************************************
	 * @Author  kishor Lokhande
	 * @date 22_May_2017 
	 * @Code This method is used to getting count of temp master
	 ******************************************************************************/
	function getNarrationCount()
	{

		jQuery
				.ajax({
					async	: true,
					type	: "POST",
					url		: "ehat/narration/getNarrationCount",
						
					success : function(r) {
						$("#tempCount").html(r);
					}
				});
		

	}
