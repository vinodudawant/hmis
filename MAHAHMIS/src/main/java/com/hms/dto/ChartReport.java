package com.hms.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.json.simple.JSONArray;


public class ChartReport {
	private int cr_id;
	private int Treatment_ID;
	private String time;
	private String date;
	private String input;
	private String output;
	private String post_meal;

	private int sign;
	private int chart_id;

	Doctor objUsers = new Doctor();
	
	private String cname;
	private int idct;
	
	private String am8;
	private String am9;
	private String am10;
	private String am11;
	private String am12;
	private String am1;
	private String am2;
	private String am3;
	private String am4;
	private String am5;
	private String am6;
	private String am7;
	
	private String pm8;
	private String pm9;
	private String pm10;
	private String pm11;
	private String pm12;
	private String pm1;
	private String pm2;
	private String pm3;
	private String pm4;
	private String pm5;
	private String pm6;
	private String pm7;
	private float charges1;
	private List<ChartReport> listReport;
	private List<ComplaintsDTO> listChartSlave;
	private List<com.hms.ot.dto.Operation> OtSlaveList;
	


	@JsonGetter("OtSlvLst")
	public List<com.hms.ot.dto.Operation> getListOtSlaveList() {
		return OtSlaveList;
	}
	@JsonSetter("OtSlvLst")
	public void setListOtSlaveList(List<com.hms.ot.dto.Operation> listOtSlaveList) {
		this.OtSlaveList = listOtSlaveList;
	}
	@JsonGetter("listChartSlv")
	public List<ComplaintsDTO> getListChartSlave() {
		return listChartSlave;
	}
	@JsonSetter("listChartSlv")
	public void setListChartSlave(List<ComplaintsDTO> listChartSlave) {
		this.listChartSlave = listChartSlave;
	}
	
	/*private String status;
	
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
*/
	public float getCharges1() {
		return charges1;
	}

	public void setCharges1(float charges1) {
		this.charges1 = charges1;
	}

	
	@JsonGetter("am9")
	public String getAm9() {
		return am9;
	}
	
	@JsonSetter("am9")
	public void setAm9(String am9) {
		this.am9 = am9;
	}
	
	@JsonGetter("am10")
	public String getAm10() {
		return am10;
	}
	
	@JsonSetter("am10")
	public void setAm10(String am10) {
		this.am10 = am10;
	}
	
	@JsonGetter("am11")
	public String getAm11() {
		return am11;
	}
	
	@JsonSetter("am11")
	public void setAm11(String am11) {
		this.am11 = am11;
	}
	
	@JsonGetter("am12")
	public String getAm12() {
		return am12;
	}
	
	@JsonSetter("am12")
	public void setAm12(String am12) {
		this.am12 = am12;
	}
	
	@JsonGetter("am1")
	public String getAm1() {
		return am1;
	}
	
	@JsonSetter("am1")
	public void setAm1(String am1) {
		this.am1 = am1;
	}
	
	@JsonGetter("am2")
	public String getAm2() {
		return am2;
	}
	
	@JsonSetter("am2")
	public void setAm2(String am2) {
		this.am2 = am2;
	}
	
	@JsonGetter("am3")
	public String getAm3() {
		return am3;
	}
	
	@JsonSetter("am3")
	public void setAm3(String am3) {
		this.am3 = am3;
	}
	
	@JsonGetter("am4")
	public String getAm4() {
		return am4;
	}
	
	@JsonSetter("am4")
	public void setAm4(String am4) {
		this.am4 = am4;
	}
	
	@JsonGetter("am5")
	public String getAm5() {
		return am5;
	}
	
	@JsonSetter("am5")
	public void setAm5(String am5) {
		this.am5 = am5;
	}
	
	@JsonGetter("am6")
	public String getAm6() {
		return am6;
	}
	
	@JsonSetter("am6")
	public void setAm6(String am6) {
		this.am6 = am6;
	}
	
	@JsonGetter("am7")
	public String getAm7() {
		return am7;
	}
	
	@JsonSetter("am7")
	public void setAm7(String am7) {
		this.am7 = am7;
	}
	
	@JsonGetter("pm8")
	public String getPm8() {
		return pm8;
	}
	
	@JsonSetter("pm8")
	public void setPm8(String pm8) {
		this.pm8 = pm8;
	}
	
	@JsonGetter("pm9")
	public String getPm9() {
		return pm9;
	}
	
	@JsonSetter("pm9")
	public void setPm9(String pm9) {
		this.pm9 = pm9;
	}
	
	@JsonGetter("pm10")
	public String getPm10() {
		return pm10;
	}
	
	@JsonSetter("pm10")
	public void setPm10(String pm10) {
		this.pm10 = pm10;
	}
	
	@JsonGetter("pm11")
	public String getPm11() {
		return pm11;
	}
	
	@JsonSetter("pm11")
	public void setPm11(String pm11) {
		this.pm11 = pm11;
	}
	
	@JsonGetter("pm12")
	public String getPm12() {
		return pm12;
	}
	
	@JsonSetter("pm12")
	public void setPm12(String pm12) {
		this.pm12 = pm12;
	}
	
