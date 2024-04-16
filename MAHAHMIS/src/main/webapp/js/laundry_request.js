/********
 * @author     :Akshata Desai
 * @Code       : get next auto increment id
 * **********/
function getNextAutoMaterialRequestNoteIdInLIstLaundry() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "ehat/laundry/getNextAutoMaterialRequestNoteIdInLIstLaundry",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			// alert(r);
			$("#txtmaterialReqaestNoteDocIdInList").val(r);
		}
	});
}


function setclearPOPONAddLaundry() {
	$('#NewMRNForm').find('input:text').val('');

	$('#NewMRNForm').find('input:text').val('');
	$('#ItemInfoTableinLiST').find('input:text').val('');
	$('#NewMRNForm').find('textarea').val('');
	$("#ItemInfoTableinLiST > tbody").html('');
	$("#sclMRNLocationInList option:selected").text('');
	isNew = 0;
	count = 1;
	getNextAutoMaterialRequestNoteIdInLIstLaundry();
	
	/* set Defalut todays Date to date */
	var today = new Date();
	 
	var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    var today1 = dd+'/'+mm+'/'+yyyy;
    $("#txtMRNDateInList").val(today1);
    var inventory=$("#callfrom").val();
      $("#txtMRNLocationNameInList").val(inventory);
      $("#subInventoryId").val(2);
      
}

function setMaterialRequestInfoInListLaundry() {
	
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
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcodeInList_"
								+ count
								+ "'onkeyup='autoSuggestItemNameForLaundry(this.id,onchange,"+count+")' class='typeahead form-control input-SmallText'/>"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "'   /> <input type='hidden'  id='txtMRNItemcodeIdInList"
								+ count
								+ "'  value='0' /> </div></td> " 
								
								+"<td> <input type='text' readonly='' onkeypress='return validateNumbers(event)' id='avlQty"
								+ count
								+ "' class='form-control input-SmallText' />" 
								+"<input type='hidden' value=''  id='avlQtyHidden"
								+ count
								+ "' />"
								+"<input type='hidden' value=''  id='qtyBatchHidden"
								+ count
								+ "' />"
								+"</td> "
								
					
								+"<td> <input type='text' onkeypress='return validateNumbers(event)' id='txtinventoryMaterailRequestNoteDocQuantityInList"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='setMrnQty("+count+")'/> <input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"
								+ count
								+ "' value='0' class='form-control input-SmallText' /></td> " );
								
						
							/*	+"<td><select class='form-control input-SmallText' id='selItemQty_"
								+ count
								+ "'><option >Select</option></select></td>" +*/
				
		$("#txtMRNIDInList").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNIDInList").val();
		$("#totalRowInList").val(tblSubContractingCountRow1);
		autoSuggestItemNameForLaundry(
				"txtinventoryMaterailRequestNoteItemcodeInList_" + count,
				"onload",count);
		count++;

	}

}
function autoSuggestionForLaundryDep(){
	
}
/********
 * @author     : Akshata Desai
 * @Code       : Auto Suggestion for Item
 * **********/
function autoSuggestItemNameForLaundry(inputID, typeauto,count) {
	
	//alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		
		inputs.push('findingName=' + txtVal1);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "ehat/laundry/fetchItemNamesOnlyAutoSuggestForLaundryItems",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
						// alert(r.lstItemMaster.length);
						var availableTags = [];
						if (r.lstItemMaster.length == 0) {
							alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$(
									"#txtinventoryMaterailRequestNoteItemcodeInList_"
											+ idValue1).val('');
							$(
									"#txtinventoryMaterailRequestNoteItemcodeInList_"
											+ idValue1).focus();

						} else {
							//ajaxResponse = eval('(' + r + ')');
							// alert(r);
							ajaxResponse=r;

							for ( var i = 0; i < ajaxResponse.lstItemMaster.length; i++) {
								availableTags
										.push(ajaxResponse.lstItemMaster[i].itemName
												+ "_"
												+ ajaxResponse.lstItemMaster[i].id);
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

			$("#txtMRNItemcodeIdInList" + idValue).val(currentcode);
			document.getElementById("txtinventoryMaterailRequestNoteItemcodeInList_" + idValue ).disabled = true;
			getAvalQuantity(count);
			getBatchDetails(count);

		}
	}

}

/********
 * @author     : Akshata Desai
 * @Code       : Get Available Quantity
 * **********/
function getAvalQuantity(count)
{
	var itemName=$("#txtinventoryMaterailRequestNoteItemcodeInList_"+count).val();
	var itemCode=$("#txtMRNItemcodeIdInList"+count).val();
	var deptName=$("#txtMRNLocationNameInList").val();
	
		
	var inputs = [];
	inputs.push('itemName=' + itemName);
	inputs.push('itemCode=' + itemCode);
	inputs.push('deptName=' + deptName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getAvalQuantity",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert("Quantity---"+r);
			ajaxResponse = r;
			$("#avlQty"+count).val(r);
			$("#avlQtyHidden"+count).val(r);
			
		}
	});

}

/********
 * @author     : Akshata Desai
 * @Code       : Get Batch Details of item
 * **********/
function getBatchDetails(count)
{		
	var itemName=$("#txtinventoryMaterailRequestNoteItemcodeInList_"+count).val();
	var itemCode=$("#txtMRNItemcodeIdInList"+count).val();
	var deptName=$("#txtMRNLocationNameInList").val();
	
	var inputs = [];
	inputs.push('itemName=' + itemName);
	inputs.push('itemCode=' + itemCode);
	inputs.push('deptName=' + deptName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getBatchDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert("Batch---"+r);
			ajaxResponse = r;
			//$("#avlQty"+count).val(r);
			$("#qtyBatchHidden"+count).val(r);
			
		}
	});

}

function onloadindentLnl() {
	$("#indent").css("background-color", "#81A981");
	$("#indent").css("color", "white");
	$("#ConsumptionBY").hide();
}

/********
 * @author     :Akshata Desai
 * @Code       : get list 
 * **********/
function getAlllist(){
	var subDept=$("#callfrom").val();

 	var inputs = [];
 	inputs.push('subDept=' +  subDept);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlist",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlandllist(r);
			
		}
	});
}

/********
 * @author     : Akshata Desai
 * @Code       : Set MRN Quantity
 * **********/
function setMrnQty(count)
{
	
	var avlQty=$("#avlQtyHidden"+count).val();
	var sendQty=$("#txtinventoryMaterailRequestNoteDocQuantityInList"+count).val();
	if(parseInt(sendQty)>parseInt(avlQty))
		{
			alert("Wrong Quantity");
			$("#txtinventoryMaterailRequestNoteDocQuantityInList"+count).val(0);
			$("#avlQty"+count).val(avlQty);
			return false;
		}
	if(sendQty=="")
	{
		$("#txtinventoryMaterailRequestNoteDocQuantityInList"+count).val(0);
		$("#avlQty"+count).val(avlQty);
		return false;
	}
	
	avlQty=parseInt(avlQty)-parseInt(sendQty);
	$("#avlQty"+count).val(avlQty);
	}

/********
 * @author     : Akshata Desai
 * @Code       : Save laundry Material Request list
 * **********/

