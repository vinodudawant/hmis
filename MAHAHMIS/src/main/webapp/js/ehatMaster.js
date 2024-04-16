
/*$(document).ready( function() { 
	setNewTemp("unitMaster");
	getUnitCount();//count of total unit
	getDeptCount();//count of total dept
	getServiceCount();//count of total service
 });
*/
function handleHomePageTooltips() {
	
	//Default tooltip (Top)
	$('.tip-focus').tooltip({
		trigger: 'focus'
	});
}
/***********
 * @author	: Touheed Khan
 * @date	: 18/May/2017
 * @base	: To Set New template on that div
 ***********/
function setNewTemp(id){
	//making active tag
	$(".ehatList").removeClass("active");
	$("#"+id).addClass("active");
	if (id=="unitMaster"){
		temForUnit(id);
		handleHomePageTooltips();
		getAllUnit();
		
		$("#stateId").select2();
		$("#distictId").select2();
		$("#typeId").select2();
		$("#hospitalId").select2();	
		$("#yearId").select2();		
		getAllCenterMaster();
		getAllStateMasterForCenter();
		getAllTypeMasterForCenter();
		getAllHospitalMasterForCenter();
		getAllYearMasterForCenter();
		getCountOfActiveUnit();
		
	}else if (id=="deptMaster") {			
		temForDept(id);
		handleHomePageTooltips();
		getViewDepts();
	}else if (id=="servMaster") {
		temForService(id);
		handleHomePageTooltips();
		getAllServices();
		 $('#hiddenImport').val(id);
		
	}else if (id=="subServMaster") {
		temForSubService(id);
		handleHomePageTooltips();
		fetchSubServiceList();
		fetchAllService();
		
		$("#hInfoUnitId").select2();
		getAllUnitForHospitalInfo();//Added By Annapurna
		 $('#hiddenImport').val(id);
		
	}else if (id=="chrgsMaster") {
		temForChrgs(id);
		handleHomePageTooltips();
		getChargesMasterList();
	}else if (id=="subChrgsMaster") {
		temForSubChrgs(id);
		handleHomePageTooltips();
		getAllChargesMaster();
		getChargesMasterSlaveList();		
		$('#hiddenImport').val(id);
		$("#listmstr_select").val($('#listmstr_select option:eq(2)').val()).trigger('change');
		 
	}
	
	setTimeout(function(){userAccess();},300);
}

/***********
 * @author	: Sagar Kadam
 * @date	: 13/09/2017
 * @base	: To Set New template on that div
 ***********/
function setNewTempProcess(id){
	//making active tag
	$(".ehatList").removeClass("active");
	$("#"+id).addClass("active");
	if (id=="processMaster"){
		temForActivities(id);
		handleHomePageTooltips();
		getAllProcess();
	}
}

	//for Activities UI
	function temForActivities(callFrom){
		var htm= 			
				'<form class="form-horizontal col-md-4" role="form">'
				+ '<div class="form-group">'
				+ ' <label class="col-sm-4 control-label">Activities Name</label>'
				+ '<div class="col-sm-8">'
				+ '<input class="form-control tip-focus" title="Please enter process name" id="processName" type="text" placeholder="Acitivities Name">'
				+ '</div></div></form>'
				
				+'<form class="form-horizontal col-md-4" role="form">'
				+ '<div class="form-group">'
				+ ' <label class="col-sm-4 control-label">Activities Code</label>'
				+ '<div class="col-sm-8">'
				+ '<input class="form-control tip-focus" title="Please enter Activities code" id="processCode" type="text" placeholder="Activities Code">'
				+ '</div></div></form>'
				
				+'<form class="form-horizontal col-md-4 hidden" role="form">'
				+ '<div class="form-group">'
				+ ' <label class="col-sm-4 control-label">Activities ID</label>'
				+ '<div class="col-sm-8">'
				+ '<input class="form-control" id="processId" type="text" placeholder="This is focused...">'
				+ '</div></div></form>'
		
				+ '<form class="form-horizontal col-md-3" role="form">	'													
				+ '<div class="form-group">'
				+ '<label class="col-sm-4 control-label"></label>'	
				+ '<div class="col-sm-4">'	
				+ '<input type="button"  class="btn btn-success" onclick="saveProcess()" value="Submit"></div>'
				+ '<div class="col-sm-4">'
				+ '<input type="button"  class="btn btn-info" onclick="refreshProcessMaster()" value="Refresh">'	
				+ '</div> </div></form>'		
				;
		
		$("#divEhatContent").html(htm);
		
		$("#searchlabel").html('<input class="form-control input-sm" id="byName" onkeyup="setPMaster()" '
								+' type="text" placeholder="Search" aria-controls="datatable1">');
	}
	
	

