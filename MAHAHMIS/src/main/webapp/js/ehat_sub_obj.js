/*******************************************************************************
 * @Vikas Godse
 * @date 5_March_2018 this method is used to Add Body Parts
 ******************************************************************************/
function saveBodyPart() {
	
	var bodyPartName = $('#iBodyPartName').val();
	var bodyPartId=$('#bdyPartId').val();
	if(bodyPartName=="" || bodyPartName=="bodyPartName" || bodyPartName==null){
		
		$("#iBodyPartName").focus();					
		return false;
	}
	
	var inputs = [];	
	inputs.push('bodyPartName=' + bodyPartName);
	inputs.push('bodyPartId=' + bodyPartId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/subObj/saveBodyPart",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			$("#iBodyPartName").val("");
			getAllBodyPart();
		}
	});	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 5_March_2018 this method is used to Getting All body Parts
 ******************************************************************************/
function getAllBodyPart() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subObj/viewAllBodyPart",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempBodyParts(r); //Set Template For Body Part - Vikas Godse
			setBodyPartNameList(r);//Setting Body Part Name List For Subjective Objective Template
			/*$('#example').dataTable({
			    processing: true,
			    data: r.lstBodyParts,
			    destroy: true,
			    columns: [
			      { data: "bodyPartId"},
			      { data: "bodyPartName"},
			      {
			    	  defaultContent: "<button id='edit'>Edit</button><button>Delete</button>"
			      }
			    ]
			  });
			var table = $('#example').DataTable(); 
			$('#example tbody').on('click', 'tr', function () {
		        var data = table.row( this ).data();
		        //alert(data.bodyPartId);
		        $('#iBodyPartName').val(data.bodyPartName);
		    	$('#bdyPartId').val(data.bodyPartId);
		    } );*/
		}
	});
}
function setTempBodyParts(r) {
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstBodyParts.length; i++) {
		
		htm = htm
				+ "<tr><td class='' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='' style='height: 21.5px;'>"
				+ r.lstBodyParts[i].bodyPartId
				+ "</td><td class='col-md-8-1 center' id='bdyPartName"
				+ r.lstBodyParts[i].bodyPartId
				+ "' style='height: 21.5px;'>"
				+ r.lstBodyParts[i].bodyPartName
				+ "</td><td class='col-md-2-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editBodyPartMaster' onclick=editBodyPart("
				+ r.lstBodyParts[i].bodyPartId+")><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<button class='btn btn-xs btn-success deleteBodyPart' onclick='deleteBodyPart("
				+ r.lstBodyParts[i].bodyPartId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
		index++;
	}
	$("#TableBodyParts").html(htm);
}
/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method is used for Body Part Autosuggestion Search
 ******************************************************************************/
function setBodyPartMaster(inputId){
    var usertype = "";
    var letter="";
        letter=$("#byName").val();
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async : false,
            type : "POST",
            data : str + "&reqType=AJAX",
            url : "ehat/subObj/autoSuggestionBodyPartNames",
            timeout : 1000 * 60 * 15,
            cache : false,
            success : function(r) {
            	setTempBodyParts(r);
            }
        });
    }
/*******************************************************************************
 * @Vikas Godse
 * @date 5_March_2018 this method is used Edit Selected body Part
 ******************************************************************************/
function editBodyPart(bodyPartId) {
	 
	$('#iBodyPartName').val($('#bdyPartName' + bodyPartId).html());
	$('#bdyPartId').val(bodyPartId);
	$('#byName').val("");
}
/*******************************************************************************
 * @Vikas Godse
 * @date 5_March_2018 this method is used Delete Selected body Part
 ******************************************************************************/
function deleteBodyPart(bodyPartId) {
	var r = confirm("Are You Sure You Want To Delete Body Part?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/deleteBodyPart",
			data : {
				"bpId" : bodyPartId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllBodyPart();
			}
		});
	}
}
//Body Part Name List For subjective objective template
function setBodyPartNameList(r){
	var list="<option value=''>--Select--</option>";
	for ( var i = 0; i < r.lstBodyParts.length; i++) {

		list=list+'<option value="'+(r.lstBodyParts[i].bodyPartId)+'">'+(r.lstBodyParts[i].bodyPartName)+'</option>';
		
	}	
	$("#iBodyPart").html(list);
}
/*******************************************************************************
 * @Vikas Godse
 * @date 6_March_2018 this method is used Add Subjective Objective Template
 ******************************************************************************/
function saveSubjectiveObjectiveTemplates(){
	
	var subObjTemplateName = $('#iSubObjTemplateName').val();
	var bodyPart = $('#iBodyPart').val();
	var speciality = $('#iSpecialtity').val();
	var templateType = $('#iTemplateType').val();
	
	var subObjTempId=$('#subObjTempId').val();
	
	if(subObjTemplateName=="" || subObjTemplateName == undefined || subObjTemplateName==null){
		$("#iSubObjTemplateName").focus();					
		return false;
	}
	else if(bodyPart=="" || bodyPart == undefined || bodyPart==null){
		$("#iBodyPart").focus();					
		return false;
	}
	else if(speciality=="" || speciality == undefined || speciality==null){
		$("#iSpecialtity").focus();					
		return false;
	}
	var inputs = [];	
	inputs.push('templateName=' + subObjTemplateName);
	inputs.push('bodyPart=' + bodyPart);
	inputs.push('speciality=' + speciality);
	inputs.push('oncoEmrTemplateId=' + subObjTempId);
	inputs.push('templateType=' + templateType);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/subObj/saveSubObjTemplate",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			$('#iSubObjTemplateName').val("");
			$('#iBodyPart').val("");
			$('#iSpecialtity').val("");
			$('#iTemplateType').val("");
			fetchAllSubobjTemplate();
		}
	});	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 6_March_2018 this method is Getting All Subjective Objective Template List
 ******************************************************************************/
