/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 15-2-2021
 * @comment get Patient Info For Ovam Pick Up Form
 ******************************************************************************/
function getPatientInfoForOvamPickUp(){
	var IVFTreatmentId = $('#IVFTreatmentId').val();
	var inputs = [];
	inputs.push("ivftreatmentId=" +IVFTreatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ivfdoctordesk/getIvfPatientInfoByIVFTreatId",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			$('#patientId').val(r.patientId);
			$('#nameOfPatient').val(r.patientName);
			$('#patientsAge').val(r.age);
			$("input:radio[name='gender'][value='"+r.gender+"']").prop("checked",true);
			
		}
	});
}


/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 15-2-2021
 * @comment get Patient Husband Name
 ******************************************************************************/
function getHusbandNameForOvamPickup() {

	var patId = $("#patientId").val();
	
	var inputs = [];
	

	inputs.push('patId=' + patId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getHusbandNameForOvamPickup",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			$("#husbanName").val(r);
			
		}
	});
}


/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 15-2-2021
 * @comment get Doctor List For Ovam Pick Up Form 
 ******************************************************************************/
function getDoctorListForOvamPickUp() {
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		
		url : "ehat/shelfsponser/getDoctorListForOvamPickUp",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			
		  
			 var htm="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < r.listDoctor.length; i++){    
			        htm = htm + "<option value='"+r.listDoctor[i].doctor_ID+"'> "+r.listDoctor[i].doc_name+" </option>";
			    }
			    $("#embryologistName").html(htm);
					          
        }
    });	
}



function createRowForOvamPickUpInfo(){
var rowCount = $('#ovampickupTabel tbody tr').length;
	
	
	
	rowCount=parseInt(rowCount+1);
	
	
	var htm = "";

	htm = htm
			+ "<tr class='newStudyRowOvamPickUp' id='count"+ rowCount+ "'>"
			
			+ "<td><input type='checkbox' class='chkovampickup' id='checkbox" 
			+ parseInt(rowCount)
			+ "' name='checkbox'  value='"+parseInt(rowCount)+"'></td>"
			
			+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='ovamPickUpSlaveId" + rowCount + "' value='"
			+ 0 + "' ></td>"
			
			+
			"<td><input type='text'  class='form-control input-SmallText TextFont'  "
			+ "'  id='appearance"
			+parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' style='width:79px'   onclick='getDateForOvamPickUpSlave(this.id)' id='ovampickupslavedate"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='maturity"
			+ rowCount
			+ "' ></td> "
			
			+ "<td><textarea class='form-control input-SmallText TextFont' id='pbappearance"
			+ parseInt(rowCount)
			+ "' ></textarea></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='pnscore"
			+ parseInt(rowCount)
			+ "' ></td> "
		
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='day2"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='day3"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='day4"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='day5"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='transper"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><textarea class='form-control input-SmallText TextFont' id='rate"
			+ parseInt(rowCount)
			+ "' ></textarea></td> "
			
			+ "</tr>";
	
	$("#ovampickupTabelBody").append(htm);
}



