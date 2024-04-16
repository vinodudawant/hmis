function savePatientSaleOT(r) 
{	
	//Changed By Akshata
           var treatmentId  =  $("#tr_Id").val(); 
         //   var treatmentId  =  $("#treatId").val(); 
          //  alert(r);
            var billid       =  0;

            if(r >0){
            	billid=r;
            }else{
            	billid=$("#bill_Id").val();
            	//billid=	39274;
            }
            
            var doctorId = 0;
			//var patientId  =  $("#pt_Id").val();
			var patientId  =  $("#pid").val();
            var sponserId = 0;
            var referTo = 'ipd';//type of patient
	        var doctorName = "";
            var txtGrossAmt =0;

			var txtAdd = 0;

			var txtLess = 0;

			var txtNetAmt =  $("#pharmaAmt").val();

			var txtSpecialDisc = 0;

			var txtSurcharge =0;

			var txtRount =0;

			var txtCD = 0;
	        var txtCDAmt = 0;

			var txtTratmentId =  $("#tr_Id").val(); 
			//var txtTratmentId =  $("#treatId").val(); 

			var categoryId = 1;
            var txtAmtRec = 0;
		

			var txtAmtBal = 0;
		

			var patientSalePreviousBalance =0;
			var saleType = 0;
			var paymentMode = 0;
			
			
			var txtTax5 = 0;
			
			var txtTax55 = 0;
			
			var txtTax12 = 0;
            var txtTax0 = 0;
            var txtTax6 = 0;
            var txtTax135 = 0;
		    var materiallist = {
				ltPatientSaleBill : []
			};

			//	var productName = $("#txtProName").val();


				if ($("#serIDPharma").val() != null
						&& $("#serIDPharma").val() != "") {
					var batchId =$("#bathid").val(); //batchId
					var productId =$("#serIDPharma").val();//productId

					var batchCode = $("#textBatch").val();//batchId

					var batchExpiry = $("#txtExpiry").val();

					var mrp =  $("#pharmaRate").val();	

					var rate = $("#pharmaRate").val();	

					var qty = $("#txtAQty").val();

					var issueQty = $("#pharmaQty").val();

					var ipdOpdId = 0;
 
					var prescriptionId = 0;
					
					var patientSaleInsertType = "insert";
					
					var vat = $("#textBhVat").val();

					var amt = $("#pharmaAmt").val();//amount
					//var treatmentoperationid = $("#treatmentoperationid").val();
					var treatmentoperationid = 16;
					var ratePerUnit = 0;
					var disc = 0;
					var counterSlaveVatAmt = 0;
					var patientDiscAmt = 0;
					var txtPurchaseRate = 0;
			    	var stockQtyInHand = qty - issueQty; 

					materiallist.ltPatientSaleBill.push({
						patientSlaveBatchCode : batchCode,
						patientSaleBatchExpiry : batchExpiry,
						patientSlaveMrp : mrp,
						patientSlaveRate : rate,
						patientSlaveQty : parseInt(issueQty),
						patientSlaveDisc : disc,
						patientSlaveAmt : amt,
						patientSlaveBatchId : batchId,
						patientSlaveVat : vat,
						patientSlaveRatePerUnit : ratePerUnit,
						patientSlaveVatAmt : counterSlaveVatAmt,
						patientSaleSlaveIssueQty : parseInt(issueQty),
						patientSaleSlaveDiscAmt : patientDiscAmt,
						patientSlavePrescriptionId : prescriptionId,
						patientSlaveipdopdId : ipdOpdId,
						patientSlavePurchaseRate : txtPurchaseRate,
						productMaster : {
							'productId' : productId,
							'batchMaster' : [ {
								'batchId' : batchId,
								'stockMaster' : {
									
									'stockQtyInHand' :parseInt(issueQty)
								}
							}]
						}
					});
				}
			

			if (materiallist.ltPatientSaleBill.length < 1) {
				alert("Please Enter Valid Data");
				return false;
			}

			materiallist = JSON.stringify(materiallist);

			var inputs = [];

			// General Info
			inputs.push("ltPatientSaleBill=" + materiallist);
			
		/*	inputs.push("txtPatientSaleId=" + txtPatientSaleId);*/
			
			/* inputs.push("txtDate=" + txtDate); */
			inputs.push("txtTax5=" + txtTax5);
			inputs.push("txtTax55=" + txtTax55);
			inputs.push("patientSalePreviousBalance="
					+ patientSalePreviousBalance);
			inputs.push("txtTax12=" + txtTax12);
			inputs.push("txtTax0=" + txtTax0);
			inputs.push("txtTratmentId=" + txtTratmentId);

			inputs.push("doctorId=" + doctorId);
			inputs.push("sponserId=" + sponserId);
			inputs.push("referTo=" + referTo);
			inputs.push("doctorName=" + doctorName);
			inputs.push("patientId=" + patientId);
			inputs.push("patientName" + patientName);
	
			/* inputs.push("txtCN=" + txtCN); */
			if(txtCD=="" || txtCD==null){
				txtCD=0;
				txtCDAmt=0;
			}
			inputs.push("txtCD=" + txtCD);
			inputs.push("txtCDAmt=" + txtCDAmt);
			/* inputs.push("txtCNAmt=" + txtCNAmt); */
			inputs.push("txtAdd=" + txtAdd);
			inputs.push("txtGrossAmt=" + txtGrossAmt);
			inputs.push("txtLess=" + txtLess);
			inputs.push("txtNetAmt=" + txtNetAmt);
			inputs.push("txtRound=" + txtRount);

			inputs.push("saleFrom=patientSale");

			inputs.push("txtSpecialDisc=" + txtSpecialDisc);
			inputs.push("txtSurcharge=" + txtSurcharge);

			inputs.push("txtAmtRec=" + txtAmtRec);
			inputs.push("txtAmtBal=" + txtAmtBal);
			inputs.push("paymentMode=" + paymentMode);
			inputs.push("saleType=" + saleType);
		//	inputs.push("chequeNum=" + chequeNum);
			inputs.push("txtTax6=" + txtTax6);
			inputs.push("txtTax135=" + txtTax135);
			inputs.push("patientSaleInsertType=" + patientSaleInsertType);
			inputs.push("txtTax135=" + treatmentId);
			inputs.push("billid=" + billid);
			inputs.push("txtCategoryId=" + categoryId);
			inputs.push("treatmentoperationid=" + treatmentoperationid);
			/* inputs.push("comment=" + comment); */
		

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "POST",
								data : str,
								/* url : "../indentSale/sampleTest", */
								url : "ehat/otpharma/savePatientSaleOT",
								catche : false,
								error : function() {
									/*$("#saveBtn").show();*/
								//	alert("oops something went wrong related to stock please save proper data or check mrp");
								},
								success : function(r) {}
							});
		

	
}


