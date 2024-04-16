/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for createDivIPDHistoryTemplate
	 * *****/
function createDivIPDHistoryTemplate(callfrom){
	
var rowCount = $('#historyTable1 tbody tr').length;
	
	rowCount=parseInt(rowCount+1);
	
	
	var htm = "";

	htm = htm
			+ "<tr class='newRowHistoryRow' id='count"+ parseInt(rowCount)+ "'>"			

			+ "<td > <span id='snum"+parseInt(rowCount)+"'>"+parseInt(rowCount)+"</span><input type='hidden'   id='historySlaveId"+parseInt(rowCount)+"' value=" + 0 + " ></td>"
			
			+ "<td style='width: 282px; height: 41pxpx; '><textarea rows='1' cols='10'  id='chiefComp"+parseInt(rowCount)+ "'  > </textarea></td>"
			
			
				
				+ "<td style='width: 50.96%; height: 21.5px;'  ><div class='col-md-12-1' style='margin-top:5%' ><div class='col-md-6-1' style='margin-top:-3%'><input type='range'  min='0' max='100' class='defaultSlider' id='defaultSliderr_"+rowCount+" ' style='font-size: 11px; width:120%;'  " 
			+ " value='' 	/></div>"
			+"<p class='note'><div class='col-md-6-1' ><span class='duration_"+rowCount+" ' ></span>"
			+ "<input type ='text' class='col-sm-2-1' style='margin-left:125%; margin-top:-7.3%; font-weight:bold;'    id='qty"+parseInt(rowCount) +"' onkeyup='changeSliderInHistory("+rowCount+")' /> "
			+ "<select class='col-sm-6-1' style='margin-left:150%; margin-top:-9.6%;' id='day_month_year"+parseInt(rowCount) +"' " 
			+ " name='day_month_year'>"
			+ "<option value=''>-Select-</option>  <option value='Hours'>Hours</option>  <option value='Days'>Days</option>"
			+ "<option value='Month'>Month</option> <option value='Year'>Year</option> </select> "
			+ "</p></div></div></td>"
				
			
			
			
			
			
				
				
			+ "<td><input type='checkbox' class='chkhistory' id='checkbox"+ parseInt(rowCount)+"' name='checkbox'  value="+parseInt(rowCount)+"></td>"
			
			+ "</tr>";
	
	$("#historyDiv").append(htm);
	
	
	//+ "<td ><input type='text'   id='chiefCompyy"+parseInt(rowCount) + "'  > </td>"
	//+ "<td ><input type='text'   id='chiefComp"+parseInt(rowCount) + "'  > </td>"
	
	
}

function changeSliderInHistory(cnt){
	
	
	var qty = $("#qty"+cnt).val();
	

	$("#defaultSlider_"+cnt).val(qty);
	}


/******
 * @author   :HM00054
 * @Date     :29-12-2021
 * @Code     :this method used for removeChifCompIPD
 * *****/
function removeChifCompIPD(){
	
	var tableId="historyTable1";
	var	checkboxClass="chkhistory";
	

	var docId = new Array();
	//var userId		= parseInt($("#userId").val());
	$("input[name='ovampickudocid']:checked").each(function() {	
	
		var slaveId=$("#historySlaveId"+$(this).val()).val();
		
		if(slaveId >0){
	
			docId.push($("#historySlaveId"+$(this).val()).val());
		}
	});

	

	
   if(docId.length>0){

	 var inputs = [];
		inputs.push('historySlaveId=' + docId);
		inputs.push('userId=' + 1);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ipdhistorytemplate/deleteIPDHistorytemplateSalve",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
				if(r==1){
				alert("Record Deleted Sucessfully");
				}else{
					alert("Network Issue");
				}
				checkForFreshEmbryo(tableId);
				checkFreshEmbryoSequenece(tableId);
				//getIvfCalenderInfo();
				
				
				 
			}
		}); 
   } else{
	  
	  
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForFreshEmbryo(tableId);
	checkFreshEmbryoSequenece(tableId); 
	
   }
	
}

/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder srno after delete
 ************/
