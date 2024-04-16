
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:save doctor type master
 ***********/
function saveDoctorTypeMaster() {

	var doctypeId = $("#dcTypeId").val();
	var doctypeName = $("#doctorType").val();
	
	
	if(doctypeName=="" || doctypeName==null || doctypeName==undefined){
		alert("Please Enter Doctor Type!!");	// check doctor type is empty.
		return false;	
	}
	var inputs = [];
	// inputs.push('action=showDiagnosisHisab');
	inputs.push('doctypeId=' + doctypeId);
	inputs.push('doctypeName=' + doctypeName);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctorType/saveDoctorTypeMaster",
	
		success : function(r) {
			alert(r);
			 getDcTypeMasterList();
			refreshDoctortypMaster();
				
		}
	});
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:fetch doctor type master list
 ***********/
function getDcTypeMasterList() {

 jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctorType/getchDoctypeMasterList",
	
		success : function(r) {

			docttypeMasterTemplate(r);
			
			
			
		}
	});
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:template for edit, delect doctor type master list
 ***********/
function docttypeMasterTemplate(response) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.lstDocTyp.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
				+ response.lstDocTyp[i].doctypeId
				+ "</td>"
				+ "<td class='col-sm-1-1 center' id='dcName"
				+ response.lstDocTyp[i].doctypeId
				+ "' style='height: 21.5px;'>"
				+ response.lstDocTyp[i].doctypeName
				+ "</td>"
			 
				+"<td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editChargesMaster' onclick='editdoctypmaster("
				+ response.lstDocTyp[i].doctypeId
				+ ")' ><i class='fa fa-edit'></i></button></td>"
				+ "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMaster' onclick='deletedoctypMaster("
				+ response.lstDocTyp[i].doctypeId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		index++;

	}

	$("#doctorMasteredit").html(htm);

}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:edit doctor type master list
 ***********/
function editdoctypmaster(dcId) {
	
	$('#doctorType').val($('#dcName' + dcId).html());
	$('#dcTypeId').val(dcId);
	/*var a =$('#dcTypeId').val();
	alert("ne id="+a);*/
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:delete doctor type master list
 ***********/
function deletedoctypMaster(dcId) {

//	alert(dcId);
	var r = confirm("Are You Sure You Want To Delete DoctorType Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/doctorType/deleteDoctypMaster",
			data : {
				"doctypeId" : dcId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
		
			success : function(response) {
			
				getDcTypeMasterList();
			}

		});
	}
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:refresh doctor type master list
 ***********/
function refreshDoctortypMaster(){
	
	
	$('#doctorType').val("");
	$('#dcTypeId').val("");
	$('#autoDTM').val("");

	
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion,search doctor type master list
 ***********/
function setAutoCompleteForDoctorName(inputId, callfrom) {

	var findingName = $("#" + inputId).val();
	//alert(findingName);
	var inputs = [];
	inputs.push('findingName=' + findingName);
	var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctorType/autosuggDTM",
			timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
		//	alert(r.lstDocTyp.length);
			
				if(r.lstDocTyp.length==0){
					if(callfrom=="Serchdoc"){   //search from search button 
						var dctypname=	$('#autoDTM').val();
						if(dctypname=="" || dctypname==null || dctypname==undefined){
							alert("Please Enter Doctor Type!!");	// check doctor type is empty.
							return false;	
						}
					/*	alert("Record Not Found!");
						$('#autoDTM').val("");
                    	getDcTypeMasterList();  //show doctor type list
						return false;	*/
						
					}
					getDcTypeMasterList();  //show doctor type list
					return false;	
				}	

				docttypeMasterTemplate(r);  //set doctor type list to template.
				autoCompTable(r, inputId);  //set list to doctyp search field.
				
				
			}
		});	
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion
 ***********/
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
				columns : [ /*{
					name : 'chargesId',
					width : '100px',
					valueField : 'chargesId'
				},*/ {
					name : 'doctypeName',
					width : '90px',
					valueField : 'doctypeName'
				}/*, {
					name : 'doctypeId',
				//	width : '90px',
					valueField : 'doctypeId'
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
						$('#autoDTM').val(ui.item.doctypeName);
					}
					
					setAutoCompleteForDoctorName(id,'Serchdoc');
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstDocTyp.length);
					var result;
					if (!data || data.lstDocTyp.length === 0 || !data.lstDocTyp
							|| data.lstDocTyp.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'doctypeName' : 'Record',
							'doctypeId' : 'Found',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstDocTyp;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/**
 * ***/

function ViewlabtestList(fetchType, type) {
	 count = 1;
	var byName = $("#byName").val();
	if (byName == "" && (fetchType == "search" || fetchType == "searchlabTest")) {
		alert("Please Enter Test Name");
		return false;
	}
	if (byName == " " || byName == null) {

		alert("Please Enter Valid Test Name");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchlabTest');
	inputs.push('fetchType=' + 'onloadfromula');
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {

			ajaxResponse = r;
		
			var doctorBean = eval('(' + ajaxResponse + ')');
			$("#testvalues").html(r);
 			$("#testname").setTemplate(docNameTemplateForOPD); 						
			$("#testname").processTemplate(doctorBean);
			$("#testname").select2();
			//Added By kishor 
			
 		}
	});
}
var docNameTemplateForOPD = "<option value='0'>-select-</option>{#foreach $T.tli as tli}	{#if $T.tli.vt == 'i'}<option     value='{$T.tli.tid}'>{$T.tli.tnm}</option>{#/if}{#/for}";

