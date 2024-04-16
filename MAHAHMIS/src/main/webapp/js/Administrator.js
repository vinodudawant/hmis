/** ****************IPD management************************* */
var remVals = [];
var QueryString = "insert";
var rowCount = 1;
var count = 1;
var sr = 1;
var sr1 = 1;
var ilSize;
var i = 1;
var i1 = 0;
var mm = 1;
var response111;
var ajaxResponse = "";

function administratorTempletChartSlave(callFrom) {
	var cType = $("#cType :selected").val();

	if (cType == "" || cType == undefined || cType == "Select") {
		cType = 1;
	}

	count = 1;
	$("#save").html("");
	var inputs = [];
	// inputs.push('action=defaultChartView');
	inputs.push('cType=' + cType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/administratortempletchartslave",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setChartSlave(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}
function setChartSlave(r){
	var htm ="";
	
	for ( var i = 0; i < r.listChartType.length; i++) {	
		
		htm = htm + '<tr id="remove"+count+"> '
		+ " <td class='col-md-1-1 center'id='count'>"+count+'</td>'
		+ " <td class='col-md-6-1 center'><input type='tex' style='width: 80%' id='cname"+count+"' value="+r.listChartType[i].name+"></td>"
		+ "<td class='col-md-4-1 center' id='fee'><input type='text' style='width: 75%' id='fee"+count+"' onkeypress='return validateNumbers(event)' maxlength='6' value="+r.listChartType[i].fee+"></td>"
		+ " <td class='col-md-1-1 center'>"
		+ "<input type='checkbox' value="+r.listChartType[i].idchartTypeTbl+" name='checkbox' id='checkbox"+count+"' class='chartViewCheckbox' disabled='disabled'></td>"
		+ "<input type='hidden' value="+r.listChartType[i].idchartTypeTbl+" id='idskco"+count+"' name='idskco"+count+++"' /></td>"
		+ '</tr>'
		+"<input type='hidden' value="+--count+" id='addRowCount' />"
		+ "<input type='hidden' class='mytest' value="+count+" id='RowCount' />";
		count++;
	}
	$("#countTest").val(count);
	$("#chartAddTemp").html(htm);
}

function createDivChartSlave() {
	var cType = $("#cType :selected").val();
	if (cType == null || cType == "" || cType == "Select") {
		alert("Please Select Chart Name.");
	} else {
		
		// var hiddenRowCount = document.getElementById("RowCount");
		var hiddenRowCount = $("#countTest").val();
		var rowCount = hiddenRowCount;
		if (rowCount != 0) {
			var cname = $("#cname" + rowCount + "").val();
			if (cname == "") {
				alert("Please fill the previous added row.");
				return false;
			}
		}
		// alert("row:"+rowCount);
		// rowCount++;
		divId = "tr" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', divId);
		x.setAttribute('style', 'width: 100%; ');
		document.getElementById("chartAddTemp").appendChild(x);
		document.getElementById(divId).innerHTML = '<tr id="remove'
				+ rowCount
				+ '">'
				+ '<td class="col-md-1-1 center">'
				+ rowCount
				+ '.</td><td class="col-md-6-1 center"><input type="text" style="width: 80%" value="" id="cname'
				+ rowCount
				+ '"></td>'
				+ '<td class="col-md-4-1 center"><input type="text" value=""'
				+ 'maxlength="6" onkeypress="return validateNumbers(event)" id="fee'
				+ rowCount + '"' + 'style="width: 75%"></td>'
				+ '<td class="col-md-1-1 center"><input type="checkbox" id="checkbox'+ rowCount +'" name="checkbox" value="0"></td>'
				+ '<input type="hidden" name="idskco' + rowCount
				+ '" id="RowCount" value="0">' + '</tr>';

		$("#RowCount").val(rowCount);
		// $("#addRowCount").val(i);
		i++;

		// $(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");

	}
}
function deleteChartSlave()
{

	idList=[];
    $("#chartAddTemp").find('input[name="checkbox"]').each(function(){
        if($(this).is(":checked")){
        	// alert("ID: "+$('#'+this.id).val());
        	var currentId=$('#'+this.id).val();
        	// alert("currentId:"+currentId);
        	if(currentId==0){
        		$(this).parents("tr").remove();
        	}else{
        		idList.push(currentId);
        	}	
        }
    });
   
    if(idList.length > 0){
    	var r = confirm("Are You Sure You Want To Delete this row ?");
    	if (r == true) {

    		var inputs = [];

    		inputs.push('chartslaveid=' + encodeURIComponent(idList));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/admin/deletechartslave",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alert(r);
    				administratorTempletChartSlave('temp');
    			}
    		});

    	}
    }
}

