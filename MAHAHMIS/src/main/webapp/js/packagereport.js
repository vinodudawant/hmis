/*****
 * @author    :BILAL
 * @Date      :13-02-2018
 * @Code      :For getting package details report 
 * ******/
function getppackageData() {

	// charges Id and Charges Slave Id
	var chargesId = 0;
	var chargesSlaveId = 0;

	//For Is combination service id
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();

	// Hall Id and Hall slave Id
	var hallId = 0;
	var hallSlaveId = 0;
	
	if(isNaN(isComServId)){
		
		isComServId = 0;
	}
	
	if(isNaN(isComServlastId)){
		
		isComServlastId = 0;
	}

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromViewForSub",
		data : {
			"chargesId" : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),

			"hallId" : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),

			"isComServId" : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(r) {

			setpackageData(r);

		}
	});

}
/*****
 * @author    :BILAL
 * @Date      :13-02-2018
 * @Code      :For setting package details report 
 * ******/
function setpackageData(response) {

	var result = '';
	var packageName ='-';
	var distribute =0;
	var total = 0;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {

		var categoryName = response.lstServiceConfigurations[i].categoryName;
		var charges = response.lstServiceConfigurations[i].charges;
		packageName = response.lstServiceConfigurations[i].packageName;
		var cgscode = response.lstServiceConfigurations[i].cgscode;
		distribute  = response.lstServiceConfigurations[i].distribute;
		
		total = Number(total) + Number(charges);
		
		result = result + '<tr> ' + '	<td>' + (i + 1) + '</td> ' + '	<td>'
				+ categoryName + '</td> ' 
				+ '	<td>' + cgscode + '</td> '
				+ '	<td>' + charges + '</td> '
				

				+ '</tr> ';

	}
	var pk="Package Name Is: ";
	var packageAmt=" (pack amt is: )"+ total.toFixed(2);
	pk= pk + packageName +packageAmt;
	var totaltxt="Total Amount is";
    $('#packageName').html(pk);
    $('#distributed').html(total.toFixed(2));
    $('#totaltxt').html(totaltxt);
	$("#packagedetails").html(result);

}
/*****
 * @author    :BILAL
 * @Date      :14-02-2018
 * @Code      :For getting list of services 
 * ******/
function getpServiceDetailsData(){
	var masterId = $("#li0").val();
	var liSizeForServices = $("#dynamicItem li").length;
	var selfId  =0;
	
	if (liSizeForServices > 1) {
		selfId =$("#li" + (liSizeForServices - 1)).val();
	}
	
	//$('#pleaseWait').show();
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getpServiceDetailsDatareport",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(r) {
			
				setpServiceDetailsReport(r) ;
				//$('#pleaseWait').hide();
		}
	});
}
/*****
 * @author    :BILAL
 * @Date      :14-02-2018
 * @Code      :For setting list of services 
 * ******/
function setpServiceDetailsReport(r){

	var result = '';
	
	for ( var i = 0; i < r.lstsubser.length; i++) {

		var charges = r.lstsubser[i].charges;
		//var selfId = r.lstsubser[i].selfId;
		var updatedDate = r.lstsubser[i].updatedDate;
		
		var createdDate = r.lstsubser[i].createdDate;
		//var serviceId = r.lstsubser[i].serviceId;
		var service_name = r.lstsubser[i].service_name;
		
		var subservName = r.lstsubser[i].subservName;
		var createdusername = r.lstsubser[i].createdusername;
		var updatedusername = r.lstsubser[i].updatedusername;
		
		var underSubSer = r.lstsubser[i].underSubSer;
		var cgscode = r.lstsubser[i].cgscode;
		var codename = r.lstsubser[i].codename;
		
		//var isCategory = r.lstsubser[i].isCategory;
		//var deleted = r.lstsubser[i].deleted;
		//var id = r.lstsubser[i].id;
		
		createdDate=new Date(createdDate).toLocaleDateString('en-GB');
		if (updatedDate != null) {
			updatedDate=new Date(updatedDate).toLocaleDateString('en-GB');
		}else{
			updatedDate='-';
		}
		result = result + '<tr> ' + '	<td>' + (i + 1) + '</td> ' + '	<td>'
				+ service_name + '</td> ' 
				+ '	<td>' + subservName + '</td> '
				+ '	<td>' + codename + '</td> '
				
				+ '	<td>' + cgscode + '</td> '
				+ '	<td>' + underSubSer + '</td> '
				
				+ '	<td>' + charges + '</td> '
				+ '	<td>' + createdusername + '</td> '
				
				+ '	<td>' + createdDate + '</td> '
				+ '	<td>' + updatedusername + '</td> '
				
				+ '	<td>' + updatedDate + '</td> '
				
				
				+ '</tr> ';

	}
	
	$("#servicesdetails").html(result);

}


