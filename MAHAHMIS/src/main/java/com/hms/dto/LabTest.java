package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.mysql.jdbc.Blob;

public class LabTest implements Serializable {
	private int idTest;
	private int idheadings;
	private String testName;
	private String testCode;
	private Float testRate;
	private String testStatus;
	private String dateofentry;
	private int createdBy;
	private int idtestMethod;
	private String valueType;

	private int idTestResult;
	private String testResult;
	private String testMethodnm;
	
	private String testTemplate;
	private String testTemplateName;
	private String impressions;
	private int maxId;
	private int idlabTestTemplate;
	
	@JsonGetter("idlabTestTemplate")
	public int getIdlabTestTemplate() {
		return idlabTestTemplate;
	}
	@JsonSetter("idlabTestTemplate")
	public void setIdlabTestTemplate(int idlabTestTemplate) {
		this.idlabTestTemplate = idlabTestTemplate;
	}
	@JsonGetter("maxId")
	public int getMaxId() {
		return maxId;
	}
	@JsonSetter("maxId")
	public void setMaxId(int maxId) {
		this.maxId = maxId;
	}
	@JsonGetter("impressions")
	public String getImpressions() {
		return impressions;
	}
	@JsonSetter("impressions")
	public void setImpressions(String impressions) {
		this.impressions = impressions;
	}
	/*@JsonGetter("testTemplate")
	public Blob getTestTemplate() {
		return testTemplate;
	}
	@JsonSetter("testTemplate")
	public void setTestTemplate(Blob testTemplate) {
		this.testTemplate = testTemplate;
	}*/
	@JsonGetter("testTemplate")
	public String getTestTemplate() {
		return testTemplate;
	}
	@JsonSetter("testTemplate")
	public void setTestTemplate(String testTemplate) {
		this.testTemplate = testTemplate;
	}
	@JsonGetter("testTemplateName")
	public String getTestTemplateName() {
		return testTemplateName;
	}
	@JsonSetter("testTemplateName")
	public void setTestTemplateName(String testTemplateName) {
		this.testTemplateName = testTemplateName;
	}

	private String systemIp; // Added by vinod
	private List<InventoryMaterialRequestNoteItemInfoSlaveDTO> inventoryMaterialRequestNoteItemInfoSlaveDTO ; //Added by vinod
	
	public String getSystemIp() {
		return systemIp;
	}
	public void setSystemIp(String systemIp) {
		this.systemIp = systemIp;
	}
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> getInventoryMaterialRequestNoteItemInfoSlaveDTO() {
		return inventoryMaterialRequestNoteItemInfoSlaveDTO;
	}
	public void setInventoryMaterialRequestNoteItemInfoSlaveDTO(
			List<InventoryMaterialRequestNoteItemInfoSlaveDTO> inventoryMaterialRequestNoteItemInfoSlaveDTO) {
		this.inventoryMaterialRequestNoteItemInfoSlaveDTO = inventoryMaterialRequestNoteItemInfoSlaveDTO;
	}
		
	private List<LabTest> testli;
	private List<LabTestNormalValues> normalValuesli;
	private List<HallWiseTestChargesDTO> hallWsTestChrgsList;
	private List<LabTest> testTempli;

	
	@JsonGetter("tempLi")
	public List<LabTest> getTestTempli() {
		return testTempli;
	}
	@JsonSetter("tempLi")
	public void setTestTempli(List<LabTest> testTempli) {
		this.testTempli = testTempli;
	}

	private String testNote;
	private String testClinicaluse;
	private String testIncreasedlevel;
	private String testInterpretation;
	private String testComments;

	private LabFormula objFormula;

	
	private String noteDeatilsForGeneral;
	
	private Double motivatorCash;
	private Double motivatorSponsored;
	private Double clinicPercent;
	/*********new individual list***********************/
	private List<LabTestNormalValues> normalValueslinewindi ;
	@JsonGetter("normalValueslinewindi")
	public List<LabTestNormalValues> getNormalValueslinewindi() {
		return normalValueslinewindi;
	}
	@JsonSetter("normalValueslinewindi")
	public void setNormalValueslinewindi(
			List<LabTestNormalValues> normalValueslinewindi) {
		this.normalValueslinewindi = normalValueslinewindi;
	}

	/*********new individual list***********************/
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

	@JsonGetter("objLbForm")
	public LabFormula getObjFormula() {
		return objFormula;
	}

	@JsonSetter("objLbForm")
	public void setObjFormula(LabFormula objFormula) {
		this.objFormula = objFormula;
	}

	@JsonGetter("tnote")
	public String getTestNote() {
		return testNote;
	}

	@JsonSetter("tnote")
	public void setTestNote(String testNote) {
		this.testNote = testNote;
	}

	@JsonGetter("tcliuse")
	public String getTestClinicaluse() {
		return testClinicaluse;
	}

	@JsonSetter("tcliuse")
	public void setTestClinicaluse(String testClinicaluse) {
		this.testClinicaluse = testClinicaluse;
	}

