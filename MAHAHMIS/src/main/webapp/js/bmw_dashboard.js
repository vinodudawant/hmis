function openRequisitionJsp()
{
	window.location = "BMW_requisition_from1.jsp?";
	

}

function openBmwApproveJsp()
{
	window.location = "BMW_requisition_approval.jsp?";
	

}

function openBmwAssignedJsp()
{
	window.location = "BMW_assign.jsp?";
	

}

function openBmwCompleteJsp()
{
	window.location = "BMW_complete.jsp?";
	

}

function getBmwRequisitionCount(){
	
	var id="id";
	var count=[];
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bmwRequisition/getBmwRequisitionCount",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(JSON.stringify(r));

			$('#openCount').text(r.openCount);
			$('#approveCount').text(r.approveCount); 
			$('#assignCount').text(r.assignCount); 
			$('#completeCount').text(r.completeCount);
		}
	});
}

function getBmwBagWiseCount(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bmwRequisition/getBmwBagWiseCount",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(JSON.stringify(r));lstBmwRequisitionDetails		
			
			$('#redApproveCount').text(r.lstBmwRequisitionDetails[0].redApproveCount);
			$('#redCompleteCount').text(r.lstBmwRequisitionDetails[0].redCompleteCount); 
			$('#redAssignCount').text(r.lstBmwRequisitionDetails[0].redAssignCount); 
			$('#redOpenCount').text(r.lstBmwRequisitionDetails[0].redOpenCount);
			
			$('#yellowApproveCount').text(r.lstBmwRequisitionDetails[0].yellowApproveCount);
			$('#yellowCompleteCount').text(r.lstBmwRequisitionDetails[0].yellowCompleteCount); 
			$('#yellowAssignCount').text(r.lstBmwRequisitionDetails[0].yellowAssignCount); 
			$('#yellowOpenCount').text(r.lstBmwRequisitionDetails[0].yellowOpenCount);
			
			$('#greenApproveCount').text(r.lstBmwRequisitionDetails[0].greenApproveCount);
			$('#greenCompleteCount').text(r.lstBmwRequisitionDetails[0].greenCompleteCount); 
			$('#greenAssignCount').text(r.lstBmwRequisitionDetails[0].greenAssignCount); 
			$('#greenOpenCount').text(r.lstBmwRequisitionDetails[0].greenOpenCount);
			
			$('#blackApproveCount').text(r.lstBmwRequisitionDetails[0].blackApproveCount);
			$('#blackCompleteCount').text(r.lstBmwRequisitionDetails[0].blackCompleteCount); 
			$('#blackAssignCount').text(r.lstBmwRequisitionDetails[0].blackAssignCount); 
			$('#blackOpenCount').text(r.lstBmwRequisitionDetails[0].blackOpenCount);
		}
	});
}


