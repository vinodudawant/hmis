/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	:  toggleEntryDiv
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntry").show('slow');
	} else {

		$("#divForEntry").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Save Radiation master
 ************/
function saveRadiationMaster(){
	var radiationName = $("#radiationName").val();
	var mould = $("#mould").val();
	var ct = $("#ct").val();
	var planning = $("#planning").val();
	var qa = $("#qa").val();
	var imaging = $("#imaging").val();
	var total = $("#total").val();
	var treatAmount = $("#treatAmount").val();
	var finalAmount = $("#finalAmount").val();
	var radiationId= $("#radiationId").val();
	if(radiationId == null || radiationId == undefined || radiationId == "")
		{
		radiationId=0;
		}
	
	
	
	if(radiationName=="" || radiationName==undefined || radiationName==null || radiationName=="null"  ){
		alert("please enter radiation technique name");		
		$("#radiationName").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('radiationName=' + radiationName);
	inputs.push('mould=' + mould);
	inputs.push('ct=' + ct);
	inputs.push('planning='+ planning);
	inputs.push('qa=' + qa);
	inputs.push('imaging=' + imaging);
	inputs.push('total=' + total);
	inputs.push('treatAmount=' + treatAmount);
	inputs.push('finalAmount=' + finalAmount);
	inputs.push('radiationId=' + radiationId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/radiation_master/saveRadiationMaster",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("radiation name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllRadiationMaster();
			refreshRadiationMaster();
		},		
	})
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Refresh Radiation master
 ************/
function refreshRadiationMaster(){
	$('#radiationName').val('');
	$('#mould').val('');
	$('#ct').val('');
	$('#planning').val('');
	$('#qa').val('');
	$('#imaging').val('');
	$('#total').val('');
	$('#treatAmount').val('');
	$('#finalAmount').val('');
	$('#radiationId').val(0);
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: List Of Radiation master
 ************/
function getAllRadiationMaster(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/radiation_master/getAllRadiationMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllRadiationMaster(r,"All");			
		}
	});
}

function setAllRadiationMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstradiationMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstradiationMaster[i].radiationId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstradiationMaster[i].radiationName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editRadiationMaster('+r.lstradiationMaster[i].radiationId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteRadiationMaster('+r.lstradiationMaster[i].radiationId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.radiationId+'</td>'
			+ ' <td class="col-md-1 center">'+r.radiationName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editRadiationMaster('+r.radiationId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteRadiationMaster('+r.radiationId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#radiationDetails").html(htm);
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Edit Of Radiation master
 ************/
function editRadiationMaster(radiationId){		
	var inputs = [];
	inputs.push('radiationId=' + radiationId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/radiation_master/editRadiationMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#radiationName').val(r.radiationName);
			$('#mould').val(r.mould);
			$('#ct').val(r.ct);
			$('#planning').val(r.planning);
			$('#qa').val(r.qa);
			$('#imaging').val(r.imaging);
			$('#total').val(r.total);
			$('#treatAmount').val(r.treatAmount);
			$('#finalAmount').val(r.finalAmount);
			$('#radiationId').val(r.radiationId);
		}
	});
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Delete Of Radiation master
 ************/
function deleteRadiationMaster(radiationId) {
	var r = confirm("Are You Sure You Want To Delete Complaint Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/radiation_master/deleteRadiationMaster",
			data : {
				"radiationId" : radiationId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshRadiationMaster();
				getAllRadiationMaster();
			}
		});
	}
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	:  Auto suggestion search Detail
 ************/
function centerRadiationutoSuggestion(inputID) {
	var resultData = [];
	var radiationName = $("#" + inputID).val();

	if (radiationName == "" || radiationName == null || radiationName == "null"	|| radiationName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllRadiationMaster();
		return false;
	}

	var inputs = [];
	inputs.push('radiationName=' + radiationName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation_master/centerRadiationutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstradiationMaster.length; j++) {
				var arrValue = response.lstradiationMaster[j].radiationId +"-"+response.lstradiationMaster[j].radiationName;
				var idValue = response.lstradiationMaster[j].radiationId;
				var organName = response.lstradiationMaster[j].radiationName;
				resultData.push({
					ID : idValue,
					Name : radiationName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

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
		var radiationId = res[0];
		var radiationName = res[1];		
		getRadiationMasterByradiationId(radiationId);
		$("input#" + inputID).val(radiationName);
	}
}

/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	:  get getRadiationMasterByradiationId Detail
 ************/
function getRadiationMasterByradiationId(radiationId){
	var inputs = [];
	inputs.push('radiationId=' + radiationId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/radiation_master/editRadiationMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllRadiationMaster(r,"search");
			
		}
		
	});
}
/************
* @author	: Akshata Desai
* @date		: 11-feb-2020
* @codeFor	:  get centerRadiationMasterSearchById details 
 ************/
function centerRadiationMasterSearchById(){
	var radiationId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(radiationId)) {
		alert("Please Enter Number Only!");
		$("#radiationId").focus();
		return false;
	}
	getRadiationMasterByradiationId(radiationId);	
}
/************
* @author	: Akshata Desai
* @date		: 12-feb-2020
* @codeFor	:  Get Radiation Id details 
 ************/
function getNextRadiationId(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/radiation_master/getNextRadiationMasterID",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#radiation').val(r);
			getAllRadiationMaster();
			refreshRadiationMaster();
		}
	});
}
/************
* @author	: Akshata Desai
* @date		: 12-feb-2020
* @codeFor	:  Get Total Amount of Radiation Charges 
 ************/
function getTotalRadiationCharges() {

	var mould = $("#mould").val();
	var mi = parseFloat(mould);

	var ct = $("#ct").val();
	var c = parseFloat(ct);

	var planning = $("#planning").val();
	var p = parseFloat(planning);

	var qa = $("#qa").val();
	var q = parseFloat(qa);

	var imaging = $("#imaging").val();
	var i = parseFloat(imaging);

	var treatAmount = $("#treatAmount").val();
	var tr = parseFloat(treatAmount);

	if (mould == "") {
		$("#mould").val(0);
	}
	if (ct == "") {
		$("#ct").val(0);
	}
	if (planning == "") {
		$("#planning").val(0);
	}
	if (imaging == "") {
		$("#imaging").val(0);
	}
	if (qa == "") {
		$("#qa").val(0);
	}
	if (treatAmount == "") {
		$("#treatAmount").val(0);
	}

	if (mould != "" && ct != "" && planning != "" && qa != "" && imaging != ""
		&& treatAmount !="") {
		var total = mi + c + p + q + i;
		$("#total").val(total);
		var final = mi + c + p + q + i + tr;

		$("#finalAmount").val(final);
	}
}