//for Unit UI
function temForUnit(callFrom){
	var htm= 	
			'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">State Name</label>'
			+ '<div class="col-sm-8">'
			+ '<select id="stateId" name="document" style="width:100%" onchange="getAllDistrictBystateId()"><option value="0">Select</option> </select>	'
			+ '</div></div></form>'
		
		
			+'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">District Name</label>'
			+ '<div class="col-sm-8">'
			+ '<select id="distictId" name="document" style="width:100%"><option value="0">Select</option></select>'
			+ '</div></div></form>'
			
			+'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">Type Name</label>'
			+ '<div class="col-sm-8">'
			+ '<select id="typeId" name="document" style="width:100%"><option value="0">Select</option> </select>	'
			+ '</div></div></form>'
			
			+'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">Hospital Code</label>'
			+ '<div class="col-sm-8">'
			+ '<select id="hospitalId" name="document" style="width:100%"><option value="0">Select</option> </select>	'
			+ '</div></div></form>'
			
			+'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">Year</label>'
			+ '<div class="col-sm-8">'
			+ '<select id="yearId" name="document" style="width:100%"><option value="0">Select</option> </select>	'
			+ '</div></div></form>'
		
		
			+'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">Unit Name</label>'
			+ '<div class="col-sm-8">'
			+ '<input class="form-control tip-focus" title="Please enter unit name" id="unitName" type="text" placeholder="Unit Name">'
			+ '</div></div></form>'
			
			+'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">Unit Code</label>'
			+ '<div class="col-sm-8">'
			+ '<input class="form-control tip-focus" title="Please enter unit code" id="unitCode" type="text" placeholder="Unit Code">'
			+ '</div></div></form>'
			
			+ '<div class="form-group col-md-2" style="width:18%;"> '
			+ '	<div class="col-sm-9"> '
			+ '		<label for="input-type" class="control-label">Is Active</label> '
			+ '		<div id="input-type" class="row"> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '					name="optradio" id="comb" class="iscomb" value="Y" '
			+ '					type="radio" />Yes '
			+ '				</label> '
			+ '			</div> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '				 name="optradio" id="ncomb" class="iscomb" value="N" '
			+ '				 type="radio" checked="checked"/>No '
			+ '				</label> '
			+ '			</div> '
			+ '		</div> '
			+ '	</div> '
			+ '</div> '
			
			
			+'<form class="form-horizontal col-md-4 hidden" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">Unit ID</label>'
			+ '<div class="col-sm-8">'
			+ '<input class="form-control" id="unitId" type="text" placeholder="This is focused...">'
			+ '</div></div></form>'
	
			+ '<form class="form-horizontal col-md-3" role="form">	'													
			+ '<div class="form-group">'
			+ '<label class="col-sm-4 control-label"></label>'	
			+ '<div class="col-sm-4">'	
			+ '<input type="button"  class="btn btn-success" onclick="insertMaster()" value="Submit"></div>'
			+ '<div class="col-sm-4">'
			+ '<input type="button"  class="btn btn-warning" onclick="refreshUnitMaster()" value="Refresh">'	
			+ '</div> </div></form>'
			+ '<input type="hidden" id="activeId" value="0">'

			;
	
	$("#divEhatContent").html(htm);
	
	$("#searchlabel").html('<input class="form-control input-sm" id="byName" onkeyup="setUnitMaster(this.id)" '
							+' type="text" placeholder="Search" aria-controls="datatable1">');
}