function saveMaterialRequestNoteInListLaundry() {
	// General In
	//var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteDocIdInList").val();
	var mrnid=$('#mrnid').val();
    var d = new Date();
    var mrnDate = d.toUTCString();	

	var txtDocDate = $("#txtMRNDateInList").val();
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
			listLL : []
	};

	var ltlandlSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var mrnItemInfoSlaveId=0;
			var txtMRNItemName = $(
					"#txtinventoryMaterailRequestNoteItemcodeInList_" + i)
					.val();
			
			
			var txtMRNItemcodeId = $("#txtMRNItemcodeIdInList" + i).val();
			
			
			var txtMRNDocQuantity = $(
					"#txtinventoryMaterailRequestNoteDocQuantityInList" + i)
					.val();
	
			var txtBatchId = $(
					"#qtyBatchHidden" + i)
					.val();
	
			if (txtMRNDocQuantity == "" || txtMRNDocQuantity == null || txtMRNDocQuantity ==0) {

				alert("Please enter Item quantity in " + i + " Row");
				$("#txtinventoryMaterailRequestNoteDocQuantityInList" + i)
						.focus();
				return false;

			}

			var pattern = /^[0-9]+$/;
			if (!pattern.test(txtMRNDocQuantity)) {
				alert("Item Quantity should be of digits in " + i + " Row");

				$("#txtMRNDocQuantity" + i).val('');
				$("#txtMRNDocQuantity" + i).focus();
				return false;
			}

			ltlandlSlave.push({
				mrnItemInfoSlaveId : mrnItemInfoSlaveId,
				itemName : txtMRNItemName,
				sendQty  : txtMRNDocQuantity,
				itemCode : txtMRNItemcodeId,
				batchId  :txtBatchId,
				deptName:txtMRNLocationName,
				deptId:subInventoryId,
				mrnStatus:1
			});
			
	}

	materiallist.listLL.push({
		mrnId     : mrnid,
		/*mrnDate  : new Date(),*/
		mrnDate:mrnDate,
		deptName:txtMRNLocationName,
		deptId:subInventoryId,
		mrnStatus:1,
		ltlandlSlave:ltlandlSlave,
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
		url : "ehat/laundry/save",
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
 * @author     :Akshata Desai
 * @Code       : set list 
 * **********/
function setlandllist(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	    var edit='';
	    var delet='';	
	     if(mrnStatus==1)
	    	 {
	      	edit=edit
	    	+ '<td><button id="btnEdit"  data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editMrnRequest('
			+ mrnId
			+ ')" value="EDIT">'
			+ '<i class="fa fa-edit"></i></button></td>';
	    	 }
	     else
	    	 {
	    	 	edit=edit
	    	 	+ '<td><button id="btnEdit" disabled data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editMrnRequest('
	    	 	+ mrnId
	    	 	+ ')" value="EDIT">'
	    	 	+ '<i class="fa fa-edit"></i></button></td>';
	    	 }
	    
	    
	    if(mrnStatus==1 || mrnStatus==4  )
	    	{
	    	delet=delet
			+ '<td><button id="btnDelete"  class="btn btn-xs btn-success" onclick="deleterecordById('
			+ mrnId
			+ ')" value="DELETE">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
	    	}
	    else
	    	{
	    	
	    	delet=delet
			+ '<td><button id="btnDelete" disabled class="btn btn-xs btn-success" onclick="deleterecordById('
			+ mrnId
			+ ')" value="DELETE">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
	    	}
	    
	    var status='';
		    if (mrnStatus == 1) {
			status = "NYA";
		} else if (mrnStatus == 2) {
			status = "InProcess";
		} else if (mrnStatus == 3) {
			status = "Dispached";
		} else if (mrnStatus == 4) {
			status = "Complete";
		}else if (mrnStatus == 5) {
			status = " Partial Complete";
		}
	   
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-GB');
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ mrnId
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
 * @author     :Akshata Desai
 * @Code       : To get reuqest List for laundary Department
 * **********/
function getlistforLLDept(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistForLNLDept",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlandllistforLLDept(r);
			
		}
	});
}

/********
 * @author     :Akshata Desai
 * @Code       : To set reuqest List for laundary Department
 * **********/