function fetchAllSubobjTemplate(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllSubobjTemplates",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempSubobjTemplate(r);//Set Template for subjective objective template - Vikas Godse
		}
	});
	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method is Getting All Subjective Objective Template List
 * in Autosuggestion Search
 ******************************************************************************/
function setAutoSuggSubObjTemplate(inputId){
    var usertype = "";
    var letter="";
        letter=$("#byName1").val();
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async : false,
            type : "POST",
            data : str + "&reqType=AJAX",
            url : "ehat/subObj/autoSuggestionSubObjTemp",
            timeout : 1000 * 60 * 15,
            cache : false,
            success : function(r) {
            	setTempSubobjTemplate(r);
            }
        });
    }

function setTempSubobjTemplate(r) {
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstSubObjTemplate.length; i++) {
		
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-sm-1-1 center' id='templateNameId"
				+ r.lstSubObjTemplate[i].oncoEmrTemplateId
				+ "' style='height: 21.5px;'>"
				+ r.lstSubObjTemplate[i].templateName
				+ "</td><td class='col-sm-1-1 center' id='specialityId"
				+ r.lstSubObjTemplate[i].oncoEmrTemplateId
				+ "' style='height: 21.5px;'>"
				+ r.lstSubObjTemplate[i].speciality
				+ "</td><td class='col-sm-1-1 center' id='bdyPartId"
				+ r.lstSubObjTemplate[i].oncoEmrTemplateId
				+ "' style='height: 21.5px;'>"
				+ r.lstBodyPartNames[i].bodyPartName
				+ "</td><td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editSubobjTemplateMaster' onclick=editSubobjTemplate("
				+ r.lstSubObjTemplate[i].oncoEmrTemplateId+",'"+r.lstSubObjTemplate[i].templateName+"','"+r.lstSubObjTemplate[i].bodyPart+"')><i class='fa fa-edit'></i></button></td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteSubobjTemplate' onclick='deleteSubobjTemplate("
				+ r.lstSubObjTemplate[i].oncoEmrTemplateId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
		index++;
	}
	$("#TableSubObjTemplate").html(htm);
}
//used To Edit subjective objective template - Vikas Godse
function editSubobjTemplate(oncoEmrTemplateId,templateName,bodyPartName) {
    
    jQuery.ajax({
        async : true,
        type : "POST",
        url : "ehat/subObj/getAllSubobjTemplates",
        error : function() {
            alert('error');
        },
        success : function(r) {
            
            
            for(var i=0;i<r.lstSubObjTemplate.length;i++){
                
                if(r.lstSubObjTemplate[i].oncoEmrTemplateId == oncoEmrTemplateId){
                    
                    $('#iSubObjTemplateName').val(r.lstSubObjTemplate[i].templateName);
                    $('#subObjTempId').val(r.lstSubObjTemplate[i].oncoEmrTemplateId);
                    $('#iBodyPart').val(r.lstSubObjTemplate[i].bodyPart);
                    $('#iSpecialtity').val(r.lstSubObjTemplate[i].speciality);
                    $('#iTemplateType').val(r.lstSubObjTemplate[i].templateType);
                    
                }
            }
        }
    });
}
function deleteSubobjTemplate(oncoEmrTemplateId) {
	var r = confirm("Are You Sure You Want To Delete Subjective Objective Template?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/deleteSubObjTemplate",
			data : {
				"oncoEmrTemplateId" : oncoEmrTemplateId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				fetchAllSubobjTemplate();
			}
		});
	}
}
/*******************************************************************************
 * @Vikas Godse
 * @date 6_March_2018 this method is Save Chemotherapy
 ******************************************************************************/
