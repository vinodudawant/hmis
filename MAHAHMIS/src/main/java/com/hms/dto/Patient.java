package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.Test;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ot.dto.ConductAnaesthesia;
import com.hms.ot.dto.Operation;
import com.hms.ot.dto.PreAnaesthetic;
import com.hms.ot.dto.TreatmentOperations;

public class Patient implements Serializable {

	private static final long serialVersionUID = 1L;
	private String drid;
	private int deptid;
	private int patient_ID;
	
	private String fName;
	private String mName;
	private String lName;
	private String age;
	private String sex;
	private String dob;

	private String nationality;
	private String passportNo;
	private String visa;
	private String religion;
	private String language;
	private String identity;
	private String identifnNo;
	private String occupation;
	private String education;
	private String annIncm;

	private String bloodGroup;
	private String mStatus;
	private String clinical_note;
	private String treatment;
	private String emergencyContactDetails;
//	private PatientAppointments objpa;
//	private TreatmentDoctors objTD;
//	private List<TreatmentDoctors> listTreDoc;
	
	//private TreatmentOperations objTO;
	private TreatmentBeds objTreatmentBeds;
//	private TreatmentNurses objTN;
//	private List<TreatmentNurses> objTNList;
	private String tendDate;
	private Doctor objDoc;
	private String regDate;
	private Hall objHall;
	private List<TreatmentTests> objTrtList;
//	private EchoStudy objEchoStudy;
	private Order_master objOrder_master;
	private String files_name;
	private String files_path;
	private String refByMob;
	private String casualityFag;

	// added new fileds
	private Double height;
	private String month;
	private String days;

	private int bmiBsaID;
	private Double headCIM;
	private Double bmi;
	private String bmiDate;
	private Double bsa;
	private String finalAgeInMonths;

	private String treatmentGiven;
	private String conditionAtDischarge;
	private String treatmentAdvisedAtDischarge;
	private String title;
	private String ageType;
	private String wtType;

	private String digno;
	private String remark;
	private String admit_under;
	private int sdiscount;
	private String sdiscountNm;
	private Operation objop;
	
	//private TreatmentOperations objtop;
	
	private List<TreatmentOperations> listTop;
	
	//private List<TreatmentOperations> listTop1;
	private BillMasterDto objBillMaster;

	private List<Treatment> litreatment;
	private String category;
	private String lastUpdated;
	private String firstUpdated;
	private String emailId;
	private String mrNo;
	private String transactional;
	private String promotional;

	private List<PreAnaesthetic> objPreList;
	private List<ConductAnaesthesia> objConductList;
	private List<PatientSponsredDetails> listPatientSponsredDetails;
//	private List<PatientOPD> objPatientOPDList;
	private List<IpdDoctors> objIPDDoctorList;
//	private List<ERInformerDetails> objPatientERList;
//	private List<IpdPatientRelativeDetails> objPatientIPDList;
//	private List<IpdEpisodeAndVisitDetails> objIPDOPDEpisdeVisitList;
//	private List<IPDDischargePlanDTO> objIPDDischargePlanDTOList;
//	private Radiology objradiology;
	private String msg;
//	private CustomizeTemplate objcusttemp;
	private String dignosisReqToCloseTreatmentFlag;
	private float totalPayble ;
	
	private int billid ;
	private int admitedDays;
	private String docName;
	private int sourceTypeId;
	private String sponsorName;
	private String bedNo;
	
	private String centerPatientId;
	
	@Transient
	private Integer PrevOperationCnt;
	
	@JsonGetter("centerPatientId")
	public String getCenterPatientId() {
		return centerPatientId;
	}
	@JsonGetter("centerPatientId")
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	private int countshedule ;//added by paras
	@JsonGetter("countshedule")
    public int getCountshedule() {
		return countshedule;
	}
	@JsonSetter("countshedule")
	public void setCountshedule(int countshedule) {
		this.countshedule = countshedule;
	}
	
	@JsonGetter("billid")
	public int getBillid() {
		return billid;
	}
	@JsonSetter("billid")
	public void setBillid(int billid) {
		this.billid = billid;
	}
	
	
	@JsonGetter("totalPayble")
	public float getTotalPayble() {
		return totalPayble;
	}
	@JsonSetter("totalPayble")
	public void setTotalPayble(float totalPayble) {
		this.totalPayble = totalPayble;
	}

	@JsonGetter("msg")
	public String getMsg() {
		return msg;
	}

	@JsonSetter("msg")
	public void setMsg(String msg) {
		this.msg = msg;
	}

	@JsonGetter("finalAgeInMonths")
	public String getFinalAgeInMonths() {
		return finalAgeInMonths;
	}

	@JsonSetter("finalAgeInMonths")
	public void setFinalAgeInMonths(String finalAgeInMonths) {
		this.finalAgeInMonths = finalAgeInMonths;
	}

	@JsonGetter("bmi")
	public Double getBmi() {
		return bmi;
	}

	@JsonSetter("bmi")
	public void setBmi(Double bmi) {
		this.bmi = bmi;
	}

	@JsonGetter("height")
	public Double getHeight() {
		return height;
	}

	@JsonSetter("height")
	public void setHeight(Double height) {
		this.height = height;
	}

	@JsonGetter("month")
	public String getMonth() {
		return month;
	}

	@JsonSetter("month")
	public void setMonth(String month) {
		this.month = month;
	}

	@JsonGetter("days")
	public String getDays() {
		return days;
	}

	@JsonSetter("days")
	public void setDays(String days) {
		this.days = days;
	}

	@JsonGetter("headCIM")
	public Double getHeadCIM() {
		return headCIM;
	}

