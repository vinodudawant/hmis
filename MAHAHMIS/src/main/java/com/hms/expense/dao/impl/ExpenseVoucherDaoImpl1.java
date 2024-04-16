package com.hms.expense.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

//import jdk.nashorn.internal.runtime.Undefined;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.dto.Doctor;
import com.hms.dto.GeneralVouchersDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;
import com.hms.administrator.dto.LedgerHead;
import com.hms.expense.dao.ExpenseVoucherDao1;
import com.mysql.fabric.xmlrpc.base.Array;

@Repository
@Transactional
public class ExpenseVoucherDaoImpl1 implements ExpenseVoucherDao1 {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<IpdExpenceVoucher> getExpenseRVoucher(HttpServletRequest request,String fromdate,
			String fromtime,String todate,String totome,String callfrom,int voucherId,int ledgerid,String referto,
			int autosuggestionuserid) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		String userType = (String) session.getAttribute("userType");
		List<IpdExpenceVoucher> explist = new ArrayList<IpdExpenceVoucher>();
		Date date = Calendar.getInstance().getTime();
		DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
		
		String strDate = dateFormat.format(date);
		System.out.println(strDate);
		String[] todaysDate = strDate.split(" ");
		String sql="";
		String status="'Y'";
		
		 sql = "select i.idipdExpenceVoucher,i.paymentMode, i.companyName,i.paymentTo,i.refTo,p.pay_name,i.amount as amt,i.paidAmount,i.voucherDate,i.assign_date_time,concat(usr.f_name,' ',usr.l_name) as username,leg.ledgerHeadName,grp.voucher_name,i.amountInWords,i.amount from ipdexpencevoucher i left join  payment_master p on i.paymentMode=p.pay_id left join ehat_expense_voucher_group grp on i.groupId=grp.idehat_expense_voucher_group left join ehat_ledger_heads leg on i.ledgerHeadid=leg.idehat_ledger_heads left join users usr on i.assigned_by=usr.User_ID where (i.assign_date_time ) between '"+fromdate+" "+fromtime+"' and '"+todate+" "+totome+"' and i.voucherStatus ="+status  ;

			/*
			 * if(callfrom.equalsIgnoreCase("search") && autosuggestionuserid==0 &&
			 * !userType.equalsIgnoreCase("admin")){ sql = sql
			 * +" and i.assigned_by="+userId; }
			 */
		 
		 if(callfrom.equalsIgnoreCase("search") && autosuggestionuserid==0 && !userType.equalsIgnoreCase("admin")){
				
			 //sql = sql +" and i.assigned_by="+userId;
			}
		if(voucherId>0){
			
			 sql = sql + " and i.groupId="+voucherId;
	
		}
		
		if(ledgerid>0){
			
			 sql = sql + " and i.ledgerHeadid="+ledgerid;  
		}
		
		
		if(!referto.equalsIgnoreCase("0")){
			
			 sql = sql +" and i.refTo="+referto;
		}
		
		if(autosuggestionuserid > 0){
			
			sql = sql +" and i.assigned_by="+autosuggestionuserid;
		}
		
		
		if(callfrom.equalsIgnoreCase("onload")){
			
			sql="";
			 sql = "select i.idipdExpenceVoucher,i.companyName, i.paymentMode,i.paymentTo,i.refTo,p.pay_name,i.amount as amt,i.paidAmount,i.voucherDate,i.assign_date_time,concat(usr.f_name,' ',usr.l_name) as username,leg.ledgerHeadName,grp.voucher_name,i.amountInWords,i.amount from ipdexpencevoucher i left join  payment_master p on i.paymentMode=p.pay_id left join ehat_expense_voucher_group grp on i.groupId=grp.idehat_expense_voucher_group left join ehat_ledger_heads leg on i.ledgerHeadid=leg.idehat_ledger_heads left join users usr on i.assigned_by=usr.User_ID where i.voucherDate='"+todaysDate[0]+"' and i.voucherStatus ="+status  ;
		    System.out.println("userType"+userType+" "+userType != "admin");
			 if(!userType.equalsIgnoreCase("admin")){
				 sql = sql + " and i.assigned_by="+userId;
			 }
		}
		
		sql=sql+" ORDER BY i.idipdExpenceVoucher DESC";
		System.out.println("repost  "+sql);

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				IpdExpenceVoucher object = new IpdExpenceVoucher();
				object.setIdipdExpenceVoucher((Integer)row.get("idipdExpenceVoucher"));
				//object.setAssignDateTime((Date)row.get("assign_date_time"));
				object.setVoucherDate((String)row.get("voucherDate"));
				object.setCompanyName((String)row.get("companyName"));
				object.setPaidAmount((Double)row.get("paidAmount"));
				object.setAmount((Double)row.get("amount"));
				object.setLedgerHeadname((String)row.get("ledgerHeadName"));
				object.setGrpname((String)row.get("voucher_name"));
				object.setPaymentMode((String)row.get("pay_name"));
				object.setRefTo((String)row.get("refTo"));
				object.setPaymentTo((String)row.get("paymentTo"));
				
				object.setPaymentMode((String)row.get("paymentMode"));
				
