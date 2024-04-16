 //@sagar-13-09-2017-Save
function saveProcess() {
	 
	var processId= $('#processId').val(); 
	var unitName = $('#processName').val(); 
	var processCode = $('#processCode').val();
	
	if(unitName=="" || unitName=="undefined" || unitName==null){
		
		$("#unitName").focus();					
		return false;
	}
	if(processCode=="" || processCode=="undefined" || processCode==null){
		
		$("#processCode").focus();	
		return false;
	}	

	if(processId == "" || processId == null || processId == undefined){
		processId = 0;
	}
	 
	var inputs = [];	
	inputs.push('processName=' + unitName);
	inputs.push('processCode=' + processCode);
	inputs.push('processId=' + processId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/process/save",
		data	: str + "&reqType=AJAX",
	 
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			refreshPMaster();
			getAllProcess();
			
		}
	});	
}

 
//@sagar-13-09-2017-fetsch
function getAllProcess() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/process/fetchProcessList",

				success : function(r) {
					
					console.log(r);
					setTemplateForProcess(r);//call template
				}
			});
}

//@sagar-13-09-2017-template

function setTemplateForProcess(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Process ID</th>'
						+ '<th class="col-md-1 center">Process Name</th>'
						+ '<th class="col-md-1 center">UProcessnit Code</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.lstProcess.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.lstProcess[int].processId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="pId'+(r.lstProcess[int].processId) +'" class="col-md-1 center">'+ (r.lstProcess[int].processId)+ '</td>'
								+ '<td id="pName'+(r.lstProcess[int].processId) +'" class="col-md-1 center">'+ (r.lstProcess[int].processName)+ ' </td>'
								+ '<td  id="pCode'+(r.lstProcess[int].processId) +'" class="col-md-1 center">'+ (r.lstProcess[int].processCode)+ ' </td>'
								/*+ '<td class="col-md-1 center"><div> <input class=btn btn-xs btn-success style=font-size: 10px; type=button value=Edit onclick=editUnit('+ r.lstProcess[int].processId+ ')/></div> </td>'
								+ '<td class="col-md-1 center"><div> <input style=font-size: 10px; type=button value=Delete onclick=deleteUnit('+ r.lstProcess[int].processId + ')/></div> </td>'
								*/
								/*+ '<td class="col-md-1 center"><td class= col-md-1> <button id=btnEdit '
								+r.lstProcess[int].processId+' onclick=editUnit() value=EDIT> <i class="fa fa-save"></i> Edit</button> </td> '*/
							+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit1'+r.lstProcess[int].processId+' onclick="editProcess('+r.lstProcess[int].processId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete '+r.lstProcess[int].processId+' onclick=deleteProcess('+r.lstProcess[int].processId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.lstProcess[int].processId+">"+r.lstProcess[int].processName+"</option>";
	}
	
	$("#masterModuleBody").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
		
}
//@sagar-13-09-2017-delete

function deleteProcess(processId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Charges Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/process/deleteProcessMaster",
			data : {
				"processId" : processId
			},
			timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				refreshPMaster();
				getAllProcess();
			}
			
		});
	}
}
//@sagar-13-09-2017-edit
 function editProcess(processId) {

	$('#processId').val(processId);
	$('#processName').val($('#pName' + processId).html());
	$('#processCode').val($('#pCode' + processId).html());

}

//@sagar-13-09-2017-refresh
 function refreshPMaster() {
	$('#processId').val("0");
	$('#processName').val("");
	$('#processCode').val("");
	getAllProcess();
}

 
//@sagar-13-09-2017-search
 function setPMaster(inputId) {

	var usertype = "";
	var letter="";
	letter=$("#byName").val();
	
	var findingName = $("#" + inputId).val();

	
		var inputs = [];
		
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/process/autoSuggestionProcessMasterNames",
			 
			success : function(r) {
				setTemplateForProcess(r);
			}
		});
	}


//@sagar-13-09-2017-discharge page dynamic set process master
 function processTemplateIPD() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/process/fetchProcessList",

				success : function(r) {
					
					console.log(r);
					setTemplateForIPDProcess(r);//call template
				}
			});
}

//@sagar-13-09-2017-discharge page dynamic set process master
 function setTemplateForIPDProcess(r){
	var masterModuleBody="";
	/*var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Process ID</th>'
						+ '<th class="col-md-1 center">Process Name</th>'
						+ '<th class="col-md-1 center">UProcessnit Code</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';*/
	for ( var int = 0; int < r.lstProcess.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
		+'<td style="width:"><label class="TextFont"  >'+(int+1)+'</label></td> '
		+ '<td style="width:;"><label class="TextFont" id="activity'+(int+1)+'">'+r.lstProcess[int].processName+'</label></td> '
		+ '<td style="display:none;"><label class="TextFont" id="activityId'+(int+1)+'">'+r.lstProcess[int].processId+'</label></td> '
		+ '<td style="width:; text-align: center;"><input type="text"  onmouseover="click2(this)" class="form-control input-SmallText  "  readonly="readonly" id="discharge_Time'+(int+1)+'"/></td>'
		//+ '<td style="width:; text-align: center;"> <input type="text" readonly="readonly" id="TDLTime" style="margin-top: 12px;" class="form-control input-SmallText TextFont col-md-7-1" onmouseover="click2(this)"/></td>'
		
		+'<td style="width: px;"><input type="text" id="staffresp'+(int+1)+'" class="form-control input-SmallText" /></td>'
		+'<td style="width: px;"><input type="text" id="remark'+(int+1)+'"class="form-control input-SmallText" /></td>'
		+'<td style="width: px;"><input type="checkbox" id="checkbox'+int+'" name="proCheck" value="'+(int+1)+'"/></td>'
 								+ '</tr>';
		
 		 
	}
	
	//$("#masterModuleBody").html(masterModuleBody);
	$("#processTbody").html(masterModuleBody);
		
}
   