function saveChemotherapy(){
	
	 var chemoDate = $("#chemoDate").val();
	    if(chemoDate==""){
	        alert("Please Select Chemo Date!");        
	        return false;
	    }
	    var chemoId = $("#chemoId").val();
	    var chemotherapyName = $("#iChemotherapyName").val();
	    var indication = $("#iIndication").val();
	    var weight = $("#iWeight").val();
	    var height = $("#iHeight").val();
	    var bsa = $("#iBSA").val();
	    var bloodOrders = $("#iBloodOrders").val();
	    var allergies = $("#iAllergies").val();
	    var history = $("#iHistory").val();
	    var frequency = $("#iFrequency").val();
	    var numberOfCycles = $("#iNumberOfCycles").val();
	    var dose = $("#iDose").val();
	    var investigation = $("#iInvestigation").val();
	    var drugOrder = $("#iDrugOrder").val();
	    var postMedications = $("#iPostMedications").val();
	    var postChemoAdvice = $("#iPostChemoAdvice").val();
	    
	    if(chemotherapyName == "" || chemotherapyName == undefined){
	        alert("Please Insert Chemotherapy Name!");
	        return false;
	    }
	    
	    var chemoTheropyDetails = {
	    		lstChemoTheropy : []
	        };
	
	    chemoTheropyDetails.lstChemoTheropy.push({
	    	chemotheropyId:chemoId,
	    	chemoTheropyName : chemotherapyName,
	    	indication : indication,
	    	weight : weight,
	    	height : height,
	    	bsa : bsa,
	    	bloodOrders : bloodOrders,
	    	allergies : allergies,
	    	history : history,
	    	frequency : frequency,
	    	noOfCycle : numberOfCycles,
	    	dose:dose,
	    	investigation:investigation,
	    	drugOrders:drugOrder,
	    	postMedication:postMedications,
	    	advice:postChemoAdvice,
	    	
	    });
	    chemoTheropyDetails = JSON.stringify(chemoTheropyDetails);
	    
	    var inputs = [];
		inputs.push('chemoTheropyDetails=' + chemoTheropyDetails);
		var str = inputs.join('&');
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/saveChemotheropy",
			data	: str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r == 1){
					alertify.success("Records Saved Sucessfully");
					$("#iChemotherapyName").val("");
					$("#iIndication").val("");
					$("#iWeight").val("");
					$("#iHeight").val("");
					$("#iBSA").val("");
					$("#iBloodOrders").val("");
					$("#iAllergies").val("");
					$("#iHistory").val("");
					$("#iFrequency").val("");
					$("#iNumberOfCycles").val("");
					$("#iDose").val("");
					$("#iInvestigation").val("");
					$("#iDrugOrder").val("");
					$("#iPostMedications").val("");
					$("#iPostChemoAdvice").val("");
					
				}else{
					alertify.success("Records Updated Sucessfully");
					$("#iChemotherapyName").val("");
					$("#iIndication").val("");
					$("#iWeight").val("");
					$("#iHeight").val("");
					$("#iBSA").val("");
					$("#iBloodOrders").val("");
					$("#iAllergies").val("");
					$("#iHistory").val("");
					$("#iFrequency").val("");
					$("#iNumberOfCycles").val("");
					$("#iDose").val("");
					$("#iInvestigation").val("");
					$("#iDrugOrder").val("");
					$("#iPostMedications").val("");
					$("#iPostChemoAdvice").val("");
				}
				fetchAllChemotherapyProtocol();
			}
		});	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 6_March_2018 this method is used to get All Chemotherapy Protocol
 ******************************************************************************/
function fetchAllChemotherapyProtocol(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllChemotherapyProtocol",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setChemotherapyTemp(r);//Setting template for Chemotherapy- Vikas Godse
		}
	});
	
}
function setChemotherapyTemp(r) {
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstChemoTheropy.length; i++) {
		
		htm = htm
				+ "<tr><td class='center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='center' id='chemo_id"
				+ r.lstChemoTheropy[i].chemotheropyId
				+ "' style='height: 21.5px;'>"
				+ r.lstChemoTheropy[i].chemoTheropyName
				+ "</td><td class='center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editChemotherapyMaster' onclick=editChemotherapy("
				+ r.lstChemoTheropy[i].chemotheropyId+")><i class='fa fa-edit'></i></button></td>"
				+ "<td class='center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChemotherapyMaster' onclick='deleteChemotherapy("
				+ r.lstChemoTheropy[i].chemotheropyId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
		index++;
	}
	$("#TableChemotherapy").html(htm);
}
/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method is used for Chemotherapy Autosuggestion Search
 ******************************************************************************/
function setChemoMaster(inputId){
    var usertype = "";
    var letter="";
        letter=$("#byName").val();
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async : false,
            type : "POST",
            data : str + "&reqType=AJAX",
            url : "ehat/subObj/autoSuggestionChemo",
            timeout : 1000 * 60 * 15,
            cache : false,
            success : function(r) {
            	setChemotherapyTemp(r);
            }
        });
    }
/*******************************************************************************
 * @Vikas Godse
 * @date 6_March_2018 this method is used to Edit Chemotherapy
 ******************************************************************************/
