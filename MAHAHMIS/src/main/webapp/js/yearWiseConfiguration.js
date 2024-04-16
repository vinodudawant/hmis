/*****
 * @author   :BILAL
 * @Date     :24-01-2018
 * @Code     :For Hide and show the DIVS  
 * ******/
function hideAllDiv(id) {

	var checkbox = $('input:checkbox[id=' + id + ']');
	if (checkbox.is(':checked') == true) {
		$('#divLine1').hide();
		$('#fromYear').val('Y');
		if (fromDate != "" || fromDate != null || fromDate != undefined
				&& toDate != "" || toDate != null || toDate != undefined) {

			getDataWithDate();

		}
		
		
		
	}else{
		$('#divLine1').show();
		$('#fromYear').val('N');
	}
}
/*****
 * @author   :BILAL
 * @Date     :24-01-2018
 * @Code     :For save Year Wise
 * ******/
function saveYearWise() {
	
	var configIdf = $("#configId").val();
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute= parseFloat($("#distribute").val());
	var queryType = $("#queryType").val();
	var totalcharges= parseFloat($("#totalcharges").val());
	
	//For Service Id
	var masterId = $("#li0").val();
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	
	
	//From Date To Date
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
    
    //Department Id To save in DataBase
    var departMentID=$("#deptIdForConfig").val();
    
    //hallCharges to save based on hallID and slave Id
    var hallCharges=$("#hallCharges").val();
    var iscombination =$('#iscombination').val();
   
    var medicalCharges=$("#medicalCharges").val();
    
    var rightDivLength = $("#rightDiv tr").length;
    if (rightDivLength == 0) {
		alert("Please Take Atleast One Service Charges To Save Or Update!");
		// SetFocus('rightDiv');
		return false;

	}
  
	
	//rightDiv validation	
	if(number > 0 ){
		if (rightDivLength == 0) {
			alert("Please Take Atleast One Service Charges To Save Or Update!");
			return false;

		} else if ((operator != "+") && (operator != "-") && (operator != "%")) { // operator validation
			alert("Please Select One Operator To Perform Calculations!");
			SetFocus('operator');
			return false;
		}
	}
	
	//department validation
	if(departMentID < 0){
		alert("Please Select One departMent!");
		SetFocus('deptIdForConfig');
		return false;
	}
	
	
    
	if (configIdf == "" || configIdf == null || configIdf == undefined) {
		configIdf = 0;
	}
	
	
	if (masterId == "" || masterId == null || masterId == undefined) {
		masterId = 0;
	}
	
	if (totalcharges == "" || totalcharges == null || totalcharges == undefined || isNaN(totalcharges)) {
		totalcharges = 0;
	}
	
	
	 
	if (serviceLastId == "" || serviceLastId == null || serviceLastId == undefined || isNaN(serviceLastId)) {
		 serviceLastId = 0;
	}
	 
	if (hallCharges == "" || hallCharges == null || hallCharges == undefined || isNaN(hallCharges)) {
		 hallCharges = 0;
	}
	 
	if (medicalCharges == "" || medicalCharges == null || medicalCharges == undefined || isNaN(medicalCharges)) {
		 medicalCharges = 0;
	}
	
	
	if (iscombination == "" || iscombination == null || iscombination == undefined) {
		iscombination = 'N';
	}
	
	if (departMentID == "" || departMentID == null || departMentID == undefined) {
		departMentID = 0;
	}
	
	if (number == "" || number == null || number == undefined || isNaN(number)) {
		number = 0;
	}
	
	if (distribute == "" || distribute == null || distribute == undefined || isNaN(distribute)) {
		distribute = 0;
	}
	
	
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();

	var output = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-'
			+ (day < 10 ? '0' : '') + day;

	if (new Date(toDate) < new Date(output)) {
		alert("Todate  must be in the future!");
		return false;
	}
	
	if (Date.parse(fromDate) > Date.parse(toDate)) {
        alert("Start date should not be greater than end date");
        return false;
    }

	
	if (fromDate == "" || fromDate == null || fromDate == undefined ) {
		alert("Please Select Start date !! ");
        return false;
	}
	
	if (toDate == "" || toDate == null || toDate == undefined ) {
		alert("Please Select Todate !!");
		return false;
	}
	
	var configurationDetails = {
			lstyearwise : []
	};
	
	var configurationDetailsyear = {
			lstyearwise : []
	};
	//getting all configuration id's  
	var configIds=new Array();
	 $(".idc").each(function() {
		 configIds.push($(this).val());
	 });	
	
	//getting all service id's  
	var serviceIDs=new Array();
	$(".subserviceIds").each(function() {
			 serviceIDs.push($(this).val());
	});
	
	//getting All charges  
	var chargess=new Array();
	$(".right_Charges").each(function() {
		chargess.push($(this).val());
	});

	var countDatess=new Array();
	$(".countDates").each(function() {
		countDatess.push($(this).val());
	});
	
	var countDate =$('#countDates').val();
	if (countDate == "" || countDate == null || countDate == undefined) {
		countDate = 0;
	}
	var i;
	for (i = 0; i < serviceIDs.length; ++i) {
	   
		var charges =chargess[i];
		var serviceId =serviceIDs[i];
		var configId =configIds[i];
		
		if (configId == "" || configId == null || configId == undefined) {
			configId = 0;
		}
		
		configurationDetails.lstyearwise.push({
			charges        : charges,
			serviceId	   : serviceId,
			configId        : configId
		});
	}

	
	configurationDetailsyear.lstyearwise.push({
		
		operator       : operator,
		number         : number,
		increaseordecrease : increaseordecrease,		
		distribute      : distribute,
		fromDate        : fromDate,
		toDate          : toDate,
		departMentID    :departMentID,
		totalcharges    : totalcharges,
		serviceLastId   : serviceLastId,
		iscombination   : iscombination,
		masterId        : masterId,
		hallCharges     : hallCharges,
		medicalCharges  : medicalCharges,
		countDate       : countDate
	});
	
	//JSON List 
	configurationDetails = JSON.stringify(configurationDetails);
	configurationDetailsyear = JSON.stringify(configurationDetailsyear);
	
	var inputs = [];
	inputs.push("configurationDetails="
			+ encodeURIComponent(configurationDetails));
	inputs.push("configurationDetailsyear="
			+ encodeURIComponent(configurationDetailsyear));
	inputs.push("queryType=" + queryType);
	inputs.push("from=" + fromDate);
	inputs.push("to=" + toDate);
	var str = inputs.join('&');
	
	$('#pleaseWait').show();
	jQuery.ajax({
		
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/saveYearWise",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$('#pleaseWait').hide();
			var len=r.lstyearwise.length;
			if (len == 0 || len > 0) {
				alertify.success("Record Save Sucessfully ");
				
			}else{
				alertify.success("Record Updated Sucessfully ");
				
			}
			if (len > 0) {
				setpoup(r);
			}else{
				refreshConfig();
			}
			
			
			
		}
	});
	
	//total to be refresh after save and update 
	 var button = $('#apply');

	    //able the apply button while evaluating if the condition should be apply
	    button.prop('disabled', false);

	    var valid = true;    

	    if (!valid) { 
	        // Prevent form from applying  if validation failed
	        e.preventDefault();

	        // Reactivate the button if the apply was not applied
	        button.prop('disabled', true);
	    }
   
}

