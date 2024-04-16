function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient UHID Here");
		$("#byName").removeAttr("minlength");	
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
		$("#byName").attr("minlength", "10");
		$("#byName").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#byName").attr("placeholder", "Type Patient AddharNo Here");
		$("#byName").attr("minlength", "12");
		$("#byName").attr("maxlength", "12");
	}
}


/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 09-Nov-2017
 * @codeFor : Get for ipd bill patients
 ******************************************************************************/
function getIpdBillPatientsForComparison(callform) {

	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	
	var unit_id = $('#unitId').val();

	var inputs = [];
	inputs.push('unit_id=' + unit_id);
    inputs.push('findText=' + usertype);
    inputs.push('callFrom=' + callform);
    inputs.push('wardType=' + wardType);
    inputs.push('wardName=' + wardName);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdBillComparison/ipdBillComparison",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

			setIpdbillPatientsTempForComparison(r);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 09-June-2017
 * @codeFor : Set ipd queue template
 ******************************************************************************/
function setIpdbillPatientsTempForComparison(res) {

	var count = 1;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			+ "<th class='col-md-2-1 hidden' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"
			
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>UHID</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Mobile No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>MRN No</label></th>"

			
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>View Bill</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "</table>"
			+ "</div>"
			+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
			+ "	<table class='table table-condensed table-stripped cf'>"
			+ "<tbody class='cf'>";

	for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {
		
		var fullName = res.lstIpdbillPatients[indx].patient_name;
		ipdqueueTemp = ipdqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-3-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"
				/*+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].pId
				+ "</td>"*/
				
				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].center_patient_id
				+ "</td>"
				
				
				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mobile
				+ "</td>"
				
				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mrnno
				+ "</td>"
				
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"+res.lstIpdbillPatients[indx].opdipdno+"</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
				+ count + "' " + "		onclick=viewBillForIPDForComparison("+ res.lstIpdbillPatients[indx].treatment_id +",'generalBill') style='font-size: 12px;' />" + "	</td></tr>";

		count = count + 1;
	}
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#ipdBillPatients1").html(ipdqueueTemp);
}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : autosuggestion for IPD Bill Comparison 
 ******************************************************************************/ 

function setAutoPatientNamecomparison(inputID,callFrom,e) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	

	if(patSearchType == 1 || patSearchType == 3)
	{
		 var key = e.which;
		
		 if(key == 13) {
			
			 getBillcomparisonInfo(inputID);
		 }
	}else{
		getBillcomparisonInfo(inputID);
	}
}

/* =============
Code By  : Badrinath Wagh
Code For : get Ipd Bill comparison Patients Info.
================*/

function getBillcomparisonInfo(inputID){
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	var callFrom=patSearchType;
	var inputs = [];	
	
	
	 inputs.push('unit_id=' + 1);
     inputs.push('findText=' + findingName);
     inputs.push('callFrom=' + patSearchType);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdBillComparison/ipdBillComparison",
		cache : false,		
		success : function(r) {
			
			if(patSearchType == 1 || patSearchType == 3 ){
				 if(r.lstIpdbillPatients.length > 0){
					 
					 setIpdbillPatientsTempForComparison(r);
					 
					// setIpdbillPatientsTemp2(r);
				 }
			}
			
			var template = "";
			for ( var j = 0; j < r.lstIpdbillPatients.length; j++) {
				
				var arrValue = r.lstIpdbillPatients[j].patient_id +"-"+r.lstIpdbillPatients[j].patient_name +"-"+r.lstIpdbillPatients[j].mobile;
				var idValue = r.lstIpdbillPatients[j].patient_id;
				var patName = r.lstIpdbillPatients[j].patient_name;
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		var wardType = $('#wardTypeHall').val();
		var wardName = $('#wardName').val();
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		getPatientInfoByPatientId11(patId);
			
	}
}


function getPatientInfoByPatientId11(patientId){
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	var inputs = [];	
	 inputs.push('unit_id=' + 1);
     inputs.push('findText=' + patientId);
     inputs.push('callFrom=' + 1);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdBillComparison/ipdBillComparison",
		cache : false,		
		success : function(r) {
			setIpdbillPatientsTempForComparison(r);
			
		//	setIpdbillPatientsTemp2(r);
		}
	});
	
}



/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 09-June-2017
 * @codeFor : View Ipd bill of ipd patients
 ******************************************************************************/
function viewBillForIPDForComparison(treatId,finalbill) {
	var pageFrom =  $('#pageFrom').val();
	//alert(pageFrom);
	
//alert(finalbill);
	window.location.href = "bill_comparison_servicewise_ipd.jsp?" + "treatmentId="
			+ encodeURIComponent(treatId)+ "&finalbillIs=" + encodeURIComponent(finalbill)
			+ "&pageFrom=" + encodeURIComponent(pageFrom);
}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 6_June_2017
 * @Code Getting Bill Data By Service
 ******************************************************************************/
function getPatientBillAmountIpdForComparison(r, callFrom) {
	 //alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : r
		},
		url : "ehat/ipdbill/getIpdPatientServiceBillForComparison",
		success : function(r) {
			
			
			setBillDetailsTemp(r, callFrom);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
	
}

var totAmt=0;
function setBillDetailsTemp(r, callFrom) {

	 
	var setBill = "";
	var totAmt = 0;

	var totqyt = 0;
	var treatmentId = $('#treatmentId').text();
	var add=0;
	for ( var i = 0; i < r.listSubServiceIpdDto.length; i++) {
//var a=Number(i)+Number(1);
		if (r.listSubServiceIpdDto[i].serviceId != 5) {
			add++;
			var charges=(r.listSubServiceIpdDto[i].rate).toFixed(2);
			setBill = setBill

					+ '<tr id="quotation'+add+'">'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
					+ add
					+ '" name="opdBillCheckboxReggg" value="'
					+ r.listSubServiceIpdDto[i].subServiceId
					+ '">'
					+ '</td>'
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="'+ r.listSubServiceIpdDto[i].subServiceId
					+ '" name="IpdBillCheckboxRegQty" value="'
					+  r.listSubServiceIpdDto[i].quantity
					+ '">'
					+ '</td>'
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ add
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listSubServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ r.listSubServiceIpdDto[i].subServiceId + '"> </td>'
					+ '<td id="sarvName'+add+'">';
		/*	if (r.listSubServiceIpdDto[i].serviceId == 3) {
				setBill = setBill	+ r.listSubServiceIpdDto[i].bedHall ;
			}else{
				setBill = setBill	+ r.listSubServiceIpdDto[i].categoryName ;
			}*/
			/*if (r.listSubServiceIpdDto[i].serviceId == 4) {
				setBill = setBill + r.listSubServiceIpdDto[i].otProcedure ;PharmaName
			}
			else*/ /*if(r.listSubServiceIpdDto[i].serviceId == 5){
				setBill = setBill + r.listSubServiceIpdDto[i].docName ;
			}else */if (r.listSubServiceIpdDto[i].serviceId == 14) {

				setBill = setBill + r.listSubServiceIpdDto[i].inventoryName ;
			} else if (r.listSubServiceIpdDto[i].serviceId == 16) {

				setBill = setBill + r.listSubServiceIpdDto[i].pharmaName ;
			}else  {

				setBill = setBill +  r.listSubServiceIpdDto[i].categoryName ;
			}
			setBill = setBill
					+ '</td>'
					+ '<td align="Center" id="ratee'+add+'">'+charges+'</td>'
					+ '<td align="Center" id="qtyy'+add+'">'+r.listSubServiceIpdDto[i].quantity+'</td>' 
					+ '<td align="right" id="amtt'+add+'">'
					+ (r.listSubServiceIpdDto[i].amount).toFixed(2) + '</td>'
					
					+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ add + ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>' 
					+ '</tr>';
			
			totqyt = totqyt + r.listSubServiceIpdDto[i].quantity;
			totAmt = totAmt + r.listSubServiceIpdDto[i].amount;
	}
		}

		$("#cghsBill").html("");
	
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		//$("#totalAmt").text((totAmt).toFixed(2));
		
		$("#billDetails").html(setBill);
		//getIpdComparisonPatients();
		//sortTableOne();
		getBedDetails(treatmentId, 3);
}



function getBedDetails(t, s) {
	// alert("hiiii");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/ipdbill/getPatientBedBill",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getBedDetailsTemp(r, s);
			// setBillDetailsTemp(r);
		}
	});
}


function getBedDetailsTemp(r, s) {

	 
	var setBill = "";
	var totAmt = 0;
	var sername="";
	var totqyt = 0;
	var treatmentId = $('#treatmentId').text();
	var add=0;
	for ( var i = 0; i < r.listBedIpdDto.length; i++) {
//var a=Number(i)+Number(1);
		if (r.listBedIpdDto[i].serviceId == 3) {
			add++;
			var charges=(r.listBedIpdDto[i].rate).toFixed(2);
			setBill = setBill

					+ '<tr id="quotation'+add+'">'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
					+ add
					+ '" name="opdBillCheckboxReggg" value="'
					+ r.listBedIpdDto[i].subServiceId
					+ '">'
					+ '</td>'
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="'+ r.listBedIpdDto[i].subServiceId
					+ '" name="IpdBillCheckboxRegQty" value="'
					+  r.listBedIpdDto[i].quantity
					+ '">'
					+ '</td>'
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ add
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listBedIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ r.listBedIpdDto[i].subServiceId + '"> </td>'
					+ '<td id="sarvName'+add+'">';
			if (r.listBedIpdDto[i].serviceId == 3) {
				
				if(r.listBedIpdDto[i].subServiceId==0){
					setBill = setBill	+ "Nursing ("+sername+" )" ;
					
				}else{
					setBill = setBill	+ r.listBedIpdDto[i].bedHall ;
					 sername=r.listBedIpdDto[i].bedHall;
				}
				
			}else{
				setBill = setBill	+ r.listBedIpdDto[i].categoryName ;
			}
		
			setBill = setBill
					+ '</td>'
					+ '<td align="Center" id="ratee'+add+'">'+charges+'</td>'
					+ '<td align="Center" id="qtyy'+add+'">'+r.listBedIpdDto[i].quantity+'</td>' 
					+ '<td align="right" id="amtt'+add+'">'
					+ (r.listBedIpdDto[i].amount).toFixed(2) + '</td>'
					
					+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ add + ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>' 
					+ '</tr>';
			
			totqyt = totqyt + r.listBedIpdDto[i].quantity;
			totAmt = totAmt + r.listBedIpdDto[i].amount;
	}
		}

		$("#cghsBill").html("");
	var qtyTot=$("#totalQty").text();
	var a=Number(qtyTot) + Number(totqyt);
	
	var amtTot=$("#totalAmt").text();
	var b=Number(amtTot) + Number(totAmt);
		$("#totalQty").text(a);
		$("#totalAmt").text((b).toFixed(2));
		//$("#totalAmt").text((totAmt).toFixed(2));
		
		$("#billDetails").append(setBill);
		
}



