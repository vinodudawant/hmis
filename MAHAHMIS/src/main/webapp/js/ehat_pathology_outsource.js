/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Fetch sample name.
 *********************************************************/
function getsamplename() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/diagnostics/getsamplename",
		success : function(r) {
			setTemplatelabname(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set sample name.
 *********************************************************/
function setTemplatelabname(r){		
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.testSamplelist.length; int++) {
		list=list+'<option value="'+(r.testSamplelist[int].idTestSample)+'">'+(r.testSamplelist[int].sampleName)+'</option>';		
	}	
	$("#sampleId").html(list);	
	$("#sampleId").select2();
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Fetch Unit name.
 *********************************************************/
function getsampleUnit() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/diagnostics/getsampleUnit",
		success : function(r) {
			setTemplatesampleunit(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set Unit name.
 *********************************************************/
function setTemplatesampleunit(r){		
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.unitTypeList.length; int++) {
		list=list+'<option value="'+(r.unitTypeList[int].idunitType)+'">'+(r.unitTypeList[int].unitName)+'</option>';		
	}	
	$("#sampleUnitId").html(list);	
	$("#sampleUnitId").select2();
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set patient Information.
 *********************************************************/
function setTempateOnPatientinformation(treatmentId)
{
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
			"callform" : treatmentId
		},
        url : "ehat/registration/fetchPatientsRecordByTreatmentId",
        success : function(r) {
            if (r.listRegTreBillDto.length > 0) {           
                $('#patientName').text(r.listRegTreBillDto[0].patientName);
                $("#age").text(r.listRegTreBillDto[0].age);
                $("#billNo").text(r.listRegTreBillDto[0].billId);
                $("#corporateid").text(r.listRegTreBillDto[0].categoryName);
                $("#doa").text(getFormatedDate(new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString().split(",")[0]));
                $("#sex").text(r.listRegTreBillDto[0].gender);    
                $("#consultingDoctor").text(r.listRegTreBillDto[0].billId);
                $("#corporate").text(r.listRegTreBillDto[0].docNameChan);
                $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
                $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
                $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
                $("#patientId").text(r.listRegTreBillDto[0].patientId);
                $("#uId").val(r.listRegTreBillDto[0].unitId);
                $("#bill_Id").val(r.listRegTreBillDto[0].billId);
                $("#mobile").text(r.listRegTreBillDto[0].mobile);
                $("#addressheader").text(r.listRegTreBillDto[0].address);              
                $('#patientNameconsent').val(r.listRegTreBillDto[0].patientName);
                $("#addressconsent").val(r.listRegTreBillDto[0].address);
                $("#reletiveconsent").val(r.listRegTreBillDto[0].relativeName);
                $("#digNo").text(r.listRegTreBillDto[0].trcount);
                
                // adding routine value 
                
                $("#patientname").val(r.listRegTreBillDto[0].patientName);              
                $('#patientsex').val(r.listRegTreBillDto[0].gender);
                $("#patientAge").val(r.listRegTreBillDto[0].age);
                $("#address").val(r.listRegTreBillDto[0].address);
                $("#patienttype").text(r.listRegTreBillDto[0].trcount);
                $('#patientgander').val(r.listRegTreBillDto[0].gender);
                $("#addressNew").text(r.listRegTreBillDto[0].address);
                
            }
        }
    });  
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set TestName and Profile name.
 *********************************************************/
function FetchTestNameAndProfileName(testmasterId,treatmentId)
{
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagnostics/getAllPhlebotomyTests",
		data : {
			id : 0,
			labRequestId : testmasterId,
			treatmentId : treatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(rr) {
			// alert(rr.phlebotomytableListTestsalve.length);
			
		
	if(rr.phlebotomytableListTestsalve.length > 0){
	    jQuery.ajax({
	        async : true,
	        type : "POST",
	    	data : {
	    		"testmasterId" : testmasterId,
				"treatmentId" : treatmentId			
			},
			url : "ehat/diagnostics/fetchTestNameAndProfileName",
	        success : function(r) {
				sr1 = 1;
				testcount1 = 1;
				count1 = 1;
				protestcount1 = 1;
				pkgcount1 = 1;
				pkgprocount1 = 1;
				pkgprotestcount1 = 1;
				pkgtestcount1 = 1;
				procount1 = 1;
				totalcount1 = 1;
	    		var html = "";
	    		 var countforPk=false;
	    		
				if (r.proLi.length == 0 || r.proLi.length == null) {		
					html = html
							+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
				} else {	
					for ( var pk = 0; pk < r.proLi.length; pk++) {
			           
					html = html + "<div class='col-md-12-1'";
					html = html + "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
					html = html + "<div class='divide-10'></div>";
					
					/*html = html + "<div class='col-md-1-1'";
					html = html + "style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+ (sr1++);
					html = html + "</div>";*/
					

					html = html + "<div class='col-md-11-1'";
					html = html + " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
					html = html + " id='profileId" + (pk+1) + "' data-value='"+ r.proLi[pk].profileId +"'>"+ (sr1++)+" ) "+ r.proLi[pk].profilename + "   ";
					
					

					if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
						html = html + " - (" + r.proLi[pk].pkgName + ")";
						//Added by KishoR for check box
						html = html + '<div class="col-md-11-1" style="padding-left: 103%;">';
						html = html + ' <input type="checkbox" onclick="selectCheckBoxPackWise('+(pk+1)+')" id="checkboxAll'+(pk+1)+'">';
						html = html + '</div>';
						//
						html = html  +"</div>";
					} else {
						//Added by KishoR for check box
						html = html + '<div class="col-md-11-1" style="padding-left: 103%;">';
						html = html + ' <input type="checkbox" onclick="selectCheckBoxPackWise('+(pk+1)+')" id="checkboxAll'+(pk+1)+'">';
						html = html + '</div>';
						//
						html = html + "</div>";
					}
										
					html = html + "<div>";
					html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
					html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
					html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";
					html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].patientId +"' id='patientId1' />";
					html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].treatmentId+"' id='treatmentId1' />";
					html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].labrequestId +"' id='labrequestId1' />";
					html = html + "<tr  class='col-md-6-6' style='height:21px;'>" + "<td class='col-md-12-1'style='margin-top: -11px;'id='testDiv"+(procount1)+"'></td></tr>";						
					html = html + "</div>";
					
					for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
						countforPk=false;
						if (r.proLi[pk].testli[ts].tid != 0) {
							
							for ( var z = 0; z < rr.phlebotomytableListTestsalve.length; z++) {
                    			
                                //alert(rr.phlebotomytableListTestsalve[z].packageId);
		                    	   if( rr.phlebotomytableListTestsalve[z].packageId == r.proLi[pk].pkgId
		                            && rr.phlebotomytableListTestsalve[z].profileId == r.proLi[pk].profileId
		                            )
		                        		{  
		                    		   
		                    		    if(rr.phlebotomytableListTestsalve[z].testflag == "Y" 
			                            	  && rr.phlebotomytableListTestsalve[z].testid == r.proLi[pk].testli[ts].testId
			                            	  ){
		                    		    	//alert("in");
		                    		    	countforPk=true;
		                    		    	break;
			                              	
			                              }
			                             }             
		                          } 
		                             	
		                             	if(countforPk){
		                             		//alert("in");
		                             		html = html + "<tr style='height:25px'>" + "<td id='testname'><font color='#fa1805'>"+(r.proLi[pk].testli[ts].testname)+"</font></td>";			 
		        							html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' disabled='disabled'  value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+","+(r.proLi[pk].testli[ts].lowvalue)+","+(r.proLi[pk].testli[ts].highvalue)+","+(r.proLi[pk].testli[ts].abnormalvalue)+","+(r.proLi[pk].testli[ts].upperhigh)+"' onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";

		                             	}else{
		                             		html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td>";    
			                            	  html = html + "<td id='testIdd'><input class='testCheckBox"+(pk+1)+"' id='testid" + (pk+1) + (ts+1) + "' type='checkbox' value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+","+(r.proLi[pk].testli[ts].lowvalue)+","+(r.proLi[pk].testli[ts].highvalue)+","+(r.proLi[pk].testli[ts].abnormalvalue)+","+(r.proLi[pk].testli[ts].upperhigh)+"'onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";
			                            	 /* 
			                            	  html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td>";			                                  html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' checked=checked value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"'></td></tr>";
			        							html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";
*/
			                            	 
		                             	}
					
							//html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td>";
	 			        	
							//html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' checked value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";
			
							//html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";

							/*html = html + "<td class='col-md-6-2'style='height: 28px;display: none;'id='patientId" + (pk+1) + (ts+1) + "'><input id='patientId" +  (pk+1) + (ts+1) + "'  type='hidden'  value='"+(r.proLi[pk].testli[ts].patientId)+"'></td>";
							html = html + "<td class='col-md-6-2'style='height: 28px;display: none;'id='treatmentId" + (pk+1) + (ts+1) + "'><input id='treatmentId" +  (pk+1) + (ts+1) + "'  type='hidden'  value='"+(r.proLi[pk].testli[ts].treatmentId)+"'></td>";
							html = html + "<td class='col-md-6-2'style='height: 28px;display: none;'id='labrequestId" + (pk+1) + (ts+1) + "'><input id='labrequestId" +  (pk+1) + (ts+1) + "'  type='hidden'  value='"+(r.proLi[pk].testli[ts].labrequestId)+"'></td>";
				        */
						}
					}	
				}
					$("#itemMasterRecordsList").html(html);
				}			
	        }
	    }); 
	}else{
	    jQuery.ajax({
	        async : true,
	        type : "POST",
	    	data : {
	    		"testmasterId" : testmasterId,
				"treatmentId" : treatmentId			
			},
			url : "ehat/diagnostics/fetchTestNameAndProfileName",
	        success : function(r) {
				sr1 = 1;
				testcount1 = 1;
				count1 = 1;
				protestcount1 = 1;
				pkgcount1 = 1;
				pkgprocount1 = 1;
				pkgprotestcount1 = 1;
				pkgtestcount1 = 1;
				procount1 = 1;
				totalcount1 = 1;
	    		var html = "";
	    		
				if (r.proLi.length == 0 || r.proLi.length == null) {		
					html = html
							+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
				} else {	
				
					for ( var pk = 0; pk < r.proLi.length; pk++) {
			           
					html = html + "<div class='col-md-12-1'";
					html = html + "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
					html = html + "<div class='divide-10'></div>";
					
					/*html = html + "<div class='col-md-1-1'";
					html = html + "style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+ (sr1++);
					html = html + "</div>";*/

					html = html + "<div class='col-md-11-1'";
					html = html + " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
					html = html + " id='profileId" + (pk+1) + "' data-value='"+ r.proLi[pk].profileId +"'> "+ (sr1++)+" ) "+ r.proLi[pk].profilename + "   ";

					if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
						html = html + " - (" + r.proLi[pk].pkgName + ")";
						//Added by KishoR for check box
						html = html + '<div class="col-md-11-1" style="padding-left: 103%;">';
						html = html + ' <input type="checkbox" checked=checked onclick="selectCheckBoxPackWise('+(pk+1)+')" id="checkboxAll'+(pk+1)+'">';
						html = html + '</div>';
						//
						html = html  +"</div>";
					} else {
						//Added by KishoR for check box
						html = html + '<div class="col-md-11-1" style="padding-left: 103%;">';
						html = html + ' <input type="checkbox" checked=checked onclick="selectCheckBoxPackWise('+(pk+1)+')" id="checkboxAll'+(pk+1)+'">';
						html = html + '</div>';
						//
						html = html + "</div>";
					}
					html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
					html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
					html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";
					html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].patientId +"' id='patientId1' />";
					html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].treatmentId+"' id='treatmentId1' />";
					html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].labrequestId +"' id='labrequestId1' />";
					
					html = html + "<tr  class='col-md-6-6' style='height:21px;'>" + "<td class='col-md-12-1'style='margin-top: -11px;'id='testDiv"+(procount1)+"'></td></tr>";						
	
					html = html + "</div>";
					
					for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
						if (r.proLi[pk].testli[ts].tid != 0) {
					
							html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td>";
	 			        	
							//html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' checked value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";
			
							html = html + "<td id='testIdd'><input class='testCheckBox"+(pk+1)+"' id='testid" + (pk+1) + (ts+1) + "' type='checkbox' checked=checked value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+","+(r.proLi[pk].testli[ts].lowvalue)+","+(r.proLi[pk].testli[ts].highvalue)+","+(r.proLi[pk].testli[ts].abnormalvalue)+","+(r.proLi[pk].testli[ts].upperhigh)+"' onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";

							/*html = html + "<td class='col-md-6-2'style='height: 28px;display: none;'id='patientId" + (pk+1) + (ts+1) + "'><input id='patientId" +  (pk+1) + (ts+1) + "'  type='hidden'  value='"+(r.proLi[pk].testli[ts].patientId)+"'></td>";
							html = html + "<td class='col-md-6-2'style='height: 28px;display: none;'id='treatmentId" + (pk+1) + (ts+1) + "'><input id='treatmentId" +  (pk+1) + (ts+1) + "'  type='hidden'  value='"+(r.proLi[pk].testli[ts].treatmentId)+"'></td>";
							html = html + "<td class='col-md-6-2'style='height: 28px;display: none;'id='labrequestId" + (pk+1) + (ts+1) + "'><input id='labrequestId" +  (pk+1) + (ts+1) + "'  type='hidden'  value='"+(r.proLi[pk].testli[ts].labrequestId)+"'></td>";
				        */
						}

					}	

				}
					$("#itemMasterRecordsList").html(html);
				}			
				
	        }
	    }); 
	}
		}
	}); 
}
/*********************************************************
 * @author Ajay khandare
 * @date 11_Feb_2020
 * @Code This function is save phlebotomylabtest.
 *********************************************************/
