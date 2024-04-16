//irfan khan 24-03-2017 to show Modal
function showPopUp(){
	$("#popUpProFeesVocher").show('show');
	hideShowTab();
}

//irfan khan 24-03-2017 to hide Modal
function hidePopUp(){
	$("#popUpProFeesVocher").hide('hide');
	$("#queryType").val("insert");
	$("#midHidden").val("0");
	resetCategory();
}

//irfan khan 24-03-2017 to fetch pharma category details
function fetchPharmaCategoryMasterDetails(){
	
	var inputs = [];
	inputs.push('action=fetchPharmaCategoryMaster');

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					$("#pharmaCatList").html(r);
					var data = eval('(' + r + ')');
					//alert(data.catList[1].categoryId);
					var pchtml = '<tr>';
					var rowCount = 0;
					for ( var i = 0; i < data.catList.length; i++) {
						rowCount = i + 1;
						pchtml = pchtml
								+ "<td class='col-md-1 center'>"
								+ rowCount
								+ "</td>'"
								+ "<td class='col-md-3'><div id='catName"
								+ data.catList[i].categoryId
								+ "'>"
								+ data.catList[i].categoryName
								+ "</div></td>"
								+ "<td class='col-md-1 center'><div id='chkDiv"
								+ data.catList[i].categoryId
								+ "'>"
								+ "<input type='checkbox' id='chk"+rowCount+"'>"
								+ "</div></td>"
								+ "<td class='col-md-2'><div><input type='text' id='catDiscount"+rowCount+"' onkeypress='return validateNumPer(event)' maxlength='5' placeholder='Discount in percent %'></div></td>"
								+ "<td class='col-md-2'><div>"
								+ "<input id='efdate"+rowCount+"' onclick='displayCalendar(document.getElementById(\"efdate"+rowCount+"\"),\"dd/mm/yyyy\",this)'" 
								+ "readonly='readonly' name='dob' type='text'"
								+ "placeholder='Date' class='form-control input-SmallText'></div></td>"
								+ "<input id='catId"+rowCount+"'"
								+ " type='hidden' value='"+ data.catList[i].categoryId+ "'>"
								+ "<input id='catIdSlave"+rowCount+"'"
								+ " type='hidden' value='0'>"
								+ "</tr>";
					}
					$("#pharmaCategoryTableBody").html(pchtml);
				}
			});
}

//irfan khan 24-03-2017 to hide and show pharmacy tab
function hideShowTab(){
	var checkBox = $('#chkPharmacy').is(":checked");
	if(checkBox){
		$("#pharmaTabLi").show('show');
	}else{
		$("#pharmaTabLi").hide('hide');
	}
	
	
}

