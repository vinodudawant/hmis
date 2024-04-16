/**
 /* @Bilal 30_May_2017
 *********************For configuration**/

/*******************************************************************************
 * @Bilal
 * @date 5_jun_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/

function refreshConfig() {

	$('#operator').val("");
	$('#number').val("");
	$('#distribute').val("");

	$("#totalcharges").val("");
	$("input:radio[name='incdecType']:checked").val("");
	//fetchSubServiceList();

}
/*******************************************************************************
 * @Bilal
 * @date 5_06_2017 apply
 ******************************************************************************/
function apply() {
	var cmt = 1;
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute= parseFloat($("#distribute").val());
	var totalcharges= parseFloat($("#totalcharges").val());

	$("#ol2 li").each(function() {

		var charges = parseFloat($("input[name=charges" + cmt + "]").val());
		
		//formulas for distribute the values 

		
			
			//totalcharges =Math.ceil(totalcharges);
		
		if (operator == "%") {

			if (increaseordecrease == "+") {
				var incdec = charges * number / 100;
				charges = charges + incdec;

			} else {
				var incdec = charges * number / 100;
				charges = charges - incdec;

			}

		} else if (operator == "+") {

			charges = charges + number;
		} else if(operator == "-"){
			charges = charges - number;
		}else{
			//Formulas for Distributed value
			var IncDecP=charges*100/totalcharges;
			
			charges=(IncDecP*distribute/100).toFixed(2);
			
		}
		
		
		$("input[name=charges" + cmt + "]").val(charges);
		cmt++;
	});

}
/*******************************************************************************
 * @Bilal
 * @date 6_Jun_2017 this method is used to save or update the fields
 ******************************************************************************/

function saveConfigurationService() {

	var configId = $("#configId").val();
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	//For Service Id
	var masterId = $("#li0").val();// masterid
	/*var selfId = 0;// static self id
	var liSize = $("#dynamicItem li").length;
	if (liSize == 1) {
		fetchSubServiceById(masterid, selfId);
	} else {

		selfId = $("#li" + (liSize - 1)).val();
		fetchSubServiceById(masterid, selfId);
	}*/
	
	//For Charges Id
	var chargesId = $("#lis0").val();// masterid
	//alert("chargesId:-"+chargesId);
	var chargesSlaveId = 0;// static self id
	var liSize = $("#dynamicItems lis").length;
	if (liSize == 1) {
		fetchChargesSlaveListById(chargesId, chargesSlaveId);
	} else {

		chargesSlaveId = $("#lis" + (liSize - 1)).val();
		fetchChargesSlaveListById(chargesId, chargesSlaveId);
	}
//alert("chargesSlaveId:-"+chargesSlaveId);
	var cmt = 1;
	var configurationDetails = {
		lstConfigurService : []
	};
	// master id and self id
	

	// for each
	$("#ol2 li").each(function() {

		var charges = parseFloat($("input[name=charges" + cmt + "]").val());
		var serviceId = $("input[name=subbId" + cmt + "]").val();

		

		configurationDetails.lstConfigurService.push({
			charges : charges,
			serviceId : serviceId,
			operator : operator,
			number : number,
			increaseordecrease : increaseordecrease,
			masterId :masterId,
			chargesId : chargesId
			
		});

		cmt++;
	});

	//console.log(configurationDetails);
	if (configId == "" || configId == null || configId == undefined) {
		configId = 0;
	}

	configurationDetails = JSON.stringify(configurationDetails);
	alert(configurationDetails);

	var inputs = [];
	inputs.push("configurationDetails="
			+ encodeURIComponent(configurationDetails));
	inputs.push('configId=' + configId);
	inputs.push('operator=' + encodeURIComponent(operator));

	var str = inputs.join('&');

	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/saveConfiguration",
		error : function() {
			alert('error');
		},
		success : function(r) {

			alertify.success(r);
			refreshConfig();
		}
	});
}

/*******************************************************************************
 * @Bilal
 * @date 31_May_2017 this method is used to fetch records on browser from data
 *       base
 ******************************************************************************/
function fetchSubServiceCategoryList() {

	$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subservice/SubServiceCategoryList",

		error : function() {
			alert('error');
		},
		success : function(response) {

			$('#pleaseWait').hide();
			divId = response;
			setTemplateForServices(response);
		}
	});
}

/*******************************************************************************
 * Drag and drop functionality
 ******************************************************************************/