/************
 *@author	: Kishor Lokhande
 *@date		:  18-June-2017
 *@code		:get Ipd Comparison Patients
 ***********/
function getIpdComparisonPatients(){
	$('#billDetailsComparision').empty();
	var treatmentId = $('#treatmentId').text();
	
	//getPatientBillAmountIpdForComparison(treatmentId,'general');
	//var number = parseFloat($("#number").val());
	//For Service Id
/*	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	*/
	//For Charges Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
		
	//For Hall Wise Id  
	//var HallId =0;
	var HallId = $("#lisH0").val();// chargesId
	var HallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	HallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
		
	//For Is combination service id
	//var isComServId =0;
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	/*---------------------------------------*/

	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}
	if (HallId == "" || HallId == null || HallId == undefined) {
		HallId = 0;
	}
	if (chargesId == "" || chargesId == null || chargesId == undefined
			|| isNaN(chargesId)) {
		chargesId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	/*---------------------------------------*/
/*	alert(chargesId);
	alert(chargesSlaveId);
	alert(isComServId);
	alert(isComServlastId);
	alert(HallId);
	alert(HallSlaveId);*/
	var servId =[];
	var subServId =[];
	var tretId=$('#treatmentId').text();
	//var chargesSponId=1;
	//var chargesSlaveId=20;
	//alert(tretId);
	
	$('input[name=opdBillCheckboxReg]:checked').each( function () {
	       
		servId.push(parseInt($(this).val()));
		//alert(servId);
	});
	
	$('input[name=opdBillCheckboxReggg]:checked').each( function () {
	       
		subServId.push(parseInt($(this).val()));
		//alert(subServId);
	});	
	
	var inputs = [];	
	inputs.push("tretId="+ encodeURIComponent(tretId));
	inputs.push("servId="+ encodeURIComponent(servId));
	inputs.push("subServId="+ encodeURIComponent(subServId));
	inputs.push("chargesSponId="+ encodeURIComponent(chargesId));
	inputs.push("chargesSlaveId="+ encodeURIComponent(chargesSlaveId));
	
	inputs.push("HallId="+ encodeURIComponent(HallId));
	inputs.push("HallSlaveId="+ encodeURIComponent(HallSlaveId));
	
	inputs.push("isComServId="+ encodeURIComponent(isComServId));
	inputs.push("isComServlastId="+ encodeURIComponent(isComServlastId));
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url : "ehat/ipdbill/getIpdComparisonPatients",
		data	: str + "&reqType=AJAX",
		cache 	: false,
	
		success : function(r) {
			setIpdComparisonPatientsTemp(r);
		}
	});
}


var totAmttt=0;
function setIpdComparisonPatientsTemp(r) {
	//alert("h");
	// alert(callFrom);
	var setBill = "";
	var totAmt = 0;

	var totqyt = 0;
	var treatmentId = $('#treatmentId').text();
	
	var subServNamee =[];
	$("#billDetails tr").each(function(){
		
		subServNamee.push($(this).find('td:eq(4)').text());
	});	
	
	var subservname="";
		
	for ( var i = 0; i < r.lstServiceConfigurations.length; i++) {
		
		/*if (r.lstServiceConfigurations[i].serviceId == 1) {*/
			var count=0;
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.lstServiceConfigurations[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReggg'
					+ r.lstServiceConfigurations[i].serviceId
					+ '" name="opdBillCheckboxReggg" value="'
					+ r.lstServiceConfigurations[i].subServiceId
					+ '">'
					+ '</td>'					
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ r.lstServiceConfigurations[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.lstServiceConfigurations[i].serviceId
					+ '">'
					+ '</td>'	
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'

					+ '<td>';
					
					
					
			var subServId =0;
			var qty =0;
			var rate =0;
			var ssi= r.lstServiceConfigurations[i].serviceId;
			var amt = (r.lstServiceConfigurations[i].charges).toFixed(2);
			var tAmt=0;
			//alert("Out");	
			
			$("#billDetails tr").each(function(){				
				count++;
				
				subServId=$(this).closest('tr').find('#chkOpdBillReggg'+count).val();
				 subSerName=$(this).find('td:eq(4)').text();
				 ratee=$(this).find('td:eq(5)').text();
				 qty=$(this).find('td:eq(6)').text();
				 aammtt=$(this).find('td:eq(7)').text();
		
				if(subServId == ssi){
					//alert("In");
					subservname=r.lstServiceConfigurations[i].categoryName;
				  if (r.lstServiceConfigurations[i].serviceId == 14) {

				setBill = setBill + r.lstServiceConfigurations[i].categoryName ;
			} else {

				setBill = setBill +  r.lstServiceConfigurations[i].categoryName ;
			}
			setBill = setBill		
			
				+  '</td>';
				
					tAmt=Number(qty)*Number(amt);
					setBill = setBill	+ '<td align="Center">'+amt+'</td>';
					setBill = setBill	+ '<td align="Center">'+qty+'</td>';
					setBill = setBill	+ '<td align="right">'+tAmt+'</td>';
					+ '</td>';
					setBill = setBill	+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTTwo('+ count	+ ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
					+ '</tr>';
			totqyt = Number(totqyt) + Number(qty);
			totAmt = totAmt + tAmt;
			//alert("hi");
			subServNamee = subServNamee.filter(function(item) { 
			    return item !== subservname;
			});
			
			return false;
				}				
			});
			
	}	

	var htm = "<tr>";

	//alert(subServNamee);
	for ( var i = 0; i < subServNamee.length; i++) {

		$("#billDetails tr").each(function() {

			var subSerNameeee = $(this).find('td:eq(4)').text();
			

			if (subServNamee[i] == subSerNameeee) {
				var row = $(this).html();
				htm = htm + row + "</tr>";
				
			}
		});
	}
		
	$("#billDetailsComparision").append(setBill);
	$("#billDetailsComparision").append(htm);
	
	var finalQty=0;
	var finalAmt=0;
	 
	
	$("#billDetailsComparision tr").each(function() {

		 var Qty = $(this).find('td:eq(6)').text();
		 var Amt = $(this).find('td:eq(7)').text();
		 finalQty=Number(finalQty) + Number(Qty);
		 finalAmt=Number(finalAmt) + Number(Amt);

	});
	
	$("#totalQtyComparison").text(finalQty);
	$("#totalAmtComparison").text((finalAmt).toFixed(2));
	
	var treatmentId = $('#treatmentId').text();
	
	//getPatientBillAmountIpdForComparison(treatmentId,'general');
	//sortTableTwo();
	disableDeleteButtonT2();
	
}

function sortTableOne() {
	  var table, rows, switching, i, x, y, shouldSwitch;
	  table = document.getElementById("tableOne");
	  switching = true;
	  /*Make a loop that will continue until
	  no switching has been done:*/
	  while (switching) {
	    //start by saying: no switching is done:
	    switching = false;
	    rows = table.getElementsByTagName("TR");
	    /*Loop through all table rows (except the
	    first, which contains table headers):*/
	    for (i = 1; i < (rows.length - 1); i++) {
	      //start by saying there should be no switching:
	      shouldSwitch = false;
	      /*Get the two elements you want to compare,
	      one from current row and one from the next:*/
	      x = rows[i].getElementsByTagName("TD")[4];
	      y = rows[i + 1].getElementsByTagName("TD")[4];
	      //check if the two rows should switch place:
	      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	        //if so, mark as a switch and break the loop:
	        shouldSwitch= true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /*If a switch has been marked, make the switch
	      and mark that a switch has been done:*/
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      
	    }
	  }
	  
	}


function sortTableTwo() {
	
	  var table, rows, switching, i, x, y, shouldSwitch;
	  table = document.getElementById("tableTwo");
	  switching = true;
	  /*Make a loop that will continue until
	  no switching has been done:*/
	  while (switching) {
	    //start by saying: no switching is done:
	    switching = false;
	    rows = table.getElementsByTagName("TR");
	    /*Loop through all table rows (except the
	    first, which contains table headers):*/
	    for (i = 1; i < (rows.length - 1); i++) {
	      //start by saying there should be no switching:
	      shouldSwitch = false;
	      /*Get the two elements you want to compare,
	      one from current row and one from the next:*/
	      x = rows[i].getElementsByTagName("TD")[4];
	      y = rows[i + 1].getElementsByTagName("TD")[4];
	      //check if the two rows should switch place:
	      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	        //if so, mark as a switch and break the loop:
	        shouldSwitch= true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /*If a switch has been marked, make the switch
	      and mark that a switch has been done:*/
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      
	    }
	  }
	  setTimeout(function(){ sortTableOne(); }, 3000);
	  
	}


function addBillQuotations()
{

	var a = $('#editHidden').val();
	//alert(a + "   hurrey");

		var perticular = $('#perticular').val();
		var servId = $('#servId').val();
		//alert(servId);
		var rate = $('#rate').val();
		var qty = $('#qty').val();
		var amount = $('#amount').val();
		var subserviceid = parseInt($('#subserviceid').val());
	//alert(subserviceid);
		var subservidarr=[];
		$('input[name=opdBillCheckboxReggg]:checked').each( function () {			
			subservidarr.push(parseInt($(this).val()));
		});
		
		
		var a = subservidarr.indexOf(subserviceid);
		//alert(a);
		 if(a >=0){
	            
		   alert("Service Already in List");
		   crearAllFields();
		   return false;
		} else {
			
		
		//var amt = (Number(rate) * Number(qty)).toFixed(2);

		if (perticular == "" || perticular == null) {
			alert("Please enter servicename ");
			return false;
		}

		if (rateManual <= 0) {
			alert("Please Enter Amount");
			return false;
		}

		var counterIpdCghs = $('#counterIpdCghs').val();
		var index = $("#billDetails tr").length;
		//alert(index);
		index = index + 1;
		
			$('#counterIpdCghs').val(1);
			tAmt = tAmt + amountManual;
			
				var masterModuleBody = '<tr id="quotation'+index+'">';

				masterModuleBody = masterModuleBody
						+ '<td class="only-checkbox" >'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
						+ index
						+ '" name="opdBillCheckboxReggg" value="'						
						+subserviceid
						+ '">'
						+ '</td>'					
						
						+ '<td class="only-checkbox" style="display:none">'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
						+ index
						+ '" name="opdBillCheckboxReg" value="'
						+ servId
						+ '">'
						+ '</td>'	
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'

						
						
						
						+'<td contenteditable="true" id="sarvName'
						+ index
						+ '">'
						+ perticular
						+ '</td>'
						
						+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="ratee'
						+ index
						+ '">'
						+ rate
						+ '</td>'
						
						+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="qtyy'
						+ index
						+ '">'
						+ qty
						+ '</td> <td align="right" id="amtt'
						+ index
						+ '">'
						+ amount
						+ '</td>'
						+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ index	+ ')"'  
						+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>' 
						+'</tr>';
				
					
						
				
				$("#billDetails").append(masterModuleBody);
				
		}
		 crearAllFields();
		 setTableOneTotalAmount();
	}


function saveQuotations(callfrom)
{
	
	//Added By Kishor For narration of Bill at the time of edit
	var narrationBill =$("#narrationRunTime").val();
	
	if (narrationBill == "narrationRunTime") {
		setnarationpopupBill();
		return false;
	}
	
	var narrationidBill =$('#narrationRunTime').val();
	if (narrationidBill != "" || narrationidBill != null || narrationidBill != undefined) {
		closePopupnarrationBill();
	}	
	
	if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		narrationidBill="-";
	}
	
	
	var billquotations = "";
	
if(callfrom=="runtime"){
	
var quotationName =$("#quotationName").val();
	
	if (quotationName == "" || quotationName == null || quotationName == undefined) {
		quotationName="-";
		alert("Enter quotation Name ");
		return false;
	}
	
	var queryType = $('#queryType').val();		
	
	var patientId     = 0;
	var treatmentId    = 0;
	var departmentId   = 0;		
	var billId         = 0;	
	var unitId = 0;
	
	var tableR = $('#billDetailsRT tr').length;
	//alert(tableR);
	
		
	 billquotations = {
			listBillquotations : []
	};
	
	for(var i=1;i <= tableR;i++){
		var Service = $("#sarvName"+i).text();
		var servId = $("#chkOpdBillReg"+i).val();
		var subServId = $("#chkOpdBillReggg"+i).val();
		//var date = $("#dateR"+i).text();
		var rate = $("#ratee"+i).text();
		var qty = $("#qtyy"+i).text();
		var amount = $("#amtttt"+i).text();
		
		billquotations.listBillquotations.push({
			queryType 		: queryType,
			patientId 		: patientId,
			treatmentId 	: treatmentId,
			departmentId 	: departmentId,
			billId			: billId,
			unitId			: unitId,
			subServiceName 	: Service,
			//serviceName 	: Service,
			serviceId		: servId,
			subServiceId	: subServId,
			//date 			: date,
			rate 			: rate,
			quantity 		: qty,
			amount 			: amount,
			quotationName   : quotationName,
			
			//coPay 			: coPay,
			//cghsFlag 		: cghsFlagg
			
			});
	}
	
	
}else{
			
	var queryType = $('#queryType').val();		
			
	var patientId     = $("#pId").val();
	var treatmentId    = $("#tId").val();
	var departmentId   = $("#depdocdeskid").val();		
	var billId         = parseInt($("#billNo").html());	
	var unitId = $("#uId").val();
	
	var tableR = $('#billDetails tr').length;
	//alert(tableR);
	
		
	 billquotations = {
			listBillquotations : []
	};
	
	for(var i=1;i <= tableR;i++){
		var Service = $("#sarvName"+i).text();
		var servId = $("#chkOpdBillReg"+i).val();
		var subServId = $("#chkOpdBillReggg"+i).val();
		//var date = $("#dateR"+i).text();
		var rate = $("#ratee"+i).text();
		var qty = $("#qtyy"+i).text();
		var amount = $("#amtt"+i).text();
		//alert(rate);
		billquotations.listBillquotations.push({
			queryType 		: queryType,
			patientId 		: patientId,
			treatmentId 	: treatmentId,
			departmentId 	: departmentId,
			billId			: billId,
			unitId			: unitId,
			subServiceName 	: Service,
			//serviceName 	: Service,
			serviceId		: servId,
			subServiceId	: subServId,
			//date 			: date,
			rate 			: rate,
			quantity 			: qty,
			amount 			: amount,
			quotationName   : quotationName,
			
			//coPay 			: coPay,
			//cghsFlag 		: cghsFlagg
			
			});
	}
}
	billquotations = JSON.stringify(billquotations);
	

	if(billquotations == null || billquotations == undefined){
		alert("Fill Records!!!");
		return false;
	}
	
	var inputs = [];
	
	inputs.push('treatmentId=' + treatmentId);	
	inputs.push('departmentId=' + departmentId);	
	inputs.push("billquotations="+ encodeURIComponent(billquotations));
	inputs.push("queryType=" + queryType);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/saveQuotations",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r);
			if(r==1){
				alertify.success("Saved succesfully");
			}else if(r==2){
				alertify.success("Update succesfully");
			}else{
				alertify.error("error");
			}
			//proFeesDoctorPayment();
			//getIpdServiceDetailsForCghs(treatmentId, departmentId);
		}
	});
	$("#narrationRunTime").val("narrationRunTime");
	//$("#quotationName").val("");
	setQuotationNameRunTime();
}


