package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;


@Entity
@Immutable
@Table(name="ehat_dialysis_documents")
public class UploadDocumentDialysisDto {
	
	
	@Id
	@GeneratedValue
	@Column(name = "updocs_id")
	private int upid;
	
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "image_name")
	private String filePath;
	
	@Column(name = "notes")
	private String note;

	@Column(name = "date")
	private Date date;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	@Column(name = "deleted_flag")
	private String del="N";

	public int getUpid() {
		return upid;
	}

	public void setUpid(int upid) {
		this.upid = upid;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	

	public String getDel() {
		return del;
	}

	public void setDel(String del) {
		this.del = del;
	}
	
	@Transient
	private List<UploadDocumentDialysisDto> listdocumentDialysis;

	public List<UploadDocumentDialysisDto> getListdocumentDialysis() {
		return listdocumentDialysis;
	}

	public void setListdocumentDialysis(
			List<UploadDocumentDialysisDto> listdocumentDialysis) {
		this.listdocumentDialysis = listdocumentDialysis;
	}
	@Column(name = "treatment_Id")
	private int treatmentId;

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	
	
}
