/**
 /* @Vinod Udawant 30_May_2017
 *********************For configuration**/

/*******************************************************************************
 * @Vinod Udawant
 * @date 5_jun_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/


//----------------add by manish Patel for drowpdown start
function getAllCustomerTypes() {
	
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var inputs = [];
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userType=' + encodeURIComponent(userType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/b2bSamples/getCustomerTypes",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
		}
	});
}

function getCustomerNames(typeSelectId,nameSelectId) {
	var	customerType = $("#"+typeSelectId).val();
	var userCustomerId = $("#userCustomerId").val();
	var userType = $("#userType").val();
	var inputs = [];	
 	inputs.push("customerType=" + customerType);
 	inputs.push("userCustomerNameId=" + userCustomerId);
 	inputs.push("userType=" + userType);
 	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data	: str + "&reqType=AJAX",
		url : "ehat/b2bSamples/getCustomerNames",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
		}
	});
}
// add by manish for excel
  var packages ="ehat/labchargesconfig/packageDropdown";
     function packageDropdownValue(){
	      
			 const custNameId = document.getElementById('custNameRegPage').value;
		   jQuery.ajax({
				async : false,
				url: `${packages}?custNameId=${custNameId}`,					
				catche : false,
	      
	            success: function (response) {
	            	//setLookupDesc(r);
	            	packageDropValue(response);
	              
	            }, error: function () {
	                alert("not found");
	            }
	        })
	    };

	    function packageDropValue(response){
	    	var dropList = "<option value='0'>-select-</option>";	
	    	var defaValue = "";
	    	var kitLookup ="";
	    	var masterId = $("#masterIdd").val();
	    	for(var i = 0; i < response.lstConfigurations.length; i++) {
	    		var kitID = response.lstConfigurations[i].comServLastId; //comServLastId added by prayag for DB_0029
	    		var kitDesc =response.lstConfigurations[i].packageName;
	    		
	    		if(response.lstConfigurations[i].id == masterId && response.lstConfigurations[i].name == masterId){
	    			defaValue = kitLookup;
	    		}
	    			
	    		dropList = dropList + "<option value=" + kitID+" data-name="+kitID+">" +response.lstConfigurations[i].packageName+"</option>";
	    }
	    $("#listmstr_select_combination").html(dropList);
	    $("#listmstr_select_combination").select2();
	    	
	    }
	    
	    //for excelsheet data using multiple perameter by manish patel
	    var excelSheetURL="ehat/labchargesconfig/excelSheetGenrate";
	     function excelSheetData(){
		      
				 const customerTypeId = document.getElementById('lookupDetIdLay').value; //changed by prayag for ticket_id DB_0029
				 const customerNameId = document.getElementById('custNameRegPage').value;
				 const packageId = document.getElementById('listmstr_select_combination').value;
			   jQuery.ajax({
					async : false,
					url: `${excelSheetURL}?customerTypeId=${customerTypeId}&customerNameId=${customerNameId}&packageId=${packageId}`,					
					catche : false,
		      
		            success: function (response) {
		            	excelSheetValue(response);
		              
		            }, error: function () {
		                alert("not found");
		            }
		        })
		    };
		   //below table data values changed by prayag for ticket_id DB_0029
		    function excelSheetValue(response){
		    	const data = response.lstConfigurService;
                const tableData = data.map(function(value){
                    return (
                        `<tr>
                            <td>${value.charges}</td>
                            <td>${value.chargesId}</td>
                            <td>${value.chargesSlaveId}</td>        
                            <td>${value.createdBy}</td>
                            <td>${value.deleted}</td>
                            <td>${value.distribute}</td>
                            <td>${value.masterId}</td>
                            <td>${value.number}</td>
                            <td>${value.operator}</td>
                            <td>${value.serviceId}</td>
                            <td>${value.unitId}</td>
                            <td>${value.hallId}</td>
                            <td>${value.hallSlaveId}</td>
                            <td>${value.departMentID}</td>
                            <td>${value.hallCharges}</td>
                            <td>${value.medicalCharges}</td>
                            <td>${value.copay}</td>
                            <td>${value.totalcharges}</td>
                            <td>${value.isComServId}</td>
                            <td>${value.isComServlastId}</td>
                            <td>${value.serviceLastId}</td>
                            <td>${value.iscombination}</td>
                            <td>${value.iscatHall}</td>
                            <td>${value.selfId}</td>
                            <td>${value.codenamech}</td>
                            <td>${value.custType}</td>
                            <td>${value.custName}</td>                           
                        </tr>`
                    );
                }).join('');
            const tabelBody = document.querySelector("#tableBody");
                tableBody.innerHTML = tableData;	
		    };	    
		    	    
//-------------------end by manish 

function reload(){
	window.location.reload(true);
}

function refreshConfig() {

	$('#number').val("");
	$('#configId').val("");
	$('#distribute').val("");
	$('#operator').val("0");
	$('#hallCharges').val("0");
	$('#medicalCharges').val("0");
	$('#deptIdForConfig').val("0");

	// radio button to un check
	$('input[name="incdecType"][value="+"]').prop('checked', false);
	$('input[name="incdecType"][value="-"]').prop('checked', false);

	var chargesId = $("#lis0").val();
	var HallId = $("#lisH0").val();
	var isComServId = $("#lisHc0").val();
	var masterId = $("#li0").val();
	removeInpuntFildForCharges(0, chargesId, 'dynamicItems');
	removeInpuntFildForCharges2(0, HallId, 'dynamicItems2');
	removeInpuntFildcom(0, isComServId, 'dynamicItemcom');
	removeInpuntFild(0, masterId, 'dynamicItem');

	$("#operator").val("");
	$("#deptIdForConfig").val("");
	$("#hallCharges").val("");
	$("#medicalCharges").val("");
	$("#totalcharges").val("");

	$("#rightDiv").empty();
	$('#fromDate').val("");// empty from date
	$('#toDate').val(""); // empty to date
	//window.location.reload(true);
	
	$('#divLine1').show();
	$('#fromYear').val('N');
	$('#yearwise').attr('checked', false);
	$("#subIDs").empty();
	$('#queryType').val("insert");
	$('#countDates').val(0);
	
	$('#unitList').select2('val',0);
	$('#custTypeForRegPage').select2('val',0);
	$('#custNameRegPage').select2('val',0);	
	$("#unitList").prop("disabled",false);
}
/*******
 * @author    :Vinod Udawant
 * @Date      :05-06-2017
 * @Code      :When we click on apply button the calculations will happen auto
 * ******/
function apply() {
	var cmt = 1;
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute= parseFloat($("#distribute").val());
	var totalcharges= parseFloat($("#totalcharges").val());


	if (distribute == "" || distribute == null || distribute == undefined || isNaN(distribute)) {
		distribute = 0;
	}
	
	//FOR EACH LOOP TO GET ALL CHARGES FROM RIGHT DIV
	$(".right_Charges").each(function() {

		
		var charges = parseFloat($(this).val());
		
		if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
			charges = 0;
		}
		
		//formulas for distribute the values 

		
		var rightDivLength = $("#rightDiv tr").length;
		if(number > 0 ){
			if (rightDivLength == 0) {
				alert("Please Take Atleast One Charges To Save Or Update!");
				
				return false;
				

		}else if ((operator != "+") && (operator != "-") && (operator != "%")) { // operator validation
			alert("Please Select One Operator To Perform Calculations!");
			
			return false;
		  }
		}

		
		if (operator == "%") {

			if (increaseordecrease == "+") {
				var incdec = charges * number / 100;
				charges = (charges + incdec);
				if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
					charges = 0;
				}
			} else if(increaseordecrease == "-"){
				var incdec = charges * number / 100;
				charges = (charges - incdec);
				if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
					charges = 0;
				}
			}else{
				alert("Please check increase or decrease! ");
				return false;
				
			}

		} else if (operator == "+") {

			charges = (charges + number);
			if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
				charges = 0;
			}
		} else if(operator == "-"){
			charges = (charges - number);
			if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
				charges = 0;
			}
		}else{
			//Formulas for Distributed value
			if(distribute >0){
				var IncDecP=charges*100/totalcharges;
				charges=(IncDecP*distribute/100).toFixed(2);
			}
			
			
			if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
				charges = 0;
			}
			
		}
		if (charges < 0) {
			charges =0;
		}
		$(this).val(parseFloat(charges).toFixed(2));
		
		cmt++;
		totalAmount();
		
		//AFTER FIRST APPLY DISABALING THE APPLY BUTTON
	    var button = $('#apply');

	    // Disable the apply button while evaluating if the condition should be apply
	    button.prop('disabled', true);

	    var valid = true;    

	   
	    // "valid" to false if the validation fails

	    if (!valid) { 
	        // Prevent form from applying  if validation failed
	        e.preventDefault();

	        // Reactivate the button if the apply was not applied
	        button.prop('disabled', false);
	    }

	});
	
	$(".right_altSubService").each(function() {
	var alternateSubserviceName = $(this).val(); 
	var altSubserviceid= $(this).val(); 
	 var valid = true;  
 if (alternateSubserviceName ==='') {
            valid = false;
        }
if(altSubserviceid==''){
	    valid =false;
         }

if (!valid) {
        e.preventDefault();
    }

    if (valid) {
      
          $('#apply').prop('disabled', false);
    } else {

        $('#apply').prop('disabled', true);
       }
	});
	 
	}
/*******
 * @author    :Vinod Udawant
 * @Date      :06-06-2017
 * @Code      :For saving multiple records in charges configuration  
 * ******/
