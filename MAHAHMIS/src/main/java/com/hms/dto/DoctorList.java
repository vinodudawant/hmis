package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class DoctorList {
	private int idDoctorList;
	private int tretId;
	private String status;
	private int DocId;
	
	
	@JsonGetter("idDoc")
	public int getDocId() {
		return DocId;
	}
	@JsonSetter("idDoc")
	public void setDocId(int docId) {
		DocId = docId;
	}

	private List<DoctorList> listDoctor;
	
	
	@JsonGetter("idDoctorList")
	public int getIdDoctorList() {
		return idDoctorList;
	}
	@JsonSetter("idDoctorList")
	public void setIdDoctorList(int idDoctorList) {
		this.idDoctorList = idDoctorList;
	}
	@JsonGetter("tretID")
	public int getTretId() {
		return tretId;
	}
	@JsonSetter("tretID")
	public void setTretId(int tretId) {
		this.tretId = tretId;
	}
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("doctorList")
	public List<DoctorList> getListDoctor() {
		return listDoctor;
	}
	
	@JsonSetter("doctorList")
	public void setListDoctor(List<DoctorList> listDoctor) {
		this.listDoctor = listDoctor;
	}

}
