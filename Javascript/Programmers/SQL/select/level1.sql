-- 12세 이하인 여자 환자 목록 출력하기

/*
PATIENT 테이블에서 12세 이하인 여자환자의 환자이름, 환자번호, 
성별코드, 나이, 전화번호를 조회하는 SQL문을 작성해주세요. 
이때 전화번호가 없는 경우, 'NONE'으로 출력시켜 주시고 결과는 
나이를 기준으로 내림차순 정렬하고, 나이 같다면 환자이름을 기준으로 
오름차순 정렬해주세요.
*/

SELECT PT_NAME, PT_NO, GEND_CD, AGE, IFNULL(TLNO, 'NONE')
FROM PATIENT
WHERE AGE <= 12 AND 
GEND_CD = 'W'
ORDER BY AGE DESC, PT_NAME;

/*
null값을 처리해주기 위해서 ifnull 함수를 사용해 주었다. 
*/

-- 과일로 만든 아이스크림 고르기

/*
상반기 아이스크림 총주문량이 3,000보다 높으면서 아이스크림의 주 성분이 과일인 
아이스크림의 맛을 총주문량이 큰 순서대로 조회하는 SQL 문을 작성해주세요.
*/

SELECT FIRST_HALF.FLAVOR
FROM FIRST_HALF JOIN ICECREAM_INFO ON FIRST_HALF.FLAVOR = ICECREAM_INFO.FLAVOR
WHERE TOTAL_ORDER > 3000 AND
INGREDIENT_TYPE = 'fruit_based'
ORDER BY TOTAL_ORDER DESC;

/*
테이블을 합치기 위해 ICECREAM_INFO 테이블의 기본키이자 FIRST_HALF 테이블의 
외래키인 FLAVOR을 사용하여 JOIN을 해주었다.
*/
