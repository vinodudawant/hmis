package com.hms.mortuary.dto;

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

@Entity
@Table(name="cold_room_master")
public class ColdRoomMasterDto {
	@Id
	@GeneratedValue
	@Column(name="cold_room_id")
	private int cold_room_id;
	
	@Column(name="cold_room_name")
	private String cold_room_name;
	
	@Column(name="quantity_of_beds")
	private int quantity_of_beds;
	
	

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;	

	@Column(name = "deleted")
	private String deleted="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;


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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public int getCold_room_id() {
		return cold_room_id;
	}

	public void setCold_room_id(int cold_room_id) {
		this.cold_room_id = cold_room_id;
	}

	public String getCold_room_name() {
		return cold_room_name;
	}

	public void setCold_room_name(String cold_room_name) {
		this.cold_room_name = cold_room_name;
	}

	public int getQuantity_of_beds() {
		return quantity_of_beds;
	}

	public void setQuantity_of_beds(int quantity_of_beds) {
		this.quantity_of_beds = quantity_of_beds;
	}

	@Transient
	private List<ColdRoomMasterDto> listColdRoomMaster;

	
	public List<ColdRoomMasterDto> getListColdRoomMaster() {
		return listColdRoomMaster;
	}

	
	public void setListColdRoomMaster(List<ColdRoomMasterDto> listColdRoomMaster) {
		this.listColdRoomMaster = listColdRoomMaster;
	}
}