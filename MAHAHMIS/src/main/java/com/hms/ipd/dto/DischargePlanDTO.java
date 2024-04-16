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

import com.hms.ehat.dto.nursingAsmentDataDTO;

@Entity
@Table(name ="IPD_DischargePlan")
public class DischargePlanDTO implements Serializable
{
	
	private static final long serialVersionUID = 1L; 
	
	@Id
	@GeneratedValue
	@Column(name = "idplan")
	private int idplan;
	
	@Column(name = "treatment_id")
	private int tId;
	
	/*
	 * @Column(name = "patient_id") 
	 * private int pId;*/
	
	@Column(name = "dateAdmission")
	private String dateAdmission;
	
	@Column(name = "dateExpectedDischarge")
	private String dateExpectedDischarge;
	
	@Column(name = "dateSet")
	private String dateSet;
	
	@Column(name = "isInformed")
	private String isInformed;
	
	@Column(name = "transportArranged")
	private String transportArranged;
	
	@Column(name = "transOwnArrvTime")
	private String transOwnArrvTime;
	
	@Column(name = "isTransportOwnBooked")
	private String isTransportOwnBooked;
	
	@Column(name = "isTransportOwn")
	private String isTransportOwn;

	@Column(name = "isTransportAmb")
	private String isTransportAmb;
	
	@Column(name = "isTransportAmbBooked")
	private String isTransportAmbBooked;
	
	@Column(name = "transAmbArrvTime")
	private String transAmbArrvTime;
	
	@Column(name = "isOwnMedic")
	private String isOwnMedic;
	
	@Column(name = "isNewMedic")
	private String isNewMedic;
	
	@Column(name = "isTransferLetter")
	private String isTransferLetter;
	
	@Column(name = "isSocialService")
	private String isSocialService;
	
	@Column(name = "socialServiceRefDate")
	private String socialServiceRefDate;
	
	@Column(name = "socialServiceAssesDate")
	private String socialServiceAssesDate;
	
	@Column(name = "isOT")
	private String isOT;
	
	@Column(name = "OTRefDate")
	private String OTRefDate;
	
	@Column(name = "OTAssesDate")
	private String OTAssesDate;
	
	@Column(name = "isPhysio")
	private String isPhysio;
	
	@Column(name = "physioRefDate")
	private String physioRefDate;
	
	@Column(name = "physioAssesDate")
	private String physioAssesDate;
	
	@Column(name = "isOther")
	private String isOther;
	
	@Column(name = "otherRefDate")
	private String otherRefDate;
	
	@Column(name = "otherAssesDate")
	private String otherAssesDate;
	
	@Column(name = "dateActualDischarge")
	private String dateActualDischarge;
	
	@Column(name = "dischargeCode")
	private String dischargeCode;
	
	@Column(name = "isTDL")
	private String isTDL;
	
	@Column(name = "TDLTime")
	private String TDLTime;
	
	@Column(name = "diagCapacity")
	private String diagCapacity;
	
	@Column(name = "waitTestRes")
	private String waitTestRes;
	
	@Column(name = "waitMedRevDisc")
	private String waitMedRevDisc;
	
	@Column(name = "MedConsulDelay")
	private String MedConsulDelay;
	
	@Column(name = "AlliedHelDelay")
	private String AlliedHelDelay;
	
	@Column(name = "RefCommProvLate")
	private String RefCommProvLate;
	
	@Column(name = "PatWaitConsEquip")
	private String PatWaitConsEquip;
	
	@Column(name = "Medication")
	private String Medication;
	
	@Column(name = "Transport")
	private String Transport;
	
	@Column(name = "OtherHeltFacl")
	private String OtherHeltFacl;
	
	@Column(name = "Pallative")
	private String Pallative;
	
	@Column(name = "Rehabilitation")
	private String Rehabilitation;
	
	@Column(name = "CareNurseHome")
	private String CareNurseHome;
	
	@Column(name = "unit_id")
	private int unitid;
	
	
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
	
	@Transient
	private List<DischargePlanDTO> plandatalist;
	
	@Transient
	private String patientName;
	
	
	

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public int getIdplan() {
		return idplan;
	}

	public void setIdplan(int idplan) {
		this.idplan = idplan;
	}

