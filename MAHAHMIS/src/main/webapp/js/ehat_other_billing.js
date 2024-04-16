/*******************************************************************************
 * @author Kishor Lokhande
 * @date 9_Oct_2017
 * @Code Get all other billing Patient records.
 ******************************************************************************/
function getAllPatientOtherBillingNew() {
	// alert("in js");
	//alert(r);
	var deptId = 0;
	 $("#depId").val(deptId);
	//alert(deptId);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"deptId" : deptId
		},
		
		//url : "ehat/registration/getAllRecordsForOPDque1",
		url : "ehat/registration/getAllRecordsForOPDqueOther123",
		
		success : function(r) {
			
			$("#appointedpatientDiv").html(r);
			setTempPatientOtherBillingForOPDque1(r);

			 
			 
		}
	});
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 9_Oct_2017
 * @Code Template for fetching other billing Patient data.
 ******************************************************************************/

function setTempPatientOtherBillingForOPDque1(r) {
	 
	var htm = '';
	var count = 0;
	var dept = "";
	dept = "Other";
	var cnt=0;
	var test="";
	var fName = "";
	var lName = "";
	var fullName="";
	for ( var i = 0; i < r.listReg.length; i++) {
		var strVale = r.listReg[i].doctorIdList;

		var array = strVale.split(",");
		//To generate Tooltip
		for ( var k in array) {
		for ( var g = 0; g < r.listDoctorDto.length; g++) {
			if (array[k] == r.listDoctorDto[g].doctor_ID) {
			test=test+" "+r.listDoctorDto[g].doc_name;
			}
		}
		}
		 fName=r.listReg[i].fName;
		 mName=r.listReg[i].mName;
		 lName=r.listReg[i].lName;
		// fullName = fName.concat(" ").concat(lName);
		 fullName = fName.concat(" ").concat(mName).concat(" ").concat(lName);
  		var datetime= new Date(r.listReg[i].createdDateTime).toLocaleString();
 		htm = htm   + '<tr>'
			 
					+ '<td  class="col-md-2-1 center"  id="patientId'
					+ r.listReg[i].patientId + '">' + (i + 1)
					+ ' <span class="tiptipClass" title="your tooltip text here"> </td>'

					+ '<td  class="col-md-2-1 center" id="name '
					+ r.listReg[i].patientId + '">'
					+ fullName + ' </td>'

				/*	+ '<td class="col-md-1-1 center" id="patientId'
					+ r.listReg[i].patientId + '">'
					+ (r.listReg[i].patientId) + '</td>'*/
					
					+ '<td class="col-md-1-1 center" id="patientId'
					+ r.listReg[i].patientId + '">'
					+ (r.listReg[i].centerPatientId) + '</td>'

					+ '<td class="col-md-1-1 center" id="mobile'
					+ r.listReg[i].patientId + '">'
					+ (r.listReg[i].mobile) + ' </td>'

					+ '<td class="col-md-1-1 center" id="AppDate'
					+ r.listReg[i].patientId + '">' + (datetime)
					+ ' </td>'
					
						
					+ '<td id="toptip"  data-toggle="tooltip" data-placement="top" title="'+test+'" animation: true class="col-md-1-1 center" id="token'
					+ r.listReg[i].patientId + '">'
					+ (r.listReg[i].token) + ' </td>'
 
					 
					 
 					+'<td class="col-md-1-1 center" id="departmentId'
					+ r.listReg[i].patientId
					+ '">'
					+ (dept)
					+ ' </td>';
 			
		if(array.length>1){
		htm = htm
					+ '<td class=" " style="padding:5px"><button style="font-size:12px" onclick="showDoctors('+i+');">'
					+ ' Show Doctors <i  style="font-size:15px;color:SteelBlue ;"  id="shBillView'+i+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="'+i+'" class="box border" style="display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> ' + '<th width="505Px"> Doctor Name  </th> '
					+ ' <th> Select   </th>' + '</tr>';

						for ( var k in array) {
							
						for ( var g = 0; g < r.listDoctorDto.length; g++) {
							
						if (array[k] == r.listDoctorDto[g].doctor_ID) {

				htm = htm + '<tr><td>' + r.listDoctorDto[g].doc_name
							+ '</td>' + '<td> <input type="radio" name="drname'+cnt+'" value="'+r.listDoctorDto[g].doctor_ID+'"> ' + '</td> '
							+ '</tr> '
							+ '<input type="hidden"  id="opddrid'+r.listDoctorDto[g].doctor_ID+'" value="'+r.listDoctorDto[g].doctor_ID+'"> ';
										}
									}
								}
						test="";
				htm = htm + '</table> ' + '</div> </td> '

				+ "<td class='numeric'>"
				+ "<input style='font-size: 10px; width:95%' type='button' value='SEND' id='btnView"
				+ cnt
				+ "' onClick=sendTODoc("
				+ r.listReg[i].patientId
				+ ","
				+ cnt
				+ ") /></td> "

					+ "<td class='numeric' style='display:none'>"
				+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
				+ r.listReg[i].patientId
				+ ","
				+ cnt
				+ ") /></td> "
					 
				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToOtherBill( '
				+ r.listReg[i].patientId
				+ ')" type="button"  ></button>' + '</td>'
				+ '</tr>';

		count++;
		cnt++;
		}else{
			htm = htm
			+ ' <td class=" " style="padding:5px"> '
			+ ' <div id="" > '
			+ ' <table > ' + '<tr> ' + '<th width="505Px">  </th> '
			+ ' <th width="505x"> </th>' + '</tr>';

				for ( var k in array) {
					
				for ( var g = 0; g < r.listDoctorDto.length; g++) {
					
				if (array[k] == r.listDoctorDto[g].doctor_ID) {

		htm = htm + '<tr><td width="70%">' + r.listDoctorDto[g].doc_name
					+ '</td>' + '<td> <input type="radio" style="display:none" name="drname'+i+'"  value="'+r.listDoctorDto[g].doctor_ID+'"checked="checked"> ' + '</td> '
					+ '</tr> '
					+ '<input type="hidden"  id="opddrid'+r.listDoctorDto[g].doctor_ID+'" value="'+r.listDoctorDto[g].doctor_ID+'"> ';
								}
							}
						}
				test="";
		htm = htm + '</table> ' + '</div> </td> '
		

		/*+ "<td class='numeric'>"
		+ "<input style='font-size: 10px; width:95%' type='button' value='SEND' id='btnView"
		+ count
		+ "' onClick=sendTODoc("
		+ r.listReg[i].patientId
		+ ","
		+ cnt
		+ ") /></td> "*/

			+ "<td class='numeric 'style='display:none'>"
		+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
		+ r.listReg[i].patientId
		+ ","
		+ cnt
		+ ") /></td> "
			 
		+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
		+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToOtherBill( '
		+ r.listReg[i].patientId
		+ ')" type="button"  ></button>' + '</td>'
		+ '</tr>';

count++;
cnt++;
test="";
		}
			 
 	}

	$("#container13").html(htm);

}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 9_Oct_2017
 * @Code sending to other bill page.
 ******************************************************************************/
function sendingToOtherBill(r) {
	//alert(r);
	//alert("Treatment Id =" + r);
	window.location = "ehat_other_billing.jsp?" + "patientId=" + r;

	/*
	 * window.location = "ehat_billing.jsp?" + "myObj=" +
	 * encodeURIComponent(myObj) + "&pageType=" + pageType;
	 */
}




/************
 *@author	: Kishor Lokhande
 *@date		:  10-June-2017
 *@code		:save ServiceBillDetails
 ***********/
function saveServiceToPatientOther(){
	//added by bilal for getting sponsor charges
	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	
	if (sponsorId > 0 && chargesSlaveId > 0) {
		getcharges();
	}
	var SponsorOtherRate  = $("#chargesfromConf").val();
	
	var defchargesfromConf  = parseFloat($("#defchargesfromConf").val());
	//alert(defchargesfromConf);
	
	var serviceId	 =  $("#serviceid").val(); 
	var callfrom =$('#saveServiceCallFrom').val();
	
	var masterReceiptId =$('#receiptMasterId').val();
	
	
	var iscombination =$("#iscombination").val();
	
	var receiptOf  =$('#receiptOf').val();
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	if (masterReceiptId == "" || masterReceiptId == null || masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}
	
	if (serviceId == "" || serviceId == null || serviceId == undefined || isNaN(serviceId)) {
		serviceId = 0;
	}
	
	if (SponsorOtherRate == "" || SponsorOtherRate == null || SponsorOtherRate == undefined || isNaN(SponsorOtherRate)) {
		SponsorOtherRate = 0;
	}
	
	if (defchargesfromConf == "" || defchargesfromConf == null || defchargesfromConf == undefined || isNaN(defchargesfromConf)) {
		defchargesfromConf = 0;
	}
	
	var rate         =  $("#rate").val();
	
	if(rate==0){
		
		alert("Rate should not be 0");
		return false;
	}
		
		var queryType  =	$('#queryType').val();
		var recSlaveId  =	$('#receiptSlaveId').val();	//receipt slave id	
		var doctorId = $( "#doctorName option:selected" ).val();		
		var billDetailsId =$('#billDetailsId').val();
		var	patienttId   =  $("#pId").val();
		//var doctorId =$('#doctorName').val();
		var treatmentId  =  $("#tId").val(); 			
		var	departmentId = $("#depdocdeskid").val();
		if(departmentId > 0)
			{
			departmentId = 0;
			}
		//var billId       =  parseInt($("#billNo").html());//$("#bNo").val();  
		var billId       =  0;
		var	sourceTypeId =  $("#sourceTypeId").val();
		
		var concession   =  $("#concession").val();
		var quantity     =   $("#qty").val();
		var amount       = $("#amount").val();
		
		var pay       = $("#pay").val();
		var coPay       = $("#coPay").val();
		var createdDateTime   = $("#finalDate").val();
		/*alert(createdDateTime);*/
		var subServiceId =  $("#subserviceid").val();
	    var otherServiceName   = $("#perticular").val();
	    var subservicesname   = $("#perticular").val();
	    
	    //alert(otherServiceName);
	    //return false;
	    
	    var servicename       = $("#servicename").val();
	    var unitId            = $("#uId").val();
	    var concessionOnPerc  = $("#concessionOnPerc").val();
	    var module 	 = "opd";
	    
	    var otherRate=0;
	    var otherConcession=0;
	    
	    if(SponsorOtherRate==0)	
	    	{
	    	otherRate=rate;
	    	var otherAmount=(rate * quantity) ;
		  // alert("In iff"+otherAmount);
	    	
	    	var otherconAmt=((concessionOnPerc * otherAmount)/100).toFixed(2);
		    var otherCoPay=0;
		    
		    var otherPay=amount-otherconAmt;
		        otherConcession  =  otherconAmt;
		   // alert(otherPay);
	    	}
	    else{
	    	
	    	 //var otherRate=chargesfromConf ;
	    	otherRate=SponsorOtherRate;
	    	
		    var otherAmount=(otherRate * quantity);
		    
		    var otherconAmt=((concessionOnPerc * otherAmount)/100).toFixed(2);
	    			    
		    //alert("In else"+otherAmount);
		    var otherCoPay=0;
		    
		    var otherPay=otherAmount-otherconAmt;
		        otherConcession  =  otherconAmt;
		    //alert(otherConcession);
		 
	    }
	   
	    var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);		
	    
		if (subServiceId == "" || subServiceId == null || subServiceId == undefined || isNaN(subServiceId)) {
			subServiceId = 0;
		}
		
		if (otherServiceName == "" ||  otherServiceName ==null) {
			alert("Please enter servicename ");
			return false;
		}
		if(unitId ==0){
			unitid = $("#allunitid").val();
		}	
			var serviceDetails = {
					listBillDetailsOther : []
				};
			serviceDetails.listBillDetailsOther.push({
				
				patienttId : patienttId,
				billDetailsId : billDetailsId,
				serviceId : serviceId,
				doctorId : doctorId,
				treatmentId : treatmentId,
				departmentId : departmentId,
				billId : billId,
				sourceTypeId : sourceTypeId,
				rate : rate,
				concession : concession,
				quantity : quantity,
				amount : amount,
				pay : pay,
				coPay : coPay,
				serviceId : serviceId,
				subServiceId : subServiceId,
				unitId : unitId,
				createdDateTime : addDate,
	            recSlaveId : recSlaveId,
	            callfrom   : callfrom,
	            masterReceiptId : masterReceiptId,
	            subservicesname : subservicesname,
	            urgentflag : "N",
	            sponsorId  : sponsorId,
	            chargesSlaveId : chargesSlaveId,	            
	            
	            otherRate : otherRate,
	            otherAmount : otherAmount,
	            otherCoPay : otherCoPay,
	            otherPay : otherPay,
	            otherConcession : otherConcession,
	            concessionOnPerc : concessionOnPerc,
	            iscombination : iscombination,
	            otherServiceName : otherServiceName,
	            receiptOf  :  receiptOf
		  
			});
			
			serviceDetails = JSON.stringify(serviceDetails);
		
		var inputs = [];
		
		// patient details push
		inputs.push("serviceDetails="+ encodeURIComponent(serviceDetails));
		inputs.push("queryType="+ queryType);
		inputs.push("module="+ module);
		inputs.push("callfrom="+ callfrom);
		/*inputs.push("billDetailsId="+ encodeURIComponent(recSlaveId));*/
		
	
		
		var str = inputs.join('&');
		
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/otherBilling/saveOtherBilling",
			error 	: function() {
						alert('Network Issue!!!');
			  		},
			success : function(r) {
								 
			if(r >0){
				if(queryType=='insert')
					{
					alertify.success("Service assign Sucessfully");
					//alert("Service assign Sucessfully");
					}
				else{
					alertify.success("Service Update Sucessfully");
					//alert("Service Update Sucessfully");
					
					}
				
				getPatientBillAmountOther(patienttId);
				
				 
				$('#perticular').val("");
				
				$("#rate").val("");
				
				$("#qty").val("1");
				
				    $("#concession").val("0");
				   $("#amount").val("0");
				   $("#pay").val("0");
				   $("#coPay").val("0");
				   
				   $("#servId").val("0");
				 
				   $('#saveServiceCallFrom').val("0");
				   calculatePerticularTotal1();	
				   $("#concessionOnPerc").val(0);
				}			
			}	
		});
		$('#queryType').val("insert");
		$('#billDetailsId').val("0");
		$('#subserviceid').val("0");				
	}



