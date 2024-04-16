package com.hms.ehat.dao.impl;


import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;


import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.AutosuggestionConfDto;
import com.hms.ehat.dao.AutosuggestionDao;
import com.hms.ehat.dto.AutosugConfigDto;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DemographicPatientDto;
import com.hms.ehat.dto.DeptMasterDto;

import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.ehat.dto.SubServiceDto;

@SuppressWarnings("unchecked")
@Repository
public class AutosuggestionDaoImpl implements AutosuggestionDao
{
	@Autowired
	SessionFactory sessionFactory;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");
	Integer autoLimit = Integer.parseInt(autoLimitStr);
	
	@Override
	public List<SubServiceDto> getlistSubService(String callform) {
		
		List<SubServiceDto> ltSubService= null;
		try {
		    Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("subId"));
			criteria.add(Restrictions.eq("isCategory", "N"));
            criteria.add(Restrictions.like("categoryName",callform + "%"));

		//	criteria.setMaxResults(10);
			ltSubService = criteria.list();
	
		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}
	@Override
	public List<AutosugeestionDto> getlistService(String findingName, Integer unit, String unitlist, Integer depdocdeskid, String querytype,Integer serviceid,int userId) {
		List<AutosugeestionDto> ltSubService=new ArrayList<AutosugeestionDto>();
		List<Integer> ltSubService1= new ArrayList<Integer>();
 		UnitMasterDto ltUnitMasters = null;
 		System.err.println(ltSubService1+""+ltUnitMasters);
 	//	ltUnitMasters=getUnitDeptServiceByUserId(userId);
		try {
			 if(querytype.equalsIgnoreCase("operation")){
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AutosugeestionDto.class);
				criteria.add(Restrictions.eq("categorydeleted", "N"));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.eq("servicdeleted", "N"));
				criteria.add(Restrictions.eq("unitid", unit));
				criteria.add(Restrictions.eq("serviceid", serviceid));
				criteria.add(Restrictions.eq("dept_id", depdocdeskid));
				criteria.add(Restrictions.like("categoryName", "%"+findingName+"%"));
				criteria.setMaxResults(15);
				ltSubService = criteria.list();
			 }else{
 					if(unit==0){
						String[] ary = unitlist.split(",");
						for (int i = 0; i < ary.length; i++) {
				
						Query bet = sessionFactory.getCurrentSession().createQuery
								("FROM AutosugeestionDto WHERE  categorydeleted='N' AND isCategory='N' AND  servicdeleted='N' AND categoryName like :cnm  group by categoryid");
 						bet.setParameter("cnm","%"+findingName+"%"); 
 						ltSubService=bet.list();
 						
						}
 					}else {
						 
			//unit list by user  
						ArrayList<Integer> servIds11=new ArrayList<Integer>();
						String uIds=null;
			            String[] uIds1 = null;
			            String sql1="select IFEMPTY(unitmaster_id, '0') as unitmaster_id from users where User_ID="+userId+"";  
			            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			             List<Map<String, Object>> data1 = query1.list();
 			            // System.err.println("unit list length-------ss-----"+query1.list().size());
			             for(Map<String, Object> row : data1){
			                 uIds=(String)row.get("unitmaster_id");
			             }
			             //  System.err.println("unit list  -----ss------"+uIds);
			             if(uIds.length()>0){
			                 uIds1=uIds.split(",");
			                 for(String id:uIds1){
			                     servIds11.add(Integer.parseInt(id));
			                 }
			             }        
					
			  //dept  list by user
		                 	ArrayList<Integer> dIds11=new ArrayList<Integer>();
		                  	String[] dIds1 = null;
		        			String dIds=null;
		                    String sql3="select IFEMPTY(dept_id, '0') as dept_id  from users where User_ID="+userId+"";
		                    SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
		                    query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		                    List<Map<String, Object>> data3 = query3.list();
		                    //System.err.println("dept list length------------"+query3.list().size());
 		                    if(query3.list().isEmpty()){} else{
		                        for(Map<String, Object> row : data3){
		                        	dIds=(String)row.get("dept_id");
		                         }
		                       // System.err.println("dept list length arr------------"+dIds);
		                          if(dIds.length()>0 && dIds!=null){
		                        	  dIds1=dIds.split(",");
		                             for(String id:dIds1){
		                            	 dIds11.add(Integer.parseInt(id));
		                             }
		                        } 
		                    }
		                          
			    //service  list by user
			              	ArrayList<Integer> sIds11=new ArrayList<Integer>();
			              	String[] servIds1 = null;
			     			String servIds2=null;
			                String sql2="select IFEMPTY(service_id, '0') as service_id from users where User_ID="+userId+"";
			                SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
			                query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			                List<Map<String, Object>> data2 = query2.list();
			               // System.err.println("dept list length------sk------"+query2.list().get(0));
 			                 if(query2.list().isEmpty()){} else{
			                for(Map<String, Object> row : data2){
			                     servIds2=(String)row.get("service_id");
			                 }
			              //  System.err.println("service list length arr------------"+servIds2.length());
			                  if(servIds2.length()>0){
			                     servIds1=servIds2.split(",");
			                     for(String id:servIds1){
			                         sIds11.add(Integer.parseInt(id));
			                     }
			                }  
			                 }
						//System.err.println("in else loop....................................................");
						Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AutosugeestionDto.class);
  						 criteria.add(Restrictions.eq("categorydeleted", "N"));
						 criteria.add(Restrictions.eq("isCategory", "N"));
						 criteria.add(Restrictions.eq("servicdeleted", "N"));
						 criteria.add(Restrictions.in("unitid",servIds11));
						 criteria.add(Restrictions.in("dept_id",dIds11)); 
					    criteria.add(Restrictions.in("serviceid",sIds11));
						 if(serviceid>0){
							 criteria.add(Restrictions.eq("serviceid", serviceid));
						 }
						 criteria.add(Restrictions.eq("dept_id", depdocdeskid));
 						 criteria.add(Restrictions.eq("unitid", unit));
 						 criteria.add(Restrictions.like("categoryName","%"+findingName+"%")); 						
 						 criteria.setMaxResults(15);
			            ltSubService = criteria.list();
			           /* for (AutosugeestionDto r : ltSubService) {
			    			
			    			System.err.println("sname============================>"+r.getCategoryName());
			    		}*/
					}
			}
			 
			 if(findingName.equalsIgnoreCase("b") || findingName.equalsIgnoreCase("be") || findingName.equalsIgnoreCase("bed")){
					//AutosuggestionConfDto autosugeestionDto1 = new AutosuggestionConfDto();
					AutosugeestionDto ltSubService12=new AutosugeestionDto();
					ltSubService12.setServiceName("Bed");
					ltSubService12.setCategoryName("Bed");
					ltSubService12.setServiceid(3);
					ltSubService12.setCategoryid(-1);
					ltSubService12.setCategorycharges(0.0);
					ltSubService.add(ltSubService12);
				}
			 if(findingName.equalsIgnoreCase("n") || findingName.equalsIgnoreCase("nu") || 
					 findingName.equalsIgnoreCase("nur") || findingName.equalsIgnoreCase("nurs") ||
					 findingName.equalsIgnoreCase("nursi") || findingName.equalsIgnoreCase("nursin") ||
					 findingName.equalsIgnoreCase("nursing")){
					//AutosuggestionConfDto autosugeestionDto1 = new AutosuggestionConfDto();
					AutosugeestionDto ltSubService123=new AutosugeestionDto();
					ltSubService123.setServiceName("Bed");
					ltSubService123.setCategoryName("Nursing Charges");
					ltSubService123.setServiceid(3);
					ltSubService123.setCategoryid(-2);
					ltSubService123.setCategorycharges(0.0);
					ltSubService.add(ltSubService123);
				}
	
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		//System.err.println("Size======================================================>"+ltSubService.size());
		
		
		return ltSubService;
	}
	

	/**
	 * @author Bilal
	 * @Date 22-JUN-2017
	 * @code For auto suggestion from configuration charges 
	 * ***/

	@Override
	public List<AutosugConfigDto> getallchargesConfig(String findingName,
			HttpServletRequest request, int sponsorId, int chargesSlaveId, String sponsortabcall,
			int hallId, int hallSlaveId, int treatId) {
		List<AutosugConfigDto> ltchargesConf = null;
		//List<AutosuggestionConfDto> ltchargesConf = null;
		
		@SuppressWarnings("unused")
		List<AutosuggestionConfDto> ltSubService= new ArrayList<AutosuggestionConfDto>();
		int isComServId=0;
		int isComServlastId=0;
		
		HttpSession session = request.getSession();
		int userId = (Integer) session.getAttribute("userId1");
		
		try {
			int has =0 ;
			if (hallId > 0) {
				/*//get hall id from hall table
				Query hallNameID = sessionFactory.getCurrentSession().createSQLQuery("SELECT bd.Hall_ID from treatment_beds tb,beds bd where bd.Bed_ID=tb.Bed_ID and tb.Treatment_ID="+treatId+"");
				int hsid =(Integer) hallNameID.uniqueResult();
				
				//get hall slave id from hall table
				Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
						"select ehat_hallid from hall where Hall_ID="
								+ hsid);

				has =(Integer) hallType.uniqueResult();*/
				Query bedID = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT sub_service_id FROM ehat_bill_details_ipd where on_bed_flag='Y' and  treatment_id="
										+ treatId + "");
				int hsid = (Integer) bedID.uniqueResult();

				// get hall slave id from hall table
				Query hallType = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"SELECT hall.ehat_hallid FROM ehat_bill_details_ipd INNER JOIN beds ON ehat_bill_details_ipd.sub_service_id=beds.Bed_ID INNER JOIN hall on hall.Hall_ID = beds.Hall_ID where  ehat_bill_details_ipd.sub_service_id="
										+ hsid);

				has = (Integer) hallType.uniqueResult();
			}
			
			
			//array list to add in operator with criteria fro charges slav id
			ArrayList<Integer> masterChecked=new ArrayList<Integer>();			
			masterChecked.add(chargesSlaveId);
			masterChecked.add(0);
			
			//array list to add in operator with criteria for sponsor id
			ArrayList<Integer> sponsorChk=new ArrayList<Integer>();			
			sponsorChk.add(sponsorId);
			sponsorChk.add(0);
			
			//array list to add in operator with criteria fro charges slav id
			ArrayList<Integer> hallIdIn=new ArrayList<Integer>();			
			hallIdIn.add(hallId);
			hallIdIn.add(0);
				
			//array list to add in operator with criteria for sponsor id
			ArrayList<Integer> hallSlaveIdIn=new ArrayList<Integer>();			
			hallSlaveIdIn.add(has);
			hallSlaveIdIn.add(0);
			
			//array list to add in operator with criteria for combination id
			ArrayList<Integer> isComServIdIn=new ArrayList<Integer>();			
			isComServIdIn.add(isComServId);
			isComServIdIn.add(0);
			
			//array list to add in operator with criteria for combination slave id
			ArrayList<Integer> isComServlastIdIn=new ArrayList<Integer>();			
			isComServlastIdIn.add(isComServlastId);
			isComServlastIdIn.add(0);
			
			// services list
			ArrayList<Integer> sIds11 = new ArrayList<Integer>();
			String[] servIds1 = null;
			String servIds2 = null;
			String sql2 = "select IFEMPTY(service_id, '0') as service_id from users where User_ID="
					+ userId + "";
			SQLQuery query2 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql2);
			query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
			List<Map<String, Object>> data2 = query2.list();

			if (query2.list().isEmpty()) {

			} else {
				for (Map<String, Object> row : data2) {
					servIds2 = (String) row.get("service_id");
				}

				if (servIds2.length() > 0) {
					servIds1 = servIds2.split(",");
					for (String id : servIds1) {
						sIds11.add(Integer.parseInt(id));
					}
				}

				// unit list by user
				ArrayList<Integer> servIds11 = new ArrayList<Integer>();
				String uIds = null;
				String[] uIds1 = null;
				String sql1 = "select IFEMPTY(unitmaster_id, '0') as unitmaster_id from users where User_ID="
						+ userId + "";
				SQLQuery query1 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql1);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data1 = query1.list();

				for (Map<String, Object> row : data1) {
					uIds = (String) row.get("unitmaster_id");
				}

				if (uIds.length() > 0) {
					uIds1 = uIds.split(",");
					for (String id : uIds1) {
						servIds11.add(Integer.parseInt(id));
					}
				}

				// department list by user
				ArrayList<Integer> dIds11 = new ArrayList<Integer>();
				String[] dIds1 = null;
				String dIds = null;
				String sql3 = "select IFEMPTY(dept_id, '0') as dept_id  from users where User_ID="
						+ userId + "";
				SQLQuery query3 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql3);
				query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data3 = query3.list();

				if (query3.list().isEmpty()) {
				} else {
					for (Map<String, Object> row : data3) {
						dIds = (String) row.get("dept_id");
					}

					if (dIds.length() > 0 && dIds != null) {
						dIds1 = dIds.split(",");
						for (String id : dIds1) {
							dIds11.add(Integer.parseInt(id));
						}
					}
				}
				//criteria.add(Restrictions.eq("categoryDeleted", "N"));
				/*Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(AutosugConfigDto.class);
				
			
				criteria.add(Restrictions.in("sponsorId", sponsorChk));
				criteria.add(Restrictions.in("chargesSlaveId", masterChecked));

				criteria.add(Restrictions.in("hallId", hallIdIn));
				criteria.add(Restrictions.in("hallSlaveId", hallSlaveIdIn));

				criteria.add(Restrictions.in("isComServId", isComServIdIn));
				criteria.add(Restrictions.in("isComServlastId",
						isComServlastIdIn));
				criteria.add(Restrictions.in("serviceId", sIds11));
				criteria.add(Restrictions.in("unitId", servIds11));
				criteria.add(Restrictions.in("deptId", dIds11));
				
				criteria.add(Restrictions.like("subServiceName", findingName
						+ "%"));
						ltchargesConf = criteria.list();
				*/
				
				
				Query bet = sessionFactory.getCurrentSession().createQuery
						("FROM AutosugConfigDto WHERE sponsorId in (:sponsorId) AND chargesSlaveId in (:chargesSlaveId) AND hallId in (:hallId) AND hallSlaveId in (:hallSlaveId) AND isComServId in (:isComServId) AND isComServlastId in (:isComServlastId) AND unitId in (:unitid) AND deptId in (:dept_id) AND serviceId in (:serviceid)  AND subServiceName like :cnm  group by subServiceId");
				
				
				bet.setParameterList("sponsorId",sponsorChk); 
				bet.setParameterList("chargesSlaveId",masterChecked); 
				bet.setParameterList("hallId",hallIdIn); 
				bet.setParameterList("hallSlaveId",hallSlaveIdIn); 
				bet.setParameterList("isComServId",isComServIdIn); 
				bet.setParameterList("isComServlastId",isComServlastIdIn);
				
				bet.setParameterList("unitid",servIds11); 
				bet.setParameterList("dept_id",dIds11); 
				bet.setParameterList("serviceid",sIds11); 
				
				 
				
				bet.setParameter("cnm",findingName+"%"); 
				ltchargesConf=bet.list();

			    
              }
		} catch (Exception e) {
			e.printStackTrace();
			return ltchargesConf;
		}
		return ltchargesConf;
	}
	
	/**
	 * @author Bilal
	 * @Date 28-JUN-2017
	 * @code For auto suggestion from configuration charges for IPD
	 * ***/
	@Override
	public List<AutosugConfigDto> getallchargesConfigForIPD(String findingName,
			HttpServletRequest request, int sponsorId, int chargesSlaveId,
			int hallId, int hallSlaveId) {
		List<AutosugConfigDto> ltchargesConf = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(AutosugConfigDto.class);
			criteria.add(Restrictions.like("subServiceName", findingName + "%"));
			ltchargesConf = criteria.list();
			/*if (hallSlaveId == 0 ) {
				criteria.add(Restrictions.like("subServiceName", findingName + "%"));
			//	criteria.add(Restrictions.eq("hallId", hallId));
				criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));

				ltchargesConf = criteria.list();
			} else {
				criteria.add(Restrictions.like("subServiceName", findingName + "%"));
				//criteria.add(Restrictions.eq("hallId", hallId));
				criteria.add(Restrictions.eq("hallSlaveId", hallSlaveId));

				ltchargesConf = criteria.list();
			}*/
			

		} catch (Exception e) {
			e.printStackTrace();
			return ltchargesConf;
		}
		return ltchargesConf;
	}
	 

	public  UnitMasterDto  getUnitDeptServiceByUserId(int userId) {
 		List<UnitMasterDto> ltUnitMasters = null;
	    List<ServiceMasterDto> ltServiceMasters = null;
	    List<DeptMasterDto> ltDeptMasters = null;
	    UnitMasterDto uobj = new UnitMasterDto();
 				 
		try {
			//unit list by user  
			ArrayList<Integer> servIds11=new ArrayList<Integer>();
			String uIds=null;
            String[] uIds1 = null;
            String sql1="select unitmaster_id from users where User_ID="+userId+"";  
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
             List<Map<String, Object>> data1 = query1.list();

             System.err.println("unit list length-------ss-----"+query1.list().size());
             for(Map<String, Object> row : data1){
                 uIds=(String)row.get("unitmaster_id");
             }
            System.err.println("unit list length arr-----ss------"+uIds.length());
             if(uIds.length()>1){
                 uIds1=uIds.split(",");
                 for(String id:uIds1){
                     servIds11.add(Integer.parseInt(id));
                 }
             }        
              Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class);            
              criteria.setProjection(Projections.property("unitId"));
              criteria.add(Restrictions.eq("deleted", "N"));
              if(servIds11.size()!=0){
                criteria.add(Restrictions.in("unitId", servIds11));
             }
              ltUnitMasters = criteria.list();
              uobj.setLstUnit(ltUnitMasters);
              
  			//service  list by user
              	ArrayList<Integer> sIds11=new ArrayList<Integer>();
              	String[] servIds1 = null;
     			String servIds2=null;
                String sql2="select service_id from users where User_ID="+userId+"";
                SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
                query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                List<Map<String, Object>> data2 = query2.list();
                System.err.println("dept list length------sk------"+query2.list().get(0));

                System.err.println("service list length------ss------"+query2.list().size());
                 if(query2.list().isEmpty()){} else{
                for(Map<String, Object> row : data2){
                     servIds2=(String)row.get("service_id");
                 }
                System.err.println("service list length arr------------"+servIds2.length());
                  if(servIds2.length()>1){
                     servIds1=servIds2.split(",");
                     for(String id:servIds1){
                         sIds11.add(Integer.parseInt(id));
                     }
                }        
                 Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(ServiceMasterDto.class);            
                 criteria2.setProjection(Projections.property("serviceId"));
                  criteria2.add(Restrictions.eq("deleted", "N"));
                  if(sIds11.size()!=0){
                     criteria2.add(Restrictions.in("serviceId", sIds11));
                 }
                 ltServiceMasters = criteria2.list();
                uobj.setListService(ltServiceMasters);
                 }
                 
       			//dept  list by user
                 	ArrayList<Integer> dIds11=new ArrayList<Integer>();
                  	String[] dIds1 = null;
        			String dIds=null;
                    String sql3="select dept_id from users where User_ID="+userId+"";
                    SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
                    query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                    List<Map<String, Object>> data3 = query3.list();
                    System.err.println("dept list length------------"+query3.list().get(0));
                    
                    if(query3.list().isEmpty()){} else{
                        for(Map<String, Object> row : data3){
                        	dIds=(String)row.get("dept_id");
                         }
                        System.err.println("service list length arr------------"+dIds.length());
                          if(dIds.length()>1){
                        	  dIds1=dIds.split(",");
                             for(String id:dIds1){
                            	 dIds11.add(Integer.parseInt(id));
                             }
                        }     
                     Criteria criteria3 = sessionFactory.getCurrentSession().createCriteria(DeptMasterDto.class);  
                    criteria3.setProjection(Projections.property("deptId"));
                     criteria3.add(Restrictions.eq("deleted", "N"));
                    if(dIds11.size()!=0){
                         criteria3.add(Restrictions.in("deptId", dIds11));
                     }
                     ltDeptMasters = criteria3.list();
                     uobj.setLstDepts(ltDeptMasters);
                    }
                    
			} catch (Exception e) {
			e.printStackTrace();
			return uobj;
		}
		return uobj;
		}
