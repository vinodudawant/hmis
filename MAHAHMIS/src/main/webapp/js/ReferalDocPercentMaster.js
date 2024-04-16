/* @author : Rohini Ambhore 
 @date: 28-feb-2024
 @reason : Autosuggestion for Refral doctor */
function setAutoSugForRefDoctorList(inputId, callFrom) {

	var letter = "";
	var specialisationId = 0;
	
	if (callFrom == "all") {
		letter = $("#"+inputId).val();
	}else if(callFrom == "profees"){
		letter = $("#"+inputId).val(); 
		specialisationId = $("#drDeptId").val();
	}

	var inputs = [];

	inputs.push('letter=' + letter);
	inputs.push('callFrom=' + callFrom);
	inputs.push('specialisationId=' + specialisationId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/profees/setAutoSugForDoctorList",
		url : "ehat/referaldoc/setAutoSugForRefDoctorList",
		
		success : function(r) {
			
			setTempAutoSugDocList(r, inputId,callFrom);
		}
	});
}


function setTempAutoSugDocList(response, id,callFrom) {
	var qty = id.slice(0, -1); 
	var myArray = response;

	$.widget(
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
	$("#" + id).mcautocomplete(
			{
				showHeader : true,
				columns : [{
					name : 'Doctor Name',
					width : '100px',
					
					valueField : 'doc_name'
				         }],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record' && ui.item.specialisationName != 'Found'	&& ui.item.depNm != '!!!!') {
						
						$('#'+id).val(ui.item.doc_name);
						$('#txtDoctorId').val(ui.item.doctor_ID);
						
				/*if(ui.item.specialisation.includes(",")){
							
							var specialisationArray = ui.item.specialisation.split(',');
							var namesArray = ui.item.specialisationName.split(',');

								var selectBox = $("#drDeptId");

								selectBox.empty();

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#drDeptId change.select2');
								selectBox.select2('val', specialisationArray[0]);
	                  }else{	              
						  $('#drDeptId').val(ui.item.specialisation);
						  
						  var specialisationArray = ui.item.specialisation.split(',');
							var namesArray = ui.item.specialisationName.split(',');

								var selectBox = $("#drDeptId");

								selectBox.empty();

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#drDeptId change.select2');
								selectBox.select2('val', specialisationArray[0]);
	                  }	*/
						
					}
					setAutoSugForDoctorList(id,callFrom);
					return false;
				},
				
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstDoctorDto.length);
					var result;
					if (!data || data.lstDoctorDto.length === 0 || !data.lstDoctorDto || data.lstDoctorDto.length === 0) {
					
						result = [ {							
							'doc_name' : 'No Record',							
						            } ];
					} else {
						result = data.lstDoctorDto;
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/*******************************************************************************
 * @author :Rohini Ambhore
 * @Date :28-02-2024
 * @Code :To save percentage from new UI for Referal Doctor
 ******************************************************************************/
function savePerMasterForRefDoc() {
	var unitId = $("#unitId").val();
	var doctorId = $("#txtDoctorId").val();
	var callFrom = $("#callFrom").val();
	var caseType = $("input[name=refByRadio]:checked").val();
	
	var paymentType = $("input[name=refParentage]:checked").val();
	
	var drDeptId = $("#drDeptId").val();

	var chargesId = $("#lisH0").val();
	var chargesSlaveId = 0;
	var liSize = $("#dynamicItemsinfo li").length;
	chargesSlaveId = $("#lisH" + (liSize - 1)).val();

	if (unitId == null || unitId == undefined || unitId == "") {
		unitId = 0;
	}

	if (doctorId == null || doctorId == undefined || doctorId == "") {
		doctorId = 0;
	}

	if (chargesId == null || chargesId == undefined || chargesId == "") {
		chargesId = 0;
	}

	if (chargesSlaveId == null || chargesSlaveId == undefined
			|| chargesSlaveId == "") {
		chargesSlaveId = 0;
	}

	if (drDeptId == null || drDeptId == undefined || drDeptId == "") {
		drDeptId = 0;
	}

	if(unitId == 0){
		chargesId = 0;
		chargesSlaveId = 0;
		caseType = 0;
		paymentType = 0;
	}
	var percentMasterList = {
		listPerMaster : []
	};

	$(".dept").each(function() {
		var deptid = parseInt($(this).val());
		// console.log("-------------Dept Start"+deptid+"---------------");

		var serIdList = $(".dept" + deptid + "ServId").map(function() {
	
			return $(this).val();
		}).get();

		var serIdListPer = $(".dept" + deptid + "ServPer").map(function() {
			
			if($(this).val() == ""  || $(this).val() == null || $(this).val() == undefined){
				$(this).val(0);
			}
			return $(this).val();
		}).get();

				var subSerIdList = $(".dept" + deptid + "SubId").map(function() {

			return $(this).val();
		}).get();

		console.log("a====="+subSerIdList);
		var subSerIdListPer = $(".dept" + deptid + "SubPer").map(function() {

			if($(this).val() == ""  || $(this).val() == null || $(this).val() == undefined){
				$(this).val(0);
			}
			return $(this).val();
		}).get();

		percentMasterList.listPerMaster.push({
			deptId : deptid,
			unitId : unitId,
			doctorId : doctorId,
			caseType : caseType,
			chargesId : chargesId,
			chargesSlaveId : chargesSlaveId,
			drDeptId : drDeptId,
			serIdList : serIdList,
			serIdListPer : serIdListPer,			
			subSerIdList : subSerIdList,
			subSerIdListPer : subSerIdListPer		
		});

	});

	percentMasterList = JSON.stringify(percentMasterList);

	var inputs = [];
	inputs.push("percentMasterList=" + encodeURIComponent(percentMasterList));
	inputs.push("doctorId=" + doctorId);
	inputs.push("unitId=" + unitId);
	inputs.push("callFrom=" + callFrom);
	inputs.push("caseType=" + caseType);
	inputs.push("paymentType=" + paymentType);
	inputs.push("drDeptId=" + drDeptId);
	inputs.push("chargesId=" + chargesId);
	inputs.push("chargesSlaveId=" + chargesSlaveId);

	var str = inputs.join('&');

	$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/profees/savePercentMaster2",
		url : "ehat/referaldoc/savePerMasterForRefDoc", 
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			$('#pleaseWait').hide();
			resetProfeesPercentMaster();
			$("#callFrom").val("insert");
			window.location.reload(true);
		}
	});
}

