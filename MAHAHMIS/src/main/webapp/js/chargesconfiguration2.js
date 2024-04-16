/**@Author    :BILAL
 * @Date      :23-10-2017
 * @Code      :For getting list of sub services with hall***/
function fetchlistservicesHall() {
	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subservice/SubServiceListCatN",

		error : function() {
			alert('error');
			
		},
		success : function(response) {
			
			servicesInfoTemplate(response);
		}
	});
}

/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for setting template of services and Hall***/
function servicesInfoTemplate(response) {
	$('#pleaseWait').show();
	var index = 0;
	var htm = "";
	
	
	//var tHead = "<tr>"; 
	var tHead = "";
	for(var i=0; i<response.lstsubcharges.length; i++){
		tHead = tHead + "<th  style='width: 183px;'>"+ response.lstsubcharges[i].categoryName 
				+"<input type='hidden' class='hallid' id='th"+(i)+"' value='"
				+response.lstsubcharges[i].slaveId+"'>" 
				
				+"<input type='hidden' class='hallid' id='thselfid"+(i)+"' value='"
				+response.lstsubcharges[i].selfId+"'>" 
				
				+"<input type='hidden' class='hallid' id='thisCategory"+(i)+"' value='"
				+response.lstsubcharges[i].isCategory+"'></th>"
				;
	}
	//tHead = tHead+"</tr>";
	$("#serviceHeader").html(tHead);
	var i = 0; 
	for ( i = 0; i < response.lstSubService.length; i++) {
		
		var slaveId=0;
		htm = htm
				+ "<tr><td  style='height: 21.5px; width: 183px;'>"
				+ (index+1)
				+ "</td><td  id='serviceNames"
				+ (index+1)
				+ "' style='height: 21.5px; width: 183px;'>"
				+ response.lstSubService[i].categoryName
				+ "</td>"
				
				+ "<td  id='servicecharges"
				+ (index+1)
				+ "' style='height: 21.5px; width: 183px;'>"
				+ response.lstSubService[i].charges
				+ "</td>"
				
				+"<input type='hidden' "
				+ " value='"+ response.lstSubService[i].subId+"' style='width: 10%;' class='subserviceIds' id='subid"+(i)+"' >";
				
		
		for ( var j = 0; j < response.lstsubcharges.length; j++) {
			slaveId =response.lstsubcharges[j].slaveId;
		
			if (slaveId > 0) {
				
				htm = htm	
				+ "<td style='height: 21.5px; width: 183px;'>"
				+"<input type='text' "
				+ " value='"+ response.lstSubService[i].charges+"'  class='"+slaveId+"' id='td"+(response.lstSubService[i].subId)+"td"+slaveId+"'" +
						"onkeypress=' return validateNumbers(event)' > "
				
				+"<input type='hidden' "
				+ " value='"+ slaveId+"'  class='hallslaveId' id='hallid"+slaveId+(i)+"' >";

				+ "</td>";
			}
		}	
		
		+"</tr>";
		index++;
	}

	$("#servicesDiv").html(htm);
	fetchhallwiseservices('insert');
}


/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for auto suggestion of services***/
function setDatahallwise(inputId) {

	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#setDatabyName").val();
	}
	var findingName = $("#" + inputId).val();
    if(findingName.length == 0){
    	var dynamicItem="dynamicItem";
    	var id="listmstr_select";
    	removeInpuntFild(dynamicItem,id,1);
    }
	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/setdatahallandser",

		success : function(r) {

			servicesInfoTemplate(r);

		}
	});
} 

/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for multiple select of services ***/
$(document).ready(function() {
	App.setPage("wizards_validations"); 
	App.init(); 
	FormWizard.init();
});

function multiSelectnew(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	$("#listmstr_select").html(list);
}
/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for setting dynamically list on UL ***/
function setDyanamicDiv(setDiv, getDiv) {

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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {

		fetchAllService();
	} else {
		
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		
	}

}
/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for removing select of services ***/
function removeInpuntFild(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {
		fetchAllService();
		window.location.reload(true);
	} else {
		
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		
	}
}
/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for multiple select of slave  ***/
function multiSelectnewSlave(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';
	}
	$("#listmstr_select").html(list);
}

/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for fetching all services***/
function fetchAllService() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		
		success : function(response) {
			multiSelectnew(response);
			//fetchlistservicesHall();
		}
	});

}
/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for fetching all Headers***/
function fetchHeaderList() {
	$('#pleaseWait').show();
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/subservice/SubServiceListCatN",

			error : function() {
				alert('error');
			},
			success : function(response) {
				
				servicesHeaders(response);
			}
		});
		$('#pleaseWait').hide();
	}
/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for setting all services***/
function servicesHeaders(response) {
	
	var tHead = "<tr>";
	for(var i=0; i<response.lstsubcharges.length; i++){
		tHead = tHead + "<th  style='width: 183px;'>"+ response.lstsubcharges[i].categoryName 
				+"<input type='hidden' class='hallid' id='th"+(i)+"' value='"
				+response.lstsubcharges[i].slaveId+"'>" 
				
				+"<input type='hidden' class='hallid' id='thselfid"+(i)+"' value='"
				+response.lstsubcharges[i].selfId+"'>" 
				
				+"<input type='hidden' class='hallid' id='thisCategory"+(i)+"' value='"
				+response.lstsubcharges[i].isCategory+"'></th>"
				;
	}
	tHead = tHead+"</tr>";
	$("#serviceHeader").html(tHead);
	
}
/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for fetching services by using master id and selfid***/
function fetchSubServiceById(masterId, selfId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectnewSlave(response);
			fetchSubServiceIsCat(masterId, selfId);
		}
	});
}
/**@author   :BILAL
 * @date     :31-08-2017
 * @code     :for fetching services by using master id and selfid***/
