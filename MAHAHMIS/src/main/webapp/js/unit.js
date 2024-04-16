/*NOTE By Amol Saware : For privilege Type in database
Profile = 1
Manually = 2
Role = 3*/

function insertModule(){
	var moduleId = $('#masterModuleId').val();
	if(moduleId=="" || moduleId==null){
		saveModule();
	}
	else{
		updateModule(moduleId);
	}
}

function refreshModuleMaster(){
	$('#masterModuleId').val("");
	$('#moduleName').val("");
	getAllModule();
}

function saveModule(){
	var moduleName = $('#moduleName').val();
	if(moduleName!="" && moduleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/saveModule",
		data : {
			"moduleName" : moduleName
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshModuleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter module name");
	}
}

function getModuleByModuleId(moduleId){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getModuleByModuleId",
		data : {
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#moduleId').val(response.moduleId);
			$('#masterModuleId').val(response.moduleId);
			$('#moduleName').val(response.moduleName);
		}
	});
}

function updateModule(moduleId){
	var moduleName = $('#moduleName').val();
	if(moduleName!="" && moduleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/updateModule",
		data : {
			"moduleId" : moduleId,
			"moduleName" : moduleName
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshModuleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter module name");
	}
}

function deleteModule(moduleId){
	var r = confirm("Are you sure you want to delete module?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/deleteModule",
		data : {
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshModuleMaster();
			alert(response);
		}
	});
	}
}

function changeModule(){
	var moduleId = $('#moduleList').val();
	getAllSubModuleByModuleId(moduleId);
}

function getAllSubModuleByModuleId(moduleId){
	if(moduleId!="" && moduleId!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllSubModuleByModuleId",
		data : {
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var subModuleId = $('#subModuleListSpan').val();
			var selectList = "<option value=''>-Select-</option>";
			if(response.length>0){
				for(var i=0;i<response.length;i++){
					selectList = selectList + "<option value='"+response[i].subModuleId+"'>"+response[i].subModuleName+"</option>";
				}
				$('#subModuleList').html(selectList);
			}
			else{
				$('#subModuleList').html("<option value=''>No sub menu</option>");
			}
			if(subModuleId!="" && subModuleId!=null){
				$('#subModuleList').val(subModuleId);
			}
		}
		});
	}
}

function getAllModule(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "useraccess/getAllModules",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			var tableBody="";
			var index = 1;
			var selectList = "<option value=''>-Select-</option>";
			var moduleTree = "";
			var moduleBody="";
			var printModuleBody="";
			
			var ms="";
			for(var i=0;i<response.length;i++){
				tableBody = tableBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+""
				+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].moduleId+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].moduleName+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getModuleByModuleId("+response[i].moduleId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteModule("+response[i].moduleId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
				
				//for module drop down list
				selectList = selectList + "<option value='"+response[i].moduleId+"'>"+response[i].moduleName+"</option>";
			
				//for module tree
				moduleTree = moduleTree +"<li><a>"+response[i].moduleName+"</a><ul id='module_"+response[i].moduleId+"'></ul></li>";
			
				//for module body
				moduleBody = moduleBody +"<tr id='module_"+response[i].moduleId+"'><td>"+response[i].moduleName+"</td><td><input id='moduleView_"+response[i].moduleId+"' class='moduleView viewAll' value='"+response[i].moduleId+"' type='checkbox'></td><td><input id='moduleEdit_"+response[i].moduleId+"' class='moduleEdit editAll' value='"+response[i].moduleId+"' type='checkbox'></td><td><input id='moduleDelete_"+response[i].moduleId+"' class='moduleDelete deleteAll' value='"+response[i].moduleId+"' type='checkbox'></td><td><button id='showmodule_"+response[i].moduleId+"' onclick=toggle('module_"+response[i].moduleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
				+"<tr style='display:none;' class='module_"+response[i].moduleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'><div class='box border blue'><div class='box-body'><table class='table table-striped'>"+
				"<thead><tr><th>Modules</th><th>View</th><th>Create/Edit</th><th>Delete</th><th>On/Off</th><th>Sub-Module</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"'></tbody></table></div></div></td></tr>";
				
				//for print module body
				printModuleBody = printModuleBody +"<tr id='module_"+response[i].moduleId+"'><td>"+response[i].moduleName+"</td><td><button id='showmodule_"+response[i].moduleId+"' onclick=toggle('module_"+response[i].moduleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
				+"<tr style='display:none;' class='module_"+response[i].moduleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'><table class='table table-bordered table-condensed'>"+
				"<thead><tr><th>Modules</th><th>Value</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"'></tbody></table></td></tr>";
			
				ms=ms+"<option value="+response[i].moduleId+">"+response[i].moduleName+"</option>";			
			}
					
			$("#e2").html(ms);
			
			if(currentPage=="user_access_module_master"){
				$('#moduleId').val(index);
				$('#moduleName').val("");
				$('#masterModuleBody').html(tableBody);
			}
			else if(currentPage=="user_access_sub_module_master" || currentPage=="general_access_print_master" || currentPage=="generalForm"){
				$('#moduleList').html(selectList);
				$('.moduleTree').html(moduleTree);
			}
			else if(currentPage=="user_access" || currentPage=="user_access_profile_master" || currentPage=="user_access_role_master"){
				$('#moduleBody').html(moduleBody);
			}
			else if(currentPage=="general_access_print_access_master"){
				$('#moduleBody').html(printModuleBody);
			}
			//setTimeout(function(){userAccess();},100);
		}
	});
}

