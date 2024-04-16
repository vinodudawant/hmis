

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class LabSubtest implements Serializable {

	private int idsubtest;

	private int groupid;

	private int testid;

	private String name;

	private String unit;

	private String normalrange;

	private String normalrangeM;

	private String normalrangeF;

	private String normalrangeC;

	private String referencerange;

	private List<LabSubtest> listSubTest;

	private String groupName;

	private String testName;

	private float patientamt;

	@JsonGetter("patAmt")
	public float getPatientamt() {
		return patientamt;
	}

	public void setPatientamt(float patientamt) {
		this.patientamt = patientamt;
	}

	@JsonGetter("grpnm")
	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	@JsonGetter("testnm")
	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	@JsonGetter("liSubTest")
	public List<LabSubtest> getListSubTest() {
		return listSubTest;
	}

	public void setListSubTest(List<LabSubtest> listSubTest) {
		this.listSubTest = listSubTest;
	}

	@JsonGetter("subtstid")
	public int getIdsubtest() {
		return idsubtest;
	}

	public void setIdsubtest(int idsubtest) {
		this.idsubtest = idsubtest;
	}

	@JsonGetter("grpid")
	public int getGroupid() {
		return groupid;
	}

	public void setGroupid(int groupid) {
		this.groupid = groupid;
	}

	@JsonGetter("tstid")
	public int getTestid() {
		return testid;
	}

	public void setTestid(int testid) {
		this.testid = testid;
	}

	@JsonGetter("subnm")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("unt")
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@JsonGetter("nrange")
	public String getNormalrange() {
		return normalrange;
	}

	public void setNormalrange(String normalrange) {
		this.normalrange = normalrange;
	}

	@JsonGetter("nrangeM")
	public String getNormalrangeM() {
		return normalrangeM;
	}

	public void setNormalrangeM(String normalrangeM) {
		this.normalrangeM = normalrangeM;
	}

	@JsonGetter("nrangeF")
	public String getNormalrangeF() {
		return normalrangeF;
	}

	public void setNormalrangeF(String normalrangeF) {
		this.normalrangeF = normalrangeF;
	}

	@JsonGetter("nrangeC")
	public String getNormalrangeC() {
		return normalrangeC;
	}

	public void setNormalrangeC(String normalrangeC) {
		this.normalrangeC = normalrangeC;
	}

	@JsonGetter("refrange")
	public String getReferencerange() {
		return referencerange;
	}

	public void setReferencerange(String referencerange) {
		this.referencerange = referencerange;
	}

}
