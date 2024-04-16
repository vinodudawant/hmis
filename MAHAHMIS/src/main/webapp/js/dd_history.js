/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for give  opd history template 
	 * *****/
function giveHistoryTemplate(id){
	setHistoryTemplate(id);
}



/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for set  opd history template
 * *****/
function setHistoryTemplate(id){
	
	var mrnno = getMrnno();/*Added By Annapurna*/	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	
	//Added By Akshata
	$("#ddInstructions").hide();
	$("#instruct").hide();
	
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	
	var temp = '<div class="tab-pane active" id="History">'
			+ ' <div style="padding-top: 0px;" class="col-md-12-1" id="historyRow"></div>'
			+ '<div style="margin-top: -9px; margin-left: 5px;" class="tabbable tabs-left col-md-12-1">'
			

			
			+ '<div style="margin-top: 0px;" class="tab-content col-md-12-1">'
			+ '<div class="tab-pane fade active in col-md-12-1" id="chiefComplaints">'
			+ '<div style="margin-top: 8px;" class="tab-content col-md-12-1">'
			+ '<div style="padding-left: 1%;padding-top: 5px;" class="col-sm-12-1">'
			+ '<div class="col-md-1-1"  style="margin-top: 15px;">	<label class="TextFont">Template List</label></div>'
			+ '<div class="col-md-3-1"  style="margin-top: 15px;">'
			+ '<select id="selCustomizeTemp" name="selCustomizeTemp" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText " onchange="getIPDHistorytemplateById()"><option value="0" >NewTemplate</option>	</select></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-2-1">'
			+ '<label class="TextFont">Medical Officer Name.</label></div>'
			+ '<div style="padding-left: -5%; margin-top: 15px;" class="col-sm-2-1">'
			+ '<input type="text" value="" readonly="readonly" name="name" id="medOffName" class="form-control input-SmallText">'
			+ '</div><div style="margin-top: 15px; padding-left: 0%;" class="col-sm-1-1">'
			+ '<label class="TextFont">MRN No.</label></div>'
			+ '<div style="margin-top: 15px;width:150px" class="col-sm-1-1">'
			//Added By Annapurna
			+ '<input type="text" value="'+mrnno+'" readonly="readonly" name="mrn" id="mrn" class="form-control input-SmallText">'
			+ '</div></div>'
		//	<input type="text" value="MS16170000001483" readonly="readonly" name="mrn" id="mrn" class="form-control input-SmallText">// commented By Annapurna
			+ '<div style="margin-top: -32px; margin-left:94%;" class="col-sm-2-1"><div class="divide-10"></div>'
			+ '<button onclick="saveOPDHistory()" title="Save History " data-placement="left" data-toggle="tooltip" id="saveAddIpdHistory" class="btn btn-xs btn-success editUserAccess" style="margin-left: 2px;">'
			+ '<i class="fa fa-save"></i>'
			+ '</button><button onclick="prinOPDHistory();" title="Print " data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning coversheetBtn">'
			+ '<i class="fa fa-print"></i></button></div></div>'
			+ '<div><label class="TextFont">CHIEF COMPLAINTS :</label><div>'
			+ '<div style="margin-top: 25px;" class="col-sm-12-1" id="row_1"> </div>'
			+ ' <table style="margin-top: 25px; width: 100%;" class="table table-bordered" id="historyTable"><thead><tr>'
			+ '<th style="  width: 25px; height: 21.5px; font-size: &quot;103&quot;;" class="col-sm-1-1 center"><label class="TextFont">#</label></th>'
			+ '<th style="  width: 102px; height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-4-1 center"><label class="TextFont">Chief Complaints</label></th>'
			+ '<th style="height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-6-1 center"><label class="TextFont"> Duration</label></th>'
			+ '<th style="height: 21.5px; width: 15px;"><input type="button" value="+" onclick="createDivIPDHistory()"> <input type="button" value="-" onclick="removeChifComp(\'historyTable1\',\'chkhistory\')">'
			+ '</th></tr></thead></table><div style="width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;">'
			+ '<table class="table table-condensed table-bordered table-stripped cf" id="historyTable1">'
			+ '<tbody id="historyDiv"></tbody></table></div>'

			+ '<div style="padding-left: 1%; margin-top: 2%;" class="col-md-10-1"><label id="ibch1"class="TextFont">Chief Complaints:</label>'
			+ '<textarea class="" cols="52" rows="1" id="chiefComplaintsTxt"></textarea></div>'

			+ '<div style="padding-left: 1%; margin-top: 2%;" class="col-md-10-1"><label class="TextFont">Negative History:</label>'
			+ '<textarea class="" cols="52" rows="3" id="clinicalFinding"></textarea></div>'

			/* +'<div><label class="TextFont">Past Medical History :</label><div>' */
			+ '<div class="tab-pane fade active in col-md-12-1" id="pastMedHistory"><div style="margin-top: 8px;" class="tab-content col-md-12-1">'
			+ '</div><div style="margin-top: 10px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%">'
			+ ' </div><div style="font: bold; padding-bottom: 1%; padding-top: 2%; padding-left: 2%;" class="col-md-5-1 form-group">'
			+ '<label>PAST/PERSONAL/FAMILY HISTORY :</label><div style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif; padding-top: 1%; font-size: 13px; float:;" id="tableContent">'

			+ '<table cellspacing="0" cellpadding="0" style="border: 1px solid lightgrey;">'
			+ '<tbody><tr>'
			+ '	<td align="center" style="height: 35px; border: 1px solid lightgrey;"></td>'
			+ '<td align="center" style="height: 35px; border: 1px solid lightgrey;">Yes/No</td>'
			+ '<td align="center" style="height: 35px; border: 1px solid lightgrey;">Duration</td>'
			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">DM</td>'
			+ '<td width="20%" ;="" style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkDm" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtDm" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'

			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">HTN</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkHtn" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtHtn" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">IHD</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkIhd" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtIhd" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td></tr>'
			+ '<tr><td width="30%" align="center" style="border: 1px solid lightgrey;">BA/COPD</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkBaco" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtBaco" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'

			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">OTHER</td>'
			+ '<td style="border: 0.2px solid lightgrey;">'
			+ '<input type="checkbox" id="chkOther" style="width: 105%; border: 0.2px solid lightgrey;" name="">'
			+ '</td>'
			// +'<td><input type="text" id="txtOther" style="width: 100%;
			// border: 0.2px solid lightgrey;"
			// name=""></td></tr></tbody></table>'
			+ '<td><textarea id="txtOther" style="width: 100%; border: 0.2px solid lightgrey;"></textarea></td></tr></tbody></table>'
			+ '</div></div>'

			+ '<div id="PastPresentFamilyHistory" class="col-md-6-1" style="padding-left: 0%; margin-top: 1%;">'
			+ '<div class="col-md-12-1">'
			+ '<div style="padding-left: 0%; margin-top: 2%;" class="col-md-6-1">'
			+ '<label class="TextFont">Past Surgical History:</label><textarea class="" cols="39" rows="2" id="pastSurgHistory"></textarea>'
			+ '</div>'
			+ '<div style="padding-left: 10%; margin-top: 2%;" class="col-md-6-1">'
			+ '<label class="TextFont">Medications:</label><textarea class="" cols="39" rows="2" id="medications"></textarea>'
			+ '</div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left: 0%;">'
			+ '<label class="TextFont">GYNAE/OBS History :</label><textarea class="" cols="39" rows="2" id="gynac"></textarea>'
			+ '</div>'
			+ '<div class="col-md-6-1" style="padding-left: 10%;">'
			+ '<label class="TextFont">Any allergies or adversedrug reactions?:</label>'
			+ '<textarea class="" cols="39" rows="2" id="drugReaction"></textarea></div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left: 0%;"><label class="TextFont">Family History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="familyHis"></textarea></div>'
			+ '<div class="col-md-6-1" style="padding-left: 10%;"><label class="TextFont">Personal History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="perHistory"></textarea></div>'
			+ '</div>'

			+ '</div>'
			+ '</div>'

			/*
			 * +'<div class="tab-pane fade active in col-md-12-1"
			 * id="PastPresentFamilyHistory">'
			 */
			/* +'<div><label class="TextFont">Past/Personal/Family History :</label><div>' */
			/*
			 * +'<div style="margin-top: 8px;" class="col-sm-12-1" id="row_1"></div>' +'<div
			 * class="col-md-4-1"><label class="TextFont">Past Reguler :</label>' +'<textarea
			 * class="" cols="40" rows="3" id="pastReguler"></textarea>' +'</div><div
			 * style="padding-left: 0.8%;" class="col-md-4-1">' +'<label
			 * class="TextFont">Present Reguler :</label><textarea class=""
			 * cols="40" rows="3" id="PresentReguler"></textarea>' +'</div>'
			 */

			+ '<div style="padding-right: 8px; margin-top: 1%;" class="col-md-12-1">'

			+ '<div class="divide-10"></div><div class="col-md-4-1" style="display:none;">'
			+ '<label class="TextFont">Habbits:</label>'
			+ '<textarea class="" cols="40" rows="3" id="habbits"></textarea></div>'
			+ '<div style="padding-left: 0.8%;display:none;" class="col-md-4-1">'
			+ '<label class="TextFont">Bowel:</label><textarea class="" cols="40" rows="3" id="bowel"></textarea>'
			+ '</div>'
			+ '<div style="padding-left: 1.6%;display:none;" class="col-md-4-1"><label class="TextFont">Blader:</label>'
			+ '<textarea class="" cols="40" rows="3" id="blader"></textarea></div>'
			+ '</div></div>'

			+ '<div class="tab-pane fade active in col-md-12-1" id="OnExaminations">'
			+ '<div style="margin-top: -17px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+ '<div><label class="TextFont">ON EXAMINATION :</label><div>'
			+ '<div style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1">'
			+ '<div class="divide-10"></div><label class="TextFont">VITALS:</label>'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Temperature:</label> <input type="text" class="form-control input-SmallText" placeholder="Temparature" name="temparature" id="temparature">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Pulse:</label> <input type="text" class="form-control input-SmallText" placeholder="Pulse" name="pulse" id="pulse">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">BP :</label> <input type="text" class="form-control input-SmallText" placeholder="BP" name="bp" id="bp">'

			+ '</div></div><div style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1"><div class="divide-10"></div>'
			+ '<label class="TextFont">General Exam:</label><div class="divide-10"></div><div class="col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Pallor:</label> <input type="text" class="form-control input-SmallText" placeholder="Pallor" name="Pallor" id="pallor"></div>'
			+ '<div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Clubbing:</label> <input type="text" class="form-control input-SmallText" placeholder="Clubbing" name="Clubbing" id="clubbing">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Lymph Adenopathy:</label> <input type="text" class="form-control input-SmallText" placeholder="Lymph Adenopathy " name="Lymph Adenopathy" id="lymph">'
			+ '</div></div></div><div style="padding-left: 15px; padding-top: 20px;" class="form-group Remove-Padding col-md-4-1">'
			+ '<div class="divide-10"></div><div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Icterus:</label> <input type="text" class="form-control input-SmallText" placeholder="Lcterus" name="Lcterus" id="lcterus">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Oedema:</label> <input type="text" class="form-control input-SmallText" placeholder="Oedema" name="Oedema" id="oedema">'
			+ '</div></div></div>'

			+ '<div class="tab-pane fade active in col-md-12-1 " id="SystematicExaminations">'
			+ '<div style="margin-top: 15px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+ '<div><label class="TextFont">SYSTEMATIC EXAMINATIONS :</label><div>'
			+ '<div style="left: 15px; margin-top: 1%;" class="col-md-12-1"><div style="margin-top: 0px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">CVS:</label> <input type="text" class="form-control input-SmallText" placeholder="CVS" name="CVS" id="cvs">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">R/S:</label> <input type="text" class="form-control input-SmallText" placeholder="R/S" name="R/S " id="rs">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">PA:</label> <input type="text" class="form-control input-SmallText" placeholder="PA" name="PA" id="pa">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">CNS:</label> <input type="text" class="form-control input-SmallText" placeholder="CNS" name="CNS" id="cns">'

			+ '</div></div> <div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1"><label class="TextFont">Local Examinations:</label>'
			+ '<textarea class="" cols="40" rows="3" id="localExm" style="margin-left: 3%;"></textarea></div>'
			+ '<div style="padding-left: 0.8%;" class="col-md-6-1"><label class="TextFont">Investigation Reports:</label>'
			+ '<textarea class="" cols="40" rows="3" id="invsRep" style="margin-left: 1%;"></textarea></div>'
			+ '</div><div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1" id="divtempProvId" >'
			+ '<label class="TextFont">Provisional Diagnosis:</label>'
			+ '<textarea class="" cols="40" rows="3" id="provDia" style="margin-left: 0%;"></textarea></div>'
			+ '<div style="padding-left: 0.8%;" id="divtempTreatId"  class="col-md-6-1"><label class="TextFont">Treatment Plan:</label>'
			+ '<textarea class="" cols="40" rows="3" id="treatPlan" style="margin-left: 9%;"></textarea></div></div>'
			+ '</div></div> </div>'
			+'</div>'
			+'</div>'
			+'<input type="hidden" value="0" id="historyMasterId"></input> '
			+'</div>'
			+'</div>'

	;


	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	$("#medOffName").val($("#docName").html());
	
	getIPDHistoryTemplateList();
	getOPDPatientHistoryByTreatment();

}

