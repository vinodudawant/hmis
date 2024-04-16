/**
 * 
 */
package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

/**
 * @author shambhu
 * 
 */
public class LabTestMethod implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idtestMethod;
	private String methodName;
	private String methodCode;
	private String methodStatus;
	private List<LabTestMethod> testMethodlist;

	@JsonGetter("tmid")
	public int getIdtestMethod() {
		return idtestMethod;
	}

	@JsonGetter("tmid")
	public void setIdtestMethod(int idtestMethod) {
		this.idtestMethod = idtestMethod;
	}

	@JsonGetter("tmnm")
	public String getMethodName() {
		return methodName;
	}

	@JsonSetter("tmnm")
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	@JsonGetter("tmcd")
	public String getMethodCode() {
		return methodCode;
	}

	@JsonSetter("tmcd")
	public void setMethodCode(String methodCode) {
		this.methodCode = methodCode;
	}

	@JsonGetter("tmst")
	public String getMethodStatus() {
		return methodStatus;
	}

	@JsonSetter("tmst")
	public void setMethodStatus(String methodStatus) {
		this.methodStatus = methodStatus;
	}

	@JsonGetter("tmli")
	public List<LabTestMethod> getTestMethodlist() {
		return testMethodlist;
	}

	@JsonSetter("tmli")
	public void setTestMethodlist(List<LabTestMethod> testMethodlist) {
		this.testMethodlist = testMethodlist;
	}

}
