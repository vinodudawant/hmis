package com.hms.bloodbank.dao.impl;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.DonorCheckupListDao;
import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.BloodItemMaster;
import com.hms.bloodbank.dto.BloodTypeMaster;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorMaster;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.DonorTreatment;

import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;



@SuppressWarnings("unchecked")
@Repository
@Transactional

public class DonorCheckupListDaoImpl implements DonorCheckupListDao {
	
	
	
static Logger log=Logger.getLogger(DonorCheckupListDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public List<Doctor> fetchDoctor() {
		String doctor_type="doctor";
		List<Doctor> liDoctor = new ArrayList<Doctor>();
		String hql = "SELECT d.doc_name, d.UserDetails.user_ID FROM Doctor d join d.UserDetails u Where d.doc_Type like:doctor_type ";
		//String hql = "SELECT doc_name,d.User_ID  FROM users u,doctor d WHERE u.User_ID=d.User_ID and (u.user_Type='doctor' or u.user_Type='rmo' or u.user_Type='visitingdoctor')";
		try {
			Session session =sessionFactory.getCurrentSession();
			Query query = session.createQuery(hql);
			query.setParameter("doctor_type", doctor_type);
			List<Object[]> doctorDetails = query.list();
			for (Object[] rs : doctorDetails) {
				System.out.println("list>>"+rs.toString());
				Doctor objDoctor = new Doctor();
				if(rs[0]!=null)
				objDoctor.setDoc_name(rs[0].toString());
				if(rs[1]!=null)
				objDoctor.setUser_ID(Integer.parseInt(rs[1].toString()));
				liDoctor.add(objDoctor);

			}
			return liDoctor;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	
	@Override
	public int saveCheckuplist(DonorCheckupList checkuplist, HttpServletRequest request) {
	try {
		DonorTreatment donorTreatment = (DonorTreatment) sessionFactory.getCurrentSession().get(DonorTreatment.class,checkuplist.getDonorTreatmentId());
		System.out.println("donorMaster>>"+donorTreatment);
		checkuplist.setDonorTreatment(donorTreatment);
		//donorTreatment.setDonorCheckupList(checkuplist);
		Query query =sessionFactory.getCurrentSession().createQuery("update DonorTreatment set checkupStatus='Y' where donorTreatmentId= '"+checkuplist.getDonorTreatmentId()+"'");
		int result = query.executeUpdate();
		System.out.println("result-----"+result);
		 if(checkuplist.getDonorCheckupId() == 0) {
		
			sessionFactory.getCurrentSession().merge(checkuplist);
            return 1;
		 } else {
			 sessionFactory.getCurrentSession().merge(checkuplist);
	            return 2;
		 }
		
		} catch(Exception e) {
	            log.error("Exception----> ",e);
	            e.printStackTrace();
        }
        return 0;
	}
	
	@Override
	public int saveBloodBagDetails(DonorBloodBagDetails BloodBagDetails, HttpServletRequest request) {
	try {
		DonorTreatment donorTreatment = (DonorTreatment) sessionFactory.getCurrentSession().get(DonorTreatment.class,BloodBagDetails.getDonorTreatmentId());
		BloodBagDetails.setDonorTreatment(donorTreatment);
		//current year
		int year = Calendar.getInstance().get(Calendar.YEAR);
	
		String sql="select ifnull(max(bloodbag_details_id),0) from bb_donor_blood_bag_details";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		BigInteger bloodbagid=(BigInteger) query.uniqueResult();
		int id = bloodbagid.intValue();
		int maxid=id+1;
		System.out.println("maxId=="+maxid);
		String barCode = year+"-"+"BAG-"+maxid;
		BloodBagDetails.setSampleBagBarcode(barCode);
		 if(BloodBagDetails.getBloodBagDetailsId() == 0) {
			Session session = sessionFactory.getCurrentSession();
			DonorBloodBagDetails obj = (DonorBloodBagDetails) session.merge(BloodBagDetails);
			//disable Bag For other Donor
			Query hql=sessionFactory.getCurrentSession().createQuery("update BloodBagMaster set status='N' where bloodBagtName='"+obj.getBloodBagDetails()+"'");
            hql.executeUpdate();
            //Donor Treatment Closed
            Query hql1=sessionFactory.getCurrentSession().createQuery("update DonorTreatment set status='N' where donorTreatmentId='"+obj.getDonorTreatment().getDonorTreatmentId()+"'");
            hql1.executeUpdate();
            
            //update treatment as donor blood collected
            Query hql3=sessionFactory.getCurrentSession().createQuery("update DonorTreatment set collectionStatus='Y' where donorTreatmentId='"+obj.getDonorTreatment().getDonorTreatmentId()+"'");
            hql3.executeUpdate();
            
			return obj.getBloodBagDetailsId();
		 }else {
			 sessionFactory.getCurrentSession().merge(BloodBagDetails);
			 Session session = sessionFactory.getCurrentSession();
				DonorBloodBagDetails obj = (DonorBloodBagDetails) session.merge(BloodBagDetails);
				//disable Bag For other Donor
				Query hql=sessionFactory.getCurrentSession().createQuery("update BloodBagMaster set status='N' where bloodBagtName='"+obj.getBloodBagDetails()+"'");
	            hql.executeUpdate();
	            //Donor Treatment Closed
	            Query hql1=sessionFactory.getCurrentSession().createQuery("update DonorTreatment set status='N' where donorTreatmentId='"+obj.getDonorTreatment().getDonorTreatmentId()+"'");
	            hql1.executeUpdate();
	            
	            //update treatment as donor blood collected
	            Query hql3=sessionFactory.getCurrentSession().createQuery("update DonorTreatment set collectionStatus='Y' where donorTreatmentId='"+obj.getDonorTreatment().getDonorTreatmentId()+"'");
	            hql3.executeUpdate();
	            
				return obj.getBloodBagDetailsId();
	           // return 2;
		 }
		
		} catch(Exception e) {
	            log.error("Exception----> ",e);
	            e.printStackTrace();
        }
        return 0;
	}


	@Override
	public DonorBloodBagDetails getDonorDetailsByTreatmentId(int id, String callform ,
			HttpServletRequest request) {
		try {
			DonorBloodBagDetails donorBloodBagDetails=new DonorBloodBagDetails();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DonorBloodBagDetails.class);
	            criteria.add(Restrictions.eq("donorTreatment.donorTreatmentId", id));
	            criteria.add(Restrictions.eq("status", "Y"));
	            donorBloodBagDetails=(DonorBloodBagDetails) criteria.uniqueResult();
	              return donorBloodBagDetails;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}


	@Override
	public List<DonorBloodBagDetails> serachBloodBagDetailsById(String searchParam,String callform){ 
		System.out.println(searchParam);
		List<DonorBloodBagDetails> listBloodBagDetails = new ArrayList<DonorBloodBagDetails>();
		String searchParam1="";
		String sql ="";
		if(callform.equalsIgnoreCase("componentSepration")) {
			 sql = " SELECT b.bloodbag_details_id, b.blood_bag_details, b.donor_treatment_id FROM bb_donor_blood_bag_details b join bb_component_seperation c on b.bloodbag_details_id=c.donor_treatment_id where b.blood_bag_details LIKE '" + searchParam + "%' OR b.bloodbag_details_id LIKE '" + searchParam + "%' AND c.status='Y' ";
		}
		else if(callform.equalsIgnoreCase("stockRegister")){
			sql = "SELECT b.bloodbag_details_id, b.blood_bag_details, b.donor_treatment_id FROM bb_donor_blood_bag_details b   JOIN bb_stock_register st ON b.bloodbag_details_id = st.bag_id where b.blood_bag_details LIKE '" + searchParam + "%' OR b.bloodbag_details_id LIKE '" + searchParam + "%'  AND  st.stock_used = 'Y'";
		}
		else if(callform.equalsIgnoreCase("discardStock")){
			sql = "SELECT b.bloodbag_details_id, b.blood_bag_details, b.donor_treatment_id FROM bb_donor_blood_bag_details b JOIN bb_stock_register st ON b.bloodbag_details_id = st.bag_id where b.blood_bag_details LIKE '" + searchParam + "%' OR b.bloodbag_details_id LIKE '" + searchParam + "%' AND st.stock_used='Y'AND st.discarddeleted='N' ";
		}

		else if(callform.equalsIgnoreCase("bloodGroupTesting")){
			sql = "SELECT  b.bloodbag_details_id,b.blood_bag_details,b.donor_treatment_id FROM bb_donor_blood_bag_details b WHERE b.blood_bag_details LIKE '" + searchParam + "%' OR b.bloodbag_details_id LIKE '" + searchParam + "%'   AND b.bloodGroupTestingStatus = 'N'";
		}
		else if(callform.equalsIgnoreCase("sample")){
			sql = "SELECT  b.bloodbag_details_id,b.blood_bag_details,b.donor_treatment_id FROM bb_donor_blood_bag_details b WHERE b.blood_bag_details LIKE '" + searchParam + "%' OR b.bloodbag_details_id LIKE '" + searchParam + "%'   AND b.sampleDispatchStatus = 'N' ";
		}
		else {
			sql = "SELECT  b.bloodbag_details_id,b.blood_bag_details,b.donor_treatment_id FROM bb_donor_blood_bag_details b WHERE b.blood_bag_details LIKE '" + searchParam + "%' OR b.bloodbag_details_id LIKE '" + searchParam + "%'";
		}

		
		try {
			Session currentSession = sessionFactory.getCurrentSession();
			SQLQuery query = currentSession.createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			System.out.println(sql);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> map= query.list();
			for (Map<String, Object> row : map) {

				DonorBloodBagDetails donorBloodBagDetails = new DonorBloodBagDetails();
				
				donorBloodBagDetails.setBloodBagDetailsId((Integer) row.get("bloodbag_details_id"));
				donorBloodBagDetails.setBloodBagDetails((String) row.get("blood_bag_details"));
				donorBloodBagDetails.setDonorTreatmentId((Integer) row.get("donor_treatment_id"));
			
			listBloodBagDetails.add(donorBloodBagDetails);
			donorBloodBagDetails = null;
			}
			return listBloodBagDetails;


		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}


	@Override
	public DonorCheckupList getDonorCheckupListDetailsByTreatmentId(int id, HttpServletRequest request) {
		try {
			DonorCheckupList donorCheckupList=new DonorCheckupList();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DonorCheckupList.class);
	            criteria.add(Restrictions.eq("donorTreatment.donorTreatmentId", id));
	            criteria.add(Restrictions.eq("status", "Y"));
	            donorCheckupList=(DonorCheckupList) criteria.uniqueResult();
	              return donorCheckupList;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}
	
	
	@Override
	public int saveBloodGroupTesting(BloodGroupTesting BloodGroupTesting, HttpServletRequest request) {
	try {
		Query query =sessionFactory.getCurrentSession().createQuery("update DonorBloodBagDetails set bloodGroupTestingStatus='Y' where donor_treatment_id= "+BloodGroupTesting.getDonorTreatmentId()+" ");
		int result = query.executeUpdate();
		
		DonorTreatment donorTreatment = (DonorTreatment) sessionFactory.getCurrentSession().get(DonorTreatment.class,BloodGroupTesting.getDonorTreatmentId());
		BloodGroupTesting.setDonorTreatment(donorTreatment);
		 if(BloodGroupTesting.getBloodGroupTestingId() == 0) {
			
			sessionFactory.getCurrentSession().merge(BloodGroupTesting);
            return 1;
		 }else {
			 sessionFactory.getCurrentSession().merge(BloodGroupTesting);
	            return 2;
		 }
		
		} catch(Exception e) {
	            log.error("Exception----> ",e);
        }
        return 0;
	}


	@Override
	public int saveSampleDispatch(DonorSampleDispatch donorSampleDispatchDetails, HttpServletRequest request) {
		try {


			 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DonorSampleDispatch.class);
			  		Criterion name = Restrictions.eq("sampleTreatmentId",donorSampleDispatchDetails.getSampleTreatmentId());
			  		criteria.add(name);
			  		

			  		
			  		

			if(donorSampleDispatchDetails.getBloodSampleDispatchId()==0) {
				if(criteria.uniqueResult()!=null) {
					return 2;
				}else {
			if(donorSampleDispatchDetails.getRed_cell_serology()==1) {
				donorSampleDispatchDetails.setSampleItemName(1);
				Session  session =sessionFactory.getCurrentSession();
				session.save(donorSampleDispatchDetails);
				 session.flush();
			     session.clear();
			}
			if(donorSampleDispatchDetails.getTransfusion_trans_disease_lab()==2) {
				donorSampleDispatchDetails.setSampleItemName(2);
				Session  session =sessionFactory.getCurrentSession();
				session.save(donorSampleDispatchDetails);
				 session.flush();
			     session.clear();
			}
			
			if(donorSampleDispatchDetails.getComponentSeperation()==3) {
				donorSampleDispatchDetails.setSampleItemName(3);
				Session  session =sessionFactory.getCurrentSession();
				session.save(donorSampleDispatchDetails);
				 session.flush();
			     session.clear();
			}
			}
			}
			
			Query query =sessionFactory.getCurrentSession().createQuery("update bb_donor_blood_bag_details set sampleDispatchStatus='Y' where donor_treatment_id="+donorSampleDispatchDetails.getSampleTreatmentId()+" ");
			int result = query.executeUpdate();
			


			return 1;
			
		}catch(Exception e) {
			 log.error("Exception----> ",e);
			 e.printStackTrace();
		}
		return 0;
	}


	@Override
	public List<DonorSampleDispatch> getSampleDetails(Integer sampleStatus,String formDate, 
			String toDate,String callform, Integer sampleSection, Integer sampleBloodBagNo) {
		List<DonorSampleDispatch> listBloodBagDetails = new ArrayList<DonorSampleDispatch>();
		//if(callform.equals("onload")) {
		
		if(sampleStatus > 0 && sampleSection==0 && sampleBloodBagNo==0 ) {
		//String sql = "SELECT blood_sample_dispatch_id,sample_donor_name, sample_status,sample_item_name,sample_blood_bag_Number,sample_dispatch_remarks FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND sample_item_name !=3 AND status='Y' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' ";
		String sql = "SELECT blood_sample_dispatch_id,sample_donor_name, sample_status,sample_item_name,sample_blood_bag_Number,sample_dispatch_remarks FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND sample_item_name !=3 AND status='Y' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' ";
		try {
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			System.out.println(sql);
			List<Object[]> Details = query.list();
			for (Object[] rs : Details) {
		    	System.out.println("row"+rs.toString());
		    	DonorSampleDispatch donorSampleDispatch = new DonorSampleDispatch();
		    	if(rs[0] !=null)
		    		if(rs[0]!=null)
		    			donorSampleDispatch.setBloodSampleDispatchId(Integer.parseInt(rs[0].toString()));
					if(rs[1]!=null)
						donorSampleDispatch.setSampleDonorName(rs[1].toString());
					if(rs[2]!=null)
						donorSampleDispatch.setSampleStatus(Integer.parseInt(rs[2].toString()));
					if(rs[3]!=null)
		    			donorSampleDispatch.setSampleItemName(Integer.parseInt(rs[3].toString()));
					if(rs[4]!=null)
						donorSampleDispatch.setSampleBloodBagNumber(rs[4].toString());
					if(rs[5]!=null)
						donorSampleDispatch.setSampleDispatchRemarks(rs[5].toString());
					
						Date date =new Date();
						donorSampleDispatch.setCreatedDate(date);
				listBloodBagDetails.add(donorSampleDispatch);
				donorSampleDispatch=null;

			}
			
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
		// Added By Annapurna 
	}else if(sampleBloodBagNo>=0 && sampleSection > 0 && sampleStatus ==1 ) {
		
		try {
			if(sampleSection ==1)		{
				String sql = "SELECT blood_sample_dispatch_id,sample_donor_name, sample_status,sample_item_name,sample_blood_bag_Number,sample_blood_bag_id FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND sample_item_name =1 AND status='Y' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' ";
				Session session =sessionFactory.getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				System.out.println(sql);
				
				List<Object[]> Details = query.list();
				for (Object[] rs : Details) {
			    	System.out.println("row"+rs.toString());
			    	DonorSampleDispatch donorSampleDispatch = new DonorSampleDispatch();
			    	if(rs[0] !=null)
			    		if(rs[0]!=null)
			    			donorSampleDispatch.setBloodSampleDispatchId(Integer.parseInt(rs[0].toString()));
						if(rs[1]!=null)
							donorSampleDispatch.setSampleDonorName(rs[1].toString());
						if(rs[2]!=null)
							donorSampleDispatch.setSampleStatus(Integer.parseInt(rs[2].toString()));
						if(rs[3]!=null)
			    			donorSampleDispatch.setSampleItemName(Integer.parseInt(rs[3].toString()));
						if(rs[4]!=null)
							donorSampleDispatch.setSampleBloodBagNumber(rs[4].toString());
						if(rs[5]!=null)
							donorSampleDispatch.setSampleBloodBagId(Integer.parseInt(rs[5].toString()));
							Date date =new Date();
							donorSampleDispatch.setCreatedDate(date);
					listBloodBagDetails.add(donorSampleDispatch);
					donorSampleDispatch=null;
			}}
			else {
			String sql = "SELECT blood_sample_dispatch_id,sample_donor_name, sample_status,sample_item_name,sample_blood_bag_Number,sample_blood_bag_id FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND sample_item_name =2 AND status='Y' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' ";
			
			//String sql = "SELECT blood_sample_dispatch_id,sample_donor_name,sample_status,sample_item_name,sample_blood_bag_Number, sample_blood_bag_id, sample_dispatch_remarks  FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND status='Y' AND sample_item_name='"+sampleSection+"' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' ";
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			System.out.println(sql);
			/*query.setParameter("sampleStatus", sampleStatus);
			query.setParameter("status", "Y");
			query.setParameter("sampleSection", sampleSection);
			query.setParameter("status", "Y");*/
			List<Object[]> Details = query.list();
			for (Object[] rs : Details) {
		    	System.out.println("row"+rs.toString());
		    	DonorSampleDispatch donorSampleDispatch = new DonorSampleDispatch();
		    	if(rs[0] !=null)
		    		if(rs[0]!=null)
		    			donorSampleDispatch.setBloodSampleDispatchId(Integer.parseInt(rs[0].toString()));
					if(rs[1]!=null)
						donorSampleDispatch.setSampleDonorName(rs[1].toString());
					if(rs[2]!=null)
						donorSampleDispatch.setSampleStatus(Integer.parseInt(rs[2].toString()));
					if(rs[3]!=null)
		    			donorSampleDispatch.setSampleItemName(Integer.parseInt(rs[3].toString()));
					if(rs[4]!=null)
						donorSampleDispatch.setSampleBloodBagNumber(rs[4].toString());
					if(rs[5]!=null)
						donorSampleDispatch.setSampleBloodBagId(Integer.parseInt(rs[5].toString()));
						Date date =new Date();
						donorSampleDispatch.setCreatedDate(date);
				listBloodBagDetails.add(donorSampleDispatch);
				donorSampleDispatch=null;

			}
		
	}
}
		catch(Exception e) {
			
		}		
	}
		
	//Added By Annapurna for sample dispatch remark	
else if(sampleBloodBagNo>=0 && sampleSection > 0  && sampleStatus ==2  ) {
				
				try {
					
						//Added By Annapurna for sample dispatch remark
					
					String sql = "SELECT blood_sample_dispatch_id,sample_donor_name,sample_status,sample_item_name,sample_blood_bag_Number, sample_blood_bag_id, sample_dispatch_remarks  FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND status='Y' AND sample_item_name='"+sampleSection+"' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' ";
					Session session =sessionFactory.getCurrentSession();
					SQLQuery query = session.createSQLQuery(sql);
					System.out.println(sql);
					/*query.setParameter("sampleStatus", sampleStatus);
					query.setParameter("status", "Y");
					query.setParameter("sampleSection", sampleSection);
					query.setParameter("status", "Y");*/
					List<Object[]> Details = query.list();
					for (Object[] rs : Details) {
				    	System.out.println("row"+rs.toString());
				    	DonorSampleDispatch donorSampleDispatch = new DonorSampleDispatch();
				    	if(rs[0] !=null)
				    		if(rs[0]!=null)
				    			donorSampleDispatch.setBloodSampleDispatchId(Integer.parseInt(rs[0].toString()));
							if(rs[1]!=null)
								donorSampleDispatch.setSampleDonorName(rs[1].toString());
							if(rs[2]!=null)
								donorSampleDispatch.setSampleStatus(Integer.parseInt(rs[2].toString()));
							if(rs[3]!=null)
				    			donorSampleDispatch.setSampleItemName(Integer.parseInt(rs[3].toString()));
							if(rs[4]!=null)
								donorSampleDispatch.setSampleBloodBagNumber(rs[4].toString());
							if(rs[5]!=null)
								donorSampleDispatch.setSampleBloodBagId(Integer.parseInt(rs[5].toString()));
							 if(rs[6]!=null)
							 donorSampleDispatch.setSampleDispatchRemarks(rs[6].toString());
							 
							 
								Date date =new Date();
								donorSampleDispatch.setCreatedDate(date);
						listBloodBagDetails.add(donorSampleDispatch);
						donorSampleDispatch=null;

					}
				}
					catch(Exception e) {
						
					}			
			
}	
//Added By Annapurna for sample dispatch remark	
else if(sampleBloodBagNo>=0 && sampleSection > 0 && sampleStatus ==3 ) {
				
				try {
					String sql = "SELECT blood_sample_dispatch_id,sample_donor_name,sample_status,sample_item_name,sample_blood_bag_Number, sample_blood_bag_id, sample_dispatch_remarks  FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND status='Y' AND sample_item_name='"+sampleSection+"' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' ";
					Session session =sessionFactory.getCurrentSession();
					SQLQuery query = session.createSQLQuery(sql);
					System.out.println(sql);
					/*query.setParameter("sampleStatus", sampleStatus);
					query.setParameter("status", "Y");
					query.setParameter("sampleSection", sampleSection);
					query.setParameter("status", "Y");*/
					List<Object[]> Details = query.list();
					for (Object[] rs : Details) {
				    	System.out.println("row"+rs.toString());
				    	DonorSampleDispatch donorSampleDispatch = new DonorSampleDispatch();
				    	if(rs[0] !=null)
				    		if(rs[0]!=null)
				    			donorSampleDispatch.setBloodSampleDispatchId(Integer.parseInt(rs[0].toString()));
							if(rs[1]!=null)
								donorSampleDispatch.setSampleDonorName(rs[1].toString());
							if(rs[2]!=null)
								donorSampleDispatch.setSampleStatus(Integer.parseInt(rs[2].toString()));
							if(rs[3]!=null)
				    			donorSampleDispatch.setSampleItemName(Integer.parseInt(rs[3].toString()));
							if(rs[4]!=null)
								donorSampleDispatch.setSampleBloodBagNumber(rs[4].toString());
							if(rs[5]!=null)
								donorSampleDispatch.setSampleBloodBagId(Integer.parseInt(rs[5].toString()));
							 if(rs[6]!=null)
							 donorSampleDispatch.setSampleDispatchRemarks(rs[6].toString());
							 
							 
								Date date =new Date();
								donorSampleDispatch.setCreatedDate(date);
						listBloodBagDetails.add(donorSampleDispatch);
						donorSampleDispatch=null;

					}
				}
					catch(Exception e) {
						
					}					
             }
else {

		try {	//String sql = "SELECT blood_sample_dispatch_id,sample_donor_name,sample_status,sample_item_name,sample_blood_bag_Number,sample_blood_bag_id ,sample_dispatch_remarks FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND status='Y' AND sample_item_name='"+sampleSection+"' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' AND sample_blood_bag_id='"+sampleBloodBagNo+"'";
			String sql = "SELECT blood_sample_dispatch_id,sample_donor_name,sample_status,sample_item_name,sample_blood_bag_Number,sample_blood_bag_id ,sample_dispatch_remarks FROM bb_blood_sample_dispatch Where sample_status='"+sampleStatus+"' AND status='Y' AND sample_item_name='"+sampleSection+"' AND Date(created_datetime)>='"+formDate+"' AND Date(created_datetime)<='"+toDate+"' AND sample_blood_bag_id='"+sampleBloodBagNo+"'";
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			System.out.println(sql);
			/*query.setParameter("sampleStatus", sampleStatus);
			query.setParameter("status", "Y");
			query.setParameter("sampleSection", sampleSection);
			query.setParameter("sampleBloodBagNo", sampleBloodBagNo);
			query.setParameter("status", "Y");*/
			List<Object[]> Details = query.list();
			for (Object[] rs : Details) {
		    	System.out.println("row"+rs.toString());
		    	DonorSampleDispatch donorSampleDispatch = new DonorSampleDispatch();
		    	if(rs[0] !=null)
		    		if(rs[0]!=null)
		    			donorSampleDispatch.setBloodSampleDispatchId(Integer.parseInt(rs[0].toString()));
					if(rs[1]!=null)
						donorSampleDispatch.setSampleDonorName(rs[1].toString());
					if(rs[2]!=null)
						donorSampleDispatch.setSampleStatus(Integer.parseInt(rs[2].toString()));
					if(rs[3]!=null)
		    			donorSampleDispatch.setSampleItemName(Integer.parseInt(rs[3].toString()));
					if(rs[4]!=null)
						donorSampleDispatch.setSampleBloodBagNumber(rs[4].toString());
						Date date =new Date();
						donorSampleDispatch.setCreatedDate(date);
				listBloodBagDetails.add(donorSampleDispatch);
				donorSampleDispatch=null;

			}
		
			
		}
		catch(Exception e) {
			
		}
}
		return listBloodBagDetails;
	}
		






@Override
public int getMaxNo() {

		String sql = "select ifnull(max(blood_sample_dispatch_id),0) from bb_blood_sample_dispatch";
		Session session =sessionFactory.getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		BigInteger columnId1 = (BigInteger) query.uniqueResult() ;
		int columnId = columnId1.intValue();
		System.out.println("columnId"+columnId);
	return ++columnId;
}


@Override
public int saveSampleAcknowledge(int bloodDispatchId, int sampleStatus, String remarks, HttpServletRequest request) {
	String hql="Update DonorSampleDispatch set sampleStatus= :sampleStatus , sampleDispatchRemarks= :remarks where bloodSampleDispatchId = :bloodDispatchId";
	Query query = sessionFactory.getCurrentSession().createQuery(hql);
	query.setParameter("sampleStatus", sampleStatus );
	query.setParameter("bloodDispatchId", bloodDispatchId );
	query.setParameter("remarks", remarks);
	int result =query.executeUpdate();
	
	
	return result;
}


@Override
public List<DonorBloodBagDetails> getBagDetails(Integer masterId) {
	
	List<DonorBloodBagDetails> liDonorBagDetails = new ArrayList<DonorBloodBagDetails>();
	String hql = "SELECT sampleBagBarcode, bloodBagDetails FROM DonorBloodBagDetails Where status like:status AND bloodBagDetailsId like:masterId";
	try {
		Session session =sessionFactory.getCurrentSession();
		Query query = session.createQuery(hql);
		query.setParameter("status", "Y");
		query.setParameter("masterId", masterId);
		List<Object[]> doonorDetails = query.list();
		for (Object[] rs : doonorDetails) {
			System.out.println("list>>"+rs.toString());
			DonorBloodBagDetails obj = new DonorBloodBagDetails();
			if(rs[0]!=null)
				obj.setSampleBagBarcode(rs[0].toString());
			if(rs[1]!=null)
				obj.setBloodBagDetails(rs[1].toString());
			liDonorBagDetails.add(obj);

		}
		return liDonorBagDetails;
	} catch (Exception ex) {
		ex.printStackTrace();
		return null;
	}
}


@Override
public List<BloodTypeMaster> getAllBloodTypeMaster(HttpServletRequest request) {
	List<BloodTypeMaster> lstBloodTypeMaster=new ArrayList<BloodTypeMaster>();
	try {
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodTypeMaster.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.eq("unitId",unitId));
		
		lstBloodTypeMaster = criteria.list();
	}catch(Exception e) {
		log.error("Exception----> ",e);
	}		
	return lstBloodTypeMaster;
}


@Override
public List<BloodBagMaster> getAllBloodBagMaster(HttpServletRequest request) {
	List<BloodBagMaster> lstBloodTypeMaster=new ArrayList<BloodBagMaster>();
	try {
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodBagMaster.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.eq("unitId",unitId));
		
		lstBloodTypeMaster = criteria.list();
	}catch(Exception e) {
		log.error("Exception----> ",e);
	}		
	return lstBloodTypeMaster;
	
}


@Override
public List<DonorCheckupList> getAllBloodDonorsCheckupList(Integer unitId, HttpServletRequest request) {
	List<DonorCheckupList> lstDonorCheckupDto = new ArrayList<DonorCheckupList>();
	try {
		
		//Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id,b.bloodbag_details_id as bloodBagDetailsId,b.blood_bag_details as bloodBagDetails,b.collected_by as collectedBy,b.type_of_blood_bag as typeOfBloodBag, concat( d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.created_datetime as createdDate from bb_donor_blood_bag_details b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y'");
 		Query query= sessionFactory.getCurrentSession().createSQLQuery("call sp_bb_get_all_checkup_details(:p_unit_id)");
		query.setParameter("p_unit_id", unitId);
		query.setResultTransformer(Transformers.aliasToBean(DonorCheckupList.class));
		lstDonorCheckupDto = query.list();
		
	
	}catch(Exception e) {
		e.printStackTrace();
	}		
	return lstDonorCheckupDto;
}


@SuppressWarnings("unchecked")
@Override
public DonorCheckupList editBloodDonorCheckupList(Integer donorTreatmentId, HttpServletRequest request) {
	DonorCheckupList DonorBloodBagDto = new DonorCheckupList();
	try {
		
		Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT c.donor_checkup_id AS donorCheckupId,c.donor_allergy_record AS donorAllergyRecord,c.donor_felling_good AS donorFellingGood,c.donor_previous_health_issue AS donorPreviousHealthIssue,c.donor_any_habit AS donorAnyHabit,c.donor_weight AS donorWeight,c.donor_height AS donorHeight,c.donor_temprature AS donorTemprature,c.donor_blood_pressure AS donorBloodPressure, c.donor_pulse AS donorPulse, c.donor_hemoglobin AS donorHemoglobin,  c.donor_treatment_id AS donorTreatmentId,c.created_datetime AS createdDate,c.donor_checkup_remark AS donorCheckupRemark, c.donor_check_up_done_status AS donorCheckUpDoneStatus,d.title,d.first_name AS first_name,d.middle_name AS middle_name,d.last_name AS last_name,d.donor_id,doc.doc_name,c.donor_check_up_done_by AS donorCheckUpDoneBy FROM bb_donor_checkup_list c JOIN bb_donor_treatment t ON c.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  JOIN doctor doc on doc.Doctor_ID = c.donor_check_up_done_by WHERE c.status = 'Y'  AND c.donor_treatment_id = '"+donorTreatmentId+"';");
		
		query.setResultTransformer(Transformers.aliasToBean(DonorCheckupList.class));
		List<DonorCheckupList>lstDonorBloodBagDto = query.list();
		DonorBloodBagDto.setLstDonorCheckupList(lstDonorBloodBagDto);
		
		//lstDonorCheckupDto = null;
	}catch(Exception e) {
		e.printStackTrace();
	}		
	return DonorBloodBagDto;
}


@Override
public DonorCheckupList getDonorByIdCheckup(Integer donorId, HttpServletRequest request) {
	DonorCheckupList DonorBloodBagDto = new DonorCheckupList();
	try {
		
	//	Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT c.donor_checkup_id AS donorCheckupId,c.donor_allergy_record AS donorAllergyRecord,c.donor_felling_good AS donorFellingGood,c.donor_previous_health_issue AS donorPreviousHealthIssue,c.donor_any_habit AS donorAnyHabit,c.donor_weight AS donorWeight,c.donor_height AS donorHeight,c.donor_temprature AS donorTemprature,c.donor_blood_pressure AS donorBloodPressure, c.donor_pulse AS donorPulse, c.donor_hemoglobin AS donorHemoglobin,  c.donor_treatment_id AS donorTreatmentId,c.created_datetime AS createdDate,c.donor_checkup_remark AS donorCheckupRemark, c.donor_check_up_done_status AS donorCheckUpDoneStatus,d.title,d.first_name AS first_name,d.middle_name AS middle_name,d.last_name AS last_name,d.donor_id,doc.doc_name,c.donor_check_up_done_by AS donorCheckUpDoneBy,t.collectionStatus as collectionStatus FROM bb_donor_checkup_list c JOIN bb_donor_treatment t ON c.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  JOIN doctor doc on doc.Doctor_ID = c.donor_check_up_done_by WHERE c.status = 'Y' and t.collectionStatus='Y' AND t.donor_id= '"+donorId+"';");
		//Added By Annapurna
		Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT c.donor_checkup_id AS donorCheckupId,c.donor_allergy_record AS donorAllergyRecord,c.donor_felling_good AS donorFellingGood,c.donor_previous_health_issue AS donorPreviousHealthIssue,c.donor_any_habit AS donorAnyHabit,c.donor_weight AS donorWeight,c.donor_height AS donorHeight,c.donor_temprature AS donorTemprature,c.donor_blood_pressure AS donorBloodPressure, c.donor_pulse AS donorPulse, c.donor_hemoglobin AS donorHemoglobin,  c.donor_treatment_id AS donorTreatmentId,c.created_datetime AS createdDate,c.donor_checkup_remark AS donorCheckupRemark, c.donor_check_up_done_status AS donorCheckUpDoneStatus,d.title,d.first_name AS first_name,d.middle_name AS middle_name,d.last_name AS last_name,d.donor_id, t.collectionStatus as collectionStatus FROM bb_donor_checkup_list c JOIN bb_donor_treatment t ON c.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id   WHERE c.status = 'Y'and t.checkupStatus='Y'  AND t.donor_id= "+donorId +" ");
		query.setResultTransformer(Transformers.aliasToBean(DonorCheckupList.class));
		List<DonorCheckupList>lstDonorBloodBagDto = query.list();
		DonorBloodBagDto.setLstDonorCheckupList(lstDonorBloodBagDto);
		
		
	}catch(Exception e) {
		e.printStackTrace();
	}		
	return DonorBloodBagDto;
}


@SuppressWarnings("unchecked")
@Override
public List<DonorSampleDispatch> getAllSampleDispatchList(HttpServletRequest request,String fromDate,String lastDate) {

	List<DonorSampleDispatch> listDonorSampleDispatch = new ArrayList<DonorSampleDispatch>();
	try {
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		
		/*
		 * Criteria criteria =
		 * sessionFactory.getCurrentSession().createCriteria(DonorSampleDispatch.class);
		 * criteria.add(Restrictions.eq("unitId", unitId));
		 * criteria.add(Restrictions.eq("status", "Y"));
		 * criteria.add(Restrictions.between("createdDate", fromDate, lastDate));
		 */
		
		String sql = "SELECT * FROM  " + 
				"    bb_blood_sample_dispatch   " + 
				"WHERE  " + 
				"   unit_id="+unitId+" AND status= 'Y' " + 
				"   AND DATE(created_datetime) >= '"+fromDate+"'  " + 
				"   AND DATE(created_datetime) <= '"+lastDate+"'   ";
		SQLQuery sqlresult = sessionFactory.getCurrentSession().createSQLQuery(sql);
		sqlresult.addEntity(DonorSampleDispatch.class);
		
		 listDonorSampleDispatch = sqlresult.list();
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	return listDonorSampleDispatch;
}




}
