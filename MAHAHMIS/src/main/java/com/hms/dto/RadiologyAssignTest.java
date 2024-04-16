package com.hms.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class RadiologyAssignTest {
	private int idradiology_test;
	private int idradiology_file_master;
	private int idtest_radiology;
	private Float test_amount;
	private int asign_by;
	private String assign_date;
	private Test objTest;
	private List<RadiologyFileComponent> listRadiologyFileComponent;
	private String investigationInstruction;
	private String investigationClinicalNote;
	private int investigationUrgentFlag;
	private int testType;
	private int bodyPart;
	private String reportDateTime;
	
	public int getTestType() {
		return testType;
	}

	public void setTestType(int testType) {
		this.testType = testType;
	}

	public int getBodyPart() {
		return bodyPart;
	}

	public void setBodyPart(int bodyPart) {
		this.bodyPart = bodyPart;
	}

	public String getInvestigationInstruction() {
		return investigationInstruction;
	}

	public void setInvestigationInstruction(String investigationInstruction) {
		this.investigationInstruction = investigationInstruction;
	}

	public String getInvestigationClinicalNote() {
		return investigationClinicalNote;
	}

	public void setInvestigationClinicalNote(String investigationClinicalNote) {
		this.investigationClinicalNote = investigationClinicalNote;
	}

	public int getInvestigationUrgentFlag() {
		return investigationUrgentFlag;
	}

	public void setInvestigationUrgentFlag(int investigationUrgentFlag) {
		this.investigationUrgentFlag = investigationUrgentFlag;
	}
	@JsonGetter("liRadFlComp")
	public List<RadiologyFileComponent> getListRadiologyFileComponent() {
		return listRadiologyFileComponent;
	}
	@JsonSetter("liRadFlComp")
	public void setListRadiologyFileComponent(
			List<RadiologyFileComponent> listRadiologyFileComponent) {
		this.listRadiologyFileComponent = listRadiologyFileComponent;
	}

	@JsonGetter("objt")
	public Test getObjTest() {
		return objTest;
	}

	@JsonSetter("objt")
	public void setObjTest(Test objTest) {
		this.objTest = objTest;
	}

	@JsonGetter("idRadtasgn")
	public int getIdradiology_test() {
		return idradiology_test;
	}

	@JsonSetter("idRadtasgn")
	public void setIdradiology_test(int idradiology_test) {
		this.idradiology_test = idradiology_test;
	}

	@JsonGetter("idRadfms")
	public int getIdradiology_file_master() {
		return idradiology_file_master;
	}

	@JsonSetter("idRadfms")
	public void setIdradiology_file_master(int idradiology_file_master) {
		this.idradiology_file_master = idradiology_file_master;
	}

	@JsonGetter("idRadtest")
	public int getIdtest_radiology() {
		return idtest_radiology;
	}

	@JsonSetter("idRadtest")
	public void setIdtest_radiology(int idtest_radiology) {
		this.idtest_radiology = idtest_radiology;
	}

	@JsonGetter("idRadtamt")
	public Float getTest_amount() {
		return test_amount;
	}

	@JsonSetter("idRadtamt")
	public void setTest_amount(Float test_amount) {
		this.test_amount = test_amount;
	}

	@JsonGetter("idRadtasgnby")
	public int getAsign_by() {
		return asign_by;
	}

	@JsonSetter("idRadtasgnby")
	public void setAsign_by(int asign_by) {
		this.asign_by = asign_by;
	}

	@JsonGetter("idRadtasgndt")
	public String getAssign_date() {
		return assign_date;
	}

	@JsonSetter("idRadtasgndt")
	public void setAssign_date(String assign_date) {
		this.assign_date = assign_date;
	}
	
	@JsonGetter("reportDateTime")
	public String getReportDateTime() {
		return reportDateTime;
	}

	@JsonSetter("reportDateTime")
	public void setReportDateTime(String reportDateTime) {
		this.reportDateTime = reportDateTime;
	}

	
}