function setTemplateForServices(result) {
	var divContent = "<section  id='connected'><div  class='col-md-12-1' style='margin-top:0px;margin-left:-15px'><ol id='ol1' class='connected list right'><lh draggable='false'><font color='#4682B4'><b>Drag From Here..........!</b></font></lh>";
	// alert("result is"+result);
	for ( var i = 0; i < result.lstSubService.length; i++) {

		// alert("code:"+result.lbHedLi[0].lbProLi[j].proChr);
		// "
		/***********************************************************************
		 * + result.lstSubService[i].subId + "
		 **********************************************************************/

		divContent = divContent
				+ "<li title='Charges-"
				+ result.lstSubService[i].subId
				+ "class='subIdClass' 'style= 'border: 2px solid #ffd2a6;'><tr ><tb >"
				+ result.lstSubService[i].categoryName + "</tb></tr>-";
		divContent = divContent + "<input id='charges"
				+ result.lstSubService[i].subId + "'"
				+ " class='chargesClass' type='text' name='charges" + (i + 1)
				+ "' value='" + result.lstSubService[i].charges
				+ "' style='margin-left: 10px;'>";
		divContent = divContent
				+ "<input id='subId' class='subClass' type='hidden' name='subbId"
				+ (i + 1) + "' value='" + result.lstSubService[i].subId
				+ "' style='margin-left: 10px;'>";

		divContent = divContent + "</li>";

	}
	divContent = divContent + "</div></section>";
	$("#leftDiv").html(divContent);

	var call = $("#headingCall").val();
	var call2 = 0;
	if (call2 == 0) {
		setTemplate2();
	}

	sort();
}
// Touheed
// Sorting data
// Date 15-Dec-2015
function sort() {
	$('.sortable').sortable();
	$('.handles').sortable({
		handle : 'span'
	});
	$('.connected').sortable({
		connectWith : '.demo'
	});
	$('.exclude').sortable({
		items : ':not(.disabled)'
	});

	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-36251023-1' ]);
	_gaq.push([ '_trackPageview' ]);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www')
				+ '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
}
/*******************************************************************************
 * 
 ******************************************************************************/
function setTemplate2() {
	var divContent2 = "<div  class='col-md-12-1' style='margin-top:0px;margin-left:60px'><ol id='ol2' class='connected list left' ondrop='changeClass(event)'>";
	divContent2 = divContent2
			+ "<lh draggable='true'><font color='#556B2F'><b>Drop Here..........!<b></font></lh></ol></div>";

	$("#rightDiv").html(divContent2);
}
/*******************************************************************************
 * @Bilal
 * @date 26_May_2017 this method is used to delete the records with id
 ******************************************************************************/
function deleteSubService(subId) {
	SubServiceTemplate(response);
	var r = confirm("Are You Sure You Want To Delete Sub Service?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subservice/deleteSubService",
			data : {
				"subId" : subId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshConfig();
				fetchSubServiceList();
			}

		});
	}
}
/*******************************************************************************
 * @author Bilal
 * @date 26_May_2017
 * @code for fetching all Service
 ******************************************************************************/
function fetchAllService() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceList",
		// chargesMasterList
		success : function(response) {
			multiSelect(response);

		}
	});

}

/*******************************************************************************
 * *
 * 
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : Fetching list of Sub Service by id
 ******************************************************************************/
function fetchSubServiceIsCat(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCat",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {

			setTemplateForServices(response);				
			setTemplateForBedView(response);
		}
	});
}

/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/

$(document).ready(function() {
	App.setPage("wizards_validations"); // Set current page
	App.init(); // Initialise plugins and elements
	FormWizard.init();
});
// multiselect ui
function multiSelect(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	// $("#e1").html(list);

	$("#listmstr_select").html(list);

}

// Touheed for multiselect Data
function setDyanamicDiv(setDiv, getDiv) {
	// listmstr_select

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

		fetchAllService();// for masters
	} else {
		/*
		 * var masterid = $("#li" + 0).val(); var selfId = 0;
		 */
		// alert(liSize);
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	}// now inside submaster catagories

}

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

	} else {
		/*
		 * var masterid = $("#li" + 0).val(); var selfId = 0;
		 */
		// alert(liSize);
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	}
}

// fo slave demo
// multiselect ui
function multiSelectSlave(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}
/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/
/*******************************************************************************
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : Fetching list of Sub Service by id
 ******************************************************************************/