function checkForFreshEmbryo(tableId){
	debugger;
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		
		$('#'+id).html(key+1);
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkFreshEmbryoSequenece(tableId){

	var trLength = $('#'+tableId).find("tr:first th").length;
	trLength=trLength+1;
	//obj=$('#'+tableId+' tbody tr td').find('td,span,input,div,p,select').id;
	obj=$('#'+tableId+' tbody tr td').find('input,select,span,td,checkbox');
	var inx = 1;
	var idIndex = 1;
	$.each( obj, function( key, value ) {		
		
		if(inx == (trLength+1)){
			
			inx = 1;
			idIndex++;
		}		
		id=value.id;	
		
		var idText = (value.id).replace(/[0-9]/g, '');
		
		var replaceById = idText + idIndex;
		$('#'+id).attr('id',replaceById);
		
		
		inx++;
	});
}



/******
 * @author   :HM00054
 * @Date     :29-12-2021
 * @Code     :this method used for save ipd template
 * *****/

function saveIPDHistorytemplate(){
	
	var templateHistoryId=$("#selCustomizeTemp").val();

//		var historyId=0;
		
		
		var templateName=$("#customizeTemplateName").val().trim();
		
		
		if(templateName == null || templateName == "" || templateName == undefined || templateName == "undefined"){
			alert("Please Enter Template Name..");
			return false;
		}
		
		
		var medicalOfficerName=$("#medOffName").val();
		
		var mrnNo=$("#mrn").val();
		
		
		
		var chiefComplaintss=$("#chiefComplaintsTxt").val();
		
		var negativeHistory=$("#clinicalFinding").val();
		
		var dmFlag="N";
		if($('#chkDm').is(':checked')){ 
			dmFlag="Y";
		} 
		var dmDuration=$("#txtDm").val();
		
		
		var htnFlag="N";
		if($('#chkHtn').is(':checked')){ 
			htnFlag="Y";
		} 
		
		var htnDuration=$("#txtHtn").val();
		
		var ihdFlag="N";
		
		
		if($('#chkIhd').is(':checked')){ 
			ihdFlag="Y";
		} 
		
		var ihdDuration=$("#txtIhd").val();
		
		var bacopdFlag="N";
		
		if($('#chkBaco').is(':checked')){ 
			bacopdFlag="Y";
		} 
		
		var bacopdDuration=$("#txtBaco").val();
		
		var otherFlag="N";
		
		if($('#chkOther').is(':checked')){ 
			otherFlag="Y";
		} 
		
		var otherDuration=$("#txtOther").val();
		
		var pastSurgicalHistory=$("#pastSurgHistory").val();
		
		var medications=$("#medications").val();
		
		var obsHistory=$("#gynac").val();
		
		var anyAllergy=$("#drugReaction").val();
		
		var familyHistory=$("#familyHis").val();
		
		var personalHistory=$("#perHistory").val();
		
		var temperature=$("#temparature").val();
		/*var aa=/[^a-zA-Z0-9]/.test( temperature );
		     
		   if(aa==true){
			   alert("Teamperature Should Not Accept Special Symbol..");
			   return false;
		   }*/
		
		var pallor=$("#pallor").val();
		
		var icterus=$("#lcterus").val();
		
		var pulse=$("#pulse").val();
		
		var clubbing=$("#clubbing").val();
		
		var oedema=$("#oedema").val();
		
		var bp=$("#bp").val();
		
		var lymphAdenopathy=$("#lymph").val();
		
		var cvs=$("#cvs").val();
		
		var rs=$("#rs").val();
		
		var pa=$("#pa").val();
		
		var cns=$("#cns").val();
		
		var localExamination=$("#localExm").val();
		
		var investigationReport=$("#invsRep").val();
		
		var provisionDignosis=$("#provDia").val();
		
		var treatmentPlan=$("#treatPlan").val();
		
		var historySlaveList = {
				getListOfHistorySlaveDTO : []
			};
		
	var rows = $('#historyTable1 tbody tr.newRowHistoryRow').length;
		
		for ( var i = 1; i <= rows; i++) {
			var historySalveId = $("#historySlaveId" + i).val();
			

			var chiefComplaints = $("#chiefComp" + i).val();
			var duration = $("#qty" + i).val();
			var durationType = $("#day_month_year" + i).val();
			
			if(chiefComplaints.trim() === ""){
				alert("Cheif Complaints Must Be Filled Out");
				return false;
			}
			if(duration.trim() == ""){
				alert("Please Select Duration Quantity");
				return false;
			}
			
			if(durationType.trim() == ""){
				alert("Please Select Duration");
				return false;
			}
			
			

			setHistorySlavefoInfoList(historySlaveList, historySalveId,
					chiefComplaints, duration, durationType);
		}
		
		historySlaveList = JSON.stringify(historySlaveList);
		
		
	var inputs = [];
		
		inputs.push('templateHistoryId=' + templateHistoryId);
		
		
		
		
		inputs.push('templateName=' + templateName);
		
		inputs.push('medicalOfficerName=' + medicalOfficerName);
		
		inputs.push('mrnNo=' + mrnNo);
		
		inputs.push('chiefComplaints=' + chiefComplaintss);
		
		inputs.push('negativeHistory=' + negativeHistory);
		
		inputs.push('dmFlag=' + dmFlag);
		
		inputs.push('dmDuration=' + dmDuration);
		
		inputs.push('htnFlag=' + htnFlag);
		
		inputs.push('htnDuration=' + htnDuration);
		
		inputs.push('ihdFlag=' + ihdFlag);
		
		inputs.push('ihdDuration=' + ihdDuration);
		
		inputs.push('bacopdFlag=' + bacopdFlag);
		
		inputs.push('bacopdDuration=' + bacopdDuration);
		
		inputs.push('otherFlag=' + otherFlag);
		
		inputs.push('otherDuration=' + otherDuration);
		
		inputs.push('pastSurgicalHistory=' + pastSurgicalHistory);
		
		inputs.push('medications=' + medications);
		
		inputs.push('obsHistory=' + obsHistory);
		
		inputs.push('anyAllergy=' + anyAllergy);
		
		inputs.push('familyHistory=' + familyHistory);
		
		inputs.push('personalHistory=' + personalHistory);
		
		inputs.push('temperature=' + temperature);
		
		inputs.push('pallor=' + pallor);
		
		inputs.push('icterus=' + icterus);
		
		inputs.push('pulse=' + pulse);
		
		inputs.push('clubbing=' + clubbing);
		
		inputs.push('oedema=' + oedema);
		
		inputs.push('bp=' + bp);
		
		inputs.push('lymphAdenopathy=' + lymphAdenopathy);
		
		inputs.push('cvs=' + cvs);
		

		
		inputs.push('rs=' + rs);
		
		inputs.push('pa=' + pa);
		
		inputs.push('cns=' + cns);
		
		inputs.push('localExamination=' + localExamination);
		
		inputs.push('investigationReport=' + investigationReport);
		
		inputs.push('provisionDignosis=' + provisionDignosis);
		
		inputs.push('treatmentPlan=' + treatmentPlan);
		
		inputs.push("historySlaveList="	+ encodeURIComponent(historySlaveList));
		
	//inputs.push('patientId=' + patientId);
		
		//inputs.push('treatmentId=' + treatmentId);
		
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdhistorytemplate/saveIPDHistorytemplate",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				response = r;
				if (r == 1) {
					alert("Record Saved Successfully");
					refreshHistoryData();
					getIPDHistoryTemplateList();
				}else if(r==2) {
					alert("Record Updated Successfully");
					refreshHistoryData();
					getIPDHistoryTemplateList();
				}else if(r ==3){
					alert("Template Name Already Exists..");
				}
				else {
					alert("Network Issue..");
				}

				
				

			}
		});
		
		
	}