function getAllSubModule(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "useraccess/getAllSubModules",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//setTimeout(function(){
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			
			if(currentPage=="user_access_sub_module_master"){
			if(response.length>0){
				$('#subModuleId').val(response.length+1);
			}
			for(var i=0;i<response.length;i++){
				if(response[i].subModId!=null && response[i].subModId!="null" && response[i].subModId!=""){
					$('#module_'+response[i].moduleId+'_'+response[i].subModId).append("<li id='subModule_"+response[i].subModuleId+"' class='moduleLi'><a>"+response[i].subModuleName+"</a><input type='button' class='btn btn-xs btn-primary editUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Edit' onclick='getSubModuleBySubModuleId("+response[i].subModuleId+")' disabled='disabled'><input type='button' class='btn btn-xs btn-danger deleteUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Delete' onclick='deleteSubModule("+response[i].subModuleId+")' disabled='disabled'><ul id='module_"+response[i].moduleId+"_"+response[i].subModuleId+"'></ul></li>");
				}
				else{
					$('#module_'+response[i].moduleId).append("<li id='subModule_"+response[i].subModuleId+"' class='moduleLi'><a>"+response[i].subModuleName+"</a><input type='button' class='btn btn-xs btn-primary editUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Edit' onclick='getSubModuleBySubModuleId("+response[i].subModuleId+")' disabled='disabled'><input type='button' class='btn btn-xs btn-danger deleteUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Delete' onclick='deleteSubModule("+response[i].subModuleId+")' disabled='disabled'><ul id='module_"+response[i].moduleId+"_"+response[i].subModuleId+"'></ul></li>");
				}
			}
			
			$('.moduleTree ul').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					$('#'+ulId).remove();
				}
			});
			
			$('.moduleLi').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					var text = $('#'+ulId).find('a').html();
					$('#'+ulId).find('a').replaceWith("<span style='font-size: 1.3em; color: black;'>"+text+"</span>");
				}
			});
			
			var tree = document.querySelectorAll('ul.moduleTree a:not(:last-child)');
			for(var i = 0; i < tree.length; i++){
			    tree[i].addEventListener('click', function(e) {
			        var parent = e.target.parentElement;
			        var classList = parent.classList;
			        if(classList.contains("open")) {
			            classList.remove('open');
			            var opensubs = parent.querySelectorAll(':scope .open');
			            for(var i = 0; i < opensubs.length; i++){
			                opensubs[i].classList.remove('open');
			            }
			        } else {
			            classList.add('open');
			        }
			    });
			}
			
								$(".moduleLi").hover(
							function() {
								var subModuleId = $(this).attr('id').split("_")[1];
								$('.editSubModuleBtn_'+subModuleId).css("display", "inline");
							},
							function() {
								var subModuleId = $(this).attr('id').split("_")[1];
								$('.editSubModuleBtn_'+subModuleId).css("display", "none");
							});
			}
			else if(currentPage=="user_access" || currentPage=="user_access_profile_master" || currentPage=="user_access_role_master"){
				for(var i=0;i<response.length;i++){
					if(response[i].subModId!=null && response[i].subModId!="null" && response[i].subModId!=""){
						$('#subModuleBody_'+response[i].moduleId+'_'+response[i].subModId).append("<tr id='subModule_"+response[i].subModuleId+"'><td>"+response[i].subModuleName+"</td><td><input id='subModuleView_"+response[i].subModuleId+"' class='subModuleView viewAll moduleView_"+response[i].moduleId+" subModuleView_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleEdit_"+response[i].subModuleId+"' class='subModuleEdit editAll moduleEdit_"+response[i].moduleId+" subModuleEdit_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleDelete_"+response[i].subModuleId+"' class='subModuleDelete deleteAll moduleDelete_"+response[i].moduleId+" subModuleDelete_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleOnOff_"+response[i].subModuleId+"' class='subModuleOnOff viewAll editAll deleteAll moduleView_"+response[i].moduleId+" moduleEdit_"+response[i].moduleId+" moduleDelete_"+response[i].moduleId+" subModuleOnOff_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><button id='showsubModule_"+response[i].subModuleId+"' onclick=toggle('subModule_"+response[i].subModuleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
								+"<tr style='display:none;' class='subModule_"+response[i].subModuleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='6'><div class='box border blue'><div class='box-body'><table class='table table-striped'>"+
								"<thead><tr><th>Modules</th><th>View</th><th>Create/Edit</th><th>Delete</th><th>On/Off</th><th>Sub-Module</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"_"+response[i].subModuleId+"'></tbody></table></div></div></td></tr>");
					}
					else{
						$('#subModuleBody_'+response[i].moduleId).append("<tr id='subModule_"+response[i].subModuleId+"'><td>"+response[i].subModuleName+"</td><td><input id='subModuleView_"+response[i].subModuleId+"' class='subModuleView viewAll moduleView_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleEdit_"+response[i].subModuleId+"' class='subModuleEdit editAll moduleEdit_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleDelete_"+response[i].subModuleId+"' class='subModuleDelete deleteAll moduleDelete_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleOnOff_"+response[i].subModuleId+"' class='subModuleOnOff viewAll editAll deleteAll moduleView_"+response[i].moduleId+" moduleEdit_"+response[i].moduleId+" moduleDelete_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><button id='showsubModule_"+response[i].subModuleId+"' onclick=toggle('subModule_"+response[i].subModuleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
								+"<tr style='display:none;' class='subModule_"+response[i].subModuleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='6'><div class='box border blue'><div class='box-body'><table class='table table-striped'>"+
								"<thead><tr><th>Modules</th><th>View</th><th>Create/Edit</th><th>Delete</th><th>On/Off</th><th>Sub-Module</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"_"+response[i].subModuleId+"'></tbody></table></div></div></td></tr>");
					}
					if(response[i].subModuleType=="1"){
						$("#subModuleView_"+response[i].subModuleId).removeAttr("disabled");
						$("#subModuleEdit_"+response[i].subModuleId).removeAttr("disabled");
						$("#subModuleDelete_"+response[i].subModuleId).removeAttr("disabled");
						
						$("#subModuleOnOff_"+response[i].subModuleId).removeClass();
					}
					else{
						$("#subModuleOnOff_"+response[i].subModuleId).removeAttr("disabled");
						
						$("#subModuleView_"+response[i].subModuleId).removeClass();
						$("#subModuleEdit_"+response[i].subModuleId).removeClass();
						$("#subModuleDelete_"+response[i].subModuleId).removeClass();
						
					}
				}
				
				$('#moduleBody tbody').map(function(){
					var tableId = this.id;
					var rowCount = $('#'+tableId +' tr').length;
					if(rowCount == 0){
						var removeTable = $('#'+tableId).closest('tr').attr('class');
						$('.'+removeTable).remove();
						$('#'+removeTable).find('button').remove();
					}
				});
			}
		//},350);
		}
	});
}