function setlandllistforLLDept(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	     var temp='';
	    if(mrnStatus==2 || mrnStatus==3)
    	{
			temp=temp
			+ '<td><button disabled="disabled" id="btnDelete'+(i+1)+'" class="btn btn-xs btn-success" onclick="deleterecordById('
			+ mrnId
			+ ')" value="Return">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
    	}
	    else
	    	{
	    	temp=temp
			+ '<td><button id="btnDelete'+(i+1)+'" class="btn btn-xs btn-success" onclick="deleterecordById('
			+ mrnId
			+ ')" value="Return">'
			+ '<i class="fa fa-trash-o"></i></button></td>';
	    	}
	
	    
			  var status='';
			    if (mrnStatus == 1) {
				status = "NYA";
			} else if (mrnStatus == 2) {
				status = "InProcess";
			} else if (mrnStatus == 3) {
				status = "Dispached";
			} else if (mrnStatus == 4) {
				status = "Complete";
			}else if (mrnStatus == 5) {
				status = "Partial Complete";
			}
	   
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ mrnId
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

				
				+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteList" data-toggle="modal" class="btn btn-xs btn-success" onclick="editMrnRequestforLLDept('
				+ mrnId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-edit"></i></button></td>'
				
				+ '<td><button id="btnEdit"  data-target="#MaterialRequestReturnList" data-toggle="modal" class="btn btn-xs btn-success" onclick="returnMrnRequest('
				+ mrnId
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
 * @author     :Akshata Desai
 * @Code       :For edit the Laundry details  
 * **********/


function editMrnRequestforLLDept(mrnId){

 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistbyId",
		data : {
			"mrnId"      : parseInt(mrnId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			seteditMrnRequestforLLDept(r);
			//setCanteenonedit(r);
			
		}
	});

}




/********
 * @author     :Akshata Desai
 * @Code       :For edit setting templates 
 * **********/
function seteditMrnRequestforLLDept(res) {
	var htm='';
	for ( var i = 0; i < res.listLL.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var mrnId = res.listLL[i].mrnId;	
		var deptId=res.listLL[i].deptId;
		var deptName=res.listLL[i].deptName;
		var raisedBy=res.listLL[i].raisedBy;
		var mrnStatus=res.listLL[i].mrnStatus;
		var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
		
		
		$('#txtmaterialReqaestNoteListDocId').val(mrnId);
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
	    for(var k=0;k<res.listLL[i].ltlandlSlave.length;k++){
	    	
	    	var mrnItemInfoSlaveId=res.listLL[i].ltlandlSlave[k].mrnItemInfoSlaveId;
	    	
	    	
	    	var sendQty=res.listLL[i].ltlandlSlave[k].sendQty;
	    	var pendingQty=res.listLL[i].ltlandlSlave[k].pendingQty;
	    	var recievedQty=res.listLL[i].ltlandlSlave[k].recievedQty;
	    	var discardQty=res.listLL[i].ltlandlSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listLL[i].ltlandlSlave[k].itemCode;
	    	var itemName=res.listLL[i].ltlandlSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listLL[i].ltlandlSlave[k].deptId;
	    	var recievedDate=res.listLL[i].ltlandlSlave[k].recievedDate;
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var narration=res.listLL[i].ltlandlSlave[k].narration;
	    	var recievedQtySubDept=res.listLL[i].ltlandlSlave[k].recievedQtySubDept;
	    	var totalRecievedQty=res.listLL[i].ltlandlSlave[k].totalRecievedQty;
	    	
	    	var batchId= res.listLL[i].ltlandlSlave[k].batchId;
	    	var temp='';
	    	if(mrnStatus==1)
	    		{
	    		 temp=temp
	    			+"</td> <td><input type='text'  id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' readonly='' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
	    			+ sendQty
	    			+ "'>" 
	    			+ "<input type='hidden'  id='reciveQtySubDept"+count+"' value='"+recievedQtySubDept+"'>" 
	    			+ "<input type='hidden'  id='totalRecievedQtyy"+count+"' value='"+totalRecievedQty+"'>" 
	    			+ "<input type='hidden'  id='batchid"+count+"' value='"+batchId+"'>" 
	    			+ "</td>";
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
							+ mrnItemInfoSlaveId
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
/********
 * @author     :Akshata Desai
 * @Code       :For Pending Quantity
 * **********/
function setpendingQty(id,count)
{
	var sendQty=$("#sendQtyHidden"+count).val();
	var remaingQty=$("#remainingHidden"+count).val();
	var descQty=$("#txtcurrentSubInventoryStock"+count).val();
	if(parseInt(descQty)>0)
		{
				var pendQty = $("#" + id).val();
			if (parseInt(pendQty) > parseInt(remaingQty)) {
				alert("Wrong Quantity");
				$("#" + id).val(0);
				sendQty=sendQty-descQty;
				$("#mrnActualItemQty" + count).val(sendQty);
				return false;
			}	
			if(pendQty=="")
			{
			$("#"+id).val(0);
			sendQty=sendQty-descQty;
			$("#mrnActualItemQty" + count).val(sendQty);
			$("#remainingHidden"+count).val(sendQty);
			return false;
			}
			remaingQty = remaingQty - pendQty;
			$("#mrnActualItemQty" + count).val(remaingQty);
		}
	
	else
		{
			var pendQty=$("#"+id).val();
			
			if(parseInt(pendQty) > parseInt(sendQty))
				{
					alert("Wrong Quantity");
					$("#"+id).val(0);
					$("#mrnActualItemQty"+count).val(sendQty);
					return false;
				}
			if(pendQty=="")
				{
				$("#"+id).val(0);
				sendQty=sendQty-descQty;
				$("#mrnActualItemQty" + count).val(sendQty);
				$("#remainingHidden"+count).val(sendQty);
				return false;
				}
			sendQty=sendQty-pendQty;
			$("#mrnActualItemQty"+count).val(sendQty);
			$("#remainingHidden"+count).val(sendQty);
			if(pendQty==0)
				{
				$("#narration"+count).val("-");
				}
		}

	
}

/********
 * @author     :Akshata Desai
 * @Code       :For Discard Quantity
 * **********/
function setDiscardQty(id,count)
{
	var sendQty = $("#sendQtyHidden" + count).val();
	var remaingQty=$("#remainingHidden"+count).val();
	var pendQty=$("#txtIssuedQty"+count).val();
	
	if(parseInt(pendQty)>0)
		{
			var discQty = $("#" + id).val();
		if (parseInt(discQty) > parseInt(remaingQty)) {
			alert("Wrong Quantity");
			$("#" + id).val(0);
			sendQty=sendQty-pendQty;
			$("#mrnActualItemQty" + count).val(sendQty);
			return false;
		}
		
		if(discQty=="")
		{
		$("#"+id).val(0);
		sendQty=sendQty-pendQty;
		$("#mrnActualItemQty" + count).val(sendQty);
		$("#remainingHidden"+count).val(sendQty);
		return false;
		}
		
		remaingQty = remaingQty - discQty;
		$("#mrnActualItemQty" + count).val(remaingQty);
		}
	else
 		{
		var discQty = $("#" + id).val();
		if (parseInt(discQty) > parseInt(sendQty)) {
			alert("Wrong Quantity");
			$("#" + id).val(0);
			$("#mrnActualItemQty"+count).val(sendQty);
			return false;
		}
		if(discQty=="")
		{
		$("#"+id).val(0);
		sendQty=sendQty-pendQty;
		$("#mrnActualItemQty" + count).val(sendQty);
		$("#remainingHidden"+count).val(sendQty);
		return false;
		}
		sendQty = sendQty - discQty;
		$("#mrnActualItemQty" + count).val(sendQty);
		$("#remainingHidden" + count).val(sendQty);
	}
	
}

/********
 * @author     :Akshata Desai
 * @Code       :For Approve Request
 * **********/

function ApproveRequest() {

	var txtMRNID = $("#txtMRNID").val();
	
	var mrnId=	$("#txtmaterialReqaestNoteListDocId").val();
	//var mrnid=$('#mrnid').val();
	var txtDocDate = $("#txtMRNDateInList").val();
	var deptName = $("#txtMRNLocationName").val();
	var raisedBy = $("#raisedBy").val();
	var deptId = $("#deptId").val();
	var mrnDate= $("#txtmaterialReqaestNoteDocDate").val();
	
	var dateParts = mrnDate.split("/");
	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Set Name");
		$("#deptName").focus();
		return false;

	}

	var materiallist = {
			listLL : []
	};

	var ltlandlSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var mrnItemInfoSlaveId=$(
					"#salveId" + i)
					.val();;
		    
		    
			var itemName = $(
					"#txtinventoryMaterailRequestNoteItemcode_" + i)
					.val();
			
			var batchId =$("#batchid" +i).val();
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

			ltlandlSlave.push({
				mrnItemInfoSlaveId : mrnItemInfoSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				pendingQty: pendingQty,
				recievedQty:recievedQty,
				discardQty:discardQty,
				batchId:batchId,
				narration:narration,
				deptName:deptName,
				deptId:deptId,
				mrnStatus:2
			});
			
	}
	
	
	materiallist.listLL.push({
		mrnId     : mrnId,
		mrnDate  : dateObject,
		recievedDate: new Date(),
		deptName:deptName,
		deptId:deptId,
		mrnStatus:2,
		ltlandlSlave:ltlandlSlave,
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
		url : "ehat/laundry/approveReuest",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(mrnId > 0){
				alert("Request Accepted Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}
/********
 * @author     :Akshata Desai
 * @Code       :For edit Request 
 * **********/

function editMrnRequest(mrnId){
	
 	var inputs = [];
 	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistbyId",
		data : {
			"mrnId"      : parseInt(mrnId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			seteditMrnRequest(r);
			
			
		}
	});

}
/********
 * @author     :Akshata Desai
 * @Code       :For set edit response
 * **********/
function seteditMrnRequest(res) {
	var htm='';
	for ( var i = 0; i < res.listLL.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var mrnId = res.listLL[i].mrnId;	
		var deptId=res.listLL[i].deptId;
		var deptName=res.listLL[i].deptName;
		var raisedBy=res.listLL[i].raisedBy;
		
		//var mrnDate=res.listLL[i].mrnDate;
		var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
	
		$('#txtmaterialReqaestNoteListDocId').val(mrnId);
		$('#txtMRNLocationName').val(deptName);
		$('#txtmaterialReqaestNoteDocDate').val(datetime);
		$('#raisedByUpdate').val(raisedBy);
		$('#deptIdUpdate').val(deptId);
		
		$("#ItemInfoTable > tbody").empty();
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listLL[i].ltlandlSlave.length;k++){
	    	
	    	var mrnItemInfoSlaveId=res.listLL[i].ltlandlSlave[k].mrnItemInfoSlaveId;
	    	
	    	
	    	var sendQty=res.listLL[i].ltlandlSlave[k].sendQty;
	    	var pendingQty=res.listLL[i].ltlandlSlave[k].pendingQty;
	    	var recievedQty=res.listLL[i].ltlandlSlave[k].recievedQty;
	    	var discardQty=res.listLL[i].ltlandlSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listLL[i].ltlandlSlave[k].itemCode;
	    	var itemName=res.listLL[i].ltlandlSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listLL[i].ltlandlSlave[k].deptId;
	    	var recievedDate=res.listLL[i].ltlandlSlave[k].recievedDate;
	    	
	    	
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
							+ mrnItemInfoSlaveId
							+ "  class='form-control input-SmallText'></td>  <td>"
							+ "<input type='text' id='itemNameEdit_"
							+ count
							+ "' "
							+ "onkeyup='autoSuggestItemNameForLaundryEdit(this.id,onchange,"+count+")' class='typeahead form-control input-SmallText'  value='"
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
							+ "' class='form-control input-SmallText' onkeyup='setMrnQtyForUpdate("+count+");' value='"
							+ 0
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
	getAvaQuantityForEdit(deptName);
	
	
}
/********
 * @author     :Akshata Desai
 * @Code       :For delete Request 
 * **********/
function deleterecordById(Id){
	var r = confirm("Are You Sure You Want To Delete Record?");
	if (r == true) {
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/deletebyId",
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
}
/********
 * @author     :Akshata Desai
 * @Code       :For get onload Approved list 
 * **********/
function onapprovedLnl() {
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
	getlistforApprovedItems();

}
/********
 * @author     :Akshata Desai
 * @Code       :For get Approved itemlist 
 * **********/
function getlistforApprovedItems(){
	
	var subDept=$("#callfrom").val();
 	
 	var inputs = [];
 	inputs.push('subDept=' +  subDept);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistForApprovedItems",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlandllistforApprovedItems(r);
			
		}
	});
}

/********
 * @author     :Akshata Desai
 * @Code       :For set Approved itemlist 
 * **********/

function setlandllistforApprovedItems(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	   
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
	    var datetime2= new Date(res.listLL[i].recievedDate).toLocaleDateString('en-IN');
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ mrnId
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

				
				+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteListApproved" data-toggle="modal" class="btn btn-xs btn-success" onclick="ViewApprovedItems('
				+ mrnId
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
/********
 * @author     :Akshata Desai
 * @Code       :For laundry Return itemlist 
 * **********/

function LnlReturn() {
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

/******
 * For returning Items to Sub Department *
 */
function returnMrnRequest(mrnId){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistbyId",
		data : {
			"mrnId"      : parseInt(mrnId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setReturnMrnRequest(r);
			
			
		}
	});

}


/********
 * @author     : Akshata Desai
 * @Code       : to get requested item list for dashboard
 * **********/
function getlistforRequestedItemsDashboard(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistForRequestedDashboard",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforRequestedItemsDashboard(r);
			
		}
	});
}


/********
 * @author     : Akshata Desai
 * @Code       : to get Processing item list for dashboard
 * **********/
function getlistforProcessingItemsDashboard(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistForProcessingDashboard",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforProcessingItemsDashboard(r);
			
		}
	});
}



/********
 * @author     : Akshata Desai
 * @Code       : to get Dispatched item list for dashboard
 * **********/
function getlistforDispachedItemsDashboard(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistForDispachedDashboard",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforDispachedItemsDashboard(r);
			
		}
	});
}