function saveChartSlaveName() {
	var cType = $("#cType :selected").val();
	if (cType.trim() == null || cType.trim() == "" || cType.trim() == "Select") {
		alert("Please select Chart Name.");
		return false;
	}
	var checkbox = $('#checkbox:checked').val();
	var r;
	if (checkbox == undefined) {
		r = true;
	} else {
		r = confirm("Do you want to discard delete operation...?");
	}

	if (r == true) {

		var objSKC = 0;
		objSKC = {
				listChartType : []
		};
		var rowCount = $("#RowCount").val();
		// var rowCount = $("#countTest").val();
		// rowCount--;
		var count = 0;
		if (rowCount == 0 && status == 'Y') {
			alert("You can not save empty fields.");
			return false;
		}
		for ( var i = 1; i <= rowCount; i++) {
			count++;
			// var cname = encodeURIComponent($("#cname" + count + "").val());
			// var fee = encodeURIComponent($("#fee" + count + "").val());
			
			var cname = $("#cname" + count + "").val();
			var fee = ($("#fee" + count + "").val()).trim();
			var txtidskco = $("#idskco" + count + "").val();
			if (txtidskco == undefined) {
				txtidskco = 0;
			}
			if (cname.trim() == "") {
				alert("Please enter chart name");
				return false;
			}
			if ((cType != undefined) && (cname != "undefined")) {
				objSKC.listChartType.push({
					"idchartTypeTbl" : txtidskco,
					"name" : cname,
					"fee" : fee,
					"cType" : cType
				});
			}
		}

		objSKC = JSON.stringify(objSKC);
		var inputs = [];
		// inputs.push('action=saveChartName');
		inputs.push('objSKC=' + encodeURIComponent(objSKC));
		// inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/admin/savechartslavename",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				administratorTempletChartSlave('temp');
				
			}
		});
	} else {
		var p = 1;
		for ( var i = 0; i < rowCount; i++) {

			$('input:checkbox[name=checkbox' + p + ']').attr("checked", true);
			p++;
		}
	}
}
function clearChartSlave()
{
	 $('#cType').val("0");
	   location.reload();
}
/** ***********************************FetchBed****************************************** */
function ipdViewBedStatus() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/fetchipdbedstatusadmin",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ipdViewBedStatusDisplay(r);
			
		}
	});
}
function ipdViewBedStatusDisplay(r)
{
var htm ="";
var index=0;
	
	for ( var i = 0; i < r.bedstatuslist.length; i++) {	
		htm = htm +'<tr> '
	+ " <td class='col-md-1-1 center'>"+index+'</td>'
	+ " <td class='col-md-2-1 center'>"+r.bedstatuslist[i].idbedState+"</td>"
	+ "<td class='col-md-5-1 center'>"+r.bedstatuslist[i].bedState+"</td>"
	+ '</tr>';
		index++;
	}
	$("#bedStateList").html(htm);
}
/**
 * ******************************************ward type
 * ***************************************
 */
function fetchWordTypeList() {
	
	var id=1;
	var inputs = [];
	inputs.push('id=' + encodeURIComponent(id));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/fetchwordtypelist",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			setWardType(r);
		}
	});
}
function setWardType(r)
{
	var ajaxResponse = r;
	
	var divContent = "";
	divContent = divContent
			+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstChargesSlave.length; i++) 
	{
		
		/*divContent = divContent + "<option value="+r.lstChargesSlave[i].categoryName+" data-name="+r.lstChargesSlave[i].categoryName+" data-id="+r.lstChargesSlave[i].slaveId+">"
				+ r.lstChargesSlave[i].categoryName + "</option>";*/
		
		divContent=divContent+'<option  value="'+(r.lstChargesSlave[i].slaveId)+'" data-hall_id="'+r.lstChargesSlave[i].slaveId+'" id="'+(r.lstChargesSlave[i].slaveId)+'" data-name="'+r.lstChargesSlave[i].categoryName+'">'+(r.lstChargesSlave[i].categoryName)+'</option>';
	}
	divContent = divContent + "</select>";
	$("#wardTypeHall").html(divContent);	
}

function wardTypeName(id) {
	
	var value = $("#wardTypeHall").find(':selected').attr('data-name');
	
	$("#wardTypeName").val(value);
}

function unitMasterListWard()
{
		var ulogin =$("#userNameLogIn").val();
		jQuery.ajax({
			
			async : true,
			type : "POST",
			url : "ehat/unit/unitMasterListOnLogin",
			data : {
			"ulogin" : ulogin
		},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			alert('error');
		},
		
			success : function(r) 
			{
				setTemplateForunitMasterOnWard(r);	
		}
	});	
	
}
function setTemplateForunitMasterOnWard(r)
{
var list="";
list=list+ "<select name='UnitsId'  class='col-md-12' ><option value='0'>--Select--</option>";
for ( var int = 0; int < r.lstUnit.length; int++) {
	
	list=list+'<option  value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
	}	
$("#UnitsId").html(list);

}
/*******************************************************************************
 * @Date :14-01-2020
 * @Code :save Hall Type Charges
 ******************************************************************************/
