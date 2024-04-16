package com.hms.administrator.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.VouchersDao;
import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.IPDReceiptVoucherDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;
import com.hms.administrator.dto.LedgerHead;
import com.hms.ehat.dto.LabWorksheetViewDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
@SuppressWarnings("unchecked")
public class VouchersDaoImpl implements VouchersDao {

	@Autowired
	SessionFactory sessionFactory;

	/*
	 * @Autowired GenericDaoImpl genericDaoImpl;
	 */

	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");

	@Override
	public int saveRecieptVoucher(IPDReceiptVoucherDTO ipdReceiptVoucherDTO, String queryType,
			HttpServletRequest request) {
		int result = 1;

		if (ipdReceiptVoucherDTO.getReceiptVoucherId() != 0) {
			result = 2;
		}
		try {

			sessionFactory.getCurrentSession().saveOrUpdate(ipdReceiptVoucherDTO);

		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}

		return result;
	}

	@Override
	public List<IPDReceiptVoucherDTO> viewReceiptVoucher(String callFrom) {

		List<IPDReceiptVoucherDTO> lstViewDto = new ArrayList<IPDReceiptVoucherDTO>();
		IPDReceiptVoucherDTO vobj2 = new IPDReceiptVoucherDTO();
		try {
			String sql = "select eirv . *, ifnull(pm.pay_name, '-') as payName, ifnull(evg.voucher_name, '-') as groupName, ifnull(lhdr.ledgerHeadName, '-') as ledgerHeadName from ehat_ipd_receipt_voucher eirv left join  payment_master pm ON pm.pay_id = eirv.payment_mode left join ehat_expense_voucher_group evg ON evg.idehat_expense_voucher_group=eirv.group_id left join ehat_ledger_heads lhdr ON lhdr.idehat_ledger_heads=eirv.ledger_head_id where eirv.voucher_status = 'N' limit 50";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			lstViewDto = (List<IPDReceiptVoucherDTO>) query.list();
			lstViewDto.get(0).setLedgerHeadName("Demo");
			/*
			 * int grpid =vobj2.getGroupId(); String
			 * sql1="Select ledgerHeadName as  ledgerHeadName from ehat_expense_voucher_group where idehat_expense_voucher_group="
			 * +grpid+"";
			 * 
			 * SQLQuery qSql=sessionFactory.getCurrentSession().createSQLQuery(sql1); String
			 * ledgerHeadName=(String) qSql.uniqueResult();
			 * 
			 * 
			 * vobj2.setLedgerHeadName(ledgerHeadName); lstViewDto.add(vobj2);
			 */
		   
			/*
			 * int legId =3; //vobj2.getLedgerHeadId(); String
			 * sql1="Select ledgerHeadName as  ledgerHeadName from ehat_ledger_heads where idehat_ledger_heads="
			 * +legId+"";
			 * 
			 * SQLQuery qSql=sessionFactory.getCurrentSession().createSQLQuery(sql1); String
			 * ledgerHeadName=(String) qSql.uniqueResult();
			 * 
			 * 
			 * vobj2.setLedgerHeadName(ledgerHeadName);
			 */
		  // lstViewDto.add(vobj2);		

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :" + new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : " + new Exception().getStackTrace()[0].getMethodName() + " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return lstViewDto;
		}
		return lstViewDto;
	}

	@Override
	public IPDReceiptVoucherDTO editRecVoucher(Integer receiptVoucherId) {

		List<IPDReceiptVoucherDTO> lstViewDto = new ArrayList<IPDReceiptVoucherDTO>();
		IPDReceiptVoucherDTO obj = new IPDReceiptVoucherDTO();

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IPDReceiptVoucherDTO.class);
		criteria.add(Restrictions.eq("receiptVoucherId", receiptVoucherId));
		lstViewDto = criteria.list();

