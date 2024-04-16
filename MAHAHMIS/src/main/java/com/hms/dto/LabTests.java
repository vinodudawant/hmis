

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabTests implements Serializable {

	private static final long serialVersionUID = 1L;

	private int idtests;

	private int groupid;

	private String name;

	private float patientamt;

	private float reagentamt;

	private String testnote;

	private int labid;

	private String status;

	private List<LabTests> listlabTest;

	private List<LabSubtest> listLabSubTests;

	@JsonGetter("liSubTests")
	public List<LabSubtest> getListLabSubTests() {
		return listLabSubTests;
	}

	@JsonSetter("liSubTests")
	public void setListLabSubTests(List<LabSubtest> listLabSubTests) {
		this.listLabSubTests = listLabSubTests;
	}

	public LabTests() {
	}

	private String groupName;

	@JsonGetter("grpNm")
	public String getGroupName() {
		return groupName;
	}

	@JsonSetter("grpNm")
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	@JsonGetter("idTest")
	public int getIdtests() {
		return idtests;
	}

	@JsonSetter("idTest")
	public void setIdtests(int idtests) {
		this.idtests = idtests;
	}

	@JsonGetter("idgr")
	public int getGroupid() {
		return groupid;
	}

	@JsonSetter("idgr")
	public void setGroupid(int groupid) {
		this.groupid = groupid;

	}

	@JsonGetter("tName")
	public String getName() {
		return name;
	}

	@JsonSetter("tName")
	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("patAmt")
	public float getPatientamt() {
		return patientamt;
	}

	@JsonSetter("patAmt")
	public void setPatientamt(float patientamt) {
		this.patientamt = patientamt;

	}

	@JsonGetter("regAmt")
	public float getReagentamt() {
		return reagentamt;
	}

	@JsonSetter("regAmt")
	public void setReagentamt(float reagentamt) {
		this.reagentamt = reagentamt;

	}

	@JsonGetter("tNote")
	public String getTestnote() {
		return testnote;
	}

	@JsonSetter("tNote")
	public void setTestnote(String testnote) {
		this.testnote = testnote;
	}

	@JsonGetter("labid")
	public int getLabid() {
		return labid;
	}

	@JsonSetter("labid")
	public void setLabid(int labid) {
		this.labid = labid;

	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("listlabTest")
	public List<LabTests> getListlabTest() {
		return listlabTest;
	}

	@JsonSetter("listlabTest")
	public void setListlabTest(List<LabTests> listlabTest) {
		this.listlabTest = listlabTest;
	}

}
