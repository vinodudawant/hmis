
function toggleEntryDiv(id) {

	if(id=="divForTitleEdit"){
		$("#divForTitleEntry").show('slow');
	}else if (id == "divForTitleEntry"){
		$("#divForTitleEntry").toggle('slow');
	}	
}

/* ============ Patient Title Master ============ */

function resetPatientTitleMaster() {
	$("#txtPatientTitle").val("");
	$("#cboPatientTitleGender").val("");
	$("#patientTitleId").val("0");
	
	toggleEntryDiv("divForTitleEntry");
}

function savePatientTitle() {
	var patientTitle = $("#txtPatientTitle").val();
	var patientTitleId = $("#patientTitleId").val();
	var patientTitleGender = $("#cboPatientTitleGender").val();
	
	if (patientTitle == "") {
		alert("Please Enter Patient Title");
		SetFocus("txtPatientTitle");
		return false;
	}
	if (patientTitleGender == "") {
		alert("Please Enter Suitable Gender for the Title");
		SetFocus("cboPatientTitleGender");
		return false;
	}

	var inputs = [];
	inputs.push('patientTitle=' + patientTitle);
	inputs.push('patientTitleID=' + patientTitleId);
	inputs.push('patientTitleGender=' + patientTitleGender);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savepatienttitle",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			resetPatientTitleMaster();
			defaultFetchPatientTitle("PatientTitle");
		}
	});
}

function defaultFetchPatientTitle(pagename) {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/getallpatienttitles",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setPatientTitleTemp(r);
			setTitleMasterfororganreg(r);
		}
	});
}

function setPatientTitleTemp(response)
{
	var divContent="";
	if(response.listPatientTitle.length > 0)
	{
		for(var i = 0; i < response.listPatientTitle.length; i++)
		{
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.listPatientTitle[i].patientTitleID+"</td>"
			+ "<td class='col-md-1 center'>"+response.listPatientTitle[i].patientTitle+"</td>"
			+ "<td class='col-md-1 center'>"+response.listPatientTitle[i].patientTitleGender+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editPatientTitle("+response.listPatientTitle[i].patientTitleID+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-danger deleteUserAccess' onclick='deletePatientTitle("+response.listPatientTitle[i].patientTitleID+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}
	$("#PatientViewTitleContent").html(divContent);
	
}

// Function Added  for fetching title Added By Annapurna
function setTitleMasterfororganreg(response)
{
	//alert("hii"+response.listPatientTitle.length);
	var listspec="";	

listspec = listspec + "<select class='col-md-12'><option value='0'>--Select title --</option>";
	for(var i = 0; i < response.listPatientTitle.length; i++)
	{
		listspec= listspec+ "<option value='" + response.listPatientTitle[i].patientTitleID+"'>" + response.listPatientTitle[i].patientTitle+"</option>";
		
	

}
	$("#title").html(listspec);
}

function editPatientTitle(id) {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editpatientTitle/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		alert("error");
		},
		success : function(r) {
			toggleEntryDiv("divForTitleEdit");
			
			$("#txtPatientTitle").val(r.patientTitle);
			$("#patientTitleId").val(r.patientTitleID);
			$("#cboPatientTitleGender").val(r.patientTitleGender);
		}
	});
}

function deletePatientTitle(ptid) {

	var r = confirm("Are you sure to delete the record ?");
	if (r == true) {
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/admin/deletepatienttitle/"+ptid,
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				if(ajaxResponse)
				{
					alert("Patient title deleted...");
				}
				else
				{
					alert("Oops some problem occured while deleting Patient Title...");
				}
				defaultFetchPatientTitle("PatientTitle");
			}
		});
	}
}

/* ============ Symptom Details Master ============ */

var i = 1;

function createDivSym() {
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtSymptoms = $("#txtSymptoms" + rowCount + "").val();

		if (txtSymptoms == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;

	rowId = "Sym" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	x.setAttribute('style', 'margin-top: 0px');
	document.getElementById("divSym").appendChild(x);
	document.getElementById(rowId).innerHTML = '<td style="height: 21.5px; width: 66px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
			+ (rowCount)
			+ '</label></td>'
			+ '<td style="height: 21.5px; width: 468px;" class="col-md-7-1 center"><input type="text" class="col-sm-12-1" style="margin-top: 8px;" id="txtSymptoms'
			+ rowCount
			+ '"></td>'
			+ '<td style="height: 21.5px; width: 116px;" class="col-md-2-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkbox'
			+ rowCount + '" /></td>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}

function fetchDoctorSpecilizations1(page) {
	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		/*	alert('error');*/
		},
		success : function(r) {
			var ajaxResponse = r;
			
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');
			for ( var i = 0; i < doctorBean.liSplz.length; i++) {

				if (page == 'custTemp') {

					var divDocSpec = eval('(' + ajaxResponse + ')');
					var doctorSpec = "<option value=''>--Select--</option>";

					for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
						doctorSpec = doctorSpec + "<option value='"
								+ divDocSpec.liSplz[int].splzId + "'>"
								+ divDocSpec.liSplz[int].splzNm + "</option>";
						var array_element = divDocSpec.liSplz[int];

					}
					$('#selDocSpec').html(doctorSpec);
					
				}else if(page == 'diettemp'){
					var divDocSpec = eval('(' + ajaxResponse + ')');
					var doctorSpec = "<option value=''>--Select--</option>";

					for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
						doctorSpec = doctorSpec + "<option value='"
								+ divDocSpec.liSplz[int].splzId + "'>"
								+ divDocSpec.liSplz[int].splzNm + "</option>";
						var array_element = divDocSpec.liSplz[int];

					}
					$('#selDocSpecDiet').html(doctorSpec);
				} else if(page == 'SubObjTemplate'){
                    
                    var divDocSpec = eval('(' + ajaxResponse + ')');
                    var doctorSpec = "<option value=''>--Select--</option>";                    
                    for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
                        doctorSpec = doctorSpec + "<option value='"
                                + divDocSpec.liSplz[int].splzId + "'>"
                                + divDocSpec.liSplz[int].splzNm + "</option>";
                        var array_element = divDocSpec.liSplz[int];                    }
                    $('#iSpecialtity').html(doctorSpec);
                }else {
					var o = new Option("option text", "value");
					$(o).html(doctorBean.liSplz[i].splzNm);
					$(o).val(doctorBean.liSplz[i].splzId);
					$("#selDocSpec").append(o);
					$("#selName").append(o);
				}
			}
		}
	});
}

