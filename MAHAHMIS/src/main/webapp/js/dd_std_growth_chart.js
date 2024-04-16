function fetchStandardAndPatientBMIDetailsNew(invokeChartParam) {
	//alert("Hello");
	
	
	invokeChartParam="ALL";
	$("#GrowthChartButtonPopup *").prop('disabled',false);
	$('#HEIGHT_WEIGHT_HEADCIM_LI_ID').addClass('active');
	$('#HEIGHT_WEIGHT_HEADCIM').addClass('active in');

	$('#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears_LI_ID').removeClass('active');
	$('#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears').removeClass('active in');

//	var pid = $('#patientId').val();
	
	var pid = $.trim($('#pt_Id').val());
	
	if(pid == "" || pid == null){
		pid = $('#patId').html();
	}
	
	var inputs = [];
	inputs.push('perform=LESS_THAN_FIVE_YEARS');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/growthchart/getgrowthchartdetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("unable to fetch chart details");
				},
				success : function(r) {
					var sampleData = [];
					
					if ((r.standardAndPatientBMIDetailsDTOList.length) == 0) {

					} else {
						for ( var int = 0; int < (r.standardAndPatientBMIDetailsDTOList.length); int++) {
							sampleData
									.push(r.standardAndPatientBMIDetailsDTOList[int]);
						}
						setTimeout(
								function() {

									if (invokeChartParam == "HEIGHT") {
										// age-height

										standardPatientHeightChart(sampleData);
										$('#BTN_PRINT_HEIGHT_CHART').prop(
												'disabled', false);
									} else if (invokeChartParam == "WEIGHT") {
										// age-weight
										standardPatientWeightChart(sampleData);
										$('#BTN_PRINT_WEIGHT_CHART').prop(
												'disabled', false);
									} else if (invokeChartParam == "HEADCIM") {
										// age-headcim
										standardPatientHeadCIMChart(sampleData);
										$('#BTN_PRINT_HEAD_CHART').prop(
												'disabled', false);
									} else if (invokeChartParam == "ALL") {

										// age-headcim
										standardPatientHeightChart(sampleData);
										$('#BTN_PRINT_HEIGHT_CHART').prop(
												'disabled', false);

										setTimeout(
												function() {

													// age-weight
													standardPatientWeightChart(sampleData);
													$('#BTN_PRINT_WEIGHT_CHART')
															.prop('disabled',
																	false);

													setTimeout(
															function() {

																// age-headcim
																standardPatientHeadCIMChart(sampleData);

																$(
																		'#BTN_PRINT_HEAD_CHART')
																		.prop(
																				'disabled',
																				false);
																$(
																		'#BTN_PRINT_ALL_CHARTS')
																		.prop(
																				'disabled',
																				false);
															}, 1000);

												}, 2000);

									}else{


										// age-headcim
										standardPatientHeightChart(sampleData);
										$('#BTN_PRINT_HEIGHT_CHART').prop(
												'disabled', false);

										setTimeout(
												function() {

													// age-weight
													standardPatientWeightChart(sampleData);
													$('#BTN_PRINT_WEIGHT_CHART')
															.prop('disabled',
																	false);

													setTimeout(
															function() {

																// age-headcim
																standardPatientHeadCIMChart(sampleData);

																$(
																		'#BTN_PRINT_HEAD_CHART')
																		.prop(
																				'disabled',
																				false);
																$(
																		'#BTN_PRINT_ALL_CHARTS')
																		.prop(
																				'disabled',
																				false);
															}, 1000);

												}, 2000);

									
									}

								}, 300);

					}

				}
			});
}

