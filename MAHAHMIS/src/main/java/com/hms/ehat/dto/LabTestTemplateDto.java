package com.hms.ehat.dto;


import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity 
@Table(name = "ehat_lab_test_templates")
public class LabTestTemplateDto  implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "idlabtesttemplates")
	int idlabTestTemplates;
	
	@Column(name = "testTemplateName",columnDefinition="varchar(100) default NULL")
	String testTemplateName="-";
	
	@Column(name = "testTemplate",columnDefinition="TEXT default NULL")
	String testTemplate="-";
	
	@Column(name = "impressions",columnDefinition="varchar(900) default NULL")
	String impressions="-";
	
	@Column(name = "idTest",columnDefinition="int default 0")
	int idTest=0;
	
	@Transient
	private List<LabTestTemplateDto> listLabTestTemplate;

	public int getIdlabTestTemplates() {
		return idlabTestTemplates;
	}

	public void setIdlabTestTemplates(int idlabTestTemplates) {
		this.idlabTestTemplates = idlabTestTemplates;
	}

	public String getTestTemplateName() {
		return testTemplateName;
	}

	public void setTestTemplateName(String testTemplateName) {
		this.testTemplateName = testTemplateName;
	}

	public String getTestTemplate() {
		return testTemplate;
	}

	public void setTestTemplate(String testTemplate) {
		this.testTemplate = testTemplate;
	}

	public String getImpressions() {
		return impressions;
	}

	public void setImpressions(String impressions) {
		this.impressions = impressions;
	}

	public int getIdTest() {
		return idTest;
	}

	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}

	public List<LabTestTemplateDto> getListLabTestTemplate() {
		return listLabTestTemplate;
	}

	public void setListLabTestTemplate(List<LabTestTemplateDto> listLabTestTemplate) {
		this.listLabTestTemplate = listLabTestTemplate;
	}
	
	
}
