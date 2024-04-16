var keyman = {
	code_registry : [],
	key_registry : [],
	registry : [], // an array that holds all of our registry entries

	add : function(e) {
		// key code (i.e. if "a" is pressed, then this function returns "65")
		var code = this.getCode(e);

		// key value (i.e. if "a" is pressed, then this function returns "A")
		var key = this.getKey(e).toUpperCase();

		// if the key code and value aren't already in the arrays, then add
		// them!
		if (!this.code_registry.inArray(code)
				&& !this.key_registry.inArray(key)) {
			this.code_registry.push(code);
			this.key_registry.push(key);
		}

		this.press(e);

		return this;
	},

	getCode : function(e) {
		e = window.event || e;
		var code = e.keyCode || e.which;
		return code;
	},

	getKey : function(e) {
		e = window.event || e;
		var code = e.keyCode || e.which;
		return String.fromCharCode(code);
	},

	press : function(e) {

		// check if any modifiers are currently pressed
		var mods = [];

		if (e.shiftKey == 1)
			mods.push('SHIFT');
		if (e.ctrlKey == 1)
			mods.push('CTRL');
		if (e.altKey == 1)
			mods.push('ALT');

		// loop through registry to find a match for the current key presses
		for (i = 0; i < this.registry.length; i++) {
			var r_id = this.registry[i][0];
			var r_key = this.registry[i][1];
			var r_keydown = this.registry[i][2];
			var r_mods = this.registry[i][3];

			var all_pressed = true;
			var keys = []; // keys in this definition, helpful for removal
			// later

			if (r_key.indexOf('+') != -1) {
				keys = r_key.split('+');

				for (j = 0; j < keys.length; j++) {
					if (!this.key_registry.inArray(keys[j])
							&& !this.code_registry.inArray(parseInt(keys[j]))) {
						all_pressed = false;
					}
				}
			} else if (!this.key_registry.inArray(r_key)
					&& !this.code_registry.inArray(parseInt(r_key))) {
				all_pressed = false;
			} else {
				keys.push(r_key);
			}

			if (all_pressed) {
				// check modifiers if they were defined and are pressed
				var mods_pressed = true;

				if (r_mods && r_mods.length > 0) {
					for (j = 0; j < r_mods.length; j++) {
						var mod = r_mods[j];

						if (!mods.inArray(mod)) {
							mods_pressed = false;
						}
					}
				}

				if (mods_pressed) {
					if (typeof r_keydown == 'function') {
						r_keydown(e);
					}

					// remove all the pressed keys from the registry
					for (j = 0; j < keys.length; j++) {
						var index = this.key_registry.indexOf(keys[j]);
						this.key_registry.splice(index, 1); // remove key from
						// registry
						this.code_registry.splice(index, 1); // remove code
						// from registry
					}
				}
			}
		}

		return this;
	},

	register : function(id, key, keydown, mods) {
		mods = (mods) ? mods.split(',') : null;
		this.registry.push([ id, key.toUpperCase(), keydown, mods ]);
		return this;
	},

	remove : function(e) {
		var code = this.getCode(e);
		var key = this.getKey(e).toUpperCase();

		var index1 = this.code_registry.indexOf(code);
		this.code_registry.splice(index1, 1);

		var index2 = this.key_registry.indexOf(key);
		this.key_registry.splice(index2, 1);

		return this;
	}
};

$(window).keydown(function(event) {
	keyman.add(event);
});

$(window).keyup(function(event) {
	keyman.remove(event);
});

/** ********************SET KEY Board Shortcut Keys************** */

keyman.register('Alert1', 'r', function(e) {
	window.location.href = 'PatientServlet?action=NewReg&pagenm=reg';

}, 'ALT');

keyman.register('Alert1', 'd', function(e) {
	window.location.href = 'PatientServlet?action=NewReg&pagenm=serReg';

}, 'ALT');

keyman.register('Alert1', '3', function(e) {
	window.location.href = 'OPDDoctorsDeskDashboard.jsp';

}, 'CTRL');

keyman.register('Alert1', '4', function(e) {
	window.location.href = 'IPD_OldPatientDatabase.jsp';

}, 'CTRL');

keyman.register('Alert1', '5', function(e) {
	window.location.href = 'OTSchedule.jsp';

}, 'CTRL');

keyman.register('Alert1', '6', function(e) {
	window.location.href = 'BillingDashboardForIPD.jsp';

}, 'CTRL');

keyman.register('Alert1', '7', function(e) {
	window.location.href = 'Inventory.jsp';

}, 'CTRL');
keyman.register('Alert1', '8', function(e) {
	window.location.href = 'ReportDashboard.jsp';

}, 'CTRL');
keyman.register('Alert1', '9', function(e) {
	window.location.href = 'MachineTableView.jsp';

}, 'CTRL');

keyman.register('Alert1', 'A', function(e) {
	window.location.href = 'UserManagement.jsp';

}, 'CTRL');

keyman.register('Alert1', 'R', function(e) {
	window.location.href = 'HRManagement.jsp';

}, 'CTRL');
