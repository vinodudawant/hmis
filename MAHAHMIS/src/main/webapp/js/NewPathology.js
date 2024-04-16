/* =========== Lab Organ =========== */

function saveLabOrgans() {
	var labOrganName = $.trim($("#headNm").val());
	var labOrganId = $.trim($("#idHed").val());

	if (labOrganName == "" || labOrganName == undefined) {
		alert("Please Enter Lab Organ Name!");
		SetFocus("headNm");
		return false;
	}

	var inputs = [];
	inputs.push('organName=' + encodeURIComponent(labOrganName));
	inputs.push('idlabOrgans=' + labOrganId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathology/savelaborgan",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			resetLabOrganFrom();
			getLabOrgans("onload");
			alert(r);
			//window.location = 'NewPathologyOrgan.jsp';
		}
	});
}

function getLabOrgans(type) {

	var byName = $.trim($("#byName").val());
	if (byName == "" && type == "searchBtn") {
		alert("Please enter lab organ name to search");
		return false;
	}
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathology/getlaborgans",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#byName').val("");
			setLabOrgansTemp(r,'getLabOrgan');
		}
	});
}

function setLabOrgansTemp(response, callFrom){
	var divContent="";
	if(callFrom == 'autoSearch'){
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idlbOrg+"</td>"
		+ "<td class='col-md-1 center'>"+response.lbOrgNm+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editLabOrgan("+response.idlbOrg+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteLabOrgan("+response.idlbOrg+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}else if(response.lbOrgLi.length > 0){
		for(var i = 0; i < response.lbOrgLi.length; i++){
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.lbOrgLi[i].idlbOrg+"</td>"
			+ "<td class='col-md-1 center'>"+response.lbOrgLi[i].lbOrgNm+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editLabOrgan("+response.lbOrgLi[i].idlbOrg+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteLabOrgan("+response.lbOrgLi[i].idlbOrg+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}else{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No records found...</td>"
	}
	$("#labOrganDetails").html(divContent);
}

function editLabOrgan(id){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathology/getlaborganbyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#headNm").val(r.lbOrgNm);
			$("#idHed").val(r.idlbOrg);
		}
	});
}

function deleteLabOrgan(id){
	var r = confirm("Are you sure you want to delete lab organ.");
	
	if(!r){
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/pathology/deletelaborgan/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r){
					alert("Lab organ deleted.");
				}
				resetLabOrganFrom();
				getLabOrgans("onload");
			}
		});
	}
}

function labOrganAutoSuggestion(labOrganId, type) {
	var resultData = [];
	var labOrganName = $("input#" + labOrganId).val();

	if (labOrganName == "" || labOrganName == null || labOrganName == "null"
			|| labOrganName == undefined) {

		alert("Please enter search value");
		$("input#" + labOrganId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(labOrganName));
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathology/getlaborgans",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lbOrgLi.length; j++) {

				var arrValue = response.lbOrgLi[j].idlbOrg +"-"+response.lbOrgLi[j].lbOrgNm;
				var idValue = response.lbOrgLi[j].idlbOrg;
				var organName = response.lbOrgLi[j].lbOrgNm;
				resultData.push({
					ID : idValue,
					Name : organName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + labOrganId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + labOrganId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var organid = res[0];
		var organName = res[1];
		getAllLabOrganById(organid);
		$("input#" + labOrganId).val(organName);
	}
}

function getAllLabOrganById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathology/getlaborganbyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setLabOrgansTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

function resetLabOrganFrom(){
	$('#byName').val("");
	$("#headNm").val("");
	$("#idHed").val("0");
}

/* =========== Lab Information =========== */

function fetchOwnLabDetails(callFrom) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathology/getlabinfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (callFrom == "LabForm") {
				$("#txtLabName").val(r.nm);
				$("#txtAddress").html(r.add);
				$("#email").val(r.eml);
				$("#txtPathologist").val(r.pthl);
				$("#txtDegree").val(r.deg);
				$("#txtLabCode").val(r.mlc);
				$("#txtTelephone").val(r.tel);
				$("#txtOpeningTime").val(r.ot);
				$("#txtClosingTime").val(r.ct);
				$("#txtLunchTime").val(r.lt);
				$("#selClosedDay").val(r.cd);
				$("#hiddenMainLabId").val(r.mlid);
			} else {
				$("#labName").html(mainLabData.limainlab[0].nm);
				$("#labAdd").html(mainLabData.limainlab[0].add);
				$("#labTelephone").html(mainLabData.limainlab[0].tel);
				$("#OpenTime").html(mainLabData.limainlab[0].ot);
				$("#CloseTime").html(mainLabData.limainlab[0].ct);
				$("#LunchTime").html(mainLabData.limainlab[0].lt);
				$("#closeOn").html(mainLabData.limainlab[0].cd);
				$("#footerLab").html(mainLabData.limainlab[0].fn);
			}
		}
	});
}

