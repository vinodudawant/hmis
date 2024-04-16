//////////////icw.js////////////////////
// icw.js
//
// This file is required for all pages in the ICW and must be called FIRST in the HTML <head>.
scrollT = null;
icw = {
	loadedModules :new Array,
	jsPath :'',
	init : function() {
		$("body").addClass("icwJS");
		$(".icwNoScript").remove();
		// This is a fix for the CSS image flicker bug on IE
		if ($.browser.msie) {
			try {
				document.execCommand("BackgroundImageCache", false, true);
			} catch (err) {
			}
		}
		$(".icwDynamicJS").each( function() {
			icw.common.uncomment(this);
		});
		icw.chrome.init();
		icw.table.init();
	},
	// Just an alias for the loadModules function
	loadModule : function(module) {
		return (icw.loadModules( [ module ]));
	},
	// Loads dynamic icw.XXXX.js files, if they're not already loaded.
	loadModules : function(modules) {
		for ( var i = 0; i < modules.length; i++) {
			// See if the module is already loaded. If not, add a <script>
			// element to load it.
			if (!(icw.loadedModules.inArray(modules[i]))) {
				var scriptHTML = '<script language="text/javascript" src="'
						+ icw.jsPath + 'icw.' + modules[i] + '.js"></script>';
				$("head").append(scriptHTML);
				icw.loadedModules.push(modules[i]);
			}
		} /*	*/
	}
};
$( function() {
	icw.init();
});
// Extend javascript
Array.prototype.inArray = function(value) {
	var i;
	for (i = 0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};
// extend jQuery
jQuery.fn.wrapInner = function(html) {
	return this.each( function() {
		jQuery(html).append(this.childNodes).appendTo(this);
	});
};
jQuery.fn.outerHtml = function() {
	return $('<div>').append(this.slice(0, 1)).html();
};
jQuery.fn.reverse = function() {
	return this.pushStack(this.get().reverse(), arguments);
};
jQuery.fn.mouseIsOver = function(e) {
	if (!this || !this.parent().scrollLeft)
		return false;
	var off = this.offsetLite();
	return (e.pageX >= off.left && e.pageY >= off.top
			&& e.pageX <= off.left + this.width() && e.pageY <= off.top
			+ this.height());
};
jQuery.fn.extend( {
	// Create hover and down states for all button images
	buttonFx : function() {
		return this.each( function() {
			var imgSrc = $(this).attr("src");
			var imgPath = imgSrc.substring(0, imgSrc.lastIndexOf("/") + 1);
			var imgFile = imgSrc.substring(imgSrc.lastIndexOf("/") + 1, imgSrc
					.lastIndexOf("."));
			var disabledButton = new RegExp("_disabled$", "i");
			if (!imgFile.match(disabledButton)) {
				var imgExt = imgSrc.substr(imgSrc.lastIndexOf("."));
				$(this).mouseover( function() {
					$(this).attr("src", imgPath + imgFile + "_over" + imgExt);
				});
				$(this).mousedown( function() {
					$(this).attr("src", imgPath + imgFile + "_down" + imgExt);
				});
				$(this).mouseup( function() {
					$(this).attr("src", imgPath + imgFile + "_over" + imgExt);
				});
				$(this).mouseout( function() {
					$(this).attr("src", imgSrc);
				});
			}
		});
	},
	// Make the tabs function in IE
	tabFx : function() {
		return this.each( function() {
			$(this).mouseover( function() {
				if ($(this).attr("class") != "selected") {
					$(this).removeClass();
					$(this).addClass("hover");
				}
			});
			$(this).mousedown( function() {
				if ($(this).attr("class") != "selected") {
					$(this).removeClass();
					$(this).addClass("active");
				}
			});
			$(this).mouseup( function() {
				if ($(this).attr("class") != "selected") {
					$(this).removeClass();
					$(this).addClass("hover");
				}
			});
			$(this).mouseout( function() {
				if ($(this).attr("class") != "selected") {
					$(this).removeClass();
				}
			});
		});
	},
	vJustify : function() {
		var maxHeight = this.getMaxHeight();
		if (maxHeight > 0)
			return this.height(maxHeight);
		else
			return this;
	},
	getMaxHeight : function() {
		var maxHeight = 0;
		this.each( function() {
			if ($(this).height() > maxHeight) {
				maxHeight = $(this).height();
			}
		});
		return maxHeight;
	},
	scrollTo : function(duration) {
		if (this.length <= 0)
			return;
		var targetOffset = $(this).offset().top;
		$('html,body').animate( {
			scrollTop :targetOffset
		}, duration);
	},
	// Creates an overlay on an element
	// This is handy when you need to fire events on disabled elements
	overlay : function() {
		var overlay = jQuery(this).parents(".icwEventOverlay");
		if (overlay.length > 0)
			return overlay;
		overlay = $("<div class='icwEventOverlay' />");
		this.parent().append(overlay);
		var offset = {};
		this.offset( {
			scroll :false
		}, offset);
		overlay.css( {
			position :"absolute",
			top :offset.top,
			left :offset.left
		});
		overlay.width(this.width());
		overlay.height(this.height());
		return overlay;
	}
});
icw.temporary = {
	showDisabledLinkAlerts : function(scope) {
		if (!scope)
			scope = "body";
		$(scope).find("a[href$=#linkTBD]").unbind("click");
		$(scope).find("a[href$=#linkTBD]").click( function() {
			return true;
		});
		$(scope).find("form").each( function() {
			$(this).unbind("submit");
			$(this).submit( function() {
				// window.alert("This form doesn't function at this time.");
					return true;
				});
		});
		$(scope).find("input.icwButtonInactive").click( function() {
			// window.alert("This button doesn't function at this time.");
				return true;
			});
		$(scope).find("li.icwButtonInactive").click( function() {
			// window.alert("This button doesn't function at this time.");
				return true;
			});
	}
};
// The following function was written by Peter-Paul Koch (www.quirksmode.org)
function findPos(obj) {
	var curTop = curLeft = 0;
	if (obj.offsetParent) {
		curTop = obj.offsetTop;
		curLeft = obj.offsetLeft;
		while (obj = obj.offsetParent) {
			curTop += obj.offsetTop;
			curLeft += obj.offsetLeft;
		}
	}
	return [ curTop, curLeft ];
}
// ////////////end icw.js////////////////////
// ////////////icw.chrome.js////////////////////
// This file extends the icw object and must be called AFTER icw.js.
// It is responsible for the visual enhancements to the overall visual style of
// ICW pages,
// including the format of the ICW portlet skins and buttons.
icw.chrome = {
	// init: initializes the global styles for the ICW
	init : function() {
		icw.chrome.initSkin();
		icw.chrome.initButtons();
		icw.chrome.initTabs();
	},
	initSkin : function() {
		$(".icwSkin")
				.each(
						function() {
							$(this).find(".icwSkinControlMinMax").click(
									function() {
										icw.chrome.togglePortlet($(this)
												.parents(".icwSkin"));
										return false;
									});
							$(this)
									.find(".icwSkinControlDropDown")
									.click(
											function() {
												var dropdown = $(this).find(
														".icwSkinDropDown");
												dropdown
														.toggleClass("icwDropDownVisible");
												$(".icwSkinDropDown").not(
														dropdown).removeClass(
														"icwDropDownVisible");
												// hack to get IE to behave with
												// the background shadow
												if (dropdown
														.is(".icwDropDownVisible")) {
													dropdown.width(dropdown
															.width());
												} else {
													dropdown.width("");
												}
												return false;
											});
						});
	},
	togglePortlet : function(portlet) {
		$(portlet).toggleClass("icwSkinMinimized").find(".icwDropDownVisible")
				.removeClass("icwDropDownVisible");
	},
	initButtons : function() {
		$(".icwButton").each( function() {
			icw.chrome.initButton(this);
		});
	},
	initButton : function(el) {
		$(el).hover( function() {
			$(el).not(".icwButtonDisabled").addClass("icwButtonHover");
		}, function() {
			$(el).removeClass("icwButtonHover");
			$(el).removeClass("icwButtonActive");
		});
		$(el).focus( function() {
			$(el).not(".icwButtonDisabled").addClass("icwButtonHover");
		});
		$(el).blur( function() {
			$(el).removeClass("icwButtonHover");
			$(el).removeClass("icwButtonActive");
		});
		$(el).mousedown( function() {
			$(el).removeClass("icwButtonHover");
			$(el).not(".icwButtonDisabled").addClass("icwButtonActive");
		});
		$(el).mouseup( function() {
			$(el).removeClass("icwButtonHover");
			$(el).removeClass("icwButtonActive");
		});
		$(el).mouseout( function() {
			$(el).removeClass("icwButtonHover");
			$(el).removeClass("icwButtonActive");
		});
		if ($(el).attr("disabled")) {
			$(el).addClass("icwButtonDisabled");
		}
		// else {
		// $(el).removeClass("icwButtonDisabled");
		// }
	},
	initTabs : function() {
		$(".icwTabs ul li").not(".icwSelected").not(".icwInactive").each(
				function() {
					$(this).hover( function() {
						$(this).addClass("icwHover");
					}, function() {
						$(this).removeClass("icwHover");
						$(this).removeClass("icwActive");
					});
					$(this).click( function() {
						$(this).removeClass("icwHover");
						$(this).addClass("icwActive");
						$(this).find("a").click();
					});
					$(this).mousedown( function() {
						$(this).removeClass("icwHover");
						$(this).addClass("icwActive");
					});
					$(this).mouseup( function() {
						$(this).removeClass("icwActive");
					});
					$(this).mouseover( function() {
						$(this).addClass("icwHover");
						$(this).removeClass("icwActive");
					});
					$(this).mouseout( function() {
						$(this).removeClass("icwHover");
						$(this).removeClass("icwActive");
					});
				});
	}
};
// ////////////end icw.chrome.js////////////////////
// ////////////icw.table.js////////////////////
icw.table = {
	initialized :false,
	DATE_RE :/^(\d\d?)[\/\. -](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[\/\. -]((\d\d)?\d\d)$/,
	init : function() {
		if (icw.table.initialized) {
			return;
		}
		;
		$("table.icwTableSortable th a").parents("th").not(".icwCheckCol")
				.each( function() {
					$(this).hover( function() {
						$(this).addClass("icwHover");
					}, function() {
						$(this).removeClass("icwHover");
						$(this).removeClass("icwActive");
					});
					$(this).click( function() {
						$(this).removeClass("icwHover");
						$(this).addClass("icwActive");
					});
					$(this).mousedown( function() {
						$(this).removeClass("icwHover");
						$(this).addClass("icwActive");
					});
					$(this).mouseup( function() {
						$(this).removeClass("icwHover");
						$(this).removeClass("icwActive");
					});
					$(this).mouseover( function() {
						$(this).addClass("icwHover");
						$(this).removeClass("icwActive");
					});
					$(this).mouseout( function() {
						$(this).removeClass("icwHover");
						$(this).removeClass("icwActive");
					});
				});
		$("table.icwTableSortable th.icwFirst").each( function() {
			var checkCol = $(this).siblings("th.icwCheckCol");
			if (!($(checkCol).length > 0)) {
				return false;
			}
			$(this).hover( function() {
				$(checkCol).addClass("icwHover");
			}, function() {
				$(checkCol).removeClass("icwHover");
				$(checkCol).removeClass("icwActive");
			});
			$(this).click( function() {
				$(checkCol).removeClass("icwHover");
				$(checkCol).addClass("icwActive");
			});
			$(this).mousedown( function() {
				$(checkCol).removeClass("icwHover");
				$(checkCol).addClass("icwActive");
			});
			$(this).mouseup( function() {
				$(checkCol).removeClass("icwHover");
				$(checkCol).removeClass("icwActive");
			});
			$(this).mouseover( function() {
				$(checkCol).addClass("icwHover");
				$(checkCol).removeClass("icwActive");
			});
			$(this).mouseout( function() {
				$(checkCol).removeClass("icwHover");
				$(checkCol).removeClass("icwActive");
			});
		});
		$("table.icwTableCollapsible").each( function() {
			icw.table.makeCollapsible(this);
		});
		icw.table.initialized = true;
	},
	makeCollapsible : function(table) {
		var thisTable = $(table).parent().children("table");
		$(table)
				.find(".icwMinMax")
				.each(
						function(i) {
							$(this).toggleRows();
							$(this)
									.bind(
											"click",
											function() {
												$(this).toggleRows();
												if ($(thisTable).attr(
														"initScroll") == "true") {
													var tableHeight = $(
															thisTable).attr(
															"setHeight");
													var tableWidth = $(
															thisTable).attr(
															"setWidth");
													var scrollableTable = new ScrollableTable(
															thisTable,
															tableHeight,
															tableWidth);
													if ($.browser.msie
															&& $(this)
																	.hasClass(
																			'icwBtnMin')) {
														var c = scrollableTable.containerEl;
														var scrollTop = c.scrollTop;
														c.scrollTop = 0;
														c.scrollTop = scrollTop;
													}
												}
											});
						});
		$(table).find(".icwExpandAll").click(
				function() {
					$(table).find(".icwMinMax").each( function() {
						$(this).toggleRows("expand");
					});
					if ($(thisTable).attr("initScroll") == "true") {
						var tableHeight = $(thisTable).attr("setHeight");
						var tableWidth = $(thisTable).attr("setWidth");
						var scrollableTable = new ScrollableTable(thisTable,
								tableHeight, tableWidth);
					}
					return false;
				});
		$(table).find(".icwCollapseAll").click(
				function() {
					$(table).find(".icwMinMax").each( function() {
						$(this).toggleRows("collapse");
					});
					if ($(thisTable).attr("initScroll") == "true") {
						var tableHeight = $(thisTable).attr("setHeight");
						var tableWidth = $(thisTable).attr("setWidth");
						var scrollableTable = new ScrollableTable(thisTable,
								tableHeight, tableWidth);
						if ($.browser.msie) {
							var c = scrollableTable.containerEl;
							var scrollTop = c.scrollTop;
							c.scrollTop = 0;
							c.scrollTop = scrollTop;
						}
					}
					return false;
				});
	},
	findCollapseButton : function(row) {
		var classList = $(row).attr("class");
		var action = behavior = "";
		if (classList.match("icwAct[^ ]+")) {
			action = classList.match("icwAct[^ ]+").toString();
			behavior = ".icwBhv" + action.substr(6);
		}
		return $(row).parents("table").find(behavior);
	},
	getTableData : function(table) {
		var tableData = [];
		var row = 0;
		$(table).find("tbody tr").each( function(i) {
			var rowData = [];
			var col = 0;
			$(this).find("td").each( function(j) {
				rowData[col] = this;
				var colspan = Number($(this).attr("colSpan"));
				if (colspan > 1) {
					for (k = 1; k < colspan; k++) {
						col++;
						rowData[col] = undefined;
					}
				}
				col++;
			});
			tableData[row] = rowData;
			row++;
		});
		return tableData;
	},
	makeScrolling : function(table, height, width) {
		new ScrollableTable(table, height, width);
	}
};
jQuery.fn.extend( {
	toggleRows : function(action) {
		return this.each( function() {
			var button = behavior = actionableClass = "";
			var classList = $(this).attr("class");
			if (classList.match("icwBtn[^ ]+")) {
				button = classList.match("icwBtn[^ ]+").toString();
			}
			if (classList.match("icwBhv[^ ]+")) {
				behavior = classList.match("icwBhv[^ ]+").toString();
				actionableClass = ".icwAct" + behavior.substr(6);
			}
			if (action == "expand" || (!action && button == "icwBtnMin")) {
				$(this).removeClass("icwIcnMax");
				$(this).addClass("icwIcnMin");
				$(this).removeClass("icwBtnMin");
				$(this).addClass("icwBtnMax");
				$(this).attr("title", "[-] Collapse This Item");
				if (actionableClass) {
					$(actionableClass).show();
				}
			} else if (action == "collapse"
					|| (!action && button == "icwBtnMax")) {
				$(this).removeClass("icwIcnMin");
				$(this).addClass("icwIcnMax");
				$(this).removeClass("icwBtnMax");
				$(this).addClass("icwBtnMin");
				$(this).attr("title", "[+] Expand This Item");
				if (actionableClass) {
					$(actionableClass).hide();
				}
			}
		});
	}
});
function ScrollableTable(tableEl, tableHeight, tableWidth) {
	try {
		this.initIEengine = function() {
			var container = this.containerEl, $container = $(container);
			var table = this.tableEl, $table = $(table);
			var thead = this.thead, $thead = $(thead);
			var tbody = this.tbody, $tbody = $(tbody);
			var tfoot = this.tfoot, $tfoot = $(tfoot);
			$table.css('borderTop', '1px solid #fff');
			$table.css('borderBottom', '1px solid #fff');
			$container.css( {
				overflowY :"auto",
				overflowX :"hidden",
				position :'relative',
				marginBottom :$table.css('marginBottom')
			});
			if (!this.windowHeightAvailable)
				this.windowHeightAvailable = Number($table
						.attr("windowHeightAvailable"));
			heightAvailable = tableHeight == "auto" ? this.windowHeightAvailable
					: tableHeight;
			if (table.parentElement.clientHeight < table.offsetHeight
					&& table.offsetHeight > heightAvailable) {
				// $table.width(this.newWidth - this.scrollWidth);
				$table.css( {
					width :"98%"
				});
				$table.attr("hasScroll", "true");
			} else {
				$container.css( {
					overflowY :"hidden"
				});
				// $table.width($(this.tableEl).attr("hasScroll") === "true" ?
				// this.newWidth + this.scrollWidth : this.newWidth);
				$table.css( {
					width :"100%"
				});
				$table.attr("hasScroll", "false");
			}
			if (this.caption) {
				var cPadding = $(this.caption).css("padding-top") + " "
						+ $(this.caption).css("padding-right") + " "
						+ $(this.caption).css("padding-bottom") + " "
						+ $(this.caption).css("padding-left");
				var cMargin = $(this.caption).css("margin-top") + " "
						+ $(this.caption).css("margin-right") + " "
						+ $(this.caption).css("margin-bottom") + " "
						+ $(this.caption).css("margin-left");
				var tableCaption = $(document.createElement('div'));
				tableCaption.css( {
					padding :cPadding,
					margin :cMargin
				});
				tableCaption.addClass('icwTableCaption icwClear');
				tableCaption.append($(this.caption).clone(true).contents());
				$container.before(tableCaption);
				$(this.caption).remove();
			}
			if (thead) {
				$thead
						.find('tr')
						.each(
								function() {
									if ($.browser.msie)
										$(this).css("position", "absolute");
									$(this).css('left', 0);
									this.style
											.setExpression("top",
													"this.parentElement.parentElement.parentElement.scrollTop + 'px'");
								});
				$thead.find('th:first').css('borderLeft', '1px solid #ccc');
				var p = parseInt($tbody.find('tr:visible:first > td').css(
						'paddingTop'), 10);
				if (p < thead.offsetHeight) {
					if ($table.attr("hasScroll") === "true")
						$container.height($container.height()
								+ thead.offsetHeight);
					$tbody.find('tr:visible:first > td').css('paddingTop',
							thead.offsetHeight + 4 + p);
				}
			}
			if (tfoot) {
				$tfoot
						.find('tr')
						.each(
								function() {
									$(this).css( {
										position :'absolute',
										left :1
									});
									$(this).find('td').css( {
										borderTop :'1px solid #ccc',
										borderLeft :0,
										borderRight :0
									});
									this.style
											.setExpression(
													"top",
													"this.parentElement.parentElement.parentElement.scrollTop + this.parentElement.parentElement.parentElement.offsetHeight - this.offsetHeight + 'px'");
								});
				$tbody.find('tr:visible:last > td').css('paddingBottom',
						this.tfoot.offsetHeight + 3);
			} else { // no tfoot
				$container.css('borderBottom', '1px solid #ccc');
			}
		};
		this.initFFengine = function() {
			var container = this.containerEl, $container = $(container);
			var table = this.tableEl, $table = $(table);
			var thead = this.thead, $thead = $(thead);
			var tbody = this.tbody, $tbody = $(tbody);
			var tfoot = this.tfoot, $tfoot = $(tfoot);
			var headHeight = thead ? thead.offsetHeight : 0;
			var footHeight = tfoot ? tfoot.offsetHeight : 0;
			var bodyHeight = tbody.offsetHeight;
			var trs = tbody.getElementsByTagName('tr');
			if (!$table.attr("originalPaddingRight")) {
				$table.attr("originalPaddingRight", $tbody.find(
						"tr:first > td:last").css("paddingRight"));
			}
			if (bodyHeight > (this.newHeight - (headHeight + footHeight))) {
				$tbody.css( {
					overflowX :'hidden',
					overflowY :'auto'
				});
				var scrollBarWidth = this.scrollWidth;
				$(this.tbody).find("tr")
						.each(
								function() {
									var originalPaddingRight = $(this).parents(
											"table").attr(
											"originalPaddingRight");
									newPaddingRight = parseInt(
											originalPaddingRight, 10)
											+ scrollBarWidth + "px";
									$(this).find("td:last").css("paddingRight",
											newPaddingRight);
								});
				var cellSpacing = 0;

				var newHeight = this.newHeight
						- ((headHeight + (cellSpacing * 2)) + (footHeight + (cellSpacing * 2)));
				$tbody.css('height', Math.min(newHeight, bodyHeight));
				if (scrollT) {
					$tbody.scrollTop(scrollT);
					scrollT = null;
				}
			} else {
				$tbody.css( {
					overflow :'none'
				});
				var scrollBarWidth = this.scrollWidth;
				$tbody.find("tr").each(
						function() {
							var originalPaddingRight = $(this).parents("table")
									.attr("originalPaddingRight");
							$(this).find("td:last").css("paddingRight",
									originalPaddingRight);
						});
				var cellSpacing = 0;
				var newHeight = this.newHeight
						- ((headHeight + (cellSpacing * 2)) + (footHeight + (cellSpacing * 2)))
						+ 1;
				$tbody.css('height', Math.min(newHeight, bodyHeight));
			}
		}; // End Firefox code.
		this.getScrollbarWidth = function() {
			return 17;
		};
		this.tableEl = tableEl.get(0);
		this.scrollWidth = this.getScrollbarWidth();
		try {
			if (this.tableEl.style != null) {
				this.tableEl.style.height = 'auto';
			}
		} catch (e) {
		}
		this.tableEl.removeAttribute('height');
		$(this.tableEl).find("tbody").removeAttr("height");
		$(this.tableEl).find("tbody").css("height", 'auto');
		$(this.tableEl).attr("setHeight", tableHeight);
		$(this.tableEl).attr("setWidth", tableWidth);
		this.originalHeight = this.tableEl.clientHeight;
		this.originalWidth = this.tableEl.clientWidth;
		if ($(this.tableEl).attr("initScroll") != "true") {
			$(this.tableEl).attr("origHeight", this.originalHeight);
			$(this.tableEl).attr("origWidth", this.originalWidth);
		}
		if ($(this.tableEl).attr("initScroll") == "true") {
			if ($.browser.msie)
				this.originalWidth += 2;
		}
		var table = $(this.tableEl);
		if (!table.attr("windowHeightAvailable")) {
			table.attr("windowHeightAvailable", $(window).height() - 20); // 20
																			// is
																			// an
																			// arbitrary
																			// number
																			// just
																			// so
																			// the
																			// table
			table.attr("windowWidthAvailable", $(window).width() - 20); // isn't
																		// quite
																		// at
																		// 100%
																		// height
																		// &
																		// width.
		}
		var windowHeightAvailable = table.attr("windowHeightAvailable");
		var windowWidthAvailable = table.attr("windowWidthAvailable");
		if (tableHeight == "auto"
				&& this.originalHeight > windowHeightAvailable) {
			this.newHeight = windowHeightAvailable;
		} else if (typeof tableHeight === "number") {
			this.newHeight = Math.min(tableHeight, this.tableEl.clientHeight);
		} else {
			this.newHeight = this.originalHeight;
		}
		if (tableWidth == "auto" && this.originalWidth > windowWidthAvailable) {
			this.newWidth = this.windowWidthAvailable;
		} else if (typeof tableWidth === "number") {
			this.newWidth = tableWidth;
		} else {
			this.newWidth = this.originalWidth;
		}
		if (!$.browser.mozilla) {
			if ($(this.tableEl).attr("initScroll") == "true") {
				this.containerEl = $(this.tableEl).parent("div").get(0);
				$(this.containerEl).height(
						Math.min(this.newHeight, this.tableEl.clientHeight));
			} else {
				this.containerEl = this.tableEl.parentNode.insertBefore(
						document.createElement('div'), this.tableEl);
				this.containerEl.appendChild(this.tableEl);
				var caption = $(this.tableEl).find('caption');
				var captionHeight = tableHeight === "auto" ? caption[0].offsetHeight
						: 0;
				$(this.containerEl).height(
						Math.min(this.newHeight, this.tableEl.clientHeight)
								- captionHeight);
			}
		}
		var caption = this.tableEl.getElementsByTagName('caption');
		this.caption = (caption[0]) ? caption[0] : null;
		var thead = this.tableEl.getElementsByTagName('thead');
		this.thead = (thead[0]) ? thead[0] : null;
		var tfoot = this.tableEl.getElementsByTagName('tfoot');
		this.tfoot = (tfoot[0]) ? tfoot[0] : null;
		var tbody = this.tableEl.getElementsByTagName('tbody');
		this.tbody = (tbody[0]) ? tbody[0] : null;
		if (!this.tbody)
			return;
		// if ($.browser.msie) this.initIEengine();
		if ($.browser.mozilla) {
			this.initFFengine();
		} else {
			this.initIEengine();
		}
		$(this.tableEl).attr("initScroll", "true");
	} catch (e) {
	}
}
// ////////////end icw.table.js////////////////////
// ////////////icw.modal.js////////////////////
icw.modal = {
	disabled :false,
	animateSpeed :500,
	hideDelay :1000,
	// Shows a modal dialog
	show : function(args) {
		// Don't proceed if modals are disabled.
		if (icw.modal.disabled || $(args.anchor).attr("modalopen"))
			return $(".icwModal[anchorid='" + $(args.anchor).attr("anchorid")
					+ "']");
		// Set defaults and other values from the arguments.
		icw.modal.setArgumentDefaults(args);
		// Grab the content for the modal from the corresponding div
		var modalContent = $(args.content).clone(true);
		// Give a new ID to each item with an ID to avoid replicating them
		icw.modal.assignNewIds(modalContent);
		// Build the drop shadowed box around the content
		var modal = icw.modal.buildBox( {
			type :"modal",
			content :$(modalContent).outerHtml()
		});
		// Display an overlay if requested
		if (args.screen)
			icw.modal.renderOverlay(modal);
		// Insert the modal code into the page
		icw.modal.addModalToPage(modal, args);
		if (args.callback) {
			// create the list of variables that will be accessible to the
			// callback function
			// The first 2 lines are for backwards-compatibility: if you only
			// want modal, you
			// don't have to reference it as foo.modal; you can reference it as
			// just plain foo
			var callbackArgs = modal;
			callbackArgs.modal = modal;
			callbackArgs.anchor = args.anchor;
			eval(args.callback(callbackArgs));
		}
		// Place the modal
		icw.modal.sizeModal(modal, args);
		var location = icw.modal.positionModal(modal, args);
		icw.modal.setArrowPosition(modal, args, location);
		icw.modal.displayModal(modal, args, location);
		return modal;
	},
	// Hides a currently showing modal dialog
	hide : function(args) {
		// For backwards-compatibility -- makes both "modal" and "args.modal"
		// accessible to the callback
		var modal;
		if (args.modal)
			modal = $(args.modal);
		else
			modal = $(args);
		var anchorid = modal.attr("anchorid");
		var anchor = $("*[anchorid=" + anchorid + "]");
		anchor.removeAttr("modalopen");
		anchor.removeAttr("anchorid");
		// Disable shadows before fading out (only in IE7, controlled via CSS)
		modal.removeClass("icwShowShadows");
		var wrapper = $("#icwModalWrapper" + modal.attr("uniqueId"));
		var washout = $("#icwModalWashout" + modal.attr("uniqueId"));
		var hideSelect = $("#icwModalHideSelect" + modal.attr("uniqueId"));
		if ($(modal).attr("animate")) {
			// Fade out the modal
			$(modal).fadeOut("normal", function() {
				// Remove the modal
					wrapper.hide();
					wrapper.remove();
					// Remove the overlay
					washout.hide();
					washout.remove();
					// Remove the iframe
					hideSelect.hide();
					hideSelect.remove();
					if ($(modal).attr("screen")) {
						$(".icwModal").not("[screen]").css("visibility",
								"visible");
					}
				});
		} else {
			// Remove the modal
			wrapper.hide();
			wrapper.remove();
			// Remove the overlay
			washout.hide();
			washout.remove();
			// Remove the iframe
			hideSelect.hide();
			hideSelect.remove();
		}
		modal = undefined;
	},
	// Sets default values for arguments that have not been specified
	setArgumentDefaults : function(args) {
		if (!args.anchor)
			throw "An anchor must be specified.";
		args.anchor = args.anchor;
		args.content = args.content;
		args.mode = (args.mode != undefined) ? args.mode : "modal";
		args.width = (args.width != undefined) ? args.width : "calculate";
		args.height = (args.height != undefined) ? args.height : "calculate";
		args.maxWidth = (args.maxWidth != undefined) ? args.maxWidth : null;
		args.maxHeight = (args.maxHeight != undefined) ? args.maxHeight : null;
		args.align = (args.align != undefined) ? args.align : "auto";
		args.callback = (args.callback != undefined) ? args.callback : null;
		args.fixOverflow = (args.fixOverflow != undefined) ? args.fixOverflow
				: true;
		args.arrow = (args.arrow != undefined) ? args.arrow
				: (args.mode == "modal") ? false : true;
		args.arrowPos = (args.arrowPos != undefined) ? args.arrowPos
				: (args.arrow) ? "bottom" : null;
		args.screen = (args.screen != undefined) ? args.screen
				: (args.mode == "modal") ? true : false;
		args.animate = (args.animate != undefined) ? args.animate
				: (args.mode == "modal") ? true : false;
		args.animateSpeed = (args.animateSpeed != undefined) ? args.animateSpeed
				: icw.modal.animateSpeed;
	},
	// Creates an overlay on the screen and displays it.
	renderOverlay : function(modal) {
		// If we're using IE, we need to overlay an iframe to block out ActiveX
		// elements such as <select> tags
		if ($.browser.msie) {
			$("body")
					.append(
							'<iframe class="icwModalHideSelect" id="icwModalHideSelect' + modal
									.attr("uniqueId") + '" src="javascript:false;document.write(\'\');"></iframe>');
		}
		// Create the 30% opaque white overlay
		$("body").append(
				'<div class="icwModalWashout" id="icwModalWashout' + modal
						.attr("uniqueId") + '">&nbsp;</div>');
		// Determine the inner dimensions of the browser window
		// Determine the height of the content in the page
		var bodyHeight = $(document).height();
		var bodyWidth = $(document).width();
		// Stretch the iframe to cover the content of the page
		var hideSelect = $("#icwModalHideSelect" + modal.attr("uniqueId"));
		var washout = $("#icwModalWashout" + modal.attr("uniqueId"));
		if ($.browser.msie) {
			hideSelect.height(bodyHeight);
			hideSelect.width(bodyWidth);
		}
		// Stretch the overlay to cover the content of the page
		washout.height(bodyHeight);
		washout.width(bodyWidth);
	},
	// Give a new ID to each item with an ID to avoid replicating them.
	assignNewIds : function(modalContent) {
		$(modalContent).find("*[id]").each( function() {
			var id = $(this).attr("id");
			var newId = "icwModal_" + id;
			$(this).attr("id", newId);
		});
	},
	addModalToPage : function(modal, args) {
		$("body").append(modal);
		$(modal).css("visibility", "hidden"); // Otherwise the box flickers in
												// FF
		$(modal)
				.wrap(
						'<div class="icw" id="icwModalWrapper' + modal
								.attr("uniqueId") + '">');
		// Enable modal only elements
		$(modal).find(".icwModalOnly").each( function() {
			icw.common.uncomment(this);
		});
		$(modal).addClass("icwPreparingModal");
		$(modal).css("visibility", "visible"); // Otherwise the box flickers in
												// FF
		// Now that code is uncommented, attach events
		icw.chrome.initButtons(modal);
		icw.temporary.showDisabledLinkAlerts(modal);
		icw.form.highlightContent();
	},
	// Sizes the modal content based on the arguments specified
	sizeModal : function(modal, args) {
		icw.modal.setArgumentDefaults(args);
		var modalContent = $(modal).find(".icwModalContent");
		var calculatedWidth = args.width == "calculate";
		var calculatedHeight = args.height == "calculate";
		if (calculatedWidth) {
			if (!calculatedHeight)
				modalContent.height(args.height); // Apply the height to deal
													// with wrapping
			args.width = modalContent[0].offsetWidth;
			if (args.maxWidth && (args.width > args.maxWidth))
				args.width = args.maxWidth;
		}
		if (calculatedHeight) {
			if (!calculatedWidth)
				modalContent.width(args.width); // Apply the width to deal with
												// wrapping
			args.height = modalContent[0].offsetHeight;
			if (args.maxHeight && (args.height > args.maxHeight))
				args.height = args.maxHeight;
		}
		var modalDetails = new ModalDetails(modal, args, modalContent);
		if (!calculatedWidth) {
			modalContent.width(modalDetails.modalContentWidth);
			modal.width(modalDetails.modalWidth);
		}
		if (!calculatedHeight) {
			modalContent.height(modalDetails.modalContentHeight);
			modal.height(modalDetails.modalHeight);
		}
		modal.removeClass("icwPreparingModal");
	},
	positionModal : function(modal, args) {
		icw.modal.setArgumentDefaults(args);
		var modalDetails = new ModalDetails(modal, args);
		var anchorDetails = new AnchorDetails(args);
		// Determine the inner dimensions of the browser window
		var scrollTop = $(window).scrollTop();
		var scrollLeft = $(window).scrollLeft();
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		var arrowHeight = $(modal).find(".icwModalArrow").height();
		var arrowWidth = $(modal).find(".icwModalArrow").width();
		// Set the modal's position
		var endTop = 0, endLeft = 0, topAdjustedBy = 0, leftAdjustedBy = 0;
		if (args.mode == "modal") {
			// Center the modal
			endTop = scrollTop
					+ ((winHeight - modalDetails.modalContentHeight) / 2);
			endLeft = scrollLeft
					+ ((winWidth - modalDetails.modalContentWidth) / 2);
			if (modal.is(".icwScrollable"))
				endTop = 0;
		} else {
			// first see if a horiz/vert space was set
			if (args.alignLeft || args.alignRight) {
				var horizSet = true;
			}
			if (args.alignTop || args.alignBottom) {
				var vertSet = true;
			}
			if ((args.align == "auto") && (!horizSet || !vertSet)) {
				// Auto-detect endLeft
				// If the anchor is in the left half of the screen, horiz-align
				// right;
				// If the anchor is in the right half of the screen, horiz-align
				// left.
				var horizSpace = anchorDetails.anchorWidth
						+ modalDetails.modalWidth;
				var vertSpace = anchorDetails.anchorHeight
						+ modalDetails.modalHeight;
				if (horizSpace < winWidth) {
					// there's enough space to do it left-right, so do that
					if (anchorDetails.anchorLeft <= (winWidth / 2)) {
						args.align = "right";
						if (!args.arrowPos) {
							args.arrowPos = "left";
						}
					} else {
						args.align = "left";
						if (!args.arrowPos) {
							args.arrowPos = "right";
						}
					}
				} else {
					// we'll put it above or below
					if ((anchorDetails.anchorTop + (anchorDetails.anchorHeight / 2)) <= (winHeight / 2)) {
						args.align = "bottom";
						if (!args.arrowPos) {
							args.arrowPos = "top";
						}
					} else {
						args.align = "top";
						if (!args.arrowPos) {
							args.arrowPos = "bottom";
						}
					}
				}
			}
			var adjustPaddingLeft = (args.alignLeft == undefined) ? true
					: false;
			var adjustPaddingRight = (args.alignRight == undefined) ? true
					: false;
			var adjustPaddingTop = (args.alignTop == undefined) ? true : false;
			var adjustPaddingBottom = (args.alignBottom == undefined) ? true
					: false;
			if (args.align == "left") {
				args.alignRight = args.alignRight ? args.alignRight
						: "anchorLeft";
				args.arrowPos = "right";
			}
			if (args.align == "right") {
				args.alignLeft = args.alignLeft ? args.alignLeft
						: "anchorRight";
				args.arrowPos = "left";
			}
			if (args.align == "top") {
				args.alignBottom = args.alignBottom ? args.alignBottom
						: "anchorTop";
				args.arrowPos = "bottom";
			}
			if (args.align == "bottom") {
				args.alignTop = args.alignTop ? args.alignTop : "anchorBottom";
				args.arrowPos = "top";
			}
			if (args.align == "center") {
				args.alignTop = "anchorTop + (anchorHeight / 2) - (modalDetails.modalHeight / 2)";
				args.alignLeft = "anchorLeft + (anchorWidth / 2) - (modalDetails.modalWidth / 2)";
			}
			// Refactored the anchor details to a new class, but need to account
			// for passing in old non-prefixed data
			args.alignRight = args.alignRight
					&& args.alignRight.replace(/anchor/g,
							"anchorDetails.anchor");
			args.alignLeft = args.alignLeft
					&& args.alignLeft
							.replace(/anchor/g, "anchorDetails.anchor");
			args.alignBottom = args.alignBottom
					&& args.alignBottom.replace(/anchor/g,
							"anchorDetails.anchor");
			args.alignTop = args.alignTop
					&& args.alignTop.replace(/anchor/g, "anchorDetails.anchor");
			if (args.alignLeft) {
				endLeft = eval(args.alignLeft);
				// if (adjustPaddingLeft) { endLeft = endLeft -
				// (modalDetails.modalPaddingLeft / 2); }
			}
			if (args.alignRight) {
				endLeft = eval(args.alignRight) - modalDetails.modalWidth
						- modalDetails.modalPaddingRight;
				// if (adjustPaddingRight) { endLeft = endLeft -
				// (modalDetails.modalPaddingLeft / 2); }
			}
			if (args.alignTop) {
				endTop = eval(args.alignTop);
				// endTop -= modalDetails.modalPaddingTop / 2;
				// if (adjustPaddingTop) { endTop -=
				// modalDetails.modalPaddingTop / 2; }
			}
			if (args.alignBottom) {
				endTop = eval(args.alignBottom) - modalDetails.modalHeight;
				// endTop = endTop + (modalDetails.modalPaddingBottom / 2);
				// if (adjustPaddingBottom) { endTop = endTop +
				// (modalDetails.modalPaddingBottom / 2); }
			}
			if (!endTop) {
				// if we're horizontally aligned, now set the vertical
				// Set the specific alignment parameters, if they are set
				// default to center...
				endTop = anchorDetails.anchorTop
						+ (anchorDetails.anchorHeight / 2)
						- ((modalDetails.modalHeight - modalDetails.modalPaddingTop) / 2)
						- (arrowHeight / 2);
			}
			if (!endLeft) {
				endLeft = anchorDetails.anchorLeft
						+ (anchorDetails.anchorWidth / 2)
						- ((modalDetails.modalWidth - modalDetails.modalPaddingLeft) / 2)
						- (arrowWidth / 2);
			}
			if (args.fixOverflow) {
				var minTop = scrollTop - (modalDetails.modalPaddingTop / 2);
				var maxTop = winHeight + scrollTop - modalDetails.modalHeight
						+ (modalDetails.modalPaddingBottom / 2);
				var minLeft = scrollLeft - (modalDetails.modalPaddingLeft / 2);
				var maxLeft = (winWidth + scrollLeft) - modalDetails.modalWidth
						+ (modalDetails.modalPaddingRight / 2);
				var minArrowTop = anchorDetails.anchorTop
						+ (anchorDetails.anchorHeight / 2) - (arrowHeight / 2)
						- (modalDetails.modalPaddingTop / 2);
				var maxArrowTop = anchorDetails.anchorTop
						+ (anchorDetails.anchorHeight / 2) + (arrowHeight / 2)
						- modalDetails.modalHeight
						+ modalDetails.modalPaddingBottom;
				// now adjust
				if (!args.alignTop && !args.alignBottom) {
					if (endTop < minTop) {
						endTop = (minArrowTop < minTop) ? minArrowTop : minTop;
					}
					// Adjust the height of the modal if it's off the bottom
					// edge of the screen
					else if (endTop >= maxTop) {
						endTop = (maxArrowTop > maxTop) ? maxArrowTop : maxTop;
					}
				}
				if (endLeft < minLeft) {
					leftAdjustedBy = endLeft - minLeft;
					endLeft = minLeft;
				} else if (endLeft > maxLeft) {
					leftAdjustedBy = maxLeft - endLeft;
					endLeft = maxLeft;
				}
			}
		}
		var modalTitle = $(modal).find(".shareModal").text();
		if (modalTitle == "share123" || (modalTitle.match("share") > 0)) {
			endTop = 10;
		}
		return {
			endTop :endTop,
			endLeft :endLeft,
			topAdjustedBy :topAdjustedBy,
			leftAdjustedBy :leftAdjustedBy
		};
	},
	setArrowPosition : function(modal, args, location) {
		icw.modal.setArgumentDefaults(args);
		var modalDetails = new ModalDetails(modal, args);
		var anchorDetails = new AnchorDetails(args);
		// Set arrow position
		if (args.arrow && args.arrowPos) {
			if (args.arrowPos == "top") {
				$(modal).find(".icwModalArrow").addClass("icwModalArrowTop");
			}
			if (args.arrowPos == "right") {
				$(modal).find(".icwModalArrow").addClass("icwModalArrowRight");
			}
			if (args.arrowPos == "bottom") {
				$(modal).find(".icwModalArrow").addClass("icwModalArrowBottom");
			}
			if (args.arrowPos == "left") {
				$(modal).find(".icwModalArrow").addClass("icwModalArrowLeft");
			}
			var arrowHeight = $(modal).find(".icwModalArrow").height();
			var arrowWidth = $(modal).find(".icwModalArrow").width();
			var arrowTop = 0, arrowLeft = 0;
			if (args.arrowPos == "left" || args.arrowPos == "right") {
				arrowTop = modalDetails.modalHeight / 2 - (arrowHeight / 2);
				if (args.arrowPos == "right")
					arrowLeft = modalDetails.modalWidth
							- modalDetails.modalPaddingRight
							- modalDetails.modalBorderRight;
			} else if (args.arrowPos == "top" || args.arrowPos == "bottom") {
				arrowLeft = modalDetails.modalWidth / 2 - arrowWidth / 2;
				if (args.arrowPos == "bottom")
					arrowTop = modalDetails.modalHeight
							- modalDetails.modalPaddingBottom;
			}
			$(modal).find(".icwModalArrow").css("top",
					arrowTop + location.topAdjustedBy);
			$(modal).find(".icwModalArrow").css("left",
					arrowLeft + location.leftAdjustedBy);
		} else
			$(modal).find(".icwModalArrow").hide();
	},
	displayModal : function(modal, args, location) {
		icw.modal.setArgumentDefaults(args);
		var modalDetails = new ModalDetails(modal, args);
		var anchorDetails = new AnchorDetails(args);
		// Enable shadows immediately since this one isn't fading in
		$(modal).css("width", modalDetails.modalWidth); // Fix for broken bottom
														// shadow in IE7
		if (args.animate) {
			if (args.mode == "modal") {
				var startTop = anchorDetails.anchorTop;
				var startLeft = anchorDetails.anchorLeft;
				$(modal).find(".icwModalArrow").hide();
				// Position the starting point of the modal
				$(modal).css( {
					top :startTop,
					left :startLeft,
					width :0,
					height :0,
					margin :"auto"
				});
				$(modal).animate( {
					top :location.endTop,
					left :location.endLeft,
					width :modalDetails.modalWidth,
					height :modalDetails.modalHeight
				}, args.animateSpeed);
				$(modal).find(".icwModalArrow").show();
			} else {
				$(modal).css( {
					top :location.endTop,
					left :location.endLeft,
					margin :"auto",
					display :"none"
				});
				$(modal).fadeIn("normal");
			}
			$(modal).attr("animate", true);
		} else {
			$(modal).css( {
				top :location.endTop,
				left :location.endLeft,
				margin :"auto"
			});
		}
		$(modal).addClass("icwShowShadows");
		$("#icwModalHideSelect").show();
		var anchor = args.anchor;
		var anchorid = icw.modal.getRandomID();
		$(modal).attr("anchorid", anchorid);
		$(args.anchor).attr("anchorid", anchorid);
		// if (args.mode == "modal")
		$(args.anchor).attr("modalopen", true);
		if (args.screen) {
			$(modal).attr("screen", true);
			$(".icwModal").not("[screen]").css("visibility", "hidden");
		}
	},
	getRandomID : function() {
		return new Date().getTime();
	},
	buildBox : function(args) {
		var modal = $('<div class="icwModal" uniqueId="' + icw.modal
				.getRandomID() + '"></div>');
		modal.append('<div class="icwModalTop">&nbsp;</div>');
		modal.append('<div class="icwModalLeft"></div>');
		modal.find(".icwModalLeft").append('<div class="icwModalRight"></div>');
		modal
				.find(".icwModalRight")
				.append(
						'<div class="icwModalContent icwClear">' + args.content + '</div>');
		modal.append('<div class="icwModalBottomLeft"></div>');
		modal.find(".icwModalBottomLeft").append(
				'<div class="icwModalBottomRight"></div>');
		modal.find(".icwModalBottomRight").append(
				'<div class="icwModalBottom">&nbsp;</div>');
		modal.append('<div class="icwModalArrow">&nbsp;</div>');
		return $(modal);
	},
	getModalDimensions : function(modal) {
		modal = modal[0];
		var display = $(modal).css('display');
		if (display && display != 'none') // Safari bug
		return {
			width :modal.offsetWidth,
			height :modal.offsetHeight
		};
	// All *Width and *Height properties give 0 on elements with display none,
	// so enable the element temporarily
	var els = modal.style;
	var originalVisibility = els.visibility;
	var originalPosition = els.position;
	var originalDisplay = els.display;
	els.visibility = 'hidden';
	els.position = 'absolute';
	els.display = 'block';
	var originalWidth = element.clientWidth, originalHeight = element.clientHeight;
	els.display = originalDisplay;
	els.position = originalPosition;
	els.visibility = originalVisibility;
	return {
		width :originalWidth,
		height :originalHeight
	};
}
};
// The preLoadedModalContent parameter is provided to skip the find call
// if you have already found the modal content. This improves performance on IE6
function ModalDetails(modal, args, preLoadedModalContent) {
	if (args.modalDetails != undefined) // Cache the results
		return args.modalDetails;
	var modalContent = preLoadedModalContent ? preLoadedModalContent : $(modal)
			.find(".icwModalContent");
	this.modalOffsets = modal.offset();
	// Originally these called modal.height() and modal.width(), but reading
	// offsetHeight/offsetWidth directly seems to be much, much faster. (--APD)
	var dims = icw.modal.getModalDimensions(modal);
	this.modalHeight = dims.height;
	this.modalWidth = dims.width;
	this.modalContentOffsets = modalContent.offset();
	this.modalContentHeight = args.height;
	this.modalContentWidth = args.width;
	this.modalPaddingTop = this.modalContentOffsets['top']
			- this.modalOffsets['top'];
	this.modalPaddingBottom = this.modalHeight - this.modalContentHeight
			- this.modalPaddingTop;
	this.modalPaddingLeft = parseFloat($(modal).find(".icwModalLeft").css(
			"paddingLeft"));
	this.modalPaddingRight = parseFloat($(modal).find(".icwModalRight").css(
			"paddingRight"));
	this.modalBorderLeft = parseFloat($(modalContent).css("borderLeftWidth"));
	this.modalBorderRight = parseFloat($(modalContent).css("borderRightWidth"));
	this.modalBorderBottom = parseFloat($(modalContent)
			.css("borderBottomWidth"));
	this.modalBorderTop = parseFloat($(modalContent).css("borderTopWidth"));
	// FF does not calculate modal.width properly - let's force it
	this.modalWidth = this.modalContentWidth + this.modalPaddingLeft
			+ this.modalPaddingRight;
	this.modalHeight = this.modalContentHeight + this.modalPaddingTop
			+ this.modalPaddingBottom - this.modalBorderBottom
			- this.modalBorderTop;
	args.modalDetails = this;
}
function AnchorDetails(args) {
	if (args.anchorDetails != undefined) // Cache the results
		return args.anchorDetails;
	// Get the anchor's position
	this.anchorOffsets = $(args.anchor).offset();
	this.anchorWidth = $(args.anchor).width();
	this.anchorHeight = $(args.anchor).height();
	this.anchorTop = this.anchorOffsets['top'];
	this.anchorLeft = this.anchorOffsets['left'];
	this.anchorRight = this.anchorLeft + this.anchorWidth;
	this.anchorBottom = this.anchorTop + this.anchorHeight;
	args.anchorDetails = this;
}
// ////////////end icw.modal.js////////////////////
// ////////////icw.config.js////////////////////
icw.config = {
	init : function() {
		$("input.icwQuantityInput").live("focus", function(e) {
			$(this).attr("maxlength", "6");
		});
		$("input.icwQuantityInput").die("keypress");
		$("input.icwQuantityInput").live(
				"keypress",
				function(e) {
					if (e.which != 8 && e.which != 9
							&& (e.which < 48 || e.which > 57)) {
						return false;
					}
				});
		$("input.icwQuantityInput").unbind("paste");
		$(".icwQuantityInput").bind('paste', function(e) {
			return false;
		});
		var ccnt = 0;
		$("form").each(
				function() {
					$(this).find("input.icwQuantityInput:not([hybrid])").each(
							function() {
								ccnt = ccnt + 1;
icw.form.attachQuantityInputs({
									quantityInputs :$(this),
									checkBoxes :$(this).parents("td, li").find(
											"input.icwCheckBox")
								});
							});
				});
		// only set the default text for quantity input boxes *after* you have
		// set
		// up the quantity checkboxes, or the blur events will fire in the wrong
		// order.
		icw.form.setDefaultText( {
			inputs :$(".icwQuantityInput"),
			text :"Qty"
		});
		icw.form.setDefaultText( {
			inputs :$(".icwConfigSearch input[type=text]"),
			text :""
		});
	}
};
$( function() {
	icw.config.init();
});
// ////////////end icw.config.js////////////////////
// ////////////icw.progressBar.js////////////////////
icw.progressBar = new function() {
	/**
	 * to store the reference of the progress bar dialog window
	 */
	this.loadingModal = null;
	this.loadSequence = function(loadingData) {
		$(this.loadingModal).find("#content").html(
				"<label id='"
						+ loadingData.name
						+ "' >"
						+ loadingData.label
						+ ((loadingData.label.match("." + "$") == ".") ? ""
								: ".") + "</label>");
	};
	this.showDialog = function() {
		var self = this;
		ccw.modal.show( {
			anchor :$("a")[0],
			content :$(".icwLoadingPage"),
			mode :"modal",
			align :"top",
			animate :false,
			callback : function(modal) {
				// alert(icw.progressBar.loadingModal);
			// alert(self.loadingModal);
			self.loadingModal = modal;
		}
		});
	};
	this.hideDialog = function() {
		ccw.modal.hide(this.loadingModal);
	};
};
// ////////////end icw.progressBar.js////////////////////
// ////////////icw.form.js////////////////////
icw.form = {
	highlightContent : function() {
		$("input[type=text]").each( function() {
			$(this).focus( function() {
				if ($(this).val() != '')
					$(this).select();
				return false;
			});
		});
	},
	enableButton : function(button) {
		var $button = $(button);
		if (!$button.attr("disabled") && !$button.is(".icwButtonDisabled"))
			return;
		$button.removeClass("icwButtonDisabled").removeAttr("disabled")
				.trigger("enable");
	},
	disableButton : function(button) {
		var $button = $(button);
		if ($button.attr("disabled") && $button.is(".icwButtonDisabled"))
			return;
		$button.addClass("icwButtonDisabled").attr("disabled", "disabled")
				.trigger("disable");
	},
	enableLink : function(link) {
		if ($(link).is('button'))
			$(link).find('span').removeClass('icwDisabled');
		else
			$(link).removeClass("icwDisabledLink");
	},
	disableLink : function(link) {
		if ($(link).is('button'))
			$(link).find('span').addClass('icwDisabled');
		else
			$(link).addClass("icwDisabledLink");
	},
	linkCheckAllBox : function(args) {
		var checkAllBox = args.checkAllBox;
		var checkBoxes = args.checkBoxes;
		if (checkBoxes.length <= 0)
			$(checkAllBox).attr("disabled", "disabled");
		checkAllBox.click( function() {
			if ($(this).attr("checked")) {
				checkBoxes.attr("checked", "checked");
			} else {
				checkBoxes.removeAttr("checked");
			}
		});
		checkBoxes.click( function() {
			var allChecked = true;
			checkBoxes.each( function() {
				if (!($(this).attr("checked"))) {
					allChecked = false;
				}
				if (allChecked) {
					checkAllBox.attr("checked", "checked");
				} else {
					checkAllBox.removeAttr("checked");
				}
			});
		});
	},
	// Toggles the enable state of a button based on whether fields have a value
	// Parameters
	// inputs: The inputs to be checked
	// submitButton: The submit button to be toggled
	// minimum: The minimum number of inputs to be filled
	// otherListeners: Other elements that should be monitored for change events
	// to toggle the state checking
	// overrideFunction: A function to run when performing input validation.
	// This function must return
	// a boolean value. If the value is false, it will override the other input
	// checking
	enableSubmitOnVal : function(args) {
		var inputs = args.inputs;
		var submitButton = args.submitButton;
		var minimum = (args.minimum != undefined) ? args.minimum
				: args.inputs.length;
		var otherListeners = args.otherListeners ? $(args.otherListeners)
				: null;
		var overrideFunction = args.overrideFunction ? args.overrideFunction
				: function() {
					return true;
				};
		var enableFunction = function() {
			var numFilled = 0;
			$(inputs).each( function() {
				if (icw.form.hasVal(this)) {
					numFilled++;
					return;
				}
			});
			if (numFilled >= minimum && overrideFunction())
				icw.form.enableButton(submitButton);
			else
				icw.form.disableButton(submitButton);
		};
		icw.form.disableButton(submitButton);
		$(inputs).change(enableFunction).click(enableFunction).keyup(
				enableFunction);
		if (otherListeners)
			otherListeners.change(enableFunction).keyup(enableFunction);
		enableFunction();
	},
	hasVal : function(input) {
		var val;
		if (input.type == "checkbox" || input.type == "radio")
			val = $(input).attr("checked") ? "on" : "";
		else
			val = $(input).val();
		// Check for nonexistent, empty, and whitespace-only values
		return (val != undefined && val.replace(/\s+/g, '') != "");
	},
	setDefaultText : function(args) {
		// have to have some inputs to work with...
		if (args.inputs == undefined) {
			return false;
		}
		var inputs = args.inputs;
		var defaultText = (args.text != undefined) ? args.text : "";
		$(inputs).each( function() {
			$(this).blur( function() {
				// return to the default text if nothing else has been entered
					var currentVal = $(this).val();
					if ((currentVal != '') && (currentVal != defaultText)) {
						$(this).removeClass("icwInactive");
					} else {
						$(this).addClass("icwInactive");
						if (currentVal == '') {
							$(this).val(defaultText);
						}
					}
				});
			$(this).focus( function() {
				// blank out the value if it's currently the default text
					if ($(this).val() == defaultText) {
						$(this).val('');
					}
					$(this).removeClass("icwInactive");
				});
			$(this).blur();
		});
	},
	attachQuantityInputs : function(args) {
		// pniphadk : Do not overwrite this code.
		var quantityInputs = args.quantityInputs;
		var checkBoxes = args.checkBoxes;
		toggleCheckbox = function() {
			var currentVal = parseInt($(this).val());
			var maxVal = getMaxVal(this);
			var userqty = $(this).attr("userqty");
			if (checkBoxes.attr("checked") && userqty == currentVal) {
				$(this).val(userqty);
				$(this).blur();
				return false;
			}
			var currentAjaxVal = 0;
			if ((typeof (currentVal) == "number") && (currentVal > 0)) {
				checkBoxes.attr("checked", "checked");
				$(this).val(parseInt($(this).val(), 10));
				currentAjaxVal = parseInt($(this).val(), 10);
			} else {
				checkBoxes.removeAttr("checked");
				$(this).val('');
			}
			// AJAX call here ...
			// processmakeselection($(this).attr("name"), checkBoxes.attr("id"),
			// currentAjaxVal);
			checkBoxes.change();
			return true;
		};
		var maxValRegex = new RegExp("icwQuantityMax([0-9]+)");
		getMaxVal = function(input) {
			if (!$(input).is("[class*='icwQuantityMax']"))
				return Infinity;
			var matches = maxValRegex.exec($(input).attr("class"));
			if (matches.length < 2)
				return Infinity;
			return parseInt(matches[1]);
		};
		updateQuantity = function() {
			if ($(this).attr("checked")) {
				var buttonType = $(this).attr("type");
				quantityInputs
						.each( function() {
							var currentVal = $(this).val();
							if ((typeof (currentVal) != "number")
									|| (currentVal == 0)) {
								if ((currentVal != "NaN")
										&& (parseInt(currentVal) > 0)) {
									if (buttonType != "radio") {
										$(this).val(currentVal);
									} else {
										// check for ROQ value
										if (($(this).attr("userqty"))
												&& ($(this).attr("userqty") == 0)) {
											// set roq value as it is. This is a
											// first click.
											$(this).val(currentVal);
										} else {
											// SKU is already selected. No need
											// for AJAX call.
											return;
										}
									}
								} else {
									$(this).val("1");
								}
								// $(this).blur();
								$(this).change();
							}
						});
			} else {
				quantityInputs.each( function() {
					$(this).val("");
					// $(this).blur();
						$(this).change();
					});
			}
		};
		quantityInputs.each( function() {
			$(this).change(toggleCheckbox);
			// Code to handle enter key
				$(this).keypress( function(e) {
					if (e.which == 13) {
						return false;
					}
				});
			});
		checkBoxes.click(updateQuantity);
	},
	isFormChanged : function(args) {
		for ( var i = 0; i < args.theForm.elements.length; i++) {
			var e = args.theForm.elements[i];
			if (e.type == "textarea" || e.type == "text") {
				if (e.value != e.defaultValue) {
					return true;
				}
			}
			if (e.type == "select-one") {
				if (e.options[e.selectedIndex].selected != e.options[e.selectedIndex].defaultSelected) {
					return true;
				}
			}
			if (e.type == "select-multiple") {
				for ( var j = 0; j < e.options.length; j++) {
					if (e.options[j].selected != e.options[j].defaultSelected) {
						return true;
					}
				}
			}
			if (e.type == "checkbox" || e.type == "radio") {
				if (e.checked != e.defaultChecked) {
					return true;
				}
			}
		}
		return false;
	}
};
icw.common = {
	uncomment : function(el) {
		var html = $.trim($(el).html());
		html = html.replace(/^<!--/, "");
		html = html.replace(/-->$/, "");
		$(el).html(html);
		return el;
	}
};
// start of party js
// FIXING SANKALP PLEASE MAKE SURE WE MERGE THE FILES PROPERLY FOR PARTY
$(document).ready( function() {
	bindModalCode(".icw a.icwLaunchModal", ".icw .icwAddressModal");
	var jsonReturnObj = null;
	bindModalCode(".icw input.icwLaunchModalButton", ".icw .icwAddressModal");
	var progressBarModal = null;
});
// method to show progress bar
showProgressBar = function(obj, area) {
	/*
	 * icw.modal.show({ anchor : $(obj), content : $("#partyProgressBar"), mode :
	 * "modal", align : "top", alignRight : "anchorLeft", maxWidth : 35, width :
	 * 35, animate : false, modalCssStyleClass : "icwProgressBar",
	 * modalCssHideSelectClass: "icwProgressBarHideSelect",
	 * modalCssWashoutClass: "icwProgressBarWashout", applyHideArea: area,
	 * callback : function(modalinner) { progressBarModal = modalinner; } });
	 */
};
// method to hide progress bar
hideProgressBar = function() { // comment sankalp
// icw.modal.hide(progressBarModal);
};
bindModalCode = function(modalLink, modalWrapperDiv) {
	$(modalLink)
			.each(
					function() {
						if ($(this).attr("class").indexOf("icwBinded") != -1) {
							return;
						}
						$(this).addClass("icwBinded");
						$(this).unbind("click");
						$(this)
								.click(
										function() {
											var params = "isLineScbidFlag=null";
											var height = height = document.body.scrollHeight + 'px';
											$.blockUI();
											// $('#modal-dialog').modalOpen();
											// showProgressBar(this,$("body"));
											if (modalLink == ".icw a.icwLaunchModal"
													|| modalLink == '.icw input.icwLaunchModal') {
												var baseAjaxUrl = $(this).attr(
														"href");
												var id = $(this).attr("id");
											} else if (modalLink == ".icw input.icwLaunchModalButton") { /*
																											 * Start
																											 * of
																											 * Code
																											 * Change
																											 * for
																											 * 5.0
																											 * Disti
																											 * Requirements
																											 */
												/*
												 * TODO Disti 5.0 Non-Stoking
												 * related changes
												 */
												var scbidEligibleCount = 0;
												$(
														".icwTable input[type=checkbox]")
														.not(".icwCheckAllBox")
														.each(
																function(i) {
																	if ($(this)
																			.attr(
																					"checked")) {
																		var lineScbidEligible = $(
																				this)
																				.attr(
																						"isScbidEligible");
																		if (lineScbidEligible == "Y") {
																			scbidEligibleCount++;
																		}
																	}
																});
												var isLineScbidFlag = "N";
												if (scbidEligibleCount > 0) {
													var isLineScbidFlag = "Y";
												} /* TODO Changes end */
												if ($("#isDistiStocking").val() != ""
														&& $("#isDistiStocking")
																.val() == "Y") {
													var baseAjaxUrl = 'XXIBECCKpChangeFavoriteAddrmodal.jsp?addressType=shipping&isScbidFlag=N';
													params = "isLineScbidFlag=N";
												} else {
													var baseAjaxUrl = 'XXIBECCKdChangeFavoriteAddrmodal.jsp';
													if (isLineScbidFlag == "Y") {
														params = "isLineScbidFlag=Y";
													}
												} /*
													 * End of Code Change for
													 * 5.0 Disti Requirements
													 */
												var id = $(this).attr("name");
}
// $.post( baseAjaxUrl,params,
// {},
$.ajax({
																										type :"POST",
														url :baseAjaxUrl,
														data :params,
														dataType :'html',
														timeout :30000,
														error : function(e) {
														},
														success : function(data) {
															if (data
																	.indexOf('<html>') > 0) {
																document
																		.write(data);
															} else {
																data = data
																		.replace(
																				/>\s+</g,
																				"><"); // To
																						// remove
																						// whitespace
																						// between
																						// tags
																						// to
																						// fasten
																						// the
																						// jquery
																						// processing
																// function(data){
																// $(modalWrapperDiv).find(".icwModalOnly").html(data);
																// $(modalWrapperDiv).find(".icwModalOnly").empty();
																// $(modalWrapperDiv).unbind().find(".icwModalOnly").unbind().html(data);
																// alert($(modalWrapperDiv).html());
																// code added to
																// rectify
																// normal submit
																// instead of
																// Ajax submit
																// when cliked
																// in search
																// address link
																// on favorite
																// address
																// screen
																// Fix Start
																$(
																		modalWrapperDiv)
																		.find(
																				".icwModalOnly")
																		.find(
																				".icwLaunchModal")
																		.each(
																				function() {
																					$(
																							this)
																							.unbind(
																									"click");
																					$(
																							this)
																							.click(
																									function() {
																										updateModalCodeOnLinkClick(
																												this,
																												".icwModalOnly",
																												modal,
																												id);
																										return false;
																									});
																				});
																$.unblockUI();
																// Fix End
																// Fix Start
																$(
																		modalWrapperDiv)
																		.find(
																				".icwModalOnly")
																		.find(
																				".icwLaunchModalButton")
																		.each(
																				function() {
																					$(
																							this)
																							.unbind(
																									"click");
																					$(
																							this)
																							.click(
																									function() {
																										updateModalCodeOnButtonClick(
																												this,
																												".icwModalOnly",
																												modal,
																												id);
																										return false;
																									});
});
// Fix End
// $('#modal-dialog').modalHide();
// hideProgressBar();
icw.modal.show({
																			anchor :$(modalLink),
																			dontClone :true,
																			content :$(
																					modalWrapperDiv)
																					.clone(
																							true)
																					.find(
																							".icwModalOnly")
																					.html(
																							data)
																					.end(),
																			mode :"modal",
																			align :"top",
																			alignRight :"anchorLeft",
																			callback : function(
																					modal) {
																				$(
																						".icwModalHideSelect")
																						.css(
																								"height",
																								height);
																				$(
																						".icwModalWashout")
																						.css(
																								"height",
																								height);
																				if ($.browser.msie) {
																					// Fix
																					// for
																					// Apr'10
																					// MR
																					// defect#46918
																					$(
																							modal)
																							.css(
																									"top",
																									$(
																											window)
																											.scrollTop()
																											+ "px");
																					// Alternate
																					// fix
																					// for
																					// Modal
																					// title
																					// width
																					// in
																					// IE>6
																					// $(modal).find("icwModalTitle").css("width"
																					// ,"100%");
																				}
																				$(
																						modal)
																						.css(
																								"left",
																								"20%");
																				$(
																						modal)
																						.css(
																								"width",
																								"46%");
																				// $(
																				// modal
																				// ).find(
																				// modalWrapperDiv).show();
																				// icw.modal.sizeModal(modal,
																				// {height:
																				// 450});
																				window.modalID = id; // Temporary
																										// Fix
																										// for
																										// JAT
																				modalWindowCallBackFns(
																						modal,
																						id);
																				if (baseAjaxUrl == 'XXIBECCKdChangeFavoriteAddrmodal.jsp') {
																					modalCallBackChangeFavShipAddr(
																							modal,
																							id);
																				}
																			}
																		});
															}
														}
													});
											// );
											return false;
										});
					});
};
modalWindowCallBackFns = function(modal, id) {
	$(modal).find("#icwModal_icwButtonJPBack").unbind("click");
	$(modal).find("#icwModal_icwButtonJPBack").click( function() {
		onJPBack( {
			modal :modal
		});
		return false;
	});
	$(modal).find("#icwModal_icwButtonCreateJPCustomer").unbind("click");
	$(modal).find("#icwModal_icwButtonCreateJPCustomer").click( function() {
		createJPCompany( {
			modal :modal
		});
		return false;
	});
	$(modal).find("#icwModal_icwButtonJPCancel").unbind("click");
	$(modal).find("#icwModal_icwButtonJPCancel").click( function() {
		icw.modal.hide(modal);
		return false;
	});
	$(modal).find("table.icwTableScrollable").each(
			function() {
				icw.table.makeScrolling($(this), 200);
				bindAjaxTableHeaders(modal, "a.tableSortLink",
						".icwAjaxTableWrapper", id);
				bindUncommentActions(modal);
				bindCheckAllControls(modal);
			});
	$("#modalWindow").empty();
	$(modal).find("a.icwLaunchModal").unbind("click").click( function() {
		updateModalCodeOnLinkClick(this, ".icwModalOnly", modal, id);
		return false;
	});
	$(modal).find("input.icwLaunchModalButton").unbind("click").click(
			function() {
				updateModalCodeOnButtonClick(this, ".icwModalOnly", modal, id);
				return false;
			});
	$(modal).find("input.icwButton").each(
			function() {
				if ($(this).attr("type").toLowerCase() == "submit") {
					$(this).unbind("click");
					$(this).click(
							function() {
								if ($(this).attr("id") != null
										&& $(this).attr("id").toLowerCase()
												.indexOf("ajax") != -1) {
									updateModalCodeOnFormSubmitHtml("#"
											+ $(this).parents("form")
													.attr("id"),
											".icwModalOnly", modal, id);
								}
								if ($(this).attr("id") != null
										&& $(this).attr("id").toLowerCase()
												.indexOf("json") != -1) {
									updateModalCodeOnFormSubmitJson("#"
											+ $(this).parents("form")
													.attr("id"),
											".icwModalOnly", modal, id);
								}
								if ($(this).attr("id") != null
										&& $(this).attr("id").toLowerCase()
												.indexOf("save") != -1) {
									updateModalCodeOnFormSubmitSave("#"
											+ $(this).parents("form")
													.attr("id"),
											".icwModalOnly", modal, id);
								}
								return false;
							});
				}
			}); /* Start-Script changes of JEUT */
	/*
	 * $(modal).find(".pdrButton").each(function () {
	 * if($(this).attr("type").toLowerCase() == "submit") {
	 * $(this).unbind("click"); $(this).click(function() { if($(this).attr("id") !=
	 * null && $(this).attr("id").toLowerCase().indexOf("ajax") != -1) {
	 * updateModalCodeOnFormSubmitJson("#"+$(this).parents("form").attr("id"),".icwModalOnly",modal,id);
	 * }else if($(this).attr("id") != null &&
	 * $(this).attr("id").toLowerCase().indexOf("JPok") != -1) {
	 * updateModalCodeOnFormSubmitJson("#"+$(this).parents("form").attr("id"),".icwModalOnly",modal,id);
	 * }else if($(this).attr("id") != null &&
	 * $(this).attr("id").toLowerCase().indexOf("lect") != -1) {
	 * updateModalCodeOnFormSubmitJson("#"+$(this).parents("form").attr("id"),".icwModalOnly",modal,id); }
	 * return false; }); } });
	 */
	/* End-Script changes of JEUT */
	$(modal).find("select.icwSelect").unbind("change")
			.change(
					function() {
						if ($(this).attr("id") != null
								&& $(this).attr("id").toLowerCase().indexOf(
										"ajax") != -1) {
							updateModalCodeOnFormSubmitHtml("#"
									+ $(this).parents("form").attr("id"),
									".icwModalOnly", modal, id);
						}
						if ($(this).attr("id") != null
								&& $(this).attr("id").toLowerCase().indexOf(
										"json") != -1) {
							updateModalCodeOnFormSubmitJson("#"
									+ $(this).parents("form").attr("id"),
									".icwModalOnly", modal, id);
						}
						return false;
					});
	/*
	 * icw.form.enableSubmitOnVal({ inputs: $(modal).find(".icwRequiredField"),
	 * submitButton: $(modal).find(".icwButtonCreateContact") });
	 */
	bindButtonToCloseWindowX("input.icwButtonCancel", modal);
	// For enabling/disabling Use Selected Contact Button
	if ($("input.icwButtonUseSelectedContact", $(modal)).length) {
		icw.form.enableSubmitOnVal( {
			inputs :$("input.icwRdo", $(modal)),
			submitButton :$("input.icwButtonUseSelectedContact", $(modal)),
			minimum :1,
			overrideFunction : function() {
				return !($(".dummyRdo").attr("checked"));
			}
		});
	}
	// For enabling/disabling Use Selected Address
	if ($("input.icwButtonUseSelectedAddress", $(modal)).length) {
		icw.form.enableSubmitOnVal( {
			inputs :$("input.icwRdo", $(modal)),
			submitButton :$("input.icwButtonUseSelectedAddress", $(modal)),
			minimum :1
		});
	}
	// For enabling/disabling Use Selected Address Billing Modal window
	if ($("input.icwBillingButton", $(modal)).length) {
		icw.form.enableSubmitOnVal( {
			inputs :$("input.icwRdo", $(modal)),
			submitButton :$("input.icwBillingButton", $(modal)),
			minimum :1
		});
	}
	// For enabling/disabling Use Selected Address
	if ($("input.icwButtonOK", $(modal)).length) {
		icw.form.enableSubmitOnVal( {
			inputs :$("input.checkbox", $(modal)),
			submitButton :$("input.icwButtonOK", $(modal)),
			minimum :1
		});
	}
	// For hiding the Change Address and Select a contact Button at summary page
	// load for End Customer Address
	$(modal).find("input.icwButtonHide").hide();
	// For hiding/Showing the Disabled Note at summary page load for End
	// Customer Address
	$(modal)
			.find(".endCust")
			.each(
					function() { /*
									 * Start of Code Change for 5.0 Disti
									 * Requirements
									 */
						var isShipping = false;
						var isInstall = false;
						var isEndCust = false;
						var isServcContract = false;
						if ($("#icwModal_icwShippingChkBox").attr("checked") == true) {
							isShipping = true;
						}
						if ($("#icwModal_icwInstSiteChkBox").attr("checked") == true) {
							isInstall = true;
						}
						if ($("#icwModal_icwEndCustChkbox").attr("checked") == true) {
							isEndCust = true;
						}
						if ($("#icwModal_icwServiceContractChkBox") != null) {
							if ($("#icwModal_icwServiceContractChkBox").attr(
									"checked") == true) {
								isServcContract = true;
							}
						}
						if (isEndCust && (!isShipping) && (!isInstall)
								&& (!isServcContract)) {
							// Changes for the Cross Track Issue --Infosys
							if ($("#icwModal_icwShippingChkBox").attr(
									"disabled") != true) {
								$("#icwModal_icwDisabledNoteShip").removeClass(
										"icwHidden");
							}
							if ($("#icwModal_icwInstSiteChkBox").attr(
									"disabled") != true) {
								$("#icwModal_icwDisabledNoteInstall")
										.removeClass("icwHidden");
							}
							if ($("#icwModal_icwServiceContractChkBox") != null) {
								if ($("#icwModal_icwServiceContractChkBox")
										.attr("disabled") != true) {
									$(
											"#icwModal_icwDisabledNoteServiceContract")
											.removeClass("icwHidden");
								}
							}
						} else {
							// Changes for the Cross Track Issue --Infosys
							$("#icwModal_icwDisabledNoteShip").addClass(
									"icwHidden");
							$("#icwModal_icwDisabledNoteInstall").addClass(
									"icwHidden");
							$("#icwModal_icwDisabledNoteServiceContract")
									.addClass("icwHidden");
						}
						if (isShipping || isInstall || isEndCust) {
							var isShipChecked = true;
							$("input:hidden[name=isShipChecked]").val(
									isShipChecked); // Start of Code Change for
													// 5.0 Disti Requirements
						}
						if (isServcContract) {
							var isScbidChecked = true;
							$("input:hidden[name=isScbidChecked]").val(
									isScbidChecked); // Start of Code Change
														// for 5.0 Disti
														// Requirements
						} /* End of Code Change for 5.0 Disti Requirements */
					});
};
updateModalCodeOnFormSubmitHtml = function(form, modalWrapperDiv, modal, id) {
	var options = {
		// target: '#output1', // target element(s) to be updated with server
		// response
		beforeSubmit : function() {
			showProgressBar(form, modal);
		},
		success : function(responseText) {
			$(modal).find(modalWrapperDiv).html(responseText);
			// Grab the content for the modal from the corresponding div
		var modalContent = $(modal).find(modalWrapperDiv);
		// Give a new ID to each item with an ID to avoid replicating them
		icw.modal.assignNewIds(modalContent);
		// alert($(modal).find(modalWrapperDiv).html());
		modalWindowCallBackFns(modal, id);
		modalCallBackChangeFavShipAddr(modal, id);
		hideProgressBar();
	} // post-submit callback
	// other available options:
	// url: url // override for form's 'action' attribute
	// type: type // 'get' or 'post', override for form's 'method' attribute
	// dataType: null // 'xml', 'script', or 'json' (expected server response
	// type)
	// clearForm: true // clear all form fields after successful submit
	// resetForm: true // reset the form after successful submit
	// $.ajax options can be used here too, for example:
	// timeout: 3000
	};
	// bind to the form's submit event
	$(form).submit( function() {
		// inside event callbacks 'this' is the DOM element so we first
			// wrap it in a jQuery object and then invoke ajaxSubmit
			$(this).ajaxSubmit(options);
			// !!! Important !!!
			// always return false to prevent standard browser submit and page
			// navigation
			return false;
		});
	$(form).submit();
};
updateModalCodeOnFormSubmitJson = function(form, modalWrapperDiv, modal, id) {
	var options = {
		// target: '#output1', // target element(s) to be updated with server
		// response
		// other available options:
		// url: url // override for form's 'action' attribute
		// type: type // 'get' or 'post', override for form's 'method' attribute
		dataType :'json',
		// 'xml', 'script', or 'json' (expected server response type)
		beforeSubmit : function() {
			showProgressBar(form, modal);
		},
		success : function(data) {
			jsonReturnObj = data;
			fn(jsonReturnObj, window.modalID);
			hideProgressBar();
			icw.modal.hide(modal);
		},
		// post-submit callback
		error : function(xmlHttp) {
			var responseText = xmlHttp.responseText;
			if (responseText.indexOf('<html>') > 0) {
				document.write(responseText);
			} else {
				$(modal).find(modalWrapperDiv).html(responseText);
				// Grab the content for the modal from the corresponding div
		var modalContent = $(modal).find(modalWrapperDiv);
		// Give a new ID to each item with an ID to avoid replicating them
		icw.modal.assignNewIds(modalContent);
		modalWindowCallBackFns(modal, id);
		modalCallBackChangeFavShipAddr(modal, id);
		hideProgressBar();
	}
}
	// clearForm: true // clear all form fields after successful submit
	// resetForm: true // reset the form after successful submit
	// $.ajax options can be used here too, for example:
	// timeout: 3000
	};
	// bind to the form's submit event
	$(form).submit( function() {
		// inside event callbacks 'this' is the DOM element so we first
			// wrap it in a jQuery object and then invoke ajaxSubmit
			$(this).ajaxSubmit(options);
			// !!! Important !!!
			// always return false to prevent standard browser submit and page
			// navigation
			return false;
		});
	$(form).submit();
};
updateModalCodeOnFormSubmitSave = function(form, modalWrapperDiv, modal, id) {
	var options = {
		// target: '#output1', // target element(s) to be updated with server
		// response
		// other available options:
		// url: url // override for form's 'action' attribute
		// type: type // 'get' or 'post', override for form's 'method' attribute
		dataType :'json',
		// 'xml', 'script', or 'json' (expected server response type)
		beforeSubmit : function() {
			showProgressBar(form, modal);
		},
		success : function(data) {
			hideProgressBar();
			icw.modal.hide(modal);
		},
		// post-submit callback
		error : function(xmlHttp) {
			var responseText = xmlHttp.responseText;
			if (responseText.indexOf('<html>') > 0) {
				document.write(responseText);
			} else {
				$(modal).find(modalWrapperDiv).html(responseText);
				// Grab the content for the modal from the corresponding div
		var modalContent = $(modal).find(modalWrapperDiv);
		// Give a new ID to each item with an ID to avoid replicating them
		icw.modal.assignNewIds(modalContent);
		modalWindowCallBackFns(modal, id);
		modalCallBackChangeFavShipAddr(modal, id);
		hideProgressBar();
	}
}
	// clearForm: true // clear all form fields after successful submit
	// resetForm: true // reset the form after successful submit
	// $.ajax options can be used here too, for example:
	// timeout: 3000
	};
	// bind to the form's submit event
	$(form).submit( function() {
		// inside event callbacks 'this' is the DOM element so we first
			// wrap it in a jQuery object and then invoke ajaxSubmit
			$(this).ajaxSubmit(options);
			// !!! Important !!!
			// always return false to prevent standard browser submit and page
			// navigation
			return false;
		});
	$(form).submit();
};
updateModalCodeOnLinkClick = function(modalLink, modalWrapperDiv, modal, id) {
	var baseAjaxUrl = $(modalLink).attr("href");
	showProgressBar(modalLink, modal);
	params = {};
	if ($(modalLink).parents(".icwJATFavoriteBook").length > 0) {
		params.context = "JAT";
	}
	$.post(baseAjaxUrl, params, function(data) {
		$(modal).find(modalWrapperDiv).html(data);
		// Grab the content for the modal from the corresponding div
			var modalContent = $(modal).find(modalWrapperDiv);
			// Give a new ID to each item with an ID to avoid replicating them
			icw.modal.assignNewIds(modalContent);
			modalWindowCallBackFns(modal, id);
			modalCallBackChangeFavShipAddr(modal, id);
			hideProgressBar(); /* Start - Script changes of JEUT */
			// TODO
			// TODO
			/*
			 * var l = baseAjaxUrl.length; var urlsuffix =
			 * baseAjaxUrl.substr((l-3),l); //If the url has .do as suffix...
			 * if(urlsuffix == '.do'){ var whichFlow = ""; var anchor = "";
			 * onClickOfTheResetButton(modal);
			 * $(modal).find("#icwModal_icwButtonCreateJPCustomer").unbind("click");
			 * $(modal).find("#icwModal_icwButtonCreateJPCustomer").click(function () { //
			 * icw.progressBar.initLoading(modal); showProgressBar(this,modal);
			 * createJPCompany({modal : modal, anchor :
			 * anchor,'whichFlow':whichFlow}); return false; });
			 * $(modal).find("#icwModal_icwButtonJPCancel").unbind("click");
			 * $(modal).find("#icwModal_icwButtonJPCancel").click(function () {
			 * icw.modal.hide(modal); return false; });
			 * $(modal).find("#icwModal_icwButtonJPReset").unbind("click");
			 * $(modal).find("#icwModal_icwButtonJPReset").click(function () {
			 * onClickOfTheResetButton(modal); return false; });
			 * $(modal).find("#icwModal_prefectureList1").unbind("change");
			 * $(modal).find("#icwModal_prefectureList1").change(function () {
			 * showProgressBar(this,modal); onJPSearch({modal : modal, anchor :
			 * anchor,'whichFlow':whichFlow}); return false; });
			 * $(modal).find("#icwModal_icwButtonJPSearch").unbind("click");
			 * $(modal).find("#icwModal_icwButtonJPSearch").click(function () { //
			 * icw.progressBar.initLoading(modal); showProgressBar(this,modal);
			 * onJPSearchResults({modal : modal, anchor :
			 * anchor,'whichFlow':whichFlow}); return false; });
			 * $(modal).find("#icwModal_custSearchAddId").unbind("click");
			 * $(modal).find("#icwModal_custSearchAddId").click(function () { //
			 * icw.progressBar.initLoading(modal); showProgressBar(this,modal);
			 * onClickOfTheSearchAddressButton({modal : modal, anchor :
			 * anchor,'whichFlow':whichFlow}); return false; });
			 * $(modal).find("#icwModal_addressBookSearchResultInfoId").unbind("click");
			 * $(modal).find("#icwModal_addressBookSearchResultInfoId").click(function () { //
			 * icw.progressBar.initLoading(modal); showProgressBar(this,modal);
			 * onClickOfTheAddBookSearchButton({modal : modal, anchor :
			 * anchor,'whichFlow':whichFlow}); return false; }); }
			 */
			/* End - Script changes of JEUT */
		});
};
updateModalCodeOnButtonClick = function(modalLink, modalWrapperDiv, modal, id) {
	var baseAjaxUrl = 'XXIBECCKdChangeFavoriteAddrmodal.jsp';
	showProgressBar(modalLink, modal);
	$.post(baseAjaxUrl, {}, function(data) {
		$(modal).find(modalWrapperDiv).html(data);
		// Grab the content for the modal from the corresponding div
			var modalContent = $(modal).find(modalWrapperDiv);
			// Give a new ID to each item with an ID to avoid replicating them
			icw.modal.assignNewIds(modalContent);
			modalWindowCallBackFns(modal, id);
			modalCallBackChangeFavShipAddr(modal, id);
			hideProgressBar();
		});
};
rebindJavaScriptAfterAjaxCall = function(modal, sortLink, ajaxTableWrapperDiv,
		id) {
	bindAjaxTableHeaders(modal, sortLink, ajaxTableWrapperDiv, id);
	bindUncommentActions(modal);
	bindCheckAllControls(modal);
	icw.table.makeScrolling($(modal).find(".icwTableScrollable"), 200);
	$(modal).find(".icwLaunchModal").unbind("click").click( function() {
		updateModalCodeOnLinkClick(this, ".icwModalOnly", modal, id);
		return false;
	});
	$(modal).find(".icwAjaxTableWrapper").find(".icwButton").each(
			function() {
				if ($(this).attr("type").toLowerCase() == "submit") {
					$(this).unbind("click").removeAttr("onclick").click(
							function() {
								if ($(this).attr("id") != null
										&& $(this).attr("id").toLowerCase()
												.indexOf("ajax") != -1) {
									updateModalCodeOnFormSubmitHtml("#"
											+ $(this).parents("form")
													.attr("id"),
											".icwModalOnly", modal, id);
								}
								if ($(this).attr("id") != null
										&& $(this).attr("id").toLowerCase()
												.indexOf("json") != -1) {
									updateModalCodeOnFormSubmitJson("#"
											+ $(this).parents("form")
													.attr("id"),
											".icwModalOnly", modal, id);
								}
								if ($(this).attr("id") != null
										&& $(this).attr("id").toLowerCase()
												.indexOf("save") != -1) {
									updateModalCodeOnFormSubmitSave("#"
											+ $(this).parents("form")
													.attr("id"),
											".icwModalOnly", modal, id);
								}
								return false;
							});
				}
			});
	// For enabling/disabling Use Selected Contact Button
	if ($("input.icwButtonUseSelectedContact").length) {
		icw.form.enableSubmitOnVal( {
			inputs :$("input.icwRdo"),
			submitButton :$("input.icwButtonUseSelectedContact"),
			minimum :1,
			overrideFunction : function() {
				return !($(".dummyRdo").attr("checked"));
			}
		});
	}
	// For enabling/disabling Use Selected Address
	if ($("input.icwButtonUseSelectedAddress").length) {
		icw.form.enableSubmitOnVal( {
			inputs :$("input.icwRdo"),
			submitButton :$("input.icwButtonUseSelectedAddress"),
			minimum :1
		});
	}
	// For enabling/disabling Use Selected Address Billing Modal window
	if ($("input.icwBillingButton").length) {
		icw.form.enableSubmitOnVal( {
			inputs :$("input.icwRdo"),
			submitButton :$("input.icwBillingButton"),
			minimum :1
		});
	}
};
bindAjaxTableHeaders = function(modal, sortLink, ajaxTableWrapperDiv, id) {
	$(modal).find(sortLink).unbind("click");
	$(modal).find(sortLink).click(
			function() {
				var icwAjaxTableWrapperObj = $(this).parents(
						ajaxTableWrapperDiv);
				var noJavaScriptUrl = $(this).attr("href");
				var baseAjaxUrl = noJavaScriptUrl.substring(0, noJavaScriptUrl
						.lastIndexOf("Page&"));
				var colToSortOn = noJavaScriptUrl.substring(noJavaScriptUrl
						.lastIndexOf("sortColumn=") + 11);
				showProgressBar(sortLink, modal);
				$.post(baseAjaxUrl, {
					sortColumn :colToSortOn
				}, function(data) {
					hideProgressBar();
					$(modal).find(ajaxTableWrapperDiv).each(
							function() {
								$(this).html(data);
								rebindJavaScriptAfterAjaxCall(modal, sortLink,
										ajaxTableWrapperDiv, id);
								// bindAjaxTableHeaders(modal,"a.tableSortLink",".icwAjaxTableWrapper");
								// modalWindowCallBackFns($(this),id);
							});
				});
				return false;
			});
};
bindUncommentActions = function(modal) {
	$(".icwDynamicJS", $(modal)).each( function() {
		icw.common.uncomment(this);
	});
	$(".icwNoScript", $(modal)).remove();
};
bindCheckAllControls = function(modal) {
icw.form.linkCheckAllBox({
		checkAllBox :$(".icwTable input.icwCheckAllBox", $(modal)),
		checkBoxes :$(".icwTable input[type=checkbox]", $(modal)).not(
				".icwCheckAllBox")
	});
};
function bindButtonToCloseWindowX(buttn, modal) {
	$(modal).find(buttn).unbind("click").click( function() { /*
																 * Start of Code
																 * Change for
																 * 5.0 PR2
																 * Requirements -
																 * Removing all
																 * session
																 * variables on
																 * click of
																 * cancel button
																 */
		var params = "operation=cancelEvent";
		$.ajax( {
			type :"POST",
			url :"XXIBECCKpChangeFavoriteAddrmodal.jsp",
			data :params,
			dataType :'html',
			timeout :30000,
			error : function(e) {
			},
			success : function(data) {
			}
		}); /*
			 * End of Code Change for 5.0 PR2 Requirements - Removing all
			 * session variables on click of cancel button
			 */
		icw.modal.hide(modal);
		performOnCloseAction(window.modalID);
		return false;
	});
}
function performOnCloseAction(id) {
}
modalCallBackChangeFavShipAddr = function(modal, id) {
	var memoryFlag = false;
	$(modal).find('.icwPartAddrFldSet > div').hide(); // Hide all partial
														// fields when page
														// loads
	function icwShowPartAddr() {
		$(modal).find('.icwPartAddrFldSet > div').show();
		// icw.modal.sizeModal(modal, {height: 500});
	}
	function icwHidePartAddr() {
		$(modal).find('.icwPartAddrFldSet > div').hide();
		// icw.modal.sizeModal(modal, {height: 500});
	}
	function disablePartialRadios() {
		$(modal).find(".icwFormNote").addClass("icwDisabled"); /*
																 * Start of Code
																 * Change for
																 * 5.0 Disti
																 * Requirements -
																 * Added null
																 * check for
																 * radio button
																 */
		if ($(modal).find("#icwModal_icwPartAddrRdoNo") != null) {
			$(modal).find("#icwModal_icwPartAddrRdoNo").attr("disabled",
					"disabled");
		}
		if ($(modal).find("#icwModal_icwPartAddrRdoYes") != null) {
			$(modal).find("#icwModal_icwPartAddrRdoYes").attr("disabled",
					"disabled");
		}
		if ($(modal).find("#icwModal_icwPartAddrRdoYes").attr("checked") == true) { /*
																					 * End
																					 * of
																					 * Code
																					 * Change
																					 * for
																					 * 5.0
																					 * Disti
																					 * Requirements -
																					 * Added
																					 * null
																					 * check
																					 * for
																					 * radio
																					 * button
																					 */
			$(modal).find("#icwModal_icwPartAddrRdoNo").attr("checked",
					"checked");
			memoryFlag = true;
			icwHidePartAddr();
		} else {
			memoryFlag = false;
		}
	}
	function enablePartialRadios() {
		$(modal).find(".icwFormNote").removeClass("icwDisabled"); /*
																	 * Start of
																	 * Code
																	 * Change
																	 * for 5.0
																	 * Disti
																	 * Requirements -
																	 * Added
																	 * null
																	 * check for
																	 * radio
																	 * button
																	 */
		if ($(modal).find("#icwModal_icwPartAddrRdoNo") != null) {
			$(modal).find("#icwModal_icwPartAddrRdoNo").removeAttr("disabled");
		}
		if ($(modal).find("#icwModal_icwPartAddrRdoYes") != null) {
			$(modal).find("#icwModal_icwPartAddrRdoYes").removeAttr("disabled");
		} /*
			 * End of Code Change for 5.0 Disti Requirements - Added null check
			 * for radio button
			 */
		if (memoryFlag) {
			$(modal).find("#icwModal_icwPartAddrRdoYes").attr("checked",
					"checked");
			icwShowPartAddr();
		}
	} /* Start of Code Change for 5.0 Disti Requirements */
	function disableServiceContractCheckBox() {
		if ($(modal).find('#icwModal_icwServContrctAddrChkBox') != null) {
			$(modal).find("#icwModal_icwServContrctAddrChkBox").attr(
					"disabled", "disabled");
			$(modal).find("#icwModal_icwServContrctAddrChkBox").removeAttr(
					"checked");
		}
	}
	function enableServiceContractCheckBox() {
		if ($(modal).find('#icwModal_icwServContrctAddrChkBox') != null) {
			$(modal).find("#icwModal_icwServContrctAddrChkBox").removeAttr(
					"disabled");
		}
	}
	function disableShipInstallEndCustCheckBox() {
		if ($(modal).find('#icwModal_icwShipAddrChkBox') != null
				|| $(modal).find('#icwModal_icwInstSiteChkBox') != null
				|| $(modal).find('#icwModal_icwEndCustChkBox') != null) {
			$(modal).find("#icwModal_icwShipAddrChkBox").attr("disabled",
					"disabled");
			$(modal).find("#icwModal_icwInstSiteChkBox").attr("disabled",
					"disabled");
			$(modal).find("#icwModal_icwEndCustChkBox").attr("disabled",
					"disabled");
			$(modal).find("#icwModal_icwShipAddrChkBox").removeAttr("checked");
			$(modal).find("#icwModal_icwInstSiteChkBox").removeAttr("checked");
			$(modal).find("#icwModal_icwEndCustChkBox").removeAttr("checked");
		}
	}
	function enableShipInstallEndCustCheckBox() {
		if ($(modal).find('#icwModal_icwShipAddrChkBox') != null
				|| $(modal).find('#icwModal_icwInstSiteChkBox') != null
				|| $(modal).find('#icwModal_icwEndCustChkBox') != null) {
			$(modal).find("#icwModal_icwShipAddrChkBox").removeAttr("disabled");
			$(modal).find("#icwModal_icwInstSiteChkBox").removeAttr("disabled");
			$(modal).find("#icwModal_icwEndCustChkBox").removeAttr("disabled");
		}
	} /* End of Code Change for 5.0 Disti Requirements */
	function updateSubmitButtonClickEvent() {
		$(modal)
				.find(".icwButton")
				.each(
						function() {
							var datatype = "json";
							if ($(modal).find("#icwModal_icwPartAddrRdoNo")
									.get(0) != null) {
								if ($(modal).find("#icwModal_icwPartAddrRdoNo")
										.get(0).checked) {
									datatype = "ajax";
								} else {
									datatype = "json";
								}
							}
							if ($(this).attr("type").toLowerCase() == "submit") {
								$(this).unbind("click");
								if (datatype.indexOf("ajax") != -1) {
									$(this)
											.click(
													function() {
														updateModalCodeOnFormSubmitHtml(
																"#"
																		+ $(
																				this)
																				.parents(
																						"form")
																				.attr(
																						"id"),
																".icwModalOnly",
																modal, id);
														return false;
													});
								} else if (datatype.indexOf("json") != -1) {
									$(this)
											.click(
													function() {
														updateModalCodeOnFormSubmitJson(
																"#"
																		+ $(
																				this)
																				.parents(
																						"form")
																				.attr(
																						"id"),
																".icwModalOnly",
																modal, id);
														return false;
													});
								}
							}
						});
	}
	if ($(modal).find("#icwModal_icwPartAddrRdoNo").length) {
		updateSubmitButtonClickEvent();
	}
	/*
	 * If partial address radio is clicked, check to see if End Customer
	 * checkbox is also selected. If it is, show only the country field.
	 * Otherwise, show all partial address fields
	 */
	/* Start of Code Change for 5.0 Disti Requirements */
	$(modal).find('#icwModal_icwShipAddrChkBox').click(
			function() {
				if ($(modal).find('#icwModal_icwShipAddrChkBox') != null) {
					if ($(modal).find('#icwModal_icwShipAddrChkBox').attr(
							"checked") == true) {
						disablePartialRadios();
						disableServiceContractCheckBox();
					} else {
						enablePartialRadios();
						enableServiceContractCheckBox();
					}
				}
				updateSubmitButtonClickEvent();
			});
	$(modal).find('#icwModal_icwInstSiteChkBox').click(
			function() {
				if ($(modal).find('#icwModal_icwInstSiteChkBox') != null) {
					if ($(modal).find('#icwModal_icwInstSiteChkBox').attr(
							"checked") == true) {
						disableServiceContractCheckBox();
					} else {
						enableServiceContractCheckBox();
					}
				}
				updateSubmitButtonClickEvent();
			});
	$(modal).find('#icwModal_icwEndCustChkBox').click(
			function() {
				if ($(modal).find('#icwModal_icwEndCustChkBox') != null) {
					if ($(modal).find('#icwModal_icwEndCustChkBox').attr(
							"checked") == true) {
						disableServiceContractCheckBox();
					} else {
						enableServiceContractCheckBox();
					}
				}
				updateSubmitButtonClickEvent();
			});
	$(modal)
			.find('#icwModal_icwServContrctAddrChkBox')
			.click(
					function() {
						if ($(modal).find('#icwModal_icwServContrctAddrChkBox') != null) {
							if ($(modal).find(
									'#icwModal_icwServContrctAddrChkBox').attr(
									"checked") == true) {
								disablePartialRadios();
								disableShipInstallEndCustCheckBox();
							} else {
								enablePartialRadios();
								enableShipInstallEndCustCheckBox();
							}
						}
						updateSubmitButtonClickEvent();
					}); /* End of Code Change for 5.0 Disti Requirements */
	$(modal).find('#icwModal_icwPartAddrRdoNo').click( function() {
		icwHidePartAddr();
		updateSubmitButtonClickEvent();
	} // end function
	);
	$(modal)
			.find('#icwModal_icwPartAddrRdoYes')
			.click(
					function() {
						if ($(modal).find('#icwModal_icwEndCustChkBox').get(0).checked == true
								&& $(modal).find('#icwModal_icwInstSiteChkBox')
										.get(0).checked == false) {
							icwHidePartAddr();
							$(modal).find('.icwPartAddrCtry').show();
						} else {
							icwShowPartAddr();
						} // end if-else
						updateSubmitButtonClickEvent();
					} // end function
			);
	$(modal).find('#icwModal_icwPartAddrCtry').click( function() {
		updateSubmitButtonClickEvent();
	});
	if ($(modal).find('#icwModal_icwPartAddrRdoYes').get(0) != null) {
		if ($(modal).find('#icwModal_icwPartAddrRdoYes').get(0).checked == true) {
			if ($(modal).find('#icwModal_icwEndCustChkBox').get(0).checked == true
					&& $(modal).find('#icwModal_icwInstSiteChkBox').get(0).checked == false) {
				icwHidePartAddr();
				$(modal).find('.icwPartAddrCtry').show();
			} else {
				icwShowPartAddr();
			}
		}
	}
	$(modal)
			.find('#icwModal_icwEndCustChkBox')
			.click(
					function() {
						if (($(modal).find('#icwModal_icwPartAddrRdoYes')
								.get(0) != null)
								&& ($(this).get(0) != null)) {
							if (($(modal).find('#icwModal_icwPartAddrRdoYes')
									.get(0).checked == true)
									&& ($(this).get(0).checked == true)
									&& $(modal).find(
											'#icwModal_icwInstSiteChkBox').get(
											0).checked == false) {
								icwHidePartAddr();
								$(modal).find('.icwPartAddrCtry').show();
							} else if (($(modal).find(
									'#icwModal_icwPartAddrRdoYes').get(0).checked == true)
									&& ($(this).get(0).checked == true)
									&& ($(modal).find(
											'#icwModal_icwInstSiteChkBox').get(
											0).checked == true)) {
								icwShowPartAddr();
							} else if (($(modal).find(
									'#icwModal_icwPartAddrRdoYes').get(0).checked == true)
									&& ($(this).get(0).checked == false)
									&& ($(modal).find(
											'#icwModal_icwInstSiteChkBox').get(
											0).checked == true)) {
								icwShowPartAddr();
							} else if (($(modal).find(
									'#icwModal_icwPartAddrRdoYes').get(0).checked == true)
									&& ($(this).get(0).checked == false)
									&& ($(modal).find(
											'#icwModal_icwInstSiteChkBox').get(
											0).checked == false)) {
								icwHidePartAddr();
							}
						}
						updateSubmitButtonClickEvent();
					} // end function
			);
	$(modal)
			.find('#icwModal_icwInstSiteChkBox')
			.click(
					function() {
						if (($(modal).find('#icwModal_icwPartAddrRdoYes')
								.get(0) != null)
								&& ($(this).get(0) != null)) {
							if (($(modal).find('#icwModal_icwPartAddrRdoYes')
									.get(0).checked == true)
									&& ($(this).get(0).checked == true)) {
								icwShowPartAddr();
							} else if (($(modal).find(
									'#icwModal_icwPartAddrRdoYes').get(0).checked == true)
									&& ($(this).get(0).checked == false)
									&& $(modal).find(
											'#icwModal_icwEndCustChkBox')
											.get(0).checked == true) {
								icwHidePartAddr();
								$(modal).find('.icwPartAddrCtry').show();
							}
						}
						updateSubmitButtonClickEvent();
					} // end function
			);
}; // end function
// Below JS functions are used by various JSPs
function submitCForm(event, formName) {
	var windowForm = document.forms[formName];
	windowForm.buttonClicked.value = event;
	return true;
}
function submitForm(formName, addressIndex) {
	$.post("DnBFoundMyCompany.do?radioClicked=true", {
		"company" :addressIndex
	}, function(data) {
		$("#icwModal_icwButtonJPSelect").removeAttr("disabled");
		var isAlreadyfavorite = $(data).find("#isFav").val();
		if (isAlreadyfavorite == "yes") {
			$("#icwModal_addToAddBook").attr("disabled", "disabled");
		} else {
			$("#icwModal_addToAddBook").removeAttr("disabled");
		}
	});
}
function submitCFormCreateAddress(event, formName) {
	var windowForm = document.forms[formName];
	windowForm.buttonClicked.value = event;
	windowForm.Country.disabled = false;
	windowForm.State.disabled = false;
	return true;
}
function disableChangeAddress() {
	var $button = $($('.icwButtonApplyAddress')[0]); // Modied for MR Fixes
														// 3979 and 3980
	if (document.AddrSummaryForm.useAddrShipping.checked) {
		if ($button.attr("disabled") && $button.is(".icwButtonDisabled"))
			return;
		$button.addClass("icwButtonDisabled").attr("disabled", "disabled")
				.trigger("disable");
	} else {
		if (!$button.attr("disabled") && !$button.is(".icwButtonDisabled"))
			return;
		$button.removeClass("icwButtonDisabled").removeAttr("disabled")
				.trigger("enable");
	}
}
function disableChangeAddressButtons() {
	var $button = $($('.icwButtonApplyAddress')[0]); // Modied for MR Fixes
														// 3979 and 3980
	var $buttonContact = $($('.icwButtonApplyAddressSelectContact')[0]); // Modied
																			// for
																			// MR
																			// Fixes
																			// 3979
																			// and
																			// 3980
	/* Start of Code Change for 5.0 Disti Requirements */

	var isShipping = false;
	var isInstall = false;
	var isEndCust = false;
	var isServcContract = false;
	if ($("#icwModal_icwShippingChkBox").attr("checked") == true) {
		isShipping = true;
	}
	if ($("#icwModal_icwInstSiteChkBox").attr("checked") == true) {
		isInstall = true;
	}
	if ($("#icwModal_icwEndCustChkbox").attr("checked") == true) {
		isEndCust = true;
	}
	if ($("#icwModal_icwServiceContractChkBox") != null) {
		if ($("#icwModal_icwServiceContractChkBox").attr("checked") == true) {
			isServcContract = true;
		}
	}
	var msgId = ((isShipping) ? "S" : "") + ((isInstall) ? "I" : "")
			+ ((isEndCust) ? "E" : "") + ((isServcContract) ? "C" : ""); // Start
																			// of
																			// Code
																			// Change
																			// for
																			// 5.0
																			// Disti
																			// Requirements
	$("p.messagText span").addClass("icwHidden");
	$("#icwModal_icwSpan" + msgId).removeClass("icwHidden");
	$("h4.icwModalTitle").text($("#icwModal_icwAddress" + msgId).text());
	/*
	 * if(isShipping && isInstall && isEndCust){
	 * $("#icwModal_icwSpan").text("The address below will be used as a
	 * Shipping, Install Site and End Customer address");
	 * $("#icwModal_icwSpanTitle").text("Shipping, Install Site and End
	 * Customer"); }else if(isShipping && isInstall && (!isEndCust)){
	 * $("#icwModal_icwSpan").text("The address below will be used as a Shipping
	 * and Install Site address"); $("#icwModal_icwSpanTitle").text("Shipping
	 * and Install Site"); }else if(isShipping && (!isInstall) && isEndCust){
	 * $("#icwModal_icwSpan").text("The address below will be used as a Shipping
	 * and End Customer address"); $("#icwModal_icwSpanTitle").text("Shipping
	 * and End Customer"); }else if(isShipping && (!isInstall) && (!isEndCust)){
	 * $("#icwModal_icwSpan").text("The address below will be used as a Shipping
	 * address"); $("#icwModal_icwSpanTitle").text("Shipping"); }else
	 * if((!isShipping) && isInstall && isEndCust){
	 * $("#icwModal_icwSpan").text("The address below will be used as an Install
	 * Site and End Customer address");
	 * $("#icwModal_icwSpanTitle").text("Install Site and End Customer"); }else
	 * if((!isShipping) && isInstall && (!isEndCust)){
	 * $("#icwModal_icwSpan").text("The address below will be used as an Install
	 * Site address"); $("#icwModal_icwSpanTitle").text("Install Site"); }else
	 * if((!isShipping) && !(isInstall) && isEndCust){
	 * $("#icwModal_icwSpan").text("The address below will be used as an End
	 * Customer address"); $("#icwModal_icwSpanTitle").text("End Customer");
	 * }else if((!isShipping) && !(isInstall) && (!isEndCust)){
	 * $("#icwModal_icwSpan").text("Please select any of the check box to apply
	 * the following address"); $("#icwModal_icwSpanTitle").text(""); }
	 */
	if (isShipping || isInstall || isEndCust) {
		var isShipChecked = true;
		$("input:hidden[name=isShipChecked]").val(isShipChecked); // Start of
																	// Code
																	// Change
																	// for 5.0
																	// Disti
																	// Requirements
	}
	if (isServcContract) {
		var isScbidChecked = true;
		$("input:hidden[name=isScbidChecked]").val(isScbidChecked); // Start of
																	// Code
																	// Change
																	// for 5.0
																	// Disti
																	// Requirements
	}
	if ((!isShipping) && (!isInstall) && (!isEndCust) && (!isServcContract)) { // Start
																				// of
																				// Code
																				// Change
																				// for
																				// 5.0
																				// Disti
																				// Requirements
		$buttonContact.hide();
		$button.hide();
		// Changes for the Cross Track Issue --Infosys
		$("#icwModal_icwDisabledNoteShip").addClass("icwHidden");
		$("#icwModal_icwDisabledNoteInstall").addClass("icwHidden"); /*
																		 * Start
																		 * of
																		 * Code
																		 * Change
																		 * for
																		 * 5.0
																		 * Disti
																		 * Requirements
																		 */
		$("#icwModal_icwDisabledNoteServiceContract").addClass("icwHidden"); /*
																				 * Start
																				 * of
																				 * Code
																				 * Change
																				 * for
																				 * 5.0
																				 * Disti
																				 * Requirements
																				 */
	} else if (isShipping && (!isServcContract)) { /*
													 * End of Code Change for
													 * 5.0 Disti Requirements
													 */
		$button.show();
		// Changes for the Cross Track Issue --Infosys
		$("#icwModal_icwDisabledNoteShip").addClass("icwHidden");
		$("#icwModal_icwDisabledNoteInstall").addClass("icwHidden");
		$("#icwModal_icwDisabledNoteServiceContract").addClass("icwHidden"); // Start
																				// of
																				// Code
																				// Change
																				// for
																				// 5.0
																				// Disti
																				// Requirements
		if ($button.attr("disabled") && $button.is(".icwButtonDisabled")) {
		} else {
			$button.addClass("icwButtonDisabled").attr("disabled", "disabled")
					.trigger("disable");
		}
		$buttonContact.show();
		if (!$buttonContact.attr("disabled")
				&& !$buttonContact.is(".icwButtonDisabled")) {
		} else {
			$buttonContact.removeClass("icwButtonDisabled").removeAttr(
					"disabled").trigger("enable");
		} /* Start of Code Change for 5.0 Disti Requirements */
	} else if (isServcContract && (isShipping || isInstall || isEndCust)) {
		$button.show();
		// Changes for the Cross Track Issue --Infosys
		if ($("#icwModal_icwShippingChkBox").attr("disabled") != true) {
			$("#icwModal_icwDisabledNoteShip").removeClass("icwHidden");
		}
		if ($("#icwModal_icwInstSiteChkBox").attr("disabled") != true) {
			$("#icwModal_icwDisabledNoteInstall").removeClass("icwHidden");
		}
		if ($("#icwModal_icwServiceContractChkBox").attr("disabled") != true) {
			$("#icwModal_icwDisabledNoteServiceContract").removeClass(
					"icwHidden");
		}
		if (!$button.attr("disabled") && !$button.is(".icwButtonDisabled")) {
		} else {
			$button.removeClass("icwButtonDisabled").removeAttr("disabled")
					.trigger("enable");
		}
		$buttonContact.show();
		if ($buttonContact.attr("disabled")
				&& $buttonContact.is(".icwButtonDisabled")) {
		} else {
			$buttonContact.addClass("icwButtonDisabled").attr("disabled",
					"disabled").trigger("disable");
		} /* End of Code Change for 5.0 Disti Requirements */
	} else if (isEndCust && (!isShipping) && (!isInstall) && (!isServcContract)) {
		$buttonContact.hide();
		$button.show();
		var config = document.getElementById('icwModal_configShippingChkBox');
		var configChk = null;
		if (config != null)
			configChk = config.value;
		if (configChk != "CONFIG") {
			// Changes for the Cross Track Issue --Infosys
			if ($("#icwModal_icwShippingChkBox").attr("disabled") != true) {
				$("#icwModal_icwDisabledNoteShip").removeClass("icwHidden");
			}
		}
		if ($("#icwModal_icwInstSiteChkBox").attr("disabled") != true) {
			$("#icwModal_icwDisabledNoteInstall").removeClass("icwHidden");
		}
		if ($("#icwModal_icwServiceContractChkBox") != null) {
			if ($("#icwModal_icwServiceContractChkBox").attr("disabled") != true) {
				$("#icwModal_icwDisabledNoteServiceContract").removeClass(
						"icwHidden"); // Start of Code Change for 5.0 Disti
										// Requirements
			}
		}
		if (!$button.attr("disabled") && !$button.is(".icwButtonDisabled")) {
		} else {
			$button.removeClass("icwButtonDisabled").removeAttr("disabled")
					.trigger("enable");
		}
	} else {
		$buttonContact.show();
		// Changes for the Cross Track Issue --Infosys
		$("#icwModal_icwDisabledNoteShip").addClass("icwHidden");
		$("#icwModal_icwDisabledNoteInstall").addClass("icwHidden");
		$("#icwModal_icwDisabledNoteServiceContract").addClass("icwHidden"); // Start
																				// of
																				// Code
																				// Change
																				// for
																				// 5.0
																				// Disti
																				// Requirements
		if (!$buttonContact.attr("disabled")
				&& !$buttonContact.is(".icwButtonDisabled")) {
		} else {
			$buttonContact.removeClass("icwButtonDisabled").removeAttr(
					"disabled").trigger("enable");
		}
		$button.show();
		if (!$button.attr("disabled") && !$button.is(".icwButtonDisabled")) {
		} else {
			$button.removeClass("icwButtonDisabled").removeAttr("disabled")
					.trigger("enable");
		}
	}
	// scbid address enable/disable changes as shipping address.
	if (isServcContract && !isShipChecked) {
		$button.show();
		if ($button.attr("disabled") && $button.is(".icwButtonDisabled")) {
		} else {
			$button.addClass("icwButtonDisabled").attr("disabled", "disabled")
					.trigger("disable");
		}
		$buttonContact.show();
		if (!$buttonContact.attr("disabled")
				&& !$buttonContact.is(".icwButtonDisabled")) {
		} else {
			$buttonContact.removeClass("icwButtonDisabled").removeAttr(
					"disabled").trigger("enable");
		}
	}
}
function createRequest() {
	var req;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return req;
}
function addTextBox() {
	$("#icwModal_icwAdvancedSearchStateText").show();
	$("#icwModal_icwAdvancedSearchState").hide();
	$("#icwModal_stateText").removeAttr("disabled");
}
function populateState() {
	var x = document.getElementById('icwModal_icwAdvancedSearchStateProvince');
	$("#icwModal_icwAdvancedSearchStateProvince").html("");
	if (document.SearchTermsAddrForm.icwPartAddrCtry.value != null) {
		addOption(x, "", "Select State/Province");
		var http = createRequest();
		var Country = document.SearchTermsAddrForm.icwPartAddrCtry.value;
		if (Country != "") {
			var data = "Country=" + Country;
			http.open("post", "XXIBECCKpCountry.jsp", true);
			http.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
			http.send(data);
			http.onreadystatechange = function() {
				if (http.readyState == 4) {
					if (http.status == 200) {
						var str = http.responseText;
						var state = str.split("-");
						for (i = 1; i < state.length; i++) {
							addOption(x, state[i], state[i]);
						}
					} else {
						// Eiter Geo Love imes out or no content returned for
						// country.
						// We need to add a text box in the place of opion box
						addTextBox();
					}
				}
			};
		}
	} else {
		addOption(x, "", "Select State/Province");
	}
}
function removeSelectOption() {
	var parentElement = document
			.getElementById('icwModal_icwAdvancedSearchState');
	var childElement = document
			.getElementById('icwModal_icwAdvancedSearchStateProvince');
	parentElement.removeChild(childElement);
}
function removeAllOptions(selectbox) {
	var i;
	for (i = selectbox.options.length - 1; i >= 0; i--) {
		selectbox.remove(i);
	}
}
function addOption(selectbox, value, text) {
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
	$("#icwModal_icwAdvancedSearchStateText").hide();
	$("#icwModal_icwAdvancedSearchState").show();
	$("#icwModal_stateText").attr("disabled", "disabled");
	$("#icwModal_icwAdvancedSearchStateProvince").removeAttr("disabled");
}
// Removes leading whitespaces
function LPartyTrim(value) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
// Removes ending whitespaces
function RPartyTrim(value) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
// Removes leading and ending whitespaces
function partyTrim(value) {
	return LPartyTrim(RPartyTrim(value));
}
function callTrim() {
	var value = document.getElementById('icwModal_icwCreateContactFormPhone').value;
	if (value != null) {
		value = partyTrim(value);
		if (value.length > 25) {
			alert('Please enter a valid Phone Number with 25 Characters');
		}
	}
	return value;
}
function checkPartyMandatoryFields() {
	var f = document.CreateContactForm;
	var disableButton = true;
	var value = callTrim();
	if (f.FirstName.value == "" || f.LastName.value == ""
			|| (value.length > 25 || value.length <= 0)) {
		disableButton = true;
	} else {
		disableButton = false;
	}
	return disableButton;
}
function enablePartyButton() {
	var $button = $($('.icwButtonCreateContact')[0]);
	if (checkPartyMandatoryFields()) {
		if ($button.attr("disabled") && $button.is(".icwButtonDisabled"))
			return;
		$button.addClass("icwButtonDisabled").attr("disabled", "disabled")
				.trigger("disable");
	} else {
		if (!$button.attr("disabled") && !$button.is(".icwButtonDisabled"))
			return;
		$button.removeClass("icwButtonDisabled").removeAttr("disabled")
				.trigger("enable");
	}
}
// Modied for MR Fixes 3979 and 3980 - Start
function addDefaultContact() {
	var f = document.CreateContactForm;
	clearCreateContactForm();
	disableCreateContactForm();
	f.contactType.value = "DEFAULT";
	f.DefPhone.focus();
	enableCreateContactButton();
}
function addIndContact() {
	var f = document.CreateContactForm;
	clearCreateContactForm();
	enableCreateContactForm();
	f.contactType.value = "IND";
	f.FirstName.focus();
	disableCreateContactButton();
}
function clearCreateContactForm() {
	var f = document.CreateContactForm;
	f.FirstName.value = "";
	f.LastName.value = "";
	f.Email.value = "";
	f.Phone.value = "";
	f.Fax.value = "";
	f.DefPhone.value = "";
}
function disableCreateContactForm() {
	var f = document.CreateContactForm;
	f.FirstName.disabled = true;
	f.LastName.disabled = true;
	f.Email.disabled = true;
	f.Phone.disabled = true;
	f.Fax.disabled = true;
	f.DefPhone.disabled = false;
}
function enableCreateContactForm() {
	var f = document.CreateContactForm;
	f.FirstName.disabled = false;
	f.LastName.disabled = false;
	f.Email.disabled = false;
	f.Phone.disabled = false;
	f.Fax.disabled = false;
	f.DefPhone.disabled = true;
}
function disableCreateContactButton() {
	var $button = $($('.icwButtonCreateContact')[0]);
	if ($button.attr("disabled") && $button.is(".icwButtonDisabled"))
		return;
	$button.addClass("icwButtonDisabled").attr("disabled", "disabled").trigger(
			"disable");
}
function enableCreateContactButton() {
	var $button = $($('.icwButtonCreateContact')[0]);
	if (!$button.attr("disabled") && !$button.is(".icwButtonDisabled"))
		return;
	$button.removeClass("icwButtonDisabled").removeAttr("disabled").trigger(
			"enable");
}
// Modied for MR Fixes 3979 and 3980 - End
fn = function(jsonReturnObj, id) {
	var appendValue = id.split('_');
	if (appendValue[0] == 'COChangeShippingAddress') {
		fnUpdateCOItems(jsonReturnObj);
	} else if (appendValue[0] == 'COChangeInstallSiteAddress') {
		fnUpdateCOItems(jsonReturnObj);
	} else if (appendValue[0] == 'COChangeEndCustomerAddress') {
		fnUpdateCOItems(jsonReturnObj);
	} else if (appendValue[0] == 'ChangeBillingContact') {
		var billingContact = "<strong>";
		if (jsonReturnObj.contactName != null) {
			billingContact = billingContact + jsonReturnObj.contactName
					+ "</strong><br />";
		}
		billingContact = billingContact + "<table class=\"icwContactTable\">"
				+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
		if (jsonReturnObj.contactPhone == null
				|| jsonReturnObj.contactPhone == "") {
			billingContact = billingContact + "Not Available </td></tr>";
		} else {
			billingContact = billingContact + jsonReturnObj.contactPhone
					+ "</td></tr>";
		}
		if (jsonReturnObj.contactFax == null || jsonReturnObj.contactFax == "") {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
		} else {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
					+ jsonReturnObj.contactFax + "</td></tr>";
		}
		if (jsonReturnObj.contactMail == null
				|| jsonReturnObj.contactMail == "") {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table></p>";
		} else {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td>"
					+ jsonReturnObj.contactMail + "</td></tr></table></p>";
		}
		document.getElementById('hBillingContactId').value = jsonReturnObj.partyContactId;
		document.getElementById('hBillAddrContChange').value = "change";
		var contactLink = "<a class=\"icwLaunchModal icwSeparate \" id = \"ChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
				+ jsonReturnObj.siteUseId
				+ "&contactId="
				+ jsonReturnObj.contactId + " \">Change Contact</a>";
		var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('RemoveBillingContact_1',"
				+ jsonReturnObj.siteUseId
				+ ");\" id = \"RemoveBillingContact_1\">Remove Contact</a>";
		contactLink = contactLink + contactLinkRemove;
		document.getElementById('billContLink').innerHTML = "<div class=\"icwLeftColumn icwOneThird\">"
				+ billingContact + contactLink + "<\div";
	} else if (appendValue[0] == 'ChangeBillingAddress') {
		var billingAddress = "<strong>" + jsonReturnObj.partyName
				+ "</strong><br />";
		document.getElementById('hBillingPartySiteId').value = jsonReturnObj.partySiteId;
		document.getElementById('hBillingPartyId').value = jsonReturnObj.partyId;
		/** ******** MR Fix 4792 on 09-Nov ********* */
		// alert(jsonReturnObj.siteUseId);
		if (jsonReturnObj.siteUseId != "") {
			billingAddress = billingAddress + "Billing ID:"
					+ jsonReturnObj.siteUseId + "<br />";
		}
		/** ******** End MR Fix 4792 on 09-Nov ********* */
		if (jsonReturnObj.address1 != "") {
			billingAddress = billingAddress + jsonReturnObj.address1 + "<br />";
		}
		if (jsonReturnObj.address2 != "") {
			billingAddress = billingAddress + jsonReturnObj.address2 + "<br />";
		}
		if (jsonReturnObj.address3 != "") {
			billingAddress = billingAddress + jsonReturnObj.address3 + "<br />";
		}
		if (jsonReturnObj.address4 != "") {
			billingAddress = billingAddress + jsonReturnObj.address4 + "<br />";
		}
		billingAddress = billingAddress + jsonReturnObj.city + ", "
				+ jsonReturnObj.state + ",<br />" + jsonReturnObj.postalCode
				+ ", " + jsonReturnObj.country;
		document.getElementById('hBillAddrContChange').value = "change";
		document.getElementById('hPricingFlagChange').value = "change";
		var addressLink = "<a class=\"icwLaunchModal\" id = \"ChangeBillingAddress_1\" href=\"xxibeCCkdBillToTablePage.jsp\">Change Address</a>";
		document.getElementById('billAddrLink').innerHTML = "<div class=\"icwLeftColumn icwOneThird\">"
				+ billingAddress + "<br />" + addressLink + "<\div";
		if (jsonReturnObj.contactName != null
				&& jsonReturnObj.contactName != "") {
			var billingContact = "<strong>";
			if (jsonReturnObj.contactName != null) {
				billingContact = billingContact + jsonReturnObj.contactName
						+ "</strong><br />";
			}
			billingContact = billingContact
					+ "<table class=\"icwContactTable\">"
					+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
			if (jsonReturnObj.contactPhone == null
					|| jsonReturnObj.contactPhone == "") {
				billingContact = billingContact + "Not Available </td></tr>";
			} else {
				billingContact = billingContact + jsonReturnObj.contactPhone
						+ "</td></tr>";
			}
			if (jsonReturnObj.contactFax == null
					|| jsonReturnObj.contactFax == "") {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
			} else {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
						+ jsonReturnObj.contactFax + "</td></tr>";
			}
			if (jsonReturnObj.contactMail == null
					|| jsonReturnObj.contactMail == "") {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table>";
			} else {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td>"
						+ jsonReturnObj.contactMail + "</td></tr></table>";
			}
			document.getElementById('hBillingContactId').value = jsonReturnObj.partyContactId;
			document.getElementById('hBillAddrContChange').value = "change";
			var contactLink = "<a class=\"icwLaunchModal icwSeparate \" id = \"ChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
					+ jsonReturnObj.siteUseId
					+ "&contactId="
					+ jsonReturnObj.contactId + " \">Change Contact</a>";
			var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('RemoveBillingContact_1',"
					+ jsonReturnObj.siteUseId
					+ ");\" id = \"RemoveBillingContact_1\">Remove Contact</a>";
			contactLink = contactLink + contactLinkRemove;
			document.getElementById('billContLink').innerHTML = "<div class=\"icwLeftColumn icwOneThird\">"
					+ billingContact + contactLink + "<\div>";
		} else {
			document.getElementById('hBillingContactId').value = "";
			document.getElementById('hBillAddrContChange').value = "change";
			var contactLink = "<a class=\"icwLaunchModal\" id = \"ChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
					+ jsonReturnObj.siteUseId + " \">Add a contact</a>";
			document.getElementById('billContLink').innerHTML = "<div class=\"icwLeftColumn icwOneThird\">"
					+ contactLink + "<\div>";
		}
	} else if (appendValue[0] == 'COChangeBillingContact') {
		var billingContact = "<p><strong>";
		if (jsonReturnObj.contactName != null) {
			billingContact = billingContact + jsonReturnObj.contactName
					+ "</strong><br />";
		}
		billingContact = billingContact + "<table class=\"icwContactTable\">"
				+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
		if (jsonReturnObj.contactPhone == null
				|| jsonReturnObj.contactPhone == "") {
			billingContact = billingContact + "Not Available </td></tr>";
		} else {
			billingContact = billingContact + jsonReturnObj.contactPhone
					+ "</td></tr>";
		}
		if (jsonReturnObj.contactFax == null || jsonReturnObj.contactFax == "") {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
		} else {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
					+ jsonReturnObj.contactFax + "</td></tr>";
		}
		if (jsonReturnObj.contactMail == null
				|| jsonReturnObj.contactMail == "") {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table></p>";
		} else {
			billingContact = billingContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td>"
					+ jsonReturnObj.contactMail + "</td></tr></table></p>";
		}
		document.getElementById('billingContactId').value = jsonReturnObj.partyContactId;
		document.getElementById('billingSiteUseId').value = jsonReturnObj.siteUseId;
		document.getElementById('billingContact').innerHTML = billingContact;
		document.getElementById('billingContactName').value = jsonReturnObj.contactName;
		document.getElementById('billingTelephone').value = jsonReturnObj.contactPhone;
		document.getElementById('billingFax').value = jsonReturnObj.contactFax;
		document.getElementById('billingEmail').value = jsonReturnObj.contactMail;
		var contactLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
				+ jsonReturnObj.siteUseId
				+ "&contactId="
				+ jsonReturnObj.contactId + " \">Change Contact</a>";
		var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('CORemoveBillingContact_1',"
				+ jsonReturnObj.siteUseId
				+ ");\" id = \"CORemoveBillingContact_1\">Remove Contact</a>";
		contactLink = contactLink + contactLinkRemove;
		document.getElementById('billContactLink').innerHTML = contactLink;
	} else if (appendValue[0] == 'COChangeShippingContact') {
		var ShippingContact = "<p><strong>";
		if (jsonReturnObj.contactName != null) {
			ShippingContact = ShippingContact + jsonReturnObj.contactName
					+ "</strong><br />";
		}
		ShippingContact = ShippingContact + "<table class=\"icwContactTable\">"
				+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
		if (jsonReturnObj.contactPhone == null
				|| jsonReturnObj.contactPhone == "") {
			ShippingContact = ShippingContact + "Not Available </td></tr>";
		} else {
			ShippingContact = ShippingContact + jsonReturnObj.contactPhone
					+ "</td></tr>";
		}
		if (jsonReturnObj.contactFax == null || jsonReturnObj.contactFax == "") {
			ShippingContact = ShippingContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
		} else {
			ShippingContact = ShippingContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
					+ jsonReturnObj.contactFax + "</td></tr>";
		}
		if (jsonReturnObj.contactMail == null
				|| jsonReturnObj.contactMail == "") {
			ShippingContact = ShippingContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table></p>";
		} else {
			ShippingContact = ShippingContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td>"
					+ jsonReturnObj.contactMail + "</td></tr></table></p>";
		}
		document.getElementById('shippingContactId').value = jsonReturnObj.partyContactId;
		document.getElementById('shippingSiteUseId').value = jsonReturnObj.siteUseId;
		document.getElementById('shippingContact').innerHTML = ShippingContact;
		document.getElementById('shippingContactName').value = jsonReturnObj.contactName;
		document.getElementById('shippingTelephone').value = jsonReturnObj.contactPhone;
		document.getElementById('shippingFax').value = jsonReturnObj.contactFax;
		document.getElementById('shippingEmail').value = jsonReturnObj.contactMail;
		var contactLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeShippingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=shipping&siteUseId="
				+ jsonReturnObj.siteUseId
				+ "&contactId="
				+ jsonReturnObj.contactId + " \">Change Contact</a>";
		var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('CORemoveShippingContact_1',"
				+ jsonReturnObj.siteUseId
				+ ");\" id = \"CORemoveShippingContact_1\">Remove Contact</a>";
		contactLink = contactLink + contactLinkRemove;
		document.getElementById('shippingContactLink').innerHTML = contactLink;
	} else if (appendValue[0] == 'COChangeInstallSiteContact') {
		var InstallSiteContact = "<p><strong>";
		if (jsonReturnObj.contactName != null) {
			InstallSiteContact = InstallSiteContact + jsonReturnObj.contactName
					+ "</strong><br />";
		}
		InstallSiteContact = InstallSiteContact
				+ "<table class=\"icwContactTable\">"
				+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
		if (jsonReturnObj.contactPhone == null
				|| jsonReturnObj.contactPhone == "") {
			InstallSiteContact = InstallSiteContact
					+ "Not Available </td></tr>";
		} else {
			InstallSiteContact = InstallSiteContact
					+ jsonReturnObj.contactPhone + "</td></tr>";
		}
		if (jsonReturnObj.contactFax == null || jsonReturnObj.contactFax == "") {
			InstallSiteContact = InstallSiteContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
		} else {
			InstallSiteContact = InstallSiteContact
					+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
					+ jsonReturnObj.contactFax + "</td></tr>";
		}
		if (jsonReturnObj.contactMail == null
				|| jsonReturnObj.contactMail == "") {
			InstallSiteContact = InstallSiteContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table></p>";
		} else {
			InstallSiteContact = InstallSiteContact
					+ "<tr><td class = \"icwContactType\">Email: </td><td>"
					+ jsonReturnObj.contactMail + "</td></tr></table></p>";
		}
		document.getElementById('installContactId').value = jsonReturnObj.contactId;
		document.getElementById('installSiteUseId').value = jsonReturnObj.siteUseId;
		document.getElementById('installContact').innerHTML = InstallSiteContact;
		document.getElementById('installContactName').value = jsonReturnObj.contactName;
		document.getElementById('installTelephone').value = jsonReturnObj.contactPhone;
		document.getElementById('installFax').value = jsonReturnObj.contactFax;
		document.getElementById('installEmail').value = jsonReturnObj.contactMail;
		var contactLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeInstallSiteContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
				+ jsonReturnObj.siteUseId
				+ "&contactId="
				+ jsonReturnObj.contactId + " \">Change Contact</a>";
		var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('CORemoveInstallSiteContact_1',"
				+ jsonReturnObj.siteUseId
				+ ");\" id = \"CORemoveInstallSiteContact_1\">Remove Contact</a>";
		contactLink = contactLink + contactLinkRemove;
		document.getElementById('insContactLink').innerHTML = contactLink;
	} else if (appendValue[0] == 'COChangeBillingAddress') {
		var billingAddress = "<strong>" + jsonReturnObj.partyName
				+ "</strong><br />";
		/** ******** MR Fix 4792 on 09-Nov ********* */
		// alert(jsonReturnObj.siteUseId);
		if (jsonReturnObj.siteUseId != "") {
			billingAddress = billingAddress + "Billing ID:"
					+ jsonReturnObj.siteUseId + "<br />";
		}
		/** ******** End MR Fix 4792 on 09-Nov ********* */
		if (jsonReturnObj.address1 != "") {
			billingAddress = billingAddress + jsonReturnObj.address1 + "<br />";
		}
		if (jsonReturnObj.address2 != "") {
			billingAddress = billingAddress + jsonReturnObj.address2 + "<br />";
		}
		if (jsonReturnObj.address3 != "") {
			billingAddress = billingAddress + jsonReturnObj.address3 + "<br />";
		}
		if (jsonReturnObj.address4 != "") {
			billingAddress = billingAddress + jsonReturnObj.address4 + "<br />";
		}
		billingAddress = billingAddress + jsonReturnObj.city + ", "
				+ jsonReturnObj.state + ",<br />" + jsonReturnObj.postalCode
				+ ", " + jsonReturnObj.country;
		document.getElementById('billingSiteUseId').value = jsonReturnObj.siteUseId;
		document.getElementById('billingAddress').innerHTML = billingAddress;
		document.getElementById('billingCompanyName').value = jsonReturnObj.partyName;
		document.getElementById('billingAddress1').value = jsonReturnObj.address1;
		document.getElementById('billingAddress2').value = jsonReturnObj.address2;
		document.getElementById('billingAddress3').value = jsonReturnObj.address3;
		document.getElementById('billingAddress4').value = jsonReturnObj.address4;
		document.getElementById('billingCity').value = jsonReturnObj.city;
		document.getElementById('billingState').value = jsonReturnObj.state;
		document.getElementById('billingPostalCode').value = jsonReturnObj.postalCode;
		document.getElementById('billingCountry').value = jsonReturnObj.country; /*
																					 * Start
																					 * of
																					 * changes
																					 * For
																					 * defect
																					 * 30698
																					 */
		$("input:hidden[name=customerNumber]")
				.val(jsonReturnObj.customerNumber);
		$("input:hidden[name=billToCountry]").val(jsonReturnObj.country);
		$("input:hidden[name=billingSiteUseId]").val(jsonReturnObj.siteUseId);
		refreshSvcPrefLovs(); // Rani
		/* End of changes For defect 30698 */

		var addressLink = "<a class=\"icwLaunchModal \" id = \"COChangeBillingAddress_1\" href=\"xxibeCCkdBillToTablePage.jsp\">Change Address</a>";
		document.getElementById('billAddressLink').innerHTML = addressLink;
		if (jsonReturnObj.contactName != null
				&& jsonReturnObj.contactName != "") {
			var billingContact = "<p><strong>";
			if (jsonReturnObj.contactName != null) {
				billingContact = billingContact + jsonReturnObj.contactName
						+ "</strong><br />";
			}
			billingContact = billingContact
					+ "<table class=\"icwContactTable\">"
					+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
			if (jsonReturnObj.contactPhone == null
					|| jsonReturnObj.contactPhone == "") {
				billingContact = billingContact + "Not Available </td></tr>";
			} else {
				billingContact = billingContact + jsonReturnObj.contactPhone
						+ "</td></tr>";
			}
			if (jsonReturnObj.contactFax == null
					|| jsonReturnObj.contactFax == "") {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
			} else {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
						+ jsonReturnObj.contactFax + "</td></tr>";
			}
			if (jsonReturnObj.contactMail == null
					|| jsonReturnObj.contactMail == "") {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table></p>";
			} else {
				billingContact = billingContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td>"
						+ jsonReturnObj.contactMail + "</td></tr></table></p>";
			}
			document.getElementById('billingContactId').value = jsonReturnObj.partyContactId;
			document.getElementById('billingContact').innerHTML = billingContact;
			document.getElementById('billingContactName').value = jsonReturnObj.contactName;
			document.getElementById('billingTelephone').value = jsonReturnObj.contactPhone;
			document.getElementById('billingFax').value = jsonReturnObj.contactFax;
			document.getElementById('billingEmail').value = jsonReturnObj.contactMail;
			var contactLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
					+ jsonReturnObj.siteUseId
					+ "&contactId="
					+ jsonReturnObj.contactId + " \">Change Contact</a>";
			var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('CORemoveBillingContact_1',"
					+ jsonReturnObj.siteUseId
					+ ");\" id = \"CORemoveBillingContact_1\">Remove Contact</a>";
			contactLink = contactLink + contactLinkRemove;
			document.getElementById('billContactLink').innerHTML = contactLink;
		} else {
			var contactLink = "<a class=\"icwLaunchModal\" id = \"COChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
					+ jsonReturnObj.siteUseId + "\">Add a Contact</a>";
			document.getElementById('billContactLink').innerHTML = contactLink;
			document.getElementById('billingContactId').value = "";
			document.getElementById('billingContact').innerHTML = "";
			document.getElementById('billingContactName').value = "";
			document.getElementById('billingTelephone').value = "";
			document.getElementById('billingFax').value = "";
			document.getElementById('billingEmail').value = "";
		}
		// Added the code for ICW 3.0
		$('#displayCreateOrder').hide();
		if (document.getElementById('billToError') != null) {
			document.getElementById('billToError').value = "";
		}
		// End of ICW 3.0
		enableButton();
		enablePartyLinks();
	}
	bindModalCode(".icw a.icwLaunchModal", ".icw .icwAddressModal");
	performOnCloseAction(null);
};
fnUpdateCOItems = function(jsonReturnObject) {
	if (jsonReturnObj.isShipping == 'true') {
		var shippingAddress = "<strong>" + jsonReturnObj.partyName
				+ "</strong><br />";
		if (jsonReturnObj.address1 != "") {
			shippingAddress = shippingAddress + jsonReturnObj.address1
					+ "<br />";
		}
		if (jsonReturnObj.address2 != "") {
			shippingAddress = shippingAddress + jsonReturnObj.address2
					+ "<br />";
		}
		if (jsonReturnObj.address3 != "") {
			shippingAddress = shippingAddress + jsonReturnObj.address3
					+ "<br />";
		}
		if (jsonReturnObj.address4 != "") {
			shippingAddress = shippingAddress + jsonReturnObj.address4
					+ "<br />";
		}
		shippingAddress = shippingAddress + jsonReturnObj.city + ", "
				+ jsonReturnObj.state + ",<br />" + jsonReturnObj.postalCode
				+ ", " + jsonReturnObj.country;
		document.getElementById('shippingSiteUseId').value = jsonReturnObj.siteUseId;
		document.getElementById('shippingAddress').innerHTML = shippingAddress;
		document.getElementById('shippingCompanyName').value = jsonReturnObj.partyName;
		document.getElementById('shippingAddress1').value = jsonReturnObj.address1;
		document.getElementById('shippingAddress2').value = jsonReturnObj.address2;
		document.getElementById('shippingAddress3').value = jsonReturnObj.address3;
		document.getElementById('shippingAddress4').value = jsonReturnObj.address4;
		document.getElementById('shippingCity').value = jsonReturnObj.city;
		document.getElementById('shippingState').value = jsonReturnObj.state;
		document.getElementById('shippingPostalCode').value = jsonReturnObj.postalCode;
		document.getElementById('shippingCountry').value = jsonReturnObj.country;
		var addressLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeShippingAddress_1\" href=\"XXIBECCKpChangeFavoriteAddrmodal.jsp?addressType=shipping\">Change Address</a>";
		var addressLinkRemove = "<a href=\"#\" onclick=\"removeAddress('CORemoveShippingAddress_1');\" id = \"CORemoveShippingAddress_1\">Remove Address</a>";
		addressLink = addressLink + addressLinkRemove;
		document.getElementById('shippingAddressLink').innerHTML = addressLink;
		document.getElementById('shippingContact').innerHTML = "";
		if (jsonReturnObj.contactName != null
				&& jsonReturnObj.contactName != "") {
			var shippingContact = "<p><strong>";
			if (jsonReturnObj.contactName != null) {
				shippingContact = shippingContact + jsonReturnObj.contactName
						+ "</strong><br />";
			}
			shippingContact = shippingContact
					+ "<table class=\"icwContactTable\">"
					+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
			if (jsonReturnObj.contactPhone == null
					|| jsonReturnObj.contactPhone == "") {
				shippingContact = shippingContact + "Not Available </td></tr>";
			} else {
				shippingContact = shippingContact + jsonReturnObj.contactPhone
						+ "</td></tr>";
			}
			if (jsonReturnObj.contactFax == null
					|| jsonReturnObj.contactFax == "") {
				shippingContact = shippingContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
			} else {
				shippingContact = shippingContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
						+ jsonReturnObj.contactFax + "</td></tr>";
			}
			if (jsonReturnObj.contactMail == null
					|| jsonReturnObj.contactMail == "") {
				shippingContact = shippingContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table></p>";
			} else {
				shippingContact = shippingContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td>"
						+ jsonReturnObj.contactMail + "</td></tr></table></p>";
			}
			var contactLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeShippingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=shipping&siteUseId="
					+ jsonReturnObj.siteUseId
					+ "&contactId="
					+ jsonReturnObj.contactId + " \">Change Contact</a>";
			var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('CORemoveShippingContact_1',"
					+ jsonReturnObj.siteUseId
					+ ");\" id = \"CORemoveShippingContact_1\">Remove Contact</a>";
			contactLink = contactLink + contactLinkRemove;
			document.getElementById('shippingContactId').value = jsonReturnObj.partyContactId;
			document.getElementById('shippingContact').innerHTML = shippingContact;
			document.getElementById('shippingContactLink').innerHTML = contactLink;
			document.getElementById('shippingContactName').value = jsonReturnObj.contactName;
			document.getElementById('shippingTelephone').value = jsonReturnObj.contactPhone;
			document.getElementById('shippingFax').value = jsonReturnObj.contactFax;
			document.getElementById('shippingEmail').value = jsonReturnObj.contactMail;
		} else {
			var contactLink = "<a class=\"icwLaunchModal\" id = \"COChangeShippingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=shipping&siteUseId="
					+ jsonReturnObj.siteUseId + " \">Add a Contact</a>";
			document.getElementById('shippingContactId').value = jsonReturnObj.partyContactId;
			document.getElementById('shippingContactLink').innerHTML = contactLink;
			document.getElementById('shippingContactName').value = "";
			document.getElementById('shippingTelephone').value = "";
			document.getElementById('shippingFax').value = "";
			document.getElementById('shippingEmail').value = "";
		}
	}
	if (jsonReturnObj.isInstallSite == 'true') {
		var installAddress = "<strong>" + jsonReturnObj.partyName
				+ "</strong><br />";
		if (jsonReturnObj.address1 != "") {
			installAddress = installAddress + jsonReturnObj.address1 + "<br />";
		}
		if (jsonReturnObj.address2 != "") {
			installAddress = installAddress + jsonReturnObj.address2 + "<br />";
		}
		if (jsonReturnObj.address3 != "") {
			installAddress = installAddress + jsonReturnObj.address3 + "<br />";
		}
		if (jsonReturnObj.address4 != "") {
			installAddress = installAddress + jsonReturnObj.address4 + "<br />";
		}
		installAddress = installAddress + jsonReturnObj.city + ", "
				+ jsonReturnObj.state + ",<br />" + jsonReturnObj.postalCode
				+ ", " + jsonReturnObj.country;
		var addressLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeInstallSiteAddress_1\" href=\"XXIBECCKpChangeFavoriteAddrmodal.jsp?addressType=installsite\">Change Address</a>";
		var addressLinkRemove = "<a href=\"#\" onclick=\"removeAddress('CORemoveInstallSiteAddress_1');\" id = \"CORemoveInstallSiteAddress_1\">Remove Address</a>";
		addressLink = addressLink + addressLinkRemove;
		document.getElementById('installSiteUseId').value = jsonReturnObj.siteUseId;
		document.getElementById('installAddress').innerHTML = installAddress;
		document.getElementById('installAddressLink').innerHTML = addressLink;
		document.getElementById('installCompanyName').value = jsonReturnObj.partyName;
		document.getElementById('installAddress1').value = jsonReturnObj.address1;
		document.getElementById('installAddress2').value = jsonReturnObj.address2;
		document.getElementById('installAddress3').value = jsonReturnObj.address3;
		document.getElementById('installAddress4').value = jsonReturnObj.address4;
		document.getElementById('installCity').value = jsonReturnObj.city;
		document.getElementById('installState').value = jsonReturnObj.state;
		document.getElementById('installPostalCode').value = jsonReturnObj.postalCode;
		document.getElementById('installCountry').value = jsonReturnObj.country;
		document.getElementById('installContact').innerHTML = "";
		$("input:hidden[name=installsiteCountry]").val(jsonReturnObj.country); // Rani
		refreshSvcPrefLovs(); // Rani
		disableInstallSitePartialAddress();
		enableButton();
		if (jsonReturnObj.contactName != null
				&& jsonReturnObj.contactName != "") {
			var installContact = "<p><strong>";
			if (jsonReturnObj.contactName != null) {
				installContact = installContact + jsonReturnObj.contactName
						+ "</strong><br />";
			}
			installContact = installContact
					+ "<table class=\"icwContactTable\">"
					+ "<tr><td class = \"icwContactType\">Phone: </td><td>";
			if (jsonReturnObj.contactPhone == null
					|| jsonReturnObj.contactPhone == "") {
				installContact = installContact + "Not Available </td></tr>";
			} else {
				installContact = installContact + jsonReturnObj.contactPhone
						+ "</td></tr>";
			}
			if (jsonReturnObj.contactFax == null
					|| jsonReturnObj.contactFax == "") {
				installContact = installContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> Not Available </td></tr>";
			} else {
				installContact = installContact
						+ "<tr><td class = \"icwContactType\">Fax: </td><td> "
						+ jsonReturnObj.contactFax + "</td></tr>";
			}
			if (jsonReturnObj.contactMail == null
					|| jsonReturnObj.contactMail == "") {
				installContact = installContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td> Not Available </td></tr></table></p>";
			} else {
				installContact = installContact
						+ "<tr><td class = \"icwContactType\">Email: </td><td>"
						+ jsonReturnObj.contactMail + "</td></tr></table></p>";
			}
			var contactLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeInstallSiteContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=installsite&siteUseId="
					+ jsonReturnObj.siteUseId
					+ "&contactId="
					+ jsonReturnObj.contactId + " \">Change Contact</a>";
			var contactLinkRemove = "<a href=\"#\" onclick=\"removeContact('CORemoveInstallSiteContact_1',"
					+ jsonReturnObj.siteUseId
					+ ");\" id = \"CORemoveInstallSiteContact_1\">Remove Contact</a>";
			contactLink = contactLink + contactLinkRemove;
			document.getElementById('installContactId').value = jsonReturnObj.contactId;
			document.getElementById('installContact').innerHTML = installContact;
			document.getElementById('insContactLink').innerHTML = contactLink;
			document.getElementById('installContactName').value = jsonReturnObj.contactName;
			document.getElementById('installTelephone').value = jsonReturnObj.contactPhone;
			document.getElementById('installFax').value = jsonReturnObj.contactFax;
			document.getElementById('installEmail').value = jsonReturnObj.contactMail;
		} else {
			var contactLink = "<a class=\"icwLaunchModal\" id = \"COChangeInstallSiteContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=installsite&siteUseId="
					+ jsonReturnObj.siteUseId + " \">Add a Contact</a>";
			document.getElementById('insContactLink').innerHTML = contactLink;
			document.getElementById('installContactName').value = "";
			document.getElementById('installTelephone').value = "";
			document.getElementById('installFax').value = "";
			document.getElementById('installEmail').value = "";
			document.getElementById('installContactId').value = "";
		}
	}
	if (jsonReturnObj.isEndCustomer == 'true') {
		var endUserAddress = "<strong>" + jsonReturnObj.partyName
				+ "</strong><br />";
		if (jsonReturnObj.address1 != "") {
			endUserAddress = endUserAddress + jsonReturnObj.address1 + "<br />";
		}
		if (jsonReturnObj.address2 != "") {
			endUserAddress = endUserAddress + jsonReturnObj.address2 + "<br />";
		}
		if (jsonReturnObj.address3 != "") {
			endUserAddress = endUserAddress + jsonReturnObj.address3 + "<br />";
		}
		if (jsonReturnObj.address4 != "") {
			endUserAddress = endUserAddress + jsonReturnObj.address4 + "<br />";
		}
		endUserAddress = endUserAddress + jsonReturnObj.city + ", "
				+ jsonReturnObj.state + ",<br />" + jsonReturnObj.postalCode
				+ ", " + jsonReturnObj.country;
		document.getElementById('enduserSiteUseId').value = jsonReturnObj.siteUseId;
		document.getElementById('endUserAddress').innerHTML = endUserAddress;
		document.getElementById('enduserCompanyName').value = jsonReturnObj.partyName;
		document.getElementById('enduserAddress1').value = jsonReturnObj.address1;
		document.getElementById('enduserAddress2').value = jsonReturnObj.address2;
		document.getElementById('enduserAddress3').value = jsonReturnObj.address3;
		document.getElementById('enduserAddress4').value = jsonReturnObj.address4;
		document.getElementById('enduserCity').value = jsonReturnObj.city;
		document.getElementById('enduserState').value = jsonReturnObj.state;
		document.getElementById('enduserPostalCode').value = jsonReturnObj.postalCode;
		document.getElementById('enduserCountry').value = jsonReturnObj.country;
		var addressLink = "<a class=\"icwLaunchModal icwSeparate\" id = \"COChangeEndCustomerAddress_1\" href=\"XXIBECCKpChangeFavoriteAddrmodal.jsp?addressType=endcustomer\">Change Address</a>";
		var addressLinkRemove = "<a href=\"#\" onclick=\"removeAddress('CORemoveEndCustomerAddress_1');\" id = \"CORemoveEndCustomerAddress_1\">Remove Address</a>";
		addressLink = addressLink + addressLinkRemove;
		document.getElementById('endUserAddressLink').innerHTML = addressLink;
		disabledEndUserPartialAddress();
		enableButton();
	}
	bindModalCode(".icw a.icwLaunchModal", ".icw .icwAddressModal");
};
function removeContact(id, siteUseId) {
	var appendValue = id.split('_');
	if (appendValue[0] == 'CORemoveBillingContact') {
		document.getElementById('billingContactId').value = "";
		document.getElementById('billingContactName').value = "";
		document.getElementById('billingTelephone').value = "";
		document.getElementById('billingFax').value = "";
		document.getElementById('billingEmail').value = "";
		var contactLink = "<br /><div id=\"billingContact\"></div><div id=\"billContactLink\">";
		contactLink = contactLink
				+ "<a class=\"icwLaunchModal \" id = \"COChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
				+ siteUseId + " \">Add a Contact</a>";
		contactLink = contactLink + "</div>";
		document.getElementById('billingContactDetails').innerHTML = contactLink;
	} else if (appendValue[0] == 'CORemoveShippingContact') {
		document.getElementById('shippingContactId').value = "";
		document.getElementById('shippingContactName').value = "";
		document.getElementById('shippingTelephone').value = "";
		document.getElementById('shippingFax').value = "";
		document.getElementById('shippingEmail').value = "";
		var contactLink = "<p><div id=\"shippingContact\"></div><div id=\"shippingContactLink\">";
		contactLink = contactLink
				+ "<a class=\"icwLaunchModal\" id = \"COChangeShippingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=shipping&siteUseId="
				+ siteUseId + " \">Add a Contact</a>";
		contactLink = contactLink + "</div></p>";
		document.getElementById('shippingContactDetails').innerHTML = contactLink;
	} else if (appendValue[0] == 'CORemoveInstallSiteContact') {
		document.getElementById('installContactId').value = "";
		document.getElementById('installContact').innerHTML = "";
		document.getElementById('installContactName').value = "";
		document.getElementById('installTelephone').value = "";
		document.getElementById('installFax').value = "";
		document.getElementById('installEmail').value = "";
		var contactLink = "<a class=\"icwLaunchModal \" id = \"COChangeInstallSiteContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
				+ siteUseId + " \">Add a Contact</a>";
		document.getElementById('insContactLink').innerHTML = contactLink;
	} else if (appendValue[0] == 'RemoveBillingContact') {
		document.getElementById('hBillingContactId').value = "";
		document.getElementById('hBillAddrContChange').value = "change";
		var contactLink = "<a class=\"icwLaunchModal\" id = \"ChangeBillingContact_1\" href=\"XXIBECCKdSelectaContactTablePage.jsp?addressType=billing&siteUseId="
				+ siteUseId + " \">Add a contact</a>";
		document.getElementById('billContLink').innerHTML = "<div class=\"icwLeftColumn icwOneThird\">"
				+ contactLink + "<\div>";
	}
	bindModalCode(".icw a.icwLaunchModal", ".icw .icwAddressModal");
}
function removeAddress(id) {
	var appendValue = id.split('_');
	if (appendValue[0] == 'CORemoveShippingAddress') {
		var addressLink = "<div id=\"shippingAddress\"></div><div id=\"shippingAddressLink\">";
		addressLink = addressLink
				+ "<a class=\"icwLaunchModal \" id = \"COChangeShippingAddress_1\" href=\"XXIBECCKpChangeFavoriteAddrmodal.jsp?addressType=shipping\">Add a Shipping Address...</a>";
		addressLink = addressLink + "</div>";
		document.getElementById('shippingAddressDetails').innerHTML = addressLink;
		var contactLink = "<p><div id=\"shippingContact\"></div><div id=\"shippingContactLink\"></div></p>";
		document.getElementById('shippingContactDetails').innerHTML = contactLink;
		document.getElementById('shippingSiteUseId').value = "";
		document.getElementById('shippingCompanyName').value = "";
		document.getElementById('shippingAddress1').value = "";
		document.getElementById('shippingAddress2').value = "";
		document.getElementById('shippingAddress3').value = "";
		document.getElementById('shippingAddress4').value = "";
		document.getElementById('shippingCity').value = "";
		document.getElementById('shippingState').value = "";
		document.getElementById('shippingPostalCode').value = "";
		document.getElementById('shippingCountry').value = "";
		document.getElementById('shippingContactId').value = "";
		document.getElementById('shippingContactName').value = "";
		document.getElementById('shippingTelephone').value = "";
		document.getElementById('shippingFax').value = "";
		document.getElementById('shippingEmail').value = "";
	} else if (appendValue[0] == 'CORemoveInstallSiteAddress') {
		var addressLink = "<p><div id=\"installAddress\"></div><div id=\"installAddressLink\">";
		addressLink = addressLink
				+ "<a class=\"icwLaunchModal \" id = \"COChangeInstallSiteAddress_1\" href=\"XXIBECCKpChangeFavoriteAddrmodal.jsp?addressType=installsite\">Add a Full Install Site...</a>";
		addressLink = addressLink
				+ "</div><div id=\"installContact\"></div><div id =\"insContactLink\"></div></p>";
		document.getElementById('installAddressLinknew').innerHTML = addressLink;
		document.getElementById('installSiteUseId').value = "";
		document.getElementById('installCompanyName').value = "";
		document.getElementById('installAddress1').value = "";
		document.getElementById('installAddress2').value = "";
		document.getElementById('installAddress3').value = "";
		document.getElementById('installAddress4').value = "";
		document.getElementById('installCity').value = "";
		document.getElementById('installState').value = "";
		document.getElementById('installPostalCode').value = "";
		document.getElementById('installCountry').value = "";
		enableInstallSitePartialAddress();
		enableButton();
		document.getElementById('installContactId').value = "";
		document.getElementById('installContactName').value = "";
		document.getElementById('installTelephone').value = "";
		document.getElementById('installFax').value = "";
	} else if (appendValue[0] == 'CORemoveEndCustomerAddress') {
		document.getElementById('enduserSiteUseId').value = "";
		document.getElementById('enduserCompanyName').value = "";
		document.getElementById('enduserAddress1').value = "";
		document.getElementById('enduserAddress2').value = "";
		document.getElementById('enduserAddress3').value = "";
		document.getElementById('enduserAddress4').value = "";
		document.getElementById('enduserCity').value = "";
		document.getElementById('enduserState').value = "";
		document.getElementById('enduserPostalCode').value = "";
		document.getElementById('enduserCountry').value = "";
		var addressLink = "<p><div id=\"endUserAddress\"></div><div id=\"endUserAddressLink\">";
		addressLink = addressLink
				+ "<a class=\"icwLaunchModal \" id = \"COChangeEndCustomerAddress_1\" href=\"XXIBECCKpChangeFavoriteAddrmodal.jsp?addressType=endcustomer\">Add a Full End Customer...</a>";
		addressLink = addressLink + "</div></p>";
		document.getElementById('endUserAddressLinknew').innerHTML = addressLink;
		enableEndUserPartialAddress();
		enableButton();
	}
	bindModalCode(".icw a.icwLaunchModal", ".icw .icwAddressModal");
}
function createRequest() {
	var req;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// else {
	// alert('Problem creating the XMLHttpRequest object');
	// }
	return req;
}
function submitCForm(evt, formName) {
	try {
		var windowForm = document.forms[formName];
		windowForm.buttonClicked.value = evt;
		if (evt == "Search")
			windowForm.icwPartAddrCtry.disabled = false; // Added for ICW 3.0
			// windowForm.StateProvince.disabled = false;
	} catch (ex) {
	}
	return true;
}
function populateState() {
	var x = document.getElementById('icwModal_icwAdvancedSearchStateProvince');
	$("#icwModal_icwAdvancedSearchStateProvince").html("");
	if (document.SearchTermsAddrForm.icwPartAddrCtry.value != null) {
		addOption(x, "", "Select State/Province");
		var http = createRequest();
		var Country = document.SearchTermsAddrForm.icwPartAddrCtry.value;
		if (Country != "") {
			var data = "Country=" + Country;
			http.open("post", "XXIBECCKpCountry.jsp", true);
			http.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
			http.send(data);
			http.onreadystatechange = function() {
				if (http.readyState == 4) {
					if (http.status == 200) {
						var str = http.responseText;
						var state = str.split("-");
						for (i = 1; i < state.length; i++) {
							addOption(x, state[i], state[i]);
						}
					} else {
						// Eiter Geo Love imes out or no content returned for
						// country.
						// We need to add a text box in the place of opion box
						addTextBox();
					}
				}
			};
		}
	} else {
		addOption(x, "", "Select State/Province");
	}
}
function removeSelectOption() {
	var parentElement = document
			.getElementById('icwModal_icwAdvancedSearchState');
	var childElement = document
			.getElementById('icwModal_icwAdvancedSearchStateProvince');
	parentElement.removeChild(childElement);
}
function removeAllOptions(selectbox) {
	var i;
	for (i = selectbox.options.length - 1; i >= 0; i--) {
		selectbox.remove(i);
	}
}
function addOption(selectbox, value, text) {
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
	$("#icwModal_icwAdvancedSearchStateText").hide();
	$("#icwModal_icwAdvancedSearchState").show();
	$("#icwModal_stateText").attr("disabled", "disabled");
	$("#icwModal_icwAdvancedSearchStateProvince").removeAttr("disabled");
}
function addTextBox() {
	$("#icwModal_icwAdvancedSearchStateText").show();
	$("#icwModal_icwAdvancedSearchState").hide();
	$("#icwModal_icwAdvancedSearchStateProvince").attr("disabled", "disabled");
	$("#icwModal_stateText").removeAttr("disabled");
}
// end of party js
// global.js
function checkClear(input, defaultPhrase) {
	if (input.value == defaultPhrase)
		input.value = "";
}
// end of global.js
// start jquery.form.js
( function($) {
	$.fn.ajaxSubmit = function(options) {
		if (typeof options == 'function')
			options = {
				success :options
			};
		options = $.extend( {
			url :this.attr('action') || window.location,
			type :this.attr('method') || 'GET'
		}, options || {});
		// hook for manipulating the form data before it is extracted;
		// convenient for use with rich editors like tinyMCE or FCKEditor
		var veto = {};
		$.event.trigger('form.pre.serialize', [ this, options, veto ]);
		if (veto.veto)
			return this;
		var a = this.formToArray(options.semantic);
		if (options.data) {
			for ( var n in options.data)
				a.push( {
					name :n,
					value :options.data[n]
				});
		}
		// give pre-submit callback an opportunity to abort the submit
		if (options.beforeSubmit
				&& options.beforeSubmit(a, this, options) === false)
			return this;
		// fire vetoable 'validate' event
		$.event.trigger('form.submit.validate', [ a, this, options, veto ]);
		if (veto.veto)
			return this;
		var q = $.param(a); // .replace(/%20/g,'+');
		if (options.type.toUpperCase() == 'GET') {
			options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
			options.data = null; // data is null for 'get'
		} else
			options.data = q; // data is the query string for 'post'
		var $form = this, callbacks = [];
		if (options.resetForm)
			callbacks.push( function() {
				$form.resetForm();
			});
		if (options.clearForm)
			callbacks.push( function() {
				$form.clearForm();
			});
		// perform a load on the target only if dataType is not provided
		if (!options.dataType && options.target) {
			var oldSuccess = options.success || function() {
			};
			callbacks.push( function(data) {
				if (this.evalScripts)
					$(options.target).attr("innerHTML", data).evalScripts()
							.each(oldSuccess, arguments);
				else
					// jQuery v1.1.4
					$(options.target).html(data).each(oldSuccess, arguments);
			});
		} else if (options.success)
			callbacks.push(options.success);
		options.success = function(data, status) {
			for ( var i = 0, max = callbacks.length; i < max; i++)
				callbacks[i](data, status, $form);
		};
		// are there files to upload?
		var files = $('input:file', this).fieldValue();
		var found = false;
		for ( var j = 0; j < files.length; j++)
			if (files[j])
				found = true;
		if (options.iframe || found) // options.iframe allows user to force
										// iframe mode
			fileUpload();
		else
			$.ajax(options);
		// fire 'notify' event
		$.event.trigger('form.submit.notify', [ this, options ]);
		return this;
		// private function for handling file uploads (hat tip to YAHOO!)
		function fileUpload() {
			var form = $form[0];
			var opts = $.extend( {}, $.ajaxSettings, options);
			var id = 'jqFormIO' + $.fn.ajaxSubmit.counter++;
			var $io = $('<iframe id="' + id + '" name="' + id + '" />');
			var io = $io[0];
			var op8 = $.browser.opera && window.opera.version() < 9;
			if ($.browser.msie || op8)
				io.src = 'javascript:false;document.write("");';
			$io.css( {
				position :'absolute',
				top :'-1000px',
				left :'-1000px'
			});
			var xhr = { // mock object
				responseText :null,
				responseXML :null,
				status :0,
				statusText :'n/a',
				getAllResponseHeaders : function() {
				},
				getResponseHeader : function() {
				},
				setRequestHeader : function() {
				}
			};
			var g = opts.global;
			// trigger ajax global events so that activity/block indicators work
			// like normal
			if (g && !$.active++)
				$.event.trigger("ajaxStart");
			if (g)
				$.event.trigger("ajaxSend", [ xhr, opts ]);
			var cbInvoked = 0;
			var timedOut = 0;
			// take a breath so that pending repaints get some cpu time before
			// the upload starts
			setTimeout( function() {
				$io.appendTo('body');
				// jQuery's event binding doesn't work for iframe events in IE
					io.attachEvent ? io.attachEvent('onload', cb) : io
							.addEventListener('load', cb, false);
					// make sure form attrs are set
					var encAttr = form.encoding ? 'encoding' : 'enctype';
					var t = $form.attr('target');
					$form.attr( {
						target :id,
						method :'POST',
						action :opts.url
					});
					form[encAttr] = 'multipart/form-data';
					// support timout
					if (opts.timeout)
						setTimeout( function() {
							timedOut = true;
							cb();
						}, opts.timeout);
					form.submit();
					$form.attr('target', t); // reset target
				}, 10);
			function cb() {
				if (cbInvoked++)
					return;
				io.detachEvent ? io.detachEvent('onload', cb) : io
						.removeEventListener('load', cb, false);
				var ok = true;
				try {
					if (timedOut)
						alert('timeout');
					// extract the server response from the iframe
					var data, doc;
					doc = io.contentWindow ? io.contentWindow.document
							: io.contentDocument ? io.contentDocument
									: io.document;
					xhr.responseText = doc.body ? doc.body.innerHTML : null;
					xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
					if (opts.dataType == 'json' || opts.dataType == 'script') {
						var ta = doc.getElementsByTagName('textarea')[0];
						data = ta ? ta.value : xhr.responseText;
						if (opts.dataType == 'json')
							eval("data = " + data);
						else
							$.globalEval(data);
					} else if (opts.dataType == 'xml') {
						data = xhr.responseXML;
						if (!data && xhr.responseText != null)
							data = toXml(xhr.responseText);
					} else {
						data = xhr.responseText;
					}
				} catch (e) {
					ok = false;
					$.handleError(opts, xhr, 'error', e);
				}
				// ordering of these callbacks/triggers is odd, but that's how
				// $.ajax does it
				if (ok) {
					opts.success(data, 'success');
					if (g)
						$.event.trigger("ajaxSuccess", [ xhr, opts ]);
				}
				if (g)
					$.event.trigger("ajaxComplete", [ xhr, opts ]);
				if (g && !--$.active)
					$.event.trigger("ajaxStop");
				if (opts.complete)
					opts.complete(xhr, ok ? 'success' : 'error');
				// clean up
				setTimeout( function() {
					$io.remove();
					xhr.responseXML = null;
				}, 100);
			}
			;
			function toXml(s, doc) {
				if (window.ActiveXObject) {
					doc = new ActiveXObject('Microsoft.XMLDOM');
					doc.async = 'false';
					doc.loadXML(s);
				} else
					doc = (new DOMParser()).parseFromString(s, 'text/xml');
				return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc
						: null;
			}
			;
		}
		;
	};
	$.fn.ajaxSubmit.counter = 0; // used to create unique iframe ids
	$.fn.ajaxForm = function(options) {
		return this.ajaxFormUnbind().submit(submitHandler).each( function() {
			// store options in hash
				this.formPluginId = $.fn.ajaxForm.counter++;
				$.fn.ajaxForm.optionHash[this.formPluginId] = options;
				$(":submit,input:image", this).click(clickHandler);
			});
	};
	$.fn.ajaxForm.counter = 1;
	$.fn.ajaxForm.optionHash = {};
	function clickHandler(e) {
		var $form = this.form;
		$form.clk = this;
		if (this.type == 'image') {
			if (e.offsetX != undefined) {
				$form.clk_x = e.offsetX;
				$form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use
															// dimensions plugin
				var offset = $(this).offset();
				$form.clk_x = e.pageX - offset.left;
				$form.clk_y = e.pageY - offset.top;
			} else {
				$form.clk_x = e.pageX - this.offsetLeft;
				$form.clk_y = e.pageY - this.offsetTop;
			}
		}
		// clear form vars
		setTimeout( function() {
			$form.clk = $form.clk_x = $form.clk_y = null;
		}, 10);
	}
	;
	function submitHandler() {
		// retrieve options from hash
		var id = this.formPluginId;
		var options = $.fn.ajaxForm.optionHash[id];
		$(this).ajaxSubmit(options);
		return false;
	}
	;
	$.fn.ajaxFormUnbind = function() {
		this.unbind('submit', submitHandler);
		return this.each( function() {
			$(":submit,input:image", this).unbind('click', clickHandler);
		});
	};
	$.fn.formToArray = function(semantic) {
		var a = [];
		if (this.length == 0)
			return a;
		var form = this[0];
		var els = semantic ? form.getElementsByTagName('*') : form.elements;
		if (!els)
			return a;
		for ( var i = 0, max = els.length; i < max; i++) {
			var el = els[i];
			var n = el.name;
			if (!n)
				continue;
			if (semantic && form.clk && el.type == "image") {
				// handle image inputs on the fly when semantic == true
				if (!el.disabled && form.clk == el)
					a.push( {
						name :n + '.x',
						value :form.clk_x
					}, {
						name :n + '.y',
						value :form.clk_y
					});
				continue;
			}
			var v = $.fieldValue(el, true);
			if (v && v.constructor == Array) {
				for ( var j = 0, jmax = v.length; j < jmax; j++)
					a.push( {
						name :n,
						value :v[j]
					});
			} else if (v !== null && typeof v != 'undefined')
				a.push( {
					name :n,
					value :v
				});
		}
		if (!semantic && form.clk) {
			// input type=='image' are not found in elements array! handle them
			// here
			var inputs = form.getElementsByTagName("input");
			for ( var i = 0, max = inputs.length; i < max; i++) {
				var input = inputs[i];
				var n = input.name;
				if (n && !input.disabled && input.type == "image"
						&& form.clk == input)
					a.push( {
						name :n + '.x',
						value :form.clk_x
					}, {
						name :n + '.y',
						value :form.clk_y
					});
			}
		}
		return a;
	};
	$.fn.formSerialize = function(semantic) {
		// hand off to jQuery.param for proper encoding
		return $.param(this.formToArray(semantic));
	};
	$.fn.fieldSerialize = function(successful) {
		var a = [];
		this.each( function() {
			var n = this.name;
			if (!n)
				return;
			var v = $.fieldValue(this, successful);
			if (v && v.constructor == Array) {
				for ( var i = 0, max = v.length; i < max; i++)
					a.push( {
						name :n,
						value :v[i]
					});
			} else if (v !== null && typeof v != 'undefined')
				a.push( {
					name :this.name,
					value :v
				});
		});
		// hand off to jQuery.param for proper encoding
		return $.param(a);
	};
	$.fn.fieldValue = function(successful) {
		for ( var val = [], i = 0, max = this.length; i < max; i++) {
			var el = this[i];
			var v = $.fieldValue(el, successful);
			if (v === null || typeof v == 'undefined'
					|| (v.constructor == Array && !v.length))
				continue;
			v.constructor == Array ? $.merge(val, v) : val.push(v);
		}
		return val;
	};
	$.fieldValue = function(el, successful) {
		var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
		if (typeof successful == 'undefined')
			successful = true;
		if (successful
				&& (!n || el.disabled || t == 'reset' || t == 'button'
						|| (t == 'checkbox' || t == 'radio') && !el.checked
						|| (t == 'submit' || t == 'image') && el.form
						&& el.form.clk != el || tag == 'select'
						&& el.selectedIndex == -1))
			return null;
		if (tag == 'select') {
			var index = el.selectedIndex;
			if (index < 0)
				return null;
			var a = [], ops = el.options;
			var one = (t == 'select-one');
			var max = (one ? index + 1 : ops.length);
			for ( var i = (one ? index : 0); i < max; i++) {
				var op = ops[i];
				if (op.selected) {
					// extra pain for IE...
					var v = $.browser.msie
							&& !(op.attributes['value'].specified) ? op.text
							: op.value;
					if (one)
						return v;
					a.push(v);
				}
			}
			return a;
		}
		return el.value;
	};
	$.fn.clearForm = function() {
		return this.each( function() {
			$('input,select,textarea', this).clearFields();
		});
	};
	$.fn.clearFields = $.fn.clearInputs = function() {
		return this.each( function() {
			var t = this.type, tag = this.tagName.toLowerCase();
			if (t == 'text' || t == 'password' || tag == 'textarea')
				this.value = '';
			else if (t == 'checkbox' || t == 'radio')
				this.checked = false;
			else if (tag == 'select')
				this.selectedIndex = -1;
		});
	};
	$.fn.resetForm = function() {
		return this.each( function() {
			// guard against an input with the name of 'reset'
				// note that IE reports the reset function as an 'object'
				if (typeof this.reset == 'function'
						|| (typeof this.reset == 'object' && !this.reset.nodeType))
					this.reset();
			});
	};
})(jQuery);
// ////////////end jquery.form.js////////////////////
// //////////// Start jquery.cookie.js////////////////////
/**
 * Cookie plugin
 * 
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de) Dual licensed under the MIT and
 * GPL licenses: http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 */
/**
 * Create a cookie with the given name and value and other optional parameters.
 * 
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain:
 *          'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to
 *       use the same path and domain used when the cookie was set.
 * 
 * @param String
 *            name The name of the cookie.
 * @param String
 *            value The value of the cookie.
 * @param Object
 *            options An object literal containing key/value pairs to provide
 *            optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date
 *         from now on in days or a Date object. If a negative value is
 *         specified (e.g. a date in the past), the cookie will be deleted. If
 *         set to null or omitted, the cookie will be a session cookie and will
 *         not be retained when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default:
 *         path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie
 *         (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be
 *         set and the cookie transmission will require a secure protocol (like
 *         HTTPS).
 * @type undefined
 * 
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
/**
 * Get the value of a cookie with the given name.
 * 
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 * 
 * @param String
 *            name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 * 
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires
				&& (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime()
						+ (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires
															// attribute,
															// max-age is not
															// supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [ name, '=', encodeURIComponent(value), expires,
				path, domain, secure ].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for ( var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie
							.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
// //////////// End jquery.cookie.js////////////////////
// /for changing into json string
/*
 * http://www.JSON.org/json2.js 2010-03-20 Public Domain. NO WARRANTY EXPRESSED
 * OR IMPLIED. USE AT YOUR OWN RISK. See http://www.JSON.org/js.html This code
 * should be minified before deployment. See
 * http://javascript.crockford.com/jsmin.html USE YOUR OWN COPY. IT IS EXTREMELY
 * UNWISE TO LOAD CODE FROM SERVERS YOU DO NOT CONTROL. This file creates a
 * global JSON object containing two methods: stringify and parse.
 * JSON.stringify(value, replacer, space) value any JavaScript value, usually an
 * object or array. replacer an optional parameter that determines how object
 * values are stringified for objects. It can be a function or an array of
 * strings. space an optional parameter that specifies the indentation of nested
 * structures. If it is omitted, the text will be packed without extra
 * whitespace. If it is a number, it will specify the number of spaces to indent
 * at each level. If it is a string (such as '\t' or '&nbsp;'), it contains the
 * characters used to indent at each level. This method produces a JSON text
 * from a JavaScript value. When an object value is found, if the object
 * contains a toJSON method, its toJSON method will be called and the result
 * will be stringified. A toJSON method does not serialize: it returns the value
 * represented by the name/value pair that should be serialized, or undefined if
 * nothing should be serialized. The toJSON method will be passed the key
 * associated with the value, and this will be bound to the value For example,
 * this would serialize Dates as ISO strings. Date.prototype.toJSON = function
 * (key) { function f(n) { // Format integers to have at least two digits.
 * return n < 10 ? '0' + n : n; } return this.getUTCFullYear() + '-' +
 * f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' +
 * f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' +
 * f(this.getUTCSeconds()) + 'Z'; }; You can provide an optional replacer
 * method. It will be passed the key and value of each member, with this bound
 * to the containing object. The value that is returned from your method will be
 * serialized. If your method returns undefined, then the member will be
 * excluded from the serialization. If the replacer parameter is an array of
 * strings, then it will be used to select the members to be serialized. It
 * filters the results such that only members with keys listed in the replacer
 * array are stringified. Values that do not have JSON representations, such as
 * undefined or functions, will not be serialized. Such values in objects will
 * be dropped; in arrays they will be replaced with null. You can use a replacer
 * function to replace those with JSON values. JSON.stringify(undefined) returns
 * undefined. The optional space parameter produces a stringification of the
 * value that is filled with line breaks and indentation to make it easier to
 * read. If the space parameter is a non-empty string, then that string will be
 * used for indentation. If the space parameter is a number, then the
 * indentation will be that many spaces. Example: text = JSON.stringify(['e',
 * {pluribus: 'unum'}]); // text is '["e",{"pluribus":"unum"}]' text =
 * JSON.stringify(['e', {pluribus: 'unum'}], null, '\t'); // text is
 * '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]' text = JSON.stringify([new
 * Date()], function (key, value) { return this[key] instanceof Date ? 'Date(' +
 * this[key] + ')' : value; }); // text is '["Date(---current time---)"]'
 * JSON.parse(text, reviver) This method parses a JSON text to produce an object
 * or array. It can throw a SyntaxError exception. The optional reviver
 * parameter is a function that can filter and transform the results. It
 * receives each of the keys and values, and its return value is used instead of
 * the original value. If it returns what it received, then the structure is not
 * modified. If it returns undefined then the member is deleted. Example: //
 * Parse the text. Values that look like ISO date strings will // be converted
 * to Date objects. myData = JSON.parse(text, function (key, value) { var a; if
 * (typeof value === 'string') { a =
 * /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
 * if (a) { return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5],
 * +a[6])); } } return value; }); myData = JSON.parse('["Date(09/09/2001)"]',
 * function (key, value) { var d; if (typeof value === 'string' &&
 * value.slice(0, 5) === 'Date(' && value.slice(-1) === ')') { d = new
 * Date(value.slice(5, -1)); if (d) { return d; } } return value; }); This is a
 * reference implementation. You are free to copy, modify, or redistribute.
 */
/* jslint evil: true, strict: false */
/*
 * members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply, call,
 * charCodeAt, getUTCDate, getUTCFullYear, getUTCHours, getUTCMinutes,
 * getUTCMonth, getUTCSeconds, hasOwnProperty, join, lastIndex, length, parse,
 * prototype, push, replace, slice, stringify, test, toJSON, toString, valueOf
 */
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
if (!this.JSON) {
	this.JSON = {};
}
( function() {
	function f(n) {
		// Format integers to have at least two digits.
		return n < 10 ? '0' + n : n;
	}
	if (typeof Date.prototype.toJSON !== 'function') {
		Date.prototype.toJSON = function(key) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-'
					+ f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate())
					+ 'T' + f(this.getUTCHours()) + ':'
					+ f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds())
					+ 'Z' : null;
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
				key) {
			return this.valueOf();
		};
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { // table
																																																																						// of
																																																																						// character
																																																																						// substitutions
		'\b' :'\\b',
		'\t' :'\\t',
		'\n' :'\\n',
		'\f' :'\\f',
		'\r' :'\\r',
		'"' :'\\"',
		'\\' :'\\\\'
	}, rep;
	function quote(string) {
		// If the string contains no control characters, no quote characters,
		// and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe
		// escape
		// sequences.
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable,
				function(a) {
					var c = meta[a];
					return typeof c === 'string' ? c : '\\u' + ('0000' + a
							.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' : '"' + string + '"';
	}
	function str(key, holder) {
		// Produce a string from holder[key].
		var i, // The loop counter.
		k, // The member key.
		v, // The member value.
		length, mind = gap, partial, value = holder[key];
		// If the value has a toJSON method, call it to obtain a replacement
		// value.
		if (value && typeof value === 'object'
				&& typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}
		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.
		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}
		// What happens next depends on the value's type.
		switch (typeof value) {
		case 'string':
			return quote(value);
		case 'number':
			// JSON numbers must be finite. Encode non-finite numbers as null.
			return isFinite(value) ? String(value) : 'null';
		case 'boolean':
		case 'null':
			// If the value is a boolean or null, convert it to a string. Note:
			// typeof null does not produce 'null'. The case is included here in
			// the remote chance that this gets fixed someday.
			return String(value);
			// If the type is 'object', we might be dealing with an object or an
			// array or
			// null.
		case 'object':
			// Due to a specification blunder in ECMAScript, typeof null is
			// 'object',
			// so watch out for that case.
			if (!value) {
				return 'null';
			}
			// Make an array to hold the partial results of stringifying this
			// object value.
			gap += indent;
			partial = [];
			// Is the value an array?
			if (Object.prototype.toString.apply(value) === '[object Array]') {
				// The value is an array. Stringify every element. Use null as a
				// placeholder
				// for non-JSON values.
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || 'null';
				}
				// Join all of the elements together, separated with commas, and
				// wrap them in
				// brackets.
				v = partial.length === 0 ? '[]' : gap ? '[\n' + gap
						+ partial.join(',\n' + gap) + '\n' + mind + ']'
						: '[' + partial.join(',') + ']';
				gap = mind;
				return v;
			}
			// If the replacer is an array, use it to select the members to be
			// stringified.
			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					k = rep[i];
					if (typeof k === 'string') {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			} else {
				// Otherwise, iterate through all of the keys in the object.
				for (k in value) {
					if (Object.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}
			// Join all of the member texts together, separated with commas,
			// and wrap them in braces.
			v = partial.length === 0 ? '{}' : gap ? '{\n' + gap
					+ partial.join(',\n' + gap) + '\n' + mind + '}'
					: '{' + partial.join(',') + '}';
			gap = mind;
			return v;
		}
	}
	// If the JSON object does not yet have a stringify method, give it one.
	if (typeof JSON.stringify !== 'function') {
		JSON.stringify = function(value, replacer, space) {
			// The stringify method takes a value and an optional replacer, and
			// an optional
			// space parameter, and returns a JSON text. The replacer can be a
			// function
			// that can replace values, or an array of strings that will select
			// the keys.
			// A default replacer method can be provided. Use of the space
			// parameter can
			// produce text that is more easily readable.
			var i;
			gap = '';
			indent = '';
			// If the space parameter is a number, make an indent string
			// containing that
			// many spaces.
			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}
				// If the space parameter is a string, it will be used as the
				// indent string.
			} else if (typeof space === 'string') {
				indent = space;
			}
			// If there is a replacer, it must be a function or an array.
			// Otherwise, throw an error.
			rep = replacer;
			if (replacer
					&& typeof replacer !== 'function'
					&& (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
				throw new Error('JSON.stringify');
			}
			// Make a fake root object containing our value under the key of ''.
			// Return the result of stringifying the value.
			return str('', {
				'' :value
			});
		};
	}
	// If the JSON object does not yet have a parse method, give it one.
	if (typeof JSON.parse !== 'function') {
		JSON.parse = function(text, reviver) {
			// The parse method takes a text and an optional reviver function,
			// and returns
			// a JavaScript value if the text is a valid JSON text.
			var j;
			function walk(holder, key) {
				// The walk method is used to recursively walk the resulting
				// structure so
				// that modifications can be made.
				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}
			// Parsing happens in four stages. In the first stage, we replace
			// certain
			// Unicode characters with escape sequences. JavaScript handles many
			// characters
			// incorrectly, either silently deleting them, or treating them as
			// line endings.
			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function(a) {
					return '\\u' + ('0000' + a.charCodeAt(0).toString(16))
							.slice(-4);
				});
			}
			// In the second stage, we run the text against regular expressions
			// that look
			// for non-JSON patterns. We are especially concerned with '()' and
			// 'new'
			// because they can cause invocation, and '=' because it can cause
			// mutation.
			// But just to be safe, we want to reject all unexpected forms.
			// We split the second stage into 4 regexp operations in order to
			// work around
			// crippling inefficiencies in IE's and Safari's regexp engines.
			// First we
			// replace the JSON backslash pairs with '@' (a non-JSON character).
			// Second, we
			// replace all simple value tokens with ']' characters. Third, we
			// delete all
			// open brackets that follow a colon or comma or that begin the
			// text. Finally,
			// we look to see that the remaining characters are only whitespace
			// or ']' or
			// ',' or ':' or '{' or '}'. If that is so, then the text is safe
			// for eval.
			if (/^[\],:{}\s]*$/
					.test(text
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
				// In the third stage we use the eval function to compile the
				// text into a
				// JavaScript structure. The '{' operator is subject to a
				// syntactic ambiguity
				// in JavaScript: it can begin a block or an object literal. We
				// wrap the text
				// in parens to eliminate the ambiguity.
				j = eval('(' + text + ')');
				// In the optional fourth stage, we recursively walk the new
				// structure, passing
				// each name/value pair to a reviver function for possible
				// transformation.
				return typeof reviver === 'function' ? walk( {
					'' :j
				}, '') : j;
			}
			// If the text is not JSON parseable, then a SyntaxError is thrown.
			throw new SyntaxError('JSON.parse');
		};
	}
}());
// end of generating string of json
// Start of function for sorting.
jQuery.fn.sortElements = ( function() {
	var sort = [].sort;
	var length = $("#importmytable").find("tbody").find("tr").length - 1;
	return function(comparator, getSortable) {
		getSortable = getSortable || function() {
			return this;
		};
		var placements = this
				.map( function() {
					var sortElement = getSortable.call(this), parentNode = sortElement.parentNode, nextSibling = parentNode
							.insertBefore(document.createTextNode(''),
									sortElement.nextSibling);
					return function() {
						if (parentNode === this) {
							throw new Error(
									"You can't sort elements if any one is a descendant of another.");
						}
						parentNode.insertBefore(this, nextSibling);
						parentNode.removeChild(nextSibling);
					};
				});
		return sort.call(this, comparator).each( function(i) {
			placements[i].call(getSortable.call(this));
		});
	};
})();
// End of function for sorting.
// shadow plugin
( function($) {
	var dropShadowZindex = 1; // z-index counter
	$.fn.dropShadow = function(options) {
		// Default options
		var opt = $.extend( {
			left :4,
			top :4,
			blur :2,
			opacity :.5,
			color :"gray",
			swap :false
		}, options);
		var jShadows = $( []); // empty jQuery collection
		// Loop through original elements
		this.not(".dropShadow").each(
				function() {
					var jthis = $(this);
					var shadows = [];
					var blur = (opt.blur <= 0) ? 0 : opt.blur;
					var opacity = (blur == 0) ? opt.opacity : opt.opacity
							/ (blur);
					var zOriginal = (opt.swap) ? dropShadowZindex
							: dropShadowZindex + 1;
					var zShadow = (opt.swap) ? dropShadowZindex + 1
							: dropShadowZindex;
					// Create ID for shadow
					var shadowId;
					if (this.id) {
						shadowId = this.id + "_dropShadow";
					} else {
						shadowId = "ds"
								+ (1 + Math.floor(9999 * Math.random()));
					}
					// Modify original element
					$.data(this, "shadowId", shadowId); // store id in expando
					$.data(this, "shadowOptions", options); // store options in
															// expando
					jthis.attr("shadowId", shadowId).css("zIndex", zOriginal);
					if (jthis.css("position") != "absolute") {
						jthis.css( {
							position :"relative",
							zoom :1
						// for IE layout
								});
					}
					// Create first shadow layer
					bgColor = jthis.css("backgroundColor");
					if (bgColor == "rgba(0, 0, 0, 0)")
						bgColor = "transparent"; // Safari
					if (bgColor != "transparent"
							|| jthis.css("backgroundImage") != "none"
							|| this.nodeName == "SELECT"
							|| this.nodeName == "INPUT"
							|| this.nodeName == "TEXTAREA") {
						shadows[0] = $("<div></div>").css("background",
								opt.color);
					} else {
						shadows[0] = jthis.clone().removeAttr("id").removeAttr(
								"name").removeAttr("shadowId").css("color",
								opt.color);
					}
					shadows[0].addClass("dropShadow").css( {
						height :jthis.outerHeight(),
						left :blur,
						opacity :opacity,
						position :"absolute",
						top :blur,
						width :jthis.outerWidth(),
						zIndex :zShadow
					});
					// Create other shadow layers
					var layers = (8 * blur) + 1;
					for (i = 1; i < layers; i++) {
						shadows[i] = shadows[0].clone();
					}
					// Position layers
					var i = 1;
					var j = blur;
					while (j > 0) {
						shadows[i].css( {
							left :j * 2,
							top :0
						}); // top
						shadows[i + 1].css( {
							left :j * 4,
							top :j * 2
						}); // right
						shadows[i + 2].css( {
							left :j * 2,
							top :j * 4
						}); // bottom
						shadows[i + 3].css( {
							left :0,
							top :j * 2
						}); // left
						shadows[i + 4].css( {
							left :j * 3,
							top :j
						}); // top-right
						shadows[i + 5].css( {
							left :j * 3,
							top :j * 3
						}); // bottom-right
						shadows[i + 6].css( {
							left :j,
							top :j * 3
						}); // bottom-left
						shadows[i + 7].css( {
							left :j,
							top :j
						}); // top-left
						i += 8;
						j--;
					}
					// Create container
					var divShadow = $("<div></div>").attr("id", shadowId)
							.addClass("dropShadow").css( {
								left :jthis.position().left + opt.left - blur,
								marginTop :jthis.css("marginTop"),
								marginRight :jthis.css("marginRight"),
								marginBottom :jthis.css("marginBottom"),
								marginLeft :jthis.css("marginLeft"),
								position :"absolute",
								top :jthis.position().top + opt.top - blur,
								zIndex :zShadow
							});
					// Add layers to container
					for (i = 0; i < layers; i++) {
						divShadow.append(shadows[i]);
					}
					// Add container to DOM
					jthis.after(divShadow);
					// Add shadow to return set
					jShadows = jShadows.add(divShadow);
					// Re-align shadow on window resize
					$(window).resize( function() {
						try {
							divShadow.css( {
								left :jthis.position().left + opt.left - blur,
								top :jthis.position().top + opt.top - blur
							});
						} catch (e) {
						}
					});
					// Increment z-index counter
					dropShadowZindex += 2;
				}); // end each
		return this.pushStack(jShadows);
	};
	$.fn.redrawShadow = function() {
		// Remove existing shadows
		this.removeShadow();
		// Draw new shadows
		return this.each( function() {
			var shadowOptions = $.data(this, "shadowOptions");
			$(this).dropShadow(shadowOptions);
		});
	};
	$.fn.removeShadow = function() {
		return this.each( function() {
			var shadowId = $(this).shadowId();
			$("div#" + shadowId).remove();
		});
	};
	$.fn.shadowId = function() {
		return $.data(this[0], "shadowId");
	};
	$( function() {
		// Suppress printing of shadows
		var noPrint = "<style type='text/css' media='print'>";
		noPrint += ".dropShadow{visibility:hidden;}</style>";
		$("head").append(noPrint);
	});
})(jQuery);
// simple modal wrapper object starts here
ccw = {};
ccw.modal = {
	// Shows a modal dialog
	show : function(args) {
		// Grab the content for the modal from the corresponding div
		var clonnedContent = "";
		if (args.dontClone) {
			clonnedContent = args.content;
		} else {
			clonnedContent = $(args.content).clone( [ true ]);
		}
		$(clonnedContent).find(".icwModalOnly").each( function() {
			icw.common.uncomment(this);
		});
		var modal = $.ccwmodal(clonnedContent, {
																						close  :false,
							minWidth :args.minWidth ? args.minWidth : null,
							maxWidth :args.maxWidth ? args.maxWidth : $(
									clonnedContent).width(),
							maxHeight :$(clonnedContent).height(),
							onShow : function(s) {
								// d.data.fadeTo(1000,0.6);
								// d.data.fadeTo(1000,1.0);
								args.callback(s.d.container);
								// eval(args.callback(d));
								var dw = 0;
								var dh = 0;
								if (!$.browser.mozilla) {
									if ($(s.d.data).find('table').length > 0) {
										var mw = 0;
										$(s.d.data).find('table').each(
												function(index, table) {
													if ($(table).attr(
															'setWidth') > mw) {
														mw = $(table).attr(
																'setWidth');
													} else if (parseFloat($(
															table).outerWidth(
															true)) > mw) {
														mw = $(table)
																.outerWidth(
																		true);
													}
												});
										dw = parseFloat(mw);
										if (s.d.data.outerWidth(true) > dw) {
											dw = s.d.data.outerWidth(true);
										}
										// dw = dw + 30;
									} else {
										if ($.browser.version == '7.0'
												&& s.d.data
														.outerWidth( [ true ]) >= 1000) {
											dw = s.d.data.outerWidth( [ true ]) / 2;
										} else {
											dw = s.d.data.outerWidth( [ true ]);
										}
										dw = dw + 15;
									}
									// dh = s.d.data.outerHeight(true);
									// s.update(dh, dw);
									// s.d.container.css({width:dw, height:
									// dh});
									s.d.data.find('.icwTableSortable').css( {
										width :'100%',
										height :'100%'
									});
									s.d.data.find('.icwTableReadOnly').find(
											'tbody').css(
											{
												width :s.d.data.find(
														'.icwTableReadOnly')
														.width()
											});
								} else {
									if ($(s.d.data).find('table').length > 0) {
										var mw = 0;
										$(s.d.data).find('table').each(
												function(index, table) {
													if ($(table).attr(
															'setWidth') > mw) {
														mw = $(table).attr(
																'setWidth');
													} else if (parseFloat($(
															table).outerWidth(
															true)) > mw) {
														mw = $(table)
																.outerWidth(
																		true);
													}
												});
										dw = parseFloat(mw);
									}
									if (s.d.data.outerWidth(true) > dw) {
										dw = s.d.data.outerWidth(true);
									}
									// dh = s.d.data.outerHeight(true);
									// s.update(dh, dw);
									// s.d.container.css({width:dw, height:
									// dh});
									s.d.data.find('.icwTableReadOnly').find(
											'tbody').css(
											{
												width :s.d.data.find(
														'.icwTableReadOnly')
														.width()
											});
								}
								dh = s.d.data.outerHeight(true);
								s.update(dh, dw);
								// s.d.container.css({width:dw, height: dh});
							},
							onUpdate : function(s) {
								var dw = 0;
								var dh = 0;
								if (!$.browser.mozilla) {
									if ($(s.d.data).find('table').length > 0) {
										var mw = 0;
										$(s.d.data).find('table').each(
												function(index, table) {
													if ($(table).attr(
															'setWidth') > mw) {
														mw = $(table).attr(
																'setWidth');
													} else if (parseFloat($(
															table).outerWidth(
															true)) > mw) {
														mw = $(table)
																.outerWidth(
																		true);
													}
												});
										dw = parseFloat(mw);
										if (s.d.data.outerWidth(true) > dw) {
											dw = s.d.data.outerWidth(true);
										}
										// dw = dw;
									} else {
										if ($.browser.version == '7.0'
												&& s.d.data
														.outerWidth( [ true ]) >= 1000) {
											dw = s.d.data.outerWidth( [ true ]) / 2;
										} else {
											dw = s.d.data.outerWidth( [ true ]);
										}
									}
									// dh = s.d.data.outerHeight(true);
									// s.update(dh, dw);
									// s.d.container.css({width:dw, height:
									// dh});
									s.d.data.find('.icwTableSortable').css( {
										width :'100%',
										height :'100%'
									});
									// s.d.data.find('.icwTableReadOnly').parent().width(s.d.data.find('.icwTableReadOnly').outerWidth(true));
									s.d.data.find('.icwTableReadOnly').find(
											'tbody').css(
											{
												width :s.d.data.find(
														'.icwTableReadOnly')
														.width()
											});
								} else {
									if ($(s.d.data).find('table').length > 0) {
										var mw = 0;
										$(s.d.data).find('table').each(
												function(index, table) {
													if ($(table).attr(
															'setWidth') > mw) {
														mw = $(table).attr(
																'setWidth');
													} else if (parseFloat($(
															table).outerWidth(
															true)) > mw) {
														mw = $(table)
																.outerWidth(
																		true);
													}
												});
										dw = parseFloat(mw);
									}
									if (s.d.data.outerWidth(true) > dw) {
										dw = s.d.data.outerWidth(true);
									}
									// dh = s.d.data.outerHeight(true);
									// s.update(dh, dw);
									// s.d.container.css({width:dw, height:
									// dh});
									s.d.data.find('.icwTableReadOnly').find(
											'tbody').css(
											{
												width :s.d.data.find(
														'.icwTableReadOnly')
														.width()
											});
								}
								dh = s.d.data.outerHeight(true);
								s.update(dh, dw);
								// s.d.container.css({width:dw, height: dh});
							}
						});
		return modal;
	},
	// Hides a currently showing modal dialog
	hide : function(args) {
		// For backwards-compatibility -- makes both "modal" and "args.modal"
		// accessible to the callback
		var modal;
		if (args.d) {
			if (args.d.container)
				modal = $(args.d.container);
			else
				modal = $(args.d);
		}
		$.ccwmodal.close(modal);
		modal = undefined;
	}
};
// simple modal wrapper object ends here
/*
 * SimpleModal 1.4 - jQuery Plugin
 */
;
( function($) {
	var ie6 = $.browser.msie && parseInt($.browser.version) === 6
			&& typeof window['XMLHttpRequest'] !== 'object', ieQuirks = null, w = [];
	/*
	 * Create and display a modal dialog.
	 * 
	 * @param {string, object} data A string, jQuery object or DOM object @param
	 * {object} [options] An optional object containing options overrides
	 */
	$.ccwmodal = function(data, options) {
		return $.ccwmodal.impl.init(data, options);
	};
	/*
	 * Close the modal dialog.
	 */
	$.ccwmodal.close = function() {
		$.ccwmodal.impl.close();
	};
	/*
	 * Set focus on first or last visible input in the modal dialog. To focus on
	 * the last element, call $.modal.focus('last'). If no input elements are
	 * found, focus is placed on the data wrapper element.
	 */
	$.ccwmodal.focus = function(pos) {
		$.ccwmodal.impl.focus(pos);
	};
	/*
	 * Determine and set the dimensions of the modal dialog container.
	 * setPosition() is called if the autoPosition option is true.
	 */
	$.ccwmodal.setContainerDimensions = function() {
		$.ccwmodal.impl.setContainerDimensions();
	};
	/*
	 * Re-position the modal dialog.
	 */
	$.ccwmodal.setPosition = function() {
		$.ccwmodal.impl.setPosition();
	};
	/*
	 * Update the ccwmodal dialog. If new dimensions are passed, they will be
	 * used to determine the dimensions of the container.
	 * 
	 * setContainerDimensions() is called, which in turn calls setPosition(), if
	 * enabled. Lastly, focus() is called is the focus option is true.
	 */
	$.ccwmodal.update = function(height, width) {
		$.ccwmodal.impl.update(height, width);
	};
	/*
	 * Chained function to create a ccwmodal dialog.
	 * 
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.fn.ccwmodal = function(options) {
		return $.ccwmodal.impl.init(this, options);
	};
	$.ccwmodal.defaults = {
		appendTo :'body',
		focus :true,
		opacity :50,
		overlayId :'simplemodal-overlay',
		overlayCss : {},
		containerId :'simplemodal-container',
		containerCss : {},
		dataId :'simplemodal-data',
		dataCss : {},
		minHeight :null,
		minWidth :null,
		maxHeight :null,
		maxWidth :null,
		autoResize :false,
		autoPosition :true,
		zIndex :1000,
		close :true,
		closeHTML :'<a class="modalCloseImg" title="Close"></a>',
		closeClass :'simplemodal-close',
		escClose :true,
		overlayClose :false,
		position :null,
		persist :false,
		modal :true,
		onOpen :null,
		onShow :null,
		onClose :null,
		onUpdate :null
	};
	/*
	 * Main ccwmodal object o = options
	 */
$.ccwmodal.impl = {
		/*
		 * Contains the ccwmodal dialog elements and is the object passed back
		 * to the callback (onOpen, onShow, onClose) functions
		 */
		d : {},
		/*
		 * Initialize the ccwmodal dialog
		 */
		init : function(data, options) {
			var s = this;
			// don't allow multiple calls
			if (s.d.data) {
				return false;
			}
			// $.boxModel is undefined if checked earlier
			ieQuirks = $.browser.msie && !$.boxModel;
			// merge defaults and user options
			s.o = $.extend( {}, $.ccwmodal.defaults, options);
			// keep track of z-index
			s.zIndex = s.o.zIndex;
			// set the onClose callback flag
			s.occb = false;
			// determine how to handle the data based on its type
			if (typeof data === 'object') {
				// convert DOM object to a jQuery object
				data = data instanceof jQuery ? data : $(data);
				s.d.placeholder = false;
				// if the object came from the DOM, keep track of its parent
				if (data.parent().parent().size() > 0) {
					data.before($('<span></span>').attr('id',
							'simplemodal-placeholder').css( {
						display :'none'
					}));
					s.d.placeholder = true;
					s.display = data.css('display');
					// persist changes? if not, make a clone of the element
					if (!s.o.persist) {
						s.d.orig = data.clone(true);
					}
				}
			} else if (typeof data === 'string' || typeof data === 'number') {
				// just insert the data as innerHTML
				data = $('<div></div>').html(data);
			} else {
				// unsupported data type!
				alert('SimpleModal Error: Unsupported data type: ' + typeof data);
				return s;
			}
			// create the ccwmodal overlay, container and, if necessary, iframe
			s.create(data);
			data = null;
			// display the ccwmodal dialog
			s.open();
			// useful for adding events/manipulating data in the ccwmodal dialog
			if ($.isFunction(s.o.onShow)) {
				s.o.onShow.apply(s, [ s ]);
			}
			$('#simplemodal-container').unbind('ccwmodalupdate');
			$('#simplemodal-container').bind('ccwmodalupdate', function(event) {
				if ($.isFunction(s.o.onUpdate)) {
					s.o.onUpdate.apply(s, [ s ]);
				}
			});
			// don't break the chain =)
			return s;
		},
		/*
		 * Create and add the ccwmodal overlay and container to the page
		 */
		create : function(data) {
			var s = this;
			// get the window properties
			w = s.getDimensions();
			// add an iframe to prevent select options from bleeding through
			if (s.o.modal && ie6) {
				s.d.iframe = $('<iframe src="javascript:false;"></iframe>')
						.css($.extend(s.o.iframeCss, {
							display :'none',
							opacity :0,
							position :'fixed',
							height :w[0],
							width :w[1],
							zIndex :s.o.zIndex,
							top :0,
							left :0
						})).appendTo(s.o.appendTo);
			}
			// create the overlay
			s.d.overlay = $('<div></div>').attr('id', s.o.overlayId).addClass(
					'icwModalWashout simplemodal-overlay').css(
					$.extend(s.o.overlayCss, {
						display :'none',
						opacity :s.o.opacity / 100,
						height :s.o.modal ? w[0] : 0,
						width :s.o.modal ? w[1] : 0,
						position :'fixed',
						left :0,
						top :0,
						zIndex :s.o.zIndex + 1
					})).appendTo(s.o.appendTo);
			s.d.containerwrapper = $('<div></div>').addClass('icw').appendTo(
					s.o.appendTo);
			// create the container
			s.d.container = $('<div></div>').attr('id', s.o.containerId)
					.addClass('icwModal simplemodal-container').css(
							$.extend(s.o.containerCss, {
								display :'none',
								position :'fixed',
								zIndex :s.o.zIndex + 2
							})).append(
							s.o.close && s.o.closeHTML ? $(s.o.closeHTML)
									.addClass(s.o.closeClass) : '').appendTo(
							s.d.containerwrapper);
			s.d.wrap = $('<div></div>').attr('tabIndex', -1).addClass(
					'icwModalContent simplemodal-wrap').css( {
				height :'100%',
				outline :0,
				width :'100%'
			}).appendTo(s.d.container);
			// add styling and attributes to the data
			// append to body to get correct dimensions, then move to wrap
			s.d.data = data.attr('id', data.attr('id') || s.o.dataId).addClass(
					'simplemodal-data').css($.extend(s.o.dataCss, {
				display :'none'
			})).appendTo('body');
			data = null;
			s.setContainerDimensions();
			s.d.data.appendTo(s.d.wrap);
			// fix issues with IE
			if (ie6 || ieQuirks) {
				s.fixIE();
			}
		},
		/*
		 * Bind events
		 */
		bindEvents : function() {
			var s = this;
			// bind the close event to any element with the closeClass class
			$('.' + s.o.closeClass).bind('click.simplemodal', function(e) {
				e.preventDefault();
				s.close();
			});
			// bind the overlay click to the close function, if enabled
			if (s.o.modal && s.o.close && s.o.overlayClose) {
				s.d.overlay.bind('click.simplemodal', function(e) {
					e.preventDefault();
					s.close();
				});
			}
			// bind keydown events
			$(document).bind(
					'keydown.simplemodal',
					function(e) {
						if (s.o.modal && e.keyCode === 9) { // TAB
							s.watchTab(e);
						} else if ((s.o.close && s.o.escClose)
								&& e.keyCode === 27) { // ESC
							e.preventDefault();
							s.close();
						}
					});
			// update window size
			$(window).bind('resize.simplemodal', function() {
				// redetermine the window width/height
					w = s.getDimensions();
					// reposition the dialog
					s.o.autoResize ? s.setContainerDimensions()
							: s.o.autoPosition && s.setPosition();
					if (ie6 || ieQuirks) {
						s.fixIE();
					} else if (s.o.modal) {
						// update the iframe & overlay
						s.d.iframe && s.d.iframe.css( {
							height :w[0],
							width :w[1]
						});
						s.d.overlay.css( {
							height :w[0],
							width :w[1]
						});
					}
				});
			$('.icwModalTitle').live(
					'mousedown',
					function(e) {
						lastX = e.pageX;
						lastY = e.pageY;
						if (globalHc == undefined || globalHc == 0) {
							globalHc = (w[0] / 2)
									- (s.d.container.outerHeight(true) / 2);
						}
						if (globalVc == undefined || globalVc == 0) {
							globalVc = (w[1] / 2)
									- (s.d.container.outerWidth(true) / 2);
						}
						$(document).bind('mousemove', {
							src :s
						}, s.documentMouseMove);
						$(document).css("cursor", "move");
						$(document).bind('mouseup', {
							src :s
						}, s.bindMouseUp);
					});
		},
		bindMouseUp : function(event) {
			var s = event.data.src;
			$(document).unbind("mousemove", s.documentMouseMove);
			$(document).css("cursor", "default");
			$(document).unbind("mouseup", s.bindMouseUp);
		},
		documentMouseMove : function(event) {
			var s = event.data.src;
			var cPageX = event.pageX;
			var cpageY = event.pageY;
			var deltaX = cPageX - lastX;
			var deltaY = cpageY - lastY;
			// var top = s.o.position[0];
			// var left = s.o.position[1];
			// var top = $("#simplemodal-container").offset().top;
			// var left = $("#simplemodal-container").offset().left;
			// s.o.position = [top+deltaY,left+deltaX];
			s.setPositionMove(deltaY, deltaX);
			lastX = event.pageX;
			lastY = event.pageY;
		},
		setPositionMove : function(topD, leftD) {
			var s = this;
			globalHc = (globalHc) + topD;
			globalVc = (globalVc) + leftD;
			if (globalHc >= 0
					&& globalVc >= 0
					&& globalHc <= (document.body.scrollHeight - s.d.container
							.height())
					&& globalVc <= (document.body.scrollWidth - s.d.container
							.width())) {
				s.d.container.css( {
					left :globalVc,
					top :globalHc
				});
			}
			if (ie6 || ieQuirks) {
				s.fixIE();
			}
		},
		/*
		 * Unbind events
		 */
		unbindEvents : function() {
			$('.' + this.o.closeClass).unbind('click.simplemodal');
			$(document).unbind('keydown.simplemodal');
			$(window).unbind('resize.simplemodal');
			this.d.overlay.unbind('click.simplemodal');
		},
		/*
		 * Fix issues in IE6 and IE7 in quirks mode
		 */
		fixIE : function() {
			var s = this, p = s.o.position;
			// simulate fixed position - adapted from BlockUI
			$
					.each(
							[ s.d.iframe || null,
									!s.o.modal ? null : s.d.overlay,
									s.d.container ],
							function(i, el) {
								if (el) {
									var bch = 'document.body.clientHeight', bcw = 'document.body.clientWidth', bsh = 'document.body.scrollHeight', bsl = 'document.body.scrollLeft', bst = 'document.body.scrollTop', bsw = 'document.body.scrollWidth', ch = 'document.documentElement.clientHeight', cw = 'document.documentElement.clientWidth', sl = 'document.documentElement.scrollLeft', st = 'document.documentElement.scrollTop', s = el[0].style;
									s.position = 'absolute';
									if (i < 2) {
										s.removeExpression('height');
										s.removeExpression('width');
										s.setExpression('height', '' + bsh
												+ ' > ' + bch + ' ? ' + bsh
												+ ' : ' + bch + ' + "px"');
										s.setExpression('width', '' + bsw
												+ ' > ' + bcw + ' ? ' + bsw
												+ ' : ' + bcw + ' + "px"');
									} else {
										var te, le;
										if (p && p.constructor === Array) {
											var top = p[0] ? typeof p[0] === 'number' ? p[0]
													.toString()
													: p[0].replace(/px/, '')
													: el.css('top').replace(
															/px/, '');
											te = top.indexOf('%') === -1 ? top
													+ ' + (t = ' + st + ' ? '
													+ st + ' : ' + bst
													+ ') + "px"' : parseInt(top
													.replace(/%/, ''))
													+ ' * (('
													+ ch
													+ ' || '
													+ bch
													+ ') / 100) + (t = '
													+ st
													+ ' ? '
													+ st
													+ ' : '
													+ bst + ') + "px"';
											if (p[1]) {
												var left = typeof p[1] === 'number' ? p[1]
														.toString()
														: p[1]
																.replace(/px/,
																		'');
												le = left.indexOf('%') === -1 ? left
														+ ' + (t = '
														+ sl
														+ ' ? '
														+ sl
														+ ' : '
														+ bsl + ') + "px"'
														: parseInt(left
																.replace(/%/,
																		''))
																+ ' * (('
																+ cw
																+ ' || '
																+ bcw
																+ ') / 100) + (t = '
																+ sl
																+ ' ? '
																+ sl
																+ ' : '
																+ bsl
																+ ') + "px"';
											}
										} else {
											te = '('
													+ ch
													+ ' || '
													+ bch
													+ ') / 2 - (this.offsetHeight / 2) + (t = '
													+ st + ' ? ' + st + ' : '
													+ bst + ') + "px"';
											le = '('
													+ cw
													+ ' || '
													+ bcw
													+ ') / 2 - (this.offsetWidth / 2) + (t = '
													+ sl + ' ? ' + sl + ' : '
													+ bsl + ') + "px"';
										}
										s.removeExpression('top');
										s.removeExpression('left');
										s.setExpression('top', te);
										s.setExpression('left', le);
									}
								}
							});
		},
		/*
		 * Place focus on the first or last visible input
		 */
		focus : function(pos) {
			var s = this, p = pos && $.inArray(pos, [ 'first', 'last' ]) !== -1 ? pos
					: 'first';
			// focus on dialog or the first visible/enabled input element
			var input = $(':input:enabled:visible:' + p, s.d.wrap);
			setTimeout( function() {
				input.length > 0 ? input.focus() : s.d.wrap.focus();
			}, 10);
		},
		getDimensions : function() {
			var el = $(window);
			// fix a jQuery/Opera bug with determining the window height
			var h = $.browser.opera && $.browser.version > '9.5'
					&& $.fn.jquery < '1.3' || $.browser.opera
					&& $.browser.version < '9.5' && $.fn.jquery > '1.2.6' ? el[0].innerHeight
					: el.height();
			return [ h, el.width() ];
		},
		getVal : function(v, d) {
			return v ? (typeof v === 'number' ? v
					: v === 'auto' ? 0 : v.indexOf('%') > 0 ? ((parseInt(v
							.replace(/%/, '')) / 100) * (d === 'h' ? w[0]
							: w[1])) : parseInt(v.replace(/px/, ''))) : null;
		},
		/*
		 * Update the container. Set new dimensions, if provided. Focus, if
		 * enabled. Re-bind events.
		 */
		update : function(height, width) {
			var s = this;
			// prevent update if dialog does not exist
			if (!s.d.data) {
				return false;
			}
			// reset orig values
			s.d.origHeight = s.getVal(height, 'h');
			s.d.origWidth = s.getVal(width, 'w');
			// hide data to prevent screen flicker
			// s.d.data.hide();
			height && s.d.container.css('height', height);
			width && s.d.container.css('width', width);
			s.setContainerDimensions();
			// s.d.data.show();
			s.o.focus && s.focus();
			// rebind events
			s.unbindEvents();
			s.bindEvents();
		},
		setContainerDimensions : function() {
			var s = this;
			// get the dimensions for the container and data
			var ch = s.d.origHeight ? s.d.origHeight
					: $.browser.opera ? s.d.container.height() : s.getVal(
							s.d.container.css('height'), 'h'), cw = s.d.origWidth ? s.d.origWidth
					: $.browser.opera ? s.d.container.width() : s.getVal(
							s.d.container.css('width'), 'w'), dh = s.d.data
					.outerHeight(true), dw = s.d.data.outerWidth(true);
			s.d.origHeight = s.d.origHeight || ch;
			s.d.origWidth = s.d.origWidth || cw;
			// mxoh = max option height, mxow = max option width
			var mxoh = s.o.maxHeight ? s.getVal(s.o.maxHeight, 'h') : null, mxow = s.o.maxWidth ? s
					.getVal(s.o.maxWidth, 'w')
					: null, mh = mxoh && mxoh < w[0] ? mxoh : w[0], mw = mxow
					&& mxow < w[1] ? mxow : w[1];
			// moh = min option height
			var moh = s.o.minHeight ? s.getVal(s.o.minHeight, 'h') : 'auto';
			if (!ch || ch < 30) {
				if (!dh) {
					ch = moh;
				} else {
					if (dh > mh) {
						ch = mh;
					} else if (s.o.minHeight && moh !== 'auto' && dh < moh) {
						ch = moh;
					} else {
						ch = dh;
					}
				}
			} else {
				ch = s.o.autoResize && ch > mh ? mh : ch;
			}
			// mow = min option width
			var mow = s.o.minWidth ? s.getVal(s.o.minWidth, 'w') : 'auto';
			if (!cw || cw < 30) {
				if (!dw) {
					cw = mow;
				} else {
					if (dw > mw) {
						cw = mw;
					} else if (s.o.minWidth && mow !== 'auto' && dw < mow) {
						cw = mow;
					} else {
						cw = dw;
					}
				}
			} else {
				cw = s.o.autoResize && cw > mw ? mw : cw;
			}
			s.d.container.css( {
				height :ch,
				width :cw
			});
			// s.d.wrap.css({overflow: (dh > ch || dw > cw) ? 'auto' :
			// 'visible'});
			s.o.autoPosition && s.setPosition();
		},
		setPosition : function() {
			if (this.d.container.outerHeight(true) < w[0]) {
				var s = this, top, left, hc = (w[0] / 2)
						- (s.d.container.outerHeight(true) / 2), vc = (w[1] / 2)
						- (s.d.container.outerWidth(true) / 2);
				if (s.o.position
						&& Object.prototype.toString.call(s.o.position) === '[object Array]') {
					top = s.o.position[0] || hc;
					left = s.o.position[1] || vc;
				} else {
					top = hc;
					left = vc;
				}
				s.d.container.css( {
					left :left,
					top :top
				});
			} else {
				var s = this, top, left, hc = (w[0] / 2)
						- (s.d.container.outerHeight(true) / 2), vc = (w[1] / 2)
						- (s.d.container.outerWidth(true) / 2);
				if (s.o.position
						&& Object.prototype.toString.call(s.o.position) === '[object Array]') {
					top = s.o.position[0] || hc;
					left = s.o.position[1] || vc;
				} else {
					top = hc;
					left = vc;
				}
				s.d.container.css( {
					left :left,
					top :'20px'
				});
				window.scrollTo(0, 0);
				this.d.container.css( {
					position :'absolute'
				});
			}
		},
		watchTab : function(e) {
			var s = this;
			if ($(e.target).parents('.simplemodal-container').length > 0) {
				// save the list of inputs
		s.inputs = $(
				':input:enabled:visible:first, :input:enabled:visible:last',
				s.d.data[0]);
		// if it's the first or last tabbable element, refocus
		if ((!e.shiftKey && e.target === s.inputs[s.inputs.length - 1])
				|| (e.shiftKey && e.target === s.inputs[0])
				|| s.inputs.length === 0) {
			e.preventDefault();
			var pos = e.shiftKey ? 'last' : 'first';
			s.focus(pos);
		}
	} else {
		// might be necessary when custom onShow callback is used
		e.preventDefault();
		s.focus();
	}
},
/*
 * Open the modal dialog elements - Note: If you use the onOpen callback, you
 * must "show" the overlay and container elements manually (the iframe will be
 * handled by SimpleModal)
 */
open : function() {
	// init modal move var
		globalHc = 0;
		globalVc = 0;
		var s = this;
		// display the iframe
		s.d.iframe && s.d.iframe.show();
		if ($.isFunction(s.o.onOpen)) {
			// execute the onOpen callback
			s.o.onOpen.apply(s, [ s.d ]);
		} else {
			// display the remaining elements
			s.d.overlay.show();
			s.d.container.show();
			s.d.data.show();
		}
		s.o.focus && s.focus();
		// bind default events
		s.bindEvents();
	},
	/*
	 * Close the modal dialog - Note: If you use an onClose callback, you must
	 * remove the overlay, container and iframe elements manually
	 * 
	 * @param {boolean} external Indicates whether the call to this function was
	 * internal or external. If it was external, the onClose callback will be
	 * ignored
	 */
	close : function() {
		var s = this;
		// prevent close when dialog does not exist
		if (!s.d.data) {
			return false;
		}
		// remove the default events
		s.unbindEvents();
		if ($.isFunction(s.o.onClose) && !s.occb) {
			// set the onClose callback flag
			s.occb = true;
			// execute the onClose callback
			s.o.onClose.apply(s, [ s.d ]);
		} else {
			// if the data came from the DOM, put it back
			if (s.d.placeholder) {
				var ph = $('#simplemodal-placeholder');
				// save changes to the data?
				if (s.o.persist) {
					// insert the (possibly) modified data back into the DOM
					ph.replaceWith(s.d.data.removeClass('simplemodal-data')
							.css('display', s.display));
				} else {
					// remove the current and insert the original,
					// unmodified data back into the DOM
					s.d.data.hide().remove();
					ph.replaceWith(s.d.orig);
				}
			} else {
				// otherwise, remove it
				s.d.data.hide().remove();
			}
			// remove the remaining elements
			s.d.container.hide().remove();
			s.d.overlay.hide();
			s.d.iframe && s.d.iframe.hide().remove();
			setTimeout( function() {
				// opera work-around
					if (s.d.overlay) {
						s.d.overlay.remove();
					}
					// reset the dialog object
					s.d = {};
				}, 10);
		}
	}
	};
})(jQuery);

// code for back button
( function($, p) {
	var i, m = Array.prototype.slice, r = decodeURIComponent, a = $.param, c, l, v, b = $.bbq = $.bbq
			|| {}, q, u, j, e = $.event.special, d = "hashchange", A = "querystring", D = "fragment", y = "elemUrlAttr", g = "location", k = "href", t = "src", x = /^.*\?|#.*$/g, w = /^.*\#/, h, C = {};
	function E(F) {
		return typeof F === "string";
	}
	function B(G) {
		var F = m.call(arguments, 1);
		return function() {
			return G.apply(this, F.concat(m.call(arguments)));
		};
	}
	function n(F) {
		return F.replace(/^[^#]*#?(.*)$/, "$1");
	}
	function o(F) {
		return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1");
	}
	function f(H, M, F, I, G) {
		var O, L, K, N, J;
		if (I !== i) {
			K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/);
			J = K[3] || "";
			if (G === 2 && E(I)) {
				L = I.replace(H ? w : x, "");
			} else {
				N = l(K[2]);
				I = E(I) ? l[H ? D : A](I) : I;
				L = G === 2 ? I : G === 1 ? $.extend( {}, I, N) : $.extend( {},
						N, I);
				L = a(L);
				if (H) {
					L = L.replace(h, r);
				}
			}
			O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J;
		} else {
			O = M(F !== i ? F : p[g][k]);
		}
		return O;
	}
	a[A] = B(f, 0, o);
	a[D] = c = B(f, 1, n);
	c.noEscape = function(G) {
		G = G || "";
		var F = $.map(G.split(""), encodeURIComponent);
		h = new RegExp(F.join("|"), "g");
	};
	c.noEscape(",/");
	$.deparam = l = function(I, F) {
		var H = {}, G = {
			"true" :!0,
			"false" :!1,
			"null" :null
		};
		$.each(I.replace(/\+/g, " ").split("&"), function(L, Q) {
			var K = Q.split("="), P = r(K[0]), J, O = H, M = 0, R = P
					.split("]["), N = R.length - 1;
			if (/\[/.test(R[0]) && /\]$/.test(R[N])) {
				R[N] = R[N].replace(/\]$/, "");
				R = R.shift().split("[").concat(R);
				N = R.length - 1;
			} else {
				N = 0;
			}
			if (K.length === 2) {
				J = r(K[1]);
				if (F) {
					J = J && !isNaN(J) ? +J : J === "undefined" ? i
							: G[J] !== i ? G[J] : J;
				}
				if (N) {
					for (; M <= N; M++) {
						P = R[M] === "" ? O.length : R[M];
						O = O[P] = M < N ? O[P]
								|| (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J;
					}
				} else {
					if ($.isArray(H[P])) {
						H[P].push(J);
					} else {
						if (H[P] !== i) {
							H[P] = [ H[P], J ];
						} else {
							H[P] = J;
						}
					}
				}
			} else {
				if (P) {
					H[P] = F ? i : "";
				}
			}
		});
		return H;
	};
	function z(H, F, G) {
		if (F === i || typeof F === "boolean") {
			G = F;
			F = a[H ? D : A]();
		} else {
			F = E(F) ? F.replace(H ? w : x, "") : F;
		}
		return l(F, G);
	}
	l[A] = B(z, 0);
	l[D] = v = B(z, 1);
	$[y] || ($[y] = function(F) {
		return $.extend(C, F);
	})( {
		a :k,
		base :k,
		iframe :t,
		img :t,
		input :t,
		form :"action",
		link :k,
		script :t
	});
	j = $[y];
	function s(I, G, H, F) {
		if (!E(H) && typeof H !== "object") {
			F = H;
			H = G;
			G = i;
		}
		return this.each( function() {
			var L = $(this), J = G || j()[(this.nodeName || "").toLowerCase()]
					|| "", K = J && L.attr(J) || "";
			L.attr(J, a[I](K, H, F));
		});
	}
	$.fn[A] = B(s, A);
	$.fn[D] = B(s, D);
	b.pushState = q = function(I, F) {
		if (E(I) && /^#/.test(I) && F === i) {
			F = 2;
		}
		var H = I !== i, G = c(p[g][k], H ? I : {}, H ? F : 2);
		p[g][k] = G + (/#/.test(G) ? "" : "#");
	};
	b.getState = u = function(F, G) {
		return F === i || typeof F === "boolean" ? v(F) : v(G)[F];
	};
	b.removeState = function(F) {
		var G = {};
		if (F !== i) {
			G = u();
			$.each($.isArray(F) ? F : arguments, function(I, H) {
				delete G[H]
			})
		}
		q(G, 2)
	};
	e[d] = $.extend(e[d], {
		add : function(F) {
			var H;
			function G(J) {
				var I = J[D] = c();
				J.getState = function(K, L) {
					return K === i || typeof K === "boolean" ? l(I, K)
							: l(I, L)[K]
				};
				H.apply(this, arguments)
			}
			if ($.isFunction(F)) {
				H = F;
				return G
			} else {
				H = F.handler;
				F.handler = G
			}
		}
	})
})(jQuery, this);
( function($, i, b) {
	var j, k = $.event.special, c = "location", d = "hashchange", l = "href", f = $.browser, g = document.documentMode, h = f.msie
			&& (g === b || g < 8), e = "on" + d in i && !h;
	function a(m) {
		m = m || i[c][l];
		return m.replace(/^[^#]*#?(.*)$/, "$1")
	}
	$[d + "Delay"] = 100;
	k[d] = $.extend(k[d], {
		setup : function() {
			if (e) {
				return false
			}
			$(j.start)
		},
		teardown : function() {
			if (e) {
				return false
			}
			$(j.stop)
		}
	});
	j = ( function() {
		var m = {}, r, n, o, q;
		function p() {
			o = q = function(s) {
				return s
			};
			if (h) {
				n = $('<iframe src="javascript:0"/>').hide()
						.insertAfter("body")[0].contentWindow;
				q = function() {
					return a(n.document[c][l])
				};
				o = function(u, s) {
					if (u !== s) {
						var t = n.document;
						t.open().close();
						t[c].hash = "#" + u
					}
				};
				o(a())
			}
		}
		m.start = function() {
			if (r) {
				return
			}
			var t = a();
			o || p();
			( function s() {
				var v = a(), u = q(t);
				if (v !== t) {
					o(t = v, u);
					$(i).trigger(d)
				} else {
					if (u !== t) {
						i[c][l] = i[c][l].replace(/#.*/, "") + "#" + u
					}
				}
				r = setTimeout(s, $[d + "Delay"])
			})()
		};
		m.stop = function() {
			if (!n) {
				r && clearTimeout(r);
				r = 0
			}
		};
		return m
	})()
})(jQuery, this);

// Common Templates defined here
var subscriptionallornothingmodaltemplate = '<div class="icw"><div class="icwPrintOptions"><div class="icwModalOnly"><h4 class="icwModalTitle">{RESOLVESOFTWARESUBSCRIPTION_ALLORNOTHING_ISSUES_LOC}</h4><div class="icwInnerModalContent"><div class=""><div class="">{SUBS_ALLORNOTHING_INSTRUCTION_LOC}</div></div><br>{#param name=anyMandatoryServicePresent value=false} {#foreach $T.a as groupDataBean}<div class="holder"><table width="100%" cellspacing="0" cellpadding="0" class="icwModalTable"><tr><td class="Width20first">&nbsp;</td><td class="Width150">{ITEM_LOC}</td><td class="Width20">&nbsp;</td><td class="Width150">&nbsp;</td><td class="">&nbsp;</td></tr></table><div class="tableHolder"><table width="100%" cellspacing="0" cellpadding="0" class="icwModalTable"><tr><td class="Width20{#if $T.groupDataBean.e}icon{#/if}">&nbsp;</td><td class="Width150">{$T.groupDataBean.a}</td><td class="Width20"><label>{#if $T.groupDataBean.d} {#param name=anyMandatoryServicePresent value=true}<input class="selectionClassForIteration selectAll" selectAll="selectAll" {#if $T.groupDataBean.j}checked="checked" {#/if} name="radiobutton{$T.groupDataBean.a}" type="checkbox" gspname="{$T.groupDataBean.a}" typeR="{$T.groupDataBean.b}" configpath="{$T.groupDataBean.c}" value="radiobutton"/>{#/if} {#if !$T.groupDataBean.d}<input class="selectionClassForIteration selectAll" selectAll="selectAll" {#if $T.groupDataBean.j}checked="checked" {#/if} name="radiobutton{$T.groupDataBean.a}" type="radio" gspname="{$T.groupDataBean.a}" typeR="{$T.groupDataBean.b}" configpath="{$T.groupDataBean.c}" value="radiobutton"/>{#/if}</label></td><td class="Width100">{SELECTALL_LOC}</td><td class="Width20">&nbsp;</td><td class="icwLast "><a href="#" class="icwModalTooltip icwDecoration">{VIEWAFFECTEDSUBSCRIPTIONS_LOC}</a>&nbsp;{#if $T.groupDataBean.d}<img src="{DOCUMENTUM_URL}/i/icn/star_icon.gif" width="8" height="8" />{#/if}<div id="icwWhatsThisTooltip" class="affectedItems configUIResponseHiddenAttribute"><div class="icwModalOnly"><div class="icwInnerModalContent icwInsideModaltip"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="icwmodalinnertable"><tr><td colspan="4" class="Heading">{CONFIG_AFFECTEDITEMS_LOC}</td></tr>{#param name=showChangedMessage value=false} {#foreach $T.groupDataBean.q as affectedSubscriptionDataBean}<tr>{#if $T.affectedSubscriptionDataBean.d}<td>*&nbsp;</td>{#param name=showChangedMessage value=true} {#/if}<td class="icwcolorChange">{$T.affectedSubscriptionDataBean.a}</td><td>{$T.affectedSubscriptionDataBean.b} {MONTHS_LOC}</td><td>{#if $T.affectedSubscriptionDataBean.c != -1 && !$T.i} {currencySymbol} {$T.affectedSubscriptionDataBean.c}{#else}--{#/if}</td></tr>{#/for} {#if $P.showChangedMessage}<tr><td colspan="4" class="icwUCSBlueinfo">* {SKUDURATIONCHANGESTRING_LOC}</td></tr>{#/if}</table></div></div></div></td></tr><tr><td class="Width20">&nbsp;</td><td class="Width150">&nbsp;</td><td class="Width20"><label>{#if !$T.groupDataBean.d}<input class="selectionClassForIteration removeAll" removeAll="removeAll" {#if $T.groupDataBean.k}checked="checked" {#/if} name="radiobutton{$T.groupDataBean.a}" type="radio" gspname="{$T.groupDataBean.a}"typeR="{$T.groupDataBean.b}" configpath="{$T.groupDataBean.c}" value="radiobutton"/>{#else} &nbsp; {#/if}</label></td><td class="Width100">{#if $T.groupDataBean.d} &nbsp; {#else} {REMOVEALL_LOC} {#/if}</td><td class="icwLast "><a href="#" class="icwModalTooltip icwDecoration"></a></td></tr></table></div></div>{#/for}<br /><table width="100%" cellspacing="0" cellpadding="0" class="icwModalTable">{#if $P.anyMandatoryServicePresent}<tr><td class="Width20"><img src="{DOCUMENTUM_URL}/i/icn/star_icon.gif" /></td><td class="">&nbsp;{MANDATORYSOFTWARESUBSCRIPTIONSAPPLYTOPRODUCT_LOC}</td></tr>{#/if}</table><div class="Centerbuttons"><input class="icwButton icwButtonValidate" type="submit" allOrNothing="YES" value="{VALIDATE_LOC}" disabled="disabled" /></div><div class="icwBorderDive">&nbsp;</div><div class="icwButtonholder"><div class="Leftbuttons"><input type="submit" class="icwButton icwButtonCancel" value="{CANCEL_LOC}" /><div class="">{IWILLADDRESSTHESEISSUESLATER_LOC}</div></div><div class="Rightbuttons"><input type="hidden" class="saveEnabledVal" value="{$T.e}" />{#if $T.e}<input type="button" class="icwButton SaveandContinue icwMarginLeft" value="{SAVECONTINUE_LOC}"/>{#else}<input type="submit" class="icwButton SaveandContinue icwMarginLeft" allOrNothing="YES" value="{SAVECONTINUE_LOC}" disabled="disabled" />{#/if}</div></div></div></div></div></div>';
var subscriptiondurationmodaltemplate = '<div class="icwModalOnly"><h4 class="icwModalTitle">{RESOLVESOFTWARESUBSCRIPTION_DURATIONALIGNMENT_ISSUES_LOC}</h4><div class="icwInnerModalContent"><div class="">{SUBS_DURATIONALIGNMENT_INSTRUCTION_LOC}</div><br>{#if !$T.k}<div class="icwMessage icwMessageError commonDurationNotExist" style="border: 1px solid #000000"><ul><li>{$T.l.m} {#if $T.l.a} {$T.l.a} {#/if}<span style="font-weight: normal;">( {$T.l.c} )</span></li>{#if $T.m}<li class="flexSubsOutOfRangeMessage">{$T.n.m} {#if $T.n.a} {$T.n.a} {#/if}<span style="font-weight: normal;">( {$T.n.c} )</span></li>{#/if}</ul></div>{#/if} {#if $T.m}<div class="icwMessage icwMessageError flexSubsOutOfRangeMessage" style="border: 1px solid #000000"><ul><li class="flexSubsOutOfRangeMessage">{$T.n.m} {#if $T.n.a} {$T.n.a} {#/if}<span style="font-weight: normal;">( {$T.n.c} )</span></li></ul></div>{#/if}{#if $T.j}<div class="icwMessage icwMessageGuiding" style="border: 1px solid #000000"><ul><li>{$T.j.m} {#if $T.j.a} {$T.j.a} {#/if}</li></ul></div>{#/if}{#foreach $T.b as groupDataBean}<div class="holder"><table width="100%" cellspacing="0" cellpadding="0" class="icwModalTable"><tr><td class="Width20first">&nbsp;</td><td class="Width150">{ITEMORGROUP_LOC}</td><td class="Width20">&nbsp;</td><td class="Width150">{#if $T.m}{ENTERDURATION_LOC}{#else}{SELECTEDDURATION_LOC}{#/if}</td><td class=""><a href="#linkTBD"></a></td></tr></table><div class="tableHolder"><table width="100%" cellspacing="0" cellpadding="0" class="icwModalTable"><tr><td class="Width20{#if $T.groupDataBean.e}icon{#/if}">&nbsp;</td><td class="Width150">{$T.groupDataBean.a}</td><td class="Width20">&nbsp;</td><td class="Width105">{#if $T.m}<input class="icwDurationSelectionDropdown icwInactive icwDurationText" type="text" groupName="{$T.groupDataBean.a}" configPath="{$T.groupDataBean.c}" typeR="{$T.groupDataBean.b}" selectedDurationVal="{$T.groupDataBean.g}" {#if $T.groupDataBean.n <= $T.groupDataBean.o}{#if $T.groupDataBean.g==0 } value="{$T.groupDataBean.n} - {$T.groupDataBean.o}" {#elseif $T.groupDataBean.g !=0 } value="{$T.groupDataBean.g}" {#/if} {#elseif $T.groupDataBean.n > $T.groupDataBean.o} value="" disabled="disabled" {#/if} name="textbox-{$T.groupDataBean.a}" id="textid-{$T.groupDataBean.a}" minRange="{$T.groupDataBean.n}" maxRange="{$T.groupDataBean.o}"/>&nbsp;&nbsp;{MONTHS_LOC}{#else}<select name="select2" id="select2" class="icwDurationSelectionDropdown Width100" groupName="{$T.groupDataBean.a}" configPath="{$T.groupDataBean.c}" typeR="{$T.groupDataBean.b}" selectedDurationVal="{$T.groupDataBean.g}">{#if $T.groupDataBean.g == 0}<option value="">Select</option>{#/if} {#foreach $T.groupDataBean.f as durationLOV}<option {#if $T.groupDataBean.g==$T.durationLOV}selected{#/if} value="{$T.durationLOV}">{$T.durationLOV} {MONTHS_LOC}</option>{#/for}</select>{#/if}</td><td class="Width20">&nbsp;</td><td class="icwLast"><a href="#linkTBD" class="icwModalTooltip icwDecoration">{VIEWAFFECTEDSUBSCRIPTIONS_LOC}</a><div id="icwWhatsThisTooltip" class="affectedItems configUIResponseHiddenAttribute"><div class="icwModalOnly"><div class="icwInnerModalContent icwInsideModaltip"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="icwmodalinnertable"><tr><td colspan="4" class="Heading">{CONFIG_AFFECTEDITEMS_LOC}</td></tr>{#param name=showChangedMessage value=false} {#foreach $T.groupDataBean.q as affectedSubscriptionDataBean}<tr><td>{#if $T.affectedSubscriptionDataBean.d} <span class="icwUCSBlueinfo">*</span> {#param name=showChangedMessage value=true}{#/if} &nbsp;</td><td class="icwcolorChange">{$T.affectedSubscriptionDataBean.a}</td><td>{$T.affectedSubscriptionDataBean.b} {MONTHS_LOC}</td><td>{#if $T.affectedSubscriptionDataBean.c != -1 && !$T.i} {currencySymbol}{$T.affectedSubscriptionDataBean.c}{#else}--{#/if}</td></tr>{#/for} {#if $P.showChangedMessage}<tr><td colspan="4" class="icwUCSBlueinfo">* {SKUDURATIONCHANGESTRING_LOC}</td></tr>{#/if}</table></div></div></div></td></tr></table></div></div>{#/for}<div class="Centerbuttons"><input class="icwButton icwButtonDisabled icwButtonValidate icwbtnValidateClick icwDurCorrValidateBtn" type="submit" value="{VALIDATE_LOC}" disabled="disabled" /></div><div class="icwBorderDive">&nbsp;</div><div class="icwButtonholder"><div class="Leftbuttons "><input type="button" class="icwButton icwButtonCancel icwDurCorrCancelBtn" value="{CANCEL_LOC}"/><div class="">{IWILLADDRESSTHESEISSUESLATER_LOC}</div></div><div class="Rightbuttons"><input type="hidden" class="saveEnabledVal" value="{$T.e}" />{#if $T.e}<input type="submit" class="icwButton SaveandContinue icwMarginLeft icwDurCorrSaveAndContBtn"value="{SAVECONTINUE_LOC}" />{#else}<input type="submit" class="icwButton SaveandContinue icwMarginLeft icwDurCorrSaveAndContBtn"value="{SAVECONTINUE_LOC}" disabled="disabled" />{#/if}</div></div></div></div>';
var pathTranslationModal = '<div class="translationConfigData">{$T.configPath}</div><div class="translationItemData">{$T.itemPath}</div><div class="translationErrorData">{$T.errorMsg}</div><div class="translationStatusData">{$T.validationStatus}</div>';
var sessionTimeOutGoModal = '<h4 class="icwModalTitle">{SESSIONEXPIRED_LOC}</h4><div class="icwInnerModalContent"><div class="icwMessage icwMessageError"><p>{PRODCONFIG_SESSEXPIRED_LOC}</p></div><p>{CLICKGO_WORKSPACEHOME_LOC}</p><div class="icwModalSubmit icwClearFloat"><input type="button" class="icwButton icwButtonGo" value="{GO_LOC}" /></div></div>';

// code for handling errors
$
		.extend( {
			log : function(str) {
				var windowProps = "";
				for ( var i = 0; i < registeredObject.length; i++) {
					var propVal = registeredObject[i] + " <--> "
							+ JSON.stringify(window['' + registeredObject[i]])
					if (window.console) {
						console.log(propVal);
					}
					windowProps += propVal;
				}

				if (lastAjaxRequestData) {
					str += "Last ajax Request/Response Data "
							+ lastAjaxRequestData + " <--> " + ajaxResponse;
					lastAjaxRequestData = null;
					ajaxResponse = null;
				}

				if (window.console) {
					console.log(str);
				}

				log_printing = "CONFIGUIACTION=BrowserErrorLogAction&JAVA_SCRIPT_CONSOLE_LOGS=CURRENT_PAGE --> "
						+ CURRENT_PAGE
						+ " currentTabId --> "
						+ currentTabId
						+ " " + windowProps + "Error String --> " + str;
				ajaxRequest = $.ajax( {
					async :true,
					type :"POST",
					data :log_printing + "&reqType=AJAX",
					url :CONTEXT_PATH + "/configAjaxHandler",
					cache :false
				});

			}
		});

window.onerror = function(msg, url, line) {
	var errorMessage = "Message <--> " + msg + " Url <--> " + url
			+ " Line Number <--> " + line;
	$.log(errorMessage);
	return false;
}
function replaceAll(value, pcFrom, pcTo) {
	var i = value.indexOf(pcFrom);
	var c = value;
	while (i > -1) {
		c = c.replace(pcFrom, pcTo);
		i = c.indexOf(pcFrom);
	}
	return c;
}
function encodeXml(xmlString) {
	xmlString = replaceAll(xmlString, "&lt;", "<");
	xmlString = replaceAll(xmlString, "&gt;", ">");
	xmlString = xmlString.substring(xmlString.indexOf("<"), xmlString
			.lastIndexOf(">") + 1);
	return xmlString;
}

$.blockUIConfig = {
	show : function() {
		$(".blockUILOCKER").show();
		$(".blockUIImageContainer").show();
		$(".blockUILOCKER").css("opacity", "0.4");
		$(".blockUILOCKER").fadeIn("slow")
	},
	hide : function() {
		$(".blockUILOCKER").hide();
		$(".blockUIImageContainer").hide();
	}
};
( function($) {
	$.blockUI = function() {
		$.blockUIConfig.show();
	};
	$.unblockUI = function(opts) {
		$.blockUIConfig.hide();
	};
})(jQuery);

/*
 * jTemplates 0.7.8 (http://jtemplates.tpython.com) Copyright (c) 2009 Tomasz
 * Gloc
 */
eval( function(p, a, c, k, e, r) {
	e = function(c) {
		return (c < a ? '' : e(parseInt(c / a)))
				+ ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c
						.toString(36))
	};
	if (!''.replace(/^/, String)) {
		while (c--)
			r[e(c)] = k[c] || e(c);
		k = [ function(e) {
			return r[e]
		} ];
		e = function() {
			return '\\w+'
		};
		c = 1
	}
	;
	while (c--)
		if (k[c])
			p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p
}
		(
				'a(37.b&&!37.b.38){(9(b){6 m=9(s,A,f){5.1M=[];5.1u={};5.2p=E;5.1N={};5.1c={};5.f=b.1m({1Z:1f,3a:1O,2q:1f,2r:1f,3b:1O,3c:1O},f);5.1v=(5.f.1v!==F)?(5.f.1v):(13.20);5.Y=(5.f.Y!==F)?(5.f.Y):(13.3d);5.3e(s,A);a(s){5.1w(5.1c[\'21\'],A,5.f)}5.1c=E};m.y.2s=\'0.7.8\';m.R=1O;m.y.3e=9(s,A){6 2t=/\\{#14 *(\\w*?)( .*)*\\}/g;6 22,1x,M;6 1y=E;6 2u=[];2v((22=2t.3N(s))!=E){1y=2t.1y;1x=22[1];M=s.2w(\'{#/14 \'+1x+\'}\',1y);a(M==-1){C j Z(\'15: m "\'+1x+\'" 2x 23 3O.\');}5.1c[1x]=s.2y(1y,M);2u[1x]=13.2z(22[2])}a(1y===E){5.1c[\'21\']=s;c}N(6 i 24 5.1c){a(i!=\'21\'){5.1N[i]=j m()}}N(6 i 24 5.1c){a(i!=\'21\'){5.1N[i].1w(5.1c[i],b.1m({},A||{},5.1N||{}),b.1m({},5.f,2u[i]));5.1c[i]=E}}};m.y.1w=9(s,A,f){a(s==F){5.1M.B(j 1g(\'\',1,5));c}s=s.U(/[\\n\\r]/g,\'\');s=s.U(/\\{\\*.*?\\*\\}/g,\'\');5.2p=b.1m({},5.1N||{},A||{});5.f=j 2A(f);6 p=5.1M;6 1P=s.1h(/\\{#.*?\\}/g);6 16=0,M=0;6 e;6 1i=0;6 25=0;N(6 i=0,l=(1P)?(1P.V):(0);i<l;++i){6 17=1P[i];a(1i){M=s.2w(\'{#/1z}\');a(M==-1){C j Z("15: 3P 1Q 3f 1z.");}a(M>16){p.B(j 1g(s.2y(16,M),1,5))}16=M+11;1i=0;i=b.3Q(\'{#/1z}\',1P);1R}M=s.2w(17,16);a(M>16){p.B(j 1g(s.2y(16,M),1i,5))}6 3R=17.1h(/\\{#([\\w\\/]+).*?\\}/);6 26=I.$1;2B(26){q\'3S\':++25;p.27();q\'a\':e=j 1A(17,p);p.B(e);p=e;D;q\'J\':p.27();D;q\'/a\':2v(25){p=p.28();--25}q\'/N\':q\'/29\':p=p.28();D;q\'29\':e=j 1n(17,p,5);p.B(e);p=e;D;q\'N\':e=2a(17,p,5);p.B(e);p=e;D;q\'1R\':q\'D\':p.B(j 18(26));D;q\'2C\':p.B(j 2D(17,5.2p));D;q\'h\':p.B(j 2E(17));D;q\'2F\':p.B(j 2G(17));D;q\'3T\':p.B(j 1g(\'{\',1,5));D;q\'3U\':p.B(j 1g(\'}\',1,5));D;q\'1z\':1i=1;D;q\'/1z\':a(m.R){C j Z("15: 3V 2H 3f 1z.");}D;2I:a(m.R){C j Z(\'15: 3W 3X: \'+26+\'.\');}}16=M+17.V}a(s.V>16){p.B(j 1g(s.3Y(16),1i,5))}};m.y.K=9(d,h,z,H){++H;6 $T=d,2b,2c;a(5.f.3b){$T=5.1v(d,{2d:(5.f.3a&&H==1),1S:5.f.1Z},5.Y)}a(!5.f.3c){2b=5.1u;2c=h}J{2b=5.1v(5.1u,{2d:(5.f.2q),1S:1f},5.Y);2c=5.1v(h,{2d:(5.f.2q&&H==1),1S:1f},5.Y)}6 $P=b.1m({},2b,2c);6 $Q=(z!=F)?(z):({});$Q.2s=5.2s;6 19=\'\';N(6 i=0,l=5.1M.V;i<l;++i){19+=5.1M[i].K($T,$P,$Q,H)}--H;c 19};m.y.2J=9(1T,1o){5.1u[1T]=1o};13=9(){};13.3d=9(3g){c 3g.U(/&/g,\'&3Z;\').U(/>/g,\'&3h;\').U(/</g,\'&3i;\').U(/"/g,\'&40;\').U(/\'/g,\'&#39;\')};13.20=9(d,1B,Y){a(d==E){c d}2B(d.2K){q 2A:6 o={};N(6 i 24 d){o[i]=13.20(d[i],1B,Y)}a(!1B.1S){a(d.41("2L"))o.2L=d.2L}c o;q 42:6 o=[];N(6 i=0,l=d.V;i<l;++i){o[i]=13.20(d[i],1B,Y)}c o;q 2M:c(1B.2d)?(Y(d)):(d);q 43:a(1B.1S){a(m.R)C j Z("15: 44 45 23 46.");J c F}2I:c d}};13.2z=9(2e){a(2e===E||2e===F){c{}}6 o=2e.47(/[= ]/);a(o[0]===\'\'){o.48()}6 2N={};N(6 i=0,l=o.V;i<l;i+=2){2N[o[i]]=o[i+1]}c 2N};6 1g=9(2O,1i,14){5.2f=2O;5.3j=1i;5.1d=14};1g.y.K=9(d,h,z,H){6 2g=5.2f;a(!5.3j){6 2P=5.1d;6 $T=d;6 $P=h;6 $Q=z;2g=2g.U(/\\{(.*?)\\}/g,9(49,3k){1C{6 1D=10(3k);a(1E 1D==\'9\'){a(2P.f.1Z||!2P.f.2r){c\'\'}J{1D=1D($T,$P,$Q)}}c(1D===F)?(""):(2M(1D))}1F(e){a(m.R){a(e 1G 18)e.1j="4a";C e;}c""}})}c 2g};6 1A=9(L,1H){5.2h=1H;L.1h(/\\{#(?:J)*a (.*?)\\}/);5.3l=I.$1;5.1p=[];5.1q=[];5.1I=5.1p};1A.y.B=9(e){5.1I.B(e)};1A.y.28=9(){c 5.2h};1A.y.27=9(){5.1I=5.1q};1A.y.K=9(d,h,z,H){6 $T=d;6 $P=h;6 $Q=z;6 19=\'\';1C{6 2Q=(10(5.3l))?(5.1p):(5.1q);N(6 i=0,l=2Q.V;i<l;++i){19+=2Q[i].K(d,h,z,H)}}1F(e){a(m.R||(e 1G 18))C e;}c 19};2a=9(L,1H,14){a(L.1h(/\\{#N (\\w+?) *= *(\\S+?) +4b +(\\S+?) *(?:12=(\\S+?))*\\}/)){L=\'{#29 2a.3m 3n \'+I.$1+\' 2H=\'+(I.$2||0)+\' 1Q=\'+(I.$3||-1)+\' 12=\'+(I.$4||1)+\' u=$T}\';c j 1n(L,1H,14)}J{C j Z(\'15: 4c 4d "3o": \'+L);}};2a.3m=9(i){c i};6 1n=9(L,1H,14){5.2h=1H;5.1d=14;L.1h(/\\{#29 (.+?) 3n (\\w+?)( .+)*\\}/);5.3p=I.$1;5.x=I.$2;5.W=I.$3||E;5.W=13.2z(5.W);5.1p=[];5.1q=[];5.1I=5.1p};1n.y.B=9(e){5.1I.B(e)};1n.y.28=9(){c 5.2h};1n.y.27=9(){5.1I=5.1q};1n.y.K=9(d,h,z,H){1C{6 $T=d;6 $P=h;6 $Q=z;6 1r=10(5.3p);6 1U=[];6 1J=1E 1r;a(1J==\'3q\'){6 2R=[];b.1e(1r,9(k,v){1U.B(k);2R.B(v)});1r=2R}6 u=(5.W.u!==F)?(10(5.W.u)):(($T!=E)?($T):({}));6 s=1V(10(5.W.2H)||0),e;6 12=1V(10(5.W.12)||1);a(1J!=\'9\'){e=1r.V}J{a(5.W.1Q===F||5.W.1Q===E){e=1V.4e}J{e=1V(10(5.W.1Q))+((12>0)?(1):(-1))}}6 19=\'\';6 i,l;a(5.W.1W){6 2S=s+1V(10(5.W.1W));e=(2S>e)?(e):(2S)}a((e>s&&12>0)||(e<s&&12<0)){6 1K=0;6 3r=(1J!=\'9\')?(4f.4g((e-s)/12)):F;6 1s,1k;N(;((12>0)?(s<e):(s>e));s+=12,++1K){1s=1U[s];a(1J!=\'9\'){1k=1r[s]}J{1k=1r(s);a(1k===F||1k===E){D}}a((1E 1k==\'9\')&&(5.1d.f.1Z||!5.1d.f.2r)){1R}a((1J==\'3q\')&&(1s 24 2A)){1R}6 3s=u[5.x];u[5.x]=1k;u[5.x+\'$3t\']=s;u[5.x+\'$1K\']=1K;u[5.x+\'$3u\']=(1K==0);u[5.x+\'$3v\']=(s+12>=e);u[5.x+\'$3w\']=3r;u[5.x+\'$1U\']=(1s!==F&&1s.2K==2M)?(5.1d.Y(1s)):(1s);u[5.x+\'$1E\']=1E 1k;N(i=0,l=5.1p.V;i<l;++i){1C{19+=5.1p[i].K(u,h,z,H)}1F(2T){a(2T 1G 18){2B(2T.1j){q\'1R\':i=l;D;q\'D\':i=l;s=e;D;2I:C e;}}J{C e;}}}1l u[5.x+\'$3t\'];1l u[5.x+\'$1K\'];1l u[5.x+\'$3u\'];1l u[5.x+\'$3v\'];1l u[5.x+\'$3w\'];1l u[5.x+\'$1U\'];1l u[5.x+\'$1E\'];1l u[5.x];u[5.x]=3s}}J{N(i=0,l=5.1q.V;i<l;++i){19+=5.1q[i].K($T,h,z,H)}}c 19}1F(e){a(m.R||(e 1G 18))C e;c""}};6 18=9(1j){5.1j=1j};18.y=Z;18.y.K=9(d){C 5;};6 2D=9(L,A){L.1h(/\\{#2C (.*?)(?: 4h=(.*?))?\\}/);5.1d=A[I.$1];a(5.1d==F){a(m.R)C j Z(\'15: 4i 3o 2C: \'+I.$1);}5.3x=I.$2};2D.y.K=9(d,h,z,H){6 $T=d;6 $P=h;1C{c 5.1d.K(10(5.3x),h,z,H)}1F(e){a(m.R||(e 1G 18))C e;}c\'\'};6 2E=9(L){L.1h(/\\{#h 1T=(\\w*?) 1o=(.*?)\\}/);5.x=I.$1;5.2f=I.$2};2E.y.K=9(d,h,z,H){6 $T=d;6 $P=h;6 $Q=z;1C{h[5.x]=10(5.2f)}1F(e){a(m.R||(e 1G 18))C e;h[5.x]=F}c\'\'};6 2G=9(L){L.1h(/\\{#2F 4j=(.*?)\\}/);5.2U=10(I.$1);5.2V=5.2U.V;a(5.2V<=0){C j Z(\'15: 2F 4k 4l 4m\');}5.2W=0;5.2X=-1};2G.y.K=9(d,h,z,H){6 2Y=b.O(z,\'1X\');a(2Y!=5.2X){5.2X=2Y;5.2W=0}6 i=5.2W++%5.2V;c 5.2U[i]};b.1a.1w=9(s,A,f){a(s.2K===m){c b(5).1e(9(){b.O(5,\'2i\',s);b.O(5,\'1X\',0)})}J{c b(5).1e(9(){b.O(5,\'2i\',j m(s,A,f));b.O(5,\'1X\',0)})}};b.1a.4n=9(1L,A,f){6 s=b.2Z({1t:1L,1Y:1f}).3y;c b(5).1w(s,A,f)};b.1a.4o=9(30,A,f){6 s=b(\'#\'+30).2O();a(s==E){s=b(\'#\'+30).3z();s=s.U(/&3i;/g,"<").U(/&3h;/g,">")}s=b.4p(s);s=s.U(/^<\\!\\[4q\\[([\\s\\S]*)\\]\\]>$/3A,\'$1\');s=s.U(/^<\\!--([\\s\\S]*)-->$/3A,\'$1\');c b(5).1w(s,A,f)};b.1a.4r=9(){6 1W=0;b(5).1e(9(){a(b.2j(5)){++1W}});c 1W};b.1a.4s=9(){b(5).3B();c b(5).1e(9(){b.3C(5,\'2i\')})};b.1a.2J=9(1T,1o){c b(5).1e(9(){6 t=b.2j(5);a(t===F){a(m.R)C j Z(\'15: m 2x 23 3D.\');J c}t.2J(1T,1o)})};b.1a.31=9(d,h){c b(5).1e(9(){6 t=b.2j(5);a(t===F){a(m.R)C j Z(\'15: m 2x 23 3D.\');J c}b.O(5,\'1X\',b.O(5,\'1X\')+1);b(5).3z(t.K(d,h,5,0))})};b.1a.4t=9(1L,h,G){6 X=5;G=b.1m({1j:\'4u\',1Y:1O,32:1f},G);b.2Z({1t:1L,1j:G.1j,O:G.O,3E:G.3E,1Y:G.1Y,32:G.32,3F:G.3F,4v:\'4w\',4x:9(d){6 r=b(X).31(d,h);a(G.2k){G.2k(r)}},4y:G.4z,4A:G.4B});c 5};6 2l=9(1t,h,2m,2n,1b,G){5.3G=1t;5.1u=h;5.3H=2m;5.3I=2n;5.1b=1b;5.3J=E;5.33=G||{};6 X=5;b(1b).1e(9(){b.O(5,\'34\',X)});5.35()};2l.y.35=9(){5.3K();a(5.1b.V==0){c}6 X=5;b.4C(5.3G,5.3I,9(d){6 r=b(X.1b).31(d,X.1u);a(X.33.2k){X.33.2k(r)}});5.3J=4D(9(){X.35()},5.3H)};2l.y.3K=9(){5.1b=b.3L(5.1b,9(o){a(b.4E.4F){6 n=o.36;2v(n&&n!=4G){n=n.36}c n!=E}J{c o.36!=E}})};b.1a.4H=9(1t,h,2m,2n,G){c j 2l(1t,h,2m,2n,5,G)};b.1a.3B=9(){c b(5).1e(9(){6 2o=b.O(5,\'34\');a(2o==E){c}6 X=5;2o.1b=b.3L(2o.1b,9(o){c o!=X});b.3C(5,\'34\')})};b.1m({38:9(s,A,f){c j m(s,A,f)},4I:9(1L,A,f){6 s=b.2Z({1t:1L,1Y:1f}).3y;c j m(s,A,f)},2j:9(z){c b.O(z,\'2i\')},4J:9(14,O,3M){c 14.K(O,3M,F,0)},4K:9(1o){m.R=1o}})})(b)}',
				62,
				295,
				'|||||this|var|||function|if|jQuery|return|||settings||param||new|||Template|||node|case||||extData|||_name|prototype|element|includes|push|throw|break|null|undefined|options|deep|RegExp|else|get|oper|se|for|data|||DEBUG_MODE|||replace|length|_option|that|f_escapeString|Error|eval||step|TemplateUtils|template|jTemplates|ss|this_op|JTException|ret|fn|objs|_templates_code|_template|each|false|TextNode|match|literalMode|type|cval|delete|extend|opFOREACH|value|_onTrue|_onFalse|fcount|ckey|url|_param|f_cloneData|setTemplate|tname|lastIndex|literal|opIF|filter|try|__tmp|typeof|catch|instanceof|par|_currentState|mode|iteration|url_|_tree|_templates|true|op|end|continue|noFunc|name|key|Number|count|jTemplateSID|async|disallow_functions|cloneData|MAIN|iter|not|in|elseif_level|op_|switchToElse|getParent|foreach|opFORFactory|_param1|_param2|escapeData|optionText|_value|__t|_parent|jTemplate|getTemplate|on_success|Updater|interval|args|updater|_includes|filter_params|runnable_functions|version|reg|_template_settings|while|indexOf|is|substring|optionToObject|Object|switch|include|Include|UserParam|cycle|Cycle|begin|default|setParam|constructor|toString|String|obj|val|__template|tab|arr|tmp|ex|_values|_length|_index|_lastSessionID|sid|ajax|elementName|processTemplate|cache|_options|jTemplateUpdater|run|parentNode|window|createTemplate||filter_data|clone_data|clone_params|escapeHTML|splitTemplates|of|txt|gt|lt|_literalMode|__1|_cond|funcIterator|as|find|_arg|object|_total|prevValue|index|first|last|total|_root|responseText|html|im|processTemplateStop|removeData|defined|dataFilter|timeout|_url|_interval|_args|timer|detectDeletedNodes|grep|parameter|exec|closed|No|inArray|ppp|elseif|ldelim|rdelim|Missing|unknown|tag|substr|amp|quot|hasOwnProperty|Array|Function|Functions|are|allowed|split|shift|__0|subtemplate|to|Operator|failed|MAX_VALUE|Math|ceil|root|Cannot|values|has|no|elements|setTemplateURL|setTemplateElement|trim|CDATA|hasTemplate|removeTemplate|processTemplateURL|GET|dataType|json|success|error|on_error|complete|on_complete|getJSON|setTimeout|browser|msie|document|processTemplateStart|createTemplateURL|processTemplateToText|jTemplatesDebugMode'
						.split('|'), 0, {}))