	@JsonSetter("headCIM")
	public void setHeadCIM(Double headCIM) {
		this.headCIM = headCIM;
	}

//	public Radiology getObjradiology() {
//		return objradiology;
//	}
//
//	public void setObjradiology(Radiology objradiology) {
//		this.objradiology = objradiology;
//	}

	
	//TreatmentOperations objTreatmentOperations = new TreatmentOperations();

//	@JsonGetter("objtrop")
//	public TreatmentOperations getObjTreatmentOperations() {
//		return objTreatmentOperations;
//	}
//
//	@JsonSetter("objtrop")
//	public void setObjTreatmentOperations(
//			TreatmentOperations objTreatmentOperations) {
//		this.objTreatmentOperations = objTreatmentOperations;
//	}

//	@JsonGetter("PatientOPDList")
//	public List<PatientOPD> getObjPatientOPDList() {
//		return objPatientOPDList;
//	}
//
//	@JsonSetter("PatientOPDList")
//	public void setObjPatientOPDList(List<PatientOPD> objPatientOPDList) {
//		this.objPatientOPDList = objPatientOPDList;
//	}
//
//	@JsonGetter("PatientERList")
//	public List<ERInformerDetails> getObjPatientERList() {
//		return objPatientERList;
//	}
//
//	@JsonSetter("PatientERList")
//	public void setObjPatientERList(List<ERInformerDetails> objPatientERList) {
//		this.objPatientERList = objPatientERList;
//	}
//
//	@JsonGetter("PatientIPDList")
//	public List<IpdPatientRelativeDetails> getObjPatientIPDList() {
//		return objPatientIPDList;
//	}
//
//	@JsonSetter("PatientIPDList")
//	public void setObjPatientIPDList(
//			List<IpdPatientRelativeDetails> objPatientIPDList) {
//		this.objPatientIPDList = objPatientIPDList;
//	}
//
//	@JsonGetter("EpisdeVisitList")
//	public List<IpdEpisodeAndVisitDetails> getObjIPDOPDEpisdeVisitList() {
//		return objIPDOPDEpisdeVisitList;
//	}
//
//	@JsonSetter("EpisdeVisitList")
//	public void setObjIPDOPDEpisdeVisitList(
//			List<IpdEpisodeAndVisitDetails> objIPDOPDEpisdeVisitList) {
//		this.objIPDOPDEpisdeVisitList = objIPDOPDEpisdeVisitList;
//	}
//
	@JsonGetter("liSponser")
	public List<PatientSponsredDetails> getListPatientSponsredDetails() {
		return listPatientSponsredDetails;
	}

	@JsonSetter("liSponser")
	public void setListPatientSponsredDetails(
			List<PatientSponsredDetails> listPatientSponsredDetails) {
		this.listPatientSponsredDetails = listPatientSponsredDetails;
	}

	@JsonGetter("mrNo")
	public String getMrNo() {
		return mrNo;
	}

	@JsonSetter("mrNo")
	public void setMrNo(String mrNo) {
		this.mrNo = mrNo;
	}

	@JsonGetter("conductlist")
	public List<ConductAnaesthesia> getObjConductList() {
		return objConductList;
	}

	@JsonSetter("conductlist")
	public void setObjConductList(List<ConductAnaesthesia> objConductList) {
		this.objConductList = objConductList;
	}

	@JsonGetter("prelist")
	public List<PreAnaesthetic> getObjPreList() {
		return objPreList;
	}

	@JsonSetter("prelist")
	public void setObjPreList(List<PreAnaesthetic> objPreList) {
		this.objPreList = objPreList;
	}
//
//	private List<HaemodialysisFlowChartMaster> listhaemoDylasis;
//
//	@JsonGetter("haemDyLi")
//	public List<HaemodialysisFlowChartMaster> getListhaemoDylasis() {
//		return listhaemoDylasis;
//	}
//
//	public void setListhaemoDylasis(
//			List<HaemodialysisFlowChartMaster> listhaemoDylasis) {
//		this.listhaemoDylasis = listhaemoDylasis;
//	}
//
//	private HospitalDetails hospitalDetails;
//
//	@JsonGetter("hospDetails")
//	public HospitalDetails getHospitalDetails() {
//		return hospitalDetails;
//	}
//
//	@JsonSetter("hospDetails")
//	public void setHospitalDetails(HospitalDetails objHospitalDetails) {
//		this.hospitalDetails = objHospitalDetails;
//	}

	@JsonGetter("emailId")
	public String getEmailId() {
		return emailId;
	}

	@JsonSetter("emailId")
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	private String hospType;

	@JsonGetter("firstupdate")
	public String getFirstUpdated() {
		return firstUpdated;
	}

	@JsonSetter("firstupdate")
	public void setFirstUpdated(String firstUpdated) {
		this.firstUpdated = firstUpdated;
	}

	@JsonGetter("lastupdate")
	public String getLastUpdated() {
		return lastUpdated;
	}