///pharma autosugseetion


function setValuesToAutocompleteOT(key) 
{
	if (key != null) {
		var keycode = (key.which) ? key.which : key.keyCode;
		if (keycode == 9) {
			$('#txtQty').focus();
			return false;
		}
	}
	var findingName = $("#txtautoservicePharma").val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/product/autoSuggestionProduct",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var availableTags = [];
			var resultData = [];

			for ( var i = 0; i < r.length; i++) {

				availableTags[i] = r[i].productName + '_' + r[i].productId
						+ '-' + r[i].productUnit + '-'
						+ r[i].packingMaster.packType + '-'
						+ r[i].companyMaster.compName + "-"
						+ r[i].shelfMaster.shelfName + "-"
						+ r[i].categoryMaster.catId + "-"
						+ r[i].productPrescription
						
				/* 	+ r[i].productLastMRP + "-"
					+ r[i].productLastPurRate */;

			}

			var template = "";
			for ( var j = 0; j < availableTags.length; j++) {
				var arrValue = (availableTags[j]).split("_");
				var idValue = (arrValue[1]);
				resultData.push({
					ID : idValue,
					Name : arrValue[0]
				});

				template1 = template + '<li data-value="' + (arrValue[1])
						+ '" class=""><a href="#">' + arrValue[0]
						+ '</a></li>';

			}
			$(".typehead").html(template1);
			$(".typehead").show();

			setTimeout(function() {
				$('#txtautoservicePharma').typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResultot,
					scrollBar : true
				});
				$("#txtautoservicePharma").data('typeahead').source = resultData;
			}, 500);
		}
	});
		
	
}

