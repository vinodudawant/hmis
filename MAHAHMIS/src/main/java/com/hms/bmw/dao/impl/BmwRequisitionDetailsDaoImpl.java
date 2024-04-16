package com.hms.bmw.dao.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.jfree.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bmw.dao.BmwRequisitionDetailsDao;
import com.hms.bmw.dto.BmwRequisitionCountDto;
import com.hms.bmw.dto.BmwRequisitionDetails;
import com.hms.dto.Users;
@SuppressWarnings("unchecked")
@Repository
public class BmwRequisitionDetailsDaoImpl implements BmwRequisitionDetailsDao {

	
	static Logger log=Logger.getLogger(BmwRequisitionDetailsDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;
	
	/************
	 * @author : Badrinath Wagh
	 * @codeFor : save BMW Requisition Details
	 ************/
	
	@Override
	public int saveBmwRequisitionDetailsMaster(BmwRequisitionDetails bmwRequisitionDetails,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");

		
		try {
			bmwRequisitionDetails.setUnitId(unitId);
			
			if(bmwRequisitionDetails.getId()==0) {
				sessionFactory.getCurrentSession().merge(bmwRequisitionDetails);
				return 1;
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(bmwRequisitionDetails);
				return 2;
			}
			
		} catch (Exception e) {
			Log.error("Exception--> ", e);
		}
			return 0;
		}

	/************
	 * @author : Badrinath Wagh
	 * @codeFor : get BMW Requisition Details
	 ************/
	
	@Override
	public List<BmwRequisitionDetails> getBmwRequisitionDetailsMaster(String status,HttpServletRequest request) {
		
		List<BmwRequisitionDetails> lstBmwRequisitionDetails=new ArrayList<BmwRequisitionDetails>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BmwRequisitionDetails.class);
			if(!status.equalsIgnoreCase("onload"))
			{
				criteria.add(Restrictions.eq("bag_Status", status));
			}
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.addOrder(Order.desc("Id"));
			
			lstBmwRequisitionDetails = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		// TODO Auto-generated method stub
		return lstBmwRequisitionDetails;
	}

	/************
	 * @author : Badrinath Wagh
	 * @codeFor : edit BMW Requisition Details
	 ************/

