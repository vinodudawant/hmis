function getIpdPatientHeaderInfo(treatmentId){

	var unitId = $("#unitId").val();
		
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getIpdPatientHeaderInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
	 		if(r.listRegTreBillDto[0]!=undefined || r.listRegTreBillDto[0]!=null){
				
	 			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');			
				var dd=date.split(',');
	  			$("#dtofadmission").text(dd[0]);
	  			$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);
	  			$("#ptName").val(r.listRegTreBillDto[0].patientName);
	  			$("#corporate").text(r.listRegTreBillDto[0].categoryName);
	  			$("#idForDisc").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
	  			$("#isPpn").val(r.listRegTreBillDto[0].isPpn);
	  			$("#numbr").val(r.listRegTreBillDto[0].numbr);
	  			
	  			if(r.listRegTreBillDto[0].isPpn == "Y"){
	  				$('#ppn').show();
	  				$("#ppnNumber").html(r.listRegTreBillDto[0].numbr);
	  				$('#ppnNumber').show();
	  			}
				
				var fileName=r.listRegTreBillDto[0].imageName;	
				$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
				$("#genInvoiceFlag").val(r.listRegTreBillDto[0].invoiceFlag);
				$("#age").text(r.listRegTreBillDto[0].age);
				$("#patientName").text(r.listRegTreBillDto[0].patientName );
				$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			    $("#billNo").text(r.listRegTreBillDto[0].billId);
			    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			    $("#consultingDoctorr").text(r.listRegTreBillDto[0].consultingDocName);
			    $("#drid").val(r.listRegTreBillDto[0].doctorId);
			    $("#pid").val(r.listRegTreBillDto[0].patientId);
			    $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
	 		   	$("#weight1").val(r.listRegTreBillDto[0].weight) ;
	 		   	$("#height1").val(r.listRegTreBillDto[0].height) ;
				$("#sex").text(r.listRegTreBillDto[0].gender);
				$("#deptId").val(r.listRegTreBillDto[0].departmentId);
				$("#pId").val(r.listRegTreBillDto[0].patientId);
				$("#PiD").val(r.listRegTreBillDto[0].patientId);			
				$("#bId").val(r.listRegTreBillDto[0].billId);
				$("#tId").val(r.listRegTreBillDto[0].treatmentId);
				$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
				$("#sId").val(r.listRegTreBillDto[0].serviceId);
				
				if(r.listRegTreBillDto[0].chargesMasterSlaveId > 0)
					$("#billCategoty").text("Sponsor");
				else
					$("#billCategoty").text("Self");
				
				$("#corporate").text(r.listRegTreBillDto[0].categoryName);
	  			$("#ipdNo").text(r.listRegTreBillDto[0].trcount);
	  			$("#ipdNumber").val(r.listRegTreBillDto[0].trcount);
	 			$("#doa").text(date);
	 			$("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
				$("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
				$("#pt_Id").val(r.listRegTreBillDto[0].patientId);
				$("#bill_Id").val(r.listRegTreBillDto[0].billId);
				$("#refDocId").val(r.listRegTreBillDto[0].refDocId);
				$("#patientId").text(r.listRegTreBillDto[0].patientId);	
				//$("#consultingDoctor").text('');//r.listRegTreBillDto[0].invoiceCount			  
				$("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
				$("#prnId").text(r.listRegTreBillDto[0].patientId);
				$("#preBillId").text(r.listRegTreBillDto[0].invoiceCount);			  
				$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
				$("#centeripdID").text(r.listRegTreBillDto[0].centerPatientId);
				$("#refDoctor").text(r.listRegTreBillDto[0].refDocName);
			  	$("#tFlag").val(r.listRegTreBillDto[0].tFlag);
	
			  	if(r.listRegTreBillDto[0].dischargeDate!="-" && r.listRegTreBillDto[0].dischargeDate!=null && r.listRegTreBillDto[0].dischargeDate!=""){
			  		var dischargeDate= new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
				  	$("#dod").text((dischargeDate).split(",")[0]+", "+r.listRegTreBillDto[0].dischargeTime);
			  	}else{
			  		$("#dod").text("-");
			  	}
			  	
			  	$("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
			  	$("#mrn").val(r.listRegTreBillDto[0].mrnno);
			  	$("#hallTypeId").val(r.listRegTreBillDto[0].hallTypeId);
			  	$("#hallId").val(r.listRegTreBillDto[0].hallId);
			  	$("#hallSlaveId").val(r.listRegTreBillDto[0].hallId);
			  	$("#bedId").val(r.listRegTreBillDto[0].bedId);
			  	$("#treatBedsId").val(r.listRegTreBillDto[0].treatBedsId);
			  	$("#hallName").text(r.listRegTreBillDto[0].hallName);
			  	var dod = r.listRegTreBillDto[0].dischargeDate;
			  	var tod = r.listRegTreBillDto[0].dischargeTime;
			  	$("#dod").text(dod +" "+tod);
	 		}
 		}
	});
}