function saveAddWardType()
{

	var hallType_id=$("#hallType_id").val();
	if(hallType_id == null || hallType_id == undefined || hallType_id == "")
	{
		hallType_id=0;
	}
	//var wardTypeHall = $("#wardTypeHall").find(':selected').attr('data-id');
	var wardTypeHall = $("#wardTypeHall").val();

	
	if(wardTypeHall == null || wardTypeHall == undefined || wardTypeHall == "")
		{
			alert("Please select ward Type.");
			return false;
		}
	var wardTypeName =$("#wardTypeName").val();
	if(wardTypeName == null || wardTypeName == undefined || wardTypeName == "")
		{
			alert("Please select ward Name.");
			return false;
		}
	var rehabPackagecharge =$("#rehabPackagecharge").val();
	if(rehabPackagecharge == null || rehabPackagecharge == undefined || rehabPackagecharge == "")
	{
		alert("Please Enter Package charge.");
		return false;
	}
	var UnitsId =$("#UnitsId").val();
	
	if(UnitsId == null || UnitsId == undefined || UnitsId == "")
	{
		alert("Please select unit.");
		return false;
	}
	
	var ChargesNormalSpeciality =$("#ChargesNormalSpeciality").val();
	if(ChargesNormalSpeciality == null || ChargesNormalSpeciality == undefined || ChargesNormalSpeciality == "")
	{
		alert("Please Enter Normal Speciality.");
		return false;
	}
	var isolationSpeciality =$("#isolationSpeciality").val();
	if(isolationSpeciality == null || isolationSpeciality == undefined || isolationSpeciality == "")
	{
		alert("Please Enter Isolation Speciality.");
		return false;
	}
	
	var ChargesNormalSuperSpeciality =$("#ChargesNormalSuperSpeciality").val();
	if(ChargesNormalSuperSpeciality == null || ChargesNormalSuperSpeciality == undefined || ChargesNormalSuperSpeciality == "")
	{
		alert("Please Enter Normal Super Speciality.");
		return false;
	}
	var isolationSuperSpeciality =$("#isolationSuperSpeciality").val();
	if(isolationSuperSpeciality == null || isolationSuperSpeciality == undefined || isolationSuperSpeciality == "")
	{
		alert("Please Enter Isolation Super Speciality.");
		return false;
	}
	
	var ChargesNormalIntensivist =$("#ChargesNormalIntensivist").val();
	if(ChargesNormalIntensivist == null || ChargesNormalIntensivist == undefined || ChargesNormalIntensivist == "")
	{
		alert("Please Enter Normal Intensivist.");
		return false;
	}
	var isolationIntensivist =$("#isolationIntensivist").val();
	if(isolationIntensivist == null || isolationIntensivist == undefined || isolationIntensivist == "")
	{
		alert("Please Enter Isolation Intensivist.");
		return false;
	}
	var chargesNormalMedicalTeamNursingCharges =$("#chargesNormalMedicalTeamNursingCharges").val();
	if(chargesNormalMedicalTeamNursingCharges == null || chargesNormalMedicalTeamNursingCharges == undefined || chargesNormalMedicalTeamNursingCharges == "")
	{
		alert("Please Enter Normal Medical Team.");
		return false;
	}
	var isolationMedicalTeamNursingCharges =$("#isolationMedicalTeamNursingCharges").val();
	if(isolationMedicalTeamNursingCharges == null || isolationMedicalTeamNursingCharges == undefined || isolationMedicalTeamNursingCharges == "")
	{
		alert("Please Enter Isolation Medical Team.");
		return false;
	}
	var hallTypecharge_id1=$("#hallTypecharge_id1").val();
	if(hallTypecharge_id1 == null || hallTypecharge_id1 == undefined || hallTypecharge_id1 == "")
	{
		hallTypecharge_id1=0
	}
	
	var hallTypecharge_id2=$("#hallTypecharge_id2").val();
	if(hallTypecharge_id2 == null || hallTypecharge_id2 == undefined || hallTypecharge_id2 == "")
	{
		hallTypecharge_id2=0
	}
	
	var userloginid=$("#unitId").val();
	
	var halltype = 0;
	halltype = {
			'idhall_type':hallType_id,
			'hall_type_name' : wardTypeName,
			'packageCharges' : rehabPackagecharge,
			'unitId' :UnitsId,
			'ehat_halltype_id' : wardTypeHall,
			'createdBy' :userloginid
	};
	
	
	
	halltype = JSON.stringify(halltype);
	
	var inputs = [];
	inputs.push('idhall_type=' + encodeURIComponent(hallType_id));
	inputs.push('hall_type_name=' + encodeURIComponent(wardTypeName));
	inputs.push('packageCharges=' + encodeURIComponent(rehabPackagecharge));
	inputs.push('unitId=' + encodeURIComponent(UnitsId));
	inputs.push('ehat_halltype_id=' + encodeURIComponent(wardTypeHall));
	inputs.push('createdBy=' + encodeURIComponent(userloginid));
	
	inputs.push('ChargesNormalSpeciality=' + encodeURIComponent(ChargesNormalSpeciality));
	inputs.push('ChargesNormalSuperSpeciality=' + encodeURIComponent(ChargesNormalSuperSpeciality));
	inputs.push('ChargesNormalIntensivist=' + encodeURIComponent(ChargesNormalIntensivist));
	inputs.push('chargesNormalMedicalTeamNursingCharges=' + encodeURIComponent(chargesNormalMedicalTeamNursingCharges));
	
	inputs.push('isolationSpeciality=' + encodeURIComponent(isolationSpeciality));
	inputs.push('isolationSuperSpeciality=' + encodeURIComponent(isolationSuperSpeciality));
	inputs.push('isolationIntensivist=' + encodeURIComponent(isolationIntensivist));
	inputs.push('isolationMedicalTeamNursingCharges=' + encodeURIComponent(isolationMedicalTeamNursingCharges));
	inputs.push('hallTypecharge_id=' + encodeURIComponent(hallTypecharge_id1));
	inputs.push('hallTypecharge=' + encodeURIComponent(hallTypecharge_id2));
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/saveaddwardtype",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	
			alert(r);
			fetchHallTypeandCharges();
			clearHallTypeFild();
			$("#divForEntry").hide('slow');
		}
	});
	
}
function clearHallTypeFild()
{
	$("#hallType_id").val("");
	$("#wardTypeHall").val("0");
	$("#wardTypeName").val("");
	$("#rehabPackagecharge").val("");
	$("#UnitsId").val("0");
	$("#hallTypecharge_id1").val("");
	$("#hallTypecharge_id2").val("");
	$("#ChargesNormalSpeciality").val("");
	$("#isolationSpeciality").val("");
	$("#ChargesNormalSuperSpeciality").val("");
	$("#isolationSuperSpeciality").val("");
	$("#ChargesNormalIntensivist").val("");
	$("#isolationIntensivist").val("");
	$("#chargesNormalMedicalTeamNursingCharges").val("");
	$("#isolationMedicalTeamNursingCharges").val("");
}
/*******************************************************************************
 * @Date :14-01-2020
 * @Code :fetch Hall Type charges
 ******************************************************************************/
