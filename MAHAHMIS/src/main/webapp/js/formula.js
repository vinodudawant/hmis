//Irfan khan 7-12-2018 function to uppend operator and constants into input box
function appendIntoFormula(sym) {

	var txtFormula = $.trim($('#txtFormula').val());
	if(sym=="lab"){
		var testname = 	$("#testname").val();
		//alert(testname);
		if(testname!="0"){
			if($('#testid').html()!="null" ){
				testname =$('#testid').html() + "," + testname;
				$('#testid').html(testname);
				sym=$('#testname option:selected').html();
				$("#testname").select2('val',0);				
				}
			}else{
			sym="0";
		}

	}

	if( sym!=undefined){
		if(sym!="0" ){
			$('#txtFormula').val(txtFormula + sym);
			SetFocus("txtFormula");	
		}
	
	}
	

}

//Irfan khan 7-12-2018 function to save formula
function saveFormula(){
	
	//get values from jsp
	var formulaId = $("#formulaId").val();
	var formulaName = $("#formulaName").val();
	var formula = $("#txtFormula").val();
	var Units = $("#txtFormulaUnits").val();
	var testid = $("#testid").html();

	testid=    testid.substring(1, testid.length); 
	//validation
	if(formulaName == "" || formulaName == null || formulaName == undefined){
		alert("Enter Formula Name!!!");
		SetFocus("formulaName");
		return false;
	}
	if(formula == "" || formula == null || formula == undefined){
		alert("Enter Formula!!!");
		SetFocus("txtFormula");
		return false;
	}
	
	//uppend values into list
	var formulaMaster = {
			listFormula : []
		};
	formulaMaster.listFormula.push({
		formulaId:formulaId,
		formulaName : formulaName,
		formula:formula,
		formulaUnit : Units,
		formulatestid : testid
 	});
	
	//Stringify
	formulaMaster = JSON.stringify(formulaMaster);
	
	var inputs = [];

	//push the string to controller
	inputs.push("formulaMaster="+ encodeURIComponent(formulaMaster));

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/formula/saveFormula",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			resetFormulaMaster();
			//fetchGroupMasterList("save");
			//$("#callFrom").val("insert");
			//resetGroupMaster();
			//proFeesDoctorPayment();
			//getAutoCompleteForFormulaMaster("");
		}
	});
}

//Irfan khan 11-12-2018 function to delete formula
function deleteFormula(formulaId) {

	var r = confirm("Are You Sure You Want To Delete ?");
	if (r == true) {
		var inputs = [];

		// push the string to controller
		inputs.push("formulaId=" + formulaId);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/formula/deleteFormula",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				alert(r);
				resetFormulaMaster();
			}
		});
	}
}

//Irfan khan 11-12-2018 function to Edit formula
function editFormula(formulaId){
	//alert("hurreyyyy"+"===="+$("#listFormulaName"+formulaId).val()+"===="+$("#listFormula"+formulaId).val());
	$("#formulaId").val(formulaId);
	$("#formulaName").val($("#listFormulaName"+formulaId).text());
	$("#txtFormula").val($("#listFormula"+formulaId).text());
	$("#testid").html($("#listtestid"+ formulaId).val());
}
//Irfan khan 11-12-2018 function to Reset formula Master
function resetFormulaMaster(){
	getAutoCompleteForFormulaMaster("");
	//Set values on jsp
	$("#formulaId").val(0);
	$("#formulaName").val("");
	$("#txtFormula").val("");
	$("#byName").val("");
	$("#txtFormulaUnits").val("");
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 11_Dec_2018 
 * @Code This function use to auto complete filds and Search
 ******************************************************************************/
function getAutoCompleteForFormulaMaster(inputId,callfrom) {
	
	var letter="";
	if (callfrom =="search") {
		letter=$("#byName").val();
	}	
		var inputs = [];
		
		inputs.push('callfrom=' + callfrom);
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/formula/getAutoCompleteForFormulaMaster",
			cache : false,
			success : function(r) {
				
				if(callfrom=="search"){					
					setTemplateForFormula(r);
					autoCompTableForFormula(r, inputId);
					
				}else{
					setTemplateForFormula(r);
				}				
			}
		});
	}

function setTemplateForFormula(r){	
	
	var masterModuleBody= "";
	for ( var int = 0; int < r.listFormula.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.listFormula[int].formulaId) +'" class="col-md-1-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="listFormulaName'+(r.listFormula[int].formulaId) +'" class="col-md-2-1 ">'+ (r.listFormula[int].formulaName)+ ' </td>'
								+ '<td  id="listFormula'+(r.listFormula[int].formulaId) +'" class="col-md-3-1 ">'+ (r.listFormula[int].formula)+ ' </td>'
								+ '<td  id="listFormula'+(r.listFormula[int].formulaId) +'" class="col-md-2-1 ">'+ (r.listFormula[int].formulaUnit)+ ' </td>'
								+ '<td class="col-md-1-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit'+r.listFormula[int].formulaId+' onclick="editFormula('+r.listFormula[int].formulaId+')"><i class="fa fa-edit"></i></button></td>'
								+ '<td class="col-md-1-1 center"><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete10 '+r.listFormula[int].formulaId+' onclick=deleteFormula('+r.listFormula[int].formulaId+') > <i class="fa fa-trash-o"></i></button> '
								+ '<input type="hidden" id="listtestid'+(r.listFormula[int].formulaId) +'" value="'+ (r.listFormula[int].formulatestid)+'"></td>'
						+ '</tr>';		
	}
	
	$("#doctorMasteredit").html(masterModuleBody);
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 11_Dec_2018 
 * @Code This function is use to autocomplete box.
 ******************************************************************************/

function autoCompTableForFormula(response, id) {
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
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [  {
					name : 'Formula Name',
					width : '100px',
					valueField : 'formulaName'
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
						$('#byName').val(ui.item.formulaName);
					}
					/*
					 * This function use for Enter keypress search 
					 */
					getAutoCompleteForFormulaMaster(id,'search');
					
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					//console.log(data.listFormula.length);
					var result;
					if (!data || data.listFormula.length === 0 || !data.listFormula
							|| data.listFormula.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'formulaName' : 'Record Not Found',
							'Formula' : 'Found',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.listFormula;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}


//Irfan khan 11-12-2018 function to calculate formula
function calculateFormula(formulaId,treatmentId,patientId) {

	var inputs = [];

	// push the string to controller
	inputs.push("formulaId=" + formulaId);
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("patientId=" + patientId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/formula/calculateFormula",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			resetFormulaMaster();
		}
	});
}