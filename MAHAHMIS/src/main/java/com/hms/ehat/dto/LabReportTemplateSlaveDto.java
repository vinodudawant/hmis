package com.hms.ehat.dto;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hms.pathology.dto.LabTestDTO;

@Entity
@Table(name = "pathology_report_template_slave")
public class LabReportTemplateSlaveDto  implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer reportTemplateSlaveId;

	@Column(name = "deleted", length = 2)
	private String deleted = "N";
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_id")
	private LabProfileDTO labProfileDTO;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "test_id")
	private LabTestDTO labTestDTO;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "service_id")
	private ServiceMasterDto serviceMasterDto;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "subservice_id")
	private SubServiceDto subServiceDto;

	
	public Integer getReportTemplateSlaveId() {
		return reportTemplateSlaveId;
	}

	public void setReportTemplateSlaveId(Integer reportTemplateSlaveId) {
		this.reportTemplateSlaveId = reportTemplateSlaveId;
	}

	public LabProfileDTO getLabProfileDTO() {
		return labProfileDTO;
	}

	public void setLabProfileDTO(LabProfileDTO labProfileDTO) {
		this.labProfileDTO = labProfileDTO;
	}

	public LabTestDTO getLabTestDTO() {
		return labTestDTO;
	}

	public void setLabTestDTO(LabTestDTO labTestDTO) {
		this.labTestDTO = labTestDTO;
	}

	public ServiceMasterDto getServiceMasterDto() {
		return serviceMasterDto;
	}

	public void setServiceMasterDto(ServiceMasterDto serviceMasterDto) {
		this.serviceMasterDto = serviceMasterDto;
	}

	public SubServiceDto getSubServiceDto() {
		return subServiceDto;
	}

	public void setSubServiceDto(SubServiceDto subServiceDto) {
		this.subServiceDto = subServiceDto;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	
	@Override
	public String toString() {
		return "LabReportTemplateSlaveDto [reportTemplateSlaveId=" + reportTemplateSlaveId + ", deleted=" + deleted
				+ ", labProfileDTO=" + labProfileDTO + ", labTestDTO=" + labTestDTO + ", serviceMasterDto="
				+ serviceMasterDto + ", subServiceDto=" + subServiceDto + "]";
	}
}