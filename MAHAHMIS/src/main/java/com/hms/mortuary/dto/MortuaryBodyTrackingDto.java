package com.hms.mortuary.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


@Entity
@Table(name="mortuary_body_tracking")
public class MortuaryBodyTrackingDto {

	@Id
	@GeneratedValue
	@Column(name="body_tracking_id")
	private int bodyTrackingId;

	@Column(name="body_moved_to")
	private String bodyMovedTo;
	
	@Column(name="moved_date")
	private String movedDate;
	
	@Column(name="moved_time")
	private String movedTime;
	
	@Column(name="body_handover_to")
	private String bodyHandoverTo;
	
	@Column(name="body_notes_to")
	private String bodyNotesTo;


	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="mor_id")
	private MortuaryMasterDto morId;

	@Column(name="deleted")
	private String isDeleted = "Y";//
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Temporal(TemporalType.TIME)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<MortuaryBodyTrackingDto> list;	
	


	public String getBodyNotesTo() {
		return bodyNotesTo;
	}

	public void setBodyNotesTo(String bodyNotesTo) {
		this.bodyNotesTo = bodyNotesTo;
	}


	public int getBodyTrackingId() {
		return bodyTrackingId;
	}

	public void setBodyTrackingId(int bodyTrackingId) {
		this.bodyTrackingId = bodyTrackingId;
	}

	public String getBodyMovedTo() {
		return bodyMovedTo;
	}

	public void setBodyMovedTo(String bodyMovedTo) {
		this.bodyMovedTo = bodyMovedTo;
	}

	public String getMovedDate() {
		return movedDate;
	}

	public void setMovedDate(String movedDate) {
		this.movedDate = movedDate;
	}

	public String getMovedTime() {
		return movedTime;
	}

	public void setMovedTime(String movedTime) {
		this.movedTime = movedTime;
	}

	public String getBodyHandoverTo() {
		return bodyHandoverTo;
	}

	public void setBodyHandoverTo(String bodyHandoverTo) {
		this.bodyHandoverTo = bodyHandoverTo;
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

	public List<MortuaryBodyTrackingDto> getList() {
		return list;
	}

	public void setList(List<MortuaryBodyTrackingDto> list) {
		this.list = list;
	}


	@Override
	public String toString() {
		return "MortuaryBodyTrackingDto [bodyTrackingId=" + bodyTrackingId
				+ ", bodyMovedTo=" + bodyMovedTo + ", movedDate=" + movedDate
				+ ", movedTime=" + movedTime + ", bodyHandoverTo="
				+ bodyHandoverTo + ", bodyNotesTo=" + bodyNotesTo + ", morId="
				+ morId + ", isDeleted=" + isDeleted + ", createdBy="
				+ createdBy + ", createdDate=" + createdDate + ", updatedBy="
				+ updatedBy + ", updatedDate=" + updatedDate + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", list=" + list
				+ "]";
	}
}