function fetchHallTypeandCharges()
{
	var str=$("#searchwardtypename").val();
	
	var inputs = [];
	inputs.push('name=' + str);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/fetchhalltypeandcharges",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	
			setHallTypeList(r);
			$("#searchwardtypename").val("");
			
		}
	});	
}
function setHallTypeList(r)
{
	var htm ="";
	var index=0;
	
		for ( var i = 0; i < r.hallTypeList.length; i++) {	
			htm = htm +'<tr> '
		+ " <td class='col-md-1-1 center'>"+index+'</td>'
		+ " <td class='col-md-2-1 center'>"+r.hallTypeList[i].idhall_type+"</td>"
		+ "<td class='col-md-5-1 center'>"+r.hallTypeList[i].hall_type_name+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='singleHallTypeId("+r.hallTypeList[i].idhall_type+");'type='button' class='btn btn-xs btn-success'><i class='fa fa-edit'></i></button>"
		+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='deleteHallType("+r.hallTypeList[i].idhall_type+");'type='button' class='btn btn-xs btn-success'><i class='fa fa-trash-o'></i></button>"	
		+"</td>"
		+ '</tr>';
			index++;
		}
		$("#hallTypechargestable").html(htm);
	
}
/*******************************************************************************
 * @Date :14-01-2020
 * @Code :delete Hall Type charges
 ******************************************************************************/
function deleteHallType(id)
{
	var userid=$("#unitId").val();
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('userid=' + userid);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/deletehalltype",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	
			alert(r);
			fetchHallTypeandCharges();
		}
	});	
}

function singleHallTypeId(id)
{
	$("#divForEntry").show('slow');
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/updatehalltypeid",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setUpdateValue(r);
			
		}
	});	
}

function setUpdateValue(r) {
	 
	$("#wardTypeHall").val(r.ehat_halltype_id)
	$("#wardTypeHall").val(r.hall_type_name)
	$("#hallType_id").val(r.idhall_type);
	$("#wardTypeName").val(r.hall_type_name);
	$("#rehabPackagecharge").val(r.packageCharges);
	
	$("#UnitsId").select2('val',r.unitId);
	for(var i=0;i<r.listHallTypeCharges.length;i++)
		{
		if(i == 0)
			{
			$("#hallTypecharge_id1").val(r.listHallTypeCharges[i].idhall_type_charges);
			$("#ChargesNormalSpeciality").val(r.listHallTypeCharges[i].specialityNormalCharges);
			$("#ChargesNormalSuperSpeciality").val(r.listHallTypeCharges[i].superSpecialityNormalCharges);
			$("#ChargesNormalIntensivist").val(r.listHallTypeCharges[i].intencivistNormalCharges);
			$("#chargesNormalMedicalTeamNursingCharges").val(r.listHallTypeCharges[i].medicalTeamNormalCharges);
			}
		else
			{
			$("#hallTypecharge_id2").val(r.listHallTypeCharges[i].idhall_type_charges);
			$("#isolationSpeciality").val(r.listHallTypeCharges[i].specialityNormalCharges);
			$("#isolationSuperSpeciality").val(r.listHallTypeCharges[i].superSpecialityNormalCharges);
			$("#isolationIntensivist").val(r.listHallTypeCharges[i].intencivistNormalCharges);
			$("#isolationMedicalTeamNursingCharges").val(r.listHallTypeCharges[i].medicalTeamNormalCharges);
			}
		}
}
/**
 * *******************************bed/ward
 * Mangement*******************************
 */
