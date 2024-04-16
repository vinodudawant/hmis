/*******************************************************************************
 * @date 16_May_2017 
 ******************************************************************************/
package com.hms.ehat.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.mail.Session;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.UnitDao;
import com.hms.ehat.dto.UnitMasterDto;
 
@Repository
public class UnitDaoImpl implements UnitDao {

	@Autowired
	SessionFactory sessionFactory;
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for save or update operation
	 ******************************************************************************/
	@Override
	public int saveOrUpdateUnit(UnitMasterDto unitMaster) {
		// TODO Auto-generated method stub
		try {
			unitMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			sessionFactory.getCurrentSession().merge(unitMaster);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}
		return 1;
	}

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for getting all unit 
	 ******************************************************************************/
	@Override
	public List<UnitMasterDto> getUnit() {
		List<UnitMasterDto> ltUnitMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UnitMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("unitId"));
			criteria.setMaxResults(10);
			
			/*criteria.setProjection(Projections.rowCount());
			 int count = (Integer)criteria.uniqueResult();
			 criteria.add(Restrictions.eq("deleted", "N"));*/
			
			
		   
		    
			/* criteria.setMaxResults(10); */
			ltUnitMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltUnitMasters;
		}
		return ltUnitMasters;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for deleting units.
	 ******************************************************************************/
	@Override
	public boolean deleteUnit(Integer UnitId, Integer userId) {
		try {

			//UnitMasterDto unitMaster = new UnitMasterDto();

			UnitMasterDto unitMaster = (UnitMasterDto) sessionFactory
					.getCurrentSession().get(UnitMasterDto.class, UnitId);
			unitMaster.setDeleted("Y");

			unitMaster.setDeletedDate(new Date(new java.util.Date().getTime()));
			unitMaster.setDeletedBy(userId);

			//sessionFactory.getCurrentSession().merge(unitMaster);

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return false;
		}
		return true;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for showing getAutoSuggestions.
	 ******************************************************************************/
	@Override
	public List<UnitMasterDto> getAutoSuggestionUnitNames(String letter) {
		
		List<UnitMasterDto> ltUnitMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UnitMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("unitId"));
			criteria.add(Restrictions.like("unitName", letter + "%"));
			criteria.setMaxResults(10);
			ltUnitMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltUnitMasters;
		}
		return ltUnitMasters;

	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for searching unit.
	 ******************************************************************************/

	@Override
	public List<UnitMasterDto> getUnitById(Integer unitId) {
		// TODO Auto-generated method stub
		List<UnitMasterDto> ltUnitMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UnitMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			if (unitId != 0) {
				criteria.add(Restrictions.eq("unitId", unitId));
			}

			ltUnitMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltUnitMasters;
		}
		return ltUnitMasters;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for showing all units.
	 ******************************************************************************/
	@Override
	public List<UnitMasterDto> getAllUnit() {
		List<UnitMasterDto> ltUnitMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UnitMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("unitId"));
			//criteria.setMaxResults(10);
			ltUnitMasters = criteria.list();
			
			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltUnitMasters;
		}
		return ltUnitMasters;
	}
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is use for getting count.
	 ******************************************************************************/
	
	@Override
	public Long getUnitCount() {
		try{
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(UnitMasterDto.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();

	    System.err.println("count is" + count );
	    return count;
		}catch(Exception e){
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return null;
		}
	}
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for showing all units.
	 ******************************************************************************/
	@Override
	public List<UnitMasterDto> getAllUnitwithDeleted() {
		List<UnitMasterDto> ltUnitMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UnitMasterDto.class);
			criteria.addOrder(Order.desc("unitId"));
			ltUnitMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltUnitMasters;
		}
		return ltUnitMasters;
	}

	@Override
	public List<UnitMasterDto> unitMasterListlogin(String ulogin) {
		List<UnitMasterDto> ltUnitMasters =new ArrayList<UnitMasterDto>();
		try {
			/*Criteria crit = sessionFactory.getCurrentSession()
					.createCriteria(UnitMasterDto.class);
			crit.add(Restrictions.eq("unit_name", ulogin));
			
			ltUnitMasters = crit.list();
			System.err.println("unit size:::==>"+ltUnitMasters.size());*/
			
			/*Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"select unitmaster_id from users u where u.User_Name = :User_Name")
					.setParameter("User_Name", ulogin);
					//List result = query.s();
					//String s = query.getQueryString();
				List s = cr.list();
				System.err.println("Snow =-=->"+s);	*/
			
			 String sql = "SELECT unitmaster_id FROM users where User_Name = '"+ulogin+"'";
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	     //    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	       //  List<Map<String, Object>> data = query.list();
	       
	         String uids = query.uniqueResult().toString();
	      //   for(Map<String, Object> row : data){
	        	// String s=row.get("unitmaster_id").toString();
	        	 //System.err.println("unit"+ s);
	        
	        	 String unitSplit =uids;// s;
	        	 String[] unitSplit1 = unitSplit.split(",");
	        	 
	        
	        	 for(int i=0;i<unitSplit1.length;i++)
	        	 {
	        		 String k=unitSplit1[i];
	        		// System.err.println("unitid"+ k);

	        		 String sql1 = "SELECT unit_id,unit_name FROM ehat_unit_master where unit_id = '"+k+"'";
	        		 SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	        		 query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		 List<Map<String, Object>> data1 = query1.list();
		        
		         for(Map<String, Object> row1 : data1)
		         {
		        	 UnitMasterDto umd= new UnitMasterDto();
		        	 int a=(Integer)row1.get("unit_id");
		        	// System.err.println("unitid====>"+ a);
		        	 umd.setUnitId((Integer)row1.get("unit_id"));
		        	 umd.setUnitName((String)row1.get("unit_name"));
		        	 ltUnitMasters.add(umd);
		        	 
		         }
		         
	        }
	        	 for(int i=0;i<ltUnitMasters.size();i++)
	        	 {
	        		 System.out.println(ltUnitMasters.get(i));
	        	 } 
	    
	     //    }
	       
			
		} catch (Exception e) 
		{
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}
		

		return ltUnitMasters;
	}
	
	
	
	/**
	 * @author Sagar Kadam @date 12_July_2017 this method is used to get  records
	 *         list from db
	 **/
	@Override
	public List<UnitMasterDto> getAllUnitByUserAccess(int userId) {
		 
		List<UnitMasterDto> ltUnitMasters = null;
		 
		try {
		 
			String servIds=null;
            String sql1="select unitmaster_id from users where User_ID="+userId+"";  
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<Map<String, Object>> data1 = query1.list();
            
            for(Map<String, Object> row : data1){
                
                servIds=(String)row.get("unitmaster_id");
             }
             ArrayList<Integer> servIds11=new ArrayList<Integer>();
             
            String[] servIds1 = null;
            
            if(servIds.length()>0){
                
                servIds1=servIds.split(",");
                
                for(String id:servIds1){
                    
                    servIds11.add(Integer.parseInt(id));
                 }
            }        
             Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class);            
            
            criteria.add(Restrictions.eq("deleted", "N"));
            if(servIds11.size()!=0){
                
                criteria.add(Restrictions.in("unitId", servIds11));
             }
			
            ltUnitMasters = criteria.list();
			 
			} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltUnitMasters;
		}
		return ltUnitMasters;
		}

	@Override
	public Long getCountOfActiveUnit() {
		try{
			Criteria crit = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class);
			crit.add(Restrictions.eq("activeFlag", "Y"));
			crit.add(Restrictions.eq("deleted", "N"));
			crit.setProjection(Projections.rowCount());
			Long count = (Long)crit.uniqueResult();	
		    return count;
		}catch(Exception e){
			e.printStackTrace();			
			return null;
		}
	}
	
	@Override
	public List<UnitMasterDto> getAllUnitListMaster() {
		List<UnitMasterDto> ltUnitMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("activeFlag", "Y"));
			criteria.addOrder(Order.desc("unitId"));			
			ltUnitMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();		
			return ltUnitMasters;
		}
		return ltUnitMasters;
	}
 }
