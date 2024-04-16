package com.hms.ehat.dto;

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

@Entity
@Table(name = "ehat_doctorround_master")
public class DoctorRoundCharg  implements Serializable{
	@Id
	@GeneratedValue
	@Column(name = "drchargesid")
	private int drchargesid;

	@Column(name = "dr_id")
	private int dr_id;
	
	@Column(name = "hall_id")
	private int hall_id=0;

	@Column(name = "hallslave_id")
	private int hallslave_id;
	
	
	@Column(name = "sponser_id")
	private int sponser_id=0;

	@Column(name = "sponserslave_id")
	private int sponserslave_id;
	
	@Column(name = "dr_amnt")
	private double dr_amnt=0;
	
	@Column(name = "created_by",  updatable=false)
	private int createdBy;

	@Column(name = "updated_by")
	private int updatedBy;

	public int getDrchargesid() {
		return drchargesid;
	}

	public void setDrchargesid(int drchargesid) {
		this.drchargesid = drchargesid;
	}

	public int getHall_id() {
		return hall_id;
	}

	public void setHall_id(int hall_id) {
		this.hall_id = hall_id;
	}

	public int getHallslave_id() {
		return hallslave_id;
	}

	public void setHallslave_id(int hallslave_id) {
		this.hallslave_id = hallslave_id;
	}

	public int getSponser_id() {
		return sponser_id;
	}

	public void setSponser_id(int sponser_id) {
		this.sponser_id = sponser_id;
	}

	public int getSponserslave_id() {
		return sponserslave_id;
	}

	public void setSponserslave_id(int sponserslave_id) {
		this.sponserslave_id = sponserslave_id;
	}

	@Column(name = "deleted_by" )
	private int deletedBy;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "drflag")
	private String drflag="-";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Transient
	private List<DoctorRoundCharg> lstDocroundDetails;
	@Transient
	String Sponsername;

	public String getSponsername() {
		return Sponsername;
	}

	public void setSponsername(String sponsername) {
		Sponsername = sponsername;
	}

	public int getDr_id() {
		return dr_id;
	}

	public void setDr_id(int dr_id) {
		this.dr_id = dr_id;
	}

	

	public double getDr_amnt() {
		return dr_amnt;
	}

	public void setDr_amnt(double dr_amnt) {
		this.dr_amnt = dr_amnt;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
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

	public List<DoctorRoundCharg> getLstDocroundDetails() {
		return lstDocroundDetails;
	}

	public void setLstDocroundDetails(List<DoctorRoundCharg> lstDocroundDetails) {
		this.lstDocroundDetails = lstDocroundDetails;
	}

	public String getDrflag() {
		return drflag;
	}

	public void setDrflag(String drflag) {
		this.drflag = drflag;
	}
	

}