/*******************************************************************************
 * @author Kishor Lokhande
 * @date 6_June_2017
 * @Code Getting Bill Data By Service
 ******************************************************************************/
function getPatientBillAmountOther(r,callFrom) {
	//alert(r);
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/otherBilling/fetchPatientBillAmountOther",
		success : function(r) {
						
			setBillDetailsTempOther(r,callFrom);		
			$('#amount').attr('readonly', 'true');
			$("#concessionOnPerc").val(0);
			//$(".openAllSlave").trigger('click');
			resetAll("general");		
		}
	});
}

var totAmt=0;
function setBillDetailsTempOther(r,callFrom){
	
	var setBill="";
	var totAmt=0;
	var payCopay=0;
	
	var totqyt=1;
	var treatmentId=$('#treatmentId').text();

	
	for ( var i = 0; i < r.listBillDetailsOther.length; i++) {
		var dname = r.listBillDetailsOther[i].docName;
		
		if(dname==null){
			
			dname="-";
		}
		
		if(r.listBillDetailsOther[i].serviceId == 1){
			
			dname="-";
		}
			
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" class="chkOther'+ r.listBillDetailsOther[i].billDetailsId+'" checked=checked id="chkOpdBillReg'+ r.listBillDetailsOther[i].billDetailsId+'" name="opdBillCheckboxReg" value="'+ r.listBillDetailsOther[i].billDetailsId +'">'
			+	'</td>'
			+	'<td style="display:none;"><input type="hidden" id="regBillId" value="'+ r.listBillDetailsOther[i].billDetailsId +'"> </td>'

			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle">'
			+	'<div class="row">'
			+	'<div class="col-md-10" id="catNameE'+(r.listBillDetailsOther[i].billDetailsId)+'">' + r.listBillDetailsOther[i].otherServiceName +'</div>'			
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'			
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
		
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle">'
			+	'<div class="row">'
			+	'<div class="col-md-10"id="dNameE'+(r.listBillDetailsOther[i].billDetailsId)+'">' + dname +'</div>'			
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'			
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			
			+	'<td style="display:none;" id="dId'+(r.listBillDetailsOther[i].billDetailsId)+'"> '+ r.listBillDetailsOther[i].doctorId+' </td>'
			+	'<td style="display:none;" id="sId'+(r.listBillDetailsOther[i].billDetailsId)+'"> '+ r.listBillDetailsOther[i].serviceId+' </td>'
			+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(r.listBillDetailsOther[i].billDetailsId)+'"> '+ r.listBillDetailsOther[i].subServiceId+' </td>'

			
			+	'<td><div class="text-center" id="rateE'+(r.listBillDetailsOther[i].billDetailsId)+'">'+ r.listBillDetailsOther[i].rate.toFixed(2) +'</div></td>'
			
			+	'<td><div class="text-center"id="qtyE'+(r.listBillDetailsOther[i].billDetailsId)+'">'+ r.listBillDetailsOther[i].quantity +'</div></td>'
			
			+	'<td><div class="text-center"id="amountE'+(r.listBillDetailsOther[i].billDetailsId)+'">'+ r.listBillDetailsOther[i].amount.toFixed(2) +'</div></td>'
			
			+	'<td><div class="text-center" style="display: none;" id="conPerE'+(r.listBillDetailsOther[i].billDetailsId)+'">'+ r.listBillDetailsOther[i].concessionOnPerc.toFixed(2) +'</div></td>'
			
			+	'<td><div class="text-center" style="display: none;" id="conE'+(r.listBillDetailsOther[i].billDetailsId)+'">'+ r.listBillDetailsOther[i].concession.toFixed(2) +'</div></td>'
			
			/*+	'<td><div class="text-center"id="payE'+(r.listBillDetailsOther[i].billDetailsId)+'">'+ r.listBillDetailsOther[i].pay.toFixed(2) +'</div></td>'

			+	'<td><div class="text-center"id="coPayE'+(r.listBillDetailsOther[i].billDetailsId)+'">'+ r.listBillDetailsOther[i].coPay.toFixed(2) +'</div></td>'


			+ 	'<td>'
			+	'<div class="text-right mainAddedInTotal" id="tamt'+(r.listBillDetailsOther[i].serviceId)+'">' + (r.listBillDetailsOther[i].pay+r.listBillDetailsOther[i].coPay).toFixed(2) +'</div></td>'
						
			+ 	'<td class="text-center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success  billSlaveBtn'+r.listBillDetailsOther[i].billDetailsId+'"  onclick="editOnClickForOtherBilling('+r.listBillDetailsOther[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listBillDetailsOther[i].billDetailsId+'></i></button></a></td>'*/
			+	'</tr>';		
			totAmt = totAmt + r.listBillDetailsOther[i].amount;//r.listBillDetailsOther[i].pay+r.listBillDetailsOther[i].coPay;
					
	}
	
	//alert(totqyt);
	//alert(totAmt);
	//alert(callFrom);
	/*if(callFrom == "cghs"){
		//$("#billDetails").html("");
		//alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));		
		$("#cghsBill").html(setBill);		
	}
	else{*/
		//$("#cghsBill").html("");
		//alert("in general");
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		$("#totAmt").text((totAmt).toFixed(2));
		//$("#payNow").val((totAmt).toFixed(2));
		//$("#payable").val((totAmt).toFixed(2));
		
		$("#billDetails").html(setBill);
	/*}*/
}



/************
 *@author	: Kishor Lokhande
 *@date		:  18--2017
 *@code		:delete Sub-Service
 ***********/
function deleteServiceToPatientOther(billDetailsId){
	var isCheked = $('#chkOpdBillReg').is(":checked");
	var isValue = $('#chkOpdBillReg').val();
//alert(billDetailsId);
	/*if (isCheked == true && isValue == 1) {
		alert("You can not delete Registration charges !");
		return false;
	}*/
		
	var labservicelist=[];	
	var treatId=$('#treatId').val();
	var patientId=$('#pId').val();
	
	var callFrom="DR";
	
		$('input[name=opdBillCheckboxReg]:checked').each(function() {

		labservicelist.push(parseInt($(this).val()));
		
		});

	if (labservicelist.length == 0) {
		alert("Please check  at least Service to delete");
		return false;
		}
	
	var inputs = [];	
	inputs.push("labservicelist="+ encodeURIComponent(labservicelist));
	inputs.push("callform="+ callFrom );
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/otherBilling/deleteservdetailsOther",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Network Issue!!!');
  		},
		success : function(r) {
			
			//fetchbilldetails();
			getPatientBillAmountOther(patientId);
			alertify.success("Service Deleted successfuly");
			//alert(r);
			//window.location.reload(true);
		}
		
	});
	
}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getPatientDataByPatientIdOther(patId) {
	var deptID=0;
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : patId
		},
		url : "ehat/otherBilling/getPatientDataByPatientIdOther",
		success : function(r) {
			// setTempPatientRecords(r);
			//console.log(r);
 			 if(r.listReg[0]!=undefined || r.listReg[0]!=null){
			 /*****Added By Sagar******/
			var date=new Date(r.listReg[0].createdDateTime).toLocaleString();
			//set hidden date +
			var dd=date.split(',');
  			$("#dtofadmission").text(dd[0]);
  			//set hidden for print +
  			$("#OpdIpdNo").val(r.listReg[0].trcount);
  			$("#ptName").val(r.listReg[0].patientName);
   			  
   			getSponsorRecords(r.listReg[0].chargesMasterSlaveId,r.listReg[0].sourceTypeId);
 			$("#patientId").text(r.listReg[0].patientId);
 			var age=r.listReg[0].age;
 			var ageMonths=r.listReg[0].ageMonths;
 			var ageDays=r.listReg[0].ageDays;
 			//var fullage=(age).concat("Y/").concat(ageMonths).concat("M/").concat(ageDays);
 			//alert(age+"Y/"+ageMonths+"M/"+ageDays+"D");
 			$("#age").text(age+"Y/"+ageMonths+"M/"+ageDays+"D");
 	
			//$("#age").text(r.listReg[0].age);
			
			$("#patientName").text((r.listReg[0].fName).concat(" ").concat(r.listReg[0].mName).concat(" ").concat(r.listReg[0].lName) );
		    $("#billNo").text(r.listReg[0].billId);
		    //$("#depdocdeskid").val(r.listReg[0].departmentId);
		    $("#depdocdeskid").val(1);
		    //hidden set 
		    $("#deptid").val(r.listReg[0].departmentId);
			 
		    dept=r.listReg[0].departmentId;
		    $("#drid").val(r.listReg[0].doctorId);
		    $("#pid").val(r.listReg[0].patientId);
		    
		    //****hidden set for bmi****//
 		   $("#dbirth").val(r.listReg[0].dob) ;
 		   $("#weight1").val(r.listReg[0].weight) ;
		   $("#height1").val(r.listReg[0].height) ;
 
			$("#sex").text(r.listReg[0].gender);
			deptID =r.listReg[0].departmentId;
			$("#pId").val(r.listReg[0].patientId);
			$("#bId").val(r.listReg[0].billId);
			$("#tId").val(r.listReg[0].treatmentId);
			$("#treatmentId").html(r.listReg[0].treatmentId);
			$("#sId").val(r.listReg[0].serviceId);
			//$("#ipdNo").text(r.listReg[0].fName);
			
  			if(r.listReg[0].sourceTypeId>0){
 				sponsorTypeList(r.listReg[0].sourceTypeId);
 			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
			}
  			  $("#ipdNo").text(r.listReg[0].trcount);
  			  $("#ipdNumber").val(r.listReg[0].trcount);
 			  $("#doa").text(date);
 			  $("#SponsorsourceTypeId").val(r.listReg[0].sourceTypeId);
			  $("#chargesSlaveId").val(r.listReg[0].chargesMasterSlaveId);
 			  //hidden field set 
			  $("#pt_Id").val(r.listReg[0].patientId);
			  $("#bill_Id").val(r.listReg[0].billId);
			  
			  $("#patientId").val(patId);
			  
			 }
 		}
	});
	return deptID;
}

function editOnClickForOtherBilling(billDetailsId)
{	
	$('#queryType').val('update');
	//alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#catNameE'+billDetailsId).text());
	//var chargesfromConf=$('#othRates'+billDetailsId).text();
	//$('#chargesfromConf').val(chargesfromConf);	
	var a=parseInt($('#sId'+billDetailsId).text());
	 $('#servId').val(a).text();
	 $("#serviceid").val(a); 
	// alert(a);
	 //$('#servId option:not(:selected)').prop('disabled', true);	 
	 var subserviceid= parseInt($('#subserviceid'+billDetailsId).text());
	// alert(subserviceid);
	 $("#subserviceid").val(subserviceid);
	 //$("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true); 	 
	var d=parseInt($('#dId'+billDetailsId).text());
	$('#doctorName').select2('val',d);	
	$('#rate').val($('#rateE'+billDetailsId).text());	
	$('#qty').val($('#qtyE'+billDetailsId).text());	
	$('#concession').val($('#conE'+billDetailsId).text());	
	$('#concessionOnPerc').val($('#conPerE'+billDetailsId).text());	
	var amt=Number($('#rateE'+billDetailsId).text()) * Number($('#qtyE'+billDetailsId).text());	
	$('#amount').val(amt);
	$('#amount').attr('readonly', 'true');	
	$('#pay').val($('#payE'+billDetailsId).text());	
	$('#coPay').val($('#coPayE'+billDetailsId).text());
	
}