function savePhlebotomyLabTest() {
   
	//$('input[type="saveId"]').attr('disabled','disabled');
	
    var id = $('#id').val();	
	var centerid =$('#centerid').val();	
	var sampleId = $('#sampleId').val();
	var collectionDate =$('#collectionDate').val();
	var collectiontime = $('#collectiontime').val();
	var containerId =$('#containerId').val();
	var sampleQuantityId = $('#sampleQuantityId').val();
	var sampleUnitId =$('#sampleUnitId').val();
	var adviceId = $('#adviceId').val();
	var patientId = $("#patientId1").val();
	var labrequestId = $("#labrequestId1").val();
	var treatmentId = $("#treatmentId1").val();
	var testStatus="P";
	var stickersid=$("#stickersid").val();
	var printBarcode="N";
	 if ($('#printBarcodeId').is(":checked")) {
		 printBarcode="Y";
	 }
	
	 if (centerid == "" || centerid == null || centerid == undefined || centerid == "0") {
			centerid = 0;
			alert("Select center Name");
			return false;
		}
	
	if (sampleId == "" || sampleId == null || sampleId == undefined || sampleId == "0") {
		sampleId = 0;
		alert("Select Sample Name");
		return false;
	}
	
	if (collectionDate == "" || collectionDate == null || collectionDate == undefined || collectionDate == "0") {
		collectionDate = 0;
		alert("Select collection Date ");
		return false;
	}
	
	if (collectiontime == "" || collectiontime == null || collectiontime == undefined || collectiontime == "0") {
		collectiontime = 0;
		alert("Select collection Time  ");
		return false;
	}
	
	if (containerId == "" || containerId == null || containerId == undefined || containerId == "0") {
		containerId = 0;
		alert("Select container Name  ");
		return false;
	}
	
	var pattern = /^([0-9])*$/;
	if (sampleQuantityId == 0 || sampleQuantityId == null || sampleQuantityId == undefined || (!pattern.test(sampleQuantityId))) {
		alert("Select Sample Quantity in digits");
		return false;
	}

	if (sampleUnitId == "" || sampleUnitId == null || sampleUnitId == undefined || sampleUnitId == "0") {
		sampleUnitId = 0;
		alert("Select sample Unit  ");
		return false;
	}
	
	
	// save data phlebotomymaster table 
	var phlebotomytable = {
			phlebotomytableList : []
		}; 
	 phlebotomytable.phlebotomytableList.push({
		        "id" : id,		      
				"sampleType" : sampleId,
			    "centerId" : centerid,
				"collectionDate" : collectionDate,
				"collectionTime" : collectiontime,
				"containerId" : containerId,
				"sampleQuantity" : sampleQuantityId,
				"sampleUnitId" : sampleUnitId,
				"adviceId" : adviceId,
				"patientId" : patientId,
				"labrequestId" : labrequestId,
				"treatmentId" : treatmentId,
				"teststatus" : testStatus
	});
	 // save data phlebotomysalve table 
	var proLength = $("#proLength").val();
	var testLength="";	
	var phlebotomyprofileid = $('#phlebotomyprofileid').val();
	var phlebotomyprofiletestid = $('#phlebotomyprofiletestid').val();
	var CheckCount=0;
	
	var countNumberTest=0;
	var phlebotomytablesalve = {
			phlebotomytableListsalve : []
		};	
	var phlebotomytableTestsalve = {
			phlebotomytableListTestsalve : []
		};
		
	for ( var j = 1; j <= proLength; j++) 		
	{		
		testLength = $("#testLength"+j).val();
	   for ( var i = 1; i <= testLength; i++)
		  {			  		   
		   countNumberTest = Number(countNumberTest +1);
			 if ($('#testid'+j+i).is(":checked")) {				 				
				 CheckCount = Number(CheckCount +1);			 				 
				 var pkgtestId = $("#testid"+j+i).val();		 
				 var pkgprofiletestId=pkgtestId.split(",");				
				 var pkgId=pkgprofiletestId[0];
				 var profileId=pkgprofiletestId[1];	
				 var testId=pkgprofiletestId[2];
				 var lowvalue=pkgprofiletestId[3];
				 var highvalue=pkgprofiletestId[4];
				 var abnormalvalue=pkgprofiletestId[5];
				 var upperhigh=pkgprofiletestId[6];
				 var testflag="";
				 testflag = "Y";// it is checked
				 phlebotomytableTestsalve.phlebotomytableListTestsalve.push({
					    "phlebotomyprofiletestid" : phlebotomyprofiletestid,
					    "packageId" : pkgId,
					    "profileId" : profileId,				
						"testid" : testId,
						"testflag" : testflag,
						"patientId" : patientId,
						"labrequestId" : labrequestId,
						"treatmentId" : treatmentId,
						"lowvalue" : lowvalue,
						"highvalues" : highvalue,
						"criticallowvalue" : abnormalvalue,
						"criticalhighvalue" : upperhigh,
				});
				
				
				}
			 
		}
	}
   // alert(countNumberTest);
    
    //return false;
	if(CheckCount > 0){
		document.getElementById("primeLoader").style.display = "block";
		var phlebotomyList = JSON.stringify(phlebotomytable);			
		var phlebotomyListsalve = JSON.stringify(phlebotomytablesalve);
		var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);

		var inputs = [];	
		inputs.push('phlebotomyList=' + phlebotomyList);
		inputs.push('phlebotomyListsalve=' + phlebotomyListsalve);
		inputs.push('phlebotomyListTestsalve=' + phlebotomyListTestsalve);
		inputs.push('countNumberTest=' + countNumberTest);
		inputs.push('labreqId=' + labrequestId);
		var str = inputs.join('&');
		jQuery.ajax({
			type : "POST",
			url : "ehat/diagnostics/savePhlebotomyLabTest",
			data : str + "&reqType=AJAX",
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if (r == 1) {
					
					alertify.success("Record Saved successfully..!");

					document.getElementById("primeLoader").style.display = "none";	
				} else if (r == 2) {
					
					alertfy.success("Record Updated successfully..!");

					document.getElementById("primeLoader").style.display = "none";	
				} else {
					alertfy.error("Network Issue!");
				}
			 FetchTestNameAndProfileName(labrequestId,treatmentId)	;
			 getPhlebotomySampleWise(labrequestId,treatmentId,stickersid);	
			 generateBarcodePrint2(printBarcode);
			 refreshPhlebotomyLabTest();
			}
		});
	}else{
		alertify.error("Please Select At Least One Test!");
	}
	
	//window.location.reload(true);
}
function refreshPhlebotomyLabTest()
{
	$('#centerid').val(0);
	$('#sampleId').val(0);
	$('#collectionDate').val('');
	$('#collectiontime').val('');
	$('#containerId').val(0);
	$('#sampleQuantityId').val('');
	$('#sampleUnitId').val(0);
	$('#adviceId').val('');
	
}

/***********************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code Fetching data
 ***********************************************************/
function getPhlebotomySampleWise(labrequestId,treatmentId,stickersid) {
	
	  jQuery.ajax({
	        async : false,
	        type : "POST",
	    	data : {
	    		"testmasterId" : labrequestId,
				"treatmentId" : treatmentId			
			},
			url : "ehat/diagnostics/getPhlebotomySampleWise",
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {	
					var id = r.phlebotomytableList[i].id;
					var sampleName = r.phlebotomytableList[i].samplename;
					var collectionDate = r.phlebotomytableList[i].collectionDate;
					var collectionTime = r.phlebotomytableList[i].collectionTime;
					var collectionCenter = r.phlebotomytableList[i].collectionname;
					htmBody = htmBody + "<tr>"
							+ "<td class='col-md-1 center'>" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].samplename+ "</td>" 
							+ "<td class='col-md-1 center'>" +collectionDate+ "</td>" 
							+ "<td class='col-md-1 center'>" +collectionTime+ "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].containername+  "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].unitname+ "</td>" 
							+ "<td class='col-md-1 center'>" +collectionCenter+ "</td>";
							
					     	if(r.phlebotomytableList[i].accpetedflag=="Y")	
							{
					     		htmBody = htmBody		+"<td class='col-md-1 center'>"												
							+ "<button class='btn btn-xs btn-success' disabled='disabled' onclick=editPhlebotomyRecord('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
							}else
							{
								htmBody = htmBody	+"<td class='col-md-1 center'>"												
								+ "<button class='btn btn-xs btn-success' onclick=editPhlebotomyRecord('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
								
							}
					     	htmBody = htmBody 	+ "<td  class='col-md-1 center'> <button class='btn btn-xs btn-warning' " 
							+'onclick="generateBarcodePopup('+id+ ',\'' +sampleName+'\',\'' +collectionDate+'\',\'' +collectionTime+'\',\'' +collectionCenter+'\')" '+"><i class='fa fa-barcode' ></i></button></a> </td></tr>";
					//alert(r.phlebotomytableList[i].id);
					$("#testName").val(r.phlebotomytableList[i].samplename);
					$("#testId").val(r.phlebotomytableList[i].id);
					$("#txtBarcodecnt").val(stickersid);
				}
			}
			$("#itemsamplephlebotomy").html(htmBody);
			
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Fetch Collection Center.
 *********************************************************/
function getListCollectionName() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/diagnostics/getListCollectionName",
		success : function(r) {
			setTemplateCollectionCenter(r);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Fetch sample container.
 *********************************************************/
function getListsampleContainer() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/diagnostics/getListsampleContainer",
		success : function(r) {
			setTemplatesamplecontainer(r);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set Collection Center.
 *********************************************************/
function setTemplateCollectionCenter(r){		
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.lstCollectionCenterMaster.length; int++) {
		list=list+'<option value="'+(r.lstCollectionCenterMaster[int].id)+'">'+(r.lstCollectionCenterMaster[int].centerName)+'</option>';		
	}	
	$("#centerid").html(list);
	$("#centerid").select2();
}


/***********************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code Fetching data
 ***********************************************************/
function getProcessAreaRecordTab() {
	var inputs=[];
	var callFrom="P";
	var startIndex = 0;
	
	var patientType =document.querySelector('input[name="processPatientType"]:checked').value;
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	  jQuery.ajax({
		  	type : "POST",
	        async : true,
	        data : str + "&reqType=AJAX",
			url : "ehat/diagnostics/getProcessAreaRecordTab",
			success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {
					var id = r.phlebotomytableList[i].id;
					var sampleName = r.phlebotomytableList[i].samplename;
					var collectionDate = r.phlebotomytableList[i].collectionDate;
					var collectionTime = r.phlebotomytableList[i].collectionTime;
					var collectionCenter = r.phlebotomytableList[i].collectionname;
					
					var patientName = r.phlebotomytableList[i].patientname;
					var patientId = r.phlebotomytableList[i].patientId;
					var age = r.phlebotomytableList[i].age;
					var sex = r.phlebotomytableList[i].gender;
					
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname +"<input type='hidden' id='patientName"+id+"' value='"+patientName+"'/></td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId +"<input type='hidden' id='patientId"+id+"' value='"+patientId+"'/></td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname +"<input type='hidden' id='age"+id+"' value='"+age+"'/></td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+"<input type='hidden' id='sex"+id+"' value='"+sex+"'/></td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 							
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";
					htmBody = htmBody + "<input type='hidden' value='"+ r.phlebotomytableList.length+"' id='processsArealistLength' />";

					htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
			
			     	htmBody = htmBody 	+ "<td  class='col-md-1 center'> <button class='btn btn-xs btn-warning' " 
					+'onclick="openBarcodePopup('+id+ ',\'' +sampleName+'\',\'' +collectionDate+'\',\'' +collectionTime+'\',\'' +collectionCenter+'\')" '+"><i class='fa fa-barcode' ></i></button></a> </td>";
					
				if(r.phlebotomytableList[i].teststatus=="P" && r.phlebotomytableList[i].accpetedflag=="Y"){
					htmBody = htmBody+ "<td class='col-md-1 center'>" 
				 		+ "<button class='btn btn-xs btn-success'><i class='fa fa-check' aria-hidden='true'style='width:60px;'></i></button></td>";	
					
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					        + "<button class='btn btn-xs btn-success' disabled='disabled' onclick=editProcessArea('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
					
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					    + "<button class='btn btn-xs btn-primary' onclick=routineValuefetch('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					 
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox"  disabled="disabled" value="'+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].treatmentId+'"  name="outsourceCheckbox" id="outsourceCheckbox'+ i + '"   onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';
				}else if(r.phlebotomytableList[i].teststatus=="P" && r.phlebotomytableList[i].accpetedflag=="N"){
					
					  htmBody = htmBody+ "<td class='col-md-1 center'>" 
				 		+ "<button class='btn btn-xs btn-danger'><i class='fa fa-times' aria-hidden='true'style='width:60px;'></i></button></td>";	
					
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					        + "<button class='btn btn-xs btn-success' onclick=editProcessArea('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
					 
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					    + "<button class='btn btn-xs btn-primary' onclick=routineValuefetch('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					 
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value="'+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].treatmentId+'"  name="outsourceCheckbox" id="outsourceCheckbox'+ i + '"   onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';
					}
				}
			}
			$("#diagnosticProcessAreaId").html(htmBody);
	  	
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0){
				$('#processAreaNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			}else{
				$('#processAreaNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#processAreaJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='processAreaPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#processAreaPagination').html(numberOfRows);
	  	}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to routine Value fetch.
 *********************************************************/
function routineValuefetch(id,treatmentId,labrequestId,teststatus,acceptedFlag){
	if(teststatus=="P" && acceptedFlag=="Y"){
		window.location.href = "pathology_phlebotomyResult.jsp?id=" + id+ "&testmasterId=" + labrequestId + "&treatmentId=" + treatmentId;

	}else if(teststatus=="P" && acceptedFlag=="N"){
		alertify.error("Please perform  Acceptance / Reject process");
	}
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set sample container.
 *********************************************************/
function setTemplatesamplecontainer(r){		
	var list="<option value='0'>--Select--</option>";	
	for ( var int = 0; int < r.sampleContainerList.length; int++) {
		list=list+'<option value="'+(r.sampleContainerList[int].idSampleConatiner)+'">'+(r.sampleContainerList[int].conatinerName)+'</option>';		
	}	
	$("#containerId").html(list);	
	$("#containerId").select2();
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to forwaord page to process area.
 *********************************************************/
function editProcessArea(id,labrequestId, treatmentId) {
	
	window.location.href = "pathology_processArea.jsp?id=" + id+ "&testmasterId=" + labrequestId + "&treatmentId=" + treatmentId;

	//window.location.href = "pathology_processArea.jsp?id="+id+"&testmasterId=" + testmasterId+ "&treatmentId=" + treatmentId;
}

/*********************************************************
 * @author Ganesh Patil
 * @date 13_Feb_2020
 * @Code This function is use to edit Phlebotomy Record.
 *********************************************************/
function editPhlebotomyRecord(id,labRequestId,treatmentId){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/diagnostics/editPhlebotomyRecord",
		data : {
			id : id,
			labRequestId : labRequestId,
			treatmentId : treatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#id').val(r.phlebotomytableList[0].id);
		//$('#centerid').val(r.phlebotomytableList[0].centerId);
		$('#centerid').select2('val',r.phlebotomytableList[0].centerId);
		//$('#sampleId').val(r.phlebotomytableList[0].sampleType);
		$('#sampleId').select2('val',r.phlebotomytableList[0].sampleType);
		$('#collectionDate').val(r.phlebotomytableList[0].collectionDate);
		$('#collectiontime').val(r.phlebotomytableList[0].collectionTime);
		//$('#containerId').val(r.phlebotomytableList[0].containerId);
		$('#containerId').select2('val',r.phlebotomytableList[0].containerId);
		$('#sampleQuantityId').val(r.phlebotomytableList[0].sampleQuantity);
		//$('#sampleUnitId').val(r.phlebotomytableList[0].sampleUnitId);
		$('#sampleUnitId').select2('val',r.phlebotomytableList[0].sampleUnitId);
		$('#adviceId').val(r.phlebotomytableList[0].adviceId);
		$("#patientId1").val(r.phlebotomytableList[0].patientId);
		$("#labrequestId1").val(r.phlebotomytableList[0].labrequestId);
		$("#treatmentId1").val(r.phlebotomytableList[0].treatmentId);
		
		setTestCheckBoxOnEdit(r,labRequestId,treatmentId);
		}
	});
}



/*********************************************************
 * @author Kishor Lokhande
 * @date 13_Feb_2020
 * @Code This function is use for set Test Check Box On Edit.
 *********************************************************/

function setTestCheckBoxOnEdit(t,labRequestId,treatmentId) {

    jQuery.ajax({
        async : true,
        type : "POST",
        data : {
            "testmasterId" : labRequestId,
            "treatmentId" : treatmentId            
        },
        url : "ehat/diagnostics/fetchTestNameAndProfileName",
        success : function(r) {
            sr1 = 1;
            testcount1 = 1;
            count1 = 1;
            protestcount1 = 1;
            pkgcount1 = 1;
            pkgprocount1 = 1;
            pkgprotestcount1 = 1;
            pkgtestcount1 = 1;
            procount1 = 1;
           // totalcount1 = 1;
            var html = "";
            var countforPk=false;
           
            if (r.proLi.length == 0 || r.proLi.length == null) {        
                html = html
                        + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
            } else {    
           
                for ( var pk = 0; pk < r.proLi.length; pk++) {
                	//countforPk=0;
                	
                	
                	/*for ( var x = 0; x < t.phlebotomytableList[0].phlebotomytableList[0].labPhlebotomyMasterSalveTest.length; x++) {
                 	   if( t.phlebotomytableList[0].phlebotomytableList[0].labPhlebotomyMasterSalveTest[x].packageId == r.proLi[pk].pkgId
                         && t.phlebotomytableList[0].phlebotomytableList[0].labPhlebotomyMasterSalveTest[x].profileId == r.proLi[pk].profileId)
                      	{
                 		  if(t.phlebotomytableList[0].phlebotomytableList[0].labPhlebotomyMasterSalveTest[x].testflag == "Y" && countforPk == 0){
                 	*/		 //countforPk=1;
                 		  html = html + "<div class='col-md-12-1'";
                          html = html + "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
                          html = html + "<div class='divide-10'></div>";
                         
                         /* html = html + "<div class='col-md-1-1'";
                          html = html + "style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+ (sr1++);
                          html = html + "</div>";*/

                          html = html + "<div class='col-md-11-1'";
                          html = html + " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
                          html = html + " id='profileId" + (pk+1) + "' data-value='"+ r.proLi[pk].profileId +"'> "+ (sr1++)+" ) "+ r.proLi[pk].profilename + "   ";
                                                  

                          if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
                              html = html + " - (" + r.proLi[pk].pkgName + ")</div>";
                          } else {
                              html = html + "</div>";
                              
                              /*}
                      	}
                     	}*/
                	
                }
                html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "'/>";
                html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength'/>";
                html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"'/>";
                html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].patientId +"' id='patientId1'/>";
                html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].treatmentId+"' id='treatmentId1'/>";
                html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].labrequestId +"' id='labrequestId1'/>";
               

                html = html + "</div>";
               
/*				html = html + "<tr  class='col-md-6-6' style='height:21px;'>" + "<td class='col-md-12-1'style='margin-top: -11px;'id='testDiv"+(procount1)+"'></td></tr>";						
*/
                    	
                    		 for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
                    			 countforPk=false;
                    			 
                    			 if (r.proLi[pk].testli[ts].tid != 0) {
                             	for ( var z = 0; z < t.phlebotomytableList[0].labPhlebotomyMasterSalveTest.length; z++) {

                    			
                                
                    	   if( t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].packageId == r.proLi[pk].pkgId
                            && t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].profileId == r.proLi[pk].profileId
                            )
                        		{  
                    		   
                    		    if(t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].testflag == "Y" 
	                            	  && t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].testid    == r.proLi[pk].testli[ts].testId
	                            	  ){
                    		    	countforPk=true;
                    		    	break;
	                              	
	                              }/*else{
	                          
	                            	  html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td>";    
	                            	  html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"'></td></tr>";
	                            	 
	                                  }*/
	                             }             
                          } 
                             	
                             	if(countforPk){
                             		  html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td>";
	                                  html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' checked=checked value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"'></td></tr>";
	                                 
                             	}else{
                             		html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td>";    
	                            	  html = html + "<td id='testIdd'><input id='testid" + (pk+1) + (ts+1) + "' type='checkbox' value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"'onclick=checkDuplicatePhlebotomyRecord(this.id,'"+ r.proLi[0].testli[0].labrequestId +"','"+ r.proLi[0].testli[0].treatmentId+"')></td></tr>";
	                            	 
                             	}
                    	}	
                }    

            }
                $("#itemMasterRecordsList").html(html);
            }            
           
        }
    });  

   
}