function saveSymDetail()
{
	var specializationId = $("#selName :selected").val();
	alert("specializationId :"+specializationId);
	
	if(specializationId == 0)
	{
		alert("Please select specialization");
		return false;
	}
	
	if(selName == null || selName == "" || selName == 0)
	{
		alert("Please enter atleast one Symptoms Name to save");
		return false;
	}
	var objSKC = 0;

	objSKC = {
			sml : []
	};
	var rowCount = $("#RowCount").val();

	var count = 0;
	if (rowCount == 0 || status == 'Y') {
		alert("You can not save empty fields.");
		return false;
	}

	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var txtSymptoms = $("#txtSymptoms" + count + "").val();
		var txtidskco = $("#idskco" + count + "").val();

		if (txtidskco == undefined) {

			txtidskco = 0;
		}
		if (txtSymptoms == "") {
			alert("Please Enter Symptoms.");
			return false;
		}
		if (txtSymptoms != undefined) {

			objSKC.sml.push({
				"idsym" : txtidskco,
				"sn" : txtSymptoms,
			});
		}
	}

	objSKC = JSON.stringify(objSKC);
	var inputs = [];
	inputs.push('specializationId=' + specializationId);
	inputs.push('objSKC=' + objSKC);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savesymptomdetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			location.reload();
		}
	});
}

function fetchSymptoms() {

	var selName = $("#selName :selected").val();
	if (selName == "" || selName == undefined || selName == 0) {
		selName = 0;		
		return false;
	}

	var inputs = [];
	inputs.push('hospitalSpecializationId=' + selName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getsymptomdetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');//
		},
		success : function(r) {			
			setSymptomDetailsTemp(r);
		}
	});
}

function deleteSymptomDetail() {

	var r = confirm("Do you really want to delete this information.");
	if(!r)
	{
		return false;
	}
	else
	{
		var allVals = [];
		$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
		});

		if (allVals.length != 0) {
			jQuery.ajax({
				async : true,
				type : "DELETE",
				url : "ehat/admin/deletesymptomdetail/"+allVals,
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				alert('error');
				},
				success : function(r) {
					if(r)
					{
						alert("Symptom deleted...");
					}
					else
					{
						alert("Oops some problem occured while deleting Symptom...");
					}
					location.reload();
				}
			});
		}
	}
}

function setSymptomDetailsTemp(response)
{
	var divContent="";
	if(response.sml.length > 0)
	{
		var count = 0;
		for(var i = 0; i < response.sml.length; i++)
		{
			count++;
			divContent=divContent+ "<tr id='Sym"+(i+1)+"' class='' style='margin-top: 0px;'>"
			+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
			+ "<label style='margin-top: 8px;' class='TextFont'>"+(i+1)+"</label></td>"
			+ "<td class='col-md-7-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='col-md-12-1' style='margin-top: 8px;' id='txtSymptoms"+(i+1)+"' value='"+response.sml[i].sn+"'>"
			+ "</td>"
			+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
			+ "<input type='checkbox' style='margin-top: 8px;' name='checkbox"+(i+1)+"' id='checkbox' value='"+response.sml[i].idsym+"' class='symptomsCheckbox'/>"
			+ "</td>"
			+ "<input type='hidden' value='"+response.sml[i].idsym+"' id='idskco"+(i+1)+"' name='idskco"+(i+1)+"'/>"
			+ "<input type='hidden' value='"+(i+1)+"' id='txtRowCount' name='txtRowCount'/>"
			+ "</tr>"
		}
		
		divContent = divContent+ "<input type='hidden' value='"+count+"' id='addRowCount'/>"
		+ "<input type='hidden' value='"+count+"' id='RowCount'/>";
	}
	$("#divSym").html(divContent);
}