function createDivIPDHistory1(callfrom){
	
	
	var rowCount = $("#HisRowCount").val(); 
	
	if (rowCount == -1) {
		rowCount = 0;
	}
	
	
	rowCount++;
	divId = "divH" + rowCount;
	
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("historyDiv").appendChild(x);
	
	document.getElementById(divId).innerHTML = '<td  style="height: 21.5px;  width: 8.37%; text-align: center;"><label>'
		+ rowCount
		+ '</label></td><td style="width: 33.96%; height: 21.5px; "><textarea rows="1" cols="38" class="" id="chiefComp'
		+ rowCount
		+ '" value="" ></textarea></td>'
		+ '<td style="width: 50.96%; height: 21.5px;'           
		+ rowCount
		+ '"><div class="col-md-12-1" style="margin-top:5%"><div class="col-md-6-1" style="margin-top:-3%"><input type="range"  min="0" max="100" class="defaultSlider" id="defaultSlider_'+rowCount+'" style="font-size: 11px; width:120%;" name="duration' 
		+ rowCount
		+ '" value="" id="duration_'+rowCount+'"'
		+ rowCount
		+ '"/></div>'
		+'<p class="note"><div class="col-md-6-1" id="divipd"><span class="duration_'+rowCount+'""></span>'
		+ '<input type = "text" class="col-sm-2-1" style="margin-left:125%; margin-top:-7.3%; font-weight:bold;" name="qty'
		+ rowCount
		+ '"   id="qty'
		+ rowCount +'" onkeyup="changeSlider('+rowCount+')" />'
		+ '<select class="col-sm-6-1" style="margin-left:150%; margin-top:-9.6%;" id="day_month_year'
		+ rowCount 
		+ '" name="day_month_year">'
		+ '<option value="">-Select-</option>  <option value="Hours">Hours</option>  <option value="Days">Days</option>'
		+ '<option value="Month">Month</option> <option value="Year">Year</option>'
		+ '</td></p></div></div>'
		+ '<input type="checkbox" class="col-sm-2-1" style="margin-left:6%;" name="chiefCompcheckbox'
		+ rowCount
		+ '"   id="chiefCompcheckbox"/>'
		+'<input id="idIPDCompslave'+ rowCount+'" name="idIPDCompslave'+ rowCount+'" type="hidden" value="0"/>'
		+'</td></td>';
	
	$("#HisRowCount").val(rowCount);
	$("#addRowCount").val(i);
	if(callfrom=="IPDH"){
		$("#divipd").css('margin-left','5px');

	}
	i++;
}



