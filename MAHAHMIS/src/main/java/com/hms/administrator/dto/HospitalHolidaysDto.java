package com.hms.administrator.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "hospital_holiday")
public class HospitalHolidaysDto {
	@Id
	@GeneratedValue
	@Column(name = "idhospital_holiday")
	private int idHospitalHolidays;
	

	@Column(name = "date")
	private String date;
	@Column(name = "reason")
	private String reason;

	@Column(name = "selYear")
	private String selYear;
	
	@Column(name = "idHospitalHoliday")
	private int idHospitalHoliday=0;

	@Column(name = "status")
	private String status="Y";
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	
	@Transient
	private List<HospitalHolidaysDto> listHoliday;

@JsonGetter("listHoliday")
	public List<HospitalHolidaysDto> getListHoliday() {
		return listHoliday;
	}

@JsonSetter("listHoliday")
	public void setListHoliday(List<HospitalHolidaysDto> listHoliday) {
		this.listHoliday = listHoliday;
	}
public int getIdHospitalHolidays() {
	return idHospitalHolidays;
}

public void setIdHospitalHolidays(int idHospitalHolidays) {
	this.idHospitalHolidays = idHospitalHolidays;
}

public int getIdHospitalHoliday() {
	return idHospitalHoliday;
}


public void setIdHospitalHoliday(int idHospitalHoliday) {
	this.idHospitalHoliday = idHospitalHoliday;
}


public String getDate() {
	return date;
}


public void setDate(String date) {
	this.date = date;
}


public String getReason() {
	return reason;
}


public void setReason(String reason) {
	this.reason = reason;
}	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	public String getSelYear() {
		return selYear;
	}

	public void setSelYear(String selYear) {
		this.selYear = selYear;
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


}
