package com.hms.canteen.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "customizetemplate")
public class CustomizeTemplateDto {

	@Id
	@GeneratedValue
	@Column(name="idCustomizeTemplate")
	private int idCustomizeTemplate;
	
	@Column(name="temp_name")
	private String temp_name;
	
	@Column(name="temp_data")
	private String temp_data;
	
	@Column(name="type")
	private String type;
	
	@Column(name="specialization")
	private String specializaion;
	
	@Column(name="objectiveTempData")
	private String objectiveTempData;
	
	@Column(name="ipd_opd_flag")
	private String ipd_opd_flag;
	
	@Column(name="dietflag")
	private String dietflag;
	
	@Transient
	private List<CustomizeTemplateDto> lts;

	public int getIdCustomizeTemplate() {
		return idCustomizeTemplate;
	}

	public void setIdCustomizeTemplate(int idCustomizeTemplate) {
		this.idCustomizeTemplate = idCustomizeTemplate;
	}

	public String getTemp_name() {
		return temp_name;
	}

	public void setTemp_name(String temp_name) {
		this.temp_name = temp_name;
	}

	public String getTemp_data() {
		return temp_data;
	}

	public void setTemp_data(String temp_data) {
		this.temp_data = temp_data;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSpecializaion() {
		return specializaion;
	}

	public void setSpecializaion(String specializaion) {
		this.specializaion = specializaion;
	}

	public String getObjectiveTempData() {
		return objectiveTempData;
	}

	public void setObjectiveTempData(String objectiveTempData) {
		this.objectiveTempData = objectiveTempData;
	}

	public String getIpd_opd_flag() {
		return ipd_opd_flag;
	}

	public void setIpd_opd_flag(String ipd_opd_flag) {
		this.ipd_opd_flag = ipd_opd_flag;
	}

	public List<CustomizeTemplateDto> getLts() {
		return lts;
	}

	public void setLts(List<CustomizeTemplateDto> lts) {
		this.lts = lts;
	}

	public String getDietflag() {
		return dietflag;
	}

	public void setDietflag(String dietflag) {
		this.dietflag = dietflag;
	}
	
	
	
	
}