/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for create   opd history template
 * *****/
function createDivIPDHistory(){
var rowCount = $('#historyTable1 tbody tr').length;

	rowCount=parseInt(rowCount+1);
	
	var htm = "";

	htm = htm
			+ "<tr class='newRowHistoryRow' id='count"+ parseInt()+ "'>"
		
			+"<td> <input type='hidden'  class='hidden-id'  value="+rowCount+"></input></td> "

			+ "<td style='height: 21.5px;  width: 8.37%; text-align: center;'> <span id='snum"+parseInt(rowCount)+"'>"+parseInt(rowCount)+"</span><input type='hidden'   id='historySlaveId"+parseInt(rowCount) + "' value=" + 0 + " ></td>"
			
			+ "<td style=' width: 33.96%; height: 21.5px; '><textarea rows='1' cols='38'  id='chiefComp"+parseInt(rowCount)+ "'  > </textarea></td>"
				
				
			+ "<td style='width: 47.96%; height: 21.5px;'  ><div class='col-md-12-1' style='margin-top:5%' ><div class='col-md-6-1' style='margin-top:-3%'><input type='range'  min='0' max='100' class='defaultSlider' id='defaultSlider_"+rowCount+" ' style='font-size: 11px; width:120%;' name='duration' " 
				+ " value='' id='duration_"+parseInt(rowCount)+" '	/></div>"
				+"<p class='note'><div class='col-md-6-1' id='divipd'><span class='duration_"+parseInt(rowCount)+"' ></span>"
				+ "<input type ='text' class='col-sm-2-1' style='margin-left:125%; margin-top:-7.3%; font-weight:bold;' name='qtyy"+parseInt(rowCount)+ "'   id='qty"+parseInt(rowCount)+"' onkeyup='changeSliderInHistory("+rowCount+")' /> "
				+ "<select class='col-sm-6-1' style='margin-left:150%; margin-top:-9.6%;' id='day_month_year"+parseInt(rowCount)+"' " 
				+ " name='day_month_year'>"
				+ "<option value=''>-Select-</option>  <option value='Hours'>Hours</option>  <option value='Days'>Days</option>"
				+ "<option value='Month'>Month</option> <option value='Year'>Year</option> </select> "
				+ "</td></p></div></div>"
				
								
			
			+ "<td><input type='checkbox' class='chkhistory' id='checkbox"+ parseInt(rowCount)+"' name='checkbox'  value="+parseInt(rowCount)+"/></td>"
			
			
			
			+ "</tr>";
	
	$("#historyDiv").append(htm);
}
/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for create  changeSliderInHistory
 * *****/
