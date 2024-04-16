package com.hms.ehat.dao.impl;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.ehat.dao.DeptDao;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.UnitMasterDto;
 
@Repository
public class DeptDaoImpl implements DeptDao{
	
	@Autowired
	SessionFactory sessionFactory;
	
	/**
	 * @author Sagar @date 16_May_2017 this method is used to save or update
	 *         records in db
	 * **/
	@Override
	public int saveOrUpdateDept(DeptMasterDto deptMaster) {
		try {
			sessionFactory.getCurrentSession().merge(deptMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get records from db
	 * **/
	@Override
	public List<DeptMasterDto> getDept() {
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));  
			criteria.addOrder(Order.desc("deptId"));  		//To show Dept id in descending order
			ltDeptMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}
	/**
	 * @author Sagar @date 16_May_2017 this method is used to delete records from
	 *         db
	 * **/
	@Override
	public boolean deleteDept(Integer deptId,Integer userId) {
		try {
			DeptMasterDto deptMaster = (DeptMasterDto) sessionFactory
					.getCurrentSession().get(DeptMasterDto.class, deptId);
			deptMaster.setDeletedBy(userId);
			deptMaster.setDeletedDate(new Date(new java.util.Date()
			.getTime()));
			deptMaster.setDeleted("Y");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get records by id
	 *         from db
	 **/
	 @Override
	public List<DeptMasterDto> getDeptById(Integer deptId) {
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			if (deptId != 0) {
				criteria.add(Restrictions.eq("deptId", deptId));
			}
			ltDeptMasters = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get all records
	 *         from db
	 **/
	@Override
	public DeptMasterDto getAutoSuggestionDeptNames(String letter) {
		DeptMasterDto dp = new DeptMasterDto();
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("deptId"));
			criteria.add(Restrictions.like("deptName", "%"+letter+"%"));
			 criteria.setMaxResults(10); 
			ltDeptMasters = criteria.list();
			dp.setLstDepts(ltDeptMasters);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return dp;
	}
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get records with
	 *         deleted from db
	 **/
	@Override
	public List<DeptMasterDto> getAllDeptwithDeleted() {
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.addOrder(Order.desc("deptId"));
			ltDeptMasters = criteria.list();
} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get  records
	 *         list from db
	 **/
	@Override
	public List<DeptMasterDto> getAllDeptLst() {
		 DeptMasterDto dp = new DeptMasterDto();
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("deptId"));
			criteria.setMaxResults(10);
			ltDeptMasters = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
		}
	
	
	/**
	 * @author Sagar @date 12_July_2017 this method is used to get  records
	 *         list from db for user access flow 
	 **/
	@Override
	public List<DeptMasterDto> getAllDeptLstByUser(int userId) {
		List<DeptMasterDto> ltDeptMasters = null;
		  
		try {
			 
			String servIds=null;
            String sql1="select dept_id from users where User_ID="+userId+"";
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<Map<String, Object>> data1 = query1.list();
            
            for(Map<String, Object> row : data1){
                
                servIds=(String)row.get("dept_id");
             }
            
            ArrayList<Integer> servIds11=new ArrayList<Integer>();
           
            String[] servIds1 = null;
            
            if(servIds.length()>0){
                
                	servIds1=servIds.split(",");
                	for(String id:servIds1){
                    
                    servIds11.add(Integer.parseInt(id));
                 }
            }        
          
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DeptMasterDto.class);  
            criteria.add(Restrictions.eq("deleted", "N"));
            if(servIds11.size()!=0){
                 criteria.add(Restrictions.in("deptId", servIds11));
             }
			
            ltDeptMasters = criteria.list();
			 
			} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
		}
	 
	/** End of Departments methods ***/
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is use for getting count.
	 ******************************************************************************/
	 
	@Override
	public Long getDeptCount() {
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(DeptMasterDto.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();

	    System.err.println("count is" + count );
		return count;
	}
	}