	@Override
	public BmwRequisitionDetails editBmwRequisitionDetailsMaster(Integer bmwUserId) {
		BmwRequisitionDetails list=new BmwRequisitionDetails();
		try{
			/*
			 * Criteria criteria=sessionFactory.getCurrentSession().createCriteria(
			 * BmwRequisitionDetails.class); criteria.add(Restrictions.eq("Id", bmwUserId));
			 * list=criteria.list();
			 */
			
			list = (BmwRequisitionDetails) sessionFactory.getCurrentSession().get(BmwRequisitionDetails.class,bmwUserId);
			String bagId = list.getTypeOfBag();
			String sql = "select Bag_Type from bmw_type_of_bag where typeOfBagId = " + bagId;
			SQLQuery SSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
			String Bagc = (String) SSql.uniqueResult();
			list.setBagColour(Bagc);
				
			   
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return list;
	}

	/************
	 * @author : Badrinath Wagh
	 * @codeFor : delete BMW Requisition Details
	 ************/

	@Override
	public boolean deleteBmwRequisitionDetailsMaster(Integer bmwUserId, Integer userId, HttpServletRequest request) {
		
		try {
			
			String sql="UPDATE BmwRequisitionDetails SET deleted ='Y', deletedBy="+userId+", deletedDate=:deletedatetime WHERE Id in("+bmwUserId+")";// TODO Auto-generated method stub
			Query q = sessionFactory.getCurrentSession().createQuery(sql);
			q.setParameter("deletedatetime", new Date(new java.util.Date().getTime()));
			q.executeUpdate();
			
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		// TODO Auto-generated method stub
		return false;
	}
	
	/************
	 * @author : Badrinath Wagh
	 * @codeFor : fetch Nurse 
	 ************/
	
	@Override
	public List<Users> getNurse(Integer user_ID) {

		List<Users> listuser=new ArrayList<>();
		 try{
			 Criteria c= sessionFactory.getCurrentSession().createCriteria(Users.class);
			 c.add(Restrictions.eq("user_Type", "nurse"));
			 listuser=c.list();
			 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listuser;
	}
	
	/************
	 * @author : Badrinath Wagh
	 * @codeFor : get Next Auto Increment
	 ************/
	
	@Override
	public Integer getNextAutoIncrement() {

		Integer id = 0;
		try {
			
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"SELECT MAX(id) FROM bmw_requisition_details");
			Object id1 = query.uniqueResult();

			if (id1 == null) {
				id1 = 0;
			}
			id = Integer.parseInt(id1.toString()) + 1;

		} catch (Exception e) {
			e.printStackTrace();
			return id;
		}
		return id;

	}

	/************
	 * @author : Badrinath Wagh
	 * @codeFor : fetch Filterwise Data
	 ************/

	@Override
	public List<BmwRequisitionDetails> getfilterBmwRequisitionDetailsMaster(String fdate, String tdate, String department, String wardTypeSelect, String typeOfBag, String bag_Status) {
		// TODO Auto-generated method stub
		
		List<BmwRequisitionDetails> listdata = new ArrayList<BmwRequisitionDetails>();
		//System.out.println("fdate"+fdate+",\n tdate"+tdate+",\n department"+department+",\n wardTypeSelect"+wardTypeSelect+",\n typeOfBag"+typeOfBag+"");
		
		String sql = "";
		String date_validation_qry = "";
		String daept_validation_qry = "";
		String ward_validation_qry = "";
		String bag_validation_qry = "";
		String status_validation_qry = "";
		
		if(fdate.equalsIgnoreCase("") || fdate.equalsIgnoreCase(null) || tdate.equalsIgnoreCase("") || tdate.equalsIgnoreCase(null))
		{
			date_validation_qry = " ";
		}else {
			date_validation_qry = " AND SUBSTR(brd.created_datetime, 1, 10) >= '"+fdate+"' AND SUBSTR(brd.created_datetime, 1, 10) <= '"+tdate+"' ";
		}
		
		if(department.equalsIgnoreCase("0") || department.equalsIgnoreCase("--Select--"))
		{
			daept_validation_qry = " ";
		}else {
			daept_validation_qry = " AND department = '"+department+"' ";
		}
		
		if(wardTypeSelect.equalsIgnoreCase("0"))
		{
			ward_validation_qry = " ";
		}else {
			ward_validation_qry = " AND ward_id = "+wardTypeSelect;
		}
		
		if(typeOfBag.equalsIgnoreCase("0"))
		{
			bag_validation_qry = " ";
		}else {
			bag_validation_qry = " AND type_of_bag = '"+typeOfBag+"' ";
		}
		
		if(bag_Status.equalsIgnoreCase("0") || bag_Status.equalsIgnoreCase("--Select--"))
		{
			status_validation_qry = " ";
		}else {
			status_validation_qry = " AND bag_Status = '"+bag_Status+"' ";
		}
		
		sql = "SELECT * FROM bmw_requisition_details brd WHERE brd.status = 'Y' "+date_validation_qry+" "+daept_validation_qry+" "+ward_validation_qry+" "+bag_validation_qry+" "+status_validation_qry+" ORDER BY brd.id DESC";
		
		SQLQuery qurey = sessionFactory.getCurrentSession().createSQLQuery(sql);
		
		qurey.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		List<Map<String, Object>> list = qurey.list();
		
		for(Map<String, Object> row : list)
		{
			BmwRequisitionDetails obj = new BmwRequisitionDetails();
			obj.setDepartment((String)row.get("department"));
			obj.setBag_Status((String)row.get("bag_status"));
			obj.setBmwUserId((Integer)row.get("bmw_user_id"));
			obj.setCallerName((String)row.get("caller_name"));
			obj.setTypeOfBag((String)row.get("type_of_bag"));
			obj.setBagColour((String)row.get("bag_type"));
			//obj.setCallerNumber((Integer)row.get("caller_number"));
			obj.setCaller_number_duplicate((BigInteger)row.get("caller_number"));
			obj.setNurseInCharge((String)row.get("nurse_in_charge"));
			obj.setCreatedDate((Date)row.get("created_datetime"));
			obj.setWardName((String)row.get("ward_name"));
		    obj.setWeightOfBag((Integer)row.get("weight_of_bag"));
		    obj.setPickupLocation((String)row.get("pickup_location"));
		    obj.setDrop_Location((String)row.get("drop_location"));
		    obj.setRemark((String)row.get("remark"));
		    
		    obj.setNurseId((Integer)row.get("nurse_id"));
			
			
			
			listdata.add(obj);
		}
		
		return listdata;
	}

	/************
	 * @author : Badrinath Wagh
	 * @codeFor : Approve BMW Requisition
	 ************/

	@Override
	public int approveBmwRequisition(String id, Integer userId) {
		try{
			String sql="Update BmwRequisitionDetails set bag_Status ='Approved',updatedBy="+userId+",updatedDate=now()  where Id in("+id+")";// TODO Auto-generated method stub
		Query q= sessionFactory.getCurrentSession().createQuery(sql);
		q.executeUpdate();
	//	System.out.println("Tiger");
		return 1;
	}catch(Exception e) {
		e.printStackTrace();
	}
	return 0;
}


	/************
	 * @author : Badrinath Wagh
	 * @codeFor : fetch BMW Users
	 ************/
	@Override
	public List<Users> getBMWusers() {
		
		List<Users> list = null;
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Users.class);
			
			criteria.add(Restrictions.eq("user_Type", "BMW"));
			
			list = criteria.list();
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return list;
		}
		
		// TODO Auto-generated method stub
		return list;
	}