/*******************************************************************************
 * @author Sagar kadam
 * @date 14-july_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function AutosuggestionForOPDqueOther(inputId,callfrom) {
	
	var deptId=0;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		
	var sridname = $("#sridname").val();
      if(sridname=='N'){
    	  usertype=sridname; 
    	  letter=$("#byName").val();
    	  
      }else{
    	  letter=$("#byId").val();
    	  usertype=sridname; 
    	  
      }
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
  ///   inputs.push('callfrom=' + callfrom);
        
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/otherBilling/getOtherBillingRecordsAuto",
	success : function(r) {
		//setTempPatientRecords(r);

		$("#OPDPatientList").html(r);
		 
		setTempPatientOtherBillingForOPDque1(r);
		//AllPatientRecordsAutosuggestioTempOther(r,inputId);
		
	}
});}


/************
* @author	: Sagar Kadam
* @date		: 14-july-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function  AllPatientRecordsAutosuggestioTempOther(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
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
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'fName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.fName != 'Match') {
			
				 
				$('#'+id).val(ui.item.fName);
			}
			/*
			 * This function use for Enter keypress search
			 */
			 
			AutosuggestionForOPDqueOther(id,'search');
 			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listReg.length);
			var result;
			if (!data || data.listReg.length === 0 || !data.listReg
					|| data.listReg.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listReg;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}


/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function resetAll(callFrom){
	
	//for receipt edit from sponsor tab
	//$("#receiptEditSponsor").val(callFrom); 
	/*var $loader = $('#loading'), timer;

	$loader.hide()
	    .ajaxStart(function()
	    {
	        timer && clearTimeout(timer);
	        timer = setTimeout(function()
	        {
	            $loader.show();
	        },
	        1000);
	    })
	    .ajaxStop(function()
	    {
	        clearTimeout(timer);
	        $loader.hide();
	    });*/	
		$("#trDisc").hide();	
		$("#trDiscAmt").hide();
		$("#discAuth").hide();	
		$("#discNarrtn").hide();
		$("#discRemark").hide();
	
		$("#recId").val(0);
		$("#payable").val(0);
		$("#discount").val(0);
		$("#discountAmt").val(0);		
		$("#payNow").val(0);		
		$("#batchnumber").val(0);	
		$("#payMode").val(1);
		
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide(); 
		$('#headerTable').find('.member3').hide(); 
		
		//$(".openAllSlave").trigger('click');
		//var trId=$("#treatmentId").text();
		//var departmentId   = $("#depdocdeskid").val();	
	/*	var c=$("#preId").val();		
				
		if(callFrom=="general"){
			
			//getPatientBillAmount(trId,"general");
			if(c=="treatclose"){
				
				getPatientPreviousBillAmount(trId,"general");
			}else{
				
				//getPatientBillAmount(trId,"general");
			}
					
			$("#receiptOf").val("general");
			
		}*//*else if(callFrom=="cghs"){
			
			if(c=="treatclose"){
				
					getPatientPreviousBillAmount(trId,"cghs");
					getOpdServiceDetailsForCghs(trId,departmentId);
			}else{
				
				getPatientBillAmount(trId,"cghs");
				getOpdServiceDetailsForCghs(trId,departmentId);
				
			}		
			
			$("#receiptOf").val("cghs");
			
		}else{
						
			if(c=="treatclose"){
				
				getPatientSponsorOpdSponsorBillAmount(trId,"sponsor");
			}else{
				
				getPatientBillAmountForSponsor(trId);
			}
		
			$("#receiptOf").val("sponsor");
		}*/
		
		//         getBillReceiptDetails('all');
		//getBillRefundDetails("refund");
		//getBillReceiptDetails('all');
		//         getBillReceiptDetails('allForChk');		
		//         setTotalPaid(callFrom,-1);
		//getCommonAdvc();
		/*$("#bankID").select2();
		$("#payMode").select2();
		$("#payee").select2();*/
		/*if(callFrom=="cghs"){
			
			$("#btnPayNow").prop("disabled","true");
		}else{
			
			$("#btnPayNow").removeAttr("disabled");
		}*/
		
		//fetchAuthorisedBy();		
		//          fetchAllReceiptTotals("opd"); 
		//fetchPrevPending("onload");
		
		
		getBillReceiptDetails('allForChk');	
		var uiMode=$("#uiMode").val();
		
		if(uiMode=="P"){
			
			getBillReceiptDetails('all');
			/*getBillRefundDetails("refund");
			getBillReceiptDetails('all');*/				
			setTotalPaid(callFrom,-1);
			//getCommonAdvc();		
			fetchAuthorisedBy();		
			fetchAllReceiptTotals("opd"); 
			//fetchPrevPending("onload");
			getAllPayments();
			getAllNarrations();
		}	
		
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set slave checkboxes according to master
 ************/
function setSlaveChk(id){
	
	var payable=$("#payable").val();
	
    if(($('#chkOpdBillReg'+id).prop("checked") == true)){
    	   	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainNotInTotal");
        	$('#tamt1').addClass("mainAddedInTotal");
    	}
    	
    	$('input[class=billSlaveChk'+id+']:checked').each(function(){
			
			var mstId=$(this).val();			
			var amt=$("#tAmtSlave"+mstId).val();
			payable=Number(payable)-Number(amt);
			
		});
    	
    	$('.billSlaveChk'+id).prop('checked', true);       	
    	setTotalPaid("general",id);
    	var ifCurPayable=$("#payable").val();    	
    	payable=Number(payable)+Number(ifCurPayable);
    
    }else{
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}
    	
    	$('.billSlaveChk'+id).removeAttr("checked");    	
    	setTotalPaid("general",id);
    	var elseCurPayable=$("#payable").val();
    	payable=Number(payable)-Number(elseCurPayable);
    
    }	    
    $("#payable").val(parseFloat(payable).toFixed(2));
}


/**
 * @author Bilal
 * @date 28-JUN-2017
 * @code For fetching records from configuration based on sponsor id and hall id
 * **/
function setallchargesConfigOnBillingForIPD(inputID) {

	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();//departmentId
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var hallId = 2;
	var hallSlaveId =39;
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallchargesConfigForIPD",
		success : function(r) {
			console.log(r);
			autoCompConfigurationBilling(r,inputID);		
		}
	});
}

/************
 *@author	: Bilal
 *@date		:  22-JUN-2017
 *@code		:autosuggestion services from configuration and services 
 ***********/
function autoCompConfigurationBilling(response,id) {
    
	//var qty = id.slice(0, -1); // for dyamic col getting id
	//alert("hi");
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
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
	$("#" + id).mcautocomplete(
			{
				
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '150px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '100px',
					valueField : 'serviceName'
				}],

				// Event handler for when a list item is selected. 
				select : function(event, ui) {
					console.log(ui);
					
					    var categoryid= ui.item.categoryid;
					    $('#categoryids').val(categoryid);
					    getcharges();
					    
						$('#perticularOpdSponsor').val(ui.item.categoryName);
						
						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						
						
						var rategeneralopd =$("#rategeneralopd").val();
						if (rategeneralopd > 0) {
							$("#rateOpdSponsor").val(rategeneralopd);
						}
						else {
							$("#rateOpdSponsor" ).val(ui.item.categorycharges);
						}
						$("#servIdOpdSponsor" ).val(ui.item.serviceid);
			
						$("#defchargesfromConf").val(ui.item.categorycharges);
						$("#iscombinationsponsor").val(ui.item.iscombination);
						
						
						calculatePerticularTotalOpdSponsor();
					
					return false;
					
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}

/**
 * for sponsor and package billing**/
function calculatePerticularTotalOpdSponsor() {
	var rate = $("#rateOpdSponsor").val();
	var qty = $("#qtyOpdSponsor").val();
	var concession = $("#concessionOpdSponsor").val();
	var concessionOpdSponsorOnPerc = $("#concessionOpdSponsorOnPerc").val();
	
	if (concessionOpdSponsorOnPerc == "" || concessionOpdSponsorOnPerc == "") {
		return false;
	}
	if(concessionOpdSponsorOnPerc < 0){
		concessionOpdSponsorOnPerc = 0;
	}else if(isNaN(concessionOpdSponsorOnPerc) == true){
		concessionOpdSponsorOnPerc = 0;
	}
	if (qty == "") {
		$("#qtyOpdSponsor").val(1);
	}
	if (rate == "") {
		$("#rateOpdSponsor").val(0);
	}
	if (concession == "") {
		$("#concessionOpdSponsor").val(0);
	}
	if (concession > (rate * qty)) {
		var quantity = $("#qtyOpdSponsor").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concessionOpdSponsor").val(0);
			calculatePerticularTotalOpdSponsor();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than " + (rate * qty));
			$("#concessionOpdSponsor").val(0);
			$("#amountOpdSponsor").val(rate * qty);
			//$("#coPayOpdSponsor").val(rate * qty);
			return false;
		}
	}
	//var amount = ((rate * qty) - concession);
	var amount = ((rate * qty));
	$("#amountOpdSponsor").val(amount);

	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	if (sponsorId == 1 && chargesSlaveId > 0) {

		$("#payOpdSponsor").val(amount);

	} else {

		$("#coPayOpdSponsor").val(amount);

	}
	
	var amountOpdSponsor = $("#amountOpdSponsor").val();
	var concessionOpdSponsor = $("#concessionOpdSponsor").val();
	
	var consAmt=((concessionOpdSponsor * 100 ) / amountOpdSponsor).toFixed(2);
	$("#concessionOpdSponsorOnPerc").val(consAmt);

	

	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#payOpdSponsor").val()) == 0) {

		calculatePerticularCoPayOpdSponsor();
	} else {

		calculatePerticularPayOpdSponsor();
	}
}

function calculatePerticularCoPayOpdSponsor() {
	var pay = $("#payOpdSponsor").val();
	var amount = $("#amountOpdSponsor").val();
	var concession = $("#concessionOpdSponsor").val();
	if (pay == "" || amount == "") {
		return false;
	}
	var abc=amount-concession;

	if (pay > abc ) {
		alert("pay should be less than amount");		
		$("#payOpdSponsor").val(abc);
	
	}
	if (pay < 0) {
		
		pay = 0;
	} else if (isNaN(pay) == true) {
		pay = 0;
	}

	var coPay = (((amount - pay) - concession).toFixed(2));	
		
	$("#coPayOpdSponsor").val(coPay);
	

}

function calculatePerticularPayOpdSponsor() {

	var coPayOpdSponsor = $("#coPayOpdSponsor").val();
	var amountOpdSponsor = $("#amountOpdSponsor").val();
	var concessionOpdSponsor = $("#concessionOpdSponsor").val();
	var payOpdSponsor = $("#payOpdSponsor").val();

	if (coPayOpdSponsor == "" || amount == "") {
		return false;
	}
	if (coPayOpdSponsor < 0) {
		coPayOpdSponsor = 0;
	} else if (isNaN(coPayOpdSponsor) == true) {
		coPayOpdSponsor = 0;
	}
	
	var pay = (amountOpdSponsor - concessionOpdSponsor).toFixed(2);
	//var pay = ((payOpdSponsor - coPayOpdSponsor).toFixed(2));
	$("#payOpdSponsor").val(pay);
	
}

//@author : kishr Lokhande @date: 15-June-2017 @reason : Function for use to get all services
function getTempInCghs() {

	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/temp/fetchTempList",
		success : function(r) {
			setTempAll(r);
		}
	});
}

//@author : kishr Lokhande @date: 15-June-2017 @reason : Template use to get all services
function setTempAll(r) {
	
	var list = "<option value='0'>select</option>";    
	for ( var i = 0; i < r.listTemp.length; i++) {

		list = list + "<option value='"+r.listTemp[i].tempId+"'>" + ((r.listTemp[i].tempName)) + "</option>";    
		}   
	$("#servIdForCghs").html(list);  

}

//@author : kishor Lokhande @date: 15-June-2017 @reason : Function for use to get all services
function getServicesOnBilling() {

	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/serv/fetchServiceList",
		success : function(r) {
			setTempAllService(r);
		}
	});
}

