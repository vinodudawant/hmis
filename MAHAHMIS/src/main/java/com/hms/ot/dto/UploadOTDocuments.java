package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "ehat_otdocuments")
public class UploadOTDocuments implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idehat_OTdocuments")
	private int idOTDoc;
	@Column(name = "patient_ID")
	private int PatientID;
	@Column(name = "treatmentOperationsManageID")
	private int treatmentOperationsManageID;
	
	@Column(name = "documentName")
	private String OTDocName;
	
	@Column(name = "notes")
	private String notes;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "assignedBy")
	private String assignedBy;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "deletedBy")
	private String deletedBy;
	
	@Transient
	@JsonIgnore
	private List<UploadOTDocuments> listDocs;
	
	@JsonGetter("idotdoc")
	public int getIdOTDoc() {
		return idOTDoc;
	}
	@JsonSetter("idotdoc")
	public void setIdOTDoc(int idOTDoc) {
		this.idOTDoc = idOTDoc;
	}
	@JsonGetter("pid")
	public int getPatientID() {
		return PatientID;
	}
	@JsonSetter("pid")
	public void setPatientID(int patientID) {
		PatientID = patientID;
	}
	@JsonGetter("tomid")
	public int getTreatmentOperationsManageID() {
		return treatmentOperationsManageID;
	}
	@JsonSetter("tomid")
	public void setTreatmentOperationsManageID(int treatmentOperationsManageID) {
		this.treatmentOperationsManageID = treatmentOperationsManageID;
	}
	@JsonGetter("otdocname")
	public String getOTDocName() {
		return OTDocName;
	}
	@JsonSetter("otdocname")
	public void setOTDocName(String oTDocName) {
		OTDocName = oTDocName;
	}
	@JsonGetter("otnotes")
	public String getNotes() {
		return notes;
	}
	@JsonSetter("otnotes")
	public void setNotes(String notes) {
		this.notes = notes;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("listotdocs")
	public List<UploadOTDocuments> getListDocs() {
		return listDocs;
	}
	@JsonSetter("listotdocs")
	public void setListDocs(List<UploadOTDocuments> listDocs) {
		this.listDocs = listDocs;
	}
	public String getAssignedBy() {
		return assignedBy;
	}
	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(String deletedBy) {
		this.deletedBy = deletedBy;
	}

	
}
