function solution(skill, skill_trees) {
    var answer = -1;
    
    // A-Z까지 스킬트리의 순서를 저장
    let skillOrder = Array.from({length: 26}, ()=>Infinity);
    let totalCnt = 0;
    
    // 모든 스킬트리 순회
    for(let i=0; i<skill_trees.length; i++) {
        skillOrder = Array.from({length: 26}, ()=>Infinity);
        // 현재 검사하는 스킬트리
        currentSkill = skill_trees[i];
        // 현재 스킬트리를 돌면서 방문하는 순서 저장
        for(let j=0; j<currentSkill.length; j++) {
            skillOrder[Number(currentSkill[j].charCodeAt(0)-65)] = j+1;
        }
        
        // 스킬트리 가능 여부 변수
        let isPossible = true;

        // skill을 (0-전체 길이-1)까지 돌면서 비교
        for(let k=0; k<skill.length-1; k++) {
            let currentSkillIdx = Number(skill[k].charCodeAt(0)-65);
            let nextSkillIdx = Number(skill[k+1].charCodeAt(0)-65);
            
            // 앞에 있는 스킬을 더 먼저 방문했다면 
            if(skillOrder[currentSkillIdx] > skillOrder[nextSkillIdx]) {
                isPossible = false; // 불가능한 스킬트리
                break;
            }
        }
        if(isPossible) totalCnt++;
    }
    
    answer = totalCnt;
    return answer;
}