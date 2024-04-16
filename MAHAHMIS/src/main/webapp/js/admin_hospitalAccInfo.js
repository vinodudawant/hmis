
function fetchhospitalAccInfo(){

	var sid = $("#sid").val();
	if (!sid) {
		sid = 0;
	}
	var inputs = [];
	inputs.push('corporateId=' + sid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/adminForHosacc/fetchhospital",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r.arrHospitalAccDetails.length > 0) {
				$("#queryType").val('update');
				$("#txtIPDFee").val(r.arrHospitalAccDetails[0].ipdfee);
				if (r.arrHospitalAccDetails[0].ipdfee == '0') {
					$("#txtIPDFee").val('0');
				}
				
				$("#idForHospital").val(r.arrHospitalAccDetails[0].idhospitalAccInfo);
		
				$("#txtadminChrg").val(r.arrHospitalAccDetails[0].adminChrg);
				$("#txtChrgType").val(r.arrHospitalAccDetails[0].ChrgType);
				$("#DocRdToTime").val(r.arrHospitalAccDetails[0].docRdToTime);
				$("#DocRdFrmTime").val(r.arrHospitalAccDetails[0].docRdFrmTime);
				$("#OTFrmTime").val(r.arrHospitalAccDetails[0].otfrmTime);
				$("#OTToTime").val(r.arrHospitalAccDetails[0].ottoTime);
				$("#txtOTcharge").val(r.arrHospitalAccDetails[0].otcharge);
				$("#txtOT").val(r.arrHospitalAccDetails[0].otafterOTtime);
				$("#txtOTEmerchrg").val(r.arrHospitalAccDetails[0].otemerchrg);
				$("#OpEmerFrmTime").val(r.arrHospitalAccDetails[0].opEmerFrmTime);
				$("#OpEmerToTime").val(r.arrHospitalAccDetails[0].opEmerToTime);
				$("#txtPreanechrg").val(r.arrHospitalAccDetails[0].preanechrg);
				$("#txtTPAChr").val(r.arrHospitalAccDetails[0].tpachr);
				$("#txtOpEmrcharge").val(r.arrHospitalAccDetails[0].operationEmergencyCharges);
				$("#docRCART").val(r.arrHospitalAccDetails[0].doctorRoundChargesAfterRoundTime);
				$("#aneStandby").val(r.arrHospitalAccDetails[0].aneStandBy);
				$("#aneAsa").val(r.arrHospitalAccDetails[0].aneAsaIv);
				$("#aneNormal").val(r.arrHospitalAccDetails[0].aneNormal);
				$("#astsurchrg").val(r.arrHospitalAccDetails[0].astSurgeonChrg);
				$("#txtTDS").val(r.arrHospitalAccDetails[0].tds);
				$("#selBedHours").val(r.arrHospitalAccDetails[0].bedHours);
				$("#txtEmrAdmChrg").val(r.arrHospitalAccDetails[0].emrAdmChrg);
				$("#SelEAFrmTime").val(r.arrHospitalAccDetails[0].emrStartTime);
				$("#SelEAToTime").val(r.arrHospitalAccDetails[0].emrEndTime);
				$("#refDocPer").val(r.arrHospitalAccDetails[0].refDocPer);
				$("#ppnPer").val(r.arrHospitalAccDetails[0].ppnPer);
				$("#currencyId").val(r.arrHospitalAccDetails[0].currencyId);
				$("#emrChrPer").val(r.arrHospitalAccDetails[0].emrChrPer);
				
				$("#hInfoUnitId").val(r.arrHospitalAccDetails[0].hospitalUnitId);
				
				if (r.arrHospitalAccDetails[0].emrAdmChrgFlag == 1) {
					$('#emrAdmChrgFlag').attr('checked', 'checked');
				}
				
				
				if(sid > 0){
				$("#txtAsstSurCharges").val(r.arrHospitalAccDetails[0].astSurgeonChrg);
				}
				var ipd_billing = r.arrHospitalAccDetails[0].typeOfBilling;
				if (ipd_billing == 'A') {
					$('#radioAuto').attr('checked', true);
				} else {
					$('#radioManual').attr('checked', true);
				}
				
				var adminChargesFlag = r.arrHospitalAccDetails[0].adminChargesFlag;
				if (adminChargesFlag == 'fixed') {
					$('#rdFixed').attr('checked', true);
				} else {
					$('#rdservicewise').attr('checked', true);
				}				
								
				// added by viniod
				var mulAdmServiceArry = [];
				if(r.arrHospitalAccDetails[0].adminServiceid!=null && r.arrHospitalAccDetails[0].adminServiceid!=""){
					var mulServiceID=r.arrHospitalAccDetails[0].adminServiceid.split(",");
					
					for(var i=0;i<mulServiceID.length;i++){
						mulAdmServiceArry.push(mulServiceID[i]);
					}
				}	
				//$('#adminSrv').val(mulAdmServiceArry);
				$('#adminSrv').select2();
					
				setTimeout(function(){
					
					setSubServicesHos(r);
					
				}, 2000);
				
								
				/*var depForSufix=pobj1.listHosAccDetail[0].depForSufix;
				
				if(depForSufix!=null && depForSufix!=""){
					var mulDepID=depForSufix.split(",");
					for(var i=0;i<mulDepID.length;i++){
						
						if(mulDepID[i]==0){
							
							$('#all').prop('checked', true);							
						}else if(mulDepID[i]==1){
							
							$('#opd').prop('checked', true);	
						}else if(mulDepID[i]==2){
							
							$('#ipd').prop('checked', true);	
						}else if(mulDepID[i]==3){
							
							$('#diag').prop('checked', true);	
						}
					}
				}				
				
				$("#billPrefix").val(pobj1.listHosAccDetail[0].billPrefix);
				$("#billMiddle").val(pobj1.listHosAccDetail[0].billMiddle);
				$("#billSufix").val(pobj1.listHosAccDetail[0].billSufix);*/
				
				setPreviousBillPrefix123(r);
				
				// added by viniod
			}
		}
	});
			
}



