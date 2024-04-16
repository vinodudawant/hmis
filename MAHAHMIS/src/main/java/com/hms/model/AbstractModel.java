package com.hms.model;

import org.springframework.context.ApplicationContext;

import com.hms.utility.ApplicationContextUtils;

public abstract class AbstractModel {

	protected static final ApplicationContext getContext() {
		return ApplicationContextUtils.getApplicationContext();
	}

}