/********
 * @author     : Akshata Desai
 * @Code       : to get Completed item list for dashboard
 * **********/
function getlistforCompletedItemsDashboard(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistForCompletedDashboard",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlistforCompletedItemsDashboard(r);
			
		}
	});
}

/********
 * @author     : Akshata Desai
 * @Code       : to set Requested item list for dashboard
 * **********/

function setlistforRequestedItemsDashboard(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	    var color='';
	    if(parseInt(i+1)%2==0)
	    	{
	    	color="danger";
	    	}else
	    		{
	    		color="";
	    		}
	   
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
		result = result
				+ '<tr class="center '+color+' ">'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ mrnId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#Requestedqty").html(result);
}

/********
 * @author     : Akshata Desai
 * @Code       : to set Processing item list for dashboard
 * **********/
function setlistforProcessingItemsDashboard(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	    
	    if(parseInt(i+1)%2==0)
    	{
    	color="danger";
    	}else
    		{
    		color="";
    		}

	   
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
		result = result
				+ '<tr class="center '+color+'" >'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ mrnId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#processQty").html(result);
}

/********
 * @author     : Akshata Desai
 * @Code       : to set Dispatched item list for dashboard
 * **********/

function setlistforDispachedItemsDashboard(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	    
	    if(parseInt(i+1)%2==0)
    	{
    	color="danger";
    	}else
    		{
    		color="";
    		}

	   
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
		result = result
				+ '<tr class="center '+color+'">'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ mrnId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#dispachedIndent").html(result);
}

/********
 * @author     : Akshata Desai
 * @Code       : to set Completed item list for dashboard
 * **********/

function setlistforCompletedItemsDashboard(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	    
	    if(parseInt(i+1)%2==0)
    	{
    	color="danger";
    	}else
    		{
    		color="";
    		}

	   
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-IN');
		result = result
				+ '<tr class="center '+color+'">'
				+ '	<td>'
				+ (i + 1)
				+ '</td>'  
				
				
				+ '	<td>'
				+ mrnId
				+ '</td> '
				
	
				+ '	<td>'
				+ deptName
				+ '</td> ';
				
	}

	$("#completeIndent").html(result);
}

/********
 * @author     : Akshata Desai
 * @Code       : to get laundry report
 * **********/

function getLnlReport(){

	var callfrom="";
	
	var letter=$("#byName").val();
	
	
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();
	
	
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
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
				"startDate" : startDate,
				"endDate" : endDate
		},
		url : "ehat/laundry/getLnlReport",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setLnlReport(r);
		}
	});

}

function setLnlReport(res)
{
	var bulkTemp="";
	for ( var i = 0; i < res.listLL.length; i++) {
		
		var mrnId = res.listLL[i].mrnId;	
		var deptId=res.listLL[i].deptId;
		var deptName=res.listLL[i].deptName;
		var raisedBy=res.listLL[i].raisedBy;
		var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-GB');
		
		for(var k=0;k<res.listLL[i].ltlandlSlave.length;k++){
			
			var mrnItemInfoSlaveId=res.listLL[i].ltlandlSlave[k].mrnItemInfoSlaveId;
	    	var sendQty=res.listLL[i].ltlandlSlave[k].sendQty;
	    	var pendingQty=res.listLL[i].ltlandlSlave[k].pendingQty;
	    	var recievedQty=res.listLL[i].ltlandlSlave[k].recievedQty;
	    	var discardQty=res.listLL[i].ltlandlSlave[k].discardQty;
	    	var returnQty=res.listLL[i].ltlandlSlave[k].returnQty;
	    	
	    	//var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listLL[i].ltlandlSlave[k].itemCode;
	    	var itemName=res.listLL[i].ltlandlSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listLL[i].ltlandlSlave[k].deptId;
	    	var recievedDate=res.listLL[i].ltlandlSlave[k].recievedDate;
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var narration=res.listLL[i].ltlandlSlave[k].narration;
	    	var pendingQtyLnl=res.listLL[i].ltlandlSlave[k].pendingQtyLnl;
	    	
	    	var recievedQtySubDept=res.listLL[i].ltlandlSlave[k].recievedQtySubDept;
	    	var totalRecievedQty=res.listLL[i].ltlandlSlave[k].totalRecievedQty;
	    	
			bulkTemp=bulkTemp+"<tr>"
			+ "<td class='center TextFont' style='width: 5%;'>"+(i+1)+"</td>"
			+ "<td class='center TextFont' style='width: 5%;'>"+datetime+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>"+itemName+"</td>"
			
			+ "<td class='center TextFont' style='width: 7%;'>"+sendQty+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			
			+ "<td class='center TextFont' style='width: 7%;'>"+recievedQty+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			+ "<td class='center TextFont' style='width: 7%;'>"+totalRecievedQty+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			
			
			+ "<td class='center TextFont' style='width: 4%;'>"+pendingQtyLnl+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			+ "<td class='center TextFont' style='width: 4%;'>"+recievedQtySubDept+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td></tr>";
			
			

			
		}
		$("#hallWiseData").html(bulkTemp);	
	}
}

