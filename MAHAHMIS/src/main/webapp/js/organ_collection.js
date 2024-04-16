function getAllTitle(){
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllTitle",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var html = "";
			html = html + "<option value='select'>-Select Title-</option>";
			for ( var i = 0; i < r.length; i++) {

				html = html + "<option value='" + r[i].fTitle
						+ "'>" + r[i].fTitle + "</option>";
			}
			$("#prefix").html(html);
		}
	});
	
}

function getBloodGroupList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getBloodGroupList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBloodGroupList(r);
		},
	});
}

function setBloodGroupList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Blood Group - </option>";
	
    for ( var i = 0; i < r.lstBloodGroupMaster.length; i++) {  

        list = list + "<option value='"+r.lstBloodGroupMaster[i].bloodGroupId+"' class='un'>" + (r.lstBloodGroupMaster[i].bloodGrouptName) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'></option>";  
    $("#bloodGroupId").html(list);
}

function getDonorDetailsById(organDonorId) {
	
	if(organDonorId !=undefined && organDonorId!=null && organDonorId!="" && organDonorId!="null"){
		
		toggleEntryDivOrganCollection();
		
		var inputs = [];
		inputs.push('id=' + organDonorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrganDonorById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#firstName").val(r.firstName);
				 $("#middleName").val(r.middleName);
				 $("#lastName").val(r.lastName);
				 $("#organDonorId").val(r.id);
				 $("#prefix option:selected").text(r.prefix);
				 $("#prefix option:selected").val(r.prefix);
				 $("#bloodGroupId").val(r.bloodGroupId);
				 $("#bodySize").val(r.bodySize);
				 $("#bodyTypeId").select2("val",r.bodyType);
			}
		});
	}
}

function getAllOrgansFromCheckupList(checkupListId){
	
//	alert("---checkupListId --> " + checkupListId);
	
		if(checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null"){
		var inputs = [];
		inputs.push('checkupListId=' + checkupListId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrgansAgainstCheckupList",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setOrgansToDropDown(r);
			}
		});
	}
}

function setOrgansToDropDown(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Organ - </option>";
	
	
	
    for ( var i = 0; i < r.lstIntendOrganDonorMasterDto.length; i++) {  

        list = list + "<option value='"+r.lstIntendOrganDonorMasterDto[i].intendId+"' class='un'>" + (r.lstIntendOrganDonorMasterDto[i].intendOrganDonor) + "</option>";    
    }  
   // list = list + "<option value='-1' class='un'></option>";  
    $("#organId").html(list);
	
}

function toggleEntryDivOrganCollection() {
	$("#divForOrganCollection").toggle('slow');
}

function getAllCollectedOrgans(){
	
	var unitId = $("#unitId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('lastDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organCollection/getAllCollectedOrgans",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllCollectedOrgans(r, "All");
		}
	});
}