	@JsonSetter("lastupdate")
	public void setLastUpdated(String lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	@JsonGetter("lit")
	public List<Treatment> getLitreatment() {
		return litreatment;
	}

	@JsonSetter("lit")
	public void setLitreatment(List<Treatment> litreatment) {
		this.litreatment = litreatment;
	}

//	@JsonGetter("liTD")
//	public List<TreatmentDoctors> getListTreDoc() {
//		return listTreDoc;
//	}
//
//	@JsonSetter("liTD")
//	public void setListTreDoc(List<TreatmentDoctors> listTreDoc) {
//		this.listTreDoc = listTreDoc;
//	}

	@JsonGetter("objBillMaster")
	public BillMasterDto getObjBillMaster() {
		return objBillMaster;
	}

	@JsonSetter("objBillMaster")
	public void setObjBillMaster(BillMasterDto objBillMaster) {
		this.objBillMaster = objBillMaster;
	}

	private List<BillMasterDto> billMasterList;

	@JsonGetter("liBM")
	public List<BillMasterDto> getBillMasterList() {
		return billMasterList;
	}

	@JsonSetter("liBM")
	public void setBillMasterList(List<BillMasterDto> billMasterList) {
		this.billMasterList = billMasterList;
	}

	private String firNo;

	@JsonGetter("firNo")
	public String getFirNo() {
		return firNo;
	}

	@JsonSetter("firNo")
	public void setFirNo(String firNo) {
		this.firNo = firNo;
	}

	@JsonGetter("casflg")
	public String getCasualityFag() {
		return casualityFag;
	}

	@JsonSetter("casflg")
	public void setCasualityFag(String casualityFag) {
		this.casualityFag = casualityFag;
	}

	@JsonGetter("op")
	public Operation getObjop() {
		return objop;
	}

	@JsonSetter("op")
	public void setObjop(Operation objop) {
		this.objop = objop;
	}

//	@JsonGetter("top")
//	public TreatmentOperations getObjtop() {
//		return objtop;
//	}
//
//	@JsonSetter("top")
//	public void setObjtop(TreatmentOperations objtop) {
//		this.objtop = objtop;
//	}

	@JsonGetter("objTreBed")
	public TreatmentBeds getObjTreatmentBeds() {
		return objTreatmentBeds;
	}

	@JsonSetter("objTreBed")
	public void setObjTreatmentBeds(TreatmentBeds objTreatmentBeds) {
	this.objTreatmentBeds = objTreatmentBeds;
	}

	
	@JsonGetter("sdiscNm")
	public String getSdiscountNm() {
		return sdiscountNm;
	}

	@JsonSetter("sdiscNm")
	public void setSdiscountNm(String sdiscountNm) {
		this.sdiscountNm = sdiscountNm;
	}

	@JsonGetter("sdisc")
	public int getSdiscount() {
		return sdiscount;
	}

	@JsonSetter("sdisc")
	public void setSdiscount(int sdiscount) {
		this.sdiscount = sdiscount;
	}

	@JsonGetter("admit")
	public String getAdmit_under() {
		return admit_under;
	}

	@JsonSetter("admit")
	public void setAdmit_under(String admit_under) {
		this.admit_under = admit_under;
	}

	@JsonGetter("digno")
	public String getDigno() {
		return digno;
	}

	@JsonSetter("digno")
	public void setDigno(String digno) {
		this.digno = digno;
	}

	@JsonGetter("remark")
	public String getRemark() {
		return remark;
	}

	@JsonSetter("remark")
	public void setRemark(String remark) {
		this.remark = remark;
	}

	@JsonGetter("tit")
	public String getTitle() {
		return title;
	}

	@JsonSetter("tit")
	public void setTitle(String title) {
		this.title = title;
	}

	@JsonGetter("agtp")
	public String getAgeType() {
		return ageType;
	}

	@JsonSetter("agtp")
	public void setAgeType(String ageType) {
		this.ageType = ageType;
	}

	@JsonGetter("wttp")
	public String getWtType() {
		return wtType;
	}

	@JsonSetter("wttp")
	public void setWtType(String wtType) {
		this.wtType = wtType;
	}

	private List<Order_comp_stat> ocsList;

	@JsonGetter("refByMo")
	public String getRefByMob() {
		return refByMob;
	}

	@JsonSetter("refByMo")
	public void setRefByMob(String refByMob) {
		this.refByMob = refByMob;
	}

	@JsonGetter("treatmentGiven")
	public String getTreatmentGiven() {
		return treatmentGiven;
	}

	@JsonSetter("treatmentGiven")
	public void setTreatmentGiven(String treatmentGiven) {
		this.treatmentGiven = treatmentGiven;
	}

	@JsonGetter("conditionAtDischarge")
	public String getConditionAtDischarge() {
		return conditionAtDischarge;
	}

	@JsonSetter("conditionAtDischarge")
	public void setConditionAtDischarge(String conditionAtDischarge) {
		this.conditionAtDischarge = conditionAtDischarge;
	}

	@JsonGetter("treatmentAdvisedAtDischarge")
	public String getTreatmentAdvisedAtDischarge() {
		return treatmentAdvisedAtDischarge;
	}

	@JsonSetter("treatmentAdvisedAtDischarge")
	public void setTreatmentAdvisedAtDischarge(
			String treatmentAdvisedAtDischarge) {
		this.treatmentAdvisedAtDischarge = treatmentAdvisedAtDischarge;
	}

	@JsonGetter("files_name")
	public String getFiles_name() {
		return files_name;
	}

	@JsonSetter("files_name")
	public void setFiles_name(String files_name) {
		this.files_name = files_name;
	}

	@JsonGetter("files_path")
	public String getFiles_path() {
		return files_path;
	}

	@JsonSetter("files_path")
	public void setFiles_path(String files_path) {
		this.files_path = files_path;
	}

	@JsonGetter("objom")
	public Order_master getObjOrder_master() {
		return objOrder_master;
	}

	@JsonSetter("objom")
	public void setObjOrder_master(Order_master objOrder_master) {
		this.objOrder_master = objOrder_master;
	}

	@JsonGetter("treEnd")
	public String getTendDate() {
		return tendDate;
	}

	@JsonSetter("treEnd")
	public void setTendDate(String tendDate) {
		this.tendDate = tendDate;
	}

//	public EchoStudy getObjEchoStudy() {
//		return objEchoStudy;
//	}
//
//	public void setObjEchoStudy(EchoStudy objEchoStudy) {
//		this.objEchoStudy = objEchoStudy;
//	}

	@JsonGetter("objHall")
	public Hall getObjHall() {
		return objHall;
	}

	@JsonSetter("objHall")
	public void setObjHall(Hall objHall) {
		this.objHall = objHall;
	}

	private TreatmentTests objTT;
	private Test objTest;

	@JsonGetter("objTest")
	public Test getObjTest() {
		return objTest;
	}

	@JsonSetter("objTest")
	public void setObjTest(Test objTest) {
		this.objTest = objTest;
	}

	private Order_comp_druges objOrder_comp_druges;

	@JsonSetter("objOrder_comp_druges")
	public void setObjOrder_comp_druges(Order_comp_druges objOrder_comp_druges) {
		this.objOrder_comp_druges = objOrder_comp_druges;
	}

	@JsonGetter("objOrder_comp_druges")
	public Order_comp_druges getObjOrder_comp_druges() {
		return objOrder_comp_druges;
	}

	@JsonGetter("objTT")
	public TreatmentTests getObjTT() {
		return objTT;
	}

	@JsonSetter("objTT")
	public void setObjTT(TreatmentTests objTT) {
		this.objTT = objTT;
	}

	@JsonGetter("objDoc")
	public Doctor getObjDoc() {
		return objDoc;
	}

	@JsonSetter("objDoc")
	public void setObjDoc(Doctor objDoc) {
		this.objDoc = objDoc;
	}

	Treatment objTreatment = new Treatment();

	@JsonGetter("liT")
	public List<Test> getTrTest() {
		return trTest;
	}

	@JsonSetter("liT")
	public void setTrTest(List<Test> liToAdd) {
		this.trTest = liToAdd;
	}

	private List<Test> trTest = null;
	private List<Order_comp_druges> listOrder_comp_druges = null;

	@JsonSetter("liOrdCdrugs")
	public void setListOrder_comp_druges(
			List<Order_comp_druges> listOrder_comp_druges) {
		this.listOrder_comp_druges = listOrder_comp_druges;
	}

	@JsonGetter("liOrdCdrugs")
	public List<Order_comp_druges> getListOrder_comp_druges() {
		return listOrder_comp_druges;
	}

	/**
	 * @return the objTreatment
	 */
	@JsonGetter("objTreat")
	public Treatment getObjTreatment() {
		return objTreatment;
	}

	/**
	 * @param objTreatment
	 *            the objTreatment to set
	 */
	@JsonSetter("objTreat")
	public void setObjTreatment(Treatment objTreatment) {
		this.objTreatment = objTreatment;
	}

//	@JsonGetter("obTO")
//	public TreatmentOperations getObjTO() {
//		return objTO;
//	}
//
//	@JsonSetter("obTO")
//	public void setObjTO(TreatmentOperations objTO) {
//		this.objTO = objTO;
//	}

	/**
	 * @return the objTR
	 */
//	@JsonGetter("otd")
//	public TreatmentDoctors getObjTD() {
//		return objTD;
//	}
//
//	/**
//	 * @param objTR
//	 *            the objTR to set
//	 */
//	@JsonSetter("otd")
//	public void setObjTD(TreatmentDoctors objTD) {
//		this.objTD = objTD;
//	}
//
//	/**
//	 * @return the objpa
//	 */
//	@JsonGetter("opa")
//	public PatientAppointments getObjpa() {
//		return objpa;
//	}
//
//	/**
//	 * @param objpa
//	 *            the objpa to set
//	 */
//	@JsonSetter("opa")
//	public void setObjpa(PatientAppointments objpa) {
//		this.objpa = objpa;
//	}

	@JsonGetter("sym")
	public String getSymptoms() {
		return symptoms;
	}

	@JsonSetter("sym")
	public void setSymptoms(String symptoms) {
		this.symptoms = symptoms;
	}

	private String mobile;
	private String postalCode;
	private String homeNumber;
	private String officeNumber;
	private String addressLine1;
	private String addressLine2;
	private String addressLine3;
	private String addressLine4;
	private String addressLine5;
	private String addressLine6;
	private String addressLine10;
	private String relative_name;
	private String img;
	private String refby;
	private String refto;
	private String weight;
	private String symptoms;
	private int treatment_id;
	private TreatMentBeds objtreatmentbeds;
	private Beds objBeds;
	private String PatientType;

	private String cityAddress;
	private String talukaAddress;
	private String districtAddress;
	private String stateAddress;
	private String IdCountryAddress;

	@JsonGetter("city")
	public String getCityAddress() {
		return cityAddress;
	}

	@JsonSetter("city")
	public void setCityAddress(String cityAddress) {
		this.cityAddress = cityAddress;
	}

	@JsonGetter("taluka")
	public String getTalukaAddress() {
		return talukaAddress;
	}

	@JsonSetter("taluka")
	public void setTalukaAddress(String talukaAddress) {
		this.talukaAddress = talukaAddress;
	}

	@JsonGetter("district")
	public String getDistrictAddress() {
		return districtAddress;
	}

	@JsonSetter("district")
	public void setDistrictAddress(String districtAddress) {
		this.districtAddress = districtAddress;
	}

	@JsonGetter("state")
	public String getStateAddress() {
		return stateAddress;
	}

	@JsonSetter("state")
	public void setStateAddress(String stateAddress) {
		this.stateAddress = stateAddress;
	}

	@JsonGetter("country")
	public String getIdCountryAddress() {
		return IdCountryAddress;
	}

	@JsonSetter("country")
	public void setIdCountryAddress(String idCountryAddress) {
		IdCountryAddress = idCountryAddress;
	}

	// permanent Address
	private String perAddressLine1;
	private String perAddressLine2;
	private String perAddressLine3;
	private String perAddressLine4;
	private String perAddressLine5;
	private String perAddressLine6;
	private String perAddressLine7;
	private String perAddressLine8;
	private int permanentAddressFlag;

	@JsonGetter("postalCode")
	public String getPostalCode() {
		return postalCode;
	}

	@JsonSetter("postalCode")
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	@JsonGetter("homeNumber")
	public String getHomeNumber() {
		return homeNumber;
	}

	@JsonSetter("homeNumber")
	public void setHomeNumber(String homeNumber) {
		this.homeNumber = homeNumber;
	}

	@JsonGetter("perAddFlag")
	public int getPermanentAddressFlag() {
		return permanentAddressFlag;
	}

	@JsonSetter("perAddFlag")
	public void setPermanentAddressFlag(int permanentAddressFlag) {
		this.permanentAddressFlag = permanentAddressFlag;
	}

	@JsonGetter("perAdd1")
	public String getPerAddressLine1() {
		return perAddressLine1;
	}

	@JsonSetter("perAdd1")
	public void setPerAddressLine1(String perAddressLine1) {
		this.perAddressLine1 = perAddressLine1;
	}

	@JsonGetter("perAdd2")
	public String getPerAddressLine2() {
		return perAddressLine2;
	}

	@JsonSetter("perAdd2")
	public void setPerAddressLine2(String perAddressLine2) {
		this.perAddressLine2 = perAddressLine2;
	}

	@JsonGetter("perAdd3")
	public String getPerAddressLine3() {
		return perAddressLine3;
	}

	@JsonSetter("perAdd3")
	public void setPerAddressLine3(String perAddressLine3) {
		this.perAddressLine3 = perAddressLine3;
	}

	@JsonGetter("perAdd4")
	public String getPerAddressLine4() {
		return perAddressLine4;
	}

	@JsonSetter("perAdd4")
	public void setPerAddressLine4(String perAddressLine4) {
		this.perAddressLine4 = perAddressLine4;
	}

	@JsonGetter("perAdd5")
	public String getPerAddressLine5() {
		return perAddressLine5;
	}

	@JsonSetter("perAdd5")
	public void setPerAddressLine5(String perAddressLine5) {
		this.perAddressLine5 = perAddressLine5;
	}

	@JsonGetter("perAdd6")
	public String getPerAddressLine6() {
		return perAddressLine6;
	}

	@JsonSetter("perAdd6")
	public void setPerAddressLine6(String perAddressLine6) {
		this.perAddressLine6 = perAddressLine6;
	}

	@JsonGetter("perAdd8")
	public String getPerAddressLine8() {
		return perAddressLine8;
	}

	@JsonSetter("perAdd8")
	public void setPerAddressLine8(String perAddressLine8) {
		this.perAddressLine8 = perAddressLine8;
	}

	@JsonGetter("oBed")
	public Beds getObjBeds() {
		return objBeds;
	}

	@JsonSetter("oBed")
	public void setObjBeds(Beds objBeds) {
		this.objBeds = objBeds;
	}

	@JsonGetter("otrBed")
	public TreatMentBeds getObjtreatmentbeds() {
		return objtreatmentbeds;
	}

	@JsonSetter("otrBed")
	public void setObjtreatmentbeds(TreatMentBeds objtreatmentbeds) {
		this.objtreatmentbeds = objtreatmentbeds;
	}

	/**
	 * @return the treatment_id
	 */
	@JsonGetter("trid")
	public int getTreatment_id() {
		return treatment_id;
	}

	/**
	 * @param treatment_id
	 *            the treatment_id to set
	 */
	@JsonSetter("trid")
	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}