function getDrForRefDocDeptList(callFrom) {

	resetProfeesPercentMasterNew();
	getRefDrPersonalList('doctorPersonal','onclick');
	return false;
	
	$("#tabNo").val(1);
	var letter="";
	if(callFrom == "search"){
	 letter= $("#byName2").val();
	}else{
		$("#byName2").val("");
	}	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callFrom" : callFrom,
			"letter" : letter
		},
		//url : "ehat/profees/fetchConfgDrDeptList",
		url : "ehat/referaldoc/getDrForRefDocDeptList",
		

		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			var htm = "";		    
			htm= '<thead id="popupheader">'
				+'<tr>'
				+ '<th class="col-md-1 center" style="height : 21.5px;"><div class="TextFont">#</th>'
				+ '<th class="col-md-4 "  style="height: 21.5px;"><div class="TextFont">Dr.Dept Name</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Dr.Dept Id</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Unit Id</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Case Type</th>'
				+ '<th class="col-md-2 center"  style="height: 21.5px;"><div class="TextFont">Edit</th>'
				+ '<th class="col-md-2 center" 	style="height: 21.5px;"><div class="TextFont">Delete</th>'
				+ '</tr></thead>';
			
			for ( var i = 0; i < r.listPerMaster.length; i++) {
				htm = htm
				+ "<tr  id='trli"+(i + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (i+1)
				+ "</td>"
				+"<td class='col-md-4-1 ' id='drDeptName"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].drDeptName
				+ "</td><td col-md-1-1 center' id='drDeptId"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].drDeptId
				+ "</td>"
				
				+ "<td col-md-1-1 center' id='unitId"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].unitId
				+ "</td>"
				+ "<td col-md-1-1 center' id='caseType"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].caseType
				+ "</td>"
				
				+"<td class='col-md-2 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success' onclick='updateDrDeptPercentMaster("
				+ r.listPerMaster[i].drDeptId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType
				+",\"D\"),fetchSuperCatPrcentMaster("+r.listPerMaster[i].chargesSlaveId+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-2 center' style='height: 21.5px;'><button class='btn btn-xs btn-success' onclick='deleteForDrDeps("
				+ r.listPerMaster[i].drDeptId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType+")' ><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$("#popupDiv").html(htm);
		}
	});
}