function setnarationpopupBill(){
	
	$("#modal-25").addClass("md-show");
}

function closePopupnarrationBill(){
	$("#modal-25").removeClass("md-show");
}

function setNarrationBill(){

	//var receiptEditSponsor  = $("#receiptEditSponsor").val(); 	
	var narrationidBill =$('#narrationRunTime').val();
	
    if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		$("#narrationRunTime").focus();		
		return false;
	}
    
    $("#narrationRunTime").val('notnarrationRunTime');
    
	var quotationName =$("#quotationName").val();
	
	if (quotationName == "" || quotationName == null || quotationName == undefined) {
		quotationName="-";
		alert("Enter quotation Name ");
		//$("#narrationRunTime").val('narrationRunTime');
		return false;
	}
    saveQuotations('runtime');
	
	
}




function getBillQuotationsDetails(t) {
 var d=0;
	var patientId     = $("#pId").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : patientId,
			"call2" : d
		},
		url : "ehat/ipdbill/getBillQuotationsDetails",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getBillQuotationsDetailstemp(r, d);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
		}
	});
}


function getBillQuotationsDetailstemp(t, d) {

	
	var index=0;
	var masterModuleBody = "";

	for ( var i = 0; i < t.listBillquotations.length; i++) {
		
		var datetime12 = new Date(t.listBillquotations[i].createdDateTime)
				.toLocaleDateString('en-GB');
		var servId = t.listBillquotations[i].serviceId;
		var subserviceid = t.listBillquotations[i].subServiceId;
		//var perticular = t.listBillquotations[i].serviceName;
		var perticular = t.listBillquotations[i].subServiceName;
		var rate = t.listBillquotations[i].rate;
		var qty = t.listBillquotations[i].quantity;
		var qtyCount = t.listBillquotations[i].qtyCount;
		var amount = t.listBillquotations[i].amount;
		var totalAmountt=Number(rate) * Number(qtyCount);
		//var totalAmountt=amount;
		index ++;
		//var masterModuleBody = '<tr>';

			masterModuleBody = masterModuleBody
					+ '<tr id="quotation'+ index+ '">'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
					+ index
					+ '" name="opdBillCheckboxReggg" value="'						
					+subserviceid
					+ '">'
					+ '</td>'					
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ index
					+ '" name="opdBillCheckboxReg" value="'
					+ servId
					+ '">'
					+ '</td>'	
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'

					
					+'<td contenteditable="true" id="sarvName'
					+ index
					+ '">'
					+ perticular
					+ '</td>'
					
					+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="ratee'
					+ index
					+ '">'
					+ rate
					+ '</td>'
					
					+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="qtyy'
					+ index
					+ '">'
					+ qtyCount
					+ '</td> <td align="right" id="amtt'
					+ index
					+ '">'
					+ totalAmountt
					+ '</td>' 
					+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ index	+ ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>'
					+'</tr>';
			
			
				
	}
	$("#billDetails").html(masterModuleBody);
	
	//$("#cghsBillManual").html(setService);
	
	setTableOneTotalAmount();

}