function fetchWardName()
{
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/fetchwardname",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	        		setFetchWardName(r);
				}
	});	
}
function setFetchWardName(r)
{
	
	var list="";
	list=list+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		list=list+'<option  value="'+(r.lstChargesSlave[int].slaveId)+'"  data-selfid="'+r.lstChargesSlave[int].selfId+'" data-name="'+r.lstChargesSlave[int].categoryName+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		}	
	$("#wardTypeSelect").html(list);
}
function wardName(id)
{
	var value = $("#wardTypeSelect").find(':selected').attr('data-name');
	$("#wardName").val(value);
	var  selfid = $("#wardTypeSelect").find(':selected').attr('data-selfid');
	$("#wardHallSelect").val(selfid);
	$('#wardHallSelect').attr("disabled", true); 
	
}

function  fetchHallName()
{	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/fetchhallname",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
	        		setFetchHallName(r);
				}
	});	
}
function setFetchHallName(r) {
	
	var list="";
	list=list+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {
		list=list+'<option  value="'+(r.lstChargesSlave[int].slaveId)+'" data-hall_id="'+r.lstChargesSlave[int].slaveId+'" id="'+(r.lstChargesSlave[int].slaveId)+'" data-name="'+r.lstChargesSlave[int].categoryName+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		}	
	$("#wardHallSelect").html(list);
	
}

