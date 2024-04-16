package com.hms.mortuary.dto;

import java.io.Serializable;
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

//@Proxy(lazy=true)
@Entity
@Table(name = "cold_room_mortuary_slave")
public class Coldroommortuaryslave implements Serializable {

	private static final long serialVersionUID = 1L;

	@GeneratedValue
	@Id
	@Column(name="coldroommortuaryslave_id")
	private int coldroommortuaryslave_id;
	
	@Column(name="bed_number")
	private int bed_number;
	
	@Column(name="availability")
	private String availability;
	@Column(name="status")
	private String status;
	
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

	@Column(name="cold_room_master")
	private int cold_room_master;
	
	
	@Column(name="mor_id")
	private int mor_id;
	
	@Transient
	private List<Coldroommortuaryslave> coldroommortuaryslave;
	/*@OneToMany(fetch=FetchType.LAZY)
	@Column(name="bedstatemortuary")
	private List<Bedstatemortuary> bedstatemortuary=new ArrayList<Bedstatemortuary>();*/
	
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

	public List<Coldroommortuaryslave> getColdroommortuaryslave() {
		return coldroommortuaryslave;
	}

	public void setColdroommortuaryslave(
			List<Coldroommortuaryslave> coldroommortuaryslave) {
		this.coldroommortuaryslave = coldroommortuaryslave;
	}
	
	public int getColdroommortuaryslave_id() {
		return coldroommortuaryslave_id;
	}

	public void setColdroommortuaryslave_id(int coldroommortuaryslave_id) {
		this.coldroommortuaryslave_id = coldroommortuaryslave_id;
	}

	public int getBed_number() {
		return bed_number;
	}

	public void setBed_number(int bed_number) {
		this.bed_number = bed_number;
	}

	public String getAvailability() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}

	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}

	public int getCold_room_master() {
		return cold_room_master;
	}

	public void setCold_room_master(int cold_room_master) {
		this.cold_room_master = cold_room_master;
	}

	public int getMor_id() {
		return mor_id;
	}

	public void setMor_id(int mor_id) {
		this.mor_id = mor_id;
	}

	@Override
	public String toString() {
		return "Coldroommortuaryslave [coldroommortuaryslave_id="
				+ coldroommortuaryslave_id + ", bed_number=" + bed_number
				+ ", availability=" + availability + ", status=" + status
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", deleted=" + deleted
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDate=" + deletedDate
				+ ", cold_room_master=" + cold_room_master + ", mor_id="
				+ mor_id + ", coldroommortuaryslave=" + coldroommortuaryslave
				+ "]";
	}
}