/*******************************************************************************
 * @Code for Save Process Master
 * @code By Badrinath Wagh
 ******************************************************************************/
function saveProcessingRecordsCsd(){
	var processId = $('#processId').val();
	var processCode = $('#processCode').val();
	var discription = $("#discription").val();
	var processName = $("#processName").val();
	var seqNo = $("#seqNo").val();

	if (processName == "" || processName == "undefined" || processName == null) {
		alert("enter Process Name");
		return false;
	}

	if (processId == "" || processId == null || processId == undefined) {
		processId = 0;
	}
	var inputs = [];
	inputs.push('processName=' + processName);
	inputs.push('processId=' + processId);
	inputs.push('processCode=' + processCode);
	inputs.push('discription=' + discription);
	inputs.push('seqNo=' + seqNo);

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/laundrylinon/saveProcessingrecordsCsd",
		data : str + "&reqType=AJAX",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			refreshProcessMasterCsd();
		}
	});
}

function refreshProcessMasterCsd()
{
	 $('#processId').val(0);
	 $('#processCode').val("");
	 $( "#discription").val("");
	 $( "#processName").val("");
	 $("#seqNo").val("");
	 getProseccmasterRecordsCsd();
}

/*******************************************************************************
 * @Code Fetching data 
 ******************************************************************************/
function getProseccmasterRecordsCsd() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/laundrylinon/fetchProcessMasterListCsd",

				success : function(r) {
					console.log(r);
					setTemplateForProcessingMasterCsd(r);//call template
				}
			});
}



/*******************************************************************************
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForProcessingMasterCsd(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						/*+ '<th class="col-md-1 center">Frequency ID</th>'*/
						+ '<th class="col-md-1 center">Procesing Code</th>'
						+ '<th class="col-md-1 center">Procesing Name</th>'
						+ '<th class="col-md-1 center">Description</th>'
						+ '<th class="col-md-1 center">Sequence No.</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.listPro.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.listPro[int].processId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								/*+ '<td id="fId'+(r.listPro[int].frequencyId) +'" class="col-md-1 center">'+ (r.listPro[int].frequencyId)+ '</td>'*/
								+ '<td id="pCode'+(r.listPro[int].processId) +'" class="col-md-1 center">'+ (r.listPro[int].processCode)+ ' </td>'
								+ '<td  id="pName'+(r.listPro[int].processId) +'" class="col-md-1 center">'+ (r.listPro[int].processName)+ ' </td>'
								+ '<td  id="des'+(r.listPro[int].processId) +'" class="col-md-1 center">'+ (r.listPro[int].discription)+ ' </td>'
								+ '<td  id="seq'+(r.listPro[int].processId) +'" class="col-md-1 center">'+ (r.listPro[int].seqNo)+ ' </td>'
								+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'+r.listPro[int].processId+' onclick="editProcessCsd('+r.listPro[int].processId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '+r.listPro[int].processId+' onclick=deleteProcessCsd('+r.listPro[int].processId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.listPro[int].processId+">"+r.listPro[int].processName+"</option>";
	}
	
	$("#masterModuleBodyNarr").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}	



/*******************************************************************************
 * @Code This function use to auto complete fields
 * By Badrinath Wagh
 ******************************************************************************/
function autoCompleteForProcessMasterCsd() {

	//alert(callfrom);
	//var usertype = "";
	var letter="";
/*	if (callfrom ="search") {*/
		letter=$("#byName").val();
	//}
		var inputs = [];
		
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/laundrylinon/autoSuggestionForProcessCsd",
			//timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				 //alert(r.listTemp[0].TempName);
				
		/*		if(callfrom=="search"){*/
					
				setTemplateForProcessingMasterCsd(r);
					//autoCompTable(r, inputId);
					
				/*}else{
					//autoCompTable(r, inputId);
				}*/
				
			}
		});
	}



function editProcessCsd(processId){
	$('#processId').val(processId);	
	$('#processCode').val($('#pCode' + processId).html());
	$('#processName').val($('#pName' + processId).html());
	$('#seqNo').val($('#seq' + processId).html());
	$('#discription').val($('#des' + processId).html());
}	


/*******************************************************************************
 * @Code Delete data from temp id 
 ******************************************************************************/
function deleteProcessCsd(processId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Record?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/laundrylinon/deleteProcessyRecordCsd",
			data : {
				"processId" : processId
			},
			//timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				refreshProcessMasterCsd();
			}
		});
	}
}





function getNextMaterialRequestNoteIdInLIstCsd() {

	var inputs = [];
	//inputs.push('action=getMaterailRequestNoteNextId');
	//inputs.push('tableName=inv_cssd_master');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdInventory/getMaterailRequestNoteNextId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			// alert(r);
			$("#ProcessId").val(r);
		}
	});
}


function setclearPOPONAddCssd() {
	$('#NewMRNForm').find('input:text').val('');
	// $('#NewMRNForm').find('input:hidden').val('');

	$('#NewMRNForm').find('input:text').val('');
	$('#ItemInfoTableinLiST').find('input:text').val('');
	$('#NewMRNForm').find('textarea').val('');
	$("#ItemInfoTableinLiST > tbody").html('');
	$("#sclMRNLocationInList option:selected").text('');
	isNew = 0;
	count = 1;
	getNextMaterialRequestNoteIdInLIstCsd();
	
	/*** set Defalut todays Date to date @Date3Aug2016 @Author Sudhir */
	var today = new Date();
	 
	var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    var today1 = dd+'/'+mm+'/'+yyyy;
    $("#processDate").val(today1);
    var inventory=$("#callfrom").val();
    $("#txtMRNLocationNameInList").val(inventory);
    $("#subInventoryId").val(2);
	// window.location.reload("inventory_Materail_Request_Note.jsp");
}



function setMaterialRequestInfoInLisCsd() {
	
	var depName=$("#txtMRNLocationNameInList").val();
	if(depName=="" || depName==null || depName==undefined)
		{
			alert("please enter Sub Department Name");
			return false;
		}

	$('#iToHideBtns').css('display', 'block');
	$("#closeonclick").hide();
	if (test > 0 && isNew > 0) {
		if (count == 1) {

			count = test;
		}
		count++;

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td><input type='hidden' id='txtinventoryMaterailRequestNoteInList"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcodeInList_'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcodeInList_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNIDInList"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeIdInList"
								+ count
								+ "' value='0'  /></div></td> <td>  <td><input type='text' onkeypress='return validateNumbers(event)'  id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()'/><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option >Select</option></select></td>");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count,
				"onload");
		// count++;
		/* totalDocQty(); */
	} else {

		$("#ItemInfoTableinLiST > tbody")
				.append(
						" <tr id ='deleterowsInList"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td> " 
								
								
								+" <td style='display:none'> <input type='hidden' id='txtinventoryMaterailRequestNoteInList"
								+ count
								+ "' name='txtinventoryMaterailRequestNoteInList' value ='0'   class='form-control input-SmallText'/> <input type='text' id='txtSrNoInList"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'/></td>" 
								
									
								+ " <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcodeInList'>"
								+ "<input type='text' id='itemName_"
								+ count
								+ "'onkeyup='autoSuggestItemNameForCsd(this.id,onchange,"+count+")' class='typeahead form-control input-SmallText'/>"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "'   /> <input type='hidden'  id='itemCode"
								+ count
								+ "'  value='0' /> </div></td> " 
								
								
								+"<td> <input type='text' readonly='' onkeypress='return validateNumbers(event)' id='avlQty"
								+ count
								+ "' class='form-control input-SmallText' />" 
								+"<input type='hidden' value=''  id='avlQtyHidden"
								+ count
								+ "' />"
								+"</td> "
								
					
								+"<td> <input type='text' onkeypress='return validateNumbers(event)' id='sentQty"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='setSentQtySave("+count+")'/> <input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /></td> " );
								
						
				
		$("#txtMRNIDInList").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNIDInList").val();
		$("#totalRowInList").val(tblSubContractingCountRow1);
		autoSuggestItemNameForCsd(
				"itemName_" + count,
				"onload",count);
		count++;

	}

}





function autoSuggestItemNameForCsd(inputID, typeauto,count) {
	
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto != "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		//inputs.push('action=fetchItemNamesOnlyAutoSuggestForCsdItems');
		inputs.push('txtVal=' + txtVal1);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "ehat/inventory/fetchItemNamesOnlyAutoSuggestForCsdItems",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 32) {
							alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$(
									"#itemName_"
											+ idValue1).val('');
							$(
									"#itemName_"
											+ idValue1).focus();

						} else {
						//	ajaxResponse = eval('(' + r + ')');
							// alert(r);

							for ( var i = 0; i < r.lstItemMaster.length; i++) {
								availableTags
										.push(r.lstItemMaster[i].itemName
												+ "_"
												+ r.lstItemMaster[i].id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {
			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;
			$("#itemCode" + idValue).val(currentcode);
			getAvalQuantityCsd(count);
			

		}
	}

}



function getAvalQuantityCsd(count)
{
	var itemName=$("#itemName_"+count).val();
	var itemCode=$("#itemCode"+count).val();
	var deptName=$("#txtMRNLocationNameInList").val();
		
	var inputs = [];
	//inputs.push('action=getTotalAvlQty');
	inputs.push('itemName=' + itemName);
	inputs.push('itemCode=' + itemCode);
	inputs.push('deptName=' + deptName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdInventory/getAvalQuantityCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			$("#avlQty"+count).val(r);
			$("#avlQtyHidden"+count).val(r);
		}
	});

}


function setSentQtySave(count)
{
	
	var avlQty=$("#avlQtyHidden"+count).val();
	var sendQty=$("#sentQty"+count).val();
	if(parseInt(sendQty)>parseInt(avlQty))
		{
			alert("Wrong Quantity");
			$("#sentQty"+count).val(0);
			$("#avlQty"+count).val(avlQty);
			return false;
		}
	if(sendQty=="")
	{
		$("#sentQty"+count).val(0);
		$("#avlQty"+count).val(avlQty);
		return false;
	}
	
	avlQty=parseInt(avlQty)-parseInt(sendQty);
	$("#avlQty"+count).val(avlQty);
	}



