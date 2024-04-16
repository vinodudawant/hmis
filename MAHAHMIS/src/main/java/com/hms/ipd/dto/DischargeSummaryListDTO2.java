package com.hms.ipd.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class DischargeSummaryListDTO2 implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer idplan;

	private String AlliedHelDelay;

	private String CareNurseHome;

	private String MedConsulDelay;

	private String Medication;
	private String OTAssesDate;

	private String OTRefDate;
	private String OtherHeltFacl;

	private String Pallative;
	private String PatWaitConsEquip;

	private String RefCommProvLate;
	private String Rehabilitation;

	private String TDLTime;
	
	
	
	private String Transport;
	private Integer added_by;

	private Date added_date;
	private String dateActualDischarge;

	private String dateAdmission;
	private String dateExpectedDischarge;

	private String dateSet;
	
	
	
	private String diagCapacity;
	private String dischargeCode;

	private String isInformed;
	private String isNewMedic;
	private String isOT;

	private String isOther;
	
	
	
	private String isOwnMedic;
	private String isPhysio;

	private String isSocialService;
	private String isTDL;
	private String isTransferLetter;

	private String isTransportAmb;
	
	
	private String isTransportAmbBooked;
	private String isTransportOwn;

	private String isTransportOwnBooked;
	private String otherAssesDate;
	private String otherRefDate;

	private String patient_id;
	
	
	
	
	private String physioAssesDate;
	private String physioRefDate;

	private String socialServiceAssesDate;
	private String socialServiceRefDate;
	private Integer treatment_id;

	private String transAmbArrvTime;
	
	
	private String transOwnArrvTime;
	private String transportArranged;

	private Integer unit_id;
	private Integer updated_by;
	private Date updated_date;

	private String waitMedRevDisc;
	private String waitTestRes;

	
	private String f_name;
	private String prefix;
	private String l_name;
	private String m_name;
	private Integer treatmentId;
	private Integer patientId;
	
	private List<DischargeSummaryListDTO2> listDischargeSummaryList;

	public Integer getIdplan() {
		return idplan;
	}

	public void setIdplan(Integer idplan) {
		this.idplan = idplan;
	}

	public String getAlliedHelDelay() {
		return AlliedHelDelay;
	}

	public void setAlliedHelDelay(String alliedHelDelay) {
		AlliedHelDelay = alliedHelDelay;
	}

	public String getCareNurseHome() {
		return CareNurseHome;
	}

	public void setCareNurseHome(String careNurseHome) {
		CareNurseHome = careNurseHome;
	}

	public String getMedConsulDelay() {
		return MedConsulDelay;
	}

	public void setMedConsulDelay(String medConsulDelay) {
		MedConsulDelay = medConsulDelay;
	}

	public String getMedication() {
		return Medication;
	}

	public void setMedication(String medication) {
		Medication = medication;
	}

	public String getOTAssesDate() {
		return OTAssesDate;
	}

	public void setOTAssesDate(String oTAssesDate) {
		OTAssesDate = oTAssesDate;
	}

	public String getOTRefDate() {
		return OTRefDate;
	}

	public void setOTRefDate(String oTRefDate) {
		OTRefDate = oTRefDate;
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

	public String getPatWaitConsEquip() {
		return PatWaitConsEquip;
	}

	public void setPatWaitConsEquip(String patWaitConsEquip) {
		PatWaitConsEquip = patWaitConsEquip;
	}

	public String getRefCommProvLate() {
		return RefCommProvLate;
	}

	public void setRefCommProvLate(String refCommProvLate) {
		RefCommProvLate = refCommProvLate;
	}

	public String getRehabilitation() {
		return Rehabilitation;
	}

	public void setRehabilitation(String rehabilitation) {
		Rehabilitation = rehabilitation;
	}

	public String getTDLTime() {
		return TDLTime;
	}

	public void setTDLTime(String tDLTime) {
		TDLTime = tDLTime;
	}

	public String getTransport() {
		return Transport;
	}

	public void setTransport(String transport) {
		Transport = transport;
	}

	public Integer getAdded_by() {
		return added_by;
	}

	public void setAdded_by(Integer added_by) {
		this.added_by = added_by;
	}

	public Date getAdded_date() {
		return added_date;
	}

	public void setAdded_date(Date added_date) {
		this.added_date = added_date;
	}

	public String getDateActualDischarge() {
		return dateActualDischarge;
	}

	public void setDateActualDischarge(String dateActualDischarge) {
		this.dateActualDischarge = dateActualDischarge;
	}

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

	public String getDiagCapacity() {
		return diagCapacity;
	}

	public void setDiagCapacity(String diagCapacity) {
		this.diagCapacity = diagCapacity;
	}

	public String getDischargeCode() {
		return dischargeCode;
	}

	public void setDischargeCode(String dischargeCode) {
		this.dischargeCode = dischargeCode;
	}

	public String getIsInformed() {
		return isInformed;
	}

	public void setIsInformed(String isInformed) {
		this.isInformed = isInformed;
	}

	public String getIsNewMedic() {
		return isNewMedic;
	}

	public void setIsNewMedic(String isNewMedic) {
		this.isNewMedic = isNewMedic;
	}

	public String getIsOT() {
		return isOT;
	}

	public void setIsOT(String isOT) {
		this.isOT = isOT;
	}

	public String getIsOther() {
		return isOther;
	}

	public void setIsOther(String isOther) {
		this.isOther = isOther;
	}

	public String getIsOwnMedic() {
		return isOwnMedic;
	}

	public void setIsOwnMedic(String isOwnMedic) {
		this.isOwnMedic = isOwnMedic;
	}

	public String getIsPhysio() {
		return isPhysio;
	}

	public void setIsPhysio(String isPhysio) {
		this.isPhysio = isPhysio;
	}

	public String getIsSocialService() {
		return isSocialService;
	}

	public void setIsSocialService(String isSocialService) {
		this.isSocialService = isSocialService;
	}

	public String getIsTDL() {
		return isTDL;
	}

	public void setIsTDL(String isTDL) {
		this.isTDL = isTDL;
	}

	public String getIsTransferLetter() {
		return isTransferLetter;
	}

	public void setIsTransferLetter(String isTransferLetter) {
		this.isTransferLetter = isTransferLetter;
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

	public String getIsTransportOwn() {
		return isTransportOwn;
	}

	public void setIsTransportOwn(String isTransportOwn) {
		this.isTransportOwn = isTransportOwn;
	}

	public String getIsTransportOwnBooked() {
		return isTransportOwnBooked;
	}

	public void setIsTransportOwnBooked(String isTransportOwnBooked) {
		this.isTransportOwnBooked = isTransportOwnBooked;
	}

	public String getOtherAssesDate() {
		return otherAssesDate;
	}

	public void setOtherAssesDate(String otherAssesDate) {
		this.otherAssesDate = otherAssesDate;
	}

	public String getOtherRefDate() {
		return otherRefDate;
	}

	public void setOtherRefDate(String otherRefDate) {
		this.otherRefDate = otherRefDate;
	}

	public String getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(String patient_id) {
		this.patient_id = patient_id;
	}

	public String getPhysioAssesDate() {
		return physioAssesDate;
	}

	public void setPhysioAssesDate(String physioAssesDate) {
		this.physioAssesDate = physioAssesDate;
	}

	public String getPhysioRefDate() {
		return physioRefDate;
	}

	public void setPhysioRefDate(String physioRefDate) {
		this.physioRefDate = physioRefDate;
	}

	public String getSocialServiceAssesDate() {
		return socialServiceAssesDate;
	}

	public void setSocialServiceAssesDate(String socialServiceAssesDate) {
		this.socialServiceAssesDate = socialServiceAssesDate;
	}

	public String getSocialServiceRefDate() {
		return socialServiceRefDate;
	}

	public void setSocialServiceRefDate(String socialServiceRefDate) {
		this.socialServiceRefDate = socialServiceRefDate;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getTransAmbArrvTime() {
		return transAmbArrvTime;
	}

	public void setTransAmbArrvTime(String transAmbArrvTime) {
		this.transAmbArrvTime = transAmbArrvTime;
	}

	public String getTransOwnArrvTime() {
		return transOwnArrvTime;
	}

	public void setTransOwnArrvTime(String transOwnArrvTime) {
		this.transOwnArrvTime = transOwnArrvTime;
	}

	public String getTransportArranged() {
		return transportArranged;
	}

	public void setTransportArranged(String transportArranged) {
		this.transportArranged = transportArranged;
	}

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}

	public Integer getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(Integer updated_by) {
		this.updated_by = updated_by;
	}

	public Date getUpdated_date() {
		return updated_date;
	}

	public void setUpdated_date(Date updated_date) {
		this.updated_date = updated_date;
	}

	public String getWaitMedRevDisc() {
		return waitMedRevDisc;
	}

	public void setWaitMedRevDisc(String waitMedRevDisc) {
		this.waitMedRevDisc = waitMedRevDisc;
	}

	public String getWaitTestRes() {
		return waitTestRes;
	}

	public void setWaitTestRes(String waitTestRes) {
		this.waitTestRes = waitTestRes;
	}

	public String getF_name() {
		return f_name;
	}

	public void setF_name(String f_name) {
		this.f_name = f_name;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getL_name() {
		return l_name;
	}

	public void setL_name(String l_name) {
		this.l_name = l_name;
	}

	public String getM_name() {
		return m_name;
	}

	public void setM_name(String m_name) {
		this.m_name = m_name;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public List<DischargeSummaryListDTO2> getListDischargeSummaryList() {
		return listDischargeSummaryList;
	}

	public void setListDischargeSummaryList(List<DischargeSummaryListDTO2> listDischargeSummaryList) {
		this.listDischargeSummaryList = listDischargeSummaryList;
	}
	
	
	
	

}
