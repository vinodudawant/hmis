package com.hms.bloodbank.dto;

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

@Entity
@Table(name="bb_component_seperation")
public class ComponentSeperation implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer componentSeperationId;
	
	@Column(name = "donor_treatment_id")
	private Integer donorTreatmentId;
	
	@Column(name = "blood_bag_no")
	private Integer bloodBagNumber;
	
	@Column(name = "date_bag_collection")
	private String dateOfBagCollection;

	@Column(name = "component_name")
	private String componentName;

	@Column(name = "volume")
	private String volume;

	@Column(name = "expiry_date")
	private String expiryDate;
	
	@Column(name = "component_remark")
	private String componentRemark;

	@Column(name = "comp_stock_remark")
	private String compStockRemark;
	
	@Column(name = "blood_group")
	private String bloodGroup;

	/*@Column(name = "ffp_exp_date")
	private String ffpExpiryDate;

	@Column(name = "ffp_remark")
	private String ffpRemark;

	@Column(name = "rcell_volume")
	private String rCellVolume;

	@Column(name = "rcell_exp_date")
	private String rCellExpiryDate;

	@Column(name = "rcell_remark")
	private String rCellRemark;*/
	
	@Column(name = "remark")
	private String componentSeperationRemark;
	
	@Column(name = "blood_bag_status")
	private Integer bloodBagStatus=0;
	
	@Column(name = "date_stock_register")
	private String dateOfStockRegister;
	
	@Column(name = "inward_date")
	private String inwardDate;
	
	/*@Column(name = "ffp_inward_date")
	private String ffpInwardDate;

	@Column(name = "rcell_inward_date")
	private String rcellInwardDate;
*/
	@Column(name = "stock_register_remark")
	private String stockRegisterRemark;
	
	@Column(name = "date_stock_discard")
	private String dateOfStockDiscard;
	
	@Column(name = "plasma_discard_date")
	private String plasmaDiscardDate;
	
	@Column(name = "plasma_discard_reason")
	private String plasmaDiscardReason;

	@Column(name = "plasma_authorized_by")
	private String plasmaAuthorizedBy;

	@Column(name = "ffp_discard_date")
	private String ffpDiscardDate;
	
	@Column(name = "ffp_discard_reason")
	private String ffpDiscardReason;
	
	@Column(name = "ffp_authorized_by")
	private String ffpAuthorizedBy;

	@Column(name = "rcell_discard_date")
	private String rcellDiscardDate;

	@Column(name = "rcell_discard_reason")
	private String rcellDiscardReason;

	@Column(name = "rcell_authorized_by")
	private String rcellAuthorizedBy;

	@Column(name = "discard_remark")
	private String discardRemark;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	 // Added By Annapurna
	@Transient
	private String blood_bag_details; 
	
	@Transient
	private Integer bloodBagDetailsId;

	@Transient
	private String bloodBagDetails;


	public String getBloodBagDetails() {
		return bloodBagDetails;
	}

	public void setBloodBagDetails(String bloodBagDetails) {
		this.bloodBagDetails = bloodBagDetails;
	}

	public Integer getBloodBagDetailsId() {
		return bloodBagDetailsId;
	}

	public void setBloodBagDetailsId(Integer bloodBagDetailsId) {
		this.bloodBagDetailsId = bloodBagDetailsId;
	}

	public String getBloodGroupname() {
		return bloodGroupname;
	}

	public void setBloodGroupname(String bloodGroupname) {
		this.bloodGroupname = bloodGroupname;
	}

	@Transient
	private String bloodGroupname;

	

	public String getBlood_bag_details() {
		return blood_bag_details;
	}

	public void setBlood_bag_details(String blood_bag_details) {
		this.blood_bag_details = blood_bag_details;
	}

	// Added By Annapurna
	@Transient
	private Integer stockId;
	
	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	@Transient
	private String bagDetails;
	
	@Transient 
	private String donor_name;
	
	@Transient
	private Integer donor_id;
	
	@Transient
	private String bagname;
	
	@Transient
	private List<ComponentSeperation> lstComponentseperation;

	public Integer getComponentSeperationId() {
		return componentSeperationId;
	}

	public void setComponentSeperationId(Integer componentSeperationId) {
		this.componentSeperationId = componentSeperationId;
	}

	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	public Integer getBloodBagNumber() {
		return bloodBagNumber;
	}

	public void setBloodBagNumber(Integer bloodBagNumber) {
		this.bloodBagNumber = bloodBagNumber;
	}

	/*public String getPlasmaVolume() {
		return plasmaVolume;
	}

	public void setPlasmaVolume(String plasmaVolume) {
		this.plasmaVolume = plasmaVolume;
	}

	public String getPlasmaExpiryDate() {
		return plasmaExpiryDate;
	}

	public void setPlasmaExpiryDate(String plasmaExpiryDate) {
		this.plasmaExpiryDate = plasmaExpiryDate;
	}

	public String getPlasmaRemark() {
		return plasmaRemark;
	}

	public void setPlasmaRemark(String plasmaRemark) {
		this.plasmaRemark = plasmaRemark;
	}

	public String getFfpVolume() {
		return ffpVolume;
	}

	public void setFfpVolume(String ffpVolume) {
		this.ffpVolume = ffpVolume;
	}

	public String getFfpExpiryDate() {
		return ffpExpiryDate;
	}

	public void setFfpExpiryDate(String ffpExpiryDate) {
		this.ffpExpiryDate = ffpExpiryDate;
	}

	public String getFfpRemark() {
		return ffpRemark;
	}

	public void setFfpRemark(String ffpRemark) {
		this.ffpRemark = ffpRemark;
	}

	public String getrCellVolume() {
		return rCellVolume;
	}

	public void setrCellVolume(String rCellVolume) {
		this.rCellVolume = rCellVolume;
	}

	public String getrCellExpiryDate() {
		return rCellExpiryDate;
	}

	public void setrCellExpiryDate(String rCellExpiryDate) {
		this.rCellExpiryDate = rCellExpiryDate;
	}

	public String getrCellRemark() {
		return rCellRemark;
	}

	public void setrCellRemark(String rCellRemark) {
		this.rCellRemark = rCellRemark;
	}*/

	public String getComponentSeperationRemark() {
		return componentSeperationRemark;
	}

	public void setComponentSeperationRemark(String componentSeperationRemark) {
		this.componentSeperationRemark = componentSeperationRemark;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDateOfBagCollection() {
		return dateOfBagCollection;
	}

	public void setDateOfBagCollection(String dateOfBagCollection) {
		this.dateOfBagCollection = dateOfBagCollection;
	}

	public Integer getBloodBagStatus() {
		return bloodBagStatus;
	}

	public void setBloodBagStatus(Integer bloodBagStatus) {
		this.bloodBagStatus = bloodBagStatus;
	}

	

	public String getStockRegisterRemark() {
		return stockRegisterRemark;
	}

	public void setStockRegisterRemark(String stockRegisterRemark) {
		this.stockRegisterRemark = stockRegisterRemark;
	}

	public String getPlasmaDiscardDate() {
		return plasmaDiscardDate;
	}

	public void setPlasmaDiscardDate(String plasmaDiscardDate) {
		this.plasmaDiscardDate = plasmaDiscardDate;
	}

	public String getFfpDiscardDate() {
		return ffpDiscardDate;
	}

	public void setFfpDiscardDate(String ffpDiscardDate) {
		this.ffpDiscardDate = ffpDiscardDate;
	}

	public String getRcellDiscardDate() {
		return rcellDiscardDate;
	}

	public void setRcellDiscardDate(String rcellDiscardDate) {
		this.rcellDiscardDate = rcellDiscardDate;
	}

	public String getPlasmaDiscardReason() {
		return plasmaDiscardReason;
	}

	public void setPlasmaDiscardReason(String plasmaDiscardReason) {
		this.plasmaDiscardReason = plasmaDiscardReason;
	}

	public String getFfpDiscardReason() {
		return ffpDiscardReason;
	}

	public void setFfpDiscardReason(String ffpDiscardReason) {
		this.ffpDiscardReason = ffpDiscardReason;
	}

	public String getRcellDiscardReason() {
		return rcellDiscardReason;
	}

	public void setRcellDiscardReason(String rcellDiscardReason) {
		this.rcellDiscardReason = rcellDiscardReason;
	}

	public String getPlasmaAuthorizedBy() {
		return plasmaAuthorizedBy;
	}

	public void setPlasmaAuthorizedBy(String plasmaAuthorizedBy) {
		this.plasmaAuthorizedBy = plasmaAuthorizedBy;
	}

	public String getFfpAuthorizedBy() {
		return ffpAuthorizedBy;
	}

	public void setFfpAuthorizedBy(String ffpAuthorizedBy) {
		this.ffpAuthorizedBy = ffpAuthorizedBy;
	}

	public String getRcellAuthorizedBy() {
		return rcellAuthorizedBy;
	}

	public void setRcellAuthorizedBy(String rcellAuthorizedBy) {
		this.rcellAuthorizedBy = rcellAuthorizedBy;
	}

	public String getDiscardRemark() {
		return discardRemark;
	}

	public void setDiscardRemark(String discardRemark) {
		this.discardRemark = discardRemark;
	}

	public String getBagDetails() {
		return bagDetails;
	}

	public void setBagDetails(String bagDetails) {
		this.bagDetails = bagDetails;
	}

	public String getDateOfStockRegister() {
		return dateOfStockRegister;
	}

	public void setDateOfStockRegister(String dateOfStockRegister) {
		this.dateOfStockRegister = dateOfStockRegister;
	}

	public String getDateOfStockDiscard() {
		return dateOfStockDiscard;
	}

	public void setDateOfStockDiscard(String dateOfStockDiscard) {
		this.dateOfStockDiscard = dateOfStockDiscard;
	}

	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getComponentRemark() {
		return componentRemark;
	}

	public void setComponentRemark(String componentRemark) {
		this.componentRemark = componentRemark;
	}

	

	public String getInwardDate() {
		return inwardDate;
	}

	public void setInwardDate(String inwardDate) {
		this.inwardDate = inwardDate;
	}

	public List<ComponentSeperation> getLstComponentseperation() {
		return lstComponentseperation;
	}

	public void setLstComponentseperation(List<ComponentSeperation> lstComponentseperation) {
		this.lstComponentseperation = lstComponentseperation;
	}

	public String getCompStockRemark() {
		return compStockRemark;
	}

	public void setCompStockRemark(String compStockRemark) {
		this.compStockRemark = compStockRemark;
	}

	public String getDonor_name() {
		return donor_name;
	}

	public void setDonor_name(String donor_name) {
		this.donor_name = donor_name;
	}

	public Integer getDonor_id() {
		return donor_id;
	}

	public void setDonor_id(Integer donor_id) {
		this.donor_id = donor_id;
	}

	public String getBagname() {
		return bagname;
	}

	public void setBagname(String bagname) {
		this.bagname = bagname;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	@Override
	public String toString() {
		return "ComponentSeperation [componentSeperationId=" + componentSeperationId + ", donorTreatmentId="
				+ donorTreatmentId + ", bloodBagNumber=" + bloodBagNumber + ", dateOfBagCollection="
				+ dateOfBagCollection + ", componentName=" + componentName + ", volume=" + volume + ", expiryDate="
				+ expiryDate + ", componentRemark=" + componentRemark + ", compStockRemark=" + compStockRemark
				+ ", bloodGroup=" + bloodGroup + ", componentSeperationRemark=" + componentSeperationRemark
				+ ", bloodBagStatus=" + bloodBagStatus + ", dateOfStockRegister=" + dateOfStockRegister
				+ ", inwardDate=" + inwardDate + ", stockRegisterRemark=" + stockRegisterRemark
				+ ", dateOfStockDiscard=" + dateOfStockDiscard + ", plasmaDiscardDate=" + plasmaDiscardDate
				+ ", plasmaDiscardReason=" + plasmaDiscardReason + ", plasmaAuthorizedBy=" + plasmaAuthorizedBy
				+ ", ffpDiscardDate=" + ffpDiscardDate + ", ffpDiscardReason=" + ffpDiscardReason + ", ffpAuthorizedBy="
				+ ffpAuthorizedBy + ", rcellDiscardDate=" + rcellDiscardDate + ", rcellDiscardReason="
				+ rcellDiscardReason + ", rcellAuthorizedBy=" + rcellAuthorizedBy + ", discardRemark=" + discardRemark
				+ ", status=" + status + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deletedDateTime=" + deletedDateTime + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", stockId=" + stockId + ", bagDetails=" + bagDetails
				+ ", donor_name=" + donor_name + ", donor_id=" + donor_id + ", bagname=" + bagname
				+ ", lstComponentseperation=" + lstComponentseperation + "]";
	}

	
	
	

}