function getAdminChargesIpdForBed(){

	var unitId = $("#unitId").val();
	var deptId = 2;
		
	var inputs = [];
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('deptId=' + encodeURIComponent(deptId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getAdminChargesIpd",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r > 0)
				$("#adminChargesIpd").val(r);
			else
				$("#adminChargesIpd").val(0);
		}
	});
}
function getWardTypeList(){

	var hallTypeId = $("#wardTypeHall").val();
	
	if(!(hallTypeId >= 0))
		hallTypeId = 0;
	
	var inputs = [];
	inputs.push('hallTypeId=' + encodeURIComponent(hallTypeId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getWardTypeList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setWardTypeList(r,hallTypeId);
		}
	});
}

function setWardTypeList(r,hallTypeId){
	
	var htm = "";
	if(hallTypeId > 0)
		htm = "<option value='0'>-- Select Ward Name --</option>";
	else
		htm = "<option value='0'>-- Select Ward Type --</option>";
	
	for (var i=0;i<r.lstChargesSlave.length;i++)	{
		
		htm = htm + "<option value="+r.lstChargesSlave[i].slaveId+">"+r.lstChargesSlave[i].categoryName+"</option>";
	}
	if(hallTypeId > 0)
		$("#wardName").html(htm);
	else
		$("#wardTypeHall").html(htm);
}

function getPatientBedDetails(callFrom){

	var viewInfo = $("#viewInfo").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var id = 0;
	  
	if(callFrom == "onload" ){
		id = 2;
		callFrom=1;
	}else {
	
		if(callFrom == "shiftBed")
			id = $("#hallId").val();
		else
			id = $("#wardName").val();
	}
		
	var inputs = [];
	inputs.push('chargesSlaveId=' + encodeURIComponent(chargesSlaveId));
	inputs.push('hallId=' + encodeURIComponent(id));
	inputs.push('callFrom=' + encodeURIComponent(callFrom));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getPatientBedDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(viewInfo == 1)
				setBedInfo(r,callFrom);
			else if(viewInfo == 2)
				createListView(r,callFrom);
		}
	});
}