function changeSliderInHistory(cnt){
	
	var qty = $("#qty"+cnt).val();

	$("#defaultSlider_"+cnt).val(qty);
	}


/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for removeChifComp
 * *****/
function removeChifComp(tableId,checkboxClass){
	
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
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
			url : "ehat/opdhistory/deleteHistorySalve",
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
				//checkForSquence(tableId);
				//checkSquenceId(tableId);
				//getIvfCalenderInfo();
				
				
				 
			}
		}); 
   } else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	//checkForSquence(tableId);
	//checkSquenceId(tableId); 
	
   }
	
}

/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder srno after delete
 ************/
function checkForSquence(tableId){
	
	
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
function checkSquenceId(tableId){
	
	
	
	var trLength = $('#'+tableId).find("tr:first th").length;
	
	trLength=trLength+1;
	
	obj=$('#'+tableId+' tbody tr td').find('input,select,span,td');
//	obj=$('#'+tableId+' tbody tr td').find('input,select,span,td,checkbox');
	
	
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
 * @Date     :23-12-2021
 * @Code     :this method used for saveOPDHistory
 * *****/
function saveOPDHistory(){
	
var historyId=$("#historyMasterId").val();

//	var historyId=0;
	
	var treatmentId=$("#tr_Id").val();
	
	var patientId=$("#pt_Id").val();
	
	var templateId=$("#selCustomizeTemp").val();
	//templateId=0;
	
	var templateName=$("#selCustomizeTemp option:selected" ).text();
	
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
	var aa=/[^a-zA-Z0-9]/.test( temperature );
    
	   /*if(aa==true){
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
		
    var provisionalDiagno=$("#provDia").val();
    
	var treatPlan=$("#treatPlan").val();
		
	var historySlaveList = {
			getListOfHistorySlaveDTO : []
		};
	
var rows = $('#historyTable1 tbody tr.newRowHistoryRow').length;

  $('#historyDiv tr').each(function() {
	//var i = $this.$(".hidden-id").val();
	//var i = $(this).parent().find('.hidden-id').val();//$(".hidden-id"+$(this).val()).val();
   // var i= $(".hidden-id").val();  
	
	 var $row = $(this).closest("tr");    // Find the row
	    var $tds = $row.find("td"); 
	   var i= $tds.find('.hidden-id').val();
	   
	 
	
    
    var historySalveId = $("#historySlaveId" + i).val();
    var duration = $("#qty" + i).val();
   
    var durationType = $("#day_month_year" + i).val();
    var chiefComplaints = $("#chiefComp" + i).val();
	
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
});
 



	
	/*for ( var i = 1; i <= rows; i++) {
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
	}*/
	
	historySlaveList = JSON.stringify(historySlaveList);
	
	
var inputs = [];
	
	inputs.push('historyId=' + historyId);
	
	
	inputs.push('templateId=' + templateId);
	
	inputs.push('templateName=' + templateName);
	
	inputs.push('medicalOfficerName=' + medicalOfficerName);
	
	inputs.push('mrnNo=' + mrnNo);
	
	inputs.push('chiefComplaints=' +encodeURIComponent(chiefComplaintss));
	
	inputs.push('negativeHistory=' +encodeURIComponent(negativeHistory));
	
	inputs.push('dmFlag=' + dmFlag);
	
	inputs.push('dmDuration=' +encodeURIComponent(dmDuration));
	
	inputs.push('htnFlag=' + htnFlag);
	
	inputs.push('htnDuration=' + encodeURIComponent(htnDuration));
	
	inputs.push('ihdFlag=' + ihdFlag);
	
	inputs.push('ihdDuration=' + encodeURIComponent(ihdDuration));
	
	inputs.push('bacopdFlag=' + bacopdFlag);
	
	inputs.push('bacopdDuration=' +encodeURIComponent(bacopdDuration));
	
	inputs.push('otherFlag=' + otherFlag);
	
	inputs.push('otherDuration=' +encodeURIComponent(otherDuration));
	
	inputs.push('pastSurgicalHistory=' +encodeURIComponent(pastSurgicalHistory));
	
	inputs.push('medications=' +encodeURIComponent(medications));
	
	inputs.push('obsHistory=' +encodeURIComponent(obsHistory));
	
	inputs.push('anyAllergy=' +encodeURIComponent(anyAllergy));
	
	inputs.push('familyHistory=' +encodeURIComponent(familyHistory));
	
	inputs.push('personalHistory=' +encodeURIComponent(personalHistory));
	
	inputs.push('temperature=' +encodeURIComponent(temperature));
	
	inputs.push('pallor=' +encodeURIComponent(pallor));
	
	inputs.push('icterus=' +encodeURIComponent(icterus));
	
	inputs.push('pulse=' +encodeURIComponent(pulse));
	
	inputs.push('clubbing=' +encodeURIComponent(clubbing));
	
	inputs.push('oedema=' +encodeURIComponent(oedema));
	
	inputs.push('bp=' +encodeURIComponent(bp));
	
	inputs.push('lymphAdenopathy=' +encodeURIComponent(lymphAdenopathy));
	
	inputs.push('cvs=' + encodeURIComponent(cvs));
	

	
	inputs.push('rs=' +encodeURIComponent(rs));
	
	inputs.push('pa=' +encodeURIComponent(pa));
	
	inputs.push('cns=' +encodeURIComponent(cns));
	
	inputs.push('localExamination=' +encodeURIComponent(localExamination));
	
	inputs.push('investigationReport=' +encodeURIComponent(investigationReport));
	inputs.push('provisionalDiagno=' +encodeURIComponent(provisionalDiagno));
	inputs.push('treatPlan=' + encodeURIComponent(treatPlan));
	
	inputs.push("historySlaveList="	+ encodeURIComponent(historySlaveList));
	
inputs.push('patientId=' + patientId);
	
	inputs.push('treatmentId=' + treatmentId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdhistory/saveOPDHistory",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				//refreshHistoryData();
				getOPDPatientHistoryByTreatment();
			}else if(r==2) {
				alert("Record Updated Successfully");
				//refreshHistoryData();
				getOPDPatientHistoryByTreatment();
			}
			else {
				alert("Network Issue..");
			}

			
			

		}
	});
	
	
}
/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for set opd history slave 
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
 * @Date     :23-12-2021
 * @Code     :this method used for refresh history data
 * *****/