function setAllCollectedOrgans(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.listOrganCollectionDto.length; i++) {
				
				var ocheckupdate = new Date(r.listOrganCollectionDto[i].createdDate).toLocaleString('en-GB');
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganCollectionDto[i].organCollectionId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganCollectionDto[i].donorId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganCollectionDto[i].prefix+" "+r.listOrganCollectionDto[i].firstName+" "+r.listOrganCollectionDto[i].middleName+" "+r.listOrganCollectionDto[i].lastName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganCollectionDto[i].organName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganCollectionDto[i].collectionDateTime
						+ '</td>'
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						//+ getDateWithTime(r.listOrganCollectionDto[i].createdDate)
						+ ocheckupdate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						//+ getDateWithTime(r.listOrganCollectionDto[i].createdDate)
						+ ocheckupdate
						+ '</td>'
						
						/*+ ' <td class="col-md-1 center">'
						+ r.listOrganCollectionDto[i].organCollectionDocument
						+ '</td>'*/
						
						+ ' <td class="col-md-1 center">'
						+ '<a href="#" onclick=viewOrganCollectionDocument('+i+','+ r.listOrganCollectionDto[i].organCollectionId+')>' +r.listOrganCollectionDto[i].organCollectionDocument+' </a>'
						+ '</td>'
						
						if(r.listOrganCollectionDto[i].isStockInward == "Y"){
								htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" disabled onclick=editOrganCollection('
							+ r.listOrganCollectionDto[i].organCollectionId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" disabled onclick=deleteOrganCollection('
							+ r.listOrganCollectionDto[i].organCollectionId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
						}else{
								htm = htm	+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editOrganCollection('
								+ r.listOrganCollectionDto[i].organCollectionId
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganCollection('
								+ r.listOrganCollectionDto[i].organCollectionId
								+ ')><i class="fa fa-trash-o"></i></button></td>'
						}
						
				htm = htm	+ "<td class='col-md-1 center'><input type='hidden' id='hiddenDocid"
						+ (i)
						+ "' value='"
						+ r.listOrganCollectionDto[i].organCollectionDocument
						+ "'>"
						
						+ "</td> "
						
						
						+ '</tr>';
				index++;
			}
		} else if (CallFrom == "search") {
			
			var ocheckupdate = new Date(r.donorCheckupList.createdDate).toLocaleString('en-GB');
			htm = htm
					+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.organCollectionId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.organDonationRegistrationDto.id
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.prefix+" "+r.firstName+" "+r.middleName+" "+r.lastName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.organName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.collectionDateTime
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						//+ getDateWithTime(r.donorCheckupList.createdDate)
						+ ocheckupdate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						//+ getDateWithTime(r.donorCheckupList.createdDate)
						+ ocheckupdate
						+ '</td>'
						
						/*+ ' <td class="col-md-1 center">'
						+ r.organCollectionDocument
						+ '</td>'*/
						
						+ ' <td class="col-md-1 center">'
						+ '<a href="#" onclick=viewOrganCollectionDocument('+0+','+ r.organCollectionId+')>' +r.organCollectionDocument+' </a>'
						+ '</td>'
					
						if(r.isStockInward == "Y"){
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" disabled onclick=editOrganCollection('
							+ r.organCollectionId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" disabled onclick=deleteOrganCollection('
							+ r.organCollectionId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
						}else {
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editOrganCollection('
							+ r.organCollectionId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganCollection('
							+ r.organCollectionId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
						}
						
			htm = htm	+ "<td class='col-md-1 center'><input type='hidden' id='hiddenDocid"
						+ (0)
						+ "' value='"
						+ r.organCollectionDocument
						+ "'>"
						
						+ "</td> "
						
						
						+ '</tr>';
			index++;
		}
	}
	$("#collectedOrgansList").html(htm);
	
}

function editOrganCollection(organCollectionId){
	if(organCollectionId !=undefined && organCollectionId!=null && organCollectionId!="" && organCollectionId!="null"){
		
		var inputs = [];
		inputs.push('organCollectionId=' + organCollectionId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organCollection/editCollectedOrganById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleEntryDivOrganCollection();
				
		//		alert(JSON.stringify(r));
				
				getAllOrgansFromCheckupList(r.donorCheckupList.checkupListId);
			
				$('#organCollectionId').val(r.organCollectionId);
				$('#organDonorId').val(r.organDonationRegistrationDto.id);
				$('#treatmentId').val(r.organDonorTreatment.organDonorTreatmentId);
				$('#checkupListId').val(r.donorCheckupList.checkupListId);		
				$("#prefix").val(r.prefix);
				$("#firstName").val(r.firstName);
				$("#middleName").val(r.middleName);
				$("#lastName").val(r.lastName);
				
			//	$("#organId").val(r.organId);
			//	$("#organId").val(r.organName);
			//	$('select[name="organId"]').val('1');
			//	var organs = document.getElementById("organId");
			//	organs.options[organs.selectedIndex].text(r.organName);
				
				// organ name fetch problem fix, aniket 6 SEPT 22
				var list = ""; 
			    list = list + "<option value='"+r.organId+"' class='un'>" + (r.organName) + "</option>";
			    $("#organId").html(list);
			    
			
				//alert("DateTime----"+r.collectionDateTime);
				$("#organQuantity").val(r.organQuantity);
				$("#preservationMethodId").select2("val",r.preservationMethodId);
				$("#dateTime").val(r.collectionDateTime);
				$("#coldIschemiaTimeId").select2("val",r.coldIschemiaTimeId);
				
				$("#surgeryTechniqueId").select2("val",r.surgeryTechniqueId);
				$("#collectedByUserId").val(r.collectedByUserId);
				
				$("#bloodGroupId").val(r.bloodGroupId);
				$("#bodyTypeId").select2("val",r.bodyTypeId);
				$("#bodySize").val(r.bodySize);
				$("#remarks").val(r.remarks);
			//	$('select#organId').val(r.organId);
				
			}
		});
	}
}