//@author : kishor Lokhande @date: 15-June-2017 @reason : Template use to get all services
function setTempAllService(r) {

	var list = "<option value='0'>select</option>";    
	for ( var i = 0; i < r.listService.length; i++) {

		list = list + "<option value='"+r.listService[i].serviceId+"'>" + ((r.listService[i].serviceName)) + "</option>";    
		}   
	$("#servId").html(list); 
	$("#servIdOpdSponsor").html(list);
	$("#servIdPackage").html(list);
	
	$("#txtSelectService").html(list);
	$("#txtSelectService").select2();
	
}

//bank master List...
//@uthor - Sagar 
function getBankMasterList() {
	$('.member').hide();
	$('.member2').hide();
	
 jQuery.ajax({
             async : true,
             type : "POST",
             url : "ehat/bill/getBankMasterList",

             success : function(r) {
             	console.log(r);
             	setTempForBanktList(r);//call template
             }
         });
}
//temp for bank list 
//@uthor - Sagar 
function setTempForBanktList(r) {   
	
	var list = "<option value='0'>-- Select --</option>";    
 for ( var i = 0; i < r.ltBankMaster.length; i++) {    

		list = list + "<option value='"+r.ltBankMaster[i].bankId+"'>" + (r.ltBankMaster[i].bankName) + "</option>";    
		}   
	$("#bankID").html(list); 
	$("#bankIdCredit").html(list);  
	$("#bankIdCheque").html(list);  
	$("#bankIdRtgs").html(list);
	$(".bankList").html(list);
	 
	$("#bankID1").html(list);   	
}

/**
 * @author Bilal
 * @date 30-JUN-2017
 * @code show and hide sponsor tabe based on sponsor id**/
function showAndHideSponsor() {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	if (sponsorId >= 1 && chargesSlaveId>0) {

		$('#sponsorHide').show();

	} else {

		$('#sponsorHide').hide();
		
	}
}

/************
* @author	: Tarikh Alam
* @date		: 14-12-2017
* @codeFor	: Get Payment mode list
 ************/
function getAllPayments() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/payment/fetchPayList",

		success : function(r) {
			setTempPaymode(r);//call template
		}
	});
}

function setTempPaymode(r) {
	var list = "";    
    for ( var i = 0; i < r.listPay.length; i++) {  

        list = list + "<option value='"+r.listPay[i].payId+"' class='un'>" + (r.listPay[i].payName) + "</option>";    
    }  
   /* list = list + "<option value='-1' class='un'>Multiple</option>"; */ 
    $("#payMode").html(list);
}


/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date 14_DEC_2017 
 * @Code Fetching Narration Data 
 ******************************************************************************/

function getAllNarrations() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/narration/fetchNarrList",

		success : function(r) {
			setTempNarrations(r);//call template
		}
	});
}


function setTempNarrations(r) {
	var list = "<option value='0'>--Select Narration--</option>";    
    for ( var i = 0; i < r.listNarr.length; i++) {    
        
    	list = list + "<option value='"+r.listNarr[i].narrId+"' class='un'>" + (r.listNarr[i].narrName) + "</option>";    
    }  
    $("#narrSel").html(list);
}

/**
 * @author Bilal
 * @date 28-JUN-2017
 * @code for autosuggestion on billing from configuration and from subservice based on sponsor id  **/
function autosuggetionForDefault(inputID) {

	//var sponsorId = $("#SponsorsourceTypeId").val();
	//var chargesSlaveId = $("#chargesSlaveId").val();
	//var depdocdeskid = $("#depdocdeskid").val();//departmentId
    //var sponsortab  = $("#sponsortab").val();
   
	/*if ( sponsorId >= 1 && chargesSlaveId > 0) {
		setallchargesConfigOnBillingOPD2(inputID);
		//setallservautocompleteOnBilling(inputID);
	}
	else{*/
		 
		setallservautocompleteOnBilling(inputID);
	/*}*/
	
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion
 ***********/
function setallservautocompleteOnBilling(inputID) {
	//var	listofunit=[];
	//var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
 	//var unitlist=listofunit.slice(1); 
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();
	
	var q=$('#queryType').val();
	var serviceid = 0;
	var querytype="all";
	if(q == "update"){
		serviceid =$("#servId").val(); 
	}else{
		serviceid= $("#servId").val(); 
	}
	
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",
	
		success : function(r) {
	        //alert(r);
			 console.log(r);
			autoCompDoctorDeskOnBilling(r,inputID);			
		}
	});
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion services
 ***********/
function autoCompDoctorDeskOnBilling(response,id) {
	
	//var qty = id.slice(0, -1); // for dyamic col getting id
	//alert("hi");
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
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
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '150px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '100px',
					valueField : 'serviceName'
				},{
					name : 'categorycharges',
					width : '100px',
					valueField : 'categorycharges'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
				//	var spl = (ui.item.spl = "" ? '' : ui.item.spl);
				//	if (ui.item.categoryName!="NO") {
					//	$('#results').text(ui.item ? 'Selected: ' + ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.depNm: 'Nothing selected, input was ' + this.value);
						//$('#' + id).val(ui.item.dn);
						//$('#userDocId').val(ui.item.ui);
						//$('#selectedObj').html(JSON.stringify(ui.item));
				
						
						$('#perticular').val(ui.item.categoryName);
/*						$("#subservicesname").val(ui.item.categoryName);
*/						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						$("#rate" ).val(ui.item.categorycharges);
						$("#concession" ).val(ui.item.concession);
						$("#amount" ).val(ui.item.amount);
						$("#servId" ).val(ui.item.serviceid);
						$("#iscombination").val(ui.item.iscombination);
						
						calculatePerticularTotal1();
					/*	if($("#uId").val()==0){
							$("#allunitid").val(ui.item.categoryid);
						}*/
						//fetchSuperCatogoires(ui.item.categoryid);
						
					//}
				
					return false;
					/*setallservautocomplete(id);
					return false;*/
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 10_June_2017
 * @Code Getting amount 
 ******************************************************************************/


function calculatePerticularTotal1() {
	var rate = $("#rate").val();
	var qty = $("#qty").val();
	var concession = $("#concession").val();
	var concessionOnPerc = $("#concessionOnPerc").val();
		
	if (concessionOnPerc == "" || concessionOnPerc == "") {
		$("#concessionOnPerc").val(0);
		return false;
	}
	if(concessionOnPerc < 0){
		$("#concessionOnPerc").val(0);
	}else if(isNaN(concessionOnPerc)){
		//concessionOnPerc = 0;
		$("#concessionOnPerc").val(0);		
	}	
	if (rate == "") {
		$("#rate").val(0);
	}if (qty == "" || qty == 0) {
		$("#qty").val(1);
		var a=rate * 1; 
		setTimeout(function() { 	
			$("#amount").val(a); 
			$("#pay").val(0); 
			$("#coPay").val(a); 
			}, 50);
		
		
	}
	if (concession == "") {
		$("#concession").val(0);
	}
	if (concession > (rate * qty)) {
		var quantity = $("#qty").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concession").val(0);
			calculatePerticularTotal1();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than "
					+ (rate * qty));
			$("#concession").val(0);
			$("#amount").val(rate * qty);
			$("#coPay").val(rate * qty);
			return false;
		}
	}
	//var amount = ((rate * qty) - concession);
	var amount = ((rate * qty));
	$("#amount").val(Math.round(amount));
	$("#coPay").val(Math.round(amount));
	/*var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
	if (sponsorId == 1 && chargesSlaveId>0) {

		$("#pay").val(amount);

	} else {

		$("#coPay").val(amount);
		
	}*/

	
	/*var amount = $("#amount").val();
	var concession = $("#concession").val();
	
	var consAmt=((concession * 100 ) / amount).toFixed(2);
	$("#concessionOnPerc").val(consAmt);*/
		
	
	
	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#pay").val()) == 0) {
		
		calculatePerticularCoPay1();
		
	} else {
		
		calculatePerticularPay1();
	}
}

function calculatePerticularCoPay1() {
	var pay = $("#pay").val();
	//var coPay = $("#coPay").val();
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	
	if (pay == "" || amount == "") {
		return false;
	}
	
	if(pay < 0){
		pay = 0;
	}else if(isNaN(pay) == true){
		pay = 0;
	}
	
	var coPay = ((amount - pay)-concession).toFixed(2);	

	if(coPay < 0)
	{
	alert("Pay should be Less Than CoPay");
	$("#pay").val("0");
	//retuen false;
	}
	$("#coPay").val(Math.round(coPay));
}

function calculatePerticularPay1() {
	
	var coPay = $("#coPay").val();
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	
	if (coPay == "" || amount == "") {
		return false;
	}
	if(coPay < 0){
		coPay = 0;
	}else if(isNaN(coPay) == true){
		coPay = 0;
	}
	var pay = ((amount - coPay)-concession).toFixed(2);
	
	var coPay1 = (amount - concession);
	if(pay < 0)
	{
	alert("CoPay should be Less Than Pay");
	$("#coPay").val(Math.round(coPay1));
	$("#pay").val("0");
	return false;
	//$("#coPay").val("0");
	
	//retuen false;
	}
	$("#pay").val(Math.round(pay));
	//added by Bilal
/*	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	if (sponsorId == 1 && chargesSlaveId > 0) {
		var pay = (amount - concession);
		$("#pay").val(pay);
	}*/
}

/************
* @author	: Vinod Udawant
* @date		: 16-June-2017
* @codeFor	: Save ehat bill details
 ************/
function saveBillDetails(callFrom) {
	
	var unitId		= parseInt($("#unitId").val());
	var userId		= parseInt($("#userId").val());	
	var patientId	= parseInt($("#patientId").val());	
	var refDocId	= 0;	
	var treatmentId	= 0;	
	var payable		= parseFloat($("#payable").val()); 
	var discount	= parseFloat($("#discount").val()); 
	var disAuth		= parseInt($("#discAuthSel").val()); 
	var disNarrtn	= $("#discNarrtnTxt").val(); 	
	var disRemark	= $("#txtDiscRemk").val(); 	
	var payNow		= parseFloat($("#payNow").val());	
	var payMode		= $("#payMode").val();
	var bnumber		= "";
	var bName		= "";
	var againstId	= $("#recId").val();
	var sourceCatId	= $("#SponsorsourceTypeId").val();
	var sponsorCatId= $("#chargesSlaveId").val();	
	var receiptOf= $("#receiptOf").val();	
	
	var payeeSprlastId=0;
	var payeeSprMainId=0;
	var payeeTypeId= $("#payee").val();	
	if(payeeTypeId==2){
		
		var size=$("#dynamicItems li").length;
		payeeSprlastId=$("#lis" + (size - 1)).val();
		payeeSprMainId=$("#lis0").val();
	}
	
	callFrom= $("#callFromForSave").val();
		
	if(sponsorCatId>0){

		if(receiptOf != "sponsor"){
			
			alert("Please pay amount from sponsor tab");
			return false;
		}
	}
	
	var multiPayDetails = {
			listMultiBillReceiptMaster : []
    };
	
	if(payMode==2 || payMode==3){
		
		bnumber= $("#batchnumber").val();
		bName= $("#bankID").val();
	}else if(payMode==-1){
				
		var rows= $('#multiPayTable tbody tr.multiPayClass').length;
		for(var i=1;i<=rows;i++){
						
			var payModePop=$("#payMode"+i).val();
			var bankId=$("#bankID"+i).val();
			var bNum=$("#txtbankNo"+i).val();			
			var amt=$("#txtAmount"+i).val();		
			setReceiptList(multiPayDetails,payModePop,bankId,bNum,amt);
		}		
		
	}else{
		
		bnumber= 0;
		bName= 0;
	}
		
	if(payable<=0){
		
		alert("Payable should be greater than zero");
		return false;
	}else{
		
		if(payNow>payable){
			
			alert("Amount should be less than payable");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}else if(payNow<0){
			
			alert("Amount should be greater than 0");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}
	}
	 
	if(discount>0){
		
		if(disAuth==0){
			
			alert("please select autherised person");
			return false;
		}
		if(disNarrtn==""){
			
			alert("please fill narration");
			return false;
		}		
	}
	
	var masterIdsChecked=[]; 
	var servIdsChecked=[]; 
	
	$('input[name=opdBillCheckboxReg]:checked').each(function(){
		
		masterIdsChecked.push($(this).val());
	});

	$('input[name=opdBillCheckbox]:not(:checked)').each(function(){
		
		servIdsChecked.push($(this).val());
	});	
	
	multiPayDetails = JSON.stringify(multiPayDetails);
	
	var inputs = [];	
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("unitId=" + unitId);
	inputs.push("createdBy=" + userId);
	inputs.push("totalAmt=" + payable);	
	inputs.push("discount=" + discount);	
	inputs.push("disAuth=" + disAuth);	
	inputs.push("disNarrtn=" + disNarrtn);	
	inputs.push("totalPaid=" + payNow);	
	inputs.push("masterIdsChecked=" + masterIdsChecked);
	inputs.push("servIdsChecked=" + servIdsChecked);	
	inputs.push("refDocId=" + refDocId);		
	inputs.push("payMode=" + payMode);		
	inputs.push("bNumber=" + bnumber);		
	inputs.push("bName=" + bName);		
	inputs.push("callFrom=" + callFrom);		
	inputs.push("againstId=" + againstId);	
	inputs.push("sourceCatId=" + sourceCatId);
	inputs.push("sponsorCatId=" + sponsorCatId);	
	inputs.push("multiPayDetails=" + multiPayDetails);	
	inputs.push("receiptOf=" + receiptOf);
	inputs.push("payeeTypeId=" + payeeTypeId);
	inputs.push("payeeSprMainId=" + payeeSprMainId);
	inputs.push("payeeSprlastId=" + payeeSprlastId);
	inputs.push("disRemark=" + disRemark);
	inputs.push("patientId=" + patientId);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/otherBilling/saveOtherBillDetails",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			if(r>0){
				
				//resetMultiPopup();				
				alertify.success("Receipt generated succesfully");
				receiptBillPrint("receipt",r,"");
			}else if(r==-2){
				
				alert("Common advance not enough to pay bill...");
			}else{
				
				alertify.error("Network issue");
			}
			
			resetAll(receiptOf);
			var c=$("#preId").val(); 
			if(c!="treatclose"){ 
				
				closePatientTreatment(treatmentId);
			}			
		}
	});
};

