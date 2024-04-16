package com.hms.ecogreenapi;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "ecogrren_item_slave")
public class EcogrrenItemDto {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	String c_Code;
	String c_Name;
	String C_DrugName;
	String C_Mfac_Name;
	String c_Strength;
	String c_PackName;
	String category;
	String c_Uom;
	String n_Unit;
	String c_Hsn;
	String c_ScheduleName;
	String n_salable_online;
	public String getC_Code() {
		return c_Code;
	}
	public void setC_Code(String c_Code) {
		this.c_Code = c_Code;
	}
	public String getC_Name() {
		return c_Name;
	}
	public void setC_Name(String c_Name) {
		this.c_Name = c_Name;
	}
	public String getC_DrugName() {
		return C_DrugName;
	}
	public void setC_DrugName(String c_DrugName) {
		C_DrugName = c_DrugName;
	}
	public String getC_Mfac_Name() {
		return C_Mfac_Name;
	}
	public void setC_Mfac_Name(String c_Mfac_Name) {
		C_Mfac_Name = c_Mfac_Name;
	}
	public String getC_Strength() {
		return c_Strength;
	}
	public void setC_Strength(String c_Strength) {
		this.c_Strength = c_Strength;
	}
	public String getC_PackName() {
		return c_PackName;
	}
	public void setC_PackName(String c_PackName) {
		this.c_PackName = c_PackName;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getC_Uom() {
		return c_Uom;
	}
	public void setC_Uom(String c_Uom) {
		this.c_Uom = c_Uom;
	}
	public String getN_Unit() {
		return n_Unit;
	}
	public void setN_Unit(String n_Unit) {
		this.n_Unit = n_Unit;
	}
	public String getC_Hsn() {
		return c_Hsn;
	}
	public void setC_Hsn(String c_Hsn) {
		this.c_Hsn = c_Hsn;
	}
	public String getC_ScheduleName() {
		return c_ScheduleName;
	}
	public void setC_ScheduleName(String c_ScheduleName) {
		this.c_ScheduleName = c_ScheduleName;
	}
	public String getN_salable_online() {
		return n_salable_online;
	}
	public void setN_salable_online(String n_salable_online) {
		this.n_salable_online = n_salable_online;
	}
	@Override
	public String toString() {
		return "EcogrrenItemDto [c_Code=" + c_Code + ", c_Name=" + c_Name + ", C_DrugName=" + C_DrugName
				+ ", C_Mfac_Name=" + C_Mfac_Name + ", c_Strength=" + c_Strength + ", c_PackName=" + c_PackName
				+ ", category=" + category + ", c_Uom=" + c_Uom + ", n_Unit=" + n_Unit + ", c_Hsn=" + c_Hsn
				+ ", c_ScheduleName=" + c_ScheduleName + ", n_salable_online=" + n_salable_online + "]";
	}
	
	
	
	
	

}