function standardPatientHeightChart(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;
	//alert(sampleData.length);
	var newSampleData = [];
	for (var i = 0; i < sampleData.length; i++) {
		// alert(sampleData[i].Pt_Ht_CM);
		if (i == 0) {
			newSampleData.push(sampleData[i]);
		} else {
			
			if (sampleData[i - 1].patient_height == ""
					&& sampleData[i].patient_height == "0.0"
					&& (sampleData[i + 1].patient_height != "" && sampleData[i + 1].patient_height != "0.0")) {
				newSampleData.push(sampleData[i]);
			} else if (sampleData[i - 1].patient_height != ""
					&& sampleData[i].patient_height == "0.0") {
				sampleData[i].patient_height = "";
				newSampleData.push(sampleData[i]);
			} else {
				newSampleData.push(sampleData[i]);
			}
		}
	}

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. Height(cm): '
				+ (dataItem.height_3) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. Height(cm): '
				+ (dataItem.height_15) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. Height(cm): '
				+ (dataItem.height_50) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. Height(cm): '
				+ (dataItem.height_85) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. Height(cm): '
				+ (dataItem.height_97) + '<br /> </div>';
	};

	// ///////////////////////////////////////////
	// custom tool tip function for Max_Height_CM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Height(cm): '
				+ (dataItem.patient_height)
				+ '<br /> </div>';

	};

	
	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Months) v/s Height(Cm) Graph plot.",
		description : "",
		// description : "Age at x-axis and Height at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : newSampleData,
		colorScheme : 'scheme01',
		xAxis : {
			//dataField : 'Pt_Age_In_Months',
			dataField : 'patientFinalAgeInMonths',
			unitInterval : 2,
			minValue : 0,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 5,
			minValue : 30,
			maxValue : 120,
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			title : {
				text : 'Height in cm.<br><br>'
			},
			labels : {
				horizontalAlignment : 'right',
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				//dataField : 'Pt_Ht_CM',
				dataField : 'patient_height',
				// displayText : 'displayTextABC',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				Padding : {
					left : 5,
					top : 5,
					right : 5,
					bottom : 5
				},
			labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'red',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P3',
				dataField : 'height_3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P15',
				dataField : 'height_15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P50',
				dataField : 'height_50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P85',
				dataField : 'height_85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P97',
				dataField : 'height_97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}

			]
		} ]
	};

	//alert(settings);
	// setup the chart
	$('#HEIGHT_GROWTH_CHART_DIV').jqxChart(settings);

}


function standardPatientWeightChart(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;
	var newSampleData = [];
	for (var i = 0; i < sampleData.length; i++) {
		if (i == 0) {
			newSampleData.push(sampleData[i]);
		} else {
			if (sampleData[i - 1].patient_weight == ""
					&& sampleData[i].patient_weight == "0.0"
					&& (sampleData[i + 1].patient_weight != "" && sampleData[i + 1].patient_weight != "0.0")) {
				newSampleData.push(sampleData[i]);
			} else if (sampleData[i - 1].patient_weight != ""
					&& sampleData[i].patient_weight == "0.0") {
				sampleData[i].patient_weight = "";
				newSampleData.push(sampleData[i]);
			} else {
				newSampleData.push(sampleData[i]);
			}
		}
	}
	// custom tool tip function for Max_Height_CM
	var toolTipValueFn_W_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per.  Weight(kg): '
				+ (dataItem.weight_3) + '<br /> </div>';
	};

	var toolTipValueFn_W_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per.  Weight(kg): '
				+ (dataItem.weight_15) + '<br /> </div>';
	};

	var toolTipValueFn_W_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per.  Weight(kg): '
				+ (dataItem.weight_50) + '<br /> </div>';
	};

	var toolTipValueFn_W_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per.  Weight(kg): '
				+ (dataItem.weight_85) + '<br /> </div>';
	};

	var toolTipValueFn_W_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per.  Weight(kg): '
				+ (dataItem.weight_97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Weight_KG
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Weight(kg): '
				+ (dataItem.patient_weight)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Months) v/s Weight(Kg) Graph plot.",
		description : "",
		// description : "Age at x-axis and Weight at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : newSampleData,
		colorScheme : 'scheme01',
		xAxis : {
			//dataField : 'Pt_Age_In_Months',
			dataField : 'patientFinalAgeInMonths',
			unitInterval : 2,
			minValue : 0,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 2,
			minValue : 1,
			maxValue : 25,
			title : {
				text : 'Weight in kg.<br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				//dataField : 'Pt_Wt_KG',
				dataField : 'patient_weight',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P3',
				dataField : 'weight_3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P15',
				dataField : 'weight_15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P50',
				dataField : 'weight_50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P85',
				dataField : 'weight_85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P97',
				dataField : 'weight_97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#WEIGHT_GROWTH_CHART_DIV').jqxChart(settings);

}

