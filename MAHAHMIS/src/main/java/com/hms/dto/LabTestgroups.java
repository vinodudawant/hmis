

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabTestgroups implements Serializable {

	private int idtestgroups;

	private String name;

	private String status;

	private List<LabTestgroups> listLabTestgroups;

	private List<LabTests> listLabTest;

	

	
	
	@JsonGetter("liTests")
	public List<LabTests> getListLabTest() {
		return listLabTest;
	}

	@JsonSetter("liTests")
	public void setListLabTest(List<LabTests> listLabTest) {
		this.listLabTest = listLabTest;
	}

	@JsonGetter("idtg")
	public int getIdtestgroups() {
		return idtestgroups;
	}

	@JsonSetter("idtg")
	public void setIdtestgroups(int idtestgroups) {
		this.idtestgroups = idtestgroups;
	}

	@JsonGetter("gn")
	public String getName() {
		return name;
	}

	@JsonSetter("gn")
	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("listTestGrp")
	public List<LabTestgroups> getListLabTestgroups() {
		return listLabTestgroups;
	}

	@JsonSetter("listTestGrp")
	public void setListLabTestgroups(List<LabTestgroups> listLabTestgroups) {
		this.listLabTestgroups = listLabTestgroups;
	}

}
