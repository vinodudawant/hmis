/**
 *  @akshata_desai, 19 AUG 22, for IPD Nusring Station indent tab- pharmacyAutoSuggesiontion
 *   
 */
function setCreditNoteAutocomplete2(key,currentVal) {
		$('#hiddenCurrentRow').val(currentVal);
		
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#textProductName"+currentVal).val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');
		jQuery.ajax({

			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../pharmacy/product/autoSuggestionProduct",
			timeout : 1000 * 60 * 15,

			error : function(error) {
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				if (r.length > 0) {
					for ( var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId;
					}
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue+'_'+currentVal,
						Name : arrValue[0]
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

				}
				$(".typehead1").html(template);
				$(".typehead1").show();

				setTimeout(function() {
					$("#textProductName"+currentVal).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true

					});
					$("#textProductName"+currentVal).data('typeahead').source = resultData;
				}, 500);
			}
		});
}


	function displayResult(item) {
		
		var hiddenRowC=$('#hiddenCurrentRow').val();
		var content = item.value.split("_");
		var text = item.text;
		var value = item.value;
		var rowCount= content[1];
		var id= content[0];
		
		$('#hiddenProductId'+rowCount).val(id);
		
		var inputs = [];
		inputs.push('productID=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/purchase/getTotalStockDetails",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#totalQty').val(r);
				$('#texttotalQty'+hiddenRowC).val(r);
			}
		});
		
	}