function fetchSubServiceIsCat(masterId, selfId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subservice/getSubServicewithhall",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			
				servicesInfoTemplate(response) ;

		}
	});
}
/***@author      :BILAL
 * @Date         :24-10-2017
 * @Code         :For Saving records hall wise***/
function savehallwithservices(){
	//declaring array to push list of records
	var configurationDetails = {
			lstConfigurService : []
	};
	
	//declaring array to push list of records hallid
	var hallandhallslave = {
			lstConfigurService : []
	};
	
	/*var operator =0;
	var number  =0;
	var increaseordecrease =0;
	var chargesId =0;
	var chargesSlaveId =0;
	var distribute =0;
	var totalcharges    =0;
	var isComServId =0;
	var isComServlastId =0;
	var iscombination ="N";
	var HallId     =2;

	var configId =0;*/
	var queryType =$('#queryType').val();
	var tHeadLength = $('#serviceHeader th').length;
	var tBodyLength = $('#servicesDiv tr').length;

	//For muti select id's
	var masterId = $("#li0").val();
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();

	if (masterId == "" || masterId == null || masterId == undefined || isNaN(masterId)) {
		masterId = 0;
	}
	if (serviceLastId == "" || serviceLastId == null || serviceLastId == undefined || isNaN(serviceLastId)) {
		serviceLastId = 0;
	}
	
	if(tBodyLength == 0){
		alert("Select Services To Save!!! ");
		return false;
	}
	for ( var i = 0; i < tHeadLength; i++) {

		var HallSlaveId = $("#th"+i).val();
		/*var selfId      = $("#thselfid"+i).val();
		var iscatHall   = $("#thisCategory"+i).val();*/
		
		if (HallSlaveId > 0) {
		
			hallandhallslave.lstConfigurService.push({
				
				hallSlaveId : HallSlaveId
			});
			
		for ( var j = 0; j < tBodyLength; j++) {
			
			    var serviceId = $("#subid" + j).val();
				//var charges = parseFloat($("#td"+ j+"td"+HallSlaveId ).val());
				var charges = parseFloat($("#td"+serviceId+"td"+HallSlaveId ).val());
				
				if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
					charges = 0;
				}
				if (serviceId == "" || serviceId == null || serviceId == undefined || isNaN(serviceId)) {
					serviceId = 0;
				}
				if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined || isNaN(HallSlaveId)) {
					HallSlaveId = 0;
				}
				
				
				
				configurationDetails.lstConfigurService.push({
					charges : charges,
					serviceId : serviceId,
					hallSlaveId : HallSlaveId,
					
				});
			
		}
			
		}
	}
	
	configurationDetails = JSON.stringify(configurationDetails);
	hallandhallslave     = JSON.stringify(hallandhallslave);
	
	var inputs = [];
	inputs.push("configurationDetails="
			+ encodeURIComponent(configurationDetails));
	inputs.push('queryType=' + queryType);
	inputs.push("hallandhallslave="
			+ encodeURIComponent(hallandhallslave));
	inputs.push('masterId=' + masterId);
	inputs.push('serviceLastId=' + serviceLastId);
	var str = inputs.join('&');
	
	$('#pleaseWait').show();
	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/saveConfiguration2",
		error : function() {
			alert('error');
		},
		beforeSend: function (request, settings) {
	        start_time = new Date().getTime();
	    },
		success : function(r) {
			request_time = new Date().getTime() - start_time;
	        console.log(request_time);
			alertify.success(r);
			$('#queryType').val('insert');
			$('#pleaseWait').hide();
			reload();
		}
	});
	
}
function reload(){
	//window.location.reload(true);
	fetchAllService();
	fetchHeaderList();
	/*var masterId = $("#li0").val();
	removeInpuntFild(0, masterId, 'dynamicItem');*/
}
/***@author     :BILAL
 * @Date        :24-10-2017
 * @Code        :For getting list of services hall wise****/
function fetchhallwiseservices(callfrom){
	if (callfrom == "edit") {
		$('#queryType').val('update');
	}else{
		$('#queryType').val('insert');
	}
	
	//declaring array to push list of records hallid
	var hallandhallslave = {
			lstConfigurService : []
	};
	var tHeadLength = $('#serviceHeader th').length;
	for ( var i = 0; i < tHeadLength; i++) {

		var HallSlaveId = $("#th"+i).val();
	
		if (HallSlaveId > 0) {
			
			hallandhallslave.lstConfigurService.push({
				
				hallSlaveId : HallSlaveId
			});
		}
	}
	
	hallandhallslave     = JSON.stringify(hallandhallslave);
	var inputs = [];
	inputs.push("hallandhallslave="
			+ encodeURIComponent(hallandhallslave));
	var str = inputs.join('&');

	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/fetchhallwiseservices",
		error : function() {
			alert('error');
			$('#pleaseWait').hide();
		},
		success : function(r) {
			console.log(r);
			set(r);
		}
	});
}
function set(response){
	for ( var i = 0; i < response.lstConfigurService.length; i++) {
		slaveId =response.lstConfigurService[i].hallSlaveId;
		serviceId=response.lstConfigurService[i].serviceId;
		if (slaveId > 0) {
			$("#td"+(serviceId)+"td"+slaveId).val(response.lstConfigurService[i].charges);
		}
	}
	$('#pleaseWait').hide();
}


function tk(){
	var $rows = $('#servicesDiv tr');
	$('#searchk').keyup(function() {
	    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
	    
	    $rows.show().filter(function() {
	        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
	        return !~text.indexOf(val);
	    }).hide();
	});
	
	
}