function setPreviousBillPrefix123(res){
	
	var len=res.arrHospitalAccDetails[0].listEhatBillPrefix.length;
	var tbody="";
	
	for(var i=0;i<len;i++){
	
		tbody=tbody	
		
		+ " <tr class='prefixClass' id='prefixTr"+i+"'> "
		+ " <td class='center' style='width:15%'> "
		+ " 	<select id='depPrefix"+i+"' class='form-control input-SmallText'> "
		+ " 		<option value='0'>All</option> "
		+ " 		<option value='1'>Opd</option> "
		+ " 		<option value='2'>Ipd</option> "
		+ " 		<option value='3'>Diag</option> "
		+ " 		<option value='4'>Reg No</option> "
		+ " 	</select> "
		+ " </td> "
		+ " <td class='center' style='width:20%'><input type='text' id='prefix"+i+"' value='"+res.arrHospitalAccDetails[0].listEhatBillPrefix[i].billPrefix+"'/></td> "
		+ " <td class='center' style='width:20%'><input type='text' id='middle"+i+"' value='"+res.arrHospitalAccDetails[0].listEhatBillPrefix[i].billMiddle+"'/></td> "															
		+ " <td class='center' style='width:20%'><input type='text' id='sufix"+i+"' value='"+res.arrHospitalAccDetails[0].listEhatBillPrefix[i].billSuffix+"'/></td> "
		+ " <td class='center' style='width:25%'> "
		
		+ " <div class='form-group' style='margin-top: 8%'> " 
		+ " 	<div class='col-md-12'> "	 												
		+ " 		<div class='row' id='input-type'> "
		+ " 			<div class='col-sm-4'> "
		+ " 				<label class='radio-inline'> Bill  "
		+ " 				<input type='radio' class='radio' value='1' name='recBillBoth"+i+"' id='recNo"+i+"'/>  "
		+ " 				</label>  "
		+ " 			</div>  "
					
		+ " 			<div class='col-sm-4'>  "
		+ " 				<label class='radio-inline'> Rec   "
		+ " 				<input type='radio' class='radio' value='2' name='recBillBoth"+i+"' id='billNo"+i+"'/> "
		+ " 				</label> "
		+ " 			</div> "		
					
		+ " 			<div class='col-sm-4'>  "
		+ " 				<label class='radio-inline'> Both "
		+ " 					<input type='radio' class='radio' value='3' name='recBillBoth"+i+"' id='both"+i+"'/> "
		+ "   				</label> "
		+ " 			</div> "											 
		+ " 		</div>  "
		+ " 	</div>  "
		+ " </div> "
		
		
		/*+ " 	<input type='radio' class='radio' value='1' name='recBillBoth"+i+"' id='recNo"+i+"'/>Bill "
		+ " 	<input type='radio' class='radio' value='2' name='recBillBoth"+i+"' id='billNo"+i+"'/>Rec "
		+ " 	<input type='radio' class='radio' value='3' name='recBillBoth"+i+"' id='both"+i+"'/>Both "*/
		+ " </td> "																														
		+ " </tr> ";	
	}	
	
	$("#billPrefixTbody").html(tbody);
	
	for(var i=0;i<len;i++){
		
		$('#depPrefix'+i).val(res.arrHospitalAccDetails[0].listEhatBillPrefix[i].depId);		
		$('input:radio[value='+res.arrHospitalAccDetails[0].listEhatBillPrefix[i].billRecBoth+'][name=recBillBoth'+i+']').prop('checked', true);
	}
}