function toggle(id){
	$('.'+id).toggle('slow');
	$('#show'+id).children().toggleClass('fa-chevron-down fa-chevron-up');
}

function insertSubModule(){
	var subModuleId = $('#masterSubModuleId').val();
	if(subModuleId=="" || subModuleId==null){
		saveSubModule();
	}
	else{
		updateSubModule(subModuleId);
	}
}

function refreshSubModuleMaster(){
	$('#masterSubModuleId').val("");
	$('#subModuleName').val("");
	$('#subModuleType').val("1");
	$('#moduleList').val("");
	$('#subModuleList').val("");
	getAllModule();
	getAllSubModule();
}

function saveSubModule(){
	var subModuleName = $('#subModuleName').val();
	var moduleId = $('#moduleList').val();
	var subModId = $('#subModuleList').val();
	var subModuleType = $('#subModuleType').val();
	if(subModuleName=="" || subModuleName==null){
		alert("Please enter sub module name");
	}
	else if(moduleId=="" || moduleId==null){
		alert("Please select module");
	}
	else{
		jQuery.ajax({
			type : "POST",
			url : "useraccess/saveSubModule",
			data : {
				"subModuleName" : subModuleName,
				"moduleId" : moduleId,
				"subModId" : subModId,
				"subModuleType" : subModuleType
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshSubModuleMaster();
				alert(response);
				setTimeout(function(){userAccess();},100);
			}
		});
	}
}

function getSubModuleBySubModuleId(subModuleId){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getSubModuleBySubModuleId",
		data : {
			"subModuleId" : subModuleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			getAllSubModuleByModuleId(response.moduleId);
			$('#subModuleId').val(response.subModuleId);
			$('#masterSubModuleId').val(response.subModuleId);
			$('#subModuleName').val(response.subModuleName);
			$('#moduleList').val(response.moduleId);
			$('#subModuleType').val(response.subModuleType);
			if(subModuleId!=response.subModId && response.subModId!=null && response.subModId!="null"){
				$('#subModuleListSpan').val(response.subModId);
			}
			else{
				$('#subModuleListSpan').val(response.subModId);
			}
		}
	});
}

function updateSubModule(subModuleId){
	var subModuleName = $('#subModuleName').val();
	var moduleId = $('#moduleList').val();
	var subModId = $('#subModuleList').val();
	var subModuleType = $('#subModuleType').val();
	if(subModuleName=="" || subModuleName==null){
		alert("Please enter sub module name");
	}
	else if(moduleId=="" || moduleId==null){
		alert("Please select module");
	}
	else{
		jQuery.ajax({
			type : "POST",
			url : "useraccess/updateSubModule",
			data : {
				"subModuleId" : subModuleId,
				"subModuleName" : subModuleName,
				"moduleId" : moduleId,
				"subModId" : subModId,
				"subModuleType" : subModuleType
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshSubModuleMaster();
				alert(response);
				setTimeout(function(){userAccess();},100);
			}
		});
	}
}

function deleteSubModule(subModuleId){
	var r = confirm("Are you sure you want to delete sub module?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/deleteSubModule",
		data : {
			"subModuleId" : subModuleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshSubModuleMaster();
			alert(response);
			setTimeout(function(){userAccess();},100);
		}
	});
	}
}

function insertProfile(){
	var profileId = $('#masterProfileId').val();
	if(profileId=="" || profileId==null){
		saveProfile();
	}
	else{
		updateProfile(profileId);
	}
}

function refreshProfileMaster(){
	$('#masterProfileId').val("");
	$('#profileName').val("");
	$('#moduleBody :checkbox').map(function(){
		$('#'+this.id).prop('checked', false);
	});
	getAllProfile();
}