function editChemotherapy(chemotheropyId){

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllChemotherapyProtocol",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			for ( var i = 0; i < r.lstChemoTheropy.length; i++){
				
				if(r.lstChemoTheropy[i].chemotheropyId == chemotheropyId){
					
					$("#chemoId").val(r.lstChemoTheropy[i].chemotheropyId);
					$("#iChemotherapyName").val(r.lstChemoTheropy[i].chemoTheropyName);
					$("#iIndication").val(r.lstChemoTheropy[i].indication);
					$("#iWeight").val(r.lstChemoTheropy[i].weight);
					$("#iHeight").val(r.lstChemoTheropy[i].height);
					$("#iBSA").val(r.lstChemoTheropy[i].bsa);
					$("#iBloodOrders").val(r.lstChemoTheropy[i].bloodOrders);
					$("#iAllergies").val(r.lstChemoTheropy[i].allergies);
					$("#iHistory").val(r.lstChemoTheropy[i].history);
					$("#iFrequency").val(r.lstChemoTheropy[i].frequency);
					$("#iNumberOfCycles").val(r.lstChemoTheropy[i].noOfCycle);
					$("#iDose").val(r.lstChemoTheropy[i].dose);
					$("#iInvestigation").val(r.lstChemoTheropy[i].investigation);
					$("#iDrugOrder").val(r.lstChemoTheropy[i].drugOrders);
					$("#iPostMedications").val(r.lstChemoTheropy[i].postMedication);
					$("#iPostChemoAdvice").val(r.lstChemoTheropy[i].advice);
					
				}
			}
			$("#byName").val("");
		}
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 7_March_2018 this method is used to delete Chemotherapy
 ******************************************************************************/
function deleteChemotherapy(chemotheropyId){
	var r = confirm("Are You Sure You Want To Delete Chemotherapy Protocol?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/deleteChemotherapy",
			data : {
				"chemoId" : chemotheropyId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				fetchAllChemotherapyProtocol();
			}
		});
	}
}
/*******************************************************************************
 * @Vikas Godse
 * @date 7_March_2018 this method is used to show Question Master Div
 ******************************************************************************/
var dynaCount = 1;
function showQueTypeDiv() {
	var type = $("#txtQueType").val();
	if (type == "text") {
		$("#idRadio").hide();
		$("#idCheckbox").hide();
		$("#idText").show();
		$("#idText").html(defaultTextTemp);
		$("#dynaCountt").val(0);
	} else if(type == "radio") {
		$("#idText").hide();
		$("#idCheckbox").hide();
		$("#dynaCountt").val(1);
		$("#idRadio").show();
		$("#idRadio").html(defaultRadioTemp);
	} else if(type == "checkbox") {
		$("#idText").hide();
		$("#idRadio").hide();
		$("#dynaCountt").val(1);
		$("#idCheckbox").show();
		$("#idCheckbox").html(defaultCheckboxTemp);
	} else{
		$("#idText").hide();
		$("#idRadio").hide();
		$("#idCheckbox").hide();
		$("#dynaCountt").val(0);
	}
}
var defaultTextTemp ='<label class="TextFont">Text:</label>'
	+'<input type="text" class="form-control input-SmallText" name="txtText" id="txtText" value="-"/>';

var defaultRadioTemp = '<div id="idRadioDiv">'
	+ ' <label class="TextFont">Radio Lable:</label>'
	+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" id="txtRadio'
	+ dynaCount
	+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
	+ '<a onClick=addQueAnsField("radio")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="0"/></label></div>';

var defaultCheckboxTemp ='<div id="idChkDiv">'
	+ '<label class="TextFont">Checkbox Lable:</label>' 
	+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" id="txtCheckbox'
	+ dynaCount
	+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
	+ '<a onClick=addQueAnsField("checkbox")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="0"/></label></div>';

function addQueAnsField(type){
	
	var questionCount = $("#dynaCountt").val();
	questionCount++ ;
	if(type == "radio"){
		
		var templater = $("#idRadio").html();
		
		var defaultRadioDynaTemp = '<div id="idRadioDiv">'
			+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" id="txtRadio'
			+ questionCount
			+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ questionCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ questionCount +'">'
			+ '<a onClick=delQueAnsField("radio")><i class="fa fa-minus"></i><a/><input type="text" hidden="hidden" id="hiddenId'+ questionCount +'" value="0"/></label></div>';
		templater = templater + defaultRadioDynaTemp;
		$("#idRadio").html(templater);
		$("#dynaCountt").val(questionCount);
	}
	if(type == "checkbox"){
		
		var templater = $("#idCheckbox").html();
		
		var defaultCheckboxDynaTemp ='<div id="idChkDiv">'
			+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" id="txtCheckbox'
			+ questionCount
			+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ questionCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ questionCount +'">'
			+ '<a onClick=delQueAnsField("checkbox")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ questionCount +'" value="0"/></label></div>';
		templater = templater + defaultCheckboxDynaTemp;
		$("#idCheckbox").html(templater);
		$("#dynaCountt").val(questionCount);
	}
}
function delQueAnsField(type){
	if(type == "radio"){
		dynaCountt = $("#dynaCountt").val();
		$("#txtRadio" + dynaCountt).remove();
		$("#dynaCount" + dynaCountt).remove();
		var dcnt = dynaCountt;
		dcnt--;
		$("#dynaCountt").val(dcnt);
	}
	else if(type == "checkbox"){
		dynaCountt = $("#dynaCountt").val();
		$("#txtCheckbox" + dynaCountt).remove();
		$("#dynaCount" + dynaCountt).remove();
		var dcnt = dynaCountt;
		dcnt--;
		$("#dynaCountt").val(dcnt);
	}
}
/*******************************************************************************
 * @Vikas Godse
 * @date 7_March_2018 this method is used Add Question Master-Slave Details
 ******************************************************************************/