function saveMaterialRequestNoteInListCsd() {
	// General In
	//var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteDocIdInList").val();
	var ProcessId=0;
	var d = new Date();
	var mrnDate = d.toUTCString();
	

	var txtDocDate = $("#processDate").val();
	var txtMRNID = $("#txtMRNIDInList").val();

	var txtMRNLocationName = $("#txtMRNLocationNameInList").val();
	var CurrentuserName = $("#CurrentuserName").val();
	var subInventoryId = $("#subInventoryId").val();
	
	//var mrnApprovedStatus=1;

	if (txtDocDate == "" || txtDocDate == 0) {

		alert("Please select mrn date");
		$("#txtMRNDateInList").focus();
		return false;

	}
	if(txtDocDate)
	{
	   var today = new Date();
		 
		var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    
	    if(dd<10){
	        dd='0'+dd;
	    } 
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    var today1 = dd+'/'+mm+'/'+yyyy;

	    if (txtDocDate === today1) {

		} else {
			alert("Please Enter Current Date ");
			$("#txtMRNDateInList").focus();
			return false;
		}
	}

	if (txtMRNLocationName == "" || txtMRNLocationName == 0) {

		alert("Please Enter Suninventory Name");
		$("#txtMRNLocationNameInList").focus();
		return false;

	}

	
	var status = 1;
	var materiallist = {
			listCssd : []
	};

	var ltCssdSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var processSlaveId=0;
		    
			var itemName = $("#itemName_" + i).val();
			var itemCode = $("#itemCode" + i).val();	
			var sendQty = $("#sentQty" + i).val();
	

	
			if (sendQty == "" || sendQty == null || sendQty == 0) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#sendQty" + i).focus();
				return false;
			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(sendQty)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#sentQty" + i).val('');
				$("#sentQty" + i).focus();
				return false;
			}

			ltCssdSlave.push({
				processSlaveId : processSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				deptName:txtMRNLocationName,
				deptId:subInventoryId,
				mrnStatus:1
			});
			
	}

	materiallist.listCssd.push({
		processId     : ProcessId,
		mrnDate  : mrnDate,
		deptName:txtMRNLocationName,
		deptId:subInventoryId,
		mrnStatus:1,
		ltCssdSlave:ltCssdSlave,
		raisedBy:CurrentuserName
	});
	
	materiallist = JSON.stringify(materiallist);

	var inputs = [];
	inputs.push('materiallist=' +  encodeURIComponent(materiallist));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/saveCssdRequest",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(canteenId > 0){
				alert("Updated Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}




/********
 * @Code       : 
 * **********/
function getlistCsd(){
	var subDept=$("#callfrom").val();

 	var inputs = [];
 	inputs.push('subDept=' +  subDept);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistCds",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setCsdlist(r);
			
		}
	});
}

function setCsdlist(res) {
	var result = '';

	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	    var edit='';
	    var delet='';	
	     if(mrnStatus==1)
	    	 {
	      	edit=edit
	    	+ '<td><button id="btnEdit"  data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editCsdRequest('
			+ processId
			+ ')" value="EDIT">'
			+ '<i class="fa fa-edit"></i></button></td>';
	    	 }
	     else
	    	 {
	    	 	edit=edit
	    	 	+ '<td><button id="btnEdit" disabled data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editCsdRequest('
	    	 	+ processId
	    	 	+ ')" value="EDIT">'
	    	 	+ '<i class="fa fa-edit"></i></button></td>';
	    	 }
	    
	    
	    if(mrnStatus==1 || mrnStatus==5  )
	    	{
	    	delet=delet
			+ '<td><button id="btnDelete"  class="btn btn-xs btn-success" onclick="deleterecordByIdCsd('
			+ processId
			+ ')" value="DELETE">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
	    	}
	    else
	    	{
	    	
	    	delet=delet
			+ '<td><button id="btnDelete" disabled class="btn btn-xs btn-success" onclick="deleterecordByIdCsd('
			+ processId
			+ ')" value="DELETE">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
	    	}
	    
	    var status='';
		    if (mrnStatus == 1) {
			status = "NYA";
		} else if (mrnStatus == 2 || mrnStatus == 3) {
			status = "InProcess";
		} else if (mrnStatus == 4) {
			status = "Dispached";
		} else if (mrnStatus == 5) {
			status = "Complete";
		}
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ processId
				+ '</td> '
				+ '	<td>'
				+ datetime
				+ '</td> '
				+ '	<td>'
				+ deptName
				+ '</td> '
				
				+ '	<td>'
				+ raisedBy
				+ '</td> '

				+edit
				
				+delet

				
				+ '	<td>'
				+ status
				+ '</td> ';

	}

	$("#divlandlList").html(result);
}





/********
 * @Code       :For edit the canteen details  
 * **********/


function editCsdRequest(ProcessId){
	
	//showcanteenDiv();
	//$("#canteendetails").show(1000);
	//$("#canteenList").hide();
	
 	var inputs = [];
 	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyIdCsd",
		data : {
			"ProcessId"      : parseInt(ProcessId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			seteditCsdRequest(r);
			//setCanteenonedit(r);
			
		}
	});

}



/********
 * @Code       :For edit setting templates 
 * **********/
function seteditCsdRequest(res) {
	var htm='';
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
		var mrnStatus=res.listCssd[i].mrnStatus;
		if(mrnStatus>1)
			{
				$('#updateRecods').prop("disabled",true);
			}
		
		
		//var mrnDate=res.listLL[i].mrnDate;
		var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
	
		$('#processIdEdit').val(processId);
		$('#deptNameEdit').val(deptName);
		$('#processDateEdit').val(datetime);
		$('#raisedByEdit').val(raisedBy);
		$('#deptIdEdit').val(deptId);
		
		$("#ItemInfoTable > tbody").empty();
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	
	    	
	    	$("#ItemInfoTable > tbody")
			.append(
					" <tr id ='deleterows"
							+ count
							+ "' > <td> <input type='checkbox'  name='checkbox"
							+ count
							+ "' onclick='chkForAccept("
							+ count
							+ ")'  id='chkbox"
							+ count
							+ "'> </td> <td style='display:none;'><input type='text' id='txtSrNo"
							+ count
							+ "' name='txtSrNo'  value="
							+ count
							+ "  class='form-control input-SmallText'> <input type='hidden' id='slaveIdEdit"
							+ count
							+ "' name=''  value="
							+ processSlaveId
							+ "  class='form-control input-SmallText'></td>  <td>"
							+ "<input type='text' id='itemNameEdit_"
							+ count
							+ "' "
							+ "onkeyup='autoSuggestItemNameForEditCsd(this.id,onchange,"+count+")' class='typeahead form-control input-SmallText'  value='"
							+ itemName
							+ "' /> <input type='hidden'  id='itemIdEdit"
							+ count
							+ "' value="
							+ itemCode
							+ " /></td> " 
							
							+"<td><input type='text' readonly='' id='avlQtyEdit"
							+ count
							+ "' class='form-control input-SmallText'  value='"
							+ 0
							+ "'>" 
							+"<input type='hidden'  id='avlQtyEditHidden"
							+ count
							+ "' class='form-control input-SmallText'  value='"
							+ 0
							+ "'>"
							+"</td> " 
									
							
							+"<td><input type='text'  id='sendQtyEdit"
							+ count
							+ "' class='form-control input-SmallText' onkeyup='setMrnQtyForUpdateCsd("+count+");' value='"
							+ sendQty
							+ "'></td> " 
							
							
							+ "<td style='display:none'><input type='text' readonly='' id='pendQtyEdit"
							+ count
							+ "' class='form-control input-SmallText' value='"
							+ pendingQty
							+ "'></td> ");

	$("#txtMRNID").val(count);
	count++;
	test++;    	
	    }	    
	}
	
	$('#DRRDiv').html(htm);
	getAvaQuantityForEditCsd(deptName);
	
	
}




function getAvaQuantityForEditCsd(deptName)
{
	var length=$("#txtMRNID").val();
	
	var count=1;
	for(var i=0;i<length;i++)
	{
		itemNameEdit=$("#itemNameEdit_"+count).val();
		getAvaQuantityForEditCsd2(deptName,itemNameEdit,count);
		count++;
	}
	
}


function getAvaQuantityForEditCsd2(deptName,itemNameEdit,count)
{
	var itemCode=0;
	
	var inputs = [];
	//inputs.push('action=getTotalAvlQty');
	inputs.push('itemName=' + itemNameEdit);
	inputs.push('itemCode=' + itemCode);
	inputs.push('deptName=' + deptName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdInventory/getAvalQuantityCsd",
		timeout : 1000 * 60 * 5,
		catche : true,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r);
			ajaxResponse = r;
			$("#avlQtyEdit"+count).val(r);
			$("#avlQtyEditHidden"+count).val(r);
			//$("#avlQtyHidden"+count).val(r);
		}
	});
}


function setMrnQtyForUpdateCsd(count)
{
	
	var avlQty=$("#avlQtyEditHidden"+count).val();
	var sendQty=$("#sendQtyEdit"+count).val();
	if(parseInt(sendQty)>parseInt(avlQty))
		{
			alert("Wrong Quantity");
			$("#sendQtyEdit"+count).val(0);
			$("#avlQtyEdit"+count).val(avlQty);
			return false;
		}
	if(sendQty=="")
	{
		$("#sendQtyEdit"+count).val(0);
		$("#avlQtyEdit"+count).val(avlQty);
		return false;
	}
	
	avlQty=parseInt(avlQty)-parseInt(sendQty);
	$("#avlQtyEdit"+count).val(avlQty);
}






function UpdateCleaningRequestCsd() {

	var txtMRNID = $("#txtMRNID").val();
	
	var processId=	$("#processIdEdit").val();
	//var mrnid=$('#mrnid').val();
	var txtDocDate = $("#processDateEdit").val();
	var deptName = $("#deptNameEdit").val();
	var raisedBy = $("#raisedByEdit").val();
	var deptId = $("#deptIdEdit").val();
	var mrnDate=$("#processDateEdit").val();
	
	var dateParts = mrnDate.split("/");
	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Sub Department Name");
		$("#deptName").focus();
		return false;

	}

	/* var sclMRNLocation = $("#sclMRNLocationInList option:selected").text(); */
	//var status = 'open';
	//var status = 1;
	
	

	
	
	var materiallist = {
			listCssd : []
	};

	var ltCssdSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var processSlaveId=$(
					"#slaveIdEdit" + i)
					.val();
		    
		    
			var itemName = $(
					"#itemNameEdit_" + i)
					.val();
			
			
			var itemCode = $("#itemIdEdit" + i).val();
			
			
			var sendQty = $(
					"#sendQtyEdit" + i)
					.val();
		
	
			if (sendQty == "" || sendQty == null || sendQty == 0) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#sendQty" + i)
						.focus();
				return false;

			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(sendQty)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtMRNDocQuantity" + i).val('');
				$("#txtMRNDocQuantity" + i).focus();
				return false;
			}

			ltCssdSlave.push({
				processSlaveId : processSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				deptName:deptName,
				deptId:deptId,
				mrnStatus:1				// for accept or complete
			});
			
	}
	
	
	materiallist.listCssd.push({
		processId     : processId,
		mrnDate  : dateObject,
		deptName:deptName,
		deptId:deptId,
		mrnStatus:1,		// for accept or complete
		ltCssdSlave:ltCssdSlave,
		raisedBy:raisedBy
	});
	
	
	materiallist = JSON.stringify(materiallist);

	var inputs = [];
	inputs.push('materiallist=' +  encodeURIComponent(materiallist));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/saveCssdRequest",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(processId > 0){
				alert("Updated Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}



/********
 * @Code       :For delete the Csd details  
 * **********/
function deleterecordByIdCsd(Id){
	var r = confirm("Are You Sure You Want To Delete Record?");
	if (r == true) {
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/deletebyIdCsd",
		data : {
			"id"      : parseInt(Id)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			alert(r);
			window.location.reload(true);
		}
	});
	}
	//alert();
}


