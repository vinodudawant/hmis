
/**@Author    :BILAL
 * @Date      :10-10-2017
 * @Code      :For Masters Informations**/
function handleHomePageTooltips() {
	
	$('.tip-focus').tooltip({
		trigger: 'focus'
	});
}
/**@Author    :BILAL
 * @Date      :10-10-2017
 * @Code      :For Setting Masters Informations**/
function setNewTempInfo(id){

	$(".ehatListinfo").removeClass("active");
	$("#"+id).addClass("active");
    if (id=="subsinfo") {
		temForServiceinfo(id);
		handleHomePageTooltips();
		//fetchSubServiceCategoryList();
		fetchAllServicemasterInfo();
	}else if (id=="subchrgsinfo") {
		temForChrgsInfo(id);
		handleHomePageTooltips();
		getAllChargesl();
		fetchargesinfo();
	}
}

/**@Author    :BILAL
 * @Date      :10-10-2017
 * @Code      :For Service Informations Template**/
function temForServiceinfo(callFrom){
	var htm= 	
		
		
		 '<div class="form-group col-md-3"> ' 		
		+ '	<div class="form-group"> '
		+ '		<div class="col-md-12"> ' 
		+ '			<select class="col-md-12" name="listmstr" id="listmstr_select" '
		+ '				style="width: 100%" class="listmstr"'
		+ '				onchange="setDyanamicDiv(\'dynamicItem\',this.id)"> '
		+ '				<option id="firstElmt">--- Select Services ---</option> '
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
		
		+'<div style="text-align: " class="col-md-1-1">'
		+'<input type="button" onclick="showDatamasterInfo()" id="showdata" class="btn btn-xs btn-primary" value="show">'
		+'</div>';

	
	$("#divEhatContent").html(htm);	
	$("#listmstr_select").select2();
	
	$("#searchlabel").html('<input class="form-control input-sm" id="setDatabyName" onkeyup="setData(this.id)" '
			+' type="text" placeholder="Search" aria-controls="datatable1">');
}

/**@Author    :BILAL
 * @Date      :10-10-2017
 * @Code      :For Charges Informations Template**/
function temForChrgsInfo(callFrom) {
	var htm =
	
		
		 '<div class="form-group col-md-3"> ' 
		+ '	<div class="form-group"> '
		+ '		<div class="col-md-12"> ' 
		+ '			<select class="col-md-8" name="listmstr" id="listmstr_select_chargesinfo" '
		+ '				style="width: 100%" '
		+ '				onchange="setDyanamicDivForChargesinfo(\'dynamicItemsinfo\',this.id)"> '
		+ '				<option id="firstElmts2">--- Select Charges Info ---</option> '
		+ '			</select> '
		+ '			<div class="col-md-12 select2-container select2-container-multi " '
		+ '				style="margin-top: 2%; width: 100%"> '
		+ '				<ul id="dynamicItemsinfo" class="select2-choices" '
		+ '					style="overflow-y: scroll; min-height: 70px"> '
		+ '				</ul> '
		+ '			</div> '
		+ '		</div> '
		+ '	</div> '
		+ '</div> ' 

		+'<div style="text-align: " class="col-md-1-1">'
		+'<input type="button" onclick="showDatamasterInfosponsor()" id="showdata" class="btn btn-xs btn-primary" value="show">'
		+'</div>';	

	$("#divEhatContent").html(htm);
	$("#listmstr_select_chargesinfo").select2();	
	
	$("#searchlabel").html('<input class="form-control input-sm" id="setDatabyName" onkeyup="setChargesInfoData(this.id)" '
			+' type="text" placeholder="Search" aria-controls="datatable1">');
}

function fetchAllServicemasterInfo() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		
		success : function(response) {
			multiSelectmasterInfo(response);
			//fetchlistS();
			//fetchlistS2();
		}
	});

}
function multiSelectmasterInfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	
	$("#listmstr_select").html(list);
	$("#listmstr_select").select2();	

}
/*******
 * @author    :BILAL
 * @Date      :31-05-2017
 * @Code      :For fetching sub services list
 * ******/
function fetchlistS() {
	$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subservice/SubServiceListCatN",

		error : function() {
			alert('error');
		},
		success : function(response) {
			
			servicesInfoTemplate(response);
			$('#pleaseWait').hide();
		}
	});
}
/**@author   :Bilal
 * @date     :31-08-2017
 * @code     :for setting template of services for master infor mations ***/