function saveConfigurationService() {
    /*var fromYear =$('#fromYear').val();
    if (fromYear == 'Y') {
		saveYearWise();
		return false;
	}*/
	
	//var custType = $("#custTypeForRegPage").val();
	var custType = $("#custTypeForRegPage").val();
	if (custType == 0 || custType == "" || custType == null || custType == undefined) {
		alert("Please select customer type");
		return false;
	}
	
	 var customerType=$("#custTypeForRegPage").val();
	//var custName = $("#custNameRegPage").val();
	var custName = $("#custNameRegPage").val();
	if (custName == 0 || custName == "" || custName == null || custName == undefined) {
		alert("Please select customer name");
		return false;
	}
	var alternateSubserviceName=$("#alternateSubserviceName").val();
	var altSubserviceid=$("#altSubserviceid").val();
	var configIdf = $("#configId").val();
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute= parseFloat($("#distribute").val());
	var queryType = $("#queryType").val();
	var totalcharges= parseFloat($("#totalcharges").val());
	var copay = 0;
	var selfId =$("#selfId").val();
	var iscatHall =$("#iscatHall").val();
	
	//For Service Id
	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	
	//For Charges Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	
	//For Hall Wise Id  
	var HallId = $("#lisH0").val();// chargesId
	var HallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	HallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	//For Is combination service id
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	//From Date To Date
	var fromDate = $("#jvfromDate").val().trim();
	var toDate = $("#jvtoDate").val().trim();
	    
	if (fromDate == "" || fromDate == null || fromDate == undefined) {
		alert("Please select from date");
		return false;
	}	
	
	if (toDate == "" || toDate == null || toDate == undefined) {
		alert("Please select to date");
		return false;
	}	
	
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
    //charges  validation
    if(liSize > 0){
    	if(liSize <= 1){ 
    		alert("Please Select Atleast One charges and two sub Charges! ");
    		SetFocus('dynamicItems');
    		return false;
    		
    	}
    }
		
	//charges Hall validation liSizeForServices
    if(liSizeHall > 0){
    	if(liSizeHall <= 1){
    		alert("Please Select Atleast One Hall and one sub Hall! ");
    		SetFocus('dynamicItems2');
    		return false;
    	}
    	
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
	
	var unitId = $("#unitList").val();
		if(unitId == 0){
		alert("Please Select Unit");
		return false;
	}
	
	
    if (copay == "" || copay == null || copay == undefined || isNaN(copay)) {
    	copay = 0;
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
	
	if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
		 isComServId = 0;
	}
	 
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		 isComServlastId = 0;
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
	 
    if (masterId == "" || masterId == null || masterId == undefined) {
			masterId = 0;
    }
		

	if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}

	if (HallId == "" || HallId == null || HallId == undefined) {
			HallId = 0;
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
	if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		selfId = 0;
	}
	if (iscatHall == "" || iscatHall == null || iscatHall == undefined || isNaN(iscatHall)) {
		iscatHall = "N";
	}
	
	/****comparing to date not be past means it should show future ****/
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
        //$("txttodate").val('');
        alert("Start date should not be greater than end date");
        return false;
    }
	/****comparing to date not be past means it should show future ****/
	
	/*if (fromDate == "" || fromDate == null || fromDate == undefined) {
		fromDate = "0000-00-00";
	}
	
	if (toDate == "" || toDate == null || toDate == undefined) {
		toDate = "0000-00-00";
	}*/
	
	// defined array to save list of records
	//var cmt = 1;
	var configurationDetails = {
		lstConfigurService : []
	};
	var altSubServiceDto = {
		lstAltSubService : []
	};
	
	//geting all config ids  
	var configIds=new Array();
	 $(".idc").each(function() {
		 configIds.push($(this).val());
	 });	
	
	//geting all service ids  
	var serviceIDs=new Array();
	$(".subserviceIds").each(function() {
			 serviceIDs.push($(this).val());
	});
	
	//geting All charges  
	var chargess=new Array();
	$(".right_Charges").each(function() {
		chargess.push($(this).val());
	});

	//getting all code name ch 
	var codenamech=new Array();
	$(".right_Codename").each(function() {
		codenamech.push($(this).val());
	});
	//getting alternate subservice  
	var alternateSubserviceName=new Array();
	$(".right_altSubService").each(function() {
		alternateSubserviceName.push($(this).val());
	});
	//getting altsubserviceid
	var altSubserviceid=new Array();
	$(".right_altSubServiceid").each(function() {
		altSubserviceid.push($(this).val());
	});
	var i;
	for (i = 0; i < serviceIDs.length; ++i) {
	    var altSubserviceName =alternateSubserviceName[i];
        //var id = altSubserviceid[i];
		var charges =chargess[i];
		var serviceId =serviceIDs[i];
		var configId =configIds[i];
		var codename =codenamech[i];
		
		if (configId == "" || configId == null || configId == undefined) {
			configId = 0;
		}
		
		if (chargesId == "" || chargesId == null
				|| chargesId == undefined) {
			chargesId = 0;
		}

		if (chargesSlaveId == "" || chargesSlaveId == null
				|| chargesSlaveId == undefined) {
			chargesSlaveId = 0;
		}
		
		configurationDetails.lstConfigurService.push({
			custType        : custType,
			custName        : custName,
			charges        : charges,
			serviceId	   : serviceId,
			operator       : operator,
			number         : number,
			increaseordecrease : increaseordecrease,
			chargesId       : chargesId,
			chargesSlaveId  : chargesSlaveId,			
			distribute      : distribute,
			fromDate        : fromDate,
			toDate          : toDate,
			departMentID    :departMentID,
			copay           : copay,
			totalcharges    : totalcharges,
			isComServId     : isComServId,
			isComServlastId : isComServlastId,
			serviceLastId   : serviceLastId,
			configId        : configId,
			iscombination   : iscombination,
			selfId          : selfId,
			iscatHall       : iscatHall,
			codenamech      : codename,
			alternateSubserviceName : altSubserviceName
		});
		
		/*altSubServiceDto.lstAltSubService.push({
				id : id,
			    customerType : customerType,
			    customerId  : custName,
                subServiceId:serviceId,
				altSubserviceName :altSubserviceName,
				unitId : unitId,
				
			});*/
	}
	
	//Json List 
	configurationDetails = JSON.stringify(configurationDetails);
	 //obj = JSON.stringify(altSubServiceDto);
		
	var inputs = [];
	inputs.push("configurationDetails="
			+ encodeURIComponent(configurationDetails));
	
	//inputs.push("obj=" + encodeURIComponent(obj));
	inputs.push('configId=' + configIdf);
	inputs.push('operator=' + encodeURIComponent(operator));
	inputs.push('queryType=' + queryType);
	inputs.push('chargesId=' + encodeURIComponent(chargesId));
	inputs.push('chargesSlaveId=' + encodeURIComponent(chargesSlaveId));
	inputs.push('masterId=' + encodeURIComponent(masterId));
	inputs.push('HallId=' + encodeURIComponent(HallId));
	inputs.push('HallSlaveId=' + encodeURIComponent(HallSlaveId));
	inputs.push('hallCharges=' + encodeURIComponent(hallCharges));
	inputs.push('medicalCharges=' + encodeURIComponent(medicalCharges));
	inputs.push('isComServId=' + encodeURIComponent(isComServId));
	inputs.push('isComServlastId=' + encodeURIComponent(isComServlastId));
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	//alert('str***** '+str)
	
	$('#pleaseWait').show();
	jQuery.ajax({
		
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labchargesconfig/saveConfiguration",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			alertify.success(r);
			$('#pleaseWait').hide();
			refreshConfig();
			
		}
	});
	
	//total to be refresh after save and update 
	//$("#totalcharges").val("");
	 var button = $('#apply');

	    //able the apply button while evaluating if the condition should be apply
	    button.prop('disabled', false);

	    var valid = true;    

	   
	    // "valid" to false if the validation fails

	    if (!valid) { 
	        // Prevent form from applying  if validation failed
	        e.preventDefault();

	        // Reactivate the button if the apply was not applied
	        button.prop('disabled', true);
	    }
	    
	    
}

/*******
 * @author    :Vinod Udawant
 * @Date      :31-05-2017
 * @Code      :For fetching sub services on load
 * ******/
function fetchSubServiceCategoryList(unitId) {
var servicesInfo=$("#servicesInfo").val();
	var unitId=$("#unitList").val();
	$('#pleaseWait').show();
 
	jQuery.ajax({
		async : true,
		type : "POST",
		data: {
            unitId: unitId // Pass the unitId as data in the AJAX call
        },
		url : "ehat/subservice/SubServiceCategoryList",

		error : function() {
			alert('error');
		},
		success : function(response) {
            $('#pleaseWait').hide();
			divId = response;
			if (servicesInfo == "servicesInform") {
				fetchlistS();
				
			}else{
				SubServiceTemplatedemo(response) ;
					

			}
			
		}
	});
}
/*******
 * @author    :Vinod Udawant
 * @Date      :31-05-2017
 * @Code      :For setting template for sub services on load
 * ******/