function autoCompTableTK(response,id,value){
//	var qty		= id.slice(0,-1); //for dyamic col getting id
	var myArray =response;// $.parseJSON(response);// parsing response in JSON format 
	console.log(myArray);
	$.widget('custom.mcautocomplete', $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	    },
	    _renderMenu: function (ul, items) {
	        var self = this,
	            thead;
	        if (this.options.showHeader) {
	            table = $('<div class="ui-widget-header" style="width:100%"></div>');
	            $.each(this.options.columns, function (index, item) {
	                table.append('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
	            });
	            table.append('<div style="clear: both;"></div>');
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	        var t = '',
	            result = '';
	        $.each(this.options.columns, function (index, column) {
	            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.valueField ? column.valueField : index] + '</span>';
	        });
	        result = $('<li></li>')
	            .data('ui-autocomplete-item', item)
	            .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
	            .appendTo(ul);
	        $(ul).css("z-index", "10000000000");
	        return result;
	    }
	});


	// Sets up the multicolumn autocomplete widget.
	$("#"+ id).mcautocomplete({
	    // These next two options are what this plugin adds to the autocomplete widget.
	    showHeader: true,
	    columns: [{
	        name: 'Name',
	        width: '200px',
	        valueField: 'productName'
	    }],

	    // Event handler for when a list item is selected.
	    select: function (event, ui) {
	    	console.log("tk");
	    	console.log(ui);
	        this.value = (ui.item ? ui.item.productName : '');
	       if( ui.item.productName !='No Match'){
	    	  $('#results').text(ui.item ? 'Selected: ' + ui.item.categoryName + ', ' + ui.item.categorycharges + ', ' + ui.item.stockqty : 'Nothing selected, input was ' + this.value);
	
					$("#" + id).val(ui.item.productName);
					
	       }
	        
	        return false;
	    },

	    // The rest of the options are for configuring the ajax webservice call.
	    minLength: 1,
	    source: function (request, response) {
	    	var data = myArray;
	    	console.log(data);
	    	console.log(data.lstService.length);
	    	var result;
            if (!data || !data.lstService || data.lstService.length === 0  ) {
            	/*result = [{
                    label: 'No match found.'
                }];*/
            	result = [{
                     'productName'		: 'No Match',
                    
               
                 }];
            } else {
                result = data.lstService;//Response List for All Services
            }
            response(result);
         
          }
	});
}



function loadPatientBatchPopUp(productId) 
{
	getProductByBatch(productId);
	$("#rowId0").focus();
	setTimeout(function() {
		$("#rowId0").focus();
	}, 500);

}


function displayResultot(item) 
{
	var content = item.value.split("-");
	//var alertcontent1 = item.value.split("*");
		
	$('#serIDPharma').val(content[0]);
	
	
		loadPatientBatchPopUp(content[0]);
	

}