	/**
	 * @return the treatment_ID
	 */

	@JsonGetter("rb")
	public String getRefby() {
		return refby;
	}

	@JsonSetter("rb")
	public void setRefby(String refby) {
		this.refby = refby;
	}

	@JsonGetter("rt")
	public String getRefto() {
		return refto;
	}

	@JsonSetter("rt")
	public void setRefto(String refto) {
		this.refto = refto;
	}

	@JsonGetter("wt")
	public String getWeight() {
		return weight;
	}

	@JsonSetter("wt")
	public void setWeight(String weight) {
		this.weight = weight;
	}

	private List<Patient> patientList = null;

	public Patient() {
	}

	public Patient(int patient_ID, String addressLine1, String addressLine2,
			String addressLine3, String age, String bloodGroup, String dob,
			String emergencyContactDetails, String name, String name2,
			String name3, String status, String mobile, String officeNumber,
			String relative_name, String img, String sex, String refby,
			String refto, String weight, String symptoms, String PatientType, String centerPatientId) {

		this.patient_ID = patient_ID;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.addressLine3 = addressLine3;
		this.age = age;
		this.bloodGroup = bloodGroup;
		this.dob = dob;
		this.emergencyContactDetails = emergencyContactDetails;
		this.fName = name;
		this.lName = name2;
		this.mName = name3;
		this.mStatus = status;
		this.mobile = mobile;
		this.officeNumber = officeNumber;
		this.relative_name = relative_name;
		this.img = img;
		this.sex = sex;
		this.refby = refby;
		this.refto = refto;
		this.weight = weight;
		this.symptoms = symptoms;
		this.PatientType = PatientType;
		this.centerPatientId = centerPatientId;
	}

