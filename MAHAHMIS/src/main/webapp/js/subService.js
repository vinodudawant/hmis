/**
 /* @Bilal 26_May_2017
 *********************For charges master**/

/*******************************************************************************
 * @Bilal
 * @date 26_May_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/

function refreshSubService() {

	$('#subId').val("");
	$('#categoryName').val("");
	$('#codeName').val("");
	$('#charges').val("");
	$('#b2bcharges').val("0");
	
	var masterid = $("#li0").val();
	removeInpuntFild2(0,masterid,'dynamicItem');
	
	$("#ChargesIdHidden").val("");
	$('input[name="catType"][value="Y"]').prop('checked', false);
	$('input[name="catType"][value="N"]').prop('checked', false);
	$("#cgscode").val("");
	fetchSubServiceList();
}

/*******************************************************************************
 * @Author Bilal
 * @Date 29_May_2017
 * @Code For hide and show when is category is N it will show other fields else
 *       hide
 ******************************************************************************/
/*$(document).on('change', 'input[name="privilegesType"]', function() {
	var value = $(this).val();
	if (value == "Y") {

		$('#roleTableDiv').hide();
		$('#isModify').hide();

	} else {

		$('#roleTableDiv').show();
		$('#isModify').show();

	}
});*/
/*******************************************************************************
 * @Bilal
 * @date 26_May_2017 this method is used to save or update the fields
 ******************************************************************************/

function saveSubService() {

	var subId = $("#subId").val();

	var categoryName = $("#categoryName").val();
	var codeName = $("#codeName").val();
	var isCategory = $("input:radio[name='privilegesType']:checked").val();	
	var serviceId = $("#li0").val();// masterid

	var selfId = 0;// self id
	var liSize = $("#dynamicItem li").length;
	var charges = $("#charges").val();
	var isModify = $("input:radio[name='privilegesModify']:checked").val();
	var cgscode  =$("#cgscode").val();
	var b2bcharges  =$("#b2bcharges").val();
	if (isCategory == "N") {
		if (charges == "" || charges == "undefined" || charges == null) {

			$("#charges").focus();
			return false;
		}
	}
	if (liSize == 1) {
		fetchSubServiceById(serviceId, selfId);
	} else {

		selfId = $("#li" + (liSize - 1)).val();
		fetchSubServiceById(serviceId, selfId);
	}

	if (subId == "" || subId == null || subId == undefined) {
		subId = 0;
	}

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

		alert("Please Select Atleast One Service and Sub Service! ");
		SetFocus('dynamicItem');
		return false;

	}
	if (serviceId == "" || serviceId == null || serviceId == undefined || isNaN(serviceId)) {
		serviceId = 0;
	}
	
	if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
		charges = 0;
	}
	
	var hospitalUnitId=$('#hInfoUnitId').val();
	
 	if (hospitalUnitId == "" || hospitalUnitId == null || hospitalUnitId == undefined || hospitalUnitId == '0') {
		alert("Please Select Select Unit First! ");
		return false;
	} 
	
	var subservicelist = {
			lstSubService : []
	};
	subservicelist.lstSubService.push({
		subId        : subId,
		categoryName : categoryName,
		codeName     : codeName,
		isCategory   : isCategory,
		serviceId    : serviceId,
		selfId       : selfId,
		charges      : charges,
		isModify	 : isModify,
		cgscode      : cgscode,
		b2bCharges   : b2bcharges
	});
	
	subservicelist     = JSON.stringify(subservicelist);
	
	var inputs = [];

	//inputs.push('subId=' + subId);
	//inputs.push('categoryName=' +  encodeURIComponent(categoryName));
	//inputs.push('codeName=' + encodeURIComponent(codeName));
	//inputs.push('isCategory=' + isCategory);
	//inputs.push('byName2=' + byName2);
	//inputs.push('serviceId=' + masterid);
	//inputs.push('selfId=' + selfId);
	inputs.push('subservicelist=' +  encodeURIComponent(subservicelist));
	
	inputs.push('hospitalUnitId=' +  encodeURIComponent(hospitalUnitId));
	
	if (isCategory == "N") {
		//inputs.push('charges=' + charges);
		//inputs.push('isModify=' + isModify);
	}

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/saveSubService",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			refreshSubService();

		}
	});
}

/*******************************************************************************
 * @Bilal
 * @date 26_May_2017 this method is used to get records in input when we click
 *       on edit button
 ******************************************************************************/
