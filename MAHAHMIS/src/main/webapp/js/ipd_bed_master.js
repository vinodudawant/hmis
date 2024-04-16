/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function refreshChargesMasterSlave() {

	$("#divHallList").show('slow');
	$("#divBedDetails").hide();
	
	$('#slaveId').val("");
	$('#categoryName').val("");
	$('#codeName').val("");
	$('input[name="ppnTypes"][value="N"]').prop('checked', true);
	
	$('#rehPackCharges').val(0);
	$('#normalNurseCharges').val(0);
	$('#isoNurseCharges').val(0);
	$('#normalBedCharges').val(0);
	$('#isoBedCharges').val(0);
	
	$("#btnSave").show();
	$('#listmstr_select').select2("readonly", false);
	$('#categoryName').attr("readonly", false);
	$('#rehPackCharges').attr("readonly", false);
	$('#normalNurseCharges').attr("readonly", false);
	$('#isoNurseCharges').attr("readonly", false);
	$('#normalBedCharges').attr("readonly", false);
	$('#isoBedCharges').attr("readonly", false);
	$('input[name="privilegesTypes"]').attr("disabled",false);
	$('#dynamicItem').find('li a').addClass("select2-search-choice-close");
	$("#callFromForSave").val("insert");

	$("#ChargesIdHidden").val("");
	var masterid = $("#li0").val();
	removeInpuntFild(0,masterid,'dynamicItem');
	getChargesMasterSlaveList();
	setTimeout(function(){userAccess();},300);
	setIsCategoryWiseInput();
	$('#noOfBeds').val(0);
}