function getRefDrPersonalList(callFrom,callSearch) {
	 
		if (callFrom == "doctorPersonal") {
			$("#tabNo").val(2);
		} else if (callFrom == "groupPersonal") {
			$("#tabNo").val(3);
		}
		
		var letter="";
		if(callSearch == "search"){
		 letter= $("#byName2").val();
		}else{
			$("#byName2").val("");
		}
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {"callFrom":callFrom,
				"callSearch":callSearch,
				"letter" : letter},
			//url : "ehat/profees/fetchConfgDrPersonalList",
				url : "ehat/referaldoc/getRefDrPersonalList",
			error : function() {
				alert('error');
			},
			success : function(r) {
								
				var htm = "";
				
				htm= '<thead id="popupheader">'
					+'<tr>'
					+ '<th class="col-md-1 center" style="height : 21.5px;"><div class="TextFont">#</th>'
					+ '<th class="col-md-3 "  style="height: 21.5px;"><div class="TextFont">Doctor Name</th>'
					+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Doctor Id</th>'
					+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">DrDept Id</th>'
					+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Sponser Name</th>'				
					+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Unit Id</th>'
					+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Case Type</th>'
					+ '<th class="col-md-2 center"  style="height: 21.5px;"><div class="TextFont">Edit</th>'
					+ '<th class="col-md-2 center" 	style="height: 21.5px;"><div class="TextFont">Delete</th>'
					+ '</tr></thead>';
				
				for ( var i = 0; i < r.listPerMaster.length; i++) {
					htm = htm
					+ "<tr  id='trli"+(i + 1)+"'>" 
					+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
					+ (i+1)
					+ "</td>"
					+"<td class='col-md-3-1 ' id='doctorName"
					+ (i + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listPerMaster[i].doctorName
					+ "</td><td col-md-1-1 center' id='doctorId"
					+ (i + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listPerMaster[i].doctorId
					+ "</td>"
					+ "<td col-md-1-1 center' id='drDeptId"
					+ (i + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listPerMaster[i].drDeptId
					+ "</td>"
					
					+ "<td col-md-1-1 center' id='sponserName"
					+ (i + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listPerMaster[i].sponserName
					+ "</td>"
					
					+ "<td col-md-1-1 center' id='unitId"
					+ (i + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listPerMaster[i].unitId
					+ "</td>"
					+ "<td col-md-1-1 center' id='caseType"
					+ (i + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listPerMaster[i].caseType
					+ "</td>"
					
					+"<td class='col-md-2 center'style='height: 21.5px;'>"
				
					//+ "<button class='btn btn-xs btn-success' onclick=editPercentMasterNew("
					+ "<button class='btn btn-xs btn-success' onclick=editPercentMasterReferal("
					+ r.listPerMaster[i].doctorId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType
					+","+r.listPerMaster[i].drDeptId+","+r.listPerMaster[i].chargesSlaveId+",'Edit'),fetchSuperCatPrcentMasterReferal('Edit',"+r.listPerMaster[i].chargesSlaveId+")  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
								
					+"<td class='col-md-2 center' style='height: 21.5px;'><button class='btn btn-xs btn-success' onclick='deleteReferalDoctAndGroup("
					+ r.listPerMaster[i].doctorId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType+","+r.listPerMaster[i].chargesSlaveId+")' ><i class='fa fa-trash-o'></i></button></td></tr>";
				}
				$("#popupDiv").html(htm);
			}
		});
	}


function deleteReferalDoctAndGroup(docId,unitId,caseType,chargesSlaveId){
	
	var r = confirm("Are You Sure You Want To Delete Temp Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/referaldoc/deleteReferalDoctAndGroupById",
			data : {
				"docId" : docId,
				"unitId" : unitId,
				"caseType" : caseType,
				"chargesSlaveId" : chargesSlaveId
			},
			error	: function() {
				alert('error');
			},
			success : function(response) {
			
				fetchConfgDrPersonalList("doctorPersonal","auto");
			}
		});
	}
}



//Rohini Ambhore added

//function editPercentMasterNew(doctorId,unitId,caseType,drDeptId,chargesSlaveId,callFrom){
function editPercentMasterReferal(doctorId,unitId,caseType,drDeptId,chargesSlaveId,callFrom){

	getAllChargeslave();
	getdoctorNameOfRef(doctorId);
	var inputs = [];
	inputs.push("doctorId=" + doctorId);
	inputs.push("unitId=" + unitId);
	inputs.push("caseType=" + caseType);
	inputs.push("chargesSlaveId=" + chargesSlaveId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/profees/editPercentMaster",
		url : "ehat/referaldoc/editPercentMasterReferal",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var doctorName;
			var chargesId=0;
			var chargesSlaveId=0;
			var rupay = "";
			
			for(var i=0;i<r.listPerMaster.length;i++){
				chargesId = r.listPerMaster[i].chargesId;
				chargesSlaveId = r.listPerMaster[i].chargesSlaveId;
			
                 if (r.listPerMaster[i].serviceId != 0) {
					$("#thDeptPer_" + r.listPerMaster[i].deptId).val(r.listPerMaster[i].hospPercent);
					//tdServicePer_2_11
					$("#tdServicePer_" + r.listPerMaster[i].deptId+"_"+r.listPerMaster[i].serviceId).val(r.listPerMaster[i].hospPercent);			
					doctorId = r.listPerMaster[i].doctorId;
					doctorName = r.listPerMaster[i].doctorName;
					unitId = r.listPerMaster[i].unitId;
					caseType = r.listPerMaster[i].caseType;
					rupay = r.listPerMaster[i].percentrupay;
					paymentType = r.listPerMaster[i].paymentType;
				} else {
					//$("#tdServicePer_" + r.listPerMaster[i].deptId + "_" + r.listPerMaster[i].serviceId).val(r.listPerMaster[i].hospPercent);
					$("#thDeptPer_" + r.listPerMaster[i].deptId).val(r.listPerMaster[i].hospPercent);
					rupay = r.listPerMaster[i].percentrupay;	
					paymentType = r.listPerMaster[i].paymentType;
					//$("#r").val(r.listPerMaster[i].hospPercent);
				}
			}
			$("#unitId").val(unitId);
			//$("#doctorName").val(doctorName);
			$("#txtDoctorId").val(doctorId);
			$("#unitId").prop("disabled","true");
			$("#doctorName").prop("disabled","true");
			$("#callFrom").val("update");
			$("#drDeptId").val(drDeptId);
			$("#drDeptId").prop("disabled", "true");
			//$("#sponsor_select").select2("val", chargesSlaveId);			
			$("#listmstr_select_chargesinfo").select2("val", chargesId);
			
			//setDyanamicDivForChargesinfo('dynamicItemsinfo','listmstr_select_chargesinfo');
			setDyanamicDivForChargesinfoReferal('dynamicItemsinfo','listmstr_select_chargesinfo');

			$("#listmstr_select_chargesinfo").select2("val", chargesSlaveId);
			setDyanamicDivForChargesinfoReferal('dynamicItemsinfo','listmstr_select_chargesinfo');

			if(paymentType == 1){
				rupay = '1';
			}else if(paymentType == 2){
				rupay = '2';
			}
			
			if (rupay == "rupay") {
				$("input[name=refParentage][value=" + rupay + "]").attr('checked', 'checked');
			}
			else {
				$("input[name=refParentage][value=" + rupay + "]").attr('checked', 'checked');
			}
			
			//setDyanamicDivForPercentage('dynamicItemsinfo','listmstr_select_chargesinfo');
			
			//$("#lisH0").val(chargesId);// chargesId
			//$("#lisH0").val(chargesSlaveId);
			//$("#lisH" + (liSize - 1)).val(chargesSlaveId);
			
			if (caseType == 1) {
				$("#chkHospital").prop("checked", true);
				$("#chkPrivate").prop("disabled",true);
				$("#chkHospital").removeAttr("disabled");
				//$("#chkPrivate").prop("checked", false);
			}else{
				$("#chkPrivate").prop("checked",true);
				$("#chkHospital").prop("disabled",true);
				$("#chkPrivate").removeAttr("disabled");
			}
			chargesSlaveHideShow();			
		}
	});
	
	var value = $("#thDeptPer_1").val();
	var value1 = $("#thDeptPer_2").val();
	var value2 = $("#thDeptPer_3").val();

	if(callFrom == 'Edit'){
		
	}else{
	
	$(".dept").each(function() {
		
		//set values for service
		$(".dept1ServPer").map(function() {

			return $(this).val(value);
		}).get();

		//set values for sub-service
		$(".dept1SubPer").map(function() {
			return $(this).val(value);
		}).get();
		
		// 2
		//set values for service
		$(".dept2ServPer").map(function() {

			return $(this).val(value1);
		}).get();

		//set values for sub-service
		$(".dept2SubPer").map(function() {
			return $(this).val(value1);
		}).get();
		
		// 3
		//set values for service
		$(".dept3ServPer").map(function() {

			return $(this).val(value2);
		}).get();

		//set values for sub-service
		$(".dept3SubPer").map(function() {
			return $(this).val(value2);
		}).get();
	});
   }
}