//irfan khan 24-03-2017 to save/update sponsor category master and slave
function saveSponsorCategory(){
	var queryType = $("#queryType").val();
	var midHidden = $("#midHidden").val();
	var categoryName = $("#txtCategoryName").val();
	var aliasName = $("#txtAliasName").val();
	var effectiveFrom = $("#effectiveFromDate").val();
	var priceType = $("#selPriceType").val();
	var description = $("#txtDiscription").val();
	
	var opdFlagCON = $('#chkOpd').is(":checked");
	var ipdFlagCON = $('#chkIpd').is(":checked");
	var pharamacyFlagCON = $('#chkPharmacy').is(":checked");
	var pathologyFlagCON = $('#chkPatho').is(":checked");
	var radiologyFlagCON = $('#chkRadio').is(":checked");
	var diagoFlagCON = $('#chkDiago').is(":checked");
	
	var opdFlag = 0;
	var ipdFlag = 0;
	var pharmacyFlag = 0;
	var pathologoyFlag = 0;
	var radiologyFlag = 0;
	var diagoFlag = 0;
	
	var opdDiscount = $("#opdDiscount").val();
	var ipdDiscount = $("#ipdDiscount").val();
	var pharmacyDiscount = $("#pharmacyDiscount").val();
	var pathologyDiscount = $("#pathoDiscount").val();
	var radiologyDiscount = $("#radioDiscount").val();
	var diagoDiscount = $("#diagoDiscount").val();
	var chkCount = 0;
	var scList = {
			catList : []
		};
	
	if(categoryName == "" || categoryName == undefined ){
		alert("Enter Category Name!!!");
		SetFocus("txtCategoryName");
		return false;
	}else if(aliasName == "" || aliasName == undefined){
		alert("Enter Alias Name!!!");
		SetFocus("txtAliasName");
		return false;
	}else if(effectiveFrom == "" || effectiveFrom == undefined){
		effectiveFrom = "00/00/0000";
		/*alert("Please select Date!!!");
		SetFocus("effectiveFromDate");
		return false;*/
	}
	
	if(opdFlagCON){
		opdFlag = 1;
		chkCount++;
	}
	if(ipdFlagCON){
		ipdFlag = 1;
		chkCount++;
	}
	if(pharamacyFlagCON){
		pharmacyFlag = 1;
		chkCount++;
	}
	if(diagoFlagCON){
		diagoFlag = 1;
		chkCount++;
	}
	if(pathologyFlagCON){
		pathologoyFlag = 1;
		chkCount++;
	}
	if(radiologyFlagCON){
		radiologyFlag = 1;
		chkCount++;
	}
	
	if(chkCount <= 0){
		alert("Check atleast single service!!!");
		return false;
	}
	
	if(opdDiscount == "" || opdDiscount == undefined || opdDiscount < 0){
		opdDiscount = 0;
	}
	if(ipdDiscount == "" || ipdDiscount == undefined || ipdDiscount < 0){
		ipdDiscount = 0;
	}
	if(pharmacyDiscount == "" || pharmacyDiscount == undefined || pharmacyDiscount < 0){
		pharmacyDiscount = 0;
	}
	if(pathologyDiscount == "" || pathologyDiscount == undefined || pathologyDiscount < 0){
		pathologyDiscount = 0;
	}
	if(radiologyDiscount == "" || radiologyDiscount == undefined || radiologyDiscount < 0){
		radiologyDiscount = 0;
	}
	if(diagoDiscount == "" || diagoDiscount == undefined || diagoDiscount < 0){
		diagoDiscount = 0;
	}
	if (opdDiscount > 100 || ipdDiscount > 100 || pharmacyDiscount > 100
			|| pathologyDiscount > 100 || radiologyDiscount > 100 || diagoDiscount > 100) {
		alert("Discount can not be greater than 100% !!!");
		return false;
	}
	
	if (pharamacyFlagCON) {
		var chkFlagCount = 0;
		var rowsTable = $('#pharmaCategoryTableBody tr').length;
		if (rowsTable == undefined || rowsTable == 0) {
			alert("No Record Found");
			return false;
		}
		//var data1 = $("#pharmaCatList").html();
		//var data = eval('('+data1+')');
		for(var i=1;i<=rowsTable;i++){
			var chkCON = $('#chk'+i).is(":checked");
			if(chkCON){
				chkFlagCount++;
				var catIdUI = parseInt($("#catId"+i).val());
				var catDiscountUI = parseFloat($("#catDiscount"+i).val());
				var efDateUI = $("#efdate"+i).val();
				var catFlagUI = 1;
				var catIdSlave = $("#catIdSlave"+i).val();
				if(catDiscountUI == "" || catDiscountUI == undefined){
					catDiscountUI = 0;
				}
				if(catDiscountUI > 100){
					alert("Discount can not be greater than 100% !!!");
					SetFocus("catDiscouunt"+i);
					return false;
				}
				
				scList.catList.push({
					catIdUI : catIdUI,
					catDiscountUI : catDiscountUI,
					efDateUI : efDateUI,
					catFlagUI : catFlagUI,
					catIdSlave : catIdSlave
					
				});
				
			}
		}
		if(chkFlagCount <= 0){
			alert("Select atleast one category!!!");
			return false;
		}
	}
	scList = JSON.stringify(scList);
	
	
	var inputs = [];
	inputs.push('action=saveSponsorCategory');
	inputs.push("queryType=" + queryType);
	inputs.push("midHidden=" + midHidden);
	inputs.push("categoryName=" + categoryName);
	inputs.push("aliasName=" + aliasName);
	inputs.push("effectiveFrom=" + effectiveFrom);
	inputs.push("priceType=" + priceType);
	inputs.push("description=" + description);
	inputs.push("opdFlag=" + opdFlag);
	inputs.push("ipdFlag=" + ipdFlag);
	inputs.push("pharmacyFlag=" + pharmacyFlag);
	inputs.push("pathologoyFlag=" + pathologoyFlag);
	inputs.push("radiologyFlag=" + radiologyFlag);
	inputs.push("diagoFlag=" + diagoFlag);
	inputs.push("opdDiscount=" + opdDiscount);
	inputs.push("ipdDiscount=" + ipdDiscount);
	inputs.push("pharmacyDiscount=" + pharmacyDiscount);
	inputs.push("pathologyDiscount=" + pathologyDiscount);
	inputs.push("radiologyDiscount=" + radiologyDiscount);
	inputs.push("diagoDiscount=" + diagoDiscount);
	inputs.push("scList=" + encodeURIComponent(scList));

	//inputs.push("vocherDetails=" + encodeURIComponent(vocherDetails));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload();
			resetCategory();
		}
		});
}