function setBedInfo(r,callFrom){
	
	var allBedCount = 0;
	var allocatedBedCount = 0;
	var cleaningBedCount = 0;
	var availableBedCount = 0;
	
	var patientBedId = $("#bedId").val();
	if(r.lstPatientBedInfoDTO.length > 0){
		
		allBedCount = r.lstPatientBedInfoDTO.length;
		
		//if (r.lstPatientBedInfoDTO[0].noOfBeds > 0) {
	
			var bedList = "<table class='table'> <tbody class='col-md-12' style='margin-bottom: 78px;'>  ";
			
			var rowCount = 0;
			
			for (var i=0;i<r.lstPatientBedInfoDTO.length;i++)	{
				
				if(rowCount == 0){
					
					bedList = bedList + "<tr id='' class=''>";
				}

				if (r.lstPatientBedInfoDTO[i].idbedstate == '2') {
					
					bedList = bedList
							+ "<td>"
							+ "<div class='bed' style='width: 160px; height: 200px; background-color: orange; border: 1px solid orange;padding: 5px;border-radius: 10px;box-shadow: 8px 8px 8px #888;'> "
							+ "<img src='images/clean1.png' width='100px' height='80px' style='margin-left: 25px;'"
							/*
							 * + "<img src='images/clean.jpg'
							 * width='100px' height='56px'"
							 */
							+ " /> "
							
							+ "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 46px;'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label> "
							+ "</div> "
							
							+ "<input type='hidden' id='normalIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoBedCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoHallCharges+"'>"
							+ "<input type='hidden' id='normalIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoNursingCharges+"'>"
							+ "<input type='hidden' id='normalBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalBedCharges+"'>"
							+ "<input type='hidden' id='sponsorBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorHallCharges+"'>"
							+ "<input type='hidden' id='normalNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorNursingCharges+"'>"
							+ "</td>";
					
					cleaningBedCount++;

				} else if (r.lstPatientBedInfoDTO[i].idbedstate == '4') {

					bedList = bedList
							+ "<td>"
							+ "<div class='bed' style='width: 160px; height: 200px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);padding: 5px;border-radius: 10px;box-shadow: 8px 8px 8px #888;'> "
							+ "<div style='height: 17px; width: 148px;'></div>"
							+ "<div style='height: 16px; width: 148px;'></div>"
							+ "<div style='height: 16px; width: 148px;'></div>"
							+ "<div style='height: 16px; width: 148px;'></div>"
							+ "<div style='height: 33px; width: 148px;'>"
							+ "<img src='images/bedEmpty1.png' width='35px' height='20px'"
							/*
							 * + "<img src='images/bedEmpty.png'
							 * width='60px' height='30px' "
							 */
							+ " onclick=swapImages('newBed',"+r.lstPatientBedInfoDTO[i].bedId+",0) /> "
							+ "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label></div>"
							+ "</div> "
							
							+ "<input type='hidden' id='normalIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoBedCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoHallCharges+"'>"
							+ "<input type='hidden' id='normalIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoNursingCharges+"'>"
							+ "<input type='hidden' id='normalBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalBedCharges+"'>"
							+ "<input type='hidden' id='sponsorBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorHallCharges+"'>"
							+ "<input type='hidden' id='normalNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorNursingCharges+"'>"
							+ "</td>";
					
					availableBedCount++;

				} else if (r.lstPatientBedInfoDTO[i].idbedstate == '3') {
					
					var bedAllocatedForBedName = "";
				
					if(callFrom == "shiftBed" && patientBedId == r.lstPatientBedInfoDTO[i].bedId){
						
						bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOcc1.png' width='30px' height='25px' "
							+ "   onclick=swapImages('shiftBed',"+r.lstPatientBedInfoDTO[i].bedId+",0) /> "						
							+ "<label class='TextFont' style='color: white;'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label></div>";		
						
						shiftBedId = r.lstPatientBedInfoDTO[i].bedId;
						
					}else{
						
						bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOcc1.png' width='30px' height='25px' "
							+ " /> "						
							+ "<label class='TextFont' style='color: white;'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label></div>";
					}

					bedList = bedList
						+ "<td>";
						
						if(callFrom == "shiftBed"  && patientBedId == r.lstPatientBedInfoDTO[i].bedId){
							
							bedList = bedList + "<div class='centerDiv bed' style='width: 170px; min-height: 210px;animation: blink 1s; background-color: rgb(00, 114, 198); border: 3px solid rgb(185, 74, 72); padding: 5px;border-radius: 10px;box-shadow: 8px 8px 8px #888;' id='bbed"
									+ r.lstPatientBedInfoDTO[i].bedId + "'> ";
						}else{
							
							bedList = bedList + "<div class='bed' style='width: 160px; min-height: 200px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);padding: 5px;border-radius: 10px;box-shadow: 8px 8px 8px #888;' id='bbed"
							+ r.lstPatientBedInfoDTO[i].bedId + "'> ";
						}
						
					bedList = bedList + "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>"						
						+ r.lstPatientBedInfoDTO[i].patientName  
						+ "</label>"
						
						+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>UHId : "
						+ r.lstPatientBedInfoDTO[i].centerPatientId 
						+ "</label> "
						
						+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Admited Days : "
						+ r.lstPatientBedInfoDTO[i].admitDays
						+ "</label> "
						
						+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Mrn No : "
						+ r.lstPatientBedInfoDTO[i].mrnNo
						+ "</label> "
						+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>In Date : "
						+ r.lstPatientBedInfoDTO[i].inDateTime
						+ "</label>"
						
						+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Hall : "
						+ r.lstPatientBedInfoDTO[i].wardName 
						+ "</label>"
						
						+ bedAllocatedForBedName
						
						+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor: "
						+ r.lstPatientBedInfoDTO[i].doctorName
						+ "</label>";
					
					// for Sponsored Patent Type
								var redDot = "";
								var pay="";
								if(r.lstPatientBedInfoDTO[i].charges_slave_id==0)
									{
										bedList += "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: -2px;font-size: 9px;'>Self Pay</label>";
									}
								else
									{
										bedList += "<label class='TextFont'  style='width: 148px; height: 15px; color: white; margin-bottom: -2px; height: 15px;font-size: 9px;'>Sponsor Name:"
													+ r.lstPatientBedInfoDTO[i].category_name 
													+ "</label>"
													+"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: -2px;font-size: 9px;'>Sponsor Pay</label>";
									}
									
						bedList += "</div>";
						
						bedList += "<input type='hidden' id='normalIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoBedCharges+"'>"
						+ "<input type='hidden' id='sponsorIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoHallCharges+"'>"
						+ "<input type='hidden' id='normalIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoNurseCharges+"'>"
						+ "<input type='hidden' id='sponsorIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoNursingCharges+"'>"
						+ "<input type='hidden' id='normalBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalBedCharges+"'>"
						+ "<input type='hidden' id='sponsorBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorHallCharges+"'>"
						+ "<input type='hidden' id='normalNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalNurseCharges+"'>"
					//	+ "<input type='hidden' id='sponsorNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorNursingCharges+"'>"				
						+ "<input type='hidden' id='sponsorNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorNursingCharges+"'>"
						+ "</td>";
					
					allocatedBedCount++;
				}

				rowCount++;
				if(rowCount == 10){
					
					bedList = bedList + "</tr>";
					rowCount = 0;
				}
			} // end for each function
			
			bedList = bedList + "</tbody> </table>";
			$("#allbeds").html(bedList);
			
			$("#totalBeds").text(allBedCount);
			$("#allocatesBeds").text(allocatedBedCount);
			$("#AvailableBeds").text(availableBedCount);
			$("#cleaningBeds").text(cleaningBedCount);
		//}	
	
	}
}