/*********************************************************
 * @author Kishor Lokhande
 * @date 15_Feb_2020
 * @Code This function is use to find duplicate edit Phlebotomy Record.
 *********************************************************/
function checkDuplicatePhlebotomyRecord(idd,labRequestId,treatmentId){
	
	 if ($("#"+idd).is(":checked")) {
		 var pkgtestId = $("#"+idd).val();
	
			 var pkgprofiletestId=pkgtestId.split(",");				
			 var pkgId=pkgprofiletestId[0];
			 var profileId=pkgprofiletestId[1];	
			 var testId=pkgprofiletestId[2];
			 		  	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagnostics/checkDuplicatePhlebotomyRecord",
		data : {
			id : 0,
			labRequestId : labRequestId,
			treatmentId : treatmentId,
			pkgId : pkgId,
			profileId : profileId,
			testId : testId,
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			//alert(r);
			if(r>0){
				$("#"+idd).prop("checked", false);
				alertify.error('This Test Already Present In Another Sample!');
			}
		}
	}); 
	}
}
/*********************************************************
 * @author Kishor Lokhande
 * @date 13_Feb_2020
 * @Code This function is use to Generete Barcode.
 *********************************************************/

function generateBarcodePopup(id,testName, collectionDate, collectionTime, collectionCenter) {
	$("#testName").val(testName);
	$("#testId").val(id);
	$("#sampleCollectionDate").val(collectionDate);
	$("#sampleCollectionTime").val(collectionTime);
	$("#sampleCollectionCenter").val(collectionCenter);
	
	$('#Counter_Batch_Pop_Up').modal("show");
	$('#Counter_Batch_Pop_Up').modal();
};

function generateBarcodePrint1(masterIdd) {
	
	masterId=$("#testId").val();
	var tempPatient = $("#patientName").text();	
	var tempAge = $("#age").text();	
	var tempTestName = $("#testName").val();
	var patientId = $("#patientId").text();
	var collectionDate = $("#sampleCollectionDate").val();
	var collectionTime = $("#sampleCollectionTime").val();
	var collectionCenter = $("#sampleCollectionCenter").val();
	
	var sex = $("#sex").text();
	var gender = "";
	if(sex == "Male")
		gender = "M";
	else if(sex == "Female")
		gender = "F";
	var count = 1;
	var centerId = 0;
	
	if ($("#txtBarcodecnt").val() != '' && $("#txtBarcodecnt").val() != null) {
		count = $("#txtBarcodecnt").val();
	}
	if(tempPatient && tempTestName)
		{
		window.open("pathology_labtest_barcode.jsp?masterId=" + masterId + "&count="
				+ count + "&tempPatient="+ tempPatient +"&tempAge="+ tempAge + "&tempTestName="+ tempTestName+ "&collectionDate="+ collectionDate+ "&collectionTime="+ collectionTime+ "&patientId="+ patientId+ "&gender="+ gender+ "&centerId="+ centerId+ "&centerName="+ collectionCenter);
		}
	
	$("#txtBarcodecnt").val('');
	$("#testName").val('');
	$("#testId").val(0);

	$('#Counter_Batch_Pop_Up').modal("hide");
}

function generateBarcodePrint2(printSticker) {
	
	if(printSticker=="Y"){
		
		masterId=$("#testId").val();
		var tempPatient = $("#patientName").text();	
		var tempAge = $("#age").text();	
		var tempTestName = $("#testName").val();
		var patientId = $("#patientId").text();
		var collectionDate = $("#collectionDate").val();
		var collectionTime = $("#collectiontime").val();
		var centerId = $('#centerid').val();	
		var sex = $("#sex").text();
		var gender = "";
		if(sex == "Male")
			gender = "M";
		else if(sex == "Female")
			gender = "F";
		
		var count = 1;
		var centerName = ""; 
			
		if ($("#txtBarcodecnt").val() != '' && $("#txtBarcodecnt").val() != null) {
			count = $("#txtBarcodecnt").val();
		}
		if(tempPatient && tempTestName)
			{
			window.open("pathology_labtest_barcode.jsp?masterId=" + masterId + "&count="
					+ count + "&tempPatient="+ tempPatient +"&tempAge="+ tempAge + "&tempTestName="+ tempTestName+ "&patientId="+ patientId+ "&gender="+ gender+ "&collectionDate="+ collectionDate+ "&collectionTime="+ collectionTime+ "&centerId="+ centerId+ "&centerName="+ centerName);
			}
		
		$("#txtBarcodecnt").val('');
		$("#testName").val('');
		$("#testId").val(0);

		$('#Counter_Batch_Pop_Up').modal("hide");
	}
	
}
/***********************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code Fetching data
 ***********************************************************/
function getProcessAreaWiseSample(stickersid,labrequestId,treatmentId) {
	
	  jQuery.ajax({
	        async : false,
	        type : "POST",
	    	data : {
	    		"stickersid" : stickersid,
	    		"testmasterId" : labrequestId,
				"treatmentId" : treatmentId			
			},
			url : "ehat/diagnostics/getProcessAreaWiseSample",
		success : function(r) {
            
			if (r.phlebotomytableList.length > 0) { 
				var sampleQtyAndUnit = r.phlebotomytableList[0].sampleQuantity+"/"+r.phlebotomytableList[0].unitname;
                $('#samplename').text(r.phlebotomytableList[0].samplename);
                $("#conatinername").text(r.phlebotomytableList[0].containername);
                //$("#quantity").text(r.phlebotomytableList[0].sampleQuantity);
                $("#quantity").text(sampleQtyAndUnit);
                $("#collectionname").text(r.phlebotomytableList[0].collectionname);
                $("#collectiondate").text(r.phlebotomytableList[0].collectionDate);
                $("#collectiontime").text(r.phlebotomytableList[0].collectionTime); 
                $("#collectiondatep").val(r.phlebotomytableList[0].collectionDate);//Added by KishoR
                $("#collectionTimep").val(r.phlebotomytableList[0].collectionTime);//Added by KishoR
                
                $("#sampleNo").text(r.phlebotomytableList[0].id);
                $("#sampleid").val(r.phlebotomytableList[0].id);
              
            }
        }
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 14_Feb_2020
 * @Code This function is save process area.
 *********************************************************/
function saveProcessArea()
{
	var sampleid=0;
	var acceptedcollectionDate="";
	var acceptedcollectiontime="";
	var acceptedrecieveddate="";
	var acceptedrecievedtime="";
	var acceptedcomment="";
	var rejectedreason="";
	var recollectionRequest="";
	var rejedtedRemark="";
	var acceptedflag="";
	var testflag =document.querySelector('input[name="testflag"]:checked').value;
	 sampleid = $('#sampleid').val();
	if (testflag == "A") {
		 teststatus="P";
	     acceptedflag="Y";
    	 acceptedcollectionDate = $('#collectiondatep').val();
		 acceptedcollectiontime = $('#collectionTimep').val();
		 acceptedrecieveddate = $('#recieveddate').val();
		 acceptedrecievedtime = $('#recievedtime').val();
		 acceptedcomment = $('#comment').val();
		 
			if (acceptedcollectionDate == "" || acceptedcollectionDate == null || acceptedcollectionDate == undefined) {
				acceptedcollectionDate = 0;
				alertify.error("Select Accepted collection Date ");
				return false;
			}
			
			if (acceptedcollectiontime == "" || acceptedcollectiontime == null || acceptedcollectiontime == undefined) {
				acceptedcollectiontime = 0;
				alertify.error("Select Accepted collection Time  ");
				return false;
			}
			if (acceptedrecieveddate == "" || acceptedrecieveddate == null || acceptedrecieveddate == undefined) {
				acceptedrecieveddate = 0;
				alertify.error("Select Received collection Date ");
				return false;
			}
			
			if (acceptedrecievedtime == "" || acceptedrecievedtime == null || acceptedrecievedtime == undefined) {
				acceptedrecievedtime = 0;
				alertify.error("Select Received collection Time  ");
				return false;
			}
		 
		 
	} else if(testflag == "R"){	
		 teststatus="R";
		 rejectedreason = $('#rejectedreasonId').val();	 
		 recollectionRequest = $('#recollectionRequest').val();
		 rejedtedRemark = $('#rejedtedRemark').val();	 
		 if (rejectedreason == "" || rejectedreason == null || rejectedreason == undefined ||  rejectedreason == "0") {	
			 alertify.error("Select Rejected Reason  ");
				return false;
		}
	} 
	var inputs = [];	
	inputs.push('teststatus=' + testflag);
	inputs.push('id=' + sampleid);
	inputs.push('accpetedflag=' + acceptedflag);
	inputs.push('acceptedcollectionDate=' + acceptedcollectionDate);
	inputs.push('acceptedcollectiontime=' + acceptedcollectiontime);
	inputs.push('acceptedrecieveddate=' + acceptedrecieveddate);
	inputs.push('acceptedrecievedtime=' + acceptedrecievedtime);
	inputs.push('acceptedcomment=' + acceptedcomment);
	inputs.push('rejectedreason=' + rejectedreason);
	inputs.push('recollectionRequest=' + recollectionRequest);
	inputs.push('rejedtedRemark=' + rejedtedRemark);	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/diagnostics/saveProcessArea",
		data : str + "&reqType=AJAX",
		success : function(r) {
					
			if(testflag=="R"){				
				alertify.success("Reject Sample  successfully..!");
				window.location.replace("pathology_labresultdashboard.jsp?&tabFlag=R");	
			}else{
				alertify.success("Accepted Sample  successfully..!");
				window.location.replace("pathology_labresultdashboard.jsp?&tabFlag=P");	
			}
			
		}
	});
	

	
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Lab Test Unauthorised Tab
*******************************************************************************/
function getLabTestUnauthorisedTab(){
	var inputs = [];
	var callFrom="U";
	var patientType ="";
	var startIndex = 0;
	//document.querySelector('input[name="patientType"]:checked').value;
	
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getProcessAreaRecordTab",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {
					var id = r.phlebotomytableList[i].id;
					var sampleName = r.phlebotomytableList[i].samplename;
					var collectionDate = r.phlebotomytableList[i].collectionDate;
					var collectionTime = r.phlebotomytableList[i].collectionTime;
					var collectionCenter = r.phlebotomytableList[i].collectionname;
									
					var patientName = r.phlebotomytableList[i].patientname;
					var patientId = r.phlebotomytableList[i].patientId;
					var age = r.phlebotomytableList[i].age;
					var sex = r.phlebotomytableList[i].gender;
					
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname+"<input type='hidden' id='patientName"+id+"' value='"+patientName+"'/></td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId +"<input type='hidden' id='patientId"+id+"' value='"+patientId+"'/></td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname+"<input type='hidden' id='age"+id+"' value='"+age+"'/></td>"										
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+"<input type='hidden' id='sex"+id+"' value='"+sex+"'/></td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";	
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
			
					htmBody = htmBody 	+ "<td  class='col-md-1 center'> <button class='btn btn-xs btn-warning' " 
						+'onclick="openBarcodePopup('+id+ ',\'' +sampleName+'\',\'' +collectionDate+'\',\'' +collectionTime+'\',\'' +collectionCenter+'\')" '+"><i class='fa fa-barcode' ></i></button></a> </td>";
	
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value="'+r.phlebotomytableList[i].id+'"  name="unauthorisedRecordCheckbox" id="unauthorisedRecordCheckbox'+ i + '"/></td>';
							+'</tr>';				
					}
			}
			$("#diagnosticUnauthorisedBody").html(htmBody);
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#unauthorisedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#unauthorisedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#unauthorisedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='unauthorisedPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#unauthorisedPagination').html(numberOfRows);
		}
	});
	
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Lab Test Authorised Tab
*******************************************************************************/
function getLabTestAuthorisedTab(){
	var inputs = [];
	var callFrom="A";
	var patientType =document.querySelector('input[name="patientType"]:checked').value;
	var startIndex = 0;
	
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getProcessAreaRecordTab",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "<input type='hidden' id='treatmentId'  value='"+r.phlebotomytableList[i].treatmentId+"'></td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"  										
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";	
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
			
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value="'+r.phlebotomytableList[i].treatmentId+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].gender+'" name="authorisedRecordCheckbox" id="authorisedRecordCheckbox'+ i + '" onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
							+'</tr>';	
					
							//value="'+r.phlebotomytableList[i].treatmentId+'","'+r.phlebotomytableList[i].labrequestId +'","'+r.phlebotomytableList[i].id'","'+r.phlebotomytableList[i].treatmentId+'"
					}
			}
			$("#diagnosticAuthorisedBody").html(htmBody);
			//window.open("pathology_routineValueResultPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&labRequstId="+ encodeURIComponent(labRequstId)+"&id="+ encodeURIComponent(id)+"&gender="+encodeURIComponent(gender));
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#authorisedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#authorisedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#authorisedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='authorisedPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#authorisedPagination').html(numberOfRows);
		}
	});
	
}
/********************************************************************************
 * @author Ganesh Patil
 * @since  10April 2020
 * @comment for Print
*******************************************************************************/
function getPrintBySelect(callFrom){
	idList = [];
	var currentValue = 0;
	var count=0;
	var printType = "withHeader";
	
	var singleMultiType="No";
	
	
	var favorite = [];
	if(callFrom == "authorizedPrint"){
         $.each($("input[name='authorisedRecordCheckbox']:checked"), function(){            
             favorite.push($(this).val());
             count++;
         });
	}else if(callFrom == "previousRecordPrint"){
		$("#previousRecordTableBody").find('input[name="previousRecordCheckbox"]')
		.each(function() {
			if ($(this).is(":checked")) {
				   favorite.push($(this).val());
		           count++
			}
		});
		var checkedRedio =document.querySelector('input[name="btype"]:checked').value;
		if(checkedRedio == "2")
			printType = "withoutHeader";
	}

	if(count == 0 ){
		alert("Select Only One Check Box");
		return false;
	}

	var treatmentIds = "";
	var labRequstIds = "";
	var ids = "";
	var genders = "";

	var size = favorite.length;
	var counter = 4;
	var innerLoop = 0;
	var isFirst = true;
	for(var i = 0; i < size; i++){
		var data = [];
		data = favorite[i].split(",");
		for(var j = 0; j < data.length; j++){
			if(j == 0){
				if(isFirst)
					treatmentIds = data[j];
				else
					treatmentIds = treatmentIds+","+data[j];
			}else if(j == 1){
				if(isFirst)
					labRequstIds = data[j];
				else
					labRequstIds = labRequstIds+","+data[j];
			}else if(j == 2){
				if(isFirst)
					ids = data[j];
				else
					ids = ids+","+data[j];
			}else if(j == 3){
				if(isFirst)
					genders = data[j];
				else
					genders = genders+","+data[j];
			}
		}
		isFirst = false;
	}
	
	if(printType == "withHeader")
		window.open("pathology_routineValueResultPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentIds)+"&labRequstId="+ encodeURIComponent(labRequstIds)+"&id="+ encodeURIComponent(ids)+"&gender="+encodeURIComponent(genders)+"&singleMultiType="+encodeURIComponent(singleMultiType));
	else if(printType == "withoutHeader")
		window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentIds)+"&labRequstId="+ encodeURIComponent(labRequstIds)+"&id="+ encodeURIComponent(ids)+"&gender="+encodeURIComponent(genders)+"&singleMultiType="+encodeURIComponent(singleMultiType));
	
	uncheckAllCheckBoxs(callFrom);
}