function saveOvamPickUpForm(){
	
	
	var ovamPickUpMasterId=$("#ovamPickUpMasterId").val();
	var treatmentId=$("#treatmentId").val();
	var patientId=$("#patientId").val();
	var patientName=$("#nameOfPatient").val();
	var patient_age=$("#patientsAge").val();
	var patientHusbandName=$("#husbanName").val();
	
	var patient_gender="";
	patient_gender=	$('input[name="gender"]:checked').val();
	
	var cycleNo=$("#cycleNo").val();
	var embryologistId=$("#embryologistName").val();
	var embryologistName=$( "#embryologistName option:selected" ).text();
	
	
	
   
//	var embryologistId=0;
	//var embryologistName=0;
	var dateOfOvamPickUp1=($("#dateofovampickup").val()).split("/");
	
	var dateOfOvamPickUp =(dateOfOvamPickUp1[2] + "-" + dateOfOvamPickUp1[1] + "-" + dateOfOvamPickUp1[0]);  //added by sandip
	var oocytesretrievedEjaculate=$("#oocytesretrievedEjaculate").val();
	var oocytesretrievedPesa=$("#oocytesretrievedPesa").val();
	var oocytesretrievedTesa=$("#oocytesretrievedTesa").val();
	
	var matureoocytesEjaculate=$("#matureoocytesEjaculate").val();
	var matureoocytesPesa=$("#matureoocytesPesa").val();
	var matureoocytesTesa=$("#matureoocytesTesa").val();
	
	var oocytesinjectedEjaculate=$("#oocytesinjectedEjaculate").val();
	var oocytesinjectedPesa=$("#oocytesinjectedPesa").val();
	var oocytesinjectedTesa=$("#oocytesinjectedTesa").val();
	
	
	var embroysformedEjaculate=$("#embroysformedEjaculate").val();
	var embroysformedPesa=$("#embroysformedPesa").val();
	var embroysformedTesa=$("#embroysformedTesa").val();
	
	
	var oocyteEjaculateDate1=($("#oocyteEjaculateDate").val()).split("/");
	var oocyteEjaculateDate =(oocyteEjaculateDate1[2] + "-" + oocyteEjaculateDate1[1] + "-" + oocyteEjaculateDate1[0]);
	var matureoocytesdate1=($("#matureoocytesDate").val()).split("/");;
	var matureoocytesdate =(matureoocytesdate1[2] + "-" + matureoocytesdate1[1] + "-" + matureoocytesdate1[0]);
	var oocytesinjectedDate1=($("#oocytesinjectedDate").val()).split("/");;
	var oocytesinjectedDate =(oocytesinjectedDate1[2] + "-" + oocytesinjectedDate1[1] + "-" + oocytesinjectedDate1[0]);
	var embroysformedDate1=($("#embroysformedDate").val()).split("/");;
	var embroysformedDate =(embroysformedDate1[2] + "-" + embroysformedDate1[1] + "-" + embroysformedDate1[0]);
	
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	
	
	   var ejaculateValue= $('input[name="ejaculate_flag"]:checked').val();
		
	
		
		var inputs = [];
		/*inputs.push("ovamPickUpSlaveList="
				+ encodeURIComponent(ovamPickUpSlaveList));*/
		
		inputs.push('ovamPickUpMasterId=' + ovamPickUpMasterId);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('patientName=' + patientName);
		inputs.push('patient_age=' + patient_age);
		inputs.push('patient_gender=' + patient_gender);
		inputs.push('patientHusbandName=' + patientHusbandName);
		inputs.push('cycleNo=' + cycleNo);
		inputs.push('embryologistId=' + embryologistId);
		inputs.push('embryologistName=' + embryologistName);
		inputs.push('dateOfOvamPickUp=' + dateOfOvamPickUp);
		inputs.push('oocytesretrievedEjaculate=' + oocytesretrievedEjaculate);
		inputs.push('oocytesretrievedPesa=' + oocytesretrievedPesa);
		inputs.push('oocytesretrievedTesa=' + oocytesretrievedTesa);
		inputs.push('matureoocytesEjaculate=' + matureoocytesEjaculate);
		inputs.push('matureoocytesPesa=' + matureoocytesPesa);
		inputs.push('matureoocytesTesa=' + matureoocytesTesa);
		inputs.push('oocytesinjectedEjaculate=' + oocytesinjectedEjaculate);
		inputs.push('oocytesinjectedPesa=' + oocytesinjectedPesa);
		inputs.push('oocytesinjectedTesa=' + oocytesinjectedTesa);
		inputs.push('embroysformedEjaculate=' + embroysformedEjaculate);
		inputs.push('embroysformedPesa=' + embroysformedPesa);
		inputs.push('embroysformedTesa=' + embroysformedTesa);
		inputs.push('createdBy=' + userId);
		inputs.push('unitId=' + unitId);
		inputs.push('userId=' + userId);
		
		inputs.push('updatedBy=' + userId);
		
		inputs.push('oocyteEjaculateDate=' + oocyteEjaculateDate);
		inputs.push('matureoocytesDate=' + matureoocytesdate);
		inputs.push('oocytesinjectedDate=' + oocytesinjectedDate);
		inputs.push('embroysformedDate=' + embroysformedDate);
		inputs.push('ejaculateValue=' + ejaculateValue);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/shelfsponser/saveOvamPickUpForm",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				response = r;
				if (r == 1) {
					alert("Record Saved Successfully");
				}else if(r==2) {
					alert("Record Updated Successfully");
				}
				else {
					alert("Network Issue..");
				}

				
				getOvamPickUpMasterInfo();

			}
		});
	
}

