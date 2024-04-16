package com.hms.mortuary.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
@Table(name = "MortuaryFindings")
public class MortuaryFindingsDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name="finding_id")
	private int findingsId;
	
	@Column(name = "headings",length=9000)
	private String headings;
	
	@Column(name = "remarks",length=9000)
    private String remarks;
	
	@OneToOne
	@JoinColumn(name="mortuaryId")
    private MortuaryMasterDto mortuaryId;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<MortuaryFindingsDto> listmortuaryFindings;

	public int getFindingsId() {
		return findingsId;
	}

	public void setFindingsId(int findingsId) {
		this.findingsId = findingsId;
	}

	public String getHeadings() {
		return headings;
	}

	public void setHeadings(String headings) {
		this.headings = headings;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public MortuaryMasterDto getMortuaryId() {
		return mortuaryId;
	}

	public void setMortuaryId(MortuaryMasterDto mortuaryId) {
		this.mortuaryId = mortuaryId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public List<MortuaryFindingsDto> getListmortuaryFindings() {
		return listmortuaryFindings;
	}

	public void setListmortuaryFindings(
			List<MortuaryFindingsDto> listmortuaryFindings) {
		this.listmortuaryFindings = listmortuaryFindings;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

/*	@Override
	public String toString() {
		return "MortuaryFindingsDto [findingsId=" + findingsId + ", headings="
				+ headings + ", remarks=" + remarks + ", mortuaryId="
				+ mortuaryId + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", listmortuaryFindings=" + listmortuaryFindings
				+ "]";
	}*/
	
	
	

}
