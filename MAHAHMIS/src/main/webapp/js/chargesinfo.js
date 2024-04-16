/**@Author   :BILAL
 * @Date     :09-10-2017
 * @Code     :Charges Info JSP to display under category ***/
function fetchargesinfo() {
	$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/chargesSlave/fetchargesinfo",

		error : function() {
			alert('error');
		},
		success : function(response) {
			
			setchargesinfo(response);
			$('#pleaseWait').hide();
		}
	});
}
/**@Author   :BILAL
 * @Date     :09-10-2017
 * @Code     :Charges Info JSP to display under category setting template ***/
function setchargesinfo(response) {

	
	
	var htm = "";
	htm= '<thead id="serviceHeader">'
		+'<tr>'
		+ '<th class="col-md-1 center">#</th>'
		+ '<th class="col-md-1 center">Sub Charges Name</th>'
		+ '<th class="col-md-1 center">Sub Charges Code Name</th>'
		+ '<th class="col-md-1 center">Is Category</th>'
		+ '</tr></thead>';
	var index = 0;

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td><td class='col-sm-1-1 center' id='serviceNames"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].categoryName
				+ "</td><td class='col-sm-1-1 center' id='servicecoName"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].codeName
				+ "</td>"
				+ "</td><td class='col-sm-1-1 center' id='servicecoName"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].isCategory
				+ "</td>"
				+"</tr>";
		index++;

	}

	
	$("#servicesDiv").html(htm);
	
}
/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For Fetching records of chargesInfo****/
function fetchargesinfomaster(masterId, selfId) {
	$('#pleaseWait').show();
	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/fetchargesinfomaster",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
				setchargesinfo(response);
				$('#pleaseWait').hide();
		}
	});
}

/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For Auto suggestion of charges info JSP ****/
function setChargesInfoData(inputId) {

	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#setDatabyName").val();
	}
	var findingName = $("#" + inputId).val();
	 if(findingName.length == 0){
	    	
		 fetchargesinfo();
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
		url : "ehat/chargesSlave/setChargesInfoData",

		success : function(r) {

			setchargesinfo(r);

		}
	});
} 

/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For getting list of charges master ****/
function getAllChargesl() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/charges/chargesMasterList",

		success : function(response) {
			multiSelectchargesinfo(response);
		}
	});

}
/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For getting list of charges slave master ****/
function fetchChargesSlaveinfo(masterId, selfId) {
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/fetcatY",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)

		},
		success : function(response) {
			multiSelectSlavechargesinfo(response);
			
		}
	});
}

/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For select 2 on charges info ****/
/*$(document).ready(function() {
	App.setPage("wizards_validations");
	App.init(); 
	FormWizard.init();
});*/
function multiSelectchargesinfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}

	$("#listmstr_select_chargesinfo").html(list);
}

/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For select 2 on charges info ****/
function setDyanamicDivForChargesinfo(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmesH'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removech('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();// for masters
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		if (liSize == 1) {
			fetchChargesSlaveinfo(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo(masterid, selfId);
		}		
	}

}

/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For removing the element from list ****/
function removech(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesH' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();
		fetchargesinfo();
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		
		if (liSize == 1) {
			fetchChargesSlaveinfo(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo(masterid, selfId);
		}
		
	}
}

/**@Author     :BILAL
 * @Date       :09-10-2017
 * @Code       :For multi select slave info ****/
function multiSelectSlavechargesinfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	$("#listmstr_select_chargesinfo").html(list);
	
	
}
/*******
 * @author        :BILAL
 * @Date          :23-01-2018
 * @Code          :For show data on show button
 * *********/
function showDatamasterInfosponsor(){
	
	var masterId = $("#lisH" + 0).val();
	var liSizeForServices = $("#dynamicItemsinfo li").length;
	var selfId  =0;
	
	if (liSizeForServices > 1) {
		selfId =$("#lisH" + (liSizeForServices - 1)).val();
	}

	fetchargesinfomaster(masterId, selfId);
	
}