function SubServiceTemplatedemo(response) {
	
	var htm = "";
	var index = $("#rightDiv tr").length;
	for ( var i = 0; i < response.lstSubService.length; i++) {
		
		htm = htm
			
				+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class='col-sm-5 center' id='chName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].categoryName
				+ "</td><td class='col-sm-5-1 center' id='unitName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].unitName
				+ "</td>"
				+ "<td class='col-sm-5-1 center' id='charges" + (index + 1)+"' style='height: 21.5px;' >"
				//below line changes from response.lstSubService[i].charges to response.lstSubService[i].b2bCharges by Rohit on 11-01-2022
				+"<input type='text' class='left_Charges' readonly id='inCharges" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ response.lstSubService[i].b2bCharges+"'"
				
				+ "</td>" 
				
				+  "<input type='hidden' class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ response.lstSubService[i].subId + "'>"
				
				+ "<td id='lastTd"+(index + 1)+"'><input type='button' value='>>' id='inputCnt"+ (index + 1) + "' onclick='addTRtoRight("+(index + 1)+")'>" 
				
				
				+ "</tr>" ;
			
		index++;
	}

	$("#leftDiv").html(htm);
	$('#pleaseWait').hide();
}


/*******
 * @author    :Vinod Udawant
 * @Date      :10-JUN-2017
 * @Code      :For Adding TR to right div
 * ******/
function addTRtoRight(trCnt) {
	
	var subIDs=$("#subbId"+trCnt).val();	
	 var subValues = $("#subIDs").html().split(",");

		var position =subValues.indexOf(subIDs);
		if(position>=0){
			return false;
		}
	var chName     = $("#chName"+trCnt).text();
	var unitName     = $("#unitName"+trCnt).text();
	//var charges    = $("#charges"+trCnt).val();
	var inCharges  = $("#inCharges"+trCnt).val();
	var alternateSubserviceName=$("#alternateSubserviceName"+trCnt).val();
	var altSubserviceid=$("#altSubserviceid"+trCnt).val();
	var index = $("#rightDiv tr").length;
	
	
	$('#rightDiv').append('<tr id="trs'+(index+1) +'">'
    		+'<td id="chNamer'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+chName+'</td>'
			+'<td id="unitNamer'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+unitName+'</td>'
    		+'<td id="chargesr'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'
    		+'<input id="inChargesr'+(index+1) +'" class="right_Charges" type="text"  class="col-sm-4-1 center" value="'+inCharges+'" onkeyup="totalAmount()" onkeypress="return validateNumOnly(event)" name="charges'+(index+1) +'"  onpaste="validatePaste(this, event)">'
    		+'<input id="subbIdr'+(index+1) +'" class="subserviceIds" type="hidden" value="'+subIDs+'"></td>'
    		+'<td id="lastTdr'+(index+1) +'">'
    		+'<input id="inputCntr'+(index+1) +'" type="button" value="<<" onclick="addTRtoLeft('+(index+1) +')"></td>'
    		+'</tr>');  

	$('#tr' + trCnt).remove();	
	$('#subIDs').append(","+subIDs);

	totalAmount();
	
}
/*******
 * @author    :Vinod Udawant
 * @Date      :10-JUN-2017
 * @Code      :For Adding TR to left div
 * ******/
function addTRtoLeft(trCnt) {

	var subIDs=$("#subbIdr"+trCnt).val();	
	var subValues = $("#subIDs").html();
	var temp =  subValues+","; 
	var myString = temp.replace(","+subIDs+",",',');
	var setVal = myString.slice(0,-1);
	$('#subIDs').html(setVal);
	
	var chName     = $("#chNamer"+trCnt).text();
	var unitName     = $("#unitNamer"+trCnt).text();
	//var charges    = $("#chargesr"+trCnt).val();
	var inCharges  = $("#inChargesr"+trCnt).val();
	var alternateSubserviceName=$("#alternateSubserviceNamer"+trCnt).val();
 	var altSubserviceid=$("#altSubserviceidr"+trCnt).val();
	var index = $("#leftDiv tr").length;
	
	
	$('#leftDiv').append('<tr id="tr'+(index+1) +'">'
    		+'<td id="chName'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+chName+'</td>'
			+'<td id="unitName'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+unitName+'</td>'
    		+'<td id="charges'+(index+1) +'" class="col-sm-1 center" style="height: 21.5px;">'
    		+'<input id="inCharges'+(index+1) +'" class="left_Charges" type="text"  value="'+inCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
    		+'<input id="subbId'+(index+1) +'" class="subserviceId" type="hidden" value="'+subIDs+'"></td>'
            +'<input id="alternateSubserviceName'+(index+1) +'"class="left_altSubService"  type="hidden" value="'+alternateSubserviceName+'">'
            +'<input id="altSubserviceid'+(index+1) +'" class="left_altSubServiceid"  type="hidden" value="'+altSubserviceid+'">'
    		+'<td id="lastTd'+(index+1) +'">'
    		+'<input id="inputCnt'+(index+1) +'" type="button" onclick="addTRtoRight('+(index+1) +')" value=">>"></td>'
            
    		+'</tr>');
	
	
	
	$('#trs'+trCnt).remove();
	
	 totalAmount();
}
/*******
 * @author    :Vinod Udawant
 * @Date      :10-JUN-2017
 * @Code      :For Adding All TR to right div
 * ******/

function addAllTRtoRight() {
	/*$('#pleaseWait').show(function(){
		
		$("#leftDiv tr").each(function() {
			var tk=$(this).attr('id').toString();
			var id = tk.slice(2);
			addTRtoRight(id);		
		});
		$('#pleaseWait').hide();
	});*/
	
		$("#leftDiv tr").each(function() {
			var tk=$(this).attr('id').toString();
			var id = tk.slice(2);
			addTRtoRight(id);		
		});
		
	//var index = $("#rightDiv tr").length;
	
	totalAmount();
}

/*******
 * @author    :Vinod Udawant
 * @Date      :10-JUN-2017
 * @Code      :For Adding All TR to left div
 * ******//*
function addAllTRtoLeft() {

	//var index = $("#rightDiv tr").length;
	$("#rightDiv tr").each(function() {
		var tk=$(this).attr('id').toString();
		var id = tk.slice(2);
		addTRtoLeft(id);
	});
	
	 
}*/

/*******
 * @author    :Vinod Udawant
 * @Date      :26-MAY-2017
 * @Code      :For fetching all servies on load and sub services
 * ******/
function fetchAllService() {
	
	var unitId = $("#unitList").val();
	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		
		success : function(response) {
			multiSelect(response);
			fetchSubServiceCategoryList(unitId);
		}
	});

}

/*******
 * @author    :Vinod Udawant
 * @Date      :26-MAY-2017
 * @Code      :For fetching all  sub services with master and self id
 * ******/
function fetchSubServiceIsCat(masterId, selfId , unitId) {
	var servicesInfo=$("#servicesInfo").val();
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCat",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId),
			 "unitId" : parseInt(unitId)
		},
		success : function(response) {
			if (servicesInfo == "servicesInform") {
				servicesInfoTemplate(response) ;
			}else{
			SubServiceTemplatedemo(response);			
			//setTemplateForBedView(response);
			}

		}
	});
}

/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/


// multiselect ui
function multiSelect(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	
	$("#listmstr_select").html(list);
	$("#listmstr_select").select2();	

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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	var unitId = $('#unitList').val();
	if (liSize == 0) {

		fetchAllService();
		
	} else {
		
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		
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
		
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		
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

function showData(){
	//For Service Id
	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var selfId  =0;
	var unitId =  $('#unitList').val();
	
	if (liSizeForServices > 1) {
		selfId =$("#li" + (liSizeForServices - 1)).val();
	}
	
	
		 fetchSubServiceIsCat(masterId, selfId, unitId);

	
	
}

/*******
 * @author    :Vinod Udawant
 * @Date      :26-MAY-2017
 * @Code      :For fetching all  sub services by id with master and self id
 * ******/
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
			
		}
	});
}
/*******
 * @author    :Vinod Udawant
 * @Date      :26-MAY-2017
 * @Code      :For fetching id of sub service name
 * ******/

function selectSubService() {
	
	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	fetchSubServiceById(masterId, selfId);
}



/*******
 * @author    :Vinod Udawant
 * @Date      :27-MAY-2017
 * @Code      :Multi select list of sponsor 
 * ******/
function multiSelectForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}

	$("#listmstr_select_service").html(list);
	
}
/*******
 * @author    :Vinod Udawant
 * @Date      :27-MAY-2017
 * @Code      :Multi select list of sponsor here setting sponsor list
 * ******/
function setDyanamicDivForCharges(setDiv, getDiv) {

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
		
	}

}

/*******
 * @author    :Vinod Udawant
 * @Date      :27-MAY-2017
 * @Code      :Multi select list of sponsor Here removing one one services 
 * ******/
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
		
	}
}
/*******
 * @author    :Vinod Udawant
 * @Date      :27-MAY-2017
 * @Code      :Multi select sub list of sponsor 
 * ******/
function multiSelectSlaveForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var isCategory = response.lstChargesSlave[i].isCategory;
		
		if (isCategory == "Y") {
			
			list = list 
			+ '<option value="'
					+ (response.lstChargesSlave[i].slaveId) + '">'
					+ (response.lstChargesSlave[i].categoryName +'(C)') 
					+ '</option>';
			
		} else {
			list = list + '<option value="'
					+ (response.lstChargesSlave[i].slaveId) + '">'
					+ (response.lstChargesSlave[i].categoryName +"(S)") + '</option>';
		}

	}
	
	$("#listmstr_select_service").html(list);
	
	//dynamically setting data on right div when query type is insert
	var queryType = $("#queryType").val();
	if(queryType == "insert"){
		fetchconfigdataonclick();
	}
	
}


/*******************************************************************************
 * Touheed's Plugin for Multi select for Hall wise charges 
 ******************************************************************************/

// MULTI SELECT UI LIST FOR HALL 
function multiSelectForCharges2(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}
	$("#listmstr_select_Hall").html(list);
}