function printLnlReport(){
	
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

			window.open("ehat_lnl_reportPdf.jsp?"
			+"&fromDate="+startDate+"&toDate="+endDate);
		
	}

/********
 * @author     :Akshata Desai
 * @Code       :For edit setting templates 
 * **********/
function setReturnMrnRequest(res) {
	var htm='';
	for ( var i = 0; i < res.listLL.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var mrnId = res.listLL[i].mrnId;	
		var deptId=res.listLL[i].deptId;
		var deptName=res.listLL[i].deptName;
		var raisedBy=res.listLL[i].raisedBy;
		status=res.listLL[i].mrnStatus;
		var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-GB');
		var datetime2= new Date(res.listLL[i].recievedDate).toLocaleDateString('en-GB');
		
		if(status==1)
			{
				alert("First Accept Sub-Department Request");
				$('#returnItemsToSub').prop("disabled",true);
				return false;
			}
	
		$('#reurnMrnId').val(mrnId);
		$('#returndeptName').val(deptName);
		$('#raisedByReturn').val(raisedBy);
		$('#returndeptId').val(deptId);	
		$('#returnDate').val(datetime);
		$('#recievedDateReturn').val(datetime2);
		$("#ItemInfoTable > tbody").empty();
		
		var temp="</td> <td><input type='text'  id='mrnActualItemQty"
		+ count
		+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
		+ sendQty
		+ "'></td>";
		
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listLL[i].ltlandlSlave.length;k++){
	    	
	    	var mrnItemInfoSlaveId=res.listLL[i].ltlandlSlave[k].mrnItemInfoSlaveId;
	    	
	    	
	    	var sendQty=res.listLL[i].ltlandlSlave[k].sendQty;
	    	var pendingQty=res.listLL[i].ltlandlSlave[k].pendingQty;
	    	var recievedQty=res.listLL[i].ltlandlSlave[k].recievedQty;
	    	var discardQty=res.listLL[i].ltlandlSlave[k].discardQty;
	    	var returnQty=res.listLL[i].ltlandlSlave[k].returnQty;
	    	var batchId= res.listLL[i].ltlandlSlave[k].batchId;
	    	//var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listLL[i].ltlandlSlave[k].itemCode;
	    	var itemName=res.listLL[i].ltlandlSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listLL[i].ltlandlSlave[k].deptId;
	    	var recievedDate=res.listLL[i].ltlandlSlave[k].recievedDate;
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var narration=res.listLL[i].ltlandlSlave[k].narration;
	    	var pendingQtyLnl=res.listLL[i].ltlandlSlave[k].pendingQtyLnl;
	    	
	    	var recievedQtySubDept=res.listLL[i].ltlandlSlave[k].recievedQtySubDept;
	    	var totalRecievedQty=res.listLL[i].ltlandlSlave[k].totalRecievedQty;
	    	
	    	var temp='';
	    	var temp2='';
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
	    			+ "'>"
	    			
	    			+"<input type='hidden'  id='recieveQtyHidden"
					+ count
					+ "'  value='"
					+ recievedQty
					+ "'>"
					
					+" <input type='hidden' id='subDeptRecieveQty"+count+"' value='"+recievedQtySubDept+"' >"
					+" <input type='hidden' id='totalQtyRecieve"+count+"' value='"+totalRecievedQty+"' >"
					+" <input type='hidden' id='batchId"+count+"' value='"+batchId+"' >"
					
					+"</td>";
	    	}
	    	if(mrnStatus>=3)
	    		{
	    		$("#returnItemsToSub").prop("disabled", true);
	    		recievedQty=returnQty;
	    		}
	    	
	    	if(mrnStatus==5)
    		{
    		$("#returnItemsToSub").prop("disabled", false);
    		}
	    	
	    	if(mrnStatus==1 || mrnStatus==2)
	    		{
	    		temp2=temp2
	    		+"<td><input type='text' id='pendingQtyLnl"
				+ count
				+ "'   class='form-control input-SmallText' onkeyup='setReturnQty(this.id,"+count+")'  value='0"
				+ "'  > </td>";
	    		}
	    	
	    	if(mrnStatus>=3)
    		{
	    		temp2=temp2
	    		+"<td><input type='text' id='pendingQtyLnl"
				+ count
				+ "'   class='form-control input-SmallText' onkeyup='setReturnQty(this.id,"+count+")'  value='"
				+pendingQtyLnl+"'  > " 
				+ "<input type='hidden' id='pendingQtyLnlHiden"+count+"' value='"+pendingQtyLnl+"'>" 
				+ "</td>";
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
							+ mrnItemInfoSlaveId
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
							
							
							+"<td><input type='text' readonly='' id='returnQty"
							+ count
							+ "' class='form-control input-SmallText' onkeyup='setReurnQty2(this.id,"+count+")' value='" 
							+ recievedQty				//returnQty
							+ "'>" 
							+ "<input type='hidden' id='returnQtyHidden" 
							+ count
							+"' value='"+recievedQty+"'> </td>" 
							
									
							+"<td style='display:none;'><input type='text' id='txtIssuedQty"
							+ count
							+ "'  value='"
							+ pendingQty
							+ "' class='form-control input-SmallText' onkeyup='setpendingQty(this.id,"+count+")' readonly=''></td> "
						
							+"<td style='display:none;'><input type='text' id='txtcurrentSubInventoryStock"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ discardQty
							+ "' readonly=''> </td>"
							
							+"<td style='display:none;'><input type='text' id='narration"
							+ count
							+ "'   class='form-control input-SmallText'  value='"
							+ narration
							+ "' readonly='' > </td>"
							
							+temp2);
	    	
	    	if(mrnStatus==5)
	    		{
		    		$("#pendingQtyLnl"+count).prop("disabled", true);
		    		$("#returnQty"+count).prop("readonly", false);
	    		}
								

	$("#txtMRNID").val(count);
	count++;
	test++;

	    	
	    	
	    	
	    }
	    
	    
	}
	
	$('#DRRDiv').html(htm);
	
}
/********
 * @author     :Akshata Desai
 * @Code       :For refresh
 * **********/
function setreloadvalue()
{
	window.location.reload(true);
}

/********
 * @author     :Akshata Desai
 * @Code       :For set return Quantity
 * **********/
function setReurnQty(id,count)
{
	var returnQty=$("#"+id).val();
	var recivedQty=$("#recieveQtyHidden"+count).val();
	if(parseInt(returnQty) > parseInt(recivedQty))
		{
			alert("Wrong Quantity");
			$("#"+id).val(0);
			$("#mrnActualItemQty"+count).val(recivedQty);
			return false;
		}
		
	if(returnQty=="")
		{	
			$("#"+id).val(0);
			$("#mrnActualItemQty"+count).val(recivedQty);
			return false;
		}
	recivedQty=recivedQty-returnQty;
	
	
	$("#mrnActualItemQty"+count).val(recivedQty);
}