function saveProfile(){
	var profileName = $('#profileName').val();
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(profileName!="" && profileName!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/saveProfile",
		data : {
			"profileName" : profileName,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshProfileMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter profile name");
	}
}

function updateProfile(profileId){
	var profileName = $('#profileName').val();
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(profileName!="" && profileName!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/updateProfile",
		data : {
			"profileId" : profileId,
			"profileName" : profileName,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshProfileMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter profile name");
	}
}

function getProfileByProfileId(profileId){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getProfileByProfileId",
		data : {
			"profileId" : profileId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#profileId').val(response.profileId);
			$('#masterProfileId').val(response.profileId);
			$('#profileName').val(response.profileName);
			$('#moduleBody :checkbox').map(function(){
				$('#'+this.id).prop('checked', false);
			});
			if(response.userModuleAccessView!=null && response.userModuleAccessView!=""){
				var moduleViewAccess=response.userModuleAccessView.split(",");
				for(var i=0;i<moduleViewAccess.length;i++){
					$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessEdit!=null && response.userModuleAccessEdit!=""){
				var moduleEditAccess=response.userModuleAccessEdit.split(",");
				for(var i=0;i<moduleEditAccess.length;i++){
					$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessDelete!=null && response.userModuleAccessDelete!=""){
				var moduleDeleteAccess=response.userModuleAccessDelete.split(",");
				for(var i=0;i<moduleDeleteAccess.length;i++){
					$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessView!=null && response.userSubModuleAccessView!=""){
				var subModuleViewAccess=response.userSubModuleAccessView.split(",");
				for(var i=0;i<subModuleViewAccess.length;i++){
					$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessEdit!=null && response.userSubModuleAccessEdit!=""){
				var subModuleEditAccess=response.userSubModuleAccessEdit.split(",");
				for(var i=0;i<subModuleEditAccess.length;i++){
					$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessDelete!=null && response.userSubModuleAccessDelete!=""){
				var subModuleDeleteAccess=response.userSubModuleAccessDelete.split(",");
				for(var i=0;i<subModuleDeleteAccess.length;i++){
					$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleOnOff!=null && response.userSubModuleOnOff!=""){
				var subModuleOnOffAccess=response.userSubModuleOnOff.split(",");
				for(var i=0;i<subModuleOnOffAccess.length;i++){
					$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
				}
			}
			
		}
	});
}

function deleteProfile(profileId){
	var r = confirm("Are you sure you want to delete profile?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/deleteProfile",
		data : {
			"profileId" : profileId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshProfileMaster();
			alert(response);
		}
	});
	}
}

function getAllProfile(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllProfile",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			var tableBody="";
			var index = 1;
			var profileList = "<option value=''></option>";
			for(var i=0;i<response.length;i++){
				tableBody = tableBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+""
				+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].profileId+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].profileName+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getProfileByProfileId("+response[i].profileId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteProfile("+response[i].profileId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
			
				profileList = profileList + "<option value='"+response[i].profileId+"'>"+response[i].profileName+"</option>";
			}
			if(currentPage=="user_access_profile_master"){
			$('#profileMasterBody').html(tableBody);
			$('#profileId').val(index);
			}
			if(currentPage=="user_access_role_master"){
				$('#profileList').html(profileList);
				$(function() {
			        $('.chosen-select').chosen();
			        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
			      });
			}
			if(currentPage=="user_access"){
				$('#profileList').html(profileList);
			}
			setTimeout(function(){userAccess();},200);
		}
	});
}

$(document).on('change', '#moduleBody input[type="checkbox"]', function () { 
	var id = $(this).attr('id');
	if ($(this).is(':checked')) {
        $('.'+id).prop("checked",true);
    }
	else{
		$('.'+id).prop("checked",false);
	}
});

function selectAll(value){
	if ($("#"+value).is(':checked')) {
        $('.'+value).prop("checked",true);
    }
	else{
		$('.'+value).prop("checked",false);
	}
}

$(document).on('change', 'input[name="privilegesType"]', function () { 
	var value = $(this).val();
	if (value == "1") {
		$('#profileDiv').show();
		$('#roleTableDiv').hide();
    }
	else{
		 $('#profileDiv').hide();
		 $('#roleTableDiv').show();
		 var profileId = $('#profileList').val();
		 $('#moduleBody :checkbox').map(function(){
			$('#'+this.id).prop('checked', false);
		 });
		 getProfileAccessByProfile(profileId);
	}
});