//irfan khan 24-03-2017 to reset all fields
function resetCategory(){
	
	var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = (day) + "/" + (month) + "/" + now.getFullYear();
    
	$("#txtCategoryName").val("");
	$("#txtAliasName").val("");
	$("#effectiveFromDate").val(today);
	$("#selPriceType").val("MRP");
	$("#txtDiscription").val("");
	
	document.getElementById("chkOpd").checked = false;
	document.getElementById("chkIpd").checked = false;
	document.getElementById("chkPharmacy").checked = false;
	document.getElementById("chkPatho").checked = false;
	document.getElementById("chkRadio").checked = false;
	document.getElementById("chkDiago").checked = false;
	
	$("#opdDiscount").val("");
	$("#ipdDiscount").val("");
	$("#pharmacyDiscount").val("");
	$("#pathoDiscount").val("");
	$("#radioDiscount").val("");
	$("#diagoDiscount").val("");
	
	var tableCount = $('#pharmaCategoryTableBody tr').length;

	for ( var i = 0; i < tableCount; i++) {
			
			$("#chk" + (i+1)).prop("checked", false);
			$("#catDiscount" + (i+1)).val("");
			$("#efdate" + (i+1)).val("");
	}
	
	hideAndShow('Opd');
	hideAndShow('Ipd');
	hideAndShow('Pharmacy');
	hideAndShow('Diago');
	hideAndShow('Patho');
	hideAndShow('Radio');
	hideAndShow('Diago');
	
	//$('#pharmaCategoryTableBody').empty();
	
}

//irfan khan 24-03-2017 to hide/show discount fields
function hideAndShow(callFrom) {
	var checkBox = $('#chk' + callFrom).is(":checked");
	if (callFrom == "Opd") {
		if (checkBox) {
			$("#opdDiscount").show('show');
		} else {
			$("#opdDiscount").hide('hide');
		}
	} else if (callFrom == "Ipd") {
		if (checkBox) {
			$("#ipdDiscount").show('show');
		} else {
			$("#ipdDiscount").hide('hide');
		}
	} else if (callFrom == "Pharmacy") {
		if (checkBox) {
			$("#pharmacyDiscount").show('show');
		} else {
			$("#pharmacyDiscount").hide('hide');
		}
	} else if (callFrom == "Patho") {
		if (checkBox) {
			$("#pathoDiscount").show('show');
		} else {
			$("#pathoDiscount").hide('hide');
		}
	} else if (callFrom == "Radio") {
		if (checkBox) {
			$("#radioDiscount").show('show');
		} else {
			$("#radioDiscount").hide('hide');
		}
	} else if (callFrom == "Diago") {
		if (checkBox) {
			$("#diagoDiscount").show('show');
		} else {
			$("#diagoDiscount").hide('hide');
		}
	}

}


//Irfan khan @codeDate:28-Mar-2017 (Auto-Suggestion list for category_bill_master list)
function autoSuggestionCatMaster(inputID, onload, callFrom) {
	//alert(inputID+" "+onload+" "+callFrom);
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var auto = '';
	if (callFrom == "sponsorCat") {
		auto = 'sponsorCat';
	} 
	
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});
	function displayResult(item) {
		var doc_Id = item.value;
		$("#" + inputID).val((item.text).trim());
	}

}

