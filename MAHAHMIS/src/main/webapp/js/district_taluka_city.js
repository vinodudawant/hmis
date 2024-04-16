/******************************State Masters(4 Feb-2016)*************************/

var addStateTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div><h3 id = 'title' >Add State Details:</h3></div>"
		+ "<div class='divide-20'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>State ID</label>"
		+ "<input id='stateid' name='tid' type='text' placeholder='State ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.state_id}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>State Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='statename' name='tname' type='text' placeholder='State Name' onkeypress='return validatealphabetic(event)'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
		+ "<input type='hidden' id='queryType' value='insert'>"
		+ "</div></div>";

function setAddStateTemp(type) {
	var StateType = $("#StateType").val();
	var inputs = [];
	inputs.push('action=fetchStateID');
	inputs.push('StateType=' + encodeURIComponent(StateType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			if (type == "StateGroup") {
				$("#SpecialStateContent").setTemplate(addStateTemp);
			}
			$("#SpecialStateContent").processTemplate(pobj1);
			
		}
	});
}

var defaultStateViewTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>State ID</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>State Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.stateList as stateList}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.stateList.state_id}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.stateList.state_name}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editState({$T.stateList.state_id})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteState({$T.stateList.state_id})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";


function defaultViewState(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter State Name !");
			setFocus("#byName");
		}
	}
	var StateType = $("#StateType").val();
	var inputs = [];
	inputs.push('action=fetchState');
	
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {

			var ajaxResponse = res;
			// alert(res);
			$("#StateDetails").html(ajaxResponse);
			var DisObj = eval('(' + ajaxResponse + ')');
			if (StateType == "StateGroup") {
				$("#StateContent").setTemplate(defaultStateViewTemp);
			}
			$("#StateContent").processTemplate(DisObj);
			setTimeout(function(){userAccess();},300);
		}
	});
}


function saveStateMaster() {
	var StateType = $("#StateType").val();
	var queryType = $("#queryType").val();
	var statename = $("#statename").val();
	statename = $.trim(statename);
	var stateid = $("#stateid").val();
	if (statename == null || statename == "") {
		if (StateType == "StateGroup") {
			alert("Please enter State Name.");
			return false;
		} else {
			alert("Please enter State Name.");
			$("#statename").val("");
			return false;
		}

	}
	var inputs = [];
	inputs.push('action=UpdateState');
	inputs.push('StateType=' + encodeURIComponent(StateType));
	inputs.push('stateid=' + stateid);
	inputs.push('statename=' + encodeURIComponent(statename));
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);

			defaultViewState();

			setAddStateTemp("StateGroup");

		}
	});
}


function editState(StateId) {
	var myObj1;
	var type = $("#StateType").val();
	var ajaxResponse = $("#StateDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.stateList.length; i++) {

		if (myArray.stateList[i].state_id == StateId) {
			myObj1 = myArray.stateList[i];
			break;
		}
	}
	if (type == "StateGroup") {
		$("#title").html("Edit State Details:");
		$("#stateid").val(myObj1.state_id);
		$("#statename").val(myObj1.state_name);
		$("#queryType").val("update");
	}
}


function deleteState(StateId) {

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
		

		// alert(DistrictId);

		var inputs = [];
		inputs.push('action=deleteState');
		inputs.push("stateid=" + StateId);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				// location.reload();
				defaultViewState("StateGroup");
				NewStateMaster("StateGroup");
				//location.reload();
			}
		});

	}
}

function NewStateMaster() {
	setAddStateTemp("StateGroup");
}


function searchState(address_name) {
	count = 1;
	var StateType = $("#StateType").val();
	// alert(DistrictType);
	var strValue = $("#byName").val();
	if (strValue == "") {
		if (StateType == "StateGroup") {
			alert("Please Enter State Name First.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchState');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('StateType=' + encodeURIComponent(StateType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.stateList.length == 0) {
				if (StateType == "StateGroup") {
					alert("State Masters are Not Found");
					$("#byName").val("");
				}
				$("#byName").val();

			} else {
				(StateType == "StateGroup")
				$("#StateContent").setTemplate(defaultStateViewTemp);
			}
			$("#byName").val("");
			$("#StateContent").processTemplate(pobj1);
			userAccess();
		}
	});
}

function setAutoStateName(inputID, onload, callFrom) {
	// alert("HHHHI");
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "StateDatabase") {
		auto = 'StateName';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					ajaxResponse = decodeURIComponent(r);
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					// alert(availableTags);
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {// alert(template);
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		$("#byName").val((item.text).trim());
	}
}

/*********************************End*********************************/


/******************************District Masters(4 Feb-2016)*************************/
var addDistrictTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div><h3 id = 'title' >Add District Details:</h3></div>"
		+ "<div class='divide-20'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>District ID</label>"
		+ "<input id='disid' name='tid' type='text' placeholder='District ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.district_id}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
        + "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='State Name'>State Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' name='statename' id='statename' >"
		+ "</select></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>District Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='disname' name='tname' type='text' placeholder='District Name' onkeypress='return validatealphabetic(event)'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
		+ "<input type='hidden' id='queryType' value='insert'>"
		+ "</div></div>";

function setAddDistrictTemp(type) {

	var DistrictType = $("#DistrictType").val();
	var inputs = [];
	inputs.push('action=fetchDistrictID');
	inputs.push('DistrictType=' + encodeURIComponent(DistrictType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			if (type == "DistrictGroup") {
				$("#SpecialDistrictContent").setTemplate(addDistrictTemp);
			}
			$("#SpecialDistrictContent").processTemplate(pobj1);
			
		}
	});
}

var defaultDistrictViewTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>District ID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>State Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>District Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.districtList as dl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dl.district_id}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dl.state_name}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dl.district_name}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editDistrict({$T.dl.district_id})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteDistrict({$T.dl.district_id})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewDistrict(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter District Name !");
			setFocus("#byName");
		}
	}
	var DistrictType = $("#DistrictType").val();
	var inputs = [];
	inputs.push('action=fetchDistrict');
	inputs.push('DistrictType=' + encodeURIComponent(DistrictType));
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {

			var ajaxResponse = res;
			// alert(res);
			$("#DistrictDetails").html(ajaxResponse);
			var DisObj = eval('(' + ajaxResponse + ')');
			if (DistrictType == "DistrictGroup") {
				$("#DistrictContent").setTemplate(defaultDistrictViewTemp);
			}
			$("#DistrictContent").processTemplate(DisObj);
		}
	});
}

