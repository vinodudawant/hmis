package com.hms.ehat.dto;

import java.io.Serializable;
import java.math.BigInteger;
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
@Table(name = "ehat_consultation_charges_master")
public class ConsultationChargesDto implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "drchargesid")
	private BigInteger drchargesid;
	
	@Transient
	private String categoryName;
	
	@Transient
	private BigInteger sort_flag;

	@Column(name = "dr_speciality_id")
	private BigInteger drSpecialityId;
	
	@Column(name = "dr_id")
	private BigInteger dr_id;
	
	@Column(name = "hall_id")
	private BigInteger hall_id;

	@Column(name = "hallslave_id")
	private BigInteger hallslave_id;	
	
	@Column(name = "sponser_id")
	private BigInteger sponser_id;

	@Column(name = "sponserslave_id")
	private BigInteger sponserslave_id;
	
	@Column(name = "consult_amnt")
	private double consultAmnt;
	
	@Column(name = "consult_weekend_amnt")
	private double consultWeekendAmnt;
	
	@Column(name = "followup_amnt")
	private double followupAmnt;
	
	@Column(name = "follow_weekend_amnt")
	private double followWeekendAmnt;
	
	@Column(name = "created_by",  updatable=false)
	private int createdBy;

	@Column(name = "updated_by")
	private int updatedBy;
	
	@Column(name = "deleted_by" )
	private int deletedBy;

	@Column(name = "deleted")
	private String deleted;
	
	@Column(name = "drflag")
	private String drflag="-";
	
	@Column(name = "unit_id" )
	private BigInteger unitId;

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
	String Sponsername;
	
	@Transient
	private List<ConsultationChargesDto> lstDocroundDetails;

	public BigInteger getDrchargesid() {
		return drchargesid;
	}

	public void setDrchargesid(BigInteger drchargesid) {
		this.drchargesid = drchargesid;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public BigInteger getSort_flag() {
		return sort_flag;
	}

	public void setSort_flag(BigInteger sort_flag) {
		this.sort_flag = sort_flag;
	}

	public BigInteger getDrSpecialityId() {
		return drSpecialityId;
	}

	public void setDrSpecialityId(BigInteger drSpecialityId) {
		this.drSpecialityId = drSpecialityId;
	}

	public BigInteger getDr_id() {
		return dr_id;
	}

	public void setDr_id(BigInteger dr_id) {
		this.dr_id = dr_id;
	}

	public BigInteger getHall_id() {
		return hall_id;
	}

	public void setHall_id(BigInteger hall_id) {
		this.hall_id = hall_id;
	}

	public BigInteger getHallslave_id() {
		return hallslave_id;
	}

	public void setHallslave_id(BigInteger hallslave_id) {
		this.hallslave_id = hallslave_id;
	}

	public BigInteger getSponser_id() {
		return sponser_id;
	}

	public void setSponser_id(BigInteger sponser_id) {
		this.sponser_id = sponser_id;
	}

	public BigInteger getSponserslave_id() {
		return sponserslave_id;
	}

	public void setSponserslave_id(BigInteger sponserslave_id) {
		this.sponserslave_id = sponserslave_id;
	}

	public double getConsultAmnt() {
		return consultAmnt;
	}

	public void setConsultAmnt(double consultAmnt) {
		this.consultAmnt = consultAmnt;
	}

	public double getConsultWeekendAmnt() {
		return consultWeekendAmnt;
	}

	public void setConsultWeekendAmnt(double consultWeekendAmnt) {
		this.consultWeekendAmnt = consultWeekendAmnt;
	}

	public double getFollowupAmnt() {
		return followupAmnt;
	}

	public void setFollowupAmnt(double followupAmnt) {
		this.followupAmnt = followupAmnt;
	}

	public double getFollowWeekendAmnt() {
		return followWeekendAmnt;
	}

	public void setFollowWeekendAmnt(double followWeekendAmnt) {
		this.followWeekendAmnt = followWeekendAmnt;
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

	public String getDrflag() {
		return drflag;
	}

	public void setDrflag(String drflag) {
		this.drflag = drflag;
	}

	public BigInteger getUnitId() {
		return unitId;
	}

	public void setUnitId(BigInteger unitId) {
		this.unitId = unitId;
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

	public String getSponsername() {
		return Sponsername;
	}

	public void setSponsername(String sponsername) {
		Sponsername = sponsername;
	}

	public List<ConsultationChargesDto> getLstDocroundDetails() {
		return lstDocroundDetails;
	}

	public void setLstDocroundDetails(List<ConsultationChargesDto> lstDocroundDetails) {
		this.lstDocroundDetails = lstDocroundDetails;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