// Touheed for multiselect Data
//SETTING DYNAMIC DIV OF HALL
function setDyanamicDivForCharges2(setDiv, getDiv) {
	// listmstr_select

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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges2('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster2();// for masters
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById2(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveListById2(masterid, selfId);
		}
		
	}// now inside submaster catagories

}
//MULTI REMOVE OF HALL 
function removeInpuntFildForCharges2(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesH' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster2();
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById2(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveListById2(masterid, selfId);
		}
		
	}
}

//MULTI SELECT SUB LIST FOR HALL 
function multiSelectSlaveForCharges2(response) {

	var list = "<option></option>";
	
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		
		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
		var selfId   =response.lstChargesSlave[i].selfId;
		var iscatHall=response.lstChargesSlave[i].isCategory;
		$("#selfId").val(selfId);
		$("#iscatHall").val(iscatHall);
	}
	
	$("#listmstr_select_Hall").html(list);
	//dynamically setting data on right div when query type is insert
	var queryType = $("#queryType").val();
	if(queryType == "insert"){
		fetchconfigdataonclick();
	}
}




/*******
 * @author    :Vinod Udawant
 * @Date      :27-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) 
 * ******/
function getAllChargesMaster() {
	var callfrom="sponsor";
	jQuery.ajax({
		type : "GET",
		url : "ehat/charges/sponsorandhallList",
		data : {
			"callfrom" : callfrom
			
		},
		success : function(response) {
			multiSelectForCharges(response);
		}
	});

}

/*******
 * @author    :Vinod Udawant
 * @Date      :23-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) //
 * ******/
function getAllChargesMaster2() {
	var callfrom="hall";
	jQuery.ajax({
		type : "GET",
		url : "ehat/charges/sponsorandhallList",
		data : {
			"callfrom" : callfrom
			
	},
		success : function(response) {
			multiSelectForCharges2(response);
		}
	});

}
/*******
 * @author    :Vinod Udawant
 * @Date      :24-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) 
 * ******/
function fetchChargesSlaveListById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getChragesSlaveById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		
		},
		success : function(response) {
			
			multiSelectSlaveForCharges(response);
			
		}
	});
}

/*******
 * @author    :Vinod Udawant
 * @Date      :24-MAY-2017
 * @Code      :Geting sub hall and sub sponsor list(charges slave list) 
 * ******/
function fetchChargesSlaveListById2(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getChragesSlaveById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		
		},
		success : function(response) {
			multiSelectSlaveForCharges2(response);
		}
	});
}
/*******
 * @author    :Vinod Udawant
 * @Date      :09-JUN-2017
 * @Code      :For performing alculations on services
 * ******/
function totalAmount() {

	var total = 0;
	var cmt = 1;
	
	$(".right_Charges").each(function() {
		
		var charges  = parseFloat($(this).val());
		if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
			charges = 0;
		}
		total = total + charges;
		

	});
	
	cmt++;
	

	$("#totalcharges").val(parseFloat(total).toFixed(2));
	
	
}

/*******
 * @author    :Vinod Udawant
 * @Date      :12-JUN-2017
 * @Code      :For performing auto suggesstion on left div
 * ******/
function setAutoCompleteForConfiguration(inputId, callfrom) {

	var masterId =   0;   
	/*$('#listmstr_selects').val(); */
	var selfId =0;// self id
	var unitId = $('#unitList').val();
	var liSize = $("#dynamicItem li").length;
	
	var findingName = $("#" + inputId).val();
    if(findingName.length == 0){
    	var dynamicItem="dynamicItem";
    	var id="listmstr_select";
    	removeInpuntFild(dynamicItem,id,1);
    }
	
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	var inputs = [];
    if (liSize == 0 ) {
		
		inputs.push('selfId=' + selfId);
		inputs.push('serviceId=' + masterId);
		inputs.push('unitId=' + unitId);
		inputs.push('letter=' + encodeURIComponent(letter));
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/subservice/autoSuggestionSubServiceNames",
			success : function(r) {
				
				SubServiceTemplatedemo(r);
				

			}
		});
	} else {
		masterId= $("#li0").val();
		        /*masterId   = $('#listmstr_selects').val();*/
		
		if (liSize > 1 ) {
		selfId = $("#li" + (liSize - 1)).val();
		}
		
		inputs.push('selfId=' + selfId);
		inputs.push('serviceId=' + masterId);
		inputs.push('unitId=' + unitId);
		
		inputs.push('letter=' + letter);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/subservice/getSubServiceIsCatForSearch",
			success : function(r) {
				
				SubServiceTemplatedemo(r);
				

			}
		});
	}

}
/*******
 * @author    :Vinod Udawant
 * @Date      :09-JUN-2017
 * @Code      :For setting list which comes from auto suggesstion
 * ******/
function autoCompTable1(response, id) {
	var myArray = response;// parsing response in JSON format
	
			$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id)
			.mcautocomplete(
					{
						
						showHeader : true,
						columns : [ {
							name : 'Category Name',
							width : '100px',
							valueField : 'categoryName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {
							//var spl = (ui.item.spl = "" ? '' : ui.item.spl);
							console.log(ui.item);
								
								$('#byName').val(ui.item.categoryName);
							

							return false;
						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
						
							console.log(data);
							console.log(data.lstSubService.length);
							var result;
							if (!data) {
								
								result = [ {
									/* 'dn' : 'No', */
									/*'categoryName' : 'Record',*/
								
								} ];
							} else {
								result = data.lstSubService;// Response List for
															// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");
						}
					});
}



/*******
 * @author    :Vinod Udawant
 * @Date      :14-JUN-2017
 * @Code      :For fetching configuration list 
 * ******/
function fetchConfigurationChargesList(callfrom) {
   /* $("#pleaseWait").hide();*/
    $('#callfrom').val(callfrom);
    /*=====================================================*/
    //added by prayagraj
    var letter = $.trim($("#searchCust").val());
    var inputs = [];
	type="";
	inputs.push('callfrom=' + callfrom);
	inputs.push('letter='+encodeURIComponent(letter));
	var str = inputs.join('&');
	
	/*=======================================================*/
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data :str+"&reqType=AJAX",
		url : "ehat/labchargesconfig/getConfigurationListFromView",

		error : function() {
			alert('error');
		},
		success : function(response) {
			$("#pleaseWait").hide();
			ConfigurationChargesTemplate(response);
		}
	});
}


/*******
 * @author    :Vinod Udawant
 * @Date      :14-JUN-2017
 * @Code      :For fetching configuration list 
 * ******/
function fetchConfigurationChargesList2() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/labchargesconfig/getConfigurationListFromView2",

		error : function() {
			alert('error');
		},
		success : function(response) {
			
			ConfigurationChargesTemplate(response);
		}
	});
}


/*******
 * @author    :Vinod Udawant
 * @Date      :14-JUN-2017
 * @Code      :For  configuration list charges and sub charges (template)
 * ******/
function ConfigurationChargesTemplate(response) {

	/*var ht ="";
	ht= '<input class="form-control input-sm" id="byName" onkeyup="searchall(this.id)" '
		+' type="text" placeholder="Search" aria-controls="datatable1">';*/
	var htm = "";
    
	htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">Sr.No</th>'	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Customer Type</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Customer Name</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Package</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Unit Name</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
		
		
	
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='customerType"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].customerType
				+ "</td>" 
				+"<td col-md-2-1 center center' id='customerName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].customerName
				+ "</td>"			
				
				+"<td col-md-2-1 center center' id='packageName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].packageName
				+ "</td>"
				
				+"<td col-md-2-1 center center' id='unitName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].unitName
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].custTypeId + ","+ response.lstConfigurations[i].custNameId + ", "+(index + 1)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-danger deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].custNameId + ", "+(index + 1)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index + 1) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].comServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].comServLastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
    /*$("#search").html(ht);*/
	$("#popupDiv").html(htm);

}

/*******
 * @author    :Vinod Udawant
 * @Date      :15-JUN-2017
 * @Code      :For updating records from configuration list with sponsor, hall and combinations 
 * ******/
function updateConfiguration(customerType,customerName,cnt) {
 
	var chargesId = $("#charges_id"+(cnt)).val();
	//var altsubserviceid =$("#altSubserviceid"+(cnt)).val();
	var chargesSlaveId = $("#chargesslave_id" +(cnt)).val();
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	//is combination flag
	var isComServId = $("#isComServId"+(cnt)).val();
	var isComServlastId = $("#isComServlastId" +(cnt)).val();
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	//Hall Id and Hall slave Id
	var hallId = $("#hall_id"+(cnt)).val();
	var hallSlaveId = $("#hallslave_id" +(cnt)).val();
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	}
	
	$('#queryType').val("update");
	//$("#leftDiv tr").remove();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/labchargesconfig/getConfigurationListFromViewForSub",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId),
			"customerType" : parseInt(customerType),
			"customerName" : parseInt(customerName),
		},
		error : function() {
			alert('Network Issue');
		},
		success : function(response) {
 $("#pleaseWait").hide();
			// ==================================================================
			// code added by ROHIT on 10 Oct 2022 for Ticket ID DB_0027
			// ==================================================================
			var custName = $("#customerName"+cnt).text();
			
			var custType = $("#customerType"+cnt).text();
			
			$("#lookupDetIdLay").val(customerType).select2();
			
			$("#unitList").attr("disabled", "disabled").select2();
			$("#unitList").val(response.lstServiceConfigurations[0].unitId).select2();
			
			/*var hms = "";
			hms += hms + "<option value='"+customerName+"' selected>"+custName+"</option>";
			$("#nameId").html(hms);			
			
			$("#nameId").val(customerName).select2();*/
		
			
			//@For lab name and Type
			var hmt = "";
			hmt += hmt + "<option value='"+customerName+"' selected>"+custName+"</option>";
			$("#custNameRegPage").html(hmt);			
			
			$("#custNameRegPage").val(customerName).select2();
			
			//
			var hmt = "";
			hmt += hmt + "<option value='"+customerType+"' selected>"+custType+"</option>";
			$("#custTypeForRegPage").html(hmt);			
			
			$("#custTypeForRegPage").val(customerType).select2();
			
			// ==================================================================
			// ==================================================================
			
			ConfigurationServiceTemplate(response);
			
			if (isComServId > 0 && isComServlastId > 0) {
				fetchSuperCatogoiresForCombination(isComServlastId);
				getAmountofService();
			}
			
			//fetch all sub services on left div
			fetchSubServiceCategoryList(unitId);			
					
				
			$('#dynamicItemcom').fadeTo('slow',.5); //added by prayag for ticket_id RG_093
			$('#dynamicItemcom').append('<div style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');
			
		}
	});	
}