		obj.setListIPDReceiptVoucherDTO(lstViewDto);
		return obj;
	}

	@Override
	public Integer deleteReceiptVoucher(String receiptVoucherIdLst, HttpServletRequest request) {
		int response = 0;
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		try {

			String lasmod = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
					.format(new Date(new java.util.Date().getTime()));

			String sql = "update ehat_ipd_receipt_voucher set voucher_status = 'Y',deleted_by='" + userId
					+ "',delete_date_time='" + lasmod + "' where receipt_voucher_id IN (" + receiptVoucherIdLst + ") ";
			Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
			response = updateSql.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			response = 0;
		}
		return response;
	}

	@Override
	public IPDReceiptVoucherDTO autoSuggRcptVchrCmnyNm(String letter) {

		List<IPDReceiptVoucherDTO> lstViewDto = new ArrayList<IPDReceiptVoucherDTO>();
		IPDReceiptVoucherDTO obj = new IPDReceiptVoucherDTO();
		try {
			String sql = "select eirv . *, ifnull(pm.pay_name, '-') as payName, ifnull(evg.voucher_name, '-') as groupName, "
					+ "ifnull(lhdr.ledgerHeadName, '-') as ledgerHeadName from ehat_ipd_receipt_voucher eirv "
					+ "left join  payment_master pm ON pm.pay_id = eirv.payment_mode "
					+ "left join ehat_expense_voucher_group evg ON evg.idehat_expense_voucher_group=eirv.group_id "
					+ "left join ehat_ledger_heads lhdr ON lhdr.idehat_ledger_heads=eirv.ledger_head_id where eirv.voucher_status = 'N' and company_name like '"
					+ letter + "%' limit 20";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			lstViewDto = query.list();
			obj.setListIPDReceiptVoucherDTO(lstViewDto);

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :" + new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : " + new Exception().getStackTrace()[0].getMethodName() + " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return obj;
		}
		return obj;
	}

	@Override
	public List<IpdExpenceVoucher> fetchExpenceVoucher(int voucherID,String pageName, HttpServletRequest request) {
		
		List<IpdExpenceVoucher> ltPatientRecord = new ArrayList<IpdExpenceVoucher>();
		List<IpdExpenceVoucher> expenceVoucher=new ArrayList<IpdExpenceVoucher>();
		
		/*
		
		 * List<IpdExpenceVoucher> ltPatientRecord = new ArrayList<IpdExpenceVoucher>();
		 * try{ if (pageName.equals("byType")) {
		 * 
		 * Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(IpdExpenceVoucher.class);
		 * criteria.add(Restrictions.eq("voucherStatus", "Y"));
		 * //criteria.add(Restrictions.like("companyName", "%"+byType+"%"));
		 * //criteria.setMaxResults(10); ltPatientRecord = criteria.list();
		 * 
		 * 
		 * String sql =
		 * "select * from ipdexpencevoucher where voucherStatus='Y' and companyName like '"
		 * + byType + "%'"; try { List<Map<String, Object>> expenceList =
		 * getJdbcTemplate() .queryForList(sql); List<IpdExpenceVoucher> voucherLi =
		 * ipdExpenceVoucherDetails(expenceList); return voucherLi; } catch (Exception
		 * e) {
		 * 
		 * e.printStackTrace(); return null; } } else {
		 * 
		 * Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(IpdExpenceVoucher.class);
		 * criteria.add(Restrictions.eq("voucherStatus", "Y"));
		 * //criteria.add(Restrictions.like("categoryName", "%"+byType+"%"));
		 * criteria.setMaxResults(50); ltPatientRecord = criteria.list();
		 * 
		 * 
		 * 
		 * //String sql =
		 * "select * from ipdexpencevoucher where voucherStatus='Y' limit 50"; String
		 * sql =
		 * "select ipe.*,ifnull(pm.pay_name,'-') as payName from ipdexpencevoucher ipe left join payment_master pm on pm.pay_id = ipe.paymentMode where ipe.voucherStatus = 'Y' limit 50"
		 * ; try { List<Map<String, Object>> expenceList = getJdbcTemplate()
		 * .queryForList(sql); List<IpdExpenceVoucher> voucherLi =
		 * ipdExpenceVoucherDetails(expenceList); return voucherLi;
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return null; } }
		 * 
		 * } catch (Exception e) { e.printStackTrace();
		 * System.err.println("ehatException:- Class Name :" +
		 * e.getStackTrace()[0].getClassName() + " Method Name : " +
		 * e.getStackTrace()[0].getMethodName() + " Line No :" +
		 * e.getStackTrace()[0].getLineNumber()); //return ltPatientRecord; } return
		 * ltPatientRecord;
		 */
		if(pageName.equalsIgnoreCase("Print"))
		{
			
			//Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCashVoucherDTO.class);
			//criteria.add(Restrictions.eq("voucherId", voucherID));
			IpdExpenceVoucher rvobj=  (IpdExpenceVoucher) sessionFactory.getCurrentSession().get(IpdExpenceVoucher.class, voucherID);
			   
			int legId	=rvobj.getLedgerHeadid();
		    String sql1="Select ledgerHeadName as  ledgerHeadName from ehat_ledger_heads where idehat_ledger_heads="+legId+"";
		    
		   SQLQuery  qSql=sessionFactory.getCurrentSession().createSQLQuery(sql1);
		   String ledgerHeadName=(String) qSql.uniqueResult();
		    		
	
		   rvobj.setLedgerHeadname(ledgerHeadName);
		   expenceVoucher.add(rvobj);		
			
			
			int grpId	=rvobj.getGrpid();
		    String sql="Select voucher_name as  voucher_name from ehat_expense_voucher_group where idehat_expense_voucher_group="+grpId+"   ";
		    
		   SQLQuery  SSql=sessionFactory.getCurrentSession().createSQLQuery(sql);
		   String VoucherByName=(String) SSql.uniqueResult();
		    		
	
		   rvobj.setGrpname(VoucherByName);
		   ltPatientRecord.add(rvobj);
			
		}else
		{
			 
				
			/*
			 * String sql = "select * from ipdexpencevoucher where voucherStatus='Y'"; Query
			 * query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); expenceVoucher =
			 * (List<IpdExpenceVoucher>) query.list();
			 */
				
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IpdExpenceVoucher.class);
			c.add(Restrictions.eq("voucherStatus", "Y"));
			expenceVoucher=c.list();
				
				
			for (IpdExpenceVoucher evoucher : expenceVoucher) {
				int legId = evoucher.getLedgerHeadid();
				String sql1 = "Select ledgerHeadName as  ledgerHeadName from ehat_ledger_heads where idehat_ledger_heads="
						+ legId + "";
				SQLQuery qSql = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				String ledgerHeadName = (String) qSql.uniqueResult();
				evoucher.setLedgerHeadname(ledgerHeadName);
				//expenceVoucher.add(evoucher);

				int grpId = evoucher.getGrpid();
				String sql3 = "Select voucher_name as  voucher_name from ehat_expense_voucher_group where idehat_expense_voucher_group="
						+ grpId + "   ";
				SQLQuery SSql = sessionFactory.getCurrentSession().createSQLQuery(sql3);
				String VoucherByName = (String) SSql.uniqueResult();
				evoucher.setGrpname(VoucherByName);
				
				ltPatientRecord.add(evoucher);

			}
				 
				 
				
				
			
		}
		return ltPatientRecord;
		
		  
			
			
			 
			
		
	
			
			