function saveHallNameInfo()
{
	
	var hall_id = $("#hall_id").val();
	if(hall_id  == null || hall_id == undefined || hall_id == "")
		{
		hall_id=0;
		}
	var hallName = $("#wardName").val();
	if(hallName  == null || hallName == undefined || hallName == "")
	{
		alert("Please select Hallname.");
		return false;
	}
	var chargesmasterslave = $("#wardTypeSelect").val();
	var  hName = $("#wardHallSelect").find(':selected').attr('data-hall_id');
	if(hName  == null || hName == undefined || hName == "")
	{
		alert("Please select HallSelect.");
		return false;
	}
	var leasePreBed = $("#leasebednormal").val();
	if(leasePreBed  == null || leasePreBed == undefined || leasePreBed == "")
	{
		alert("Please Enter Lease Per Bed.");
		return false;
	}
	var leasePreBedIsolation = $("#leasebedisolation").val();
	if(leasePreBedIsolation  == null || leasePreBedIsolation == undefined || leasePreBedIsolation == "")
	{
		alert("Please Enter Lease Pre Bed Isolation.");
		return false;
	}
	var numberOfBed = $("#noofbeds").val();
	if(numberOfBed  == null || numberOfBed == undefined || numberOfBed == "")
	{
		alert("Please Enter Number Of Bed.");
		return false;
	}
	var unitId = $("#UnitsId").val();
	var userId=$("#userId").val();
	if(chargesmasterslave == null || chargesmasterslave == undefined || chargesmasterslave == "")
		{
		chargesmasterslave=0;
		}
	if(hName == null || hName == undefined || hName == "")
		{
		hName=0;
		}
	var obj={
			'slaveId' : chargesmasterslave
	};
	
	var hall={
			'hall':hall_id,
			'hallName' : hallName,
			'hall_type' : hName,
			'chargesmasterslave' : obj,
			'leasePreBed' : leasePreBed,
			'leasePreBedIsolation' : leasePreBedIsolation,
			'numberOfBed' :  numberOfBed,
			'createdBy' : userId,
			'unitId':unitId
	};
	hall = JSON.stringify(hall);
	var inputs = [];
	inputs.push('hall=' + hall);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savehallinformation",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	        
			alert(r);
			clearHallValue();
			 fetchHallInfo();
		}
	});	
}
function clearHallValue() {
	$("#hall_id").val("");
	$("#wardTypeSelect").val("0");
	$("#wardName").val("");
	$("#wardHallSelect").val("0");
	$("#leasebednormal").val("");
	$("#leasebedisolation").val("");
	$("#noofbeds").val("");
	$("#UnitsId").val("0");
	$("#unitId").val("");
	
}
function fetchHallInfo()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/fetchhallinfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setHallInfo(r);
			// toggleEntryDiv('divForEntry');
			// addBed(r);
			/*
			 * unitMasterListWard(); fetchWardName(); fetchHallName();
			 */
		}
	});	
}
function setHallInfo(r)
{
	var htm ="";
	var index=1;
		
		for ( var i = 0; i < r.hallList.length; i++) {	
			htm = htm +'<tr> '
		+ " <td class='col-md-1-1 center'>"+index+'</td>'
		+ "<td class='col-md-5-1 center'>"+r.hallList[i].hallName+"</td>"
		+ " <td class='col-md-2-1 center'>"+r.hallList[i].numberOfBed+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='editHallType("+r.hallList[i].hall+");'type='button' class='btn btn-xs btn-success'><i class='fa fa-edit'></i></button>"	
		+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='deleteHallBeds("+r.hallList[i].hall+");'type='button' class='btn btn-xs btn-success'><i class='fa fa-trash-o'></i></button>"	
		+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='addHallType("+r.hallList[i].hall+");'type='button' class='btn btn-xs btn-success'><i class='fa fa-plus'></i></button>"	
		+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='deleteHallBed("+r.hallList[i].hall+");'type='button' class='btn btn-xs btn-success'><i class='fa fa-trash-o'></i></button>"	
		+"</td>"
		+ '</tr>';
			index++;
		}
		$("#halltablebody").html(htm);
}
function addWard() {
	
	var htm ="";
	htm = htm
	+ "<div class='col-md-12 form-group center'>"
	+ "<h5>"
	+ "<i></i>Add Hall"
	+ "</h5>"
	+ "</div>"
	+"<div class='row'>"
	+ "<div class='col-md-3 form-group'>"
	+ "<label for=''>Select Ward Name:</label>"
	+ "<select name='listmstr'  class='input-group' id='wardTypeSelect' style='width: 100%' onchange='wardName(this.value);'>"
	+"<option value='' >Ward Name</option> </select>"
	+"</div>"
	+"<div class='col-md-3 form-group'>"
	+"<label for=''>Ward Name:</label><input class='input-group' type='text' id='wardName' name='' placeholder='ward Type Name' style='width: 100%'>"
	+"</div>"	
	+"<div class='col-md-3 form-group'>"
	+"<label for=''>ward Type:</label><select name='listmstr'  class='input-group' id='wardHallSelect' style='width: 100%' onchange='wardTypeName(this.id);'> "
	+"<option value='' >Ward Name</option> </select>"
	+"</div>"	
	+"<div class='col-md-3 form-group'>"
	+"<label for=''>Lease/ Bed Normal Rs:</label><input class='input-group' type='text' id='leasebednormal' name='' placeholder='Lease/ Bed Normal Rs' style='width: 100%'>"
	+"</div>"	
	+"</div>"
	+"<div class='row'>"
	+"<div class='col-md-3 form-group'>"
	+"<label for=''>Lease/ Bed Isolation Rs:</label><input class='input-group' type='text' id='leasebedisolation' name=' placeholder='Lease/ Bed Isolation Rs' style='width: 100%'>"
	+"</div>"	
	+"<div class='col-md-3 form-group'>"
	+"<label for=''>Number Of Beds:</label><input class='input-group' type='text' id='noofbeds' name='' placeholder='Number Of Beds' style='width: 100%'>"
	+"</div>"	
	+"<div class='col-md-3 form-group'>"
	+"<label for=''>Select Units:</label>	<select id='UnitsId' style='width: 100%' onchange='' >"
	+"<option id='UnitsId'>select unit</option>"
	+"</select>"
	+"</div>"
	+ "<div class='col-md-1 form-group'>"
	+"<button type='button' class='btn btn-warning' onclick='clearHallValue()'style='margin-top: 15px;'>Clear</button>"
	+"</div>"
	+"<div  class='col-md-1 form-group'>"
	+"<button type='button' class='btn btn-success' onclick='saveHallNameInfo();'style='margin-top: 15px;'>Save</button>"
	+"</div>"
	+"</div>";
	$("#displayhiadandshow").html(htm);
}
function addBed(r)
{
	var htm ="";
	htm = htm+
	'<div class="col-md-4 form-group center">'
	+'<h5>'
	+'<i></i>Add Bed'
	+'</h5>'
	+'</div>'
	+'<div class="col-md-12">'
	+'<table >'
	+'<thead>'
	+'<tr >'
	+'</tr>'
	+'</thead>'
	+'<tbody>'
	+'<tr >'
	+'<td style="width: 60%;"><font size="2">Hall Name</font></td>'
	+'<td >'+r.hallName+'</td>'
	+'<td ></td>'
	+'<td ></td>'
	+'</tr>'
	+'<tr >'
	+'<td><font size="2">Total Bed</font></td>'
	+'<td id="numberofbed" >'+r.numberOfBed+'</td>'
	+'<td ></td>'
	
	+'</tr>'
	+'<tr>'
	+'<td style="width: 60%;"><font size="2">hall type</font></td>'
	+'<td >'+r.hallName+'</td>'
	+'<td ></td>'
	
	+'</tr>'
	+'<tr>'
	+'<td style="width: 60%;"><font size="2">hall id</font></td>'
	+'<td id="hall">'+r.hall+'</td>'
	+'<td ></td>'
	
	+'</tr>'
	+'<tr>'
	+'<td style="width: 60%;"><font size="2">Lease/ Bed Normal</font></td>'
	+'<td >'+r.leasePreBed+'</td>'
	+'<td ></td>'
	
	+'</tr>'
	+'<tr>'
	+'<td style="width: 60%;"><font size="2">Lease/ Bed Isolation</font></td>'
	+'<td >'+r.leasePreBedIsolation+'</td>'
	+'<td ></td>'
	
	+'</tr>'
	+'<tr>'
	+'<td style="width: 60%;"><font size="2">Number Of Beds</font></td>'
	+'<td ><input type="text" name="" value="" id="noofbeds"></td>'
	+'</tr>'
	+'</tbody>'
	+'</table>'
	+"<div  class='col-md-1 form-group'>"
	+"<button type='button' class='btn btn-success' onclick='addBedHallInfo();'style='margin-top: 15px;'>Save</button>"
	+"</div>"
	+'</div>';

	$("#displayhiadandshow").html(htm);
}
function wardTypeHideandShow()
{
		clearHallTypeFild();
	   $("divForEntry").hide();
}