//irfan khan 24-03-2017 to fetch category master list
function fetchCatMasterList(callFrom) {
	var catName = "";
	if(callFrom == "search"){
		catName = $("#byName").val();
		if(catName == ""){
			alert("Search Box is Empty!!!");
		}
	}
	
		var inputs = [];
		inputs.push('action=fetchCatMasterList');
		inputs.push('callFrom=' + callFrom);
		inputs.push('catName=' + catName);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				var data = eval('(' + r + ')');
				//alert(data.catList.length);
				var cathtml = "<tr>";
				
				for(var i=0;i<data.catList.length;i++){
					
					if(data.catList[i].categoryId == 1 || data.catList[i].categoryId == 2){
						cathtml = cathtml + "<td class='col-1 center'>"+(i+1)+"</td>"
						+"<td class='col-1 center'>"+data.catList[i].categoryId+"</td>"
						+"<td class='col-3 '>"+data.catList[i].categoryName+"</td>"
						+"<td class='col-2 '>"+data.catList[i].aliasName+"</td>"
						+"<td class='col-2 hidden'>"+data.catList[i].effectiveFrom+"</td>"
						+"<td class='col-1 '>"+data.catList[i].priceType+"</td>"
						+"<td class='col-1 '><button class='btn btn-xs btn-success' type='button' disabled='disabled' id='btnEditCatMaster"+(i+1)+"' onclick='editCatMasterDetails("+data.catList[i].categoryId+")'><i class='fa fa-edit'></i></button></td>"
						+"<td class='col-1 '><button class='btn btn-xs btn-danger' type='button' disabled='disabled' id='btnDeleteCatMaster"+(i+1)+"' onclick='deleteCatMaster("+data.catList[i].categoryId+")'><i class='fa fa-trash-o'></i></button></td>"
						+"</tr>";
					}else{
						cathtml = cathtml + "<td class='col-1 center'>"+(i+1)+"</td>"
						+"<td class='col-1 center'>"+data.catList[i].categoryId+"</td>"
						+"<td class='col-3 '>"+data.catList[i].categoryName+"</td>"
						+"<td class='col-2 '>"+data.catList[i].aliasName+"</td>"
						+"<td class='col-2 hidden'>"+data.catList[i].effectiveFrom+"</td>"
						+"<td class='col-1 '>"+data.catList[i].priceType+"</td>"
						+"<td class='col-1 '><button class='btn btn-xs btn-success' type='button' id='btnEditCatMaster"+(i+1)+"' onclick='editCatMasterDetails("+data.catList[i].categoryId+")'><i class='fa fa-edit'></i></button></td>"
						+"<td class='col-1 '><button class='btn btn-xs btn-danger' type='button' id='btnDeleteCatMaster"+(i+1)+"' onclick='deleteCatMaster("+data.catList[i].categoryId+")'><i class='fa fa-trash-o'></i></button></td>"
						+"</tr>";
					}
					
				}
				$("#catMaterOnloadTbody").html(cathtml);
			}
		});
}// function fetch catMater