function setOvamPickUpFormSlavenfoInfoList(ovamPickUpSlaveList, ovamPickUpSlaveId,
		appearance, ovampickupslavedate, maturity, pbappearance, pnscore, day2, day3, day4,
		day5, transper,rate,userId, unitId,patientId,treatmentId,cycleNo){
	ovamPickUpSlaveList.getListOfOvamPickUpSlaveDTO.push({
		ovamPickUpSlaveId : ovamPickUpSlaveId,
		appearance : appearance,
		ovampickupslavedate : ovampickupslavedate,
		maturity : maturity,
		pbappearance : pbappearance,
		pnscore : pnscore,
		day2 : day2,
		day3 : day3,
		day4 : day4,
		day5 : day5,
		transper:transper,
		rate:rate,
		patientId : patientId,
		treatmentId : treatmentId,
		cycleNo : cycleNo,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
		
	});
	
}

function getOvamPickUpMasterInfo(){
	var inputs = [];
	var patientId=$("#patientId").val();
	var cycleNo=$("#cycleNo").val();

	inputs.push('patientId=' + patientId);
	inputs.push('cycleNo=' + cycleNo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getOvamPickUpMasterInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
	
			if(r === ""){
				return false;
			}else{
				
			$("#ovamPickUpMasterId").val(r.ovamPickUpMasterId);
				$("#treatmentId").val(r.treatmentId);
				$("#patientId").val(r.patientId);
				$("#nameOfPatient").val(r.patientName);
				$("#patientsAge").val(r.patient_age);
				$("#husbanName").val(r.patientHusbandName);
				$("#cycleNo").val(r.cycleNo);
				
				$("input:radio[name='gender'][value='"+r.patient_gender+"']").prop("checked",true);
				
				
				var strVale = r.embryologistId;

				var strArr = strVale.split(',');
				
			 	$('#embryologistName').select2('val', strArr);
				
				$("#dateofovampickup").val(r.dateOfOvamPickUp);
				
				
				$("#oocytesretrievedEjaculate").val(r.oocytesretrievedEjaculate);
				$("#oocytesretrievedPesa").val(r.oocytesretrievedPesa);
				$("#oocytesretrievedTesa").val(r.oocytesretrievedTesa);
				
				$("#matureoocytesEjaculate").val(r.matureoocytesEjaculate);
				$("#matureoocytesPesa").val(r.matureoocytesPesa);
				$("#matureoocytesTesa").val(r.matureoocytesTesa);
				
				$("#oocytesinjectedEjaculate").val(r.oocytesinjectedEjaculate);
				$("#oocytesinjectedPesa").val(r.oocytesinjectedPesa);
				$("#oocytesinjectedTesa").val(r.oocytesinjectedTesa);
				
				
				$("#embroysformedEjaculate").val(r.embroysformedEjaculate);
				$("#embroysformedPesa").val(r.embroysformedPesa);
				$("#embroysformedTesa").val(r.embroysformedTesa);
				
				
				$("#oocyteEjaculateDate").val(r.oocyteEjaculateDate);
				$("#matureoocytesDate").val(r.matureoocytesDate);
				$("#oocytesinjectedDate").val(r.oocytesinjectedDate);
				$("#embroysformedDate").val(r.oocytesinjectedDate);
				
				if(r.ejaculateValue == "ejaculate"){
					
					$("#ejaculate").prop("checked",true);
				}else{
					$("#other").prop("checked",true);
				}
				
				//setOvamPickUpSlaveTemplate(r);
				
			}

			
		}
	});
}