/********
 * @Code       :auto complete the canteen details 
 * **********/
function autosugetionCsdList(inputId){
	var findingName = $("#" + inputId).val();
	
	if(findingName.length == 0){
		getlistCsd();
		return false;
	}
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyletterCsd",
		
		success : function(r) {
			
			setCsdlist(r);
			
		}
	});
}




/********
 * @Code       :auto complete the canteen details 
 * **********/
function autosugetionCsdForReturnItems(inputId){
	var findingName = $("#" + inputId).val();
	
	if(findingName.length == 0){
		getlistforReturnItemsCsd();
		return false;
	}
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyletterCsdForReturnItems",
		
		success : function(r) {
			
			setlistforReturnItemsCsd(r);
			
		}
	});
}



function getlistforCsdDept(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistForCsdDept",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforCsdDept(r);
			
		}
	});
}

function setlistforCsdDept(res) {
	var result = '';
//var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	     var temp='';
	    if(mrnStatus==2 || mrnStatus==3 || mrnStatus==4)
    	{
			temp=temp
			+ '<td><button disabled="disabled" id="btnDelete'+(i+1)+'" class="btn btn-xs btn-success" onclick="deleterecordByIdCsd('
			+ processId
			+ ')" value="Return">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
    	}
	    else
	    {
		    temp=temp
			+ '<td><button id="btnDelete'+(i+1)+'" class="btn btn-xs btn-success" onclick="deleterecordByIdCsd('
			+ processId
			+ ')" value="Return">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
	   	}
	
	    
			  var status='';
			    if (mrnStatus == 1) {
				status = "NYA";
			} else if (mrnStatus == 2 || mrnStatus == 3) {
				status = "InProcess";
			} else if (mrnStatus == 4) {
				status = "Dispached";
			} else if (mrnStatus == 5) {
				status = "Complete";
			}
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				
				+ '	<td>'
				+ processId
				+ '</td> '
				
				+ '	<td>'
				+ datetime
				+ '</td> '
				
				+ '	<td>'
				+ deptName
				+ '</td> '
				
				+ '	<td>'
				+ raisedBy
				+ '</td> '

				
				+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editMrnRequestforCsdDept('
				+ processId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-edit"></i></button></td>'
				
				+ '<td><button id="btnEdit"  data-target="#MaterialRequestReturnList" data-toggle="modal" class="btn btn-xs btn-success" onclick="returnMrnRequestCsd('
				+ processId
				+ ')" value="returnItems">'
				+ '<i class="glyphicon glyphicon-export"></i></button></td>'

				+temp
		
				+ '	<td>'
				+ status
				+ '</td> ';

	}

	$("#divlandlList").html(result);
}




/********
 * @Code       :auto complete the canteen details 
 * **********/
function autosugetionCsdDept(inputId){
	var findingName = $("#" + inputId).val();
	
	if(findingName.length == 0){
		getlistforCsdDept();
		return false;
	}
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyletterCsd",
		
		success : function(r) {
			
			setlistforCsdDept(r);
			
		}
	});
}





/********
 * @author     :Mohd Tarique Aalam
 * @Date       :17-03-2018
 * @Code       :For edit the canteen details  
 * **********/


function editMrnRequestforCsdDept(processId){


 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyIdCsd",
		data : {
			"ProcessId"      : parseInt(processId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			seteditMrnRequestforCsdDept(r);
			//setCanteenonedit(r);
			
		}
	});

}



/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For edit setting templates 
 * **********/
function seteditMrnRequestforCsdDept(res) {
	var htm='';
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
	
		var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
		var mrnStatus=res.listCssd[i].mrnStatus;
		var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		
		
		$('#txtmaterialReqaestNoteListDocId').val(processId);
		$('#txtMRNLocationName').val(deptName);
		$('#raisedBy').val(raisedBy);
		$('#deptId').val(deptId);	
		$('#txtmaterialReqaestNoteDocDate').val(datetime);
		
		$("#ItemInfoTable > tbody").empty();
		
		var temp="</td> <td><input type='text'  id='mrnActualItemQty"
		+ count
		+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
		+ sendQty
		+ "'></td>";
		
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var narration=res.listCssd[i].ltCssdSlave[k].narration;
	    	var temp='';
	    	if(mrnStatus==1)
	    		{
	    		 temp=temp
	    			+"</td> <td><input type='text'  id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' readonly='' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ sendQty
	    			+ "'></td>";
	    		}
	    	if(mrnStatus==2 || mrnStatus==3 || mrnStatus==4 || mrnStatus==5){
	    		 temp=temp
	    			+"</td> <td><input type='text'  id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' readonly='' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ recievedQty
	    			+ "'></td>";
	    	}
	    	
			if (mrnStatus >= 2) {
				$("#ApprovedByLnl").prop("disabled", true);
			}
		
	    	
	    
	    	
	    	$("#ItemInfoTable > tbody")
			.append(
					" <tr id ='deleterows"
							+ count
							+ "' > <td> <input type='checkbox'  name='checkbox"
							+ count
							+ "' onclick='chkForAccept("
							+ count
							+ ")'  id='chkbox"
							+ count
							+ "'> </td> <td style='display:none'><input type='text' id='txtSrNo"
							+ count
							+ "' name='txtSrNo'  value="
							+ count
							+ "  class='form-control input-SmallText'> <input type='hidden' id='salveId"
							+ count
							+ "' name='txtinventoryMaterailRequestNote'  value="
							+ processSlaveId
							+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;width:200px;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
							+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
							+ count
							+ "' "
							+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
							+ itemName
							+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
							+ count
							+ "' value="
							+ itemCode
							+ " /></div></td> <td><input type='text' readonly='' id='txtinventoryMaterailRequestNoteDocQuantity"
							+ count
							+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
							+ sendQty
							+ "'>" 
							
							+"<input type='hidden'  id='sendQtyHidden"
								+ count
								+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
								+ sendQty
								+ "'>" 
							
							+temp
									
							+"<td><input type='text' id='txtIssuedQty"
							+ count
							+ "'  value='"
							+ pendingQty
							+ "' class='form-control input-SmallText' onkeyup='setpendingQty(this.id,"+count+")' ></td> "
						
							+"<td><input type='text' id='txtcurrentSubInventoryStock"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ discardQty
							+ "' > </td>"
							
							+"<td><input type='text' id='narration"
							+ count
							+ "'   class='form-control input-SmallText'  value='"
							+ narration
							+ "' > </td>"
							
								
							+"<td style='display:none' ><input type='hidden' id='remainingHidden"
							+ count
							+ "'  value='"
							+ 0
							+ "' class='form-control input-SmallText'  ></td>");
								

	$("#txtMRNID").val(count);
	count++;
	test++;
	    	
	    }	
	   }
	    

	
	$('#DRRDiv').html(htm);
	
}






function ApproveRequestCsd() {
	
	var txtMRNID = $("#txtMRNID").val();
	
	var processId=	$("#txtmaterialReqaestNoteListDocId").val();
	//var mrnid=$('#mrnid').val();
	var txtDocDate = $("#txtMRNDateInList").val();
	var deptName = $("#txtMRNLocationName").val();
	var raisedBy = $("#raisedBy").val();
	var deptId = $("#deptId").val();
	var dateString=$("#txtmaterialReqaestNoteDocDate").val();
	var receivedBy=$("#CurrentuserName").val();
	

	var dateParts = dateString.split("/");

	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // month is 0-based

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Department Name");
		$("#deptName").focus();
		return false;

	}

	/* var sclMRNLocation = $("#sclMRNLocationInList option:selected").text(); */
	//var status = 'open';
	//var status = 1;
	var materiallist = {
			listCssd : []
	};

	var ltCssdSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var processSlaveId=$(
					"#salveId" + i)
					.val();;
		    
		    
			var itemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i)
					.val();
			
			
			var itemCode = $("#txtMRNItemcodeId" + i).val();
			
			
			var sendQty = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i)
					.val();
			
			var pendingQty = $(
					"#txtIssuedQty" + i)
					.val();
			
			var recievedQty = $(
					"#mrnActualItemQty" + i)
					.val();
			
			var discardQty = $(
					"#txtcurrentSubInventoryStock" + i)
					.val();
			
			var narration = $(
					"#narration" + i)
					.val();
			
			if (pendingQty>0)
				{
					if(narration=="-" || narration=="" || narration==null || narration==undefined)
						{
							alert("Please enter narration in " + i + " Row");
							$("#narration" + i)
							.focus();
							return false;
						}
					
				}
	

	
			if (sendQty == "" || sendQty == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i)
						.focus();
				return false;

			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(sendQty)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtMRNDocQuantity" + i).val('');
				$("#txtMRNDocQuantity" + i).focus();
				return false;
			}

			ltCssdSlave.push({
				processSlaveId : processSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				pendingQty: pendingQty,
				recievedQty:recievedQty,
				discardQty:discardQty,
				narration:narration,
				deptName:deptName,
				deptId:deptId,
				mrnStatus:2
			});
			
	}
	
	
	materiallist.listCssd.push({
		processId     : processId,
		mrnDate  : dateObject,
		recievedDate:new Date(),
		deptName:deptName,
		deptId:deptId,
		mrnStatus:2,
		ltCssdSlave:ltCssdSlave,
		raisedBy:raisedBy,
		receivedBy:receivedBy
	});
	
	
	materiallist = JSON.stringify(materiallist);

	var inputs = [];
	inputs.push('materiallist=' +  encodeURIComponent(materiallist));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/approveRequestCsd",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(processId > 0){
				alert("Request Accepted Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}




/******
 * For returning Items to Sub Department *
 */
function returnMrnRequestCsd(ProcessId){
	
	//showcanteenDiv();
	//$("#canteendetails").show(1000);
	//$("#canteenList").hide();
	//var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyIdCsd",
		data : {
			"ProcessId"      : parseInt(ProcessId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setReturnMrnRequestCsd(r);
			//setCanteenonedit(r);
			
		}
	});

}