function deleteOrganCollection(organCollectionId){
	
	if(organCollectionId !=undefined && organCollectionId!=null && organCollectionId!="" && organCollectionId!="null"){
		var r = confirm("Are You Sure You Want To Delete Organ Collection Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organCollection/deleteCollectedOrganById",
				data : {
					"organCollectionId" : organCollectionId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllCollectedOrgans();
				}
			});
		}
	}
	
}

function saveCollectedOrgan(){

	var organCollectionId = $('#organCollectionId').val();
	var organDonorId= $('#organDonorId').val();
	var treatmentId = $('#treatmentId').val();
	var checkupListId = $('#checkupListId').val();
	
	var prefix = $('#prefix').val();
	if(prefix=="" || prefix == "0"){
		alert("Please enter prefix");
		return false;
	}
	
	var firstName = $('#firstName').val();
	if(firstName==""){
		alert("Please enter first name");
		return false;
	}
	
	var middleName = $('#middleName').val();
//	if(middleName==""){
//		alert("Please enter middle name");
//		return false;
//	}

	var lastName = $('#lastName').val();
	if(lastName==""){
		alert("Please enter last name");
		return false;
	}
	
	var organId = $('#organId').val();
	
	if(organId=="" || organId == "0" || organId == null || organId == "null"){
		alert("Please select organ");
		return false;
	}
	
	var organName = $("#organId option:selected").text();
//	alert(organName);
	
	var organQuantity = $('#organQuantity').val();
	if(organQuantity==""){
		alert("Please enter organ quantity");
		return false;
	}
	var preservationMethodId = $('#preservationMethodId option:selected').val();
	if(preservationMethodId=="" || preservationMethodId == "0"){
		alert("Please select preservation method");
		return false;
	}

	var collectionDateTime = $('#dateTime').val();
	
	if(collectionDateTime==""){
		alert("Please enter collection date time");
		return false;
	}
	
	
	
	var collectionTime = $('#dateTimeId').val();
	if(collectionTime==""){
		alert("Please enter collection time");
		return false;
	}
	
	//collectionDateTime = collectionTime+"_"+collectionTime;

	var coldIschemiaTimeId = $('#coldIschemiaTimeId option:selected').val();
	if(coldIschemiaTimeId=="" || coldIschemiaTimeId == "0"){
		alert("Please select cold Ischemia Time");
		return false;
	}
	
	var surgeryTechniqueId = $('#surgeryTechniqueId option:selected').val();
	if(surgeryTechniqueId=="" || surgeryTechniqueId == "0"){
		alert("Please select surgery technique");
		return false;
	}
	
	var collectedByUserId = $('#collectedByUserId').val();
	if(collectedByUserId=="" || collectedByUserId == "0"){
		alert("Please select user");
		return false;
	}
	
	var bloodGroupId = $('#bloodGroupId').val();
	if(bloodGroupId=="" || bloodGroupId == "0"){
		alert("Please select blood group");
		return false;
	}
	
	var bodyTypeId = $('#bodyTypeId option:selected').val();
	if(bodyTypeId=="" || bodyTypeId == "0"){
		alert("Please select body type");
		return false;
	}

	var bodySize = $('#bodySize').val();
	
	var remarks = $('#remarks').val();
	
//	var containerNumber = organName +"-"+ checkupListId +"-"+ treatmentId;
	
	var form = $("#documentForm")[0];
	
	if(organCollectionId == 0)
	 {
//		if (document.getElementsByName("uploadOrganCollectionDocs").length == 0 || $("#uploadOrganCollectionDocsId").val() == "") {
//			alert("Please select file");
//			return false;
//		}
	}
	
	var organCollectionDocument = getFileValue('uploadOrganCollectionDocsId');
	
	
	
//	document.getElementById("primeLoader").style.display = "block";

	var data = new FormData(form);
	//alert("remarks"+remarks);
	data.append("organCollectionId", organCollectionId);
	data.append("prefix", prefix);
	data.append("firstName", firstName);
	data.append("middleName", middleName);
	data.append("lastName", lastName);
	data.append("organId", organId);
	data.append("organName", organName);
	data.append("organQuantity", organQuantity);
	data.append("preservationMethodId", preservationMethodId);
	data.append("collectionDateTime", collectionDateTime);
	data.append("coldIschemiaTimeId", coldIschemiaTimeId);
	data.append("surgeryTechniqueId", surgeryTechniqueId);
	data.append("collectedByUserId", collectedByUserId);
	data.append("bloodGroupId", bloodGroupId);
	data.append("bodyTypeId", bodyTypeId);
	data.append("bodySize", bodySize);
	
	data.append("organCollectionDocument", organCollectionDocument);
	data.append("organDonorId", organDonorId);
	data.append("treatmentId", treatmentId);
	data.append("checkupListId", checkupListId);
	data.append("uploadOrganCollectionDocs", organCollectionDocument);
	data.append("remarksNew", remarks);
	
	
	jQuery.ajax({
		type : "POST",
		enctype: 'multipart/form-data',
		url : "ehat/organCollection/saveOrganCollection",
		//data	: str + "&reqType=AJAX",
		data : data,
		processData : false,
		contentType : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			toggleEntryDivOrganCollection();
			if (data == 1) {
				alertify.success("Organ collected sucessfully");
				getAllCollectedOrgans();
				clearOrganCollection();
			}else if (data == 2) {
				alertify.success("Organ updated sucessfully");
				getAllCollectedOrgans();
				clearOrganCollection();
			}else{
				alertify.error("Network Issue");	
				getAllCollectedOrgans();
				clearOrganCollection();
			}
			
		//	document.getElementById("primeLoader").style.display = "none";
		}
	});	
}

