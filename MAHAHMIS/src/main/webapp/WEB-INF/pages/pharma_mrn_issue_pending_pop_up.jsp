<script type="text/javascript">
	function hidePopUp() {
		location.reload(true);
	}
	
	function searchPendingStore(key) {
		var findingName = $("#particulars11").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

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
								+ r[i].storeId ;
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
				$("#particulars11").html(template);
				$("#particulars11").show();

				setTimeout(function() {
					$('#particulars11').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayPendingResult,
						scrollBar : true

					});
					$("#particulars11").data('typeahead').source = resultData;

				}, 100);
			}
		});
	}
	
	function displayPendingResult(item) {
		
		var content = item.value.split("-");
		$('#hiddenPendingStoreId').val(content[0]);
		
	}
</script>

<div id="mrn_pending_data" class="modal fade in" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" style="width: 900px;">
		<div class="modal-content">
			<div class="modal-header ">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="exampleModalLabel">Pending MRN</h4>
			</div>
			<div class="modal-body col-md-12 panel panel-default">
				<div class="col-md-12-1">
					<div class="col-md-2-1"></div>

					<div class="col-md-10-1">
						<form class="navbar-form navbar-left" role="search">
							<div class="form-group">
								<input type="text" id="particulars11"
									name="stores" class="form-control typeahead"
									placeholder="Search By Store Name" tabindex="1" autofocus="autofocus"
									 autocomplete="off"
									onkeypress="return searchPendingStore(event)" >
									
								<input type='hidden' id='hiddenPendingStoreId'>	
							</div>
							
							<button type="button" class="btn btn-default" onclick="setStoreWiseMrn()">
								<span class="glyphicon glyphicon-search"></span>
							</button>
						</form>
					</div>

				</div>
				<div class="col-md-12-1" id='indentPendingData'
					style="margin-top: 0%;">
					<b><h3>
							<font color='red'>Loading Data.....</font>
						</h3></b>
				</div>
			</div>

			<div class="modal-footer">
				
			</div>
		</div>
	</div>
</div>
