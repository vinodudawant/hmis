package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.ParameterconfDao;
import com.hms.administrator.dto.ComparamDetails;
import com.hms.administrator.dto.ComparamMaster;

@Repository
public class ParameterconfDaoImpl implements ParameterconfDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Integer savePrefix(ComparamMaster comparammaster, HttpServletRequest request) {
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
;
			String prefix = request.getParameter("prefix"); 
			String prefixDesc = request.getParameter("prefixDesc"); 
			String prefixStatus = request.getParameter("prefixStatus"); 
			
			System.out.println(prefix+" "+prefixDesc+" "+prefixStatus);
			
			comparammaster = new ComparamMaster();
			comparammaster.setMcm_prefix_name(prefix);
			comparammaster.setMcm_prefix_desc(prefixDesc);
			comparammaster.setMcm_prefix_status(prefixStatus);

			Session sessionObj = sessionFactory.openSession();
			
			Transaction tx = sessionObj.beginTransaction();
			
			sessionObj.save(comparammaster);

			tx.commit();
	        
	        return 1;
	        
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	@Override
	public List<ComparamMaster> fetchAllPrefixes() {
		List<ComparamMaster> comparamList = new ArrayList<ComparamMaster>();
		try {
			SQLQuery sql = null;
			sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT * FROM mit_comparam_mas ORDER BY mcm_prefix_name ASC");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> listparameters = sql.list();
			
			for (Map<String, Object> rs : listparameters) {
				ComparamMaster objList = new ComparamMaster();
				objList.setMcm_prefix_master_id((Integer) rs.get("mcm_prefix_master_id"));
				objList.setMcm_prefix_name((String) rs.get("mcm_prefix_name"));
				objList.setMcm_prefix_desc((String) rs.get("mcm_prefix_desc"));
				objList.setMcm_prefix_status((String) rs.get("mcm_prefix_status"));				
				comparamList.add(objList);
			}
            /*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComparamMaster.class);
            criteria.addOrder(Order.asc("mcm_prefix_name"));
            comparamList = criteria.list();*/
            return  comparamList;      
        } catch(Exception e) {
            e.printStackTrace();
            return comparamList;
        }
	}

	@Override
	public List<ComparamDetails> getAllprefixDetails(Integer prefix_id) {
		
		// System.out.println(prefix_id);
		
		List<ComparamDetails> comparamList = new ArrayList<ComparamDetails>();
		try {
			SQLQuery sql = null;
			sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT * FROM mit_comparam_det WHERE mcd_mcm_prefix_master_id ="+prefix_id+" ORDER BY mcd_prefix_sub_value ASC");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> listparameters = sql.list();
			
			for (Map<String, Object> rs : listparameters) {
				ComparamDetails objList = new ComparamDetails();
				objList.setMcd_prefix_detail_id((Integer) rs.get("mcd_prefix_detail_id"));
				objList.setMcd_prefix_sub_option((String) rs.get("mcd_prefix_sub_option"));
				objList.setMcd_prefix_sub_value((String) rs.get("mcd_prefix_sub_value"));
				objList.setMcd_prefix_status((String) rs.get("mcd_prefix_status"));				
				comparamList.add(objList);
			}
            /*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComparamMaster.class);
            criteria.addOrder(Order.asc("mcm_prefix_name"));
            comparamList = criteria.list();*/
            return  comparamList;      
        } catch(Exception e) {
            e.printStackTrace();
            return comparamList;
        }
	}

