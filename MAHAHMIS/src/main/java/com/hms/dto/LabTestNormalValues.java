package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabTestNormalValues implements Serializable {
	private int idtestNormalValue;
	private int idTest;
	private String lowerVal;
	private String upperVal;
	private int idUnitType;
	private String sexType;
	private String nvStatus;
	private List<LabTestNormalValues> normalValueli;
	private String unitnm;
	
	private Double fage;
	private int age;
	private Double tage;
	private String male;
	private String female;
	private String others;
	private String cl;
	private String ch;
	private String oldandnew;
	private List<LabTestNormalValues> normalValuelindividual;
	private List<LabTestNormalValues> removenvl;
	private String newrow;
	/******new individual lab *****@author :paras suryawanshi***@date:19-Dec-2016***************************/

	
	
	@JsonGetter("newrow")
	public String getNewrow() {
		return newrow;
	}
	@JsonSetter("newrow")
	public void setNewrow(String newrow) {
		this.newrow = newrow;
	}
	
	
	@JsonGetter("removenvl")
	public List<LabTestNormalValues> getRemovenvl() {
		return removenvl;
	}
	
	@JsonSetter("removenvl")
	public void setRemovenvl(List<LabTestNormalValues> removenvl) {
		this.removenvl = removenvl;
	}
	
	@JsonGetter("normalValuelindividual")
	public List<LabTestNormalValues> getNormalValuelindividual() {
		return normalValuelindividual;
	}

	@JsonSetter("normalValuelindividual")
	public void setNormalValuelindividual(
			List<LabTestNormalValues> normalValuelindividual) {
		this.normalValuelindividual = normalValuelindividual;
	}
	
	@JsonGetter("oldandnew")
	public String getOldandnew() {
		return oldandnew;
	}

	@JsonSetter("oldandnew")
	public void setOldandnew(String oldandnew) {
		this.oldandnew = oldandnew;
	}
	@JsonGetter("fage")
	public Double getFage() {
		return fage;
	}

	@JsonSetter("fage")
	public void setFage(Double fage) {
		this.fage = fage;
	}
	@JsonGetter("age")
	public int getAge() {
		return age;
	}
	@JsonSetter("age")
	public void setAge(int age) {
		this.age = age;
		
	}
	@JsonGetter("ch")
	public String getCh() {
		return ch;
	}
	@JsonSetter("ch")
	public void setCh(String ch) {
		this.ch = ch;
	}
	@JsonGetter("cl")
	public String getCl() {
		return cl;
	}
	@JsonSetter("cl")
	public void setCl(String cl) {
		this.cl = cl;
	}
	@JsonGetter("female")
	public String getFemale() {
		return female;
	}
	@JsonSetter("female")
	public void setFemale(String female) {
		this.female = female;
	}
	@JsonGetter("tage")
	public Double getTage() {
		return tage;
	}
	@JsonSetter("tage")
	public void setTage(Double tage) {
		this.tage = tage;
	}
	@JsonGetter("male")
	public String getMale() {
		return male;
	}
	@JsonSetter("male")
	public void setMale(String male) {
		this.male = male;
	}
	@JsonGetter("others")
	public String getOthers() {
		return others;
	}
	@JsonSetter("others")
	public void setOthers(String others) {
		this.others = others;
	}
	/******new individual lab *****@author :paras suryawanshi***@date:19-Dec-2016***************************/
	
	
	
	
	
	@JsonGetter("unitnm")
	public String getUnitnm() {
		return unitnm;
	}

	@JsonGetter("unitnm")
	public void setUnitnm(String unitnm) {
		this.unitnm = unitnm;
	}

	@JsonGetter("nvid")
	public int getIdtestNormalValue() {
		return idtestNormalValue;
	}

	@JsonSetter("nvid")
	public void setIdtestNormalValue(int idtestNormalValue) {
		this.idtestNormalValue = idtestNormalValue;
	}

	@JsonGetter("tid")
	public int getIdTest() {
		return idTest;
	}

	@JsonSetter("tid")
	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}

	@JsonGetter("nvlv")
	public String getLowerVal() {
		return lowerVal;
	}

	@JsonSetter("nvlv")
	public void setLowerVal(String lowerVal) {
		this.lowerVal = lowerVal;
	}

	@JsonGetter("nvuv")
	public String getUpperVal() {
		return upperVal;
	}

	@JsonSetter("nvuv")
	public void setUpperVal(String upperVal) {
		this.upperVal = upperVal;
	}

	@JsonGetter("nvut")
	public int getIdUnitType() {
		return idUnitType;
	}

	@JsonSetter("nvut")
	public void setIdUnitType(int idUnitType) {
		this.idUnitType = idUnitType;
	}

	@JsonGetter("nvsx")
	public String getSexType() {
		return sexType;
	}

	@JsonSetter("nvsx")
	public void setSexType(String sexType) {
		this.sexType = sexType;
	}

	@JsonGetter("nvst")
	public String getNvStatus() {
		return nvStatus;
	}

	@JsonSetter("nvst")
	public void setNvStatus(String nvStatus) {
		this.nvStatus = nvStatus;
	}

	@JsonGetter("nvli")
	public List<LabTestNormalValues> getNormalValueli() {
		return normalValueli;
	}

	@JsonSetter("nvli")
	public void setNormalValueli(List<LabTestNormalValues> normalValueli) {
		this.normalValueli = normalValueli;
	}

}