/******
 * @author   :HM00054
 * @Date     :29-12-2021
 * @Code     :this method used for set ipd slave info in list
 * *****/
	function setHistorySlavefoInfoList(historySlaveList, historySalveId,chiefComplaints, duration, durationType){
		
		historySlaveList.getListOfHistorySlaveDTO.push({
			historySalveId : historySalveId,
			chiefComplaints : chiefComplaints,
			duration : duration,
			durationType : durationType,
			
			
		});
		
	}

	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for refresh ipd template data
	 * *****/
	function refreshHistoryData(){
		//$("#historyMasterId").val(0);
		$("#selCustomizeTemp").val(0);
		$("#customizeTemplateName").val(" ")
		$("#medOffName").val(" ");
		$("#mrn").val(" ");
		$("#chiefComplaintsTxt").val(" ");
		$("#clinicalFinding").val(" ");
		
		$('#chkDm').prop('checked', false);
		$("#txtDm").val(" ");
		
		$('#chkHtn').prop('checked', false);
		$("#txtHtn").val(" ");
		
		$('#chkIhd').prop('checked', false);
		$("#txtIhd").val(" ");
		
		
		$('#chkBaco').prop('checked', false);
		$("#txtBaco").val(" ");
		
		
		$('#chkOther').prop('checked', false);
		$("#txtOther").val(" ");
		
		$("#pastSurgHistory").val(" ");
		
		$("#medications").val(" ");
		
		$("#gynac").val(" ");
		
		$("#drugReaction").val(" ");
		
		$("#familyHis").val(" ");
		
		$("#perHistory").val(" ");
		
		$("#temparature").val(" ");
		
		$("#pallor").val(" ");
		
		$("#lcterus").val(" ");
		
		$("#pulse").val(" ");
		
		$("#clubbing").val(" ");
		
		$("#oedema").val(" ");
		
		 $("#bp").val(" ");
		
		$("#lymph").val(" ");
		
		$("#cvs").val(" ");
		
		$("#rs").val(" ");
		
		$("#pa").val(" ");
		
		$("#cns").val(" ");
		
		$("#localExm").val(" ");
		
		$("#invsRep").val(" ");
		
		 $('#historyTable1').html(" ");
		 
			$("#historyDiv").html(" ");
	}

	
	

	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for getIPDHistorytemplateById
	 * *****/
	
	function getIPDHistorytemplateById(){
		
		var id=$("#selCustomizeTemp").val();
			
			var dpid=1;
			
			var inputs = [];
			inputs.push('id=' + id);
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "ehat/ipdhistorytemplate/getIPDHistorytemplateById",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					if( r == ""){
						refreshHistoryData();
					}else{
					
					
					$("#selCustomizeTemp").val(r.templateHistoryId);
					$("#customizeTemplateName").val(r.templateName)
					//$("#selCustomizeTemp").val(0);
					$("#medOffName").val(r.medicalOfficerName);
					$("#mrn").val(r.mrnNo);
					$("#chiefComplaintsTxt").val(r.chiefComplaints);
					$("#clinicalFinding").val(r.negativeHistory);
					if(r.dmFlag == "Y"){
						$('#chkDm').prop('checked', true);
					}else{
					$('#chkDm').prop('checked', false);
					}
					$("#txtDm").val(r.dmDuration);
					
					if(r.htnFlag == "Y"){
					$('#chkHtn').prop('checked', true);
					}else{
						$('#chkHtn').prop('checked', false);
					}
					$("#txtHtn").val(r.htnDuration);
					
					if(r.ihdFlag == "Y"){
						$('#chkIhd').prop('checked', true);
					}else{
					$('#chkIhd').prop('checked', false);
					}
					
					$("#txtIhd").val(r.ihdDuration);
					
					if(r.bacopdFlag == "Y"){
						$('#chkBaco').prop('checked', true);
					}else{
					$('#chkBaco').prop('checked', false);
					}
					$("#txtBaco").val(r.bacopdDuration);
					
					if(r.otherFlag == "Y"){
						$('#chkOther').prop('checked', true);
					}else{
					$('#chkOther').prop('checked', false);
					}
					$("#txtOther").val(r.otherDuration);
					
					$("#pastSurgHistory").val(r.pastSurgicalHistory);
					
					$("#medications").val(r.medications);
					
					$("#gynac").val(r.obsHistory);
					
					$("#drugReaction").val(r.anyAllergy);
					
					$("#familyHis").val(r.familyHistory);
					
					$("#perHistory").val(r.personalHistory);
					
					$("#temparature").val(r.temperature);
					
					$("#pallor").val(r.pallor);
					
					$("#lcterus").val(r.icterus);
					
					$("#pulse").val(r.pulse);
					
					$("#clubbing").val(r.clubbing);
					
					$("#oedema").val(r.oedema);
					
					 $("#bp").val(r.bp);
					
					$("#lymph").val(r.lymphAdenopathy);
					
					$("#cvs").val(r.cvs);
					
					$("#rs").val(r.rs);
					
					$("#pa").val(r.pa);
					
					$("#cns").val(r.cns);
					
					$("#localExm").val(r.localExamination);
					
					$("#invsRep").val(r.investigationReport);
					
					$("#provDia").val(r.provisionDignosis);
					
					$("#treatPlan").val(r.treatmentPlan);
					setHistorySlaveInfo(r);
					}
				}
					
			
				});
			
		}

	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for ipd slave info
	 * *****/
	function setHistorySlaveInfo(r){
		var rowCount=1;
		var htm = "";
		
		$("#historyDiv").html(" ");

		
		
		for(var i=0; i <r.getListOfHistorySlaveDTO.length;i++  ){
			
		htm = htm
				+ "<tr class='newRowHistoryRow' id='count"+ parseInt(rowCount)+ "'>"
				

				+ "<td> <span id='snum"+parseInt(rowCount)+"'>"+parseInt(rowCount)+"</span><input type='hidden'   id='historySlaveId"+parseInt(rowCount) + "' value=" + r.getListOfHistorySlaveDTO[i].historySalveId + " ></td>"
				
				+ "<td style='width: 282px; height: 41pxpx; '><textarea rows='1' cols='10'  id='chiefComp"+parseInt(rowCount)+ "'   >"+r.getListOfHistorySlaveDTO[i].chiefComplaints+" </textarea></td>"
					
					
				+ "<td style='width: 50.96%; height: 21.5px;'  ><div class='col-md-12-1' style='margin-top:5%' ><div class='col-md-6-1' style='margin-top:-3%'><input type='range'  min='0' max='100' class='defaultSlider' id='defaultSlider_"+rowCount+" ' style='font-size: 11px; width:120%;' name='duration' " 
					+ " value='"+r.getListOfHistorySlaveDTO[i].duration+"' id='duration_"+parseInt(rowCount)+" '	/></div>"
					+"<p class='note'><div class='col-md-6-1' id='divipd'><span class='duration_"+parseInt(rowCount)+" ' ></span>"
					+ "<input type ='text' class='col-sm-2-1' style='margin-left:125%; margin-top:-7.3%; font-weight:bold;' name='qty"+parseInt(rowCount)+" '   id='qty"+parseInt(rowCount) +"' onkeyup='changeSliderInHistory("+rowCount+")' value='"+r.getListOfHistorySlaveDTO[i].duration+"' /> "
					+ "<select class='col-sm-6-1' style='margin-left:150%; margin-top:-9.6%;' id='day_month_year"+parseInt(rowCount)+"'  " 
					+ " name='day_month_year'>"
					+ "<option value=''>-Select-</option>  <option value='Hours'>Hours</option>  <option value='Days'>Days</option>"
					+ "<option value='Month'>Month</option> <option value='Year'>Year</option> </select> "
					+ "</td></p></div></div>"
					
					
				
				+ "<td><input type='checkbox'   name='ovampickudocid'  class='chkhistory' id='checkbox"+ parseInt(rowCount)+"'  value="+rowCount+"  ></td>"
				
				
				+ "</tr>";
		rowCount++;
		}
		
		var count=1;
		
		
		$("#historyDiv").append(htm);
		
		for(var i=0; i < r.getListOfHistorySlaveDTO.length;i++ ){
			
			
			$("#day_month_year"+(i+1)).val(r.getListOfHistorySlaveDTO[i].durationType);
		}
		
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for getIPDHistoryTemplateList
	 * *****/
	
	function getIPDHistoryTemplateList(){


		//var unitId = $("#unitId").val();
		var inputs = [];

		//inputs.push('departmentId=' + 1);//diet->diet opd
		inputs.push('unitId=' + 1);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ipdhistorytemplate/getIPDHistoryTemplateList",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {

				var divContent = "<option value='0'>New Template</option>";
	            for ( var i = 0; i < r.getListOfOPDHistoryDTO.length; i++){
		                divContent = divContent + "<option value='" + r.getListOfOPDHistoryDTO[i].templateHistoryId + "'  >"
		                        + r.getListOfOPDHistoryDTO[i].templateName + "</option>";
	            }
	            $("#selCustomizeTemp").html(divContent);
	           // $("#selCustomizeTemp").select2();
	          
			}		
		});

		
	}
	
	