//Added Rohini Ambhore on 28-02-2024
function fetchSuperCatPrcentMasterReferal(callFrom,chargesMasterDto) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : parseInt(chargesMasterDto)
		},
		
		//url : "ehat/profees/fetchSuperCatPrcentMaster",
		url : "ehat/referaldoc/fetchSuperCatPrcentMasterReferal",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
		//	setDynamicDivSuperCat('dynamicItemsinfo',response);
		}
	});
	
	//added by sandip for apply fees to all subservices
	var value = $("#thDeptPer_1").val();
	var value1 = $("#thDeptPer_2").val();
	var value2 = $("#thDeptPer_3").val();

   if(callFrom == 'Edit'){
		
	}else{
	
	$(".dept").each(function() {
		
		//set values for service
		$(".dept1ServPer").map(function() {

			return $(this).val(value);
		}).get();

		//set values for sub-service
		$(".dept1SubPer").map(function() {
			return $(this).val(value);
		}).get();
		
		// 2
		//set values for service
		$(".dept2ServPer").map(function() {

			return $(this).val(value1);
		}).get();

		//set values for sub-service
		$(".dept2SubPer").map(function() {
			return $(this).val(value1);
		}).get();
		
		// 3
		//set values for service
		$(".dept3ServPer").map(function() {

			return $(this).val(value2);
		}).get();

		//set values for sub-service
		$(".dept3SubPer").map(function() {
			return $(this).val(value2);
		}).get();
	});
   }
}


function getdoctorNameOfRef(doctorId) {
	var inputs = [];
	inputs.push("doctorId=" + doctorId);


	var str = inputs.join('&');

	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
	//	url: "ehat/profees/doctorname",
		url: "ehat/referaldoc/getdoctorNameOfRef",
		error: function() {
			alert('Network Issue!!!');
		},
		success: function(r) {
			$("#doctorName").val(r.prefix+""+r.docName);
		}

	});
}

/*******************************************************************************
 * @author :Rohini Ambhore
 * @Date :28-02-2024
 * @Code :For fetching all services on load
 ******************************************************************************/