function getProfileAccessByProfile(profileId){
	if(profileId!=null && profileId!=""){
		 jQuery.ajax({
				type : "POST",
				url : "useraccess/getProfileAccessByProfile",
				data : {
					"profileId" : profileId.toString()
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					$('#moduleBody :checkbox').map(function(){
						$('#'+this.id).prop('checked', false);
					});
					for(var j=0;j<response.length;j++){
						if(response[j].userModuleAccessView!=null && response[j].userModuleAccessView!=""){
							var moduleViewAccess=response[j].userModuleAccessView.split(",");
							for(var i=0;i<moduleViewAccess.length;i++){
								$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessEdit!=null && response[j].userModuleAccessEdit!=""){
							var moduleEditAccess=response[j].userModuleAccessEdit.split(",");
							for(var i=0;i<moduleEditAccess.length;i++){
								$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessDelete!=null && response[j].userModuleAccessDelete!=""){
							var moduleDeleteAccess=response[j].userModuleAccessDelete.split(",");
							for(var i=0;i<moduleDeleteAccess.length;i++){
								$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessView!=null && response[j].userSubModuleAccessView!=""){
							var subModuleViewAccess=response[j].userSubModuleAccessView.split(",");
							for(var i=0;i<subModuleViewAccess.length;i++){
								$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessEdit!=null && response[j].userSubModuleAccessEdit!=""){
							var subModuleEditAccess=response[j].userSubModuleAccessEdit.split(",");
							for(var i=0;i<subModuleEditAccess.length;i++){
								$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessDelete!=null && response[j].userSubModuleAccessDelete!=""){
							var subModuleDeleteAccess=response[j].userSubModuleAccessDelete.split(",");
							for(var i=0;i<subModuleDeleteAccess.length;i++){
								$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleOnOff!=null && response[j].userSubModuleOnOff!=""){
							var subModuleOnOffAccess=response[j].userSubModuleOnOff.split(",");
							for(var i=0;i<subModuleOnOffAccess.length;i++){
								$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
							}
						}
					}
				}
			});
	 }
}

function getRoleAccessByRole(roleId){
	if(roleId!=null && roleId!=""){
		 jQuery.ajax({
				type : "POST",
				url : "useraccess/getRoleAccessByRole",
				data : {
					"roleId" : roleId.toString()
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					$('#moduleBody :checkbox').map(function(){
						$('#'+this.id).prop('checked', false);
					});
					if(response[0].privilegeType == "1"){
						getProfileAccessByProfile(response[0].profileId);
					}
					else{
					for(var j=0;j<response.length;j++){
						if(response[j].userModuleAccessView!=null && response[j].userModuleAccessView!=""){
							var moduleViewAccess=response[j].userModuleAccessView.split(",");
							for(var i=0;i<moduleViewAccess.length;i++){
								$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessEdit!=null && response[j].userModuleAccessEdit!=""){
							var moduleEditAccess=response[j].userModuleAccessEdit.split(",");
							for(var i=0;i<moduleEditAccess.length;i++){
								$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessDelete!=null && response[j].userModuleAccessDelete!=""){
							var moduleDeleteAccess=response[j].userModuleAccessDelete.split(",");
							for(var i=0;i<moduleDeleteAccess.length;i++){
								$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessView!=null && response[j].userSubModuleAccessView!=""){
							var subModuleViewAccess=response[j].userSubModuleAccessView.split(",");
							for(var i=0;i<subModuleViewAccess.length;i++){
								$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessEdit!=null && response[j].userSubModuleAccessEdit!=""){
							var subModuleEditAccess=response[j].userSubModuleAccessEdit.split(",");
							for(var i=0;i<subModuleEditAccess.length;i++){
								$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessDelete!=null && response[j].userSubModuleAccessDelete!=""){
							var subModuleDeleteAccess=response[j].userSubModuleAccessDelete.split(",");
							for(var i=0;i<subModuleDeleteAccess.length;i++){
								$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleOnOff!=null && response[j].userSubModuleOnOff!=""){
							var subModuleOnOffAccess=response[j].userSubModuleOnOff.split(",");
							for(var i=0;i<subModuleOnOffAccess.length;i++){
								$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
							}
						}
					}
					}
				}
			});
	 }
}

function insertRole(){
	var roleId = $('#masterRoleId').val();
	if(roleId=="" || roleId==null){
		saveRole();
	}
	else{
		updateRole(roleId);
	}
}

function refreshRoleMaster(){
	$('#masterRoleId').val("");
	$('#roleName').val("");
	$('#moduleBody :checkbox').map(function(){
		$('#'+this.id).prop('checked', false);
	});
	$('#profileList').val("");
	$('.chosen-select').chosen().trigger("chosen:updated");
	$('#privilege_1').prop('checked', true);
	$('#profileDiv').show();
	$('#roleTableDiv').hide();
	getAllRole();
}

function saveRole(){
	var roleName = $('#roleName').val();
	var privilegesType = $('input[name=privilegesType]:checked').val();
	var profileId = $('#profileList').val();
	if(profileId!=null && profileId!=""){
		profileId = profileId.toString();
	}
	else{
		profileId = "";
	}
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(roleName!="" && roleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/saveRole",
		data : {
			"roleName" : roleName,
			"privilegesType" : privilegesType,
			"profileId" : profileId,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter role name");
	}
}

function updateRole(roleId){
	var roleName = $('#roleName').val();
	var privilegesType = $('input[name=privilegesType]:checked').val();
	var profileId = $('#profileList').val();
	if(profileId!=null && profileId!=""){
		profileId = profileId.toString();
	}
	else{
		profileId = "";
	}
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(roleName!="" && roleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/updateRole",
		data : {
			"roleId" : roleId,
			"roleName" : roleName,
			"privilegesType" : privilegesType,
			"profileId" : profileId,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter role name");
	}
}

function getRoleByRoleId(roleId){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getRoleByRoleId",
		data : {
			"roleId" : roleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var profileArray = [];
			$('#roleId').val(response.roleId);
			$('#masterRoleId').val(response.roleId);
			$('#roleName').val(response.roleName);
			$('#privilege_'+response.privilegesType).attr("checked","checked");
			$('#moduleBody :checkbox').map(function(){
				$('#'+this.id).prop('checked', false);
			});
			if (response.privilegesType == "1") {
				$('#profileDiv').show();
				$('#roleTableDiv').hide();
		    }
			else{
				 $('#profileDiv').hide();
				 $('#roleTableDiv').show();
			}
			if(response.profileId!=null && response.profileId!=""){
				var profileId=response.profileId.split(",");
				for(var i=0;i<profileId.length;i++){
					profileArray.push(profileId[i]);
				}
			}
			$('#profileList').val(profileArray);
			if(response.userModuleAccessView!=null && response.userModuleAccessView!=""){
				var moduleViewAccess=response.userModuleAccessView.split(",");
				for(var i=0;i<moduleViewAccess.length;i++){
					$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessEdit!=null && response.userModuleAccessEdit!=""){
				var moduleEditAccess=response.userModuleAccessEdit.split(",");
				for(var i=0;i<moduleEditAccess.length;i++){
					$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessDelete!=null && response.userModuleAccessDelete!=""){
				var moduleDeleteAccess=response.userModuleAccessDelete.split(",");
				for(var i=0;i<moduleDeleteAccess.length;i++){
					$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessView!=null && response.userSubModuleAccessView!=""){
				var subModuleViewAccess=response.userSubModuleAccessView.split(",");
				for(var i=0;i<subModuleViewAccess.length;i++){
					$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessEdit!=null && response.userSubModuleAccessEdit!=""){
				var subModuleEditAccess=response.userSubModuleAccessEdit.split(",");
				for(var i=0;i<subModuleEditAccess.length;i++){
					$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessDelete!=null && response.userSubModuleAccessDelete!=""){
				var subModuleDeleteAccess=response.userSubModuleAccessDelete.split(",");
				for(var i=0;i<subModuleDeleteAccess.length;i++){
					$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleOnOff!=null && response.userSubModuleOnOff!=""){
				var subModuleOnOffAccess=response.userSubModuleOnOff.split(",");
				for(var i=0;i<subModuleOnOffAccess.length;i++){
					$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
				}
			}
			$('.chosen-select').chosen().trigger("chosen:updated");
			
			if(roleId<11){
				$('#roleName').attr('disabled','disabled');
			}else{
				$('#roleName').removeAttr('disabled');
			}
			
		}
	});
}

function deleteRole(roleId){
	var r = confirm("Are you sure you want to delete role?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/deleteRole",
		data : {
			"roleId" : roleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoleMaster();
			alert(response);
		}
	});
	}
}

function getAllRole(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllRole",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			var tableBody="";
			var index = 1;
			var roleList = "<option value=''></option>";
			
			for(var i=0;i<response.length;i++){
				tableBody = tableBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+""
				+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].roleId+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].roleName+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getRoleByRoleId("+response[i].roleId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button id='deleteRole_"+index+"' class='btn btn-xs btn-success deleteUserAccess' onclick='deleteRole("+response[i].roleId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
				
				roleList = roleList + "<option value='"+response[i].roleId+"'>"+response[i].roleName+"</option>";
			}
			$('#roleMasterBody').html(tableBody);
			$('#roleId').val(index);
			
			if(currentPage=="user_access"){
				$('#roleList').html(roleList);
				$(function() {
			        $('.chosen-select').chosen();
			        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
			    });
				$('#profileList_chosen').hide();
			}
			for(var j=1;j<11;j++){
				$("#deleteRole_"+j).removeClass('deleteUserAccess').prop("disabled", true ).removeAttr("onclick");
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

$(document).on('change', 'input[name="accessType"]', function () { 
	var value = $(this).val();
	if (value == "3") {
		$('#roleDiv').show();
		$('#profileList_chosen').hide();
		$('#tableDiv').hide();
    }
	else if (value == "1"){
		$('#roleDiv').hide();
		$('#profileList_chosen').show();
		$('#tableDiv').hide();
	}
	else if (value == "2"){
		$('#moduleBody :checkbox').map(function(){
			$('#'+this.id).prop('checked', false);
		});
		$('#roleDiv').hide();
		$('#profileList_chosen').hide();
		$('#tableDiv').show();
		var accessType=$('#accessTypeBeforeChange').val();
		if(accessType == "3"){
			var roleId = $('#roleList').val();
			getRoleAccessByRole(roleId);
		}
		else if(accessType == "1"){
			var profileId = $('#profileList').val();
			getProfileAccessByProfile(profileId);
		}
	}
	$('#accessTypeBeforeChange').val(value);
});

function userAccessAutoSuggestion(startIndex){
	var search = $('#searchUser').val();
	jQuery.ajax({
		type : "POST",
		url : "useraccess/userAccessAutoSuggestion",
		data : {
			"search" : search,
			"startIndex" : startIndex
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var userTableBody = "";
			if(response.usersList.length > 0){
				$('#start').html(parseInt(startIndex)+1);
				var last="";
				if($('#start').html()!=""){
					last = parseInt($('#start').html())+response.usersList.length-1;
				}
				else{
					last = response.usersList.length;
				}
				$('#last').html(last);
				if(startIndex=="0"){
				var numberOfRows="";
				var index=1;
				var count=response.count;
				var numberOfPages=Math.ceil((count/10));
				var displayPagination=numberOfPages;
				$('#total').html(count);
				if(numberOfPages>5){
					/*numberOfRows +="<li class='disabled'><a	id='userAccessFirst'>First</a></li>"
						+"<li class='disabled'><a onclick='previousPagination("+index+","+Math.round(numberOfPages)+")' id='userAccessPrev'>Previous</a></li>";*/
					displayPagination=5;
				}
				for(var j=0;j<displayPagination;j++){
					numberOfRows +="<li onclick='userAccessAutoSuggestion("+(parseInt(index)-1)+"0)'><a>"+index+"</a></li>";
					index=index+1;
				}
				if(numberOfPages>=6){
					numberOfRows +="<li><a onclick='nextPagination("+index+","+Math.round(numberOfPages)+")' id='userAccessNext'>Next</a></li>"
						 +"<li onclick='userAccessAutoSuggestion("+(parseInt(numberOfPages)-1)+"0)'><a id='userAccessLast'>Last</a></li>";
				}
				$('#userPagination').html(numberOfRows);
			}
			for(var i=0;i<response.usersList.length;i++){
				var first = (response.usersList[i].firstName).substring(0, 1);
				var last = (response.usersList[i].lastName).substring(0, 1);
				userTableBody = userTableBody +"<tr id='user_"+response.usersList[i].userId+"' class='gradeX'><td><span class='badge'>"+first+""+last+"</span> "+response.usersList[i].fullName+"</td><td>"+response.usersList[i].userName+"</td><td class='hidden-xs'>"+response.usersList[i].emailId+"</td><td>"+response.usersList[i].role+"</td></tr>";
			}
			}
			else{
				userTableBody = userTableBody +"<tr><td class='center' colspan='4'><b>No results found...</b></td></tr>";
			}
			$('#userTableBody').html(userTableBody);
			
			if(search == ""){
				$('#paginationDiv').show();
			}
			else{
				$('#paginationDiv').hide();
			}
		}
	});
}

$(document).on('click', '#userPagination li', function () {
	$(this).addClass('active').siblings().removeClass('active');
});

function nextPagination(currentIndex,numberOfPages){
	var numberOfRows ="<li onclick='userAccessAutoSuggestion(0)'><a id='userAccessFirst'>First</a></li>"
		+"<li><a onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='userAccessPrev'>Previous</a></li>";
	var displayPagination=currentIndex+5;
	if(numberOfPages < displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='userAccessAutoSuggestion("+(parseInt(currentIndex)-1)+"0)'><a>"+currentIndex+"</a></li>";
		currentIndex=currentIndex+1;
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +="<li><a onclick='nextPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='userAccessNext'>Next</a></li>"
			 +"<li onclick='userAccessAutoSuggestion("+(parseInt(numberOfPages)-1)+"0)'><a id='userAccessLast'>Last</a></li>";
	}
	$('#userPagination').html(numberOfRows);
}

function previousPagination(currentIndex,numberOfPages){
	var numberOfRows ="";
	var displayPagination=currentIndex-5;
	if(currentIndex > 6){
		numberOfRows ="<li onclick='userAccessAutoSuggestion(0)'><a id='userAccessFirst'>First</a></li>"
			+"<li><a onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")' id='userAccessPrev'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='userAccessAutoSuggestion("+(j-1)+"0)'><a>"+j+"</a></li>";
	}
	numberOfRows +="<li><a onclick='nextPagination("+j+","+Math.round(numberOfPages)+")' id='userAccessNext'>Next</a></li>"
			 +"<li onclick='userAccessAutoSuggestion("+(numberOfPages-1)+"0)'><a id='userAccessLast'>Last</a></li>";
	$('#userPagination').html(numberOfRows);
}

$(document).on('click', '#userTableBody tr', function () {
	var id = $(this).attr("id");
	var userId = id.split("_")[1];
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getUser",
		data : {
			"userId" : userId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(response) {
			window.location.href = "user_access.jsp";
		}
	});
});

function saveUserAccess(){
	var userId = $('#masterUserId').val();
	var privilegesType = $('input[name=accessType]:checked').val();
	var roleId = $('#roleList').val();
	var profileId = $('#profileList').val();
	if(roleId!=null && roleId!=""){
		roleId = roleId.toString();
	}
	if(profileId!=null && profileId!=""){
		profileId = profileId.toString();
	}
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	jQuery.ajax({
		type : "POST",
		url : "useraccess/saveUserAccess",
		data : {
			"userId" : userId,
			"privilegesType" : privilegesType,
			"roleId" : roleId,
			"profileId" : profileId,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alertify.success(response);
		}
	});
}

function getActiveUserCount(){
jQuery.ajax({
	type : "POST",
	url : "useraccess/getActiveUserCount",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		alert('error');
	},
	success : function(response) {
		$('#loginUsers').html(response);
	}
});
}

function getSoftwareUserCount(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getSoftwareUserCount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#softwareUsers').html(response);
		}
	});
}

function getNewUserCount(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getNewUserCount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#newUsers').html(response);
		}
	});
}

function getUsersLoginOrNew(type){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getUsersLoginOrNew",
		data : {
			"type" : type
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#userDisplayModal').modal('show');
			var userDisplayBody = "";
			var index = 1;
			if(response.length=="0"){
				userDisplayBody = userDisplayBody +"<tr><td class='center' colspan='6'><b>No users found...</b></td></tr>";
			}
			for(var i=0;i<response.length;i++){
				userDisplayBody = userDisplayBody +"<tr class='gradeX'><td>"+index+"</td><td>"+response[i].fullName+"</td><td>"+response[i].userName+"</td><td class='hidden-xs'>"+response[i].emailId+"</td><td>"+response[i].role+"</td><td class='signIn' style='display: none;'>"+response[i].signInTime+"</td><td class='softwareUser' style='display: none;'>"+response[i].softwareUsed+"</td></tr>";
				index++;
			}
			$('#userDisplayBody').html(userDisplayBody);
			if(type=="new"){
				$('#userDisplayModalTitle').html("New Users");
				$('.signIn').hide();
				$('.softwareUser').show();
			}else if(type=="login"){
				$('#userDisplayModalTitle').html("Login Users");
				$('.signIn').show();
				$('.softwareUser').hide();
			}
		}
	});
}

//For print master
function insertPrint(){
	var printId = $('#masterPrintId').val();
	if(printId=="" || printId==null){
		savePrint();
	}
	else{
		updatePrint(printId);
	}
}

function refreshPrintMaster(){
	$('#masterPrintId').val("");
	$('#printName').val("");
	$('#moduleList').val("");
	getAllModule();
	getAllPrint();
}

function savePrint(){
	var printName = $('#printName').val();
	var moduleId = $('#moduleList').val();
	
	if(printName == "" || printName == null){
		alert("Please Enter Print Name!!!");
		return false;
	}else if(moduleId == "" || moduleId == null || moduleId == undefined){
		alert("Please Select Module Name!!!");
		return false;
	}else{
		
	jQuery.ajax({
		type : "POST",
		url : "useraccess/savePrint",
		data : {
			"printName" : printName,
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshPrintMaster();
			alert(response);
		}
	});
	}
}

function updatePrint(){
	var printId = $('#masterPrintId').val();
	var printName = $('#printName').val();
	var moduleId = $('#moduleList').val();
	if(printName!="" && printName!=null){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/updatePrint",
		data : {
			"printId" : printId,
			"printName" : printName,
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshPrintMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter print name");
	}
}

function getPrintByPrintId(printId){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getPrintByPrintId",
		data : {
			"printId" : printId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#printId').val(response.printId);
			$('#masterPrintId').val(response.printId);
			$('#printName').val(response.printName);
			$('#moduleList').val(response.moduleId);
		}
	});
}

function deletePrint(printId){
	var r = confirm("Are you sure you want to delete print?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/deletePrint",
		data : {
			"printId" : printId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshPrintMaster();
			alert(response);
		}
	});
	}
}

function getAllPrint(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllPrint",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			
			if(currentPage=="general_access_print_master"){
			if(response.length>0){
				$('#printId').val(response.length+1);
			}
			for(var i=0;i<response.length;i++){
				$('#module_'+response[i].moduleId).append("<li id='print_"+response[i].printId+"' class='printLi'><a>"+response[i].printName+"</a><input type='button' class='btn btn-xs btn-primary editUserAccess editPrintBtn_"+response[i].printId+"' value='Edit' onclick='getPrintByPrintId("+response[i].printId+")' diabled='disabled'><input type='button' class='btn btn-xs btn-danger deleteUserAccess editPrintBtn_"+response[i].printId+"' value='Delete' onclick='deletePrint("+response[i].printId+")' diabled='disabled'><ul id='module_"+response[i].moduleId+"_"+response[i].printId+"'></ul></li>");
			}
			
			$('.moduleTree ul').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					$('#'+ulId).remove();
				}
			});
			
			$('.printLi').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					var text = $('#'+ulId).find('a').html();
					$('#'+ulId).find('a').replaceWith("<span style='font-size: 1.3em; color: black;'>"+text+"</span>");
				}
			});
			
			var tree = document.querySelectorAll('ul.moduleTree a:not(:last-child)');
			for(var i = 0; i < tree.length; i++){
			    tree[i].addEventListener('click', function(e) {
			        var parent = e.target.parentElement;
			        var classList = parent.classList;
			        if(classList.contains("open")) {
			            classList.remove('open');
			            var opensubs = parent.querySelectorAll(':scope .open');
			            for(var i = 0; i < opensubs.length; i++){
			                opensubs[i].classList.remove('open');
			            }
			        } else {
			            classList.add('open');
			        }
			    });
			}
			
								$(".printLi").hover(
							function() {
								var printId = $(this).attr('id').split("_")[1];
								$('.editPrintBtn_'+printId).css("display", "inline");
							},
							function() {
								var printId = $(this).attr('id').split("_")[1];
								$('.editPrintBtn_'+printId).css("display", "none");
							});
			}
			
			else if(currentPage=="general_access_print_access_master"){
				for(var i=0;i<response.length;i++){
						$('#subModuleBody_'+response[i].moduleId).append("<tr id='print_"+response[i].printId+"'><td>"+response[i].printName+"</td><td><input onkeyup='validateNumbers(event)' id='printAccess_"+response[i].printId+"' class='printAccess' type='text'></tr>");
				}
				
				$('#moduleBody tbody').map(function(){
					var tableId = this.id;
					var rowCount = $('#'+tableId +' tr').length;
					if(rowCount == 0){
						var removeTable = $('#'+tableId).closest('tr').attr('class');
						$('.'+removeTable).remove();
						$('#'+removeTable).find('button').remove();
					}
				});
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

function savePrintAccess(){
	var printAccess = [];
	$('.printAccess').map(function(){
		var value = this.value;
		var id = this.id;
		  if(value!="" && value!=null){
			  printAccess.push(id.split("_")[1]+"_"+value);
		  }
	});
	if(printAccess!=null && printAccess.length>0){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/savePrintAccess",
		data : {
			"printAccess" : printAccess
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alert(response);
		}
	});
	}
	else{
		alert("Please enter at least one value");
	}
}

