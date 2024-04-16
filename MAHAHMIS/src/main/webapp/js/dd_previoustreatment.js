/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method for fetch previous treatment of patient
 * *****/
function fetchPreviousTreatmentsByTreatmentIDNew(){
	var  treatmentId= ($("#tr_Id").val()).trim();
	 var inputs=[];
	 inputs.push('treatmentId=' + treatmentId);
	 var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/previousTreatemnt/fetchPreviousTreatmentsByTreatmentID",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				
				   //alert('Success fetch'+JSON.stringify(r));
									$("#previousPatientSummaryTable").html("");
									var htm = "";
									var rowCount = 0;

									if (r.litreatment.length > 0) {
										
										for (var i = 0; i < r.litreatment.length; i++) {  
											
											rowCount++;

											htm = htm
													+ "<tr  class='newIvfallergyAlertRow' id='count"
													+ (rowCount)
													+ "'>"

													+ "<td class='col-md-1-1  TextFont'> <span id='snum"
													+ rowCount
													+ "'>"
													+ rowCount
													+ "</span><input type='hidden' id='allergyAlertsHiddenId"
													+ rowCount
													+ "' value="
													+ r.litreatment[i].treatment_ID
													+ "></td>"
													
													+ "<td class='col-md-2-1  TextFont' >"
													+ r.litreatment[i].department
													+ "</td>"
													
													+ "<td class='col-md-4-1  TextFont' >"
													+ r.litreatment[i].tstartDate
													+ "</td>"

													+ "<td class='col-md-4-1 TextFont'>"
													+ r.litreatment[i].treatmentCount	
													+ "</td>"
													
													+ "<td class='col-md-2-1 TextFont' > "
													+ "<button id='viewid' class='b' title='Pervious Treatment'onclick='printPreviousTreatment("
													+ r.litreatment[i].treatment_ID
													+ ")' type='button'><i class='fa fa-eye View'></i></button></td>"

													
													+ "</tr>";
							
										}
										$("#previousPatientSummaryTable").append(htm);
									}
									
								
			}
		});

}

/******
 * @author   :Akshata Desai
 * @Date     :10-3-2022
 * @Code     :this method for print previous treatment of patient
 * *****/
function printPreviousTreatment(treatment_ID){
	//alert("treatment_ID---"+treatment_ID);
	var billId=0;
	var patId=$("#pt_Id").val();
	var unitId=1;
	var recId=0;
	var pendFlag="N";
	var instructionLanguage="ENGLISH";
	 var patientName = $("#patientName").text();
		var printTitle="History Print";
	
		
	//window.open("opd_main_print.jsp?billId="+billId+"&treatId="+treatment_ID+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&instructionLanguage="+instructionLanguage+"&CallFrom="+CallFrom+"&unitId="+unitId);
		 window.open("opd_main_print.jsp?treatmentId="+treatment_ID+"&instructionLanguage="+instructionLanguage+"&CallFrom="+""+"&unitId="+"1"+"&printTitle="+printTitle+"&patientName="+patientName);
}