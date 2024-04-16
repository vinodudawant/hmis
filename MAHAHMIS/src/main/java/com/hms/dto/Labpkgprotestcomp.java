package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Labpkgprotestcomp {

	private int idlabpkgprotestcomp;
	private int idpkg;
	private int idProTest;
	private String typeTP;

	private String testName;
	private String testCode;
	private float testRate;

	private List<Labpkgprotestcomp> pkgprotestList;

	@JsonGetter("pkgprotstli")
	public List<Labpkgprotestcomp> getPkgprotestList() {
		return pkgprotestList;
	}

	@JsonSetter("pkgprotstli")
	public void setPkgprotestList(List<Labpkgprotestcomp> pkgprotestList) {
		this.pkgprotestList = pkgprotestList;
	}

	private List<Labpkgpro> labpkgproList;

	@JsonGetter("lbpkgproli")
	public List<Labpkgpro> getLabpkgproList() {
		return labpkgproList;
	}

	@JsonSetter("lbpkgproli")
	public void setLabpkgproList(List<Labpkgpro> labpkgproList) {
		this.labpkgproList = labpkgproList;
	}

	@JsonGetter("idpkgprotst")
	public int getIdlabpkgprotestcomp() {
		return idlabpkgprotestcomp;
	}

	@JsonSetter("idpkgprotst")
	public void setIdlabpkgprotestcomp(int idlabpkgprotestcomp) {
		this.idlabpkgprotestcomp = idlabpkgprotestcomp;
	}

	@JsonGetter("idpkg")
	public int getIdpkg() {
		return idpkg;
	}

	@JsonSetter("idpkg")
	public void setIdpkg(int idpkg) {
		this.idpkg = idpkg;
	}

	@JsonGetter("idprotst")
	public int getIdProTest() {
		return idProTest;
	}

	@JsonSetter("idprotst")
	public void setIdProTest(int idProTest) {
		this.idProTest = idProTest;
	}

	@JsonGetter("typeTP")
	public String getTypeTP() {
		return typeTP;
	}

	@JsonSetter("typeTP")
	public void setTypeTP(String typeTP) {
		this.typeTP = typeTP;
	}

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
}