	@JsonGetter("tinrl")
	public String getTestIncreasedlevel() {
		return testIncreasedlevel;
	}

	@JsonSetter("tinrl")
	public void setTestIncreasedlevel(String testIncreasedlevel) {
		this.testIncreasedlevel = testIncreasedlevel;
	}

	@JsonGetter("tinter")
	public String getTestInterpretation() {
		return testInterpretation;
	}

	@JsonSetter("tinter")
	public void setTestInterpretation(String testInterpretation) {
		this.testInterpretation = testInterpretation;
	}

	@JsonGetter("tcommnt")
	public String getTestComments() {
		return testComments;
	}

	@JsonSetter("tcommnt")
	public void setTestComments(String testComments) {
		this.testComments = testComments;
	}

	@JsonGetter("tmethd")
	public String getTestMethodnm() {
		return testMethodnm;
	}

	@JsonSetter("tmethd")
	public void setTestMethodnm(String testMethodnm) {
		this.testMethodnm = testMethodnm;
	}

	@JsonGetter("idTstRe")
	public int getIdTestResult() {
		return idTestResult;
	}

	@JsonSetter("idTstRe")
	public void setIdTestResult(int integer) {
		this.idTestResult = integer;
	}

	@JsonGetter("tstRe")
	public String getTestResult() {
		return testResult;
	}

	@JsonSetter("tstRe")
	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}

	@JsonGetter("tnvli")
	public List<LabTestNormalValues> getNormalValuesli() {
		return normalValuesli;
	}

	@JsonSetter("tnvli")
	public void setNormalValuesli(List<LabTestNormalValues> normalValuesli) {
		this.normalValuesli = normalValuesli;
	}

	@JsonGetter("vt")
	public String getValueType() {
		return valueType;
	}

	@JsonSetter("vt")
	public void setValueType(String valueType) {
		this.valueType = valueType;
	}

	@JsonGetter("tid")
	public int getIdTest() {
		return idTest;
	}

	@JsonSetter("tid")
	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}

	@JsonGetter("hid")
	public int getIdheadings() {
		return idheadings;
	}

	@JsonSetter("hid")
	public void setIdheadings(int idheadings) {
		this.idheadings = idheadings;
	}

	@JsonGetter("tnm")
	public String getTestName() {
		return testName;
	}

	@JsonSetter("tnm")
	public void setTestName(String testName) {
		this.testName = testName;
	}

	@JsonGetter("tcd")
	public String getTestCode() {
		return testCode;
	}

	@JsonSetter("tcd")
	public void setTestCode(String testCode) {
		this.testCode = testCode;
	}

	@JsonGetter("trt")
	public Float getTestRate() {
		return testRate;
	}

	@JsonSetter("trt")
	public void setTestRate(Float testRate) {
		this.testRate = testRate;
	}

	@JsonGetter("tst")
	public String getTestStatus() {
		return testStatus;
	}

	@JsonSetter("tst")
	public void setTestStatus(String testStatus) {
		this.testStatus = testStatus;
	}

	@JsonGetter("tdt")
	public String getDateofentry() {
		return dateofentry;
	}

	@JsonSetter("tdt")
	public void setDateofentry(String dateofentry) {
		this.dateofentry = dateofentry;
	}

	@JsonGetter("tcb")
	public int getCreatedBy() {
		return createdBy;
	}

	@JsonSetter("tcb")
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	@JsonGetter("tmd")
	public int getIdtestMethod() {
		return idtestMethod;
	}

	@JsonSetter("tmd")
	public void setIdtestMethod(int idtestMethod) {
		this.idtestMethod = idtestMethod;
	}

	@JsonGetter("tli")
	public List<LabTest> getTestli() {
		return testli;
	}

	@JsonSetter("tli")
	public void setTestli(List<LabTest> testli) {
		this.testli = testli;
	}
	@JsonGetter("hallWsTestChrgsList")
	public List<HallWiseTestChargesDTO> getHallWsTestChrgsList() {
		return hallWsTestChrgsList;
	}
	@JsonSetter("hallWsTestChrgsList")
	public void setHallWsTestChrgsList(List<HallWiseTestChargesDTO> hallWsTestChrgsList) {
		this.hallWsTestChrgsList = hallWsTestChrgsList;
	}
	
	@Override
	public boolean equals(Object obj) {
		LabTest lb = (LabTest)obj;
		if(lb.getIdheadings() == idheadings)
		{
			return true;
		}else{
			return false;
		}
	}

	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return idheadings;
	}
	@JsonGetter("ndgnrl")
	public String getNoteDeatilsForGeneral() {
		return noteDeatilsForGeneral;
	}
	@JsonSetter("ndgnrl")
	public void setNoteDeatilsForGeneral(String noteDeatilsForGeneral) {
		this.noteDeatilsForGeneral = noteDeatilsForGeneral;
	}
}