function getBillQuotationsCompareToBill(t) {
	 var d=0;
		var patientId     = $("#pId").val();
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"callform2" : patientId,
				"call2" : d
			},
			url : "ehat/ipdbill/getBillQuotationsDetails",
			success : function(r) {
				// setTempPatientRecords(r);
				// alert(t);
				getBillCompToQuatDetailsTemp(r, d);
				// setBillDetailsTemp(r);
			},
			error : function(r) {
				alert('Network Issue!!!');
			}
		});
	}


	function getBillCompToQuatDetailsTemp(t, d) {

		
		var index=0;
		var masterModuleBody = "";

		for ( var i = 0; i < t.listBillquotations.length; i++) {
			
			var datetime12 = new Date(t.listBillquotations[i].createdDateTime)
					.toLocaleDateString('en-GB');
			var servId = t.listBillquotations[i].serviceId;
			var subserviceid = t.listBillquotations[i].subServiceId;
		//	var perticular = t.listBillquotations[i].serviceName;
			var perticular = t.listBillquotations[i].subServiceName;
			var rate = t.listBillquotations[i].rate;
			var qty = t.listBillquotations[i].quantity;
			var qtyCount = t.listBillquotations[i].qtyCount;
			var amount = t.listBillquotations[i].amount;
			var totalAmountt=Number(rate) * Number(qtyCount);
			index ++;
			//var masterModuleBody = '<tr>';

				masterModuleBody = masterModuleBody
						+ '<tr id="quotation'+ index+ '">'
						+ '<td class="only-checkbox" >'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
						+ index
						+ '" name="opdBillCheckboxReggg" value="'						
						+subserviceid
						+ '">'
						+ '</td>'					
						
						+ '<td class="only-checkbox" style="display:none">'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
						+ index
						+ '" name="opdBillCheckboxReg" value="'
						+ servId
						+ '">'
						+ '</td>'	
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'

						
						+'<td id="sarvName'
						+ index
						+ '">'
						+ perticular
						+ '</td>'
						
						+'<td align="Center" id="ratee'
						+ index
						+ '">'
						+ rate
						+ '</td>'
						
						+'<td align="Center" id="qtyy'
						+ index
						+ '">'
						+ qtyCount
						+ '</td> <td align="right" id="amtt'
						+ index
						+ '">'
						+ totalAmountt
						+ '</td>' 
						+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ index	+ ')"'  
						+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>'
						+'</tr>';
				
				
					
		}
		
		$("#billDetailsComparision").html(masterModuleBody);
		
		//$("#cghsBillManual").html(setService);
		
		var finalQty=0;
		var finalAmt=0;
		 
		
		$("#billDetailsComparision tr").each(function() {

			 var Qty = $(this).find('td:eq(6)').text();
			 var Amt = $(this).find('td:eq(7)').text();
			 finalQty=Number(finalQty) + Number(Qty);
			 finalAmt=Number(finalAmt) + Number(Amt);

		});
		
		$("#totalQtyComparison").text(finalQty);
		$("#totalAmtComparison").text((finalAmt).toFixed(2));

	}



function setTableOneTotalAmount()
{
	var finalTableOneQty=0;
	var finalTableOneAmt=0;	 
	
	$("#billDetailsRT tr").each(function() {

		 var Qty = $(this).find('td:eq(6)').text();
		 var Amt = $(this).find('td:eq(7)').text();
		 finalTableOneQty=Number(finalTableOneQty) + Number(Qty);
		 finalTableOneAmt=Number(finalTableOneAmt) + Number(Amt);

	});
	
	$("#totalQty").text(finalTableOneQty);
	$("#totalAmt").text((finalTableOneAmt).toFixed(2));
	
	$("#billDetails tr").each(function() {

		 var Qty = $(this).find('td:eq(6)').text();
		 var Amt = $(this).find('td:eq(7)').text();
		 finalTableOneQty=Number(finalTableOneQty) + Number(Qty);
		 finalTableOneAmt=Number(finalTableOneAmt) + Number(Amt);

	});
	
	$("#totalQtyN").text(finalTableOneQty);
	$("#totalAmtN").text((finalTableOneAmt).toFixed(2));
	
	
	var finalTableOneQtyRT=0;
	var finalTableOneAmtRT=0;
	
	$("#billDetailsRT tr").each(function() {

		 var Qty = $(this).find('td:eq(5)').text();
		 var Amt = $(this).find('td:eq(6)').text();
		 finalTableOneQtyRT=Number(finalTableOneQtyRT) + Number(Qty);
		 finalTableOneAmtRT=Number(finalTableOneAmtRT) + Number(Amt);

	});
	
	$("#totalAmtRunT").text((finalTableOneQtyRT).toFixed(2));
	$("#totalQtyRunT").text(finalTableOneAmtRT);	
	
}

function setTableTwoTotalAmount()
{
	var finalQty=0;
	var finalAmt=0;
$("#billDetailsComparision tr").each(function() {

	 var Qty = $(this).find('td:eq(6)').text();
	 var Amt = $(this).find('td:eq(7)').text();
	 finalQty=Number(finalQty) + Number(Qty);
	 finalAmt=Number(finalAmt) + Number(Amt);

});

$("#totalQtyComparison").text(finalQty);
$("#totalAmtComparison").text((finalAmt).toFixed(2));
}


/*******************************************************************************
 * @author : kishor lokhande
 * @date : 20-Nov-2017
 * @code :autosuggestion
 ******************************************************************************/
function setallservautocompleteOnBillingForQuotation(inputID) {
	var listofunit = [];
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = $('#servId').val();
	//var treatId=$("#treatId").val();
	
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + 2);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	//inputs.push('treatId=' + treatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",

		success : function(r) {
			/*
			 * alert(r.lstSubService[0].categoryName);
			 */
			autoCompDoctorDeskOnBillingForQuotation(r, inputID);

		}
	});
}


/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 18-May-2017
 * @code :autosuggestion services
 ******************************************************************************/
function autoCompDoctorDeskOnBillingForQuotation(response, id) {

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
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						} 
						 ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							//console.log(ui);
							var categoryid= ui.item.categoryid;
							
							$('#categoryidsipd').val(categoryid);
							getchargesipd();
							
							$('#perticular').val(ui.item.categoryName);
							
							/*
							 * $("#subservicesname").val(ui.item.categoryName);
							 */$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);
							
							var rategeneralhall =$("#rategeneral").val();
							if (rategeneralhall > 0) {
								$("#rate").val(rategeneralhall);
							} else {
								$("#rate").val(ui.item.categorycharges);
							}
							
							
							//$("#concession").val(ui.item.concession);
							//$("#amount").val(ui.item.amount);
							$("#servId").val(ui.item.serviceid);
							$("#iscombinationIpd").val(ui.item.iscombination);
							calculatePerticularTotal1();
							
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
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
															// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}



function addBillQuotationsRunTime()
{
//alert("hi");
	var a = $('#editHidden').val();
	//alert(a + "   hurrey");

		var perticular = $('#perticular').val();
		var servId = $('#servId').val();
		//alert(servId);
		var rate = $('#rate').val();
		var qty = $('#qty').val();
		var amount = $('#amount').val();
		var subserviceid = parseInt($('#subserviceid').val());
	//alert(subserviceid);
		
		var subservidarrrr=[];
		$('input[name=opdBillCheckboxReggg]:checked').each( function () {			
			subservidarrrr.push(parseInt($(this).val()));
		});
		
		//alert(subservidarrrr);
		var a = subservidarrrr.indexOf(subserviceid);
		//alert(a);
		 if(a >=0){
	            
		   alert("Service Already in List");
		   crearAllFields();
		   return false;
		} else {
			
		
		//var amt = (Number(rate) * Number(qty)).toFixed(2);

		if (perticular == "" || perticular == null) {
			alert("Please enter servicename ");
			return false;
		}

		if (rateManual <= 0) {
			alert("Please Enter Amount");
			return false;
		}

		var counterIpdCghs = $('#counterIpdCghs').val();
		var index = $("#billDetailsRT tr").length;
		//alert(index);
		index = index + 1;
		
			$('#counterIpdCghs').val(1);
			tAmt = tAmt + amountManual;
			
				var masterModuleBody = "";

				masterModuleBody = masterModuleBody
						+ '<tr id="quotationRT'+index+'">'
						+ '<td class="only-checkbox" >'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
						+ index
						+ '" name="opdBillCheckboxReggg" value="'						
						+subserviceid
						+ '">'
						+ '</td>'					
						
						+ '<td class="only-checkbox" style="display:none">'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
						+ index
						+ '" name="opdBillCheckboxReg" value="'
						+ servId
						+ '">'
						+ '</td>'	
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'
						
						+'<td contenteditable="true" id="sarvName'
						+ index
						+ '">'
						+ perticular
						+ '</td>'
						
						+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="ratee'
						+ index
						+ '">'
						+ rate
						+ '</td>'
						
						+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="qtyy'
						+ index
						+ '">'
						+ qty
						+ '</td> <td align="right" id="amtttt'
						+ index
						+ '">'
						+ amount
						+ '</td>'
						+'<td align="Center"><i aria-hidden="true" onclick="deleteQuotationRunTime('+ index	+ ')"'  
						+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>' 
						+'</tr>';
				
					
						
				
				$("#billDetailsRT").append(masterModuleBody);
				
		}
		 crearAllFields();
		 setTotalAmtRT();
	}


function deleteQuotationRunTime(id){
	//$("#quotationRT" + id).remove();
	//setTotalAmtRT();
	
	
	var len = $("#billDetailsRT tr").length;
	var htm ="";
	$("#tkbR").empty();
	for(var i =1; i<=len;i++){
		var servId = $("#chkOpdBillReg"+i).val();
		var perticular= $("#sarvName"+i).text();
		//alert(servId);
		var rate = $("#ratee"+i).text();
		var qty = $("#qtyy"+i).text();
		var amount = $("#amtttt"+i).text();
		var subserviceid = parseInt($("#chkOpdBillReggg"+i).val());
		
		if(i!=id){
			var index = $("#tkbR tr").length;
			index++;
			$("#tkbR").append(
					 '<tr id="quotationRT'+index+'">'
					
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
					+ index
					+ '" name="opdBillCheckboxReggg" value="'						
					+subserviceid
					+ '">'
					+ '</td>'					
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ index
					+ '" name="opdBillCheckboxReg" value="'
					+ servId
					+ '">'
					+ '</td>'	
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'

					
					+'<td id="sarvName'+ index + '">'
					+ perticular
					+ '</td>'
					
					+'<td align="Center" id="ratee'
					+ index + '">'
					+ rate
					+ '</td>'
					
					+'<td align="Center" id="qtyy'
					+ index + '">'
					+ qty
					+ '</td>'
					
					+'<td align="right" id="amtt'
					+ index	+ '">'
					+ amount
					+ '</td>'
					
					+'<td align="Center"><i aria-hidden="true" onclick="deleteQuotationRunTime('+ index	+ ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
					);
			//$("#tkb").append(htm2);

		}
		
	}
	

	$("#quotationRT" + id).remove();
	var set1 = $("#tkbR").html();
	
	$("#billDetailsRT").empty();
	$("#billDetailsRT").html(set1);

	crearAllFields();
	setTotalAmtRT();
}

function setTotalAmtRT()
{
	var finalTableOneQtyRT=0;
	var finalTableOneAmtRT=0;
	
	$("#billDetailsRT tr").each(function() {

		 var Qty = $(this).find('td:eq(5)').text();
		 var Amt = $(this).find('td:eq(6)').text();
		 finalTableOneQtyRT=Number(finalTableOneQtyRT) + Number(Qty);
		 finalTableOneAmtRT=Number(finalTableOneAmtRT) + Number(Amt);

	});
	
	$("#totalAmtRunT").text((finalTableOneQtyRT).toFixed(2));
	$("#totalQtyRunT").text(finalTableOneAmtRT);	
}

