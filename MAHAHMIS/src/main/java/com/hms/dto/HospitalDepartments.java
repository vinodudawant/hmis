package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class HospitalDepartments {

	private int departmentId;
	private String departmentName;
	private String status;

	private List<HospitalDepartments> listDepartments;

	@JsonGetter("liDep")
	public List<HospitalDepartments> getListDepartments() {
		return listDepartments;
	}

	@JsonSetter("liDep")
	public void setListDepartments(List<HospitalDepartments> listDepartments) {
		this.listDepartments = listDepartments;
	}

	@JsonGetter("depId")
	public int getDepartmentId() {
		return departmentId;
	}

	@JsonSetter("depId")
	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	@JsonGetter("depNm")
	public String getDepartmentName() {
		return departmentName;
	}

	@JsonSetter("depNm")
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

}