function setIsCategoryWiseInput(){
	
	var isCat = $("input[name='privilegesTypes']:checked").val();
	
	if(isCat == "Y"){
		
		$('#rehPackCharges').attr("readonly", false);
		$('#normalNurseCharges').attr("readonly", false);
		$('#isoNurseCharges').attr("readonly", false);
		$('#normalBedCharges').attr("readonly", true);
		$('#isoBedCharges').attr("readonly", true);
		$('#noOfBeds').attr("readonly", true);
		$('#noOfBeds').val(0);
		
	}else{
		
		$('#rehPackCharges').attr("readonly", true);
		$('#normalNurseCharges').attr("readonly", true);
		$('#isoNurseCharges').attr("readonly", true);
		$('#normalBedCharges').attr("readonly", false);
		$('#isoBedCharges').attr("readonly", false);
		$('#noOfBeds').attr("readonly", false);
		
		var noOfBedsForUpdate = $("#noOfBedsForUpdate").val();
		$('#noOfBeds').val(noOfBedsForUpdate);
	}
	
	var callFromForSave = $("#callFromForSave").val();
	
	if(callFromForSave == "update"){
		$('#noOfBeds').attr("readonly", true);
	}
}
/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function saveChargesMasterSlave() {
	
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var numbr = 0;
	var slaveId = $("#slaveId").val();
	var categoryName = $("#categoryName").val();
	var codeName = $("#codeName").val();
	var isCategory = $("input:radio[name='privilegesTypes']:checked").val();
	var isPpn = $("input:radio[name='ppnTypes']:checked").val();
	var byName2 = $("#byName2").val();
	var masterid = $("#li0").val();// masterid
	var selfId = 0;// static self id
	numbr = $("#numbr").val();
	
	var rehPackCharges = $('#rehPackCharges').val();
	var noOfBeds = $('#noOfBeds').val();
	var normalNurseCharges = $('#normalNurseCharges').val();
	var isoNurseCharges = $('#isoNurseCharges').val();
	var normalBedCharges = $('#normalBedCharges').val();
	var isoBedCharges = $('#isoBedCharges').val();
	
	var liSize = $("#dynamicItem li").length;
	
	if (categoryName == "" || categoryName == "undefined" || categoryName == null) {

		$("#categoryName").focus();
		return false;
	}
	
	if (codeName == "" || codeName == "undefined" || codeName == null) {

		$("#codeName").val("");
		//$("#codeName").focus();
		//return false;
	}
	
	if (liSize == 0) {

		alert("Please Select Atleast One Charges and Sub Charges! ");
		SetFocus('dynamicItems');
		return false;
	}
	
	if (liSize == 1) {
		fetchChargesSlaveListById(masterid, selfId);
	} else {

		selfId = $("#li" + (liSize - 1)).val();
		fetchChargesSlaveListById(masterid, selfId);
	}

	if (slaveId == "" || slaveId == null || slaveId == undefined) {
		slaveId = 0;
	}
	
	var callFromForSave = $("#callFromForSave").val();
	
	if(isCategory == "N" && liSize == 1){
		
		alert("Please select Hall Type of Hall");
		return false;
	}
	
	if(isCategory == "Y" && liSize > 1){
		
		alert("You have creating Hall Type, Please remove selected Hall Type");
		return false;
	}
	
	var bedsList = [];
	
	if(callFromForSave == "addBed" || callFromForSave == "insert"){
		
		if(isCategory == "N" && Number(noOfBeds) > 0){
			
			if(slaveId > 0){
				
				var bedListSize = $("#noOfBedsHidden"+slaveId).val();
				var lstBeds = $("#lstBeds"+slaveId).text();
				var lstBedJson = JSON.parse(lstBeds);
				var bedNameStartFrom = Number(lstBedJson.length) + 1;
				noOfBeds = (Number(bedListSize) + Number(noOfBeds));
				
				for(var i = 0; i < lstBedJson.length; i++){
					
					bedObj = {}
					bedObj ["bi"] = lstBedJson[i].bi;
					bedObj ["bdnm"] = "Bed"+ (i+1);
					bedObj ["bs"] = lstBedJson[i].bs;
					bedObj ["updatedBy"] = userId;
					bedObj ["unitId"] = unitId;
			        bedsList.push(bedObj);
				}
				
				for(var i = bedNameStartFrom; i <= noOfBeds; i++){
					
					bedObj = {}
					bedObj ["bi"] = 0;
					bedObj ["bdnm"] = "Bed"+ i;
					bedObj ["createdBy"] = userId;
					bedObj ["unitId"] = unitId;
			        bedsList.push(bedObj);
				}
			}else{
				
				for(var i=1; i <= noOfBeds; i++){
					
					bedObj = {}
					bedObj ["bi"] = 0;
					bedObj ["bdnm"] = "Bed"+ i;
					bedObj ["createdBy"] = userId;
					bedObj ["unitId"] = unitId;
			        bedsList.push(bedObj);
				}
			}
		}
	}
	
	if(slaveId == selfId && slaveId > 0){
		
		alert("Hall Type and Hall should not be same");
		return false
	}
	
	var hallObj = {
			
		slaveId			   : slaveId,
		categoryName	   : categoryName,
		codeName		   : codeName,
		createdBy          : userId,
		numbr 			   : numbr,
		deleted            : "N",
		//unitId             : unitId,
		rehPackCharges	   : rehPackCharges,
		noOfBeds 		   : noOfBeds,
		normalNurseCharges : normalNurseCharges,
		isoNurseCharges	   : isoNurseCharges,
		normalBedCharges   : normalBedCharges,
		isoBedCharges	   : isoBedCharges,
		isCategory		   : isCategory,
		isPpn			   : isPpn,
		chargesMasterDto   : masterid,
		selfId			   : selfId,
		discount		   : 0,
		listBeds           : bedsList
	}
	jQuery.ajax({
		async 		: true,
		url 		: "ehat/bedmaster/saveBedMaster",
		type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(hallObj),
        contentType	: 'application/json',
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r == 1){
				
				alertify.success("HallType/Hall saved successfully");
			}else if(r == 2){
				
				alertify.success("HallType/Hall updated successfully");
			}else if(r == 3){
				
				alertify.error("HallType/Hall aready exist");
			}else if(r == 4){
				
				alertify.error("Iscategory field is not changed as beds of this hall are in use");
			}
			
			refreshChargesMasterSlave();
		}
	});
}
/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function updateChargesMasterSlave(slaveId,callFrom) {
	
	$('#numbr').val($('#numbr' + slaveId).val());
	$('#categoryName').val($('#chName' + slaveId).html().trim());
	$('#codeName').val($('#coName' + slaveId).html().trim());
	$('#slaveId').val(slaveId); // set slave id for update
	$("#callFromForSave").val(callFrom);
	
	$('#rehPackCharges').val($('#rehPackCharges' + slaveId).val());
	$('#normalNurseCharges').val($('#normalNurseCharges' + slaveId).val());
	$('#isoNurseCharges').val($('#isoNurseCharges' + slaveId).val());
	$('#normalBedCharges').val($('#normalBedCharges' + slaveId).val());
	$('#isoBedCharges').val($('#isoBedCharges' + slaveId).val());
	
	$('#disc').val($('#discount' + slaveId).val());
	var cat = $('#isCats' + slaveId).val();
	var ppn = $('#isPpn' + slaveId).val();
	if (cat == "Y") {
		$('input[name="privilegesTypes"][value="Y"]').prop('checked', true);
		$('input[name="privilegesTypes"][value="N"]').prop('checked', false);
	} else {
		$('input[name="privilegesTypes"][value="Y"]').prop('checked', false);
		$('input[name="privilegesTypes"][value="N"]').prop('checked', true);
	}
	
	if (ppn == "Y") {
		$('input[name="ppnTypes"][value="Y"]').prop('checked', true);
		$('input[name="ppnTypes"][value="N"]').prop('checked', false);
	} else {
		$('input[name="ppnTypes"][value="Y"]').prop('checked', false);
		$('input[name="ppnTypes"][value="N"]').prop('checked', true);
	}
	
	if(callFrom == "addBed"){
		
		$('#noOfBeds').val(0);
		$('#noOfBeds').attr("readonly", false);
		$('#listmstr_select').select2("readonly", true);
		$('#categoryName').attr("readonly", true);
		$('#rehPackCharges').attr("readonly", true);
		$('#normalNurseCharges').attr("readonly", true);
		$('#isoNurseCharges').attr("readonly", true);
		$('#normalBedCharges').attr("readonly", true);
		$('#isoBedCharges').attr("readonly", true);
		$('input[name="privilegesTypes"]').attr("disabled",true);
		$('#dynamicItem').find('li a').removeClass("select2-search-choice-close");
		
	}else{
		$('#noOfBeds').val($('#noOfBeds' + slaveId).html().trim());
		$('#listmstr_select').select2("readonly", false);
		$('#categoryName').attr("readonly", false);
		$('#noOfBeds').attr("readonly", true);
		$("#noOfBedsForUpdate").val($('#noOfBeds' + slaveId).html().trim());
		/*$('#rehPackCharges').attr("readonly", false);
		$('#normalNurseCharges').attr("readonly", false);
		$('#isoNurseCharges').attr("readonly", false);
		$('#normalBedCharges').attr("readonly", false);
		$('#isoBedCharges').attr("readonly", false);*/
		$('input[name="privilegesTypes"]').attr("disabled",false);
		$('#dynamicItem').find('li a').addClass("select2-search-choice-close");
		
		var isCat = $("input[name='privilegesTypes']:checked").val();
		
		if(isCat == "Y"){
			
			$('#rehPackCharges').attr("readonly", false);
			$('#normalNurseCharges').attr("readonly", false);
			$('#isoNurseCharges').attr("readonly", false);
			$('#normalBedCharges').attr("readonly", true);
			$('#isoBedCharges').attr("readonly", true);
			//$('#noOfBeds').attr("readonly", true);
			
		}else{
			
			$('#rehPackCharges').attr("readonly", true);
			$('#normalNurseCharges').attr("readonly", true);
			$('#isoNurseCharges').attr("readonly", true);
			$('#normalBedCharges').attr("readonly", false);
			$('#isoBedCharges').attr("readonly", false);
			//$('#noOfBeds').attr("readonly", false);
		}
	}
}
/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function getChargesMasterSlaveList() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/bedmaster/getBedMasterList",
		error : function() {
			alert('error');
		},
		success : function(response) {

			setTemplateForChargesSlave(response);
		}
	});
}
/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function setTemplateForChargesSlave(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Id</th>'
						+ '<th class="col-md-1">HallType Name</th>'
						+ '<th class="col-md-1">Hall Name</th>'
						+ '<th class="col-md-1 hide">Code Name</th>'
						+ '<th class="col-md-1 center">No Of Beds</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Add Bed</th>'
						+ '<th class="col-md-1 center">View Bed</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		var noOfBedsList = r.lstChargesSlave[int].listBeds.length;
		var noOfBedsDB = r.lstChargesSlave[int].noOfBeds;
		
		if(r.lstChargesSlave[int].isCategory == 'N'){
			
			var hallTypeName = "-";
			for(var j=0; j < r.lstChargesSlave.length; j++){
				
				if(r.lstChargesSlave[j].slaveId == r.lstChargesSlave[int].selfId){
					
					hallTypeName = r.lstChargesSlave[j].categoryName;
				}
			}
			
			masterModuleBody = masterModuleBody + '<tr>'
			+ '<td id="row'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
			+ '<td id="uId'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (r.lstChargesSlave[int].slaveId)+ '</td>'
			+ '<td class="col-md-1"> '+ (hallTypeName)+ ' </td>'
			+ '<td id="chName'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1">'+ (r.lstChargesSlave[int].categoryName)+ '</td>'
			+ '<td  id="coName'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 hide">'+ (r.lstChargesSlave[int].codeName)+ ' </td>'
			+ '<td  id="noOfBeds'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ noOfBedsList + ' </td>'
			+ '<td class="col-md-1 center" ><button class="btn btn-xs btn-success" value="EDIT" id=btnEdit1'+r.lstChargesSlave[int].slaveId+' onclick="updateChargesMasterSlave('+r.lstChargesSlave[int].slaveId+',\'update\'),fetchSuperCatogoiresSlave('+r.lstChargesSlave[int].slaveId+')"><i class="fa fa-edit"></i></button></td>'
			+ '<td class="col-md-1 center" ><button class="btn btn-xs btn-warning" value="Add" id=btnAdd1'+r.lstChargesSlave[int].slaveId+' onclick="updateChargesMasterSlave('+r.lstChargesSlave[int].slaveId+',\'addBed\'),fetchSuperCatogoiresSlave('+r.lstChargesSlave[int].slaveId+')"><i class="fa fa-plus"></i></button></td>'
			+ '<td class="col-md-1 center" ><button class="btn btn-xs btn-primary" value="View" id=btnView1'+r.lstChargesSlave[int].slaveId+' onclick="viewBedsOfHall('+r.lstChargesSlave[int].slaveId+')"><i class="fa fa-eye"></i></button></td>'
			+ '<td class="col-md-1 center"><button class="btn btn-xs btn-danger" value="DELETE" id=btnDelete '+r.lstChargesSlave[int].slaveId+' onclick=deleteBedMaster('+r.lstChargesSlave[int].slaveId+') > <i class="fa fa-trash-o"></i></button> </td>'
			+ '<input type="hidden" id="isCats'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isCategory+'">'
			+ '<input type="hidden" id="isPpn'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isPpn+'">'
			+ '<input type="hidden" id="numbr'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].numbr+'">'
			+ '<input type="hidden" id="discount'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].discount+'">'
			
			+ '<input type="hidden" id="chargesCatogory'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isCategory+'">'
			+ '<input type="hidden" id="rehPackCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].rehPackCharges+'">'
			+ '<input type="hidden" id="noOfBedsHidden'+r.lstChargesSlave[int].slaveId +'" value="'+noOfBedsDB+'">'
			+ '<input type="hidden" id="normalNurseCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].normalNurseCharges+'">'
			+ '<input type="hidden" id="isoNurseCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isoNurseCharges+'">'
			+ '<input type="hidden" id="normalBedCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].normalBedCharges+'">'
			+ '<input type="hidden" id="isoBedCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isoBedCharges+'">'
			+ '<input type="hidden" id="selfId'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].selfId+'">'
			+ '<td style="display: none" id="lstBeds'+r.lstChargesSlave[int].slaveId +'">'+JSON.stringify(r.lstChargesSlave[int].listBeds)+'</td>'
			
			+ '</tr>';
		}else{
			
			masterModuleBody = masterModuleBody + '<tr>'
			+ '<td id="row'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
			+ '<td id="uId'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+ (r.lstChargesSlave[int].slaveId)+ '</td>'
			+ '<td id="chName'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1">'+ (r.lstChargesSlave[int].categoryName)+ '</td>'
			+ '<td class="col-md-1">-</td>'
			+ '<td  id="coName'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 hide">'+ (r.lstChargesSlave[int].codeName)+ ' </td>'
			+ '<td  id="noOfBeds'+(r.lstChargesSlave[int].slaveId) +'" class="col-md-1 center">'+noOfBedsList+'</td>'
			+ '<td class="col-md-1 center" ><button class="btn btn-xs btn-success" value="EDIT" id=btnEdit1'+r.lstChargesSlave[int].slaveId+' onclick="updateChargesMasterSlave('+r.lstChargesSlave[int].slaveId+',\'update\'),fetchSuperCatogoiresSlave('+r.lstChargesSlave[int].slaveId+')"><i class="fa fa-edit"></i></button></td>'
			+ '<td class="col-md-1 center" ><button disabled class="btn btn-xs btn-warning" value="Add" id=btnEdit1'+r.lstChargesSlave[int].slaveId+' onclick="updateChargesMasterSlave('+r.lstChargesSlave[int].slaveId+',\'addBed\'),fetchSuperCatogoiresSlave('+r.lstChargesSlave[int].slaveId+')"><i class="fa fa-plus"></i></button></td>'
			+ '<td class="col-md-1 center" ><button disabled class="btn btn-xs btn-primary" value="View" id=btnView1'+r.lstChargesSlave[int].slaveId+' onclick="viewBedsOfHall('+r.lstChargesSlave[int].slaveId+',\'addBed\')"><i class="fa fa-eye"></i></button></td>'
			+ '<td class="col-md-1 center"><button class="btn btn-xs btn-danger" value="DELETE" id=btnDelete '+r.lstChargesSlave[int].slaveId+' onclick=deleteBedMaster('+r.lstChargesSlave[int].slaveId+') > <i class="fa fa-trash-o"></i></button> </td>'
			+ '<input type="hidden" id="isCats'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isCategory+'">'
			+ '<input type="hidden" id="isPpn'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isPpn+'">'
			+ '<input type="hidden" id="numbr'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].numbr+'">'
			+ '<input type="hidden" id="discount'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].discount+'">'
			
			+ '<input type="hidden" id="chargesCatogory'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isCategory+'">'
			+ '<input type="hidden" id="rehPackCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].rehPackCharges+'">'
			+ '<input type="hidden" id="noOfBedsHidden'+r.lstChargesSlave[int].slaveId +'" value="'+noOfBedsDB+'">'
			+ '<input type="hidden" id="normalNurseCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].normalNurseCharges+'">'
			+ '<input type="hidden" id="isoNurseCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isoNurseCharges+'">'
			+ '<input type="hidden" id="normalBedCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].normalBedCharges+'">'
			+ '<input type="hidden" id="isoBedCharges'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].isoBedCharges+'">'
			+ '<input type="hidden" id="selfId'+r.lstChargesSlave[int].slaveId +'" value="'+r.lstChargesSlave[int].selfId+'">'
			+ '<td style="display: none" id="lstBeds'+r.lstChargesSlave[int].slaveId +'">'+JSON.stringify(r.lstChargesSlave[int].listBeds)+'</td>'
						
			+ '</tr>';
		}
		
		optionList=optionList+"<option value="+r.lstChargesSlave[int].slaveId+">"+r.lstChargesSlave[int].chargesName+"</option>";
	}
	
	$("#masterModuleBody").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}