/********
 * @Code       :For edit setting templates 
 * **********/
function setReturnMrnRequestCsd(res) {
	var htm='';
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
	
		var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
		
	/*	var recievedDate=res.listCssd[i].recievedDate;
		var processingDate=res.listCssd[i].processingDate;*/
		
		var machineId=res.listCssd[i].machineId;
		var machineName=res.listCssd[i].machineName;
		
		var processingName=res.listCssd[i].processingName;
		var processingId=res.listCssd[i].processingId;
		
		var conductedBy=res.listCssd[i].conductedBy;
		var receivedBy=res.listCssd[i].receivedBy;




	
		status=res.listCssd[i].mrnStatus;
		var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		var datetime2= new Date(res.listCssd[i].recievedDate).toLocaleDateString('en-GB');
		var datetime3= new Date(res.listCssd[i].processingDate).toLocaleDateString('en-GB');
		if(status==1)
			{
				alert("First Accept Sub-Department Request");
				$("#returnItemsToSub").prop("disabled", true);
				return false;
			}
		
		if(status==2)
		{
			alert("First Send Items For Processing");
			$("#returnItemsToSub").prop("disabled", true);
			return false;
		}
	
		$('#reurnMrnId').val(processId);
		$('#returndeptName').val(deptName);
		$('#raisedByReturn').val(raisedBy);
		$('#returndeptId').val(deptId);	
		$('#returnDate').val(datetime);
		$('#recievedDate').val(datetime2);
		$('#processingDate').val(datetime3);
		$('#receivedByReturn').val(receivedBy);
		
		$('#machineId').val(machineId);
		$('#machineName').val(machineName);
		
		$('#processingId').val(processingId);
		$('#processingName').val(processingName);
		
		$('#conductedBy').val(conductedBy);
		
		

		
		
		$("#ItemInfoTable > tbody").empty();
		
	/*	var temp="</td> <td><input type='text'  id='mrnActualItemQty"
		+ count
		+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
		+ sendQty
		+ "'></td>";*/
		
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	var returnQty=res.listCssd[i].ltCssdSlave[k].returnQty;
	    	
	    	//var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var narration=res.listCssd[i].ltCssdSlave[k].narration;
	    	var temp='';
	    	if(mrnStatus==1)
	    		{
	    		 temp=temp
	    			+"</td> <td><input type='text'  id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ sendQty
	    			+ "'></td>";
	    		}
	    	if(mrnStatus==2 || mrnStatus==3 || mrnStatus==4 || mrnStatus==5){
	    		 temp=temp
	    			+"</td> <td><input type='text'  id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' readonly=''  value=' "
	    			+ recievedQty
	    			+ "'></td>"
	    			
	    			+"<input type='hidden'  id='recieveQtyHidden"
					+ count
					+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
					+ recievedQty
					+ "'>";
	    	}
	    	if(mrnStatus>=4)
	    		{
	    			$("#returnItemsToSub").prop("disabled", true);
	    		}
	    	
	    	$("#ItemInfoTableReturn > tbody")
			.append(
					" <tr id ='deleterows"
							+ count
							+ "' > <td> <input type='checkbox'  name='checkbox"
							+ count
							+ "' onclick='chkForAccept("
							+ count
							+ ")'  id='chkbox"
							+ count
							+ "'> </td> <td style='display:none'><input type='text' id='txtSrNo"
							+ count
							+ "' name='txtSrNo'  value="
							+ count
							+ "  class='form-control input-SmallText'> <input type='hidden' id='salveId"
							+ count
							+ "' name='txtinventoryMaterailRequestNote'  value="
							+ processSlaveId
							+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;width:200px;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
							+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
							+ count
							+ "' "
							+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
							+ itemName
							+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
							+ count
							+ "' value="
							+ itemCode
							+ " /></div></td> <td><input type='text' readonly='' id='txtinventoryMaterailRequestNoteDocQuantity"
							+ count
							+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
							+ sendQty
							+ "'>" 
							
							+"<input type='hidden'  id='sendQtyHidden"
								+ count
								+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
								+ sendQty
								+ "'>" 
							
							+temp
							
							
							+"<td><input type='text' readonly=''  id='returnQty"
							+ count
							+ "' class='form-control input-SmallText' onkeyup='setReurnQty(this.id,"+count+")' value='" 
							+ recievedQty				//returnQty
							+ "'></td>" 
									
							+"<td><input type='text' id='txtIssuedQty"
							+ count
							+ "'  value='"
							+ pendingQty
							+ "' class='form-control input-SmallText' onkeyup='setpendingQty(this.id,"+count+")' readonly=''></td> "
						
							+"<td><input type='text' id='txtcurrentSubInventoryStock"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ discardQty
							+ "' readonly=''> </td>"
							
							+"<td><input type='text' id='narration"
							+ count
							+ "'   class='form-control input-SmallText'  value='"
							+ narration
							+ "' readonly='' > </td>");
								

	$("#txtMRNID").val(count);
	count++;
	test++;
    	
	    }
	    
	    
	}
	
	$('#DRRDiv').html(htm);
	
}




function returnRequestCsd() {

	var txtMRNID = $("#txtMRNID").val();
	
	var processId=	$("#reurnMrnId").val();
	//var mrnid=$('#mrnid').val();
	var txtDocDate = $("#txtmaterialReqaestNoteDocDate").val();
	var deptName = $("#returndeptName").val();
	var raisedBy = $("#raisedByReturn").val();
	var deptId = $("#returndeptId").val();
	var mrnDate= $("#returnDate").val();
	
	var recievedDate=$('#recievedDate').val();
	var processingDate=$('#processingDate').val();
	var receivedBy=$('#receivedByReturn').val();
	
	
	var machineId=$('#machineId').val();
	var machineName=$('#machineName').val();
	
	var processingId=$('#processingId').val();
	var processingName=$('#processingName').val();
	
	var conductedBy=$('#conductedBy').val();
	var conductedBy=$('#conductedBy').val();
	
	
	var dateParts = mrnDate.split("/");
	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	
	var dateParts2 = recievedDate.split("/");
	var dateObject2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
	
	var dateParts3 = processingDate.split("/");
	var dateObject3 = new Date(dateParts3[2], dateParts3[1] - 1, dateParts3[0]);
	

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Sub Dept Name");
		$("#returndeptName").focus();
		return false;

	}

	/* var sclMRNLocation = $("#sclMRNLocationInList option:selected").text(); */
	//var status = 'open';
	//var status = 1;
	//var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	var materiallist = {
			listCssd : []
	};

	var ltCssdSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var processSlaveId=$(
					"#salveId" + i)
					.val();;
		    
		    
			var itemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i)
					.val();
			
			
			var itemCode = $("#txtMRNItemcodeId" + i).val();
			
			
			var sendQty = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i)
					.val();
			
			var pendingQty = $(
					"#txtIssuedQty" + i)
					.val();
			
			var recievedQty = $(
					"#mrnActualItemQty" + i)
					.val();
			
			var discardQty = $(
					"#txtcurrentSubInventoryStock" + i)
					.val();
			
			returnQty=$(
					"#returnQty" + i)
					.val();
			
			var narration = $(
					"#narration" + i)
					.val();
			

	

	
			if (sendQty == "" || sendQty == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i)
						.focus();
				return false;

			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(sendQty)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtMRNDocQuantity" + i).val('');
				$("#txtMRNDocQuantity" + i).focus();
				return false;
			}

			ltCssdSlave.push({
				processSlaveId : processSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				pendingQty: pendingQty,
				recievedQty:recievedQty,
				discardQty:discardQty,
				narration:narration,
				returnQty:returnQty,
				mrnStatus:4
			});
			
	}
	
	
	materiallist.listCssd.push({
		processId     : processId,
		mrnDate  : dateObject,
		recievedDate:dateObject2,
		processingDate:dateObject3,
		reutrnDate:new Date(),
		deptName:deptName,
		deptId:deptId,
		ltCssdSlave:ltCssdSlave,
		raisedBy:raisedBy,
		receivedBy:receivedBy,
		machineId:machineId,
		machineName:machineName,
		processingId:processingId,
		processingName:processingName,
		conductedBy:conductedBy,
		mrnStatus:4
	});

	materiallist = JSON.stringify(materiallist);

	var inputs = [];
	inputs.push('materiallist=' +  encodeURIComponent(materiallist));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/saveCssdRequest",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(processId > 0){
				alert("Returned Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}




function goodsIssueRefreshCsd()

{
	$('#Goods_Issue').find('input:text').val('');
	$('#Goods_Issue').find('textarea').val('');
	$('#Goods_Issue').find('input:hidden').val('');

	$("#ItemInfoTable > tbody").html('');
	$("#txtMRNTotal").val("");
	$("#txtGoodsIssueRemark").val("");
	$("#txtMRNItemName").val("");
	$("#txtGoodsIssueTotalDocQty").val("");
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	var today = dd+'/'+mm+'/'+yyyy;
	$("#processDate").val(today);
	isNew = 0;
	count = 1;
	 
	//fetchMaterialRequestNoteDetailsInGoodsIssue();
}



function getIdsForProceesingCsd(){

 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getIdsForCsdProcessing",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			//setCsdlist(r);
			setIdsForProceesingCsd(r);
			
		}
	});
}



function setIdsForProceesingCsd(r) {

					var template="<option value='0'>Select</option> ";
					for ( var i = 0; i < r.listCssd.length; i++) {

						template = template + "<option id='' value='"
									+ r.listCssd[i].processId + "'>" + r.listCssd[i].processId + "</option>";
					}
					
					$("#processId").append(template);
	
}





function viewProcessingDetails(processId){
	
	//showcanteenDiv();
	//$("#canteendetails").show(1000);
	//$("#canteenList").hide();

 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyIdCsd",
		data : {
			"ProcessId"      : parseInt(processId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setviewProcessingDetails(r);
			//setCanteenonedit(r);
			
		}
	});

}