function saveOwnLabDetails() {
	var labName = $("#txtLabName").val();
	var address = $("#txtAddress").val();
	var txtEmail = $("#email").val();
	var txtTelephone = $("#txtTelephone").val();
	var txtLabCode = $("#txtLabCode").val();
	var txtPathologist = $("#txtPathologist").val();
	var txtDegree = $("#txtDegree").val();
	var txtOpeningTime = $("#txtOpeningTime").val();
	var txtClosingTime = $("#txtClosingTime").val();
	var txtLunchTime = $("#txtLunchTime").val();
	var selClosedDay = $("#selClosedDay").val();
	var hiddenLabId = $("#hiddenMainLabId").val();
	
	if (labName == "") {
		icon - thin - right - arrow
		alert("Please Enter Lab Name!");
		SetFocus("txtLabName");
		return false;
	} else if (txtPathologist == "") {
		alert("Please Enter Pathologist Name!");
		SetFocus("txtPathologist");
		return false;
	} else if (txtTelephone == "") {
		alert("Please Enter Telephone Number!");
		SetFocus("txtTelephone");
		return false;
	}

	var inputs = [];
	inputs.push('idownlab=' + encodeURIComponent(hiddenLabId));
	inputs.push('labCode=' + encodeURIComponent(txtLabCode));
	inputs.push('name=' + encodeURIComponent(labName));
	inputs.push('address=' + encodeURIComponent(address));
	inputs.push('email=' + encodeURIComponent(txtEmail));
	inputs.push('pathalogist=' + encodeURIComponent(txtPathologist));
	inputs.push('degree=' + encodeURIComponent(txtDegree));
	inputs.push('telephoneNo=' + encodeURIComponent(txtTelephone));
	inputs.push('openingTime=' + encodeURIComponent(txtOpeningTime));
	inputs.push('closingTime=' + encodeURIComponent(txtClosingTime));
	inputs.push('lunchTime=' + encodeURIComponent(txtLunchTime));
	inputs.push('closedDay=' + encodeURIComponent(selClosedDay));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathology/savelabinfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			
			location.reload();
		}
	});
}

/* =========== Unit Type =========== */

function saveUnitType() {
	var idunit = $("#idunit").val();
	var unitname = $.trim($("#unitName").val());
	
	if (unitname == "") {
		alert("Please Enter Unit Type.");
		SetFocus("unitName");
	} else {

		var inputs = [];
		inputs.push('idunitType=' + idunit);
		inputs.push('unitName=' + encodeURIComponent(unitname));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/pathology/saveunittype",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				$("#idunit").val('0');
				window.location = "newlabunitType.jsp";
			}
		});
	}
}

function ViewUnitList(callFrom) {

	var byName = $("#byName").val();
	if (byName == "" && callFrom == "search") {
		alert("Please Enter Unit Type Name for Search");
		return false;
	}
	if (byName == " " || byName == null) {
		alert("Please Enter Valid Unit Type Name");
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathology/getallunittypes",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#byName').val("");
			setUnitTypeTemp(r,'ViewUnitList');
		}
	});
}

function setUnitTypeTemp(response, callFrom) {
	
	var divContent="";
	if(callFrom == 'autoSearch')
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.unitid+"</td>"
		+ "<td class='col-md-1 center'>"+response.unitnm+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editUnitType("+response.unitid+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteUnitType("+response.unitid+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}
	else if(response.unitli.length > 0)
	{
		for(var i = 0; i < response.unitli.length; i++)
		{
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.unitli[i].unitid+"</td>"
			+ "<td class='col-md-1 center'>"+response.unitli[i].unitnm+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editUnitType("+response.unitli[i].unitid+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteUnitType("+response.unitli[i].unitid+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}
	else
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No record found...</td>"
	}
	$("#unitTypeDetails").html(divContent);
}

function editUnitType(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathology/editunittype/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#unitName").val(r.unitnm);
			$("#idunit").val(r.unitid);
		}
	});
}

function deleteUnitType(id)
{
	var r = confirm("Are you sure you want to delete unit.");
	
	if(!r)
	{
		return false;
	}
	else
	{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/pathology/deleteunittype/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r)
				{
					alert("Unit deleted.");
				}
				window.location = 'newlabunitType.jsp';
			}
		});
	}
}

function unitTypeAutoSuggestion(unitId, type) {
	var resultData = [];
	var unitName = $("input#" + unitId).val();

	if (unitName == "" || unitName == null || unitName == "null"
			|| unitName == undefined) {

		alert("Please enter search value");
		$("input#" + unitId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(unitName));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathology/getallunittypes",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.unitli.length; j++) {

				var arrValue = response.unitli[j].unitid +"-"+response.unitli[j].unitnm;
				var idValue = response.unitli[j].unitid;
				var unitName = response.unitli[j].unitnm;
				resultData.push({
					ID : idValue,
					Name : unitName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + unitId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + unitId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var unitId = res[0];
		var unitName = res[1];
		getAllUnitsById(unitId);
		$("input#" + unitId).val(unitName);
	}
}

function getAllUnitsById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathology/editunittype/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setUnitTypeTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

function resetUnitTypeFrom()
{
	$('#byName').val("");
	$('#unitName').val("");
	$('#idunit').val("0");
}