function deleteBedMaster(hallId){
	
	var r = confirm("Are You Sure You Want To Delete Hall?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bedmaster/deleteHallById",
			data : { "hallId" : hallId },
			error : function() {
				alert('Network error');
			},
			success : function(response) {

				if(response == 1){
					
					alertify.success("Hall deleted successfully");
				}else if(response == 2){
					
					alertify.error("Hall cannot be deleted");
				}
				getChargesMasterSlaveList();
			}
		});
	}
}

function viewBedsOfHall(hallId){
	
	$("#divHallList").hide();
	$("#divBedDetails").show('slow');
	$("#btnSave").hide();
	jQuery.ajax({
		
		type : "POST",
		url : "ehat/bedmaster/viewBedsOfHall",
		data : { "hallId" : hallId },
		error : function() {
			alert('Network Issue');
		},
		success : function(response) {
			
			$("#bedListSize").val(response.listBeds.length);
			setBedsOfHall(response);
		}
	});
}
function setBedsOfHall(r){
	
	var tBody = "";
	
	for(var i=0; i < r.listBeds.length; i++){
		
		tBody = tBody + "<tr>" 
		  + "<td>"+(i+1)+"</td>" 
		  + "<td>"+r.listBeds[i].bi+"</td>" 
		  + "<td>"+r.categoryName+"</td>" 
		  + "<td>"+r.listBeds[i].bdnm+"</td>" 
		  + '<td><button class="btn btn-xs btn-danger" value="DELETE" onclick=deleteBedById('+r.slaveId+','+r.listBeds[i].bi+') > <i class="fa fa-trash-o"></i></button> </td>'
		  +	"</tr>";
	}
	$("#tBodyBedDetails").html(tBody);
}