function saveDistrictMaster() {
	var DistrictType = $("#DistrictType").val();
	var queryType = $("#queryType").val();
	var disname = $("#disname").val();
	disname = $.trim(disname);
	var disid = $("#disid").val();
	
	
	var statename = $.trim($('#statename').val());

    if (statename == "0") {
		alert("Please Select State...");
		return false;
	}
	
	if (disname == "") {
		alert("Please Enter District name...");
		return false;
	}
	var inputs = [];
	inputs.push('action=UpdateDistrict');
	inputs.push('DistrictType=' + encodeURIComponent(DistrictType));
	inputs.push('disid=' + disid);
	inputs.push('statename=' + encodeURIComponent(statename));
	inputs.push('disname=' + encodeURIComponent(disname));
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);

			defaultViewDistrict();
			fetchStateList('DistrictGroup');
			setAddDistrictTemp("DistrictGroup");
		

		}
	});
}

var StateListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.stateList as stateList"
	+ "}<option value='{$T.stateList.state_id}'>{$T.stateList.state_name}</option>{#/for}";

function fetchStateList(StateType) {
	var inputs = [];
	inputs.push('action=fetchStateList');
	
	inputs.push('StateType=' + encodeURIComponent(StateType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			
			 $("#state").html(ajaxResponse);
			
			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#statename").setTemplate(StateListTemp);
				$("#statename").processTemplate(obj);

				$("#conAdd5").setTemplate(StateListTemp);
				$("#conAdd5").processTemplate(obj);

				$("#perAdd5").setTemplate(StateListTemp);
				$("#perAdd5").processTemplate(obj);

			}, 5);
			setTimeout(function(){userAccess();},300);
		}
	});
}

/** *****************Edit District***************************** */
function editDistrict(DistrictId) {
	var myObj1;
	var type = $("#DistrictType").val();
	var ajaxResponse = $("#DistrictDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.districtList.length; i++) {

		if (myArray.districtList[i].district_id == DistrictId) {
			myObj1 = myArray.districtList[i];
			break;
		}
	}
	if (type == "DistrictGroup") {
		$("#title").html("Edit District Details:");
		$("#disid").val(myObj1.district_id);
		$("#disname").val(myObj1.district_name);
		$("#statename").val(myObj1.state_id);
		$("#queryType").val("update");
	}
}

/** *****************Delete District***************************** */
function deleteDistrict(DistrictId) {

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
		var DistrictType = $("#DistrictType").val();

		// alert(DistrictId);

		var inputs = [];
		inputs.push('action=deleteDistrict');
		inputs.push("disid=" + DistrictId);
		inputs.push('DistrictType=' + encodeURIComponent(DistrictType));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				// location.reload();
				defaultViewDistrict("DistrictGroup");
				NewDistrictMaster("DistrictGroup");
			}
		});

	}
}

/** ********************District(For Search)********************* */
function searchDistrict(address_name) {
	count = 1;
	var DistrictType = $("#DistrictType").val();
	// alert(DistrictType);
	var strValue = $("#byName").val();
	if (strValue == "") {
		if (DistrictType == "DistrictGroup") {
			alert("Please Enter District Name First.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchDistrict');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('DistrictType=' + encodeURIComponent(DistrictType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.districtList.length == 0) {
				if (DistrictType == "DistrictGroup") {
					alert("District Name are Not Found");
					$("#byName").val("");
				}
				$("#byName").val();

			} else {
				(DistrictType == "DistrictGroup")
				$("#DistrictContent").setTemplate(defaultDistrictViewTemp);
			}
			$("#byName").val("");
			$("#DistrictContent").processTemplate(pobj1);
			userAccess();
		}
	});
}

function NewDistrictMaster() {
	setAddDistrictTemp("DistrictGroup");
	fetchStateList("DistrictGroup");
}

function setAutoDistrictName(inputID, onload, callFrom) {
	// alert("HHHHI");
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "DistrictDatabase") {
		auto = 'DistrictName';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					ajaxResponse = decodeURIComponent(r);
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					// alert(availableTags);
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {// alert(template);
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		$("#byName").val((item.text).trim());
	}
}

/**
 * ******************************************************District Masters
 * Complete***********************************
 */

/**
 * *****************Taluka
 * Masters(29-Jan-2016)**********************************
 */
var addTalukaTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id = 'title'>Add Taluka Details:</h3></div>"
		+ "<div class='divide-20'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Taluka ID'>Taluka ID</label>"
		+ "<input id='talukaid' name='tid' type='text' placeholder='Taluka ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.taluka_id}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='District Name'>District Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' name='disname' id='disname' >"
		+ "</select></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Taluka Name'>Taluka Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='talukaname' name='tname' type='text' placeholder='Taluka Name' onkeypress='return validatealphabetic(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		+ "<input type='hidden' id='queryType' value='insert'>"
		+ "</div></div>";


var selectTalukaTemp = "<option value='0'>-SELECT-</option>{#foreach $T.talukaList as dl"
	+ "}<option value='{$T.dl.taluka_id}'>{$T.dl.taluka_name}</option>{#/for}";

function setAddTalukaTemp(type) {

	var TalukaType = $("#TalukaType").val();
	var inputs = [];
	inputs.push('action=fetchTalukaID');
	inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if (type == "TalukaGroup") {
				$("#SpecialTalukaContent").setTemplate(addTalukaTemp);
			}
			$("#SpecialTalukaContent").processTemplate(pobj1);
		}
	});
}

function defaultViewTaluka(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Taluka Name !");
			setFocus("#byName");
		}
	}
	var TalukaType = $("#TalukaType").val();
	var inputs = [];
	inputs.push('action=fetchTaluka');
	inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {

			var ajaxResponse = res;
			// alert(res);
			$("#TalukaDetails").html(ajaxResponse);
			var DisObj = eval('(' + ajaxResponse + ')');
			if (TalukaType == "TalukaGroup") {
				$("#TalukaContent").setTemplate(defaultTalukaViewTemp);
			}
			$("#TalukaContent").processTemplate(DisObj);
			
			if(search == "cityform"){
				$("#talname").setTemplate(selectTalukaTemp);
				$("#talname").processTemplate(DisObj);
			}
			
		}
	});
}

var defaultTalukaViewTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Taluka ID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>District Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Taluka Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.talukaList as tal}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.tal.taluka_id}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.tal.district_name}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.tal.taluka_name}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editTaluka({$T.tal.taluka_id})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteTaluka({$T.tal.taluka_id})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function saveTalukaMaster() {
	var TalukaType = $("#TalukaType").val();
	var queryType = $("#queryType").val();

	var talukaid = $("#talukaid").val();

	var disname = $.trim($('#disname').val());
	if (disname == "") {
		alert("Please add District...");
		return false;
	}
	if (disname == "0") {
		alert("Please Select District...");
		return false;
	}

	var talukaname = $.trim($("#talukaname").val());
	if (talukaname == "") {
		alert("Please Enter Taluka name...");
		return false;
	}

	var inputs = [];
	inputs.push('action=UpdateTaluka');
	inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
	inputs.push('talukaid=' + talukaid);
	inputs.push('disname=' + encodeURIComponent(disname));
	inputs.push('talukaname=' + encodeURIComponent(talukaname));
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);
			//defaultViewDistrict();
			setAddTalukaTemp("TalukaGroup");
			fetchDistrictList('TalukaGroup');
			defaultViewTaluka('TalukaGroup');
		}
	});
}

var DistrictListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.districtList as districtList"
		+ "}<option value='{$T.districtList.district_id}'>{$T.districtList.district_name}</option>{#/for}";
function fetchDistrictList(DistrictType) {
	
	
	var inputs = [];
	inputs.push('action=fetchDistrictList');
	
	inputs.push('TalukaType=' + encodeURIComponent(DistrictType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			
			 $("#district").html(ajaxResponse);
			 
			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#disname").setTemplate(DistrictListTemp);
				$("#disname").processTemplate(obj);

				$("#perAdd4").setTemplate(DistrictListTemp);
				$("#perAdd4").processTemplate(obj);

				$("#conAdd4").setTemplate(DistrictListTemp);
				$("#conAdd4").processTemplate(obj);

			}, 5);
			setTimeout(function(){userAccess();},300);
		}
	});
}

function NewTalukaMaster() {
	fetchDistrictList('TalukaGroup');
	setAddTalukaTemp("TalukaGroup");
}

function editTaluka(TalukaId) {
	var myObj1;
	var type = $("#TalukaType").val();
	var ajaxResponse = $("#TalukaDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.talukaList.length; i++) {

		if (myArray.talukaList[i].taluka_id == TalukaId) {
			myObj1 = myArray.talukaList[i];
			break;
		}
	}
	if (type == "TalukaGroup") {
		$("#title").html("Edit Taluka Details:");
		$("#talukaid").val(myObj1.taluka_id);
		$("#talukaname").val(myObj1.taluka_name);
		$("#disname").val(myObj1.district_id);
		$("#queryType").val("update");
	}
}

function deleteTaluka(TalukaId) {

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
		var TalukaType = $("#TalukaType").val();

		//alert(TalukaId);

		var inputs = [];
		inputs.push('action=deleteTaluka');
		inputs.push("talukaid=" + TalukaId);
		inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				// location.reload();
				defaultViewTaluka("TalukaGroup");
				NewTalukaMaster("TalukaGroup");
			}
		});

	}
}


/** ********************Taluka(For Search)********************* */
function searchTaluka(address_name) {
	count = 1;
	var TalukaType = $("#TalukaType").val();
	// alert(DistrictType);
	var strValue = $("#byName").val();
	if (strValue == "") {
		if (TalukaType == "TalukaGroup") {
			alert("Please Enter Taluka Name First.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchTaluka');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.talukaList.length == 0) {
				if (TalukaType == "TalukaGroup") {
					alert("Taluka Masters are Not Found");
					$("#byName").val("");
				}
				$("#byName").val();

			} else {
				(TalukaType == "Talukaroup")
				$("#TalukaContent").setTemplate(defaultTalukaViewTemp);
			}
			$("#byName").val("");
			$("#TalukaContent").processTemplate(pobj1);
			userAccess();
		}
	});
}


function setAutoTalukaName(inputID, onload, callFrom) {
	// alert("HHHHI");
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "TalukaDatabase") {
		auto = 'TalukaName';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					
					$("#" + inputID ).html(template);
					$("#" + inputID ).show();
					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 00);
				}
			});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
		$("#txtDoctorId").val((item.value).trim());
  }
}



/**************************************City Master************************/

function saveCityMaster() {
	var CityType = $("#CityType").val();
	var queryType = $("#queryType").val();
    var cityid = $("#cityid").val();
    var talukaName = $.trim($('#talukaname').val());
    var CityName = $.trim($("#cityname").val());
	
    if (talukaName == "0") {
		alert("Please Select Taluka...");
		return false;
	}
	

	if (CityName == "") {
		alert("Please Enter City name...");
		return false;
	}

	var inputs = [];
	inputs.push('action=UpdateCity');
	inputs.push('CityType=' + encodeURIComponent(CityType));
	inputs.push('cityid=' + cityid);
	inputs.push('talukaName=' + encodeURIComponent(talukaName));
	inputs.push('CityName=' + encodeURIComponent(CityName));
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);
			defaultViewDistrict();
			fetchTalukaList("CityGroup");
			setAddCityTemp("CityGroup");
            defaultViewCity('CityGroup');
		}
	});
}



var addCityTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
	+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Town Details:</h3></div>"
	+ "<div class='divide-20'></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1' for='City ID'>City ID</label>"
	+ "<input id='cityid' name='tid' type='text' placeholder='City ID' style='background-color: #ddd;'"
	+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.city_id}'/></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1' for='Taluka Name'>Taluka Name<b style='color: red; padding-left: 3px;'>*</b></label>"
	+ "<select class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' name='talukaname' id='talukaname' >"
	+ "</select></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1' for='City Name'>City Name<b style='color: red; padding-left: 3px;'>*</b></label>"
	+ "<input id='cityname' name='cname' type='text' placeholder='City Name' onkeypress='return validatealphabetic(event)' "
	+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

	+ "<div class='form-group Remove-Padding col-md-7-1' style='padding-left: 50px;margin-top:20px;'>"
	/*+ "<div class='divide-20'></div>"
	+ "<button class='btn btn-xs btn-primary' type='button' onclick='saveCityMaster()'>Save</button>"
	+ "<button style = 'margin-left:50px;' class='btn btn-xs btn-default' type='button' onclick='NewTalukaMaster()'>Cancel</button>"*/
	+ "<input type='hidden' id='queryType' value='insert'>"
	+ "</div></div>";

function setAddCityTemp(type) {

	
	var inputs = [];
	inputs.push('action=fetchCityID');
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			 //alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#SpecialCityContent").setTemplate(addCityTemp);
			
			$("#SpecialCityContent").processTemplate(pobj1);
			
		}
	});
}


var TalukaListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.talukaList as talukaList"
		+ "}<option value='{$T.talukaList.taluka_id}'>{$T.talukaList.taluka_name}</option>{#/for}";

function fetchTalukaList(TalukaType) {
	var inputs = [];
	inputs.push('action=fetchTalukaList');
	inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			
			 $("#taluka").html(ajaxResponse);
			 
			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				// alert(r);
				$("#talukaname").setTemplate(TalukaListTemp);
				$("#talukaname").processTemplate(obj);

				$("#perAdd8").setTemplate(TalukaListTemp);
				$("#perAdd8").processTemplate(obj);
				
				$("#conAdd10").setTemplate(TalukaListTemp);
				$("#conAdd10").processTemplate(obj);

			}, 5);

		}
	});
}

var defaultCityViewTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>City ID</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Taluka Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>City Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.cityList as city}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.city.city_id}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.city.taluka_name}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.city.city_name}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editCity({$T.city.city_id})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteCity({$T.city.city_id})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewCity(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter City Name !");
			setFocus("#byName");
		}
	}
	
	var inputs = [];
	inputs.push('action=fetchCity');
	
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {

			var ajaxResponse = res;
			// alert(res);
			$("#CityDetails").html(ajaxResponse);
			var DisObj = eval('(' + ajaxResponse + ')');
		
				$("#CityContent").setTemplate(defaultCityViewTemp);
			
			$("#CityContent").processTemplate(DisObj);
			
			setTimeout(function(){userAccess();},200);
			
		}
	});
}


function editCity(CityId) {
	var myObj1="";
	var type = $("#CityType").val();
	var ajaxResponse = $("#CityDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.cityList.length; i++) {

		if (myArray.cityList[i].city_id == CityId) {
			myObj1 = myArray.cityList[i];
             break;
		}
	}
	
	$("#title").html("Edit Town Details:");
	$("#cityid").val(myObj1.city_id);
	$("#cityname").val(myObj1.city_name);
	$("#talukaname").val(myObj1.taluka_id);

	$("#queryType").val("update");

	//fetchTalukaList('CityGroup');
		/*$("#SpecialCityContent").setTemplate(editTalukaTemp);
		fetchTalukaList('CityGroup');
		$("#SpecialCityContent").processTemplate(myObj1);*/

	
}


function deleteCity(CityId) {

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
        var inputs = [];
		inputs.push('action=deleteCity');
		inputs.push("cityid=" + CityId);
		
		//alert(CityId);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				// location.reload();
				defaultViewCity("CityGroup");
				NewCityMaster("CityGroup");
			}
		});

	}
}


/** ********************City(For Search)********************* */
function searchCity(address_name) {
	count = 1;
	var CityType = $("#CityType").val();
	
	var strValue = $("#byName").val();
	if (strValue == "") {
		if (CityType == "CityGroup") {
			alert("Please Enter Town Name First.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchCity');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('CityType=' + encodeURIComponent(CityType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.cityList.length == 0) {
				if (CityType == "CityGroup") {
					alert("Town Name are Not Found");
					$("#byName").val("");
				}
				$("#byName").val();

			} else {
				(CityType == "CityGroup")
				$("#CityContent").setTemplate(defaultCityViewTemp);
			}
			$("#byName").val("");
			$("#CityContent").processTemplate(pobj1);
			userAccess();
		}
	});
}



function setAutoPageName(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	var auto = '';
	if (callFrom == "CityDatabase") {
		auto = 'CityName';
	}
	else if (callFrom == "ReasonOfVisitDatabase"){
		auto = 'ReasonOfVisit'
	}
	
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					
					$("#" + inputID ).html(template);
					$("#" + inputID ).show();
					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 00);
				}
			});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
		$("#txtDoctorId").val((item.value).trim());
  }
}

function NewCityMaster() {
	fetchTalukaList("CityGroup");
	setAddCityTemp("CityGroup");
}


var CityListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.cityList as cityList"
	+ "}<option value='{$T.cityList.city_id}'>{$T.cityList.city_name}</option>{#/for}";

function fetchCityList(CityType) {
	var inputs = [];
	inputs.push('action=fetchCityList');
	// inputs.push('CityType=' + encodeURIComponent(CityType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;

			$("#city").html(ajaxResponse);

			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				// alert(r);

				$("#perAdd3").setTemplate(CityListTemp);
				$("#perAdd3").processTemplate(obj);

				$("#conAdd3").setTemplate(CityListTemp);
				$("#conAdd3").processTemplate(obj);

			}, 5);

		}
	});
}

/*****************New(4 Feb 2016) *****************/
function setTalukaAndDistrictAndStateForRegistration(TownId,callfrom) {

	//alert(callfrom);
	if(callfrom=='local'){
		
		ajaxResponse = $("#city").html();

		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.cityList.length; i++) {
			if (json.cityList[i].city_id == TownId) {
				$('#conAdd10').val(json.cityList[i].taluka_id);

				var talukaId = $("#conAdd10").val();

				ajaxResponse = $("#taluka").html();
				json1 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json1.talukaList.length; i++) {
					if (json1.talukaList[i].taluka_id == talukaId) {
						$('#conAdd4').val(json1.talukaList[i].district_id);

						var districtId = $("#conAdd4").val();

						//alert(districtId);
						ajaxResponse = $("#district").html();
						json2 = JSON.parse(ajaxResponse);

						for ( var i = 0; i < json2.districtList.length; i++) {
							if (json2.districtList[i].district_id == districtId) {
								$('#conAdd5').val(json2.districtList[i].state_id);
								break;
							}
						}
						break;
					}
				}
				break;
			}

		}
		
	}
	else {
		ajaxResponse = $("#city").html();

		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.cityList.length; i++) {
			if (json.cityList[i].city_id == TownId) {
				$('#perAdd8').val(json.cityList[i].taluka_id);

				var talukaId = $("#perAdd8").val();

				ajaxResponse = $("#taluka").html();
				json1 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json1.talukaList.length; i++) {
					if (json1.talukaList[i].taluka_id == talukaId) {
						$('#perAdd4').val(json1.talukaList[i].district_id);

						var districtId = $("#perAdd4").val();

						//alert(districtId);
						ajaxResponse = $("#district").html();
						json2 = JSON.parse(ajaxResponse);

						for ( var i = 0; i < json2.districtList.length; i++) {
							if (json2.districtList[i].district_id == districtId) {
								$('#perAdd5').val(json2.districtList[i].state_id);
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
	}
}

function setCityAndDistrictAndStateForRegistration(TalukaId,callfrom) {
	if(callfrom=='local'){
		ajaxResponse = $("#taluka").html();
		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.talukaList.length; i++) {
			if (json.talukaList[i].taluka_id == TalukaId) {

				$('#conAdd4').val(json.talukaList[i].district_id);

				var districtId = $("#conAdd4").val();

				// alert(districtId);
				ajaxResponse = $("#district").html();
				json2 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json2.districtList.length; i++) {
					if (json2.districtList[i].district_id == districtId) {
						$('#conAdd5').val(json2.districtList[i].state_id);
						break;
					}
				}
				break;
			}
		}
		cityObjects = {

			cityList : []

		}
		ajaxResponse = $("#city").html();

		json1 = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.cityList.length; i++) {
			if (json1.cityList[i].taluka_id == TalukaId) {
				cityObjects.cityList.push(json1.cityList[i]);
			}
		}
		$("#conAdd3").setTemplate(CityListTemp);
		$("#conAdd3").processTemplate(cityObjects);
}
	
	else{
		ajaxResponse = $("#taluka").html();
		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.talukaList.length; i++) {
			if (json.talukaList[i].taluka_id == TalukaId) {

				$('#perAdd4').val(json.talukaList[i].district_id);

				var districtId = $("#perAdd4").val();

				// alert(districtId);
				ajaxResponse = $("#district").html();
				json2 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json2.districtList.length; i++) {
					if (json2.districtList[i].district_id == districtId) {
						$('#perAdd5').val(json2.districtList[i].state_id);
						break;
					}
				}
				break;
			}
		}
		cityObjects = {

			cityList : []

		}
		ajaxResponse = $("#city").html();

		json1 = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.cityList.length; i++) {
			if (json1.cityList[i].taluka_id == TalukaId) {
				cityObjects.cityList.push(json1.cityList[i]);
			}
		}
		$("#perAdd3").setTemplate(CityListTemp);
		$("#perAdd3").processTemplate(cityObjects);

	}
	
}