function clearWardandHall()
{
	clearHallTypeFild();
}
function addNewHall()
{
	 addWard();
	 toggleEntryDiv('divForEntry');
	 unitMasterListWard();
	 fetchWardName();
	 fetchHallName();
}
function editHallType(id) {
	/*
	 * addWard(); unitMasterListWard(); fetchWardName(); fetchHallName();
	 */
	var inputs = [];
	inputs.push('hall_id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/edithalltype",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#wardTypeSelect").val(r.chargesmasterslave.slaveId);
			$('#wardHallSelect').attr("disabled", false); 
			$("#hall_id").val(r.hall);
			$("#wardName").val(r.hallName);
			$("#leasebednormal").val(r.leasePreBed);
			$("#leasebedisolation").val(r.leasePreBedIsolation);
			$("#noofbeds").val(r.numberOfBed);
			$("#UnitsId").val(r.unitId);
			// var selfid =
			// $("#wardTypeSelect").find(':selected').attr('data-selfid');
			$("#wardHallSelect").val(r.hall_type);
			
		}
		
		});
}
function addHallType(id)
{
	var inputs = [];
	inputs.push('hall_id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/addHallType",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			addBed(r);
			// toggleEntryDiv('divForEntry');
		}
		});
}
function addBedHallInfo()
{
	var hall_id=$("#hall").html();
	if(hall_id == null || hall_id == undefined ||hall_id  == "")
		{
		
		 return false;
		}
	var no_of_bed=$("#noofbeds").val();
	if(no_of_bed == null || no_of_bed == undefined ||no_of_bed  == "")
	{
		alert("Please Enter No of Bed.");
		return false;
	}
	var numberofbed=$("#numberofbed").html();
	if(numberofbed == null || numberofbed == undefined ||numberofbed  == "")
	{
		return false;
	}
	var userId=$("#userId").val();
	var inputs = [];
	inputs.push('hall=' + hall_id);
	inputs.push('numberOfBed=' + no_of_bed);
	inputs.push('numberofbed=' + numberofbed);
	inputs.push('createdBy=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/addbedhalltype",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
				alert(r);
				$("#noofbeds").val("");
				fetchHallInfo();
				addHallType(hall_id);
				
			
		}
	});
}
function deleteHallBeds(id)
{
	var unitId = $("#userId").val();
	var inputs = [];
	inputs.push('hall=' + id);
	inputs.push('deletedBy=' + unitId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/deletehallbeds",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			fetchHallInfo();
		}
	});
		
}
function deleteBedDisplay()
{
	var htm ="";
	htm = htm+
	'<div class="panel-body" style="height: 250px;overflow: auto;">'
	+'<table id="fixed_header" class="table table-striped table-bordered">'
		+'<thead id="ehatTHead" class="fixedheaderdemo">'
			+'<tr>'
				+'<th class="col-md-1 center">#</th>'
				+'<th class="col-md-2 center">Hall Id</th>'
				+'<th class="col-md-2 center">Bed Id</th>'
				+'<th class="col-md-1 center">Bed Name</th>'
				+'<th class="col-md-1 center">Delete Bed</th>'
			+'</tr>'
		+'</thead>'
		+'<tbody id="deletebedshall" style="height: 100px;">'
		+'</tbody>'
	+'</table>'																		
+'</div>';
	$("#displayhiadandshow").html(htm);
}
function deleteHallBed(id)
{
	deleteBedDisplay();
	// toggleEntryDiv('divForEntry');
	
	var inputs = [];
	inputs.push('id=' + id);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/deletehallbedipd",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			 setBedsTable(r);
		}
	});
}

function setBedsTable(r)
{

	var htm ="";
	var index=1;
		
		for ( var i = 0; i < r.bedList.length; i++) {	
			htm = htm +'<tr> '
		+ " <td class='col-md-1-1 center'>"+index+'</td>'
		+ "<td class='col-md-5-1 center'>"+r.bedList[i].hall_ID+"</td>"
		+ " <td class='col-md-2-1 center'>"+r.bedList[i].bed_ID+"</td>"
		+ " <td class='col-md-2-1 center'>"+r.bedList[i].bed_name+"</td>"
		+ " <td class='col-md-2-1 center'>"
		+ "<button onclick='deletebedHalladmin("+r.bedList[i].hall_ID+","+r.bedList[i].bed_ID+")'type='button' class='btn btn-xs btn-success'><i class='fa fa-trash-o'></i></button>"	
		+"</td>"
		+ '</tr>';
			index++;
		}
		$("#deletebedshall").html(htm);
}
function deletebedHalladmin(hall_ID,bed_ID)
{
	var unitId = $("#userId").val();
	var inputs = [];
	inputs.push('bed_ID=' + bed_ID);
	inputs.push('hall_ID=' + hall_ID);
	inputs.push('deletedBy=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/deletebedhalladmin",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			deleteHallBed(hall_ID);
			 fetchHallInfo();
		}
	});
	
}
/** ******************Operation Management*************************** */
function  fetchDepartmentForOTSchedule()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/fetchdepartmentforotschedule",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setOTSchedule(r);
		}
	});
		
}
function setOTSchedule(r) {
	
	var list="";
	list=list+ "<select name=''  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.otGroupList.length; int++) {
		list=list+'<option  value="'+(r.otGroupList[int].idGroupDetails)+'" >'+(r.otGroupList[int].groupName)+'</option>';
		}	
	$("#department").html(list);
}