/********************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment for Uncheck All Check Boxs.
*******************************************************************************/
function uncheckAllCheckBoxs(callFrom){
	
	if(callFrom == "authorizedPrint"){
		$('input[name="authorisedRecordCheckbox"]').each(function() {
			this.checked = false;
		});
		$("#treatmentidcheck").val(0);
	}else if(callFrom == "previousRecordPrint"){
		$('input[name="previousRecordCheckbox"]').each(function() {
			this.checked = false;
		});
		$("#prevTreatmentIdCheck").val(0);
	}
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Lab Test Hold Tab
*******************************************************************************/
function getLabTestHoldTab(){
	var inputs = [];
	var callFrom="H";
	var patientType ="";
	var startIndex = 0;
	//=document.querySelector('input[name="patientType"]:checked').value;

	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getProcessAreaRecordTab",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"									
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 								
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";
					htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
			
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					/*htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value=""  name="holdRecordCheckbox" id="holdRecordCheckbox'+ i + '"/></td>';*/
							+'</tr>';				
					}
			}
			$("#diagnosticHoldBody").html(htmBody);
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#holdNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#holdNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#holdJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='holdPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#holdPagination').html(numberOfRows);
		}
	});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Lab Test Previous Tab
*******************************************************************************/
function getLabTestPreviousTab(){
	var inputs = [];
	var callFrom="PR";
	var patientType="";
	var startIndex = 0;
	//=document.querySelector('input[name="patientType"]:checked').value;

	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getProcessAreaRecordTab",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.phlebotomytableList[i].patientname+"'/></td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"										
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 							
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";	
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
			
					htmBody = htmBody+ "<td class='col-md-1 center'>" 
					+ "<input type='button' class='btn btn-xs btn-danger' id='Emailid"+(i+1)+"' value='Email' onclick=emailReportingTestPatient("+(i+1)+","+r.phlebotomytableList[i].treatmentId+","+r.phlebotomytableList[i].labrequestId+",\'"+r.phlebotomytableList[i].id+"\',\'"+r.phlebotomytableList[i].gender+"\')></td>";	
				    + "<td class='col-md-1 center'></td>";		
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
									    
				   htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value="'+r.phlebotomytableList[i].treatmentId+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].gender+'"  name="previousRecordCheckbox" id="previousRecordCheckbox'+ i + '" onclick=checkPreviousTreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
							+'</tr>';	    
					}
			}
			$("#previousRecordTableBody").html(htmBody);
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#previousNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#previousNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#previousJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='previousPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#previousPagination').html(numberOfRows);
		}
	});
	
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Lab Test Recall Tab
*******************************************************************************/
function getLabTestRecallTab(){
	var inputs = [];
	var callFrom="R";
	var patientType="";
	var startIndex = 0;
	//=document.querySelector('input[name="patientType"]:checked').value;

	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getProcessAreaRecordTab",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"									
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 								
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+"</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].rejectedreason + "</td>";
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
			
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=changeStatusOfLabReport('recall','"+r.phlebotomytableList[i].id+"')><i class='fa fa-edit'></i></button></td>";
					/*htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value=""  name="recallRecordCheckbox" id="recallRecordCheckbox'+ i + '"/></td>';*/
							+'</tr>';				
					}
			}
			$("#diagnosticRecallBody").html(htmBody);
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#recallNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#recallNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#recallJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='recallPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#recallPagination').html(numberOfRows);
		}
	});
	
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for select All patient
*******************************************************************************/
function selectAllpatient() {
	var btnName = $('#selectAllPatient').val();
	if (btnName == "Select All") {
		$(':checkbox').each(function() {
			this.checked = true;
		});
		$("#selectAllPatient").attr('value', 'Unselect All');
	} else {
		$(':checkbox').each(function() {
			this.checked = false;
		});
		$("#selectAllPatient").attr('value', 'Select All');
	}

}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for authorize patient
*******************************************************************************/
function authorizePatient() {
	idList = [];
	var currentId;
	$("#diagnosticUnauthorisedBody").find('input[name="unauthorisedRecordCheckbox"]')
			.each(function() {
				if ($(this).is(":checked")) {
					currentId = $('#' + this.id).val();
					if (currentId != 0) {
						idList.push(currentId);
					} 
				}
			});
	if(idList.length > 0){
		
    	var r = confirm("Are You Sure You Want To Authorize this Tests ?");
    	if (r == true) {
    		var inputs = [];
    		inputs.push('id=' + encodeURIComponent(idList));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/diagnostics/authorizeRecord",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alertify.success(r);
    				getLabTestUnauthorisedTab();
    			}
    		});

    	}
	}
	
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to get sample Record in Routine area.
 *********************************************************/
function getsampleRecord(id,testmasterId,treatmentId)
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/diagnostics/getsampleRecord",
		data : {
			id : id,
			labRequestId : testmasterId,
			treatmentId : treatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if (r.phlebotomytableList.length > 0) {           
                $("#collectionDate").text(r.phlebotomytableList[0].collectionDate);
                $("#collectiontime").text(r.phlebotomytableList[0].collectionTime);
                $("#accepteddate").text(r.phlebotomytableList[0].acceptedcollectionDate);
                $("#acceptedtime").text(r.phlebotomytableList[0].acceptedcollectiontime);
                $("#flag").val(r.phlebotomytableList[0].teststatus);
            }
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 14_Feb_2020
 * @Code This function is use to Fetch sample name.
 *********************************************************/
function getpathologistname() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/diagnostics/getpathologistname",
		success : function(r) {
			setpathologistnamee(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 14_Feb_2020
 * @Code This function is use to set pathologist  name.
 *********************************************************/
function setpathologistnamee(r){	
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.phlebotomytableList.length; int++) {
		list=list+'<option value="'+(r.phlebotomytableList[int].pathologyId)+'">'+(r.phlebotomytableList[int].pathologyname)+'</option>';		
	}	
	$("#IdPathologist").html(list);	
	$("#IdPathologist").select2();	
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set TestName and Profile name.
 *********************************************************/
function getRoutinevalueResutl(id,testmasterId,treatmentId)
{
	var patientType=$('#patientgander').val();
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"id" : id,    		
			"treatmentId" : treatmentId,
			"testmasterId" : testmasterId,
			"patientType" : patientType	
		},
		url : "ehat/diagnostics/getRoutinevalueResutl",
        success : function(r) {
        	    
			sr1 = 1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
    		var html = "";
    		
			if (r.proLi.length == 0 || r.proLi.length == null) {		
				html = html
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {	
			
				for ( var pk = 0; pk < r.proLi.length; pk++) {
				$("#IdPathologist").select2('val',r.proLi[pk].pathologistId);	
				$("#txtReportNote").val(r.proLi[pk].adviceId);	
				html = html + "<div class='col-md-12-1'";
				html = html + "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
				html = html + "<div class='divide-10'></div>";
				
				/*html = html + "<div class='col-md-1-1'";
				html = html + "style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+ (sr1++);
				html = html + "</div>";*/

				html = html + "<div class='col-md-11-1'";
				html = html + " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
				html = html + " id='profileId" + (pk+1) + "' data-value='"+ r.proLi[pk].profileId +"'> "+ (sr1++)+" ) "+ r.proLi[pk].profilename + "   ";
				
				

				if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
					html = html + " - (" + r.proLi[pk].pkgName + ")</div>";
				} else {
					html = html + "</div>";
				}
				  html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
                  html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";            
  			      html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLengthpro"+(pk+1)+"' />";
  										
				

                  /*html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].patientId +"' id='patientId1' />";
                  html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].treatmentId+"' id='treatmentId1' />";
                  html = html + "<input type='hidden' value='"+ r.proLi[0].testli[0].labrequestId +"' id='labrequestId1' />";*/
				html = html + "</div>";
				
				var testidcheck=[];
				for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
					
					 		
					var isTestIdAbsent = true;					
					//alert(testidcheck);
					if (r.proLi[pk].testli[ts].testId != 0) {
						
						if(testidcheck.length == 0){
							isTestIdAbsent = true;
						}
						for ( var ts1 = 0; ts1 < testidcheck.length; ts1++) {
							
							if(testidcheck[ts1] == r.proLi[pk].testli[ts].testId){
								isTestIdAbsent = false;
								
								break;
							}
						}
						if(isTestIdAbsent)
							testidcheck[testidcheck.length] = r.proLi[pk].testli[ts].testId;
						
						if(isTestIdAbsent){
							
							var a="";
							if(r.proLi[pk].testli[ts].highvalue!=null){
								a=r.proLi[pk].testli[ts].lowvalue +"-"+r.proLi[pk].testli[ts].highvalue;
							}else{
								 a=r.proLi[pk].testli[ts].lowvalue;
							}
							html = html + "<tr style='height:25px'>" ;			
							html = html + "<td></td>";				
							html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testname)+"</td>";        	
							//html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testResult)+"'></td>";				
							
							if (r.proLi[pk].testli[ts].testResult == null || r.proLi[pk].testli[ts].testResult == "" || r.proLi[pk].testli[ts].testResult == "null") {
								//html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='' onkeypress='return validateNumbers(event)'></td>";
								html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text' value=''  onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")'  ></td>";	

							} else {
								//html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testResult)+"' onkeypress='return validateNumbers(event)' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' ></td>";	
								html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testResult)+"'  onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' ></td>";	

							}
							
							html = html + "<td id='normalId' class='center' style='font-weight: bold;'>"+a+"</td>";		
							
							if (r.proLi[pk].testli[ts].unitname == "-" || r.proLi[pk].testli[ts].unitname == null || r.proLi[pk].testli[ts].unitname == "" || r.proLi[pk].testli[ts].unitname == "null") {
								html = html + "<td id='unit' class='center' style='font-weight: bold;'>-</td>";
							}else
							{
								html = html + "<td id='unit' class='center' style='font-weight: bold;'>"+r.proLi[pk].testli[ts].unitname+"</td>";
							}	
							html = html + "<td id='methodId' class='center'>"+(r.proLi[pk].testli[ts].methodname)+"</td></tr>";				
							html = html + "<input type='hidden' value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' id='pkgIdproIdtestId"+ (pk+1) + (ts+1) +"' />";
						
							html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].objFormula)+"' id='formulaForTest"+ (pk+1) + (ts+1) +"' />";									
							html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].testname)+"' id='nameOfTest"+(pk+1) + (ts+1)+"' />";						
							html = html + "<input type='hidden' value='"+r.proLi[pk].testli.length +"' id='reportTestCount"+ (pk+1) + (ts+1) +"' />";	
						}
					}
				}
			}
				$("#itemMasterRecordsList").html(html);
			}			
        }
    });  
}
function FetchTestNameAndProfileNameInProcessArea()
{
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"id" : id,
    		"testmasterId" : testmasterId,
			"treatmentId" : treatmentId	,
			"patientType" : patientType	
		},
		url : "ehat/diagnostics/getRoutinevalueResutl",
        success : function(r) {
        	
        	
        
        }

    });
}



/*********************************************************
 * @author Kishor Lokhande
 * @date 16_Feb_2020
 * @Code This function is use for show selected Test On Process Area Tab.
 *********************************************************/
function ShowPhlebotomyTest(id,labRequestId,treatmentId){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/diagnostics/editPhlebotomyRecord",
		data : {
			id : id,
			labRequestId : labRequestId,
			treatmentId : treatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		
		showSelectedTestOnProcess(r,labRequestId,treatmentId);
		}
	});
}

/*********************************************************
 * @author Kishor Lokhande
 * @date 16_Feb_2020
 * @Code This function is use for show selected Test On Process Area Tab.
 *********************************************************/