function InsertEmrQue(){
	
	dynaCountt = $("#dynaCountt").val();
	var txtQueID =$("#txtQueID").val();
	var txtQue = $("#txtQue").val();
	var querytype = $("#querytype").val();
	var txtQueType = $("#txtQueType").val();
	var templateType = $("#iTemplateType").val();
	
	if(templateType == "" || templateType == undefined ){
		alert("Please Select Template Type ");
		return false;
	}
	
	
	if(txtQue == "" || txtQue == undefined ){
		alert("Please Enter Question ");
		return false;
	}
	if(txtQueType == "" || txtQueType == undefined ){
		alert("Please Select Question Type");
		return false;
	}
	var objQuestion = 0;
	objQuestion = {
			lstOption : []
	};

	if(txtQueType == "radio"){
		var count = 0;
		for ( var i = 1; i <= dynaCountt; i++) {
			count++;
			var txtRadio = $.trim($("#txtRadio" + count + "").val());
			var hiddenId = $("#hiddenId" + count + "").val();
				if (txtRadio == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtRadio" + count + "").focus());
					return false;
				}
			if (txtRadio != undefined) {
				objQuestion.lstOption.push({
					"optionName" : txtRadio,
					"qsnOptionId" : hiddenId
				});
			}
		}
			if (objQuestion.lstOption.length == 0) {
				alert("You Can Not Save Empty Field");
				return false;
		}
		objQuestion = JSON.stringify(objQuestion);
		
	}else if(txtQueType == "checkbox"){
		var count = 0;
		for ( var i = 1; i <= dynaCountt; i++) {
			count++;
			var txtCheckbox = $.trim($("#txtCheckbox" + count + "").val());
			
			var hiddenId = $("#hiddenId" + count + "").val();
			if (queryType == "insert") {
				if (txtCheckbox == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtCheckbox" + count + "").focus());
					return false;
				}
			}
			if (txtCheckbox != undefined) {
				objQuestion.lstOption.push({
					"optionName" : txtCheckbox,
					"qsnOptionId" : hiddenId
				});
			}
		}
			if (objQuestion.lstOption.length == 0) {
				alert("You Can Not Save Empty Field");
				return false;
		}
		objQuestion = JSON.stringify(objQuestion);
		
	}else {
			var textName = $.trim($("#txtText").val());
			var hiddenId = $("#hiddenId").val();
			if (queryType == "insert") {
				if (textName == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtText").focus());
					return false;
				}
			}
			if (textName != undefined) {
				objQuestion.lstOption.push({
					"optionName" : textName,
					"qsnOptionId" : hiddenId
				});
			}
		
		if (objQuestion.lstOption.length == 0) {
			alert("You Can Not Save Empty Field");
			return false;
		}
		objQuestion = JSON.stringify(objQuestion);
	}
			var inputs = [];
			inputs.push('txtQueID=' + txtQueID);
			inputs.push('txtQue=' + txtQue);
			inputs.push('txtQueType=' + txtQueType);
			inputs.push('querytype=' + querytype);
			inputs.push('objQuestion=' + objQuestion);
			inputs.push('templateType=' + templateType);
			var str = inputs.join('&');

			jQuery.ajax({
				type : "POST",
				url : "ehat/subObj/saveQuetionDetails",
				data	: str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					if(r != 0){
						alert("Records Saved Sucessfully");
						getQuestionMasterDetails();
						refreshOncoEmrQue();
						location.reload();
					}
					
				}
			});
			
}
/*******************************************************************************
 * @Vikas Godse
 * @date 7_March_2018 this method is used to Getting All Question Slave Details
 * {Not in Use till Now}
 ******************************************************************************/
function getQuestionOptions() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getQuestionSlaveDetails",
		error : function() {
			alert('error');
		},
		success : function(r) {
		}
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 7_March_2018 this method is used to Getting All Question Master Details
 ******************************************************************************/
function getQuestionMasterDetails() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getQuestionMasterDetails",
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(JSON.stringify(r));
			setQuestionMasterTemp(r);//Set Template for Question Master Details- Vikas Godse
		}
	});
}

function setQuestionMasterTemp(r) {
	var htm="";
	var index = 1;
	for ( var i = 0; i < r.lstQuestion.length; i++) {
		
		htm = htm
				+ "<tr><td class='col-md-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-md-4-1 center' id='dName"
				+ r.lstQuestion[i].questionId
				+ "' style='height: 21.5px;'>"
				+ r.lstQuestion[i].question
				+ "</td><td class='col-md-4-1 center' id='dCode"
				+ r.lstQuestion[i].questionId
				+ "' style='height: 21.5px;'>"
				+ r.lstQuestion[i].questionType
				+ "</td><td class='col-md-2-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editEMRQsn' onclick=\"editEMRQueList("
				+ r.lstQuestion[i].questionId+",'"+r.lstQuestion[i].questionType+"','"+r.lstQuestion[i].question+"','"+r.lstQuestion[i].templateType+"')\"><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<button class='btn btn-xs btn-success deleteQsnMaster' onclick='deleteQsnMaster("
				+ r.lstQuestion[i].questionId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		index++;
	}
	$("#tableQsnMaster").html(htm);
}
/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method is used for QsnMaster Autosuggestion Search
 ******************************************************************************/