function setReceiptList(multiPayDetails,payMode,bankName,bNumber,amt){
	
	multiPayDetails.listMultiBillReceiptMaster.push({
		payMode	  : payMode,
		bName	  : bankName,
		bNumber	  : bNumber,
		totalPaid : amt
    });
}

/************
* @author	: Vinod Udawant
* @date		: 08-Nov-2017
* @codeFor	: Get all total amounts
 ************/
function fetchAllReceiptTotals(callFrom) {	
	
	var unitId		= parseInt($("#unitId").val());
	var userId		= parseInt($("#userId").val());	
	var treatmentId	= 0;	
	var sponsorCatId= 0;	
	var patientId	= parseInt($("#patientId").text());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("sponsorId=" + sponsorCatId);
	inputs.push("createdBy=" + userId);
	inputs.push("callFrom=" + callFrom);	
	inputs.push("patientId=" + patientId);	
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/otherBilling/fetchAllReceiptTotals",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			var finalBillTotal=parseFloat(r.actualAmt).toFixed(2);			
			var grandTotal=parseFloat(r.actualAmt).toFixed(2);	
			var conTotal=parseFloat(r.actualTotConcn).toFixed(2);		
			var finalDiscount=parseFloat(r.totalDisc).toFixed(2);		
			var finalPaid=parseFloat(r.totalPaid).toFixed(2);		
			var finalRefund=parseFloat(r.refundAmt).toFixed(2);			
			
			if(finalBillTotal<=0 || isNaN(finalBillTotal)){
				
				finalBillTotal=0.00;
			}
			
			if(grandTotal<=0 || isNaN(grandTotal)){
				
				grandTotal=0.00;
			}
			
			if(finalDiscount<=0 || isNaN(finalDiscount)){
	
				finalDiscount=0.00;
			}
			
			if(finalPaid<=0 || isNaN(finalPaid)){
				
				finalPaid=0.00;
			}
			
			if(finalRefund<=0 || isNaN(finalRefund)){
				
				finalRefund=0.00;
			}
			
			var remain=Number(finalBillTotal)-(Number(finalDiscount)+Number(finalPaid) + Number(conTotal));
			
			if(remain<=0 || isNaN(remain)){
				
				remain=0.00;
			}
			
			$("#finalBillTotal").html(finalBillTotal);
			$("#conTotal").html(conTotal);	
			$("#grandTotal").html(grandTotal);
			$("#finalDiscount").html(finalDiscount);
			$("#finalPaid").html(finalPaid);
			$("#finalRefund").html(finalRefund);
			var aaa = Number(finalPaid) - Number(finalRefund);			
			$("#finalRefundable").html(aaa.toFixed(2));
			$("#finalRemain").html(parseFloat(remain).toFixed(2));					
		}
	});
}


/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function getBillReceiptDetails(callFrom) {

	var patientId 	= $("#patientId").val(); 
	var billId		= 0;
	var receiptOf	= $("#receiptOf").val();	
	var userId 		= parseInt($("#userId").val());
	
	jQuery.ajax({
		async	: false,
		type	: "POST",		
		data 	: { "patientId" : parseInt(patientId),"billId" : parseInt(billId), "callFrom" : callFrom, "receiptOf" : receiptOf, "userId" : userId  },
		url 	: "ehat/otherBilling/getBillReceiptDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			console.log(r);
			if(callFrom=="allForChk"){
				
				disableSevices(r);				
			}else{
				
				if(callFrom=="deleted"){
					setDeletedReceiptTemplate(r,callFrom);
				}else{
					
					setReceiptTemplate(r,callFrom);				
					disableSevices(r);
				}	
			}	
			
			$("#trRefPer").hide();
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Disable paid services
 ************/
function disableSevices(res){
	
	for(var i=0;i<res.listBillReceiptMaster.length;i++){
		
		 for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
			 
			 var serId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
			
			 var subSerId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;			 		
			
			 $(".chkOther"+subSerId).attr("disabled", true);
			 $(".chkOther"+subSerId).attr("checked", false);
			 
			/* $("#chkOpdBillReg"+serId).attr("disabled", true);
			 $("#chkOpdBillReg"+serId).attr("checked", false);*/
			
			 $("#tamt"+serId).removeClass("mainAddedInTotal");
			 $("#tamt"+serId).addClass("mainNotInTotal");				 
			
			 $("#chkOpdBill"+subSerId).attr("disabled", true);				
			 $("#chkOpdBill"+subSerId).attr("checked", false);			
		 }
	}	
}

/************
* @author	: Bilal
* @date		: 21-June-2017
* @codeFor	: Set receipt master template for deleted tab of OPD
 ************/
function setDeletedReceiptTemplate(res,callFrom){
	
	var prevPaid=0;
	$("#btnRefund").prop('disabled','true');
	/*$("#trDisc").show();	
	$("#discAuth").show();	
	$("#discNarrtn").show();*/
		

		//$("#btnPayNow").removeAttr('disabled');
				
		var result= ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Receipt Id</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Paid</th> '
			+ '			<th>Discount</th> '
			+ '			<th>Remain</th> '
			+ '			<th>Date</th> '
			+ '			<th>Details</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';
				
			for(var i=0;i<res.listBillReceiptMaster.length;i++){
				
				var recId=res.listBillReceiptMaster[i].billReceiptId;
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				var totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);
				var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
				var remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);		
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				var creditFlag=res.listBillReceiptMaster[i].creditFlag;		
				var againstId =res.listBillReceiptMaster[i].againstId;		
			
				if(callFrom=="all"){
					
					prevPaid=prevPaid+totAmt;
					$("#prevPaid").val(prevPaid);
				}				
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  + '	<td>'+recId+'</td> '
				  + '	<td>'+totalAmt+'</td> '				 
				  + '	<td>'+totAmt+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+remainAmt+'</td> '
				  + '	<td>'+datetime+'</td> '				 
				  + '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" '
				  +'    class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>';
				  if (againstId > 0) {
					  result=result  + '   <button onclick="resetMasterReceiptOPD('+recId+')"><i class="fa fa-refresh"></i></button> ';
				  }else{
					  result=result  + '   <button onclick="resetMasterReceiptOPD('+recId+')"disabled><i class="fa fa-refresh"></i></button> ';
				  }
				  
				  				 	 
				  + '</td>'
				  + '</tr> ';				  
					  
				  var resultSlave= 
					  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
				    + ' <div class="panel-body"> '		
					+ ' <table class="table table-hover" id="receiptSlave"> '
					+ ' <thead> '
					+ '		<tr> '
					+ '			<th>#</th> '
					+ '			<th>Comp Name</th> '						
					+ '			<th>Amount</th> '
					+ '			<th>Date</th> '	
					+ '			<th>Edit</th> '
					+ '			<th>Delete</th> '
					+ '		</tr> '
					+ '	</thead> '
					+ '	<tbody> ';	 
		
				  for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
					  
					  var slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
					  var billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
					  var billAmt=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
					  var rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
					  var quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
					  var copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
					  var pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
					  var disc=res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession;
					  var againstId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].againstId;
					 
					  
					  var finalBillAmt=(rate*quantity)-disc;
					  
					  resultSlave = resultSlave + '<tr> '
							+ '	<td>'+(k+1)+'</td> '
							+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
							+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
							+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> '
							
							if(creditFlag=="Y" || againstId!=0){
								
								resultSlave=resultSlave	+ '	<td><button disabled class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
								
								+ '	<td><button disabled class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
																
							}else{
								
								resultSlave=resultSlave	+ '	<td><button  disabled class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
								
								+ '	<td><button disabled class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
																
							}
														
					  		resultSlave=resultSlave	+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
							+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
							+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
							+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
							+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
							+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
							+ '</tr>';	
					  
				  }					 		 	
					
				resultSlave=resultSlave + '	</tbody></table></div></div> ';
				result=result +resultSlave;
							  	
			}
				
			result=result
			+ '	</tbody> '
			+ '</table> ';			
		
	

	$("#cashReceipts").html(result);
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set receipt master template
 ************/