function showSelectedTestOnProcess(t,labRequestId,treatmentId) {
    jQuery.ajax({
        async : true,
        type : "POST",
        data : {
            "testmasterId" : labRequestId,
            "treatmentId" : treatmentId            
        },
        url : "ehat/diagnostics/fetchTestNameAndProfileName",
        success : function(r) {
            sr1 = 1;
            testcount1 = 1;
            count1 = 1;
            protestcount1 = 1;
            pkgcount1 = 1;
            pkgprocount1 = 1;
            pkgprotestcount1 = 1;
            pkgtestcount1 = 1;
            procount1 = 1;
           // totalcount1 = 1;
            var html = "";
          
           
            if (r.proLi.length == 0 || r.proLi.length == null) {        
                html = html
                        + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
            } else {    
           
                for ( var pk = 0; pk < r.proLi.length; pk++) {
                	
                	
                	   html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
                       html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";            
       			   
                 		 
                       html = html + "<div class='col-md-12-1'";
                       html = html + "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
                       html = html + "<div class='divide-10'></div>";
                         
                       
                       html = html + "<div class='col-md-11-1'";
                       html = html + " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
                       html = html + " id='profileId" + (pk+1) + "' data-value='"+ r.proLi[pk].profileId +"'> "+ (sr1++)+" ) "+ r.proLi[pk].profilename + "   ";
                                                  

                          if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
                              html = html + " - (" + r.proLi[pk].pkgName + ")</div>";
                          } else {
                              html = html + "</div>";
                }
             
                html = html + "</div>";
                  for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
                    			
                  if (r.proLi[pk].testli[ts].tid != 0) {
                        for ( var z = 0; z < t.phlebotomytableList[0].labPhlebotomyMasterSalveTest.length; z++) {
                                
                    	   if( t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].packageId == r.proLi[pk].pkgId && t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].profileId == r.proLi[pk].profileId  && t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].testid == r.proLi[pk].testli[ts].testId)
                        	{                      		   
                    		     if(t.phlebotomytableList[0].labPhlebotomyMasterSalveTest[z].testflag == "Y"  ){
	                              	  html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td></tr>";	
	                              }else{
	                            	
	                                  }
	                             }             
                          }     
                    	}
                  
                }    
            }
                $("#itemMasterRecordsListProcessArea").html(html);
            }            
        }
    });  
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for changeStatusOfLabReport
*******************************************************************************/
function changeStatusOfLabReport(callfrom,id){
	var r ="";
	if(callfrom == "backtocurrent"){
		r=confirm("Do you want to send this sample back to processing?");
		
	}else if(callfrom == "post"){
		r=confirm("Do you want to send this sample to Post record?");
		
	}else if(callfrom == "authorise"){
		r=confirm("Do you want to send this sample to Authorise record?");
		
	}else if(callfrom == "recall"){
		r=confirm("Do you want to send this sample back to processing?");
		
	}else if(callfrom == "hold"){
		r=confirm("Do you want to send this sample to hold record?");		
	}
		
	if (!r)
		return false;
	else{
		jQuery.ajax({
	        async : true,
	        type : "POST",
	    	data : {
	    		id : id,
	    		callfrom : callfrom
			},
			url : "ehat/diagnostics/changeStatusOfTest",
	        success : function(r) {
	        	if(r==true){
	        		alertify.success("Update Successfully");    
	        		var tabFlag="";
	        		if(callfrom == "backtocurrent"){
	        			tabFlag="P";
	        			
	        		}else if(callfrom == "post"){
	        			tabFlag="PR";
	        			
	        		}else if(callfrom == "authorise"){
	        			tabFlag="ATab";
	        			
	        		}else if(callfrom == "recall"){
	        			tabFlag="R";
	        			
	        		}else if(callfrom == "hold"){
	        			tabFlag="H";
	        			
	        		}
	        		window.location.replace("pathology_labresultdashboard.jsp?&tabFlag="+tabFlag );
	        	}else{
	        		alertify.error("Failed to Update");
	        		
	        	}
	        
	        	
	        }

	    });
	}
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for saveLabTestRoutineValueResult 
*******************************************************************************/
function saveLabTestRoutineValueResult(from, id, statusFlag) {
	var idPathologist = $("#IdPathologist").val();
	var advice = $("#txtReportNote").val();
	if (from == "saveandauthorise") {
		/*if (idPathologist == "" || idPathologist == "undefined"
				|| idPathologist == null || idPathologist == 0
				|| idPathologist == "0") {
			alert("Please Select Pathologist Name");
			$("#IdPathologist").focus();
			return false;
		}*/
	} else if (from == "backtocurrent") {
		idPathologist = 0;
		advice = "";
	}

	var proLength = $("#proLength").val();
	var testLength = "";
	var phlebotomytableTestsalve = {
		phlebotomytableListTestsalve : []
	};
	for ( var j = 1; j <= proLength; j++) {
		testLength = $("#testLengthpro" + j).val();

		for ( var i = 1; i <= testLength; i++) {
			var pkgtestId = $("#pkgIdproIdtestId" + j + i).val();
			if (pkgtestId == undefined) {
				break;
			}
			var pkgprofiletestId = pkgtestId.split(",");
			var pkgId = pkgprofiletestId[0];
			var profileId = pkgprofiletestId[1];
			var testId = pkgprofiletestId[2];
			var testresult = "";

			if (from == "save") {
				testresult = $("#testresult" + j + i).val();
			} else if (from == "saveandauthorise") {
				testresult = $("#testresult" + j + i).val();
				if (testresult == "" || testresult == null
						|| testresult == undefined) {
					testresult = 0;
					alert("Please Enter Routine value");
					return false;
				}
			} else if (from == "backtocurrent") {
				testresult = "";
			}else if (from == "backtoUthoBtn") {
				testresult = $("#testresult" + j + i).val();
			}
			phlebotomytableTestsalve.phlebotomytableListTestsalve.push({
				"barcodeId" : id,
				"packageId" : pkgId,
				"profileId" : profileId,
				"testid" : testId,
				"testResult" : testresult,

			});
		}
	}
	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var r = "";

	var r1 = "";
	if (from == "backtocurrent") {
		r = confirm("Do you want to send this sample back to processing?");
	} else if (from == "save") {
		r = confirm("Do you want to send this sample to Unauthenticate record?");
	} else if (from == "saveandauthorise") {
		r = confirm("Do you want to send this sample to Authorise record?");
	}else if (from == "backtoUthoBtn") {
		r = confirm("Do you want to send this sample to Unauthenticate record?");
	}
	if (from == "save") {
		r1 = confirm("Please Recheck Once Again");
	}
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('statusFlag=' + statusFlag);
	inputs.push('idPathologist=' + idPathologist);
	inputs.push('advice=' + advice);
	inputs.push('phlebotomyListTestsalve=' + encodeURIComponent(phlebotomyListTestsalve));
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/diagnostics/saveLabTestRoutineValueResult",
		data : str + "&reqType=AJAX",
		success : function(r) {
			if (r == true) {
				alertify.success("Update Successfully");
			}
			var tabFlag = "";
			if (from == "saveandauthorise") {
				tabFlag = "ATab";
			} else if (from == "save") {
				tabFlag = "U";
			} else if (from == "backtocurrent") {
				tabFlag = "P";
			}else if (from == "backtoUthoBtn") {
				tabFlag = "U";
			}
			window.location.replace("pathology_labresultdashboard.jsp?&tabFlag="+ tabFlag);
		}
	});
		
}
	



function btnhideShow(){
	var flag=$("#flag").val();
	if(flag=="P"){
		$("#backtoUthoBtn").hide();
		$("#saveBtn").show();
		$("#saveautoriseBtn").show();
		$("#backtocurrentBtn").show();
	} else if(flag=="U"){
		$("#backtoUthoBtn").hide();
		$("#backtocurrentBtn").show();
		$("#authoriseBtn").show();
		$("#recallBtn").hide();
		$("#holdBtn").show();
	}else if(flag=="R"){
		$("#backtoUthoBtn").hide();
		$("#backtocurrentBtn").show();
		$("#authoriseBtn").show();
		$("#holdBtn").show();
	}else if(flag=="A"){
		$("#backtocurrentBtn").hide();
		$("#backtoUthoBtn").show();
		
		$("#postBtn").show();
		$("#phfBtn").show();
		$("#prtBtn").show();
	}else if(flag=="H"){
		$("#backtoUthoBtn").hide();
		$("#backtocurrentBtn").show();
		$("#authoriseBtn").show();
		$("#recallBtn").hide();
	}else if(flag=="PR"){
		$("#phfBtn").show();
		$("#prtBtn").show();
	}
	
}


/**********************************************************************************
 * @author Ganesh Patil
 * @date 04_Feb_2020
 * @Code This function is use to routine Value fetch for other tab.
 **********************************************************************************/
function routineValuefetchOther(id,treatmentId,labrequestId,teststatus,acceptedFlag){
		window.location.href = "pathology_phlebotomyResult.jsp?id=" + id+ "&testmasterId=" + labrequestId + "&treatmentId=" + treatmentId+"&teststatus=" + teststatus;
	
}

function printOutSource11() {
	var treatmentId = $.trim($('#treatmentId').val());
	var allVals = [];
	$(':checkbox').each(function() {
		if (this.checked == true) {
			allVals.push($(this).val());
		}
	});
	if (allVals.length == 0) {
		alertify.error("Please Select at least one Patient for Print");
		return false;
	}
	setTimeout(
			function() {
				window.open(("outSourceTestPdf.jsp?" + "&allVals="
								+ encodeURIComponent(allVals) + "&treatmentId=" + treatmentId));
			}, 300);
	refreshPatPrevSelTest();

}



/**********************************************************************************
 * @author Ganesh Patil
 * @date 04_Feb_2020
 * @Code This function is use to print Routine Value Result with header footer
 **********************************************************************************/
function printRoutineValueResult(){
	var treatmentId=$("#treatmentID").val();
	var labRequstId=$("#labrequestID").val();
	var gender=$("#patientgander").val();
	var id=$("#barcodeId").val();
	var singleMultiType="Yes";
	window.open("pathology_routineValueResultPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&labRequstId="+ encodeURIComponent(labRequstId)+"&id="+ encodeURIComponent(id)+"&gender="+encodeURIComponent(gender)+"&singleMultiType="+encodeURIComponent(singleMultiType));
}


/**********************************************************************************
 * @author Ganesh Patil
 * @date 04_Feb_2020
 * @Code This function is use to print Routine Value Result without heaer footer
 **********************************************************************************/
function printRoutineValueResultW(){
	var treatmentId=$("#treatmentID").val();
	var labRequstId=$("#labrequestID").val();
	var gender=$("#patientgander").val();
	var id=$("#barcodeId").val();
	var singleMultiType="Yes";

	window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&labRequstId="+ encodeURIComponent(labRequstId)+"&id="+ encodeURIComponent(id)+"&gender="+encodeURIComponent(gender)+"&singleMultiType="+encodeURIComponent(singleMultiType));
}

/**********************************************************************************
 * @author KishoR LokhandE
 * @date 18_Feb_2020
 * @Code This function is use displace Test on PopUp Box.
 **********************************************************************************/
function ShowPhlebotomyTestOnPopup(id,testmasterId,treatmentId){
	$('#test_Pop_Up').modal("show");
	$('#Counter_Batch_Pop_Up').modal();
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"id" : id,
    		"testmasterId" : testmasterId,
			"treatmentId" : treatmentId,
			"patientType" : "Male"	
		},
		url : "ehat/diagnostics/getRoutinevalueResutl",
        success : function(r) {
            sr1 = 1;
            testcount1 = 1;
            count1 = 1;
            protestcount1 = 1;
            pkgcount1 = 1;
            pkgprocount1 = 1;
            pkgprotestcount1 = 1;
            pkgtestcount1 = 1;
            procount1 = 1;
           // totalcount1 = 1;
            var html = "";
            
            if (r.proLi.length == 0 || r.proLi.length == null) {        
                html = html
                        + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
            } else {    
           
                for ( var pk = 0; pk < r.proLi.length; pk++) {
                	
                          html = html + "<div class='col-md-11-1'";
                          html = html + " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
                          html = html + " id='profileId" + (pk+1) + "' data-value='"+ r.proLi[pk].profileId +"'> "+ r.proLi[pk].profilename + "   ";
                                               
                          if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
                              html = html + " - (" + r.proLi[pk].pkgName + ")</div>";
                          } else {
                              html = html + "</div>";
                              
                          } 
                          var testidcheck=[];
                  		 for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
                  			var isTestIdAbsent = true;	
                    			 if (r.proLi[pk].testli[ts].tid != 0) {
                    				 if(testidcheck.length == 0){
             							isTestIdAbsent = true;
             						}
             						for ( var ts1 = 0; ts1 < testidcheck.length; ts1++) {
             							
             							if(testidcheck[ts1] == r.proLi[pk].testli[ts].testId){
             								isTestIdAbsent = false;
             								
             								break;
             							}
             						}
             						if(isTestIdAbsent)
             							testidcheck[testidcheck.length] = r.proLi[pk].testli[ts].testId;
             						
             						if(isTestIdAbsent){

	                              html = html + "<tr style='height:25px'>" + "<td id='testname'>"+(r.proLi[pk].testli[ts].testname)+"</td></tr>";
             						}        
                      }     
                   }	                    
               }
                $("#testPopUptBody").html(html);
            }            
           
        }
    });  
}

/**********************************************************************************
 * @author KishoR LokhandE
 * @date 19_Feb_2020
 * @Code This method is used for fetch assign test from patient wise.
 **********************************************************************************/
function getAllPhlebotomyTests(labRequestId,treatmentId){
			 		  	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagnostics/getAllPhlebotomyTests",
		data : {
			id : 0,
			labRequestId : labRequestId,
			treatmentId : treatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			alert(r);
			
		}
	}); 
}


/**********************************************************************************
 * @author KishoR LokhandE
 * @date 20_Feb_2020
 * @Code This function is used for open dynamic tab.
 **********************************************************************************/
function openDynamicTab(tabFlag){

if(tabFlag==null){
	tabFlag="";
}
	if(tabFlag == "P"){
		$("#PTab").trigger("click");
		
	}else if(tabFlag == "U"){
		$("#UTab").trigger("click");
		
	}else if(tabFlag == "ATab"){
		$("#ATab").trigger("click");
		
	}else if(tabFlag == "H"){
		$("#HTab").trigger("click");
		return false;
		
	}else if(tabFlag == "R"){
		
		$("#RTab").trigger("click");
	}else if(tabFlag == "PR"){
		
		$("#PRTab").trigger("click");
	}else if(tabFlag == "O"){
		
		$("#OTab").trigger("click");
	}else{
		$("#CTab").trigger("click");
	}
}




function selectCheckBoxPackWise(id){
	
	
	  if(($('#checkboxAll'+id).prop("checked") == true)){
		  //alert("if"+id);
		  $('.testCheckBox'+id).prop('checked', true);  
		  
		 /* $('input[class=testCheckBox'+id+']').each(function(){				
					
				if(! $('#testCheckBox'+id).is(':disabled')){
			    		
					$('#testCheckBox'+id).prop('checked', true);  
			    }				
			});*/
		  
		  
	  }else{
		 // alert("else "+id);
		  $('.testCheckBox'+id).prop('checked', false);
	  }
}
/*********************************************************
 * @author Ajay khandare
 * @date 14_Feb_2020
 * @Code This function is used same patient accepted .
 *********************************************************/
function checktreatmentId(id, treatmentId) {
	var idtreament = $("#treatmentidcheck").val();
	if ($("#"+id+"").is(':checked')){
		if (treatmentId != idtreament && idtreament != 0) {
			alertify.error("Please Select Same Patient for Print");
			$("#" + id + "").prop("checked", false);
			$("#treatmentidcheck").val(idtreament);
			return false;
		} else {
			$("#treatmentidcheck").val(treatmentId);
		}
	}else{
		idList = [];
		var currentId;
		$("#diagnosticAuthorisedBody").find('input[name="authorisedRecordCheckbox"]').each(function() {
			if ($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				var data = currentId.split(",");
				if (currentId != "") {
					idList.push(data[0]);
				}
			}
		});

		if (idList.length != 0)
			$("#treatmentidcheck").val(idList[0]);
		else
			$("#treatmentidcheck").val(0);
	}
}

/*********************************************************
 * @author Ajay khandare
 * @date 14_Feb_2020
 * @Code This function is used send to outsource test.
 *********************************************************/
