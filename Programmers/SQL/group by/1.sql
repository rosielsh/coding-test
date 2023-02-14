SELECT MCDP_CD as '진료과코드', count (*) as '5월예약건수' from appointment
where year(apnt_ymd) = '2022' and month(apnt_ymd) = '5'
group by mcdp_cd
order by count(mcdp_cd) asc, mcdp_cd asc;