function servicesInfoTemplate(response) {

	var htm = "";
	htm= '<thead id="serviceHeader">'
		+'<tr>'
		+ '<th class="col-md-1 center">#</th>'
		+ '<th class="col-md-1 center">Sub Service Name</th>'
		+ '<th class="col-md-1 center">Sub Service Code Name</th>'
		+ '<th class="col-md-1 center">Charges</th>'
		
		+ '</tr></thead>';
	var index = 0;

	for ( var i = 0; i < response.lstSubService.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td><td class='col-sm-1-1 center' id='serviceNames"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].categoryName
				+ "</td><td class='col-sm-1-1 center' id='servicecoName"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].codeName
				+ "</td><td class='col-sm-1-1 center' id='servicecharges"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].charges
				+ "</td>"
				+"</tr>";
		index++;

	}

	$("#servicesDiv").html(htm);
	
}

/*******
 * @author    :BILAL
 * @Date      :05-10-2017
 * @Code      :For Auto suggetion for master information
 * ******/
function setData(inputId) {

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
    	//window.location.reload(true);
    }
	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/getAutoSuggestionSubServiceMaster",

		success : function(r) {

			servicesInfoTemplate(r);

		}
	});
} 
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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildmasterifo('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {

		fetchAllServicemasterInfo();
		
	} else {
		
		if (liSize == 1) {
			fetchSubServiceByIdmasterInfo(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceByIdmasterInfo(masterid, selfId);
		}
		
	}
}
function removeInpuntFildmasterifo(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {
		fetchAllServicemasterInfo();

	} else {
		
		if (liSize == 1) {
			fetchSubServiceByIdmasterInfo(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceByIdmasterInfo(masterid, selfId);
		}
	
	}
}

function multiSelectSlavemasterinfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';
	}
	$("#listmstr_select").html(list);
}

function showDatamasterInfo(){
	
	var masterId = $("#li0").val();
	var liSizeForServices = $("#dynamicItem li").length;
	var selfId  =0;
	
	if (liSizeForServices > 1) {
		selfId =$("#li" + (liSizeForServices - 1)).val();
	}
	
	fetchSubServiceIsCatmasterInfo(masterId, selfId);
	
}
function fetchSubServiceByIdmasterInfo(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectSlavemasterinfo(response);
			
		}
	});
}
function fetchSubServiceIsCatmasterInfo(masterId, selfId) {
	
	$('#pleaseWait').show();
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCat",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			
				servicesInfoTemplate(response) ;
				$('#pleaseWait').hide();
		}
	});
}


/*******
 * @author    :BILAL
 * @Date      :13-02-2018
 * @Code      :For fetching sub services list 
 * ******/
function fetchlistS2() {
	$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/subservice/subservicelistfromview",

		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			servicesInfoTemplate2(r);
			$('#pleaseWait').hide();
		}
	});
}
/**@author   :Bilal
 * @date     :31-08-2017
 * @code     :for setting template of services for master infor mations ***/
function servicesInfoTemplate2(response) {

	var htm = "";
	htm= '<thead id="serviceHeader">'
		+'<tr>'
		+ '<th class="col-md-1 center">#</th>'
		+ '<th class="col-md-1 center">Service Name</th>'
		+ '<th class="col-md-1 center">Sub Service Name</th>'
		+ '<th class="col-md-1 center">Sub Service Code Name</th>'
		+ '<th class="col-md-1 center">CGHS Code Name</th>'
		+ '<th class="col-md-1 center">Category</th>'
		+ '<th class="col-md-1 center">Charges</th>'
		
		+ '<th class="col-md-1 center">CreatedBy</th>'
		+ '<th class="col-md-1 center">CreateddateTime</th>'
		+ '<th class="col-md-1 center">UpdatedBy</th>'
		+ '<th class="col-md-1 center">UpdateddateTime</th>'
		
		+ '</tr></thead>';
	var index = 0;

	for ( var i = 0; i < response.lstsubser.length; i++) {
		
		var datetime= new Date(response.lstsubser[i].createdDate).toLocaleDateString('en-GB');
		
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='servicename"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].service_name
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='serviceNames"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].subservName
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='servicecoName"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].codename
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='cgscode"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].cgscode
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='underSubSer"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].underSubSer
				+ "</td>"
				
				
				+"<td class='col-sm-1-1 center' id='servicecharges"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].charges
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='createdusername"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].createdusername
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='createdDate"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ datetime
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='updatedusername"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].updatedusername
				+ "</td>"
				
				+"<td class='col-sm-1-1 center' id='updatedDate"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstsubser[i].updatedDate
				+ "</td>"
				
				+"</tr>";
		index++;

	}

	$("#servicesDiv").html(htm);
	
}