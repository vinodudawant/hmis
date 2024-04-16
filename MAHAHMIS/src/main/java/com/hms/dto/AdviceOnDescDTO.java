package com.hms.dto;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "advice_on_desc")
public class AdviceOnDescDTO  implements Serializable
{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idadvice_on_desc")
	private int idadvice_on_desc;
	
	@Column(name = "treatment_id",columnDefinition="int(9) default 0")
	private Integer treatmentId=0;
	
	@Column(name = "rop_screening_dt",columnDefinition = "varchar(10) default ''")
	private String ropScreen1;
	
	@Column(name = "hearing_screening_dt",columnDefinition = "varchar(10) default ''")
	private String hearingScreen1;
	
	@Column(name = "usg_brain_dt",columnDefinition = "varchar(10) default ''")
	private String usgBrain1;
	
	@Column(name = "other_dt",columnDefinition = "varchar(10) default ''")
	private String adother1;
	
	@Column(name = "rop_screening_place",columnDefinition = "varchar(10) default ''")
	private String ropScreen2;
	
	@Column(name = "hearing_screening_place",columnDefinition = "varchar(10) default ''")
	private String hearingScreen2;
	
	@Column(name = "usg_brain_place",columnDefinition = "varchar(10) default ''")
	private String usgBrain2;
	
	@Column(name = "other_place",columnDefinition = "varchar(10) default ''")
	private String adother2;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	public String getRopScreen1() {
		return ropScreen1;
	}

	public void setRopScreen1(String ropScreen1) {
		this.ropScreen1 = ropScreen1;
	}
	
	

	public int getIdadvice_on_desc() {
		return idadvice_on_desc;
	}

	public void setIdadvice_on_desc(int idadvice_on_desc) {
		this.idadvice_on_desc = idadvice_on_desc;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getHearingScreen1() {
		return hearingScreen1;
	}

	public void setHearingScreen1(String hearingScreen1) {
		this.hearingScreen1 = hearingScreen1;
	}

	public String getUsgBrain1() {
		return usgBrain1;
	}

	public void setUsgBrain1(String usgBrain1) {
		this.usgBrain1 = usgBrain1;
	}

	public String getAdother1() {
		return adother1;
	}

	public void setAdother1(String adother1) {
		this.adother1 = adother1;
	}

	public String getRopScreen2() {
		return ropScreen2;
	}

	public void setRopScreen2(String ropScreen2) {
		this.ropScreen2 = ropScreen2;
	}

	public String getHearingScreen2() {
		return hearingScreen2;
	}

	public void setHearingScreen2(String hearingScreen2) {
		this.hearingScreen2 = hearingScreen2;
	}

	public String getUsgBrain2() {
		return usgBrain2;
	}

	public void setUsgBrain2(String usgBrain2) {
		this.usgBrain2 = usgBrain2;
	}

	public String getAdother2() {
		return adother2;
	}

	public void setAdother2(String adother2) {
		this.adother2 = adother2;
	}

}