function deleteBedById(hallId,bedId){
	
	var r = confirm("Are You Sure You Want To Delete Bed?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bedmaster/deleteBedById",
			data : { "hallId" : hallId, "bedId" : bedId },
			error : function() {
				alert('Network error');
			},
			success : function(response) {
				
				if(response == 1){
					
					alertify.success("Bed deleted successfully");
				}else if(response == 2){
					
					alertify.error("Bed already allocated");
				}
				viewBedsOfHall(hallId);
			}
		});
	}
}
/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function chargesMasterTemplate(response) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-sm-1-1 center' id='chName"
				+ response.lstChargesSlave[i].slaveId
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].categoryName
				+ "</td><td class='col-sm-1-1 center' id='coName"
				+ response.lstChargesSlave[i].slaveId
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].codeName
				+ "</td><td class='col-sm-1-1 center' id='coName"
				+ response.lstChargesSlave[i].slaveId
				+ "' style='height: 21.5px;'>"
				+ response.lstChargesSlave[i].isCategory
				+ "</td><td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editChargesMaster' onclick='updateChargesMasterSlave("
				+ response.lstChargesSlave[i].slaveId
				+ "),fetchSuperCatogoiresSlave(" 
				+ response.lstChargesSlave[i].slaveId
				+ ")' ><i class='fa fa-edit'></i></button></td>"
				+ "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMasterSlave' onclick='deleteChargesMasterSlave("
				+ response.lstChargesSlave[i].slaveId
				+ ")' ><i class='fa fa-trash-o'></i></button></td>"
				+ "<input type='hidden' id='isCat"
				+ response.lstChargesSlave[i].slaveId + "' value='"
				+ response.lstChargesSlave[i].isCategory + "'</tr>";
		index++;

	}

	$("#chargesMasterSlaveBody").html(htm);

}
/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function deleteChargesMasterSlave(slaveId) {

	var r = confirm("Are You Sure You Want To Delete Master Slave?");
	if (r == true) {
		jQuery.ajax({
			async	: false,
			type	: "POST",
			url		: "ehat/chargesSlave/deleteChragesSlave",
			data	: {
				"slaveId" : slaveId
			},			
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				refreshChargesMasterSlave();
				getChargesMasterSlaveList();}
		});
	}
}
/******************
 * @author : Vinod Udawant
 * @code   : for fetching all charges master
 *****************/
