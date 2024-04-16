package com.hms.doctordesk.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("deprecation")
@Entity
@Table(name="radiation_tech_master")
public class RadiationDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "idradiation")
	private int radiationId;
	
	@Column(name = "radiation_name")
	private String radiationName;
	
	@Column(name = "mould")
	private double mould;
	
	@Column(name = "ct")
	private double ct;
	
	@Column(name = "planning")
	private double planning;
	
	@Column(name = "qa")
	private double qa;
	
	@Column(name = "imaging")
	private double imaging;
	
	@Column(name = "total")
	private double total;
	
	@Column(name = "treat_amount")
	private double treatAmount;
	
	@Column(name = "final_amount")
	private double finalAmount;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<RadiationDto> lstradiationMaster;

	public int getRadiationId() {
		return radiationId;
	}

	public void setRadiationId(int radiationId) {
		this.radiationId = radiationId;
	}

	public String getRadiationName() {
		return radiationName;
	}

	public void setRadiationName(String radiationName) {
		this.radiationName = radiationName;
	}

	public double getMould() {
		return mould;
	}

	public void setMould(double mould) {
		this.mould = mould;
	}

	public double getCt() {
		return ct;
	}

	public void setCt(double ct) {
		this.ct = ct;
	}

	public double getPlanning() {
		return planning;
	}

	public void setPlanning(double planning) {
		this.planning = planning;
	}

	public double getQa() {
		return qa;
	}

	public void setQa(double qa) {
		this.qa = qa;
	}

	public double getImaging() {
		return imaging;
	}

	public void setImaging(double imaging) {
		this.imaging = imaging;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public double getTreatAmount() {
		return treatAmount;
	}

	public void setTreatAmount(double treatAmount) {
		this.treatAmount = treatAmount;
	}

	public double getFinalAmount() {
		return finalAmount;
	}

	public void setFinalAmount(double finalAmount) {
		this.finalAmount = finalAmount;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public List<RadiationDto> getLstradiationMaster() {
		return lstradiationMaster;
	}

	public void setLstradiationMaster(List<RadiationDto> lstradiationMaster) {
		this.lstradiationMaster = lstradiationMaster;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	

}
