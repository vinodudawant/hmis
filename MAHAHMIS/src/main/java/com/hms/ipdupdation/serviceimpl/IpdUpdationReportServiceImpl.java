package com.hms.ipdupdation.serviceimpl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.BillRegisterReportDto;
import com.hms.ehat.dto.FinanceReportAmtDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ipdupdation.service.IpdUpdationReportService;

@Service
@Transactional
public class IpdUpdationReportServiceImpl  implements IpdUpdationReportService{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<RegTreBillDto> fetchIpdPatientsRecords(int unitId, int userId, String fDate, String tDate,
			String callFrom) {
		
		List<RegTreBillDto> ltPatientRecord = null;
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			String sql="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			if(callFrom.equalsIgnoreCase("1")) {
			criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("createdDateTime", sdf.parse(tDate)));
			//criteria.add(Restrictions.eq("billNo",0));
			}else if(callFrom.equalsIgnoreCase("2")) {
				criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fDate))); 
				criteria.add(Restrictions.le("createdDateTime", sdf.parse(tDate)));
				criteria.add(Restrictions.eq("invoiceFlag","N"));
			}else if(callFrom.equalsIgnoreCase("3")) {
				criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
				criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
				criteria.add(Restrictions.eq("invoiceFlag","Y"));
				
			}
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("departmentId", 2));
			criteria.addOrder(Order.desc("createdDateTime"));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();
			for(RegTreBillDto obj:ltPatientRecord){
				
				if(obj.getChargesMasterSlaveId()>0){
					
					sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+obj.getChargesMasterSlaveId();
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					obj.setImageName((String) refQuery.uniqueResult());		
				}	
				if(obj.getDoctorId().length() > 0){
					
					String ar[]=obj.getDoctorId().split(",");
					String docName="";
					for(int i=0;i<ar.length;i++){
						
						sql="select doc_name as doctor_name from doctor where Doctor_ID="+ar[i];
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						docName=docName+(String) refQuery.uniqueResult()+",";
						//obj.setImageName((String) refQuery.uniqueResult());		
					}
					docName = docName.substring(0, docName.length()-1);
					obj.setAddress(docName);					
				}
				
				//sql="select total_bill,total_paid,total_remain,total_refund from ehat_bill_master where treatment_id="+obj.getTreatmentId();
				//Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			//	refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				//@SuppressWarnings("unchecked")			
				//List<Map<String, Object>> listBillDetails = refQuery.list();
				//for(Map<String, Object> row : listBillDetails){
					
				//	obj.setTotBill((Double)row.get("total_bill"));
				//	obj.setTotPaid((Double)row.get("total_paid"));
				//	obj.setTotBal((Double)row.get("total_remain"));
				//	obj.setTotalRefund((Double)row.get("total_refund"));
				//}
				
                    int treatmentId=obj.getTreatmentId();
				
				String sqlTreat=" select department_id from ehat_treatment where treatment_id="+treatmentId+" ";
				int departmentId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlTreat).uniqueResult()).intValue();
				
				sqlTreat=" select charges_slave_id from ehat_treatment where treatment_id="+treatmentId+" ";
				int sponsorId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlTreat).uniqueResult()).intValue();
				
				FinanceReportAmtDto fobj=getAmtsForReports(treatmentId,departmentId,sponsorId);
				
				obj.setTotBill(fobj.getTotalAMt());
				//obj.setDiscAmt(fobj.getTotalDiscountAMt());
				obj.setTotPaid(fobj.getTotalPaidAMt());
				obj.setTotalRefund(fobj.getTotalRefundAMt());
				//obj.setTotBal((fobj.getTotalAMt()+fobj.getTotalRefundAMt() ) -(fobj.getTotalDiscountAMt() +fobj.getTotalPaidAMt() + fobj.getTotalConAMt()));
				
				//updated by Rohini Ambhore for sponser paid bulk settelment.
				obj.setTotBal((fobj.getTotalAMt()+fobj.getTotalRefundAMt() ) -(fobj.getTotalDiscountAMt() +fobj.getTotalPaidAMt() + fobj.getTotalConAMt() + fobj.getTotalsponserpaidAmt()));
				
				sql = "select ifnull(total_discount,0) as total_discount ,ifnull (GROUP_CONCAT((select doc_name from doctor where User_ID = d.approved_by) SEPARATOR ',') ,'') AS approved_by, ifnull (GROUP_CONCAT(approved_remark SEPARATOR ','),'') AS approved_remark from ehat_ipdbill_discount d where treatment_id=" + obj.getTreatmentId();
				Query refQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				refQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				System.out.println("Discount=" + refQuery1);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listBillDetails1 = refQuery1.list();
				for (Map<String, Object> row : listBillDetails1) {
					
					//obj.setTotDisc((Double)row.get("total_discount"));
					obj.setApproveBy((String)row.get("approved_by"));
					obj.setApproveRemark((String)row.get("approved_remark"));
				}
				obj.setTotDisc(fobj.getTotalDiscountAMt());
				
				
				sql="select BedHall from ehat_view_patient_bed_details_ipd where treatment_id="+obj.getTreatmentId()+" and service_id = 3 limit 1";
				Query bedQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setBedName((String) bedQuery.uniqueResult());
				
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
public FinanceReportAmtDto getAmtsForReports(Integer treatmentId,Integer departmentId,Integer sponsorId) {
		
		FinanceReportAmtDto obj=new FinanceReportAmtDto();
		
		String sqlAMt=" select  fn_get_rpt_total_bill_amt("+treatmentId+","+departmentId+","+sponsorId+") as totalBillAMt ";
		double totalAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_discount_amt("+treatmentId+","+departmentId+") as totalDiscountAmt ";
		double totalDiscountAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_paid_amt("+treatmentId+","+departmentId+","+sponsorId+") as totalPaidAmt ";
		double totalPaidAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_concession_amt("+treatmentId+","+departmentId+","+sponsorId+") as totalConAmt ";
		double totalConAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_refund_amt("+treatmentId+","+departmentId+") as totalRefundAmt ";
		double totalRefundAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		//updated Rohini
		String sqlAMtSponserPay=" select   fn_get_all_sponser_paid("+treatmentId+","+departmentId+") as totalsponserpaidAmt ";
		String totalsponserpaid=(String) sessionFactory.getCurrentSession().createSQLQuery(sqlAMtSponserPay).uniqueResult();
		Double totalsponserpaidAmt=Double.valueOf(totalsponserpaid);
		
		obj.setTotalAMt(totalAMt);
		obj.setTotalDiscountAMt(totalDiscountAMt);
		obj.setTotalPaidAMt(totalPaidAMt);
		obj.setTotalConAMt(totalConAMt);
		obj.setTotalRefundAMt(totalRefundAMt);
		obj.setTotalsponserpaidAmt(totalsponserpaidAmt);
		
		return obj;
		
	}


}
