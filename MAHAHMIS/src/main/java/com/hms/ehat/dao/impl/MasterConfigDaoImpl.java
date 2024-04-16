package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.MasterConfigDao;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class MasterConfigDaoImpl implements MasterConfigDao {

	
	private static final Object[][] Object = null;
	List<Integer> rows1=null;
	List<Integer> rows2=null;
	MasterConfigDto configMaster=new MasterConfigDto();
	
	@Autowired
	SessionFactory sessionFactory;

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

	Integer autoLimit = Integer.parseInt(autoLimitStr);
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : Method To save data in db 
	 **********/
	@Override
	public int saveOrUpdateConfigMaster(String[] configList,
			MasterConfigDto configMaster, String setCount) {

		UnitMasterDto ulist = new UnitMasterDto();
		setDeleteFlag(setCount);
		
		int cnt=Integer.valueOf(setCount);
	rows2=	getConfigMasterListByUnitId2(configList,cnt);

			for (int g = 0; g < configList.length; g++) {
					String str2 = configList[g]; // string in json form...
					ulist = (UnitMasterDto) ConfigUIJSONUtility.getObjectFromJSON(str2, UnitMasterDto.class); // mapping object with pojo
													 
				int maxCount=Integer.parseInt(setCount) ;
					if(setCount.equalsIgnoreCase("0")){
						maxCount = maxCountOfColumn(MasterConfigDto.class,"configCount");
						configMaster.setConfigCount(++maxCount);
													}
					else{
						configMaster.setConfigCount(maxCount);
						}
				// for unit list
				for (int i = 0; i < ulist.getLstUnit().size(); i++) {
						configMaster.setId(0);
						configMaster.setUnitId(ulist.getLstUnit().get(i).getUnitId());

					// for dept inside unit
					for (int j = 0; j < ulist.getLstUnit().get(i).getLstDepts().size(); j++) {
						
						if(rows2.contains(ulist.getLstUnit().get(i).getLstDepts().get(j).getDeptId())){
							
							System.err.println("cant insert ....duplicate dept");
							return 3;
						}
							configMaster.setDeptId(ulist.getLstUnit().get(i).getLstDepts().get(j).getDeptId());
						//	System.err.println("dept id in config***************sk..."+ulist.getLstUnit().get(i).getLstDepts().get(j).getDeptId());

						// for servince inside dept inside unit
						for (int k = 0; k < ulist.getLstUnit().get(i).getLstDepts().get(j).getListService().size(); k++) {
								configMaster.setServiceId(ulist.getLstUnit().get(i).getLstDepts().get(j).getListService().get(k).getServiceId());
								sessionFactory.getCurrentSession().merge(configMaster);
						}
					}
					System.err.println("------------------");
				}
			}
			return 1;
		}
	

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Max count of any column from db
	 **********/
	public int maxCountOfColumn(@SuppressWarnings("rawtypes") Class className,
			String columnName) {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(className).setProjection(Projections.max(columnName));
			Integer maxAge = (Integer) criteria.uniqueResult();
			if (maxAge == null) {
			maxAge = 0;
							}
			return maxAge;
			}

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Config Master list  by count
	 **********/
	@Override
	public List<MasterConfigDto> getConfigMasterListByCount(int count) {
 
		List<MasterConfigDto> ltMasterConfigDto = new ArrayList<MasterConfigDto>();

		List<UnitMasterDto> ltUnitMasterDto = new ArrayList<UnitMasterDto>();
		List<DeptMasterDto> ltDeptMasterDto = new ArrayList<DeptMasterDto>();
		List<ServiceMasterDto> ltServiceMasterDto = new ArrayList<ServiceMasterDto>();

		MasterConfigDto cf = new MasterConfigDto();
		try {

			ltUnitMasterDto = getUnitMasterByCount(count);
			ltDeptMasterDto = getDeptMasterByCount(count);
			ltServiceMasterDto = getServiceMasterByCount(count);

			cf.setLstUnit(ltUnitMasterDto);
			cf.setLstDept(ltDeptMasterDto);
			cf.setLstService(ltServiceMasterDto);
			
			ltMasterConfigDto.add(cf);

		} catch (Exception e) {
			e.printStackTrace();
			return ltMasterConfigDto;
		}
		return ltMasterConfigDto;
	}

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Dept lst by count 
	 **********/
	public List<DeptMasterDto> getDeptMasterByCount(int count) {

		List<DeptMasterDto> ltDeptMasterDto = new ArrayList<DeptMasterDto>();

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MasterConfigDto.class);
			criteria.setProjection(Projections.property("deptId"));
			//criteria.add(Restrictions.eq("configCount", count));
			criteria.add(Restrictions.and(Restrictions.eq("configCount", count),Restrictions. eq("deleted", "N"))); 
			criteria.setProjection(Projections.groupProperty("deptId"));
			criteria.list();
			Criteria cr = sessionFactory.getCurrentSession().createCriteria(DeptMasterDto.class);
			cr.addOrder(Order.desc("deptId"));
			cr.add(Restrictions.in("deptId", criteria.list()));
			ltDeptMasterDto = cr.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasterDto;
		}
		return ltDeptMasterDto;
	}


	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Unit lst by count 
	 **********/
	public List<UnitMasterDto> getUnitMasterByCount(int count) {

		List<UnitMasterDto> ltUnitMasterDto = new ArrayList<UnitMasterDto>();

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MasterConfigDto.class);
			criteria.setProjection(Projections.property("unitId"));
			//criteria.add(Restrictions.eq("configCount", count));
			criteria.add(Restrictions.and(Restrictions.eq("configCount", count),Restrictions. eq("deleted", "N"))); 
			criteria.setProjection(Projections.groupProperty("unitId"));
			criteria.list();

			Criteria cr = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class);
			cr.addOrder(Order.desc("unitId"));
			cr.add(Restrictions.in("unitId", criteria.list()));
			ltUnitMasterDto = cr.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltUnitMasterDto;
		}
		return ltUnitMasterDto;
	}


	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Service lst by count 
	 **********/
	public List<ServiceMasterDto> getServiceMasterByCount(int count) {

		List<ServiceMasterDto> ltServiceMasterDto = new ArrayList<ServiceMasterDto>();

		try {
			// To get unique serviceId from db
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MasterConfigDto.class);
			criteria.setProjection(Projections.property("serviceId"));
			/*criteria.add(Restrictions.eq("configCount", count))
			criteria.add(Restrictions.eq("deleted", "N"));*/
			criteria.add(Restrictions.and(Restrictions.eq("configCount", count),Restrictions. eq("deleted", "N"))); 
			criteria.setProjection(Projections.groupProperty("serviceId"));
			criteria.list();
			// To get service master list from db based on service id
			Criteria cr = sessionFactory.getCurrentSession().createCriteria(ServiceMasterDto.class);
			cr.addOrder(Order.desc("serviceId"));
			cr.add(Restrictions.in("serviceId", criteria.list()));
			ltServiceMasterDto = cr.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltServiceMasterDto;
		}
		return ltServiceMasterDto;
	}

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get  config Master count 
	 **********/
	@Override
	public List<MasterConfigDto> getConfigMasterCount() {
		List<MasterConfigDto> ltMasterConfigCount = null;

		try {
			ltMasterConfigCount = getConfigCount();

		} catch (Exception e) {
			e.printStackTrace();
			return ltMasterConfigCount;
		}
		return ltMasterConfigCount;
	}

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get count from  db 
	 **********/
	public List<MasterConfigDto> getConfigCount() {

		List<MasterConfigDto> ltMasterConfigCount = new ArrayList<MasterConfigDto>();

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MasterConfigDto.class);
			criteria.setProjection(Projections.property("configCount"));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.setProjection(Projections.groupProperty("configCount"));
			criteria.list();
			ltMasterConfigCount = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltMasterConfigCount;
		}
		return ltMasterConfigCount;
	}
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To Delete Record  from  db 
	 **********/
	
	@Override
	public boolean deleteConfigMaster(int cnfId,Integer userId) {
		try {
			 
			Session session = sessionFactory.getCurrentSession();
			
			//MasterConfigDto configMaster = (MasterConfigDto) sessionFactory.getCurrentSession().get(MasterConfigDto.class, cnfId);
			//configMaster.setDeletedBy(userId);
			 Date d=new Date(new java.util.Date().getTime());
			//configMaster.setDeleted("Y");*/
			

			String hql = "UPDATE MasterConfigDto set deleted =:flag,deletedDate=:date,deletedBy=:user WHERE config_count =:cn";
			Query query = session.createQuery(hql);
			query.setParameter("flag","Y");  
			query.setParameter("date", d);
			query.setParameter("user", userId);
			query.setParameter("cn",cnfId);  
			
			query.executeUpdate();
			
			System.err.println("user id>>>>>>>>>>>>>>>>"+configMaster.getDeletedBy());
			System.err.println("user id>>>>>>>>>>>>>>>>"+configMaster.getDeletedDate());
			System.err.println("user id>>>>>>>>>>>>>>>>"+configMaster.getDeleted());
			System.err.println("user id>>>>>>>>>>>>>>>>"+configMaster.getDeleted());

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To Delete Flag Y based on count 
	 **********/
	public void setDeleteFlag (String  count ) {
		
		int cn=Integer.parseInt(count);
		 
		try {
			 
			Session session = sessionFactory.getCurrentSession();
					
					String hql = "UPDATE MasterConfigDto set deleted =:flag WHERE config_count =:cn";
					Query query = session.createQuery(hql);
					query.setParameter("flag","Y");  
					query.setParameter("cn",cn);  
					query.executeUpdate();
					 		               
		} catch (Exception e) {
			e.printStackTrace();
			 
		}
		 
	}
 
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get  config Master count 
	 **********/
	@Override
	public List<MasterConfigDto> getConfigMasterListByUnitId(String[] configList,int  count) {
		

		List<MasterConfigDto> ltMasterConfigCount = new ArrayList<MasterConfigDto>();
		UnitMasterDto ulist = new UnitMasterDto();
		 ArrayList<Integer> servIds11=new ArrayList<Integer>();

		
		try {
			
			for (int g = 0; g < configList.length; g++) {
				String str2 = configList[g]; // string in json form...
				ulist = (UnitMasterDto) ConfigUIJSONUtility.getObjectFromJSON(str2, UnitMasterDto.class); // mapping object with pojo
 			
				for (int i = 0; i < ulist.getLstUnit().size(); i++) {
 					 
					servIds11.add(ulist.getLstUnit().get(i).getUnitId());  //add unit id in arry list
 			 
				}
 				
			}
			
			 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MasterConfigDto.class);
				criteria.setProjection(Projections.property("deptId"));
 			 if(servIds11.size()!=0){
                 criteria.add(Restrictions.in("unitId", servIds11));
              }
 			criteria.setProjection(Projections.groupProperty("deptId"));
 
				criteria.list();
				ltMasterConfigCount = criteria.list();
				  rows1 = criteria.list();
				   
		} catch (Exception e) {
			e.printStackTrace();
			return ltMasterConfigCount;
		}
		return ltMasterConfigCount;
	}
	 
// method for avoiding duplicate department to specific units
public List<Integer> getConfigMasterListByUnitId2(String[] configList,int  count) {
		 
		List<MasterConfigDto> ltMasterConfigCount = new ArrayList<MasterConfigDto>();
		UnitMasterDto ulist = new UnitMasterDto();
		 ArrayList<Integer> servIds11=new ArrayList<Integer>();
 
		try {
			
			for (int g = 0; g < configList.length; g++) {
				String str2 = configList[g]; // string in json form...
				ulist = (UnitMasterDto) ConfigUIJSONUtility.getObjectFromJSON(str2, UnitMasterDto.class); // mapping object with pojo
 			
				for (int i = 0; i < ulist.getLstUnit().size(); i++) {
				 
 					servIds11.add(ulist.getLstUnit().get(i).getUnitId());
 			 
				}
 				
			}
			
			 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MasterConfigDto.class);
				criteria.setProjection(Projections.property("deptId"));
				criteria.setProjection(Projections.property("unitId"));
				criteria.add(Restrictions.eq("deleted", "N"));
				
 			 if(servIds11.size()!=0){
                 criteria.add(Restrictions.in("unitId", servIds11));
              }
 			criteria.setProjection(Projections.groupProperty("deptId"));
 
				criteria.list();
				ltMasterConfigCount = criteria.list();  //cofig list
				  rows1 = criteria.list(); //dept list
 
		} catch (Exception e) {
			e.printStackTrace();
			return rows1;
		}
		return rows1;
	}
	 
}


 