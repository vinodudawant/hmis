package com.hms.pharmacy.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.hql.internal.classic.GroupByParser;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.dto.district_taluka_city;
import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.pharmacy.dao.VendorDao;
import com.hms.pharmacy.pojo.PharmaVendorView;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class VendorDaoImpl implements VendorDao {

	@Autowired
	SessionFactory sessionFactory;

	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> getVendors() {
		List<VendorMaster> vendorMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class)
					;
			criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			//criteria.add(Restrictions.sizeEq("vendorId", 1));
			criteria.addOrder(Order.desc("vendorId"));
			criteria.setMaxResults(10);
			/*
			 * ProjectionList proList = Projections.projectionList();
			 * proList.add(Projections.groupProperty("vendorId"));
			 * criteria.setProjection(proList);
			 */
			vendorMasters = criteria.list();
			
//.createAlias("vendorAddresses", "vendorAddresses")
		} catch (Exception e) {
			e.printStackTrace();
			return vendorMasters;
		}
		return vendorMasters;
	}

	@Override
	public boolean saveVendor(VendorMaster vendorMaster) {
		try {
			int vendorid=vendorMaster.getVendorId();
			if (vendorid >0) {
				sessionFactory.getCurrentSession().merge(vendorMaster);
			}else{
				Query bet = sessionFactory
						.getCurrentSession()
						.createQuery(
								"SELECT count(*) FROM VendorMaster WHERE vendorDeleteFlag=0 AND vendorName= :vendorName");
				bet.setParameter("vendorName", vendorMaster.getVendorName());
				long count = (Long) bet.uniqueResult();
				if (count == 0) {
					sessionFactory.getCurrentSession().saveOrUpdate(vendorMaster);
				} else {

				}
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteVendor(Integer vendorId) {
		try {
			VendorMaster vendorMaster = (VendorMaster) sessionFactory
					.getCurrentSession().get(VendorMaster.class, vendorId);
			vendorMaster.setVendorDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> getAutoSuggestionVendorNames(String letter,Integer vmi) {
		List<VendorMaster> vendorMasters = new ArrayList<VendorMaster>();
		try {
			String sql="select this_.vendor_id,this_.vendor_name from pharma_vendor_master this_ ";
			if(vmi!=null)
				sql+="inner join    pharma_product_vendor_relation productmas3_ ON this_.vendor_id = productmas3_.vendor_id        inner join    pharma_product_master productmas1_ ON productmas3_.product_id = productmas1_.product_id ";
			sql+="where this_.vendor_delete_flag = 0        and this_.vendor_name like '"+letter+"%'";
			if(vmi!=null)
				sql+="and productmas1_.product_cathlapFlag = 1  group by productmas3_.vendor_id";
			Query query=sessionFactory.getCurrentSession().createSQLQuery(sql);
			
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);
			if(vmi!=null ){
				criteria.createAlias("productMasters", "productMasters");
				criteria.add(Restrictions.eq("productMasters.cathlabFlag", 1));
				criteria.setProjection(Projections.projectionList()..groupProperty("vendorId"));
			}
		criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			criteria.add(Restrictions.like("vendorName", letter,
					MatchMode.ANYWHERE));
			vendorMasters = criteria.list();*/
			
			
			List<Object[]> obj=query.list();
			for(Object[] master : obj){
				VendorMaster vendorMaster=new VendorMaster();
				vendorMaster.setVendorId(Integer.parseInt(master[0]+""));
				vendorMaster.setVendorName(master[1]+"");
				/*vendorMaster.setVendorAddress(master[2]+"");
				vendorMaster.setVendorMobileNumber(master[3]+"");
				vendorMaster.setState(master[4]+"");*/
				
				vendorMasters.add(vendorMaster);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
			return vendorMasters;
		}
		return vendorMasters;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> autoSuggestionVendorWithDelete(String letter) {
		List<VendorMaster> vendorMasters = new ArrayList<VendorMaster>();
		try {
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);
			criteria.add(Restrictions.like("vendorName", letter,
					MatchMode.ANYWHERE));
			vendorMasters = criteria.list();*/
			
			Query query=sessionFactory.getCurrentSession().createSQLQuery("select    this_.vendor_id,    this_.vendor_name,    addr.vendor_address,    addr.vendor_mobile_num,  addr.vAddrId  from    pharma_vendor_master this_        inner join    pharma_vendor_address addr ON this_.vendor_id = addr.vendorId where    this_.vendor_name like '%"+
					letter+"%' ").setCacheable(true);
			
			List<Object[]> obj=query.list();
			for(Object[] master : obj){
				VendorMaster vendorMaster=new VendorMaster();
				vendorMaster.setVendorId(Integer.parseInt(master[0]+""));
				vendorMaster.setVendorName(master[1]+"");
				vendorMaster.setVendorAddress(master[2]+"");
				vendorMaster.setVendorMobileNumber(master[3]+"");
				//vendorMaster.setLandLineNumber(master[4]+""); ,addr.vendor_landline
				
				vendorMasters.add(vendorMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return vendorMasters;
		}
		return vendorMasters;
	}

	@Override
	public List<VendorMaster> getVendorById(Integer vendorId) {
		List<VendorMaster> vendorMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);

			criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorId", vendorId));
			}
           


			

			vendorMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return vendorMasters;
		}
		return vendorMasters;
	}

	@Override
	public VendorMaster getVendorByIdForDate(Integer vendorId) {

		VendorMaster vendorMaster = new VendorMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);
			criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorId", vendorId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("vendorAddDate"));
			criteria.setProjection(proList);

			Date date;
			date = (Date) criteria.uniqueResult();
			vendorMaster.setVendorAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return vendorMaster;
		}
		return vendorMaster;
	}

	@Override
	public List<VendorMaster> getAllVendorDetails() {
		List<VendorMaster> vendorMasters = new ArrayList<VendorMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);
			criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			criteria.addOrder(Order.desc("vendorId"));
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("vendorId"));
		    proList.add(Projections.property("vendorName"));
		    criteria.setProjection(proList);
			
		    List<Object[]> result = criteria.list();
		    for (Object[] row : result) {
		    	VendorMaster vendorMaster=new VendorMaster();
		    	if(row[0]!=null)
		    		vendorMaster.setVendorId(Integer.parseInt(row[0].toString()));

				if(row[1]!=null)
					vendorMaster.setVendorName(row[1].toString());
		    	
				vendorMasters.add(vendorMaster);
		    }

		} catch (Exception e) {
			e.printStackTrace();
			return vendorMasters;
		}
		return vendorMasters;
	}
	/******
	 * @author     :BILAL 
	 * @Date       :21-12-2017
	 * @Code       :For getting list of vendor name For Dispatch billing
	 * ******/
	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> getVendorList() {
		List<VendorMaster> vendorMasters = null;
		try {
			
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT vendorName, vendorId FROM VendorMaster  WHERE vendorDeleteFlag=0");
			
			
			vendorMasters= bet.list();

		} catch (Exception e) {
			e.printStackTrace();
			return vendorMasters;
		}
		return vendorMasters;
	}
	/******
	 * @author     :BILAL 
	 * @Date       :21-12-2017
	 * @Code       :For getting list of vendor name and vendor address from view to show on GRN  
	 * ******/
	@SuppressWarnings("unchecked")
	@Override
	public List<PharmaVendorView> fetchVendorListwithmultipleAdd(String findingName) {
		List<PharmaVendorView> listview = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PharmaVendorView.class);
			criteria.add(Restrictions.eq("vendordeleteflag", 0));
			criteria.add(Restrictions.like("vendorname", findingName+ "%"));
			
			listview = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listview;
		}
		return listview;
	}
	/******
	 * @author     :BILAL 
	 * @Date       :23-01-2018
	 * @Code       :For getting list of vendor name and vendor address from view to show on GRN  
	 * ******/
	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> getVendorListauto(String letter) {
		List<VendorMaster> listview = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);
			criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			criteria.add(Restrictions.like("vendorName", letter + "%"));
			
			listview = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listview;
		}
		return listview;
	}

	/******
	 * @author     :BILAL 
	 * @Date       :30-01-2018
	 * @Code       :For getting list of vendor   
	 * ******/
	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> getlistVenAdd() {
		

		List<VendorMaster> listview = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);
			criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			criteria.addOrder(Order.desc("vendorId"));
			
			listview = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listview;
		}
		return listview;
	
	}
	/******
	 * @author     :BILAL 
	 * @Date       :30-01-2018
	 * @Code       :For getting list of vendor  By ID  
	 * ******/
	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> getlistVenAddById(int vendorId) {List<VendorMaster> listview = null;
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(VendorMaster.class);
		criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
		criteria.add(Restrictions.eq("vendorId", vendorId));
		
		listview = criteria.list();

	} catch (Exception e) {
		e.printStackTrace();
		return listview;
	}
	return listview;}


	@SuppressWarnings("unchecked")
	@Override
	public List<StateMasterDto> fetchStateListForReg() {
		 Session s = sessionFactory.openSession();
		 List<StateMasterDto> dto=null;
		try {

            Query statelistQuery = s.createSQLQuery("select state_id, state_name from ehat_center_state_master where deleted='N'");
            statelistQuery.setResultTransformer(Transformers.aliasToBean(StateMasterDto.class));
            dto = statelistQuery.list();    
            s.flush();
            s.close();
             return dto;
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DistrictMasterDto> fetchDistrictListForReg() {
		 Session s = sessionFactory.openSession();
	     List<DistrictMasterDto> dto=null;
	        try {
	            Query statelistQuery = s.createSQLQuery("select district_id, district_name from ehat_center_district_master where deleted='N'");
	            statelistQuery.setResultTransformer(Transformers.aliasToBean(DistrictMasterDto.class));
	            dto = statelistQuery.list();    
	            s.flush();
	            s.close();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		return dto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<district_taluka_city> fetchTalukaListForReg() {
		 Session s = sessionFactory.openSession();
	     List<district_taluka_city> dto=null;
	        try {
	            Query statelistQuery = s.createSQLQuery("select idtaluka, taluka_name from taluka where status='Y'");
	            statelistQuery.setResultTransformer(Transformers.aliasToBean(district_taluka_city.class));
	            dto = statelistQuery.list();    
	            s.flush();
	            s.close();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		return dto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<VendorMaster> autoSuggestionvendorNew(String letter) {
		List<VendorMaster> listview = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class);
			criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			criteria.add(Restrictions.like("vendorName", letter + "%"));
			
			listview = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listview;
		}
		return listview;
	}

	@Override
	public List<VendorAddress> getlistVenAddressById(Integer vendorId) {
		// TODO Auto-generated method stub
		
		
		List<VendorAddress> listview = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorAddress.class);
			//criteria.add(Restrictions.eq("vendorDeleteFlag", 0));
			criteria.add(Restrictions.eq("vendorId", vendorId));
			
			listview = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listview;
		}
		return listview;

	}

	
}
