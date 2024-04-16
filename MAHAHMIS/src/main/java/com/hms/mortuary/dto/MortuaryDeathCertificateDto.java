package com.hms.mortuary.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "mortuary_death_certificates")
public class MortuaryDeathCertificateDto {
	
	@Id
	@GeneratedValue
	@Column(name="certificate_id")
	private int certificateId;

	@Column(name = "certificate_name")
	private String certificateName;
	
	@Column(name = "certificate_path")
	private String certificatePath;
	
	@Column(name = "certificate_note")
	private String certificateNote;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="mor_id")
	private MortuaryMasterDto morId;

	@Column(name="deleted")
	private String isDeleted = "N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<MortuaryDeathCertificateDto> certificateList;


	public MortuaryDeathCertificateDto() {
		super();
	}

	
	public int getCertificateId() {
		return certificateId;
	}

	public void setCertificateId(int certificateId) {
		this.certificateId = certificateId;
	}

	public String getCertificateName() {
		return certificateName;
	}

	public void setCertificateName(String certificateName) {
		this.certificateName = certificateName;
	}

	public String getCertificatePath() {
		return certificatePath;
	}

	public String getCertificateNote() {
		return certificateNote;
	}

	public void setCertificateNote(String certificateNote) {
		this.certificateNote = certificateNote;
	}

	public void setCertificatePath(String certificatePath) {
		this.certificatePath = certificatePath;
	}

	public MortuaryMasterDto getMorId() {
		return morId;
	}

	public void setMorId(MortuaryMasterDto morId) {
		this.morId = morId;
	}

	public String getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(String isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<MortuaryDeathCertificateDto> getCertificateList() {
		return certificateList;
	}

	public void setCertificateList(List<MortuaryDeathCertificateDto> certificateList) {
		this.certificateList = certificateList;
	}


	@Override
	public String toString() {
		return "MortuaryDeathCertificateDto [certificateId=" + certificateId
				+ ", certificateName=" + certificateName + ", certificatePath="
				+ certificatePath + ", certificateNote=" + certificateNote
				+ ", morId=" + morId + ", isDeleted=" + isDeleted
				+ ", createdBy=" + createdBy + ", createdDate=" + createdDate
				+ ", updatedBy=" + updatedBy + ", updatedDate=" + updatedDate
				+ ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate
				+ ", certificateList=" + certificateList + "]";
	}
}