function fetchSuperCatogoiresForCombination(serviceId) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchsup",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForCombination('dynamicItemcom', response);
		}
	});
}

function setDyanamicDivForCombination(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count = i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItmesHc'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="lisHc' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}
	$('#' + setDiv).html(htm);
}

/*******
 * @author    :Vinod Udawant
 * @Date      :15-JUN-2017
 * @Code      :For updating records from configuration list with sponsor, hall and combinations (setting template)
 * ******/
function ConfigurationServiceTemplate(response) {

	var htm = '';
	var number=0;
	var operator='';
	var increaseordecrease='';
	//var distribute=0;
	var fromDate='';
	var toDate='';
	var hallCharges=0;
	var medicalCharges=0;
	//var deptname='';
	var departMentID=0;
	var index = 0;
	//var cmt = $("#leftDiv tr").length;
	
	if(response.lstServiceConfigurations.length > 0){
		
		var customerType = response.lstServiceConfigurations[0].customerType;
		var customerId = response.lstServiceConfigurations[0].customerName;
		
		$("#custTypeForRegPage").select2('val',customerType);
		// commented by ROHIT on 9Nov 2022 for Ticket ID RG_001
		//getAllCustomers('custTypeForRegPage','custNameRegPage');
		$("#custNameRegPage").select2('val',customerId);
	}
	
	
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {
	
		var categoryName = response.lstServiceConfigurations[i].categoryName;
		var charges = response.lstServiceConfigurations[i].charges;
	    var idConfiguration =response.lstServiceConfigurations[i].idConfigurations;
		var serviceId=response.lstServiceConfigurations[i].serviceId;
		var codenamech = response.lstServiceConfigurations[i].codenamech;
		var unitName = response.lstServiceConfigurations[i].unitName;
	    number = response.lstServiceConfigurations[i].number;
		operator = response.lstServiceConfigurations[i].operator;
	//	distribute = response.lstServiceConfigurations[i].distribute;
		increaseordecrease = response.lstServiceConfigurations[i].increaseordecrease;		
		
		fromDate = new Date(response.lstServiceConfigurations[i].fromDate).toLocaleDateString('en-GB');
		toDate = new Date(response.lstServiceConfigurations[i].toDate).toLocaleDateString('en-GB');
		hallCharges = response.lstServiceConfigurations[i].hallCharges;
		medicalCharges = response.lstServiceConfigurations[i].medicalCharges;
		deptname = response.lstServiceConfigurations[i].deptname;
		departMentID =response.lstServiceConfigurations[i].departMentID;
		
		htm = htm
		
				
			
				+'<tr id="trs'+(i + 1)+'">'
				+'<td id="chNamer'+(i + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chNamer'+(i + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+unitName+'</td>'
				+'<td id="chargesr'+(i + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(i + 1)+'" class="right_Charges" type="text" onkeypress="return validateNumOnly(event)" value="'+charges+'" onkeyup="totalAmount()" name="charges'+(i + 1)+'">'
				+'</td>'
				+'<td id="lastTdr'+(i + 1)+'">'
				+'<input id="inputCntr'+(i + 1)+'" type="button" value="<<" onclick="addTRtoLeft('+(i + 1)+')"></td>'
				+'<input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '">'
				+'<input type="hidden" id="idConfiguration'+ (index + 1) +'" class="idc" value="'+ idConfiguration + '">'
				+'<input id="subbIdr'+(i + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
				
				+'</tr>';
		
		//,newdelete('+idConfiguration+') ,newdelete('+idConfiguration+')
		$('#subIDs').append(","+serviceId);
		index++;
		
		var selfId   =response.lstServiceConfigurations[i].selfId;
		var iscatHall=response.lstServiceConfigurations[i].iscatHall;
		$("#selfId").val(selfId);
		$("#iscatHall").val(iscatHall);
		
	}

	
	$("#number").val(number);
	$("#operator").val(operator);
	//$("#distribute").val(distribute);
	$("#fromDate").val(fromDate);
	$("#toDate").val(toDate);
	
	var fromDateAr = fromDate.split('/');
	var newFromDate = fromDateAr[2] + '-' + fromDateAr[1] + '-' + fromDateAr[0];	
	$("#jvfromDate").val(newFromDate);
	
	var toDateAr = toDate.split('/');
	var newToDate = toDateAr[2] + '-' + toDateAr[1] + '-' + toDateAr[0];	
	$("#jvtoDate").val(newToDate);
	
	$("#hallCharges").val(hallCharges);
	$("#medicalCharges").val(medicalCharges);
	$("#deptIdForConfig").val(departMentID);
	//$("#configId").val(idConfiguration); 
	
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


/*******
 * @author    :Vinod Udawant
 * @Date      :14-JUN-2017
 * @Code      :for fetching data on select box 
 * ******/
function fetchSuperCatogoiresSlave2(chargesMasterDto) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : parseInt(chargesMasterDto)
		},
		
		url : "ehat/chargesSlave/fetchsup",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForList2('dynamicItems',response);
		}
	});
}

/*******
 * @author    :Vinod Udawant
 * @Date      :17-JUN-2017
 * @Code      :for fetching data on select box 
 * ******/
function fetchSuperCatogoiresForHall(chargesMasterDto) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : parseInt(chargesMasterDto)
		},
		
		url : "ehat/chargesSlave/fetchsup",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForList3('dynamicItems2',response);
		}
	});
}
/*******
 * @author    :Vinod Udawant
 * @Date      :14-JUN-2017
 * @Code      :for fetching data on select box on edit
 * ******/
function setDyanamicDivForList2(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id   = response.lstChargesSlave[i].slaveId;
        var isCategory = response.lstChargesSlave[i].isCategory;
		
		if (isCategory == "Y") {
		 htm = htm+ '<li class="select2-search-choice" id="liItmes'
			+ i
			+ '">'
			+ '<div>'
			+ name+'(C)'
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}else{
		 htm = htm+ '<li class="select2-search-choice" id="liItmes'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
		}
	$('#' + setDiv).html(htm);
}

/*******
 * @author    :Vinod Udawant
 * @Date      :14-JUN-2017
 * @Code      :for fetching data on select box on eit
 * ******/
function setDyanamicDivForList3(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItmesH'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges2('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
	$('#' + setDiv).html(htm);
}


/*******
 * @author    :Vinod Udawant
 * @Date      :14-JUN-2017
 * @Code      :for deleting configuration data 
 * ******/
function deleteConfiguration(idConfiguration ,cnt ) {
	//charges Id and Charges Slave Id
	var chargesId = 0;//$("#charges_id" + (cnt)).val();
	var chargesSlaveId = 0;//$("#chargesslave_id" + (cnt)).val();
	
	//var isComServlastId = $("#isComServlastId"+cnt).val();

	if (chargesId == "" || chargesId == null || chargesId == undefined
			|| isNaN(chargesId)) {
		chargesId = 0;
	}

	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesId = 0;
	}

	// is combination flag
	var isComServId = 0;//$("#isComServId" + (cnt)).val();
	var isComServlastId = 0;//$("#isComServlastId" + (cnt)).val();
	isComServlastId = $("#isComServlastId"+cnt).val();

	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	
	// Hall Id and Hall slave Id
	var hallId = 0;//$("#hall_id" + (cnt)).val();
	var hallSlaveId = 0;//$("#hallslave_id" + (cnt)).val();

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined
			|| isNaN(hallSlaveId)) {
		hallSlaveId = 0;
	}
	
	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/labchargesconfig/deleteConfigurationList",
			data : {
				"idConfiguration" : parseInt(idConfiguration),
				"chargesId"       : chargesId,
				"chargesSlaveId"  : chargesSlaveId,
				
				"hallId"          : parseInt(hallId),
				"hallSlaveId"     : parseInt(hallSlaveId),
				
				"isComServId"     : parseInt(isComServId),
				"isComServlastId" : parseInt(isComServlastId)
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				alert(response);
				reload();
			}			
		});		
	}	
}


/*******
 * @author    :Vinod Udawant
 * @Date      :16-JUN-2017
 * @Code      :for setting from date and to date 
 * ******/
function fromDateToDate() {
	
	//$('.open-datetimepicker').datepicker();
	 $('#fromDate').datepicker({
	      autoclose: true
	  });
	 $('#toDate').datepicker({
	      autoclose: true
	    });
	
}


