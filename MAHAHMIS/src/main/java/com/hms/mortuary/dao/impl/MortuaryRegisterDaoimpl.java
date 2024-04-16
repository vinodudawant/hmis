package com.hms.mortuary.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.mortuary.dao.MortuaryRegisterDao;
import com.hms.mortuary.dto.Coldroommortuaryslave;
import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class MortuaryRegisterDaoimpl implements MortuaryRegisterDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveMortuaryRegisterData(MortuaryMasterDto mortuaryegister) {

		try {
			Session session = sessionFactory.getCurrentSession();

			if (mortuaryegister.getMor_id() == 0 && mortuaryegister.getPatient_id() > 0)
			{
				String sql="select count(*) from death_record_master where patientId=?";
				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setParameter(0, mortuaryegister.getPatient_id());
				Integer death = ((Number) query.uniqueResult()).intValue();

				if (death > 0) {
					Criteria criteria = session.createCriteria(MortuaryMasterDto.class);
					criteria.add(Restrictions.eq("patient_id",mortuaryegister.getPatient_id()));
					criteria.setProjection(Projections.rowCount());
					Long count = (Long) criteria.uniqueResult();

					if (count > 0) {
						return -1;
					} else {
						mortuaryegister.setCreatedDate(new Date(new java.util.Date().getTime()));
						session.merge(mortuaryegister);
						return 1;
					}
				} else {
					return 3;
				}
			} else if (mortuaryegister.getMor_id() == 0
					&& mortuaryegister.getPatient_id() == 0) {

	mortuaryegister.setCreatedDate(new Date(new java.util.Date().getTime()));
				session.merge(mortuaryegister);
				return 1;
			} 
			else if (mortuaryegister.getMor_id() > 0)
			{
				MortuaryMasterDto master = (MortuaryMasterDto) session.get(
						MortuaryMasterDto.class, mortuaryegister.getMor_id());
				master.setAdditional_nt(mortuaryegister.getAdditional_nt());
				master.setAddress1(mortuaryegister.getAddress1());
				master.setAdmsn_no(mortuaryegister.getAdmsn_no());
				master.setAge1(mortuaryegister.getAge1());
				master.setClothing(mortuaryegister.getClothing());
				master.setDate_in(mortuaryegister.getDate_in());
				master.setDate_of_death(mortuaryegister.getDate_of_death());
				master.setDeath_time(mortuaryegister.getDeath_time());
				master.setDeath_ward(mortuaryegister.getDeath_ward());
				master.setDeceased_name(mortuaryegister.getDeceased_name());
				master.setGender1(mortuaryegister.getGender1());
				master.setMlc_pd(mortuaryegister.getMlc_pd());
				master.setProperty(mortuaryegister.getProperty());
				master.setRelation(mortuaryegister.getRelation());
				master.setRelative_name(mortuaryegister.getRelative_name());
				master.setTime_in(mortuaryegister.getTime_in());
				master.setUpdatedDate(new Date(new java.util.Date().getTime()));
				master.setUpdatedBy(mortuaryegister.getCreatedBy());

				session.merge(master);
				return 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 2;
	}

	@Override
	public MortuaryMasterDto getInternalPatientData(Integer patientid) {

			String pId = "select patientId from death_record_master where patientId=?";
			Query query2 = sessionFactory.getCurrentSession().createSQLQuery(
					pId);
			query2.setParameter(0, patientid);
			Integer l = (Integer) query2.uniqueResult();

			if (l != null) {
				// commented by Annapurna 
			/*	String sql="select distinct p.patient_id, concat(p.f_name, ' ', p.m_name, ' ', p.l_name) AS patient_name, p.relation_id, (SELECT IFNULL((hall_type_name),'-') FROM treatment_beds b, beds bed, hall h, hall_type htype where t.treatment_id = Treatment_ID and b.ID = (SELECT "
							+" MAX(ID) FROM  treatment_beds WHERE Treatment_ID = t.Treatment_ID) and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID and h.Htype = htype.idhall_type) AS hallName, t.opdipdno, p.relative_name, p.gender, p.age, p.address, d.death_time, d.death_date, "
							+" (SELECT IFNULL((mlc_flag), '-') FROM ehat_mlc_details where p.patient_id = patient_id) AS mlcFlag From ehat_patient p, ehat_treatment t, death_record_master d WHERE p.patient_id = t.patient_id and t.treatment_id = (SELECT MAX(treatment_id) FROM ehat_treatment WHERE patient_id = p.patient_id) and p.patient_id = d.patientId "
							+" and d.patientId='"+patientid+"'";	*/
						// Added By Annapurna fetching ward name 
						String sql=	"SELECT DISTINCT       " + 
								"    p.patient_id,       " + 
								"    CONCAT(p.f_name, ' ', p.m_name, ' ', p.l_name) AS patient_name,       " + 
								"    p.relation_id,       " + 
								"    (SELECT        " + 
								"            IFNULL((category_name), '-')       " + 
								"        FROM       " + 
								"            treatment_beds b,       " + 
								"            beds bed,       " + 
								"            ehat_charges_master_slave c       " + 
								"        WHERE       " + 
								"            b.ID = (SELECT        " + 
								"                    MAX(ID)       " + 
								"                FROM       " + 
								"                    treatment_beds       " + 
								"                WHERE       " + 
								"                 Treatment_ID = t.Treatment_ID" + 
								"                 AND" + 
								"                    b.Bed_ID = bed.Bed_ID)       " + 
								"                AND c.id = bed.Hall_ID) AS hallName,       " + 
								"    t.opdipdno,       " + 
								"    p.relative_name,       " + 
								"    p.gender,       " + 
								"    p.age,       " + 
								"    p.address,       " + 
								"    d.death_time,       " + 
								"    d.death_date,       " + 
								"    (SELECT        " + 
								"            IFNULL((mlc_flag), '-')       " + 
								"        FROM       " + 
								"            ehat_mlc_details       " + 
								"        WHERE       " + 
								"            p.patient_id = patient_id) AS mlcFlag       " + 
								"FROM       " + 
								"    ehat_patient p,       " + 
								"    ehat_treatment t,       " + 
								"    death_record_master d       " + 
								"WHERE       " + 
								"    p.patient_id = t.patient_id       " + 
								"        AND t.treatment_id = (SELECT        " + 
								"            MAX(treatment_id)       " + 
								"        FROM       " + 
								"            ehat_treatment       " + 
								"        WHERE       " + 
								"            patient_id = p.patient_id)       " + 
								"        AND p.patient_id = d.patientId       " + 
								"        AND d.patientId = "+patientid;
						
  					 Query mortuaryregister = sessionFactory.getCurrentSession().createSQLQuery(sql);
					 Object[] obj=(Object[]) mortuaryregister.uniqueResult();
					 
					 MortuaryMasterDto mortuary = new MortuaryMasterDto();
					 mortuary.setDeceased_name((String)obj[1]);
					
					 String relation=Integer.toString((Integer)obj[2]);
					 mortuary.setRelation((relation));
					 mortuary.setDeath_ward((String)obj[3]);
					 mortuary.setAdmsn_no((String)obj[4]);
					 mortuary.setRelative_name((String)obj[5]);
					 mortuary.setGender1((String)obj[6]);
					 //edited by annapurna
					// mortuary.setHall_ID((int )obj[12]);//
					// mortuary.setHtype((String )obj[12]);//
					

					
					 String age = Integer.toString((Integer)obj[7]);
					 mortuary.setAge1(age);
					 mortuary.setAddress1((String)obj[8]);
					 mortuary.setDeath_time((String)obj[9]);
					 
					 Date date = (Date) obj[10];
					 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					 String strDate = dateFormat.format(date);
					 mortuary.setDate_of_death(strDate);
					 mortuary.setMlc_pd((String)obj[11]);
					 
					 return mortuary;
				}
			else 
			{
				return null;
			}

		

	}

	@Override
	public List<MortuaryMasterDto> getAllMortuaryRegisterPatient(String callform) {

		List<MortuaryMasterDto> mlist = new ArrayList<MortuaryMasterDto>();

		String sql = "";
		try {
			if (callform.equalsIgnoreCase("All")) {
				//"SELECT mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1, mm.gender1,mm.is_bed_alloted, cs.bed_number, cs.cold_room_master from MortuaryMaster mm, cold_room_mortuary_slave cs,WHERE mm.mor_id = cs.mor_id AND mm.deleted='N'";

				sql = "SELECT mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1, mm.gender1,mm.is_bed_alloted, cs.bed_number,cm.cold_room_name, cs.cold_room_master from MortuaryMaster mm, cold_room_mortuary_slave cs,cold_room_master cm WHERE mm.mor_id = cs.mor_id AND mm.deleted='N'AND cs.cold_room_master=cm.cold_room_id"; 
						
			} else if (callform.equalsIgnoreCase("I")) {
				sql = "SELECT mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1, mm.gender1,mm.is_bed_alloted, cs.bed_number,cm.cold_room_name, cs.cold_room_master from MortuaryMaster mm, cold_room_mortuary_slave cs,cold_room_master cm WHERE mm.mor_id = cs.mor_id AND mm.deleted='N'AND cs.cold_room_master=cm.cold_room_id AND mm.status ='I'";
			} else if (callform.equalsIgnoreCase("E")) {
				sql = "SELECT mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1, mm.gender1,mm.is_bed_alloted, cs.bed_number,cm.cold_room_name, cs.cold_room_master from MortuaryMaster mm, cold_room_mortuary_slave cs,cold_room_master cm WHERE mm.mor_id = cs.mor_id AND mm.deleted='N'AND cs.cold_room_master=cm.cold_room_id AND mm.status ='E'";

			}

			else if (callform.equalsIgnoreCase("others")) {

				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(MortuaryMasterDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				mlist = criteria.list();

				return mlist;
			}

			Query mordetailsQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			mordetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listmorDetails = mordetailsQuery.list();

			for (Map<String, Object> row : listmorDetails) {

				MortuaryMasterDto obj = new MortuaryMasterDto();
				obj.setMor_id((Integer) row.get("mor_id"));
				obj.setDeceased_name((String) row.get("deceased_name"));
				obj.setDate_in((String) row.get("date_in"));
				obj.setTime_in((String) row.get("time_in"));
				obj.setAge1((String) row.get("age1"));
				obj.setGender1((String) row.get("gender1"));
				obj.setCold_room_no((Integer) row.get("cold_room_master"));
				obj.setBed_number((Integer) row.get("bed_number"));
				obj.setCold_room_name((String) row.get("cold_room_name"));
				mlist.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return mlist;
		}

		return mlist;
	}

	@Override
	public MortuaryMasterDto editmortuarydetails(Integer morId) {

		MortuaryMasterDto obj = null;
		try {
			obj = (MortuaryMasterDto) sessionFactory.getCurrentSession().get(
					MortuaryMasterDto.class, morId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public List<MortuaryMasterDto> autosuggesationMortuaryPatient(
			String findingName,String type) {
		List<MortuaryMasterDto> mortuarylist = new ArrayList<MortuaryMasterDto>();
		try {
			String sql="";
			if(type.equals("Y")) {
				sql = "select  mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1,"
						+ " mm.gender1,mm.is_bed_alloted,cs.bed_number, cs.cold_room_master from "
						+ "MortuaryMaster mm, cold_room_mortuary_slave cs where mm.mor_id = cs.mor_id "
						+ "and mm.deleted='N' and mm.is_bed_alloted='Y' and mm.deceased_name like '%"
						+ findingName + "%'";
			}else {
				sql = "select  mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1,"
					+ " mm.gender1,mm.is_bed_alloted,cs.bed_number, cs.cold_room_master from "
					+ "MortuaryMaster mm, cold_room_mortuary_slave cs where mm.mor_id = cs.mor_id "
					+ "and mm.deleted='N' and mm.is_bed_alloted='Y' and mm.status='"+type+"' and mm.deceased_name like '%"
					+ findingName + "%'";
			}
			Query mordetailsQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			mordetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listmorDetails = mordetailsQuery.list();
			for (Map<String, Object> row : listmorDetails) {

				MortuaryMasterDto obj = new MortuaryMasterDto();

				obj.setMor_id((Integer) row.get("mor_id"));
				obj.setDeceased_name((String) row.get("deceased_name"));
				obj.setDate_in((String) row.get("date_in"));
				obj.setTime_in((String) row.get("time_in"));
				obj.setAge1((String) row.get("age1"));
				obj.setGender1((String) row.get("gender1"));
				obj.setCold_room_no((Integer) row.get("cold_room_master"));
				obj.setBed_number((Integer) row.get("bed_number"));
				mortuarylist.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return mortuarylist;
	}

	@Override
	public boolean deletemortuarydetails(MortuaryMasterDto obj) {
		try {
			Session session = sessionFactory.getCurrentSession();
			MortuaryMasterDto master = (MortuaryMasterDto) session.get(
					MortuaryMasterDto.class, obj.getMor_id());
			master.setDeleted("Y");
			master.setDeletedBy(obj.getDeletedBy());
			master.setDeletedDate(obj.getDeletedDate());
			session.merge(master);

			Criteria criteria = session
					.createCriteria(Coldroommortuaryslave.class);
			criteria.add(Restrictions.eq("mor_id", obj.getMor_id()));
			Coldroommortuaryslave slave = (Coldroommortuaryslave) criteria
					.uniqueResult();
			slave.setDeleted("Y");
			slave.setDeletedBy(obj.getDeletedBy());
			slave.setDeletedDate(obj.getDeletedDate());
			session.merge(slave);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<MortuaryMasterDto> getDatewiseData(String from_date,
			String to_date,String type) {

		List<MortuaryMasterDto> mlist = new ArrayList<MortuaryMasterDto>();
		String sql = "";
		try {
			if(type.equals("Y")) {
			sql = "SELECT mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1, mm.gender1,mm.is_bed_alloted,"
					+ " cs.bed_number, cs.cold_room_master from MortuaryMaster mm, cold_room_mortuary_slave cs WHERE"
					+ " mm.mor_id = cs.mor_id AND mm.deleted='N' and mm.date_in between '"
					+ from_date + "' and '" + to_date + "'";
			}else {
				sql = "SELECT mm.mor_id, mm.deceased_name, mm.date_in, mm.time_in, mm.age1, mm.gender1,mm.is_bed_alloted,"
						+ " cs.bed_number, cs.cold_room_master from MortuaryMaster mm, cold_room_mortuary_slave cs WHERE"
						+ " mm.mor_id = cs.mor_id AND mm.deleted='N' and mm.date_in between '"
						+ from_date + "' and '" + to_date + "' and mm.status='"+type+"'";
			}
			Query mordetailsQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			mordetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listmorDetails = mordetailsQuery.list();
			for (Map<String, Object> row : listmorDetails) {

				MortuaryMasterDto obj = new MortuaryMasterDto();

				obj.setMor_id((Integer) row.get("mor_id"));
				obj.setDeceased_name((String) row.get("deceased_name"));
				obj.setDate_in((String) row.get("date_in"));
				obj.setTime_in((String) row.get("time_in"));
				obj.setAge1((String) row.get("age1"));
				obj.setGender1((String) row.get("gender1"));
				obj.setCold_room_no((Integer) row.get("cold_room_master"));
				obj.setBed_number((Integer) row.get("bed_number"));
				mlist.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return mlist;
	}

	@Override
	public int saveFindings(String listfindingsmortuary, int morId,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			MortuaryFindingsDto mortuaryDto = (MortuaryFindingsDto) ConfigUIJSONUtility
					.getObjectFromJSON(listfindingsmortuary,
							MortuaryFindingsDto.class);
			MortuaryFindingsDto mortuaryDto11 = new MortuaryFindingsDto();
			for (int i = 0; i < mortuaryDto.getListmortuaryFindings().size(); i++)

			{

				if (mortuaryDto.getListmortuaryFindings().get(i)
						.getFindingsId() == 0)

				{
					System.out.println("eeeeeeeeeeeee"
							+ mortuaryDto.getListmortuaryFindings().get(i)
									.getFindingsId());

					mortuaryDto11.setHeadings(mortuaryDto
							.getListmortuaryFindings().get(i).getHeadings());
					mortuaryDto11.setRemarks(mortuaryDto
							.getListmortuaryFindings().get(i).getRemarks());
					mortuaryDto11.setFindingsId(0);
					MortuaryMasterDto obj1 = (MortuaryMasterDto) sessionFactory
							.getCurrentSession().get(MortuaryMasterDto.class,
									morId);
					mortuaryDto11.setMortuaryId(obj1);
					mortuaryDto11.setCreatedBy(userId);
					mortuaryDto11.setCreatedDate(new Date(new java.util.Date()
							.getTime()));
					sessionFactory.getCurrentSession().merge(mortuaryDto11);

				}

				else

				{
					mortuaryDto11.setFindingsId(mortuaryDto
							.getListmortuaryFindings().get(i).getFindingsId());
					mortuaryDto11.setHeadings(mortuaryDto
							.getListmortuaryFindings().get(i).getHeadings());
					mortuaryDto11.setRemarks(mortuaryDto
							.getListmortuaryFindings().get(i).getRemarks());
					MortuaryMasterDto obj1 = (MortuaryMasterDto) sessionFactory
							.getCurrentSession().get(MortuaryMasterDto.class,
									morId);
					mortuaryDto11.setMortuaryId(obj1);
					mortuaryDto11.setUpdatedBy(userId);
					mortuaryDto11.setUpdatedDate(new Date(new java.util.Date()
							.getTime()));
					sessionFactory.getCurrentSession().merge(mortuaryDto11);

				}

			}

		}

		catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;

	}

	@Override
	public List<MortuaryFindingsDto> fetchfindings(int mortuaryId) {
		List<MortuaryFindingsDto> mobj = new ArrayList<MortuaryFindingsDto>();
		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"From MortuaryMasterDto WHERE mor_id = ?");
			query.setParameter(0, mortuaryId);
			MortuaryMasterDto masterDto = (MortuaryMasterDto) query
					.uniqueResult();

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MortuaryFindingsDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mortuaryId", masterDto));
			mobj = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return mobj;
	}

	@Override
	public int UploadMortuaryimages(List<MortuaryDocUploadDto> docList,
			int morId) {
		try {
			Session session = null;
			try {

				session = sessionFactory.getCurrentSession();
				// MortuaryMasterDto masterDto = (MortuaryMasterDto)
				// session.get(MortuaryMasterDto.class, morId);

				for (MortuaryDocUploadDto doc : docList) {
					// dto.setMorId(masterDto);

					session.merge(doc);
				}

				return 1;
			} catch (Exception e) {
				e.printStackTrace();
			}
			return 0;
		} catch (Exception e) {

		}
		return 0;
	}

	@Override
	public List<MortuaryDocUploadDto> fetchDoc(int mortuaryId) {
		List<MortuaryDocUploadDto> mobj = new ArrayList<MortuaryDocUploadDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MortuaryDocUploadDto.class);
			criteria.add(Restrictions.eq("morId", mortuaryId));
			criteria.add(Restrictions.eq("deleted", "N"));

			mobj = criteria.list();

			System.out.println("mobj ------------------" + mobj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mobj;
	}

	@Override
	public String deletedocmortuary(int imgid, int userId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			MortuaryDocUploadDto dto = (MortuaryDocUploadDto) session.get(
					MortuaryDocUploadDto.class, imgid);
			dto.setDeleted("Y");
			dto.setDeletedBy(userId);
			dto.setDeletedDateTime(new Date());

			Object o = session.merge(dto);

			if (o != null)
				return "Deleted Successfully";

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Not Deleted";
	}

	@Override
	public boolean deleteFindings(String findingsId, Integer userId) {
		try {

			String findId[] = findingsId.split(",");
			for (int i = 0; i < findId.length; i++) {

				int findings1 = Integer.parseInt(findId[i]);

				MortuaryFindingsDto morDto = (MortuaryFindingsDto) sessionFactory
						.getCurrentSession().get(MortuaryFindingsDto.class,
								findings1);
				morDto.setDeleted("Y");
				morDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				morDto.setDeletedBy(userId);

			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