/********
 * @author     :Akshata Desai
 * @Code       :For retuern request
 * **********/
function returnRequest() {

	var txtMRNID = $("#txtMRNID").val();
	var mrnId=	$("#reurnMrnId").val();
	var txtDocDate = $("#txtmaterialReqaestNoteDocDate").val();
	var deptName = $("#returndeptName").val();
	var raisedBy = $("#raisedByReturn").val();
	var deptId = $("#returndeptId").val();
	var mrnDate=$("#returnDate").val();
	var recievedDate= $('#recievedDateReturn').val();

	
	var dateParts = mrnDate.split("/");
	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	
	var dateParts2 = recievedDate.split("/");
	var dateObject2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
	

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Sub Dept Name");
		$("#returndeptName").focus();
		return false;

	}

	var materiallist = {
			listLL : []
	};

	var ltlandlSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var mrnItemInfoSlaveId=$(
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
			var batchId = $(
					"#batchId" + i)
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
			
			pendingQtyLnl=$(
					"#pendingQtyLnl" + i)
					.val();
			
			recievedQtySubDept=$(
					"#subDeptRecieveQty" + i)
					.val();
			
			totalRecievedQty=$(
					"#totalQtyRecieve" + i)
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

			ltlandlSlave.push({
				mrnItemInfoSlaveId : mrnItemInfoSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				pendingQty: pendingQty,
				recievedQty:recievedQty,
				batchId:batchId,
				recievedQtySubDept:recievedQtySubDept,
				totalRecievedQty:totalRecievedQty,
				discardQty:discardQty,
				narration:narration,
				returnQty:returnQty,
				pendingQtyLnl:pendingQtyLnl,
				mrnStatus:3
			});
			
	}
	
	
	materiallist.listLL.push({
		mrnId     : mrnId,
		mrnDate  : dateObject,
		recievedDate:dateObject2,
		reutrnDate:new Date(),
		deptName:deptName,
		deptId:deptId,
		mrnStatus:3,
		ltlandlSlave:ltlandlSlave,
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
		url : "ehat/laundry/saveReturnRequest",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(mrnId > 0){
				alert("Returned Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}

/********
 * @author     :Akshata Desai
 * @Code       :For view approved items
 * **********/
function ViewApprovedItems(mrnId){
	
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistbyId",
		data : {
			"mrnId"      : parseInt(mrnId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setViewApprovedItems(r);
			
		}
	});

}


/********
 * @author     :Akshata Desai
 * @Code       :For View approved items templates 
 * **********/
function setViewApprovedItems(res) {
	//var htm='';
	for ( var i = 0; i < res.listLL.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var mrnId = res.listLL[i].mrnId;	
		var deptId=res.listLL[i].deptId;
		var deptName=res.listLL[i].deptName;
		var raisedBy=res.listLL[i].raisedBy;
		var mrnStatus=res.listLL[i].mrnStatus;
		var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-GB');
		


		$('#txtmaterialReqaestNoteListDocIdApproved').val(mrnId);
		$('#txtMRNLocationNameApproved').val(deptName);
		$('#raisedByApproved').val(raisedBy);
		$('#deptIdApproved').val(deptId);
		$('#txtmaterialReqaestNoteDocDateApproved').val(datetime);
		$("#ItemInfoTable > tbody").empty();
				
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listLL[i].ltlandlSlave.length;k++){
	    	
	    	var mrnItemInfoSlaveId=res.listLL[i].ltlandlSlave[k].mrnItemInfoSlaveId;
	    	
	    	
	    	var sendQty=res.listLL[i].ltlandlSlave[k].sendQty;
	    	var pendingQty=res.listLL[i].ltlandlSlave[k].pendingQty;
	    	var recievedQty=res.listLL[i].ltlandlSlave[k].recievedQty;
	    	var discardQty=res.listLL[i].ltlandlSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listLL[i].ltlandlSlave[k].itemCode;
	    	var itemName=res.listLL[i].ltlandlSlave[k].itemName;
	    	var batchId= res.listLL[i].ltlandlSlave[k].batchId;
	    	
	    	var deptId=res.listLL[i].ltlandlSlave[k].deptId;
	    	var recievedDate=res.listLL[i].ltlandlSlave[k].recievedDate;
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var narration=res.listLL[i].ltlandlSlave[k].narration;
	    	var returnQty=res.listLL[i].ltlandlSlave[k].returnQty;
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
							+ mrnItemInfoSlaveId
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
								
								+"<input type='hidden'  id='batchId"
								+ count
								+ "' class='form-control input-SmallText' value='"
								+ batchId
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
	
}

/********
 * @author     : Akshata Desai
 * @Code       : to get return item list
 * **********/
function getlistforReturnItems(){
	
	var deptName=$("#callfrom").val();
 	var inputs = [];
	inputs.push('deptName=' +  deptName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistbyDepName",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			setlandllistforReturnItems(r);
			
		}
	});
}

function setlandllistforReturnItems(res) {
	var result = '';

	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnStatus=res.listLL[i].mrnStatus;
		var mrnId = res.listLL[i].mrnId;
		var deptId = res.listLL[i].deptId;
	    var deptName =res.listLL[i].deptName;
	    var raisedBy =res.listLL[i].raisedBy;
	    var recievedDate2=res.listLL[i].recievedDate2;
	
	    var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-GB');
	    var datetime2= new Date(res.listLL[i].reutrnDate).toLocaleDateString('en-GB');
	    var datetime3;
	    if(recievedDate2==null)
    	{
	    	datetime3="";
    	}
    else{
    	  datetime3= new Date(res.listLL[i].recievedDate2).toLocaleDateString('en-GB');
    }
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				
				+ '	<td>'
				+ mrnId
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

				
				+ '<td><button id="btnEdit" data-target="#MaterialRequestNoteListReturn" data-toggle="modal" class="btn btn-xs btn-success" onclick="editReturnItems('
				+ mrnId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-eye View"></i></button></td>';




	}
	$("#divlandlList").html(result); 

	$("#divlandlListReturn").html(result);    
}

/********
 * @author     :Akshata Desai
 * @Code       :For accpet item in recive tab 
 * **********/
function editReturnItems(mrnId){

 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laundry/getlistbyId",
		data : {
			"mrnId"      : parseInt(mrnId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			console.log(r);
			seteditReturnItems(r);
			
			
		}
	});

}


/********
 * @author     :Akshata Desai
 * @Code       :For edit setting templates 
 * **********/