function sendToOutSourceTest()
{
	var outlabId = $('#outlabId').val();
	var labCenterId = $("#labCenterID").val();
	
	var dispatchDate = $('#dispatchDate').val();
	var dispatchTime = $('#dispatchTime').val();
	var carrierId = $('#carrierId').val();
	var commentId = $('#CommentId').val();
	var barLabTreatmentId1 = "";
	var barcodeId = "";
	var labrequestId = "";
	var treatmentId = "";
	if (labCenterId == "" || labCenterId == null || labCenterId == undefined || labCenterId == "0") {
		labCenterId = 0;
		alert("Please Select Lab Name");
		return false;
   }
	
   if (dispatchDate == "" || dispatchDate == null || dispatchDate == undefined || dispatchDate == "0") {
	   dispatchDate = 0;
		alert("Please Select Dispatch Date ");
		return false;
   }
   if (dispatchTime == "" || dispatchTime == null || dispatchTime == undefined || dispatchTime == "0") {
	   dispatchTime = 0;
		alert("Please Select Dispatch Time ");
		return false;
   }
	var sendtOutSourceslave = {
		sendtOutSourceslavelist : []
	};

	var currentId;
	$("#diagnosticProcessAreaId").find('input[name="outsourceCheckbox"]').each(function() {
				if ($(this).is(":checked")) {
					currentId = $('#' + this.id).val();
					barLabTreatmentId1 = currentId.split(",");
					barcodeId = barLabTreatmentId1[0];
					labrequestId = barLabTreatmentId1[1];
					treatmentId = barLabTreatmentId1[2];
					sendtOutSourceslave.sendtOutSourceslavelist.push({
						"barcodeId" : barcodeId,
						"labrequestId" : labrequestId,
						"treatmentId" : treatmentId,
					});
				}
			});
	var sendtOutSourcemaster = {
		sendtOutSourcemasterlist : []
	};
	sendtOutSourcemaster.sendtOutSourcemasterlist.push({
		"id" : outlabId,
		"labCenterId" : labCenterId,
		"dispatchDate" : dispatchDate,
		"dispatchTime" : dispatchTime,
		"carrierId" : carrierId,
		"commentId" : commentId,
		"labrequestId" : labrequestId,
		"treatmentId" : treatmentId
	});
	
	sendtOutSourcemaster = JSON.stringify(sendtOutSourcemaster);
	sendtOutSourceslave = JSON.stringify(sendtOutSourceslave);
	var inputs = [];
	inputs.push('sendtOutSourcemaster=' + sendtOutSourcemaster);
	inputs.push('sendtOutSourceslave=' + sendtOutSourceslave);
	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/diagnostics/sentToOutSourceTest",
		data : str + "&reqType=AJAX",
		success : function(r) {
			if (r == 1) {
				alertify.success("Record Saved successfully..!");
			} else if (r == 2) {
				alertify.success("Record Updated successfully..!");
			} else {
				alertify.error("Server Error..!");
			}
    		window.location.replace("pathology_labresultdashboard.jsp?&tabFlag=O");

		}
	});
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Lab Test Outsource Tab
*******************************************************************************/
function getLabTestOutsourceTab(){
	var inputs = [];
	var callFrom="O";
	var patientType="";
	var startIndex = 0;
	
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getProcessAreaRecordTab",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {			
					htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].dispatchDate + "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].dispactchTime  + "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 										
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].age+"</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].gender+ "</td>"					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
				        	+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";				
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-info'onclick=viewDocument('"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].id+"')><i class='fa fa-cloud-upload'></i></button></td>";				
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=routineValueOutsourceResult('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId +"','"+r.phlebotomytableList[i].outsourcemasterId+"')><i class='fa fa-edit'></i></button></td>";
					
					/*htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value=""  name="outsourceRecordCheckbox" id="outsourceRecordCheckbox'+ i + '"/></td>';
*/							+'</tr>';				
					}
			}
			$("#diagnosticOutSourceBody").html(htmBody);
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#outsourceNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#outsourceNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#outsourceJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='outsourcePageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#outsourcePagination').html(numberOfRows);
		}
	});
}

/********************************************************************************
 * @author KishoR LokhandE
 * @date 24_Feb_2020
 * @comment for set Accepte and Reject Div in Process Area.
*******************************************************************************/
function changeDivForAcceptReject(id){
	if(id=="rejected"){
		
		//$("#rejectDiv").show();		
		$("#acceptDiv").hide();
		$("#rejectDiv").toggle(500);
		
	}else if(id == "accepted"){
		
		//$("#acceptDiv").show();
		$("#acceptDiv").toggle(500);
		$("#rejectDiv").hide();
	}
	
}

/*********************************************************
 * @author KishoR LokhandE
 * @date 24_Feb_2020
 * @Code This function is use to set Rejection Reason.
 *********************************************************/
function setpathologistname(){		
	var list= "";	
	list=list + "<option value='0'>-select-</option>";
	list=list + "<option value='select'>-Select Title-</option>";
	list=list + "<option value='Hemolysed Sample'>Hemolysed Sample</option>";
	list=list + "<option value='Clotted Sample'>Clotted Sample</option>";
	list=list + "<option value='Inadequate Sample'>Inadequate Sample</option>";
	list=list + "<option value='Contamination'>Contamination</option>";
	list=list + "<option value='Inappropriate Collection Container'>Inappropriate Collection Container</option>";
	list=list + "<option value='Others'>Others</option>";	
	$("#rejectedreasonId").html(list);	
	$("#rejectedreasonId").select2();	
}



/********************************************************************************
 * @author KishoR LokhandE
 * @date 25_Feb_2020
 * @comment for get count of normal/abnormal/criticallyAbnormal indicator.
*******************************************************************************/
function getCountOfRoutineValue(){
	

	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/diagnostics/getCountOfRoutineValue",
		success : function(r) {
			 
			 $('#abnormal').text(r.abnormal);
			 $('#normal').text(r.normal);
			 $('#criticalAbnormal').text(r.cAbnormal);
			 
			 $('#cAbnormalList').text(r.cAbnormalList);
			 $('#abnormalList').text(r.abnormalList);
			 $('#normalList').text(r.normalList);
			 
			 
		}
	});

	
}

/*
*//********************************************************************************
 * @author KishoR LokhandE
 * @date 25_Feb_2020
 * @comment for get data against normal/abnormal/criticallyAbnormal indicator.
*******************************************************************************//*
function getLabTestUnauthorisedTabFromIndicator(id){
	
	var materIds="";
	if(id=="normal"){
		 var normal=$('#normal').text();
		 if(normal == 0){
			 alertify.error("List Not Available");
			 return false;
		 }else{
			 //alert(id);
			 materIds=$('#normalList').text();
		 }
	}else if(id=="abnormal"){
		var abnormal=$('#abnormal').text();
		if(abnormal == 0){
			 alertify.error("List Not Available");
			 return false;
		 }else{
			// alert(id);
			 materIds=$('#abnormalList').text();
		 }
	}else if(id=="criticalAbnormal"){
		var criticalAbnormal=$('#criticalAbnormal').text();
		if(criticalAbnormal == 0){
			 alertify.error("List Not Available");
			 return false;
		 }else{
			// alert(id);
			 materIds=$('#cAbnormalList').text();
		 }
	}
	
	if(materIds==""){
		 alertify.error("List Not Available");
		 return false;
	}
	
	var inputs = [];
	var callFrom="U";
	var patientType ="";
	//document.querySelector('input[name="patientType"]:checked').value;
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('materIds=' + materIds);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getLabTestUnauthorisedTabFromIndicator",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 										
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>" ;	
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
			
	
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value="'+r.phlebotomytableList[i].id+'"  name="unauthorisedRecordCheckbox" id="unauthorisedRecordCheckbox'+ i + '"/></td>';
							+'</tr>';				
					}
			}
			$("#diagnosticUnauthorisedBody").html(htmBody);
		}
	});
	
}*/
/**********************************************************************************
 * @author Ajay khandare
 * @date 25_Feb_2020
 * @Code This function is use to routine Value to OutSource .
 **********************************************************************************/
function routineValueOutsourceResult(id,labrequestId,treatmentId,outmasterId)
{
		window.location.href = "pathology_outsourceResult.jsp?id=" + id
			+ "&testmasterId=" + labrequestId + "&treatmentId=" + treatmentId
			+ "&outmasteId=" + outmasterId;
}


/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set TestName and Profile name.
 *********************************************************/
function getRoutinevalueOutSourceResut(id,testmasterId,treatmentId,outmasterid)
{
	var patientType=$("#patientgander").val();
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"id" : id,
    		"testmasterId" : testmasterId,
			"treatmentId" : treatmentId,
			"outmasterid" : outmasterid,
			"patientType" : patientType	
		},
		url : "ehat/diagnostics/getRoutinevalueOutSourceResut",
        success : function(r) {
        	    
			sr1 = 1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
    		var html = "";
    		
			if (r.proLi.length == 0 || r.proLi.length == null) {		
				html = html
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {	
			
			for ( var pk = 0; pk < r.proLi.length; pk++) {	
				
				html = html + "<div class='col-md-12-1'";
				html = html + "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
				html = html + "<div class='divide-10'></div>";
				
				html = html + "<div class='col-md-11-1'";
				html = html + " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
				html = html + " id='profileId" +(pk+1)+"' data-value='"+ r.proLi[pk].profileId +"'> "+(sr1++)+")"+ r.proLi[pk].profilename + "   ";
				
				if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
					html = html + " - (" + r.proLi[pk].pkgName + ")</div>";
				} else {
					html = html + "</div>";
				}
				html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
				html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
				html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLengthoutsource"+(pk+1)+"' />";
				
				html = html + "</div>";
				var testidcheck=[];
				for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
					var isTestIdAbsent = true;					
					//alert(testidcheck);
					if (r.proLi[pk].testli[ts].testId != 0) {
						
						if(testidcheck.length == 0){
							isTestIdAbsent = true;
						}
						for ( var ts1 = 0; ts1 < testidcheck.length; ts1++) {
							
							if(testidcheck[ts1] == r.proLi[pk].testli[ts].testId){
								isTestIdAbsent = false;
								
								break;
							}
						}
						if(isTestIdAbsent)
							testidcheck[testidcheck.length] = r.proLi[pk].testli[ts].testId;
						
						if(isTestIdAbsent){
							
							var a="";
							if(r.proLi[pk].testli[ts].highvalue!=null){
								a=r.proLi[pk].testli[ts].lowvalue +"-"+r.proLi[pk].testli[ts].highvalue;
							}else{
								 a=r.proLi[pk].testli[ts].lowvalue;
							}
							html = html + "<tr style='height:25px'>" ;			
							html = html + "<td></td>";				
							html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testname)+"</td>";        	
							//html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testResult)+"'></td>";				
							
							if ( r.proLi[pk].testli[ts].testResult == null || r.proLi[pk].testli[ts].testResult == "" || r.proLi[pk].testli[ts].testResult == "null") {
								//html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='' onkeypress='return validateNumbers(event)'></td>";	
								html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +")  value='' ></td>";	

							} else {
								//html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testResult)+"' onkeypress='return validateNumbers(event)'></td>";	

								html = html + "<td id='testresult' class='center'><input id='testresult" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testResult)+"' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +") ></td>";	
							}
							
							html = html + "<td id='normalId' class='center' style='font-weight: bold;'>"+a+"</td>";		
							
							if (r.proLi[pk].testli[ts].unitname == "-" || r.proLi[pk].testli[ts].unitname == null || r.proLi[pk].testli[ts].unitname == "" || r.proLi[pk].testli[ts].unitname == "null") {
								html = html + "<td id='unit' class='center' style='font-weight: bold;'>-</td>";
							}else
							{
								html = html + "<td id='unit' class='center' style='font-weight: bold;'>"+r.proLi[pk].testli[ts].unitname+"</td>";
							}	
							html = html + "<td id='methodId' class='center'>"+(r.proLi[pk].testli[ts].methodname)+"</td></tr>";				
							html = html + "<input type='hidden' value='"+(r.proLi[pk].pkgId)+","+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' id='pkgIdproIdtestId"+ (pk+1) + (ts+1) +"' />";
						}
					}
				}
			}
				$("#itemMasterRecordsList").html(html);
			}			
			
        }
    });  
}



/********************************************************************************
 * @author Ajay KHANDARE
 * @since 
 * @comment for saveLabTestRoutineValueResult 
*******************************************************************************/
function saveoutSourceRoutineValueResult(id,outmasterId){
	
		var proLength = $("#proLength").val();
		var testLength = "";
		
		var sendtOutSourceslave = {
				sendtOutSourceslavelist : []
			};
			
		for ( var j = 1; j <= proLength; j++) 		
		{		
			testLength  = $("#testLengthoutsource"+j).val();
		   for ( var i = 1; i <= testLength; i++)
			  {
				 var pkgtestId = $("#pkgIdproIdtestId"+j+i).val();	
				 if(pkgtestId==undefined)
					 {
					break;
					 }	
	     		 var pkgprofiletestId=pkgtestId.split(",");				
				 var pkgId=pkgprofiletestId[0];
				 var profileId=pkgprofiletestId[1];	
				 var testId=pkgprofiletestId[2];				 
				 var testresult = $("#testresult"+j+i).val();	
				 if (testresult == "" || testresult == null || testresult == undefined) {
						testresult = 0;
						alert("Please Enter Routine value");
						return false;
				}
				 
				 sendtOutSourceslave.sendtOutSourceslavelist.push({				  							  				   
					    "outmasterId" : outmasterId,
					    "barcodeId" : id,
					    "packageid" : pkgId,
					    "profileId" : profileId,				
						"testid" : testId,
						"testResult" : testresult,
						
				});
			}
		}
		var sendtOut = JSON.stringify(sendtOutSourceslave);
		var inputs = [];	
		inputs.push('sendtOutSourceslave=' + sendtOut);
		var str = inputs.join('&');
		var r = confirm("Do you want to save the routine values?");
		if (r == true){
			jQuery.ajax({
			type : "POST",
			url : "ehat/diagnostics/saveoutSourceRoutineValueResult",
			data : str + "&reqType=AJAX",
			success : function(r) {
				if (r == true) 
				{
					alertify.success("Saved Successfully");				
				}
					
					window.location.replace("pathology_labresultdashboard.jsp?&tabFlag=O");	
			}
		});
		
	}

}
/**********************************************************************************
 * @author Ajay Patil
 * @date 04_Feb_2020
 * @Code This function is use to print Routine Value Result with header footer
 **********************************************************************************/
function printRoutineValueResultINOutSource(){
	var treatmentId=$("#treatmentID").val();
	var labRequstId=$("#labrequestID").val();
	var gender=$("#patientgander").val();
	var id=$("#barcodeId").val();
	var outmasteId=$("#outmasteId").val();
	window.open("pathology_routinevalueResultInOutsourrcePDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&labRequstId="+ encodeURIComponent(labRequstId)+"&id="+ encodeURIComponent(id)+"&outmasteId="+ encodeURIComponent(outmasteId)+"&gender="+encodeURIComponent(gender));
}



/**********************************************************************************
 * @author Ganesh Patil
 * @date 04_April_2020
 * @Code This function is open upload Document Popup
 **********************************************************************************/
function viewDocument(treatmentId,outsourceId)
{
	$('#tretId').val(treatmentId);
	$('#slaveId').val(outsourceId);
	$("#uploadDocumentModal").modal('show');
	getOutsourceDocument();
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get file value(only name)
******************************************************************************************************/	
function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

/**********************************************************************************
 * @author Ganesh Patil
 * @date 04_April_2020
 * @Code This function is upload Document
 **********************************************************************************/
function saveOutsourceDocument(){
	var form = $("#outsourcedocumentForm")[0];
	 if( document.getElementsByName("outsourcedocumentForm").length == 0 || $("#uploadedFile").val()==""){
		    alert("Please select file");
		    return false;
		}
	var treatmentId = $('#tretId').val();
	var id = $('#slaveId').val();
	var uploadedFile = getFileValue('uploadedFile');
	 var data = new FormData(form);
	 data.append("documentUpload", uploadedFile);
	 data.append("treatmentId", treatmentId);
	 data.append("id",id);
	 jQuery.ajax({
			async : true,
			type : "POST",
			enctype: 'multipart/form-data',
			url : "ehat/diagnostics/saveOutsourceDocument",
			data : data,
			processData: false,
	        contentType: false,               
	   	 	catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r==2){
					alertify.success("Document Uploaded Successfully");
				}else if(r==1){
					alertify.error("One or more file is duplicate.");
				}else{
					alertify.error("Failed To upload");
				}
				getOutsourceDocument();
				$("#uploadedFile").val("");
			}
		});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get uploaded child Patient document for document tab