function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

function clearOrganCollection(){
	$('#prefix').val("");
	$('#firstName').val("");
	$('#middleName').val("");
	$('#lastName').val("");
	$('#organQuantity').val("");
	$('#organId').val("");
	$('#bloodGroupId').val("");
	$('#preservationMethodId').select2("val",0);
	$('#coldIschemiaTimeId').select2("val",0);
	$('#surgeryTechniqueId').select2("val",0);
	$('#bodyTypeId').select2("val",0);
	$('#dateTime').val("");
	$('#collectedByUserId').val("");
	$('#bodySize').val("");
	$('#uploadOrganCollectionDocsId').val("");
	$('#remarks').val("");
}

function getAllBodyType() {
	var unitId = $("#unitId").val();
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodyType/getAllBodyType",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBodyTypeList(r);
		}
	});
}

function setBodyTypeList(r){
	var list = "";  
	list = list + "<option value='0'> - Select Body Type - </option>";
    for ( var i = 0; i < r.lstBodyTypeDto.length; i++) {  
        list = list + "<option value='"+r.lstBodyTypeDto[i].bodyTypeId+"' class='un'>" + (r.lstBodyTypeDto[i].bodyTypeName) + "</option>";    
    }  
    $("#bodyTypeId").html(list);
    $('#bodyTypeId').select2();
    
}

function getAllPreservationMethodMaster() {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/preservationMethodMaster/getAllPreservationMethodMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllPreservationMethodList(r);
		}
	});
}


function setAllPreservationMethodList(r){
	var list = "";  
	list = list + "<option value='0'> - Preservation Method - </option>";
    for ( var i = 0; i < r.lstPreservationMethodMasterDto.length; i++) {  
        list = list + "<option value='"+r.lstPreservationMethodMasterDto[i].preservationMethodMasterId+"' class='un'>" + (r.lstPreservationMethodMasterDto[i].preservationMethodName) + "</option>";    
    }  
    $("#preservationMethodId").html(list);
    $('#preservationMethodId').select2();
    
}

function getAllSurgeryTechnique() {
	var unitId = $("#unitId").val();
	var inputs = [];
	//inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/surgeryTechnique/getAllSurgeryTechnique",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSurgeryTechniqueList(r);
		}
	});
}

function setAllSurgeryTechniqueList(r){
	var list = "";  
	list = list + "<option value='0'> - Surgery Technique - </option>";
    for ( var i = 0; i < r.lstSurgeryTechniqueDto.length; i++) {  
        list = list + "<option value='"+r.lstSurgeryTechniqueDto[i].stId+"' class='un'>" + (r.lstSurgeryTechniqueDto[i].stName) + "</option>";    
    }  
    $("#surgeryTechniqueId").html(list);
    $('#surgeryTechniqueId').select2();
    
}

function getAllClodIschemiaTime() {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clodIschemiaTime/getAllClodIschemiaTime",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllClodIschemiaTimeList(r);
		}
	});
}

function setAllClodIschemiaTimeList(r){
	var list = "";  
	list = list + "<option value='0'> - Cold Ischemia Time - </option>";
    for ( var i = 0; i < r.lstClodIschemiaTimeDto.length; i++) {  
        list = list + "<option value='"+r.lstClodIschemiaTimeDto[i].clodIschemiaTimeId+"' class='un'>" + (r.lstClodIschemiaTimeDto[i].clodIschemiaTimeName) + "</option>";    
    }  
    $("#coldIschemiaTimeId").html(list);
    $('#coldIschemiaTimeId').select2();
    
}