//for Dept ui
function temForDept(callFrom){
	var htm= 			
			'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-5 control-label">Department Name</label>'
			+ '<div class="col-sm-7">'
			+ '<input class="form-control tip-focus" title="Please enter department name" id="deptName" type="text" placeholder="Department Name">'
			+ '</div></div></form>'
			
			+'<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-5 control-label">Department Code</label>'
			+ '<div class="col-sm-7">'
			+ '<input class="form-control tip-focus" title="Please enter department code" id="deptCode" type="text" placeholder="Department Code">'
			+ '</div></div></form>'
			
			+'<form class="form-horizontal col-md-4 hidden" role="form">'
			+ '<div class="form-group">'
			+ ' <label class="col-sm-4 control-label">Department ID</label>'
			+ '<div class="col-sm-8">'
			+ '<input class="form-control " id="deptId" type="text" placeholder="This is focused...">'
			+ '</div></div></form>'
	
			+ '<form class="form-horizontal col-md-3" role="form">	'													
			+ '<div class="form-group">'
			+ '<label class="col-sm-4 control-label"></label>'	
			+ '<div class="col-sm-4">'	
			+ '<input type="button"  class="btn btn-success editUserAccess" disabled onclick="saveDept()" value="Submit"></div>'
			+ '<div class="col-sm-4">'
			+ '<input type="button"  class="btn btn-info" onclick="refreshDeptMaster()" value="Refresh">'	
			+ '</div> </div></form>'		
			
			+ '<div class="form-group col-md-4"> '
			+ '	<div class="col-sm-6"> '
			+ '		<label for="input-type" class="control-label">Is Clinical</label> '
			+ '		<div id="input-type" class="row"> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '					name="optradio" id="clin" class="iscat" value="Y" '
			+ '					type="radio" checked="checked" />Yes '
			+ '				</label> '
			+ '			</div> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '				 name="optradio" id="nclin" class="iscat" value="N" '
			+ '				 type="radio" />No '
			+ '				</label> '
			+ '			</div> '
			+ '		</div> '
			+ '	</div> '
			+ '</div> '
			
			+ '<div class="form-group col-md-4"> '
			+ '	<div class="col-sm-6"> '
			+ '		<label for="input-type" class="control-label">Is Commertial</label> '
			+ '		<div id="input-type" class="row"> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '					name="optradio1" id="cm" class="iscom" value="Y" '
			+ '					type="radio" checked="checked" />Yes '
			+ '				</label> '
			+ '			</div> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '				 name="optradio1" id="ncm" class="iscom" value="N" '
			+ '				 type="radio" />No '
			+ '				</label> '
			+ '			</div> '
			+ '		</div> '
			+ '	</div> '
			+ '</div> ';
	
	$("#divEhatContent").html(htm);
	
	$("#searchlabel").html('<input class="form-control input-sm" id="userName" onkeyup="setDeptMaster(this.id)" '
			+' type="text" placeholder="Search" aria-controls="datatable1">');
}

//for Service 
function temForService(callFrom){
	var htm= 	 
			 '<div class="form-group col-md-3" style="width:18%;"> '
			+ ' <label class="control-label">Service Name</label>'
 			+ '<input   class="form-control input-SmallText col-md-7 form-control tip-focus" title="Please enter service name" id="serviceName" type="text" placeholder="Service Name" maxlength="150">'
			+ '</div>'
			
 			+ '<div class="form-group col-md-3" style="width:18%;"> '
			+ ' <label class="control-label">Service Code</label>'
 			+ '<input class="form-control input-SmallText col-md-7 form-control tip-focus" title="Please enter service code" id="serviceCode" type="text" placeholder="Service Code">'
			+ '</div> '
			
 			+ '<div class="form-group col-md-1" style="width:2%;display:none;"> '
			+ ' <label class="control-label">Service ID</label>'
 			+ '<input class="form-control input-SmallText col-md-7 form-control tip-focus" id="serviceId" type="text" placeholder="This is focused...">'
			+ '</div> '
	 
			+ '<div class="form-group col-md-2" style="width:18%;"> '
			+ '	<div class="col-sm-9"> '
			+ '		<label for="input-type" class="control-label">Is Combination</label> '
			+ '		<div id="input-type" class="row"> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '					name="optradio" id="comb" class="iscomb" value="Y" '
			+ '					type="radio" />Yes '
			+ '				</label> '
			+ '			</div> '
			+ '			<div class="col-sm-6"> '
			+ '				<label class="radio-inline"> <input '
			+ '				 name="optradio" id="ncomb" class="iscomb" value="N" '
			+ '				 type="radio" checked="checked"/>No '
			+ '				</label> '
			+ '			</div> '
			+ '		</div> '
			+ '	</div> '
			+ '</div> '
			 
			+ '<div class="form-group col-md-2" style="width:28%;"> '
			+ '<label class="control-label"></label>'	
			+ '<div class="col-sm-4" style="width:33%;">'	
			+ '<input type="button"  class="btn btn-success editUserAccess" disabled onclick="saveService()" value="Submit"></div>'
			+ '<div class="col-sm-4">'
			+ '<input type="button"  class="btn btn-info" onclick="resetServiceMaster()" value="Refresh">'		
			+ '</div>'
			
			
			+'</div>'
			
			+ '<div class="form-group col-md-2" style="width:0%;"> '
			
			+ '<form name="importExcelForm" id="importExcelForm">'	
			+ '<div class="col-sm-4" style="width:33%;">'	
			+ '<input type="file" required="" id="importFile" name="file"></div>'
			+ '<div class="col-sm-4">'
			+ '<input type="submit" class="btn btn-xs btn-info editUserAccess" disabled onclick="importMasterExcel();" value="Start Import">'		
			+ '</div></form></div>'
			
			;
	
	$("#divEhatContent").html(htm);
	
	$("#searchlabel").html('<input class="form-control input-sm" id="byName" onkeyup="setServiceMaster(this.id)" '
			+' type="text" placeholder="Search" aria-controls="datatable1">');
}