function setAutoSuggQsnMaster(inputId){
    var usertype = "";
    var letter="";
        letter=$("#searchByName").val();
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async : false,
            type : "POST",
            data : str + "&reqType=AJAX",
            url : "ehat/subObj/autoSuggQsnMaster",
            timeout : 1000 * 60 * 15,
            cache : false,
            success : function(r) {
            	setQuestionMasterTemp(r);
            }
        });
    }

/*******************************************************************************
 * @Vikas Godse
 * @date 7_March_2018 this method is used to Getting All Question Master-Slave Details
 ******************************************************************************/
function getAllQuestionDetails(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllQuestionDetails",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#qsnMasterDetails").val(JSON.stringify(r));
		}
	});
	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 7_March_2018 this method is used to Edit All Question Master-Slave Details
 ******************************************************************************/
var updateEMRQueHeaderTemp = '<h3>Edit Onco EMR Question</h3>';
function editEMRQueList(QueID,questionType,question,templateType){
	
	
	$("#idRadio").html("");
	$("#idCheckbox").html("");
	$("#idText").html("");
	var dynaCount = 0;
	var dynaCount1 = 0;
	var ajaxResponse = $("#qsnMasterDetails").val();
	var response = eval('(' + ajaxResponse + ')');
	if(questionType == "radio"){
		
		var j=0;
		for ( var i = 0; i < response.lstOption.length; i++) {
			
		
		if (response.lstOption[i].questionMasterId == QueID) {
			
			var templater = $("#idRadio").html();
			
			var defaultRadioDynaTemp1 = "";
			if(j == 0){
				j++;
			dynaCount++ ;
			defaultRadioDynaTemp1 = '<div id="idRadioDiv">'
				+ ' <label class="TextFont">Radio Lable:</label>'
				+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" value="'+response.lstOption[i].optionName+'" id="txtRadio'
				+ dynaCount
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
				+ '<a onClick=addQueAnsField("radio")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+response.lstOption[i].qsnOptionId+'"></label></div>';
			}
			else if(j > 0){
				dynaCount++ ;
				defaultRadioDynaTemp1 = defaultRadioDynaTemp1 + '<div id="idRadioDiv">'
				+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" value="'+response.lstOption[i].optionName+'" id="txtRadio'
				+ dynaCount
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
				+ '<a onClick=delQueAnsField("radio")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+response.lstOption[i].qsnOptionId+'"></label></div>';
			}
			templater = templater + defaultRadioDynaTemp1;
			$("#idRadio").html(templater);
			$("#dynaCountt").val(dynaCount);
		}
	}
}
	else if(questionType == "checkbox"){
		var j=0;
		for ( var i = 0; i < response.lstOption.length; i++) {
			
			if (response.lstOption[i].questionMasterId == QueID) {
				
				var templater = $("#idCheckbox").html();
			
				var defaultCheckboxDynaTemp1 = "";
				if(j == 0){
					j++;
				dynaCount1++ ;
				defaultCheckboxDynaTemp1 = '<div id="idChkDiv">'
				+ '<label class="TextFont">Checkbox Lable:</label>' 
				+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" value="'+response.lstOption[i].optionName+'" id="txtCheckbox'
				+ dynaCount1
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount1 +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount1 +'">'
				+ '<a onClick=addQueAnsField("checkbox")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount1 +'" value="'+response.lstOption[i].qsnOptionId+'"></label></div>';
				}
				else if(j > 0){
				
				dynaCount1++ ;
				defaultCheckboxDynaTemp1 ='<div id="idChkDiv">'
				+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" value="'+response.lstOption[i].optionName+'" id="txtCheckbox'
				+ dynaCount1
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount1 +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount1 +'">'
				+ '<a onClick=delQueAnsField("checkbox")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount1 +'" value="'+response.lstOption[i].qsnOptionId+'"></label></div>';
				}
				templater = templater + defaultCheckboxDynaTemp1;
				$("#idCheckbox").html(templater);
				$("#dynaCountt").val(dynaCount1);
			}
		}
	}else{
		var templater = $("#idText").html();
		var dynaCount = 0;
		for ( var i = 0; i < response.lstOption.length; i++) {
			if (response.lstOption[i].questionMasterId == QueID) {
			
			var defaultTextDynaTemp1 = "";
			dynaCount++ ;
			defaultTextDynaTemp1 = '<div id="idTxtDiv">'
			+ '<label class="TextFont">Text:</label>' 
			+ '<input type="text" class="form-control input-SmallText" name="txtText" value="'+response.lstOption[i].optionName+'" id="txtText">'
			+ '<label class="btn" class="form-control input-SmallText" id="dynaCount" value="'+ dynaCount +'">'
			+ '<input type="text" hidden="hidden" id="hiddenId" value="'+response.lstOption[i].qsnOptionId+'"></label></div>';
			templater = templater + defaultTextDynaTemp1;
			$("#idText").html(templater);
			$("#dynaCountt").val(dynaCount);
			}
		}
	}
	var sample1;
	$("#headerTag").setTemplate(updateEMRQueHeaderTemp);
	$("#headerTag").processTemplate(sample1);
	$("#txtQue").val(question);
	$("#txtQueType").val(questionType);
	$("#txtQueID").val(QueID);
	$("#iTemplateType").val(templateType);
	$("#querytype").val("update");
	//setQuestionMasterTemp(response);
	$("#searchByName").val("");
}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used to Delete Question
 ******************************************************************************/
