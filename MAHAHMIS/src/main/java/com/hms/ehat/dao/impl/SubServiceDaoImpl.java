package com.hms.ehat.dao.impl;

import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.SubServiceDao;
import com.hms.ehat.dto.EhatSubChargesView;
import com.hms.ehat.dto.EhatSubServiceview;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.service.LabService;
import com.hms.opdbill.dto.PatientHeaderInfoDto;

/**
 * @author Bilal
 * @date 26_May_2017
 * @code Dao implementation class for communicating with data base
 ***/
@SuppressWarnings("unchecked")
@Repository
public class SubServiceDaoImpl implements SubServiceDao {

	// @Bilal:- SessionFactory is define to get connection with db
	@Autowired
	SessionFactory sessionFactory;

	@Autowired LabService labService;
	
	// @Bilal:- ResourceBundle allows you to write programs that can:
	// be easily localized, or translated, into different languages
	// be easily modified later to support even more

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");
	Integer autoLimit = Integer.parseInt(autoLimitStr);

	String autoLimitservices = (String) resourceBundleEhat.getString("autoLimitservices");
	Integer listLimit = Integer.parseInt(autoLimitservices);
	
	String canteenid = (String) resourceBundleEhat.getString("canteenid");
	Integer canteenids = Integer.parseInt(canteenid);
	
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to save or update records in db
	 ***/
	@Override
	public int saveOrUpdateSubService(SubServiceDto subServiceDto,Integer hospitalUnitId) {
		int records=0;
		try {
			int subserviceid= subServiceDto.getSubId();
			if (subserviceid > 0) {
				ServiceMasterDto serviceobj = (ServiceMasterDto) sessionFactory
						.getCurrentSession().get(
								ServiceMasterDto.class,
								subServiceDto.getServiceId());
				subServiceDto.setIscombination(serviceobj.getIscombination());
				
				sessionFactory.getCurrentSession().merge(subServiceDto);
				
				//@author :Sagar kadam @date: 27-july-2017 @reason : To update subservice table for is combinattion
	 			/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ServiceMasterDto.class);
				criteria.setProjection(Projections.property("iscombination"));
				criteria.add(Restrictions.eq("serviceId", subServiceDto.getServiceId()));
					if(criteria.list().get(0)=="N"){
					
					}else{
					Session session = sessionFactory.getCurrentSession();
					String hql = "UPDATE SubServiceDto set iscombination =:flag WHERE serviceId =:sid";
					Query query = session.createQuery(hql);
					query.setParameter("flag",criteria.list().get(0));  
					query.setParameter("sid",subServiceDto.getServiceId());  
					query.executeUpdate();
					 		           
					}*/
					records =1;
			} else {

			
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM SubServiceDto WHERE deleted='N' AND categoryName= :categoryName AND serviceId= :serviceId");
			bet.setParameter("categoryName", subServiceDto.getCategoryName());
			bet.setParameter("serviceId", subServiceDto.getServiceId());
			long count =(Long) bet.uniqueResult();
			
			if (count==0) {
				ServiceMasterDto serviceobj = (ServiceMasterDto) sessionFactory
						.getCurrentSession().get(
								ServiceMasterDto.class,
								subServiceDto.getServiceId());
				subServiceDto.setIscombination(serviceobj.getIscombination());
				
			   sessionFactory.getCurrentSession().merge(subServiceDto);
			
			//@author :Sagar kadam @date: 27-july-2017 @reason : To update subservice table for is combinattion
 			/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ServiceMasterDto.class);
			criteria.setProjection(Projections.property("iscombination"));
			criteria.add(Restrictions.eq("serviceId", subServiceDto.getServiceId()));
				 if(criteria.list().get(0)=="N"){
				
				 }else{
				  Session session = sessionFactory.getCurrentSession();
				  String hql = "UPDATE SubServiceDto set iscombination =:flag WHERE serviceId =:sid";
				  Query query = session.createQuery(hql);
				  query.setParameter("flag",criteria.list().get(0));  
				  query.setParameter("sid",subServiceDto.getServiceId());  
				  query.executeUpdate();
				 		           
				 }*/
				 records =1;
			}else{
				records =3;
			}
		  
		 }
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}

	@Override
	public List<SubServiceDto> getSubService() {
		List<SubServiceDto> ltSubService =null;
		//List<UnitMasterDto> listUnits=(List<UnitMasterDto>) new UnitMasterDto();
		
			try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("subId"));
			criteria.setMaxResults(listLimit);
				ltSubService = criteria.list();
		
				//Added By Annapurna code For Fetch UnitName
			
				for (SubServiceDto subServiceDto : ltSubService) {
					
					Criteria cr = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class)
							.add(Restrictions.eq("unitId", subServiceDto.getHospitalUnitId())) .setProjection(Projections.projectionList()
						     // .add(Projections.property("hospitalUnitId"), "hospitalUnitId")
						      .add(Projections.property("unitName"), "unitName"))
						    .setResultTransformer(Transformers.aliasToBean(UnitMasterDto.class));

						  List<UnitMasterDto> list = cr.list();
						  System.out.println(subServiceDto.getSubId()+" "+ltSubService.size());
						  String unitName = list.get(0).getUnitName();
						  subServiceDto.setUnitName(unitName);
				}
	
	
				
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
	return ltSubService;
	}

	
	//@Override
	public List<SubServiceDto> getSubService1() {
	List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
	String sql="select  u.unit_name as unitName,es.category_name as categoryName,es.code_name as codeName ,es.charges  as charges,es.isCategory as isCategory from ehat_subservice es left join ehat_unit_master u on  u.unit_id=es.unit_id where es.deleted='N' ORDER BY es.ID DESC";
	try {
		Session session =sessionFactory.getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		List<Object[]> subServiceDetails = query.list();
		for (Object[] rs : subServiceDetails) {
			System.out.println("list>>"+rs.toString());
			SubServiceDto obj = new SubServiceDto();
			if(rs[0]!=null)
				obj.setUnitName(rs[0].toString());
			if(rs[0]!=null)
				obj.setCategoryname(rs[1].toString());
			if(rs[1]!=null)
				obj.setCodeName(rs[2].toString());
			if(rs[2]!=null)
				obj.setCharges(Double.parseDouble(rs[3].toString()));
			if(rs[3]!=null)
				obj.setIsCategory(rs[4].toString());
			ltSubService.add(obj);
		}
        	return ltSubService;		
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}

	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to get sub services
	 ***/
	@Override
	public List<SubServiceDto> getSubServiceCategory() {
		List<SubServiceDto> ltSubService = new ArrayList<>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.addOrder(Order.desc("subId"));

			List<SubServiceDto> list = criteria.list();

			for(SubServiceDto rs : list)
			{
				UnitMasterDto obj = (UnitMasterDto) sessionFactory.getCurrentSession().get(UnitMasterDto.class, rs.getHospitalUnitId());
				rs.setUnitName(obj.getUnitName());
				ltSubService.add(rs);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to delete records from db
	 ***/
	@Override
	public boolean deleteSubService(Integer subId, Integer userId) {
		boolean flag=false;
		try {
			
			//added by dayanand  to check this subservice id  is configured or not in pathology labprofile
			   String sql="select count(*) from pathology_labprofile where subservice_id="+subId+" and profileStatus='Y'  ";
			   SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			      int count= ((Number) q.uniqueResult()).intValue();
			    //end 
			if(count ==0) {
			SubServiceDto subService = (SubServiceDto) sessionFactory
					.getCurrentSession().get(SubServiceDto.class, subId);

			subService.setDeleted("Y");
			subService.setDeletedBy(userId);
			subService.setDeletedDate(new Date(new java.util.Date().getTime()));
			 flag=true;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return flag;
		}
		return flag;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to fetch auto suggestions of sub services
	 ***/
	@Override
	public List<SubServiceDto> getAutoSuggestionSubService(String letter, Integer masterId, Integer selfId) {
		List<SubServiceDto> ltSubService = null;
		try {
				/*Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.addOrder(Order.desc("subId"));
				criteria.add(Restrictions.like("categoryName", letter + "%"));
				criteria.setMaxResults(autoLimit);
				ltSubService = criteria.list();*/
				
				String sql2="SELECT id as subId,category_name as categoryName, code_name as codeName, service_id as serviceId, isCategory as isCategory, "
						   + " selfId as selfId, iscombination as iscombination, charges as charges, isModify as isModify, cgscode as cgscode, b2bCharges as b2bCharges, "
						   + " (select unit_name from ehat_unit_master where unit_id=s.unit_id) as unitName from ehat_subservice s where s.deleted='N' and s.isCategory='N' and category_name like '"+letter+"%' order by id desc limit "+autoLimit; 
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql2);
				getMaster.setResultTransformer(new AliasToBeanResultTransformer(SubServiceDto.class));
				ltSubService = getMaster.list();
			    			
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to fetch sub services
	 ***/
	@Override
	public List<SubServiceDto> getSubServiceById(Integer masterId,
			Integer selfId) {
		List<SubServiceDto> ltSubService = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));

			// conditions check with criteria for fetching proper list
			criteria.add(Restrictions.eq("serviceId", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));
			criteria.add(Restrictions.eq("isCategory", "Y"));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to fetch sub services
	 ***/
	@Override
	public List<SubServiceDto> getSubServiceIsCat(Integer masterId,
			Integer selfId) {
		List<SubServiceDto> ltSubService = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);

			// conditions check with criteria for fetching proper list

			if (selfId == 0) {
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("selfId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
			} else {

				// for all service
				List<SubServiceDto> ltSubService2 = null;
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria2.add(Restrictions.eq("deleted", "N"));
				criteria2.add(Restrictions.eq("isCategory", "N"));
				criteria2.add(Restrictions.eq("selfId", selfId));
				ltSubService2 = criteria2.list();

				// select catagories
				List<SubServiceDto> ltSubService3 = null;
				List<SubServiceDto> ltSubService4 = null;
				Criteria criteria3 = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria3.add(Restrictions.eq("deleted", "N"));
				criteria3.add(Restrictions.eq("isCategory", "Y"));
				criteria3.add(Restrictions.eq("selfId", selfId));
				ltSubService3 = criteria3.list();
				if (ltSubService3 != null) {
					if (ltSubService3.size() > 0) {
						List<Integer> ae2 = new ArrayList<Integer>();

						for (SubServiceDto integer : ltSubService3) {
							ae2.add(integer.getSubId());

						}
						// SELECT id FROM EhatEnterprise_nobel.ehat_subservice
						// where selfId in(22,23,24,35) and iscategory="N";

						Criteria criteria4 = sessionFactory.getCurrentSession()
								.createCriteria(SubServiceDto.class);
						criteria4.add(Restrictions.eq("deleted", "N"));
						criteria4.add(Restrictions.eq("isCategory", "N"));
						// criteria4.add(Restrictions.eq("selfId", selfId));
						criteria4.add(Restrictions.in("selfId", ae2));
						ltSubService4 = criteria4.list();

					}
				}
				List<Integer> ae = new ArrayList<Integer>();

				for (SubServiceDto integer : ltSubService2) {
					ae.add(integer.getSubId());

				}
				if (ltSubService4 != null) {
					for (SubServiceDto integer : ltSubService4) {
						ae.add(integer.getSubId());

					}
				}
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("serviceId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.in("subId", ae));
			}
			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to fetch all sub services
	 ***/
	@Override
	public List<SubServiceDto> getAllSubService() {
		List<SubServiceDto> ltSubService = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("subId"));
			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/********
	 * @author Touheed
	 * @base Fetching super master of service based on there id
	 * @since 1st-June-2017
	 ********/
	@Override
	public List<SubServiceDto> fetchSuperCatogoires(Integer serviceId) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();

		// Calling stored procedure
		Query query = sessionFactory.getCurrentSession()
				.createSQLQuery("CALL fetchSuperCatogoiresSubSrv (:serviceId)")
				.setParameter("serviceId", serviceId);
		String result = (String) query.uniqueResult();
		String[] ary = result.split(",");
		Double charges=0.0;

		// converting string object into Integer
		List<Integer> ae = new ArrayList<Integer>();
		for (int i = 0; i < ary.length; i++) {
			ae.add(Integer.parseInt(ary[i]));
		}

		// First checking the Lenth should be greater then zero
		if (ary.length > 0) {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			// criteria.addOrder(Order.desc("subId"));
			criteria.add(Restrictions.in("subId", ae));
			ltSubService = criteria.list();
			
		// Added by Vikas Godse for individual test Charges
			Query chargesSql = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT charges FROM ehat_subservice where id = (:serviceId)")
					.setParameter("serviceId", serviceId);
			charges = (Double) chargesSql.uniqueResult();
			
		}

		// getting the id of Service Master
		Query sql = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT service_id FROM	ehat_subservice where id = (:serviceId)")
				.setParameter("serviceId", serviceId);
		Integer serMstrId = (Integer) sql.uniqueResult();

		// Getting ServiceMasterDato pojo according get id above.
		ServiceMasterDto serviceMasterDto = (ServiceMasterDto) sessionFactory
				.getCurrentSession().get(ServiceMasterDto.class, serMstrId);
		// setting ServiceMasterDato as SubServiceDto because above list generic
		// is SubServiceDto
		SubServiceDto subDto = new SubServiceDto();
		subDto.setCategoryName(serviceMasterDto.getServiceName());
		subDto.setSubId(serviceMasterDto.getServiceId());
		subDto.setCharges(charges);
		// ltSubService.add(subDto);
		ltSubService.add(0, subDto);// adding at first position

		return ltSubService;
	}

	/**
	 * @author Bilal
	 * @date 08_JUN_2017
	 * @code for fetching all categories whose flag is Y
	 * **/
	@Override
	public List<SubServiceDto> getSubServiceCatY() {
		List<SubServiceDto> ltSubService = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "Y"));
			criteria.addOrder(Order.desc("subId"));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/**
	 * @author Bilal
	 * @date 08_JUN_2017
	 * @code for fetching all categories whose flag is N
	 * **/
	@Override
	public List<SubServiceDto> getSubServiceCatN() {
		List<SubServiceDto> ltSubService = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.addOrder(Order.desc("subId"));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to fetch sub services
	 ***/
	@Override
	public List<SubServiceDto> getSubServiceIsCatY(Integer masterId,
			Integer selfId) {
		List<SubServiceDto> ltSubService = null;
		System.err.println(">>>>>>>>>>>>>>>>>Self ID=>" + selfId
				+ ">>>>>>>>>>>>>>>>>Master ID=>" + masterId);
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));

			// conditions check with criteria for fetching proper list
			criteria.add(Restrictions.eq("serviceId", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));
			criteria.add(Restrictions.eq("isCategory", "Y"));
			
			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}
	
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code This method is used to return autosuggestion when we select the services from list 
	 * based on master id self id
	 ***/
	@Override
	public List<SubServiceDto> getSubServiceIsCatForSearch(Integer masterId,
			Integer selfId,String letter) {
		List<SubServiceDto> ltSubService = null;
		System.err.println(">>>>>>>>>>>>>>>>>Self ID=>" + selfId
				+ ">>>>>>>>>>>>>>>>>Master ID=>" + masterId);
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);

			// conditions check with criteria for fetching proper list

			if (selfId == 0) {
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("selfId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.like("categoryName", "%"+letter + "%"));
			} else {

				// for all service
				List<SubServiceDto> ltSubService2 = null;
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria2.add(Restrictions.eq("deleted", "N"));
				criteria2.add(Restrictions.eq("isCategory", "N"));
				criteria2.add(Restrictions.eq("selfId", selfId));
				criteria.add(Restrictions.like("categoryName",  "%"+letter + "%"));
				ltSubService2 = criteria2.list();

				// select catagories
				List<SubServiceDto> ltSubService3 = null;
				List<SubServiceDto> ltSubService4 = null;
				Criteria criteria3 = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria3.add(Restrictions.eq("deleted", "N"));
				criteria3.add(Restrictions.eq("isCategory", "Y"));
				criteria3.add(Restrictions.eq("selfId", selfId));
				criteria.add(Restrictions.like("categoryName", "%"+ letter + "%"));
				ltSubService3 = criteria3.list();
				if (ltSubService3 != null) {
					if (ltSubService3.size() > 0) {
						List<Integer> ae2 = new ArrayList<Integer>();

						for (SubServiceDto integer : ltSubService3) {
							ae2.add(integer.getSubId());

						}
						// SELECT id FROM EhatEnterprise_nobel.ehat_subservice
						// where selfId in(22,23,24,35) and iscategory="N";

						Criteria criteria4 = sessionFactory.getCurrentSession()
								.createCriteria(SubServiceDto.class);
						criteria4.add(Restrictions.eq("deleted", "N"));
						criteria4.add(Restrictions.eq("isCategory", "N"));
						// criteria4.add(Restrictions.eq("selfId", selfId));
						criteria4.add(Restrictions.in("selfId", ae2));
						criteria.add(Restrictions.like("categoryName", "%"+ letter + "%"));
						ltSubService4 = criteria4.list();

					}
				}
				List<Integer> ae = new ArrayList<Integer>();

				for (SubServiceDto integer : ltSubService2) {
					ae.add(integer.getSubId());

				}
				if (ltSubService4 != null) {
					for (SubServiceDto integer : ltSubService4) {
						ae.add(integer.getSubId());

					}
				}
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("serviceId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.in("subId", ae));
				criteria.add(Restrictions.like("categoryName",  "%"+letter + "%"));
			}
			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/**
	 * @author bilal
	 * @date 05-JULY-2017
	 * @code for auto suggestion sub service **/
	@Override
	public List<SubServiceDto> getAutoSuggestionSubServiceMaster(String letter) {
		
		List<SubServiceDto> ltSubService = null;
		try {
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				//criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.addOrder(Order.desc("subId"));
				criteria.add(Restrictions.like("categoryName", letter + "%"));

				criteria.setMaxResults(autoLimit);
				ltSubService = criteria.list();
				
				//Added By Annapurna code For Fetch UnitName
				
				for (SubServiceDto subServiceDto : ltSubService) {
					
					Criteria cr = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class)
							.add(Restrictions.eq("unitId", subServiceDto.getHospitalUnitId())) .setProjection(Projections.projectionList()
						     // .add(Projections.property("hospitalUnitId"), "hospitalUnitId")
						      .add(Projections.property("unitName"), "unitName"))
						    .setResultTransformer(Transformers.aliasToBean(UnitMasterDto.class));

						  List<UnitMasterDto> list = cr.list();
						  System.out.println(subServiceDto.getSubId()+" "+ltSubService.size());
						  String unitName = list.get(0).getUnitName();
						  subServiceDto.setUnitName(unitName);
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	@Override
	public Long getSubServiceCount() {
		
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(SubServiceDto.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();

	    System.err.println("count is" + count );
		return count;
	}

	/**
	 * @author bilal
	 * @date   31-JULY-2017
	 * @code   for is combination list of sub service **/
	@Override
	public List<SubServiceDto> getSubServiceByIdcom(Integer masterId,
			Integer selfId) {
		List<SubServiceDto> ltSubService = null;		

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("serviceId", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));
			//criteria.add(Restrictions.eq("isCategory", "N"));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	@Override
	public List<SubServiceDto> getAmountofService(Integer isComServlastId) {
		List<SubServiceDto> ltSubService = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("subId", isComServlastId));
			criteria.add(Restrictions.eq("isCategory", "N"));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}
	
	@Override
	@SuppressWarnings("null")	
	public List<SubServiceDto> getAmountofConfiguredPkg(Integer congiguredId) {
		
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();

		try {			
			Query chargesSql = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(distribute,0) FROM ehat_configuration_services where id="+congiguredId);
			double charges = (Double) chargesSql.uniqueResult();
			SubServiceDto obj = new SubServiceDto();
			obj.setCharges(charges);
			obj.setIscombination("Y");
			ltSubService.add(obj);
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}
	
	/******
	 * @author    :BILAL
	 * @Date      :01-02-2018
	 * @Code      :For Professional fees percentage master
	 * ******/
	@Override
	public List<SubServiceDto> getSubServicesFoprofees(Integer masterId,
			Integer selfId) {
		List<SubServiceDto> ltSubService = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("serviceId", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/******
	 * @author    :BILAL
	 * @Date      :01-02-2018
	 * @Code      :For import services throw excel 
	 * ******/
	@SuppressWarnings("rawtypes")
	@Override
	public int importservices(String file) {
		
		String filePath = file;
		int res =0;
		try {
			
			InputStream ExcelFileToRead = new FileInputStream(filePath);
			XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
			
			XSSFSheet sheet = wb.getSheetAt(0);
		    XSSFRow row;
		    
		    @SuppressWarnings("unused")
			XSSFCell cell;
			
			Iterator rows = sheet.rowIterator();
			
			if (rows.hasNext())
				rows.next();
			
 			while (rows.hasNext()) {
				
					row = (XSSFRow) rows.next();
					
					   @SuppressWarnings("unused")
						Iterator cells = row.cellIterator();
						XSSFCell serviceName = null;
						XSSFCell serviceCode = null;
						XSSFCell Iscombinations = null;
					 	
				
						serviceName = row.getCell(0);
						serviceCode = row.getCell(1);
						Iscombinations = row.getCell(2);
					    String Iscombination =Iscombinations.toString();
						int createdBy=1;
						String deleted="N";
						
						
						SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
						String date = dateFormat.format(new java.util.Date());
						
						try {
							if (row.getCell(0) != null && row.getCell(2) != null) {
								if (!Iscombination.equals("Y") || !Iscombination.equals("N")) {
									Iscombination = "N";
								}
								Query bet = sessionFactory.getCurrentSession().createQuery
										("SELECT count(*) FROM ServiceMasterDto WHERE deleted='N' AND serviceName= :serviceName");
								bet.setParameter("serviceName", serviceName.toString());
								long count =(Long) bet.uniqueResult();
								
								if (count == 0) {
									String query = 
											
											  "insert into ehat_service_master (created_by,created_date_time,deleted,service_code,service_name,iscombination) values('"+ createdBy + "' , '"+ date + "', '"+ deleted + "', '"+ serviceCode + "', '"+ serviceName + "', '"+ Iscombination + "')";
							         SQLQuery queryservice = sessionFactory.getCurrentSession().createSQLQuery(
									       query);
							         queryservice.executeUpdate();

								}
								
								
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
			}
			res =1;
		} catch (Exception e) {
			res =0;
			e.printStackTrace();
		}
		return res;
	}

	/******
	 * @author    :BILAL
	 * @Date      :01-02-2018
	 * @Code      :For import Sub services Master throw excel 
	 * ******/
	
	@SuppressWarnings("unused")
	@Override
	public int importSubservices(String file) {
	     
			String filePath = file;
			int res =0;
			try {
				InputStream ExcelFileToRead = new FileInputStream(filePath);
				XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
				
				XSSFSheet sheet = wb.getSheetAt(0);
			    XSSFRow row;
			    
				XSSFCell cell;

				@SuppressWarnings("rawtypes")
				Iterator rows = sheet.rowIterator();
				if (rows.hasNext())
					rows.next();
				
				while (rows.hasNext()) {
				   row = (XSSFRow) rows.next();

					@SuppressWarnings("rawtypes")
					Iterator cells = row.cellIterator();
					XSSFCell serviceNames = null;
					XSSFCell underservice = null;
					XSSFCell  subserviceName= null;
					XSSFCell  subservicecode= null;
					XSSFCell  cghsCode= null;
					XSSFCell  charges= null;
					XSSFCell  isCategory= null;
					XSSFCell  isModify= null;
			
					String serviceName = row.getCell(0).toString().trim();
					underservice = row.getCell(1);
					subserviceName = row.getCell(2);
					String categoryName =row.getCell(2).toString().trim();
					String underservices=row.getCell(1).toString().trim();
					
					subservicecode = row.getCell(3);
					cghsCode = row.getCell(4);
					charges = row.getCell(5);
					isCategory = row.getCell(6);
					isModify = row.getCell(7);
					
				    
					int createdBy=1;
					
					
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
					String date = dateFormat.format(new java.util.Date());
					
				try {
					if (row.getCell(0) != null && row.getCell(2) != null) {

						int serviceId = getmaxIdOfColumn("service_id",
								"ehat_service_master", "service_name",
								serviceName);
						int selfId =0;
						
						
						//if service id is zero then inserting into service master else inserting in sub
						if (serviceId == 0) {
							String Iscombination="N";
							String query = 
									
									  "insert into ehat_service_master (created_by,created_date_time,deleted,service_code,service_name,iscombination) values('"+ createdBy + "' , '"+ date + "', 'N', '"+ serviceName + "', '"+ serviceName + "', '"+ Iscombination + "')";
					         SQLQuery queryservice = sessionFactory.getCurrentSession().createSQLQuery(
							       query);
					         queryservice.executeUpdate();
					         
					         serviceId = getmaxIdOfColumn("service_id",
										"ehat_service_master", "service_name",
										serviceName);
						}
						
						//getting is combination flag from service master by using service id  
						String isCombination =labService.getStringValOfObject( "ehat_service_master", "iscombination",serviceId,"service_id");
						
						
						//if under service is empty or null or NO then it will insert directly under service as category or no category 
						if ( ! underservices.equals("NO") && ! underservices.equals("-") && ! underservices.equals("") &&  underservices != null) {
							
							//getting self id of under service name 
							selfId = getmaxIdOfColumn("id",
										"ehat_subservice", "category_name",
										underservices);
						   
							//if self id is zero then that under service will save in sub service table as category 
						   if (selfId == 0) {
							  String isCategoryForund="Y";
							  double chargesund =0;
							 
							  //calling method to save categories whose flag is Y 
							  int r= insertSubservdy( underservices,  createdBy,  date, isCategoryForund, selfId,
										 serviceId, chargesund, isModify, isCombination) ;
									
									selfId = getmaxIdOfColumn("id",
											"ehat_subservice", "category_name",
											underservices);
						   }
						}
						
						
						//if  service id is greater than zero than it will insert the leaf category may be its is category flag Y or N 
						if (serviceId > 0) {
							
							//checking duplicate service in sub service master 
							Query bet = sessionFactory
									.getCurrentSession()
									.createQuery(
											"SELECT count(*) FROM SubServiceDto WHERE deleted='N' AND categoryName= :categoryName AND serviceId= :serviceId");
							bet.setParameter("categoryName", categoryName);
							bet.setParameter("serviceId", serviceId);
							long count = (Long) bet.uniqueResult();
							
							//if count equals zero than service will insert 
							if (count == 0) {
								String query =

								"insert into ehat_subservice (category_name,code_name,created_by,created_date_time,deleted,isCategory,selfId,service_id,charges,isModify,iscombination,cgscode) values('"
										+ categoryName
										+ "' , '"
										+ subservicecode
										+ "', '"
										+ createdBy
										+ "', '"
										+ date
										+ "', '"
										+ 'N'
										+ "', '"
										+ isCategory 
										+ "', '" 
										+ selfId
										
										+ "', '" 
										+ serviceId
										
										+ "', '" 
										+ charges
										
										+ "', '" 
										+ isModify
										
										+ "', '" 
										+ isCombination
										
										+ "', '" 
										+ cghsCode

										+ "')";
								SQLQuery queryservice = sessionFactory
										.getCurrentSession().createSQLQuery(
												query);
								queryservice.executeUpdate();

							}
						}

					}
					res =1;
				} catch (Exception e) {
					    res =0;
						e.printStackTrace();
					}

				}
				res =1;
			} catch (Exception e) {
				res =0;
				e.printStackTrace();
			}
			return res;
		}

	/******
	 * @author    :BILAL
	 * @Date      :02-02-2018
	 * @Code      :For getting primary of column from any table dynamically  
	 * ******/
	public int getmaxIdOfColumn(String idname, String tableName,
			 String columnName, String columnValue) {
		
		
		Integer anyId =0;
		try {
			String queryser = "SELECT max("+idname+") FROM "+tableName+" where deleted='N' and "+columnName+"='"
					+ columnValue + "'";

			SQLQuery queryservice = sessionFactory.getCurrentSession().createSQLQuery(
					queryser);

			anyId = (Integer) queryservice
					.uniqueResult();
			if (anyId == null) {
				anyId =0;
			}
		} catch (Exception e) {
			
			anyId=0;
			e.printStackTrace();
		}
		
		return anyId;
	}
	
	/******
	 * @author    :BILAL
	 * @Date      :02-02-2018
	 * @Code      :For inserting under services   
	 * ******/
	public int insertSubservdy(String underservices, int createdBy, String date,String isCategoryForund,int selfId,
			int serviceId,double chargesund,XSSFCell isModify,String isCombination) {
		
		
		Integer anyId =0;
		try {
			String query =

					"insert into ehat_subservice (category_name,code_name,created_by,created_date_time,deleted,isCategory,selfId,service_id,charges,isModify,iscombination,cgscode) values('"
							+ underservices
							+ "' , '"
							+ underservices
							+ "', '"
							+ createdBy
							+ "', '"
							+ date
							+ "', '"
							+ 'N'
							+ "', '"
							+ isCategoryForund 
							+ "', '" 
							+ selfId
							
							+ "', '" 
							+ serviceId
							
							+ "', '" 
							+ chargesund
							
							+ "', '" 
							+ isModify
							
							+ "', '" 
							+ isCombination
							
							+ "', '" 
							+ underservices

							+ "')";
					SQLQuery queryservice = sessionFactory
							.getCurrentSession().createSQLQuery(
									query);
					queryservice.executeUpdate();
					
					anyId=1;
					
		} catch (Exception e) {
			
			anyId=0;
			e.printStackTrace();
		}
		
		return anyId;
	}
	/******
	 * @author    :BILAL
	 * @Date      :13-02-2018
	 * @Code      :For getting list of sub service from view 
	 * ******/
	@Override
	public List<EhatSubServiceview> subservicelistfromview() {
		List<EhatSubServiceview> ltSubService = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(EhatSubServiceview.class);
			

			/*criteria.addOrder(Order.desc("id"));
			criteria.setMaxResults(listLimit);*/
			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}
	/******
	 * @author    :BILAL
	 * @Date      :13-02-2018
	 * @Code      :For getting reports of sub service 
	 * ******/
	@Override
	public List<EhatSubServiceview> getpServiceDetailsDatareport(int masterId,
			int selfId) {
		List<EhatSubServiceview> ltSubService = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(EhatSubServiceview.class);

			
			if (selfId == 0) {
				
				criteria.add(Restrictions.eq("serviceId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
			} else {

				// for all service
				List<EhatSubServiceview> ltSubService2 = null;
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(EhatSubServiceview.class);
				
				criteria2.add(Restrictions.eq("isCategory", "N"));
				criteria2.add(Restrictions.eq("selfId", selfId));
				ltSubService2 = criteria2.list();

				// select categories
				List<EhatSubServiceview> ltSubService3 = null;
				List<EhatSubServiceview> ltSubService4 = null;
				
				Criteria criteria3 = sessionFactory.getCurrentSession()
						.createCriteria(EhatSubServiceview.class);
				
				criteria3.add(Restrictions.eq("isCategory", "Y"));
				criteria3.add(Restrictions.eq("selfId", selfId));
				ltSubService3 = criteria3.list();
				if (ltSubService3 != null) {
					if (ltSubService3.size() > 0) {
						List<Integer> ae2 = new ArrayList<Integer>();

						for (EhatSubServiceview integer : ltSubService3) {
							ae2.add(integer.getId());

						}
						// SELECT id FROM EhatEnterprise_nobel.ehat_subservice
						// where selfId in(22,23,24,35) and 

						Criteria criteria4 = sessionFactory.getCurrentSession()
								.createCriteria(EhatSubServiceview.class);
						
						criteria4.add(Restrictions.eq("isCategory", "N"));
						
						criteria4.add(Restrictions.in("selfId", ae2));
						ltSubService4 = criteria4.list();

					}
				}
				List<Integer> ae = new ArrayList<Integer>();

				for (EhatSubServiceview integer : ltSubService2) {
					ae.add(integer.getId());

				}
				if (ltSubService4 != null) {
					for (EhatSubServiceview integer : ltSubService4) {
						ae.add(integer.getId());

					}
				}
				
				criteria.add(Restrictions.eq("serviceId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.in("id", ae));
			}
			ltSubService = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}
	/******
	 * @author    :BILAL
	 * @Date      :13-02-2018
	 * @Code      :For getting reports of sub charges 
	 * ******/
	@Override
	public List<EhatSubChargesView> getpChargesDetailsDatareport(int masterId,
			int selfId) {
		List<EhatSubChargesView> ltSubService = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(EhatSubChargesView.class);

			
			if (selfId == 0) {
				
				criteria.add(Restrictions.eq("serviceId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
			} else {

				// for all service
				List<EhatSubChargesView> ltSubService2 = null;
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(EhatSubChargesView.class);
				
				criteria2.add(Restrictions.eq("isCategory", "N"));
				criteria2.add(Restrictions.eq("selfId", selfId));
				ltSubService2 = criteria2.list();

				// select categories
				List<EhatSubChargesView> ltSubService3 = null;
				List<EhatSubChargesView> ltSubService4 = null;
				
				Criteria criteria3 = sessionFactory.getCurrentSession()
						.createCriteria(EhatSubChargesView.class);
				
				criteria3.add(Restrictions.eq("isCategory", "Y"));
				criteria3.add(Restrictions.eq("selfId", selfId));
				ltSubService3 = criteria3.list();
				if (ltSubService3 != null) {
					if (ltSubService3.size() > 0) {
						List<Integer> ae2 = new ArrayList<Integer>();

						for (EhatSubChargesView integer : ltSubService3) {
							ae2.add(integer.getId());

						}
						// SELECT id FROM EhatEnterprise_nobel.ehat_subservice
						// where selfId in(22,23,24,35) and 

						Criteria criteria4 = sessionFactory.getCurrentSession()
								.createCriteria(EhatSubChargesView.class);
						
						criteria4.add(Restrictions.eq("isCategory", "N"));
						
						criteria4.add(Restrictions.in("selfId", ae2));
						ltSubService4 = criteria4.list();

					}
				}
				List<Integer> ae = new ArrayList<Integer>();

				for (EhatSubChargesView integer : ltSubService2) {
					ae.add(integer.getId());

				}
				if (ltSubService4 != null) {
					for (EhatSubChargesView integer : ltSubService4) {
						ae.add(integer.getId());

					}
				}
				
				criteria.add(Restrictions.eq("serviceId", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.in("id", ae));
			}
			ltSubService = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/******
	 * @author    :BILAL
	 * @Date      :17-03-2018
	 * @Code      :For getting reports of sub charges 
	 * ******/
	@Override
	public List<SubServiceDto> fetchsup(Integer serviceId) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();

		// Calling stored procedure
		Query query = sessionFactory.getCurrentSession()
				.createSQLQuery("CALL fetchSuperCatogoiresSubSrv (:serviceId)")
				.setParameter("serviceId", serviceId);
		String result = (String) query.uniqueResult();
		String[] ary = result.split(",");

		// converting string object into Integer
		List<Integer> ae = new ArrayList<Integer>();
		for (int i = 0; i < ary.length; i++) {
			ae.add(Integer.parseInt(ary[i]));
		}
		ae.add(serviceId);
		
		// First checking the Lenth should be greater then zero
		if (ary.length > 0) {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			
			criteria.add(Restrictions.in("subId", ae));
			ltSubService = criteria.list();
			//System.err.println("Size of list" + ltSubService.size());
		}

		// getting the id of Service Master
		Query sql = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT service_id FROM	ehat_subservice where id = (:serviceId)")
				.setParameter("serviceId", serviceId);
		Integer serMstrId = (Integer) sql.uniqueResult();

		// Getting ServiceMasterDato pojo according get id above.
		ServiceMasterDto serviceMasterDto = (ServiceMasterDto) sessionFactory
				.getCurrentSession().get(ServiceMasterDto.class, serMstrId);
		// setting ServiceMasterDato as SubServiceDto because above list generic
		// is SubServiceDto
		SubServiceDto subDto = new SubServiceDto();
		subDto.setCategoryName(serviceMasterDto.getServiceName());
		subDto.setSubId(serviceMasterDto.getServiceId());
		
		ltSubService.add(0, subDto);// adding at first position

		return ltSubService;
	}

	@Override
	public List<SubServiceDto> getcateenservices(String letter) {
		
		List<SubServiceDto> ltSubService = null;
		
		try {
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.eq("serviceId", canteenids));
				
				criteria.add(Restrictions.like("categoryName", letter + "%"));

				ltSubService = criteria.list();
				
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	@Override
	public List<SubServiceDto> getcateenservicesbycode(String letter) {
		
		List<SubServiceDto> ltSubService = null;
		
		try {
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(SubServiceDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.eq("serviceId", canteenids));
				
				criteria.add(Restrictions.like("codeName", letter + "%"));

				
				ltSubService = criteria.list();
				
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	
	//ADDED BY JAGRUTI
	@Override
	public List<SubServiceDto> getSubServiceByUnitId(Integer masterId,
			Integer selfId ,Integer unitId) {
		List<SubServiceDto> ltSubService = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("serviceId", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));
			criteria.add(Restrictions.eq("hospitalUnitId", unitId));
			criteria.add(Restrictions.eq("isCategory", "N"));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	/******
	 * @author    :Rahul Patil
	 * @Code      :For getting multiple SubserviceList 
	 * ******/
	@Override
	public List<SubServiceDto> getmultipleSubservice(String masterId, Integer selfId) {
		List<SubServiceDto> ltSubService = null;
		// List<String> deletedValues = Arrays.asList(masterId) ;
		try {

			String sql = "";
			if (selfId == 0) {
				sql = "select * from ehat_subservice where deleted='N' and isCategory='N' and selfId in ("+masterId+") ";
			}
			SQLQuery createSQLQuery = sessionFactory.openSession().createSQLQuery(sql);
			createSQLQuery.addEntity(SubServiceDto.class);
			ltSubService = createSQLQuery.list();
			// ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}
}