//			try {
//				Criteria criteria=sessionFactory.getCurrentSession().createCriteria(IpdExpenceVoucher.class);
//				criteria.add(Restrictions.eq("deleted", "N"));
//				expenceVoucher = criteria.list();
//			}catch(Exception e) {
//				e.printStackTrace();
//			}		
			
		
	}

	@Override
	public int saveExpenseVoucher(String ipdExpenceVoucher, String queryType, HttpServletRequest request) {
		/*
		 * int result=1; if(ipdExpenceVoucher.getIdipdExpenceVoucher()!=0){ result=2; }
		 */
		int result = 0;
		try {

			SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm:ss aa");
			Calendar cal = Calendar.getInstance();
			String strDate = dateFormat.format(cal.getTime());

			DateFormat dateFormat1 = new SimpleDateFormat("dd-MM-yyyy");
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			String todays_date_time = dateFormat1.format(currentDate.getTime());

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");// current login user id
			Integer unitId = (Integer) session.getAttribute("uId");

			IpdExpenceVoucher ipdExpenceVoucher2 = (IpdExpenceVoucher) ConfigUIJSONUtility
					.getObjectFromJSON(ipdExpenceVoucher, IpdExpenceVoucher.class);

			IpdExpenceVoucher ipdExpenceVoucher1 = (IpdExpenceVoucher) ipdExpenceVoucher2.getIpdExpenceVoucherLi()
					.get(0);

			if (queryType.equalsIgnoreCase("insert")) {

				ipdExpenceVoucher1.setAssignedBy(userId);
				ipdExpenceVoucher1.setAssignDateTime(new Date(new java.util.Date().getTime()));
				ipdExpenceVoucher1.setVoucherDate(todays_date_time);
				ipdExpenceVoucher1.setVoucherTime(strDate);
				ipdExpenceVoucher1.setVoucherStatus("Y");
				ipdExpenceVoucher1.setUnitId(unitId);
				result = 1;

			} else if (queryType.equalsIgnoreCase("update")) {

				ipdExpenceVoucher1.setUpdatedBy(userId);
				ipdExpenceVoucher1.setUpdateDateTime(new Date(new java.util.Date().getTime()));
				ipdExpenceVoucher1.setVoucherDate(todays_date_time);
				ipdExpenceVoucher1.setVoucherTime(strDate);
				ipdExpenceVoucher1.setVoucherStatus("Y");
				ipdExpenceVoucher1.setUnitId(unitId);
				result = 2;
			}

			sessionFactory.getCurrentSession().merge(ipdExpenceVoucher1);

		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}

		return result;
	}

	@Override
	public Integer deleteExpenceVoucher(Integer idipdExpenceVoucher, HttpServletRequest request) {
		int response = 0;
		try {

			// UnitMasterDto unitMaster = new UnitMasterDto();

			IpdExpenceVoucher ipdExpenceVoucher = (IpdExpenceVoucher) sessionFactory.getCurrentSession()
					.get(IpdExpenceVoucher.class, idipdExpenceVoucher);
			ipdExpenceVoucher.setVoucherStatus("N");

			// sessionFactory.getCurrentSession().merge(unitMaster);
			response = 1;

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			response = 0;
		}
		return response;

	}

	@Override
	public List<LedgerHead> setLedgerHead(Integer idLedgerHead, HttpServletRequest request) {
		// TODO Auto-generated method stub

		List<LedgerHead> ltPatientRecord = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LedgerHead.class);
			criteria.add(Restrictions.eq("expenseVoucherGroup.voucher_ID", idLedgerHead));
			// criteria.setMaxResults(50);
			ltPatientRecord = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			// return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<IpdExpenceVoucher> printExpenceVoucher(int idipdm, HttpServletRequest request) {
		// TODO Auto-generated method stub

		List<IpdExpenceVoucher> ltPatientRecord = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdExpenceVoucher.class);
			criteria.add(Restrictions.eq("voucherStatus", "Y"));
			criteria.add(Restrictions.eq("idipdExpenceVoucher", idipdm));
			criteria.setMaxResults(50);
			ltPatientRecord = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			// return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<ExpenseVoucherGroup> groupName() {
		List<ExpenseVoucherGroup> list = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ExpenseVoucherGroup.class);
			criteria.add(Restrictions.eq("deleteStatus", "Y"));
			list = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<LedgerHead> ledgerHead(Integer id) {
		List<LedgerHead> list = null;
		try {
			ExpenseVoucherGroup expensevouchergroup = new ExpenseVoucherGroup();
			expensevouchergroup.setVoucher_ID(id);

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LedgerHead.class);
			criteria.add(Restrictions.eq("expenseVoucherGroup", expensevouchergroup));
			list = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<IPDReceiptVoucherDTO> fetchReceiptVoucherForPrint(int voucherID, HttpServletRequest request)
	{
		try
		{
			List<IPDReceiptVoucherDTO> voucherLi = new ArrayList<IPDReceiptVoucherDTO>();
			//Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCashVoucherDTO.class);
			//criteria.add(Restrictions.eq("voucherId", voucherID));
			IPDReceiptVoucherDTO rvobj=  (IPDReceiptVoucherDTO) sessionFactory.getCurrentSession().get(IPDReceiptVoucherDTO.class, voucherID);
		
			/*
			 * String
			 * sqll="select * from ehat_ipd_receipt_voucher where receipt_voucher_id ="
			 * +voucherID+"";
			 * 
			 * SQLQuery qSqll=sessionFactory.getCurrentSession().createSQLQuery(sqll);
			 * IPDReceiptVoucherDTO rvobj=(IPDReceiptVoucherDTO) qSqll.uniqueResult();
			 */		
		
			   
		
			   
			int legId	=rvobj.getLedgerHeadId();
		    String sql1="Select ledgerHeadName as  ledgerHeadName from ehat_ledger_heads where idehat_ledger_heads="+legId+"";
		    
		   SQLQuery  qSql=sessionFactory.getCurrentSession().createSQLQuery(sql1);
		   String ledgerHeadName=(String) qSql.uniqueResult();
		    		
	
		   rvobj.setLedgerHeadName(ledgerHeadName);
		   voucherLi.add(rvobj);		
			
			
			int grpId	=rvobj.getGroupId();
		    String sql="Select voucher_name as  voucher_name from ehat_expense_voucher_group where idehat_expense_voucher_group="+grpId+"   ";
		    
		   SQLQuery  SSql=sessionFactory.getCurrentSession().createSQLQuery(sql);
		   String VoucherByName=(String) SSql.uniqueResult();
		    		
	
		   rvobj.setGroupName(VoucherByName);
		voucherLi.add(rvobj);
			return voucherLi;
			
		}catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public IpdExpenceVoucher EditExpenceVoucher(Integer idipdExpenceVoucher, HttpServletRequest request) {
		

		int response = 0;
		try {

			// UnitMasterDto unitMaster = new UnitMasterDto();

			IpdExpenceVoucher ipdExpenceVoucher = (IpdExpenceVoucher) sessionFactory.getCurrentSession()
					.get(IpdExpenceVoucher.class, idipdExpenceVoucher);

			return ipdExpenceVoucher;

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			response = 0;
			return null;
		}
		

	
	}

		
	

}