function setOvamPickUpSlaveTemplate(r){
	
	$("#ovampickupTabelBody").html("");
	var htm = "";
	var rowCount = 0;

	
	if (r.getListOfOvamPickUpSlaveDTO.length > 0) {

		for ( var i = 0; i < r.getListOfOvamPickUpSlaveDTO.length; i++) {
			rowCount++;
			
			htm = htm
					+ "<tr class='newStudyRowOvamPickUp' id='count"
					+ (rowCount)
					+ "'>"
					
					+ "<td><input type='checkbox' class='chkovampickup'   value='"+rowCount+"'"
					
					+ " name='ovampickudocid'   isNew='false' id="+r.getListOfOvamPickUpSlaveDTO[i].ovamPickUpSlaveId+"></td>"
					
			
					+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden' id='ovamPickUpSlaveId"+rowCount+"' value="+r.getListOfOvamPickUpSlaveDTO[i].ovamPickUpSlaveId+"></td>"
					
					
					+"<td><input type='text'  class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].appearance
					+ "'  id='appearance"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont' value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].ovampickupslavedate
					+ "' onclick='getDateForOvamPickUpSlave(this.id)'  style='width:79px'   id='ovampickupslavedate"
					+ (rowCount)
					+ "' ></td> "
					
					
					
					+ "<td ><input type='text' class='form-control input-SmallText TextFont'   value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].maturity
					+ "'    id='maturity"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].pbappearance
					+ "' id='pbappearance"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].pnscore
					+ "'   id='pnscore"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].day2
					+ "'   id='day2"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].day3
					+ "'   id='day3"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].day4
					+ "'   id='day4"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].day5
					+ "'   id='day5"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].transper
					+ "'   id='transper"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfOvamPickUpSlaveDTO[i].rate
					+ "'   id='rate"
					+ (rowCount)
					+ "' ></td> "
					
					+ "</tr>";
			//rowCount++;
		}
		
		
		$("#ovampickupTabelBody").append(htm);
	}
}

function getDateForOvamPickUpSlave(inputID) {
	

	new JsDatePick({
		useMode : 2,
		target : inputID,

		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		dateFormat : "%d/%m/%Y",
		imgPath : "../img/",
		weekStartDay : 1,
	});

}



/************
* @author	:Dayanand Khandekar
* @date		: 22-feb-2021
* @codeFor	: delete multiple rows from Ovam Pick Up Salve  info
 ************/

function deleteOvamPickUpSalveInfo(tableId,checkboxClass){
	
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
	$("input[name='ovampickudocid']:checked").each(function() {	
		
		var slaveId=$("#ovamPickUpSlaveId"+$(this).val()).val();
		
		if(slaveId >0){
	
			docId.push($("#ovamPickUpSlaveId"+$(this).val()).val());
		}
	});

	

	
   if(docId.length>0){

	 var inputs = [];
		inputs.push('ovampickupslaveids=' + docId);
		inputs.push('userId=' + userId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/shelfsponser/deleteOvamPickUpSalveInfo",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {
				$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
				alert(response);
				checkForOvamPickUp(tableId);
				checkOvamPickUpSequenece(tableId);
				//getIvfCalenderInfo();
				
				
				 
			}
		}); 
   } else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForOvamPickUp(tableId);
	checkOvamPickUpSequenece(tableId);	 
	
   }
	
}


/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder srno after delete
 ************/
