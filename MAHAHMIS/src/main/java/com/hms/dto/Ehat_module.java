package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class Ehat_module {

	private int idehat_module;

	private String module_name;

	private List<Ehat_module> liEhat_module;

	@JsonGetter("idem")
	public int getIdehat_module() {
		return idehat_module;
	}

	public void setIdehat_module(int idehat_module) {
		this.idehat_module = idehat_module;
	}

	@JsonGetter("modnm")
	public String getModule_name() {
		return module_name;
	}

	public void setModule_name(String module_name) {
		this.module_name = module_name;
	}

	@JsonGetter("liem")
	public List<Ehat_module> getLiEhat_module() {
		return liEhat_module;
	}

	public void setLiEhat_module(List<Ehat_module> liEhat_module) {
		this.liEhat_module = liEhat_module;
	}

}