function standardPatientHeadCIMChart(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;
	var newSampleData = [];
	for (var i = 0; i < sampleData.length; i++) {
		if (i == 0) {
			newSampleData.push(sampleData[i]);
		} else {
			if (sampleData[i - 1].patient_headcim == ""
					&& sampleData[i].patient_headcim == "0.0"
					&& (sampleData[i + 1].patient_headcim != "" && sampleData[i + 1].patient_headcim != "0.0")) {
				newSampleData.push(sampleData[i]);
			} else if (sampleData[i - 1].patient_headcim != ""
					&& sampleData[i].patient_headcim == "0.0") {
				sampleData[i].patient_headcim = "";
				newSampleData.push(sampleData[i]);
			} else {
				newSampleData.push(sampleData[i]);
			}
		}
	}
	
	// custom tool tip function for Max_Head_CIM
	var toolTipValueFn_HD_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. Head(cm): '
				+ (dataItem.headcim_3) + '<br /> </div>';
	};

	var toolTipValueFn_HD_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. Head(cm): '
				+ (dataItem.headcim_15) + '<br /> </div>';
	};

	var toolTipValueFn_HD_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. Head(cm): '
				+ (dataItem.headcim_50) + '<br /> </div>';
	};

	var toolTipValueFn_HD_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. Head(cm): '
				+ (dataItem.headcim_85) + '<br /> </div>';
	};

	var toolTipValueFn_HD_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. Head(cm): '
				+ (dataItem.headcim_97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Head_CIM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Head(cm): '
				+ (dataItem.patient_headcim)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Months) v/s Head CIM(Cm) Graph plot.",
		description : "",
		// description : "Age at x-axis and Head CIM at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : newSampleData,
		colorScheme : 'scheme01',
		xAxis : {
			//dataField : 'Pt_Age_In_Months',
			dataField : 'patientFinalAgeInMonths',
			unitInterval : 2,
			minValue : 0,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 2,
			minValue : 25,
			maxValue : 55,
			title : {
				text : 'Head CIM in cm.<br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				//dataField : 'Pt_Hd_CIM',
				dataField : 'patient_headcim',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Hd_P3',
				dataField : 'headcim_3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Hd_P15',
				dataField : 'headcim_15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Hd_P50',
				dataField : 'headcim_50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Hd_P85',
				dataField : 'headcim_85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Hd_P97',
				dataField : 'headcim_97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#HEAD_GROWTH_CHART_DIV').jqxChart(settings);

}

function printCharts(chartDivID) {
	var patientDetailsHTML = "<br><br><br><br><br><br><hr>";
	var deptId = $("#deptId").val();
	var deptNm="";

	if(deptId == 1){
		deptNm="OPD. no.";
	}else{
		deptNm="IPD. no.";
	}
	
    var patientID = $("#patientId").val();
    var name = $("#patientname").text();
    var age = $("#age").text();
    	age = (age + "/" + $("#gender").text());
    var cDoc = $.trim($("#doctor_id").text());

    	patientDetailsHTML = patientDetailsHTML
    			+ ("Pat. ID: " + patientID + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			+ "Pat. Name: " + name + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			+ "Pat. Age/Gender: " + age + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			//+ deptNm+": " + admissionNo + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			+ "Cons. Doc.: " + cDoc);

    	patientDetailsHTML = patientDetailsHTML
    			+ ("<br><hr><h3 style='text-align: center;'>SOURCE: WHO CHILD GROWTH STANDARDS.</h3>");
   	var content = "";

	if (chartDivID == "PRINT_ALL") {

		content += $('#HEIGHT_GROWTH_CHART_DIV')[0].outerHTML;

		content += "<br><br>" + ($('#WEIGHT_GROWTH_CHART_DIV')[0].outerHTML);

		content += "<br><br>" + ($('#HEAD_GROWTH_CHART_DIV')[0].outerHTML);

	} else {
		content += $('#' + chartDivID)[0].outerHTML;
	}

	// newWindow, document, pageContent: defined in single var.
	var newWindow = window.open('', '', 'width=1000, height=500'), document = newWindow.document
			.open(), pageContent = '<!DOCTYPE html>'
			+ '<html>'
			+ '<head>'
			+ '<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css" type="text/css" />'
			+ '<style type="text/css">'
			+ '.jqx-chart-axis-text,.jqx-chart-legend-text,.jqx-chart-axis-description'
			+ ',.jqx-chart-title-text,.jqx-chart-title-description,.jqx-chart-label-text {'
			+ 'font-size: 16px}' + '</style>'
			+ '<meta charset="utf-8" /><title>Chart</title>' + '</head><body>'
			+ patientDetailsHTML + content + '</body></html>';

	document.write(pageContent);
	document.close();
	newWindow.print();
}

function fetchStandardAndPatientBMIDetailsUtilGreaterThanFiveYears(invokeChartParam) {
	
	/*var pid = $('#patientId').val();
	if(pid == "" || pid == null){
		pid = $('#patId').html();
	}*/
	
var pid = $.trim($('#pt_Id').val());
	
	if(pid == "" || pid == null){
		pid = $('#patId').html();
	}
	
	
	var inputs = [];
	inputs.push('perform=GREATER_THAN_FIVE_YEARS');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/growthchart/getgrowthchartdetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("unable to fetch chart details");
				},
				success : function(r) {
					
					var sampleData = [];
					if ((r.standardAndPatientBMIDetailsDTOList.length) == 0) {

					} else {

						for ( var int = 0; int < (r.standardAndPatientBMIDetailsDTOList.length); int++) {
							sampleData
									.push(r.standardAndPatientBMIDetailsDTOList[int]);
						}

						setTimeout(
								function() {

									if (invokeChartParam == "ALL") {

										// age-height
										standardPatientHeightChartGreaterThanFiveYears(sampleData);
										$(
												'#BTN_PRINT_HEIGHT_CHART_GreaterThanFiveYears')
												.prop('disabled', false);

										setTimeout(
												function() {

													// age-weight
													standardPatientWeightChartGreaterThanFiveYears(sampleData);
													$(
															'#BTN_PRINT_WEIGHT_CHART_GreaterThanFiveYears')
															.prop('disabled',
																	false);

													setTimeout(
															function() {

																// age-bmi
																standardPatientMBIChartGreaterThanFiveYears(sampleData);

																$(
																		'#BTN_PRINT_BMI_CHART_GreaterThanFiveYears')
																		.prop(
																				'disabled',
																				false);
																$(
																		'#BTN_PRINT_ALL_CHARTS_GreaterThanFiveYears')
																		.prop(
																				'disabled',
																				false);

															}, 1000);

												}, 2000);

									}

								}, 300);

					}

				}
			});
}

