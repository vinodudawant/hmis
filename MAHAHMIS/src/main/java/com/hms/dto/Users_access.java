package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class Users_access {

	private int idusers_access;
	private int User_ID;
	private String module_id_li;

	private List<Users_access> liUsers_access;

	private List<Ehat_module> liEhat_module;

	@JsonGetter("liem")
	public List<Ehat_module> getLiEhat_module() {
		return liEhat_module;
	}

	public void setLiEhat_module(List<Ehat_module> liEhat_module) {
		this.liEhat_module = liEhat_module;
	}

	@JsonGetter("idua")
	public int getIdusers_access() {
		return idusers_access;
	}

	public void setIdusers_access(int idusers_access) {
		this.idusers_access = idusers_access;
	}

	@JsonGetter("uid")
	public int getUser_ID() {
		return User_ID;
	}

	public void setUser_ID(int user_ID) {
		User_ID = user_ID;
	}

	@JsonGetter("modli")
	public String getModule_id_li() {
		return module_id_li;
	}

	public void setModule_id_li(String module_id_li) {
		this.module_id_li = module_id_li;
	}

	@JsonGetter("liua")
	public List<Users_access> getLiUsers_access() {
		return liUsers_access;
	}

	public void setLiUsers_access(List<Users_access> liUsers_access) {
		this.liUsers_access = liUsers_access;
	}

}
