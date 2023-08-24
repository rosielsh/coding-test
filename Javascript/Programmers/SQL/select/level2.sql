-- 재구매가 일어난 상품과 회원 리스트 구하기

/*
ONLINE_SALE 테이블에서 동일한 회원이 동일한 상품을 재구매한 데이터를 구하여, 
재구매한 회원 ID와 재구매한 상품 ID를 출력하는 SQL문을 작성해주세요. 
결과는 회원 ID를 기준으로 오름차순 정렬해주시고 회원 ID가 같다면 상품 ID를 기준으로 내림차순 정렬해주세요.
*/

SELECT USER_ID, PRODUCT_ID
FROM ONLINE_SALE
GROUP BY USER_ID, PRODUCT_ID
HAVING COUNT(*) > 1
ORDER BY USER_ID, PRODUCT_ID DESC;

/*
group by에 컬럼을 2개 넣으면 2개의 컬럼을 기준으로 그룹핑한다.
user id와 product id를 기준으로 그룹화하면 재구매한 상품을 구할 수 있다. 
product id의 개수가 1이 넘는 것을 재구매 한 상품으로 보고, 
having에 count가 1이 넘는 것들을 출력해주었다. 
*/

-- 3월에 태어난 여성 회원 목록 출력하기

/*
MEMBER_PROFILE 테이블에서 생일이 3월인 여성 회원의 ID, 이름, 성별, 생년월일을 조회하는 SQL문을 작성해주세요. 
이때 전화번호가 NULL인 경우는 출력대상에서 제외시켜 주시고, 
결과는 회원ID를 기준으로 오름차순 정렬해주세요.
*/

SELECT MEMBER_ID, MEMBER_NAME, GENDER, DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') AS DATE_OF_BIRTH
FROM MEMBER_PROFILE
WHERE MONTH(DATE_OF_BIRTH) = '03' AND
GENDER = 'W' AND
TLNO IS NOT NULL
ORDER BY MEMBER_ID;

/*
날짜 형식을 지정하는 함수인 DATE_FORMAT()을 사용하였다. 
%Y - 4자리 년도, %y - 2자리 년도
%M - 영문 월
%m - 숫자 월 (두 자리)
%D - 일자 + th
%d - 일자

날짜 데이터를 추출하기 위헤 월을 추출하는 MONTH()를 사용하였다. 
null이 아닌 데이터를 가져오기 위해 is not null 연산자를 사용하였다. 
반대로 is null은 null값만 가져온다.
*/