	@JsonGetter("pm1")
	public String getPm1() {
		return pm1;
	}
	
	@JsonSetter("pm1")
	public void setPm1(String pm1) {
		this.pm1 = pm1;
	}
	
	@JsonGetter("pm2")
	public String getPm2() {
		return pm2;
	}
	
	@JsonSetter("pm2")
	public void setPm2(String pm2) {
		this.pm2 = pm2;
	}
	
	@JsonGetter("pm3")
	public String getPm3() {
		return pm3;
	}
	
	@JsonSetter("pm3")
	public void setPm3(String pm3) {
		this.pm3 = pm3;
	}
	
	@JsonGetter("pm4")
	public String getPm4() {
		return pm4;
	}
	
	@JsonSetter("pm4")
	public void setPm4(String pm4) {
		this.pm4 = pm4;
	}
	
	@JsonGetter("pm5")
	public String getPm5() {
		return pm5;
	}
	
	@JsonSetter("pm5")
	public void setPm5(String pm5) {
		this.pm5 = pm5;
	}
	
	@JsonGetter("pm6")
	public String getPm6() {
		return pm6;
	}
	
	@JsonSetter("pm6")
	public void setPm6(String pm6) {
		this.pm6 = pm6;
	}
	
	@JsonGetter("pm7")
	public String getPm7() {
		return pm7;
	}
	
	@JsonSetter("pm7")
	public void setPm7(String pm7) {
		this.pm7 = pm7;
	}
	@JsonGetter("am8")
	public String getAm8() {
		return am8;
	}
	@JsonSetter("am8")
	public void setAm8(String am8) {
		this.am8 = am8;
	}
	
	

	/**
	 * @return the objUsers
	 */
	@JsonGetter("objU")
	public Doctor getObjUsers() {
		return objUsers;
	}

	/**
	 * @param objUsers
	 *            the objUsers to set
	 */
	@JsonSetter("objU")
	public void setObjUsers(Doctor objUsers) {
		this.objUsers = objUsers;
	}

	/**
	 * @return the cr_id
	 */
	@JsonGetter("crid")
	public int getCr_id() {
		return cr_id;
	}

	/**
	 * @param cr_id
	 *            the cr_id to set
	 */
	@JsonSetter("crid")
	public void setCr_id(int cr_id) {
		this.cr_id = cr_id;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("ti")
	public int getTreatment_ID() {
		return Treatment_ID;
	}

	/**
	 * @param treatment_ID
	 *            the treatment_ID to set
	 */
	@JsonSetter("ti")
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}

	/**
	 * @return the time
	 */
	@JsonGetter("tm")
	public String getTime() {
		return time;
	}

	/**
	 * @param timestamp
	 *            the time to set
	 */
	@JsonSetter("tm")
	public void setTime(String timestamp) {
		this.time = timestamp;
	}

	/**
	 * @return the input
	 */
	@JsonGetter("in")
	public String getInput() {
		return input;
	}

	/**
	 * @param input
	 *            the input to set
	 */
	@JsonSetter("in")
	public void setInput(String input) {
		this.input = input;
	}

	/**
	 * @return the output
	 */
	@JsonGetter("ot")
	public String getOutput() {
		return output;
	}

	/**
	 * @param output
	 *            the output to set
	 */
	@JsonSetter("ot")
	public void setOutput(String output) {
		this.output = output;
	}

	/**
	 * @return the sign
	 */

	@JsonGetter("pm")
	public String getPost_meal() {
		return post_meal;
	}

	@JsonSetter("pm")
	public void setPost_meal(String post_meal) {
		this.post_meal = post_meal;
	}

	@JsonGetter("sn")
	public int getSign() {
		return sign;
	}

	/**
	 * @param sign
	 *            the sign to set
	 */
	@JsonSetter("sn")
	public void setSign(int sign) {
		this.sign = sign;
	}

	/**
	 * @return the crList
	 */
	@JsonGetter("crl")
	public List<ChartReport> getCrList() {
		return crList;
	}

	/**
	 * @return the date
	 */
	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	/**
	 * @param date
	 *            the date to set
	 */
	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}

	/**
	 * @param crList
	 *            the crList to set
	 */
	@JsonSetter("crl")
	public void setCrList(List<ChartReport> crList) {
		this.crList = crList;
	}

	private List<ChartReport> crList;

	@JsonGetter("cid")
	public int getChart_id() {
		return chart_id;
	}

	/**
	 * @param chart_id
	 *            the chart_id to set
	 */
	@JsonSetter("cid")
	public void setChart_id(int chart_id) {
		this.chart_id = chart_id;
	}

	
	@JsonGetter("cname")
	public String getCname() {
		return cname;
	}

	@JsonSetter("cname")
	public void setCname(String cname) {
		this.cname = cname;
	}

	
	@JsonGetter("listReport")
	public List<ChartReport> getListReport() {
		return listReport;
	}

	
	@JsonSetter("listReport")
	public void setListReport(List<ChartReport> listReport) {
		this.listReport = listReport;
	}

	
	@JsonGetter("idct")
	public int getIdct() {
		return idct;
	}

	
	@JsonSetter("idct")
	public void setIdct(int idct) {
		this.idct = idct;
	}
}