	/**
	 * @return the relative_name
	 */
	@JsonGetter("rn")
	public String getRelative_name() {
		return relative_name;
	}

	/**
	 * @param relative_name
	 *            the relative_name to set
	 */
	@JsonSetter("rn")
	public void setRelative_name(String relative_name) {
		this.relative_name = relative_name;
	}

	/**
	 * @return the img
	 */
	public String getImg() {
		return img;
	}

	/**
	 * @param img
	 *            the img to set
	 */
	public void setImg(String img) {
		this.img = img;
	}

	/**
	 * @return the patient_ID
	 */
	@JsonGetter("pi")
	public int getPatient_ID() {
		return patient_ID;
	}

	/**
	 * @param patient_ID
	 *            the patient_ID to set
	 */
	@JsonSetter("pi")
	public void setPatient_ID(int patient_ID) {
		this.patient_ID = patient_ID;
	}

	/**
	 * @return the fName
	 */
	@JsonGetter("fn")
	public String getfName() {
		return fName;
	}

	/**
	 * @param name
	 *            the fName to set
	 */
	@JsonSetter("fn")
	public void setfName(String name) {
		this.fName = name;
	}

	/**
	 * @return the mName
	 */
	@JsonGetter("mn")
	public String getmName() {
		return mName;
	}

