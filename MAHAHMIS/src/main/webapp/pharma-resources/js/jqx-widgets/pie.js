function sample(result) {
	// prepare chart data as an array
	var source = {
		datatype : 'json',
		datafields : [ {name : 'type'}, {name : 'amount',type:'number'} ],
		localdata : result/*[ {	"items" : "Diesel Effimax","total" : "1"}, {"items" : "DX","total" : "2"}, {"items" : "PMS","total" : "2"} ]*/
	};
	var dataAdapter = new $.jqx.dataAdapter(source, {
		async : false,
		autoBind : true,
		loadError : function(xhr, status, error) {
			alert('Error loading "' + source.url + '" : ' + error);
		}
	});
	// prepare jqxChart settings
	var settings = {
		title : "",
		description : "",
		enableAnimations : true,
		showLegend : true,
		showBorderLine: true,
		legendPosition : {
			left : 700,
			top : 160,
			width : 300,
			height : 200,
			flow: 'vertical' 
			
		},
		/* legendLayout: { left: 700, top: 160, width: 300, height: 200, },*/
		padding : {
			left : 5,
			top : 5,
			right : 5,
			bottom : 5
		},
		titlePadding : {
			left : 0,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : dataAdapter,
		  colorScheme: 'scheme03',
		seriesGroups : [ {
			type : 'pie',
			showLabels : true,
			series : [ {
				dataField : 'amount',
				displayText : 'type',
				labelRadius : 170,
				initialAngle : 15,
				radius : 145,
				centerOffset : 0,
				formatSettings : {
					sufix : 'Rs',
					decimalPlaces: 3
					
				},
				/*formatFunction: function (value) {
                    if (isNaN(value))
                        return value;
                    return parseFloat(value) + 'Rs';
                },*/
			} ]
		} ]
	};
	// setup the chart
	$('#piechart').jqxChart(settings);
}