function refreshHistoryData(){
	$("#historyMasterId").val(0);
	$("#selCustomizeTemp").val(0);
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
 * @Date     :23-12-2021
 * @Code     :this method used for getOPDPatientHistoryByTreatment
 * *****/
function getOPDPatientHistoryByTreatment(){
	
var treatmentId=$("#tr_Id").val();
	
	
	if(treatmentId == null || treatmentId == undefined || treatmentId == "")
		{
		alert("Please select patient");
		return false;
		}
	var dpid=1;
	var callfrom=$("#callfrom").val();
	
	
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdhistory/getOPDHistory",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		
			
			if(r.historyId == 0 || r==""){
			
			}else{
				
			
			$("#historyMasterId").val(r.historyId);
			$("#tr_Id").val(r.treatObj.treatmentId);
			$("#pt_Id").val(r.patientObj.patientId);
			
		
			//$("#selCustomizeTemp").val(0);
			//$("#medOffName").val(r.medicalOfficerName);
			$("#medOffName").val();
			//$("#mrn").val(r.mrnNo);
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
			$("#provDia").val(r.provisionalDiagno);
			$("#treatPlan").val(r.treatPlan);
			$("#habbits").val(r.habbits);
			setHistorySlaveInfo(r);
			}
			
		}
		});
	
}
/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for set opd history slave info
 * *****/