/********
 * @Code       :For edit setting templates 
 * **********/
function setviewProcessingDetails(res) {
	var htm='';
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
	
		var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
		var mrnStatus=res.listCssd[i].mrnStatus;
		var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		var datetime2= new Date(res.listCssd[i].recievedDate).toLocaleDateString('en-GB');
		var receivedBy=res.listCssd[i].receivedBy;
		
		
		$('#txtmaterialReqaestNoteListDocId').val(processId);
		$('#txtMRNLocationName').val(deptName);
		$('#raisedBy').val(raisedBy);
		$('#subInventoryId').val(deptId);	
		$('#mrnDate').val(datetime);
		$('#recievedDate').val(datetime2);
		$('#receivedBy').val(receivedBy);
		
		$("#ItemInfoTable > tbody").empty();
		
		var temp="</td> <td><input type='text'  id='mrnActualItemQty"
		+ count
		+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
		+ sendQty
		+ "'></td>";
		
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var narration=res.listCssd[i].ltCssdSlave[k].narration;
	    	var temp='';
/*	    	if(mrnStatus==1)
	    		{
	    		 temp=temp
	    			+"</td> <td><input type='text'  id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' readonly='' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ sendQty
	    			+ "'></td>";
	    		}
	    	if(mrnStatus==2 || mrnStatus==3 || mrnStatus==4){
	    		 temp=temp
	    			+"</td> <td><input type='text'  id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' readonly='' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ recievedQty
	    			+ "'></td>";
	    	}*/
	    	
			if (mrnStatus >= 2) {
				$("#ApprovedByLnl").prop("disabled", true);
			}
		
	    	
	    
	    	
	    	$("#ItemInfoTable > tbody")
			.append(
					" <tr id ='deleterows"
							+ count
							+ "' > <td> <input type='checkbox'  name='checkbox"
							+ count
							+ "' onclick='chkForAccept("
							+ count
							+ ")'  id='chkbox"
							+ count
							+ "'> </td> <td style='display:none'><input type='text' id='txtSrNo"
							+ count
							+ "' name='txtSrNo'  value="
							+ count
							+ "  class='form-control input-SmallText'> <input type='hidden' id='salveId"
							+ count
							+ "' name='txtinventoryMaterailRequestNote'  value="
							+ processSlaveId
							+ "  class='form-control input-SmallText'></td>  " 
							
							
							+"<td>"
							+ "<input type='text' id='itemName"
							+ count
							+ "' "
							+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
							+ itemName
							+ "' /> <input type='hidden'  id='itemCode"
							+ count
							+ "' value="
							+ itemCode
							+ " /></td> " 
							
	
							+"<td style='display:none'><input type='text' readonly='' id='sendQty"
							+ count
							+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
							+ sendQty
							+ "'>" 
							
							
							+"</td> <td><input type='text'  id='recievedQty"
				    		+ count
				    		+ "' class='form-control input-SmallText' readonly='' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
				    		+ recievedQty
				    		+ "'></td>"
				    		
									
							+"<td style='display:none'><input type='text' id='pendingQty"
							+ count
							+ "'  value='"
							+ pendingQty
							+ "' class='form-control input-SmallText' onkeyup='setpendingQty(this.id,"+count+")' ></td> "
						
							
							+"<td style='display:none'><input type='text' id='discardQty"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ discardQty
							+ "' > </td>"
							
							
							+"<td style='display:none'><input type='text' id='deptId"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ deptId
							+ "' > </td>"
							
							
							+"<td style='display:none' ><input type='text' id='narration"
							+ count
							+ "'   class='form-control input-SmallText'  value='"
							+ narration
							+ "' > </td>");
	    	
	    	
	    	
							
								
				/*			+"<td style='display:none' ><input type='hidden' id='remainingHidden"
							+ count
							+ "'  value='"
							+ 0
							+ "' class='form-control input-SmallText'  ></td>"*/
								
			
								

	$("#txtMRNID").val(count);
	count++;
	test++;
	    	
	    }	
	   }
	    

	
	$('#DRRDiv').html(htm);
	
}





function getProseccmasterListForSelectionCsd() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/laundrylinon/fetchProcessMasterListCsd",

				success : function(r) {
					console.log(r);
					var template="<option>Select</option> ";
					for ( var i = 0; i < r.listPro.length; i++) {

						template = template + "<option id='' value='"
									+ r.listPro[i].processId + "'>" + r.listPro[i].processName + "</option>";
					}
					
					$("#peocessName").append(template);
					
					
					
				}
			});
}



function fetchMachineItemDetailsCsd() {
	var inputs = [];
	inputs.push('action=fetchMachineItemDetails');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "LaundryCssdServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			 //alert(r);
			// alert(r);
			//var pobj2=JSON.parse(r);
			var pobj1 = eval('(' + r + ')');
			var template="<option>Select</option> ";
			for ( var i = 0; i < pobj1.ltInventoryItemMasterDTOs.length; i++) {

				template = template + "<option id='' value='"
							+ pobj1.ltInventoryItemMasterDTOs[i].item_id + "'>" + pobj1.ltInventoryItemMasterDTOs[i].item_name + "</option>";
			}
			
			$("#machineName").append(template);
		}
	});
}






function sendToProcess() {
	

	var txtMRNID = $("#txtMRNID").val();
	
	var processId=	$("#processId").val();
	//var mrnid=$('#mrnid').val();
	var txtDocDate = $("#processDateEdit").val();
	var deptName = $("#txtMRNLocationName").val();
	var raisedBy = $("#raisedBy").val();
	var deptId2 = $("#subInventoryId").val();
		
	var condby =$("#condby").val();
	var peocessId =$("#peocessName").val();
	var machineId =$("#machineName").val();
	var mrnDate=$("#mrnDate").val();
	var recievedDate=$("#recievedDate").val();
	var receivedBy=$("#receivedBy").val();
	
	
	var dateParts = mrnDate.split("/");
	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	
	var dateParts2 = recievedDate.split("/");
	var dateObject2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
	
	
	var pname=$("#peocessName option:selected").text();
	var mname=$("#machineName option:selected").text();

	
	if(pname=="Select" || pname==null || pname==undefined)
	{
		alert("Please select peocess name");
		return false;
	}
	
	if(mname=="Select" || mname==null || mname==undefined)
	{
		alert("Please select machine name");
		return false;
	}
	

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Sub Department Name");
		$("#deptName").focus();
		return false;

	}	
	
	

	var materiallist = {
			listCssd : []
	};

	var ltCssdSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var processSlaveId=$(
					"#salveId" + i)
					.val();
		    
		    
			var itemName = $(
					"#itemName" + i)
					.val();
			
			
			var itemCode = $("#itemCode" + i).val();
			
			
			var recievedQty = $(
					"#recievedQty" + i)
					.val();
			
			
			var pendingQty = $(
					"#pendingQty" + i)
					.val();
			
			var discardQty = $(
					"#discardQty" + i)
					.val();
			
			var sendQty = $(
					"#sendQty" + i)
					.val();
			
			var narration = $(
					"#narration" + i)
					.val();
			
			var deptId = $(
					"#deptId" + i)
					.val();
			
		
	
			if (recievedQty == "" || recievedQty == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#recievedQty" + i)
						.focus();
				return false;

			}



			ltCssdSlave.push({
				processSlaveId : processSlaveId,
				itemName : itemName,
				itemCode : itemCode,
				pendingQty: pendingQty,
				recievedQty:recievedQty,
				discardQty:discardQty,
				sendQty:sendQty,
				deptName:deptName,
				deptId:deptId,
				narration:narration,
				mrnStatus:3				// send to process
			});
			
	}
	

	materiallist.listCssd.push({
		processId     : processId,
		processingDate : new Date(),
		recievedDate:dateObject2,
		deptName:deptName,
		deptId:deptId2,
		machineId:machineId,
		processingId:peocessId,
		processingName: pname,
		machineName:mname,
		mrnDate	:dateObject,
		conductedBy:condby,
		raisedBy:raisedBy,
		receivedBy:receivedBy,
		mrnStatus:3,		// send to process
		ltCssdSlave:ltCssdSlave
	});

	
	materiallist = JSON.stringify(materiallist);

	var inputs = [];
	inputs.push('materiallist=' +  encodeURIComponent(materiallist));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/saveCssdRequest",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(processId > 0){
				alert("Sent to Processing Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}





function getlistforProcessing(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistForProcessing",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforProcessing(r);
			
		}
	});
}

function setlistforProcessing(res) {
	var result = '';
//var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var conductedBy =res.listCssd[i].conductedBy;
	     var temp='';
	     
	     
/*	    if(mrnStatus==2 || mrnStatus==3)
    	{
			temp=temp
			+ '<td><button disabled="disabled" id="btnDelete'+(i+1)+'" class="btn btn-xs btn-success" onclick="deleterecordByIdCsd('
			+ processId
			+ ')" value="Return">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
    	}
	    else
	    {
		    temp=temp
			+ '<td><button id="btnDelete'+(i+1)+'" class="btn btn-xs btn-success" onclick="deleterecordByIdCsd('
			+ processId
			+ ')" value="Return">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
	   	}*/
	
	    
	/*		  var status='';
			    if (mrnStatus == 1) {
				status = "NYA";
			} else if (mrnStatus == 2 || mrnStatus == 3) {
				status = "InProcess";
			} else if (mrnStatus == 4) {
				status = "Dispached";
			} else if (mrnStatus == 5) {
				status = "Complete";
			}*/
	   
	    var datetime= new Date(res.listCssd[i].processingDate).toLocaleDateString('en-GB');
	
	    result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				
				+ '	<td>'
				+ processId
				+ '</td> '
				
				+ '	<td>'
				+ datetime
				+ '</td> '
				
				+ '	<td>'
				+ deptName
				+ '</td> '
				
				+ '	<td>'
				+ conductedBy
				+ '</td> ';

				
	/*			+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editMrnRequestforCsdDept('
				+ processId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-edit"></i></button></td>'
				
				+ '<td><button id="btnEdit"  data-target="#MaterialRequestReturnList" data-toggle="modal" class="btn btn-xs btn-success" onclick="returnMrnRequestCsd('
				+ processId
				+ ')" value="returnItems">'
				+ '<i class="glyphicon glyphicon-export"></i></button></td>'

				+temp
		
				+ '	<td>'
				+ status
				+ '</td> ';*/

	}

	$("#divlandlList").html(result);
}




/********
 * @Code       :auto complete the canteen details 
 * **********/
