
/*******************************************************************************
 * @Sagar
 * @date 17_May_2017 this method is used to set auto suggestion on browser
 ******************************************************************************/
function setAutoCompleteForDeptMaster(inputId, callfrom) {
    var usertype = "";
    var letter="";
    if (callfrom ="search") {
        letter=$("#userName").val();
    }
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async : false,
            type : "POST",
            data : str + "&reqType=AJAX",
            url : "ehat/dept/autoSuggestionDeptNames",
            timeout : 1000 * 60 * 15,
            cache : false,
            success : function(r) {
               if(callfrom=="search"){
            		setTempDept(r)
                    autoCompTable(r, inputId);    
                }else{
                    autoCompTable(r, inputId);
                }
                
            }
        });
    }
 
/*******************************************************************************
 * @Sagar
 * @date 17_May_2017 this method is used to set auto suggestion on browser
 ******************************************************************************/
function autoCompTable(response, id) {
    var qty = id.slice(0, -1); // for dyamic col getting id
    
    var myArray = response;// parsing response in JSON format
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
                // These next two options are what this plugin adds to the
                // autocomplete widget.
                showHeader : true,
                columns : [  {
                    name : 'Department Name',
                    width : '130px',
                    valueField : 'deptName'
                }],
                // Event handler for when a list item is selected.
                select : function(event, ui) {
                    console.log(ui);
                    var spl = (ui.item.spl = "" ? '' : ui.item.spl);
                    if (ui.item.dn != 'No' && ui.item.spl != 'Record'
                            && ui.item.specialisationName != 'Found'
                            && ui.item.depNm != 'Match') {
                    
                        $('#userName').val(ui.item.deptName);
                    }
                    /*
                     * This function use for Enter keypress search 
                     */
                    setAutoCompleteForDeptMaster(id,'search');
                    
                    return false;
                },
                // The rest of the options are for configuring the ajax
                // webservice call.
                minLength : 1,
                source : function(request, response) {
                    var data = myArray;
                    console.log(data);
                    console.log(data.lstDepts.length);
                    var result;
                    if (!data || data.lstDepts.length === 0 || !data.lstDepts
                            || data.lstDepts.length === 0) {
                        /*
                         * result = [{ label: 'No match found.' }];
                         */
                        result = [ {
                             
                            'deptName' : 'Record Not Found',
                            'deptCode' : 'Found',
                             
                        } ];
                    } else {
                        result = data.lstDepts;// Response List for All
                                                    // Services
                    }
                    response(result);
                    $('#ui-id-1').css("z-index", "10000000000");
                }
            });
}

/*******************************************************************************
 * @Sagar
 * @date 16_May_2017 this method is used to get records in input when we click
 *       on edit button
 ******************************************************************************/
function editDept(deptId,com,clin) {
	 
	$('#deptName').val($('#dName' + deptId).html());
	$('#deptCode').val($('#dCode' + deptId).html());
	$('#deptId').val(deptId);
	
    if(com=="Y"){
     	$('#ncm').prop('checked', false);
    	$('#cm').prop('checked', true);	
    }else{
    	$('#cm').prop('checked', false);	
    	$('#ncm').prop('checked', true);
    }
    
if(clin=="Y"){
	 	
    	$('#clin').prop('checked', true);
    	$('#nclin').prop('checked', false);	
    }else{
    	$('#nclin').prop('checked', true);	
    	$('#clin').prop('checked', false);
    }
}

/*******************************************************************************
 * @Sagar
 * @date 17_May_2017 this method is used to validate field when we click  on save button with empty record.
 ******************************************************************************/

function validate() {
        
    var deptName=$("#deptName").val();
    var deptCode=$("#deptCode").val();
    
    if(deptName=="" || deptName=="undefined" || deptName==null){
		
		$("#deptName").focus();					
		return false;
	}
	if(deptCode=="" || deptCode=="undefined" || deptCode==null){
		
		$("#deptCode").focus();	
		return false;
	}
	
    saveDept();
}

/*******************************************************************************
 * @Sagar
 * @date 16_May_2017 this method is used to save or update the fields
 ******************************************************************************/