function seteditReturnItems(res) {
	//var htm='';
	for ( var i = 0; i < res.listLL.length; i++) {

		var mrnId = res.listLL[i].mrnId;	
		var deptId=res.listLL[i].deptId;
		var deptName=res.listLL[i].deptName;
		var raisedBy=res.listLL[i].raisedBy;
		var mrnStatus=res.listLL[i].mrnStatus;
		var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-GB');
		var datetime2= new Date(res.listLL[i].recievedDate).toLocaleDateString('en-GB');
		var datetime3= new Date(res.listLL[i].reutrnDate).toLocaleDateString('en-GB');
		
		if(mrnStatus>=4)
			{
					$('#ApprovedByIncharge3').prop("disabled",true);
			}
	
	
		$('#txtmaterialReqaestNoteListDocIdReturn').val(mrnId);
		$('#txtMRNLocationNameReturn').val(deptName);
		$('#raisedBy').val(raisedBy);
		$('#deptId').val(deptId);
		$('#txtmaterialReqaestNoteDocDateReturn').val(datetime);
		$('#recievedDate').val(datetime2);
		$('#reutrnDate').val(datetime3);
		$("#ItemInfoTable > tbody").empty();
		
		var temp="</td> <td><input type='text'  id='mrnActualItemQty"
		+ count
		+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value=' "
		+ sendQty
		+ "'></td>";
		
	
	    var rowCount=1;
	    var count = 1;
	    for(var k=0;k<res.listLL[i].ltlandlSlave.length;k++){
	    	
	    	var mrnItemInfoSlaveId=res.listLL[i].ltlandlSlave[k].mrnItemInfoSlaveId;
	    	
	    	
	    	var sendQty=res.listLL[i].ltlandlSlave[k].sendQty;
	    	var pendingQty=res.listLL[i].ltlandlSlave[k].pendingQty;
	    	var recievedQty=res.listLL[i].ltlandlSlave[k].recievedQty;
	    	var discardQty=res.listLL[i].ltlandlSlave[k].discardQty;
	    	
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listLL[i].ltlandlSlave[k].itemCode;
	    	var itemName=res.listLL[i].ltlandlSlave[k].itemName;
	    	var batchId= res.listLL[i].ltlandlSlave[k].batchId
	    	alert("batchId-----:"+batchId);
	    	var deptId=res.listLL[i].ltlandlSlave[k].deptId;
	    	var recievedDate=res.listLL[i].ltlandlSlave[k].recievedDate;
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var narration=res.listLL[i].ltlandlSlave[k].narration;
	    	var returnQty=res.listLL[i].ltlandlSlave[k].returnQty;
	    	var pendingQtyLnl=res.listLL[i].ltlandlSlave[k].pendingQtyLnl;
	    	var totalRecievedQty=res.listLL[i].ltlandlSlave[k].totalRecievedQty;
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
	    	if(mrnStatus==3 || mrnStatus==4 || mrnStatus==5){
	    		 temp=temp
	    			+"</td> <td><input type='text' readonly='' id='mrnActualItemQty"
	    			+ count
	    			+ "' class='form-control input-SmallText' onkeyup='setReicivedQty(this.id,"+count+")' value='"
	    			+ returnQty
	    			+ "'>"
	    			
	    			+ "<input type='hidden'  id='recievedQtyHidden"
	    			+ count
	    			+"' value='"
	    			+ returnQty
	    			+ "'>"
	    		 
	    			+ "<input type='hidden'  id='recievedQtyHidden2"
	    			+ count
	    			+"' value='"
	    			+ recievedQty
	    			+ "'>"
	    			
	    			+ "<input type='hidden'  id='batchId"
	    			+ count
	    			+"' value='"
	    			+ batchId
	    			+ "'>"

	    			
	    			+ "<input type='hidden'  id='totalRecievedQty"
	    			+ count
	    			+"' value='"
	    			+ totalRecievedQty
	    			+ "'>"
	    			+ "</td>";
	    	}
	    	
	    	$("#ItemInfoTable2 > tbody")
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
							+ mrnItemInfoSlaveId
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
								
								+ "<input type='hidden'  id='batchId"
				    			+ count
				    			+"' value='"
				    			+ batchId
				    			+ "'>"
							
							+temp
	
									
							+"<td style='display:none;'><input type='text' readonly='' id='txtIssuedQty"
							+ count
							+ "'  value='"
							+ pendingQty
							+ "' class='form-control input-SmallText' onkeyup='setpendingQty(this.id,"+count+")' ></td> "
						
							+"<td style='display:none;'><input type='text' readonly='' id='txtcurrentSubInventoryStock"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ discardQty
							+ "' > </td>"
							
							+"<td style='display:none;'><input type='text' readonly='' id='narration"
							+ count
							+ "'   class='form-control input-SmallText'  value='"
							+ narration
							+ "' > </td>"
							
							+"<td><input type='text' readonly='' id='pendingQtyLnl"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setDiscardQty(this.id,"+count+")' value='"
							+ pendingQtyLnl
							+ "' >" 
							+ "<input type='hidden' id='pendingLnlQtyHidden"+count+"' value='"+pendingQtyLnl+"' >" 
							+ " </td>"
							
							+"<td><input type='text'  id='remainQtyyy"
							+ count
							+ "'   class='form-control input-SmallText' onkeyup='setPeningRecieveQty(this.id,"+count+")' value='0"
							+ "' > </td>");
								
	

	$("#txtMRNID").val(count);
	count++;
	test++;
	    	
	    }
	        
	}
	
	
}

/********
 * @author     :Akshata Desai
 * @Code       :Accept Items From Laundry
 * **********/

function AcceptItemsFromLaundry() {

	var txtMRNID = $("#txtMRNID").val();
	
	var mrnId=	$("#txtmaterialReqaestNoteListDocIdReturn").val();
	var txtDocDate = $("#txtMRNDateInList").val();
	var deptName = $("#txtMRNLocationNameReturn").val();
	var raisedBy = $("#raisedBy").val();
	var deptId = $("#deptId").val();
	var mrnDate=$("#txtmaterialReqaestNoteDocDateReturn").val();
	var recievedDate=$("#recievedDate").val();
	var reutrnDate=$("#reutrnDate").val();
	var mrnStatus=4;
	
	
	var dateParts = mrnDate.split("/");
	var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	
	var dateParts2 = recievedDate.split("/");
	var dateObject2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
	
	
	var dateParts3 = reutrnDate.split("/");
	var dateObject3 = new Date(dateParts3[2], dateParts3[1] - 1, dateParts3[0]);
	

	if (deptName == "" || deptName == 0 ||  deptName==null || deptName==undefined) {

		alert("Please Enter Set Name");
		$("#deptName").focus();
		return false;

	}

	/* var sclMRNLocation = $("#sclMRNLocationInList option:selected").text(); */
	//var status = 'open';
	//var status = 1;
	var materiallist = {
			listLL : []
	};

	var ltlandlSlave =[];
	
	for ( var i = 1; i <= txtMRNID; i++) {

		    var mrnItemInfoSlaveId=$(
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
			
			var recievedQtySubDept = $(
					"#mrnActualItemQty" + i)
					.val();
			
			var totalRecievedQty = $(
					"#totalRecievedQty" + i)
					.val();
			
			totalRecievedQty=parseInt(totalRecievedQty)+parseInt(recievedQtySubDept);
			
			var recievedQty = $(
					"#recievedQtyHidden2" + i)
					.val();
			
			var discardQty = $(
					"#txtcurrentSubInventoryStock" + i)
					.val();
			
			var narration = $(
					"#narration" + i)
					.val();
			
			var batchId=$(
					"#batchId" + i)
					.val();
			
			returnQty=0;
			
			var pendingQtyLnl= $(
					"#pendingQtyLnl" + i)
					.val();
			
			if(parseInt(pendingQtyLnl)>0)
				{
				mrnStatus=5;
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

			ltlandlSlave.push({
				mrnItemInfoSlaveId : mrnItemInfoSlaveId,
				itemName : itemName,
				sendQty  : sendQty,
				itemCode : itemCode,
				pendingQty: pendingQty,
				recievedQty:recievedQty,
				batchId:batchId,
				recievedQtySubDept:recievedQtySubDept,
				totalRecievedQty:totalRecievedQty,
				discardQty:discardQty,
				returnQty:returnQty,
				deptName:deptName,
				deptId:deptId,
				narration:narration,
				pendingQtyLnl:pendingQtyLnl,
				mrnStatus:mrnStatus				// for accept or partial complete and Complete
			});
			
	}
	
	
	materiallist.listLL.push({
		mrnId     : mrnId,
		mrnDate  : dateObject,
		recievedDate:dateObject2,
		reutrnDate:dateObject3,
		recievedDate2:new Date(),
		deptName:deptName,
		deptId:deptId,
		mrnStatus:mrnStatus,		// for accept or complete
		ltlandlSlave:ltlandlSlave,
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
		url : "ehat/laundry/acceptItems",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alert("Saved Successfully");
				
			}else if(mrnId > 0){
				alert("Recieved Successfully");
				
			}
			
			window.location.reload(true);
			
		}
	});
}