function setTalukaAndCityAndStateForRegistration(DistrictId,callfrom) {
	
	if(callfrom=="local"){
		ajaxResponse = $("#district").html();
		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.districtList.length; i++) {
			if (json.districtList[i].district_id == DistrictId) {
				$('#conAdd5').val(json.districtList[i].state_id);
				break;
			}
		}
		
		talukaObjects = {
				talukaList : []
				
		}
		
		ajaxResponse = $("#taluka").html();

		json1 = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.talukaList.length; i++) {
			if (json1.talukaList[i].district_id == DistrictId) {
				talukaObjects.talukaList.push(json1.talukaList[i]);
			}
		}
		$("#conAdd10").setTemplate(TalukaListTemp);
		$("#conAdd10").processTemplate(talukaObjects);

		$("#conAdd3").setTemplate(CityListTemp);
		$("#conAdd3").processTemplate(talukaObjects);
	}
	else{
		ajaxResponse = $("#district").html();
		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.districtList.length; i++) {
			if (json.districtList[i].district_id == DistrictId) {
				$('#perAdd5').val(json.districtList[i].state_id);
				break;
			}
		}
		
		talukaObjects = {
				talukaList : []
				
		}
		
		ajaxResponse = $("#taluka").html();

		json1 = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.talukaList.length; i++) {
			if (json1.talukaList[i].district_id == DistrictId) {
				talukaObjects.talukaList.push(json1.talukaList[i]);
			}
		}
		$("#perAdd8").setTemplate(TalukaListTemp);
		$("#perAdd8").processTemplate(talukaObjects);

		$("#perAdd3").setTemplate(CityListTemp);
		$("#perAdd3").processTemplate(talukaObjects);
	}
	
}

		
		
function setTalukaAndCityAndDistrictForRegistration(StateId,callfrom) {
	
	if(callfrom=="local"){

		var stateObjects = {
			districtList : []
		};
		var OBJ = $("#district").html();

	    //alert(OBJ);
		json = JSON.parse(OBJ);
		//json = eval('(' + ajaxResponse + ')');
		//alert(json);
		
		for ( var i = 0; i < json.districtList.length; i++) {

			//alert(json.districtList[i].state_id);
			
			if (json.districtList[i].state_id == StateId) {
				stateObjects.districtList.push(json.districtList[i]);
			}
		}

		$("#conAdd4").setTemplate(DistrictListTemp);
		$("#conAdd4").processTemplate(stateObjects);
		
		$("#conAdd10").setTemplate(TalukaListTemp);
		$("#conAdd10").processTemplate(stateObjects);
		
	    $("#conAdd3").setTemplate(CityListTemp);
		$("#conAdd3").processTemplate(stateObjects);
	}

	else{

		var stateObjects = {
			districtList : []
		};
		ajaxResponse = $("#district").html();

		//alert(ajaxResponse);
		json = JSON.parse(ajaxResponse);

		
		for ( var i = 0; i < json.districtList.length; i++) {

			//alert(json.districtList[i].state_id);
			
			if (json.districtList[i].state_id == StateId) {
				stateObjects.districtList.push(json.districtList[i]);
			}
		}

		$("#perAdd4").setTemplate(DistrictListTemp);
		$("#perAdd4").processTemplate(stateObjects);
		
		$("#perAdd8").setTemplate(TalukaListTemp);
		$("#perAdd8").processTemplate(stateObjects);
		
	    $("#perAdd3").setTemplate(CityListTemp);
		$("#perAdd3").processTemplate(stateObjects);
	}
}

/***************OnkeyPress(12-02-2016)**********************/
function SearchPageOnEnter(key, page_name) {
	var keycode = (key.which) ? key.which : key.keyCode;
	//alert(keycode);
	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || keycode == 9 || keycode == 127
			|| (keycode > 36 && keycode < 40) || keycode == 46) {
		return true;
	}

	else if (keycode == 13) {
		// alert(page_name);
		if (page_name == "state") {
			searchState("state");
		}else if (page_name == "district") {
			searchDistrict("district");
		}else if (page_name == "taluka") {
			searchTaluka("taluka");
		}else if (page_name == "city") {
			searchCity("city");
		}else if (page_name == "ReasonOfVisit") {
			searchReasonOfVisit("ReasonOfVisit");
		}else if (page_name == "voucher") {
			searchVoucher("voucher");
		}else {

			if (keycode != 32) {
				alert("Please Enter Alphabets only");
				return false;
			}
		}
	}
};

//Author@Manisha:- Reason of Visit Master.

function setAddReasonOfVisit(type) {

	
	var inputs = [];
	inputs.push('action=fetchReasonofVisitID');
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			 //alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#SpecialReasonOfVisitContent").setTemplate(addReasonOfVisitTemp);
			
			$("#SpecialReasonOfVisitContent").processTemplate(pobj1);
			
			getAllModule();
			
		}
	});
}

var addReasonOfVisitTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
	+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Reason Of Visit:</h3></div>"
	+ "<div class='divide-20'></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1' for='ReasonOfVisit ID'>ID</label>"
	+ "<input id='reasonofvisitid' name='reasonofvisitid' type='text' placeholder='ID' style='background-color: #ddd;'"
	+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.ReasonOfVisit_id}'/></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1' for='reasonofvisit'>Reason Of Visit<b style='color: red; padding-left: 3px;'>*</b></label>"
	+ "<input id='reasonofvisit' name='reasonofvisit' type='text' placeholder='Reason Of Visit ' onkeypress='return validatealphabetic(event)' "
	+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px; margin-top: 13px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1'>Module<b style='color: red; padding-left: 3px;'>*</b></label>" 
	+ "<select id='moduleList' class='form-control input-SmallText TextFont col-md-7-1'></select>"
	+ "</div>"
    + "<div class='form-group Remove-Padding col-md-7-1' style='padding-left: 50px;margin-top:20px;'>"
	+ "<input type='hidden' id='queryType' value='insert'>"
	+ "</div></div>";