	@Override
	public Integer savePrefixDetails(ComparamDetails comparamdetails, Integer prefix_id, HttpServletRequest request) {
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
;
			String prefix_suboption = request.getParameter("prefix_suboption"); 
			String prefix_subvalue = request.getParameter("prefix_subvalue"); 
			String default_value = request.getParameter("default_value"); 
			String status = request.getParameter("status"); 
			
			// System.out.println(prefix_suboption+" "+prefix_subvalue+" "+default_value+" "+status+" "+prefix_id);
			
			comparamdetails = new ComparamDetails();
			comparamdetails.setMcd_prefix_sub_option(prefix_suboption);
			comparamdetails.setMcd_prefix_sub_value(prefix_subvalue);
			comparamdetails.setMcd_prefix_default_value(default_value);
			comparamdetails.setMcd_prefix_status(status);
			comparamdetails.setMcd_mcm_prefix_master_id(prefix_id);

			Session sessionObj = sessionFactory.openSession();
			
			Transaction tx = sessionObj.beginTransaction();
			
			sessionObj.save(comparamdetails);

			tx.commit();
	        
	        return 1;
	        
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	@Override
	public List<ComparamMaster> getPrefixById(Integer prefix_id) {
		
		System.out.println(prefix_id);
		
		List<ComparamMaster> comparamList = new ArrayList<ComparamMaster>();
		try {
			SQLQuery sql = null;
			sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT * FROM mit_comparam_mas WHERE mcm_prefix_master_id ="+prefix_id);     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> listparameters = sql.list();
			
			for (Map<String, Object> rs : listparameters) {
				ComparamMaster objList = new ComparamMaster();
				objList.setMcm_prefix_master_id((Integer) rs.get("mcm_prefix_master_id"));
				objList.setMcm_prefix_name((String) rs.get("mcm_prefix_name"));
				objList.setMcm_prefix_desc((String) rs.get("mcm_prefix_desc"));
				objList.setMcm_prefix_status((String) rs.get("mcm_prefix_status"));			
				comparamList.add(objList);
			}
            /*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComparamMaster.class);
            criteria.addOrder(Order.asc("mcm_prefix_name"));
            comparamList = criteria.list();*/
            return  comparamList;      
        } catch(Exception e) {
            e.printStackTrace();
            return comparamList;
        }
	}

	@Override
	public List<ComparamDetails> getPrefixDetailById(Integer prefix_id) {
		
		System.out.println(prefix_id);
		
		List<ComparamDetails> comparamList = new ArrayList<ComparamDetails>();
		try {
			SQLQuery sql = null;
			sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT * FROM mit_comparam_det WHERE mcd_prefix_detail_id ="+prefix_id);     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> listparameters = sql.list();
			
			for (Map<String, Object> rs : listparameters) {
				ComparamDetails objList = new ComparamDetails();
				objList.setMcd_prefix_detail_id((Integer) rs.get("mcd_prefix_detail_id"));
				objList.setMcd_prefix_sub_option((String) rs.get("mcd_prefix_sub_option"));
				objList.setMcd_prefix_sub_value((String) rs.get("mcd_prefix_sub_value"));
				objList.setMcd_prefix_default_value((String) rs.get("mcd_prefix_default_value"));		
				objList.setMcd_prefix_status((String) rs.get("mcd_prefix_status"));		
				comparamList.add(objList);
			}
            /*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComparamMaster.class);
            criteria.addOrder(Order.asc("mcm_prefix_name"));
            comparamList = criteria.list();*/
            return  comparamList;      
        } catch(Exception e) {
            e.printStackTrace();
            return comparamList;
        }
	}

	@Override
	public Integer editPrefix(ComparamMaster comparammaster, Integer prefix_id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			
			String prefix_update = request.getParameter("prefix_update");
			String prefix_description_update = request.getParameter("prefix_description_update");
			String prefix_status_update = request.getParameter("prefix_status_update");
			
			System.out.println(prefix_id+" "+prefix_update+" "+prefix_description_update+" "+prefix_status_update);

			String sql = "UPDATE mit_comparam_mas SET mcm_prefix_desc = '"+prefix_description_update+"', mcm_prefix_name = '"+prefix_update+"', mcm_prefix_status = '"+prefix_status_update+"' WHERE mcm_prefix_master_id = "+prefix_id;
			
			Query qry = sessionFactory.getCurrentSession().createSQLQuery(sql);
			qry.executeUpdate();
			
			return 1;
			
        } catch(Exception e) {
            e.printStackTrace();
        }
		
        return 0;
	}

}