//This function use for reset table
function clearTable()
{
	$("#billDetails").empty();
	$("#billDetailsComparision").empty();
	$("#billDetailsRT").empty();
}

// This function use for delete comparison and quotation service
function deleteCompTOne(id)
{
	//$("#quotationRT" + id).remove();
	//setTotalAmtRT();
	
	
	var len = $("#billDetails tr").length;
	var htm ="";
	$("#tkbR").empty();
	for(var i =1; i<=len;i++){
		var servId = $("#chkOpdBillReg"+i).val();
		var perticular= $("#sarvName"+i).text();
		//alert(servId);
		var rate = $("#ratee"+i).text();
		var qty = $("#qtyy"+i).text();
		var amount = $("#amtt"+i).text();
		var subserviceid = parseInt($("#chkOpdBillReggg"+i).val());
		
		if(i!=id){
			var index = $("#tkbR tr").length;
			index++;
			$("#tkbR").append(
					 '<tr id="quotation'+index+'">'
					
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
					+ index
					+ '" name="opdBillCheckboxReggg" value="'						
					+subserviceid
					+ '">'
					+ '</td>'					
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ index
					+ '" name="opdBillCheckboxReg" value="'
					+ servId
					+ '">'
					+ '</td>'	
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'

					
					+'<td contenteditable="true" id="sarvName'+ index + '">'
					+ perticular
					+ '</td>'
					
					+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="ratee'
					+ index + '">'
					+ rate
					+ '</td>'
					
					+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="qtyy'
					+ index + '">'
					+ qty
					+ '</td>'
					
					+'<td align="right" id="amtt'
					+ index	+ '">'
					+ amount
					+ '</td>'
					
					+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ index	+ ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
					);
			//$("#tkb").append(htm2);

		}
		
	}
	

	$("#quotation" + id).remove();
	var set1 = $("#tkbR").html();
	
	$("#billDetails").empty();
	$("#billDetails").html(set1);

	crearAllFields();
	setTableOneTotalAmount();
	
	//getIpdComparisonPatients();
}

// this function use for hide delete button on Table 2
function disableDeleteButtonT2()
{
		$("#billDetailsComparision tr").each(function() {

			  $(this).find('td:eq(8)').hide();
			// var Amt = $(this).find('td:eq(6)').text();
		
		});
			
	
}




/************
 *@author	: Kishor Lokhande
 *@date		:  18-June-2017
 *@code		:get Ipd Comparison Patients
 ***********/
function getIpdComparisonPatientsRunTime(){
	$('#billDetailsComparision').empty();
	var treatmentId = $('#treatmentId').text();
	
	//getPatientBillAmountIpdForComparison(treatmentId,'general');
	//var number = parseFloat($("#number").val());
	//For Service Id
/*	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	*/
	//For Charges Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
		
	//For Hall Wise Id  
	//var HallId =0;
	var HallId = $("#lisH0").val();// chargesId
	var HallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	HallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
		
	//For Is combination service id
	//var isComServId =0;
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	/*---------------------------------------*/

	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}
	if (HallId == "" || HallId == null || HallId == undefined) {
		HallId = 0;
	}
	if (chargesId == "" || chargesId == null || chargesId == undefined
			|| isNaN(chargesId)) {
		chargesId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	/*---------------------------------------*/
/*	alert(chargesId);
	alert(chargesSlaveId);
	alert(isComServId);
	alert(isComServlastId);
	alert(HallId);
	alert(HallSlaveId);*/
	var servId =[];
	var subServId =[];
	//var tretId=$('#treatmentId').text();
	var tretId=0;
	//var chargesSponId=1;
	//var chargesSlaveId=20;
	//alert(tretId);
	
	$('input[name=opdBillCheckboxReg]:checked').each( function () {
	       
		servId.push(parseInt($(this).val()));
		//alert(servId);
	});
	
	$('input[name=opdBillCheckboxReggg]:checked').each( function () {
	       
		subServId.push(parseInt($(this).val()));
		//alert(subServId);
	});	
	
	var inputs = [];	
	inputs.push("tretId="+ encodeURIComponent(tretId));
	inputs.push("servId="+ encodeURIComponent(servId));
	inputs.push("subServId="+ encodeURIComponent(subServId));
	inputs.push("chargesSponId="+ encodeURIComponent(chargesId));
	inputs.push("chargesSlaveId="+ encodeURIComponent(chargesSlaveId));
	
	inputs.push("HallId="+ encodeURIComponent(HallId));
	inputs.push("HallSlaveId="+ encodeURIComponent(HallSlaveId));
	
	inputs.push("isComServId="+ encodeURIComponent(isComServId));
	inputs.push("isComServlastId="+ encodeURIComponent(isComServlastId));
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url : "ehat/ipdbill/getIpdComparisonPatients",
		data	: str + "&reqType=AJAX",
		cache 	: false,
	
		success : function(r) {
			setIpdComparisonPatientsTempRunTime(r);
		}
	});
}


//var totAmttt=0;
function setIpdComparisonPatientsTempRunTime(r) {
	//alert("h");
	// alert(callFrom);
	var setBill = "";
	var totAmt = 0;

	var totqyt = 0;
	var treatmentId = $('#treatmentId').text();
	
	var subServNamee =[];
	$("#billDetailsRT tr").each(function(){
		
		subServNamee.push($(this).find('td:eq(4)').text());
	});	
	
	var subservname="";
		
	for ( var i = 0; i < r.lstServiceConfigurations.length; i++) {
		
		/*if (r.lstServiceConfigurations[i].serviceId == 1) {*/
			var count=0;
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.lstServiceConfigurations[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReggg'
					+ r.lstServiceConfigurations[i].serviceId
					+ '" name="opdBillCheckboxReggg" value="'
					+ r.lstServiceConfigurations[i].subServiceId
					+ '">'
					+ '</td>'					
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ r.lstServiceConfigurations[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.lstServiceConfigurations[i].serviceId
					+ '">'
					+ '</td>'	
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'

					+ '<td>';
					
					
					
			var subServId =0;
			var qty =0;
			var rate =0;
			var ssi= r.lstServiceConfigurations[i].serviceId;
			var amt = (r.lstServiceConfigurations[i].charges).toFixed(2);
			var tAmt=0;
			//alert("Out");	
			
			$("#billDetailsRT tr").each(function(){				
				count++;
				
				subServId=$(this).closest('tr').find('#chkOpdBillReggg'+count).val();
				 subSerName=$(this).find('td:eq(4)').text();
				 ratee=$(this).find('td:eq(5)').text();
				 qty=$(this).find('td:eq(6)').text();
				 aammtt=$(this).find('td:eq(7)').text();
		
				if(subServId == ssi){
					//alert("In");
					subservname=r.lstServiceConfigurations[i].categoryName;
				  if (r.lstServiceConfigurations[i].serviceId == 14) {

				setBill = setBill + r.lstServiceConfigurations[i].categoryName ;
			} else {

				setBill = setBill +  r.lstServiceConfigurations[i].categoryName ;
			}
			setBill = setBill		
			
				+  '</td>';
				
					tAmt=Number(qty)*Number(amt);
					setBill = setBill	+ '<td align="Center">'+amt+'</td>';
					setBill = setBill	+ '<td align="Center">'+qty+'</td>';
					setBill = setBill	+ '<td align="right">'+tAmt+'</td>';
					+ '</td>';
					setBill = setBill	+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTTwo('+ count	+ ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
					+ '</tr>';
			totqyt = Number(totqyt) + Number(qty);
			totAmt = totAmt + tAmt;
			//alert("hi");
			subServNamee = subServNamee.filter(function(item) { 
			    return item !== subservname;
			});
			
			return false;
				}				
			});
			
	}	

	var htm = "<tr>";

	//alert(subServNamee);
	for ( var i = 0; i < subServNamee.length; i++) {

		$("#billDetailsRT tr").each(function() {

			var subSerNameeee = $(this).find('td:eq(4)').text();
			

			if (subServNamee[i] == subSerNameeee) {
				var row = $(this).html();
				htm = htm + row + "</tr>";
				
			}
		});
	}
		
	$("#billDetailsComparision").append(setBill);
	$("#billDetailsComparision").append(htm);
	
	var finalQty=0;
	var finalAmt=0;
	 
	
	$("#billDetailsComparision tr").each(function() {

		 var Qty = $(this).find('td:eq(6)').text();
		 var Amt = $(this).find('td:eq(7)').text();
		 finalQty=Number(finalQty) + Number(Qty);
		 finalAmt=Number(finalAmt) + Number(Amt);

	});
	
	$("#totalQtyComparison").text(finalQty);
	$("#totalAmtComparison").text((finalAmt).toFixed(2));
	
	//var treatmentId = $('#treatmentId').text();
	
	//getPatientBillAmountIpdForComparison(treatmentId,'general');
	//sortTableTwo();
	disableDeleteButtonT2();
	
}


function setQuotationNameRunTime(){
	var tId=0;
	 var dId=0;
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"callform2" : tId,
				"call2" : dId
			},
			url : "ehat/ipdbill/getBillQuotationsDetails",
			success : function(r) {
				// setTempPatientRecords(r);
				// alert(t);
				SetPartyNameOnloadTemp(r);
				// setBillDetailsTemp(r);
			},
			error : function(r) {
				alert('Network Issue!!!');
			}
		});
}
function SetPartyNameOnloadTemp(r){
	
	var c=0;
	var list = '<option value="'+c+'">Select Quotation Temp</option>';

	for ( var i = 0; i < r.listBillquotations.length; i++) {

		list = list + '<option value="' + (r.listBillquotations[i].count)
				+ '">' + (r.listBillquotations[i].quotationName) + '</option>';
	}
	// $("#e1").html(list);
	//alert(list);
	$("#qutName").html(list);

}