	public int gettId() {
		return tId;
	}

	public void settId(int tId) {
		this.tId = tId;
	}

	/*
	 * public int getpId() { return pId; }
	 * 
	 * public void setpId(int pId) { this.pId = pId; }
	 */
	public String getDateAdmission() {
		return dateAdmission;
	}

	public void setDateAdmission(String dateAdmission) {
		this.dateAdmission = dateAdmission;
	}

	public String getDateExpectedDischarge() {
		return dateExpectedDischarge;
	}

	public void setDateExpectedDischarge(String dateExpectedDischarge) {
		this.dateExpectedDischarge = dateExpectedDischarge;
	}

	public String getDateSet() {
		return dateSet;
	}

	public void setDateSet(String dateSet) {
		this.dateSet = dateSet;
	}

	public String getIsInformed() {
		return isInformed;
	}

	public void setIsInformed(String isInformed) {
		this.isInformed = isInformed;
	}

	public String getTransportArranged() {
		return transportArranged;
	}

	public void setTransportArranged(String transportArranged) {
		this.transportArranged = transportArranged;
	}

	public String getTransOwnArrvTime() {
		return transOwnArrvTime;
	}

	public void setTransOwnArrvTime(String transOwnArrvTime) {
		this.transOwnArrvTime = transOwnArrvTime;
	}

	public String getIsTransportOwnBooked() {
		return isTransportOwnBooked;
	}

	public void setIsTransportOwnBooked(String isTransportOwnBooked) {
		this.isTransportOwnBooked = isTransportOwnBooked;
	}

	public String getIsTransportOwn() {
		return isTransportOwn;
	}

	public void setIsTransportOwn(String isTransportOwn) {
		this.isTransportOwn = isTransportOwn;
	}

	public String getIsTransportAmb() {
		return isTransportAmb;
	}

	public void setIsTransportAmb(String isTransportAmb) {
		this.isTransportAmb = isTransportAmb;
	}

	public String getIsTransportAmbBooked() {
		return isTransportAmbBooked;
	}

	public void setIsTransportAmbBooked(String isTransportAmbBooked) {
		this.isTransportAmbBooked = isTransportAmbBooked;
	}

	public String getTransAmbArrvTime() {
		return transAmbArrvTime;
	}

	public void setTransAmbArrvTime(String transAmbArrvTime) {
		this.transAmbArrvTime = transAmbArrvTime;
	}

	public String getIsOwnMedic() {
		return isOwnMedic;
	}

	public void setIsOwnMedic(String isOwnMedic) {
		this.isOwnMedic = isOwnMedic;
	}

	public String getIsNewMedic() {
		return isNewMedic;
	}

	public void setIsNewMedic(String isNewMedic) {
		this.isNewMedic = isNewMedic;
	}

	public String getIsTransferLetter() {
		return isTransferLetter;
	}

	public void setIsTransferLetter(String isTransferLetter) {
		this.isTransferLetter = isTransferLetter;
	}

	public String getIsSocialService() {
		return isSocialService;
	}

	public void setIsSocialService(String isSocialService) {
		this.isSocialService = isSocialService;
	}

	public String getSocialServiceRefDate() {
		return socialServiceRefDate;
	}

	public void setSocialServiceRefDate(String socialServiceRefDate) {
		this.socialServiceRefDate = socialServiceRefDate;
	}

	public String getSocialServiceAssesDate() {
		return socialServiceAssesDate;
	}

	public void setSocialServiceAssesDate(String socialServiceAssesDate) {
		this.socialServiceAssesDate = socialServiceAssesDate;
	}

	public String getIsOT() {
		return isOT;
	}

	public void setIsOT(String isOT) {
		this.isOT = isOT;
	}

	public String getOTRefDate() {
		return OTRefDate;
	}

	public void setOTRefDate(String OTRefDate) {
		this.OTRefDate = OTRefDate;
	}

	public String getOTAssesDate() {
		return OTAssesDate;
	}

	public void setOTAssesDate(String OTAssesDate) {
		this.OTAssesDate = OTAssesDate;
	}

	public String getIsPhysio() {
		return isPhysio;
	}

	public void setIsPhysio(String isPhysio) {
		this.isPhysio = isPhysio;
	}

