

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabPatientGroupSlave implements Serializable {

	private int id_patienttests_master;

	private int idGrpSlave;

	private int groupId;

	private List<LabPatientGroupSlave> listGroupSlave;
	
	private LabTestgroups objLabTestgroups;
	
	private List<LabPatienttestsSlave> listtestslave;
	
	@JsonGetter("liTstSlave")
	public List<LabPatienttestsSlave> getListtestslave() {
		return listtestslave;
	}
@JsonSetter("liTstSlave")
	public void setListtestslave(List<LabPatienttestsSlave> listtestslave) {
		this.listtestslave = listtestslave;
	}

	@JsonGetter("objTstGrp")
	public LabTestgroups getObjLabTestgroups() {
		return objLabTestgroups;
	}
	@JsonSetter("objTstGrp")
	public void setObjLabTestgroups(LabTestgroups objLabTestgroups) {
		this.objLabTestgroups = objLabTestgroups;
	}

	@JsonGetter("idtestmstr")
	public int getId_patienttests_master() {
		return id_patienttests_master;
	}
	@JsonSetter("idtestmstr")
	public void setId_patienttests_master(int id_patienttests_master) {
		this.id_patienttests_master = id_patienttests_master;
	}

	@JsonGetter("idGrpSlave")
	public int getIdGrpSlave() {
		return idGrpSlave;
	}
	@JsonSetter("idGrpSlave")
	public void setIdGrpSlave(int idGrpSlave) {
		this.idGrpSlave = idGrpSlave;
	}

	@JsonGetter("grpId")
	public int getGroupId() {
		return groupId;
	}
	@JsonSetter("grpId")
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	@JsonGetter("liGrpSlave")
	public List<LabPatientGroupSlave> getListGroupSlave() {
		return listGroupSlave;
	}
	@JsonSetter("liGrpSlave")
	public void setListGroupSlave(List<LabPatientGroupSlave> listGroupSlave) {
		this.listGroupSlave = listGroupSlave;
	}

}