function fetchAllServiceForReferal() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/profees/fetchDeptAndServices",

				success : function(r) {

					var tHead = "";
					tHead = tHead + "<th>Services(For Hospital)</th>";
					for ( var i = 0; i < r.lstDepts.length; i++) {
						tHead = tHead
								+ "<th>"
								+ r.lstDepts[i].deptName
								+ "<input type='text' class='deptPer' id='thDeptPer_"
								+ r.lstDepts[i].deptId
								+ "' value='0' style='width: 50%; text-align:right;'" 
								+ " maxlength=5 onkeypress='return isPercentKey(event,\"thDeptPer_"
								+ r.lstDepts[i].deptId +"\")' "	
							//	+ " onkeyup='return isGTHundred(\"thDeptPer_"  
								+ " onkeyup='return isGTHundredForReferalDoc(\"thDeptPer_"  
								+ r.lstDepts[i].deptId +"\"),chkClickFillAll("+r.lstDepts[i].deptId+")'>"
								//+ "<input type='checkbox' value='"+r.lstDepts[i].deptId+"' "
								//+ "style='width: 10%;' class='form-control' id='chkDept"+r.lstDepts[i].deptId+"' onclick='chkClickFillAll("+r.lstDepts[i].deptId+")'>"
								+ "<input type='hidden' id='th"
								+ (r.lstDepts[i].deptId)
								+ "' value='"
								+ r.lstDepts[i].deptId
								+ "' class='dept'>"
								+"</th>";
					}

					tHead = tHead + "<th>Sub-Services</th>";
					$("#tHeadDeptTable").html(tHead);
					setServicesReferal(r);
				}
			});

}
/*******************************************************************************
 * @author :Rohini Ambhore
 * @Date :28-02-2024
 * @Code :For setting all services on load for ref doc
 ******************************************************************************/
function setServicesReferal(response) {

	var moduleBody = "";
	var subId = 0;
	for ( var i = 0; i < response.listService.length; i++) {
		
		//we dont set registration percent its 100% hospital
		if(response.listService[i].serviceId != 1){
		
		// for Services body
		moduleBody = moduleBody + "<tr id='module_"
				+ response.listService[i].serviceId + "'>" + "<td>"
				+ response.listService[i].serviceName + "</td>";
		for ( var j = 0; j < response.lstDepts.length; j++) {
			
			moduleBody = moduleBody + "<td><input id='tdServicePer_"
					+ response.lstDepts[j].deptId + "_"
					+ response.listService[i].serviceId
					+ "' class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId
					+ "ServPer' value='0' style='text-align:right;' type='text' "
					+" maxlength=5 onkeypress='return isPercentKey(event,\"tdServicePer_"
					+response.lstDepts[j].deptId + "_"+response.listService[i].serviceId+"\")'"
					+" onkeyup='return isGTHundredForReferalDoc(\"tdServicePer_"
					//change by Rohini on 13-04-2023
					//+response.lstDepts[j].deptId + "_"+response.listService[i].serviceId+"\"),chkClickFillAllUpdated("+response.lstDepts[j].deptId+","+response.listService[i].serviceId+")'>"				
					
					+response.lstDepts[j].deptId + "_"+response.listService[i].serviceId+"\"),setSubServPer("+response.lstDepts[j].deptId+","+response.listService[i].serviceId+")'>"

					+ "<input id='service_" + response.lstDepts[j].deptId // +"_"+
																			// response.listService[i].serviceId
					+ "' class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "ServId' value='"
					+ response.listService[i].serviceId + "' type='hidden'>"

					+ "<input id='dept_" + response.lstDepts[j].deptId + "_"
					+ response.listService[i].serviceId
					+ "' class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "' value='"
					+ response.lstDepts[j].deptId + "' type='hidden'></td>";
		}

		if (response.listService[i].serviceId == 1) {
			moduleBody = moduleBody
					+ "<td><button id='showmodule_"
					+ response.listService[i].serviceId
					+ "' onclick=toggle('module_"
					+ response.listService[i].serviceId
					+ "_"
					+ subId
					+ "') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down' style='display:none;'></i></button></td></tr>";

		} else {
			
			moduleBody = moduleBody
					+ "<td><button id='showmodule_"
					+ response.listService[i].serviceId
					+ "' onclick=toggle('module_"
					+ response.listService[i].serviceId
					+ "_"
					+ subId
					//+ "'),setServicesonclick("
					+ "'),setServicesonclickReferal("
					+ response.listService[i].serviceId
					//+ "),fetchAndSetSubServiceOnEdit("  
					+ "),fetchAndSetSubServiceOnEditReferal(" 
					+ response.listService[i].serviceId
					+ "),subserviceHiddenIdvalue() "
					+ "style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>";

		}
		moduleBody = moduleBody
				+ "<tr style='display:none;' class='module_"
				+ response.listService[i].serviceId
				+ "_"
				+ subId
				+ "'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'>"
				+ "<div class='box border blue'><div class='box-body'><table class='table table-striped'>"

				+ "<tbody id='subserviceBody_"
				+ response.listService[i].serviceId + "_" + subId
				+ "'></tbody></table></div></div></td></tr>";

		}
	}
	$('#moduleBody').html(moduleBody);
}


/*******************************************************************************
 * @author :Rohini Ambhore
 * @Date :28-02-2024
 * @Code :For setting all services on load
 ******************************************************************************/