function setHistorySlaveInfo(r){
	var rowCount=1;
	var htm = "";
	
	$("#historyDiv").html(" ");

	for(var i=0; i <r.getListOfHistorySlaveDTO.length;i++  ){
		
	htm = htm
			+ "<tr class='newRowHistoryRow' id='count"+ parseInt(rowCount)+ "'>"
			
			+"<td> <input type='hidden'  class='hidden-id'  value="+rowCount+"></input></td> "
			+ "<td> <span id='snum"+parseInt(rowCount)+"'>"+parseInt(rowCount)+"</span><input type='hidden'   id='historySlaveId"+parseInt(rowCount) + "' value=" + r.getListOfHistorySlaveDTO[i].historySalveId + " ></td>"
			
			+ "<td style='width: 350px; height: 41pxpx; '><textarea rows='1' cols='38'  id='chiefComp"+parseInt(rowCount)+ "'   >"+r.getListOfHistorySlaveDTO[i].chiefComplaints+" </textarea></td>"
				
				
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
	
	
	
	$("#historyDiv").append(htm);
	
	var count=1;
	for(var i=0; i < r.getListOfHistorySlaveDTO.length;i++ ){
		
		$("#day_month_year"+(i+1)).val(r.getListOfHistorySlaveDTO[i].durationType);
	}
	
	
}



/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for IPD History template list
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
          
          
		}		
	});

	
}

