package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_radiation_portal_verification")
public class PortalVerificationDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "portal_verification_id")
	private int portalVerificationId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "portal_date")
	private String portalDate;
	
	@Column(name = "image_ap")
	private String imageAP;
	
	@Column(name = "image_lat")
	private String imageLat;

	@Column(name = "kv_based")
	private String kvBased;
	
	@Column(name = "mv_based")
	private String mvBased;
	
	@Column(name = "error_x")
	private String errorX;
	
	@Column(name = "error_y")
	private String errorY;
	
	@Column(name = "error_z")
	private String errorZ;
	
	@Column(name = "correction_x")
	private String correctionX;
	
	@Column(name = "correction_y")
	private String correctionY;
	
	@Column(name = "correction_z")
	private String correctionZ;
	
	@Column(name = "rtt_sign")
	private String rttSign;
	
	@Column(name = "phy_sign")
	private String phySign;

	@Column(name = "added_by",updatable=false)
	private int addedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status ="Y";

	@Transient
	private List<PortalVerificationDTO> verificationList;

	public int getPortalVerificationId() {
		return portalVerificationId;
	}

	public void setPortalVerificationId(int portalVerificationId) {
		this.portalVerificationId = portalVerificationId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getPortalDate() {
		return portalDate;
	}

	public void setPortalDate(String portalDate) {
		this.portalDate = portalDate;
	}

	public String getImageAP() {
		return imageAP;
	}

	public void setImageAP(String imageAP) {
		this.imageAP = imageAP;
	}

	public String getImageLat() {
		return imageLat;
	}

	public void setImageLat(String imageLat) {
		this.imageLat = imageLat;
	}

	public String getKvBased() {
		return kvBased;
	}

	public void setKvBased(String kvBased) {
		this.kvBased = kvBased;
	}

	public String getMvBased() {
		return mvBased;
	}

	public void setMvBased(String mvBased) {
		this.mvBased = mvBased;
	}

	public String getErrorX() {
		return errorX;
	}

	public void setErrorX(String errorX) {
		this.errorX = errorX;
	}

	public String getErrorY() {
		return errorY;
	}

	public void setErrorY(String errorY) {
		this.errorY = errorY;
	}

	public String getErrorZ() {
		return errorZ;
	}

	public void setErrorZ(String errorZ) {
		this.errorZ = errorZ;
	}

	public String getCorrectionX() {
		return correctionX;
	}

	public void setCorrectionX(String correctionX) {
		this.correctionX = correctionX;
	}

	public String getCorrectionY() {
		return correctionY;
	}

	public void setCorrectionY(String correctionY) {
		this.correctionY = correctionY;
	}

	public String getCorrectionZ() {
		return correctionZ;
	}

	public void setCorrectionZ(String correctionZ) {
		this.correctionZ = correctionZ;
	}

	public String getRttSign() {
		return rttSign;
	}

	public void setRttSign(String rttSign) {
		this.rttSign = rttSign;
	}

	public String getPhySign() {
		return phySign;
	}

	public void setPhySign(String phySign) {
		this.phySign = phySign;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PortalVerificationDTO> getVerificationList() {
		return verificationList;
	}

	public void setVerificationList(List<PortalVerificationDTO> verificationList) {
		this.verificationList = verificationList;
	}
	
	
}
