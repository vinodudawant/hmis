package com.hms.ipd.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name = "ot_type")
public class OTTypeDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "drr_id",columnDefinition="int default 0")
	private int idOT_name;
	
	@Column(name = "ot_name")
	private String ot_name;
	
	@Column(name = "theaterCharges")
	private Float theaterCharges;
	
	@Column(name = "color")
	private String color;
	
	@Column(name = "status")
	private String status;
	

	@Column(name="unit_id")
	private Integer unitId;
		

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
	
	
	@Transient
	private List<OTTypeDTO> otNameList;
	
	@JsonGetter("otchrg")
	public Float getTheaterCharges() {
		return theaterCharges;
	}
		@JsonSetter("otchrg")
	public void setTheaterCharges(Float theaterCharges) {
		this.theaterCharges = theaterCharges;
	}
	

	@JsonGetter("otid")
	public int getIdOT_name() {
		return idOT_name;
	}

	public void setIdOT_name(int idOT_name) {
		this.idOT_name = idOT_name;
	}

	@JsonGetter("otnm")
	public String getOt_name() {
		return ot_name;
	}

	public void setOt_name(String ot_name) {
		this.ot_name = ot_name;
	}

	@JsonGetter("liot")
	public List<OTTypeDTO> getOtNameList() {
		return otNameList;
	}

	public void setOtNameList(List<OTTypeDTO> otNameList) {
		this.otNameList = otNameList;
	}
	
	@JsonGetter("color")
	public String getColor() {
		return color;
	}
	@JsonSetter("color")
	public void setColor(String color) {
		this.color = color;
	}

	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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
	
	
}
