package com.hms.ipd.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name ="IPD_DischargeProcess")
public class DischargeProcessDTO implements Serializable
{
	private static final long serialVersionUID = 1L; 
	
	@Id
	@GeneratedValue
	@Column(name = "idProcess")
	private int idProcess;
	
	@Column(name = "treatment_id")
	private int tId;
	
	
	@Column(name = "txtstartTime1")
	private String txtstartTime1;
	
	@Column(name = "txtstartTime2")
	private String txtstartTime2;
	
	@Column(name = "txtstartTime3")
	private String txtstartTime3;
	
	@Column(name = "txtstartTime4")
	private String txtstartTime4;
	
	@Column(name = "txtstartTime5")
	private String txtstartTime5;
	
	
	@Column(name = "txtstartTime6")
	private String txtstartTime6;
	
	@Column(name = "txtstartTime7")
	private String txtstartTime7;
	
	@Column(name = "txtstartTime8")
	private String txtstartTime8;
	
	@Column(name = "txtstartTime9")
	private String txtstartTime9;
	
	@Column(name = "txtstartTime10")
	private String txtstartTime10;
	
	
	@Column(name = "staffresp1")
	private String staffresp1;
	
	@Column(name = "staffresp2")
	private String staffresp2;
	
	@Column(name = "staffresp3")
	private String staffresp3;
	
	@Column(name = "staffresp4")
	private String staffresp4;
	
	@Column(name = "staffresp5")
	private String staffresp5;
	
	@Column(name = "staffresp6")
	private String staffresp6;
	
	@Column(name = "staffresp7")
	private String staffresp7;
	
	@Column(name = "staffresp8")
	private String staffresp8;
	
	@Column(name = "staffresp9")
	private String staffresp9;
	
	@Column(name = "staffresp10")
	private String staffresp10;
	
	
	@Column(name = "remark1")
	private String remark1;
	
	@Column(name = "remark2")
	private String remark2;
	
	@Column(name = "remark3")
	private String remark3;
	
	@Column(name = "remark4")
	private String remark4;
	
	@Column(name = "remark5")
	private String remark5;
	
	@Column(name = "remark6")
	private String remark6;
	
	@Column(name = "remark7")
	private String remark7;
	
	@Column(name = "remark8")
	private String remark8;
	
	@Column(name = "remark9")
	private String remark9;
	
	@Column(name = "remark10")
	private String remark10;
	
	@Column(name = "checkbox1")
	private String checkbox1;
	
	@Column(name = "checkbox2")
	private String checkbox2;
	
	@Column(name = "checkbox3")
	private String checkbox3;
	
	@Column(name = "checkbox4")
	private String checkbox4;
	
	@Column(name = "checkbox5")
	private String checkbox5;
	
	@Column(name = "checkbox6")
	private String checkbox6;
	
	@Column(name = "checkbox7")
	private String checkbox7;
	
	@Column(name = "checkbox8")
	private String checkbox8;
	
	@Column(name = "checkbox9")
	private String checkbox9;
	
	@Column(name = "checkbox10")
	private String checkbox10;
	
	@Column(name = "unit_id")
	private int unitid=1;
	
	
	@Column(name = "added_by",updatable=false)
	private int addedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;


	@Column(name = "updated_by")
	private int updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Transient
	private List<DischargeProcessDTO> processdatalist;

	public int getIdProcess() {
		return idProcess;
	}

	public int gettId() {
		return tId;
	}

	public String getTxtstartTime1() {
		return txtstartTime1;
	}

	public String getTxtstartTime2() {
		return txtstartTime2;
	}

	public String getTxtstartTime3() {
		return txtstartTime3;
	}

	public String getTxtstartTime4() {
		return txtstartTime4;
	}

	public String getTxtstartTime5() {
		return txtstartTime5;
	}

	public String getTxtstartTime6() {
		return txtstartTime6;
	}

	public String getTxtstartTime7() {
		return txtstartTime7;
	}

	public String getTxtstartTime8() {
		return txtstartTime8;
	}

	public String getTxtstartTime9() {
		return txtstartTime9;
	}

	public String getStaffresp1() {
		return staffresp1;
	}

	public String getStaffresp2() {
		return staffresp2;
	}

	public String getStaffresp3() {
		return staffresp3;
	}

	public String getStaffresp4() {
		return staffresp4;
	}

	public String getStaffresp5() {
		return staffresp5;
	}

	public String getStaffresp6() {
		return staffresp6;
	}

	public String getStaffresp7() {
		return staffresp7;
	}

	public String getStaffresp8() {
		return staffresp8;
	}

	public String getStaffresp9() {
		return staffresp9;
	}

	public String getRemark1() {
		return remark1;
	}

	public String getRemark2() {
		return remark2;
	}

	public String getRemark3() {
		return remark3;
	}

	public String getRemark4() {
		return remark4;
	}

	public String getRemark5() {
		return remark5;
	}

	public String getRemark6() {
		return remark6;
	}

	public String getRemark7() {
		return remark7;
	}

	public String getRemark8() {
		return remark8;
	}

	public String getRemark9() {
		return remark9;
	}

	public String getCheckbox1() {
		return checkbox1;
	}

	public String getCheckbox2() {
		return checkbox2;
	}

