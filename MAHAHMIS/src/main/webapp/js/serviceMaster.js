//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Service List onload
function getAllServices() {

	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/serv/fetchServiceList2",
		success : function(r) {
			setTempAllService2(r);
		}
	});
}

/*@author : Irfan Khan @date: 17-May-2017 
 @reason : To Save and Update Services*/
function saveService() {
	
	
	var sId = $("#serviceId").val();
	var sName = $("#serviceName").val();
	var sCode = $("#serviceCode").val();

	if (sId == "" || sId == null || sId == undefined) {
		sId=0;
	}
	
	if(sName=="" || sName=="undefined" || sName==null){
		
		$("#serviceName").focus();					
		return false;
	}
	if(sCode=="" || sCode=="undefined" || sCode==null){
		
		$("#serviceCode").focus();	
		return false;
	}
	
	
	if($("input[type='radio'].iscomb").is(':checked')) {
		
		iscombination = $("input[type='radio'].iscomb:checked").val();  
		}

	var inputs = [];
	inputs.push('serviceId=' + sId);
	inputs.push('serviceName=' + sName);
	inputs.push('serviceCode=' + sCode);
	inputs.push('iscombination=' + iscombination);
 	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/serv/save",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alertify.success(r);
			//alert(r);
			resetServiceMaster();
			getServiceCount();
		}
	});
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Template use to set onload all services
function setTempAllService2(r) {

	var htm = '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Service Id</th>'
						+ '<th class="col-md-1 center">Service Name</th>'
						+ '<th class="col-md-1 center">Service Code</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	
	for ( var i = 0; i < r.listService.length; i++) {
		var str=r.listService[i].iscombination; //added by sagar...
 		htm = htm
				+ '<tr>'
				+ '<td class="col-md-1-1 center">'
				+ (i + 1)
				+ '</td>'
				+ '<td class="col-md-1-1 center" id="servId'
				+ r.listService[i].serviceId
				+ '">'
				+ (r.listService[i].serviceId)
				+ '</td>'
				+ '<td class="col-md-4-1 center" id="servName'
				+ r.listService[i].serviceId
				+ '">'
				+ (r.listService[i].serviceName)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" id="servCode'
				+ r.listService[i].serviceId
				+ '">'
				+ (r.listService[i].serviceCode)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" style="height: 21.5px;" >'
				+ '<button disabled class="btn btn-xs btn-success editUserAccess" onclick=editServiceMaster('
				+ r.listService[i].serviceId + ',"'+str+'") ><i class="fa fa-edit"></i></button>'
				+ '</td>'
				+ '<td class="col-md-2-1 center" >'
				+'<button disabled class="btn btn-xs btn-success deleteUserAccess" onclick="deleteServiceMaster('
				+ r.listService[i].serviceId
				+ ')" ><i class="fa fa-trash-o"></i></button>'				
				+ '</td>' + '</tr>';
	}
	$("#masterServiceBody").html(htm);
	$("#ehatTable").html(htm);
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Edit and Set data in fields
function editServiceMaster(serviceId,iscomb) {
 	$('#serviceName').val($('#servName' + serviceId).html());
	$('#serviceCode').val($('#servCode' + serviceId).html());
	$('#serviceId').val(serviceId);
//added by sagar...	
if(iscomb=="Y"){ 
    	
    	$('#ncomb').prop('checked', false);
    	$('#comb').prop('checked', true);	
    }else{
     	$('#comb').prop('checked', false);	
    	$('#ncomb').prop('checked', true);
    }
}

//@author : Irfan Khan @date: 17-May-2017 @reason : To Reset all fields
function resetServiceMaster() {
	$("#serviceId").val(0);
	$("#serviceName").val("");
	$("#serviceCode").val("");
		
	$('#ncomb').prop('checked',true);
	$('#comb').prop('checked',false);
	getAllServices();
}

//@author : Irfan Khan @date: 17-May-2017 @reason : To Delete Services By serviceId
function deleteServiceMaster(serviceId) {
	var r = confirm("Are You Sure You Want To Delete Service?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/serv/deleteServiceMaster",
			data : {
				"serviceId" : serviceId
			},
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(response) {
				alertify.error(response);
			//	alert(response);
				resetServiceMaster();
				getServiceCount();
			}

		});
	}
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search function
function setAutoCompleteForServiceMaster(inputId, callfrom) {

	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}

	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/serv/autoSuggestionServiceMasterNames",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			setTempAllService(r);
			autoCompTable(r, inputId);
		}
	});
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search function
function autoCompTable(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
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

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to
				// the
				// autocomplete widget.
				showHeader : true,
				columns : [ /*
							 * { name : 'chargesId', width : '100px', valueField :
							 * 'chargesId' },
							 */{
					name : 'serviceName',
					width : '100px',
					valueField : 'serviceName'
				}/*, {
					name : 'serviceCode',
					width : '68px',
					valueField : 'serviceCode'
				}*/ ],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					// console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != '!!!!') {
						// $('#results').text(ui.item ? 'Selected: ' +
						// ui.item.dn + ', '+ spl + ', '+
						// ui.item.specialisationName + ', ' +
						// ui.item.depNm: 'Nothing selected, input was '
						// + this.value);
						// $('#' + id).val(ui.item.dn);
						// $('#userDocId').val(ui.item.ui);
						// $('#selectedObj').html(JSON.stringify(ui.item));
						$('#byName').val(ui.item.serviceName);
					}
					setAutoCompleteForServiceMaster(id, 'auto');
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.listService.length);
					var result;
					if (!data || data.listService.length === 0
							|| !data.listService
							|| data.listService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'serviceName' : 'Record',
							'serviceCode' : 'Found',
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.listService;// Response List for
						// All
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
 * @Code This method is used to getting count of Service master
 ******************************************************************************/
function getServiceCount()
{

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/serv/getServiceCount",

		    	success : function(r) {
		    		$("#servCount").html(r);
				//alert(r);
					//setTemplateForUnit(r);//call template
				}
			});
	

}

