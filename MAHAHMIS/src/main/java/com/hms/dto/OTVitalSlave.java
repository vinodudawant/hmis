package com.hms.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="ehat_ot_vital_slave")
public class OTVitalSlave {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idehat_ot_vital_slave;
	
	@Column(name = "id_ot_vital_master")
	private int id_ot_vital_master;
	
	@Column(name = "idchart_slave")
	private int idchart_slave;
	
	@Column(name = "vitals_value")
	private String vitals_value;
	
	@Transient
	List<OTVitalSlave>  lstOTvitalsdto;
	
	
	public List<OTVitalSlave> getLstOTvitalsdto() {
		return lstOTvitalsdto;
	}
	public void setLstOTvitalsdto(List<OTVitalSlave> lstOTvitalsdto) {
		this.lstOTvitalsdto = lstOTvitalsdto;
	}
	public int getIdehat_ot_vital_slave() {
		return idehat_ot_vital_slave;
	}
	public void setIdehat_ot_vital_slave(int idehat_ot_vital_slave) {
		this.idehat_ot_vital_slave = idehat_ot_vital_slave;
	}
	public int getId_ot_vital_master() {
		return id_ot_vital_master;
	}
	public void setId_ot_vital_master(int id_ot_vital_master) {
		this.id_ot_vital_master = id_ot_vital_master;
	}
	public int getIdchart_slave() {
		return idchart_slave;
	}
	public void setIdchart_slave(int idchart_slave) {
		this.idchart_slave = idchart_slave;
	}
	public String getVitals_value() {
		return vitals_value;
	}
	public void setVitals_value(String vitals_value) {
		this.vitals_value = vitals_value;
	}

}