/*******
 * @author    :Vinod Udawant
 * @Date      :16-JUN-2017
 * @Code      :for getting list of department 
 * ******/
function getAllDeptForConfiguration() {
    jQuery.ajax({
        async : true,
        type : "POST",
        url : "ehat/dept/viewAllDeptList",
        error : function() {
            alert('error');
        },
        success : function(r) {
            setTempAllForConfiguration(r);//call template
        }
    });
}
/*******
 * @author    :Vinod Udawant
 * @Date      :16-JUN-2017
 * @Code      :for setting list of department 
 * ******/
function setTempAllForConfiguration(r) {
	var list = "<option value='0'>--Select Department--</option>";    
    for ( var i = 0; i < r.lstDepts.length; i++) {    

        list = list + "<option value='"+r.lstDepts[i].deptId+"'>" + (r.lstDepts[i].deptName) + "</option>";    
        }  
    $("#deptIdForConfig").html(list);
}

/*******
 * @author    :Vinod Udawant
 * @Date      :16-JUN-2017
 * @Code      :for tooltip 
 * ******/
function handleConfigurationTooltips() {
	
	$('.tip-focus').tooltip({
		trigger: 'focus'
	});
}



/**
 * @author  Vinod Udawant
 * @code    For fetching records from database of charges configuration 
 * ****/
function fetchAllListForUpdateFromCOnfiguration() {
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/labchargesconfig/fetchAllListForUpdate",
		
		success : function(response) {
			
			
		}
	});
}



/**
 * @author   Vinod Udawant
 * @date     20-JUN-2017
 * @code     For update the fields with id
 * ****/
function fetchAllListByHallIdAndByChargesId() {
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/labchargesconfig/fetchAllListByHallIdAndByChargesId",
		
		success : function(response) {
			
		}
	});
}



/**
 * @author  Vinod Udawant
 * @date    21-JUN-2017
 * @code    For fetching Hall type id 
 * **/
function fetchehatHallTypeId() {
	var hallTypeId = 22;
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/labchargesconfig/fetchehatHallTypeId",
		data : {
			"hallTypeId" : parseInt(hallTypeId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			
		}
	});
}


/**
 * @author    Vinod Udawant
 * @date      21-JUN-2017
 * @code      For fetching Hall id 
 * **/
function fetchehatHallNmaeId() {
	var hallId = 25;
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/labchargesconfig/fetchehatHallNmaeId",
		data : {
			"hallId" : parseInt(hallId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			
		}
	});
}


/**
 * @author    Vinod Udawant
 * @date      24-JUN-2017
 * @code      For fetching records from configuration based on sponsor id and hall id
 * **/
function fetchehatConfiguration() {
	var hallId = 2;
	var hallSlaveId = 4;
	var chargesId = 0;
	var chargesSlaveId = 0;
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/labchargesconfig/fetchAllListForUpdate",
		data : {
			"hallId" : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			"chargesId" : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			console.log(response);
			
		}
	});
}


/**
 * @author : Vinod Udawant
 * @date   : 31-july-2017
 * @code   : for multi select of combination of services***/

function multiSelectcom(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	$("#distribute").val(0);
	$("#listmstr_select_combination").html(list);

}

function setDyanamicDivcom(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmesHc'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisHc' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	
	if (liSize == 0) {
		fetchAllServicecom();// for masters
	} else {
		var masterid = $("#lisHc" + 0).val();
		var selfId = 0;
		if (liSize == 1) {
			//fetchSubServiceByIdcom(masterid, selfId);
			fetchSubServiceByUnitId(masterid, selfId);

		} else {
			selfId = $("#lisHc" + (liSize - 1)).val();
			fetchSubServiceByIdcom(masterid, selfId);
		}
		
	}// now inside submaster catagories

   
}

function removeInpuntFildcom(count, id, setDiv) {

	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesHc' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#lisHc" + 0).val();
	var selfId = 0;
	
	if (masterid == "" || masterid == null || masterid == undefined || isNaN(masterid)) {
		masterid = 0;
	}
	if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		selfId = 0;
	}
	if (liSize == 0) {
		fetchAllServicecom();

	} else {
		
		if (liSize == 1) {
			fetchSubServiceByIdcom(masterid, selfId);
		} else {
			selfId = $("#lisHc" + (liSize - 1)).val();
			
			if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
				selfId = 0;
			}
			fetchSubServiceByIdcom(masterid, selfId);
		}
		
	}
	$('distribute').val(0);
}


function multiSelectSlavecom(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';

	}
	$("#distribute").val(0);
	/*$("#distribute").val(response.lstSubService.charges);*/
	$("#listmstr_select_combination").html(list);

	// dynamically setting data on right div when query type is insert
	var queryType = $("#queryType").val();
	if (queryType == "insert") {
		fetchconfigdataonclick();
		getAmountofService();
	}
}
/**@author  :Vinod Udawant
 * @date    :14-aug-2017
 * @code    :getting amount of services**/
function getAmountofService() {

	//is combination flag
	var isComServId     = $("#lisHc0").val();
	var isComServlastId = 0;
	var liSizeCom       = $("#dynamicItemcom li").length;
	isComServlastId     =$("#lisHc" + (liSizeCom - 1)).val();
    
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getAmountofService",
		data : {
			"isComServlastId" : parseInt(isComServlastId)
		
		},
		success : function(response) {
		
			setAmountofService(response);
		}
	});
}

function setAmountofService(response) {

	var index = 0;
	var charges =0;
	var b2bcharges =0;
	var iscombination ='N';
	var businessType = $("#businessType").val()
	
	for ( var i = 0; i < response.lstSubService.length; i++) {

		 charges = response.lstSubService[i].charges;
		 b2bcharges = response.lstSubService[i].b2bCharges;
		 iscombination = response.lstSubService[i].iscombination;
		index++;
		

	}
	
	if(businessType == undefined || businessType == null)
		$("#distribute").val(charges);
	else if(businessType == 1)
		$("#distribute").val(b2bcharges);
	else
		$("#distribute").val(charges);		

	//$("#distribute").val(charges);
    $("#iscombination").val(iscombination);
	
}
/*******
 * @author    :Vinod Udawant
 * @Date      :16-JUly-2017
 * @Code      :for fetching list of combinations 
 * ******/
function fetchAllServicecom() {
	$('#listmstr_select_combination').attr("disabled","disabled").select2();
	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceListCom",
		
		success : function(response) {
			multiSelectcom(response);
			
		}
	});

}

/**
 * @author : Vinod Udawant
 * @date   : 31-july-2017
 * @code   : for fectch all sub services whose combination flag is Y under services
 * ***/
function fetchSubServiceByIdcom(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceByIdcom",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId),
		},
		success : function(response) {
		
			multiSelectSlavecom(response);
		}
	});
}

/**
 * @author Vinod Udawant
 * @date   31-july-2017
 * @code   for update of sub service list
 * **/
function fetchSuperCatogoiresForSub(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForSub('dynamicItem', response);
		}
	});
}

/**
 * @author Vinod Udawant
 * @date   31-july-2017
 * @code   for update of sub service list
 * **/
function setDyanamicDivForSub(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count = i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItme'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="li' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}
	$('#' + setDiv).html(htm);
}

/**
 * @author Vinod Udawant
 * @date   31-july-2017
 * @code   for update of Combination flag of service
 * **/
function fetchSuperCatogoiresForCombination(serviceId) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchsup",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForCombination('dynamicItemcom', response);
		}
	});
}

/**
 * @author Vinod Udawant
 * @date   31-july-2017
 * @code   for update of Combination flag of service
 * **/
function setDyanamicDivForCombination(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count = i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItmesHc'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="lisHc' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}
	$('#' + setDiv).html(htm);
}



/**
 * @author  Vinod Udawant
 * @date    31-JUN-2017
 * @code    for getting configuration data from view to show on popup
 * 
 **/
function getConfigurationdata(callfrom) {
	$('#callfrom').val(callfrom);
	
	if (callfrom == "combination") {
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"callfrom" : callfrom
			},
			url : "ehat/labchargesconfig/getConfigurationdata",

			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplatecom(response);
			}
		});
	} else if (callfrom == "sponsor") {
		jQuery.ajax({
			async : false,
			type : "POST",
			
			url : "ehat/labchargesconfig/getConfigdataSponsor",

			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplateSponsor(response);
			}
		});
	} else {
		jQuery.ajax({
			async : false,
			type : "POST",
			
			url : "ehat/labchargesconfig/getConfigdataHallWise",

			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplateHall(response);
			}
		});
	}

}

/**
 * @author   :Vinod Udawant
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div
 * **/
function fetchconfigdataonclick() {
	
	var customerType = $("#custTypeForRegPage").val();
	var customerId = $("#custNameRegPage").val();
	
	if (customerType == "" || customerType == null || customerType == undefined || isNaN(customerType)) {
		
		alert("Please select customer type");
		return false;
	}
	
	if (customerId == "" || customerId == null || customerId == undefined || isNaN(customerId)) {
		
		alert("Please select customer name");
		return false;
	}
	
	var length = $("#rightDiv tr").length;
	if(length > 0){
		$("#subIDs").text('');
		
	}
	//charges Id and Charges Slave Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = $("#lisHc0").val();
	var isComServlastId = 0;
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId =$("#lisHc" + (liSizeCom - 1)).val();
    
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = $("#lisH0").val();
	var hallSlaveId =0;
	var liSizeHall = $("#dynamicItems2 li").length;
    hallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	
	//$('#queryType').val("update");
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/labchargesconfig/getConfigurationListFromViewForSub",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId),
			"customerType" : parseInt(customerType),
			"customerName" : customerId
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
		
			setDynamicServicesOnright(response);
			//getTotServConfigTemp(response);
		}
	});		
}

