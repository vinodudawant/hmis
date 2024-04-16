function toggleEntryDiv(id){
	if(id=="divForEdit"){
		$("#divForEntry").show('slow');
	}else{
		$("#divForEntry").toggle('slow');
	}	
}
function clearImmunizationMaster()
{
	 toggleEntryDiv('divForEntry');
}
function saveImmunizationConfiguration()
{
	var days=0;
	var max_day=0;
	
	var weeks=0;
	var max_weeks=0;
	
	var months=0;
	var max_months=0;
	
	var years=0;
	var max_year=0;
	var immunizationconfiguration_id= $("#immunizationconfiguration_id").val();
	if(immunizationconfiguration_id == null || immunizationconfiguration_id == undefined || immunizationconfiguration_id == "")
	{
		immunizationconfiguration_id=0;
	}
	var vaccinename=$("#vaccinename").val();
	if(vaccinename == null || vaccinename == undefined || vaccinename == "")
	{
	alert("Please Enter vaccine name.");
	return false;
	}
	var day=$("#dob").val();
	if(day == null || day == undefined || day == "")
	{
	alert("Please select day.");
	return false;
	}
	var max_days=$("#maxvaluedays").val();
	if(max_days == null || max_days == undefined || max_days == "")
	{
	alert("Please select days.");
	return false;
	}
	var maxvalue=$("#maxvaluedaysweeks").val();
	if(maxvalue == null || maxvalue == undefined || maxvalue == "")
	{
	alert("Please select days.");
	return false;
	}
	else
	{
		if(maxvalue == 'DAYS')
			{
			days=day;
			max_day=max_days;
			}
		else if(maxvalue == 'WEEKS')
			{
			weeks=day;
			max_weeks=max_days;
			}
		else if(maxvalue == 'MONTHS')
			{
			months=day;
			max_months=max_days;
			}
		else if(maxvalue == 'YEARS')
			{
			years=day;
			max_year=max_days;
			}
			
	}
	var optionalormandatory=$("#optionalormandatory").val();
	if(optionalormandatory == null || optionalormandatory == undefined || optionalormandatory == "")
	{
	alert("Please select days.");
	return false;
	}
	else
	{
		if(optionalormandatory == 'OPTIONAL')
			{
			optionalormandatory='N';
			}
		else if(optionalormandatory == 'MANDATORY')
			{
			optionalormandatory='Y';
			}
	}
	var gender=$("#gender").val();
	if(gender == null || gender == undefined || gender == "")
	{
	alert("Please select gender.");
	return false;
	}
	var notes=$("#notes").val();
	if(notes == null || notes == undefined || notes == "")
	{
	alert("Please Enter notes.");
	return false;
	}
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	
	var inputs = [];
	inputs.push('immunizationconfiguration_id=' + immunizationconfiguration_id);
	inputs.push('vaccine=' + vaccinename);
	inputs.push('day=' + days);
	inputs.push('max_day=' + max_day);
	inputs.push('weeks=' + weeks);
	inputs.push('max_weeks=' + max_weeks);
	inputs.push('months=' + months);
	inputs.push('max_months=' + max_months);
	inputs.push('year=' + years);
	inputs.push('max_year=' + max_year);
	inputs.push('mandatory_flag=' + optionalormandatory);
	inputs.push('gender=' + gender);
	inputs.push('notes=' + notes);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/saveimmunizationconfiguration",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r == 1)
			{
				alertify.success("Save Sucessfully");		
				}
			else if(r == 2)
				{
				alertify.success("Update Sucessfully");	
				}
			else if(r == -1 )
				{
				alertify.error("Already Save vaccine Name");
				}
			else if(r == 0)
				{
				alertify.error("Oops Some Problem Ocured");
				}
			clearFild();
			fetchImmunizationConfig();
		}
	});
}
function clearFild()
{
	$("#immunizationconfiguration_id").val("");
	$("#vaccinename").val("");
	$("#dob").val("");
	$("#maxvaluedays").val("");
	$("#maxvaluedaysweeks").val("");
	$("#gender").val("0");
	$("#optionalormandatory").val("0");
	$("#notes").val("");
}
function fetchImmunizationConfig()
{
	var vaccine="";
	vaccine=$("#search_vaccine_name").val();
	var inputs = [];
	inputs.push('vaccinename=' + vaccine);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/fetchimmunizationconfig",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setFetchImmunizationConfig(r);
			}
	});
	
}
function setFetchImmunizationConfig(r)
{
	var htm ="";
	var index=1;
		
		for ( var i = 0; i < r.list.length; i++) {	
			htm = htm +'<tr> '
		+ " <td class='col-md-1-1 center'>"+index+'</td>'
		if(r.list[i].mandatory_flag == 'Y'){
			if(r.list[i].gender == 'ALL')
				{
			htm = htm+ "<td class='col-md-5-1 center'>"+r.list[i].vaccine+" <b style='color: red; padding-left: 3px;'>*</b><sup><i class='fa fa-users'></i></sup></td>"
				}
			else if(r.list[i].gender == 'MALE')
				{
				htm = htm+ "<td class='col-md-5-1 center'>"+r.list[i].vaccine+" <b style='color: red; padding-left: 3px;'>*</b><sup><i class='fa fa-male'></i></sup></td>"
				}
			else if(r.list[i].gender == 'FEMALE')
				{
				htm = htm+ "<td class='col-md-5-1 center'>"+r.list[i].vaccine+" <b style='color: red; padding-left: 3px;'>*</b><sup><i class='fa fa-female'></i></sup></td>"
				}
			}
		else
			{
			if(r.list[i].gender == 'ALL')
			{
		htm = htm+ "<td class='col-md-5-1 center'>"+r.list[i].vaccine+" <sup><i class='fa fa-users'></i></sup></td>"
			}
		else if(r.list[i].gender == 'MALE')
			{
			htm = htm+ "<td class='col-md-5-1 center'>"+r.list[i].vaccine+" <sup><i class='fa fa-male'></i></sup></td>"
			}
		else if(r.list[i].gender == 'FEMALE')
			{
			htm = htm+ "<td class='col-md-5-1 center'>"+r.list[i].vaccine+" <sup><i class='fa fa-female'></i></sup></td>"
			}
			}
			
			if(r.list[i].day == 0 && r.list[i].weeks == 0 && r.list[i].months == 0 &&   r.list[i].year == 0)
			{
			htm = htm + " <td class='col-md-2-1 center'>At Birth</td>"
			}else if(r.list[i].day != 0)
			{
			htm = htm + " <td class='col-md-2-1 center'>"+r.list[i].day+" to "+r.list[i].max_day+" days"+"</td>"
			}
		else if(r.list[i].weeks != 0)  
			{
			htm = htm + " <td class='col-md-2-1 center'>"+r.list[i].weeks+" to "+r.list[i].max_weeks+" weeks"+"</td>"
			}
		else if(r.list[i].months != 0)
			{
			htm = htm + " <td class='col-md-2-1 center'>"+r.list[i].months+" to "+r.list[i].max_months+" months"+"</td>"
			}
		else if(r.list[i].year != 0)
			{
			htm = htm + " <td class='col-md-2-1 center'>"+r.list[i].year+" to "+r.list[i].max_year+" year"+"</td>"
			}
		htm = htm + " <td class='col-md-2-1 center'>"
		+ "<button onclick='editImmunizationConfig("+r.list[i].immunizationconfiguration_id+");'type='button' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-edit'></i></button>"	
		+"</td>"
		+ '</tr>';
			index++;
		}
		$("#setfetchimmunizationconfig").html(htm);
		
}
function editImmunizationConfig(id)
{
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/editimmunizationconfig",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#divForEntry").show('slow');
			setEditImmunizationConfig(r);
			$("#search_vaccine_name").val("");
			
			}
	});
	
}
function setEditImmunizationConfig(r)
{
	$("#immunizationconfiguration_id").val(r.immunizationconfiguration_id);
	$("#vaccinename").val(r.vaccine);
	if(r.day != 0)
		{
		$("#dob").val(r.day);
		$("#maxvaluedays").val(r.max_day);
		$("#maxvaluedaysweeks").val('DAYS');
		}
	else if(r.weeks != 0)
		{
		$("#dob").val(r.weeks);
		$("#maxvaluedays").val(r.max_weeks);
		$("#maxvaluedaysweeks").val('WEEKS');
		}
	else if(r.months != 0)
		{
		$("#dob").val(r.months);
		$("#maxvaluedays").val(r.max_months);
		$("#maxvaluedaysweeks").val('MONTHS');
		}
	else if(r.year != 0)
		{
		$("#dob").val(r.year);
		$("#maxvaluedays").val(r.max_year);
		$("#maxvaluedaysweeks").val('YEARS');
		}
	if(r.mandatory_flag == 'N')
		{
		$("#optionalormandatory").val('OPTIONAL');
		}
	else if(r.mandatory_flag == 'Y')
		{
		$("#optionalormandatory").val('MANDATORY');
		}
	$("#gender").val(r.gender);
	$("#notes").val(r.notes);
}