function deleteQsnMaster(questionId){
	var r = confirm("Are You Sure You Want To Delete Question?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/deleteQustion",
			data : {
				"questionId" : questionId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				//fetchAllChemotherapyProtocol();
			}
		});
	}
}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used to Save Complaints
 ******************************************************************************/
function saveComplaints(){
	
	var complaintId = $("#complaintId").val();
	var complaint = $("#iComplaintName").val();
	
	if(complaint == "" || complaint == undefined){
		alert("Please Insert Complaint Name!");
		return false;
	}
	
	var inputs = [];	
	inputs.push('complaintName=' + complaint);
	inputs.push('complaintId=' + complaintId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/subObj/saveComplaints",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			$("#iComplaintName").val("");
			getAllComplaints();
		}
	});	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used to Fetching All Complaints
 ******************************************************************************/
function getAllComplaints() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllComplaints",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempForComplaints(r); //Set Template For Complaints - Vikas Godse
		}
	});
}
function setTempForComplaints(r) {
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstComplaints.length; i++) {
		
		htm = htm
				+ "<tr><td class='' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-md-8-1 center' id='bdyPartName"
				+ r.lstComplaints[i].complaintId
				+ "' style='height: 21.5px;'>"
				+ r.lstComplaints[i].complaintName
				+ "</td><td class='col-md-2-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editComplaintsMaster' onclick=editComplaints("
				+ r.lstComplaints[i].complaintId+")><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<button class='btn btn-xs btn-success deleteComplaintMaster' onclick='deleteComplaints("
				+ r.lstComplaints[i].complaintId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
		index++;
	}
	$("#tableComplaints").html(htm);
}
/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method is for Complaint Master Autosuggestion Search
 ******************************************************************************/
function setAutoSuggComplaintMaster(inputId){
	var usertype = "";
	var letter="";
		letter=$("#byName").val();
    var findingName = $("#" + inputId).val();
    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    var str = inputs.join('&');
    jQuery.ajax({
        async : false,
        type : "POST",
        data : str + "&reqType=AJAX",
        url : "ehat/subObj/autoSuggComplaints",
        timeout : 1000 * 60 * 15,
        cache : false,
        success : function(r) {
        	setTempForComplaints(r)
        }
    });

}

/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used to Edit Selected Complaint
 ******************************************************************************/
function editComplaints(complaintId) {
	 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllComplaints",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			for(var i=0; i<r.lstComplaints.length; i++){
				
				if(r.lstComplaints[i].complaintId == complaintId){
				
				$("#title").html("Edit Complaint:");
				$("#iComplaintName").val(r.lstComplaints[i].complaintName);
				$("#complaintId").val(r.lstComplaints[i].complaintId);
				}
			}
		}
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used to Delete Selected Complaint
 ******************************************************************************/
function deleteComplaints(complaintId){
	var r = confirm("Are You Sure You Want To Delete Complaint?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/deleteComplaint",
			data : {
				"complaintId" : complaintId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
			}
		});
	}
	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used to Save Findings
 ******************************************************************************/
function saveFindings(){
	
	var findingId = $("#findingId").val();
	var finding = $("#iFindingName").val();
	
	if(finding == "" || finding == undefined){
		alert("Please Insert Finding Name!");
		return false;
	}
	var inputs = [];	
	inputs.push('findingName=' + finding);
	inputs.push('findingId=' + findingId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/subObj/saveFindings",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			$("#iFindingName").val("");
			getAllFindings();
		}
	});	
	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used Fetching All Findings
 ******************************************************************************/
function getAllFindings() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllFindings",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempForFindings(r); //Set Template For Findings - Vikas Godse
		}
	});
}
function setTempForFindings(r) {
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstFindings.length; i++) {
		
		htm = htm
				+ "<tr><td class='col-md-1-1 left' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-md-8-1 center' id='bdyPartName"
				+ r.lstFindings[i].findingId
				+ "' style='height: 21.5px;'>"
				+ r.lstFindings[i].findingName
				+ "</td><td class='col-md-2-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editFindingMaster' onclick=editFindings("
				+ r.lstFindings[i].findingId+")><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<button class='btn btn-xs btn-success deleteFindingMaster' onclick='deleteFinding("
				+ r.lstFindings[i].findingId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
		index++;
	}
	$("#tableFindings").html(htm);
}

/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method for Findings Autosuggetion Search
 ******************************************************************************/

function setAutoSuggFindingMaster(inputId){
	var usertype = "";
	var letter="";
		letter=$("#byName").val();
    var findingName = $("#" + inputId).val();
    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    var str = inputs.join('&');
    jQuery.ajax({
        async : false,
        type : "POST",
        data : str + "&reqType=AJAX",
        url : "ehat/subObj/autoSuggFindings",
        timeout : 1000 * 60 * 15,
        cache : false,
        success : function(r) {
        	setTempForFindings(r);
        }
    });

}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used Edit Selected Finding
 ******************************************************************************/
