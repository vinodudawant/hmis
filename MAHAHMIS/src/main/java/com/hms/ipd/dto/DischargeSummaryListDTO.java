package com.hms.ipd.dto;

import java.io.Serializable;
import java.util.List;

@SuppressWarnings("serial")
public class DischargeSummaryListDTO implements Serializable{

	private Integer IPDDischargePlanID;
	private Integer tid;
	private Integer unit_id;
	private String dateAdmission;
	private String dateExpectedDischarge;
	private String dateSet;
	private String isInformed;
	private String transportArranged;
	private String isInformedByPatient;
	private String isInformedByStaff;
	private String isTransportOwn;
	private String isTransportOwnBooked;
	private String transOwnArrvTime;
	private String isTransportAmb;
	private String isTransportAmbBooked;
	private String transAmbArrvTime;
	private String isOwnMedic;
	private String isNewMedic;
	private String isTransferLetter;
	private String isSocialService;
	private String socialServiceRefDate;
	private String socialServiceAssesDate;
	private String isOT;
	private String OTRefDate;
	private String OTAssesDate;
	private String isPhysio;
	private String physioRefDate;
	private String physioAssesDate;
	private String isOther;
	private String otherRefDate;
	private String otherAssesDate;
	private String dateActualDischarge;
	private String iddischarge_code;
	private String isTDL;
	private String TDLTime;
	private String diagCapacity;
	private String waitTestRes;
	private String waitMedRevDisc;
	private String MedConsulDelay;
	private String AlliedHelDelay;
	private String RefCommProvLate;
	private String PatWaitConsEquip;
	private String Medication;
	private String Transport;
	private String OtherHeltFacl;
	private String Pallative;
	private String Rehabilitation;
	private String CareNurseHome;
	private String status;
	private Integer patient_id;
	private String f_name;
	private String prefix;
	private String l_name;
	private String m_name;
	private Integer treatment_id;
	
	private Integer treatmentId;
	
	private Integer patientId;
	private List<DischargeSummaryListDTO> listDischargeSummaryList;
	
	
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
	public Integer getIPDDischargePlanID() {
		return IPDDischargePlanID;
	}
	public void setIPDDischargePlanID(Integer iPDDischargePlanID) {
		IPDDischargePlanID = iPDDischargePlanID;
	}
	public Integer getTid() {
		return tid;
	}
	public void setTid(Integer tid) {
		this.tid = tid;
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
	public String getIsInformedByPatient() {
		return isInformedByPatient;
	}
	public void setIsInformedByPatient(String isInformedByPatient) {
		this.isInformedByPatient = isInformedByPatient;
	}
	public String getIsInformedByStaff() {
		return isInformedByStaff;
	}
	public void setIsInformedByStaff(String isInformedByStaff) {
		this.isInformedByStaff = isInformedByStaff;
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
	public String getTransOwnArrvTime() {
		return transOwnArrvTime;
	}
	public void setTransOwnArrvTime(String transOwnArrvTime) {
		this.transOwnArrvTime = transOwnArrvTime;
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
	public void setOTRefDate(String oTRefDate) {
		OTRefDate = oTRefDate;
	}
	public String getOTAssesDate() {
		return OTAssesDate;
	}
	public void setOTAssesDate(String oTAssesDate) {
		OTAssesDate = oTAssesDate;
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
	public String getIddischarge_code() {
		return iddischarge_code;
	}
	public void setIddischarge_code(String iddischarge_code) {
		this.iddischarge_code = iddischarge_code;
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
	public void setTDLTime(String tDLTime) {
		TDLTime = tDLTime;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
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
	public Integer getTreatment_id() {
		return treatment_id;
	}
	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}
	public List<DischargeSummaryListDTO> getListDischargeSummaryList() {
		return listDischargeSummaryList;
	}
	public void setListDischargeSummaryList(List<DischargeSummaryListDTO> listDischargeSummaryList) {
		this.listDischargeSummaryList = listDischargeSummaryList;
	}
	public Integer getUnit_id() {
		return unit_id;
	}
	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}
	
	
}