/**
 * @author :Bilal
 * @date   :27-july-2017
 * @code   :for auto suggetion for configuration**/

@Override
public List<AutosuggestionConfDto> getallservicesConf(String findingName,
		Integer unit, String unitlist, Integer depdocdeskid,
		String querytype, Integer serviceid, int sponsorId, int chargesSlaveId,int userId,
		 int hallId, int hallSlaveId) {
	int isComServId=0;
	int isComServlastId=0;
	 
	//array list to add in operator with criteria fro charges slav id
	ArrayList<Integer> masterChecked=new ArrayList<Integer>();			
	masterChecked.add(chargesSlaveId);
	masterChecked.add(0);
	
	//array list to add in operator with criteria for sponsor id
	ArrayList<Integer> sponsorChk=new ArrayList<Integer>();			
	sponsorChk.add(sponsorId);
	sponsorChk.add(0);
	
	//array list to add in operator with criteria fro charges slav id
	ArrayList<Integer> hallIdIn=new ArrayList<Integer>();			
	hallIdIn.add(hallId);
	hallIdIn.add(0);
		
	//array list to add in operator with criteria for sponsor id
	ArrayList<Integer> hallSlaveIdIn=new ArrayList<Integer>();			
	hallSlaveIdIn.add(hallSlaveId);
	hallSlaveIdIn.add(0);
	
	//array list to add in operator with criteria for combination id
	ArrayList<Integer> isComServIdIn=new ArrayList<Integer>();			
	isComServIdIn.add(isComServId);
	isComServIdIn.add(0);
	
	//array list to add in operator with criteria for combination slave id
	ArrayList<Integer> isComServlastIdIn=new ArrayList<Integer>();			
	isComServlastIdIn.add(isComServlastId);
	isComServlastIdIn.add(0);
	 
	//declaring list for auto suggestion 
	List<AutosuggestionConfDto> ltSubService= new ArrayList<AutosuggestionConfDto>();
	List<Integer> ltSubService1= new ArrayList<Integer>();
	AutosuggestionConfDto autosugeestionDto = new AutosuggestionConfDto();
	
	try {
		 
		if (unit == 0) {
			String[] ary = unitlist.split(",");
			for (int i = 0; i < ary.length; i++) {
				ltSubService1.add(Integer.parseInt(ary[i]));
			}

			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(AutosuggestionConfDto.class);
			criteria.add(Restrictions.in("unitid", ltSubService1));
			criteria.add(Restrictions.eq("categorydeleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.add(Restrictions.eq("servicdeleted", "N"));
			
			//criteria.add(Restrictions.like("categoryName", findingName+ "%"));
			criteria.add(Restrictions.like("categoryName", "%"+findingName+"%"));
			criteria.setMaxResults(15);
			
			ltSubService = criteria.list();

		}else {
			
				// unit list by user
				ArrayList<Integer> servIds11 = new ArrayList<Integer>();
				String uIds = null;
				String[] uIds1 = null;
				String sql1 = "select IFEMPTY(unitmaster_id, '0') as unitmaster_id from users where User_ID="
						+ userId + "";
				SQLQuery query1 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql1);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data1 = query1.list();
				for (Map<String, Object> row : data1) {
					uIds = (String) row.get("unitmaster_id");
				}
				if (uIds.length() > 0) {
					uIds1 = uIds.split(",");
					for (String id : uIds1) {
						servIds11.add(Integer.parseInt(id));
					}
				}

				// department list by user
				ArrayList<Integer> dIds11 = new ArrayList<Integer>();
				String[] dIds1 = null;
				String dIds = null;
				String sql3 = "select IFEMPTY(dept_id, '0') as dept_id  from users where User_ID="
						+ userId + "";
				SQLQuery query3 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql3);
				query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data3 = query3.list();
				if (query3.list().isEmpty()) {
				} else {
					for (Map<String, Object> row : data3) {
						dIds = (String) row.get("dept_id");
					}
					if (dIds.length() > 0 && dIds != null) {
						dIds1 = dIds.split(",");
						for (String id : dIds1) {
							dIds11.add(Integer.parseInt(id));
						}
					}
				}
				// service list by user
				ArrayList<Integer> sIds11 = new ArrayList<Integer>();
				String[] servIds1 = null;
				String servIds2 = null;
				String sql2 = "select IFEMPTY(service_id, '0') as service_id from users where User_ID="
						+ userId + "";
				SQLQuery query2 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql2);
				query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data2 = query2.list();
				if (query2.list().isEmpty()) {
				} else {
					for (Map<String, Object> row : data2) {
						servIds2 = (String) row.get("service_id");
					}
					if (servIds2.length() > 0) {
						servIds1 = servIds2.split(",");
						for (String id : servIds1) {
							sIds11.add(Integer.parseInt(id));
						}
					}
				}
				
				 
					
					if(serviceid>0){
						Query bet = sessionFactory.getCurrentSession().createQuery
								("FROM AutosuggestionConfDto WHERE  categorydeleted='N' AND isCategory='N' AND  servicdeleted='N' AND serviceid= :serviceids AND dept_id= :departmentid AND unitid in (:unitid) AND dept_id in (:dept_id) AND serviceid in (:serviceid)  AND categoryName like :cnm  group by categoryid");
						
						bet.setParameterList("unitid",servIds11); 
						bet.setParameterList("dept_id",dIds11); 
						bet.setParameterList("serviceid",sIds11); 
						bet.setParameter("cnm","%"+findingName+"%").setMaxResults(autoLimit); 
						bet.setParameter("serviceids",serviceid);
						bet.setParameter("departmentid",depdocdeskid);
						ltSubService=bet.list();
					}else{
						Query bet = sessionFactory.getCurrentSession().createQuery
								("FROM AutosuggestionConfDto WHERE  categorydeleted='N' AND isCategory='N' AND  servicdeleted='N' AND dept_id= :departmentid AND unitid in (:unitid) AND dept_id in (:dept_id) AND serviceid in (:serviceid)  AND categoryName like :cnm  group by categoryid");
						
						bet.setParameterList("unitid",servIds11); 
						bet.setParameterList("dept_id",dIds11); 
						bet.setParameterList("serviceid",sIds11); 
						bet.setParameter("departmentid",depdocdeskid);
						bet.setParameter("cnm","%"+findingName+"%").setMaxResults(autoLimit); 
						
						ltSubService=bet.list();
					} 
				}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return ltSubService;
}
@Override
public List<AutosugeestionDto> getlistpharmadetails(String storeId,String findingName,String callform) {
	
	
	System.out.println("storeId====>"+storeId);
	String strQuery = "";
	Object storeName = new Object();
	 List<AutosugeestionDto> ltSubService= new ArrayList<AutosugeestionDto>();

	try {
		
		   if (callform.equals("OTINV")){


			   SQLQuery query =sessionFactory.getCurrentSession().createSQLQuery("SELECT subinventory_id FROM inv_subinventory_stock_master where status='Y'");
			                        
                       int subInv_Id = (Integer) query.uniqueResult();

				if(subInv_Id > 0)
				{
					//Changed By Akshata
					strQuery="SELECT  slv.item_info_id,slv.item_master_id,slv.item_issue_qty " +
							"FROM inv_mrn_item_info_slave_new slv WHERe " +
							"slv.deleted = 0 AND slv.item_issue_qty > 0 AND slv.sub_inventory_id="+subInv_Id+" group by item_master_id";
					
					 SQLQuery query1= sessionFactory.getCurrentSession().createSQLQuery(strQuery);	
			         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> Tname = query1.list();
					for (Map rs : Tname) {
						
						int mrn_slave_id = ((Integer) rs.get("item_info_id"));
						String ItemName = getItemName((Integer) rs.get("item_master_id"),findingName);
			
						if (null != ItemName) {
							/* SQLQuery query2 =sessionFactory.getCurrentSession().createSQLQuery("select max(item_sales_id) from inv_item_sale sale where item_sale_item_id="
									 + rs.get("mrn_item_info_slave_item_code")
									 + " and sale.item_sale_delete_flag = 0");*/
							//Changed By Akshata
							 SQLQuery query2 =sessionFactory.getCurrentSession().createSQLQuery("select max(id) from inv_item_purchase_slave sale where item_master_id="
									 + rs.get("item_master_id")
									 + " and sale.deleted = 'N'");
							 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							 int maxid =0;
							 List<Map<String, Object>> data = query2.list();
		      		         for(Map<String, Object> row : data){
		      		        	maxid=(Integer)row.get("max(id)");
		      		         }
							 
		                      /* SQLQuery query3=sessionFactory.getCurrentSession().createSQLQuery("select item_sales_unitPrice from inv_item_sale sale where item_sale_item_id="
		                    		   + rs.get("mrn_item_info_slave_item_code") + " and  item_sales_id = " + maxid + " and sale.item_sale_delete_flag = 0");*/
		      		     //Changed By Akshata
		                       SQLQuery query3=sessionFactory.getCurrentSession().createSQLQuery("select purchase_unit_price_1 from inv_item_purchase_slave sale where item_master_id="
		                    		   + rs.get("item_master_id") + " and  id = " + maxid + " and sale.deleted = 'N'");
						
		                      // query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		                       
		                       Object	Unitprice =  query3.uniqueResult();
							 AutosugeestionDto auto =new AutosugeestionDto(); 
				        	 auto.setServiceid((Integer) rs.get("item_master_id")); 
				        	 auto.setCategoryName(ItemName);
				        	 auto.setCategorycharges((Double) Unitprice);
				        	 auto.setStockqty(Double.parseDouble(((Integer) rs.get("item_issue_qty"))
										.toString()));
				        	 auto.setBatchid(mrn_slave_id);
				        	// auto.setStockid((Integer)rs.get("stock_id"));
				        	 ltSubService.add(auto);
							
						}
					}
				}
			   
		   }else{
			
	    SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT store_name FROM pharma_sub_store_master where store_id='"
						+ storeId + "'");
		storeName = query.uniqueResult();
		
		if (storeName == null) {
/*			strQuery = "select  product.product_name,product.product_id,batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id,pur_rate.bill_rate,pur_rate.pur_rate,tax.tax_rate from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_product_tax_relation product_tax ON product.product_id = product_tax.product_id inner join pharma_tax_master tax ON tax.tax_id = product_tax.tax_id where" 
					+ " product.product_name like '"
					+ findingName + "%'  and   tax.tax_name = 'vat'  and batch.batch_delete_flag = '0' and pur_slave_id='0' order by stock.stock_qty_in_hand desc,batch_exp_date desc";*/
			
			strQuery   = "select  product.product_name,product.product_id,batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id,pur_rate.bill_rate,pur_rate.pur_rate from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id where product.product_name like '"
					+ findingName + "%'  and batch.batch_delete_flag = '0' and pur_slave_id='0' order by stock.stock_qty_in_hand desc,batch_exp_date desc";
		} else {
			strQuery = "select  product.product_name,product.product_id,batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id,pur_rate.bill_rate,pur_rate.pur_rate,tax.tax_rate from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_"
					+ storeName.toString() 
					+ "_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_product_tax_relation product_tax ON product.product_id = product_tax.product_id inner join pharma_tax_master tax ON tax.tax_id = product_tax.tax_id where "
					+ " product.product_name like '"
					+ findingName + "%'  and  tax.tax_name = 'vat'  and batch.batch_delete_flag = '0' and pur_slave_id='0'order by stock.stock_qty_in_hand desc,batch_exp_date desc";
		}
		
		  SQLQuery query1= sessionFactory.getCurrentSession().createSQLQuery(strQuery);	
	         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

	         List<Map<String, Object>> data = query1.list();
	        
	        
	         for(Map<String, Object> row : data){
	        	 AutosugeestionDto auto =new AutosugeestionDto(); 
	        	 auto.setServiceid((Integer)row.get("product_id")); 
	        	 auto.setCategoryName((String)row.get("product_name"));
	        	 auto.setCategorycharges((Double)row.get("mrp"));
	        	 auto.setStockqty((Double)row.get("stock_qty_in_hand"));
	        	 auto.setBatchid((Integer)row.get("batch_id"));
	        	 auto.setStockid((Integer)row.get("stock_id"));
	        	 ltSubService.add(auto);
	         }
	         
	}
	         
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	return ltSubService;
}
private String getItemName(Integer itemID, String data) {

	String ItemName = null;
	//SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT item_name FROM inv_item_master where item_id="+ itemID +" and item_name like '"+ data + "%'"); 
	//Changed By Akshata
	SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT item_name FROM inv_item_master_new where id="+ itemID +" and item_name like '"+ data + "%'"); 
	sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	List<Map<String, Object>> Tname = sql.list();
	for (Map rs : Tname) {
		ItemName = (String) rs.get("item_name");
	}
	return ItemName;
}

	/**@author  :Bilal
	 * @date    :10-Sep-2017
	 * @code    :for getting sponsor and hall charges **/
   @Override
   public double getcharges(int sponsorId, int chargesSlaveId, int hallId,
			int hallSlaveId, int serviceid, int treatId, String toDate) {
		int isComServId = 0;
		int isComServlastId = 0;
		Double sumOfRefund = 0.0;
		
		try {
			int has =0;
			if(hallId > 0){
				/*//get hall id from hall table
				Query hallNameID = sessionFactory.getCurrentSession().createSQLQuery("SELECT bd.Hall_ID from treatment_beds tb,beds bd where bd.Bed_ID=tb.Bed_ID and tb.Treatment_ID="+treatId+"");
				int hsid =(Integer) hallNameID.uniqueResult();
				
				//get hall slave id from hall table
				Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
						"select ehat_hallid from hall where Hall_ID="
								+ hsid);

				 has =(Integer) hallType.uniqueResult();*/
				
				Query bedID = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT sub_service_id FROM ehat_bill_details_ipd where on_bed_flag='Y' and  treatment_id="
										+ treatId + "");
				int hsid = (Integer) bedID.uniqueResult();

				// get hall slave id from hall table
				Query hallType = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"SELECT hall.ehat_hallid FROM ehat_bill_details_ipd INNER JOIN beds ON ehat_bill_details_ipd.sub_service_id=beds.Bed_ID INNER JOIN hall on hall.Hall_ID = beds.Hall_ID where  ehat_bill_details_ipd.sub_service_id="
										+ hsid);

				has = (Integer) hallType.uniqueResult();

			} 
			//hallId = 0;
			//getting date from Auto suggestion 
			Query date = sessionFactory.getCurrentSession().createQuery
					("SELECT toDate FROM AutosuggestionConfDto  WHERE categorydeleted='N' AND isCategory='N' AND servicdeleted='N' AND sponsorId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND categoryid= :categoryid  group by categoryid");
			
			
			date.setParameter("sponsorId", sponsorId);
			date.setParameter("chargesSlaveId", chargesSlaveId);
			
			date.setParameter("hallId", hallId);
			date.setParameter("hallSlaveId", has);
			
			date.setParameter("isComServId", isComServId);
			date.setParameter("isComServlastId", isComServlastId);
			
			date.setParameter("categoryid", serviceid);
			java.sql.Date d= (java.sql.Date) date.uniqueResult();
				
				
			if (d != null) {
				
				//getting charges from Auto suggestion 
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT charges FROM AutosuggestionConfDto  WHERE categorydeleted='N' AND isCategory='N' AND servicdeleted='N' AND sponsorId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND categoryid= :categoryid AND DATE_FORMAT(toDate, '%Y-%m-%d') >= current_date() group by categoryid");
				
				bet.setParameter("sponsorId", sponsorId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
				bet.setParameter("categoryid", serviceid);
				
				sumOfRefund = (Double) bet.uniqueResult();
			} else {
				//getting charges from Auto suggestion  
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT charges FROM AutosuggestionConfDto  WHERE categorydeleted='N' AND isCategory='N' AND servicdeleted='N' AND sponsorId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND categoryid= :categoryid  group by categoryid");
				
				bet.setParameter("sponsorId", sponsorId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
				bet.setParameter("categoryid", serviceid);
				
				sumOfRefund = (Double) bet.uniqueResult();
			}
				
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	
	}
 
   /**@author     :Bilal
    * @Date       :21-sep-2017
    * @code       :for getting sponsor charges***/
	@Override
	public double getchargessponsor(int sponsorId, int chargesSlaveId,
			int hallId, int hallSlaveId, int serviceid, int treatId) {
		int isComServId = 0;
		int isComServlastId = 0;
		Double sumOfRefund = 0.0;
		
		try {
			int has =0;
			if (hallId > 0) {
				
				// get hall id from hall table
				Query bedID = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT sub_service_id FROM ehat_bill_details_ipd where on_bed_flag='Y' and  treatment_id="
										+ treatId + " and sub_service_id !=0");
				int hsid = (Integer) bedID.uniqueResult();

				// get hall slave id from hall table
			//	Query hallType = sessionFactory.getCurrentSession()
					//	.createSQLQuery(
					//			"SELECT  hall.ehat_hallid FROM ehat_bill_details_ipd INNER JOIN beds ON ehat_bill_details_ipd.sub_service_id=beds.Bed_ID INNER JOIN hall on hall.Hall_ID = beds.Hall_ID where  ehat_bill_details_ipd.sub_service_id="
					//					+ hsid + " LIMIT 1");
				
				Query hallType = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"SELECT  beds.Hall_ID FROM ehat_bill_details_ipd INNER JOIN beds ON ehat_bill_details_ipd.sub_service_id=beds.Bed_ID where  ehat_bill_details_ipd.sub_service_id="+hsid+" and ehat_bill_details_ipd.service_id=3  LIMIT 1");

				has = (Integer) hallType.uniqueResult();
				
				//checking the count of that hall slave id if count greater than zero then the hall slave id will be same
				Integer count = countofhallandsponsor(sponsorId,
						chargesSlaveId, hallId, has, isComServId,
						isComServlastId, serviceid);
				
				if (count > 0) {
					System.err.println("?2333112222222222222???????????????????has" + has);
				} else {
					
					
					//calling method to get hall slave id till not get
				    has = subhallId( sponsorId, chargesSlaveId,  hallId,  has,  isComServId,
			             isComServlastId,  serviceid,  treatId);
				   
				 
				    //checking the count of that hall slave id if count greater than zero then the hall slave id will be same
					Integer count2 = countofhallandsponsor(sponsorId,
							chargesSlaveId, hallId, has, isComServId,
							isComServlastId, serviceid);
					
					if (count2 > 0) {
						System.err.println("????????????????????has" + has);
					} else {
						//getting sponsor master till top
						if (chargesSlaveId > 0) {
							chargesSlaveId = subsponsortillTop( sponsorId, chargesSlaveId,  hallId,  has,  isComServId,
						             isComServlastId,  serviceid,  treatId);
						}
					}
				}
			}
			else{
				//getting master or super one id charges not available in configuration table with sub id of sponsor
				if (chargesSlaveId > 0) {
					Integer count3 = countofhallandsponsor(sponsorId,
							chargesSlaveId, hallId, has, isComServId,
							isComServlastId, serviceid);
					
					if (count3 > 0) {
						System.err.println("????????????????????chargesSlaveId" + chargesSlaveId);
					} else {
					chargesSlaveId = subsponsortillTop( sponsorId, chargesSlaveId,  hallId,  has,  isComServId,
				             isComServlastId,  serviceid,  treatId);
					}
				}
			}
			
		
			//getting charges from Auto suggestion date wise
			Query date = sessionFactory.getCurrentSession().createQuery
					("SELECT toDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId");
			
			
			date.setParameter("sponsorId", sponsorId);
			date.setParameter("chargesSlaveId", chargesSlaveId);
			
			date.setParameter("hallId", hallId);
			date.setParameter("hallSlaveId", has);
			
			date.setParameter("isComServId", isComServId);
			date.setParameter("isComServlastId", isComServlastId);
			
			date.setParameter("serviceId", serviceid);
			java.sql.Date d= (java.sql.Date) date.uniqueResult();
			
			Query fromdate = sessionFactory.getCurrentSession().createQuery
					("SELECT fromDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId");
			
			
			fromdate.setParameter("sponsorId", sponsorId);
			fromdate.setParameter("chargesSlaveId", chargesSlaveId);
			
			fromdate.setParameter("hallId", hallId);
			fromdate.setParameter("hallSlaveId", has);
			
			fromdate.setParameter("isComServId", isComServId);
			fromdate.setParameter("isComServlastId", isComServlastId);
			
			fromdate.setParameter("serviceId", serviceid);
			java.sql.Date fd= (java.sql.Date) fromdate.uniqueResult();
				
				
			if (d != null && fd != null) {
				
				//getting charges from Auto suggestion date wise
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT distinct charges FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId AND current_date() BETWEEN  DATE_FORMAT(:stDate, '%Y-%m-%d')  AND DATE_FORMAT(:edDate, '%Y-%m-%d')");
				
				bet.setParameter("sponsorId", sponsorId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
				bet.setParameter("serviceId", serviceid);
				bet.setDate("stDate", fd);
				bet.setDate("edDate", d);
				bet.setMaxResults(1);
				
				sumOfRefund = (Double) bet.uniqueResult();
			} else {
				//getting charges from Auto suggestion  
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT  charges FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId");
				
				bet.setParameter("sponsorId", sponsorId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
				bet.setParameter("serviceId", serviceid);
				bet.setMaxResults(1);
				
				sumOfRefund = (Double) bet.uniqueResult();
			}
				
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		//Double res=0.0;
		if (sumOfRefund == null || sumOfRefund == 0) {
			
			//if (hallId > 0) {
				sumOfRefund = 0.0;
			/*} else {
				res = getyearwisecharges(serviceid);
				if (res != null) {
					sumOfRefund = res;
				}
			}*/
			return sumOfRefund;
		} else {
			return sumOfRefund;
		}
	
	}
	/*****
	 * @author     :BILAL
	 * @Date       :06-02-2018
	 * @Code       :For year wise charges 
	 * ******/
	/*private double getYearWise(int serviceid) {
		double sumOfRefund =0.0;
		try {
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT distinct charges FROM YearWiseConfigureDto  WHERE deleted='N'  AND serviceId= :serviceId AND fromDate <= current_date()   AND toDate >= current_date()");
			
			 bet.setParameter("serviceId", serviceid);
			 sumOfRefund = (Double) bet.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			sumOfRefund =0.0;
		}
		 
	 return sumOfRefund;
   }*/
	/****
	 * @author   :BILAL
	 * @Date     :27-11-2017
	 * @Code     :For Fetching sponsor slave id 
	 * ****/
	private int subsponsortillTop(int sponsorId, int chargesSlaveId, int hallId,
		int has, int isComServId, int isComServlastId, int serviceid,
		int treatId) {
		
			
			List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
			ltSubCharges = fetchSuperCatofchargesSlave(chargesSlaveId);

			if (ltSubCharges.size() > 0) {

				for (int i = 0; i < ltSubCharges.size(); i++) {

					Integer count1 = countofhallandsponsor(sponsorId,
							ltSubCharges.get(i)
							.getSlaveId(), hallId, has, isComServId,
							isComServlastId, serviceid);
					
					if (count1 > 0) {
						chargesSlaveId = ltSubCharges.get(i).getSlaveId();
						break;
					}

				}

			}
		
	return chargesSlaveId;
  }
	/****
	 * @author   :BILAL
	 * @Date     :27-11-2017
	 * @Code     :For Fetching hall slave id 
	 * ****/
	public int subhallId(int sponsorId,int chargesSlaveId, int hallId, int has, int isComServId,
			int isComServlastId, int serviceid, int treatId) {

	
			// getting list of hall
			List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
			ltSubCharges = fetchSuperCatofchargesSlave(has);

			if (ltSubCharges.size() > 0) {

				for (int i = 0; i < ltSubCharges.size(); i++) {
					if (chargesSlaveId > 0) {
						chargesSlaveId=	subsponsortillTop( sponsorId,  chargesSlaveId,  hallId,
								ltSubCharges.get(i).getSlaveId(),  isComServId,  isComServlastId,  serviceid,
								 treatId);
					}
					
					
					Integer count1 = countofhallandsponsor(sponsorId,
							chargesSlaveId, hallId, ltSubCharges.get(i)
									.getSlaveId(), isComServId,
							isComServlastId, serviceid);
					if (count1 > 0) {
						has = ltSubCharges.get(i).getSlaveId();
						break;
					}

				}

			}
		
	
		return has;
    }
	/***@author     :BILAL
	 * @Date        :18-10-2017
	 * @Code        :For getting list of super id's using store procedure****/
	@Override
	public List<ChargesMasterSlave> fetchSuperCatofchargesSlave(
			Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		
		//Calling stored procedure
		Query query = sessionFactory.getCurrentSession().createSQLQuery(
				"CALL  fetchSuperCatogoires (:chargesMasterDto)")
				.setParameter("chargesMasterDto", chargesMasterDto);
				String result =(String) query.uniqueResult();
				String[] ary = result.split(",");
				
				//converting string object into Integer
				List<Integer> ae =  new ArrayList<Integer>();
				for (int i = 0; i < ary.length; i++) {
					ae.add(Integer.parseInt(ary[i]));
				}
	
				//First checking the Length should be greater then zero
				if (ary.length>0) {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(ChargesMasterSlave.class);
					//criteria.addOrder(Order.desc("subId"));
					criteria.add(Restrictions.in("slaveId", ae));
					ltSubCharges = criteria.list();
					System.err.println("Size of list"+ltSubCharges.size());
				}
				
				
	return ltSubCharges;
	}
	
	/***@Author    :BILAL
	 * @Date       :19-10-2017
	 * @Code       :For getting count from configuration table***/
	public int countofhallandsponsor(Integer sponsorId,Integer chargesSlaveId,Integer hallId,Integer hallSlaveId,Integer isComServId,
			Integer isComServlastId,Integer serviceid) {
		Integer count=0;
		try {
			Query countquery = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId ");
			
			countquery.setParameter("sponsorId", sponsorId);
			countquery.setParameter("chargesSlaveId", chargesSlaveId);
			
			countquery.setParameter("hallId", hallId);
			countquery.setParameter("hallSlaveId", hallSlaveId);
			
			countquery.setParameter("isComServId", isComServId);
			countquery.setParameter("isComServlastId", isComServlastId);
			
			countquery.setParameter("serviceId", serviceid);
		    count = ((Number) countquery.uniqueResult()).intValue();
			
		} catch (Exception e) {
			e.printStackTrace();
			return count;
		}
		return count;
		
	}
	@Override
	public double getchargessponsorForQuotation(int sponsorId,
			int chargesSlaveId, int hallId, int hallSlaveId, int serviceid,
			int isComServId, int isComServlastId) {
		/*int isComServId = 0;
		int isComServlastId = 0;*/
		Double sumOfRefund = 0.0;
		
		try {
			int has =0;
			int treatId=0;
			if (hallId > 0) {
				
				
				has =hallSlaveId; 
				
				//checking the count of that hall slave id if count greater than zero then the hall slave id will be same
				Integer count = countofhallandsponsor(sponsorId,
						chargesSlaveId, hallId, has, isComServId,
						isComServlastId, serviceid);
				
				if (count > 0) {
					System.err.println("?2333112222222222222???????????????????has" + has);
				} else {
					
					
					//calling method to get hall slave id till not get
				    has = subhallId( sponsorId, chargesSlaveId,  hallId,  has,  isComServId,
			             isComServlastId,  serviceid,  treatId);
				   
				 
				    //checking the count of that hall slave id if count greater than zero then the hall slave id will be same
					Integer count2 = countofhallandsponsor(sponsorId,
							chargesSlaveId, hallId, has, isComServId,
							isComServlastId, serviceid);
					
					if (count2 > 0) {
						System.err.println("????????????????????has" + has);
					} else {
						//getting sponsor master till top
						if (chargesSlaveId > 0) {
							chargesSlaveId = subsponsortillTop( sponsorId, chargesSlaveId,  hallId,  has,  isComServId,
						             isComServlastId,  serviceid,  treatId);
						}
					}
				}
			}
			else{
				//getting master or super one id charges not available in configuration table with sub id of sponsor
				if (chargesSlaveId > 0) {
					Integer count3 = countofhallandsponsor(sponsorId,
							chargesSlaveId, hallId, has, isComServId,
							isComServlastId, serviceid);
					
					if (count3 > 0) {
						System.err.println("????????????????????chargesSlaveId" + chargesSlaveId);
					} else {
					chargesSlaveId = subsponsortillTop( sponsorId, chargesSlaveId,  hallId,  has,  isComServId,
				             isComServlastId,  serviceid,  treatId);
					}
				}
			}
			
		
			//getting charges from Auto suggestion date wise
			Query date = sessionFactory.getCurrentSession().createQuery
					("SELECT toDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId");
			
			
			date.setParameter("sponsorId", sponsorId);
			date.setParameter("chargesSlaveId", chargesSlaveId);
			
			date.setParameter("hallId", hallId);
			date.setParameter("hallSlaveId", has);
			
			date.setParameter("isComServId", isComServId);
			date.setParameter("isComServlastId", isComServlastId);
			
			date.setParameter("serviceId", serviceid);
			java.sql.Date d= (java.sql.Date) date.uniqueResult();
			
			Query fromdate = sessionFactory.getCurrentSession().createQuery
					("SELECT fromDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId");
			
			
			fromdate.setParameter("sponsorId", sponsorId);
			fromdate.setParameter("chargesSlaveId", chargesSlaveId);
			
			fromdate.setParameter("hallId", hallId);
			fromdate.setParameter("hallSlaveId", has);
			
			fromdate.setParameter("isComServId", isComServId);
			fromdate.setParameter("isComServlastId", isComServlastId);
			
			fromdate.setParameter("serviceId", serviceid);
			java.sql.Date fd= (java.sql.Date) fromdate.uniqueResult();
				
				
			if (d != null && fd != null) {
				
				//getting charges from Auto suggestion date wise
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT  charges FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId AND current_date() BETWEEN  DATE_FORMAT(:stDate, '%Y-%m-%d')  AND DATE_FORMAT(:edDate, '%Y-%m-%d')");
				
				bet.setParameter("sponsorId", sponsorId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
				bet.setParameter("serviceId", serviceid);
				bet.setMaxResults(1);
				 
				bet.setDate("stDate", fd);
				bet.setDate("edDate", d);
				
				sumOfRefund = (Double) bet.uniqueResult();
			} else {
				//getting charges from Auto suggestion  
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT  charges FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND serviceId= :serviceId");
				
				bet.setParameter("sponsorId", sponsorId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
				bet.setParameter("serviceId", serviceid);
			    bet.setMaxResults(1);
			    
				sumOfRefund = (Double) bet.uniqueResult();
			}
				
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	
	}
	/******
	 * @author    :BILAL
	 * @Date      :07-02-2018
	 * @Code      :For year wise charges of any service 
	 * *******/
	@Override
	public double getyearwisecharges(int subserviceid) {
		Double sumOfRefund =0.0;
		try {
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT  charges FROM YearWiseConfigureDto  WHERE deleted='N'  AND serviceId= :serviceId AND fromDate <= current_date()   AND toDate >= current_date()");
			
			 bet.setParameter("serviceId", subserviceid);
			 bet.setMaxResults(1);
			 sumOfRefund = (Double) bet.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			sumOfRefund =0.0;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	}
	
	@Override
	public DemographicPatientDto fetchDemoPatientName(String letter, String call) {
		
		DemographicPatientDto demoPatObj = new DemographicPatientDto();
		List<DemographicPatientDto> ltDemographicPatientDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DemographicPatientDto.class);

				Criterion rest1= Restrictions.like("patientName", "%" +letter+ "%");
				//Criterion rest2= Restrictions.like("mobile", "%" +letter+ "%");
				Criterion rest3= Restrictions.like("regNo", "%" +letter+ "%");
				
				
				//criteria.add(Restrictions.or(rest1,rest2,rest3));	
				criteria.add(Restrictions.or(rest1,rest3));
				
				criteria.setProjection(Projections.projectionList()
					      .add(Projections.property("patientId"), "patientId")
					      .add(Projections.property("patientName"), "patientName")
					      .add(Projections.property("regNo"), "regNo"))
					    .setResultTransformer(Transformers.aliasToBean(DemographicPatientDto.class));
				
  			 criteria.setMaxResults(20); 
  			ltDemographicPatientDto = criteria.list();
			 
  			demoPatObj.setListDemographicPatientDto(ltDemographicPatientDto);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return null;
		}
		return demoPatObj;
	}

	@Override
	public List<AutosugeestionDto> fetchOtSubInventoryProduct(HttpServletRequest request,Integer subInventoryId,String findingName) {
		
		
		System.out.println("storeId====>"+subInventoryId);
		 List<AutosugeestionDto> ltSubService= new ArrayList<AutosugeestionDto>();

		try {

			String sql = "";
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
				sql = "select sum(mrn_issue.current_subinventory_stock) as current_sub_inventory_qty,mrn_issue.item_batch_code,mrn_issue.item_batch_exp_date,mrn_issue.item_master_id,mrn_issue.item_name,mrn_issue.id as stock_id,mrn_issue.batch_master_id as batch_id from inv_goods_issue_mrn_item_slave_new as mrn_issue where mrn_issue.sub_inventory_id="+subInventoryId+" and (mrn_issue.mrn_status='FullyReceived' OR mrn_issue.mrn_status='PartiallyReceivedQty' OR mrn_issue.mrn_status='Dispatched') AND mrn_issue.deleted !='Y' AND mrn_issue.updated_by=1 AND mrn_issue.current_subinventory_stock != 0 and mrn_issue.item_name like'"+findingName+"%' GROUP BY mrn_issue.item_batch_code,mrn_issue.item_batch_exp_date,mrn_issue.item_master_id ";
				System.out.println("sql getAllGeneratedMRNRequestDataForIndentTab:::"+sql);
				Query masterJoinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery.list();
				for(Map<String, Object> row : listSubInvStockBatchWise){
					 AutosugeestionDto auto =new AutosugeestionDto(); 
		        	 auto.setServiceid((Integer) row.get("item_master_id")); 
		        	 auto.setCategoryName((String)row.get("item_name"));
		        	 /*if(((Double)row.get("purchase_unit_price_4")) !=0.0 && row.get("purchase_unit_price_4") !=null && row.get("purchase_unit_price_4") !=""){
		        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_4")); 
		        	 }else if(((Double)row.get("purchase_unit_price_3")) !=0.0 && row.get("purchase_unit_price_3") !=null && row.get("purchase_unit_price_3") !=""){
		        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_3")); 
		        	 }else if(((Double)row.get("purchase_unit_price_2")) !=0.0 && row.get("purchase_unit_price_2") !=null && row.get("purchase_unit_price_2") !=""){
		        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_2")); 
		        	 }else if(((Double)row.get("purchase_unit_price_1")) !=0.0 && row.get("purchase_unit_price_1") !=null && row.get("purchase_unit_price_1") !=""){
		        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_1")); 
		        	 }*/
		        	 auto.setUnitPrice(setUnitPriceOnSelect((Integer) row.get("item_master_id")));
		        	 
		        	 auto.setCurrentSubInventoryStockUpdated((BigDecimal)row.get("current_sub_inventory_qty"));
		        	 auto.setBatchid((Integer)row.get("batch_id"));
		        	 auto.setStockid((Integer)row.get("stock_id"));
		        	 ltSubService.add(auto);
				}
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ltSubService;
	}
	
private Double setUnitPriceOnSelect(Integer itemId){
		
		Double unitPrice = 0.0;
		try {
				
				String sql = "";
				sql = "select ROUND(pur_slave.purchase_unit_price_1, 2) as purchase_unit_price_1 ,ROUND(pur_slave.purchase_unit_price_2, 2) as purchase_unit_price_2, ROUND(pur_slave.purchase_unit_price_3, 2) as purchase_unit_price_3, ROUND(pur_slave.purchase_unit_price_4, 2) as purchase_unit_price_4 from inv_item_purchase_slave as pur_slave where pur_slave.item_master_id="+itemId+" AND pur_slave.deleted='N' group by pur_slave.item_master_id";
				Query masterJoinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery.list();
				for(Map<String, Object> row : listSubInvStockBatchWise){
		        	 if(((Double)row.get("purchase_unit_price_4")) !=0.0 && row.get("purchase_unit_price_4") !=null && row.get("purchase_unit_price_4") !=""){
		        		 unitPrice = (Double)row.get("purchase_unit_price_4"); 
		        	 }else if(((Double)row.get("purchase_unit_price_3")) !=0.0 && row.get("purchase_unit_price_3") !=null && row.get("purchase_unit_price_3") !=""){
		        		 unitPrice =(Double)row.get("purchase_unit_price_3"); 
		        	 }else if(((Double)row.get("purchase_unit_price_2")) !=0.0 && row.get("purchase_unit_price_2") !=null && row.get("purchase_unit_price_2") !=""){
		        		 unitPrice = (Double)row.get("purchase_unit_price_2"); 
		        	 }else if(((Double)row.get("purchase_unit_price_1")) !=0.0 && row.get("purchase_unit_price_1") !=null && row.get("purchase_unit_price_1") !=""){
		        		 unitPrice = (Double)row.get("purchase_unit_price_1"); 
		        	 }
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			return 0.0;
		}
		return unitPrice;
	}
	
@Override
public List<AutosugeestionDto> getBatchDetailsOnSelect(HttpServletRequest request,Integer subInventoryId,Integer itemId) {
	
	
	System.out.println("storeId====>"+subInventoryId);
	 List<AutosugeestionDto> ltSubService= new ArrayList<AutosugeestionDto>();

	try {

		String sql = "";
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
			sql = "select sum(mrn_issue.current_subinventory_stock) as current_sub_inventory_qty,mrn_issue.item_batch_code,mrn_issue.item_batch_exp_date,mrn_issue.item_master_id,mrn_issue.item_name,mrn_issue.id as stock_id,mrn_issue.batch_master_id as batch_id from inv_goods_issue_mrn_item_slave_new as mrn_issue  where mrn_issue.sub_inventory_id="+subInventoryId+" and (mrn_issue.mrn_status='FullyReceived' OR mrn_issue.mrn_status='PartiallyReceivedQty' OR mrn_issue.mrn_status='Dispatched') AND mrn_issue.deleted !='Y' AND mrn_issue.updated_by=1 AND mrn_issue.current_subinventory_stock != 0 and mrn_issue.item_master_id='"+itemId+"' GROUP BY mrn_issue.item_batch_code,mrn_issue.item_batch_exp_date,mrn_issue.item_master_id";
			Query masterJoinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery.list();
			for(Map<String, Object> row : listSubInvStockBatchWise){
				 AutosugeestionDto auto =new AutosugeestionDto(); 
	        	 auto.setServiceid((Integer) row.get("item_master_id")); 
	        	 auto.setCategoryName((String)row.get("item_name"));
	        	 /*if(((Double)row.get("purchase_unit_price_4")) !=0.0 && row.get("purchase_unit_price_4") !=null && row.get("purchase_unit_price_4") !=""){
	        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_4")); 
	        	 }else if(((Double)row.get("purchase_unit_price_3")) !=0.0 && row.get("purchase_unit_price_3") !=null && row.get("purchase_unit_price_3") !=""){
	        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_3")); 
	        	 }else if(((Double)row.get("purchase_unit_price_2")) !=0.0 && row.get("purchase_unit_price_2") !=null && row.get("purchase_unit_price_2") !=""){
	        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_2")); 
	        	 }else if(((Double)row.get("purchase_unit_price_1")) !=0.0 && row.get("purchase_unit_price_1") !=null && row.get("purchase_unit_price_1") !=""){
	        		 auto.setUnitPrice((Double)row.get("purchase_unit_price_1")); 
	        	 }*/
	        	 auto.setUnitPrice(setUnitPriceOnSelect((Integer) row.get("item_master_id")));
	        	 
	        	 auto.setAvailableQty((BigDecimal)row.get("current_sub_inventory_qty"));
	        	 auto.setBatchid((Integer)row.get("batch_id"));
	        	 auto.setStockid((Integer)row.get("stock_id"));
	        	 auto.setBatchCode((String)row.get("item_batch_code"));
	        	 auto.setBatchExp((String)row.get("item_batch_exp_date"));
	        	 ltSubService.add(auto);
			}
	
	} catch (Exception e) {
		e.printStackTrace();
	}
	return ltSubService;
}

	//added by vishant @reason getch package charge opd self patient
	@Override
	@Transactional
	public String fetchPackageCharges(String packageId) {
		//log.info("In TestAutoSuggestionDaoImpl getSponsorTestCharges()");
		Session s = sessionFactory.getCurrentSession();
		String charge="";
		try {
			
			String sql = "select count(*),distribute from ehat_configuration_services where chargesSlave_id="
					+ 0 + " and hallSlave_id=" + 0
					+ " and is_com_servlastId =" + packageId;
			List<Object[]> obj = sessionFactory.getCurrentSession().createSQLQuery(sql).list();
			if(obj.size()>0) {
				for (Object[] master : obj) {
					Integer count = Integer.parseInt(master[0].toString());
					if (count > 0) {

						charge = master[1].toString();

					}
				}
				
			}
			
		} catch (Exception e) {

			e.printStackTrace();
		}
		return charge;
		}
}