function editFindings(findingId) {
	 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllFindings",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			for(var i=0; i<r.lstFindings.length; i++){
				if(r.lstFindings[i].findingId == findingId){
				$("#title").html("Edit Finding:");
				$("#iFindingName").val(r.lstFindings[i].findingName);
				$("#findingId").val(r.lstFindings[i].findingId);
				}
			}
		}
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 8_March_2018 this method is used Delete Selected Finding
 ******************************************************************************/
function deleteFinding(findingId){
	var r = confirm("Are You Sure You Want To Delete Finding?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/deleteFinding",
			data : {
				"findingId" : findingId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllFindings();
			}
		});
	}
}

/*******************************************************************************
 * @Vikas Godse
 * @date 13_March_2018 this method is used Saving sub obj temp type
 ******************************************************************************/

function saveSubjectiveObjectiveTempType(){
	
	var subObjTempTypeId = $("#subObjTempTypeId").val();
	var subObjTempTypeName = $("#iSubObjTempTypeName").val();
	
	if(subObjTempTypeName == "" || subObjTempTypeName == undefined){
		alert("Please Insert Template Type Name!");
		return false;
	}
	var inputs = [];
	inputs.push('subObjTempTypeId='+ subObjTempTypeId);
	inputs.push('subObjTempType='+ subObjTempTypeName);
	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/subObj/saveSubObjTempType",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			$("#iSubObjTempTypeName").val("");
			getAllSubObjTempType();
		}
	});	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 13_March_2018 this method is used For Fetching sub obj temp type
 ******************************************************************************/
function getAllSubObjTempType(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllSubObjTempType",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempSubObjTempType(r);//set sub obj temp type- Vikas Godse
			setTempTypeList(r);//getting template type list 
		}
	});
}
function setTempSubObjTempType(r) {
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstSubObjTempType.length; i++) {
		
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstSubObjTempType[i].subObjTempTypeId
				+ "</td><td class='col-md-8-1 center' id='bdyPartName"
				+ r.lstSubObjTempType[i].subObjTempTypeId
				+ "' style='height: 21.5px;'>"
				+ r.lstSubObjTempType[i].subObjTempType
				+ "</td><td class='col-md-2-1 left'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editSubObjTempMaster' onclick=editSubObjTempType("
				+ r.lstSubObjTempType[i].subObjTempTypeId+")><i class='fa fa-edit'></i></button></td>"
				+ "<td class='col-md-2-1 left' style='height: 21.5px;'><button class='btn btn-xs btn-success editSubObjTempMaster' onclick='deleteSubObjTempType("
				+ r.lstSubObjTempType[i].subObjTempTypeId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
		index++;
	}
	$("#tableSubObjTempType").html(htm);
}
/*******************************************************************************
 * @Vikas Godse
 * @date 27_March_2018 this method is used for SubObjTempType Autosuggestion Search
 ******************************************************************************/
function setAutoSuggSubObjTempType(inputId){
	var usertype = "";
	var letter="";
		letter=$("#byName").val();
    var findingName = $("#" + inputId).val();
    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    var str = inputs.join('&');
    jQuery.ajax({
        async : false,
        type : "POST",
        data : str + "&reqType=AJAX",
        url : "ehat/subObj/autoSuggSubObjTempType",
        timeout : 1000 * 60 * 15,
        cache : false,
        success : function(r) {
        	setTempSubObjTempType(r);
        }
    });

}
/*******************************************************************************
 * @Vikas Godse
 * @date 13_March_2018 this method is used For Edit sub obj temp type
 ******************************************************************************/

function editSubObjTempType(subObjTempTypeId){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subObj/getAllSubObjTempType",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			for(var i=0; i<r.lstSubObjTempType.length ;i++){
				
				if(r.lstSubObjTempType[i].subObjTempTypeId == subObjTempTypeId){
					
					$("#iSubObjTempTypeName").val(r.lstSubObjTempType[i].subObjTempType);
					$("#subObjTempTypeId").val(r.lstSubObjTempType[i].subObjTempTypeId);
					
				}
			}
			$("#byName").val("");
		}
	});
}

/*******************************************************************************
 * @Vikas Godse
 * @date 13_March_2018 this method is used For Delete sub obj temp type
 ******************************************************************************/
function deleteSubObjTempType(subObjTempTypeId){
	var r = confirm("Are You Sure You Want To Delete Template Type?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subObj/deleteTemplateType",
			data : {
				"tempTypeId" : subObjTempTypeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllSubObjTempType();
			}
		});
	}
}
function setTempTypeList(r){
	var list="<option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstSubObjTempType.length; i++) {

		list=list+'<option value="'+(r.lstSubObjTempType[i].subObjTempTypeId)+'">'+(r.lstSubObjTempType[i].subObjTempType)+'</option>';
		
	}	
	$("#iTemplateType").html(list);
}

function refreshOncoEmrQue(){
	$("#txtQueID").val("");
	$("#txtQue").val("");
	$("#querytype").val("select");
	$("#txtQueType").val("select");
	$("#iTemplateType").val("0");
}