/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for IPD History template info by template id
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
				//$("#medOffName").val(r.medicalOfficerName);
				//$("#mrn").val(r.mrnNo);
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

function prinOPDHistory(){
	
//	var billId=$("#billNo").text();    
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var mrnNo=$("#mrn").val();//Added By Annapurna
  
	var deptId=1;
  
	 var pendFlag="N"; 
	 var recId=0;
	 var patientName = $("#patientName").text();
		var printTitle="HISTORY PRINT";
	
		var instructionLanguage=""
    
   // window.open("opd_history_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
		 window.open("opd_history_print.jsp?treatmentId="+treatId+"&instructionLanguage="+instructionLanguage+"&CallFrom="+""+"&unitId="+"1"+"&printTitle="+printTitle+"&patientName="+patientName);

	
}
//Added By Annapurna 
function getMrnno()
{
	var treatment_id = $.trim($("#treatmentId").text());
	var result = "";
	$.ajax({
		async : false,
		type : "POST",
		data : {
			"treatment_id" : treatment_id
		},
		url : "ehat/opdhistory/getMrnno",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			result = r;
		//	alert("mrnno"+result);
		}
		
	});
	return result;
}

//added by vishant

function createDivIPDHistoryDischargeS(){
	
	var rowCount = $('#historyDiv tr').length;

		rowCount=parseInt(rowCount+1);
		
		var htm = "";

		htm = htm
				+ "<tr class='newRowHistoryRow' id='count"+ parseInt()+ "'>"
			
				+"<td> <input type='hidden'  class='hidden-id'  value="+rowCount+"></input></td> "

				+ "<td style='height: 21.5px;  width: 8.37%; text-align: center;'> <span id='snum"+parseInt(rowCount)+"'>"+parseInt(rowCount)+"</span><input type='hidden'   id='historySlaveId"+parseInt(rowCount) + "' value=" + 0 + " ></td>"
				
				+ "<td style=' width: 33.96%; height: 21.5px; '><textarea rows='1' cols='38'  id='chiefComp"+parseInt(rowCount)+ "'  > </textarea></td>"
					
					
				+ "<td style='width: 47.96%; height: 21.5px;'  ><div class='col-md-12-1' style='margin-top:5%' ><div class='col-md-6-1' style='margin-top:-3%'><input type='range'  min='0' max='100' class='defaultSlider' id='defaultSlider_"+rowCount+" ' style='font-size: 11px; width:120%;' name='duration' " 
					+ " value='' id='duration_"+parseInt(rowCount)+" '	/></div>"
					+"<p class='note'><div class='col-md-6-1' id='divipd'><span class='duration_"+parseInt(rowCount)+"' ></span>"
					+ "<input type ='text' class='col-sm-2-1' style='margin-left:125%; margin-top:-7.3%; font-weight:bold;' name='qtyy"+parseInt(rowCount)+ "'   id='qty"+parseInt(rowCount)+"' onkeyup='changeSliderInHistory("+rowCount+")' /> "
					+ "<select class='col-sm-6-1' style='margin-left:150%; margin-top:-9.6%;' id='day_month_year"+parseInt(rowCount)+"' " 
					+ " name='day_month_year'>"
					+ "<option value=''>-Select-</option>  <option value='Hours'>Hours</option>  <option value='Days'>Days</option>"
					+ "<option value='Month'>Month</option> <option value='Year'>Year</option> </select> "
					+ "</td></p></div></div>"
					
									
				
				+ "<td><input type='checkbox' class='chkhistory' id='checkbox"+ parseInt(rowCount)+"' name='checkbox'  value="+parseInt(rowCount)+"/></td>"
				
				
				
				+ "</tr>";
		
		$("#historyDiv").append(htm);
}