//@author : Touheed Khan @date: 12-June-2017 @reason : Autosuggestion and search function
function setServiceMaster(inputId) {

	var letter = "";
		letter = $("#byName").val();

	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/serv/autoSuggestionServiceMasterNames",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			setTempAllService2(r);
			setTimeout(function(){userAccess();},300);
		}
	});
}


/*-----------------------Req General Form---------------------*/

function saveReq() {
	
	
	var reqId = $("#reqId").val();
	var reqName = $("#reqName").val();
	var reqCode = $("#reqCode").val();

	if (reqId == "" || reqId == null || reqId == undefined) {
		reqId=0;
	}
	
	if(reqName=="" || reqName=="undefined" || reqName==null){
		
		$("#reqName").focus();					
		return false;
	}
	if(reqCode=="" || reqCode=="undefined" || reqCode==null){
		
		$("#reqCode").focus();	
		return false;
	}
	
	
	/*if($("input[type='radio'].iscomb").is(':checked')) {
		
		iscombination = $("input[type='radio'].iscomb:checked").val();  
		}*/

	var inputs = [];
	inputs.push('reqId=' + reqId);
	inputs.push('reqName=' + reqName);
	inputs.push('reqCode=' + reqCode);
	/*inputs.push('iscombination=' + iscombination);*/
 	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/serv/saveReq",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alertify.success(r);
			alert(r);
			getAllReq("onload");
			resetReqMaster();
			getReqCount();
		}
	});
}



function getAllReq(callFrom) {

	//alert("hollaa!!"+callFrom);
	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/serv/fetchReqList",
		success : function(r) {
			if(callFrom == "onload"){
				setTempAllReq(r);
			}else if(callFrom == "reg"){
				//alert(r.listReq.length);
				$("#reqGenFormId").setTemplate(setReqGenFormTemp);
				$("#reqGenFormId").processTemplate(r);
			}
			
		}
	});
}

var setReqGenFormTemp = "<option value='0'>-SELECT-</option>{#foreach $T.listReq as listReq"
	+ "}<option value='{$T.listReq.reqId}'>{$T.listReq.reqName}</option>{#/for}";