function autosugetionForProcessing(inputId){
	var findingName = $("#" + inputId).val();
	
	if(findingName.length == 0){
		getlistforProcessing();
		return false;
	}
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyletterProcessing",
		
		success : function(r) {
			
			setlistforProcessing(r);
			
		}
	});
}




/********
 * @Code       :  for autosuggetion
 * **********/
function getlistforReturnItemsCsd(){
	
	var deptName=$("#callfrom").val();
 	var inputs = [];
	inputs.push('deptName=' +  deptName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyDepNameCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforReturnItemsCsd(r);
			
		}
	});
}

function setlistforReturnItemsCsd(res) {
	var result = '';

	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	    var recievedDate2=res.listCssd[i].recievedDate2;
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
	    var datetime2= new Date(res.listCssd[i].reutrnDate).toLocaleDateString('en-GB');
	    if(recievedDate2==null)
	    	{
	    		datetime3="";
	    	}
	    else
	    	{
	    	datetime3= new Date(res.listCssd[i].recievedDate2).toLocaleDateString('en-GB');
	    	}
	    
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ processId
				+ '</td> '
				
				+ '	<td>'
				+ datetime
				+ '</td> '
				
				+ '	<td>'
				+ datetime2
				+ '</td> '
				
				+ '	<td>'
				+ datetime3
				+ '</td> '
				
				+ '	<td>'
				+ deptName
				+ '</td> '
				
				+ '	<td>'
				+ raisedBy
				+ '</td> '

				
				+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteListReturn" data-toggle="modal" class="btn btn-xs btn-success" onclick="editReturnItemsCsd('
				+ processId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-eye View"></i></button></td>';
		
	/*	+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editReturnItems('
		+ mrnId
		+ ')" value="EDIT">'
		+ '<i class="fa fa-eye View"></i></button></td>';*/



	}
	$("#divlandlList").html(result); 

	$("#divlandlListReturn").html(result);    
}





function editReturnItemsCsd(ProcessId){
	
	//showcanteenDiv();
	//$("#canteendetails").show(1000);
	//$("#canteenList").hide();
	
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyIdCsd",
		data : {
			"ProcessId"      : parseInt(ProcessId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			seteditReturnItemsCsd(r);
			//setCanteenonedit(r);
			
		}
	});

}


/********
 * @Code       :For edit setting templates 
 * **********/
function seteditReturnItemsCsd(res) {
	//var htm='';
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
		var mrnStatus=res.listCssd[i].mrnStatus;
		
		
		
		var machineId=res.listCssd[i].machineId;
		var machineName=res.listCssd[i].machineName;
		
		var processingName=res.listCssd[i].processingName;
		var processingId=res.listCssd[i].processingId;
		
		var conductedBy=res.listCssd[i].conductedBy;
		var receivedBy=res.listCssd[i].receivedBy;

		var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		var datetime2= new Date(res.listCssd[i].recievedDate).toLocaleDateString('en-GB');
		var datetime3= new Date(res.listCssd[i].processingDate).toLocaleDateString('en-GB');
		var datetime4= new Date(res.listCssd[i].reutrnDate).toLocaleDateString('en-GB');
		
		
		if(mrnStatus>=5)
			{
					$('#ApprovedByIncharge3').prop("disabled",true);
			}
	
	
		$('#txtmaterialReqaestNoteListDocIdReturn').val(processId);
		$('#txtMRNLocationNameReturn').val(deptName);
		$('#raisedBy').val(raisedBy);
		$('#receivedBy').val(receivedBy);
		$('#deptId').val(deptId);
		$('#txtmaterialReqaestNoteDocDateReturn').val(datetime);
		
		$('#recievedDate').val(datetime2);
		$('#processingDate').val(datetime3);
		$('#reutrnDate').val(datetime4);
		
		
		$('#machineId').val(machineId);
		$('#machineName').val(machineName);
		
		$('#processingId').val(processingId);
		$('#processingName').val(processingName);
		
		$('#conductedBy').val(conductedBy);
		
		
		$("#ItemInfoTable > tbody").empty();
		
/*		var temp="</td> <td><input type='text'  id='mrnActualItemQty"
		+ count
		+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
		+ sendQty
		+ "'></td>";*/
		
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var narration=res.listCssd[i].ltCssdSlave[k].narration;
	    	var returnQty=res.listCssd[i].ltCssdSlave[k].returnQty;
	    	var temp='';
	    	if(mrnStatus==1)
	    		{
	    		 temp=temp
	    			+"</td> <td><input type='text' readonly='' id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ sendQty
	    			+ "'></td>";
	    		}
	    	if(mrnStatus==4 || mrnStatus==5 ){
	    		 temp=temp
	    			+"</td> <td><input type='text' readonly='' id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ returnQty
	    			+ "'></td>";
	    	}
	    	
	    	$("#ItemInfoTableReturn > tbody")
			.append(
					" <tr id ='deleterows"
							+ count
							+ "' > <td> <input type='checkbox'  name='checkbox"
							+ count
							+ "' onclick='chkForAccept("
							+ count
							+ ")'  id='chkbox"
							+ count
							+ "'> </td> " 
							+"<td style='display:none'> <input type='hidden' id='salveId"
							+ count
							+ "' name='txtinventoryMaterailRequestNote'  value="
							+ processSlaveId
							+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;width:200px;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
							+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
							+ count
							+ "' "
							+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
							+ itemName
							+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
							+ count
							+ "' value="
							+ itemCode
							+ " /></div></td> <td><input type='text' readonly='' id='txtinventoryMaterailRequestNoteDocQuantity"
							+ count
							+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
							+ sendQty
							+ "'>" 
							
							+"<input type='hidden'  id='sendQtyHidden"
								+ count
								+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
								+ sendQty
								+ "'>" 
							
							+temp
	
									
							+"<td><input type='text' readonly='' id='txtIssuedQty"
							+ count
							+ "'  value='"
							+ pendingQty
							+ "' class='form-control input-SmallText' onkeyup='setpendingQty(this.id,"+count+")' ></td> "
						
							+"<td><input type='text' readonly='' id='txtcurrentSubInventoryStock"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ discardQty
							+ "' > </td>"
							
							+"<td><input type='text' readonly='' id='narration"
							+ count
							+ "'   class='form-control input-SmallText'  value='"
							+ narration
							+ "' > </td>");
								
	

	$("#txtMRNID").val(count);
	count++;
	test++;
	    	
	    }
	        
	}
	
	/*$('#DRRDiv').html(htm);*/
	
}





function AcceptItemsFromCsd() {

	var txtMRNID = $("#txtMRNID").val();
	
	var processId=	$("#txtmaterialReqaestNoteListDocIdReturn").val();
	//var mrnid=$('#mrnid').val();
	var txtDocDate = $("#txtMRNDateInList").val();
	
	var deptName = $("#txtMRNLocationNameReturn").val();
	var raisedBy = $("#raisedBy").val();
	var receivedBy = $("#receivedBy").val();
	var deptId = $("#deptId").val();
	var mrnDate=$("#txtmaterialReqaestNoteDocDateReturn").val();
	
	var recievedDate=$('#recievedDate').val();
	var processingDate=$('#processingDate').val();
	var reutrnDate=$('#reutrnDate').val();
	
	
	var machineId=$('#machineId').val();
	var machineName=$('#machineName').val();
	
	var processingId=$('#processingId').val();
	var processingName=$('#processingName').val();
	
	var conductedBy=$('#conductedBy').val();

	
	var dateParts = mrnDate.split("/");
	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	
	var dateParts2 = recievedDate.split("/");
	var dateObject2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
	
	var dateParts3 = processingDate.split("/");
	var dateObject3 = new Date(dateParts3[2], dateParts3[1] - 1, dateParts3[0]);
	
	var dateParts4 = reutrnDate.split("/");
	var dateObject4 = new Date(dateParts4[2], dateParts4[1] - 1, dateParts4[0]);
	

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Set Name");
		$("#deptName").focus();
		return false;

	}

	/* var sclMRNLocation = $("#sclMRNLocationInList option:selected").text(); */
	//var status = 'open';
	//var status = 1;
	var materiallist = {
			listCssd : []
	};

	var ltCssdSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var processSlaveId=$(
					"#salveId" + i)
					.val();;
		    
		    
			var itemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i)
					.val();
			
			
			var itemCode = $("#txtMRNItemcodeId" + i).val();
			
			
			var sendQty = $(
					"#txtinventoryMaterailRequestNoteDocQuantity" + i)
					.val();
			
			var pendingQty = $(
					"#txtIssuedQty" + i)
					.val();
			
			var recievedQty = $(
					"#mrnActualItemQty" + i)
					.val();
			
			var discardQty = $(
					"#txtcurrentSubInventoryStock" + i)
					.val();
			
			var narration = $(
					"#narration" + i)
					.val();
				
			returnQty=$(
					"#mrnActualItemQty" + i)
					.val();

	
			if (sendQty == "" || sendQty == null) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantity" + i)
						.focus();
				return false;

			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(sendQty)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtMRNDocQuantity" + i).val('');
				$("#txtMRNDocQuantity" + i).focus();
				return false;
			}

			ltCssdSlave.push({
				processSlaveId : processSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				pendingQty: pendingQty,
				recievedQty:recievedQty,
				discardQty:discardQty,
				returnQty:returnQty,
				deptName:deptName,
				deptId:deptId,
				narration:narration,
				mrnStatus:5				// for accept or complete
			});
			
	}
	
	
	materiallist.listCssd.push({
		processId     : processId,
		mrnDate  : dateObject,
		recievedDate:dateObject2,
		processingDate:dateObject3,
		reutrnDate:dateObject4,
		recievedDate2:new Date(),
		deptName:deptName,
		deptId:deptId,
		ltCssdSlave:ltCssdSlave,
		raisedBy:raisedBy,
		receivedBy:receivedBy,
		machineId:machineId,
		machineName:machineName,
		processingId:processingId,
		processingName:processingName,
		conductedBy:conductedBy,
		mrnStatus:5
	});
	
	
	materiallist = JSON.stringify(materiallist);

	var inputs = [];
	inputs.push('materiallist=' +  encodeURIComponent(materiallist));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/acceptItemsCsd",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(processId > 0){
				alert("Recieved Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}





function onapprovedCsd() {
	$("#indent").css("background-color", "");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");
	$("#approved").css("background-color", "#81A981");
	$("#availablestock").css("background-color", "");
	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");

	$("#stock").css("color", "");
	$("#approved").css("color", "white");
	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");
	$("#availablestock").css("color", "black");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");
	
	$("#lnlRet").css("background-color", "");
	$("#lnlRet").css("color", "black");
	getlistforApprovedItemsCsd();

}





function getlistforApprovedItemsCsd(){
	
	var subDept=$("#callfrom").val();
 	
 	var inputs = [];
 	inputs.push('subDept=' +  subDept);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistForApprovedItemsCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlandllistforApprovedItemsCsd(r);
			
		}
	});
}