/*****
 * @author   :BILAL
 * @Date     :24-01-2018
 * @Code     :For SET POPUP VALUE 
 * ******/
function setpoup(r) {
	$('#year_Pop_Up').modal('show');
	var htm="";
	for ( var i = 0; i < r.lstyearwise.length; i++) {
		var serviceId=r.lstyearwise[i].serviceId;
		var charges=r.lstyearwise[i].charges;
		var serviceName=r.lstyearwise[i].serviceName;
		var oldCharges=r.lstyearwise[i].oldCharges;
		htm = htm
		+  '<tr> '
		+ '	<td>'+(i+1)+'</td> '
		+ '	<td id="serviceName'+serviceId+'">'+serviceName+'</td> '
		+ '	<td id="serviceId'+serviceId+'">'+serviceId+'</td> '
		+ '	<td id="charges'+serviceId+'">'+charges+'</td> '
		+ '	<td id="charges'+serviceId+'">'+oldCharges+'</td> '
		
		
		
		+'	<td style="display: none;"><input type="hidden" class="subserviceIdsyr" value="'+serviceId+'"> '
		+'  <input type="hidden" class="newchargesyr" value="'+charges+'">'
		+'  <input type="hidden" class="fromDateyr" value="'+r.lstyearwise[i].fromDate+'">'
		+'  <input type="hidden" class="toDateyr" value="'+r.lstyearwise[i].toDate+'">'
		+'  <input type="hidden" class="configIdyr" value="'+r.lstyearwise[i].configId+'">'
		+'  <input type="hidden" class="masterIdyr" value="'+r.lstyearwise[i].masterId+'">'
		+'  <input type="hidden" class="hallChargesyr" value="'+r.lstyearwise[i].hallCharges+'">'
		+'  <input type="hidden" class="medicalChargesyr" value="'+r.lstyearwise[i].medicalCharges+'">'
		+'  <input type="hidden" class="operatoryr" value="'+r.lstyearwise[i].operator+'">'
		+'  <input type="hidden" class="increaseordecreaseyr" value="'+r.lstyearwise[i].increaseordecrease+'">'
		+'  <input type="hidden" class="distributeyr" value="'+r.lstyearwise[i].distribute+'">'
		+'  <input type="hidden" class="departMentIDyr" value="'+r.lstyearwise[i].departMentID+'">'
		+'  <input type="hidden" class="serviceLastIdyr" value="'+r.lstyearwise[i].serviceLastId+'">'
		+'  <input type="hidden" class="totalchargesyr" value="'+r.lstyearwise[i].totalcharges+'">'
		+'  <input type="hidden" class="numberyr" value="'+r.lstyearwise[i].number+'">'
		+' </td>'
		+' </tr>';
	}
	$('#yearData').html(htm);
	
}