function saveReasonOfVisitDetails() {
	var ReasonOfVisitType = $("#ReasonOfVisitType").val();
	var queryType = $("#queryType").val();
    var ReasonOfVisitid = $("#reasonofvisitid").val();
    var ReasonOfVisit = $.trim($("#reasonofvisit").val());
    var moduleId = $("#moduleList").val();
    
   // alert(ReasonOfVisitid);
    
	if (ReasonOfVisit == "") {
		alert("Please Enter Reason Of Visit Details...");
		return false;
	}else if (moduleId == "") {
		alert("Please Select Module Name...");
		return false;
	}

	var inputs = [];
	inputs.push('action=UpdateReasonOfVisit');
	inputs.push('ReasonOfVisitType=' + encodeURIComponent(ReasonOfVisitType));
	inputs.push('ReasonOfVisitid=' + ReasonOfVisitid);
	inputs.push('ReasonOfVisit=' + encodeURIComponent(ReasonOfVisit));
	inputs.push('queryType=' + queryType);
	inputs.push('moduleId=' + moduleId);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

		//	ajaxResponse = r;
			alert(r);
			location.reload();
		//	setAddReasonOfVisit("ReasonOfVisit");
		//	defaultViewReasonOfVisit('ReasonOfVisit');
		}
	});
}


function defaultViewReasonOfVisit(search,type) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Reason Of Visit Details !");
			setFocus("#byName");
		}
	}
	
	var inputs = [];
	inputs.push('action=fetchReasonOfVisitDetails');
	
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {

			var ajaxResponse = res;
			
			//alert(ajaxResponse);
			$("#ReasonOfVisitDetails").html(ajaxResponse);
			var DisObj = eval('(' + ajaxResponse + ')');
		
			if(type.match("masterForm"))
				{
				$("#ReasonOfVisitContent").setTemplate(ReasonOfVisitDetailsTempForMasterForm);
				$("#ReasonOfVisitContent").processTemplate(DisObj);
				}else{
					$("#SelectReasonVisitDetails").setTemplate(ReasonOfVisitDetailsTempForRegistration);
					$("#SelectReasonVisitDetails").processTemplate(DisObj);
				}
		}
	});
}

var ReasonOfVisitDetailsTempForRegistration = "<option value='0'>-select-</option>{#foreach $T.ReasonOfVisitDetails as RV} <option value='{$T.RV.ReasonOfVisit_id}'>{$T.RV.ReasonOfVisit}</option>{#/for}";

var ReasonOfVisitDetailsTempForMasterForm = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'> ID</div></th>"
	+ "<th class='col-md-2-1' style='height: 27.5px;'><div class='TextFont'>Reason Of Visit Details</div></th>"
	+ "<th class='col-md-1-1' style='height: 27.5px;'><div class='TextFont'>Module Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.ReasonOfVisitDetails as ReasonOfVisit}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.ReasonOfVisit.ReasonOfVisit_id}</td>"
	+ "<td class='col-sm-2-1 ' style='height: 21.5px; padding-left:10px'>{$T.ReasonOfVisit.ReasonOfVisit}</td>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px; padding-left:20px'>{$T.ReasonOfVisit.moduleName}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editReasonOfVisitDetails({$T.ReasonOfVisit.ReasonOfVisit_id})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteReasonOfVisitDetails({$T.ReasonOfVisit.ReasonOfVisit_id})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "<input type='hidden' value='{$T.ReasonOfVisit.moduleId}'/>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";


function editReasonOfVisitDetails(ReasonOfVisitId) {
	
	//alert(ReasonOfVisitId);
	
	var myObj1="";
	var type = $("#ReasonOfVisitType").val();
	var ajaxResponse = $("#ReasonOfVisitDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.ReasonOfVisitDetails.length; i++) {

		if (myArray.ReasonOfVisitDetails[i].ReasonOfVisit_id == ReasonOfVisitId) {
			myObj1 = myArray.ReasonOfVisitDetails[i];
             break;
		}
	}
	
	$("#title").html("Edit Reason Of Visit Details:");
	$("#reasonofvisitid").val(myObj1.ReasonOfVisit_id);
	$("#reasonofvisit").val(myObj1.ReasonOfVisit);
	$("#moduleList").val(myObj1.moduleId);
	
    $("#queryType").val("update");

}


function deleteReasonOfVisitDetails(ReasonOfVisitId) {
	
	//alert(ReasonOfVisitId);

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
        var inputs = [];
		inputs.push('action=deleteReasonOfVisitDetails');
		inputs.push("ReasonOfVisitId=" + ReasonOfVisitId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			//	defaultViewReasonOfVisit("ReasonOfVisit");
			//	ReasonOfVisitDetailsMaster("ReasonOfVisit");
			}
		});

	}
}

function ReasonOfVisitDetailsMaster() {
	setAddReasonOfVisit("ReasonOfVisit");
}


function searchReasonOfVisit(ReasonOfVisit) {
	count = 1;
	var ReasonOfVisitType = $("#ReasonOfVisitType").val();
	
	//alert(ReasonOfVisitType);
	
	var strValue = $("#byName").val();
	if (strValue == "") {
		if (ReasonOfVisitType == "ReasonOfVisit") {
			alert("Please Enter Reason Of Visit Details.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchReasonOfVisit');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('ReasonOfVisitType=' + encodeURIComponent(ReasonOfVisitType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.ReasonOfVisitDetails.length == 0) {
				if (ReasonOfVisitType == "ReasonOfVisit") {
					alert("Reason Of Visit Details are Not Found");
					$("#byName").val("");
				}
				$("#byName").val();

			} else {
				(ReasonOfVisitType == "ReasonOfVisit")
				$("#ReasonOfVisitContent").setTemplate(ReasonOfVisitDetailsTempForMasterForm);
			}
			$("#byName").val("");
			$("#ReasonOfVisitContent").processTemplate(pobj1);
			userAccess();
		}
	});
}
// Expense Voucher template
// Tushar Code @14 Nov 2016
var addVoucherTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
	+ "<div style='padding-top: 0%; padding-left: 8%'><div><h3 id = 'title' >Add Voucher Details:</h3></div>"
	+ "<div class='divide-20'></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1' for='Voucher ID'>Voucher ID</label>"
	+ "<input id='voucherid' name='vid' type='text' placeholder='Voucher ID' style='background-color: #ddd;'"
	+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.voucher_id}'/></div>"
	+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
	+ "<div class='divide-20'></div>"
	+ "<label class='TextFont col-md-4-1' for='Voucher Name'>Voucher Name<b style='color: red; padding-left: 3px;'>*</b></label>"
	+ "<input id='vouchername' name='vname' type='text' placeholder='Voucher Name' onkeypress='return validatealphabetic(event)'"
	+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
	+ "<input type='hidden' id='queryType' value='insert'>"
	+ "</div></div>";