	public String getPhysioRefDate() {
		return physioRefDate;
	}

	public void setPhysioRefDate(String physioRefDate) {
		this.physioRefDate = physioRefDate;
	}

	public String getPhysioAssesDate() {
		return physioAssesDate;
	}

	public void setPhysioAssesDate(String physioAssesDate) {
		this.physioAssesDate = physioAssesDate;
	}

	public String getIsOther() {
		return isOther;
	}

	public void setIsOther(String isOther) {
		this.isOther = isOther;
	}

	public String getOtherRefDate() {
		return otherRefDate;
	}

	public void setOtherRefDate(String otherRefDate) {
		this.otherRefDate = otherRefDate;
	}

	public String getOtherAssesDate() {
		return otherAssesDate;
	}

	public void setOtherAssesDate(String otherAssesDate) {
		this.otherAssesDate = otherAssesDate;
	}

	public String getDateActualDischarge() {
		return dateActualDischarge;
	}

	public void setDateActualDischarge(String dateActualDischarge) {
		this.dateActualDischarge = dateActualDischarge;
	}

	public String getDischargeCode() {
		return dischargeCode;
	}

	public void setDischargeCode(String dischargeCode) {
		this.dischargeCode = dischargeCode;
	}

	public String getIsTDL() {
		return isTDL;
	}

	public void setIsTDL(String isTDL) {
		this.isTDL = isTDL;
	}

	public String getTDLTime() {
		return TDLTime;
	}

	public void setTDLTime(String TDLTime) {
		this.TDLTime = TDLTime;
	}

	public String getDiagCapacity() {
		return diagCapacity;
	}

	public void setDiagCapacity(String diagCapacity) {
		this.diagCapacity = diagCapacity;
	}

	public String getWaitTestRes() {
		return waitTestRes;
	}

	public void setWaitTestRes(String waitTestRes) {
		this.waitTestRes = waitTestRes;
	}

	public String getWaitMedRevDisc() {
		return waitMedRevDisc;
	}

	public void setWaitMedRevDisc(String waitMedRevDisc) {
		this.waitMedRevDisc = waitMedRevDisc;
	}

	public String getMedConsulDelay() {
		return MedConsulDelay;
	}

	public void setMedConsulDelay(String medConsulDelay) {
		MedConsulDelay = medConsulDelay;
	}

	public String getAlliedHelDelay() {
		return AlliedHelDelay;
	}

	public void setAlliedHelDelay(String alliedHelDelay) {
		AlliedHelDelay = alliedHelDelay;
	}

	public String getRefCommProvLate() {
		return RefCommProvLate;
	}

	public void setRefCommProvLate(String refCommProvLate) {
		RefCommProvLate = refCommProvLate;
	}

	public String getPatWaitConsEquip() {
		return PatWaitConsEquip;
	}

	public void setPatWaitConsEquip(String patWaitConsEquip) {
		PatWaitConsEquip = patWaitConsEquip;
	}

	public String getMedication() {
		return Medication;
	}

	public void setMedication(String medication) {
		Medication = medication;
	}

	public String getTransport() {
		return Transport;
	}

	public void setTransport(String transport) {
		Transport = transport;
	}

	public String getOtherHeltFacl() {
		return OtherHeltFacl;
	}

	public void setOtherHeltFacl(String otherHeltFacl) {
		OtherHeltFacl = otherHeltFacl;
	}

	public String getPallative() {
		return Pallative;
	}

	public void setPallative(String pallative) {
		Pallative = pallative;
	}

	public String getRehabilitation() {
		return Rehabilitation;
	}

	public void setRehabilitation(String rehabilitation) {
		Rehabilitation = rehabilitation;
	}

	public String getCareNurseHome() {
		return CareNurseHome;
	}

	public void setCareNurseHome(String careNurseHome) {
		CareNurseHome = careNurseHome;
	}

	public int getUnitid() {
		return unitid;
	}

	public void setUnitid(int unitid) {
		this.unitid = unitid;
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

	public List<DischargePlanDTO> getPlandatalist() {
		return plandatalist;
	}

	public void setPlandatalist(List<DischargePlanDTO> plandatalist) {
		this.plandatalist = plandatalist;
	}
	
	

}