	/************
	 * @author : Badrinath Wagh
	 * @codeFor : Assigned BMW Requisition
	 ************/
	
	@Override
	public int assignBmwRequisition(String id, Integer userId) {
		// TODO Auto-generated method stub
		try{
			String sql="Update BmwRequisitionDetails set bag_Status ='Assigned',updatedBy="+userId+",updatedDate=now()  where Id in("+id+")";// TODO Auto-generated method stub
		Query q= sessionFactory.getCurrentSession().createQuery(sql);
		q.executeUpdate();
	//	System.out.println("Tiger");
		return 1;
	}catch(Exception e) {
		e.printStackTrace();
	}
	return 0;
	}

	/************
	 * @author : Badrinath Wagh
	 * @codeFor : complete BMW Requisition
	 ************/

	@Override
	public int completeBmwRequisition(String id, Integer userId) {
		// TODO Auto-generated method stub
		try{
			String sql="Update BmwRequisitionDetails set bag_Status ='Complete',updatedBy="+userId+",updatedDate=now()  where Id in("+id+")";// TODO Auto-generated method stub
		Query q= sessionFactory.getCurrentSession().createQuery(sql);
		q.executeUpdate();
	
		return 1;
	}catch(Exception e) {
		e.printStackTrace();
	}
	return 0;
	}
	
	/************
	 * @author : Badrinath Wagh
	 * @codeFor : get BMW Requisition Count
	 ************/
	
