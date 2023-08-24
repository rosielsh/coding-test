-- 진료과별 총 예약 횟수 출력하기

/*
APPOINTMENT 테이블에서 2022년 5월에 예약한 환자 수를 진료과코드 별로 조회하는 
SQL문을 작성해주세요. 이때, 컬럼명은 '진료과 코드', '5월예약건수'로 지정해주시고 
결과는 진료과별 예약한 환자 수를 기준으로 오름차순 정렬하고, 예약한 환자 수가 같다면 
진료과 코드를 기준으로 오름차순 정렬해주세요.
*/

SELECT MCDP_CD AS '진료과코드', COUNT(*) AS '5월예약건수'
FROM APPOINTMENT
WHERE YEAR(APNT_YMD) = '2022' AND
MONTH(APNT_YMD) = '05'
GROUP BY MCDP_CD
ORDER BY 5월예약건수, 진료과코드;

/*
ORDER BY에 별칭을 사용할 때는 따옴표를 빼야한다. 
*/

-- 고양이와 개는 몇마리 있을까

SELECT ANIMAL_TYPE, COUNT(*) AS 'count'
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE
ORDER BY FIELD(ANIMAL_TYPE, 'Dog', 'Cat') DESC;