//for Sub Service ui
function temForSubService(callFrom){
	//alert("DDDDDDDD");
	var htm= 	
		
		
		' <div class="form-group col-md-3" style="display: none;"> '
		+ '	<label class="control-label col-md-4-1">Master of Mater</label> <input '
		+ '		id="subId" type="text" placeholder="Slave ID" '
		+ '		style="background-color: #ddd" '
		+ '		class="form-control input-SmallText col-md-7-1" '
		+ '		readonly="readonly" style="margin-left:0%;" value="0" /> '
		+ ' </div> '
		
		+ '<div class="form-group col-md-3"> ' 		
		+ '	<div class="form-group"> '
		+ '		<div class="col-md-12"> ' 
		+ '			<select class="col-md-12" name="listmstr" id="listmstr_select" '
		+ '				style="width: 100%" '
		+ '				onchange="setDyanamicDiv2(\'dynamicItem\',this.id)"> '
		+ '				<option id="firstElmt">--- Select Service Master ---</option> '
		+ '			</select> '
		+ '			<div class="col-md-12 select2-container select2-container-multi " '
		+ '				style="margin-top: 2%; width: 100%"> '
		+ '				<ul id="dynamicItem" class="select2-choices" '
		+ '					style="overflow-y: scroll; min-height: 70px"> '
		+ '				</ul> '
		+ '			</div> '
		+ '		</div> '
		+ '	</div> '
		+ '</div> ' 

		+ '<div class="form-group col-md-3"> '
		+ '	<label class="control-label">Sub Service Name </label> <input '
		+ '		id="categoryName" type="text" placeholder="Category Name" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="Please enter sub service" required '
		+ '		maxlength="150" /> '
		+ '</div> '	

		+ '<div class="form-group col-md-3"> ' 
		+ '	<label class="control-label">Sub Service Code Name </label> <input '
		+ '		id="codeName" type="text" placeholder="Code Name" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="Please enter code name" required maxlength="150" /> ' 
		+ '</div> '
		
		+ '<div class="form-group col-md-3"> ' 
		+ '	<label class="control-label">Charges</label> <input '
		+ '		id="charges" type="text" placeholder="Charges" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="Please enter charges" required maxlength="150" /> ' 
		+ '</div> '
		
		+ '<div class="form-group col-md-3"> ' 
		+ '	<label class="control-label">B2B Charges</label> <input '
		+ '		id="b2bcharges" type="text" placeholder="B2B Charges" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" value="0" '
		+ '		title="Please enter b2bcharges" required maxlength="150" /> ' 
		+ '</div> '
		
		+ '<div class="form-group col-md-3"> ' 
		+ '	<label class="control-label">CGHSCode</label> <input '
		+ '		id="cgscode" type="text" placeholder="CGHSCode" '
		+ '		class="form-control input-SmallText col-md-7 form-control " '
		+ '		title="Please enter CGHSCode"  maxlength="150" /> ' 
		+ '</div> '
		
		//Added By Annapurna
		
		+ '<div class="form-group col-md-3">'
		+ ' <label class="control-label">Unit Name <b style="color: red;">*</b></label>'
		+ '<select class="col-md-7" id="hInfoUnitId" name="hInfoUnitId"style="width:100%"><option value="0">Select</option> </select>	'
		+ '</div>'
	
		+ '<div class="form-group col-md-3"> '
		+ '	<div class="col-sm-6"> '
		+ '		<label for="input-type" class="control-label">Is Category</label> '
		+ '		<div id="input-type" class="row"> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '					name="privilegesType" id="isCategory" value="Y" '
		+ '					type="radio" checked="checked" />Yes '
		+ '				</label> '
		+ '			</div> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '				 name="privilegesType" id="NoCategor" value="N" '
		+ '				 type="radio" />No '
		+ '				</label> '
		+ '			</div> '
		+ '		</div> '
		+ '	</div> '
		+ '</div> '
		
		+ '<div class="form-group col-md-3"> '
		+ '	<div class="col-sm-6"> '
		+ '		<label for="input-type" class="control-label">Is Modify</label> '
		+ '		<div id="input-type" class="row"> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '					name="privilegesModify" id="isModify" value="Y" '
		+ '					type="radio" checked="checked" />Yes '
		+ '				</label> '
		+ '			</div> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '				 name="privilegesModify" id="noModify" value="N" '
		+ '				 type="radio" />No '
		+ '				</label> '
		+ '			</div> '
		+ '		</div> '
		+ '	</div> '
		+ '</div> '
		
//		+ ' <div class="form-group col-md-3">'		
//		+ ' <div class="col-sm-4">'
		+ '<div class="form-group col-md-2" style="width:28%;"> '
		+ '<label class="control-label"></label>'	
		+ '<div class="col-sm-4" style="width:33%;">'	
		+ ' 	<input type="button"  class="btn btn-success"  onclick="saveSubService()" value="Submit">'	
		+ ' </div> '
		+ ' <div class="col-sm-4">'	
		+ ' 	<input type="button"  class="btn btn-primary" onclick="refreshSubService()" value="Refresh">'
		+ ' </div> '
		+ '</div> '
		
		+ '<div class="form-group col-md-2" style="width:0%;"> '
		
		+ '<form name="importExcelForm" id="importExcelForm">'	
		+ '<div class="col-sm-4" style="width:33%;">'	
		+ '<input type="file" required="" id="importFile" name="file"></div>'
		+ '<div class="col-sm-4">'
		+ '<input type="submit" class="btn btn-xs btn-info editUserAccess"  onclick="importMasterExcel();" value="Start Import">'		
		+ '</div></form></div>'
		
		; 
	
	$("#divEhatContent").html(htm);	
	$("#listmstr_select").select2();
	
	$("#searchlabel").html('<input class="form-control input-sm" id="byName" onkeyup="setSubServiceMaster(this.id)" '
			+' type="text" placeholder="Search" aria-controls="datatable1">');
}


