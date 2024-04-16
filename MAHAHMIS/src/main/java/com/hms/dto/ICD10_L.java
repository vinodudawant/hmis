package com.hms.dto;

import java.util.List;

public class ICD10_L {

	private int idicd10_L;

	private String icd_code_L;

	private String name_L;
	
	private String name_L1;
	
	private int icd_Flag;

	private List<ICD10_L> icd10_L_List;

	private List<ICD10_L1> icd10_L1_List;

	private List<ICD10_L2> icd10_L2_List;

	public int getIdicd10_L() {
		return idicd10_L;
	}

	public void setIdicd10_L(int idicd10_L) {
		this.idicd10_L = idicd10_L;
	}

	public String getIcd_code_L() {
		return icd_code_L;
	}

	public void setIcd_code_L(String icd_code_L) {
		this.icd_code_L = icd_code_L;
	}

	public String getName_L() {
		return name_L;
	}

	public void setName_L(String name_L) {
		this.name_L = name_L;
	}

	public List<ICD10_L> getIcd10_L_List() {
		return icd10_L_List;
	}

	public void setIcd10_L_List(List<ICD10_L> icd10_L_List) {
		this.icd10_L_List = icd10_L_List;
	}

	public List<ICD10_L1> getIcd10_L1_List() {
		return icd10_L1_List;
	}

	public void setIcd10_L1_List(List<ICD10_L1> icd10_L1_List) {
		this.icd10_L1_List = icd10_L1_List;
	}

	public List<ICD10_L2> getIcd10_L2_List() {
		return icd10_L2_List;
	}

	public void setIcd10_L2_List(List<ICD10_L2> icd10_L2_List) {
		this.icd10_L2_List = icd10_L2_List;
	}

	public String getName_L1() {
		return name_L1;
	}

	public void setName_L1(String name_L1) {
		this.name_L1 = name_L1;
	}

	public int getIcd_Flag() {
		return icd_Flag;
	}

	public void setIcd_Flag(int icd_Flag) {
		this.icd_Flag = icd_Flag;
	}

	
}