// height GreaterThanFiveYears
function standardPatientHeightChartGreaterThanFiveYears(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. Height(cm): '
				+ (dataItem.height_3) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. Height(cm): '
				+ (dataItem.height_15) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. Height(cm): '
				+ (dataItem.height_50) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. Height(cm): '
				+ (dataItem.height_85) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. Height(cm): '
				+ (dataItem.height_97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Height_CM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Height(cm): '
				+ (dataItem.patient_height)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Years) v/s Height(Cm) Graph plot.",
		description : "",
		// description : "Age at x-axis and Height at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : sampleData,
		colorScheme : 'scheme01',
		xAxis : {
			//dataField : 'Pt_Age_In_Years',
			dataField : 'patientFinalAgeInYears',
			unitInterval : 1,
			minValue : 5,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 20,
			minValue : 80,
			maxValue : 200,
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			title : {
				text : 'Height in cm.<br><br>'
			},
			labels : {
				horizontalAlignment : 'right',
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				//dataField : 'Pt_Ht_CM',
				dataField : 'patient_height',
				// displayText : 'displayTextABC',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				Padding : {
					left : 5,
					top : 5,
					right : 5,
					bottom : 5
				},
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'red',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P3',
				dataField : 'height_3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P15',
				dataField : 'height_15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P50',
				dataField : 'height_50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P85',
				dataField : 'height_85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Ht_P97',
				dataField : 'height_97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}

			]
		} ]
	};

	// setup the chart
	$('#HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears').jqxChart(settings);

}

// weight GreaterThanFiveYear
function standardPatientWeightChartGreaterThanFiveYears(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;

	// custom tool tip function for Max_Height_CM
	var toolTipValueFn_W_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per.  Weight(kg): '
				+ (dataItem.weight_3) + '<br /> </div>';
	};

	var toolTipValueFn_W_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per.  Weight(kg): '
				+ (dataItem.weight_15) + '<br /> </div>';
	};

	var toolTipValueFn_W_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per.  Weight(kg): '
				+ (dataItem.weight_50) + '<br /> </div>';
	};

	var toolTipValueFn_W_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per.  Weight(kg): '
				+ (dataItem.weight_85) + '<br /> </div>';
	};

	var toolTipValueFn_W_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per.  Weight(kg): '
				+ (dataItem.weight_97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Weight_KG
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Weight(kg): '
				+ (dataItem.patient_weight)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Years) v/s Weight(Kg) Graph plot.",
		description : "",
		// description : "Age at x-axis and Weight at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : sampleData,
		colorScheme : 'scheme01',
		xAxis : {
			//dataField : 'Pt_Age_In_Years',
			dataField : 'patientFinalAgeInYears',
			unitInterval : 1,
			minValue : 1,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 5,
			minValue : 10,
			maxValue : 50,
			title : {
				text : 'Weight in kg.<br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				//dataField : 'Pt_Wt_KG',
				dataField : 'patient_weight',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
			//	dataField : 'Wt_P3',
				dataField : 'weight_3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P15',
				dataField : 'weight_15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P50',
				dataField : 'weight_50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P85',
				dataField : 'weight_85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'Wt_P97',
				dataField : 'weight_97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears').jqxChart(settings);

}

