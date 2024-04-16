package com.hms.model;

import java.util.List;

import com.hms.dto.SponsoredDetailsDTO;

public class DocBean {
	
	int HiddenR;
	String PatientID,TreatmentID;
	String notes,date;
	String Document;
	private List<DocBean> docBeanList;
	
	public String getPatientID() {
		return PatientID;
	}
	public void setPatientID(String patientID) {
		PatientID = patientID;
	}
	public String getTreatmentID() {
		return TreatmentID;
	}
	public void setTreatmentID(String treatmentID) {
		TreatmentID = treatmentID;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDocument() {
		return Document;
	}
	public void setDocument(String document) {
		Document = document;
	}
	public List<DocBean> getDocBeanList() {
		return docBeanList;
	}
	public void setDocBeanList(List<DocBean> docBeanList) {
		this.docBeanList = docBeanList;
	}
	public Integer getHiddenR() {
		return HiddenR;
	}
	public void setHiddenR(Integer hiddenR) {
		HiddenR = hiddenR;
	}
	




}