function setReceiptTemplate(res,callFrom){
	
	var prevPaid=0;
	$("#btnRefund").prop('disabled','true');
	/*$("#trDisc").show();	
	$("#discAuth").show();	
	$("#discNarrtn").show();*/
		
	if(callFrom=="refundable"){		
		
			$("#btnPayNow").prop("disabled","true");
			$("#trDisc").hide();	
			$("#discAuth").hide();	
			$("#discNarrtn").hide();
			
			var result= ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Receipt Id</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Paid</th> '
			+ '			<th>Discount</th> '
			+ '			<th>Refund</th> '
			+ '			<th>Refundable</th> '
			+ '			<th>Date</th> '
			+ '			<th>Details</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';
				
			for(var i=0;i<res.listBillReceiptMaster.length;i++){
				/*var m=0;
				var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;*/
				var recId=res.listBillReceiptMaster[i].billReceiptId;
				var recCount=res.listBillReceiptMaster[i].receiptCount;
				//var againId=res.listBillReceiptMaster[i].againstId;
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				var totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);		
				var refAmt=parseFloat(res.listBillReceiptMaster[i].refundAmt).toFixed(2);
				var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
				var remainAmt=parseFloat(Number(totAmt)-Number(refAmt)).toFixed(2);
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				
				//prevPaid=prevPaid+totAmt;
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  /*+ '	<td><input type="checkbox" class="mstNotRefund" value="'+remainAmt+'" id="mstRefndId'+recId+'" onclick="setMasterRefundAmt('+recId+')"></td> '*/
				  + '	<td>'+recCount+'</td> '
				  + '	<td>'+totalAmt+'</td> '
				  + '	<td>'+totAmt+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+refAmt+'</td> '
				  + '	<td>'+remainAmt+'</td> '
				  + '	<td>'+datetime+'</td> '
				  + '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>'
				  + '   <button onclick=receiptBillPrint("receipt",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';
				
				if(remainAmt<=0){
					
					result=result	+ '   <button disabled onclick="setCreditPayble('+remainAmt+','+recId+',\'refund\')"><i class="fa fa-credit-card"></i></button> '
				}else{
					
					result=result	+ '   <button onclick="setCreditPayble('+remainAmt+','+recId+',\'refund\')"><i class="fa fa-credit-card"></i></button> '
				}		
				  
				  + '	</td>'
				  + '</tr> ';
					
			  var resultSlave= 
					  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
				    + ' <div class="panel-body"> '		
					+ ' <table class="table table-hover" id="receiptSlave"> '
					+ ' <thead> '
					+ '		<tr> '
					+ '			<th>#</th> '
					+ '			<th>Comp Name</th> '
					+ '			<th>Amount</th> '
					+ '			<th>Date</th> '		
					/*+ '			<th>Edit</th> '
					+ '			<th>Delete</th> '
					+ '			<th>Chk</th> '*/
					+ '		</tr> '
					+ '	</thead> '
					+ '	<tbody> ';	 
		
				  for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
					  
					  var slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
					  var billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
					  var billAmt=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
					  var rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
					  var quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
					  var copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
					  var pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
					  var disc=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession).toFixed(2);
					  var serviceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
					  var subServiceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].subServiceId;
					  var doctorId   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorId;
					  // For Professional fees
					  var pfVoucherFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].pfVoucherFlag;
					  var advanceFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].advanceFlag;
					  
					 
					  var finalBillAmt=billAmt-disc;
					  
					  resultSlave = resultSlave + '<tr> '
							+ '	<td>'+(k+1)+'</td> '
							+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
							+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
							+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> ';
							/*if (pfVoucherFlag == "N" && advanceFlag == "N") {
								 resultSlave = resultSlave + '	<td><button class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
									
									+ '	<td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
									
							} else {
								resultSlave = resultSlave + '	<td><button disabled class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
								
								+ '	<td><button disabled class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
								
							}*/
							
							+ '	<td><input type="checkbox" class="slaveNotAddedRefund chkRfndSlave'+recId+'" name="refundRd" value="'+billAmt+'" id="refundChk'+billDetailsId+'" onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
							
							+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
							+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
							+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
							+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
							+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
							+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
							+ '	<td ><input type="hidden" id="sId'+billDetailsId+'" value="'+serviceId+'"></td> '
							+ '	<td ><input type="hidden" id="subsId'+billDetailsId+'" value="'+subServiceId+'"></td> '
							+ '	<td ><input type="hidden" id="doctorId'+billDetailsId+'" value="'+doctorId+'"></td> '
							
							
							+ '</tr>';	
					  
				  }	
				
				resultSlave=resultSlave + '	</tbody></table></div></div> ';
				result=result +resultSlave;		
							  	
			}
				
			result=result
			+ '	</tbody> '
			+ '</table> ';		
	
	}else{	
		
		$("#btnPayNow").removeAttr('disabled');
				
		var result= ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Receipt Id</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Paid</th> '
			+ '			<th>Discount</th> '
			+ '			<th>Remain</th> '
			+ '			<th>Date</th> '
			+ '			<th>Details</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';
				
			for(var i=0;i<res.listBillReceiptMaster.length;i++){
				/*var m=0;
				var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;*/
				var recId=res.listBillReceiptMaster[i].billReceiptId;
				var recCount=res.listBillReceiptMaster[i].receiptCount;
				var againId=res.listBillReceiptMaster[i].againstId;
				var totAmt=0;
				var totDisc=0;
				var remainAmt=0;
				if(againId==0){
					
					totAmt=parseFloat(res.listBillReceiptMaster[i].firstPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].firstDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].firstRemain).toFixed(2);	
				}else{
					
					totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);	
				}
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				//var totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);
				//var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
				//var remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);	
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				var creditFlag=res.listBillReceiptMaster[i].creditFlag;	
				
				//For professional fees
				var billSettledFlag=res.listBillReceiptMaster[i].billSettledFlag;	
				//var refundFlag=res.listBillReceiptMaster[i].refundFlag;		
				
				if(callFrom=="all"){
					
					prevPaid=Number(prevPaid)+Number(totAmt);
					$("#prevPaid").val(prevPaid);
				}
				
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  + '	<td>'+recCount+'</td> '
				  + '	<td>'+totalAmt+'</td> '				 
				  + '	<td>'+totAmt+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+remainAmt+'</td> '
				  + '	<td>'+datetime+'</td> '				 
				  + '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>'
				  /*+ '   <button onclick="hideOpdBillPanel('+recId+')"><i class="fa fa-plus"></i></button> '
				  + '   <button onclick="deleteMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> '*/
				  /*if (billSettledFlag ="Y") {
					  result=result  + '   <button disabled onclick="deleteMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
					  
				  } else {
					  result=result  + '   <button onclick="deleteMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
					  
				  }*/
				  + '   <button onclick=receiptBillPrint("receipt",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';
				
				if(creditFlag=="Y"){
					
					result=result	+ '   <button disabled onclick="setCreditPayble('+res.listBillReceiptMaster[i].totalRemain+','+recId+')"><i class="fa fa-credit-card"></i></button> ';
				}else{
					
					result=result	+ '   <button onclick="setCreditPayble('+res.listBillReceiptMaster[i].totalRemain+','+recId+')"><i class="fa fa-credit-card"></i></button> ';
				}		
				 	 
				  + '	</td>'
				  + '</tr> ';
				  
					  
				  var resultSlave= 
					  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
				    + ' <div class="panel-body"> '		
					+ ' <table class="table table-hover" id="receiptSlave"> '
					+ ' <thead> '
					+ '		<tr> '
					+ '			<th>#</th> '
					+ '			<th>Comp Name</th> '						
					+ '			<th>Amount</th> '
					+ '			<th>Date</th> '	
					/*+ '			<th>Edit</th> '
					+ '			<th>Delete</th> '*/
					+ '		</tr> '
					+ '	</thead> '
					+ '	<tbody> ';	 
		
				  for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
					  
					  var slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
					  var billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
					  var billAmt=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
					  var rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
					  var quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
					  var copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
					  var pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
					  var disc=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession).toFixed(2);
					  var againstId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].againstId;
					  //var paid=res.listBillReceiptMaster[i].listBillReceiptSlave[k].paid;
					 // var paid=billAmt-disc;paid
					  var serviceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
					  var subServiceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].subServiceId;
					  var doctorId   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorId;
					  // For Professional fees
					  var pfVoucherFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].pfVoucherFlag;
					  var advanceFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].advanceFlag;
					  
					  var finalBillAmt=(rate*quantity)-disc;
					  
					  resultSlave = resultSlave + '<tr> '
							+ '	<td>'+(k+1)+'</td> '
							+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
							+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
							+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> '
							
							/*if(creditFlag=="Y" || againstId!=0){
								
								resultSlave=resultSlave	+ '	<td><button disabled class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
								
								+ '	<td><button disabled class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
																
							}else if (pfVoucherFlag == "N" && advanceFlag == "N"){
								
								resultSlave=resultSlave	+ '	<td><button class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
								
								  + '	<td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
																
							}else {
							   resultSlave = resultSlave + '	<td><button disabled class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
							
							      + '	<td><button disabled class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
							
							}*/	
					  
					  		resultSlave=resultSlave	+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
							+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
							+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
							+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
							+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
							+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
							+ '	<td ><input type="hidden" id="sId'+billDetailsId+'" value="'+serviceId+'"></td> '
							+ '	<td ><input type="hidden" id="subsId'+billDetailsId+'" value="'+subServiceId+'"></td> '
							+ '	<td ><input type="hidden" id="doctorId'+billDetailsId+'" value="'+doctorId+'"></td> '
							
							+ '</tr>';	
					  
				  }					 		 	
					
				resultSlave=resultSlave + '	</tbody></table></div></div> ';
				result=result +resultSlave;
							  	
			}
				
			result=result
			+ '	</tbody> '
			+ '</table> ';			
		
	}

	$("#cashReceipts").html(result);
}

/************
* @author	: Vinod Udawant
* @date		: 26-July-2017
* @codeFor	: Set Total Payable
 ************/
function setTotalPaid(callFrom,serviceId) {

	//alert(callFrom+"  "+serviceId);
	var sId=serviceId;
	var treatmentId	= 0;
	var patientId	= parseInt($("#patientId").val());	
	var billId		= 0; 
	var unitId = $("#unitId").val();
	var userId = parseInt($("#userId").val());	
	var depId= 0;
	
	jQuery.ajax({
		async	: false,
		type	: "POST",	
		data : {
			"treatmentId" : parseInt(treatmentId),
			"billId" : parseInt(billId),
			"serviceId" : parseInt(sId),
			"callFrom" : callFrom,
			"depId" : parseInt(depId),
			"unitId" : parseInt(unitId),
			"userId" : parseInt(userId),
			"patientId" : parseInt(patientId)
		},
		url 	: "ehat/otherBilling/getTotalPayable",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var totAmt=0,totCons=0,totPayable=0;
		
			for(var inx=0;inx<r.listBillDetailsOther.length;inx++){
				
				var servId=r.listBillDetailsOther[inx].serviceId;
				
				totAmt=totAmt+r.listBillDetailsOther[inx].amount;
				totCons=totCons+r.listBillDetailsOther[inx].concession;	
				
				if(sId==-1){
					
					$("#chkOpdBillReg"+servId).removeAttr("disabled");
					$("#chkOpdBillReg"+servId).prop("checked","checked");
				}
			
				/*$("#chkOpdBillReg"+servId).removeAttr("disabled");
				$("#chkOpdBillReg"+servId).prop("checked","checked");*/
				
			}		
				
			totPayable=totAmt-totCons;		
			$("#payable").val(parseFloat(totPayable).toFixed(2));
			$("#payNow").val(parseFloat(totPayable).toFixed(2));
		}
	});
};


/************
* @author	: Vinod Udawant
* @date		: 24-July-2017
* @codeFor	: Print Opd Receipts
 ************/
