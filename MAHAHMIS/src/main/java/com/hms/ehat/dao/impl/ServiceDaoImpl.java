package com.hms.ehat.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.dto.ReqMasterDto;
import com.hms.ehat.dao.ServiceDao;
import com.hms.ehat.dto.ServiceMasterDto;


@Repository
public class ServiceDaoImpl implements ServiceDao {

	ServiceDao serviceDao;
	@Autowired
	SessionFactory sessionFactory;

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update Services
	@Override
	public int saveOrUpdateService(ServiceMasterDto serviceMaster,String iscomb,int sid) {
		int records=0;
		try {
			
			int serviceid= serviceMaster.getServiceId();
			if (serviceid > 0) {
				sessionFactory.getCurrentSession().merge(serviceMaster);
				
				//@author :Sagar kadam @date: 27-july-2017 @reason : To update subservice table for is combinattion
	 			Session session = sessionFactory.getCurrentSession();
				String hql = "UPDATE SubServiceDto set iscombination =:flag WHERE serviceId =:sid";
				Query query = session.createQuery(hql);
				query.setParameter("flag",iscomb);  
				query.setParameter("sid",sid);  
				query.executeUpdate();
				records = 1;
			} else {

			
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM ServiceMasterDto WHERE deleted='N' AND serviceName= :serviceName");
			bet.setParameter("serviceName", serviceMaster.getServiceName());
			long count =(Long) bet.uniqueResult();
			
			if (count==0) {

				sessionFactory.getCurrentSession().merge(serviceMaster);
				
				//@author :Sagar kadam @date: 27-july-2017 @reason : To update subservice table for is combinattion
	 			Session session = sessionFactory.getCurrentSession();
				String hql = "UPDATE SubServiceDto set iscombination =:flag WHERE serviceId =:sid";
				Query query = session.createQuery(hql);
				query.setParameter("flag",iscomb);  
				query.setParameter("sid",sid);  
				query.executeUpdate();
				records = 1;
			
				
			} else {
				records = 3;
			}
			
			}
			
 		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}

	//@author: Irfan Khan @date: 17-May-2017 @reason : Delete By serviceId
	@Override
	public Boolean deleteService(Integer serviceId, Integer userId) {

		ServiceMasterDto serviceMaster = (ServiceMasterDto) sessionFactory
				.getCurrentSession().get(ServiceMasterDto.class, serviceId);
		
		//Set values to coloumn to update
		serviceMaster.setDeleted("Y");
		serviceMaster.setDeletedBy(userId);
		serviceMaster.setDeletedDate(new Date(new java.util.Date().getTime()));

		return true;
	}

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Service List
	@Override
	public ServiceMasterDto getAllService() {

		ServiceMasterDto objService = new ServiceMasterDto();
		try {
			List<ServiceMasterDto> ltServiceMasters = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ServiceMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			ltServiceMasters = criteria.list();

			objService.setListService(ltServiceMasters);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objService;
	}

	//@author: Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search
	@Override
	public List<ServiceMasterDto> getAutoSuggestionServiceNames(String letter) {
		
		List<ServiceMasterDto> ltServiceMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ServiceMasterDto.class);
			
			//Restrictions in query
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("serviceId"));
			criteria.add(Restrictions.ilike("serviceName", letter+"%",MatchMode.START));
			
			ltServiceMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return ltServiceMasters;
	}

	@Override
	
	public Long getServiceCount() {
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(ServiceMasterDto.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();

	    System.err.println("count is" + count );
		return count;
	}
	
	/**
	 * @author Sagar @date 12_July_2017 this method is used to get  records
	 *         list from db
	 **/
	@Override
	public ServiceMasterDto getAllServiceByUserAccess(int userId) {
		ServiceMasterDto objService = new ServiceMasterDto();
		List<ServiceMasterDto> ltServiceMasters = null;
		 
		try {
			String servIds=null;
            String sql1="select service_id from users where User_ID="+userId+"";
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<Map<String, Object>> data1 = query1.list();
            
            for(Map<String, Object> row : data1){
                
                servIds=(String)row.get("service_id");
                
            }
             
             ArrayList<Integer> servIds11=new ArrayList<Integer>();
             String[] servIds1 = null;
             if(servIds.length()>0){
                
                servIds1=servIds.split(",");
                
                for(String id:servIds1){
                    
                    servIds11.add(Integer.parseInt(id));
                 }
            }        
             Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ServiceMasterDto.class);            
             criteria.add(Restrictions.eq("deleted", "N"));
            
             if(servIds11.size()!=0){
                 criteria.add(Restrictions.in("serviceId", servIds11));
             }
			
            ltServiceMasters = criteria.list();

			objService.setListService(ltServiceMasters);
			 
			} catch (Exception e) {
			e.printStackTrace();
			return objService;
		}
		return objService;
		}