// for Charges Ui
function temForChrgs(callFrom) {
	var htm = '<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ '<label class="col-sm-4 control-label">Charges Name</label>'
			+ '<div class="col-sm-8">'
			+ '<input class="form-control tip-focus" title="Please enter charges name" id="chargesName" type="text" placeholder="Charges Name">'
			+ '</div></div></form>'

			+ '<form class="form-horizontal col-md-4" role="form">'
			+ '<div class="form-group">'
			+ '<label class="col-sm-4 control-label">Charges Code</label>'
			+ '<div class="col-sm-8">'
			+ '<input class="form-control tip-focus" title="Please enter charges code" id="codeName" type="text" placeholder="Charges Code">'
			+ '</div></div></form>'

			+ '<form class="form-horizontal col-md-4 hidden" role="form">'
			+ '<div class="form-group">'
			+ '<label class="col-sm-4 control-label">Charges ID</label>'
			+ '<div class="col-sm-8">'
			+ '<input class="form-control" id="chargesId" type="text" placeholder="This is focused...">'
			+ '</div></div></form>'
			
//			+ ' <div class="form-group Remove-Padding col-md-3">'		
//			+ ' <div class="col-sm-4">'
			+ '<div class="form-group col-md-2" style="width:28%;"> '
			+ '<label class="control-label"></label>'	
			+ '<div class="col-sm-4" style="width:33%;">'
			+ ' 	<input type="button"  class="btn btn-success"  onclick="saveChargesMaster()" value="Submit">'	
			+ ' </div> '
			+ ' <div class="col-sm-4">'	
			+ ' 	<input type="button"  class="btn btn-primary" onclick="refreshChargesMaster()" value="Refresh">'
			+ ' </div> '		
			+ '</div> '; 

	$("#divEhatContent").html(htm);	
	
	$("#searchlabel").html('<input class="form-control input-sm" id="byName" onkeyup="setAutoCompleteForChargesMaster2(this.id)" '
			+' type="text" placeholder="Search" aria-controls="datatable1">');
}

