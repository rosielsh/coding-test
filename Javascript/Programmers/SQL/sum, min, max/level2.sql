-- 중복 제거하기

/*
동물 보호소에 들어온 동물의 이름은 몇 개인지 조회하는 SQL 문을 작성해주세요. 
이때 이름이 NULL인 경우는 집계하지 않으며 중복되는 이름은 하나로 칩니다.
*/

SELECT COUNT(DISTINCT NAME) AS COUNT
FROM ANIMAL_INS
WHERE NAME IS NOT NULL;

/*
하나의 컬럼에 대해서 중복되는 데이터를 제거하고 싶을 때, DISTICNT를 사용한다.
*/