function saveDept() {
	
	//alert("in js");
if($("input[type='radio'].iscat").is(':checked')) {
		
		isclinical = $("input[type='radio'].iscat:checked").val();  
	}

	var deptId = $("#deptId").val();
	var dname = $("#deptName").val();
	var dcode = $("#deptCode").val();
	var iscommercial='N';

	if($('#cm').is(':checked')==true ){
		iscommercial='Y';
		
	}
	

	if (dname == "" || dname == null || dname == undefined) {
		
		$("#deptName").focus();		
		return false;
	}
	else if (dcode == "" || dcode == null){
		
		$("#deptCode").focus();				
		return false;	
	}
	
	
	var inputs = [];
	inputs.push('deptId=' + deptId);
	inputs.push('deptName=' + dname);
	inputs.push('deptCode=' + dcode);
	inputs.push('iscommercial=' + iscommercial);
	inputs.push('isclinical=' + isclinical);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dept/saveDept",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			alertify.success(r);
			refreshDeptMaster();
			getViewDepts();	
			getDeptCount();//count of total dept
		}
	});
}

/*******************************************************************************
 * @Sagar
 * @date 16_May_2017 this method is used to fetch records on browser from data
 *       base
 ******************************************************************************/

function getViewDepts() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			"url" : window.location.href
		},
		url : "useraccess/setUrl",
		catche : false,
		success : function(r) {
			
		}
	});
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptListAll",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempDept(r); // to show ajax response on ui
		}
	});
}

/*******************************************************************************
 * @author Sagar
 * @date 16_May_2017 For Department master template
 ******************************************************************************/

function setTempDept(r) {
	
	var htm = '<thead id="ehatTHead">'
		+'<tr>'
		+ '<th class="col-md-1 center">#</th>'
		+ '<th class="col-md-1 center">Department ID</th>'
		+ '<th class="col-md-1 center">Department Name</th>'
		+ '<th class="col-md-1 center">Department Code</th>'
		+ '<th class="col-md-1 center">Edit</th>'
		+ '<th class="col-md-1 center">Delete</th>'
		+ '</tr></thead>';
	var index = 1;
	for ( var i = 0; i < r.lstDepts.length; i++) {
		
		var str=r.lstDepts[i].iscommercial;
		var str2=r.lstDepts[i].isclinical;
		
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index 
				+"</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstDepts[i].deptId
				+ "</td><td class='col-sm-1-1 center' id='dName"
				+ r.lstDepts[i].deptId
				+ "' style='height: 21.5px;'>"
				+ r.lstDepts[i].deptName
				+ "</td><td class='col-sm-1-1 center' id='dCode"
				+ r.lstDepts[i].deptId
				+ "' style='height: 21.5px;'>"
				+ r.lstDepts[i].deptCode
				+ "</td><td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button disabled class='btn btn-xs btn-success editUserAccess editDeptMaster' onclick=editDept("
				+ r.lstDepts[i].deptId	+ ",'"+ str +"','"+str2+"')><i class='fa fa-edit'></i></button></td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'><button disabled class='btn btn-xs btn-success deleteUserAccess deleteDeptMaster' onclick='deleteDept("
				+ r.lstDepts[i].deptId
				+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
index++;
	}
	$("#masterDeptBody").html(htm);
	$("#ehatTable").html(htm);
}

/*******************************************************************************
 * @Sagar
 * @date 16_May_2017 this method is used to delete the records with id
 ******************************************************************************/

function deleteDept(deptId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Department Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/dept/deleteDept",
			data : {
				"dId" : deptId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshDeptMaster();
				getDeptCount();//count of total dept
			}
		});
	}
}

/*******************************************************************************
 * @Sagar
 * @date 16_May_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/

function refreshDeptMaster() {
	$('#deptId').val("");
	$('#deptName').val("");
	$('#deptCode').val("");
	$('#cm').prop('checked', false);	
	$('#ncm').prop('checked', true);
	$('#clin').prop('checked', true);	
	$('#nclin').prop('checked', false);
	 getViewDepts();
}

 
/** *** End Methods Here**** */

/*******************************************************************************
 * @Author  kishor Lokhande
 * @date 22_May_2017 
 * @Code This method is used to getting count of unit master
 ******************************************************************************/
function getDeptCount()
{

	jQuery
			.ajax({
				async	: true,
				type	: "POST",
				url		: "ehat/dept/getdeptCount",

				success : function(r) {
					$("#deptCount").html(r);
					//alert(r);
					//setTemplateForUnit(r);//call template
				}
			});
	

}

function rdchkcom(){
	$('#noncm').prop('checked', false);
	
}
function rdchkncom(){
	$('#cm').prop('checked', false);

	
}


/*Touheed
12-June-2017 for master of Master search*/
function setDeptMaster(inputId) {
    var usertype = "";
    var letter="";
        letter=$("#userName").val();
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async : false,
            type : "POST",
            data : str + "&reqType=AJAX",
            url : "ehat/dept/autoSuggestionDeptNames",
            timeout : 1000 * 60 * 15,
            cache : false,
            success : function(r) {
            		setTempDept(r);
            		setTimeout(function(){userAccess();},100);
            }
        });
    }