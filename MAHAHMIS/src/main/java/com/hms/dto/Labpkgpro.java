package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Labpkgpro {

	private int idlabpkgpro;
	private int idlabpkgTestComp;
	private int idprofile;
	private int idTest;

	private String testName;
	private String testCode;
	private float testRate;

	@JsonGetter("tstNm")
	public String getTestName() {
		return testName;
	}

	@JsonSetter("tstNm")
	public void setTestName(String testName) {
		this.testName = testName;
	}

	@JsonGetter("tstCod")
	public String getTestCode() {
		return testCode;
	}

	@JsonSetter("tstCod")
	public void setTestCode(String testCode) {
		this.testCode = testCode;
	}

	@JsonGetter("tstRt")
	public float getTestRate() {
		return testRate;
	}

	@JsonSetter("tstRt")
	public void setTestRate(float testRate) {
		this.testRate = testRate;
	}

	private List<Labpkgpro> labpkgproList;

	@JsonGetter("idlbpkgpro")
	public int getIdlabpkgpro() {
		return idlabpkgpro;
	}

	@JsonSetter("idlbpkgpro")
	public void setIdlabpkgpro(int idlabpkgpro) {
		this.idlabpkgpro = idlabpkgpro;
	}

	@JsonGetter("idlbpkgtstco")
	public int getIdlabpkgTestComp() {
		return idlabpkgTestComp;
	}

	@JsonSetter("idlbpkgtstco")
	public void setIdlabpkgTestComp(int idlabpkgTestComp) {
		this.idlabpkgTestComp = idlabpkgTestComp;
	}

	@JsonGetter("idpro")
	public int getIdprofile() {
		return idprofile;
	}

	@JsonSetter("idpro")
	public void setIdprofile(int idprofile) {
		this.idprofile = idprofile;
	}

	@JsonGetter("idtst")
	public int getIdTest() {
		return idTest;
	}

	@JsonSetter("idtst")
	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}

	@JsonGetter("lbpkgproli")
	public List<Labpkgpro> getLabpkgproList() {
		return labpkgproList;
	}

	@JsonSetter("lbpkgproli")
	public void setLabpkgproList(List<Labpkgpro> labpkgproList) {
		this.labpkgproList = labpkgproList;
	}
}