function getAllTitle(){
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllTitle",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var html = "";
			html = html + "<option value=''> -Select Title- </option>";
			for ( var i = 0; i < r.length; i++) {
				html = html + "<option value='" + r[i].fTitle
						+ "'>" + r[i].fTitle + "</option>";
			}
			$("#prefix").html(html);
		}
	});
}


function serachOrganContainerNumberById(value){
	if(value !="" && value!=null && value!=undefined){
		var resultData = [];
		var inputs = [];
		inputs.push('searchParam=' + value);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/organCollection/serachOrganContainerDetailsById",
			data : str + "&reqType=AJAX",
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if(r.listOrganCollectionDto!=null){
					var template = "";
					for ( var i = 0; i < r.listOrganCollectionDto.length; i++) {
						var arrValue = r.listOrganCollectionDto[i].organCollectionId +"_"+r.listOrganCollectionDto[i].organDonorTreatment.organDonorTreatmentId+"-"+r.listOrganCollectionDto[i].organName;
						var organCollectionId = r.listOrganCollectionDto[i].organCollectionId;
						resultData.push({
							ID : organCollectionId,
							Name : arrValue
						
						});
						template = template + '<li data-value="' + organCollectionId + '" class=""><a href="#">' + arrValue + '</a></li>';
					}
					
					setTimeout(function() {
						$("#divtext_search_container_number .typeahead").html(template);
						$("#divtext_search_container_number .typeahead").show();
						
						$("#search_container_number").typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#search_container_number").data('typeahead').source = resultData;
					}, 500);
				}
			}
		});
		function displayResult(item) {
			var res = item.text.split('_');
			var id = res[0];
			var name = res[1];		
			$("#search_container_number").val(name);	
			$("#organDetailsNo").val(id);
			
		}
	}
	
}

function organDetailsBarcodePrint(callfrom){
	
	var organDetailsNo =$("#organDetailsNo").val();
	var quantity = $("#quantity").val();					
	window.open("odt_organ_barcode_print.jsp?organDetailsId=" +encodeURIComponent(organDetailsNo)
			+ "&quantity=" + encodeURIComponent(quantity)
			+ "&callfrom=" + encodeURIComponent(callfrom));
}

function getDateWithTime(date) {
	var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + date1);
	return date1;
}

function organCollectionAutoSuggestion(inputID) {
	
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('organCollectionId=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organCollection/organCollectionAutoSuggestion",
		cache : false,		
		success : function(r) {
			var template = "";
			
					for ( var j = 0; j < r.listOrganCollectionDto.length; j++) {
						
						var arrValue = r.listOrganCollectionDto[j].organCollectionId +"-"+r.listOrganCollectionDto[j].prefix +"-"+r.listOrganCollectionDto[j].firstName+"-"+r.listOrganCollectionDto[j].middleName+"-"+r.listOrganCollectionDto[j].lastName;
						var idValue = r.listOrganCollectionDto[j].organCollectionId;
						var organCollectionName = r.listOrganCollectionDto[j].firstName;
						resultData.push({
							ID : idValue,
							Name : organCollectionName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#organRquestDiv .typeahead").html(template);
				$("div#organRquestDiv .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var organCollectionId = res[0];
		var organCollectionName = res[1];
		$("#" + inputID).val(organCollectionName);	
		if(organCollectionId !=0 && organCollectionId!=undefined && organCollectionId!=""&& organCollectionId!=null){
			getOrganCollectionById(organCollectionId);
		}
	}
}

function getOrganCollectionById(organCollectionId){
	if(organCollectionId !=undefined && organCollectionId!=null && organCollectionId!="" && organCollectionId!="null"){
		
		var inputs = [];
		inputs.push('organCollectionId=' + organCollectionId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organCollection/getCollectedOrganById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllCollectedOrgans(r,'search');
			}
		});
	}
}



function viewOrganCollectionDocument(index , consernFormId){
	
	var document = $("#hiddenDocid"+index).val();
	
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		$('#ViewDocumemnt').attr("src","ehat/organCollection/viewOpdDocuments?documentId="+consernFormId+"&fileName="+document);
		$('#viewDocModal').modal('show');
		
		
		//$('#documentComment').html(note);
		
		
	}
}

//added by sandip 
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}

