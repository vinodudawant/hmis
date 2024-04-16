function importEcogrrenItemMaster(){
	var inputs = [];
	//inputs.push('masterId=' + 1);
	var masterId=1;
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "../../pharmacy/ecogreen/api/getItemList/"+ masterId,
		

		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
				
				saveProductMasterData(r);
		}
	});
}


function saveProductMasterData(r){
	 var inputs = [];
	var lstprod = {
			lstprod : []
		};
	 for(var i=0 ; i < r.lstEcogrrenItem.length;i++){
		 lstprod.lstprod.push({
			      
			     productName :  r.lstEcogrrenItem[i].c_Name,
			     hsn : r.lstEcogrrenItem[i].c_Hsn,
			     productUnit : r.lstEcogrrenItem[i].n_Unit,
			     ecogreenProdcutUnitId:r.lstEcogrrenItem[i].n_Unit,
			     ecogreenProdcutPreparationId:1,
			     ecogreenProdcutStrenghtId:1,
			     //preparationMaster : 1,
				
				
			});
	 }
	 lstprod = JSON.stringify(lstprod);
		inputs.push("lstProd="	+ encodeURIComponent(lstprod));
	
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "ehat/opdhistory/saveOPDHistory",
			url : "../../pharmacy/ecogreen/api/saveProductMasterData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				response = r;
				if (r == 1) {
					alert("Record Saved Successfully");
					
				}else if(r==2) {
					alert("Record Updated Successfully");
					
				}
				else {
					alert("Network Issue..");
				}

				
				

			}
		});
		
	 
	 
}