function setlandllistforApprovedItemsCsd(res) {
	var result = '';

	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
	    var datetime2= new Date(res.listCssd[i].recievedDate).toLocaleDateString('en-GB');
	    result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				
				+ '	<td>'
				+ processId
				+ '</td> '
				
				+ '	<td>'
				+ datetime
				+ '</td> '
				
				
				+ '	<td>'
				+ datetime2
				+ '</td> '
				
				+ '	<td>'
				+ deptName
				+ '</td> '
				
				+ '	<td>'
				+ raisedBy
				+ '</td> '

				
				+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteListApproved" data-toggle="modal" class="btn btn-xs btn-success" onclick="ViewApprovedItemsCsd('
				+ processId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-eye View"></i></button></td>';
		
	/*	+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editReturnItems('
		+ mrnId
		+ ')" value="EDIT">'
		+ '<i class="fa fa-eye View"></i></button></td>';*/



	}
	$("#divlandlList").html(result); 

	$("#divlandlListApproved").html(result);    
}








function ViewApprovedItemsCsd(processId){
		
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistbyIdCsd",
		data : {
			"ProcessId"      : parseInt(processId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setViewApprovedItemsCsd(r);
			//setCanteenonedit(r);
			
		}
	});

}


/********
 * @Code       :For edit setting templates 
 * **********/
function setViewApprovedItemsCsd(res) {
	//var htm='';
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
		var mrnStatus=res.listCssd[i].mrnStatus;
		var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		


		$('#txtmaterialReqaestNoteListDocIdApproved').val(processId);
		$('#txtMRNLocationNameApproved').val(deptName);
		$('#raisedByApproved').val(raisedBy);
		$('#deptIdApproved').val(deptId);
		$('#txtmaterialReqaestNoteDocDateApproved').val(datetime);
		$("#ItemInfoTable > tbody").empty();
		
/*		var temp="</td> <td><input type='text'  id='mrnActualItemQty"
		+ count
		+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
		+ sendQty
		+ "'></td>";*/
		
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var narration=res.listCssd[i].ltCssdSlave[k].narration;
	    	var returnQty=res.listCssd[i].ltCssdSlave[k].returnQty;
	    	var temp='';
	    	if(mrnStatus==1)
	    		{
	    		 temp=temp
	    			+"</td> <td><input type='text' readonly='' id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ sendQty
	    			+ "'></td>";
	    		}
	    	if(mrnStatus==2 ){
	    		 temp=temp
	    			+"</td> <td><input type='text' readonly='' id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ recievedQty
	    			+ "'></td>";
	    	}
	    	
	    	$("#ItemInfoTable > tbody")
			.append(
					" <tr id ='deleterows"
							+ count
							+ "' > <td> <input type='checkbox'  name='checkbox"
							+ count
							+ "' onclick='chkForAccept("
							+ count
							+ ")'  id='chkbox"
							+ count
							+ "'> </td> " 
							+"<td style='display:none'> <input type='hidden' id='salveId"
							+ count
							+ "' name='txtinventoryMaterailRequestNote'  value="
							+ processSlaveId
							+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;width:200px;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
							+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
							+ count
							+ "' "
							+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
							+ itemName
							+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
							+ count
							+ "' value="
							+ itemCode
							+ " /></div></td> <td><input type='text' readonly='' id='txtinventoryMaterailRequestNoteDocQuantity"
							+ count
							+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
							+ sendQty
							+ "'>" 
							
							+"<input type='hidden'  id='sendQtyHidden"
								+ count
								+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()' value='"
								+ sendQty
								+ "'>" 
							
							+temp
	
									
							+"<td><input type='text' readonly='' id='txtIssuedQty"
							+ count
							+ "'  value='"
							+ pendingQty
							+ "' class='form-control input-SmallText' onkeyup='setpendingQty(this.id,"+count+")' ></td> "
						
							+"<td><input type='text' readonly='' id='txtcurrentSubInventoryStock"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ discardQty
							+ "' > </td>"
							
							+"<td><input type='text' readonly='' id='narration"
							+ count
							+ "'   class='form-control input-SmallText'  value='"
							+ narration
							+ "' > </td>");
								
	

	$("#txtMRNID").val(count);
	count++;
	test++;
	    	
	    }
	        
	}
	
	/*$('#DRRDiv').html(htm);*/
	
}






/********
 * @Code       : for Dashboard
 * **********/
function getlistforRequestedItemsDashboardCsd(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistForRequestedDashboardCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforRequestedItemsDashboardCsd(r);
			
		}
	});
}


function setlistforRequestedItemsDashboardCsd(res) {
	var result = '';

	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	    var color='';
	    if(parseInt(i+1)%2==0)
	    	{
	    	color="danger";
	    	}else
	    		{
	    		color="";
	    		}
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		result = result
				+ '<tr class="center '+color+' ">'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ processId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#Requestedqty").html(result);
}





/********
 * @Code       : for Dashboard
 * **********/
function getlistforProcessingItemsDashboardCsd(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistForProcessingDashboardCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforProcessingItemsDashboardCsd(r);
			
		}
	});
}



function setlistforProcessingItemsDashboardCsd(res) {
	var result = '';

	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	    var color='';
	    if(parseInt(i+1)%2==0)
	    	{
	    	color="danger";
	    	}else
	    		{
	    		color="";
	    		}
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		result = result
				+ '<tr class="center '+color+' ">'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ processId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#processQty").html(result);
}



/********
 * @Code       : for Dashboard
 * **********/
function getlistforDispachedItemsDashboardCsd(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistForDispachedDashboardCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforDispachedItemsDashboardCsd(r);
			
		}
	});
}



function setlistforDispachedItemsDashboardCsd(res) {
	var result = '';

	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	    var color='';
	    if(parseInt(i+1)%2==0)
	    	{
	    	color="danger";
	    	}else
	    		{
	    		color="";
	    		}
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		result = result
				+ '<tr class="center '+color+' ">'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ processId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#dispachedIndent").html(result);
}


/********
 * @Code       : for Dashboard
 * **********/
function getlistforCompletedItemsDashboardCsd(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getlistForCompletedDashboardCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforCompletedItemsDashboardCsd(r);
			
		}
	});
}



function setlistforCompletedItemsDashboardCsd(res) {
	var result = '';

	for ( var i = 0; i < res.listCssd.length; i++) {

		var mrnStatus=res.listCssd[i].mrnStatus;
		var processId = res.listCssd[i].processId;
		var deptId = res.listCssd[i].deptId;
	    var deptName =res.listCssd[i].deptName;
	    var raisedBy =res.listCssd[i].raisedBy;
	    var color='';
	    if(parseInt(i+1)%2==0)
	    	{
	    	color="danger";
	    	}else
	    		{
	    		color="";
	    		}
	   
	    var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		result = result
				+ '<tr class="center '+color+' ">'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ processId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#completeIndent").html(result);
}





function autoSuggestItemNameForEditCsd(inputID, typeauto,count) {
	
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemNamesOnlyAutoSuggestForCsdItems');
		inputs.push('txtVal=' + txtVal1);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "LaundryCssdServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 32) {
							alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$(
									"#itemNameEdit_"
											+ idValue1).val('');
							$(
									"#itemNameEdit_"
											+ idValue1).focus();

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {
			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;
			$("#itemIdEdit" + idValue).val(currentcode);
			//document.getElementById("itemName" + idValue ).disabled = true;
			getAvalQuantityEditCsd(count);
			// featch item sales Details for mrn item name

			var inputs = [];
			inputs.push('action=fetchItemSalesDetail');
			inputs.push('itemId=' + currentcode);
			inputs.push('isId=yes');
			var str = inputs.join('&');
			// docuemntAjaxResp
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					// alert(r);
					pobj1 = eval('(' + r + ')');

					$("#selItemQty_" + idValue).setTemplate(
							selInventorySalesDetailsTemplateforMRNList);
					$("#selItemQty_" + idValue).processTemplate(pobj1);

				}
			});

		}
	}

}



function getAvalQuantityEditCsd(count)
{
	var itemName=$("#itemNameEdit_"+count).val();
	var itemCode=$("#itemIdEdit"+count).val();
	var deptName=$("#deptNameEdit").val();
		
	var inputs = [];
	//inputs.push('action=getTotalAvlQty');
	inputs.push('itemName=' + itemName);
	inputs.push('itemCode=' + itemCode);
	inputs.push('deptName=' + deptName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdInventory/getAvalQuantityCsd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			$("#avlQtyEdit"+count).val(r);
			$("#avlQtyEditHidden"+count).val(r);
		}
	});

}


function setCancelValue()
{
	$('#updateRecods').prop("disabled",false);
	}



function onindentCssd() {
	// $("#showhideMrnMaintabs").show();
	$("#indent").css("background-color", "#81A981");
	$("#indent").css("color", "white");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");
	$("#stock").css("color", "black");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");

	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#availablestock").css("color", "black");
	$("#availablestock").css("background-color", "");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");
	
	$("#lnlRet").css("background-color", "");
	$("#lnlRet").css("color", "black");

}


function onloadindentCsd() {
	$("#indent").css("background-color", "#81A981");
	$("#indent").css("color", "white");
	$("#ConsumptionBY").hide();
}

function LnlReturn() {
	//$("#MrnReturn").show();
	$("#ConsumptionBY").hide();
	$("#lnlRet").css("background-color", "#81A981");
	$("#lnlRet").css("color", "white");
	$("#indent").css("background-color", "");
	$("#indent").css("color", "black");
	$("#mrn").css("color", "black");
	$("#recieved").css("color", "black");
	$("#stock").css("color", "black");
	$("#mrn").css("background-color", "");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");
	
	
	$("#mrnReturn").css("background", "");
	$("#mrnReturn").css("color", "black");

	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#availablestock").css("color", "black");
	$("#availablestock").css("background-color", "");

}