function fetchSubServiceById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectSlave(response);
			fetchSubServiceIsCat(masterId, selfId);
		}
	});
}
/*******************************************************************************
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : for Fetching id of Service name
 ******************************************************************************/

function selectSubService() {
	// selectserviceName
	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	// var subId = 2; , subId
	fetchSubServiceById(masterId, selfId);
}

// Add all div
function addAll() {
	var h1 = "";
	var h2 = "";
	$("#ol1").each(function() {
		h1 = h1 + $(this).html();
	});
	$("#ol2").each(function() {
		h2 = h2 + $(this).html();
	});
	$("#ol1").html(h2);
	$("#ol2").html(h1);
$("#ol2 li input").each(function() {
		
		var curClass = $(this).attr('class');
	//	alert(curClass);
		// subClass chargesClass 
		if(curClass =="chargesClass"){
			$(this).addClass("chargesClassDrop");
			$(this).removeClass("chargesClass");
		}
		if(curClass == "subClass"){
			$(this).addClass("subClassDrop");
			$(this).removeClass("subClass");
		}
		//$(this).addClass(changeClass);
		//$(this).removeClass(curClass);	
	});
	sort();
}

function fetchoneByone() {

	var configurationDetails = {
		lstConfigurService : []
	};
	var cmt = 1;
	$("#ol2 li").each(function() {

		var ch = $("input[name=charges" + cmt + "]").val();
		var sub = $("input[name=subbId" + cmt + "]").val();
		configurationDetails.lstConfigurService.push({
			charges : ch,
			id : sub
		});
		cmt++;

	});

	alert(configurationDetails);
	console.log(configurationDetails);

}

/*******************************************************************************
 * Touheed's Plugin for Multi select for charges
 ******************************************************************************/

/*$(document).ready(function() {
	App.setPage("wizards_validations"); // Set current page
	App.init(); // Initialise plugins and elements
	FormWizard.init();
});*/
// multiselect ui
function multiSelectForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select_service").html(list);
}

// Touheed for multiselect Data
function setDyanamicDivForCharges(setDiv, getDiv) {
	// listmstr_select

	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmes'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();// for masters
	} else {
		var masterid = $("#lis" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#lis" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}// now inside submaster catagories

}

function removeInpuntFildForCharges(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmes' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();
	} else {
		var masterid = $("#lis" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#lis" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}
}

// fo slave demo
// multiselect ui
function multiSelectSlaveForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select_service").html(list);
}
/*******************************************************************************
 * Touheed's Plugin for Multi select ForCharges
 ******************************************************************************/
/*******************************************************************************
 * @author Bilal
 * @date 23_05_2017
 * @code for fetching all charges master
 ******************************************************************************/
function getAllChargesMaster() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/charges/chargesMasterList",

		success : function(response) {
			multiSelectForCharges(response);
		}
	});

}
/*******************************************************************************
 * @author : Bilal
 * @date : 24-May-2017
 * @reason : Fetching list of Charges slave by id
 ******************************************************************************/
function fetchChargesSlaveListById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getChragesSlaveById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		/* "slaveId" : parseInt(slaveId) */

		},
		success : function(response) {
			multiSelectSlaveForCharges(response);
		}
	});
}
/** *** */
function totalAmount() {
	var total = 0;
	var cmt = 1;

	//$("#ol2 li").each(function() {
		
		$(".chargesClassDrop").each(function() {
			//alert($(this).val());
			var charges = parseFloat($(this).val());
			total = total + charges;
			//alert(total);
		});
		/*$(this).val();
		var charges = parseFloat($("input[name=charges" + cmt + "]").val());
		// var serviceId = $("input[name=subbId"+cmt+"]").val();

		total = total + charges;

		$("input[name=charges" + cmt + "]").val(charges);
		cmt++;*/
		
	//});

	$("#totalcharges").val(total);
}

	
function changeClass(event){
	
	
	$("#ol2 li input").each(function() {
		
		var curClass = $(this).attr('class');
	//	alert(curClass);
		// subClass chargesClass 
		if(curClass =="chargesClass"){
			$(this).removeClass("chargesClass");
			$(this).addClass("chargesClassDrop");
			
		}
		if(curClass == "subClass"){
			$(this).addClass("subClassDrop");
			$(this).removeClass("subClass");
		}
		//$(this).addClass(changeClass);
		//$(this).removeClass(curClass);	
	});
	/*$("."+curClass).addClass(changeClass);
	$("."+curClass).removeClass(curClass);	*/
			
				
} 