function getBillQuotationsDetailsRunT() {
	var count=$('#qutName').val();
	if(count == null || count == "" || isNaN(count)){
		count=0;
	}
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"callform2" : 0,
				"call2" : count
			},
			url : "ehat/ipdbill/getBillQuotationsDetailsRunT",
			success : function(r) {
				// setTempPatientRecords(r);
				// alert(t);
				getBillQuotationsDetailsRTtemp(r);
				// setBillDetailsTemp(r);
			},
			error : function(r) {
				alert('Network Issue!!!');
			}
		});
	}


	function getBillQuotationsDetailsRTtemp(t) {

		
		var index=0;
		var masterModuleBody = "";

		for ( var i = 0; i < t.listBillquotations.length; i++) {
			
			var datetime12 = new Date(t.listBillquotations[i].createdDateTime)
					.toLocaleDateString('en-GB');
			var servId = t.listBillquotations[i].serviceId;
			var subserviceid = t.listBillquotations[i].subServiceId;
			//var perticular = t.listBillquotations[i].serviceName;
			var perticular = t.listBillquotations[i].subServiceName;
			var rate = t.listBillquotations[i].rate;
			var qty = t.listBillquotations[i].quantity;
			var amount = t.listBillquotations[i].amount;
			
			index ++;
			//var masterModuleBody = '<tr>';

				masterModuleBody = masterModuleBody
						+ '<tr id="quotation'+ index+ '">'
						+ '<td class="only-checkbox" >'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
						+ index
						+ '" name="opdBillCheckboxReggg" value="'						
						+subserviceid
						+ '">'
						+ '</td>'					
						
						+ '<td class="only-checkbox" style="display:none">'
						+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
						+ index
						+ '" name="opdBillCheckboxReg" value="'
						+ servId
						+ '">'
						+ '</td>'	
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'
						
						+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
						+ '"> </td>'

						
						+'<td contenteditable="true" id="sarvName'
						+ index
						+ '">'
						+ perticular
						+ '</td>'
						
						+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="ratee'
						+ index
						+ '">'
						+ rate
						+ '</td>'
						
						+'<td contenteditable="true" align="Center" onkeyup="calculationRT('+ index + ')" onkeypress="return validatePrice(event)" id="qtyy'
						+ index
						+ '">'
						+ qty
						+ '</td> <td align="right" id="amtttt'
						+ index
						+ '">'
						+ amount
						+ '</td>' 
						+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ index	+ ')"'  
						+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>'
						+'</tr>';
				
				
					
		}
		$("#billDetailsRT").html(masterModuleBody);
		$("#billDetails").html(masterModuleBody);		
		//$("#cghsBillManual").html(setService);
		
		setTableOneTotalAmount();

	}
	
	
	
function PrintBillQutRunime(callfrom)
	{
		//alert(callfrom);
		var billquotations = "";
		
		
if(callfrom == "compare"){
	
	$("#comparePFlag").val('Y');
	
	//Added By Kishor For popup for print
	var narrationBill =$("#narrationPrint").val();
	
	if (narrationBill == "narrationPrint") {
		openPrintPopup();
		return false;
	}
	
	var narrationidBill =$('#narrationPrint').val();
	if (narrationidBill != "" || narrationidBill != null || narrationidBill != undefined) {
		closePrintPopup();
	}	
	
	if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		narrationidBill="-";
	}
	
	
	var patientNamePrint =$("#patientNamePrint").val();
	var doctorNamePrint = $('#doctorNamePrint').val();
	
	if (patientNamePrint == "" || patientNamePrint == null || patientNamePrint == undefined) {
		patientNamePrint="-";
		alert("Enter Patient Name ");
		return false;
	}
	
	var tableR = $('#billDetailsComparision tr').length;
	
	if(tableR == 0){
		alert("NO Data Availble");
		return false;
	}
	 billquotations = {
			listBillquotations : []
	};
	
	for(var i=1;i <= tableR;i++){
		var Service = $("#sarvName"+i).text();
		var servId = $("#chkOpdBillReg"+i).val();
		var subServId = $("#chkOpdBillReggg"+i).val();
		//var date = $("#dateR"+i).text();
		var rate = $("#ratee"+i).text();
		var qty = $("#qtyy"+i).text();
		var amount = $("#amtttt"+i).text();
		
		billquotations.listBillquotations.push({
		
			serviceName 	: Service,
			serviceId		: servId,
			subServiceId	: subServId,
			//date 			: date,
			rate 			: rate,
			quantity 			: qty,
			amount 			: amount,

			});
		
	}		
			
		}else{
			//Added By Kishor For popup for print
			var narrationBill =$("#narrationPrint").val();
			
			if (narrationBill == "narrationPrint") {
				openPrintPopup();
				return false;
			}
			
			var narrationidBill =$('#narrationPrint').val();
			if (narrationidBill != "" || narrationidBill != null || narrationidBill != undefined) {
				closePrintPopup();
			}	
			
			if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
				narrationidBill="-";
			}
			
			
			var patientNamePrint =$("#patientNamePrint").val();
			var doctorNamePrint = $('#doctorNamePrint').val();
			
			if (patientNamePrint == "" || patientNamePrint == null || patientNamePrint == undefined) {
				patientNamePrint="-";
				alert("Enter Patient Name ");
				return false;
			}
			
			
			var tableR = $('#billDetailsRT tr').length;
			//alert(tableR);
			if(tableR == 0){
				alert("NO Data Availble");
				return false;
			}
			 billquotations = {
					listBillquotations : []
			};
			
			for(var i=1;i <= tableR;i++){
				var Service = $("#sarvName"+i).text();
				var servId = $("#chkOpdBillReg"+i).val();
				var subServId = $("#chkOpdBillReggg"+i).val();
				//var date = $("#dateR"+i).text();
				var rate = $("#ratee"+i).text();
				var qty = $("#qtyy"+i).text();
				var amount = $("#amtttt"+i).text();
				
				billquotations.listBillquotations.push({
				
					serviceName 	: Service,
					serviceId		: servId,
					subServiceId	: subServId,
					//date 			: date,
					rate 			: rate,
					quantity 			: qty,
					amount 			: amount,

					});
				
			}
		}
		
		
		
		if(billquotations == null || billquotations == undefined){
			alert("Fill Records!!!");
			return false;
		}
		
		billquotations = JSON.stringify(billquotations);
		window.open("billqutRunTimePrint.jsp?billquotations=" +encodeURIComponent(billquotations)
				+ "&patientNamePrint=" + encodeURIComponent(patientNamePrint)
				+ "&doctorNamePrint=" + encodeURIComponent(doctorNamePrint));
		
		$("#narrationPrint").val("narrationPrint");
	}
	
	


	function openPrintPopup() {

	$("#modal-28").addClass("md-show");
}

function closePrintPopup() {
	$("#modal-28").removeClass("md-show");
}

function setNarrationPrintPopup1() {

	//var receiptEditSponsor  = $("#receiptEditSponsor").val(); 	
	var narrationidBill = $('#narrationPrint').val();
	
	var patientNamePrint = $('#patientNamePrint').val();
	var doctorNamePrint = $('#doctorNamePrint').val();

	if (narrationidBill == "" || narrationidBill == null
			|| narrationidBill == undefined) {
		$("#narrationPrint").focus();
		return false;
	}

	$("#narrationPrint").val('notnarrationPrint');

	
	if (patientNamePrint == "" || patientNamePrint == null
			|| patientNamePrint == undefined) {
		patientNamePrint = "-";
		alert("Enter Patient Name ");
		//$("#narrationRunTime").val('narrationRunTime');
		return false;
	}
	var flag = $("#comparePFlag").val();
	var flag1 = $("#likeBillingPFlag").val();
	var flag2 = $("#likeBillingPFlagAgainNew").val();

	if(flag == "Y"){
		PrintBillQutRunime('compare');		
	}else if(flag1 == "Y"){
		PrintBillQutRunime('likeBilling');
	}else if(flag2 == "Y"){
		PrintBillQutRunimeAgainNew();
	}
	else{
	PrintBillQutRunime();
	}

}



function PrintQuotationPatientWise(treatId)
{

	var billquotations = "";
	
	
	var patID = $("#patientId").text();
	
	var billId		= $("#billNo").text();
	var deptId   = $("#depdocdeskid").val();
		
		var tableR = $('#billDetails tr').length;
		//alert(tableR);
		if(tableR == 0){
			alert("NO Data Availble");
			return false;
		}
		 billquotations = {
				listBillquotations : []
		};
		
		for(var i=1;i <= tableR;i++){
			var Service = $("#sarvName"+i).text();
			var servId = $("#chkOpdBillReg"+i).val();
			var subServId = $("#chkOpdBillReggg"+i).val();
			//var date = $("#dateR"+i).text();
			var rate = $("#ratee"+i).text();
			var qty = $("#qtyy"+i).text();
			var amount = $("#amtt"+i).text();
			
			billquotations.listBillquotations.push({
			
				serviceName 	: Service,
				serviceId		: servId,
				subServiceId	: subServId,
				//date 			: date,
				rate 			: rate,
				quantity 		: qty,
				amount 			: amount,

				});
			
		}
	
	
	
	
	if(billquotations == null || billquotations == undefined){
		alert("Fill Records!!!");
		return false;
	}
	
	billquotations = JSON.stringify(billquotations);
	window.open("billqutPrintParientWise.jsp?billquotations=" +encodeURIComponent(billquotations)
			+ "&treatId=" + encodeURIComponent(treatId)
			+ "&billId=" + encodeURIComponent(billId)
			+ "&patID=" + encodeURIComponent(patID)
			+ "&deptId=" + encodeURIComponent(deptId));
	
	//$("#narrationPrint").val("narrationPrint");
}




