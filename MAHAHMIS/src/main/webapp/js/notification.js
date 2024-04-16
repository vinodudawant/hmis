/************
* @author	: Vinod Udawant
* @date		: 29-Jan-2018
* @codeFor	: Fetch software notifications
*************/
function fetchNotifications() {
	
	var callform="-";
	var inputs = [];
	inputs.push("callform="+ callform);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/finance/fetchNotifications",
		timeout : 1000 * 60 * 15,
		//cache : false,
		success : function(r) {

			setNotificationTemp(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 29-Jan-2018
* @codeFor	: Set software notifications
*************/
function setNotificationTemp(res){
	
	var totNote = res.lstNotify.length;
	var totCount=0;
	var temp='<li class="dropdown-title"> '
		+ '	<span><i class="fa fa-bell"></i><label id="totNote"></label> Notifications</span> '
		+ '</li> ';
	
	for(var i=0;i<res.lstNotify.length;i++){
		
		var msgCount=res.lstNotify[i].msgCount;
		var msgText=res.lstNotify[i].msgText;
		var logoClass=res.lstNotify[i].logoClass;
		var msgUrl=res.lstNotify[i].msgUrl;
		
		if(msgCount>0){
			
			temp = temp + '<li> '
			+ '	<a href="'+msgUrl+'"> <span class="label label-success"> '
			+ '		<i class="'+logoClass+'"></i></span> '
			+ '		<span class="body" id="toolDetails'+i+'" data-placement="bottom" data-tooltip="tooltip" min-width: 500px; data-html="true" title=""> '
			+ '			<span class="message">'+msgCount+' '+msgText+'. </span> '
			+ '			<span class="time"><i class="fa fa-clock-o"></i> <span>See Details</span></span> '
			+ '		</span> '
			+ '	</a> '
			+ '</li> ';	
			totCount=totCount+1;
		}			
	}	
	
	temp = temp + '<li class="footer"> '
				+ '	<a href="#">See all notifications <i class="fa fa-arrow-circle-right"></i></a> '
				+ '</li> ';
	
	$("#dynNotes").html(temp);
	if(totCount>0){
		
		$("#noteCount").html(totCount);	  //$("#noteCount").html(totNote);
		$("#totNote").html(totCount);	 //$("#noteCount").html(totNote);			
	}else{
		
		$("#noteCount").html(0);	
		$("#totNote").html(0);
	}
	setToolTip(res);
}

/************
* @author	: Vinod Udawant
* @date		: 29-Jan-2018
* @codeFor	: Set tooltip of software notifications
*************/
function setToolTip(res){
	
	var tooltipText="<table class='table'><tr>" 
			+ "<thead>" 
			+ "<th>Pat Id</th>"
			+ "<th>Bill Id</th>"
			+ "<th>Patient Name</th>" 			
			+ "</thead>" 
			+ "</tr><tbody>";
	for(var inx=0;inx<res.lstNotify[0].lstDetails.length;inx++){
		
		tooltipText=tooltipText+"<tr>" +
				"<td>"+res.lstNotify[0].lstDetails[inx].pId+"</td>" +
				"<td>"+res.lstNotify[0].lstDetails[inx].billId+"</td>" +
				"<td style='text-align:'left' '>"+res.lstNotify[0].lstDetails[inx].patientName+"</td>" +			
				"</tr>";
	}
	tooltipText=tooltipText+"</tbody></table>";
	
	$('#toolDetails0').attr('title', tooltipText)
    .tooltip('fixTitle')      
    .tooltip('setContent');	
	
	// Expiring List Of Maintenance Items
	var msgText=res.lstNotify[1].msgText;
	var expireCount=0;
	var tooltipText = "<table class='table'><tr>" + "<thead>"
			+ "<th>Item Names</th>" + "<th>Maintainace Date</th>"  
			+ "</thead>" + "</tr><tbody>";
	for ( var inx = 0; inx < res.lstNotify[1].lstDetails.length; inx++) {
		
		tooltipText = tooltipText + "<tr>" + "<td>"
				+ res.lstNotify[1].lstDetails[inx].item_name + "</td>" + "<td>"
				+ res.lstNotify[1].lstDetails[inx].maintainance_date + "</td>"
				+ "</tr>";
		expireCount++;
	}
	tooltipText = tooltipText + "</tbody></table>";

	$('#toolDetails1').attr('title', tooltipText).tooltip('fixTitle').tooltip(
			'setContent');	
	//$('#msgCountText1').html(""+ expireCount +"  "+msgText);
}

/************
* @author	: Vinod Udawant
* @date		: 29-Jan-2018
* @codeFor	: Fetch Todays Final Ipd bills
*************/
function getIpdPatientsFinalBill(callform) {
	
	var callform="general";
	var inputs = [];
	inputs.push("callform="+ callform);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/finance/fetchFinalIpdBills",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

		}
	});
}