function getAllChargesMaster() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/charges/chargesMasterList",

		success : function(response) {
			multiSelect(response);
			$("#listmstr_select").val($('#listmstr_select option:eq(1)').val()).trigger('change');
		}
	});

}
/******************
 * @author : Vinod Udawant
 * @code   : for Fetching id of charges name and catogeory name
 *****************/
function selectChargesName() {

	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	fetchChargesSlaveListById(masterId, selfId);
}
/******************
 * @author : Vinod Udawant
 * @code   : Fetching list of Charges slave by id fetcatY
 *****************/
function fetchChargesSlaveListById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		//url : "ehat/chargesSlave/getChragesSlaveById",
		url : "ehat/chargesSlave/fetcatY",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		/* "slaveId" : parseInt(slaveId) */

		},
		success : function(response) {
			multiSelectSlave(response);
		}
	});
}
/******************
 * @author : Vinod Udawant
 * @code   : for Fetching id of charges name and catogeory name
 *****************/
function setSubChargesMaster(inputId, callfrom) {
	
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/chargesSlave/autoSuggestionChargesMasterNames",
		
		success : function(r) {

			// console.log(r);

			//autoCompTable(r, inputId);
			setTemplateForChargesSlave(r);
			setTimeout(function(){userAccess();},100);

		}
	});
}
/******************
 * @author : Vinod Udawant
 * @code   : this method is used to set auto suggestion on browser
 *****************/