function setAddVoucherTemp(type) {
	var VoucherType = $("#VoucherType").val();
	var inputs = [];
	inputs.push('action=fetchVoucherID');
	inputs.push('VoucherType=' + encodeURIComponent(VoucherType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			if (type == "VoucherGroup") {
				$("#SpecialVoucherContent").setTemplate(addVoucherTemp);
			}
			$("#SpecialVoucherContent").processTemplate(pobj1);
		}
	});
}

var defaultVoucherViewTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Voucher ID</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Voucher Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.voucherList as voucherList}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.voucherList.voucher_id}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.voucherList.voucher_name}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit2' onclick='editVoucher({$T.voucherList.voucher_id})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete2' onclick='deleteVoucher({$T.voucherList.voucher_id})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewVoucher(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Voucher Name !");
			setFocus("#byName");
		}
	}
	var VoucherType = $("#VoucherType").val();
	var inputs = [];
	inputs.push('action=fetchVoucher');
	
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {

			var ajaxResponse = res;
			$("#VoucherDetails").html(ajaxResponse);
			var DisObj = eval('(' + ajaxResponse + ')');
			if (VoucherType == "VoucherGroup") {
				$("#VoucherContent").setTemplate(defaultVoucherViewTemp);
			}
			$("#VoucherContent").processTemplate(DisObj);
		}
	});
}



function saveVoucherMaster() {
	var VoucherType = $("#VoucherType").val();
	var queryType = $("#queryType").val();
	var vouchername = $("#vouchername").val();
	vouchername = $.trim(vouchername);
	var voucherid = $("#voucherid").val();
	if (vouchername == null || vouchername == "") {
		if (VoucherType == "VoucherGroup") {
			alert("Please enter Voucher Name.");
			return false;
		} else {
			alert("Please enter Voucher Name.");
			$("#vouchername").val("");
			return false;
		}
	}
	var inputs = [];
	inputs.push('action=UpdateVoucher');
	inputs.push('VoucherType=' + VoucherType);
	inputs.push('voucherid=' + voucherid);
	inputs.push('vouchername=' + vouchername);
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload();
			defaultViewVoucher();
			setAddVoucherTemp("VoucherGroup");

		}
	});
}


function editVoucher(VoucherId) {
	var myObj1;
	var type = $("#VoucherType").val();
	var ajaxResponse = $("#VoucherDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.voucherList.length; i++) {

		if (myArray.voucherList[i].voucher_id == VoucherId) {
			myObj1 = myArray.voucherList[i];
			break;
		}
	}
	if (type == "VoucherGroup") {
		$("#title").html("Edit Voucher Details:");
		$("#voucherid").val(myObj1.voucher_id);
		$("#vouchername").val(myObj1.voucher_name);
		$("#queryType").val("update");
	}
}


function deleteVoucher(VoucherId) {

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
		
		var inputs = [];
		inputs.push('action=deleteVoucher');
		inputs.push("voucherid=" + VoucherId);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
				defaultViewVoucher("VoucherGroup");
				NewVoucherMaster("VoucherGroup");
			}
		});
	}
}

function NewVoucherMaster() {
	setAddVoucherTemp("VoucherGroup");
}


function searchVoucher(address_name) {
	count = 1;
	var VoucherType = $("#VoucherType").val();
	var strValue = $("#byName").val();
	if (strValue == "") {
		if (VoucherType == "VoucherGroup") {
			alert("Please Enter Voucher Name First.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchVoucher');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('VoucherType=' + encodeURIComponent(VoucherType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.voucherList.length == 0) {
				if (VoucherType == "VoucherGroup") {
					alert("Voucher Masters are Not Found");
					$("#byName").val("");
				}
				$("#byName").val();

			} else {
				if(VoucherType == "VoucherGroup")
				$("#VoucherContent").setTemplate(defaultVoucherViewTemp);
			}
			$("#byName").val("");
			$("#VoucherContent").processTemplate(pobj1);

		}
	});
}

function setAutoVoucherName(inputID, onload, callFrom) {

	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "VoucherDatabase") {
		auto = 'VoucherName';
	}
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
						$("#pathiddenid").val(idValue);
					}
					setTimeout(function() {
						
						$("#div" + inputID + " .typeahead").html(template);
						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});
	function displayResult(item) {
		$("#byName").val((item.text).trim());
	}
}

/******************************LedgerHeads Masters(14 Nov-2016)*************************/
var addLedgerHeadsTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div><h3 id = 'title' >Add Ledger Heads Details:</h3></div>"
		+ "<div class='divide-20'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Ledger Head ID'>Ledger Head ID</label>"
		+ "<input id='lid' name='lid' type='text' placeholder='Ledger Head ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.lhID}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
        + "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Group Name'>Group Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' name='vouchername' id='vouchername' >"
		+ "</select></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-20'></div>"
		+ "<label class='TextFont col-md-4-1' for='Ledger Head Name'>Ledger Head Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='lhname' name='lhname' type='text' placeholder='Ledger Head Name' onkeypress='return validatealphabetic(event)'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
		+ "<input type='hidden' id='queryType' value='insert'>"
		+ "</div></div>";

function setAddLedgerHeadsTemp(type) {

	var ledgerHeadType = $("#ledgerHeadType").val();
	var inputs = [];
	inputs.push('action=fetchLedgerHeadID');
	inputs.push('LedgerHeadType=' + encodeURIComponent(ledgerHeadType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if (ledgerHeadType == "LedgerHeadGroup") {
				$("#SpecialledgerHeadContent").setTemplate(addLedgerHeadsTemp);
			}
			$("#SpecialledgerHeadContent").processTemplate(pobj1);
		}
	});
}

var defaultLedgerHeadViewTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Ledger Head ID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Group Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Ledger Head Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.ledgerHeadList as lh}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lh.lhID}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lh.voucher_name}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lh.lhName}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit2' onclick='editledgerHead({$T.lh.lhID})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete2' onclick='deleteledgerHead({$T.lh.lhID})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewledgerHead(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Ledger Head Name !");
			setFocus("#byName");
		}
	}
	var ledgerHeadType = $("#ledgerHeadType").val();
	var inputs = [];
	inputs.push('action=fetchLedgerHead');
	inputs.push('ledgerHeadType=' + encodeURIComponent(ledgerHeadType));
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {
			var ajaxResponse = res;
			$("#LedgerHeadDetails").html(ajaxResponse);
			var DisObj = eval('(' + ajaxResponse + ')');
			if (ledgerHeadType == "LedgerHeadGroup") {
				$("#ledgerHeadContent").setTemplate(defaultLedgerHeadViewTemp);
			}
			$("#ledgerHeadContent").processTemplate(DisObj);
		}
	});
}