function setServicesonclickReferal(serviceId) {

	var selfId = 0;
	var serviceIdeach = 0;
	var callFrom = 'super';
	if (serviceId == 0) {
		fetchAllServiceForReferal(); //fetchAllService();
	} else {

		if (serviceId > 0) {
			fetchSubServiceByIdReferal(serviceId, selfId, serviceIdeach, callFrom);
		} else {
			fetchSubServiceByIdReferal(serviceId, selfId, serviceIdeach, callFrom);
		}

	}

}
/*******************************************************************************
 * @author :Rohini Ambhore
 * @Date :28-02-2024
 * @Code :For fetching all sub services under services on click
 ******************************************************************************/
function fetchSubServiceByIdReferal(masterId, selfId, serviceIdeach, callfrom) {

	jQuery.ajax({
		type : "POST",
		async : false,
		//url : "ehat/subservice/getSubServicesFoprofees",
		url : "ehat/referaldoc/getSubServicesFoprofees",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(r) {
			console.log(r);
			
		//	setTimeout(function() {
				setSubIdHiddenReferal(selfId);
				setSubServicesReferal(r, masterId, serviceIdeach, callfrom, selfId);
				
				if(callfrom == 'super'){
					fetchAndSetSubServiceOnEditReferal(masterId);
				}else if(callfrom == 'sub'){
				    fetchAndSetSubServiceOnEditReferal(masterId);
				}
				
			//}, 150);
		}
	});
}

function setSubIdHiddenReferal(subId){
	
	$("#subHiddenId").val(subId);
}