function updateSubService(subId) {

	$('#categoryName').val($('#chName' + subId).html());
	$('#codeName').val($('#coName' + subId).html());
	$('#cgscode').val($('#cgscode' + subId).val());
	$('#charges').val($('#charges' + subId).val());
	$('#b2bcharges').val($('#b2bcharges' + subId).val());
	
	$('#hInfoUnitId').select2('val',$('#hospitalUnitId'+subId).val()); 
	//$('#hInfoUnitId').select2('disable');
	
		
	/* $('#listmstr_select').val($('#mslist'+serviceId).html());  */
	$('#subId').val(subId); // set sub id for update charges isMod

	var cat = $('#isCat' + subId).val();
	if (cat == "Y") {
		$('input[name="privilegesType"][value="Y"]').prop('checked', true);
		$('input[name="privilegesType"][value="N"]').prop('checked', false);
	} else {
		$('input[name="privilegesType"][value="Y"]').prop('checked', false);
		$('input[name="privilegesType"][value="N"]').prop('checked', true);
		$('#charges').val($('#chargess' + subId).html());
	}

	var modify = $('#isMod' + subId).val();
	if (modify == "Y") {
		$('input[name="privilegesModify"][value="Y"]').prop('checked', true);
		$('input[name="privilegesModify"][value="N"]').prop('checked', false);
	} else {
		$('input[name="privilegesModify"][value="Y"]').prop('checked', false);
		$('input[name="privilegesModify"][value="N"]').prop('checked', true);
		// $('#isModify').show();

		/*$('#isModify').css("display", "block");
		$('#roleTableDiv').css("display", "block");*/
		/*$('#charges').val($('#charges' + subId).html());*/
		
	}
}

/*******************************************************************************
 * @Bilal
 * @date 26_May_2017 this method is used to fetch records on browser from data
 *       base
 ******************************************************************************/
function fetchSubServiceList() {
//var hospitalUnitId=$('#hInfoUnitId').val();
	
	var inputs = [];
//	inputs.push('hospitalUnitId=' +  encodeURIComponent(hospitalUnitId));
	var str = inputs.join('&');

jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/SubServiceList",

		error : function() {
			alert('error');
		},
		success : function(response) {
			SubServiceTemplate(response);
		}
	});
}

/*******************************************************************************
 * @author Bilal
 * @date 26_May_2017 For Service master template
 ******************************************************************************/
function SubServiceTemplate(response) {

	var htm = "";
	var htm= '<thead id="ehatTHead">'
		+'<tr>'
		+ '<th class="col-md-1 center">#</th>'
		+ '<th class="col-md-1 center">Unit Name</th>'
		+ '<th class="col-md-1 center">Sub Service Name</th>'
		+ '<th class="col-md-1 center">Sub Service Code Name</th>'
		+ '<th class="col-md-1 center">Charges</th>'
		+ '<th class="col-md-1 center">Is Category</th>'
		+ '<th class="col-md-1 center">Edit</th>'
		+ '<th class="col-md-1 center">Delete</th>'
		+ '</tr></thead>';
	var index = 1;

	for ( var i = 0; i < response.lstSubService.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				
				+ "</td><td class='col-sm-1-1 center' id='hInfoUnitId"
				+ response.lstSubService[i].subId
				+ "' style='height: 21.5px;'>"			
				+ response.lstSubService[i].unitName	
				+ "<input type='hidden' id='hospitalUnitId"+response.lstSubService[i].subId+"' value='"+response.lstSubService[i].hospitalUnitId+"'></td>" +
				"<td class='col-sm-1-1 center' id='chName"
				+ response.lstSubService[i].subId
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].categoryName
				+ "</td><td class='col-sm-1-1 center' id='coName"
				+ response.lstSubService[i].subId
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].codeName
				+ "</td><td class='col-sm-1-1 center' id='chargess"
				+ response.lstSubService[i].subId
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].charges
				+ "</td><td class='col-sm-1-1 center' id='isCategory"
				+ response.lstSubService[i].subId
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].isCategory
				+ "</td><td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editUserAccess editSubService' onclick='updateSubService("
				+ response.lstSubService[i].subId
				+ "),fetchSuperCatogoires("
				+ response.lstSubService[i].subId
				+ ")'><i class='fa fa-edit'></i></button></td>"
				+ "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess deleteSubService' onclick='deleteSubService("
				+ response.lstSubService[i].subId
				+ ")' ><i class='fa fa-trash-o'></i></button></td>"
				+ "<input type='hidden' id='isCat"
				+ response.lstSubService[i].subId + "' value='"
				+ response.lstSubService[i].isCategory + "'>"
				+ "<input type='hidden' id='isMod"
				+ response.lstSubService[i].subId + "' value='"
				+ response.lstSubService[i].isModify + "'>" 
				+ "<input type='hidden' id='cgscode"
				+ response.lstSubService[i].subId + "' value='"
				+ response.lstSubService[i].cgscode + "'>"		
				+ "<input type='hidden' id='b2bcharges"
				+ response.lstSubService[i].subId + "' value='"
				+ response.lstSubService[i].b2bCharges + "'>"		
				+"</tr>";
		index++;

	}

	$("#subServiceBody").html(htm);
	$("#ehatTable").html(htm);

}

/*******************************************************************************
 * @Bilal
 * @date 26_May_2017 this method is used to delete the records with id
 ******************************************************************************/
function deleteSubService(subId) {

	var r = confirm("Are You Sure You Want To Delete Sub Service?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subservice/deleteSubService",
			data : {
				"subId" : parseInt(subId)
			},
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshSubService();
				// alert(response);
				fetchSubServiceList();
			}

		});
	}
}
/*******************************************************************************
 * @author Bilal
 * @date 26_May_2017
 * @code for fetching all Service
 ******************************************************************************/
