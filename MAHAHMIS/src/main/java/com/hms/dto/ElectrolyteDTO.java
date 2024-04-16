package com.hms.dto;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "electrolyte")
public class ElectrolyteDTO implements Serializable
{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name =  "idelectrolyte")
	private int idelectrolyte;
	
	@Column(name = "treatment_id",columnDefinition="int(9) default 0")
	private Integer treatmentId=0;
	
	@Column(name = "date1",columnDefinition = "varchar(10) default ''")
	private String date1;
	
	@Column(name = "billirubin1",columnDefinition = "varchar(10) default ''")
	private String billirubin1;
	
	@Column(name = "total1",columnDefinition = "varchar(10) default ''")
	private String total1;
	
	@Column(name = "indirect1",columnDefinition = "varchar(10) default ''")
	private String indirect1;
	
	@Column(name = "direct1",columnDefinition = "varchar(10) default ''")
	private String direct1;
	
	@Column(name = "phototherapy1",columnDefinition = "varchar(10) default ''")
	private String phototherapy1;
	
	@Column(name = "date2",columnDefinition = "varchar(10) default ''")
	private String date2;
	
	@Column(name = "billirubin2",columnDefinition = "varchar(10) default ''")
	private String billirubin2;
	
	@Column(name = "total2",columnDefinition = "varchar(10) default ''")
	private String total2;
	
	@Column(name = "indirect2",columnDefinition = "varchar(10) default ''")
	private String indirect2;
	
	@Column(name = "direct2",columnDefinition = "varchar(10) default ''")
	private String direct2;
	
	@Column(name = "phototherapy2",columnDefinition = "varchar(10) default ''")
	private String phototherapy2;
	
	@Column(name = "date3",columnDefinition = "varchar(10) default ''")
	private String date3;
	
	@Column(name = "billirubin3",columnDefinition = "varchar(10) default ''")
	private String billirubin3;
	
	@Column(name = "total3",columnDefinition = "varchar(10) default ''")
	private String total3;
	
	@Column(name = "indirect3",columnDefinition = "varchar(10) default ''")
	private String indirect3;
	
	@Column(name = "direct3",columnDefinition = "varchar(10) default ''")
	private String direct3;
	
	@Column(name = "phototherapy3",columnDefinition = "varchar(10) default ''")
	private String phototherapy3;
	
	@Column(name = "date4",columnDefinition = "varchar(10) default ''")
	private String date4;
	
	@Column(name = "billirubin4",columnDefinition = "varchar(10) default ''")
	private String billirubin4;
	
	@Column(name = "total4",columnDefinition = "varchar(10) default ''")
	private String total4;
	
	@Column(name = "indirect4",columnDefinition = "varchar(10) default ''")
	private String indirect4;
	
	@Column(name = "direct4",columnDefinition = "varchar(10) default ''")
	private String direct4;
	
	@Column(name = "phototherapy4",columnDefinition = "varchar(10) default ''")
	private String phototherapy4;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	public String getDate1() {
		return date1;
	}

	public void setDate1(String date1) {
		this.date1 = date1;
	}
	
	

	public int getIdelectrolyte() {
		return idelectrolyte;
	}

	public void setIdelectrolyte(int idelectrolyte) {
		this.idelectrolyte = idelectrolyte;
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

	public String getBillirubin1() {
		return billirubin1;
	}

	public void setBillirubin1(String billirubin1) {
		this.billirubin1 = billirubin1;
	}

	public String getTotal1() {
		return total1;
	}

	public void setTotal1(String total1) {
		this.total1 = total1;
	}

	public String getIndirect1() {
		return indirect1;
	}

	public void setIndirect1(String indirect1) {
		this.indirect1 = indirect1;
	}

	public String getDirect1() {
		return direct1;
	}

	public void setDirect1(String direct1) {
		this.direct1 = direct1;
	}

	public String getPhototherapy1() {
		return phototherapy1;
	}

	public void setPhototherapy1(String phototherapy1) {
		this.phototherapy1 = phototherapy1;
	}

	public String getDate2() {
		return date2;
	}

	public void setDate2(String date2) {
		this.date2 = date2;
	}

	public String getBillirubin2() {
		return billirubin2;
	}

	public void setBillirubin2(String billirubin2) {
		this.billirubin2 = billirubin2;
	}

	public String getTotal2() {
		return total2;
	}

	public void setTotal2(String total2) {
		this.total2 = total2;
	}

	public String getIndirect2() {
		return indirect2;
	}

	public void setIndirect2(String indirect2) {
		this.indirect2 = indirect2;
	}

	public String getDirect2() {
		return direct2;
	}

	public void setDirect2(String direct2) {
		this.direct2 = direct2;
	}

	public String getPhototherapy2() {
		return phototherapy2;
	}

	public void setPhototherapy2(String phototherapy2) {
		this.phototherapy2 = phototherapy2;
	}

	public String getDate3() {
		return date3;
	}

	public void setDate3(String date3) {
		this.date3 = date3;
	}

	public String getBillirubin3() {
		return billirubin3;
	}

	public void setBillirubin3(String billirubin3) {
		this.billirubin3 = billirubin3;
	}

	public String getTotal3() {
		return total3;
	}

	public void setTotal3(String total3) {
		this.total3 = total3;
	}

	public String getIndirect3() {
		return indirect3;
	}

	public void setIndirect3(String indirect3) {
		this.indirect3 = indirect3;
	}

	public String getDirect3() {
		return direct3;
	}

	public void setDirect3(String direct3) {
		this.direct3 = direct3;
	}

	public String getPhototherapy3() {
		return phototherapy3;
	}

	public void setPhototherapy3(String phototherapy3) {
		this.phototherapy3 = phototherapy3;
	}

	public String getDate4() {
		return date4;
	}

	public void setDate4(String date4) {
		this.date4 = date4;
	}

	public String getBillirubin4() {
		return billirubin4;
	}

	public void setBillirubin4(String billirubin4) {
		this.billirubin4 = billirubin4;
	}

	public String getTotal4() {
		return total4;
	}

	public void setTotal4(String total4) {
		this.total4 = total4;
	}

	public String getIndirect4() {
		return indirect4;
	}

	public void setIndirect4(String indirect4) {
		this.indirect4 = indirect4;
	}

	public String getDirect4() {
		return direct4;
	}

	public void setDirect4(String direct4) {
		this.direct4 = direct4;
	}

	public String getPhototherapy4() {
		return phototherapy4;
	}

	public void setPhototherapy4(String phototherapy4) {
		this.phototherapy4 = phototherapy4;
	}
}
