/************
* @author	: Dayanand Khandekar
* @date		: 4-oct-2019
* @codeFor	: get All Self Master Detail
 ************/
function  getAllShelfDoc(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/shelfdoc/getAllShelfDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {				
			var divContent = "";
            divContent = divContent
                    + "<select name='Shelf Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstShelfDoc.length; i++) {
             
               
                divContent = divContent + "<option value='" + r.lstShelfDoc[i].selfDocId + "'  >"
                        + r.lstShelfDoc[i].shelDocName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#shelfID").html(divContent);
            $("#shelfID").select2();
		}
	});
}
function getPatientDetailByShelf()
{
 var  shelfID=$("#shelfID").val();
 
  jQuery.ajax({
		type : "GET",
		url : "ehat/patientdoc/getPatientDetailByShelf",
		data : {
			"shelfID" : shelfID
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//viewPatientDocumentTemp(response);
			setpatientDocDetailsByShelfIdTemp(response);
			
		}
	});
  
  
}

function setpatientDocDetailsByShelfIdTemp(r)
{
	
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
		+ '		<button class="btn btn-xs btn-success editBodyPartMaster" onclick=editPatientDoc('+r.lstPatintMaster[i].patientDocId+',"view")><i class="fa fa-eye View"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#viewDocDetails").html(htm);


}