function fetchAllService() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		// chargesMasterList
		success : function(response) {
			
			multiSelect2(response);
			//refreshSubService();//added after remove  function
		}
	});

}

/*******************************************************************************
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : for Fetching id of Service name
 ******************************************************************************/

function selectSubService() {
	// selectserviceName
	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	// var subId = 2; , subId
	fetchSubServiceById(masterId, selfId);
}

/******************************************************************************* 
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : Fetching list of Sub Service by id
 ******************************************************************************/
function fetchSubServiceById(masterId, selfId) {

	
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			
			var isCategories = $("input:radio[name='catType']:checked").val();
			
			if (isCategories == "Y") {
				fetchSubServiceIsCatY(masterId, selfId);
				
			} else if (isCategories == "N") {
				
				fetchSubServiceIsCatN(masterId, selfId);
			}
			
			multiSelectSlave2(response);
			// SubServiceTemplate(response);
		}
	});
}

/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/


// multiselect ui
function multiSelect2(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}

// Touheed for multiselect Data
function setDyanamicDiv2(setDiv, getDiv) {
	// listmstr_select

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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild2('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		fetchAllService();// for masters
	} else {
		var masterid = $("#li" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	}// now inside submaster catagories

}

function removeInpuntFild2(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		fetchAllService();
	} else {
		var masterid = $("#li" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	}
}

// fo slave demo
// multiselect ui
function multiSelectSlave2(response) {

	var list = "<option value='0' ></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}
/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/

/*******************************************************************************
 * @author Touheed
 * @base Fetching super master of service based on there id
 * @since 1st-June-2017
 ******************************************************************************/
function fetchSuperCatogoires(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForList2('dynamicItem', response);
		}
	});
}

// Touheed for multiselect
/*******************************************************************************
 * @author Touheed
 * @base Setting fectched Response of fetchSuperCatogoires
 * @since 1st-June-2017
 ******************************************************************************/
function setDyanamicDivForList2(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count = i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItme'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild2('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="li' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}
	$('#' + setDiv).html(htm);
}

/*******************************************************************************
 * @Bilal
 * @date 07_Jun_2017 this method is used to fetch all records on browser from
 *       data base whose category is y
 ******************************************************************************/
function fetchSubServiceListCatY() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subservice/SubServiceListCatY",

		error : function() {
			alert('error');
		},
		success : function(response) {
			SubServiceTemplate(response);
		}
	});
}

/*******************************************************************************
 * @author : Bilal
 * @date : 8_JUN_2017
 * @reason : This method is used to access all categories whose flag is N under
 *         list
 ******************************************************************************/
function fetchSubServiceIsCatN(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCat",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {

			SubServiceTemplate(response);

		}
	});
}
/*******************************************************************************
 * @author Bilal
 * @date 08_JUN_2017 fetch list based on category
 */
function fetchSSList() {
	
	var isCategories = $("input:radio[name='catType']:checked").val();
	if(isCategories == "N"){
		fetchSubServiceAllListWithN();
	}else{
		fetchSubServiceListCatY();
	}
		var masterid = $("#li0").val();// masterid

		var selfId = 0;// self id
		var liSize = $("#dynamicItem li").length;
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {

			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
	
	

	// fetchSubServiceIsCatN(masterid, selfId); 

}
/*******************************************************************************
 * @author : Bilal
 * @date : 8_JUN_2017
 * @reason : Fetching list of Sub Service by id fetchSubServiceIsCat y
 ******************************************************************************/
function fetchSubServiceIsCatY(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCatY",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {

			SubServiceTemplate(response);

		}
	});
}

/*******************************************************************************
 * @Bilal
 * @date 07_Jun_2017 this method is used to fetch all records on browser from
 *       data base whose category is y
 ******************************************************************************/
function fetchSubServiceAllListWithN() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subservice/SubServiceListCatN",

		error : function() {
			alert('error');
		},
		success : function(response) {
			SubServiceTemplate(response);
		}
	});
}
/**
 * @author Bilal
 * @date 7_JUN_2017 code: for tool tip
 */
function handleHomePageTooltips() {

	// Default tooltip (Top)
	$('.tip-focus').tooltip({
		trigger : 'focus'
	});
}

/**
 * @author Bilal
 * @date 5_JULY_2017 
 * @code: for search autosuggetion 
 */
function setSubServiceMaster(inputId) {
	
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
		url : "ehat/subservice/getAutoSuggestionSubServiceMaster",
		
		success : function(r) {
			
			SubServiceTemplate(r);
			setTimeout(function(){userAccess();},100);
			
		}
	});
} 
/**@author Bilal
 * @date 06-july-2017
 * @code for count on subservice***/
function getSubServiceCount()
{

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/subservice/getSubServiceCount",

		    	success : function(r) {
		    		$("#subCount").html(r);
				//alert(r);
					//setTemplateForUnit(r);//call template
				}
			});
}