	/**
	 * @param name
	 *            the mName to set
	 */
	@JsonSetter("mn")
	public void setmName(String name) {
		this.mName = name;
	}

	/**
	 * @return the lName
	 */
	@JsonGetter("ln")
	public String getlName() {
		return lName;
	}

	/**
	 * @param name
	 *            the lName to set
	 */
	@JsonSetter("ln")
	public void setlName(String name) {
		this.lName = name;
	}

	/**
	 * @return the age
	 */
	@JsonGetter("ag")
	public String getAge() {
		return age;
	}

	/**
	 * @param age
	 *            the age to set
	 */
	@JsonSetter("ag")
	public void setAge(String age) {
		this.age = age;
	}

	/**
	 * @return the sex
	 */
	@JsonGetter("sx")
	public String getSex() {
		return sex;
	}

	/**
	 * @param sex
	 *            the sex to set
	 */
	@JsonSetter("sx")
	public void setSex(String sex) {
		this.sex = sex;
	}

	/**
	 * @return the dob
	 */
	@JsonGetter("db")
	public String getDob() {
		return dob;
	}

	/**
	 * @param dob
	 *            the dob to set
	 */
	@JsonSetter("db")
	public void setDob(String dob) {
		this.dob = dob;
	}

	@JsonGetter("nationality")
	public String getNationality() {
		return nationality;
	}

	@JsonSetter("nationality")
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	@JsonGetter("passportNo")
	public String getPassportNo() {
		return passportNo;
	}

	@JsonSetter("passportNo")
	public void setPassportNo(String passportNo) {
		this.passportNo = passportNo;
	}

	@JsonGetter("visa")
	public String getVisa() {
		return visa;
	}

	@JsonSetter("visa")
	public void setVisa(String visa) {
		this.visa = visa;
	}

	@JsonGetter("religion")
	public String getReligion() {
		return religion;
	}

	@JsonSetter("religion")
	public void setReligion(String religion) {
		this.religion = religion;
	}

	@JsonGetter("language")
	public String getLanguage() {
		return language;
	}

	@JsonSetter("language")
	public void setLanguage(String language) {
		this.language = language;
	}

	@JsonGetter("identity")
	public String getIdentity() {
		return identity;
	}

	@JsonSetter("identity")
	public void setIdentity(String identity) {
		this.identity = identity;
	}

	@JsonGetter("identifnNo")
	public String getIdentifnNo() {
		return identifnNo;
	}

	@JsonSetter("identifnNo")
	public void setIdentifnNo(String identifnNo) {
		this.identifnNo = identifnNo;
	}

	@JsonGetter("occupation")
	public String getOccupation() {
		return occupation;
	}

	@JsonSetter("occupation")
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	@JsonGetter("education")
	public String getEducation() {
		return education;
	}

	@JsonSetter("education")
	public void setEducation(String education) {
		this.education = education;
	}

	@JsonGetter("annIncm")
	public String getAnnIncm() {
		return annIncm;
	}

	@JsonSetter("annIncm")
	public void setAnnIncm(String annIncm) {
		this.annIncm = annIncm;
	}

	/**
	 * @return the bloodGroup
	 */
	@JsonGetter("bg")
	public String getBloodGroup() {
		return bloodGroup;
	}

	/**
	 * @param bloodGroup
	 *            the bloodGroup to set
	 */
	@JsonSetter("bg")
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	/**
	 * @return the mStatus
	 */
	@JsonGetter("mst")
	public String getmStatus() {
		return mStatus;
	}

	/**
	 * @param status
	 *            the mStatus to set
	 */
	@JsonSetter("mst")
	public void setmStatus(String status) {
		this.mStatus = status;
	}

	/**
	 * @return the emergencyContactDetails
	 */
	@JsonGetter("ec")
	public String getEmergencyContactDetails() {
		return emergencyContactDetails;
	}

	/**
	 * @param emergencyContactDetails
	 *            the emergencyContactDetails to set
	 */
	@JsonSetter("ec")
	public void setEmergencyContactDetails(String emergencyContactDetails) {
		this.emergencyContactDetails = emergencyContactDetails;
	}

	/**
	 * @return the mobile
	 */
	@JsonGetter("mb")
	public String getMobile() {
		return mobile;
	}

	/**
	 * @param mobile
	 *            the mobile to set
	 */
	@JsonSetter("mb")
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	/**
	 * @return the officeNumber
	 */
	@JsonGetter("on")
	public String getOfficeNumber() {
		return officeNumber;
	}

	/**
	 * @param officeNumber
	 *            the officeNumber to set
	 */
	@JsonSetter("on")
	public void setOfficeNumber(String officeNumber) {
		this.officeNumber = officeNumber;
	}

	/**
	 * @return the addressLine1
	 */
	@JsonGetter("a1")
	public String getAddressLine1() {
		return addressLine1;
	}

	/**
	 * @param addressLine1
	 *            the addressLine1 to set
	 */
	@JsonSetter("a1")
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	/**
	 * @return the addressLine2
	 */
	@JsonGetter("a2")
	public String getAddressLine2() {
		return addressLine2;
	}

