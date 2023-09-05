function skillsMember(){
    var skills = ["HTML", "CSS", "JS", "React", "Node", "Python", "Django"];
    var member = ["Kim", "Lee", "Park", "Choi", "Han", "Kang", "Kwon"];
    var memberSkills = [];
    for(var i=0; i<member.length; i++){
        var obj = {};
        obj.name = member[i];
        obj.skills = skills[Math.floor(Math.random()*skills.length)];
        memberSkills.push(obj);
    }
    return memberSkills;
}