function fetchHallTypeProchargeOpration()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/fetchhalltypeprochargeopration",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setHallTypeProchargeOpration(r);
		}
	});
}
function setHallTypeProchargeOpration(r)
{
	
	var count=1;
	var htm ="";
		for ( var i = 0; i < r.hallTypeList.length; i++) {	
			htm = htm +'<tr> '
		+ " <td class='col-md-1-1 center'>"+r.hallTypeList[i].hall_type_name+"<input type='hidden' id='hallid"+count+"' value="+r.hallTypeList[i].idhall_type+"></td>"
		+ "<td class='col-md-2-1 center'><input type='text'id='surgeoncharge"+count+"' maxlength='8'  style='width: 70%;' onkeypress='return validateNumbers(event)'></td>"
		+ '</tr>';
		count++
		}
		$("#hallwisecharges").html(htm);
		$("#count").val(count);
	
}

function featchGrpCatWiseProChargeAdmin() {

	var operationID = $("#department").val();
    var sid = $("#sid").val();
	if (!sid) {
		sid = 0;
	}
	var opcatid = $("#opgrade").val();

	if (opcatid == "select") {
		alert("Please Select Procedure Category.");
		return false;
	}
	var sponsrid = $("#listmstr_select_chargesinfo").val();
	if(sponsrid==null || sponsrid==""){
		sponsrid=0;
	}
	var inputs = [];
	
	inputs.push('operationCatId=' + opcatid);
	inputs.push('corporateAcId=' + sid);
	inputs.push('operation_id=' + operationID);
	inputs.push('sponser_id=' + sponsrid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/admin/featchgrpcatwiseprochargeadmin",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					setSurgeonCharges(r);
					}
			});
}
function setSurgeonCharges(r)
{
	var count=$("#count").val();
	
	for(var j=1;j<=count;j++)
		{
			for(var i=0;i<r.operationchargehall.length;i++)
				{
				var id=$("#hallid" +j).val();
				if (r.operationchargehall[i].halltypeid == id )
					{
					$("#surgeoncharge" +j).val(r.operationchargehall[i].halltypeid);
					}
				}
		}
}

function saveGroupCatWiseProCharges()
{
		var operationID = $("#department").val();
		if (operationID == "0") {
			alert("Please Select Procedure Name");
			return false;
		}
		var opcatid = $("#opgrade").val();
		if (opcatid==0||opcatid == "-select-" || opcatid==null || opcatid=="" ) {
			alert("Please Select Procedure Category.");
			return false;
		}
		var sponsrid = $("#listmstr_select_chargesinfo").val();
		if(sponsrid==null || sponsrid==""){
			sponsrid=0;
		}	
		var opcharge = {
				operationchargehall : []
		};
		var hallcount = $("#count").val();
		var anescharge=0;
		var operationGrpId=0;
	
		for(var  i=1;i<=hallcount;i++)
		{
			var surgeonCharge = $.trim($("#surgeoncharge" + i).val());
			if (surgeonCharge == "") {
				surgeonCharge = 0;
				
				
			}
			var hallid = $("#hallid" + i).val();
	
			opcharge.operationchargehall.push({
				'halltypeid':hallid,
				'surgeoncharge':surgeonCharge ,
				'operationCatId':opcatid,
				'operation_id':operationID,
				'sponser_id':sponsrid,
				'anescharge' : anescharge,
				'operationGrpId':operationGrpId
			});
		}
	opcharge = JSON.stringify(opcharge);
	opcharge = opcharge.decodeSpecialChars();
	
	var inputs = [];
	inputs.push('opcharge=' + encodeURIComponent(opcharge));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savegroupcatwiseprocharges",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		alert(r);	
		 clearGroupCatWiseProCharges();
		}
		
	});
}
function expenseVoucherGroup()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/fetchgroupnamevoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setVoucherGroup(r);
			}
	});
		
}
function setVoucherGroup(r)
{
	var list="";
	list=list+ "<select name=''  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.voucherList.length; int++) {

		list=list+'<option  value="'+(r.voucherList[int].voucher_ID)+'" >'+(r.voucherList[int].voucherName)+'</option>';
		}	
	$("#selectVoucherGrp").html(list);
}
function fetchLedgerHead(id)
{
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/fetchledgerhead",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		setLedgerHead(r);
		}
		
	});
}
function setLedgerHead(r)
{

	var list="";
	list=list+ "<select name=''  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.ledger_headList.length; int++) {

		list=list+'<option  value="'+(r.ledger_headList[int].idehat_ledger_heads)+'" >'+(r.ledger_headList[int].voucher_name)+'</option>';
		}	
	$("#selectLedgerHead").html(list);
}
function convertAmountInWords()
{
	var amountPaid = $("#amountPaid").val();
	var reg = /^[0-9]+$/;
	if (amountPaid != "" && !reg.test(amountPaid)&& amountPaid == null )
		{
			alert("Please Enter Only number!");
			$("#amountPaid").val("");
			return false;
		}
	if(amountPaid == undefined || amountPaid == null || amountPaid == "")
		{
		$("#amountInWords").val("");
		return false;
		}
	
	var inputs = [];
	inputs.push('amount=' + amountPaid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/convertamountinwords",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#amountInWords").val(r);
			
		}
		
	});
}