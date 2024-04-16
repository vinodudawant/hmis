package com.hms.dto;


import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Radiology {

	private String test_code;
	private int idradiology_test_name;

	private int idradiologyFileMaster;
	private int radiologyTest;
	private int testRadiology;
	private String testName;
	private int idradiologyGroup;
	private String radiologyGroupName;
	private String radiologyGroupStatus;
	private InvestigationBodyPart objInvest;
	private List<InvestigationBodyPart> InvestBodyPart;
	
	private List<InvestigationTestDto> InvestTestDto;
	private Patient objPatient;
	private String radiologyInstruction;
	private String radiologyClinicalNote;
	
	
	
	@JsonGetter("IdRadioTestName") 
	public int getIdradiology_test_name() {
		return idradiology_test_name;
	}
	@JsonSetter("IdRadioTestName")
	public void setIdradiology_test_name(int idradiology_test_name) {
		this.idradiology_test_name = idradiology_test_name;
	}
	@JsonGetter("InvestTestDto")
	public List<InvestigationTestDto> getInvestTestDto() {
		return InvestTestDto;
	}
	@JsonSetter("InvestTestDto")
	public void setInvestTestDto(List<InvestigationTestDto> investTestDto) {
		InvestTestDto = investTestDto;
	}
	@JsonGetter("testCode")
	public String getTest_code() {
		return test_code;
	}
@JsonSetter("testCode")
	public void setTest_code(String test_code) {
		this.test_code = test_code;
	}
	
	
	@JsonGetter("Instruct")
	public String getRadiologyInstruction() {
		return radiologyInstruction;
	}
	
	@JsonSetter("Instruct")
	public void setRadiologyInstruction(String radiologyInstruction) {
		this.radiologyInstruction = radiologyInstruction;
	}
	
	@JsonGetter("clnote")
	public String getRadiologyClinicalNote() {
		return radiologyClinicalNote;
	}
	@JsonSetter("clnote")
	public void setRadiologyClinicalNote(String radiologyClinicalNote) {
		this.radiologyClinicalNote = radiologyClinicalNote;
	}
	public Patient getObjPatient() {
		return objPatient;
	}
	public void setObjPatient(Patient objPatient) {
		this.objPatient = objPatient;
	}
	@JsonGetter("InvestbodyPart")
	public InvestigationBodyPart getObjInvest() {
		return objInvest;
	}
@JsonSetter("InvestbodyPart")
	public void setObjInvest(InvestigationBodyPart objInvest) {
		this.objInvest = objInvest;
	}

	
	
	
	public List<InvestigationBodyPart> getInvestBodyPart() {
		return InvestBodyPart;
	}

	public void setInvestBodyPart(List<InvestigationBodyPart> investBodyPart) {
		InvestBodyPart = investBodyPart;
	}

	@JsonGetter
	public int getIdradiologyGroup() {
		return idradiologyGroup;
	}
@JsonSetter
	public void setIdradiologyGroup(int idradiologyGroup) {
		this.idradiologyGroup = idradiologyGroup;
	}
@JsonGetter("grpName")
	public String getRadiologyGroupName() {
		return radiologyGroupName;
	}

@JsonSetter("grpName")
	public void setRadiologyGroupName(String radiologyGroupName) {
		this.radiologyGroupName = radiologyGroupName;
	}
@JsonGetter("itStatus")
	public String getRadiologyGroupStatus() {
		return radiologyGroupStatus;
	}
@JsonSetter("itStatus")
	public void setRadiologyGroupStatus(String radiologyGroupStatus) {
		this.radiologyGroupStatus = radiologyGroupStatus;
	}

	private List<Radiology> rList;
		
	@JsonGetter("idradiologyFileMaster")
	public int getIdradiologyFileMaster() {
		return idradiologyFileMaster;
	}
	
	@JsonSetter("idradiologyFileMaster")
	public void setIdradiologyFileMaster(int idradiologyFileMaster) {
		this.idradiologyFileMaster = idradiologyFileMaster;
	}
	
	@JsonGetter("radiologyTest")
	public int getRadiologyTest() {
		return radiologyTest;
	}
	
	@JsonSetter("radiologyTest")
	public void setRadiologyTest(int radiologyTest) {
		this.radiologyTest = radiologyTest;
	}
	
	@JsonGetter("testRadiology")
	public int getTestRadiology() {
		return testRadiology;
	}
	
	@JsonSetter("testRadiology")
	public void setTestRadiology(int testRadiology) {
		this.testRadiology = testRadiology;
	}
	
	@JsonGetter("testName")
	public String getTestName() {
		return testName;
	}
	
	@JsonSetter("testName")
	public void setTestName(String testName) {
		this.testName = testName;
	}
	
	@JsonGetter("rList")
	public List<Radiology> getrList() {
		return rList;
	}

	@JsonSetter("rList")
	public void setrList(List<Radiology> rList) {
		this.rList = rList;
	}
	

}