	/**
	 * @author  Bilal
	 * @date    31-july-2017
	 * @code    for fetch service list is combination**/
	@Override
	public ServiceMasterDto fetchServiceListCom() {

		ServiceMasterDto objService = new ServiceMasterDto();
		try {
			List<ServiceMasterDto> ltServiceMasters = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ServiceMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("iscombination", "Y"));
			criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			ltServiceMasters = criteria.list();

			objService.setListService(ltServiceMasters);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objService;
	}

	/*----------------------------------------------------------_*/
	
	@Override
	public int saveOrUpdateReq(ReqMasterDto reqMasterDto, int reqId) {
		
		try {
			sessionFactory.getCurrentSession().merge(reqMasterDto);
			
			//@author :Sagar kadam @date: 27-july-2017 @reason : To update subservice table for is combinattion
 			Session session = sessionFactory.getCurrentSession();
			//String hql = "UPDATE SubServiceDto set iscombination =:flag WHERE serviceId =:sid";
			//Query query = session.createQuery(hql);
			//query.setParameter("flag",iscomb);  
			//query.setParameter("reqId",reqId);  
			//query.executeUpdate();
 		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}


	
	@Override
	public ReqMasterDto getAllReqByUserAccess(int userId) {
		ReqMasterDto objService = new ReqMasterDto();
		List<ReqMasterDto> ltReqMasters = null;
		 
		try {
			String servIds=null;
            String sql1="select service_id from users where User_ID="+userId+"";
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<Map<String, Object>> data1 = query1.list();
            
            for(Map<String, Object> row : data1){
                
                servIds=(String)row.get("service_id");
                
            }
             
             ArrayList<Integer> servIds11=new ArrayList<Integer>();
             String[] servIds1 = null;
             if(servIds.length()>0){
                
                servIds1=servIds.split(",");
                
                for(String id:servIds1){
                    
                    servIds11.add(Integer.parseInt(id));
                 }
            }        
             Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ServiceMasterDto.class);            
             criteria.add(Restrictions.eq("deleted", "N"));
            
             if(servIds11.size()!=0){
                 criteria.add(Restrictions.in("serviceId", servIds11));
             }
			
             ltReqMasters = criteria.list();

			objService.setListReq(ltReqMasters);
			 
			} catch (Exception e) {
			e.printStackTrace();
			return objService;
		}
		return objService;
		}

	
	
	@Override
	public ReqMasterDto fetchReqList() {

		ReqMasterDto objService = new ReqMasterDto();
		try {
			List<ReqMasterDto> ltReqMasters = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ReqMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("reqId"));
			//criteria.setMaxResults(10);
			ltReqMasters = criteria.list();

			objService.setListReq(ltReqMasters);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objService;
	}


	
	@Override
	public boolean deleteReqMaster(Integer reqId, Integer userId) {

		ReqMasterDto reqMasterDto = (ReqMasterDto) sessionFactory
				.getCurrentSession().get(ReqMasterDto.class, reqId);
		
		//Set values to coloumn to update
		reqMasterDto.setDeleted("Y");
		reqMasterDto.setDeletedBy(userId);
		reqMasterDto.setDeletedDate(new Date(new java.util.Date().getTime()));

		return true;
	}


	
	
	//@author: Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search
		@Override
		public List<ReqMasterDto> autoSuggestionReqMasterNames(String letter) {
			
			List<ReqMasterDto> ltReqMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ReqMasterDto.class);
				
				//Restrictions in query
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.addOrder(Order.desc("reqId"));
				criteria.add(Restrictions.ilike("reqName", letter+"%",MatchMode.START));
				
				ltReqMasters = criteria.list();

			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return ltReqMasters;
		}

	
		
		@Override
		
		public Long getreqCount() {
			Criteria crit = sessionFactory.getCurrentSession()
					.createCriteria(ReqMasterDto.class);
			crit.add(Restrictions.eq("deleted", "N"));
			crit.setProjection(Projections.rowCount());
			Long count = (Long)crit.uniqueResult();

		    System.err.println("count is" + count );
			return count;
		}
	
	@Override
		public List<CustomizeTemplate> getTemplateListByType(
				HttpServletRequest request, String value) {
			
			
			List<CustomizeTemplate> lstOTTemplate= new ArrayList<CustomizeTemplate>();
			String sql = "select idCustomizeTemplate,temp_name from customizetemplate where select_template_type='"+value+"'";

			Query otTemplate = sessionFactory.getCurrentSession().createSQLQuery(sql);
			otTemplate.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> otTemplateList= otTemplate.list();
			
			for (Map<String, Object> rs : otTemplateList) {
				CustomizeTemplate obj = new CustomizeTemplate();

				obj.setIdCustomizeTemplate((Integer) rs.get("idCustomizeTemplate"));
				obj.setTemp_name((String) rs.get("temp_name"));
				lstOTTemplate.add(obj);
			}
			
			return lstOTTemplate;
			
			}
}