/*****
 * @author   :BILAL
 * @Date     :24-01-2018
 * @Code     :For ovverride the services 
 * ******/
function saveandOverride() {

	 var configIds=new Array();
	 $(".configIdyr").each(function(){

		 configIds.push(parseInt($(this).val()));
	 });
	 var serviceIds=new Array();
	 $(".subserviceIdsyr").each(function(){

		 serviceIds.push(parseInt($(this).val()));
	 });

	 var chargess=new Array();
	 $(".newchargesyr").each(function(){

		 chargess.push(parseFloat($(this).val()));
	 });

	 var fromDates=new Array();
	 $(".fromDateyr").each(function(){

		 fromDates.push($(this).val());
	 });

	 var toDates=new Array();
	 $(".toDateyr").each(function(){

		 toDates.push($(this).val());
	 });

	 var masterIds=new Array();
	 $(".masterIdyr").each(function(){

		 masterIds.push(parseInt($(this).val()));
	 });
	

	 var hallChargess=new Array();
	 $(".hallChargesyr").each(function(){

		 hallChargess.push(parseFloat($(this).val()));
	 });

	 var medicalChargess=new Array();
	 $(".medicalChargesyr").each(function(){

		 medicalChargess.push(parseFloat($(this).val()));
	 });

	 var operators=new Array();
	 $(".operatoryr").each(function(){

		 operators.push($(this).val());
	 });

	 var increaseordecreases=new Array();
	 $(".increaseordecreaseyr").each(function(){

		 increaseordecreases.push($(this).val());
	 });
	
	 var distributes=new Array();
	 $(".distributeyr").each(function(){

		 distributes.push(parseFloat($(this).val()));
	 });
	
	 var departMentIDs=new Array();
	 $(".departMentIDyr").each(function(){

		 departMentIDs.push(parseInt($(this).val()));
	 });
	
	 var serviceLastIds=new Array();
	 $(".serviceLastIdyr").each(function(){

		 serviceLastIds.push(parseInt($(this).val()));
	 });
	
	
	 var totalchargess=new Array();
	 $(".totalchargesyr").each(function(){

		 totalchargess.push(parseFloat($(this).val()));
	 });
	
	 var numbers=new Array();
	 $(".numberyr").each(function(){

		 numbers.push(parseInt($(this).val()));
	 });
	
	/* var fromDate = $("#fromDate").val();
	 var toDate = $("#toDate").val();*/
	var configurationDetails = {
			lstyearwise : []
	};
	
	for (var i = 0; i < configIds.length; ++i) {
		var charges =chargess[i];
		var serviceId =serviceIds[i];
		var configId =configIds[i];
		var operator =operators[i];
		var number =numbers[i];
		var increaseordecrease =increaseordecreases[i];
		var distribute =distributes[i]; 
		var fromDate =fromDates[i];   
		var toDate =toDates[i]; 		
		var departMentID =departMentIDs[i];        
		var totalcharges =totalchargess[i];          
		var serviceLastId =serviceLastIds[i];     
		var masterId =masterIds[i];    
		var hallCharges =hallChargess[i];   
		var medicalCharges =medicalChargess[i];        
		
		configurationDetails.lstyearwise.push({
			charges        : charges,
			serviceId	   : serviceId,
			configId        : configId,
			operator       : operator,
			number         : number,
			increaseordecrease : increaseordecrease,		
			distribute      : distribute,
			fromDate        : fromDate,
			toDate          : toDate,
			departMentID    :departMentID,
			totalcharges    : totalcharges,
			serviceLastId   : serviceLastId,
			masterId        : masterId,
			hallCharges     : hallCharges,
			medicalCharges  : medicalCharges
		});
	}
	
	//JSON List 
	configurationDetails = JSON.stringify(configurationDetails);
	
	var inputs = [];
	inputs.push("configurationDetails="
			+ encodeURIComponent(configurationDetails));
	
	var str = inputs.join('&');
	
	$('#pleaseWait').show();
	jQuery.ajax({
		
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/overrideYearWise",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$('#pleaseWait').hide();
			alertify.success(r);
			//refreshConfig();
			
		}
	});
}