function getAllPrintAccess(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllPrintAccess",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			for(var i=0;i<response.length;i++){
				$('#printAccess_'+response[i].printId).val(response[i].printAccess);
			}
		}
	});
}
//End of print master

//For Login History
function getAllUser(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllUser",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var loginHistoryUser = "<option value='0'>All</option>";
			for(var i=0;i<response.length;i++){
				loginHistoryUser +="<option value='"+response[i].userId+"'>"+response[i].fullName+"</option>";
			}
			$('#loginHistoryUser').html(loginHistoryUser);
			
			$(function() {
		        $('.chosen-select').chosen();
		        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
		    });
		}
	});
}

function getLoginHistory(userId,startIndex){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getLoginHistory",
		timeout : 1000 * 60 * 5,
		cache : false,
		data : {
			"userId" : userId,
			"startIndex" : startIndex
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			var loginHistoryBody = "";
			if(response.loginHistory.length > 0){
				$('#paginationDiv').show();
				$('#start').html(parseInt(startIndex)+1);
				var last="";
				if($('#start').html()!=""){
					last = parseInt($('#start').html())+response.loginHistory.length-1;
				}
				else{
					last = response.loginHistory.length;
				}
				$('#last').html(last);
				if(startIndex=="0"){
				var numberOfRows="";
				var index=1;
				var count=response.count;
				var numberOfPages=Math.ceil((count/10));
				var displayPagination=numberOfPages;
				$('#total').html(count);
				if(numberOfPages>5){
					/*numberOfRows +="<li class='disabled'><a	id='userAccessFirst'>First</a></li>"
						+"<li class='disabled'><a onclick='previousPagination("+index+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";*/
					displayPagination=5;
				}
				for(var j=0;j<displayPagination;j++){
					numberOfRows +="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(index)-1)+"0)'><a>"+index+"</a></li>";
					index=index+1;
				}
				if(numberOfPages>=6){
					numberOfRows +="<li><a onclick='nextLoginHistoryPagination("+index+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
						 +"<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(numberOfPages)-1)+"0)'><a id='loginHistoryLast'>Last</a></li>";
				}
				$('#userPagination').html(numberOfRows);
			}
			for(var i=0;i<response.loginHistory.length;i++){
				loginHistoryBody = loginHistoryBody +"<tr><td>"+response.loginHistory[i].fullName+"</td><td>"+response.loginHistory[i].remoteIp+"</td><td>"+response.loginHistory[i].signInTime+"</td><td>"+response.loginHistory[i].signOutTime+"</td><td>"+response.loginHistory[i].status+"</td></tr>";
			}
			}
			else{
				loginHistoryBody = loginHistoryBody +"<tr><td class='center' colspan='5'><b>No results found...</b></td></tr>";
				$('#paginationDiv').hide();
			}
			$('#loginHistoryBody').html(loginHistoryBody);
			
		}
	});
}