function getTotServConfigTemp(response) {
	
	
	var index=0;
	var masterModuleBody = "";
	
	var cmt = $("#leftDiv tr").length;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {
		index ++;
		var categoryName     = response.lstServiceConfigurations[i].categoryName;
		var charges          = response.lstServiceConfigurations[i].charges;
		var serviceId        =response.lstServiceConfigurations[i].serviceId;
		var idConfigurations =response.lstServiceConfigurations[i].idConfigurations;
		
		
			masterModuleBody = masterModuleBody
					+ '<tr id="quotation'+ index+ '">'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReggg'
					+ index
					+ '" name="opdBillCheckboxReggg" value="'						
					+serviceId
					+ '">'
					+ '</td>'					
					
					+ '<td class="only-checkbox" style="display:none">'
					+ '<input type="checkbox" checked=checked id="chkOpdBillReg'
					+ index
					+ '" name="opdBillCheckboxReg" value="'
					+ serviceId
					+ '">'
					+ '</td>'	
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'
					
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ '"> </td>'

					
					+'<td id="sarvName'
					+ index
					+ '">'
					+ categoryName
					+ '</td>'
					
					+'<td align="Center" id="ratee'
					+ index
					+ '">'
					+ charges
					+ '</td>'
					
					+'<td align="Center" id="qtyy'
					+ index
					+ '">'
					+ '1'
					+ '</td> <td align="right" id="amtt'
					+ index
					+ '">'
					+ charges
					+ '</td>' 
					/*+'<td align="Center"><i aria-hidden="true" onclick="deleteCompTOne('+ index	+ ')"'  
					+'style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td>'*/
					+'</tr>';
			
			
	}
	
	$("#billDetailsComparision").html(masterModuleBody);
	//$("#billDetailsRT1").html(masterModuleBody);
	
	setTableTwoTotalAmount();
	
}
function removeDynamicServ(){
	
}

$(document).ready(function() {
	App.setPage("wizards_validations"); // Set current page
	App.init(); // Initialise plugins and elements
	FormWizard.init();
});
function multiSelectForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}

	$("#listmstr_select_service").html(list);
	
}
/*******
 * @author    :BILAL
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
 * @author    :BILAL
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
 * @author    :BILAL
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
	// $("#e1").html(list);
	$("#listmstr_select_service").html(list);
	
	//dynamically setting data on right div when query type is insert
	var queryType = $("#queryType").val();
	if(queryType == "insert"){
		fetchconfigdataonclick();
	}
	
	getChargesFromConfiguration();
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
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
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
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
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
	getChargesFromConfiguration();
}
/*******************************************************************************
 * Touheed's Plugin for Multi select ForCharges
 ******************************************************************************/



/*******
 * @author    :BILAL
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
 * @author    :BILAL
 * @Date      :23-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) 
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
 * @author    :BILAL
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
 * @author    :BILAL
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
			fetchSubServiceByIdcom(masterid, selfId);
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
	}
	getChargesFromConfiguration();
}
/**@author   :Bilal
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div**/
function fetchconfigdataonclick() {
	
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
		url : "ehat/configurationservice/getConfigurationListFromViewForSub",
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
		success : function(response) {
		
			getTotServConfigTemp(response);
			
		}
	});		
}
function fetchAllServicecom() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceListCom",
		
		success : function(response) {
			multiSelectcom(response);
			//fetchSubServiceCategoryList();
		}
	});

}

/**
 * @author : Bilal
 * @date   : 31-july-2017
 * @code   : for fectch all sub services whose combination flag is Y under services***/
function fetchSubServiceByIdcom(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceByIdcom",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
		
			multiSelectSlavecom(response);
		}
	});
}


function calculationRT(id){
	
	var rate=$('#ratee'+id).text();
	//validateNumbers(rate);
	//validatePrice(rate);
	var qty=$('#qtyy'+id).text();
	var tot=rate * qty;
	$('#amtttt'+id).text(tot);
	$('#amtt'+id).text(tot);
}


var wardTypeSelectIDUIView = "<option id='' value='0'>--select--</option>";
function getallHallTypeForViewNew(type) {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}
	count = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');
	inputs.push('corporateId=' + sid);
	inputs.push('type=' + type);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

		//	$("#hallDetailDiv").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			for ( var i = 0; i < (pobj1.htli.length); i++) {

				wardTypeSelectIDUIView = wardTypeSelectIDUIView
						+ ("<option id='" + (pobj1.htli[i].idht) + "' value='"
								+ (pobj1.htli[i].hallTypeId) + "'>"
								+ (pobj1.htli[i].htnm) + "</option>");

			}

			$("#wardType2").html(wardTypeSelectIDUIView);

		}
	});
};



/**@author   :Kishor		
 * @Date     :22-Feb-2018
 * @code     :for fetching dynamic services for again new quotation**/
function fetchmchargesForQuotationNew() {
	
	/*var sponsorId = $("#lis0").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	var categoryid = $("#categoryidsipd").val();
	
	//var hallId = $('#hallIdd').val();hallIDD
	var hallId = $('#lisH0').val();
	var hallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	hallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	//For Is combination service id
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	
	var toDate =$("#toDate").val();
	//alert("toDate???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
    }
	
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
		hallSlaveId = 0;
    }
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	
	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	*/

	var hallSlaveId1=$('#wardType2').val();
	//alert(hallSlaveId1);
	
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/configurationservice/fetchMedicalTeamCharges",
		data : {
			"chargesId"      : parseInt(0),
			"chargesSlaveId" : parseInt(0),
			
			"hallId"         : parseInt(2),
			"hallSlaveId" : parseInt(hallSlaveId1),
			
			"isComServId"      : parseInt(0),
			"isComServlastId" : parseInt(0)
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
		console.log(r);
		if(r.lstConfigurService.length > 0){
			var bedRate=r.lstConfigurService[0].hallCharges;
			var nursingRate=r.lstConfigurService[0].medicalCharges;
			$('#bedRate1').val(bedRate);
			$('#nursingRate1').val(nursingRate);
		}
		getChargesFromConfigurationNew();		
		}
		
	});		
}

//This function use for save hall rate on againNew quotation
function saveHallService(){
	var bedRate1=$('#bedRate1').val();
	var nursingRate1=$('#nursingRate1').val();
	
	var hallName=$('#wardType2 option:selected').text();
	var hallSlaveId12=$('#wardType2').val();
	if(hallSlaveId12==0){
	alert("Select Hall");
	return false;
	}
	
	var days=$('#days').val();	
	if(days == 0 || days==null || days=="" || isNaN(days)){
		alert("Enter Days");
		return false;
	}
	
	if(bedRate1 == 0 || nursingRate1==0){
		alert("Rate should not be zero");
		return false;
	}
	
	$('#subserviceid').val(hallSlaveId12);
	$('#perticular').val(hallName);
	$('#servId').val(3);
	$('#serviceid').val(3);
	$('#rate').val(bedRate1);
	$('#qty').val(days);
	
	
	calculatePerticularTotal1();	
	saveNewQuotationAgain("new");
	saveNursingService();
}



//This function use for save Nursing rate on againNew quotation
function saveNursingService(){
	var bedRate1=$('#bedRate1').val();
	var nursingRate1=$('#nursingRate1').val();
	var days=$('#days').val();
	var hallName=$('#wardType2 option:selected').text();
	var hallSlaveId12=$('#wardType2').val();
	
	$('#subserviceid').val(-2);
	$('#perticular').val("Nursing( "+hallName+" )");
	$('#servId').val(3);
	$('#serviceid').val(3);
	$('#rate').val(nursingRate1);
	$('#qty').val(days);
	
	
	calculatePerticularTotal1();	
	saveNewQuotationAgain("new");
	
	calAdminCharges();
}

//This function use for save Admin Charges rate on againNew quotation
function calAdminCharges(){
	
	var totalAmtRunT=parseFloat($('#totalAmtRunT').text());	
	var adminChargesPer=parseFloat($('#adminChargesPer').val());
	//alert(adminChargesPer);
	var cal= parseFloat((totalAmtRunT/100) * adminChargesPer);
	
	$('#servId').val(0);
	$('#subserviceid').val(70);
	$('#perticular').val("Administrative Charges");
	$('#servId').val(15);
	$('#serviceid').val(15);
	
	$('#rate').val(cal);
	$('#qty').val(1);
	
	
	calculatePerticularTotal1();	
	saveNewQuotationAgain("new");
	clearAllFields();
	
}

//This function use for save againNew quotation
function saveNewQuotationAgain(callfrom){

	//alert("3393");
	
	var chargesConf=$("#chargesfromConfIpd").val();	
	var adminChargesPer=$("#adminChargesPer").val();	
	
	//Added By Bilal for getting proper rates of sponsor and hall
    var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	$("#sponsorid2").val(sponsorId);
	$("#chargesSlaveId2").val(chargesSlaveId);
	var serviceId = $("#serviceid").val();
	
	if (serviceId != 3) {
		
		if (sponsorId > 0 && chargesSlaveId > 0) {
			getchargesipdNew();
		}
	}
	if (chargesConf > 0 ) {
		//chargesConf =chargesConf;
	}else{
		$("#hallId").val(0);
		getchargesipdNew();
		chargesConf=$("#chargesfromConfIpd").val();
		if (chargesConf > 0 ) {
			//chargesConf =chargesConf;
		}else{
			$("#SponsorsourceTypeId").val(0);
			$("#chargesSlaveId").val(0);
			$("#hallId").val(2);
			getchargesipdNew();
			chargesConf=$("#chargesfromConfIpd").val();
		}
	}
		
	var hallId    =	$('#hallId').val();	
	
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
		var queryType = $('#queryType').val();
		//var doctorId = $("#doctorName option:selected").val();
		var patientId     = $("#pId").val();
		var treatmentId = $('#treatmentId').text();
		
		var rate = $("#rate").val();
		var quantity = $("#qty").val();
		var amount = $("#amount").val();
		var createdDateTime = $("#finalDate").val();
		var subServiceId = parseInt($("#subserviceid").val());
		if(subServiceId == -5){
			alert("Please enter valid service Name");		
			return false;
		}
		var count=$('#append').val();
		var qName=$('#qName').val();
		
		
		var ratevalidation = $('#rate').val();
		
		if (ratevalidation == "" || ratevalidation == null || ratevalidation == undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
			ratevalidation = 0;
			alert("Please Enter Rate");
			return false;
		}
		var subServiceName = $("#perticular").val();
		var serviceName = $("#servId option:selected").text();
		var unitId = $("#uId").val();
	
		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);


		if (subServiceName == "" || subServiceName == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		
		var serviceDetails = {
				listBillDetailsQuotation : []
		};
		
		serviceDetails.listBillDetailsQuotation.push({
			unitId : unitId,
			patientId : patientId,
			treatmentId : treatmentId,
			serviceId : serviceId,
			subServiceId : subServiceId,
			subServiceName : subServiceName,
			serviceName : serviceName,
			rate : rate,			
			quantity : quantity,
			amount : amount,			
			sponsorId  : sponsorId,
			chargesSlaveId : chargesSlaveId,	            	           
			hallId     : hallId,
			//quotationCount  : count,
			count  : count,
			quotationName  : qName
           
		});
		/*alert(serviceDetails.listBillDetailsQuotation[0].serviceName);
		return false;*/
		serviceDetails = JSON.stringify(serviceDetails);

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + serviceDetails);
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);
		inputs.push("adminChargesPer=" + adminChargesPer);
		

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/saveQuotationsNew",

			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

			//	if (r > 0) {
				/*if (r ==1 && queryType == 'insert' ) {
					alertify.success("Service assign Successfully");
				} else if(r ==2 && queryType == 'update' ){
					alertify.success("Service Update Successfully");
				}*/
				
				if(count > 0){
				setServicesFromList('general');
				}else{
				getServiceDetails("general");
				}		
				//setAdmChargesFromClickingBtn();
				clearAllFields();
				//openAllSlave();
			}
		});
}