	@Override
	public BmwRequisitionCountDto getBmwRequisitionCount(int id, HttpServletRequest request) {

		BmwRequisitionCountDto bmwRequisitionCount = new BmwRequisitionCountDto();
		Integer approveCount=0;
		Integer openCount=0;
		Integer assignCount=0;
		Integer completeCount=0;

		try {
				
			  String hql1="SELECT count(*) FROM bmw_requisition_details where bag_status='Approved'";
			  SQLQuery q1= sessionFactory.getCurrentSession().createSQLQuery(hql1);
			  approveCount=((Number)q1.uniqueResult()).intValue();
			 // q1.executeUpdate();
			 
			  String hql2="SELECT count(*) FROM bmw_requisition_details where bag_status='Complete'";
			  SQLQuery q2= sessionFactory.getCurrentSession().createSQLQuery(hql2);
			  completeCount=((Number)q2.uniqueResult()).intValue();;
			  //q2.executeUpdate();
			  
			  String hql3="SELECT count(*) FROM bmw_requisition_details where bag_status='Assigned'";
			  SQLQuery q3= sessionFactory.getCurrentSession().createSQLQuery(hql3);
			  assignCount=((Number)q3.uniqueResult()).intValue();;
			  //q3.executeUpdate();
			  
			  String hql4="SELECT count(*) FROM bmw_requisition_details where bag_status='OPEN'";
			  SQLQuery q4= sessionFactory.getCurrentSession().createSQLQuery(hql4);
			  openCount=((Number)q4.uniqueResult()).intValue();;
			  //q4.executeUpdate();
			  
			  bmwRequisitionCount.setApproveCount(approveCount);
			  bmwRequisitionCount.setAssignCount(assignCount);
			  bmwRequisitionCount.setOpenCount(openCount);
			  bmwRequisitionCount.setCompleteCount(completeCount);
			  
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		  return bmwRequisitionCount;
		
	}
	
	/************
	 * @author : Badrinath Wagh
	 * @codeFor : To fetch Bagwise count
	 ************/

	@Override
	public List<BmwRequisitionDetails> getBmwBagWiseCount(int id, HttpServletRequest request) {

		List<BmwRequisitionDetails> list = new ArrayList<BmwRequisitionDetails>();
		
		Integer redApproveCount=0;
		Integer redCompleteCount=0;
		Integer redAssignCount=0;
		Integer redOpenCount=0;
		Integer yellowApproveCount=0;
		Integer yellowCompleteCount=0;
		Integer yellowAssignCount=0;
		Integer yellowOpenCount=0;
		Integer greenApproveCount=0;
		Integer greenCompleteCount=0;
		Integer greenAssignCount=0;
		Integer greenOpenCount=0;
		Integer blackApproveCount=0;
		Integer blackCompleteCount=0;
		Integer blackAssignCount=0;
		Integer blackOpenCount=0;

		try {
			
			BmwRequisitionDetails bmwRequisitionDetails = new BmwRequisitionDetails();
				
			  String hql1="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='1' and bag_status='Approved'";
			  SQLQuery q1= sessionFactory.getCurrentSession().createSQLQuery(hql1);
			  redApproveCount=((Number)q1.uniqueResult()).intValue();
			 // q1.executeUpdate();
			 
			  String hql2="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='1' and bag_status='complete'";
			  SQLQuery q2= sessionFactory.getCurrentSession().createSQLQuery(hql2);
			  redCompleteCount=((Number)q2.uniqueResult()).intValue();
			  //q2.executeUpdate();
			  
			  String hql3="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='1' and bag_status='Assigned'";
			  SQLQuery q3= sessionFactory.getCurrentSession().createSQLQuery(hql3);
			  redAssignCount=((Number)q3.uniqueResult()).intValue();
			  //q3.executeUpdate();
			  
			  String hql4="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='1' and bag_status='OPEN'";
			  SQLQuery q4= sessionFactory.getCurrentSession().createSQLQuery(hql4);
			  redOpenCount=((Number)q4.uniqueResult()).intValue();
			  //q4.executeUpdate();
			  
			  String hql5="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='2' and bag_status='Approved'";
			  SQLQuery a1= sessionFactory.getCurrentSession().createSQLQuery(hql5);
			  yellowApproveCount=((Number)a1.uniqueResult()).intValue();
			 // q1.executeUpdate();
			 
			  String hql6="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='2' and bag_status='complete'";
			  SQLQuery a2= sessionFactory.getCurrentSession().createSQLQuery(hql6);
			  yellowCompleteCount=((Number)a2.uniqueResult()).intValue();
			  //q2.executeUpdate();
			  
			  String hql7="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='2' and bag_status='Assigned'";
			  SQLQuery a3= sessionFactory.getCurrentSession().createSQLQuery(hql7);
			  yellowAssignCount=((Number)a3.uniqueResult()).intValue();
			  //q3.executeUpdate();
			  
			  String hql8="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='2' and bag_status='OPEN'";
			  SQLQuery a4= sessionFactory.getCurrentSession().createSQLQuery(hql8);
			  yellowOpenCount=((Number)a4.uniqueResult()).intValue();
			  //q4.executeUpdate();
			  
			  String hql9="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='3' and bag_status='Approved'";
			  SQLQuery a5= sessionFactory.getCurrentSession().createSQLQuery(hql9);
			  greenApproveCount=((Number)a5.uniqueResult()).intValue();
			 // q1.executeUpdate();
			 
			  String hql10="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='3' and bag_status='complete'";
			  SQLQuery a6= sessionFactory.getCurrentSession().createSQLQuery(hql10);
			  greenCompleteCount=((Number)a6.uniqueResult()).intValue();
			  //q2.executeUpdate();
			  
			  String hql11="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='3' and bag_status='Assigned'";
			  SQLQuery a7= sessionFactory.getCurrentSession().createSQLQuery(hql11);
			  greenAssignCount=((Number)a7.uniqueResult()).intValue();
			  //q3.executeUpdate();
			  
			  String hql12="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='3' and bag_status='OPEN'";
			  SQLQuery a8= sessionFactory.getCurrentSession().createSQLQuery(hql12);
			  greenOpenCount=((Number)a8.uniqueResult()).intValue();
			  //q4.executeUpdate();
			  
			  String hql13="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='4' and bag_status='Approved'";
			  SQLQuery a9= sessionFactory.getCurrentSession().createSQLQuery(hql13);
			  blackApproveCount=((Number)a9.uniqueResult()).intValue();
			 // q1.executeUpdate();
			 
			  String hql14="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='4' and bag_status='complete'";
			  SQLQuery a10= sessionFactory.getCurrentSession().createSQLQuery(hql14);
			  blackCompleteCount=((Number)a10.uniqueResult()).intValue();
			  //q2.executeUpdate();
			  
			  String hql15="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='4' and bag_status='Assigned'";
			  SQLQuery a11= sessionFactory.getCurrentSession().createSQLQuery(hql15);
			  blackAssignCount=((Number)a11.uniqueResult()).intValue();
			  //q3.executeUpdate();
			  
			  String hql16="select  COUNT(*) as 'count' from bmw_requisition_details where type_of_bag='4' and bag_status='OPEN'";
			  SQLQuery a12= sessionFactory.getCurrentSession().createSQLQuery(hql16);
			  blackOpenCount=((Number)a12.uniqueResult()).intValue();
			  //q4.executeUpdate();
			  
			  bmwRequisitionDetails.setRedApproveCount(redApproveCount);
			  bmwRequisitionDetails.setRedAssignCount(redAssignCount);
			  bmwRequisitionDetails.setRedOpenCount(redOpenCount);
			  bmwRequisitionDetails.setRedCompleteCount(redCompleteCount);
			  
			  bmwRequisitionDetails.setYellowApproveCount(yellowApproveCount);
			  bmwRequisitionDetails.setYellowAssignCount(yellowAssignCount);
			  bmwRequisitionDetails.setYellowOpenCount(yellowOpenCount);
			  bmwRequisitionDetails.setYellowCompleteCount(yellowCompleteCount);
			  
			  bmwRequisitionDetails.setGreenApproveCount(greenApproveCount);
			  bmwRequisitionDetails.setGreenAssignCount(greenAssignCount);
			  bmwRequisitionDetails.setGreenOpenCount(greenOpenCount);
			  bmwRequisitionDetails.setGreenCompleteCount(greenCompleteCount);
			  
			  bmwRequisitionDetails.setBlackApproveCount(blackApproveCount);
			  bmwRequisitionDetails.setBlackAssignCount(blackAssignCount);
			  bmwRequisitionDetails.setBlackOpenCount(blackOpenCount);
			  bmwRequisitionDetails.setBlackCompleteCount(blackCompleteCount);
			  
			  list.add(bmwRequisitionDetails);
			  
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		  return list;
		
	}

}