function setSubServicesReferal(response, masterId, serviceIdeach, callfrom, selfId) {
	var serviceId = 0;

	var subHiddenId = $("#subHiddenId").val();
	
	if (callfrom == 'sub') {
		serviceId = serviceIdeach + "_" + selfId;
	} else {
		serviceId = masterId + "_" + 0;
	}

	var moduleBody = "";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		var isCategory = response.lstSubService[i].isCategory;
		// for Services body
		moduleBody = moduleBody + "<tr id='module_"
				+ response.lstSubService[i].serviceId + "'>" + "<td>"
				+ response.lstSubService[i].categoryName + "</td>";

		for ( var j = 0; j < response.lstDepts.length; j++) {
			
			if (isCategory == "N") {
				
				moduleBody = moduleBody + "<td><input id='tdSubServicePer_" + response.lstDepts[j].deptId +"_"+response.lstSubService[i].subId+ "' "
				// + response.lstDepts[j].deptId
				+ " class='moduleView viewAll dept" + response.lstDepts[j].deptId
						+ "SubPer mstService_"+response.lstDepts[j].deptId+"_"+response.lstSubService[i].serviceId+" mstSubService_"+response.lstDepts[j].deptId+"_"+subHiddenId+"' value='0'  type='text' style='text-align:right;' "
						+ " maxlength=5 onkeypress='return isPercentKey(event,\"tdSubServicePer_"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")' "
						+ "onkeyup='return isGTHundredForReferalDoc(\"tdSubServicePer_"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")'>";
			}else{
				
				moduleBody = moduleBody + "<td><input id='tdSubServicePer_" + response.lstDepts[j].deptId +"_"+response.lstSubService[i].subId+ "' "
				// + response.lstDepts[j].deptId
				+ " class='moduleView viewAll dept" + response.lstDepts[j].deptId
						+ "SubPer mstService_"+response.lstDepts[j].deptId+"_"+response.lstSubService[i].serviceId+" mstSubService_"+response.lstDepts[j].deptId+"_"+subHiddenId+"' value='0'  type='text' style='text-align:right;' "
						+ " maxlength=5 onkeypress='return isPercentKey(event,\"tdSubServicePer_"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")' "
						+ "onkeyup='return isGTHundredForReferalDoc(\"tdSubServicePer_"
						//+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\"),setSubLeafServPer("+response.lstDepts[j].deptId+","+subHiddenId+")'>"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\"),setSubLeafServPer("+response.lstDepts[j].deptId+","+response.lstSubService[i].subId+")'>"
						//+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")'>";
			}
			
			// Sub Service percentage			
			// SubService Id
			moduleBody = moduleBody + "<input id='dept" + response.lstDepts[j].deptId
					+ "SubId' "
					// + response.lstDepts[j].deptId +"_"+
					// response.lstSubService[i].subId
					+ " class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "SubId' value='"
					+ response.lstSubService[i].subId + "' type='hidden'>"

					// Service Id
					+ "<input id='dept" + response.lstDepts[j].deptId
					+ "SrvId' "
					// + response.lstDepts[j].deptId +"_"+
					// response.lstSubService[i].serviceId
					+ " class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "SubSerId' value='"
					+ response.lstSubService[i].serviceId + "' type='hidden'>"

					// Department id
					+ "<input id='dept" + response.lstDepts[j].deptId + "Id'"
					// + response.lstDepts[j].deptId +"_"+
					// response.lstSubService[i].serviceId
					+ " class='moduleView viewAll deptIdSub' value='"
					+ response.lstDepts[j].deptId + "' type='hidden'></td>";
		}

		if (isCategory == "N") {
			moduleBody = moduleBody
					+ "<td><button id='showmodule_"
					+ response.lstSubService[i].serviceId
					+ "' onclick=toggle('module_"
					+ response.lstSubService[i].serviceId
					+ "_"
					+ response.lstSubService[i].subId
					+ "') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down' style='display:none;'></i></button></td></tr>";

		} else {
			moduleBody = moduleBody
					/*+ "<td><button id='showmodule_"
					+ response.lstSubService[i].subId
					+ "' onclick=toggle('module_"
					+ response.lstSubService[i].serviceId
					+ "_"
					+ response.lstSubService[i].subId
					+ "'),fetchSubServiceById("
					+ masterId
					+ ","
					+ response.lstSubService[i].subId
					+ ","
					+ response.lstSubService[i].serviceId
					+ ",'sub'),fetchAndSetSubServiceOnEdit("
					+ response.lstSubService[i].serviceId
					+ "),setSubIdHidden("+response.lstSubService[i].subId+") style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>";*/

			+ "<td><button id='showmodule_"
			+ response.lstSubService[i].subId
			+ "' onclick=toggle('module_"
			+ response.lstSubService[i].serviceId
			+ "_"
			+ response.lstSubService[i].subId
			+ "'),fetchSubServiceByIdReferal("  // + "'),fetchSubServiceById("
			+ masterId
			+ ","
			+ response.lstSubService[i].subId
			+ ","
			+ response.lstSubService[i].serviceId
			+ ",'sub') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>";
		}
		moduleBody = moduleBody
				+ "<tr style='display:none;' class='module_"
				+ response.lstSubService[i].serviceId
				+ "_"
				+ response.lstSubService[i].subId
				+ "'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'>"
				+ "<div class='box border blue'><div class='box-body'><table class='table table-striped'>"

				+ "<tbody id='subserviceBody_"
				+ response.lstSubService[i].serviceId + "_"
				+ response.lstSubService[i].subId
				+ "'></tbody></table></div></div></td></tr>";

	}

	$('#subserviceBody_' + serviceId).html(moduleBody);
	
	//added by sandip for apply fees to all subservices
	var value = $("#thDeptPer_1").val();
	var value1 = $("#thDeptPer_2").val();
	var value2 = $("#thDeptPer_3").val();
    var subserviceHiddenIdvalue = $("#subserviceHiddenIdvalue").val();
  
    
    if(callfrom == 'super'){
    	
    	var valueService = $("#tdServicePer_1_"+masterId).val();
    	var valueService1 = $("#tdServicePer_2_"+masterId).val();
    	var valueService2 = $("#tdServicePer_3_"+masterId).val();
    	
    }
    
    if(callfrom == 'sub' && selfId !=0){
    	var valueSubService = $("#tdSubServicePer_1_"+selfId).val();
    	var valueSubService1 = $("#tdSubServicePer_2_"+selfId).val();
    	var valueSubService2 = $("#tdSubServicePer_3_"+selfId).val();	
    }
    var callFromCheck = $("#callFrom").val(); 
    
    // start For sub Services
    if(callfrom == 'super'){
	   $(".dept").each(function() {
			
			//set values for service
		  
			$(".mstService_1_"+masterId).map(function() {

				return $(this).val(valueService);
			}).get();
			

			//set values for sub-service
			$(".mstSubService_1_"+masterId).map(function() {
				return $(this).val(valueService);
			}).get();
			
			// 2
			//set values for service
			$(".mstService_2_"+masterId).map(function() {

				return $(this).val(valueService1);
			}).get();

			//set values for sub-service
			$(".mstSubService_2_"+masterId).map(function() {
				return $(this).val(valueService1);
			}).get();
			
			// 3
			//set values for service
			$(".mstService_3_"+masterId).map(function() {

				return $(this).val(valueService2);
			}).get();

			//set values for sub-service
			$(".mstSubService_3_"+masterId).map(function() {
				return $(this).val(valueService2);
			}).get();
		});	
     
	   // end For sub Services
	
  
	   
   }
    else if(callfrom == 'sub'){
 	   $(".dept").each(function() {
 			
 			//set values for service
 		
 			$(".mstSubService_1_"+selfId).map(function() {

 				return $(this).val(valueSubService);
 			}).get();
 			

 			//set values for sub-service
 			$(".mstSubService_1_"+selfId).map(function() {
 				return $(this).val(valueSubService);
 			}).get();
 			
 			// 2
 			//set values for service
 			$(".mstSubService_2_"+selfId).map(function() {

 				return $(this).val(valueSubService1);
 			}).get();

 			//set values for sub-service
 			$(".mstSubService_2_"+selfId).map(function() {
 				return $(this).val(valueSubService1);
 			}).get();
 			
 			// 3
 			//set values for service
 			$(".mstSubService_3_"+selfId).map(function() {

 				return $(this).val(valueSubService2);
 			}).get();

 			//set values for sub-service
 			$(".mstSubService_3_"+selfId).map(function() {
 				return $(this).val(valueSubService2);
 			}).get();
 		});	
      
 	   // end For sub Services
 	
   
 	   
    }
    
    else{
    	
  //if(subserviceHiddenIdvalue == off){
	$(".dept").each(function() {
		
		//set values for service
		$(".dept1ServPer").map(function() {

			return $(this).val(value);
		}).get();

		//set values for sub-service
		$(".dept1SubPer").map(function() {
			return $(this).val(value);
		}).get();
		
		// 2
		//set values for service
		$(".dept2ServPer").map(function() {

			return $(this).val(value1);
		}).get();

		//set values for sub-service
		$(".dept2SubPer").map(function() {
			return $(this).val(value1);
		}).get();
		
		// 3
		//set values for service
		$(".dept3ServPer").map(function() {

			return $(this).val(value2);
		}).get();

		//set values for sub-service
		$(".dept3SubPer").map(function() {
			return $(this).val(value2);
		}).get();
	});	
	
  }
}