function nextLoginHistoryPagination(currentIndex,numberOfPages){
	var numberOfRows ="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+",0)'><a id='loginHistoryFirst'>First</a></li>"
		+"<li><a onclick='previousLoginHistoryPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";
	var displayPagination=currentIndex+5;
	if(numberOfPages < displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(currentIndex)-1)+"0)'><a>"+currentIndex+"</a></li>";
		currentIndex=currentIndex+1;
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +="<li><a onclick='nextLoginHistoryPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
			 +"<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(numberOfPages)-1)+"0)'><a id='loginHistoryLast'>Last</a></li>";
	}
	$('#userPagination').html(numberOfRows);
}

function previousLoginHistoryPagination(currentIndex,numberOfPages){
	var numberOfRows ="";
	var displayPagination=currentIndex-5;
	if(currentIndex > 6){
		numberOfRows ="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+",0)'><a id='loginHistoryFirst'>First</a></li>"
			+"<li><a onclick='previousLoginHistoryPagination("+displayPagination+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(j-1)+"0)'><a>"+j+"</a></li>";
	}
	numberOfRows +="<li><a onclick='nextLoginHistoryPagination("+j+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
			 +"<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(numberOfPages-1)+"0)'><a id='loginHistoryLast'>Last</a></li>";
	$('#userPagination').html(numberOfRows);
}

//End of Login History