/**
 * @author   :Vinod Udawant
 * @Date     :4-Aug-2017
 * @code     : for set dynamic services on right div
 * **/
function setDynamicServicesOnright(response) {

	var htm = '';
	
	var index = 0;
	
	var cmt = $("#leftDiv tr").length;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {

		var categoryName     = response.lstServiceConfigurations[i].categoryName;
		var charges          = response.lstServiceConfigurations[i].charges;
		var serviceId        =response.lstServiceConfigurations[i].serviceId;
		var idConfigurations =response.lstServiceConfigurations[i].idConfigurations;
		var codenamech       =response.lstServiceConfigurations[i].codenamech;
		var altsubservicename= response.lstServiceConfigurations[i].altSubserviceName;
		htm = htm
		
				
			
				+'<tr id="trs'+(cmt + 1)+'">'
				+'<td id="chNamer'+(cmt + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(cmt + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(cmt + 1)+'" class="right_Charges" type="text" value="'+charges+'" onkeyup="totalAmount()" name="charges'+(cmt + 1)+'">'
				+'</td>'
				+'<td id="alternateSubserviceNamer'+(cmt + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+altsubservicename+'</td>'
				
				
				+'<td id="codenamech'+(index+1) +'" class="col-sm-1-1 center" style="height: 21.5px;" >'
	    		+'<input id="inChargesr'+(index+1) +'" class="right_Codename" type="text"  value="'+codenamech+'">'
	    		+'</td>'
				
				+'<td id="lastTdr'+(cmt + 1)+'">'
				+'<input id="inputCntr'+(cmt + 1)+'" type="button" value="<<" onclick="addTRtoLeft('+(cmt + 1)+')"></td>'
				
				+'<input id="subbIdr'+(cmt + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
				+'<input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '">'
				+'<input type="hidden" id="idConfiguration'+ (index + 1) +'" class="idc"  value="'+ idConfigurations + '">'
				+'</tr>';
		
		//,newdelete('+idConfigurations+')
		$('#subIDs').append(","+serviceId);
		index++;
		cmt++;
		
		var selfId   =response.lstServiceConfigurations[i].selfId;
		var iscatHall=response.lstServiceConfigurations[i].iscatHall;
		$("#selfId").val(selfId);
		$("#iscatHall").val(iscatHall);
		$("#hallCharges").val(response.lstServiceConfigurations[i].hallCharges);
	}

	$("#rightDiv").html(htm);
	
	
	totalAmount();
}


/**
 * @author   :Vinod Udawant
 * @date     :5-Aug-2017
 * @code     :for setting template for combination
 * **/
function ConfigurationChargesTemplatecom(response) {

	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">Sr.No</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index + 1)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index + 1)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index + 1) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
   
	$("#popupDiv").html(htm);

}

/**
 * @author   :Vinod Udawant
 * @date     :5-Aug-2017
 * @code     :for setting template for sponsor
 * **/
function ConfigurationChargesTemplateSponsor(response) {

	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">Sr.No</th>'
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index + 1)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index + 1)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index + 1) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
   
	$("#popupDiv").html(htm);

}

/**
 * @author   :Vinod Udawant
 * @date     :5-Aug-2017
 * @code     :for setting template for hallWise
 * **/
function ConfigurationChargesTemplateHall(response) {

	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">Sr.No</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index + 1)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index + 1)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index + 1) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
  
	$("#popupDiv").html(htm);

}
/**
 * @author   :Vinod Udawant
 * @date     :28-08-2017
 * @code     :for delete one service
 * ***/
function newdelete(id) {
	if (id == "" || id == null || id == undefined || isNaN(id)) {
		id = 0;
	}
	if (id > 0) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/labchargesconfig/newdelete",
			data : {
				"id" : id
			},
			error : function() {
				alert('error');
			},
			success : function(response) {

			}
		});
	}

}
/**
 * @author   :Vinod Udawant
 * @date     :04-10-2017
 * @code     :for autosuggetion on popup with sponsor name sponsor slave,Hall,HallSlave,Combination,CombSlave
 *  ***/
function searchall(inputId) {
	var callfrom = $('#callfrom').val();
	
	if (callfrom == "combination") {
		searchcombination(inputId);
	} else if (callfrom == "sponsor") {
		searchsponsor(inputId);
	} else if (callfrom == "hallwise") {
		searchhallwise(inputId);
	} else {
		var usertype = "";
		var letter = "";
		if (callfrom = "search") {
			letter = $("#byName2").val();
		}
		var findingName = $("#" + inputId).val();

		var inputs = [];

		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/labchargesconfig/searchall",

			success : function(r) {

				ConfigurationChargesTemplate(r);

			}
		});
	}
}
/**
 * @author   :Vinod Udawant
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Combination,CombSlave 
 * ***/
function searchcombination(inputId){
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labchargesconfig/searchcombination",

		success : function(r) {

			ConfigurationChargesTemplatecom(r);

		}
	});
}

/**
 * @author   :Vinod Udawant
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Sponsor and sponsor slave
 *  ***/
function searchsponsor(inputId){
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labchargesconfig/searchsponsor",

		success : function(r) {

			ConfigurationChargesTemplateSponsor(r);

		}
	});
}

/**
 * @author   :Vinod Udawant
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Hall and Hallslave 
 * ***/
function searchhallwise(inputId){
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labchargesconfig/searchhallwise",

		success : function(r) {

			ConfigurationChargesTemplateHall(r);

		}
	});
}
/********
 * @author   :Vinod Udawant
 * @date     :05-10-2017
 * @code     :for autosuggetion on right Div For Services
 ********/
function searchservicesonui(){
	

	var input, filter, table, tr, td, i;
	  input = document.getElementById("byName4");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("rightDiv");
	  tr = table.getElementsByTagName("tr");
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }       
	  }
}
/*******
 * @author    :Vinod Udawant
 * @Date      :09-11-2017
 * @Code      :For validation of number and distributed amount
 * ******/
function validationsonkeyup(){
	var number     =$('#number').val();
	var distribute =$('#distribute').val();
	if(number > 0 ){
		if (distribute > 0) {
			alert("Please Distribute other wise apply using percentage");
			$('#distribute').val(0);
			return false;
		}

	}
	
	if(distribute > 0 ){
		if (number > 0) {
			alert("Please apply changes with distribute ! we can't perform two operation at the same time");
			$('#number').val(0);
			return false;
		}

	}
}
/*****
 * @author      :Vinod Udawant
 * @Date        :27-11-2017
 * @Code        :For Fetching data on add all 
 * ******/
function addAllTrFromBackend(){
	
	
	var liSizeForServices = $("#dynamicItem li").length;
	
	
	if (liSizeForServices > 1) {
		selfId = $("#li" + (liSizeForServices - 1)).val();
	}
	if (liSizeForServices > 0) {
		
		addAllTRtoRight();
	    
	}else{
			var unitId=$("#unitList").val();
		$('#pleaseWait').show();
		jQuery.ajax({
			async : true,
			type : "POST",
			 data: {
            unitId: unitId // Pass the unitId as data in the AJAX call
             },
			url : "ehat/subservice/SubServiceCategoryList",
           
			error : function() {
				alert('error');
			},
			success : function(response) {
				subtemplateonaddAll(response) ;
				
			}
		});
	}
	
}

function subtemplateonaddAll(response){

	var htm = '';
	
	var index = 0;
	
	for ( var i = 0; i < response.lstSubService.length; i++) {
	
		var categoryName = response.lstSubService[i].categoryName;
		var charges = response.lstSubService[i].charges;
		//added by Rohit on 11-01-2022
		var b2bCharges = response.lstSubService[i].b2bCharges;
		var serviceId=response.lstSubService[i].subId;
		
		htm = htm
		
				+'<tr id="trs'+(index + 1)+'">'
				+'<td id="chNamer'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'
				//below line changes made by Rohit as from value="'+charges+'" to value="'+b2bCharges+'"
				+'<input id="inChargesr'+(index+1) +'" class="right_Charges" type="text"  value="'+b2bCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
				
				/*+'<td id="codenamech'+(index+1) +'" class="col-sm-1-1 center" style="height: 21.5px;" >'
	    		+'<input id="inChargesr'+(index+1) +'" class="right_Codename" type="text"  value="0">'
	    		+'</td>'*/
	    		
				+'<td id="lastTdr'+(index+1) +'">'
				+'<input id="subbIdr'+(index + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
	    		+'<input id="inputCntr'+(index+1) +'" type="button" value="<<" onclick="addTRtoLeft('+(index+1) +')"></td>'
				
				+'</tr>';
		
		$('#subIDs').append(","+serviceId);
		$('#leftDiv tr').remove();
		
		index++;
	}

	$("#rightDiv").html(htm);
	$('#pleaseWait').hide();
	totalAmount();
	
}

/**
 * @author   :Vinod Udawant
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div
 * **/
function fetchmcharges() {
	
	var chargesId = 1;// Sponser id
	var chargesSlaveId = 57;// Sponser S
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = 0; //is combination
	var isComServlastId = 0;//is combination slave
	
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = 2;//hallid
	var hallSlaveId =655;//hallslaveid
	
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/labchargesconfig/fetchMedicalTeamCharges",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log(r);
			//setDynamicServicesOnright(response);
		}
	});		
}