function setSubServicesHos(r){
	
	// added by viniod	
	/*var subServiceID=subIds.split(",");
	for(var i=0; i < subServiceID.length;i++){
		
		var inpId=$("input[class$='"+subServiceID[i]+"']").attr("id");			
		$("#"+inpId).trigger('click');	
	}	*/
	//
	
	


	var htm = '';
	var index =  $("#rightDiv tr").length;
	//var cmt = $("#leftDiv tr").length;
	for (var i = 0; i < r.arrHospitalAccDetails[0].listSubServiceDto.length; i++) {
		htm = htm

		+ "<tr  id='trs" + (index + 1)
				+ "' class='trs'><td class='col-sm-10-1 center' id='chNamer"
				+ (index + 1) + "' style='height: 21.5px;'>"
				+ r.arrHospitalAccDetails[0].listSubServiceDto[i].categoryName + "</td> "
				+ "<input type='hidden' class='subserviceIds" 
				+ "' id='subbIdr" + (index + 1) + "' value='"
				+ r.arrHospitalAccDetails[0].listSubServiceDto[i].subId + "'>"

				+ "<td id='lastTdr" + (index + 1)
				+ "'><input type='button' class='"
				+ r.arrHospitalAccDetails[0].listSubServiceDto[i].subId + "' value='<<' id='inputCntr"
				+ (index + 1) + "' onclick='addTRtoLeft(" + (index + 1)
				+ ")'>"
				+'<input type="hidden" id="idConfiguration'+ (index + 1) +'" class="idc" value="'+ r.arrHospitalAccDetails[0].listSubServiceDto[i].subId + '">'
				+ "</tr>";
		
		$('#subIDs').append(","+r.arrHospitalAccDetails[0].listSubServiceDto[i].subId);


		index++;
}

	
	$("#rightDiv").html(htm);	

}

/************
* @author	: Dayanand Khandekar
* @date		: 8-april-2021
* @codeFor	: Get Unit List For Hospital Account Information
 ************/
function getAllUnitForHospitalAccountInfo() {

    jQuery.ajax({
        async : false,
        type : "POST",
        //url : "ehat/unit/fetchUnitList",
        url : "ehat/unit/getAllUnitListMaster",

        success : function(r) {
        	setUnitListForHospitalAccountInfo(r);
        }
    });
}
/************
* @author	: Dayanand Khandekar
* @date		: 8-april-2021
* @codeFor	: set Unit List For Hospital Account Information
 ************/
function setUnitListForHospitalAccountInfo(r) {   
	
	var list = "";   
	list = list + "<select name='State Name' class='col-md-12'><option value='0'>--Select Unit--</option>";
    for ( var i = 0; i < r.lstUnit.length; i++) {    

		list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
		}   
	$("#hInfoUnitId").html(list);   
	
}

function fetchSubServicesForHosp() {

	var serviceId = $("#adminSrv").val();
	if(serviceId == "" || serviceId == undefined){
		serviceId = 0;
	}

	var inputs = [];
	inputs.push("serviceId=" + serviceId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/finance/fetchSubServicesnew",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r.lstSubService.length);
			var list = "<option value='0'>--Select--</option>";    
		    for ( var i = 0; i < r.lstSubService.length; i++) {    

				list = list + "<option value='"+r.lstSubService[i].subId+"'>" + (r.lstSubService[i].categoryName) + "</option>";    
				}   
			$("#listmstr_select").html(list);
			$("#listmstr_select").select2();	
		}
	});
}