function getWardTypeListForBillableBed(){

	var hallTypeId = $("#wardTypeSelectIDBB").val();
	
	if(!(hallTypeId >= 0))
		hallTypeId = 0;
	
	var inputs = [];
	inputs.push('hallTypeId=' + encodeURIComponent(hallTypeId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getWardTypeList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setWardTypeListForBillableBed(r,hallTypeId);
		}
	});
}

function setWardTypeListForBillableBed(r,hallTypeId){
	
	var htm = "";
	if(hallTypeId > 0)
		htm = "<option value='0'>-- Select Ward Name --</option>";
	else
		htm = "<option value='0'>-- Select Ward Type --</option>";
	
	for (var i=0;i<r.lstChargesSlave.length;i++)	{
		
		htm = htm + "<option value="+r.lstChargesSlave[i].slaveId+">"+r.lstChargesSlave[i].categoryName+"</option>";
	}
	
	if(hallTypeId > 0){
		$("#hallTypeSelectIDBB").html(htm);
		$("#hallTypeSelectIDBB").select2();
	}else{
		$("#wardTypeSelectIDBB").html(htm);
		$("#wardTypeSelectIDBB").select2();
	}
}

function getBillableBedCharges(){

	var chargesSlaveId = $("#chargesSlaveId").val();
	var id = $("#hallTypeSelectIDBB").val();
	var callFrom = "";
		
	var inputs = [];
	inputs.push('chargesSlaveId=' + encodeURIComponent(chargesSlaveId));
	inputs.push('hallId=' + encodeURIComponent(id));
	inputs.push('callFrom=' + encodeURIComponent(callFrom));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getBillableBedCharges",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setBillableBedCharges(r);
		}
	});
}

function setBillableBedCharges(r){
	
	var htm = "";
	
	htm = htm + "<input type='hidden' id='normalIsolationBedCharges0' value='"+r.lstPatientBedInfoDTO[0].isoBedCharges+"'>"
	+ "<input type='hidden' id='sponsorIsolationBedCharges0' value='"+r.lstPatientBedInfoDTO[0].sponsorIsoHallCharges+"'>"
	+ "<input type='hidden' id='normalIsolationNursingCharges0' value='"+r.lstPatientBedInfoDTO[0].isoNurseCharges+"'>"
	+ "<input type='hidden' id='sponsorIsolationNursingCharges0' value='"+r.lstPatientBedInfoDTO[0].sponsorIsoNursingCharges+"'>"
	+ "<input type='hidden' id='normalBedCharges0' value='"+r.lstPatientBedInfoDTO[0].normalBedCharges+"'>"
	+ "<input type='hidden' id='sponsorBedCharges0' value='"+r.lstPatientBedInfoDTO[0].sponsorHallCharges+"'>"
	+ "<input type='hidden' id='normalNursingCharges0' value='"+r.lstPatientBedInfoDTO[0].normalNurseCharges+"'>"
	+ "<input type='hidden' id='sponsorNursingCharges0' value='"+r.lstPatientBedInfoDTO[0].sponsorNursingCharges+"'>";
	
	$("#divBillableBedChargesHiddenFields").html(htm);	
}

function getWardTypeListForPhyDischarge(){

	var hallTypeId = $("#wardTypeHall1").val();
	
	if(!(hallTypeId >= 0))
		hallTypeId = 0;
	
	var inputs = [];
	inputs.push('hallTypeId=' + encodeURIComponent(hallTypeId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getWardTypeList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setWardTypeListForPhysical(r,hallTypeId);
		}
	});
}

