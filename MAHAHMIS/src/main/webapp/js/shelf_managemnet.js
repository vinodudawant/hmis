function getAllPatientDocumentDetails(){
   	
	var fdate=	$("#fromDate").val();
	var todate=	$("#toDate").val();	
	var inputs = [];	
	inputs.push('fdate=' + fdate);	
	inputs.push('todate=' + todate);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/documentmaster/getAllPatientDocDeatil",
		cache : false,		
		success : function(r) {
			
				
				setPatientDocDetailTemp(r);
		}
	});
}


function setPatientDocDetailTemp(r) {
	
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstPatintMaster.length; i++) {
		
		var datetime = new Date(r.lstPatintMaster[i].createdDate).toLocaleString();
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstPatintMaster[i].patientId+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstPatintMaster[i].treatmentId+'</td>'	
		+ ' <td class="col-md-1 center">'+r.lstPatintMaster[i].patientName+'</td>'
		+ ' <td class="col-md-1 center">'+datetime+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '		<button class="btn btn-xs btn-success editBodyPartMaster" onclick=editPatientDoc('+r.lstPatintMaster[i].patientId+')><i class="fa fa-eye View"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '		<button class="btn btn-xs btn-success editBodyPartMaster" onclick=deletePatientDocByPatientDocId('+r.lstPatintMaster[i].patientDocId+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#viewDocDetails").html(htm);
}

function editPatientDoc(patientId)
{
	
	
  /*window.open("patient_doc_details.jsp?"+"patientDocId=" +
			encodeURIComponent(patientDocId) + "&callform=" + encodeURIComponent(callform));*/
  
  window.open("dms_file_management_details.jsp?"+"patientId=" +
			encodeURIComponent(patientId));
  
}

function deletePatientDocByPatientDocId(patientDocId)
{
	jQuery.ajax({
		type : "POST",
		url : "ehat/documentmaster/deletePatientDocByPatientDocId",
		data : {
			"patientDocId" : patientDocId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alert(JSON.stringify(response));
			alertify.error(response);
			getAllPatientDocumentDetails();
			//viewPatientDocumentTemp(response);
			
		}
	});

}
