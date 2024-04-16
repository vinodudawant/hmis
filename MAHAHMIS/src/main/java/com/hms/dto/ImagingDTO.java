package com.hms.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "imaging")
public class ImagingDTO implements Serializable
{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idimaging")
	private int idimaging;
	
	@Column(name = "treatment_id",columnDefinition="int(9) default 0")
	private Integer treatmentId=0;
	
	@Column(name = "red_reflex_rt",columnDefinition = "varchar(10) default ''")
	private String redReflex1;
	
	@Column(name = "hips_rt",columnDefinition = "varchar(10) default ''")
	private String hips1;
	
	@Column(name = "fimorals_rt",columnDefinition = "varchar(10) default ''")
	private String femorals1;
	
	@Column(name = "genitals_rt",columnDefinition = "varchar(10) default ''")
	private String genitals1;
	
	@Column(name = "hernia_rt",columnDefinition = "varchar(10) default ''")
	private String hernia1;
	
	@Column(name = "head_cir_rt",columnDefinition = "varchar(10) default ''")
	private String headcir1;
	
	@Column(name = "other_rt",columnDefinition = "varchar(10) default ''")
	private String pcother1;
	
	@Column(name = "red_reflex_lt",columnDefinition = "varchar(10) default ''")
	private String redReflex2;
	
	@Column(name = "hips_lt",columnDefinition = "varchar(10) default ''")
	private String hips2;
	
	@Column(name = "fimorals_lt",columnDefinition = "varchar(10) default ''")
	private String femorals2;
	
	@Column(name = "genitals_lt",columnDefinition = "varchar(10) default ''")
	private String genitals2;
	
	@Column(name = "hernia_lt",columnDefinition = "varchar(10) default ''")
	private String hernia2;
	
	@Column(name = "head_cir_lt",columnDefinition = "varchar(10) default ''")
	private String headcir2;
	
	@Column(name = "other_lt",columnDefinition = "varchar(10) default ''")
	private String pcother2;

	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	
	
	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getIdimaging() {
		return idimaging;
	}

	public void setIdimaging(int idimaging) {
		this.idimaging = idimaging;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getRedReflex1() {
		return redReflex1;
	}

	public void setRedReflex1(String redReflex1) {
		this.redReflex1 = redReflex1;
	}

	public String getHips1() {
		return hips1;
	}

	public void setHips1(String hips1) {
		this.hips1 = hips1;
	}

	public String getFemorals1() {
		return femorals1;
	}

	public void setFemorals1(String femorals1) {
		this.femorals1 = femorals1;
	}

	public String getGenitals1() {
		return genitals1;
	}

	public void setGenitals1(String genitals1) {
		this.genitals1 = genitals1;
	}

	public String getHernia1() {
		return hernia1;
	}

	public void setHernia1(String hernia1) {
		this.hernia1 = hernia1;
	}

	public String getHeadcir1() {
		return headcir1;
	}

	public void setHeadcir1(String headcir1) {
		this.headcir1 = headcir1;
	}

	public String getPcother1() {
		return pcother1;
	}

	public void setPcother1(String pcother1) {
		this.pcother1 = pcother1;
	}

	public String getRedReflex2() {
		return redReflex2;
	}

	public void setRedReflex2(String redReflex2) {
		this.redReflex2 = redReflex2;
	}

	public String getHips2() {
		return hips2;
	}

	public void setHips2(String hips2) {
		this.hips2 = hips2;
	}

	public String getFemorals2() {
		return femorals2;
	}

	public void setFemorals2(String femorals2) {
		this.femorals2 = femorals2;
	}

	public String getGenitals2() {
		return genitals2;
	}

	public void setGenitals2(String genitals2) {
		this.genitals2 = genitals2;
	}

	public String getHernia2() {
		return hernia2;
	}

	public void setHernia2(String hernia2) {
		this.hernia2 = hernia2;
	}

	public String getHeadcir2() {
		return headcir2;
	}

	public void setHeadcir2(String headcir2) {
		this.headcir2 = headcir2;
	}

	public String getPcother2() {
		return pcother2;
	}

	public void setPcother2(String pcother2) {
		this.pcother2 = pcother2;
	}
}
