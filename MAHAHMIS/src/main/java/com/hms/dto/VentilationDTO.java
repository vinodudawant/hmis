package com.hms.dto;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name= "ventilation")
public class VentilationDTO implements Serializable
{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idventilation")
	private int idventilation;
	
	@Column(name = "treatment_id",columnDefinition="int(9) default 0")
	private Integer treatmentId=0;
	
	
	@Column(name = "mode1",columnDefinition = "varchar(20) default ''")
	private String mode1;
	
	@Column(name = "pip1",columnDefinition = "varchar(20) default ''")
	private String pip1;
	
	@Column(name = "peep1",columnDefinition = "varchar(20) default ''")
	private String peep1;
	
	@Column(name = "fio1",columnDefinition = "varchar(20) default ''")
	private String fio1;
	
	@Column(name = "mode2",columnDefinition = "varchar(20) default ''")
	private String mode2;
	
	@Column(name = "pip2",columnDefinition = "varchar(25) default ''")
	private String pip2;
	
	@Column(name = "peep2",columnDefinition = "varchar(25) default ''")
	private String peep2;
	
	@Column(name = "fio2",columnDefinition = "varchar(25) default ''")
	private String fio2;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	
	
	public int getIdventilation() {
		return idventilation;
	}

	public void setIdventilation(int idventilation) {
		this.idventilation = idventilation;
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

	public String getMode1() {
		return mode1;
	}

	public void setMode1(String mode1) {
		this.mode1 = mode1;
	}

	public String getPip1() {
		return pip1;
	}

	public void setPip1(String pip1) {
		this.pip1 = pip1;
	}

	public String getPeep1() {
		return peep1;
	}

	public void setPeep1(String peep1) {
		this.peep1 = peep1;
	}

	public String getFio1() {
		return fio1;
	}

	public void setFio1(String fio1) {
		this.fio1 = fio1;
	}

	public String getMode2() {
		return mode2;
	}

	public void setMode2(String mode2) {
		this.mode2 = mode2;
	}

	public String getPip2() {
		return pip2;
	}

	public void setPip2(String pip2) {
		this.pip2 = pip2;
	}

	public String getPeep2() {
		return peep2;
	}

	public void setPeep2(String peep2) {
		this.peep2 = peep2;
	}

	public String getFio2() {
		return fio2;
	}

	public void setFio2(String fio2) {
		this.fio2 = fio2;
	}
	
	
}