function setWardTypeListForPhysical(r,hallTypeId){
	
	var htm = "";
	if(hallTypeId > 0)
		htm = "<option value='0'>-- Select Ward Name --</option>";
	else
		htm = "<option value='0'>-- Select Ward Type --</option>";
	
	for (var i=0;i<r.lstChargesSlave.length;i++)	{
		
		htm = htm + "<option value="+r.lstChargesSlave[i].slaveId+">"+r.lstChargesSlave[i].categoryName+"</option>";
	}
	if(hallTypeId > 0)
		$("#wardName1").html(htm);
	else
		$("#wardTypeHall1").html(htm);
}

//Added By Badrinath For Bed MIS List View 
function createListView(r,callFrom)
{
	$("#allbeds").html(' ');
	
	var allBedCount = 0;
	var allocatedBedCount = 0;
	var cleaningBedCount = 0;
	var availableBedCount = 0;

	if (r.lstPatientBedInfoDTO.length > 0) {

		var bedList = "<div class='col-sm-12'>"
				+ "<table class='table table-striped table-bordered cf' style='width: 1131px;overflow-y: scroll; max-height: auto;'>"
				+ "<thead class='cf'>"
				+ "<tr>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>#</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Ward</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Bed No.</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Status</label></th>"
				+ "		<th class='col-md-2-1'><label class='TextFont'>Patient Name</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>MRN No.</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Age / Gender</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Bed Alloc. Date</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Discharge Date</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Pay Type</label></th>"
				/*+ "		<th class='col-md-1-1'><label class='TextFont'>Action</label></th>"*/
				+ "	</tr>"
				+ "	</thead>"
				+ "<tbody>";

		var count = 1;

		$
				.each(
						r.lstPatientBedInfoDTO,
						function(name, lstPatientBedInfoDTO) {

							bedList = bedList + "<tr>";

							bedList = bedList
									+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
									+ count++ + ".</td>";
							bedList = bedList
									+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
									+ r.lstPatientBedInfoDTO[0].wardName + "</td>";
							bedList = bedList
									+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
									+ lstPatientBedInfoDTO.bedId + "</td>";

							if (lstPatientBedInfoDTO.idbedstate == '2') { // Cleaning

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: orange; color: white; padding: 5px 3px;'> Cleaning </div>"
										+ " </td>";
								
								cleaningBedCount++;

							} else if (lstPatientBedInfoDTO.idbedstate == '3') { // Allocated

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: rgb(00, 114, 198); color: white; padding: 5px 3px;'> Allocated </div>"
										+ " </td>";
								
								allocatedBedCount++;
								
							} else if (lstPatientBedInfoDTO.idbedstate == '4') { // Available

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: rgb(34, 177, 77); color: white; padding: 5px 3px;'> Available </div>"
										+ " </td>";
								
								availableBedCount++;
							}
							
							bedList = bedList
							+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
							+ lstPatientBedInfoDTO.patientName + "</td>";
							
							bedList = bedList
							+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
							+ lstPatientBedInfoDTO.mrnNo + "</td>";
							
							bedList = bedList
							+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
							+ lstPatientBedInfoDTO.age  +"/"+ lstPatientBedInfoDTO.gender+ "</td>";
							
							bedList = bedList
							+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
							+ lstPatientBedInfoDTO.inDateTime + "</td>";
							
							bedList = bedList
							+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
							+ lstPatientBedInfoDTO.discharge_date + "</td>";			
							
							/*bedList = bedList
							+ "<td class='col-sm-1-1' style='height: 21.5px;'>-</td>";*/
							
							// for Sponsored Patent Type
							
							if(lstPatientBedInfoDTO.charges_slave_id==0)
								{
									bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>Self Pay</td>";
								}
							else if(lstPatientBedInfoDTO.charges_slave_id>0)
								{
									bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>Sponsor Pay</td>";
								}
							else 
							{
								bedList = bedList
									+ "<td class='col-sm-1-1' style='height: 21.5px;'>-</td>";
							}
                            
							bedList = bedList + "</tr>";
							
							allBedCount++;
							
						}); // end for each function

		bedList = bedList + "</tbody>" + "</table>" + "</div>";

		$("#allbeds").html(bedList);
		
		$("#totalBeds").text(allBedCount);
		$("#allocatesBeds").text(allocatedBedCount);
		$("#AvailableBeds").text(availableBedCount);
		$("#cleaningBeds").text(cleaningBedCount);
	}

}