/*****
 * @author    :BILAL
 * @Date      :14-02-2018
 * @Code      :For getting list of charges 
 * ******/
function getChargesDetailsData(){
	var masterId = $("#lisH" + 0).val();
	var liSizeForServices = $("#dynamicItemsinfo li").length;
	var selfId  =0;
	
	if (liSizeForServices > 1) {
		selfId =$("#lisH" + (liSizeForServices - 1)).val();
	}
	
	//$('#pleaseWait').show();
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getpChargesDetailsDatareport",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(r) {
				
			setChargesDetailsData(r) ;
				//$('#pleaseWait').hide();
		}
	});
}
/*****
 * @author    :BILAL
 * @Date      :14-02-2018
 * @Code      :For setting list of charges 
 * ******/
function setChargesDetailsData(r){

	var result = '';
	
	for ( var i = 0; i < r.lstsubser.length; i++) {

		
		//var selfId = r.lstsubser[i].selfId;
		var updatedDate = r.lstsubser[i].updatedDate;
		
		var createdDate = r.lstsubser[i].createdDate;
		//var serviceId = r.lstsubser[i].serviceId;
		var service_name = r.lstsubser[i].service_name;
		
		var subservName = r.lstsubser[i].subservName;
		var createdusername = r.lstsubser[i].createdusername;
		var updatedusername = r.lstsubser[i].updatedusername;
		
		var underSubSer = r.lstsubser[i].underSubSer;
		
		var codename = r.lstsubser[i].codename;
		var charges =  r.lstsubser[i].normal_bed_charges;
		
		//var isCategory = r.lstsubser[i].isCategory;
		//var deleted = r.lstsubser[i].deleted;
		//var id = r.lstsubser[i].id;
		
		createdDate=new Date(createdDate).toLocaleDateString('en-GB');
		if (updatedDate != null) {
			updatedDate=new Date(updatedDate).toLocaleDateString('en-GB');
		}else{
			updatedDate='-';
		}
		result = result + '<tr> ' + '	<td>' + (i + 1) + '</td> ' + '	<td>'
				+ service_name + '</td> ' 
				+ '	<td>' + subservName + '</td> '
				+ '	<td>' + codename + '</td> '
				
				
				+ '	<td>' + underSubSer + '</td> '
				
				
				+ '	<td>' + createdusername + '</td> '
				
				+ '	<td>' + createdDate + '</td> '
				+ '	<td>' + updatedusername + '</td> '
				
				+ '	<td>' + updatedDate + '</td> '
				
				+ '	<td>' + charges + '</td> '
				+ '</tr> ';

	}
	
	$("#servicesdetails").html(result);

}
/*****
 * @author    :BILAL
 * @Date      :15-02-2018
 * @Code      :For getting sponsor hall and package reports 
 * ******/
function getsponsorHallpackageReport(){

	//charges Id and Charges Slave Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = $("#lisHc0").val();
	var isComServlastId = 0;
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId =$("#lisHc" + (liSizeCom - 1)).val();
    
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = $("#lisH0").val();
	var hallSlaveId =0;
	var liSizeHall = $("#dynamicItems2 li").length;
    hallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	

	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromViewForSub",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setsponsorHallpackageReport(r);
			
		}
	});		

}
/*****
 * @author    :BILAL
 * @Date      :15-02-2018
 * @Code      :For setting sponsor hall and package reports 
 * ******/
function setsponsorHallpackageReport(r) {

	var result = '';

	for ( var i = 0; i < r.lstServiceConfigurations.length; i++) {

		var categoryName = r.lstServiceConfigurations[i].categoryName;

		var cgscode = r.lstServiceConfigurations[i].cgscode;

		var charges = r.lstServiceConfigurations[i].charges;
		var createdusername = r.lstServiceConfigurations[i].createdusername;
		var createdDate = r.lstServiceConfigurations[i].createdDate;
		var updatedusername = r.lstServiceConfigurations[i].updatedusername;
		var updatedDate = r.lstServiceConfigurations[i].updatedDate;

		createdDate = new Date(createdDate).toLocaleDateString('en-GB');
		if (updatedDate != null) {
			updatedDate = new Date(updatedDate).toLocaleDateString('en-GB');
		} else {
			updatedDate = "-";
		}

		result = result + '<tr> ' + '	<td>' + (i + 1) + '</td> ' + '	<td>'
				+ categoryName + '</td> ' + '	<td>' + cgscode + '</td> '
				+ '	<td>' + charges + '</td> '

				+ '	<td>' + createdusername + '</td> '

				+ '	<td>' + createdDate + '</td> ' + '	<td>' + updatedusername
				+ '</td> '

				+ '	<td>' + updatedDate + '</td> '

				+ '</tr> ';

	}

	$("#sponsorhallpackagedetails").html(result);

}