//@author : Kishor Lokhande @date: 12-Sept-2017 @reason : Template use to set onload all services
function setTempAllReq(r) {

	//alert(r.listReq.length);
	var htm = '';/*'<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Req Id</th>'
						+ '<th class="col-md-1 center">Req Name</th>'
						+ '<th class="col-md-1 center">Req Code</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';*/
	
	for ( var i = 0; i < r.listReq.length; i++) {
		//var str=r.listReq[i].iscombination; //added by sagar...
 		htm = htm
				+ '<tr>'
				+ '<td class="col-md-1-1 center">'
				+ (i + 1)
				+ '</td>'
				+ '<td class="col-md-1-1 center" id="reqId'
				+ r.listReq[i].reqId
				+ '">'
				+ (r.listReq[i].reqId)
				+ '</td>'
				+ '<td class="col-md-4-1 center" id="reqName'
				+ r.listReq[i].reqId
				+ '">'
				+ (r.listReq[i].reqName)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" id="reqCode'
				+ r.listReq[i].reqId
				+ '">'
				+ (r.listReq[i].reqCode)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" style="height: 21.5px;" >'
				+ '<button class="btn btn-xs btn-success " onclick="editReqMaster('
				+ r.listReq[i].reqId + ')" ><i class="fa fa-edit"></i></button>'
				+ '</td>'
				+ '<td class="col-md-2-1 center" >'
				+'<button class="btn btn-xs btn-success " onclick="deleteReqMaster('
				+ r.listReq[i].reqId
				+ ')" ><i class="fa fa-trash-o"></i></button>'				
				+ '</td>' + '</tr>';
	}
	$("#masterReqBody").html(htm);
	$("#ehatTable").html(htm);
}


function resetReqMaster() {
	$("#reqId").val(0);
	$("#reqName").val("");
	$("#reqCode").val("");
	$("#byName").val();

	getAllReq();
}


//@author : Kishor Lokhande @date: 12-Sept-2017 @reason : Edit and Set data in fields
function editReqMaster(reqId) {
	
 	$('#reqName').val($('#reqName' + reqId).html());
	$('#reqCode').val($('#reqCode' + reqId).html());
	$('#reqId').val(reqId);

}


//@author :  Kishor Lokhande @date: 12-Sept-2017 @reason : To Delete Services By serviceId
function deleteReqMaster(reqId) {
	var r = confirm("Are You Sure You Want To Delete Service?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/serv/deleteReqMaster",
			data : {
				"reqId" : reqId
			},
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(response) {
				//alertify.error(response);
				alert(response);
				resetReqMaster();
				//getServiceCount();
			}

		});
	}
}



//@author : Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search function
function setAutoCompleteForReqMaster(inputId, callfrom) {

	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}

	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/serv/autoSuggestionReqMasterNames",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			setTempAllReq(r);
			autoCompTableReq(r, inputId);
		}
	});
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search function
function autoCompTableReq(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
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

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to
				// the
				// autocomplete widget.
				showHeader : true,
				columns : [ /*
							 * { name : 'chargesId', width : '100px', valueField :
							 * 'chargesId' },
							 */{
					name : 'reqName',
					width : '100px',
					
					valueField : 'reqName'
				}, {
					name : 'reqCode',
					width : '68px',
					valueField : 'reqCode'
				} ],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					// console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != '!!!!') {
						// $('#results').text(ui.item ? 'Selected: ' +
						// ui.item.dn + ', '+ spl + ', '+
						// ui.item.specialisationName + ', ' +
						// ui.item.depNm: 'Nothing selected, input was '
						// + this.value);
						// $('#' + id).val(ui.item.dn);
						// $('#userDocId').val(ui.item.ui);
						// $('#selectedObj').html(JSON.stringify(ui.item));
						$('#byName').val(ui.item.reqName);
						$('#byName').val(ui.item.reqCode);
						
					}
					setAutoCompleteForReqMaster(id, 'auto');
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.listReq.length);
					var result;
					if (!data || data.listReq.length === 0
							|| !data.listReq
							|| data.listReq.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'reqName' : 'Record',
							'reqCode' : 'Found',
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.listReq;// Response List for
						// All
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
 * @Code This method is used to getting count of Service master
 ******************************************************************************/
function getreqCount()
{

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/serv/getreqCount",

		    	success : function(r) {
		    		$("#ReqCount").html(r);
				//alert(r);
					//setTemplateForUnit(r);//call template
				}
			});
	

}