function getProductByBatch(productId) {
	var storeName = $('#storeId').val(); //Id of store
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId,
			validStore : storeName,
		},
		url : "./pharmacy/purchase/getBatchDetails",

		error : function(error) {
			alert('error' + error);
		},
		success : function(result) {
			var jsObj = $.parseJSON(result);
			var stock = 0;
			
			for(var i=0; i<jsObj.result.length; i++)
				// stock += jsObj.result[i].clearStock;
			    stock += parseFloat(jsObj.result[i].clearStock);
			
			if (stock > 0) {
				$("#patient_sale_Batch_Pop_Up").show();
				splitBatchContentot(jsObj.result);

			} else {
				alertify.error("Product has no stock!!");
				$('#txtautoservicePharma').val(content[0]);
			}
		}
	});
}



function splitBatchContentot(result) {
	
//	setFocusBatchPopUp();
	/*$("#batchData").html("No Record Found");*/
	var count = 0;
	$("#batchData1").empty();
	for ( var i = 0; i < result.length; i++) {
		if (result[i].clearStock > 0) {
			var count = 1;
			$('#patient_sale_Batch_Pop_Up').modal('show');
			//$('#hospitalSaleBatchPopUp').modal('show');
			

			if (i == 0) {
				$("#batchData1")
						.html(
								"<tr><td  class='col-sm-1-1 center'>"
										+ "<input type='radio' name='row' id='rowId"
										+ i
										+ "' value="
										+ i
										+ " checked='true' autofocus='autofocus'></td>"
										+ "<td  class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-2-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textLastPurchaseFrom"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillNo"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillDate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;' class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;' class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;' class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPurchaseRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;' class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchVat"
										+ i + "'" + "tabindex='-1' /></td>"

										+ "</tr>");

			} else {

				$("#batchData1")
						.append(
								"<tr><td>"
										+ "<input type='radio' name='row' value="
										+ i
										+ " id='rowId"
										+ i
										+ "'></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textLastPurchaseFrom"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillNo"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBillDate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPurchaseRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchVat"
										+ i + "'" + "tabindex='-1' /></td>"

										+ "</tr>");
			}

			/*$("#textBatchCode" + i).val(arr[0]);
			$("#textBatchExpiry" + i).val(arr[1]);
			$("#textBatchMRP" + i).val(arr[2]);
			$("#textSaleRate" + i).val(arr[3]);
			$("#textBatchClearStock" + i).val(arr[4]);
			
			$("#textBatchPopUpBatchId" + i).val(arr[5]);
			$("#textBatchStockId" + i).val(arr[6]);

			$("#textLastPurchaseFrom" + i).val(arr[8]);
			$("#textBillNo" + i).val(arr[9]);
			$("#textBillDate" + i).val(arr[10]);
			
			$("#textBatchPurchaseRate" + i).val(arr[11]);
			$("#textBatchVat" + i).val(arr[12]);*/

			$("#textBatchCode" + i).val(result[i].batchCode);
			$("#textBatchExpiry" + i).val(result[i].batchExpDate);
			$("#textBatchMRP" + i).val(result[i].mrp);

			$("#textBatchClearStock" + i).val(result[i].clearStock);

			$("#textBatchPopUpBatchId" + i).val(result[i].batchId);
			$("#textBatchStockId" + i).val(result[i].stockId);

			$("#textSaleRate" + i).val(result[i].saleRate);

			$("#textLastPurchaseFrom" + i).val(result[i].lastPurchaseFrom);
			$("#textBillNo" + i).val(result[i].billNo);
			$("#textBillDate" + i).val(result[i].billDate);

			$("#textBatchPurchaseRate" + i).val(result[i].purchaseRate);
			$("#textBatchVat" + i).val(result[i].vat);

		}
		if (count == 0) {
			$("#txtMRP").val('');
			$("#txtPurchaseRate").val('');
			$("#txtVat").val('');
			$("#txtBatchNo").val('');
			$("#txtExpiry").val('');
			$("#txtClStk").val('');
			$("#txtRate").val('');
			$("#hiddenBatchId").val('');
			$("#hiddenStockId").val('');
			$("#txtTotalStk").val('');
			$("#txtQty").val('');
			$("#txtAmt").val('');
			$("#txtRatePerUnit").val('');

		}
	}
}