function onChangeTypeRegPage(){
	var type= $("#custTypeForRegPage").val();
	if(type=="3"){
		getAdminHospital('regPage');
	}
	if(type=="1"){
		getAllBusinessMaster();
	}
	if(type=="2"){
		getAllBusinessLabMaster();
	}
	if(type=="4"){
		getAllClinicMaster();
	}
	if(type=="5"){
		getAllCollection();
	}
}

function getAllBusinessMaster() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			var custListTemp = "";
			custListTemp = custListTemp
					+ "<option value='0'>--Select inhouseLab--</option>";
			for (var i = 0; i < response.businessMasterDto.length; i++) {
				custListTemp = custListTemp + "<option value="
						+ response.businessMasterDto[i].id + " data-name=" + response.businessMasterDto[i].id + ">"
						+ response.businessMasterDto[i].name+ "</option>";
			}
			$("#custNameRegPage").html(custListTemp);
			$("#custNameRegPage").select2();
		}
	});
}

function getAllBusinessLabMaster() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessLabMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			var custListTemp = "";
			custListTemp = custListTemp
					+ "<option value='0'>--Select Customer Lab--</option>";
			for (var i = 0; i < response.businessMasterDto.length; i++) {
				custListTemp = custListTemp + "<option value="
						+ response.businessMasterDto[i].id+ " data-name=" + response.businessMasterDto[i].name + ">"
						+ response.businessMasterDto[i].name+ "</option>";
			}
			$("#custNameRegPage").html(custListTemp);
			$("#custNameRegPage").select2();
		}
	});
}

function getAdminHospital(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/registration/getAdminHospital",
		data : "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var custListTemp = "";
			custListTemp = custListTemp
					+ "<option value='0'>--Select Hospital--</option>";
			for (var i = 0; i < r.length; i++) {
				custListTemp = custListTemp + "<option value="
						+ r[i].id + " data-name=" + r[i].hospitalName + ">"
						+ r[i].hospitalName+"("+r[i].hospitalCode+")" + "</option>";
			}
			
			$("#custNameRegPage").html(custListTemp);
			$("#custNameRegPage").select2();		
		}
	});
}

function getAllClinicMaster() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/clinicmaster/getAllClinicMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			var custListTemp = "";
			custListTemp = custListTemp
					+ "<option value='0'>--Select Customer clinic--</option>";
			for (var i = 0; i < response.length; i++) {
				custListTemp = custListTemp + "<option value="
						+ response[i].clinicUnitId+ " data-name=" + response[i].clinicName + ">"
						+ response[i].clinicName+ "</option>";
			}
			$("#custNameRegPage").html(custListTemp);
			$("#custNameRegPage").select2();
		}
	});
}

function getAllCollection(type){
	var inputs = [];
	type="";
	inputs.push('callfrom=' + type);
	var str = inputs.join('&');
	jQuery
	.ajax({
		async : false,
		type : "POST",
		data :str+"&reqType=AJAX",
		url : "ehat/admincollection/getCollectionMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			var custListTemp = "";
			custListTemp = custListTemp
					+ "<option value='0'>--Select Collection Center --</option>";
			for (var i = 0; i < response.length; i++) {
				custListTemp = custListTemp + "<option value="
						+ response[i].id+ " data-name=" + response[i].collectionName + ">"
						+ response[i].collectionName+ "</option>";
			}
			$("#custNameRegPage").html(custListTemp);
			$("#custNameRegPage").select2();
		}
	});
}


/*********************************************************
 * 
 * @author: ROHIT AMBAWADE
 * @Description: Function added by ROHIT for the customer and package search functionity in the popup window
 * Ticket ID: DB_0026
 * @returns
 * 
 ************************************************************/
function searchLabs(callfrom)
{
	 var input, filter, table, tr, td, i, txtValue;
	 
	 if(callfrom == "searchCust")
		 input = document.getElementById("searchCust");
	 else if(callfrom == "searchPackage")
		 input = document.getElementById("searchPackage");
	 
	 filter = input.value.toUpperCase();
	 table = document.getElementById("popupDiv");
	 tr = table.getElementsByTagName("tr");
	 
	 for (i = 0; i < tr.length; i++) {
		 
		 if(callfrom == "searchCust")
			 td = tr[i].getElementsByTagName("td")[2];
		 else if(callfrom == "searchPackage")
			 td = tr[i].getElementsByTagName("td")[3];			 
		 
	    if (td) {
	      txtValue = td.textContent || td.innerText;
	      if (txtValue.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }       
	 }
	 
}


//added by ROHIT on 28 Dec 2022 for validating only numbers while entering rate only
function validateNumOnly(evt) {
	evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  alert("Enter Numbers Only!");
      return false;
  }
  return true;
}

function validatePaste(el, e) {
	  var regex = /^[0-9]+$/gi;
	  var key = e.clipboardData.getData('text')
	  if (!regex.test(key)) {
	    e.preventDefault();
	    return false;
	  }
	}

// added by jagruti
function fetchSubServiceCategoryListBasedOnUnit(unitId) {
	var unitId=$("#unitList").val();
	if(unitId != 0){
		$('#listmstr_select_combination').removeAttr("disabled").select2();
	}else{
		$('#listmstr_select_combination').attr("disabled","disabled").select2();
	}
   // $('#pleaseWait').show();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subservice/getUnitWisedata",
       data  :  str + "&reqType=AJAX",
		
		success : function(response) {

			divId = response;
			if (unitId == "unitList") {
				fetchlistS();
				
 			}else{
				SubServiceTemplatedemo(response) ;
				
			}			
		}
	});
}

//ADDED FUNCTION BY JAGRUTI

function fetchSubServiceByUnitId(masterId, selfId) {

	var unitId =$("#unitList").val();
	if(unitId == 0){
		unitId == 0;
	}
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceByUnitId",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId),
			"unitId" : parseInt(unitId)
		},
		success : function(response) {
		
			multiSelectSlavecom(response);
		}
	});
}


function fetchCustomerNameByUnitId(unitId) {
		
	var unitId =$("#unitList").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		type    : "POST",
		url     : "ehat/businessCustMaster/getCustomerNameByUnitId",
		data    :  str + "&reqType=AJAX",
		success : function(r) {
		
			//var custListTemp="";
			var custListTemp = custListTemp	+ "<option value='0'>--Select Name--</option>";
			var custTypeTemp = custTypeTemp	+ "<option value='0'>--Select Type--</option>";
			
			for (var i = 0; i < r.businessMasterDto.length; i++) {
				
				custListTemp = custListTemp + "<option value="
						+ r.businessMasterDto[i].id + " data-name=" + r.businessMasterDto[i].type + ">"
						+ r.businessMasterDto[i].name+ "</option>";
			}
			$("#custNameRegPage").html(custListTemp);
			$("#custNameRegPage").select2();
			//$("#custTypeForRegPage").html(custTypeTemp);
			//$("#custTypeForRegPage").select2();
			
		}
	});
}

function fetchCustomerTypeByName(){
	
	var typeId = $("#custNameRegPage").select2().find(":selected").data("name");
	$("#custTypeForRegPage").select2('val',typeId);
}

function fetchCustomerTypeByUnitId(typeSelectId) {
		
	var unitId =$("#unitList").val();
	var	customerType = $("#"+typeSelectId).val();
 	var inputs = [];
	inputs.push("customerType=" + customerType);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		 url : "ehat/businessCustMaster/getCustomersTypeBasedOnUnitId",
		 data  :  str + "&reqType=AJAX",
	     timeout : 1000 * 60 * 5,
		 catche : false,
		 error : function() {
			alert("error");
		},
		success : function(response) {
		
			var custListTemp=""; 
			console.log("Response->"+response.businessMasterDto[0].customerTypeName);
			for (var i = 0; i < response.businessMasterDto.length; i++) {
				
				custListTemp = custListTemp + "<option selected value="
						+ response.businessMasterDto[i].lookupDetIdLay + " data-name=" + response.businessMasterDto[i].customerTypeName + " >"
						+ response.businessMasterDto[i].customerTypeName+ "</option>";
			}
			$("#custTypeForRegPage").html(custListTemp);
			$("#custTypeForRegPage").select2();
				
			}
	});
}

function getAllUnitDropdown()
{
	$.ajax({
		async : false,
		url : 'ehat/unit/fetchUnitList',
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Unit-</option>';
			
			for(var i=0; i<r.lstUnit.length; i++)
				htm += '<option value="'+r.lstUnit[i].unitId+'">'+r.lstUnit[i].unitName+"</option>";
			
			$('#unitList').html(htm)
			$('#unitList').select2();
		}
	
	});
}

function fetchAllCustomerTypes()
{
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getalltype',
		type : 'GET',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Type-</option>';
			
			for(var i=0; i<r.tmCmLookupDetLookupList.length; i++)
				htm += '<option value="'+r.tmCmLookupDetLookupList[i].lookup_det_id+'">'+r.tmCmLookupDetLookupList[i].lookup_det_desc_rg+"</option>";
			
			$('#custTypeForRegPage').html(htm)
		}
	
	});
}

function fetchCustomerTypeByUnitId(id, name)
{
	var val = $('#'+id).val();
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getCustomersFromType',
		data : { 'type' : val },
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Name-</option>';
			
			for(var i=0; i<r.businessMasterDto.length; i++)
				htm += '<option value="'+r.businessMasterDto[i].id+'">'+r.businessMasterDto[i].name+"</option>";
			
			$('#'+name).html(htm)
		}
	
	});
}

function getDataWithDate(id){
	
	var fromDate =  $("#"+id).val();	
	
	var dateAr = fromDate.split('/');
	var newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
	
	$("#jv"+id).val(newDate);
}