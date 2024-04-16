package com.hms.ehat.dao.impl;

import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.ResourceBundle;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.ChargesSlaveDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;


@Repository
public class ChargesSlaveDaoImpl implements ChargesSlaveDao {

	@Autowired
	SessionFactory sessionFactory;

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

	Integer autoLimit = Integer.parseInt(autoLimitStr);

	String hallIdss    =(String) resourceBundleEhat.getString("hallId");
	Integer hallIdEhat = Integer.parseInt(hallIdss);
	
	String autoLimitservices = (String) resourceBundleEhat.getString("autoLimitservices");
	Integer listLimit = Integer.parseInt(autoLimitservices);
	
	String sponsorIdss    =(String) resourceBundleEhat.getString("sponsor");
	Integer sponsorId = Integer.parseInt(sponsorIdss);
	
	// @author: Bilal @date: 24_may_2017 charges slave for save or update
	@Override
	public int saveOrUpdateChargesSlave(ChargesMasterSlave chargesMasterSlave) {
	    int	records =0; 
		try {
			
			int slaveId = chargesMasterSlave.getSlaveId();
			
			if (slaveId > 0) {
				sessionFactory.getCurrentSession().merge(chargesMasterSlave);
				records=1;
			} else {

			
				Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM ChargesMasterSlave WHERE deleted='N' AND categoryName= :categoryName AND chargesMasterDto= :chargesId AND isCategory= :isCategory");
				bet.setParameter("categoryName", chargesMasterSlave.getCategoryName());
				bet.setParameter("chargesId", chargesMasterSlave.getChargesMasterDto());
				bet.setParameter("isCategory", chargesMasterSlave.getIsCategory());
				long count =(Long) bet.uniqueResult();
			
				if (count==0) {
					sessionFactory.getCurrentSession().merge(chargesMasterSlave);
					records=1;
				}else{
					records=3;
				}
			
			}
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}

	// @author: Bilal @date: 24_may_2017 charges slave for get all slave
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getChragesSlave() {
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 1));
			criteria.setMaxResults(listLimit);
			criteria.addOrder(Order.desc("slaveId"));

			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}

	// @author: Bilal @date: 24_may_2017 charges slave for delete slave
	@Override
	public boolean deleteChragesSlave(Integer slaveId, Integer userId) {
		try {
			ChargesMasterSlave chargesSlave = (ChargesMasterSlave) sessionFactory
					.getCurrentSession().get(ChargesMasterSlave.class, slaveId);

			chargesSlave.setDeleted("Y");
			chargesSlave.setDeletedBy(userId);
			chargesSlave
					.setDeletedDate(new Date(new java.util.Date().getTime()));

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	// @author: Bilal @date: 24_may_2017 charges slave for auto suggessions
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getAutoSuggestionChargesSlave(String letter) {

		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 1));
			criteria.addOrder(Order.desc("slaveId"));
			criteria.add(Restrictions.like("categoryName", letter + "%"));
			//criteria.setMaxResults(autoLimit);
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}

	// @author: Bilal @date: 24_may_2017 charges slave for get charges slave by
	// id with conditions
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getChargesSlaveById(Integer masterId,
			Integer selfId) {
		List<ChargesMasterSlave> ltChargesSlave = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("deleted", "N"));
			// conditions check with criteria for fetching proper list
			criteria.add(Restrictions.eq("chargesMasterDto", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));
			/*if(selfId == 0){
				criteria.add(Restrictions.eq("isCategory", "Y"));
			}*/
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}

	// @author: Bilal @date: 24_may_2017 charges slave for get charges slave
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getAllChargesSlave() {
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 1));
			criteria.addOrder(Order.desc("slaveId"));
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}
/**@author Bilal
 * @date 7-Jun-2017
 * Fetch super Catogoires
 * **/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> fetchSuperCatogoires(
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
	
				//First checking the Lenth should be greater then zero
				if (ary.length>0) {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(ChargesMasterSlave.class);
					//criteria.addOrder(Order.desc("subId"));
					criteria.add(Restrictions.in("slaveId", ae));
					ltSubCharges = criteria.list();
					System.err.println("Size of list"+ltSubCharges.size());
				}
				
				//getting the id of Service Master
				Query sql = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT charges_master_id,discount FROM	ehat_charges_master_slave where id = (:chargesMasterDto)")
						.setParameter("chargesMasterDto", chargesMasterDto);
				List<Object[]> o=sql.list();
				Integer serMstrId =0;
				Double disc=0.0;
				for(Object[] obj:o){
					serMstrId=Integer.parseInt(obj[0].toString());
					disc=Double.parseDouble(obj[1].toString());
				}
				
				
					//Getting ChargesMasterDto pojo according get id above.
					ChargesMasterDto cmdto= (ChargesMasterDto) sessionFactory.getCurrentSession()
								.get(ChargesMasterDto.class, serMstrId);
					//setting ChargesMasterDto as ChargesMasterSlave because above list generic is ChargesMasterSlave
					ChargesMasterSlave subdto= new ChargesMasterSlave();
					subdto.setCategoryName(cmdto.getChargesName());
					subdto.setSlaveId(cmdto.getChargesId());
					subdto.setDiscount(disc);
					//ltSubCharges.add(subDto);
					ltSubCharges.add(0, subdto);//adding at first position
					return ltSubCharges;
	}

	/**
	 * @author Bilal
	 * @date 10-july-2017
	 * @code for sub charges count**/
	@Override
	public Long getSubChargesCount() {
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(ChargesMasterSlave.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();

	    System.err.println("count is" + count );
		return count;
	}
	
	/**@Author   :BILAL
	 * @Date     :09-10-2017
	 * @Code     :Getting List of sponsor and hall charges information ****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> fetchargesinfo() {
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			
			criteria.addOrder(Order.desc("slaveId"));

			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}

	/**@Author   :BILAL
	 * @Date     :09-10-2017
	 * @Code     :Getting List of sponsor and hall charges information ****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> fetchargesinfomaster(Integer masterId,
			Integer selfId) {
		List<ChargesMasterSlave> ltCharges = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);

			// conditions check with criteria for fetching proper list

			if (selfId == 0) {
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("chargesMasterDto", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
			} else {

				// for all service
				List<ChargesMasterSlave> ltCharges2 = null;
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				criteria2.add(Restrictions.eq("deleted", "N"));
				criteria2.add(Restrictions.eq("isCategory", "N"));
				criteria2.add(Restrictions.eq("selfId", selfId));
				ltCharges2 = criteria2.list();

				// select catagories
				List<ChargesMasterSlave> ltCharges3 = null;
				List<ChargesMasterSlave> ltCharges4 = null;
				Criteria criteria3 = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				criteria3.add(Restrictions.eq("deleted", "N"));
				criteria3.add(Restrictions.eq("isCategory", "Y"));
				criteria3.add(Restrictions.eq("selfId", selfId));
				ltCharges3 = criteria3.list();
				if (ltCharges3 != null) {
					if (ltCharges3.size() > 0) {
						List<Integer> ae2 = new ArrayList<Integer>();

						for (ChargesMasterSlave integer : ltCharges3) {
							ae2.add(integer.getSlaveId());

						}
						// SELECT id FROM EhatEnterprise_nobel.ehat_subservice
						// where selfId in(22,23,24,35) and iscategory="N";

						Criteria criteria4 = sessionFactory.getCurrentSession()
								.createCriteria(ChargesMasterSlave.class);
						criteria4.add(Restrictions.eq("deleted", "N"));
						criteria4.add(Restrictions.eq("isCategory", "N"));

						criteria4.add(Restrictions.in("selfId", ae2));
						ltCharges4 = criteria4.list();

					}
				}
				List<Integer> ae = new ArrayList<Integer>();

				for (ChargesMasterSlave integer : ltCharges2) {
					ae.add(integer.getSlaveId());

				}
				if (ltCharges4 != null) {
					for (ChargesMasterSlave integer : ltCharges4) {
						ae.add(integer.getSlaveId());

					}
				}
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("chargesMasterDto", masterId));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.in("slaveId", ae));
			}
			ltCharges = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCharges;
		}
		return ltCharges;
	}

	/**@Author   :BILAL
	 * @Date     :09-10-2017
	 * @Code     :Getting List of sponsor and hall charges information on auto suggestion****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> setChargesInfoData(String letter) {

		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.addOrder(Order.desc("slaveId"));

			criteria.add(Restrictions.like("categoryName", letter + "%"));

			//criteria.setMaxResults(autoLimit);
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}

	/**@Author   :BILAL
	 * @Date     :09-10-2017
	 * @Code     :Getting List whose category is Y****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> fetcatY(Integer masterId, Integer selfId) {
		
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));
			criteria.add(Restrictions.eq("isCategory", "Y"));
			
			criteria.addOrder(Order.desc("slaveId"));

			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}
	
	/*****
	 * @author     :BILAL
	 * @date       :25-12-2017
	 * @Code       :For halls
	 * *****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getAllChargesforhall() {
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("selfId", 0));
			criteria.add(Restrictions.eq("isCategory", "Y"));
			criteria.add(Restrictions.eq("chargesMasterDto", hallIdEhat));
			criteria.addOrder(Order.asc("slaveId"));
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}
	/*****
	 * @author     :BILAL
	 * @date       :25-12-2017
	 * @Code       :For sponsor list 
	 * *****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getSponsorList() {
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("selfId", 0));
			criteria.add(Restrictions.eq("isCategory", "Y"));
			criteria.add(Restrictions.eq("chargesMasterDto", sponsorId));
			criteria.addOrder(Order.asc("slaveId"));
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}

	/*****
	 * @author     :BILAL
	 * @date       :02-02-2018
	 * @Code       :For importing of sub charges master 
	 * *****/
	@SuppressWarnings("unused")
	@Override
	public int importSubcharges(String file) {
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
				isCategory = row.getCell(4);
				isModify = row.getCell(5);
				
			    
				int createdBy=1;
				
				
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String date = dateFormat.format(new java.util.Date());
				
			try {
				if (row.getCell(0) != null && row.getCell(2) != null) {

					int serviceId = getmaxIdOfColumn("charges_id",
							"ehat_charges_master", "charges_name",
							serviceName);
					int selfId =0;
					
					
					//if service id is zero then inserting into service master else inserting in sub
					if (serviceId == 0) {
						
						String query = 
								
								  "insert into ehat_charges_master (created_by,created_date_time,deleted,code_name,charges_name) values('"+ createdBy + "' , '"+ date + "', 'N', '"+ serviceName + "', '"+ serviceName + "')";
				         SQLQuery queryservice = sessionFactory.getCurrentSession().createSQLQuery(
						       query);
				         queryservice.executeUpdate();
				         
				         serviceId = getmaxIdOfColumn("charges_id",
									"ehat_charges_master", "charges_name",
									serviceName);
					}
					
					
					//if under service is empty or null or NO then it will insert directly under service as category or no category 
					if ( ! underservices.equals("NO") && ! underservices.equals("-") && ! underservices.equals("") &&  underservices != null) {
						
						//getting self id of under service name 
						selfId = getmaxIdOfColumn("id",
									"ehat_charges_master_slave", "category_name",
									underservices);
					   
						//if self id is zero then that under service will save in sub service table as category 
					   if (selfId == 0) {
						  String isCategoryForund="Y";
						  
						  //calling method to save categories whose flag is Y 
						  
						  int r= insertSubservdy( underservices,  createdBy,  date, isCategoryForund, selfId,
									 serviceId, isModify) ;
								
								selfId = getmaxIdOfColumn("id",
										"ehat_charges_master_slave", "category_name",
										underservices);
					   }
					}
					
					
					//if  service id is greater than zero than it will insert the leaf category may be its is category flag Y or N 
					if (serviceId > 0) {
						
						//checking duplicate service in sub service master 
						Query bet = sessionFactory.getCurrentSession().createQuery
								("SELECT count(*) FROM ChargesMasterSlave WHERE deleted='N' AND categoryName= :categoryName AND chargesMasterDto= :chargesId ");
						bet.setParameter("categoryName", categoryName);
						bet.setParameter("chargesId", serviceId);
						
						long count =(Long) bet.uniqueResult();
						
						//if count equals zero than service will insert 
						if (count == 0) {
							String query =

							"insert into ehat_charges_master_slave (category_name,code_name,created_by,created_date_time,deleted,isCategory,selfId,charges_master_id,isPpn) values('"
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
									+ isModify
									
									

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
		int serviceId,XSSFCell isModify) {
	
	
	Integer anyId =0;
	try {
		String query =

				"insert into ehat_charges_master_slave (category_name,code_name,created_by,created_date_time,deleted,isCategory,selfId,charges_master_id,isPpn) values('"
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
						+ isModify
						
						

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
 * @author      :BILAL
 * @Date        :13-03-2018
 * @Code        :For fetching super for chares configuration   
 * *******/
@SuppressWarnings("unchecked")
@Override
public List<ChargesMasterSlave> fetchsup(Integer chargesMasterDto) {
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
			ae.add(chargesMasterDto);
			
			//First checking the Length should be greater then zero
			if (ary.length>0) {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);				
				//criteria.addOrder(Order.desc("subId"));
				criteria.add(Restrictions.in("slaveId", ae));
				ltSubCharges = criteria.list();
				
			}
			
			//getting the id of Service Master
			Query sql = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT charges_master_id FROM	ehat_charges_master_slave where id = (:chargesMasterDto)")
					.setParameter("chargesMasterDto", chargesMasterDto);
					Integer serMstrId =(Integer) sql.uniqueResult();
			
			
				//Getting ChargesMasterDto DTO according get id above.
				ChargesMasterDto cmdto= (ChargesMasterDto) sessionFactory.getCurrentSession()
							.get(ChargesMasterDto.class, serMstrId);
				//setting ChargesMasterDto as ChargesMasterSlave because above list generic is ChargesMasterSlave
				ChargesMasterSlave subdto= new ChargesMasterSlave();
				subdto.setCategoryName(cmdto.getChargesName());
				subdto.setSlaveId(cmdto.getChargesId());
				
				ltSubCharges.add(0, subdto);//adding at first position
                return ltSubCharges;
    }

@Override
public List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
		Integer selfId) {
	List<ChargesMasterSlave> ltChargesSlave = null;

	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(ChargesMasterSlave.class);
		criteria.add(Restrictions.eq("deleted", "N"));

		// conditions check with criteria for fetching proper list
		criteria.add(Restrictions.eq("chargesMasterDto", masterId));
		criteria.add(Restrictions.eq("selfId", selfId));
		//criteria.add(Restrictions.eq("slaveId", selfId));
	//	criteria.add(Restrictions.eq("isCategory", "N"));
		/*if(selfId == 0){
			criteria.add(Restrictions.eq("isCategory", "Y"));
		}*/
		ltChargesSlave = criteria.list();

	} catch (Exception e) {
		e.printStackTrace();
		return ltChargesSlave;
	}
	return ltChargesSlave;
}

// Added Rohini Ambhore
@SuppressWarnings("unchecked")
@Override
public List<ChargesMasterSlave> fetchSuperCatogoiresSlaveReg(
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

			//First checking the Lenth should be greater then zero
			
			List<Integer> ae1 =  new ArrayList<Integer>();
			ae1.add(chargesMasterDto);
			
			
			if (ary.length>0) {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				//criteria.addOrder(Order.desc("subId"));
				criteria.add(Restrictions.in("slaveId", ae1));
				ltSubCharges = criteria.list();
				System.err.println("Size of list"+ltSubCharges.size());
			}
			
			//getting the id of Service Master
			/*Query sql = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT charges_master_id,discount FROM	ehat_charges_master_slave where id = (:chargesMasterDto)")
					.setParameter("chargesMasterDto", chargesMasterDto);
			List<Object[]> o=sql.list();
			Integer serMstrId =0;
			Double disc=0.0;
			for(Object[] obj:o){
				serMstrId=Integer.parseInt(obj[0].toString());
				disc=Double.parseDouble(obj[1].toString());
			}
			
			
				//Getting ChargesMasterDto pojo according get id above.
				ChargesMasterDto cmdto= (ChargesMasterDto) sessionFactory.getCurrentSession()
							.get(ChargesMasterDto.class, serMstrId);
				//setting ChargesMasterDto as ChargesMasterSlave because above list generic is ChargesMasterSlave
				ChargesMasterSlave subdto= new ChargesMasterSlave();
				subdto.setCategoryName(cmdto.getChargesName());
				subdto.setSlaveId(cmdto.getChargesId());
				subdto.setDiscount(disc);
				//ltSubCharges.add(subDto);
				ltSubCharges.add(0, subdto);//adding at first position*/
				return ltSubCharges;
}

}