function saveledgerHeadsMaster() {
	var ledgerHeadType = $("#ledgerHeadType").val();
	var queryType = $("#queryType").val();
	var lhname = $("#lhname").val();
	lhname = $.trim(lhname);
	var lhid = $("#lid").val();
	var grpname = $.trim($('#vouchername').val());

    if (grpname == "0") {
		alert("Please Select Group...");
		return false;
	}
	if (lhname == "") {
		alert("Please Enter Ledger Head name...");
		return false;
	}
	var inputs = [];
	inputs.push('action=UpdateLedgerHead');
	inputs.push('ledgerHeadType=' + encodeURIComponent(ledgerHeadType));
	inputs.push('lhid=' + lhid);
	inputs.push('grpname=' + encodeURIComponent(grpname));
	inputs.push('lhname=' + encodeURIComponent(lhname));
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload();
			defaultViewLedgerHead();
			setAddLedgerHeadTemp("LedgerHeadGroup");
		}
	});
}

var VoucherListTemp = "<option value='0'>-Select-</option>{#foreach $T.voucherList as voucherList"
	+ "}<option value='{$T.voucherList.voucher_id}' name='{$T.voucherList.voucher_name}'>{$T.voucherList.voucher_name}</option>{#/for}";

function fetchVoucherList(voucherType) {
	var inputs = [];
	inputs.push('action=fetchVoucherList');
	inputs.push('voucherType=' + encodeURIComponent(voucherType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#voucher").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#vouchername").setTemplate(VoucherListTemp);
				$("#vouchername").processTemplate(obj);
				
				$("#selectVoucherGrp").setTemplate(VoucherListTemp);
				$("#selectVoucherGrp").processTemplate(obj);

				$("#conAdd5").setTemplate(VoucherListTemp);
				$("#conAdd5").processTemplate(obj);

				$("#perAdd5").setTemplate(VoucherListTemp);
				$("#perAdd5").processTemplate(obj);

			}, 5);
		}
	});
}

/** *****************Edit Ledger Head***************************** */
function editledgerHead(lhId) {
	var myObj1;
	var type = $("#ledgerHeadType").val();
	var ajaxResponse = $("#LedgerHeadDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.ledgerHeadList.length; i++) {

		if (myArray.ledgerHeadList[i].lhID == lhId) {
			myObj1 = myArray.ledgerHeadList[i];
			break;
		}
	}
	if (type == "LedgerHeadGroup") {
		$("#title").html("Edit Ledger Head Details:");
		$("#lid").val(myObj1.lhID);
		$("#vouchername").val(myObj1.voucher_id);
		$("#lhname").val(myObj1.lhName);
		$("#queryType").val("update");
	}
}

/** *****************Delete Ledger Head***************************** */
function deleteledgerHead(lhId) {
	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {
		var ledgerHeadType = $("#ledgerHeadType").val();
		var inputs = [];
		inputs.push('action=deleteLedgerHead');
		inputs.push("lhid=" + lhId);
		inputs.push('ledgerHeadType=' + encodeURIComponent(ledgerHeadType));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
				defaultViewledgerHead();
				NewLedgerHeadMaster("LedgerHeadGroup");
			}
		});
	}
}

/** ********************Ledger Head(For Search)********************* */
function searchledgerHead(address_name) {
	count = 1;
	var ledgerHeadType = $("#ledgerHeadType").val();
	var strValue = $("#byName").val();
	if (strValue == "") {
		if (ledgerHeadType == "LedgerHeadGroup") {
			alert("Please Enter Ledger Head Name First.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchLedgerHead');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('ledgerHeadType=' + encodeURIComponent(ledgerHeadType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.ledgerHeadList.length == 0) {
				if (ledgerHeadType == "LedgerHeadGroup") {
					alert("Ledger Head Masters are Not Found");
					$("#byName").val("");
				}
				$("#byName").val();
			} else {
				if(ledgerHeadType == "LedgerHeadGroup")
				$("#ledgerHeadContent").setTemplate(defaultLedgerHeadViewTemp);
			}
			$("#byName").val("");
			$("#ledgerHeadContent").processTemplate(pobj1);
		}
	});
}

function NewLedgerHeadMaster() {
	setAddLedgerHeadTemp("LedgerHeadGroup");
	fetchVoucherList("Group");
}

function setAutoLedgerHead(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "LedgerHeadsDatabase") {
		auto = 'LedgerHeads';
	}
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					ajaxResponse = decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});
	function displayResult(item) {
		$("#byName").val((item.text).trim());
	}
}

var headListTemp = "<option value='0'>-Select-</option>{#foreach $T.ledgerHeadList as ledgerHeadList"
	+ "}<option value='{$T.ledgerHeadList.lhID}'>{$T.ledgerHeadList.lhName}</option>{#/for}";

function setLedgerHead(str){
	var inputs = [];
	inputs.push('action=setLedgerHead');
	inputs.push('str=' + str);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#ledgerHead").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#selectLedgerHead").setTemplate(headListTemp);
				$("#selectLedgerHead").processTemplate(obj);
				
			}, 5);
		}
	});
}

var headListTemp2 = "{#foreach $T.ledgerHeadList as ledgerHeadList"
	+ "}<option value='{$T.ledgerHeadList.lhID}'>{$T.ledgerHeadList.lhName}</option>{#/for}";

function selLedgerhead(str){
	var inputs = [];
	inputs.push('action=selLedgerhead');
	inputs.push('str=' + str);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#ledgerHead").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#selectLedgerHead").setTemplate(headListTemp2);
				$("#selectLedgerHead").processTemplate(obj);
				
			}, 5);
		}
	});
}

function newLedgerHeadsMaster(){
	
	$("#vouchername").val(0);
	$("#lhname").val("");
}

/************
* @author	: Tarikh Alam
* @date		: 14-12-2017
* @codeFor	: Get Payment mode list
 ************/
function getAllPayments() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/payment/fetchPayList",

		success : function(r) {
			setTempPaymode(r);//call template
		}
	});
}

function setTempPaymode(r) {
	var list = "";    
    for ( var i = 0; i < r.listPay.length; i++) {  

        list = list + "<option value='"+r.listPay[i].payId+"' class='un'>" + (r.listPay[i].payName) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'>Multiple</option>";  
    $("#selAmountType").html(list);
}