	/**
	 * @param addressLine2
	 *            the addressLine2 to set
	 */
	@JsonSetter("a2")
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	/**
	 * @return the addressLine3
	 */
	@JsonGetter("a3")
	public String getAddressLine3() {
		return addressLine3;
	}

	/**
	 * @param addressLine3
	 *            the addressLine3 to set
	 */
	@JsonSetter("a3")
	public void setAddressLine3(String addressLine3) {
		this.addressLine3 = addressLine3;
	}

	@JsonGetter("pl")
	public List<Patient> getPatientList() {
		return patientList;
	}

	@JsonSetter("pl")
	public void setPatientList(List<Patient> patientList) {
		this.patientList = patientList;
	}

	@Override
	@JsonIgnore
	public String toString() {
		return "PatientDetails [Patient_ID =" + patient_ID + ", p fname="
				+ fName + ", p mname=" + mName + ", p lname=" + lName
				+ ", p age=" + age + ", p sex=" + sex + ", p dob=" + dob
				+ ", p bloodGroup=" + bloodGroup + ", p mStatus=" + mStatus
				+ ", p emergencyContactDetails=" + emergencyContactDetails
				+ ", p mobile=" + mobile + ", p officeNumber=" + officeNumber
				+ ", p addressLine1=" + addressLine1 + ", p addressLine2="
				+ addressLine2 + ", p addressLine3=" + addressLine3
				+ ", p relative_name=" + relative_name + ", p img=" + img + ", p centerPatientId=" + centerPatientId + "]";
	}

	@JsonGetter("cn")
	public String getClinical_note() {
		return clinical_note;
	}

	@JsonSetter("cn")
	public void setClinical_note(String clinical_note) {
		this.clinical_note = clinical_note;
	}

	@JsonGetter("tm")
	public String getTreatment() {
		return treatment;
	}

	@JsonSetter("tm")
	public void setTreatment(String treatment) {
		this.treatment = treatment;
	}

//	@JsonGetter("tnl")
//	public List<TreatmentNurses> getObjTNList() {
//		return objTNList;
//	}
//
//	@JsonSetter("tnl")
//	public void setObjTNList(List<TreatmentNurses> objTNList) {
//		this.objTNList = objTNList;
//	}
//
//	@JsonGetter("tn")
//	public TreatmentNurses getObjTN() {
//		return objTN;
//	}
//
//	@JsonSetter("tn")
//	public void setObjTN(TreatmentNurses objTN) {
//		this.objTN = objTN;
//	}

	@JsonSetter("rgDt")
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	@JsonGetter("rgDt")
	public String getRegDate() {
		return regDate;
	}

	@JsonGetter("trt")
	public List<TreatmentTests> getObjTrtList() {
		return objTrtList;
	}

	@JsonSetter("trt")
	public void setObjTrtList(List<TreatmentTests> objTrtList) {
		this.objTrtList = objTrtList;
	}

	@JsonGetter("ocs")
	public List<Order_comp_stat> getOcsList() {
		return ocsList;
	}

	@JsonSetter("ocs")
	public void setOcsList(List<Order_comp_stat> ocsList) {
		this.ocsList = ocsList;
	}

//	private List<DischargeSummery> objdslist;
//
//	@JsonGetter("ods")
//	public List<DischargeSummery> getObjdslist() {
//		return objdslist;
//	}
//
//	@JsonSetter("ods")
//	public void setObjdslist(List<DischargeSummery> objdslist) {
//		this.objdslist = objdslist;
//	}
//
//	private List<PaediatricDept> objpd;
//
//	@JsonGetter("objpd")
//	public List<PaediatricDept> getObjpd() {
//		return objpd;
//	}
//
//	@JsonSetter("objpd")
//	public void setObjpd(List<PaediatricDept> objpd) {
//		this.objpd = objpd;
//	}
//
//	private List<PatientDocuments> lipatDocs;
//
//	@JsonGetter("liDocs")
//	public List<PatientDocuments> getLipatDocs() {
//		return lipatDocs;
//	}
//
//	@JsonSetter("liDocs")
//	public void setLipatDocs(List<PatientDocuments> lipatDocs) {
//		this.lipatDocs = lipatDocs;
//	}

	@JsonGetter("a4")
	public String getAddressLine4() {
		return addressLine4;
	}

	@JsonSetter("a4")
	public void setAddressLine4(String addressLine4) {
		this.addressLine4 = addressLine4;
	}

	@JsonGetter("a5")
	public String getAddressLine5() {
		return addressLine5;
	}

	@JsonSetter("a5")
	public void setAddressLine5(String addressLine5) {
		this.addressLine5 = addressLine5;
	}

	@JsonGetter("a6")
	public String getAddressLine6() {
		return addressLine6;
	}

	@JsonSetter("a6")
	public void setAddressLine6(String addressLine6) {
		this.addressLine6 = addressLine6;
	}
	
	@JsonGetter("a10")
	public String getAddressLine10() {
		return addressLine10;
	}

	@JsonSetter("a10")
	public void setAddressLine10(String addressLine10) {
		this.addressLine10 = addressLine10;
	}

	@JsonGetter("hs")
	public String getHospType() {
		return hospType;
	}

	@JsonSetter("hs")
	public void setHospType(String hospType) {
		this.hospType = hospType;
	}

	private List<MLCDetail> listMlcDetails;

	@JsonGetter("liMLC")
	public List<MLCDetail> getListMlcDetails() {
		return listMlcDetails;
	}

	@JsonSetter("liMLC")
	public void setListMlcDetails(List<MLCDetail> listMlcDetails) {
		this.listMlcDetails = listMlcDetails;
	}

	@JsonGetter("listTop")
	public List<TreatmentOperations> getListTop() {
		return listTop;
	}

