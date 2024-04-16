package com.hms.mortuary.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.mortuary.dto.ColdRoomBedStatus;
import com.hms.mortuary.dto.ColdRoomMasterDto;
import com.hms.mortuary.dto.Coldroommortuaryslave;
import com.hms.mortuary.dto.MortuaryBodyTrackingDto;
import com.hms.mortuary.dto.MortuaryDeathCertificateDto;
import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;
import com.hms.mortuary.dto.MortuaryPmReport;
import com.hms.mortuary.dao.MortuaryDaoInterface;

@Repository
public class MortuaryDaoImpl implements MortuaryDaoInterface {

	@Autowired
	SessionFactory sessionfactroy;
	
	@Override
	public int saveDaoColdRoomMaster(ColdRoomMasterDto cold) {
		Session session=sessionfactroy.getCurrentSession();
		try{
			
		          if(cold.getCold_room_id()==0)
		          {
		        	  Query hql = session.createQuery
								("SELECT count(*) FROM ColdRoomMasterDto WHERE deleted='N' AND cold_room_name= :cold_room_name");
						hql.setParameter("cold_room_name", cold.getCold_room_name());
						long count =(Long) hql.uniqueResult();
						if(count !=0){	
								return 3;
							
						}
				session.save(cold);
				return 1;
		          }
		          else
		          {
		        	  session.merge(cold);
		        	  return 2;
		          }
			
			  
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		
	}

	@Override
	public List<ColdRoomMasterDto> fechColdRoomMaster() {
		

		List<ColdRoomMasterDto> listcoldmaster = null;
		try {
			Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(ColdRoomMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("cold_room_id"));
			listcoldmaster = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return listcoldmaster;
	
		
		/*Criteria criteria=sessionfactroy.getCurrentSession().createCriteria(ColdRoomMasterDto.class);
		  
			   List<ColdRoomMasterDto> list=  criteria.list();
			   return list;*/
		
		
		
	}

	@Override
	public boolean deleteColdRoomMaster(Integer id,Integer userId)
	{
		
		try{//String hql= "select mm.mor_id , cm.cold_room_name from MortuaryMaster mm, cold_room_master cm where cm.deleted='N' "
				 //AND mm.mor_id="cm.cold_room_name"";
			//Added By Annapurna 
			String sql="select count(*) from cold_room_mortuary_slave where cold_room_master="+id+" and deleted='N' ";
			
			SQLQuery q = sessionfactroy.getCurrentSession().createSQLQuery(sql);
			    int count=((Number) q.uniqueResult()).intValue();
			if(count ==0 ) {
				ColdRoomMasterDto narrationDto = (ColdRoomMasterDto) sessionfactroy
						.getCurrentSession().get(ColdRoomMasterDto.class, id);
				narrationDto.setDeleted("Y");

				narrationDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				narrationDto.setDeletedBy(userId);
				sessionfactroy.getCurrentSession().merge(narrationDto);
				return true;
			}
		
		//System.out.println("delete successfull..............................."+narrationDto);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
		return false;
	}

	@Override
	public ColdRoomMasterDto updateColdRoomMaster(Integer cold) {
		
		
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(ColdRoomMasterDto.class);
		criteria.add(Restrictions.eq("cold_room_id", cold));
		ColdRoomMasterDto obj=	 (ColdRoomMasterDto) criteria.uniqueResult();
		return obj;
		
	}

	@Override
	public ColdRoomMasterDto getBedAvaColdRoomDao(Integer id) {
		if(id != null){
			ColdRoomMasterDto objcoldRoom = null ;
		try{
		
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(ColdRoomMasterDto.class);
		criteria.add(Restrictions.eq("cold_room_id",id));
		 objcoldRoom=	 (ColdRoomMasterDto) criteria.uniqueResult();
		
		
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return objcoldRoom;
		}
		else
		{
			//System.out.println("NullpointerException....................!!!!!!!!!!!!");
			return null;
		}
	}

	@Override
	public MortuaryMasterDto fechMortuaryMasterDto(Integer id) {
		
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryMasterDto.class);
		criteria.add(Restrictions.eq("cold_room_id", id));
		MortuaryMasterDto obj=	(MortuaryMasterDto) criteria.uniqueResult();
		return obj;
		
		
	}

	@Override
	public synchronized int saveColdroommortuaryslave(Integer mor_id, Integer cold_room_id, Integer bed_no, Integer userId) {
		
		Session session = sessionfactroy.getCurrentSession();
		Query q1 = session.createQuery("SELECT count(*) from Coldroommortuaryslave WHERE mor_id=?");
		q1.setParameter(0, mor_id);
		Long count1 = (Long) q1.uniqueResult();
		Query q2 = session.createQuery("SELECT count(*) FROM Coldroommortuaryslave WHERE bed_number=? AND cold_room_master=? AND deleted='N'");
			  q2.setParameter(0, bed_no);
			  q2.setParameter(1, cold_room_id);
		Long count2 = (Long) q2.uniqueResult();
		
		if(count1 > 0)
		{
			return -1;
		}
		else if(count2 > 0)
		{
			return -1;
		}
		else
		{
			Coldroommortuaryslave slave = new Coldroommortuaryslave();
			slave.setBed_number(bed_no);
			slave.setStatus("1");
			slave.setCreatedBy(userId);
			slave.setCreatedDate(new java.util.Date());
			slave.setCold_room_master(cold_room_id);
			slave.setMor_id(mor_id);

			int i = (Integer)session.save(slave);	
			Query query = session.createQuery("Update MortuaryMasterDto set isBedAlloted = 'Y' where mor_id = ?");
			query.setParameter(0, mor_id); 
			int status = query.executeUpdate();

			if(i > 0 && status > 0)
				return 1;
			else
				return 0;
		}
	}

	@Override
	public List<ColdRoomBedStatus> listOfMortuaryMasterDtos(Integer cold_room_id) {
	
		List<ColdRoomBedStatus> list = null;
		
		
		
		try{
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(Coldroommortuaryslave.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("cold_room_master", cold_room_id));
		
		Projection p1 = Projections.property("coldroommortuaryslave_id");
		Projection p2 = Projections.property("bed_number");
		Projection p3 = Projections.property("status");
		Projection p4 = Projections.property("mor_id");
		
		ProjectionList pList = Projections.projectionList();
					   pList.add(p1);
					   pList.add(p2);
					   pList.add(p3);
					   pList.add(p4);
					   
		criteria.setProjection(pList);
		
		List<Object[]> l = criteria.list();
		
		if(!l.isEmpty())
		{
			list = new ArrayList<ColdRoomBedStatus>();
			
			for(Object[] obj : l)
			{
				ColdRoomBedStatus bed = new ColdRoomBedStatus();
								  bed.setColdRoomMasterSlaveId((int) obj[0]);
							      bed.setBedNumber((int)obj[1]);
							      bed.setBedStatus((String)obj[2]);
							      bed.setMorId((int)obj[3]);
							      
				SQLQuery query = sessionfactroy.getCurrentSession().createSQLQuery(
				"select mor_id, deceased_name, address1, age1, gender1, date_of_death from MortuaryMaster "+" where mor_id = ?");
				query.setParameter(0, obj[3]);
				Object[] array = (Object[]) query.uniqueResult();
				
								bed.setDeceasedName((String)array[1]);
								bed.setAddress((String)array[2]);
								bed.setAge((String)array[3]);
								bed.setGender((String)array[4]);
								bed.setDod((String)array[5]);
				
				list.add(bed);
			}
		}
			return list;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public Coldroommortuaryslave fechLastColdroommortuaryslave() {
	
		Query query=sessionfactroy.getCurrentSession().createQuery("from Coldroommortuaryslave order by coldroommortuaryslave_id desc");
		query.setMaxResults(1);
	 
		return (Coldroommortuaryslave) query.uniqueResult();
	}

	@Override
	public List<Object[]> getNoOfBeds(Integer id) {

		//System.out.println("cold room id :"+id);
		final String sql_query = "select cs.coldroommortuaryslave_id, cs.bed_number, cs.status, cm.cold_room_id, cm.quantity_of_beds from Coldroommortuaryslave cs, cold_room_master cm where (cm.cold_room_id = cs.coldroommaster) and (cs.deleted = 'N') AND (cm.cold_room_id = ?)";
		SQLQuery query = sessionfactroy.getCurrentSession().createSQLQuery(sql_query);
				 query.setParameter(0, id);
		
		return query.list();
	}

	@Override
	public MortuaryMasterDto fetchMortuaryById(Integer mor_id) {
		
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryMasterDto.class);
		criteria.add(Restrictions.eq("mor_id", mor_id));
		
		return (MortuaryMasterDto) (criteria.uniqueResult());
	}

	@Override
	public int deallocateBed(Integer cold_room_slave_id, Integer userId) {
		
		Query query = sessionfactroy.getCurrentSession().createQuery("Update Coldroommortuaryslave set deleted = ?, deletedBy = ?, status = ?, deletedDate=? Where coldroommortuaryslave_id = ?");
			  query.setParameter(0, "Y");
			  query.setParameter(1, userId);
			  query.setParameter(2, "0");
			  query.setParameter(3, new java.util.Date());
			  query.setParameter(4, cold_room_slave_id);
			  
		int status = query.executeUpdate();
		//System.out.println("status :"+status);
		return status;
	}

	@Override
	public List<MortuaryMasterDto> mortuaryAutoSugesstion(String name) {
	
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryMasterDto.class);
				 criteria.add(Restrictions.ilike("deceased_name", name, MatchMode.ANYWHERE));
				 criteria.add(Restrictions.eq("isBedAlloted", "N"));
				 criteria.add(Restrictions.eq("deleted", "N"));
				 
		List<MortuaryMasterDto> list = criteria.list();
		//System.out.println("Dao List :"+list);
		return list;
	}

	@Override
	public int saveBodyTrackingInfo(MortuaryBodyTrackingDto dto, int morId, Integer userId) {
		
		Session session = null;
		try {
			session = sessionfactroy.getCurrentSession();
			
			MortuaryMasterDto masterDto = (MortuaryMasterDto) session.get(MortuaryMasterDto.class, morId);
			Query query = session.createQuery("From MortuaryBodyTrackingDto WHERE morId = ?");
				  query.setParameter(0, masterDto);
			List<MortuaryBodyTrackingDto> existsList = query.list();
			
			if(dto.getBodyMovedTo().equalsIgnoreCase("Release"))
			{
				if(existsList.isEmpty())
				{
					dto.setMorId(masterDto);
					dto.setCreatedBy(userId);
					dto.setCreatedDate(new java.util.Date());
					
					session.save(dto);
					Query q1 = session.createQuery("Update Coldroommortuaryslave SET deleted='Y' WHERE mor_id = ?");
					q1.setParameter(0, morId);
					int row= q1.executeUpdate();
					Query q2 = session.createQuery("Update MortuaryMasterDto SET deleted='Y' WHERE mor_id = ?");
					q2.setParameter(0, morId);
					int row1= q2.executeUpdate();
					
//					Query q1 = session.createQuery("From Coldroommortuaryslave WHERE mor_id = ? AND deleted='Y' ");//
//						  q1.setParameter(0, morId);
//					Coldroommortuaryslave dto1 = (Coldroommortuaryslave) q1.uniqueResult();
//					Query q2 = session.createQuery("From MortuaryMasterDto WHERE mor_id = ? AND deleted='Y'");//
//						  q2.setParameter(0, morId);
//					MortuaryMasterDto dto2 = (MortuaryMasterDto) q2.uniqueResult();
					
//					if(dto1 != null)
//					{
//						dto1.setDeleted("Y");
//						session.merge(dto1);
//					}
//					if(dto2 != null)
//					{
//						
//						dto2.setDeleted("Y");
//						session.merge(dto2);
//					}
					
					return 1;
				}
				else
				{
					boolean status = true;
					
					for(MortuaryBodyTrackingDto isExist : existsList)
					{
						if(isExist.getBodyMovedTo().equalsIgnoreCase("Release"))
						{
							isExist.setBodyHandoverTo(dto.getBodyHandoverTo());
							isExist.setBodyNotesTo(dto.getBodyNotesTo());
							isExist.setBodyMovedTo(dto.getBodyMovedTo());
							isExist.setMovedDate(dto.getMovedDate());
							isExist.setMovedTime(dto.getMovedTime());
							isExist.setUpdatedBy(userId);
							isExist.setUpdatedDate(new java.util.Date());
							
							Query q2 = session.createQuery("Update MortuaryMasterDto SET deleted='Y' WHERE mor_id = ?");
							q2.setParameter(0, morId);
							int row= q2.executeUpdate();
						
							session.merge(isExist);
							
							return 0;
						}
						else
							status = false;
					}
					
					if(status == false)
					{
						dto.setMorId(masterDto);
						dto.setCreatedBy(userId);
						dto.setCreatedDate(new java.util.Date());
						
						session.save(dto);
					
						Query q1 = session.createQuery("From Coldroommortuaryslave WHERE mor_id = ?");
							  q1.setParameter(0, morId);
						Coldroommortuaryslave dto1 = (Coldroommortuaryslave) q1.uniqueResult();
						Query q2 = session.createQuery("From MortuaryMasterDto WHERE mor_id = ?");
							  q2.setParameter(0, morId);
						MortuaryMasterDto dto2 = (MortuaryMasterDto) q2.uniqueResult();
					
						if(dto1 != null)
						{
							dto1.setDeleted("Y");
							session.merge(dto1);
						}
						if(dto2 != null)
						{
							dto2.setDeleted("Y");
							session.merge(dto2);
						}
						
						return 1;
					}
				}
			}
			else
			{
				if(existsList.isEmpty())
				{
					dto.setMorId(masterDto);
					dto.setCreatedBy(userId);
					dto.setCreatedDate(new java.util.Date());
					
					session.save(dto);
					
					return 1;
				}
				else
				{
					for(MortuaryBodyTrackingDto isExist : existsList)
					{
						if(isExist.getBodyMovedTo().equalsIgnoreCase("Release"))
						{
							return -1;
						}
					}
					boolean status = true;
					
					for(MortuaryBodyTrackingDto isExist : existsList)
					{
						if(dto.getBodyMovedTo().equalsIgnoreCase(isExist.getBodyMovedTo()))
						{
							isExist.setBodyHandoverTo(dto.getBodyHandoverTo());
							isExist.setBodyNotesTo(dto.getBodyNotesTo());
							isExist.setBodyMovedTo(dto.getBodyMovedTo());
							isExist.setMovedDate(dto.getMovedDate());
							isExist.setMovedTime(dto.getMovedTime());
							isExist.setUpdatedBy(userId);
							isExist.setUpdatedDate(new java.util.Date());
							
							session.merge(isExist);
							
							return 0;
						}
						else
							status = false;
					}
					
					if(status == false)
					{
						dto.setMorId(masterDto);
						dto.setCreatedBy(userId);
						dto.setCreatedDate(new java.util.Date());
						
						session.save(dto);
						
						return 1;
					}
				}
			}
			session.flush();
			session.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return 0;
	}
	
	

	@Override
	public CustomizeTemplate mortuaryTemplateinformation(Integer id) {
		CustomizeTemplate ct=null;
		try{
		String sql="select idCustomizeTemplate, temp_name, temp_data, ipd_opd_flag from customizetemplate where idCustomizeTemplate = ? and dietflag= ?";
		SQLQuery query = sessionfactroy.getCurrentSession().createSQLQuery(sql);
		 query.setParameter(0, id);
		 query.setParameter(1, 'N');
		Object[] arr = (Object[]) query.uniqueResult();
		
		ct = new CustomizeTemplate();
		ct.setIdCustomizeTemplate((int) arr[0]);
		ct.setTemp_name((String) arr[1]);
		ct.setTemp_data((String) arr[2]);
		ct.setIpd_opd_flag((String) arr[3]);
		
		//System.out.println("temp'''"+ct);
		
		}
		catch(Exception e)
		{
			System.out.println("NullPointerException");
		}
		return ct;
	}

	@Override
	public String pmreportSaveMethod(MortuaryPmReport report, int morId) {
		
		Session session = null;
		try{
			session = sessionfactroy.getCurrentSession();
			
			Query query = session.createQuery("From MortuaryMasterDto where mor_id = ?");
				  query.setParameter(0, morId);
			MortuaryMasterDto masterDto = (MortuaryMasterDto) query.uniqueResult();
			report.setMorId(masterDto);
			
			Query query1 = session.createQuery("From MortuaryPmReport where morId = ?");
					query1.setParameter(0, masterDto);
					MortuaryPmReport pm=(MortuaryPmReport)query1.uniqueResult();
					//System.out.println(pm);
					
					if(pm == null)
					{
						report.setCreatedDate(new java.util.Date());
						session.merge(report);
						return "Save successfully.";
					}
					else
					{
						report.setPmreport_id(pm.getPmreport_id());
						report.setUpdatedDate(new java.util.Date());
						report.setUpdatedBy(report.getCreatedBy());
						session.merge(report);
						return "Update successfully.";
					}
					
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return "Report Not save.";
		
		
	}

	@Override
	public List<MortuaryMasterDto> autosuggestionpreviousMorturyDao(String str) {
		List<MortuaryMasterDto> list=null;
		try{
			if(str != null)
			{
				
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryMasterDto.class);
		 		 criteria.add(Restrictions.ilike("deceased_name", str, MatchMode.ANYWHERE));	 
		 		 criteria.add(Restrictions.eq("deleted", "Y"));
		 list =  criteria.list();
			System.out.println(list);
		return list;
			}
			else
			{
				Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryMasterDto.class); 
				 criteria.add(Restrictions.eq("deleted", "Y"));
		  list = criteria.list();
				
				return list;
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return list;
	}
 public MortuaryPmReport updatePmReportDao(Integer pmreport_id) {
	MortuaryPmReport mortuarypmreport=null;
	MortuaryMasterDto morturay=new MortuaryMasterDto();
	try {
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryPmReport.class);
		criteria.add(Restrictions.eq("morId", morturay));
			mortuarypmreport=(MortuaryPmReport)criteria.uniqueResult();
		
	}
	catch(Exception e) {
		e.printStackTrace();
	}
	return mortuarypmreport;
	
}
 //Added by Annapurna

	@Override
	public List<MortuaryPmReport> getPmReportforPrint(Integer pmreport) {
		// TODO Auto-generated method stub
		
		List<MortuaryPmReport> list = new ArrayList<MortuaryPmReport>();
		
		try {
			
			String sql = "SELECT template_data FROM mortuarypmreport WHERE morId = "+pmreport;
			SQLQuery sqlresult = sessionfactroy.getCurrentSession().createSQLQuery(sql);

			sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> sqlresultlist=sqlresult.list();
			for(Map<String, Object> row : sqlresultlist){
				
				MortuaryPmReport obj = new MortuaryPmReport();
				
				obj.setTemplate_data((String) row.get("template_data"));
				
				list.add(obj);
				
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	
	
/*	@Override
	public List<MortuaryPmReport> updatePmReportDao(Integer pmreport_id) {	
		List<MortuaryPmReport> mortuarypmreport=new ArrayList<>();
		MortuaryPmReport list= new MortuaryPmReport();
		try {	String sql="select * from mortuarypmreport where morId="+pmreport_id+"";
		
			SQLQuery q = sessionfactroy.getCurrentSession().createSQLQuery(sql);
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		mortuarypmreport=(List<MortuaryPmReport>) (q.list());//
		
		 
		//MortuaryPmReport mortuarypmreport=null;
		//MortuaryMasterDto morturay=new MortuaryMasterDto();
	//	morturay.setMor_id(pmreport_id);
	
			//Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryPmReport.class);
		//	criteria.add(Restrictions.eq("morId", morturay));
			// mortuarypmreport=(MortuaryPmReport)criteria.uniqueResult();
	

			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mortuarypmreport;
	}*/

	@Override
	public MortuaryMasterDto singlePreviousMorturayDao(Integer morid) {
		MortuaryMasterDto mortuarymasterdto=null;
		try{
		Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryMasterDto.class);
		criteria.add(Restrictions.eq("mor_id", morid));
		criteria.add(Restrictions.eq("deleted","Y"));
		mortuarymasterdto=(MortuaryMasterDto)criteria.uniqueResult();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return mortuarymasterdto;
	}
	/*
	 * 	String sql="select count(*) from cold_room_mortuary_slave where cold_room_master="+id+" and deleted='N' ";
		
		SQLQuery q = sessionfactroy.getCurrentSession().createSQLQuery(sql);
		    int count=((Number) q.uniqueResult()).intValue();
		if(count ==0 ) {
			ColdRoomMasterDto narrationDto = (ColdRoomMasterDto) sessionfactroy
					.getCurrentSession().get(ColdRoomMasterDto.class, id);
			narrationDto.setDeleted("Y");

			narrationDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			narrationDto.setDeletedBy(userId);
			sessionfactroy.getCurrentSession().merge(narrationDto);
			return true;
		}
	
	}
	catch(Exception e)
	{
		e.printStackTrace();
		return false;
	}
	return false;
}*/
	@Override
	public List<MortuaryBodyTrackingDto> fetchBodyTrackingInfo(Integer morId) {
		
		Session session = null;
		
		try{
			session = sessionfactroy.getCurrentSession();
			
			Query query = session.createQuery("From MortuaryMasterDto where mor_id = ?");
			      query.setParameter(0, morId);
			MortuaryMasterDto masterDto = (MortuaryMasterDto) query.uniqueResult();
			
			Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryBodyTrackingDto.class);
					 criteria.add(Restrictions.eq("morId", masterDto));
					 
			List<MortuaryBodyTrackingDto> list = criteria.list();
			return list;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return new ArrayList<MortuaryBodyTrackingDto>();
	}

	@Override
	public int uploadDeathCertificates(List<MortuaryDeathCertificateDto> dtoList, Integer morId) {
		
		Session session = null;
		try{
			
			session = sessionfactroy.getCurrentSession();
			MortuaryMasterDto masterDto = (MortuaryMasterDto) session.get(MortuaryMasterDto.class, morId);
			
			for(MortuaryDeathCertificateDto dto : dtoList)
			{
				dto.setMorId(masterDto);
				
				session.merge(dto);
			}
			
			return 1;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<MortuaryDeathCertificateDto> fetchcertificates(int morId) {
		
		Session session = null;
		
		try {
			session = sessionfactroy.getCurrentSession();
			
			MortuaryMasterDto master = (MortuaryMasterDto) session.get(MortuaryMasterDto.class, morId);
			Criteria criteria = session.createCriteria(MortuaryDeathCertificateDto.class);
					 criteria.add(Restrictions.eq("isDeleted", "N"));
					 criteria.add(Restrictions.eq("morId", master));
					 
			return criteria.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return new ArrayList<MortuaryDeathCertificateDto>();
	}

	@Override
	public boolean deleteDeathCertificate(Integer certiId) {

		Session session = null;
		
		try{
			session = sessionfactroy.getCurrentSession();
			MortuaryDeathCertificateDto dto = (MortuaryDeathCertificateDto) session.get(MortuaryDeathCertificateDto.class, certiId);
										dto.setIsDeleted("Y");
			session.merge(dto);
			
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	
	@Override
	public MortuaryBodyTrackingDto previousBodyTracking(String str,Integer morid) {
	
		MortuaryBodyTrackingDto obj=null;
		try{
		Session session = sessionfactroy.getCurrentSession();
		
		Query query = session.createQuery("From MortuaryMasterDto where mor_id = ?");
		      query.setParameter(0, morid);
	    MortuaryMasterDto mortuarymasterdto = (MortuaryMasterDto) query.uniqueResult();
		Criteria criteria=session.createCriteria(MortuaryBodyTrackingDto.class);
		criteria.add(Restrictions.eq("bodyMovedTo", str));
		criteria.add(Restrictions.eq("morId", mortuarymasterdto));
		obj=  (MortuaryBodyTrackingDto) criteria.uniqueResult();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public List<MortuaryFindingsDto> preBodyFinding(Integer morid) {
	
		MortuaryMasterDto mortuaryMasterDto=new MortuaryMasterDto();
		mortuaryMasterDto.setMor_id(morid);
		List<MortuaryFindingsDto> list=null;
		try{
		Criteria criteria=sessionfactroy.getCurrentSession().createCriteria(MortuaryFindingsDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("mortuaryId", mortuaryMasterDto));
		//criteria.add(Restrictions.eq("deleted", "Y"));
		
		list= criteria.list();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<MortuaryDocUploadDto> preImagesDisplay(Integer morid) {
		List<MortuaryDocUploadDto> list=null;
		
		try{
			Criteria criteria=sessionfactroy.getCurrentSession().createCriteria(MortuaryDocUploadDto.class);
			criteria.add(Restrictions.eq("morId", morid));
			criteria.add(Restrictions.eq("deleted", "N"));
	
			list= criteria.list();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		return list;
	}

	@Override
	public MortuaryBodyTrackingDto editBodyTrackingInfo(int id) {
		
		try
		{
			return (MortuaryBodyTrackingDto) sessionfactroy.getCurrentSession().get(MortuaryBodyTrackingDto.class, id);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public CustomizeTemplate getTemplateListByTemplateId(Integer id) {
		
		
		CustomizeTemplate c=	(CustomizeTemplate) sessionfactroy.getCurrentSession().get(CustomizeTemplate.class,id);
		return c;
	}
	@Override
	public MortuaryPmReport updatedPmreoprtbyid(Integer morId) {
		MortuaryPmReport  obj=new MortuaryPmReport();
		try {
			/*
			 * Session session = sessionfactroy.getCurrentSession(); Query query =
			 * session.createQuery("From MortuaryMasterDto where mor_id = ?");
			 * query.setParameter(0, morId);
			 */
		    
		      MortuaryMasterDto mortuarymasterdto =(MortuaryMasterDto) sessionfactroy.openSession().get(MortuaryMasterDto.class, morId);
		      
	  //  MortuaryMasterDto mortuarymasterdto = (MortuaryMasterDto) query.uniqueResult();
			Criteria criteria = sessionfactroy.getCurrentSession().createCriteria(MortuaryPmReport.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("morId", mortuarymasterdto));
			
			 obj=(MortuaryPmReport) criteria.uniqueResult();
			 
			/*
			 * //query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
			 * Object>> sqlresultlist=query.list(); pmreport1.setListmortuarypmreport(list);
			 */
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	
	
}