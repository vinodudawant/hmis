package com.hms.ot.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
@Entity
@Table(name = "ehat_preop_checklist_temp_slave")
public class SurgicalKitslave implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idTempTopicSlave")
	private int idTempTopicSlave;
	
	@Column(name = "preOperativeListName")
	@Type(type="text")
	private String preOperativeListName;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "unit_id")
	private int unitId;
	
	//@ManyToOne
	//@JoinColumn(name = "idTempTopic")
	//private SurgicalKitMaster surgicalKitMaster;

	public int getIdTempTopicSlave() {
		return idTempTopicSlave;
	}

	public void setIdTempTopicSlave(int idTempTopicSlave) {
		this.idTempTopicSlave = idTempTopicSlave;
	}

	public String getPreOperativeListName() {
		return preOperativeListName;
	}

	public void setPreOperativeListName(String preOperativeListName) {
		this.preOperativeListName = preOperativeListName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	@Override
	public String toString() {
		return "SurgicalKitslave [idTempTopicSlave=" + idTempTopicSlave + ", preOperativeListName="
				+ preOperativeListName + ", remark=" + remark + ", status=" + status + "]";
	}

	/*public SurgicalKitMaster getSurgicalKitMaster() {
		return surgicalKitMaster;
	}

	public void setSurgicalKitMaster(SurgicalKitMaster surgicalKitMaster) {
		this.surgicalKitMaster = surgicalKitMaster;
	}*/

	
}