function receiptBillPrint(callFrom,recId){

	var billId=$("#billNo").text(); 	
	var treatId= 0; 	
	var patId=parseInt($("#patientId").val());
	//var deptId = 0;
	var pendFlag = $("#pendingFlag").val();
	
	if(recId==-5){
		
		recId=$("#recId").val();
	}
	if(callFrom=="receipt"){
	
		window.open("ehat_other_receipt.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
				
	}else{
		
		window.open("ehat_other_refund.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
			
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Set Refund
 ************/
function setCreditPayble(remAmt,recId,callFrom,trId){
	
	$("#payable").val(remAmt);	
	$("#recId").val(recId);
	$("#callFromForSave").val("credit");
	
	if(callFrom=="refund"){
		
		$("#btnPayNow").prop("disabled","true");
		$("#btnRefund").removeAttr('disabled');	
		$("#trRefPer").show();
	}else if(callFrom=="pending"){
		
		$("#pendingFlag").val("Y");
		$("#pendingTreatId").val(trId);	
		$("#payNow").prop("readonly","readonly");
		$("#payNow").val(remAmt);
		$("#trRefPer").hide();
	}
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function manageDiscount(){
	
	if($("#trDisc").css('display') == 'none'){
		
		$("#trDisc").show();	
		$("#trDiscAmt").show();
		$("#discAuth").show();	
		$("#discNarrtn").show();
		$("#discRemark").show();
	}else{
		
		$("#trDisc").hide();	
		$("#trDiscAmt").hide();
		$("#discAuth").hide();	
		$("#discNarrtn").hide();
		$("#discRemark").hide();
	}	
}

function calRefundAmtOpd(){
	
	var payable=$("#payable").val();
	var ref=$("#refPer").val();
	var refAmt=(Number(payable)*Number(ref))/100;
	if(Number(refAmt)>Number(payable)){
		alert("Refund should not be greater than payable");
		$("#refPer").val(0);
		$("#payNow").val(0);
	}else{
		//var nowPay=Number(payable)-Number(refAmt);
		$("#payNow").val(parseFloat(refAmt).toFixed(2));
	}	
}


function calRefundPerOpd(){
	
	var payable=$("#payable").val();
	var refAmt=$("#payNow").val();
	var refPer=(Number(refAmt)/Number(payable))*100;
	if(Number(refAmt)>Number(payable)){
		alert("Refund should not be greater than payable");
		$("#refPer").val(0);		
		$("#payNow").val(0);
	}else{
		
		$("#refPer").val(parseFloat(refPer).toFixed(2));		
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function calDiscount(){
	
	var payable=$("#payable").val();
	var disc=$("#discount").val();
	var discAmt=(Number(payable)*Number(disc))/100;
	if(Number(discAmt)>Number(payable)){
		alert("Discount should not be greater than payable");
		$("#discount").val(0);
		$("#discountAmt").val(0);
		$("#payNow").val(0);
	}else{
		
		var nowPay=Number(payable)-Number(discAmt);
		$("#discountAmt").val(parseFloat(discAmt).toFixed(2));
		$("#payNow").val(parseFloat(nowPay).toFixed(2));
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function calDiscountPer(){
	
	var payable=$("#payable").val();
	var discAmt=$("#discountAmt").val();
	var discPer=(Number(discAmt)/Number(payable))*100;
	if(Number(discAmt)>Number(payable)){
		alert("Discount should not be greater than payable");
		$("#discount").val(0);
		$("#discountAmt").val(0);
		$("#payNow").val(0);
	}else{
		
		var nowPay=Number(payable)-Number(discAmt);
		$("#discount").val(parseFloat(discPer).toFixed(2));
		$("#payNow").val(parseFloat(nowPay).toFixed(2));
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2017
* @codeFor	: save refund receipts
 ************/
function saveRefundBillDetails(callFrom){

	var unitId		= parseInt($("#unitId").val());
	var userId		= parseInt($("#userId").val());	
	var refDocId	= 0; //parseInt($("#refDocId").val());	
	var treatmentId	= 0;  
	var patientId	= parseInt($("#patientId").val());	
	var regBillId	= $("#regBillId").val();  
	var payable		= parseFloat($("#payable").val()); 
	var discount	= parseFloat($("#discount").val()); 
	var refPer		= parseFloat($("#refPer").val());
	var payNow		= parseFloat($("#payNow").val());
	
	var payMode		= $("#payMode").val();
	var bnumber		= $("#bnumber").val();
	var bName		= $("#bName").val();	
	
	//var creditFlag	= $("#creditFlag").val();
	var againstId	= $("#recId").val();
	var receiptOf= $("#receiptOf").val();
	
	var payeeSprlastId=0;
	var payeeSprMainId=0;
	var payeeTypeId= $("#payee").val();	
	/*if(payeeTypeId==2){
		
		var size=$("#dynamicItems li").length;
		payeeSprlastId=$("#lis" + (size - 1)).val();
		payeeSprMainId=$("#lis0").val();
	}*/
	
	callFrom= $("#callFromForSave").val();
	
	if(payable<=0){
		
		alert("Payable should be greater than zero");
		return false;
	}
	
	if(payNow>payable){
		
		alert("Amount should be less than payable");
		$("#payNow").val(0);
		$("#payNow").focus();
		return false;
	}else if(payNow<=0){
		
		alert("Pay Now should be greater than zero");
		$("#payNow").val(0);
		$("#payNow").focus();
		return false;
	}
		
	var servIdsChecked=[]; 
	// add reg  
	/*$('input[id=chkOpdBillReg1]:checked').each(function(){
		
		servIdsChecked.push(regBillId);
	});*/	
	
	/*$('input[name=opdBillCheckbox]:checked').each(function(){
		
		servIdsChecked.push($(this).val());
	});*/
	
	$('input[id=chkOpdBillReg1]:not(:checked)').each(function(){
		
		servIdsChecked.push(regBillId);
	});

	$('input[name=opdBillCheckbox]:not(:checked)').each(function(){
		
		servIdsChecked.push($(this).val());
	});
	
	/*$("#chkOpdBillReg1").prop("disabled",true);
	
	for(var i=1;i<servIdsChecked.length;i++){
		
		$("#chkOpdBill"+servIdsChecked[i]).prop("disabled",true);
	}*/	
	
	/*if(servIdsChecked.length!=0){
		
		alert("please select at least one service");
	}*/
	
	if(bnumber== undefined){
		
		bnumber="0";
	}
	if(bName== undefined){
		
		bName="";
	}
	
	var inputs = [];	
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("unitId=" + unitId);
	inputs.push("createdBy=" + userId);
	inputs.push("totalAmt=" + payable);	
	inputs.push("discount=" + discount);	
	inputs.push("totalPaid=" + payNow);	
	inputs.push("servIdsChecked=" + servIdsChecked);	
	inputs.push("refDocId=" + refDocId);		
	inputs.push("payMode=" + payMode);		
	inputs.push("bNumber=" + bnumber);		
	inputs.push("bName=" + bName);		
	inputs.push("callFrom=" + callFrom);		
	inputs.push("againstId=" + againstId);	
	inputs.push("receiptOf=" + receiptOf);	
	inputs.push("payeeSprMainId=" + payeeSprMainId);
	inputs.push("payeeSprlastId=" + payeeSprlastId);
	inputs.push("payeeTypeId=" + payeeTypeId);
	inputs.push("refPer=" + refPer);
	inputs.push("patientId=" + patientId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/otherBilling/saveRefundBillDetails",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			if(r>0){
				
				alertify.success("Refund Receipt generated succesfully");
				receiptBillPrint("refund",r);
			}else if(r==-1){
				
				alertify.error("Amount should be less than paid");
			}else if(r==-2){
				
				alertify.error("Receipt is not generated to refund");
			}else{
				
				alertify.error("Network Issue");
			}
			
			resetAll(receiptOf);			
		}
	});
}


/************
* @author	: Vinod Udawant
* @date		: 14-July-2017
* @codeFor	: Get bill refund master details
 ************/
function getBillRefundDetails(callFrom) {

	var patientId	= parseInt($("#patientId").val());	
	var treatmentId	= 0;  
	var billId		= 0; 
	var receiptOf= $("#receiptOf").val();
	var userId = parseInt($("#userId").val());
	
	jQuery.ajax({
		async	: false,
		type	: "POST",		
		data 	: { "patientId" : parseInt(patientId),"billId" : parseInt(billId), "callFrom" : callFrom, "receiptOf" : receiptOf, "userId" : userId },
		url 	: "ehat/otherBilling/getBillRefundDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			/*var len=r.listBillRefundMaster.length;
			alert(len);
			if(len>0){*/
				
				setRefundTemplate(r,callFrom);				
				//disableSevices(r);
			/*}	*/		
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 14-July-2017
* @codeFor	: Set refund master template
 ************/
function setRefundTemplate(res,callFrom){
	
	var prevRefund=0;
	
	var result= ' <table class="table table-hover" id="refunds"> '
	+ ' <thead> '
	+ '		<tr> '
	+ '			<th>#</th> '
	+ '			<th>Refund Id</th> '
	+ '			<th>Amount</th> '
	+ '			<th>Refund</th> '
	+ '			<th>Reduction</th> '
	+ '			<th>Date</th> '			
	+ '		</tr> '
	+ '	</thead> '
	+ '	<tbody> ';
			
	for(var i=0;i<res.listBillRefundMaster.length;i++){
		/*var m=0;
		var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;*/
		var recId=res.listBillRefundMaster[i].billRefundId;
		var recCount=res.listBillRefundMaster[i].refundCount;
		var totalAmt=parseFloat(res.listBillRefundMaster[i].totalAmt).toFixed(2);
		var totAmt=parseFloat(res.listBillRefundMaster[i].totalPaid).toFixed(2);
		var remainAmt=parseFloat(res.listBillRefundMaster[i].totalRemain).toFixed(2);	
		var datetime= new Date(res.listBillRefundMaster[i].createdDateTime).toLocaleDateString('en-GB');
		
		prevRefund=Number(prevRefund)+Number(totAmt);
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  /*+ '	<td><input type="checkbox" class="mstNotRefund" value="'+remainAmt+'" id="mstRefndId'+recId+'" onclick="setMasterRefundAmt('+recId+')"></td> '*/
		  + '	<td>'+recCount+'</td> '
		  + '	<td>'+totalAmt+'</td> '
		  + '	<td>'+totAmt+'</td> '
		  + '	<td>'+remainAmt+'</td> '
		  + '	<td>'+datetime+'</td> '
		  + '   <td> <button onclick=receiptBillPrint("refund",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button></td> '
		  /*+ '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>';*/
		/*
		if(creditFlag=="Y"){
			
			result=result	+ '   <button disabled onclick="setCreditPayble('+totAmt+','+recId+')"><i class="fa fa-credit-card"></i></button> '
		}else{
			
			result=result	+ '   <button onclick="setCreditPayble('+totAmt+','+recId+')"><i class="fa fa-credit-card"></i></button> '
		}		
		  
		  + '	</td>'*/
		  + '</tr> ';
			
	  /*var resultSlave= 
			  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
		    + ' <div class="panel-body"> '		
			+ ' <table class="table table-hover" id="receiptSlave"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Comp Name</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Date</th> '		
			+ '			<th>Edit</th> '
			+ '			<th>Delete</th> '
			+ '			<th>Chk</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';	 

		  for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
			  
			  var slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
			  var billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
			  var billAmt=res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount;
			  var rate=res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate;
			  var quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
			  var copay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay;
			  var pay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay;
			  var disc=res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession;
			 // var serviceID=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
			  
			  var finalBillAmt=billAmt-disc;
			  
			  resultSlave = resultSlave + '<tr> '
					+ '	<td>'+(k+1)+'</td> '
					+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
					+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
					+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> '
					
					+ '	<td><button class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
					
					+ '	<td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> '
					
					+ '	<td><input type="checkbox" class="slaveNotAddedRefund chkRfndSlave'+recId+'" name="refundRd" value="'+billAmt+'" id="refundChk'+billDetailsId+'" onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
					
					+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
					+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
					+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
					+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
					+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
					+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
					+ '</tr>';	
			  
		  }	
		
		resultSlave=resultSlave + '	</tbody></table></div></div> ';
		result=result +resultSlave;		
					  	
	}*/
	}
		
	result=result
	+ '	</tbody> '
	+ '</table> ';		
	
	$("#prevRefunded").text(prevRefund);
	var refundable=Number($("#prevPaid").val())-Number(prevRefund);
	
	if(refundable<0){
		
		refundable=0;
	}
	$("#nowRefunded").text(refundable);	
	$("#cashReceipts").html(result);	

}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function setRefundAmt(id){
		
	if($('#mstRefndId'+id).prop("checked") == true){	
				
		$("#mstRefndId"+id).removeClass("mstNotRefund");
    	$("#mstRefndId"+id).addClass("mstRefund");  
    	    	
    	$('.chkRfndSlave'+id).prop('checked', true);    	
    	mainRefundTotal(); 	
	}else{
		
		$("#mstRefndId"+id).removeClass("mstRefund");
    	$("#mstRefndId"+id).addClass("mstNotRefund");
    	
    	$('.chkRfndSlave'+id).prop('checked', false);
    	mainRefundTotal(); 	
	}
	
	$("#payable").val(refundAmt);	
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function setSlaveRefundAmt(id){
		
	if($('#refundChk'+id).prop("checked") == true){	
				
		$("#refundChk"+id).removeClass("slaveNotAddedRefund");
    	$("#refundChk"+id).addClass("slaveAddedRefund");  
    	    	
    	//$('.chkRfndSlave'+id).prop('checked', true);    	
    	mainRefundTotal(); 	
	}else{
		
		$("#refundChk"+id).removeClass("slaveAddedRefund");
    	$("#refundChk"+id).addClass("slaveNotAddedRefund");
    	
    	//$('.chkRfndSlave'+id).prop('checked', false);
    	mainRefundTotal(); 	
	}
	
	$("#payable").val(refundAmt);	
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function mainRefundTotal(){
	
	var total=0;
	//var count=0;
	
	/*$('.slaveAddedRefund').each(function() {
		count++;		 
	});*/
	
	$('.slaveAddedRefund').each(function() {
		
		total=total+Number($(this).val());    
	});
		
	/*if(count>0){
		
		$("#mainBillDeatils").hide('hide');
	}else{
		
		$("#mainBillDeatils").show('show');
	}*/
	/*$('.slaveAddedRefund').each(function() {
		
		total=total+Number($(this).val());    
	});*/
	
	$("#payable").val(total);
	
}


/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set slave checkboxes according to master
 ************/
function setRefundAmtSlave(id){
	
    if(($('#mstRefndId'+id).prop("checked") == true)){
    	
    	/*if(id==1){
    		
    		$('#tamt1').removeClass("slaveNotAddedRefund");
        	$('#tamt1').addClass("slaveAddedRefund");
    	}*/
    	
    	$('.chkRfndSlave'+id).prop('checked', true);    	
    	 
    	$('.chkRfndSlave'+id).removeClass("slaveNotAddedRefund");
    	$('.chkRfndSlave'+id).addClass("slaveAddedRefund");
    	setTotalRefund();
    }else{
    	
    	/*if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}*/
    	
    	$('.chkRfndSlave'+id).prop('checked', false);	
    	
    	$('.chkRfndSlave'+id).removeClass("slaveAddedRefund");
    	$('.chkRfndSlave'+id).addClass("slaveNotAddedRefund");
    	setTotalRefund();
    }	
}

function BankOnSelect(){
	
	var payable=$("#payable").val();	
	$("#multiPayable").val(payable);	
	var paymode=$("#payMode").val();		
	$("#payNow").removeAttr("readonly");	
	
	if(paymode==2){
		$('#headerTable').find('.member').show();
		$('#headerTable').find('.member2').show();
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').show();
		
	}else if(paymode==3){
		$('#headerTable').find('.member').show();
		$('#headerTable').find('.member2').hide();
		$('#headerTable').find('.member3').show();	
		$('#divForChq').show();
	}else if(paymode==-1){
		
		$("#modal-11").addClass("md-show");
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').hide();
		$("#payNow").prop("readonly",true);	
		getBankMasterList();
		resetMultiPopup();		
		
	}else if(paymode==4){
	
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').hide();
		var payable=$("#payable").val();
		var commnAdvc= $("#finalAdvance").html(); //$("#commnAdvc").text();		
		var payNow=$("#payNow").val();
		
		if(Number(commnAdvc)>Number(payable)){
			
			commnAdvc=Number(commnAdvc)-Number(payable);		
			payNow=Number(payable);
			$("#finalAdvance").html(parseFloat(commnAdvc).toFixed(2));
			//$("#commnAdvc").text(commnAdvc);	
			$("#payNow").val(parseFloat(payNow).toFixed(2));	
		}else{
			
			//$("#commnAdvc").text(0);
			$("#finalAdvance").html(0.00);
			payNow=Number(commnAdvc);
			$("#payNow").val(parseFloat(payNow).toFixed(2));
		}	
		
	}else{
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();	
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').hide();
	}
}

/***********
 * @author	: Vinod Udawant
 * @date	: 06-jan-2018
 * @codeFor : Set UI Mode
 ***********/
function setUiMode(){

	var uiMode=$("#uiMode").val();
	
	if(uiMode=='S'){
		
		$('#servDiv').removeClass('col-md-12');
		$('#servDiv').addClass('col-md-9');
		$('#payDiv').show('');
		$("#uiMode").val('P');
		var sponsorId=$("#chargesSlaveId").val();
		if(sponsorId>0){
					
			$("#sponsorOpd").trigger('click');			
			resetAll("sponsor");	
			$("#txtPayAmtSp").html("Bill Details");	
		}else{
				
			resetAll("general");
			$("#txtPayAmt").html("Bill Details");	
		}
		
		$("#receiptView").show();
			
	}else{
		
		$('#servDiv').removeClass('col-md-9');
		$('#servDiv').addClass('col-md-12');
		$('#payDiv').hide('');
		$("#uiMode").val('S');
		var sponsorId=$("#chargesSlaveId").val();
		if(sponsorId>0){
					
			$("#sponsorOpd").trigger('click');			
			resetAll("sponsor");	
			$("#txtPayAmtSp").html("Pay Amount");	
		}else{
				
			resetAll("general");
			$("#txtPayAmt").html("Pay Amount");	
		}
		
		$("#receiptView").hide();
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function getCommonAdvc() {

	var callform="opdBill";
	//var pId=$("#patientId").text();
	var pId = parseInt($("#treatmentId").text());
	//var treatmentId	= parseInt($("#treatmentId").text());	
	
	jQuery.ajax({
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvMasterList",
		data	: {	"pID_cID" : pId, "callform" : callform },
		timeout : 1000 * 60 * 5,
		cache 	: false,	
		success : function(response) {

			var totalAdvc=0;
			for(var i=0;i<response.lstCommonadv.length;i++){
				
				totalAdvc=Number(totalAdvc)+Number(response.lstCommonadv[i].commonadv_amnt);
			}
			
			$("#finalAdvance").html(parseFloat(totalAdvc).toFixed(2)); 			
		}
	});
}

/***********
 * @author	: Vinod Udawant
 * @date	: 08-Nov-2016
 * @reason	: Authorised Users List 
 **********/
function fetchAuthorisedBy(callFrom){
	callFrom ="onload";
	
	var inputs = [];
	inputs.push('action=fetchAuthorisedBy');
	inputs.push('callFrom='+callFrom);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/admindata/fetchAuthorisedBy",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			var data = eval('(' + r + ')');
			$("#discAuthSel").setTemplate(authorisedByListTemplate);
			$("#discAuthSel").processTemplate(data);
			
		}
	});	
} 

//@Touheed Template authorised by @date 23-Aug-2016
var authorisedByListTemplate = "<option value='0'>-- Select --</option>{#foreach $T.listDoctor as dpl}" 
		+	"<option value='{$T.dpl.ui}'>{$T.dpl.dn}</option>{#/for}";

function myfun(){
	BankOnSelect();
	$("#modal-11").addClass("md-show");
	getBankMasterList();
	resetMultiPopup();
}

/************
* @author	: Vinod Udawant
* @date		: 11-July-2017
* @codeFor	: Show/hide receipt view
 ************/
function hideBillDetails(){
	
	$("#mainBillDeatilsForOpd").toggle('slow');	
	var curClass=$("#shBillView").attr('class');
	
	if(curClass=="fa fa-chevron-up"){
		
		$("#shBillView").removeClass('fa fa-chevron-up');
		$("#shBillView").addClass('fa fa-chevron-down');
		$("#billText").text('Show Bill View');
		
		$("#refundBillDetails").css("height","425px");
		$("#refundBillDetails").css("overflow","auto");		
		
	}else{
		
		$("#shBillView").removeClass('fa fa-chevron-down');
		$("#shBillView").addClass('fa fa-chevron-up');
		$("#billText").text('Show Receipt View');	
		
		$("#refundBillDetails").css("height","182px");
		$("#refundBillDetails").css("overflow","auto");
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 03-April-2019
* @codeFor	: Save Advance other receipt 
 ************/
function saveOtherBillDetails(){

	var payNowConf = parseFloat($("#payNow").val());
	
	var r = confirm("Are You Sure You Want To Pay Amount :"+payNowConf);
	if (r == true) {
		var unitId		= parseInt($("#unitId").val());
		var userId		= parseInt($("#userId").val());	
		var refDocId	= 0;	
		var treatmentId	= 0;
		var subservIdsChecked=""; 
		$('input[name=opdBillCheckbox]:checked').each(function(){
			
			var bilDetId	=  parseInt($(this).val());		
			var serviceId 		= parseInt($("#sId"+bilDetId).text());
			if(serviceId == 12){//Checking whether test is of Investigation type or not 
			
				subservIdsChecked=subservIdsChecked+","+$(this).val();		
			}		
		});
		
		var payable		= parseFloat($("#payable").val()); 
		var discount	= parseFloat($("#discount").val()); 
		var discountAmt	= parseFloat($("#discountAmt").val()); 
		var disAuth		= parseInt($("#discAuthSel").val()); 
		var disNarrtn	= $("#narrSel").val(); 	
		var disRemark	= $("#txtDiscRemk").val(); 	
		var payNow		= parseFloat($("#payNow").val());	
		var payMode		= $("#payMode").val();
		var bnumber		= "";
		var batchNo		= "";
		var bName		= "";
		var againstId	= $("#recId").val();
		var sourceCatId	= $("#SponsorsourceTypeId").val();
		var sponsorCatId= $("#chargesSlaveId").val();	
		var receiptOf= $("#receiptOf").val();	
		
		var payeeSprlastId=0;
		var payeeSprMainId=0;
		var payeeTypeId= $("#payee").val();	
		if(payeeTypeId==2){
			
			var size=$("#dynamicItems li").length;
			payeeSprlastId=$("#lis" + (size - 1)).val();
			payeeSprMainId=$("#lis0").val();
		}
		
		callFrom= $("#callFromForSave").val();
			
		var paidByCashFlag = "N";//$("#paidByCashFlag").val();	
		var paidByCashServices = "";//$("#paidByCashServices").val();	
		
		var multiPayDetails = {
				listMultiBillReceiptMaster : []
	    };
		
		if(payMode==2 || payMode==3){
			
			if(payMode==2){
				
				bnumber= $("#cardnumber").val();
			}
			
			if(payMode==3){
				
				bnumber= $("#chequenumber").val();
			}
			
			bName= $("#bankID").val();
			batchNo= $("#newBatchNumber").val();
					
		}else if(payMode==-1){
					
			var rows= $('#multiPayTable tbody tr.multiPayClass').length;
			for(var i=1;i<=rows;i++){
							
				var payModePop=$("#payMode"+i).val();
				var bankId=$("#bankID"+i).val();
				var bNum=$("#txtbankNo"+i).val();			
				var batchNum=$("#txtaccNo"+i).val();			
				var amt=$("#txtAmount"+i).val();		
				setReceiptList(multiPayDetails,payModePop,bankId,bNum,batchNum,amt);
			}		
			
		}else{
			
			bnumber= 0;
			bName= 0;
			batchNo=0;
		}		
		
		if(payNow > payable){
			
			alert("Amount should be less than payable");
			$("#payNow").val(0);			
			$("#discount").val(0);
			$("#discountAmt").val(0);		
			$("#payNow").focus();
			return false;
			
		}else if(payNow < 0){
			
			alert("Amount should be greater than 0");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
			
		}/*else if(payNow == 0 || payNow < payable){
			
			if(disAuth==0){
				
				alert("Please Select Authorized Person");
				return false;
			}			
		}*/
		 
		if(discount>0){
			
			var discPayNow = Number(payNow) + Number(discountAmt);
			if(discPayNow > payable){
				
				alert("Pay now should be less than or equal to payable");
				$("#payNow").val(payable);
				$("#discount").val(0);
				$("#discountAmt").val(0);
				
				return false;
			}
			
			if(disAuth==0){
				
				alert("Please Select Authorized Person");
				return false;
			}
			if(disNarrtn==0){
				
				alert("Please Select Discount Reason");
				$("#txtDiscRemk").focus(); 	
				return false;
			}		
		}
		
		var masterIdsChecked=[]; 
		var servIdsChecked=[];
		var regBillDetId=0;
		
		if(paidByCashFlag == "Y"){
			
			$('input[name=opdBillCheckboxReg]:checked').each(function(){
				
				if($(this).val() == 1){
					
					regBillDetId = $("#regBillId").val();					
				}
			});
			
			$('input[name=opdBillCheckbox]:checked').each(function(){
				
				servIdsChecked.push($(this).val());
			});
			
		}else{
			
			$('input[name=opdBillCheckboxReg]:checked').each(function(){
				
				masterIdsChecked.push($(this).val());
				
				if($(this).val() == 1){
					
					regBillDetId = $("#regBillId").val();					
				}
			});
			
			$('input[name=opdBillCheckboxReg]:not(:checked)').each(function(){
				
				if($(this).val() == 1){
					
					regBillDetId = $("#regBillId").val();					
				}
			});
	
			$('input[name=opdBillCheckbox]:not(:checked)').each(function(){
						
				servIdsChecked.push($(this).val());
			});	
		}	
		
		var patientId = $("#patientId").val();		
		multiPayDetails = JSON.stringify(multiPayDetails);
		
		var inputs = [];	
		inputs.push("treatmentId=" + treatmentId);
		inputs.push("unitId=" + unitId);
		inputs.push("createdBy=" + userId);
		inputs.push("totalAmt=" + payable);	
		inputs.push("discount=" + discount);	
		inputs.push("discountAmt=" + discountAmt);	
		inputs.push("disAuth=" + disAuth);	
		inputs.push("disNarrtn=" + disNarrtn);	
		inputs.push("totalPaid=" + payNow);	
		inputs.push("masterIdsChecked=" + masterIdsChecked);
		inputs.push("servIdsChecked=" + servIdsChecked);	
		inputs.push("refDocId=" + refDocId);		
		inputs.push("payMode=" + payMode);		
		inputs.push("bNumber=" + bnumber);	
		inputs.push("batchNo=" + batchNo);	
		inputs.push("bName=" + bName);		
		inputs.push("callFrom=" + callFrom);		
		inputs.push("againstId=" + againstId);	
		inputs.push("sourceCatId=" + sourceCatId);
		inputs.push("sponsorCatId=" + sponsorCatId);	
		inputs.push("multiPayDetails=" + multiPayDetails);	
		inputs.push("receiptOf=" + receiptOf);
		inputs.push("payeeTypeId=" + payeeTypeId);
		inputs.push("payeeSprMainId=" + payeeSprMainId);
		inputs.push("payeeSprlastId=" + payeeSprlastId);
		inputs.push("disRemark=" + disRemark);
		inputs.push("regBillDetId=" + regBillDetId);
		inputs.push("paidByCashFlag=" + paidByCashFlag);
		inputs.push("paidByCashServices=" + paidByCashServices);
		inputs.push("patientId=" + patientId);	
		
		var str = inputs.join('&');	
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data 	: str + "&reqType=AJAX",		
			url 	: "ehat/otherBilling/saveOtherBillDetails",
			error 	: function() {
						alert('Network Issue!!!');
					  },
			success : function(r) {
				
				if(r>0){
					
					//resetMultiPopup();				
					alertify.success("Receipt generated succesfully");
					receiptBillPrint("receipt",r,"");
					
				}else if(r==-2){
					
					alert("Common advance not enough to pay bill...");
				}else{
					
					alertify.error("Network issue");
				}			
				resetAll(receiptOf);
				var c=$("#preId").val(); 			
				$("#paidByCashFlag").val('N');
				$("#paidByCashServices").val('0');			
				$("#txtDiscRemk").val("");
			}
		});
	}	
}