package com.hms.ipd.nurshing.daoimpl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.OTVitalSlave;
import com.hms.dto.VitalSing;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipd.nurshing.dao.AnaesthesiaApprovalDao;
import com.hms.ipd.nurshing.dto.AnaesthesiaApprovalDto;
import com.hms.ipd.nurshing.dto.AnaesthesiaConductDTO;
import com.hms.ipd.nurshing.dto.IntraOpNotesDto;
import com.hms.ipd.nurshing.dto.PreopDto;
import com.hms.ipd.nurshing.dto.VitalSingDTO;
import com.hms.ot.dto.ConductAnaesthesia;

@Repository
@SuppressWarnings("unchecked")
public class AnaesthesiaApprovalDaoImpl implements AnaesthesiaApprovalDao{
	
	@Autowired
	SessionFactory sf;

	@Override
	public int saveAnaesthesiaApproval(AnaesthesiaApprovalDto obj) {
		
		try {
			if(obj.getApprovalId()==0) {
				sf.getCurrentSession().merge(obj);
				return 1;
			}else {
				sf.getCurrentSession().update(obj);
				return 2;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	
	@Override
	public int saveAnaesthesiaPreOp(PreopDto obj) {
		try {
			if(obj.getPreOpId()==0) {
				sf.getCurrentSession().merge(obj);
				return 1;
			}else {
				sf.getCurrentSession().update(obj);
				return 2;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public PreopDto getAnaesthesiaPreOp(Integer patientId,Integer treatmentId)
	{
			PreopDto preopDto = new PreopDto();
			try
			{
				TreatmentDto  tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
				RegistrationDto  pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
				Criteria c = sf.getCurrentSession().createCriteria(PreopDto.class);
				c.add(Restrictions.eq("treatObj", tobj));
				c.add(Restrictions.eq("patientObj", pobj));
				//Preobj = (PreopDto) c.list();
				
				List<PreopDto> list = c.list();
				
				 preopDto = list.get(list.size()-1);
			}
			catch(Exception e)
			{
				e.printStackTrace();
				
			}
			return preopDto;
		
	}
	
	
	@Override
	public int saveIntraOperation(IntraOpNotesDto obj) {
		try {
			if(obj.getIntraOpNotesDtoId()==0) {
				sf.getCurrentSession().save(obj);
				return 1;
			}else {
				sf.getCurrentSession().merge(obj);
				return 2;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}


	@Override
	@Transactional
	public IntraOpNotesDto getIntraOperation(Integer patientId, Integer treatmentId) {
		
		IntraOpNotesDto InstraOp = new IntraOpNotesDto();
		try
		{
			TreatmentDto  tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
			RegistrationDto  pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
			Criteria c = sf.getCurrentSession().createCriteria(IntraOpNotesDto.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("patientObj", pobj));
			
			//InstraOp = (IntraOpNotesDto) c.uniqueResult();
			
			List<IntraOpNotesDto> list = c.list();
			
			InstraOp = list.get(list.size()-1);
			
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return InstraOp;
	}


	@Override
	@Transactional
	public AnaesthesiaApprovalDto fetchAnaesthesiaApproval(Integer patientId, Integer treatmentId) {
		
		AnaesthesiaApprovalDto anaesthesiaobj = new AnaesthesiaApprovalDto();
	
		try
			{
				TreatmentDto  tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
				RegistrationDto  pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
				Criteria c = sf.getCurrentSession().createCriteria(AnaesthesiaApprovalDto.class);
				c.add(Restrictions.eq("treatObj", tobj));
				c.add(Restrictions.eq("patientObj", pobj));
				
				List<AnaesthesiaApprovalDto> list = c.list();
				
				anaesthesiaobj = list.get(list.size()-1);
				
			}
		
		catch(Exception e){
				e.printStackTrace();
		}
		
		return anaesthesiaobj;
	}
	
	public int saveConductAnaesthesia(ConductAnaesthesia objConductAnaesthesia,
			VitalSing objVitalSing, String queryType)

	{

		String sql = "";
		Date date1 = null;
		String date = "";

		if (queryType.equals("insert")) {
			sql = "INSERT INTO anaesthesia_conduct (chkAnesthesia, induction, relaxant, postOPpulse, postOPbp, postOPrr, postOPcolor, chkPostOperative,Date,reversal,Treatment_ID ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
		} else {
			sql = "UPDATE anaesthesia_conduct SET chkAnesthesia=?, induction=?, relaxant=?, postOPpulse=?, postOPbp=?, postOPrr=?, postOPcolor=?,chkPostOperative=?,Date=?,reversal=? WHERE Treatment_ID=?";
		}
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			date = objConductAnaesthesia.getDate();
			date1 = formatter.parse(date);
////			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
////			Date date1 = objConductAnaesthesia.getDate();
////			String datestring = dateFormat.format(date1); 
////			String dt[] = datestring.split(" ");
		} catch (ParseException e) {
			e.printStackTrace();
		}

		try {
			//getJdbcTemplate().update(
					//sql,
					//new Object[] { 
							AnaesthesiaConductDTO anaesthesiaConductDTO = new AnaesthesiaConductDTO();
							anaesthesiaConductDTO.setChkAnesthesia(objConductAnaesthesia.getChk_anesthesia());
							anaesthesiaConductDTO.setInduction(objConductAnaesthesia.getInduction());
							anaesthesiaConductDTO.setRelaxant(objConductAnaesthesia.getRelaxant());
							anaesthesiaConductDTO.setPostOPpulse(objConductAnaesthesia.getPostOPpulse());
							anaesthesiaConductDTO.setPostOPbp(objConductAnaesthesia.getPostOPbp());
							anaesthesiaConductDTO.setPostOPrr(objConductAnaesthesia.getPostOPrr());
							anaesthesiaConductDTO.setPostOPcolor(objConductAnaesthesia.getPostOPcolor());
							anaesthesiaConductDTO.setChkPostOperative(objConductAnaesthesia.getChkpostoperative()); 
							anaesthesiaConductDTO.setDate(date1);
							anaesthesiaConductDTO.setReversal(objConductAnaesthesia.getReversal());
							anaesthesiaConductDTO.setTreatmentId(objConductAnaesthesia.getTreatment_ID()); //});
							
							Session session1 = sf.getCurrentSession();
						  	
						  	session1.saveOrUpdate(anaesthesiaConductDTO);
						  	session1.flush();
		                    session1.clear();

		} catch (Exception e) {
			System.out.println("database error...could not insert: "
					+ e.getMessage());
			e.printStackTrace();
			return 0;
		}

		if (queryType.equals("insert")) {

			for (int i = 0; i < objVitalSing.getVitalsinglist().size(); i++) {

				String sqlC = "INSERT INTO vital_sing (time,tpulse,bps,bpd,bpm,trr,etco2,uo,fluidone,fluidtwo,infusion,bolus,event,Treatment_ID,sao2,empty,status) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				//getJdbcTemplate()
						//.update(sqlC,
								//new Object[] {
										VitalSingDTO vitalSingDTO = new VitalSingDTO();
										vitalSingDTO.setTime(objVitalSing.getVitalsinglist().get(i)
												.getTtime());
										vitalSingDTO.setTpulse(objVitalSing.getVitalsinglist().get(i)
												.getTpulse());
										vitalSingDTO.setBps(objVitalSing.getVitalsinglist().get(i)
												.getBps());
										vitalSingDTO.setBpd(objVitalSing.getVitalsinglist().get(i)
												.getBpd());
										vitalSingDTO.setBpm(objVitalSing.getVitalsinglist().get(i)
												.getBpm());
										vitalSingDTO.setTrr(objVitalSing.getVitalsinglist().get(i)
												.getTrr());
										vitalSingDTO.setEtco2(objVitalSing.getVitalsinglist().get(i)
												.getEtco2());
										vitalSingDTO.setUo(objVitalSing.getVitalsinglist().get(i)
												.getUo());
										vitalSingDTO.setFluidone(objVitalSing.getVitalsinglist().get(i)
												.getFluidone());
										vitalSingDTO.setFluidtwo(objVitalSing.getVitalsinglist().get(i)
												.getFluidtwo());
										vitalSingDTO.setInfusion(objVitalSing.getVitalsinglist().get(i)
												.getInfusion());
										vitalSingDTO.setBolus(objVitalSing.getVitalsinglist().get(i)
												.getBolus());
										vitalSingDTO.setEvent(objVitalSing.getVitalsinglist().get(i)
												.getEvent());
										vitalSingDTO.setTreatmentId(objConductAnaesthesia.getTreatment_ID());
										vitalSingDTO.setSao2(objVitalSing.getVitalsinglist().get(i)
												.getSao2());
										vitalSingDTO.setEmpty(objVitalSing.getVitalsinglist().get(i)
												.getEmpty());
										vitalSingDTO.setStatus("Y");

										Session session2 = sf.getCurrentSession();
									  	
									  	session2.save(vitalSingDTO);
									  	session2.flush();
					                    session2.clear();

								//});
			}

		} else {
			for (int i = 0; i < objVitalSing.getVitalsinglist().size(); i++) {
				if (objVitalSing.getVitalsinglist().get(i).getIdvital_sing() > 0) {

					String sqlUpdate = "UPDATE vital_sing SET time=?,tpulse=?,bps=?,bpd=?,bpm=?,trr=?,etco2=?,uo=?,fluidone=?,fluidtwo=?,infusion=?,bolus=?,event=?,sao2=?,Treatment_ID=?,empty=? WHERE idvital_sing=? ";
					//getJdbcTemplate().update(
							//sqlUpdate,
							//new Object[] {
									VitalSingDTO vitalSingDTO = new VitalSingDTO();
									vitalSingDTO.setTime(objVitalSing.getVitalsinglist().get(i)
											.getTtime());
									vitalSingDTO.setTpulse(objVitalSing.getVitalsinglist().get(i)
											.getTpulse());
									vitalSingDTO.setBps(objVitalSing.getVitalsinglist().get(i)
											.getBps());
									vitalSingDTO.setBpd(objVitalSing.getVitalsinglist().get(i)
											.getBpd());
									vitalSingDTO.setBpm(objVitalSing.getVitalsinglist().get(i)
											.getBpm());
									vitalSingDTO.setTrr(objVitalSing.getVitalsinglist().get(i)
											.getTrr());
									vitalSingDTO.setEtco2(objVitalSing.getVitalsinglist().get(i)
											.getEtco2());
									vitalSingDTO.setUo(objVitalSing.getVitalsinglist().get(i)
											.getUo());
									vitalSingDTO.setFluidone(objVitalSing.getVitalsinglist().get(i)
											.getFluidone());
									vitalSingDTO.setFluidtwo(objVitalSing.getVitalsinglist().get(i)
											.getFluidtwo());
									vitalSingDTO.setInfusion(objVitalSing.getVitalsinglist().get(i)
											.getInfusion());
									vitalSingDTO.setBolus(objVitalSing.getVitalsinglist().get(i)
											.getBolus());
									vitalSingDTO.setEvent(objVitalSing.getVitalsinglist().get(i)
											.getEvent());
									vitalSingDTO.setTreatmentId(objConductAnaesthesia.getTreatment_ID());
									vitalSingDTO.setSao2(objVitalSing.getVitalsinglist().get(i)
											.getSao2());
									vitalSingDTO.setEmpty(objVitalSing.getVitalsinglist().get(i)
											.getEmpty());
									vitalSingDTO.setIdVitalSing(objVitalSing.getVitalsinglist().get(i)
											.getIdvital_sing());

									Session session3 = sf.getCurrentSession();
								  	
								  	session3.save(vitalSingDTO);
								  	session3.flush();
				                    session3.clear();
							//});

				} else {
					String sqlC = "INSERT INTO vital_sing (time,tpulse,bps,bpd,bpm,trr,etco2,uo,fluidone,fluidtwo,infusion,bolus,event,Treatment_ID,sao2,empty,status) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
					//getJdbcTemplate().update(
						//	sqlC,
							//new Object[] {
									VitalSingDTO vitalSingDTO = new VitalSingDTO();
									vitalSingDTO.setTime(objVitalSing.getVitalsinglist().get(i)
											.getTtime());
									vitalSingDTO.setTpulse(objVitalSing.getVitalsinglist().get(i)
											.getTpulse());
									vitalSingDTO.setBps(objVitalSing.getVitalsinglist().get(i)
											.getBps());
									vitalSingDTO.setBpd(objVitalSing.getVitalsinglist().get(i)
											.getBpd());
									vitalSingDTO.setBpm(objVitalSing.getVitalsinglist().get(i)
											.getBpm());
									vitalSingDTO.setTrr(objVitalSing.getVitalsinglist().get(i)
											.getTrr());
									vitalSingDTO.setEtco2(objVitalSing.getVitalsinglist().get(i)
											.getEtco2());
									vitalSingDTO.setUo(objVitalSing.getVitalsinglist().get(i)
											.getUo());
									vitalSingDTO.setFluidone(objVitalSing.getVitalsinglist().get(i)
											.getFluidone());
									vitalSingDTO.setFluidtwo(objVitalSing.getVitalsinglist().get(i)
											.getFluidtwo());
									vitalSingDTO.setInfusion(objVitalSing.getVitalsinglist().get(i)
											.getInfusion());
									vitalSingDTO.setBolus(objVitalSing.getVitalsinglist().get(i)
											.getBolus());
									vitalSingDTO.setEvent(objVitalSing.getVitalsinglist().get(i)
											.getEvent());
									vitalSingDTO.setTreatmentId(objConductAnaesthesia.getTreatment_ID());
									vitalSingDTO.setSao2(objVitalSing.getVitalsinglist().get(i)
											.getSao2());
									vitalSingDTO.setEmpty(objVitalSing.getVitalsinglist().get(i)
											.getEmpty());
									vitalSingDTO.setStatus("Y"); //});
									
									Session session4 = sf.getCurrentSession();
								  	
								  	session4.save(vitalSingDTO);
								  	session4.flush();
				                    session4.clear();
				}
			}

		}
		return 1;
	}
	

}