/*******************************************************************************
 * @author :Rohini Ambhore
 * @Date :29-02-2024
 * @Code :To fetch all sub services under services on click edit mode
 ******************************************************************************/
function fetchAndSetSubServiceOnEditReferal(serviceId) {

	var callFrom = $("#callFrom").val();
	if(callFrom == "update"){
		var doctorId = $("#txtDoctorId").val();
		var drDeptId = $("#drDeptId").val();
		var unitId = $("#unitId").val();
		var caseType = $("input[name=refByRadio]:checked").val();

		// For Charges Id
		var chargesId = $("#lisH0").val();// chargesId
		var chargesSlaveId = 0;// static chargesSlaveId
		var liSize = $("#dynamicItemsinfo li").length;
		chargesSlaveId = $("#lisH" + (liSize - 1)).val();
		
		if (unitId == null || unitId == undefined || unitId == "") {
			unitId = 0;
		}

		if (doctorId == null || doctorId == undefined || doctorId == "") {
			doctorId = 0;
		}

		if (chargesId == null || chargesId == undefined || chargesId == "") {
			chargesId = 0;
		}

		if (chargesSlaveId == null || chargesSlaveId == undefined
				|| chargesSlaveId == "") {
			chargesSlaveId = 0;
		}

		if (drDeptId == null || drDeptId == undefined || drDeptId == "") {
			drDeptId = 0;
		}
		
		if(unitId == 0){
			chargesId = 0;
			chargesSlaveId = 0;
			caseType = 0;
		}
		
		jQuery.ajax({
			type : "POST",
			async : false,
			
			//url : "ehat/profees/fetchAndSetSubServiceOnEdit",
			url : "ehat/referaldoc/fetchAndSetSubServiceOnEditReferal",
			data : {
				"serviceId" : parseInt(serviceId),
				"doctorId" : parseInt(doctorId),
				"drDeptId" : parseInt(drDeptId),
				"unitId" : parseInt(unitId),
				"caseType" : parseInt(caseType),
				"chargesId" : parseInt(chargesId),
				"chargesSlaveId" : parseInt(chargesSlaveId)
				
			},
			success : function(r) {
				  
					for(var i=0;i<r.listPerSlave.length;i++){
						
						$("#tdSubServicePer_"+r.listPerSlave[i].deptId+"_"+r.listPerSlave[i].subServiceId).val(r.listPerSlave[i].hospPercent);
						
					}
			}
		});
	
	}
}




//Rohini 29-Mar-2024 To validate value greater than 100% and rupay
function isGTHundredForReferalDoc(inputId){
	var inputValue = parseFloat($("#"+inputId).val());
	//var paymentType = $("input[name=refParentage]:checked").val();
	
	var paymentTpeCheck = $("input[name=refParentage]:checked").val();
	
	if(paymentTpeCheck == 1 && inputValue >100){	// paymentTpeCheck = 1 1 for percetage
	//if(inputValue > 100){
		alert("Can't be greater than 100%.");
		$("#"+inputId).val(100);
		return false;
	}
}

//Added Rohini on 02-04-2024
function setDyanamicDivForChargesinfoReferal(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();
	var htm= '<li class="select2-search-choice" id="liItmesH'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removech('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
		+'</li>';
		$('#' + setDiv).append(htm);
	
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();// for masters
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		if (liSize == 0) {
			
			fetchChargesSlaveinfoProfees(masterid, selfId,setDiv, getDiv);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfoProfees(masterid, selfId,setDiv, getDiv);
		}		
	}
	
	$("#compDiv").show();
}

function fetchChargesSlaveinfoProfees(masterId, selfId,setDiv, getDiv) {
	
	//masterId =1;
	
	var liSize = $("#" + setDiv + " li").length;
	var masterid ="";
	 masterid = $("#lisH" + 0).val();
	 selfId = $("#lisH" + (liSize - 1)).val();
	
	 var ids ="";
	 if (liSize >1) {
		 for(i=1;i<liSize; i++){
			 if(ids == ""){
				 ids = $("#lisH"+i).val();
			 }else{
			  ids = ids +","+ $("#lisH"+i).val();
			 }
		 }
		} 
	
	 
	jQuery.ajax({
		async : false,
		type : "POST",
		//url : "ehat/chargesSlave/fetcatY",
		url : "ehat/commanadv/getChragesSlaveByIddrNew",
		data : {
			//"masterId" : parseInt(masterId),
			//"selfId" : parseInt(selfId)
			"masterId" : parseInt(masterid),
			"selfIds" : ids

		},
		success : function(response) {
			
			multiSelectSlavechargesinfo(response);
			
		}
	});
}

