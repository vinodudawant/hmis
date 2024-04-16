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
@Table(name = "ehat_radiation_treatment_prescription")
public class TreatmentPrescriptionDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "treatment_prescription_id")
	private int treatmentPrescriptionId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "x_1")
	private String isoLatX1;
	
	@Column(name = "x_2")
	private String isoLatX2;
	
	@Column(name = "x_3")
	private String isoLatX3;

	@Column(name = "y_1")
	private String isoLonY1;
	
	@Column(name = "y_2")
	private String isoLonY2;
	
	@Column(name = "y_3")
	private String isoLonY3;
	
	@Column(name = "z_1")
	private String isoVerZ1;
	
	@Column(name = "z_2")
	private String isoVerZ2;
	
	@Column(name = "z_3")
	private String isoVerZ3;	 
	
	@Column(name = "prescription")
	private String prescription;
	
	@Column(name = "primary_prescription")
	private String primary;
	
	@Column(name = "boost")
	private String boost;

	@Column(name = "treatment_modes")
	private String treatmentModeValues;
	
	@Column(name = "position_values")
	private String positionValues;
	
	@Column(name = "orientation_values")
	private String orientationValues;
	
	@Column(name = "base_plate_values")
	private String basePlateValues;
	
	@Column(name = "headrest_values")
	private String headRestValues;
	
	@Column(name = "immobilized_device_values")
	private String immobilizedDeviceValues;	 
	
	@Column(name = "bmc")
	private String bmcValues;
	
	@Column(name = "treatment_seperation_ap")
	private String treatmentSeperationAP;
	
	@Column(name = "treatment_seperation_lat")
	private String treatmentSeperationLat;
	
	@Column(name = "arm_position")
	private String armPosition;	
	
	@Column(name = "indexer_slot")
	private String indexerSlot;
	
	@Column(name = "headrest_no")
	private String headRestNo;
	
	@Column(name = "chain_distance")
	private String ssnToChainDistance;
	
	@Column(name = "intraoral_prosthesis")
	private String intraoralProsthesis;	
	
	@Column(name = "bladder_protocol")
	private String bladderProtocol;
	
	@Column(name = "chemotherapy")
	private String concChemotherapy;
	
	@Column(name = "breast_board")
	private String breastBoard;
	
	@Column(name = "bb_wedge_no")
	private String bbWedgeNo;
	
	@Column(name = "bb_slot_no")
	private String bbSlotNo;
	
	@Column(name = "shoulder_retractor")
	private String shoulderRetractor;
	
	@Column(name = "sr_slot_no")
	private String srSlotNo;
	
	@Column(name = "radiation_unit")
	private String radiationUnit;
	
	@Column(name = "provisional_dose")
	private String provisionalTotalDose;
	
	@Column(name = "phase1")
	private String phase1;	
	
	@Column(name = "phase2")
	private String phase2;
	
	@Column(name = "phase3")
	private String phase3;
	
	@Column(name = "provisional_time")
	private String provisionalOverallTime;
	
	@Column(name = "fractionation")
	private String fractionation;
	
	@Column(name = "brachytherapy")
	private String brachytherapy;
	
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
	private List<TreatmentPrescriptionDTO> setupList;

	public int getTreatmentPrescriptionId() {
		return treatmentPrescriptionId;
	}

	public void setTreatmentPrescriptionId(int treatmentPrescriptionId) {
		this.treatmentPrescriptionId = treatmentPrescriptionId;
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

	public String getIsoLatX1() {
		return isoLatX1;
	}

	public void setIsoLatX1(String isoLatX1) {
		this.isoLatX1 = isoLatX1;
	}

	public String getIsoLatX2() {
		return isoLatX2;
	}

	public void setIsoLatX2(String isoLatX2) {
		this.isoLatX2 = isoLatX2;
	}

	public String getIsoLatX3() {
		return isoLatX3;
	}

	public void setIsoLatX3(String isoLatX3) {
		this.isoLatX3 = isoLatX3;
	}

	public String getIsoLonY1() {
		return isoLonY1;
	}

	public void setIsoLonY1(String isoLonY1) {
		this.isoLonY1 = isoLonY1;
	}

	public String getIsoLonY2() {
		return isoLonY2;
	}

	public void setIsoLonY2(String isoLonY2) {
		this.isoLonY2 = isoLonY2;
	}

	public String getIsoLonY3() {
		return isoLonY3;
	}

	public void setIsoLonY3(String isoLonY3) {
		this.isoLonY3 = isoLonY3;
	}

	public String getIsoVerZ1() {
		return isoVerZ1;
	}

	public void setIsoVerZ1(String isoVerZ1) {
		this.isoVerZ1 = isoVerZ1;
	}

	public String getIsoVerZ2() {
		return isoVerZ2;
	}

	public void setIsoVerZ2(String isoVerZ2) {
		this.isoVerZ2 = isoVerZ2;
	}

	public String getIsoVerZ3() {
		return isoVerZ3;
	}

	public void setIsoVerZ3(String isoVerZ3) {
		this.isoVerZ3 = isoVerZ3;
	}

	public String getPrescription() {
		return prescription;
	}

	public void setPrescription(String prescription) {
		this.prescription = prescription;
	}

	public String getPrimary() {
		return primary;
	}

	public void setPrimary(String primary) {
		this.primary = primary;
	}

	public String getBoost() {
		return boost;
	}

	public void setBoost(String boost) {
		this.boost = boost;
	}

	public String getTreatmentModeValues() {
		return treatmentModeValues;
	}

	public void setTreatmentModeValues(String treatmentModeValues) {
		this.treatmentModeValues = treatmentModeValues;
	}

	public String getPositionValues() {
		return positionValues;
	}

	public void setPositionValues(String positionValues) {
		this.positionValues = positionValues;
	}

	public String getOrientationValues() {
		return orientationValues;
	}

	public void setOrientationValues(String orientationValues) {
		this.orientationValues = orientationValues;
	}

	public String getBasePlateValues() {
		return basePlateValues;
	}

	public void setBasePlateValues(String basePlateValues) {
		this.basePlateValues = basePlateValues;
	}

	public String getHeadRestValues() {
		return headRestValues;
	}

	public void setHeadRestValues(String headRestValues) {
		this.headRestValues = headRestValues;
	}

	public String getImmobilizedDeviceValues() {
		return immobilizedDeviceValues;
	}

	public void setImmobilizedDeviceValues(String immobilizedDeviceValues) {
		this.immobilizedDeviceValues = immobilizedDeviceValues;
	}

	public String getBmcValues() {
		return bmcValues;
	}

	public void setBmcValues(String bmcValues) {
		this.bmcValues = bmcValues;
	}

	public String getTreatmentSeperationAP() {
		return treatmentSeperationAP;
	}

	public void setTreatmentSeperationAP(String treatmentSeperationAP) {
		this.treatmentSeperationAP = treatmentSeperationAP;
	}

	public String getTreatmentSeperationLat() {
		return treatmentSeperationLat;
	}

	public void setTreatmentSeperationLat(String treatmentSeperationLat) {
		this.treatmentSeperationLat = treatmentSeperationLat;
	}

	public String getArmPosition() {
		return armPosition;
	}

	public void setArmPosition(String armPosition) {
		this.armPosition = armPosition;
	}

	public String getIndexerSlot() {
		return indexerSlot;
	}

	public void setIndexerSlot(String indexerSlot) {
		this.indexerSlot = indexerSlot;
	}

	public String getHeadRestNo() {
		return headRestNo;
	}

	public void setHeadRestNo(String headRestNo) {
		this.headRestNo = headRestNo;
	}

	public String getSsnToChainDistance() {
		return ssnToChainDistance;
	}

	public void setSsnToChainDistance(String ssnToChainDistance) {
		this.ssnToChainDistance = ssnToChainDistance;
	}

	public String getIntraoralProsthesis() {
		return intraoralProsthesis;
	}

	public void setIntraoralProsthesis(String intraoralProsthesis) {
		this.intraoralProsthesis = intraoralProsthesis;
	}

	public String getBladderProtocol() {
		return bladderProtocol;
	}

	public void setBladderProtocol(String bladderProtocol) {
		this.bladderProtocol = bladderProtocol;
	}

	public String getConcChemotherapy() {
		return concChemotherapy;
	}

	public void setConcChemotherapy(String concChemotherapy) {
		this.concChemotherapy = concChemotherapy;
	}

	public String getBreastBoard() {
		return breastBoard;
	}

	public void setBreastBoard(String breastBoard) {
		this.breastBoard = breastBoard;
	}

	public String getBbWedgeNo() {
		return bbWedgeNo;
	}

	public void setBbWedgeNo(String bbWedgeNo) {
		this.bbWedgeNo = bbWedgeNo;
	}

	public String getBbSlotNo() {
		return bbSlotNo;
	}

	public void setBbSlotNo(String bbSlotNo) {
		this.bbSlotNo = bbSlotNo;
	}

	public String getShoulderRetractor() {
		return shoulderRetractor;
	}

	public void setShoulderRetractor(String shoulderRetractor) {
		this.shoulderRetractor = shoulderRetractor;
	}

	public String getSrSlotNo() {
		return srSlotNo;
	}

	public void setSrSlotNo(String srSlotNo) {
		this.srSlotNo = srSlotNo;
	}

	public String getRadiationUnit() {
		return radiationUnit;
	}

	public void setRadiationUnit(String radiationUnit) {
		this.radiationUnit = radiationUnit;
	}

	public String getProvisionalTotalDose() {
		return provisionalTotalDose;
	}

	public void setProvisionalTotalDose(String provisionalTotalDose) {
		this.provisionalTotalDose = provisionalTotalDose;
	}

	public String getPhase1() {
		return phase1;
	}

	public void setPhase1(String phase1) {
		this.phase1 = phase1;
	}

	public String getPhase2() {
		return phase2;
	}

	public void setPhase2(String phase2) {
		this.phase2 = phase2;
	}

	public String getPhase3() {
		return phase3;
	}

	public void setPhase3(String phase3) {
		this.phase3 = phase3;
	}

	public String getProvisionalOverallTime() {
		return provisionalOverallTime;
	}

	public void setProvisionalOverallTime(String provisionalOverallTime) {
		this.provisionalOverallTime = provisionalOverallTime;
	}

	public String getFractionation() {
		return fractionation;
	}

	public void setFractionation(String fractionation) {
		this.fractionation = fractionation;
	}

	public String getBrachytherapy() {
		return brachytherapy;
	}

	public void setBrachytherapy(String brachytherapy) {
		this.brachytherapy = brachytherapy;
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

	public List<TreatmentPrescriptionDTO> getSetupList() {
		return setupList;
	}

	public void setSetupList(List<TreatmentPrescriptionDTO> setupList) {
		this.setupList = setupList;
	}
	
	
}