/************
* @author	: Vinod Udawant
* @date		: 27-Sept-2016
* @codeFor	: Fetching diagnosis Hisab
 ************/
function setTemplateForBedView(res){
	
	var bedTemp="<div class='row'>";
	
	for ( var i = 0; i < res.lstSubService.length; i++) {
		
		alert(res.lstSubService[i].status);
		
		if(res.lstSubService[i].status==1){
					
			alert(res.lstSubService[i].status);
			bedTemp=bedTemp+
			'<div id="bbed100" style="width: 150px; height: 100px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);"> '
			+ '<label style="color: white; height: 15px; width: 131px; margin-bottom: 0px;" class="TextFont">Mr. Arvind  Paiyal</label> '
			+ '<label style="float: right; height: 15px; margin-bottom: 0px;"> '
			+ '<img width="13px" height="13px" style="border: 2px solid white;" src="images/Red_dot.png"></label> '
			+ '<label style="width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;" 10px;="" font-size:="" class="TextFont">RM16170000000733</label> '
			+ '<label style="width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px" class="TextFont">2017-05-05</label> '
			+ '<label style="color: white; height: 15px; width: 148px; margin-bottom: 0px;" class="TextFont">BAJAJ</label> '
			+ '<div style="margin-top: 0px; height: 33px; width: 148px;"> ' 
			+ '<img width="30px" height="25px" onclick="swapImages(this,100,15)" src="images/bedOcc1.png"> '
			+ '<label style="color: white;" class="TextFont">Bed Name: 1</label> '
			+ '</div></div>';			
			
		/*	bedTemp=bedTemp
			+ '<div class="col-md-3" style="width: 150px; height: 100px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);margin:10px"> '
			+ '<div style="height: 17px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 33px; width: 148px;">'
			+ '<img width="35px" height="20px" onclick="swapImages(this,251,15)" src="images/bedEmpty1.png">'
			+ '<label style="color: white; font-size: 10px; width: 75px" class="TextFont">Bed Name: '+res.lstSubService[i].categoryName+'</label></div></div>';*/

		}else if(res.lstSubService[i].status==2){
			
			bedTemp=bedTemp
			+ '<div class="col-md-3" style="width: 150px; height: 100px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);margin:10px"> '
			+ '<div style="height: 17px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 33px; width: 148px;">'
			+ '<img width="35px" height="20px" onclick="swapImages(this,251,15)" src="images/bedEmpty1.png">'
			+ '<label style="color: white; font-size: 10px; width: 75px" class="TextFont">Bed Name: '+res.lstSubService[i].categoryName+'</label></div></div>';

			
		}else{
			
			bedTemp=bedTemp
			+ '<div class="col-md-3" style="width: 150px; height: 100px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);margin:10px"> '
			+ '<div style="height: 17px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 16px; width: 148px;"></div>'
			+ '<div style="height: 33px; width: 148px;">'
			+ '<img width="35px" height="20px" onclick="swapImages(this,251,15)" src="images/bedEmpty1.png">'
			+ '<label style="color: white; font-size: 10px; width: 75px" class="TextFont">Bed Name: '+res.lstSubService[i].categoryName+'</label></div></div>';

		}		
	}	
	bedTemp=bedTemp+"</div>";
	$("#allbeds").html(bedTemp);	
}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
/*function getPatientDataByTreatmentId(treatId) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : treatId
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			// setTempPatientRecords(r);
			console.log(r);
			 alert(r); 

			 alert(); 
			$("#patientId").text(r.listRegTreBillDto[0].patientId);
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName );
		    $("#billNo").text(r.listRegTreBillDto[0].billId);
			$("#patientName").text(r.ListRegTreBillDto[0].fName + " " + r.ListRegTreBillDto[0].mName + " "
							+ r.ListRegTreBillDto[0].lName);
			$("#sex").text(r.listRegTreBillDto[0].gender);
			$("#treatmentId").text(treatId);
			
			  $("#ipdNo").text(r.listReg[0].fName);
			  $("#billCategoty").text(r.listReg[0].fName);
			  $("#consultingDoctor").text(r.listReg[0].fName);
			  $("#corporate").text(r.listReg[0].fName);
			  $("#doa").text(r.listReg[0].fName);
			  $("#dod").text(r.listReg[0].fName);
		}
	});
}*/