// Head CIM GreaterThanFiveYear
function standardPatientMBIChartGreaterThanFiveYears(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;

	// custom tool tip function for Max_Head_CIM
	var toolTipValueFn_bmi_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. BMI : '
				+ (dataItem.bmi_3)
				+ '<br /> </div>';

	};

	var toolTipValueFn_bmi_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. BMI : '
				+ (dataItem.bmi_15)
				+ '<br /> </div>';
	};

	var toolTipValueFn_bmi_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. BMI : '
				+ (dataItem.bmi_50)
				+ '<br /> </div>';
	};

	var toolTipValueFn_bmi_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. BMI : '
				+ (dataItem.bmi_85)
				+ '<br /> </div>';
	};

	var toolTipValueFn_bmi_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. BMI : '
				+ (dataItem.bmi_97)
				+ '<br /> </div>';
	};

	// custom tool tip function for Max_Head_CIM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />BMI : '
				+ (dataItem.patient_bmi)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Years) v/s BMI Graph plot.",
		description : "",
		// description : "Age at x-axis and Head CIM at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : sampleData,
		colorScheme : 'scheme01',
		xAxis : {
			//dataField : 'Pt_Age_In_Years',
			dataField : 'patientFinalAgeInYears',
			unitInterval : 1,
			minValue : 5,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 2,
			minValue : 10,
			maxValue : 30,
			title : {
				text : 'BMI <br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				//dataField : 'Pt_bmi',
				dataField : 'patient_bmi',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'bmi_P3',
				dataField : 'bmi_3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'bmi_P15',
				dataField : 'bmi_15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'bmi_P50',
				dataField : 'bmi_50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'bmi_P85',
				dataField : 'bmi_85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				//dataField : 'bmi_P97',
				dataField : 'bmi_97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#BMI_GROWTH_CHART_DIV_GreaterThanFiveYears').jqxChart(settings);

}

function printChartsGreaterThanFiveYears(chartDivID) {
	var patientDetailsHTML = "<br><br><br><br><br><br><hr>";
   	var patientID = $("#patientId").val();
   	var name = $("#patientname").text();
   	var age = $("#age").text();
    	age = (age + "/" + $("#gender").text());
   	var cDoc = $.trim($("#doctor_id").text());

   		patientDetailsHTML = patientDetailsHTML
   			+ ("Pat. ID: " + patientID + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		+ "Pat. Name: " + name + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		+ "Pat. Age/Gender: " + age + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		//+ "OPD. no.: " + admissionNo + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		+ "Cons. Doc.: " + cDoc);

    	patientDetailsHTML = patientDetailsHTML
    		+ ("<br><hr><h3 style='text-align: center;'>SOURCE: WHO CHILD GROWTH STANDARDS.</h3>");
    
    var content = "";

	if (chartDivID == "PRINT_ALL") {

		content += $('#HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears')[0].outerHTML;

		content += "<br><br>"
				+ ($('#WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears')[0].outerHTML);

		content += "<br><br>"
				+ ($('#BMI_GROWTH_CHART_DIV_GreaterThanFiveYears')[0].outerHTML);

	} else {
		content += $('#' + chartDivID)[0].outerHTML;
	}

	// newWindow, document, pageContent: defined in single var.
	var newWindow = window.open('', '', 'width=1000, height=500'), document = newWindow.document
			.open(), pageContent = '<!DOCTYPE html>'
			+ '<html>'
			+ '<head>'
			+ '<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css" type="text/css" />'
			+ '<style type="text/css">'
			+ '.jqx-chart-axis-text,.jqx-chart-legend-text,.jqx-chart-axis-description'
			+ ',.jqx-chart-title-text,.jqx-chart-title-description,.jqx-chart-label-text {'
			+ 'font-size: 16px}' + '</style>'
			+ '<meta charset="utf-8" /><title>Chart</title>' + '</head><body>'
			+ patientDetailsHTML + content + '</body></html>';

	document.write(pageContent);
	document.close();
	newWindow.print();
}