package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class IPDDischargePlanDTO {
	private int tid;
	private int IPDDischargePlanID;
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
	private int patientId;
	private String dischargeCodeID;
	private String dischargeCodeName;
	private List<IPDDischargePlanDTO> IPDDischargePlanDTOList;
	
	@JsonGetter("dischargeCodeName")
	public String getDischargeCodeName() {
		return dischargeCodeName;
	}
	
	@JsonSetter("dischargeCodeName")
	public void setDischargeCodeName(String dischargeCodeName) {
		this.dischargeCodeName = dischargeCodeName;
	}

	@JsonGetter("dischargeCodeID")
	public String getDischargeCodeID() {
		return dischargeCodeID;
	}
	
	@JsonSetter("dischargeCodeID")
	public void setDischargeCodeID(String dischargeCodeID) {
		this.dischargeCodeID = dischargeCodeID;
	}
	
	@JsonGetter("IPDDischargePlanDTOList")
	public List<IPDDischargePlanDTO> getIPDDischargePlanDTOList() {
		return IPDDischargePlanDTOList;
	}

	@JsonSetter("IPDDischargePlanDTOList")
	public void setIPDDischargePlanDTOList(
			List<IPDDischargePlanDTO> iPDDischargePlanDTOList) {
		IPDDischargePlanDTOList = iPDDischargePlanDTOList;
	}

	@JsonGetter("tid")
	public int getTid() {
		return tid;
	}
	
	@JsonSetter("tid")
	public void setTid(int tid) {
		this.tid = tid;
	}
	
	@JsonGetter("IPDDischargePlanID")
	public int getIPDDischargePlanID() {
		return IPDDischargePlanID;
	}

	@JsonSetter("IPDDischargePlanID")
	public void setIPDDischargePlanID(int iPDDischargePlanID) {
		IPDDischargePlanID = iPDDischargePlanID;
	}
	
	@JsonGetter("dateAdmission")
	public String getDateAdmission() {
		return dateAdmission;
	}

	@JsonSetter("dateAdmission")
	public void setDateAdmission(String dateAdmission) {
		this.dateAdmission = dateAdmission;
	}

	@JsonGetter("dateExpectedDischarge")
	public String getDateExpectedDischarge() {
		return dateExpectedDischarge;
	}

	@JsonSetter("dateExpectedDischarge")
	public void setDateExpectedDischarge(String dateExpectedDischarge) {
		this.dateExpectedDischarge = dateExpectedDischarge;
	}

	@JsonGetter("dateSet")
	public String getDateSet() {
		return dateSet;
	}

	@JsonSetter("dateSet")
	public void setDateSet(String dateSet) {
		this.dateSet = dateSet;
	}

	@JsonGetter("isInformed")
	public String getIsInformed() {
		return isInformed;
	}

	@JsonSetter("isInformed")
	public void setIsInformed(String isInformed) {
		this.isInformed = isInformed;
	}
	
	@JsonGetter("transportArranged")
	public String getTransportArranged() {
		return transportArranged;
	}

	@JsonSetter("transportArranged")
	public void setTransportArranged(String transportArranged) {
		this.transportArranged = transportArranged;
	}

	@JsonGetter("isInformedByPatient")
	public String getIsInformedByPatient() {
		return isInformedByPatient;
	}

	@JsonSetter("isInformedByPatient")
	public void setIsInformedByPatient(String isInformedByPatient) {
		this.isInformedByPatient = isInformedByPatient;
	}

	@JsonGetter("isInformedByStaff")
	public String getIsInformedByStaff() {
		return isInformedByStaff;
	}

	@JsonSetter("isInformedByStaff")
	public void setIsInformedByStaff(String isInformedByStaff) {
		this.isInformedByStaff = isInformedByStaff;
	}

	@JsonGetter("isTransportOwn")
	public String getIsTransportOwn() {
		return isTransportOwn;
	}

	@JsonSetter("isTransportOwn")
	public void setIsTransportOwn(String isTransportOwn) {
		this.isTransportOwn = isTransportOwn;
	}

	@JsonGetter("isTransportOwnBooked")
	public String getIsTransportOwnBooked() {
		return isTransportOwnBooked;
	}

	@JsonSetter("isTransportOwnBooked")
	public void setIsTransportOwnBooked(String isTransportOwnBooked) {
		this.isTransportOwnBooked = isTransportOwnBooked;
	}
	
	@JsonGetter("transOwnArrvTime")
	public String getTransOwnArrvTime() {
		return transOwnArrvTime;
	}

	@JsonSetter("transOwnArrvTime")
	public void setTransOwnArrvTime(String transOwnArrvTime) {
		this.transOwnArrvTime = transOwnArrvTime;
	}

	@JsonGetter("isTransportAmb")
	public String getIsTransportAmb() {
		return isTransportAmb;
	}

	@JsonSetter("isTransportAmb")
	public void setIsTransportAmb(String isTransportAmb) {
		this.isTransportAmb = isTransportAmb;
	}

	@JsonGetter("isTransportAmbBooked")
	public String getIsTransportAmbBooked() {
		return isTransportAmbBooked;
	}

	@JsonSetter("isTransportAmbBooked")
	public void setIsTransportAmbBooked(String isTransportAmbBooked) {
		this.isTransportAmbBooked = isTransportAmbBooked;
	}

	@JsonGetter("transAmbArrvTime")
	public String getTransAmbArrvTime() {
		return transAmbArrvTime;
	}

	@JsonSetter("transAmbArrvTime")
	public void setTransAmbArrvTime(String transAmbArrvTime) {
		this.transAmbArrvTime = transAmbArrvTime;
	}

	@JsonGetter("isOwnMedic")
	public String getIsOwnMedic() {
		return isOwnMedic;
	}

	@JsonSetter("isOwnMedic")
	public void setIsOwnMedic(String isOwnMedic) {
		this.isOwnMedic = isOwnMedic;
	}

	@JsonGetter("isNewMedic")
	public String getIsNewMedic() {
		return isNewMedic;
	}

	@JsonSetter("isNewMedic")
	public void setIsNewMedic(String isNewMedic) {
		this.isNewMedic = isNewMedic;
	}

	@JsonGetter("isTransferLetter")
	public String getIsTransferLetter() {
		return isTransferLetter;
	}

	@JsonSetter("isTransferLetter")
	public void setIsTransferLetter(String isTransferLetter) {
		this.isTransferLetter = isTransferLetter;
	}

	@JsonGetter("isSocialService")
	public String getIsSocialService() {
		return isSocialService;
	}

	@JsonSetter("isSocialService")
	public void setIsSocialService(String isSocialService) {
		this.isSocialService = isSocialService;
	}

	@JsonGetter("socialServiceRefDate")
	public String getSocialServiceRefDate() {
		return socialServiceRefDate;
	}

	@JsonSetter("socialServiceRefDate")
	public void setSocialServiceRefDate(String socialServiceRefDate) {
		this.socialServiceRefDate = socialServiceRefDate;
	}

	@JsonGetter("socialServiceAssesDate")
	public String getSocialServiceAssesDate() {
		return socialServiceAssesDate;
	}

	@JsonSetter("socialServiceAssesDate")
	public void setSocialServiceAssesDate(String socialServiceAssesDate) {
		this.socialServiceAssesDate = socialServiceAssesDate;
	}

	@JsonGetter("isOT")
	public String getIsOT() {
		return isOT;
	}

	@JsonSetter("isOT")
	public void setIsOT(String isOT) {
		this.isOT = isOT;
	}

	@JsonGetter("oTRefDate")
	public String getOTRefDate() {
		return OTRefDate;
	}

	@JsonSetter("oTRefDate")
	public void setOTRefDate(String oTRefDate) {
		OTRefDate = oTRefDate;
	}

	@JsonGetter("oTAssesDate")
	public String getOTAssesDate() {
		return OTAssesDate;
	}

	@JsonSetter("oTAssesDate")
	public void setOTAssesDate(String oTAssesDate) {
		OTAssesDate = oTAssesDate;
	}

	@JsonGetter("isPhysio")
	public String getIsPhysio() {
		return isPhysio;
	}

	@JsonSetter("isPhysio")
	public void setIsPhysio(String isPhysio) {
		this.isPhysio = isPhysio;
	}

	@JsonGetter("physioRefDate")
	public String getPhysioRefDate() {
		return physioRefDate;
	}

	@JsonSetter("physioRefDate")
	public void setPhysioRefDate(String physioRefDate) {
		this.physioRefDate = physioRefDate;
	}

	@JsonGetter("physioAssesDate")
	public String getPhysioAssesDate() {
		return physioAssesDate;
	}

	@JsonSetter("physioAssesDate")
	public void setPhysioAssesDate(String physioAssesDate) {
		this.physioAssesDate = physioAssesDate;
	}

	@JsonGetter("isOther")
	public String getIsOther() {
		return isOther;
	}

	@JsonSetter("isOther")
	public void setIsOther(String isOther) {
		this.isOther = isOther;
	}

	@JsonGetter("otherRefDate")
	public String getOtherRefDate() {
		return otherRefDate;
	}

	@JsonSetter("otherRefDate")
	public void setOtherRefDate(String otherRefDate) {
		this.otherRefDate = otherRefDate;
	}

	@JsonGetter("otherAssesDate")
	public String getOtherAssesDate() {
		return otherAssesDate;
	}

	@JsonSetter("otherAssesDate")
	public void setOtherAssesDate(String otherAssesDate) {
		this.otherAssesDate = otherAssesDate;
	}

	@JsonGetter("dateActualDischarge")
	public String getDateActualDischarge() {
		return dateActualDischarge;
	}

	@JsonSetter("dateActualDischarge")
	public void setDateActualDischarge(String dateActualDischarge) {
		this.dateActualDischarge = dateActualDischarge;
	}

	@JsonGetter("isTDL")
	public String getIsTDL() {
		return isTDL;
	}

	@JsonSetter("isTDL")
	public void setIsTDL(String isTDL) {
		this.isTDL = isTDL;
	}

	@JsonGetter("tDLTime")
	public String getTDLTime() {
		return TDLTime;
	}

	@JsonSetter("tDLTime")
	public void setTDLTime(String tDLTime) {
		TDLTime = tDLTime;
	}

	@JsonGetter("diagCapacity")
	public String getDiagCapacity() {
		return diagCapacity;
	}

	@JsonSetter("diagCapacity")
	public void setDiagCapacity(String diagCapacity) {
		this.diagCapacity = diagCapacity;
	}

	@JsonGetter("waitTestRes")
	public String getWaitTestRes() {
		return waitTestRes;
	}

	@JsonSetter("waitTestRes")
	public void setWaitTestRes(String waitTestRes) {
		this.waitTestRes = waitTestRes;
	}

	@JsonGetter("waitMedRevDisc")
	public String getWaitMedRevDisc() {
		return waitMedRevDisc;
	}

	@JsonSetter("waitMedRevDisc")
	public void setWaitMedRevDisc(String waitMedRevDisc) {
		this.waitMedRevDisc = waitMedRevDisc;
	}

	@JsonGetter("medConsulDelay")
	public String getMedConsulDelay() {
		return MedConsulDelay;
	}

	@JsonSetter("medConsulDelay")
	public void setMedConsulDelay(String medConsulDelay) {
		MedConsulDelay = medConsulDelay;
	}

	@JsonGetter("alliedHelDelay")
	public String getAlliedHelDelay() {
		return AlliedHelDelay;
	}

	@JsonSetter("alliedHelDelay")
	public void setAlliedHelDelay(String alliedHelDelay) {
		AlliedHelDelay = alliedHelDelay;
	}

	@JsonGetter("refCommProvLate")
	public String getRefCommProvLate() {
		return RefCommProvLate;
	}

	@JsonSetter("refCommProvLate")
	public void setRefCommProvLate(String refCommProvLate) {
		RefCommProvLate = refCommProvLate;
	}

	@JsonGetter("patWaitConsEquip")
	public String getPatWaitConsEquip() {
		return PatWaitConsEquip;
	}

	@JsonSetter("patWaitConsEquip")
	public void setPatWaitConsEquip(String patWaitConsEquip) {
		PatWaitConsEquip = patWaitConsEquip;
	}

	@JsonGetter("medication")
	public String getMedication() {
		return Medication;
	}

	@JsonSetter("medication")
	public void setMedication(String medication) {
		Medication = medication;
	}

	@JsonGetter("transport")
	public String getTransport() {
		return Transport;
	}

	@JsonSetter("transport")
	public void setTransport(String transport) {
		Transport = transport;
	}

	@JsonGetter("otherHeltFacl")
	public String getOtherHeltFacl() {
		return OtherHeltFacl;
	}

	@JsonSetter("otherHeltFacl")
	public void setOtherHeltFacl(String otherHeltFacl) {
		OtherHeltFacl = otherHeltFacl;
	}

	@JsonGetter("pallative")
	public String getPallative() {
		return Pallative;
	}

	@JsonSetter("pallative")
	public void setPallative(String pallative) {
		Pallative = pallative;
	}

	@JsonGetter("rehabilitation")
	public String getRehabilitation() {
		return Rehabilitation;
	}

	@JsonSetter("rehabilitation")
	public void setRehabilitation(String rehabilitation) {
		Rehabilitation = rehabilitation;
	}

	@JsonGetter("careNurseHome")
	public String getCareNurseHome() {
		return CareNurseHome;
	}

	@JsonSetter("careNurseHome")
	public void setCareNurseHome(String careNurseHome) {
		CareNurseHome = careNurseHome;
	}
	@JsonGetter("patId")
	public int getPatientId() {
		return patientId;
	}
	@JsonSetter("patId")
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

}
