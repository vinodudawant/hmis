/*******************************************************************************
 * @author Mohd Tarique Aaalam
 * @date 16_May_2017 
 * @Code This function is use to save the payment.
 ******************************************************************************/

function saveCurrency() {
	
	var currencyId= $('#currencyId').val();
	var countryName = $('#countryName').val();
	var currencyName = $('#currencyName').val();
	var currencyCode = $('#currencyCode').val();
	var currencySymbol = $('#currencySymbol').val();
	//var servId = $( "#uId option:selected" ).val();
	alert("currencyId.."+currencyId);
	alert("countryName.."+countryName);
	alert("currencyName.."+currencyName);
	alert("currencyCode.."+currencyCode);
	alert("currencySymbol.."+currencySymbol);
	
	if(currencyId == "" || currencyId == null || currencyId == undefined){
		currencyId = 0;
	}
	
	if(countryName=="" || countryName=="undefined" || countryName==null){		
		$("#countryName").focus();					
		return false;
	}
	
	if(currencyName=="" || currencyName=="undefined" || currencyName==null){		
		$("#currencyName").focus();					
		return false;
	}
	
	if(currencyCode=="" || currencyCode=="undefined" || currencyCode==null){		
		$("#currencyCode").focus();					
		return false;
	}
	
	if(currencySymbol=="" || currencySymbol=="undefined" || currencySymbol==null){		
		$("#currencySymbol").focus();					
		return false;
	}
	
	alert("currencyName.."+currencyName);
	var inputs = [];	
	inputs.push('currencyId=' + currencyId);
	inputs.push('countryName=' + countryName);
	inputs.push('currencyName=' + currencyName);
	inputs.push('currencyCode=' + currencyCode);
	inputs.push('currencySymbol=' + currencySymbol);
	//inputs.push('servId=' + servId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/currencytype/save",
		data	: str + "&reqType=AJAX",
	//	timeout : 1000 * 60 * 5,
	//	cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			refreshCurrency();		
		}		
	});	
}


/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getAllCurrencyTypes() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/currencytype/fetchCurrList",

				success : function(r) {
					setTemplateForCurrency(r);//call template
				}
			});
}



/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForCurrency(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Currency ID</th>'
						+ '<th class="col-md-1 center">Country Name</th>'
						+ '<th class="col-md-1 center">Currency Name</th>'
						+ '<th class="col-md-1 center">Currency Code</th>'
						+ '<th class="col-md-1 center">Currency Symbol</th>'
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.listCurr.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.listCurr[int].currencyId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="cId'+(r.listCurr[int].currencyId) +'" class="col-md-1 center">'+ (r.listCurr[int].currencyId)+ '</td>'
								+ '<td id="cName'+(r.listCurr[int].currencyId) +'" class="col-md-1 center">'+ (r.listCurr[int].countryName)+ ' </td>'
								+ '<td id="currName'+(r.listCurr[int].currencyId) +'" class="col-md-1 center">'+ (r.listCurr[int].currencyName)+ ' </td>'
								+ '<td id="currCode'+(r.listCurr[int].currencyId) +'" class="col-md-1 center">'+ (r.listCurr[int].currencyCode)+ ' </td>'
								+ '<td id="currSymboll'+(r.listCurr[int].currencyId) +'" class="col-md-1 center">'+ (r.listCurr[int].currencySymbol)+ ' </td>'
								
								
								+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'+r.listCurr[int].currencyId+' onclick="editCurrency('+r.listCurr[int].currencyId+')"><i class="fa fa-edit"></i></button></td>'
							
						    	+ '<td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '+r.listCurr[int].currencyId+' onclick=deleteCurrency('+r.listCurr[int].currencyId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		/*optionList=optionList+"<option value="+r.listPay[int].payId+">"+r.listPay[int].payName+"</option>";*/
	}
	
	$("#masterModuleBodyNarr").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}


/*******************************************************************************
 * @author Tarique Aalam

 * @date 16_May_2017 
 * @Code This function is use to Refresh the payment.
 ******************************************************************************/
function refreshCurrency() {
	$('#currencyId').val(0);
	$('#countryName').val("");
	$('#currencyName').val("");
	$('#currencyCode').val("");
	$('#currencySymbol').val("");
	getAllCurrencyTypes();
	
}



/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code update master
 ******************************************************************************/


function editCurrency(currencyId){
	$('#currencyId').val(currencyId);		
	$('#countryName').val($('#cName' + currencyId).html());
	$('#currencyName').val($('#currName' + currencyId).html());
	$('#currencyCode').val($('#currCode' + currencyId).html());
	$('#currencySymbol').val($('#currSymboll' + currencyId).html());
		
}	


/*******************************************************************************
 * @author Mohd tarique Aalam
 * @date 16_May_2017 
 * @Code Delete data from temp id 
 ******************************************************************************/

function deleteCurrency(currencyId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Record ?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/currencytype/deleteCurrMaster",
			data : {
				"currencyId" : currencyId
			},
			//timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshCurrency();
			}
		});
	}
}



/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code This function use to auto complete filds
 ******************************************************************************/


function setAutoCompleteForCurrencyMaster(inputId, callfrom) {

	//alert(callfrom);
	//var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
//	var findingName = $("#" + inputId).val();

	
		var inputs = [];
		
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/currencytype/autoSuggestionCurrencyMasterNames",
			//timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				 //alert(r.listTemp[0].TempName);
				
				if(callfrom=="search"){
					
					setTemplateForCurrency(r);
					//autoCompTable(r, inputId);
					
				}else{
					//autoCompTable(r, inputId);
				}
				
			}
		});
	}


function fetchCurrencyTypes()
{
	jQuery
	.ajax({
		async : true,
		type : "POST",
		url : "ehat/currencytype/fetchCurrList",

		success : function(r) {
			setOptionList(r);//call template
		}
	});
	
}


function setOptionList(r)
{
	var option = "<option id='' value='0'>--select--</option>";
	for ( var int = 0; int < r.listCurr.length; int++)
		{

		option = option
				+ ("<option id='" + (r.listCurr[int].currencyId) + "' value='"+ (r.listCurr[int].currencyId) + "'>"
						+ (r.listCurr[int].countryName) + "("+ (r.listCurr[int].currencySymbol)  +")" +" </option>");

	}
	$("#currencyId").html(option);
}


/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getOneCurrencySymbols() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/currencytype/fetchOneCurrList",

				success : function(r) {
					//alert(r);
					
					$("#edit_currency_symbol").removeClass("fa fa-inr");
					$("#edit_currency_symbol").html(r);
				}
			});
}


function getOneCurrencySymbols2() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/currencytype/fetchOneCurrList",

				success : function(r) {
					//	alert(r);
					
					$(".edit_currency_symbol").removeClass("fa fa-inr");
					$(".edit_currency_symbol").html(r);
			
				}
			});
}