/*****
 * @author   :BILAL
 * @Date     :25-01-2018
 * @Code     :For getting year wise data 
 * ******/
function getYearWisedata(){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		
		url : "ehat/configurationservice/getYearWisedata",

		error : function() {
			alert('error');
		},
		success : function(r) {
			setYearWise(r);
		}
	});
}
/*****
 * @author   :BILAL
 * @Date     :25-01-2018
 * @Code     :For setting year wise data 
 * ******/
function setYearWise(response){


	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">From Date</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">To Date</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	var index = 0;
	for ( var i = 0; i < response.lstyearwise.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
					
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstyearwise[i].fromDate
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstyearwise[i].toDate
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='editYearWise("+response.lstyearwise[i].countDate+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
				+'<td style="height: 21.5px;" class="col-md-1 center"><button onclick="deleteYearWise('+response.lstyearwise[i].countDate+')" class="btn btn-xs btn-success deleteConfiguration"><i class="fa fa-trash-o"></i></button></td>';
				
				+'<input id="idConfiguration1" type="hidden" value="121017">'
				+ "</tr>" 
				;
			
		index++;
	}

	$("#popupDiv").html(htm);
}
/*****
 * @author   :BILAL
 * @Date     :25-01-2018
 * @Code     :For edit year wise data 
 * ******/
function editYearWise(countDate){
	
	$('#queryType').val("update");
	
	$('#yearwise').prop('checked','checked');
	$("#leftDiv tr").remove();
	$('#divLine1').hide();
	$('#fromYear').val('Y');
	
	
	
	$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/configurationservice/editYearWise",
		data : {
			"countDate"      : parseInt(countDate)
			
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			ConfigurationServiceTemplateYear(r);
			fetchSubServiceCategoryList();
			$('#pleaseWait').hide();
			
		}
	});	
}
/*****
 * @author   :BILAL
 * @Date     :25-01-2018
 * @Code     :For getting year wise data for edit
 * ******/
