package com.hms.dto;

import java.util.List;

import com.hms.administrator.dto.ICD10_L;

public class ICD10_L2 {

	private int idicd10_L2;

	private String icd_code_L2;

	private String name_L2;

	private int idicd10_L1;

	private List<ICD10_L> icd10_L_List;

	private List<ICD10_L1> icd10_L1_List;

	private List<ICD10_L2> icd10_L2_List;

	public int getIdicd10_L2() {
		return idicd10_L2;
	}

	public void setIdicd10_L2(int idicd10_L2) {
		this.idicd10_L2 = idicd10_L2;
	}

	public String getIcd_code_L2() {
		return icd_code_L2;
	}

	public void setIcd_code_L2(String icd_code_L2) {
		this.icd_code_L2 = icd_code_L2;
	}

	public String getName_L2() {
		return name_L2;
	}

	public void setName_L2(String name_L2) {
		this.name_L2 = name_L2;
	}

	public int getIdicd10_L1() {
		return idicd10_L1;
	}

	public void setIdicd10_L1(int idicd10_L1) {
		this.idicd10_L1 = idicd10_L1;
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

}