******************************************************************************************************/	
function getOutsourceDocument(){
	var treatmentId = $('#tretId').val();
	var id = $('#slaveId').val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			treatmentId : treatmentId,
			id : id
			},
		url : "ehat/diagnostics/getOutsourceDocumentsById",
		success : function(r) {
			var htmBody = "";
	    	if (r.sendToOutSourceDocumentDtoList.length == 0 || r.sendToOutSourceDocumentDtoList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.sendToOutSourceDocumentDtoList.length; i++) {	
					
					htmBody = htmBody + "<tr>"
							+ "<td class='col-md-1 center'>" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center'>" +r.sendToOutSourceDocumentDtoList[i].documentpath+ "</td>" ;														
							
							htmBody = htmBody
							+ "<td class='col-md-1 center'>"
							+ "<button class='btn' type='button' id='viewUploadedDocumentId' value='"+r.sendToOutSourceDocumentDtoList[i].documentpath+"' onclick=viewUploadedDocument(this.value,"+r.sendToOutSourceDocumentDtoList[i].outmasterId+")><i class='fa fa-eye' title='View Document'></i></button></td>";
				
					htmBody = htmBody
					+ "<td class='col-md-1 center'>"
					+ "<button class='btn' type='button' id='deleteUploadedDocumentId' value='"+r.sendToOutSourceDocumentDtoList[i].id+"' onclick=deleteOutSourceUploadedDocument(this.value,"+r.sendToOutSourceDocumentDtoList[i].id+")><i class='fa fa-times' title='Delete'></i></button></td></tr>";

				}
			}
						
			$("#outsourceDocumentTableBody").html(htmBody);
		}
	});
}

/**********************************************************************************
 * @author Ganesh Patil
 * @date 04_April_2020
 * @Code This function is view Document
 **********************************************************************************/
	function viewUploadedDocument(document,treatmentId){
		if(document ==null || document =="" || document ==undefined){
			alert("No File To View First Upload And Save file");
		}else{
			$("#uploadDocumentModal").modal('hide');
			$('#ViewDocumemnt').attr("src","");
			$('#ViewDocumemnt').attr("src","ehat/diagnostics/readDocuments?treatmentId="+treatmentId+"&fileName="+document);
			$('#viewDocModal').modal('show');
		}
		}
	
/**********************************************************************************
 * @author Ganesh Patil
 * @date 09_April_2020
 * @Code This function is validate decimalnumber
**********************************************************************************/
	function validateNumbers(key) {
		var keycode = (key.which) ? key.which : key.keyCode;
		if ((keycode > 47 && keycode < 58) || keycode == 8 || keycode == 9
				|| keycode == 127 || keycode == 13 || keycode == 46
				|| (keycode > 34 && keycode < 41)) {

			return true;
		} else {
			alert("Please Enter Numbers Only!");
			return false;
		}
	};


/**********************************************************************************
 * @author Ganesh Patil
 * @date 16_April_2020
 * @Code This function is get Sample Container Wise List
**********************************************************************************/
function getSampleContainerWiseList(value){
	if(value==0){
		return false;
	}
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			value : value
		},
		url : "ehat/diagnostics/getSampleContainerWiseList",
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='16'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {
					var id = r.phlebotomytableList[i].id;
					var sampleName = r.phlebotomytableList[i].samplename;
					var collectionDate = r.phlebotomytableList[i].collectionDate;
					var collectionTime = r.phlebotomytableList[i].collectionTime;
					var collectionCenter = r.phlebotomytableList[i].collectionname;
					
					var patientName = r.phlebotomytableList[i].patientname;
					var patientId = r.phlebotomytableList[i].patientId;
					var age = r.phlebotomytableList[i].age;
					var sex = r.phlebotomytableList[i].gender;
					
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname +"<input type='hidden' id='patientName"+id+"' value='"+patientName+"'/></td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId +"<input type='hidden' id='patientId"+id+"' value='"+patientId+"'/></td>"
							+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname +"<input type='hidden' id='age"+id+"' value='"+age+"'/></td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+"<input type='hidden' id='sex"+id+"' value='"+sex+"'/></td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 							
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";
					htmBody = htmBody + "<input type='hidden' value='"+ r.phlebotomytableList.length+"' id='processsArealistLength' />";

					htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";

					htmBody = htmBody 	+ "<td  class='col-md-1 center'> <button class='btn btn-xs btn-warning' " 
					+'onclick="openBarcodePopup('+id+ ',\'' +sampleName+'\',\'' +collectionDate+'\',\'' +collectionTime+'\',\'' +collectionCenter+'\')" '+"><i class='fa fa-barcode' ></i></button></a> </td>";
					
					if(r.phlebotomytableList[i].teststatus=="P" && r.phlebotomytableList[i].accpetedflag=="Y"){
					 
					htmBody = htmBody+ "<td class='col-md-1 center'>" 
				 		+ "<button class='btn btn-xs btn-success'><i class='fa fa-check' aria-hidden='true'style='width:60px;'></i></button></td>";	
					
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					        + "<button class='btn btn-xs btn-success' disabled='disabled' onclick=editProcessArea('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
					
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					    + "<button class='btn btn-xs btn-primary' onclick=routineValuefetch('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					 
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox"  disabled="disabled" value="'+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].treatmentId+'"  name="outsourceCheckbox" id="outsourceCheckbox'+ i + '"   onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';
				  }else if(r.phlebotomytableList[i].teststatus=="P" && r.phlebotomytableList[i].accpetedflag=="N"){
					
					  htmBody = htmBody+ "<td class='col-md-1 center'>" 
				 		+ "<button class='btn btn-xs btn-danger'><i class='fa fa-times' aria-hidden='true'style='width:60px;'></i></button></td>";	
					
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					        + "<button class='btn btn-xs btn-success' onclick=editProcessArea('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
					 
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
					    + "<button class='btn btn-xs btn-primary' onclick=routineValuefetch('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
					 
					 htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value="'+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].treatmentId+'"  name="outsourceCheckbox" id="outsourceCheckbox'+ i + '"   onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';
					}
					
				
				}
			}
			$("#diagnosticProcessAreaId").html(htmBody);
	  	
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 6){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0){
				$('#processAreaNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			}else{
				$('#processAreaNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				//$('#processAreaJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='processAreaPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
			}
			$('#processAreaPagination').html(numberOfRows);
	  	}
	});
}


/**********************************************************************************
 * @author Ganesh Patil
 * @date 16_April_2020
 * @Code This function is get outsource lab Wise List
**********************************************************************************/
function getOutsourceLabWiseList(){
	var callfrom="N";
	jQuery.ajax({
		async	: true,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/OutSourceMasterController/getOutSourcelablist",
		success : function(r) {
			setTemplateForOutSource(r);
		}
	});
}

/**********************************************************************************
 * @author Ganesh Patil
 * @date 16_April_2020
 * @Code This function is set List
**********************************************************************************/
function setTemplateForOutSource(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var i = 0; i < r.listMaster.length; i++) {
		list=list+'<option value="'+(r.listMaster[i].outsourceId)+'">'+(r.listMaster[i].outSourcelabName)+'</option>';		
	}	
	$("#outsourcelabId").html(list);
}

/**********************************************************************************
 * @author Ganesh Patil
 * @date 16_April_2020
 * @Code This function is get Outsource Lab wise List
**********************************************************************************/
function getOutsourceLabList(value){
	if(value==0){
		getLabTestOutsourceTab();
		return true;
	}
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			value : value
		},
		url : "ehat/diagnostics/getOutsourceLabList",
		success : function(r) {
			var htmBody = "";
	    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.phlebotomytableList.length; i++) {			
					htmBody = htmBody + "<tr style='height:21px;'>"
							+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].dispatchDate + "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].dispactchTime  + "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 										
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname+ "</td>"
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId+ "</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].age+"</td>" 
							+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].gender+ "</td>";					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
				        	+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";				
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-info'onclick=viewDocument('"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].id+"')><i class='fa fa-cloud-upload'></i></button></td>";				
					
					htmBody = htmBody+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-primary' onclick=routineValueOutsourceResult('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId +"','"+r.phlebotomytableList[i].outsourcemasterId+"')><i class='fa fa-edit'></i></button></td>";
							+'</tr>';				
					}
			}
			$("#diagnosticOutSourceBody").html(htmBody);
			}
	});
}

/**********************************************************************************
 * @author Ganesh Patil
 * @date 16_April_2020
 * @Code This function is refresh Page 
**********************************************************************************/
function refreshPage(callfrom){
	if(callfrom=='A'){
		window.location.replace("pathology_labresultdashboard.jsp?&tabFlag=ATab");
	}else if(callfrom=='P'){
		window.location.replace("pathology_labresultdashboard.jsp?&tabFlag=PR");
	}
}

/********************************************************
* @author Ajay s khandare
* @since 12-03-2020
* @comment for open pop up email reporting Test 
*********************************************************/
function emailReportingTestPatient(id,treatmentId,labrequestId,masterIdd,gender)
{	
	    var patientNameEmail= $("#patientnamee"+id).val();
		$("#patientNameemail").html(patientNameEmail);
		$("#treatmentID").val(treatmentId);
		$("#labrequestId1").val(labrequestId);
	    $("#masterIdd").val(masterIdd);
	    $("#patientgander1").val(gender);
    	var r = confirm("Are You Sure You Want To Email this Tests ?");
    	if (r == true) {   		
    		$("#emailreportingPopUp").modal('show');  		   		
    	}  	
}
/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for  email Sending Hide Popup PatinetTest
**********************************************************/
function emailSendingHidePopupPatinetTest()
{
	$("#emailreportingPopUp").modal('hide');  
	$("#patientNameemail").val('');
}

/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for print email Sending Patinet Test reporting
**********************************************************/
function emailSendingPatinetTest()
{
	var labRequstId = $("#labrequestId1").val();
	var treatmentId = $("#treatmentID").val();
	var id = $("#masterIdd").val();
	var gender = $("#patientgander1").val();
	
	var emailTo = $("#emailTo").val();
	var emailCC = $("#emailCC").val();
	var massageId = $("#massageId").val();
    var printtype="";
	if ($("#withheader").is(":checked")) {
		printtype="withheader";
	}
    if ($("#withoutheader").is(":checked")) {
    	printtype="withoutheader";
    }
	jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		labRequstId :labRequstId,
    		treatmentId : treatmentId,
    		id : id,
    		gender : gender,
    		emailTo : emailTo,
    		emailCC : emailCC,
    		massageId : massageId,
    		printtype : printtype
		},
		url : "ehat/diagnostics/emailSendingPatinetTestreport",
        success : function(r) {      	
        		alertify.success("Email Send  Successfully");
        		$("#emailTo").val('');
        		$("#emailCC").val('');
        		$("#massageId").val('');
        		$("#patientNameemail").val('');
    			$("#emailreportingPopUp").modal('hide');  
    					
        }
    });
}

/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for set Default RoutineValue
**********************************************************/
function setDefaultRoutineValue()
{
	var patientType=$('#patientgander').val();
	var treatmentId=$('#treatmentID').val();
	var labrequestID=$('#labrequestID').val();
	var barcodeId=$('#barcodeId').val();
	
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"id" : barcodeId,
    		"testmasterId" : labrequestID,
			"treatmentId" : treatmentId,
			"patientType" : patientType	
		},
		url : "ehat/diagnostics/getRoutinevalueResutl",
		        success : function(r) {
			if (r.proLi.length == 0 || r.proLi.length == null) {
			} else {

				for ( var pk = 0; pk < r.proLi.length; pk++) {

					for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
						if (r.proLi[pk].testli[ts].tid != 0) {
							
							var id3 = (pk + 1) + "" + (ts + 1);				
							$('#testresult' + id3).val(r.proLi[pk].testli[ts].defaultvalue);							

						}
					}
				}
			}
		}
    });  
}

/*********************************************************
 * @author Akshay Mache
 * @date 2_July_2020
 * @Code This function is used same patient accepted .
 *********************************************************/
function checkPreviousTreatmentId(id, treatmentId) {
	var idtreament = $("#prevTreatmentIdCheck").val();
	if ($("#"+id+"").is(':checked')){
		if (treatmentId != idtreament && idtreament != 0) {
			alertify.error("Please Select Same Patient for Print");
			$("#" + id + "").prop("checked", false);
			$("#prevTreatmentIdCheck").val(idtreament);
			return false;
		} else {
			$("#prevTreatmentIdCheck").val(treatmentId);
		}
	}else{
		idList = [];
		var currentId;
		$("#previousRecordTableBody").find('input[name="previousRecordCheckbox"]').each(function() {
			if ($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				var data = currentId.split(",");
				if (currentId != "") {
					idList.push(data[0]);
				}
			}
		});

		if (idList.length != 0)
			$("#prevTreatmentIdCheck").val(idList[0]);
		else
			$("#prevTreatmentIdCheck").val(0);
	}
}

/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for validate current date to previous date
**********************************************************/	
function validateDateOutSourceTest()
{
	var date = new Date();
	var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
	
	var arrSceduleDate = ($("#dispatchDate").val()).split("/");	
	var selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]	+ "/" + arrSceduleDate[2]);
	if ((selectedDate < now)) {
		alert('OutSource Test not availables for previous date,please select another date');
         $("#dispatchDate").val("");
		return false;
	} 
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to get outSource Details Record
 *********************************************************/
function getoutSourceDetailsRecord(outmasterId)
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/diagnostics/getoutSourceDetailsRecord",
		data : {
			outmasterId : outmasterId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if (r.sendtOutSourcemasterlist.length > 0) {           
                $("#collectionDate").text(r.sendtOutSourcemasterlist[0].dispatchDate);
                $("#collectiontime").text(r.sendtOutSourcemasterlist[0].dispatchTime);    
            }
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to forward Current Tab Record
 *********************************************************/
function forwardCurrentTabRecord()
{
	window.location.replace("pathology_labresultdashboard.jsp?&tabFlag=CTab");
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to disable pathologist Name
 *********************************************************/
function disablepathologistName() {
	var teststatus11 = $('#teststatus11').val();
	if (teststatus11 == "A" ) {
		$("#rejectId").attr({disabled : "true"});
		$('#pathologistDiv').find('input, button, select').attr('disabled', 'disabled'); 
	}
	
	if (teststatus11 == "PR" ) {
		$("#rejectId").attr({disabled : "true"});
		$('#pathologistDiv').find('input, button, select').attr('disabled', 'disabled'); 
	}

}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to delete OutSource UploadedDocument
 *********************************************************/
function deleteOutSourceUploadedDocument(id,outmasterId) {
	
	var r = confirm("Are you sure you want to delete this document?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/diagnostics/deleteOutSourceUploadedDocument",
			data : {
				"outmasterId" : outmasterId
			},
			 //timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert("Records Deleted Successfully");
			    getOutsourceDocument();
				/*var treatmentId = $('#tretId').val();
				var id = $('#slaveId').val();	*/	
					
			}
		});
	}
}

