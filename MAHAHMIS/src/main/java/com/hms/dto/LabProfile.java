package com.hms.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabProfile implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idprofile;
	private int idheadings;
	private String profileName;
	private float profileCharges;
	private String profileCode;
	private Date profilecreatedDate;
	private int profilecreatedBy;
	private String profilenote;
	
	private String lab_test_code;	//jitendra
	private String profileStatus;
	private List<LabProfile> profileli;
	private List<LabProfileTestComp> pretestli;
	private List<LabTest> arrLabTest;
	private List<LabPkg> labPkgli;
	//private List<Test> investigationTestLi;
	//private List<Test> radiologyTestLi;
	private List<HallWiseTestChargesDTO> hallWsTestChrgsList;
	
	private String filepath ;
	
	private Double motivatorCash;
	private Double motivatorSponsored;
	private Double clinicPercent;
	
	//Added by Laxman on 23-Jan-2018.
	private int serviceID;
	private int subServiceID;
	private int labRequestId;
	private int labReqSlvId;
	private String refDocName;
	private String pkgName;
	private java.util.Date postDateTime;
	private int treatmentId;
	
	private int pkgId;
	private String ispkgFlag;
	private String testStatus;
	
	private String profileInterpretation;
    private String profileComments;
    private String reportHeading;
    private String profileDisclaimer;
    private String template_wise;
    
    //jitendra
    @JsonGetter("lab_test_code")
    public String getLab_test_code() {
		return lab_test_code;
	}
    @JsonSetter("lab_test_code")
	public void setLab_test_code(String lab_test_code) {
		this.lab_test_code = lab_test_code;
	}
    
	@JsonGetter("clinicPercent")
	public Double getClinicPercent() {
		return clinicPercent;
	}
	
	@JsonSetter("clinicPercent")
	public void setClinicPercent(Double clinicPercent) {
		this.clinicPercent = clinicPercent;
	}

	public Double getMotivatorCash() {
		return motivatorCash;
	}

	public Double getMotivatorSponsored() {
		return motivatorSponsored;
	}

	public void setMotivatorCash(Double motivatorCash) {
		this.motivatorCash = motivatorCash;
	}

	public void setMotivatorSponsored(Double motivatorSponsored) {
		this.motivatorSponsored = motivatorSponsored;
	}

	@JsonGetter("albt")
	public List<LabTest> getArrLabTest() {
		return arrLabTest;
	}

	@JsonSetter("albt")
	public void setArrLabTest(List<LabTest> arrLabTest) {
		this.arrLabTest = arrLabTest;
	}

	/*@JsonGetter("itli")
	public List<Test> getInvestigationTestLi() {
		return investigationTestLi;
	}

	@JsonSetter("itli")
	public void setInvestigationTestLi(List<Test> investigationTestLi) {
		this.investigationTestLi = investigationTestLi;
	}

	@JsonGetter("rtli")
	public List<Test> getRadiologyTestLi() {
		return radiologyTestLi;
	}

	@JsonSetter("rtli")
	public void setRadiologyTestLi(List<Test> radiologyTestLi) {
		this.radiologyTestLi = radiologyTestLi;
	}*/

	@JsonGetter("lbpkgli")
	public List<LabPkg> getLabPkgli() {
		return labPkgli;
	}

	@JsonSetter("lbpkgli")
	public void setLabPkgli(List<LabPkg> labPkgli) {
		this.labPkgli = labPkgli;
	}

	@JsonGetter("proId")
	public int getIdprofile() {
		return idprofile;
	}

	@JsonSetter("proId")
	public void setIdprofile(int idprofile) {
		this.idprofile = idprofile;
	}

	@JsonGetter("hedId")
	public int getIdheadings() {
		return idheadings;
	}

	@JsonSetter("hedId")
	public void setIdheadings(int idheadings) {
		this.idheadings = idheadings;
	}

	@JsonGetter("proNm")
	public String getProfileName() {
		return profileName;
	}

	@JsonSetter("proNm")
	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}

	@JsonGetter("proChr")
	public float getProfileCharges() {
		return profileCharges;
	}

	@JsonSetter("proChr")
	public void setProfileCharges(float profileCharges) {
		this.profileCharges = profileCharges;
	}

	@JsonGetter("proCode")
	public String getProfileCode() {
		return profileCode;
	}

	@JsonSetter("proCode")
	public void setProfileCode(String profileCode) {
		this.profileCode = profileCode;
	}

	@JsonGetter("proCreDt")
	public Date getProfilecreatedDate() {
		return profilecreatedDate;
	}

	@JsonSetter("proCreDt")
	public void setProfilecreatedDate(Date profilecreatedDate) {
		this.profilecreatedDate = profilecreatedDate;
	}

	@JsonGetter("proCrBy")
	public int getProfilecreatedBy() {
		return profilecreatedBy;
	}

	@JsonSetter("proCrBy")
	public void setProfilecreatedBy(int profilecreatedBy) {
		this.profilecreatedBy = profilecreatedBy;
	}

	@JsonGetter("proNot")
	public String getProfilenote() {
		return profilenote;
	}

	@JsonSetter("proNot")
	public void setProfilenote(String profilenote) {
		this.profilenote = profilenote;
	}

	@JsonGetter("proSt")
	public String getProfileStatus() {
		return profileStatus;
	}

	@JsonSetter("proSt")
	public void setProfileStatus(String profileStatus) {
		this.profileStatus = profileStatus;
	}

	@JsonGetter("proLi")
	public List<LabProfile> getProfileli() {
		return profileli;
	}

	@JsonSetter("proLi")
	public void setProfileli(List<LabProfile> profileli) {
		this.profileli = profileli;
	}

	@JsonGetter("protestLi")
	public List<LabProfileTestComp> getPretestli() {
		return pretestli;
	}

	@JsonSetter("protestLi")
	public void setPretestli(List<LabProfileTestComp> pretestli) {
		this.pretestli = pretestli;
	}

	@JsonGetter("tLi")
	public void setTestli(List<LabTest> arrLabTest) {
		// TODO Auto-generated method stub
		this.arrLabTest = arrLabTest;
	}

	@JsonSetter("tLi")
	public List<LabTest> getTestli() {
		// TODO Auto-generated method stub
		return arrLabTest;
	}
	@JsonGetter("hallWsTestChrgsList")
	public List<HallWiseTestChargesDTO> getHallWsTestChrgsList() {
		return hallWsTestChrgsList;
	}
	@JsonSetter("hallWsTestChrgsList")
	public void setHallWsTestChrgsList(List<HallWiseTestChargesDTO> hallWsTestChrgsList) {
		this.hallWsTestChrgsList = hallWsTestChrgsList;
	}
	
	@JsonGetter("filepath")
	public String getFilepath() {
		return filepath;
	}
	@JsonSetter("filepath")
	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	@JsonGetter("serviceid")
	public int getServiceID() {
		return serviceID;
	}

	@JsonSetter("serviceid")
	public void setServiceID(int serviceID) {
		this.serviceID = serviceID;
	}

	@JsonGetter("subserviceid")
	public int getSubServiceID() {
		return subServiceID;
	}

	@JsonSetter("subserviceid")
	public void setSubServiceID(int subServiceID) {
		this.subServiceID = subServiceID;
	}

	@JsonGetter("labreqid")
	public int getLabRequestId() {
		return labRequestId;
	}

	@JsonSetter("labreqid")
	public void setLabRequestId(int labRequestId) {
		this.labRequestId = labRequestId;
	}

	@JsonGetter("labreqslvid")
	public int getLabReqSlvId() {
		return labReqSlvId;
	}

	@JsonSetter("labreqslvid")
	public void setLabReqSlvId(int labReqSlvId) {
		this.labReqSlvId = labReqSlvId;
	}

	@JsonGetter("refdocname")
	public String getRefDocName() {
		return refDocName;
	}

	@JsonSetter("refdocname")
	public void setRefDocName(String refDocName) {
		this.refDocName = refDocName;
	}

	@JsonGetter("postDtTm")
	public java.util.Date getPostDateTime() {
		return postDateTime;
	}
	
	@JsonSetter("postDtTm")
	public void setPostDateTime(java.util.Date postDateTime) {
		this.postDateTime = postDateTime;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	@JsonGetter("pkgNm")
	public String getPkgName() {
		return pkgName;
	}
	@JsonSetter("pkgNm")
	public void setPkgName(String pkgName) {
		this.pkgName = pkgName;
	}
	@JsonGetter("pkgId")
	public int getPkgId() {
		return pkgId;
	}
	@JsonSetter("PkgId")
	public void setPkgId(int pkgId) {
		this.pkgId = pkgId;
	}
	@JsonGetter("ispkgFlag")
	public String getIspkgFlag() {
		return ispkgFlag;
	}
	@JsonSetter("ispkgFlag")
	public void setIspkgFlag(String ispkgFlag) {
		this.ispkgFlag = ispkgFlag;
	}
	@JsonGetter("tstSts")
	public String getTestStatus() {
		return testStatus;
	}
	@JsonSetter("tstSts")
	public void setTestStatus(String testStatus) {
		this.testStatus = testStatus;
	}

    @JsonGetter("proInterpretation")
    public String getProfileInterpretation() {
        return profileInterpretation;
    }
    @JsonSetter("proInterpretation")
    public void setProfileInterpretation(String profileInterpretation) {
        this.profileInterpretation = profileInterpretation;
    }
    
    @JsonGetter("proComments")
    public String getProfileComments() {
        return profileComments;
    }
    @JsonSetter("proComments")
    public void setProfileComments(String profileComments) {
        this.profileComments = profileComments;
    }
    
    @JsonGetter("proDisclaimer")
	public String getProfileDisclaimer() {
		return profileDisclaimer;
	}
    @JsonSetter("proDisclaimer")
	public void setProfileDisclaimer(String profileDisclaimer) {
		this.profileDisclaimer = profileDisclaimer;
	}
	
    
    @JsonGetter("repHead")
   	public String getReportHeading() {
   		return reportHeading;
   	}
   	@JsonSetter("repHead")
   	public void setReportHeading(String reportHeading) {
   		this.reportHeading = reportHeading;
   	}
   	
	public String getTemplate_wise() {
		return template_wise;
	}
	public void setTemplate_wise(String template_wise) {
		this.template_wise = template_wise;
	}
    
   	
    

}
