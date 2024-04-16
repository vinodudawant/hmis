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
@Table(name = "ehat_lab_request_slave")
public class LabRequestSlaveDTO implements Serializable{


	@Id
	@GeneratedValue
	@Column(name = "lab_req_slv_id")
	int labReqSlvId=0;
	
	@Column(name = "lab_request_id")
	int labRequestId=0;
	
	@Column(name = "service_id")
	int serviceId=0;
	
	@Column(name = "sub_service_id")
	int subServiceId=0;
	
	@Column(name = "lab_test_code")
	String labTestCode="-";
	
	@Column(name = "result_gen_flag")
	char resultGenFlag='N';
	
	@Column(name = "result_gen_datetime")
	Calendar resultGenDateTime;

	@Column(name = "result_reject_flag")
	char resultRejectFlag='N';
	
	@Column(name = "result_reject_datetime")
	Calendar resultRejectDateTime;
	
	@Column(name = "reason_of_reject")
	String reasonOfReject="-";
	
	@Column(name = "result_of_lab")
	String resultOfLab="-";
	
	@Transient
	private List<LabRequestSlaveDTO> listLabRequestSlave;
	
	@Column(name = "bill_details_id")
	int billDetailsID=0;
	
	@Column(name = "result_in_number")
	double resuultOfLabNumber=0;
	
	@Column(name = "ref_doc_id")
	int refDocId=0;
	
	//Added by Laxman on 05-March for Packages
	@Column(name = "package_id",columnDefinition="int default 0")
	int packageId=0;
	
	@Column(name = "is_package_flag",columnDefinition="varchar(15) default 'N'")
	String isPackageFlag="N";
	
	@Column(name = "deleted_flag",columnDefinition="varchar(15) default 'N'")
	String deletedFlag="N";
	
	@Column(name = "delete_date_time")
	Date deleteDatetime;
	
	@Column(name = "deleted_by",columnDefinition="int default 0")
	int deletedBy=0;
	
	@Column(name = "dept_id",columnDefinition="int default 0")
	int deptId=0;
	
	public int getBillDetailsID() {
		return billDetailsID;
	}

	public void setBillDetailsID(int billDetailsID) {
		this.billDetailsID = billDetailsID;
	}

	public double getResuultOfLabNumber() {
		return resuultOfLabNumber;
	}

	public void setResuultOfLabNumber(double resuultOfLabNumber) {
		this.resuultOfLabNumber = resuultOfLabNumber;
	}

	public int getLabReqSlvId() {
		return labReqSlvId;
	}

	public void setLabReqSlvId(int labReqSlvId) {
		this.labReqSlvId = labReqSlvId;
	}

	public int getLabRequestId() {
		return labRequestId;
	}

	public void setLabRequestId(int labRequestId) {
		this.labRequestId = labRequestId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getSubServiceId() {
		return subServiceId;
	}

	public void setSubServiceId(int subServiceId) {
		this.subServiceId = subServiceId;
	}

	public String getLabTestCode() {
		return labTestCode;
	}

	public void setLabTestCode(String labTestCode) {
		this.labTestCode = labTestCode;
	}

	public char getResultGenFlag() {
		return resultGenFlag;
	}

	public void setResultGenFlag(char resultGenFlag) {
		this.resultGenFlag = resultGenFlag;
	}

	public Calendar getResultGenDateTime() {
		return resultGenDateTime;
	}

	public void setResultGenDateTime(Calendar resultGenDateTime) {
		this.resultGenDateTime = resultGenDateTime;
	}

	public char getResultRejectFlag() {
		return resultRejectFlag;
	}

	public void setResultRejectFlag(char resultRejectFlag) {
		this.resultRejectFlag = resultRejectFlag;
	}

	public Calendar getResultRejectDateTime() {
		return resultRejectDateTime;
	}

	public void setResultRejectDateTime(Calendar resultRejectDateTime) {
		this.resultRejectDateTime = resultRejectDateTime;
	}

	public String getReasonOfReject() {
		return reasonOfReject;
	}

	public void setReasonOfReject(String reasonOfReject) {
		this.reasonOfReject = reasonOfReject;
	}

	public String getResultOfLab() {
		return resultOfLab;
	}

	public void setResultOfLab(String resultOfLab) {
		this.resultOfLab = resultOfLab;
	}

	public List<LabRequestSlaveDTO> getListLabRequestSlave() {
		return listLabRequestSlave;
	}

	public void setListLabRequestSlave(List<LabRequestSlaveDTO> listLabRequestSlave) {
		this.listLabRequestSlave = listLabRequestSlave;
	}
	public int getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(int refDocId) {
		this.refDocId = refDocId;
	}

	public int getPackageId() {
		return packageId;
	}

	public void setPackageId(int packageId) {
		this.packageId = packageId;
	}

	public String getIsPackageFlag() {
		return isPackageFlag;
	}

	public void setIsPackageFlag(String isPackageFlag) {
		this.isPackageFlag = isPackageFlag;
	}

	public String getDeletedFlag() {
		return deletedFlag;
	}

	public void setDeletedFlag(String deletedFlag) {
		this.deletedFlag = deletedFlag;
	}

	public Date getDeleteDatetime() {
		return deleteDatetime;
	}

	public void setDeleteDatetime(Date deleteDatetime) {
		this.deleteDatetime = deleteDatetime;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

}