				object.setUserName((String)row.get("username"));
				explist.add(object);
				
		}
		
		return explist;
	}

	@Override
	public List<ExpenseVoucherGroup> getVoucherList() {
		// TODO Auto-generated method stub
		List<ExpenseVoucherGroup> voucherlist = new ArrayList<ExpenseVoucherGroup>();
		String sql = "select idehat_expense_voucher_group,voucher_name from ehat_expense_voucher_group where status='Y'";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list = query.list();
		for (Map<String, Object> row : list) {
			ExpenseVoucherGroup obj = new ExpenseVoucherGroup();
			obj.setVoucher_ID((Integer)row.get("idehat_expense_voucher_group"));
			obj.setVoucherName((String)row.get("voucher_name"));
			voucherlist.add(obj);
		}
		return voucherlist;
	}

	@Override
	public List<LedgerHead> getLedgerList(int id) {
		// TODO Auto-generated method stub
		 List<LedgerHead> ledgerlist = new ArrayList<LedgerHead>();
		 String sql = "select idehat_ledger_heads,idehat_expense_voucher_group,ledgerHeadName from ehat_ledger_heads where status='Y' and idehat_expense_voucher_group="+id;
		 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				LedgerHead obj = new LedgerHead();
				obj.setLedger_head_ID((Integer)row.get("idehat_ledger_heads"));
				obj.setVoucher_ID((Integer)row.get("idehat_expense_voucher_group"));
				obj.setLedger_head_name((String)row.get("ledgerHeadName"));
				ledgerlist.add(obj);		
			}
			
		 return ledgerlist;
	}

	@Override
	public List<Doctor> getUserAutoSuggestion(String searchtext) {
		// TODO Auto-generated method stub
		List<Doctor> doclist = new ArrayList<Doctor>();
		String sql = "SELECT User_ID,concat(f_name,' ',l_name) as User_Name FROM users  where User_Name like '"+ searchtext + "%' limit 20 ";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list = query.list();
		for(Map<String, Object> row : list){
			Doctor object = new Doctor();
			object.setUser_ID((Integer)row.get("User_ID"));
			object.setUser_Name((String)row.get("User_Name"));
			doclist.add(object);
		}
		
		return doclist;
	}

	@Override
	public List<AdminCashVoucherDTO> getGeneralRVoucher(
			HttpServletRequest request, String fromdate, String fromtime,
			String todate, String totime, String callfrom, String voucherId,
			String ledgerName, int autosuggestionuserid) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		String userType = (String) session.getAttribute("userType");
		List<AdminCashVoucherDTO> genlist = new ArrayList<AdminCashVoucherDTO>();
		Date date = Calendar.getInstance().getTime();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		
		String strDate = dateFormat.format(date);
		System.out.println(strDate);
		String[] todaysDate = strDate.split(" ");
		String sql="";
		String status="'Y'";
		
       sql = "select gen.payto,gen.amount,gen.ledgerhead,gen.narration,concat(signedinuser.f_name,' ',signedinuser.l_name) as username,gen.created_date_time,grp.voucher_name,concat(usr.f_name,' ',usr.l_name) as authorised_by from ehat_vouchers gen left join ehat_expense_voucher_group grp on gen.group_name_id=grp.idehat_expense_voucher_group left join users usr on gen.autherisedby = usr.User_ID left join users signedinuser ON gen.created_by = signedinuser.User_ID WHERE gen.created_date_time between '"+fromdate+" "+fromtime+"' and '"+todate+" "+totime+"' and gen.cancelflag = 'N'";	
	   
       if(callfrom.equalsIgnoreCase("search") && autosuggestionuserid==0 && !userType.equalsIgnoreCase("admin")){
			sql = sql +" and gen.created_by="+userId;
		}
		if(!voucherId.equalsIgnoreCase("0")){
			
			 sql = sql + " and gen.group_name_id="+voucherId;
	
		}
		
		if(!ledgerName.equalsIgnoreCase("0")){
			
			 sql = sql + " and gen.ledgerhead='"+ledgerName+"'";
		}
		
		if(autosuggestionuserid > 0){
			
			sql = sql +" and gen.created_by="+autosuggestionuserid;
		}
		
		
		if(callfrom.equalsIgnoreCase("onload")){
			
			sql="";
		   sql = "select gen.payto,gen.amount,gen.ledgerhead,gen.narration,concat(signedinuser.f_name,' ',signedinuser.l_name) as username,gen.created_date_time,grp.voucher_name,concat(usr.f_name,' ',usr.l_name) as authorised_by from ehat_vouchers gen left join ehat_expense_voucher_group grp on gen.group_name_id=grp.idehat_expense_voucher_group left join users usr on gen.autherisedby = usr.User_ID left join users signedinuser ON gen.created_by = signedinuser.User_ID  WHERE  DATE(gen.created_date_time) ='"+todaysDate[0]+"' and  gen.cancelflag = 'N'";	

		   if(!userType.equalsIgnoreCase("admin")){
			 }
		   
		}
		sql=sql+" ORDER BY gen.id DESC";
		System.out.println("sqlforgen  "+sql);

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list = query.list();
		for (Map<String, Object> row : list) {
			AdminCashVoucherDTO obj = new AdminCashVoucherDTO();
			obj.setGroupName((String)row.get("voucher_name"));
			obj.setPayTo((String)row.get("payto"));
		//	obj.setCdate((Date)row.get("created_date_time"));
			obj.setAmount((Double)row.get("amount"));
			obj.setAuthorisedBy((String)row.get("authorised_by"));
			obj.setLedgerHead((String)row.get("ledgerhead"));
			obj.setNarration((String)row.get("narration"));
			// obj.setUserName((String)row.get("username"));
			genlist.add(obj);
		}
       
       return genlist;
	}
}