	public String getCheckbox3() {
		return checkbox3;
	}

	public String getCheckbox4() {
		return checkbox4;
	}

	public String getCheckbox5() {
		return checkbox5;
	}

	public String getCheckbox6() {
		return checkbox6;
	}

	public String getCheckbox7() {
		return checkbox7;
	}

	public String getCheckbox8() {
		return checkbox8;
	}

	public String getCheckbox9() {
		return checkbox9;
	}

	public int getUnitid() {
		return unitid;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public List<DischargeProcessDTO> getProcessdatalist() {
		return processdatalist;
	}

	public void setIdProcess(int idProcess) {
		this.idProcess = idProcess;
	}

	public void settId(int tId) {
		this.tId = tId;
	}

	public void setTxtstartTime1(String txtstartTime1) {
		this.txtstartTime1 = txtstartTime1;
	}

	public void setTxtstartTime2(String txtstartTime2) {
		this.txtstartTime2 = txtstartTime2;
	}

	public void setTxtstartTime3(String txtstartTime3) {
		this.txtstartTime3 = txtstartTime3;
	}

	public void setTxtstartTime4(String txtstartTime4) {
		this.txtstartTime4 = txtstartTime4;
	}

	public void setTxtstartTime5(String txtstartTime5) {
		this.txtstartTime5 = txtstartTime5;
	}

	public void setTxtstartTime6(String txtstartTime6) {
		this.txtstartTime6 = txtstartTime6;
	}

	public void setTxtstartTime7(String txtstartTime7) {
		this.txtstartTime7 = txtstartTime7;
	}

	public void setTxtstartTime8(String txtstartTime8) {
		this.txtstartTime8 = txtstartTime8;
	}

	public void setTxtstartTime9(String txtstartTime9) {
		this.txtstartTime9 = txtstartTime9;
	}

	public void setStaffresp1(String staffresp1) {
		this.staffresp1 = staffresp1;
	}

	public void setStaffresp2(String staffresp2) {
		this.staffresp2 = staffresp2;
	}

	public void setStaffresp3(String staffresp3) {
		this.staffresp3 = staffresp3;
	}

	public void setStaffresp4(String staffresp4) {
		this.staffresp4 = staffresp4;
	}

	public void setStaffresp5(String staffresp5) {
		this.staffresp5 = staffresp5;
	}

	public void setStaffresp6(String staffresp6) {
		this.staffresp6 = staffresp6;
	}

	public void setStaffresp7(String staffresp7) {
		this.staffresp7 = staffresp7;
	}

	public void setStaffresp8(String staffresp8) {
		this.staffresp8 = staffresp8;
	}

	public void setStaffresp9(String staffresp9) {
		this.staffresp9 = staffresp9;
	}

	public void setRemark1(String remark1) {
		this.remark1 = remark1;
	}

	public void setRemark2(String remark2) {
		this.remark2 = remark2;
	}

	public void setRemark3(String remark3) {
		this.remark3 = remark3;
	}

	public void setRemark4(String remark4) {
		this.remark4 = remark4;
	}

	public void setRemark5(String remark5) {
		this.remark5 = remark5;
	}

	public void setRemark6(String remark6) {
		this.remark6 = remark6;
	}

	public void setRemark7(String remark7) {
		this.remark7 = remark7;
	}

	public void setRemark8(String remark8) {
		this.remark8 = remark8;
	}

	public void setRemark9(String remark9) {
		this.remark9 = remark9;
	}

	public void setCheckbox1(String checkbox1) {
		this.checkbox1 = checkbox1;
	}

	public void setCheckbox2(String checkbox2) {
		this.checkbox2 = checkbox2;
	}

	public void setCheckbox3(String checkbox3) {
		this.checkbox3 = checkbox3;
	}

	public void setCheckbox4(String checkbox4) {
		this.checkbox4 = checkbox4;
	}

	public void setCheckbox5(String checkbox5) {
		this.checkbox5 = checkbox5;
	}

	public void setCheckbox6(String checkbox6) {
		this.checkbox6 = checkbox6;
	}

	public void setCheckbox7(String checkbox7) {
		this.checkbox7 = checkbox7;
	}

	public void setCheckbox8(String checkbox8) {
		this.checkbox8 = checkbox8;
	}

	public void setCheckbox9(String checkbox9) {
		this.checkbox9 = checkbox9;
	}

	public void setUnitid(int unitid) {
		this.unitid = unitid;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setProcessdatalist(List<DischargeProcessDTO> processdatalist) {
		this.processdatalist = processdatalist;
	}

	public String getTxtstartTime10() {
		return txtstartTime10;
	}

	public void setTxtstartTime10(String txtstartTime10) {
		this.txtstartTime10 = txtstartTime10;
	}

	public String getStaffresp10() {
		return staffresp10;
	}

	public void setStaffresp10(String staffresp10) {
		this.staffresp10 = staffresp10;
	}

	public String getRemark10() {
		return remark10;
	}

	public void setRemark10(String remark10) {
		this.remark10 = remark10;
	}

	public String getCheckbox10() {
		return checkbox10;
	}

	public void setCheckbox10(String checkbox10) {
		this.checkbox10 = checkbox10;
	}
	
	
	
	
}
