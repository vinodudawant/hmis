package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.dto.SubInventoryDTO;
import com.hms.ehat.controller.Fetchprocedure;
import com.hms.ehat.controller.OTPercentageDTO;
import com.hms.ehat.dao.OTDao;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.Ehat_freez_details;
import com.hms.ehat.dto.Ehat_view_ot_operation_records;
import com.hms.ehat.dto.Freezdto;
import com.hms.ehat.dto.GetPopUpDataForOTDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.OTConsentFormDTO;
import com.hms.ehat.dto.OTDashboardDTO;
import com.hms.ehat.dto.OTReportDto;
import com.hms.ehat.dto.OTbilldetaildto;
import com.hms.ehat.dto.OperationMaster;
import com.hms.ehat.dto.Ot_cathlabDto;
import com.hms.ehat.dto.ProcedureCat;
import com.hms.ehat.dto.SurgreyWiseDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.otConsentDTO;
import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.ot.dto.Operation;
import com.hms.ot.dto.PtientOperation;
import com.hms.ot.dto.TreatmentOperations;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.ProductMaster;

@Repository
public class OtDaoImpl implements OTDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveOTdetails(String ehatOtherBillDetailForIpdDto, String queryType, String callform,
			HttpServletRequest request, int othersid, int treatmentoperationid, Double tamount) {
		// converting J-son list in java object
		// EhatOtherBillDetailForIpdDto obj=new EhatOtherBillDetailForIpdDto();
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id

		EhatOtherBillDetailForIpdDto obj = (EhatOtherBillDetailForIpdDto) ConfigUIJSONUtility
				.getObjectFromJSON(ehatOtherBillDetailForIpdDto, EhatOtherBillDetailForIpdDto.class);
		Double d = 0.0;
		String flg = "";
		if (callform.equals("OTINV")) {

			flg = "I";

		} else if (callform.equals("OTDRUG") || callform.equals("OTCATH")) {

			flg = "P";

		} else if (callform.equals("OTCHARG")) {
			flg = "C";
		} else if (callform.equals("CPOE")) {
			flg = "E";
		} else {
			flg = "L";
			d = (Double) sessionFactory.getCurrentSession()
					.createSQLQuery("select pur_slave_mrp from pharma_purchase_slave where pur_slave_product_id="
							+ obj.getListEhatOtherBillDetailForIpd().get(0).getChildSubServiceId()
							+ " order by pur_slave_id desc limit 1")
					.uniqueResult();
		}

		Object id = new Object();
		Object id2 = new Object();
		Object id3 = new Object();

		int records = -1;
		Integer sponserid = 0;
		Integer slaveid = 0;
		String otprocusre = null;
		int billdetailsid = 0;
		try {

			SQLQuery query13 = sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT count(*) FROM ehat_bill_details_ipd where ot_flag='Y'  and "
							+ "  deleted='N'  and  count_ot =" + treatmentoperationid + " and  patient_id="
							+ obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId() + " and treatment_id="
							+ obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId() + " and bill_id="
							+ obj.getListEhatOtherBillDetailForIpd().get(0).getBillId() + " ");
			id2 = query13.uniqueResult();
			int count = ((BigInteger) id2).intValue();
			int otcount = 0;
			if (count > 0) {
				SQLQuery query21 = sessionFactory.getCurrentSession()
						.createSQLQuery("SELECT count(*) FROM ehat_bill_details_ipd where ot_flag='Y'  and "
								+ "   drdesk_flag=" + '"' + flg + '"' + "   and deleted='N'  and  count_ot ="
								+ treatmentoperationid + " and  patient_id="
								+ obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId() + " and treatment_id="
								+ obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId() + " and bill_id="
								+ obj.getListEhatOtherBillDetailForIpd().get(0).getBillId() + " ");
				id3 = query21.uniqueResult();
				otcount = ((BigInteger) id3).intValue();
			}

			SQLQuery querysp = sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT source_type_id,charges_master_slave_id FROM markvisitview where "
							+ "  patient_id=" + obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId()
							+ " and treatment_id=" + obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId()
							+ " ");
			querysp.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> data1 = querysp.list();
			for (Map<String, Object> row : data1) {
				sponserid = (Integer) row.get("source_type_id");
				slaveid = (Integer) row.get("charges_master_slave_id");
			}

			/*
			 * if(count >0){ SQLQuery query12 = sessionFactory.getCurrentSession().
			 * createSQLQuery("SELECT ot_procedure FROM ehat_bill_details_ipd where ot_flag='Y'  and "
			 * + "  deleted='N'  and patient_id="+
			 * obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId()
			 * +" and treatment_id="+
			 * obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId()
			 * +" and bill_id="+ obj.getListEhatOtherBillDetailForIpd().get(0).getBillId()
			 * +" ");
			 * 
			 * query12.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
			 * Object>> otdetails = query12.list(); for(Map<String, Object> row :
			 * otdetails){ otprocusre=(String)row.get("ot_procedure"); } }
			 */

			for (EhatOtherBillDetailForIpdDto objdto : obj.getListEhatOtherBillDetailForIpd()) {

				List<Integer> procid = new ArrayList<Integer>();
				BillDetailsIpdDto billdetails = new BillDetailsIpdDto();

				/*
				 * if(id!=null){ System.err.println("biiideeiddddddddd="+
				 * objdto.getOtherbildetailidipd()); if(objdto.getOtherbildetailidipd() > 0){
				 * billdetailsid = (Integer) id; }else{ billdetailsid=0; }
				 * 
				 * 
				 * }
				 */
				/*
				 * BillDetailsIpdDto billdetails = new BillDetailsIpdDto(); if(count >0){
				 * 
				 * if(!otprocusre.equals(null)){ System.err.println("biiideeiddddddddd="+
				 * otprocusre); String otpr[]= otprocusre.split(",");
				 * 
				 * for(int i=0;i < otpr.length;i++ ){ int id1=Integer.parseInt(otpr[i]);
				 * procid.add(id1);
				 * 
				 * } int totalprid=0; String proce2=objdto.getOtprocedure(); String otpr1[]=
				 * proce2.split(","); for(int i=0;i < otpr1.length;i++ ){
				 * if(!procid.contains(Integer.parseInt(otpr1[i]))){
				 * 
				 * totalprid ++;
				 * 
				 * }
				 * 
				 * 
				 * }
				 * 
				 * if(totalprid >0){ billdetails.setBillDetailsId(0);
				 * billdetails.setPatienttId(objdto.getPatienttId());
				 * billdetails.setTreatmentId(objdto.getTreatmentId());
				 * billdetails.setBillId(objdto.getBillId());
				 * billdetails.setAmount(objdto.getAmount());
				 * billdetails.setCoPay(objdto.getCoPay()); billdetails.setPay(0);
				 * billdetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				 * billdetails.setOt_flag("Y"); billdetails.setDeleted("N");
				 * billdetails.setDepartmentId(2); billdetails.setUnitId(1);
				 * billdetails.setPatientCatId(0); billdetails.setQuantity(1);
				 * billdetails.setServiceId(objdto.getServiceId());
				 * billdetails.setSubServiceId(objdto.getSubServiceId());
				 * billdetails.setUrgentFlag("N");
				 * billdetails.setOtprocedure(objdto.getOtprocedure());
				 * sessionFactory.getCurrentSession().merge(billdetails); }else{
				 * 
				 * billdetails.setBillDetailsId(objdto.getBillDetailsId());
				 * billdetails.setPatienttId(objdto.getPatienttId());
				 * billdetails.setTreatmentId(objdto.getTreatmentId());
				 * billdetails.setBillId(objdto.getBillId());
				 * billdetails.setAmount(objdto.getAmount());
				 * billdetails.setCoPay(objdto.getCoPay()); billdetails.setPay(0);
				 * billdetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				 * billdetails.setOt_flag("Y"); billdetails.setDeleted("N");
				 * billdetails.setDepartmentId(2); billdetails.setUnitId(1);
				 * billdetails.setPatientCatId(0); billdetails.setQuantity(1);
				 * billdetails.setServiceId(objdto.getServiceId());
				 * billdetails.setSubServiceId(objdto.getSubServiceId());
				 * billdetails.setUrgentFlag("N");
				 * billdetails.setOtprocedure(objdto.getOtprocedure());
				 * sessionFactory.getCurrentSession().merge(billdetails); }
				 * 
				 * 
				 * } }else {
				 * 
				 * 
				 * billdetails.setBillDetailsId(0);
				 * billdetails.setPatienttId(objdto.getPatienttId());
				 * billdetails.setTreatmentId(objdto.getTreatmentId());
				 * billdetails.setBillId(objdto.getBillId());
				 * billdetails.setAmount(objdto.getAmount());
				 * billdetails.setCoPay(objdto.getCoPay()); billdetails.setPay(0);
				 * billdetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				 * billdetails.setOt_flag("Y"); billdetails.setDeleted("N");
				 * billdetails.setDepartmentId(2); billdetails.setUnitId(1);
				 * billdetails.setPatientCatId(0); billdetails.setQuantity(1);
				 * billdetails.setServiceId(objdto.getServiceId());
				 * billdetails.setSubServiceId(objdto.getSubServiceId());
				 * billdetails.setUrgentFlag("N");
				 * 
				 * sessionFactory.getCurrentSession().merge(billdetails); }
				 */
///invetory stock update	

				// for update
				Double amount11 = 0.0;
				double totalamount = 0.0;
				// Afterwards, do a sum on the desired field
				if (count > 0) {
					if (otcount > 0) {
//							SQLQuery sql =sessionFactory.getCurrentSession().createSQLQuery("SELECT max(bill_details_id) FROM ehat_bill_details_ipd where ot_flag='Y'  and " +
//						    		"  deleted='N'  and   drdesk_flag=" + "'" + flg + "'" +"  and  count_ot ="+ treatmentoperationid +" and  patient_id="+ obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId() +" and treatment_id="+ obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId() +" and bill_id="+ obj.getListEhatOtherBillDetailForIpd().get(0).getBillId() +" ");
						SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT max(bill_details_id) FROM ehat_bill_details_ipd where ot_flag='Y'  and "
										+ "  deleted='N'  and drdesk_flag=" + "'" + flg + "'" + " and count_ot ="
										+ treatmentoperationid + " and  patient_id="
										+ obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId()
										+ " and treatment_id="
										+ obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId()
										+ " and bill_id=" + obj.getListEhatOtherBillDetailForIpd().get(0).getBillId()
										+ " ");

						id = sql.uniqueResult();
						billdetailsid = (Integer) id;

						if (objdto.getOtherbildetailidipd() == 0) {

							// for insert
							if (sponserid != null || sponserid != 0 && slaveid != null || slaveid != 0) {
								objdto.setOtherPay(objdto.getOtherAmount());
								objdto.setOtherCoPay(0);
								// objdto.setCoPay(0);
								/// objdto.setPay(objdto.getAmount());
								objdto.setChargesId(sponserid);
								objdto.setChargesSlaveId(slaveid);
								objdto.setSponsorId(1);
							} else {
								// objdto.setCoPay(objdto.getAmount());
								// objdto.setPay(0);
								objdto.setOtherPay(objdto.getOtherAmount());
								// objdto.setOtherCoPay(objdto.getAmount());
								objdto.setOtherCoPay(0);
							}
							objdto.setCountot(treatmentoperationid);
							objdto.setBillDetailsId(billdetailsid);
							objdto.setCreatedBy(userId);
							objdto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
							objdto.setDeleted("N");
							objdto.setBatchId(objdto.getBatchId());
							objdto.setBatchCode(objdto.getBatchCode());
							objdto.setBatchExp(objdto.getBatchExp());
							objdto.setDrdeskflag(flg);
							objdto.setMrnSlaveID(othersid);
							sessionFactory.getCurrentSession().merge(objdto);
						}
						if (objdto.getOtherbildetailidipd() > 0) {

							if (sponserid != null || sponserid != 0 && slaveid != null || slaveid != 0) {
								objdto.setOtherPay(objdto.getOtherAmount());
								objdto.setOtherCoPay(0);
								// objdto.setCoPay(0);
								// objdto.setPay(objdto.getAmount());
								objdto.setChargesId(sponserid);
								objdto.setChargesSlaveId(slaveid);
								objdto.setSponsorId(1);
							} else {
								// objdto.setCoPay(objdto.getAmount());
								// objdto.setPay(0);
								objdto.setOtherPay(0);
								objdto.setOtherCoPay(objdto.getAmount());
							}

							objdto.setCountot(treatmentoperationid);
							objdto.setBillDetailsId(billdetailsid);
							objdto.setUpdatedBy(userId);
							objdto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
							objdto.setDeleted("N");
							objdto.setDrdeskflag(flg);
							objdto.setAmount(objdto.getAmount());
							objdto.setRate(objdto.getRate());
							objdto.setQuantity(objdto.getQuantity());
							objdto.setMrnSlaveID(othersid);
							// System.err.println("idot="+ objdto.getOtherbildetailidipd() );
							// System.err.print("qity=-=-=-=-=>"+objdto.getQuantity());

							try {

								if (callform.equals("OTDRUG")) {
									updateOtDrugStockOnEditOtDrug(obj, queryType, request);
								} else if (callform.equals("OTINV")) {
									
									if(queryType.equalsIgnoreCase("update"))
										updateOtInvStockOnEditOtInventory(obj, queryType, request);
									
								}
								sessionFactory.getCurrentSession().merge(objdto);

							} catch (Exception e) {

							}

						}

						String flagnew = "'" + flg + "'";
						Double sum = (Double) sessionFactory.getCurrentSession()
								.createCriteria(EhatOtherBillDetailForIpdDto.class)

								.setProjection(Projections.sum("amount"))
								.add(Restrictions.eq("treatmentId", objdto.getTreatmentId()))
								.add(Restrictions.eq("patienttId", objdto.getPatienttId()))
								.add(Restrictions.eq("countot", treatmentoperationid))
								.add(Restrictions.eq("otherflag", flg)).add(Restrictions.eq("deleted", "N"))
								.uniqueResult();
						System.out.println("Sum>>>>>>>>>>>>>>>" + sum);

						totalamount = sum;
						amount11 = objdto.getAmount();
//    		System.out.println("Total of fee columm : " + totalamount);

						if (objdto.getBillDetailsId() == 0) {
							Integer billid = billdetailsid + 1;
							billdetails.setBillDetailsId(billid);
							billdetails.setPatienttId(objdto.getPatienttId());
							billdetails.setTreatmentId(objdto.getTreatmentId());
							billdetails.setBillId(objdto.getBillId());

							billdetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));
							billdetails.setOt_flag("Y");
							billdetails.setDeleted("N");
							billdetails.setDepartmentId(2);
							billdetails.setUnitId(1);
							billdetails.setPatientCatId(0);
							billdetails.setQuantity(objdto.getQuantity());
							billdetails.setServiceId(objdto.getServiceId());
							if (callform.equals("OTINV") || callform.equals("OTDRUG") || callform.equals("OTCATH")) {
								billdetails.setSubServiceId(objdto.getSubServiceId());
							} else {
								billdetails.setSubServiceId(objdto.getSubServiceId());
							}
							billdetails.setUrgentFlag("N");
							billdetails.setCountot(treatmentoperationid);
							billdetails.setDrdeskflag(flg);
							billdetails.setOtprocedure(objdto.getOtprocedure());

							if (totalamount != 0.0) {
								billdetails.setAmount(amount11);
								if (flg.equals("L")) {
									if (d != null) {
										// billdetails.setRate(totalamount);
										billdetails.setRate(amount11);
										billdetails.setOtherAmount(totalamount);

										billdetails.setOtherRate(d);
									}

								} else {
									billdetails.setRate(objdto.getRate());
								}

								if (sponserid != null || sponserid != 0 && slaveid != null || slaveid != 0) {
									Double sumother = (Double) sessionFactory.getCurrentSession()
											.createCriteria(EhatOtherBillDetailForIpdDto.class)
											.setProjection(Projections.sum("otherAmount"))
											.add(Restrictions.eq("treatmentId", objdto.getTreatmentId()))
											.add(Restrictions.eq("patienttId", objdto.getPatienttId()))
											.add(Restrictions.eq("countot", treatmentoperationid))
											.add(Restrictions.eq("otherflag", flg)).add(Restrictions.eq("deleted", "N"))
											.uniqueResult();
									billdetails.setOtherRate(sumother); //rate
									billdetails.setOtherAmount(sumother);
									 billdetails.setOtherPay(sumother);
									 //billdetails.setOtherPay(amount11);
									billdetails.setOtherCoPay(0);
									 billdetails.setCoPay(totalamount);
									 //billdetails.setCoPay(amount11);
									billdetails.setPay(0);
									billdetails.setSponsorId(sponserid);
									billdetails.setChargesSlaveId(slaveid);
								} else {
									// billdetails.setOtherRate(totalamount);
									// billdetails.setOtherAmount(totalamount);
									// billdetails.setCoPay(amount11);
									billdetails.setOtherRate(objdto.getRate());
									billdetails.setOtherAmount(amount11);
									billdetails.setCoPay(amount11);
									billdetails.setPay(0);
									billdetails.setOtherPay(0);
									// billdetails.setOtherCoPay(totalamount);
									billdetails.setOtherCoPay(amount11);
									billdetails.setDrdeskflag(flg);

								}
							}

							sessionFactory.getCurrentSession().merge(billdetails);

						} else {
							billdetails.setBillDetailsId(billdetailsid);
							billdetails.setPatienttId(objdto.getPatienttId());
							billdetails.setTreatmentId(objdto.getTreatmentId());
							billdetails.setBillId(objdto.getBillId());

							billdetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));
							billdetails.setOt_flag("Y");
							billdetails.setDeleted("N");
							billdetails.setDepartmentId(2);
							billdetails.setUnitId(1);
							billdetails.setPatientCatId(0);
							billdetails.setQuantity(objdto.getQuantity());
							billdetails.setServiceId(objdto.getServiceId());
							if (callform.equals("OTINV") || callform.equals("OTDRUG") || callform.equals("OTCATH")) {
								billdetails.setSubServiceId(objdto.getSubServiceId());
							} else {
								billdetails.setSubServiceId(objdto.getSubServiceId());
							}
							billdetails.setUrgentFlag("N");
							billdetails.setCountot(treatmentoperationid);
							billdetails.setDrdeskflag(flg);
							billdetails.setOtprocedure(objdto.getOtprocedure());
							;
							if (totalamount != 0.0) {
								 billdetails.setAmount(totalamount);
//								billdetails.setAmount(amount11);
								if (flg.equals("L")) {
									if (d != null) {
										// billdetails.setRate(totalamount);
										billdetails.setRate(d); //rate
										billdetails.setOtherAmount(d);

										billdetails.setOtherRate(d);
									}

								} else {
									 billdetails.setRate(totalamount);
//									billdetails.setRate(objdto.getRate());
								}

								if (sponserid != null || sponserid != 0 && slaveid != null || slaveid != 0) {
									Double sumother = (Double) sessionFactory.getCurrentSession()
											.createCriteria(EhatOtherBillDetailForIpdDto.class)
											.setProjection(Projections.sum("otherAmount"))
											.add(Restrictions.eq("treatmentId", objdto.getTreatmentId()))
											.add(Restrictions.eq("patienttId", objdto.getPatienttId()))
											.add(Restrictions.eq("countot", treatmentoperationid))
											.add(Restrictions.eq("otherflag", flg)).add(Restrictions.eq("deleted", "N"))
											.uniqueResult();
									billdetails.setOtherRate(sumother); //rate
									billdetails.setOtherAmount(sumother);
									// billdetails.setOtherPay(totalamount);
									billdetails.setOtherPay(sumother);
									billdetails.setOtherCoPay(0);
									// billdetails.setCoPay(totalamount);
									billdetails.setCoPay(sumother);
									billdetails.setPay(0);
									billdetails.setSponsorId(sponserid);
									billdetails.setChargesSlaveId(slaveid);
								} else {
									// billdetails.setOtherRate(totalamount);
									// billdetails.setOtherAmount(totalamount);
									// billdetails.setCoPay(totalamount);
									billdetails.setOtherRate(amount11); //rate
									billdetails.setOtherAmount(amount11);
									billdetails.setCoPay(amount11);
									billdetails.setPay(0);
									billdetails.setOtherPay(0);
									// billdetails.setOtherCoPay(totalamount);
									billdetails.setOtherCoPay(amount11);
									billdetails.setDrdeskflag(flg);
								}
							}
						}
						sessionFactory.getCurrentSession().merge(billdetails);

					} else {
						if (flg.equals("L")) {
							if (d != null) {
								objdto.setRate(d);
								objdto.setAmount(d);
							}
						}

						billdetails.setBillDetailsId(0);
						billdetails.setPatienttId(objdto.getPatienttId());
						billdetails.setTreatmentId(objdto.getTreatmentId());
						billdetails.setBillId(objdto.getBillId());

						// billdetails.setPay(0);
						billdetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));
						billdetails.setOt_flag("Y");
						billdetails.setDeleted("N");
						billdetails.setDepartmentId(2);
						billdetails.setUnitId(1);
						billdetails.setPatientCatId(0);
						billdetails.setQuantity(objdto.getQuantity());
						billdetails.setServiceId(objdto.getServiceId());
						// Akskajdj
						if (callform.equals("OTINV") || callform.equals("OTDRUG") || callform.equals("OTCATH")) {
							billdetails.setSubServiceId(objdto.getSubServiceId());
						} else {
							billdetails.setSubServiceId(objdto.getSubServiceId());
						}
						// billdetails.setSubServiceId(objdto.getSubServiceId());
						billdetails.setUrgentFlag("N");
						billdetails.setCountot(treatmentoperationid);

						if (sponserid != null || sponserid != 0 && slaveid != null || slaveid != 0) {
							billdetails.setOtherPay(objdto.getOtherAmount());
							billdetails.setOtherCoPay(0);
							billdetails.setCoPay(objdto.getAmount());
							billdetails.setPay(0);
							// billdetails.setSponsorId(sponserid);
							billdetails.setSponsorId(1);
							billdetails.setChargesSlaveId(slaveid);
						} else {
							billdetails.setCoPay(objdto.getAmount());
							billdetails.setPay(0);
							billdetails.setOtherPay(0);
							billdetails.setOtherCoPay(objdto.getAmount());
						}

						billdetails.setAmount(objdto.getAmount());
						// billdetails.setCoPay(objdto.getCoPay());
						billdetails.setRate(objdto.getRate());
						billdetails.setOtherAmount(objdto.getOtherAmount());
						// billdetails.setOtherCoPay(objdto.getCoPay());
						billdetails.setOtherRate(objdto.getOtherRate());

						billdetails.setDrdeskflag(flg);
						billdetails.setOtprocedure(objdto.getOtprocedure());
						sessionFactory.getCurrentSession().merge(billdetails);

					}

				} else {

					billdetails.setBillDetailsId(0);
					billdetails.setPatienttId(objdto.getPatienttId());
					billdetails.setTreatmentId(objdto.getTreatmentId());
					billdetails.setBillId(objdto.getBillId());

					// billdetails.setPay(0);
					billdetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));
					billdetails.setOt_flag("Y");
					billdetails.setDeleted("N");
					billdetails.setDepartmentId(2);
					billdetails.setUnitId(1);
					billdetails.setPatientCatId(0);
					billdetails.setQuantity(objdto.getQuantity());

					billdetails.setServiceId(objdto.getServiceId());
					if (callform.equals("OTDRUG") || callform.equals("OTINV") || callform.equals("OTCATH")) {
						billdetails.setSubServiceId(objdto.getSubServiceId());
					} else {
						billdetails.setSubServiceId(objdto.getSubServiceId());
					}

					billdetails.setUrgentFlag("N");
					billdetails.setCountot(treatmentoperationid);

					billdetails.setAmount(objdto.getAmount());
					// billdetails.setCoPay(objdto.getCoPay());
					billdetails.setRate(objdto.getRate());
					billdetails.setOtherAmount(objdto.getOtherAmount());
					// billdetails.setOtherCoPay(objdto.getCoPay());
					billdetails.setOtherRate(objdto.getOtherRate());
					if (sponserid != null || sponserid != 0 && slaveid != null || slaveid != 0) {
						billdetails.setOtherPay(objdto.getOtherAmount());
						billdetails.setOtherCoPay(0);
						billdetails.setCoPay(objdto.getAmount());
						billdetails.setPay(0);
						// billdetails.setSponsorId(sponserid);
						billdetails.setSponsorId(1);
						billdetails.setChargesSlaveId(slaveid);
					} else {
						billdetails.setCoPay(objdto.getAmount());
						billdetails.setPay(0);
						billdetails.setOtherPay(0);
						billdetails.setOtherCoPay(objdto.getAmount());
					}

					billdetails.setDrdeskflag(flg);
					billdetails.setOtprocedure(objdto.getOtprocedure());

					sessionFactory.getCurrentSession().merge(billdetails);
				}

				if (callform.equals("OTINV")) {

					/*
					 * String[] eqpmentID = arrEqp[i].split("-"); String[] qty =
					 * eqpmentID[1].split("_");
					 */
					Double Unitprice = 0.0;

					int uiQTY = (int) objdto.getQuantity();
					int mrn_slave_id = othersid;
					
					if(queryType.equalsIgnoreCase("insert"))
						updateOtSubInventoryStock(objdto, othersid);

					/*
					 * if (mrn_slave_id == 0) {
					 * 
					 * SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					 * "SELECT subinventory_id FROM inv_subinventory_stock_master where status='Y'"
					 * );
					 * 
					 * int subInv_Id = (Integer) query.uniqueResult(); if (subInv_Id > 0) { String
					 * strQuery = "SELECT  slv.mrn_item_info_slave_id " +
					 * "FROM inv_mrn_item_info_slave_new slv WHERe slv.mrn_status = 'complete' AND "
					 * +
					 * "slv.mrn_item_info_slave_delete_flag = 0 AND slv.mrn_item_info_slave_issue_qty > 0 AND slv.inv_subinventory_id="
					 * + subInv_Id; SQLQuery query1 =
					 * sessionFactory.getCurrentSession().createSQLQuery(strQuery); mrn_slave_id =
					 * (Integer) query1.uniqueResult(); }
					 * 
					 * }
					 */
					int equepQTY = uiQTY;
					int isUpdate = 0;
					/**** FOR INV QTY DEDUCTION FROM mrn_item_slave * INSERT **/
					/*String sql1 = "select count(*) from inv_subinventory_stock_master where status='Y'";
					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);

					Object subCount = query1.uniqueResult();
					int subCount1 = ((BigInteger) subCount).intValue();
					if ((Integer) subCount1 > 0) {
						String sql2 = "select subinventory_id  from inv_subinventory_stock_master where status='Y'";
						SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
						int subinventory_id = (Integer) query2.uniqueResult();*/

						/*
						 * String sql3 = "select * from inv_mrn_item_info_slave" +
						 * " where mrn_item_info_slave_item_code=" + objdto.getChildSubServiceId() +
						 * " and mrn_status='complete'" +
						 * " and mrn_item_info_slave_delete_flag='0' and " + "inv_subinventory_id =" +
						 * subinventory_id + " and mrn_item_info_slave_id=" + mrn_slave_id;
						 */

						/*String sql3 = "select * from inv_mrn_item_info_slave_new" + " where item_master_id="
								+ objdto.getChildSubServiceId()

								+ " and deleted='N' and " + "sub_inventory_id =" + subinventory_id
								+ " and item_info_id=" + mrn_slave_id;

						SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
						query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> subinvlist = query3.list();
						int DBQTY;
						for (Map rs : subinvlist) {
							int ItemID = (Integer) rs.get("item_master_id");
							Integer subInvID = (Integer) rs.get("sub_inventory_id");
							DBQTY = (Integer) rs.get("item_issue_qty");
							if (DBQTY >= uiQTY) {
								int totalQty = DBQTY - uiQTY;*/
								/*
								 * String sql4 =
								 * "update inv_mrn_item_info_slave set mrn_item_info_slave_issue_qty=" +
								 * totalQty + " " + "where mrn_item_info_slave_item_code=" + ItemID +
								 * " and inv_subinventory_id='" + subInvID + "' and mrn_item_info_slave_id=" +
								 * mrn_slave_id;
								 */

								/*String sql4 = "update inv_mrn_item_info_slave_new set item_issue_qty=" + totalQty + " "
										+ "where item_master_id=" + ItemID + " and sub_inventory_id='" + subInvID
										+ "' and item_info_id=" + mrn_slave_id;

								SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);

								isUpdate = query4.executeUpdate();

								equepQTY = 0;

								break;

							}
						}
						if (isUpdate == 0) {
							for (Map rs : subinvlist) {
								if (equepQTY > 0) {
									int ItemID = (Integer) rs.get("item_master_id");
									int subInvID = (Integer) rs.get("sub_inventory_id");
									DBQTY = (Integer) rs.get("item_issue_qty");
									if (DBQTY <= equepQTY) {
										int totalQty = equepQTY - DBQTY;*/
										/*
										 * String sql5 =
										 * "update inv_mrn_item_info_slave_new set mrn_item_info_slave_issue_qty=" + 0 +
										 * " " + "where mrn_item_info_slave_item_code=" + ItemID +
										 * " and inv_subinventory_id='" + subInvID + "' and mrn_item_info_slave_id=" +
										 * mrn_slave_id;
										 */

										/*String sql5 = "update inv_mrn_item_info_slave_new set item_issue_qty=" + 0 + " "
												+ "where item_master_id=" + ItemID + " and sub_inventory_id='"
												+ subInvID + "' and item_info_id=" + mrn_slave_id;
										SQLQuery query5 = sessionFactory.getCurrentSession().createSQLQuery(sql5);
										int updt = query5.executeUpdate();
										equepQTY = totalQty;*/
										// ****get latest unit price from item
										// sale***//

									/*} else {
										int totalQty = DBQTY - equepQTY;*/

										/*
										 * String sql6 =
										 * "update inv_mrn_item_info_slave_new set mrn_item_info_slave_issue_qty=" +
										 * totalQty + " " + "where mrn_item_info_slave_item_code=" + ItemID +
										 * " and inv_subinventory_id='" + subInvID + "' and mrn_item_info_slave_id=" +
										 * mrn_slave_id;
										 */

										/*String sql6 = "update inv_mrn_item_info_slave_new set item_issue_qty="
												+ totalQty + " " + "where item_master_id=" + ItemID
												+ " and sub_inventory_id='" + subInvID + "' and item_info_id="
												+ mrn_slave_id;
										SQLQuery query6 = sessionFactory.getCurrentSession().createSQLQuery(sql6);
										int updt = query6.executeUpdate();
										equepQTY = 0;

									}
								}
							}
							isUpdate = 1;
						}
					}*/

				}
				int bilid = 0;
				if (count == 0 || otcount == 0) {
					SQLQuery queryid = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT max(bill_details_id) FROM ehat_bill_details_ipd where ot_flag='Y' and"
									+ "    drdesk_flag=" + '"' + flg + '"' + "  and count_ot=" + treatmentoperationid
									+ " and   deleted='N'  and patient_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId()
									+ " and treatment_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId() + " and bill_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getBillId() + " ");
					queryid.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

					List<Map<String, Object>> data = queryid.list();
					for (Map<String, Object> row : data) {
						bilid = (Integer) row.get("max(bill_details_id)");
					}
				} /*
					 * else{ bilid= billdetailsid; }
					 */
				// end
				if (count == 0 || otcount == 0) {
					int otherid = objdto.getOtherbildetailidipd();
					if (otherid == 0) {
						// for insert
						if (sponserid != null || sponserid == 0 && slaveid != null || slaveid == 0) {
							objdto.setOtherPay(objdto.getAmount());
							objdto.setOtherCoPay(0);
							objdto.setCoPay(objdto.getAmount());
							objdto.setPay(0);
							objdto.setChargesId(sponserid);
							objdto.setChargesSlaveId(slaveid);
							objdto.setSponsorId(1);
						} else {
							objdto.setCoPay(objdto.getAmount());
							objdto.setPay(0);
							objdto.setOtherPay(0);
							objdto.setOtherCoPay(objdto.getAmount());
						}
						objdto.setCountot(treatmentoperationid);
						objdto.setBillDetailsId(bilid);
						objdto.setCreatedBy(userId);
						objdto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
						objdto.setDeleted("N");
						objdto.setMrnSlaveID(othersid);
						objdto.setDrdeskflag(flg);
						sessionFactory.getCurrentSession().merge(objdto);

						if (callform.equals("OTDRUG")) {

							SQLQuery queryid = sessionFactory.getCurrentSession().createSQLQuery(
									"SELECT max(other_bill_details_id_for_ipd) FROM ehat_other_bill_detail_for_ipd where ot_flag='Y' and"
											+ " deleted='N'  and bill_details_id=" + bilid + " ");
							queryid.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

							List<Map<String, Object>> data = queryid.list();
							for (Map<String, Object> row : data) {
								records = (Integer) row.get("max(other_bill_details_id_for_ipd)");
							}

						}
					}
				}

				if (callform.equals("OTCHARG")) {

					SQLQuery query7 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT count(*) FROM ehat_bill_details_ipd where ot_flag='Y'  and "
									+ "  deleted='N'  and  count_ot =" + treatmentoperationid + " and  patient_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId()
									+ " and treatment_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId() + " and bill_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getBillId() + " ");
					id2 = query7.uniqueResult();
					count = ((BigInteger) id2).intValue();
					Object idbill = new Object();

					SQLQuery query6 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT count(*) FROM ehat_bill_details_ipd where ot_flag='Y'  and "
									+ "   drdesk_flag=" + '"' + flg + '"' + "   and deleted='N'  and  count_ot ="
									+ treatmentoperationid + " and  patient_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getPatienttId()
									+ " and treatment_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getTreatmentId() + " and bill_id="
									+ obj.getListEhatOtherBillDetailForIpd().get(0).getBillId() + " ");
					idbill = query6.uniqueResult();
					otcount = ((BigInteger) idbill).intValue();

				}
				if (treatmentoperationid > 0) {
					String sql4 = "update treatmentoperationsmanage set flag='N'" + " where treatmentOperationsID ="
							+ treatmentoperationid + " ";
					SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);
					query4.executeUpdate();
				}

				/*
				 * if(objdto.getOtherbildetailidipd()==0 ||
				 * objdto.getOtherbildetailidipd()==null){
				 * 
				 * objdto.setCreatedBy(userId); objdto.setCreatedDateTime(new Date(new
				 * java.util.Date().getTime())); objdto.setDeleted("N");
				 * 
				 * }else { objdto.setUpdatedBy(userId); objdto.setUpdatedDateTime(new Date(new
				 * java.util.Date().getTime())); objdto.setDeleted("N"); }
				 * if(callform.equals("OTDRUG")){
				 * 
				 * }
				 */

			}

			// records = -1;
		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	}

	private boolean updateOtInvStockOnEditOtInventory(EhatOtherBillDetailForIpdDto obj, String queryType,
			HttpServletRequest request) throws Exception {

		for (EhatOtherBillDetailForIpdDto objdto : obj.getListEhatOtherBillDetailForIpd()) {
			double quantity = objdto.getQuantity();
			Integer batchId = objdto.getBatchId();
			Integer otherbildetailidipd = objdto.getOtherbildetailidipd();

			EhatOtherBillDetailForIpdDto billDetailsIpdInstance = null;
			try {
				billDetailsIpdInstance = (EhatOtherBillDetailForIpdDto) sessionFactory.getCurrentSession()
						.get(EhatOtherBillDetailForIpdDto.class, otherbildetailidipd);

				double quantityPrevious = billDetailsIpdInstance.getQuantity();
				Integer childSubServiceId = billDetailsIpdInstance.getChildSubServiceId();
				Integer Id = 0;

				if (batchId != null && batchId != 0) {
					ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
					String subInventory_Id = (String) resourceBundleEhat.getString("otSubInventoryId").trim();
					Integer subInventoryId = Integer.parseInt(subInventory_Id);
					int ItemID = 0;
					Integer subInvID = 0;
					if (subInventoryId != null) {
						try {

							String sql3 = "select * from inv_goods_issue_mrn_item_slave_new" + " where item_master_id="
									+ objdto.getChildSubServiceId()
									+ " and (mrn_status='FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched') "
									+ " and deleted='N' and " + " sub_inventory_id =" + subInventoryId
									/* + " and item_batch_code='" + batchCode */
									// + " and id=" + objdto.getChildSubServiceId()
									+ " and batch_master_id=" + batchId
							/* + " and item_batch_exp_date='" + batchExp+"'" */;
							System.out.println("this is sql3 " + sql3);
							SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
							query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> subinvlist = query3.list();
							int DBQTY = 0;
							for (Map rs : subinvlist) {

								Id = (Integer) rs.get("id");
								ItemID = (Integer) rs.get("item_master_id");
								subInvID = (Integer) rs.get("sub_inventory_id");
								DBQTY = (Integer) rs.get("current_subinventory_stock");

							}

							Double availableStock = null;
							Double totalStock = 0.0;
							Object rows = DBQTY;

							if (rows != null) {
								availableStock = Double.parseDouble(rows.toString());
							}

							if (quantity < quantityPrevious) {
								Double finalQuantity = quantityPrevious - quantity;
								totalStock = availableStock + finalQuantity;
							} else if (quantity > quantityPrevious) {
								Double finalQuantity = quantity - quantityPrevious;
								totalStock = availableStock - finalQuantity;
							} else if (quantity == quantityPrevious) {
								totalStock = availableStock;
							}

							/*
							 * String sql4 =
							 * "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock=" +
							 * totalStock + " where item_master_id=" + ItemID + " and sub_inventory_id=" +
							 * subInvID + " and id="+ Id
							 * 
							 * + " and item_batch_code='" + batchCode
							 * 
							 * + " and batch_master_id=" + batchId +
							 * " and item_batch_exp_date='"+batchExp+"'" ;
							 * System.out.println("this is sql4 "+sql4);
							 * 
							 * SQLQuery query4 = sessionFactory .getCurrentSession().createSQLQuery( sql4);
							 * 
							 * query4.executeUpdate();
							 */

							/* added by Badrinath commented
							 * SQLQuery sql4 = sessionFactory.getCurrentSession().createSQLQuery(
							 * "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock=" +
							 * totalStock + " where item_master_id=" + ItemID + " and sub_inventory_id=" +
							 * subInvID + " and id=:Id"+
							 * 
							 * + " and item_batch_code='" + batchCode
							 * 
							 * " and batch_master_id=:batchId");
							 */

							SQLQuery sql4 = sessionFactory.getCurrentSession().createSQLQuery(
									"update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock="
											+ totalStock + " where id=:Id" );
							sql4.setInteger("Id", Id);
							sql4.executeUpdate();

							return true;

						} catch (Exception e) {
							e.printStackTrace();
							return false;
						}
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return false;
	}

	private boolean updateOtDrugStockOnEditOtDrug(EhatOtherBillDetailForIpdDto obj, String queryType,
			HttpServletRequest request) throws Exception {

		for (EhatOtherBillDetailForIpdDto objdto : obj.getListEhatOtherBillDetailForIpd()) {
			double quantity = objdto.getQuantity();
			Integer batchId = objdto.getBatchId();
			Integer otherbildetailidipd = objdto.getOtherbildetailidipd();

			EhatOtherBillDetailForIpdDto billDetailsIpdInstance = null;
			try {
				billDetailsIpdInstance = (EhatOtherBillDetailForIpdDto) sessionFactory.getCurrentSession()
						.get(EhatOtherBillDetailForIpdDto.class, otherbildetailidipd);

				double quantityPrevious = billDetailsIpdInstance.getQuantity();
				Integer childSubServiceId = billDetailsIpdInstance.getChildSubServiceId();

				if (batchId != null && batchId != 0) {

					ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("OT_Service");
					String storeId = (String) resourceBundleEhat.getObject("OtpharmaSubStoreID");
					//String storeId = String.valueOf(2);
					Object storeName = new Object();
					if (storeId != null) {
						try {
							SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
									"SELECT store_name FROM pharma_sub_store_master where store_id='" + storeId + "'");
							storeName = query.uniqueResult();
						} catch (Exception e) {
							e.printStackTrace();
						}
						try {
							String strQuery = "SELECT stock_qty_in_hand FROM pharma_" + storeName.toString()
									+ "_stock_master where stock_batch_id='" + batchId + "'";
							SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(strQuery);
							Double availableStock = null;
							Double totalStock = 0.0;
							Object rows = query.uniqueResult();

							if (rows != null) {
								availableStock = Double.parseDouble(rows.toString());
							}
							String updateQuery = "";

							if (quantity < quantityPrevious) {
								Double finalQuantity = quantityPrevious - quantity;
								totalStock = availableStock + finalQuantity;
							} else if (quantity > quantityPrevious) {
								Double finalQuantity = quantity - quantityPrevious;
								totalStock = availableStock - finalQuantity;
							} else if (quantity == quantityPrevious) {
								totalStock = availableStock;
							}

							Query query1 = sessionFactory.getCurrentSession().createSQLQuery("update pharma_"
									+ storeName.toString() + "_stock_master set stock_qty_in_hand='" + totalStock
									+ "' where stock_batch_id=:batchId  and stock_product_id=:childSubServiceId");
							query1.setInteger("batchId", batchId);
							query1.setInteger("childSubServiceId", childSubServiceId);
							query1.executeUpdate();
							return true;

						} catch (Exception e) {
							e.printStackTrace();
							return false;
						}
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return false;
	}

	@Override
	public List<OTbilldetaildto> getOTdetails(Integer patienttId, Integer masterid, Integer treatmentId, Integer selfId,
			String queryType, String callform, Integer treatmentoperationid) {
		List<OTbilldetaildto> tlistbiilall = null;
		if (callform.equals("OTDRUG") || callform.equals("OTINV") || callform.equals("OTCATH")) {
			tlistbiilall = new ArrayList<OTbilldetaildto>();
		}

		try {
			if (callform.equals("OTCHARG")) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTbilldetaildto.class);
				if (queryType.equals("ONTAB")) {

					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("patienttId", patienttId));
					criteria.add(Restrictions.eq("otherflag", "C"));
					criteria.add(Restrictions.eq("countot", treatmentoperationid));
					criteria.setMaxResults(10);

					criteria.setMaxResults(10);

				} else {
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("patienttId", patienttId));
					criteria.add(Restrictions.eq("serviceId", masterid));
					criteria.add(Restrictions.eq("subServiceId", selfId));
					criteria.add(Restrictions.eq("otherflag", "C"));
					criteria.add(Restrictions.eq("countot", treatmentoperationid));
					// criteria.add(Restrictions.eq("ot_flag", "Y"));
				}
				tlistbiilall = criteria.list();
			} else if (callform.equals("CPOE")) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTbilldetaildto.class);
				if (queryType.equals("ONTAB")) {

					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("patienttId", patienttId));
					criteria.add(Restrictions.eq("otherflag", "E"));
					criteria.add(Restrictions.eq("countot", treatmentoperationid));
					criteria.setMaxResults(10);

					criteria.setMaxResults(10);

				} else {
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("patienttId", patienttId));
					criteria.add(Restrictions.eq("serviceId", masterid));
					criteria.add(Restrictions.eq("subServiceId", selfId));
					criteria.add(Restrictions.eq("otherflag", "E"));
					criteria.add(Restrictions.eq("countot", treatmentoperationid));
					// criteria.add(Restrictions.eq("ot_flag", "Y"));
				}
				tlistbiilall = criteria.list();
			} else if (callform.equals("OTDRUG")) {
				String sql = "";
				if (queryType.equals("ONTAB")) {
					sql = "SELECT * FROM ehat_other_bill_detail_for_ipd where otherflag='P' and deleted='N' and treatment_id="
							+ treatmentId + "  and  patient_id = " + patienttId + " and count_ot="
							+ treatmentoperationid + "";
				} else {
					sql = "SELECT * FROM ehat_other_bill_detail_for_ipd where otherflag='P' and deleted='N' and treatment_id="
							+ treatmentId + "  and  patient_id = " + patienttId + " and service_id =  " + masterid
							+ " and sub_service_id =  " + selfId + " and count_ot=" + treatmentoperationid + "  ";

				}
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> data = query.list();
				for (Map<String, Object> row : data) {
					OTbilldetaildto billdetaildto = new OTbilldetaildto();
					int billdetailsid = (Integer) row.get("other_bill_details_id_for_ipd");

					String sql1 = "SELECT product_name FROM pharma_product_master where product_delete_flag='N' and product_id='"
							+ (Integer) row.get("child_sub_service_id") + "'";
					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					String product_name = (String) query1.uniqueResult();
					// String product_name=(String) query1.uniqueResult();
					billdetaildto.setCategoryName(product_name);
					billdetaildto.setOtherbildetailidipd((Integer) row.get("other_bill_details_id_for_ipd"));
					billdetaildto.setBill_details_id((Integer) row.get("bill_details_id"));
					billdetaildto.setTreatmentId((Integer) row.get("treatment_id"));
					billdetaildto.setChildSubServiceId((Integer) row.get("child_sub_service_id"));
					billdetaildto.setRate((Double) row.get("rate"));
					billdetaildto.setServiceId((Integer) row.get("service_id"));
					billdetaildto.setSubServiceId((Integer) row.get("sub_service_id"));
					// System.err.println("date is====="+(Date)row.get("date"));
					billdetaildto.setQty((Double) row.get("quantity"));
					billdetaildto.setAmount((Double) row.get("amount"));

					billdetaildto.setCreatedDate((Date) row.get("created_date_time"));
					billdetaildto.setBatchid((Integer) row.get("batch_id"));
					billdetaildto.setBatchCode((String) row.get("batch_code"));
					billdetaildto.setBatchExp((String) row.get("batch_exp"));

					String sql2 = "SELECT  m.patient_sales_bill_id,s.patient_slave_id,s.patient_slave_BatchId  FROM ehat_pharma_consumtion_slave s,ehat_pharma_consumtion_master m where    billidipd='"
							+ billdetailsid + "'   and m. patient_bill_patient_id='" + patienttId
							+ "'and m.patient_sale_treatmentId='" + treatmentId + "' and m.treatmentoperationid='"
							+ treatmentoperationid
							+ "'  and   s.patient_slave_bill_master_id = m.patient_sales_bill_id  and m.ot_flag='O' ";
					SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
					query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

					Integer batchid = 0;
					Integer conmasterid = 0;
					Integer slaveid = 0;
					List<Map<String, Object>> data2 = query2.list();
					for (Map<String, Object> row2 : data2) {

						conmasterid = (Integer) row2.get("patient_sales_bill_id");
						slaveid = (Integer) row2.get("patient_slave_id");

					}
					billdetaildto.setConsumtionmasterid(conmasterid);
					billdetaildto.setConsumtionslaveid(slaveid);
					tlistbiilall.add(billdetaildto);
				}
			} else if (callform.equals("OTINV")) {

				String sql = "";
				if (queryType.equals("ONTAB")) {
					sql = "SELECT * FROM ehat_other_bill_detail_for_ipd where otherflag='I' and deleted='N' and treatment_id="
							+ treatmentId + "  and  patient_id = " + patienttId + " and count_ot="
							+ treatmentoperationid + "";
					// sql = "SELECT * FROM ehat_bill_details_ipd where drdesk_flag='I' and
					// deleted='N' and treatment_id="+treatmentId +" and patient_id = "+ patienttId
					// +" and count_ot="+ treatmentoperationid +"";
				} else {
					sql = "SELECT * FROM ehat_other_bill_detail_for_ipd where otherflag='I' and deleted='N' and treatment_id="
							+ treatmentId + "  and  patient_id = " + patienttId + " and service_id =  " + masterid
							+ " and sub_service_id =  " + selfId + " and count_ot=" + treatmentoperationid + " ";

					// sql = "SELECT * FROM ehat_bill_details_ipd where drdesk_flag='I' and
					// deleted='N' and treatment_id="+treatmentId +" and patient_id = "+ patienttId
					// +" and service_id = "+ masterid +" and sub_service_id = "+ selfId +" and
					// count_ot="+ treatmentoperationid +" ";

				}
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> data = query.list();
				for (Map<String, Object> row : data) {
					OTbilldetaildto billdetaildto = new OTbilldetaildto();
					int itemID = (Integer) row.get("child_sub_service_id");
					// SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery("SELECT
					// item_name FROM inv_item_master where item_id="+ itemID +" ");
					SQLQuery query1 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT item_name FROM inv_item_master_new where id=" + itemID + " ");

					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					String product_name = (String) query1.uniqueResult();
					billdetaildto.setCategoryName(product_name);
					billdetaildto.setOtherbildetailidipd((Integer) row.get("other_bill_details_id_for_ipd"));
					billdetaildto.setTreatmentId((Integer) row.get("treatment_id"));
					billdetaildto.setChildSubServiceId((Integer) row.get("child_sub_service_id"));
					billdetaildto.setRate((Double) row.get("rate"));
					billdetaildto.setServiceId((Integer) row.get("service_id"));
					billdetaildto.setSubServiceId((Integer) row.get("sub_service_id"));
					// System.err.println("date is====="+(Date)row.get("date"));
					billdetaildto.setQty((Double) row.get("quantity"));
					billdetaildto.setAmount((Double) row.get("amount"));
					billdetaildto.setBill_details_id((Integer) row.get("bill_details_id"));
					billdetaildto.setCreatedDate((Date) row.get("created_date_time"));
					billdetaildto.setBatchid((Integer) row.get("batch_id"));
					billdetaildto.setMrnSlaveId((Integer) row.get("mrn_slave_id"));
					tlistbiilall.add(billdetaildto);
				}

			} else if (callform.equals("OTCATH")) {

				String sql = "";
				if (queryType.equals("ONTAB")) {
					sql = "SELECT * FROM ehat_other_bill_detail_for_ipd where otherflag='L' and deleted='N' and treatment_id="
							+ treatmentId + "  and  patient_id = " + patienttId + " and count_ot="
							+ treatmentoperationid + "";
				} else {
					sql = "SELECT * FROM ehat_other_bill_detail_for_ipd where otherflag='L' and deleted='N' and treatment_id="
							+ treatmentId + "  and  patient_id = " + patienttId + " and service_id =  " + masterid
							+ " and sub_service_id =  " + selfId + " and count_ot=" + treatmentoperationid + " ";

				}
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> data = query.list();
				for (Map<String, Object> row : data) {
					OTbilldetaildto billdetaildto = new OTbilldetaildto();
					int itemID = (Integer) row.get("child_sub_service_id");
					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT product_name FROM pharma_product_master where product_delete_flag='N' and product_id='"
									+ (Integer) row.get("child_sub_service_id") + "'");

					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					String product_name = (String) query1.uniqueResult();
					billdetaildto.setCategoryName(product_name);
					billdetaildto.setOtherbildetailidipd((Integer) row.get("other_bill_details_id_for_ipd"));
					billdetaildto.setTreatmentId((Integer) row.get("treatment_id"));
					billdetaildto.setChildSubServiceId((Integer) row.get("child_sub_service_id"));
					billdetaildto.setRate((Double) row.get("rate"));
					billdetaildto.setServiceId((Integer) row.get("service_id"));
					billdetaildto.setSubServiceId((Integer) row.get("sub_service_id"));
					// System.err.println("date is====="+(Date)row.get("date"));
					billdetaildto.setQty((Double) row.get("quantity"));
					billdetaildto.setAmount((Double) row.get("amount"));
					billdetaildto.setBill_details_id((Integer) row.get("bill_details_id"));
					billdetaildto.setCreatedDate((Date) row.get("created_date_time"));
					tlistbiilall.add(billdetaildto);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return tlistbiilall;
	}

	@Override
	public int deleteservdetails(String labservicelist, String callform, Integer userId, Integer patienttId,
			Integer treatmentId, Integer treatmentoperationid, Integer bill_details_id, Integer storeId) {
		String[] ary = labservicelist.split(",");
		String flg = "";
		Object billid = new Object();
		double totalamount = 0.0;
		int updated = 0;
		if (callform.equals("OTINV")) {

			flg = "I";

		} else if (callform.equals("OTDRUG")) {

			flg = "P";

		} else if (callform.equals("OTCHARG")) {
			flg = "C";
		} else {
			flg = "L";
		}
		try {

			if ((callform.equals("OTDRUG")) || (callform.equals("OTINV"))) {

				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
						"select count(*) from ehat_other_bill_detail_for_ipd where deleted='N' and bill_details_id="
								+ bill_details_id + "");
				Object id = query.uniqueResult();
				int count = ((BigInteger) id).intValue();

				if (count == 1) {

					BillDetailsIpdDto billdetails = (BillDetailsIpdDto) sessionFactory.getCurrentSession()
							.get(BillDetailsIpdDto.class, bill_details_id);
					// billdetails.setPay(0);
					billdetails.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
					billdetails.setDeleted("Y");
					billdetails.setDeleteFrom("B");
					billdetails.setDeletedBy(userId);
					billdetails.setDeletedDateTime((new Date(new java.util.Date().getTime())));
					/*
					 * billdetails.setAmount(totalamount); billdetails.setCoPay(totalamount);
					 * billdetails.setRate(totalamount); billdetails.setOtherAmount(totalamount);
					 * billdetails.setOtherCoPay(0.0); billdetails.setOtherRate(totalamount);
					 * billdetails.setOtherPay(totalamount);
					 */
				}
			}

			if (!(callform.equals("OTDRUG")) && !(callform.equals("OTINV"))) {

				BillDetailsIpdDto billdetails = (BillDetailsIpdDto) sessionFactory.getCurrentSession()
						.get(BillDetailsIpdDto.class, bill_details_id);
				// billdetails.setPay(0);
				billdetails.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				billdetails.setDeleted("Y");
				billdetails.setDeleteFrom("B");
				billdetails.setDeletedBy(userId);
				billdetails.setDeletedDateTime((new Date(new java.util.Date().getTime())));
				/*
				 * billdetails.setAmount(totalamount); billdetails.setCoPay(totalamount);
				 * billdetails.setRate(totalamount); billdetails.setOtherAmount(totalamount);
				 * billdetails.setOtherCoPay(0.0); billdetails.setOtherRate(totalamount);
				 * billdetails.setOtherPay(totalamount);
				 */

			}

			System.out.println("id isssss=" + labservicelist);
			for (int i = 0; i < ary.length; i++) {
				System.err.println(ary[i]);
				EhatOtherBillDetailForIpdDto billDetailsDto = new EhatOtherBillDetailForIpdDto();
				billDetailsDto = (EhatOtherBillDetailForIpdDto) sessionFactory.getCurrentSession()
						.get(EhatOtherBillDetailForIpdDto.class, Integer.parseInt(ary[i]));

				billDetailsDto.setDeleted("Y");
				billDetailsDto.setDeletedBy(userId);
				billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));

				// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
				// sessionFactory.getCurrentSession().update(billDetailsDto);

				/*
				 * SQLQuery queryid =sessionFactory.getCurrentSession().
				 * createSQLQuery("SELECT max(bill_details_id) FROM ehat_other_bill_detail_for_ipd  where ot_flag='Y' and"
				 * + "    otherflag=" +'"' + flg +'"' +"  and count_ot="+ treatmentoperationid
				 * +" and   deleted='Y'  and patient_id="+ treatmentId +" and treatment_id="+
				 * treatmentId +"  ");
				 */

				// billid =queryid.uniqueResult();

				// int billdetailsid = (Integer) billid;

				if (callform.equals("OTINV")) {
					updated = updateOtSubInventoryStockOnDeleteOtInventory(billDetailsDto);
				} else if (callform.equals("OTDRUG")) {
					updated = updateOtDrugStockOnDeleteOtDrug(billDetailsDto, storeId);
				}
			}

			Double sum = (Double) sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForIpdDto.class)
					.setProjection(Projections.sum("amount")).add(Restrictions.eq("treatmentId", treatmentId))
					.add(Restrictions.eq("patienttId", patienttId))
					.add(Restrictions.eq("countot", treatmentoperationid)).add(Restrictions.eq("otherflag", flg))
					.add(Restrictions.eq("deleted", "N")).uniqueResult();
			if (sum != null) {
				totalamount = sum;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public int savefreez(Freezdto freezdto) {

		try {

			sessionFactory.getCurrentSession().merge(freezdto);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	@Override
	public int unfreez(Freezdto freezdto) {

		try {

			sessionFactory.getCurrentSession().delete(freezdto);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<Ehat_freez_details> fetchfreez(String module, String submodule) {

		List<Ehat_freez_details> fetchfreez = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Ehat_freez_details.class);
			criteria.add(Restrictions.eq("modulen_name", module));
			criteria.add(Restrictions.eq("submodule_name", submodule));

			fetchfreez = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return fetchfreez;
	}

	@Override
	public String fetchotprocedure(int patienttId, int treatmentId) {

		String otprocedure = "@";

		try {
			SQLQuery query = sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT   DISTINCT ot_procedure FROM ehat_bill_details_ipd where ot_flag='Y'  and "
							+ "  deleted='N'  and  patient_id=" + patienttId + " and treatment_id=" + treatmentId
							+ " ");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> data = query.list();
			for (Map<String, Object> row : data) {
				otprocedure = otprocedure + (String) row.get("ot_procedure");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return otprocedure;
	}

	@Override
	public List<ProductMaster> giveVendorList(int patienttId, int treatmentId, int srvid, int subSrvid) {
		List<GetPopUpDataForOTDto> listSubServiceIpdDto = new ArrayList<GetPopUpDataForOTDto>();
		// List<VendorMaster> vlist = new ArrayList<VendorMaster>();
		List<ProductMaster> plist = new ArrayList<ProductMaster>();
		System.err.println("srvid=======>" + srvid + "treatmentId===>" + treatmentId);

		String sql1 = "SELECT child_sub_service_id,quantity,ot_flag FROM ehat_other_bill_detail_for_ipd where service_id="
				+ srvid + "  and sub_service_id=" + subSrvid + " and treatment_id = " + treatmentId + ""
				+ "  and deleted='N' and ot_flag='Y' ";

		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> data1 = query1.list();

		for (Map<String, Object> row : data1) {

			GetPopUpDataForOTDto objDTO1 = new GetPopUpDataForOTDto();

			objDTO1.setOtFlag((String) row.get("ot_flag"));

			if (objDTO1.getOtFlag().equals("Y")) {
				ProductMaster pm = new ProductMaster();
				int pid = (Integer) row.get("child_sub_service_id");
				double qty = (Double) row.get("quantity");
				pm.setProductId(2);
				pm.setProductUnit(2.0);
				plist.add(pm);
			}

		}
		return plist;
	}

	@Override
	public List<Fetchprocedure> fetotchprocedure(Integer opId) {

		List<Fetchprocedure> fetotchprocedure = new ArrayList<>();
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Fetchprocedure.class);
			criteria.add(Restrictions.eq("Operation_id", opId));

			fetotchprocedure = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return fetotchprocedure;
	}

	@Override
	public String fethopid(Integer pId, Integer trId) {
		// TODO Auto-generated method stub
		String tid = "";
		try {
			String sql = "SELECT ID , date FROM  treatment_operations where Patient_ID='" + pId + "' and Treatment_ID='"
					+ trId + "' and opStatus='Y'";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> data = query.list();
			for (Map<String, Object> row : data) {
				tid = (Integer) row.get("ID") + "@" + (String) row.get("date");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return "-1";
		}

		return tid;
	}

	/**
	 * @author Paras R Suryawanshi
	 * @Date 21-Nov-2017
	 * @code For hallwise Operation charge OT *
	 **/
	@Override
	public List<AutosugeestionDto> hallwiseOPchargeOT(Integer pId, Integer trId, String scheduledProcedure,
			String findingName, Integer unit, Integer depdocdeskid, Float chargesOS, Integer count1) {
		List<AutosugeestionDto> ltSubService = new ArrayList<AutosugeestionDto>();
		/// get hallid
		/* String */
		ResourceBundle resourceBundle = ResourceBundle.getBundle("OT_Service");
		String Op1 = (String) resourceBundle.getString("Operation1");
		String Op2 = (String) resourceBundle.getString("Operation2");
		String Op3 = (String) resourceBundle.getString("Operation3");
		String Op4 = (String) resourceBundle.getString("Operation4");
		String Op5 = (String) resourceBundle.getString("Operation5");
		Integer Operation1 = Integer.parseInt(Op1);
		Integer Operation2 = Integer.parseInt(Op2);
		Integer Operation3 = Integer.parseInt(Op3);
		Integer Operation4 = Integer.parseInt(Op4);
		Integer Operation5 = Integer.parseInt(Op5);
		double opcharge = 0.0;
		int count = 0;
		try {
			/*
			 * SQLQuery q=sessionFactory.getCurrentSession().
			 * createSQLQuery("SELECT  h.Htype from treatment_beds tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.Bed_ID  and   tb.Treatment_ID=? "
			 * ); q.setParameter(0,trId); //
			 * q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); String Hall_ID=
			 * (String) q.uniqueResult(); if(scheduledProcedure.length()>0){ String opid =
			 * scheduledProcedure;
			 * 
			 * SQLQuery q1=sessionFactory.getCurrentSession().
			 * createSQLQuery("SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=?  "
			 * ); q1.setParameter(0,Integer.parseInt(Hall_ID) ); q1.setParameter(1,pId);
			 * q1.setParameter(2,opid); //
			 * q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * 
			 * Float surgeoncharge=(Float) q1.uniqueResult(); if(surgeoncharge ==null){
			 * surgeoncharge = (float) 0.0; } opcharge = surgeoncharge; }
			 */
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AutosugeestionDto.class);
			criteria.add(Restrictions.eq("categorydeleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.add(Restrictions.eq("servicdeleted", "N"));
			criteria.add(Restrictions.eq("unitid", unit));
			// criteria.add(Restrictions.eq("serviceid", 0));
			criteria.add(Restrictions.eq("dept_id", depdocdeskid));
			criteria.add(Restrictions.like("categoryName", findingName + "%"));
			ltSubService = criteria.list();
			if (chargesOS != 0.0) {
				for (int i = 0; i < ltSubService.size(); i++) {
					Integer childid = ltSubService.get(i).getCategoryid();
					Integer servid = ltSubService.get(i).getServiceid();

					Double percentage = (Double) sessionFactory.getCurrentSession().createQuery(
							"select e.percentage from OTPercentageDTO e where e.childSubServiceId = :id and e.serviceId = :serviceId and e.confugrationflag = :confugrationflag")
							.setInteger("id", childid).setInteger("serviceId", servid)
							.setString("confugrationflag", "N").uniqueResult();

					if (percentage == null || percentage == 0.0) {
						percentage = 0.0;
					} else {
						Double finalcharge = (chargesOS * percentage) / 100;
						if (count1 == 1) {
							ltSubService.get(i).setCategorycharges(finalcharge);
						} else {
							if (count1 == 2) {
								Double fc = finalcharge;
								fc = (fc * Operation2) / 100;
								finalcharge = finalcharge + fc;
								ltSubService.get(i).setCategorycharges(finalcharge);
							} else if (count1 == 3) {
								Double fc = finalcharge;
								Double fc1 = finalcharge;
								fc1 = (fc1 * Operation2) / 100;
								fc = (fc * Operation3) / 100;
								finalcharge = finalcharge + fc + fc1;
								ltSubService.get(i).setCategorycharges(finalcharge);
							} else if (count1 == 4) {
								Double fc = finalcharge;
								Double fc1 = finalcharge;
								Double fc2 = finalcharge;
								fc1 = (fc1 * Operation2) / 100;
								fc2 = (fc2 * Operation3) / 100;
								fc = (fc * Operation4) / 100;
								finalcharge = finalcharge + fc + fc2 + fc1;
								ltSubService.get(i).setCategorycharges(finalcharge);
							} else if (count1 == 5) {
								Double fc3 = finalcharge;
								Double fc1 = finalcharge;
								Double fc2 = finalcharge;
								fc3 = (fc3 * Operation2) / 100;
								fc2 = (fc2 * Operation3) / 100;
								fc1 = (fc1 * Operation4) / 100;
								Double fc = finalcharge;
								fc = (fc * Operation5) / 100;
								finalcharge = finalcharge + fc + fc1 + fc2 + fc3;
								ltSubService.get(i).setCategorycharges(finalcharge);

							}
						}

					}

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return ltSubService;
	}

	/**
	 * @author Paras R Suryawanshi
	 * @Date 21-Nov-2017
	 * @code For SaveOTPercentage *
	 **/
	@Override
	public int SaveOTPercentage(OTPercentageDTO otPercentageDTO, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");// current login user id

			for (OTPercentageDTO objdto : otPercentageDTO.getListOTPercentage()) {
				OTPercentageDTO objdto1 = new OTPercentageDTO();
				if (objdto.getOpid() == 0) {
					objdto1.setCreatedBy(userId);
					objdto1.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				} else {
					objdto1.setUpdatedBy(userId);
					objdto1.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				}
				objdto1.setOpid(objdto.getOpid());
				objdto1.setServiceId(objdto.getServiceId());
				objdto1.setChildSubServiceId(objdto.getChildSubServiceId());
				objdto1.setSubserviceId(objdto.getSubserviceId());
				objdto1.setConfugrationflag(objdto.getConfugrationflag());
				objdto1.setPercentage(objdto.getPercentage());
				sessionFactory.getCurrentSession().merge(objdto1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<OTPercentageDTO> fetchOTPercentage() {
		// TODO Auto-generated method stub
		int count = 0;
		Query query = sessionFactory.getCurrentSession()
				.createQuery("from OTPercentageDTO p where p.confugrationflag = :confugrationflag")
				.setString("confugrationflag", "N");
		List<OTPercentageDTO> list = query.list();
		for (OTPercentageDTO list1 : list) {
			String Subservicesname = (String) sessionFactory.getCurrentSession()
					.createQuery("select e.categoryName from SubServiceDto e where e.subId = :id")
					.setInteger("id", list1.getChildSubServiceId()).uniqueResult();
			list.get(count).setSubservicesname(Subservicesname);
			count++;
		}
		return list;
	}

	@Override
	public String hallwisechargeOT(Integer pIdd, Integer trId, String scheduledProcedure, String callfrom) {

		int count = 0;
		String opcharge = "";
		try {
			// SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.Htype
			// from treatment_beds tb,beds bd, hall h where h.Hall_ID = bd.Hall_ID and
			// bd.Bed_ID=tb.Bed_ID and tb.Treatment_ID=? ");
			if (callfrom.equals("hall")) {
				String opid = "";
				String pId = "";
				// SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.Htype
				// from ehat_bill_details_ipd tb,beds bd, hall h where h.Hall_ID = bd.Hall_ID
				// and bd.Bed_ID=tb.sub_service_id and tb.treatment_id="+ trId +" and
				// tb.on_bed_flag='Y' and tb.service_id="+ 3 +" ");
				SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
								+ " AND tb.treatment_id = " + trId
								+ " AND tb.on_bed_flag = 'Y' AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
				int Hall_ID = (Integer) q.uniqueResult();
				if (scheduledProcedure.length() > 0) {
					SQLQuery q1 = null;

					String sql = "SELECT opgrade,opstate FROM  operation where Operation_id="
							+ Integer.parseInt(scheduledProcedure) + " and status='Y' ";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> data = query.list();
					for (Map<String, Object> row : data) {
						pId = (String) row.get("opgrade");
						opid = (String) row.get("opstate");
					}

					q1 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=?  and sponser_id=?");
					q1.setParameter(0, Hall_ID);
					q1.setParameter(1, Integer.parseInt(pId));
					q1.setParameter(2, Integer.parseInt(opid));
					q1.setParameter(3, 0);

					Float surgeoncharge = (Float) q1.uniqueResult();
					if (surgeoncharge == null) {
						surgeoncharge = (float) 0.0;
					}
					opcharge = Float.toString(surgeoncharge);
				}
			} else {
				SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
								+ " AND tb.treatment_id = " + trId
								+ " AND tb.on_bed_flag = 'Y' AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
				// q.setParameter(0,trId);
				// q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				int Hall_ID = (Integer) q.uniqueResult();
				if (scheduledProcedure.length() > 0) {
					String opid = "";
					String pId = "";
					SQLQuery q1 = null;

					String sql = "SELECT opgrade,opstate FROM  operation where Operation_id="
							+ Integer.parseInt(scheduledProcedure) + " and status='Y' ";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> data = query.list();
					for (Map<String, Object> row : data) {
						pId = (String) row.get("opgrade");
						opid = (String) row.get("opstate");
					}

					SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT  charges_master_slave_id from  ehat_bill_master  Where treatment_id=" + trId
									+ " and deleted='N'");
					Integer charges_master_slave_id = (Integer) q2.uniqueResult();
					if (charges_master_slave_id > 0) {
						// SQLQuery q3=sessionFactory.getCurrentSession().createSQLQuery("SELECT selfId
						// from ehat_charges_master_slave Where id="+ charges_master_slave_id +" and
						// deleted='N'");
						// Integer selfid= (Integer) q3.uniqueResult();

						List<ChargesMasterSlave> list = fetchSuperCatPrcentMaster(charges_master_slave_id);
						Integer selfid = list.get(0).getSlaveId();
						q1 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=? and sponser_id=?  ");
						q1.setParameter(0, Hall_ID);
						q1.setParameter(1, Integer.parseInt(pId));
						q1.setParameter(2, Integer.parseInt(opid));
						q1.setParameter(3, selfid);
					} else {
						q1 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=? and sponser_id=? ");
						q1.setParameter(0, Hall_ID);
						q1.setParameter(1, Integer.parseInt(pId));
						q1.setParameter(2, Integer.parseInt(opid));
						q1.setParameter(3, 0);
					}

					// q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

					Float surgeoncharge = (Float) q1.uniqueResult();
					if (surgeoncharge == null) {
						surgeoncharge = (float) 0.0;
					}
					opcharge = Float.toString(surgeoncharge);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return opcharge;
	}

	@Override
	public String hallwisechargeOTNew(Integer pId, Integer trId, String scheduledProcedure) {

		int count = 0;
		String opcharge = "";
		try {
			SQLQuery q = sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT  idhall_type from hall_type where  ehat_halltype_id = ? ");
			q.setParameter(0, trId);
			// SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.Htype
			// from ehat_bill_details_ipd tb,beds bd, hall h where h.Hall_ID = bd.Hall_ID
			// and bd.Bed_ID=tb.sub_service_id and tb.treatment_id="+ trId +" and
			// tb.on_bed_flag='Y' and tb.service_id="+ 3 +" ");

			// q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			int Hall_ID = (Integer) q.uniqueResult();
			if (scheduledProcedure.length() > 0) {
				String opid = scheduledProcedure;

				SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=?  and sponser_id=?  ");
				q1.setParameter(0, Hall_ID);
				q1.setParameter(1, opid);
				q1.setParameter(2, pId);
				q1.setParameter(3, 0);

				// q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				Float surgeoncharge = (Float) q1.uniqueResult();
				if (surgeoncharge == null) {
					surgeoncharge = (float) 0.0;
				}
				opcharge = Float.toString(surgeoncharge);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return opcharge;
	}

	@Override
	public pharmaConsumtionDTO fetchOTPendingAmount(Integer tId) {
		
		/*
		 * Query query = sessionFactory.getCurrentSession().createSQLQuery(
		 * "select sum(patient_sales_bill_net_amt) from ehat_pharma_consumtion_master where patient_sale_treatmentId="
		 * + tId) .setCacheable(true);
		 */
		
		//fetch pending amount which is not deleted //added by vishant
		Query query = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT SUM(amount)	FROM ehat_other_bill_detail_for_ipd "
			     +" WHERE treatment_id =" + tId  +" AND drdesk_flag='P' AND deleted = 'N' AND billing_status='N' ")
				.setCacheable(true);
		
		Object list = query.uniqueResult();

		pharmaConsumtionDTO consumtionDTO = new pharmaConsumtionDTO();
		if (list == null)
			consumtionDTO.setPatientSalesBillAmountBalance(0.0);
		else
			consumtionDTO.setPatientSalesBillAmountBalance(Double.parseDouble("" + list));
		return consumtionDTO;
	}

	@Override
	public int Saveprocategaory(String txtprcName, int txtprcID, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");// current login user id

			ProcedureCat objdto1 = new ProcedureCat();
			if (txtprcID == 0) {
				objdto1.setCreatedBy(userId);
				objdto1.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			} else {
				objdto1.setUpdatedBy(userId);
				objdto1.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			}
			objdto1.setPr_id(txtprcID);
			objdto1.setPr_name(txtprcName);

			sessionFactory.getCurrentSession().merge(objdto1);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<ProcedureCat> fetchprocedureCatsedrv() {
		// TODO Auto-generated method stub
		int count = 0;
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureCat.class);
		criteria.add(Restrictions.eq("delete", "N"));
		/*
		 * criteria.add(Restrictions.eq("isCategory", "N")); Query query =
		 * sessionFactory.getCurrentSession().
		 * createQuery("from ProcedureCat p where p.delete = :delete").setString(
		 * "delete", "N");
		 */
		List<ProcedureCat> list = criteria.list();

		return list;

	}

	@Override
	public OTReportDto fetchOTReportdetails(Integer pid, String name, String fromdate, String todate, String callfrom) {

		try {
			// TODO Auto-generated method stub
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTReportDto.class);

			if (callfrom.equals("select")) {
				if (pid != null) {
					criteria.add(Restrictions.eq("patient_id", pid));
				}
				if (name.length() > 0) {
					criteria.add(Restrictions.eq("f_name", name));
				}
				if (fromdate.length() > 0) {
					if (todate.length() > 0) {
						SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
						SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
						String fromDate = sdf2.format(sdf.parse(fromdate));
						String toDate = sdf2.format(sdf.parse(todate));
						// criteria.add(Restrictions.between("DATE_FORMAT(created_date_time,
						// '%Y-%m-%d')",
						// fromDate,toDate));
						criteria.add(Restrictions.sqlRestriction("DATE_FORMAT(created_date_time, '%Y-%m-%d') >= ?",
								fromDate, StringType.INSTANCE));
						criteria.add(Restrictions.sqlRestriction("DATE_FORMAT(created_date_time, '%Y-%m-%d') <= ?",
								toDate, StringType.INSTANCE));
					}

				}

			}
			criteria.setMaxResults(20);
			List<OTReportDto> list = criteria.list();

			String op = "";
			int i = 0;

			for (OTReportDto objdto : list) {
				SQLQuery q1 = sessionFactory.getCurrentSession()
						.createSQLQuery("SELECT op.OName  from operation op ,ehat_bill_details_ipd i  where i.count_ot="
								+ objdto.getCount_ot() + " and   op.Operation_id IN(i.ot_procedure) ");
				// SQLQuery
				// q1=sessionFactory.getCurrentSession().createSQLQuery("SELECT ot_procedure
				// from ehat_bill_details_ipd where count_ot="+
				// objdto.getCount_ot() +" ");
				q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<String> oId = new ArrayList<String>();
				List<Map<String, Object>> data = q1.list();
				for (Map<String, Object> row : data) {
					String op2 = (String) row.get("OName");
					if (!oId.contains(op2)) {
						oId.add(op2);
						op = op + "," + op2;
					}

				}
				list.get(i).setOpname(op);
				objdto.setOpname(op);
				op = "";
				i++;
				// obj.setOTRepordetails(objdto.getOTRepordetails());
			}
			OTReportDto obj = new OTReportDto();
			obj.setOTRepordetails(list);
			return obj;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public Ehat_view_ot_operation_records fetchOTdetails(Integer docid, String fromdate, String todate) {
		int i = 0;
		ResourceBundle resourceBundleEhat1 = ResourceBundle.getBundle("OT_Service");
		int MainSurgan = Integer.parseInt(resourceBundleEhat1.getObject("MainSurgan").toString());
		List<Ehat_view_ot_operation_records> list1 = new ArrayList<Ehat_view_ot_operation_records>();
		List<String> list2 = new ArrayList<String>();
		List<Integer> list3 = new ArrayList<Integer>();
		List<Ehat_view_ot_operation_records> list5 = new ArrayList<Ehat_view_ot_operation_records>();
		// SQLQuery
		// q1=sessionFactory.getCurrentSession().createSQLQuery("SELECT DISTINCT
		// i.treatment_id from ehat_view_ot_operation_records i where i.doctor_id!="+
		// 0 +" and i.sub_service_id="+2302
		// +" and date(i.created_date_time) BETWEEN '"+ fromdate +"' and '"+
		// todate +"' ");
		// SQLQuery
		// q1=sessionFactory.getCurrentSession().createSQLQuery("SELECT ot_procedure
		// from ehat_bill_details_ipd where count_ot="+
		// objdto.getCount_ot() +" ");

		SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT  DISTINCT i.doctor_id  from ehat_view_ot_operation_records i where    i.sub_service_id="
						+ MainSurgan + " and i.doctor_id!=" + 0 + " and date(i.created_date_time)BETWEEN  '" + fromdate
						+ "' and '" + todate + "'");
		int toatalcount = 0;
		q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> data = q1.list();
		String trop1 = "";
		for (Map<String, Object> row : data) {
			Integer drid = (Integer) row.get("doctor_id");
			list3.add(drid);
			// String trop =Integer.toString(op2);
			// trop1= trop1 +","+trop;
			String docname1 = "";
			SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT DISTINCT i.compid from ehat_view_ot_operation_records i where i.sub_service_id="
							+ MainSurgan + " and i.doctor_id!=" + 0 + " and date(i.created_date_time)BETWEEN  '"
							+ fromdate + "' and '" + todate + "'");

			q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data1 = q2.list();
			for (Map<String, Object> row1 : data1) {
				Integer op2 = (Integer) row1.get("compid");
				List<String> listc = new ArrayList<String>();
				SQLQuery q3 = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT count(compid),company  from ehat_view_ot_operation_records i  where i.doctor_id=" + drid
								+ " and i.compid=" + op2 + " and i.sub_service_id=" + MainSurgan
								+ "  and date(i.created_date_time)BETWEEN  '" + fromdate + "' and '" + todate + "'  ");
				q3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data3 = q3.list();
				for (Map<String, Object> row2 : data3) {
					Ehat_view_ot_operation_records obj = new Ehat_view_ot_operation_records();
					obj.setCompid(op2);
					BigInteger count2 = (BigInteger) row2.get("count(compid)");
					int count = count2.intValue();
					// Integer count = ( Integer) row2.get("count(compid)");
					String company = (String) row2.get("company");
					obj.setCount(count);
					obj.setCompany(company);
					SQLQuery q4 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT doc_name  from doctor i  where i.Doctor_ID=" + drid + " ");
					String docname = (String) q4.uniqueResult();
					obj.setDocname(docname);

					list1.add(obj);
					docname1 = docname;
					toatalcount = toatalcount + count;
				}
			}
			Ehat_view_ot_operation_records obj = new Ehat_view_ot_operation_records();

			obj.setCompany("TOTAL");
			obj.setDocname(docname1);
			obj.setCompid(-1);
			obj.setCount(toatalcount);
			list5.add(obj);
			toatalcount = 0;

		}
		List<Integer> oId2 = new ArrayList<Integer>();
		// by self (hospital wise count)
		if (list3.size() > 0) {
			for (int j = 0; j < list3.size(); j++) {
				int toatalcount1 = 0;
				int drid = list3.get(j);
				SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT count(j.doctor_id),d.doc_name FROM ehat_bill_master i,ehat_bill_details_ipd j,doctor d where j.treatment_id=i.treatment_id and j.ot_flag='Y' and j.deleted='N' and j.sub_service_id="
								+ MainSurgan + "  and   d.doctor_id= j.doctor_id  and j.doctor_id=" + drid
								+ "   and i.charges_master_slave_id=" + 0 + " and date(i.created_date_time)BETWEEN  '"
								+ fromdate + "' and '" + todate + "'");
				q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data3 = q2.list();
				for (Map<String, Object> row2 : data3) {
					BigInteger count2 = (BigInteger) row2.get("count(j.doctor_id)");
					int count = count2.intValue();
					String docname = (String) row2.get("doc_name");
					Ehat_view_ot_operation_records obj1 = new Ehat_view_ot_operation_records();
					toatalcount1 = toatalcount1 + count;
					obj1.setCompany("Hospital");
					obj1.setDocname(docname);
					obj1.setCompid(-2);
					obj1.setCount(count);
					list1.add(obj1);

					int coutn = list5.get(j).getCount();
					list5.get(j).setCount(coutn + toatalcount1);

				}

			}
		} else {
			String op = "";
			String firstPart = "";
			List<Integer> oId = new ArrayList<Integer>();
			SQLQuery q0 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT DISTINCT treatment_id FROM ehat_bill_master  where  charges_master_slave_id=" + 0
							+ "   and  deleted='N' ");
			q0.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data1 = q0.list();
			for (Map<String, Object> row1 : data1) {
				Integer op2 = (Integer) row1.get("treatment_id");
				if (!oId.contains(op2)) {
					oId.add(op2);
					op = op + "," + op2;
				}
			}

			if (op.length() > 0) {
				firstPart = op.substring(1);
				SQLQuery q11 = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT  DISTINCT i.doctor_id  from ehat_bill_details_ipd i where    i.sub_service_id="
								+ MainSurgan + " and i.doctor_id!=" + 0 + " and date(i.created_date_time)BETWEEN  '"
								+ fromdate + "' and '" + todate + "' and i.treatment_id IN (" + firstPart + ")");
				q11.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data11 = q11.list();

				for (Map<String, Object> row : data11) {
					int toatalcount1 = 0;
					Integer drid = (Integer) row.get("doctor_id");

					// if(!list3.contains(drid)){

					SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT count(j.doctor_id),d.doc_name FROM ehat_bill_details_ipd j,doctor d where  j.ot_flag='Y' and j.deleted='N' and j.sub_service_id="
									+ MainSurgan + "  and   d.doctor_id= j.doctor_id  and j.doctor_id=" + drid
									+ "   and date(j.created_date_time)BETWEEN  '" + fromdate + "' and '" + todate
									+ "' and j.treatment_id IN (" + firstPart + ") ");
					q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> data3 = q2.list();
					for (Map<String, Object> row2 : data3) {
						int j = 0;
						BigInteger count2 = (BigInteger) row2.get("count(j.doctor_id)");
						int count = count2.intValue();
						String docname = (String) row2.get("doc_name");
						Ehat_view_ot_operation_records obj1 = new Ehat_view_ot_operation_records();
						toatalcount1 = toatalcount1 + count;
						obj1.setCompany("Hospital");
						obj1.setDocname(docname);
						obj1.setCompid(-2);
						obj1.setCount(count);
						list1.add(obj1);
						Ehat_view_ot_operation_records obj = new Ehat_view_ot_operation_records();

						obj.setCompany("TOTAL");
						obj.setDocname(docname);
						obj.setCompid(-1);
						obj.setCount(toatalcount1);
						list5.add(obj);
						j++;
					}
					// }
				}
			} else {
				firstPart = "";
			}
		}

		for (int j = 0; j < list5.size(); j++) {
			list1.add(list5.get(j));
		}

		// end
		Ehat_view_ot_operation_records obj = new Ehat_view_ot_operation_records();
		obj.setListdetails(list1);
		return obj;
	}

	@Override
	public Ot_cathlabDto fetchot_otcatlab(Integer docid, String fromdate, String todate) {
		int i = 0;
		List<Ot_cathlabDto> list1 = new ArrayList<Ot_cathlabDto>();
		;
		List<String> list2 = new ArrayList<String>();
		List<Integer> oId = new ArrayList<Integer>();
		String tm = "";
		SQLQuery q1 = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT distinct k.Operation_id FROM patient_operation i, operation k"
						+ "   where k.Operation_id = i.operation_ID and  k.opcathlab='Y'");
		String op = "";
		q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> data = q1.list();
		String trop1 = "";
		for (Map<String, Object> row : data) {

			Integer drid = (Integer) row.get("Operation_id");
			String firstPart = "";
			SQLQuery q2 = sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT distinct  t.Treatment_ID,i.treatmentOperationsManageID FROM "
							+ "  patient_operation i,operation k,treatmentoperationsmanage h, treatment_operations t where "
							+ "k.Operation_id = i.operation_ID  and h.treatmentOperationsManageID = i.treatmentOperationsManageID and t.ID = h.treatmentOperationsID and  i.operation_ID ="
							+ drid + " and t.date BETWEEN  '" + fromdate + "' and '" + todate + "'");

			q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data1 = q2.list();
			for (Map<String, Object> row1 : data1) {
				Integer op2 = (Integer) row1.get("Treatment_ID");
				Integer tmid = (Integer) row1.get("treatmentOperationsManageID");
				if (!oId.contains(op2)) {
					oId.add(op2);
					tm = tm + "," + tmid;
					op = op + "," + op2;
				}
			}
			if (op.length() > 0) {
				firstPart = op.substring(1);
				SQLQuery q3 = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT   sum(i.total_bill),sum(i.discount),sum(i.total_paid),sum(i.total_remain) from ehat_bill_master i  where i.treatment_id IN ("
								+ firstPart + ")  and i.deleted='N'");
				q3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data2 = q3.list();

				for (Map<String, Object> row1 : data2) {
					Long total_bill = ((Number) row1.get("sum(i.total_bill)")).longValue();
					Long discount = ((Number) row1.get("sum(i.discount)")).longValue();
					Long total_paid = ((Number) row1.get("sum(i.total_paid)")).longValue();
					Long remain = ((Number) row1.get("sum(i.total_remain)")).longValue();
					SQLQuery q11 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT   sum(amount)  from ehat_bill_details_ipd  where treatment_id IN ("
									+ firstPart + ") and ot_flag='Y'  and deleted='N' ");

					// Long procedureamt = ((Number)
					// q11.uniqueResult()).longValue();
					// for previous pending
					String sqlRef = "select ifnull(sum(total_remain), 0) from ehat_receipt_master where deleted = 'N'  and treatment_id in ("
							+ firstPart + ") and total_remain > 0 and against_id=0 and source_type_id=0";
					Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					Double totPending = (Double) billDetailsQuery.uniqueResult();
					Long duesrecd = ((Number) totPending).longValue();
					// end
					Double procamt = (Double) q11.uniqueResult();
					Long procedureamt = ((Number) procamt).longValue();
					if (remain > 0) {

					} else {
						remain = 0l;
					}
					Ot_cathlabDto obj = new Ot_cathlabDto();
					obj.setAmt(total_bill);
					obj.setDiscount(discount);
					obj.setAdvance(total_paid);
					obj.setBalbill(remain);
					Long netamt = total_bill - discount;
					Long Duesamt = remain - duesrecd;
					obj.setNetamt(netamt);
					obj.setProcedureamt(procedureamt);
					obj.setDues(duesrecd);
					obj.setDuesamt(Duesamt);
					String firstPart1 = tm.substring(1);
					SQLQuery q4 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT count(i.operation_ID),k.OName FROM patient_operation i, operation k"
									+ "   where k.Operation_id = i.operation_ID  and i.operation_ID = " + drid
									+ " and i.treatmentOperationsManageID IN (" + firstPart1
									+ ")  and k.opcathlab='Y'");
					q4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

					List<Map<String, Object>> data4 = q4.list();
					for (Map<String, Object> row2 : data4) {
						BigInteger count2 = (BigInteger) row2.get("count(i.operation_ID)");
						int count = count2.intValue();
						// Integer count = ( Integer) row2.get("count(compid)");
						String proname = (String) row2.get("OName");
						obj.setCount(count);
						obj.setProcedurename(proname);

					}
					java.sql.Timestamp date1 = new java.sql.Timestamp(System.currentTimeMillis());

					for (int k = 0; k < oId.size(); k++) {
						int trid = oId.get(k);
						Long advanceamt = 0l;
						Long advanceamtwithrcpt = 0l;
						Long rcpt = 0l;
						int count = 0;
						String flag = "";
						SQLQuery q6 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT i.invoice_flag  ,i.inv_created_date_time,count(j.bill_receipt_id)  FROM ehat_bill_master i"
										+ " ,ehat_receipt_master_ipd j  where      j.treatment_id= i.treatment_id and i.treatment_id = "
										+ trid + " and i.deleted='N' and j.deleted='N'");
						q6.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data6 = q6.list();
						for (Map<String, Object> row2 : data6) {
							BigInteger count2 = (BigInteger) row2.get("count(j.bill_receipt_id)");
							count = count2.intValue();
							date1 = (java.sql.Timestamp) row2.get("inv_created_date_time");
							flag = (String) row2.get("invoice_flag");

						}
						if (count > 0) {

							if (flag.equals("N")) {
								if (count > 0) {
									SQLQuery q8 = sessionFactory.getCurrentSession()
											.createSQLQuery("SELECT sum(total_paid) FROM   ehat_receipt_master_ipd"
													+ "   where treatment_id = " + trid + " and deleted='N'");
									Long amt = ((Number) q8.uniqueResult()).longValue();

									advanceamt = advanceamt + amt;
								}

							} else {
								if (count > 0) {
									SQLQuery q7 = sessionFactory.getCurrentSession()
											.createSQLQuery("SELECT bill_receipt_id FROM  ehat_receipt_master_ipd"
													+ "   where treatment_id = " + trid + " and deleted='N'");

									q7.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> data7 = q7.list();
									for (Map<String, Object> row2 : data7) {
										Integer bill_receipt_id = (Integer) row2.get("bill_receipt_id");

										SQLQuery q8 = sessionFactory.getCurrentSession().createSQLQuery(
												"SELECT created_date_time,total_paid FROM   ehat_receipt_master_ipd"
														+ "   where treatment_id = " + trid + " and  bill_receipt_id="
														+ bill_receipt_id + " and deleted='N'");
										q8.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										List<Map<String, Object>> data8 = q8.list();
										for (Map<String, Object> row3 : data8) {
											Long amt = ((Number) row3.get("total_paid")).longValue();
											java.sql.Timestamp date = (java.sql.Timestamp) row3
													.get("created_date_time");
											if (date.before(date1)) {
												advanceamtwithrcpt = advanceamtwithrcpt + amt;

											} else {
												rcpt = rcpt + amt;
											}

										}

									}
								}
							}
						}
						advanceamt = (advanceamt + advanceamtwithrcpt);
						obj.setAdvance(advanceamt);
						obj.setRecdbill(rcpt);
					}

					list1.add(obj);
				}
			} else {
				firstPart = "";
			}

			op = "";
		}
		Ot_cathlabDto obj1 = new Ot_cathlabDto();

		obj1.setListdetails(list1);
		return obj1;
	}

	public List<ChargesMasterSlave> fetchSuperCatPrcentMaster(Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		if (chargesMasterDto > 0) {
			// Calling stored procedure
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("CALL  fetchSuperCatogoires (:chargesMasterDto)")
					.setParameter("chargesMasterDto", chargesMasterDto);
			String result = (String) query.uniqueResult();
			String[] ary = result.split(",");

			// converting string object into Integer
			List<Integer> ae = new ArrayList<Integer>();
			for (int i = 0; i < ary.length; i++) {
				ae.add(Integer.parseInt(ary[i]));
			}
			// ae.add(chargesMasterDto);
			// First checking the Lenth should be greater then zero
			if (ary.length > 0) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
				// criteria.addOrder(Order.desc("subId"));
				criteria.add(Restrictions.in("slaveId", ae));
				ltSubCharges = criteria.list();

			}
		}

		return ltSubCharges;
	}

	@Override
	public List<AutosugeestionDto> operationcharge(Integer pId, Integer trId, String scheduledProcedure,
			String findingName, Integer unit, Integer depdocdeskid, Float chargesOS1, Integer count1,
			Integer treatmentoperationid) {
		List<AutosugeestionDto> ltSubService = new ArrayList<AutosugeestionDto>();
		/// get hallid
		/* String */
		List<Map<String, Object>> data9 = null;
		List<Map<String, Object>> data8 = null;
		SQLQuery q5 = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT percentage FROM ehat_operationmaster where opgrade =" + scheduledProcedure
						+ " and step <=" + count1 + " and unit=" + unit + " and status='N' ");
		q5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		data8 = q5.list();
		if (data8.size() == 0) {
			SQLQuery q6 = sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT percentage FROM ehat_operationmaster where  step <=" + count1 + " and unit="
							+ unit + " and status='N' ");
			q6.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			data9 = q6.list();
		}
		ResourceBundle resourceBundle = ResourceBundle.getBundle("OT_Service");
		String Op1 = (String) resourceBundle.getString("Operation1");
		String Op2 = (String) resourceBundle.getString("Operation2");
		String Op3 = (String) resourceBundle.getString("Operation3");
		String Op4 = (String) resourceBundle.getString("Operation4");
		String Op5 = (String) resourceBundle.getString("Operation5");
		Integer Operation1 = Integer.parseInt(Op1);
		Integer Operation2 = Integer.parseInt(Op2);
		Integer Operation3 = Integer.parseInt(Op3);
		Integer Operation4 = Integer.parseInt(Op4);
		Integer Operation5 = Integer.parseInt(Op5);
		double opcharge = 0.0;
		Double chargesOS = Double.parseDouble((chargesOS1).toString());
		Double chargesOS2 = Double.parseDouble((chargesOS1).toString());
		int count = 0;
		try {
			SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT  count(count_ot) from ehat_bill_details_ipd  where ot_flag= 'Y'   and  deleted='N'   and  drdesk_flag='C' and treatment_id="
							+ trId + " ");
			Object id = q1.uniqueResult();
			int billcount = ((BigInteger) id).intValue();

			if (billcount > 0) {
				/*
				 * SQLQuery q=sessionFactory.getCurrentSession().
				 * createSQLQuery("SELECT  count(h.treatmentOperationsManageID) from treatment_operations tb,treatmentoperationsmanage bd, patient_operation h where  bd.treatmentOperationsID = tb.ID   and  h.treatmentOperationsManageID=bd.treatmentOperationsManageID  and tb.ID!="
				 * + treatmentoperationid +"  and  tb.Treatment_ID="+ trId
				 * +" and h.operation_ID!="+ 0 +""); Object id2 = q.uniqueResult(); int
				 * countpreop= ((BigInteger) id2 ).intValue();
				 */
				int countpreop = 0;
				SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT  h.treatmentOperationsManageID as tm from treatment_operations tb,treatmentoperationsmanage bd, patient_operation h where  bd.treatmentOperationsID = tb.ID   and  h.treatmentOperationsManageID=bd.treatmentOperationsManageID  and tb.ID!="
								+ treatmentoperationid + "  and  tb.Treatment_ID=" + trId + " and h.operation_ID!=" + 0
								+ "");
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data = q.list();
				for (Map<String, Object> row : data) {
					Integer tmid = (Integer) row.get("tm");
					SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT  count(count_ot) from ehat_bill_details_ipd  where ot_flag= 'Y'   and  deleted='N'   and  drdesk_flag='C' and treatment_id="
									+ trId + " and count_ot=" + tmid + "");
					Object id1 = q2.uniqueResult();
					int counttm = ((BigInteger) id1).intValue();
					if (counttm > 0) {
						countpreop++;
					}
				}

				int countpreop2 = countpreop;
				if (countpreop > 0) {
					countpreop = count1 + countpreop;
					int countpreopbill = countpreop;
					Double percrntage = 100.00;
					while (countpreop > 0) {
						Query q9 = null;

						if (data8.size() > 0) {

							q9 = sessionFactory.getCurrentSession()
									.createSQLQuery("SELECT percentage FROM ehat_operationmaster where opgrade ="
											+ scheduledProcedure + " and step =" + countpreop + " and unit=" + unit
											+ " and status='N' ");
							percrntage = (Double) q9.uniqueResult();
						} else {
							q9 = sessionFactory.getCurrentSession()
									.createSQLQuery("SELECT percentage FROM ehat_operationmaster where  step ="
											+ countpreop + " and unit=" + unit + " and opgrade =0 and status='N' ");
							percrntage = (Double) q9.uniqueResult();
							if (percrntage == null) {

							}
						}

						if (percrntage != null) {
							break;
						} else {
							countpreop--;
						}
					}

					if (countpreopbill > 0) {
						SQLQuery q51 = sessionFactory.getCurrentSession()
								.createSQLQuery("SELECT percentage FROM ehat_operationmaster where opgrade ="
										+ scheduledProcedure + " and step <=" + countpreopbill + " and  step > "
										+ countpreop2 + " and unit=" + unit + "");
						q5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						data8 = q51.list();
						if (data8.size() == 0) {
							SQLQuery q61 = sessionFactory.getCurrentSession()
									.createSQLQuery("SELECT percentage FROM ehat_operationmaster where   step <="
											+ countpreopbill + " and  step > " + countpreop2 + " and unit=" + unit
											+ "");
							q61.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							data9 = q61.list();
							if (data9.size() == 0) {
								SQLQuery q67 = sessionFactory.getCurrentSession()
										.createSQLQuery("SELECT percentage FROM ehat_operationmaster where    step ="
												+ countpreop2 + " and unit=" + unit + "");
								q67.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								data9 = q67.list();
							}
						}

					}
					Double fc = Double.parseDouble((chargesOS).toString());
					Double fc1 = Double.parseDouble((chargesOS).toString());
					fc = (fc * percrntage) / 100;
					chargesOS = fc;

					/*
					 * if(countpreop==2){ Double fc=Double.parseDouble((chargesOS).toString()) ;
					 * fc=(fc * Operation2)/100; chargesOS= fc; }else if(countpreop==3){ Double
					 * fc=Double.parseDouble((chargesOS).toString()) ;
					 * 
					 * fc=(fc * Operation3)/100; chargesOS=fc; }else if(countpreop==4){ Double
					 * fc=Double.parseDouble((chargesOS).toString()) ;
					 * 
					 * fc=(fc * Operation4)/100; chargesOS=fc; }else if(countpreop==5){ Double
					 * fc=Double.parseDouble((chargesOS).toString()) ;
					 * 
					 * fc=(fc * Operation5)/100; chargesOS=fc; }else{
					 * 
					 * Double fc=Double.parseDouble((chargesOS).toString()) ;
					 * 
					 * fc=(fc * Operation5)/100; chargesOS=fc;
					 * 
					 * }
					 */

				}
			}
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AutosugeestionDto.class);
			criteria.add(Restrictions.eq("categorydeleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.add(Restrictions.eq("servicdeleted", "N"));
			criteria.add(Restrictions.eq("unitid", unit));
			// criteria.add(Restrictions.eq("serviceid", 0));
			criteria.add(Restrictions.eq("dept_id", depdocdeskid));
			criteria.add(Restrictions.like("categoryName", findingName + "%"));
			ltSubService = criteria.list();
			if (chargesOS != 0.0) {
				for (int i = 0; i < ltSubService.size(); i++) {
					Integer childid = ltSubService.get(i).getCategoryid();
					Integer servid = ltSubService.get(i).getServiceid();

					Double percentage = (Double) sessionFactory.getCurrentSession().createQuery(
							"select e.percentage from OTPercentageDTO e where e.childSubServiceId = :id and e.serviceId = :serviceId and e.confugrationflag = :confugrationflag")
							.setInteger("id", childid).setInteger("serviceId", servid)
							.setString("confugrationflag", "N").uniqueResult();

					if (percentage == null || percentage == 0.0) {
						percentage = 0.0;
					} else {
						if (billcount > 0) {
							Double finalcharge = (chargesOS2 * percentage) / 100;
							Double finalcharge1 = 0.0;
							if (data8.size() > 0) {
								for (Map<String, Object> row3 : data8) {
									Double percrntage = (Double) row3.get("percentage");
									Double fc = finalcharge;
									fc = (fc * percrntage) / 100;
									if (count1 > 1) {

										finalcharge1 = finalcharge1 + fc;

									} else {
										if (count1 == 1) {
											finalcharge1 = fc;
										}

									}

								}
								ltSubService.get(i).setCategorycharges(finalcharge1);
							} else if (data9.size() > 0) {
								for (Map<String, Object> row3 : data9) {
									Double percrntage = (Double) row3.get("percentage");
									Double fc = finalcharge;
									fc = (fc * percrntage) / 100;
									if (count1 > 1) {
										if (data9.size() == 1) {
											finalcharge1 = count1 * fc;
										} else {
											finalcharge1 = finalcharge1 + fc;
										}

									} else {
										if (count1 == 1) {
											finalcharge1 = fc;
										}

									}

								}
								ltSubService.get(i).setCategorycharges(finalcharge1);
							} else {
								ltSubService.get(i).setCategorycharges(finalcharge);
							}
						} else {
							Double finalcharge = (chargesOS * percentage) / 100;
							Double finalcharge1 = 0.0;
							if (data8.size() > 0) {
								for (Map<String, Object> row3 : data8) {
									Double percrntage = (Double) row3.get("percentage");
									Double fc = finalcharge;
									fc = (fc * percrntage) / 100;
									if (count1 > 1) {
										if (percrntage != 100) {
											finalcharge1 = finalcharge1 + fc;
										}

									} else {
										if (count1 == 1) {
											finalcharge1 = fc;
										}

									}

								}
								ltSubService.get(i).setCategorycharges(finalcharge1);
							} else if (data9.size() > 0) {
								for (Map<String, Object> row3 : data9) {
									Double percrntage = (Double) row3.get("percentage");
									Double fc = finalcharge;
									fc = (fc * percrntage) / 100;
									if (count1 > 1) {
										if (data9.size() == 1) {
											finalcharge1 = count1 * fc;
										} else {
											finalcharge1 = finalcharge1 + fc;
										}

									} else {
										if (count1 == 1) {
											finalcharge1 = fc;
										}

									}

								}
								ltSubService.get(i).setCategorycharges(finalcharge1);
							} else {
								ltSubService.get(i).setCategorycharges(finalcharge);
							}
						}

						/*
						 * if(count1==1 ){ ltSubService.get(i).setCategorycharges(finalcharge); }else{
						 * if(count1==2){ Double fc= finalcharge; fc=(fc * Operation2)/100;
						 * finalcharge=finalcharge+fc;
						 * ltSubService.get(i).setCategorycharges(finalcharge); }else if(count1==3){
						 * Double fc= finalcharge; Double fc1= finalcharge; fc1=(fc1 * Operation2)/100;
						 * fc=(fc * Operation3)/100; finalcharge=finalcharge+fc + fc1;
						 * ltSubService.get(i).setCategorycharges(finalcharge); }else if(count1==4){
						 * Double fc= finalcharge; Double fc1= finalcharge; Double fc2= finalcharge;
						 * fc1=(fc1 * Operation2)/100; fc2=(fc2 * Operation3)/100; fc=(fc *
						 * Operation4)/100; finalcharge=finalcharge + fc + fc2 + fc1 ;
						 * ltSubService.get(i).setCategorycharges(finalcharge); }else if(count1==5){
						 * Double fc3= finalcharge; Double fc1= finalcharge; Double fc2= finalcharge;
						 * fc3=(fc3 * Operation2)/100; fc2=(fc2 * Operation3)/100; fc1=(fc1 *
						 * Operation4)/100; Double fc= finalcharge; fc=(fc * Operation5)/100;
						 * finalcharge=finalcharge+fc +fc1 + fc2 + fc3;
						 * ltSubService.get(i).setCategorycharges(finalcharge);
						 * 
						 * } }
						 */

					}

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return ltSubService;
	}

	@Override
	public int SaveOPmaster(String txtpr, int txtprcID, int opgrade, int txtstep, int unit,
			HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");// current login user id

			OperationMaster objdto1 = new OperationMaster();
			if (txtprcID == 0) {
				objdto1.setCreatedBy(userId);
				objdto1.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			} else {
				objdto1.setUpdatedBy(userId);
				objdto1.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			}
			objdto1.setPr_id(txtprcID);
			objdto1.setPercentage(Double.parseDouble(txtpr));
			objdto1.setOpgrade(opgrade);
			objdto1.setUnit(unit);
			objdto1.setStep(txtstep);

			sessionFactory.getCurrentSession().merge(objdto1);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;

	}

	@Override
	public List<OperationMaster> fetchOperationmaster() {
		// TODO Auto-generated method stub
		int count = 0;
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationMaster.class);
		criteria.add(Restrictions.eq("delete", "N"));
		/*
		 * criteria.add(Restrictions.eq("isCategory", "N")); Query query =
		 * sessionFactory.getCurrentSession().
		 * createQuery("from ProcedureCat p where p.delete = :delete").setString(
		 * "delete", "N");
		 */
		List<OperationMaster> list = criteria.list();

		return list;

	}

	@Override
	public Integer fetchcountOT(Integer patienttId, Integer treatmentId, String callform,
			Integer treatmentoperationid) {
		Integer countpreop = 0;
		try {

			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT  count(*) from ehat_bill_details_ipd  where ot_flag= 'Y'   and  deleted='N'    and treatment_id="
							+ treatmentId + " and  count_ot =" + treatmentoperationid
							+ " and   (drdesk_flag='C' or drdesk_flag='I' or drdesk_flag='P') ");
			Object id2 = q.uniqueResult();
			countpreop = ((BigInteger) id2).intValue();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return countpreop;
	}

	@Override
	public int saveOtConsentDetails(otConsentDTO objDto, HttpServletRequest request) {
		int Result = 0;
		try {
			HttpSession session = request.getSession();
			int UserId = (Integer) session.getAttribute("userId");
			int id = objDto.getIdforconsnt();
			if (id == 0) {
				objDto.setAddedBy(UserId);
				objDto.setAddedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().save(objDto);
				Result = 1;
			} else {
				objDto.setUpdatedBy(UserId);
				objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().saveOrUpdate(objDto);
				Result = 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		return Result;
	}

	@Override
	public List<otConsentDTO> fetchOtConsentDetails(int patientId, int treatmentId) {

		List<otConsentDTO> listInitial = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(otConsentDTO.class);
			criteria.add(Restrictions.eq("pid", patientId));
			criteria.add(Restrictions.eq("tid", treatmentId));
			listInitial = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listInitial;
	}

	@Override
	public List<CustomizeTemplate> getAllOTTemplates() {

		List<CustomizeTemplate> lstOTTemplate = new ArrayList<CustomizeTemplate>();
		String sql = "select * from customizetemplate where select_template_type='o'";

		Query otTemplate = sessionFactory.getCurrentSession().createSQLQuery(sql);
		otTemplate.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> otTemplateList = otTemplate.list();

		for (Map<String, Object> rs : otTemplateList) {
			CustomizeTemplate obj = new CustomizeTemplate();

			obj.setIdCustomizeTemplate((Integer) rs.get("idCustomizeTemplate"));
			obj.setTemp_name((String) rs.get("temp_name"));
			obj.setTemp_data((String) rs.get("temp_data"));
			lstOTTemplate.add(obj);
		}

		return lstOTTemplate;

	}

	@Override
	public List<CustomizeTemplate> getOTTemplateDataById(HttpServletRequest request, Integer templateId) {

		List<CustomizeTemplate> lstOTTemplate = new ArrayList<CustomizeTemplate>();
		String sql = "select * from customizetemplate where idCustomizeTemplate=" + templateId;

		Query otTemplate = sessionFactory.getCurrentSession().createSQLQuery(sql);
		otTemplate.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> otTemplateList = otTemplate.list();

		for (Map<String, Object> rs : otTemplateList) {
			CustomizeTemplate obj = new CustomizeTemplate();

			obj.setIdCustomizeTemplate((Integer) rs.get("idCustomizeTemplate"));
			obj.setTemp_name((String) rs.get("temp_name"));
			obj.setTemp_data((String) rs.get("temp_data"));
			lstOTTemplate.add(obj);
		}

		return lstOTTemplate;

	}

	@Override
	public int saveOTConsentForm(OTConsentFormDTO otConsentFormDTO, HttpServletRequest request) {
		try {
			sessionFactory.getCurrentSession().merge(otConsentFormDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public OTConsentFormDTO getAllOtConsentForms(HttpServletRequest request) {
		List<OTConsentFormDTO> ltOTConsentForms = new ArrayList<OTConsentFormDTO>();
		List<CustomizeTemplate> ltTemplateName = new ArrayList<CustomizeTemplate>();
		OTConsentFormDTO otConsentForm = new OTConsentFormDTO();
		String tempName = "";
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTConsentFormDTO.class);
			criteria.addOrder(Order.desc("otConsentFormId"));
			criteria.add(Restrictions.eq("status", "Y"));
			// criteria.setMaxResults(10);
			ltOTConsentForms = criteria.list();

			for (OTConsentFormDTO consentObj : ltOTConsentForms) {

				String sql = "select temp_name,idCustomizeTemplate from customizetemplate where idCustomizeTemplate ="
						+ consentObj.getTempListId();
				Query tempNames = sessionFactory.getCurrentSession().createSQLQuery(sql);
				tempNames.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listTemplateNames = tempNames.list();
				for (Map<String, Object> row : listTemplateNames) {

					CustomizeTemplate obj = new CustomizeTemplate();
					obj.setTemp_name((String) row.get("temp_name"));
					obj.setIdCustomizeTemplate((Integer) row.get("idCustomizeTemplate"));
					ltTemplateName.add(obj);
				}
			}
			otConsentForm.setLstOtConsentForm(ltOTConsentForms);
			// otConsentForm.setLstTemplateNames(ltTemplateName);

		} catch (Exception e) {
			e.printStackTrace();
			return otConsentForm;
		}

		return otConsentForm;
	}

	@Override
	public List<OTConsentFormDTO> getOTConsentDataById(HttpServletRequest request, Integer templateId) {
		List<OTConsentFormDTO> ltOTConsentForm = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTConsentFormDTO.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("otConsentFormId", templateId));
			// criteria.setMaxResults(10);
			ltOTConsentForm = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ltOTConsentForm;
		}
		return ltOTConsentForm;
	}

	@Override
	public SurgreyWiseDto getreportsurgery(String opname, String fromdate, String todate) {
		SurgreyWiseDto sdtails = new SurgreyWiseDto();
		List<SurgreyWiseDto> ltOTConsentForm = new ArrayList<SurgreyWiseDto>();
		try {
			/*
			 * SQLQuery q=sessionFactory.getCurrentSession().
			 * createSQLQuery("SELECT  h.operation_name as operation_name ,tb.date as opdate,ep.patient_name as patient_name, ep.patient_id as patient_id, tb.Treatment_ID as Treatment_ID ,tb.Start_Time as Start_Time, tb.End_Time as End_Time,tb.ot_id as ot_id "
			 * +
			 * "from ehat_view_registration ep , treatment_operations tb,treatmentoperationsmanage bd, patient_operation h where    ep.treatment_id=tb.Treatment_ID and   tb.ID = bd.treatmentOperationsID  "
			 * + " and bd.treatmentOperationsManageID =  h.treatmentOperationsManageID  "
			 * +" and h.operation_ID="+ opname +" and  tb.date BETWEEN  '" + fromdate +
			 * "' and '" + todate + "'");
			 */

			String sql = "";

			if (Integer.parseInt(opname) == 0) {

				sql = "SELECT h.idpatient_operation as op_id,h.operation_name AS operation_name, h.operation_ID,tb.date AS opdate,CONCAT(ep.prefix,'',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name, "
						+ " ep.patient_id AS patient_id,ep.center_patient_id AS centerPatientId,tb.Treatment_ID AS Treatment_ID,tb.Start_Time AS Start_Time,tb.End_Time AS End_Time,tb.ot_id AS ot_id "
						+ " FROM ehat_patient ep JOIN ehat_treatment t ON ((ep.patient_id = t.patient_id)) and (t.deleted = 'N') and t.treatment_id IN (SELECT subquery_regview.treatment_id FROM subquery_regview), "
						+ " treatment_operations tb,treatmentoperationsmanage bd,patient_operation h WHERE t.treatment_id = tb.Treatment_ID AND tb.ID = bd.treatmentOperationsID "
						+ " AND bd.treatmentOperationsManageID = h.treatmentOperationsManageID and tb.date BETWEEN '"
						+ fromdate + "' and '" + todate + "' order by tb.date desc";
			} else {

				sql = "SELECT h.idpatient_operation as op_id,h.operation_name AS operation_name, h.operation_ID,tb.date AS opdate,CONCAT(ep.prefix,'',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name, "
						+ " ep.patient_id AS patient_id,ep.center_patient_id AS centerPatientId,tb.Treatment_ID AS Treatment_ID,tb.Start_Time AS Start_Time,tb.End_Time AS End_Time,tb.ot_id AS ot_id "
						+ " FROM ehat_patient ep JOIN ehat_treatment t ON ((ep.patient_id = t.patient_id)) and (t.deleted = 'N') and t.treatment_id IN (SELECT subquery_regview.treatment_id FROM subquery_regview), "
						+ " treatment_operations tb,treatmentoperationsmanage bd,patient_operation h WHERE t.treatment_id = tb.Treatment_ID AND tb.ID = bd.treatmentOperationsID "
						+ " AND bd.treatmentOperationsManageID = h.treatmentOperationsManageID AND h.operation_ID = "
						+ opname + " and tb.date BETWEEN '" + fromdate + "' and '" + todate + "' order by tb.date desc";
			}

			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data = q.list();
			for (Map<String, Object> row : data) {
				Integer trId = (Integer) row.get("Treatment_ID");
				opname = String.valueOf((Integer) row.get("op_id"));

				SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT  count(count_ot) from ehat_bill_details_ipd  where ot_flag= 'Y'   and  deleted='N' ");
				Object id = q1.uniqueResult();
				int billcount = ((BigInteger) id).intValue();
				if (billcount > 0) {
					SurgreyWiseDto surgerydteails = new SurgreyWiseDto();
					surgerydteails.setStarttime((String) row.get("Start_Time"));
					surgerydteails.setEndtime((String) row.get("End_Time"));
					surgerydteails.setPatientid((Integer) row.get("patient_id"));
					surgerydteails.setCenterPatientId((String) row.get("center_patient_id"));
					surgerydteails.setPatientname((String) row.get("patient_name"));
					surgerydteails.setOpdate((String) row.get("opdate"));
					surgerydteails.setSugeryname((String) row.get("operation_name"));
					Integer opid = (Integer) row.get("operation_ID");
					SQLQuery q2 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT  ot_name from ot_type  where status= 'Y'   and  idot_name="
									+ row.get("ot_id") + "    ");
					String OTname = (String) q2.uniqueResult();

					SQLQuery q3 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT og.group_type from operation op ,operation_groups og  where op.status= 'Y'   and og.idoperation_groups = op.opstate  and     op.Operation_id="
									+ opid + "    ");
					String depatment = (String) q3.uniqueResult();
					SQLQuery q4 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT og.name from operation op ,operation_type_tbl og  where op.status= 'Y'   and og.idoperation_type_tbl = op.opType  and     op.Operation_id="
									+ opid + "    ");
					String protype = (String) q4.uniqueResult();
					surgerydteails.setDepartment(depatment);
					surgerydteails.setProtype(protype);
					surgerydteails.setOtroom(OTname);
					ltOTConsentForm.add(surgerydteails);
				}
			}
			sdtails.setOTRepordetails(ltOTConsentForm);

		} catch (Exception e) {
			e.printStackTrace();
			return sdtails;
		}
		return sdtails;
	}

	@Override
	public String fetchdrramount(Integer treatmentId, String callform, Integer drid, String time) {
		String sql = "";
		String ammount = "0";
		Integer hallid = 0;
		try {
			String sqlhosp = "SELECT if(doctorRoundFrom > doctorRoundTo,'Y','N') as count FROM hospitalaccinfo";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sqlhosp);

			String count = (String) query.uniqueResult();
			SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
			SimpleDateFormat parseFormat = new SimpleDateFormat("hh:mm");
			Date drrtime = parseFormat.parse(time);
			String stringDRRTime = sdf.format(drrtime);
			sql = "SELECT doctorRoundChargesAfterRoundTime FROM hospitalaccinfo";
			SQLQuery queryamt = sessionFactory.getCurrentSession().createSQLQuery(sql);

			Float perAmt = (Float) queryamt.uniqueResult();
			if (count.equals("Y")) {

				sql = "select count(*) from hospitalaccinfo where (CAST( '" + stringDRRTime
						+ "' as time) >= doctorRoundFrom or CAST( '" + stringDRRTime + "' as time) < doctorRoundTo) ";

			} else {

				sql = "select count(*) from hospitalaccinfo where CAST( '" + stringDRRTime
						+ "' as time) BETWEEN CAST(doctorRoundFrom as time) AND CAST(doctorRoundTo as time)";
			}

			SQLQuery counttm = sessionFactory.getCurrentSession().createSQLQuery(sql);
			BigInteger ob1 = (BigInteger) counttm.uniqueResult();
			Integer emergencyTimeFlag = ((BigInteger) ob1).intValue();

			String sqlhallid = "SELECT  ht.ehat_halltype_id from ehat_bill_details_ipd tb,beds bd, hall h ,hall_type ht where      ht.idhall_type = h.Htype and h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.sub_service_id  and   tb.treatment_id=? and tb.on_bed_flag=? and tb.service_id=? ";
			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sqlhallid);
			q.setParameter(0, treatmentId);
			q.setParameter(1, "Y");
			q.setParameter(2, 3);
			// Object id2 = q.uniqueResult();
			hallid = (Integer) q.uniqueResult();
			sql = "SELECT dr_amnt from  ehat_doctorround_master  where  dr_id=?   and  hallslave_id =?   and drflag=?  ";
			SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			q1.setParameter(0, drid);
			q1.setParameter(1, hallid);
			q1.setParameter(2, "H");
			Object ch = q1.uniqueResult();
			Double drcharhes = (Double) ch;
			if (drcharhes == null) {
				drcharhes = 0.0;
			}
			if (perAmt == null) {
				perAmt = 0f;
			}

			// if(callform.equals("SP")){

			if (emergencyTimeFlag != 0) {

				drcharhes = drcharhes + ((drcharhes * perAmt) / 100);

			}
			ammount = drcharhes.toString();
			sql = "select b.charges_master_slave_id from ehat_bill_master b,ehat_treatment t where t.treatment_id=b.treatment_id and b.deleted='N' and t.treatment_id ="
					+ treatmentId + "";
			SQLQuery q4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			Integer sponserid = (Integer) q4.uniqueResult();

			if (sponserid > 0) {
				sql = "SELECT dr_amnt from  ehat_doctorround_master  where  dr_id=?   and  hallslave_id =?  and   sponserslave_id=? and drflag=?  ";
				SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				q2.setParameter(0, drid);
				q2.setParameter(1, hallid);
				q2.setParameter(2, sponserid);
				q2.setParameter(3, "S");
				Object ch1 = q2.uniqueResult();
				Double sponsercharge = (Double) ch1;
				if (emergencyTimeFlag != 0) {

					sponsercharge = sponsercharge + ((sponsercharge * perAmt) / 100);

				}
				String ammountsp = sponsercharge.toString();

				ammount = ammount + "_" + ammountsp;
			} else {
				ammount = ammount + "_" + 0;
			}

			// }else{

			// }

		} catch (Exception e) {
			e.printStackTrace();
			return ammount;
		}
		return ammount;
	}

	@Override
	public Double operationchargeNew(Integer pId, Integer trId, String scheduledProcedure, String findingName,
			Integer unit, Integer depdocdeskid, Float chargesOS1, Integer count1, Integer treatmentoperationid,
			String otProcedure) {
		List<AutosugeestionDto> ltSubService = new ArrayList<AutosugeestionDto>();
		/// get hallid
		/* String */
		String operationid[] = otProcedure.split(",");

		Double finalservisecharge = 0.0;
		Double finalservisecargeoperation = 0.0;
		List<Map<String, Object>> data9 = null;
		List<Map<String, Object>> data8 = null;
		try {
			int opcount = 1;
			for (int j = 0; j < operationid.length; j++) {
				/*
				 * SQLQuery q5=sessionFactory.getCurrentSession().
				 * createSQLQuery("SELECT percentage FROM ehat_operationmaster where opgrade ="+
				 * scheduledProcedure + " and step <="+ count1 + " and unit="+ unit
				 * +" and status='N'"); q5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				 * data8 = q5.list();
				 */

				SQLQuery q6 = sessionFactory.getCurrentSession()
						.createSQLQuery("SELECT percentage FROM ehat_operationmaster where  step =" + opcount
								+ " and unit=" + unit + " and status='N' ");
				q6.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				data9 = q6.list();
				if (data9.size() == 0) {
					if (opcount != 1) {
						opcount--;

						SQLQuery q7 = sessionFactory.getCurrentSession()
								.createSQLQuery("SELECT percentage FROM ehat_operationmaster where  step =" + opcount
										+ " and unit=" + unit + " and status='N' ");
						q7.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						data9 = q7.list();
					}

				}
				opcount++;
				if (data9.size() > 0) {
					ResourceBundle resourceBundle = ResourceBundle.getBundle("OT_Service");
					String Op1 = (String) resourceBundle.getString("Operation1");
					String Op2 = (String) resourceBundle.getString("Operation2");
					String Op3 = (String) resourceBundle.getString("Operation3");
					String Op4 = (String) resourceBundle.getString("Operation4");
					String Op5 = (String) resourceBundle.getString("Operation5");
					Integer Operation1 = Integer.parseInt(Op1);
					Integer Operation2 = Integer.parseInt(Op2);
					Integer Operation3 = Integer.parseInt(Op3);
					Integer Operation4 = Integer.parseInt(Op4);
					Integer Operation5 = Integer.parseInt(Op5);
					double opcharge = 0.0;
					Double chargesOS = Double.parseDouble((chargesOS1).toString());
					Double chargesOS2 = Double.parseDouble((chargesOS1).toString());
					int count = 0;

					String chargesoperation = hallwisechargeOTSurganwise(0, trId, operationid[j], "SP");
					if (chargesoperation == null) {
						chargesoperation = "0.0";
					}
					chargesOS = Double.parseDouble((chargesoperation).toString());
					chargesOS2 = Double.parseDouble((chargesoperation).toString());

					Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AutosugeestionDto.class);
					criteria.add(Restrictions.eq("categorydeleted", "N"));
					criteria.add(Restrictions.eq("isCategory", "N"));
					criteria.add(Restrictions.eq("servicdeleted", "N"));
					criteria.add(Restrictions.eq("unitid", unit));
					// criteria.add(Restrictions.eq("serviceid", 0));
					criteria.add(Restrictions.eq("dept_id", depdocdeskid));
					criteria.add(Restrictions.eq("categoryid", Integer.parseInt(findingName)));
					ltSubService = criteria.list();
					if (chargesOS != 0.0) {
						for (int i = 0; i < ltSubService.size(); i++) {
							Integer childid = ltSubService.get(i).getCategoryid();
							Integer servid = ltSubService.get(i).getServiceid();

							Double percentage = (Double) sessionFactory.getCurrentSession().createQuery(
									"select e.percentage from OTPercentageDTO e where e.childSubServiceId = :id and e.serviceId = :serviceId and e.confugrationflag = :confugrationflag")
									.setInteger("id", childid).setInteger("serviceId", servid)
									.setString("confugrationflag", "N").uniqueResult();

							if (percentage == null || percentage == 0.0) {
								percentage = 0.0;
							} else {

								Double finalcharge = (chargesOS * percentage) / 100;
								Double finalcharge1 = 0.0;
								if (data9.size() > 0) {
									for (Map<String, Object> row3 : data9) {
										Double percrntage = (Double) row3.get("percentage");
										Double fc = finalcharge;
										fc = (fc * percrntage) / 100;
										finalcharge1 = fc;

									}
									/*
									 * if(count1 > data9.size() ){ int countremaining =count1-data9.size(); int id=
									 * data9.size()- 1; Double reamingcharge =chargesOS; int idSize = data9.size();
									 * 
									 * final Map<String, Object> lastEntry = data9.get(data9.size() - 1); Double
									 * percentagefinal= (Double)lastEntry.get("percentage");
									 * reamingcharge=(reamingcharge * percentagefinal)/100; reamingcharge =
									 * reamingcharge * countremaining; finalcharge1 = finalcharge1 + reamingcharge;
									 * }
									 */
									finalservisecharge = finalcharge1;
									ltSubService.get(i).setCategorycharges(finalcharge1);
								} else {
									finalservisecharge = finalcharge;
									ltSubService.get(i).setCategorycharges(finalcharge);
								}

								finalservisecargeoperation = finalservisecargeoperation + finalservisecharge;

								/*
								 * if(count1==1 ){ ltSubService.get(i).setCategorycharges(finalcharge); }else{
								 * if(count1==2){ Double fc= finalcharge; fc=(fc * Operation2)/100;
								 * finalcharge=finalcharge+fc;
								 * ltSubService.get(i).setCategorycharges(finalcharge); }else if(count1==3){
								 * Double fc= finalcharge; Double fc1= finalcharge; fc1=(fc1 * Operation2)/100;
								 * fc=(fc * Operation3)/100; finalcharge=finalcharge+fc + fc1;
								 * ltSubService.get(i).setCategorycharges(finalcharge); }else if(count1==4){
								 * Double fc= finalcharge; Double fc1= finalcharge; Double fc2= finalcharge;
								 * fc1=(fc1 * Operation2)/100; fc2=(fc2 * Operation3)/100; fc=(fc *
								 * Operation4)/100; finalcharge=finalcharge + fc + fc2 + fc1 ;
								 * ltSubService.get(i).setCategorycharges(finalcharge); }else if(count1==5){
								 * Double fc3= finalcharge; Double fc1= finalcharge; Double fc2= finalcharge;
								 * fc3=(fc3 * Operation2)/100; fc2=(fc2 * Operation3)/100; fc1=(fc1 *
								 * Operation4)/100; Double fc= finalcharge; fc=(fc * Operation5)/100;
								 * finalcharge=finalcharge+fc +fc1 + fc2 + fc3;
								 * ltSubService.get(i).setCategorycharges(finalcharge);
								 * 
								 * } }
								 */
							}

						}

					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return finalservisecargeoperation;
	}

	@Override
	public String hallwisechargeOTSurganwise(Integer pId, Integer trId, String scheduledProcedure, String callfrom) {

		int count = 0;
		String opcharge = "";
		List<Map<String, Object>> Operationlist = null;
		Float finalcharge = 0f;
		try {
			if (scheduledProcedure.length() > 0) {
				SQLQuery q5 = sessionFactory.getCurrentSession()
						.createSQLQuery("SELECT opgrade,opstate FROM operation where Operation_id IN ("
								+ scheduledProcedure + ") and  status='Y'");
				q5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				Operationlist = q5.list();

				for (Map<String, Object> row3 : Operationlist) {

					Integer OTgroupid = Integer.parseInt((String) row3.get("opstate"));
					Integer OTcatid = Integer.parseInt((String) row3.get("opgrade"));

					// SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.Htype
					// from treatment_beds tb,beds bd, hall h where h.Hall_ID = bd.Hall_ID and
					// bd.Bed_ID=tb.Bed_ID and tb.Treatment_ID=? ");
					if (callfrom.equals("hall")) {
						String opid = scheduledProcedure;
						SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT  h.Htype from ehat_bill_details_ipd tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.sub_service_id  and   tb.treatment_id="
										+ trId + " and tb.on_bed_flag='Y' and tb.service_id=" + 3 + " ");
						String Hall_ID = (String) q.uniqueResult();
						if (scheduledProcedure.length() > 0) {
							SQLQuery q1 = null;

							q1 = sessionFactory.getCurrentSession().createSQLQuery(
									"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=?  and sponser_id=?");
							q1.setParameter(0, Integer.parseInt(Hall_ID));
							q1.setParameter(1, OTcatid);
							q1.setParameter(2, OTgroupid);
							q1.setParameter(3, 0);

							Float surgeoncharge = (Float) q1.uniqueResult();
							if (surgeoncharge == null) {
								surgeoncharge = (float) 0.0;
							}
							finalcharge = finalcharge + surgeoncharge;
						}
					} else {
						SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT  h.Htype from ehat_bill_details_ipd tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.sub_service_id  and   tb.treatment_id="
										+ trId + " and tb.on_bed_flag='Y' and tb.service_id=" + 3 + " ");
						System.out.println("qury=====" + q);
						// q.setParameter(0,trId);
						// q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						String Hall_ID = (String) q.uniqueResult();
						if (scheduledProcedure.length() > 0) {
							String opid = scheduledProcedure;
							SQLQuery q1 = null;
							SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(
									"SELECT  charges_master_slave_id from  ehat_bill_master  Where treatment_id=" + trId
											+ " and deleted='N'");
							Integer charges_master_slave_id = (Integer) q2.uniqueResult();
							if (charges_master_slave_id > 0) {
								// SQLQuery q3=sessionFactory.getCurrentSession().createSQLQuery("SELECT selfId
								// from ehat_charges_master_slave Where id="+ charges_master_slave_id +" and
								// deleted='N'");
								// Integer selfid= (Integer) q3.uniqueResult();

								List<ChargesMasterSlave> list = fetchSuperCatPrcentMaster(charges_master_slave_id);
								Integer selfid = list.get(0).getSlaveId();
								q1 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=? and sponser_id=?  ");
								q1.setParameter(0, Integer.parseInt(Hall_ID));
								q1.setParameter(1, OTcatid);
								q1.setParameter(2, OTgroupid);
								q1.setParameter(3, selfid);
							} else {
								q1 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=? and sponser_id=? ");
								q1.setParameter(0, Integer.parseInt(Hall_ID));
								q1.setParameter(1, OTcatid);
								q1.setParameter(2, OTgroupid);
								q1.setParameter(3, 0);
							}

							// q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

							Float surgeoncharge = (Float) q1.uniqueResult();
							if (surgeoncharge == null) {
								surgeoncharge = (float) 0.0;
							}
							finalcharge = finalcharge + surgeoncharge;

						}

					}

				}

			}

			opcharge = Float.toString(finalcharge);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return opcharge;
	}

	@Override
	public double getEmergancyChargesOTfinal() {
		double a = 0;
		try {
			Query emerChr = sessionFactory.getCurrentSession()
					.createSQLQuery("select operationEmergencyCharges from hospitalaccinfo where idhospitalAccInfo=1");

			a = (Float) emerChr.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :" + new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : " + new Exception().getStackTrace()[0].getMethodName() + " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return a;
		}
		return a;
	}

	@Override
	public boolean deleteProcedureCategory(String id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			ProcedureCat dto = (ProcedureCat) sessionFactory.getCurrentSession().get(ProcedureCat.class,
					Integer.parseInt(id));
			dto.setDelete("Y");
			dto.setUpdatedBy(userId);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public List<SubInventoryMasterDto> fetchAllSubInventory() {

		List<SubInventoryMasterDto> list = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SubInventoryMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));

			list = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return list;
	}

	@Override
	public int saveOTSubInv(String name, HttpServletRequest request, Integer id) {
		SubInventoryDTO objShelfDTO = new SubInventoryDTO();
		objShelfDTO.setSubinventory_name(name);
		objShelfDTO.setSubinventory_Id(id);
		try {
			SQLQuery sql = sessionFactory.getCurrentSession()
					.createSQLQuery("select count(*) from inv_subinventory_stock_master");
			BigInteger count1 = (BigInteger) sql.uniqueResult();
			int count = count1.intValue();
			if (count == 0) {
				sql = sessionFactory.getCurrentSession().createSQLQuery("INSERT INTO " + "inv_subinventory_stock_master"
						+ "(subinventory_id,subinventory_name,status) VALUES ('" + objShelfDTO.getSubinventory_Id()
						+ "','" + objShelfDTO.getSubinventory_name() + "','Y')");
				sql.executeUpdate();
				return 1;
			} else {
				sql = sessionFactory.getCurrentSession()
						.createSQLQuery("UPDATE " + "inv_subinventory_stock_master SET subinventory_id='"
								+ objShelfDTO.getSubinventory_Id() + "',subinventory_name='"
								+ objShelfDTO.getSubinventory_name() + "',status='Y'");
				sql.executeUpdate();
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();

			return 0;

		}

	}

	@Override
	public int getPercentageDetails(int subserviceId, int unitId) {
		int res = 0;
		try {
			String sql = "Select  percentage as percentage from ehat_otpercentageconfiguration where confugration_flag='N' and childsubservice_id="
					+ subserviceId + " ";
			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			res = (int) q.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	// Added By Badrinath Wagh
	// OT DashBoard Fetch for todays Operation

	@Override
	public OTDashboardDTO fetchTodaysOperationDetails() {

		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());

		return dashBoardData(todays_date);

	}

	// added By Badrinath Wagh
	// OT DashBoard Fetch for tommorows Operation

	@Override
	public OTDashboardDTO fetchTomorrowOperationDetails() {

		Date dt = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(dt);
		c.add(Calendar.DATE, 1);
		dt = c.getTime();
		SimpleDateFormat formatter2 = new SimpleDateFormat("dd/MM/yyyy");
		String tomorrow_date = formatter2.format(dt);

		return dashBoardData(tomorrow_date);
	}

	// added By Badrinath Wagh
	// For OT DashBoard fetch from Date

	@Override
	public OTDashboardDTO fetchOpreationFromDate(String opDate) {

		return dashBoardData(opDate);
	}

	private OTDashboardDTO dashBoardData(String date) {

		OTDashboardDTO otDashboardDto = new OTDashboardDTO();
		List<OTDashboardDTO> listOTDashboard = new ArrayList<>();

		String sql = "select top.ID, top.Patient_ID, top.Treatment_ID, top.date, top.opStatus, top.Start_Time, top.End_Time, top.ot_id,"
				+ "tom.doc_names, tom.scheduled_procedure, tom.surgery_team, ott.ot_name, po.operation_name "
				+ "from treatment_operations top, treatmentoperationsmanage tom, ot_type ott, patient_operation po "
				+ "where top.opStatus ='Y' and top.scheduleFlag = 'OT' "
				+ "and tom.treatmentOperationsID=top.ID and tom.treatmentOperationsManageID = po.treatmentOperationsManageID and ott.idot_name = top.ot_id and top.date = '"
				+ date + "'";

		try {

			Query otQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			otQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listOTDBRecord = otQuery.list();

			System.out.println("OT DAO IMPL :: listOTDBRecord size :: " + listOTDBRecord.size());
			for (Map<String, Object> row : listOTDBRecord) {

				OTDashboardDTO dto = new OTDashboardDTO();
				Integer id;

				dto.setTreatmentOperationsId((Integer) row.get("ID"));
				dto.setPatientId((Integer) row.get("Patient_ID"));
				dto.setTreatmentId((Integer) row.get("Treatment_ID"));
				dto.setOperationDate((String) row.get("date"));
				dto.setOperationStatus((String) row.get("opStatus"));
				dto.setOperationStartTime((String) row.get("Start_Time").toString());
				dto.setOperationEndTime((String) row.get("End_Time").toString());
				dto.setOtId((Integer) row.get("ot_id"));
				dto.setDoctorName((String) row.get("doc_names"));
				dto.setScheduledProcedure((String) row.get("operation_name"));
				id = (Integer) row.get("surgery_team");
				if (id <= 0) {
					dto.setSurgeryTeam("Team was selected manually");
				} else {

					String sqls = "Select name from operation_team_master where idoperation_team_master = '" + id + "'";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sqls);
					dto.setSurgeryTeam(query.uniqueResult().toString());
				}
				dto.setOtName((String) row.get("ot_name"));

				listOTDashboard.add(dto);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		otDashboardDto.setListOTDashboardDTO(listOTDashboard);
		return otDashboardDto;
	}

	@Override
	public int saveAutoChargesForOT(BillDetailsIpdDto obj) {
		try {
			sessionFactory.getCurrentSession().merge(obj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<Operation> fetchOperationName(HttpServletRequest request, String status) {
		List<Operation> lstoperation = new ArrayList<Operation>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Operation.class);
			// criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("status", "Y"));
			lstoperation = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstoperation;
	}

	private int updateOtSubInventoryStock(EhatOtherBillDetailForIpdDto objdto, Integer othersid) {
		int updt = 0;
		try {
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
			String subInventory_Id = (String) resourceBundleEhat.getString("otSubInventoryId").trim();
			Integer subInventoryId = Integer.parseInt(subInventory_Id);
			Integer itemID = objdto.getChildSubServiceId();
			Integer mrn_slave_id = othersid;

			String batchCode = objdto.getBatchCode();
			String batchExp = objdto.getBatchExp();
			Integer batchId = objdto.getBatchId();
			int uiQTY = (int) objdto.getQuantity();
			int equepQTY = uiQTY;
			int isUpdate = 0;

			String sql3 = "select * from inv_goods_issue_mrn_item_slave_new" + " where item_master_id="
					+ objdto.getChildSubServiceId()
					+ " and (mrn_status='FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched') "
					+ " and deleted='N' and " + " sub_inventory_id =" + subInventoryId + " and id=" + mrn_slave_id
					/* + " and item_batch_code='" + batchCode */
					+ " and batch_master_id=" + batchId;
			/* + " and item_batch_exp_date='" + batchExp+"'"; */
			System.out.println("this is sql3 " + sql3);
			SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
			query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> subinvlist = query3.list();
			int DBQTY = 0;
			for (Map rs : subinvlist) {
				int ItemID = (Integer) rs.get("item_master_id");
				Integer subInvID = (Integer) rs.get("sub_inventory_id");
				DBQTY = (Integer) rs.get("current_subinventory_stock");
				if (DBQTY >= uiQTY) {
					int totalQty = DBQTY - uiQTY;
					String sql4 = "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock=" + totalQty
							+ " where item_master_id=" + ItemID + " and sub_inventory_id=" + subInvID + " and id="
							+ mrn_slave_id
							/*
							 * + " and item_batch_code='" + batchCode
							 */
							+ " and batch_master_id=" + batchId
					/* + " and item_batch_exp_date='"+batchExp+"'" */;
					System.out.println("this is sql4 " + sql4);

					SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);

					isUpdate = query4.executeUpdate();

					equepQTY = 0;

					break;

				}
			}
			if (isUpdate == 0) {
				for (Map rs : subinvlist) {
					if (equepQTY > 0) {
						int ItemID = (Integer) rs.get("item_master_id");
						Integer subInvID = (Integer) rs.get("sub_inventory_id");
						DBQTY = (Integer) rs.get("current_subinventory_stock");
						if (DBQTY <= equepQTY) {
							int totalQty = equepQTY - DBQTY;
							String sql5 = "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock="
									+ totalQty + " where item_master_id=" + ItemID + " and sub_inventory_id=" + subInvID
									+ " and id="
									/*
									 * + mrn_slave_id + " and item_batch_code='"
									 */
									+ batchCode + " and batch_master_id=" + batchId
							/* + " and item_batch_exp_date='" + batchExp+"'" */;

							System.out.println("this is sql5 " + sql5);
							SQLQuery query5 = sessionFactory.getCurrentSession().createSQLQuery(sql5);
							updt = query5.executeUpdate();
							equepQTY = totalQty;
							// ****get latest unit price from item
							// sale***//

						} else {
							int totalQty = DBQTY - equepQTY;

							String sql6 = "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock="
									+ totalQty + "where item_master_id=" + ItemID + " and sub_inventory_id=" + subInvID
									+ " and id=" + mrn_slave_id
									/*
									 * + " and item_batch_code='" + batchCode
									 */
									+ "' and batch_master_id=" + batchId
							/* + " and item_batch_exp_date='" + batchExp+"'" */;
							System.out.println("this is sql6 " + sql6);
							SQLQuery query6 = sessionFactory.getCurrentSession().createSQLQuery(sql6);
							updt = query6.executeUpdate();
							equepQTY = 0;

						}
					}
				}
				isUpdate = 1;
			}
			return updt;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}

	}

	private int updateOtSubInventoryStockOnDeleteOtInventory(EhatOtherBillDetailForIpdDto objdto) {
		int updt = 0;
		try {
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
			String subInventory_Id = (String) resourceBundleEhat.getString("otSubInventoryId").trim();
			Integer subInventoryId = Integer.parseInt(subInventory_Id);
			Integer itemID = objdto.getChildSubServiceId();
			Integer mrn_slave_id = objdto.getMrnSlaveID();

			String batchCode = objdto.getBatchCode();
			String batchExp = objdto.getBatchExp();
			Integer batchId = objdto.getBatchId();
			int uiQTY = (int) objdto.getQuantity();
			int equepQTY = uiQTY;
			int isUpdate = 0;
			if (mrn_slave_id != 0 && mrn_slave_id != null) {

				String sql3 = "select * from inv_goods_issue_mrn_item_slave_new" + " where item_master_id="
						+ objdto.getChildSubServiceId()
						+ " and (mrn_status='FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched') "
						+ " and deleted='N' and " + " sub_inventory_id =" + subInventoryId
						/* + " and item_batch_code='" + batchCode */
						+ " and id=" + mrn_slave_id + " and batch_master_id=" + batchId
				/* + " and item_batch_exp_date='" + batchExp+"'" */;
				System.out.println("this is sql3 " + sql3);
				SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
				query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> subinvlist = query3.list();
				int DBQTY = 0;
				for (Map rs : subinvlist) {
					int ItemID = (Integer) rs.get("item_master_id");
					Integer subInvID = (Integer) rs.get("sub_inventory_id");
					DBQTY = (Integer) rs.get("current_subinventory_stock");
					if (DBQTY >= uiQTY) {
						int totalQty = DBQTY + uiQTY;
						String sql4 = "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock="
								+ totalQty + " where item_master_id=" + ItemID + " and sub_inventory_id=" + subInvID
								+ " and id=" + mrn_slave_id
								/*
								 * + " and item_batch_code='" + batchCode
								 */
								+ " and batch_master_id=" + batchId
						/* + " and item_batch_exp_date='"+batchExp+"'" */;
						System.out.println("this is sql4 " + sql4);

						SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);

						isUpdate = query4.executeUpdate();

						equepQTY = 0;

						break;

					}
				}
				if (isUpdate == 0) {
					for (Map rs : subinvlist) {
						if (equepQTY > 0) {
							int ItemID = (Integer) rs.get("item_master_id");
							Integer subInvID = (Integer) rs.get("sub_inventory_id");
							DBQTY = (Integer) rs.get("current_subinventory_stock");

							if (DBQTY <= equepQTY) {
								int totalQty = equepQTY + DBQTY;
								String sql5 = "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock="
										+ totalQty + " where item_master_id=" + ItemID + " and sub_inventory_id="
										+ subInvID + " and id=" + mrn_slave_id
										/*
										 * + " and item_batch_code='" + batchCode
										 */
										+ " and batch_master_id=" + batchId
								/* + " and item_batch_exp_date='" + batchExp+"'" */;

								System.out.println("this is sql5 " + sql5);
								SQLQuery query5 = sessionFactory.getCurrentSession().createSQLQuery(sql5);
								updt = query5.executeUpdate();
								equepQTY = totalQty;
								// ****get latest unit price from item
								// sale***//

							} else {
								int totalQty = DBQTY + equepQTY;

								String sql6 = "update inv_goods_issue_mrn_item_slave_new set current_subinventory_stock="
										+ totalQty + "where item_master_id=" + ItemID + " and sub_inventory_id="
										+ subInvID + " and id=" + mrn_slave_id
										/*
										 * + " and item_batch_code='" + batchCode
										 */
										+ " and batch_master_id=" + batchId
								/* + " and item_batch_exp_date='" + batchExp+"'" */;
								System.out.println("this is sql6 " + sql6);
								SQLQuery query6 = sessionFactory.getCurrentSession().createSQLQuery(sql6);
								updt = query6.executeUpdate();
								equepQTY = 0;

							}
						}
					}
					isUpdate = 1;
				}
			}
			return updt;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}

	}

	private int updateOtDrugStockOnDeleteOtDrug(EhatOtherBillDetailForIpdDto objdto, int storeIdIn) {
		int updt = 0;
		try {

			String strQuery = "";
			Integer batchId = objdto.getBatchId();

			// HttpSession session = request.getSession(true);
			// String storeId = (String) session.getAttribute("pharmacyStoreId");
			String storeId = String.valueOf(storeIdIn);
			Object storeName = new Object();
			Integer qty = (int) objdto.getQuantity();
			if (batchId != null && batchId != 0) {
				if (storeId != null) {
					try {
						SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT store_name FROM pharma_sub_store_master where store_id='" + storeId + "'");
						storeName = query.uniqueResult();
					} catch (Exception e) {
						e.printStackTrace();
					}
					try {
						strQuery = "SELECT stock_qty_in_hand FROM pharma_" + storeName.toString()
								+ "_stock_master where stock_batch_id='" + batchId + "'";
						SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(strQuery);
						Double availableStock = null;
						Double totalStock = 0.0;
						Object rows = query.uniqueResult();

						if (rows != null) {
							availableStock = Double.parseDouble(rows.toString());
						}
						String updateQuery = "";
						if (availableStock >= qty || availableStock == 0) {

							totalStock = availableStock + qty;

							Query query1 = sessionFactory.getCurrentSession()
									.createSQLQuery("update pharma_" + storeName.toString()
											+ "_stock_master set stock_qty_in_hand='" + totalStock
											+ "' where stock_batch_id=:batchId");
							query1.setInteger("batchId", batchId);
							query1.executeUpdate();
							updt = 1;
						}

					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
			return updt;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	@Transactional
	public double fetchSubServiceCharge(Integer categoryId, Integer unitId) {

		String sql = "Select charges from ehat_subservice where id=" + categoryId;
		Query q = sessionFactory.getCurrentSession().createSQLQuery(sql);
		double res = ((Double) q.uniqueResult()).intValue();
		return res;
	}

	@Override
	@Transactional
	public double fetchOperationCount(Integer treatmentId, Integer categoryId, Integer topId, Integer patientId) {
		int res = 0;
		int finalCount = 0;
		int percentage = 0;
		double finalAmount = 0;
		double amount = 0;
		try {
			String sql = "Select  count(*) from treatment_operations where treatment_id=" + treatmentId
					+ " and unit_id=" + 1 + " ";
			Query q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			res = ((Number) q.uniqueResult()).intValue();

			TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class,
					treatmentId);

			Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(TreatmentOperations.class);
			createCriteria.add(Restrictions.eq("treatmentDto", treatmentDto));
			createCriteria.add(Restrictions.eq("unitId", 1));
			List<TreatmentOperations> list = createCriteria.list();

			List<PtientOperation> patientOperationlist = new ArrayList<PtientOperation>();
			for (TreatmentOperations treatmentOperations : list) {

				if (treatmentOperations.getId() == topId) {
					Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(PtientOperation.class);
					createCriteria2.add(Restrictions.eq("treatmentOperationsManage", topId));
					List<PtientOperation> pOperationlist = createCriteria2.list();
					int countStep = 1;
					for (int i = 0; i < pOperationlist.size(); i++) {

						String hallwisechargeOTAll = hallwisechargeOTAll(treatmentId,
								pOperationlist.get(i).getOperation_ID(), "hall", patientId);
						if (!hallwisechargeOTAll.equalsIgnoreCase("")) {
							amount = Double.parseDouble(hallwisechargeOTAll);
						}

						int percentageDetails = getPercentageDetails(categoryId, 1);
						if (percentageDetails != 0) {
							amount = amount * percentageDetails / 100;
						}

						Integer count = ((Number) sessionFactory.getCurrentSession().createSQLQuery("SELECT COUNT(*) "
								+ "FROM ehat_operationmaster where  step =" + countStep + " and unit=1 and status='N' ")
								.uniqueResult()).intValue();
						if (count != 0) {
							SQLQuery q7 = sessionFactory.getCurrentSession()
									.createSQLQuery("SELECT percentage FROM ehat_operationmaster where  step ="
											+ countStep + " and unit=" + 1 + " and status='N' ");
							percentage = ((Number) q7.uniqueResult()).intValue();

							finalAmount = finalAmount + amount * percentage / 100;
						} else {
							finalAmount = finalAmount + amount;
						}
						countStep++;
					}

				}
			}
			
			 // added for emergency charges
			SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
			Calendar calendar = Calendar.getInstance();
			String currentTime = dateFormat.format(calendar.getTime());
			System.out.println("currentTime==="+currentTime);
			
			String sqlEmergency = "SELECT if(operationTmForEmergeancyFrom > operationTmForEmergeancyTo,'Y','N') as count FROM hospitalaccinfo";
			String status = sessionFactory.getCurrentSession().createSQLQuery(sqlEmergency).uniqueResult().toString();
			
			if (status.equals("Y")) {
				// used sql query becz of where condition difficult to manage using hibernate
				// criteria
				sqlEmergency = "select count(*) from hospitalaccinfo where (CAST( '" + currentTime
						+ "' as time) >= operationTmForEmergeancyFrom or CAST( '" + currentTime
						+ "' as time) < operationTmForEmergeancyTo) ";

			} else {
				sqlEmergency = "select count(*) from hospitalaccinfo where CAST( '" + currentTime
						+ "' as time) BETWEEN CAST(operationTmForEmergeancyFrom as time) AND CAST(operationTmForEmergeancyTo as time)";
			}
			HospitalAccDetails listHospitalAccount = null;
			Integer emergencyTimeFlag = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlEmergency).uniqueResult()).intValue();
			if (emergencyTimeFlag != 0) {
				listHospitalAccount = (HospitalAccDetails) sessionFactory.getCurrentSession().get(HospitalAccDetails.class, 1);
				float perAmt=listHospitalAccount.getOperationEmergencyCharges();
				finalAmount=finalAmount+(finalAmount/100)*perAmt;
			}
			// end for emergency charges

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
		return finalAmount;
	}

	// added by vishant
	public String hallwisechargeOTAll(Integer trId, Integer scheduledProcedure, String callfrom, Integer patientId) {

		int count = 0;
		String opcharge = "";
		int charges_slave_id = 0;
		try {
			// SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.Htype
			// from treatment_beds tb,beds bd, hall h where h.Hall_ID = bd.Hall_ID and
			// bd.Bed_ID=tb.Bed_ID and tb.Treatment_ID=? ");
			if (callfrom.equals("hall")) {

				List<BillDetailsIpdDto> list = sessionFactory.getCurrentSession()
						.createCriteria(BillDetailsIpdDto.class).add(Restrictions.eq("treatmentId", trId)).list();
				charges_slave_id = list.get(0).getChargesSlaveId();

				if (charges_slave_id != 0) {
					charges_slave_id = ((Number) sessionFactory.getCurrentSession()
							.createSQLQuery("select selfId from ehat_charges_master_slave where id=" + charges_slave_id)
							.uniqueResult()).intValue();
				}

				/*
				 * int count2 = ((Number) sessionFactory.getCurrentSession().
				 * createSQLQuery("select count(*) from ehat_multiple_sponsor where patient_id="
				 * +patientId).uniqueResult()).intValue(); if(count2!=0) { charges_slave_id =
				 * ((Number) sessionFactory.getCurrentSession().
				 * createSQLQuery("select charges_slave_id from ehat_multiple_sponsor where patient_id="
				 * +patientId).uniqueResult()).intValue(); }
				 */

				String opid = "";
				String pId = "";
				// SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.Htype
				// from ehat_bill_details_ipd tb,beds bd, hall h where h.Hall_ID = bd.Hall_ID
				// and bd.Bed_ID=tb.sub_service_id and tb.treatment_id="+ trId +" and
				// tb.on_bed_flag='Y' and tb.service_id="+ 3 +" ");
				
				ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
	    		String hospitalName = bundle.getObject("hospitalname").toString();
				if (hospitalName.equalsIgnoreCase("Siddhivinayak")) {	
				SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
								+ " AND tb.treatment_id = " + trId
								+ " AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
				List<Integer> Hall_ID =  q.list();
				StringJoiner sb = new StringJoiner(",");
				if (Hall_ID.size() > 0) {
					
			        
			        for (Integer objArr : Hall_ID) {
			        	sb.add(String.valueOf(objArr));
			        }
				}
				String string = sb.toString();
				if (scheduledProcedure > 0) {
					SQLQuery q1 = null;

					String sql = "SELECT opgrade,opstate FROM  operation where Operation_id=" + scheduledProcedure
							+ " and status='Y' ";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> data = query.list();
					for (Map<String, Object> row : data) {
						pId = (String) row.get("opgrade");
						opid = (String) row.get("opstate");
					}

					String query1 = "SELECT surgeoncharge FROM operationchargehallwise WHERE halltypeid IN("+ string 
							+") AND operationCatId ="+pId 
							+" AND operation_id ="+ opid +" AND sponser_id ="+ charges_slave_id;
	            	Query q2= sessionFactory.getCurrentSession().createSQLQuery(query1);
	    		    //q1=sessionFactory.getCurrentSession().createSQLQuery("SELECT MAX(surgeoncharge) from operationchargehallwise  where  halltypeid=in(?) and   operationCatId=? and operation_id=?  and sponser_id=?");  
//	            	q2.setParameter("hallIds", string);
//	            	q2.setParameter("operationCatId", Integer.parseInt(pId));
//	            	q2.setParameter("operationId", Integer.parseInt(opid));
//	            	q2.setParameter("sponserId", charges_slave_id);

					List<Float>  list2= q2.list();
					Float surgeoncharge = list2.stream().max(Comparator.naturalOrder()).get();
					
					if (surgeoncharge == null) {
						surgeoncharge = (float) 0.0;
					}
					opcharge = Float.toString(surgeoncharge);
				}
				}else {	
					SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
									+ " AND tb.treatment_id = " + trId
									+ " AND tb.on_bed_flag = 'Y' AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
					int Hall_ID = (Integer) q.uniqueResult();
					if (scheduledProcedure > 0) {
						SQLQuery q1 = null;

						String sql = "SELECT opgrade,opstate FROM  operation where Operation_id=" + scheduledProcedure
								+ " and status='Y' ";
						SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data = query.list();
						for (Map<String, Object> row : data) {
							pId = (String) row.get("opgrade");
							opid = (String) row.get("opstate");
						}

						q1 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=?  and sponser_id=?");
						q1.setParameter(0, Hall_ID);
						q1.setParameter(1, Integer.parseInt(pId));
						q1.setParameter(2, Integer.parseInt(opid));
						q1.setParameter(3, charges_slave_id);

						Float surgeoncharge = (Float) q1.uniqueResult();
						if (surgeoncharge == null) {
							surgeoncharge = (float) 0.0;
						}
						opcharge = Float.toString(surgeoncharge);
					}
					}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return opcharge;
	}
	@Override
	public int deleteMultipleOTservice(String labservicelist, String callform, Integer userId, Integer patienttId,
			Integer treatmentId, Integer treatmentoperationid, Integer storeId) {
		String[] ary = labservicelist.split(",");
		String flg = "";
		Object billid = new Object();
		double totalamount = 0.0;
		int updated = 0;
		if (callform.equals("OTINV")) {

			flg = "I";

		} else if (callform.equals("OTDRUG")) {

			flg = "P";

		} else if (callform.equals("OTCHARG")) {
			flg = "C";
		} else {
			flg = "L";
		}
		try {

			if ((callform.equals("OTDRUG")) || (callform.equals("OTINV"))) {}

			System.out.println("id isssss=" + labservicelist);
			for (int i = 0; i < ary.length; i++) {
				
				System.err.println(ary[i]);
				EhatOtherBillDetailForIpdDto billDetailsDto = new EhatOtherBillDetailForIpdDto();
				billDetailsDto = (EhatOtherBillDetailForIpdDto) sessionFactory.getCurrentSession()
						.get(EhatOtherBillDetailForIpdDto.class, Integer.parseInt(ary[i]));

				billDetailsDto.setDeleted("Y");
				billDetailsDto.setDeletedBy(userId);
				billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));

				if (callform.equals("OTINV")) {
					updated = updateOtSubInventoryStockOnDeleteOtInventory(billDetailsDto);
				} else if (callform.equals("OTDRUG")) {
					updated = updateOtDrugStockOnDeleteOtDrug(billDetailsDto, storeId);
				}
			}

			Double sum = (Double) sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForIpdDto.class)
					.setProjection(Projections.sum("amount")).add(Restrictions.eq("treatmentId", treatmentId))
					.add(Restrictions.eq("patienttId", patienttId))
					.add(Restrictions.eq("countot", treatmentoperationid)).add(Restrictions.eq("otherflag", flg))
					.add(Restrictions.eq("deleted", "N")).uniqueResult();
			if (sum != null) {
				totalamount = sum;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
}