/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for validate current date to previous date
**********************************************************/	
function validateDateProcessArea()
{
	var date = new Date();
	var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
	
	var arrSceduleDate = ($("#recieveddate").val()).split("/");	
	var selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]	+ "/" + arrSceduleDate[2]);
	if ((selectedDate < now)) {
		alert('Process Area not availables for previous date,please select another date');
         $("#dispatchDate").val("");
		return false;
	} 
	
	
}
/***********************************************************
 * @author Akshay Mache
 * @since  2-July-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function pagination(pageNumber, numberOfPages, callFrom, patientType){
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('callFrom=' + callFrom);
	inputs.push('patientType=' + patientType);
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagnostics/getprocessarearecordpagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
			setTempLabTestResultPatientDashboard(r, callFrom);
	        
	        if(callFrom == "P")
	        	$('#processAreaNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "U")
	    		$('#unauthorisedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "A")
	    		$('#authorisedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "H")
	    		$('#holdNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "R")
	    		$('#recallNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "PR")
	    		$('#previousNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "O")
	    		$('#outsourceNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-July-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function nextPagination(currentIndex, numberOfPages, callFrom, patientType){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousPagination('+currentIndex+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+patientType+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages<displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="pagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+patientType+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="nextPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+patientType+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "P")
		$('#processAreaPagination').html(numberOfRows);
	else if(callFrom == "U")
		$('#unauthorisedPagination').html(numberOfRows);
	else if(callFrom == "A")
		$('#authorisedPagination').html(numberOfRows);
	else if(callFrom == "H")
		$('#holdPagination').html(numberOfRows);
	else if(callFrom == "R")
		$('#recallPagination').html(numberOfRows);
	else if(callFrom == "PR")
		$('#previousPagination').html(numberOfRows);
	else if(callFrom == "O")
		$('#outsourcePagination').html(numberOfRows);
		
	pagination(currentIndex, numberOfPages, callFrom, patientType);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-July-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function previousPagination(currentIndex, numberOfPages, callFrom, patientType){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousPagination('+displayPagination+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+patientType+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="pagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+patientType+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="nextPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+patientType+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		if(callFrom == "P")
			$('#processAreaPagination').html(numberOfRows);
		else if(callFrom == "U")
			$('#unauthorisedPagination').html(numberOfRows);
		else if(callFrom == "A")
			$('#authorisedPagination').html(numberOfRows);
		else if(callFrom == "H")
			$('#holdPagination').html(numberOfRows);
		else if(callFrom == "R")
			$('#recallPagination').html(numberOfRows);
		else if(callFrom == "PR")
			$('#previousPagination').html(numberOfRows);
		else if(callFrom == "O")
			$('#outsourcePagination').html(numberOfRows);
		
		pagination(displayPagination, numberOfPages, callFrom, patientType);
}

/***********************************************************
 * @author Akshay Mache
 * @since  10-July-2020
 * @comment To format date in dd/mm/yyy format.
************************************************************/
function getFormatedDate(inputDate){
	var arr = inputDate.split("/");
	
	var dd = arr[1];
	var mm = arr[0];
	var yyyy = arr[2];
	
	if(dd < 10){
	    dd='0'+dd;
	} 

	if(mm < 10){
	    mm='0'+mm;
	} 
	
	return dd+'/'+mm+'/'+yyyy;
}

function jumpToPage(numberOfPages, callFrom, patientType){
	var pageNo = 0;

	if(callFrom == "C")
		pageNo = $("#currentPageNo").val();
	else if(callFrom == "P")
		pageNo = $("#processAreaPageNo").val();
	else if(callFrom == "U")
		pageNo = $("#unauthorisedPageNo").val();
	else if(callFrom == "A")
		pageNo = $("#authorisedPageNo").val();
	else if(callFrom == "H")
		pageNo = $("#holdPageNo").val();
	else if(callFrom == "R")
		pageNo = $("#recallPageNo").val();
	else if(callFrom == "PR")
		pageNo = $("#previousPageNo").val();
	else if(callFrom == "O")
		pageNo = $("#outsourcePageNo").val();
	
	if(pageNo <= numberOfPages){
		if(callFrom == "C")
			currentRecordPagination(pageNo, numberOfPages, callFrom, patientType);
		else
			pagination(pageNo, numberOfPages, callFrom, patientType);
	}else{
		alert("Invalid page number.");
	}
	
	if(callFrom == "C")
		$("#currentPageNo").val("0");
	else if(callFrom == "P")
		$("#processAreaPageNo").val("0");
	else if(callFrom == "U")
		$("#unauthorisedPageNo").val("0");
	else if(callFrom == "A")
		$("#authorisedPageNo").val("0");
	else if(callFrom == "H")
		$("#holdPageNo").val("0");
	else if(callFrom == "R")
		$("#recallPageNo").val("0");
	else if(callFrom == "PR")
		$("#previousPageNo").val("0");
	else if(callFrom == "O")
		$("#outsourcePageNo").val("0");
}

/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use set Formula To TestResult.
 *********************************************************/
function setFormulaToTestResult(rowCount) {
	
	var formulaForTest = $("#formulaForTest" + rowCount).val();
	
	if (formulaForTest != "" && formulaForTest != "undefined" && formulaForTest != "null") {
		formulaForTest = formulaForTest.replace(/\{/g, "$");
		formulaForTest = formulaForTest.replace(/\}/g, "$");
	
		var applFormula = formulaForTest.split("$");
		//alert(applFormula+"applFormula");
		var expTestIdForm = "";

		for ( var i = 0; i < applFormula.length; i++) {

			var valFieldFinal = 0;

			if (i % 2 == 0) {
				
				if (applFormula[i] != "") {
					valFieldFinal = applFormula[i];
				}
			
			} else {				
				var valField = 0;
				var proLength = $("#proLength").val();	
           
				for ( var k = 0; k <= proLength; k++) 		
				{
					var testLength = $("#testLengthpro" + k).val();
					
					for ( var jk = 1; jk <= testLength; jk++) {

						var namei = applFormula[i];
					//alert(namei+"namei");
						var name = $.trim($("#nameOfTest" + k + jk).val());
						//alert(name+"hhh");

						if (namei == name) {
							matchflag = "Y";
							valField = $("#testresult" + k + jk).val();
							alert(valField+"macth");
							if (valField == "") {
								alert("Enter Value Of "+ $("#nameOfTest" + k + jk).val()+ " Test.");
								break;
							}
							break;
						}

					}					
				}												
				valFieldFinal = valField;				
			}

			if (valFieldFinal != 0) {			
				expTestIdForm = expTestIdForm + valFieldFinal;	
				
			}
		}
		var xrr = 0;		
		xrr=parse(expTestIdForm);
		
		if (xrr != null)
			$("#testresult" + rowCount).val(xrr.toFixed(2));
			$("#testresult"+ rowCount).prop('readonly', true);

	}
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part.
 *********************************************************/
function parse(string) { // wrapper
	var r = {
		string : string,
		offset : 0
	};
	try {
		var value = parseExpr(r);
		if (r.offset < r.string.length) {
			//r.error = 'Syntax error: junk found at offset ' + r.offset;
			throw 'trailingJunk';
		}
		return value;
	} catch (e) {
		alert(r.error + ' (' + e + '):\n' + r.string.substr(0, r.offset)
				+ '<*>' + r.string.substr(r.offset));
		return;
	}
}
/*********************************************************
 * @author Ajay khandare
  * @date 1_04_2020
 * @Code This function is use  calcalute part.
 *********************************************************/
function parseExpr(r) {
	var stack = [ {
		precedence : 0,
		assoc : 'L'
	} ];
	var op;
	var value = parseVal(r); // first value on the left
	for (;;) {
		op = parseOp(r) || {
			precedence : 0,
			assoc : 'L'
		};
		while (op.precedence < stack[stack.length - 1].precedence
				|| (op.precedence == stack[stack.length - 1].precedence && op.assoc == 'L')) {
			// precedence op is too low, calculate with what we've got on the
			// left, first
			var tos = stack.pop();
			if (!tos.exec)
				return value; // end reached
			// do the calculation ("reduce"), producing a new value
			value = tos.exec(tos.value, value);
		}
		// store on stack and continue parsing ("shift")
		stack.push({
			op : op.op,
			precedence : op.precedence,
			assoc : op.assoc,
			exec : op.exec,
			value : value
		});
		value = parseVal(r); // value on the right
	}
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part. //operator table
 *********************************************************/
var ops = {
	'+' : {
		op : '+',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l + r;
		}
	},
	'-' : {
		op : '-',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l - r;
		}
	},
	'*' : {
		op : '*',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			return l * r;
		}
	},
	'/' : {
		op : '/',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			return l / r;
		}
	},
	'**' : {
		op : '**',
		precedence : 30,
		assoc : 'R',
		exec : function(l, r) {
			return Math.pow(l, r);
		}
	}
};
/*********************************************************
 * @author Ajay khandare
 * @date 10_03_2020
 * @Code This function is use  calcalute part. //constants or variables
 *********************************************************/
var vars = {
	e : Math.exp(1),
	pi : Math.atan2(1, 1) * 4
};
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  input for parsing var r = { string: '123.45+33*8', offset: 0 };
 * r is passed by reference: any change in r.offset is returned to the caller
 * functions return the parsed/calculated value
 *********************************************************/
function parseVal(r) {
	var startOffset = r.offset;
	var value;
	var m;
	// floating point number
	// example of parsing ("lexing") without aid of regular expressions
	value = 0;
	while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
			&& r.offset < r.string.length)
		r.offset++;
	if (r.string.substr(r.offset, 1) == ".") {
		r.offset++;
		while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
				&& r.offset < r.string.length)
			r.offset++;
	}
	if (r.offset > startOffset) { // did that work?
		// OK, so I'm lazy...
		return parseFloat(r.string.substr(startOffset, r.offset - startOffset));
	} else if (r.string.substr(r.offset, 1) == "+") { // unary plus
		r.offset++;
		return parseVal(r);
	} else if (r.string.substr(r.offset, 1) == "-") { // unary minus
		r.offset++;
		return negate(parseVal(r));
	} else if (r.string.substr(r.offset, 1) == "(") { // expression in parens
		r.offset++; // eat "("
		value = parseExpr(r);
		if (r.string.substr(r.offset, 1) == ")") {
			r.offset++;
			return value;
		}
		r.error = "Parsing error: ')' expected";
		throw 'parseError';
	} else if (m = /^[a-z_][a-z0-9_]*/i.exec(r.string.substr(r.offset))) { // variable/constant
		// name
		// sorry for the regular expression, but I'm too lazy to manually build
		// a varname lexer
		var name = m[0]; // matched string
		r.offset += name.length;
		if (name in vars)
			return vars[name]; // I know that thing!
		r.error = "Semantic error: unknown variable '" + name + "'";
		throw 'unknownVar';
	} else {
		if (r.string.length == r.offset) {
			r.error = 'Parsing error at end of string: value expected';
			throw 'valueMissing';
		} else {
			r.error = "Parsing error: unrecognized value";
			throw 'valueNotParsed';
		}
	}
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part. 
 *********************************************************/
function negate(value) {
	return -value;
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part. 
 *********************************************************/
function parseOp(r) {
	if (r.string.substr(r.offset, 2) == '**') {
		r.offset += 2;
		return ops['**'];
	}
	if ("+-*/".indexOf(r.string.substr(r.offset, 1)) >= 0)
		return ops[r.string.substr(r.offset++, 1)];
	return null;
}

/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use fetch Lab Name. 
 *********************************************************/
function getOutSourceLabName(){
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url : "ehat/diagnostics/getOutSourceLabName",
		success : function(r) {		
			setTemplatelabname1(r);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is set Template labname. 
 *********************************************************/
function setTemplatelabname1(r){
	var list="<option value='0'>-select-</option>";	
	for ( var i = 0; i < r.listOutSourceMaster.length; i++) {
		list=list+'<option value="'+(r.listOutSourceMaster[i].outsourceId)+'">'+(r.listOutSourceMaster[i].outSourcelabName)+'</option>';		
	}	
	$("#labnameId").html(list);	
	$("#labnameId").select2();
}


/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use fetch Lab Name. 
 *********************************************************/
function getGroupNameforTest(){
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url : "ehat/diagnostics/getGroupNameforTest",
		success : function(r) {		
			setTemplateGroupName(r);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is set Template labname. 
 *********************************************************/
function setTemplateGroupName(r){
	var list="<option value='0'>-select-</option>";	
	for ( var i = 0; i < r.lstSubService.length; i++) {
		list=list+'<option value="'+(r.lstSubService[i].subId)+'">'+(r.lstSubService[i].categoryName)+'</option>';		
	}	
	$("#groupNameId").html(list);	
	$("#groupNameId").select2();
}


/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use fetch Test Name. 
 *********************************************************/
function getSubServiceTestName(){
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url : "ehat/diagnostics/getSubServiceTestName",
		success : function(r) {		
			setTemplateTestName(r);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is set Template labname. 
 *********************************************************/
function setTemplateTestName(r){
	var list="<option value='0'>-select-</option>";	
	for ( var i = 0; i < r.lstSubService.length; i++) {
		list=list+'<option value="'+(r.lstSubService[i].subId)+'">'+(r.lstSubService[i].categoryName)+'</option>';		
	}	
	$("#testId").html(list);	
	$("#testId").select2();
}
/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for set Default RoutineValue OutSource
**********************************************************/
function setDefaultRoutineValueOutSource()
{    
	var id=$('#barcodeId').val();
	var labrequestID=$('#labrequestID').val();
	var treatmentId=$('#treatmentID').val();
	var outmasteId=$('#outmasteId').val();
	var patientType=$('#patientgander').val();
		
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"id" : id,
    		"testmasterId" : labrequestID,
			"treatmentId" : treatmentId,
			"outmasterid" : outmasteId,
			"patientType" : patientType	
		},
		url : "ehat/diagnostics/getRoutinevalueOutSourceResut",
		        success : function(r) {
			if (r.proLi.length == 0 || r.proLi.length == null) {
			} else {

				for ( var pk = 0; pk < r.proLi.length; pk++) {

					for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
						if (r.proLi[pk].testli[ts].tid != 0) {
							
							var id3 = (pk + 1) + "" + (ts + 1);				
							$('#testresult' + id3).val(r.proLi[pk].testli[ts].defaultvalue);							

						}
					}
				}
			}
		}
    });  
}

function openBarcodePopup(id, testName, collectionDate, collectionTime, collectionCenter) {
	$("#testname").val(testName);
	$("#testid").val(id);
	$("#sampleCollectionDate").val(collectionDate);
	$("#sampleCollectionTime").val(collectionTime);
	$("#sampleCollectionCenter").val(collectionCenter);
	
	$('#barcodePopup').modal("show");
	$('#barcodePopup').modal();
};

function printBarcode() {
	var masterId = $("#testid").val();
	var tempPatient = $("#patientName"+masterId).val();
	var patientId = $("#patientId"+masterId).val();
	var tempAge = $("#age"+masterId).val();	
	var sex = $("#sex"+masterId).val();
	
	var tempTestName = $("#testname").val();
	var collectionDate = $("#sampleCollectionDate").val();
	var collectionTime = $("#sampleCollectionTime").val();
	var collectionCenter = $("#sampleCollectionCenter").val();
	
	var gender = "";
	if(sex == "Male")
		gender = "M";
	else if(sex == "Female")
		gender = "F";
	var count = 1;
	var centerId = 0;
	
	if ($("#txtBarcodecnt").val() != '' && $("#txtBarcodecnt").val() != null) {
		count = $("#txtBarcodecnt").val();
	}
	
	if(tempPatient && tempTestName){
		window.open("pathology_labtest_barcode.jsp?masterId=" + masterId + "&count="
				+ count + "&tempPatient="+ tempPatient +"&tempAge="+ tempAge + "&tempTestName="+ tempTestName+ "&collectionDate="+ collectionDate+ "&collectionTime="+ collectionTime+ "&patientId="+ patientId+ "&gender="+ gender+ "&centerId="+ centerId+ "&centerName="+ collectionCenter);
	}
	
	$("#txtBarcodecnt").val('');
	$("#testName").val('');
	$("#testId").val(0);

	$('#barcodePopup').modal("hide");
}