// for sub Charges Ui
function temForSubChrgs(callFrom) {
	var htm =

		' <div class="form-group col-md-4" style="display: none;"> '
		+ '	<label class="control-label col-md-4-1">Sub ID</label> <input '
		+ '		id="slaveId" type="text" placeholder="Slave ID" '
		+ '		style="background-color: #ddd" '
		+ '		class="form-control input-SmallText col-md-7-1" '
		+ '		readonly="readonly" style="margin-left:0%;" value="0" /> '
		+ ' </div> '
		
		+ '<div class="form-group col-md-4"> ' 
		+ '	<div class="form-group"> '
		+ '		<div class="col-md-12"> ' 
		+ '			<select class="col-md-8" name="listmstr" id="listmstr_select" '
		+ '				style="width: 100%" '
		+ '				onchange="setDyanamicDivForCharges(\'dynamicItem\',this.id)"> '
		+ '				<option id="firstElmt">--- Select Charges Master ---</option> '
		+ '			</select> '
		+ '			<div class="col-md-12 select2-container select2-container-multi " '
		+ '				style="margin-top: 2%; width: 100%"> '
		+ '				<ul id="dynamicItem" class="select2-choices" '
		+ '					style="overflow-y: scroll; min-height: 70px"> '
		+ '				</ul> '
		+ '			</div> '
		+ '		</div> '
		+ '	</div> '
		+ '</div> ' 

		+ '<div class="form-group col-md-3"> '
		+ '	<label class="control-label">Sub-Charges Name </label> <input '
		+ '		id="categoryName" type="text" placeholder="Sub-Charges Name" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="Please enter Sub charges name" required '
		+ '		maxlength="150" /> '
		+ '</div> '

		+ '<div class="form-group col-md-2"> ' 
		+ '	<label class="control-label">Sub-charges Code Name </label> <input '
		+ '		id="codeName" type="text" placeholder="Code Name" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="Please enter code name" required maxlength="150" /> ' 
		+ '</div> '
		
		+ '<div class="form-group col-md-2"> ' 
		+ '	<label class="control-label" style="display:none">Sub-charges Number </label> <input '
		+ '		id="numbr" type="text" placeholder="Number" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="Please enter Number" required maxlength="150" style="display:none" value="0" /> ' 
		+ '</div> '
		
		+ '<div class="form-group col-md-1"> ' 
		+ '	<label class="control-label" style="display:none">Discount </label> <input '
		+ '		id="disc" type="text" value=0 placeholder="Number" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="%" required maxlength="3" onblur="checkDisc()" style="display:none"/> ' 
		+ '</div> '

		+ '<div class="form-group col-md-3"> '
		+ '	<div class="col-sm-6"> '
		+ '		<label for="input-type" class="control-label">Is Category</label> '
		+ '		<div id="input-type" class="row"> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '					name="privilegesTypes" id="isCategorys" value="Y" '
		+ '					type="radio" checked="checked"  onclick="showFollowupCountDiv()"/>Yes '
		+ '				</label> '
		+ '			</div> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '				 name="privilegesTypes" id="NoCategors" value="N" '
		+ '				 type="radio"  onclick="showFollowupCountDiv()"/>No '
		+ '				</label> '
		+ '			</div> '
		+ '		</div> '
		+ '	</div> '
		+ '	<div class="col-sm-6"> '
		+ '		<label for="input-type" class="control-label">Is PPN</label> '
		+ '		<div id="input-type" class="row"> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '					name="ppnTypes" id="yesPpn" value="Y" '
		+ '					type="radio"  />Yes '
		+ '				</label> '
		+ '			</div> '
		+ '			<div class="col-sm-6"> '
		+ '				<label class="radio-inline"> <input '
		+ '				 name="ppnTypes" id="noPpn" value="N" '
		+ '				 type="radio" checked="checked" />No '
		+ '				</label> '
		+ '			</div> '
		+ '		</div> '
		+ '	</div> '
		+ '</div> '
		+ '	</div> '
		
		+ '<div class="form-group col-md-2" style="display:none" id="followUpDiv"> ' 
		+ '	<label class="control-label">Follow Up Count </label> <input '
		+ '		id="followUpCount" type="text" placeholder="Follow Up Count" '
		+ '		class="form-control input-SmallText col-md-7 form-control tip-focus" '
		+ '		title="Please enter follow up count " required maxlength="150" value="0" /> ' 
		+ '</div> '
		
//		+ ' <div class="form-group col-md-3">'		
//		+ ' <div class="col-sm-4">'
		+ '<div class="form-group col-md-2" style="width:28%;"> '
		+ '<label class="control-label"></label>'	
		+ '<div class="col-sm-4" style="width:33%;">'
		+ ' 	<input type="button"  class="btn btn-success"  onclick="saveChargesMasterSlave()" value="Submit">'	
		+ ' </div> '
		+ ' <div class="col-sm-4">'	
		+ ' 	<input type="button"  class="btn btn-primary" onclick="refreshChargesMasterSlave()" value="Refresh">'
		+ ' </div> '		
		+ '</div> ' 
		
	+ '<div class="form-group col-md-3" style="width:0%;"> '
	
	+ '<form name="importExcelForm" id="importExcelForm">'	
	+ '<div class="col-sm-6" style="width:33%;">'	
	+ '<input type="file" required="" id="importFile" name="file"></div>'
	+ '<div class="col-sm-4" style="width:33%;">'
	+ '<input type="submit" class="btn btn-xs btn-info editUserAccess" disabled onclick="importMasterExcel();" value="Start Import">'		
	+ '</div></form></div>';

	$("#divEhatContent").html(htm);
	$("#listmstr_select").select2();	
	
	$("#searchlabel").html('<input class="form-control input-sm" id="byName2" onkeyup="setSubChargesMaster(this.id)" '
			+' type="text" placeholder="Search" aria-controls="datatable1">');
}

