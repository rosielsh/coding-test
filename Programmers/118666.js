// 문제 : 성격 유형 검사

function solution(survey, choices) {
    var answer = '';
    
    const obj = {
        "R": 0, "T": 0,
        "C": 0, "F": 0,
        "J": 0, "M": 0,
        "A": 0, "N": 0
    }

    survey.map((ele, idx) => {
        if(choices[idx] >= 5) {
            obj[ele.substr(1,1)] += (choices[idx] - 4);
        } 
        else if(choices[idx] <= 3) {
            obj[ele.substr(0,1)] += (4 - choices[idx]);
        }
    })

    obj.R >= obj.T ? answer += "R" : answer += "T";
    obj.C >= obj.F ? answer += "C" : answer += "F";
    obj.J >= obj.M ? answer += "J" : answer += "M";
    obj.A >= obj.N ? answer += "A" : answer += "N";
    
    return answer;
}

const survey = ["TR", "RT", "TR"];
const choices = [7, 1, 3];

const result = solution(survey, choices);
console.log(result);