/********
 * @author     :Akshata Desai
 * @Code       :Set Return Quntity
 * **********/
function setReturnQty(id,count)
{
	var lnlPendQty=parseInt($("#"+id).val());
	var returnQty= parseInt($("#returnQtyHidden"+count).val());
	if(lnlPendQty=="" || lnlPendQty==undefined || isNaN(lnlPendQty))
		{
		$("#"+id).val(0);
		$("#returnQty"+count).val(returnQty);
		return false;
		}
	
	if(lnlPendQty>returnQty)
		{
		alert("Pending Qty should not be greater than Retun Qty");
		$("#"+id).val(0);
		$("#returnQty"+count).val(returnQty);
		return false;
		}
	returnQty=returnQty-lnlPendQty;
	$("#returnQty"+count).val(returnQty);
		
}


/********
 * @author     :Akshata Desai
 * @Code       :Set Pending Recieve Quntity
 * **********/
function setPeningRecieveQty(id2,count)
{
	var remainQty=parseInt($("#"+id2).val());
	var recieveQty=parseInt($("#mrnActualItemQty"+count).val());
	var recievedQtyHidden=parseInt($("#recievedQtyHidden"+count).val());
	
	var pendingLnlQty=parseInt($("#pendingQtyLnl"+count).val());
	var pendingLnlQtyHidden=parseInt($("#pendingLnlQtyHidden"+count).val());
	
	if(remainQty=="" || remainQty==undefined || isNaN(remainQty) || remainQty==0)
	{
	$("#"+id2).val(0);
	$("#mrnActualItemQty"+count).val(recievedQtyHidden);
	$("#pendingQtyLnl"+count).val(pendingLnlQtyHidden);
	return false;
	}
	
	if(remainQty>recievedQtyHidden)
	{
	alert("Remaining Qty should not be greater than Recieved Qty");
	$("#"+id2).val(0);
	$("#mrnActualItemQty"+count).val(recievedQtyHidden);
	$("#pendingQtyLnl"+count).val(pendingLnlQtyHidden);
	return false;
	}
	recieveQty=recievedQtyHidden-remainQty;
	pendingLnlQty=pendingLnlQty+remainQty;
	$("#mrnActualItemQty"+count).val(recieveQty);
	$("#pendingQtyLnl"+count).val(pendingLnlQty);
}

/********
 * @author     :Akshata Desai
 * @Code       :Set Return Quntity
 * **********/

function setReurnQty2(id,count)
{
	var returnQty=parseInt($("#"+id).val());
	var pendingQtyLnlHiden=parseInt($("#pendingQtyLnlHiden"+count).val());
	

		if (returnQty == "" || returnQty == undefined || isNaN(returnQty)) {
		$("#" + id).val(0);
		$("#pendingQtyLnl" + count).val(pendingQtyLnlHiden);
		return false;
	}
	

		if (returnQty > pendingQtyLnlHiden) {
		alert("Return Qty  should not be greater than Pending Qty");
		$("#" + id).val(0);
		$("#pendingQtyLnl"+count).val(pendingQtyLnlHiden);
		return false;
	}
		pendingQtyLnlHiden=pendingQtyLnlHiden-returnQty;
		$("#pendingQtyLnl" +count).val(pendingQtyLnlHiden);
		
	
}

/********
 * @author     :Akshata Desai
 * @Code       :Get Laundry Report
 * **********/
function getLnlReport(){

	var callfrom="";
	
	var letter=$("#byName").val();
	
	
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();

	
	
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

	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
				"startDate" : startDate,
				"endDate" : endDate
		},
		url : "ehat/laundry/getLnlReport",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setLnlReport(r);
		}
	});

}

/********
 * @author     :Akshata Desai
 * @Code       :Set Laundry Report
 * **********/
function setLnlReport(res)
{
	var bulkTemp="";
	for ( var i = 0; i < res.listLL.length; i++) {
		
		var mrnId = res.listLL[i].mrnId;	
		var deptId=res.listLL[i].deptId;
		var deptName=res.listLL[i].deptName;
		var raisedBy=res.listLL[i].raisedBy;
		var datetime= new Date(res.listLL[i].mrnDate).toLocaleDateString('en-GB');
		
		for(var k=0;k<res.listLL[i].ltlandlSlave.length;k++){
			
			var mrnItemInfoSlaveId=res.listLL[i].ltlandlSlave[k].mrnItemInfoSlaveId;
	    	var sendQty=res.listLL[i].ltlandlSlave[k].sendQty;
	    	var pendingQty=res.listLL[i].ltlandlSlave[k].pendingQty;
	    	var recievedQty=res.listLL[i].ltlandlSlave[k].recievedQty;
	    	var discardQty=res.listLL[i].ltlandlSlave[k].discardQty;
	    	var returnQty=res.listLL[i].ltlandlSlave[k].returnQty;
	    	
	    	//var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var itemCode=res.listLL[i].ltlandlSlave[k].itemCode;
	    	var itemName=res.listLL[i].ltlandlSlave[k].itemName;
	    	
	    	
	    	var deptId=res.listLL[i].ltlandlSlave[k].deptId;
	    	var recievedDate=res.listLL[i].ltlandlSlave[k].recievedDate;
	    	var mrnStatus=res.listLL[i].ltlandlSlave[k].mrnStatus;
	    	var narration=res.listLL[i].ltlandlSlave[k].narration;
	    	var pendingQtyLnl=res.listLL[i].ltlandlSlave[k].pendingQtyLnl;
	    	
	    	var recievedQtySubDept=res.listLL[i].ltlandlSlave[k].recievedQtySubDept;
	    	var totalRecievedQty=res.listLL[i].ltlandlSlave[k].totalRecievedQty;
	    	
			bulkTemp=bulkTemp+"<tr>"
			+ "<td class='center TextFont' style='width: 5%;'>"+(i+1)+"</td>"
			+ "<td class='center TextFont' style='width: 5%;'>"+datetime+"</td>"
			+ "<td class='center TextFont' style='width: 15%;'>"+itemName+"</td>"
			
			+ "<td class='center TextFont' style='width: 7%;'>"+sendQty+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			
			+ "<td class='center TextFont' style='width: 7%;'>"+recievedQty+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			+ "<td class='center TextFont' style='width: 7%;'>"+totalRecievedQty+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			
			
			+ "<td class='center TextFont' style='width: 4%;'>"+pendingQtyLnl+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td>"
			
			+ "<td class='center TextFont' style='width: 4%;'>"+recievedQtySubDept+"</td>"
			+ "<td class='center TextFont' style='width: 10%;'>           </td></tr>";
			
			

			
		}
		$("#hallWiseData").html(bulkTemp);	
	}
}


/********
 * @author     :Akshata Desai
 * @Code       :Print Laundry Report
 * **********/

function printLnlReport(){
	
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

			window.open("ehat_lnl_reportPdf.jsp?"
			+"&fromDate="+startDate+"&toDate="+endDate);
		
	}
