package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name = "pathology_labtesttemplate")
public class LabsTestsTemplatesDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idlabTestTemplate;
	
	@Column(name = "test_template_name")
	private String testTemplateName;
	
	@Column(name = "test_template_text")
	private String testTemplateText;
	
	@Column(name = "impressions")
	private String impressions;
	
	@Transient
	List<LabsTestsTemplatesDTO>labTestTemplateList;

	public Integer getIdlabTestTemplate() {
		return idlabTestTemplate;
	}

	public void setIdlabTestTemplate(Integer idlabTestTemplate) {
		this.idlabTestTemplate = idlabTestTemplate;
	}

	public String getTestTemplateName() {
		return testTemplateName;
	}

	public void setTestTemplateName(String testTemplateName) {
		this.testTemplateName = testTemplateName;
	}

	public String getTestTemplateText() {
		return testTemplateText;
	}

	public void setTestTemplateText(String testTemplateText) {
		this.testTemplateText = testTemplateText;
	}

	public String getImpressions() {
		return impressions;
	}

	public void setImpressions(String impressions) {
		this.impressions = impressions;
	}

	@JsonGetter("labTestTemplateList")
	public List<LabsTestsTemplatesDTO> getLabTestTemplateList() {
		return labTestTemplateList;
	}

	@JsonSetter("labTestTemplateList")
	public void setLabTestTemplateList(List<LabsTestsTemplatesDTO> labTestTemplateList) {
		this.labTestTemplateList = labTestTemplateList;
	}

	@Override
	public String toString() {
		return "LabsTestsTemplatesDTO [idlabTestTemplate=" + idlabTestTemplate
				+ ", testTemplateName=" + testTemplateName
				+ ", testTemplateText=" + testTemplateText + ", impressions="
				+ impressions + ", labTestTemplateList=" + labTestTemplateList
				+ "]";
	}
	
	

}