function checkForOvamPickUp(tableId){
	
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
function checkOvamPickUpSequenece(tableId){

	var trLength = $('#'+tableId).find("tr:first th").length;
	trLength=trLength+1;
	obj=$('#'+tableId+' tbody tr td').find('input,select,span,td');
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

function ovamPickUpPrint(){

	var treatmentId=$("#treatmentId").val();
	var patientId=$("#patientId").val();
	var cycleNo=$("#cycleNo").val();
	var IVFTreatmentId=$("#IVFTreatmentId").val();
	
	var pageSize = "standard"; 
	var billId=0;
	var recId=0;
	 var pendFlag="N"; 
	
		setTimeout(function() {
			window.open(("ovam_pickup_form_print.jsp?" + "&treatId="+ treatmentId + "&patId=" + patientId + "&cycleNo=" + cycleNo + "&IVFTreatmentId=" + IVFTreatmentId + "&recId=" + recId+"&billId="+billId+"&pendFlag="+pendFlag+ "&recId=" + recId));
		}, 300);
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 22-2-2021
 * @comment open embryo transper form
 ******************************************************************************/
function openEmbryoTransperForm(){
	
	/*var treatmentId=$("#treatmentId").val();
	var patientId=$("#patientId").val();
	var cycleNo=$("#cycleNo").val();
	var IVFTreatmentId=$("#IVFTreatmentId").val();
	
	var pageSize = "standard"; 
	var billId=0;
	var recId=0;
	 var pendFlag="N"; */
	
	/*	setTimeout(function() {
			window.open(("ovam_pickup_form_print.jsp?" + "&treatId="+ treatmentId + "&patId=" + patientId + "&cycleNo=" + cycleNo + "&IVFTreatmentId=" + IVFTreatmentId + "&recId=" + recId+"&billId="+billId+"&pendFlag="+pendFlag+ "&recId=" + recId));
		}, 300);*/
	 
	 
	 var treatmentId=$("#treatmentId").val();
		var patientId=$("#patientId").val();
		var cycleNo=$("#cycleNo").val();
		var IVFTreatmentId=$("#IVFTreatmentId").val();
		
			setTimeout(function() {
				window.open(("embryo_transper.jsp?" + "&treatmentId="+ treatmentId + "&patientId=" + patientId + "&cycleNo=" + cycleNo +" &IVFTreatmentId=" + IVFTreatmentId));
			}, 300);
}


function saveOvamPickUpSlaveInfo(){
	
	var patientId=$("#patientId").val();
	var cycleNo=$("#cycleNo").val();
	var treatmentId=$("#treatmentId").val();
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	
	// this is for salve details
	var ovamPickUpFormSlaveInfo = $('#ovampickupTabel tbody tr.newStudyRowOvamPickUp').length;
	if (ovamPickUpFormSlaveInfo == "" || ovamPickUpFormSlaveInfo == null || ovamPickUpFormSlaveInfo == 0) {
		alert("Enter at least One Record In Ovam Pick Up  Tabel ");
		return false;
	}
	
	
	var ovamPickUpSlaveList = {
			getListOfOvamPickUpSlaveDTO : []
		};
		var rows = $('#ovampickupTabel tbody tr.newStudyRowOvamPickUp').length;
		
		for ( var i = 1; i <= rows; i++) {
			var ovamPickUpSlaveId = $("#ovamPickUpSlaveId" + i).val();

			var appearance = $("#appearance" + i).val();
			var ovampickupslavedate = $("#ovampickupslavedate" + i).val();
			var maturity = $("#maturity" + i).val();
			var pbappearance = $("#pbappearance" + i).val();
			var pnscore = $("#pnscore" + i).val();
			var day2 = $("#day2" + i).val();
			
			var day3 = $("#day3" + i).val();
			var day4 = $("#day4" + i).val();
			var day5 = $("#day5" + i).val();
			var transper = $("#transper" + i).val();
			var rate = $("#rate" + i).val();
			
			
			
			
			

			setOvamPickUpFormSlavenfoInfoList(ovamPickUpSlaveList, ovamPickUpSlaveId,
					appearance, ovampickupslavedate, maturity, pbappearance, pnscore, day2, day3, day4,
					day5, transper,rate,userId, unitId,patientId,treatmentId,cycleNo);
		}

		ovamPickUpSlaveList = JSON.stringify(ovamPickUpSlaveList);
		
		var inputs = [];
		inputs.push("ovamPickUpSlaveList="	+ encodeURIComponent(ovamPickUpSlaveList));
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/shelfsponser/saveOvamPickUpSlaveInfo",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				response = r;
				if (r == 1) {
					alert("Record Saved Successfully");
				}else if(r==2) {
					alert("Record Updated Successfully");
				}
				else {
					alert("Network Issue..");
				}

				
				getOvamPickUpSalveList();

			}
		});
	
}


function getOvamPickUpSalveList(){
	var inputs = [];
	var patientId=$("#patientId").val();
	var cycleNo=$("#cycleNo").val();

	inputs.push('patientId=' + patientId);
	inputs.push('cycleNo=' + cycleNo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getOvamPickUpSalveList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			setOvamPickUpSlaveTemplate(r);
	
			

			
		}
	});
}


