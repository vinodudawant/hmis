/*function AutoDischargeSummaryPrintforIpd(){
	
	var dischargedate = $("#discharge_date").val();
	if(dischargedate == ""){
		alert("Please save discharge summary then print");
		return false;
	}else{
		//alert(dischargedate);
		var dischargetime = $("#discharge_Time").val();
		var date = dischargedate.split("/");
		var newdate = date[0]+"-"+date[1]+"-"+date[2] + " " + dischargetime + ":00";
		
		var patID = $("#pt_Id").val();
		var treatID = $("#tr_Id").val();
		var tomId = $("#tomId").val();
		
		var unitId = $("#uids").val();
		


		var discharge_Type = $("#discharge_Type").val();
		
		var printType = $('input[name="printTypeDs"]:checked').val();
		if(printType == "admissionNote"){
			CallforPrint="admissionNote";
			
			window.open("ipd_addNote.print.jsp?" + "patID=" + 
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
					+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)
			);
		}
		if(printType == "history"){
			CallforPrint="history";
			
			window.open("ipd_history.print.jsp?" + "patID=" + 
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
					+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)
			);
		}
		if(printType == "invest"){
			CallforPrint="invest";
			
			window.open("ipd_invest_print.jsp?" + "patID=" + 
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
					+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)
			);
		}
		if(printType == "treatment"){
			CallforPrint="treatment";
			
			window.open("ipd_tratment_print.jsp?" + "patID=" + 
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
					+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)
			);
		}
		if(printType == "otNotes"){
			CallforPrint="otNotes";
			
			window.open("ipd_otnote_print.jsp?" + "patID=" + 
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
					+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
			);
		}
		if(printType == "dischrCond"){
			CallforPrint="dischrCond";
			
			window.open("ipd_conditionDischarge_print.jsp?" + "patID=" + 
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
					+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)
			);
		}
		if(printType == "drRound"){
			CallforPrint="drRound";
			
				var fromDate= convertStringtoYYYYMMDD($("#todays_date").val(),separator,replaceWith);
			var toDate= convertStringtoYYYYMMDD($("#todays_date").val(),separator,replaceWith); 
			
			var billId=0;
			 var CallFrom= "withheader";
			window.open("ipd_doctor_round.jsp?billId="+billId+"&treatId="+treatId+"&patID="+patID+"&recId="+recId+"&pendFlag="+pendFlag+"&unitId="+unitId+"&fromDate="+fromDate+"&toDate="+toDate+"&CallFrom="+CallFrom);
			
		}
		if(printType == "checkAll"){
			CallforPrint="checkAll";
			
			window.open("ipd_checkAll_print.jsp?" + "patID=" + 
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
					+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
			);
		}

	}
}
*/