function getCssdReport(){

	var callfrom="";
	
	var letter=$("#byName").val();
	
	
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();
/*	var startDate1=0;
	var endDate2=0;
	
	var wardType=$('#wardType5').val();
	var docListBedWise=$('#docListBedWise').val();*/
	
	
	if(startDate=="" || startDate == null || startDate == isNaN(startDate) || 
			endDate=="" || endDate == null || endDate == isNaN(startDate)){
		 startDate=0;
		 endDate=0;
		 
	}else{
		
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd;
	    }
	    if(mm<10){
	        mm='0'+mm;
	    }

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(startDate);
	    var b = new Date(endDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(startDate==0 || startDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(endDate==0 || endDate==null)
		{
		alert("Please Select End Date");
		return false;
		}

		
		var dateAr = startDate.split('/');
		 startDate1 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
		 dateAr = endDate.split('/');
		 endDate2 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
	}
	//alert(startDate);
	//alert(endDate);
	
	//alert(wardType);
	//alert(docListBedWise);
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
				"startDate" : startDate,
				"endDate" : endDate
		},
		url : "ehat/inventory/getCssdReport",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setTempForCssdReport(r);
		}
	});

}

function setTempForCssdReport(res)
{
	var bulkTemp="";
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
	/*	var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;*/
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
	/*	var mrnStatus=res.listCssd[i].mrnStatus;*/
		
		
		
/*		var machineId=res.listCssd[i].machineId;
		var machineName=res.listCssd[i].machineName;
		
		var processingName=res.listCssd[i].processingName;
		var processingId=res.listCssd[i].processingId;
		
		var conductedBy=res.listCssd[i].conductedBy;*/
		var receivedBy=res.listCssd[i].receivedBy;
		if(receivedBy==null)
			{
			receivedBy="";
			}
	

		//var datetime= new Date(res.listCssd[i].mrnDate).toLocaleDateString('en-GB');
		var datetime= new Date(res.listCssd[i].mrnDate).toLocaleString('en-GB');
		
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var narration=res.listCssd[i].ltCssdSlave[k].narration;
	    	var returnQty=res.listCssd[i].ltCssdSlave[k].returnQty;
	    	
			bulkTemp=bulkTemp+"<tr>"
			+ "<td class='center TextFont' style='width: 5%;'>"+(i+1)+"</td>"
			+ "<td class='center TextFont' style='width: 5%;'>"+datetime+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>"+itemName+"</td>"		
			+ "<td class='center TextFont' style='width: 15%;'>"+sendQty+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>"+deptName+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>            </td>"
			+ "<td class='center TextFont' style='width: 15%;'>"+receivedBy+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>"+raisedBy+"</td></tr>";
			
		}
		$("#hallWiseData").html(bulkTemp);
	}
}




function getSubDeptToCssdReport(){

	var callfrom="";
	
	var letter=$("#byName").val();
	
	var subDept=$("#subDeptList").val();
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();
/*	var startDate1=0;
	var endDate2=0;
	
	var wardType=$('#wardType5').val();
	var docListBedWise=$('#docListBedWise').val();*/
	
	
	if(startDate=="" || startDate == null || startDate == isNaN(startDate) || 
			endDate=="" || endDate == null || endDate == isNaN(startDate)){
		 startDate=0;
		 endDate=0;
		 
	}else{
		
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd;
	    }
	    if(mm<10){
	        mm='0'+mm;
	    }

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(startDate);
	    var b = new Date(endDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(startDate==0 || startDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(endDate==0 || endDate==null)
		{
		alert("Please Select End Date");
		return false;
		}

		
		var dateAr = startDate.split('/');
		 startDate1 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
		 dateAr = endDate.split('/');
		 endDate2 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
	}
	//alert(startDate);
	//alert(endDate);
	
	//alert(wardType);
	//alert(docListBedWise);
	
	if(subDept==0)
		{
			alert("Select Sub Department");
			return false;
		}
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
				"startDate" : startDate,
				"endDate" : endDate,
				"subDept":subDept
		},
		url : "ehat/inventory/getCssdReport2",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setTempForCssdReport2(r);
		}
	});

}

function setTempForCssdReport2(res)
{
	var bulkTemp="";
	for ( var i = 0; i < res.listCssd.length; i++) {

		//var billId = res.lstmaster[i].billId;
	/*	var processId = res.listCssd[i].processId;	
		var deptId=res.listCssd[i].deptId;*/
		var deptName=res.listCssd[i].deptName;
		var raisedBy=res.listCssd[i].raisedBy;
		var mrnStatus=res.listCssd[i].mrnStatus;
		
		
		
/*		var machineId=res.listCssd[i].machineId;
		var machineName=res.listCssd[i].machineName;
		
		var processingName=res.listCssd[i].processingName;
		var processingId=res.listCssd[i].processingId;
		
		var conductedBy=res.listCssd[i].conductedBy;*/
		var receivedBy=res.listCssd[i].receivedBy;
		var dispachedBy="";
		var receivedBySubDep="";
		if(mrnStatus>=4)
			{
			dispachedBy=receivedBy;
			}
		if(mrnStatus==5)
		{
			receivedBySubDep=raisedBy;
		}
		
		if(receivedBy==null)
			{
			receivedBy="";
			}

		var datetime= new Date(res.listCssd[i].createdDate).toLocaleString('en-GB');
		
		var reutrnDate=res.listCssd[i].reutrnDate;
		if(reutrnDate==null)
			{
			reutrnDate="";
			}else
				{
				reutrnDate=new Date(reutrnDate).toLocaleDateString('en-GB');
				}
		
		
	    for(var k=0;k<res.listCssd[i].ltCssdSlave.length;k++){
	    	
	    	var processSlaveId=res.listCssd[i].ltCssdSlave[k].processSlaveId;
	    	
	    	
	    	var sendQty=res.listCssd[i].ltCssdSlave[k].sendQty;
	    	var pendingQty=res.listCssd[i].ltCssdSlave[k].pendingQty;
	    	var recievedQty=res.listCssd[i].ltCssdSlave[k].recievedQty;
	    	var discardQty=res.listCssd[i].ltCssdSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var itemCode=res.listCssd[i].ltCssdSlave[k].itemCode;
	    	var itemName=res.listCssd[i].ltCssdSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listCssd[i].ltCssdSlave[k].deptId;
	    	var recievedDate=res.listCssd[i].ltCssdSlave[k].recievedDate;
	    	var mrnStatus=res.listCssd[i].ltCssdSlave[k].mrnStatus;
	    	var narration=res.listCssd[i].ltCssdSlave[k].narration;
	    	var returnQty=res.listCssd[i].ltCssdSlave[k].returnQty;
	    	
			bulkTemp=bulkTemp+"<tr>"
			+ "<td class='center TextFont' style='width: 5%;'>"+(i+1)+"</td>"
			+ "<td class='center TextFont' style='width: 5%;'>"+datetime+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>"+itemName+"</td>"		
			+ "<td class='center TextFont' style='width: 10%;'>"+sendQty+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>            </td>"
			+ "<td class='center TextFont' style='width: 10%;'>"+raisedBy+"</td>"
			
			+ "<td class='center TextFont' style='width: 10%;'>"+receivedBy+"</td>"
			+ "<td class='center TextFont' style='width: 5%;'>"+reutrnDate+"</td>"
			
			+ "<td class='center TextFont' style='width: 10%;'>"+dispachedBy+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>"+receivedBySubDep+"</td></tr>";
			
		}
		$("#hallWiseData").html(bulkTemp);
	}
}


function getSubDepstList(){
	var callfrom="doctor";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url : "ehat/inventory/getSubInventory",
		success : function(r) {
			console.log(r);
			setSubDepstList(r);
		}
	});
}

function setSubDepstList(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.ltSubInventoryDTO.length; int++) {
		list=list+'<option value="'+(r.ltSubInventoryDTO[int].subinventory_name)+'">'+(r.ltSubInventoryDTO[int].subinventory_name)+'</option>';
		
	}	
	$("#subDeptList").html(list);
}




function printCssdReport(){
	
	var letter=$("#byName").val();
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();

	
	var wardType=$('#wardType5').val();
	var docListBedWise=$('#docListBedWise').val();
	var hallSlaveId=0;
	
	if(startDate=="" || startDate == null || startDate == isNaN(startDate) || 
			endDate=="" || endDate == null || endDate == isNaN(startDate)){
		 startDate=0;
		 endDate=0;
		 
	}else{
		
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd;
	    }
	    if(mm<10){
	        mm='0'+mm;
	    }

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(startDate);
	    var b = new Date(endDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(startDate==0 || startDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(endDate==0 || endDate==null)
		{
		alert("Please Select End Date");
		return false;
		}
		
	}

			window.open("ehat_cssd_reportPdf.jsp?"
			+"&fromDate="+startDate+"&toDate="+endDate);
		
}



function printCssdReport2(){
	
	var letter=$("#byName").val();
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();
	var subDept=$("#subDeptList").val();

	
	var wardType=$('#wardType5').val();
	var docListBedWise=$('#docListBedWise').val();
	var hallSlaveId=0;
	
	if(startDate=="" || startDate == null || startDate == isNaN(startDate) || 
			endDate=="" || endDate == null || endDate == isNaN(startDate)){
		 startDate=0;
		 endDate=0;
		 
	}else{
		
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd;
	    }
	    if(mm<10){
	        mm='0'+mm;
	    }

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(startDate);
	    var b = new Date(endDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(startDate==0 || startDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(endDate==0 || endDate==null)
		{
		alert("Please Select End Date");
		return false;
		}
		
	}
	
	if(subDept==0)
	{
		alert("Select Sub Department");
		return false;
	}

			window.open("ehat_cssd_reportPdf2.jsp?"
			+"&fromDate="+startDate+"&toDate="+endDate+"&subDept="+subDept);
		
}

//Add By Vishant
function getMatchine(){
	//alert("hii");
	var inputs = [];
	var txtVal1 = "a";
	// alert("text value is:"+txtVal1);
	//alert("txtVal1"+txtVal1);
		inputs.push('txtVal=' + txtVal1);
		var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/getMatchine",
		timeout : 1000 * 60 * 15,
		cache : true,
		success : function(r) {
			//alert(r.lstItemMaster[0].itemName);
			//var pobj1 = eval('(' + r + ')');
			var template="";
			for ( var i = 0; i < r.lstItemMaster.length; i++) {
				//alert(r.lstItemMaster[i].itemName);

				template = template + "<option id='' value='"
							+ r.lstItemMaster[i].id + "'>" + r.lstItemMaster[i].itemName + "</option>";
			}
			
			$("#machineName").append(template);
		
			//setSubDepstList(r);
		}
	});
}