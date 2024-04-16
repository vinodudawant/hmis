/*******
* @author   :BILAL
* @Date     :23-01-2018
* @Code     :For data on UI
* *****/
function loadPopUp() {
		var productId = $("#hiddenProductId").val();
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var vendorId = $("#vendorId").val();
		var unitId =$("#unitId").val();
		
		if ( from != '' && to != '') {
			/* if (productId != '' || vendorId!=''){
				
			} */
			var inputs = [];
			inputs.push('productId=' + productId);
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('vendorId=' + vendorId);
			inputs.push('unitId=' + unitId);
			
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../report/getProductWisePurchase2",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#purchase_productwise_report").show();
					setProductResult(r);

				}
			});
			return true;
		}
		else
		{
			alertify.error('Please Fill All the Details');
		}	

}
/*******
* @author   :BILAL
* @Date     :23-01-2018
* @Code     :For data on UI
* *****/
function setProductResult(result) {
	var r = result;
	var divContent = "";
	total=0;

	divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
	for ( var i = 0; i < r.length; i++) {

		divContent = divContent + "<tr><td>" + r[i].vouNo + "</td><td>"+ r[i].productName +"</td>  <td>"
				+ r[i].type + "</td><td>" + r[i].purBillNo + "</td><td>"
				+ r[i].billDate + "</td><td>" + r[i].batchCode+"</td><td>" + r[i].vendorName+"</td><td>" + r[i].qty+"</td><td>" + r[i].rate+"</td><td>" + r[i].gstamt+"</td><td>" + r[i].amount+"</td></tr>";
				
		calculateTotalAmount(r[i].amount);

	}
	$("#totalAmount").val(total.toFixed(2));
	$("#totalAmount2").html(total.toFixed(2));
	
	$("#productWisePurchaseData").html(divContent);
}

/*******
* @author   :BILAL
* @Date     :23-01-2018
* @Code     :For setting unit list
* *****/
function getAllUnit() {
    jQuery.ajax({
        async : true,
        type : "POST",
        url : "../report/fetchUnitList",
        error : function() {
            alert('error');
        },
        success : function(r) {
            setTempForUnit(r);
        }
    });
}
/*******
 * @author   :BILAL
 * @Date     :23-01-2018
 * @Code     :For setting unit list
 * *****/
function setTempForUnit(r) {
	var list = "<option value='0'>--Select Unit--</option>";    
    for ( var i = 0; i < r.lstUnit.length; i++) {    

        list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
        }  
    $("#unitId").html(list);
}

/********
 * @author   :BILAL
 * @Date     :21-12-2017
 * @Code     :For auto suggestion of vendor name and id
 * **********/
function autosuggetionVendorView(id){
	
	var findingName = $("#searchBox1").val();
	
		var inputs = [];
		inputs.push('findingName=' + findingName);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/vendor/autoSuggestionv",			
			timeout : 2000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				
				setvendor(r,id) ;
			}
		});
		return true;
	
}

function setvendor(response,id,callFrom) {
    
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


	$("#" + id).mcautocomplete(
			{
				
				showHeader : true,
				columns : [ {
					name : 'vendorName',
					width : '150px',
					valueField : 'vendorName'
				}],

				select : function(event, ui) {
				
					
						$('#searchBox1').val(ui.item.vendorName);
						
						$("#vendorId").val(ui.item.vendorId);
						
					
					return false;
					
				},

			
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
				
					
					var result;
					if (!data || data.lstvendors.length === 0 || !data.lstvendors
							|| data.lstvendors.length === 0) {
						
						result = [ {
							
							'vendorname' : 'NO',
							'vendorstate' : 'Match',
							
						} ];
					} else {
						result = data.lstvendors;
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000");
					
					
				}
			});
}

function excel(){
	 
	$('#productWisePurchaseData').tableExport({type:'excel'});
}