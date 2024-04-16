package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class IpdDoctors {
	private int ipdDoctorId;
	private int doctorId;
	private String status;
	private String docName;
	private String department;
	private List<IpdDoctors> listIpdDoctors;

	@JsonGetter("ipdDocId")
	public int getIpdDoctorId() {
		return ipdDoctorId;
	}

	@JsonSetter("ipdDocId")
	public void setIpdDoctorId(int ipdDoctorId) {
		this.ipdDoctorId = ipdDoctorId;
	}

	@JsonGetter("docId")
	public int getDoctorId() {
		return doctorId;
	}

	@JsonSetter("docId")
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("liDocId")
	public List<IpdDoctors> getListIpdDoctors() {
		return listIpdDoctors;
	}

	@JsonSetter("liDocId")
	public void setListIpdDoctors(List<IpdDoctors> listIpdDoctors) {
		this.listIpdDoctors = listIpdDoctors;
	}
	@JsonGetter("docName")
	public String getDocName() {
		return docName;
	}
	@JsonSetter("docName")
	public void setDocName(String docName) {
		this.docName = docName;
	}
	@JsonGetter("department")
	public String getDepartment() {
		return department;
	}
	@JsonSetter("department")
	public void setDepartment(String department) {
		this.department = department;
	}

}