function ConfigurationServiceTemplateYear(response) {

	
	var htm = '';
	var number=0;
	var operator='';
	var increaseordecrease='';
	var fromDate='';
	var toDate='';
	var hallCharges=0;
	var medicalCharges=0;
	var departMentID=0;
	var index = 0;
	var countDate=0;
	for ( var i = 0; i < response.lstyearview.length; i++) {
	
		var categoryName = response.lstyearview[i].categoryName;
		var charges = response.lstyearview[i].charges;
	    var idConfiguration =response.lstyearview[i].idConfigurations;
		var serviceId=response.lstyearview[i].serviceId;

	    number = response.lstyearview[i].number;
		operator = response.lstyearview[i].operator;
	
		increaseordecrease = response.lstyearview[i].increaseordecrease;
		fromDate = response.lstyearview[i].fromDate;
		toDate = response.lstyearview[i].toDate;
		hallCharges = response.lstyearview[i].hallCharges;
		medicalCharges = response.lstyearview[i].medicalCharges;

		departMentID =response.lstyearview[i].departMentID;
		countDate =response.lstyearview[i].countDate;
		
		htm = htm
	
			
				+'<tr id="trs'+(i + 1)+'">'
				+'<td id="chNamer'+(i + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(i + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(i + 1)+'" class="right_Charges" type="text"  value="'+charges+'" onkeyup="totalAmount()" name="charges'+(i + 1)+'">'
				+'</td>'

				
				+'<td id="lastTdr'+(i + 1)+'">'
				+'<input id="inputCntr'+(i + 1)+'" type="button" value="<<" onclick="addTRtoLeft('+(i + 1)+')"></td>'
				+'<input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '">'
				+'<input type="hidden" id="idConfiguration'+ (index + 1) +'" class="idc" value="'+ idConfiguration + '">'
				+'<input id="subbIdr'+(i + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
				+'<input id="countDatess'+(i + 1)+'" class="countDates" type="hidden" value="'+countDate+'">'
				+'</tr>';
		
		
		$('#subIDs').append(","+serviceId);
		index++;

		
	}

	$("#number").val(number);
	$("#operator").val(operator);
	$("#fromDate").val(fromDate);
	$("#toDate").val(toDate);
	$("#hallCharges").val(hallCharges);
	$("#medicalCharges").val(medicalCharges);
	$("#deptIdForConfig").val(departMentID);
	$('#countDates').val(countDate);
	
	if (increaseordecrease == "+") {
		$('input[name="incdecType"][value="+"]').prop('checked', true);
		$('input[name="incdecType"][value="-"]').prop('checked', false);
	} else {
		$('input[name="incdecType"][value="+"]').prop('checked', false);
		$('input[name="incdecType"][value="-"]').prop('checked', true);
	}
	
	$("#rightDiv").html(htm);
	totalAmount();

}
/*****
 * @author   :BILAL
 * @Date     :25-01-2018
 * @Code     :For deleting year wise data 
 * ******/
function deleteYearWise(countDate) {

	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		$('#pleaseWait').show();
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/configurationservice/deleteYearWise",
			data : {
				"countDate" : parseInt(countDate)

			},
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(response);
				$('#pleaseWait').hide();
				reload();
			}
		});
	}
}

function getDataWithDate(){
	var id="yearwise";
	var queryType=$('#queryType').val();//"update"
	var checkbox = $('input:checkbox[id=' + id + ']');
	if (checkbox.is(':checked') == true && queryType == "insert") {
		
		
		var fromDate = $("#fromDate").val();
		var toDate = $("#toDate").val();
		if (fromDate == "" || fromDate == null || fromDate == undefined ) {
			//alert("Please Select Start date !! ");
	        return false;
		}
		
		if (toDate == "" || toDate == null || toDate == undefined ) {
			//alert("Please Select Todate !!");
			return false;
		}
		
		$('#pleaseWait').show();
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/configurationservice/getDataWithDate",
			data : {
				"from"      : fromDate,
				"to"      : toDate
			},
			error : function() {
				alert('error');
			},
			success : function(r) {
				setDataWithDate(r);
				$('#pleaseWait').hide();
				
			}
		});	
		
	}else{
		
	}
}

function setDataWithDate(response){

	var length= response.lstyearview.length;
	
	if (length == 0 || length == "0" || length == null ) {
		//$("#rightDiv").empty();
		return false;
	}else{
		$('#queryType').val("update");
	}
	var htm = '';
	
	var index = 0;
	var countDate=0;
	for ( var i = 0; i < response.lstyearview.length; i++) {
	
		var categoryName = response.lstyearview[i].categoryName;
		var charges = response.lstyearview[i].charges;
	    var idConfiguration =response.lstyearview[i].idConfigurations;
		var serviceId=response.lstyearview[i].serviceId;
		countDate=response.lstyearview[i].countDate;
		
		htm = htm
	
			
				+'<tr id="trs'+(i + 1)+'">'
				+'<td id="chNamer'+(i + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(i + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(i + 1)+'" class="right_Charges" type="text"  value="'+charges+'" onkeyup="totalAmount()" name="charges'+(i + 1)+'">'
				+'</td>'

				
				+'<td id="lastTdr'+(i + 1)+'">'
				+'<input id="inputCntr'+(i + 1)+'" type="button" value="<<" onclick="addTRtoLeft('+(i + 1)+')"></td>'
				+'<input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '">'
				+'<input type="hidden" id="idConfiguration'+ (index + 1) +'" class="idc" value="'+ idConfiguration + '">'
				+'<input id="subbIdr'+(i + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
				
				+'<input id="countDatess'+(i + 1)+'" class="countDates" type="hidden" value="'+countDate+'">'
				
				+'</tr>';
		
		
		$('#subIDs').append(","+serviceId);
		index++;

		
	}
	$('#countDates').val(countDate);
	
	$("#rightDiv").html(htm);
	totalAmount();

}