function autoCompTable(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id)
			.mcautocomplete(
					{

						showHeader : true,
						columns : [ /*
									 * { name : 'chargesId', width : '100px',
									 * valueField : 'chargesId' },
									 */{
							name : 'chargesName',
							width : '100px',
							valueField : 'chargesName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {
							console.log(ui);

							var spl = (ui.item.spl = "" ? '' : ui.item.spl);
							if (ui.item.dn != 'No' && ui.item.spl != 'Record'
									&& ui.item.specialisationName != 'Found'
									&& ui.item.depNm != 'Match') {

								$('#byName').val(ui.item.chargesName);
							}

							return false;
						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
							console.log(data);
							console.log(data.lstCharges.length);
							var result;
							if (!data || data.lstCharges.length === 0
									|| !data.lstCharges
									|| data.lstCharges.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'chargesName' : 'Record',
								/* 'codeName' : 'Found', */
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstCharges;// Response List for
								// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");
						}
					});
}

/******************
 * @author : Vinod Udawant
 * @code   : for Fetching id of charges name and catogeory name
 *****************/
function setTempAllService(r) {
	var tableBody = "";
	var index = 1;
	for ( var i = 0; i < r.listService.length; i++) {
		tableBody = tableBody
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ ""
				+ "</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listService[i].serviceId
				+ "</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listService[i].serviceName
				+ "</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editUserAccess' onclick='getProfileByProfileId("
				+ r.listService[i].serviceName
				+ ")' disabled='disabled'><i class='fa fa-edit'></i>"
				+ "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteProfile("
				+ r.listService[i].serviceId
				+ ")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
		index++;
	}
	$("#roleMasterBody").html(tableBody);
}

/******************
 * @author : Vinod Udawant
 * @code   : for Fetching id of charges name and catogeory name
 *****************/
function multiSelect(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}
/******************
 * @author : Vinod Udawant
 * @code   : for Fetching id of charges name and catogeory name
 *****************/
function setDyanamicDivForCharges(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	
	if (liSize == 0) {
		getAllChargesMaster();// for masters
	} else {
		var masterid = $("#li" + 0).val();
		
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}// now inside submaster catagories

}
/******************
 * @author : Vinod Udawant
 * @code   : for Fetching id of charges name and catogeory name
 *****************/
function setDyanamicHallTypes(setDiv, getDiv) {
	// listmstr_select

	var data = $('#' + getDiv).select2('data');
	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();
	var htm = "";
		
	if(count==0){
		
		htm = htm+ 
		
			'<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="" href="#"></a>'
			+ '<input id="li0" type="hidden" value="2">';//2 means Hall Id Charges Master
		+'</li>';
	}else{
		
		htm =htm+ 
			
			'<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		+'</li>';
		
		$('#hname').val(name);		
	}
					
	/*'<li id="liItme0" class="select2-search-choice"><div>Hall</div><a href="#" onclick="removeInpuntFild(0,4,\'dynamicItem\')" tabindex="-1" class="select2-search-choice-close"></a><input type="hidden" value="4" id="li0"></li>';*/
	
	$('#' + setDiv).append(htm);	

	var liSize = $("#" + setDiv + " li").length;
		
	/*if (liSize == 0) {
		fetchAllService();// for masters
	} else {*/
		var masterid = $("#li" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} /*else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}*/
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	/*}*/// now inside submaster catagories
		
		var hiddenId=$("#li"+(liSize-1)).val();		
		$('#hallTypeId').val(hiddenId);
		

}
/******************
 * @author : Vinod Udawant
 * @code   : for Fetching id of charges name and catogeory name
 *****************/
function removeInpuntFild(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();
	} else {
		var masterid = $("#li" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}
}

/******************
 * @author : Vinod Udawant
 * @code   : Fetching super master of service based on there id
 *****************/
function multiSelectSlave(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}
/******************
 * @author : Vinod Udawant
 * @code   : Fetching super master of service based on there id
 *****************/
function fetchSuperCatogoiresSlave(chargesMasterDto) {
	//if charges slave id is not equals or greter than zero 
	if (chargesMasterDto == "" || chargesMasterDto == null || chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"chargesMasterDto" : parseInt(chargesMasterDto)
			},
			
			url : "ehat/chargesSlave/fetchSuperCatogoires",
			error : function() {
				alert('Network Issue!');
			},
			success : function(response) {
				setDyanamicDivForList('dynamicItem',response);
			}
		});
	}
	
}
/******************
 * @author : Vinod Udawant
 * @code   : Setting fectched Response of fetchSuperCatogoiresSlave 
 *****************/
function setDyanamicDivForList(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
		 	
		 	//$('#disc').val(response.lstChargesSlave[i].discount);
	}
	$('#' + setDiv).html(htm);
}

/******************
 * @author : Vinod Udawant
 * @code   : for count on subcharges
 *****************/
function getSubChargesCount(){

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/chargesSlave/getSubChargesCount",

    	success : function(r) {
    		$("#subChrgCount").html(r);
		}
	});
}

function autoSuggessionBedMaster(inputId, callfrom) {
	
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmaster/autoSuggestionChargesMasterNames",
		success : function(r) {

			setTemplateForChargesSlave(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}