//irfan khan 28-03-2017 to set master and slave details to update
function editCatMasterDetails(mid) {
	// alert(mid);
	$("#queryType").val("update");
	$("#midHidden").val(mid);
	
	var inputs = [];
	inputs.push('action=setCatMasterDetails');
	inputs.push('mid=' + mid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					var data = eval('(' + r + ')');
					// alert(data.catList.length);

					$("#txtCategoryName").val(data.catList[0].categoryName);
					$("#txtAliasName").val(data.catList[0].aliasName);
					$("#effectiveFromDate").val(data.catList[0].effectiveFrom);
					$("#selPriceType").val(data.catList[0].priceType);
					$("#txtDiscription").val(data.catList[0].description);

					if (data.catList[0].opdFlag == 1) {
						document.getElementById("chkOpd").checked = true;
						$("#opdDiscount").val(data.catList[0].opdDiscount);
					} else {
						document.getElementById("chkOpd").checked = false;
						$("#opdDiscount").val("");
					}
					if (data.catList[0].ipdFlag == 1) {
						document.getElementById("chkIpd").checked = true;
						$("#ipdDiscount").val(data.catList[0].ipdDiscount);
					} else {
						document.getElementById("chkIpd").checked = false;
						$("#ipdDiscount").val("");
					}

					if (data.catList[0].pathologoyFlag == 1) {
						document.getElementById("chkPatho").checked = true;
						$("#pathoDiscount").val(data.catList[0].pathologyDiscount);
					} else {
						document.getElementById("chkPatho").checked = false;
						$("#pathoDiscount").val("");
					}

					if (data.catList[0].radiologyFlag == 1) {
						document.getElementById("chkRadio").checked = true;
						$("#radioDiscount").val(data.catList[0].radiologyDiscount);
					} else {
						document.getElementById("chkRadio").checked = false;
						$("#radioDiscount").val("");
					}
					
					if (data.catList[0].diagoFlag == 1) {
						document.getElementById("chkDiago").checked = true;
						$("#diagoDiscount").val(data.catList[0].diagoDiscount);
					} else {
						document.getElementById("chkDiago").checked = false;
						$("#diagoDiscount").val("");
					}

					if (data.catList[0].pharmacyFlag == 1) {
						document.getElementById("chkPharmacy").checked = true;
						$("#pharmacyDiscount").val(data.catList[0].pharmacyDiscount);
						//alert("agaya!!!");
						var inputs = [];
						inputs.push('action=setCatSlaveDetails');
						inputs.push('mid=' + mid);
						var str = inputs.join('&');
						jQuery
								.ajax({
									async : true,
									type : "POST",
									data : str + "&reqType=AJAX",
									url : "AdminServlet",
									timeout : 1000 * 60 * 5,
									catche : false,
									error : function() {
										// alert("error");
									},
									success : function(r) {
										//alert(r);
										var data1 = eval('(' + r + ')');
										//var counter = 0;
										//var counter2 = 0;
										var tableCount = $('#pharmaCategoryTableBody tr').length;
										
										//alert(data1.catListSlave.length);
										//alert(tableCount);
										for ( var j = 1; j < tableCount; j++) {
											//counter++;
											//alert($("#catId" + counter).val()+"====="+ data1.catListSlave[counter2].catIdUI);
											for(var k=0;k < data1.catListSlave.length;k++){
												if (($("#catId" + j).val()) == data1.catListSlave[k].catIdUI) {
													$("#chk" + j).prop("checked", true);
													$("#catDiscount" + j).val(data1.catListSlave[k].catDiscountUI);
													$("#efdate" + j).val(data1.catListSlave[k].efDateUI);
													$("#catIdSlave" + j).val(data1.catListSlave[k].catIdSlave);
													break;
													//counter2++;
												} else {
													$("#chk" + j).prop("checked", false);
													$("#catDiscount" + j).val("");
													$("#efdate" + j).val("");
												}
											}
										
										}

									}
								});
					} else {
						document.getElementById("chkPharmacy").checked = false;
						$("#pharmacyDiscount").val("");
					}

					
					hideAndShow('Opd');
					hideAndShow('Ipd');
					hideAndShow('Pharmacy');
					hideAndShow('Patho');
					hideAndShow('Radio');
					hideAndShow('Diago');
					
					hideShowTab();
					showPopUp();

				}
			});
}

//irfan khan 28-03-2017 to delete cat master by masterid
function deleteCatMaster(mid){
	var inputs = [];
	inputs.push('action=deleteCatMaster');
	inputs.push("mid=" + mid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload();
			//resetCategory();
		}
		});
}



//@uthor -Manisha
//Date -25 March 2017
function fetchSponsorCategoryMaster(callForm,refTo){
	
	if(callForm == "PatientEdit"){
		
		var PatientType = refTo;
		
	}else{
		
		var PatientType = $("#refTo").val();
	}
	
		var inputs = [];
		inputs.push('action=fetchSponsorCategoryMaster');
		inputs.push("PatientType=" + PatientType);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// alert('error');
			},
			success : function(ajaxResponse) {
			$("#billCat").html(ajaxResponse);
			
			var obj = eval('(' + ajaxResponse + ')');
				setTimeout(function() {
					
					$("#billCategory").setTemplate(SponsorCategoryListTemp);
					$("#billCategory").processTemplate(obj);

				}, 5);
			}
		});
	
		if(callForm == "PatientEdit"){
			
			SetSponsorCategoryID();
			
		}
	setTimeout(function() {
	
		setSponserDetailsMsg();
	},2);
}

var SponsorCategoryListTemp = "{#foreach $T.catList as catList"
	+ "}<option value='{$T.catList.categoryId}'>{$T.catList.categoryName}</option>{#/for}";




function SetSponsorCategoryID(){
	
	divPi = $("#div1").html();
	var CatID = divPi1.objTreat.ipdBillCat;
	
setTimeout(function() {
	var ajaxResponse = $("#billCat").html();
	 
	var json2 = JSON.parse(ajaxResponse);
	
	for ( var i = 0; i < json2.catList.length; i++) {
		if (json2.catList[i].categoryId == CatID) {
			
		setTimeout(function() {
			$('#billCategory').val(json2.catList[i].categoryId);
		},5);
			break;
		  }
  	}
	},2);
}