function checkDisc(){
	if(!($("#NoCategors").is(':checked'))){
		alert("Is not final catagary!!!");
		$("#disc").val(0);
	}
}

function showFollowupCountDiv(){
	var callFrom = $("input:radio[name='privilegesTypes']:checked").val();
	
	  if(callFrom == "Y"){
		  $("#followUpDiv").hide();
	  }else if(callFrom == "N"){
		  $("#followUpDiv").show();
	  }
}

/***********
 * @author	: BILAL
 * @date	: 02-02-2018
 * @base	: For Import Masters excel  dynamically 
 ***********/
function importMasterExcel(dynamicUrl){
	
	var hiddenImport=$('#hiddenImport').val();
	
	var dynamicUrl ="";
	
	//dynamically setting setting the action and URL 
	if (hiddenImport == "servMaster") {
		
		dynamicUrl="ehat/subservice/importservices";
	
	}else if (hiddenImport == "subServMaster") {
		
		dynamicUrl="ehat/subservice/importSubservices";
	
	}else if (hiddenImport == "subChrgsMaster") {
		dynamicUrl="ehat/chargesSlave/importSubcharges";
		
	}
	
	
	$('#importExcelForm').submit(function(event){
		 
		  event.preventDefault();
		  var fileName=$('#importFile').val();
		  if(fileName!="" && fileName!=null){
			
			  var formData = new FormData($(this)[0]);
			  $('#pleaseWait').show();
			  $.ajax({
			    url: ''+dynamicUrl+'',
			    type: 'POST',
			    data: formData,
			    async: false,
			    cache: false,
			    contentType: false,
			    processData: false,
			    success: function (returndata) {
			      alert(returndata);
			      if (hiddenImport == "servMaster") {
			    	  getAllServices();
			    	  $('#importFile').val("");
			  	}else if (hiddenImport == "subServMaster") {
			  		getAllUnitForHospitalInfo();//Added By Annapurna			  		
					fetchSubServiceList();
					fetchAllService();
					$('#importFile').val("");
			  	}else if (hiddenImport == "subChrgsMaster") {
			  		getChargesMasterSlaveList();
					getAllChargesMaster();
					$('#importFile').val("");
			  	}
			      $('#pleaseWait').hide();
			    }
			  });
			  return false;
		  }
		  else{
			  alert("Please select file first");
		  }
		});
}