function setAdmChargesFromClickingBtn(){
	
	$("#admBtn").trigger('click');
	
}
/************
 *@author	: Kishor Lokhande
 *@date		:  22-Feb-2018
 *@code		:get charges of configuration again new quotation
 ***********/
function getChargesFromConfigurationNew(){
	//alert("Set");
	$('#billDetailsComparision').empty();
	var treatmentId = $('#treatmentId').text();
	
	//For Charges Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
		
	//For Hall Wise Id  
	//var HallId =0;
	var HallId = $("#lisH0").val();// chargesId
	var HallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	HallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
		
	//For Is combination service id
	//var isComServId =0;
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	/*---------------------------------------*/

	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}
	if (HallId == "" || HallId == null || HallId == undefined) {
		HallId = 0;
	}
	if (chargesId == "" || chargesId == null || chargesId == undefined
			|| isNaN(chargesId)) {
		chargesId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	/*---------------------------------------*/
	
	var servId =[];
	//var subServId =[];
	var tretId=0;
	var hallSlaveId1=$('#wardType2').val();
	
	var inputs = [];	
	inputs.push("tretId="+ encodeURIComponent(tretId));
	inputs.push("servId="+ encodeURIComponent(servId));
	inputs.push("subServId="+ encodeURIComponent(subServIdArray));
	inputs.push("chargesSponId="+ encodeURIComponent(0));
	inputs.push("chargesSlaveId="+ encodeURIComponent(0));
	
	inputs.push("HallId="+ encodeURIComponent(2));
	inputs.push("HallSlaveId="+ encodeURIComponent(hallSlaveId1));
	
	inputs.push("isComServId="+ encodeURIComponent(0));
	inputs.push("isComServlastId="+ encodeURIComponent(0));
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url : "ehat/ipdbill/getIpdComparisonPatients",
		data	: str + "&reqType=AJAX",
		cache 	: false,
	
		success : function(r) {
			//setIpdComparisonPatientsTempRunTime(r);
			setTempForChangeRateNew(r);
		}
	});
}
function setTempForChangeRateNew(r){
	var setTAmt=0.0;
	for ( var i = 0; i < r.lstServiceConfigurations.length; i++) {
		var ssid=r.lstServiceConfigurations[i].serviceId;
		var rate=parseFloat(r.lstServiceConfigurations[i].charges);
		//alert(rate);
		var qty=parseInt($('#q'+ssid).text());
		var amt =parseFloat((rate * qty).toFixed(2));
		//'<div class="text-center">'+ (t.listBillDetailsQuotation[i].amount).toFixed(2) +'</div>';
		$('#char'+ssid).text(rate);
		$('#amt'+ssid).text(amt);
		var tA=parseFloat($('#tamt'+ssid).text());
		var setAmt=0;
		
		if(amt >= tA){
			setAmt=tA-amt;
			//alert("hi"+setAmt);
			$('#tamt'+ssid).text(amt);
			var getAmt=$('#totalAmtRunT').text();
			 setTAmt=getAmt-setAmt;
			//$('#totalAmtRunT').text(setTAmt.toFixed(2));
		}else{
			setAmt=amt-tA;
			//alert(setAmt);
			$('#tamt'+ssid).text(amt);
			var getAmt=$('#totalAmtRunT').text();
			 setTAmt=getAmt+setAmt;
			
		}
		
		
		
		var amtt=0.0;
		$("#billDetailsRT1 tr").each(function() {

					 var amt = $(this).find('td:eq(11)').text();
					// var Amt = $(this).find('td:eq(7)').text();
					// alert(amt);
		  
		amtt=Number(amtt)+Number(amt);
				});
		//alert(amtt);
		
		$('#totalAmtRunT').text(amtt.toFixed(2));
		
	}
}


/** ********************Operation Management************************************ */
function defaultViewOperation() {
	var oprationSelect = "<option id='' value='0'>--select--</option>";
	$("#saveBtn").html("");
	var inputs = [];
	inputs.push('action=fetchOperation');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {/*
			ajaxResponse = r;
			$("#operationDataDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			//$("#OperationMgmContent").setTemplate(defaultViewOperationTemp);
			//$("#OperationMgmContent").processTemplate(pobj1);
		*/

			ajaxResponse = r;

		//	$("#hallDetailDiv").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			for ( var i = 0; i < (pobj1.ol.length); i++) {

				oprationSelect = oprationSelect
						+ ("<option id123='" + (pobj1.ol[i].opgr) + "' value='"
								+ (pobj1.ol[i].opst)+"_"+(pobj1.ol[i].opgr) + "'>"
								+ (pobj1.ol[i].on) + "</option>");

			}

			$("#operations").html(oprationSelect);
			//$("#operations").select2();
			
		
		}
	});
}

/**
 * @author Kishor
 * @Date 22-feb-2018
 * @code For hallwise Operation charge OT
 * ***/
function getOperationRate(){
	//var hallSlaveId1=$('#wardType2').val();
//	var a=$("#operations").val();
	//alert(a);
	
	var myString = $("#operations").val();
	var arr = myString.split('_');
	var groupId=arr[0];
	var categoryId=arr[1];
	//alert(groupId);
	//alert(categoryId);
	//return false;

    var opcid              =  groupId;//group id =4
	var treatmentId        =  $('#wardType2').val(); //hallid
	var scheduledProcedure = categoryId;//category id = 1
	var inputs = [];

   	inputs.push('TrId=' + treatmentId);
	inputs.push('pId=' + opcid);
	inputs.push('scheduledProcedure=' + scheduledProcedure);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/hallwisechargeOTNew",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
			if(r==null || r=="" || r==undefined){
				 $("#chargesOT").val(0);
			}else{
				 $("#chargesOT").val(r);
			}

	}
	});
	
	
}


/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For hallwise Operation charge OT
 * ***/
function fetchOTPercentageNew(){
var OTCharges=$("#chargesOT").val();
	
var hallName=$('#wardType2 option:selected').text();
var hallSlaveId12=$('#wardType2').val();
if(hallSlaveId12==0){
alert("Select Hall");
return false;
}
var operationsName=$('#operations option:selected').text();
var days=$('#operations').val();	

/*if(days == "0" || days==null || days=="" || isNaN(days)){*/
if(days == "0" || days==""){
	alert("Please Select Operation");
	return false;
}

if(OTCharges==0){
	alert("OT charges should not be zero");
	return false;
}


	jQuery.ajax({
		async : false,
		type : "GET",
	//	data :  "&reqType=AJAX",
		url : "ehat/ot/fetchOTPercentage",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(pobj1) {
			//ajaxResponse = r;
		//	 setDynamicServicesOnright(ajaxResponse,"FETHOTPER");
			// setOTDynamicServicesOnright(ajaxResponse,"FETHOTPER");
     
				//pobj1 = eval('(' + ajaxResponse + ')');

				for ( var i = 0; i < (pobj1.listOTPercentage.length); i++) {

									
					var sId=pobj1.listOTPercentage[i].serviceId;					
					//var ssId=pobj1.listOTPercentage[i].subserviceId;
					var ssId=pobj1.listOTPercentage[i].childSubServiceId;
					var servName=pobj1.listOTPercentage[i].subservicesname;					
					var percentage=pobj1.listOTPercentage[i].percentage;
					
					var amt=(parseFloat(OTCharges/100) * percentage);
					//alert(servName);
					
					$('#servId').val(0);
					$('#subserviceid').val(ssId);
					$('#perticular').val(servName);
					$('#servId').val(sId);
					$('#serviceid').val(sId);
					
					$('#rate').val(amt);
					$('#qty').val(1);
					
					
					calculatePerticularTotal1();	
					saveNewQuotationAgain("new");
					
					
				}
		}
	});
	//$("#chargesOT").val(0);
	
}



function PrintBillQutRunimeAgainNew()
{
	var patientId     = $("#pId").val();
	var treatId     = $("#tId").val();
	$("#likeBillingPFlagAgainNew").val("Y");
	//alert(callfrom);
	var count=parseInt($('#qutNameNew').val());
	var qName=$('#qutNameNew :selected').text();

	//Added By Kishor For popup for print
	/*var narrationBill =$("#narrationPrint").val();
	
	if (narrationBill == "narrationPrint") {
		openPrintPopup();
		return false;
	}
	
	var narrationidBill =$('#narrationPrint').val();
	if (narrationidBill != "" || narrationidBill != null || narrationidBill != undefined) {
		closePrintPopup();
	}	
	
	if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		narrationidBill="-";
	}
	
	
	var patientNamePrint =$("#patientNamePrint").val();
	var doctorNamePrint = $('#doctorNamePrint').val();
	
	if (patientNamePrint == "" || patientNamePrint == null || patientNamePrint == undefined) {
		patientNamePrint="-";
		alert("Enter Patient Name ");
		return false;
	}*/
	
	
	window.open("ehat_billquotation_again_new_print.jsp?count=" +encodeURIComponent(count)
			+ "&qName=" + encodeURIComponent(qName)
			+ "&doctorNamePrint=" + encodeURIComponent(doctorNamePrint)
			+ "&patientNamePrint=" + encodeURIComponent(patientNamePrint)
			+ "&patientId=" + encodeURIComponent(patientId)
			+ "&treatId=" + encodeURIComponent(treatId));
	
	$("#narrationPrint").val("narrationPrint");
}