	@JsonSetter("listTop")
	public void setListTop(List<TreatmentOperations> listTop) {
		this.listTop = listTop;
	}

//	@JsonGetter("listTop1")
//	public List<TreatmentOperations> getListTop1() {
//		return listTop1;
//	}
//
//	@JsonSetter("listTop1")
//	public void setListTop1(List<TreatmentOperations> listTop1) {
//		this.listTop1 = listTop1;
//	}

	@JsonGetter("PatientType")
	public String getPatientType() {
		return PatientType;
	}

	@JsonSetter("PatientType")
	public void setPatientType(String PatientType) {
		this.PatientType = PatientType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@JsonGetter("IPDDoctorList")
	public List<IpdDoctors> getObjIPDDoctorList() {
		return objIPDDoctorList;
	}

	@JsonSetter("IPDDoctorList")
	public void setObjIPDDoctorList(List<IpdDoctors> objIPDDoctorList) {
		this.objIPDDoctorList = objIPDDoctorList;
	}

	@JsonGetter("perAdd7")
	public String getPerAddressLine7() {
		return perAddressLine7;
	}

	@JsonSetter("perAdd7")
	public void setPerAddressLine7(String perAddressLine7) {
		this.perAddressLine7 = perAddressLine7;
	}

	private List<Patient> dischargePatientList;

	@JsonGetter("dpl")
	public List<Patient> getDischargePatientList() {
		return dischargePatientList;
	}

	@JsonSetter("dpl")
	public void setDischargePatientList(List<Patient> ipdPatientList) {
		this.dischargePatientList = ipdPatientList;
	}

//	@JsonGetter("ipdpl")
//	public List<IPDDischargePlanDTO> getObjIPDDischargePlanDTOList() {
//		return objIPDDischargePlanDTOList;
//	}
//
//	@JsonSetter("ipdpl")
//	public void setObjIPDDischargePlanDTOList(
//			List<IPDDischargePlanDTO> objIPDDischargePlanDTOList) {
//		this.objIPDDischargePlanDTOList = objIPDDischargePlanDTOList;
//	}

	@JsonGetter("transactional")
	public String getTransactional() {
		return transactional;
	}

	@JsonSetter("transactional")
	public void setTransactional(String transactional) {
		this.transactional = transactional;
	}

	@JsonGetter("promotional")
	public String getPromotional() {
		return promotional;
	}

	@JsonSetter("promotional")
	public void setPromotional(String promotional) {
		this.promotional = promotional;
	}

//	@JsonGetter("objcusttemp")
//	public CustomizeTemplate getObjcusttemp() {
//		return objcusttemp;
//	}
//
//	@JsonSetter("objcusttemp")
//	public void setObjcusttemp(CustomizeTemplate objcusttemp) {
//		this.objcusttemp = objcusttemp;
//	}

	@JsonGetter("bsa")
	public Double getBsa() {
		return bsa;
	}

	@JsonSetter("bsa")
	public void setBsa(Double bsa) {
		this.bsa = bsa;
	}

	@JsonGetter("bmiBsaID")
	public int getBmiBsaID() {
		return bmiBsaID;
	}

	@JsonSetter("bmiBsaID")
	public void setBmiBsaID(int bmiBsaID) {
		this.bmiBsaID = bmiBsaID;
	}

	@JsonGetter("bmiDate")
	public String getBmiDate() {
		return bmiDate;
	}

	@JsonSetter("bmiDate")
	public void setBmiDate(String bmiDate) {
		this.bmiDate = bmiDate;
	}

	@JsonGetter("digReqColTrtflag")
	public String getDignosisReqToCloseTreatmentFlag() {
		return dignosisReqToCloseTreatmentFlag;
	}

	@JsonSetter("digReqColTrtflag")
	public void setDignosisReqToCloseTreatmentFlag(
			String dignosisReqToCloseTreatmentFlag) {
		this.dignosisReqToCloseTreatmentFlag = dignosisReqToCloseTreatmentFlag;
	}

	private Operation objOperation;
	@JsonGetter("objOperation")
	public Operation getObjOperation() {
		return objOperation;
	}
	@JsonSetter("objOperation")
	public void setObjOperation(Operation objOperation) {
		this.objOperation = objOperation;
	}
	

	@JsonGetter("deptid")
	public void setDeptid(int deptid) {
		this.deptid = deptid;
	}
	
	
	@JsonSetter("deptid")
	public int getDeptid() {
		return deptid;
	}
	
	@JsonSetter("drid")
	public String getDrid() {
		return drid;
	}
	
	@JsonSetter("drid")
	public void setDrid(String drid) {
		this.drid = drid;
	}
	
	@JsonGetter("admitedDays")
	public int getAdmitedDays() {
		return admitedDays;
	}
	
	@JsonSetter("admitedDays")
	public void setAdmitedDays(int admitedDays) {
		this.admitedDays = admitedDays;
	}
	
	@JsonGetter("docName")
	public String getDocName() {
		return docName;
	}
	
	@JsonSetter("docName")
	public void setDocName(String docName) {
		this.docName = docName;
	}
	
	@JsonGetter("sourceTypeId")
	public int getSourceTypeId() {
		return sourceTypeId;
	}
	
	@JsonGetter("sponsorName")
	public String getSponsorName() {
		return sponsorName;
	}
	
	@JsonSetter("sourceTypeId")
	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}
	
	@JsonSetter("sponsorName")
	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}
	@JsonSetter("bedNo")
	public String getBedNo() {
		return bedNo;
	}
	public void setBedNo(String bedNo) {
		this.bedNo = bedNo;
	}
	public Integer getPrevOperationCnt() {
		return PrevOperationCnt;
	}
	public void setPrevOperationCnt(Integer prevOperationCnt) {
		PrevOperationCnt = prevOperationCnt;
	}
	
	
	

}
