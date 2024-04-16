<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
function searchStore(key) {
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#particulars1").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');
		var total = 0;

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/store/autoSuggestionStore",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				if (r.length > 0) {
					for ( var i = 0; i < r.length; i++) {
						var total = 0;

						availableTags[i] = r[i].storeName + '$$'
								+ r[i].storeId +'-'+r[i].storeUserId;
					}
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("$$");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

				}
				$("#particulars1").html(template);
				$("#particulars1").show();

				setTimeout(function() {
					$('#particulars1').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult1,
						scrollBar : true

					});
					$("#particulars1").data('typeahead').source = resultData;

				}, 100);
			}
		});
	}
	
	function displayResult1(item) {
		var content = item.value.split("-");
		$('#hiddenPopUpStoreId').val(content[0]);
	}
	
	function setStoreDetails() 
	{
		var hiddenStoreId = $("#hiddenPopUpStoreId").val();
		
		if(hiddenStoreId!=null && hiddenStoreId!="")
		{
			$('#hiddenStoreId').val(hiddenStoreId);
			$('#txtRecFrom').val($('#particulars1').val());
			$('#txtMrnNo').val(0);
			$("#mrn_issue_store_pop_up").dialog( "close" );
			$("#calculationDiv").find("input").each(function()
			{
			   $(this).val(0);
			});
			addBlankRow();
			
		}
		else
		{
			alertify.error("please select Store");
		}	
	}
	
</script>

<div id="mrn_issue_store_pop_up" class="modal fade in">
	<div class="col-md-10-1">

		<div class="form-group" style="margin-top: 10px;">
			Select Store <input type="text" id="particulars1"
				name="txtProductName" class="form-control typeahead"
				placeholder="Search By Store Name" tabindex="1"
				autofocus="autofocus" autocomplete="off"
				onkeypress="return searchStore(event)"> <input type='hidden'
				id='hiddenPopUpStoreId'>
		</div>

	</div>
	<div class="modal-footer">
		<div class="form-group col-md-7-1" style="margin-top: 15px;">
			<button type="button" class="btn btn-primary"
				id="btnSubContractingMaterialIssueSave"
				name="btnSubContractingMaterialIssueSave"
				onclick="setStoreDetails()">Ok</button>
			<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>